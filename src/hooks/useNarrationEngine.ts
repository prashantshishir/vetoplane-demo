import { useEffect, useRef, useState, useCallback } from 'react'

// ── Types ─────────────────────────────────────────────────────────────────────
export type NarrationLoadState = 'ready' | 'error' | 'assets_missing'
export type VoiceState =
  | 'initializing'
  | 'assets_missing'
  | 'ready'
  | 'playing'
  | 'paused'
  | 'error'

export interface AudioDiagnostic {
  assetUrl: string
  assetFound: boolean | null
  httpStatus: number | null
  elementCreated: boolean
  readyState: number | null
  networkState: number | null
  duration: number | null
  paused: boolean | null
  muted: boolean | null
  volume: number | null
  error: string | null
  playResult: string | null
  playbackStarted: boolean
}

export interface NarrationSettings {
  voiceEnabled: boolean
  volume: number   // 0–1
  rate: number     // 0.5–2
}

// ── Audio file manifest ───────────────────────────────────────────────────────
// Drop MP3s into public/narration/ matching these names to enable voice narration
export const AUDIO_PATHS: Record<number, string> = {
  0: '/narration/intro.mp3',
  1: '/narration/register-agent.mp3',
  2: '/narration/connect-infrastructure.mp3',
  3: '/narration/register-tools.mp3',
  4: '/narration/bind-tool-version.mp3',
  5: '/narration/configure-policy.mp3',
  6: '/narration/agent-request.mp3',
  7: '/narration/execution-pipeline.mp3',
  8: '/narration/stale-policy.mp3',
  9: '/narration/transaction-governance.mp3',
  10: '/narration/exact-approval.mp3',
  11: '/narration/approve-execute.mp3',
  12: '/narration/execution-ledger.mp3',
  13: '/narration/duplicate-protection.mp3',
  14: '/narration/deny-suspend.mp3',
  15: '/narration/fail-closed.mp3',
  16: '/narration/final.mp3',
}

// ── Session-level singleton ───────────────────────────────────────────────────
// Survives restarts within one page load — never recreated
const _audioCache: Map<number, HTMLAudioElement> = new Map()
let _assetsChecked = false
let _assetsAvailable = false
let _assetsCheckPromise: Promise<boolean> | null = null
let _currentAudio: HTMLAudioElement | null = null
let _demoStartTime = 0

// Check if narration assets are available (fast, 2s timeout)
async function checkAssetsAvailable(): Promise<boolean> {
  try {
    const ctrl = new AbortController()
    const timer = setTimeout(() => ctrl.abort(), 2000)
    const res = await fetch(AUDIO_PATHS[0], { method: 'HEAD', cache: 'no-store', signal: ctrl.signal })
    clearTimeout(timer)
    return res.ok
  } catch {
    return false
  }
}

// Preload a single audio segment — returns element if successful, null if not
function preloadSegment(step: number): Promise<HTMLAudioElement | null> {
  if (_audioCache.has(step)) return Promise.resolve(_audioCache.get(step)!)
  const path = AUDIO_PATHS[step]
  if (!path) return Promise.resolve(null)

  return new Promise(resolve => {
    const audio = new Audio()
    audio.preload = 'auto'
    const onReady = () => {
      cleanup()
      _audioCache.set(step, audio)
      resolve(audio)
    }
    const onError = () => { cleanup(); resolve(null) }
    const cleanup = () => {
      audio.removeEventListener('canplaythrough', onReady)
      audio.removeEventListener('error', onError)
    }
    audio.addEventListener('canplaythrough', onReady, { once: true })
    audio.addEventListener('error', onError, { once: true })
    audio.src = path
    audio.load()
    // Timeout: 8s per segment
    setTimeout(() => { cleanup(); resolve(_audioCache.get(step) ?? null) }, 8000)
  })
}

// Preload next segment in the background (fire-and-forget)
function preloadNextInBackground(currentStep: number) {
  const next = currentStep + 1
  if (AUDIO_PATHS[next] && !_audioCache.has(next)) {
    preloadSegment(next).catch(() => {})
  }
}

// Play a preloaded audio element; resolves when ended, aborted, or skipped
function playAudioElement(
  audio: HTMLAudioElement,
  volume: number,
  abortRef: React.MutableRefObject<boolean>,
  skipRef: React.MutableRefObject<boolean>,
  onStateChange: (s: VoiceState) => void,
  onPlayError: (msg: string) => void,
): Promise<void> {
  return new Promise(resolve => {
    _currentAudio = audio
    audio.currentTime = 0
    audio.volume = Math.max(0, Math.min(1, volume))
    audio.muted = false

    let settled = false
    const done = () => {
      if (settled) return
      settled = true
      clearInterval(poll)
      audio.onended = null
      audio.onerror = null
      if (_currentAudio === audio) _currentAudio = null
      resolve()
    }

    const poll = setInterval(() => {
      if (abortRef.current || skipRef.current) {
        audio.pause()
        done()
      }
    }, 80)

    audio.onended = () => { onStateChange('ready'); done() }
    audio.onerror = () => {
      const msg = audio.error ? `MediaError code ${audio.error.code}: ${audio.error.message}` : 'Unknown media error'
      onPlayError(msg)
      onStateChange('error')
      done()
    }

    audio.play()
      .then(() => onStateChange('playing'))
      .catch((err: Error) => {
        const msg = err?.name ? `${err.name}: ${err.message}` : String(err)
        onPlayError(msg)
        onStateChange('error')
        done()
      })
  })
}

// Stop any current audio immediately
function stopCurrentAudio() {
  if (_currentAudio) {
    _currentAudio.pause()
    _currentAudio.onended = null
    _currentAudio.onerror = null
    _currentAudio = null
  }
}

// ── Hook ──────────────────────────────────────────────────────────────────────
export function useNarrationEngine(settings: NarrationSettings) {
  const [voiceState, setVoiceState] = useState<VoiceState>('initializing')
  const [assetsAvailable, setAssetsAvailable] = useState(_assetsAvailable)
  const [debugInfo, setDebugInfo] = useState<Record<string, string>>({})
  const [playError, setPlayError] = useState<string | null>(null)

  const settingsRef = useRef(settings)
  // Guard against HMR hook-slot mismatch (settingsRef briefly resolves to a stale primitive)
  if (settingsRef && typeof settingsRef === 'object') settingsRef.current = settings
  const voiceStateRef = useRef<VoiceState>('initializing')

  const updateVoiceState = useCallback((s: VoiceState) => {
    voiceStateRef.current = s
    setVoiceState(s)
  }, [])

  // Asset detection — runs once per page load, then uses cached result
  useEffect(() => {
    if (_assetsChecked) {
      setAssetsAvailable(_assetsAvailable)
      updateVoiceState(_assetsAvailable ? 'ready' : 'assets_missing')
      return
    }

    if (!_assetsCheckPromise) {
      _assetsCheckPromise = checkAssetsAvailable()
    }

    _assetsCheckPromise.then(available => {
      _assetsAvailable = available
      _assetsChecked = true
      setAssetsAvailable(available)
      updateVoiceState(available ? 'ready' : 'assets_missing')

      if (typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('debugAudio')) {
        setDebugInfo(prev => ({
          ...prev,
          'Assets Available': String(available),
          'First Asset URL': AUDIO_PATHS[0],
          'Startup Time': `${Date.now() - _demoStartTime}ms`,
        }))
      }
    })
  }, [updateVoiceState])

  const stop = useCallback(() => {
    stopCurrentAudio()
    updateVoiceState(_assetsAvailable ? 'ready' : 'assets_missing')
  }, [updateVoiceState])

  const pause = useCallback(() => {
    if (_currentAudio) {
      _currentAudio.pause()
      updateVoiceState('paused')
    }
  }, [updateVoiceState])

  const resume = useCallback(() => {
    if (_currentAudio) {
      _currentAudio.play().catch(() => updateVoiceState('error'))
      updateVoiceState('playing')
    }
  }, [updateVoiceState])

  const playStep = useCallback(async (
    step: number,
    abortRef: React.MutableRefObject<boolean>,
    skipRef: React.MutableRefObject<boolean>,
  ): Promise<void> => {
    const s = settingsRef.current
    if (!s.voiceEnabled || !_assetsAvailable) return

    // Stop any current playback
    stopCurrentAudio()

    // Start preloading next segment while this one loads
    preloadNextInBackground(step)

    updateVoiceState('initializing')

    // Preload this step's segment (instant if cached)
    const audio = await preloadSegment(step)
    if (!audio || abortRef.current || skipRef.current) {
      updateVoiceState('ready')
      return
    }

    // Debug info
    if (typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('debugAudio')) {
      setDebugInfo(prev => ({
        ...prev,
        'Current Segment': String(step),
        'Asset URL': AUDIO_PATHS[step] ?? '',
        'ReadyState': String(audio.readyState),
        'Duration': `${audio.duration?.toFixed(1) ?? '?'}s`,
      }))
    }

    await playAudioElement(audio, s.volume, abortRef, skipRef, updateVoiceState, setPlayError)
  }, [updateVoiceState])

  const retry = useCallback(() => {
    _assetsChecked = false
    _assetsAvailable = false
    _assetsCheckPromise = null
    _audioCache.clear()
    setAssetsAvailable(false)
    updateVoiceState('initializing')

    checkAssetsAvailable().then(available => {
      _assetsAvailable = available
      _assetsChecked = true
      setAssetsAvailable(available)
      updateVoiceState(available ? 'ready' : 'assets_missing')
    })
  }, [updateVoiceState])

  const recordStartTime = useCallback(() => { _demoStartTime = Date.now() }, [])

  // Run a full audio diagnostic for the first narration segment
  const runDiagnostic = useCallback(async (): Promise<AudioDiagnostic> => {
    const assetUrl = AUDIO_PATHS[0]
    const diag: AudioDiagnostic = {
      assetUrl,
      assetFound: null,
      httpStatus: null,
      elementCreated: false,
      readyState: null,
      networkState: null,
      duration: null,
      paused: null,
      muted: null,
      volume: null,
      error: null,
      playResult: null,
      playbackStarted: false,
    }

    // Step 1: HEAD request
    try {
      const ctrl = new AbortController()
      const timer = setTimeout(() => ctrl.abort(), 4000)
      const res = await fetch(assetUrl, { method: 'HEAD', cache: 'no-store', signal: ctrl.signal })
      clearTimeout(timer)
      diag.httpStatus = res.status
      diag.assetFound = res.ok
      if (!res.ok) {
        diag.error = `HTTP ${res.status} ${res.statusText} — asset not found at ${assetUrl}`
        return diag
      }
    } catch (e: unknown) {
      diag.assetFound = false
      diag.error = `Fetch failed: ${(e as Error)?.message ?? String(e)}`
      return diag
    }

    // Step 2: Create Audio element and try to play
    const audio = new Audio(assetUrl)
    diag.elementCreated = true
    audio.volume = 1
    audio.muted = false

    await new Promise<void>(resolve => {
      const timeout = setTimeout(() => {
        diag.error = (diag.error ?? '') + ' | Load timeout after 6s'
        capture()
        resolve()
      }, 6000)

      const capture = () => {
        diag.readyState = audio.readyState
        diag.networkState = audio.networkState
        diag.duration = isNaN(audio.duration) ? null : audio.duration
        diag.paused = audio.paused
        diag.muted = audio.muted
        diag.volume = audio.volume
      }

      audio.addEventListener('canplay', () => {
        clearTimeout(timeout)
        capture()
        audio.play()
          .then(() => {
            diag.playResult = 'RESOLVED'
            diag.playbackStarted = !audio.paused
            capture()
            setTimeout(() => { audio.pause(); resolve() }, 1500)
          })
          .catch((err: Error) => {
            diag.playResult = `REJECTED: ${err?.name}: ${err?.message}`
            capture()
            resolve()
          })
      }, { once: true })

      audio.addEventListener('error', () => {
        clearTimeout(timeout)
        const code = audio.error?.code
        const map: Record<number, string> = { 1: 'MEDIA_ERR_ABORTED', 2: 'MEDIA_ERR_NETWORK', 3: 'MEDIA_ERR_DECODE', 4: 'MEDIA_ERR_SRC_NOT_SUPPORTED' }
        diag.error = (diag.error ?? '') + ` | MediaError ${code}: ${map[code ?? 0] ?? 'unknown'} — ${audio.error?.message ?? ''}`
        capture()
        resolve()
      }, { once: true })

      audio.load()
    })

    return diag
  }, [])

  return {
    voiceState,
    assetsAvailable,
    debugInfo,
    playError,
    isSupported: assetsAvailable,
    playStep,
    pause,
    resume,
    stop,
    retry,
    recordStartTime,
    runDiagnostic,
    voiceName: assetsAvailable ? 'Pre-recorded Female American English' : '',
    currentSentence: '',
    voiceError: voiceState === 'error',
    voiceBlocked: false,
  }
}

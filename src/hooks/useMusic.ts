import { useRef, useCallback, useEffect } from 'react'

export interface MusicSettings {
  musicEnabled: boolean
  volume: number
}

// Ambient level — scaled by user volume
const BASE_GAIN = 0.22
const DUCK_RATIO = 0.38       // 38% of ambient during narration
const FADE_IN_MS = 2500
const FADE_OUT_MS = 1800
const DUCK_MS = 320
const RESTORE_MS = 650

export function useMusic(settings: MusicSettings) {
  const ctxRef = useRef<AudioContext | null>(null)
  const masterRef = useRef<GainNode | null>(null)
  const duckRef = useRef<GainNode | null>(null)
  const nodesRef = useRef<(OscillatorNode | AudioNode)[]>([])
  const isPlayingRef = useRef(false)
  const settingsRef = useRef(settings)
  settingsRef.current = settings

  const stopAll = useCallback(() => {
    nodesRef.current.forEach(n => {
      try { (n as OscillatorNode).stop() } catch {}
    })
    nodesRef.current = []
  }, [])

  // Build the ambient synthesis graph.
  // Signal path: [oscs] → mixGain → lpFilter → delayReverb → duckGain → masterGain → out
  // LFO slowly pulses masterGain for a breathing effect.
  const buildGraph = useCallback((ctx: AudioContext) => {
    stopAll()

    const out = ctx.destination

    // Master gain — fades in/out and muted via musicEnabled
    const master = ctx.createGain()
    master.gain.value = 0
    master.connect(out)
    masterRef.current = master

    // Duck gain — reduced during narration
    const duck = ctx.createGain()
    duck.gain.value = BASE_GAIN * settingsRef.current.volume
    duck.connect(master)
    duckRef.current = duck

    // Low-pass filter — keeps sound soft, rolls off harshness
    const lpf = ctx.createBiquadFilter()
    lpf.type = 'lowpass'
    lpf.frequency.value = 1800
    lpf.Q.value = 0.5
    lpf.connect(duck)

    // Delay reverb — adds space without a convolver
    const delay = ctx.createDelay(2.0)
    delay.delayTime.value = 0.38
    const fbGain = ctx.createGain()
    fbGain.gain.value = 0.28
    delay.connect(fbGain)
    fbGain.connect(delay)
    // Wet/dry mix
    const wet = ctx.createGain(); wet.gain.value = 0.30
    const dry = ctx.createGain(); dry.gain.value = 0.70
    delay.connect(wet); wet.connect(lpf)
    dry.connect(lpf)
    // Drive oscillators into both dry and delay
    const preDry = dry
    const preWet = delay

    // Oscillator bank — frequencies chosen for laptop speaker audibility
    type OscDef = [number, OscillatorType, number]
    const oscDefs: OscDef[] = [
      [220.0, 'sine',     0.40],  // A3 — main audible pad
      [220.6, 'sine',     0.34],  // A3 + slight detune → warm beating
      [330.0, 'sine',     0.16],  // E4 — fifth above
      [440.0, 'sine',     0.09],  // A4 — octave above
      [110.0, 'sine',     0.18],  // A2 — sub warmth
      [550.0, 'sine',     0.05],  // adds presence
    ]

    const mix = ctx.createGain(); mix.gain.value = 0.55
    mix.connect(preDry); mix.connect(preWet)

    const oscs: OscillatorNode[] = []
    for (const [freq, type, gain] of oscDefs) {
      const osc = ctx.createOscillator()
      osc.type = type; osc.frequency.value = freq
      const g = ctx.createGain(); g.gain.value = gain
      osc.connect(g); g.connect(mix)
      oscs.push(osc)
      nodesRef.current.push(osc, g)
    }

    // Slow LFO for gentle breathing pulse (0.07 Hz)
    const lfo = ctx.createOscillator()
    lfo.type = 'triangle'; lfo.frequency.value = 0.07
    const lfoG = ctx.createGain(); lfoG.gain.value = 0.07
    lfo.connect(lfoG); lfoG.connect(mix.gain)

    // Very slow drift LFO (0.04 Hz)
    const lfo2 = ctx.createOscillator()
    lfo2.type = 'sine'; lfo2.frequency.value = 0.04
    const lfoG2 = ctx.createGain(); lfoG2.gain.value = 0.04
    lfo2.connect(lfoG2); lfoG2.connect(mix.gain)

    ;[lfo, lfo2].forEach(o => { o.start(); nodesRef.current.push(o) })
    nodesRef.current.push(lfoG, lfoG2, mix, wet, dry, delay, fbGain, lpf, duck, master)
    oscs.forEach(o => o.start())
  }, [stopAll])

  const start = useCallback(async (fadeInMs = FADE_IN_MS) => {
    if (!settingsRef.current.musicEnabled) return
    try {
      if (!ctxRef.current || ctxRef.current.state === 'closed') {
        ctxRef.current = new AudioContext()
      }
      const ctx = ctxRef.current
      if (ctx.state === 'suspended') await ctx.resume()
      buildGraph(ctx)
      const master = masterRef.current!
      const now = ctx.currentTime
      master.gain.cancelScheduledValues(now)
      master.gain.setValueAtTime(0, now)
      master.gain.linearRampToValueAtTime(1, now + fadeInMs / 1000)
      isPlayingRef.current = true
    } catch (_) {}
  }, [buildGraph])

  const stop = useCallback((fadeOutMs = FADE_OUT_MS) => {
    if (!masterRef.current || !ctxRef.current) return
    isPlayingRef.current = false
    try {
      const ctx = ctxRef.current
      const master = masterRef.current
      const now = ctx.currentTime
      master.gain.cancelScheduledValues(now)
      master.gain.setValueAtTime(master.gain.value, now)
      master.gain.linearRampToValueAtTime(0, now + fadeOutMs / 1000)
      setTimeout(stopAll, fadeOutMs + 200)
    } catch (_) {}
  }, [stopAll])

  const pause = useCallback(() => { ctxRef.current?.suspend() }, [])
  const resume = useCallback(async () => {
    if (ctxRef.current?.state === 'suspended') await ctxRef.current.resume()
  }, [])

  const duck = useCallback(() => {
    if (!duckRef.current || !ctxRef.current) return
    const ctx = ctxRef.current; const g = duckRef.current
    const target = BASE_GAIN * settingsRef.current.volume * DUCK_RATIO
    const now = ctx.currentTime
    g.gain.cancelScheduledValues(now)
    g.gain.setValueAtTime(g.gain.value, now)
    g.gain.linearRampToValueAtTime(target, now + DUCK_MS / 1000)
  }, [])

  const restore = useCallback(() => {
    if (!duckRef.current || !ctxRef.current) return
    const ctx = ctxRef.current; const g = duckRef.current
    const target = BASE_GAIN * settingsRef.current.volume
    const now = ctx.currentTime
    g.gain.cancelScheduledValues(now)
    g.gain.setValueAtTime(g.gain.value, now)
    g.gain.linearRampToValueAtTime(target, now + RESTORE_MS / 1000)
  }, [])

  // Sync volume changes
  useEffect(() => {
    if (!duckRef.current || !ctxRef.current || !isPlayingRef.current) return
    const ctx = ctxRef.current; const g = duckRef.current
    const target = BASE_GAIN * settings.volume
    const now = ctx.currentTime
    g.gain.cancelScheduledValues(now)
    g.gain.setValueAtTime(g.gain.value, now)
    g.gain.linearRampToValueAtTime(target, now + 0.25)
  }, [settings.volume])

  // Sync mute/unmute
  useEffect(() => {
    if (!masterRef.current || !ctxRef.current || !isPlayingRef.current) return
    const ctx = ctxRef.current; const master = masterRef.current
    const now = ctx.currentTime
    master.gain.cancelScheduledValues(now)
    master.gain.setValueAtTime(master.gain.value, now)
    master.gain.linearRampToValueAtTime(settings.musicEnabled ? 1 : 0, now + 0.35)
  }, [settings.musicEnabled])

  useEffect(() => {
    return () => { stopAll(); ctxRef.current?.close() }
  }, [stopAll])

  return { start, stop, pause, resume, duck, restore, isPlaying: isPlayingRef }
}

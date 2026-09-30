import { useState, useCallback } from 'react'
import type { VoiceState, AudioDiagnostic } from '@/hooks/useNarrationEngine'

interface Props {
  visible: boolean
  voiceState?: VoiceState
  voiceName?: string
  onRetryAssets?: () => void
  onContinueWithoutVoice?: () => void
  runDiagnostic?: () => Promise<AudioDiagnostic>
}

const READY_STATE_LABEL: Record<number, string> = { 0: 'HAVE_NOTHING', 1: 'HAVE_METADATA', 2: 'HAVE_CURRENT_DATA', 3: 'HAVE_FUTURE_DATA', 4: 'HAVE_ENOUGH_DATA' }
const NET_STATE_LABEL: Record<number, string> = { 0: 'EMPTY', 1: 'IDLE', 2: 'LOADING', 3: 'NO_SOURCE' }

export default function DemoIntro({ visible, voiceState, voiceName, onRetryAssets, onContinueWithoutVoice, runDiagnostic }: Props) {
  const [diag, setDiag] = useState<AudioDiagnostic | null>(null)
  const [diagRunning, setDiagRunning] = useState(false)
  const [retrying, setRetrying] = useState(false)

  const handleTestVoice = useCallback(async () => {
    if (!runDiagnostic || diagRunning) return
    setDiagRunning(true)
    setDiag(null)
    try {
      const result = await runDiagnostic()
      setDiag(result)
    } finally {
      setDiagRunning(false)
    }
  }, [runDiagnostic, diagRunning])

  const handleRetry = useCallback(async () => {
    setRetrying(true)
    setDiag(null)
    onRetryAssets?.()
    // Give detection 3s then stop spinner
    setTimeout(() => setRetrying(false), 3000)
  }, [onRetryAssets])

  if (!visible) return null

  const isMissing = voiceState === 'assets_missing'
  const isInitializing = voiceState === 'initializing'
  const isReady = voiceState === 'ready' || voiceState === 'playing'

  return (
    <div className="fixed inset-0 z-50 bg-[#03050c]/97 flex items-center justify-center animate-fade-in overflow-y-auto py-8">
      <div className="max-w-xl w-full px-8 space-y-5">

        {/* Badge */}
        <div className="flex justify-center">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded border border-blue-700/50 bg-blue-900/20">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse-slow" />
            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.2em]">VetoPlane — Auto Demo</span>
          </div>
        </div>

        {/* Title */}
        <div className="space-y-1 text-center">
          <h1 className="text-3xl font-bold text-slate-100">VetoPlane Investor Demo</h1>
          <p className="text-slate-400 text-sm">Narrated walkthrough of the execution-control architecture.</p>
        </div>

        {/* Architecture flow */}
        <div className="bg-[#080e1c] border border-[#1a2d45] rounded-xl px-5 py-4">
          <div className="flex items-center justify-center gap-2 flex-wrap text-xs font-mono">
            {['AI Agent', 'Gateway', 'VetoPlane', 'MCP Server', 'Enterprise'].map((node, i, arr) => (
              <div key={node} className="flex items-center gap-2">
                <span className={`px-2.5 py-1 rounded border ${
                  node === 'VetoPlane'
                    ? 'border-blue-600/60 bg-blue-900/30 text-blue-300 font-bold'
                    : 'border-[#1a2d45] text-slate-500'
                }`}>{node}</span>
                {i < arr.length - 1 && <span className="text-slate-700">→</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Voice status block */}
        {isMissing ? (
          <div className="bg-red-950/40 border border-red-700/60 rounded-xl px-5 py-4 space-y-4">
            {/* Header */}
            <div className="flex items-center gap-2">
              <span className="text-red-400 text-lg">✕</span>
              <span className="text-red-300 font-bold text-sm uppercase tracking-wide">Voice Initialization Failed</span>
            </div>
            <p className="text-red-200/70 text-xs leading-relaxed">
              The narration MP3 assets were not found. The narrated investor experience requires{' '}
              <code className="bg-red-900/30 px-1 rounded font-mono text-[10px]">public/narration/*.mp3</code> files to be present.
            </p>

            {/* TEST VOICE button */}
            <button
              onClick={handleTestVoice}
              disabled={diagRunning}
              className="w-full py-3 rounded-lg text-sm font-bold uppercase tracking-wide bg-blue-900/40 hover:bg-blue-900/60 border border-blue-700/60 text-blue-200 transition-all cursor-pointer disabled:opacity-50"
            >
              {diagRunning ? '⏳ Running Diagnostic…' : '▶ TEST VOICE'}
            </button>

            {/* Diagnostic results */}
            {diag && (
              <div className="bg-[#04080f] border border-[#1a2d45] rounded-lg p-4 font-mono text-[10px] space-y-1.5">
                <div className="text-slate-400 font-bold mb-2 uppercase tracking-wider text-[9px]">Audio Diagnostic</div>
                <DiagRow label="Audio source" value={diag.assetUrl} />
                <DiagRow label="Asset found" value={diag.assetFound === null ? '—' : diag.assetFound ? 'YES' : 'NO'} ok={diag.assetFound === true} bad={diag.assetFound === false} />
                <DiagRow label="HTTP status" value={diag.httpStatus !== null ? String(diag.httpStatus) : '—'} ok={diag.httpStatus === 200} bad={!!diag.httpStatus && diag.httpStatus !== 200} />
                <DiagRow label="Element created" value={diag.elementCreated ? 'YES' : 'NO'} ok={diag.elementCreated} />
                <DiagRow label="readyState" value={diag.readyState !== null ? `${diag.readyState} (${READY_STATE_LABEL[diag.readyState] ?? '?'})` : '—'} ok={diag.readyState === 4} bad={diag.readyState === 0 || diag.readyState === null} />
                <DiagRow label="networkState" value={diag.networkState !== null ? `${diag.networkState} (${NET_STATE_LABEL[diag.networkState] ?? '?'})` : '—'} />
                <DiagRow label="duration" value={diag.duration !== null ? `${diag.duration.toFixed(2)}s` : '—'} />
                <DiagRow label="paused" value={diag.paused !== null ? String(diag.paused) : '—'} bad={diag.paused === true && diag.playResult?.startsWith('RESOLVED')} />
                <DiagRow label="muted" value={diag.muted !== null ? String(diag.muted) : '—'} bad={diag.muted === true} />
                <DiagRow label="volume" value={diag.volume !== null ? `${diag.volume}` : '—'} bad={diag.volume === 0} />
                <DiagRow label="play() result" value={diag.playResult ?? '(not attempted)'} ok={diag.playResult === 'RESOLVED'} bad={!!diag.playResult && diag.playResult !== 'RESOLVED'} />
                <DiagRow label="Playback started" value={diag.playbackStarted ? 'YES' : 'NO'} ok={diag.playbackStarted} bad={!diag.playbackStarted && !!diag.playResult} />
                {diag.error && (
                  <div className="mt-2 pt-2 border-t border-red-900/40">
                    <span className="text-red-400">Error: </span>
                    <span className="text-red-300 break-all">{diag.error}</span>
                  </div>
                )}
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={handleRetry}
                disabled={retrying}
                className="flex-1 py-3 rounded-lg text-sm font-bold uppercase tracking-wide bg-amber-900/30 hover:bg-amber-900/50 border border-amber-700/50 text-amber-200 transition-all cursor-pointer disabled:opacity-60"
              >
                {retrying ? '⏳ Retrying…' : '↺ Retry Voice'}
              </button>
              <button
                onClick={onContinueWithoutVoice}
                className="flex-1 py-2 rounded-lg text-xs font-medium text-slate-500 hover:text-slate-300 border border-[#1a2d45] hover:border-[#253d5a] transition-all cursor-pointer"
              >
                Continue Without Voice
              </button>
            </div>

            <p className="text-[9px] text-slate-600 text-center">
              Required: <code className="font-mono">public/narration/intro.mp3</code> (and 16 other segments)
            </p>
          </div>

        ) : (
          <div className="grid grid-cols-2 gap-3 text-left text-xs">
            <div className="bg-[#080e1c] border border-[#1a2d45] rounded-lg px-4 py-3">
              <div className="text-[9px] text-slate-600 uppercase tracking-wider mb-1">Narration</div>
              <div className="flex items-center gap-1.5">
                <span className={`text-[10px] ${isInitializing ? 'text-amber-400 animate-pulse-slow' : 'text-blue-400 animate-pulse-slow'}`}>●</span>
                <span className="text-slate-300 font-medium">
                  {isInitializing ? 'Checking assets…' : 'Female American English'}
                </span>
              </div>
              {voiceName && isReady && <div className="text-slate-600 mt-0.5 text-[9px] truncate">{voiceName}</div>}
            </div>
            <div className="bg-[#080e1c] border border-[#1a2d45] rounded-lg px-4 py-3">
              <div className="text-[9px] text-slate-600 uppercase tracking-wider mb-1">Music</div>
              <div className="text-slate-500">None — voice only</div>
            </div>
          </div>
        )}

        {/* Starting status (only when not blocked) */}
        {!isMissing && (
          <div className="text-center text-[10px] text-slate-600 font-mono uppercase tracking-widest animate-pulse">
            {isInitializing ? 'Checking voice assets…' : 'Starting…'}
          </div>
        )}
      </div>
    </div>
  )
}

function DiagRow({ label, value, ok, bad }: { label: string; value: string; ok?: boolean; bad?: boolean }) {
  return (
    <div className="flex gap-2 items-start">
      <span className="text-slate-600 shrink-0 w-36">{label}:</span>
      <span className={ok ? 'text-green-400' : bad ? 'text-red-400' : 'text-slate-300'}>{value}</span>
    </div>
  )
}

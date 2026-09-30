import { useEffect, useState, useRef } from 'react'

export interface DemoSettings {
  voiceEnabled: boolean
  musicEnabled: boolean
  volume: number
  rate: number
  captionsEnabled: boolean
  autoAdvance: boolean
}

export interface NarrationProps {
  isActive: boolean
  step: number
  totalSteps: number
  chapter: string
  narration: string
  currentSentence: string
  isPaused: boolean
  isSpeechSupported: boolean
  voiceError: boolean
  voiceName?: string
  settings: DemoSettings
  onSettingsChange: (s: Partial<DemoSettings>) => void
  onPause: () => void
  onResume: () => void
  onNext: () => void
  onPrev: () => void
  onRestart: () => void
  onExit: () => void
  progress: number
}

export default function NarrationPanel({
  isActive, step, totalSteps, chapter, narration, currentSentence,
  isPaused, isSpeechSupported, voiceError, voiceName,
  settings, onSettingsChange,
  onPause, onResume, onNext, onPrev, onRestart, onExit, progress,
}: NarrationProps) {
  const [showSettings, setShowSettings] = useState(false)
  const [displayedText, setDisplayedText] = useState(narration)
  const [textFade, setTextFade] = useState(true)
  const prevNarration = useRef(narration)

  useEffect(() => {
    if (narration !== prevNarration.current) {
      setTextFade(false)
      const t = setTimeout(() => { setDisplayedText(narration); setTextFade(true) }, 120)
      prevNarration.current = narration
      return () => clearTimeout(t)
    }
  }, [narration])

  if (!isActive) return null

  const isBonus = step > 12
  const stepLabel = isBonus
    ? step >= totalSteps - 1 ? 'SUMMARY' : `BONUS ${String.fromCharCode(64 + (step - 12))}`
    : `${String(step).padStart(2, '0')} / 12`

  // Caption display: if captionsEnabled and currentSentence, show that; else full narration
  const captionText = settings.captionsEnabled && currentSentence ? currentSentence : displayedText

  return (
    <div className="flex-shrink-0 border-t border-[#1a2d45] bg-[#060b17] relative" style={{ minHeight: '136px' }}>
      {/* Settings overlay */}
      {showSettings && (
        <SettingsPanel
          settings={settings}
          isSpeechSupported={isSpeechSupported}
          voiceName={voiceName}
          onSettingsChange={onSettingsChange}
          onClose={() => setShowSettings(false)}
        />
      )}

      <div className="flex h-full">
        {/* Left: status + chapter */}
        <div className="flex-shrink-0 w-52 border-r border-[#1a2d45] flex flex-col justify-center px-4 py-3">
          <div className="flex items-center gap-2 mb-2">
            <span className={`w-1.5 h-1.5 rounded-full ${isPaused ? 'bg-amber-500' : 'bg-blue-500 animate-pulse-slow'}`} />
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-blue-400">
              {isPaused ? 'PAUSED' : 'AUTO DEMO'}
            </span>
            {voiceError && settings.voiceEnabled && (
              <span className="text-[9px] text-amber-500" title="Voice unavailable">🔇</span>
            )}
          </div>
          <div className="font-mono text-[11px] text-slate-200 font-semibold leading-snug mb-2 line-clamp-2">{chapter}</div>
          <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded border text-[9px] font-mono font-bold w-fit ${
            isBonus ? 'bg-purple-900/25 border-purple-800/50 text-purple-400' : 'bg-blue-900/25 border-blue-800/50 text-blue-400'
          }`}>{stepLabel}</div>
          {/* Voice status indicator */}
          <div className="mt-2">
            {!settings.voiceEnabled ? (
              <div className="text-[8px] font-mono text-slate-600 uppercase tracking-widest">🔇 VOICE OFF</div>
            ) : !isSpeechSupported ? (
              <div className="text-[8px] font-mono text-amber-700 uppercase tracking-widest bg-amber-950/40 px-1.5 py-0.5 rounded inline-block border border-amber-900/40">⚠ ASSETS MISSING</div>
            ) : (
              <div className={`text-[8px] font-mono font-semibold uppercase tracking-widest px-1.5 py-0.5 rounded inline-block ${
                voiceError ? 'text-red-400 bg-red-900/20' :
                currentSentence ? 'text-green-400 bg-green-900/20' :
                isPaused ? 'text-amber-400 bg-amber-900/20' :
                'text-blue-400 bg-blue-900/20'
              }`}>
                {voiceError ? '⚠ ERROR' : currentSentence ? '▶ PLAYING' : isPaused ? 'Ⅱ PAUSED' : '◉ VOICE READY'}
              </div>
            )}
            {voiceName && settings.voiceEnabled && (
              <div className="text-[8px] text-slate-600 mt-0.5 truncate max-w-[140px]" title={voiceName}>{voiceName}</div>
            )}
          </div>
        </div>

        {/* Center: captions + progress */}
        <div className="flex-1 flex flex-col justify-between px-5 py-3 overflow-hidden">
          <div className="flex-1 flex items-start">
            <p
              className="text-sm leading-relaxed transition-opacity duration-150 line-clamp-3"
              style={{ opacity: textFade ? 1 : 0, color: settings.captionsEnabled && currentSentence ? '#e2e8f0' : '#94a3b8' }}
            >
              {captionText}
            </p>
          </div>

          {/* Progress bar */}
          <div className="mt-auto pt-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[9px] text-slate-600 font-mono">Progress</span>
              <span className="text-[9px] text-slate-600 font-mono">{Math.round(progress)}%</span>
            </div>
            <div className="h-px bg-[#1a2d45] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #2563eb, #3b82f6)' }}
              />
            </div>
          </div>
        </div>

        {/* Right: controls */}
        <div className="flex-shrink-0 w-56 border-l border-[#1a2d45] flex flex-col justify-center px-4 py-3 gap-2">
          {/* Voice toggle */}
          <div className="flex items-center gap-1.5 mb-1">
            <button
              onClick={() => onSettingsChange({ voiceEnabled: !settings.voiceEnabled })}
              title={settings.voiceEnabled ? 'Voice ON — click to mute' : 'Voice OFF — click to unmute'}
              aria-label={settings.voiceEnabled ? 'Disable voice narration' : 'Enable voice narration'}
              className={`flex-1 flex items-center justify-center gap-1 text-[10px] px-1.5 py-1 rounded border cursor-pointer transition-colors select-none ${
                settings.voiceEnabled && isSpeechSupported
                  ? 'border-blue-700/50 bg-blue-900/20 text-blue-300 hover:bg-blue-900/40'
                  : 'border-[#1a2d45] text-slate-500 hover:border-[#253d5a]'
              }`}
            >
              <span>{settings.voiceEnabled && isSpeechSupported ? '🔊' : '🔇'}</span>
              <span>Voice Narration</span>
            </button>
          </div>
          {/* Volume row */}
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[9px] text-slate-600 w-10">Vol</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={settings.volume}
              onChange={e => onSettingsChange({ volume: parseFloat(e.target.value) })}
              title={`Volume: ${Math.round(settings.volume * 100)}%`}
              aria-label="Adjust volume"
              className="flex-1 h-1 accent-blue-500 cursor-pointer"
            />
            <span className="text-[10px] text-slate-500 font-mono w-8 text-right">{Math.round(settings.volume * 100)}%</span>
          </div>

          {/* Playback controls row 1 */}
          <div className="flex gap-1">
            <CtrlBtn onClick={onPrev} title="Previous step">◀</CtrlBtn>
            <CtrlBtn
              onClick={isPaused ? onResume : onPause}
              title={isPaused ? 'Resume' : 'Pause'}
              highlight={!isPaused}
            >
              {isPaused ? '▶' : 'Ⅱ'}
            </CtrlBtn>
            <CtrlBtn onClick={onNext} title="Next step">▶▶</CtrlBtn>
          </div>

          {/* Playback controls row 2 */}
          <div className="flex gap-1">
            <CtrlBtn onClick={onRestart} title="Restart demo" className="flex-1 text-[10px]">↻</CtrlBtn>
            <CtrlBtn
              onClick={() => setShowSettings(!showSettings)}
              title="Demo settings"
              highlight={showSettings}
              className="flex-1 text-[10px]"
            >⚙</CtrlBtn>
            <CtrlBtn
              onClick={onExit}
              title="Exit demo"
              className="flex-1 text-[10px] !text-red-400 !border-red-900/40 hover:!border-red-700/50"
            >×</CtrlBtn>
          </div>
        </div>
      </div>
    </div>
  )
}

function CtrlBtn({ children, onClick, title, className = '', highlight = false }: {
  children: React.ReactNode; onClick: () => void; title?: string
  className?: string; highlight?: boolean
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`flex-1 text-center text-[10px] font-medium px-1.5 py-1.5 rounded border cursor-pointer transition-colors select-none ${
        highlight
          ? 'bg-blue-900/30 border-blue-700/50 text-blue-300 hover:bg-blue-900/50'
          : 'bg-transparent border-[#1a2d45] text-slate-400 hover:text-slate-200 hover:border-[#253d5a]'
      } ${className}`}
    >
      {children}
    </button>
  )
}

function SettingsPanel({ settings, isSpeechSupported, voiceName, onSettingsChange, onClose }: {
  settings: DemoSettings
  isSpeechSupported: boolean
  voiceName?: string
  onSettingsChange: (s: Partial<DemoSettings>) => void
  onClose: () => void
}) {
  return (
    <div className="absolute bottom-full right-0 w-72 bg-[#080f1e] border border-[#1a2d45] rounded-t-lg shadow-2xl animate-slide-in z-30">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#1a2d45]">
        <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Demo Settings</span>
        <button onClick={onClose} className="text-slate-500 hover:text-slate-200 text-xs cursor-pointer">×</button>
      </div>
      <div className="px-4 py-3 space-y-3">
        <Row label="Voice">
          <div className="flex items-center gap-2">
            {isSpeechSupported
              ? <span className="text-[10px] text-slate-400">{voiceName || 'Pre-recorded Audio'}</span>
              : <span className="text-[10px] text-amber-600">Assets Missing</span>}
            <Toggle checked={settings.voiceEnabled && isSpeechSupported} onChange={v => onSettingsChange({ voiceEnabled: v })} />
          </div>
        </Row>
        <Row label="Speed">
          <div className="flex items-center gap-2">
            <input type="range" min="0.7" max="1.3" step="0.05" value={settings.rate}
              onChange={e => onSettingsChange({ rate: parseFloat(e.target.value) })}
              className="w-24 h-1 accent-blue-500 cursor-pointer" />
            <span className="text-[10px] text-slate-400 font-mono">{settings.rate.toFixed(2)}x</span>
          </div>
        </Row>
        <Row label="Volume">
          <div className="flex items-center gap-2">
            <input type="range" min="0" max="1" step="0.05" value={settings.volume}
              onChange={e => onSettingsChange({ volume: parseFloat(e.target.value) })}
              className="w-24 h-1 accent-blue-500 cursor-pointer" />
            <span className="text-[10px] text-slate-400 font-mono">{Math.round(settings.volume * 100)}%</span>
          </div>
        </Row>
        <Row label="Captions">
          <Toggle checked={settings.captionsEnabled} onChange={v => onSettingsChange({ captionsEnabled: v })} />
        </Row>
        <Row label="Auto Advance">
          <Toggle checked={settings.autoAdvance} onChange={v => onSettingsChange({ autoAdvance: v })} />
        </Row>
      </div>
    </div>
  )
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-slate-400">{label}</span>
      {children}
    </div>
  )
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative w-8 h-4 rounded-full transition-colors cursor-pointer border ${
        checked ? 'bg-blue-600 border-blue-500' : 'bg-slate-700 border-slate-600'
      }`}
    >
      <span className={`absolute top-0.5 w-3 h-3 rounded-full bg-white shadow transition-all ${checked ? 'left-4.5' : 'left-0.5'}`} />
    </button>
  )
}

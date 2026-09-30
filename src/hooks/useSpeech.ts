import { useEffect, useRef, useState, useCallback } from 'react'

export interface SpeechSettings {
  voiceEnabled: boolean
  volume: number   // 0–1
  rate: number     // 0.5–2
}

function splitSentences(text: string): string[] {
  return text
    .replace(/\n+/g, ' ')
    .split(/(?<=[.!?])\s+/)
    .map(s => s.trim())
    .filter(Boolean)
}

const MALE_NAMES = [
  'Aaron', 'Alex', 'Arthur', 'Bruce', 'Daniel', 'David', 'Eric',
  'Fred', 'George', 'Gordon', 'Guy', 'James', 'Lee', 'Luca', 'Mark',
  'Matthew', 'Mike', 'Nathan', 'Oliver', 'Ralph', 'Richard', 'Ryan',
  'Rishi', 'Sam', 'Thomas', 'Tom', 'Wayne', 'William', 'Xander',
]
const FEMALE_NAMES = [
  'Alice', 'Allison', 'Amanda', 'Ava', 'Catherine', 'Ellen', 'Emma',
  'Fiona', 'Janet', 'Karen', 'Kate', 'Laura', 'Lisa', 'Marie',
  'Mary', 'Moira', 'Nicole', 'Nora', 'Samantha', 'Sara', 'Sarah',
  'Siri', 'Susan', 'Tessa', 'Tina', 'Victoria', 'Veena', 'Zoe', 'Zosia',
]

function looksLikeMale(v: SpeechSynthesisVoice): boolean {
  const n = v.name
  if (/\bmale\b/i.test(n)) return true
  if (/\bfemale\b/i.test(n)) return false
  if (FEMALE_NAMES.some(f => n.includes(f))) return false
  return MALE_NAMES.some(m => n.includes(m))
}

function looksLikeFemale(v: SpeechSynthesisVoice): boolean {
  const n = v.name
  if (/\bfemale\b/i.test(n)) return true
  if (/\bmale\b/i.test(n)) return false
  return FEMALE_NAMES.some(f => n.includes(f))
}

function pickVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  const enUS = voices.filter(v => v.lang === 'en-US')
  const enAny = voices.filter(v => v.lang.startsWith('en'))
  // Prefer en-US female, natural quality, non-compact
  return (
    enUS.find(v => v.localService && looksLikeFemale(v) && !v.name.includes('Compact')) ||
    enUS.find(v => v.localService && looksLikeFemale(v)) ||
    enUS.find(v => looksLikeFemale(v)) ||
    enUS.find(v => v.localService && !looksLikeMale(v) && !v.name.includes('Compact')) ||
    enUS.find(v => !looksLikeMale(v)) ||
    enUS[0] ||
    enAny.find(v => looksLikeFemale(v)) ||
    enAny[0] ||
    voices[0] ||
    null
  )
}

export function useSpeech(settings: SpeechSettings) {
  const [isSupported, setIsSupported] = useState(false)
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const [selectedVoiceName, setSelectedVoiceName] = useState('')
  const [currentSentence, setCurrentSentence] = useState('')
  const [voiceError, setVoiceError] = useState(false)
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null)
  const settingsRef = useRef(settings)
  settingsRef.current = settings

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
    setIsSupported(true)
    const loadVoices = () => {
      const v = window.speechSynthesis.getVoices()
      if (v.length) {
        setVoices(v)
        const picked = pickVoice(v)
        voiceRef.current = picked
        setSelectedVoiceName(picked?.name ?? '')
      }
    }
    loadVoices()
    window.speechSynthesis.addEventListener('voiceschanged', loadVoices)
    return () => window.speechSynthesis.removeEventListener('voiceschanged', loadVoices)
  }, [])

  const speakOne = useCallback((
    text: string,
    abortRef: React.MutableRefObject<boolean>,
    skipRef: React.MutableRefObject<boolean>,
  ): Promise<void> => {
    return new Promise((resolve) => {
      const s = settingsRef.current
      if (!isSupported || !s.voiceEnabled) { resolve(); return }
      window.speechSynthesis.cancel()
      const ut = new SpeechSynthesisUtterance(text)
      ut.lang = 'en-US'
      if (voiceRef.current) ut.voice = voiceRef.current
      ut.volume = Math.max(0, Math.min(1, s.volume))
      ut.rate = Math.max(0.5, Math.min(2, s.rate))
      ut.pitch = 1.05
      let settled = false
      const done = () => { if (!settled) { settled = true; resolve() } }
      const poll = setInterval(() => {
        if (abortRef.current || skipRef.current) {
          window.speechSynthesis.cancel(); clearInterval(poll); done()
        }
      }, 80)
      ut.onend = () => { clearInterval(poll); done() }
      ut.onerror = () => { clearInterval(poll); setVoiceError(true); done() }
      try { window.speechSynthesis.speak(ut); setVoiceError(false) }
      catch { clearInterval(poll); setVoiceError(true); done() }
    })
  }, [isSupported])

  const speak = useCallback(async (
    text: string,
    abortRef: React.MutableRefObject<boolean>,
    skipRef: React.MutableRefObject<boolean>,
  ): Promise<void> => {
    const s = settingsRef.current
    if (!isSupported || !s.voiceEnabled) return
    const sentences = splitSentences(text)
    for (const sentence of sentences) {
      if (abortRef.current || skipRef.current) break
      setCurrentSentence(sentence)
      await speakOne(sentence, abortRef, skipRef)
      if (!abortRef.current && !skipRef.current) await new Promise<void>(r => setTimeout(r, 240))
    }
    setCurrentSentence('')
  }, [isSupported, speakOne])

  const stop = useCallback(() => { if (isSupported) window.speechSynthesis.cancel(); setCurrentSentence('') }, [isSupported])
  const pause = useCallback(() => { if (isSupported) window.speechSynthesis.pause() }, [isSupported])
  const resume = useCallback(() => { if (isSupported) window.speechSynthesis.resume() }, [isSupported])

  return { isSupported, voices, selectedVoiceName, currentSentence, voiceError, speak, stop, pause, resume }
}

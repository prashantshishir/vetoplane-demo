import { useState, useEffect, useCallback, useRef } from 'react'
import { Dot, Pill } from './components/ui'
import NarrationPanel, { type DemoSettings } from './components/NarrationPanel'
import DemoIntro from './components/DemoIntro'
import { useNarrationEngine } from './hooks/useNarrationEngine'
import Website from './Website'
import Stage01 from './stages/Stage01'
import Stage02 from './stages/Stage02'
import Stage03 from './stages/Stage03'
import Stage04 from './stages/Stage04'
import Stage05 from './stages/Stage05'
import Stage06 from './stages/Stage06'
import Stage07 from './stages/Stage07'
import Stage08 from './stages/Stage08'
import StageExec from './stages/StageExec'

// ── Types ──────────────────────────────────────────────────────────────────────
type Phase =
  | 'idle' | 'tx_open'
  | 'p_received' | 'p_auth' | 'p_tool' | 'p_args' | 'p_execid'
  | 'p_policy' | 'p_reconciling' | 'p_synced' | 'p_decision'
  | 'approval' | 'approved' | 'executing' | 'succeeded'
  | 'duplicate' | 'susp_blocked' | 'fc_countdown' | 'fc_blocked'
  | 'ambiguous' | 'rate_limited'

type SubDemo = 'none' | 'duplicate' | 'duplicate_done' | 'ambiguous' | 'susp_blocked' | 'rate_limited'

interface AuditEvent { id: number; time: string; msg: string; type: 'info' | 'warn' | 'success' | 'error' }

// ── Utilities ──────────────────────────────────────────────────────────────────
const sleep = (ms: number) => new Promise<void>(r => setTimeout(r, ms))
const fmtSecs = (s: number) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`
let _eid = 200
const mkAudit = (msg: string, type: AuditEvent['type']): AuditEvent => ({
  id: _eid++, time: new Date().toLocaleTimeString('en-GB', { hour12: false }), msg, type,
})
const INITIAL_AUDIT: AuditEvent[] = [
  { id: 1, time: '19:01:12', msg: 'Policy v42 active — initial configuration loaded', type: 'info' },
]

// ── Demo step definitions ──────────────────────────────────────────────────────
const DEMO_STEPS = [
  { n: 0,  label: 'Introduction',             chapter: 'VetoPlane — Execution Control',                ms: 13000 },
  { n: 1,  label: 'Register Agent',            chapter: 'Step 01 — Register Agent',                      ms: 20000 },
  { n: 2,  label: 'Connect Infrastructure',    chapter: 'Step 02 — Connect Existing Infrastructure',     ms: 27000 },
  { n: 3,  label: 'Register Tools',            chapter: 'Step 03 — Register Tools',                      ms: 20000 },
  { n: 4,  label: 'Bind Tool Version',         chapter: 'Step 04 — Immutable Tool Version Binding',      ms: 16000 },
  { n: 5,  label: 'Configure Policy',          chapter: 'Step 05 — Configure Execution Policy',          ms: 30000 },
  { n: 6,  label: 'Agent Request',             chapter: 'Step 06 — Autonomous Agent Request',            ms: 16000 },
  { n: 7,  label: 'Execution Pipeline',        chapter: 'Step 07 — Execution Control Pipeline',          ms: 22000 },
  { n: 8,  label: 'Stale Policy',              chapter: 'Step 08 — Stale Policy Reconciliation',         ms: 27000 },
  { n: 9,  label: 'Transaction Governance',    chapter: 'Step 09 — Transaction-Level Governance',        ms: 27000 },
  { n: 10, label: 'Transaction-Bound Approval', chapter: 'Step 10 — Transaction-Bound Approval',         ms: 27000 },
  { n: 11, label: 'Approve & Execute',         chapter: 'Step 11 — Approve & Execute',                   ms: 24000 },
  { n: 12, label: 'Execution Ledger',          chapter: 'Step 12 — Execution Ledger',                    ms: 20000 },
  { n: 13, label: 'Duplicate Protection',      chapter: 'Bonus A — Duplicate Protection',                ms: 11000 },
  { n: 14, label: 'Emergency Suspend',         chapter: 'Bonus B — Emergency Suspension',                ms: 14000 },
  { n: 15, label: 'Fail-Closed',               chapter: 'Bonus C — Fail-Closed Enforcement',             ms: 16000 },
  { n: 16, label: 'Executive Summary',         chapter: 'VetoPlane — Execution Control',               ms: 27000 },
]
const TOTAL_MAIN_STEPS = 12

const DEMO_NARRATION: Record<number, string> = {
  0:  'AI agents are moving from generating answers to taking real actions across enterprise systems.',
  1:  'This is an autonomous customer support agent operating in production.',
  2:  'VetoPlane sits at the execution boundary, alongside the infrastructure the enterprise already operates.',
  3:  'The agent is bound to specific tools and immutable tool versions.',
  4:  'Each tool is bound to an exact version. This is the deterministic execution boundary.',
  5:  'Execution policy determines what this agent can actually execute.',
  6:  'The agent now decides to delete a customer record.',
  7:  'Before anything reaches the enterprise system, VetoPlane evaluates the transaction itself — who is acting, what they are trying to do, which tool version is being used, the exact arguments, the policy and the execution context.',
  8:  'The execution gateway detects that its cached policy is older than the control-plane version. VetoPlane reconciles the configuration before evaluating the transaction against authoritative policy.',
  9:  "Don't just authorize the agent. Govern the transaction. VetoPlane knows exactly who is acting, what tool is being called, which version, the exact arguments, which policy evaluated the request, and what decision was made.",
  10: 'For actions that are permitted but classified as critical or irreversible, VetoPlane requires human approval before execution. The approval is bound to this exact transaction — not a general permission.',
  11: 'Only after approval does the action cross the execution boundary.',
  12: 'The resulting execution is recorded as evidence.',
  13: 'If the same transaction is submitted again, VetoPlane detects the duplicate rather than blindly executing it twice.',
  14: 'Enterprise operators can immediately stop an agent from executing further actions.',
  15: 'When authoritative execution policy cannot be confirmed, VetoPlane stops execution rather than guessing.',
  16: 'AI agents can make autonomous decisions. VetoPlane controls what those decisions are actually allowed to execute. Identity. Policy. Approval. Execution. Evidence.',
}


const STAGE_LABELS = [
  { n: 1, label: 'Register Agent' }, { n: 2, label: 'Connect Infrastructure' },
  { n: 3, label: 'Register Tools' }, { n: 4, label: 'Configure Policy' },
  { n: 5, label: 'Test Agent' }, { n: 6, label: 'Live Execution' },
  { n: 7, label: 'Human Approval' }, { n: 8, label: 'Execution Ledger' },
  { n: 9, label: 'Exec Control View' },
]

// ── Root ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [view, setView] = useState<'website' | 'demo'>('website')
  const [autoStartDemo, setAutoStartDemo] = useState(false)

  if (view === 'website') {
    return (
      <Website
        onEnterDemo={() => { setAutoStartDemo(false); setView('demo') }}
        onWatchAutoDemo={() => {
          setAutoStartDemo(true)
          setView('demo')
        }}
      />
    )
  }
  return (
    <DemoApp
      onBack={() => { setAutoStartDemo(false); setView('website') }}
      autoStart={autoStartDemo}
    />
  )
}

// ── Demo App ───────────────────────────────────────────────────────────────────
function DemoApp({ onBack, autoStart = false }: { onBack: () => void; autoStart?: boolean }) {
  // Stage nav
  const [stage, setStage] = useState(1)
  const [completed, setCompleted] = useState<Set<number>>(new Set())

  // Stage state
  const [agentRegistered, setAgentRegistered] = useState(false)
  const [agentStatus, setAgentStatus] = useState<'active' | 'suspended'>('active')
  const [gatewayConnected, setGatewayConnected] = useState(false)
  const [toolsRegistered, setToolsRegistered] = useState(false)
  const [policyPublished, setPolicyPublished] = useState(false)
  const [refundThreshold, setRefundThreshold] = useState(500)
  const [policyVerNum, setPolicyVerNum] = useState(42)

  // Execution state
  const [phase, setPhase] = useState<Phase>('idle')
  const [gatewayVer, setGatewayVer] = useState('v42')
  const [cpVer, setCpVer] = useState('v42')
  const [cpVChanged, setCpVChanged] = useState(false)
  const [cpConn, setCpConn] = useState<'connected' | 'disconnected'>('connected')
  const [staleSince, setStaleSince] = useState<number | null>(null)
  const [staleAgeSecs, setStaleAgeSecs] = useState(0)
  const [approvalSecs, setApprovalSecs] = useState(522)
  const [fcSecs, setFcSecs] = useState(299)
  const [auditLog, setAuditLog] = useState<AuditEvent[]>(INITIAL_AUDIT)
  const [subDemo, setSubDemo] = useState<SubDemo>('none')
  const runningRef = useRef(false)

  // Auto demo state
  const [isAutoDemo, setIsAutoDemo] = useState(false)
  const [autoDemoStep, setAutoDemoStep] = useState(0)
  const [demoChapter, setDemoChapter] = useState('')
  const [demoNarration, setDemoNarration] = useState('')
  const [isDemoPaused, setIsDemoPaused] = useState(false)
  const [showIntro, setShowIntro] = useState(false)
  const [demoProgress, setDemoProgress] = useState(0)
  const pauseRef = useRef(false)
  const abortRef = useRef(false)
  const skipRef = useRef(false)
  const demoActiveRef = useRef(false)
  const introResolveRef = useRef<(() => void) | null>(null)

  // Voice / demo settings
  const [demoSettings, setDemoSettings] = useState<DemoSettings>({
    voiceEnabled: true,
    musicEnabled: false,
    volume: 0.75,
    rate: 1.02,
    captionsEnabled: true,
    autoAdvance: true,
  })
  const engine = useNarrationEngine({ voiceEnabled: demoSettings.voiceEnabled, volume: demoSettings.volume, rate: demoSettings.rate })
  // Ref so startAutoDemo always sees the latest engine without capturing stale closures
  const engineRef = useRef(engine)
  engineRef.current = engine

  const addAudit = useCallback((msg: string, type: AuditEvent['type']) => {
    setAuditLog(prev => [...prev, mkAudit(msg, type)])
  }, [])

  const advance = (from: number, to: number) => {
    setCompleted(prev => new Set([...prev, from]))
    setStage(to)
  }

  // Stale age counter
  useEffect(() => {
    if (!staleSince) { setStaleAgeSecs(0); return }
    const id = setInterval(() => setStaleAgeSecs(Math.floor((Date.now() - staleSince) / 1000)), 1000)
    return () => clearInterval(id)
  }, [staleSince])

  // Approval countdown
  useEffect(() => {
    if (phase !== 'approval') return
    setApprovalSecs(522)
    const id = setInterval(() => setApprovalSecs(s => Math.max(0, s - 1)), 1000)
    return () => clearInterval(id)
  }, [phase])

  // Fail-closed countdown
  useEffect(() => {
    if (phase !== 'fc_countdown') return
    setFcSecs(299)
    const id = setInterval(() => setFcSecs(s => {
      if (s <= 1) { clearInterval(id); setPhase('fc_blocked'); addAudit('Freshness window expired — FAIL_CLOSED engaged', 'error'); return 0 }
      return s - 1
    }), 1000)
    return () => clearInterval(id)
  }, [phase, addAudit])

  // Manual flow auto-advance stage 6→7→8
  useEffect(() => {
    if (!isAutoDemo && phase === 'approval' && stage === 6) { setCompleted(prev => new Set([...prev, 6])); setStage(7) }
  }, [phase, stage, isAutoDemo])
  useEffect(() => {
    if (!isAutoDemo && phase === 'succeeded' && stage === 7) { setCompleted(prev => new Set([...prev, 7])); setStage(8) }
  }, [phase, stage, isAutoDemo])

  const isStale = gatewayVer !== cpVer && cpConn === 'connected'

  // ── Manual handlers ──────────────────────────────────────────────────────────
  const handleSimulatePolicyChange = () => {
    if (cpVChanged) return
    setCpVer(`v${policyVerNum + 1}`)
    setCpVChanged(true)
    setStaleSince(Date.now())
    addAudit(`Policy changed — Control Plane v${policyVerNum + 1}, Gateway cached v${policyVerNum}`, 'warn')
    addAudit('Gateway detected stale configuration — STALE_WITHIN_GRACE', 'warn')
  }

  const handleSendToolCall = useCallback(async () => {
    if (runningRef.current) return
    runningRef.current = true
    advance(5, 6)
    await sleep(300)
    addAudit('Agent sent tool call — delete_customer({customer_id:"CUST-10482"})', 'info')
    addAudit('VetoPlane intercepted — EXE-10482-7A91', 'info')
    setPhase('p_received'); await sleep(700)
    setPhase('p_auth'); await sleep(700)
    setPhase('p_tool'); await sleep(700)
    setPhase('p_args'); await sleep(700)
    setPhase('p_execid'); await sleep(700)
    setPhase('p_policy'); await sleep(900)
    if (gatewayVer !== cpVer) {
      setPhase('p_reconciling'); await sleep(2000)
      setGatewayVer(cpVer); setStaleSince(null)
      addAudit(`Gateway reconciled — now on ${cpVer} · FRESH`, 'success')
      setPhase('p_synced'); await sleep(1000)
    }
    setPhase('p_decision'); await sleep(900)
    addAudit(`Policy v${policyVerNum} evaluated — delete_customer · CRITICAL / IRREVERSIBLE`, 'info')
    addAudit('REQUIRE_APPROVAL — EXE-10482-7A91 awaiting human approval', 'warn')
    setPhase('approval')
    runningRef.current = false
  }, [gatewayVer, cpVer, refundThreshold, policyVerNum, addAudit])

  const handleApprove = useCallback(async () => {
    addAudit('Human approved — exec_8f72c91a · nonce consumed', 'success')
    setPhase('approved'); await sleep(600)
    setPhase('executing'); await sleep(1200)
    addAudit('Downstream execution succeeded — Customer DB · CUST-10482 deleted', 'success')
    addAudit('Execution ledger committed — EXE-10482-7A91', 'success')
    setPhase('succeeded')
  }, [addAudit])

  const handleDeny = useCallback(() => {
    addAudit('Human denied transaction — exec_8f72c91a', 'error')
    setPhase('idle'); setStage(6)
  }, [addAudit])

  const handleReset = () => {
    setStage(1); setCompleted(new Set())
    setAgentRegistered(false); setAgentStatus('active'); setGatewayConnected(false)
    setToolsRegistered(false); setPolicyPublished(false); setRefundThreshold(500); setPolicyVerNum(42)
    setPhase('idle'); setGatewayVer('v42'); setCpVer('v42'); setCpVChanged(false)
    setCpConn('connected'); setStaleSince(null); setStaleAgeSecs(0); setSubDemo('none')
    setAuditLog(INITIAL_AUDIT); runningRef.current = false
  }

  // ── Auto Demo Engine ─────────────────────────────────────────────────────────
  const demoStep = useCallback((n: number, narration?: string) => {
    const def = DEMO_STEPS[n]
    setAutoDemoStep(n)
    setDemoChapter(def?.chapter ?? '')
    setDemoNarration(narration ?? DEMO_NARRATION[n] ?? '')
    setDemoProgress(Math.round((n / (DEMO_STEPS.length - 1)) * 100))
  }, [])

  const startAutoDemo = useCallback(async (fromStep = 0) => {
    if (demoActiveRef.current) { abortRef.current = true; await sleep(200) }
    abortRef.current = false
    skipRef.current = false
    pauseRef.current = false
    demoActiveRef.current = true
    setIsAutoDemo(true)
    setIsDemoPaused(false)

    // Reset all state deterministically
    handleReset()
    await sleep(100)

    const psleep = async (ms: number) => {
      const chunk = 80
      let elapsed = 0
      while (elapsed < ms) {
        if (abortRef.current) { demoActiveRef.current = false; throw new Error('abort') }
        if (skipRef.current) { skipRef.current = false; return }
        if (!pauseRef.current) { await sleep(chunk); elapsed += chunk }
        else { await sleep(chunk) }
      }
    }

    // Play narration for a step; fallbackMs used when voice is disabled
    const narrate = async (step: number, fallbackMs: number) => {
      const eng = engineRef.current
      if (eng.isSupported && demoSettings.voiceEnabled) {
        await eng.playStep(step, abortRef, skipRef)
        await psleep(400)
      } else {
        await psleep(fallbackMs)
      }
    }

    try {
      // Step 0: Show intro screen; block if voice assets are missing until user chooses
      if (fromStep <= 0) {
        demoStep(0)
        setShowIntro(true)
        const eng = engineRef.current
        if (!eng.assetsAvailable && demoSettings.voiceEnabled) {
          // Wait for user to click "Continue Without Voice" or "Retry Voice" + success
          await new Promise<void>(resolve => { introResolveRef.current = resolve })
          introResolveRef.current = null
        } else {
          await narrate(0, 3000)
        }
        setShowIntro(false)
        await sleep(300)
      }

      // Step 1: Register Agent
      if (fromStep <= 1) {
        demoStep(1)
        setStage(1)
        setCompleted(new Set())
        await psleep(1500)
        setAgentRegistered(true)
        addAudit('Agent registered — Customer Support Agent · agent-support-prod-01', 'success')
        await narrate(1, 13000)
      }

      // Step 2: Connect Infrastructure
      if (fromStep <= 2) {
        demoStep(2)
        setCompleted(new Set([1]))
        setStage(2)
        await psleep(1500)
        setGatewayConnected(true)
        addAudit('Gateway connected — Existing Gateway + VetoPlane mode', 'success')
        addAudit('Control channel CONNECTED · configuration FRESH', 'success')
        await narrate(2, 17500)
      }

      // Step 3: Register Tools
      if (fromStep <= 3) {
        demoStep(3)
        setCompleted(new Set([1, 2]))
        setStage(3)
        await psleep(1500)
        setToolsRegistered(true)
        addAudit('5 tools registered — get_customer:v1 · search_orders:v1 · update_ticket:v1 · refund_order:v1 · delete_customer:v1', 'info')
        addAudit('Tool versions locked — immutable schema binding complete', 'success')
        await narrate(3, 12500)
      }

      // Step 4: Bind Tool Version (same stage 3)
      if (fromStep <= 4) {
        demoStep(4)
        setCompleted(new Set([1, 2, 3]))
        setStage(3)
        await narrate(4, 12000)
      }

      // Step 5: Edit & Publish Policy
      if (fromStep <= 5) {
        demoStep(5)
        setCompleted(new Set([1, 2, 3]))
        setStage(4)
        await psleep(4000)
        addAudit('Policy rule: delete_customer → DENY (prohibited action)', 'warn')
        await psleep(3000)
        setPolicyVerNum(43)
        setPolicyPublished(true)
        addAudit('Policy rule: critical / irreversible actions → REQUIRE_APPROVAL', 'warn')
        addAudit('Policy v43 published — chg_019283 · Draft → Validated → Published', 'success')
        await narrate(5, 12000)
      }

      // Step 6: Test Agent
      if (fromStep <= 6) {
        demoStep(6)
        setCompleted(new Set([1, 2, 3, 4]))
        setStage(5)
        await narrate(6, 12000)
      }

      // Step 7: Execution Pipeline (p_received → p_policy)
      if (fromStep <= 7) {
        demoStep(7)
        setCompleted(new Set([1, 2, 3, 4, 5]))
        setStage(6)
        if (gatewayVer === 'v42') {
          setCpVer('v43')
          setCpVChanged(true)
          setStaleSince(Date.now())
          addAudit('Policy changed — Control Plane v43, Gateway cached v42', 'warn')
        }
        await sleep(400)
        addAudit('Agent sent tool call — delete_customer({customer_id:"CUST-10482"})', 'info')
        addAudit('VetoPlane intercepted — EXE-10482-7A91', 'info')

        // Animate pipeline stages concurrently with narration
        const pipelineAnimate = async () => {
          setPhase('p_received'); await sleep(900)
          setPhase('p_auth'); await sleep(800)
          setPhase('p_tool'); await sleep(800)
          setPhase('p_args'); await sleep(800)
          setPhase('p_execid'); await sleep(800)
          setPhase('p_policy'); await sleep(900)
        }
        await Promise.all([pipelineAnimate(), narrate(7, 8000)])
        await psleep(2000)
      }

      // Step 8: Stale Policy + Reconciliation
      if (fromStep <= 8) {
        demoStep(8)
        setCompleted(prev => new Set([...prev, 6, 7]))
        setStage(6)
        if (fromStep === 8) {
          setCpVer('v43'); setCpVChanged(true); setStaleSince(Date.now())
          setGatewayVer('v42'); setPhase('p_policy')
          setCompleted(new Set([1, 2, 3, 4, 5, 6, 7]))
          await sleep(200)
        }
        setPhase('p_reconciling')
        const reconcileAndNarrate = async () => {
          await sleep(3000)
          setGatewayVer('v43'); setStaleSince(null)
          addAudit('Gateway reconciled — policy v43 · FRESH', 'success')
          setPhase('p_synced')
          await sleep(2000)
          setPhase('p_decision')
        }
        await Promise.all([reconcileAndNarrate(), narrate(8, 15000)])
        await psleep(2000)
      }

      // Step 9: Transaction Governance
      if (fromStep <= 9) {
        demoStep(9)
        setCompleted(prev => new Set([...prev, 8]))
        setStage(6)
        if (fromStep === 9) {
          setGatewayVer('v43'); setCpVer('v43'); setPolicyVerNum(43)
          setPhase('p_decision')
          setCompleted(new Set([1, 2, 3, 4, 5, 6, 7, 8]))
        }
        addAudit('Policy v43 evaluated — delete_customer · CRITICAL / IRREVERSIBLE · REQUIRE_APPROVAL', 'info')
        await narrate(9, 20000)
        setPhase('approval')
        await sleep(300)
      }

      // Step 10: Exact Transaction Approval
      if (fromStep <= 10) {
        demoStep(10)
        setCompleted(prev => new Set([...prev, 6, 9]))
        setStage(7)
        if (fromStep === 10) {
          setGatewayVer('v43'); setCpVer('v43'); setPolicyVerNum(43)
          setPhase('approval')
          setCompleted(new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]))
        }
        addAudit('Human approval requested — EXE-10482-7A91 · expires in 08:42', 'warn')
        await narrate(10, 20000)
      }

      // Step 11: Approve & Execute
      if (fromStep <= 11) {
        demoStep(11)
        setCompleted(prev => new Set([...prev, 7, 10]))
        setStage(7)
        if (fromStep === 11) {
          setPhase('approval'); setPolicyVerNum(43)
          setCompleted(new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]))
        }
        addAudit('Human approved — EXE-10482-7A91 · single-use approval consumed', 'success')
        setPhase('approved'); await psleep(700)
        setPhase('executing'); await psleep(1200)
        addAudit('Downstream execution succeeded — Customer DB · customer CUST-10482 deleted', 'success')
        addAudit('Execution ledger committed — EXE-10482-7A91', 'success')
        setPhase('succeeded')
        await narrate(11, 12000)
      }

      // Step 12: Execution Ledger
      if (fromStep <= 12) {
        demoStep(12)
        setCompleted(prev => new Set([...prev, 7, 11]))
        setStage(8)
        if (fromStep === 12) {
          setPhase('succeeded')
          setCompleted(new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]))
        }
        await narrate(12, 15000)
      }

      // Bonus A: Duplicate
      if (fromStep <= 13) {
        demoStep(13)
        setCompleted(prev => new Set([...prev, 12]))
        setStage(8)
        setSubDemo('duplicate_done')
        addAudit('DUPLICATE DETECTED — EXE-10482-7A91 already SUCCEEDED · downstream NOT repeated', 'warn')
        await narrate(13, 8000)
      }

      // Bonus B: Deny / Suspend
      if (fromStep <= 14) {
        demoStep(14)
        setStage(8)
        setSubDemo('susp_blocked')
        setAgentStatus('suspended')
        addAudit('AGENT SUSPENDED — Customer Support Agent · all executions blocked immediately', 'error')
        await psleep(2000)
        addAudit('EXECUTION BLOCKED — Agent suspended · downstream NOT reached', 'error')
        await narrate(14, 10000)
        setAgentStatus('active')
        addAudit('Agent reactivated', 'success')
      }

      // Bonus C: Fail-Closed
      if (fromStep <= 15) {
        demoStep(15)
        setStage(8)
        setSubDemo('none')
        setCpConn('disconnected')
        setPhase('fc_countdown')
        addAudit('Control channel DISCONNECTED — freshness window countdown started', 'warn')
        await psleep(4000)
        setPhase('fc_blocked')
        addAudit('Freshness window expired — FAIL_CLOSED · high-risk executions blocked', 'error')
        addAudit('EXECUTION BLOCKED — security configuration freshness exceeded', 'error')
        await narrate(15, 10000)
        setCpConn('connected')
        setPhase('succeeded')
        addAudit('Control channel reconnected — configuration sync in progress', 'success')
      }

      // Final: Executive Summary
      demoStep(16)
      setCompleted(new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]))
      setStage(9)
      await narrate(16, 20000)
      await psleep(2500) // hold screen after voice finishes

    } catch (_e) {
      // aborted
    }
    demoActiveRef.current = false
  }, [demoStep, addAudit, refundThreshold, gatewayVer, demoSettings.voiceEnabled])

  // Auto-start when launched from "Watch Auto Demo" on the website
  useEffect(() => {
    if (!autoStart) return
    // Small delay to let the component fully mount before triggering
    const t = setTimeout(() => startAutoDemo(0), 300)
    return () => clearTimeout(t)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleDemoPause = () => { pauseRef.current = true; setIsDemoPaused(true); engine.pause() }
  const handleDemoResume = () => { pauseRef.current = false; setIsDemoPaused(false); engine.resume() }
  const handleDemoNext = () => { skipRef.current = true; engine.stop() }
  const handleDemoPrev = () => {
    engine.stop()
    abortRef.current = true
    setTimeout(() => {
      abortRef.current = false
      startAutoDemo(Math.max(0, autoDemoStep - 1))
    }, 250)
  }
  const handleDemoRestart = () => {
    engine.stop()
    abortRef.current = true
    setTimeout(() => { abortRef.current = false; startAutoDemo(0) }, 300)
  }
  const handleDemoExit = () => {
    engine.stop()
    abortRef.current = true
    demoActiveRef.current = false
    setIsAutoDemo(false)
    setShowIntro(false)
    setIsDemoPaused(false)
    pauseRef.current = false
  }

  return (
    <div className="flex flex-col h-screen bg-[#06090f] text-slate-200 overflow-hidden">
      <DemoIntro
        visible={showIntro}
        voiceState={engine.voiceState}
        voiceName={engine.voiceName}
        onRetryAssets={() => {
          engine.retry()
          // If retry succeeds, auto-advance intro gate
          setTimeout(() => {
            if (engineRef.current.assetsAvailable) introResolveRef.current?.()
          }, 3200)
        }}
        onContinueWithoutVoice={() => {
          setDemoSettings(s => ({ ...s, voiceEnabled: false }))
          introResolveRef.current?.()
          introResolveRef.current = null
        }}
        runDiagnostic={engine.runDiagnostic}
      />

      <TopBar
        cpConn={cpConn}
        agentStatus={agentStatus}
        isStale={isStale}
        staleAgeSecs={staleAgeSecs}
        gatewayVer={gatewayVer}
        cpVer={cpVer}
        phase={phase}
        fcSecs={fcSecs}
        isAutoDemo={isAutoDemo}
        onStartAutoDemo={() => startAutoDemo(0)}
        onBack={onBack}
      />

      <div className="flex flex-1 overflow-hidden">
        <StageNav
          stage={stage}
          completed={completed}
          setStage={setStage}
          onReset={handleReset}
          phase={phase}
          cpConn={cpConn}
          isAutoDemo={isAutoDemo}
          onDisconnect={() => {
            setCpConn('disconnected'); setPhase('fc_countdown')
            addAudit('Control channel DISCONNECTED — freshness window countdown started', 'warn')
          }}
          onReconnect={() => {
            setCpConn('connected')
            setPhase(p => p === 'fc_countdown' || p === 'fc_blocked' ? 'idle' : p)
            addAudit('Control channel reconnected', 'success')
          }}
        />

        <div className="flex-1 overflow-y-auto p-6">
          {stage === 1 && <Stage01 agentRegistered={agentRegistered} setAgentRegistered={setAgentRegistered} agentStatus={agentStatus} setAgentStatus={setAgentStatus} onNext={() => advance(1, 2)} />}
          {stage === 2 && <Stage02 gatewayConnected={gatewayConnected} setGatewayConnected={setGatewayConnected} onNext={() => advance(2, 3)} onBack={() => setStage(1)} />}
          {stage === 3 && <Stage03 toolsRegistered={toolsRegistered} setToolsRegistered={setToolsRegistered} onNext={() => advance(3, 4)} onBack={() => setStage(2)} />}
          {stage === 4 && <Stage04 policyPublished={policyPublished} setPolicyPublished={setPolicyPublished} refundThreshold={refundThreshold} setRefundThreshold={setRefundThreshold} policyVerNum={policyVerNum} setPolicyVerNum={setPolicyVerNum} onNext={() => advance(4, 5)} onBack={() => setStage(3)} />}
          {stage === 5 && <Stage05 refundThreshold={refundThreshold} policyVerNum={policyVerNum} onSendToolCall={handleSendToolCall} onBack={() => setStage(4)} />}
          {stage === 6 && <Stage06 phase={phase as any} gatewayVer={gatewayVer} cpVer={cpVer} refundThreshold={refundThreshold} policyVerNum={policyVerNum} isStale={isStale} onSimulatePolicyChange={handleSimulatePolicyChange} cpVChanged={cpVChanged} />}
          {stage === 7 && <Stage07 phase={phase} approvalSecs={approvalSecs} policyVerNum={policyVerNum} onApprove={handleApprove} onDeny={handleDeny} />}
          {stage === 8 && <Stage08 auditLog={auditLog} onSimulateDuplicate={() => addAudit('DUPLICATE DETECTED — exec_8f72c91a already SUCCEEDED · downstream NOT repeated', 'warn')} onSimulateAmbiguous={() => addAudit('AMBIGUOUS outcome — Billing TIMEOUT · DO NOT blindly retry', 'error')} onSimulateSuspend={v => { setAgentStatus(v ? 'suspended' : 'active'); addAudit(v ? 'AGENT SUSPENDED' : 'Agent reactivated', v ? 'error' : 'success') }} onSimulateRateLimit={() => addAudit('RATE_LIMITED — 100/100 calls/hr · retry_after: 3600 · downstream NOT sent', 'error')} agentStatus={agentStatus} subDemo={subDemo} setSubDemo={setSubDemo} />}
          {stage === 9 && <StageExec onBack={() => setStage(8)} />}
        </div>
      </div>

      <NarrationPanel
        isActive={isAutoDemo}
        step={autoDemoStep}
        totalSteps={DEMO_STEPS.length}
        chapter={demoChapter}
        narration={demoNarration}
        currentSentence={engine.currentSentence}
        isPaused={isDemoPaused}
        isSpeechSupported={engine.isSupported}
        voiceError={engine.voiceError}
        voiceName={engine.voiceName}
        settings={demoSettings}
        onSettingsChange={patch => setDemoSettings(prev => ({ ...prev, ...patch }))}
        onPause={handleDemoPause}
        onResume={handleDemoResume}
        onNext={handleDemoNext}
        onPrev={handleDemoPrev}
        onRestart={handleDemoRestart}
        onExit={handleDemoExit}
        progress={demoProgress}
      />
    </div>
  )
}

// ── Top Bar ────────────────────────────────────────────────────────────────────
function TopBar({ cpConn, agentStatus, isStale, staleAgeSecs, gatewayVer, cpVer, phase, fcSecs, isAutoDemo, onStartAutoDemo, onBack }: {
  cpConn: string; agentStatus: string; isStale: boolean
  staleAgeSecs: number; gatewayVer: string; cpVer: string
  phase: Phase; fcSecs: number; isAutoDemo: boolean; onStartAutoDemo: () => void; onBack: () => void
}) {
  const isFc = phase === 'fc_countdown' || phase === 'fc_blocked'
  return (
    <div className="flex-shrink-0 bg-[#060b17] border-b border-[#111d30]">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="flex items-center gap-1 text-[10px] text-slate-500 hover:text-slate-300 transition-colors cursor-pointer mr-1" title="Back to website">
            ← Website
          </button>
          <img src="/assets/vetoplane-logo.png" alt="VetoPlane" className="h-11 w-auto object-contain" style={{ maxWidth: 235, mixBlendMode: 'screen' }} />
          <div className="text-[10px] text-slate-500 font-mono hidden sm:block">Agent Execution Control Plane</div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-slate-500">Tenant <span className="text-slate-300 font-mono">Acme Commerce</span></span>
            <div className="w-px h-3 bg-slate-700" />
            <Pill label="Production" c="amber" />
            <div className="w-px h-3 bg-slate-700" />
            <span className="text-slate-500">Customer-hosted Gateway</span>
            <div className="w-px h-3 bg-slate-700" />
            <div className="flex items-center gap-1.5">
              <Dot c={cpConn === 'connected' ? 'green' : 'red'} pulse={cpConn === 'disconnected'} />
              <span className={`font-mono font-medium ${cpConn === 'connected' ? 'text-emerald-400' : 'text-red-400'}`}>
                {cpConn === 'connected' ? 'Connected' : 'DISCONNECTED'}
              </span>
            </div>
            {agentStatus === 'suspended' && <Pill label="Agent Suspended" c="red" />}
          </div>

          {/* Auto Demo button */}
          <div className="flex-shrink-0">
            {!isAutoDemo ? (
              <button
                onClick={onStartAutoDemo}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 border border-blue-500 text-white cursor-pointer transition-colors select-none"
              >
                <span className="text-sm font-bold">▶ Auto Demo</span>
                <span className="text-[10px] text-blue-200">4 min walkthrough</span>
              </button>
            ) : (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-blue-700/50 bg-blue-900/20">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse-slow" />
                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">AUTO DEMO</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {isStale && !isFc && (
        <div className="bg-amber-900/20 border-t border-amber-800/40 px-6 py-2 flex items-center gap-5 text-[11px] font-mono animate-slide-in">
          <div className="flex items-center gap-2">
            <Dot c="amber" pulse />
            <span className="text-amber-400 font-bold uppercase tracking-wider">Stale Security State</span>
          </div>
          <span className="text-slate-500">Gateway: <span className="text-amber-300">{gatewayVer}</span></span>
          <span className="text-slate-500">Control Plane: <span className="text-blue-400">{cpVer}</span></span>
          <span className="text-slate-500">Age: <span className="text-amber-300">{fmtSecs(staleAgeSecs)}</span></span>
          <Pill label="STALE_WITHIN_GRACE" c="amber" />
        </div>
      )}
      {isFc && (
        <div className={`border-t px-6 py-2 flex items-center gap-4 text-[11px] animate-slide-in ${phase === 'fc_blocked' ? 'bg-red-900/25 border-red-800/50' : 'bg-amber-900/15 border-amber-800/40'}`}>
          <Dot c={phase === 'fc_blocked' ? 'red' : 'amber'} pulse />
          <span className={`font-bold uppercase tracking-wider ${phase === 'fc_blocked' ? 'text-red-400' : 'text-amber-400'}`}>
            {phase === 'fc_blocked' ? 'FAIL_CLOSED' : 'Control Channel Disconnected'}
          </span>
          <span className="font-mono text-slate-400">
            {phase === 'fc_countdown' ? `Freshness window: ${fmtSecs(fcSecs)} remaining` : 'Security configuration freshness exceeded maximum permitted age'}
          </span>
          {phase === 'fc_countdown' && <Pill label="STALE_WITHIN_GRACE" c="amber" />}
          {phase === 'fc_blocked' && <Pill label="FAIL_CLOSED" c="red" />}
        </div>
      )}
    </div>
  )
}

// ── Stage Nav ──────────────────────────────────────────────────────────────────
function StageNav({ stage, completed, setStage, onReset, phase, cpConn, isAutoDemo, onDisconnect, onReconnect }: {
  stage: number; completed: Set<number>; setStage: (n: number) => void
  onReset: () => void; phase: Phase; cpConn: string; isAutoDemo: boolean
  onDisconnect: () => void; onReconnect: () => void
}) {
  return (
    <div className="w-52 flex-shrink-0 flex flex-col border-r border-[#111d30] bg-[#060b17] overflow-y-auto">
      <div className="px-3 py-4 space-y-0.5 flex-1">
        {STAGE_LABELS.map(({ n, label }) => {
          const isDone = completed.has(n)
          const isActive = stage === n
          return (
            <button
              key={n}
              onClick={() => !isAutoDemo && (isDone || isActive) && setStage(n)}
              className={`w-full text-left flex items-center gap-2.5 px-3 py-2 rounded transition-all text-[11px] ${
                isAutoDemo ? 'cursor-default' : (isDone || isActive) ? 'cursor-pointer' : 'cursor-default'
              } ${isActive ? 'bg-blue-900/30 border border-blue-800/50 text-blue-300' : isDone ? 'text-slate-400 hover:bg-[#0b1529] hover:text-slate-200' : 'text-slate-600'}`}
            >
              <div className={`w-5 h-5 rounded flex-shrink-0 flex items-center justify-center text-[9px] font-bold border ${
                isActive ? 'bg-blue-600 border-blue-500 text-white' : isDone ? 'bg-emerald-900/40 border-emerald-700/50 text-emerald-400' : 'bg-transparent border-slate-700 text-slate-600'
              }`}>
                {isDone && !isActive ? '✓' : n}
              </div>
              <span className="leading-tight">{label}</span>
              {isActive && <span className="ml-auto w-1 h-1 rounded-full bg-blue-400" />}
            </button>
          )
        })}
      </div>
      {!isAutoDemo && (
        <div className="px-3 py-3 border-t border-[#111d30] space-y-2">
          <button
            onClick={cpConn === 'connected' ? onDisconnect : onReconnect}
            className={`w-full text-left text-[10px] px-2 py-1.5 rounded border cursor-pointer transition-colors ${cpConn === 'connected' ? 'border-[#1a2d45] text-slate-500 hover:text-slate-300' : 'border-emerald-800/50 text-emerald-400'}`}
          >
            {cpConn === 'connected' ? '⊗ Disconnect Control Plane' : '↺ Reconnect Control Plane'}
          </button>
          <button onClick={onReset} className="w-full text-left text-[10px] px-2 py-1.5 rounded border border-[#1a2d45] text-slate-500 hover:text-slate-300 cursor-pointer transition-colors">
            ⟳ Reset Demo
          </button>
          {completed.size >= 7 && (
            <button onClick={() => setStage(9)} className={`w-full text-left text-[10px] px-2 py-1.5 rounded border cursor-pointer transition-colors ${stage === 9 ? 'border-blue-700/50 text-blue-400' : 'border-[#1a2d45] text-slate-500 hover:text-slate-300'}`}>
              ★ Executive View
            </button>
          )}
        </div>
      )}
    </div>
  )
}

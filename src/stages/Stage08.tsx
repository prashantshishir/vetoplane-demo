import { useState } from 'react'
import { Dot, Pill, Card, CardHeader, Btn, InfoBox } from '../components/ui'

interface AuditEvent {
  id: number
  time: string
  msg: string
  type: 'info' | 'warn' | 'success' | 'error'
}

type SubDemo = 'none' | 'duplicate' | 'duplicate_done' | 'ambiguous' | 'susp_blocked' | 'rate_limited'

interface Props {
  auditLog: AuditEvent[]
  onSimulateDuplicate: () => void
  onSimulateAmbiguous: () => void
  onSimulateSuspend: (v: boolean) => void
  onSimulateRateLimit: () => void
  agentStatus: 'active' | 'suspended'
  subDemo: SubDemo
  setSubDemo: (v: SubDemo) => void
}

const sleep = (ms: number) => new Promise<void>(r => setTimeout(r, ms))

export default function Stage08({
  auditLog, onSimulateDuplicate, onSimulateAmbiguous, onSimulateSuspend,
  onSimulateRateLimit, agentStatus, subDemo, setSubDemo,
}: Props) {
  const colors = {
    info: { dot: 'bg-blue-500', text: 'text-blue-300', pill: 'bg-blue-900/20 border-blue-800/40' },
    warn: { dot: 'bg-amber-400', text: 'text-amber-300', pill: 'bg-amber-900/20 border-amber-800/40' },
    success: { dot: 'bg-emerald-400', text: 'text-emerald-300', pill: 'bg-emerald-900/20 border-emerald-800/40' },
    error: { dot: 'bg-red-400', text: 'text-red-300', pill: 'bg-red-900/20 border-red-800/40' },
  }

  const LEDGER_EVENTS = [
    'REQUEST_RECEIVED', 'IDENTITY_RESOLVED', 'TOOL_RESOLVED', 'INPUT_VALIDATED',
    'POLICY_EVALUATED', 'APPROVAL_REQUESTED', 'APPROVAL_GRANTED',
    'DOWNSTREAM_STARTED', 'DOWNSTREAM_COMPLETED', 'EXECUTION_COMPLETED',
  ]

  return (
    <div className="grid grid-cols-[1fr_320px] gap-4">
      {/* Left: Ledger + sub-demos */}
      <div className="space-y-4">
        {/* Execution Ledger */}
        <Card glow="green">
          <CardHeader
            title="Execution Ledger — EXE-10482-7A91"
            extra={
              <div className="flex items-center gap-2">
                <Pill label="Telemetry Redaction: ACTIVE" c="gray" />
                <Pill label="COMPLETED" c="green" />
              </div>
            }
          />
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-[#1a2d45]">
                  {['Event', 'Timestamp', 'Agent', 'Tool', 'Policy', 'Status'].map(h => (
                    <th key={h} className="text-left px-3 py-2 text-[10px] text-slate-500 uppercase tracking-wider font-semibold whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {LEDGER_EVENTS.map((ev, i) => (
                  <tr key={ev} className={`border-b border-[#0f1d30] animate-fade-in ${i % 2 === 0 ? '' : 'bg-[#070e1c]/50'}`} style={{ animationDelay: `${i * 80}ms` }}>
                    <td className="px-3 py-2 font-mono text-[11px] text-emerald-400">{ev}</td>
                    <td className="px-3 py-2 font-mono text-slate-500 whitespace-nowrap">
                      {new Date(Date.now() - (LEDGER_EVENTS.length - i) * 3200).toLocaleTimeString('en-GB', { hour12: false })}
                    </td>
                    <td className="px-3 py-2 text-slate-400 whitespace-nowrap">agent-support-prod-01</td>
                    <td className="px-3 py-2 font-mono text-slate-400">delete_customer:v1</td>
                    <td className="px-3 py-2 font-mono text-blue-400">v43</td>
                    <td className="px-3 py-2"><Pill label="OK" c="green" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-2.5 border-t border-[#1a2d45] flex items-center gap-2">
            <Dot c="green" />
            <span className="text-[10px] text-slate-500">Telemetry redaction active — raw payloads not exposed in ledger</span>
          </div>
        </Card>

        {/* Sub-demos */}
        <SubDemoPanel
          subDemo={subDemo}
          setSubDemo={setSubDemo}
          agentStatus={agentStatus}
          onSimulateDuplicate={onSimulateDuplicate}
          onSimulateAmbiguous={onSimulateAmbiguous}
          onSimulateSuspend={onSimulateSuspend}
          onSimulateRateLimit={onSimulateRateLimit}
        />
      </div>

      {/* Right: Audit trail */}
      <div className="space-y-4">
        <Card>
          <CardHeader title="Audit Trail" extra={<span className="font-mono text-[9px] text-slate-600">{auditLog.length} events</span>} />
          <div className="max-h-[480px] overflow-y-auto px-3 py-2">
            {[...auditLog].reverse().map((e, i) => (
              <div key={e.id} className={`flex gap-3 py-2 ${i < auditLog.length - 1 ? 'border-b border-[#0f1d30]' : ''} animate-fade-in`}>
                <div className="flex flex-col items-center gap-1 flex-shrink-0">
                  <div className={`w-1.5 h-1.5 rounded-full mt-1 ${colors[e.type].dot}`} />
                </div>
                <div>
                  <div className="font-mono text-[10px] text-slate-600">{e.time}</div>
                  <div className={`text-[11px] ${colors[e.type].text} mt-0.5 leading-relaxed`}>{e.msg}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

function SubDemoPanel({ subDemo, setSubDemo, agentStatus, onSimulateDuplicate, onSimulateAmbiguous, onSimulateSuspend, onSimulateRateLimit }: {
  subDemo: SubDemo
  setSubDemo: (v: SubDemo) => void
  agentStatus: 'active' | 'suspended'
  onSimulateDuplicate: () => void
  onSimulateAmbiguous: () => void
  onSimulateSuspend: (v: boolean) => void
  onSimulateRateLimit: () => void
}) {
  const handleDuplicate = () => { onSimulateDuplicate(); setSubDemo('duplicate_done') }
  const handleAmbiguous = () => { onSimulateAmbiguous(); setSubDemo('ambiguous') }
  const handleSuspend = () => { onSimulateSuspend(true); setSubDemo('susp_blocked') }
  const handleRateLimit = () => { onSimulateRateLimit(); setSubDemo('rate_limited') }

  return (
    <Card>
      <CardHeader title="Additional Scenarios" extra={<Pill label="Optional" c="gray" />} />
      <div className="px-4 py-3 space-y-3">
        {/* Duplicate */}
        <ScenarioBlock
          title="Idempotency Protection"
          btnLabel="Simulate Duplicate Agent Request"
          btnVariant="amber"
          onRun={handleDuplicate}
          active={subDemo === 'duplicate_done'}
          disabled={subDemo !== 'none'}
        >
          {subDemo === 'duplicate_done' && (
            <div className="bg-amber-900/20 border border-amber-800/50 rounded p-3 animate-slide-in">
              <div className="flex items-center gap-2 mb-2">
                <Dot c="amber" />
                <span className="text-xs font-bold text-amber-400">DUPLICATE EXECUTION DETECTED</span>
              </div>
              <div className="text-[11px] font-mono space-y-1">
                <div><span className="text-slate-500">Execution ID: </span><span className="text-slate-300">EXE-10482-7A91</span></div>
                <div><span className="text-slate-500">Original status: </span><span className="text-emerald-400">SUCCEEDED</span></div>
                <div><span className="text-slate-500">Downstream delete executions: </span><span className="text-emerald-400 font-bold">1</span><span className="text-slate-600"> (not 2)</span></div>
              </div>
              <InfoBox color="amber">
                VetoPlane-controlled execution identity and duplicate protection. Existing execution returned — downstream NOT repeated.
              </InfoBox>
            </div>
          )}
        </ScenarioBlock>

        {/* Ambiguous */}
        <ScenarioBlock
          title="Ambiguous Downstream Outcome"
          btnLabel="Simulate Downstream Timeout"
          btnVariant="amber"
          onRun={handleAmbiguous}
          active={subDemo === 'ambiguous'}
          disabled={subDemo !== 'none'}
        >
          {subDemo === 'ambiguous' && (
            <div className="bg-red-900/20 border border-red-800/50 rounded p-3 animate-slide-in space-y-2">
              <div className="flex items-center gap-2">
                <Dot c="red" pulse />
                <span className="text-xs font-bold text-red-400">DOWNSTREAM OUTCOME: AMBIGUOUS</span>
              </div>
              <div className="text-[11px] font-mono space-y-1">
                <div><span className="text-slate-500">Customer DB: </span><span className="text-red-400">TIMEOUT</span></div>
                <div><span className="text-slate-500">Downstream action: </span><span className="text-amber-400">UNKNOWN</span></div>
              </div>
              <InfoBox color="red">
                DO NOT BLINDLY RETRY. VetoPlane does not assume failure means the downstream transaction did not occur.
                Outcome is flagged as UNKNOWN/AMBIGUOUS for human review.
              </InfoBox>
            </div>
          )}
        </ScenarioBlock>

        {/* Suspend */}
        <ScenarioBlock
          title="Emergency Agent Suspension"
          btnLabel={agentStatus === 'active' ? 'Emergency Suspend Agent' : 'Agent Already Suspended'}
          btnVariant="danger"
          onRun={handleSuspend}
          active={subDemo === 'susp_blocked'}
          disabled={subDemo !== 'none' || agentStatus === 'suspended'}
        >
          {subDemo === 'susp_blocked' && (
            <div className="bg-red-900/20 border border-red-800/50 rounded p-3 animate-slide-in space-y-2">
              <div className="flex items-center gap-2">
                <Dot c="red" />
                <span className="text-xs font-bold text-red-400">EXECUTION BLOCKED — Agent Suspended</span>
              </div>
              <div className="text-[11px] font-mono space-y-1">
                <div><span className="text-slate-500">Reason: </span><span className="text-red-300">Agent is suspended.</span></div>
                <div><span className="text-slate-500">Downstream invocation: </span><span className="text-emerald-400">NOT SENT</span></div>
              </div>
            </div>
          )}
        </ScenarioBlock>

        {/* Rate limit */}
        <ScenarioBlock
          title="Rate Limit"
          btnLabel="Simulate Agent Rate Limit"
          btnVariant="ghost"
          onRun={handleRateLimit}
          active={subDemo === 'rate_limited'}
          disabled={subDemo !== 'none'}
        >
          {subDemo === 'rate_limited' && (
            <div className="bg-red-900/15 border border-red-800/40 rounded p-3 animate-slide-in space-y-2">
              <div className="flex items-center gap-2">
                <Dot c="red" />
                <span className="text-xs font-bold text-red-400">RATE_LIMITED</span>
              </div>
              <div className="text-[11px] font-mono space-y-1">
                <div><span className="text-slate-500">Policy: </span><span className="text-slate-300">100 tool calls/hour</span></div>
                <div><span className="text-slate-500">Current: </span><span className="text-red-400 font-bold">100 / 100</span></div>
                <div><span className="text-slate-500">retry_after: </span><span className="text-slate-300">3600</span></div>
                <div><span className="text-slate-500">Downstream: </span><span className="text-emerald-400">NOT SENT</span></div>
              </div>
            </div>
          )}
        </ScenarioBlock>

        {subDemo !== 'none' && (
          <Btn variant="ghost" size="sm" className="w-full" onClick={() => setSubDemo('none')}>
            Reset Scenarios
          </Btn>
        )}
      </div>
    </Card>
  )
}

function ScenarioBlock({ title, btnLabel, btnVariant, onRun, active, disabled, children }: {
  title: string
  btnLabel: string
  btnVariant: 'amber' | 'danger' | 'ghost'
  onRun: () => void
  active: boolean
  disabled: boolean
  children?: React.ReactNode
}) {
  return (
    <div className={`border rounded p-3 space-y-2 transition-colors ${active ? 'border-[#253d5a]' : 'border-[#1a2d45]'}`}>
      <div className="text-[10px] text-slate-500 uppercase tracking-wider">{title}</div>
      {!active && (
        <Btn variant={btnVariant} size="sm" className="w-full" disabled={disabled} onClick={onRun}>
          {btnLabel}
        </Btn>
      )}
      {children}
    </div>
  )
}

import { Dot, Pill, Card, CardHeader, KV, Btn, InfoBox } from '../components/ui'

type Phase =
  | 'idle' | 'tx_open'
  | 'p_received' | 'p_auth' | 'p_tool' | 'p_args' | 'p_execid'
  | 'p_policy' | 'p_reconciling' | 'p_synced' | 'p_decision'
  | 'approval' | 'approved' | 'executing' | 'succeeded'
  | 'duplicate' | 'susp_blocked' | 'fc_countdown' | 'fc_blocked'
  | 'ambiguous' | 'rate_limited'

const STAGES = [
  { id: 'REQUEST RECEIVED',      phase: 'p_received' },
  { id: 'IDENTITY RESOLVED',     phase: 'p_auth' },
  { id: 'TENANT RESOLVED',       phase: 'p_auth' },
  { id: 'TOOL VERSION RESOLVED', phase: 'p_tool' },
  { id: 'ARGUMENTS VALIDATED',   phase: 'p_args' },
  { id: 'EXECUTION ID CREATED',  phase: 'p_execid' },
  { id: 'POLICY EVALUATED',      phase: 'p_policy' },
  { id: 'DECISION',              phase: 'p_decision' },
  { id: 'APPROVAL',              phase: 'approval' },
  { id: 'DOWNSTREAM EXECUTION',  phase: 'executing' },
  { id: 'EXECUTION LEDGER',      phase: 'succeeded' },
]

const PHASE_ORDER: Phase[] = [
  'p_received', 'p_auth', 'p_tool', 'p_args', 'p_execid',
  'p_policy', 'p_reconciling', 'p_synced', 'p_decision',
  'approval', 'approved', 'executing', 'succeeded',
]

function phaseIndex(p: Phase) { return PHASE_ORDER.indexOf(p) }

function stageActive(stagePh: string, currentPhase: Phase): 'past' | 'active' | 'future' {
  const stageIdx = PHASE_ORDER.indexOf(stagePh as Phase)
  const curIdx = phaseIndex(currentPhase)
  if (stageIdx < 0) return 'future'
  if (curIdx > stageIdx) return 'past'
  if (curIdx === stageIdx) return 'active'
  return 'future'
}

interface Props {
  phase: Phase
  gatewayVer: string
  cpVer: string
  refundThreshold: number
  policyVerNum: number
  isStale: boolean
  onSimulatePolicyChange: () => void
  cpVChanged: boolean
}

export default function Stage06({
  phase, gatewayVer, cpVer, refundThreshold, policyVerNum, isStale, onSimulatePolicyChange, cpVChanged,
}: Props) {
  const curIdx = phaseIndex(phase)

  return (
    <div className="grid grid-cols-[1fr_300px] gap-4">
      {/* Left: pipeline */}
      <div className="space-y-4">
        {/* Transaction card */}
        <Card>
          <CardHeader title="Agent Transaction" extra={<Pill label="EXE-10482-7A91" c="blue" />} />
          <div className="px-5 py-3 grid grid-cols-2 gap-x-8 gap-y-0">
            <KV k="Execution ID" v="EXE-10482-7A91" mono />
            <KV k="Tenant" v="Acme Commerce" />
            <KV k="Agent" v="Customer Support Agent" />
            <KV k="Tool" v="delete_customer:v1" mono />
            <KV k="Arguments" v={<span className="font-mono">customer_id=CUST-10482</span>} />
            <KV k="Policy" v={`v${policyVerNum}`} mono />
          </div>
        </Card>

        {/* Stale simulation */}
        {!cpVChanged && (
          <div className="flex items-center gap-3 px-4 py-3 bg-[#0b1120] border border-[#1a2d45] rounded-lg">
            <div className="flex-1">
              <div className="text-xs text-slate-400">Optional: simulate a control-plane policy change <em>before</em> the agent executes.</div>
              <div className="text-[10px] text-slate-600 mt-0.5">This will cause the gateway cache to be stale when the pipeline runs.</div>
            </div>
            <Btn variant="amber" size="sm" onClick={onSimulatePolicyChange}>
              Simulate Policy Change
            </Btn>
          </div>
        )}

        {isStale && (
          <div className="bg-amber-900/20 border border-amber-800/50 rounded-lg px-4 py-3 animate-slide-in">
            <div className="flex items-center gap-2 mb-2">
              <Dot c="amber" pulse />
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Security Configuration Change Detected</span>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                { label: 'Gateway', val: gatewayVer, color: 'text-amber-400' },
                { label: 'Status', val: 'STALE_WITHIN_GRACE', color: 'text-amber-300' },
                { label: 'Control Plane', val: cpVer, color: 'text-blue-400' },
              ].map(({ label, val, color }) => (
                <div key={label} className="bg-[#070e1c] border border-[#1a2d45] rounded p-2">
                  <div className="text-[9px] text-slate-500 mb-1">{label}</div>
                  <div className={`font-mono text-xs font-bold ${color}`}>{val}</div>
                </div>
              ))}
            </div>
            <div className="mt-2 text-[10px] text-slate-500 font-mono">
              Last synchronization: 4m 52s ago
            </div>
          </div>
        )}

        {/* Pipeline */}
        <Card>
          <CardHeader
            title="Execution Pipeline"
            extra={
              phase === 'p_reconciling' ? <Pill label="RECONCILING" c="amber" /> :
              phase === 'p_synced' ? <Pill label="SYNCHRONIZED" c="green" /> :
              phase === 'approval' ? <Pill label="AWAITING APPROVAL" c="amber" /> :
              phase === 'succeeded' ? <Pill label="SUCCEEDED" c="green" /> :
              ['susp_blocked', 'fc_blocked'].includes(phase) ? <Pill label="BLOCKED" c="red" /> :
              phase === 'duplicate' ? <Pill label="DUPLICATE" c="amber" /> :
              phase === 'ambiguous' ? <Pill label="AMBIGUOUS" c="red" /> :
              phase === 'rate_limited' ? <Pill label="RATE_LIMITED" c="red" /> :
              curIdx >= 0 ? <Pill label="PROCESSING" c="blue" /> :
              <Pill label="PENDING" c="gray" />
            }
          />
          <div className="px-5 py-4">
            <div className="space-y-0">
              {STAGES.map((s, i) => {
                const st = stageActive(s.phase, phase)
                const isReconcileStage = i === 6 // POLICY EVALUATED
                const showReconcile = isReconcileStage && ['p_reconciling', 'p_synced'].includes(phase)

                return (
                  <div key={s.id}>
                    <div className={`flex items-center gap-3 py-2 transition-all ${
                      st === 'active' ? 'opacity-100' : st === 'past' ? 'opacity-70' : 'opacity-30'
                    }`}>
                      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                        st === 'past' ? 'bg-emerald-500 shadow-[0_0_6px_#4ade80]' :
                        st === 'active' ? 'bg-blue-500 shadow-[0_0_8px_#60a5fa] animate-pulse-slow' :
                        'bg-slate-700'
                      }`} />
                      <span className={`text-xs font-mono font-medium ${
                        st === 'past' ? 'text-emerald-400' :
                        st === 'active' ? 'text-blue-300' :
                        'text-slate-600'
                      }`}>{s.id}</span>
                      {st === 'past' && <span className="text-emerald-600 text-[10px] ml-auto">✓</span>}
                      {st === 'active' && i === 6 && isStale && !showReconcile && (
                        <span className="text-amber-400 text-[10px] ml-auto font-mono">FRESHNESS CHECK</span>
                      )}
                    </div>
                    {showReconcile && (
                      <div className="ml-5 mb-1 animate-fade-in">
                        {phase === 'p_reconciling' ? (
                          <div className="bg-amber-900/20 border border-amber-800/40 rounded p-2 flex items-center gap-2">
                            <div className="w-3 h-3 border-2 border-amber-400 border-t-transparent rounded-full animate-spin-slow flex-shrink-0" />
                            <span className="font-mono text-[10px] text-amber-400">
                              RECONCILING… Gateway {gatewayVer} → Control Plane {cpVer}
                            </span>
                          </div>
                        ) : (
                          <div className="bg-emerald-900/15 border border-emerald-800/40 rounded p-2 flex items-center gap-2">
                            <Dot c="green" />
                            <span className="font-mono text-[10px] text-emerald-400">
                              SYNCHRONIZED — Gateway now on {cpVer} · FRESH
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                    {i < STAGES.length - 1 && (
                      <div className={`ml-[7px] w-px h-3 ${st === 'past' ? 'bg-emerald-800/60' : 'bg-slate-800'}`} />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </Card>
      </div>

      {/* Right: governance panel */}
      <div className="space-y-4">
        <Card>
          <CardHeader title="Transaction Governance" />
          <div className="px-4 py-3 space-y-3">
            {[
              { label: 'WHO',           value: 'Customer Support Agent',     color: 'text-slate-200' },
              { label: 'WHAT',          value: 'delete_customer',             mono: true, color: 'text-blue-400' },
              { label: 'WHICH VERSION', value: 'delete_customer:v1',          mono: true, color: 'text-blue-300' },
              { label: 'WITH WHAT ARGS', value: 'customer_id = CUST-10482',  mono: true, color: 'text-amber-300' },
              { label: 'UNDER POLICY',  value: `v${policyVerNum}`,            mono: true, color: 'text-blue-400' },
              { label: 'FOR TENANT',    value: 'Acme Commerce',               color: 'text-slate-200' },
              { label: 'EXECUTION ID',  value: 'EXE-10482-7A91',              mono: true, color: 'text-slate-400' },
            ].map(({ label, value, mono, color }) => (
              <div key={label} className="bg-[#070e1c] border border-[#1a2d45] rounded p-2.5">
                <div className="text-[9px] text-slate-600 uppercase tracking-wider mb-0.5">{label}</div>
                <div className={`text-xs font-semibold ${mono ? 'font-mono' : ''} ${color}`}>{value}</div>
              </div>
            ))}
            {phase === 'p_decision' || curIdx > phaseIndex('p_decision') ? (
              <div className="bg-amber-900/20 border border-amber-800/50 rounded p-2.5 animate-fade-in">
                <div className="text-[9px] text-slate-600 uppercase tracking-wider mb-0.5">DECISION</div>
                <Pill label="REQUIRE_APPROVAL" c="amber" />
              </div>
            ) : null}
          </div>
        </Card>
        <InfoBox color="blue">
          "Authorization is not merely permission to call a tool. VetoPlane evaluates the exact transaction before the side effect occurs."
        </InfoBox>
      </div>
    </div>
  )
}

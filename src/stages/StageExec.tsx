import { useState } from 'react'
import { Dot, Pill, Card, CardHeader, Btn, InfoBox } from '../components/ui'

interface Props {
  onBack: () => void
}

const CONTROL_FEATURES = [
  'Agent Identity',
  'Tenant Context',
  'Tool / Version Governance',
  'Deterministic Policy',
  'Transaction Identity',
  'Approval',
  'Rate / Resource Controls',
  'Idempotency / Duplicate Protection',
  'Audit Ledger',
  'Suspend / Kill',
]

export default function StageExec({ onBack }: Props) {
  const [secCtxOpen, setSecCtxOpen] = useState(false)
  const [crossTenantResult, setCrossTenantResult] = useState<null | 'denied'>(null)

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-[1fr_280px_280px] gap-4">
        {/* Architecture flow */}
        <Card>
          <CardHeader title="VetoPlane — Execution Control" extra={<Pill label="Full Architecture" c="blue" />} />
          <div className="px-5 py-5">
            <div className="flex flex-col items-center gap-0 max-w-xs mx-auto">
              {[
                { label: 'AI Agent', sub: 'Autonomous Decision-maker', color: 'border-slate-600 text-slate-300', plain: true },
                null,
                { label: 'Existing API Gateway / MCP', sub: 'Kong · AWS · Existing MCP Server', color: 'border-slate-600 text-slate-400', note: 'RETAINED', plain: true },
                null,
                { label: 'VetoPlane', sub: 'Execution Control Boundary', color: 'border-blue-700 text-blue-300', highlight: true },
                null,
                { label: 'Existing MCP Server / APIs', sub: 'Customer infrastructure', color: 'border-slate-600 text-slate-400', note: 'RETAINED', plain: true },
                null,
                { label: 'Enterprise Systems', sub: 'Orders · CRM · Billing', color: 'border-slate-600 text-slate-400', plain: true },
              ].map((node, i) => {
                if (!node) return (
                  <div key={i} className="flex flex-col items-center py-0.5">
                    <div className="w-px h-4 bg-slate-700" />
                    <div className="text-slate-600 text-xs">↓</div>
                  </div>
                )
                return (
                  <div key={i} className={`w-full border rounded-lg px-4 py-2.5 text-center ${node.highlight ? 'bg-blue-900/20' : 'bg-[#070e1c]'} ${node.color}`}>
                    <div className={`text-sm font-bold ${node.highlight ? 'tracking-widest' : ''}`}>{node.label}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{node.sub}</div>
                    {(node as any).note && (
                      <div className="mt-1"><Pill label={(node as any).note} c="green" /></div>
                    )}
                    {node.highlight && (
                      <div className="mt-2 text-left space-y-1">
                        {CONTROL_FEATURES.map(f => (
                          <div key={f} className="flex items-center gap-1.5 text-[10px] text-blue-400/80">
                            <span className="text-blue-600">├─</span> {f}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </Card>

        {/* Control plane */}
        <div className="space-y-4">
          <Card>
            <CardHeader title="Control Plane" extra={<Pill label="Manages" c="blue" />} />
            <div className="px-4 py-3 space-y-1.5">
              {['Policy', 'Agents', 'Tools', 'Approvals', 'Configuration', 'Audit'].map(item => (
                <div key={item} className="flex items-center gap-2 text-xs text-slate-300">
                  <Dot c="blue" />
                  {item}
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <CardHeader title="Execution Plane" extra={<Pill label="Enforces" c="green" />} />
            <div className="px-4 py-3 space-y-1.5">
              {['Authentication', 'Validation', 'Policy Enforcement', 'Approval Gate', 'Downstream Invocation', 'Execution Ledger'].map(item => (
                <div key={item} className="flex items-center gap-2 text-xs text-slate-300">
                  <Dot c="green" />
                  {item}
                </div>
              ))}
            </div>
          </Card>

          <InfoBox color="blue">
            <strong>Control Plane manages.</strong><br />
            <strong>Execution Plane enforces.</strong>
          </InfoBox>
        </div>

        {/* Security context */}
        <div className="space-y-4">
          <Card>
            <CardHeader
              title="Security Context"
              extra={
                <button
                  onClick={() => setSecCtxOpen(!secCtxOpen)}
                  className="text-[10px] text-blue-400 hover:text-blue-300 cursor-pointer"
                >
                  {secCtxOpen ? 'Close' : 'Open Drawer'}
                </button>
              }
            />
            <div className="px-4 py-3 space-y-0.5">
              {[
                { k: 'Authenticated Tenant', v: 'Acme Commerce', c: 'text-slate-200' },
                { k: 'Tenant Context', v: 'SET', c: 'text-emerald-400' },
                { k: 'RLS', v: 'ENABLED', c: 'text-emerald-400' },
                { k: 'Agent', v: 'agent-support-prod-01', mono: true, c: 'text-slate-300' },
                { k: 'Tool', v: 'refund_order:v1', mono: true, c: 'text-slate-300' },
                { k: 'Policy', v: 'v43', mono: true, c: 'text-blue-400' },
              ].map(({ k, v, mono, c }) => (
                <div key={k} className="flex justify-between py-1.5 text-xs">
                  <span className="text-slate-500">{k}</span>
                  <span className={`${mono ? 'font-mono' : ''} ${c}`}>{v}</span>
                </div>
              ))}
              <div className="pt-2 space-y-2">
                <div className="text-[10px] text-slate-600 uppercase tracking-wider">Tenant Isolation Demo</div>
                <Btn
                  variant="danger" size="sm" className="w-full"
                  disabled={crossTenantResult === 'denied'}
                  onClick={() => setCrossTenantResult('denied')}
                >
                  Attempt Cross-Tenant Access
                </Btn>
                {crossTenantResult === 'denied' && (
                  <div className="bg-red-900/20 border border-red-800/50 rounded p-2 animate-fade-in">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Dot c="red" />
                      <span className="text-[11px] font-bold text-red-400">DENIED</span>
                    </div>
                    <div className="text-[10px] text-slate-400">Reason: Tenant context mismatch.</div>
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* MVP checklist */}
          <Card>
            <CardHeader title="MVP Coverage" />
            <div className="px-3 py-3 max-h-64 overflow-y-auto">
              {[
                'Tenant context / isolation',
                'Agent registration and identity',
                'Tool registry + immutable versions',
                'Agent-to-tool-version binding',
                'MCP integration',
                'Existing gateway coexistence',
                'Deterministic policy engine',
                'ALLOW / DENY / REQUIRE_APPROVAL',
                'RATE_LIMIT',
                'Argument validation',
                'Execution identity',
                'Duplicate submission protection',
                'Transaction-bound approval',
                'Approval expiration',
                'Single-use approval',
                'Ambiguous downstream outcome',
                'Execution ledger',
                'Agent suspend / kill',
                'Config freshness / RECONCILING',
                'STALE_WITHIN_GRACE / FAIL_CLOSED',
                'Policy versioning',
              ].map(item => (
                <div key={item} className="flex items-center gap-2 py-1 text-[11px] text-slate-400 border-b border-[#0f1d30] last:border-0">
                  <span className="text-emerald-500 flex-shrink-0">✓</span>
                  {item}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Final message */}
      <Card glow="blue">
        <div className="px-6 py-5 text-center space-y-3">
          <p className="text-slate-400 text-sm italic">"AI agents decide what they want to do."</p>
          <p className="text-xl font-bold text-slate-100">
            VetoPlane controls what they are actually allowed to execute.
          </p>
          <p className="text-xs text-slate-500 max-w-xl mx-auto leading-relaxed">
            VetoPlane does not decide what the AI wants to do. It controls whether the requested transaction is permitted to execute — governing identity, policy, approval, idempotency, and execution at the moment a consequential action is attempted.
          </p>
        </div>
      </Card>

      <Btn variant="ghost" size="sm" onClick={onBack} className="w-full">← Back to Execution Ledger</Btn>
    </div>
  )
}

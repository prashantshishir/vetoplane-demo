import { Dot, Pill, Card, CardHeader, KV, Btn, Divider } from '../components/ui'

type Phase = 'approval' | 'approved' | 'executing' | 'succeeded' | string

const fmtSecs = (s: number) => {
  const m = Math.floor(s / 60)
  const sec = s % 60
  return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`
}

interface Props {
  phase: Phase
  approvalSecs: number
  policyVerNum: number
  onApprove: () => void
  onDeny: () => void
}

export default function Stage07({ phase, approvalSecs, policyVerNum, onApprove, onDeny }: Props) {
  const isPending = phase === 'approval'
  const isDone = ['approved', 'executing', 'succeeded'].includes(phase)

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <Card glow={isPending ? 'amber' : isDone ? 'green' : undefined}>
        <CardHeader
          title="Human Approval Required"
          extra={
            isPending ? <Pill label="PENDING" c="amber" /> :
            phase === 'approved' ? <Pill label="APPROVED" c="green" /> :
            phase === 'executing' ? <Pill label="EXECUTING" c="blue" /> :
            phase === 'succeeded' ? <Pill label="COMPLETED" c="green" /> :
            null
          }
        />
        <div className="px-6 py-5">
          {/* Transaction details */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-0.5 mb-5">
            <KV k="Agent" v="Customer Support Agent" />
            <KV k="Policy Version" v={`v${policyVerNum}`} mono />
            <KV k="Tenant" v="Acme Commerce" />
            <KV k="Execution ID" v="EXE-10482-7A91" mono />
            <KV k="Tool" v="delete_customer:v1" mono />
            <KV k="Approval" v="Single-use" />
            <KV k="Customer" v="CUST-10482" mono />
            {isPending && <KV k="Expires in" v={<span className="text-red-400 font-mono font-bold">{fmtSecs(approvalSecs)}</span>} />}
            <KV k="Action Risk" v={<span className="font-mono font-bold text-red-400">CRITICAL / IRREVERSIBLE</span>} />
            <KV k="Policy" v={<span className="text-xs">Critical destructive actions require approval</span>} />
          </div>

          <Divider />

          {/* Fingerprint */}
          <div className="flex items-center justify-between mb-5">
            <div>
              <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Transaction Digest</div>
              <div className="font-mono text-sm font-bold text-slate-300 tracking-widest">8F72-C91A-4D21</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] text-slate-500 mb-1">Binding</div>
              <div className="text-[10px] text-slate-400 italic">Cryptographically bound to exact transaction</div>
            </div>
          </div>

          {isPending && (
            <>
              <div className="bg-amber-900/10 border border-amber-900/40 rounded p-3 mb-4 text-center">
                <div className="text-[11px] text-amber-400/80 italic">
                  "Approval is cryptographically bound to this exact transaction."
                </div>
                <div className="text-[10px] text-slate-500 mt-1">
                  Approval is single-use and cannot be replayed for a different transaction.
                </div>
              </div>
              <div className="flex gap-3">
                <Btn variant="green" size="lg" className="flex-1" onClick={onApprove}>
                  ✓ Approve Exact Transaction
                </Btn>
                <Btn variant="danger" size="lg" className="flex-1" onClick={onDeny}>
                  ✗ Deny Transaction
                </Btn>
              </div>
            </>
          )}

          {isDone && (
            <div className="space-y-3 animate-fade-in">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Approval', value: 'VALID', color: 'text-emerald-400' },
                  { label: 'Nonce', value: 'CONSUMED', color: 'text-amber-400' },
                  { label: 'Policy', value: `v${policyVerNum}`, color: 'text-blue-400' },
                  { label: 'Transaction', value: 'UNCHANGED', color: 'text-emerald-400' },
                ].map(({ label, value, color }) => (
                  <div key={label} className="bg-[#070e1c] border border-[#1a2d45] rounded p-2.5 text-center">
                    <div className="text-[9px] text-slate-500 mb-1">{label}</div>
                    <div className={`font-mono text-xs font-bold ${color}`}>{value}</div>
                  </div>
                ))}
              </div>

              {phase === 'executing' && (
                <div className="bg-blue-900/20 border border-blue-800/40 rounded p-3 flex items-center gap-2 animate-fade-in">
                  <div className="w-3 h-3 border-2 border-blue-400 border-t-transparent rounded-full animate-spin-slow" />
                  <span className="text-xs text-blue-300 font-medium">EXECUTING — routing to Existing MCP Server → Customer DB</span>
                </div>
              )}

              {phase === 'succeeded' && (
                <div className="space-y-3 animate-slide-in">
                  <div className="bg-emerald-900/20 border border-emerald-800/50 rounded p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Dot c="green" />
                      <span className="font-bold text-emerald-400">Downstream Execution Succeeded</span>
                    </div>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-1 font-mono text-[11px]">
                      <span className="text-slate-500">Existing MCP Server</span><span className="text-slate-300">→ Customer DB</span>
                      <span className="text-slate-500">Action</span><span className="text-amber-300 font-bold">delete_customer:v1</span>
                      <span className="text-slate-500">Customer</span><span className="text-slate-300">CUST-10482</span>
                      <span className="text-slate-500">Execution ID</span><span className="text-slate-300">EXE-10482-7A91</span>
                      <span className="text-slate-500">Idempotency-Key</span><span className="text-slate-300">EXE-10482-7A91</span>
                      <span className="text-slate-500">Downstream</span><span className="text-emerald-400">CALLED — SUCCEEDED</span>
                    </div>
                    <div className="mt-3 text-xs text-emerald-400/80 italic text-center">
                      "Transaction executed under the approved policy context. Approval consumed — single-use."
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}

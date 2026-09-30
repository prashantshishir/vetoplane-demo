import { useState } from 'react'
import { Pill, Card, CardHeader, KV, Btn, SectionTitle, SectionSubtitle, SuccessBanner, InfoBox, Divider } from '../components/ui'

interface Props {
  policyPublished: boolean
  setPolicyPublished: (v: boolean) => void
  refundThreshold: number
  setRefundThreshold: (v: number) => void
  policyVerNum: number
  setPolicyVerNum: (v: number) => void
  onNext: () => void
  onBack: () => void
}

type Decision = 'ALLOW' | 'REQUIRE_APPROVAL' | 'DENY'

interface PolicyRule {
  tool: string
  condition: string
  decision: Decision
  editable?: boolean
}

const decisionColor = (d: Decision) => {
  if (d === 'ALLOW') return 'green'
  if (d === 'REQUIRE_APPROVAL') return 'amber'
  return 'red'
}

export default function Stage04({
  policyPublished, setPolicyPublished,
  refundThreshold, setRefundThreshold,
  policyVerNum, setPolicyVerNum,
  onNext, onBack,
}: Props) {
  const [publishing, setPublishing] = useState(false)
  const [justPublished, setJustPublished] = useState(false)
  const [publishedTs] = useState(() => new Date().toLocaleTimeString('en-GB', { hour12: false }))

  const rules: PolicyRule[] = [
    { tool: 'get_customer',    condition: 'any',                decision: 'ALLOW' },
    { tool: 'search_orders',   condition: 'any',                decision: 'ALLOW' },
    { tool: 'update_ticket',   condition: 'any',                decision: 'ALLOW' },
    { tool: 'refund_order',    condition: 'any',                decision: 'ALLOW' },
    { tool: 'delete_customer', condition: 'CRITICAL / IRREVERSIBLE', decision: 'REQUIRE_APPROVAL', editable: true },
    { tool: 'delete_customer', condition: 'unauthorized agent', decision: 'DENY' },
  ]

  const handlePublish = async () => {
    setPublishing(true)
    await new Promise(r => setTimeout(r, 700))
    setPolicyVerNum(policyVerNum + 1)
    setPolicyPublished(true)
    setJustPublished(true)
    setPublishing(false)
    setTimeout(() => setJustPublished(false), 3000)
  }

  const currentVer = `v${policyVerNum}`
  const nextVer = `v${policyVerNum + 1}`

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <div>
        <SectionTitle>Configure Policy</SectionTitle>
        <SectionSubtitle>
          Define deterministic transaction-level policy. Policy is a live control-plane object — publishing a new version
          immediately propagates to all connected gateways. Agents cannot modify policy.
        </SectionSubtitle>
      </div>

      <Card>
        <CardHeader
          title="Transaction Policy"
          extra={
            <div className="flex items-center gap-2">
              <Pill label={`Rate limit: 100/hr`} c="gray" />
              <Pill label={currentVer} c="blue" />
            </div>
          }
        />
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#1a2d45]">
                {['Tool', 'Condition', 'Decision'].map(h => (
                  <th key={h} className="text-left px-4 py-2 text-[10px] text-slate-500 uppercase tracking-wider font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rules.map((r, i) => (
                <tr key={i} className={`border-b border-[#0f1d30] ${i % 2 === 0 ? '' : 'bg-[#070e1c]/50'}`}>
                  <td className="px-4 py-2.5 font-mono text-slate-300">{r.tool}</td>
                  <td className="px-4 py-2.5 text-slate-400">{r.condition}</td>
                  <td className="px-4 py-2.5"><Pill label={r.decision} c={decisionColor(r.decision)} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Policy rule editor */}
      <Card>
        <CardHeader title="Edit Policy — Execution Control Rule" extra={<Pill label="Live Control" c="blue" />} />
        <div className="px-5 py-4 space-y-3">
          <div className="flex items-center gap-3 p-3 bg-[#070e1c] border border-[#1a2d45] rounded-lg">
            <span className="font-mono text-xs text-blue-300">delete_customer</span>
            <span className="text-slate-600 text-xs">+</span>
            <span className="font-mono text-xs text-amber-300">CRITICAL / IRREVERSIBLE</span>
            <span className="text-slate-600 text-xs">→</span>
            <Pill label="REQUIRE_APPROVAL" c="amber" />
          </div>
          <div className="flex items-center gap-3 p-3 bg-[#070e1c] border border-[#1a2d45] rounded-lg">
            <span className="font-mono text-xs text-blue-300">delete_customer</span>
            <span className="text-slate-600 text-xs">+</span>
            <span className="font-mono text-xs text-slate-400">unauthorized agent</span>
            <span className="text-slate-600 text-xs">→</span>
            <Pill label="DENY" c="red" />
          </div>
          <InfoBox color="amber">
            Publishing creates policy {nextVer}. Connected execution gateways reconcile automatically within the freshness window.
          </InfoBox>
        </div>
      </Card>

      {/* Publish */}
      <Btn
        variant={justPublished ? 'green' : 'primary'} size="lg" className="w-full"
        disabled={publishing}
        onClick={handlePublish}
      >
        {publishing ? (
          <>
            <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin-slow" />
            Publishing...
          </>
        ) : justPublished ? `✓ Policy ${currentVer} Published` : `Publish Policy → ${nextVer}`}
      </Btn>

      {policyPublished && (
        <div className="space-y-4 animate-slide-in">
          <SuccessBanner>
            <div className="font-bold mb-1.5">Policy {currentVer} published</div>
            <KV k="Policy Change" v={<>delete_customer · CRITICAL → <Pill label="REQUIRE_APPROVAL" c="amber" /></>} />
            <KV k="Policy Version" v={currentVer} mono />
            <KV k="Change ID" v="chg_019283" mono />
            <KV k="Timestamp" v={publishedTs} mono />
          </SuccessBanner>

          <Card>
            <div className="px-5 py-3">
              <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-2">Active Policy Snapshot — {currentVer}</div>
              <div className="space-y-1.5">
                {rules.map((r, i) => (
                  <div key={i} className="flex items-center gap-3 text-xs font-mono">
                    <span className="text-slate-500 w-28 flex-shrink-0">{r.tool}</span>
                    <span className="text-slate-600 flex-1">{r.condition}</span>
                    <Pill label={r.decision} c={decisionColor(r.decision)} />
                  </div>
                ))}
              </div>
              <Divider />
              <div className="text-[10px] text-slate-600 italic">
                "Policy is a live control-plane object, not hardcoded application logic."
              </div>
            </div>
          </Card>

          <div className="flex gap-3">
            <Btn variant="ghost" size="lg" className="flex-1" onClick={onBack}>← Back</Btn>
            <Btn variant="primary" size="lg" className="flex-1" onClick={onNext}>Next: Test Agent →</Btn>
          </div>
        </div>
      )}

      {!policyPublished && (
        <Btn variant="ghost" size="sm" onClick={onBack} className="w-full mt-1">← Back</Btn>
      )}
    </div>
  )
}

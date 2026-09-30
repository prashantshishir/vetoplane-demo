import { useState } from 'react'
import { Pill, Card, CardHeader, Btn, SectionTitle, SectionSubtitle, SuccessBanner, InfoBox } from '../components/ui'

const TOOLS = [
  { name: 'get_customer',    version: 'v1', risk: 'LOW',      access: 'ALLOWED',     status: 'ACTIVE' },
  { name: 'search_orders',   version: 'v1', risk: 'LOW',      access: 'ALLOWED',     status: 'ACTIVE' },
  { name: 'update_ticket',   version: 'v1', risk: 'MEDIUM',   access: 'ALLOWED',     status: 'ACTIVE' },
  { name: 'refund_order',    version: 'v1', risk: 'HIGH',     access: 'RESTRICTED',  status: 'ACTIVE' },
  { name: 'delete_customer', version: 'v1', risk: 'CRITICAL', access: 'DENIED',      status: 'ACTIVE' },
]

const riskColor = (r: string) => {
  if (r === 'LOW') return 'green'
  if (r === 'MEDIUM') return 'amber'
  if (r === 'HIGH') return 'red'
  return 'red'
}
const accessColor = (a: string) => {
  if (a === 'ALLOWED') return 'green'
  if (a === 'RESTRICTED') return 'amber'
  return 'red'
}

interface Props {
  toolsRegistered: boolean
  setToolsRegistered: (v: boolean) => void
  onNext: () => void
  onBack: () => void
}

export default function Stage03({ toolsRegistered, setToolsRegistered, onNext, onBack }: Props) {
  const [registering, setRegistering] = useState(false)

  const handleRegister = async () => {
    setRegistering(true)
    await new Promise(r => setTimeout(r, 800))
    setToolsRegistered(true)
    setRegistering(false)
  }

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <div>
        <SectionTitle>Register Tools</SectionTitle>
        <SectionSubtitle>
          Tools are registered with explicit risk levels and agent access controls. Published tool versions are immutable —
          agents bind to an exact version and cannot silently receive a schema change.
        </SectionSubtitle>
      </div>

      <Card>
        <CardHeader title="Tool Registry" extra={<Pill label="5 tools" c="blue" />} />
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#1a2d45]">
                {['Tool', 'Version', 'Risk', 'Agent Access', 'Status'].map(h => (
                  <th key={h} className="text-left px-4 py-2 text-[10px] text-slate-500 uppercase tracking-wider font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TOOLS.map((t, i) => (
                <tr key={t.name} className={`border-b border-[#0f1d30] ${i % 2 === 0 ? '' : 'bg-[#070e1c]/50'}`}>
                  <td className="px-4 py-2.5 font-mono text-slate-200">{t.name}</td>
                  <td className="px-4 py-2.5 font-mono text-slate-400">{t.version}</td>
                  <td className="px-4 py-2.5"><Pill label={t.risk} c={riskColor(t.risk) as any} /></td>
                  <td className="px-4 py-2.5"><Pill label={t.access} c={accessColor(t.access) as any} /></td>
                  <td className="px-4 py-2.5"><Pill label={t.status} c="green" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Immutable versions callout */}
      <Card>
        <CardHeader title="Tool Version Governance" extra={<Pill label="Immutable" c="purple" />} />
        <div className="px-5 py-4 space-y-3">
          <div className="bg-[#070e1c] border border-[#1a2d45] rounded p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-sm text-slate-200">refund_order</span>
              <div className="flex gap-2">
                <Pill label="v1" c="blue" />
                <Pill label="PUBLISHED" c="green" />
              </div>
            </div>
            <div className="text-[11px] text-slate-500 italic">
              "Published tool versions are immutable. Agent bindings reference an exact tool version."
            </div>
          </div>
          <InfoBox color="blue">
            A new tool schema creates a new version (v2, v3…). Existing agent bindings continue using their pinned version.
            This prevents silent contract drift between agents and tools.
          </InfoBox>
          <div className="bg-[#070e1c] border border-[#1a2d45] rounded p-3">
            <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-2">Agent → Tool Version Binding</div>
            <div className="font-mono text-xs space-y-1">
              <div className="text-slate-300">Customer Support Agent</div>
              <div className="text-slate-600 pl-4">→ <span className="text-blue-400">refund_order:v1</span></div>
              <div className="text-slate-600 pl-4">→ <span className="text-slate-400">get_customer:v1</span></div>
              <div className="text-slate-600 pl-4">→ <span className="text-slate-400">search_orders:v1</span></div>
              <div className="text-slate-600 pl-4">→ <span className="text-slate-400">update_ticket:v1</span></div>
            </div>
          </div>
        </div>
      </Card>

      {!toolsRegistered ? (
        <Btn variant="primary" size="lg" className="w-full" disabled={registering} onClick={handleRegister}>
          {registering ? (
            <>
              <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin-slow" />
              Registering Tools...
            </>
          ) : 'Register 5 Tools →'}
        </Btn>
      ) : (
        <div className="space-y-4 animate-slide-in">
          <SuccessBanner>
            <div className="font-bold mb-1">5 tools registered and bound to agent-support-prod-01</div>
            <div className="font-mono text-[11px] space-y-0.5">
              {TOOLS.map(t => (
                <div key={t.name}>
                  <span className="text-emerald-500">{t.name}:{t.version}</span>
                  {' — '}
                  <Pill label={t.access} c={accessColor(t.access) as any} />
                </div>
              ))}
            </div>
          </SuccessBanner>
          <div className="flex gap-3">
            <Btn variant="ghost" size="lg" className="flex-1" onClick={onBack}>← Back</Btn>
            <Btn variant="primary" size="lg" className="flex-1" onClick={onNext}>Next: Configure Policy →</Btn>
          </div>
        </div>
      )}

      {!toolsRegistered && (
        <Btn variant="ghost" size="sm" onClick={onBack} className="w-full mt-1">← Back</Btn>
      )}
    </div>
  )
}

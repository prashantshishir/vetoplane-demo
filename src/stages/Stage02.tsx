import { useState } from 'react'
import { Dot, Pill, Card, CardHeader, Btn, SectionTitle, SectionSubtitle, SuccessBanner, InfoBox } from '../components/ui'

interface Props {
  gatewayConnected: boolean
  setGatewayConnected: (v: boolean) => void
  onNext: () => void
  onBack: () => void
}

const CHECKS = [
  'Existing infrastructure retained',
  'VetoPlane inserted into execution path',
  'Policies enforced before consequential actions',
  'VetoPlane Cloud manages configuration',
  'Execution traffic remains in customer environment',
]

export default function Stage02({ gatewayConnected, setGatewayConnected, onNext, onBack }: Props) {
  const [mode, setMode] = useState<'customer' | 'agentsentry'>('agentsentry')
  const [connecting, setConnecting] = useState(false)

  const handleConnect = async () => {
    setConnecting(true)
    await new Promise(r => setTimeout(r, 900))
    setGatewayConnected(true)
    setConnecting(false)
  }

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <div>
        <SectionTitle>Connect Infrastructure</SectionTitle>
        <SectionSubtitle>
          VetoPlane sits alongside your existing gateway and MCP infrastructure. It does not replace either.
          Choose your deployment model below.
        </SectionSubtitle>
      </div>

      {/* Architecture diagram */}
      <Card>
        <CardHeader title="Deployment Architecture" extra={<Pill label="Customer-hosted Execution" c="blue" />} />
        <div className="px-5 py-5">
          {/* Control plane cloud */}
          <div className="flex justify-center mb-4">
            <div className="bg-blue-900/20 border border-blue-800/40 rounded-lg px-6 py-2.5 text-center">
              <div className="text-[10px] text-blue-400 uppercase tracking-widest mb-0.5">VetoPlane Cloud</div>
              <div className="text-[11px] text-blue-300 font-medium">Control Plane</div>
              <div className="text-[9px] text-slate-500 mt-0.5 font-mono">Policy · Config · Approvals · Fleet State · Audit</div>
            </div>
          </div>
          {/* Two-direction control ↔ execution plane flows */}
          <div className="flex justify-center mb-4 gap-8">
            <div className="flex flex-col items-center gap-0.5">
              <div className="w-px h-4 bg-blue-800/50" />
              <div className="text-blue-600 text-[10px]">▼</div>
              <div className="text-[9px] text-blue-500/70 font-mono text-center">Policy · Config<br />Approvals · Revocation</div>
            </div>
            <div className="flex flex-col items-center gap-0.5">
              <div className="w-px h-4 bg-emerald-800/50" />
              <div className="text-emerald-600 text-[10px]">▲</div>
              <div className="text-[9px] text-emerald-500/70 font-mono text-center">Execution Events<br />Outcomes · Audit</div>
            </div>
          </div>
          {/* Execution flow */}
          <div className="flex items-center gap-0 overflow-x-auto pb-2">
            {[
              { label: 'AI Agent', sub: 'Customer Support Agent', color: 'border-slate-600 text-slate-300' },
              null,
              { label: 'Existing Gateway', sub: 'Kong / Enterprise API', color: 'border-slate-600 text-slate-400', note: 'RETAINED' },
              null,
              { label: 'VetoPlane', sub: 'Execution Gateway', color: 'border-blue-700 text-blue-300', highlight: true },
              null,
              { label: 'MCP Server', sub: 'Customer MCP Server', color: 'border-slate-600 text-slate-400', note: 'RETAINED' },
              null,
              { label: 'Enterprise System', sub: 'Orders · CRM · Billing', color: 'border-slate-600 text-slate-400' },
            ].map((node, i) => {
              if (!node) return (
                <div key={i} className="flex items-center flex-shrink-0 px-1">
                  <div className="w-6 h-px bg-slate-700" />
                  <div className="text-slate-600 text-xs">→</div>
                </div>
              )
              return (
                <div key={i} className={`flex-shrink-0 border rounded-lg px-3 py-2 text-center min-w-[108px] ${node.highlight ? 'bg-blue-900/20' : 'bg-[#070e1c]'} ${node.color}`}>
                  <div className="text-[11px] font-semibold">{node.label}</div>
                  <div className="text-[9px] text-slate-500 mt-0.5">{node.sub}</div>
                  {node.note && <div className="mt-1"><Pill label={node.note} c="green" /></div>}
                </div>
              )
            })}
          </div>
        </div>
        <div className="px-5 pb-4">
          <InfoBox color="blue">
            <strong>Keep your infrastructure. Add VetoPlane as the trusted execution-control boundary.</strong>
            {' '}VetoPlane does NOT replace your existing API gateway or MCP server. It inserts enforcement logic between them and the downstream system.
          </InfoBox>
        </div>
      </Card>

      {/* Deployment mode selection */}
      <Card>
        <CardHeader title="Deployment Mode" />
        <div className="px-5 py-4 space-y-2">
          {[
            { id: 'customer' as const, label: 'Customer-hosted Gateway', sub: 'Full control. VetoPlane gateway runs in your environment.' },
            { id: 'agentsentry' as const, label: 'Existing Gateway + VetoPlane', sub: 'Recommended. Insert VetoPlane alongside Kong, AWS API GW, or similar.' },
          ].map(opt => (
            <button
              key={opt.id}
              onClick={() => !gatewayConnected && setMode(opt.id)}
              className={`w-full text-left p-3 rounded border transition-all cursor-pointer ${
                mode === opt.id
                  ? 'border-blue-600/60 bg-blue-900/15'
                  : 'border-[#1a2d45] hover:border-[#253d5a]'
              } ${gatewayConnected ? 'cursor-default opacity-70' : ''}`}
            >
              <div className="flex items-center gap-2 mb-0.5">
                <div className={`w-3 h-3 rounded-full border-2 flex-shrink-0 ${mode === opt.id ? 'border-blue-500 bg-blue-500' : 'border-slate-600'}`} />
                <span className="text-sm font-medium text-slate-200">{opt.label}</span>
              </div>
              <p className="text-xs text-slate-500 pl-5">{opt.sub}</p>
            </button>
          ))}
        </div>
      </Card>

      {!gatewayConnected ? (
        <Btn variant="primary" size="lg" className="w-full" disabled={connecting} onClick={handleConnect}>
          {connecting ? (
            <>
              <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin-slow" />
              Connecting Gateway...
            </>
          ) : 'Connect Gateway →'}
        </Btn>
      ) : (
        <div className="space-y-4 animate-slide-in">
          <SuccessBanner>
            <div className="font-bold mb-2">Gateway Connected</div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-1 font-mono text-[11px]">
              <span className="text-emerald-500">Gateway Status</span><span>CONNECTED</span>
              <span className="text-emerald-500">Control Channel</span><span>CONNECTED</span>
              <span className="text-emerald-500">Configuration</span><span>FRESH</span>
            </div>
          </SuccessBanner>

          <Card>
            <div className="px-5 py-3 space-y-1.5">
              {CHECKS.map(c => (
                <div key={c} className="flex items-center gap-2 text-xs text-slate-300">
                  <Dot c="green" />
                  {c}
                </div>
              ))}
            </div>
          </Card>

          <div className="flex gap-3">
            <Btn variant="ghost" size="lg" className="flex-1" onClick={onBack}>← Back</Btn>
            <Btn variant="primary" size="lg" className="flex-1" onClick={onNext}>Next: Register Tools →</Btn>
          </div>
        </div>
      )}

      {!gatewayConnected && (
        <Btn variant="ghost" size="sm" onClick={onBack} className="w-full">← Back</Btn>
      )}
    </div>
  )
}

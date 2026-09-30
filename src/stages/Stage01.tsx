import { useState } from 'react'
import { Dot, Pill, Card, CardHeader, KV, Btn, SectionTitle, SectionSubtitle, SuccessBanner, Divider, InfoBox } from '../components/ui'

interface Props {
  agentRegistered: boolean
  setAgentRegistered: (v: boolean) => void
  agentStatus: 'active' | 'suspended'
  setAgentStatus: (v: 'active' | 'suspended') => void
  onNext: () => void
}

export default function Stage01({ agentRegistered, setAgentRegistered, agentStatus, setAgentStatus, onNext }: Props) {
  const [confirming, setConfirming] = useState(false)

  const handleRegister = async () => {
    setConfirming(true)
    await new Promise(r => setTimeout(r, 700))
    setAgentRegistered(true)
    setConfirming(false)
  }

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div>
        <SectionTitle>Register Agent</SectionTitle>
        <SectionSubtitle>
          Every agent that can call tools through VetoPlane must be registered and assigned an execution identity.
          This identity is evaluated on every transaction.
        </SectionSubtitle>
      </div>

      <Card>
        <CardHeader title="Agent Configuration" />
        <div className="px-5 py-4 space-y-0.5">
          <KV k="Agent Name" v="Customer Support Agent" />
          <KV k="Agent ID" v="agent-support-prod-01" mono />
          <KV k="Environment" v={<Pill label="Production" c="amber" />} />
          <KV k="Owner" v="Customer Operations" />
          <KV k="Tenant" v="Acme Commerce" />
          <Divider />
          <KV k="Authentication" v={<Pill label="CONFIGURED" c="green" />} />
          <KV k="Execution Status" v={<Pill label={agentRegistered ? 'PENDING CONFIGURATION' : 'NOT ENABLED'} c={agentRegistered ? 'amber' : 'red'} />} />
          <KV k="Identity Evaluation" v="On every execution" />
        </div>
      </Card>
      {!agentRegistered && (
        <InfoBox color="amber">
          Registration establishes the agent identity. Execution authority is evaluated only after infrastructure, tools, and policy are configured.
        </InfoBox>
      )}

      {!agentRegistered ? (
        <Btn
          variant="primary" size="lg" className="w-full"
          disabled={confirming}
          onClick={handleRegister}
        >
          {confirming ? (
            <>
              <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin-slow" />
              Registering...
            </>
          ) : 'Register Agent →'}
        </Btn>
      ) : (
        <div className="space-y-4 animate-slide-in">
          <SuccessBanner>
            <div className="font-bold text-emerald-300 mb-1.5">Agent successfully registered</div>
            <div className="space-y-1">
              <div><span className="text-emerald-500">Agent Identity: </span><span className="font-mono">agent-support-prod-01</span></div>
              <div><span className="text-emerald-500">Status: </span><Pill label="REGISTERED" c="green" /></div>
            </div>
            <div className="mt-2 text-emerald-400/80 italic">
              "Agent identity will be evaluated on every execution."
            </div>
          </SuccessBanner>

          <Card glow={agentStatus === 'suspended' ? 'red' : undefined}>
            <CardHeader
              title="Agent Status Control"
              extra={<Pill label={agentStatus === 'active' ? 'ACTIVE' : 'SUSPENDED'} c={agentStatus === 'active' ? 'green' : 'red'} />}
            />
            <div className="px-5 py-4">
              <div className="flex items-center gap-3 mb-3">
                <Dot c={agentStatus === 'active' ? 'green' : 'red'} pulse={agentStatus === 'suspended'} />
                <span className={`text-sm font-semibold ${agentStatus === 'active' ? 'text-emerald-400' : 'text-red-400'}`}>
                  {agentStatus === 'active' ? 'Agent Active — accepting executions' : 'Agent Suspended — all executions blocked'}
                </span>
              </div>
              {agentStatus === 'active' ? (
                <>
                  <InfoBox color="blue">
                    Suspension takes effect immediately on the next execution attempt. In-flight executions in the approval pipeline are not automatically cancelled.
                  </InfoBox>
                  <Btn
                    variant="danger" size="sm" className="w-full mt-3"
                    onClick={() => setAgentStatus('suspended')}
                  >
                    ⏸ Suspend Agent
                  </Btn>
                </>
              ) : (
                <>
                  <InfoBox color="red">
                    Agent suspended. Any execution attempt will be intercepted by VetoPlane and returned with EXECUTION_BLOCKED. The downstream system will not be reached.
                  </InfoBox>
                  <Btn
                    variant="green" size="sm" className="w-full mt-3"
                    onClick={() => setAgentStatus('active')}
                  >
                    ▶ Reactivate Agent
                  </Btn>
                </>
              )}
            </div>
          </Card>

          <Btn variant="primary" size="lg" className="w-full" onClick={onNext}>
            Next: Connect Infrastructure →
          </Btn>
        </div>
      )}
    </div>
  )
}

import { useState } from 'react'
import { Pill, Card, CardHeader, Btn, SectionTitle, SectionSubtitle, InfoBox } from '../components/ui'

interface Props {
  refundThreshold: number
  policyVerNum: number
  onSendToolCall: () => void
  onBack: () => void
}

export default function Stage05({ refundThreshold, policyVerNum, onSendToolCall, onBack }: Props) {
  const [sending, setSending] = useState(false)

  const handleSend = async () => {
    setSending(true)
    await new Promise(r => setTimeout(r, 600))
    onSendToolCall()
  }

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div>
        <SectionTitle>Agent Request</SectionTitle>
        <SectionSubtitle>
          The autonomous agent decides to delete a customer record. VetoPlane intercepts the tool call at the
          execution boundary before it reaches the enterprise system.
        </SectionSubtitle>
      </div>

      {/* Conversation */}
      <Card>
        <CardHeader title="Agent Conversation" extra={<Pill label="Live Session" c="blue" />} />
        <div className="px-5 py-4 space-y-4">
          {/* Customer message */}
          <div className="flex gap-3">
            <div className="w-7 h-7 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center flex-shrink-0 text-[10px] text-slate-300 font-bold">C</div>
            <div className="flex-1">
              <div className="text-[10px] text-slate-500 mb-1">Customer · Sarah Mitchell</div>
              <div className="bg-[#111d35] border border-[#1a2d45] rounded-lg rounded-tl-none px-4 py-3 text-sm text-slate-200">
                I would like to permanently close and delete my account — CUST-10482.
              </div>
            </div>
          </div>

          {/* Agent message */}
          <div className="flex gap-3 flex-row-reverse">
            <div className="w-7 h-7 rounded-full bg-blue-800/50 border border-blue-700/50 flex items-center justify-center flex-shrink-0 text-[10px] text-blue-300 font-bold">AI</div>
            <div className="flex-1">
              <div className="text-[10px] text-slate-500 mb-1 text-right">Customer Support Agent</div>
              <div className="bg-blue-900/20 border border-blue-800/40 rounded-lg rounded-tr-none px-4 py-3 text-sm text-slate-200 text-right">
                Understood. I will permanently delete customer account{' '}
                <span className="font-mono text-amber-300 font-bold">CUST-10482</span>.
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Generated tool call */}
      <Card>
        <CardHeader title="Agent-Generated Tool Call" extra={<Pill label="Pending Execution" c="amber" />} />
        <div className="px-5 py-4">
          <div className="bg-[#040810] rounded border border-[#1a2d45] p-4 font-mono text-xs mb-4">
            <div className="text-purple-400 mb-1">{'// Agent invocation'}</div>
            <div><span className="text-blue-400">delete_customer</span><span className="text-slate-400">({'{'}</span></div>
            <div className="pl-4">
              <span className="text-amber-300">customer_id</span>
              <span className="text-slate-400">: </span>
              <span className="text-emerald-400">"CUST-10482"</span>
            </div>
            <div className="text-slate-400">{'});'}</div>
          </div>

          <InfoBox color="red">
            <strong>Destructive action detected.</strong> This permanently deletes a customer record.
            VetoPlane evaluates this against execution policy before anything reaches the enterprise system.
          </InfoBox>

          <div className="mt-4 space-y-1 text-xs">
            <div className="flex justify-between text-slate-500">
              <span>Tool</span><span className="font-mono text-slate-300">delete_customer:v1</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Arguments</span><span className="font-mono text-amber-300 font-bold">customer_id: CUST-10482</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Action type</span><span className="font-mono text-red-400">CRITICAL / IRREVERSIBLE</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Expected decision</span><Pill label="REQUIRE_APPROVAL" c="amber" />
            </div>
          </div>
        </div>
      </Card>

      <div className="flex gap-3">
        <Btn variant="ghost" size="lg" className="flex-1" onClick={onBack}>← Back</Btn>
        <Btn variant="primary" size="lg" className="flex-1" disabled={sending} onClick={handleSend}>
          {sending ? (
            <>
              <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin-slow" />
              Sending to VetoPlane...
            </>
          ) : 'Send Tool Call →'}
        </Btn>
      </div>
    </div>
  )
}

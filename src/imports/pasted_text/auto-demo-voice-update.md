Modify the EXISTING AgentSentry Auto Demo Mode.

The Auto Demo already works correctly with automatic screen progression and the guided narration text. DO NOT redesign or remove the existing Auto Demo.

Now add a REAL SPOKEN VOICE NARRATION that automatically plays during the Auto Demo.

## PRIMARY REQUIREMENT

When the user clicks:

**▶ Auto Demo**

the prototype must:

1. Start the Auto Demo.
2. Automatically progress through the existing demo stages.
3. Display the existing narration panel.
4. PLAY A HUMAN-LIKE SPOKEN VOICE for the narration.
5. Keep the spoken narration synchronized with the corresponding screen/stage.
6. Automatically advance to the next stage after the narration for the current stage finishes.
7. Provide Pause / Resume / Restart / Exit controls.
8. Provide a **🔊 Voice ON/OFF** control.
9. Provide a volume control.
10. Never require the user to manually click Play for every narration segment.

The experience should feel like a professional product demo video playing inside the AgentSentry prototype.

---

# VOICE STYLE

Use a professional executive/product-demo voice.

Characteristics:

* Male executive voice
* US English
* Calm
* Confident
* Clear
* Technical but accessible
* Conversational
* Not theatrical
* Not salesy
* Moderate speaking speed
* Short natural pauses
* Suitable for CTO/CISO/engineering leadership audience

The voice should sound like a senior technology executive explaining a product.

Do NOT use a cartoon voice, robotic voice, overly energetic marketing voice, or exaggerated announcer voice.

---

# IMPORTANT IMPLEMENTATION APPROACH

If Figma Make can generate or access browser-supported speech synthesis, use browser speech synthesis for the Auto Demo voice.

Use:

`window.speechSynthesis`

with a suitable English-US voice.

The narration must be generated dynamically from the existing narration script.

Prefer a natural US English voice when available.

Attempt to select an English US voice such as:

`en-US`

If a specific preferred voice is unavailable, automatically fall back to another available English voice.

Do NOT make the application fail if the preferred voice is unavailable.

---

# FALLBACK AUDIO APPROACH

If browser speech synthesis cannot reliably run inside the Figma Make preview/published environment, implement an audio-file architecture instead.

Create the Auto Demo so that each narration stage supports an audio asset:

`/audio/demo-01-intro.mp3`
`/audio/demo-02-register-agent.mp3`
`/audio/demo-03-connect-infrastructure.mp3`
`/audio/demo-04-register-tool.mp3`
`/audio/demo-05-bind-tool.mp3`
`/audio/demo-06-policy.mp3`
`/audio/demo-07-agent-request.mp3`
`/audio/demo-08-governance.mp3`
`/audio/demo-09-reconciliation.mp3`
`/audio/demo-10-approval.mp3`
`/audio/demo-11-execution.mp3`
`/audio/demo-12-ledger.mp3`
`/audio/demo-13-security-guardrails.mp3`
`/audio/demo-14-final-summary.mp3`

Create a reusable:

`DemoNarrationEngine`

with:

* play()
* pause()
* resume()
* stop()
* restart()
* setVolume()
* mute()
* unmute()
* onStart()
* onEnd()
* onError()

The Auto Demo controller should use the narration engine to synchronize screen transitions.

---

# SYNCHRONIZATION MODEL

Do NOT rely only on fixed timers.

Preferred behavior:

`START SCREEN`
↓
`START NARRATION`
↓
`NARRATION PLAYING`
↓
`HIGHLIGHT UI`
↓
`NARRATION ENDS`
↓
`TRANSITION`
↓
`START NEXT NARRATION`

If speech synthesis is being used:

Use the speech synthesis completion event:

`utterance.onend`

to trigger the next stage.

If audio files are being used:

Use:

`audio.onended`

to trigger the next stage.

The demo must not advance while the narration is still speaking unless the stage has explicitly been configured for an intentional overlap.

---

# ADD VOICE CONTROLS

Inside the existing Auto Demo control bar add:

`🔊 Voice ON`

Clicking it changes to:

`🔇 Voice OFF`

Also add:

`Volume ━━━━━●━━`

with approximately:

`0% — 100%`

Default:

`75%`

Add:

`Ⅱ Pause`

When paused:

* pause narration
* pause visual demo progression

When resumed:

* resume narration
* continue visual progression

Add:

`↻ Restart`

Restart must:

* stop current narration
* reset Auto Demo state
* reset policy state
* reset execution state
* reset approval state
* restart narration from the introduction

---

# VOICE INTRODUCTION

Use this exact spoken script:

“AgentSentry is an execution control layer for autonomous AI agents.

AI agents can make autonomous decisions and interact with enterprise systems.

AgentSentry controls what those decisions are actually allowed to execute.”

Display the same text in the narration panel while it is being spoken.

---

# REGISTER AGENT VOICE

Speak:

“First, we register the autonomous agent and establish its execution identity.

AgentSentry knows which tenant, agent, and environment every transaction belongs to.”

Synchronize this with the Register Agent screen.

---

# INFRASTRUCTURE VOICE

Speak:

“Next, we connect AgentSentry to the customer’s existing infrastructure.

AgentSentry does not replace the existing API gateway or MCP server.

Instead, the AgentSentry execution gateway becomes the enforcement point for agent transactions.”

Synchronize with:

`AI Agent → Existing Gateway → AgentSentry → Existing MCP Server → Enterprise Systems`

---

# TOOL REGISTRATION VOICE

Speak:

“AgentSentry registers the tools an agent is allowed to execute and binds the agent to immutable tool versions.

This creates a deterministic execution boundary even when downstream tool schemas change.”

Synchronize with Tool Registry.

---

# POLICY VOICE

Speak:

“Policies determine what the agent can execute automatically, what requires human approval, and what is explicitly denied.

For example, refunds up to five hundred dollars can execute automatically, while larger refunds require approval.

Here, we change that threshold to two hundred fifty dollars and publish policy version forty-three.”

Synchronize with policy editing.

Make sure the voice continues naturally while the UI visibly changes:

`$500 → $250`

and:

`Policy v42 → Policy v43`

---

# AGENT REQUEST VOICE

Speak:

“Now we simulate the agent making a real production transaction.

The agent requests a one-thousand-two-hundred-fifty-dollar refund.”

Synchronize with:

`refund_order:v1`

`amount: $1,250`

---

# TRANSACTION GOVERNANCE VOICE

This is the MOST IMPORTANT narration segment.

Speak:

“This is the key AgentSentry difference.

The decision is made at the transaction level.

AgentSentry knows exactly who is acting, which tenant they belong to, what tool they are calling, which tool version is being used, what arguments are being submitted, which policy evaluated the request, and what decision was made.”

Keep the transaction governance screen visible while this entire narration plays.

Highlight sequentially:

WHO
↓
TENANT
↓
TOOL
↓
VERSION
↓
ARGUMENTS
↓
POLICY
↓
DECISION

---

# STALE POLICY VOICE

Speak:

“The execution gateway detects that its cached policy is older than the control-plane version.

AgentSentry reconciles the configuration before evaluating the transaction against the authoritative policy.”

Synchronize:

`Gateway v42`
→
`Control Plane v43`
→
`Reconcile`
→
`Gateway v43`

---

# APPROVAL VOICE

Speak:

“The transaction exceeds the automated refund threshold, so human approval is required.

This is not a generic permission to refund.

The approval is bound to this exact transaction, execution ID, arguments, tool version, and policy version.

It is single-use and expires automatically.”

Synchronize with the approval screen.

Highlight:

* Execution ID
* Amount
* Tool version
* Policy version
* expiration
* single-use
* cryptographic binding

---

# EXECUTION VOICE

After the user approves, speak:

“The approval is consumed before execution.

AgentSentry then executes the transaction and propagates downstream idempotency where the target system supports it.”

Synchronize:

`APPROVED`
→
`NONCE CONSUMED`
→
`EXECUTING`
→
`SUCCESS`

---

# LEDGER VOICE

Speak:

“Every decision becomes an execution record.

The ledger provides a complete chain from the agent request through policy decision, approval, downstream execution, and final outcome.”

Synchronize with Execution Ledger.

---

# SECURITY GUARDRAILS VOICE

For the rapid security scenarios:

### Duplicate

Speak:

“If the same transaction is submitted again, AgentSentry detects the duplicate rather than blindly executing it twice.”

Show:

`DUPLICATE DETECTED → BLOCKED`

### Deny

Speak:

“Explicit deny rules prevent destructive actions from reaching the downstream system.”

Show:

`delete_customer → DENY → BLOCKED`

### Suspension

Speak:

“Operations teams can immediately suspend an agent.

New execution attempts are blocked at the enforcement layer.”

Show:

`ACTIVE → SUSPENDED → EXECUTION BLOCKED`

---

# FAIL-CLOSED VOICE

Speak:

“When the control plane becomes unavailable, AgentSentry uses its bounded cached configuration during the permitted freshness window.

Once that boundary is exceeded, enforcement fails closed rather than operating indefinitely on stale policy.”

Synchronize with:

`CONNECTED`
→
`STALE WITHIN GRACE`
→
`FAIL CLOSED`

---

# FINAL EXECUTIVE VOICE

Speak:

“AgentSentry separates what an agent wants to do from what the enterprise allows it to execute.

The control plane defines the rules.

The execution plane enforces them at transaction time.

Existing infrastructure remains in place, while meaningful agent actions become governed, observable, and auditable.”

Pause.

Then speak the final product statement slowly:

“AI agents decide what they want to do.

AgentSentry controls what they are actually allowed to execute.”

Hold the final screen for approximately 5 seconds after the voice finishes.

---

# AUDIO FAILURE HANDLING

This is critical.

If voice playback is unavailable because of browser autoplay restrictions:

Show a non-blocking banner:

**🔊 Voice requires interaction**

`Click anywhere or press ▶ to enable audio`

Then automatically resume the Auto Demo.

Do NOT break the demo.

If speech synthesis fails:

* continue the visual demo
* keep narration text visible
* show Voice OFF
* allow the user to retry Voice ON

If an individual narration segment fails:

* continue to the next segment
* do not freeze the demo

---

# FIRST-INTERACTION AUDIO UNLOCK

Because browsers may block automatic audio playback until the user interacts with the page, clicking:

**▶ Auto Demo**

should count as the user interaction that initializes/unlocks audio.

Initialize the audio/speech engine immediately when Auto Demo starts.

Do not wait until the second screen.

---

# DEMO MODE SETTINGS

Add a small settings menu:

**Demo Settings**

Voice:
`ON`

Voice:
`Executive US English`

Speed:
`0.95x`

Volume:
`75%`

Captions:
`ON`

Auto Advance:
`ON`

Allow the user to change:

`Voice ON/OFF`
`Speed`
`Volume`
`Captions`

Default:

Voice ON
Speed 0.95x
Volume 75%
Captions ON
Auto Advance ON

---

# CLOSED CAPTIONS

The existing narration panel becomes the closed-caption surface.

During speech:

highlight the sentence currently being spoken.

Do not display the entire script at once.

Use progressive text:

`sentence 1`
→
`sentence 2`
→
`sentence 3`

This makes the demo accessible and makes the recording easier to follow.

---

# FINAL QUALITY REQUIREMENT

The result should feel like:

**an executive product demo with a professional voice-over**

—not like a prototype that happens to read text aloud.

The visual transitions, narration, highlighting, captions, and voice controls must feel synchronized.

The presenter should be able to click:

**▶ Auto Demo**

and then sit back while the complete AgentSentry story runs automatically with spoken narration from beginning to end.

Preserve all existing manual functionality.

Do not create a separate application.

Do not remove the existing Auto Demo.

Upgrade the existing Auto Demo into:

**Auto Demo + Voice Narration + Captions + Presenter Controls**

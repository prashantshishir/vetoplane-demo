Update the EXISTING AgentSentry Figma Make prototype. Do NOT create a new app, do NOT redesign the existing product, and do NOT remove or simplify any existing functionality.

The current prototype already demonstrates the AgentSentry end-to-end product flow. Add a polished **“▶ Auto Demo”** mode that automatically runs the complete golden-path demo while displaying synchronized guided narration.

The objective is to make the prototype usable in two ways:

1. Interactive mode — user clicks through the product normally.
2. Auto Demo Mode — presenter clicks one button and the prototype automatically demonstrates the complete AgentSentry story from agent registration through transaction-level governance, approval, execution, and audit.

## 1. AUTO DEMO BUTTON

Add a highly visible button in the top navigation/header:

**▶ Auto Demo**

Secondary small label:
**4 min guided walkthrough**

Use the existing AgentSentry visual language and styling.

When clicked:

* enter Auto Demo Mode
* show a subtle “AUTO DEMO” indicator
* reset the demo to a deterministic starting state
* automatically progress through the golden-path screens
* highlight the relevant UI element at each stage
* display the narration panel
* show progress: `01 / 12`, `02 / 12`, etc.
* provide:

  * Pause
  * Resume
  * Restart
  * Exit Demo
  * Previous
  * Next
* allow the presenter to manually advance if desired

Do NOT make the demo dependent on real backend calls.

All data should be deterministic mock/demo data.

## 2. AUTO DEMO GOLDEN PATH

The exact narrative should be:

REGISTER AGENT
→ CONNECT EXISTING INFRASTRUCTURE
→ REGISTER TOOL
→ BIND TOOL VERSION
→ EDIT/PUBLISH POLICY
→ TEST AGENT
→ AGENT REQUEST
→ TRANSACTION EVALUATION
→ STALE POLICY DETECTED + RECONCILED
→ HUMAN APPROVAL
→ EXECUTION
→ EXECUTION LEDGER

The demo should communicate this central product message:

**“AI agents can make autonomous decisions. AgentSentry controls what those decisions are actually allowed to execute.”**

## 3. DEMO INTRO — 10 seconds

Show an executive-level intro overlay.

Title:

**AgentSentry — Agent Execution Control**

Subtitle:

**Control what autonomous AI agents are actually allowed to execute.**

Show architecture underneath:

`AI Agent → Existing Gateway → AgentSentry → MCP Server → Enterprise System`

Narration:

“AI agents are increasingly capable of taking real actions across enterprise systems. AgentSentry provides the execution control layer between autonomous agents and the systems they can affect. It works with existing gateways and MCP infrastructure rather than replacing them.”

Pause approximately 8–10 seconds.

Then automatically continue.

---

## 4. STEP 01 — REGISTER AGENT

Navigate to:

**Agents → Register Agent**

Show:

Agent Name:
`Customer Support Agent`

Agent ID:
`agent-support-prod-01`

Environment:
`Production`

Status:
`Active`

Owner:
`Customer Operations`

Capabilities:
`Customer Support / Order Management`

Show the registration action completing.

Highlight:

* agent identity
* tenant
* environment
* status

Narration:

“First, we register the autonomous agent and establish its execution identity. AgentSentry knows which tenant, agent, and environment every transaction belongs to.”

Duration: approximately 15 seconds.

---

## 5. STEP 02 — CONNECT EXISTING INFRASTRUCTURE

Navigate to the deployment/integration screen.

Show the architecture:

`AI Agent`
↓
`Existing API Gateway`
↓
`AgentSentry Execution Gateway`
↓
`Existing MCP Server`
↓
`Enterprise Systems`

Clearly label:

**Integration — Not Replacement**

Show:

Deployment Model:
`Customer-hosted AgentSentry Gateway`

Integration:
`Existing Gateway + AgentSentry`

MCP:
`Existing MCP Server`

Control Plane:
`AgentSentry Cloud`

Narration:

“AgentSentry does not require the customer to replace their API gateway or MCP server. The execution gateway is deployed inside the customer environment and becomes the enforcement point for agent transactions.”

Highlight AgentSentry's position in the architecture.

Duration: approximately 20 seconds.

---

## 6. STEP 03 — REGISTER TOOL

Navigate to:

**Tools → Tool Registry**

Show:

`refund_order`

Version:
`v1`

Status:
`Published`

Schema:
`Immutable`

Also show:

`get_customer:v1`
`search_orders:v1`
`update_ticket:v1`
`delete_customer:v1`

Highlight:

**Immutable Tool Version**

Narration:

“AgentSentry registers the tools an agent is allowed to execute and binds the agent to an immutable tool version. This prevents policy decisions from silently changing because a downstream tool schema changed.”

Duration: approximately 15 seconds.

---

## 7. STEP 04 — BIND AGENT TO TOOL VERSION

Show:

Agent:
`Customer Support Agent`

Allowed tools:

✓ get_customer:v1
✓ search_orders:v1
✓ update_ticket:v1
✓ refund_order:v1
✕ delete_customer:v1

Highlight the exact tool-version binding.

Narration:

“The agent is explicitly bound to the tool versions it can execute. This creates a deterministic execution boundary rather than relying on broad API permissions.”

Duration: approximately 12 seconds.

---

## 8. STEP 05 — EDIT AND PUBLISH POLICY

Navigate to:

**Policies → Execution Policy**

Show an interactive policy editor.

Policy:

`Customer Support Production Policy`

Version:
`v42`

Rules:

ALLOW
`get_customer`

ALLOW
`search_orders`

ALLOW
`update_ticket`

ALLOW
`refund_order where amount <= $500`

REQUIRE APPROVAL
`refund_order where amount > $500`

DENY
`delete_customer`

RATE LIMIT
`refund_order: 10 requests / minute`

Make the policy editor visibly editable.

During Auto Demo, actually change:

`refund_order approval threshold: $500 → $250`

Show a small inline editor.

Then click:

**Publish Policy**

Create:

`Policy v43`

Show:

`Draft → Validated → Published`

Narration:

“Policies are deterministic and editable. For example, refunds up to five hundred dollars can execute automatically, while larger refunds require approval. Here we change that threshold to two hundred fifty dollars and publish policy version forty-three.”

Duration: approximately 25 seconds.

---

## 9. STEP 06 — TEST AGENT

Navigate to:

**Agent Simulator**

Show:

Agent:
`Customer Support Agent`

Tool:
`refund_order:v1`

Arguments:

```text
order_id: ORD-10492
amount: $1,250
currency: USD
reason: Customer service adjustment
```

Button:

**Send Agent Request**

Do not immediately execute.

Instead transition into Live Execution.

Narration:

“Now we simulate the agent making a real production transaction: a one-thousand-two-hundred-fifty-dollar refund.”

Duration: approximately 12 seconds.

---

## 10. STEP 07 — LIVE EXECUTION PIPELINE

Show a visually strong execution timeline.

The pipeline must animate through these exact stages:

1. REQUEST RECEIVED
2. IDENTITY RESOLVED
3. TENANT RESOLVED
4. TOOL VERSION RESOLVED
5. ARGUMENTS VALIDATED
6. EXECUTION ID CREATED
7. POLICY EVALUATED
8. DECISION
9. APPROVAL REQUIRED
10. DOWNSTREAM EXECUTION
11. EXECUTION LEDGER

Display:

Execution ID:
`exec_01JAS_8F42K`

Tenant:
`acme-commerce`

Agent:
`agent-support-prod-01`

Tool:
`refund_order:v1`

Amount:
`$1,250`

---

## 11. STEP 08 — SHOW TRANSACTION-LEVEL GOVERNANCE

Before approval, pause and show a detailed transaction governance card.

Title:

**Agent Transaction — Governance Decision**

Show:

WHO
`Customer Support Agent`

TENANT
`Acme Commerce`

WHAT
`refund_order`

TOOL VERSION
`v1`

ARGUMENTS
`order_id=ORD-10492`
`amount=$1,250`

EXECUTION ID
`exec_01JAS_8F42K`

POLICY
`Customer Support Production Policy`

POLICY VERSION
`v43`

DECISION
`REQUIRE HUMAN APPROVAL`

Make this visually prominent.

Narration:

“This is the key AgentSentry difference. The decision is made at the transaction level. We know exactly who is acting, what tool is being called, which version is being used, what arguments are being submitted, which policy evaluated the request, and what decision was made.”

Duration: approximately 20 seconds.

---

## 12. STEP 09 — STALE POLICY + RECONCILIATION

Show a temporary state:

Gateway Policy:
`v42`

Control Plane:
`v43`

Status:

**STALE — RECONCILIATION REQUIRED**

Then animate:

`Detect → Compare → Reconcile → Validate → Activate v43`

After reconciliation:

Gateway Policy:
`v43`

Status:
**FRESH**

Then re-evaluate the transaction.

Narration:

“The execution gateway detects that its cached policy is older than the control-plane version. AgentSentry does not silently continue with stale authorization. It reconciles the configuration and evaluates the transaction against the authoritative policy.”

Important:
Do not make this look like an error or failure. It is a security control.

Duration: approximately 20 seconds.

---

## 13. STEP 10 — EXACT TRANSACTION-BOUND APPROVAL

Open the approval screen.

Title:

**Human Approval Required**

Display:

Action:
`refund_order`

Amount:
`$1,250 USD`

Order:
`ORD-10492`

Agent:
`Customer Support Agent`

Tenant:
`Acme Commerce`

Tool:
`refund_order:v1`

Policy:
`Customer Support Production Policy v43`

Execution:
`exec_01JAS_8F42K`

Reason:
`Amount exceeds automated refund threshold`

Approval status:
`PENDING`

Expiration:
`Expires in 08:42`

Security indicators:

✓ Bound to exact execution
✓ Single-use approval
✓ Cryptographic nonce
✓ Policy version bound
✓ Argument hash bound

Buttons:

**Approve Exact Transaction**

**Deny**

Narration:

“Approval is not a generic permission to refund. It is bound to this exact transaction, execution ID, arguments, tool version, and policy version. The approval is single-use and expires automatically.”

Duration: approximately 20 seconds.

---

## 14. STEP 11 — APPROVAL → EXECUTION

Click:

**Approve Exact Transaction**

Animate:

`PENDING`
→
`APPROVED`
→
`NONCE CONSUMED`
→
`EXECUTING`
→
`DOWNSTREAM REQUEST`
→
`SUCCESS`

Show:

`Idempotency-Key: idem_exec_01JAS_8F42K`

Then:

**Refund Successfully Executed**

Do not claim universal exactly-once semantics.

Show a small note:

`Downstream idempotency enforced where supported`

Narration:

“Once approved, the single-use approval is consumed before execution. AgentSentry then executes the transaction and propagates downstream idempotency where the target system supports it.”

Duration: approximately 18 seconds.

---

## 15. STEP 12 — EXECUTION LEDGER

Navigate automatically to:

**Executions / Ledger**

Show chronological events:

19:42:01
REQUEST_RECEIVED

19:42:01
IDENTITY_RESOLVED

19:42:01
POLICY_EVALUATED

19:42:02
APPROVAL_REQUIRED

19:43:11
APPROVAL_GRANTED

19:43:11
APPROVAL_NONCE_CONSUMED

19:43:12
DOWNSTREAM_EXECUTION

19:43:13
EXECUTION_SUCCEEDED

Show a transaction summary:

Outcome:
`SUCCESS`

Policy:
`v43`

Approval:
`Consumed`

Execution ID:
`exec_01JAS_8F42K`

Narration:

“Every decision becomes an execution record. The ledger provides a complete chain from agent request through policy decision, approval, downstream execution, and final outcome.”

Duration: approximately 15 seconds.

---

# 16. BONUS DEMOS — OPTIONAL AUTO DEMO CHAPTERS

After the golden path, show a short “Security Guardrails” chapter with three rapid scenarios.

### A. DUPLICATE REQUEST

Replay the same execution.

Show:

`DUPLICATE EXECUTION DETECTED`

Action:

`BLOCKED`

Narration:

“If the same transaction is submitted again, AgentSentry detects the duplicate rather than blindly executing it twice.”

---

### B. DENIED ACTION

Try:

`delete_customer`

Show:

Policy:

`DENY`

Result:

**BLOCKED BEFORE DOWNSTREAM EXECUTION**

Narration:

“Explicit deny rules prevent destructive actions from reaching the downstream system.”

---

### C. EMERGENCY SUSPENSION

Show:

Agent:

`Customer Support Agent`

Status:

`ACTIVE`

Click:

**Suspend Agent**

Change to:

`SUSPENDED`

Then simulate another request.

Show:

**EXECUTION BLOCKED**

Narration:

“Operations teams can immediately suspend an agent. New execution attempts are blocked at the enforcement layer.”

---

# 17. CONTROL PLANE DISCONNECT / FAIL-CLOSED DEMO

Add a final security state.

Simulate:

`Control Plane Connection: DISCONNECTED`

Show:

Gateway configuration state:

`STALE_WITHIN_GRACE`

Then advance time/state:

`FAIL_CLOSED`

Show:

**NEW HIGH-RISK EXECUTIONS BLOCKED**

Narration:

“When the control plane becomes unavailable, the gateway uses its bounded cached configuration during the permitted freshness window. Once that boundary is exceeded, enforcement fails closed rather than operating indefinitely on stale policy.”

Do not imply that every low-risk operation necessarily stops immediately; focus the visualization on high-risk execution governance.

---

# 18. FINAL EXECUTIVE SUMMARY SCREEN

At the end of Auto Demo Mode, show a clean executive summary.

Title:

**AgentSentry — Execution Control for Autonomous AI**

Three columns:

### CONTROL PLANE

* Agents
* Tools
* Policies
* Approvals
* Fleet Management
* Audit
* Analytics

### EXECUTION PLANE

* Identity
* Policy Enforcement
* Argument Validation
* Rate Limits
* Approval Gates
* Idempotency
* Execution Controls

### RESULT

* Deterministic Decisions
* Transaction-Level Governance
* Human Approval
* Execution Ledger
* Fail-Closed Enforcement

Architecture:

`AI Agent → Existing Gateway → AgentSentry → Existing MCP → Enterprise Systems`

Final statement:

**“AI agents decide what they want to do. AgentSentry controls what they are actually allowed to execute.”**

Narration:

“AgentSentry separates what an agent wants to do from what the enterprise allows it to execute. The control plane defines the rules. The execution plane enforces them at transaction time. Existing infrastructure remains in place, while every meaningful agent action becomes governed, observable, and auditable.”

---

# 19. NARRATION PANEL UX

During Auto Demo Mode, add a polished narration panel along the bottom or right side.

Header:

**AGENTSENTRY AUTO DEMO**

Show:

`● LIVE WALKTHROUGH`

Current chapter:
`Transaction-Level Governance`

Narration text should appear as readable paragraphs.

Also show:

`Step 08 of 12`

Progress bar.

Controls:

`◀ Previous`
`Ⅱ Pause`
`Next ▶`
`↻ Restart`
`× Exit Demo`

The narration must remain synchronized with the screen state.

Do NOT use browser text-to-speech or require external APIs.

This is a visual guided narration script that can later be read by a human while recording the screen.

---

# 20. DEMO TIMING

Target total runtime:

**3.5–5 minutes**

Suggested pacing:

00:00 — Introduction
00:10 — Register Agent
00:25 — Connect Existing Infrastructure
00:45 — Register Tool
01:00 — Bind Tool Version
01:15 — Edit / Publish Policy
01:40 — Test Agent
01:55 — Execution Pipeline
02:15 — Transaction Governance
02:35 — Stale Policy / Reconciliation
02:55 — Exact Approval
03:20 — Execute
03:40 — Execution Ledger
03:55 — Duplicate Protection
04:10 — Deny / Suspend
04:30 — Fail Closed
04:45 — Executive Summary

Allow the presenter to pause at any point.

---

# 21. AUTO DEMO DESIGN RULES

IMPORTANT:

* Preserve the existing UI design.
* Preserve all existing navigation and manual interactions.
* Auto Demo is an additional mode, not a replacement for normal interaction.
* Do not hide important product screens.
* Do not simplify away the policy editor.
* Do not remove the agent registration flow.
* Do not remove the MCP/existing gateway architecture.
* Do not remove execution details.
* Do not replace transaction-level governance with generic “AI security” messaging.
* Do not claim AgentSentry replaces API gateways.
* Do not claim universal exactly-once execution.
* Do not introduce LLM-based policy authorization.
* Do not imply approval is a generic authorization token.
* Keep the demo deterministic and repeatable.

## 22. PRESENTER MODE

Add a small toggle:

**Presenter Mode**

When enabled:

* narration panel visible
* chapter title visible
* progress visible
* automatic transitions enabled

When disabled:

* normal product interface
* no narration overlay
* all existing manual interactions remain unchanged

## 23. AUTO DEMO RESET

When Auto Demo starts, reset all demo state to the canonical initial state:

Agent:
`ACTIVE`

Policy:
`v42` initially

Control Plane:
`v43` becomes available during the stale-policy scenario

Approval:
`PENDING`

Execution:
`NOT_STARTED`

Gateway:
`CONNECTED`

Tool:
`refund_order:v1`

This ensures the demo always tells the same story.

## 24. FINAL IMPLEMENTATION REQUIREMENT

Implement this as a polished functional experience inside the EXISTING Figma Make prototype.

Do not merely create static screens.

The Auto Demo button must actually:

* reset state
* move through the screens
* animate state changes
* update policy
* simulate the agent request
* show stale configuration
* reconcile policy
* display the exact transaction
* open approval
* approve
* consume the approval nonce
* execute
* create ledger events
* demonstrate duplicate protection
* demonstrate denial
* demonstrate suspension
* demonstrate fail-closed behavior
* finish at the executive summary

Make every transition feel like a real enterprise security product demo.

The final experience should be credible enough to screen-record and circulate to CTOs, CISOs, engineering executives, potential design partners, and investors for feedback.

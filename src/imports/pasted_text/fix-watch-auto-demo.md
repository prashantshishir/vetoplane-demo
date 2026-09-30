# FIX: "WATCH AUTO DEMO" MUST LAUNCH THE AUTO-RUN DEMO

Modify the **existing AgentSentry website**.

Do NOT rebuild the site.

Do NOT redesign the Demo section.

Do NOT replace the existing interactive demo.

The problem is specifically:

> The **WATCH AUTO DEMO** button currently navigates to the interactive demo instead of launching the Auto Demo / automatic narrated run.

Fix this behavior.

---

## 1. REQUIRED BEHAVIOR

When a visitor clicks:

**WATCH AUTO DEMO**

the button MUST:

### NOT:

* navigate to `/demo`
* open the interactive demo manually
* require the visitor to click another "Start" button
* simply scroll to the demo section

### MUST:

Immediately launch the **Auto Demo experience**.

The intended flow is:

**WATCH AUTO DEMO**
↓
**Auto Demo opens**
↓
**Audio readiness check**
↓
**Voice + background music start**
↓
**Automatic demo progression begins**
↓
**REGISTER AGENT**
↓
**CONNECT INFRASTRUCTURE**
↓
**REGISTER TOOLS**
↓
**EDIT / PUBLISH POLICY**
↓
**AGENT REQUEST**
↓
**TRANSACTION-LEVEL GOVERNANCE**
↓
**REQUIRE APPROVAL**
↓
**HUMAN APPROVAL**
↓
**EXECUTION**
↓
**EXECUTION LEDGER**
↓
**SECURITY GUARDRAILS**
↓
**FINAL AGENTSENTRY MESSAGE**

---

# 2. REUSE THE EXISTING AUTO DEMO ENGINE

Do NOT create a second Auto Demo implementation.

Inspect the existing code and identify the current Auto Demo runner/controller.

If there is already something similar to:

* `startAutoDemo()`
* `runAutoDemo()`
* `startDemo()`
* `DemoNarrationEngine`
* `AutoDemo`
* `autoDemoState`
* `startNarratedDemo()`

reuse the existing implementation.

The website must have **one authoritative Auto Demo engine**.

Do not duplicate the logic.

---

# 3. BUTTON ACTION

Find the existing:

**WATCH AUTO DEMO**

CTA.

Replace its current navigation behavior with the Auto Demo launch handler.

Conceptually:

`onClick → launchAutoDemo()`

NOT:

`onClick → navigate("/demo")`

NOT:

`onClick → scrollToDemo()`

The exact implementation should use the existing project's routing/state architecture.

---

# 4. AUTO DEMO LAUNCH EXPERIENCE

When the user clicks the button:

### Step 1

Open the Auto Demo experience.

Display:

**AGENTSENTRY AUTO DEMO**

Subtext:

**See how AgentSentry governs an autonomous transaction from intent to execution.**

---

### Step 2

If browser audio can autoplay:

Start:

* narration
* background music

immediately.

If browser autoplay restrictions prevent audio:

show:

**READY FOR THE AGENTSENTRY DEMO**

> Turn on audio for the full narrated experience.

Button:

**START DEMO WITH AUDIO**

After the visitor clicks it:

* start narration
* start background music
* immediately begin the Auto Demo

Do NOT require a second unrelated "Auto Demo" action.

---

# 5. DO NOT SEND USER TO INTERACTIVE DEMO

This distinction is critical.

There are two experiences:

### Interactive Demo

User controls the experience.

### Auto Demo

The product automatically walks the visitor through the complete story.

The **WATCH AUTO DEMO** CTA must always launch the second experience.

The existing:

**EXPLORE INTERACTIVE DEMO**

or equivalent CTA can continue opening the interactive demo.

---

# 6. PRESERVE THE AUTO DEMO STORY

The Auto Demo must continue to show the complete AgentSentry product story:

### 01 — REGISTER AGENT

Show:

* Customer Support Agent
* production identity
* tenant
* lifecycle status

Narration:

> "We start by registering the production agent. AgentSentry establishes the execution identity and tenant context before the agent can perform a governed action."

---

### 02 — CONNECT INFRASTRUCTURE

Show:

**AI Agent → Existing Gateway → AgentSentry → Existing MCP Server → Enterprise System**

Narration:

> "AgentSentry sits alongside the infrastructure the enterprise already operates. It does not require replacing the existing API gateway or MCP server."

---

### 03 — REGISTER TOOLS

Show:

* tool registry
* tool versions
* immutable version
* agent binding

---

### 04 — EDIT POLICY

Show:

`refund_order <= $500 → ALLOW`

`refund_order > $500 → REQUIRE APPROVAL`

`delete_customer → DENY`

Demonstrate editing/publishing the policy.

---

### 05 — AGENT REQUEST

Show:

`refund_order = $1,250`

---

### 06 — TRANSACTION GOVERNANCE

Show:

* WHO
* TENANT
* TOOL
* TOOL VERSION
* ARGUMENTS
* POLICY VERSION
* EXECUTION ID
* DECISION

Narration:

> "The agent has permission to use the refund tool. But permission to call a tool does not mean permission to execute every transaction."

Then:

> "AgentSentry evaluates the actual transaction."

---

### 07 — APPROVAL

Show:

**REQUIRE HUMAN APPROVAL**

Display:

* exact transaction
* execution ID
* policy version
* expiration
* single-use approval
* transaction binding

---

### 08 — EXECUTION

Show:

**APPROVED → NONCE CONSUMED → EXECUTING → SUCCESS**

---

### 09 — EXECUTION LEDGER

Show:

* agent
* tenant
* tool
* version
* transaction
* policy
* decision
* approval
* result

---

### 10 — SECURITY GUARDRAILS

Briefly demonstrate:

* duplicate request protection
* ambiguous downstream outcome handling
* emergency agent suspension
* policy freshness
* fail closed
* tenant isolation
* rate limiting

---

### 11 — FINAL STATEMENT

End with:

> "AI agents can make autonomous decisions."

Pause.

> "AgentSentry controls what those decisions are actually allowed to execute."

---

# 7. VOICE MUST START WITH AUTO DEMO

The Auto Demo launch must use the existing narration engine.

Do NOT open the Auto Demo silently and wait for another manual action.

If audio is available and browser policy permits:

`button click → voice + music → Auto Demo`

If browser policy blocks autoplay:

`button click → audio readiness overlay → START DEMO WITH AUDIO → voice + music + Auto Demo`

---

# 8. BACKGROUND MUSIC

Preserve the existing background music implementation.

When Auto Demo starts:

* music starts
* narration starts
* music ducks while narration speaks
* music remains continuous across the demo
* music fades out at the end

Do not play background music on the normal website outside Auto Demo.

---

# 9. AUTO DEMO CONTROLS

Inside the Auto Demo retain:

* Pause
* Resume
* Restart
* Voice ON/OFF
* Music ON/OFF
* Volume
* Captions

Restart must restart the entire Auto Demo from Stage 1.

It must not leave the demo halfway through.

---

# 10. ANALYTICS EVENT

Because we are implementing real visitor analytics, clicking:

**WATCH AUTO DEMO**

must generate:

`auto_demo_start`

Only fire the event when the Auto Demo actually begins.

Do NOT fire it simply because the button exists or the Demo section becomes visible.

When the visitor reaches the final Auto Demo stage:

`auto_demo_complete`

---

# 11. HANDLE MULTIPLE CLICKS

Prevent duplicate Auto Demo instances.

If Auto Demo is already running and the visitor clicks:

**WATCH AUTO DEMO**

again:

* do not start a second narration
* do not start a second music track
* do not create another timer
* do not create duplicate analytics events

Instead, bring the existing Auto Demo into focus/open state.

---

# 12. MOBILE

The same button must work on mobile.

Ensure:

* tap launches Auto Demo
* audio readiness works
* Auto Demo is responsive
* controls remain usable
* no overlapping narration
* no duplicate playback

---

# 13. DO NOT BREAK THE INTERACTIVE DEMO

The existing interactive demo must remain fully functional.

The two CTAs must have clearly different behavior:

### WATCH AUTO DEMO

**Automatically runs the complete narrated demonstration.**

### EXPLORE INTERACTIVE DEMO

**Lets the visitor control/explore the product themselves.**

Do not merge these experiences.

---

# 14. TEST THE ACTUAL BUTTON

After implementing the change, test exactly this sequence:

1. Open the AgentSentry homepage.
2. Locate **WATCH AUTO DEMO**.
3. Click it.
4. Confirm it does NOT navigate to the interactive demo.
5. Confirm Auto Demo opens.
6. Confirm narration begins or the audio-start overlay appears.
7. Confirm background music begins.
8. Confirm Stage 1 begins automatically.
9. Confirm stages progress automatically.
10. Confirm approval stage is reached.
11. Confirm execution stage is reached.
12. Confirm final statement is reached.
13. Confirm `auto_demo_start` is recorded.
14. Confirm `auto_demo_complete` fires only after completion.
15. Refresh the site.
16. Repeat the test.

---

# 15. IMPORTANT — PUBLIC VERSION

After fixing the local implementation, publish an **Update** to the existing AgentSentry published site.

Do NOT create another site.

Do NOT create another URL.

Figma's publishing model requires an explicit update for changes to appear on the already-published version.

After publishing:

### Test the PUBLIC URL, not only the local preview.

Verify:

**WATCH AUTO DEMO → AUTO RUN**

on the actual public website.

Hard-refresh the public page before testing.

---

# FINAL ACCEPTANCE CRITERION

The following must work:

**Visitor lands on AgentSentry**

↓

**Clicks WATCH AUTO DEMO**

↓

**Auto Demo launches**

↓

**Voice starts**

↓

**Music starts**

↓

**Demo automatically progresses**

↓

**Agent registration**

↓

**Existing infrastructure integration**

↓

**Tool registration**

↓

**Policy editing**

↓

**Agent transaction**

↓

**Transaction-level policy evaluation**

↓

**Human approval**

↓

**Execution**

↓

**Execution ledger**

↓

**Security guardrails**

↓

**Final AgentSentry message**

There must be **ZERO additional navigation or manual "start Auto Demo" step after clicking WATCH AUTO DEMO**, except for the browser-required audio permission/start interaction when autoplay is blocked.

This is the exact behavior I want on the **published AgentSentry website**.

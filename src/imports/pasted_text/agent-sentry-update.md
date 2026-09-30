## CRITICAL: PUBLISH THE CURRENT FIXES + UPGRADE THE AUTO DEMO VOICE

Work on the **existing AgentSentry website and Auto Demo**.

Do NOT rebuild the website.
Do NOT create a new project.
Do NOT remove existing functionality.

The local Figma Make preview already contains fixes that I can see locally, but those fixes are **not appearing on the published public site**.

Your job is to:

1. Verify the current local implementation.
2. Preserve all existing fixes and functionality.
3. Resolve any production/published-version issue preventing the latest implementation from appearing publicly.
4. Prepare the project for a proper production update.
5. Upgrade the Auto Demo voice so it sounds **energetic, enthusiastic, confident and engaging**, while remaining executive and credible.
6. Verify the published version after the update.

---

# PART 1 — VERIFY THE CURRENT IMPLEMENTATION BEFORE PUBLISHING

First inspect the CURRENT project carefully.

Confirm that the following local fixes are actually present in the current code:

### Branding

* Correct AgentSentry logo is being used.
* Logo is visible in:

  * header
  * hero
  * footer
  * Auto Demo
  * favicon/site branding where applicable
* Logo is not distorted, stretched, cropped or replaced with a generated substitute.
* Preserve the attached/approved AgentSentry logo asset.

### Founder

Confirm the Founder section is populated.

It must show:

**PRASHANT SHISHIR**
**Founder & CEO, AgentSentry**

Use the attached founder profile as the authoritative source.

Do NOT invent biography, credentials, companies, achievements, education, awards or other claims not supported by the supplied profile.

If a real founder photograph is supplied, use that photograph rather than generating a substitute.

### Website

Confirm the current website still contains:

* Product
* How It Works
* Use Cases
* Architecture
* Demo
* Founder / About
* Investor / Design Partner narrative
* Existing interactive AgentSentry demo
* Auto Demo
* Chatbot / Talk to Founder experience

Do not remove existing sections simply to solve this issue.

---

# PART 2 — PUBLIC/PUBLISHED VERSION MUST MATCH CURRENT LOCAL VERSION

This is a critical production issue.

The published public site must contain the **latest local implementation**.

Do not assume that because the local preview is correct, the public site is correct.

Before considering the task complete:

### Production synchronization checklist

1. Inspect the current published configuration.
2. Confirm the project is still connected to the existing published AgentSentry site.
3. Confirm there is no accidental duplicate project/site.
4. Confirm the current public URL remains the existing AgentSentry URL.
5. Confirm all latest code/assets/content are included in the version being published.
6. Check for build/publish errors.
7. Check for missing assets.
8. Check for missing fonts.
9. Check that audio assets are actually included in the published build.
10. Check that the logo asset is included in the published build.
11. Check that the founder image/profile assets are included in the published build.
12. Check that the Auto Demo JavaScript is included in the published build.
13. Check that the latest version is ready to be published.

### IMPORTANT

Do NOT simply tell me:

> "The changes are ready to publish."

The goal is to ensure the **published production version** is updated.

Use the Figma Make publishing flow and publish the latest version as an **Update** to the existing published site.

After publishing:

* verify status is Published
* verify the Last Published timestamp has changed
* open the public URL
* perform a hard refresh
* verify the production site contains the latest logo
* verify the Founder section
* verify the latest Auto Demo
* verify the voice controls
* verify the chatbot
* verify the existing AgentSentry demo

If a browser cache appears to be showing an older version, force a fresh reload during verification.

Do NOT change the public URL merely to work around caching.

Do NOT create a second public site.

---

# PART 3 — DO NOT BREAK THE EXISTING WEBSITE

The following are NON-NEGOTIABLE:

* Keep existing navigation.
* Keep existing pages/routes.
* Keep existing AgentSentry demo.
* Keep existing Auto Demo.
* Keep existing architecture diagrams.
* Keep existing product messaging.
* Keep existing founder section.
* Keep existing chatbot.
* Keep existing responsive behavior.
* Keep existing dark enterprise infrastructure visual language.

This is a **production correction/update**, not a redesign.

---

# PART 4 — REPLACE THE TIRED-SOUNDING AUTO DEMO VOICE

The current voice sounds **tiring, flat and overly slow**.

Replace that experience.

The new voice should sound:

### VOICE PERSONALITY

* American English
* Native-sounding US English
* Male
* Mature executive
* Confident
* Energetic
* Enthusiastic
* Engaging
* Warm
* Intelligent
* Conversational
* Clear
* Credible
* Persuasive without sounding like an advertisement

Think:

**Senior technology executive presenting an important new infrastructure category to CEOs, CTOs, CISOs and investors.**

NOT:

* robotic
* monotone
* sleepy
* slow audiobook narrator
* meditation voice
* overly dramatic movie trailer
* radio announcer
* sales telemarketer
* exaggerated AI voice
* British
* Australian
* Indian
* generic international English

The voice should communicate:

> "This is important, this is happening now, and you should pay attention."

---

# PART 5 — VOICE DELIVERY STYLE

Increase energy primarily through **delivery**, not by making the voice unnaturally high-pitched.

Desired characteristics:

### Pace

Moderately fast and confident.

Target approximately:

**0.98–1.05 speech rate**

Do NOT use the previous slow/tiring rate.

### Pitch

Natural adult male American pitch.

Do not make it artificially deep.

### Pauses

Use short intentional pauses between ideas.

Avoid long silent gaps.

For example:

"AI agents are no longer just generating answers.

They're taking actions.

Calling APIs.

Changing data.

Triggering workflows.

And operating inside enterprise systems."

Each sentence should feel deliberate and energetic.

### Emphasis

Naturally emphasize key concepts such as:

* autonomous AI agents
* execution
* identity
* policy
* transaction
* approval
* enforcement
* audit
* enterprise
* control
* AgentSentry

Do NOT shout or over-emphasize every sentence.

---

# PART 6 — AMERICAN ENGLISH VOICE SELECTION

Use browser speech synthesis if it provides a suitable voice.

Inspect:

`window.speechSynthesis.getVoices()`

Prefer voices whose locale is:

`en-US`

Prefer a natural-sounding male American voice.

Do NOT select:

* en-GB
* en-AU
* en-IN
* en-ZA
* generic en if a suitable en-US voice exists

If multiple `en-US` voices exist, select the most natural/high-quality male voice available.

Create deterministic voice selection logic rather than relying on the browser's first voice.

Example preference hierarchy:

1. Natural/high-quality `en-US` male voice
2. Other `en-US` male voice
3. Natural `en-US` voice
4. If no suitable American English voice exists, use the attached approved narration audio asset if one exists.

Do NOT silently substitute a non-American accent.

If browser speech synthesis cannot provide a sufficiently good American male voice, the system should gracefully fall back to the approved audio asset rather than knowingly using the wrong accent.

---

# PART 7 — NARRATION ENGINE

Preserve the existing `DemoNarrationEngine` architecture if already implemented.

It should support:

* play
* pause
* resume
* stop
* restart
* mute
* unmute
* volume
* voice selection
* progress state
* current stage
* onStart
* onEnd
* onError

Narration must remain synchronized with the Auto Demo.

Do NOT simply start all narration at once.

Each visual stage should advance according to narration completion.

---

# PART 8 — MAKE THE AUTO DEMO FEEL LIKE A LIVE EXECUTIVE DEMONSTRATION

The demo should feel like someone is **showing the product**, not reading a script.

The narration should build momentum:

### Opening

Energetic but controlled.

> "AI agents are moving beyond generating answers. They're beginning to take real actions across enterprise systems."

Short pause.

> "And that creates a new security problem."

Short pause.

> "Who controls what an autonomous agent is actually allowed to execute?"

Then transition immediately into AgentSentry.

---

# PART 9 — UPDATED DEMO DELIVERY

Maintain the existing complete end-to-end story:

**REGISTER → CONNECT → CONFIGURE → GOVERN → EXECUTE → INTERCEPT → APPROVE → EXECUTE → AUDIT**

Narration should clearly communicate this journey.

### Stage 1 — Register Agent

Explain:

* agent identity
* production agent
* tenant
* lifecycle control

Voice should sound like a product demonstration:

> "We start by registering the production agent. AgentSentry establishes the execution identity and the tenant context before the agent can perform any governed action."

---

### Stage 2 — Connect Existing Infrastructure

Explain the architecture:

**AI Agent → Existing Gateway → AgentSentry → Existing MCP Server → Enterprise System**

Emphasize:

> "AgentSentry does not require the enterprise to replace its existing API gateway or MCP infrastructure."

This is important to the product positioning.

---

### Stage 3 — Register Tools

Demonstrate:

* tool registration
* immutable versions
* exact tool version binding

Emphasize:

> "The agent is bound to an exact version of the tool contract."

---

### Stage 4 — Edit Policy

Show the policy editor.

Demonstrate:

* allow
* deny
* threshold
* approval
* rate limiting

Example:

`refund_order <= $500 → ALLOW`

`refund_order > $500 → REQUIRE APPROVAL`

`delete_customer → DENY`

Then actually demonstrate editing a policy threshold.

For example:

`$500 → $250`

Publish the new policy version.

Voice:

> "This is where AgentSentry moves beyond access control. We are governing the transaction itself."

---

# PART 10 — TRANSACTION-LEVEL GOVERNANCE

This is the core product moment.

When the agent requests:

`refund_order = $1,250`

The narration should become more energetic.

Show:

* WHO
* TENANT
* WHAT
* TOOL
* TOOL VERSION
* ARGUMENTS
* POLICY VERSION
* EXECUTION ID
* DECISION

Voice:

> "Now the agent requests a twelve-hundred-and-fifty-dollar refund."

Pause.

> "The agent has permission to use the tool."

Pause.

> "But permission to call a tool does not mean permission to execute every transaction."

Then:

> "AgentSentry evaluates the actual transaction."

Pause.

> "The amount exceeds policy."

Then:

> "The transaction requires human approval."

This should be the **hero moment** of the entire demo.

---

# PART 11 — EXACT HUMAN APPROVAL

Show the approval screen.

Make the narration confident:

> "The approval request is bound to this exact transaction."

Mention:

* execution ID
* transaction details
* policy version
* expiration
* single-use approval
* cryptographic binding

Then:

> "Approve it once, and only this transaction can proceed."

---

# PART 12 — EXECUTION

After approval:

Show:

`APPROVED → NONCE CONSUMED → EXECUTING → DOWNSTREAM → SUCCESS`

Narration:

> "The approval is consumed."

> "The transaction executes."

> "And the complete execution is recorded."

Keep this energetic and satisfying.

---

# PART 13 — EXECUTION LEDGER

Show the execution ledger.

Explain that AgentSentry records:

* agent
* tenant
* tool
* version
* transaction
* policy
* decision
* approval
* execution result

Voice:

> "Now we have evidence — not just that the agent had access, but exactly what it attempted, what policy evaluated it, who approved it, and what actually executed."

---

# PART 14 — SECURITY GUARDRAILS

Briefly demonstrate the other MVP guardrails without slowing the demo down.

Show:

### Duplicate request

> "If the agent submits the same transaction twice, duplicate protection prevents an unintended second execution."

### Ambiguous downstream outcome

> "If the downstream system times out after receiving the request, AgentSentry does not blindly retry a potentially destructive operation."

### Emergency suspend

> "If an agent needs to be stopped, the control plane can suspend execution."

### Control-plane disconnect

Show:

`FRESH → STALE WITHIN GRACE → RECONCILING → FAIL CLOSED`

Narration:

> "And if control-plane configuration becomes unavailable beyond the allowed freshness window, the execution plane fails closed."

Keep this section concise.

---

# PART 15 — ENTHUSIASM CURVE

The narration should have an intentional energy curve.

### Intro

Confident + intriguing.

### Architecture

Clear + authoritative.

### Policy editor

Engaged.

### Transaction interception

Higher energy.

### Human approval

Peak emphasis.

### Successful execution

Positive resolution.

### Security guardrails

Authoritative.

### Final statement

Strong, confident, memorable.

Do NOT maintain the exact same vocal intensity throughout the entire demo.

---

# PART 16 — FINAL STATEMENT

End with a strong executive delivery:

> "AI agents can make autonomous decisions."

Short pause.

> "AgentSentry controls what those decisions are actually allowed to execute."

Short pause.

> "Identity. Policy. Approval. Execution. Evidence."

Short pause.

> "One execution-control layer for autonomous enterprise software."

The final sentence should feel like the conclusion of a serious infrastructure product demonstration.

---

# PART 17 — AUDIO CONTROLS

Keep:

* Voice ON/OFF
* Music ON/OFF
* Volume
* Pause
* Resume
* Restart
* Captions

Add a visible status indicator:

`● VOICE: AMERICAN ENGLISH`

If using browser speech synthesis, display the selected voice name in a small settings panel for debugging/verification.

Example:

`Voice: [selected en-US voice]`

Do not expose technical browser details in the normal visitor UI.

---

# PART 18 — BACKGROUND MUSIC

Keep the existing background music concept, but ensure it supports the more energetic narration.

Music should be:

* sophisticated
* modern
* infrastructure/technology ambient
* subtle
* low-volume
* not distracting
* no vocals

Target approximately:

**8–12% relative to narration**

When narration begins, automatically duck the music slightly.

During the transaction approval moment, allow the music to subtly increase in intensity without becoming dramatic.

During the final statement, reduce music slightly so the voice has maximum clarity.

---

# PART 19 — AUDIO START EXPERIENCE

Preserve the browser autoplay-safe behavior.

If browser autoplay prevents audio:

Display:

**READY FOR THE AGENTSENTRY DEMO**

"Turn on audio for the full narrated experience."

Button:

**START DEMO WITH AUDIO**

Once clicked:

* start music
* start narration
* begin Auto Demo
* synchronize visuals with narration

Do not start narration before the user has interacted if browser autoplay restrictions prevent it.

---

# PART 20 — PRODUCTION QA

Before declaring the task complete, test the public/published version rather than only the local preview.

### Logo

* visible
* correct
* sharp
* no distortion

### Founder

* populated
* correct name
* correct title
* real supplied profile/photo used
* no invented biography

### Website

* all routes work
* navigation works
* demo works
* chatbot works

### Auto Demo

* starts
* voice starts
* voice is clearly American English
* voice sounds enthusiastic
* voice is not tiring
* narration synchronizes with visuals
* captions synchronize
* music plays
* music ducks under narration
* controls work
* restart works
* pause/resume works
* mute works

### Production

* latest local changes are included in the published version
* published status is confirmed
* last-published timestamp updates
* public URL loads
* hard refresh shows latest version
* no missing assets
* no console/runtime errors
* no stale references to previous logo/founder implementation

---

# FINAL REQUIREMENT

Do not consider this task complete merely because the local Figma Make preview looks correct.

The success condition is:

**LOCAL VERSION = PUBLISHED VERSION**

and:

**AUTO DEMO VOICE = ENERGETIC, NATURAL, CONFIDENT AMERICAN EXECUTIVE VOICE**

The public AgentSentry site should feel like a polished early-stage enterprise infrastructure company presenting a serious new product category — not a generic AI demo.

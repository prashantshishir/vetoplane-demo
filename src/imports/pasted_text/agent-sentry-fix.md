Modify the EXISTING AgentSentry website and Auto Demo. Do NOT rebuild the website, do NOT redesign the Auto Demo, and do NOT create a second demo engine.

## PRIMARY FIX

The Auto Demo currently has a broken audio experience:

* The voice narration has disappeared.
* Ambient/background music is playing.
* I do NOT want ambient music.
* The Auto Demo MUST have a clearly audible FEMALE American English voice.
* The female voice must sound enthusiastic, energetic, confident, polished, and engaging.

### FINAL AUDIO REQUIREMENT

**VOICE: ON**
**AMBIENT MUSIC: COMPLETELY REMOVED**

There must be NO background music anywhere in the Auto Demo.

Do not play:

* ambient music
* background soundtrack
* instrumental music
* sound effects
* music loops
* audio beds

The only audio during Auto Demo should be the female narration voice.

---

# 1. REMOVE ALL AMBIENT MUSIC

Find and completely disable/remove every music-related implementation from the Auto Demo.

Remove or disable:

* background music `<audio>` elements
* music tracks
* ambient soundtrack references
* music autoplay
* music loops
* music volume controls
* music fade-in/fade-out
* music ducking
* music mixer
* background audio initialization
* music state management
* music preload/play logic
* music restart logic

Search the entire existing implementation for terms such as:

`backgroundMusic`
`ambientMusic`
`music`
`soundtrack`
`audioTrack`
`musicVolume`
`duckMusic`
`fadeMusic`
`musicAudio`
`backgroundAudio`

If any of these are used only for the Auto Demo, remove them.

Do NOT leave silent music running underneath the narration.

The Auto Demo must have:

`Narration Voice → ONLY AUDIO SOURCE`

---

# 2. RESTORE FEMALE VOICE NARRATION

Reuse the existing Auto Demo narration engine/controller if one already exists.

Do NOT create a second independent Auto Demo system.

If the existing implementation contains something similar to:

`DemoNarrationEngine`
`startAutoDemo()`
`runAutoDemo()`
`playNarration()`
`narrationController`

reuse it and repair it.

The Auto Demo must actually speak the narration during every stage.

---

# 3. FEMALE AMERICAN ENGLISH VOICE

Use browser speech synthesis if that is the existing architecture.

Use:

`window.speechSynthesis`

Inspect:

`window.speechSynthesis.getVoices()`

Select a **female American English voice**.

Voice selection priority:

1. `en-US` + female + natural/high-quality
2. `en-US` + female
3. another clearly American English female voice
4. only if no female American voice exists, use the best available `en-US` voice

Do NOT intentionally select:

* British English
* Australian English
* Indian English
* robotic voices
* obviously synthetic voices
* male voices

The target voice should sound like a polished American executive/product narrator.

If the browser does not expose gender metadata, use voice names that are commonly associated with natural female US voices and prefer high-quality `en-US` voices.

Also handle the asynchronous voice-loading issue:

`voiceschanged`

The narration must wait until the browser's voice list is available before selecting the voice.

---

# 4. VOICE PERSONALITY

The female narrator must sound:

* enthusiastic
* energetic
* confident
* intelligent
* warm
* professional
* conversational
* executive-level
* engaging
* persuasive without sounding like an advertisement

Avoid:

* monotone
* sleepy
* slow audiobook voice
* robotic delivery
* overly dramatic movie-trailer voice
* radio-announcer voice
* telemarketer voice
* exaggerated excitement
* overly fast speech

The voice should feel like a confident female technology executive explaining an important new infrastructure product.

---

# 5. SPEECH PARAMETERS

Use natural speech settings approximately:

Rate:
`0.98 – 1.05`

Pitch:
natural female range; do not artificially raise the pitch.

Volume:
`1.0`

Use short natural pauses between sentences.

Do not make every sentence identical in rhythm.

Create an energy curve:

### Opening

Confident and intriguing.

### Product explanation

Clear and energetic.

### Transaction-level governance

Increase energy and emphasis.

### Human approval

Strong emphasis.

### Execution

Confident and precise.

### Final statement

Powerful, controlled, memorable.

---

# 6. RESTORE THE COMPLETE NARRATION SCRIPT

The Auto Demo must narrate the complete existing story.

Do not shorten the existing Auto Demo just to fix the audio.

The narration should cover:

### INTRO

"AI agents are moving beyond generating answers. They're beginning to take real actions across enterprise systems."

"That creates a fundamentally new security and governance problem."

"AgentSentry is built to control what those autonomous actions are actually allowed to execute."

### REGISTER AGENT

"First, we register the agent and establish its execution identity."

"This gives the enterprise a clear answer to one of the most important questions: who is actually taking this action?"

### CONNECT INFRASTRUCTURE

"AgentSentry sits alongside the infrastructure enterprises already use."

"It does not require replacing the existing API gateway or MCP server."

"Instead, AgentSentry becomes the execution-control layer between agent intent and real-world action."

### REGISTER TOOLS

"Tools are registered with explicit versions."

"Agents can be bound to specific tool versions, creating a deterministic execution boundary."

### POLICY

"Now we define what this agent is allowed to do."

"Routine actions can be allowed automatically."

"Sensitive actions can require human approval."

"Destructive actions can be denied."

### TRANSACTION GOVERNANCE

"This is where AgentSentry goes beyond traditional access control."

"Instead of simply asking who can call a tool, AgentSentry evaluates the actual transaction."

"It knows the tenant, the agent, the tool, the exact tool version, the arguments, the policy version, and the execution identity."

"Every decision is bound to that specific execution."

### APPROVAL

"Now the agent requests a sensitive action."

"The policy requires human approval."

"The approval is bound to this exact transaction."

"It cannot simply be reused for another request."

### EXECUTION

"Once approved, the execution proceeds."

"AgentSentry enforces the decision at runtime before the downstream system is called."

"The result is recorded in the execution ledger."

### AUDIT

"Every important execution decision becomes evidence."

"Who acted, what they attempted, which policy applied, whether approval was required, what actually executed, and what the outcome was."

### GUARDRAILS

"If the control plane becomes unavailable or configuration becomes too stale, AgentSentry can fail closed rather than silently operating on unknown policy."

"Agents can also be suspended immediately when necessary."

### FINAL

"AI agents can make autonomous decisions."

"AgentSentry controls what those decisions are actually allowed to execute."

"Identity. Policy. Approval. Execution. Evidence."

"One execution-control layer for autonomous enterprise software."

---

# 7. SYNCHRONIZE UI WITH VOICE

Do NOT allow the UI to race ahead of the narration.

Each Auto Demo stage should remain synchronized with the spoken narration.

Use the existing narration completion mechanism if available:

`utterance.onend`

The next stage should begin after the current narration segment completes, with only a short natural transition.

Required flow:

REGISTER AGENT
→ CONNECT INFRASTRUCTURE
→ REGISTER TOOLS
→ CONFIGURE POLICY
→ AGENT REQUEST
→ TRANSACTION GOVERNANCE
→ REQUIRE APPROVAL
→ HUMAN APPROVAL
→ EXECUTION
→ EXECUTION LEDGER
→ GUARDRAILS
→ FINAL MESSAGE

---

# 8. AUTOPLAY HANDLING

Browser autoplay restrictions may prevent speech from starting automatically.

Do NOT interpret this as a missing voice.

If browser audio autoplay is blocked, show a minimal overlay:

**READY FOR THE AGENTSENTRY DEMO**

"Turn on audio for the full narrated experience."

Button:

**START DEMO WITH VOICE**

When clicked:

1. initialize speech synthesis
2. select the female American English voice
3. start narration
4. start Auto Demo
5. remove the overlay

Do NOT start any music.

---

# 9. AUTO DEMO CONTROLS

Keep the existing Auto Demo controls, but remove all music controls.

Keep:

* Voice ON/OFF
* Volume
* Pause
* Resume
* Restart
* captions/subtitles if already implemented

REMOVE:

* Music ON/OFF
* Music Volume
* soundtrack controls
* ambient audio controls

If the current UI says:

`Voice + Music`

change it to:

`VOICE NARRATION`

or simply:

`VOICE ON`

---

# 10. VOICE TOGGLE

Voice OFF must stop narration.

Voice ON must resume/restart narration correctly.

Do not create duplicate speech instances.

Before starting a new narration sequence:

`speechSynthesis.cancel()`

Then start the intended utterance.

Prevent:

* overlapping voices
* duplicated narration
* two Auto Demo instances
* multiple speech queues
* narration continuing after Restart

---

# 11. RESTART BEHAVIOR

When the user presses Restart:

1. cancel current speech
2. reset Auto Demo state
3. reset stage index
4. reset progress
5. reset captions
6. start the female narration from the beginning

There must never be multiple simultaneous speech queues.

---

# 12. DO NOT MODIFY THE WEBSITE DESIGN

Preserve:

* AgentSentry branding
* existing logo
* existing navigation
* existing hero
* existing pages
* existing interactive demo
* existing Auto Demo visuals
* existing animations
* existing transaction visualization
* existing policy visualization
* existing approval flow

This is an AUDIO REPAIR, not a redesign.

---

# 13. IMPORTANT: INTERACTIVE DEMO VS AUTO DEMO

Keep these separate.

`WATCH AUTO DEMO`

must launch the Auto Demo.

`EXPLORE INTERACTIVE DEMO`

must continue opening the interactive demo.

Do not merge them.

---

# 14. ANALYTICS

Preserve the existing analytics events.

Fire:

`auto_demo_start`

only when the Auto Demo actually begins.

Fire:

`auto_demo_complete`

only after the entire Auto Demo and narration have completed.

Do not fire completion when the user merely opens the demo.

---

# 15. FINAL AUDIO QA

Before considering this complete, test the actual Auto Demo from the beginning.

Verify:

[ ] No ambient music plays.

[ ] No background soundtrack plays.

[ ] No instrumental audio plays.

[ ] Female voice is audible.

[ ] Voice is American English.

[ ] Voice sounds enthusiastic and energetic.

[ ] Voice does not sound sleepy or robotic.

[ ] Voice narrates the entire demo.

[ ] Narration and visual stages remain synchronized.

[ ] Approval section receives stronger vocal emphasis.

[ ] Final statement is delivered clearly and confidently.

[ ] P

IMPORTANT: MODIFY THE EXISTING AGENTSENTRY WEBSITE AND EXISTING AUTO DEMO. DO NOT REBUILD THE WEBSITE FROM SCRATCH.

This is a corrective implementation pass. Preserve the existing visual design, website structure, product content, demo flow, animations, and all existing functionality unless specifically changed below.

There are THREE CRITICAL ISSUES that must be fixed and verified:

1. Background ambient music is NOT actually playing during Auto Demo.
2. The founder section does NOT properly identify Prashant Shishir as Founder & CEO.
3. The Auto Demo currently uses a FEMALE voice. Change it to a SOFT, PROFESSIONAL MALE EXECUTIVE VOICE.

Do not simply add visual controls that do nothing. All three requirements must actually work in the published/preview experience.

==================================================
PART 1 — AUTO DEMO: MALE VOICE
==============================

Replace the current female Auto Demo narration voice.

Target voice:

* Male
* Soft
* Calm
* Warm
* Professional
* Executive
* Mature
* Confident but understated
* American English
* Moderate speaking speed
* No announcer/broadcast voice
* No robotic or synthetic-sounding delivery
* No aggressive sales tone
* Think: calm enterprise technology executive explaining a new infrastructure platform to a CEO, CTO, CISO, or investor.

Preferred voice characteristics:

VOICE = male
LOCALE = en-US
RATE = approximately 0.88–0.94
PITCH = slightly below neutral
VOLUME = approximately 0.85–0.95

IMPORTANT:

Do not leave the existing female voice as the default.

If browser speechSynthesis is used, inspect available voices and select the best available male en-US voice.

Create a deterministic voice-selection function:

selectDemoVoice()

It should:

1. Enumerate available browser voices.
2. Filter for en-US / English voices.
3. Prefer voices whose metadata indicates a male voice when that information is available.
4. Prefer a natural/high-quality voice.
5. Fall back gracefully if the browser does not expose gender metadata.
6. Store the selected voice for the complete Auto Demo session.
7. Never switch voices between demo stages.

The voice must remain consistent from:

INTRO
→ REGISTER AGENT
→ CONNECT INFRASTRUCTURE
→ REGISTER TOOLS
→ CONFIGURE POLICY
→ TEST REQUEST
→ TRANSACTION GOVERNANCE
→ STALE POLICY
→ RECONCILIATION
→ HUMAN APPROVAL
→ EXECUTION
→ EXECUTION LEDGER
→ SECURITY CONTROLS
→ FINAL STATEMENT

Add a small internal debug indicator while testing:

Voice: Male Executive
Music: ON
Demo Audio: ON

This debug indicator can be hidden from the final public experience after verification.

==================================================
PART 2 — ACTUAL AMBIENT BACKGROUND MUSIC
========================================

The previous implementation did not actually produce audible background music.

Fix this properly.

DO NOT merely create:

* a "Music ON" button
* a volume slider
* a fake music status
* a visual waveform
* a decorative audio icon

unless there is real audio playback behind it.

The Auto Demo must have ACTUAL background music playing underneath the spoken commentary.

IMPORTANT AUDIO IMPLEMENTATION:

If an audio asset already exists in this Figma Make project, find and use it.

If there is no suitable existing audio asset, create the implementation so that I can attach an MP3/M4A ambient soundtrack to this Figma Make prompt/project.

Use a real .mp3 or .m4a asset.

Figma Make supports audio attachments and can embed them as background music, so explicitly treat the attached audio asset as the Auto Demo background soundtrack.

Do NOT use copyrighted commercial music.

Use a royalty-free / original / appropriately licensed soundtrack.

Music style:

* slow
* ambient
* sophisticated
* subtle
* enterprise infrastructure
* modern technology
* cinematic but restrained
* dark and premium
* low-energy
* no vocals
* no obvious melody competing with narration
* no dramatic Hollywood trailer sound
* no upbeat corporate stock music

Think:

"quiet futuristic infrastructure control room"

rather than:

"AI marketing video."

Suggested musical character:

60–70 BPM
minimal harmonic movement
soft synth pad
very subtle low-frequency texture
occasional restrained digital pulse
no percussion-heavy beat

==================================================
PART 3 — MUSIC MUST START WITH AUTO DEMO
========================================

Music must ONLY play during Auto Demo.

Do NOT add background music to the entire website.

When the user starts:

"Auto Demo"

the application must initialize:

1. Narration engine
2. Background music engine
3. Demo timeline
4. Visual stage controller

The music must begin at the beginning of the Auto Demo and continue underneath the entire narration.

Music timeline:

0:00
FADE IN MUSIC
↓
INTRO NARRATION
↓
REGISTER AGENT
↓
CONNECT INFRASTRUCTURE
↓
REGISTER TOOLS
↓
CONFIGURE POLICY
↓
AGENT REQUEST
↓
TRANSACTION GOVERNANCE
↓
STALE POLICY / RECONCILIATION
↓
HUMAN APPROVAL
↓
EXECUTION
↓
EXECUTION LEDGER
↓
SECURITY GUARDRAILS
↓
FINAL STATEMENT
↓
FADE OUT MUSIC

Music should NOT restart between stages.

Use one continuous audio session.

==================================================
PART 4 — AUDIO DUCKING
======================

The narration must remain clearly intelligible.

When male narration is speaking:

BACKGROUND MUSIC = approximately 8–12% volume.

When narration pauses:

BACKGROUND MUSIC = approximately 12–16%.

Never allow music to overpower the voice.

Implement smooth ducking rather than abrupt volume changes.

Example:

Narration starts
→ music smoothly reduces

Narration ends
→ music smoothly returns to subtle ambient level

Use approximately:

duck duration: 300–600ms
restore duration: 600–1000ms

Do not create obvious pumping effects.

==================================================
PART 5 — MUSIC EMOTIONAL CUES
=============================

Keep the soundtrack continuous, but allow very subtle volume/emphasis changes.

At:

TRANSACTION POLICY EVALUATION
→ slightly increase musical tension.

At:

REQUIRE APPROVAL
→ subtle increase in tension.

At:

HUMAN APPROVAL
→ gentle harmonic release.

At:

EXECUTION SUCCESS
→ subtle resolution.

At:

FINAL EXECUTIVE STATEMENT
→ reduce music slightly.

At the end:

2–3 second musical tail
→ smooth fade out.

Do NOT add sound effects that make this feel like a video game.

==================================================
PART 6 — AUDIO START / BROWSER AUTOPLAY
=======================================

Handle browser autoplay restrictions correctly.

Do NOT pretend that audio is playing if the browser has blocked playback.

When the user launches Auto Demo and browser audio requires interaction, show a premium overlay:

---

READY FOR THE AGENTSENTRY DEMO

Experience the complete execution-control journey with
voice narration and ambient soundtrack.

[ START DEMO WITH AUDIO ]

Voice
Male Executive Voice

Music
Ambient Infrastructure Soundtrack

---

When the user clicks:

START DEMO WITH AUDIO

initialize BOTH:

* male narration
* background music

Then begin the Auto Demo.

If audio is already permitted by the browser, begin normally.

The application must never falsely show:

Music: ON

when the audio element is actually paused or blocked.

==================================================
PART 7 — AUDIO CONTROL PANEL
============================

Inside Auto Demo, add a subtle premium audio control area.

Controls:

[ 🔊 Voice ON/OFF ]

[ ♪ Music ON/OFF ]

[ Volume ]

[ Pause ]

[ Restart ]

Optional:

[ Captions ]

Do NOT make this visually dominant.

Place it in the Auto Demo control bar.

Behavior:

VOICE OFF
→ narration stops
→ music continues

MUSIC OFF
→ music stops
→ narration continues

PAUSE
→ pause both narration and music

RESUME
→ resume both from the current position

RESTART
→ reset demo to stage 1
→ restart narration
→ restart music from beginning

Mute/unmute must preserve the current volume setting.

==================================================
PART 8 — NARRATION / VISUAL SYNCHRONIZATION
===========================================

The visual demo must follow the narration.

Do NOT advance stages merely according to fixed timers if narration is still speaking.

Use narration completion events such as:

utterance.onend

or the equivalent audio.onended event.

The stage should complete when the narration for that stage finishes.

Example:

STAGE:
"REGISTER AGENT"

Narration:

"First, the enterprise registers an AI agent with AgentSentry. The agent receives a durable identity that can be governed independently from the human user."

Visual animation runs while narration plays.

When narration ends:

→ transition to CONNECT INFRASTRUCTURE.

This should feel like a professionally produced product demonstration.

==================================================
PART 9 — FOUNDER SECTION — MUST BE VISIBLE
==========================================

The website currently does not properly identify the founder.

Add a prominent but elegant founder section.

Do NOT hide this only inside the footer.

Place it AFTER:

Product
Architecture
Scale / Platform Story

and BEFORE:

Investor / Design Partner CTA.

Section heading:

THE FOUNDER

Primary identity:

PRASHANT SHISHIR

Founder & CEO, AgentSentry

Use this exact professional positioning:

"Prashant Shishir is an engineering and technology executive with 25+ years of experience building and scaling cloud infrastructure, distributed platforms, SaaS/PaaS products, enterprise databases, SRE organizations and enterprise AI capabilities."

Then:

"His career has focused on a recurring challenge: how do you turn increasingly powerful technology into infrastructure that enterprises can operate safely, reliably and at scale?"

Then:

"He has built and led global engineering organizations, large-scale cloud and SaaS platforms, multi-region infrastructure, enterprise modernization programs and AI initiatives spanning RAG, agentic AI, MCP ecosystems, multi-agent orchestration and AI-augmented operations."

Then introduce the AgentSentry connection:

"AgentSentry extends that experience into a new infrastructure problem created by autonomous software."

Display this statement prominently:

"When AI agents can take actions on behalf of people and businesses, enterprises need a control layer for what those actions are actually allowed to execute."

Then:

"Prashant founded AgentSentry to build that layer — connecting agent identity, deterministic policy, transaction-level governance, human approval, runtime enforcement and execution evidence into a single control plane."

==================================================
PART 10 — FOUNDER CREDIBILITY CARDS
===================================

Add four elegant metric/experience cards:

25+ YEARS
Engineering & Technology Leadership

CLOUD + SaaS
Infrastructure & Platform Systems

GLOBAL SCALE
Multi-Region Enterprise Platforms

AI INFRASTRUCTURE
RAG · Agentic AI · MCP · Multi-Agent Systems

These should communicate credibility without making the section look like a résumé.

==================================================
PART 11 — FOUNDER VISUAL
========================

If an actual founder photo is already available in the project, use it.

If no real photo exists:

DO NOT generate an artificial person and present that person as Prashant Shishir.

Instead create a sophisticated founder profile layout with:

* initials/avatar treatment
* Founder & CEO label
* strong typography
* infrastructure/network visual motif
* subtle architectural graphics

Leave the design ready for a real founder photograph to be inserted later.

==================================================
PART 12 — FOUNDER NAVIGATION / CTA
==================================

Add:

"Meet the Founder"

and:

"Talk to the Founder"

where appropriate.

"Talk to the Founder" should open the existing AgentSentry chatbot.

Prepopulate the chatbot context with:

"I'd like to connect with Prashant Shishir, Founder & CEO of AgentSentry."

Do NOT create a fake email address.

Do NOT display an email address anywhere.

==================================================
PART 13 — AUTO DEMO FOUNDER INTRO
=================================

Add a very short founder context near the beginning or end of the Auto Demo.

Do NOT make this a long biography.

At the appropriate point, male narration should say something similar to:

"AgentSentry was founded by Prashant Shishir, an engineering and technology executive with more than 25 years of experience building cloud infrastructure, SaaS platforms, distributed systems and enterprise AI capabilities."

Then transition back to the product.

Keep this under approximately 12 seconds.

==================================================
PART 14 — AUTO DEMO NARRATION STYLE
===================================

Rewrite/adjust the existing Auto Demo narration where necessary so the new male voice sounds natural.

Narration should be:

* concise
* executive
* calm
* authoritative
* technically credible
* conversational
* not overly promotional

Avoid:

"revolutionary"
"game-changing"
"world-changing"
"the first"
"the only"
"unprecedented"

Prefer language like:

"AgentSentry introduces an execution-control layer..."

"Here the agent is authenticated..."

"The transaction is evaluated against a deterministic policy..."

"Because this action exceeds the configured threshold, execution pauses for human approval..."

"The approval is bound to this exact transaction..."

"Once approved, the execution proceeds..."

"The result is written to the execution ledger..."

==================================================
PART 15 — COMPLETE AUTO DEMO STORY
==================================

The Auto Demo must tell the complete AgentSentry story:

1. INTRO
2. REGISTER AGENT
3. ESTABLISH AGENT IDENTITY
4. CONNECT EXISTING INFRASTRUCTURE
5. SHOW EXISTING GATEWAY + AGENTSENTRY + MCP ARCHITECTURE
6. REGISTER TOOL
7. PIN TOOL VERSION
8. ASSIGN TOOL TO AGENT
9. CREATE POLICY
10. EDIT POLICY
11. PUBLISH POLICY
12. AGENT CREATES A REALISTIC TRANSACTION
13. TRANSACTION ENTERS AGENTSENTRY
14. TENANT RESOLUTION
15. AGENT IDENTITY RESOLUTION
16. TOOL VERSION RESOLUTION
17. ARGUMENT VALIDATION
18. EXECUTION ID CREATED
19. POLICY EVALUATION
20. RATE LIMIT CHECK
21. TRANSACTION DECISION
22. REQUIRE APPROVAL
23. EXACT TRANSACTION APPROVAL
24. SINGLE-USE APPROVAL / REPLAY PROTECTION
25. APPROVAL CONSUMED
26. DOWNSTREAM EXECUTION
27. EXECUTION RESULT
28. EXECUTION LEDGER
29. DUPLICATE REQUEST PROTECTION
30. AMBIGUOUS DOWNSTREAM OUTCOME HANDLING
31. AGENT SUSPEND / KILL
32. POLICY / CONFIGURATION FRESHNESS
33. FAIL-CLOSED BEHAVIOR
34. TENANT ISOLATION
35. TELEMETRY REDACTION
36. FINAL EXECUTIVE VIEW

The demo should communicate:

CONTROL PLANE
manages

EXECUTION PLANE
enforces

==================================================
PART 16 — TRANSACTION-LEVEL GOVERNANCE MUST BE THE HERO
=======================================================

The most important visual concept in the Auto Demo is not generic "AI security."

Make the transaction itself the central object.

Display:

WHO
Customer Support Agent

TENANT
Acme Commerce

WHAT
refund_order

TOOL VERSION
refund_order:v1

ARGUMENTS
amount = $1,250

EXECUTION ID
ex_7F92...

POLICY
Refund > $500

DECISION
REQUIRE APPROVAL

APPROVAL
Required

Then show:

APPROVED

→ NONCE CONSUMED

→ EXECUTING

→ DOWNSTREAM SUCCESS

→ LEDGER RECORDED

This is the core AgentSentry product story.

==================================================
PART 17 — VISUAL QUALITY
========================

Keep the existing premium dark infrastructure aesthetic.

Use:

* dark graphite background
* subtle blue/indigo/teal infrastructure accents
* glass/metallic panels
* fine grid
* network topology
* execution traces
* policy graphs
* transaction timelines
* elegant typography
* restrained motion

Avoid:

* robot imagery
* generic AI brains
* shield clichés
* cartoon illustrations
* excessive neon
* stock photography
* flashy startup gradients

The experience should feel like:

"enterprise infrastructure company building a new control layer"

not:

"AI SaaS marketing website."

==================================================
PART 18 — FINAL VALIDATION
==========================

Before considering this task complete, actually test the following in the Figma Make preview:

[ ] Auto Demo starts successfully.

[ ] Male voice is actually heard.

[ ] Female voice is completely removed from Auto Demo.

[ ] Male voice remains consistent through all stages.

[ ] Ambient music is ACTUALLY audible.

[ ] Music continues underneath narration.

[ ] Music is subtle and does not overpower narration.

[ ] Music fades in.

[ ] Music does not restart at every stage.

[ ] Music fades out at the end.

[ ] Voice ON/OFF works.

[ ] Music ON/OFF works.

[ ] Pause works for both.

[ ] Resume works.

[ ] Restart resets both voice and music.

[ ] Browser autoplay restriction is handled correctly.

[ ] "Start Demo with Audio" actually starts BOTH audio channels.

[ ] Founder section is visible on the website.

[ ] "Prashant Shishir" is clearly displayed.

[ ] "Founder & CEO, AgentSentry" is clearly displayed.

[ ] Founder background is included.

[ ] Founder credibility cards are included.

[ ] Talk to the Founder opens the chatbot.

[ ] No incorrect email address exists anywhere.

[ ] No fake email address is introduced.

[ ] No fake founder photograph is introduced.

[ ] Existing website design is preserved.

[ ] Existing product/demo functionality is preserved.

[ ] Existing AgentSentry transaction-governance story remains intact.

FINAL QUALITY BAR:

When I launch Auto Demo, I should immediately hear:

1. a calm, soft MALE executive voice

AND

2. a subtle, slow ambient technology soundtrack underneath it.

When I finish browsing the website, I should clearly know:

WHO BUILT AGENTSENTRY
→ PRASHANT SHISHIR
→ FOUNDER & CEO

WHAT AGENTSENTRY DOES
→ CONTROLS AUTONOMOUS AI EXECUTION

HOW IT WORKS
→ IDENTITY → POLICY → TRANSACTION GOVERNANCE → APPROVAL → EXECUTION → EVIDENCE

WHERE IT FITS
→ ALONGSIDE EXISTING GATEWAYS, MCP SERVERS, APIS AND ENTERPRISE SYSTEMS

WHY IT MATTERS
→ AI AGENTS ARE BECOMING AUTONOMOUS ENTERPRISE ACTORS

Do not stop after creating the UI controls.

Verify the actual audio behavior and founder content in the running prototype.

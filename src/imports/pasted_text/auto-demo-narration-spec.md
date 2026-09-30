# CRITICAL INVESTOR-DEMO AUDIO FIX

This is now a **production reliability issue**, not a cosmetic change.

The AgentSentry Auto Demo voice is currently inconsistent:

* sometimes the voice does not load
* sometimes narration does not start
* sometimes the Auto Demo runs without narration
* voice availability depends on browser timing
* the current speech-synthesis approach is not reliable enough for an investor presentation

I need you to **redesign ONLY the Auto Demo narration delivery mechanism** for reliability.

Do NOT redesign the website.
Do NOT redesign the Auto Demo visuals.
Do NOT add ambient music.
Do NOT create another competing Auto Demo implementation.

The final experience must be deterministic:

**WATCH AUTO DEMO → FEMALE VOICE LOADS → FEMALE VOICE PLAYS → FULL DEMO NARRATION → NO MUSIC**

---

# 1. IMPORTANT ARCHITECTURAL DECISION

## STOP USING `window.speechSynthesis` AS THE PRIMARY VOICE ENGINE

Do not depend on:

`window.speechSynthesis`

as the primary production narration mechanism.

Browser speech synthesis is too dependent on:

* browser implementation
* operating system
* installed voices
* voice-loading timing
* `voiceschanged`
* autoplay/user-interaction behavior
* browser tab state

It must not be the critical dependency for the investor demo.

It can remain as a development fallback only if necessary, but it must NOT be the primary narration path.

---

# 2. USE PRE-RECORDED FEMALE NARRATION

The production Auto Demo should use **pre-recorded audio narration segments**.

Preferred format:

`.mp3`

Alternative:

`.m4a`

Use a high-quality **American English female executive voice**.

Voice characteristics:

* female
* American English
* mature
* confident
* energetic
* enthusiastic
* intelligent
* warm
* polished
* conversational
* executive-level
* technology/product presentation quality

The voice must NOT sound:

* robotic
* sleepy
* monotone
* slow
* like an audiobook
* like a radio announcer
* like a telemarketer
* overly dramatic

---

# 3. AUDIO ARCHITECTURE

Create a dedicated:

`AutoDemoNarrationEngine`

with deterministic audio playback.

Conceptually:

```text
Auto Demo Controller
        |
        v
Narration Controller
        |
        v
Preloaded Audio Segments
        |
        v
HTMLAudioElement
        |
        v
Browser Audio Output
```

Do NOT generate narration dynamically while the demo is running.

Do NOT wait for a remote TTS service during the demo.

Do NOT request a new voice from the browser for every sentence.

---

# 4. SPLIT NARRATION INTO SEGMENTS

Create one audio segment for each major Auto Demo stage.

Recommended structure:

```text
intro.mp3
register-agent.mp3
connect-infrastructure.mp3
register-tools.mp3
configure-policy.mp3
agent-request.mp3
transaction-governance.mp3
require-approval.mp3
human-approval.mp3
execution.mp3
execution-ledger.mp3
guardrails.mp3
final.mp3
```

Each segment should be independently playable.

This allows:

* deterministic sequencing
* preload
* retry
* pause
* resume
* restart
* precise stage synchronization
* no speech queue problems

---

# 5. EMBED THE AUDIO INTO THE FIGMA MAKE APP

If narration files are supplied as attachments, explicitly embed them into the application.

Do NOT link to an unreliable external URL.

Do NOT depend on an external TTS provider at runtime.

Do NOT dynamically download narration from an unknown service.

The narration assets should be part of the published application.

Figma Make supports MP3 and M4A attachments and can embed audio assets directly into the generated web app. Keep the files optimized and lightweight for reliable loading.

---

# 6. PRELOAD AUDIO BEFORE STARTING AUTO DEMO

The Auto Demo must NOT begin until narration assets are ready.

Create:

`preloadAutoDemoNarration()`

It should:

1. identify all narration assets
2. create audio elements
3. preload them
4. verify their metadata/load state
5. verify each asset can be played
6. report loading progress
7. only then allow the Auto Demo to start

Display a minimal loading state:

**PREPARING NARRATED DEMO**

`Loading narration...`

Then:

**VOICE READY**

The user should never see the Auto Demo silently running while narration is still loading.

---

# 7. CACHE THE NARRATION

Use browser-native caching appropriately.

The objective is:

### FIRST VISIT

Load and prepare narration assets.

### SUBSEQUENT PLAYS

Reuse already-loaded/cached assets whenever possible.

Do not repeatedly fetch the same narration files during one Auto Demo session.

Do not recreate all audio objects every time the user presses Restart.

Maintain a single in-memory narration asset cache for the current page/session.

Conceptually:

```text
NarrationCache

intro
registerAgent
connectInfrastructure
registerTools
configurePolicy
agentRequest
transactionGovernance
requireApproval
humanApproval
execution
executionLedger
guardrails
final
```

---

# 8. USE `preload="auto"`

For every narration audio element:

```text
preload="auto"
```

After loading, keep the audio objects available for the duration of the Auto Demo session.

Do not repeatedly create/destroy audio elements.

---

# 9. STREAMING / FALLBACK ARCHITECTURE

If the embedded audio architecture cannot guarantee that all files are immediately available, implement:

### Primary

Preloaded embedded audio.

### Secondary

Browser-cached audio asset.

### Last-resort fallback

Browser speech synthesis using the best available `en-US` female voice.

BUT:

The fallback must NEVER silently produce a silent demo.

If the primary narration fails and fallback also fails:

STOP the Auto Demo and display:

**VOICE INITIALIZATION REQUIRED**

**The narrated experience could not initialize.**

Button:

**RETRY VOICE**

Do not run the investor demo silently.

---

# 10. AUDIO HEALTH CHECK

Before Auto Demo starts, perform an audio health check.

Validate:

* narration assets exist
* audio elements are created
* assets have loaded sufficiently
* volume > 0
* muted === false
* playback is available
* first narration segment can begin

Only after successful validation:

```text
VOICE READY
```

Then start the Auto Demo.

---

# 11. USER-GESTURE AUDIO INITIALIZATION

Respect browser autoplay restrictions.

When the user clicks:

**WATCH AUTO DEMO**

that click should be used to initialize the audio system.

If the browser still blocks playback, immediately display:

### READY FOR THE AGENTSENTRY DEMO

**Start the narrated investor walkthrough.**

Button:

### START DEMO WITH VOICE

The button click must directly call the audio playback function.

Do NOT require another unrelated interaction.

---

# 12. NO AMBIENT MUSIC

Completely remove the music architecture from Auto Demo.

Remove:

* ambient music
* background music
* soundtrack
* music loops
* music volume
* music fade
* music ducking
* music controls
* background audio

There must be exactly one audio source:

**FEMALE NARRATION**

---

# 13. NARRATION SCRIPT

Preserve the existing Auto Demo story and narration.

Use the current approved AgentSentry messaging.

The narration should cover:

1. autonomous AI agents
2. Agent registration
3. execution identity
4. existing gateway integration
5. MCP integration
6. tool registration
7. immutable tool versions
8. policy configuration
9. deterministic policy evaluation
10. transaction-level governance
11. exact transaction-bound approval
12. approval replay protection
13. runtime enforcement
14. downstream execution
15. execution ledger
16. audit evidence
17. stale policy/configuration
18. fail-closed behavior
19. emergency agent suspension

Final narration:

**"AI agents can make autonomous decisions."**

**"AgentSentry controls what those decisions are actually allowed to execute."**

**"Identity. Policy. Approval. Execution. Evidence."**

**"One execution-control layer for autonomous enterprise software."**

---

# 14. SYNCHRONIZE VISUALS WITH AUDIO

The audio segment must control the transition to the next stage.

Use:

```text
audio.onended
```

to advance the Auto Demo.

Do NOT use arbitrary timers such as:

```text
setTimeout(..., 5000)
```

to guess when narration has finished.

Required:

```text
Audio segment ends
        ↓
Next Auto Demo stage
        ↓
Next narration segment
```

This guarantees visual/audio synchronization.

---

# 15. PAUSE / RESUME

Pause must pause:

* visual Auto Demo
* current narration audio

Resume must continue both from their current state.

Do not restart the narration segment when Resume is pressed.

---

# 16. RESTART

Restart must:

1. stop current narration
2. reset current audio segment
3. reset Auto Demo stage
4. reset visual state
5. preserve the narration cache
6. start the first narration segment
7. start the Auto Demo from the beginning

Do NOT reload every MP3 when Restart is pressed.

---

# 17. PREVENT DUPLICATE AUDIO

There must never be:

* two narration tracks playing simultaneously
* duplicate Auto Demo controllers
* duplicate audio elements playing
* multiple narration queues
* old narration continuing after Restart
* narration continuing after closing the Auto Demo

Before starting another segment:

```text
stopCurrentNarration()
```

Only one narration segment can be active at a time.

---

# 18. AUTO DEMO STATE MACHINE

Implement a deterministic state machine.

Example:

```text
IDLE
↓
LOADING_AUDIO
↓
VOICE_READY
↓
INTRO
↓
REGISTER_AGENT
↓
CONNECT_INFRASTRUCTURE
↓
REGISTER_TOOLS
↓
CONFIGURE_POLICY
↓
AGENT_REQUEST
↓
TRANSACTION_GOVERNANCE
↓
REQUIRE_APPROVAL
↓
HUMAN_APPROVAL
↓
EXECUTION
↓
EXECUTION_LEDGER
↓
GUARDRAILS
↓
FINAL
↓
COMPLETE
```

No state should be able to advance without the appropriate narration stage completing.

---

# 19. USER EXPERIENCE

When Auto Demo opens:

### Loading

**PREPARING NARRATED DEMO**

### Ready

**VOICE READY**

### Playing

**● NARRATED DEMO**

### Paused

**Ⅱ DEMO PAUSED**

Do not expose technical implementation details to normal visitors.

---

# 20. ANALYTICS

Preserve:

`auto_demo_start`

Fire it only after:

* narration initialized
* first audio segment successfully begins
* Auto Demo actually starts

Preserve:

`auto_demo_complete`

Fire it only after the FINAL narration segment finishes.

Do not count a failed audio initialization as a completed demo.

---

# 21. INVESTOR-PRESENTATION REQUIREMENT

Treat this as a **mission-critical demo path**.

The investor should never encounter:

* blank voice
* voice that sometimes loads
* voice that starts halfway through
* voice that disappears
* silent Auto Demo
* background music
* overlapping narration
* browser-dependent voice selection

The experience must feel like a professionally produced product demonstration.

---

# 22. TEST MATRIX

Test the published app under:

### Chrome

Desktop

### Safari

Desktop

### Edge

Desktop

### Chrome

Incognito/private window

### First visit

No prior cache

### Second visit

Cached assets

### Refresh

After previous demo

### Restart

After completed demo

### Pause/resume

### Multiple Auto Demo launches

### Slow network simulation

### Browser autoplay restriction

### Mobile browser if supported

For every test:

**Female voice must be available and audible.**

If narration cannot initialize:

**Auto Demo must NOT silently proceed.**

---

# 23. IMPORTANT — DO NOT CLAIM SUCCESS WITHOUT ACTUAL TESTING

After implementation, test:

**WATCH AUTO DEMO**

from a clean browser session.

Then:

1. wait for `VOICE READY`
2. start the demo
3. verify female narration is audible
4. verify every major stage has narration
5. verify no music
6. pause
7. resume
8. restart
9. complete the entire demo
10. reload the site
11. run Auto Demo again

Only after those tests pass should this be considered complete.

---

# 24. DO NOT CHANGE THE WEBSITE

Preserve exactly:

* AgentSentry branding
* logo
* website design
* navigation
* homepage
* architecture section
* founder section
* chatbot
* analytics
* interactive demo
* Auto Demo visuals

This task is specifically:

**MAKE AUTO DEMO NARRATION RELIABLE.**

---

# 25. PUBLISH

After testing:

**Update the existing published Figma Make application.**

Do not create a new site.

Verify the published version, not only the Make preview.

Final acceptance criterion:

## WATCH AUTO DEMO

must produce:

**VOICE READY**

↓

**ENTHUSIASTIC FEMALE AMERICAN VOICE**

↓

**FULL AUTO DEMO**

↓

**NO MUSIC**

↓

**VOICE REMAINS CONTINUOUS**

↓

**FINAL AGENTSENTRY MESSAGE**

↓

**AUTO DEMO COMPLETE**

This must be reliable enough to use directly in an investor presentation.

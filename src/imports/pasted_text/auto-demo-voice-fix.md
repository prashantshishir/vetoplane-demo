# P0 BLOCKER — AUTO DEMO HAS NO VOICE

The AgentSentry Auto Demo currently has **NO AUDIBLE VOICE**.

This is a **release blocker for the investor presentation**.

Do not make another cosmetic change.
Do not tell me the voice is implemented unless it has actually played successfully.

## REQUIRED OUTCOME

When I click:

**WATCH AUTO DEMO**

the demo must:

1. Start visually immediately.
2. Play a **real female American English executive voice**.
3. Continue narration through the entire Auto Demo.
4. Work in Figma Make preview.
5. Work on the published web application.
6. Work after page refresh.
7. Work when the demo is restarted.
8. Never depend on browser-installed voices.

---

# STOP USING SPEECH SYNTHESIS

Remove `window.speechSynthesis` / `SpeechSynthesisUtterance` as the primary Auto Demo voice mechanism.

Do NOT wait for:

`voiceschanged`

Do NOT wait for a browser voice list.

Do NOT select a voice dynamically from the user's operating system.

Do NOT use browser TTS as the investor-demo audio engine.

The current approach has already failed repeatedly.

---

# USE REAL EMBEDDED AUDIO

Figma Make supports `.mp3` and `.m4a` audio attachments and can embed them into the generated application.

Use **embedded audio assets** for the narration.

The audio must be available locally to the application and must not require an external TTS service at runtime.

Use lightweight web-optimized MP3 files.

Required files:

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

If these audio files are already attached to this Figma Make project, **use them directly**.

If they are NOT attached, STOP and clearly report:

**VOICE AUDIO ASSETS ARE MISSING — PLEASE ATTACH THE NARRATION MP3 FILES**

Do NOT substitute browser TTS and do NOT claim the voice is fixed.

---

# VERY IMPORTANT — DO NOT WAIT 40 SECONDS

The previous implementation delayed the demo for approximately 40 seconds.

Fix this.

The visual demo must begin within:

**1 second**

after clicking:

**WATCH AUTO DEMO**

Do NOT preload all narration files before starting the visual demo.

Only initialize/preload the first narration segment immediately.

Preload subsequent narration segments in the background while the current segment plays.

---

# BUILD ONE AUDIO ENGINE

Create exactly one:

`AutoDemoNarrationEngine`

It must support:

```text
initialize()
play(segment)
pause()
resume()
stop()
restart()
preload(segment)
isReady()
```

Use one Audio instance per active segment.

Prevent:

* duplicate audio
* overlapping narration
* duplicate event handlers
* old audio continuing after restart
* multiple Auto Demo instances

---

# AUTOPLAY

The user's click on:

**WATCH AUTO DEMO**

is the user interaction that should initiate audio.

Immediately call the embedded audio playback.

If the browser blocks autoplay, show:

### READY FOR THE AGENTSENTRY DEMO

Turn on audio for the full narrated experience.

**START DEMO WITH AUDIO**

After that one click, narration must begin.

Do not require another click for every stage.

---

# AUDIO MUST ACTUALLY PLAY

Add an internal audio health check.

The system must verify:

```text
audio.loaded
audio.readyState
audio.play()
audio.onplay
```

Do not mark the voice as READY merely because an Audio object was created.

The voice is READY only after the audio element is actually capable of playback.

If playback fails, show:

**Voice could not start**

with:

**RETRY VOICE**

Do not silently continue.

---

# SYNCHRONIZE DEMO TO REAL AUDIO

Use:

`audio.onended`

to advance narration-driven stages.

Sequence:

```text
intro
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
REQUIRE APPROVAL
↓
HUMAN APPROVAL
↓
EXECUTION
↓
EXECUTION LEDGER
↓
GUARDRAILS
↓
FINAL
```

The visual state and voice must stay synchronized.

---

# REQUIRED VOICE CHARACTER

Female.

American English.

Mature executive.

Confident.

Energetic.

Enthusiastic.

Warm.

Intelligent.

Conversational.

Credible.

NOT robotic.
NOT monotone.
NOT sleepy.
NOT audiobook-style.
NOT radio-announcer style.
NOT telemarketing style.
NOT a non-American accent.

---

# HERO NARRATION

The most important narration is the transaction-governance section.

The investor must hear the explanation while seeing:

```text
AGENT
IDENTITY
TENANT
TOOL
TOOL VERSION
ARGUMENTS
EXECUTION ID
POLICY VERSION
DECISION
APPROVAL
```

Then:

```text
REQUIRE APPROVAL
↓
HUMAN APPROVAL
↓
NONCE CONSUMED
↓
EXECUTION
↓
SUCCESS
↓
EXECUTION LEDGER
```

---

# FINAL NARRATION

The final audio must clearly say:

“AI agents can make autonomous decisions.”

“AgentSentry controls what those decisions are actually allowed to execute.”

“Identity. Policy. Approval. Execution. Evidence.”

“One execution-control layer for autonomous enterprise software.”

---

# REMOVE MUSIC

There must be:

**NO BACKGROUND MUSIC**

Voice only.

Remove any ambient music implementation and controls from Auto Demo.

---

# DEBUG MODE

Add:

`?debugAudio=1`

When present, display:

```text
Audio Engine
Current Segment
Audio URL/Asset
Ready State
Playing
Paused
Muted
Volume
Playback Error
Demo Startup Time
```

This is for diagnosing the problem.

Do not show this to normal visitors.

---

# ACCEPTANCE TEST — DO NOT CLAIM SUCCESS UNTIL THESE PASS

### TEST 1

Click WATCH AUTO DEMO.

Expected:

Visual demo begins in <1 second.

### TEST 2

Expected:

Female American English voice is clearly audible.

### TEST 3

Refresh page.

Expected:

Voice works again.

### TEST 4

Restart Auto Demo.

Expected:

Voice starts again with no duplicate audio.

### TEST 5

Run in Figma Make preview.

Expected:

Voice works.

### TEST 6

Run the published web application.

Expected:

Voice works.

### TEST 7

Use Chrome.

Expected:

Voice works.

### TEST 8

Use Safari.

Expected:

Voice works.

### TEST 9

Use a private/incognito browser window.

Expected:

Voice works after the user clicks START DEMO WITH AUDIO if autoplay permission is required.

### TEST 10

Slow network.

Expected:

Visual demo starts immediately and narration begins once the first embedded audio asset is ready.

---

# FINAL RULE

**DO NOT TELL ME "VOICE IS FIXED" UNLESS YOU HAVE IMPLEMENTED REAL EMBEDDED AUDIO PLAYBACK.**

The current browser-TTS approach has failed.

The investor demo must now use:

**EMBEDDED MP3 → PRELOAD → AUDIO PLAYBACK → ONENDED → NEXT DEMO STAGE**

No browser TTS.

No external runtime TTS.

No 40-second startup.

No silent fallback.

No fake voice-ready state.

This is a **P0 release blocker**. Fix the existing Auto Demo implementation and verify the actual published application before considering the task complete.

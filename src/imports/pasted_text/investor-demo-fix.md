# CRITICAL INVESTOR DEMO FIX — REMOVE STARTUP DELAY AND MAKE NARRATION DETERMINISTIC

This is a **mission-critical reliability fix** for the existing AgentSentry investor demo.

DO NOT redesign the website.
DO NOT change the visual design.
DO NOT remove any existing demo stages.
DO NOT create a second demo implementation.

Fix the existing Auto Demo so that:

**1. The demo begins immediately.**
**2. Voice is reliably audible locally AND on the published web app.**
**3. There is never a silent 40-second startup period.**
**4. The demo must never appear frozen while waiting for audio.**

---

# 1. CURRENT FAILURE

The current behavior is unacceptable:

* User clicks `WATCH AUTO DEMO`
* Approximately 40 seconds pass before the demo visibly starts
* User cannot tell whether the demo is working
* Voice does not play reliably
* Voice is absent both in the Figma Make preview/local experience and on the published web application

Treat this as a production incident.

Do not simply increase timeouts or add another loading spinner.

Find and fix the actual initialization dependency causing the delay.

---

# 2. IMPORTANT ARCHITECTURAL CHANGE

## REMOVE BROWSER SPEECH SYNTHESIS AS THE PRIMARY NARRATION ENGINE

Do NOT depend on:

`window.speechSynthesis`

for the investor demo's primary narration.

Browser speech synthesis is too inconsistent across browsers, operating systems, installed voices, permissions, and timing.

It must NOT be the critical path for the investor demo.

The investor demo requires deterministic audio assets.

---

# 3. USE EMBEDDED PRE-RECORDED NARRATION

Use real pre-recorded narration files embedded into the Figma Make application.

Preferred:

`.mp3`

Acceptable:

`.m4a`

Figma Make supports audio attachments and can embed audio directly into the generated application.

Use lightweight web-optimized audio files.

DO NOT stream narration from an external URL unless absolutely necessary.

DO NOT depend on an external TTS API at runtime.

DO NOT make the demo dependent on an external voice provider.

The audio must be part of the application assets.

---

# 4. NARRATION FILES

Use these narration segments:

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

If these files already exist in the project, reuse them.

If they do not exist:

DO NOT silently fall back to browser TTS.

Create a clearly visible `VOICE ASSETS REQUIRED` state and make the implementation ready to consume these exact files.

The investor demo must never pretend that voice is working when no audio asset exists.

---

# 5. FEMALE AMERICAN ENGLISH EXECUTIVE VOICE

The narration must use:

* American English
* female voice
* mature executive voice
* confident
* energetic
* enthusiastic
* intelligent
* warm
* conversational
* credible
* natural pacing

Avoid:

* robotic delivery
* monotone delivery
* sleepy delivery
* audiobook pacing
* radio-announcer style
* telemarketing style
* non-US accent

The voice should sound like a confident female technology executive presenting an enterprise infrastructure company to investors.

---

# 6. CRITICAL FIX — DO NOT BLOCK DEMO START ON AUDIO PRELOAD

This is the most important change.

The current application appears to wait for initialization before showing the demo, causing approximately a 40-second delay.

DO NOT do this:

```text
load application
    ↓
load all audio
    ↓
wait for every audio file
    ↓
initialize demo
    ↓
start visual demo
```

Instead:

```text
USER CLICKS WATCH AUTO DEMO
        ↓
START DEMO UI IMMEDIATELY
        ↓
initialize visual state machine
        ↓
initialize audio
        ↓
play narration when audio is ready
```

The visual demo must become visible immediately.

Maximum acceptable time before the user sees the first meaningful demo state:

**< 1 second under normal conditions.**

---

# 7. TWO-PHASE INITIALIZATION

Implement:

## Phase A — VISUAL INITIALIZATION

Immediately initialize:

* Auto Demo state machine
* stage 1
* progress indicator
* visual animation
* transaction timeline
* dashboard state

This must NOT wait for narration assets.

## Phase B — AUDIO INITIALIZATION

In parallel:

* locate embedded narration assets
* create audio elements
* preload the first narration segment
* initialize the audio engine
* verify audio can actually play

Do not wait for all narration files before starting the visual application.

---

# 8. AUDIO READY STATE

Create an explicit audio state machine:

```text
VOICE_IDLE
VOICE_INITIALIZING
VOICE_READY
VOICE_PLAYING
VOICE_PAUSED
VOICE_ERROR
VOICE_BLOCKED
```

Expose the current state internally for debugging.

Add a small developer-only diagnostic indicator that can be enabled with:

```text
?debugAudio=1
```

Do not expose technical debugging information to normal investors.

---

# 9. PRELOAD STRATEGY

Use the browser's native audio caching/preloading mechanisms.

For the FIRST narration segment:

```text
preload="auto"
```

Preload the first segment aggressively.

For subsequent narration:

* preload the next segment while the current segment is playing
* maintain an in-memory session cache
* reuse already-loaded audio
* never download the same narration segment repeatedly
* never recreate the same Audio object unnecessarily

Preferred sequence:

```text
intro
   ↓ preload register-agent while intro plays
register-agent
   ↓ preload connect-infrastructure
connect-infrastructure
   ↓ preload register-tools
...
```

This creates continuous narration without a long initial download.

Do NOT attempt to download every audio file synchronously at startup.

---

# 10. AUDIO ENGINE

Create one deterministic singleton:

```text
AutoDemoNarrationEngine
```

It must expose:

```text
initialize()
preloadFirst()
preloadNext()
play(segment)
pause()
resume()
stop()
restart()
isReady()
getState()
getCurrentSegment()
```

There must only be ONE active narration engine.

Prevent:

* duplicate Audio objects
* overlapping narration
* duplicate event handlers
* multiple simultaneous playback instances
* narration from old demo runs continuing after restart

---

# 11. USER GESTURE / AUTOPLAY HANDLING

Browser autoplay restrictions are real.

Do NOT attempt to defeat browser autoplay policies.

When the user clicks:

`WATCH AUTO DEMO`

treat that click as the user gesture that authorizes audio playback.

Immediately attempt:

```text
audio.play()
```

If the browser blocks playback, show:

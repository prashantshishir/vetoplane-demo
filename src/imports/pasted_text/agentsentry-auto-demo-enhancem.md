# AGENTSENTRY WEBSITE — AUTO DEMO AUDIO ENHANCEMENT

You are modifying the **existing AgentSentry Figma Make website and existing Auto Demo**.

Do NOT rebuild the website.

Do NOT change the existing product story, visual design, founder section, chatbot, architecture, demo flow, or website structure.

This is a focused enhancement to the **existing Auto Demo**.

---

# 1. ADD PROFESSIONAL BACKGROUND MUSIC

Add subtle, slow, cinematic background music underneath the existing voice narration during the Auto Demo.

The music should make the demo feel like a polished:

* enterprise infrastructure product launch
* executive product demonstration
* sophisticated technology keynote

It must NOT sound like:

* corporate elevator music
* upbeat marketing music
* dramatic movie trailer music
* science-fiction music
* distracting electronic music
* gaming music

Preferred style:

> Slow, minimal, sophisticated technology/infrastructure ambient music with a subtle pulse and restrained atmosphere.

Think:

**premium enterprise infrastructure + quiet technological momentum**

The music should create confidence and anticipation without competing with the narrator.

---

# 2. AUDIO PRIORITY

The voice narration is always the primary audio layer.

Background music is secondary.

Target relationship:

```text
VOICE NARRATION
████████████████████
Primary

BACKGROUND MUSIC
██
Very low underneath narration
```

Keep music approximately:

**8–15% volume**

relative to the narration.

The exact level should be dynamically adjusted if necessary so that every spoken word remains extremely clear.

When narration starts:

> music automatically ducks slightly.

When narration stops:

> music can gently rise back to its ambient level.

Use a smooth fade rather than abrupt volume changes.

---

# 3. MUSIC SHOULD BE CONTINUOUS ACROSS THE DEMO

The background music should behave as a continuous soundtrack across the Auto Demo.

Do NOT restart the music at every stage.

It should feel like one coherent executive product story.

Structure:

```text
INTRO
   ↓
REGISTER AGENT
   ↓
CONNECT INFRASTRUCTURE
   ↓
REGISTER TOOLS
   ↓
EDIT POLICY
   ↓
AGENT REQUEST
   ↓
TRANSACTION GOVERNANCE
   ↓
STALE POLICY
   ↓
RECONCILIATION
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
```

Music should continue underneath the entire journey.

---

# 4. INTRO MUSIC

At the beginning of Auto Demo:

Start the background music with a **2–3 second gentle fade-in**.

Then begin the existing voice narration.

The opening should feel deliberate and premium.

Do not start with a loud musical hit.

---

# 5. TRANSITIONS

Use subtle musical transitions at major moments:

### Product introduction

Slight increase in energy.

### Agent registration

Neutral / controlled.

### Policy configuration

Subtle technological pulse.

### Transaction intercepted

Very slight increase in tension.

### Approval required

Brief subtle emphasis.

### Approval granted

Gentle release.

### Successful execution

Slight positive resolution.

### Final statement

Return to calm, confident ambience.

Do not use obvious cinematic “boom” sounds.

Avoid sound effects unless already present and genuinely useful.

---

# 6. APPROVAL MOMENT

The approval stage is the most important dramatic moment.

When the screen shows:

> **REQUIRE APPROVAL**

let the music subtly become more focused.

Keep it understated.

Then when:

> **APPROVAL GRANTED**

the music should gently resolve.

Do not make this feel like an alarm or danger scene.

The message is:

> Controlled execution.

not:

> Something went wrong.

---

# 7. FINAL STATEMENT

When the Auto Demo reaches the final statement:

> **AI agents decide what they want to do. AgentSentry controls what they are actually allowed to execute.**

Reduce the music slightly underneath the final narration.

After the narration finishes:

* allow the music to continue for approximately 2–3 seconds
* gently fade it out
* return to the final product screen

This should feel like the ending of an executive product demonstration.

---

# 8. AUDIO CONTROLS

Add a compact audio control area to the Auto Demo.

Controls:

### Voice

ON / OFF

### Music

ON / OFF

### Volume

slider

### Pause

pause/resume entire demo

### Restart

restart Auto Demo from beginning

The user must be able to independently mute the background music while leaving narration enabled.

Example:

```text
🔊 Voice
ON

♪ Music
ON

Volume
━━━━━━━━●━━
```

When music is muted:

> **Music Off**

When narration is muted:

> **Voice Off**

Do not stop the visual demo when either audio layer is muted.

---

# 9. AUTOPLAY BEHAVIOR

Respect browser autoplay restrictions.

If the browser blocks automatic audio playback:

show a polished overlay:

> **Ready for the AgentSentry Demo**

> Turn on audio for the full narrated experience.

Button:

**Start Demo with Audio →**

When clicked:

1. enable narration
2. enable background music
3. start music fade-in
4. start the Auto Demo
5. synchronize narration with the visual sequence

Do not attempt to bypass browser autoplay restrictions.

---

# 10. SYNCHRONIZATION

Maintain the existing narration synchronization.

The demo should NOT advance merely because a fixed timer expired if narration is still speaking.

Preferred behavior:

```text
Narration starts
      ↓
Visual stage starts
      ↓
Narration completes
      ↓
Pause / transition
      ↓
Next stage
```

Use the existing narration engine's completion events.

If browser speech synthesis is being used, synchronize with the speech utterance completion event.

If audio assets are being used, synchronize with the audio completion event.

Music should remain independent and continuous underneath the narration.

---

# 11. NARRATION MUST REMAIN UNCHANGED

Do NOT rewrite or remove the existing professional voice narration.

Preserve all existing narration scripts.

Preserve:

* voice selection
* narration timing
* captions
* stage progression
* pause/resume
* restart
* voice mute/unmute

Only add the background music layer.

---

# 12. MUSIC SOURCE

If an appropriate background music file already exists in the project, use it.

If no music file exists:

Create the Auto Demo so that it supports an external background music asset.

If Figma Make supports adding/attaching an audio asset, use a suitable `.mp3` or `.m4a` file and explicitly embed it as background music for the Auto Demo.

Figma Make supports `.mp3` and `.m4a` audio attachments and can embed them as background music when explicitly instructed.

IMPORTANT:

Do not use copyrighted commercial music.

Use:

* original music
* properly licensed music
* royalty-free music with appropriate rights
* or a generated/owned ambient track

Do not select a recognizable commercial song.

---

# 13. AUDIO ENGINE

Implement the background music as a separate audio layer from narration.

Conceptually:

```text
Demo Audio Controller
│
├── Narration Engine
│   ├── play
│   ├── pause
│   ├── resume
│   ├── stop
│   └── completion events
│
└── Background Music Engine
    ├── play
    ├── pause
    ├── fadeIn
    ├── fadeOut
    ├── duck
    ├── restore
    ├── mute
    └── volume
```

Do not tightly couple the two systems.

The music must be independently controllable.

---

# 14. NARRATION DUCKING

When narration begins:

```text
Music volume
        ↓
   15%
        ↓
     8–10%
```

When narration finishes:

```text
Narration ends
        ↓
Wait ~300–500ms
        ↓
Music gently restores
```

Use a smooth 300–700ms volume transition.

Do not create noticeable pumping.

---

# 15. ACCESSIBILITY

Provide captions for the narration as already implemented.

Audio controls must have accessible labels.

Examples:

* Enable voice narration
* Disable voice narration
* Enable background music
* Disable background music
* Adjust background music volume
* Pause demo
* Resume demo
* Restart demo

The Auto Demo must remain fully understandable with:

* voice disabled
* music disabled
* all audio disabled

Visual storytelling and captions must remain intact.

---

# 16. DEMO STATUS INDICATOR

Add a subtle status indicator while Auto Demo is running:

```text
● AUTO DEMO
Voice: ON
Music: ON
```

When paused:

```text
Ⅱ DEMO PAUSED
```

When complete:

```text
✓ DEMO COMPLETE
```

Do not make this visually dominant.

---

# 17. DO NOT ALTER WEBSITE MUSIC

Background music should exist **only inside the Auto Demo** unless another website section already intentionally contains audio.

Do NOT add:

* music to the homepage
* music to scrolling
* music to the founder section
* music to the architecture page
* music to the chatbot
* automatic audio throughout the website

The website remains silent by default.

The Auto Demo is the only place where the audio experience is intentionally immersive.

---

# 18. EXECUTIVE EXPERIENCE

The final Auto Demo should feel like someone is watching a polished product demonstration during:

* a CTO briefing
* CEO product review
* investor meeting
* enterprise architecture presentation
* design partner discussion

The emotional progression should be:

```text
CURIOUS
   ↓
UNDERSTANDING
   ↓
INTERESTED
   ↓
IMPRESSED BY CONTROL
   ↓
CONFIDENT IN THE ARCHITECTURE
   ↓
UNDERSTANDS THE PRODUCT
```

Never make it feel sensational or theatrical.

---

# 19. FINAL AUDIO EXPERIENCE

The finished Auto Demo should combine:

### Voice

Professional executive US English narration.

### Background music

Slow, subtle, sophisticated technology ambience.

### Visuals

Agent registration → infrastructure → tools → policy → transaction → approval → execution → ledger.

### Captions

Always available.

### Controls

Voice / Music / Volume / Pause / Restart.

The visitor should feel:

> **“I understand what AgentSentry does, I can see exactly how it works, and this feels like a serious enterprise infrastructure product.”**

---

# 20. FINAL QA

Test the complete Auto Demo from beginning to end.

Verify:

* music starts correctly
* music fades in smoothly
* narration is clearly audible
* music never overwhelms narration
* narration ducking works
* music remains continuous between stages
* approval stage has subtle emphasis
* execution stage has subtle resolution
* final statement has reduced music
* music fades out at the end
* voice mute works
* music mute works
* volume works
* pause works
* resume works
* restart works
* captions remain synchronized
* browser autoplay restrictions are handled
* demo still works with no audio
* no website-wide audio is introduced
* no copyrighted commercial music is used

Do not modify the existing website beyond what is required for this Auto Demo audio enhancement.

The final result should feel like a **premium narrated enterprise product demonstration with subtle cinematic technology ambience underneath the voice**.

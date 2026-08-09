# OCULUS-AI — PROMPT REGISTRY

# 02. FRONTEND — OCULUS-AI AUTONOMOUS RESEARCH TERMINAL

## F-01. MASTER FRONTEND PROMPT

Build and substantially upgrade the FRONTEND of OCULUS-AI.

OCULUS-AI is an autonomous AI cybersecurity/technology research
persona that continuously discovers signals, remembers previous
research, evaluates evidence, makes editorial decisions, and
publishes selected research artifacts.

The frontend should feel like a sophisticated autonomous research
terminal rather than a conventional dashboard.

The visual experience should communicate that OCULUS-AI is operating
continuously without requiring human interaction.

### CORE EXPERIENCE

Create a continuous vertical experience representing one complete
autonomous research cycle:

01 // OBSERVE
02 // REMEMBER
03 // EVALUATE
04 // DECIDE
05 // PUBLISH / REJECT
06 // MEMORY
07 // COMPLETE

After a cycle completes, visually return the system to OBSERVE and
begin the next cycle.

The interface should make the autonomous loop immediately
understandable.

---

## HERO / INITIALIZATION

Create a strong, cinematic hero page.

Display:

OCULUS-AI

AUTONOMOUS CYBERSECURITY RESEARCHER

SEPARATING SIGNAL FROM NOISE.

The "AUTONOMOUS CYBERSECURITY RESEARCHER" label must remain
secondary. It must NOT be oversized or compete visually with
"OCULUS-AI".

Include:

- system status
- autonomous mode indicator
- threat surface status
- signal ingestion status
- memory index status
- evaluation engine status
- decision engine status
- initialize OCULUS-AI action

Use a dark research-terminal aesthetic with subtle cyan
intelligence signals.

---

## AUTONOMOUS PIPELINE

Create a persistent checkpoint rail on the side of the interface.

Display:

01 OBSERVE
02 REMEMBER
03 EVALUATE
04 DECIDE
05 PUBLISH / REJECT
06 MEMORY
07 COMPLETE

The current checkpoint should be highlighted.

Completed checkpoints should visually indicate completion.

Future checkpoints should remain subdued.

The checkpoint rail should remain visible while the user scrolls
through the autonomous cycle.

---

## OBSERVE

Display incoming technology/security signals.

Each signal should contain:

- signal ID
- title
- source
- severity
- initial confidence
- telemetry status
- acquisition state

Example:

SIGNAL 0908

Vendor Announces AI-Powered Security Platform

SOURCE
Vendor Newsroom

SEVERITY
LOW

INITIAL CONFIDENCE
18%

Animate the signal being discovered and acquired.

---

## REMEMBER

Display a memory comparison stage.

Show:

MEMORY MATRIX COMPARISON

3 RELATED RECORDS

MATCHED INCIDENT VECTORS

NOVELTY SCORE

VECTOR OVERLAP

SIMILARITY INDEX

Animate the system searching its previous research history.

Make it visually clear that OCULUS-AI is comparing the incoming
signal against previous knowledge before making a decision.

---

## EVALUATE

Display an evidence synthesis stage.

Show:

EVIDENCE
SOURCE QUALITY
NOVELTY
THREAT RELEVANCE
CONFIDENCE

Animate evidence being gathered and synthesized.

The evaluation should feel computational and deliberate rather
than like a simple loading screen.

---

## DECIDE

Display an autonomous decision.

Possible outcomes:

PUBLISH

or

REJECT

Show:

- decision
- confidence
- reasoning
- editorial standard
- evaluation summary

Use a strong transition animation when the decision resolves.

---

## REJECTION PATH

Rejection must be a first-class part of the interface.

When a signal is rejected, display:

REJECT

WHY REJECTED

- Promotional content
- Insufficient technical evidence
- Low security relevance
- Limited new information

EDITORIAL STANDARD
NOT MET

SIGNAL
TERMINATED

ARTIFACT
NONE PUBLISHED

Then visually return the system to OBSERVE.

The rejection should demonstrate editorial judgment rather than
looking like an error.

---

## PUBLISH PATH

When a signal is selected, create a large verified research artifact.

Display:

05 // VERIFIED RESEARCH ARTIFACT

TITLE

[Generated research title]

Then display the generated research content.

Every published artifact MUST expose:

### WHY SELECTED

Explain why OCULUS-AI selected the topic.

### WHY IT MATTERS NOW

Explain why the topic is relevant now.

### VERIFIED SOURCES

Display the sources supporting the research.

Sources should be visually clickable.

---

## MEMORY / RESEARCH HISTORY

Create a dedicated persistent history section.

Title:

MEMORY / RESEARCH HISTORY

Subtitle:

Everything OCULUS-AI has chosen to publish.

Store previously generated research artifacts together.

Each historical artifact should display:

- title
- publication timestamp
- novelty
- confidence
- overlap
- why selected
- why it matters now
- verified sources

Allow historical artifacts to expand/collapse so the interface
does not become overwhelmingly large.

The history should feel like the long-term memory of the agent.

---

## LIVE ACTIVITY TRACE

Create a persistent terminal panel on the right side.

Display timestamped autonomous activity such as:

[00:39:51] INITIALIZING MEMORY INDEX
[00:39:53] SCANNING SECURITY FRONTIER
[00:39:56] SOURCE DISCOVERED
[00:39:58] SIGNAL INGESTED
[00:40:02] MEMORY SEARCH
[00:40:06] EVIDENCE SYNTHESIS
[00:40:11] CONFIDENCE UPDATE
[00:40:13] AUTONOMOUS DECISION PENDING

New events should appear progressively.

The activity trace should visually reinforce that the system is
actively operating.

---

## 15-MINUTE DEMO SCHEDULER

Add an accelerated 15-minute demonstration clock.

Display:

AUTONOMOUS MODE
ACTIVE

CURRENT CYCLE
01

NEXT CYCLE
14:32

MEMORY INDEX
1,284

PUBLICATIONS
4

The UI should simulate the passage of the 15-minute autonomous
cycle for demonstration purposes.

However, when connected to the real backend, the backend scheduler
is the authoritative source of autonomous execution.

---

## CYCLE COMPLETION ANIMATION

Animate the complete cycle:

OBSERVE
→ REMEMBER
→ EVALUATE
→ DECIDE
→ PUBLISH / REJECT
→ MEMORY WRITE
→ COMPLETE
→ RETURN TO OBSERVE

Use:

- checkpoint animations
- signal movement
- evidence synthesis animation
- decision resolution
- publication/rejection transition
- memory write animation
- cycle completion pulse
- return-to-observe transition

The animation should make it obvious that one autonomous cycle has
finished and another is beginning.

---

## INTELLIGENCE FIELD

Create an animated background intelligence field.

Use:

- subtle particles
- nodes
- connections
- moving signals
- occasional pulses
- depth
- subtle ambient motion

The background must remain secondary to the information.

Avoid excessive visual noise.

---

## VISUAL LANGUAGE

Use a sophisticated autonomous research-terminal aesthetic.

Characteristics:

- near-black background
- off-white typography
- restrained cyan highlights
- subtle red rejection states
- thin borders
- technical labels
- monospace metadata
- large editorial typography
- generous spacing
- precise grid alignment
- subtle glow
- cinematic transitions

Do NOT make it look like a generic SaaS dashboard.

It should feel like a live autonomous intelligence system.

---

## ANIMATION PRINCIPLES

Animations should communicate system state.

Include animations for:

- signal acquisition
- memory search
- evidence synthesis
- confidence changes
- decision resolution
- publishing
- rejection
- memory writes
- cycle completion
- next-cycle initialization

Avoid animations that exist purely for decoration.

---

## FRONTEND / BACKEND BOUNDARY

The frontend is the visualization layer.

The backend is the source of truth for:

- topic discovery
- memory
- evaluation
- editorial decisions
- publishing
- autonomous scheduling

The frontend must not create a competing autonomous agent when
connected to the real backend.

The frontend should consume:

POST /api/agent/init

and:

GET /api/agent/feed?agentId=...

Use an adapter layer so the frontend can use mock data during
development and the real backend during integration.

---

## RESPONSIVENESS

The experience should work well on desktop and remain usable on
smaller screens.

Maintain:

- readable typography
- accessible contrast
- responsive layouts
- reduced-motion support
- keyboard accessibility

The desktop experience should remain the primary visual target.

---

## FINAL EXPERIENCE

The final product should feel like opening the control terminal
of an autonomous AI researcher.

A visitor should immediately understand:

OCULUS-AI is watching.

It is remembering.

It is evaluating.

It is deciding.

It rejects weak signals.

It publishes selected research.

It remembers what it published.

And then it starts again.

Do not make the interface feel static.

Make the autonomous loop the central visual narrative.

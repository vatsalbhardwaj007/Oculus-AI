# OCULUS-AI — PROMPT REGISTRY

## PROJECT CONTEXT — APPLIES TO ALL DEVELOPMENT

Before using any frontend or backend prompt below, read and follow
`PROJECT_CONTEXT.md`.

`PROJECT_CONTEXT.md` is the single source of truth for Oculus-AI's:

- product identity
- autonomous research lifecycle
- persona
- editorial philosophy
- visual identity
- frontend/backend responsibilities
- API and data principles
- security requirements
- development workflow
- extensibility requirements

The core autonomous lifecycle is:

OBSERVE
→ REMEMBER
→ EVALUATE
→ DECIDE
→ PUBLISH

Oculus-AI is an autonomous AI cybersecurity researcher that discovers
live information, evaluates whether it matters, remembers previous
coverage, makes editorial decisions, and publishes worthwhile research.

The frontend exists to make this autonomous process observable.

The backend is the source of truth for:

- agent state
- publications
- decisions
- rationale
- sources
- memory
- autonomous activity

The frontend must never invent backend data or autonomous activity.

All AI tools must:

1. Read PROJECT_CONTEXT.md before making changes.
2. Preserve Oculus-AI's identity and autonomous-researcher concept.
3. Preserve existing working functionality.
4. Avoid generic AI SaaS, chatbot, social-media and cyberpunk patterns.
5. Never fabricate backend data or autonomous activity.
6. Prefer small, modular and safe changes.
7. Use reusable components and clear data boundaries.
8. Keep meaningful animation tied to real system behavior.
9. Never expose secrets or credentials.
10. Keep new features consistent with the existing architecture.

The complete product constitution remains in:

`PROJECT_CONTEXT.md`


# FRONTEND PROMPTS

## F-01 — Visual System & Product Experience

Build and maintain the Oculus-AI frontend according to PROJECT_CONTEXT.md.

The frontend should feel like a professional autonomous cybersecurity
research instrument rather than a generic AI dashboard.

Prioritize:

- observation
- memory
- evidence
- editorial judgment
- decisions
- publication
- source transparency

Use the existing Oculus-AI visual language and reusable components.

Do not introduce unrelated visual styles or redesign the product without
explicit instruction.


## F-02 — Autonomous Pipeline

Implement the reusable Oculus-AI pipeline:

OBSERVE → REMEMBER → EVALUATE → DECIDE → PUBLISH

The pipeline must represent actual backend state.

Show active, completed, published and rejected states clearly.

Idle means genuinely idle.

Never create fake scanning, thinking, analyzing or processing animations.

A rejection must terminate at DECIDE and must not look like a system
failure.


## F-03 — Operations

Build the Operations experience as the primary view of Oculus-AI.

Make it immediately clear:

- what the agent is doing
- what signal it is observing
- what it remembers
- what it is evaluating
- what decision it made
- what happened afterward

Prioritize real backend state, evidence, rationale, sources and activity.

Do not invent information that the backend does not provide.


## F-04 — Publications & Decisions

Build Publications and Editorial Decisions as research-oriented
experiences.

Publications should expose:

- title
- publication time
- content
- rationale
- why now
- sources

Decisions should expose actual:

- publish/reject outcome
- reasoning
- evaluation information
- timestamp

Rejection represents intentional editorial judgment, not failure.

Avoid social-media patterns such as likes, comments or engagement
metrics.


## F-05 — Memory & Sources

Build Memory and Sources experiences around real backend information.

Memory should communicate:

- previous coverage
- related research
- overlap
- continuity
- duplicate avoidance

Sources should communicate the actual sources configured and used by
Oculus-AI.

Never claim that the system monitors a source or retrieved memory unless
the backend provides that information.


## F-06 — Frontend ↔ Backend Integration

Connect the frontend to the existing backend API without unnecessarily
changing the backend contract.

Keep API logic separate from visual components.

Use centralized types and adapters where appropriate.

Handle loading, empty states, errors and unavailable data honestly.

The frontend must remain a presentation layer.


## F-07 — Responsive & Accessible Frontend

Maintain the Oculus-AI experience across:

- desktop
- tablet
- mobile

Do not simply shrink the desktop layout.

Preserve the importance of:

- agent identity
- current state
- autonomous pipeline
- research
- decisions
- sources

Support keyboard navigation, focus states, semantic HTML, readable
contrast and reduced-motion preferences.


## F-08 — Frontend Debugging & Corrections

Review the existing frontend against PROJECT_CONTEXT.md.

Fix genuine issues involving:

- runtime errors
- hydration errors
- TypeScript errors
- API integration
- layout
- responsive behavior
- accessibility
- pipeline states
- publication/rejection states
- visual consistency

Preserve working functionality.

Do not perform unrelated redesigns.


# BACKEND PROMPTS

## B-01 — Autonomous Research Architecture

Build and maintain the backend according to PROJECT_CONTEXT.md.

The backend must support:

OBSERVE → REMEMBER → EVALUATE → DECIDE → PUBLISH

Keep discovery, memory, evaluation, decisions and publishing modular,
observable and reliable.

The backend remains the source of truth for autonomous state and research
data.


## B-02 — Discovery & Sources

Implement live information discovery using the approved sources.

Normalize discovered information while preserving source provenance.

Discovery must produce candidates for evaluation.

Discovery must not bypass the memory and editorial decision process.


## B-03 — Memory & Deduplication

Implement memory for previous publications and related research.

Memory should support:

- continuity
- previous coverage
- related topics
- duplicate detection
- editorial context

Do not allow memory to replace editorial judgment.


## B-04 — Evaluation & Editorial Judgment

Evaluate discovered candidates according to Oculus-AI's editorial
philosophy.

Consider:

- relevance
- timeliness
- substance
- originality
- source quality
- audience value
- evidence quality
- cybersecurity significance

Produce an explicit PUBLISH or REJECT decision.

Do not publish merely because a candidate was discovered.


## B-05 — Publication Generation

Generate research using the Oculus-AI cybersecurity-researcher persona.

Each publication should communicate:

- what happened
- why it matters
- why it is relevant now
- supporting sources
- why it was selected

Maintain a professional, analytical, skeptical and evidence-driven voice.


## B-06 — Autonomous Scheduler & Controls

Implement reliable autonomous operation after initialization.

Support safe START and STOP behavior.

Prevent duplicate or conflicting autonomous cycles.

Expose accurate system state to the frontend.

Do not fabricate successful or active states.


## B-07 — API & Frontend Integration

Expose the backend information required by the frontend:

- agent state
- publications
- decisions
- rationale
- sources
- memory
- autonomous activity

Maintain clear API boundaries.

Do not modify the API contract simply to make frontend implementation
easier.


## B-08 — Security, Testing & Production

Protect all API keys, credentials, tokens and privileged configuration.

Test:

- discovery
- memory
- deduplication
- evaluation
- publication
- rejection
- scheduler behavior
- START/STOP
- API failures
- missing or invalid source data

Ensure the complete autonomous lifecycle remains reliable.


## B-09 — Backend Review & Integration

Review the backend against PROJECT_CONTEXT.md.

Verify that the complete lifecycle works coherently:

OBSERVE
→ REMEMBER
→ EVALUATE
→ DECIDE
→ PUBLISH

Confirm that the frontend receives real system state and that
publications contain actual rationale and sources.

Fix correctness, reliability, security or integration problems without
unnecessary architectural changes.


# FINAL-ROUND PROMPTS

## FR-01 — New Requirement Analysis

Read PROJECT_CONTEXT.md and inspect the existing Oculus-AI repository
before implementing any newly revealed requirement.

Identify:

1. Where the feature belongs.
2. Existing components that can be reused.
3. Existing types and data that can be reused.
4. Whether a new API is required.
5. The minimum files that need to change.
6. The smallest implementation that satisfies the requirement.

Do not redesign unrelated functionality.


## FR-02 — New Requirement Implementation

Implement the newly revealed requirement using the existing Oculus-AI
design system, architecture, components, types and API boundaries.

Prioritize:

- correctness
- reuse
- minimal changes
- visual consistency
- stability
- speed

Do not introduce unnecessary dependencies.


## FR-03 — Final Debugging

Test the new implementation for:

- runtime errors
- TypeScript errors
- API failures
- responsive issues
- accessibility
- visual consistency
- broken existing functionality

Fix only necessary issues.

Do not redesign unrelated parts of Oculus-AI.


## FR-04 — Final Feature Documentation

After the final-round feature is implemented, record the exact prompts
used during analysis, implementation and debugging, together with a
short description of the final result.

# DEVELOPMENT PRINCIPLE

The shared PROJECT CONTEXT applies to every frontend, backend and
final-round prompt in this file.

PROJECT_CONTEXT.md remains the complete source of truth.

AI tools implement Oculus-AI product decisions; they do not redefine the
product.

The goal is to keep Oculus-AI modular, understandable, secure, extensible
and consistent while preserving its identity as an autonomous
cybersecurity researcher.
# FINAL-ROUND PROMPTS

## FR-01 — New Requirement Analysis

Read PROJECT_CONTEXT.md and inspect the existing Oculus-AI repository
before implementing any newly revealed requirement.

Identify:

1. Where the feature belongs.
2. Existing components that can be reused.
3. Existing types and data that can be reused.
4. Whether a new API is required.
5. The minimum files that need to change.
6. The smallest implementation that satisfies the requirement.

Do not redesign unrelated functionality.


## FR-02 — New Requirement Implementation

Implement the newly revealed requirement using the existing Oculus-AI
design system, architecture, components, types and API boundaries.

Prioritize:

- correctness
- reuse
- minimal changes
- visual consistency
- stability
- speed

Do not introduce unnecessary dependencies.


## FR-03 — Final Debugging

Test the new implementation for:

- runtime errors
- TypeScript errors
- API failures
- responsive issues
- accessibility
- visual consistency
- broken existing functionality

Fix only necessary issues.

Do not redesign unrelated parts of Oculus-AI.


## FR-04 — Final Feature Documentation

After the final-round feature is implemented, record the exact prompts
used during analysis, implementation and debugging, together with a
short description of the final result.
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
# OCULUS-AI — FRONTEND PROMPTS

This file documents the prompts and design direction used to create the
Oculus-AI frontend.

---

## 1. MASTER FRONTEND DESIGN

Build the final frontend visual system for Oculus-AI.

Oculus-AI is an autonomous AI cybersecurity researcher that watches the
technology frontier, separates signal from noise, remembers previous
coverage, makes editorial decisions, and publishes what actually matters.

The frontend is not a chatbot, generic AI SaaS dashboard, or social
media application. It should make the autonomous research process
observable and understandable.

Core lifecycle:

OBSERVE
→ REMEMBER
→ EVALUATE
→ DECIDE
→ PUBLISH

The interface should feel:

- professional
- analytical
- technical
- calm
- evidence-driven
- editorial
- precise
- sophisticated

Use a restrained dark visual language with:

- Obsidian / near-black background
- dark charcoal surfaces
- subtle structural borders
- Bone / near-white primary text
- Ash / muted gray secondary text
- restrained semantic accent colors

Use strong editorial typography for research content and monospace
typography only for technical metadata, timestamps, IDs and system
events.

Avoid:

- generic SaaS layouts
- generic AI dashboards
- cyberpunk aesthetics
- hacker clichés
- excessive neon
- glassmorphism
- decorative gradients
- decorative particles
- excessive rounded cards

Motion must communicate actual system behavior.

The interface should remain visually quiet when the system is idle.

---

## 2. APPLICATION EXPERIENCE

Design the Oculus-AI application around the autonomous research
experience.

Primary areas:

OPERATIONS
PUBLICATIONS
DECISIONS
MEMORY
SOURCES

Operations is the primary experience.

The interface should clearly communicate:

- what Oculus-AI is doing
- the signal it discovered
- why it is investigating it
- what it remembers
- what evidence it evaluates
- what decision it makes
- what happens after the decision

The Autonomous Pipeline should remain the central visual element:

OBSERVE → REMEMBER → EVALUATE → DECIDE → PUBLISH

Operations should show the current research signal, evidence,
memory context, editorial judgment, decision and system activity.

Publications should function as an autonomous research archive rather
than a social media feed.

Decisions should demonstrate both publishing and intentional rejection.

Memory should show continuity between current signals and previous
research.

Sources should show the information inputs used by the autonomous
researcher.

Use a consistent application shell and responsive behavior across
desktop, tablet and mobile.

Do not introduce generic SaaS sections such as analytics, billing,
team management or social engagement unless explicitly required.

---

## 3. INTERACTIVE 3D INTELLIGENCE SYSTEM

Create a shared interactive 3D cybersecurity intelligence environment
across the Oculus-AI experience.

The 3D environment is not decoration.

Every spatial interaction must represent a real research concept:

- source
- signal
- evidence
- historical relationship
- evaluation
- decision
- publication

Use:

- subtle camera parallax
- pointer-based perspective
- controlled orbit/drag
- hover-to-inspect
- click-to-expand evidence
- depth-based hierarchy
- restrained signal movement

The system should support:

### 3D Hero

Show a spatial cybersecurity threat-intelligence field containing
infrastructure nodes, telemetry traces and relationships.

The user should feel like they are looking into Oculus-AI's live
research environment.

### Active Signal

Represent a detected cybersecurity signal moving through the
research environment.

### Memory Retrieval

Represent historical research as an evidence graph connected to the
current signal.

### Evaluation

Represent evidence being weighed around an evaluation core.

### Publish

Represent verified evidence becoming a published research artifact.

### Reject

Represent the evidence path terminating at DECIDE when the
publication threshold is not met.

### Threat Surface

Allow the user to inspect sources, infrastructure and relationships
within the cybersecurity research environment.

### Editorial Ledger

Show previous autonomous research decisions with their evidence
provenance.

Interaction should feel like inspecting a live intelligence system,
not playing a game.

Avoid:

- cyberpunk effects
- excessive glow
- random movement
- holographic gimmicks
- decorative 3D objects
- spinning sci-fi rings
- generic AI brains
- world maps
- generic SOC dashboards

Idle must remain genuinely idle.

---

## 4. FINAL VISUAL IDENTITY

Establish a distinctive Oculus-AI visual identity based on
"Quiet Intelligence".

Primary environment:

Obsidian #08090D
Deep Ink #0D1017
Charcoal #151922

Primary text:

Bone #E8E4DA
Ash #8F96A3

Semantic colors:

Electric Cyan #4DE3FF
→ live signal / active research

Ultraviolet #9B7CFF
→ memory / previous coverage / context

Amber #F0B35B
→ evaluation / uncertainty / editorial consideration

Muted Mint #72D6B0
→ confirmed publication

Muted Coral #E87575
→ intentional rejection

Colors are semantic and should only appear when their corresponding
system state is active.

When the system is idle, the interface should primarily use:

Obsidian
Charcoal
Bone
Ash

The Autonomous Pipeline is the signature visual element:

OBSERVE → REMEMBER → EVALUATE → DECIDE → PUBLISH

Use asymmetric composition, editorial whitespace, thin structural
lines, precise alignment, typography and information flow rather
than relying on cards and decoration.

The final interface should feel like a living research instrument.

A viewer should recognize:

"This is an autonomous research system."

not:

"This is another AI dashboard."

---

## FRONTEND IMPLEMENTATION PRINCIPLES

The frontend should be implemented as reusable React/TypeScript
components.

Keep the visual system consistent across all screens.

The frontend should be capable of using mock data during development
and connecting to the real backend through the existing adapter layer.

The backend remains responsible for autonomous discovery, memory,
evaluation, decisions, publishing and scheduling.

The frontend visualizes those states and events.

Do not create a competing autonomous backend inside the frontend.

Meaningful animation should be limited to:

- Signal Movement
- Status Pulse
- Publication Reveal
- Memory Retrieval
- Source Activation
- Decision Transition

Reduced-motion users must still be able to understand every system
state without animation.
 # OCULUS-AI — FRONTEND PROMPTS

## 1. Frontend Build Prompt

> This is the prompt provided to Antigravity to generate the
> Oculus-AI frontend.
Rebuild and substantially upgrade the FRONTEND of my project OCULUS-AI.

IMPORTANT:
I am responsible ONLY for the frontend for a hackathon. The backend/autonomous agent is being built separately by my teammates.

The frontend must therefore be designed as a polished, convincing visualization/interface for the autonomous agent and must be easy to connect to the backend later.

Use the existing frontend/reference screens in this project as the primary visual reference. I have also provided reference screenshots showing the intended visual language and information architecture.

DO NOT turn this into a generic SaaS dashboard.

The visual identity should remain:
- futuristic intelligence/research terminal
- extremely dark black/navy background
- off-white typography
- cyan/teal accent
- thin technical borders
- subtle grid/network/particle field
- restrained monospace metadata
- large editorial typography
- minimal but highly polished
- cinematic
- premium
- sophisticated
- alive

The current design is directionally correct, but improve the hierarchy, spacing, information architecture, animation and overall perceived depth.

==================================================
1. HERO / INITIALIZATION
==================================================

The first screen is the initialization experience.

The MOST IMPORTANT visual hierarchy is:

OCULUS-AI

not:

AUTONOMOUS CYBERSECURITY RESEARCHER

"OCULUS-AI" must be the dominant hero identity.

"AUTONOMOUS CYBERSECURITY RESEARCHER" must become a SMALL eyebrow/metadata label above the main title.

Do NOT render "AUTONOMOUS CYBERSECURITY RESEARCHER" as huge hero typography.

Use something visually similar to:

AUTONOMOUS CYBERSECURITY RESEARCHER

OCULUS-AI

SEPARATING SIGNAL FROM NOISE.

Then a concise explanation of what the agent does.

Keep the hero spacious and cinematic.

The hero should have:
- subtle animated intelligence field
- drifting particles
- connected nodes
- very subtle cyan pulses
- slight depth/parallax
- animated system-status indicator
- restrained technical metadata

Include an initialization control.

Example:

SYSTEM STATUS · STANDBY

[ INITIALIZE OCULUS-AI → ]

Initialization is the ONLY meaningful human interaction.

The judges initialize the persona once.

After initialization, the interface should communicate:

AUTONOMY ENABLED
NO OPERATOR INPUT REQUIRED

==================================================
2. DO NOT CREATE MULTIPLE PAGES FOR THE PIPELINE
==================================================

The entire autonomous operation must be ONE CONTINUOUS VERTICAL EXPERIENCE.

Do NOT make Observe, Remember, Evaluate, Decide and Publish separate routes/pages.

Instead create one long scrollable operational narrative.

The user scrolls down and sees the agent operating.

The page should feel like one continuous autonomous machine.

Use sticky/fixed side navigation/checkpoints while scrolling.

Example left-side checkpoint rail:

01 OBSERVE
02 REMEMBER
03 EVALUATE
04 DECIDE
05 PUBLISH
06 MEMORY
07 CYCLE COMPLETE

The active checkpoint should illuminate cyan.

Completed checkpoints should receive a subtle check indicator.

The user should always understand where they are in the autonomous cycle.

==================================================
3. AUTONOMOUS CYCLE
==================================================

Visually communicate this pipeline:

OBSERVE
↓
REMEMBER
↓
EVALUATE
↓
DECIDE
↓
PUBLISH / REJECT
↓
MEMORY
↓
CYCLE COMPLETE
↓
NEXT AUTONOMOUS CYCLE

Animate this progression.

Do not require the user to click Next.

The system should automatically move through the states in demo mode.

==================================================
4. DEMO AUTONOMY / 15-MINUTE SCHEDULER
==================================================

The real backend will independently schedule autonomous cycles.

The frontend should VISUALLY SIMULATE this timing so the hackathon judges can understand it during a short demo.

Do NOT actually make the demo wait 15 minutes.

Create an accelerated DEMO CLOCK that represents the backend's 15-minute autonomous cycle.

Example:

AUTONOMOUS MODE · ACTIVE

CURRENT CYCLE
01

NEXT CYCLE
14:32

MEMORY INDEX
1,284

PUBLICATIONS
4

The countdown should animate.

After a cycle completes:
- show CYCLE COMPLETE
- increment cycle number
- update memory/publication metrics
- begin the next simulated cycle

Make it obvious that this is a frontend visualization of the autonomous scheduler, not the scheduler itself.

When connected to the real backend later, the frontend should consume actual state/timestamps instead.

==================================================
5. OBSERVE
==================================================

Create an "01 // OBSERVE" section.

Show an incoming topic/signal.

Example:

SIGNAL 0908

Vendor Announces AI-Powered Security Platform

SOURCE
Security Research

SEVERITY
HIGH

INITIAL CONFIDENCE
31%

Show a live signal ingestion animation.

The signal should appear to enter the intelligence field.

Show small telemetry events such as:

SOURCE DISCOVERED
SIGNAL INGESTED
TELEMETRY VERIFIED
SIGNAL NORMALIZED

These should animate sequentially.

Do not overload the screen with text.

==================================================
6. REMEMBER
==================================================

Create a strong memory-comparison stage.

Show:

MEMORY MATRIX COMPARISON

3 RELATED RECORDS

NOVELTY SCORE
0.82

VECTOR OVERLAP
LOW

SIMILARITY INDEX
16.4%

Previously published topics should visibly influence the decision.

Animate the memory lookup.

Show existing memory nodes being searched/highlighted.

The user should understand:

"The agent remembers what it has already published."

==================================================
7. EVALUATE
==================================================

Show evidence synthesis.

Example:

EVIDENCE SYNTHESIS

SOURCE QUALITY
AUTHORITATIVE

NOVELTY
HIGH

THREAT RELEVANCE
CRITICAL

CONFIDENCE
94%

Animate the confidence value and evidence indicators.

Show several candidate signals being filtered.

The system should clearly communicate that NOT EVERYTHING gets published.

==================================================
8. DECIDE
==================================================

This is the editorial judgment stage.

Show a strong decision transition.

Possible states:

PUBLISH

or

REJECT

Do not make this feel like a human approval button.

The decision is AUTONOMOUS.

Use language such as:

AUTONOMOUS DECISION

EDITORIAL STANDARD
PASSED

DECISION
PUBLISH

or:

EDITORIAL STANDARD
NOT MET

DECISION
REJECTED

==================================================
9. WHY SELECTED / WHY REJECTED
==================================================

This is REQUIRED.

For published topics show:

WHY SELECTED

• High security relevance
• Strong evidence quality
• Low overlap with previous research
• Significant architectural implications

WHY IT MATTERS NOW

• Agentic systems are rapidly entering production
• Attack surface is expanding
• New deployment patterns increase exposure

VERIFIED SOURCES

[ source 01 ]
[ source 02 ]

For rejected topics show:

WHY REJECTED

• Promotional content
• Insufficient technical evidence
• Low security relevance
• Limited new information

Do NOT use giant paragraphs.

Use concise bullet points.

The rationale should be immediately scannable.

==================================================
10. REJECTED PATH
==================================================

Rejection is an important part of the autonomous intelligence.

Do NOT hide rejected topics.

When a topic is rejected:
- visually terminate the signal
- show a subtle red/error state
- show WHY REJECTED bullets
- show EDITORIAL STANDARD · NOT MET
- show SIGNAL · TERMINATED
- show ARTIFACT · NONE PUBLISHED
- return visually to OBSERVE

Animate the rejected signal fading/being terminated.

Then begin searching for the next signal.

This demonstrates actual editorial judgment.

==================================================
11. PUBLISH
==================================================

When a topic passes:

05 // PUBLISH

Show a research artifact being generated.

Use a polished editorial post card.

Include:

TITLE

POST CONTENT

WHY SELECTED

WHY IT MATTERS NOW

VERIFIED SOURCES

CONFIDENCE

CREATED AT

The post should appear with a subtle typing/reveal animation.

The final artifact should feel like something the autonomous persona genuinely produced.

Do NOT add social media likes, followers, engagement analytics or unnecessary features.

==================================================
12. MEMORY / RESEARCH HISTORY
==================================================

Create a major section lower in the same continuous page:

MEMORY / RESEARCH HISTORY

"Everything OCULUS-AI has chosen to publish."

This section is extremely important.

Previously generated/published posts must accumulate here.

Show multiple historical records.

Each record should include:

- publication timestamp
- title
- short post preview
- confidence
- novelty
- overlap
- WHY SELECTED
- WHY IT MATTERS NOW
- VERIFIED SOURCES

Example:

PUBLISHED 2 DAYS AGO · LATEST

AI Agent Permission Boundaries Are Failing In Production

NOVELTY 0.79
OVERLAP LOW
CONFIDENCE 91%

WHY SELECTED
• High security relevance
• Strong evidence
• Low memory overlap

WHY IT MATTERS NOW
• Agent frameworks are entering production
• Permission boundaries are becoming a major attack surface

VERIFIED SOURCES
2 VERIFIED

Make this section visually feel like persistent long-term memory.

Newly published posts should be added to this memory collection.

The frontend should be structured so that this data can later come from the backend feed endpoint.

==================================================
13. BACKEND INTEGRATION ARCHITECTURE
==================================================

DO NOT implement a fake backend that conflicts with my teammates' backend.

Create a clean frontend data/service adapter.

The frontend should be prepared to consume:

POST /api/agent/init

Request:

{
  "persona": {
    "name": "Ada",
    "domain": "AI Security"
  }
}

Response:

{
  "agentId": "abc-123"
}

Then consume:

GET /api/agent/feed?agentId=abc-123

Response:

{
  "posts": [
    {
      "id": "p7",
      "createdAt": "2026-08-07T10:30:00Z",
      "text": "...",
      "rationale": "...",
      "sources": [
        "https://..."
      ]
    }
  ]
}

Keep the backend integration isolated behind an adapter/service layer.

For development/demo mode, use mock data.

Make it extremely easy to replace the mock adapter with the real API.

DO NOT hard-code the frontend architecture around fake backend behavior.

==================================================
14. LIVE ACTIVITY TRACE
==================================================

Include a restrained right-side or secondary activity trace.

Example:

LIVE ACTIVITY TRACE

[00:39:51] INITIALIZING MEMORY INDEX
[00:39:52] EVALUATION ENGINE READY
[00:39:53] AUTONOMY ENABLED
[00:39:55] SCANNING SECURITY FRONTIER
[00:39:56] SOURCE DISCOVERED
[00:39:58] SIGNAL INGESTED
[00:40:01] MEMORY SEARCH
[00:40:04] EVIDENCE SYNTHESIS
[00:40:11] AUTONOMOUS DECISION
[00:40:16] DECISION: PUBLISH

Animate new events appearing.

Keep this subtle and not overwhelming.

==================================================
15. INTELLIGENCE FIELD
==================================================

Retain the animated particle/network field from the existing design.

But reduce visual noise.

It should behave like an abstract intelligence map.

Features:
- slowly moving nodes
- subtle connections
- occasional signal pulses
- active node highlighting
- different density during Observe/Evaluate
- subtle state changes during Decision
- gentle animation during idle state

Never let the background compete with the content.

==================================================
16. ANIMATION QUALITY
==================================================

The current prototype needs significantly more life.

Add sophisticated but restrained animation throughout:

- scroll-triggered section reveals
- smooth state transitions
- active checkpoint illumination
- pipeline progress animation
- signal ingestion animation
- memory lookup animation
- confidence number counting
- evidence indicators appearing sequentially
- decision transition
- publish typing animation
- rejected signal termination animation
- memory record insertion
- cycle completion animation
- scheduler countdown
- subtle particle movement
- node connections
- ambient glow
- micro-interactions
- slight parallax
- sticky checkpoint navigation

The site should feel ALIVE even when the user is not interacting.

Avoid excessive bouncing, spinning, neon effects or gimmicky animations.

This should feel like a serious autonomous intelligence system.

==================================================
17. RESPONSIVE DESIGN
==================================================

The main target is desktop/laptop judging.

Optimize the primary experience for approximately:

1280–1440px desktop width.

Also make it responsive.

On smaller screens:
- simplify the side rail
- stack content
- preserve the pipeline sequence
- preserve the core visual identity

==================================================
18. VISUAL HIERARCHY
==================================================

Follow this hierarchy strictly:

1. OCULUS-AI
2. Current autonomous state
3. Current pipeline stage
4. Signal/topic
5. Evidence/decision
6. Rationale
7. Technical telemetry

Do NOT allow small metadata labels to become giant hero headlines.

In particular:

"AUTONOMOUS CYBERSECURITY RESEARCHER"

must remain a small identity descriptor.

==================================================
19. WHAT NOT TO ADD
==================================================

Do NOT add:
- unnecessary dashboards
- generic analytics
- social media follower counts
- likes
- comments
- engagement charts
- random cards
- unnecessary navigation
- multiple pages for pipeline stages
- fake settings pages
- excessive text
- generic SaaS components
- meaningless metrics

Every element must reinforce the story:

DISCOVER → REMEMBER → EVALUATE → DECIDE → PUBLISH/REJECT → REMEMBER → REPEAT

==================================================
20. FINAL EXPERIENCE
==================================================

The final website should feel like:

"I initialized an autonomous AI researcher, and now I am watching it think, remember, judge, publish, reject, and continue operating without me."

The judge should understand the entire challenge within 30–60 seconds of scrolling.

The experience should visually demonstrate:

AUTONOMY
EDITORIAL JUDGMENT
MEMORY
CONSISTENCY
PERSISTENCE
TRANSPARENCY

Use the provided reference screens as the visual foundation, but substantially polish and expand the frontend into a complete hackathon-quality prototype.

Most importantly:

DO NOT make it look bigger by adding useless content.

Make it feel bigger by making the autonomous process deeper, more animated, more coherent, and more believable.

---

## 2. Frontend Iteration Prompts

### 2.1 Interactive 3D Intelligence Environment

Create an interactive 3D Oculus-AI THREAT SURFACE screen.

This is the autonomous cybersecurity research environment Oculus-AI continuously observes.

Build a spatial 3D network containing:
SECURITY RESEARCH
VULNERABILITY DATABASES
THREAT INTELLIGENCE
SECURITY ADVISORIES
CODE REPOSITORIES
SECURITY TELEMETRY
RESEARCH PAPERS

The network must be interactive:

- orbit the threat surface
- zoom through different depth layers
- hover a source to reveal its status
- click a source to inspect recent signals
- active sources show a restrained cyan state
- related sources become connected when a signal crosses them
- inactive sources remain quiet

Show a selected source:

SOURCE ACTIVE
LAST INGEST
SIGNALS DETECTED
RELEVANCE

Pipeline:
OBSERVE [ACTIVE] → REMEMBER → EVALUATE → DECIDE → PUBLISH

The user should feel like they are physically inspecting Oculus-AI's cybersecurity intelligence environment.

No world map.
No generic SOC dashboard.
No decorative 3D objects.

### 2.2 Visual Identity / Living Research Instrument

OCULUS-AI — DISTINCTIVE VISUAL IDENTITY

IMPORTANT:

The previous visual direction was too conventional.

Do NOT create another generic dark AI dashboard.

Do NOT create a standard cybersecurity interface.

Do NOT use the common visual formula:

black background + neon blue + glowing cards + futuristic effects.

We are deliberately creating a distinctive visual language for
Oculus-AI.

Oculus-AI is an autonomous AI cybersecurity researcher.

It watches the technology frontier.

It discovers signals.

It remembers previous coverage.

It evaluates evidence.

It makes editorial decisions.

It publishes only what it believes matters.

The interface should feel like a living research instrument.

The user's feeling should be:

"I am observing an intelligence system investigate and make decisions."

Not:

"I am looking at an AI SaaS dashboard."

Treat the interface as an INFORMATION FIELD.

Information should appear connected through:

- signal paths
- relationships
- evidence
- memory
- decisions
- sources

Do not organize every piece of information into a conventional
collection of floating cards.

Use:

- editorial whitespace
- asymmetric information blocks
- thin structural lines
- precise alignment
- signal paths
- typographic hierarchy
- contextual surfaces
- deliberate empty space

The interface should feel designed around information flow.

Use a distinctive palette.

PRIMARY ENVIRONMENT:

Obsidian
#08090D

Deep Ink
#0D1017

Charcoal
#151922

Do NOT make everything pure black.

==================================================
PRIMARY TEXT

Use a warm off-white / bone rather than pure white.

Bone
#E8E4DA

Secondary text:

Ash
#8F96A3

==================================================
SIGNAL COLOR

Use ELECTRIC CYAN as the primary live-system signal.

Cyan
#4DE3FF

This represents:

LIVE SIGNAL
ACTIVE RESEARCH
CURRENT AUTONOMOUS MOVEMENT

It should be bright enough to identify system activity but should NOT
be used everywhere.

==================================================
MEMORY COLOR

Use ULTRAVIOLET for memory relationships.

Ultraviolet
#9B7CFF

This represents:

MEMORY
PREVIOUS COVERAGE
RELATIONSHIPS
CONTEXT

Do not turn the interface purple.

Use it only when memory is actually relevant.

==================================================
EVALUATION COLOR

Use WARM AMBER for evaluation and uncertainty.

Amber
#F0B35B

This represents:

EVALUATING
UNCERTAINTY
ATTENTION
EDITORIAL CONSIDERATION

==================================================
PUBLICATION COLOR

Use MUTED MINT for confirmed publication.

Mint
#72D6B0

This represents:

PUBLISHED
CONFIRMED
COMMITTED RESULT

Do not use generic bright green.

==================================================
REJECTION COLOR

Use muted coral rather than generic error red.

Coral
#E87575

This represents:

REJECTED
INTENTIONALLY NOT PUBLISHED

Rejection must never look like a software failure.

==================================================
COLOR RULE

Colors are SEMANTIC.

Do not use them simply because they look pretty.

Cyan = live signal
Violet = memory
Amber = evaluation
Coral = rejection
Mint = publication

If nothing is happening, the interface should become mostly:

Obsidian
Charcoal
Bone
Ash

This creates contrast when something actually happens.

The interface should feel:

unusual
precise
quiet
intelligent
technical
editorial
premium
observational

Avoid:

cyberpunk
hacker clichés
gaming UI
neon overload
sci-fi HUD clichés
glassmorphism
gradient-heavy SaaS
generic AI dashboards
excessive rounded cards
decorative particles
floating blobs

Do not try to make the interface distinctive through decoration.

Make it distinctive through:

INFORMATION FLOW
+
COLOR SEMANTICS
+
TYPOGRAPHY
+
ASYMMETRIC COMPOSITION
+
AUTONOMOUS STATE
+
MEMORY RELATIONSHIPS
+
EDITORIAL DECISIONS

The Autonomous Pipeline must become the signature visual element:

OBSERVE → REMEMBER → EVALUATE → DECIDE → PUBLISH

It should feel like an actual process occurring inside the interface.

Do not design the entire application yet.

First establish this visual identity and show representative examples
of:

- background
- surface
- typography
- signal
- memory
- evaluation
- rejection
- publication

We want a visual system that would be immediately recognizable as
Oculus-AI even if the logo were removed.
OCULUS-AI — LIVING RESEARCH INSTRUMENT

Using the approved visual identity, create the first visual prototype
of the Oculus-AI research environment.

Do NOT make a conventional dashboard.

The interface should feel like an information field in which an
autonomous researcher is currently operating.

Create the Autonomous Pipeline:

OBSERVE → REMEMBER → EVALUATE → DECIDE → PUBLISH

Do not render it as five generic cards.

Instead, treat it as a connected research pathway.

Each stage should have:

- a node
- a label
- contextual state
- a connection
- meaningful state change

Use the semantic colors:

CYAN
live signal / active research

VIOLET
memory

AMBER
evaluation

CORAL
rejection

MINT
publication

The idle interface must be almost completely still.

The pipeline is visible but quiet.

No glowing animation.

No moving particles.

No scanning.

No fake activity.

The visual field should contain enough empty space that real activity
will feel significant when it occurs.

When a real signal is detected:

A restrained cyan signal travels into OBSERVE.

The cyan signal then moves through the pipeline as the backend
progresses.

The interface should feel like information is moving through an
intelligence system.

Not like a laser.

Not like cyberpunk energy.

When memory is actually queried:

REMEMBER becomes violet.

Related previous observations may appear as subtle connected
relationships around the current signal.

These relationships should disappear or settle once the memory
operation completes.

Memory should feel like CONTEXT being retrieved.

When evaluation begins:

EVALUATE becomes amber.

Show relevant evidence or editorial context.

The amber state should feel deliberate rather than alarming.

When the decision resolves:

PUBLISH:

DECIDE → PUBLISH

The final publication state becomes muted mint.

REJECT:

DECIDE ✕

The signal terminates.

DECIDE becomes muted coral.

PUBLISH remains inactive.

The visual message is:

"Oculus-AI considered this and deliberately chose not to publish."

Do not use a page made entirely from equal rectangular cards.

Create hierarchy using:

- scale
- whitespace
- lines
- typography
- positioning
- contextual surfaces
- information density

The current signal should have visual dominance.

Secondary information should orbit the research object without
becoming decorative.

Only meaningful motion.

Allowed:

Signal Movement
Status Pulse
Publication Reveal
Memory Retrieval
Source Activation
Decision Transition

No additional decorative animation.

Every animation must correspond to a real system event.

If the Oculus-AI logo is removed, the interface should still feel
distinctive.

A viewer should recognize:

"This is an autonomous research system."

not:

"This is another AI dashboard."
# Oculus-AI — Prompt Registry & AI System Documentation

> **Project:** Oculus-AI  
> **Purpose:** Autonomous AI Systems & Cybersecurity Analyst  
> **Repository:** Oculus-AI  
> **Document:** `prompts.md`  
> **Status:** Development → Production Preparation

---

# 1. Overview

Oculus-AI is an autonomous AI journalism and cybersecurity intelligence system designed to:

1. Discover relevant information from the live web.
2. Collect and normalize candidate articles.
3. Prevent duplicate/repetitive coverage using persistent memory.
4. Apply AI-driven editorial judgment.
5. Generate concise technical briefings.
6. Publish selected briefings.
7. Execute autonomously on a controlled schedule.
8. Maintain separate testing and production personas.

The system follows the principle:

> **"Signal over hype. Systems over headlines."**

The primary agent persona is:

> **AI Systems & Cybersecurity Analyst**

---

# 2. Prompt Architecture

The prompts in Oculus-AI are divided into several functional layers:

```text
                    Oculus-AI
                       │
          ┌────────────┴────────────┐
          │                         │
    Discovery Layer          Editorial Layer
          │                         │
   Search prompts             Evaluation
          │                         │
     Tavily/Web               Selection
          │                         │
     Firecrawl               Generation
          │                         │
          └────────────┬────────────┘
                       │
                  Agent Memory
                       │
                 Publishing
```

The major prompt categories are:

| ID | Prompt Category | Primary Tool |
|---|---|---|
| P-01 | Project Architecture / Agent Specification | Antigravity |
| P-02 | Supabase Agent & Memory Setup | Supabase + Antigravity |
| P-03 | Backend Discovery API | Next.js |
| P-04 | Frontend ↔ Backend Integration | Next.js + Vercel |
| P-05 | Agent Personas | Supabase + LLM |
| P-06 | Scheduling / START / STOP | Next.js + Supabase |
| P-07 | Token & Execution Guardrails | LLM/API layer |
| P-08 | RSS Discovery | RSS + Next.js |
| P-09 | Dynamic Web Discovery | Tavily |
| P-10 | Web Content Extraction | Firecrawl |
| P-11 | Editorial Judgment | Groq |
| P-12 | Technical Briefing Generation | Groq |
| P-13 | Memory / Deduplication | Supabase |
| P-14 | Publishing | Backend |
| P-15 | Manual E2E Testing | PowerShell |
| P-16 | Production Deployment | Vercel |
| P-17 | Feature Extension Prompts | Antigravity |

---

# 3. P-01 — Oculus-AI Core Architecture Prompt

**Status:** Reconstructed from the original project-development process.

**Purpose:** Define the overall Oculus-AI architecture and establish the autonomous-agent pipeline.

**Tool:** Antigravity / coding agent

### Prompt

> Build Oculus-AI as an autonomous AI Systems & Cybersecurity Analyst.
>
> The system must discover current information, evaluate its relevance, use persistent agent memory, apply editorial judgment, generate technical briefings, and publish selected content.
>
> The architecture must separate:
>
> - discovery
> - persistence
> - memory
> - editorial judgment
> - generation
> - publishing
> - scheduling
> - frontend control
>
> Use Next.js for the application/backend layer and Supabase for persistent data and agent state.
>
> The system must support autonomous execution while remaining bounded and controllable.

### Intended pipeline

```text
Discovery
    ↓
Persistence
    ↓
Memory
    ↓
Editorial Judgment
    ↓
Generation
    ↓
Publishing
```

---

# 4. P-02 — Supabase Agent Infrastructure Prompt

**Status:** Reconstructed.

**Purpose:** Establish persistent agents, memory, topics, runs, and related state in Supabase.

**Tools:**

- Supabase
- Antigravity
- PostgreSQL

### Prompt

> Configure the Supabase database for Oculus-AI.
>
> Create the required persistent structures for:
>
> - agents
> - agent configuration
> - agent memory
> - discovered topics/articles
> - editorial evaluations
> - generated posts
> - run history
> - scheduling state
>
> Ensure that each agent can maintain independent memory and execution state.
>
> Avoid storing temporary runtime state that would be lost when the backend restarts.

---

# 5. P-03 — Agent Memory Prompt

**Status:** Reconstructed.

**Purpose:** Give each Oculus agent persistent memory.

**Tools:**

- Supabase
- Next.js backend
- LLM

### Prompt

> Implement persistent memory for Oculus-AI.
>
> The agent should be able to use previous discoveries, topics, decisions, and relevant historical information when evaluating new articles.
>
> Memory must persist between execution cycles and backend restarts.
>
> The system should use memory to:
>
> - identify previously covered topics
> - reduce duplicate coverage
> - understand recent editorial history
> - provide context for future decisions
> - improve future search and selection
>
> Memory must remain isolated by agent ID.

---

# 6. P-04 — Editorial Judgment Prompt

**Location:**

`Backend/lib/editorial/evaluator.ts`

**Tool:** Groq LLM

**Purpose:** Evaluate discovered articles and determine whether they meet Oculus-AI's publication standard.

### System Prompt

> You are an elite editorial judgment engine for "Oculus AI".
>
> Your domain expertise: AI Systems & Cybersecurity Analyst.
>
> Your editorial philosophy: "Signal over hype. Systems over headlines."
>
> Your task is to critically evaluate a single discovered article/topic for publication.
>
> CRITICAL INSTRUCTIONS:
>
> - Be highly skeptical of marketing buzzwords, PR fluff, and speculative AI hype.
> - Prefer technically meaningful engineering developments, architecture changes, security vulnerabilities, research, and real-world system implementations.
> - Reject low-information promotional announcements or repetitive topics.
> - Base your evaluation STRICTLY on the article title, source, and summary provided. Do NOT invent information or external facts.
>
> SCORING RUBRIC (Total = 100 points):
>
> 1. Domain relevance (0 - 30 points): How strongly does it relate to AI systems, cybersecurity, AI infrastructure, AI agents, ML systems, or the intersection of AI and security?
> 2. Technical significance (0 - 25 points): Does it contain meaningful technical information, architecture changes, research findings, engineering specs, or security vulnerabilities?
> 3. Impact (0 - 20 points): Could this materially affect developers, researchers, organizations, infrastructure, or cybersecurity?
> 4. Novelty (0 - 15 points): Does it present genuinely new information rather than repeating well-known facts/news?
> 5. Timeliness (0 - 10 points): Is this current and worth discussing right now?
>
> PUBLISHING THRESHOLD:
>
> - Score >= 75 points → PUBLISH
> - Score < 75 points → REJECT
>
> OUTPUT FORMAT:
>
> Respond with a valid JSON object matching this structure:
>
> ```json
> {
>   "decision": "publish" | "reject",
>   "score": number,
>   "breakdown": {
>     "domainRelevance": number,
>     "technicalSignificance": number,
>     "impact": number,
>     "novelty": number,
>     "timeliness": number
>   },
>   "reason": "concise, sharp explanation of the editorial decision"
> }
> ```

---

# 7. P-05 — Technical Briefing Generator

**Location:**

`Backend/lib/editorial/post-generator.ts`

**Tool:** Groq LLM

**Purpose:** Transform editorially approved articles into concise technical briefings.

### System Prompt

> You are "Oculus AI", an autonomous threat intelligence and AI security research agent.
>
> Your mission is to craft concise, high-signal technical research briefings for developers, security architects, and AI researchers.
>
> POST STYLE GUIDELINES:
>
> - Tone: Analytical, sharp, authoritative, and objective.
> - Keep the main post text under 120 words.
> - Highlight technical implications such as CVE impacts, LLM permission boundaries, and infrastructure exposure.
> - Avoid fluff, hype, or conversational filler.
>
> OUTPUT FORMAT:
>
> Respond with a valid JSON object matching this structure:
>
> ```json
> {
>   "text": "The main technical briefing post summary (under 120 words)",
>   "rationale": "Why this specific article passed the editorial threshold and why it matters",
>   "whySelected": [
>     "Key reason 1",
>     "Key reason 2",
>     "Key reason 3"
>   ],
>   "whyItMattersNow": [
>     "Immediate impact point 1",
>     "Immediate impact point 2"
>   ]
> }
> ```

---

# 8. P-06 — RSS Discovery Prompt

**Location:**

`Backend/lib/discovery/sources.ts`

**Tools:**

- RSS
- Next.js backend

**Purpose:** Define trusted baseline sources for article discovery.

### Prompt

> Maintain a reliable set of trusted RSS/news sources relevant to AI systems, cybersecurity, AI infrastructure, and related technical developments.
>
> Discovery must normalize all sources into a common article structure containing:
>
> - title
> - URL
> - source
> - publishedAt
> - summary
>
> Do not send raw RSS structures directly into editorial judgment.

---

# 9. P-07 — `/api/discover` Prompt

**Location:**

`Backend/app/api/discover/route.ts`

**Purpose:** Create the backend discovery endpoint.

**Tools:**

- Next.js
- Supabase
- RSS discovery

### Behavior

```text
GET /api/discover
```

returns live discovered articles without persistence.

```text
GET /api/discover?agentId=<ID>
```

discovers articles and persists topics for the specified agent.

### Existing behavior

```text
discoverArticles()
        ↓
articles
        ↓
if no agentId
        ↓
return articles
```

With an agent:

```text
discoverArticles()
        ↓
verify agent
        ↓
persistTopics(agentId, articles)
        ↓
return results
```

---

# 10. P-08 — Supabase Environment Configuration Prompt

**Status:** Reconstructed.

**Purpose:** Resolve backend configuration and ensure Supabase credentials are correctly loaded.

**Tools:**

- Supabase
- Next.js
- `.env.local`

### Required local variables

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

### Important rule

Server/API keys must never be exposed to the frontend unnecessarily.

---

# 11. P-09 — Oculus Test Persona

**Purpose:** Create a safe staging/testing agent.

**Agent:**

`Oculus Test`

**Role:**

AI Systems & Cybersecurity Analyst

**Purpose:**

Testing the complete pipeline without production publishing.

### Requirements

```text
Oculus Test
    ↓
same discovery sources
    ↓
separate memory
    ↓
separate run history
    ↓
separate state
    ↓
NO production publishing
```

---

# 12. P-10 — Oculus AI Production Persona

**Purpose:** Define the production agent.

**Agent:**

`Oculus AI`

**Role:**

AI Systems & Cybersecurity Analyst

**Purpose:**

Production autonomous intelligence and publishing.

### Requirements

```text
Oculus AI
    ↓
same discovery sources
    ↓
independent memory
    ↓
independent state
    ↓
independent run history
    ↓
production publishing
```

---

# 13. P-11 — Six-Agent Cleanup / Migration Prompt

**Status:** Reconstructed.

**Purpose:** Safely reduce the existing six Supabase agents to the desired two.

### Prompt

> Inspect all existing records in the Supabase `agents` table.
>
> The final system should contain:
>
> 1. Oculus Test
> 2. Oculus AI
>
> Before deleting any other agents, search the entire codebase for references to their IDs.
>
> Do not blindly delete agents.
>
> Preserve or migrate any required configuration, memory, or relationships.
>
> Remove obsolete agents only when it is confirmed that they are not required by the application.

---

# 14. P-12 — START/STOP Agent Control Prompt

**Status:** Reconstructed.

**Purpose:** Prevent uncontrolled autonomous execution.

### Requirements

START:

```text
START
 ↓
persist scheduling enabled
 ↓
agent active
 ↓
set next_run_at
```

STOP:

```text
STOP
 ↓
disable scheduling
 ↓
prevent future cycles
 ↓
preserve memory/history
```

The backend must enforce the stopped state.

---

# 15. P-13 — 15-Minute Scheduler Prompt

**Status:** Reconstructed.

**Purpose:** Implement bounded autonomous execution.

### Prompt

> Implement a deployment-compatible 15-minute scheduler for Oculus-AI.
>
> Do not use an infinite loop.
>
> Do not rely on a permanently running `setInterval()` process for production.
>
> The scheduler should:
>
> 1. Find enabled agents.
> 2. Determine whether `next_run_at` is due.
> 3. Safely claim a cycle.
> 4. Execute exactly one bounded cycle.
> 5. Update `last_run_at`.
> 6. Calculate `next_run_at`.
> 7. Record success or failure.
> 8. Release the run lock.
>
> Multiple scheduler invocations must not execute the same agent cycle simultaneously.

---

# 16. P-14 — Token/API Protection Prompt

**Status:** Reconstructed.

**Purpose:** Prevent runaway API and LLM usage.

### Requirements

Every cycle should have configurable limits for:

- searches
- search results
- crawled pages
- LLM evaluations
- generated outputs
- retries
- execution duration
- API/token budget where supported

A cycle must always terminate.

A cycle must never recursively trigger another cycle.

---

# 17. P-15 — Dynamic Search Strategy Prompt

**Status:** Reconstructed / extension of the original discovery architecture.

**Purpose:** Allow Oculus-AI to dynamically determine what information to investigate.

### Architecture

```text
Agent Memory
      ↓
Recent coverage
      ↓
Search strategy
      ↓
Dynamic queries
      ↓
Tavily
```

The agent should be able to generate search topics based on:

- current interests
- recent discoveries
- missing coverage
- cybersecurity developments
- AI systems developments
- emerging threats

---

# 18. P-16 — Tavily Search Prompts

**Location:**

`Backend/lib/discovery/web-search.ts`

**Tool:** Tavily

**Purpose:** Dynamic live-web discovery.

### Current queries

```text
latest AI systems cybersecurity vulnerabilities zero day exploit 2026

frontier LLM security agent permission boundaries breakthrough

cloud infrastructure ransomware CVE advisory threat intelligence

AI model hijacking prompt injection vulnerability research 2026
```

### Intended architecture

```text
Oculus AI
   ↓
Search strategy
   ↓
Tavily
   ↓
Candidate URLs
```

Tavily is the discovery engine rather than the final editorial authority.

---

# 19. P-17 — Firecrawl Extraction Prompt

**Location:**

`Backend/lib/discovery/web-search.ts`

**Tool:** Firecrawl

**Purpose:** Extract useful content from discovered web pages.

### Intended pipeline

```text
Tavily
   ↓
URL
   ↓
Firecrawl
   ↓
Clean page content
   ↓
Article normalization
   ↓
Editorial judgment
```

Firecrawl should not replace the editorial LLM.

---

# 20. P-18 — Dynamic Discovery + RSS Hybrid Prompt

**Status:** Reconstructed.

**Purpose:** Combine trusted feeds with dynamic discovery.

### Architecture

```text
              Discovery Engine
                     │
        ┌────────────┼────────────┐
        ↓            ↓            ↓
       RSS         Tavily      Firecrawl
     Sources       Search      Extraction
        │            │            │
        └────────────┼────────────┘
                     ↓
             Normalize Articles
                     ↓
               Deduplicate
                     ↓
                  Supabase
```

RSS remains useful as a trusted baseline.

Tavily expands discovery beyond manually maintained sources.

Firecrawl provides deeper extraction.

---

# 21. P-19 — Deduplication Prompt

**Status:** Reconstructed.

**Purpose:** Prevent multiple sources covering the same event from creating repetitive posts.

### Requirements

Deduplication should operate at multiple levels:

```text
URL
 ↓
canonical URL
 ↓
title similarity
 ↓
content/topic similarity
 ↓
existing Supabase records
 ↓
agent memory
```

The system should distinguish between:

- genuinely new stories
- follow-up reporting
- duplicate reporting
- materially different analysis of the same event

---

# 22. P-20 — Frontend ↔ Backend Integration Prompt

**Status:** Reconstructed.

**Purpose:** Connect the Next.js frontend on port 3000 to the backend on port 3001.

### Local architecture

```text
Frontend
http://localhost:3000
        ↓
Backend
http://localhost:3001
```

### Recommended environment variable

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Production should use the deployed backend URL.

The backend URL should not be scattered as hardcoded strings throughout the frontend.

---

# 23. P-21 — Vercel Deployment Prompt

**Status:** Reconstructed.

**Tool:** Vercel

**Purpose:** Deploy frontend/backend and configure production environment variables.

### Requirements

Configure production environment variables separately from local `.env.local`.

Verify:

```text
Frontend
    ↓
Production backend
    ↓
Supabase
    ↓
Tavily / Firecrawl / Groq
```

Do not expose private API keys to the browser.

---

# 24. P-22 — Manual Single-Cycle Test Prompt

**Purpose:** Test one controlled agent cycle without starting continuous automation.

**Tool:** PowerShell

### Manual discovery test

```powershell
Invoke-RestMethod -Uri "http://localhost:3001/api/discover"
```

### JSON output

```powershell
Invoke-RestMethod -Uri "http://localhost:3001/api/discover" | ConvertTo-Json -Depth 10
```

This was successfully used to verify live discovery.

The successful result returned:

```text
count: 50
persisted: false
```

---

# 25. P-23 — Agent Run Test Prompt

**Purpose:** Execute one complete agent cycle manually.

**Endpoint:**

```text
GET /api/agent/run
```

### Command

```powershell
Invoke-RestMethod -Uri "http://localhost:3001/api/agent/run"
```

The intended test is:

```text
ONE RUN
   ↓
Discovery
   ↓
Memory
   ↓
Editorial Judgment
   ↓
Generation
   ↓
Persistence
   ↓
STOP
```

The agent should not be left running continuously during development testing.

---

# 26. P-24 — Manual End-to-End Testing Prompt

**Status:** Reconstructed.

**Purpose:** Verify the entire pipeline manually before production deployment.

### Test procedure

1. Start backend.
2. Start frontend.
3. Open the frontend.
4. Select **Oculus Test**.
5. Trigger exactly one cycle.
6. Verify discovery.
7. Verify Supabase persistence.
8. Verify memory.
9. Verify editorial judgment.
10. Verify generated briefing.
11. Verify publishing behavior.
12. Press STOP.
13. Verify no future cycle is scheduled.
14. Shut down frontend/backend.
15. Inspect Supabase run history.

---

# 27. P-25 — Production Safety Test

**Status:** Reconstructed.

**Purpose:** Ensure Oculus Test cannot accidentally publish production content.

### Requirements

```text
Oculus Test
    ↓
test pipeline
    ↓
test/staging output
```

while:

```text
Oculus AI
    ↓
production pipeline
    ↓
production publishing
```

Publishing permissions should be determined server-side using agent configuration/state rather than relying only on frontend controls.

---

# 28. P-26 — Feature Addition: New Information Sources

**Tool:** Antigravity

### Prompt

> We need to add new real-time threat sources for Kubernetes and Cloud Security. Please update `Backend/lib/discovery/sources.ts` and `Backend/lib/discovery/web-search.ts` to include feeds for Kubernetes Security Advisories, Trend Micro Research, and Palo Alto Unit 42.

---

# 29. P-27 — Feature Addition: Editorial Persona

**Tool:** Antigravity + Groq

### Prompt

> Change the editorial persona focus from general AI security to strict Cloud Native & Infrastructure Defense. Update the system prompt in `evaluator.ts` so domain relevance prioritizes container security, IAM misconfigurations, and cloud data leaks.

---

# 30. P-28 — Feature Addition: Severity Filter

**Tool:** Antigravity + Next.js frontend

### Prompt

> Add a severity filter dropdown (CRITICAL / HIGH / MEDIUM) in the frontend header and update `useAgentStore.tsx` to filter the displayed post feed dynamically.

---

# 31. P-29 — Feature Addition: CSV / JSON Export

**Tool:** Antigravity + Next.js

### Prompt

> Add an Export Briefings button in `DemoSchedulerHeader.tsx` that downloads the active Supabase posts array as a formatted JSON or CSV file.

---

# 32. P-30 — Feature Addition: Webhook Publishing

**Tool:** Antigravity + Backend

### Prompt

> Create a new endpoint `POST /api/publish/webhook` that triggers an outbound POST request with the generated briefing payload to a configured Slack or Discord Webhook URL whenever a post is published.

---

# 33. P-31 — Agentic Search Extension

**Status:** Planned architecture.

**Purpose:** Move Oculus-AI beyond a static list of websites.

### Intended behavior

```text
Agent Memory
      ↓
What have I already covered?
      ↓
What is currently important?
      ↓
What should I investigate?
      ↓
Generate search queries
      ↓
Tavily
      ↓
Firecrawl
      ↓
Editorial Judgment
```

This makes discovery adaptive rather than purely source-driven.

---

# 34. P-32 — Bounded Autonomous Cycle

**Purpose:** Define the fundamental execution unit of Oculus-AI.

### One cycle

```text
START
  ↓
Load agent configuration
  ↓
Load memory
  ↓
Generate search strategy
  ↓
Search web/RSS
  ↓
Collect candidates
  ↓
Deduplicate
  ↓
Evaluate candidates
  ↓
Select relevant stories
  ↓
Generate briefings
  ↓
Persist results
  ↓
Publish where authorized
  ↓
Update memory
  ↓
Update run state
  ↓
END
```

There should be no infinite loop inside a cycle.

---

# 35. P-33 — Production Scheduler Architecture

**Purpose:** Production-safe autonomous execution.

### Desired architecture

```text
External Cron / Scheduler
            ↓
     Backend scheduler
            ↓
       Agent state
            ↓
     Is agent enabled?
        /       \
      NO         YES
      ↓           ↓
    EXIT       Is due?
                  ↓
             Run one cycle
                  ↓
            Update schedule
```

The scheduler should be stateless between invocations wherever possible.

Persistent scheduling state belongs in Supabase.

---

# 36. P-34 — STOP Safety Prompt

**Purpose:** Ensure STOP is a real backend control rather than a UI-only feature.

### Requirements

When STOP is pressed:

```text
schedule_enabled = false
```

The scheduler must check that state before starting a cycle.

If a scheduler request arrives immediately after STOP, it must refuse to launch a new cycle.

Existing memory/history must remain intact.

---

# 37. P-35 — Final Deployment Gate

**Status:** Reconstructed.

**Purpose:** Prevent premature deployment.

### Deployment should only occur after:

```text
Frontend works
        ↓
Backend works
        ↓
Supabase works
        ↓
Discovery works
        ↓
Memory works
        ↓
Editorial judgment works
        ↓
Generation works
        ↓
Oculus Test works
        ↓
START/STOP works
        ↓
15-minute scheduler works
        ↓
Token limits verified
        ↓
Production publishing verified
        ↓
Deploy
```

---

# 38. Tools & Services Used

## Antigravity

Primary coding/development agent.

Used for:

- code generation
- project architecture
- feature implementation
- frontend/backend integration
- database integration
- scheduler implementation
- refactoring
- deployment preparation

---

## Next.js

Used for:

- frontend
- backend API routes
- `/api/discover`
- agent execution endpoints
- publishing endpoints
- frontend/backend integration

Local ports:

```text
Frontend → 3000
Backend  → 3001
```

---

## Supabase

Used for:

- agents
- persistent agent state
- memory
- topics/articles
- editorial data
- run history
- scheduling state

---

## Groq

Used as the primary LLM provider for:

- editorial judgment
- article scoring
- publication decisions
- technical briefing generation

---

## Tavily

Used for:

- live web search
- dynamic discovery
- finding relevant articles beyond manually configured RSS sources
- generating a wider candidate pool

Required server environment variable:

```env
TAVILY_API_KEY=...
```

---

## Firecrawl

Used for:

- web-page extraction
- cleaning discovered pages
- obtaining richer article content
- feeding useful page content into downstream analysis

Required server environment variable:

```env
FIRECRAWL_API_KEY=...
```

---

## RSS

Used for:

- trusted baseline discovery
- known technical sources
- reliable recurring information feeds

---

## Vercel

Used for:

- deployment
- production hosting
- environment variables
- production frontend/backend infrastructure

---

## PowerShell

Used for:

- local API testing
- manual agent execution
- backend endpoint verification

Example:

```powershell
Invoke-RestMethod -Uri "http://localhost:3001/api/discover"
```

---

# 39. Environment Variables

## Local

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...

TAVILY_API_KEY=...
FIRECRAWL_API_KEY=...

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Additional Groq/server-side variables should remain server-only according to the existing implementation.

Never commit actual secret values.

---

# 40. Prompt → Tool → Function Map

| Prompt | Tool | Function |
|---|---|---|
| P-01 | Antigravity | Overall architecture |
| P-02 | Supabase | Database |
| P-03 | Supabase + LLM | Agent memory |
| P-04 | Groq | Editorial scoring |
| P-05 | Groq | Briefing generation |
| P-06 | RSS | Baseline discovery |
| P-07 | Next.js | Discovery API |
| P-08 | Supabase | Environment/config |
| P-09 | Supabase | Oculus Test |
| P-10 | Supabase | Oculus AI |
| P-11 | Supabase + Antigravity | Agent cleanup |
| P-12 | Next.js + Supabase | START/STOP |
| P-13 | Cron + Next.js | Scheduling |
| P-14 | LLM APIs | Token protection |
| P-15 | LLM | Search strategy |
| P-16 | Tavily | Web discovery |
| P-17 | Firecrawl | Web extraction |
| P-18 | RSS + Tavily + Firecrawl | Hybrid discovery |
| P-19 | Supabase + LLM | Deduplication |
| P-20 | Next.js | Frontend/backend |
| P-21 | Vercel | Deployment |
| P-22 | PowerShell | Discovery testing |
| P-23 | PowerShell | Agent-cycle testing |
| P-24 | Full stack | E2E testing |
| P-25 | Supabase + Backend | Production safety |
| P-26 | Antigravity | New sources |
| P-27 | Groq + Antigravity | Persona modification |
| P-28 | Next.js | UI filtering |
| P-29 | Next.js | Data export |
| P-30 | Backend | Webhook publishing |
| P-31 | Tavily + LLM | Agentic discovery |
| P-32 | Full stack | Bounded cycle |
| P-33 | Cron + Supabase | Production scheduler |
| P-34 | Backend + Supabase | STOP safety |
| P-35 | Vercel | Deployment gate |

---

# 41. Final Oculus-AI Prompt Pipeline

The complete AI decision pipeline is:

```text
                    ┌───────────────┐
                    │    Scheduler  │
                    └───────┬───────┘
                            ↓
                    ┌───────────────┐
                    │ Agent Config  │
                    └───────┬───────┘
                            ↓
                    ┌───────────────┐
                    │ Agent Memory  │
                    └───────┬───────┘
                            ↓
                    ┌───────────────┐
                    │Search Strategy│
                    └───────┬───────┘
                            ↓
              ┌─────────────┼─────────────┐
              ↓             ↓             ↓
             RSS          Tavily       Firecrawl
              │             │             │
              └─────────────┼─────────────┘
                            ↓
                    ┌───────────────┐
                    │ Normalize &   │
                    │ Deduplicate   │
                    └───────┬───────┘
                            ↓
                    ┌───────────────┐
                    │   Supabase    │
                    └───────┬───────┘
                            ↓
                    ┌───────────────┐
                    │   Editorial   │
                    │   Judgment    │
                    └───────┬───────┘
                            ↓
                       Score ≥ 75?
                       /          \
                     NO            YES
                     ↓              ↓
                  Reject       Post Generator
                                    ↓
                              Technical Brief
                                    ↓
                              Publish Decision
                                    ↓
                              Update Memory
                                    ↓
                               End Cycle
```

---

# 42. Design Philosophy

Oculus-AI is intentionally designed around five principles:

### 1. Signal over hype

The system should prioritize technically meaningful information rather than marketing announcements.

### 2. Systems over headlines

The editorial layer should focus on what actually changed technically.

### 3. Memory over repetition

The agent should remember what it has already covered.

### 4. Autonomy with boundaries

Autonomous does not mean unrestricted.

Every cycle must have:

- time limits
- API limits
- search limits
- execution boundaries
- persistent state

### 5. Human-controlled activation

The operator must retain the ability to:

```text
START
STOP
TEST
DEPLOY
```

without destroying the agent's memory or state.

---

# 43. Final Project State

The intended final Oculus-AI system is:

```text
              OCULUS-AI
                  │
       ┌──────────┴──────────┐
       │                     │
 Oculus Test            Oculus AI
       │                     │
   Testing              Production
       │                     │
       └──────────┬──────────┘
                  │
            Shared Sources
                  │
        ┌─────────┴─────────┐
        │                   │
       RSS                Tavily
        │                   │
        └─────────┬─────────┘
                  ↓
             Firecrawl
                  ↓
             Discovery
                  ↓
              Memory
                  ↓
         Editorial Judgment
                  ↓
         Technical Generation
                  ↓
              Publishing
                  ↓
          Persistent History
```

The two personas share discovery infrastructure but maintain independent agent state.

The production system executes **bounded scheduled cycles rather than a continuously running process**.

---

# 44. Prompt Registry Status

| Area | Status |
|---|---|
| Core architecture | ✅ |
| Agent memory | ✅ |
| Editorial judgment | ✅ |
| Briefing generation | ✅ |
| RSS discovery | ✅ |
| Live discovery API | ✅ |
| Supabase persistence | ✅ |
| Oculus Test | 🔧 |
| Oculus AI | 🔧 |
| START/STOP | 🔧 |
| 15-minute scheduler | 🔧 |
| Token protection | 🔧 |
| Tavily integration | 🆕 |
| Firecrawl integration | 🆕 |
| Hybrid discovery | 🆕 |
| Full E2E test | ⏳ |
| Production deployment | ⏳ |

---

# 45. Historical Verification Note

Prompts P-04, P-05, P-16, and P-26 through P-30 are based directly on prompts supplied from the Antigravity project documentation.

Prompts marked **Reconstructed** represent the architectural instructions used during development based on the project implementation and development discussion. They are included so that this document functions as a complete engineering record rather than falsely presenting reconstructed wording as an exact historical transcript.

# Oculus-AI — Prompt Registry & AI System Documentation

> **Project:** Oculus-AI
> **Purpose:** Autonomous AI Systems & Cybersecurity Analyst
> **Repository:** Oculus-AI
> **Document:** `prompts.md`
> **Status:** Development → Production Preparation

---

# 1. Overview

Oculus-AI is an autonomous AI journalism and cybersecurity intelligence system designed to:

1. Discover relevant information from the live web.
2. Collect and normalize candidate articles.
3. Prevent duplicate/repetitive coverage using persistent memory.
4. Apply AI-driven editorial judgment.
5. Generate concise technical briefings.
6. Publish selected briefings.
7. Execute autonomously on a controlled schedule.
8. Maintain separate testing and production personas.

The system follows the principle:

> **"Signal over hype. Systems over headlines."**

The primary agent persona is:

> **AI Systems & Cybersecurity Analyst**

---

# 2. Prompt Architecture

The prompts in Oculus-AI are divided into several functional layers:

```text
                    Oculus-AI
                       │
          ┌────────────┴────────────┐
          │                         │
    Discovery Layer          Editorial Layer
          │                         │
   Search prompts             Evaluation
          │                         │
     Tavily/Web               Selection
          │                         │
     Firecrawl               Generation
          │                         │
          └────────────┬────────────┘
                       │
                  Agent Memory
                       │
                 Publishing
```

The major prompt categories are:

| ID   | Prompt Category                            | Primary Tool           |
| ---- | ------------------------------------------ | ---------------------- |
| P-01 | Project Architecture / Agent Specification | Antigravity            |
| P-02 | Supabase Agent & Memory Setup              | Supabase + Antigravity |
| P-03 | Backend Discovery API                      | Next.js                |
| P-04 | Frontend ↔️ Backend Integration             | Next.js + Vercel       |
| P-05 | Agent Personas                             | Supabase + LLM         |
| P-06 | Scheduling / START / STOP                  | Next.js + Supabase     |
| P-07 | Token & Execution Guardrails               | LLM/API layer          |
| P-08 | RSS Discovery                              | RSS + Next.js          |
| P-09 | Dynamic Web Discovery                      | Tavily                 |
| P-10 | Web Content Extraction                     | Firecrawl              |
| P-11 | Editorial Judgment                         | Groq                   |
| P-12 | Technical Briefing Generation              | Groq                   |
| P-13 | Memory / Deduplication                     | Supabase               |
| P-14 | Publishing                                 | Backend                |
| P-15 | Manual E2E Testing                         | PowerShell             |
| P-16 | Production Deployment                      | Vercel                 |
| P-17 | Feature Extension Prompts                  | Antigravity            |

---

# 3. P-01 — Oculus-AI Core Architecture Prompt

**Status:** Reconstructed from the original project-development process.

**Purpose:** Define the overall Oculus-AI architecture and establish the autonomous-agent pipeline.

**Tool:** Antigravity / coding agent

### Prompt

> Build Oculus-AI as an autonomous AI Systems & Cybersecurity Analyst.
>
> The system must discover current information, evaluate its relevance, use persistent agent memory, apply editorial judgment, generate technical briefings, and publish selected content.
>
> The architecture must separate:
>
> * discovery
> * persistence
> * memory
> * editorial judgment
> * generation
> * publishing
> * scheduling
> * frontend control
>
> Use Next.js for the application/backend layer and Supabase for persistent data and agent state.
>
> The system must support autonomous execution while remaining bounded and controllable.

### Intended pipeline

```text
Discovery
    ↓
Persistence
    ↓
Memory
    ↓
Editorial Judgment
    ↓
Generation
    ↓
Publishing
```

---

# 4. P-02 — Supabase Agent Infrastructure Prompt

**Status:** Reconstructed.

**Purpose:** Establish persistent agents, memory, topics, runs, and related state in Supabase.

**Tools:**

* Supabase
* Antigravity
* PostgreSQL

### Prompt

> Configure the Supabase database for Oculus-AI.
>
> Create the required persistent structures for:
>
> * agents
> * agent configuration
> * agent memory
> * discovered topics/articles
> * editorial evaluations
> * generated posts
> * run history
> * scheduling state
>
> Ensure that each agent can maintain independent memory and execution state.
>
> Avoid storing temporary runtime state that would be lost when the backend restarts.

---

# 5. P-03 — Agent Memory Prompt

**Status:** Reconstructed.

**Purpose:** Give each Oculus agent persistent memory.

**Tools:**

* Supabase
* Next.js backend
* LLM

### Prompt

> Implement persistent memory for Oculus-AI.
>
> The agent should be able to use previous discoveries, topics, decisions, and relevant historical information when evaluating new articles.
>
> Memory must persist between execution cycles and backend restarts.
>
> The system should use memory to:
>
> * identify previously covered topics
> * reduce duplicate coverage
> * understand recent editorial history
> * provide context for future decisions
> * improve future search and selection
>
> Memory must remain isolated by agent ID.

---

# 6. P-04 — Editorial Judgment Prompt

**Location:**

`Backend/lib/editorial/evaluator.ts`

**Tool:** Groq LLM

**Purpose:** Evaluate discovered articles and determine whether they meet Oculus-AI's publication standard.

### System Prompt

> You are an elite editorial judgment engine for "Oculus AI".
>
> Your domain expertise: AI Systems & Cybersecurity Analyst.
>
> Your editorial philosophy: "Signal over hype. Systems over headlines."
>
> Your task is to critically evaluate a single discovered article/topic for publication.
>
> CRITICAL INSTRUCTIONS:
>
> * Be highly skeptical of marketing buzzwords, PR fluff, and speculative AI hype.
> * Prefer technically meaningful engineering developments, architecture changes, security vulnerabilities, research, and real-world system implementations.
> * Reject low-information promotional announcements or repetitive topics.
> * Base your evaluation STRICTLY on the article title, source, and summary provided. Do NOT invent information or external facts.
>
> SCORING RUBRIC (Total = 100 points):
>
> 1. Domain relevance (0 - 30 points): How strongly does it relate to AI systems, cybersecurity, AI infrastructure, AI agents, ML systems, or the intersection of AI and security?
> 2. Technical significance (0 - 25 points): Does it contain meaningful technical information, architecture changes, research findings, engineering specs, or security vulnerabilities?
> 3. Impact (0 - 20 points): Could this materially affect developers, researchers, organizations, infrastructure, or cybersecurity?
> 4. Novelty (0 - 15 points): Does it present genuinely new information rather than repeating well-known facts/news?
> 5. Timeliness (0 - 10 points): Is this current and worth discussing right now?
>
> PUBLISHING THRESHOLD:
>
> * Score >= 75 points → PUBLISH
> * Score < 75 points → REJECT
>
> OUTPUT FORMAT:
>
> Respond with a valid JSON object matching this structure:
>
> ```json
> {
>   "decision": "publish" | "reject",
>   "score": number,
>   "breakdown": {
>     "domainRelevance": number,
>     "technicalSignificance": number,
>     "impact": number,
>     "novelty": number,
>     "timeliness": number
>   },
>   "reason": "concise, sharp explanation of the editorial decision"
> }
> ```

---

# 7. P-05 — Technical Briefing Generator

**Location:**

`Backend/lib/editorial/post-generator.ts`

**Tool:** Groq LLM

**Purpose:** Transform editorially approved articles into concise technical briefings.

### System Prompt

> You are "Oculus AI", an autonomous threat intelligence and AI security research agent.
>
> Your mission is to craft concise, high-signal technical research briefings for developers, security architects, and AI researchers.
>
> POST STYLE GUIDELINES:
>
> * Tone: Analytical, sharp, authoritative, and objective.
> * Keep the main post text under 120 words.
> * Highlight technical implications such as CVE impacts, LLM permission boundaries, and infrastructure exposure.
> * Avoid fluff, hype, or conversational filler.
>
> OUTPUT FORMAT:
>
> Respond with a valid JSON object matching this structure:
>
> ```json
> {
>   "text": "The main technical briefing post summary (under 120 words)",
>   "rationale": "Why this specific article passed the editorial threshold and why it matters",
>   "whySelected": [
>     "Key reason 1",
>     "Key reason 2",
>     "Key reason 3"
>   ],
>   "whyItMattersNow": [
>     "Immediate impact point 1",
>     "Immediate impact point 2"
>   ]
> }
> ```

---

# 8. P-06 — RSS Discovery Prompt

**Location:**

`Backend/lib/discovery/sources.ts`

**Tools:**

* RSS
* Next.js backend

**Purpose:** Define trusted baseline sources for article discovery.

### Prompt

> Maintain a reliable set of trusted RSS/news sources relevant to AI systems, cybersecurity, AI infrastructure, and related technical developments.
>
> Discovery must normalize all sources into a common article structure containing:
>
> * title
> * URL
> * source
> * publishedAt
> * summary
>
> Do not send raw RSS structures directly into editorial judgment.

---

# 9. P-07 — `/api/discover` Prompt

**Location:**

`Backend/app/api/discover/route.ts`

**Purpose:** Create the backend discovery endpoint.

**Tools:**

* Next.js
* Supabase
* RSS discovery

### Behavior

```text
GET /api/discover
```

returns live discovered articles without persistence.

```text
GET /api/discover?agentId=<ID>
```

discovers articles and persists topics for the specified agent.

### Existing behavior

```text
discoverArticles()
        ↓
articles
        ↓
if no agentId
        ↓
return articles
```

With an agent:

```text
discoverArticles()
        ↓
verify agent
        ↓
persistTopics(agentId, articles)
        ↓
return results
```

---

# 10. P-08 — Supabase Environment Configuration Prompt

**Status:** Reconstructed.

**Purpose:** Resolve backend configuration and ensure Supabase credentials are correctly loaded.

**Tools:**

* Supabase
* Next.js
* `.env.local`

### Required local variables

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

### Important rule

Server/API keys must never be exposed to the frontend unnecessarily.

---

# 11. P-09 — Oculus Test Persona

**Purpose:** Create a safe staging/testing agent.

**Agent:**

`Oculus Test`

**Role:**

AI Systems & Cybersecurity Analyst

**Purpose:**

Testing the complete pipeline without production publishing.

### Requirements

```text
Oculus Test
    ↓
same discovery sources
    ↓
separate memory
    ↓
separate run history
    ↓
separate state
    ↓
NO production publishing
```

---

# 12. P-10 — Oculus AI Production Persona

**Purpose:** Define the production agent.

**Agent:**

`Oculus AI`

**Role:**

AI Systems & Cybersecurity Analyst

**Purpose:**

Production autonomous intelligence and publishing.

### Requirements

```text
Oculus AI
    ↓
same discovery sources
    ↓
independent memory
    ↓
independent state
    ↓
independent run history
    ↓
production publishing
```

---

# 13. P-11 — Six-Agent Cleanup / Migration Prompt

**Status:** Reconstructed.

**Purpose:** Safely reduce the existing six Supabase agents to the desired two.

### Prompt

> Inspect all existing records in the Supabase `agents` table.
>
> The final system should contain:
>
> 1. Oculus Test
> 2. Oculus AI
>
> Before deleting any other agents, search the entire codebase for references to their IDs.
>
> Do not blindly delete agents.
>
> Preserve or migrate any required configuration, memory, or relationships.
>
> Remove obsolete agents only when it is confirmed that they are not required by the application.

---

# 14. P-12 — START/STOP Agent Control Prompt

**Status:** Reconstructed.

**Purpose:** Prevent uncontrolled autonomous execution.

### Requirements

START:

```text
START
 ↓
persist scheduling enabled
 ↓
agent active
 ↓
set next_run_at
```

STOP:

```text
STOP
 ↓
disable scheduling
 ↓
prevent future cycles
 ↓
preserve memory/history
```

The backend must enforce the stopped state.

---

# 15. P-13 — 15-Minute Scheduler Prompt

**Status:** Reconstructed.

**Purpose:** Implement bounded autonomous execution.

### Prompt

> Implement a deployment-compatible 15-minute scheduler for Oculus-AI.
>
> Do not use an infinite loop.
>
> Do not rely on a permanently running `setInterval()` process for production.
>
> The scheduler should:
>
> 1. Find enabled agents.
> 2. Determine whether `next_run_at` is due.
> 3. Safely claim a cycle.
> 4. Execute exactly one bounded cycle.
> 5. Update `last_run_at`.
> 6. Calculate `next_run_at`.
> 7. Record success or failure.
> 8. Release the run lock.
>
> Multiple scheduler invocations must not execute the same agent cycle simultaneously.

---

# 16. P-14 — Token/API Protection Prompt

**Status:** Reconstructed.

**Purpose:** Prevent runaway API and LLM usage.

### Requirements

Every cycle should have configurable limits for:

* searches
* search results
* crawled pages
* LLM evaluations
* generated outputs
* retries
* execution duration
* API/token budget where supported

A cycle must always terminate.

A cycle must never recursively trigger another cycle.

---

# 17. P-15 — Dynamic Search Strategy Prompt

**Status:** Reconstructed / extension of the original discovery architecture.

**Purpose:** Allow Oculus-AI to dynamically determine what information to investigate.

### Architecture

```text
Agent Memory
      ↓
Recent coverage
      ↓
Search strategy
      ↓
Dynamic queries
      ↓
Tavily
```

The agent should be able to generate search topics based on:

* current interests
* recent discoveries
* missing coverage
* cybersecurity developments
* AI systems developments
* emerging threats

---

# 18. P-16 — Tavily Search Prompts

**Location:**

`Backend/lib/discovery/web-search.ts`

**Tool:** Tavily

**Purpose:** Dynamic live-web discovery.

### Current queries

```text
latest AI systems cybersecurity vulnerabilities zero day exploit 2026

frontier LLM security agent permission boundaries breakthrough

cloud infrastructure ransomware CVE advisory threat intelligence

AI model hijacking prompt injection vulnerability research 2026
```

### Intended architecture

```text
Oculus AI
   ↓
Search strategy
   ↓
Tavily
   ↓
Candidate URLs
```

Tavily is the discovery engine rather than the final editorial authority.

---

# 19. P-17 — Firecrawl Extraction Prompt

**Location:**

`Backend/lib/discovery/web-search.ts`

**Tool:** Firecrawl

**Purpose:** Extract useful content from discovered web pages.

### Intended pipeline

```text
Tavily
   ↓
URL
   ↓
Firecrawl
   ↓
Clean page content
   ↓
Article normalization
   ↓
Editorial judgment
```

Firecrawl should not replace the editorial LLM.

---

# 20. P-18 — Dynamic Discovery + RSS Hybrid Prompt

**Status:** Reconstructed.

**Purpose:** Combine trusted feeds with dynamic discovery.

### Architecture

```text
              Discovery Engine
                     │
        ┌────────────┼────────────┐
        ↓            ↓            ↓
       RSS         Tavily      Firecrawl
     Sources       Search      Extraction
        │            │            │
        └────────────┼────────────┘
                     ↓
             Normalize Articles
                     ↓
               Deduplicate
                     ↓
                  Supabase
```

RSS remains useful as a trusted baseline.

Tavily expands discovery beyond manually maintained sources.

Firecrawl provides deeper extraction.

---

# 21. P-19 — Deduplication Prompt

**Status:** Reconstructed.

**Purpose:** Prevent multiple sources covering the same event from creating repetitive posts.

### Requirements

Deduplication should operate at multiple levels:

```text
URL
 ↓
canonical URL
 ↓
title similarity
 ↓
content/topic similarity
 ↓
existing Supabase records
 ↓
agent memory
```

The system should distinguish between:

* genuinely new stories
* follow-up reporting
* duplicate reporting
* materially different analysis of the same event

---

# 22. P-20 — Frontend ↔️ Backend Integration Prompt

**Status:** Reconstructed.

**Purpose:** Connect the Next.js frontend on port 3000 to the backend on port 3001.

### Local architecture

```text
Frontend
http://localhost:3000
        ↓
Backend
http://localhost:3001
```

### Recommended environment variable

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Production should use the deployed backend URL.

The backend URL should not be scattered as hardcoded strings throughout the frontend.

---

# 23. P-21 — Vercel Deployment Prompt

**Status:** Reconstructed.

**Tool:** Vercel

**Purpose:** Deploy frontend/backend and configure production environment variables.

### Requirements

Configure production environment variables separately from local `.env.local`.

Verify:

```text
Frontend
    ↓
Production backend
    ↓
Supabase
    ↓
Tavily / Firecrawl / Groq
```

Do not expose private API keys to the browser.

---

# 24. P-22 — Manual Single-Cycle Test Prompt

**Purpose:** Test one controlled agent cycle without starting continuous automation.

**Tool:** PowerShell

### Manual discovery test

```powershell
Invoke-RestMethod -Uri "http://localhost:3001/api/discover"
```

### JSON output

```powershell
Invoke-RestMethod -Uri "http://localhost:3001/api/discover" | ConvertTo-Json -Depth 10
```

This was successfully used to verify live discovery.

The successful result returned:

```text
count: 50
persisted: false
```

---

# 25. P-23 — Agent Run Test Prompt

**Purpose:** Execute one complete agent cycle manually.

**Endpoint:**

```text
GET /api/agent/run
```

### Command

```powershell
Invoke-RestMethod -Uri "http://localhost:3001/api/agent/run"
```

The intended test is:

```text
ONE RUN
   ↓
Discovery
   ↓
Memory
   ↓
Editorial Judgment
   ↓
Generation
   ↓
Persistence
   ↓
STOP
```

The agent should not be left running continuously during development testing.

---

# 26. P-24 — Manual End-to-End Testing Prompt

**Status:** Reconstructed.

**Purpose:** Verify the entire pipeline manually before production deployment.

### Test procedure

1. Start backend.
2. Start frontend.
3. Open the frontend.
4. Select **Oculus Test**.
5. Trigger exactly one cycle.
6. Verify discovery.
7. Verify Supabase persistence.
8. Verify memory.
9. Verify editorial judgment.
10. Verify generated briefing.
11. Verify publishing behavior.
12. Press STOP.
13. Verify no future cycle is scheduled.
14. Shut down frontend/backend.
15. Inspect Supabase run history.

---

# 27. P-25 — Production Safety Test

**Status:** Reconstructed.

**Purpose:** Ensure Oculus Test cannot accidentally publish production content.

### Requirements

```text
Oculus Test
    ↓
test pipeline
    ↓
test/staging output
```

while:

```text
Oculus AI
    ↓
production pipeline
    ↓
production publishing
```

Publishing permissions should be determined server-side using agent configuration/state rather than relying only on frontend controls.

---

# 28. P-26 — Feature Addition: New Information Sources

**Tool:** Antigravity

### Prompt

> We need to add new real-time threat sources for Kubernetes and Cloud Security. Please update `Backend/lib/discovery/sources.ts` and `Backend/lib/discovery/web-search.ts` to include feeds for Kubernetes Security Advisories, Trend Micro Research, and Palo Alto Unit 42.

---

# 29. P-27 — Feature Addition: Editorial Persona

**Tool:** Antigravity + Groq

### Prompt

> Change the editorial persona focus from general AI security to strict Cloud Native & Infrastructure Defense. Update the system prompt in `evaluator.ts` so domain relevance prioritizes container security, IAM misconfigurations, and cloud data leaks.

---

# 30. P-28 — Feature Addition: Severity Filter

**Tool:** Antigravity + Next.js frontend

### Prompt

> Add a severity filter dropdown (CRITICAL / HIGH / MEDIUM) in the frontend header and update `useAgentStore.tsx` to filter the displayed post feed dynamically.

---

# 31. P-29 — Feature Addition: CSV / JSON Export

**Tool:** Antigravity + Next.js

### Prompt

> Add an Export Briefings button in `DemoSchedulerHeader.tsx` that downloads the active Supabase posts array as a formatted JSON or CSV file.

---

# 32. P-30 — Feature Addition: Webhook Publishing

**Tool:** Antigravity + Backend

### Prompt

> Create a new endpoint `POST /api/publish/webhook` that triggers an outbound POST request with the generated briefing payload to a configured Slack or Discord Webhook URL whenever a post is published.

---

# 33. P-31 — Agentic Search Extension

**Status:** Planned architecture.

**Purpose:** Move Oculus-AI beyond a static list of websites.

### Intended behavior

```text
Agent Memory
      ↓
What have I already covered?
      ↓
What is currently important?
      ↓
What should I investigate?
      ↓
Generate search queries
      ↓
Tavily
      ↓
Firecrawl
      ↓
Editorial Judgment
```

This makes discovery adaptive rather than purely source-driven.

---

# 34. P-32 — Bounded Autonomous Cycle

**Purpose:** Define the fundamental execution unit of Oculus-AI.

### One cycle

```text
START
  ↓
Load agent configuration
  ↓
Load memory
  ↓
Generate search strategy
  ↓
Search web/RSS
  ↓
Collect candidates
  ↓
Deduplicate
  ↓
Evaluate candidates
  ↓
Select relevant stories
  ↓
Generate briefings
  ↓
Persist results
  ↓
Publish where authorized
  ↓
Update memory
  ↓
Update run state
  ↓
END
```

There should be no infinite loop inside a cycle.

---

# 35. P-33 — Production Scheduler Architecture

**Purpose:** Production-safe autonomous execution.

### Desired architecture

```text
External Cron / Scheduler
            ↓
     Backend scheduler
            ↓
       Agent state
            ↓
     Is agent enabled?
        /       \
      NO         YES
      ↓           ↓
    EXIT       Is due?
                  ↓
             Run one cycle
                  ↓
            Update schedule
```

The scheduler should be stateless between invocations wherever possible.

Persistent scheduling state belongs in Supabase.

---

# 36. P-34 — STOP Safety Prompt

**Purpose:** Ensure STOP is a real backend control rather than a UI-only feature.

### Requirements

When STOP is pressed:

```text
schedule_enabled = false
```

The scheduler must check that state before starting a cycle.

If a scheduler request arrives immediately after STOP, it must refuse to launch a new cycle.

Existing memory/history must remain intact.

---

# 37. P-35 — Final Deployment Gate

**Status:** Reconstructed.

**Purpose:** Prevent premature deployment.

### Deployment should only occur after:

```text
Frontend works
        ↓
Backend works
        ↓
Supabase works
        ↓
Discovery works
        ↓
Memory works
        ↓
Editorial judgment works
        ↓
Generation works
        ↓
Oculus Test works
        ↓
START/STOP works
        ↓
15-minute scheduler works
        ↓
Token limits verified
        ↓
Production publishing verified
        ↓
Deploy
```

---

# 38. Tools & Services Used

## Antigravity

Primary coding/development agent.

Used for:

* code generation
* project architecture
* feature implementation
* frontend/backend integration
* database integration
* scheduler implementation
* refactoring
* deployment preparation

---

## Next.js

Used for:

* frontend
* backend API routes
* `/api/discover`
* agent execution endpoints
* publishing endpoints
* frontend/backend integration

Local ports:

```text
Frontend → 3000
Backend  → 3001
```

---

## Supabase

Used for:

* agents
* persistent agent state
* memory
* topics/articles
* editorial data
* run history
* scheduling state

---

## Groq

Used as the primary LLM provider for:

* editorial judgment
* article scoring
* publication decisions
* technical briefing generation

---

## Tavily

Used for:

* live web search
* dynamic discovery
* finding relevant articles beyond manually configured RSS sources
* generating a wider candidate pool

Required server environment variable:

```env
TAVILY_API_KEY=...
```

---

## Firecrawl

Used for:

* web-page extraction
* cleaning discovered pages
* obtaining richer article content
* feeding useful page content into downstream analysis

Required server environment variable:

```env
FIRECRAWL_API_KEY=...
```

---

## RSS

Used for:

* trusted baseline discovery
* known technical sources
* reliable recurring information feeds

---

## Vercel

Used for:

* deployment
* production hosting
* environment variables
* production frontend/backend infrastructure

---

## PowerShell

Used for:

* local API testing
* manual agent execution
* backend endpoint verification

Example:

```powershell
Invoke-RestMethod -Uri "http://localhost:3001/api/discover"
```

---

# 39. Environment Variables

## Local

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...

TAVILY_API_KEY=...
FIRECRAWL_API_KEY=...

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Additional Groq/server-side variables should remain server-only according to the existing implementation.

Never commit actual secret values.

---

# 40. Prompt → Tool → Function Map

| Prompt | Tool                     | Function             |
| ------ | ------------------------ | -------------------- |
| P-01   | Antigravity              | Overall architecture |
| P-02   | Supabase                 | Database             |
| P-03   | Supabase + LLM           | Agent memory         |
| P-04   | Groq                     | Editorial scoring    |
| P-05   | Groq                     | Briefing generation  |
| P-06   | RSS                      | Baseline discovery   |
| P-07   | Next.js                  | Discovery API        |
| P-08   | Supabase                 | Environment/config   |
| P-09   | Supabase                 | Oculus Test          |
| P-10   | Supabase                 | Oculus AI            |
| P-11   | Supabase + Antigravity   | Agent cleanup        |
| P-12   | Next.js + Supabase       | START/STOP           |
| P-13   | Cron + Next.js           | Scheduling           |
| P-14   | LLM APIs                 | Token protection     |
| P-15   | LLM                      | Search strategy      |
| P-16   | Tavily                   | Web discovery        |
| P-17   | Firecrawl                | Web extraction       |
| P-18   | RSS + Tavily + Firecrawl | Hybrid discovery     |
| P-19   | Supabase + LLM           | Deduplication        |
| P-20   | Next.js                  | Frontend/backend     |
| P-21   | Vercel                   | Deployment           |
| P-22   | PowerShell               | Discovery testing    |
| P-23   | PowerShell               | Agent-cycle testing  |
| P-24   | Full stack               | E2E testing          |
| P-25   | Supabase + Backend       | Production safety    |
| P-26   | Antigravity              | New sources          |
| P-27   | Groq + Antigravity       | Persona modification |
| P-28   | Next.js                  | UI filtering         |
| P-29   | Next.js                  | Data export          |
| P-30   | Backend                  | Webhook publishing   |
| P-31   | Tavily + LLM             | Agentic discovery    |
| P-32   | Full stack               | Bounded cycle        |
| P-33   | Cron + Supabase          | Production scheduler |
| P-34   | Backend + Supabase       | STOP safety          |
| P-35   | Vercel                   | Deployment gate      |

---

# 41. Final Oculus-AI Prompt Pipeline

The complete AI decision pipeline is:

```text
                    ┌───────────────┐
                    │    Scheduler  │
                    └───────┬───────┘
                            ↓
                    ┌───────────────┐
                    │ Agent Config  │
                    └───────┬───────┘
                            ↓
                    ┌───────────────┐
                    │ Agent Memory  │
                    └───────┬───────┘
                            ↓
                    ┌───────────────┐
                    │Search Strategy│
                    └───────┬───────┘
                            ↓
              ┌─────────────┼─────────────┐
              ↓             ↓             ↓
             RSS          Tavily       Firecrawl
              │             │             │
              └─────────────┼─────────────┘
                            ↓
                    ┌───────────────┐
                    │ Normalize &   │
                    │ Deduplicate   │
                    └───────┬───────┘
                            ↓
                    ┌───────────────┐
                    │   Supabase    │
                    └───────┬───────┘
                            ↓
                    ┌───────────────┐
                    │   Editorial   │
                    │   Judgment    │
                    └───────┬───────┘
                            ↓
                       Score ≥ 75?
                       /          \
                     NO            YES
                     ↓              ↓
                  Reject       Post Generator
                                    ↓
                              Technical Brief
                                    ↓
                              Publish Decision
                                    ↓
                              Update Memory
                                    ↓
                               End Cycle
```

---

# 42. Design Philosophy

Oculus-AI is intentionally designed around five principles:

### 1. Signal over hype

The system should prioritize technically meaningful information rather than marketing announcements.

### 2. Systems over headlines

The editorial layer should focus on what actually changed technically.

### 3. Memory over repetition

The agent should remember what it has already covered.

### 4. Autonomy with boundaries

Autonomous does not mean unrestricted.

Every cycle must have:

* time limits
* API limits
* search limits
* execution boundaries
* persistent state

### 5. Human-controlled activation

The operator must retain the ability to:

```text
START
STOP
TEST
DEPLOY
```

without destroying the agent's memory or state.

---

# 43. Final Project State

The intended final Oculus-AI system is:

```text
              OCULUS-AI
                  │
       ┌──────────┴──────────┐
       │                     │
 Oculus Test            Oculus AI
       │                     │
   Testing              Production
       │                     │
       └──────────┬──────────┘
                  │
            Shared Sources
                  │
        ┌─────────┴─────────┐
        │                   │
       RSS                Tavily
        │                   │
        └─────────┬─────────┘
                  ↓
             Firecrawl
                  ↓
             Discovery
                  ↓
              Memory
                  ↓
         Editorial Judgment
                  ↓
         Technical Generation
                  ↓
              Publishing
                  ↓
          Persistent History
```

The two personas share discovery infrastructure but maintain independent agent state.

The production system executes **bounded scheduled cycles rather than a continuously running process**.

---

# 44. Prompt Registry Status

| Area                  | Status |
| --------------------- | ------ |
| Core architecture     | ✅      |
| Agent memory          | ✅      |
| Editorial judgment    | ✅      |
| Briefing generation   | ✅      |
| RSS discovery         | ✅      |
| Live discovery API    | ✅      |
| Supabase persistence  | ✅      |
| Oculus Test           | 🔧     |
| Oculus AI             | 🔧     |
| START/STOP            | 🔧     |
| 15-minute scheduler   | 🔧     |
| Token protection      | 🔧     |
| Tavily integration    | 🆕     |
| Firecrawl integration | 🆕     |
| Hybrid discovery      | 🆕     |
| Full E2E test         | ⏳      |
| Production deployment | ⏳      |

---

# 45. Historical Verification Note

Prompts P-04, P-05, P-16, and P-26 through P-30 are based directly on prompts supplied from the Antigravity project documentation.

Prompts marked **Reconstructed** represent the architectural instructions used during development based on the project implementation and development discussion. They are included so that this document functions as a complete engineering record rather than falsely presenting reconstructed wording as an exact historical transcript.

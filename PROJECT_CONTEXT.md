Oculus-AI

PROJECT_CONTEXT.md  OCULUS-AI # Project Context & Design
Constitution

Version: 1.0



 1. PROJECT IDENTITY

# Product Name

Oculus-AI

# Persona

Autonomous AI Cybersecurity Researcher

# Product Positioning

 An autonomous AI that watches the technology frontier,  separates
signal from noise, and publishes what actually matters.

# One-Sentence Product Description

Oculus-AI is an autonomous AI cybersecurity researcher that
independently discovers live information, evaluates whether developments
are worth publishing, writes in a consistent editorial voice, remembers
previously published content, and continues publishing over time without
additional human prompts.



 2. THE PROBLEM WE ARE SOLVING

Thousands of AI-generated technology posts are published every day, but
most require a human to initiate the process with a prompt.

Oculus-AI is designed to demonstrate a different model:

The human initializes the persona once.

After initialization, Oculus-AI operates autonomously.

It should:

1 Discover topics from live information sources. 2. Evaluate whether
those topics deserve publication. 3. Reject topics that fail its
editorial standards. 4. Write in a consistent persona and voice. 5.
Remember previous publications. 6. Avoid unnecessary repetition. 7.
Publish worthwhile developments over time. 8. Explain why each
publication was selected. 9. Provide the sources supporting each
publication.

The frontend must make these behaviors understandable and observable to
a human evaluator.



 3. HACKATHON SUCCESS CRITERIA

The project is primarily evaluated on:

 Autonomous operation - Editorial judgment - Persona consistency -
Memory - Publishing rationale - Source transparency - Overall feed
quality and coherence

The frontend should therefore prioritize showing evidence of these
behaviors.

The frontend is NOT primarily a marketing website.

The frontend is NOT primarily a generic SaaS dashboard.

The frontend exists to make the autonomous system understandable.



 4. CORE AUTONOMOUS LOOP

The conceptual lifecycle of Oculus-AI is:

OBSERVE    ↓ REMEMBER    ↓ EVALUATE    ↓ DECIDE    ↓ PUBLISH    ↓
REMEMBER

# OBSERVE

Oculus-AI discovers new information from live sources.

Possible sources include:

 RSS feeds - Hacker News - arXiv - Other approved live
technology/cybersecurity sources

The frontend should represent this as observation or signal detection.

Preferred vocabulary:

 Observing - Monitoring - New signal - New observation - Source
detected

Avoid generic wording such as:

 AI magic - Generating insights - AI thinking - Intelligence activated



 5. MEMORY

Oculus-AI must remember previous publications.

Memory exists to:

 avoid unnecessary repetition - provide continuity - identify
previously covered topics - inform editorial decisions

The frontend should make memory understandable without exposing
technical database implementation details.

Good representation:

"Checking previous coverage..."

"3 related publications found."

"Substantial overlap detected."

Bad representation:

"Vector DB query successful."

The judge should understand WHY memory matters, not how Supabase works
internally.



 6. EVALUATION

Not every discovered topic deserves publication.

Oculus-AI evaluates candidates according to its editorial standards.

The frontend should make this judgment visible.

Potential evaluation dimensions include:

 Relevance - Timeliness - Substance - Originality - Source quality -
Audience value - Persona fit - Evidence quality

The exact backend scoring implementation is owned by the backend system
and must not be invented by the frontend.

If the backend exposes actual scores, display them.

If the backend does not expose scores, do not fabricate them.



 7. DECISION

After evaluation, Oculus-AI makes an editorial decision.

Possible outcomes:

PUBLISH

or

REJECT

The frontend should make rejection a first-class behavior.

A rejection demonstrates that the agent is exercising judgment rather
than blindly publishing everything it discovers.

Possible rejection reasons:

 Outside cybersecurity scope - Insufficient evidence - Already
covered - Low editorial value - Too speculative - Poor source quality -
Weak relevance

Only display reasons that are actually provided by the backend.

Do not invent reasoning in the UI.



 8. PUBLICATION

Every published post must communicate:

 What was published - Why the topic was selected - Why it is relevant
now - Source(s)

The frontend should make these elements easy to inspect.

A publication should feel like a research/editorial artifact, not a
social-media card.

Avoid:

 Likes - Comments - Engagement counters - Social-media-style
reactions - Influencer-style presentation

The product is about editorial intelligence, not social engagement.



 9. PERSONA

# Name

Oculus-AI

# Role

Autonomous AI Cybersecurity Researcher

# Domain

AI cybersecurity and closely related technology security topics.

# Personality

Oculus-AI should feel:

 Professional - Analytical - Precise - Skeptical - Evidence-driven -
Calm - Technical - Independent

Oculus-AI should NOT feel:

 Childish - Cheerful for no reason - Hype-driven - Influencer-like -
Promotional - Meme-oriented - Overly conversational



 10. EDITORIAL PHILOSOPHY

The persona should communicate principles such as:

Evidence over hype.

Relevance over reach.

Novelty over repetition.

Analysis over noise.

Primary evidence over speculation.

Cybersecurity significance over generic technology announcements.

The interface may surface these principles subtly.

Do not turn them into giant marketing slogans.



 11. PERSONA VOICE

Oculus-AI should sound like a serious cybersecurity researcher and
technical editor.

Preferred:

"The interesting part isn't the exploit itself. It's where the trust
boundary failed."

Preferred:

"Three recent disclosures describe similar attack paths. This
development adds a new capability rather than repeating the existing
pattern."

Avoid:

"This is an exciting breakthrough! 🚀"

Avoid:

"AI is changing everything!"

Avoid:

"Here are the top 5 things you NEED to know!"

Avoid excessive emojis.

Avoid marketing language.

Avoid sensationalism.



 12. VISUAL IDENTITY

The interface should communicate:

 Intelligence - Observation - Evidence - Analysis - Editorial
judgment - Professional cybersecurity research

The visual language should feel like:

Professional intelligence software + Research publication + Technical
operations platform

It should NOT feel like:

 Generic AI SaaS - Cyberpunk hacker software - Gaming UI -
Cryptocurrency dashboard - Sci-fi cockpit - Social media - Generic
dashboard template



 13. DESIGN PRINCIPLE

# PRIMARY DESIGN RULE

 Every meaningful visual effect should communicate something about 
the autonomous system.

Animations should communicate:

 Observation - Memory - Evaluation - Decision - Publication - System
state

Animations should NOT exist merely because they look cool.

A beautiful animation that communicates nothing should be removed.



 14. THE WEBSITE SHOULD FEEL ALIVE

The website should feel alive through system activity.

It should not feel alive through random decoration.

Good examples:

A signal travels through the autonomous pipeline when an actual agent
operation occurs.

A source becomes active when it is actually being processed.

A memory retrieval animation occurs when memory is actually queried.

A publication appears through a subtle reveal when it is actually
created.

The system settles into an idle state when there is nothing happening.



 15. AUTONOMOUS PIPELINE

The signature visualization should represent:

OBSERVE → REMEMBER → EVALUATE → DECIDE → PUBLISH

Example:

OBSERVE ● ── MEMORY ── EVALUATE ── DECIDE ── PUBLISH

Then:

OBSERVE ── MEMORY ● ── EVALUATE ── DECIDE ── PUBLISH

Then:

OBSERVE ── MEMORY ── EVALUATE ● ── DECIDE ── PUBLISH

If rejected:

OBSERVE ── MEMORY ── EVALUATE ── DECIDE ✕ ── PUBLISH

If accepted:

OBSERVE ── MEMORY ── EVALUATE ── DECIDE ✓ ── PUBLISH ●

The animation should be restrained and professional.



 16. IDLE STATE

Do not fake activity.

If the backend reports that no autonomous operation is occurring, the
frontend should communicate an honest idle state.

Example:

NO QUALIFYING OBSERVATIONS

Oculus-AI is waiting for the next autonomous cycle.

Do NOT display:

"Scanning..."

"Thinking..."

"Analyzing..."

if the system is not actually doing those things.



 17. UI INFORMATION ARCHITECTURE

The primary product areas are:

1 Operations 2. Publications 3. Editorial Decisions 4. Memory 5.
Sources

Optional supporting areas:

6 System Status 7. Autonomous Run details 8. Command Palette

Do not create unnecessary pages simply to make the product look larger.



 18. OPERATIONS

The Operations page is the primary experience.

It should communicate:

 Who Oculus-AI is - Current autonomous state - Current operation -
Source activity - Autonomous pipeline - Recent activity - Latest
publication - System health

The judge should understand the system within seconds.



 19. PUBLICATIONS

Publications should feel like a research archive.

Each publication should expose:

 Title - Publication time - Body/text - Rationale - Why now - Sources

Avoid social media patterns.

The publication should feel like something produced by an editorial
research system.



 20. EDITORIAL DECISIONS

This page demonstrates judgment.

It should show actual decisions where available:

 Published candidates - Rejected candidates - Decision reason -
Evaluation information - Timestamp

Do not create fake decisions for visual purposes once real backend data
is available.



 21. MEMORY

The Memory interface should explain continuity.

It can show:

 Previously published topics - Recent related coverage - Memory
matches - Duplicate avoidance - Recent memory activity

Do not expose unnecessary technical database terminology.



 22. SOURCES

The Sources page should communicate where Oculus-AI obtains information.

Possible source categories:

 Research - Security advisories - Technology publications - RSS -
Community/technology sources

The actual source list must come from the real system configuration.

Do not claim that Oculus-AI monitors a source that the backend does not
actually monitor.



 23. SYSTEM STATUS

System status may include:

 Scheduler - Database - LLM - Memory

Display real health information when available.

Do not fabricate "Healthy" states if the application has no
corresponding information.



 24. VISUAL STYLE

# Color

Primary interface should be restrained.

Preferred:

 Near-black / dark neutral background - Dark charcoal surfaces -
Subtle borders - Near-white primary text - Muted gray secondary text -
Restrained blue accent - Muted green for success - Amber for warnings -
Muted red for rejection/errors

Avoid:

 Rainbow gradients - Neon overload - Excessive glow - Cyberpunk color
schemes



 25. TYPOGRAPHY

Use a professional modern sans-serif.

Preferred candidates:

 Geist - Inter - IBM Plex Sans

Typography should provide hierarchy through:

 Size - Weight - Spacing - Alignment

Do not compensate for weak hierarchy with excessive visual effects.



 26. MOTION PRINCIPLES

Motion should be:

 Subtle - Fast enough to feel responsive - Slow enough to feel
deliberate - Purposeful - Consistent

Useful motion:

 Fade - Transform - Signal movement - Status pulse - Publication
reveal - Memory retrieval - Source activation - Decision transition

Avoid:

 Bouncing cards - Random floating elements - Constant movement -
Excessive parallax - Decorative particles - Distracting 3D animations



 27. EASTER EGGS

Easter eggs are allowed but must remain professional.

Possible Easter eggs:

1 Command palette    Cmd/Ctrl + K

2 Subtle source relationship visualization

3 Memory retrieval visualization

4 Hidden system build information

5 Thoughtful idle-state messages

6 Autonomous run details

Easter eggs should reward exploration.

They must never interfere with the core experience.



 28. COMMAND PALETTE

If implemented:

Cmd/Ctrl + K

Possible commands:

 View Operations - View Publications - View Decisions - View Memory -
View Sources - View System Status

Keep it professional.



 29. RESPONSIVENESS

The interface must work on:

 Desktop - Tablet - Mobile

Desktop is the primary design target.

Mobile should preserve:

 Agent identity - Current state - Pipeline - Publications - Decisions

Do not simply shrink the desktop UI.

Reorganize information where necessary.



 30. ACCESSIBILITY

Frontend should consider:

 Keyboard navigation - Focus states - Color contrast - Semantic HTML -
Reduced-motion preference - Accessible labels - Screen-reader
compatibility where appropriate

Animations should respect reduced-motion preferences.



 31. FRONTEND DATA PRINCIPLE

The frontend is a presentation layer.

The backend is the source of truth for:

 Agent state - Publications - Decisions - Rationale - Sources -
Memory - Autonomous activity

The frontend must NOT invent backend facts.

If data is unavailable:

Use an honest empty/loading/unavailable state.

Never fabricate live activity.



 32. API INTEGRATION

The primary public feed endpoint is:

GET /api/agent/feed?agentId=...

The frontend should:

1 Request the feed. 2. Validate the response. 3. Display posts newest
first. 4. Handle loading. 5. Handle empty feed. 6. Handle errors. 7.
Preserve previously returned posts. 8. Display rationale. 9. Display
sources.

Do not modify the backend API contract simply to make the frontend
easier.

Coordinate API changes with the backend developer.



 33. LOADING STATE

Loading should communicate that data is being retrieved.

Example:

Loading publications...

Use skeletons or restrained motion.

Do not imply that the autonomous agent is currently performing an
operation unless the backend says so.



 34. EMPTY STATE

Example:

No publications yet.

Oculus-AI has not published a qualifying development.

If the agent is actually idle, say so separately.



 35. ERROR STATE

Example:

Unable to retrieve publications.

Try again.

Do not expose raw stack traces to users.



 36. SECURITY

Never place secrets in frontend code.

Never expose:

 API keys - Supabase service-role keys - private tokens - scheduler
secrets

Only public-safe configuration may exist client-side.



 37. FRONTEND AI TOOL ROLES

# ChatGPT

Use for:

 Learning - Architecture discussion - UX reasoning - Prompt design -
Debugging explanations - Reviewing decisions - Understanding generated
code

ChatGPT is the strategic/teaching layer.



# Stitch

Use for:

 Visual exploration - Layout concepts - Design system exploration -
Motion concepts - Component design

Stitch is a design laboratory.

Do not treat it as the permanent source of application code.



# Lovable

Use for:

 Initial frontend generation - Rapid UI scaffolding - Initial
component implementation

Lovable should receive the approved design direction.

Do not let it redefine the product identity.



# Cursor

Use for:

 Repository implementation - React/Next.js work - Component
refactoring - API integration - Animation implementation - Debugging -
Production cleanup

Cursor is the primary engineering environment.



# Claude

Use selectively for:

 Large refactors - Complex implementation planning - Repository-level
reasoning - Difficult frontend problems

Do not use Claude unnecessarily for simple changes.



# Antigravity

Use as an independent critic.

Responsibilities:

 Code review - UI review - Accessibility review - Responsive testing -
Performance review - Generic-design detection - Edge-case testing

Antigravity should identify problems.

Cursor should generally implement the fixes.



# Gemini / AI Studio

Primarily relevant to the runtime autonomous agent.

It may be used for:

 Prompt experimentation - Production LLM behavior - Editorial
candidate evaluation - Post generation

It is not the primary frontend coding tool.



 38. AI TOOL GOVERNANCE

No AI tool should independently redefine:

 Product identity - Persona - Editorial philosophy - API contract -
Core navigation - Design philosophy

AI tools implement decisions.

Humans make product decisions.

If an AI suggests a major redesign, stop and evaluate it before
accepting the change.



 39. FRONTEND DEVELOPMENT WORKFLOW

The preferred workflow is:

DESIGN ↓ REVIEW ↓ IMPLEMENT ↓ TEST ↓ COMMIT ↓ REVIEW ↓ FIX ↓ COMMIT

Do not let multiple AI coding tools modify the repository
simultaneously.



 40. GIT RULES

One logical feature should generally correspond to one commit.

Good:

feat: add Oculus-AI operations interface

feat: add autonomous pipeline visualization

feat: add publication archive

feat: connect agent feed API

feat: add editorial decision ledger

fix: handle empty publication feed

fix: improve mobile publication layout

perf: optimize pipeline animations

Bad:

update

changes

final

final-final

fix stuff



 41. BRANCHING

The stable production branch is:

main

Frontend development may occur on:

frontend

Backend development may occur on:

backend

Keep main deployable whenever practical.



 42. COMMIT RULE

Never commit code simply because an AI tool says:

"Done."

Before committing:

1 Understand what changed. 2. Inspect changed files. 3. Run the
application. 4. Test the feature. 5. Check the console. 6. Check
desktop. 7. Check mobile when relevant. 8. Confirm the feature matches
Oculus-AI's identity.

Then commit.



 43. PROMPTS.MD

All important AI prompts should be recorded in:

prompts.md

Categories:

 Project context - Stitch design prompts - Lovable implementation
prompts - Cursor implementation prompts - Cursor debugging prompts -
Claude prompts - Antigravity review prompts - Persona prompts -
Editorial prompts - Testing prompts - Finalist feature-extension prompts

The prompt file is part of the hackathon deliverable.



 44. DO NOT BUILD

Do not spend time on:

 Real social media integration - Likes/comments - Engagement
analytics - Image/video generation - Complex authentication -
Multi-agent architecture - Overly complex analytics - Decorative 3D
environments - Cryptocurrency-style charts - Unnecessary settings

Unless a later feature directly supports the core autonomous researcher
experience.



 45. FEATURE PRIORITY

# Tier S

Must work:

 Agent identity - Operations - Publications - Rationale - Sources -
Editorial decisions - Memory representation - Autonomous activity
representation - Responsive UI - Loading/error/empty states

# Tier A

Strong differentiators:

 Autonomous pipeline visualization - Rejection ledger - Publication
decision receipt - Autonomous run viewer - Live activity timeline -
Meaningful publication animation

# Tier B

Only after everything above works:

 Command palette - Advanced source visualization - Additional
analytics - Extra Easter eggs



 46. PERFORMANCE

Avoid unnecessary dependencies.

Avoid expensive animations.

Prefer CSS/efficient animation where practical.

Do not introduce a large animation library simply for one small effect
unless justified.

Animations must not make the dashboard slow.



 47. FINAL EXPERIENCE GOAL

When a judge opens Oculus-AI, they should understand:

Within 5 seconds:

"This is an autonomous cybersecurity researcher."

Within 15 seconds:

"It watches live information and evaluates what matters."

Within 30 seconds:

"It remembers previous work and rejects weak/repetitive topics."

Within 60 seconds:

"I can see exactly why it published something and where the information
came from."

During the demo:

"I can watch an autonomous run and understand how the system moves from
observation to publication."



 48. THE CORE DIFFERENTIATOR

The frontend should not merely display the output of the AI.

It should make the AI's autonomous process observable.

The key experience is:

WATCH ↓ SEPARATE ↓ PUBLISH

Where:

WATCH = live information discovery

SEPARATE = memory + editorial judgment

PUBLISH = coherent, sourced, justified publication



 49. FINAL DESIGN PRINCIPLE

 Oculus-AI should feel alive because the system is doing something, 
not because the interface is constantly moving.

Every animation should have a reason.

Every piece of information should support the autonomous researcher.

Every visual decision should reinforce:

WATCH THE TECHNOLOGY FRONTIER. SEPARATE SIGNAL FROM NOISE. PUBLISH WHAT
ACTUALLY MATTERS.



 50. AI AGENT INSTRUCTION

Any AI coding/design agent working on this project must:

1 Read this file before modifying the project. 2. Preserve Oculus-AI's
identity. 3. Preserve the autonomous-researcher concept. 4. Avoid
generic AI SaaS patterns. 5. Avoid unnecessary redesigns. 6. Never
invent backend data. 7. Never fabricate autonomous activity. 8. Preserve
existing working functionality. 9. Prefer small, safe changes. 10.
Explain significant changes before making them when requested. 11. Keep
the interface professional. 12. Keep animations purposeful. 13. Keep the
product centered on observation, memory,     editorial judgment and
publication. 14. Never expose secrets or credentials. 15. Do not modify
backend behavior from the frontend unless explicitly     requested.

 51. FINAL LIVE-ROUND FEATURE REQUIREMENT

# IMPORTANT HACKATHON CONSTRAINT

The final round of the hackathon may require the team to implement an
additional feature live within approximately 20 minutes.

The exact feature is intentionally unknown before the final round.

The frontend architecture must therefore leave room for rapid, low-risk
feature integration.

This requirement must influence frontend architecture from the
beginning.



 52. FINAL-ROUND DESIGN PRINCIPLE

Oculus-AI must be designed as:

CORE PLATFORM + EXTENSION SPACE

The core platform must remain stable.

New functionality should be able to attach to existing:

 navigation - operations - publications - editorial decisions -
memory - sources - activity - system status - API/data layer - reusable
UI components

The team should NOT need to rewrite the application to add a new
feature.



 53. WHAT WE DO NOT KNOW

The final-round feature is unknown.

Therefore:

DO NOT assume that the feature will be:

 a new page - a new visualization - a new AI capability - a new data
source - a new filter - a new analytics feature

The architecture must remain flexible enough to accommodate different
types of frontend changes.



 54. WHAT WE DO KNOW

The final feature will need to be implemented quickly.

Therefore the project must optimize for:

 Discoverability - Modularity - Reusable components - Clear naming -
Predictable data flow - Small files - Clear API boundaries - Minimal
coupling - Easy AI-agent comprehension - Fast testing - Fast deployment



 55. FINAL-ROUND ARCHITECTURE

The frontend should be structured into independent feature areas.

Example:

app/ │ ├── page.tsx │ ├── operations/ │   └── page.tsx │ ├──
publications/ │   └── page.tsx │ ├── decisions/ │   └── page.tsx │ ├──
memory/ │   └── page.tsx │ └── sources/     └── page.tsx

components/ │ ├── agent/ ├── operations/ ├── publications/ ├──
decisions/ ├── memory/ ├── sources/ ├── system/ └── ui/

lib/ │ ├── api/ ├── types/ ├── utils/ └── constants/

The exact folder structure may evolve, but the principle is:

FEATURES SHOULD BE SEPARATED.



 56. REUSABLE COMPONENT PRINCIPLE

Do not build every UI element directly inside a page.

Create reusable components.

For example:

AgentStatus StatusBadge SectionHeader PublicationCard SourceBadge
DecisionBadge TimelineItem Metric EmptyState LoadingState ErrorState
Modal Drawer Tabs CommandPalette

A new feature should be able to reuse existing components instead of
requiring an entirely new visual system.



 57. DESIGN SYSTEM MUST BE STABLE

The following should be centralized:

 Colors - Typography - Spacing - Border radius - Shadows - Motion -
Status colors - Button styles - Card styles - Form elements - Navigation
patterns

The final-round feature must use the existing Oculus-AI design language.

A new feature must look like it belongs to Oculus-AI.

It must NOT look like a separate AI-generated mini-website.



 58. DATA CONTRACT PRINCIPLE

Frontend components should not depend directly on complicated backend
implementation details.

Prefer clear data structures.

Example:

type Publication = {     id: string     createdAt: string     text:
string     rationale: string     sources: string }

Components should consume predictable objects.

This allows a new feature to reuse existing data without requiring major
architectural changes.



 59. API ADAPTER PRINCIPLE

Keep API communication separate from visual components.

Prefer:

components     ↓ frontend data functions     ↓ API     ↓ backend

Avoid:

components     ↓ direct complicated API logic     ↓ multiple endpoints  
  ↓ multiple transformations

This makes future feature integration much faster.



 60. TYPES SHOULD BE CENTRALIZED

Important shared data types should be defined centrally.

For example:

lib/types/

Agent Publication EditorialDecision MemoryItem Source ActivityEvent
SystemStatus

A new feature can then import existing types.

This reduces implementation time during the live round.



 61. ROUTING SHOULD BE SIMPLE

Navigation should have a predictable structure.

Adding a new page should require only a small number of changes.

For example:

1 Create page 2. Create feature components 3. Add navigation item if
required 4. Connect API/data 5. Test

Avoid complicated routing abstractions.



 62. FEATURE ISOLATION

A new feature should preferably live inside its own feature folder.

Example:

components/     new-feature/

or

app/     new-feature/

The new feature should not require modifying unrelated components.

This reduces the risk of breaking existing functionality during the
final round.



 63. DO NOT OVER-ENGINEER FOR THE FINAL ROUND

We should NOT build:

 A plugin marketplace - A dynamic plugin engine - A feature registry
framework - Micro-frontends - A complex event bus - A new
state-management framework solely for future features - A complicated
schema system

The final-round requirement does NOT justify unnecessary architecture.

The goal is:

SIMPLE + MODULAR + EXTENSIBLE

not:

COMPLEX + "FUTURE PROOF"



 64. FINAL-ROUND FEATURE SLOT

The Operations interface should contain enough modularity that
additional functionality can be introduced without redesigning the
entire screen.

Potential extension areas include:

 Operations panel - Activity panel - Publication panel - Editorial
panel - Memory panel - Sources panel - System panel

A final-round feature can potentially become:

 A new panel - A new tab - A new route - A new interaction - A new
visualization - A new data view

depending on the challenge.

Do not reserve a visibly empty "feature slot" in the UI.

The extension space should exist architecturally, not visually.



 65. UNKNOWN FEATURE RULE

When the final feature is revealed:

DO NOT immediately start coding.

First determine:

1 What exactly is being requested? 2. Which existing feature does it
relate to? 3. Can an existing component be reused? 4. Does it require a
new API? 5. Does it require a new data type? 6. Does it require a new
route? 7. Can it be implemented entirely in the frontend? 8. What is the
smallest implementation that satisfies the request?

Then implement the smallest coherent solution.



 66. 20-MINUTE FINAL ROUND WORKFLOW

When the feature is revealed, follow this process.

MINUTE 0--2 Understand the requirement.

MINUTE 2--4 Identify where the feature belongs.

MINUTE 4--6 Ask the AI coding agent to inspect the existing architecture
and propose the smallest implementation.

MINUTE 6--14 Implement the feature.

MINUTE 14--17 Run and test it.

MINUTE 17--19 Fix obvious issues and polish the UI.

MINUTE 19--20 Demonstrate the feature.

Do not attempt a complete architectural rewrite.



 67. FINAL-ROUND AI PROMPT

When the feature is revealed, the first prompt to the coding agent
should follow this structure:

"You are working on the existing Oculus-AI project.

Read PROJECT_CONTEXT.md and DESIGN_SYSTEM.md before making changes.

A new hackathon feature has just been revealed:

INSERT FEATURE REQUIREMENT

We have approximately 20 minutes to implement it.

Do NOT redesign the existing application.

First inspect the repository and identify:

1 The most appropriate existing feature area. 2. Components that can
be reused. 3. Existing types/data that can be reused. 4. Whether a new
API is actually required. 5. The minimum files that need to change. 6.
The smallest implementation that satisfies the requirement.

Prioritize: - correctness - visual consistency - minimal changes -
reuse - speed - stability

Do not introduce new dependencies unless absolutely necessary.

Do not modify unrelated features.

After determining the implementation plan, implement it."



 68. FINAL-ROUND AI AGENT SELECTION

Use the AI tools according to their existing roles.

Primary implementation:

CURSOR

or

CLAUDE

depending on which is available and has sufficient context/quota.

Use ChatGPT for:

 interpreting the feature - deciding the implementation strategy -
writing/refining the implementation prompt - debugging explanations -
deciding what NOT to build

Use Antigravity for:

 rapid review - identifying breakage - checking whether the new
feature fits the existing design

Do NOT waste the limited 20 minutes by asking every AI tool to
independently rebuild the same feature.



 69. FINAL-ROUND DESIGN RULE

The unknown feature must inherit Oculus-AI's existing visual language.

It should use:

 existing typography - existing spacing - existing colors - existing
status indicators - existing motion principles - existing components

The final feature should look as though it was always part of Oculus-AI.

A judge should NOT be able to visually identify:

"this feature was added five minutes ago."



 70. FINAL-ROUND GIT STRATEGY

Before the final round begins:

CREATE A STABLE CHECKPOINT.

Example:

git commit -m "chore: finalize stable build before live round"

Then push it.

The stable version becomes the recovery point.

During the live feature round:

1 Create a feature branch.

Example:

feature/live-round

2 Implement the feature.

3 Test.

4 Commit:

feat: add live hackathon feature

5 Push.

6 If something goes wrong, the stable pre-round commit remains
available.



 71. FINAL-ROUND SAFETY RULE

Before the final round, the application must already be:

 Working - Deployable - Tested - Committed - Pushed - Recoverable

Do NOT enter the live round with uncommitted experimental changes.



 72. FINAL-ROUND DOCUMENTATION

After the live feature is implemented, add the exact prompt used to
prompts.md.

Example:

# Final Round Feature

## Requirement

Feature provided by judges

## Initial Analysis Prompt

Prompt

## Implementation Prompt

Prompt

## Debugging Prompt

Prompt

## Final Result

Short description

This preserves the AI-assisted development process for the submission.



 73. FINAL-ROUND SUCCESS CRITERIA

The feature is successful if:

1 It satisfies the requested requirement. 2. It works with the
existing application. 3. It visually belongs to Oculus-AI. 4. It does
not break existing features. 5. It can be demonstrated quickly. 6. The
implementation is understandable. 7. The application remains deployable.

A smaller working feature is better than an ambitious incomplete
feature.



 74. CORE PRINCIPLE FOR THE FINAL ROUND

 Do not build for the unknown feature.  Build a system that is easy
to extend when the unknown feature  becomes known.

The goal is not to predict the judges.

The goal is to make Oculus-AI modular enough that we can adapt quickly.

 Oculus-AI Live Round Playbook

# Before the round

 Pull latest main - Confirm application works - Confirm deployment
works - Commit stable checkpoint - Push stable checkpoint - Open
Cursor - Open Antigravity - Keep PROJECT_CONTEXT.md available - Keep
DESIGN_SYSTEM.md available - Keep prompts.md available

# When feature is announced

1 Copy exact requirement. 2. Ask ChatGPT to interpret it. 3. Identify
affected feature area. 4. Ask Cursor to inspect repository. 5. Implement
minimum viable version. 6. Test. 7. Polish. 8. Commit. 9. Push. 10.
Demonstrate.

# Never do

 Rewrite architecture - Redesign entire UI - Add unnecessary
dependencies - Touch unrelated components - Replace working features -
Build more than the requirement asks for





75. LOVABLE IMPLEMENTATION CONTEXT



Purpose

The approved visual exploration has already been created in Stitch.

Stitch is the design reference. Lovable is now responsible for turning
those approved screens into one coherent, working frontend.

Lovable MUST NOT redesign the Oculus-AI product identity, invent a new
visual direction, or replace the approved Stitch layouts with a generic
dashboard.

The goal is:

STITCH DESIGN ↓ LOVABLE IMPLEMENTATION ↓ WORKING OCULUS-AI APPLICATION

The Stitch screens are visual source material, not separate application
pages.

Approved Screen States

The frontend should implement the approved Stitch designs as reusable
application states:





INITIALIZE / DORMANT



OBSERVE / ACTIVE SIGNAL



REMEMBER / MEMORY RETRIEVAL



EVALUATE / EVIDENCE ANALYSIS



DECIDE / EDITORIAL DECISION



PUBLISH / PUBLISHED RESEARCH



REJECT / REJECTED DECISION

These are states of one autonomous research system, not seven unrelated
products.

The core experience is:

INITIALIZE ↓ OBSERVE ↓ REMEMBER ↓ EVALUATE ↓ DECIDE ↙ ↘ REJECT PUBLISH

After publication, memory continuity remains part of the system.

Initialization Experience

The first screen is an activation experience, not a marketing landing
page.

The human initializes Oculus-AI once.

After initialization, the autonomous research loop begins.

The initialization screen should communicate:

OCULUS-AI AUTONOMOUS AI CYBERSECURITY RESEARCHER

WATCH THE SECURITY FRONTIER. SEPARATE SIGNAL FROM NOISE. PUBLISH WHAT
ACTUALLY MATTERS.

Before activation, the system is honestly dormant.

Example state:

AGENT STATE DORMANT

AUTONOMOUS LOOP STANDBY

OBSERVATION WAITING

MEMORY READY

EDITORIAL ENGINE READY

PUBLICATION IDLE

The primary action is:

INITIALIZE OCULUS-AI

The transition should communicate:

DORMANT → INITIALIZING → ACTIVE

Then enter the Operations / OBSERVE experience.

Do not display fake scanning, thinking, analyzing, or live telemetry
before the system is actually performing those operations.

Stitch-to-Lovable Rule

When a Stitch screen exists for a state, use it as the visual source of
truth.

Preserve:





composition



information hierarchy



typography



colors



spacing



pipeline placement



3D/spatial treatment



sharp geometry



visual density



interaction intent

Lovable may make implementation-level changes required for
responsiveness, accessibility, performance, or reusable component
architecture.

Lovable must NOT:





replace the design with a generic SaaS dashboard



introduce rounded consumer-style cards



introduce glassmorphism



introduce cyberpunk neon



add decorative 3D environments



add unnecessary gradients



add random animations



invent additional product areas



redesign navigation without a product reason



invent backend data



fabricate autonomous activity



One System, Not Separate Screens

Do not implement each Stitch export as an isolated route with duplicated
UI.

Create reusable components and state-driven rendering.

The same investigation/case should persist while moving through:

OBSERVE → REMEMBER → EVALUATE → DECIDE → PUBLISH / REJECT

The autonomous pipeline is one reusable component.

Pipeline states:

IDLE OBSERVING REMEMBERING EVALUATING DECIDING PUBLISHED REJECTED

The visual state must be derived from actual application/backend state.

3D / Spatial Visualization

The approved Stitch designs include 3D/spatial visual treatment.

Preserve this idea, but keep it purposeful.

3D should represent:





cybersecurity signals



sources



evidence



historical relationships



decision convergence



publication flow

3D must NOT become a decorative futuristic environment.

Use:





subtle depth



perspective



restrained parallax



spatial positioning



thin structural connections



deliberate signal movement

Do not use:





random floating particles



giant glowing spheres



sci-fi holograms



constant camera movement



fake scanning



decorative network animations

The interface should feel alive because Oculus-AI is doing something.

When Oculus-AI is idle, the visualization should settle.

Motion Must Follow System Events

Motion is state communication.

Signal movement: Only when a real signal moves between pipeline stages.

Memory retrieval: Only when memory is actually queried.

Source activation: Only when a source is actually being processed.

Evaluation transition: Only when evaluation actually changes state.

Decision transition: Only when the backend records a decision.

Publication reveal: Only when a publication is actually created.

Rejected state: The signal path terminates at DECIDE and does not
continue to PUBLISH.

Reduced-motion users must receive equivalent state information without
requiring animation.

Backend Truth

The frontend is not allowed to simulate autonomous intelligence as if it
were real.

The backend is the source of truth for:





agent state



current operation



observations



memory matches



evaluation data



editorial decisions



rejection reasons



publications



rationale



sources



system health

If backend data is unavailable, use an honest:

LOADING EMPTY UNAVAILABLE ERROR

state as appropriate.

Do not fabricate:





confidence scores



evaluation scores



source activity



memory matches



publications



decisions



system health



autonomous activity



Operations Priority

Operations is the primary application experience.

It must make the following understandable immediately:

WHO: Oculus-AI, autonomous AI cybersecurity researcher.

WHAT: What cybersecurity signal is currently being observed.

WHERE: Which stage of the autonomous pipeline is active.

WHY: Why the candidate is being evaluated.

RESULT: Whether it was published or rejected.

EVIDENCE: Which sources and historical context support the decision.

Cybersecurity Persona

The product persona is:

AUTONOMOUS AI CYBERSECURITY RESEARCHER

Oculus-AI focuses on AI cybersecurity and closely related technology
security topics.

The interface and copy should sound:





professional



analytical



precise



skeptical



evidence-driven



calm



technical



independent

Avoid generic AI language such as:

"AI magic" "AI thinking" "Intelligence activated" "Generating insights"

Prefer concrete operational language:

"Observing" "Monitoring" "New signal" "New observation" "Source
detected" "Checking previous coverage" "Evidence linked" "Decision
recorded" "Published" "Rejected"

Product Copy

Primary positioning:

Oculus-AI is an autonomous AI cybersecurity researcher that
independently discovers live information, evaluates whether developments
are worth publishing, writes in a consistent editorial voice, remembers
previously published content, and continues publishing over time without
additional human prompts.

Short hero/identity language:

OCULUS-AI AUTONOMOUS AI CYBERSECURITY RESEARCHER

WATCH THE SECURITY FRONTIER. SEPARATE SIGNAL FROM NOISE. PUBLISH WHAT
ACTUALLY MATTERS.

Do not turn this into generic marketing copy.

Lovable Development Sequence

Implement in this order:





Read PROJECT_CONTEXT.md.



Establish the existing design system.



Build the application shell.



Build the Initialization screen from the approved Stitch design.



Build the reusable AutonomousPipeline.



Build Operations / OBSERVE.



Build REMEMBER.



Build EVALUATE.



Build DECIDE.



Build PUBLISH and REJECT as terminal states of the same decision

flow.



Connect real backend data.



Add loading, empty and error states.



Verify responsive behavior.



Verify reduced-motion behavior.



Review against the approved Stitch screens.



Only then perform visual polish.

Do not build unnecessary pages simply because Stitch contains multiple
visual explorations.

Lovable Working Rule

Before making a significant design change, ask:

Does this make the autonomous cybersecurity research process clearer?

If NO: do not add it.

If YES: implement it using the existing Oculus-AI design system.

Lovable is implementing an established product direction.

It is not redefining that direction.

Final Judge Experience

The final experience should communicate:

Within 5 seconds: "This is an autonomous cybersecurity researcher."

Within 15 seconds: "It watches live security information and finds
meaningful signals."

Within 30 seconds: "It remembers previous coverage and evaluates
evidence."

Within 60 seconds: "It makes an editorial decision and I can see why."

During the demonstration: "I can watch an autonomous research run move
from observation to publication or rejection."

The product should feel alive because the autonomous system is
operating, not because the interface is constantly animated.

# Oculus AI — Product Specification

## What is Oculus AI?

Oculus AI is an autonomous AI technology intelligence platform that continuously observes the technology ecosystem, identifies meaningful developments, evaluates their significance, and publishes original insights without requiring continuous human instructions.

## Core Persona

Name: Oculus AI

Domain: AI and Technology

Role: Autonomous Technology Intelligence Analyst

Editorial identity:
- Curious
- Technical
- Evidence-driven
- Skeptical of hype
- Interested in meaningful technological developments
- Focused on AI and emerging technology

## Core Behaviour

After initialization, Oculus should:

1. Discover technology topics from live information sources.
2. Evaluate discovered topics.
3. Reject topics that don't meet its editorial standards.
4. Select worthwhile topics.
5. Generate an original post.
6. Remember previously covered topics.
7. Avoid unnecessary repetition.
8. Publish autonomously over time.
9. Provide a rationale and sources for every published post.

## Required API

POST /api/agent/init

GET /api/agent/feed?agentId=...

## Required Feed Fields

Every post must contain:

- id
- createdAt
- text
- rationale
- sources

## Autonomous Cycle

Discover → Filter → Evaluate → Remember → Write → Publish

## Non-Goals

We are NOT building:

- Real social media posting
- Multi-agent architecture
- Engagement analytics
- Image/video generation
- Complex user authentication
- Mobile application

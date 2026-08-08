# Oculus-AI // Autonomous AI Cybersecurity Agent Observation Interface

**Oculus-AI** is an autonomous AI & technology persona interface built to observe, evaluate, remember, decide, and publish cybersecurity research intelligence without human prompts.

---

## 🌟 Executive Summary

In today's AI ecosystem, thousands of posts are published daily, but almost all require human initiation. **Oculus-AI** flips this paradigm by operating as an autonomous cybersecurity newsroom and investigation engine:
1. **Topic Discovery**: Listens to live information sources (Hacker News, arXiv AI/Security, Tech RSS).
2. **Editorial Judgment**: Intentionally rejects low-signal marketing news and surface-level chatter.
3. **Memory Vault**: Cross-references vector embeddings against historical incidents to avoid repetition.
4. **Autonomous Publishing**: Continuously publishes verified research artifacts over time.

---

## 🚀 API Contracts & Integration

### 1. Agent Initialization
- **Endpoint**: `POST /api/agent/init`
- **Request Body**:
  ```json
  {
    "persona": {
      "name": "Oculus-AI",
      "domain": "AI Security"
    }
  }
  ```
- **Response Body**:
  ```json
  {
    "agentId": "oculus-sec-9a4f"
  }
  ```

### 2. Retrieve Feed
- **Endpoint**: `GET /api/agent/feed?agentId=oculus-sec-9a4f`
- **Response Body**:
  ```json
  {
    "posts": [
      {
        "id": "PUB-2026-08-08-41",
        "createdAt": "2026-08-08T13:30:00Z",
        "text": "Autonomous security analysis has identified a systemic architectural flaw in how contemporary cloud runtime environments isolate multi-tenant Large Language Model (LLM) inference processes...",
        "rationale": "High correlation with emerging sandbox escape techniques observed across honeypots. Prioritized over generic CVEs.",
        "sources": [
          "https://news.ycombinator.com/item?id=41198234",
          "https://arxiv.org/abs/2408.01234"
        ]
      }
    ]
  }
  ```

---

## 🏗️ Architecture & Technology Stack

- **Framework**: Next.js 14 (App Router, React 18, TypeScript)
- **Styling**: Tailwind CSS + Glassmorphic Cyber-Dark Design System (`globals.css`)
- **3D Spatial Field**: Three.js WebGL canvas (gyroscope orbital core, floating node coordinates, grid plane)
- **Motion Engine**: Framer Motion state-driven pipeline transitions
- **API Adapter Layer**: Decoupled `AgentApiAdapter` supporting seamless transition between `RealAdapter` and `MockAdapter`.

---

## 💻 Local Development & Verification

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Open browser at http://localhost:3000
```

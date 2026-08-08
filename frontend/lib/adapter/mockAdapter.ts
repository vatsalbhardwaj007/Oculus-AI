import { AgentApiAdapter, PersonaConfig, Post, SignalCandidate } from './types';

export const MOCK_SIGNAL_CANDIDATE: SignalCandidate = {
  id: "sig-0427-vulnerability",
  signalId: "0427",
  title: "AI Agent Permission Boundary Vulnerability in Cloud Runtimes",
  threatLevel: "HIGH",
  confidenceScore: 0.94,
  threshold: 0.12,
  vectorMatchScore: 0.844,
  historicalMatchCount: 3,
  matchedIncidents: ["SEC-2024-11", "SEC-2024-04", "CVE-2024-8902"],
  vulnerabilityVerified: true,
  exploitPathConfirmed: true,
  rawPayload: JSON.stringify({
    event: "OBSERVATION_LIVE",
    threat_level: "ELEVATED",
    nodes_active: 142,
    vector_search: { score: "84.4%", match: "FOUND" },
    payload: "intercepting payload... [err] mem_leak pattern matched... elevating threat matrix."
  }, null, 2),
  sources: [
    "https://news.ycombinator.com/item?id=41198234",
    "https://arxiv.org/abs/2408.01234"
  ],
  outcome: "PUBLISH",
  postText: "Autonomous security analysis has identified a systemic architectural flaw in how contemporary cloud runtime environments isolate multi-tenant Large Language Model (LLM) inference processes. The vulnerability allows an improperly sandboxed agent to manipulate permission scopes by exploiting race conditions in token-based authorization checks during context switching.\n\nThis is not a theoretical model risk, but a verified infrastructural exploit path. Telemetry indicates that agents executing complex, multi-step reasoning tasks can, under specific load conditions, bypass containerized boundaries and access memory space allocated to adjacent execution threads.",
  rationale: "High correlation with emerging sandbox escape techniques and novel payload patterns observed across distributed honeypot networks. The decision engine prioritized this over standard CVEs due to the foundational nature of the affected runtimes.",
};

export const MOCK_REJECTED_CANDIDATE: SignalCandidate = {
  id: "sig-0912-marketing",
  signalId: "0912",
  title: "Consumer Tech Announcement: Novel LLM Browser Extension Released",
  threatLevel: "LOW",
  confidenceScore: 0.31,
  threshold: 0.75,
  vectorMatchScore: 0.12,
  historicalMatchCount: 0,
  matchedIncidents: [],
  vulnerabilityVerified: false,
  exploitPathConfirmed: false,
  rawPayload: JSON.stringify({
    event: "OBSERVATION_LIVE",
    threat_level: "NOMINAL",
    nodes_active: 142,
    vector_search: { score: "12.0%", match: "NONE" }
  }, null, 2),
  sources: ["https://techcrunch.com/sample-extension"],
  outcome: "REJECT",
  rejectionCode: "[SYS.ERR.409]",
  rejectionReason: "Anomaly detected in evaluation matrix. Topic identified as consumer marketing pitch without infrastructure security impact. Signal path terminated."
};

class MockAdapterImpl implements AgentApiAdapter {
  private posts: Post[] = [];

  constructor() {
    // Initial mock post matching Stitch PUBLISH screen
    this.posts = [
      {
        id: "PUB-2026-08-08-41",
        createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
        text: MOCK_SIGNAL_CANDIDATE.postText!,
        rationale: MOCK_SIGNAL_CANDIDATE.rationale!,
        sources: MOCK_SIGNAL_CANDIDATE.sources,
      }
    ];
  }

  async initAgent(persona: PersonaConfig): Promise<{ agentId: string }> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    return {
      agentId: `oculus-sec-${Math.random().toString(36).substring(2, 8)}`,
    };
  }

  async getFeed(agentId: string): Promise<{ posts: Post[] }> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return { posts: this.posts };
  }

  // Helper method for demo simulation to inject new post into mock feed
  addMockPost(post: Post) {
    this.posts.unshift(post);
  }
}

export const mockAdapter = new MockAdapterImpl();

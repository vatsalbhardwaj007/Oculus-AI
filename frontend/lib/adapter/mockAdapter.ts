import { AgentApiAdapter, PersonaConfig, Post, SignalCandidate, AgentRecord } from './types';

export const MOCK_SIGNAL_CANDIDATE_PUBLISH: SignalCandidate = {
  id: "sig-0908-ai-security",
  signalId: "0908",
  title: "AI Agent Permission Boundary Vulnerability in Cloud Runtimes",
  source: "Security Research",
  severity: "HIGH",
  initialConfidence: 0.31,
  confidenceScore: 0.94,
  threshold: 0.75,
  noveltyScore: 0.82,
  overlapLevel: "LOW",
  similarityIndex: 16.4,
  relatedRecordsCount: 3,
  vectorMatchScore: 0.844,
  sourceQuality: "AUTHORITATIVE",
  threatRelevance: "CRITICAL",
  sources: [
    "https://arxiv.org/abs/2608.01234",
    "https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2026-8902"
  ],
  outcome: "PUBLISH",
  rawPayload: JSON.stringify({
    event: "OBSERVATION_LIVE",
    signal_id: "0908",
    source: "Security Research",
    threat_level: "HIGH",
    vector_search: { score: "84.4%", match: "FOUND", distance: 0.836 },
    telemetry: "Ingesting raw exploit payload... [ok] pattern matched... elevating threat matrix to CRITICAL."
  }, null, 2),
  postText: "Autonomous security analysis has identified a systemic architectural flaw in how contemporary cloud runtime environments isolate multi-tenant Large Language Model (LLM) inference processes. The vulnerability allows an improperly sandboxed agent to manipulate permission scopes by exploiting race conditions in token-based authorization checks during context switching.\n\nThis is not a theoretical model risk, but a verified infrastructural exploit path. Telemetry indicates that agents executing complex, multi-step reasoning tasks can, under specific load conditions, bypass containerized boundaries and access memory space allocated to adjacent execution threads.",
  rationale: "High correlation with emerging sandbox escape techniques and novel payload patterns observed across distributed honeypot networks. The decision engine prioritized this over standard CVEs due to the foundational nature of the affected runtimes.",
  whySelected: [
    "High security relevance",
    "Strong evidence quality",
    "Low overlap with previous research",
    "Significant architectural implications"
  ],
  whyItMattersNow: [
    "Agentic systems are rapidly entering production",
    "Attack surface is expanding",
    "New deployment patterns increase exposure"
  ]
};

export const MOCK_SIGNAL_CANDIDATE_REJECT: SignalCandidate = {
  id: "sig-0912-marketing",
  signalId: "0912",
  title: "Consumer Tech Announcement: Novel LLM Browser Extension Released",
  source: "Tech Marketing Feed",
  severity: "LOW",
  initialConfidence: 0.18,
  confidenceScore: 0.29,
  threshold: 0.75,
  noveltyScore: 0.12,
  overlapLevel: "HIGH",
  similarityIndex: 78.2,
  relatedRecordsCount: 14,
  vectorMatchScore: 0.12,
  sourceQuality: "UNVERIFIED",
  threatRelevance: "LOW",
  sources: ["https://techcrunch.com/sample-extension-announcement"],
  outcome: "REJECT",
  rawPayload: JSON.stringify({
    event: "OBSERVATION_LIVE",
    signal_id: "0912",
    source: "Tech Marketing Feed",
    threat_level: "LOW",
    vector_search: { score: "12.0%", match: "NONE" },
    rejection: "Promotional content without infrastructure security impact."
  }, null, 2),
  rejectionCode: "EDITORIAL_STANDARD_NOT_MET",
  rejectionReason: "Anomaly detected in evaluation matrix. Topic identified as consumer marketing pitch without infrastructure security impact. Signal path terminated.",
  whyRejected: [
    "Promotional content",
    "Insufficient technical evidence",
    "Low security relevance",
    "Limited new information"
  ]
};

export const INITIAL_HISTORICAL_POSTS: Post[] = [
  {
    id: "PUB-2026-08-07-02",
    createdAt: "2026-08-07T10:30:00Z",
    title: "AI Agent Permission Boundaries Are Failing In Production",
    text: "Production deployment analysis reveals critical security isolation gaps in autonomous agent runtimes. Multi-tenant LLM orchestrators frequently share memory pointers across context windows without cryptographic scope validation, enabling cross-agent data extraction.",
    rationale: "High security relevance, low memory overlap, and critical architectural implications for enterprise AI infrastructure.",
    confidenceScore: 0.91,
    noveltyScore: 0.79,
    overlapLevel: "LOW",
    sources: [
      "https://security.research.org/agent-isolation-2026",
      "https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2026-4401"
    ],
    whySelected: [
      "High security relevance",
      "Strong evidence",
      "Low memory overlap"
    ],
    whyItMattersNow: [
      "Agent frameworks are entering production",
      "Permission boundaries are becoming a major attack surface"
    ]
  },
  {
    id: "PUB-2026-08-04-01",
    createdAt: "2026-08-04T14:15:00Z",
    title: "Zero-Day Speculative Execution Vector Discovered in Edge NPU Architectures",
    text: "Hardware-level side-channel vulnerability confirmed in leading neural processing unit architectures. Microcode instruction reordering allows unprivileged guest processes to reconstruct weights from adjacent cryptographic enclaves.",
    rationale: "Foundational hardware exploit verified via honeypot telemetry and hardware logic simulation.",
    confidenceScore: 0.96,
    noveltyScore: 0.88,
    overlapLevel: "LOW",
    sources: [
      "https://arxiv.org/abs/2608.00192",
      "https://hardware-sec.org/npu-side-channel"
    ],
    whySelected: [
      "Critical hardware vulnerability",
      "Verified exploit payload",
      "Zero previous coverage"
    ],
    whyItMattersNow: [
      "Edge AI hardware deployments rely on unhardened microcode",
      "Speculative execution exploits affect physical device security"
    ]
  }
];

class MockAdapterImpl implements AgentApiAdapter {
  private posts: Post[] = [...INITIAL_HISTORICAL_POSTS];

  async initAgent(persona: PersonaConfig): Promise<{ agentId: string }> {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return {
      agentId: `oculus-sec-${Math.random().toString(36).substring(2, 8)}`,
    };
  }

  async getFeed(agentId: string): Promise<{ posts: Post[] }> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return { posts: this.posts };
  }

  async runPipeline(agentId: string) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {
      success: true,
      discovered: 50,
      newTopics: 5,
      rejected: 4,
      published: 1,
      agentId,
      isProduction: false,
      publishedToProduction: false,
    };
  }

  async listAgents(): Promise<{ agents: AgentRecord[] }> {
    return {
      agents: [
        {
          id: '2116492e-8019-425d-8ee9-af0686882c91',
          name: 'Oculus Test',
          domain: 'AI Systems & Cybersecurity Analyst',
          createdAt: new Date().toISOString(),
          status: 'stopped',
          scheduleEnabled: false,
          scheduleIntervalMinutes: 15,
          lastRunAt: null,
          nextRunAt: null,
          isProduction: false,
        },
        {
          id: 'da694384-4f41-4204-8d25-df1abd2010fc',
          name: 'Oculus AI',
          domain: 'AI Systems & Cybersecurity Analyst',
          createdAt: new Date().toISOString(),
          status: 'stopped',
          scheduleEnabled: false,
          scheduleIntervalMinutes: 15,
          lastRunAt: null,
          nextRunAt: null,
          isProduction: true,
        },
      ],
    };
  }

  async startAgent(agentId: string) {
    return {
      success: true,
      status: 'running',
      scheduleEnabled: true,
      nextRunAt: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
    };
  }

  async stopAgent(agentId: string) {
    return {
      success: true,
      status: 'stopped',
      scheduleEnabled: false,
    };
  }

  addMockPost(post: Post) {
    this.posts = [post, ...this.posts];
  }
}

export const mockAdapter = new MockAdapterImpl();

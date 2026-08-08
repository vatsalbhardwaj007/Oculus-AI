export interface PersonaConfig {
  name: string;
  domain: string;
}

export interface Post {
  id: string;
  createdAt: string; // ISO 8601 UTC
  text: string;
  rationale: string;
  sources: string[];
}

export type PipelineStage = 
  | 'OBSERVE'
  | 'REMEMBER'
  | 'EVALUATE'
  | 'DECIDE'
  | 'PUBLISH'
  | 'REJECT';

export type AgentUIState =
  | 'STANDBY'
  | 'INITIALIZING'
  | 'ACTIVE'
  | 'IDLE'
  | 'OBSERVING'
  | 'REMEMBERING'
  | 'EVALUATING'
  | 'DECIDING'
  | 'PUBLISHED'
  | 'REJECTED'
  | 'ERROR';

export interface SignalCandidate {
  id: string;
  signalId: string;
  title: string;
  threatLevel: 'CRITICAL' | 'HIGH' | 'ELEVATED' | 'LOW';
  confidenceScore: number; // e.g. 0.94 (94%)
  threshold: number; // e.g. 0.12
  vectorMatchScore: number; // e.g. 0.844 (84.4%)
  historicalMatchCount: number;
  matchedIncidents: string[];
  vulnerabilityVerified: boolean;
  exploitPathConfirmed: boolean;
  rawPayload: string;
  sources: string[];
  outcome: 'PUBLISH' | 'REJECT';
  postText?: string;
  rationale?: string;
  rejectionCode?: string;
  rejectionReason?: string;
}

export interface AgentApiAdapter {
  initAgent(persona: PersonaConfig): Promise<{ agentId: string }>;
  getFeed(agentId: string): Promise<{ posts: Post[] }>;
}

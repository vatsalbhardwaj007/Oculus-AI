export interface PersonaConfig {
  name: string;
  domain: string;
}

export interface Post {
  id: string;
  createdAt: string; // ISO 8601 UTC
  title: string;
  text: string;
  rationale: string;
  sources: string[];
  confidenceScore: number;
  noveltyScore: number;
  overlapLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  whySelected: string[];
  whyItMattersNow: string[];
}

export type PipelineStage = 
  | 'OBSERVE'
  | 'REMEMBER'
  | 'EVALUATE'
  | 'DECIDE'
  | 'PUBLISH'
  | 'REJECT'
  | 'MEMORY'
  | 'COMPLETE';

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

export interface ActivityLogEntry {
  id: string;
  timestamp: string; // e.g. "00:39:51"
  message: string;
  stage?: PipelineStage;
  type?: 'INFO' | 'SUCCESS' | 'WARN' | 'ERROR';
}

export interface SignalCandidate {
  id: string;
  signalId: string;
  title: string;
  source: string;
  severity: 'CRITICAL' | 'HIGH' | 'ELEVATED' | 'LOW';
  confidenceScore: number; // e.g. 0.94 (94%)
  initialConfidence: number; // e.g. 0.31 (31%)
  threshold: number; // e.g. 0.75
  noveltyScore: number; // e.g. 0.82
  overlapLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  similarityIndex: number; // e.g. 16.4%
  relatedRecordsCount: number; // e.g. 3
  vectorMatchScore: number; // e.g. 0.844 (84.4%)
  sourceQuality: 'AUTHORITATIVE' | 'VERIFIED' | 'COMMUNITY' | 'UNVERIFIED';
  threatRelevance: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  sources: string[];
  outcome: 'PUBLISH' | 'REJECT';
  rawPayload?: string;
  
  // Rationale for Published
  postText?: string;
  rationale?: string;
  whySelected?: string[];
  whyItMattersNow?: string[];

  // Rationale for Rejected
  rejectionCode?: string;
  rejectionReason?: string;
  whyRejected?: string[];
}

export interface AgentApiAdapter {
  initAgent(persona: PersonaConfig): Promise<{ agentId: string }>;
  getFeed(agentId: string): Promise<{ posts: Post[] }>;
}

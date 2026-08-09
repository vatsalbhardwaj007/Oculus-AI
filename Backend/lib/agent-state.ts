// ──────────────────────────────────────────────
// In-Memory Agent Status & Scheduler Lock Store
// Provides reliable fallback state when Supabase columns are not yet migrated.
// ──────────────────────────────────────────────

export interface AgentRuntimeState {
  status: "stopped" | "running" | "processing";
  scheduleEnabled: boolean;
  scheduleIntervalMinutes: number;
  lastRunAt: string | null;
  nextRunAt: string | null;
}

const memoryStateMap = new Map<string, AgentRuntimeState>();

// Default state ID for Oculus AI
export const DEFAULT_PROD_ID = "da694384-4f41-4204-8d25-df1abd2010fc";

export function getAgentRuntimeState(agentId: string): AgentRuntimeState {
  if (!memoryStateMap.has(agentId)) {
    memoryStateMap.set(agentId, {
      status: "stopped",
      scheduleEnabled: false,
      scheduleIntervalMinutes: 15,
      lastRunAt: null,
      nextRunAt: null,
    });
  }
  return memoryStateMap.get(agentId)!;
}

export function setAgentRuntimeState(
  agentId: string,
  partial: Partial<AgentRuntimeState>
): AgentRuntimeState {
  const current = getAgentRuntimeState(agentId);
  const updated: AgentRuntimeState = {
    ...current,
    ...partial,
  };
  memoryStateMap.set(agentId, updated);
  return updated;
}

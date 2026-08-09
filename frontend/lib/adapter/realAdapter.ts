import { AgentApiAdapter, PersonaConfig, Post, PipelineSummary } from './types';

class RealAdapterImpl implements AgentApiAdapter {
  private get baseUrl() {
    return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
  }

  async initAgent(persona: PersonaConfig): Promise<{ agentId: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/api/agent/init`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ persona }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Failed to initialize agent: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (err: any) {
      if (err.name === 'TypeError' && err.message.includes('fetch')) {
        throw new Error(`Cannot connect to Backend at ${this.baseUrl}. Is the backend server running on port 3001?`);
      }
      throw err;
    }
  }

  async getFeed(agentId: string): Promise<{ posts: Post[] }> {
    try {
      const response = await fetch(`${this.baseUrl}/api/agent/feed?agentId=${encodeURIComponent(agentId)}`);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Failed to fetch feed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      // Transform Supabase post records if needed to match Post interface
      const posts: Post[] = (data.posts || []).map((p: any) => ({
        id: p.id,
        createdAt: p.created_at || new Date().toISOString(),
        title: p.title || p.text?.substring(0, 60) + '...' || 'Discovered Analysis',
        text: p.text || '',
        rationale: p.rationale || '',
        sources: Array.isArray(p.sources) ? p.sources : (p.sources ? [p.sources] : []),
        confidenceScore: p.score ? p.score / 100 : 0.88,
        noveltyScore: p.novelty_score ?? 0.85,
        overlapLevel: p.overlap_level || 'LOW',
        whySelected: p.why_selected || ['High security relevance', 'Strong evidence quality'],
        whyItMattersNow: p.why_matters || ['Timely discovery from live RSS security feeds']
      }));

      return { posts };
    } catch (err: any) {
      if (err.name === 'TypeError' && err.message.includes('fetch')) {
        throw new Error(`Cannot connect to Backend at ${this.baseUrl}. Is the backend server running on port 3001?`);
      }
      throw err;
    }
  }

  async runPipeline(agentId: string): Promise<PipelineSummary> {
    try {
      const response = await fetch(`${this.baseUrl}/api/agent/run`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ agentId }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Pipeline failed: ${response.status} ${response.statusText}`);
      }

      const data: PipelineSummary = await response.json();
      return data;
    } catch (err: any) {
      if (err.name === 'TypeError' && err.message.includes('fetch')) {
        throw new Error(`Cannot connect to Backend at ${this.baseUrl}. Is the backend server running on port 3001?`);
      }
      throw err;
    }
  }

  async listAgents() {
    try {
      const response = await fetch(`${this.baseUrl}/api/agent/list`);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Failed to list agents: ${response.status}`);
      }
      return await response.json();
    } catch (err: any) {
      if (err.name === 'TypeError' && err.message.includes('fetch')) {
        throw new Error(`Cannot connect to Backend at ${this.baseUrl}.`);
      }
      throw err;
    }
  }

  async startAgent(agentId: string) {
    try {
      const response = await fetch(`${this.baseUrl}/api/agent/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ agentId }),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Failed to start agent: ${response.status}`);
      }
      return await response.json();
    } catch (err: any) {
      throw err;
    }
  }

  async stopAgent(agentId: string) {
    try {
      const response = await fetch(`${this.baseUrl}/api/agent/stop`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ agentId }),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Failed to stop agent: ${response.status}`);
      }
      return await response.json();
    } catch (err: any) {
      throw err;
    }
  }
}

export const realAdapter = new RealAdapterImpl();



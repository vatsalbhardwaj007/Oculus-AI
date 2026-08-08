import { AgentApiAdapter, PersonaConfig, Post } from './types';

class RealAdapterImpl implements AgentApiAdapter {
  async initAgent(persona: PersonaConfig): Promise<{ agentId: string }> {
    const response = await fetch('/api/agent/init', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ persona }),
    });

    if (!response.ok) {
      throw new Error(`Failed to initialize agent: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  }

  async getFeed(agentId: string): Promise<{ posts: Post[] }> {
    const response = await fetch(`/api/agent/feed?agentId=${encodeURIComponent(agentId)}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch feed: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  }
}

export const realAdapter = new RealAdapterImpl();

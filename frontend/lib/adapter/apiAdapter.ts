import { AgentApiAdapter } from './types';
import { mockAdapter } from './mockAdapter';
import { realAdapter } from './realAdapter';

// Environment switchable or fallback to mock adapter if backend API returns error
const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK_API !== 'false';

export const apiAdapter: AgentApiAdapter = USE_MOCK ? mockAdapter : realAdapter;

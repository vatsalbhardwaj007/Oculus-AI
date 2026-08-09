import { AgentApiAdapter } from './types';
import { mockAdapter } from './mockAdapter';
import { realAdapter } from './realAdapter';

// Use real backend adapter by default unless NEXT_PUBLIC_USE_MOCK_API is set to 'true'
const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK_API === 'true';

export const apiAdapter: AgentApiAdapter = USE_MOCK ? mockAdapter : realAdapter;


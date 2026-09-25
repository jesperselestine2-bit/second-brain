export {};

import type { AgentMessage } from '../agent/types';

declare global {
  interface ShadowContext {
    capturedAt: string;
    cursor?: { x: number; y: number };
    activeWindow: {
      title: string | null;
      application: string | null;
      available: boolean;
    };
    imageDataUrl?: string;
  }

  interface Window {
    shadow: {
      analyzeScreen: (prompt?: string) => Promise<string>;
      getContext: () => Promise<ShadowContext>;
      chat: (message: string, includeScreen?: boolean) => Promise<string>;
      getHistory: () => Promise<AgentMessage[]>;
      clearHistory: () => Promise<void>;
    };
  }
}

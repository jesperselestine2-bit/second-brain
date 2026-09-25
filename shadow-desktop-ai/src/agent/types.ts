export type PermissionScope = 'screen:read' | 'mouse:control' | 'keyboard:control' | 'files:read' | 'files:write' | 'terminal:execute';

export interface PermissionRequest {
  scope: PermissionScope;
  reason: string;
  approved: boolean;
}

export interface ActiveWindowInfo {
  title: string | null;
  application: string | null;
  available: boolean;
}

export interface ScreenContext {
  capturedAt: string;
  activeWindow?: ActiveWindowInfo;
  cursor?: { x: number; y: number };
  imageDataUrl?: string;
}

export interface AgentMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
  images?: string[];
}

export interface ModelConfig {
  provider: 'ollama';
  baseUrl: string;
  model: string;
}

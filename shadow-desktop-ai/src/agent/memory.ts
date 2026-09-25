import type { AgentMessage } from './types';

const memory: AgentMessage[] = [];

export function remember(message: AgentMessage): void {
  memory.push(message);
  if (memory.length > 100) memory.shift();
}

export function getRecentMemory(limit = 20): AgentMessage[] {
  return memory.slice(-limit);
}

export function clearMemory(): void {
  memory.length = 0;
}

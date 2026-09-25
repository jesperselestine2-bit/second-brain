import { promises as fs } from 'node:fs';
import path from 'node:path';
import type { AgentMessage } from './types';

export class ConversationStore {
  private readonly filePath: string;

  constructor(userDataPath: string) {
    this.filePath = path.join(userDataPath, 'conversation.json');
  }

  async load(): Promise<AgentMessage[]> {
    try {
      const raw = await fs.readFile(this.filePath, 'utf8');
      const parsed = JSON.parse(raw) as unknown;
      return Array.isArray(parsed) ? parsed as AgentMessage[] : [];
    } catch {
      return [];
    }
  }

  async save(messages: AgentMessage[]): Promise<void> {
    await fs.mkdir(path.dirname(this.filePath), { recursive: true });
    const trimmed = messages.slice(-100);
    await fs.writeFile(this.filePath, JSON.stringify(trimmed, null, 2), 'utf8');
  }

  async clear(): Promise<void> {
    try { await fs.unlink(this.filePath); } catch { /* already clear */ }
  }
}

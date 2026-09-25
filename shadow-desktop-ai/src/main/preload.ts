import { contextBridge, ipcRenderer } from 'electron';
import type { AgentMessage } from '../agent/types';

contextBridge.exposeInMainWorld('shadow', {
  analyzeScreen: (prompt?: string) => ipcRenderer.invoke('shadow:analyze-screen', prompt),
  getContext: () => ipcRenderer.invoke('shadow:get-context'),
  chat: (message: string, includeScreen = true) => ipcRenderer.invoke('shadow:chat', message, includeScreen),
  getHistory: () => ipcRenderer.invoke('shadow:get-history') as Promise<AgentMessage[]>,
  clearHistory: () => ipcRenderer.invoke('shadow:clear-history'),
});

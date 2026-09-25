import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('shadow', {
  analyzeScreen: (prompt?: string) => ipcRenderer.invoke('shadow:analyze-screen', prompt),
  getContext: () => ipcRenderer.invoke('shadow:get-context'),
});

import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'node:path';
import { collectDesktopContext } from '../agent/context';
import { analyzeScreen } from '../agent/vision';
import { chat } from '../agent/chat';
import { ConversationStore } from '../agent/store';

let window: BrowserWindow | null = null;
let conversationStore: ConversationStore;

function createWindow() {
  window = new BrowserWindow({
    width: 900,
    height: 700,
    minWidth: 560,
    minHeight: 500,
    backgroundColor: '#0c0f16',
    title: 'Shadow Desktop AI',
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  if (process.env.VITE_DEV_SERVER_URL) {
    void window.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    void window.loadFile(path.join(__dirname, '../renderer/index.html'));
  }
}

ipcMain.handle('shadow:get-context', async () => collectDesktopContext());

ipcMain.handle('shadow:analyze-screen', async (_event, prompt?: string) => {
  const context = await collectDesktopContext();
  return analyzeScreen(context, prompt);
});

ipcMain.handle('shadow:chat', async (_event, userText: string, includeScreen = true) => {
  const context = includeScreen ? await collectDesktopContext() : undefined;
  return chat(userText, conversationStore, context);
});

ipcMain.handle('shadow:get-history', async () => conversationStore.load());
ipcMain.handle('shadow:clear-history', async () => conversationStore.clear());

app.whenReady().then(() => {
  conversationStore = new ConversationStore(app.getPath('userData'));
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

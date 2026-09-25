import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'node:path';
import { collectScreenContext } from '../agent/context';
import { analyzeScreen } from '../agent/vision';

let window: BrowserWindow | null = null;

function createWindow() {
  window = new BrowserWindow({
    width: 820,
    height: 520,
    minWidth: 420,
    minHeight: 360,
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

ipcMain.handle('shadow:analyze-screen', async (_event, prompt?: string) => {
  const context = await collectScreenContext();
  return analyzeScreen(context, prompt);
});

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

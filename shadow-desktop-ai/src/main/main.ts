import { app, BrowserWindow } from 'electron';
import path from 'node:path';

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
    },
  });

  if (process.env.VITE_DEV_SERVER_URL) {
    void window.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    void window.loadFile(path.join(__dirname, '../renderer/index.html'));
  }
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

export interface ActiveWindowInfo {
  title: string | null;
  application: string | null;
  desktop: string;
  available: boolean;
}

async function run(command: string, args: string[]): Promise<string> {
  const result = await execFileAsync(command, args, { timeout: 1500 });
  return result.stdout.trim();
}

export async function getActiveWindowInfo(): Promise<ActiveWindowInfo> {
  if (process.platform !== 'linux') {
    return { title: null, application: null, desktop: process.platform, available: false };
  }

  try {
    const windowId = await run('xdotool', ['getactivewindow']);
    const title = await run('xdotool', ['getwindowname', windowId]);

    let application: string | null = null;
    try {
      const pid = await run('xdotool', ['getwindowpid', windowId]);
      const comm = await run('ps', ['-p', pid, '-o', 'comm=']);
      application = comm || null;
    } catch {
      application = null;
    }

    return { title: title || null, application, desktop: 'linux', available: true };
  } catch {
    return { title: null, application: null, desktop: 'linux', available: false };
  }
}

import { screen } from 'electron';
import type { ScreenContext } from './types';
import { capturePrimaryScreen } from './screen';
import { getActiveWindowInfo } from './active-window';

export interface DesktopContext extends ScreenContext {
  activeWindow: {
    title: string | null;
    application: string | null;
    available: boolean;
  };
}

export async function collectDesktopContext(): Promise<DesktopContext> {
  const [context, activeWindow] = await Promise.all([
    capturePrimaryScreen(),
    getActiveWindowInfo(),
  ]);

  return {
    ...context,
    cursor: screen.getCursorScreenPoint(),
    activeWindow: {
      title: activeWindow.title,
      application: activeWindow.application,
      available: activeWindow.available,
    },
  };
}

export async function collectScreenContext(): Promise<ScreenContext> {
  return collectDesktopContext();
}

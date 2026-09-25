import { screen } from 'electron';
import type { ScreenContext } from './types';
import { capturePrimaryScreen } from './screen';

export async function collectScreenContext(): Promise<ScreenContext> {
  const context = await capturePrimaryScreen();
  return {
    ...context,
    cursor: screen.getCursorScreenPoint(),
  };
}

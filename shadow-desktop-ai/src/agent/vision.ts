import type { ModelConfig, ScreenContext } from './types';
import type { DesktopContext } from './context';
import { analyzeImageWithLocalModel } from './ollama';

function dataUrlToBase64(dataUrl: string): string {
  const comma = dataUrl.indexOf(',');
  return comma >= 0 ? dataUrl.slice(comma + 1) : dataUrl;
}

export async function analyzeScreen(
  screenContext: ScreenContext | DesktopContext,
  prompt = 'Describe what is visible on my screen and identify the most useful next step for what I am doing.',
  config?: ModelConfig,
): Promise<string> {
  if (!screenContext.imageDataUrl) throw new Error('No screen image is available.');

  const cursor = screenContext.cursor
    ? `Cursor position: ${screenContext.cursor.x}, ${screenContext.cursor.y}.`
    : '';
  const app = 'activeWindow' in screenContext
    ? `Active application: ${screenContext.activeWindow.application ?? 'unknown'}. Active window: ${screenContext.activeWindow.title ?? 'unknown'}.`
    : '';

  return analyzeImageWithLocalModel(
    `${prompt}\n${app}\n${cursor}\nYou are Shadow, a desktop copilot. Use the image as the primary source of truth. Be concise, identify uncertainty, and never claim to have performed an action.`,
    dataUrlToBase64(screenContext.imageDataUrl),
    config,
  );
}

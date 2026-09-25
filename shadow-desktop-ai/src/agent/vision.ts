import type { ModelConfig, ScreenContext } from './types';
import { analyzeImageWithLocalModel } from './ollama';

function dataUrlToBase64(dataUrl: string): string {
  const comma = dataUrl.indexOf(',');
  return comma >= 0 ? dataUrl.slice(comma + 1) : dataUrl;
}

export async function analyzeScreen(
  screenContext: ScreenContext,
  prompt = 'Describe what is visible on my screen and identify the most useful next step for what I am doing.',
  config?: ModelConfig,
): Promise<string> {
  if (!screenContext.imageDataUrl) throw new Error('No screen image is available.');

  const cursor = screenContext.cursor ? ` Cursor position: ${screenContext.cursor.x}, ${screenContext.cursor.y}.` : '';
  return analyzeImageWithLocalModel(
    `${prompt}${cursor} You are Shadow, a desktop copilot. Analyze only what is visible. Be concise and do not claim to have performed an action.`,
    dataUrlToBase64(screenContext.imageDataUrl),
    config,
  );
}

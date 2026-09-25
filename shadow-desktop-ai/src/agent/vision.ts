import type { AgentMessage, ModelConfig, ScreenContext } from './types';
import { chatWithLocalModel } from './ollama';

function imageToMessage(screenContext: ScreenContext, prompt: string): AgentMessage {
  return {
    role: 'user',
    content: `${prompt}\n\nScreen context image (data URL): ${screenContext.imageDataUrl ?? 'unavailable'}\nCursor: ${JSON.stringify(screenContext.cursor ?? null)}`,
  };
}

export async function analyzeScreen(
  screenContext: ScreenContext,
  prompt = 'Describe what is visible on my screen and identify the most useful next step for what I am doing.',
  config?: ModelConfig,
): Promise<string> {
  if (!screenContext.imageDataUrl) throw new Error('No screen image is available.');

  return chatWithLocalModel(
    [
      {
        role: 'system',
        content: 'You are Shadow, a desktop copilot. Analyze the supplied screen image carefully. Be concise, factual, and do not claim to have performed an action.',
      },
      imageToMessage(screenContext, prompt),
    ],
    config,
  );
}

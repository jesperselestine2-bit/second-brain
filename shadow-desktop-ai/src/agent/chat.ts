import type { AgentMessage, ModelConfig, ScreenContext } from './types';
import { chatWithLocalModel } from './ollama';
import { analyzeScreen } from './vision';
import { ConversationStore } from './store';

const SYSTEM: AgentMessage = {
  role: 'system',
  content: 'You are Shadow, a local desktop copilot. Help the user with coding, photo editing, video editing, research, and general computer tasks. Be concise and practical. You can reason about supplied screen context, but never claim to have clicked, typed, edited, or executed anything unless a separate approved tool actually did it.',
};

function dataUrlToBase64(dataUrl: string): string {
  const comma = dataUrl.indexOf(',');
  return comma >= 0 ? dataUrl.slice(comma + 1) : dataUrl;
}

export async function chat(
  userText: string,
  store: ConversationStore,
  context?: ScreenContext,
  config?: ModelConfig,
): Promise<string> {
  const history = await store.load();
  const messages: AgentMessage[] = [SYSTEM, ...history, { role: 'user', content: userText }];

  if (context) {
    const app = context.activeWindow?.application ?? 'unknown';
    const title = context.activeWindow?.title ?? 'unknown';
    const cursor = JSON.stringify(context.cursor ?? null);
    messages.push({
      role: 'user',
      content: `Current desktop context: application=${app}, window=${title}, cursor=${cursor}. Analyze the attached screenshot if present.`,
      images: context.imageDataUrl ? [dataUrlToBase64(context.imageDataUrl)] : undefined,
    });
  }

  const answer = await chatWithLocalModel(messages, config);
  await store.save([...history, { role: 'user', content: userText }, { role: 'assistant', content: answer }]);
  return answer;
}

export async function askAboutScreen(
  prompt: string,
  context: ScreenContext,
  config?: ModelConfig,
): Promise<string> {
  return analyzeScreen(context, prompt, config);
}

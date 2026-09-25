import type { AgentMessage, ModelConfig } from './types';

const defaultConfig: ModelConfig = {
  provider: 'ollama',
  baseUrl: 'http://127.0.0.1:11434',
  model: 'llama3.2-vision:11b',
};

async function requestOllama(payload: unknown, config: ModelConfig): Promise<string> {
  const response = await fetch(`${config.baseUrl}/api/chat`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Ollama request failed: ${response.status} ${response.statusText}`);
  }

  const data = (await response.json()) as { message?: { content?: string } };
  return data.message?.content ?? '';
}

export function chatWithLocalModel(
  messages: AgentMessage[],
  config: ModelConfig = defaultConfig,
): Promise<string> {
  return requestOllama({ model: config.model, messages, stream: false }, config);
}

export function analyzeImageWithLocalModel(
  prompt: string,
  imageBase64: string,
  config: ModelConfig = defaultConfig,
): Promise<string> {
  return requestOllama(
    {
      model: config.model,
      stream: false,
      messages: [
        {
          role: 'user',
          content: prompt,
          images: [imageBase64],
        },
      ],
    },
    config,
  );
}

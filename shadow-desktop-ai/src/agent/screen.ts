import { desktopCapturer, screen } from 'electron';
import type { ScreenContext } from './types';

export async function capturePrimaryScreen(): Promise<ScreenContext> {
  const primary = screen.getPrimaryDisplay();
  const sources = await desktopCapturer.getSources({
    types: ['screen'],
    thumbnailSize: { width: primary.size.width, height: primary.size.height },
  });

  const source = sources[0];
  if (!source) throw new Error('No desktop screen source is available.');

  return {
    capturedAt: new Date().toISOString(),
    cursor: screen.getCursorScreenPoint(),
    imageDataUrl: source.thumbnail.toDataURL(),
  };
}

export {};

declare global {
  interface ShadowContext {
    capturedAt: string;
    cursor?: { x: number; y: number };
    activeWindow: {
      title: string | null;
      application: string | null;
      available: boolean;
    };
  }

  interface Window {
    shadow: {
      analyzeScreen: (prompt?: string) => Promise<string>;
      getContext: () => Promise<ShadowContext>;
    };
  }
}

export {};

declare global {
  interface Window {
    shadow: {
      analyzeScreen: (prompt?: string) => Promise<string>;
    };
  }
}

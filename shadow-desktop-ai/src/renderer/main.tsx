import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

function App() {
  const [answer, setAnswer] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [context, setContext] = useState<ShadowContext | null>(null);

  async function refreshContext() {
    try {
      setContext(await window.shadow.getContext());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not read desktop context.');
    }
  }

  async function handleAnalyze() {
    setBusy(true);
    setError('');
    setAnswer('');
    try {
      const result = await window.shadow.analyzeScreen();
      setAnswer(result || 'Shadow received the screen, but the model returned no text.');
      await refreshContext();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Screen analysis failed.');
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => {
    void refreshContext();
    const timer = window.setInterval(() => void refreshContext(), 2000);
    return () => window.clearInterval(timer);
  }, []);

  const appName = context?.activeWindow.application ?? 'Detecting…';
  const windowTitle = context?.activeWindow.title ?? 'No active window detected';
  const cursor = context?.cursor ? `${context.cursor.x}, ${context.cursor.y}` : '—';

  return (
    <main className="app-shell">
      <section className="assistant-card" aria-label="Shadow Desktop AI">
        <div className="orb" aria-hidden="true">S</div>
        <div className="content">
          <div className="eyebrow">SHADOW DESKTOP AI</div>
          <h1>What are you working on?</h1>
          <p>Shadow now combines your screen, cursor position, and active application context before asking the local vision model for help.</p>

          <div className="context-grid">
            <div><span>APP</span><strong>{appName}</strong></div>
            <div><span>WINDOW</span><strong>{windowTitle}</strong></div>
            <div><span>CURSOR</span><strong>{cursor}</strong></div>
          </div>

          <div className="actions">
            <button type="button" onClick={handleAnalyze} disabled={busy}>
              {busy ? 'Analyzing…' : 'Analyze screen'}
            </button>
            <button type="button" className="secondary" onClick={() => void refreshContext()}>Refresh context</button>
          </div>

          {answer && <pre className="answer">{answer}</pre>}
          {error && <div className="error">{error}</div>}
          <div className="status"><span className="dot" /> Local context engine ready</div>
        </div>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode><App /></React.StrictMode>,
);

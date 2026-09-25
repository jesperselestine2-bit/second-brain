import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

function App() {
  const [answer, setAnswer] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function handleAnalyze() {
    setBusy(true);
    setError('');
    setAnswer('');
    try {
      const result = await window.shadow.analyzeScreen();
      setAnswer(result || 'Shadow received the screen, but the model returned no text.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Screen analysis failed.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="app-shell">
      <section className="assistant-card" aria-label="Shadow Desktop AI">
        <div className="orb" aria-hidden="true">S</div>
        <div className="content">
          <div className="eyebrow">SHADOW DESKTOP AI</div>
          <h1>What are you working on?</h1>
          <p>Shadow can now capture your primary screen and send it to your local vision model for analysis.</p>
          <div className="actions">
            <button type="button" onClick={handleAnalyze} disabled={busy}>
              {busy ? 'Analyzing…' : 'Analyze screen'}
            </button>
            <button type="button" className="secondary" disabled>Ask Shadow</button>
          </div>
          {answer && <pre className="answer">{answer}</pre>}
          {error && <div className="error">{error}</div>}
          <div className="status"><span className="dot" /> Local vision assistant ready</div>
        </div>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode><App /></React.StrictMode>
);

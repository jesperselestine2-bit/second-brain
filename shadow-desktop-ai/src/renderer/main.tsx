import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import type { AgentMessage } from '../agent/types';

function App() {
  const [answer, setAnswer] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [context, setContext] = useState<ShadowContext | null>(null);
  const [messages, setMessages] = useState<AgentMessage[]>([]);
  const [input, setInput] = useState('');
  const [includeScreen, setIncludeScreen] = useState(true);

  async function refreshContext() {
    try {
      setContext(await window.shadow.getContext());
      setError('');
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

  async function sendMessage(event?: React.FormEvent) {
    event?.preventDefault();
    const text = input.trim();
    if (!text || busy) return;
    setBusy(true);
    setError('');
    setInput('');
    setMessages((current) => [...current, { role: 'user', content: text }]);
    try {
      const response = await window.shadow.chat(text, includeScreen);
      setMessages((current) => [...current, { role: 'assistant', content: response }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Shadow could not answer.');
    } finally {
      setBusy(false);
    }
  }

  async function clearMemory() {
    try {
      await window.shadow.clearHistory();
      setMessages([]);
      setAnswer('');
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not clear memory.');
    }
  }

  useEffect(() => {
    void refreshContext();
    void window.shadow.getHistory()
      .then((history) => setMessages(history.filter((m) => m.role !== 'system')))
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : 'Could not load conversation history.');
      });
    const timer = window.setInterval(() => void refreshContext(), 2000);
    return () => window.clearInterval(timer);
  }, []);

  const appName = context?.activeWindow?.application ?? 'Detecting…';
  const windowTitle = context?.activeWindow?.title ?? 'No active window detected';
  const cursor = context?.cursor ? `${context.cursor.x}, ${context.cursor.y}` : '—';

  return (
    <main className="app-shell">
      <section className="assistant-card" aria-label="Shadow Desktop AI">
        <div className="orb" aria-hidden="true">S</div>
        <div className="content">
          <div className="topbar">
            <div>
              <div className="eyebrow">SHADOW DESKTOP AI</div>
              <h1>Your desktop copilot.</h1>
            </div>
            <button type="button" className="ghost" onClick={() => void clearMemory()}>Clear memory</button>
          </div>

          <p>Ask Shadow what to do, or let it inspect your current screen for context.</p>

          <div className="context-grid">
            <div><span>APP</span><strong>{appName}</strong></div>
            <div><span>WINDOW</span><strong>{windowTitle}</strong></div>
            <div><span>CURSOR</span><strong>{cursor}</strong></div>
          </div>

          <div className="chat" aria-live="polite">
            {messages.length === 0 && <div className="empty">Tell Shadow what you're stuck on.</div>}
            {messages.map((message, index) => (
              <div className={`message ${message.role}`} key={`${message.role}-${index}`}>
                <span className="message-label">{message.role === 'assistant' ? 'SHADOW' : 'YOU'}</span>
                <div>{message.content}</div>
              </div>
            ))}
            {busy && <div className="message assistant"><span className="message-label">SHADOW</span><div>Thinking…</div></div>}
          </div>

          <form className="composer" onSubmit={sendMessage}>
            <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask Shadow anything…" rows={2} />
            <div className="composer-row">
              <label><input type="checkbox" checked={includeScreen} onChange={(e) => setIncludeScreen(e.target.checked)} /> Include screen</label>
              <button type="submit" disabled={busy || !input.trim()}>Send</button>
            </div>
          </form>

          <div className="actions">
            <button type="button" onClick={handleAnalyze} disabled={busy}>{busy ? 'Analyzing…' : 'Analyze screen'}</button>
            <button type="button" className="secondary" onClick={() => void refreshContext()}>Refresh context</button>
          </div>

          {answer && <pre className="answer">{answer}</pre>}
          {error && <div className="error">{error}</div>}
          <div className="status"><span className="dot" /> Local AI + desktop context ready</div>
        </div>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode><App /></React.StrictMode>,
);

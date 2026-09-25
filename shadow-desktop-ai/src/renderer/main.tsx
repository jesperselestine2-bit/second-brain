import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

function App() {
  return (
    <main className="app-shell">
      <section className="assistant-card" aria-label="Shadow Desktop AI">
        <div className="orb" aria-hidden="true">S</div>
        <div className="content">
          <div className="eyebrow">SHADOW DESKTOP AI</div>
          <h1>What are you working on?</h1>
          <p>Shadow will eventually understand your screen and help you solve the task in front of you.</p>
          <div className="actions">
            <button type="button">Analyze screen</button>
            <button type="button" className="secondary">Ask Shadow</button>
          </div>
          <div className="status"><span className="dot" /> Local assistant ready</div>
        </div>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode><App /></React.StrictMode>
);

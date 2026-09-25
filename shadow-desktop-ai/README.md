# Shadow Desktop AI

Standalone desktop AI copilot for coding, photo editing, video editing, research, and general computer work.

## Current stage

Shadow can capture the primary desktop from the Electron main process and send the screenshot to a local Ollama vision model. The renderer reaches this capability through a context-isolated IPC bridge. Computer-control permissions remain separate and are not enabled by screen analysis.

## Requirements

- Linux desktop session
- Node.js 20+
- npm
- Ollama 0.34+
- `llama3.2-vision:11b` installed locally

## Run locally

```bash
cd shadow-desktop-ai
npm install
npm run dev
```

For a production build:

```bash
npm run typecheck
npm run build
```

Ollama should be available at `http://127.0.0.1:11434`. Configure another endpoint/model through the agent configuration instead of committing secrets.

## Current capabilities

- Electron desktop shell
- React + TypeScript UI
- Local Ollama chat client
- Ollama vision image payloads
- Primary-screen capture
- Cursor-position capture
- Screen-analysis IPC endpoint
- Initial conversation memory
- Permission scopes for future computer tools
- CI typecheck/build workflow

## Safety and privacy

Screen capture is only triggered by an explicit Analyze screen action in the current UI. Computer-control features are opt-in and should require explicit approval. Shadow must not silently type, click, modify files, or execute commands.

## Roadmap

1. Desktop shell and floating assistant
2. Local AI connection
3. Screen capture and vision context — current
4. Active-window/cursor context
5. Conversation and persistent local memory
6. Permission-gated mouse/keyboard tools
7. File, terminal, and browser tools
8. Coding/photo/video specialist skills
9. Voice interaction
10. Packaging, autostart, testing, and releases

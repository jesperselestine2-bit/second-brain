# Shadow Desktop AI

Standalone desktop AI copilot for coding, photo editing, video editing, research, and general computer work.

## Current stage

Shadow can capture the primary screen, read the cursor position, detect the active Linux X11 window when `xdotool` is installed, and send the screen plus desktop context to a local Ollama vision model.

## Requirements

- Linux desktop session
- Node.js 20+
- npm
- Ollama 0.34+
- `llama3.2-vision:11b` installed locally
- `xdotool` for active-window detection on X11

Install the Linux active-window dependency with:

```bash
sudo apt update
sudo apt install xdotool
```

Wayland sessions may restrict active-window inspection; screen and cursor capture remain separate from that integration.

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

Ollama should be available at `http://127.0.0.1:11434`.

## Current capabilities

- Electron desktop shell
- React + TypeScript UI
- Local Ollama chat client
- Ollama vision image payloads
- Primary-screen capture
- Cursor-position capture
- Linux active-window context
- Secure context-isolated IPC
- Initial conversation memory
- Permission scopes for future computer tools
- CI typecheck/build workflow

## Safety and privacy

Screen capture is only triggered by an explicit Analyze screen action in the current UI. Computer-control features are opt-in and should require explicit approval. Shadow must not silently type, click, modify files, or execute commands.

## Roadmap

1. Desktop shell and floating assistant
2. Local AI connection
3. Screen capture and vision context
4. Active-window/cursor context — current
5. Conversation and persistent local memory
6. Permission-gated mouse/keyboard tools
7. File, terminal, and browser tools
8. Coding/photo/video specialist skills
9. Voice interaction
10. Packaging, autostart, testing, and releases

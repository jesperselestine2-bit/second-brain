# Shadow Desktop AI

Standalone desktop AI copilot for coding, photo editing, video editing, research, and general computer work.

## Vision

Shadow is designed to live beside the user's cursor and, with explicit permission, understand screen context and help with the task in front of them.

## Architecture

- Electron desktop shell
- React + TypeScript renderer
- Node.js agent/core
- Ollama-compatible local model provider
- Screen/context service
- Permission-gated computer tools
- Local memory layer

## Safety and privacy

Screen capture and computer-control features are opt-in. Actions that can change files, type into applications, click controls, or run commands require explicit approval in the product design. API keys and secrets must never be committed.

## Roadmap

1. Desktop shell and floating assistant
2. Local AI connection
3. Screen capture and vision context
4. Active-window/cursor context
5. Conversation and local memory
6. Permission-gated mouse/keyboard tools
7. File, terminal, and browser tools
8. Coding/photo/video specialist skills
9. Voice interaction
10. Packaging, autostart, testing, and releases

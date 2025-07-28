# Gemini CLI Documentation Flow

This document summarizes the core pages of the Gemini CLI repository (excluding `prompt.md`). It provides a high-level overview of how the documentation is organized and the main points covered on each page.

## Repository Overview

- **README.md** – Introduces Gemini CLI, highlights its capabilities (code querying, generation, automation), and gives quickstart instructions for installing via Node or Homebrew. It explains authentication options (Google login, Gemini API key, Vertex AI key), links to troubleshooting, and lists popular tasks.
- **ROADMAP.md** – Describes guiding principles and how the project tracks development via GitHub issues. It outlines focus areas (Authentication, Model, User Experience, Tooling, Core, Extensibility, Contribution, Platform, Quality, Background Agents, Security & Privacy) and encourages community involvement.
- **CONTRIBUTING.md** – Details the contributor license agreement, review process, PR guidelines, and how to run `npm run preflight` before submitting changes.

## `docs/` Directory

### index.md
Provides the entry point to the documentation with links to execution & deployment, architecture, CLI usage, core details, tools, contributing guide, NPM workflow, troubleshooting, and terms of service & privacy.

### architecture.md
Explains the two‑package structure:
1. **CLI package (`packages/cli`)** – handles input, history, display, themes, and settings.
2. **Core package (`packages/core`)** – communicates with Gemini API, manages prompt construction, tool execution, and conversation state.
3. **Tools** – extend capabilities (file system, shell commands, web fetch/search, etc.).
The doc walks through the typical interaction flow and lists design principles of modularity, extensibility, and user experience.

### deployment.md
Covers ways to run Gemini CLI:
- Standard npm installation or npx usage.
- Docker/Podman sandbox execution (`--sandbox` flag).
- Running from source for contributors.
- Running latest commit via GitHub.
It explains build processes for npm packages, the sandbox container image, and the automated release workflow.

### Uninstall.md
Guides removing the CLI depending on how it was installed (clearing the npx cache or running `npm uninstall -g @google/gemini-cli`).

### troubleshooting.md
Offers solutions for common problems (authentication issues, missing tools, CI detection, permission errors) and includes debugging tips such as using `--verbose` and checking logs.

### quota-and-pricing.md
Lists rate limits and pricing for different authentication methods: Google login (Code Assist tiers), Gemini API key (free and paid), and Vertex AI options. Notes that Google One/Ultra plans currently apply only to web products.

### tos-privacy.md
Outlines terms of service and privacy notices for each authentication method and includes an FAQ about data collection and usage statistics opt‑out.

### sandbox.md
Describes sandboxing approaches (macOS seatbelt, Docker/Podman), configuration flags and environment variables, troubleshooting, and security notes.

### checkpointing.md
Explains the checkpointing feature that snapshots project state and conversation history before tools modify files. Shows how to enable it via flag or settings and how to restore checkpoints with `/restore`.

### extension.md
Details how Gemini CLI loads extensions from `.gemini/extensions` directories. Each extension contains a `gemini-extension.json` specifying MCP servers, context files, and tool restrictions. Workspace extensions override user extensions.

### telemetry.md
Covers telemetry via OpenTelemetry. Describes configuration precedence (flags, environment variables, settings), exporting to a file or to Google Cloud, and lists logged events and metrics.

### npm.md
Explains the two published packages (`@google/gemini-cli` and `@google/gemini-cli-core`) and how releases are bundled and automated.

### integration-tests.md
Describes the end‑to‑end test framework under `integration-tests/`. Shows how to run all tests or individual tests, use sandbox matrices, keep output for debugging, run with verbose logs, and the GitHub Actions workflow that executes the tests.

### examples, tools, core, cli subdirectories
- **core/index.md & tools-api.md** – Summarize the role of the core package and how tools are defined, registered, and executed. Includes built‑in tools like file system readers, shell execution, web fetch/search, and memory tools, as well as custom tool discovery via commands or MCP servers.
- **core/memport.md** – Documents the `@file.md` import syntax for modular `GEMINI.md` files, including safety features and examples.
- **cli/index.md** – Provides an overview of the CLI frontend, mentions non‑interactive mode, and links to authentication, commands, configuration, token caching, themes, and tutorials.
- **cli/commands.md** – Extensive reference for slash commands (`/bug`, `/chat`, `/clear`, `/compress`, `/copy`, `/memory`, `/restore`, `/stats`, `/theme`, etc.), `@` commands for including file content, `!` shell commands, and creating custom commands in TOML.
- **cli/configuration.md** – Explains settings layers and all available options such as `contextFileName`, tool allow/exclude lists, MCP server configuration, auto accept, theme, vim mode, sandbox settings, checkpointing, telemetry, usage statistics, and environment variables loaded from `.env` files.
- **cli/authentication.md** – Guides logging in with Google, using Gemini API keys, Vertex AI keys, or Cloud Shell credentials. Covers environment variable persistence with `.env` files and non‑interactive usage.
- **cli/themes.md** – Lists built‑in dark and light themes, describes how to change themes and create custom themes in `settings.json`.
- **cli/token-caching.md** – Describes token caching when using API keys and how `/stats` shows token savings.
- **cli/tutorials.md** – Walks through setting up a Model Context Protocol (MCP) server (using the GitHub MCP server as an example) via `mcpServers` configuration.
- **tools/** – Provide detailed docs for each built‑in tool: file system, multi-file read, shell, web fetch/search, memory, and running MCP servers.

## Conclusion
The Gemini CLI documentation covers installation, configuration, command reference, tool usage, architecture, and development guidelines. It is organized so that `README.md` and `docs/index.md` direct users to specific guides (authentication, commands, configuration, tools, troubleshooting, telemetry, etc.). Core and CLI packages are described separately, with numerous examples demonstrating how to extend and use the CLI effectively.

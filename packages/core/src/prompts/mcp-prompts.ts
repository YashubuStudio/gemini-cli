/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
*/

// MCP サーバーから利用可能なプロンプト一覧を取得するヘルパー関数。

import { Config } from '../config/config.js';
import { DiscoveredMCPPrompt } from '../tools/mcp-client.js';

export function getMCPServerPrompts(
  config: Config,
  serverName: string,
): DiscoveredMCPPrompt[] {
  const promptRegistry = config.getPromptRegistry();
  if (!promptRegistry) {
    return [];
  }
  return promptRegistry.getPromptsByServer(serverName);
}

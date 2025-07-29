#!/usr/bin/env node
// このファイルはCLIツールのエントリーポイントです

/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import './src/gemini.js';
import { main } from './src/gemini.js';

// main関数を呼び出してGemini CLIを実行する

// --- Global Entry Point ---
main().catch((error) => {
  console.error('An unexpected critical error occurred:'); // 予期しない致命的なエラー
  if (error instanceof Error) {
    console.error(error.stack);
  } else {
    console.error(String(error));
  }
  process.exit(1);
});

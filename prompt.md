# LLM Prompts Summary

This project defines several prompts that are sent to the LLM. Below is a list of these prompts and how they are used.

## 1. Core System Prompt
- **Location:** `packages/core/src/core/prompts.ts` (`getCoreSystemPrompt`)
- **Purpose:** Base instruction for every chat session. Provides rules for interacting with the user and using tools.
- **Excerpt:**
```
You are an interactive CLI agent specializing in software engineering tasks...
```
- **Usage:** Sent when initializing a new `GeminiChat` instance.

## 2. Compression Prompt
- **Location:** `packages/core/src/core/prompts.ts` (`getCompressionPrompt`)
- **Purpose:** Summarizes long chat history into an XML snapshot for memory.
- **Excerpt:**
```
You are the component that summarizes internal chat history into a given structure...
```
- **Usage:** Called by `GeminiClient.tryCompressChat` when history exceeds limits.

## 3. Tool Output Summarization Prompt
- **Location:** `packages/core/src/utils/summarizer.ts`
- **Purpose:** Summarizes lengthy tool output before returning it to the user.
- **Excerpt:**
```
Summarize the following tool output to be a maximum of {maxOutputTokens} tokens...
```
- **Usage:** Used by `llmSummarizer` in various tools when output is large.

## 4. Loop Detection Prompt
- **Location:** `packages/core/src/services/loopDetectionService.ts`
- **Purpose:** Detects when the assistant is stuck in a repetitive loop.
- **Excerpt:**
```
You are a sophisticated AI diagnostic agent specializing in identifying when a conversational AI is stuck...
```
- **Usage:** Invoked periodically by `LoopDetectionService.checkForLoopWithLLM` during a session.

## 5. Next Speaker Check Prompt
- **Location:** `packages/core/src/utils/nextSpeakerChecker.ts`
- **Purpose:** Determines whether the user or the model should speak next.
- **Excerpt:**
```
Analyze *only* the content and structure of your immediately preceding response...
```
- **Usage:** Called after a model response via `checkNextSpeaker` to decide if the conversation should continue automatically.

## 6. Edit Correction Prompts
Defined in `packages/core/src/utils/editCorrector.ts` and used to clean up text replacements before modifying files.

- **Old String Mismatch Prompt** – Helps find the correct snippet when the target text was overly escaped.
- **New String Adjustment Prompt** – Adjusts replacement text to align with the corrected old string.
- **New String Escaping Prompt** – Fixes escaping issues in replacement text.
- **General String Escaping Prompt** – Fixes escaping issues in arbitrary strings.

These prompts are each sent via `geminiClient.generateJson` before applying edits.

## Prompt Flow
1. **Session Start:** `GeminiClient.getChat()` sends the **Core System Prompt**.
2. **User/Model Turns:** Messages are exchanged; tools may produce large output, which triggers the **Tool Output Summarization Prompt** when necessary.
3. **Loop & Speaker Checks:** During a session, `LoopDetectionService` and `NextSpeakerChecker` may invoke their prompts to keep the conversation productive and determine who should respond next.
4. **History Compression:** When history grows too big, `getCompressionPrompt` is used to condense it into a snapshot.
5. **Edit Operations:** When performing text replacements, the various **Edit Correction Prompts** are used to clean up old and new strings.


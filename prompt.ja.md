# LLMプロンプトの概要

このプロジェクトでは、LLMに送信される複数のプロンプトを定義しています。以下は各プロンプトの概要と利用方法です。

## 1. コアシステムプロンプト
- **場所:** `packages/core/src/core/prompts.ts` (`getCoreSystemPrompt`)
- **目的:** すべてのチャットセッションで使用される基本指示。ユーザーとの対話方法やツールの利用規則を示します。
- **抜粋:**
```
You are an interactive CLI agent specializing in software engineering tasks...
```
- **使用タイミング:** 新しい`GeminiChat`インスタンスを初期化する際に送信されます。

## 2. 圧縮プロンプト
- **場所:** `packages/core/src/core/prompts.ts` (`getCompressionPrompt`)
- **目的:** 長いチャット履歴をメモリ用のXMLスナップショットへ要約します。
- **抜粋:**
```
You are the component that summarizes internal chat history into a given structure...
```
- **使用タイミング:** 履歴が制限を超えた際に `GeminiClient.tryCompressChat` から呼び出されます。

## 3. ツール出力要約プロンプト
- **場所:** `packages/core/src/utils/summarizer.ts`
- **目的:** ツールの出力が長すぎる場合に、ユーザーへ返す前に要約します。
- **抜粋:**
```
Summarize the following tool output to be a maximum of {maxOutputTokens} tokens...
```
- **使用タイミング:** `llmSummarizer` がさまざまなツールで大きな出力を処理する際に使用します。

## 4. ループ検出プロンプト
- **場所:** `packages/core/src/services/loopDetectionService.ts`
- **目的:** アシスタントが同じ内容を繰り返しているかを検出します。
- **抜粋:**
```
You are a sophisticated AI diagnostic agent specializing in identifying when a conversational AI is stuck...
```
- **使用タイミング:** セッション中に `LoopDetectionService.checkForLoopWithLLM` が定期的に呼び出します。

## 5. 次の話者判定プロンプト
- **場所:** `packages/core/src/utils/nextSpeakerChecker.ts`
- **目的:** 次にユーザーとモデルのどちらが発言すべきかを判断します。
- **抜粋:**
```
Analyze *only* the content and structure of your immediately preceding response...
```
- **使用タイミング:** モデルの応答後に `checkNextSpeaker` が会話を続けるかどうか判断するために呼び出します。

## 6. 編集補正プロンプト
`packages/core/src/utils/editCorrector.ts` で定義され、ファイルを変更する前にテキスト置換を調整するために使われます。

- **旧文字列不一致プロンプト** – 置換対象のテキストが過剰にエスケープされている場合、正しい箇所を見つけるのを補助します。
- **新文字列調整プロンプト** – 修正した旧文字列に合わせて新しいテキストを調整します。
- **新文字列エスケーププロンプト** – 新しいテキストのエスケープを修正します。
- **汎用文字列エスケーププロンプト** – 任意の文字列のエスケープ問題を修正します。

これらのプロンプトは、編集を適用する前に `geminiClient.generateJson` を介して送信されます。

## プロンプトの流れ
1. **セッション開始:** `GeminiClient.getChat()` が **コアシステムプロンプト** を送信します。
2. **ユーザー/モデルのやり取り:** メッセージを交換し、ツールが大量の出力を生成した場合は **ツール出力要約プロンプト** がトリガーされます。
3. **ループ・話者チェック:** セッション中に `LoopDetectionService` と `NextSpeakerChecker` がプロンプトを実行し、会話を円滑に進めるか次に誰が話すべきかを判断します。
4. **履歴の圧縮:** 履歴が大きくなりすぎたら、`getCompressionPrompt` を使ってスナップショットにまとめます。
5. **編集作業:** テキスト置換を行う際、各種 **編集補正プロンプト** を利用して旧・新文字列を整えます。

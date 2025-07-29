# Gemini CLI ドキュメントの流れ

このドキュメントでは、リポジトリ内の主要なドキュメントページ（`prompt.md` を除く）の構成と、それぞれの要点を簡潔にまとめています。

## リポジトリ概要

- **README.md** – Gemini CLI の紹介、機能（コード検索、生成、自動化）と、Node または Homebrew でのインストール方法のクイックスタートを掲載。認証方法（Google ログイン、Gemini API キー、Vertex AI キー）を説明し、トラブルシューティングへのリンクやよく使われるタスクを記載しています。
- **ROADMAP.md** – 指針となる原則や、GitHub Issues を通じた開発の進め方を説明。重点分野（Authentication、Model、User Experience、Tooling、Core、Extensibility、Contribution、Platform、Quality、Background Agents、Security & Privacy）を挙げ、コミュニティ参加を呼びかけています。
- **CONTRIBUTING.md** – コントリビューターライセンス契約、レビュー手順、PR ガイドライン、`npm run preflight` 実行方法などを詳細に記述しています。

## `docs/` ディレクトリ

### index.md
ドキュメントの入り口となるページで、実行・デプロイ、アーキテクチャ、CLI 使い方、コアの詳細、ツール、コントリビュートガイド、NPM ワークフロー、トラブルシューティング、利用規約とプライバシーへのリンクを掲載しています。

### architecture.md
二つのパッケージ構成を説明しています：
1. **CLI パッケージ (`packages/cli`)** – 入力、履歴、表示、テーマ、設定を管理。
2. **Core パッケージ (`packages/core`)** – Gemini API との通信、プロンプト生成、ツール実行、会話状態を管理。
3. **Tools** – ファイルシステムやシェルコマンド、Web 取得/検索など機能を拡張します。
ドキュメントでは典型的な対話フローと、モジュール性・拡張性・ユーザー体験といった設計原則を解説しています。

### deployment.md
Gemini CLI の実行方法を説明：
- 一般的な npm インストールまたは npx の利用。
- Docker/Podman サンドボックス実行（`--sandbox` フラグ）。
- コントリビューター向けのソースからの実行。
- GitHub から最新コミットを実行。
ビルドプロセスやサンドボックス用コンテナイメージ、リリースの自動化についても触れています。

### Uninstall.md
npx キャッシュを削除する方法や `npm uninstall -g @google/gemini-cli` を使ったアンインストール方法など、インストール形態別に削除手順を案内します。

### troubleshooting.md
認証の問題、ツール不足、CI 検出、パーミッションエラーといったよくあるトラブルの解決策を提供し、`--verbose` の利用やログ確認などデバッグのヒントを掲載しています。

### quota-and-pricing.md
Google ログイン（Code Assist ティア）、Gemini API キー（無料/有料）、Vertex AI オプションごとのレート制限と料金をまとめています。Google One/Ultra プランは現在ウェブ製品のみ対象である点も記載。

### tos-privacy.md
各認証方法における利用規約とプライバシー通知をまとめ、データ収集や使用統計のオプトアウトに関する FAQ を掲載しています。

### sandbox.md
macOS seatbelt や Docker/Podman を用いたサンドボックス方式、設定フラグや環境変数、トラブルシューティング、セキュリティに関する注意点を説明します。

### checkpointing.md
ツールがファイルを変更する前にプロジェクト状態と会話履歴をスナップショットとして保存するチェックポイント機能を解説。フラグや設定での有効化方法、`/restore` による復元方法を紹介します。

### extension.md
`.gemini/extensions` ディレクトリから拡張機能を読み込む仕組みを説明。各拡張には MCP サーバーやコンテキストファイル、ツール制限を指定する `gemini-extension.json` を含みます。ワークスペースの拡張がユーザーの拡張より優先されます。

### telemetry.md
OpenTelemetry によるテレメトリを扱います。フラグ、環境変数、設定の優先順位、ファイルや Google Cloud へのエクスポート方法、記録されるイベントやメトリクスを解説します。

### npm.md
公開されている二つのパッケージ（`@google/gemini-cli` と `@google/gemini-cli-core`）の説明と、リリースのバンドル・自動化方法を説明します。

### integration-tests.md
`integration-tests/` 以下の end-to-end テストフレームワークを紹介。すべてのテストや個別テストの実行、サンドボックスマトリクスの利用、デバッグ用出力保持、詳細ログ実行、GitHub Actions でのテスト実行を説明します。

### examples, tools, core, cli サブディレクトリ
- **core/index.md と tools-api.md** – Core パッケージの役割や、ツールの定義・登録・実行方法を要約。ファイルシステムリーダー、シェル実行、Web 取得/検索、メモリツールなどの組み込みツールや、コマンドや MCP サーバー経由でのカスタムツール発見方法を紹介します。
- **core/memport.md** – `@file.md` インポート構文によるモジュール化された `GEMINI.md` の記法、安全機能、使用例を解説します。
- **cli/index.md** – CLI フロントエンドの概要を提供。非対話モード、認証、コマンド、設定、トークンキャッシュ、テーマ、チュートリアルへのリンクを記載します。
- **cli/commands.md** – スラッシュコマンド（`/bug`、`/chat`、`/clear`、`/compress`、`/copy`、`/memory`、`/restore`、`/stats`、`/theme` など）の詳細リファレンス、`@` コマンドでのファイル内容挿入、`!` シェルコマンド、TOML でのカスタムコマンド作成方法を網羅します。
- **cli/configuration.md** – `contextFileName` やツールの許可/除外リスト、MCP サーバー設定、自動承認、テーマ、vim モード、サンドボックス設定、チェックポイント、テレメトリ、使用統計、`.env` ファイルから読み込む環境変数など、設定レイヤーと全オプションを説明します。
- **cli/authentication.md** – Google でのログイン、Gemini API キー、Vertex AI キー、Cloud Shell 認証の方法を案内。`.env` ファイルによる環境変数保持や非対話モードでの利用も説明します。
- **cli/themes.md** – 組み込みのダーク/ライトテーマの一覧、テーマ変更方法、`settings.json` でのカスタムテーマ作成方法を説明します。
- **cli/token-caching.md** – API キー使用時のトークンキャッシュと、`/stats` での節約トークン表示方法を説明します。
- **cli/tutorials.md** – `mcpServers` 設定を用いて、GitHub MCP サーバーを例にモデルコンテキストプロトコル (MCP) サーバーを設定する手順を説明します。
- **tools/** – ファイルシステム、複数ファイル読み込み、シェル、Web 取得/検索、メモリ、MCP サーバー実行など、組み込みツールの詳細を提供します。

## まとめ
Gemini CLI のドキュメントは、インストール、設定、コマンドリファレンス、ツールの利用、アーキテクチャ、開発ガイドラインを網羅しています。`README.md` と `docs/index.md` がユーザーを各ガイド（認証、コマンド、設定、ツール、トラブルシューティング、テレメトリなど）へ導きます。Core と CLI パッケージは個別に説明され、多数の例を通じて効率的な利用と拡張方法を学べます。

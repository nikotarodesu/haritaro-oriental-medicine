# はり太郎の東洋医学

https://www.haritaro.jp — 東洋医学・鍼灸の学習と臨床記録を支援するNext.jsアプリです。教材は個別の医学的診断や治療を代替しません。

## 主な入口

| URL | 用途 |
| --- | --- |
| `/learn` | 学習ホーム・11の基礎コース |
| `/curriculum` | 同じ教材の全章・全講義の目次。受講記録は共通 |
| `/learn/review` | 講義クイズの復習 |
| `/tsubo` | WHO標準361経穴の検索・辞典 |
| `/clinical` | 臨床ツールの入口 |
| `/clinical/workspace` | 主訴・安全確認、四診、候補・治法、配穴、再評価の記録 |
| `/diagnosis?tab=clinical` | 話題別の対面問診メモ |
| `/notes` | 臨床ノート・配穴・学習ノート、ファイル保存・読込 |
| `/cases` | 全20件の架空症例演習（無料3件） |
| `/library` | 論文・古典条文・症例教材。件数は分類別に集計 |
| `/symptoms` | 受診の目安・日常の工夫・関連教材 |
| `/pricing` | 料金・機能比較・申込み |
| `/about`, `/contact`, `/updates` | 運営者、問い合わせ、更新情報 |

## 技術と保存

- Next.js App Router / React / TypeScript / Tailwind CSS。
- SupabaseでGoogle認証とアカウントごとの同期。未ログインの保存は端末のブラウザ内。作業中の記録にはタブ内の下書きも使用します。
- Stripe Checkout / Webhook / Customer Portalで定期課金を扱います。表示だけで会員権限を付与しません。
- 料金・上限は `src/config/subscription.ts`。無料は臨床ノート10件・配穴30件、プレミアムは500件・1,000件です。
- 開業年月は `src/config/author.ts` の「2023年7月」が参照元。診療所の名称・所在地・予約情報は掲載しません。

## 編集する場所

- 学習コース：`src/data/learningCourses.ts`。講義構成：`src/data/curriculumOutline.ts`。
- 記事：`src/data/articles/` と `src/data/articleData.ts`。
- 経穴：`src/data/tsubo/`。軽量な公開検索データは生成ファイルなので直接編集しません。
- 更新情報：`src/config/contentUpdates.ts`。実際の公開・改訂日を記入し、トップは先頭3件を表示します。
- 医学記述の出典・確認範囲は `/editorial-policy` の方針に従います。

## 開発・検証

```sh
npm ci
npm run dev
npm run build -- --webpack
npm run test:billing
npm run test:site
npm run test:clinical
```

変更に応じて `test:learning`、`test:sync`、`test:seo` なども実行します。利用中のNext.jsは同梱ドキュメント `node_modules/next/dist/docs/` を確認してください。Windowsでの検証ではwebpackを指定しています。ビルド前に公開カタログなどの生成スクリプトが実行されます。

## 決済の確認

`.env.local` はローカル用で、本番のVercel環境変数とは別です。秘密鍵・サービスキーをコミットしないでください。

```sh
npm run check:billing -- --remote
# 本番環境の設定を使って実行する場合のみ
npm run check:billing -- --remote --production
```

これは読み取り専用の設定診断です。Googleログイン→選択した料金のCheckout表示→支払い→Webhookによる権限反映→契約管理は別途検証します。本番の支払い・契約確定は明示された許可と手順に従います。

販売には `NEXT_PUBLIC_ENABLE_SUBSCRIPTION_SALES`、本番のStripeキー・Webhook署名・月年Price ID、Supabaseの公開URL・公開キー・サービスキーが必要です。`/api/stripe/availability` は設定と認証サービスの稼働を確認します。停止・通信失敗を「確認中」のままにせず、再試行・問い合わせを案内します。停止中の再開連絡希望は問い合わせフォームで受け付ける手動対応で、自動メール配信はありません。Supabaseの停止はログインと申込みを妨げるため、管理画面でプロジェクトの状態も確認してください。

## 公開

既存のGitHubリポジトリ `nikotarodesu/haritaro-oriental-medicine` の `main` と、同名のVercelプロジェクトを使います。`AGENTS.md` に従い、ビルド・必要な検証が通った変更をcommit・pushし、対象コミットのデプロイがREADYになったことと本番URLの動作を確認します。push後にデプロイが始まらない場合は、既存プロジェクトで検証済みのコミットSHAを指定して公開します。新しいリポジトリやVercelプロジェクトを作り直す必要はありません。

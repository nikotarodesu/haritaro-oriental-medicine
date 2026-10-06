# Clarity：公開案内ページの操作確認

実装日：2026-10-06。所有者指定プロジェクト `ypobv9qync`。本番公開変数 `NEXT_PUBLIC_CLARITY_ID` を設定し、未設定で停止する。

Microsoft公式 `clarity-js` 0.8.71を遅延読み込みする。標準タグの自動起動では、ダウンロード中に私的ページへ移動した場合の初回記録を防げないため、SDKを読み込んだ後に対象条件を再確認して明示的に起動する。送信先 `https://a.clarity.ms/collect` は、このプロジェクトの公式タグが指定するURLを確認したもの。

対象は `/`、`/about`、`/learn`、`/learn/courses`、`/articles` の文書ロードのみ。講義本文、経穴詳細、検索結果、ノート、問診、診断、配穴、会員、決済、問い合わせは対象外。URLにquery/hashがある文書では起動しない。同一サイトの参照元も対象一覧内に限定し、外部参照元はquery/hashのないルートURLだけを許可する。参照元はSDKがそのまま収集するため、私的経路を別途拒否する。

画面全体を `data-clarity-mask` とSDKの `mask: ['body']` でマスクする。プロジェクトのマスク設定も管理画面で「厳密」に変更済み。広告識別用Cookieの収集、解析用Cookieの有効化、個人IDの指定、診断ログの送信は行わない（`track: false`、`cookies: []`、`fraud: false`、`diagnostics: false`）。これは無記録ではなく、Cookieを利用しない限定した画面・操作記録であり、訪問者の継続性とページ間の分析は制限される。

Next.jsの `onRouterTransitionStart` で画面移動前に同期停止する。SDKによる自動SPA再起動を防ぐため、native historyのURL変更前にも停止する。戻る・進む、hash変更、pagehideも停止対象。入力欄や編集領域、検索候補、アカウント等を含むヘッダー、保存・ノートの共通操作、ダイアログへの操作開始時にも停止する。SDKの読み込みが完了していなくても停止を保持し、その文書内では再開しない。ページ移動・検索・保存の通常動作を変更するイベントキャンセルは使わない。

プライバシーポリシーにGA4とClarityの目的、対象、除外、Microsoftの方針へのリンクを追加した。

ブラウザ検証でSDK 0.8.71の停止と送信データの非同期圧縮が競合し、`sequence` のnull参照を起こす問題を確認した。`scripts/patch-clarity.cjs` で送信時に同じpayloadから作成済みのenvelope sequenceを使うよう1行修正する。`postinstall` と `prebuild` で適用し、バージョンと修正対象が一致しなければ停止する。以前の公開ページで取得済みのpayloadは送信でき、停止後の私的ページのenvelopeを参照しない。SDK更新時はこの修正の要否を再確認する。

`npm run test:site` にClarityの境界テストを追加。対象一覧、URL・参照元、入力前停止、Router/native history停止、自動再起動防止、SDK遅延・取得失敗を検証する。ブラウザのDOM属性 `data-clarity-status` は起動の確認用で、`active` はSDKのmetadata callbackにより設定する。送信成功・画面反映を示すものではないので、Clarity管理画面の受信確認とは区別する。

管理画面の受信・録画の反映には時間がかかる場合がある。全ユーザー・全端末・全イベントの到着や、未計測ページの使いやすさをこの構成だけで評価できるとはしない。

参考：

- [Microsoft Clarity公式ソース](https://github.com/microsoft/clarity/tree/master/packages/clarity-js)
- [マスキング](https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-masking)
- [Cookie同意の扱い](https://learn.microsoft.com/en-us/clarity/setup-and-installation/consent-mode)
- [Next.js client instrumentation](https://nextjs.org/docs/app/api-reference/file-conventions/instrumentation-client)

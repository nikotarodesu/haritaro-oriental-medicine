# 認証・決済の確認状況（2026-10-02）

## 修正した問題
- メールフォームは本人認証をせず端末に会員を生成していたため削除。登録・ログインともGoogle認証を使用。
- URLパラメータ、端末ストレージ、ユーザー編集可能なメタデータで有料権限を付与しない。
- Checkout・契約管理・決済確認はサーバーでSupabaseのgetUserを呼び本人を確認。
- 権限はサーバー管理のapp_metadataへ、Stripeの支払済み請求書・契約期間・状態を照合して反映。
- Webhookは署名検証、更新・支払失敗・解約に対応。権限反映失敗は成功応答を返さず再送対象にする。
- 解約・再開・支払方法変更はStripe管理画面から行う。
- ノートの一部アップロードや取得が失敗した場合、「同期済み」と表示しない。

## 確認できた設定
- 公開サイトとローカル設定のSupabaseホスト：aeglehibpdsirsrjrjmg.supabase.co
- このプロジェクトのGoogle認証は有効。ノート用2テーブルのAPIは存在。
- ローカルStripeキーはテスト用。ローカルにSUPABASE_SERVICE_ROLE_KEYは未設定。
- 接続済みSupabaseコネクタのプロジェクトは上記と異なるため、本番プロジェクトの管理設定変更は行っていない。

## 本番で必要な確認
1. Vercelのサーバー専用環境変数に、上記SupabaseプロジェクトのSUPABASE_SERVICE_ROLE_KEYを設定。NEXT_PUBLIC_は付けない。
2. 本番Stripeキー、月額980円・年額9800円の有効なJPY継続価格、対応するWebhook署名キーを確認。
3. Webhookの宛先を https://www.haritaro.jp/api/webhook/stripe とし、checkout.session.completed、checkout.session.async_payment_succeeded、customer.subscription.created/updated/deleted/paused/resumed、invoice.paid/payment_failed/payment_action_required を受信。
4. Supabaseに本番サイトURLと https://www.haritaro.jp/auth/callback を許可。Googleの承認済みJavaScript生成元にも本番URLを設定。
5. Googleログイン→テスト決済→権限反映→更新失敗→管理画面で解約→満了まで、本人のテストアカウントで確認してから販売を開始。

秘密キーはチャットやGitへ貼り付けず、サービスの環境変数画面で設定する。
医療教材の有料部分は現在クライアント表示制御が中心。コンテンツの厳密な有料配信が必要なら、サーバーで権限を検証して本文を配信する方式への移行が別途必要。

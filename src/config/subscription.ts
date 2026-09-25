/**
 * haritaro.jp プレミアム会員・サブスクリプション設定モジュール
 * 運営側が価格や保存上限、公開制御を一元管理・変更できるように集約しています。
 */

export const SUBSCRIPTION_CONFIG = {
  // 料金設定（税込・完全確定）
  pricing: {
    monthly: {
      amount: 980,
      currency: "jpy",
      taxIncluded: true,
      displayPrice: "¥980",
      periodLabel: "月",
      billingInterval: "month",
      stripePriceId: process.env.STRIPE_PRICE_ID_MONTHLY || "price_haritaro_monthly_980",
      description: "手軽に始められる月額プラン。いつでもマイページから解約可能。",
    },
    yearly: {
      amount: 9800,
      currency: "jpy",
      taxIncluded: true,
      displayPrice: "¥9,800",
      periodLabel: "年",
      billingInterval: "year",
      stripePriceId: process.env.STRIPE_PRICE_ID_YEARLY || "price_haritaro_yearly_9800",
      description: "2ヶ月分お得な年額プラン（実質月額約817円）。じっくり学びたい方に最適。",
      savingLabel: "2ヶ月分お得",
      discountPercentage: 17,
    },
  },

  // 保存上限設定（無料会員 / プレミアム会員）
  limits: {
    freeMemoMax: 20, // 無料会員のツボ・配穴保存上限（20件）
    premiumMemoMax: 1000, // プレミアム会員のツボ・配穴保存上限（1,000件）
    freePatientNoteMax: 3, // 無料会員の臨床ノート（症例）上限（3件）
    premiumPatientNoteMax: 500, // プレミアム会員の臨床ノート（症例）上限（500件）
    freeTrialCaseCount: 3, // 無料で体験可能な症例演習数（初期仕様: 3例）
  },

  // 本番販売有効化フラグ
  // false または環境変数未設定時は、安全なデモ・プレビューモードとして動作し、動作確認が可能です。
  enableSubscriptionSales: process.env.NEXT_PUBLIC_ENABLE_SUBSCRIPTION_SALES === "true",

  // Stripe公開鍵
  stripePublishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "",

  // 受付状態メッセージの定義
  statusMessages: {
    comingSoonTitle: "プレミアム会員のお申し込みは現在準備中です",
    comingSoonSubtitle: "サービスの品質向上および決済システムの準備を行っております。正式公開時にお知らせいたします。",
    comingSoonBadge: "有料プラン準備中",
  },

  // プレミアム会員の提供機能一覧
  features: [
    {
      id: "clinical_cases",
      title: "臨床症例演習",
      description: "段階的な問診・四診の開示から弁証・治法・配穴を考える本格的な臨床トレーニング。全症例の解説と臨床根拠を確認できます。",
      free: "3症例",
      premium: "全20症例",
    },
    {
      id: "clinical_memos",
      title: "臨床ノート・配穴の保存",
      description: "日々の臨床ノートや自作の配穴をブラウザ内に保存・管理。振り返りや学習の蓄積に活用できます。",
      free: "ノート3件／配穴20件",
      premium: "ノート500件／配穴1,000件",
    },
    {
      id: "practice_haiketsu",
      title: "配穴の練習",
      description: "経穴を組み合わせて選んだ理由を言語化。教材の名配穴と即座に比較検証できます。",
      free: "基本配穴の閲覧",
      premium: "自作配穴・選んだ理由の記録・教材との比較",
    },
    {
      id: "kikei_hachimai",
      title: "奇経八脈の学習",
      description: "任脈・督脈・衝脈・帯脈・陰陽蹻脈・陰陽維脈の流注図、八脈交会穴の配穴理論、演習問題を網羅。",
      free: "任脈・督脈",
      premium: "全8脈の図解・解説・演習",
    },
    {
      id: "tsubo_compare",
      title: "経穴の比較",
      description: "似た働きを持つ経穴の取穴部位、解剖学的深度、五行、臨床応用を並べて確認。",
      free: "2穴の基本比較",
      premium: "3穴の詳細比較・結果をノートに保存",
    },
    {
      id: "export_print",
      title: "ノートの書き出し・印刷",
      description: "保存したノートを手元に保存するバックアップ機能や、患者さんにお渡しできるA4養生シート印刷に対応。",
      free: "テキストコピー（※無料枠内での保存・印刷も可）",
      premium: "バックアップ用ファイルの保存・A4印刷",
    },
  ],
};

/**
 * サブスクリプション受付が有効かどうかを判定
 */
export function isSubscriptionSalesEnabled(): boolean {
  return SUBSCRIPTION_CONFIG.enableSubscriptionSales;
}


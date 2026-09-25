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
      id: "clinical_memos",
      title: "【最大目玉機能】マイノート（患者臨床録 ＆ 独自配穴ストック）",
      description: "患者ごとの臨床ノート（主訴・四診・弁証・処方配穴・経過）をセキュアに管理。院内の待合室用体質問診POP印刷や、患者にお渡しするA4養生指導シートの印刷・PDF出力まで完全サポート。",
      free: "配穴20件 / 臨床ノート3件まで",
      premium: "配穴1,000件 / 臨床ノート500件（大容量・完全解放）",
    },
    {
      id: "clinical_cases",
      title: "臨床症例演習（全20症例）",
      description: "段階的問診・四診開示から弁証・治法・配穴を導く本格臨床トレーニング。全症例の解説と臨床根拠を閲覧可能。",
      free: "3症例のみ体験可能",
      premium: "全20症例が無制限",
    },
    {
      id: "practice_haiketsu",
      title: "配穴練習機能（選定理由・教材比較）",
      description: "361穴から目的のツボを組み合わせ、選定理由を言語化。教材の名配穴と即座に比較検証。",
      free: "基本配穴の閲覧のみ",
      premium: "自作配穴の作成・教材比較・無制限保存",
    },
    {
      id: "kikei_hachimai",
      title: "奇経八脈（全8脈）・流注SVG・八脈交会穴",
      description: "任督衝帯・陰陽蹻・陰陽維の全8脈の流注図、交会穴の配穴理論、臨床演習問題を網羅。",
      free: "任脈・督脈のみ閲覧可能",
      premium: "全8脈詳細図・臨床解説・演習の完全解放",
    },
    {
      id: "tsubo_compare",
      title: "経穴比較ツール（最大3穴横並び）",
      description: "似た主治や経絡を持つ2〜3穴の取穴部位、解剖学的深度、五行、臨床応用を精密比較。",
      free: "2穴簡易比較",
      premium: "3穴詳細比較・比較結果の学習ノート直接保存",
    },
    {
      id: "export_print",
      title: "ノート書き出し（JSON/Markdown）＆ A4印刷",
      description: "保存したマイノートや学習メモをMarkdown/JSONで手元にバックアップ・出力。整った形式での美しいA4印刷に対応。",
      free: "テキストコピーのみ",
      premium: "JSON/MD書き出し ＆ A4印刷完全対応",
    },
  ],
};

/**
 * サブスクリプション受付が有効かどうかを判定
 */
export function isSubscriptionSalesEnabled(): boolean {
  return SUBSCRIPTION_CONFIG.enableSubscriptionSales;
}


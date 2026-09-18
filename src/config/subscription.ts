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
    freeMemoMax: 20, // 無料会員の保存上限（初期仕様: 20件）
    premiumMemoMax: 1000, // プレミアム会員の保存上限（初期仕様: 1,000件）
    freeTrialCaseCount: 3, // 無料で体験可能な症例演習数（初期仕様: 3例）
  },

  // 本番販売有効化フラグ
  // false または環境変数未設定時は、安全なデモ・プレビューモードとして動作し、動作確認が可能です。
  enableSubscriptionSales: process.env.NEXT_PUBLIC_ENABLE_SUBSCRIPTION_SALES === "true",

  // Stripe公開鍵
  stripePublishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "",

  // プレミアム会員の提供機能一覧
  features: [
    {
      id: "clinical_cases",
      title: "臨床症例演習（全20症例）",
      description: "段階的問診・四診開示から弁証・治法・配穴を導く本格臨床トレーニング。全症例の解説と臨床根拠を閲覧可能。",
      free: "3症例のみ体験可能",
      premium: "全20症例が無制限",
    },
    {
      id: "clinical_memos",
      title: "マイカルテ・学習ノート保存上限",
      description: "独自の臨床知見や重要配穴、症例振り返りをクラウドに保存。",
      free: "最大20件まで",
      premium: "最大1,000件（大容量）",
    },
    {
      id: "simulator_compare",
      title: "臨床弁証シミュレーター・条件比較モード",
      description: "病態Aと病態B、治療案Aと治療案Bを横並びで並行比較し、鑑別要点と配穴の相違を即時可視化。",
      free: "通常モードのみ",
      premium: "2条件並行比較モード完全解放",
    },
    {
      id: "practice_haiketsu",
      title: "配穴練習機能（選定理由・教材比較）",
      description: "361穴から目的のツボを組み合わせ、選定理由を言語化。教材の名配穴と即座に比較検証。",
      free: "閲覧のみ",
      premium: "自作配穴の作成・教材比較・無制限保存",
    },
    {
      id: "kikei_hachimai",
      title: "奇経八脈（全8脈）・流注SVG・八脈交会穴",
      description: "任督衝帯・陰陽蹻・陰陽維の全8脈の流注図、交会穴の配穴理論、臨床演習問題を網羅。",
      free: "概要のみ",
      premium: "全8脈詳細図・臨床解説・演習の完全解放",
    },
    {
      id: "tsubo_compare",
      title: "経穴比較ツール（最大3穴横並び）",
      description: "似た主治や経絡を持つ2〜3穴の取穴部位、解剖学的深度、五行、臨床応用を精密比較。",
      free: "2穴簡易比較",
      premium: "3穴詳細比較・比較結果のマイカルテ直接保存",
    },
    {
      id: "export_print",
      title: "ノート書き出し（JSON/Markdown）＆ A4印刷",
      description: "保存したマイノートや学習メモをMarkdown/JSONで手元にバックアップ・出力。整った形式での美しいA4印刷に対応。",
      free: "テキストコピーのみ",
      premium: "JSON/MD書き出し ＆ A4印刷完全対応",
    },
    {
      id: "smart_review",
      title: "忘却曲線に基づくスマート復習レコメンド",
      description: "カリキュラム（公開71講）の進捗と演習の回答履歴から、今日復習すべき重要項目（5〜10分セット）を自動算出。",
      free: "誤答リストのみ",
      premium: "忘却曲線アルゴリズムによる自動復習レコメンド",
    },
    {
      id: "literature_library",
      title: "文献と症例の資料集（古典条文×現代科学）",
      description: "素問・霊枢・傷寒論の重要条文と現代エビデンス、臨床治験を結ぶ深掘り学術資料アーカイブ。",
      free: "一部公開",
      premium: "全学術資料の閲覧・検索",
    },
  ],
};

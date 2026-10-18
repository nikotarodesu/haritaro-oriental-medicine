/** Public descriptions shared by navigation, search and landing pages. */
export const TOOL_CATALOG = {
  kokushi: {
    title: '講義の復習', href: '/learn/review', short: '確認問題・間隔復習',
    description: '講義の確認問題を、回答履歴と復習予定から解き直せます。解説から関連する本文へ戻り、迷った内容を確かめます。',
  },
  simulator: {
    title: '弁証の練習', href: '/simulator', short: '症例・条件選択・見立て修正',
    description: '入力した八綱・気血水・臓腑の所見から、候補を支持する所見、矛盾する所見、まだ足りない情報を確認します。架空症例で2案を比べ、判断の理由を説明する練習ができます。',
  },
  haiketsu: {
    title: '配穴の練習', href: '/practice/haiketsu', short: '本治・標治の学習',
    description: '基本32穴から経穴を選び、本治・標治の目的と組み合わせを学習用に記録します。位置と注意事項を確認でき、個別の施術判断には臨床評価と専門資料が必要です。',
  },
} as const;

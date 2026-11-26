/** Public descriptions shared by navigation, search and landing pages. */
export const TOOL_CATALOG = {
  kokushi: {
    title: '確認問題と復習', href: '/learn/review', short: '確認問題・間隔復習',
    description: '講義・ツボ図鑑・模擬症例の確認問題に取り組めます。回答履歴があるときは、解き直す問題を選べます。',
  },
  simulator: {
    title: '弁証（所見から見立てる）', href: '/simulator', short: '症例・条件選択・見立て修正',
    description: '入力した八綱・気血水・臓腑の所見から、候補を支持する所見、矛盾する所見、まだ足りない情報を確認します。架空症例で2案を比べ、判断の理由を説明する練習ができます。',
  },
  haiketsu: {
    title: '配穴を練習する', href: '/practice/haiketsu', short: '本治・標治の学習',
    description: '基本32穴から経穴を選び、本治・標治の目的と組み合わせを学習用に記録します。位置と注意事項を確認でき、個別の施術判断には臨床評価と専門資料が必要です。',
  },
} as const;

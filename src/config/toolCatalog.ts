/** Public descriptions shared by navigation, search and landing pages. */
export const TOOL_CATALOG = {
  kokushi: {
    title: '国家試験対策・オリジナル演習', href: '/kokushi', short: 'オリジナル問題・復習',
    description: '東洋医学のオリジナル4択演習と経穴ドリル。回答履歴に応じた間隔復習から、関連講義・症例演習へ進めます。',
  },
  simulator: {
    title: '臨床弁証シミュレーター', href: '/simulator', short: '候補・根拠・不足所見',
    description: '入力した八綱・気血水・臓腑の所見から、候補を支持する所見、矛盾する所見、まだ足りない情報を確認します。架空症例で2案を比べ、判断の理由を説明する練習ができます。',
  },
  haiketsu: {
    title: '配穴設計', href: '/practice/haiketsu', short: '本治・標治の学習',
    description: '経穴を選び、本治・標治の目的と組み合わせを学習用に記録します。位置と注意事項を確認でき、個別の施術判断には臨床評価と専門資料が必要です。',
  },
} as const;

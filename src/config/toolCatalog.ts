/** Public descriptions shared by navigation, search and landing pages. */
export const TOOL_CATALOG = {
  kokushi: {
    title: '国家試験対策・オリジナル演習', href: '/kokushi', short: 'オリジナル問題・復習',
    description: '東洋医学のオリジナル4択演習と経穴ドリル。回答履歴に応じた間隔復習から、関連講義・症例演習へ進めます。',
  },
  simulator: {
    title: '臨床弁証シミュレーター', href: '/simulator', short: '候補・根拠・不足所見',
    description: '八綱・気血水・臓腑の所見から候補、支持材料、不足・矛盾する所見を整理。架空症例と2案比較で判断の根拠を練習します。',
  },
  haiketsu: {
    title: '配穴設計', href: '/practice/haiketsu', short: '本治・標治の学習',
    description: '選定した経穴と本治・標治の組み合わせを学習用に整理。位置と注意事項を確認し、個別の施術判断は臨床評価と専門資料で行います。',
  },
} as const;

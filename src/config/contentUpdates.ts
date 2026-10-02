/** Significant content revisions only; never replace these with the build date. */
export const SITE_REVISED_AT = '2026-10-02';
export const PAGE_REVISIONS: Record<string, string> = {
  '/': SITE_REVISED_AT, '/learn': SITE_REVISED_AT, '/clinical': SITE_REVISED_AT,
  '/kokushi': SITE_REVISED_AT, '/curriculum': SITE_REVISED_AT,
  '/simulator': SITE_REVISED_AT, '/library': SITE_REVISED_AT,
  '/articles': SITE_REVISED_AT, '/contact': SITE_REVISED_AT,
  '/tsubo/practice': SITE_REVISED_AT, '/pricing': SITE_REVISED_AT,
};
export const SITE_UPDATES = [
  { date: SITE_REVISED_AT, label: 'ログイン・契約管理', href: '/auth/login', text: 'Google認証へ一本化し、決済状態の確認・契約管理・同期表示を改善' },
  { date: SITE_REVISED_AT, label: '検索・情報表示', href: '/tsubo/li4', text: '表記ゆれ検索、文献への直接移動、経穴模式図の情報区分を改善' },
  { date: SITE_REVISED_AT, label: '学習・復習', href: '/kokushi#learning-review', text: '問題の正確性を見直し、間隔復習と講義・症例への学習導線を改善' },
  { date: SITE_REVISED_AT, label: '症例演習', href: '/simulator#case-training', text: '架空症例で追加質問・安全判断・根拠・再評価を練習する演習を追加' },
] as const;

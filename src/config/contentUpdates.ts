/** Significant content revisions only; never replace these with the build date. */
export const SITE_REVISED_AT = '2026-10-02';
export const PAGE_REVISIONS: Record<string, string> = {
  '/': SITE_REVISED_AT, '/learn': SITE_REVISED_AT, '/clinical': SITE_REVISED_AT,
  '/kokushi': SITE_REVISED_AT, '/curriculum': SITE_REVISED_AT,
  '/simulator': SITE_REVISED_AT, '/library': SITE_REVISED_AT,
  '/articles': SITE_REVISED_AT, '/contact': SITE_REVISED_AT,
  '/tsubo/practice': SITE_REVISED_AT, '/pricing': SITE_REVISED_AT,
  '/safety': SITE_REVISED_AT, '/editorial-policy': SITE_REVISED_AT,
  '/symptoms': SITE_REVISED_AT, '/diagnosis': SITE_REVISED_AT, '/cases': SITE_REVISED_AT,
};
export const SITE_UPDATES = [
  { date: SITE_REVISED_AT, label: '受診と施術の安全性', href: '/safety', text: '救急受診の目安を明確にし、固定の安全深度・未照合の施術手順を掲載保留' },
  { date: SITE_REVISED_AT, label: '文献の照合', href: '/editorial-policy', text: '出典の誤りを修正し、書誌照合・内容の確認・専門家監修の状態を区別して公開' },
  { date: SITE_REVISED_AT, label: 'ログイン・契約管理', href: '/auth/login', text: 'Google認証へ一本化し、決済状態の確認・契約管理・同期表示を改善' },
  { date: SITE_REVISED_AT, label: '検索・情報表示', href: '/tsubo/li4', text: '表記ゆれ検索、文献への直接移動、経穴模式図の情報区分を改善' },
  { date: SITE_REVISED_AT, label: '学習・復習', href: '/kokushi#learning-review', text: '問題の正確性を見直し、間隔復習と講義・症例への学習導線を改善' },
  { date: SITE_REVISED_AT, label: '症例演習', href: '/simulator#case-training', text: '判断と理由を別々に採点し、不足した根拠・不適切な根拠・安全上の見落としを解説' },
] as const;

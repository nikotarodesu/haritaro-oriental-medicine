/** Significant content revisions only; never replace these with the build date. */
export const SITE_REVISED_AT = '2026-10-02';
export const ACUPOINT_PAGE_REVISED_AT = '2026-10-03';
export const PAGE_REVISIONS: Record<string, string> = {
  '/learn': '2026-10-03', '/kokushi': SITE_REVISED_AT,
  '/simulator': SITE_REVISED_AT,
  '/articles': '2026-10-03', '/contact': SITE_REVISED_AT,
  '/tsubo/practice': SITE_REVISED_AT, '/pricing': SITE_REVISED_AT,
  '/symptoms': SITE_REVISED_AT, '/diagnosis': SITE_REVISED_AT, '/cases': SITE_REVISED_AT,
  // 実際に改訂したページだけを更新する。全教材の確認日には用いない。
  '/': '2026-10-03', '/tsubo': '2026-10-03', '/about': '2026-10-03',
  '/clinical': '2026-10-03', '/safety': '2026-10-03', '/editorial-policy': '2026-10-03',
  '/library': '2026-10-03', '/glossary': '2026-10-03', '/curriculum': '2026-10-03',
  '/curriculum/lecture-yinyang-1': '2026-10-03',
  '/curriculum/lecture-yinyang-2': '2026-10-03',
  '/curriculum/lecture-yinyang-3': '2026-10-03',
  '/curriculum/lecture-yinyang-4': '2026-10-03',
  '/curriculum/lecture-yinyang-5': '2026-10-03',
  '/curriculum/lecture-yinyang-6': '2026-10-03',
  '/curriculum/lecture-yinyang-7': '2026-10-03',
  '/curriculum/lecture-yinyang-8': '2026-10-03',
};
export const SITE_UPDATES = [
  { date: '2026-10-03', label: '検索と利用案内', href: '/learn', text: '検索語を保った再検索と経穴の条件解除を整備。教材の確認範囲・公開機能の説明と、ページ別の検索用情報を見直し' },
  { date: '2026-10-03', label: '図解と記事の回遊', href: '/articles', text: '12記事と陰陽4講義の本文に20個の図解を追加。テーマから探す入口、読み進めた位置、次に学べる内容を示す関連記事を整備' },
  { date: '2026-10-03', label: '導線と読みやすさ', href: '/tsubo', text: 'スマホの学習入口、経穴検索・ページ内目次、文献の分類と検索解除を改善。日本語書体・文字サイズ・カードの余白を統一' },
  { date: '2026-10-03', label: '教材の説明を見直し', href: '/editorial-policy', text: '陰陽8講義と関連図・用語・古典・配穴例で伝統的な説明と医学的根拠を区別。電子本文の引用範囲と未確認の底本を明示' },
  { date: '2026-10-03', label: '経穴の情報と操作', href: '/tsubo/li4', text: '合谷の位置説明、検索用の監修表示、共有情報を修正し、スマホの保存・比較・復習操作を改善' },
  { date: SITE_REVISED_AT, label: '受診と施術の安全性', href: '/safety', text: '救急受診の目安を明確にし、固定の安全深度・未照合の施術手順を掲載保留' },
  { date: SITE_REVISED_AT, label: '文献の照合', href: '/editorial-policy', text: '出典の誤りを修正し、書誌照合・内容の確認・専門家監修の状態を区別して公開' },
  { date: SITE_REVISED_AT, label: 'ログイン・契約管理', href: '/auth/login', text: 'Google認証へ一本化し、決済状態の確認・契約管理・同期表示を改善' },
  { date: SITE_REVISED_AT, label: '検索・情報表示', href: '/tsubo/li4', text: '表記ゆれ検索、文献への直接移動、経穴模式図の情報区分を改善' },
  { date: SITE_REVISED_AT, label: '学習・復習', href: '/kokushi#learning-review', text: '問題の正確性を見直し、間隔復習と講義・症例への学習導線を改善' },
  { date: SITE_REVISED_AT, label: '症例演習', href: '/simulator#case-training', text: '判断と理由を別々に採点し、不足した根拠・不適切な根拠・安全上の見落としを解説' },
] as const;

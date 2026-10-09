import { CURRICULUM_CHAPTERS_META } from '@/data/curriculumOutline';
import { LEARNING_COURSES } from '@/data/learningCourses';

/** Significant content revisions only; never replace these with the build date. */
export const SITE_REVISED_AT = '2026-10-02';
export const ACUPOINT_PAGE_REVISED_AT = '2026-10-08';
// Includes question-only changes, but not unchanged lessons in the same chapter.
export const CURRICULUM_EDITORIAL_REVISIONS = [
  'lecture-qiblood-1', 'lecture-qiblood-2', 'lecture-qiblood-3', 'lecture-qiblood-5',
  'lecture-lifedynamics-7', 'lecture-lifedynamics-9',
  'lecture-pathomechanism-7', 'lecture-pathomechanism-9', 'lecture-pathomechanism-11',
  'lecture-diagnosis-1', 'lecture-diagnosis-3', 'lecture-diagnosis-4', 'lecture-diagnosis-5',
  'lecture-diagnosis-6', 'lecture-diagnosis-7', 'lecture-diagnosis-9', 'lecture-diagnosis-10', 'lecture-diagnosis-11',
  'lecture-treatment-1', 'lecture-treatment-3', 'lecture-treatment-6', 'lecture-treatment-10',
  ...Array.from({ length: 12 }, (_, index) => `lecture-practice-${index + 1}`),
  'lecture-pathomechanism-1', 'lecture-lifedynamics-12', 'lecture-wuxing-8',
  ...Array.from({ length: 4 }, (_, index) => `lecture-intro-${index + 1}`),
  ...Array.from({ length: 5 }, (_, index) => `lecture-zangfu-${index + 1}`),
  ...Array.from({ length: 4 }, (_, index) => `lecture-meridians-${index + 1}`),
  'lecture-yinyang-8', 'lecture-pathomechanism-12', 'lecture-diagnosis-12',
  'lecture-treatment-9', 'lecture-treatment-12',
] as const;
export const PAGE_REVISIONS: Record<string, string> = {
  '/learn': '2026-10-08', '/kokushi': '2026-10-08',
  '/simulator': '2026-10-04',
  '/articles': '2026-10-03', '/contact': SITE_REVISED_AT,
  '/tsubo/practice': '2026-10-04', '/pricing': SITE_REVISED_AT,
  '/symptoms': '2026-10-08', '/diagnosis': '2026-10-08', '/cases': SITE_REVISED_AT,
  // 実際に改訂したページだけを更新する。全教材の確認日には用いない。
  '/': '2026-10-09', '/updates': '2026-10-09', '/tsubo': '2026-10-03', '/about': '2026-10-03',
  '/clinical': '2026-10-04', '/practice/haiketsu': '2026-10-04', '/safety': '2026-10-03', '/editorial-policy': '2026-10-08',
  '/library': '2026-10-08', '/glossary': '2026-10-09', '/curriculum': '2026-10-09',
  '/curriculum/lecture-yinyang-1': '2026-10-03',
  '/curriculum/lecture-yinyang-2': '2026-10-03',
  '/curriculum/lecture-yinyang-3': '2026-10-03',
  '/curriculum/lecture-yinyang-4': '2026-10-03',
  '/curriculum/lecture-yinyang-5': '2026-10-03',
  '/curriculum/lecture-yinyang-6': '2026-10-03',
  '/curriculum/lecture-yinyang-7': '2026-10-03',
  '/curriculum/lecture-yinyang-8': '2026-10-03',
  '/curriculum/lecture-wuxing-1': '2026-10-03',
  '/curriculum/lecture-wuxing-3': '2026-10-03',
  '/curriculum/lecture-qiblood-1': '2026-10-08',
  '/curriculum/lecture-qiblood-2': '2026-10-08',
  '/curriculum/lecture-qiblood-3': '2026-10-08',
  '/curriculum/lecture-qiblood-4': '2026-10-08',
  '/curriculum/lecture-qiblood-5': '2026-10-08',
  // 2026-10-08: chapter structure, learning order and lesson navigation were revised.
  ...Object.fromEntries(CURRICULUM_CHAPTERS_META.flatMap(chapter => chapter.lectureIds.map(id => [`/curriculum/${id}`, '2026-10-08']))),
  ...Object.fromEntries(CURRICULUM_EDITORIAL_REVISIONS.map(id => [`/curriculum/${id}`, '2026-10-09'])),
  ...Object.fromEntries(LEARNING_COURSES.map(course => [`/learn/courses/${course.slug}`, '2026-10-08'])),
  '/learn/courses': '2026-10-08',
};
export const SITE_UPDATES = [
  { date: '2026-10-09', label: '章末問題の独立化と初期計画書の具体化', href: '/curriculum', text: '各講のクイズを再掲していた章末88問を、分類・比較・記録の読み取りを問う独立した問題へ変更。全11章の記述課題に具体的な解答例を追加し、治療戦略の学習目標・記入済み計画書・次章との症例の切り替えを明確化' },
  { date: '2026-10-09', label: '本文と用語集の整合性・基礎講義の接続を改善', href: '/curriculum', text: '病機論の導入と用語集7項目を見直し、伝統的な説明と確認された機序を区別。基礎13講に学習例の整理・記録の案内を補完し、確認問題2問を用語の役割・関係を判断する問題へ改訂' },
  { date: '2026-10-09', label: '講義本文・症例の接続・確認問題を改訂', href: '/curriculum', text: '29講の本文を見直し、学習目標と確認問題・参照見出しを修正。症例の比較表・評価指標・SOAP記録を具体化し、誇張や未確認の医学的断定を整理。講義URLと問題IDは維持' },
  { date: '2026-10-09', label: 'トップの学習コースを整理', href: '/', text: '概論・陰陽・気血津液・臓腑の最初の4コースを紹介し、全11コースの一覧へつながる入口を明示' },
  { date: '2026-10-08', label: '章末演習・安全記述・スマホ表示を改善', href: '/curriculum', text: '全11章に9問の総合チェックと記述演習を追加。治療条件と未検証の数値・断定を見直し、文字図を折り返せるカードへ変更。八綱の前提学習、生命機能論の詳読区分、編集者・更新日、読み込みと本文ランドマークを改善' },
  { date: '2026-10-08', label: '概論から始まるカリキュラムへ再構成', href: '/learn', text: '概論4講・臓腑5講・経絡4講を追加し、気血津液と臓腑の基礎を五行より前へ。短いコースと体系学習の順序、各章の学習例、理論から例へ戻る導線と確認問題を整備' },
  { date: '2026-10-08', label: '教材の整合性・復習の継続・一覧表示を改善', href: '/curriculum', text: '体質傾向の検索用情報と気血水の本文・図解・確認問題を学習用途に統一。用語の参照先と表記ゆれ検索、解説から戻る復習の途中保存、ブラウザの戻る操作を改善し、講義一覧の読み込みを軽量化' },
  { date: '2026-10-08', label: '症状別の入口・検索・出典を改善', href: '/symptoms', text: '症状ごとの学習ガイドと検索の目的別表示を整備。経穴の位置と注意を冒頭へ移し、本文・構造化データ・AI向け案内の整合性と文献の確認範囲を見直し' },
  { date: '2026-10-05', label: 'スマホの表示と操作を整理', href: '/', text: 'トップの改行・余白・情報順序と検索欄を整理。保存一覧をその他メニューへ移し、文字拡大と固定ナビに合わせた表示を整備' },
  { date: '2026-10-04', label: '所見から記録・再評価へ', href: '/clinical', text: '鍼灸師の臨床ホームと6つの主訴別ガイドを追加。四診の未確認・候補比較・配穴の理由・前回との経過比較を整備し、講義と見立て修正の演習を接続' },
  { date: '2026-10-04', label: '途中から続ける・目的から探す', href: '/articles', text: '記事の保存した節から再開する入口を追加。検索の候補選択と種類別の件数、中断した経穴演習の保存、スマホメニューの操作と表示を改善' },
  { date: '2026-10-04', label: '考え方から復習・記録へ', href: '/kokushi#learning-focus-review', text: '症例で迷った理由から既存の解説と問題へ案内。前回と今回の考えを比べる学習ノート、今日の一歩、コースを保った次の学習と無料範囲の案内を整備' },
  { date: '2026-10-03', label: '目的別の学習コース', href: '/learn/courses', text: '陰陽・五行・気血津液の3コースを追加。講義の進捗と苦手問題に応じた再開、疑問から読む入口と比較図を整備' },
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

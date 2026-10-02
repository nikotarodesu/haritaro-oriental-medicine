import type { Metadata } from 'next';
import Link from 'next/link';
import summary from '@/data/medicalReviewSummary.json';
import audit from '@/data/references/bibliographyAudit.json';
export const metadata: Metadata = { title: '医学記述・出典の確認方針', description: '書誌の照合、研究結果の解釈、専門家による監修の状況を分けて公開します。', alternates: { canonical: '/editorial-policy' } };
export default function EditorialPolicyPage() {
  const records = Object.values(audit);
  return <main className="mx-auto max-w-3xl px-4 py-12 space-y-7 text-[#232826] dark:text-[#FAF8F5]">
    <h1 className="font-serif text-3xl font-bold">医学記述・出典の確認方針</h1>
    <p className="leading-relaxed">伝統的な分類、現代医学の研究結果、理解を助ける比喩を区別します。文献が存在することと、教材の説明がその文献で支持されることは別々に確認します。</p>
    <section className="space-y-3"><h2 className="text-xl font-bold">現在の確認状況</h2>
      <p>登録論文44件を照合し、書誌一致を確認できたものは{records.filter(record => record.bibliographyStatus === 'matched').length}件です。撤回論文、書誌の不一致、原典を確認できない文献は研究資料一覧と検索の対象から外しています。</p>
      <p>5件の要約は原典の対象・比較・結果の適用範囲を確認して書き直しました。それ以外の効果量・配穴・安全性の詳細は、照合が完了するまで掲載を保留しています。</p>
      <p><Link href="/articles/science-of-tongue-diagnosis" className="underline">舌診の記事</Link>では別分野の論文を指していた引用を取り下げ、観察・伝統的な解釈・口腔の医学的評価を区別した説明へ修正しました。</p>
      <p className="font-bold">全件の医学的正確性の照合と、専門家による監修は完了していません。</p>
      <p>記事・講義・経穴・症例・クイズなどから{summary.statements.toLocaleString('ja-JP')}件の記述を確認台帳へ抽出しました。このうち{summary.priorityStatements.toLocaleString('ja-JP')}件には、断定表現・数値・安全性などを優先確認する印が付いています。これは確認対象の一覧であり、確認済みの件数ではありません。</p>
    </section>
    <section className="space-y-3"><h2 className="text-xl font-bold">安全性を優先した今回の修正</h2><p>全日本鍼灸学会の2025年版安全対策ガイドラインなどを参照し、経穴教材の一律の安全深度・骨による安全保証を取り下げました。記事の伝統理論と医学的診断の同一視、症状ガイドの受診案内も修正しています。これは該当箇所の照合・修正であり、全件の監修完了を意味しません。</p><p>出典を確認できない施術手順や症例アーカイブの公開は保留しています。</p><Link href="/safety" className="underline">受診の目安・安全性の出典と確認範囲</Link></section>
    <section className="space-y-3"><h2 className="text-xl font-bold">記述ごとに確認すること</h2><ol className="list-decimal pl-5 space-y-2">
      <li>出典の著者、題名、年、識別子が一致しているか。訂正・撤回がないか。</li>
      <li>原典のどのページ・表・段落が記述を支持するか。</li>
      <li>対象、比較、評価時点、効果量・不確実性を正しく説明しているか。</li>
      <li>動物実験からヒトへ、別疾患へ、伝統的分類へ過度に一般化していないか。</li>
      <li>紹介・受診の判断や施術上の注意を、資格を持つ監修者が確認したか。</li>
    </ol></section>
    <section className="space-y-3"><h2 className="text-xl font-bold">監修の記録</h2><p>監修者の氏名・資格、確認した記述の版、対象範囲、確認日、修正内容を記録します。執筆者情報や自動チェックの合格だけを「専門家監修済み」と表示することはありません。</p><p>本文を変更した場合、以前の確認を新しい記述へ自動で引き継ぎません。施術の安全性や緊急の対応が関わる記述を優先して確認します。</p></section>
    <p className="text-sm">確認台帳の作成日：{summary.generatedAt}。記述の誤りや出典の不一致は<Link href="/contact" className="underline">お問い合わせ</Link>からお知らせください。</p>
    <Link href="/library" className="inline-flex min-h-11 items-center underline">書誌を照合した研究資料を見る</Link>
  </main>;
}

import type { Metadata } from 'next';
import { pageSocialMetadata, seriesPageTitle } from '@/config/seo';
import Link from 'next/link';
import PageIntro from '@/components/design/PageIntro';
import { SearchCheck, ClipboardCheck, History } from 'lucide-react';
import summary from '@/data/medicalReviewSummary.json';
import { PAPERS_DATABASE, VERIFIED_PAPERS } from '@/data/references/papersData';
import { CLASSICAL_TEXTS } from '@/data/classicalTextsData';
const title = seriesPageTitle("医学記述・出典の確認方針", "reading");

export const metadata: Metadata = { title, description: '書誌の照合、研究結果の解釈、専門家による監修の状況を分けて公開します。', ...pageSocialMetadata(title, '書誌の照合、研究結果の解釈、専門家による監修の状況を分けて公開します。', '/editorial-policy'), alternates: { canonical: '/editorial-policy' } };
export default function EditorialPolicyPage() {
  const checkedPapers = VERIFIED_PAPERS.filter(paper => paper.claimsStatus === 'source-checked');
  return <div className="page-layout page-layout--reading space-y-7 leading-relaxed">
    <PageIntro title="医学記述・出典の確認方針" description="論文や古典のどこを確認したかと、第三者による監修の状況を掲載します。" art="reading" compact>
      <nav aria-label="確認方針の目次" className="page-actions">
        <a href="#current-review" className="page-secondary-action"><SearchCheck size={18} aria-hidden="true" />現在の確認状況</a>
        <a href="#review-criteria" className="page-secondary-action"><ClipboardCheck size={18} aria-hidden="true" />確認する項目</a>
        <a href="#review-record" className="page-secondary-action"><History size={18} aria-hidden="true" />第三者監修の状況</a>
      </nav>
    </PageIntro>
    <p className="leading-relaxed">伝統的な分類、現代医学の研究結果、理解を助ける比喩を区別します。文献が存在することと、教材の説明がその文献で支持されることは別々に確認します。</p>
    <section id="current-review" className="scroll-mt-28 space-y-3"><h2 className="text-xl font-bold">現在の確認状況</h2>
      <p>候補となった論文{PAPERS_DATABASE.length}件を照合し、{VERIFIED_PAPERS.length}件で題名・著者・掲載誌などを確認できました。撤回された論文や、書誌・原典を確認できなかった論文は、文献ライブラリの研究一覧とその検索対象から外しています。</p>
      <p>書誌が一致した論文のうち{checkedPapers.length}件は、抄録または本文の一部も参照しました。研究の対象・比較・結果をまとめ、参照した箇所と日付を論文ごとに示しています。ツボ図鑑や症状別ガイドで直接紹介する研究は、各ページで出典を確認できます。</p>
      <p>古典{CLASSICAL_TEXTS.filter(classic => classic.verifiedQuotation).length}件では、電子本文から確認した箇所を引用し、以前掲載した文章との字句の違いを項目ごとに説明しています。引用の出典は電子本文です。底本の画像を調べる場合は、原典側の資料をご覧ください。</p>
      <Link href="/safety" className="underline">受診の目安・安全性の出典と確認範囲</Link>
    </section>
    <section aria-labelledby="review-inventory" className="space-y-3">
      <h2 id="review-inventory" className="text-xl font-bold">確認対象の一覧</h2>
      <p>{summary.generatedAt}に作成した一覧では、記事や講義、ツボ図鑑の文章や図など{summary.statements.toLocaleString('ja-JP')}件を見直しの対象としました。このうち{summary.priorityStatements.toLocaleString('ja-JP')}件は、受診の目安や研究結果の数値など、優先して確認する記述です。</p>
    </section>
    <section id="review-criteria" className="scroll-mt-28 space-y-3"><h2 className="text-xl font-bold">記述ごとに確認すること</h2><ol className="list-decimal pl-5 space-y-2">
      <li>出典の著者、題名、年、識別子が一致しているか。訂正・撤回がないか。</li>
      <li>原典のどのページ・表・段落が記述を支持するか。</li>
      <li>対象、比較、評価時点、効果量・不確実性を正しく説明しているか。</li>
      <li>動物実験からヒトへ、別疾患へ、伝統的分類へ過度に一般化していないか。</li>
      <li>紹介・受診の判断や施術上の注意を、資格を持つ監修者が確認したか。</li>
    </ol></section>
    <section id="review-record" className="scroll-mt-28 space-y-3">
      <h2 className="text-xl font-bold">第三者監修の状況</h2>
      <p>執筆者が出典を照合しています。第三者の専門家による監修は完了していません。</p>
      <p>監修を実施した項目は、監修者の氏名・資格、対象の版と範囲、確認日、修正内容を記録します。本文を改訂した場合は、変更した箇所を改めて確認します。</p>
    </section>
    <section id="revision-history" className="scroll-mt-28 space-y-6 border-t border-[#E5DEC9] pt-6 dark:border-[#2A3B4A]">
      <h2 className="font-serif text-xl font-bold">教材改訂の履歴</h2>
      <section className="space-y-3">
        <h3 className="font-serif text-lg font-bold">安全性を優先した修正</h3>
        <p>全日本鍼灸学会の2025年版安全対策ガイドラインなどを参照し、経穴教材の一律の安全深度・骨による安全保証を取り下げました。記事の伝統理論と医学的診断の同一視、症状ガイドの受診案内も修正しています。これは該当箇所の照合・修正であり、全件の監修完了を意味しません。</p>
      </section>
    <section className="space-y-3"><h3 className="font-serif text-lg font-bold">2026年10月3日の教材改訂</h3>
      <p>陰陽の8講義・関連する24問と関連図では、伝統的な分類と自律神経・恒常性・甲状腺機能などの生理学的な概念を区別しました。伝統的な証だけで薬の適否や治療方法を判断させる表現、救急症状への施術案内、未照合の具体的な刺鍼手順も改訂しました。用語集、古典条文の解説、配穴の学習例は、特効・相乗効果や現代の疾患の治癒を断定しない説明へ改訂しました。</p>
      <p>古典6件は電子本文の該当箇所を確認し、元の掲載文とは分けて引用・資料名・確認範囲を表示しています。ここで参照したのは電子本文です。電子資料から版やページが分かる場合は、引用箇所と一緒に示します。</p>
      <p>合谷の位置説明を統一し、経穴ページの検索用データに残っていた「鍼灸師監修」の表示を修正しました。これはこの改訂で変更した箇所の記録であり、全教材の確認完了を示すものではありません。</p>
      <p className="text-sm">参照した資料：<a className="underline" href="https://www.who.int/publications/i/item/9789240042322">WHOの伝統医学用語集の書誌</a>、<a className="underline" href="https://www.nccih.nih.gov/health/acupuncture-effectiveness-and-safety">NCCIHの鍼治療の研究と安全性</a>。各資料が支持する範囲と未確認の範囲は、講義の参考文献と古典の注記に記載しています。</p>
    </section>
      <section className="space-y-3"><h3 className="font-serif text-lg font-bold">引用と説明の訂正</h3>
      <p><Link href="/articles/science-of-tongue-diagnosis" className="underline">舌診の記事</Link>では別分野の論文を指していた引用を取り下げ、観察・伝統的な解釈・口腔の医学的評価を区別した説明へ修正しました。</p>
      </section>
    </section>
    <p className="text-sm">記述の誤りや出典の不一致は<Link href="/contact" className="underline">お問い合わせ</Link>からお知らせください。</p>
    <Link href="/library" className="inline-flex min-h-11 items-center underline">書誌を照合した研究資料を見る</Link>
  </div>;
}

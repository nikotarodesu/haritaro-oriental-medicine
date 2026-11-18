import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, GraduationCap, Heart } from 'lucide-react';
import { ALL_NAV_ITEMS, type NavItemDefinition } from '@/config/navigationItems';
import { pageSocialMetadata } from '@/config/seo';
import ClinicalDashboard from '@/components/clinical/ClinicalDashboard';
import PublicLectureIndex from '@/components/curriculum/PublicLectureIndex';

const title = '鍼灸の症例演習・配穴演習・見立ての練習｜はり太郎の臨床演習';
const description = '架空の症例を読み、何を尋ねるか、どのツボを選ぶか、その理由を考える鍼灸の演習です。症例演習・配穴演習・主訴別ガイドから選べます。';
export const metadata: Metadata = {
  title: { absolute: title }, description,
  alternates: { canonical: 'https://www.haritaro.jp/clinical' },
  ...pageSocialMetadata(title, description, '/clinical'),
};

function ToolLinks({ items }: { items: readonly NavItemDefinition[] }) {
  return <ul className="clinical-tool-grid">{items.map(({ icon: Icon, ...tool }) => <li key={tool.href}>
    <Link href={tool.href} className="clinical-tool-card">
      <span className="clinical-tool-icon"><Icon aria-hidden="true" /></span>
      <span className="min-w-0 flex-1"><span className="block font-semibold">{tool.label}</span><span className="mt-1 block text-sm ui-muted">{tool.description}</span></span>
      <ArrowRight aria-hidden="true" className="clinical-card-arrow" />
    </Link>
  </li>)}</ul>;
}
const focusClass = 'focus-visible:outline-2 focus-visible:outline-offset-4';
const exercises: readonly NavItemDefinition[] = [
  { ...ALL_NAV_ITEMS.cases, label: '症例演習', description: '架空の症例を読み、何を先に確認するか考える' },
  { ...ALL_NAV_ITEMS.haiketsu, label: '配穴演習', description: 'ツボの組み合わせと選ぶ理由を考える' },
  { ...ALL_NAV_ITEMS.simulator, label: '見立ての練習', description: '所見から複数の伝統的な見方を比べる' },
];

export default function ClinicalLandingPage() {
  return (
    <div className="clinical-page clinical-page--focused">
      <section id="tools" aria-labelledby="clinical-series-heading" className="mb-10 space-y-5 border-b border-[var(--border-washi)] pb-8 sm:mb-12">
        <header className="space-y-3">
          <h1 id="clinical-series-heading" className="font-serif text-3xl font-bold leading-snug sm:text-4xl">はり太郎の臨床演習</h1>
          <p className="max-w-prose leading-relaxed ui-muted">「いつから痛みますか？」。架空の相談を読んで、次に何を尋ねるか考えてみましょう。鍼灸を学ぶ方のための、症例とツボの組み合わせの練習です。</p>
        </header>
        <ToolLinks items={exercises} />
        <p className="clinical-tool-note">演習の結果だけで、実際の診断・施術方針は決まりません。</p>
      </section>
      <section aria-labelledby="practice-reading" className="mb-8 space-y-4">
        <h2 id="practice-reading" className="font-serif text-2xl font-bold">架空の相談・症例を読んで考える</h2>
        <PublicLectureIndex series="practice" />
      </section>
      <ClinicalDashboard />
      <section aria-labelledby="clinical-help-heading" className="clinical-help">
        <h2 id="clinical-help-heading">利用・保存について</h2>
        <details className="rounded-xl border border-[#D9E3DD] px-4 dark:border-[#2A3B4A]">
          <summary className={`min-h-11 cursor-pointer py-3 font-semibold ${focusClass}`}>作業中の下書きの取り扱い</summary>
          <div className="space-y-3 pb-4 text-sm leading-relaxed ui-muted">
            <p>作業中の下書きは、このブラウザのタブに一時保存されます。氏名・電話番号・住所は入力せず、患者番号などの記号を使ってください。自由記述にも本人を特定できる情報を含めないでください。</p>
            <Link href="/privacy" className={`inline-flex min-h-11 items-center underline ${focusClass}`}>記録と個人情報の取り扱い</Link>
          </div>
        </details>
        <details className="rounded-xl border border-[#D9E3DD] px-4 dark:border-[#2A3B4A]">
          <summary className={`min-h-11 cursor-pointer py-3 font-semibold ${focusClass}`}>教材の出典・確認範囲</summary>
          <p className="pb-4 text-sm leading-relaxed ui-muted">教材は新版東洋医学概論・経絡経穴概論、WHO標準経穴部位、中医基礎理論などを参照しています。全件の医学記述の照合・専門家監修は未完了です。伝統理論の分類と医学的な評価を区別して利用してください。</p>
          <Link href="/editorial-policy" className={`mb-3 inline-flex min-h-11 items-center underline ${focusClass}`}>出典と確認範囲</Link>
        </details>
      </section>
      <nav aria-label="関連する案内" className="clinical-related-links"><Link href="/learn"><GraduationCap aria-hidden="true" />はり太郎の東洋医学</Link><Link href="/symptoms"><Heart aria-hidden="true" />ツボ図鑑の症状ガイド</Link></nav>
    </div>
  );
}

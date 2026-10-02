import type { Metadata } from 'next';
import Link from 'next/link';
import { GLOSSARY_TERMS } from '@/data/glossaryData';

export const metadata: Metadata = { title: '東洋医学の用語集｜読み方・要点・関連講義', description: '陰陽・五行・気血水・四診などの専門用語を、読み方と要点、詳しい説明、関連講義から学べる用語集。', alternates: { canonical: '/glossary' } };
export default function GlossaryPage() {
  const terms = Object.values(GLOSSARY_TERMS);
  return <div className="mx-auto max-w-5xl space-y-6 px-4 py-8 sm:py-12 text-[#232826] dark:text-[#FAF8F5]">
    <h1 className="font-serif text-3xl font-bold">東洋医学の用語集</h1>
    <p className="text-sm leading-relaxed">伝統的な分類や用語を学ぶための解説です。現代医学の診断名とは区別し、関連講義で前提と判断の根拠を確認してください。</p>
    <nav aria-label="用語の索引" className="flex flex-wrap gap-2">{terms.map(term => <a key={term.term} href={'#term-' + encodeURIComponent(term.term)} className="inline-flex min-h-11 items-center rounded-lg border border-[#E8E1D1] dark:border-[#263542] px-3 text-sm underline">{term.term}</a>)}</nav>
    <div className="space-y-4">{terms.map(term => <section key={term.term} id={'term-' + term.term} className="scroll-mt-28 target:ring-2 target:ring-[#74BA9E] rounded-2xl border border-[#E8E1D1] dark:border-[#263542] bg-white dark:bg-[#17212A] p-5 space-y-3">
      <h2 className="text-xl font-bold">{term.term}<span className="ml-2 text-sm font-normal">（{term.reading}）</span></h2>
      <p className="font-semibold text-sm">{term.oneLiner}</p><p className="whitespace-pre-line text-sm leading-relaxed">{term.summary}</p>
      {term.relatedLectureId && <Link href={'/curriculum/' + term.relatedLectureId} className="inline-flex min-h-11 items-center text-sm underline">関連講義で詳しく学ぶ →</Link>}
    </section>)}</div>
  </div>;
}

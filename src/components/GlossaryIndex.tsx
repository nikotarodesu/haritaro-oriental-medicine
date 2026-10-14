'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Search, ArrowRight, BookOpen } from 'lucide-react';
import type { GlossaryTerm } from '@/data/glossaryData';
import { matchesSearchText } from '@/utils/search';

const categories: GlossaryTerm['category'][] = ['陰陽五行・理論', '気血水・病態', '経絡・経穴', '診断・診察', '神経生理・科学'];
const focusClass = 'focus-visible:outline-2 focus-visible:outline-offset-4';

export default function GlossaryIndex({ terms }: { terms: GlossaryTerm[] }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const filtered = terms.filter(term => (category === 'all' || term.category === category) && matchesSearchText(query, [term.term, term.reading, term.oneLiner, term.summary]));

  useEffect(() => {
    let frame = 0;
    const revealAnchor = () => {
      let id: string;
      try { id = decodeURIComponent(window.location.hash.slice(1)); } catch { return; }
      if (!terms.some(term => id === `term-${term.term}`)) return;
      setQuery('');
      setCategory('all');
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView());
    };
    window.addEventListener('hashchange', revealAnchor);
    return () => { window.removeEventListener('hashchange', revealAnchor); window.cancelAnimationFrame(frame); };
  }, [terms]);

  return <div className="space-y-6">
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
      <div className="flex-1 space-y-1"><label htmlFor="glossary-query" className="block text-sm font-semibold">用語・読み方で検索</label><div className="relative"><Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#59615D] dark:text-[#A0B0BC]" /><input id="glossary-query" type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="例：気虚・ききょ" className={`min-h-11 w-full rounded-xl border border-[#D9E3DD] bg-white pl-11 pr-3 text-base dark:border-[#2A3B4A] dark:bg-[#17212A] ${focusClass}`} /></div></div>
      <div className="space-y-1"><label htmlFor="glossary-category" className="block text-sm font-semibold">分野</label><select id="glossary-category" value={category} onChange={event => setCategory(event.target.value)} className={`min-h-11 w-full rounded-xl border border-[#D9E3DD] bg-white px-3 text-base dark:border-[#2A3B4A] dark:bg-[#17212A] ${focusClass}`}><option value="all">すべての分野</option>{categories.map(item => <option key={item} value={item}>{item}</option>)}</select></div>
    </div>
    <div className="flex flex-wrap items-center gap-x-5"><p role="status" className="text-sm ui-muted">{filtered.length}語／全{terms.length}語</p>{(query || category !== 'all') && <button type="button" onClick={() => { setQuery(''); setCategory('all'); }} className={`inline-flex min-h-11 items-center text-sm font-semibold underline ${focusClass}`}>条件を解除</button>}</div>
    {filtered.length === 0 && <p className="rounded-xl bg-[#F6F4EE] p-5 leading-relaxed dark:bg-[#1E2B36]">該当する用語がありません。読み方で検索するか、分野を「すべて」に戻してください。</p>}
    {categories.map(group => {
      const groupTerms = filtered.filter(term => term.category === group);
      return groupTerms.length > 0 && <section key={group} aria-label={group} className="space-y-3">
        <h2 className="font-serif text-xl font-bold">{group}</h2>
        <div className="grid items-start gap-3 md:grid-cols-2">{groupTerms.map(term => <section key={term.term} id={`term-${term.term}`} className="glossary-entry scroll-mt-28 space-y-2 rounded-2xl border border-[#D9E3DD] bg-[#FCFAF6] p-5 dark:border-[#2A3B4A] dark:bg-[#17212A] target:bg-[#EBF3EF] target:ring-2 target:ring-[#74BA9E] dark:target:bg-[#182823]">
          <h3 className="text-lg font-bold">{term.term}<span className="ml-2 text-sm font-normal">（{term.reading}）</span></h3>
          <p className="text-base leading-[1.75]">{term.oneLiner}</p>
          <details>
            <summary className={`min-h-11 cursor-pointer py-2 text-sm font-semibold text-[#184F49] dark:text-[#9CCBBC] ${focusClass}`}><BookOpen aria-hidden="true" className="mr-2 inline h-4 w-4" />詳しい説明と解釈の注意</summary>
            <div className="space-y-2 pb-2"><p className="whitespace-pre-line text-base leading-[1.75]">{term.summary}</p>{term.relatedLectureId && <Link href={`/curriculum/${term.relatedLectureId}`} className={`inline-flex min-h-11 items-center text-sm font-semibold underline underline-offset-4 ${focusClass}`}>{term.relatedLectureTitle || `${term.term}を扱う講義`} <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" /></Link>}</div>
          </details>
        </section>)}</div>
      </section>;
    })}
  </div>;
}

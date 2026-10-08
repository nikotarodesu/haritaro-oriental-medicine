'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { SymptomGuide } from '@/types/oriental';

type GuidePreview = Pick<SymptomGuide, 'id' | 'title' | 'summary' | 'category'>;

export default function SymptomsIndexClient({ guides }: { guides: GuidePreview[] }) {
  const [selectedCategory, setSelectedCategory] = useState('すべて');
  const [hashTarget, setHashTarget] = useState('');
  const categories = ['すべて', ...new Set(guides.map(guide => guide.category))];
  const visibleGuides = selectedCategory === 'すべて' ? guides : guides.filter(guide => guide.category === selectedCategory);

  useEffect(() => {
    const revealHash = () => {
      const id = window.location.hash.slice(1);
      if (guides.some(guide => guide.id === id)) {
        setSelectedCategory('すべて');
        setHashTarget(id);
      }
    };
    revealHash();
    window.addEventListener('hashchange', revealHash);
    return () => window.removeEventListener('hashchange', revealHash);
  }, [guides]);

  useEffect(() => {
    if (selectedCategory === 'すべて' && hashTarget) document.getElementById(hashTarget)?.scrollIntoView();
  }, [hashTarget, selectedCategory]);

  return (
    <section className="space-y-5" aria-label="症状別ガイドの一覧">
      <div role="group" className="flex flex-wrap gap-2" aria-label="部位・分野で絞り込む">
        {categories.map(category => <button key={category} type="button" aria-pressed={selectedCategory === category} onClick={() => { setHashTarget(''); setSelectedCategory(category); }} className={`min-h-11 rounded-xl border px-4 py-2 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3D34] dark:focus-visible:outline-[#9CCDB8] ${selectedCategory === category ? 'border-[#1E3D34] bg-[#1E3D34] text-white dark:border-[#9CCDB8] dark:bg-[#9CCDB8] dark:text-[#11291F]' : 'border-[#D6DED7] bg-white text-[#404743] dark:border-[#34483C] dark:bg-[#17212A] dark:text-[#D1DED8]'}`}>{category}</button>)}
      </div>
      <p role="status" aria-live="polite" className="text-sm text-[#59615D] dark:text-[#AFBDC8]">{selectedCategory}：{visibleGuides.length}件のガイド</p>
      <div className="grid gap-4 md:grid-cols-2">
        {visibleGuides.map(guide => (
          <article key={guide.id} id={guide.id} className="scroll-mt-28 space-y-3 rounded-2xl border border-[#D6DED7] bg-white p-5 dark:border-[#34483C] dark:bg-[#17212A]">
            <p className="text-sm font-semibold text-[#59615D] dark:text-[#AFBDC8]">{guide.category}</p>
            <h2 className="font-serif text-xl font-bold leading-snug"><Link href={`/symptoms/${guide.id}`} className="underline decoration-[#9CAF9F] underline-offset-4">{guide.title}</Link></h2>
            <p className="text-base leading-relaxed text-[#404743] dark:text-[#D1DED8]">{guide.summary}</p>
            <Link href={`/symptoms/${guide.id}`} aria-label={`${guide.title}の受診の目安・日常の工夫・関連経穴を読む`} className="inline-flex min-h-11 items-center font-semibold text-[#1E3D34] underline underline-offset-4 dark:text-[#9CCDB8]">受診の目安・日常の工夫・関連経穴を読む →</Link>
          </article>
        ))}
      </div>
    </section>
  );
}

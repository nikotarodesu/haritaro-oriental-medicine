'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { SymptomGuide } from '@/types/oriental';
import SymptomIcon from './SymptomIcon';

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
    <section id="symptom-guides" className="atlas-target atlas-guide-list" aria-label="症状別ガイドの一覧">
      <div className="symptoms-filter-bar">
        <div role="group" className="atlas-filter-list" aria-label="部位・分野で絞り込む">
          {categories.map(category => <button key={category} type="button" aria-pressed={selectedCategory === category} onClick={() => { setHashTarget(''); setSelectedCategory(category); }}>{category}</button>)}
        </div>
        <p role="status" aria-live="polite" className="atlas-muted atlas-guide-count">{visibleGuides.length}件のガイド</p>
      </div>
      <div className="atlas-guide-grid">
        {visibleGuides.map(guide => (
          <article key={guide.id} id={guide.id} className="atlas-target">
            <Link href={`/symptoms/${guide.id}`} aria-label={`${guide.title}のガイドを読む`} className="atlas-guide-card">
              <div className="atlas-guide-card-heading">
                <span className="atlas-guide-icon"><SymptomIcon id={guide.id} className="h-7 w-7" /></span>
                <div>
                  <p className="atlas-guide-category">{guide.category}</p>
                  <h2>{guide.title}</h2>
                </div>
                <ArrowRight className="symptoms-card-arrow" size={18} aria-hidden="true" />
              </div>
              <p className="atlas-guide-summary">{guide.summary}</p>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

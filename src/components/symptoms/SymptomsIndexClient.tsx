'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Search, X } from 'lucide-react';
import { symptomLookupTerms } from '@/data/symptomLookupTerms';
import type { SymptomGuide } from '@/types/oriental';
import { normalizeSearchText, prepareSearchQuery } from '@/utils/search';
import SymptomIcon from './SymptomIcon';

type GuidePreview = Pick<SymptomGuide, 'id' | 'title' | 'summary' | 'category'>;
const allCategories = 'すべて';
const historyKey = 'haritaroSymptomFilters';

function categoryLabel(category: string) {
  return category === '女性特有' ? '月経・更年期' : category;
}

export default function SymptomsIndexClient({ guides }: { guides: GuidePreview[] }) {
  const [selectedCategory, setSelectedCategory] = useState(allCategories);
  const [hashTarget, setHashTarget] = useState('');
  const [query, setQuery] = useState('');
  const searchInput = useRef<HTMLInputElement>(null);
  const categories = [allCategories, ...new Set(guides.map(guide => guide.category))];
  const searchIndex = useMemo(() => guides.map(guide => ({
    guide,
    text: normalizeSearchText([guide.title, guide.summary, categoryLabel(guide.category), ...(symptomLookupTerms[guide.id] ?? [])].join(' ')),
  })), [guides]);
  const { tokens } = prepareSearchQuery(query);
  const visibleGuides = searchIndex.filter(({ guide, text }) => (
    (selectedCategory === allCategories || guide.category === selectedCategory) && tokens.every(token => text.includes(token))
  )).map(({ guide }) => guide);

  useEffect(() => {
    const restore = () => {
      const id = window.location.hash.slice(1);
      if (guides.some(guide => guide.id === id)) {
        setSelectedCategory(allCategories);
        setQuery('');
        setHashTarget(id);
      } else {
        const previous = window.history.state?.[historyKey];
        setHashTarget('');
        setSelectedCategory(guides.some(guide => guide.category === previous?.category) ? previous.category : allCategories);
        setQuery(typeof previous?.query === 'string' ? previous.query.slice(0, 100) : '');
      }
    };
    restore();
    window.addEventListener('hashchange', restore);
    window.addEventListener('popstate', restore);
    return () => {
      window.removeEventListener('hashchange', restore);
      window.removeEventListener('popstate', restore);
    };
  }, [guides]);

  useEffect(() => {
    if (hashTarget) document.getElementById(hashTarget)?.scrollIntoView();
  }, [hashTarget]);

  const updateFilters = (nextQuery: string, category: string) => {
    setHashTarget('');
    setQuery(nextQuery);
    setSelectedCategory(category);
    try {
      window.history.replaceState({ ...window.history.state, [historyKey]: { query: nextQuery, category } }, '', window.location.pathname + window.location.search);
    } catch { /* Filtering remains available with restricted history. */ }
  };

  const clearFilters = (category = allCategories) => {
    updateFilters('', category);
    searchInput.current?.focus();
  };

  return (
    <section id="symptom-guides" className="atlas-target atlas-guide-list" aria-label="症状別ガイドの一覧">
      <div role="search" aria-label="症状別ガイド内の検索" className="symptoms-search">
        <label htmlFor="symptom-guide-search">気になる症状で探す</label>
        <div className="symptoms-search-field">
          <Search size={18} aria-hidden="true" />
          <input ref={searchInput} id="symptom-guide-search" type="search" inputMode="search" autoComplete="off" placeholder="例：頭が痛い、眠れない、ひざが痛い" maxLength={100} aria-controls="symptom-guide-results" value={query} onChange={event => updateFilters(event.target.value, selectedCategory)} />
          {query && <button type="button" aria-label="検索語を消す" onClick={() => clearFilters(selectedCategory)}><X size={18} aria-hidden="true" /></button>}
        </div>
      </div>
      <div className="symptoms-filter-bar">
        <div role="group" className="atlas-filter-list" aria-label="部位・分野で絞り込む">
          {categories.map(category => <button key={category} type="button" aria-pressed={selectedCategory === category} onClick={() => updateFilters(query, category)}>{categoryLabel(category)}</button>)}
        </div>
        <p role="status" aria-live="polite" className="atlas-muted atlas-guide-count">{visibleGuides.length}件のガイド</p>
      </div>
      <div id="symptom-guide-results" className="atlas-guide-grid">
        {visibleGuides.map(guide => (
          <article key={guide.id} id={guide.id} className="atlas-target">
            <Link href={`/symptoms/${guide.id}`} aria-label={`${guide.title}：ガイドを読む`} className="atlas-guide-card">
              <div className="atlas-guide-card-heading">
                <span className="atlas-guide-icon"><SymptomIcon id={guide.id} className="h-7 w-7" /></span>
                <div>
                  <p className="atlas-guide-category">{categoryLabel(guide.category)}</p>
                  <h2>{guide.title}</h2>
                </div>
                <ArrowRight className="symptoms-card-arrow" size={18} aria-hidden="true" />
              </div>
              <p className="atlas-guide-summary">{guide.summary}</p>
            </Link>
          </article>
        ))}
      </div>
      {!visibleGuides.length && (
        <div className="symptoms-search-empty">
          <p>一致するガイドが見つかりませんでした。別の言い方で探すか、絞り込みを解除してください。</p>
          <button type="button" className="atlas-text-action" onClick={() => clearFilters()}>条件をクリア</button>
        </div>
      )}
    </section>
  );
}

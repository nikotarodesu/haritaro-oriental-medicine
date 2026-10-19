"use client";

import { useId, useState } from 'react';

export interface ClinicalCandidateOption {
  id: string;
  name: string;
  category: string;
  summary?: string;
  aliases?: readonly string[];
  supportCount?: number;
  unknownCount?: number;
  conflictCount?: number;
  missingCount?: number;
  supportGroups?: readonly string[];
  supportReasons?: readonly string[];
  conflictReasons?: readonly string[];
}

interface ClinicalCandidatePickerProps {
  patterns: readonly ClinicalCandidateOption[];
  selectedIds: readonly string[];
  onChange: (ids: string[]) => void;
  evidenceFiltering?: boolean;
  evidenceBlockedReason?: string;
  onReviewSafety?: () => void;
}

function normalizeSearch(value: string) {
  return value.normalize('NFKC').toLowerCase().replace(/[ァ-ヶ]/g, character => String.fromCharCode(character.charCodeAt(0) - 0x60));
}

export default function ClinicalCandidatePicker({ patterns, selectedIds, onChange, evidenceFiltering = false, evidenceBlockedReason, onReviewSafety }: ClinicalCandidatePickerProps) {
  const searchId = useId();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [evidenceFilter, setEvidenceFilter] = useState<'all' | 'supported' | 'multiple'>('all');
  const activeEvidenceFilter = evidenceFiltering && !evidenceBlockedReason ? evidenceFilter : 'all';
  const supportedCount = patterns.filter(pattern => (pattern.supportCount || 0) > 0).length;
  const multipleCount = patterns.filter(pattern => (pattern.supportCount || 0) > 0 && new Set(pattern.supportGroups).size >= 2).length;
  const resultsId = `${searchId}-results`;
  const categories = [...new Set(patterns.map(pattern => pattern.category))];
  const terms = normalizeSearch(query).trim().split(/\s+/).filter(Boolean);
  const selected = patterns.filter(pattern => selectedIds.includes(pattern.id));
  const filtered = patterns.filter(pattern => {
    if (activeEvidenceFilter !== 'all' && !(pattern.supportCount && pattern.supportCount > 0)) return false;
    if (activeEvidenceFilter === 'multiple' && new Set(pattern.supportGroups).size < 2) return false;
    if (category && pattern.category !== category) return false;
    const searchText = normalizeSearch([pattern.name, pattern.category, ...(pattern.aliases || [])].join(' '));
    return terms.every(term => searchText.includes(term));
  });
  const visible = expanded ? filtered : filtered.slice(0, 6);
  const changeQuery = (value: string) => { setQuery(value); setExpanded(false); };
  const changeCategory = (value: string) => { setCategory(value); setExpanded(false); };
  const resetFilters = () => { setQuery(''); setCategory(''); setEvidenceFilter('all'); setExpanded(false); };
  const changeEvidence = (value: 'all' | 'supported' | 'multiple') => { setEvidenceFilter(value); setExpanded(false); };
  const toggle = (id: string, checked: boolean) => {
    onChange(checked ? (selectedIds.includes(id) ? [...selectedIds] : [...selectedIds, id]) : selectedIds.filter(selectedId => selectedId !== id));
  };

  return <section className="clinical-catalog" aria-label="比較する候補を選ぶ">
    <div className="clinical-catalog-selection">
      <div className="clinical-catalog-selection-heading">
        <p>選択中 <span>{selected.length}件</span></p>
        {selected.length > 0 && <button type="button" onClick={() => onChange([])} className="clinical-catalog-text-button">選択をすべて外す</button>}
      </div>
      {selected.length > 0 ? <ul className="clinical-catalog-selected-list">{selected.map(pattern => <li key={pattern.id}>
        <button type="button" onClick={() => toggle(pattern.id, false)} aria-label={`${pattern.name}を候補から外す`}>
          <span>{pattern.name}</span><span aria-hidden="true">×</span>
        </button>
      </li>)}</ul> : <p className="clinical-catalog-hint">比較したい候補を複数選べます。選択後も追加・変更できます。</p>}
    </div>
    {evidenceFiltering && <div className="clinical-catalog-evidence">
      <p className="clinical-catalog-evidence-title">四診所見から候補を絞る</p>
      <p className="clinical-catalog-hint">入力した支持所見で表示を絞れます。件数や表示順は診断の確率・順位を示しません。合いにくい所見のある候補も表示します。</p>
      {evidenceBlockedReason ? <div className="clinical-catalog-safety"><p>{evidenceBlockedReason}</p>{onReviewSafety && <button type="button" className="clinical-catalog-text-button" onClick={onReviewSafety}>主訴・安全確認へ戻る</button>}</div> : <p className="clinical-catalog-evidence-coverage">支持所見あり {supportedCount} / {patterns.length}候補 · 複数の四診で支持 {multipleCount}候補</p>}
      <div className="clinical-catalog-evidence-filters" role="group" aria-label="四診の支持所見で候補を絞り込む">
        <button type="button" aria-pressed={activeEvidenceFilter === 'all'} onClick={resetFilters}>全候補を表示</button>
        <button type="button" disabled={Boolean(evidenceBlockedReason)} aria-pressed={activeEvidenceFilter === 'supported'} onClick={() => changeEvidence('supported')}>支持所見あり（{supportedCount}件）</button>
        <button type="button" disabled={Boolean(evidenceBlockedReason)} aria-pressed={activeEvidenceFilter === 'multiple'} onClick={() => changeEvidence('multiple')}>複数の四診で支持（{multipleCount}件）</button>
      </div>
      {activeEvidenceFilter === 'multiple' && <p className="clinical-catalog-hint">問診・望診・聞診・切診のうち2つ以上で支持所見がある候補です。同じ舌診の複数項目は1つの四診として数えます。</p>}
      {!evidenceBlockedReason && supportedCount === 0 && <p className="clinical-catalog-hint">現在の入力では支持所見と結びつく候補がありません。未確認の四診所見を追加するか、全候補から選んで比較できます。</p>}
      {selected.length > 0 && activeEvidenceFilter !== 'all' && <p className="clinical-catalog-hint">絞り込みの対象外になった選択中の候補も、上の選択欄と比較欄に保持します。</p>}
    </div>}
    <div className="clinical-catalog-search">
      <label htmlFor={searchId}>候補名で探す</label>
      <div className="clinical-catalog-search-field">
        <input id={searchId} type="search" value={query} onChange={event => changeQuery(event.target.value)} placeholder="例：気虚、肝、きたい" autoComplete="off" />
        {query && <button type="button" onClick={() => changeQuery('')} aria-label="候補名の検索を消去">消去</button>}
      </div>
    </div>
    <div className="clinical-catalog-filters" role="group" aria-label="候補の分類で絞り込む">
      <button type="button" aria-pressed={category === ''} onClick={() => changeCategory('')}>すべて</button>
      {categories.map(item => <button key={item} type="button" aria-pressed={category === item} onClick={() => changeCategory(item)}>{item}</button>)}
    </div>
    <p className="clinical-catalog-results" role="status" aria-live="polite" aria-atomic="true">{activeEvidenceFilter === 'supported' ? '支持所見あり · ' : activeEvidenceFilter === 'multiple' ? '複数の四診で支持 · ' : ''}該当{filtered.length}件のうち {visible.length}件を表示</p>
    {filtered.length > 0 ? <fieldset id={resultsId} className="clinical-catalog-options">
      <legend className="sr-only">比較する候補（複数選択できます）</legend>
      {visible.map(pattern => {
        const counts = [
          pattern.supportCount !== undefined ? `支持 ${pattern.supportCount}件` : '',
          pattern.unknownCount !== undefined ? `未確認 ${pattern.unknownCount}件` : '',
          pattern.conflictCount !== undefined ? `合いにくい ${pattern.conflictCount}件` : '',
        ].filter(Boolean);
        return <label key={pattern.id} className="clinical-catalog-option" data-selected={selectedIds.includes(pattern.id)}>
          <input type="checkbox" checked={selectedIds.includes(pattern.id)} onChange={event => toggle(pattern.id, event.target.checked)} />
          <span className="clinical-catalog-option-content"><strong>{pattern.name}</strong><span className="clinical-catalog-option-category">{pattern.category}</span>{pattern.summary && <span className="clinical-catalog-option-summary">{pattern.summary}</span>}{counts.length > 0 && <span className="clinical-catalog-option-counts">{counts.join(' · ')}</span>}
            {evidenceFiltering && pattern.supportGroups && pattern.supportGroups.length > 0 && <span className="clinical-catalog-evidence-groups">支持のある四診：{pattern.supportGroups.join('・')}</span>}
            {evidenceFiltering && pattern.supportReasons && pattern.supportReasons.length > 0 && <span className="clinical-catalog-evidence-reasons">支持：{pattern.supportReasons.slice(0, 3).join('、')}{pattern.supportReasons.length > 3 ? ` ほか${pattern.supportReasons.length - 3}件` : ''}</span>}
            {evidenceFiltering && pattern.conflictReasons && pattern.conflictReasons.length > 0 && <span className="clinical-catalog-evidence-conflicts">合いにくい：{pattern.conflictReasons.slice(0, 2).join('、')}{pattern.conflictReasons.length > 2 ? ` ほか${pattern.conflictReasons.length - 2}件` : ''}</span>}
            {evidenceFiltering && Boolean(pattern.missingCount) && <span className="clinical-catalog-option-counts">支持所見：確認してなし {pattern.missingCount}件</span>}
          </span>
        </label>;
      })}
    </fieldset> : <div className="clinical-catalog-empty"><p>該当する候補がありません。別の語句や分類で探してください。</p><button type="button" onClick={resetFilters} className="clinical-catalog-text-button">絞り込みを解除</button></div>}
    {filtered.length > 6 && <button type="button" className="clinical-catalog-expand" aria-expanded={expanded} aria-controls={resultsId} onClick={() => setExpanded(!expanded)}>{expanded ? '表示を少なくする' : `ほかの候補を表示（残り${filtered.length - visible.length}件）`}</button>}
  </section>;
}

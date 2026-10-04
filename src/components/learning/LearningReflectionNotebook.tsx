'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Check, Edit3, Plus, Trash2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLearningSync } from '@/contexts/LearningSyncContext';
import LearningSyncStatus from '@/components/learning/LearningSyncStatus';
import { PROGRESSIVE_CASES } from '@/data/progressiveCases';
import { CASE_REASONING_RUBRICS } from '@/data/caseReasoningRubrics';
import { readCaseLearningRecords } from '@/utils/learningFocus';
import {
  createLearningReflection, createLearningReflectionDraft, getReflectionComparisons, getReflectionRemovalKeys,
  LEARNING_REFLECTION_SOURCES, readLearningReflections, readLearningReflectionDraft, readLearningReflectionDrafts,
  reflectionDeletionKey, reflectionDraftKey, reflectionEditingBaseline, reflectionHistoryKey,
  reflectionKey, REFLECTION_LIMITS, resolveLearningReflectionSource, resolveReflectionDraftBaseline, sameLearningReflection,
} from '@/utils/learningReflection';
import type { LearningReflectionDraft, LearningReflectionFields, LearningReflectionNote, LearningReflectionSource, ReflectionEditingBaseline } from '@/utils/learningReflection';

const FIELD_LABELS = [
  { key: 'keyPoints', label: '学んだ要点', hint: '自分の言葉で、覚えておきたいことをひとつ。' },
  { key: 'uncertainty', label: '迷ったこと・まだ分からないこと', hint: '似ている考え方の違いや、説明できなかったところ。' },
  { key: 'reasoning', label: '自分の判断理由', hint: '何を手がかりに考え、ほかの候補とどう比べたか。' },
  { key: 'nextCheck', label: '次に確認すること', hint: '読み直したい箇所や、次の学習で確かめたいこと。' },
] as const;
const BUTTON = 'min-h-11 inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2D6A55] disabled:opacity-50';
const INPUT = 'w-full min-w-0 rounded-xl border border-[#D8CFC0] bg-white px-3 py-3 text-base text-[#232826] dark:border-[#384C5E] dark:bg-[#162B3A] dark:text-[#FAF8F5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2D6A55]';
const PANEL = 'min-w-0 rounded-2xl border border-[#D8CFC0] bg-white p-4 sm:p-6 dark:border-[#384C5E] dark:bg-[#172B3A]';
const dateLabel = (date: string) => new Date(date).toLocaleString('ja-JP', { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' });

function blankFields(source: LearningReflectionSource | null): LearningReflectionFields {
  return { title: source?.title ?? '学びの振り返り', keyPoints: '', uncertainty: '', nextCheck: '', reasoning: '' };
}

function fieldsOf(note: LearningReflectionFields): LearningReflectionFields {
  return { title: note.title, keyPoints: note.keyPoints, uncertainty: note.uncertainty, nextCheck: note.nextCheck, reasoning: note.reasoning };
}

export default function LearningReflectionNotebook({ initialSource }: { initialSource: LearningReflectionSource | null }) {
  const { user, isLoading } = useAuth();
  const { ready } = useLearningSync();
  if (isLoading || !ready) return <p role="status" className="px-4 py-12 text-center">学習ノートを確認しています…</p>;
  // Recreate all draft state on identity changes; a former account's text never remains on screen.
  return <ReflectionWorkspace key={`${user?.id ?? 'guest'}:${initialSource?.type ?? ''}:${initialSource?.id ?? ''}`} initialSource={initialSource} />;
}

function ReflectionWorkspace({ initialSource }: { initialSource: LearningReflectionSource | null }) {
  const { values, setEntry, status } = useLearningSync();
  const notes = useMemo(() => readLearningReflections(values), [values]);
  const [initial] = useState(() => {
    const draft = readLearningReflectionDraft(values, initialSource ? { type: initialSource.type, id: initialSource.id } : null);
    return { draft, baseline: draft ? resolveReflectionDraftBaseline(values, draft) : { note: null, conflict: false } };
  });
  const [source, setSource] = useState(initialSource);
  const [fields, setFields] = useState(() => initial.draft ? fieldsOf(initial.draft) : blankFields(initialSource));
  const [baseVersion, setBaseVersion] = useState<LearningReflectionNote | null>(initial.baseline.note);
  const [editingBaseline, setEditingBaseline] = useState<ReflectionEditingBaseline | null>(initial.draft?.editing ?? null);
  const [resumeConflict, setResumeConflict] = useState(initial.baseline.conflict);
  const [draftState, setDraftState] = useState<'none' | 'pending' | 'saved'>(initial.draft ? 'saved' : 'none');
  const [message, setMessage] = useState(initial.draft ? '入力中だった下書きを再開しました。' : '');
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [comparisonId, setComparisonId] = useState('');
  const pendingDraft = useRef<{ key: string; value: LearningReflectionDraft } | null>(null);
  const draftTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sourceRef = source ? { type: source.type, id: source.id } : null;
  const dirty = resumeConflict || JSON.stringify(fields) !== JSON.stringify(baseVersion ? fieldsOf(baseVersion) : blankFields(source))
    || (baseVersion !== null && (baseVersion.source?.type !== sourceRef?.type || baseVersion.source?.id !== sourceRef?.id));
  const hasText = FIELD_LABELS.some(({ key }) => fields[key].trim());
  const comparisons = useMemo(() => getReflectionComparisons(values, source ? { type: source.type, id: source.id } : null, baseVersion ?? undefined), [values, source, baseVersion]);
  const previous = comparisons.find(note => `${note.id}:${note.updatedAt}` === comparisonId) ?? comparisons[0];
  const query = search.trim().toLocaleLowerCase('ja');
  const filteredNotes = useMemo(() => notes.filter(note => !query || [note.title, note.keyPoints, note.uncertainty, note.nextCheck, note.reasoning]
    .some(text => text.toLocaleLowerCase('ja').includes(query))), [notes, query]);
  const drafts = useMemo(() => readLearningReflectionDrafts(values), [values]);
  const otherDrafts = drafts.filter(draft => reflectionDraftKey(draft.source) !== reflectionDraftKey(sourceRef) || draftState === 'none');

  const flushDraft = useCallback(() => {
    const pending = pendingDraft.current;
    if (!pending) return;
    setEntry(pending.key, pending.value);
    pendingDraft.current = null;
  }, [setEntry]);

  useEffect(() => {
    const onHidden = () => { if (document.visibilityState === 'hidden') flushDraft(); };
    window.addEventListener('pagehide', flushDraft);
    document.addEventListener('visibilitychange', onHidden);
    return () => {
      if (draftTimer.current) clearTimeout(draftTimer.current);
      flushDraft();
      window.removeEventListener('pagehide', flushDraft);
      document.removeEventListener('visibilitychange', onHidden);
    };
  }, [flushDraft]);

  function clearDraft(nextSource: LearningReflectionSource | null = source) {
    if (draftTimer.current) clearTimeout(draftTimer.current);
    pendingDraft.current = null;
    setEntry(reflectionDraftKey(nextSource ? { type: nextSource.type, id: nextSource.id } : null), null);
    setDraftState('none');
  }

  function queueDraft(nextFields: LearningReflectionFields, nextSource: LearningReflectionSource | null = source,
    baseline: ReflectionEditingBaseline | null = editingBaseline, base: LearningReflectionNote | null = baseVersion) {
    if (draftTimer.current) clearTimeout(draftTimer.current);
    const changed = baseline && !base ? true : JSON.stringify(nextFields) !== JSON.stringify(base ? fieldsOf(base) : blankFields(nextSource))
      || (base !== null && (base.source?.type !== nextSource?.type || base.source?.id !== nextSource?.id));
    if (!changed) { clearDraft(nextSource); return; }
    try {
      pendingDraft.current = { key: reflectionDraftKey(nextSource ? { type: nextSource.type, id: nextSource.id } : null),
        value: createLearningReflectionDraft(nextFields, nextSource, new Date().toISOString(), baseline) };
      setDraftState('pending');
      draftTimer.current = setTimeout(() => { flushDraft(); setDraftState('saved'); }, 350);
    } catch (failure) {
      pendingDraft.current = null;
      setError(failure instanceof Error ? failure.message : '下書きを保存できませんでした。');
    }
  }

  function updateField(key: keyof LearningReflectionFields, value: string) {
    const next = { ...fields, [key]: value };
    setFields(next); setMessage(''); queueDraft(next);
  }

  useEffect(() => {
    if (!dirty) return;
    const beforeUnload = (event: BeforeUnloadEvent) => { flushDraft(); event.preventDefault(); event.returnValue = ''; };
    const beforeNavigate = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      const anchor = event.target instanceof Element ? event.target.closest('a[href]') : null;
      if (!(anchor instanceof HTMLAnchorElement) || anchor.target === '_blank' || anchor.hasAttribute('download')) return;
      if (!window.confirm('入力中の内容をノートとして保存していません。この画面を離れますか？')) { event.preventDefault(); event.stopPropagation(); }
    };
    window.addEventListener('beforeunload', beforeUnload);
    document.addEventListener('click', beforeNavigate, true);
    return () => { window.removeEventListener('beforeunload', beforeUnload); document.removeEventListener('click', beforeNavigate, true); };
  }, [dirty, flushDraft]);

  function canDiscard() { return !dirty || window.confirm('入力中の内容をノートとして保存していません。別のノートを開きますか？'); }

  function startNew(nextSource: LearningReflectionSource | null = source) {
    if (!canDiscard()) return;
    clearDraft(); if (nextSource?.id !== source?.id || nextSource?.type !== source?.type) clearDraft(nextSource);
    setSource(nextSource); setFields(blankFields(nextSource)); setBaseVersion(null);
    setEditingBaseline(null); setResumeConflict(false);
    setComparisonId(''); setError(''); setMessage('新しい振り返りを入力できます。');
  }

  function edit(note: LearningReflectionNote) {
    if (!canDiscard()) return;
    clearDraft();
    const nextSource = note.source ? resolveLearningReflectionSource(note.source.type, note.source.id) : null;
    clearDraft(nextSource); setSource(nextSource);
    setFields(fieldsOf(note)); setBaseVersion(note); setComparisonId(''); setError(''); setMessage('保存済みのノートを開きました。');
    setEditingBaseline(reflectionEditingBaseline(note)); setResumeConflict(false);
    document.getElementById('reflection-editor')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
  }

  function save() {
    setError(''); setMessage('');
    if (resumeConflict) { setError('元のノートが更新または削除されています。入力した下書きは、新しいノートとして残せます。'); return; }
    const current = baseVersion ? notes.find(note => note.id === baseVersion.id) : undefined;
    if (baseVersion && !sameLearningReflection(current, baseVersion)) {
      setError('別の画面で更新または削除された記録が同期されました。保存済みのノートを開き直してから編集してください。');
      return;
    }
    try {
      const note = createLearningReflection(fields, source, baseVersion?.id ?? crypto.randomUUID(), new Date().toISOString(), current);
      if (current) setEntry(reflectionHistoryKey(current.id, crypto.randomUUID()), current);
      setEntry(reflectionKey(note.id), note);
      clearDraft();
      setBaseVersion(note); setFields(fieldsOf(note)); setComparisonId('');
      setEditingBaseline(reflectionEditingBaseline(note));
      setMessage(status === 'memory' ? 'この画面内に記録しました。端末への保存状態も確認してください。' : '振り返りを記録しました。保存・同期の状態は下の表示で確認できます。');
    } catch (failure) { setError(failure instanceof Error ? failure.message : '記録を保存できませんでした。'); }
  }

  function remove(note: LearningReflectionNote) {
    for (const key of getReflectionRemovalKeys(values, note.id)) setEntry(key, null);
    // A deletion also hides edits/snapshots arriving later from a formerly offline device.
    setEntry(reflectionDeletionKey(note.id), { version: 1, deletedAt: new Date().toISOString() });
    if (baseVersion?.id === note.id || editingBaseline?.id === note.id) { clearDraft(); setBaseVersion(null); setEditingBaseline(null); setResumeConflict(false); setFields(blankFields(source)); setComparisonId(''); }
    setDeleteId(null); setMessage('ノートと、その編集前の記録を削除しました。'); setError('');
  }

  function resumeDraft(draft: LearningReflectionDraft) {
    if (!canDiscard()) return;
    flushDraft();
    const nextSource = draft.source ? resolveLearningReflectionSource(draft.source.type, draft.source.id) : null;
    const result = resolveReflectionDraftBaseline(values, draft);
    setSource(nextSource); setFields(fieldsOf(draft)); setBaseVersion(result.note); setEditingBaseline(draft.editing);
    setResumeConflict(result.conflict); setDraftState('saved'); setComparisonId(''); setError(''); setMessage('下書きを再開しました。');
    document.getElementById('reflection-editor')?.scrollIntoView({ block: 'start' });
  }

  return <div className="mx-auto max-w-5xl space-y-6 px-3 pb-12 pt-6 sm:px-6 text-[#232826] dark:text-[#FAF8F5] [overflow-wrap:anywhere]">
    <header className="space-y-3">
      <p className="text-sm font-bold tracking-wider text-[#2D6A55] dark:text-[#9CCDB8]">読む → 考える → 記録する</p>
      <h1 className="flex items-center gap-3 text-2xl font-bold sm:text-3xl"><BookOpen className="shrink-0" aria-hidden="true" />学習ノート</h1>
      <p className="max-w-2xl text-sm leading-7">講義や架空症例で学んだことを、自分の言葉で残しましょう。以前の判断を見返して、次に確認したいことを決められます。</p>
      <p className="max-w-2xl text-sm leading-7 text-[#58635E] dark:text-[#B9C7D0]">入力中の下書きは教材ごとに自動保存します。戻る・進むで移動しても、同じ教材のノートを開くと再開できます。</p>
      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={() => startNew(null)} className={`${BUTTON} border border-[#D8CFC0] dark:border-[#384C5E]`}><Plus size={17} aria-hidden="true" />教材なしで新しく書く</button>
        <Link href="/learn" className={`${BUTTON} underline`}><ArrowLeft size={16} aria-hidden="true" />学ぶ入口へ</Link>
      </div>
    </header>

    {otherDrafts.length > 0 && <section aria-label="入力途中の下書き" className={`${PANEL} space-y-3`}>
      <h2 className="font-bold">入力途中の下書きを再開する</h2>
      <ul className="space-y-3">{otherDrafts.map(draft => <li key={reflectionDraftKey(draft.source)} className="flex flex-wrap items-center justify-between gap-3 text-sm">
        <span className="min-w-0">{draft.title || 'タイトル未入力'}<span className="block text-xs text-[#58635E] dark:text-[#B9C7D0]">{dateLabel(draft.updatedAt)}</span></span>
        <button type="button" onClick={() => resumeDraft(draft)} className={`${BUTTON} border border-[#D8CFC0] dark:border-[#384C5E]`}>下書きを再開</button>
      </li>)}</ul>
    </section>}

    <section id="reflection-editor" aria-labelledby="reflection-editor-title" className={`${PANEL} scroll-mt-24 space-y-5`}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 id="reflection-editor-title" className="text-lg font-bold">{baseVersion || editingBaseline ? 'ノートを編集する' : '今回の振り返り'}</h2>
        {baseVersion && <button type="button" onClick={() => startNew()} className={`${BUTTON} border border-[#D8CFC0] dark:border-[#384C5E]`}><Plus size={16} aria-hidden="true" />同じ教材で新しく書く</button>}
      </div>
      <div className="space-y-2">
        <label htmlFor="reflection-source" className="block text-sm font-bold">教材を選ぶ（任意）</label>
        <select id="reflection-source" className={INPUT} value={source ? `${source.type}:${source.id}` : ''} onChange={event => {
          const [type, id] = event.target.value.split(':');
          const next = resolveLearningReflectionSource(type, id);
          flushDraft();
          const nextFields = { ...fields, title: fields.title === (source?.title ?? '学びの振り返り') ? (next?.title ?? '学びの振り返り') : fields.title };
          setFields(nextFields); queueDraft(nextFields, next);
          setSource(next); setComparisonId(''); setMessage('');
        }}>
          <option value="">教材を指定しない</option>
          {(['case', 'lecture'] as const).map(type => <optgroup key={type} label={type === 'case' ? '架空症例の演習' : '講義'}>
            {LEARNING_REFLECTION_SOURCES.filter(item => item.type === type).map(item => <option key={item.id} value={`${item.type}:${item.id}`}>{item.title}</option>)}
          </optgroup>)}
        </select>
        {source && <Link href={source.href} className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[#2D6A55] underline dark:text-[#9CCDB8]"><ArrowLeft size={16} className="shrink-0" aria-hidden="true" />元の教材に戻る：{source.title}</Link>}
      </div>
      <form onSubmit={event => { event.preventDefault(); save(); }} className="space-y-5">
        <div className="space-y-2">
          <label htmlFor="reflection-title" className="block text-sm font-bold">ノートのタイトル</label>
          <input id="reflection-title" value={fields.title} maxLength={REFLECTION_LIMITS.title} required className={INPUT} onChange={event => updateField('title', event.target.value)} />
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {FIELD_LABELS.map(({ key, label, hint }) => <div key={key} className="min-w-0 space-y-2">
            <label htmlFor={`reflection-${key}`} className="block text-sm font-bold">{label}</label>
            <p id={`reflection-${key}-hint`} className="text-sm leading-6 text-[#58635E] dark:text-[#B9C7D0]">{hint}</p>
            <textarea id={`reflection-${key}`} value={fields[key]} maxLength={REFLECTION_LIMITS[key]} rows={4} aria-describedby={`reflection-${key}-hint reflection-${key}-count`} className={`${INPUT} resize-y leading-7`} onChange={event => updateField(key, event.target.value)} />
            <p id={`reflection-${key}-count`} className="text-right text-xs text-[#58635E] dark:text-[#B9C7D0]">{fields[key].length} / {REFLECTION_LIMITS[key]}文字</p>
          </div>)}
        </div>
        <p className="text-sm leading-6 text-[#58635E] dark:text-[#B9C7D0]">4つの欄をすべて埋める必要はありません。ひとつ書けたら保存できます。編集前の内容も、下の比較で見返せます。</p>
        {draftState !== 'none' && <p role="status" className="text-sm leading-6 text-[#2D6A55] dark:text-[#9CCDB8]">{status === 'memory' ? '下書きはこの画面内で保持しています。端末の保存状態を確認してください。' : draftState === 'pending' ? '下書きを保存しています…' : '下書きを自動保存しました。ノートとして残すには、保存ボタンを押してください。'}</p>}
        {resumeConflict && <div role="alert" className="space-y-2 rounded-xl bg-amber-50 p-3 text-sm leading-6 text-amber-900 dark:bg-amber-950/40 dark:text-amber-200"><p>元のノートが別の画面で更新または削除されています。下書きの文章は保持しています。</p><button type="button" className={`${BUTTON} border border-amber-600 dark:border-amber-300`} onClick={() => { setBaseVersion(null); setEditingBaseline(null); setResumeConflict(false); queueDraft(fields, source, null, null); }}>新しいノートとして残す</button></div>}
        <div className="flex flex-wrap items-center gap-3">
          <button type="submit" disabled={!hasText || !dirty} className={`${BUTTON} bg-[#1E3D34] text-white hover:bg-[#2D6A55] dark:bg-[#9CCDB8] dark:text-[#11291F]`}><Check size={17} aria-hidden="true" />{baseVersion ? '変更を保存する' : '振り返りを保存する'}</button>
          {baseVersion && <span className="text-xs text-[#58635E] dark:text-[#B9C7D0]">記録日時：{dateLabel(baseVersion.updatedAt)}</span>}
        </div>
        {error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm leading-6 text-red-800 dark:bg-red-950/40 dark:text-red-200">{error}</p>}
        <p role="status" aria-live="polite" className="text-sm leading-6 text-[#2D6A55] dark:text-[#9CCDB8]">{message}</p>
      </form>
    </section>

    <LearningSyncStatus returnTo="/notes?tab=learning" />

    {previous && <section aria-labelledby="reflection-compare-title" className={`${PANEL} space-y-4`}>
      <h2 id="reflection-compare-title" className="text-lg font-bold">以前の自分と見比べる</h2>
      <p className="text-sm leading-6">{source ? '同じ教材の以前のノートや、編集前の記録を表示します。' : '教材を指定せず書いた以前のノートや、編集前の記録を表示します。'}考え方が変わったところを探してみましょう。</p>
      <label htmlFor="reflection-comparison" className="block text-sm font-bold">比較する記録</label>
      <select id="reflection-comparison" value={`${previous.id}:${previous.updatedAt}`} className={INPUT} onChange={event => setComparisonId(event.target.value)}>
        {comparisons.map(note => <option key={`${note.id}:${note.updatedAt}`} value={`${note.id}:${note.updatedAt}`}>{dateLabel(note.updatedAt)} · {note.title}</option>)}
      </select>
      <div className="grid gap-4 md:grid-cols-2">
        <ReflectionText title={`以前：${dateLabel(previous.updatedAt)}`} fields={previous} />
        <ReflectionText title="今回：入力中の内容" fields={fields} />
      </div>
    </section>}

    {source?.type === 'case' && <CaseReflectionHistory caseId={source.id} values={values} />}

    <section aria-labelledby="reflection-list-title" className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3"><h2 id="reflection-list-title" className="text-lg font-bold">保存した学習ノート <span className="text-sm font-normal">{notes.length}件</span></h2></div>
      {notes.length > 0 && <div className="space-y-2"><label htmlFor="reflection-search" className="block text-sm font-bold">自分のノートを探す</label><input id="reflection-search" type="search" value={search} onChange={event => setSearch(event.target.value)} placeholder="タイトルや要点で検索" className={INPUT} /></div>}
      {notes.length === 0 ? <div className={`${PANEL} text-sm leading-7`}><p>まだ記録はありません。今日学んだ要点をひとつ残してみましょう。</p><Link href="/curriculum" className="inline-flex min-h-11 items-center font-bold text-[#2D6A55] underline dark:text-[#9CCDB8]">講義を選んで学ぶ</Link></div> : filteredNotes.length === 0 ? <p className="text-sm">条件に合うノートがありません。</p> : <ul className="grid gap-4 md:grid-cols-2">
        {filteredNotes.map(note => {
          const material = note.source ? resolveLearningReflectionSource(note.source.type, note.source.id) : null;
          return <li key={note.id} className={`${PANEL} space-y-3`}>
            <p className="text-xs text-[#58635E] dark:text-[#B9C7D0]">{dateLabel(note.updatedAt)}{baseVersion?.id === note.id ? ' · 編集中' : ''}</p>
            <h3 className="font-bold leading-7">{note.title}</h3>
            <p className="line-clamp-3 whitespace-pre-wrap text-sm leading-7">{note.keyPoints || note.reasoning || note.uncertainty || note.nextCheck}</p>
            {material && <Link href={material.href} className="inline-flex min-h-11 items-center text-sm text-[#2D6A55] underline dark:text-[#9CCDB8]">教材を読み直す：{material.title}</Link>}
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={() => edit(note)} aria-label={`${note.title}を開いて編集する`} className={`${BUTTON} border border-[#D8CFC0] dark:border-[#384C5E]`}><Edit3 size={16} aria-hidden="true" />開く・編集する</button>
              <button type="button" onClick={() => setDeleteId(note.id)} aria-label={`${note.title}を削除する`} className={`${BUTTON} text-[#8E3C36] dark:text-[#F3ACA3]`}><Trash2 size={16} aria-hidden="true" />削除</button>
            </div>
            {deleteId === note.id && <div className="space-y-3 rounded-xl bg-[#FAF8F5] p-3 text-sm dark:bg-[#102433]">
              <p>このノートと編集前の記録を削除します。</p>
              <div className="flex flex-wrap gap-2"><button type="button" onClick={() => remove(note)} className={`${BUTTON} bg-[#8E3C36] text-white`}>削除する</button><button type="button" onClick={() => setDeleteId(null)} className={`${BUTTON} border border-[#D8CFC0] dark:border-[#384C5E]`}>キャンセル</button></div>
            </div>}
          </li>;
        })}
      </ul>}
    </section>
  </div>;
}

function ReflectionText({ title, fields }: { title: string; fields: LearningReflectionFields }) {
  return <div className="min-w-0 space-y-4 rounded-xl bg-[#F6F3EC] p-4 dark:bg-[#102433]">
    <h3 className="text-sm font-bold">{title}</h3>
    <dl className="space-y-4">{FIELD_LABELS.map(({ key, label }) => <div key={key}><dt className="mb-1 text-sm font-bold">{label}</dt><dd className="whitespace-pre-wrap text-sm leading-7">{fields[key] || '記載なし'}</dd></div>)}</dl>
  </div>;
}

function CaseReflectionHistory({ caseId, values }: { caseId: string; values: Record<string, unknown> }) {
  const records = useMemo(() => readCaseLearningRecords(values, caseId), [values, caseId]);
  const [selectedIndex, setSelectedIndex] = useState('');
  const material = PROGRESSIVE_CASES.find(item => item.id === caseId);
  const recordIndex = selectedIndex !== '' && records[Number(selectedIndex)] ? Number(selectedIndex) : records.length - 1;
  const record = records[recordIndex];
  if (!material || !record) return null;
  return <details className={`${PANEL} space-y-4`}>
    <summary className="min-h-11 cursor-pointer text-sm font-bold leading-7">症例演習での自分の判断を見返す（{records.length}回）</summary>
    <div className="mt-4 space-y-4">
      <p className="text-sm leading-6">この教材の現在の内容に対応する、保存済みの演習記録です。選んだ候補と理由を振り返り、今回のノートに自分の考えを書けます。</p>
      <label htmlFor="reflection-case-record" className="block text-sm font-bold">演習した日時</label>
      <select id="reflection-case-record" value={recordIndex} onChange={event => setSelectedIndex(event.target.value)} className={INPUT}>
        {records.map((item, index) => <option key={`${item.answeredAt}:${index}`} value={index}>{dateLabel(item.answeredAt)}</option>).reverse()}
      </select>
      <ol className="space-y-4">{material.steps.map((step, index) => <li key={step.domain} className="rounded-xl bg-[#F6F3EC] p-4 text-sm leading-7 dark:bg-[#102433]">
        <h3 className="mb-2 font-bold">{index + 1}. {step.domain}</h3>
        <p>{step.question}</p>
        <dl className="mt-3 space-y-2"><div><dt className="font-bold">選んだ候補</dt><dd>{step.options[record.answers[index]]?.text}</dd></div><div><dt className="font-bold">選んだ理由</dt><dd><ul className="list-disc space-y-1 pl-5">{record.reasonAnswers[index].map(id => <li key={id}>{CASE_REASONING_RUBRICS[caseId][index].find(reason => reason.id === id)?.text}</li>)}</ul></dd></div></dl>
      </li>)}</ol>
      <Link href={`/simulator?case=${caseId}#case-training`} className={`${BUTTON} border border-[#D8CFC0] dark:border-[#384C5E]`}>この症例をもう一度考える</Link>
    </div>
  </details>;
}

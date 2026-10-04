'use client';

import { Suspense, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowRight, BookOpen, RotateCcw } from 'lucide-react';
import { useLearningSync } from '@/contexts/LearningSyncContext';
import { LEARNING_FOCUS, getLearningFocus, learningFocusLectureHref } from '@/data/learningFocus';
import { LEARNING_QUESTION_MAP, type LearningQuestion } from '@/data/learningQuestionBank';
import { getCaseLearningNeeds } from '@/utils/learningFocus';
import { trackEvent } from '@/utils/analytics';

const focusStyle = 'focus-visible:outline-2 focus-visible:outline-offset-4';

function FocusContent({ onStart }: { onStart: (questions: LearningQuestion[]) => void }) {
  const { values, ready } = useLearningSync();
  const query = useSearchParams();
  const requested = query.get('focus') || '';
  const needs = useMemo(() => ready ? getCaseLearningNeeds(values) : [], [ready, values]);
  const [selection, setSelection] = useState<{ query: string; id: string } | null>(null);
  const selected = selection?.query === requested ? selection.id : getLearningFocus(requested)?.id || needs[0]?.focusId || LEARNING_FOCUS[0].id;
  const focus = getLearningFocus(selected)!;
  const selectedNeeds = needs.filter(need => need.focusId === selected);
  const questions = focus.questionIds.map(id => LEARNING_QUESTION_MAP.get(id)).filter((question): question is LearningQuestion => !!question);

  useEffect(() => {
    if (!ready || !getLearningFocus(requested)) return;
    const timer = setTimeout(() => {
      const target = document.getElementById('learning-focus-review');
      target?.scrollIntoView({ block: 'start', behavior: 'instant' });
      target?.focus({ preventScroll: true });
    }, 80);
    return () => clearTimeout(timer);
  }, [requested, ready]);

  return <section id="learning-focus-review" tabIndex={-1} aria-labelledby="learning-focus-heading" className="scroll-mt-28 rounded-2xl border border-[#C5DED4] bg-white p-4 outline-none sm:p-6 dark:border-[#2A5243] dark:bg-[#17212A]">
    <p className="text-sm font-semibold text-[#184F49] dark:text-[#9CCBBC]">症例から、次の学びへ</p>
    <h3 id="learning-focus-heading" className="mt-2 font-serif text-xl font-bold">判断の理由を、もう一度確かめる</h3>
    <p className="mt-3 text-sm leading-relaxed text-[#59615D] dark:text-[#B7C5CF]">症例演習で選んだ理由と不足した理由から、読み直す観点を示します。性格や臨床能力の判定ではなく、この教材での振り返りです。</p>
    <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="復習する観点">
      {LEARNING_FOCUS.map(item => <button key={item.id} type="button" aria-pressed={selected === item.id} onClick={() => setSelection({ query: requested, id: item.id })} className={`min-h-11 rounded-xl border px-3 py-2 text-sm font-semibold ${focusStyle} ${selected === item.id ? 'border-[#184F49] bg-[#184F49] text-white dark:border-[#9CCBBC] dark:bg-[#285F54]' : 'border-[#D9E3DD] text-[#184F49] dark:border-[#2A3B4A] dark:text-[#9CCBBC]'}`}>{item.title}{needs.some(need => need.focusId === item.id) && <span className="ml-1 text-xs">・要確認</span>}</button>)}
    </div>
    <div className="mt-4 rounded-xl bg-[#F6F4EE] p-4 dark:bg-[#1E2B36]">
      <h4 className="text-lg font-bold">{focus.title}</h4>
      <p className="mt-2 text-base leading-relaxed">{focus.description}</p>
      <p className="mt-3 rounded-lg bg-white p-3 text-sm font-semibold dark:bg-[#17212A]">考える問い：{focus.check}</p>
      {selectedNeeds.length > 0 ? <ul className="mt-4 space-y-3 text-sm">{selectedNeeds.map(need => <li key={need.caseId} className="border-l-2 border-[#C5DED4] pl-3 dark:border-[#83BEA8]"><strong>{need.caseTitle}</strong><p className="mt-1 leading-relaxed">{need.reason}</p><Link href={`/simulator?case=${need.caseId}#case-training`} className={`mt-1 inline-flex min-h-11 items-center gap-2 font-semibold text-[#184F49] underline underline-offset-4 dark:text-[#9CCBBC] ${focusStyle}`}>元の症例を確かめる<ArrowRight aria-hidden="true" className="h-4 w-4" /></Link></li>)}</ul> : <p className="mt-3 text-sm leading-relaxed text-[#59615D] dark:text-[#B7C5CF]">{ready ? 'この観点で振り返る最新の症例記録はありません。関連する解説と既存問題から練習できます。' : '保存した症例記録を確認しています。'}</p>}
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        <Link href={learningFocusLectureHref(focus)} onClick={() => trackEvent('context_link_click', { placement: 'case_focus_reading', lecture_id: focus.lectureId })} className={`flex min-h-11 items-center gap-2 rounded-xl bg-[#184F49] p-3 font-semibold text-white dark:bg-[#285F54] ${focusStyle}`}><BookOpen aria-hidden="true" className="h-4 w-4 shrink-0" />関連する見出し・図解を読む</Link>
        <button type="button" disabled={!ready || !questions.length} onClick={() => { onStart(questions); setTimeout(() => document.getElementById('learning-review-practice')?.scrollIntoView({ block: 'start', behavior: 'smooth' }), 0); }} className={`flex min-h-11 items-center gap-2 rounded-xl border border-[#184F49] p-3 text-left font-semibold text-[#184F49] disabled:opacity-50 dark:border-[#9CCBBC] dark:text-[#9CCBBC] ${focusStyle}`}><RotateCcw aria-hidden="true" className="h-4 w-4 shrink-0" />関連する既存問題で確認する（{questions.length}問）</button>
      </div>
      <p className="mt-3 text-xs leading-relaxed text-[#59615D] dark:text-[#B7C5CF]">出題は既存教材から選びます。回答済みの問題も含むため、初見問題での能力評価とは区別します。</p>
    </div>
  </section>;
}

export default function LearningFocusReview({ onStart }: { onStart: (questions: LearningQuestion[]) => void }) {
  return <Suspense fallback={<section id="learning-focus-review" className="rounded-2xl bg-white p-4 dark:bg-[#17212A]"><p className="text-sm">症例からの復習を確認しています。</p></section>}><FocusContent onStart={onStart} /></Suspense>;
}

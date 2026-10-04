'use client';
import Link from 'next/link';
import { useMemo } from 'react';
import { ArrowRight, BookOpen, RotateCcw, NotebookPen } from 'lucide-react';
import { useCurriculumProgress } from '@/contexts/CurriculumProgressContext';
import { useLearningSync } from '@/contexts/LearningSyncContext';
import type { ResumeLecture } from '@/types/learningProgressCatalog';
import { localStudyDate } from '@/utils/learningReview';
import { getCaseLearningNeeds, readCaseLearningRecords } from '@/utils/learningFocus';
import { getLearningRecommendation } from '@/utils/learningRecommendation';
import { trackEvent } from '@/utils/analytics';
import { useRecentTools } from '@/components/home/RecentTools';

export default function HomeLearningProgressClient({ lectures }: { lectures: ResumeLecture[] }) {
  const { isMounted, totalCompleted, completedLectures, lastVisitedLectureId, quizResults } = useCurriculumProgress();
  const { values } = useLearningSync();
  const recentTools = useRecentTools();
  const caseNeeds = useMemo(() => getCaseLearningNeeds(values), [values]);
  const caseAttempts = useMemo(() => readCaseLearningRecords(values), [values]);
  const recommendation = getLearningRecommendation({ lectures, completed: completedLectures, lastVisitedLectureId,
    quizResults, caseNeeds, caseAttempts, today: localStudyDate() });
  return (
    <section aria-label="今日の学習と最近のツール" className="rounded-2xl border border-[#C5DED4] dark:border-[#2A5243] bg-[#EBF3EF] dark:bg-[#182823] p-5 sm:p-7 text-[#1E3D34] dark:text-[#83BEA8] space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-serif text-xl font-bold">今日の一歩</h2>
        <span className="text-sm">{isMounted ? totalCompleted + ' / ' + lectures.length + '講義完了' : '学習履歴を確認中'}</span>
      </div>
      <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center">
        <div className="space-y-2">
          <p className="text-lg font-bold text-[#232826] dark:text-[#FAF8F5]">{isMounted ? recommendation.title : 'あなたに合った次の学習を準備しています'}</p>
          <p className="text-base leading-relaxed">{isMounted ? recommendation.reason : '講義・復習・症例の履歴をもとに、おすすめを一つ選びます。'}</p>
        </div>
        {isMounted && <Link href={recommendation.href} onClick={() => trackEvent('context_link_click', { placement: 'learning_start', item_type: recommendation.kind })}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#1E3D34] px-5 py-3 text-base font-bold text-white hover:bg-[#2B6958] focus-visible:outline-2 focus-visible:outline-offset-4">
          {recommendation.action}<ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" />
        </Link>}
      </div>
      <details className="border-t border-[#C5DED4] dark:border-[#2A5243] pt-3">
        <summary className="min-h-11 cursor-pointer py-2 text-sm font-bold focus-visible:outline-2 focus-visible:outline-offset-4">別の目的から選ぶ</summary>
        <nav aria-label="学習の別の入口" className="mt-2 grid gap-2 sm:grid-cols-3">
          {[{ href: '/learn/courses', title: 'コースから学ぶ', Icon: BookOpen }, { href: '/kokushi#learning-review', title: '復習する', Icon: RotateCcw }, { href: '/notes?tab=learning', title: '学びを記録する', Icon: NotebookPen }].map(({ href, title, Icon }) =>
            <Link key={href} href={href} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-[#C5DED4] dark:border-[#2A5243] px-3 py-2 text-sm font-bold hover:bg-white/60 dark:hover:bg-[#17212A] focus-visible:outline-2 focus-visible:outline-offset-4"><Icon aria-hidden="true" className="h-4 w-4" />{title}</Link>)}
        </nav>
        <Link href="/simulator#case-training" className="mt-2 inline-flex min-h-11 items-center text-sm underline focus-visible:outline-2 focus-visible:outline-offset-4">症例で判断と理由を練習する →</Link>
      </details>
      {recentTools.length > 0 && <nav aria-label="最近使ったツール" className="flex flex-wrap items-center gap-2 text-sm"><span>最近使ったツール：</span>{recentTools.map(tool => <Link key={tool.href} href={tool.href} className="inline-flex min-h-11 items-center rounded-lg border border-[#C5DED4] dark:border-[#2A5243] px-3 underline focus-visible:outline-2 focus-visible:outline-offset-4">{tool.title}</Link>)}</nav>}
    </section>
  );
}

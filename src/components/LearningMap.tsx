'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle2, Compass } from 'lucide-react';
import { useCurriculumProgress } from '@/contexts/CurriculumProgressContext';
import type { CurriculumChapterPreview } from '@/types/curriculumIndexCatalog';

interface LearningMapProps {
  chapters: readonly CurriculumChapterPreview[];
  onSelectChapter?: (chapterId: string) => void;
}

export function LearningMap({ chapters, onSelectChapter }: LearningMapProps) {
  const { isMounted, completedLectures } = useCurriculumProgress();
  const lectureIds = chapters.flatMap(chapter => chapter.lectureIds);
  const total = lectureIds.length;
  const completed = isMounted ? lectureIds.filter(id => completedLectures[id]).length : 0;
  const stages = [...new Set(chapters.map(chapter => chapter.stageId))];
  const cardClass = 'flex h-full min-h-11 w-full flex-col rounded-2xl border border-[#D9E3DD] bg-white p-5 text-left hover:border-[#184F49] focus-visible:outline-2 focus-visible:outline-offset-4 dark:border-[#2A3B4A] dark:bg-[#17212A]';
  return (
    <section aria-labelledby="learning-map-heading" className="space-y-6 rounded-2xl border border-[#D9E3DD] bg-[#F6F4EE] p-4 dark:border-[#2A3B4A] dark:bg-[#1E2B36] sm:p-6">
      <div className="space-y-3">
        <h2 id="learning-map-heading" className="flex items-center gap-2 font-serif text-2xl font-bold"><Compass aria-hidden="true" className="h-6 w-6 text-[#184F49] dark:text-[#9CCBBC]" />全{chapters.length}章の学習マップ</h2>
        <p className="text-base leading-relaxed text-[#59615D] dark:text-[#B7C5CF]">概論で見通しを持ち、基本用語と正常な働き、関係モデル、仮説の比較、臨床の基礎へ。各章の短い例で、いま考えることを確かめます。</p>
        <p aria-live="polite" className="text-sm font-semibold">{isMounted ? `${completed} / ${total}講の受講が完了` : '受講進捗を確認中'}</p>
        <progress value={completed} max={total || 1} aria-label="学習マップの受講進捗" className="h-2 w-full accent-[#184F49] dark:accent-[#9CCBBC]" />
      </div>
      {stages.map(stageId => {
        const stageChapters = chapters.filter(chapter => chapter.stageId === stageId);
        return <div key={stageId} className="space-y-4">
          <h3 className="text-lg font-bold">{stageChapters[0].stageTitle}</h3>
          <ol start={stageChapters[0].chapterNumber} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {stageChapters.map(chapter => {
              const count = chapter.lectureIds.length;
              const done = isMounted ? chapter.lectureIds.filter(id => completedLectures[id]).length : 0;
              const content = <>
                <span className="text-sm font-semibold text-[#184F49] dark:text-[#9CCBBC]">第{chapter.chapterNumber}章 · 全{chapter.plannedLessons}講</span>
                <span className="mt-2 font-serif text-xl font-bold">{chapter.shortTitle}</span>
                <span className="mt-3 text-sm font-normal leading-relaxed text-[#59615D] dark:text-[#B7C5CF]">{chapter.lead}</span>
                <span className="mt-3 text-sm font-normal leading-relaxed">目標：{chapter.goal}</span>
                <span className="mt-auto flex items-center justify-between gap-2 pt-4 text-sm text-[#184F49] dark:text-[#9CCBBC]"><span>{isMounted ? `${done} / ${count}講完了` : '進捗を確認中'}</span>{count > 0 && done === count ? <CheckCircle2 aria-label="受講完了" className="h-5 w-5 shrink-0" /> : <ArrowRight aria-hidden="true" className="h-5 w-5 shrink-0" />}</span>
              </>;
              return <li key={chapter.id}>{onSelectChapter ? <button type="button" onClick={() => onSelectChapter(chapter.id)} className={cardClass}>{content}</button> : <Link href={`/curriculum#chapter-${chapter.id}`} className={cardClass}>{content}</Link>}</li>;
            })}
          </ol>
        </div>;
      })}
    </section>
  );
}

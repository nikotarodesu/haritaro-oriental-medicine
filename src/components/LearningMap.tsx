'use client';

import type { CSSProperties } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, Compass } from 'lucide-react';
import ChapterEmblem from '@/components/graphics/ChapterEmblem';
import { useCurriculumProgress } from '@/contexts/CurriculumProgressContext';
import type { CurriculumChapterPreview } from '@/types/curriculumIndexCatalog';

interface LearningMapProps {
  chapters: readonly CurriculumChapterPreview[];
  onSelectChapter?: (chapterId: string) => void;
}

export function LearningMap({ chapters, onSelectChapter }: LearningMapProps) {
  const { isMounted, completedLectures, getNextResumeLectureId } = useCurriculumProgress();
  const lectureIds = chapters.flatMap(chapter => chapter.lectureIds);
  const total = lectureIds.length;
  const completed = isMounted ? lectureIds.filter(id => completedLectures[id]).length : 0;
  const resumeLectureId = isMounted && completed < total ? getNextResumeLectureId(lectureIds) : null;
  const currentChapterId = resumeLectureId
    ? chapters.find(chapter => chapter.lectureIds.includes(resumeLectureId))?.id
    : undefined;
  const stages = [...new Set(chapters.map(chapter => chapter.stageId))];

  return (
    <section aria-labelledby="learning-map-heading" className="learning-map">
      <div className="learning-map__header">
        <h2 id="learning-map-heading"><Compass aria-hidden="true" />全{chapters.length}章の学習マップ</h2>
        <p aria-live="polite" className="learning-map__progress-label">{isMounted ? `${completed} / ${total}講の受講が完了` : '受講進捗を確認中'}</p>
        <progress value={completed} max={total || 1} aria-label="学習マップの受講進捗" className="site-progress learning-map__progress" />
      </div>
      <div className="learning-map__journey">
        {stages.map(stageId => {
          const stageChapters = chapters.filter(chapter => chapter.stageId === stageId);
          return <div key={stageId} className="learning-map__stage">
            <h3>{stageChapters[0].stageTitle}</h3>
            <ol start={stageChapters[0].chapterNumber} className={`learning-map__stops${stageChapters.length === 1 ? ' learning-map__stops--single' : ''}`} style={{ '--map-stops': stageChapters.length } as CSSProperties}>
              {stageChapters.map(chapter => {
                const count = chapter.lectureIds.length;
                const done = isMounted ? chapter.lectureIds.filter(id => completedLectures[id]).length : 0;
                const isComplete = isMounted && count > 0 && done === count;
                const isCurrent = chapter.id === currentChapterId;
                const state = isComplete ? 'complete' : isCurrent ? 'current' : 'upcoming';
                const content = <>
                  <span className="learning-map__mark">
                    <ChapterEmblem seriesId={chapter.seriesId} />
                    {isComplete ? <span className="learning-map__check"><Check aria-hidden="true" /></span> : null}
                  </span>
                  <span className="learning-map__chapter">
                    <span className="learning-map__number">第{chapter.chapterNumber}章</span>
                    <span className="learning-map__title">{chapter.shortTitle}</span>
                    <span className="learning-map__status">{isCurrent ? <strong>現在地</strong> : null}{isComplete ? <strong>受講完了</strong> : <span>{isMounted ? `${done} / ${count}講完了` : '進捗を確認中'}</span>}</span>
                  </span>
                  <ArrowRight aria-hidden="true" className="learning-map__arrow" />
                </>;
                return <li key={chapter.id} data-state={state}>
                  {onSelectChapter
                    ? <button type="button" onClick={() => onSelectChapter(chapter.id)} className="learning-map__stop" aria-current={isCurrent ? 'step' : undefined}>{content}</button>
                    : <Link href={`/curriculum#chapter-${chapter.id}`} className="learning-map__stop" aria-current={isCurrent ? 'step' : undefined}>{content}</Link>}
                </li>;
              })}
            </ol>
          </div>;
        })}
      </div>
    </section>
  );
}

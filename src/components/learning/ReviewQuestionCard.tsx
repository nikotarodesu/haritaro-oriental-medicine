'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import type { LearningQuestion } from '@/data/learningQuestionBank';
import { CURRICULUM_CHAPTERS_META } from '@/data/curriculumOutline';
import { getLearningCourseForSeries } from '@/data/learningCourses';
import { reviewSessionReturnHref, validReviewSessionId } from '@/utils/reviewSession';
import { useCurriculumProgress } from '@/contexts/CurriculumProgressContext';

export default function ReviewQuestionCard({ lectureId, questions }: { lectureId: string; questions: LearningQuestion[] }) {
  const params = useSearchParams();
  const { quizResults, isMounted } = useCurriculumProgress();
  const id = params.get('review');
  const record = id && isMounted ? quizResults[id] : undefined;
  const question = (id ? questions.find(question => question.id === id) : undefined) || (record?.kind === 'acupoint' ? {
    lectureId: record.lectureId, question: record.questionText, explanation: record.explanation, kind: record.kind,
  } : undefined);
  const reviewSession = params.get('reviewSession');
  const chapter = CURRICULUM_CHAPTERS_META.find(item => item.lectureIds.includes(lectureId));
  const course = chapter ? getLearningCourseForSeries(chapter.seriesId) : undefined;
  const isClinicalStage = chapter?.stageId === 'stage-2' || chapter?.stageId === 'stage-3';
  const practiceHref = isClinicalStage ? '/simulator#case-training'
    : course ? `/learn/courses/${course.slug}#course-mini-case-${course.seriesId}` : '/glossary';
  const practiceLabel = isClinicalStage ? '症例で判断を練習' : course ? '短い例で振り返る' : '用語を確認する';
  useEffect(() => {
    if (question?.lectureId === lectureId && window.location.hash === '#review-question-card') {
      document.getElementById('review-question-card')?.scrollIntoView({ behavior: 'instant', block: 'start' });
    }
  }, [id, lectureId, question?.lectureId]);
  if (!question || question.lectureId !== lectureId) return null;
  return (
    <section id="review-question-card" className="scroll-mt-28 rounded-2xl border border-amber-300 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/50 p-4 sm:p-6 space-y-3 text-sm text-[#232826] dark:text-[#FAF8F5]">
      <h2 className="font-bold">この問題の要点を復習</h2>
      <p className="font-semibold whitespace-pre-line">{question.question}</p>
      <p className="leading-relaxed whitespace-pre-line">{question.explanation}</p>
      <div className="flex flex-wrap gap-4 font-semibold">
        {question.kind === 'acupoint'
          ? <Link className="inline-flex min-h-11 items-center underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4" href="/tsubo/practice">経穴演習で確認</Link>
          : <a className="inline-flex min-h-11 items-center underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4" href="#interactive-quiz-container">講義の類題で確認</a>}
        <Link className="inline-flex min-h-11 items-center underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4" href={reviewSessionReturnHref(reviewSession)}>{validReviewSessionId(reviewSession) ? '中断した復習に戻る' : '復習問題に戻る'}</Link>
        <Link className="inline-flex min-h-11 items-center underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4" href={practiceHref}>{practiceLabel}</Link>
      </div>
      <p className="text-sm">以下の講義本文で背景と関連事項を確認できます。</p>
    </section>
  );
}

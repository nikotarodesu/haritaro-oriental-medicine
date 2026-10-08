'use client';

import Link from 'next/link';
import { ArrowRight, BookOpen, CheckCircle2, RotateCcw } from 'lucide-react';
import { useCurriculumProgress } from '@/contexts/CurriculumProgressContext';
import { getCourseProgress, type LearningCourse } from '@/data/learningCourses';
import { createCourseLectureHref } from '@/utils/courseJourney';
import { trackEvent } from '@/utils/analytics';
import LearningSyncStatus from './LearningSyncStatus';

const focusClass = 'focus-visible:outline-2 focus-visible:outline-offset-4';

export default function LearningCourseProgress({ course }: { course: LearningCourse }) {
  const { isMounted, completedLectures, lastVisitedLectureId, quizResults } = useCurriculumProgress();
  const progress = getCourseProgress(course, isMounted ? completedLectures : {}, isMounted ? lastVisitedLectureId : null);
  const courseLectureIds = new Set(course.steps.map((step) => step.lectureId));
  const weakQuestions = isMounted ? Object.values(quizResults).filter((result) => !result.isCorrect && courseLectureIds.has(result.lectureId)) : [];
  const weakSteps = course.steps.flatMap((step) => {
    const questions = weakQuestions.filter((result) => result.lectureId === step.lectureId);
    return questions.length ? [{ ...step, count: questions.length, questionId: questions[0].questionId }] : [];
  });
  const started = isMounted && (progress.completedCount > 0 || courseLectureIds.has(lastVisitedLectureId || ''));
  const nextStep = progress.nextStep || course.steps[0];
  const primaryLectureId = progress.finished && weakSteps.length ? weakSteps[0].lectureId : nextStep.lectureId;
  const primaryHref = progress.finished && weakSteps.length
    ? `${createCourseLectureHref(course.slug, weakSteps[0].lectureId)}&review=${encodeURIComponent(weakSteps[0].questionId)}#review-question-card`
    : progress.finished ? `#course-mini-case-${course.seriesId}` : createCourseLectureHref(course.slug, nextStep.lectureId);
  const primaryLabel = progress.finished ? weakSteps.length ? '苦手の解説を確認する' : '短い例で振り返る' : started ? 'コースの続きを学ぶ' : 'このコースを始める';
  const primaryTitle = progress.finished ? weakSteps.length ? weakSteps[0].title : '学んだ用語と、考えた理由を確かめる' : nextStep.title;

  return (
    <div className="space-y-8">
      <section id="course-next" aria-labelledby="course-progress-heading" className="scroll-mt-28 rounded-2xl border border-[#C5DED4] bg-[#EBF3EF] p-4 sm:p-6 dark:border-[#2A5243] dark:bg-[#182823]">
        <div className="flex flex-wrap items-center justify-between gap-3 text-[#184F49] dark:text-[#9CCBBC]">
          <h2 id="course-progress-heading" className="font-serif text-xl font-bold">{progress.finished ? 'この短いコースの講義を受講しました' : 'あなたの学習ステップ'}</h2>
          <p aria-live="polite" className="text-sm font-semibold">{isMounted ? `${progress.completedCount} / ${course.steps.length} 講義完了` : '進捗を確認中'}</p>
        </div>
        <progress className="mt-4 h-2 w-full overflow-hidden rounded-full accent-[#184F49] dark:accent-[#9CCBBC]" value={progress.completedCount} max={course.steps.length} aria-label="このコースの受講進捗" />
        <p className="mt-3 text-sm leading-relaxed text-[#59615D] dark:text-[#B7C5CF]">受講進捗は講義画面の「受講済みにする」と、確認クイズの受講完了記録に連動します。</p>
        <Link href={primaryHref} onClick={() => trackEvent('context_link_click', { placement: progress.finished ? 'course_review' : started ? 'course_resume' : 'course_start', course_id: course.slug, lecture_id: progress.finished && !weakSteps.length ? undefined : primaryLectureId })} className={`mt-4 flex min-h-11 items-center justify-between gap-3 rounded-xl bg-[#184F49] p-4 font-bold text-white hover:bg-[#103D37] dark:bg-[#285F54] ${focusClass}`}>
          <span className="min-w-0"><span className="block text-base">{primaryLabel}</span><span className="mt-1 block text-sm font-normal leading-relaxed">{primaryTitle}</span></span>
          <ArrowRight aria-hidden="true" className="h-5 w-5 shrink-0" />
        </Link>
      </section>

      <section aria-labelledby="course-steps-heading" className="space-y-4">
        <h2 id="course-steps-heading" className="font-serif text-2xl font-bold">学ぶ順番</h2>
        <ol className="space-y-3">
          {course.steps.map((step, index) => {
            const completed = isMounted && Boolean(completedLectures[step.lectureId]);
            const weakCount = weakQuestions.filter((question) => question.lectureId === step.lectureId).length;
            const current = !progress.finished && progress.nextStep?.lectureId === step.lectureId;
            return (
              <li key={step.lectureId} className={`min-w-0 rounded-2xl border bg-[#FCFAF6] p-4 sm:p-5 dark:bg-[#17212A] ${current ? 'border-[#184F49] dark:border-[#9CCBBC]' : 'border-[#D9E3DD] dark:border-[#2A3B4A]'}`}>
                <div className="flex items-start gap-3">
                  <span aria-hidden="true" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EBF3EF] text-sm font-bold text-[#184F49] dark:bg-[#182823] dark:text-[#9CCBBC]">{completed ? <CheckCircle2 className="h-5 w-5" /> : index + 1}</span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1"><h3 className="text-lg font-bold leading-relaxed">{step.title}</h3>{completed && <span className="text-sm font-semibold text-[#184F49] dark:text-[#9CCBBC]">受講済み</span>}{current && started && <span className="text-sm font-semibold text-[#184F49] dark:text-[#9CCBBC]">次のステップ</span>}</div>
                    <p className="mt-2 text-base leading-relaxed text-[#59615D] dark:text-[#B7C5CF]">{step.focus}</p>
                    {weakCount > 0 && <p className="mt-2 text-sm text-[#96531B] dark:text-[#E6C387]">解説で確認したい問題：{weakCount}問</p>}
                    <div className="mt-3 flex flex-wrap gap-2 text-sm font-semibold">
                      <Link href={createCourseLectureHref(course.slug, step.lectureId)} onClick={() => trackEvent('context_link_click', { placement: 'course_step', course_id: course.slug, lecture_id: step.lectureId, item_type: 'lecture' })} className={`inline-flex min-h-11 items-center gap-2 rounded-lg bg-[#EBF3EF] px-3 py-2 text-[#184F49] hover:bg-[#DCEBE3] dark:bg-[#182823] dark:text-[#9CCBBC] ${focusClass}`}><BookOpen aria-hidden="true" className="h-4 w-4" />講義を読む</Link>
                      <Link href={createCourseLectureHref(course.slug, step.lectureId, 'interactive-quiz-container')} onClick={() => trackEvent('context_link_click', { placement: 'course_step', course_id: course.slug, lecture_id: step.lectureId, item_type: 'quiz' })} className={`inline-flex min-h-11 items-center rounded-lg border border-[#D9E3DD] px-3 py-2 text-[#184F49] dark:border-[#2A3B4A] dark:text-[#9CCBBC] ${focusClass}`}>確認クイズへ</Link>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      <section aria-labelledby="course-review-heading" className="rounded-2xl border border-[#D9E3DD] bg-[#FCFAF6] p-4 sm:p-6 dark:border-[#2A3B4A] dark:bg-[#17212A]">
        <h2 id="course-review-heading" className="flex items-center gap-2 font-serif text-xl font-bold"><RotateCcw aria-hidden="true" className="h-5 w-5 text-[#184F49] dark:text-[#9CCBBC]" />苦手から解説へ戻る</h2>
        <p className="mt-3 text-base leading-relaxed text-[#59615D] dark:text-[#B7C5CF]">{!isMounted ? '回答履歴を確認しています。' : weakSteps.length ? `このコースで、直近の回答が不正解だった問題は${weakQuestions.length}問です。関連する講義で、要点と解説を確認できます。` : '確認クイズで間違えた問題があると、ここに関連講義が表示されます。講義を読み終えたら、クイズで理解を確かめましょう。'}</p>
        {weakSteps.length > 0 && <ul className="mt-4 space-y-2">{weakSteps.map((step) => <li key={step.lectureId}><Link href={`${createCourseLectureHref(course.slug, step.lectureId)}&review=${encodeURIComponent(step.questionId)}#review-question-card`} onClick={() => trackEvent('context_link_click', { placement: 'course_review', course_id: course.slug, lecture_id: step.lectureId })} className={`flex min-h-11 items-center justify-between gap-3 rounded-xl bg-[#F6F4EE] p-3 text-base font-semibold text-[#184F49] dark:bg-[#1E2B36] dark:text-[#9CCBBC] ${focusClass}`}><span>{step.title}<span className="ml-2 text-sm font-normal">{step.count}問</span></span><ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" /></Link></li>)}</ul>}
        <Link href="/kokushi#learning-review" onClick={() => trackEvent('context_link_click', { placement: 'course_review', course_id: course.slug, item_type: 'review' })} className={`mt-3 inline-flex min-h-11 items-center gap-2 text-base font-semibold text-[#184F49] underline underline-offset-4 dark:text-[#9CCBBC] ${focusClass}`}>今日の復習予定を見る<ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
      </section>
      <LearningSyncStatus returnTo={`/learn/courses/${course.slug}`} />
    </div>
  );
}

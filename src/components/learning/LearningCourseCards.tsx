'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useCurriculumProgress } from '@/contexts/CurriculumProgressContext';
import { getCourseProgress, type LearningCourse } from '@/data/learningCourses';
import { trackEvent } from '@/utils/analytics';
import { useLearningSync } from '@/contexts/LearningSyncContext';
import { useProgressAvailability } from '@/hooks/useProgressAvailability';

const shortDescriptions: Record<string, string> = {
  'oriental-medicine-introduction': '学ぶ目的と全体像を知り、事実と不明点を分けます。',
  'yinyang-foundations': '比較の基準と、陰陽の関係・変化を学びます。',
  'five-elements-relations': '五行の相生・相剋と、五臓への配当を整理します。',
  'qi-blood-fluid': '気・血・津液の伝統的な役割と用語を見分けます。',
};

export default function LearningCourseCards({ courses, placement = 'course_select', compact = false }: { courses: LearningCourse[]; placement?: string; compact?: boolean }) {
  const { isMounted, completedLectures } = useCurriculumProgress();
  const { status } = useLearningSync();
  const availability = useProgressAvailability(isMounted, status === 'memory');

  return (
    <div className="course-card-grid">
      {courses.map((course, index) => {
        const progress = getCourseProgress(course, isMounted ? completedLectures : {});
        return (
          <article key={course.slug} className="flex min-w-0 flex-col rounded-2xl border border-[#D9E3DD] bg-[#FCFAF6] p-5 dark:border-[#2A3B4A] dark:bg-[#17212A]">
            {!compact && <div className="mb-4 flex items-center gap-3 text-[#184F49] dark:text-[#9CCBBC]">
              <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-current font-serif text-lg">{String(index + 1).padStart(2, '0')}</span>
              <p className="text-sm font-semibold">{course.eyebrow}</p>
            </div>}
            <h3 className="font-serif text-xl font-bold leading-relaxed text-[#232826] dark:text-[#E6EFEA]">{course.title}</h3>
            <p className="mt-3 text-base leading-[1.7] ui-muted">{compact ? shortDescriptions[course.slug] || course.description : course.description}</p>
            <p className="mt-4 text-sm ui-muted">{course.steps.length}講 · 理論と短い例の振り返り</p>
            <div className="mt-auto pt-5">
              <p className="mb-2 text-sm ui-muted">{availability === 'ready' ? `${progress.completedCount} / ${course.steps.length} 講義完了` : availability === 'loading' ? '進捗を確認中…' : '進捗を取得できませんでした'}</p>
              {availability === 'ready' && <progress className="h-1.5 w-full overflow-hidden rounded-full accent-[#184F49] dark:accent-[#9CCBBC]" value={progress.completedCount} max={course.steps.length} aria-label={`${course.title}の受講進捗`} />}
              <Link href={`/learn/courses/${course.slug}`} onClick={() => trackEvent('context_link_click', { placement, course_id: course.slug })} className="mt-4 flex min-h-11 items-center justify-between gap-3 rounded-xl bg-[#184F49] px-4 py-3 text-base font-bold text-white hover:bg-[#103D37] focus-visible:outline-2 focus-visible:outline-offset-4 dark:bg-[#285F54]">
                <span>{progress.finished ? 'コースを振り返る' : progress.completedCount > 0 ? 'コースの続きを見る' : 'コースを見る'}</span>
                <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" />
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
}

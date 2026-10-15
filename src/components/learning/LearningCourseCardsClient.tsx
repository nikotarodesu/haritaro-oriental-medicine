'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useCurriculumProgress } from '@/contexts/CurriculumProgressContext';
import { getCourseProgress, type LearningCourse } from '@/data/learningCourses';
import { trackEvent } from '@/utils/analytics';
import { useLearningSync } from '@/contexts/LearningSyncContext';
import { useProgressAvailability } from '@/hooks/useProgressAvailability';

export default function LearningCourseCardsClient({ courses, readingMinutes, placement = 'course_select', compact = false }: { courses: LearningCourse[]; readingMinutes: Record<string, number>; placement?: string; compact?: boolean }) {
  const { isMounted, completedLectures } = useCurriculumProgress();
  const { status } = useLearningSync();
  const availability = useProgressAvailability(isMounted, status === 'memory');

  return (
    <div className="course-catalog">
      <ol className={`course-list${compact ? ' course-list--compact' : ''}`}>
      {courses.map((course, index) => {
        const progress = getCourseProgress(course, isMounted ? completedLectures : {});
        return (
          <li key={course.slug}>
            <Link href={`/learn/courses/${course.slug}`} onClick={() => trackEvent('context_link_click', { placement, course_id: course.slug })} className="course-list-link">
              <span aria-hidden="true" className="course-list-number">{String(index + 1).padStart(2, '0')}</span>
              <span className="course-list-copy">
                <span className="course-list-title">{course.title}</span>
                <span className="course-list-meta">{course.steps.length}講 · 約{readingMinutes[course.slug]}分{availability === 'ready' && progress.completedCount > 0 ? ` · ${progress.finished ? '完了' : `${progress.completedCount}講完了`}` : ''}</span>
                {!compact && <span className="course-list-description">{course.description}</span>}
              </span>
              <ArrowRight aria-hidden="true" className="course-list-arrow" />
            </Link>
          </li>
        );
      })}
      </ol>
      <p className="course-list-note">時間は講義を読む目安です。クイズ・演習の時間は含みません。</p>
      {availability !== 'ready' && <p className="course-list-note" role="status">{availability === 'loading' ? '進捗を確認中…' : '進捗を取得できませんでした。保存済みの記録は削除していません。'}</p>}
    </div>
  );
}

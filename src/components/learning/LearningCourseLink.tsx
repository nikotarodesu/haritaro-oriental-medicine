'use client';

import Link from 'next/link';
import { useEffect, type ReactNode } from 'react';
import { useSearchParams } from 'next/navigation';
import { trackEvent } from '@/utils/analytics';
import { readCourseSlug, resolveCourseJourney, type CourseJourney } from '@/utils/courseJourney';

export default function LearningCourseLink({ href, courseId, placement, children, className }: {
  href: string;
  courseId: string;
  placement: 'course_reading' | 'course_next' | 'course_return';
  children: ReactNode;
  className?: string;
}) {
  return <Link href={href} className={className} onClick={() => trackEvent('context_link_click', { placement, course_id: courseId })}>{children}</Link>;
}

// Render inside a small Suspense boundary: reading content remains available in
// the server HTML while only the course navigation reads request-specific data.
export function CourseJourneyResolver({ lectureId, onResolve }: {
  lectureId: string;
  onResolve: (resolved: { lectureId: string; journey: CourseJourney | null }) => void;
}) {
  const params = useSearchParams();
  const courseSlug = readCourseSlug(params);
  useEffect(() => {
    onResolve({ lectureId, journey: resolveCourseJourney(lectureId, courseSlug) });
  }, [lectureId, courseSlug, onResolve]);
  return null;
}

'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import { trackEvent } from '@/utils/analytics';

export default function LearningCourseLink({ href, courseId, placement, children, className }: {
  href: string;
  courseId: string;
  placement: 'course_reading' | 'course_next' | 'course_return';
  children: ReactNode;
  className?: string;
}) {
  return <Link href={href} className={className} onClick={() => trackEvent('context_link_click', { placement, course_id: courseId })}>{children}</Link>;
}

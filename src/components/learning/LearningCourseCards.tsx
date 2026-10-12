import { getCurriculumIndexCatalog } from '@/data/curriculumIndexCatalog';
import type { LearningCourse } from '@/data/learningCourses';
import { getCourseReadingMinutes } from '@/utils/courseReadingTime';
import LearningCourseCardsClient from './LearningCourseCardsClient';

export default function LearningCourseCards({ courses, placement, compact }: { courses: LearningCourse[]; placement?: string; compact?: boolean }) {
  const { lectures } = getCurriculumIndexCatalog();
  const readingMinutes = Object.fromEntries(courses.map(course => [course.slug, getCourseReadingMinutes(course, lectures)]));
  return <LearningCourseCardsClient courses={courses} readingMinutes={readingMinutes} placement={placement} compact={compact} />;
}

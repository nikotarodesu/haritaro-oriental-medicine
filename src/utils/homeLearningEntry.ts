import { LEARNING_COURSES, getCourseProgress } from '@/data/learningCourses';
import { createCourseLectureHref } from '@/utils/courseJourney';
import type { ResumeLecture } from '@/types/learningProgressCatalog';

/** Presentation only: keep existing progress and course navigation formats intact. */
export function getHomeLearningEntry(lectures: readonly ResumeLecture[], completed: Record<string, boolean>, lastVisited: string | null) {
  const started = Boolean(lastVisited || Object.values(completed).some(Boolean));
  const course = LEARNING_COURSES.find(item => item.steps.some(step => step.lectureId === lastVisited));
  if (course) {
    const progress = getCourseProgress(course, completed, lastVisited);
    if (progress.nextStep) return { started: true, title: progress.nextStep.title, href: createCourseLectureHref(course.slug, progress.nextStep.lectureId), reason: `${course.title} · ${progress.completedCount} / ${course.steps.length}講義完了` };
  }
  const next = lectures.find(lecture => lecture.id === lastVisited && !completed[lecture.id]) || (started ? lectures.find(lecture => !completed[lecture.id]) : undefined);
  if (next) return { started: true, title: next.title, href: `/curriculum/${next.id}`, reason: '未完了の講義から続けられます。' };
  const firstCourse = LEARNING_COURSES[0];
  return { started, title: started ? '学んだ内容を振り返る' : firstCourse.title, href: started ? '/learn/courses' : `/learn/courses/${firstCourse.slug}`, reason: started ? 'コース一覧で復習するテーマを選べます。' : '東洋医学の範囲と学び方を知り、短い例から始めます。' };
}

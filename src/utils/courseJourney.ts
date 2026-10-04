import { getLearningCourse, type LearningCourse, type LearningCourseStep } from '@/data/learningCourses';

export interface CourseJourney {
  course: LearningCourse;
  lectureId: string;
  stepIndex: number;
  previousStep: LearningCourseStep | null;
}

export interface CourseNextAction {
  kind: 'lecture' | 'complete';
  href: string;
  label: string;
  title: string;
  lectureId?: string;
}

export function readCourseSlug(params: { getAll: (name: string) => string[] }): string | null {
  const slugs = params.getAll('course');
  return slugs.length === 1 && getLearningCourse(slugs[0]) ? slugs[0] : null;
}

// An explicit course must contain this lecture. Direct visits never infer a
// course from previous browsing or choose between overlapping courses.
export function resolveCourseJourney(lectureId: string, courseSlug: string | null | undefined): CourseJourney | null {
  const course = courseSlug ? getLearningCourse(courseSlug) : undefined;
  const stepIndex = course?.steps.findIndex((step) => step.lectureId === lectureId) ?? -1;
  if (!course || stepIndex < 0) return null;
  return { course, lectureId, stepIndex, previousStep: course.steps[stepIndex - 1] || null };
}

export function createCourseLectureHref(courseSlug: string, lectureId: string, fragment?: 'interactive-quiz-container'): string {
  const journey = resolveCourseJourney(lectureId, courseSlug);
  const path = `/curriculum/${encodeURIComponent(lectureId)}`;
  return `${path}${journey ? `?course=${journey.course.slug}` : ''}${fragment ? `#${fragment}` : ''}`;
}

export function getCourseNextAction(journey: CourseJourney, completed: Record<string, boolean>, currentCompleted = false): CourseNextAction {
  const { course, lectureId, stepIndex } = journey;
  const isComplete = (step: LearningCourseStep) => Boolean(completed[step.lectureId] || (currentCompleted && step.lectureId === lectureId));
  const remaining = course.steps.filter((step) => !isComplete(step));
  if (!remaining.length) {
    return { kind: 'complete', href: `/learn/courses/${course.slug}#course-next`, label: 'コースを振り返る', title: course.title };
  }
  const next = course.steps.slice(stepIndex + 1).find((step) => !isComplete(step)) || remaining[0];
  const sameLecture = next.lectureId === lectureId;
  return {
    kind: 'lecture',
    href: createCourseLectureHref(course.slug, next.lectureId, sameLecture ? 'interactive-quiz-container' : undefined),
    label: sameLecture ? 'この講義のクイズで確認する' : course.steps.indexOf(next) > stepIndex ? 'コースの次のステップへ' : '未完了のステップを学ぶ',
    title: next.title,
    lectureId: next.lectureId,
  };
}

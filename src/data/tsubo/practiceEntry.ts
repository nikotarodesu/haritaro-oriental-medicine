import { MERIDIANS } from './meridiansData';
import type { StudySession } from './types';

const SPECIAL_COURSES = {
  saved: '保存した経穴',
  five_shu: '五兪穴・五行特訓',
  puncture: '施術前の安全確認特訓',
  golden_pairs: '伝統名配穴ペア特訓',
} as const;

export interface RequestedPracticeCourse {
  id: string;
  title: string;
  meridianId?: string;
}

/** Only catalog IDs or their exact standard code prefixes are accepted. */
export function resolvePracticeCourse(courseId: string | null): RequestedPracticeCourse | null {
  if (!courseId) return null;
  if (courseId.startsWith('meridian_')) {
    const value = courseId.slice('meridian_'.length);
    const meridian = MERIDIANS.find(item => item.id === value || item.codePrefix.toLowerCase() === value);
    return meridian ? { id: `meridian_${meridian.id}`, title: meridian.name, meridianId: meridian.id } : null;
  }
  if (Object.hasOwn(SPECIAL_COURSES, courseId)) {
    return { id: courseId, title: SPECIAL_COURSES[courseId as keyof typeof SPECIAL_COURSES] };
  }
  return null;
}

export function readRequestedPracticeCourse(params: { getAll(name: string): string[] }): RequestedPracticeCourse | null {
  const values = params.getAll('course');
  return values.length === 1 ? resolvePracticeCourse(values[0]) : null;
}

export function getPracticeEntryAction(
  saved: StudySession | null,
  requested: RequestedPracticeCourse | null,
): 'home' | 'resume' | 'choose' | 'start' {
  if (!saved?.questions?.length) return requested ? 'start' : 'home';
  if (!requested) return 'resume';
  if (saved.isCompleted) return 'start';
  const savedCourseId = resolvePracticeCourse(saved.courseId)?.id || saved.courseId;
  return savedCourseId === requested.id ? 'resume' : 'choose';
}

export function getPracticeSessionTitle(session: StudySession): string {
  const course = resolvePracticeCourse(session.courseId);
  return course?.meridianId ? `${course.title}（${session.questions.length}問）` : session.courseTitle;
}

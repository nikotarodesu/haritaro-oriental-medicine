import { LEARNING_COURSES, getCourseProgress } from '@/data/learningCourses';
import { createCourseLectureHref } from '@/utils/courseJourney';
import type { CaseLearningNeed } from '@/utils/learningFocus';
import type { ResumeLecture } from '@/types/learningProgressCatalog';
import type { QuizResultRecord } from '@/contexts/CurriculumProgressContext';

export interface LearningRecommendation {
  kind: 'safety' | 'due' | 'focus' | 'mistake' | 'course' | 'lecture' | 'case';
  title: string; reason: string; href: string; action: string;
}
interface RecommendationInput {
  lectures: readonly ResumeLecture[];
  completed: Record<string, boolean>;
  lastVisitedLectureId: string | null;
  quizResults: Readonly<Record<string, QuizResultRecord>>;
  caseNeeds: readonly CaseLearningNeed[];
  caseAttempts: readonly { caseId: string }[];
  today: string;
}
const CASES = [
  { id: 'fatigue-reasoning', title: '疲労・軟便：候補を絞り込む' },
  { id: 'back-pain-referral', title: '急性腰痛：紹介を優先する' },
  { id: 'mixed-temperature', title: '冷えとのぼせ：矛盾を扱う' },
] as const;

/** One next task, based only on valid public learning records supplied by the contexts. */
export function getLearningRecommendation(input: RecommendationInput): LearningRecommendation {
  const { lectures, completed, lastVisitedLectureId, quizResults, caseAttempts, today } = input;
  const needs = input.caseNeeds.filter(need => CASES.some(item => item.id === need.caseId)
    && /^\/kokushi\?focus=(?:safety-check|missing-information|reasoning-evidence|comparison|reevaluation)#learning-focus-review$/.test(need.href));
  const focusRecommendation = (need: CaseLearningNeed): LearningRecommendation => ({
    kind: need.safetyReviewRequired ? 'safety' : 'focus', title: need.title,
    reason: `「${need.caseTitle}」の前回の回答から選びました。${need.reason}`,
    href: need.href, action: '根拠を復習する',
  });
  const safety = needs.find(need => need.safetyReviewRequired && need.focusId === 'safety-check');
  if (safety) return focusRecommendation(safety);
  const results = Object.values(quizResults);
  const due = results.filter(record => typeof record.nextReviewDate === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(record.nextReviewDate) && record.nextReviewDate <= today);
  if (due.length) return { kind: 'due', title: '今日の間隔復習',
    reason: `復習予定日を迎えた問題が${due.length}問あります。前回の理解を短いクイズで確かめましょう。`,
    href: '/kokushi#learning-review', action: '今日の復習を開く' };
  if (needs[0]) return focusRecommendation(needs[0]);
  const mistake = results.filter(record => !record.isCorrect).sort((a, b) => b.answeredAt.localeCompare(a.answeredAt))[0];
  if (mistake) {
    const lecture = lectures.find(item => item.id === mistake.lectureId);
    const course = LEARNING_COURSES.find(item => item.steps.some(step => step.lectureId === lecture?.id));
    const lectureHref = lecture && course ? createCourseLectureHref(course.slug, lecture.id) : `/curriculum/${lecture?.id}`;
    const href = lecture && mistake.kind !== 'acupoint' && /^[A-Za-z0-9_-]{1,140}$/.test(mistake.questionId)
      ? `${lectureHref}${course ? '&' : '?'}review=${encodeURIComponent(mistake.questionId)}#review-question-card`
      : '/kokushi#learning-review';
    return { kind: 'mistake', title: lecture ? `${lecture.title}を確認する` : '前回間違えた問題を確認する',
      reason: '前回の回答で間違えた問題があります。解説を読んでから、もう一度理由を確かめましょう。', href, action: '苦手な問題を復習する' };
  }
  const activeCourse = LEARNING_COURSES.find(course => course.steps.some(step => step.lectureId === lastVisitedLectureId));
  if (activeCourse) {
    const progress = getCourseProgress(activeCourse, completed, lastVisitedLectureId);
    if (progress.nextStep) return { kind: 'course', title: progress.nextStep.title,
      reason: `「${activeCourse.title}」は${progress.completedCount} / ${activeCourse.steps.length}講義完了。未完了のステップから続けられます。`,
      href: createCourseLectureHref(activeCourse.slug, progress.nextStep.lectureId), action: 'コースを続ける' };
  }
  const visited = lectures.find(lecture => lecture.id === lastVisitedLectureId && !completed[lecture.id]);
  if (visited) return { kind: 'lecture', title: visited.title, reason: '前回開いた講義です。読んだ内容を確認クイズで確かめてから次へ進みましょう。', href: `/curriculum/${visited.id}`, action: '前回の講義を続ける' };
  const nextCourse = LEARNING_COURSES.find(course => !getCourseProgress(course, completed).finished);
  if (nextCourse) {
    const next = getCourseProgress(nextCourse, completed).nextStep!;
    return { kind: 'course', title: next.title, reason: Object.values(completed).some(Boolean)
      ? `「${nextCourse.title}」の未完了ステップから、基礎を一つずつ整理します。`
      : 'はじめてなら東洋医学の概論から。学ぶ範囲と全体像を知り、短い例で観察と解釈を分けます。',
      href: createCourseLectureHref(nextCourse.slug, next.lectureId), action: 'この講義を始める' };
  }
  const nextLecture = lectures.find(lecture => !completed[lecture.id]);
  if (nextLecture) return { kind: 'lecture', title: nextLecture.title,
    reason: '短いコースで学んだ内容を、体系講義で深めます。未完了の講義から続けられます。',
    href: `/curriculum/${nextLecture.id}`, action: '体系講義を続ける' };
  const counts = new Map<string, number>();
  for (const attempt of caseAttempts) counts.set(attempt.caseId, (counts.get(attempt.caseId) || 0) + 1);
  const nextCase = [...CASES].sort((a, b) => (counts.get(a.id) || 0) - (counts.get(b.id) || 0))[0];
  return { kind: 'case', title: nextCase.title, reason: '体系講義を終えました。取り組んだ回数が少ない症例で、判断とその根拠を練習しましょう。',
    href: `/simulator?case=${nextCase.id}#case-training`, action: '症例で考える' };
}

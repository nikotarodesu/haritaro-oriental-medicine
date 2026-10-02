import { CURRICULUM_QUIZZES } from './curriculumQuizzes';
import { KOKUSHI_PAST_EXAMS } from './kokushiPastExams';
import { questionRevision } from '@/utils/learningReview';

export interface LearningQuestion {
  id: string;
  question: string;
  options: readonly string[];
  correctIndex: number;
  explanation: string;
  lectureId: string;
  lectureTitle: string;
  chapterId: string;
  chapterTitle: string;
  kind: 'lecture' | 'exam' | 'acupoint';
  href: string;
  revision: string;
}

export const LEARNING_QUESTIONS: LearningQuestion[] = [
  ...Object.values(CURRICULUM_QUIZZES).flatMap(group => group.questions.map(q => ({
    ...q, lectureId: group.lectureId, lectureTitle: group.lectureTitle,
    chapterId: group.chapterId, chapterTitle: group.chapterTitle,
    kind: 'lecture' as const, href: `/curriculum/${group.lectureId}#interactive-quiz-container`,
    revision: questionRevision(q.question, q.options, q.correctIndex, q.explanation),
  }))),
  ...KOKUSHI_PAST_EXAMS.map(q => ({
    ...q, lectureId: q.relatedLectureId || 'lecture-treatment-8',
    lectureTitle: q.relatedLectureTitle || q.subject, chapterId: 'kokushi', chapterTitle: q.subject,
    kind: 'exam' as const, href: `/kokushi?examId=${q.id}#exam-practice`,
    revision: questionRevision(q.question, q.options, q.correctIndex, q.explanation),
  })),
];

export const LEARNING_QUESTION_MAP = new Map(LEARNING_QUESTIONS.map(q => [q.id, q]));

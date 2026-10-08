import { updateReviewSchedule, type ReviewSchedule } from './learningReview';
import type { QuizResultRecord } from '@/contexts/CurriculumProgressContext';

export function validQuizRecord(value: unknown): value is QuizResultRecord {
  if (!value || typeof value !== 'object') return false;
  const record = value as QuizResultRecord;
  return ['questionId', 'lectureId', 'chapterId', 'chapterTitle', 'lectureTitle', 'questionText', 'explanation', 'answeredAt'].every(key => typeof record[key as keyof QuizResultRecord] === 'string')
    && Array.isArray(record.options) && record.options.length >= 2 && record.options.every(option => typeof option === 'string')
    && Number.isInteger(record.userAnswerIndex) && record.userAnswerIndex >= 0 && record.userAnswerIndex < record.options.length
    && Number.isInteger(record.correctAnswerIndex) && record.correctAnswerIndex >= 0 && record.correctAnswerIndex < record.options.length
    && typeof record.isCorrect === 'boolean'
    && record.isCorrect === (record.userAnswerIndex === record.correctAnswerIndex)
    && Number.isFinite(Date.parse(record.answeredAt));
}

/** Replay immutable attempts so two offline devices cannot erase each other's practice. */
export function mergeQuizAttempts(snapshot: QuizResultRecord, history: QuizResultRecord[]): QuizResultRecord {
  const attempts = history.filter(record => record.questionId === snapshot.questionId && record.revision === snapshot.revision && (record.historyEpoch || 'legacy') === (snapshot.historyEpoch || 'legacy'));
  if (!attempts.length) return snapshot;
  let schedule: ReviewSchedule = attempts[0]; // Includes any pre-sync legacy practice count.
  for (const attempt of attempts.slice(1)) schedule = updateReviewSchedule(schedule, attempt.isCorrect, attempt.revision || '', attempt.lastReviewDate || attempt.answeredAt.slice(0, 10));
  return { ...attempts[attempts.length - 1], ...schedule };
}

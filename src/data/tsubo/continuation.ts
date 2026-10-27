import type { StudySession, TsuboStudyDataV1 } from './types';
import { getPracticeSessionTitle } from './practiceEntry';

function studyDate(value: unknown): value is string {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const timestamp = Date.parse(value + 'T00:00:00Z');
  return Number.isFinite(timestamp) && new Date(timestamp).toISOString().slice(0, 10) === value;
}

export function getPracticeContinuation(data: TsuboStudyDataV1, active: StudySession | null, paused: StudySession[], today: string) {
  const unfinished = active && !active.isCompleted ? active : null;
  const interrupted = paused.filter(session => !session.isCompleted && session.sessionId !== unfinished?.sessionId);
  const records = Object.values(data.records).filter(record => record && typeof record === 'object');
  const dueCount = records.filter(record => record.flaggedForReview || (studyDate(record.nextReviewDate) && record.nextReviewDate <= today)).length;
  const nextDate = records.map(record => record.nextReviewDate).filter((date): date is string => studyDate(date) && date > today).sort()[0] || null;
  return {
    hasHistory: !!unfinished || interrupted.length > 0 || records.some(record => record.totalAttempts > 0) || data.history.some(day => day.answeredCount > 0),
    resumeTitle: unfinished ? getPracticeSessionTitle(unfinished) : null,
    answered: unfinished ? Object.keys(unfinished.answers).length : 0,
    total: unfinished?.questions.length || 0,
    pausedCount: interrupted.length,
    dueCount,
    nextDate: dueCount > 0 ? today : nextDate,
  };
}

export function practiceDateLabel(date: string): string {
  const [, month, day] = date.split('-');
  return `${Number(month)}月${Number(day)}日`;
}

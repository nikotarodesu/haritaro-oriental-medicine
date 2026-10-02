export interface ReviewSchedule {
  revision?: string;
  consecutiveCorrect?: number;
  attempts?: number;
  mistakes?: number;
  lastReviewDate?: string;
  nextReviewDate?: string;
}

export function localStudyDate(date = new Date()): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

export function questionRevision(question: string, options: readonly string[], answer: number, explanation: string): string {
  let hash = 2166136261;
  for (const char of JSON.stringify([question, options, answer, explanation])) {
    hash = Math.imul(hash ^ char.charCodeAt(0), 16777619);
  }
  return `q2-${(hash >>> 0).toString(36)}`;
}

/** Same-day retries count as practice, without extending the review interval. */
export function updateReviewSchedule(previous: ReviewSchedule | undefined, correct: boolean, revision: string, today: string): ReviewSchedule {
  const prev = previous?.revision === revision ? previous : undefined;
  const sameDay = prev?.lastReviewDate === today;
  const streak = correct ? (sameDay ? prev?.consecutiveCorrect || 0 : (prev?.consecutiveCorrect || 0) + 1) : 0;
  const intervals = [1, 1, 3, 7, 14, 30];
  const next = new Date(`${today}T12:00:00`);
  next.setDate(next.getDate() + intervals[Math.min(streak, 5)]);
  return {
    revision, consecutiveCorrect: streak,
    attempts: (prev?.attempts || 0) + 1,
    mistakes: (prev?.mistakes || 0) + (correct ? 0 : 1),
    lastReviewDate: today,
    nextReviewDate: correct && sameDay && prev?.nextReviewDate ? prev.nextReviewDate : localStudyDate(next),
  };
}

export function shuffledIndices(length: number, seed: string): number[] {
  const order = Array.from({ length }, (_, i) => i);
  let value = 2166136261;
  for (const char of seed) value = Math.imul(value ^ char.charCodeAt(0), 16777619);
  for (let i = length - 1; i > 0; i--) {
    value ^= value << 13; value ^= value >>> 17; value ^= value << 5;
    const j = (value >>> 0) % (i + 1);
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
}

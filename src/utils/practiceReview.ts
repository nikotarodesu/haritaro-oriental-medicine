import { getCaseStudyProgress } from "@/utils/caseStudyProgress";
import { localStudyDate, updateReviewSchedule, type ReviewSchedule } from "@/utils/learningReview";
import { getLearningStorageAdapter } from "@/utils/learningStorageBridge";

export const PRACTICE_REVIEW_SECTION_ID = "practice-reviews";
export const PRACTICE_REVIEW_HREF = `/learn/review#${PRACTICE_REVIEW_SECTION_ID}`;
export const CASE_RETRY_PARAM = "practiceReview";

export type PracticeReviewQuestion = {
  id: string;
  kind: "atlas" | "case";
  title: string;
  prompt: string;
  href: string;
  revision: string;
  caseStep?: {
    caseId: string;
    stepNumber: number;
    options: readonly { id: string; isCorrect: boolean }[];
  };
};

type PracticeReviewRecord = Required<ReviewSchedule> & { isCorrect: boolean };

export function practiceReviewAnchor(id: string) {
  return `review-${id}`;
}

export function practiceReviewKey(id: string) {
  return `quiz:practice/${id}`;
}

function isPracticeReviewRecord(value: unknown): value is PracticeReviewRecord {
  if (!value || typeof value !== "object") return false;
  const record = value as Partial<PracticeReviewRecord>;
  const date = /^\d{4}-\d{2}-\d{2}$/;
  return typeof record.revision === "string" && typeof record.isCorrect === "boolean" &&
    typeof record.lastReviewDate === "string" && date.test(record.lastReviewDate) &&
    typeof record.nextReviewDate === "string" && date.test(record.nextReviewDate) &&
    [record.attempts, record.mistakes, record.consecutiveCorrect].every(number =>
      typeof number === "number" && Number.isSafeInteger(number) && number >= 0);
}

export function readPracticeReview(values: Record<string, unknown>, question: PracticeReviewQuestion) {
  const saved = values[practiceReviewKey(question.id)];
  if (isPracticeReviewRecord(saved)) return saved.revision === question.revision ? saved : undefined;
  if (!question.caseStep) return undefined;

  const { caseId, stepNumber, options } = question.caseStep;
  const progress = getCaseStudyProgress(values, {
    id: caseId, title: question.title, reasoningSteps: [{ stepNumber, options }],
  });
  const choice = options.find(option => option.id === progress.answers[stepNumber]);
  const answeredAt = new Date(progress.updatedAt);
  if (!choice || choice.isCorrect || !Number.isFinite(answeredAt.getTime())) return undefined;
  return { ...updateReviewSchedule(undefined, false, question.revision, localStudyDate(answeredAt)), isCorrect: false };
}

export function recordPracticeReviewAnswer(question: PracticeReviewQuestion, isCorrect: boolean, answeredAt = Date.now()) {
  const store = getLearningStorageAdapter();
  if (!store) return;
  const previous = readPracticeReview(store.values(), question);
  if (isCorrect && !previous) return;
  const schedule = updateReviewSchedule(previous, isCorrect, question.revision, localStudyDate(new Date(answeredAt)));
  store.set(practiceReviewKey(question.id), { ...schedule, isCorrect });
}

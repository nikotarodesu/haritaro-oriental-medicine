export type CaseStudyDescriptor = {
  id: string;
  title: string;
  reasoningSteps: readonly { stepNumber: number; options: readonly { id: string }[] }[];
};

type CaseStudyAnswer = { attempt: string; optionId: string; answeredAt: number };

export function caseStudyAttemptKey(caseId: string) {
  return `case:study/${caseId}/attempt`;
}

export function caseStudyAnswerKey(caseId: string, step: number) {
  return `case:study/${caseId}/${step}`;
}

function isCaseStudyAnswer(value: unknown): value is CaseStudyAnswer {
  if (!value || typeof value !== "object") return false;
  const answer = value as Partial<CaseStudyAnswer>;
  return typeof answer.attempt === "string" && typeof answer.optionId === "string" &&
    typeof answer.answeredAt === "number" && Number.isSafeInteger(answer.answeredAt) && answer.answeredAt > 0;
}

export function getCaseStudyProgress(values: Record<string, unknown>, study: CaseStudyDescriptor) {
  const savedAttempt = values[caseStudyAttemptKey(study.id)];
  const attempt = typeof savedAttempt === "string" && savedAttempt ? savedAttempt : "initial";
  const answers: Record<number, string> = {};
  let updatedAt = 0;

  for (const step of study.reasoningSteps) {
    const entry = values[caseStudyAnswerKey(study.id, step.stepNumber)];
    if (!isCaseStudyAnswer(entry) || entry.attempt !== attempt ||
        !step.options.some(option => option.id === entry.optionId)) continue;
    answers[step.stepNumber] = entry.optionId;
    updatedAt = Math.max(updatedAt, entry.answeredAt);
  }

  const answered = Object.keys(answers).length;
  const total = study.reasoningSteps.length;
  return { attempt, answers, answered, total, complete: total > 0 && answered === total, updatedAt };
}

import type { CaseReasoningStep, ClinicalCase } from "@/types/clinicalCase";
import { caseQuestionAnchor } from "@/utils/caseStudyNavigation";
import { questionRevision } from "@/utils/learningReview";
import { CASE_RETRY_PARAM, type PracticeReviewQuestion } from "@/utils/practiceReview";

export function casePracticeReviewQuestion(clinicalCase: Pick<ClinicalCase, "id" | "title">, step: CaseReasoningStep): PracticeReviewQuestion {
  const { stepNumber, stepTitle, question, options } = step;
  return {
    id: `${clinicalCase.id}-${stepNumber}`,
    kind: "case",
    title: clinicalCase.title,
    prompt: `第${stepNumber}問 ${stepTitle}`,
    href: `/cases/${clinicalCase.id}?${CASE_RETRY_PARAM}=1#${caseQuestionAnchor(stepNumber)}`,
    revision: questionRevision(
      `${stepTitle}\n${question}`,
      options.map(option => JSON.stringify([option.id, option.label, option.isCorrect])),
      options.findIndex(option => option.isCorrect),
      JSON.stringify(options.map(option => option.feedback)),
    ),
    caseStep: { caseId: clinicalCase.id, stepNumber, options: options.map(({ id, isCorrect }) => ({ id, isCorrect })) },
  };
}

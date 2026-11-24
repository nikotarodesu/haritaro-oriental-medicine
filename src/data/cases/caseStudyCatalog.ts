import { CLINICAL_CASES } from "@/data/clinicalCasesData";
import type { CaseStudyDescriptor } from "@/utils/caseStudyProgress";

export const CASE_STUDY_DESCRIPTORS: readonly CaseStudyDescriptor[] = CLINICAL_CASES.map(({ id, title, reasoningSteps }) => ({
  id,
  title,
  reasoningSteps: reasoningSteps.map(({ stepNumber, options }) => ({
    stepNumber,
    options: options.map(({ id: optionId }) => ({ id: optionId })),
  })),
}));

export const PUBLIC_CASE_STUDY_IDS = CASE_STUDY_DESCRIPTORS.map(({ id }) => id);

import { CLINICAL_CASES } from "@/data/clinicalCasesData";
import type { CaseStudyDescriptor } from "@/utils/caseStudyProgress";
import type { CaseCatalogPosition } from "@/utils/caseStudyNavigation";

export const CASE_STUDY_ORDER: readonly CaseCatalogPosition[] = CLINICAL_CASES.map(({ id, caseNumber }) => ({ id, caseNumber }));

export const CASE_STUDY_DESCRIPTORS: readonly CaseStudyDescriptor[] = CLINICAL_CASES.map(({ id, title, reasoningSteps }) => ({
  id,
  title,
  reasoningSteps: reasoningSteps.map(({ stepNumber, options }) => ({
    stepNumber,
    options: options.map(({ id: optionId }) => ({ id: optionId })),
  })),
}));

export const PUBLIC_CASE_STUDY_IDS = CASE_STUDY_DESCRIPTORS.map(({ id }) => id);

export function getCaseStudyUsingAcupoint(code: string) {
  const upperCode = code.toUpperCase();
  const matchesPoint = (label: string) => label.match(/\(([A-Z]{2}\d{1,2})\b/i)?.[1].toUpperCase() === upperCode;

  return CLINICAL_CASES.find(({ correctDiagnosis }) => correctDiagnosis.primaryPoints.some(matchesPoint))
    ?? CLINICAL_CASES.find(({ correctDiagnosis }) => correctDiagnosis.secondaryPoints.some(matchesPoint));
}

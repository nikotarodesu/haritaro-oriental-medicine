export const CASE_REASONING_ANCHOR = "case-reasoning";
export const CASE_REVIEW_ANCHOR = "case-practice-review";
export const CASE_REVIEW_LECTURE_ID = "lecture-diagnosis-1";

const sourceParam = "fromCase";

export function caseQuestionAnchor(stepNumber: number) {
  return `case-question-${stepNumber}`;
}

export function caseReviewLectureHref(readingHref: string, caseId: string) {
  const url = new URL(readingHref, "https://www.haritaro.jp");
  url.searchParams.set(sourceParam, caseId);
  return url.pathname + url.search + url.hash;
}

export function caseReviewReturnHref(params: Pick<URLSearchParams, "getAll">, publicCaseIds: readonly string[]) {
  const sources = params.getAll(sourceParam);
  if (sources.length !== 1 || !publicCaseIds.includes(sources[0])) return undefined;
  return `/cases/${sources[0]}#${CASE_REVIEW_ANCHOR}`;
}

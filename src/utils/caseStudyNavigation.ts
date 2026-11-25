export const CASE_REASONING_ANCHOR = "case-reasoning";
export const CASE_REVIEW_ANCHOR = "case-practice-review";
export const CASE_REVIEW_LECTURE_ID = "lecture-diagnosis-1";
export const CASE_COURSE_COMPARISON_ANCHOR = "case-comparison";
export const CASE_COURSE_REVIEW_LECTURE_ID = "lecture-treatment-1";
export const CASE_COURSE_REVIEW_SECTION = 2;

const sourceParam = "fromCase";
const exerciseParam = "fromExercise";
export const CASE_COURSE_READING_HREF = `/learn/lectures/principles-and-goals?${exerciseParam}=${CASE_COURSE_COMPARISON_ANCHOR}#part-${CASE_COURSE_REVIEW_LECTURE_ID}-section-${CASE_COURSE_REVIEW_SECTION}`;

export function isReadingFromCaseCourse(params: Pick<URLSearchParams, "getAll"> | null) {
  const origins = params?.getAll(exerciseParam);
  return origins?.length === 1 && origins[0] === CASE_COURSE_COMPARISON_ANCHOR;
}

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

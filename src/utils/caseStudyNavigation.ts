export const CASE_REASONING_ANCHOR = "case-reasoning";
export const CASE_REVIEW_ANCHOR = "case-practice-review";
export const CASE_REVIEW_LECTURE_ID = "lecture-diagnosis-1";
export const CASE_COURSE_COMPARISON_ANCHOR = "case-comparison";
export const CASE_COURSE_REVIEW_LECTURE_ID = "lecture-treatment-1";
export const CASE_COURSE_REVIEW_SECTION = 2;

const CASE_SYMPTOM_GROUPS = [
  { id: "headache", label: "頭痛・めまい", caseNumbers: [1, 9, 12] },
  { id: "fatigue", label: "疲れ・だるさ", caseNumbers: [2, 12] },
  { id: "digestion", label: "胃腸", caseNumbers: [2, 6, 7, 15] },
  { id: "movement", label: "首・肩・腰・ひざ", caseNumbers: [8, 11, 14, 18] },
  { id: "sleep", label: "睡眠", caseNumbers: [4, 5] },
  { id: "temperature", label: "冷え・ほてり", caseNumbers: [3, 4, 8] },
  { id: "breathing", label: "のど・咳・呼吸", caseNumbers: [10, 17, 19] },
] satisfies readonly { id: string; label: string; caseNumbers: number[] }[];

export const CASE_CATALOG_FILTERS = [
  { id: "all", label: "すべて" },
  ...CASE_SYMPTOM_GROUPS,
  { id: "other", label: "ほかの症状" },
];
const groupedCaseNumbers = new Set(CASE_SYMPTOM_GROUPS.flatMap(group => group.caseNumbers));

export type CaseCatalogPosition = { id: string; caseNumber: number };

export function caseCatalogFilter(symptom: string | null) {
  return CASE_CATALOG_FILTERS.find(({ id }) => id === symptom)?.id ?? "all";
}

export function filterCaseCatalog<T extends { caseNumber: number }>(entries: readonly T[], filter: string) {
  const group = CASE_SYMPTOM_GROUPS.find(({ id }) => id === filter);
  if (group) return entries.filter(({ caseNumber }) => group.caseNumbers.includes(caseNumber));
  if (filter === "other") return entries.filter(({ caseNumber }) => !groupedCaseNumbers.has(caseNumber));
  return entries;
}

export function nextCaseInCatalog(cases: readonly CaseCatalogPosition[], caseId: string, filter: string) {
  const visible = filterCaseCatalog(cases, filter);
  const at = visible.findIndex(({ id }) => id === caseId);
  return at < 0 ? undefined : visible[at + 1];
}

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

export function caseHrefWithSymptom(href: string, symptom: string | null) {
  const filter = caseCatalogFilter(symptom);
  if (filter === "all") return href;
  const url = new URL(href, "https://www.haritaro.jp");
  url.searchParams.set("symptom", filter);
  return url.pathname + url.search + url.hash;
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

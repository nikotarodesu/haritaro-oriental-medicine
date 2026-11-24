const OLD_ID_MAP: Readonly<Record<string, string>> = {
  "lecture-1": "lecture-yinyang-1",
  "lecture-1-yinyang": "lecture-yinyang-1",
  "lecture-2": "lecture-wuxing-1",
  "lecture-2-wuxing": "lecture-wuxing-1",
  "lecture-3": "lecture-qiblood-1",
  "lecture-3-qiblood": "lecture-qiblood-1",
  "lecture-4": "lecture-lifedynamics-1",
  "lecture-4-lifedynamics": "lecture-lifedynamics-1",
  "lecture-5": "lecture-pathomechanism-1",
  "lecture-5-pathomechanism": "lecture-pathomechanism-1",
  "lecture-6": "lecture-diagnosis-1",
  "lecture-6-diagnosis": "lecture-diagnosis-1",
  "lecture-7": "lecture-treatment-1",
  "lecture-7-treatment": "lecture-treatment-1",
  "lecture-8": "lecture-practice-1",
  "lecture-8-practice": "lecture-practice-1",
};

export function resolveLegacyLectureId(rawId: string): string {
  return Object.hasOwn(OLD_ID_MAP, rawId) ? OLD_ID_MAP[rawId] : rawId;
}

export function originalLectureHref(lectureId: string, anchor?: string): string {
  return `/curriculum/${encodeURIComponent(lectureId)}?view=full${anchor ? `#${anchor}` : ""}`;
}

export function restoreLegacyExerciseHref(href: string): string {
  const bookmark = /^\/curriculum\/(lecture-[a-z0-9-]+)#(interactive-quiz-container|lecture-quiz|lecture-supplements)$/.exec(href);
  return bookmark ? originalLectureHref(bookmark[1], bookmark[2]) : href;
}

export function legacyLectureViewParams(params: URLSearchParams): URLSearchParams {
  const retained = new URLSearchParams();
  for (const key of ["focus", "review", "reviewSession", "course", "view"]) {
    const values = params.getAll(key);
    if (values.length === 1 && values[0] && (key !== "view" || values[0] === "full")) {
      retained.set(key, values[0]);
    }
  }
  return retained;
}

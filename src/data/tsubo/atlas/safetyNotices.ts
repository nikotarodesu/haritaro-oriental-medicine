import type { AcupointAtlasArticle } from "./types";

export function getAtlasSafetyNotices({ safetyWarning, pointWarning, symptomWarning }: AcupointAtlasArticle) {
  return { pointWarning, symptomWarning: symptomWarning ?? (pointWarning ? undefined : safetyWarning) };
}

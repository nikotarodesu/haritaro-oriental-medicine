import { assessmentRevisions } from "./assessment";
import { basicRevisions } from "./basics";
import { bodyFunctionRevisions } from "./bodyFunctions";
import { relationshipRevisions } from "./relationships";
import type { ReadingUnitRevision } from "./types";

export const readingUnitRevisions: Readonly<Record<string, ReadingUnitRevision | undefined>> = {
  ...basicRevisions,
  ...bodyFunctionRevisions,
  ...relationshipRevisions,
  ...assessmentRevisions,
};

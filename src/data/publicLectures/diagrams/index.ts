import { appliedDiagrams } from "./applied";
import { foundationDiagrams } from "./foundations";
import { practiceDiagrams } from "./practice";
import type { LectureDiagram } from "./types";

export const publicLectureDiagrams: Readonly<Record<string, LectureDiagram>> = {
  ...foundationDiagrams,
  ...appliedDiagrams,
  ...practiceDiagrams,
};

export function getPublicLectureDiagram(id: string): LectureDiagram | undefined {
  return Object.hasOwn(publicLectureDiagrams, id) ? publicLectureDiagrams[id] : undefined;
}

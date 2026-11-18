import type { SymptomGuide } from '@/types/oriental';

export const SYMPTOM_GUIDES_REVISED_AT = '2026-11-18';

export function symptomGuidePath(guide: Pick<SymptomGuide, 'id'>) {
  return `/symptoms/${guide.id}`;
}

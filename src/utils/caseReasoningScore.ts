import type { ReasonOption } from '@/data/caseReasoningRubrics';
export function gradeCaseReasoning(decisionPoints: number, reasons: readonly ReasonOption[], selectedIds: readonly string[]) {
  const selected = new Set(selectedIds);
  const correct = reasons.filter(reason => reason.supports);
  const matched = correct.filter(reason => selected.has(reason.id));
  const errors = reasons.filter(reason => !reason.supports && selected.has(reason.id));
  const reasoningPoints = Math.max(0, Math.round(4 * (matched.length - errors.length) / Math.max(1, correct.length)));
  const safetyReviewRequired = (decisionPoints < 2 && reasons.some(reason => reason.critical)) || reasons.some(reason => reason.critical && (reason.supports ? !selected.has(reason.id) : selected.has(reason.id)));
  return { decisionPoints, reasoningPoints, total: decisionPoints + reasoningPoints, max: 6, safetyReviewRequired,
    missing: correct.filter(reason => !selected.has(reason.id)), errors };
}

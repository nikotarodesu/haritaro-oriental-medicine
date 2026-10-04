import { PROGRESSIVE_CASES } from '@/data/progressiveCases';
import { CASE_REASONING_RUBRICS } from '@/data/caseReasoningRubrics';
import { CASE_REASON_FOCUS, CASE_STAGE_FOCUS, getLearningFocus, type LearningFocusId } from '@/data/learningFocus';
import { gradeCaseReasoning } from '@/utils/caseReasoningScore';
import { questionRevision } from '@/utils/learningReview';

export interface CaseLearningRecord {
  caseId: string;
  score: number;
  revision: string;
  answers: Record<number, number>;
  reasonAnswers: Record<number, string[]>;
  safetyReviewRequired: boolean;
  answeredAt: string;
}

export interface CaseLearningNeed {
  caseId: string;
  caseTitle: string;
  focusId: LearningFocusId;
  title: string;
  reason: string;
  href: string;
  safetyReviewRequired: boolean;
  answeredAt: string;
}

const revisionMap = new Map(PROGRESSIVE_CASES.map(item => [item.id, questionRevision(item.id, item.steps.map((step, index) => JSON.stringify([step, CASE_REASONING_RUBRICS[item.id][index]])), 0, 'reasoning-v1')]));
export function getCaseRevision(caseId: string): string | null { return revisionMap.get(caseId) || null; }

function object(value: unknown): value is Record<string, unknown> { return !!value && typeof value === 'object' && !Array.isArray(value); }

/** Reject incomplete, obsolete and mismatched records without changing saved history. */
export function validCaseLearningRecord(value: unknown): value is CaseLearningRecord {
  if (!object(value) || typeof value.caseId !== 'string') return false;
  const item = PROGRESSIVE_CASES.find(c => c.id === value.caseId);
  if (!item || value.revision !== getCaseRevision(item.id) || !object(value.answers) || !object(value.reasonAnswers)
    || typeof value.answeredAt !== 'string' || !/^\d{4}-\d{2}-\d{2}T/.test(value.answeredAt) || !Number.isFinite(Date.parse(value.answeredAt))
    || new Date(value.answeredAt).toISOString() !== value.answeredAt
    || typeof value.safetyReviewRequired !== 'boolean' || !Number.isInteger(value.score)) return false;
  const answers = value.answers;
  const reasons = value.reasonAnswers;
  if (Object.keys(answers).length !== item.steps.length || Object.keys(reasons).length !== item.steps.length) return false;
  const grades = [];
  for (let index = 0; index < item.steps.length; index++) {
    const choice = answers[index];
    const selected = reasons[index];
    const rubric = CASE_REASONING_RUBRICS[item.id][index];
    if (typeof choice !== 'number' || !Number.isInteger(choice) || choice < 0 || choice >= item.steps[index].options.length
      || !Array.isArray(selected) || !selected.length || selected.some(id => typeof id !== 'string' || !rubric.some(reason => reason.id === id))
      || new Set(selected).size !== selected.length) return false;
    grades.push(gradeCaseReasoning(item.steps[index].options[choice].points, rubric, selected));
  }
  return value.score === grades.reduce((sum, grade) => sum + grade.total, 0)
    && value.safetyReviewRequired === grades.some(grade => grade.safetyReviewRequired);
}

export function readCaseLearningRecords(values: Readonly<Record<string, unknown>>, caseId?: string): CaseLearningRecord[] {
  const records = new Map<string, CaseLearningRecord>();
  for (const [key, value] of Object.entries(values)) {
    if (!key.startsWith('case:') || !validCaseLearningRecord(value) || (caseId && value.caseId !== caseId)) continue;
    if (key !== `case:${value.caseId}` && !key.startsWith('case:attempt-')) continue;
    const identity = `${value.caseId}:${value.answeredAt}:${JSON.stringify(value.answers)}:${JSON.stringify(value.reasonAnswers)}`;
    records.set(identity, value);
  }
  return [...records.values()].sort((a, b) => a.answeredAt.localeCompare(b.answeredAt));
}

export function getCaseStageFocusIds(caseId: string, stageIndex: number, decisionPoints: number, selectedIds: readonly string[]): LearningFocusId[] {
  const rubric = CASE_REASONING_RUBRICS[caseId]?.[stageIndex];
  if (!rubric) return [];
  const grade = gradeCaseReasoning(decisionPoints, rubric, selectedIds);
  const focus = new Set<LearningFocusId>();
  for (const reason of [...grade.missing, ...grade.errors]) {
    const mapped = CASE_REASON_FOCUS[caseId]?.[stageIndex]?.[reason.id];
    if (mapped) focus.add(mapped);
  }
  if (decisionPoints < 2) focus.add(CASE_STAGE_FOCUS[stageIndex]);
  if (grade.safetyReviewRequired) focus.add('safety-check');
  return [...focus].sort((a, b) => getLearningFocus(a)!.priority - getLearningFocus(b)!.priority);
}

export function getCaseLearningNeeds(values: Readonly<Record<string, unknown>>): CaseLearningNeed[] {
  const latest = new Map<string, CaseLearningRecord>();
  for (const record of readCaseLearningRecords(values)) latest.set(record.caseId, record);
  const needs: CaseLearningNeed[] = [];
  for (const record of latest.values()) {
    const item = PROGRESSIVE_CASES.find(c => c.id === record.caseId)!;
    const seen = new Set<LearningFocusId>();
    item.steps.forEach((step, index) => {
      const grade = gradeCaseReasoning(step.options[record.answers[index]].points, CASE_REASONING_RUBRICS[item.id][index], record.reasonAnswers[index]);
      for (const focusId of getCaseStageFocusIds(item.id, index, grade.decisionPoints, record.reasonAnswers[index])) {
        if (seen.has(focusId)) continue;
        seen.add(focusId);
        const focus = getLearningFocus(focusId)!;
        const reason = [...grade.missing, ...grade.errors].find(reason => CASE_REASON_FOCUS[item.id][index][reason.id] === focusId);
        needs.push({ caseId: item.id, caseTitle: item.title, focusId, title: focus.title,
          reason: reason ? `${step.domain}で確認したいこと：${reason.feedback}` : `${step.domain}で選んだ判断の根拠を、教材の解説と照らして振り返ります。`,
          href: `/kokushi?focus=${focusId}#learning-focus-review`, safetyReviewRequired: focusId === 'safety-check', answeredAt: record.answeredAt });
      }
    });
  }
  return needs.sort((a, b) => getLearningFocus(a.focusId)!.priority - getLearningFocus(b.focusId)!.priority || b.answeredAt.localeCompare(a.answeredAt));
}

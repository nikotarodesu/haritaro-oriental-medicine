import { CLINICAL_SIGNS, OBSERVATION_LABELS, type ClinicalObservations, type ClinicalSignId, type ObservationStatus } from '@/data/clinicalWorkflow';
import { EXAMINATION_FIELDS, examinationValue, resolvedExaminationObservations, updateExaminationValue, type ClinicalExamination } from '@/data/clinicalExamination';

export interface ClinicalFindingState { observations: ClinicalObservations; examination?: ClinicalExamination; }
type FindingDelta = { kind: 'observation'; id: ClinicalSignId; before?: ObservationStatus; after?: ObservationStatus }
  | { kind: 'examination'; id: string; before?: string; after?: string };
export interface ClinicalFindingEdit {
  id: number; label: string; undone?: boolean; examinationWasDefined: boolean; deltas: FindingDelta[];
  items: { label: string; before: string; after: string; linked: boolean }[];
}

/** Draft history is bounded and contains only catalogue choices, never arbitrary field keys. */
export function validClinicalFindingHistory(value: unknown): value is ClinicalFindingEdit[] {
  if (!Array.isArray(value) || value.length > 20) return false;
  let previousId = 0;
  const choices = new Map<string, readonly string[]>([
    ...EXAMINATION_FIELDS.map(field => [field.label, ['未確認', ...field.options]] as const),
    ...CLINICAL_SIGNS.map(sign => [sign.label, Object.values(OBSERVATION_LABELS)] as const),
  ]);
  return value.every(edit => {
    if (!edit || typeof edit !== 'object' || !Number.isSafeInteger(edit.id) || edit.id <= previousId || edit.id >= Number.MAX_SAFE_INTEGER - 1 || !choices.has(edit.label) || typeof edit.examinationWasDefined !== 'boolean' || edit.undone !== undefined && typeof edit.undone !== 'boolean') return false;
    previousId = edit.id;
    if (!Array.isArray(edit.deltas) || !edit.deltas.length || edit.deltas.length > EXAMINATION_FIELDS.length + CLINICAL_SIGNS.length || !Array.isArray(edit.items) || !edit.items.length || edit.items.length > edit.deltas.length) return false;
    const keys = new Set<string>(), labels = new Set<string>();
    return edit.deltas.every((delta: FindingDelta) => {
      if (!delta || typeof delta !== 'object') return false;
      const options = delta.kind === 'examination' ? EXAMINATION_FIELDS.find(field => field.id === delta.id)?.options : delta.kind === 'observation' && CLINICAL_SIGNS.some(sign => sign.id === delta.id) ? ['unknown', 'present', 'absent'] : undefined;
      const key = `${delta.kind}:${delta.id}`;
      if (!options || keys.has(key) || ![delta.before, delta.after].every(choice => choice === undefined || typeof choice === 'string' && (choice === '' && delta.kind === 'examination' || options.includes(choice)))) return false;
      keys.add(key); return true;
    }) && edit.items.every((item: ClinicalFindingEdit['items'][number]) => {
      if (!item || typeof item !== 'object' || labels.has(item.label) || typeof item.linked !== 'boolean' || !choices.get(item.label)?.includes(item.before) || !choices.get(item.label)?.includes(item.after)) return false;
      labels.add(item.label); return true;
    });
  });
}

/** Use the same descriptive choices and legacy composite meaning in both examination and comparison. */
export function clinicalExaminationPatch(current: ClinicalFindingState, id: string, value: string): ClinicalFindingState {
  const previous = (id === 'painQuality' || id === 'painLocation') && current.observations.fixedPain === 'present' ? {
    ...current.examination,
    painQuality: examinationValue('painQuality', current.examination, current.observations),
    painLocation: examinationValue('painLocation', current.examination, current.observations),
  } : current.examination;
  const examination = updateExaminationValue(previous, id, value);
  return { examination, observations: resolvedExaminationObservations(current.observations, examination) };
}

const MAPPED_FIELDS: Partial<Record<ClinicalSignId, readonly string[]>> = {
  paleTongue: ['tongueColor'], redTongue: ['tongueColor'], greasyCoat: ['coatColor', 'coatThickness', 'coatTexture', 'coatMoisture'],
  weakPulse: ['pulseStrength'], rapidPulse: ['pulseSpeed'], fixedPain: ['painQuality', 'painLocation'],
};

export function clinicalFindingEdit(before: ClinicalFindingState, after: ClinicalFindingState, target: { kind: 'observation' | 'examination'; id: string }, id: number): ClinicalFindingEdit | null {
  const deltas: FindingDelta[] = [];
  for (const field of EXAMINATION_FIELDS) if (before.examination?.[field.id] !== after.examination?.[field.id]) deltas.push({ kind: 'examination', id: field.id, before: before.examination?.[field.id], after: after.examination?.[field.id] });
  const touchedFields = new Set(deltas.filter(delta => delta.kind === 'examination').map(delta => delta.id));
  for (const sign of CLINICAL_SIGNS) {
    const affected = target.kind === 'observation' && target.id === sign.id || MAPPED_FIELDS[sign.id]?.some(field => touchedFields.has(field));
    if (affected && before.observations[sign.id] !== after.observations[sign.id]) deltas.push({ kind: 'observation', id: sign.id, before: before.observations[sign.id], after: after.observations[sign.id] });
  }
  const resolvedBefore = resolvedExaminationObservations(before.observations, before.examination);
  const resolvedAfter = resolvedExaminationObservations(after.observations, after.examination);
  const items = deltas.flatMap(delta => {
    if (delta.kind === 'examination') {
      const from = examinationValue(delta.id, before.examination, before.observations) || '未確認';
      const to = examinationValue(delta.id, after.examination, after.observations) || '未確認';
      return from === to ? [] : [{ label: EXAMINATION_FIELDS.find(field => field.id === delta.id)!.label, before: from, after: to, linked: target.kind !== delta.kind || target.id !== delta.id }];
    }
    if (MAPPED_FIELDS[delta.id]?.some(field => touchedFields.has(field))) return [];
    const from = OBSERVATION_LABELS[resolvedBefore[delta.id] || 'unknown'], to = OBSERVATION_LABELS[resolvedAfter[delta.id] || 'unknown'];
    return from === to ? [] : [{ label: CLINICAL_SIGNS.find(sign => sign.id === delta.id)!.label, before: from, after: to, linked: target.kind !== delta.kind || target.id !== delta.id }];
  });
  if (!items.length) return null;
  const label = target.kind === 'examination' ? EXAMINATION_FIELDS.find(field => field.id === target.id)?.label : CLINICAL_SIGNS.find(sign => sign.id === target.id)?.label;
  return { id, label: label || items[0].label, examinationWasDefined: before.examination !== undefined, deltas, items };
}

/** Do not overwrite a field subsequently edited elsewhere. Unrelated fields can remain changed. */
export function canUndoClinicalFindingEdit(current: ClinicalFindingState, edit: ClinicalFindingEdit): boolean {
  return !edit.undone && edit.deltas.every(delta => (delta.kind === 'examination' ? current.examination?.[delta.id] : current.observations[delta.id]) === delta.after);
}

export function undoClinicalFindingEdit(current: ClinicalFindingState, edit: ClinicalFindingEdit): ClinicalFindingState | null {
  if (!canUndoClinicalFindingEdit(current, edit)) return null;
  const observations = { ...current.observations }, examination = { ...current.examination };
  for (const delta of edit.deltas) {
    if (delta.kind === 'examination') { if (delta.before === undefined) delete examination[delta.id]; else examination[delta.id] = delta.before; }
    else if (delta.before === undefined) delete observations[delta.id]; else observations[delta.id] = delta.before;
  }
  return { observations, examination: !edit.examinationWasDefined && !Object.keys(examination).length ? undefined : examination };
}

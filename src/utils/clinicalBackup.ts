import type { ClinicalMemoItem, PatientNoteItem } from '@/types/clinicalMemo';

const APP = 'haritaro_oriental_medicine_mynote';
const isObject = (value: unknown): value is Record<string, unknown> => !!value && typeof value === 'object' && !Array.isArray(value);
const strings = (value: unknown): value is string[] => Array.isArray(value) && value.every(item => typeof item === 'string');
const optionalStrings = (value: Record<string, unknown>, fields: string[]) => fields.every(field => value[field] === undefined || typeof value[field] === 'string');
const timestamps = (value: Record<string, unknown>) => ['createdAt', 'updatedAt'].every(field => typeof value[field] === 'number' && Number.isFinite(value[field]) && value[field] >= 0 && value[field] <= 8.64e15);

function validMemo(value: unknown): value is ClinicalMemoItem {
  return isObject(value) && typeof value.id === 'string' && !!value.id.trim()
    && ['pair', 'tsubo', 'diagnosis', 'custom'].includes(value.type as string)
    && typeof value.title === 'string' && typeof value.summary === 'string'
    && strings(value.points) && strings(value.indications) && strings(value.elements)
    && value.elements.every(element => ['木', '火', '土', '金', '水'].includes(element))
    && optionalStrings(value, ['subTitle', 'mechanism', 'caution', 'personalNotes']) && timestamps(value);
}

function validNote(value: unknown): value is PatientNoteItem {
  return isObject(value) && typeof value.id === 'string' && !!value.id.trim()
    && typeof value.patientIdentifier === 'string' && typeof value.chiefComplaint === 'string'
    && typeof value.visitDate === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value.visitDate)
    && strings(value.selectedPoints) && (value.selfCarePoints === undefined || strings(value.selfCarePoints))
    && (value.gender === undefined || ['男性', '女性', 'その他', '未回答'].includes(value.gender as string))
    && optionalStrings(value, ['ageGroup', 'constitution', 'syndrome', 'treatmentPlan', 'patientReaction', 'nextAction']) && timestamps(value);
}

/** Validate the entire backup before changing either collection. */
export function parseClinicalBackup(raw: string): { memos: ClinicalMemoItem[]; patientNotes: PatientNoteItem[] } {
  const value: unknown = JSON.parse(raw);
  if (!isObject(value) || value.appName !== APP || value.version !== 1
    || !Array.isArray(value.memos) || !value.memos.every(validMemo)
    || !Array.isArray(value.patientNotes) || !value.patientNotes.every(validNote)
    || new Set(value.memos.map(item => item.id)).size !== value.memos.length
    || new Set(value.patientNotes.map(item => item.id)).size !== value.patientNotes.length) {
    throw new Error('バックアップの形式または記録の内容が正しくありません。はり太郎から保存したJSONファイルを選んでください。');
  }
  return { memos: value.memos, patientNotes: value.patientNotes };
}

/** Import never deletes current records or overwrites edits made since a backup. */
export function mergeClinicalBackup<T extends { id: string }>(current: T[], incoming: T[]): T[] {
  const ids = new Set(current.map(item => item.id));
  return [...incoming.filter(item => !ids.has(item.id)), ...current];
}

/** A failed second write rolls back the first; callers publish UI state only on success. */
export function persistClinicalBackup(storage: Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>, keys: { memos: string; notes: string }, memos: ClinicalMemoItem[], notes: PatientNoteItem[]): void {
  const previous = storage.getItem(keys.memos);
  storage.setItem(keys.memos, JSON.stringify(memos));
  try { storage.setItem(keys.notes, JSON.stringify(notes)); }
  catch (error) {
    if (previous === null) storage.removeItem(keys.memos);
    else storage.setItem(keys.memos, previous);
    throw error;
  }
}

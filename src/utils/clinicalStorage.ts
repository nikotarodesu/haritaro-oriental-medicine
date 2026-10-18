import type { ClinicalMemoItem, PatientNoteItem } from '@/types/clinicalMemo';

export const LEGACY_CLINICAL_MEMOS_KEY = 'haritaro_clinical_memos_v1';
export const LEGACY_PATIENT_NOTES_KEY = 'haritaro_patient_notes_v1';
export const CLINICAL_ACTIVE_OWNER_KEY = 'haritaro_clinical_active_owner_v1';

export function clinicalStorageKeys(owner: string = 'guest') {
  const scope = owner === 'guest' ? 'guest' : 'account:' + encodeURIComponent(owner);
  return { memos: 'haritaro_clinical_memos_v2:' + scope, notes: 'haritaro_patient_notes_v2:' + scope };
}

function readArray<T>(storage: Pick<Storage, 'getItem'>, key: string, fallback?: string): T[] {
  const scoped = storage.getItem(key);
  const raw = scoped === null && fallback ? storage.getItem(fallback) : scoped;
  if (raw === null) return [];
  const value: unknown = JSON.parse(raw);
  if (!Array.isArray(value)) throw new Error('Invalid clinical storage snapshot');
  return value as T[];
}

/** Unowned v1 data is visible only in guest mode; original keys are never changed. */
export function readClinicalStorage(storage: Pick<Storage, 'getItem'>, owner: string) {
  const keys = clinicalStorageKeys(owner);
  return {
    memos: readArray<ClinicalMemoItem>(storage, keys.memos, owner === 'guest' ? LEGACY_CLINICAL_MEMOS_KEY : undefined),
    notes: readArray<PatientNoteItem>(storage, keys.notes, owner === 'guest' ? LEGACY_PATIENT_NOTES_KEY : undefined),
  };
}

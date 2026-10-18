import { clinicalDraftOwnerMatches, clinicalDraftStorageKey, type DraftPatientNote } from './draftNote';
import { clinicalToday } from './clinicalEncounter';
export interface ClinicalNoteEditorFields {
  patientIdentifier: string; gender: '' | '男性' | '女性' | 'その他' | '未回答'; ageGroup: string; visitDate: string;
  chiefComplaint: string; constitution: string; syndrome: string; selectedPointsInput: string; selfCarePointsInput: string;
  treatmentPlan: string; patientReaction: string; nextAction: string;
}
export interface ClinicalNoteEditorDraft {
  version: 1; id: string; owner: string; editingNoteId?: string; handoffToken?: string; sourceTool?: string;
  fields: ClinicalNoteEditorFields;
}
const KEY = 'haritaro_clinical_note_editor_v1';
export function createClinicalNoteEditorId(): string { return `editor_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`; }
export function emptyClinicalNoteEditor(): ClinicalNoteEditorFields {
  return { patientIdentifier: '', gender: '', ageGroup: '', visitDate: clinicalToday(), chiefComplaint: '', constitution: '', syndrome: '', selectedPointsInput: '', selfCarePointsInput: '', treatmentPlan: '', patientReaction: '', nextAction: '' };
}
export function clinicalNoteEditorFromHandoff(draft: DraftPatientNote, fallbackId: string): ClinicalNoteEditorFields {
  return { ...emptyClinicalNoteEditor(), patientIdentifier: draft.patientIdentifier || fallbackId, visitDate: draft.visitDate || clinicalToday(), chiefComplaint: draft.chiefComplaint || '', constitution: draft.constitution || '', syndrome: draft.syndrome || '', selectedPointsInput: draft.selectedPointsInput || '', treatmentPlan: draft.treatmentPlan || '', patientReaction: draft.patientReaction || '', nextAction: draft.nextAction || '' };
}
export function readClinicalNoteEditor(owner: string): ClinicalNoteEditorDraft | null {
  if (!clinicalDraftOwnerMatches(owner)) return null;
  try {
    const raw = sessionStorage.getItem(clinicalDraftStorageKey(KEY));
    if (!raw) return null;
    const value = JSON.parse(raw);
    if (value?.version !== 1 || value.owner !== owner || typeof value.id !== 'string' || !value.fields) return null;
    if (!Object.keys(emptyClinicalNoteEditor()).every(key => typeof value.fields[key] === 'string')) return null;
    if (!['', '男性', '女性', 'その他', '未回答'].includes(value.fields.gender)) return null;
    return value as ClinicalNoteEditorDraft;
  } catch { return null; }
}
export function writeClinicalNoteEditor(draft: ClinicalNoteEditorDraft, owner: string): boolean {
  if (draft.owner !== owner || !clinicalDraftOwnerMatches(owner)) return false;
  try { sessionStorage.setItem(clinicalDraftStorageKey(KEY), JSON.stringify(draft)); return true; } catch { return false; }
}
export function clearClinicalNoteEditor(expectedId: string, owner: string): boolean {
  if (!clinicalDraftOwnerMatches(owner)) return false;
  try {
    const key = clinicalDraftStorageKey(KEY);
    const raw = sessionStorage.getItem(key);
    if (raw === null) return true;
    const draft = JSON.parse(raw);
    if (draft?.version !== 1 || draft.owner !== owner || draft.id !== expectedId || !draft.fields) return false;
    if (!Object.keys(emptyClinicalNoteEditor()).every(key => typeof draft.fields[key] === 'string') || !['', '男性', '女性', 'その他', '未回答'].includes(draft.fields.gender)) return false;
    sessionStorage.removeItem(key); return true;
  } catch { return false; }
}

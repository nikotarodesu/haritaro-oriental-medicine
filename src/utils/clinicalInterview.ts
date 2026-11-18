import { DIAGNOSIS_QUESTIONS } from '@/data/diagnosisData';
import { clinicalDraftOwnerMatches } from './draftNote';
export type ClinicalQuestionStatus = 'unconfirmed' | 'applicable' | 'not_applicable' | 'unknown';
export interface ClinicalInterviewDraft { patientIdentifier: string; statuses: Record<number, ClinicalQuestionStatus>; notes: Record<number, string>; }
const KEY = 'haritaro_clinical_interview_v1';
function interviewStorageKey(owner: string): string {
  return owner === 'guest' ? KEY : `${KEY}:${encodeURIComponent(owner)}`;
}
export function readClinicalInterview(owner: string): ClinicalInterviewDraft | null {
  if (owner !== 'guest' && !clinicalDraftOwnerMatches(owner)) return null;
  try {
    const raw = sessionStorage.getItem(interviewStorageKey(owner)); if (!raw) return null;
    const value = JSON.parse(raw);
    if (typeof value?.patientIdentifier !== 'string' || !value.statuses || !value.notes) return null;
    if (!Object.entries(value.statuses).every(([id, status]) => DIAGNOSIS_QUESTIONS.some(item => item.id === Number(id)) && ['unconfirmed', 'applicable', 'not_applicable', 'unknown'].includes(String(status)))) return null;
    if (!Object.entries(value.notes).every(([id, note]) => DIAGNOSIS_QUESTIONS.some(item => item.id === Number(id)) && typeof note === 'string' && note.length <= 1000)) return null;
    return value as ClinicalInterviewDraft;
  } catch { return null; }
}
export function writeClinicalInterview(draft: ClinicalInterviewDraft, owner: string): boolean {
  if (owner !== 'guest' && !clinicalDraftOwnerMatches(owner)) return false;
  try { sessionStorage.setItem(interviewStorageKey(owner), JSON.stringify(draft)); return true; } catch { return false; }
}
export function clearClinicalInterview(owner: string): boolean {
  if (owner !== 'guest' && !clinicalDraftOwnerMatches(owner)) return false;
  try { sessionStorage.removeItem(interviewStorageKey(owner)); return true; } catch { return false; }
}

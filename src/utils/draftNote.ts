/** Owner-scoped tool handoffs. Receiving a draft does not consume it. */
export interface DraftPatientNote {
  sourceTool: "気血水体質チェック" | "対面問診メモ" | "五労チェッカー" | "臨床弁証シミュレーター" | "配穴設計" | "カリキュラム講義" | "臨床ワークスペース";
  patientIdentifier?: string;
  constitution?: string;
  syndrome?: string;
  chiefComplaint?: string;
  selectedPointsInput?: string;
  treatmentPlan?: string;
  patientReaction?: string;
  nextAction?: string;
  visitDate?: string;
  createdAt: string;
  handoffId?: string;
}
const STORAGE_KEY = "haritaro_draft_patient_note";
export function clinicalDraftOwnerMatches(expectedOwner?: string): boolean {
  try { return expectedOwner === undefined || (sessionStorage.getItem('haritaro_clinical_active_owner_v1') || 'guest') === expectedOwner; } catch { return false; }
}
export function clinicalDraftStorageKey(base: string): string {
  const owner = sessionStorage.getItem('haritaro_clinical_active_owner_v1');
  return owner && owner !== 'guest' ? base + ':' + encodeURIComponent(owner) : base;
}
export function draftPatientNoteToken(draft: DraftPatientNote): string { return draft.handoffId || JSON.stringify(draft); }
export function saveDraftPatientNote(draft: Omit<DraftPatientNote, "createdAt">, expectedOwner?: string): boolean {
  if (typeof window === "undefined" || !clinicalDraftOwnerMatches(expectedOwner)) return false;
  try {
    const fullDraft: DraftPatientNote = { ...draft, createdAt: new Date().toISOString(), handoffId: `draft_${Date.now()}_${Math.random().toString(36).slice(2, 10)}` };
    sessionStorage.setItem(clinicalDraftStorageKey(STORAGE_KEY), JSON.stringify(fullDraft));
    return true;
  } catch { return false; }
}
export function loadDraftPatientNote(expectedOwner?: string): DraftPatientNote | null {
  if (typeof window === "undefined" || !clinicalDraftOwnerMatches(expectedOwner)) return null;
  try {
    const saved = sessionStorage.getItem(clinicalDraftStorageKey(STORAGE_KEY));
    if (!saved) return null;
    const value = JSON.parse(saved);
    if (!value || typeof value !== 'object' || typeof value.sourceTool !== 'string' || typeof value.createdAt !== 'string') return null;
    for (const key of ['patientIdentifier', 'constitution', 'syndrome', 'chiefComplaint', 'selectedPointsInput', 'treatmentPlan', 'patientReaction', 'nextAction', 'visitDate', 'handoffId']) if (value[key] !== undefined && typeof value[key] !== 'string') return null;
    return value as DraftPatientNote;
  } catch { return null; }
}
/** Delete only the handoff the caller actually reviewed; a newer handoff is retained. */
export function clearDraftPatientNote(expectedToken: string, expectedOwner?: string): boolean {
  if (typeof window === 'undefined' || !clinicalDraftOwnerMatches(expectedOwner)) return false;
  try {
    const key = clinicalDraftStorageKey(STORAGE_KEY);
    const raw = sessionStorage.getItem(key);
    if (raw === null) return true;
    const current = JSON.parse(raw);
    if (!current || typeof current.sourceTool !== 'string' || typeof current.createdAt !== 'string') return false;
    if (draftPatientNoteToken(current) !== expectedToken) return true;
    sessionStorage.removeItem(key);
    return true;
  } catch { return false; }
}
/** Legacy consumers can still explicitly consume a handoff. New editors use load + clear after save. */
export function loadAndClearDraftPatientNote(): DraftPatientNote | null {
  const draft = loadDraftPatientNote();
  return draft && clearDraftPatientNote(draftPatientNoteToken(draft)) ? draft : null;
}

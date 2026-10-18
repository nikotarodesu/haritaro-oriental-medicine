/**
 * ツールから臨床ノートへの安全な下書き引き渡しユーティリティ
 * 患者個人情報や本文をURLに露出させず、sessionStorageで引き渡します
 */

export interface DraftPatientNote {
  sourceTool: "気血水体質チェック" | "五労チェッカー" | "臨床弁証シミュレーター" | "配穴設計" | "カリキュラム講義" | "臨床ワークスペース";
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
}

const STORAGE_KEY = "haritaro_draft_patient_note";
function draftStorageKey() {
  const owner = sessionStorage.getItem('haritaro_clinical_active_owner_v1');
  return owner && owner !== 'guest' ? STORAGE_KEY + ':' + encodeURIComponent(owner) : STORAGE_KEY;
}


export function saveDraftPatientNote(draft: Omit<DraftPatientNote, "createdAt">): boolean {
  if (typeof window === "undefined") return false;
  try {
    const fullDraft: DraftPatientNote = {
      ...draft,
      createdAt: new Date().toISOString(),
    };
    sessionStorage.setItem(draftStorageKey(), JSON.stringify(fullDraft));
    return true;
  } catch (e) {
    console.error("Failed to save draft patient note", e);
    return false;
  }
}

export function loadAndClearDraftPatientNote(): DraftPatientNote | null {
  if (typeof window === "undefined") return null;
  try {
    const saved = sessionStorage.getItem(draftStorageKey());
    if (!saved) return null;
    sessionStorage.removeItem(draftStorageKey());
    return JSON.parse(saved) as DraftPatientNote;
  } catch (e) {
    console.error("Failed to load draft patient note", e);
    return null;
  }
}

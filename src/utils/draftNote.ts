/**
 * ツールから臨床ノートへの安全な下書き引き渡しユーティリティ
 * 患者個人情報や本文をURLに露出させず、sessionStorageで引き渡します
 */

export interface DraftPatientNote {
  sourceTool: "気血水体質チェック" | "五労チェッカー" | "臨床弁証シミュレーター" | "配穴設計";
  constitution?: string;
  syndrome?: string;
  chiefComplaint?: string;
  selectedPointsInput?: string;
  treatmentPlan?: string;
  patientReaction?: string;
  nextAction?: string;
  createdAt: string;
}

const STORAGE_KEY = "haritaro_draft_patient_note";

export function saveDraftPatientNote(draft: Omit<DraftPatientNote, "createdAt">): void {
  if (typeof window === "undefined") return;
  try {
    const fullDraft: DraftPatientNote = {
      ...draft,
      createdAt: new Date().toISOString(),
    };
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(fullDraft));
  } catch (e) {
    console.error("Failed to save draft patient note", e);
  }
}

export function loadAndClearDraftPatientNote(): DraftPatientNote | null {
  if (typeof window === "undefined") return null;
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (!saved) return null;
    sessionStorage.removeItem(STORAGE_KEY);
    return JSON.parse(saved) as DraftPatientNote;
  } catch (e) {
    console.error("Failed to load draft patient note", e);
    return null;
  }
}

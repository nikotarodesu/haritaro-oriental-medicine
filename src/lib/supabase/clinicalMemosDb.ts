import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { ClinicalMemoItem, PatientNoteItem } from "@/types/clinicalMemo";

// データベースレコード型（スネークケース）
interface PatientNoteRow {
  id: string;
  user_id: string;
  patient_identifier: string;
  gender: string | null;
  age_group: string | null;
  visit_date: string;
  chief_complaint: string;
  constitution: string | null;
  syndrome: string | null;
  selected_points: string[];
  treatment_plan: string | null;
  patient_reaction: string | null;
  next_action: string | null;
  created_at: number;
  updated_at: number;
}

interface ClinicalMemoRow {
  id: string;
  user_id: string;
  type: string;
  title: string;
  sub_title: string | null;
  points: string[];
  elements: string[];
  indications: string[];
  summary: string;
  mechanism: string | null;
  caution: string | null;
  personal_notes: string | null;
  created_at: number;
  updated_at: number;
}

// 変換: Row ➜ PatientNoteItem
export function rowToPatientNote(row: PatientNoteRow): PatientNoteItem {
  return {
    id: row.id,
    patientIdentifier: row.patient_identifier,
    gender: (row.gender as any) || undefined,
    ageGroup: row.age_group || undefined,
    visitDate: row.visit_date,
    chiefComplaint: row.chief_complaint,
    constitution: row.constitution || undefined,
    syndrome: row.syndrome || undefined,
    selectedPoints: row.selected_points || [],
    treatmentPlan: row.treatment_plan || undefined,
    patientReaction: row.patient_reaction || undefined,
    nextAction: row.next_action || undefined,
    createdAt: Number(row.created_at),
    updatedAt: Number(row.updated_at),
  };
}

// 変換: PatientNoteItem ➜ Row
export function patientNoteToRow(userId: string, note: PatientNoteItem): PatientNoteRow {
  return {
    id: note.id,
    user_id: userId,
    patient_identifier: note.patientIdentifier,
    gender: note.gender || null,
    age_group: note.ageGroup || null,
    visit_date: note.visitDate,
    chief_complaint: note.chiefComplaint,
    constitution: note.constitution || null,
    syndrome: note.syndrome || null,
    selected_points: note.selectedPoints || [],
    treatment_plan: note.treatmentPlan || null,
    patient_reaction: note.patientReaction || null,
    next_action: note.nextAction || null,
    created_at: note.createdAt,
    updated_at: note.updatedAt,
  };
}

// 変換: Row ➜ ClinicalMemoItem
export function rowToClinicalMemo(row: ClinicalMemoRow): ClinicalMemoItem {
  return {
    id: row.id,
    type: row.type as any,
    title: row.title,
    subTitle: row.sub_title || undefined,
    points: row.points || [],
    elements: (row.elements as any) || [],
    indications: row.indications || [],
    summary: row.summary,
    mechanism: row.mechanism || undefined,
    caution: row.caution || undefined,
    personalNotes: row.personal_notes || undefined,
    createdAt: Number(row.created_at),
    updatedAt: Number(row.updated_at),
  };
}

// 変換: ClinicalMemoItem ➜ Row
export function clinicalMemoToRow(userId: string, memo: ClinicalMemoItem): ClinicalMemoRow {
  return {
    id: memo.id,
    user_id: userId,
    type: memo.type,
    title: memo.title,
    sub_title: memo.subTitle || null,
    points: memo.points || [],
    elements: memo.elements || [],
    indications: memo.indications || [],
    summary: memo.summary,
    mechanism: memo.mechanism || null,
    caution: memo.caution || null,
    personal_notes: memo.personalNotes || null,
    created_at: memo.createdAt,
    updated_at: memo.updatedAt,
  };
}

// ==============================================================================
// Supabase 操作関数
// ==============================================================================

/** ログインユーザーの臨床ノートを全件取得 */
export async function fetchPatientNotesFromSupabase(): Promise<PatientNoteItem[] | null> {
  if (!isSupabaseConfigured()) return null;
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("patient_notes")
      .select("*")
      .order("updated_at", { ascending: false });

    if (error) {
      console.warn("Supabase fetch patient_notes error:", error.message);
      return null;
    }
    return (data as PatientNoteRow[]).map(rowToPatientNote);
  } catch (e) {
    console.warn("Supabase connection failed:", e);
    return null;
  }
}

/** 臨床ノートを保存（新規または更新） */
export async function upsertPatientNoteToSupabase(userId: string, note: PatientNoteItem): Promise<boolean> {
  if (!isSupabaseConfigured()) return false;
  try {
    const supabase = createClient();
    const row = patientNoteToRow(userId, note);
    const { error } = await supabase.from("patient_notes").upsert(row);
    if (error) {
      console.warn("Supabase upsert patient_notes error:", error.message);
      return false;
    }
    return true;
  } catch (e) {
    console.warn("Supabase upsert error:", e);
    return false;
  }
}

/** 臨床ノートを削除 */
export async function deletePatientNoteFromSupabase(noteId: string): Promise<boolean> {
  if (!isSupabaseConfigured()) return false;
  try {
    const supabase = createClient();
    const { error } = await supabase.from("patient_notes").delete().eq("id", noteId);
    if (error) {
      console.warn("Supabase delete patient_notes error:", error.message);
      return false;
    }
    return true;
  } catch (e) {
    console.warn("Supabase delete error:", e);
    return false;
  }
}

/** ログインユーザーの配穴ストックを全件取得 */
export async function fetchClinicalMemosFromSupabase(): Promise<ClinicalMemoItem[] | null> {
  if (!isSupabaseConfigured()) return null;
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("clinical_memos")
      .select("*")
      .order("updated_at", { ascending: false });

    if (error) {
      console.warn("Supabase fetch clinical_memos error:", error.message);
      return null;
    }
    return (data as ClinicalMemoRow[]).map(rowToClinicalMemo);
  } catch (e) {
    console.warn("Supabase connection failed:", e);
    return null;
  }
}

/** 配穴ストックを保存（新規または更新） */
export async function upsertClinicalMemoToSupabase(userId: string, memo: ClinicalMemoItem): Promise<boolean> {
  if (!isSupabaseConfigured()) return false;
  try {
    const supabase = createClient();
    const row = clinicalMemoToRow(userId, memo);
    const { error } = await supabase.from("clinical_memos").upsert(row);
    if (error) {
      console.warn("Supabase upsert clinical_memos error:", error.message);
      return false;
    }
    return true;
  } catch (e) {
    console.warn("Supabase upsert error:", e);
    return false;
  }
}

/** 配穴ストックを削除 */
export async function deleteClinicalMemoFromSupabase(memoId: string): Promise<boolean> {
  if (!isSupabaseConfigured()) return false;
  try {
    const supabase = createClient();
    const { error } = await supabase.from("clinical_memos").delete().eq("id", memoId);
    if (error) {
      console.warn("Supabase delete clinical_memos error:", error.message);
      return false;
    }
    return true;
  } catch (e) {
    console.warn("Supabase delete error:", e);
    return false;
  }
}

/** 未ログイン時のローカルデータをSupabaseへ移行（同期） */
export async function syncLocalDataToSupabase(
  userId: string,
  localNotes: PatientNoteItem[],
  localMemos: ClinicalMemoItem[]
): Promise<{ notesSynced: number; memosSynced: number }> {
  if (!isSupabaseConfigured()) return { notesSynced: 0, memosSynced: 0 };
  let notesSynced = 0;
  let memosSynced = 0;

  try {
    const supabase = createClient();

    // 1. ローカルノートの同期
    if (localNotes.length > 0) {
      const rows = localNotes.map((n) => patientNoteToRow(userId, n));
      const { error } = await supabase.from("patient_notes").upsert(rows, { onConflict: "id" });
      if (!error) {
        notesSynced = localNotes.length;
      }
    }

    // 2. ローカル配穴の同期
    if (localMemos.length > 0) {
      const rows = localMemos.map((m) => clinicalMemoToRow(userId, m));
      const { error } = await supabase.from("clinical_memos").upsert(rows, { onConflict: "id" });
      if (!error) {
        memosSynced = localMemos.length;
      }
    }
  } catch (e) {
    console.warn("Sync local data to Supabase failed:", e);
  }

  return { notesSynced, memosSynced };
}

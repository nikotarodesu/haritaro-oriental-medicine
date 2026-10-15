import type { ClinicalMemoItem, PatientNoteItem } from "@/types/clinicalMemo";

// Local note updates remain synchronous in the provider. Only their existing
// cloud operations wait for this shared module, without remounting any state.
const database = () => import("./clinicalMemosDb");

export const fetchPatientNotesFromSupabase = () => database().then(db => db.fetchPatientNotesFromSupabase());
export const fetchClinicalMemosFromSupabase = () => database().then(db => db.fetchClinicalMemosFromSupabase());
export const upsertPatientNoteToSupabase = (userId: string, note: PatientNoteItem) => database().then(db => db.upsertPatientNoteToSupabase(userId, note));
export const upsertClinicalMemoToSupabase = (userId: string, memo: ClinicalMemoItem) => database().then(db => db.upsertClinicalMemoToSupabase(userId, memo));
export const deletePatientNoteFromSupabase = (id: string) => database().then(db => db.deletePatientNoteFromSupabase(id));
export const deleteClinicalMemoFromSupabase = (id: string) => database().then(db => db.deleteClinicalMemoFromSupabase(id));
export const syncLocalDataToSupabase = (userId: string, notes: PatientNoteItem[], memos: ClinicalMemoItem[]) => database().then(db => db.syncLocalDataToSupabase(userId, notes, memos));

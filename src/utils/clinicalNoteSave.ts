import type { PatientNoteItem } from '@/types/clinicalMemo';
export type ClinicalNoteFields = Omit<PatientNoteItem, 'id' | 'createdAt' | 'updatedAt'>;
export type ClinicalNoteSaveResult = { ok: true; id: string } | { ok: false; error: string };

/** Persist locally before success; failures retain input and the previous snapshot. */
export function persistClinicalNote(notes: PatientNoteItem[], fields: ClinicalNoteFields, existingId: string | undefined, limit: number, write: (notes: PatientNoteItem[]) => void): { result: ClinicalNoteSaveResult; notes?: PatientNoteItem[]; note?: PatientNoteItem } {
  if (!fields.patientIdentifier.trim() || !fields.chiefComplaint.trim() || !/^\d{4}-\d{2}-\d{2}$/.test(fields.visitDate)) return { result: { ok: false, error: '匿名ID・主訴・記録日を確認してください。' } };
  const previous = existingId ? notes.find(note => note.id === existingId) : undefined;
  if (existingId && !previous) return { result: { ok: false, error: '元の記録が見つかりません。保存済み記録を確認してください。' } };
  if (!previous && notes.length >= limit) return { result: { ok: false, error: `臨床ノートの保存上限（${limit}件）に達しています。保存済みの記録を確認してください。` } };
  const now = Date.now();
  const note: PatientNoteItem = { ...previous, ...fields, id: previous?.id || `pn_${now}_${Math.random().toString(36).slice(2, 9)}`, createdAt: previous?.createdAt ?? now, updatedAt: now };
  const next = previous ? notes.map(item => item.id === note.id ? note : item) : [note, ...notes];
  try { write(next); } catch { return { result: { ok: false, error: 'このブラウザに保存できませんでした。入力は保持しています。保存設定や空き容量を確認してください。' } }; }
  return { result: { ok: true, id: note.id }, note, notes: next };
}

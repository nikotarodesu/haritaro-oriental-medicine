import { REFLECTION_CASES, REFLECTION_LECTURES } from '@/data/learningReflectionCatalog';

export interface LearningReflectionSource {
  type: 'case' | 'lecture';
  id: string;
  title: string;
  href: string;
}

export interface LearningReflectionFields {
  title: string;
  keyPoints: string;
  uncertainty: string;
  nextCheck: string;
  reasoning: string;
}

export interface LearningReflectionNote extends LearningReflectionFields {
  version: 1;
  id: string;
  source: Pick<LearningReflectionSource, 'type' | 'id'> | null;
  createdAt: string;
  updatedAt: string;
}

export interface ReflectionEditingBaseline {
  id: string;
  updatedAt: string;
  signature: string;
}

export interface LearningReflectionDraft extends LearningReflectionFields {
  version: 1;
  source: LearningReflectionNote['source'];
  editing: ReflectionEditingBaseline | null;
  updatedAt: string;
}

export const REFLECTION_LIMITS = { title: 120, keyPoints: 1000, uncertainty: 800, nextCheck: 800, reasoning: 1000 } as const;
export const REFLECTION_MAX_BYTES = 14000;
export const REFLECTION_PREFIX = 'settings:reflection:';
export const REFLECTION_HISTORY_PREFIX = 'settings:reflection-history:';
const REFLECTION_DELETED_PREFIX = 'settings:reflection-deleted:';
const REFLECTION_DRAFT_PREFIX = 'settings:reflection-draft:';
const UUID = /^[a-f\d]{8}-[a-f\d]{4}-[1-5][a-f\d]{3}-[89ab][a-f\d]{3}-[a-f\d]{12}$/i;

export const LEARNING_REFLECTION_SOURCES: ReadonlyArray<LearningReflectionSource> = [
  ...REFLECTION_CASES.map(item => ({ ...item, type: 'case' as const, href: `/simulator?case=${item.id}#case-training` })),
  ...REFLECTION_LECTURES.map(item => ({ ...item, type: 'lecture' as const, href: `/curriculum/${item.id}` })),
];
const sourceMap = new Map(LEARNING_REFLECTION_SOURCES.map(source => [`${source.type}:${source.id}`, source]));

export function resolveLearningReflectionSource(type: unknown, id: unknown): LearningReflectionSource | null {
  if ((type !== 'case' && type !== 'lecture') || typeof id !== 'string') return null;
  return sourceMap.get(`${type}:${id}`) ?? null;
}

/** Only public material identifiers travel in links; notebook text and note IDs never do. */
export function buildLearningReflectionHref(source: { type: 'case' | 'lecture'; id: string }): string {
  const known = resolveLearningReflectionSource(source.type, source.id);
  return known ? `/notes?tab=learning&sourceType=${known.type}&sourceId=${encodeURIComponent(known.id)}` : '/notes?tab=learning';
}

function validDate(value: unknown): value is string {
  return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(value)
    && Number.isFinite(Date.parse(value)) && new Date(value).toISOString() === value;
}

export function reflectionByteLength(value: unknown): number {
  try { return new TextEncoder().encode(JSON.stringify(value)).length; } catch { return Infinity; }
}

export function validLearningReflection(value: unknown): value is LearningReflectionNote {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  const note = value as Partial<LearningReflectionNote>;
  if (note.version !== 1 || typeof note.id !== 'string' || !UUID.test(note.id)) return false;
  if (!validDate(note.createdAt) || !validDate(note.updatedAt) || note.updatedAt < note.createdAt) return false;
  if (note.source !== null && (!note.source || !resolveLearningReflectionSource(note.source.type, note.source.id))) return false;
  for (const [key, limit] of Object.entries(REFLECTION_LIMITS)) {
    const field = note[key as keyof LearningReflectionFields];
    if (typeof field !== 'string' || field.length > limit || field.includes('\0')) return false;
  }
  return reflectionByteLength(note) <= REFLECTION_MAX_BYTES
    && Boolean(note.title?.trim() && [note.keyPoints, note.uncertainty, note.nextCheck, note.reasoning].some(text => text?.trim()));
}

export function reflectionKey(id: string): string {
  if (!UUID.test(id)) throw new Error('ノートの識別子を確認できませんでした。');
  return REFLECTION_PREFIX + id;
}

export function reflectionHistoryKey(noteId: string, snapshotId: string): string {
  reflectionKey(noteId);
  if (!UUID.test(snapshotId)) throw new Error('以前の記録の識別子を確認できませんでした。');
  return `${REFLECTION_HISTORY_PREFIX}${noteId}/${snapshotId}`;
}

export function reflectionDeletionKey(noteId: string): string {
  reflectionKey(noteId);
  return REFLECTION_DELETED_PREFIX + noteId;
}

function isDeleted(values: Record<string, unknown>, noteId: string): boolean {
  const marker = values[reflectionDeletionKey(noteId)];
  return Boolean(marker && typeof marker === 'object' && 'version' in marker && marker.version === 1 && 'deletedAt' in marker && validDate(marker.deletedAt));
}

export function createLearningReflection(
  fields: LearningReflectionFields,
  source: LearningReflectionSource | null,
  id: string,
  now: string,
  previous?: LearningReflectionNote,
): LearningReflectionNote {
  const known = source ? resolveLearningReflectionSource(source.type, source.id) : null;
  if (source && !known) throw new Error('教材を選び直してください。');
  if (previous && (!validLearningReflection(previous) || previous.id !== id)) throw new Error('以前のノートを確認できませんでした。');
  const note: LearningReflectionNote = {
    version: 1, id, title: fields.title.trim(),
    keyPoints: fields.keyPoints, uncertainty: fields.uncertainty,
    nextCheck: fields.nextCheck, reasoning: fields.reasoning,
    source: known ? { type: known.type, id: known.id } : null,
    createdAt: previous?.createdAt ?? now, updatedAt: now,
  };
  if (!validLearningReflection(note)) throw new Error('タイトルと、振り返りを少なくとも1つ入力してください。各欄の文字数も確認してください。');
  return note;
}

/** JSON object key order can change during cloud sync; compare the actual note fields. */
export function sameLearningReflection(a: LearningReflectionNote | undefined, b: LearningReflectionNote | undefined): boolean {
  if (!a || !b) return a === b;
  return a.id === b.id && a.version === b.version && a.createdAt === b.createdAt && a.updatedAt === b.updatedAt
    && a.source?.type === b.source?.type && a.source?.id === b.source?.id
    && (Object.keys(REFLECTION_LIMITS) as Array<keyof LearningReflectionFields>).every(key => a[key] === b[key]);
}

/** A compact change detector for resuming edits, independent of JSON property order. */
export function reflectionEditingBaseline(note: LearningReflectionNote): ReflectionEditingBaseline {
  const text = JSON.stringify([note.id, note.version, note.createdAt, note.updatedAt, note.source?.type, note.source?.id,
    ...Object.keys(REFLECTION_LIMITS).map(key => note[key as keyof LearningReflectionFields])]);
  let first = 0x811c9dc5, second = 0x9e3779b9;
  for (let i = 0; i < text.length; i++) {
    first = Math.imul(first ^ text.charCodeAt(i), 0x01000193);
    second = Math.imul(second ^ text.charCodeAt(i), 0x85ebca6b);
  }
  return { id: note.id, updatedAt: note.updatedAt, signature: `${(first >>> 0).toString(16).padStart(8, '0')}${(second >>> 0).toString(16).padStart(8, '0')}:${text.length}` };
}

export function reflectionDraftKey(source: LearningReflectionNote['source']): string {
  if (source && !resolveLearningReflectionSource(source.type, source.id)) throw new Error('教材を選び直してください。');
  return REFLECTION_DRAFT_PREFIX + (source ? `${source.type}/${source.id}` : 'general');
}

export function validLearningReflectionDraft(value: unknown): value is LearningReflectionDraft {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  const draft = value as Partial<LearningReflectionDraft>;
  if (draft.version !== 1 || !validDate(draft.updatedAt)) return false;
  if (draft.source !== null && (!draft.source || !resolveLearningReflectionSource(draft.source.type, draft.source.id))) return false;
  if (draft.editing !== null && (!draft.editing || typeof draft.editing.id !== 'string' || !UUID.test(draft.editing.id)
    || !validDate(draft.editing.updatedAt) || typeof draft.editing.signature !== 'string' || !/^[a-f\d]{16}:\d{1,6}$/.test(draft.editing.signature))) return false;
  for (const [key, limit] of Object.entries(REFLECTION_LIMITS)) {
    const field = draft[key as keyof LearningReflectionFields];
    if (typeof field !== 'string' || field.length > limit || field.includes('\0')) return false;
  }
  return reflectionByteLength(draft) <= REFLECTION_MAX_BYTES;
}

export function createLearningReflectionDraft(
  fields: LearningReflectionFields, source: LearningReflectionSource | null, now: string, editing: ReflectionEditingBaseline | null,
): LearningReflectionDraft {
  const draft: LearningReflectionDraft = { version: 1, ...fields, source: source ? { type: source.type, id: source.id } : null, editing, updatedAt: now };
  if (!validLearningReflectionDraft(draft)) throw new Error('下書きを保存できる容量・文字数を超えています。入力を短くしてから保存してください。');
  return draft;
}

export function readLearningReflectionDrafts(values: Record<string, unknown>): LearningReflectionDraft[] {
  return Object.entries(values).filter(([key, value]) => validLearningReflectionDraft(value) && key === reflectionDraftKey(value.source)
    && (!value.editing || !isDeleted(values, value.editing.id))).map(([, value]) => value as LearningReflectionDraft)
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export function readLearningReflectionDraft(values: Record<string, unknown>, source: LearningReflectionNote['source']): LearningReflectionDraft | null {
  return readLearningReflectionDrafts(values).find(draft => reflectionDraftKey(draft.source) === reflectionDraftKey(source)) ?? null;
}

export function resolveReflectionDraftBaseline(values: Record<string, unknown>, draft: LearningReflectionDraft): { note: LearningReflectionNote | null; conflict: boolean } {
  if (!draft.editing) return { note: null, conflict: false };
  const current = readLearningReflections(values).find(note => note.id === draft.editing?.id);
  const baseline = current ? reflectionEditingBaseline(current) : null;
  const conflict = !baseline || baseline.id !== draft.editing.id || baseline.updatedAt !== draft.editing.updatedAt || baseline.signature !== draft.editing.signature;
  return { note: conflict ? null : current ?? null, conflict };
}

export function readLearningReflections(values: Record<string, unknown>): LearningReflectionNote[] {
  return Object.entries(values).filter(([key, value]) => validLearningReflection(value) && key === reflectionKey(value.id) && !isDeleted(values, value.id))
    .map(([, value]) => value as LearningReflectionNote).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export function readLearningReflectionHistory(values: Record<string, unknown>, noteId: string): LearningReflectionNote[] {
  if (!UUID.test(noteId) || isDeleted(values, noteId)) return [];
  const prefix = `${REFLECTION_HISTORY_PREFIX}${noteId}/`;
  return Object.entries(values).filter(([key, value]) => key.startsWith(prefix) && UUID.test(key.slice(prefix.length))
    && validLearningReflection(value) && value.id === noteId).map(([, value]) => value as LearningReflectionNote)
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export function getReflectionRemovalKeys(values: Record<string, unknown>, noteId: string): string[] {
  if (!UUID.test(noteId)) return [];
  // Include damaged snapshots too, so deleting a note does not leave its text behind.
  const prefix = `${REFLECTION_HISTORY_PREFIX}${noteId}/`;
  const drafts = Object.entries(values).filter(([key, value]) => key.startsWith(REFLECTION_DRAFT_PREFIX)
    && validLearningReflectionDraft(value) && value.editing?.id === noteId).map(([key]) => key);
  return [reflectionKey(noteId), ...Object.keys(values).filter(key => key.startsWith(prefix) && UUID.test(key.slice(prefix.length))), ...drafts];
}

export function getReflectionComparisons(
  values: Record<string, unknown>, source: LearningReflectionNote['source'], current?: LearningReflectionNote,
): LearningReflectionNote[] {
  const candidates = readLearningReflections(values).filter(note => note.id !== current?.id
    && note.source?.type === source?.type && note.source?.id === source?.id);
  if (current) candidates.push(...readLearningReflectionHistory(values, current.id));
  const seen = new Set<string>();
  return candidates.filter(note => {
    if (current && note.updatedAt >= current.updatedAt) return false;
    const key = `${note.id}:${note.updatedAt}`;
    if (seen.has(key)) return false;
    seen.add(key); return true;
  }).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export interface LearningEntry { key: string; counter: number; device: string; value: unknown }
export type LearningDocument = Record<string, LearningEntry>;
export function compareLearningEntries(a: LearningEntry, b: LearningEntry): number {
  return a.counter - b.counter || (a.device < b.device ? -1 : a.device > b.device ? 1 : 0);
}
export function validLearningEntry(entry: unknown): entry is LearningEntry {
  if (!entry || typeof entry !== 'object') return false;
  const e = entry as LearningEntry;
  return typeof e.key === 'string' && /^(?:lecture:|quiz:|attempt:|case:|tsubo:|settings:)[A-Za-z0-9_:/-]{1,140}$|^(?:reset|last-visit)$/.test(e.key)
    && Number.isSafeInteger(e.counter) && e.counter > 0 && typeof e.device === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(e.device)
    && Object.prototype.hasOwnProperty.call(e, 'value') && typeof JSON.stringify(e.value) === 'string' && new TextEncoder().encode(JSON.stringify(e.value)).byteLength <= 15000;
}
export function mergeLearningDocuments(...documents: LearningDocument[]): LearningDocument {
  const merged: LearningDocument = {};
  for (const document of documents) for (const entry of Object.values(document)) {
    if (validLearningEntry(entry) && (!merged[entry.key] || compareLearningEntries(entry, merged[entry.key]) > 0)) merged[entry.key] = entry;
  }
  return merged;
}
export function learningValues(document: LearningDocument): Record<string, unknown> {
  const reset = document.reset;
  const tsuboReset = document['settings:tsubo-reset'];
  return Object.fromEntries(Object.values(document).filter(entry => entry.key !== 'reset' && entry.key !== 'settings:tsubo-reset' && entry.value !== null && (!reset || compareLearningEntries(entry, reset) > 0)
    && (!(entry.key.startsWith('tsubo:') || entry.key === 'settings:tsubo') || !tsuboReset || compareLearningEntries(entry, tsuboReset) > 0)).map(entry => [entry.key, entry.value]));
}
export function nextLearningEntry(document: LearningDocument, key: string, value: unknown, device: string): LearningEntry {
  const entry = { key, value, device, counter: Math.max(0, ...Object.values(document).map(item => item.counter)) + 1 };
  if (!validLearningEntry(entry)) throw new Error('学習履歴の形式を確認できませんでした。');
  return entry;
}

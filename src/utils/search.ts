/** Normalize both the query and the index, preserving word boundaries. */
export function normalizeSearchText(text: string): string {
  return text.normalize('NFKC').toLowerCase()
    .replace(/[\u30a1-\u30f6]/g, char => String.fromCharCode(char.charCodeAt(0) - 0x60))
    .replace(/谿/g, '渓').replace(/兪/g, '輸')
    .replace(/([a-z]{2})\s+(\d+)/g, '$1$2')
    .replace(/\s+/g, ' ').trim();
}

export interface SearchableItem { title: string; subtitle?: string; tags?: string[]; exactCode?: string }
export function matchesSearchText(query: string, fields: string[]): boolean {
  const tokens = normalizeSearchText(query).split(' ').filter(Boolean);
  const text = fields.map(normalizeSearchText).join(' ');
  return tokens.every(token => text.includes(token));
}
export function prepareSearchItem<T extends SearchableItem>(item: T) {
  return { item, title: normalizeSearchText(item.title), subtitle: normalizeSearchText(item.subtitle || ''),
    tags: (item.tags || []).map(normalizeSearchText), code: normalizeSearchText(item.exactCode || '') };
}
export function scoreSearchItem(index: ReturnType<typeof prepareSearchItem>, query: string): number {
  const normalized = normalizeSearchText(query);
  if (!normalized) return 0;
  const tokens = normalized.split(' ');
  let score = index.code === normalized ? 150 : 0;
  for (const token of tokens) {
    const titleScore = index.title === token ? 120 : index.title.startsWith(token) ? 90 : index.title.includes(token) ? 60 : 0;
    const tagScore = index.tags.some(tag => tag === token) ? 45 : index.tags.some(tag => tag.includes(token)) ? 25 : 0;
    const subtitleScore = index.subtitle.includes(token) ? 20 : 0;
    if (!(titleScore || tagScore || subtitleScore || index.code === token)) return 0;
    score += titleScore + tagScore + subtitleScore;
  }
  return score;
}

/** Normalize both the query and the index, preserving word boundaries. */
export function normalizeSearchText(text: string): string {
  return text.normalize('NFKC').toLowerCase()
    .replace(/[\u30a1-\u30f6]/g, char => String.fromCharCode(char.charCodeAt(0) - 0x60))
    .replace(/谿/g, '渓').replace(/兪/g, '輸')
    .replace(/([a-z]{2})\s+(\d+)/g, '$1$2')
    .replace(/\s+/g, ' ').trim();
}

export interface SearchableItem { title: string; subtitle?: string; tags?: string[]; exactCode?: string }
export type SearchItemType = 'article' | 'acupoint' | 'lecture' | 'case' | 'tool' | 'glossary' | 'kokushi' | 'classic' | 'paper' | 'symptom';
export type SearchCategory = 'all' | 'article' | 'acupoint' | 'lecture' | 'kokushi' | 'case' | 'library' | 'glossary' | 'symptom' | 'tool';
export const SEARCH_CATEGORIES: ReadonlyArray<{ id: SearchCategory; label: string }> = [
  { id: 'all', label: 'すべて' },
  { id: 'article', label: '解説記事' },
  { id: 'acupoint', label: '経穴' },
  { id: 'lecture', label: '講義・コース' },
  { id: 'kokushi', label: '国試演習' },
  { id: 'glossary', label: '専門用語' },
  { id: 'symptom', label: '症状別ケア' },
  { id: 'library', label: '論文・古典' },
  { id: 'case', label: '症例教材' },
  { id: 'tool', label: 'ツール' },
];

export function matchesSearchCategory(type: SearchItemType, category: SearchCategory): boolean {
  return category === 'all' || (category === 'library' ? type === 'classic' || type === 'paper' : type === category);
}

/** Prepare once per query, rather than normalize again for every indexed item. */
export function prepareSearchQuery(query: string) {
  const normalized = normalizeSearchText(query);
  return { normalized, tokens: [...new Set(normalized.split(' ').filter(Boolean))] };
}

/** No selection starts at the first/last result; list ends stay visible instead of wrapping. */
export function nextSearchResultIndex(current: number, direction: 'next' | 'previous', count: number): number {
  if (count <= 0) return -1;
  if (current < 0 || current >= count) return direction === 'next' ? 0 : count - 1;
  return direction === 'next' ? Math.min(current + 1, count - 1) : Math.max(current - 1, 0);
}

export function matchesSearchText(query: string, fields: string[]): boolean {
  const { tokens } = prepareSearchQuery(query);
  const text = fields.map(normalizeSearchText).join(' ');
  return tokens.every(token => text.includes(token));
}
export function prepareSearchItem<T extends SearchableItem>(item: T) {
  return { item, title: normalizeSearchText(item.title), subtitle: normalizeSearchText(item.subtitle || ''),
    tags: (item.tags || []).map(normalizeSearchText), code: normalizeSearchText(item.exactCode || '') };
}
export function scoreSearchItem(index: ReturnType<typeof prepareSearchItem>, query: string | ReturnType<typeof prepareSearchQuery>): number {
  const { normalized, tokens } = typeof query === 'string' ? prepareSearchQuery(query) : query;
  if (!normalized) return 0;
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

/** Explain hidden-field matches without revealing exercise answers from indexed tags. */
export function searchMatchHint(index: ReturnType<typeof prepareSearchItem>, query: ReturnType<typeof prepareSearchQuery>): string | null {
  if (!query.tokens.length) return null;
  if (index.code && index.code === query.normalized) return '経穴コードが一致';
  if (query.tokens.some(token => !index.title.includes(token) && !index.subtitle.includes(token))) return '関連語に一致';
  return null;
}

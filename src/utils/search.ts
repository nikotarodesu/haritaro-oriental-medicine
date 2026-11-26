import { normalizeSearchAliases } from './searchAliases';
import { whoAtlasPages } from '@/data/tsubo/atlas/whoAtlasPages';

function normalizePointCode(value: string): string {
  // Only normalize a complete code. Leave date separators and punctuation in mixed text intact.
  const match = /^([a-z]{2})\s*(?:[-‐‑‒–—−]\s*)?(\d{1,2})$/u.exec(value);
  if (!match) return value;
  const code = match[1] + match[2];
  return Object.hasOwn(whoAtlasPages, code) ? code : value;
}

/** Normalize both the query and the index, preserving word boundaries. */
export function normalizeSearchText(text: string): string {
  const normalized = text.normalize('NFKC').toLowerCase()
    .replace(/[āâēêīîōôūû]/g, char => char.normalize('NFD')[0])
    .replace(/[\u30a1-\u30f6]/g, char => String.fromCharCode(char.charCodeAt(0) - 0x60))
    .replace(/谿/g, '渓').replace(/兪/g, '輸')
    .replace(/\b[a-z]{2}\s+\d{1,2}(?![a-z\d+])/g, normalizePointCode)
    .replace(/\s+/g, ' ').trim();
  return normalizeSearchAliases(normalizePointCode(normalized));
}

const POINT_QUESTION_END = /\s*(?:の\s*(?:近く|周り)\s*の|(?:周辺|付近|近く)\s*の|の|に\s*(?:ある|効く|きく|よい|いい|使う)|と\s*(?:関連|関係)する)\s*(?:つぼ|経穴)(?:\s*(?:は\s*どこ(?:ですか)?|を\s*(?:探す|知りたい|教えて(?:ください)?)))?$/u;

export function getPointSearchTopic(normalizedQuery: string): string {
  const question = normalizedQuery.replace(/[?？。!！]+\s*$/, "").trim();
  return normalizePointCode(question.replace(POINT_QUESTION_END, "").trim() || normalizedQuery);
}

export interface SearchableItem {
  title: string;
  subtitle?: string;
  context?: string;
  tags?: string[];
  exactCode?: string;
  exactTerms?: string[];
  relatedQueryNote?: { term: string; text: string };
}
export type SearchItemType = 'article' | 'acupoint' | 'lecture' | 'case' | 'tool' | 'glossary' | 'kokushi' | 'classic' | 'paper' | 'symptom';
export type SearchCategory = 'all' | 'article' | 'acupoint' | 'lecture' | 'kokushi' | 'case' | 'library' | 'glossary' | 'symptom' | 'tool';
export const SEARCH_CATEGORIES: ReadonlyArray<{ id: SearchCategory; label: string }> = [
  { id: 'all', label: 'すべて' },
  { id: 'article', label: '解説記事' },
  { id: 'acupoint', label: '経穴' },
  { id: 'lecture', label: '講義・コース' },
  { id: 'glossary', label: '専門用語' },
  { id: 'symptom', label: '一般向け症状ガイド' },
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
  return { item, title: normalizeSearchText(item.title), subtitle: normalizeSearchText([item.context, item.subtitle].filter(Boolean).join(' ')),
    tags: (item.tags || []).map(normalizeSearchText), code: normalizeSearchText(item.exactCode || ''),
    exactTerms: (item.exactTerms || []).map(normalizeSearchText) };
}
export function scoreSearchItem(index: ReturnType<typeof prepareSearchItem>, query: string | ReturnType<typeof prepareSearchQuery>): number {
  const { normalized, tokens } = typeof query === 'string' ? prepareSearchQuery(query) : query;
  if (!normalized) return 0;
  const exactTerm = index.exactTerms.includes(normalized);
  let score = index.code === normalized ? 150 : exactTerm ? 125 : 0;
  for (const token of tokens) {
    const titleScore = index.title === token ? 120 : index.title.startsWith(token) ? 90 : index.title.includes(token) ? 60 : 0;
    const tagScore = index.tags.some(tag => tag === token) ? 45 : index.tags.some(tag => tag.includes(token)) ? 25 : 0;
    const subtitleScore = index.subtitle.includes(token) ? 20 : 0;
    if (!(titleScore || tagScore || subtitleScore || index.code === token || exactTerm)) return 0;
    score += titleScore + tagScore + subtitleScore;
  }
  return score;
}

/** Explain hidden-field matches without revealing exercise answers from indexed tags. */
export function searchMatchHint(index: ReturnType<typeof prepareSearchItem>, query: ReturnType<typeof prepareSearchQuery>): string | null {
  if (!query.tokens.length) return null;
  if (index.code && index.code === query.normalized) return '経穴コードが一致';
  const note = index.item.relatedQueryNote;
  if (note && query.tokens.includes(normalizeSearchText(note.term))) return note.text;
  if (index.exactTerms.includes(query.normalized) && !index.title.includes(query.normalized)) {
    return '名前・読み方・別名に一致';
  }
  if (query.tokens.some(token => !index.title.includes(token) && !index.subtitle.includes(token))) return '関連語に一致';
  return null;
}

import type { AcupointMaster } from '@/data/tsubo/types';
import { normalizeSearchText } from './search';

/** Prepare the same normalized spellings for filtering and the visible match explanation. */
export function prepareAcupointSearch(point: AcupointMaster) {
  return {
    code: normalizeSearchText(point.code),
    name: normalizeSearchText(point.name),
    kana: normalizeSearchText(point.kana),
    romaji: normalizeSearchText(point.romaji),
    aliases: (point.aliases || []).map(normalizeSearchText),
    indications: point.indications.map(normalizeSearchText),
    location: [point.locationSimple, point.locationDetail].map(normalizeSearchText),
    note: normalizeSearchText(point.clinicalNote),
  };
}

/** Query has already passed through normalizeSearchText, once per input change. */
export function getAcupointMatchReason(point: ReturnType<typeof prepareAcupointSearch>, query: string): string | null {
  if (!query) return null;
  if (point.code === query) return '番号が一致';
  if (point.name === query) return 'ツボの名前が一致';
  if (point.code.startsWith(query)) return '番号の先頭が一致';
  if (point.name.includes(query)) return 'ツボの名前に含まれる';
  if (point.kana.includes(query) || point.romaji.includes(query)) return '読み方に含まれる';
  if (point.aliases.some(alias => alias.includes(query))) return '別名に含まれる';
  if (point.indications.some(indication => indication.includes(query))) return '伝統的な説明に含まれる';
  if (point.location.some(location => location.includes(query))) return '場所の説明に含まれる';
  if (point.note.includes(query)) return '解説に含まれる';
  return null;
}

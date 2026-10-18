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
  if (point.code === query) return 'コード完全一致';
  if (point.name === query) return '経穴名完全一致';
  if (point.code.startsWith(query)) return 'コード前方一致';
  if (point.name.includes(query)) return '経穴名に含む';
  if (point.kana.includes(query) || point.romaji.includes(query)) return '読み一致';
  if (point.aliases.some(alias => alias.includes(query))) return '別名一致';
  if (point.indications.some(indication => indication.includes(query))) return '主治・適応症一致';
  if (point.location.some(location => location.includes(query))) return '取穴部位一致';
  if (point.note.includes(query)) return '解説・臨床ノート一致';
  return null;
}

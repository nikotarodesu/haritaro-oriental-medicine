/** Curated spellings/readings of the same term, never diseases or inferred diagnoses. */
const SEARCH_ALIASES: ReadonlyArray<readonly [canonical: string, aliases: readonly string[]]> = [
  ['肝気鬱結', ['肝気郁結', '肝気欝結', 'かんきうっけつ']],
  ['瘀血', ['お血', 'おけつ']],
  ['肩こり', ['肩凝り', 'かたこり']],
  ['腰痛', ['ようつう']],
  ['不眠', ['ふみん']],
  ['陰陽', ['いんよう']],
  ['五行', ['ごぎょう']],
  ['気虚', ['ききょ']],
  ['気滞', ['きたい']],
  ['気逆', ['きぎゃく']],
  ['血虚', ['けっきょ']],
  ['水滞', ['すいたい']],
  ['陰虚', ['いんきょ']],
  ['陽虚', ['ようきょ']],
  ['津液', ['しんえき']],
  ['疏泄', ['そせつ']],
  ['固摂', ['こせつ']],
  ['相生', ['そうせい']],
  ['相克', ['相剋', 'そうこく']],
  ['相乗', ['そうじょう']],
  ['相侮', ['そうぶ']],
  ['弁証論治', ['辨証論治', 'べんしょうろんち']],
];

const spellings = new Map(SEARCH_ALIASES.flatMap(([canonical, aliases]) => aliases.map(alias => [alias, canonical] as const)));
// Phrase-specific substitutions preserve unrelated characters such as 郁 in a person's name.
const aliasPattern = new RegExp([...spellings.keys()].sort((a, b) => b.length - a.length).join('|'), 'g');

/** Input has already passed through NFKC, case and kana normalization. */
export function normalizeSearchAliases(text: string): string {
  return text.replace(aliasPattern, alias => spellings.get(alias)!);
}

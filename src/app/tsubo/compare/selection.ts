import { normalizeSearchText } from "@/utils/search";

export type ComparisonSearchParams = Record<string, string | string[] | undefined>;
export type ComparisonPairOrigin = { pairId: string };

const DEFAULT_COMPARISON_CODES = ["LI4", "LR3"];
const SELECTION_KEYS = ["a", "b", "c"] as const;

function first(value: ComparisonSearchParams[string]) {
  return Array.isArray(value) ? value[0] : value;
}

export function resolveComparisonSelection(
  params: ComparisonSearchParams,
  choices: readonly { code: string; id: string }[],
) {
  if (first(params.empty) === "1") return { codes: [], unavailableCount: 0 };

  const requested = [first(params.a) || first(params.code), first(params.b), first(params.c)]
    .filter((value): value is string => Boolean(value?.trim()));
  const resolved = new Set<string>();
  let unavailableCount = 0;
  for (const value of requested) {
    const query = normalizeSearchText(value);
    const point = choices.find(choice => normalizeSearchText(choice.code) === query || normalizeSearchText(choice.id) === query);
    if (point) resolved.add(point.code);
    else unavailableCount += 1;
  }
  return { codes: requested.length ? [...resolved] : [...DEFAULT_COMPARISON_CODES], unavailableCount };
}

export function comparisonPairOrigin(params: ComparisonSearchParams): ComparisonPairOrigin | undefined {
  const pairId = first(params.pair);
  if (first(params.from) !== "pairs" || !pairId || !/^[a-z\d-]+$/u.test(pairId)) return undefined;
  return { pairId };
}

export function comparisonSelectionHref(codes: readonly string[], origin?: ComparisonPairOrigin) {
  const params = new URLSearchParams();
  if (!codes.length) params.set("empty", "1");
  for (const [index, key] of SELECTION_KEYS.entries()) {
    const code = codes[index];
    if (code) params.set(key, code.toLowerCase());
  }
  if (origin) {
    params.set("from", "pairs");
    params.set("pair", origin.pairId);
  }
  return `/tsubo/compare?${params.toString()}`;
}

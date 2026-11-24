import { normalizeSearchText } from "@/utils/search";

export type ComparisonSearchParams = Record<string, string | string[] | undefined>;

const DEFAULT_COMPARISON_CODES = ["LI4", "LR3"];
const SELECTION_KEYS = ["a", "b", "c"] as const;

function first(value: ComparisonSearchParams[string]) {
  return Array.isArray(value) ? value[0] : value;
}

export function resolveComparisonCodes(
  params: ComparisonSearchParams,
  choices: readonly { code: string; id: string }[],
): string[] {
  if (first(params.empty) === "1") return [];

  const requested = [first(params.a) || first(params.code), first(params.b), first(params.c)];
  const resolved = new Set<string>();
  for (const value of requested) {
    if (!value) continue;
    const query = normalizeSearchText(value);
    const point = choices.find(choice => normalizeSearchText(choice.code) === query || normalizeSearchText(choice.id) === query);
    if (point) resolved.add(point.code);
  }
  return resolved.size ? [...resolved] : [...DEFAULT_COMPARISON_CODES];
}

export function comparisonSelectionHref(codes: readonly string[]) {
  const params = new URLSearchParams();
  if (!codes.length) params.set("empty", "1");
  for (const [index, key] of SELECTION_KEYS.entries()) {
    const code = codes[index];
    if (code) params.set(key, code.toLowerCase());
  }
  return `/tsubo/compare?${params.toString()}`;
}

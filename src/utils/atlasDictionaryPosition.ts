import { normalizeAtlasReturnPosition, type AtlasReturnPosition } from "./atlasReturnPosition";

const storageKey = "haritaro_atlas_dictionary_v1";
const historyKey = "haritaroAtlasDictionary";

export type AtlasDictionaryPosition = AtlasReturnPosition & {
  bodyMapOpen: boolean;
  filtersOpen: boolean;
  resultsOpen: boolean;
};

let latest: AtlasDictionaryPosition | null = null;
let requested: AtlasDictionaryPosition | null = null;

export function atlasDictionaryHref({ pathname, search, hash }: Location) {
  return pathname + search + hash;
}

function parsePosition(value: Partial<AtlasDictionaryPosition> | null): AtlasDictionaryPosition | null {
  const position = normalizeAtlasReturnPosition(value);
  if (!position || !value || position.href.split(/[?#]/, 1)[0] !== "/tsubo" ||
      typeof value.bodyMapOpen !== "boolean" || typeof value.filtersOpen !== "boolean" ||
      typeof value.resultsOpen !== "boolean") return null;
  return { ...position, bodyMapOpen: value.bodyMapOpen, filtersOpen: value.filtersOpen, resultsOpen: value.resultsOpen };
}

export function rememberAtlasDictionaryPosition(browser: Window, position: AtlasDictionaryPosition) {
  latest = position;
  try {
    browser.sessionStorage.setItem(storageKey, JSON.stringify(position));
  } catch {
    // Client-side navigation can still use the in-memory position.
  }
  try {
    // Preserve the existing router state so Back can restore the current history entry.
    browser.history.replaceState({ ...browser.history.state, [historyKey]: position }, "");
  } catch {
    // Explicit return links can use the session position without History API support.
  }
}

export function getAtlasDictionaryReturn(browser: Window) {
  if (latest) return latest;
  try {
    return parsePosition(JSON.parse(browser.sessionStorage.getItem(storageKey) ?? "null"));
  } catch {
    return null;
  }
}

export function requestAtlasDictionaryRestore(position: AtlasDictionaryPosition) {
  requested = position;
}

export function takeAtlasDictionaryRestore(browser: Window, allowHistory: boolean) {
  const href = atlasDictionaryHref(browser.location);
  if (requested?.href === href) {
    const position = requested;
    requested = null;
    return position;
  }
  const saved = allowHistory ? parsePosition(browser.history.state?.[historyKey] ?? null) : null;
  return saved?.href === href ? saved : null;
}

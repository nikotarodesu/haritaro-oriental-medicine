export const ATLAS_RETURN_STORAGE_KEY = "haritaro_atlas_return_v1";

export type AtlasReturnPosition = { href: string; scrollY: number };

const atlasOrigin = "https://www.haritaro.jp";

export function isAtlasReturnPath(pathname: string) {
  return pathname === "/tsubo" || pathname === "/tsubo/compare" ||
    /^\/tsubo\/(?:[a-z]{2}\d{1,2}|extra-points\/[a-z-]+)$/.test(pathname);
}

export function readAtlasReturnPosition(raw: string | null): AtlasReturnPosition | null {
  if (!raw) return null;
  try {
    const saved: Partial<AtlasReturnPosition> | null = JSON.parse(raw);
    if (!saved || typeof saved.href !== "string" || !saved.href.startsWith("/") ||
        typeof saved.scrollY !== "number" || !Number.isFinite(saved.scrollY) || saved.scrollY < 0) return null;
    const url = new URL(saved.href, atlasOrigin);
    return url.origin === atlasOrigin && isAtlasReturnPath(url.pathname)
      ? { href: url.pathname + url.search + url.hash, scrollY: saved.scrollY }
      : null;
  } catch {
    return null;
  }
}

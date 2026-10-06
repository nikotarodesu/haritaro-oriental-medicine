/** Replay is intentionally narrower than aggregate GA4 measurement. */
const REPLAY_PAGES = new Set(["/", "/about", "/learn", "/learn/courses", "/articles"]);

export function isClarityPage(value: string, origin: string): boolean {
  try {
    const url = new URL(value, origin);
    return url.origin === origin && !url.search && !url.hash && REPLAY_PAGES.has(url.pathname);
  } catch { return false; }
}

/** Clarity records referrers verbatim, so reject private or suffixed referrers. */
export function isClarityReferrer(value: string, origin: string): boolean {
  if (!value) return true;
  try {
    const url = new URL(value);
    if (!["http:", "https:"].includes(url.protocol) || url.search || url.hash) return false;
    return url.origin === origin ? isClarityPage(value, origin) : url.pathname === "/";
  } catch { return false; }
}

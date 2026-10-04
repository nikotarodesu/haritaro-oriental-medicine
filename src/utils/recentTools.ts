import { TOOL_CATALOG } from '@/config/toolCatalog';

export const RECENT_TOOLS_STORAGE_KEY = 'haritaro_recent_tools';
export const RECENT_TOOL_CATALOG: ReadonlyArray<{ href: string; title: string }> = [
  { href: '/tsubo', title: '経穴辞典' }, { href: '/tsubo/practice', title: '経穴ドリル' },
  ...Object.values(TOOL_CATALOG), { href: '/diagnosis', title: '体質チェック' },
  { href: '/diagnosis?tab=gorou', title: '五労チェッカー' },
  { href: '/library', title: '文献ライブラリ' },
  { href: '/notes?tab=learning', title: '学習ノート' },
  { href: '/notes', title: '臨床ノート・配穴ストック' },
];
const knownHrefs = new Set(RECENT_TOOL_CATALOG.map(tool => tool.href));

/** Keep only fixed public modes. Source IDs, patient IDs and free text never enter history. */
export function recentToolHref(pathname: string, tab: string | null = null): string | null {
  const base = pathname.replace(/\/$/, '');
  const href = base === '/notes' && tab === 'learning' ? '/notes?tab=learning'
    : base === '/diagnosis' && tab === 'gorou' ? '/diagnosis?tab=gorou' : base;
  return knownHrefs.has(href) ? href : null;
}

function normalizeStoredHref(value: unknown): string | null {
  if (typeof value !== 'string' || !value.startsWith('/') || value.startsWith('//')) return null;
  try {
    const url = new URL(value, 'https://www.haritaro.jp');
    if (url.origin !== 'https://www.haritaro.jp') return null;
    return recentToolHref(url.pathname, url.searchParams.get('tab'));
  } catch { return null; }
}

export function readRecentToolPaths(raw: string): string[] {
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    const paths: string[] = [];
    for (const value of parsed) {
      const href = normalizeStoredHref(value);
      if (href && !paths.includes(href)) paths.push(href);
      if (paths.length === 4) break;
    }
    return paths;
  } catch { return []; }
}

export function updateRecentToolPaths(raw: string, pathname: string, tab: string | null = null): string[] {
  const previous = readRecentToolPaths(raw);
  const current = recentToolHref(pathname, tab);
  return current ? [current, ...previous.filter(href => href !== current)].slice(0, 4) : previous;
}

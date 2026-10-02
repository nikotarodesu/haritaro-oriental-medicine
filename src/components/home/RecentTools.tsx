'use client';
import { useEffect, useMemo, useSyncExternalStore } from 'react';
import { usePathname } from 'next/navigation';
import { TOOL_CATALOG } from '@/config/toolCatalog';

const KEY = 'haritaro_recent_tools';
const EVENT = 'haritaro:recent-tools';
const TOOLS = [
  { href: '/tsubo', title: '経穴辞典' }, { href: '/tsubo/practice', title: '経穴ドリル' },
  ...Object.values(TOOL_CATALOG), { href: '/diagnosis', title: '体質チェック' },
  { href: '/library', title: '文献ライブラリ' }, { href: '/notes', title: 'マイノート' },
];
function snapshot() { try { return localStorage.getItem(KEY) || '[]'; } catch { return '[]'; } }
function subscribe(callback: () => void) {
  window.addEventListener(EVENT, callback); window.addEventListener('storage', callback);
  return () => { window.removeEventListener(EVENT, callback); window.removeEventListener('storage', callback); };
}
export function useRecentTools() {
  const raw = useSyncExternalStore(subscribe, snapshot, () => '[]');
  return useMemo(() => {
    try {
      const paths: unknown = JSON.parse(raw);
      if (!Array.isArray(paths)) return [];
      return paths.flatMap(path => { const tool = TOOLS.find(tool => tool.href === path); return tool ? [tool] : []; }).slice(0, 4);
    } catch { return []; }
  }, [raw]);
}
export default function RecentToolTracker() {
  const pathname = usePathname();
  useEffect(() => {
    if (!TOOLS.some(tool => tool.href === pathname)) return;
    try {
      const previous: unknown = JSON.parse(snapshot());
      const paths = Array.isArray(previous) ? previous.filter(path => typeof path === 'string' && TOOLS.some(tool => tool.href === path)) : [];
      localStorage.setItem(KEY, JSON.stringify([pathname, ...paths.filter(path => path !== pathname)].slice(0, 4)));
      window.dispatchEvent(new Event(EVENT));
    } catch { /* Browsing remains usable without storage. */ }
  }, [pathname]);
  return null;
}

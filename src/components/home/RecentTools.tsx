'use client';
import { Suspense, useEffect, useMemo, useSyncExternalStore } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { RECENT_TOOL_CATALOG, RECENT_TOOLS_STORAGE_KEY, readRecentToolPaths, updateRecentToolPaths } from '@/utils/recentTools';

const EVENT = 'haritaro:recent-tools';
function snapshot() { try { return localStorage.getItem(RECENT_TOOLS_STORAGE_KEY) || '[]'; } catch { return '[]'; } }
function subscribe(callback: () => void) {
  const changed = (event: StorageEvent) => { if (event.key === RECENT_TOOLS_STORAGE_KEY || event.key === null) callback(); };
  window.addEventListener(EVENT, callback); window.addEventListener('storage', changed);
  return () => { window.removeEventListener(EVENT, callback); window.removeEventListener('storage', changed); };
}
export function useRecentTools() {
  const raw = useSyncExternalStore(subscribe, snapshot, () => '[]');
  return useMemo(() => readRecentToolPaths(raw).flatMap(href => { const tool = RECENT_TOOL_CATALOG.find(tool => tool.href === href); return tool ? [tool] : []; }), [raw]);
}
export default function RecentToolTracker() {
  return <Suspense fallback={null}><RecentToolRecorder /></Suspense>;
}
function RecentToolRecorder() {
  const pathname = usePathname();
  const params = useSearchParams();
  const tab = params.get('tab');
  useEffect(() => {
    try {
      const raw = snapshot();
      const next = JSON.stringify(updateRecentToolPaths(raw, pathname, tab));
      if (next === raw) return;
      localStorage.setItem(RECENT_TOOLS_STORAGE_KEY, next);
      window.dispatchEvent(new Event(EVENT));
    } catch { /* Browsing remains usable without storage. */ }
  }, [pathname, tab]);
  return null;
}

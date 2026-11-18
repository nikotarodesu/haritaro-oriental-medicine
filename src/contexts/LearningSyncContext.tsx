'use client';
import { createContext, useContext, useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { LearningDocument, learningValues, mergeLearningDocuments, nextLearningEntry } from '@/utils/learningSync';
import { setLearningStorageAdapter } from '@/utils/learningStorageBridge';
export type LearningSyncStatus = 'local' | 'memory';
interface LearningStore {
  ready: boolean; values: Record<string, unknown>; status: LearningSyncStatus;
  setEntry: (key: string, value: unknown) => void; reset: () => void;
}
const Context = createContext<LearningStore | null>(null);
const storageKey = (owner: string) => 'haritaro-learning-v2:' + owner;
function read(owner: string): LearningDocument {
  try { return mergeLearningDocuments(JSON.parse(localStorage.getItem(storageKey(owner)) || '{}')); } catch { return {}; }
}
function migrateUnownedHistory(device: string) {
  let guest: LearningDocument = {};
  try {
    if (localStorage.getItem(storageKey('guest'))) return;
    const legacy = JSON.parse(localStorage.getItem('haritaro-learning-progress-v1') || '{}');
    const entries: [string, unknown][] = [
      ...Object.entries(legacy.completedLectures || {}).map(([id, value]): [string, unknown] => ['lecture:' + id, value]),
      ...Object.entries(legacy.quizResults || {}).map(([id, value]): [string, unknown] => ['quiz:' + id, value]),
    ];
    if (legacy.lastVisitedLectureId) entries.push(['last-visit', legacy.lastVisitedLectureId]);
    const tsubo = JSON.parse(localStorage.getItem('haritaro_tsubo_study_v1') || '{}');
    entries.push(...Object.entries(tsubo.records || {}).map(([id, value]): [string, unknown] => ['tsubo:record:' + id, value]));
    if (tsubo.settings) entries.push(['settings:tsubo', tsubo.settings]);
    for (const day of tsubo.history || []) entries.push(['tsubo:baseline:' + day.date, day]);
    for (const [key, value] of entries) { const entry = nextLearningEntry(guest, key, value, device); guest = { ...guest, [key]: entry }; }
    localStorage.setItem(storageKey('guest'), JSON.stringify(guest));
  } catch { /* Original files are preserved; a failed import never deletes them. */ }
}
export function LearningSyncProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [document, setDocument] = useState<LearningDocument>({});
  const [status, setStatus] = useState<LearningSyncStatus>('local');
  const active = useRef<{ document: LearningDocument; device: string } | null>(null);
  const persist = useCallback((next: LearningDocument) => {
    if (!active.current) return;
    active.current.document = next;
    setDocument(next);
    try {
      localStorage.setItem(storageKey('guest'), JSON.stringify(next));
      setStatus('local');
    } catch { setStatus('memory'); }
  }, []);

  const setEntry = useCallback((key: string, value: unknown) => {
    const state = active.current;
    if (!state) return;
    const merged = mergeLearningDocuments(read('guest'), state.document);
    if (key !== 'reset' && JSON.stringify(learningValues(merged)[key]) === JSON.stringify(value)) return;
    const entry = nextLearningEntry(merged, key, value, state.device);
    persist({ ...merged, [key]: entry });
  }, [persist]);

  useEffect(() => {
    const timer = setTimeout(() => {
      let device = crypto.randomUUID();
      try {
        device = sessionStorage.getItem('haritaro-learning-device') || device;
        sessionStorage.setItem('haritaro-learning-device', device);
      } catch { /* In-memory learning remains available if browser storage is blocked. */ }
      migrateUnownedHistory(device);
      active.current = { device, document: read('guest') };
      persist(active.current.document);
      setLearningStorageAdapter({
        owner: 'guest',
        values: () => learningValues(active.current?.document ?? {}),
        set: setEntry,
      });
      setReady(true);
    }, 0);
    const storage = (event: StorageEvent) => {
      if (event.key !== storageKey('guest') || !active.current) return;
      const prior = active.current.document;
      const next = mergeLearningDocuments(prior, read('guest'));
      if (JSON.stringify(prior) === JSON.stringify(next)) return;
      active.current.document = next;
      setDocument(next);
    };
    window.addEventListener('storage', storage);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('storage', storage);
      setLearningStorageAdapter(null);
      active.current = null;
    };
  }, [persist, setEntry]);

  const values = useMemo(() => learningValues(document), [document]);
  return <Context.Provider value={{ ready, values, status, setEntry, reset: () => setEntry('reset', true) }}>{children}</Context.Provider>;
}
export function useLearningSync() { const value = useContext(Context); if (!value) throw new Error('LearningSyncProvider is required'); return value; }

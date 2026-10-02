'use client';
import { createContext, useContext, useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { createClient } from '@/lib/supabase/client';
import { LearningDocument, learningValues, mergeLearningDocuments, nextLearningEntry } from '@/utils/learningSync';
import { setLearningStorageAdapter } from '@/utils/learningStorageBridge';
export type LearningSyncStatus = 'local' | 'syncing' | 'synced' | 'offline' | 'setup' | 'memory';
interface LearningStore {
  ready: boolean; values: Record<string, unknown>; status: LearningSyncStatus; lastSyncedAt: string | null;
  setEntry: (key: string, value: unknown) => void; reset: () => void; retry: () => void;
  canImportGuest: boolean; importGuest: () => void;
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
  const { user, isLoading } = useAuth();
  const owner = user?.id || 'guest';
  const [loadedOwner, setLoadedOwner] = useState('');
  const [document, setDocument] = useState<LearningDocument>({});
  const [status, setStatus] = useState<LearningSyncStatus>('local');
  const [lastSyncedAt, setLastSyncedAt] = useState<string | null>(null);
  const [canImportGuest, setCanImportGuest] = useState(false);
  const active = useRef({ owner: '', generation: 0, document: {} as LearningDocument, device: '', running: false });
  const persist = useCallback((next: LearningDocument) => {
    const state = active.current;
    state.document = next; setDocument(previous => JSON.stringify(previous) === JSON.stringify(next) ? previous : next);
    try { localStorage.setItem(storageKey(state.owner), JSON.stringify(next)); return true; }
    catch { setStatus('memory'); return false; }
  }, []);
  const setEntry = useCallback((key: string, value: unknown) => {
    const state = active.current;
    if (!state.owner || state.owner !== owner || isLoading) return;
    if (key !== 'reset' && JSON.stringify(learningValues(state.document)[key]) === JSON.stringify(value)) return;
    const next = nextLearningEntry(state.document, key, value, state.device);
    const stored = persist({ ...state.document, [key]: next });
    setStatus(stored ? owner === 'guest' ? 'local' : 'offline' : 'memory');
  }, [owner, isLoading, persist]);
  const sync = useCallback(async () => {
    const state = active.current;
    if (owner === 'guest' || isLoading || state.owner !== owner || state.running) return;
    const generation = state.generation; state.running = true; setStatus('syncing');
    try {
      const client = createClient();
      // Confirm the current identity before every write; never use an old account's snapshot.
      const { data: identity, error: authError } = await client.auth.getUser();
      if (authError || identity.user?.id !== owner) throw new Error('auth');
      const remote: LearningDocument = {};
      for (let offset = 0; offset < 10000; offset += 1000) {
        const { data, error } = await client.from('learning_entries').select('entry_key,counter,device,value').eq('user_id', owner).order('entry_key').range(offset, offset + 999);
        if (error) throw error;
        for (const row of data || []) remote[row.entry_key] = { key: row.entry_key, counter: row.counter, device: row.device, value: row.value };
        if ((data?.length || 0) < 1000) break;
        if (offset === 9000) throw new Error('capacity');
      }
      if (active.current.generation !== generation) return;
      persist(mergeLearningDocuments(remote, state.document));
      const submitted = { ...state.document };
      const pending = Object.values(submitted).filter(entry => JSON.stringify(remote[entry.key]) !== JSON.stringify(entry));
      for (let i = 0; i < pending.length; i += 100) {
        if (active.current.generation !== generation) return;
        const { data, error } = await client.rpc('sync_learning_entries', { entries: pending.slice(i, i + 100).map(entry => ({ entry_key: entry.key, counter: entry.counter, device: entry.device, value: entry.value })) });
        if (error) throw error;
        const received: LearningDocument = {};
        for (const row of data || []) received[row.entry_key] = { key: row.entry_key, counter: row.counter, device: row.device, value: row.value };
        if (active.current.generation !== generation) return;
        persist(mergeLearningDocuments(state.document, received));
      }
      if (active.current.generation !== generation) return;
      const unchanged = Object.values(state.document).every(entry => JSON.stringify(submitted[entry.key]) === JSON.stringify(entry));
      setStatus(unchanged ? 'synced' : 'offline'); setLastSyncedAt(new Date().toISOString());
    } catch (error) {
      if (active.current.generation !== generation) return;
      const code = error && typeof error === 'object' && 'code' in error ? error.code : '';
      setStatus(['42P01', 'PGRST205', 'PGRST202'].includes(String(code)) ? 'setup' : 'offline');
    } finally { if (active.current.generation === generation) state.running = false; }
  }, [owner, isLoading, persist]);
  useEffect(() => {
    if (isLoading) return;
    const generation = active.current.generation + 1;
    const timer = setTimeout(() => {
      let device = crypto.randomUUID();
      try {
        device = sessionStorage.getItem('haritaro-learning-device') || device;
        sessionStorage.setItem('haritaro-learning-device', device);
      } catch { /* In-memory learning remains available if browser storage is blocked. */ }
      migrateUnownedHistory(device);
      active.current = { owner, generation, device, document: read(owner), running: false };
      const stored = persist(active.current.document); setLoadedOwner(owner); setStatus(stored ? owner === 'guest' ? 'local' : 'offline' : 'memory'); setLastSyncedAt(null);
      setCanImportGuest(owner !== 'guest' && Object.keys(learningValues(read('guest'))).length > 0);
      void sync();
    }, 0);
    return () => { clearTimeout(timer); active.current.generation++; };
  }, [owner, isLoading, persist, sync]);
  useEffect(() => {
    if (isLoading || loadedOwner !== owner) return;
    setLearningStorageAdapter({ owner, values: () => active.current.owner === owner ? learningValues(active.current.document) : {}, set: setEntry });
    return () => setLearningStorageAdapter(null);
  }, [owner, isLoading, loadedOwner, setEntry]);
  useEffect(() => {
    if (loadedOwner !== owner || isLoading) return;
    const timer = setTimeout(() => void sync(), 1200);
    return () => clearTimeout(timer);
  }, [document, loadedOwner, owner, isLoading, sync]);
  useEffect(() => {
    const wake = () => void sync();
    const storage = (event: StorageEvent) => {
      if (event.key === storageKey(owner) && active.current.owner === owner) persist(mergeLearningDocuments(active.current.document, read(owner)));
    };
    window.addEventListener('online', wake); window.addEventListener('focus', wake); window.addEventListener('storage', storage);
    const timer = setInterval(wake, 30000);
    return () => { clearInterval(timer); window.removeEventListener('online', wake); window.removeEventListener('focus', wake); window.removeEventListener('storage', storage); };
  }, [owner, sync, persist]);
  const importGuest = useCallback(() => {
    if (owner === 'guest' || active.current.owner !== owner) return;
    if (!confirm('この端末の未ログイン時の学習履歴を、現在のGoogleアカウントへ引き継ぎますか？共有端末ではご本人の履歴か確認してください。')) return;
    for (const [key, value] of Object.entries(learningValues(read('guest')))) if (!(key in learningValues(active.current.document))) setEntry(key, value);
    setCanImportGuest(false);
  }, [owner, setEntry]);
  const ready = !isLoading && loadedOwner === owner;
  const values = useMemo(() => ready ? learningValues(document) : {}, [ready, document]);
  return <Context.Provider value={{ ready, values, status, lastSyncedAt, setEntry, reset: () => setEntry('reset', true), retry: () => void sync(), canImportGuest, importGuest }}>{children}</Context.Provider>;
}
export function useLearningSync() { const value = useContext(Context); if (!value) throw new Error('LearningSyncProvider is required'); return value; }

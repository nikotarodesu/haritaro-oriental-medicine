"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useRef, ReactNode } from "react";
import { ClinicalMemoItem, CLASSIC_CLINICAL_PAIRS, PatientNoteItem, SAMPLE_PATIENT_NOTES } from "@/types/clinicalMemo";
import { useAuth } from "@/contexts/AuthContext";
import { SUBSCRIPTION_CONFIG } from "@/config/subscription";

import { 
  fetchPatientNotesFromSupabase, 
  upsertPatientNoteToSupabase, 
  deletePatientNoteFromSupabase,
  fetchClinicalMemosFromSupabase,
  upsertClinicalMemoToSupabase,
  deleteClinicalMemoFromSupabase,
  syncLocalDataToSupabase
} from "@/lib/supabase/lazyClinicalMemosDb";

import { persistClinicalNote, type ClinicalNoteFields, type ClinicalNoteSaveResult } from '@/utils/clinicalNoteSave';

import { clinicalStorageKeys, readClinicalStorage, CLINICAL_ACTIVE_OWNER_KEY } from '@/utils/clinicalStorage';

export type SyncStatus = "local" | "syncing" | "synced" | "offline";

interface ClinicalMemoContextType {
  // 配穴・ツボストック
  memos: ClinicalMemoItem[];
  clipCount: number;
  maxLimit: number;
  isLimitReached: boolean;
  isClipped: (id: string) => boolean;
  toggleClip: (item: Omit<ClinicalMemoItem, "createdAt" | "updatedAt">) => boolean;
  addMemo: (item: Omit<ClinicalMemoItem, "createdAt" | "updatedAt">) => boolean;
  removeMemo: (id: string) => void;
  updatePersonalNote: (id: string, note: string) => void;
  clearAllMemos: () => void;
  loadRecommendedPresets: () => void;

  // 臨床ノート（患者症例記録）
  patientNotes: PatientNoteItem[];
  patientNoteCount: number;
  maxPatientNoteLimit: number;
  isPatientNoteLimitReached: boolean;
  addPatientNote: (note: Omit<PatientNoteItem, "id" | "createdAt" | "updatedAt">) => boolean;
  updatePatientNote: (id: string, note: Partial<Omit<PatientNoteItem, "id" | "createdAt">>) => void;
  saveWorkspaceNote: (note: ClinicalNoteFields, existingId?: string) => ClinicalNoteSaveResult;
  removePatientNote: (id: string) => void;
  clearAllPatientNotes: () => void;
  loadSamplePatientNotes: () => void;

  // Identity-scoped readiness also protects draft tools during account changes.
  isReady: boolean;
  clinicalStorageOwner: string | null;

  // クラウド同期ステータス
  syncStatus: SyncStatus;
  triggerSync: () => Promise<void>;

  // バックアップ・データ管理
  exportAllDataAsJson: () => string;
  exportAllDataAsCsv: () => string;
  importDataFromJson: (jsonStr: string) => { success: boolean; message: string };

  // ドロワー制御
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;

  // トースト
  lastToast: { message: string; type: "added" | "removed" | "warning" } | null;
  dismissToast: () => void;
}

const ClinicalMemoContext = createContext<ClinicalMemoContextType | undefined>(undefined);

export function ClinicalMemoProvider({ children }: { children: ReactNode }) {
  const { user, isPremium, isConfigured, isLoading: authLoading = false } = useAuth();
  const userId = user?.id;
  const owner = userId || 'guest';
  const storageKeys = clinicalStorageKeys(owner);
  const [memos, setMemos] = useState<ClinicalMemoItem[]>([]);
  const [patientNotes, setPatientNotes] = useState<PatientNoteItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadedOwner, setLoadedOwner] = useState('');
  const [loadedGeneration, setLoadedGeneration] = useState(0);
  const [syncComplete, setSyncComplete] = useState(false);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('local');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [lastToast, setLastToast] = useState<{ message: string; type: 'added' | 'removed' | 'warning' } | null>(null);
  const [storageError, setStorageError] = useState<{ owner: string; message: string } | null>(null);
  const active = useRef({ owner: '', generation: 0, loaded: false, synced: false, running: false });
  const workspaceSavePending = useRef(false);
  useEffect(() => { workspaceSavePending.current = false; }, [patientNotes, owner]);

  const scopeReady = !authLoading && isLoaded && loadedOwner === owner;
  const canRead = useCallback(() => !authLoading && loadedOwner === owner && isLoaded && active.current.owner === owner && active.current.generation === loadedGeneration, [authLoading, loadedOwner, owner, isLoaded, loadedGeneration]);
  const canMutate = useCallback(() => canRead() && active.current.synced && !active.current.running, [canRead]);
  const blockedMessage = '保存先とアカウントの記録を確認しています。同期が完了してから保存してください。';

  // 配穴・ツボ上限
  const maxLimit = isPremium ? SUBSCRIPTION_CONFIG.limits.premiumMemoMax : SUBSCRIPTION_CONFIG.limits.freeMemoMax;
  const isLimitReached = memos.length >= maxLimit;
  const maxPatientNoteLimit = isPremium ? SUBSCRIPTION_CONFIG.limits.premiumPatientNoteMax : SUBSCRIPTION_CONFIG.limits.freePatientNoteMax;
  const isPatientNoteLimitReached = patientNotes.length >= maxPatientNoteLimit;

  const observeCloudWrite = useCallback((operation: Promise<boolean>) => {
    const state = active.current, generation = state.generation;
    const current = () => active.current === state && state.owner === owner && state.generation === generation;
    void operation.then(ok => { if (current() && !ok) setSyncStatus('offline'); }).catch(() => { if (current()) setSyncStatus('offline'); });
  }, [owner]);

  const triggerSync = useCallback(async () => {
    const state = active.current;
    if (authLoading || !state.loaded || state.owner !== owner || state.running) return;
    if (!userId || !isConfigured) { state.synced = true; setSyncComplete(true); setSyncStatus('local'); return; }
    const generation = state.generation;
    const current = () => active.current === state && state.owner === owner && state.generation === generation;
    state.running = true; state.synced = false; setSyncComplete(false); setSyncStatus('syncing');
    try {
      // Only this verified account's own namespace is eligible for upload.
      // Guest and legacy snapshots stay in the browser until explicitly imported.
      const local = readClinicalStorage(localStorage, owner);
      if (local.notes.length || local.memos.length) {
        const uploaded = await syncLocalDataToSupabase(userId, local.notes, local.memos);
        if (!current()) return;
        if (uploaded.notesSynced !== local.notes.length || uploaded.memosSynced !== local.memos.length) throw new Error('Cloud upload incomplete');
      }
      const [remoteNotes, remoteMemos] = await Promise.all([fetchPatientNotesFromSupabase(), fetchClinicalMemosFromSupabase()]);
      if (!current()) return;
      if (remoteNotes === null || remoteMemos === null) throw new Error('Cloud download incomplete');
      localStorage.setItem(storageKeys.notes, JSON.stringify(remoteNotes));
      localStorage.setItem(storageKeys.memos, JSON.stringify(remoteMemos));
      setPatientNotes(remoteNotes); setMemos(remoteMemos);
      state.synced = true; setSyncComplete(true); setSyncStatus('synced');
    } catch (error) {
      if (!current()) return;
      console.warn('Clinical sync failed; the owner-scoped browser snapshot is retained:', error);
      setSyncStatus('offline');
    } finally { if (current()) state.running = false; }
  }, [owner, userId, isConfigured, authLoading, storageKeys.notes, storageKeys.memos]);

  useEffect(() => {
    const generation = active.current.generation + 1;
    const timer = setTimeout(() => {
      workspaceSavePending.current = false;
      setLastToast(null); setStorageError(null);
      if (authLoading) {
        active.current = { owner: '', generation, loaded: false, synced: false, running: false };
        setIsLoaded(false); setSyncComplete(false); return;
      }
      try {
        const cached = readClinicalStorage(localStorage, owner);
        // Draft readers use the same owner. A blocked session store must not
        // leave a previous account's draft available to a new save operation.
        sessionStorage.setItem(CLINICAL_ACTIVE_OWNER_KEY, owner);
        active.current = { owner, generation, loaded: true, synced: !userId || !isConfigured, running: false };
        setMemos(cached.memos); setPatientNotes(cached.notes);
        setLoadedOwner(owner); setLoadedGeneration(generation); setIsLoaded(true);
        setSyncComplete(!userId || !isConfigured); setSyncStatus(userId && isConfigured ? 'syncing' : 'local');
        void triggerSync();
      } catch (error) {
        active.current = { owner, generation, loaded: false, synced: false, running: false };
        setIsLoaded(false); setSyncComplete(false);
        setStorageError({ owner, message: '記録の保存先を確認できませんでした。入力と既存データは消さずに保持しています。ブラウザの保存設定を確認して再読み込みしてください。' });
        console.error('Unable to load the owner-scoped clinical store:', error);
      }
    }, 0);
    return () => { clearTimeout(timer); active.current.generation++; active.current.loaded = false; };
  }, [owner, authLoading, isConfigured, userId, triggerSync]);

  // Keep old v1 keys intact. Cache only after the matching owner has loaded.
  useEffect(() => {
    if (!canRead()) return;
    try {
      localStorage.setItem(storageKeys.memos, JSON.stringify(memos));
      localStorage.setItem(storageKeys.notes, JSON.stringify(patientNotes));
    } catch (error) { console.error('Failed to cache owner-scoped clinical notes:', error); }
  }, [memos, patientNotes, canRead, storageKeys.memos, storageKeys.notes]);

  // トーストの自動消去（3.5秒）
  useEffect(() => {
    if (!lastToast) return;
    const timer = setTimeout(() => {
      setLastToast(null);
    }, 3500);
    return () => clearTimeout(timer);
  }, [lastToast]);

  const dismissToast = useCallback(() => {
    setLastToast(null);
  }, []);

  const openDrawer = useCallback(() => setIsDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setIsDrawerOpen(false), []);
  const toggleDrawer = useCallback(() => setIsDrawerOpen(prev => !prev), []);

  const isClipped = useCallback((id: string) => {
    if (!canRead()) return false;
    return memos.some(m => m.id === id);
  }, [memos, canRead]);

  // 自作・配穴の追加
  const addMemo = useCallback((item: Omit<ClinicalMemoItem, "createdAt" | "updatedAt">): boolean => {
    if (!canMutate()) return false;
    let success = false;
    let savedItem: ClinicalMemoItem | null = null;
    setMemos(prev => {
      if (prev.some(m => m.id === item.id)) return prev;
      if (prev.length >= maxLimit) {
        setLastToast({
          message: isPremium
            ? `保存上限（${maxLimit}件）に達しました`
            : `無料会員の保存上限（${maxLimit}件）に達しました。プレミアムプランで最大1,000件まで保存可能です。`,
          type: "warning",
        });
        return prev;
      }
      success = true;
      const now = Date.now();
      const newItem: ClinicalMemoItem = {
        ...item,
        createdAt: now,
        updatedAt: now,
      };
      savedItem = newItem;
      setLastToast({
        message: `「${item.title}」をマイノートにストックしました`,
        type: "added",
      });
      return [newItem, ...prev];
    });

    // Supabaseへクラウド保存
    if (savedItem && userId && isConfigured) {
      observeCloudWrite(upsertClinicalMemoToSupabase(userId, savedItem));
    }

    return success;
  }, [maxLimit, isPremium, userId, isConfigured, observeCloudWrite, canMutate]);

  // 自作・配穴の削除
  const removeMemo = useCallback((id: string) => {
    if (!canMutate()) return;
    setMemos(prev => {
      const target = prev.find(m => m.id === id);
      if (target) {
        setLastToast({
          message: `「${target.title}」をマイノートから解除しました`,
          type: "removed",
        });
      }
      return prev.filter(m => m.id !== id);
    });

    // Supabaseから削除
    if (userId && isConfigured) {
      observeCloudWrite(deleteClinicalMemoFromSupabase(id));
    }
  }, [userId, isConfigured, observeCloudWrite, canMutate]);

  const toggleClip = useCallback((item: Omit<ClinicalMemoItem, "createdAt" | "updatedAt">): boolean => {
    if (!canMutate()) return false;
    let newlyAdded = false;
    let targetItem: ClinicalMemoItem | null = null;
    setMemos(prev => {
      const exists = prev.some(m => m.id === item.id);
      if (exists) {
        newlyAdded = false;
        setLastToast({
          message: `「${item.title}」をマイノートから解除しました`,
          type: "removed",
        });
        if (userId && isConfigured) {
          observeCloudWrite(deleteClinicalMemoFromSupabase(item.id));
        }
        return prev.filter(m => m.id !== item.id);
      } else {
        if (prev.length >= maxLimit) {
          setLastToast({
            message: isPremium
              ? `保存上限（${maxLimit}件）に達しました`
              : `無料会員の保存上限（${maxLimit}件）に達しました。プレミアムプランで最大1,000件まで保存可能です。`,
            type: "warning",
          });
          return prev;
        }
        newlyAdded = true;
        const now = Date.now();
        const newItem: ClinicalMemoItem = {
          ...item,
          createdAt: now,
          updatedAt: now,
        };
        targetItem = newItem;
        setLastToast({
          message: `「${item.title}」をマイノートにストックしました`,
          type: "added",
        });
        return [newItem, ...prev];
      }
    });

    if (newlyAdded && targetItem && userId && isConfigured) {
      observeCloudWrite(upsertClinicalMemoToSupabase(userId, targetItem));
    }

    return newlyAdded;
  }, [maxLimit, isPremium, userId, isConfigured, observeCloudWrite, canMutate]);

  const updatePersonalNote = useCallback((id: string, note: string) => {
    if (!canMutate()) return;
    let updatedItem: ClinicalMemoItem | null = null;
    setMemos(prev =>
      prev.map(item => {
        if (item.id === id) {
          const updated = { ...item, personalNotes: note, updatedAt: Date.now() };
          updatedItem = updated;
          return updated;
        }
        return item;
      })
    );

    if (updatedItem && userId && isConfigured) {
      observeCloudWrite(upsertClinicalMemoToSupabase(userId, updatedItem));
    }
  }, [userId, isConfigured, observeCloudWrite, canMutate]);

  const clearAllMemos = useCallback(() => {
    if (!canMutate()) return;
    if (window.confirm("マイノートにストックした配穴・ツボをすべて消去しますか？")) {
      memos.forEach(m => {
        if (userId && isConfigured) observeCloudWrite(deleteClinicalMemoFromSupabase(m.id));
      });
      setMemos([]);
      setLastToast({
        message: "配穴ストックをすべて消去しました",
        type: "removed",
      });
    }
  }, [memos, userId, isConfigured, observeCloudWrite, canMutate]);

  // おすすめ名配穴プリセット読み込み
  const loadRecommendedPresets = useCallback(() => {
    if (!canMutate()) return;
    const now = Date.now();
    setMemos(prev => {
      const existingIds = new Set(prev.map(p => p.id));
      const additions = CLASSIC_CLINICAL_PAIRS.filter(p => !existingIds.has(p.id)).map(p => ({
        ...p,
        createdAt: now,
        updatedAt: now,
      }));
      if (userId && isConfigured) {
        additions.forEach(p => observeCloudWrite(upsertClinicalMemoToSupabase(userId, p)));
      }
      return [...additions, ...prev];
    });
    setLastToast({
      message: `重要名配穴（太衝＋陽陵泉など${CLASSIC_CLINICAL_PAIRS.length}件）を読み込みました`,
      type: "added",
    });
  }, [userId, isConfigured, observeCloudWrite, canMutate]);

  // ----------------------------------------------------
  // 臨床ノート（患者症例記録）の操作
  // ----------------------------------------------------
  const addPatientNote = useCallback((noteData: Omit<PatientNoteItem, "id" | "createdAt" | "updatedAt">): boolean => {
    if (!canMutate()) return false;
    let success = false;
    let savedNote: PatientNoteItem | null = null;
    setPatientNotes(prev => {
      if (prev.length >= maxPatientNoteLimit) {
        setLastToast({
          message: isPremium
            ? `臨床ノートの保存上限（${maxPatientNoteLimit}件）に達しました`
            : `無料会員の臨床ノート上限（${maxPatientNoteLimit}件）に達しました。プレミアムプランで最大500件まで保存可能です。`,
          type: "warning",
        });
        return prev;
      }
      success = true;
      const now = Date.now();
      const newNote: PatientNoteItem = {
        ...noteData,
        id: `pn_${now}_${Math.random().toString(36).substring(2, 7)}`,
        createdAt: now,
        updatedAt: now,
      };
      savedNote = newNote;
      setLastToast({
        message: `臨床ノート「${newNote.patientIdentifier}」を保存しました`,
        type: "added",
      });
      return [newNote, ...prev];
    });

    // Supabaseへクラウド保存
    if (savedNote && userId && isConfigured) {
      observeCloudWrite(upsertPatientNoteToSupabase(userId, savedNote));
    }

    return success;
  }, [maxPatientNoteLimit, isPremium, userId, isConfigured, observeCloudWrite, canMutate]);

  const saveWorkspaceNote = useCallback((fields: ClinicalNoteFields, existingId?: string): ClinicalNoteSaveResult => {
    if (!canMutate() || workspaceSavePending.current) return { ok: false, error: blockedMessage };
    workspaceSavePending.current = true;
    const saved = persistClinicalNote(patientNotes, fields, existingId, maxPatientNoteLimit, next => localStorage.setItem(storageKeys.notes, JSON.stringify(next)));
    if (!saved.result.ok || !saved.notes || !saved.note) { workspaceSavePending.current = false; return saved.result; }
    setPatientNotes(saved.notes);
    setLastToast({ message: '臨床ノート「' + saved.note.patientIdentifier + '」を保存しました', type: 'added' });
    if (userId && isConfigured) {
      const state = active.current, generation = state.generation;
      const current = () => active.current === state && state.owner === owner && state.generation === generation;
      state.running = true; setSyncStatus('syncing');
      void upsertPatientNoteToSupabase(userId, saved.note).then(ok => {
        if (current()) { state.running = false; setSyncStatus(ok ? 'synced' : 'offline'); }
      }).catch(() => { if (current()) { state.running = false; setSyncStatus('offline'); } });
    }
    return saved.result;
  }, [canMutate, patientNotes, maxPatientNoteLimit, storageKeys.notes, userId, isConfigured, owner]);

  const updatePatientNote = useCallback((id: string, noteData: Partial<Omit<PatientNoteItem, "id" | "createdAt">>) => {
    if (!canMutate()) return;
    let updatedNote: PatientNoteItem | null = null;
    setPatientNotes(prev =>
      prev.map(note => {
        if (note.id === id) {
          const updated = { ...note, ...noteData, updatedAt: Date.now() };
          updatedNote = updated;
          return updated;
        }
        return note;
      })
    );

    if (updatedNote && userId && isConfigured) {
      observeCloudWrite(upsertPatientNoteToSupabase(userId, updatedNote));
    }

    setLastToast({
      message: "臨床ノートを更新しました",
      type: "added",
    });
  }, [userId, isConfigured, observeCloudWrite, canMutate]);

  const removePatientNote = useCallback((id: string) => {
    if (!canMutate()) return;
    setPatientNotes(prev => {
      const target = prev.find(n => n.id === id);
      if (target) {
        setLastToast({
          message: `「${target.patientIdentifier}」の臨床ノートを削除しました`,
          type: "removed",
        });
      }
      return prev.filter(n => n.id !== id);
    });

    if (userId && isConfigured) {
      observeCloudWrite(deletePatientNoteFromSupabase(id));
    }
  }, [userId, isConfigured, observeCloudWrite, canMutate]);

  const clearAllPatientNotes = useCallback(() => {
    if (!canMutate()) return;
    if (window.confirm("すべての臨床ノート（患者症例記録）を消去しますか？（取り消せません）")) {
      patientNotes.forEach(n => {
        if (userId && isConfigured) observeCloudWrite(deletePatientNoteFromSupabase(n.id));
      });
      setPatientNotes([]);
      setLastToast({
        message: "臨床ノートをすべて消去しました",
        type: "removed",
      });
    }
  }, [patientNotes, userId, isConfigured, observeCloudWrite, canMutate]);

  const loadSamplePatientNotes = useCallback(() => {
    if (!canMutate()) return;
    setPatientNotes(SAMPLE_PATIENT_NOTES);
    setLastToast({
      message: "サンプル臨床ノート（2件）を復元しました",
      type: "added",
    });
  }, [canMutate]);

  // ----------------------------------------------------
  // バックアップ・データ管理（JSONエクスポート／インポート）
  // ----------------------------------------------------
  const exportAllDataAsJson = useCallback((): string => {
    const backupData = {
      version: 1,
      appName: "haritaro_oriental_medicine_mynote",
      exportedAt: new Date().toISOString(),
      memos: canRead() ? memos : [],
      patientNotes: canRead() ? patientNotes : [],
    };
    return JSON.stringify(backupData, null, 2);
  }, [memos, patientNotes, canRead]);

  const exportAllDataAsCsv = useCallback((): string => {
    const headers = [
      "ID",
      "患者番号",
      "来院日",
      "性別",
      "年代",
      "主訴",
      "体質・傾向",
      "弁証・証名",
      "採用経穴",
      "施術方針・本標",
      "施術直後の変化",
      "次回課題・養生指示",
      "更新日時",
    ];

    const escapeCsv = (val: string | number | undefined | null): string => {
      if (val === undefined || val === null || val === "") return '""';
      const clean = String(val).replace(/"/g, '""');
      return `"${clean}"`;
    };

    const rows = (canRead() ? patientNotes : []).map((note) => {
      const dateStr = note.updatedAt 
        ? new Date(note.updatedAt).toISOString()
        : note.createdAt 
          ? new Date(note.createdAt).toISOString()
          : "";
      return [
        escapeCsv(note.id),
        escapeCsv(note.patientIdentifier),
        escapeCsv(note.visitDate),
        escapeCsv(note.gender),
        escapeCsv(note.ageGroup),
        escapeCsv(note.chiefComplaint),
        escapeCsv(note.constitution),
        escapeCsv(note.syndrome),
        escapeCsv(note.selectedPoints?.join("、 ") || ""),
        escapeCsv(note.treatmentPlan),
        escapeCsv(note.patientReaction),
        escapeCsv(note.nextAction),
        escapeCsv(dateStr),
      ].join(",");
    });

    // Excel対応のためBOM (\uFEFF) を付与
    return "\uFEFF" + [headers.map((h) => `"${h}"`).join(","), ...rows].join("\r\n");
  }, [patientNotes, canRead]);

  const importDataFromJson = useCallback((jsonStr: string): { success: boolean; message: string } => {
    if (!canMutate()) return { success: false, message: blockedMessage };
    try {
      const parsed = JSON.parse(jsonStr);
      let addedMemos = 0;
      let addedNotes = 0;

      if (parsed && Array.isArray(parsed.memos)) {
        setMemos(parsed.memos);
        addedMemos = parsed.memos.length;
      }
      if (parsed && Array.isArray(parsed.patientNotes)) {
        setPatientNotes(parsed.patientNotes);
        addedNotes = parsed.patientNotes.length;
      }

      const msg = `復元が完了しました（配穴ストック: ${addedMemos}件、臨床ノート: ${addedNotes}件）`;
      setLastToast({
        message: msg,
        type: "added",
      });
      return { success: true, message: msg };
    } catch (e) {
      return { success: false, message: "JSONファイルの形式が正しくありません" };
    }
  }, [canMutate]);

  return (
    <ClinicalMemoContext.Provider
      value={{
        // 配穴ストック
        memos: scopeReady ? memos : [],
        clipCount: scopeReady ? memos.length : 0,
        maxLimit,
        isLimitReached: scopeReady && isLimitReached,
        isClipped,
        toggleClip,
        addMemo,
        removeMemo,
        updatePersonalNote,
        clearAllMemos,
        loadRecommendedPresets,

        // 臨床ノート
        patientNotes: scopeReady ? patientNotes : [],
        patientNoteCount: scopeReady ? patientNotes.length : 0,
        maxPatientNoteLimit,
        isPatientNoteLimitReached: scopeReady && isPatientNoteLimitReached,
        addPatientNote,
        updatePatientNote,
        saveWorkspaceNote,
        removePatientNote,
        clearAllPatientNotes,
        loadSamplePatientNotes,

        // クラウド同期ステータス
        isReady: scopeReady && syncComplete && syncStatus !== 'syncing',
        clinicalStorageOwner: scopeReady ? owner : null,
        syncStatus: storageError?.owner === owner ? 'offline' : scopeReady ? syncStatus : 'syncing',
        triggerSync,

        // バックアップ
        exportAllDataAsJson,
        exportAllDataAsCsv,
        importDataFromJson,

        // ドロワー
        isDrawerOpen,
        openDrawer,
        closeDrawer,
        toggleDrawer,

        // トースト
        lastToast: storageError?.owner === owner ? { message: storageError.message, type: 'warning' } : scopeReady ? lastToast : null,
        dismissToast,
      }}
    >
      {children}
    </ClinicalMemoContext.Provider>
  );
}

export function useClinicalMemo() {
  const context = useContext(ClinicalMemoContext);
  if (!context) {
    throw new Error("useClinicalMemo must be used within a ClinicalMemoProvider");
  }
  return context;
}


"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
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
} from "@/lib/supabase/clinicalMemosDb";

const STORAGE_KEY = "haritaro_clinical_memos_v1";
const PATIENT_NOTES_STORAGE_KEY = "haritaro_patient_notes_v1";

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
  removePatientNote: (id: string) => void;
  clearAllPatientNotes: () => void;
  loadSamplePatientNotes: () => void;

  // クラウド同期ステータス
  syncStatus: SyncStatus;
  triggerSync: () => Promise<void>;

  // バックアップ・データ管理
  exportAllDataAsJson: () => string;
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
  const { user, isPremium, isConfigured } = useAuth();
  const [memos, setMemos] = useState<ClinicalMemoItem[]>([]);
  const [patientNotes, setPatientNotes] = useState<PatientNoteItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>("local");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [lastToast, setLastToast] = useState<{ message: string; type: "added" | "removed" | "warning" } | null>(null);

  // 配穴・ツボ上限
  const maxLimit = isPremium
    ? SUBSCRIPTION_CONFIG.limits.premiumMemoMax
    : SUBSCRIPTION_CONFIG.limits.freeMemoMax;
  const isLimitReached = memos.length >= maxLimit;

  // 臨床ノート上限
  const maxPatientNoteLimit = isPremium
    ? SUBSCRIPTION_CONFIG.limits.premiumPatientNoteMax
    : SUBSCRIPTION_CONFIG.limits.freePatientNoteMax;
  const isPatientNoteLimitReached = patientNotes.length >= maxPatientNoteLimit;

  // 1. 初回マウント時：LocalStorageから即座にロード（高速表示）
  useEffect(() => {
    try {
      // 1. 配穴・ツボストック
      const storedMemos = localStorage.getItem(STORAGE_KEY);
      if (storedMemos) {
        const parsed = JSON.parse(storedMemos);
        if (Array.isArray(parsed)) {
          setMemos(parsed);
        }
      }

      // 2. 臨床ノート
      const storedNotes = localStorage.getItem(PATIENT_NOTES_STORAGE_KEY);
      if (storedNotes) {
        const parsedNotes = JSON.parse(storedNotes);
        if (Array.isArray(parsedNotes)) {
          setPatientNotes(parsedNotes);
        }
      } else {
        setPatientNotes([]);
      }
    } catch (e) {
      console.error("Failed to load clinical notes from localStorage", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // 2. Supabaseとの同期処理（ログイン時に自動実行）
  const triggerSync = useCallback(async () => {
    if (!user?.id || !isConfigured) {
      setSyncStatus("local");
      return;
    }

    setSyncStatus("syncing");
    try {
      // 未ログイン時に作成されたローカルデータの救済（Supabaseへアップロード）
      const localMemosStr = localStorage.getItem(STORAGE_KEY);
      const localNotesStr = localStorage.getItem(PATIENT_NOTES_STORAGE_KEY);
      const localMemos: ClinicalMemoItem[] = localMemosStr ? JSON.parse(localMemosStr) : [];
      const localNotes: PatientNoteItem[] = localNotesStr ? JSON.parse(localNotesStr) : [];

      if (localNotes.length > 0 || localMemos.length > 0) {
        await syncLocalDataToSupabase(user.id, localNotes, localMemos);
      }

      // Supabaseからログインユーザーの最新データを全件取得
      const [remoteNotes, remoteMemos] = await Promise.all([
        fetchPatientNotesFromSupabase(),
        fetchClinicalMemosFromSupabase(),
      ]);

      if (remoteNotes !== null) {
        setPatientNotes(remoteNotes);
        localStorage.setItem(PATIENT_NOTES_STORAGE_KEY, JSON.stringify(remoteNotes));
      }
      if (remoteMemos !== null) {
        setMemos(remoteMemos);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(remoteMemos));
      }

      setSyncStatus("synced");
    } catch (e) {
      console.warn("Supabase sync failed, using local cache:", e);
      setSyncStatus("offline");
    }
  }, [user?.id, isConfigured]);

  // ログイン状態の変化を検知して同期
  useEffect(() => {
    if (isLoaded && user?.id && isConfigured) {
      triggerSync();
    } else if (isLoaded && !user) {
      setSyncStatus("local");
    }
  }, [isLoaded, user?.id, isConfigured, triggerSync]);

  // 3. ローカルストレージへのキャッシュ同期保存
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(memos));
      localStorage.setItem(PATIENT_NOTES_STORAGE_KEY, JSON.stringify(patientNotes));
    } catch (e) {
      console.error("Failed to save clinical notes to localStorage", e);
    }
  }, [memos, patientNotes, isLoaded]);

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
    return memos.some(m => m.id === id);
  }, [memos]);

  // 自作・配穴の追加
  const addMemo = useCallback((item: Omit<ClinicalMemoItem, "createdAt" | "updatedAt">): boolean => {
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
    if (savedItem && user?.id && isConfigured) {
      upsertClinicalMemoToSupabase(user.id, savedItem);
    }

    return success;
  }, [maxLimit, isPremium, user?.id, isConfigured]);

  // 自作・配穴の削除
  const removeMemo = useCallback((id: string) => {
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
    if (user?.id && isConfigured) {
      deleteClinicalMemoFromSupabase(id);
    }
  }, [user?.id, isConfigured]);

  const toggleClip = useCallback((item: Omit<ClinicalMemoItem, "createdAt" | "updatedAt">): boolean => {
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
        if (user?.id && isConfigured) {
          deleteClinicalMemoFromSupabase(item.id);
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

    if (newlyAdded && targetItem && user?.id && isConfigured) {
      upsertClinicalMemoToSupabase(user.id, targetItem);
    }

    return newlyAdded;
  }, [maxLimit, isPremium, user?.id, isConfigured]);

  const updatePersonalNote = useCallback((id: string, note: string) => {
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

    if (updatedItem && user?.id && isConfigured) {
      upsertClinicalMemoToSupabase(user.id, updatedItem);
    }
  }, [user?.id, isConfigured]);

  const clearAllMemos = useCallback(() => {
    if (window.confirm("マイノートにストックした配穴・ツボをすべて消去しますか？")) {
      memos.forEach(m => {
        if (user?.id && isConfigured) deleteClinicalMemoFromSupabase(m.id);
      });
      setMemos([]);
      setLastToast({
        message: "配穴ストックをすべて消去しました",
        type: "removed",
      });
    }
  }, [memos, user?.id, isConfigured]);

  // おすすめ名配穴プリセット読み込み
  const loadRecommendedPresets = useCallback(() => {
    const now = Date.now();
    setMemos(prev => {
      const existingIds = new Set(prev.map(p => p.id));
      const additions = CLASSIC_CLINICAL_PAIRS.filter(p => !existingIds.has(p.id)).map(p => ({
        ...p,
        createdAt: now,
        updatedAt: now,
      }));
      if (user?.id && isConfigured) {
        additions.forEach(p => upsertClinicalMemoToSupabase(user.id, p));
      }
      return [...additions, ...prev];
    });
    setLastToast({
      message: `重要名配穴（太衝＋陽陵泉など${CLASSIC_CLINICAL_PAIRS.length}件）を読み込みました`,
      type: "added",
    });
  }, [user?.id, isConfigured]);

  // ----------------------------------------------------
  // 臨床ノート（患者症例記録）の操作
  // ----------------------------------------------------
  const addPatientNote = useCallback((noteData: Omit<PatientNoteItem, "id" | "createdAt" | "updatedAt">): boolean => {
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
    if (savedNote && user?.id && isConfigured) {
      upsertPatientNoteToSupabase(user.id, savedNote);
    }

    return success;
  }, [maxPatientNoteLimit, isPremium, user?.id, isConfigured]);

  const updatePatientNote = useCallback((id: string, noteData: Partial<Omit<PatientNoteItem, "id" | "createdAt">>) => {
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

    if (updatedNote && user?.id && isConfigured) {
      upsertPatientNoteToSupabase(user.id, updatedNote);
    }

    setLastToast({
      message: "臨床ノートを更新しました",
      type: "added",
    });
  }, [user?.id, isConfigured]);

  const removePatientNote = useCallback((id: string) => {
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

    if (user?.id && isConfigured) {
      deletePatientNoteFromSupabase(id);
    }
  }, [user?.id, isConfigured]);

  const clearAllPatientNotes = useCallback(() => {
    if (window.confirm("すべての臨床ノート（患者症例記録）を消去しますか？（取り消せません）")) {
      patientNotes.forEach(n => {
        if (user?.id && isConfigured) deletePatientNoteFromSupabase(n.id);
      });
      setPatientNotes([]);
      setLastToast({
        message: "臨床ノートをすべて消去しました",
        type: "removed",
      });
    }
  }, [patientNotes, user?.id, isConfigured]);

  const loadSamplePatientNotes = useCallback(() => {
    setPatientNotes(SAMPLE_PATIENT_NOTES);
    setLastToast({
      message: "サンプル臨床ノート（2件）を復元しました",
      type: "added",
    });
  }, []);

  // ----------------------------------------------------
  // バックアップ・データ管理（JSONエクスポート／インポート）
  // ----------------------------------------------------
  const exportAllDataAsJson = useCallback((): string => {
    const backupData = {
      version: 1,
      appName: "haritaro_oriental_medicine_mynote",
      exportedAt: new Date().toISOString(),
      memos,
      patientNotes,
    };
    return JSON.stringify(backupData, null, 2);
  }, [memos, patientNotes]);

  const importDataFromJson = useCallback((jsonStr: string): { success: boolean; message: string } => {
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
  }, []);

  return (
    <ClinicalMemoContext.Provider
      value={{
        // 配穴ストック
        memos,
        clipCount: memos.length,
        maxLimit,
        isLimitReached,
        isClipped,
        toggleClip,
        addMemo,
        removeMemo,
        updatePersonalNote,
        clearAllMemos,
        loadRecommendedPresets,

        // 臨床ノート
        patientNotes,
        patientNoteCount: patientNotes.length,
        maxPatientNoteLimit,
        isPatientNoteLimitReached,
        addPatientNote,
        updatePatientNote,
        removePatientNote,
        clearAllPatientNotes,
        loadSamplePatientNotes,

        // クラウド同期ステータス
        syncStatus,
        triggerSync,

        // バックアップ
        exportAllDataAsJson,
        importDataFromJson,

        // ドロワー
        isDrawerOpen,
        openDrawer,
        closeDrawer,
        toggleDrawer,

        // トースト
        lastToast,
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


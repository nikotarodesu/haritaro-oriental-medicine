"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { ClinicalMemoItem, CLASSIC_CLINICAL_PAIRS, PatientNoteItem, SAMPLE_PATIENT_NOTES } from "@/types/clinicalMemo";
import { useAuth } from "@/contexts/AuthContext";
import { SUBSCRIPTION_CONFIG } from "@/config/subscription";

const STORAGE_KEY = "haritaro_clinical_memos_v1";
const PATIENT_NOTES_STORAGE_KEY = "haritaro_patient_notes_v1";

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
  const { isPremium } = useAuth();
  const [memos, setMemos] = useState<ClinicalMemoItem[]>([]);
  const [patientNotes, setPatientNotes] = useState<PatientNoteItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
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

  // ローカルストレージから復元
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
        // 初回のみサンプルノートをセット
        setPatientNotes(SAMPLE_PATIENT_NOTES);
      }
    } catch (e) {
      console.error("Failed to load clinical notes from localStorage", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // ローカルストレージへの同期保存
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

  const addMemo = useCallback((item: Omit<ClinicalMemoItem, "createdAt" | "updatedAt">): boolean => {
    let success = false;
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
      setLastToast({
        message: `「${item.title}」をマイノートにストックしました`,
        type: "added",
      });
      return [newItem, ...prev];
    });
    return success;
  }, [maxLimit, isPremium]);

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
  }, []);

  const toggleClip = useCallback((item: Omit<ClinicalMemoItem, "createdAt" | "updatedAt">): boolean => {
    let newlyAdded = false;
    setMemos(prev => {
      const exists = prev.some(m => m.id === item.id);
      if (exists) {
        newlyAdded = false;
        setLastToast({
          message: `「${item.title}」をマイノートから解除しました`,
          type: "removed",
        });
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
        setLastToast({
          message: `「${item.title}」をマイノートにストックしました`,
          type: "added",
        });
        return [newItem, ...prev];
      }
    });
    return newlyAdded;
  }, [maxLimit, isPremium]);

  const updatePersonalNote = useCallback((id: string, note: string) => {
    setMemos(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, personalNotes: note, updatedAt: Date.now() }
          : item
      )
    );
  }, []);

  const clearAllMemos = useCallback(() => {
    if (window.confirm("マイノートにストックした配穴・ツボをすべて消去しますか？")) {
      setMemos([]);
      setLastToast({
        message: "配穴ストックをすべて消去しました",
        type: "removed",
      });
    }
  }, []);

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
      return [...additions, ...prev];
    });
    setLastToast({
      message: `重要名配穴（太衝＋陽陵泉など${CLASSIC_CLINICAL_PAIRS.length}件）を読み込みました`,
      type: "added",
    });
  }, []);

  // ----------------------------------------------------
  // 臨床ノート（患者症例記録）の操作
  // ----------------------------------------------------
  const addPatientNote = useCallback((noteData: Omit<PatientNoteItem, "id" | "createdAt" | "updatedAt">): boolean => {
    let success = false;
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
      setLastToast({
        message: `臨床ノート「${newNote.patientIdentifier}」を保存しました`,
        type: "added",
      });
      return [newNote, ...prev];
    });
    return success;
  }, [maxPatientNoteLimit, isPremium]);

  const updatePatientNote = useCallback((id: string, noteData: Partial<Omit<PatientNoteItem, "id" | "createdAt">>) => {
    setPatientNotes(prev =>
      prev.map(note =>
        note.id === id
          ? { ...note, ...noteData, updatedAt: Date.now() }
          : note
      )
    );
    setLastToast({
      message: "臨床ノートを更新しました",
      type: "added",
    });
  }, []);

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
  }, []);

  const clearAllPatientNotes = useCallback(() => {
    if (window.confirm("すべての臨床ノート（患者症例記録）を消去しますか？（取り消せません）")) {
      setPatientNotes([]);
      setLastToast({
        message: "臨床ノートをすべて消去しました",
        type: "removed",
      });
    }
  }, []);

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


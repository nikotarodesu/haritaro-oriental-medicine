"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { ClinicalMemoItem, CLASSIC_CLINICAL_PAIRS } from "@/types/clinicalMemo";
import { useAuth } from "@/contexts/AuthContext";
import { SUBSCRIPTION_CONFIG } from "@/config/subscription";

const STORAGE_KEY = "haritaro_clinical_memos_v1";

interface ClinicalMemoContextType {
  memos: ClinicalMemoItem[];
  clipCount: number;
  maxLimit: number;
  isLimitReached: boolean;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
  isClipped: (id: string) => boolean;
  toggleClip: (item: Omit<ClinicalMemoItem, "createdAt" | "updatedAt">) => boolean;
  addMemo: (item: Omit<ClinicalMemoItem, "createdAt" | "updatedAt">) => boolean;
  removeMemo: (id: string) => void;
  updatePersonalNote: (id: string, note: string) => void;
  clearAllMemos: () => void;
  loadRecommendedPresets: () => void;
  lastToast: { message: string; type: "added" | "removed" | "warning" } | null;
  dismissToast: () => void;
}

const ClinicalMemoContext = createContext<ClinicalMemoContextType | undefined>(undefined);

export function ClinicalMemoProvider({ children }: { children: ReactNode }) {
  const { isPremium } = useAuth();
  const [memos, setMemos] = useState<ClinicalMemoItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [lastToast, setLastToast] = useState<{ message: string; type: "added" | "removed" | "warning" } | null>(null);

  const maxLimit = isPremium
    ? SUBSCRIPTION_CONFIG.limits.premiumMemoMax
    : SUBSCRIPTION_CONFIG.limits.freeMemoMax;
  const isLimitReached = memos.length >= maxLimit;

  // ローカルストレージから復元
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setMemos(parsed);
        }
      }
    } catch (e) {
      console.error("Failed to load clinical memos from localStorage", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // ローカルストレージへの同期保存
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(memos));
    } catch (e) {
      console.error("Failed to save clinical memos to localStorage", e);
    }
  }, [memos, isLoaded]);

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
        message: `「${item.title}」をマイカルテに保存しました`,
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
          message: `「${target.title}」をマイカルテから解除しました`,
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
          message: `「${item.title}」をマイカルテから解除しました`,
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
          message: `「${item.title}」をマイカルテに保存しました`,
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
    if (window.confirm("マイカルテ・マイ要穴集のすべての保存メモを消去しますか？")) {
      setMemos([]);
      setLastToast({
        message: "マイカルテをすべて消去しました",
        type: "removed",
      });
    }
  }, []);

  // おすすめ重要配穴（太衝＋陽陵泉など）のワンクリック一括プリセット読み込み
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

  return (
    <ClinicalMemoContext.Provider
      value={{
        memos,
        clipCount: memos.length,
        maxLimit,
        isLimitReached,
        isDrawerOpen,
        openDrawer,
        closeDrawer,
        toggleDrawer,
        isClipped,
        toggleClip,
        addMemo,
        removeMemo,
        updatePersonalNote,
        clearAllMemos,
        loadRecommendedPresets,
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

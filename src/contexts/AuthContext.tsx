"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { User, UserRole, SubscriptionPlan, UserSubscription, LocalDataMigrationReport } from "@/types/auth";
import { SUBSCRIPTION_CONFIG } from "@/config/subscription";

const AUTH_STORAGE_KEY = "haritaro_auth_user_v1";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isPremium: boolean;
  login: (email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  register: (email: string, name?: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  upgradeToPremium: (plan: SubscriptionPlan) => Promise<void>;
  cancelSubscription: () => Promise<void>;
  resumeSubscription: () => Promise<void>;
  migrateLocalData: () => LocalDataMigrationReport;
  // テスト・デモ用切り替え（開発および動作確認用）
  setDemoRole: (role: UserRole, plan?: SubscriptionPlan) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 初期ロード：localStorageからユーザー復元
  useEffect(() => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // 有効期限のチェック
        if (parsed.role !== "admin" && parsed.subscription && parsed.subscription.currentPeriodEnd) {
          const isExpired = Date.now() > parsed.subscription.currentPeriodEnd;
          if (isExpired && parsed.subscription.status === "canceled") {
            parsed.role = "free";
            parsed.subscription.status = "none";
          }
        }
        setUser(parsed);
      }
    } catch (e) {
      console.error("Failed to restore user from localStorage:", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ユーザー変更時のlocalStorage保存
  useEffect(() => {
    if (isLoading) return;
    try {
      if (user) {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    } catch (e) {
      console.error("Failed to persist user to localStorage:", e);
    }
  }, [user, isLoading]);

  // ログイン
  const login = useCallback(async (email: string, _password?: string) => {
    setIsLoading(true);
    try {
      // 簡易ログイン（メールアドレスベース）
      const cleanEmail = email.trim().toLowerCase();
      const existingRaw = localStorage.getItem(AUTH_STORAGE_KEY);
      let existingUser: User | null = null;
      if (existingRaw) {
        try {
          const parsed = JSON.parse(existingRaw);
          if (parsed.email === cleanEmail) {
            existingUser = parsed;
          }
        } catch {}
      }

      const loggedInUser: User = existingUser || {
        id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        email: cleanEmail,
        name: cleanEmail.split("@")[0] || "東洋医学探求者",
        role: "free",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      setUser(loggedInUser);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message || "ログインに失敗しました" };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 会員登録
  const register = useCallback(async (email: string, name?: string, _password?: string) => {
    setIsLoading(true);
    try {
      const cleanEmail = email.trim().toLowerCase();
      const newUser: User = {
        id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        email: cleanEmail,
        name: name?.trim() || cleanEmail.split("@")[0] || "東洋医学会員",
        role: "free",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      setUser(newUser);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message || "会員登録に失敗しました" };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ログアウト
  const logout = useCallback(() => {
    setUser(null);
  }, []);

  // プレミアムへのアップグレード
  const upgradeToPremium = useCallback(async (plan: SubscriptionPlan) => {
    const now = Date.now();
    const periodDuration = plan === "yearly" ? 365 * 24 * 60 * 60 * 1000 : 30 * 24 * 60 * 60 * 1000;
    
    const subscription: UserSubscription = {
      plan,
      status: "active",
      currentPeriodStart: now,
      currentPeriodEnd: now + periodDuration,
      cancelAtPeriodEnd: false,
    };

    setUser(prev => {
      if (!prev) {
        // 未ログイン状態で直接アップグレードされた場合、ゲストプレミアムを作成
        return {
          id: `usr_guest_${Date.now()}`,
          email: "guest-member@haritaro.jp",
          name: "プレミアム会員",
          role: "premium",
          subscription,
          createdAt: now,
          updatedAt: now,
        };
      }
      return {
        ...prev,
        role: "premium",
        subscription,
        updatedAt: now,
      };
    });
  }, []);

  // 解約予約（次回更新日に解約）
  const cancelSubscription = useCallback(async () => {
    setUser(prev => {
      if (!prev || !prev.subscription) return prev;
      return {
        ...prev,
        subscription: {
          ...prev.subscription,
          status: "canceled",
          cancelAtPeriodEnd: true,
        },
        updatedAt: Date.now(),
      };
    });
  }, []);

  // 解約の取り消し・再開
  const resumeSubscription = useCallback(async () => {
    setUser(prev => {
      if (!prev || !prev.subscription) return prev;
      return {
        ...prev,
        subscription: {
          ...prev.subscription,
          status: "active",
          cancelAtPeriodEnd: false,
        },
        updatedAt: Date.now(),
      };
    });
  }, []);

  // ローカルデータ移行機能（既存のlocalStorageのメモや学習進捗をカウント・確認）
  const migrateLocalData = useCallback((): LocalDataMigrationReport => {
    let memoCount = 0;
    let curriculumProgressCount = 0;
    let quizResultCount = 0;

    try {
      const memosRaw = localStorage.getItem("haritaro_clinical_memos_v1");
      if (memosRaw) {
        const parsed = JSON.parse(memosRaw);
        if (Array.isArray(parsed)) memoCount = parsed.length;
      }

      const progressRaw = localStorage.getItem("haritaro-learning-progress-v1");
      if (progressRaw) {
        const parsed = JSON.parse(progressRaw);
        if (parsed.completedLectures) {
          curriculumProgressCount = Object.keys(parsed.completedLectures).filter(k => parsed.completedLectures[k]).length;
        }
        if (parsed.quizResults) {
          quizResultCount = Object.keys(parsed.quizResults).length;
        }
      }
    } catch (e) {
      console.error("Error inspecting local storage for migration:", e);
    }

    return {
      memoCount,
      curriculumProgressCount,
      quizResultCount,
      migratedAt: Date.now(),
    };
  }, []);

  // テスト用・ワンクリック切り替え
  const setDemoRole = useCallback((role: UserRole, plan: SubscriptionPlan = "monthly") => {
    const now = Date.now();
    if (role === "admin") {
      setUser({
        id: "usr_admin",
        email: "admin@haritaro.jp",
        name: "管理者（はり太郎）",
        role: "admin",
        subscription: {
          plan: "yearly",
          status: "active",
          currentPeriodStart: now,
          currentPeriodEnd: now + 10 * 365 * 24 * 60 * 60 * 1000,
          cancelAtPeriodEnd: false,
        },
        createdAt: now,
        updatedAt: now,
      });
    } else if (role === "premium") {
      const periodDuration = plan === "yearly" ? 365 * 24 * 60 * 60 * 1000 : 30 * 24 * 60 * 60 * 1000;
      setUser({
        id: "usr_demo_premium",
        email: "demo-premium@haritaro.jp",
        name: "テスト・プレミアム会員",
        role: "premium",
        subscription: {
          plan,
          status: "active",
          currentPeriodStart: now,
          currentPeriodEnd: now + periodDuration,
          cancelAtPeriodEnd: false,
        },
        createdAt: now,
        updatedAt: now,
      });
    } else if (role === "free") {
      setUser({
        id: "usr_demo_free",
        email: "demo-free@haritaro.jp",
        name: "テスト・無料会員",
        role: "free",
        createdAt: now,
        updatedAt: now,
      });
    } else {
      setUser(null);
    }
  }, []);

  const isPremium =
    user?.role === "admin" ||
    (user?.role === "premium" && (
      user.subscription?.status === "active" ||
      user.subscription?.status === "canceled" // 期間満了まではプレミアム権限を維持
    ));

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        isPremium: !!isPremium,
        login,
        register,
        logout,
        upgradeToPremium,
        cancelSubscription,
        resumeSubscription,
        migrateLocalData,
        setDemoRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

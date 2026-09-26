"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { User, UserRole, SubscriptionPlan, UserSubscription, LocalDataMigrationReport } from "@/types/auth";
import { SUBSCRIPTION_CONFIG } from "@/config/subscription";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";

const AUTH_STORAGE_KEY = "haritaro_auth_user_v1";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isPremium: boolean;
  isConfigured: boolean;
  loginWithGoogle: (redirectTo?: string) => Promise<{ success: boolean; error?: string }>;
  login: (email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  register: (email: string, name?: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
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
  const isConfigured = isSupabaseConfigured();

  // 初期ロード：Supabase セッション確認 ＆ localStorage フォールバック
  useEffect(() => {
    let mounted = true;

    async function initAuth() {
      try {
        // 1. Supabaseが設定されている場合、Supabaseのセッションを確認
        if (isSupabaseConfigured()) {
          const supabase = createClient();
          const { data: { session } } = await supabase.auth.getSession();

          if (session?.user && mounted) {
            // localStorage に既存のサブスクリプション情報等があればマージ
            let storedMeta: any = {};
            try {
              const stored = localStorage.getItem(AUTH_STORAGE_KEY);
              if (stored) storedMeta = JSON.parse(stored);
            } catch {}

            const userMetaRole = session.user.user_metadata?.role;
            const userMetaSub = session.user.user_metadata?.subscription;

            let effectiveRole: UserRole = userMetaRole || storedMeta?.role || "free";
            let effectiveSub: UserSubscription | undefined = userMetaSub || storedMeta?.subscription;

            // 期限切れ・解約後の失効判定（満了日時を過ぎていれば無料会員に自動降格）
            if (effectiveRole === "premium" && effectiveSub?.currentPeriodEnd) {
              if (Date.now() > effectiveSub.currentPeriodEnd && effectiveSub.status === "canceled") {
                effectiveRole = "free";
                effectiveSub = { ...effectiveSub, status: "none" };
              }
            }

            const googleUser: User = {
              id: session.user.id,
              email: session.user.email || "",
              name: session.user.user_metadata?.full_name || session.user.user_metadata?.name || session.user.email?.split("@")[0] || "東洋医学会員",
              avatarUrl: session.user.user_metadata?.avatar_url || session.user.user_metadata?.picture,
              authProvider: (session.user.app_metadata?.provider as any) || "google",
              role: effectiveRole,
              subscription: effectiveSub,
              createdAt: new Date(session.user.created_at).getTime(),
              updatedAt: Date.now(),
            };

            setUser(googleUser);
            setIsLoading(false);
            return;
          }
        }

        // 2. Supabaseセッションがない場合、localStorageから復元（デモ/以前のログイン）
        const stored = localStorage.getItem(AUTH_STORAGE_KEY);
        if (stored && mounted) {
          const parsed: User = JSON.parse(stored);
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
        console.error("Failed to restore user auth state:", e);
      } finally {
        if (mounted) setIsLoading(false);
      }
    }

    initAuth();

    // Supabase Auth の状態変更監視（Googleログイン後のリダイレクト時など）
    let authListener: { subscription: { unsubscribe: () => void } } | null = null;
    if (isSupabaseConfigured()) {
      try {
        const supabase = createClient();
        const { data } = supabase.auth.onAuthStateChange(async (_event, session) => {
          if (!mounted) return;
          if (session?.user) {
            let storedMeta: any = {};
            try {
              const stored = localStorage.getItem(AUTH_STORAGE_KEY);
              if (stored) storedMeta = JSON.parse(stored);
            } catch {}

            const userMetaRole = session.user.user_metadata?.role;
            const userMetaSub = session.user.user_metadata?.subscription;

            let effectiveRole: UserRole = userMetaRole || storedMeta?.role || "free";
            let effectiveSub: UserSubscription | undefined = userMetaSub || storedMeta?.subscription;

            // 期限切れ・解約後の失効判定（満了日時を過ぎていれば無料会員に自動降格）
            if (effectiveRole === "premium" && effectiveSub?.currentPeriodEnd) {
              if (Date.now() > effectiveSub.currentPeriodEnd && effectiveSub.status === "canceled") {
                effectiveRole = "free";
                effectiveSub = { ...effectiveSub, status: "none" };
              }
            }

            setUser({
              id: session.user.id,
              email: session.user.email || "",
              name: session.user.user_metadata?.full_name || session.user.user_metadata?.name || session.user.email?.split("@")[0] || "東洋医学会員",
              avatarUrl: session.user.user_metadata?.avatar_url || session.user.user_metadata?.picture,
              authProvider: (session.user.app_metadata?.provider as any) || "google",
              role: effectiveRole,
              subscription: effectiveSub,
              createdAt: new Date(session.user.created_at).getTime(),
              updatedAt: Date.now(),
            });
          }
        });
        authListener = data;
      } catch (e) {
        console.error("Failed to attach auth state listener:", e);
      }
    }

    return () => {
      mounted = false;
      if (authListener) authListener.subscription.unsubscribe();
    };
  }, []);

  // ユーザー情報変更時のlocalStorage同期
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

  // Google OAuth ログイン開始
  const loginWithGoogle = useCallback(async (redirectTo = "/account/subscription") => {
    try {
      if (!isSupabaseConfigured()) {
        return {
          success: false,
          error: "Supabaseの設定が完了していません。環境変数（NEXT_PUBLIC_SUPABASE_URL と NEXT_PUBLIC_SUPABASE_ANON_KEY）を設定してください。",
        };
      }
      const supabase = createClient();
      const origin = typeof window !== "undefined" ? window.location.origin : "";
      const callbackUrl = new URL("/auth/callback", origin);
      if (redirectTo) {
        callbackUrl.searchParams.set("next", redirectTo);
      }

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: callbackUrl.toString(),
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });

      if (error) {
        return { success: false, error: error.message };
      }
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message || "Googleログインの開始に失敗しました" };
    }
  }, []);

  // 簡易メールログイン（従来互換）
  const login = useCallback(async (email: string, _password?: string) => {
    setIsLoading(true);
    try {
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
        authProvider: "email",
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

  // 簡易会員登録（従来互換）
  const register = useCallback(async (email: string, name?: string, _password?: string) => {
    setIsLoading(true);
    try {
      const cleanEmail = email.trim().toLowerCase();
      const newUser: User = {
        id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        email: cleanEmail,
        name: name?.trim() || cleanEmail.split("@")[0] || "東洋医学会員",
        authProvider: "email",
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

  // ログアウト処理（Supabaseセッション破棄 ＆ ローカル破棄）
  const logout = useCallback(async () => {
    try {
      if (isSupabaseConfigured()) {
        const supabase = createClient();
        await supabase.auth.signOut();
      }
    } catch (e) {
      console.error("Logout error:", e);
    }
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
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

    // Supabaseにログイン中であればクラウド側に永続化
    if (isSupabaseConfigured()) {
      try {
        const supabase = createClient();
        await supabase.auth.updateUser({
          data: {
            role: "premium",
            subscription,
          },
        });
      } catch (err) {
        console.error("Failed to update Supabase user metadata for premium:", err);
      }
    }

    setUser(prev => {
      if (!prev) {
        return {
          id: `usr_guest_${Date.now()}`,
          email: "guest-member@haritaro.jp",
          name: "プレミアム会員",
          authProvider: "demo",
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
      const updatedSub: UserSubscription = {
        ...prev.subscription,
        status: "canceled",
        cancelAtPeriodEnd: true,
      };

      if (isSupabaseConfigured()) {
        try {
          const supabase = createClient();
          supabase.auth.updateUser({
            data: { subscription: updatedSub },
          });
        } catch (err) {
          console.error("Failed to update Supabase on cancelSubscription:", err);
        }
      }

      return {
        ...prev,
        subscription: updatedSub,
        updatedAt: Date.now(),
      };
    });
  }, []);

  // 解約の取り消し・再開
  const resumeSubscription = useCallback(async () => {
    setUser(prev => {
      if (!prev || !prev.subscription) return prev;
      const updatedSub: UserSubscription = {
        ...prev.subscription,
        status: "active",
        cancelAtPeriodEnd: false,
      };

      if (isSupabaseConfigured()) {
        try {
          const supabase = createClient();
          supabase.auth.updateUser({
            data: { subscription: updatedSub },
          });
        } catch (err) {
          console.error("Failed to update Supabase on resumeSubscription:", err);
        }
      }

      return {
        ...prev,
        subscription: updatedSub,
        updatedAt: Date.now(),
      };
    });
  }, []);

  // ローカルデータ移行機能
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
        authProvider: "demo",
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
        authProvider: "demo",
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
        authProvider: "demo",
        role: "free",
        createdAt: now,
        updatedAt: now,
      });
    } else {
      setUser(null);
    }
  }, []);

  const now = Date.now();
  const isPeriodValid =
    !user?.subscription?.currentPeriodEnd || now <= user.subscription.currentPeriodEnd;

  const isPremium =
    user?.role === "admin" ||
    (user?.role === "premium" &&
      isPeriodValid &&
      (user.subscription?.status === "active" ||
        (user.subscription?.status === "canceled" && isPeriodValid)));

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        isPremium: !!isPremium,
        isConfigured,
        loginWithGoogle,
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

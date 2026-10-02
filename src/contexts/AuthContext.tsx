"use client";
import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import type { User, LocalDataMigrationReport } from '@/types/auth';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import { hasPremiumAccess, safeReturnPath } from '@/utils/authPolicy';

interface AuthContextType {
  user: User | null; isLoading: boolean; isAuthenticated: boolean; isPremium: boolean; isConfigured: boolean;
  loginWithGoogle: (redirectTo?: string) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogleIdToken: (idToken: string, nonce?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>; refreshUser: () => Promise<void>;
  migrateLocalData: () => LocalDataMigrationReport;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
function displayUser(source: SupabaseUser): User {
  // Authorization is server-owned app_metadata. Never merge local or user-editable roles.
  const role = ['premium','admin'].includes(source.app_metadata.role) ? source.app_metadata.role : 'free';
  return { id: source.id, email: source.email || '', name: source.user_metadata.full_name || source.user_metadata.name || '東洋医学会員',
    avatarUrl: source.user_metadata.avatar_url || source.user_metadata.picture, authProvider: source.app_metadata.provider === 'google' ? 'google' : 'email',
    role, subscription: source.app_metadata.subscription, createdAt: new Date(source.created_at).getTime(), updatedAt: Date.now() };
}
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isConfigured = isSupabaseConfigured();
  const refreshUser = useCallback(async () => {
    if (!isSupabaseConfigured()) { setUser(null); return; }
    const { data, error } = await createClient().auth.getUser();
    setUser(!error && data.user ? displayUser(data.user) : null);
  }, []);
  useEffect(() => {
    let active = true; let generation = 0; let timer: ReturnType<typeof setTimeout>;
    try { localStorage.removeItem('haritaro_auth_user_v1'); } catch { /* Notes and study data remain intact. */ }
    const restore = async () => {
      const current = ++generation;
      try {
        if (!isConfigured) return;
        const { data, error } = await createClient().auth.getUser();
        if (active && current === generation) setUser(!error && data.user ? displayUser(data.user) : null);
      } catch { if(active && current === generation) setUser(null); } finally { if (active) setIsLoading(false); }
    };
    void restore();
    const listener = isConfigured ? createClient().auth.onAuthStateChange((_event, session) => {
      // Keep the callback synchronous to avoid holding Supabase's auth lock.
      if (!session) { ++generation; if (active) setUser(null); }
      else { clearTimeout(timer); timer = setTimeout(() => void restore(), 0); }
    }).data.subscription : null;
    window.addEventListener('focus', restore);
    return () => { active = false; clearTimeout(timer); listener?.unsubscribe(); window.removeEventListener('focus', restore); };
  }, [isConfigured]);
  const loginWithGoogle = useCallback(async (redirectTo = '/account/subscription') => {
    if (!isSupabaseConfigured()) return { success: false, error: 'ログインは現在準備中です。時間をおいてお試しください。' };
    try {
      const callback = new URL('/auth/callback', window.location.origin); callback.searchParams.set('next', safeReturnPath(redirectTo));
      const { error } = await createClient().auth.signInWithOAuth({ provider: 'google', options: { redirectTo: callback.toString(), queryParams: { prompt: 'select_account' } } });
      return error ? { success: false, error: 'Googleログインを開始できませんでした。もう一度お試しください。' } : { success: true };
    } catch { return { success: false, error: 'Googleログインを開始できませんでした。通信状態をご確認ください。' }; }
  }, []);
  const loginWithGoogleIdToken = useCallback(async (idToken: string, nonce?: string) => {
    if (!isSupabaseConfigured()) return { success: false, error: 'ログインは現在準備中です。' };
    try {
      const { error } = await createClient().auth.signInWithIdToken({ provider: 'google', token: idToken, nonce });
      if (error) return { success: false, error: 'Google認証を確認できませんでした。下の別の方法でお試しください。' };
      await refreshUser(); return { success: true };
    } catch { return { success: false, error: 'Google認証を確認できませんでした。もう一度お試しください。' }; }
  }, [refreshUser]);
  const logout = useCallback(async () => {
    if (isSupabaseConfigured()) { const { error } = await createClient().auth.signOut(); if (error) throw new Error('ログアウトに失敗しました。もう一度お試しください。'); }
    setUser(null);
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


  return <AuthContext.Provider value={{ user, isLoading, isAuthenticated: !!user, isPremium: hasPremiumAccess(user?.role, user?.subscription), isConfigured, loginWithGoogle, loginWithGoogleIdToken, logout, refreshUser, migrateLocalData }}>{children}</AuthContext.Provider>;
}
export function useAuth() { const context = useContext(AuthContext); if (!context) throw new Error('useAuth must be used within an AuthProvider'); return context; }

/**
 * 会員認証およびサブスクリプションに関する型定義
 */

export type UserRole = "free" | "premium" | "admin";

export type SubscriptionPlan = "monthly" | "yearly";

export type SubscriptionStatus =
  | "active"       // 有効
  | "canceled"     // 解約予約中（期間終了まで利用可）
  | "past_due"     // 支払い失敗・猶予
  | "incomplete"   // 未完了
  | "none";        // サブスクなし（無料会員）

export interface UserSubscription {
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  currentPeriodStart: number;
  currentPeriodEnd: number;
  cancelAtPeriodEnd: boolean;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  subscription?: UserSubscription;
  createdAt: number;
  updatedAt: number;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isPremium: boolean;
}

export interface LocalDataMigrationReport {
  memoCount: number;
  curriculumProgressCount: number;
  quizResultCount: number;
  migratedAt: number;
}

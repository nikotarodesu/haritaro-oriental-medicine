/**
 * サイト共通イベント計測ヘルパーモジュール（GA4対応）
 * 
 * プライバシーと医療情報保護の遵守：
 * 患者個人情報、症状・自由記述、ノート本文、検索語全文、メールアドレス等の
 * 機微情報は絶対に送信せず、非機微なID・導線属性のみを安全に記録します。
 */

declare global {
  interface Window {
    gtag?: (
      command: "event" | "config" | "js" | "set",
      eventName: string,
      params?: Record<string, unknown>
    ) => void;
  }
}

export type AnalyticsEventName =
  | "entry_select"
  | "clinical_cta_click"
  | "tool_start"
  | "tool_complete"
  | "note_save_success"
  | "note_reopen"
  | "context_link_click"
  | "nav_customize_save"
  | "upgrade_click"
  | "clip_item"
  | "simulator_diagnose"
  | "quiz_answer"
  | "quiz_complete"
  | "diagnosis_complete";

export interface AnalyticsEventParams {
  entry_source?: "home_learning" | "home_clinical" | "nav" | "footer";
  destination_type?: "learn" | "clinical" | "tool" | "note" | "curriculum";
  tool_id?: "diagnosis_qixueshui" | "diagnosis_gorou" | "simulator" | "haiketsu";
  placement?: string;
  context_pair?: "qixueshui" | "simulator" | "haiketsu_tsubo";
  preset?: string;
  plan?: "monthly" | "yearly";
  [key: string]: string | number | boolean | undefined;
}

/**
 * 安全にカスタムイベントを送信
 */
export function trackEvent(name: AnalyticsEventName, params?: AnalyticsEventParams): void {
  if (typeof window === "undefined" || !window.gtag) {
    return;
  }

  try {
    // 送信前に許可された非機微パラメータのみをフィルタリング
    const safeParams: Record<string, unknown> = {};
    if (params) {
      for (const [key, value] of Object.entries(params)) {
        if (value !== undefined && value !== null) {
          // 禁止キー（自由記述・個人情報）の二重防御ガード
          const lowerKey = key.toLowerCase();
          if (
            lowerKey.includes("text") ||
            lowerKey.includes("note") ||
            lowerKey.includes("memo") ||
            lowerKey.includes("patient") ||
            lowerKey.includes("symptom") ||
            lowerKey.includes("email") ||
            lowerKey.includes("query") ||
            lowerKey.includes("name")
          ) {
            continue;
          }
          safeParams[key] = value;
        }
      }
    }

    window.gtag("event", name, safeParams);
  } catch (err) {
    // 計測エラーがUI操作を妨げないよう握りつぶす
    console.warn("[Analytics] Track event failed:", err);
  }
}

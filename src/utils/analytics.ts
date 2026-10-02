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
  | "search_submit"
  | "search_result_click"
  | "note_export"
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
  | "diagnosis_complete"
  | "share"
  | "curriculum_save_to_note"
  | "review_start"
  | "review_complete"
  | "case_training_start"
  | "case_stage_complete"
  | "case_training_complete";
// Learning events contain only navigation attributes and aggregate counts.

export interface AnalyticsEventParams {
  entry_source?: "home_learning" | "home_clinical" | "nav" | "footer";
  destination_type?: "learn" | "clinical" | "tool" | "note" | "curriculum";
  tool_id?: "diagnosis_qixueshui" | "diagnosis_gorou" | "simulator" | "haiketsu" | "clinical_interview_qixueshui" | "curriculum_quiz";
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
    window.gtag("event", name, sanitizeAnalyticsParams(params));
  } catch (err) {
    // 計測エラーがUI操作を妨げないよう握りつぶす
    console.warn("[Analytics] Track event failed:", err);
  }
}

// Allow only navigation attributes. Search text, note content and diagnostic results are excluded.
export function sanitizeAnalyticsParams(params: AnalyticsEventParams = {}): Record<string, string | number | boolean> {
  const allowedKeys = new Set(["entry_source", "destination_type", "tool_id", "placement", "context_pair", "preset", "plan", "result_type", "item_type", "method", "content_type", "lecture_id"]);
  const safe: Record<string, string | number | boolean> = {};
  for (const [key, value] of Object.entries(params)) {
    if (allowedKeys.has(key) && typeof value === "string" && /^[a-z0-9_-]{1,80}$/i.test(value)) safe[key] = value;
    if (["score", "total", "result_count"].includes(key) && typeof value === "number" && Number.isFinite(value) && value >= 0 && value <= 10000) safe[key] = value;
    if (key === "passed" && typeof value === "boolean") safe[key] = value;
  }
  return safe;
}

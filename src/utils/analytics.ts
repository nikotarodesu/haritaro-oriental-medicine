import { PUBLIC_CLINICAL_GUIDE_PATHS, PUBLIC_SYMPTOM_PATHS } from '@/config/publicGuideRoutes';

/** Public navigation and aggregate learning measurements only. */

declare global {
  interface Window {
    gtag?: (
      command: "event" | "config" | "js" | "set",
      eventName: string | Date | Record<string, unknown>,
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
  | "quiz_start"
  | "quiz_complete"
  | "diagnosis_complete"
  | "share"
  | "curriculum_save_to_note"
  | "review_start"
  | "review_complete"
  | "case_training_start"
  | "case_stage_complete"
  | "case_training_complete"
  | "lecture_view" | "article_view" | "learning_activity" | "learning_return_7d"
  | `web_vital_${"lcp" | "inp" | "cls"}_${"good" | "needs_improvement" | "poor"}`;
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
  if (typeof window === "undefined") return;
  const pathname = publicAnalyticsPath(window.location.pathname);
  if (!pathname) return;
  const safe = sanitizeAnalyticsParams(params);
  emit({ name, params: safe, pathname });
  if (LEARNING_ACTIONS.has(name) || (name === "context_link_click" && COURSE_ACTIONS.has(String(safe.placement)))) {
    recordLearningActivity(name === "context_link_click" ? String(safe.placement) : name, pathname);
  }
}

// Allow only navigation attributes. Search text, note content and diagnostic results are excluded.
export function sanitizeAnalyticsParams(params: AnalyticsEventParams = {}): Record<string, string | number | boolean> {
  const allowedKeys = new Set(["entry_source", "destination_type", "tool_id", "placement", "context_pair", "preset", "plan", "result_type", "item_type", "method", "content_type", "lecture_id", "article_id", "course_id", "activity_type", "metric_name", "metric_rating", "navigation_type"]);
  const safe: Record<string, string | number | boolean> = {};
  for (const [key, value] of Object.entries(params)) {
    if (allowedKeys.has(key) && typeof value === "string" && /^[a-z0-9_-]{1,80}$/i.test(value)) safe[key] = value;
    if (["score", "total", "result_count", "return_gap_days"].includes(key) && typeof value === "number" && Number.isFinite(value) && Number.isInteger(value) && value >= 0 && value <= 10000) safe[key] = value;
    if (["metric_value", "value"].includes(key) && typeof value === "number" && Number.isFinite(value) && value >= 0 && value <= 600000) safe[key] = value;
    if (key === "passed" && typeof value === "boolean") safe[key] = value;
  }
  if (safe.course_id && !["yinyang-foundations", "five-elements-relations", "qi-blood-fluid"].includes(String(safe.course_id))) delete safe.course_id;
  if (typeof safe.return_gap_days === "number" && (safe.return_gap_days < 1 || safe.return_gap_days > 7)) delete safe.return_gap_days;
  return safe;
}

const PUBLIC_PAGES = new Set([
  "/", "/about", "/contact", "/editorial-policy", "/clinical", "/diagnosis", "/articles",
  "/cases", "/curriculum", "/kikei", "/glossary", "/kokushi", "/pricing", "/tsubo",
  "/tsubo/practice", "/tsubo/compare", "/tsubo/basics/bone-cun", "/practice/haiketsu",
  "/library", "/learn", "/learn/courses", "/tokushoho", "/simulator", "/simulator/compare",
  "/terms", "/safety", "/symptoms", "/privacy", "/updates",
  ...PUBLIC_SYMPTOM_PATHS, ...PUBLIC_CLINICAL_GUIDE_PATHS,
]);
const PUBLIC_DETAIL = /^\/(?:articles|cases|curriculum|kikei|tsubo)\/[a-z0-9-]{1,80}$/i;
const COURSE_DETAIL = /^\/learn\/courses\/(?:yinyang-foundations|five-elements-relations|qi-blood-fluid)$/;

/** Unknown, private and user-created routes are excluded, including URL suffixes. */
export function publicAnalyticsPath(value: string): string | null {
  const pathname = value.split(/[?#]/)[0].replace(/\/$/, "") || "/";
  return PUBLIC_PAGES.has(pathname) || PUBLIC_DETAIL.test(pathname) || COURSE_DETAIL.test(pathname) ? pathname : null;
}

/** External referrers retain the origin only; private same-site paths are removed. */
export function analyticsReferrer(value: string, origin: string): string {
  if (!value) return "";
  try {
    const url = new URL(value);
    if (!["https:", "http:"].includes(url.protocol)) return "";
    if (url.origin !== origin) return url.origin;
    const pathname = publicAnalyticsPath(url.pathname);
    return pathname ? origin + pathname : "";
  } catch { return ""; }
}

type SafeEvent = { name: AnalyticsEventName; params: Record<string, string | number | boolean>; pathname: string };
const pending: SafeEvent[] = [];
const MAX_PENDING = 40;

function emit(event: SafeEvent): void {
  if (!window.gtag) {
    if (pending.length === MAX_PENDING) pending.shift();
    pending.push(event);
    return;
  }
  try {
    window.gtag("event", event.name, {
      ...event.params,
      page_location: window.location.origin + event.pathname,
      page_path: event.pathname,
      page_referrer: analyticsReferrer(document.referrer, window.location.origin),
    });
  } catch { /* Measurements must not interrupt learning. */ }
}

export function flushAnalyticsEvents(): void {
  if (typeof window === "undefined" || !window.gtag || !publicAnalyticsPath(window.location.pathname)) return;
  pending.splice(0).forEach(emit);
}

function studyDay(date = new Date()): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

/** Calendar-day difference avoids daylight-saving and local clock-hour effects. */
export function learningReturnGap(previous: string | null, today: string): number | null {
  if (!previous || !/^\d{4}-\d{2}-\d{2}$/.test(previous) || !/^\d{4}-\d{2}-\d{2}$/.test(today)) return null;
  const prior = Date.parse(previous + "T00:00:00Z");
  const current = Date.parse(today + "T00:00:00Z");
  if (!Number.isFinite(prior) || !Number.isFinite(current) || new Date(prior).toISOString().slice(0, 10) !== previous || new Date(current).toISOString().slice(0, 10) !== today) return null;
  const gap = Math.round((current - prior) / 86400000);
  return gap >= 1 && gap <= 7 ? gap : null;
}

const LEARNING_DAY_KEY = "haritaro:analytics:learning-day:v1";
let lastLearningDay: string | null = null;
function recordLearningActivity(activity: string, pathname: string): void {
  const today = studyDay();
  if (lastLearningDay === today) return;
  let previous = lastLearningDay;
  try { previous = window.localStorage.getItem(LEARNING_DAY_KEY) || previous; } catch { /* In-memory fallback. */ }
  if (previous === today) return;
  lastLearningDay = today;
  try { window.localStorage.setItem(LEARNING_DAY_KEY, today); } catch { /* Learning still works without storage. */ }
  emit({ name: "learning_activity", params: { activity_type: activity }, pathname });
  const gap = learningReturnGap(previous, today);
  if (gap !== null) emit({ name: "learning_return_7d", params: { activity_type: activity, return_gap_days: gap }, pathname });
}

const LEARNING_ACTIONS = new Set<AnalyticsEventName>([
  "quiz_start", "quiz_answer", "quiz_complete", "review_start", "review_complete", "case_training_start",
  "case_stage_complete", "case_training_complete",
]);
const COURSE_ACTIONS = new Set(["course_start", "course_resume", "course_step"]);

export function trackLearningPageView(pathname: string): void {
  const path = publicAnalyticsPath(pathname);
  if (!path) return;
  if (/^\/curriculum\/lecture-[a-z0-9-]+$/i.test(path)) trackEvent("lecture_view", { lecture_id: path.split("/").at(-1)! });
  if (/^\/articles\/[a-z0-9-]+$/i.test(path)) trackEvent("article_view", { article_id: path.split("/").at(-1)! });
}

export interface SafeWebVital { name: string; value: number; rating: string; navigationType: string }

/** Values come from the official web-vitals implementation included in Next.js. */
export function trackWebVital(metric: SafeWebVital, landingPath: string): void {
  if (typeof window === "undefined" || !publicAnalyticsPath(window.location.pathname)) return;
  const pathname = publicAnalyticsPath(landingPath);
  const name = metric.name.toLowerCase();
  const rating = metric.rating.replace(/-/g, "_");
  if (!pathname || !["lcp", "inp", "cls"].includes(name) || !["good", "needs_improvement", "poor"].includes(rating) || !Number.isFinite(metric.value) || metric.value < 0 || metric.value > 600000) return;
  emit({
    name: `web_vital_${name}_${rating}` as AnalyticsEventName,
    pathname,
    params: sanitizeAnalyticsParams({
      metric_name: metric.name, metric_rating: rating, metric_value: metric.value,
      value: Math.round(name === "cls" ? metric.value * 1000 : metric.value),
      navigation_type: metric.navigationType.replace(/-/g, "_"),
    }),
  });
}

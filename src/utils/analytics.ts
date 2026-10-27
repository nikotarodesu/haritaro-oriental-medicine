import { PUBLIC_CLINICAL_GUIDE_PATHS, PUBLIC_SYMPTOM_PATHS } from '@/config/publicGuideRoutes';
import { LEARNING_COURSES } from '@/data/learningCourses';
import { SUBSCRIPTION_CONFIG } from '@/config/subscription';

const PUBLIC_COURSE_SLUGS = new Set(LEARNING_COURSES.map(course => course.slug));
const PUBLIC_COURSE_PATHS = new Set(LEARNING_COURSES.map(course => `/learn/courses/${course.slug}`));

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
  | "checkout_login_required" | "begin_checkout" | "checkout_error" | "purchase"
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
  if (safe.course_id && !PUBLIC_COURSE_SLUGS.has(String(safe.course_id))) delete safe.course_id;
  if (typeof safe.return_gap_days === "number" && (safe.return_gap_days < 1 || safe.return_gap_days > 7)) delete safe.return_gap_days;
  return safe;
}

const PUBLIC_PAGES = new Set([
  "/", "/about", "/contact", "/editorial-policy", "/clinical", "/diagnosis", "/articles",
  "/cases", "/curriculum", "/kikei", "/glossary", "/learn/review", "/pricing", "/tsubo",
  "/tsubo/practice", "/tsubo/compare", "/tsubo/basics/bone-cun", "/practice/haiketsu",
  "/library", "/learn", "/learn/courses", "/tokushoho", "/simulator", "/simulator/compare",
  "/terms", "/safety", "/symptoms", "/privacy", "/updates",
  "/checkout/complete",
  ...PUBLIC_SYMPTOM_PATHS, ...PUBLIC_CLINICAL_GUIDE_PATHS,
]);
const PUBLIC_DETAIL = /^\/(?:articles|cases|curriculum|kikei|tsubo)\/[a-z0-9-]{1,80}$/i;

/** Unknown, private and user-created routes are excluded, including URL suffixes. */
export function publicAnalyticsPath(value: string): string | null {
  const pathname = value.split(/[?#]/)[0].replace(/\/$/, "") || "/";
  return PUBLIC_PAGES.has(pathname) || PUBLIC_DETAIL.test(pathname) || PUBLIC_COURSE_PATHS.has(pathname) ? pathname : null;
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

type CommerceItem = { item_id: string; item_name: string; price: number; quantity: number };
type SafeEvent = { name: AnalyticsEventName; params: Record<string, string | number | boolean | CommerceItem[]>; pathname: string; onEmit?: () => void; onDrop?: () => void; onComplete?: () => void };
const pending: SafeEvent[] = [];
const MAX_PENDING = 40;

function emit(event: SafeEvent): void {
  if (!window.gtag) {
    if (pending.length === MAX_PENDING) pending.shift()?.onDrop?.();
    pending.push(event);
    return;
  }
  try {
    const measurementId = process.env.NEXT_PUBLIC_GA_ID;
    window.gtag("event", event.name, {
      ...event.params,
      ...((measurementId && /^G-[A-Z0-9]+$/.test(measurementId) && measurementId !== 'G-XXXXXXXXXX') ? { send_to: measurementId } : {}),
      page_location: window.location.origin + event.pathname,
      page_path: event.pathname,
      page_referrer: analyticsReferrer(document.referrer, window.location.origin),
      ...(event.onComplete ? { event_callback: event.onComplete, event_timeout: 800 } : {}),
    });
    event.onEmit?.();
  } catch { /* Measurements must not interrupt learning. */ }
}

type BillingPlan = 'monthly' | 'yearly';
export interface PurchaseReceipt { transactionId: string; plan: BillingPlan; value: number; currency: 'JPY' }
export function isPurchaseReceipt(value: unknown): value is PurchaseReceipt {
  if (!value || typeof value !== 'object') return false;
  const receipt = value as Partial<PurchaseReceipt>;
  return typeof receipt.transactionId === 'string' && /^ht_[a-f0-9]{64}$/.test(receipt.transactionId)
    && (receipt.plan === 'monthly' || receipt.plan === 'yearly') && receipt.currency === 'JPY'
    && typeof receipt.value === 'number' && Number.isInteger(receipt.value) && receipt.value >= 0 && receipt.value <= 1000000;
}
function subscriptionItem(plan: BillingPlan, price: number): CommerceItem {
  return { item_id: 'haritaro_premium_' + plan, item_name: 'Haritaro Premium ' + plan, price, quantity: 1 };
}
type LoginStep = 'upgrade_click' | 'checkout_login_required';
type RelayMessage = { type: 'haritaro:subscription-step:v1'; id: number; name: LoginStep; plan: BillingPlan };
let loginRelay: HTMLIFrameElement | undefined;
let relayReady = false;
let nextRelayId = 0;
const relayQueue: RelayMessage[] = [];
const relayCallbacks = new Map<number, () => void>();

function relayLoginStep(name: LoginStep, plan: BillingPlan): Promise<void> {
  return new Promise(resolve => {
    const id = ++nextRelayId;
    const timer = setTimeout(() => { relayCallbacks.delete(id); resolve(); }, 1200);
    relayCallbacks.set(id, () => { clearTimeout(timer); relayCallbacks.delete(id); resolve(); });
    try {
      if (!loginRelay) {
        const frame = document.createElement('iframe');
        frame.hidden = true;
        frame.title = 'Anonymous subscription analytics';
        frame.setAttribute('aria-hidden', 'true');
        frame.tabIndex = -1;
        frame.referrerPolicy = 'no-referrer';
        frame.src = '/api/analytics/subscription-frame';
        loginRelay = frame;
        window.addEventListener('message', event => {
          if (event.origin !== window.location.origin || event.source !== frame.contentWindow) return;
          if (event.data?.type === 'haritaro:subscription-ready:v1') {
            relayReady = true;
            relayQueue.splice(0).forEach(message => frame.contentWindow?.postMessage(message, window.location.origin));
          } else if (event.data?.type === 'haritaro:subscription-ack:v1' && Number.isInteger(event.data.id)) {
            relayCallbacks.get(event.data.id)?.();
          }
        });
        document.body.appendChild(frame);
      }
      const message: RelayMessage = { type: 'haritaro:subscription-step:v1', id, name, plan };
      if (relayReady) loginRelay.contentWindow?.postMessage(message, window.location.origin);
      else { if (relayQueue.length === MAX_PENDING) relayQueue.shift(); relayQueue.push(message); }
    } catch { relayCallbacks.get(id)?.(); }
  });
}
export function trackSubscriptionStep(name: 'upgrade_click' | 'checkout_login_required' | 'begin_checkout' | 'checkout_error', plan: BillingPlan, failure?: 'request_failed' | 'network_error'): Promise<void> {
  if (typeof window === 'undefined' || publicAnalyticsPath(window.location.pathname) !== '/pricing' || !['monthly', 'yearly'].includes(plan)) return Promise.resolve();
  // The relay's fixed URL and document survive login's private-route opt-out.
  // Its schema accepts only two public action names and the selected plan.
  if (name === 'upgrade_click' || name === 'checkout_login_required') return relayLoginStep(name, plan);
  const amount = SUBSCRIPTION_CONFIG.pricing[plan].amount;
  return new Promise(resolve => {
    // Give navigation events a bounded chance to leave the page. Blocked analytics
    // must never prevent login or payment, and callbacks cannot initiate navigation.
    const timer = setTimeout(resolve, 1200);
    const done = () => { clearTimeout(timer); resolve(); };
    emit({ name, pathname: '/pricing', onComplete: done, onDrop: done, params: { plan, placement: 'pricing',
      ...(name === 'begin_checkout' ? { currency: 'JPY', value: amount, items: [subscriptionItem(plan, amount)] } : {}),
      ...(name === 'checkout_error' && failure ? { method: failure } : {}),
    } });
  });
}
const queuedPurchases = new Set<string>();
const emittedPurchases = new Set<string>();
const PURCHASE_KEY = 'haritaro:analytics:purchase-receipts:v1';
export function trackSubscriptionPurchase(receipt: unknown): boolean {
  if (typeof window === 'undefined' || publicAnalyticsPath(window.location.pathname) !== '/checkout/complete' || !isPurchaseReceipt(receipt)) return false;
  let stored: string[] = [];
  try { const value = JSON.parse(window.sessionStorage.getItem(PURCHASE_KEY) || '[]'); if (Array.isArray(value)) stored = value.filter(id => typeof id === 'string' && /^ht_[a-f0-9]{64}$/.test(id)); } catch { /* In-memory deduplication remains available. */ }
  if (queuedPurchases.has(receipt.transactionId) || emittedPurchases.has(receipt.transactionId) || stored.includes(receipt.transactionId)) return false;
  queuedPurchases.add(receipt.transactionId);
  emit({ name: 'purchase', pathname: '/checkout/complete', params: {
    transaction_id: receipt.transactionId, plan: receipt.plan, currency: receipt.currency, value: receipt.value,
    items: [subscriptionItem(receipt.plan, receipt.value)],
  }, onDrop: () => queuedPurchases.delete(receipt.transactionId), onEmit: () => {
    queuedPurchases.delete(receipt.transactionId); emittedPurchases.add(receipt.transactionId);
    try { window.sessionStorage.setItem(PURCHASE_KEY, JSON.stringify([...new Set([...stored, receipt.transactionId])].slice(-20))); } catch { /* Measurement must not block membership. */ }
  } });
  return true;
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

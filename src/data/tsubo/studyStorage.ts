import { 
  TsuboStudyDataV1, 
  StudySettings, 
  AcupointStudyRecord, 
  StudySession, 
  QuizQuestion, 
  StudySkillType
} from "./types";
import { getLearningStorageAdapter } from '@/utils/learningStorageBridge';
import { isValidStudySession } from './studySessionValidation';

const ACTIVE_SESSION_KEY = "haritaro_tsubo_active_session_v1";
const PAUSED_SESSIONS_KEY = "haritaro_tsubo_paused_sessions_v1";
interface PracticeAttempt {
  recordKey: string; record: AcupointStudyRecord; date: string; answeredAt: string;
  correct?: boolean; evaluation?: 'remembered' | 'needsReview';
}

export const DEFAULT_SETTINGS: StudySettings = {
  dailyGoal: 10,
  defaultMode: "batch",
};

export const INITIAL_STUDY_DATA: TsuboStudyDataV1 = {
  version: 1,
  settings: DEFAULT_SETTINGS,
  records: {},
  history: [],
  streakDays: 0,
};

// ==================== 日付ヘルパー ====================

export function getTodayString(customDate?: string): string {
  if (customDate) return customDate;
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function addDays(dateStr: string, days: number): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  date.setDate(date.getDate() + days);
  const ry = date.getFullYear();
  const rm = String(date.getMonth() + 1).padStart(2, "0");
  const rd = String(date.getDate()).padStart(2, "0");
  return `${ry}-${rm}-${rd}`;
}

export function isDateDueOrOverdue(targetDateStr?: string, referenceDateStr?: string): boolean {
  if (!targetDateStr) return false;
  const ref = referenceDateStr || getTodayString();
  return targetDateStr <= ref;
}

// ==================== 定着・復習計算 ====================

/**
 * 間隔反復アルゴリズムに基づき、回答後の次回予定と定着レベルを更新
 * 間隔：1日 ➜ 3日 ➜ 7日 ➜ 14日 ➜ 30日
 */
export function computeNextReview(
  prevRecord: AcupointStudyRecord | undefined,
  acupointCode: string,
  skill: StudySkillType,
  isCorrect: boolean,
  todayStr: string = getTodayString()
): AcupointStudyRecord {
  const record: AcupointStudyRecord = prevRecord
    ? { ...prevRecord }
    : {
        acupointCode,
        skill,
        level: "unlearned",
        consecutiveSuccesses: 0,
        totalAttempts: 0,
        totalCorrect: 0,
      };

  record.totalAttempts += 1;
  if (isCorrect) {
    record.totalCorrect += 1;
  }

  // 1. 不正解の場合：連続成功をリセットし学習中へ。翌日復習へ回す。
  if (!isCorrect) {
    record.level = "learning";
    record.consecutiveSuccesses = 0;
    record.nextReviewDate = addDays(todayStr, 1);
    record.lastReviewedDate = todayStr;
    return record;
  }

  // 2. 正解の場合
  // 同日中の重複正解判定：同日にすでに正解している場合は段階を進めず、復習予定も延期しない
  if (record.lastReviewedDate === todayStr) {
    // 同日内の反復練習：カウントのみ加算して段階昇格はスキップ
    return record;
  }

  // 翌日以降の正解：段階昇格
  const newConsecutive = record.consecutiveSuccesses + 1;
  record.consecutiveSuccesses = newConsecutive;
  record.lastReviewedDate = todayStr;

  if (newConsecutive === 1) {
    record.level = "learning";
    record.nextReviewDate = addDays(todayStr, 1);
  } else if (newConsecutive === 2) {
    record.level = "confirmed";
    record.nextReviewDate = addDays(todayStr, 3);
  } else if (newConsecutive === 3) {
    record.level = "mastered";
    record.nextReviewDate = addDays(todayStr, 7);
  } else if (newConsecutive === 4) {
    record.level = "mastered";
    record.nextReviewDate = addDays(todayStr, 14);
  } else {
    record.level = "mastered";
    record.nextReviewDate = addDays(todayStr, 30);
  }

  return record;
}

// ==================== ストレージI/O ====================

export function loadStudyData(): TsuboStudyDataV1 {
  if (typeof window === "undefined") return INITIAL_STUDY_DATA;
  const adapter = getLearningStorageAdapter();
  if (adapter) {
    const values = adapter.values();
    const records = Object.fromEntries(Object.entries(values).filter(([key, value]) => key.startsWith('tsubo:record:') && value && typeof value === 'object').map(([key, value]) => [key.slice(13), structuredClone(value) as AcupointStudyRecord]));
    const attempts = Object.entries(values).filter(([key, value]) => key.startsWith('tsubo:answer:') && value && typeof value === 'object')
      .map(([key, value]) => ({ key, ...(value as PracticeAttempt) }))
      .filter(attempt => attempt.record?.acupointCode && attempt.date && attempt.answeredAt && (typeof attempt.correct === 'boolean' || ['remembered', 'needsReview'].includes(attempt.evaluation || '')))
      .sort((a, b) => a.answeredAt.localeCompare(b.answeredAt) || a.record.totalAttempts - b.record.totalAttempts || a.key.localeCompare(b.key));
    const replayed: Record<string, AcupointStudyRecord> = {};
    for (const attempt of attempts) {
      let record = replayed[attempt.recordKey];
      if (!record) record = structuredClone(attempt.record); // Keeps practice that predates cloud sync.
      else if (typeof attempt.correct === 'boolean') record = computeNextReview(record, record.acupointCode, record.skill, attempt.correct, attempt.date);
      else {
        record.totalAttempts++;
        record.selfEvaluationCount ||= { remembered: 0, needsReview: 0 };
        record.selfEvaluationCount[attempt.evaluation!]++;
        if (attempt.evaluation === 'needsReview') { record.flaggedForReview = true; record.nextReviewDate = addDays(attempt.date, 1); }
      }
      replayed[attempt.recordKey] = record;
    }
    for (const [key, record] of Object.entries(replayed)) {
      const snapshot = records[key];
      records[key] = { ...record, totalAttempts: Math.max(record.totalAttempts, snapshot?.totalAttempts || 0), totalCorrect: Math.max(record.totalCorrect, snapshot?.totalCorrect || 0), flaggedForReview: snapshot?.flaggedForReview ?? record.flaggedForReview };
    }
    const days: Record<string, { date: string; answeredCount: number; correctCount: number }> = {};
    for (const [key, value] of Object.entries(values)) if (key.startsWith('tsubo:event:') || key.startsWith('tsubo:baseline:')) {
      const day = value as { date: string; answeredCount: number; correctCount: number };
      if (!day?.date || !Number.isFinite(day.answeredCount) || !Number.isFinite(day.correctCount)) continue;
      const previous = days[day.date] || { date: day.date, answeredCount: 0, correctCount: 0 };
      days[day.date] = { date: day.date, answeredCount: previous.answeredCount + day.answeredCount, correctCount: previous.correctCount + day.correctCount };
    }
    const history = Object.values(days).sort((a, b) => a.date.localeCompare(b.date));
    let streakDays = history.length ? 1 : 0;
    for (let i = history.length - 1; i > 0 && addDays(history[i].date, -1) === history[i - 1].date; i--) streakDays++;
    return { version: 1, records, history, settings: { ...DEFAULT_SETTINGS, ...(values['settings:tsubo'] as StudySettings || {}) }, streakDays, lastStudiedDate: history.at(-1)?.date };
  }
  // Legacy files are imported only into the guest namespace by the account provider.
  // During authentication, never fall back to an unowned browser history.
  return { ...INITIAL_STUDY_DATA, records: {}, history: [] };
}

export function saveStudyData(data: TsuboStudyDataV1): void {
  if (typeof window === "undefined") return;
  const adapter = getLearningStorageAdapter();
  if (adapter) {
    const previous = loadStudyData();
    for (const [id, record] of Object.entries(data.records)) if (JSON.stringify(previous.records[id]) !== JSON.stringify(record)) adapter.set('tsubo:record:' + id, record);
    for (const id of Object.keys(previous.records)) if (!data.records[id]) adapter.set('tsubo:record:' + id, null);
    adapter.set('settings:tsubo', data.settings);
    for (const day of data.history) {
      const old = previous.history.find(item => item.date === day.date);
      const answeredCount = day.answeredCount - (old?.answeredCount || 0);
      const correctCount = day.correctCount - (old?.correctCount || 0);
      if (answeredCount > 0 || correctCount > 0) adapter.set('tsubo:event:' + crypto.randomUUID(), { date: day.date, answeredCount: Math.max(0, answeredCount), correctCount: Math.max(0, correctCount) });
    }
    return;
  }
  // Writes wait for the account-scoped adapter.
}

function activeSessionKey(storageKey = ACTIVE_SESSION_KEY): string | null {
  const adapter = getLearningStorageAdapter();
  return adapter ? storageKey + ':' + adapter.owner : null;
}

// ==================== アクティブセッションI/O ====================

export function loadActiveSession(): StudySession | null {
  if (typeof window === "undefined") return null;
  try {
    const key = activeSessionKey();
    if (!key) return null;
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const session: unknown = JSON.parse(raw);
    return isValidStudySession(session) ? session : null;
  } catch (e) {
    console.error("Failed to load active study session", e);
    return null;
  }
}

export function saveActiveSession(session: StudySession | null): boolean {
  if (typeof window === "undefined") return false;
  if (session && !isValidStudySession(session)) return false;
  try {
    const key = activeSessionKey();
    if (!key) return false;
    if (!session) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(session));
    }
    return true;
  } catch (e) {
    console.error("Failed to save active study session", e);
    return false;
  }
}

/** Interrupted questions stay on this device, separately for each account. */
export function loadPausedSessions(): StudySession[] {
  if (typeof window === 'undefined') return [];
  try {
    const key = activeSessionKey(PAUSED_SESSIONS_KEY);
    if (!key) return [];
    const parsed: unknown = JSON.parse(localStorage.getItem(key) || '[]');
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((session): session is StudySession => isValidStudySession(session) && !session.isCompleted);
  } catch (error) {
    console.error('Failed to load paused study sessions', error);
    return [];
  }
}

export function savePausedSession(session: StudySession): boolean {
  if (typeof window === 'undefined') return false;
  if (!isValidStudySession(session)) return false;
  try {
    const key = activeSessionKey(PAUSED_SESSIONS_KEY);
    if (!key) return false;
    const sessions = loadPausedSessions().filter(item => item.sessionId !== session.sessionId);
    if (!session.isCompleted) sessions.unshift(session);
    localStorage.setItem(key, JSON.stringify(sessions));
    return true;
  } catch (error) {
    console.error('Failed to save paused study session', error);
    return false;
  }
}

export function removePausedSession(sessionId: string): void {
  if (typeof window === 'undefined') return;
  try {
    const key = activeSessionKey(PAUSED_SESSIONS_KEY);
    if (key) localStorage.setItem(key, JSON.stringify(loadPausedSessions().filter(session => session.sessionId !== sessionId)));
  } catch (error) {
    console.error('Failed to remove paused study session', error);
  }
}

// ==================== 回答記録・集計 ====================

/**
 * 1問の客観回答を記録し、日次集計および学習進捗を更新
 */
export function recordAnswerInStore(
  question: QuizQuestion,
  selectedOptionId: string,
  isCorrect: boolean,
  todayStr: string = getTodayString()
): void {
  const data = loadStudyData();
  const recordKey = `${question.acupointCode}_${question.skill}`;
  const existingRecord = data.records[recordKey];

  // 定着計算
  const updatedRecord = computeNextReview(
    existingRecord,
    question.acupointCode,
    question.skill,
    isCorrect,
    todayStr
  );
  data.records[recordKey] = updatedRecord;

  // 日次アクティビティ更新
  let day = data.history.find((h) => h.date === todayStr);
  if (!day) {
    day = { date: todayStr, answeredCount: 0, correctCount: 0 };
    data.history.push(day);
  }
  day.answeredCount += 1;
  if (isCorrect) day.correctCount += 1;

  // 連続学習日数の計算
  if (data.lastStudiedDate !== todayStr) {
    const yesterday = addDays(todayStr, -1);
    if (data.lastStudiedDate === yesterday) {
      data.streakDays += 1;
    } else if (!data.lastStudiedDate) {
      data.streakDays = 1;
    } else {
      data.streakDays = 1;
    }
    data.lastStudiedDate = todayStr;
  }

  saveStudyData(data);
  getLearningStorageAdapter()?.set('tsubo:answer:' + crypto.randomUUID(), { recordKey, record: updatedRecord, date: todayStr, answeredAt: new Date().toISOString(), correct: isCorrect } satisfies PracticeAttempt);
}

/**
 * 自己確認（思い出せた／要復習）を記録
 */
export function recordSelfEvaluationInStore(
  question: QuizQuestion,
  evaluation: "remembered" | "needsReview",
  todayStr: string = getTodayString()
): void {
  const data = loadStudyData();
  const recordKey = `${question.acupointCode}_${question.skill}`;
  const record = data.records[recordKey] || {
    acupointCode: question.acupointCode,
    skill: question.skill,
    level: "unlearned",
    consecutiveSuccesses: 0,
    totalAttempts: 0,
    totalCorrect: 0,
  };

  record.totalAttempts += 1;
  record.selfEvaluationCount = record.selfEvaluationCount || { remembered: 0, needsReview: 0 };
  if (evaluation === "remembered") {
    record.selfEvaluationCount.remembered += 1;
  } else {
    record.selfEvaluationCount.needsReview += 1;
    record.flaggedForReview = true;
    record.nextReviewDate = addDays(todayStr, 1);
  }

  data.records[recordKey] = record;
  saveStudyData(data);
  getLearningStorageAdapter()?.set('tsubo:answer:' + crypto.randomUUID(), { recordKey, record, date: todayStr, answeredAt: new Date().toISOString(), evaluation } satisfies PracticeAttempt);
}

/**
 * 要復習フラグのトグル
 */
export function toggleFlagForReview(code: string, skill: StudySkillType): boolean {
  const data = loadStudyData();
  const recordKey = `${code}_${skill}`;
  const record = data.records[recordKey] || {
    acupointCode: code,
    skill,
    level: "unlearned",
    consecutiveSuccesses: 0,
    totalAttempts: 0,
    totalCorrect: 0,
  };

  record.flaggedForReview = !record.flaggedForReview;
  data.records[recordKey] = record;
  saveStudyData(data);
  return !!record.flaggedForReview;
}

/**
 * 今日の復習対象を抽出（期日到来 または 要復習フラグ）
 */
export function getDueReviewRecords(todayStr: string = getTodayString()): AcupointStudyRecord[] {
  const data = loadStudyData();
  const due: AcupointStudyRecord[] = [];

  for (const key of Object.keys(data.records)) {
    const rec = data.records[key];
    if (rec.flaggedForReview || (rec.nextReviewDate && rec.nextReviewDate <= todayStr)) {
      due.push(rec);
    }
  }

  // 期限超過が長い順、次いで要復習フラグ
  return due.sort((a, b) => {
    if (a.flaggedForReview && !b.flaggedForReview) return -1;
    if (!a.flaggedForReview && b.flaggedForReview) return 1;
    return (a.nextReviewDate || "") < (b.nextReviewDate || "") ? -1 : 1;
  });
}

/**
 * 学習サマリーを取得（Duolingo風ホーム画面用）
 */
export function getStudySummary(todayStr: string = getTodayString()) {
  const data = loadStudyData();
  const todayAct = data.history.find((h) => h.date === todayStr);
  const todayAnswered = todayAct ? todayAct.answeredCount : 0;
  const todayGoal = data.settings.dailyGoal || 10;

  // 重複なしで取り組んだ経穴数
  const practicedCodes = new Set<string>();
  const masteredCodes = new Set<string>();

  for (const rec of Object.values(data.records)) {
    if (rec.totalAttempts > 0) {
      practicedCodes.add(rec.acupointCode);
    }
    if (rec.level === "mastered") {
      masteredCodes.add(rec.acupointCode);
    }
  }

  const dueItems = getDueReviewRecords(todayStr);

  return {
    todayAnswered,
    todayGoal,
    progressPercent: Math.min(100, Math.round((todayAnswered / todayGoal) * 100)),
    streakDays: data.streakDays,
    totalPracticedPoints: practicedCodes.size,
    totalMasteredPoints: masteredCodes.size,
    dueReviewCount: dueItems.length,
    dueRecords: dueItems,
    settings: data.settings,
  };
}

// ==================== データエクスポート・インポート ====================

export function exportStudyDataJson(): string {
  const data = loadStudyData();
  return JSON.stringify(data, null, 2);
}

export function importStudyDataJson(
  jsonStr: string,
  mode: "merge" | "replace"
): { success: boolean; message: string } {
  try {
    const parsed = JSON.parse(jsonStr);
    if (!parsed || parsed.version !== 1 || typeof parsed.records !== "object") {
      return { success: false, message: "無効な学習データ形式です（バージョン1のJSONが必要です）" };
    }

    if (mode === "replace") {
      resetAllStudyData();
      saveStudyData(parsed);
      return { success: true, message: "学習記録を正常に復元しました（全置換）" };
    } else {
      const current = loadStudyData();
      const merged: TsuboStudyDataV1 = {
        version: 1,
        settings: { ...current.settings, ...(parsed.settings || {}) },
        records: { ...current.records, ...parsed.records },
        history: [...current.history],
        streakDays: Math.max(current.streakDays, parsed.streakDays || 0),
        lastStudiedDate: current.lastStudiedDate || parsed.lastStudiedDate,
      };

      // 履歴の日付重複を統合
      if (Array.isArray(parsed.history)) {
        for (const h of parsed.history) {
          const existing = merged.history.find((x) => x.date === h.date);
          if (existing) {
            existing.answeredCount = Math.max(existing.answeredCount, h.answeredCount);
            existing.correctCount = Math.max(existing.correctCount, h.correctCount);
          } else {
            merged.history.push(h);
          }
        }
      }

      saveStudyData(merged);
      return { success: true, message: "学習記録を正常に統合しました" };
    }
  } catch (e) {
    return { success: false, message: `JSONの解析に失敗しました: ${String(e)}` };
  }
}

export function resetAllStudyData(): void {
  if (typeof window === "undefined") return;
  getLearningStorageAdapter()?.set('settings:tsubo-reset', true);
  saveActiveSession(null);
  const pausedKey = activeSessionKey(PAUSED_SESSIONS_KEY);
  if (pausedKey) localStorage.removeItem(pausedKey);
}

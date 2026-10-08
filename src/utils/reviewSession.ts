import type { LearningQuestion } from '@/data/learningQuestionBank';
import { questionRevision } from './learningReview';

export const REVIEW_SESSION_KEY = 'haritaro:temporary-review:v1';
export const REVIEW_SESSION_TTL = 24 * 60 * 60 * 1000;
const MAX_QUESTIONS = 3000;
const MAX_BYTES = 1_000_000;
const PUBLIC_ID = /^[A-Za-z0-9_-]{1,140}$/;
const REVISION = /^[A-Za-z0-9._-]{1,80}$/;
const OWNER = /^[A-Za-z0-9_-]{1,128}$/;
const SESSION_ID = /^[a-f\d]{8}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{12}$/i;

/** A tab-local checkpoint, separate from saved answers and their review schedule. */
export interface ReviewSession {
  version: 1;
  owner: string;
  id: string;
  createdAt: string;
  updatedAt: string;
  questions: { id: string; revision: string; fingerprint: string }[];
  index: number;
  choice: number | null;
  answers: (number | null)[];
}

type SessionStorage = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;
export type ReviewSessionStatus = 'missing' | 'restored' | 'invalid' | 'different' | 'unavailable';

function validQuestion(question: LearningQuestion): boolean {
  return PUBLIC_ID.test(question.id) && REVISION.test(question.revision)
    && typeof question.question === 'string' && typeof question.explanation === 'string'
    && question.options.length >= 2 && question.options.length <= 20
    && question.options.every(option => typeof option === 'string')
    && Number.isInteger(question.correctIndex) && question.correctIndex >= 0 && question.correctIndex < question.options.length;
}

function fingerprint(question: LearningQuestion): string {
  // Acupoint records can have answer-only revisions. Also check all current options and their order.
  return questionRevision(question.question, question.options, question.correctIndex, question.explanation);
}

function timestamp(value: unknown): number | null {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(value)) return null;
  const time = Date.parse(value);
  return Number.isFinite(time) && new Date(time).toISOString() === value ? time : null;
}

export function validReviewSessionId(id: unknown): id is string {
  return typeof id === 'string' && SESSION_ID.test(id);
}

/** Stored text, routes, scores and correctness flags are never trusted or replayed. */
export function validateReviewSession(value: unknown, owner: string, bank: readonly LearningQuestion[], now = Date.now()): ReviewSession | null {
  if (!value || typeof value !== 'object' || Array.isArray(value) || !OWNER.test(owner)) return null;
  const session = value as Partial<ReviewSession>;
  const created = timestamp(session.createdAt);
  const updated = timestamp(session.updatedAt);
  if (session.version !== 1 || session.owner !== owner || !validReviewSessionId(session.id)
    || created === null || updated === null || created > updated || updated > now + 60_000 || created > now + 60_000
    || now - created >= REVIEW_SESSION_TTL || !Array.isArray(session.questions)
    || !session.questions.length || session.questions.length > MAX_QUESTIONS
    || !Array.isArray(session.answers) || session.answers.length !== session.questions.length
    || !Number.isInteger(session.index) || session.index! < 0 || session.index! >= session.questions.length) return null;
  const questions = new Map(bank.map(question => [question.id, question]));
  const seen = new Set<string>();
  for (let index = 0; index < session.questions.length; index++) {
    const reference = session.questions[index];
    if (!reference || typeof reference !== 'object' || typeof reference.id !== 'string' || seen.has(reference.id)) return null;
    const question = questions.get(reference.id);
    if (!question || !validQuestion(question) || reference.revision !== question.revision || reference.fingerprint !== fingerprint(question)) return null;
    seen.add(reference.id);
    const answer = session.answers[index];
    if (answer !== null && (!Number.isInteger(answer) || answer < 0 || answer >= question.options.length)) return null;
    if ((index < session.index! && answer === null) || (index > session.index! && answer !== null)) return null;
  }
  const current = questions.get(session.questions[session.index!].id)!;
  if (session.choice !== null && (!Number.isInteger(session.choice) || session.choice! < 0 || session.choice! >= current.options.length)) return null;
  const answer = session.answers[session.index!];
  if (answer !== null && answer !== session.choice) return null;
  return {
    version: 1, owner, id: session.id, createdAt: session.createdAt!, updatedAt: session.updatedAt!,
    questions: session.questions.map(({ id, revision, fingerprint }) => ({ id, revision, fingerprint })),
    index: session.index!, choice: session.choice!, answers: [...session.answers],
  };
}

export function createReviewSession(questions: readonly LearningQuestion[], owner: string, id: string, now = Date.now()): ReviewSession | null {
  if (!questions.length || questions.length > MAX_QUESTIONS || !questions.every(validQuestion)) return null;
  const time = new Date(now).toISOString();
  return validateReviewSession({ version: 1, owner, id, createdAt: time, updatedAt: time,
    questions: questions.map(question => ({ id: question.id, revision: question.revision, fingerprint: fingerprint(question) })),
    index: 0, choice: null, answers: questions.map(() => null) }, owner, questions, now);
}

export function chooseReviewAnswer(session: ReviewSession, choice: number, bank: readonly LearningQuestion[], now = Date.now()): ReviewSession | null {
  if (session.answers[session.index] !== null) return null;
  return validateReviewSession({ ...session, choice, updatedAt: new Date(now).toISOString() }, session.owner, bank, now);
}

export function submitReviewAnswer(session: ReviewSession, bank: readonly LearningQuestion[], now = Date.now()): ReviewSession | null {
  if (!validateReviewSession(session, session.owner, bank, now) || session.choice === null || session.answers[session.index] !== null) return null;
  const answers = [...session.answers];
  answers[session.index] = session.choice;
  return { ...session, answers, updatedAt: new Date(now).toISOString() };
}

export function advanceReviewSession(session: ReviewSession, bank: readonly LearningQuestion[], now = Date.now()): ReviewSession | null {
  if (!validateReviewSession(session, session.owner, bank, now)) return null;
  if (session.answers[session.index] === null) return session;
  if (session.index + 1 === session.questions.length) return null;
  return { ...session, index: session.index + 1, choice: null, updatedAt: new Date(now).toISOString() };
}

export function reviewSessionScore(session: ReviewSession, bank: readonly LearningQuestion[]): number {
  const questions = new Map(bank.map(question => [question.id, question]));
  return session.answers.filter((answer, index) => answer !== null && answer === questions.get(session.questions[index].id)?.correctIndex).length;
}

export function reviewSessionReturnHref(id: unknown): string {
  return validReviewSessionId(id) ? `/kokushi?resumeReview=${id}#learning-review-practice` : '/kokushi#learning-review';
}

export function browserReviewStorage(): SessionStorage | null {
  try { return typeof window === 'undefined' ? null : window.sessionStorage; } catch { return null; }
}

export function saveReviewSession(storage: SessionStorage | null, session: ReviewSession | null): boolean {
  try {
    if (!storage) return false;
    if (session) storage.setItem(REVIEW_SESSION_KEY, JSON.stringify(session));
    else storage.removeItem(REVIEW_SESSION_KEY);
    return true;
  } catch { return false; }
}

export function restoreReviewSession(storage: SessionStorage | null, owner: string, bank: readonly LearningQuestion[], requestedId?: string | null, now = Date.now()): { session: ReviewSession | null; status: ReviewSessionStatus } {
  try {
    if (!storage) return { session: null, status: 'unavailable' };
    const raw = storage.getItem(REVIEW_SESSION_KEY);
    if (!raw) return { session: null, status: requestedId ? 'invalid' : 'missing' };
    const session = raw.length <= MAX_BYTES ? validateReviewSession(JSON.parse(raw), owner, bank, now) : null;
    if (!session) {
      storage.removeItem(REVIEW_SESSION_KEY);
      return { session: null, status: 'invalid' };
    }
    if (requestedId && (!validReviewSessionId(requestedId) || requestedId !== session.id)) return { session: null, status: 'different' };
    return { session, status: 'restored' };
  } catch {
    try { storage?.removeItem(REVIEW_SESSION_KEY); } catch { /* Unavailable storage must not prevent practice. */ }
    return { session: null, status: 'invalid' };
  }
}

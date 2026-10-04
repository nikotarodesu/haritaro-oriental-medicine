import { MERIDIANS } from './meridiansData';
import type { QuizQuestion, StudySession } from './types';

const STUDY_SKILLS = new Set(['location_to_name', 'meridian_of_point', 'category_of_point', 'puncture_method', 'golden_pairs', 'five_elements_shu']);
const record = (value: unknown): value is Record<string, unknown> => !!value && typeof value === 'object' && !Array.isArray(value);
const text = (value: unknown): value is string => typeof value === 'string' && value.length > 0;
const timestamp = (value: unknown): value is number => typeof value === 'number' && Number.isFinite(value) && value >= 0;

function validPointCode(value: unknown): boolean {
  if (typeof value !== 'string') return false;
  const match = /^([A-Z]{2})([1-9]\d*)$/.exec(value);
  return !!match && MERIDIANS.some(meridian => meridian.codePrefix === match[1] && Number(match[2]) <= meridian.totalPoints);
}

function validQuestion(value: unknown): value is QuizQuestion {
  if (!record(value) || !text(value.id) || !validPointCode(value.acupointCode)
    || typeof value.skill !== 'string' || !STUDY_SKILLS.has(value.skill)
    || !text(value.prompt) || typeof value.explanation !== 'string'
    || typeof value.meridianName !== 'string' || typeof value.locationReference !== 'string'
    || !text(value.correctOptionId) || !Array.isArray(value.options) || value.options.length === 0) return false;
  const ids = new Set<string>();
  for (const option of value.options) {
    if (!record(option) || !text(option.id) || typeof option.text !== 'string'
      || (option.subtext !== undefined && typeof option.subtext !== 'string') || ids.has(option.id)) return false;
    ids.add(option.id);
  }
  return ids.has(value.correctOptionId);
}

/** Validate persisted v2 sessions before rendering or replacing an existing answer. */
export function isValidStudySession(value: unknown): value is StudySession {
  if (!record(value) || value.contentVersion !== 2 || !text(value.sessionId)
    || !text(value.courseId) || !text(value.courseTitle) || typeof value.mode !== 'string'
    || !['batch', 'one_by_one', 'self_check'].includes(value.mode)
    || typeof value.isCompleted !== 'boolean' || !timestamp(value.startedAt)
    || (value.completedAt !== undefined && !timestamp(value.completedAt))
    || !Array.isArray(value.questions) || value.questions.length === 0
    || !value.questions.every(validQuestion) || !Number.isInteger(value.currentIndex)
    || typeof value.currentIndex !== 'number' || value.currentIndex < 0
    || value.currentIndex > value.questions.length
    || (!value.isCompleted && value.currentIndex === value.questions.length)
    || !record(value.answers)) return false;
  const questions = new Map(value.questions.map(question => [question.id, question]));
  if (questions.size !== value.questions.length) return false;
  for (const [questionId, answer] of Object.entries(value.answers)) {
    const question = questions.get(questionId);
    if (!question || !record(answer) || !text(answer.selectedOptionId)
      || !question.options.some(option => option.id === answer.selectedOptionId)
      || typeof answer.isCorrect !== 'boolean' || !timestamp(answer.confirmedAt)
      || answer.isCorrect !== (answer.selectedOptionId === question.correctOptionId)) return false;
  }
  if (value.selfEvaluations !== undefined) {
    if (!record(value.selfEvaluations)) return false;
    for (const [questionId, evaluation] of Object.entries(value.selfEvaluations)) {
      if (!questions.has(questionId) || (evaluation !== 'remembered' && evaluation !== 'needsReview')) return false;
    }
  }
  return true;
}

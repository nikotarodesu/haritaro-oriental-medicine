export type LearningFocusId = 'missing-information' | 'reasoning-evidence' | 'safety-check' | 'comparison' | 'reevaluation';

export interface LearningFocusDefinition {
  id: LearningFocusId;
  title: string;
  description: string;
  check: string;
  lectureId: string;
  heading: string;
  questionIds: readonly string[];
  priority: number;
}

/** Explicit links to existing, reviewed teaching material; no new diagnosis rules. */
export const LEARNING_FOCUS: readonly LearningFocusDefinition[] = [
  { id: 'safety-check', title: '安全確認と対応の優先順位', description: '確認した項目と未確認を分け、評価を遅らせない判断を振り返ります。', check: 'この段階で、先に確認・対応することは何か。', lectureId: 'lecture-yinyang-7', heading: '標・本の考え方と対応の優先順位', questionIds: ['lecture-yinyang-7-q3', 'lecture-yinyang-4-q2'], priority: 0 },
  { id: 'missing-information', title: '情報が足りないときに保留する', description: '一つの所見だけで確定せず、追加で確かめたいことを整理します。', check: '確認済みのことと、まだ分からないことは何か。', lectureId: 'lecture-yinyang-7', heading: '四診と単一所見の限界', questionIds: ['lecture-yinyang-7-q1'], priority: 1 },
  { id: 'reasoning-evidence', title: '事実と判断の根拠を分ける', description: '観察した事実、候補としての解釈、未確認を分けて読み直します。', check: 'その判断を支える事実は、どこに示されているか。', lectureId: 'lecture-yinyang-7', heading: '観察・解釈・保留を分ける練習', questionIds: ['lecture-yinyang-7-q1', 'lecture-yinyang-7-q2'], priority: 2 },
  { id: 'comparison', title: '比較する基準をそろえる', description: '部位・時間・比較相手をそろえ、合わない所見も残して考えます。', check: '何と何を、どの条件で比べているか。', lectureId: 'lecture-yinyang-2', heading: '比較する対象・基準の重要性', questionIds: ['lecture-yinyang-2-q1', 'lecture-yinyang-2-q2'], priority: 3 },
  { id: 'reevaluation', title: '同じ条件で変化を振り返る', description: '追加情報や経過を確認し、初めの候補に合わないときは見直します。', check: '前回と同じ条件で、何の変化を確認するか。', lectureId: 'lecture-yinyang-4', heading: '変化を観察する3つの視点', questionIds: ['lecture-yinyang-4-q3'], priority: 4 },
];

/** Reason IDs are mapped explicitly, rather than inferred from a user's answer text. */
export const CASE_REASON_FOCUS: Readonly<Record<string, readonly Readonly<Record<string, LearningFocusId>>[]>> = {
  'fatigue-reasoning': [
    { course: 'missing-information', digestive: 'comparison', 'one-sign': 'missing-information' },
    { persistent: 'safety-check', negative: 'reasoning-evidence', 'all-clear': 'safety-check' },
    { cluster: 'reasoning-evidence', alternative: 'comparison', lab: 'reasoning-evidence' },
    { evidence: 'reasoning-evidence', unknown: 'missing-information', equivalent: 'reasoning-evidence' },
    { provisional: 'missing-information', evaluation: 'reevaluation', guarantee: 'reasoning-evidence' },
    { function: 'reevaluation', reconsider: 'reevaluation', reaction: 'safety-check' },
  ],
  'back-pain-referral': [
    { neurologic: 'safety-check', time: 'missing-information', 'tongue-first': 'safety-check' },
    { 'red-flags': 'safety-check', 'no-delay': 'safety-check', 'pain-first': 'safety-check' },
    { suspected: 'reasoning-evidence', hold: 'safety-check', kidney: 'comparison' },
    { handoff: 'safety-check', facts: 'reasoning-evidence', 'pattern-only': 'reasoning-evidence' },
    { defer: 'safety-check', urgency: 'safety-check', ratio: 'safety-check' },
    { completed: 'safety-check', medical: 'reevaluation', 'cancel-referral': 'safety-check' },
  ],
  'mixed-temperature': [
    { 'where-when': 'comparison', causes: 'missing-information', 'whole-heat': 'comparison' },
    { documented: 'reasoning-evidence', ongoing: 'safety-check', 'no-tests': 'safety-check' },
    { both: 'comparison', missing: 'missing-information', last: 'comparison' },
    { separate: 'reasoning-evidence', provisional: 'reasoning-evidence', flow: 'reasoning-evidence' },
    { uncertain: 'missing-information', explain: 'reasoning-evidence', cool: 'reasoning-evidence' },
    { compare: 'reevaluation', revise: 'reevaluation', ignore: 'safety-check' },
  ],
};

export const CASE_STAGE_FOCUS: readonly LearningFocusId[] = ['missing-information', 'safety-check', 'comparison', 'reasoning-evidence', 'missing-information', 'reevaluation'];

export function getLearningFocus(id: string): LearningFocusDefinition | undefined {
  return LEARNING_FOCUS.find(focus => focus.id === id);
}

export function learningFocusLectureHref(focus: LearningFocusDefinition): string {
  return `/curriculum/${focus.lectureId}?focus=${encodeURIComponent(focus.heading)}`;
}

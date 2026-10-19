import type { ClinicalObservations } from './clinicalWorkflow';

export const EXAMINATION_GROUPS = ['問診', '望診', '聞診', '切診'] as const;
type ExaminationGroup = typeof EXAMINATION_GROUPS[number];
interface ExaminationField { id: string; group: ExaminationGroup; label: string; options: readonly string[]; }
/** Descriptive recording choices; these are not diagnostic criteria. */
export const EXAMINATION_FIELDS: readonly ExaminationField[] = [
  { id: 'course', group: '問診', label: '症状の経過', options: ['改善傾向', '変化なし', '悪化傾向', '変動する', '判断困難'] },
  { id: 'painQuality', group: '問診', label: '痛みの性質（主なもの）', options: ['痛みなし', '鈍い痛み', '刺すような痛み', '張る痛み', '重い痛み', '灼けるような痛み', 'その他・複数（補足へ）', '判断困難'] },
  { id: 'thirst', group: '問診', label: '口渇・飲水', options: ['口渇なし', '口渇あり・飲水を好む', '口渇あり・飲水を好まない', 'その他（補足へ）', '判断困難'] },
  { id: 'sweating', group: '問診', label: '発汗（主な状態）', options: ['普段と変わらない', '日中の発汗が多い', '発汗が少ない', 'その他・複数（補足へ）', '判断困難'] },
  { id: 'tongueMoisture', group: '望診', label: '舌の潤い', options: ['潤っている', '乾燥している', '唾液が多い', '判断困難'] },
  { id: 'coatColor', group: '望診', label: '舌苔の色', options: ['白', '黄', '灰・黒', '混在', '苔を認めない', '判断困難'] },
  { id: 'coatThickness', group: '望診', label: '舌苔の厚さ', options: ['薄い', '厚い', '部分的・不均一', '苔を認めない', '判断困難'] },
  { id: 'tongueShape', group: '望診', label: '舌の形（主な所見）', options: ['目立つ変化なし', '腫大', '歯痕', '裂紋', 'その他・複数（補足へ）', '判断困難'] },
  { id: 'voiceQuality', group: '聞診', label: '声の性状', options: ['普段と変わらない', 'かすれる', '発声しづらい', 'その他（補足へ）', '判断困難'] },
  { id: 'cough', group: '聞診', label: '咳・痰', options: ['咳・痰を認めない', '乾いた咳', '痰を伴う咳', '痰のみ', 'その他（補足へ）', '判断困難'] },
  { id: 'odor', group: '聞診', label: 'においの変化', options: ['目立つ変化なし', '変化あり（部位・性状を補足へ）', '判断困難'] },
  { id: 'pulseSpeed', group: '切診', label: '脈の速さ', options: ['遅い（遅）', '通常と判断', '速い（数）', '速くない（通常・遅い未区分）', '判断困難'] },
  { id: 'pulseStrength', group: '切診', label: '脈の強さ', options: ['弱い・無力', '中等度', '強い・有力', '弱くない（強さ未区分）', '判断困難'] },
  { id: 'pulseDepth', group: '切診', label: '脈の深さ', options: ['浅いところで触れる（浮）', '中間で触れる', '深いところで触れる（沈）', '浅深ともに触れる', '判断困難'] },
  { id: 'pulseRhythm', group: '切診', label: '脈のリズム', options: ['整', '不整を認める', '判断困難'] },
  { id: 'pulseWidth', group: '切診', label: '脈の太さ', options: ['細い', '中等度', '太い', '判断困難'] },
  { id: 'pulseFlow', group: '切診', label: '脈の流れ・触感', options: ['滑らか（滑）', '渋る（濇）', 'その他（補足へ）', '判断困難'] },
  { id: 'pulseSide', group: '切診', label: '脈の左右差', options: ['差を認めない', '右が強い', '左が強い', 'その他の差（補足へ）', '判断困難'] },
  { id: 'tenderness', group: '切診', label: '圧痛', options: ['なし', 'あり', '判断困難'] },
  { id: 'muscleTone', group: '切診', label: '筋・腹部の緊張', options: ['目立つ変化なし', '緊張が強い', '緊張が弱い', '部位で異なる', '判断困難'] },
  { id: 'skinTemperature', group: '切診', label: '触れた部位の皮膚温', options: ['目立つ左右差・局所差なし', '冷たく感じる', '熱く感じる', '部位で異なる', '判断困難'] },
  { id: 'edema', group: '切診', label: '浮腫', options: ['認めない', '認める', '判断困難'] },
];
export type ClinicalExamination = Partial<Record<string, string>>;
export const EXAMINATION_TEXT_FIELDS = [
  { id: 'interviewDetails', group: '問診', label: '問診の補足・その他の所見', maxLength: 2000 },
  { id: 'inspectionDetails', group: '望診', label: '望診の補足・観察条件', maxLength: 2000 },
  { id: 'listeningDetails', group: '聞診', label: '聞診の補足・その他の所見', maxLength: 2000 },
  { id: 'pulseRate', group: '切診', label: '実測脈拍（回/分）', maxLength: 3 },
  { id: 'pulseConditions', group: '切診', label: '脈の測定条件・部位', maxLength: 2000 },
  { id: 'palpationSite', group: '切診', label: '触診した部位・左右・圧の深さ', maxLength: 2000 },
  { id: 'palpationDetails', group: '切診', label: '切診の補足・その他の所見', maxLength: 2000 },
] as const;

export function validClinicalExamination(value: unknown): value is ClinicalExamination {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  return Object.entries(value).every(([id, item]) => {
    if (typeof item !== 'string') return false;
    const field = EXAMINATION_FIELDS.find(field => field.id === id);
    if (field) return item === '' || field.options.includes(item);
    const text = EXAMINATION_TEXT_FIELDS.find(field => field.id === id);
    if (!text || item.length > text.maxLength) return false;
    return id !== 'pulseRate' || item === '' || /^[1-9]\d{0,2}$/.test(item);
  });
}

/** Preserve the exact meaning of old three-state pulse findings. */
export function examinationValue(id: string, examination: ClinicalExamination = {}, observations: ClinicalObservations = {}): string {
  if (examination[id] !== undefined) return examination[id] || '';
  if (id === 'pulseSpeed') return observations.rapidPulse === 'present' ? '速い（数）' : observations.rapidPulse === 'absent' ? '速くない（通常・遅い未区分）' : '';
  if (id === 'pulseStrength') return observations.weakPulse === 'present' ? '弱い・無力' : observations.weakPulse === 'absent' ? '弱くない（強さ未区分）' : '';
  return '';
}

export function examinationObservationPatch(id: string, value: string): ClinicalObservations {
  const status = !value || value === '判断困難' ? 'unknown' : 'absent';
  if (id === 'pulseSpeed') return { rapidPulse: value === '速い（数）' ? 'present' : status };
  if (id === 'pulseStrength') return { weakPulse: value === '弱い・無力' ? 'present' : status };
  return {};
}

export function examinationSummary(examination: ClinicalExamination = {}, observations: ClinicalObservations = {}, group?: ExaminationGroup): string {
  return EXAMINATION_GROUPS.filter(item => !group || item === group).flatMap(item => {
    const lines = [...EXAMINATION_FIELDS, ...EXAMINATION_TEXT_FIELDS].filter(field => field.group === item).flatMap(field => {
      const value = examinationValue(field.id, examination, observations);
      return value ? [`${field.label}：${value}`] : [];
    });
    return lines.length ? [`${item}：\n${lines.join('\n')}`] : [];
  }).join('\n\n');
}

import type { ClinicalObservations } from './clinicalWorkflow';

export const EXAMINATION_GROUPS = ['問診', '望診', '聞診', '切診'] as const;
type ExaminationGroup = typeof EXAMINATION_GROUPS[number];
interface ExaminationField { id: string; group: ExaminationGroup; label: string; options: readonly string[]; legacy?: boolean; }
/** Descriptive recording choices; these are not diagnostic criteria. */
const ALL_EXAMINATION_FIELDS: readonly ExaminationField[] = [
  { id: 'course', group: '問診', label: '症状の経過', options: ['改善傾向', '変化なし', '悪化傾向', '変動する', '判断困難'] },
  { id: 'painQuality', group: '問診', label: '痛みの性質（主なもの）', options: ['痛みなし', '鈍い痛み', '刺すような痛み', '張る痛み', '重い痛み', '灼けるような痛み', 'その他・複数（補足へ）', '判断困難'] },
  { id: 'painLocation', group: '問診', label: '痛む場所の変化', options: ['痛みなし', '固定している', '移動する', '固定と移動が混在', '判断困難'] },
  { id: 'thirst', group: '問診', label: '口渇・飲水', options: ['口渇なし', '口渇あり・飲水を好む', '口渇あり・飲水を好まない', 'その他（補足へ）', '判断困難'] },
  { id: 'sweating', group: '問診', label: '発汗（主な状態）', options: ['普段と変わらない', '日中の発汗が多い', '安静時にも自然に汗が出る（自汗）', '発汗が少ない', 'その他・複数（補足へ）', '判断困難'] },
  { id: 'tongueColor', group: '望診', label: '舌体の色', options: ['淡紅', '淡白', '紅', '絳（深い赤）', '暗紅', '淡紫', '青紫', '紅紫', '混在・部位差（補足へ）', '判断困難'] },
  { id: 'tongueSize', group: '望診', label: '舌体の大きさ・厚み', options: ['目立つ変化なし', '腫大・胖大', '痩薄', '部位で異なる', '判断困難'] },
  { id: 'tongueTeeth', group: '望診', label: '舌の歯痕', options: ['なし', '軽度', '明瞭', '判断困難'] },
  { id: 'tongueCracks', group: '望診', label: '舌の裂紋', options: ['なし', '浅い裂紋', '深い裂紋', '局所的', '判断困難'] },
  { id: 'tongueSpots', group: '望診', label: '舌の瘀点・瘀斑', options: ['なし', '点状', '斑状', '点状と斑状', '判断困難'] },
  { id: 'tongueMoisture', group: '望診', label: '舌体の乾湿', options: ['潤っている', '乾燥している', '強く乾燥・津液が乏しい', '唾液が多い', '部位で異なる', '判断困難'] },
  { id: 'coatColor', group: '望診', label: '舌苔の色', options: ['白', '黄', '淡黄', '濃黄', '灰', '黒', '灰・黒', '混在', '苔を認めない', '判断困難'] },
  { id: 'coatThickness', group: '望診', label: '舌苔の厚さ', options: ['薄い', '厚い', '少ない', '部分的・不均一', '苔を認めない', '判断困難'] },
  { id: 'coatTexture', group: '望診', label: '舌苔の性状', options: ['目立つ変化なし', '膩苔（きめ細かく粘る）', '腐苔（粗く厚い）', '剥苔（部分的に剥離）', '苔を認めない', '判断困難'] },
  { id: 'coatMoisture', group: '望診', label: '舌苔の乾湿', options: ['潤っている', '乾燥している', '滑潤・水分が多い', '部位で異なる', '苔を認めない', '判断困難'] },
  { id: 'tongueShape', group: '望診', label: '旧記録の舌の形', options: ['目立つ変化なし', '腫大', '歯痕', '裂紋', 'その他・複数（補足へ）', '判断困難'], legacy: true },
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
export const EXAMINATION_FIELDS = ALL_EXAMINATION_FIELDS.filter(field => !field.legacy);
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
    const field = ALL_EXAMINATION_FIELDS.find(field => field.id === id);
    if (field) return item === '' || field.options.includes(item);
    const text = EXAMINATION_TEXT_FIELDS.find(field => field.id === id);
    if (!text || item.length > text.maxLength) return false;
    return id !== 'pulseRate' || item === '' || /^[1-9]\d{0,2}$/.test(item);
  });
}

/** Preserve the exact meaning of old three-state pulse findings. */
export function examinationValue(id: string, examination: ClinicalExamination = {}, observations: ClinicalObservations = {}): string {
  if (examination[id] !== undefined) return examination[id] || '';
  if (id === 'painQuality' && observations.fixedPain === 'present') return '刺すような痛み';
  if (id === 'painLocation' && observations.fixedPain === 'present') return '固定している';
  if (id === 'tongueColor') return observations.paleTongue === 'present' && observations.redTongue !== 'present' ? '淡白' : observations.redTongue === 'present' && observations.paleTongue !== 'present' ? '紅' : '';
  if (id === 'coatTexture' && observations.greasyCoat === 'present') return '膩苔（きめ細かく粘る）';
  if (id === 'tongueSize') return examination.tongueShape === '腫大' ? '腫大・胖大' : examination.tongueShape === '目立つ変化なし' ? '目立つ変化なし' : '';
  if (id === 'tongueTeeth' && examination.tongueShape === '歯痕') return '明瞭';
  if (id === 'tongueCracks' && examination.tongueShape === '裂紋') return '局所的';
  if (id === 'pulseSpeed') return observations.rapidPulse === 'present' ? '速い（数）' : observations.rapidPulse === 'absent' ? '速くない（通常・遅い未区分）' : '';
  if (id === 'pulseStrength') return observations.weakPulse === 'present' ? '弱い・無力' : observations.weakPulse === 'absent' ? '弱くない（強さ未区分）' : '';
  return '';
}

export function examinationObservationPatch(id: string, value: string): ClinicalObservations {
  const status = !value || value === '判断困難' ? 'unknown' : 'absent';
  if (id === 'pulseSpeed') return { rapidPulse: value === '速い（数）' ? 'present' : status };
  if (id === 'pulseStrength') return { weakPulse: value === '弱い・無力' ? 'present' : status };
  if (id === 'tongueColor') {
    const unclear = !value || value === '判断困難' || value === '混在・部位差（補足へ）';
    return { paleTongue: unclear ? 'unknown' : value === '淡白' ? 'present' : 'absent', redTongue: unclear ? 'unknown' : ['紅', '絳（深い赤）', '暗紅'].includes(value) ? 'present' : 'absent' };
  }
  if (id === 'coatTexture') return { greasyCoat: value === '膩苔（きめ細かく粘る）' ? 'present' : status };
  return {};
}

export function resolvedExaminationObservations(observations: ClinicalObservations, examination: ClinicalExamination = {}): ClinicalObservations {
  const result = Object.entries(examination).reduce((result, [id, value]) => ({ ...result, ...examinationObservationPatch(id, value || '') }), { ...observations });
  if (examination.painQuality !== undefined || examination.painLocation !== undefined) {
    const quality = examination.painQuality || '', location = examination.painLocation || '';
    const clear = (value: string) => value && !/判断困難|その他|混在/.test(value);
    result.fixedPain = clear(quality) && quality !== '刺すような痛み' || clear(location) && location !== '固定している' ? 'absent' : quality === '刺すような痛み' && location === '固定している' ? 'present' : 'unknown';
  }
  if (examinationIssues(examination).length) result.greasyCoat = 'unknown';
  return result;
}

export function examinationIssues(examination: ClinicalExamination = {}): string[] {
  const values = ['coatColor', 'coatThickness', 'coatTexture', 'coatMoisture'].map(id => examination[id]);
  return values.includes('苔を認めない') && values.some(value => value && value !== '苔を認めない' && value !== '判断困難') ? ['「苔を認めない」と苔の色・厚さ・性状・乾湿が混在しています。再確認するまで苔の詳細は比較根拠に使いません。'] : [];
}

/** Clearing mutually incompatible coating choices never invents an observed colour or texture. */
export function updateExaminationValue(examination: ClinicalExamination = {}, id: string, value: string): ClinicalExamination {
  const next = { ...examination, [id]: value };
  const coatFields = ['coatColor', 'coatThickness', 'coatTexture', 'coatMoisture'];
  if (coatFields.includes(id) && value === '苔を認めない') for (const field of coatFields) next[field] = value;
  else if (coatFields.includes(id) && value && value !== '判断困難') for (const field of coatFields) if (field !== id && next[field] === '苔を認めない') next[field] = '';
  return next;
}

export function examinationSummary(examination: ClinicalExamination = {}, observations: ClinicalObservations = {}, group?: ExaminationGroup): string {
  return EXAMINATION_GROUPS.filter(item => !group || item === group).flatMap(item => {
    const lines = [...ALL_EXAMINATION_FIELDS, ...EXAMINATION_TEXT_FIELDS].filter(field => field.group === item).flatMap(field => {
      const value = examinationValue(field.id, examination, observations);
      return value ? [`${field.label}：${value}`] : [];
    });
    return lines.length ? [`${item}：\n${lines.join('\n')}`] : [];
  }).join('\n\n');
}

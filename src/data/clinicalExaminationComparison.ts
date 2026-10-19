import { EXAMINATION_FIELDS, EXAMINATION_TEXT_FIELDS, examinationValue, examinationIssues, type ClinicalExamination } from './clinicalExamination';
import type { ClinicalObservations, ClinicalSignId, ClinicalPattern, ObservationStatus } from './clinicalWorkflow';

interface Finding {
  id: `exam:${string}`; field: string; label: string; present: readonly string[];
  absent?: readonly string[]; requires?: { field: string; present: readonly string[] };
}
/** Transparent, limited traditional teaching associations. See docs/clinical-workflow.md for sources and scope. */
export const EXAMINATION_FINDINGS: readonly Finding[] = [
  { id: 'exam:purple', field: 'tongueColor', label: '紫色の舌体', present: ['淡紫', '青紫', '紅紫'] },
  { id: 'exam:swollen', field: 'tongueSize', label: '腫大・胖大舌', present: ['腫大・胖大'] },
  { id: 'exam:teeth', field: 'tongueTeeth', label: '舌の歯痕', present: ['軽度', '明瞭'] },
  { id: 'exam:spots', field: 'tongueSpots', label: '舌の瘀点・瘀斑', present: ['点状', '斑状', '点状と斑状'] },
  { id: 'exam:dryTongue', field: 'tongueMoisture', label: '舌体の乾燥', present: ['乾燥している', '強く乾燥・津液が乏しい'] },
  { id: 'exam:wetTongue', field: 'tongueMoisture', label: '舌体の水分が多い', present: ['唾液が多い'] },
  { id: 'exam:yellow', field: 'coatColor', label: '黄苔', present: ['黄', '淡黄', '濃黄'] },
  { id: 'exam:thick', field: 'coatThickness', label: '厚い舌苔', present: ['厚い'] },
  { id: 'exam:scant', field: 'coatThickness', label: '少苔・無苔', present: ['少ない', '苔を認めない'], absent: ['薄い', '厚い'] },
  { id: 'exam:peeled', field: 'coatTexture', label: '剥苔', present: ['剥苔（部分的に剥離）'] },
  { id: 'exam:dryCoat', field: 'coatMoisture', label: '舌苔の乾燥', present: ['乾燥している'], absent: ['潤っている', '滑潤・水分が多い'] },
  { id: 'exam:deep', field: 'pulseDepth', label: '深いところで触れる脈（沈）', present: ['深いところで触れる（沈）'] },
  { id: 'exam:fine', field: 'pulseWidth', label: '細い脈', present: ['細い'] },
  { id: 'exam:slippery', field: 'pulseFlow', label: '滑らかな脈（滑）', present: ['滑らか（滑）'] },
  { id: 'exam:choppy', field: 'pulseFlow', label: '渋る脈（濇）', present: ['渋る（濇）'] },
  { id: 'exam:selfSweat', field: 'sweating', label: '安静時の自汗', present: ['安静時にも自然に汗が出る（自汗）'], absent: ['発汗が少ない'] },
  { id: 'exam:thirst', field: 'thirst', label: '口渇があり飲水を好む', present: ['口渇あり・飲水を好む'] },
  { id: 'exam:distending', field: 'painQuality', label: '張る痛み', present: ['張る痛み'] },
  { id: 'exam:cough', field: 'cough', label: '咳を認める', present: ['乾いた咳', '痰を伴う咳'], absent: ['咳・痰を認めない', '痰のみ'] },
  { id: 'exam:dryCough', field: 'cough', label: '乾いた咳', present: ['乾いた咳'] },
  { id: 'exam:phlegm', field: 'cough', label: '痰を認める', present: ['痰を伴う咳', '痰のみ'] },
  { id: 'exam:hoarse', field: 'voiceQuality', label: '声のかすれ', present: ['かすれる'] },
  { id: 'exam:edema', field: 'edema', label: '浮腫', present: ['認める'] },
];
export type ComparisonFindingId = ClinicalSignId | `exam:${string}`;
interface Association { supports: readonly string[]; conflicts?: readonly string[]; }
const YIN = ['scant', 'fine', 'dryTongue', 'dryCoat'];
export const EXAMINATION_ASSOCIATIONS: Readonly<Record<string, Association>> = {
  'spleen-qi': { supports: ['swollen', 'teeth', 'selfSweat'] },
  'spleen-yang': { supports: ['swollen', 'teeth', 'deep', 'fine', 'edema'] },
  'liver-qi': { supports: ['distending'] },
  'liver-heat': { supports: ['yellow', 'thirst'], conflicts: ['scant'] },
  yin: { supports: YIN, conflicts: ['thick'] },
  stasis: { supports: ['purple', 'spots', 'choppy'] },
  damp: { supports: ['thick', 'slippery', 'edema', 'phlegm', 'wetTongue'], conflicts: ['dryTongue', 'dryCoat'] },
  qi: { supports: ['selfSweat'] },
  'qi-stagnation': { supports: ['distending'] },
  'qi-counterflow': { supports: ['cough'] },
  blood: { supports: ['fine'] },
  yang: { supports: ['deep', 'fine', 'swollen', 'edema'] },
  'liver-blood': { supports: ['fine'] },
  'liver-stomach': { supports: ['distending'] },
  'liver-spleen': { supports: ['distending', 'teeth'] },
  'heart-qi': { supports: ['selfSweat'] },
  'heart-blood': { supports: ['fine'] },
  'heart-yin': { supports: YIN, conflicts: ['thick'] },
  'heart-kidney': { supports: YIN },
  'stomach-yin': { supports: ['scant', 'peeled', 'dryTongue', 'dryCoat'] },
  'lung-qi': { supports: ['selfSweat'] },
  'lung-yin': { supports: [...YIN, 'dryCough', 'hoarse'] },
  'kidney-qi': { supports: [] },
  'kidney-yin': { supports: YIN },
  'kidney-yang': { supports: ['deep', 'fine', 'swollen', 'edema'] },
  'liver-kidney-yin': { supports: YIN },
};

function fieldStatus(field: string, positive: readonly string[], negative: readonly string[] | undefined, examination: ClinicalExamination, observations: ClinicalObservations): ObservationStatus {
  if (field.startsWith('coat') && examinationIssues(examination).length) return 'unknown';
  const value = examinationValue(field, examination, observations);
  if (!value || /判断困難|その他|部位で異なる|部位差|混在|不均一/.test(value)) return 'unknown';
  if (positive.includes(value)) return 'present';
  return !negative || negative.includes(value) ? 'absent' : 'unknown';
}
export function examinationFindingStatus(finding: Finding, examination: ClinicalExamination, observations: ClinicalObservations = {}): ObservationStatus {
  const primary = fieldStatus(finding.field, finding.present, finding.absent, examination, observations);
  if (!finding.requires) return primary;
  const required = fieldStatus(finding.requires.field, finding.requires.present, undefined, examination, observations);
  return primary === 'absent' || required === 'absent' ? 'absent' : primary === 'present' && required === 'present' ? 'present' : 'unknown';
}
export function compareExaminationFindings(patternId: string, examination: ClinicalExamination, observations: ClinicalObservations) {
  const association = EXAMINATION_ASSOCIATIONS[patternId];
  const supports = EXAMINATION_FINDINGS.filter(finding => association?.supports.includes(finding.id.slice(5)));
  const conflicts = EXAMINATION_FINDINGS.filter(finding => association?.conflicts?.includes(finding.id.slice(5)));
  return {
    supported: supports.filter(finding => examinationFindingStatus(finding, examination, observations) === 'present').map(finding => finding.id),
    missing: supports.filter(finding => examinationFindingStatus(finding, examination, observations) === 'absent').map(finding => finding.id),
    unknown: supports.filter(finding => examinationFindingStatus(finding, examination, observations) === 'unknown').map(finding => finding.id),
    conflicting: conflicts.filter(finding => examinationFindingStatus(finding, examination, observations) === 'present').map(finding => finding.id),
  };
}
export function examinationFinding(id: ComparisonFindingId) { return EXAMINATION_FINDINGS.find(finding => finding.id === id); }
export function comparisonContext(pattern: ClinicalPattern, examination: ClinicalExamination = {}, observations: ClinicalObservations = {}) {
  const association = EXAMINATION_ASSOCIATIONS[pattern.id];
  const used = new Set(EXAMINATION_FINDINGS.filter(finding => [...(association?.supports || []), ...(association?.conflicts || [])].includes(finding.id.slice(5))).flatMap(finding => [finding.field, ...(finding.requires ? [finding.requires.field] : [])]));
  // These fields already feed the original catalogue flags; do not count them twice.
  const legacyFields: Partial<Record<ClinicalSignId, string>> = { paleTongue: 'tongueColor', redTongue: 'tongueColor', greasyCoat: 'coatTexture', rapidPulse: 'pulseSpeed', weakPulse: 'pulseStrength', fixedPain: 'painQuality' };
  [...pattern.supports, ...pattern.conflicts].forEach(id => { const field = legacyFields[id]; if (field) used.add(field); });
  return [...EXAMINATION_FIELDS, ...EXAMINATION_TEXT_FIELDS].filter(field => !used.has(field.id)).flatMap(field => {
    const value = examinationValue(field.id, examination, observations);
    return value ? [`${field.label}：${value}`] : [];
  });
}

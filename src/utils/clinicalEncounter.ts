import { CLINICAL_SIGNS, CLINICAL_PATTERNS, OBSERVATION_LABELS, type ClinicalObservations } from '@/data/clinicalWorkflow';
import type { PatientNoteItem } from '@/types/clinicalMemo';
import type { DraftPatientNote } from './draftNote';

export interface ClinicalPointPlan { code: string; role: 'root' | 'branch' | 'other'; reason: string; alternative: string; }
export interface ClinicalEncounter {
  version: 1; step: number; patientIdentifier: string; chiefComplaint: string; complaintSlug: string; visitDate: string;
  observations: ClinicalObservations; examinationMemo: string;
  safety: 'unknown' | 'reviewed' | 'refer'; safetyMemo: string;
  candidateIds: string[]; rationale: string; principle: string; points: ClinicalPointPlan[];
  plan: string; metric: string; before: string; after: string; functionMemo: string;
  reaction: string; nextAction: string; revision: string; previousSummary: string;
}
export const CLINICAL_ENCOUNTER_KEY = 'haritaro_clinical_encounter_v1';
export function clinicalToday(): string { return new Intl.DateTimeFormat('sv-SE', { timeZone: 'Asia/Tokyo', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date()); }
export function emptyClinicalEncounter(): ClinicalEncounter {
  return { version: 1, step: 0, patientIdentifier: '', chiefComplaint: '', complaintSlug: '', visitDate: clinicalToday(), observations: {}, examinationMemo: '', safety: 'unknown', safetyMemo: '', candidateIds: [], rationale: '', principle: '', points: [], plan: '', metric: '', before: '', after: '', functionMemo: '', reaction: '', nextAction: '', revision: '', previousSummary: '' };
}
const textFields = ['patientIdentifier','chiefComplaint','complaintSlug','visitDate','examinationMemo','safetyMemo','rationale','principle','plan','metric','before','after','functionMemo','reaction','nextAction','revision','previousSummary'] as const;
export function parseClinicalEncounter(raw: unknown): ClinicalEncounter | null {
  if (!raw || typeof raw !== 'object') return null;
  const value = raw as Record<string, unknown>;
  if (value.version !== 1 || !Number.isInteger(value.step) || Number(value.step) < 0 || Number(value.step) > 4) return null;
  if (!textFields.every(key => typeof value[key] === 'string' && (value[key] as string).length <= 20000)) return null;
  if (value.visitDate !== '' && !/^\d{4}-\d{2}-\d{2}$/.test(String(value.visitDate))) return null;
  if (!['before','after'].every(key => value[key] === '' || /^\d+$/.test(String(value[key])) && Number(value[key]) <= 10)) return null;
  if (!['unknown','reviewed','refer'].includes(String(value.safety))) return null;
  if (!value.observations || typeof value.observations !== 'object' || Array.isArray(value.observations)) return null;
  if (!Object.entries(value.observations).every(([id, status]) => CLINICAL_SIGNS.some(sign => sign.id === id) && ['unknown','present','absent'].includes(String(status)))) return null;
  if (!Array.isArray(value.candidateIds) || !value.candidateIds.every(id => CLINICAL_PATTERNS.some(pattern => pattern.id === id))) return null;
  if (!Array.isArray(value.points) || value.points.length > 12 || !value.points.every(point => point && typeof point === 'object' && typeof point.code === 'string' && /^[A-Z]{2}\d{1,2}$/.test(point.code) && ['root','branch','other'].includes(point.role) && typeof point.reason === 'string' && point.reason.length <= 20000 && typeof point.alternative === 'string' && point.alternative.length <= 20000)) return null;
  return value as unknown as ClinicalEncounter;
}
export function readClinicalEncounter(): { encounter: ClinicalEncounter | null; error: string | null } {
  try {
    const raw = sessionStorage.getItem(CLINICAL_ENCOUNTER_KEY);
    if (!raw) return { encounter: null, error: null };
    const encounter = parseClinicalEncounter(JSON.parse(raw));
    return { encounter, error: encounter ? null : '下書きの形式を読み込めませんでした。保存済みノートから再開できます。' };
  } catch { return { encounter: null, error: '下書きを読み込めません。ブラウザの保存設定を確認してください。' }; }
}
export function writeClinicalEncounter(encounter: ClinicalEncounter): boolean {
  try { sessionStorage.setItem(CLINICAL_ENCOUNTER_KEY, JSON.stringify(encounter)); return true; } catch { return false; }
}
export function clearClinicalEncounter(): boolean {
  try { sessionStorage.removeItem(CLINICAL_ENCOUNTER_KEY); return true; } catch { return false; }
}
export function clinicalEncounterDraft(encounter: ClinicalEncounter, pointNames: string[]): Omit<DraftPatientNote, 'createdAt'> {
  if (encounter.safety !== 'reviewed') { encounter = { ...encounter, points: [] }; pointNames = []; }
  const signs = CLINICAL_SIGNS.map(sign => `${sign.label}：${OBSERVATION_LABELS[encounter.observations[sign.id] || 'unknown']}`).join('\n');
  const pointText = encounter.points.map((point, index) => `${pointNames[index] || point.code}（${point.code}／${point.role === 'root' ? '本治として検討' : point.role === 'branch' ? '標治として検討' : '役割を保留'}）\n採用理由：${point.reason || '未記入'}\n代替案・変更条件：${point.alternative || '未記入'}`).join('\n\n');
  return {
    sourceTool: '臨床ワークスペース', patientIdentifier: encounter.patientIdentifier, chiefComplaint: encounter.chiefComplaint, visitDate: encounter.visitDate,
    syndrome: encounter.candidateIds.map(id => CLINICAL_PATTERNS.find(pattern => pattern.id === id)?.name).filter(Boolean).join('／'),
    selectedPointsInput: pointNames.join('、'),
    treatmentPlan: `【安全確認】\n${encounter.safety === 'refer' ? '施術を保留・医療評価を優先' : encounter.safety === 'reviewed' ? '確認した範囲で該当兆候なし（疾患の除外ではない）' : '未確認'}\n${encounter.safetyMemo}\n\n【四診所見】\n${signs}\n補足：${encounter.examinationMemo || '未記入'}\n\n【候補の判断根拠】\n${encounter.rationale || '未記入'}\n治法：${encounter.principle || '保留'}\n\n【配穴の採用理由】\n${pointText || '保留'}\n\n【評価指標】\n指標：${encounter.metric.replaceAll('\n', ' ')}\n施術前（0〜10）：${encounter.before}\n施術直後（0〜10）：${encounter.after}\n生活動作：${encounter.functionMemo}\n\n【施術計画】\n${encounter.plan}\n\n【見立ての修正】\n${encounter.revision || '未記入'}${encounter.previousSummary ? `\n\n【前回からの申し送り】\n${encounter.previousSummary}` : ''}`,
    patientReaction: encounter.reaction, nextAction: encounter.nextAction,
  };
}
export function readClinicalMetric(note: Pick<PatientNoteItem, 'treatmentPlan'>) {
  const text = note.treatmentPlan || '';
  const start = text.indexOf('【評価指標】');
  const section = start < 0 ? '' : text.slice(start).split('\n\n')[0];
  const read = (label: string) => section.split('\n').find(line => line.startsWith(label))?.slice(label.length).trim() || '';
  return { name: read('指標：'), before: read('施術前（0〜10）：'), after: read('施術直後（0〜10）：') };
}
export function clinicalFollowup(note: PatientNoteItem): ClinicalEncounter {
  const metric = readClinicalMetric(note);
  return { ...emptyClinicalEncounter(), patientIdentifier: note.patientIdentifier, chiefComplaint: note.chiefComplaint, metric: metric.name,
    previousSummary: `${note.visitDate}：${note.syndrome || '見立て未記入'}\n配穴：${note.selectedPoints.join('、')}\n直後：${note.patientReaction || '未記入'}\n次回確認：${note.nextAction || '未記入'}` };
}
export function clinicalTimeline(notes: PatientNoteItem[], patientIdentifier: string) {
  return notes.filter(note => note.patientIdentifier === patientIdentifier).sort((a,b) => a.visitDate.localeCompare(b.visitDate) || a.createdAt - b.createdAt);
}

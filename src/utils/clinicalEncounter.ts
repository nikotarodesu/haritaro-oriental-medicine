import { CLINICAL_SIGNS, CLINICAL_PATTERNS, OBSERVATION_LABELS, type ClinicalObservations } from '@/data/clinicalWorkflow';
import type { PatientNoteItem } from '@/types/clinicalMemo';
import type { DraftPatientNote } from './draftNote';
import { examinationSummary, resolvedExaminationObservations, validClinicalExamination, type ClinicalExamination } from '@/data/clinicalExamination';

export interface ClinicalPointPlan { code: string; role: 'root' | 'branch' | 'other'; reason: string; alternative: string; }
export interface ClinicalEncounter {
  savedNoteId?: string; savedFingerprint?: string; savedAt?: number; interviewMemo?: string;
  version: 1; step: number; patientIdentifier: string; chiefComplaint: string; complaintSlug: string; visitDate: string;
  observations: ClinicalObservations; examinationMemo: string; examination?: ClinicalExamination;
  safety: 'unknown' | 'reviewed' | 'refer'; safetyMemo: string;
  candidateIds: string[]; customCandidates?: string; rationale: string; principle: string; points: ClinicalPointPlan[];
  plan: string; metric: string; before: string; after: string; functionMemo: string;
  reaction: string; nextAction: string; revision: string; previousSummary: string;
}
export const CLINICAL_ENCOUNTER_KEY = 'haritaro_clinical_encounter_v1';
export const CLINICAL_ACTIVE_OWNER_KEY = 'haritaro_clinical_active_owner_v1';
function encounterStorageKey(): string {
  const owner = sessionStorage.getItem(CLINICAL_ACTIVE_OWNER_KEY);
  return owner && owner !== 'guest' ? CLINICAL_ENCOUNTER_KEY + ':' + encodeURIComponent(owner) : CLINICAL_ENCOUNTER_KEY;
}

export function clinicalToday(): string { return new Intl.DateTimeFormat('sv-SE', { timeZone: 'Asia/Tokyo', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date()); }
export function emptyClinicalEncounter(): ClinicalEncounter {
  return { version: 1, step: 0, patientIdentifier: '', chiefComplaint: '', complaintSlug: '', visitDate: clinicalToday(), observations: {}, examinationMemo: '', safety: 'unknown', safetyMemo: '', candidateIds: [], customCandidates: '', rationale: '', principle: '', points: [], plan: '', metric: '', before: '', after: '', functionMemo: '', reaction: '', nextAction: '', revision: '', previousSummary: '' };
}
const textFields = ['patientIdentifier','chiefComplaint','complaintSlug','visitDate','examinationMemo','safetyMemo','rationale','principle','plan','metric','before','after','functionMemo','reaction','nextAction','revision','previousSummary'] as const;
export function parseClinicalEncounter(raw: unknown): ClinicalEncounter | null {
  if (!raw || typeof raw !== 'object') return null;
  const value = raw as Record<string, unknown>;
  if (value.savedNoteId !== undefined && (typeof value.savedNoteId !== 'string' || value.savedNoteId.length > 160)) return null;
  if (value.savedFingerprint !== undefined && (typeof value.savedFingerprint !== 'string' || !/^v1:\d+:[a-f0-9]{16}$/.test(value.savedFingerprint))) return null;
  if (value.savedAt !== undefined && (typeof value.savedAt !== 'number' || !Number.isFinite(value.savedAt) || value.savedAt < 0)) return null;
  if (value.interviewMemo !== undefined && (typeof value.interviewMemo !== 'string' || value.interviewMemo.length > 20000)) return null;
  if (value.customCandidates !== undefined && (typeof value.customCandidates !== 'string' || value.customCandidates.length > 2000)) return null;
  if (value.examination !== undefined && !validClinicalExamination(value.examination)) return null;
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
    const raw = sessionStorage.getItem(encounterStorageKey());
    if (!raw) return { encounter: null, error: null };
    const encounter = parseClinicalEncounter(JSON.parse(raw));
    return { encounter, error: encounter ? null : '下書きの形式を読み込めませんでした。保存済みノートから再開できます。' };
  } catch { return { encounter: null, error: '下書きを読み込めません。ブラウザの保存設定を確認してください。' }; }
}
export function writeClinicalEncounter(encounter: ClinicalEncounter): boolean {
  try { sessionStorage.setItem(encounterStorageKey(), JSON.stringify(encounter)); return true; } catch { return false; }
}
export function clearClinicalEncounter(): boolean {
  try { sessionStorage.removeItem(encounterStorageKey()); return true; } catch { return false; }
}
/** Compact display marker, not an authentication or integrity check. */
export function clinicalEncounterFingerprint(encounter: ClinicalEncounter): string {
  const value = { ...encounter, step: 0, savedNoteId: undefined, savedFingerprint: undefined, savedAt: undefined };
  const text = JSON.stringify(value);
  let first = 2166136261, second = 5381;
  for (let index = 0; index < text.length; index++) { const code = text.charCodeAt(index); first = Math.imul(first ^ code, 16777619); second = Math.imul(second, 33) ^ code; }
  return `v1:${text.length}:${(first >>> 0).toString(16).padStart(8, '0')}${(second >>> 0).toString(16).padStart(8, '0')}`;
}
export function clinicalEncounterSaveState(encounter: ClinicalEncounter): 'new' | 'saved' | 'changed' | 'unverified' {
  if (!encounter.savedNoteId) return 'new';
  if (!encounter.savedFingerprint) return 'unverified';
  return encounter.savedFingerprint === clinicalEncounterFingerprint(encounter) ? 'saved' : 'changed';
}
/** Read both catalogue choices and an optional free-form hypothesis without changing old drafts. */
export function clinicalCandidateNames(encounter: Pick<ClinicalEncounter, 'candidateIds' | 'customCandidates'>): string[] {
  const names = encounter.candidateIds.map(id => CLINICAL_PATTERNS.find(pattern => pattern.id === id)?.name).filter((name): name is string => Boolean(name));
  const custom = encounter.customCandidates?.trim();
  if (custom) names.push(custom);
  return [...new Set(names)];
}
export function clinicalEncounterDraft(encounter: ClinicalEncounter, pointNames: string[]): Omit<DraftPatientNote, 'createdAt'> {
  if (encounter.safety !== 'reviewed') { encounter = { ...encounter, points: [] }; pointNames = []; }
  const observations = resolvedExaminationObservations(encounter.observations, encounter.examination);
  const signs = CLINICAL_SIGNS.map(sign => `${sign.label}：${OBSERVATION_LABELS[observations[sign.id] || 'unknown']}`).join('\n');
  const examination = examinationSummary(encounter.examination, encounter.observations);
  const pointText = encounter.points.map((point, index) => `${pointNames[index] || point.code}（${point.code}／${point.role === 'root' ? '本治として検討' : point.role === 'branch' ? '標治として検討' : '役割を保留'}）\n採用理由：${point.reason || '未記入'}\n代替案・変更条件：${point.alternative || '未記入'}`).join('\n\n');
  return {
    sourceTool: '臨床ワークスペース', patientIdentifier: encounter.patientIdentifier, chiefComplaint: encounter.chiefComplaint, visitDate: encounter.visitDate,
    syndrome: clinicalCandidateNames(encounter).join('／'),
    selectedPointsInput: pointNames.join('、'),
    treatmentPlan: `【安全確認】\n${encounter.safety === 'refer' ? '施術を保留・医療評価を優先' : encounter.safety === 'reviewed' ? '確認した範囲で該当兆候なし（疾患の除外ではない）' : '未確認'}\n${encounter.safetyMemo}\n\n【四診所見】\n${signs}${examination ? `\n\n【四診の詳細所見】\n${examination}` : ''}\n補足：${encounter.examinationMemo || '未記入'}${encounter.interviewMemo ? `\n\n【対面問診メモ】\n${encounter.interviewMemo}` : ''}\n\n【候補の判断根拠】\n${encounter.rationale || '未記入'}\n治法：${encounter.principle || '保留'}\n\n【配穴の採用理由】\n${pointText || '保留'}\n\n【評価指標】\n指標：${encounter.metric.replaceAll('\n', ' ')}\n施術前（0〜10）：${encounter.before}\n施術直後（0〜10）：${encounter.after}\n生活動作：${encounter.functionMemo}\n\n【施術計画】\n${encounter.plan}\n\n【見立ての修正】\n${encounter.revision || '未記入'}${encounter.previousSummary ? `\n\n【前回からの申し送り】\n${encounter.previousSummary}` : ''}`,
    patientReaction: encounter.reaction, nextAction: encounter.nextAction,
  };
}
/** Preserve compatibility with existing clinical notes and their cloud schema. */
export function clinicalEncounterNote(encounter: ClinicalEncounter, pointNames: string[]): Omit<PatientNoteItem, 'id' | 'createdAt' | 'updatedAt'> {
  const safe = encounter.safety === 'refer' ? { ...encounter, points: [], principle: '施術を保留し医療評価を優先', plan: `施術は保留。${encounter.plan}` } : encounter;
  const draft = clinicalEncounterDraft(safe, pointNames);
  return { patientIdentifier: safe.patientIdentifier.trim(), chiefComplaint: safe.chiefComplaint.trim(), visitDate: safe.visitDate, syndrome: draft.syndrome, selectedPoints: safe.safety === 'reviewed' ? pointNames : [], treatmentPlan: draft.treatmentPlan, patientReaction: safe.reaction, nextAction: safe.nextAction };
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

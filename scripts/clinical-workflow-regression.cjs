/* eslint-disable @typescript-eslint/no-require-imports */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const { createDataLoader } = require('./data-loader.cjs');
const memory = new Map();
const sessionStorage = { getItem: key => memory.get(key) || null, setItem: (key,value) => memory.set(key,value), removeItem: key => memory.delete(key) };
const load = createDataLoader({ Intl, sessionStorage, window: {} });
const workflow = load('src/data/clinicalWorkflow.ts');
const encounters = load('src/utils/clinicalEncounter.ts');
const drafts = load('src/utils/draftNote.ts');
const { CURRICULUM_DATA } = load('src/data/curriculumData.ts');
const { ACUPOINTS_MASTER } = load('src/data/tsubo/acupointsMaster.ts');
const { CLINICAL_LEARNING_GUIDES, CLINICAL_REVISION_CASES } = load('src/data/clinicalLearning.ts');
const lectures = CURRICULUM_DATA.flatMap(series => series.lectures);
const lectureIds = new Set(lectures.map(lecture => lecture.id));
const codes = new Set(ACUPOINTS_MASTER.map(point => point.code));
assert.equal(workflow.CLINICAL_COMPLAINTS.length, 6);
for (const complaint of workflow.CLINICAL_COMPLAINTS) {
  assert(lectureIds.has(complaint.lectureId), complaint.lectureId);
  for (const id of complaint.patternIds) assert(workflow.CLINICAL_PATTERNS.some(pattern => pattern.id === id));
  for (const key of complaint.sourceKeys) assert(workflow.CLINICAL_SOURCES[key]);
}
for (const pattern of workflow.CLINICAL_PATTERNS) {
  assert(lectureIds.has(pattern.lectureId), pattern.lectureId);
  for (const point of pattern.points) assert(codes.has(point.code), point.code);
}
const componentFile = path.resolve(__dirname, '../src/components/clinical/ClinicalLectureApplication.tsx');
const componentExports = {};
const componentCode = ts.transpileModule(fs.readFileSync(componentFile, 'utf8'), {
  fileName: componentFile,
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
}).outputText;
vm.runInNewContext(componentCode, { exports: componentExports, require: id => {
  if (id === '@/data/clinicalLearning') return { CLINICAL_LEARNING_GUIDES };
  if (id === 'next/link') return ({ href, children, ...props }) => React.createElement('a', { href, ...props }, children);
  return require(id);
} }, { filename: componentFile });
const Application = componentExports.default;
const complaintSlugs = new Set(workflow.CLINICAL_COMPLAINTS.map(complaint => complaint.slug));
for (const lecture of lectures) {
  const guide = CLINICAL_LEARNING_GUIDES[lecture.id.replace('lecture-','').replace(/-\d+$/,'')];
  assert(guide, lecture.id + ' application guide');
  assert(complaintSlugs.has(guide.complaintSlug), lecture.id + ' published complaint route');
  const markup = renderToStaticMarkup(React.createElement(Application, { lectureId: lecture.id, takeaway: lecture.summary }));
  assert(markup.includes('aria-label="この講義を実践につなぐ"'), lecture.id + ' rendered application');
  for (const value of [guide.situation, guide.check, guide.pitfall]) assert(markup.includes(value), lecture.id + ' guide content');
  for (const href of [`/clinical/symptoms/${guide.complaintSlug}`, '/cases#revision-training', '/clinical/workspace']) assert(markup.includes(`href="${href}"`), lecture.id + ' rendered destination');
}
assert.equal(renderToStaticMarkup(React.createElement(Application, { lectureId: 'unknown', takeaway: '' })), '');
assert.equal(lectures.filter(lecture => /^lecture-(intro|zangfu|meridians)-/.test(lecture.id)).length, 13);
for (const lecture of lectures.filter(lecture => /^lecture-(intro|zangfu|meridians)-/.test(lecture.id))) {
  const markup = renderToStaticMarkup(React.createElement(Application, { lectureId: lecture.id, takeaway: lecture.summary, foundation: true }));
  assert(markup.includes('aria-label="この講義で練習すること"'), lecture.id + ' foundation exercise');
  assert(markup.includes('href="/glossary"') && markup.includes('実際の診断・施術の手順ではありません'));
  assert(!markup.includes('/clinical/') && !markup.includes('/cases'), lecture.id + ' no premature clinical call to action');
}
assert.match(CLINICAL_LEARNING_GUIDES.intro.check, /報告|仮説/);
assert.match(CLINICAL_LEARNING_GUIDES.zangfu.pitfall, /臓器/);
assert.match(CLINICAL_LEARNING_GUIDES.meridians.pitfall, /刺入/);
for (const example of CLINICAL_REVISION_CASES) {
  assert(lectureIds.has(example.lectureId));
  assert.equal(example.choices.filter(choice => choice.appropriate).length, 1);
}
const qi = workflow.CLINICAL_PATTERNS.find(pattern => pattern.id === 'spleen-qi');
const unconfirmed = workflow.compareClinicalPattern(qi, {});
assert.equal(unconfirmed.supported.length, 0);
assert.equal(unconfirmed.missing.length, 0);
assert.equal(unconfirmed.unknown.length, qi.supports.length);
const absent = workflow.compareClinicalPattern(qi, { fatigue: 'absent', loose: 'present', heat: 'present' });
assert(absent.missing.includes('fatigue'));
assert(!absent.unknown.includes('fatigue'));
assert(absent.supported.includes('loose'));
assert(absent.conflicting.includes('heat'));
let encounter = { ...encounters.emptyClinicalEncounter(), step: 4, patientIdentifier: 'TEST-001', chiefComplaint: '首の痛み', visitDate: '2026-10-04', observations: { fatigue: 'present', cold: 'absent' }, safety: 'reviewed', metric: '右回旋時の痛み', before: '6', after: '3', points: [{ code: 'LI4', role: 'branch', reason: '所見を踏まえた検討', alternative: '変化が乏しければ再評価' }], candidateIds: ['liver-qi'], revision: '再評価で仮説を見直す' };
assert(encounters.parseClinicalEncounter(encounter));
for (const broken of [{ ...encounter, version: 2 }, { ...encounter, step: 9 }, { ...encounter, before: '99' }, { ...encounter, observations: { cold: 'yes' } }, { ...encounter, points: [{}] }]) assert.equal(encounters.parseClinicalEncounter(broken), null);
assert(encounters.writeClinicalEncounter(encounter));
assert.equal(encounters.readClinicalEncounter().encounter.points[0].reason, encounter.points[0].reason);
const draft = encounters.clinicalEncounterDraft(encounter, ['合谷']);
assert.equal(encounters.clinicalEncounterDraft({ ...encounter, safety: 'refer' }, ['合谷']).selectedPointsInput, '');
assert.equal(draft.visitDate, '2026-10-04');
assert.match(draft.treatmentPlan, /冷え・温めると軽減：なし/);
assert.match(draft.treatmentPlan, /寝汗：未確認/);
assert.match(draft.treatmentPlan, /見立ての修正/);
assert(drafts.saveDraftPatientNote(draft));
assert.equal(drafts.loadAndClearDraftPatientNote().patientIdentifier, 'TEST-001');
assert.equal(drafts.loadAndClearDraftPatientNote(), null);
const note = { ...draft, id: 'n1', selectedPoints: ['合谷'], createdAt: 1, updatedAt: 1, visitDate: draft.visitDate };
const metric = encounters.readClinicalMetric(note);
assert.equal(metric.name, '右回旋時の痛み'); assert.equal(metric.before, '6'); assert.equal(metric.after, '3');
assert.equal(encounters.readClinicalMetric({ treatmentPlan: '既存の自由記述' }).before, '');
const next = encounters.clinicalFollowup(note);
assert.equal(next.patientIdentifier, 'TEST-001'); assert.equal(next.safety, 'unknown'); assert.equal(Object.keys(next.observations).length, 0); assert.equal(next.before, ''); assert.equal(next.after, ''); assert.equal(next.metric, metric.name);
const timeline = encounters.clinicalTimeline([note, { ...note, id: 'n2', visitDate: '2026-10-01' }, { ...note, id: 'n3', patientIdentifier: 'OTHER' }], 'TEST-001');
assert.equal(timeline.map(item => item.id).join(','), 'n2,n1');
memory.set(encounters.CLINICAL_ENCOUNTER_KEY, '{bad json');
assert.equal(encounters.readClinicalEncounter().encounter, null); assert(encounters.readClinicalEncounter().error);
const failing = createDataLoader({ Intl, window: {}, sessionStorage: { getItem() { throw Error('blocked'); }, setItem() { throw Error('quota'); }, removeItem() { throw Error('blocked'); } }, console: { error() {} } });
assert.equal(failing('src/utils/clinicalEncounter.ts').writeClinicalEncounter(encounter), false);
assert.equal(failing('src/utils/draftNote.ts').saveDraftPatientNote(draft), false);
console.log(`Clinical workflow passed: ${lectures.length} lecture guides, 6 complaint routes, unknown/absent/conflict, draft recovery, visit metrics, follow-up reset, timeline isolation and storage failures.`);

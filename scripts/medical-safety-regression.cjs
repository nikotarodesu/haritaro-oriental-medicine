/* eslint-disable @typescript-eslint/no-require-imports -- Offline content verification. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const { createDataLoader } = require('./data-loader.cjs');
const load = createDataLoader();
const points = load('src/data/tsubo/index');
const li4 = points.getAcupointDetail('li4');
assert.match(li4.locationSimple, /中央/);
assert.match(points.getAcupointByCode('li4').locationSimple, /中央/);
assert.match(li4.locationDetail, /第2中手骨中点/);
assert(!/効果が減弱|指を潜り込ませ|治癒に導く/.test(JSON.stringify(li4)), 'LI4 must not promise a cure or instruct deep pressure');
const seo = load('src/config/seo');
assert(!/監修|効果・押し方/.test(seo.acupointPageTitle(li4)), 'Unreviewed pages must not claim completed supervision');
for (const route of ['/safety', '/editorial-policy']) {
  assert.equal(seo.pageSocialMetadata('title', 'description', route).openGraph.url, `https://www.haritaro.jp${route}`);
}
const { getPublicCrossSectionElements, getPublicAnatomyDescription, getPublicCrossSectionModel } = load('src/data/medicalSafety');
let withheldElements = 0;
for (const point of points.ALL_ACUPOINTS) {
  const detail = points.getAcupointDetail(point.code);
  assert.equal(detail.procedureReviewStatus, 'pending_expert_review');
  assert.equal(detail.crossSection.procedureReviewStatus, 'pending_expert_review');
  assert(!/[0-9０-９]/.test(detail.crossSection.needleTrack.safeDepth), `${point.code}: fixed safe depth`);
  assert(!/[0-9０-９]/.test(detail.crossSection.needleTrack.angle), `${point.code}: fixed angle`);
  const displayed = getPublicCrossSectionElements(detail.crossSection);
  const publicModel = getPublicCrossSectionModel(detail.crossSection);
  assert(!JSON.stringify(publicModel).includes('needle-indicator'), `${point.code}: raw needle data reaches the browser`);
  assert(!JSON.stringify(publicModel).includes('depthDescription'), `${point.code}: raw depth data reaches the browser`);
  assert(publicModel.layers.every(layer => !layer.clinicalSignificance && !layer.palpationTip), `${point.code}: unreviewed procedure metadata reaches the browser`);
  assert(displayed.length > 0, `${point.code}: anatomy remains available`);
  assert(!displayed.some(element => element.layerId === 'needle-indicator'), `${point.code}: unreviewed needle path exposed`);
  assert(!displayed.some(element => /得気/.test(element.label || '')), `${point.code}: unverified stimulation target`);
  withheldElements += detail.crossSection.svgElements.length - displayed.length;
}
assert.match(getPublicAnatomyDescription({ description: '深刺時に針尖が到達し遠隔鎮痛を誘発する' }), /掲載を保留/);
assert.equal(getPublicAnatomyDescription({ description: '示指の外転を担う筋肉。' }), '示指の外転を担う筋肉。');
assert(withheldElements > 0, 'Raw needle paths are actually withheld');
const { CLINICAL_CASES, CLINICAL_CASE_SAFETY_GUIDANCE } = load('src/data/clinicalCasesData');
assert.equal(CLINICAL_CASES.length, 20);
for (const clinicalCase of CLINICAL_CASES) {
  assert(CLINICAL_CASE_SAFETY_GUIDANCE[clinicalCase.id]?.sources.length, `${clinicalCase.id}: safety evidence missing`);
  assert.match(clinicalCase.reasoningSteps[0].stepTitle, /安全|医療/);
  clinicalCase.reasoningSteps.forEach((step, index) => {
    assert.equal(step.stepNumber, index + 1, `${clinicalCase.id}: broken progression`);
    assert.equal(step.options.filter(option => option.isCorrect).length, 1);
    assert.equal(new Set(step.options.map(option => option.id)).size, step.options.length);
  });
}
const { CASE_SIMULATOR_PRESETS } = load('src/data/cases/caseSimulatorMapping');
assert.equal(Object.keys(CASE_SIMULATOR_PRESETS).length, 12, 'Only cases with recorded axes have presets');
for (const [caseId, preset] of Object.entries(CASE_SIMULATOR_PRESETS)) {
  const clinicalCase = CLINICAL_CASES.find(item => item.id === caseId);
  assert(clinicalCase, 'Stale case preset');
  assert.equal(preset.caseNumber, clinicalCase.caseNumber);
  assert.equal(preset.caseTitle, clinicalCase.title);
  assert.equal(preset.pattern, clinicalCase.correctDiagnosis.pattern);
  assert.match(preset.explanation, /学習用仮説/);
}
const quizzes = load('src/data/curriculumQuizzes').CURRICULUM_QUIZZES;
const cauda = quizzes['lecture-diagnosis-2'].questions[1];
assert.match(cauda.explanation, /直ち|医療/);
assert(!cauda.explanation.includes('数時間以内'));
const chest = quizzes['lecture-practice-7'].questions[1];
assert(!chest.question.includes('完全に防止'));
assert.match(chest.options[chest.correctIndex], /保証できない/);
assert(!quizzes['lecture-pathomechanism-6'].questions[1].options[1].includes('絶対的な熱量'));
const archive = load('src/data/cases/archiveCases');
assert.equal(archive.ALL_ARCHIVE_CASES.length, 101, 'Original audit material retained');
assert.equal(archive.PUBLIC_ARCHIVE_CASES.length, 0, 'Unverified case outcomes withheld');
const techniques = load('src/data/acupunctureTechniquesData');
assert.equal(techniques.SOURCE_ACUPUNCTURE_TECHNIQUES.length, 37);
assert.equal(techniques.ACUPUNCTURE_TECHNIQUES.length, 0, 'Unverified procedural archive withheld');
for (const file of ['src/app/library/LibraryClient.tsx', 'src/components/search/GlobalSearchModal.tsx']) {
  assert(!fs.readFileSync(file, 'utf8').includes('ALL_ARCHIVE_CASES'), 'Public consumers must use the reviewed archive');
}
console.log(`Passed: ${points.ALL_ACUPOINTS.length} anatomy models, ${withheldElements} withheld needle elements, 20 case safety flows, emergency quizzes and withheld archives.`);

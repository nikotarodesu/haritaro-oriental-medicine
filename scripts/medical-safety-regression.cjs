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
for (const route of ['/safety', '/editorial-policy', '/library', '/glossary']) {
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
const lectures = load('src/data/curriculumData').CURRICULUM_DATA.flatMap(stage => stage.lectures);
for (const id of Array.from({ length: 8 }, (_, index) => `lecture-yinyang-${index + 1}`)) {
  const lecture = lectures.find(item => item.id === id);
  assert(lecture, `${id}: learning URL must remain available`);
  assert(!/1分たりとも生きられません|極めて高度に整合|生理学的にも完全に合致|ミリ単位で/.test(JSON.stringify(lecture)), `${id}: unsupported physiology claims`);
  assert(!/深刺1\.5|1\.5〜2\.0寸|局所の実邪を瀉法で速やかに除去/.test(JSON.stringify(lecture)), `${id}: emergency response and needle depth require separate evaluation`);
  assert(lecture.references.some(ref => typeof ref === 'object' && ref.url && ref.note), `${id}: source scope missing`);
  for (const referenceId of ['classic-somon-05-yinyang', 'book-toyo-gairon']) {
    const reference = lecture.references.find(ref => typeof ref === 'object' && ref.id === referenceId);
    assert.equal(reference?.bibliographyStatus, 'unverified', `${id}: unchecked edition must be visible`);
    assert.equal(reference.claimsStatus, 'needs-review');
    assert.match(reference.note, /未完了|未確認/);
    assert(!/完全収録/.test(reference.note));
  }
  assert.equal(quizzes[id].questions.length, 3, `${id}: preserve learning progress`);
  for (const question of quizzes[id].questions) {
    assert.equal(question.options.length, 3);
    assert(question.correctIndex >= 0 && question.correctIndex < 3);
    assert(question.explanation);
  }
}
const classics = load('src/data/classicalTextsData');
for (const file of ['src/components/yinyang/YinYangTreatmentFlow.tsx', 'src/components/yinyang/YinYangShishinChart.tsx']) {
  assert(!/深刺1\.5|1\.5〜2\.0寸|持続的な代謝回復/.test(fs.readFileSync(file, 'utf8')), `${file}: no unverified needle procedure or effect`);
}
assert.equal(classics.SOURCE_CLASSICAL_TEXTS.length, 24);
assert.equal(classics.CLASSICAL_TEXTS.length, 24);
const quotationIds = ['classic-somon-01', 'classic-somon-02', 'classic-somon-05', 'classic-somon-05-clear', 'classic-somon-12', 'classic-somon-29', 'classic-somon-74', 'classic-somon-62', 'classic-reisu-01', 'classic-reisu-08', 'classic-reisu-10', 'classic-reisu-07', 'classic-reisu-66', 'classic-nankyo-68', 'classic-nankyo-69', 'classic-nankyo-75', 'classic-nankyo-77', 'classic-shokan-taiyo', 'classic-shokan-yomei', 'classic-shokan-shoyo', 'classic-taisei-shisou', 'classic-taisei-hachimyaku', 'classic-taisei-shougyoku', 'classic-kinki-01'];
assert.equal(classics.CLASSICAL_TEXTS.filter(item => item.verifiedQuotation).length, quotationIds.length);
for (const id of quotationIds) {
  const published = classics.CLASSICAL_TEXTS.find(item => item.id === id);
  const quote = published?.verifiedQuotation;
  assert(quote?.text && quote.sourceTitle && quote.section, `${id}: quotation needs its actual source and passage`);
  assert.match(quote.sourceUrl, /^https:\/\//);
  assert.equal(quote.verificationScope, 'electronic_text', `${id}: do not claim image or all-edition verification`);
  assert.match(quote.limitation, /未確認|未完了/);
  assert.match(quote.checkedAt, /^\d{4}-\d{2}-\d{2}$/);
  assert.equal(published.originalPublicationStatus, 'withheld_pending_verification');
}
assert.match(classics.CLASSICAL_TEXTS.find(item => item.id === 'classic-somon-29').verifiedQuotation.text, /四支皆稟氣於胃/);
assert.match(classics.CLASSICAL_TEXTS.find(item => item.id === 'classic-somon-05-clear').verifiedQuotation.text, /清陽發腠理/);
assert.match(classics.CLASSICAL_TEXTS.find(item => item.id === 'classic-somon-74').verifiedQuotation.text, /諸熱瞀瘛，皆屬於火。/);
assert(!classics.CLASSICAL_TEXTS.find(item => item.id === 'classic-somon-74').verifiedQuotation.text.includes('火（心）'), 'Do not insert interpretation into a quotation');
assert.match(classics.CLASSICAL_TEXTS.find(item => item.id === 'classic-reisu-66').verifiedQuotation.text, /不得虛邪，不能獨傷人/);
assert.equal(classics.CLASSICAL_TEXTS.find(item => item.id === 'classic-shokan-shoyo').verifiedQuotation.text, '少陽之為病，口苦，咽乾，目眩也。', 'Do not append a different Taiyang passage to Shaoyang');
assert.match(classics.CLASSICAL_TEXTS.find(item => item.id === 'classic-kinki-01').verifiedQuotation.text, /病由都盡/);
assert.deepEqual(Array.from(classics.CLASSICAL_TEXTS.find(item => item.id === 'classic-taisei-shougyoku').relatedPoints), ['GV20', 'CV13']);
for (const source of classics.SOURCE_CLASSICAL_TEXTS) {
  const published = classics.CLASSICAL_TEXTS.find(item => item.id === source.id);
  assert(published, `${source.id}: preserve learning links`);
  if (source.originalPublicationStatus === 'withheld_pending_verification') {
    assert(source.original, `${source.id}: original audit material retained`);
    assert.equal(published.original, '', `${source.id}: unverified quotation withheld`);
    assert(!published.reading, `${source.id}: unverified reading withheld`);
    assert(published.verificationNote && published.comparisonSourceUrl);
  } else {
    assert.equal(published.original, source.original);
  }
  assert(!/奇跡的な効果|全疾患が治る|栄養供給を再建|最重要である根拠|現代臨床でもそのまま第一選択/.test(published.translation + published.clinicalApplication), `${source.id}: ancient text is not proof of modern clinical efficacy`);
}
const { VERIFIED_PAPERS } = load('src/data/references/papersData');
assert.equal(VERIFIED_PAPERS.length, 32);
assert.equal(VERIFIED_PAPERS.filter(paper => paper.claimsStatus === 'source-checked').length, 31);
for (const paper of VERIFIED_PAPERS.filter(paper => paper.claimsStatus === 'source-checked')) {
  assert.match(paper.sourceUrl, /^https:\/\//, `${paper.id}: checked source URL missing`);
  assert.match(paper.claimsCheckedAt, /^\d{4}-\d{2}-\d{2}$/, `${paper.id}: interpretation date missing`);
  assert(['abstract', 'selected_full_text'].includes(paper.verificationScope), `${paper.id}: unsupported review scope`);
  assert(paper.sourceLocator && paper.keyFindings.length && paper.clinicalTakeaways.length, `${paper.id}: result and limitation must travel together`);
  assert.equal(paper.interventionProtocol, undefined, `${paper.id}: a bounded source check cannot release procedural instructions`);
}
const paperById = id => VERIFIED_PAPERS.find(paper => paper.id === id);
assert.match(paperById('rct-insomnia-heart-liver-2025').keyFindings.join(' '), /群間差は有意ではありません/);
assert.equal(paperById('chronic-insomnia-disorder-meta-tsa-yu-2025').sampleSize, undefined, 'Conflicting 757/847 participant totals must remain withheld');
assert.match(paperById('chronic-insomnia-disorder-meta-tsa-yu-2025').clinicalTakeaways.join(' '), /757.*847/);
assert.equal(paperById('body-weight-control-electroacupuncture-auricular-protocol-zhong-2016').sampleSize, undefined, 'Planned trial enrollment is not a completed patient sample');
assert.match(paperById('body-weight-control-electroacupuncture-auricular-protocol-zhong-2016').studyDesign, /計画書/);
assert.match(paperById('cfs-acupuncture-moxibustion-hrv-li-2025').clinicalTakeaways.join(' '), /不一致/);
assert.equal(paperById('katakori-needling-depth-rct-osaki-2018').claimsStatus, 'needs-review');
assert.match(paperById('katakori-needling-depth-rct-osaki-2018').primaryOutcomes, /PDFを取得できなかった/);
const pairs = load('src/types/clinicalMemo').CLASSIC_CLINICAL_PAIRS;
assert.equal(pairs.length, 8);
for (const pair of pairs) {
  assert(!/特効配穴|根本治療に必須|リセットします|迷走神経反射を強力に抑制|根底から解消|即効処方/.test(pair.summary + pair.mechanism), `${pair.id}: unverified clinical promise`);
  assert(pair.points.length >= 2);
}
const cauda = quizzes['lecture-diagnosis-2'].questions[1];
assert.match(cauda.explanation, /直ち|医療/);
assert(!cauda.explanation.includes('数時間以内'));
const chest = quizzes['lecture-practice-7'].questions[1];
assert(!chest.question.includes('完全に防止'));
assert.match(chest.options[chest.correctIndex], /局所解剖.*体格.*体位/);
assert.match(chest.explanation, /骨度分寸.*取穴位置.*安全な深度.*ではありません/, 'position units cannot establish a safe needling depth');
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

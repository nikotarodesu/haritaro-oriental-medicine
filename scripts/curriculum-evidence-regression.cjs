/* eslint-disable @typescript-eslint/no-require-imports -- Offline source and rendering audit. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const { createDataLoader } = require('./data-loader.cjs');
const load = createDataLoader();
const { CURRICULUM_DATA } = load('src/data/curriculumData');
const { resolveArticleReferences } = load('src/utils/referenceResolver');
const { SOURCE_VERIFICATION_DATE, SOURCE_VERIFICATION_UPDATES, VERIFIED_POINT_LOCATIONS, applySourceVerification } = load('src/data/sourceVerification');
const { CROSS_SECTIONS } = load('src/data/tsubo/crossSectionsData');
const { DETAILED_ACUPOINTS } = load('src/data/tsubo/detailedPoints');

// The additional source check is intentionally limited to these acquired-PDF scopes.
const checkedReferenceIds = [
  'who-tcm-terminologies-2022-yinyang', 'who-wuxing-terms-2022',
  'who-tcm-terminology-2022', 'who-tcm-terminologies-2022',
  'foundation-zangfu-overview', 'foundation-lung-heart-terms',
  'foundation-spleen-stomach-terms', 'foundation-liver-kidney-terms',
  'foundation-fu-pairing-terms', 'path-onset-who-terms-2022',
  'path-qi-who-terms-2022', 'path-blood-who-terms-2022',
  'foundation-who-point-location-2008', 'who-acupuncture-point-locations-2008',
];
const terminologyPdf = 'https://iris.who.int/server/api/core/bitstreams/02be07cf-ef55-4ae2-9184-ded49210aa05/content';
const pointLocationsPdf = 'https://iris.who.int/server/api/core/bitstreams/d98c1c98-3fbf-4e4e-8c9a-1bbe72ccd00e/content';
assert.equal(SOURCE_VERIFICATION_DATE, '2026-10-15');
assert.deepEqual(Object.keys(SOURCE_VERIFICATION_UPDATES).sort(), checkedReferenceIds.sort(), 'no unreviewed references inherit the new source check');
for (const id of checkedReferenceIds) {
  const update = SOURCE_VERIFICATION_UPDATES[id];
  const pointSource = id.endsWith('location-2008') || id.endsWith('locations-2008');
  assert.equal(update.url, pointSource ? pointLocationsPdf : terminologyPdf, `${id}: the acquired primary PDF`);
  assert.equal(update.sourceCheckedAt, '2026-10-15');
  assert.equal(update.bibliographyStatus, 'matched');
  assert.equal(update.claimsStatus, 'source-checked');
  assert(/p{1,2}\.\d/.test(update.note), `${id}: a concrete printed-page locator`);
  assert(pointSource ? /照合対象に含みません|全経穴の個別照合/.test(update.note) : update.note.includes('講義全体の監修'), `${id}: bounded verification scope`);
  assert(!/全文を検証済|全経穴を確認済|PDF.*未取得|PDF.*取得でき/.test(update.note), `${id}: no stale acquisition gap or blanket approval`);
  const [resolved] = resolveArticleReferences([{ id, title: '保持するタイトル', source: 'WHO', authors: '保持する著者', note: '旧確認範囲' }]);
  assert.equal(resolved.title, '保持するタイトル');
  assert.equal(resolved.authors, '保持する著者');
  assert.equal(resolved.note, update.note, `${id}: the public resolver applies the scoped update`);
  assert.equal(resolved.url, update.url);
}
const uncheckedReference = { id: 'unreviewed-book', title: '未照合', source: '旧教材', url: 'https://example.org/unreviewed', claimsStatus: 'needs-review', sourceCheckedAt: '2026-10-01', note: '未照合の範囲を保持' };
assert.equal(applySourceVerification(uncheckedReference), uncheckedReference, 'unknown source identity and metadata are unchanged');
assert.deepEqual(Object.keys(VERIFIED_POINT_LOCATIONS), ['li4'], 'location verification does not spread to unreviewed points');
const verifiedLi4 = VERIFIED_POINT_LOCATIONS.li4;
assert.equal(verifiedLi4.sourceCheckedAt, '2026-10-15');
assert.equal(verifiedLi4.sourcePage, 'p.35（PDF 44ページ目）');
assert.equal(verifiedLi4.sourceUrl, `${pointLocationsPdf}#page=44`);
assert.equal(verifiedLi4.standardLocation, '手背、第2中手骨中点の橈側（親指側）。');
assert(DETAILED_ACUPOINTS.li4.locationDetail.startsWith(verifiedLi4.standardLocation), 'the visible LI4 location matches the checked definition');
assert(verifiedLi4.note.includes('体表上の標準位置') && verifiedLi4.note.includes('針路・深度') && verifiedLi4.note.includes('確認対象に含みません'), 'location confirmation does not endorse a procedure');
for (const model of Object.values(CROSS_SECTIONS)) {
  assert.equal(model.procedureReviewStatus, 'pending_expert_review', `${model.id}: anatomy/procedure review remains pending`);
}
assert.equal(CROSS_SECTIONS.li4.referenceLedger.find(reference => reference.id === 'who-2008-li4').confirmationStatus, 'pending_source_review', 'the separate model ledger has not been approved by the body-surface check');
const file = path.resolve(__dirname, '../src/components/ArticleReferences.tsx');
const exportsObject = {};
vm.runInNewContext(ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } }).outputText, {
  exports: exportsObject,
  require: id => id === 'next/link' ? ({ href, children, ...props }) => React.createElement('a', { href, ...props }, children) : require(id),
});
const ArticleReferences = exportsObject.default;
const lectures = CURRICULUM_DATA.flatMap(stage => stage.lectures);
assert.equal(lectures.length, 94);
let references = 0;
let legacyUnverified = 0;
for (const lecture of lectures) {
  const refs = resolveArticleReferences(lecture.references, lecture.contentMarkdown);
  assert(refs.length > 0, `${lecture.id}: sources section is available`);
  assert(lecture.evidenceScope.includes('講義全体の検証・専門家監修を意味しません'), `${lecture.id}: actual scope, not implied certification`);
  const html = renderToStaticMarkup(React.createElement(ArticleReferences, { references: refs, scopeNote: lecture.evidenceScope }));
  assert(html.includes('id="article-references-section"'));
  assert(html.includes('data-reference-scope'));
  assert(html.includes(lecture.evidenceScope));
  for (const ref of refs) {
    references += 1;
    assert(ref.bibliographyStatus && ref.claimsStatus, `${lecture.id}/${ref.id}: no unlabelled provenance`);
    if (ref.claimsStatus === 'source-checked') assert(/^\d{4}-\d{2}-\d{2}$/.test(ref.sourceCheckedAt), `${ref.id}: source-check date`);
    if (['classic-reisu-30-jueqi', 'book-kiketsusui-standard'].includes(ref.id)) {
      legacyUnverified += 1;
      assert.equal(ref.bibliographyStatus, 'unverified');
      assert.equal(ref.claimsStatus, 'needs-review');
      assert(!ref.amazonUrl && !ref.amazonSearchUrl, 'unverified books/classics are not promoted as purchases');
      if (ref.id === 'book-kiketsusui-standard') assert(!ref.authors && !ref.year && !ref.asin, 'unsupported old publication details removed');
    }
    if (ref.id === 'who-tcm-terminology-publisher-overview') {
      assert(ref.note.includes('PDF本文の個別の定義は未照合'));
      assert(html.includes(ref.note));
    }
  }
}
assert.equal(legacyUnverified, 14, 'all repeated unverified classic/book references are covered');
for (const type of ['paper', 'classic', 'book', 'guideline', undefined]) {
  const [ref] = resolveArticleReferences([{ id: 'unknown-' + type, type, title: '未照合の資料', source: '旧教材' }]);
  assert.equal(ref.bibliographyStatus, 'unverified');
  assert.equal(ref.claimsStatus, 'needs-review');
}
const final = lectures.find(lecture => lecture.id === 'lecture-practice-12');
assert(final.contentMarkdown.includes('自分で振り返る6つの観点'));
assert(final.contentMarkdown.includes('記述課題を自動採点したり、6つの能力を認定したりするものではありません'));
assert(!final.contentMarkdown.includes('以下の6つの能力が総合的に評価されます'));
assert(final.keyPoints.some(point => point.includes('受講済みの記録') && point.includes('自動採点')));
console.log(`Passed: 14 acquired-PDF reference scopes and the LI4 surface location are dated and bounded; procedure review remains pending; all 94 lectures render sources and scope, ${references} references have provenance labels, 14 legacy references remain explicitly unverified, and final-lesson claims match actual assessment.`);

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
console.log(`Passed: all 94 lectures render sources and scope, ${references} references have provenance labels, 14 legacy references remain explicitly unverified, and final-lesson claims match actual assessment.`);

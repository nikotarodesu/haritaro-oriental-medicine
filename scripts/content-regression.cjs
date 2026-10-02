const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const cache = new Map();
function load(relative) {
  if (relative.endsWith('.json')) return JSON.parse(fs.readFileSync(path.resolve(root, relative), 'utf8'));
  const file = path.resolve(root, relative.endsWith('.ts') ? relative : relative + '.ts');
  if (cache.has(file)) return cache.get(file);
  const exports = {};
  cache.set(file, exports);
  const js = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true } }).outputText;
  const localRequire = id => id.startsWith('@/') ? load('src/' + id.slice(2)) : id.startsWith('.') ? load(path.resolve(path.dirname(file), id)) : require(id);
  vm.runInNewContext(js, { exports, require: localRequire, process, URL, console }, { filename: file });
  return exports;
}
const { ARTICLES } = load('src/data/articleData');
const { PAPERS_DATABASE, VERIFIED_PAPERS } = load('src/data/references/papersData');
const { resolveArticleReferences } = load('src/utils/referenceResolver');
const { parseMarkdownBlocks } = load('src/utils/markdownParser');
const { sanitizeAnalyticsParams } = load('src/utils/analytics');
for (const article of ARTICLES) {
  const refs = resolveArticleReferences(article.references, article.contentMarkdown);
  for (const ref of article.references || []) {
    if (typeof ref === 'string') assert(PAPERS_DATABASE.some(p => p.id === ref || p.pmid === ref), `${article.id}: unknown paper ${ref}`);
  }
  const ids = new Set(refs.map(ref => ref.id));
  for (const match of article.contentMarkdown.matchAll(/\[\^([^\]]+)\]/g)) {
    assert(ids.has(match[1]), `${article.id}: missing citation ${match[1]}`);
    assert(!refs.find(ref => ref.id === match[1])?.title.match(/^\d+$/), `${article.id}: unresolved numeric citation`);
  }
  assert(!article.updatedAt || article.updatedAt >= article.publishedAt, `${article.id}: invalid dates`);
  assert(parseMarkdownBlocks(article.contentMarkdown).some(block => block.type === 'h2'), `${article.id}: no table of contents`);
}
const safe = sanitizeAnalyticsParams({context_pair:'qixueshui', placement:'global_search', result_type:'article', query:'private', note_text:'private', patient_name:'private', primary_type:'private', unknown:'private', total:NaN});
assert.equal(safe.context_pair,'qixueshui');
assert.equal(Object.keys(safe).length,3);
assert.equal(Object.keys(sanitizeAnalyticsParams({placement:'email@example.com', lecture_id:'<script>', total:Infinity})).length,0);
const yuan = PAPERS_DATABASE.find(p => p.id === 'meta-musculoskeletal-pain-yuan-2016');
assert.equal(yuan.pmid,'27471137');
assert.equal(yuan.bibliographyStatus,'matched');
assert(yuan.doi?.startsWith('10.'), 'Verified publication has a DOI');
assert.equal(yuan.pmcid,undefined, 'Unchecked full-text identifiers are withheld');
for (const paper of VERIFIED_PAPERS) {
  assert.equal(paper.bibliographyStatus, 'matched');
  assert.notEqual(paper.claimsStatus, 'do-not-use');
  if (paper.claimsStatus !== 'source-checked') {
    assert.equal(paper.sampleSize, undefined, 'Unverified participant counts withheld');
    assert.equal(paper.interventionProtocol, undefined, 'Unverified treatment instructions withheld');
    assert.equal(paper.keyFindings.length, 0, 'Unverified effect claims withheld');
  }
}
const withdrawn = PAPERS_DATABASE.filter(paper => paper.bibliographyStatus === 'retracted');
assert(withdrawn.length > 0, 'Withdrawal audit fixture exists');
assert(withdrawn.every(paper => !VERIFIED_PAPERS.includes(paper)), 'Withdrawn studies excluded from public research list');
console.log(`Passed: ${ARTICLES.length} articles, citations, dates, headings and analytics privacy regression checks.`);

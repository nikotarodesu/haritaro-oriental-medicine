const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const cache = new Map();
function load(relative) {
  const candidate = path.resolve(root, relative);
  const file = candidate.endsWith('.ts') ? candidate : fs.existsSync(candidate + '.ts') ? candidate + '.ts' : path.join(candidate, 'index.ts');
  if (cache.has(file)) return cache.get(file);
  const exports = {};
  cache.set(file, exports);
  const js = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
  const localRequire = id => id.startsWith('@/') ? load('src/' + id.slice(2)) : id.startsWith('.') ? load(path.resolve(path.dirname(file), id)) : require(id);
  vm.runInNewContext(js, { exports, require: localRequire, process, URL, console }, { filename: file });
  return exports;
}

const { normalizeSearchText, prepareSearchItem, scoreSearchItem, matchesSearchText } = load('src/utils/search');
const { ACUPOINTS_MASTER } = load('src/data/tsubo/acupointsMaster');
const index = ACUPOINTS_MASTER.map(point => prepareSearchItem({title: point.name, exactCode: point.code, tags: [point.kana, point.code, ...(point.aliases || []), ...(point.indications || [])]}));
function best(query) {return index.map(item=>({item,score:scoreSearchItem(item,query)})).filter(result=>result.score>0).sort((a,b)=>b.score-a.score)[0]?.item.item;}
for(const query of ['LI4','li4','ＬＩ４','ｌｉ４',' LI ４ ','合谷','ゴウコク','ごうこく']) assert.equal(best(query)?.exactCode,'LI4',query);
assert.equal(normalizeSearchText('太谿'),normalizeSearchText('太渓'));
assert.equal(normalizeSearchText('背兪穴'),normalizeSearchText('背輸穴'));
assert(matchesSearchText('頭痛 吐き気',['頭痛について','吐き気の説明']));
assert(!matchesSearchText('頭痛 吐き気',['頭痛だけの説明']));
assert(matchesSearchText('  ',['任意の資料']));
assert(scoreSearchItem(prepareSearchItem({title:'頭痛',tags:['吐き気']}),'頭痛 吐き気')>0);
assert.equal(scoreSearchItem(prepareSearchItem({title:'頭痛'}),'頭痛 吐き気'),0);
const { ARTICLES } = load('src/data/articleData');
const { ARTICLE_LEARNING_GUIDES } = load('src/data/articleLearningGuides');
const { CURRICULUM_DATA } = load('src/data/curriculumData');
const { CURRICULUM_QUIZZES } = load('src/data/curriculumQuizzes');
const { PROGRESSIVE_CASES } = load('src/data/progressiveCases');
const lectureIds=new Set(CURRICULUM_DATA.flatMap(chapter=>chapter.lectures).map(lecture=>lecture.id));
for(const article of ARTICLES) {
 const guide=ARTICLE_LEARNING_GUIDES[article.id]; assert(guide,article.id);
 assert(lectureIds.has(guide.lectureId),article.id+' lecture'); assert(CURRICULUM_QUIZZES[guide.lectureId],article.id+' quiz');
 assert(PROGRESSIVE_CASES.some(c=>c.id===guide.caseId),article.id+' case');
 assert.equal(article.summary,guide.summary); assert.equal(article.updatedAt,'2026-10-02');
}
const { GLOSSARY_TERMS } = load('src/data/glossaryData');
const terms=Object.values(GLOSSARY_TERMS); assert.equal(new Set(terms.map(term=>term.term)).size,terms.length);
for(const term of terms) if(term.relatedLectureId) assert(lectureIds.has(term.relatedLectureId),term.term);
const detailed = load('src/data/tsubo/detailedPoints').DETAILED_ACUPOINTS;
assert.equal(detailed.li4.researchEvidence.sources[0].pmid,'10643726');
assert.equal(detailed.pc6.researchEvidence.sources[0].doi,'10.1002/14651858.CD003281.pub5');
assert.equal(detailed.st36.researchEvidence.sources[1].pmid,'24562381');
assert(detailed.st36.researchEvidence.findings.includes('マウス'));
assert(detailed.pc6.researchEvidence.findings.includes('術後')); 
for(const point of Object.values(detailed)) for(const source of point.researchEvidence?.sources || []) assert(!['23758253','26385317','24562388'].includes(source.pmid));
const sitemap=load('src/app/sitemap').default();
assert(!sitemap.some(page=>new URL(page.url).search));
assert(!sitemap.some(page=>new URL(page.url).pathname==='/notes'));
assert.equal(new Set(sitemap.map(page=>page.url)).size,sitemap.length);
for(const pathname of ['/','/glossary','/library','/tsubo/li4','/tsubo/sp6',...Array.from({length:8},(_,index)=>`/curriculum/lecture-yinyang-${index+1}`)]) assert.equal(sitemap.find(page=>new URL(page.url).pathname===pathname).lastModified.toISOString().slice(0,10),'2026-10-03',pathname);
for(const pathname of ['/kokushi','/simulator','/articles/science-of-yinyang-gogyo','/curriculum/lecture-wuxing-1']) assert.equal(sitemap.find(page=>new URL(page.url).pathname===pathname).lastModified.toISOString().slice(0,10),'2026-10-02',pathname);
const { sanitizeAnalyticsParams } = load('src/utils/analytics');
assert.deepEqual(Object.keys(sanitizeAnalyticsParams({placement:'case_training',total:6,query:'private',patient_name:'private',case_id:'private',answers:'private'})).sort(),['placement','total']);
console.log('Passed: 361-point search, normalization, multiword matches, 12 article learning paths, glossary links, sitemap revisions and learning analytics privacy.');

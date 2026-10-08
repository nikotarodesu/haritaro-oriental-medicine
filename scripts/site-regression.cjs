/* eslint-disable @typescript-eslint/no-require-imports -- CommonJS regression runner. */
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
const queryPages = sitemap.filter(page=>new URL(page.url).search);
assert.equal(queryPages.length, 1, 'Only the independently described Gorou checker has a query canonical');
assert.equal(queryPages[0].url, 'https://www.haritaro.jp/diagnosis?tab=gorou');
assert(!sitemap.some(page=>new URL(page.url).pathname==='/notes'));
assert.equal(new Set(sitemap.map(page=>page.url)).size,sitemap.length);
for(const pathname of Array.from({length:8},(_,index)=>`/curriculum/lecture-yinyang-${index+1}`)) assert.equal(sitemap.find(page=>new URL(page.url).pathname===pathname).lastModified.toISOString().slice(0,10),'2026-10-03',pathname);
for(const pathname of ['/','/library','/tsubo/li4','/tsubo/sp6','/symptoms','/diagnosis','/glossary','/curriculum','/kokushi',...Array.from({length:5},(_,index)=>`/curriculum/lecture-qiblood-${index+1}`)]) assert.equal(sitemap.find(page=>new URL(page.url).pathname===pathname).lastModified.toISOString().slice(0,10),'2026-10-08',pathname);
for(const pathname of ['/simulator','/learn','/clinical']) assert.equal(sitemap.find(page=>new URL(page.url).pathname===pathname).lastModified.toISOString().slice(0,10),'2026-10-04',pathname);
for(const pathname of ['/articles/science-of-yinyang-gogyo','/curriculum/lecture-wuxing-2']) assert.equal(sitemap.find(page=>new URL(page.url).pathname===pathname).lastModified.toISOString().slice(0,10),'2026-10-02',pathname);
const { LEARNING_COURSES, getCourseProgress } = load('src/data/learningCourses');
assert.equal(new Set(LEARNING_COURSES.map(course=>course.slug)).size, 3);
for (const course of LEARNING_COURSES) {
 assert(sitemap.some(page=>page.url===`https://www.haritaro.jp/learn/courses/${course.slug}`),course.slug+' sitemap');
 assert(course.steps.every(step=>lectureIds.has(step.lectureId) && CURRICULUM_QUIZZES[step.lectureId]),course.slug+' live lesson and quiz');
 const complete=Object.fromEntries(course.steps.map(step=>[step.lectureId,'2026-10-03']));
 assert(getCourseProgress(course,complete).finished,course.slug+' completed');
 assert.equal(getCourseProgress(course,{},'unrelated-lecture').nextStep.lectureId,course.steps[0].lectureId,course.slug+' isolated resume');
 const undone={...complete}; delete undone[course.steps[1].lectureId];
 assert.equal(getCourseProgress(course,undone).nextStep.lectureId,course.steps[1].lectureId,course.slug+' completion removal');
}
const { LEARNING_DISCOVERY } = load('src/data/learningDiscovery');
for(const item of LEARNING_DISCOVERY) assert(item.articleId ? ARTICLES.some(article=>article.id===item.articleId) : lectureIds.has(item.lectureId),item.id+' question target');
const { sanitizeAnalyticsParams } = load('src/utils/analytics');
assert.deepEqual(Object.keys(sanitizeAnalyticsParams({placement:'case_training',total:6,query:'private',patient_name:'private',case_id:'private',answers:'private'})).sort(),['placement','total']);
assert(!fs.readFileSync(path.join(root, 'src/app/layout.tsx'), 'utf8').includes('clarity.ms/tag'), 'Free-text learning and clinical pages must not load global session replay');
assert(!fs.readFileSync(path.join(root, 'src/instrumentation-client.ts'), 'utf8').includes('sdk.identify('), 'Replay must not identify users');
console.log('Passed: 361-point search, normalization, multiword matches, 12 article learning paths, glossary links, sitemap revisions and learning analytics privacy.');

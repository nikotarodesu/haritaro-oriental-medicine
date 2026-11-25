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
const additionalResearchArticles = new Set(['science-of-pulse-diagnosis', 'science-of-abdominal-diagnosis', 'science-of-tongue-diagnosis', 'science-of-kampo-network-pharmacology', 'east-west-integrative-gerd-gastric']);
const updatedArticleComparisons = new Set(['science-of-yinyang-gogyo', 'science-of-pulse-diagnosis']);
for(const article of ARTICLES) {
 const guide=ARTICLE_LEARNING_GUIDES[article.id]; assert(guide,article.id);
 assert(lectureIds.has(guide.lectureId),article.id+' lecture'); assert(CURRICULUM_QUIZZES[guide.lectureId],article.id+' quiz');
 assert(PROGRESSIVE_CASES.some(c=>c.id===guide.caseId),article.id+' case');
 assert.equal(article.summary,guide.summary);
 assert.equal(article.updatedAt, updatedArticleComparisons.has(article.id) ? '2026-11-24' : additionalResearchArticles.has(article.id) ? '2026-11-23' : '2026-11-20', article.id);
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
assert.equal(queryPages[0].lastModified.toISOString().slice(0,10), '2026-11-24', 'Gorou has its own publication revision date');
assert(!sitemap.some(page=>new URL(page.url).pathname==='/notes'));
assert.equal(new Set(sitemap.map(page=>page.url)).size,sitemap.length);
const { PUBLIC_VISUALS_REVISED_AT, CURRICULUM_EDITORIAL_REVISIONS, READABILITY_EDITORIAL_REVISIONS, NATURAL_JAPANESE_EDITORIAL_REVISIONS } = load('src/config/contentUpdates');
assert.equal(CURRICULUM_EDITORIAL_REVISIONS.length, 55);
assert.equal(new Set(CURRICULUM_EDITORIAL_REVISIONS).size, 55);
assert.equal(READABILITY_EDITORIAL_REVISIONS.length, 43);
assert.equal(new Set(READABILITY_EDITORIAL_REVISIONS).size, 43);
for(const lectureId of READABILITY_EDITORIAL_REVISIONS) assert(lectureIds.has(lectureId), lectureId);
assert.equal(NATURAL_JAPANESE_EDITORIAL_REVISIONS.length, 93);
assert.equal(new Set(NATURAL_JAPANESE_EDITORIAL_REVISIONS).size, 93);
for(const lectureId of NATURAL_JAPANESE_EDITORIAL_REVISIONS) assert(lectureIds.has(lectureId), lectureId);
const dateAt = pathname => sitemap.find(page=>new URL(page.url).pathname===pathname)?.lastModified.toISOString().slice(0,10);
const { getPublicLectureSeries } = load('src/data/publicLectures/index');
const { READING_LECTURES_REVISED_AT, readingUnits } = load('src/data/publicLectures/readingUnits');
for (const lectureId of lectureIds) {
  const date = dateAt(`/curriculum/${lectureId}`);
  const expected = lectureId === 'lecture-treatment-9' ? '2026-11-23' : '2026-11-20';
  assert.equal(date, getPublicLectureSeries(lectureId) === 'reading' ? undefined : expected, lectureId);
}
const revisedLecturePaths = {
  '/learn/lectures/body-functions': '2026-11-24',
  '/learn/lectures/meridians-and-points': '2026-11-24',
  '/learn/lectures/reading-evidence': '2026-11-25',
};
for (const unit of readingUnits) assert.equal(dateAt(unit.href), revisedLecturePaths[unit.href] ?? READING_LECTURES_REVISED_AT, unit.href);
for (const pathname of ['/tsubo/sp11','/tsubo/bl57']) {
  assert.equal(dateAt(pathname), PUBLIC_VISUALS_REVISED_AT, pathname + ' shows the shared acupoint release date');
}
const { CLASSIFIED_ACUPOINT_CODES, KEY_POINT_TYPES_GUIDE } = load('src/data/tsubo/keyPointTypes');
const { EXTRA_POINTS, EXTRA_POINTS_PATH, EXTRA_POINTS_REVISED_AT } = load('src/data/tsubo/extraPoints');
const searchRevised = new Set(['/tsubo', '/tsubo/li10', '/tsubo/st37', '/tsubo/lu7', KEY_POINT_TYPES_GUIDE, '/symptoms/constipation-ibs', '/symptoms/headache-stiff-neck']);
const pairRevised = new Set(['li4', 'li10', 'li11', 'st36', 'lr3', 'pc6', 'sp4'].map(code => `/tsubo/${code}`));
for (const pathname of ['/updates', KEY_POINT_TYPES_GUIDE,
  ...[...CLASSIFIED_ACUPOINT_CODES, 'st35', 'st36', 'st38', 'st41'].map(code => `/tsubo/${code}`),
].filter(pathname => !searchRevised.has(pathname) && !pairRevised.has(pathname))) assert.equal(dateAt(pathname), '2026-11-24', pathname + ' includes the atlas update');
for (const pathname of searchRevised) {
  assert.equal(dateAt(pathname), '2026-11-25', pathname + ' reflects its search and navigation revisions');
}
for (const pathname of pairRevised) {
  assert.equal(dateAt(pathname), '2026-11-25', pathname + ' reflects its new pairing guide');
}
for (const pathname of [EXTRA_POINTS_PATH, ...EXTRA_POINTS.map(point => point.href)]) {
  assert.equal(dateAt(pathname), EXTRA_POINTS_REVISED_AT, pathname + ' has its own sitemap entry');
}
assert.equal(dateAt('/curriculum'),'2026-11-18');
for(const pathname of ['/','/about','/articles','/cases','/glossary','/learn/review','/symptoms']) assert.equal(dateAt(pathname),'2026-11-20',pathname);
for (const pathname of ['/learn','/learn/essentials']) assert.equal(dateAt(pathname), '2026-11-24', pathname);
for (const pathname of ['/diagnosis', '/clinical/symptoms/headache', '/learn/acupuncture', '/learn/acupuncture/research']) assert.equal(dateAt(pathname), '2026-11-23', pathname);
for (const pathname of [
  '/clinical', '/simulator', '/safety', '/practice/haiketsu', '/tsubo/compare', '/kikei', '/library',
  '/tsubo/cv21', '/tsubo/sp6', '/symptoms/dizziness-tinnitus',
  '/symptoms/knee-joint-pain', '/cases/case-01-headache-liver-fire',
]) assert.equal(dateAt(pathname), PUBLIC_VISUALS_REVISED_AT, pathname);
const { ACUPUNCTURE_RESEARCH, acupunctureResearchHref } = load('src/config/acupunctureLearning');
const { ACUPUNCTURE_RESEARCH_ARTICLES } = load('src/data/acupunctureResearch');
for (const article of ACUPUNCTURE_RESEARCH_ARTICLES) {
  const route = acupunctureResearchHref(article.slug);
  const knownSources = new Set(article.sources.map(source => source.id));
  const revisedSources = ['migraine-prevention', 'postoperative-nausea'].includes(article.slug);
  assert.equal(dateAt(route), revisedSources ? '2026-11-25' : ACUPUNCTURE_RESEARCH.revisedAt, route + ' sitemap revision');
  assert.equal(knownSources.size, article.sources.length, route + ' source IDs are unique');
  assert(article.sources.every(source => new URL(source.url).protocol === 'https:' && source.scope), route + ' direct sources and their scope');
  assert(article.sections.every(section => (section.sources.length > 0 || section.exercise) && section.sources.every(id => knownSources.has(id))), route + ' evidence sections cite originals and uncovered fictional exercises stay distinct');
}
assert(!sitemap.some(page => ['/pricing','/notes','/auth/login','/account/subscription'].includes(new URL(page.url).pathname)), 'Retired services are no longer indexable sitemap destinations');
assert(!sitemap.some(page => new URL(page.url).pathname === '/learn/courses'), 'The merged course index redirects to the learning home instead of appearing in the sitemap');
assert(!sitemap.some(page => new URL(page.url).pathname === '/kokushi'), 'The retired exam landing page is no longer an indexable sitemap destination');
for(const article of ARTICLES) assert.equal(sitemap.find(page=>new URL(page.url).pathname===`/articles/${article.id}`).lastModified.toISOString().slice(0,10),article.updatedAt);
for (const articleId of additionalResearchArticles) {
  assert.equal(dateAt(`/articles/${articleId}`), updatedArticleComparisons.has(articleId) ? PUBLIC_VISUALS_REVISED_AT : '2026-11-23', articleId + ' reflects the latest revision in the public sitemap');
}
const { LEARNING_COURSES, getCourseProgress } = load('src/data/learningCourses');
const { CURRICULUM_TOTAL_CHAPTERS } = load('src/data/curriculumOutline');
assert.equal(new Set(LEARNING_COURSES.map(course=>course.slug)).size, CURRICULUM_TOTAL_CHAPTERS);
for (const course of LEARNING_COURSES) {
 assert.equal(dateAt(`/learn/courses/${course.slug}`), '2026-11-20', course.slug + ' actual revision date');
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

/* eslint-disable @typescript-eslint/no-require-imports -- Server/client boundary and build diagnostics regression. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const zlib = require('node:zlib');
const ts = require('typescript');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const root = path.resolve(__dirname, '..');
const cache = new Map();
const mocks = new Map();

function resolveSource(candidate) {
  const filename = path.isAbsolute(candidate) ? candidate : path.resolve(root, candidate);
  return [filename, filename + '.ts', filename + '.tsx', filename + '.js', path.join(filename, 'index.ts'), path.join(filename, 'index.tsx')].find(file => fs.existsSync(file) && fs.statSync(file).isFile());
}

function load(candidate) {
  const filename = resolveSource(candidate);
  assert(filename, 'Module exists: ' + candidate);
  if (cache.has(filename)) return cache.get(filename);
  if (filename.endsWith('.json')) {
    const data = JSON.parse(fs.readFileSync(filename, 'utf8'));
    cache.set(filename, data);
    return data;
  }
  const exports = {};
  cache.set(filename, exports);
  const source = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    fileName: filename,
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
  }).outputText;
  const localRequire = id => {
    if (id === 'server-only') return {};
    if (mocks.has(id)) return mocks.get(id);
    if (id.startsWith('@/')) return load('src/' + id.slice(2));
    if (id.startsWith('.')) return load(path.resolve(path.dirname(filename), id));
    return require(id);
  };
  vm.runInNewContext(source, { exports, require: localRequire, process, URL, console }, { filename });
  return exports;
}

const { CURRICULUM_DATA, PLANNED_UNPUBLISHED_LESSONS, getCurriculumStats } = load('src/data/curriculumData');
const { getCurriculumIndexCatalog } = load('src/data/curriculumIndexCatalog');
const { CURRICULUM_CHAPTERS_META } = load('src/data/curriculumOutline');
const { LEARNING_COURSES } = load('src/data/learningCourses');
const { COURSE_MINI_CASES } = load('src/data/courseMiniCases');
const lectures = CURRICULUM_DATA.flatMap(stage => stage.lectures);
const catalog = getCurriculumIndexCatalog();
const same = (actual, expected, message) => assert.equal(JSON.stringify(actual), JSON.stringify(expected), message);

assert.equal(catalog.lectures.length, lectures.length, 'Every lecture remains in the index');
same(catalog.lectures.map(lecture => lecture.id), lectures.map(lecture => lecture.id), 'Resume and progress IDs keep their original order');
const permittedKeys = ['id', 'stageTitle', 'seriesId', 'seriesTitle', 'lessonNumber', 'title', 'subtitle', 'duration', 'isPublished', 'whatYouWillLearn', 'summary'].sort();
for (const [index, preview] of catalog.lectures.entries()) {
  const lecture = lectures[index];
  same(Object.keys(preview).sort(), permittedKeys, lecture.id + ': explicit preview fields only');
  for (const key of permittedKeys.filter(key => key !== 'whatYouWillLearn')) same(preview[key], lecture[key], lecture.id + ': ' + key + ' remains current');
  same(Object.keys(preview.whatYouWillLearn).sort(), ['canDo', 'topics'], lecture.id + ': no goals or full content in the learning preview');
  same(preview.whatYouWillLearn, { topics: lecture.whatYouWillLearn.topics, canDo: lecture.whatYouWillLearn.canDo }, lecture.id + ': visible objectives preserved');
}
same(catalog.plannedLessons, PLANNED_UNPUBLISHED_LESSONS, 'Planned lecture cards remain available');
same(catalog.chapters.map(chapter => chapter.seriesId), CURRICULUM_CHAPTERS_META.map(chapter => chapter.seriesId), 'Chapter cards follow the shared teaching order');
for (const chapter of catalog.chapters) {
  const currentLectures = lectures.filter(lecture => lecture.seriesId === chapter.seriesId && lecture.isPublished !== false);
  same(chapter.lectureIds, currentLectures.map(lecture => lecture.id), chapter.id + ': progress uses the current public IDs');
  assert.equal(chapter.firstLectureId, currentLectures[0]?.id);
  assert.equal(chapter.stageTitle, currentLectures[0]?.stageTitle);
  assert.equal(chapter.courseSlug, LEARNING_COURSES.find(course => course.seriesId === chapter.seriesId)?.slug);
}
assert(!/"(?:contentMarkdown|references|keyPoints|nationalExamPoints|integrativeMedicine)"\s*:/.test(JSON.stringify(catalog)), 'Large lecture-only fields must not cross the index boundary');
assert(Buffer.byteLength(JSON.stringify(catalog)) < Buffer.byteLength(JSON.stringify(CURRICULUM_DATA)) / 4, 'The index receives a substantially smaller catalog');

// Previews are derived on the server, so source edits do not require a second generated catalog.
const first = lectures[0];
const original = { title: first.title, canDo: first.whatYouWillLearn.canDo };
first.title = 'Updated public title';
first.whatYouWillLearn.canDo = 'Updated objective';
assert.equal(getCurriculumIndexCatalog().lectures[0].title, first.title);
assert.equal(getCurriculumIndexCatalog().lectures[0].whatYouWillLearn.canDo, first.whatYouWillLearn.canDo);
first.title = original.title;
first.whatYouWillLearn.canDo = original.canDo;

const { getLearningProgressCatalog } = load('src/data/learningProgressCatalog');
const progressCatalog = getLearningProgressCatalog();
assert.equal(progressCatalog.totalPublished, getCurriculumStats().totalPublishedLessons);
assert.equal(progressCatalog.totalPlanned, getCurriculumStats().totalPlannedLessons);
assert(!JSON.stringify(progressCatalog).includes('contentMarkdown'), 'Shared progress remains metadata only');

// Follow static imports, including context dependencies. Deferred import() is intentionally excluded.
function eagerDependencies(entry, visited = new Set()) {
  const file = resolveSource(entry);
  if (!file || visited.has(file) || !/\.[cm]?[jt]sx?$/.test(file)) return visited;
  visited.add(file);
  const tree = ts.createSourceFile(file, fs.readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true);
  for (const node of tree.statements) {
    if (!ts.isImportDeclaration(node) && !ts.isExportDeclaration(node)) continue;
    if (!node.moduleSpecifier || !ts.isStringLiteral(node.moduleSpecifier) || node.isTypeOnly) continue;
    if (ts.isImportDeclaration(node)) {
      const clause = node.importClause;
      if (clause?.isTypeOnly) continue;
      if (!clause?.name && clause?.namedBindings && ts.isNamedImports(clause.namedBindings) && clause.namedBindings.elements.every(element => element.isTypeOnly)) continue;
    }
    const id = node.moduleSpecifier.text;
    if (id.startsWith('@/')) eagerDependencies('src/' + id.slice(2), visited);
    else if (id.startsWith('.')) eagerDependencies(path.resolve(path.dirname(file), id), visited);
  }
  return visited;
}
for (const entry of ['src/components/curriculum/CurriculumIndexClient.tsx', 'src/components/kokushi/KokushiDashboard.tsx', 'src/contexts/CurriculumProgressContext.tsx', 'src/components/practice/PracticeGrandMasterMap.tsx']) {
  const graph = eagerDependencies(entry);
  assert(!graph.has(resolveSource('src/data/curriculumData')), entry + ': the initial client dependency graph must not import every lecture body');
  assert(!graph.has(resolveSource('src/data/curriculumIndexCatalog')), entry + ': the catalog builder stays on the server');
}
const serverPage = fs.readFileSync(path.join(root, 'src/app/curriculum/page.tsx'), 'utf8');
assert.match(serverPage, /catalog=\{getCurriculumIndexCatalog\(\)\}/, 'The server page passes the current index catalog');

// Render the actual index against a progress fixture to verify titles, links and completion controls.
let resumeId = null;
const stats = getCurriculumStats();
mocks.set('next/link', ({ href, children, ...props }) => React.createElement('a', { href, ...props }, children));
mocks.set('next/navigation', { useRouter: () => ({ push() {} }) });
mocks.set('@/components/learning/LearningSyncStatus', () => null);
mocks.set('@/components/learning/LearningReviewPanel', () => null);
mocks.set('@/components/LearningMap', { LearningMap: () => null });
mocks.set('@/components/IncorrectQuestionsModal', { IncorrectQuestionsModal: () => null });
mocks.set('@/contexts/CurriculumProgressContext', { useCurriculumProgress: () => ({
  isMounted: true, completedLectures: { [lectures[0].id]: true }, toggleLectureCompleted() {},
  totalCompleted: 1, totalPercentage: 1, totalPublished: stats.totalPublishedLessons, totalPlanned: stats.totalPlannedLessons,
  getChapterProgress: () => ({ completedCount: 1, percentage: 13 }),
  getNextResumeLectureId: ids => { same(ids, lectures.map(lecture => lecture.id), 'Resume receives all stable lecture IDs'); return resumeId; },
  getIncorrectQuestions: () => [], resetAllProgress() {},
}) });
const Index = load('src/components/curriculum/CurriculumIndexClient').default;
const renderIndex = () => renderToStaticMarkup(React.createElement(Index, { catalog, relatedArticles: [] }));
let html = renderIndex();
assert(html.includes(`href="/curriculum/${lectures[0].id}"`), 'The first lecture link remains visible');
assert(html.includes('受講完了（クリックで解除）'), 'Completion toggle state remains visible');
assert(html.includes(`course-mini-case-${catalog.chapters[0].seriesId}`), 'The actual index includes the first chapter short exercise');
assert(html.includes('解答例を読む'), 'The actual short exercise is rendered, not replaced by a placeholder');
for (const anchor of html.matchAll(/<a\b[^>]*>[\s\S]*?<\/a>/g)) {
  assert(!/<button\b/.test(anchor[0]), 'Completion controls are separate from lecture links');
}
resumeId = lectures.at(-1).id;
html = renderIndex();
assert(html.includes(`href="/curriculum/${resumeId}"`), 'Resume supports the last lecture in another chapter');
assert(html.includes(lectures.at(-1).title), 'Resume shows the current lecture title');

// Render the real shared exercise: question, native disclosure and theory-return context.
const MiniCase = load('src/components/learning/CourseMiniCase').default;
for (const chapter of catalog.chapters) {
  const course = LEARNING_COURSES.find(item => item.seriesId === chapter.seriesId);
  const example = COURSE_MINI_CASES[chapter.seriesId];
  const markup = renderToStaticMarkup(React.createElement(MiniCase, { seriesId: chapter.seriesId }));
  assert(markup.includes(`id="course-mini-case-${chapter.seriesId}"`));
  assert(markup.includes(example.question), chapter.id + ': a concrete question is shown');
  assert(/<details\b[\s\S]*?<summary\b[^>]*>解答例を読む<\/summary>/.test(markup), chapter.id + ': answer can be opened with native keyboard-accessible disclosure');
  assert(markup.includes(example.answer), chapter.id + ': answer is present in server HTML');
  const links = [...markup.matchAll(/href="([^"]+)"/g)].map(match => match[1].replaceAll('&amp;', '&'));
  const theory = new URL(links.find(href => href.startsWith('/curriculum/')), 'https://www.haritaro.jp');
  assert.equal(theory.pathname, '/curriculum/' + example.lectureId);
  assert.equal(theory.searchParams.get('course'), course.slug);
  assert.equal(theory.searchParams.get('miniCase'), course.seriesId);
  assert(course.steps.some(step => step.lectureId === example.lectureId), chapter.id + ': reader can resolve the same course and return to this example');
  const laterStage = ['stage-2', 'stage-3'].includes(chapter.stageId);
  assert.equal(links.includes('/simulator#case-training'), laterStage, chapter.id + ': full staged cases are an advanced step');
  assert(!/<form\b|<input\b|<button\b/.test(markup), chapter.id + ': reflection is not presented as a graded or saved attempt');
}
assert.equal(renderToStaticMarkup(React.createElement(MiniCase, { seriesId: 'unknown' })), '', 'Unknown example IDs render no misleading links');
const nestedExample = renderToStaticMarkup(React.createElement(MiniCase, { seriesId: 'intro', headingLevel: 3 }));
assert(nestedExample.includes('<h3 id="course-mini-case-intro-title"'), 'Chapter exercise headings preserve the document hierarchy');

// The legacy diagram token remains renderable, without claiming unverified completion.
const ReflectionMap = load('src/components/practice/PracticeGrandMasterMap').default;
const reflection = renderToStaticMarkup(React.createElement(ReflectionMap));
assert(reflection.includes(`全${CURRICULUM_CHAPTERS_META.length}章のつながり`));
assert(reflection.includes(`全${lectures.length}講`));
assert.equal([...reflection.matchAll(/<button\b/g)].length, CURRICULUM_CHAPTERS_META.length, 'Every current chapter has a reflection selector');
assert.equal([...reflection.matchAll(/aria-pressed="true"/g)].length, 1, 'One chapter is visibly and accessibly selected');
let previousChapter = -1;
for (const chapter of CURRICULUM_CHAPTERS_META) {
  const position = reflection.indexOf(chapter.shortTitle);
  assert(position > previousChapter, chapter.id + ': reflection selectors follow the shared teaching order');
  previousChapter = position;
}
assert(reflection.includes(`/curriculum#chapter-${CURRICULUM_CHAPTERS_META.at(-1).id}`), 'The selected chapter links to the same index anchor');
assert(reflection.includes('/learn/review'));
assert(reflection.includes('学んだ内容を振り返る'));
assert(!/全8|公式修了認定|完全走破|CURRICULUM COMPLETE/.test(reflection), 'Rendering a diagram never grants an unverified completion or clinical qualification');

// Render only the real lecture reader, so common layout/Footer destinations
// cannot be mistaken for a premature clinical CTA in the lesson itself.
mocks.set('next/navigation', { useRouter: () => ({ push() {} }), useSearchParams: () => new URLSearchParams() });
mocks.set('@/components/FontSizeControl', () => null);
mocks.set('@/components/CurriculumDiagram', () => null);
mocks.set('@/components/EastWestTermSwitch', () => null);
mocks.set('@/components/learning/ReviewQuestionCard', () => null);
mocks.set('@/components/learning/QuestionEvidence', () => null);
mocks.set('@/contexts/CurriculumProgressContext', { useCurriculumProgress: () => ({
  isMounted: true, completedLectures: {}, quizResults: {}, toggleLectureCompleted() {}, recordVisitedLecture() {},
  saveQuizResult() {}, clearQuizResult() {}, setLectureCompleted() {},
}) });
const Reader = load('src/components/curriculum/CurriculumLectureReader').default;
for (const chapter of catalog.chapters) {
  const lecture = lectures.find(item => item.id === chapter.firstLectureId);
  const markup = renderToStaticMarkup(React.createElement(Reader, { lecture, lectureNavigation: catalog.lectures, quiz: load("src/data/curriculumQuizzes").CURRICULUM_QUIZZES[lecture.id], resolvedReferences: [], reviewQuestions: [], chapterAssessment: null }));
  const clinicalStage = ['stage-2', 'stage-3'].includes(chapter.stageId);
  if (clinicalStage) {
    assert(markup.includes('aria-label="この講義を実践につなぐ"'), chapter.id + ': later lectures keep the real clinical application guide');
    assert(markup.includes('href="/simulator#case-training"') && markup.includes('6段階の症例演習で振り返る'));
    assert(markup.includes('配穴設計ツール') && markup.includes('この講義を臨床ノートに記録'));
  } else {
    assert(!markup.includes('aria-label="この講義を実践につなぐ"'), chapter.id + ': early lectures do not render clinical application prompts');
    assert.equal(markup.includes('aria-label="この講義で練習すること"'), ['intro', 'zangfu', 'meridians'].includes(lecture.seriesId), chapter.id + ': new foundation guides render as learning exercises');
    assert(!markup.includes('href="/clinical/workspace"') && !markup.includes('href="/cases#revision-training"'), chapter.id + ': foundation guides do not bypass the staged learning route');
    assert(markup.includes('学習ガイドを見る') && markup.includes('aria-label="基礎を振り返る"'));
    assert(markup.includes('href="/glossary"') && markup.includes('用語辞典で振り返る'));
    assert(!markup.includes('配穴設計ツール') && !markup.includes('この講義を臨床ノートに記録') && !markup.includes('6段階の症例演習で振り返る'));
  }
}

if (process.argv.includes('--bundles')) {
  const baseline = JSON.parse(fs.readFileSync(path.join(root, 'scripts/fixtures/curriculum-bundle-baseline.json'), 'utf8'));
  const buildStats = JSON.parse(fs.readFileSync(path.join(root, '.next/diagnostics/route-bundle-stats.json'), 'utf8'));
  // Use distinct body excerpts absent from the lean catalog, rather than banning normal UI field names.
  const previewJson = JSON.stringify(catalog);
  const markers = lectures.map(lecture => lecture.contentMarkdown.split('\n\n')
    .filter(paragraph => paragraph.length >= 100 && !/[\n\r"\\]/.test(paragraph))
    .sort((a, b) => b.length - a.length)
    .map(paragraph => paragraph.slice(0, 100))
    .find(marker => !previewJson.includes(marker))).filter(Boolean);
  assert(markers.length >= 20, 'Enough distinct lecture-body markers to detect a bundled full catalog');
  for (const [route, previous] of Object.entries(baseline.routes)) {
    const row = buildStats.find(candidate => candidate.route === route);
    assert(row, route + ': current build diagnostics exist');
    const chunks = row.firstLoadChunkPaths.map(file => fs.readFileSync(path.resolve(root, file)));
    const gzipBytes = chunks.reduce((sum, chunk) => sum + zlib.gzipSync(chunk).length, 0);
    const initialJs = chunks.map(chunk => chunk.toString('utf8')).join('\n');
    const leakedMarkers = markers.filter(marker => initialJs.includes(marker));
    assert.equal(leakedMarkers.length, 0, route + ': lecture bodies remain in first-load chunks');
    const permittedGrowth = previous.permittedGrowthBytes || 0;
    if (permittedGrowth) {
      assert(row.firstLoadUncompressedJsBytes <= previous.uncompressedBytes + permittedGrowth, route + ': initial JS exceeds the documented shared-feature growth budget');
    } else {
      assert(row.firstLoadUncompressedJsBytes < previous.uncompressedBytes, route + ': initial JS must be smaller than the recorded baseline');
    }
    console.log(`${route}: ${previous.uncompressedBytes} -> ${row.firstLoadUncompressedJsBytes} raw bytes; ${previous.gzipBytes} -> ${gzipBytes} locally gzipped bytes; ${leakedMarkers.length} body markers`);
  }
}
console.log(`Passed: ${catalog.lectures.length} current lecture previews, stable progress/navigation and no full-body client imports.`);

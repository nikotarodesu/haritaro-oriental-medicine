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
for (const entry of ['src/components/curriculum/CurriculumIndexClient.tsx', 'src/components/kokushi/KokushiDashboard.tsx', 'src/contexts/CurriculumProgressContext.tsx']) {
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
resumeId = lectures.at(-1).id;
html = renderIndex();
assert(html.includes(`href="/curriculum/${resumeId}"`), 'Resume supports the last lecture in another chapter');
assert(html.includes(lectures.at(-1).title), 'Resume shows the current lecture title');

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

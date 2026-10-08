/* eslint-disable @typescript-eslint/no-require-imports -- Offline editorial regression checks. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
const { createDataLoader } = require('./data-loader.cjs');
const load = createDataLoader();
const lectures = load('src/data/curriculumData.ts').CURRICULUM_DATA.flatMap(stage => stage.lectures);
const glossary = Object.values(load('src/data/glossaryData.ts').GLOSSARY_TERMS);
const normaliseTerm = text => text.replaceAll('相克', '相剋').replaceAll('瘀血', '血瘀');

// A valid URL alone is insufficient: the linked lesson must cover the term and
// the label must describe that lesson's current published content.
for (const term of glossary) {
  const lecture = lectures.find(item => item.id === term.relatedLectureId);
  assert(lecture?.isPublished, `${term.term}: related lesson is unavailable`);
  assert.equal(term.relatedLectureTitle, lecture.title, `${term.term}: stale lesson title`);
  assert(normaliseTerm(lecture.contentMarkdown).includes(normaliseTerm(term.term)), `${term.term}: related lesson does not explain this term`);
}

const quizzes = load('src/data/curriculumQuizzes.ts').CURRICULUM_QUIZZES;
const guides = load('src/data/curriculumReadingGuides.ts');
const unsupportedClaim = /を統合した総合概念|画像検査に異常がなくとも|瘀血が存在すると判断|心臓の異常を疑う前|脳の経絡を塞げば|絶対条件|生理学的にも完全に合致/;
for (const id of Array.from({ length: 5 }, (_, index) => `lecture-qiblood-${index + 1}`)) {
  const lecture = lectures.find(item => item.id === id);
  const quiz = quizzes[id];
  assert(lecture?.isPublished && quiz, `${id}: learning progress route must remain available`);
  assert.equal(quiz.lectureTitle, lecture.title, `${id}: quiz describes a different lesson`);
  assert.equal(quiz.questions.length, 3);
  assert.equal(quiz.passingScore, 2);
  assert(!unsupportedClaim.test(JSON.stringify({ lecture, quiz })), `${id}: unsupported medical equivalence or treatment certainty`);
  assert.match(lecture.contentMarkdown, /伝統/);
  assert.match(lecture.contentMarkdown, /比喩|一対一|仮説/);
  assert.match(lecture.contentMarkdown, /医学的|医療評価|解剖生理学/);
  assert(lecture.references.some(ref => ref.url?.startsWith('https://www.who.int/') && /本文PDF.*取得できず/.test(ref.note)), `${id}: WHO verification scope must remain visible`);
  assert(lecture.references.some(ref => ref.url?.startsWith('https://www.nccih.nih.gov/') && ref.sourceCheckedAt && /伝統的な分類.*証明.*扱いません/.test(ref.note)), `${id}: research scope missing`);
  quiz.questions.forEach((question, index) => {
    assert.equal(question.id, `${id}-q${index + 1}`, `${id}: preserve stored progress IDs`);
    assert.equal(question.options.length, 3);
    assert.equal(question.correctIndex, index);
    assert(question.explanation.length > 20);
  });
  for (const insert of guides.getCurriculumReadingInserts(id)) {
    assert(lecture.contentMarkdown.includes(`# ${insert.afterHeading}\n`), `${id}: inline learning figure has lost its heading`);
  }
  for (const question of guides.CURRICULUM_READING_QUESTIONS[id] ?? []) {
    assert(lecture.contentMarkdown.includes(`# ${question.heading}\n`), `${id}: learning question links to a stale heading`);
  }
}
assert.match(lectures.find(l => l.id === 'lecture-qiblood-2').contentMarkdown, /血虚は貧血.*同義語ではありません/);
assert.match(lectures.find(l => l.id === 'lecture-qiblood-3').contentMarkdown, /必ずこの順番で進む悪化段階ではありません/);
assert.match(lectures.find(l => l.id === 'lecture-qiblood-5').contentMarkdown, /架空の学習例/);

const publishedFigures = [
  { name: 'QiBloodThreeLayers', diagramId: 'qiblood-three-layers', lectureId: 'lecture-qiblood-1', section: '導入：気・血・水を伝統理論として学ぶ' },
  { name: 'QiBloodTriangle', diagramId: 'qiblood-triangle', lectureId: 'lecture-qiblood-4', section: '第1節：気・血・水の3大相互関係' },
  { name: 'QiBloodConstitutionChecker', diagramId: 'qiblood-constitution-checker', lectureId: 'lecture-qiblood-4', section: '第2節：現在の状態と長期的な傾向を分ける' },
  { name: 'QiBloodDominoProcess', diagramId: 'qiblood-domino-process', lectureId: 'lecture-qiblood-5', section: '第1節：4つの複合する分類と治法の用語' },
  { name: 'QiBloodClinicalFlow', diagramId: 'qiblood-clinical-flow', lectureId: 'lecture-qiblood-5', section: '第2節：総合症例シミュレーション演習' },
];
const parseMarkdownBlocks = load('src/utils/markdownParser.ts').parseMarkdownBlocks;
const diagramDispatcher = fs.readFileSync('src/components/CurriculumDiagram.tsx', 'utf8');
for (const { name, diagramId, lectureId, section } of publishedFigures) {
  const source = fs.readFileSync(`src/components/qiblood/${name}.tsx`, 'utf8');
  assert.match(source, /<QiBloodLearningScope\s*\/>/, `${name}: figure learning scope missing`);
  assert(!/たちまち微小循環|慢性貧血（血虚）|利水には補気薬.*欠かせません|最短で確実な治癒|最も即応性の高い実体|全身の痛覚伝達をブロック/.test(source), `${name}: unsupported mechanism or guaranteed effect`);
  const lecture = lectures.find(item => item.id === lectureId);
  const sectionBody = lecture.contentMarkdown.split(`## ${section}\n`)[1]?.split('\n## ')[0];
  assert(sectionBody, `${name}: published learning section missing`);
  assert(parseMarkdownBlocks(sectionBody).some(block => block.type === 'diagram' && block.diagramId === diagramId), `${name}: revised figure is not reachable from its lecture section`);
  assert.match(diagramDispatcher, new RegExp(`if \\(id === "${diagramId}"\\) \\{\\s*return <${name}\\b`), `${name}: published directive does not render the revised component`);
}

// Execute the route's metadata and server element tree, including the JSON-LD.
// Component rendering is stubbed; this checks what all supported tabs publish
// to search/share consumers rather than merely matching source strings.
const pageSource = fs.readFileSync('src/app/diagnosis/page.tsx', 'utf8');
const pageExports = {};
const jsx = (type, props) => ({ type, props });
const pageJs = ts.transpileModule(pageSource, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } }).outputText;
vm.runInNewContext(pageJs, {
  exports: pageExports,
  require: id => {
    if (id === 'react/jsx-runtime') return { jsx, jsxs: jsx, Fragment: 'Fragment' };
    if (id === '@/config/seo') return load('src/config/seo');
    if (id === '@/data/articleData') return { getArticlePreviews: () => [] };
    if (id === '@/components/diagnosis/DiagnosisClient') return { default: 'DiagnosisClient' };
    throw Error(`Unexpected page dependency ${id}`);
  },
}, { filename: 'src/app/diagnosis/page.tsx' });
function findScript(node) {
  if (!node || typeof node !== 'object') return;
  if (node.type === 'script') return node;
  return [node.props?.children].flat().map(findScript).find(Boolean);
}
(async () => {
  for (const tab of [undefined, 'clinical', 'gorou', 'workstyle', 'checker']) {
    const props = { searchParams: Promise.resolve({ tab }) };
    const meta = await pageExports.generateMetadata(props);
    const script = findScript(await pageExports.default(props));
    assert(script, `${tab}: JSON-LD missing`);
    const webPage = JSON.parse(script.props.dangerouslySetInnerHTML.__html)['@graph'][0];
    assert.equal(meta.title, webPage.name, `${tab}: metadata and JSON-LD disagree`);
    assert.equal(meta.openGraph.title, meta.title);
    assert.equal(meta.openGraph.description, meta.description);
    assert.equal(webPage.url, meta.alternates.canonical);
    assert(!/特効|自動判定|セルフ診断|タイプ判定/.test(JSON.stringify({ meta, webPage })), `${tab}: diagnostic or efficacy promise remains`);
    assert.match(meta.description, /学ぶ|学習|記録/);
    assert.match(meta.description, /使えません|ありません|確定するものではなく/);
    assert.match(webPage.description, /使えません|ありません|確定するものではなく/);
  }
  assert(!/セルフ診断/.test(fs.readFileSync('src/app/not-found.tsx', 'utf8')), '404 must name the same educational check');
  console.log(`Information consistency regression passed: ${glossary.length} glossary links, five lectures / 15 questions / five figures, five diagnosis tab metadata variants.`);
})().catch(error => { console.error(error); process.exitCode = 1; });

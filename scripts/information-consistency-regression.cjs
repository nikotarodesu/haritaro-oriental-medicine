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
const lectureById = new Map(lectures.map(lecture => [lecture.id, lecture]));
const quizzes = load('src/data/curriculumQuizzes.ts').CURRICULUM_QUIZZES;
const guides = load('src/data/curriculumReadingGuides.ts');
const qiIds = Array.from({ length: 5 }, (_, index) => `lecture-qiblood-${index + 1}`);
const onsetId = 'lecture-pathomechanism-2';
const pathIds = [3, 4, 5].map(number => `lecture-pathomechanism-${number}`);
const foundationIds = [['intro', 4], ['zangfu', 5], ['meridians', 4]]
  .flatMap(([series, count]) => Array.from({ length: count }, (_, index) => `lecture-${series}-${index + 1}`));
assert.equal(lectures.length, 94, 'The redesigned curriculum must publish 94 lessons');
assert.equal(lectureById.size, lectures.length, 'Duplicate lesson IDs would corrupt progress and links');

function lesson(id) {
  const result = lectureById.get(id);
  assert(result?.isPublished, `${id}: published learning route missing`);
  return result;
}
function sectionBody(id, heading) {
  const body = lesson(id).contentMarkdown.split(`## ${heading}\n`)[1]?.split('\n## ')[0];
  assert(body, `${id}: section missing: ${heading}`);
  return body;
}
function assertSectionLinks(id) {
  const body = lesson(id).contentMarkdown;
  for (const insert of guides.getCurriculumReadingInserts(id)) {
    assert(body.includes(`# ${insert.afterHeading}\n`), `${id}: inline learning figure has lost its heading`);
  }
  for (const question of guides.CURRICULUM_READING_QUESTIONS[id] ?? []) {
    assert(body.includes(`# ${question.heading}\n`), `${id}: learning question links to a stale heading`);
  }
}
function assertQuiz(id) {
  const lecture = lesson(id);
  const quiz = quizzes[id];
  assert(quiz, `${id}: learning progress quiz missing`);
  assert.equal(quiz.lectureTitle, lecture.title, `${id}: quiz describes a different lesson`);
  assert.equal(quiz.questions.length, 3, `${id}: preserve three questions`);
  assert.equal(quiz.passingScore, 2, `${id}: preserve progress scoring`);
  quiz.questions.forEach((question, index) => {
    assert.equal(question.id, `${id}-q${index + 1}`, `${id}: preserve stored progress IDs`);
    assert.equal(question.options.length, 3);
    assert.equal(new Set(question.options).size, 3, `${question.id}: choices must be distinct`);
    assert(question.options.every(option => typeof option === 'string' && option.trim().length > 0), `${question.id}: empty answer choice`);
    assert(Number.isInteger(question.correctIndex) && question.correctIndex >= 0 && question.correctIndex < 3);
    assert(question.explanation.length > 20, `${question.id}: explanation must teach the reason`);
    assert(question.relatedSectionTitle && lecture.contentMarkdown.includes(`# ${question.relatedSectionTitle}\n`), `${question.id}: review link must reach the taught concept`);
  });
  assertSectionLinks(id);
  return quiz;
}
function references(id) {
  return lesson(id).references.filter(ref => typeof ref === 'object');
}
function isOfficialReference(ref) {
  return /^https:\/\/(?:www\.who\.int|iris\.who\.int|www\.nccih\.nih\.gov|www\.iso\.org)\//.test(ref.url ?? '');
}
function assertReferenceScope(id) {
  const refs = references(id);
  assert(refs.some(isOfficialReference), `${id}: official source missing`);
  for (const ref of refs) {
    assert(ref.url && /^https:\/\//.test(ref.url), `${id}: reviewable source URL missing`);
    assert.match(ref.sourceCheckedAt ?? '', /^\d{4}-\d{2}-\d{2}$/, `${id}: verification date missing`);
    assert(ref.note?.length > 24, `${id}: source scope missing`);
  }
  assert(refs.some(ref => /未取得|取得でき|未照合|に限定|限定し|同一性|推奨.*引用では/.test(ref.note)), `${id}: bounded verification must remain visible`);
}

// A valid URL alone is insufficient: the linked lesson must cover the term and
// the label must describe that lesson's current published content.
for (const term of glossary) {
  const lecture = lesson(term.relatedLectureId);
  assert.equal(term.relatedLectureTitle, lecture.title, `${term.term}: stale lesson title`);
  assert(normaliseTerm(lecture.contentMarkdown).includes(normaliseTerm(term.term)), `${term.term}: related lesson does not explain this term`);
}

const unsupportedClaim = /を統合した総合概念|画像検査に異常がなくとも|瘀血が存在すると判断|心臓の異常を疑う前|脳の経絡を塞げば|絶対条件|生理学的にも完全に合致|気の絶対量が減少した|ベクトル崩壊|夜には肝に戻って浄化|血液が冷やされてゼリー状に凝固|微小循環障害そのもの|機能的停滞.*物質的変質.*組織固定|水毒攻略の鉄則/;
for (const id of [...qiIds, onsetId, ...pathIds, ...foundationIds]) {
  const lecture = lesson(id);
  const quiz = assertQuiz(id);
  assertReferenceScope(id);
  // Distractors may deliberately state a misconception. Protect the actual
  // teaching, correct answers and explanations, not the rejected choices.
  const teaching = JSON.stringify({
    body: lecture.contentMarkdown, goals: lecture.whatYouWillLearn,
    keyPoints: lecture.keyPoints, summary: lecture.summary,
    quiz: quiz.questions.map(question => ({ answer: question.options[question.correctIndex], explanation: question.explanation })),
  });
  assert(!unsupportedClaim.test(teaching), `${id}: unsupported medical equivalence or treatment certainty`);
}
for (const id of foundationIds) {
  const lecture = lesson(id);
  assert(lecture.contentMarkdown.length >= 1000, `${id}: foundation lesson needs substantive teaching`);
  assert.match(lecture.contentMarkdown, /架空/, `${id}: worked learning example missing`);
  assert.match(lecture.contentMarkdown, /解答|回答/, `${id}: example answer missing`);
}

// The introductory chapter teaches normal roles; the more detailed boundaries
// now belong to the three pathology lessons. Check the intended distinction in
// each lesson rather than requiring identical words or sources everywhere.
assert.match(lesson(qiIds[0]).contentMarkdown, /気をATP.*置き換えることはできません/);
assert.match(lesson(qiIds[1]).contentMarkdown, /血の各定義.*逐語照合.*扱っていません/);
assert.match(lesson(qiIds[2]).contentMarkdown, /細胞外液.*細胞内液.*定義ではありません/);
assert.match(lesson(qiIds[2]).contentMarkdown, /水分量.*薬.*自己判断で変更しません/);
assert.match(lesson(qiIds[3]).contentMarkdown, /用語・モデルの説明/);
assert.match(lesson(qiIds[3]).contentMarkdown, /学習上の比喩/);
assert.match(lesson(qiIds[3]).contentMarkdown, /測定や研究の結果/);
assert.match(lesson(qiIds[4]).contentMarkdown, /架空例/);
assert.match(lesson(qiIds[4]).contentMarkdown, /観察.*事実/);
assert.match(lesson(qiIds[4]).contentMarkdown, /保留する判断/);

const onsetPath = lesson(onsetId);
const onsetTeaching = JSON.stringify({ lecture: onsetPath, quiz: quizzes[onsetId] });
assert(!/発症条件モデル.{0,50}完全に実証|NK[^。]*(?:70[%％]|約7割)|副腎疲労|寝不足なら感染が成立/.test(onsetTeaching), 'Path2 must not reintroduce blanket proof, unbounded NK percentages or adrenal fatigue');
assert.match(onsetPath.contentMarkdown, /免疫細胞数.*測定結果ではなく/);
assert.match(onsetPath.contentMarkdown, /感染モデルの同義語でもありません/);
assert.match(onsetPath.contentMarkdown, /風・寒・暑・湿・燥・火/);
assert.match(onsetPath.contentMarkdown, /喜・怒・憂・思・悲・恐・驚/);
assert.match(onsetPath.contentMarkdown, /飲食/);
assert.match(onsetPath.contentMarkdown, /労倦/);
assert.match(onsetPath.contentMarkdown, /観察した事実/);
assert.match(onsetPath.contentMarkdown, /伝統的な解釈/);
assert.match(onsetPath.contentMarkdown, /要確認事項/);
assert(!onsetPath.contentMarkdown.includes(':::diagram pathomechanism-onset-equilibrium'), 'Path2 must not publish an unverified onset equation figure');

const qiPath = lesson('lecture-pathomechanism-3');
const fluidPath = lesson('lecture-pathomechanism-4');
const bloodPath = lesson('lecture-pathomechanism-5');
assert.match(qiPath.contentMarkdown, /気虚はATP.*測定値ではありません/);
assert.match(qiPath.contentMarkdown, /気逆は胃食道逆流症の同義語ではなく/);
assert.match(qiPath.contentMarkdown, /自律神経.*一対一.*できません/);
assert.match(fluidPath.contentMarkdown, /### 水滞という用語の位置づけ\n/);
assert.match(fluidPath.contentMarkdown, /水湿・痰・飲・水滞は.*必ずこの順番で進む悪化段階ではありません/);
assert.match(fluidPath.contentMarkdown, /津液不足は脱水の同義語ではありません/);
assert.match(bloodPath.contentMarkdown, /血虚は貧血の同義語ではありません/);
assert.match(bloodPath.contentMarkdown, /瘀血は血栓や微小循環障害の同義語ではありません/);
for (const id of pathIds) {
  const body = sectionBody(id, '第5節：架空例で観察・解釈・要確認を分ける');
  assert.match(body, /観察した事実/);
  assert.match(body, /伝統的な解釈/);
  assert.match(body, /要確認事項/);
  assert.match(body, /解答例/);
  const sourceNote = sectionBody(id, '第6節：参考資料と研究を読む範囲');
  assert.match(sourceNote, /検索索引/);
  assert.match(sourceNote, /全文|全体/);
}
assert(!fluidPath.contentMarkdown.includes(':::diagram pathomechanism-fluid-degeneration'), 'Unrevised one-way fluid degeneration figure must not contradict the new comparison lesson');

const safeFigures = [
  { name: 'QiBloodThreeLayers', diagramId: 'qiblood-three-layers' },
  { name: 'QiBloodTriangle', diagramId: 'qiblood-triangle' },
  { name: 'QiBloodConstitutionChecker', diagramId: 'qiblood-constitution-checker' },
  { name: 'QiBloodDominoProcess', diagramId: 'qiblood-domino-process' },
  { name: 'QiBloodClinicalFlow', diagramId: 'qiblood-clinical-flow' },
];
const parseMarkdownBlocks = load('src/utils/markdownParser.ts').parseMarkdownBlocks;
const diagramDispatcher = fs.readFileSync('src/components/CurriculumDiagram.tsx', 'utf8');
// All five retained components must keep their safety wording even when a
// component is reserved for a later course instead of published in the intro.
for (const { name, diagramId } of safeFigures) {
  const source = fs.readFileSync(`src/components/qiblood/${name}.tsx`, 'utf8');
  assert.match(source, /<QiBloodLearningScope\s*\/>/, `${name}: figure learning scope missing`);
  assert(!/たちまち微小循環|慢性貧血（血虚）|利水には補気薬.*欠かせません|最短で確実な治癒|最も即応性の高い実体|全身の痛覚伝達をブロック/.test(source), `${name}: unsupported mechanism or guaranteed effect`);
  assert.match(diagramDispatcher, new RegExp(`if \\(id === "${diagramId}"\\) \\{\\s*return <${name}\\b`), `${name}: directive must render its safe component`);
}
const triangleSection = sectionBody('lecture-qiblood-4', '第1節：気と血の関係');
assert(parseMarkdownBlocks(triangleSection).some(block => block.type === 'diagram' && block.diagramId === 'qiblood-triangle'), 'The introductory relationship figure must appear in qi4 section 1');
const qiDiagramIds = qiIds.flatMap(id => parseMarkdownBlocks(lesson(id).contentMarkdown).filter(block => block.type === 'diagram').map(block => block.diagramId));
assert.equal(qiDiagramIds.filter(id => id === 'qiblood-triangle').length, 1, 'Publish the triangle once in the introduction');
for (const { diagramId } of safeFigures.filter(figure => figure.diagramId !== 'qiblood-triangle')) {
  assert(!qiDiagramIds.includes(diagramId), `${diagramId}: detailed pathology figure must stay out of the introductory qi chapter`);
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
  console.log(`Information consistency regression passed: ${glossary.length} glossary links, 94 lessons, 13 foundations / 39 questions, five introductory qi lessons / 15 questions, four pathology lessons / 12 questions, five safe figures / one published introductory figure, five diagnosis tab metadata variants.`);
})().catch(error => { console.error(error); process.exitCode = 1; });

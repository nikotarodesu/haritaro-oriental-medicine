/* eslint-disable @typescript-eslint/no-require-imports */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const React = require('react');
const { createDataLoader } = require('./data-loader.cjs');
const load = createDataLoader();
const { CURRICULUM_DATA } = load('src/data/curriculumData');
const { CURRICULUM_CHAPTERS_META } = load('src/data/curriculumOutline');
const { getChapterAssessment } = load('src/data/curriculumAssessments');
const { CURRICULUM_QUIZZES } = load('src/data/curriculumQuizzes');
const { CHAPTER_APPLIED_QUESTIONS, CHAPTER_WRITING_EXERCISES } = load('src/data/curriculumAssessmentQuestions');
const { getLearningCourse } = load('src/data/learningCourses');
const { parseMarkdownBlocks } = load('src/utils/markdownParser');
const { shuffledIndices } = load('src/utils/learningReview');
const lectures = CURRICULUM_DATA.flatMap(s => s.lectures);
const lectureMap = new Map(lectures.map(l => [l.id, l]));
const ids = new Set();
const lessonPrompts = new Set(Object.values(CURRICULUM_QUIZZES).flatMap(quiz => quiz.questions.map(q => q.question.trim())));
const chapterPrompts = new Set();
const writingExamples = new Set();
assert.deepEqual(Object.keys(CHAPTER_APPLIED_QUESTIONS).sort(), Array.from(CURRICULUM_CHAPTERS_META, c => c.seriesId).sort());
assert.deepEqual(Object.keys(CHAPTER_WRITING_EXERCISES).sort(), Object.keys(CHAPTER_APPLIED_QUESTIONS).sort());
for (const chapter of CURRICULUM_CHAPTERS_META) {
  const last = chapter.lectureIds.at(-1);
  const assessment = getChapterAssessment(last);
  assert.equal(assessment.questions.length, 9);
  assert.equal(getChapterAssessment(chapter.lectureIds[0]), null);
  assert.equal(CHAPTER_APPLIED_QUESTIONS[chapter.seriesId].length, 8);
  const answerPositions = [0, 0, 0];
  const displayedPositions = [0, 0, 0];
  const sources = new Set();
  for (const question of assessment.questions) {
    assert(!ids.has(question.id)); ids.add(question.id);
    assert(!lessonPrompts.has(question.question.trim()), `${question.id}: not copied from a lesson quiz`);
    assert(!chapterPrompts.has(question.question.trim()), `${question.id}: distinct chapter prompt`);
    chapterPrompts.add(question.question.trim());
    assert.equal(new Set(question.options).size, 3);
    assert(Number.isInteger(question.correctIndex) && question.correctIndex >= 0 && question.correctIndex < 3);
    answerPositions[question.correctIndex]++;
    displayedPositions[shuffledIndices(3, question.id).indexOf(question.correctIndex)]++;
    const url = new URL(question.href, 'https://www.haritaro.jp');
    const source = lectureMap.get(url.pathname.split('/').at(-1));
    assert(source && chapter.lectureIds.includes(source.id)); sources.add(source.id);
    const focus = url.searchParams.get('focus');
    if (focus) {
      const blocks = parseMarkdownBlocks(source.contentMarkdown);
      const index = blocks.findIndex(block => (block.type === 'h2' || block.type === 'h3' || block.type === 'h4') && block.content === focus);
      assert(index >= 0, `${question.id}: exact source heading`);
      assert.equal(url.hash, `#curriculum-heading-${index}`, `${question.id}: direct anchor also works within the current lecture`);
    }
    assert(question.explanation.length >= 30);
  }
  assert(sources.size >= Math.min(5, chapter.lectureIds.length), chapter.id + ': covers multiple lessons');
  assert.equal(assessment.writing.criteria.length, 3);
  assert(answerPositions.every(count => count >= 2 && count <= 4), `${chapter.id}: varied answer positions`);
  assert(displayedPositions.every(count => count >= 2 && count <= 4), `${chapter.id}: varied positions after the actual UI shuffle`);
  assert(assessment.writing.prompt.length >= 60 && assessment.writing.example.length >= 120);
  assert(!assessment.writing.example.includes('という目標に照らし'), `${chapter.id}: worked answer, not a generic instruction`);
  writingExamples.add(assessment.writing.example);
}
assert.equal(ids.size, 99);
assert.equal(chapterPrompts.size, 99);
assert.equal(writingExamples.size, 11);
for (const lecture of lectures) {
  assert(!/```|[┌┐└┘┬┼]/.test(lecture.contentMarkdown), lecture.id + ': no fixed-width drawing');
  parseMarkdownBlocks(lecture.contentMarkdown);
}
const fence = parseMarkdownBlocks('before\n```text\n  a | b\n```\n## after');
assert.equal(fence[1].type, 'code');
assert.equal(fence[1].content, '  a | b');
assert.equal(fence[2].type, 'h2');
assert.equal(parseMarkdownBlocks('```c++\nvalue\n```')[0].language, 'c++');
assert.equal(parseMarkdownBlocks('````text\n```\n````')[0].content, '```');
assert.equal(parseMarkdownBlocks(':::unknown\ntext')[0].content, ':::unknown');
const card = parseMarkdownBlocks(':::card\nlabel\n\ndetails\n:::\n## next');
assert.equal(card[0].content, 'label\n\ndetails');
assert.equal(card[1].type, 'h2');
assert(getLearningCourse('diagnosis-foundations').steps.some(step => step.lectureId === 'lecture-diagnosis-7'));
assert(lectureMap.get('lecture-treatment-8').contentMarkdown.includes('学習の前提：要穴'));
for (const id of ['lecture-lifedynamics-1', 'lecture-lifedynamics-2']) {
  assert(lectureMap.get(id).integrativeMedicine.explanation.includes('同一'));
  assert(!/それぞれ対応します|後天の気は消化吸収/.test(lectureMap.get(id).integrativeMedicine.explanation));
}
for (const id of ['lecture-treatment-2', 'lecture-treatment-4', 'lecture-treatment-5', 'lecture-treatment-12', 'lecture-practice-7']) {
  const lecture = lectureMap.get(id);
  assert(!/寸\d-\d番|置[鍼針]\d+分|台座灸\d+壮|米粒大透熱灸|標治80%/.test(JSON.stringify(lecture)), id + ': withhold individual procedure');
}
const capstone = lectureMap.get('lecture-practice-12').contentMarkdown;
assert(capstone.includes('119') && capstone.includes('症状がいったん治まっていても'));
assert(!capstone.includes('可能性が極めて高い'));

// Exercise real radio, grade, retry and notebook-save handlers.
const slots = []; let cursor = 0; let ready = false; const writes = [];
const react = { ...React, useState(initial) {
  const index = cursor++; if (!(index in slots)) slots[index] = initial;
  return [slots[index], value => { slots[index] = typeof value === 'function' ? value(slots[index]) : value; }];
} };
const componentFile = path.resolve(__dirname, '../src/components/curriculum/ChapterAssessment.tsx');
const exportsObject = {};
const code = ts.transpileModule(fs.readFileSync(componentFile, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } }).outputText;
vm.runInNewContext(code, { exports: exportsObject, crypto: { randomUUID: () => 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa' }, Date,
  require(name) {
    if (name === 'react') return react;
    if (name === 'next/link') return 'a';
    if (name === '@/contexts/AuthContext') return { useAuth: () => ({ user: null }) };
    if (name === '@/contexts/LearningSyncContext') return { useLearningSync: () => ({ ready, status: 'local', setEntry: (key, value) => writes.push({ key, value }) }) };
    return name.startsWith('@/') ? load('src/' + name.slice(2)) : require(name);
  },
});
const assessment = getChapterAssessment('lecture-intro-4');
const workspace = exportsObject.default({ assessment });
let tree;
function render() { cursor = 0; tree = workspace.type(workspace.props); }
function nodes(node, list = []) { if (Array.isArray(node)) node.forEach(n => nodes(n, list)); else if (node && typeof node === 'object') { list.push(node); nodes(node.props?.children, list); } return list; }
function text(node) { return Array.isArray(node) ? node.map(text).join('') : node && typeof node === 'object' ? text(node.props?.children) : node ?? ''; }
function button(label) { return nodes(tree).find(node => node.type === 'button' && text(node) === label); }
render(); assert(button('採点と解説を表示').props.disabled);
for (let i = 0; i < assessment.questions.length; i++) {
  const q = assessment.questions[i];
  const answer = q.options[i === 0 ? (q.correctIndex + 1) % 3 : q.correctIndex];
  const label = nodes(tree).find(node => node.type === 'label' && text(node) === answer);
  nodes(label).find(node => node.type === 'input').props.onChange(); render();
}
assert(!button('採点と解説を表示').props.disabled);
button('採点と解説を表示').props.onClick(); render();
assert(text(tree).includes('9問中8問正解'));
assert.equal(nodes(tree).filter(node => node.type === 'input' && node.props.disabled).length, 27);
nodes(tree).find(node => node.type === 'textarea').props.onChange({ target: { value: '用語説明と研究の結果を分けて判断し、比較条件を追加確認する。' } }); render();
assert(button('振り返りノートに保存').props.disabled);
ready = true; render(); button('振り返りノートに保存').props.onClick(); render();
assert.equal(writes.length, 1);
assert.equal(writes[0].value.source.id, 'lecture-intro-4');
assert(writes[0].value.reasoning.includes('比較条件'));
assert(button('振り返りノートに保存').props.disabled);
button('選択問題をもう一度解く').props.onClick(); render();
assert(button('採点と解説を表示').props.disabled);
assert(text(tree).includes('自動採点・専門家による評価は行いません'));

// Closing an already loaded drawer must preserve the existing form instance.
let drawerOpened = false;
let drawerLoaded = false;
const drawerExports = {};
const drawerCode = ts.transpileModule(fs.readFileSync(path.resolve(__dirname, '../src/components/DeferredClinicalDrawer.tsx'), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } }).outputText;
const drawerType = () => null;
vm.runInNewContext(drawerCode, { exports: drawerExports, require(name) {
  if (name === 'next/dynamic') return () => drawerType;
  if (name === 'react') return { ...React, useState: () => [drawerLoaded, value => { drawerLoaded = value; }] };
  if (name === '@/contexts/ClinicalMemoContext') return { useClinicalMemo: () => ({ isDrawerOpen: drawerOpened }) };
  return require(name);
} });
assert.equal(drawerExports.default(), null);
drawerOpened = true; drawerExports.default();
assert.equal(drawerExports.default().type, drawerType);
drawerOpened = false;
assert.equal(drawerExports.default().type, drawerType);
console.log('Passed: 11 chapter assessments / 99 independent questions / 11 worked writing examples, exact source links, wrapping content, prerequisites, procedure safety, real grading/retry, notebook-save readiness and persistent lazy drawer.');

/* eslint-disable @typescript-eslint/no-require-imports -- Offline course navigation checks. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const root = path.resolve(__dirname, '..');
const cache = new Map();
let progress = {};

function load(relative) {
  let file = path.resolve(root, relative);
  if (!path.extname(file)) file += fs.existsSync(file + '.tsx') ? '.tsx' : '.ts';
  if (cache.has(file)) return cache.get(file);
  const exports = {};
  cache.set(file, exports);
  const js = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    fileName: file,
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
  }).outputText;
  const localRequire = id => {
    if (id === 'next/link') return ({ href, children, ...props }) => React.createElement('a', { href, ...props }, children);
    if (id === 'next/navigation') return { useRouter: () => ({ push() {} }), useSearchParams: () => new URLSearchParams() };
    if (id === '@/contexts/CurriculumProgressContext') return { useCurriculumProgress: () => progress };
    if (id === '@/components/learning/QuestionEvidence') return () => null;
    if (id.startsWith('@/')) return load('src/' + id.slice(2));
    if (id.startsWith('.')) return load(path.resolve(path.dirname(file), id));
    return require(id);
  };
  vm.runInNewContext(js, { exports, require: localRequire, URL, URLSearchParams, console, process, TextEncoder }, { filename: file });
  return exports;
}

const { LEARNING_COURSES } = load('src/data/learningCourses');
const { readCourseSlug, resolveCourseJourney, createCourseLectureHref, getCourseNextAction } = load('src/utils/courseJourney');
const { CURRICULUM_QUIZZES } = load('src/data/curriculumQuizzes');
const { InteractiveQuiz } = load('src/components/InteractiveQuiz');
let navigationCases = 0;

for (const course of LEARNING_COURSES) {
  const first = course.steps[0].lectureId;
  const last = course.steps.at(-1).lectureId;
  const allComplete = Object.fromEntries(course.steps.map(step => [step.lectureId, true]));
  const firstJourney = resolveCourseJourney(first, course.slug);
  const lastJourney = resolveCourseJourney(last, course.slug);
  assert(firstJourney && lastJourney);
  assert.equal(firstJourney.previousStep, null);
  assert.equal(getCourseNextAction(firstJourney, { [first]: true }).lectureId, course.steps[1].lectureId);
  assert.equal(getCourseNextAction(lastJourney, { [last]: true }).lectureId, first, 'Opening only the final lesson cannot finish a course');
  assert.equal(getCourseNextAction(lastJourney, allComplete).href, `/learn/courses/${course.slug}#course-next`);
  assert.equal(createCourseLectureHref(course.slug, last, 'interactive-quiz-container'), `/curriculum/${last}?course=${course.slug}#interactive-quiz-container`);
  assert.equal(resolveCourseJourney(last, null), null, 'Direct visits retain the full curriculum');
  assert.equal(resolveCourseJourney(last, 'untrusted-course'), null);
  assert.equal(resolveCourseJourney('lecture-practice-1', course.slug), null);
  assert(!createCourseLectureHref('untrusted-course', last).includes('course='));
  assert(!createCourseLectureHref(course.slug, 'lecture-practice-1').includes('course='));
  const quiz = CURRICULUM_QUIZZES[last];
  progress = { isMounted: true, completedLectures: allComplete, quizResults: Object.fromEntries(quiz.questions.map(q => [q.id, { userAnswerIndex: q.correctIndex }])), saveQuizResult() {}, clearQuizResult() {}, setLectureCompleted() {} };
  const html = renderToStaticMarkup(React.createElement(InteractiveQuiz, { quiz, courseJourney: lastJourney, nextLecture: { id: 'lecture-practice-1', title: '従来の全講義順' } }));
  assert(html.includes('このコースのすべての講義を受講しました'));
  assert(html.includes('コースを振り返る'));
  assert(html.includes('全講義の次のレッスンへ'));
  if (course.nextCourseSlug) assert(html.includes(`/learn/courses/${course.nextCourseSlug}`));
  progress.completedLectures = { [last]: true };
  const incompleteHtml = renderToStaticMarkup(React.createElement(InteractiveQuiz, { quiz, courseJourney: lastJourney }));
  assert(!incompleteHtml.includes('このコースのすべての講義を受講しました'));
  assert(incompleteHtml.includes('未完了のステップを学ぶ'));
  const directHtml = renderToStaticMarkup(React.createElement(InteractiveQuiz, { quiz, nextLecture: { id: 'lecture-practice-1', title: '従来の全講義順' } }));
  assert(directHtml.includes('次のレッスンへ進む'));
  assert(!directHtml.includes('コースを振り返る'));
  navigationCases += 13;
}

const firstCourse = LEARNING_COURSES[0];
assert.equal(readCourseSlug(new URLSearchParams(`course=${firstCourse.slug}`)), firstCourse.slug);
assert.equal(readCourseSlug(new URLSearchParams(`course=${firstCourse.slug}&course=${firstCourse.slug}`)), null);
assert.equal(readCourseSlug(new URLSearchParams('course=unknown')), null);
assert.equal(readCourseSlug(new URLSearchParams('course=https%3A%2F%2Funtrusted.example')), null);
assert.equal(readCourseSlug(new URLSearchParams()), null);
const sharedLecture = firstCourse.steps[0].lectureId;
LEARNING_COURSES.push({ ...firstCourse, slug: 'overlapping-test-course' });
assert.equal(resolveCourseJourney(sharedLecture, firstCourse.slug).course.slug, firstCourse.slug);
assert.equal(resolveCourseJourney(sharedLecture, 'overlapping-test-course').course.slug, 'overlapping-test-course');
LEARNING_COURSES.pop();

const { LEARNING_DISCOVERY } = load('src/data/learningDiscovery');
const { ARTICLES } = load('src/data/articleData');
const { CURRICULUM_DATA } = load('src/data/curriculumData');
const { ARTICLE_READING_GUIDES } = load('src/data/articleReadingGuides');
const { parseMarkdownBlocks } = load('src/utils/markdownParser');
const Discovery = load('src/components/learning/LearningDiscovery').default;
const discoveryHtml = renderToStaticMarkup(React.createElement(Discovery));
for (const item of LEARNING_DISCOVERY) {
  const article = item.articleId ? ARTICLES.find(article => article.id === item.articleId) : null;
  const lecture = item.lectureId ? CURRICULUM_DATA.flatMap(stage => stage.lectures).find(lecture => lecture.id === item.lectureId) : null;
  assert(article || lecture);
  let anchor;
  if (item.anchor) {
    assert(ARTICLE_READING_GUIDES[item.articleId].inserts.some(insert => `reading-figure-${insert.figure.id}` === item.anchor));
    anchor = item.anchor;
  } else {
    const index = parseMarkdownBlocks((article || lecture).contentMarkdown).findIndex(block => block.type === 'h2' && block.content === item.heading);
    assert(index >= 0, item.id + ' heading exists');
    anchor = `${article ? 'article' : 'curriculum'}-heading-${index}`;
  }
  assert(discoveryHtml.includes(`#${anchor}`), item.id + ' resolves to a real rendered anchor');
}
const { ALL_NAV_ITEMS } = load('src/config/navigationItems');
assert.equal(ALL_NAV_ITEMS.curriculum.href, '/learn');
assert.equal(ALL_NAV_ITEMS.review.href, '/kokushi#learning-review');
console.log(JSON.stringify({ passed: true, navigationCases, overlappingCourses: 2, discoveryAnchors: LEARNING_DISCOVERY.length, mobileDestinations: 2 }));

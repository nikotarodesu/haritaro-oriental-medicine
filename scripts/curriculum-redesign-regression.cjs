/* eslint-disable @typescript-eslint/no-require-imports -- Verify curriculum navigation and content contracts offline. */
const assert = require('node:assert/strict');
const { createDataLoader } = require('./data-loader.cjs');
const load = createDataLoader();
const { CURRICULUM_DATA, getCurriculumStats } = load('src/data/curriculumData');
const { CURRICULUM_CHAPTERS_META, CURRICULUM_TOTAL_LESSONS, FIRST_CURRICULUM_LECTURE_ID } = load('src/data/curriculumOutline');
const { CURRICULUM_QUIZZES } = load('src/data/curriculumQuizzes');
const { LEARNING_COURSES } = load('src/data/learningCourses');
const { COURSE_MINI_CASES } = load('src/data/courseMiniCases');
const { getHomeLearningEntry } = load('src/utils/homeLearningEntry');
const { readCourseMiniCase, resolveCourseJourney } = load('src/utils/courseJourney');
const { parseMarkdownBlocks } = load('src/utils/markdownParser');
const lectures = CURRICULUM_DATA.flatMap(stage => stage.lectures);
const ids = lectures.map(lecture => lecture.id);
const idSet = new Set(ids);
const same = (a, b, label) => assert.equal(JSON.stringify(a), JSON.stringify(b), label);

assert.equal(FIRST_CURRICULUM_LECTURE_ID, 'lecture-intro-1', 'New learners begin with the overview');
same(CURRICULUM_CHAPTERS_META.map(chapter => chapter.seriesId), ['intro', 'yinyang', 'qiblood', 'zangfu', 'lifedynamics', 'wuxing', 'meridians', 'pathomechanism', 'diagnosis', 'treatment', 'practice'], 'Prerequisite order: roles and organs before relations and clinical reasoning');
same(ids, CURRICULUM_CHAPTERS_META.flatMap(chapter => chapter.lectureIds), 'Every chapter card and previous/next link uses the same ordered catalog');
assert.equal(idSet.size, lectures.length, 'No duplicate lecture IDs');
assert.equal(lectures.length, CURRICULUM_TOTAL_LESSONS);
assert.equal(getCurriculumStats().totalPublishedLessons, lectures.length);
for (const [series, count] of Object.entries({ yinyang: 8, wuxing: 8, qiblood: 5, lifedynamics: 12, pathomechanism: 12, diagnosis: 12, treatment: 12, practice: 12 })) {
  for (let index = 1; index <= count; index++) assert(idSet.has(`lecture-${series}-${index}`), 'Preserve existing public URLs and progress IDs');
}

for (const stage of CURRICULUM_DATA) for (const lecture of stage.lectures) {
  const chapter = CURRICULUM_CHAPTERS_META.find(item => item.seriesId === lecture.seriesId);
  assert(chapter, `${lecture.id}: chapter exists`);
  assert.equal(lecture.stageId, stage.id);
  assert.equal(lecture.stageTitle, stage.title);
  assert.equal(lecture.lectureNumber, chapter.chapterNumber);
  const quiz = CURRICULUM_QUIZZES[lecture.id];
  assert(quiz, `${lecture.id}: comprehension quiz exists`);
  assert.equal(quiz.lectureTitle, lecture.title);
  assert.equal(quiz.chapterId, lecture.seriesId);
  assert.equal(quiz.questions.length, 3);
  const headings = parseMarkdownBlocks(lecture.contentMarkdown).filter(block => ['h2', 'h3', 'h4'].includes(block.type)).map(block => block.content);
  for (const question of quiz.questions) if (question.relatedSectionTitle) assert(headings.includes(question.relatedSectionTitle), `${question.id}: explanation links to an existing section`);
  for (const match of lecture.contentMarkdown.matchAll(/\]\(\/curriculum\/([a-z0-9-]+)(?:[?#][^)]*)?\)/g)) assert(idSet.has(match[1]), `${lecture.id}: related lecture remains accessible`);
  if (['intro', 'zangfu', 'meridians'].includes(lecture.seriesId)) {
    assert(lecture.contentMarkdown.length >= 1000, `${lecture.id}: teaching content rather than a placeholder`);
    assert(lecture.references?.length > 0, `${lecture.id}: source scope is available`);
    assert(/架空|学習例/.test(lecture.contentMarkdown), `${lecture.id}: guided example`);
    assert(!/TODO|後日公開|準備中/.test(lecture.contentMarkdown), `${lecture.id}: published content complete`);
  }
}
assert.equal(Object.keys(CURRICULUM_QUIZZES).length, lectures.length, 'No orphaned or missing quiz');

for (const [index, course] of LEARNING_COURSES.entries()) {
  assert(course.steps.length >= 3 && course.steps.length <= 5, `${course.slug}: a short guided route remains distinct from the full curriculum`);
  assert.equal(course.prerequisiteSlug, LEARNING_COURSES[index - 1]?.slug);
  assert.equal(course.nextCourseSlug, LEARNING_COURSES[index + 1]?.slug);
  let previous = -1;
  for (const step of course.steps) {
    const position = ids.indexOf(step.lectureId);
    assert.equal(lectures[position]?.seriesId, course.seriesId, `${course.slug}: every step belongs to its chapter`);
    assert(position > previous, `${course.slug}: steps follow the teaching order`);
    previous = position;
  }
  assert(course.steps.some(step => step.lectureId === COURSE_MINI_CASES[course.seriesId]?.lectureId), `${course.slug}: reading the short example's theory keeps its return context`);
  const firstLecture = course.steps[0].lectureId;
  const params = new URLSearchParams(`miniCase=${course.seriesId}`);
  assert.equal(readCourseMiniCase(params, course.slug), course.seriesId);
  assert.equal(resolveCourseJourney(firstLecture, course.slug, course.seriesId).miniCaseId, course.seriesId);
  assert.equal(readCourseMiniCase(new URLSearchParams('miniCase=https://example.com'), course.slug), undefined);
  assert.equal(readCourseMiniCase(new URLSearchParams(`miniCase=${course.seriesId}&miniCase=${course.seriesId}`), course.slug), undefined);
  assert.equal(resolveCourseJourney(firstLecture, course.slug, 'unrelated').miniCaseId, undefined);
}
same(LEARNING_COURSES.map(course => course.seriesId), CURRICULUM_CHAPTERS_META.map(chapter => chapter.seriesId), 'Every chapter has exactly one guided course in the same order');
for (const [seriesId, terms] of Object.entries({ qiblood: ['滋養', '滋潤'], zangfu: ['受納', '運化'], lifedynamics: ['気血津液論', '臓腑論', '生命機能論'], wuxing: ['相生', '相剋'] })) {
  const example = COURSE_MINI_CASES[seriesId];
  assert(/学習場面/.test(example.presentation), `${seriesId}: the concept task is a teaching example, not a patient diagnosis`);
  for (const term of terms) assert(example.answer.includes(term), `${seriesId}: the answer explains the concrete concept ${term}`);
  assert(!/診断|治療|配穴/.test(example.question), `${seriesId}: early concept tasks do not demand advanced clinical decisions`);
}
assert.equal(getHomeLearningEntry(lectures, {}, null).href, '/learn/courses/oriental-medicine-introduction');
const previousLearner = getHomeLearningEntry(lectures, { 'lecture-yinyang-1': true }, 'lecture-yinyang-2');
assert.equal(previousLearner.href, '/curriculum/lecture-yinyang-2?course=yinyang-foundations', 'Existing learners resume their current course');
console.log(`Passed: ${lectures.length} lecture URLs, ${CURRICULUM_CHAPTERS_META.length} chapters, ${LEARNING_COURSES.length} ordered courses, quizzes, preserved progress and safe example return links.`);

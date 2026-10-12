/* eslint-disable @typescript-eslint/no-require-imports -- Same runner as the other regression suites. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const cache = new Map();
function load(name) {
  const file = path.resolve(root, name + (name.endsWith('.ts') ? '' : '.ts'));
  if (cache.has(file)) return cache.get(file);
  const exports = {}; cache.set(file, exports);
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  vm.runInNewContext(code, { exports, require: id => id.startsWith('@/') ? load('src/' + id.slice(2)) : id.startsWith('.') ? load(path.resolve(path.dirname(file), id)) : require(id) });
  return exports;
}
const { getCourseReadingMinutes } = load('src/utils/courseReadingTime');
const sample = { steps: [{ lectureId: 'b' }, { lectureId: 'a' }] };
const lectures = [{ id: 'a', duration: '2分' }, { id: 'unused', duration: '99分' }, { id: 'b', duration: '7分' }];
assert.equal(getCourseReadingMinutes(sample, lectures), 9, 'Sum only the selected course steps, matched by ID');
assert.throws(() => getCourseReadingMinutes(sample, lectures.slice(0, 1)), /Missing published reading estimate/);
assert.throws(() => getCourseReadingMinutes(sample, [{ ...lectures[0], isPublished: false }, lectures[2]]), /Missing published reading estimate/);
assert.throws(() => getCourseReadingMinutes({ steps: [{ lectureId: 'a' }] }, [{ id: 'a', duration: '未定' }]), /Missing published reading estimate/);
const { LEARNING_COURSES } = load('src/data/learningCourses');
const { CURRICULUM_DATA } = load('src/data/curriculumData');
const totals = Object.fromEntries(LEARNING_COURSES.map(course => [course.slug, getCourseReadingMinutes(course, CURRICULUM_DATA.flatMap(chapter => chapter.lectures))]));
assert.equal(Object.keys(totals).length, 11);
assert(Object.values(totals).every(minutes => Number.isInteger(minutes) && minutes > 0));
const { getPrescriptionCountLabel } = load('src/utils/prescriptionScorePresentation');
for (const [count, expected] of [[0, '未選択'], [1, '穴数による減点なし'], [4, '穴数による減点なし'], [5, '穴数による減点：15点'], [6, '穴数による減点：15点'], [7, '穴数による減点：30点']]) assert.equal(getPrescriptionCountLabel(count), expected);
if (process.argv.includes('--build-output')) {
  const html = route => fs.readFileSync(path.join(root, '.next/server/app', `${route}.html`), 'utf8').replace(/<!--[\s\S]*?-->/g, '');
  for (const [slug, minutes] of Object.entries(totals)) assert(html(`learn/courses/${slug}`).includes(`読む目安：約${minutes}分`), `${slug} served estimate matches selected steps`);
  for (const route of ['index', 'learn']) assert(html(route).includes('href="/curriculum/lecture-intro-1?course=oriental-medicine-introduction"'), `${route} links directly to the first course lecture`);
  assert(html('learn/courses/pathomechanism-foundations').includes('id="concept-comparison"'));
  const score = html('practice/haiketsu');
  assert(score.includes('配穴の構成バランス') && score.includes('構成表示の判定条件を見る'));
  assert(score.includes('穴数による減点なし'));
  assert(!score.includes('黄金比（2〜4穴）') && !score.includes('理想は40〜60%') && !score.includes('相殺のない秀逸な最小構成'));
  console.log('Built HTML passed: all 11 reading totals, both direct entries, shared-case comparison, live prescription classification and calculation scope.');
}
console.log(JSON.stringify({ passed: true, selectedStepAggregation: true, invalidEstimatesRejected: true, countLabelBoundaries: 6, readingMinutesByCourse: totals }));

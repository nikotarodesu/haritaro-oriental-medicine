/* eslint-disable @typescript-eslint/no-require-imports -- Public information regression. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { createDataLoader } = require('./data-loader.cjs');
const { generateFullGuide } = require('./generate-llms.cjs');
const load = createDataLoader();
const { ACUPOINTS_MASTER } = load('src/data/tsubo/acupointsMaster');
const { SYMPTOMS } = load('src/data/symptomData');
const { getAcupointByCode, getAcupointDetail, ALL_ACUPOINTS, TSUBOS, generateFaqLocationAnswer } = load('src/data/tsubo/index');
const root = path.resolve(__dirname, '..');
const full = generateFullGuide();
const short = fs.readFileSync(path.join(root, 'public/llms.txt'), 'utf8').replace(/\r\n/g, '\n').trimEnd();
assert(full.startsWith(short + '\n'), 'Full guide must share exactly the canonical scope and author disclosure');
assert(short.includes('https://www.haritaro.jp/learn/review#learning-review'), 'Canonical AI guidance keeps the lecture review destination');
assert(!/https:\/\/www\.haritaro\.jp\/kokushi(?:[\s)#?]|$)/.test(full), 'AI guidance must not keep a public link to the retired exam landing page');
assert(!/臑 sweat|東洋医学学術チーム|セルフ診断|斜刺浅刺指示|妊娠中刺激禁忌|undefined/.test(full), 'Stale unsupported claims or invalid generated content');
assert.match(full, /個人運営/);
assert.match(full, /専門家監修は未完了/);
assert.match(full, /疾患の除外や確定診断を行いません/);
const indexedPoints = Array.from(full.matchAll(/https:\/\/www\.haritaro\.jp\/tsubo\/[a-z]+\d+\)/g));
assert.equal(indexedPoints.length, 361, 'All 361 authoritative names/codes must appear exactly once');
for (const point of ACUPOINTS_MASTER) assert(full.includes(`[${point.name}（${point.code}）](https://www.haritaro.jp/tsubo/${point.codeLower})`), point.code);
for (const symptom of SYMPTOMS) assert(full.includes(`https://www.haritaro.jp/symptoms/${symptom.id}`), symptom.id);
for (const point of ACUPOINTS_MASTER) {
  const answer = generateFaqLocationAnswer(getAcupointDetail(point.code));
  assert(!/ありますに位置|ですに位置|。。/.test(answer), point.code + ': generated Japanese must not join complete sentences as noun phrases');
  assert(!/ズーン|酸脹点|指腹を滑らせ|圧迫時に特有/.test(answer), point.code + ': location FAQs must not suggest provoking a pressure response as a universal locator');
  assert.match(answer, /圧痛や響きの有無だけで位置を判断しない/);
  const note = getAcupointDetail(point.code).clinicalNote;
  assert.equal(getAcupointByCode(point.legacyId).clinicalNote, note, point.code + ': aliases use the same public learning note');
  assert.equal(ALL_ACUPOINTS.find(item => item.code === point.code).clinicalNote, note, point.code + ': public dictionary agrees with details');
  const legacyPoint = TSUBOS.find(item => item.code === point.code);
  if (point.status === 'published') assert.equal(legacyPoint.clinicalNote, note, point.code + ': published learning tools agree with details');
  else assert.equal(legacyPoint, undefined, point.code + ': legacy publication filter is preserved');
}
assert(!/回復させる/.test(getAcupointDetail('gv4').clinicalNote), 'GV4 must not promise recovery from an unverified moxibustion protocol');
assert(!/即座に消失/.test(getAcupointDetail('gb20').clinicalNote), 'GB20 must not promise immediate disappearance of symptoms');
assert(!/覚醒救急に著効/.test(getAcupointDetail('ki1').clinicalNote), 'KI1 must not claim efficacy in emergency awakening');
const { ATLAS_ARTICLES } = load('src/data/tsubo/atlas/articles');
const { POINT_ILLUSTRATIONS } = load('src/data/tsubo/atlas/illustrations');
const { ATLAS_POINT_MARKERS, shinEndpoints } = load('src/data/tsubo/atlas/markers');
const { digitLandmarks, digitGeometry } = load('src/data/tsubo/atlas/digits');
assert.deepEqual(Object.keys(ATLAS_POINT_MARKERS).sort(), [...new Set([...Object.keys(ATLAS_ARTICLES), ...Object.keys(POINT_ILLUSTRATIONS)])].sort(),
  'Every illustrated index link must have one complete diagram set');
// An inverted diagram still fits the viewBox. Compare each side to the WHO record.
const digitLocations = [
  ['lu11', 'hand', 1, 'firstSide', 40], ['li1', 'hand', 2, 'firstSide', 43],
  ['ht9', 'hand', 5, 'firstSide', 95], ['si1', 'hand', 5, 'fifthSide', 97],
  ['pc9', 'hand', 3, 'tip', 165], ['te1', 'hand', 4, 'fifthSide', 167],
  ['st45', 'foot', 2, 'fifthSide', 77], ['sp1', 'foot', 1, 'firstSide', 79],
  ['lr1', 'foot', 1, 'fifthSide', 205], ['gb44', 'foot', 4, 'fifthSide', 202],
  ['bl67', 'foot', 5, 'fifthSide', 142],
];
assert.match(ATLAS_ARTICLES.bl67.titleTopic, /妊娠中の注意/);
assert.match(ATLAS_ARTICLES.bl67.safetyWarning, /産科/);
for (const [code, distance, pdfPage] of [['pc4', 5, 162], ['pc5', 3, 163], ['pc7', 0, 164]]) {
  const marker = ATLAS_POINT_MARKERS[code];
  const article = ATLAS_ARTICLES[code];
  assert.equal((224 - marker.y) / 16, distance, code);
  assert.equal(article.illustration, POINT_ILLUSTRATIONS[code], code);
  assert(article.sources.some(source => source.url.endsWith('#page=' + pdfPage)), code);
  assert.match(article.safetyWarning, /119/);
}
for (const [code, part, number, position, pdfPage] of digitLocations) {
  const digit = digitLandmarks[code];
  assert.deepEqual({ ...digit }, { part, number, position, pdfPage }, code);
  const marker = ATLAS_POINT_MARKERS[code];
  const geometry = digitGeometry(digit);
  const article = ATLAS_ARTICLES[code];
  assert.equal(marker.x, position === 'tip' ? geometry.centre : position === 'firstSide' ? geometry.left : geometry.right, code);
  assert.equal(marker.y, position === 'tip' ? geometry.tipY : geometry.nailBase, code);
  assert(article.sources.some(source => source.url.endsWith('#page=' + pdfPage)), code);
  assert.equal(article.illustration.region, part === 'hand' ? 'finger' : 'toe', code);
  for (const related of article.relatedPoints) assert(getAcupointByCode(related.code), code);
  const body = [article.lead, ...article.location, ...article.traditional, ...article.selfCare, ...article.cautions, ...article.expert, ...article.relatedPoints.map(p => p.text)].join('');
  assert(body.length >= 700 && body.length <= 900, code + ' article length');
}
for (const [code, distance, page] of [['st37', 6, 64], ['st38', 8, 65], ['st39', 9, 65]]) {
  const article = ATLAS_ARTICLES[code];
  const marker = ATLAS_POINT_MARKERS[code];
  const { knee, ankle } = shinEndpoints;
  assert.equal(marker.boneCun, distance, code);
  for (const axis of ['x', 'y']) assert.equal((marker[axis] - knee[axis]) / (ankle[axis] - knee[axis]), distance / 16, code);
  assert(article.sources.some(source => source.url.endsWith('#page=' + (page + 9)) && source.name.includes('p.' + page)), code);
  assert(article.expert.join('').includes(distance + '寸'), code);
  assert(article.illustration.meridianStart <= Number(code.slice(2)) && Number(code.slice(2)) <= article.illustration.meridianEnd, code);
}
console.log('Passed: canonical AI guidance, 361 public acupoint URLs, symptom URLs, consistent public learning notes and location FAQ safety.');

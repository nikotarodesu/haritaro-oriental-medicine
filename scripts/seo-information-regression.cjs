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
console.log('Passed: canonical AI guidance, 361 public acupoint URLs, symptom URLs, consistent public learning notes and location FAQ safety.');

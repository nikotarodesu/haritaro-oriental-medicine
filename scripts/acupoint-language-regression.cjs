/* eslint-disable @typescript-eslint/no-require-imports -- Offline source and data-consumer verification. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const { createDataLoader } = require('./data-loader.cjs');
const load = createDataLoader();
const points = load('src/data/tsubo/index');
const friendly = load('src/data/tsubo/friendlyLocations');
const dimensions = text => Array.from(text.matchAll(/\d+(?:\.\d+)?寸/g), match => match[0]);

assert.equal(points.ALL_ACUPOINTS.length, 361);
assert.equal(new Set(points.ALL_ACUPOINTS.map(point => point.code)).size, 361);
for (const point of points.ALL_ACUPOINTS) {
  const generated = friendly.simplifyLocationText(point.locationDetail);
  assert.deepEqual(dimensions(generated), dimensions(point.locationDetail), `${point.code}: preserve every original cun value, including decimals`);
  assert(!/乳頭のライン|胸と肩の境目近く|腕（またはすね）|約半分強|\d\.指/.test(generated), `${point.code}: no unit-derived anatomical substitution`);
  const detail = points.getAcupointDetail(point.code);
  assert(detail?.locationSimple, `${point.code}: final detail consumer returns location text`);
  assert.equal(detail.procedureReviewStatus, 'pending_expert_review');
}
assert.match(points.getAcupointDetail('li8').locationSimple, /肘.*4骨度分寸/);
assert.match(points.getAcupointDetail('sp13').locationSimple, /4\.3骨度分寸.*4骨度分寸/);
assert.match(points.getAcupointDetail('sp8').locationSimple, /陰陵泉.*下方3骨度分寸/);
assert.match(points.getAcupointDetail('gb30').locationSimple, /外側から3分の1.*代替位置/);
assert.match(points.getAcupointDetail('gv26').locationSimple, /中点.*代替位置/);
assert.match(friendly.simplifyLocationText('頭部、百会の後方1.5寸、後正中線上。'), /頭の正中線上/);
assert(!friendly.simplifyLocationText('頭部、百会の後方1.5寸、後正中線上。').includes('背骨'));
assert.match(friendly.simplifyLocationText('前頸部、小鎖骨上窩、胸鎖乳突筋の両頭間。'), /小鎖骨上窩（/);
assert(!friendly.simplifyLocationText('前頸部、小鎖骨上窩、胸鎖乳突筋の両頭間。').includes('小鎖骨の上'));
assert.match(friendly.simplifyLocationText('顔面部、上唇結節の中央。'), /上唇の中央のふくらみ/);
assert(!friendly.simplifyLocationText('顔面部、上唇結節の中央。').includes('骨のでっぱり'));
const foot = friendly.simplifyLocationText('足母趾内側、第1中足趾節関節の遠位陥凹部、赤白肉際。');
assert.match(foot, /足の甲側と足の裏側/);
assert(!foot.includes('手のひら'));

const pc6 = points.getAcupointDetail('pc6').researchEvidence;
assert(pc6.sources.some(source => source.pmid === '40938065'));
assert.match(pc6.findings, /77試験・9,847人/);
assert.match(pc6.findings, /0\.67.*0\.58/);
assert.match(pc6.limitations, /他の経穴.*対象外/);
const st25 = points.getAcupointDetail('st25').researchEvidence;
assert(st25.sources.some(source => source.pmid === '27618593'));
assert.match(st25.findings, /1,075人.*8週間・28回/);
assert.match(st25.findings, /群間差0\.90回.*0\.74〜1\.10/);
assert.match(st25.mechanisms.join(' '), /腹結.*上巨虚/);
assert.match(st25.limitations, /天枢単独.*過敏性腸症候群/);
assert.match(points.getAcupointDetail('st25').clinicalNote, /掲載を保留/, 'Research section must not bypass the legacy clinical-note publication filter');
const pageSource = fs.readFileSync('src/app/tsubo/[code]/page.tsx', 'utf8');
assert(pageSource.includes('point.researchEvidence.sources.map'), 'Research sources must be displayed as links');
const kikei = load('src/data/kikeiData');
assert.equal(kikei.KIKEI_VESSELS.length, 8);
assert.equal(kikei.HACHIMYAKU_PAIRS.length, 4);
assert(!/即効性があります|絶大な効果|自律神経をリセット|素晴らしい効果|第一選択です/.test(JSON.stringify(kikei)));
console.log('Acupoint language: 361 unique points, preserved generated cun values, concrete WHO positions, scoped PC6/ST25 evidence, unchanged publication and procedure filters.');

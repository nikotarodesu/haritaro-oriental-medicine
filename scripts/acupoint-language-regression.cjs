/* eslint-disable @typescript-eslint/no-require-imports -- Offline source and data-consumer verification. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const { createDataLoader } = require('./data-loader.cjs');
const load = createDataLoader();
const points = load('src/data/tsubo/index');
const friendly = load('src/data/tsubo/friendlyLocations');
const { ATLAS_ARTICLES } = load('src/data/tsubo/atlas/articles');
const { formatPublicAtlasLocation } = load('src/data/tsubo/atlas/expanded/profiles');
const dimensions = text => Array.from(text.matchAll(/\d+(?:\.\d+)?寸/g), match => match[0]);

assert.equal(points.ALL_ACUPOINTS.length, 361);
assert.equal(new Set(points.ALL_ACUPOINTS.map(point => point.code)).size, 361);
for (const point of points.ALL_ACUPOINTS) {
  const generated = friendly.simplifyLocationText(point.locationDetail);
  assert.deepEqual(dimensions(generated), dimensions(point.locationDetail), `${point.code}: preserve every original cun value, including decimals`);
  assert(!/乳頭のライン|胸と肩の境目近く|腕（またはすね）|約半分強|\d\.指/.test(generated), `${point.code}: no unit-derived anatomical substitution`);
  const detail = points.getAcupointDetail(point.code);
  assert(detail?.locationSimple, `${point.code}: final detail consumer returns location text`);
  const summary = formatPublicAtlasLocation(point.codeLower) ?? ATLAS_ARTICLES[point.codeLower]?.locationSummary;
  if (point.code !== 'LI4') assert(summary, `${point.code}: authored public atlas location`);
  const publicLocation = friendly.getAtlasLocationSimple(point.code);
  assert.equal(publicLocation, summary ?? point.locationSimple);
  assert.equal(detail.locationSimple, publicLocation);
  assert.equal(points.getAcupointByCode(point.code).locationSimple, publicLocation);
  assert.equal(point.locationSimple, publicLocation, `${point.code}: dictionary view uses the same atlas location`);
  assert.equal(detail.procedureReviewStatus, 'pending_expert_review');
}
assert.match(friendly.getAtlasLocationSimple('li4'), /人差し指につながる骨の長さの中央から少し親指側/);
assert.match(friendly.getAtlasLocationSimple('pc6'), /手首のしわ.*ひじまでの長さの6分の1/);
assert.match(friendly.getAtlasLocationSimple('st36'), /結ぶ線上で、ひざ側から3寸/);
assert.match(friendly.getAtlasLocationSimple('st37'), /結ぶ線上で、ひざ側から6寸/);
assert.match(friendly.getAtlasLocationSimple('sp6'), /内くるぶしから上へ3寸/);
assert.match(friendly.getAtlasLocationSimple('lr3'), /足首側で近づくところより少し指先側/);
assert.doesNotMatch(friendly.getAtlasLocationSimple('lr3'), /脈|拍動/);
assert.match(ATLAS_ARTICLES.pc6.location.join(' '), /12等分.*手首からひじへ二つ分/);
assert.match(ATLAS_ARTICLES.st36.location.join(' '), /16等分.*膝のくぼみから足首側へ三つ分/);
assert.match(ATLAS_ARTICLES.sp6.location.join(' '), /13等分.*内くるぶしから上へ3つ分/);
for (const code of ['pc6', 'st36', 'st37', 'sp6']) {
  const article = ATLAS_ARTICLES[code];
  assert.doesNotMatch([friendly.getAtlasLocationSimple(code), ...article.location, article.illustration.closeUpCaption].join(' '),
    /[34]本(?:分|の幅|をそろ)/, `${code}: proportional units must not become a fixed finger count`);
}
assert.equal(friendly.getFriendlyLocationSimple({
  codeLower: 'unlisted', locationDetail: '手背、中指へ向かう骨の中央。',
}), '手の甲、中指へ向かう骨の中央。');
assert.match(points.getAcupointDetail('li8').locationSimple, /ひじのしわ.*4寸.*寸は体の区間/);
assert.match(points.getAcupointDetail('sp13').locationSimple, /おへその中心から下へ4\.3寸.*横へ4寸/);
assert.match(points.getAcupointDetail('sp8').locationSimple, /陰陵泉.*下へ3寸/);
assert.match(points.getAcupointDetail('gb30').locationSimple, /外側から3分の1.*代替位置/);
assert.match(points.getAcupointDetail('gv26').locationSimple, /溝の中央.*代替位置/);
assert.match(points.getAcupointDetail('lu2').locationSimple, /横へ6寸.*肩甲骨の前の突起より内側/);
assert.match(points.getAcupointDetail('si4').locationSimple, /甲と手のひらの境の小指側.*骨の根元と手首の小さな骨の間/);
assert.match(points.getAcupointDetail('gv15').locationSimple, /第2頸椎.*突起より上/);
assert.match(points.getAcupointDetail('gv27').locationSimple, /上唇の中央.*ふくらみの上縁/);
assert(ATLAS_ARTICLES.gv27.sources.some(({ url }) => url === 'https://www.idononippon.com/book/errata/3419/'));
for (const [code, standard, alternative] of [
  ['li19', /人中の中ほど/, /代替位置.*上から3等分した最初の境目/],
  ['li20', /小鼻の外のふくらみの中ほど/, /代替位置.*小鼻の下端/],
  ['pc8', /人差し指と中指/, /代替位置.*中指と薬指/],
]) {
  assert.match(friendly.getAtlasLocationSimple(code), standard);
  assert.match(ATLAS_ARTICLES[code].expert.join(' '), alternative);
  assert.match(ATLAS_ARTICLES[code].illustration.closeUpAlt, standard);
  assert.doesNotMatch(ATLAS_ARTICLES[code].illustration.closeUpAlt, /代替位置/);
}
for (const [code, romaji] of Object.entries({
  ST15: 'Wuyi', ST19: 'Burong', BL2: 'Cuanzhu', BL18: 'Ganshu', BL20: 'Pishu', BL30: 'Baihuanshu',
  BL61: 'Pucan', TE11: 'Qinglengyuan', TE18: 'Chimai', TE22: 'Erheliao', GB16: 'Muchuang', GB18: 'Chengling',
})) assert.equal(points.getAcupointByCode(code).romaji, romaji);
assert(points.getAcupointByCode('bl61').aliases.includes('Pushen'));
assert(points.getAcupointByCode('te18').aliases.includes('Qimai'));
assert(points.getAcupointByCode('te22').aliases.includes('耳和髎'));
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
const researchSource = fs.readFileSync('src/components/tsubo/AcupointResearch.tsx', 'utf8');
assert.match(researchSource, /study\.sources\.map\(source => .*<a href=\{source\.url\}/, 'Research sources must be displayed as links');
const kikei = load('src/data/kikeiData');
assert.equal(kikei.KIKEI_VESSELS.length, 8);
assert.equal(kikei.HACHIMYAKU_PAIRS.length, 4);
assert(!/即効性があります|絶大な効果|自律神経をリセット|素晴らしい効果|第一選択です/.test(JSON.stringify(kikei)));
console.log('Acupoint language: 361 unique points, preserved generated cun values, concrete WHO positions, scoped PC6/ST25 evidence, unchanged publication and procedure filters.');

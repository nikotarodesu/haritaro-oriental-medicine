/* eslint-disable @typescript-eslint/no-require-imports -- Offline source and data-consumer verification. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const { createDataLoader } = require('./data-loader.cjs');
const load = createDataLoader();
const points = load('src/data/tsubo/index');
const friendly = load('src/data/tsubo/friendlyLocations');
const { ATLAS_ARTICLES } = load('src/data/tsubo/atlas/articles');
const { formatPublicAtlasLocation } = load('src/data/tsubo/atlas/expanded/profiles');
const { getAcupointName } = load('src/data/tsubo/names/index');
const { STANDARD_NAMES } = load('src/data/tsubo/names/standardNames');
const { NAME_READINGS } = load('src/data/tsubo/names/nameReadings');
const { CHARACTER_MEANINGS } = load('src/data/tsubo/names/characterMeanings');
const { getAcupointNameCharacter, acupointNameIndexHref, NAME_INDEX_EXAMPLES } = load('src/data/tsubo/names/characterIndex');
const { NEARBY_COMPARISONS, getNearbyComparisons, comparisonSize, comparisonTransforms } = load('src/data/tsubo/atlas/nearbyComparisons');
const { ATLAS_POINT_MARKERS, shinEndpoints, volarForearmGeometry } = load('src/data/tsubo/atlas/markers');
const dimensions = text => Array.from(text.matchAll(/\d+(?:\.\d+)?寸/g), match => match[0]);

assert.equal(points.ALL_ACUPOINTS.length, 361);
assert.equal(new Set(points.ALL_ACUPOINTS.map(point => point.code)).size, 361);
const allCodes = Array.from(points.ALL_ACUPOINTS, point => point.codeLower).sort();
assert.deepEqual(Object.keys(STANDARD_NAMES).sort(), allCodes);
assert.deepEqual(Object.keys(NAME_READINGS).sort(), allCodes);
assert.equal(new Set(Object.values(NAME_READINGS)).size, allCodes.length, 'Each point has its own name explanation');
assert.deepEqual(
  Object.keys(CHARACTER_MEANINGS).sort(),
  [...new Set(Object.values(STANDARD_NAMES).flatMap(([chinese]) => [...chinese]))].sort(),
);
for (const code of allCodes) {
  const name = getAcupointName(code);
  assert.match(name.chinese, /^\p{Script=Han}{2,4}$/u, code);
  assert.match(name.pinyin.normalize('NFD'), /[\u0300-\u0304\u030C]/u, code + ' has a tone mark');
  assert(name.characters.every(({ meaning }) => meaning?.length > 0), code + ' has a gloss for each character');
  assert.match(name.standardUrl, /202306192125376309\.pdf#page=\d+$/, code);
  assert.match(name.nomenclatureUrl, /s7143e\.pdf#page=\d+$/, code);
}
assert.equal(getAcupointName('li4').pinyin, 'Hégǔ');
assert.match(getAcupointName('li4').history.text, /虎口/);
assert.match(getAcupointName('st36').reading, /里.*寸/);
assert.equal(getAcupointName('lr3').chinese, '太冲');
assert.equal(getAcupointName('pc6').pinyin, 'Nèiguān');
assert.deepEqual(Array.from(getAcupointName('te22').characters, ({ character }) => character), ['耳', '和', '髎']);
assert.equal(getAcupointName('gv20').pinyin, 'Bǎihuì');
assert.equal(getAcupointName('cv17').pinyin, 'Dànzhōng');
const indexedCodes = character => Array.from(getAcupointNameCharacter(character).points, point => point.codeLower);
assert(['li4', 'st43', 'ki10'].every(code => indexedCodes('谷').includes(code)));
assert.deepEqual(indexedCodes('沢'), indexedCodes('泽'));
assert.deepEqual(indexedCodes('溪'), indexedCodes('渓'));
assert.deepEqual(indexedCodes('溪'), indexedCodes('谿'));
assert(indexedCodes('耳').includes('te22'), 'Chinese-only leading character remains searchable');
assert(new Set(indexedCodes('髎')).size === indexedCodes('髎').length);
assert.equal(getAcupointNameCharacter('合谷'), undefined);
assert.equal(getAcupointNameCharacter(''), undefined);
assert.equal(acupointNameIndexHref('谷'), '/tsubo/names?kanji=%E8%B0%B7');
for (const character of NAME_INDEX_EXAMPLES) assert(indexedCodes(character).length > 1, character);
const compared = new Set();
for (const group of NEARBY_COMPARISONS) {
  assert(group.points.length >= 3, group.id);
  assert.equal(new Set(group.points.map(point => point.code)).size, group.points.length, group.id + ' has distinct choices');
  if (group.question) assert(group.points.some(point => point.code === group.question.answerCode), group.id + ' offers its correct answer');
  const { width, height } = group.size ?? comparisonSize;
  for (const point of group.points) {
    assert(ATLAS_ARTICLES[point.code], point.code + ' has a public atlas article');
    assert(getNearbyComparisons(point.code).includes(group), point.code + ' displays this comparison');
    assert(point.difference.length > 0, point.code + ' has a short distinguishing landmark');
    for (const [x, y] of [point.position, point.button, point.leader]) {
      assert(x > 0 && x < width && y > 0 && y < height, point.code + ' is inside the figure');
    }
    compared.add(point.code);
  }
}
assert.deepEqual(Array.from(getNearbyComparisons('te21')[0].points, point => point.code), ['te21', 'si19', 'gb2']);
assert.equal(getNearbyComparisons('li4').length, 0);
const shin = getNearbyComparisons('st35')[0];
assert.equal(shin.id, 'shin');
assert.equal(getNearbyComparisons('st41')[0].id, shin.id);
assert.deepEqual(Array.from(shin.points, point => point.code), ['st36', 'st37', 'st38'], 'The two references are not selectable comparison points');
for (const [index, point] of shin.points.entries()) {
  const amount = [3, 6, 8][index];
  const { x, y, boneCun } = ATLAS_POINT_MARKERS[point.code];
  const transform = comparisonTransforms.shin;
  assert.equal(boneCun, amount, point.code);
  assert.deepEqual(Array.from(point.position), [transform.x + x * transform.scaleX, transform.y + y * transform.scaleY]);
  assert.equal((y - shinEndpoints.knee.y) / (shinEndpoints.ankle.y - shinEndpoints.knee.y), amount / 16);
  assert(point.difference.includes(`下へ${amount}寸`), point.code + ' agrees with its verified atlas position');
}
assert.deepEqual(Array.from(getNearbyComparisons('pc6'), group => group.id), ['wrist', 'forearm']);
const forearm = getNearbyComparisons('pc4')[0];
assert.deepEqual(Array.from(forearm.points, point => point.code), ['pc6', 'pc5', 'pc4']);
const { wristY, elbowY, units } = volarForearmGeometry;
for (const [index, point] of forearm.points.entries()) {
  const amount = [2, 3, 5][index];
  const { x, y, boneCun } = ATLAS_POINT_MARKERS[point.code];
  assert.equal(boneCun, amount, point.code);
  assert.equal((wristY - y) / (wristY - elbowY), amount / units);
  assert.deepEqual(Array.from(point.position), [x + comparisonTransforms.forearm.x, y + comparisonTransforms.forearm.y]);
  assert(point.difference.includes(`ひじへ${amount}寸`), point.code);
}
const { ATLAS_LEARNING_PAIRS } = load('src/data/tsubo/atlas/learningPairs');
for (const pair of ATLAS_LEARNING_PAIRS) assert(pair.codes.includes(pair.question.answerCode), pair.codes.join(', '));
for (const point of points.ALL_ACUPOINTS) {
  for (const character of new Set(point.name + getAcupointName(point.codeLower).chinese)) {
    assert(indexedCodes(character).includes(point.codeLower), point.code + ' is indexed under ' + character);
  }
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
assert.match(ATLAS_ARTICLES.st36.location.join(' '), /16等分.*ひざのくぼみから足首側へ3寸/);
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
console.log(`Acupoint language: 361 sourced explanations and index entries, ${compared.size} points in ${NEARBY_COMPARISONS.length} comparisons, preserved cun values, WHO positions, and scoped evidence and procedure filters.`);

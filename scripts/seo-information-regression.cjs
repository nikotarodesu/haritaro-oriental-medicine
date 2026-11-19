/* eslint-disable @typescript-eslint/no-require-imports -- Public information regression. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { createDataLoader } = require('./data-loader.cjs');
const { generateFullGuide } = require('./generate-llms.cjs');
const load = createDataLoader();
const { ACUPOINTS_MASTER } = load('src/data/tsubo/acupointsMaster');
const { SYMPTOMS } = load('src/data/symptomData');
const { getAcupointByCode, getAcupointDetail, getMeridianPoints, ALL_ACUPOINTS, TSUBOS, generateFaqLocationAnswer } = load('src/data/tsubo/index');
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
const { footLandmarks, medialFootLandmarks } = load('src/data/tsubo/atlas/footLandmarks');
const { legLandmarks, soleEndpoints, poplitealY, medialAnkleY, posteriorKnee, outerShinAnkle, tiaokouReference } = load('src/data/tsubo/atlas/legLandmarks');
const { expandedPoints } = load('src/data/tsubo/atlas/expanded/profiles');
const { posteriorThigh, sacralLandmarks } = load('src/data/tsubo/atlas/expanded/back');
const { posteriorShoulder } = load('src/data/tsubo/atlas/expanded/arms');
const { profileLandmarks } = load('src/data/tsubo/atlas/expanded/head');
const { getAcupointGuideLinks } = load('src/utils/symptomGuides');
const { whoAtlasPages } = load('src/data/tsubo/atlas/whoAtlasPages');
const expandedViews = Object.assign({}, ...['head', 'arm', 'trunk', 'back'].map(group =>
  load(`src/components/tsubo/atlas/expanded/${group}Views`)[`${group}Views`]
));
assert.deepEqual(Object.keys(ATLAS_POINT_MARKERS).sort(), [...new Set([...Object.keys(ATLAS_ARTICLES), ...Object.keys(POINT_ILLUSTRATIONS)])].sort(),
  'Every illustrated index link must have one complete diagram set');
assert.deepEqual(['li4', ...Object.keys(ATLAS_ARTICLES)].sort(), Array.from(ACUPOINTS_MASTER, point => point.codeLower).sort(),
  'Every standard point has a full atlas article, including the dedicated LI4 page');
assert.deepEqual(Object.keys(expandedPoints).sort(), Object.keys(whoAtlasPages).sort(),
  'Every added point links directly to its page in the WHO manual');
assert.equal(Object.keys(expandedPoints).length, 284);
for (const [code, point] of Object.entries(expandedPoints)) {
  const master = getAcupointByCode(code);
  const article = ATLAS_ARTICLES[code];
  const illustration = article.illustration;
  const marker = ATLAS_POINT_MARKERS[code];
  assert(illustration.region === 'expanded' && marker.expanded === point, code);
  for (const id of point.landmarks) {
    const feature = expandedViews[point.view].features[id];
    assert(feature, code + ' landmark ' + id);
    const [x, y] = feature.position;
    assert(Math.hypot(x - marker.x, y - marker.y) >= 14, code + ' landmark number must not obscure the point');
  }
  assert.equal(new Set(point.landmarks).size, point.landmarks.length, code);
  assert(article.sources[0].url.endsWith('#page=' + whoAtlasPages[code]), code);
  assert(illustration.meridianStart <= master.meridianOrder && master.meridianOrder <= illustration.meridianEnd, code);
  assert(getMeridianPoints(getAcupointDetail(code).meridianId).some(other => other.codeLower === code), code + ' renders its position in the meridian');
  assert(!article.relatedPoints.some(other => other.code === code || !getAcupointByCode(other.code)), code);
  assert(article.symptomLinks.every(({ href }) => href === '/symptoms' || SYMPTOMS.some(guide => href === '/symptoms/' + guide.id)), code);
  assert(master.locationSimple.startsWith(point.location), code + ' search and title data agree with the article');
  const body = [article.lead, article.safetyWarning, ...article.location, ...article.traditional, ...article.selfCare, ...article.cautions, ...article.expert, ...article.relatedPoints.map(other => other.text)].join('');
  assert(body.length >= 700 && body.length <= 900, code + ' article length ' + body.length);
}
for (const code of ['bl1', 'st9', 'lu1', 'lu8', 'ht1', 'si8', 'sp11', 'cv8', 'cv1', 'gv1', 'gb21']) {
  assert(ATLAS_ARTICLES[code].visualOnly, code + ' must use the visual orientation instructions');
}
assert.match(ATLAS_ARTICLES.cv17.safetyWarning, /胸痛.*動悸.*119/);
assert.match(ATLAS_ARTICLES.gb21.safetyWarning, /妊娠中.*産科/);
assert(Object.values(ATLAS_ARTICLES).every(article =>
  article.sources.some(({ url }) => /^https:\/\/iris\.who\.int\/.*#page=\d+$/.test(url))
), 'Every atlas article links to the specific page in the WHO publication');
assert.equal(expandedPoints.st30.y, expandedPoints.lr12.y, 'Both groin points align with the upper end of the pubic symphysis');
assert(expandedPoints.st30.x < expandedPoints.lr12.x && expandedPoints.st30.landmarks.includes('femoral'));
assert.equal(expandedPoints.sp12.y, expandedPoints.st30.y, 'SP12 aligns with the superior border of the pubic symphysis');
assert(expandedPoints.sp12.x > expandedPoints.st30.x, 'SP12 sits lateral to the femoral artery');
assert.equal(expandedPoints.gv2.y, expandedPoints.bl34.y, 'The hiatus lines up with the fourth posterior sacral foramen');
const { foramina, hiatus, midlineX, posteriorIliacSpine, trochanter } = sacralLandmarks;
for (const [row, opening, index] of [['bl27', 'bl31', 0], ['bl28', 'bl32', 1], ['bl29', 'bl33', 2], ['bl30', 'bl34', 3]]) {
  assert.equal(expandedPoints[row].y, expandedPoints[opening].y, row + ' shares the height of the foramen');
  assert.equal(expandedPoints[opening].x, foramina[index].x);
  assert(expandedPoints[row].x - expandedPoints[opening].x >= 12, row + ' marker must not overlap the drawn foramen');
}
assert.equal(expandedPoints.bl32.x, (midlineX + posteriorIliacSpine.x) / 2);
assert(expandedPoints.gb30.y - expandedPoints.bl54.y > 12, 'GB30 and BL54 must be distinguishable in the posterior diagram');
for (const axis of ['x', 'y']) {
  assert(Math.abs(3 * (expandedPoints.gb30[axis] - trochanter[axis]) - (hiatus[axis] - trochanter[axis])) < 0.01,
    'GB30 lies one third of the way from the greater trochanter to the hiatus');
}
const thighCun = (posteriorThigh.poplitealCreaseY - expandedPoints.bl36.y) / 14;
assert.equal(expandedPoints.bl37.y - expandedPoints.bl36.y, 6 * thighCun);
assert.equal(posteriorThigh.poplitealCreaseY - expandedPoints.bl38.y, thighCun);
assert(expandedPoints.bl38.x < posteriorThigh.lateralTendonX);
assert.equal(expandedPoints.si9.x, posteriorShoulder.axillaryFold.x);
assert.equal(posteriorShoulder.axillaryFold.y - expandedPoints.si9.y, 17);
const { inner, outer } = posteriorShoulder.scapulaRidge;
for (const axis of ['x', 'y']) {
  const midpoint = (inner[axis] + outer[axis]) / 2;
  assert(Math.abs(3 * (expandedPoints.si11[axis] - midpoint) - (posteriorShoulder.scapulaTip[axis] - midpoint)) < 0.01,
    'SI11 lies one third of the way from the scapular ridge midpoint to the inferior angle');
}
assert.equal(expandedPoints.te20.x, profileLandmarks.earApex[0]);
assert.equal(expandedPoints.gb7.y, profileLandmarks.earApex[1]);
assert.equal(expandedPoints.gb8.y, expandedPoints.gb9.y);
assert(expandedPoints.gb9.x > expandedPoints.gb8.x);
assert(expandedPoints.gb12.x > profileLandmarks.mastoidTip[0] && expandedPoints.gb12.y > profileLandmarks.mastoidTip[1]);
for (const code of ['gb27', 'gb28']) {
  assert.equal(expandedPoints[code].view, 'abdomen', code + ' must show direction relative to the midline');
  assert(expandedPoints[code].landmarks.includes('anteriorIliac'), code);
}
// Sample the visible rib paths so a marker cannot pass a coordinate check while touching a rib.
function assertIntercostalMarkers(view, feature, pathsPerRib, firstRibNumber, cases) {
  const ribPaths = [...expandedViews[view].features[feature].path.matchAll(/M(\d+(?:\.\d+)?) (\d+(?:\.\d+)?)Q(\d+(?:\.\d+)?) (\d+(?:\.\d+)?) (\d+(?:\.\d+)?) (\d+(?:\.\d+)?)/g)]
    .map((match) => match.slice(1).map(Number));
  assert(ribPaths.length > 0, view + ' must expose visible rib paths');
  for (const [code, intercostal] of cases) {
    const point = expandedPoints[code];
    for (const [ribIndex, abovePoint] of [[intercostal, true], [intercostal + 1, false]]) {
      const [startX, startY, controlX, controlY, endX, endY] = ribPaths[(ribIndex - firstRibNumber) * pathsPerRib];
      assert(point.x >= startX && point.x <= endX, code + ': ribs must extend through the marker column');
      let closestColumn = { xDistance: Infinity, y: 0 };
      let closestDistance = Infinity;
      for (let i = 0; i <= 128; i += 1) {
        const t = i / 128;
        const u = 1 - t;
        const x = u * u * startX + 2 * u * t * controlX + t * t * endX;
        const y = u * u * startY + 2 * u * t * controlY + t * t * endY;
        const xDistance = Math.abs(x - point.x);
        if (xDistance < closestColumn.xDistance) closestColumn = { xDistance, y };
        closestDistance = Math.min(closestDistance, Math.hypot(x - point.x, y - point.y));
      }
      assert.equal(closestColumn.y < point.y, abovePoint, code + ': marker is between the correct numbered ribs');
      assert(closestDistance >= 9, code + ': marker must clear the visible rib stroke');
    }
  }
}
assertIntercostalMarkers('chest', 'ribs', 2, 1, [
  ['lu1', 1], ['st14', 1], ['st15', 2], ['st16', 3], ['st18', 5],
  ['sp17', 5], ['sp18', 4], ['sp19', 3], ['sp20', 2],
  ['ki22', 5], ['ki23', 4], ['ki24', 3], ['ki25', 2], ['ki26', 1],
  ['pc1', 4], ['gb24', 7], ['lr14', 6],
]);
assertIntercostalMarkers('flank', 'sideRibs', 1, 4, [['gb22', 4], ['gb23', 4], ['sp21', 6]]);
for (const [code, feature] of [['lr13', 'ribEleven'], ['gb25', 'lastRib']]) {
  const [, tipX, tipY] = expandedViews.flank.features[feature].path.match(/(\d+) (\d+)$/);
  assert.equal(expandedPoints[code].x, Number(tipX), code + ': marker aligns with the free end of the rib');
  assert(expandedPoints[code].y - Number(tipY) >= 9, code + ': marker is below the rib end and leaves it visible');
}
assert.equal(expandedPoints.gb26.x, expandedPoints.lr13.x, 'GB26 is below the same free end of the 11th rib as LR13');
assert.match(expandedViews.flank.features.levelNavel.path, new RegExp(` ${expandedPoints.gb26.y}H`), 'GB26 aligns with the drawn navel level');
for (const [midline, lateral] of [['cv17', 'pc1'], ['cv18', 'st16'], ['cv19', 'st15'], ['cv20', 'st14']]) {
  assert.equal(expandedPoints[midline].y, expandedPoints[lateral].y, midline + ': midline level matches the corresponding intercostal space');
}
assert.equal(expandedPoints.st9.y, expandedPoints.li18.y);
assert.equal(expandedPoints.st9.y, expandedPoints.si16.y);
assert(expandedPoints.st9.x < expandedPoints.li18.x && expandedPoints.li18.x < expandedPoints.si16.x,
  'Points at the same thyroid cartilage level lie before, within, and behind the sternocleidomastoid');
assert.equal(expandedPoints.si8.view, 'elbowInside');
for (const guide of SYMPTOMS) {
  for (const code of guide.recommendedTsuboIds) {
    const links = getAcupointGuideLinks(code, ATLAS_ARTICLES[code]?.symptomLinks);
    assert(links.some(link => link.href === '/symptoms/' + guide.id), code + ' links back to ' + guide.id);
    assert.equal(new Set(links.map(link => link.href)).size, links.length, code + ' guide links are unique');
  }
}
assert.deepEqual(getAcupointGuideLinks('pc4', ATLAS_ARTICLES.pc4.symptomLinks)[0], ATLAS_ARTICLES.pc4.symptomLinks[0],
  'A curated safety link retains priority');
for (const [code, foot] of Object.entries(footLandmarks)) {
  const article = ATLAS_ARTICLES[code];
  const marker = ATLAS_POINT_MARKERS[code];
  assert.equal(marker.footCode, code);
  assert(article.sources[0].url.endsWith('#page=' + foot.pdfPage), code);
  assert(article.relatedPoints.every(point => getAcupointByCode(point.code)), code);
  const body = [article.lead, ...article.location, ...article.traditional, ...article.selfCare, ...article.cautions, ...article.expert, ...article.relatedPoints.map(point => point.text)].join('');
  assert(body.length >= 700 && body.length <= 900, code + ' article length');
}
assert(footLandmarks.sp2.x > 240 && footLandmarks.sp3.x < 240, 'SP2 and SP3 sit on opposite sides of the great toe joint');
assert(footLandmarks.bl66.x > 240 && footLandmarks.bl65.x < 240, 'BL65 and BL66 sit on opposite sides of the little toe joint');
assert(footLandmarks.bl63.x < 158 && footLandmarks.bl64.x > 158, 'BL63 and BL64 sit on opposite sides of the fifth metatarsal tuberosity');
assert(footLandmarks.bl60.x < footLandmarks.bl62.x && footLandmarks.bl62.x < footLandmarks.gb40.x, 'Lateral ankle points progress from behind the malleolus to below and in front');
assert.deepEqual(
  [footLandmarks.sp5.x, footLandmarks.sp5.y],
  ['x', 'y'].map(axis => (medialFootLandmarks.malleolus[axis] + medialFootLandmarks.navicular[axis]) / 2),
  'SP5 is midway between the two drawn bony landmarks',
);
for (const [code, point] of Object.entries(legLandmarks)) {
  const article = ATLAS_ARTICLES[code];
  const marker = ATLAS_POINT_MARKERS[code];
  assert.equal(marker.legCode, code);
  assert.equal(marker.x, point.x, code);
  assert.equal(marker.y, point.y, code);
  assert(article.sources[0].url.endsWith('#page=' + point.pdfPage), code);
  assert(article.relatedPoints.every(point => getAcupointByCode(point.code)), code);
  const body = [article.lead, ...article.location, ...article.traditional, ...article.selfCare, ...article.cautions, ...article.expert, ...article.relatedPoints.map(point => point.text)].join('');
  assert(body.length >= 700 && body.length <= 900, code + ' article length');
}
assert.equal(legLandmarks.ki1.y, (soleEndpoints.heel.y - soleEndpoints.web.y) / 3 + soleEndpoints.web.y);
assert(legLandmarks.gb35.y === legLandmarks.gb36.y && legLandmarks.gb35.x < legLandmarks.gb36.x);
assert(legLandmarks.ki7.y === legLandmarks.ki8.y && legLandmarks.ki7.x < legLandmarks.ki8.x);
assert(legLandmarks.lr8.y === poplitealY && legLandmarks.lr8.x < legLandmarks.ki10.x);
assert.equal(legLandmarks.bl40.x, (posteriorKnee.medialEnd + posteriorKnee.lateralEnd) / 2);
assert.equal(medialAnkleY - legLandmarks.sp9.y, 13 * 12);
assert.equal(legLandmarks.sp8.y - legLandmarks.sp9.y, 3 * 12);
assert(legLandmarks.sp6.x < 109, 'SP6 lies behind the medial border drawn in the leg template');
assert.equal(ATLAS_ARTICLES.st40.illustration.region, 'anterolateralLowerLeg', 'ST40 needs a front view to show lateral displacement');
assert.equal(legLandmarks.st40.y, ATLAS_POINT_MARKERS.st38.y);
assert.equal(tiaokouReference.x, ATLAS_POINT_MARKERS.st38.x);
assert.equal(tiaokouReference.y, ATLAS_POINT_MARKERS.st38.y);
assert(legLandmarks.st40.x < tiaokouReference.x, 'The viewer’s left is lateral in the right-shin front view');
assert.equal(outerShinAnkle.y - legLandmarks.st40.y, (shinEndpoints.ankle.y - shinEndpoints.knee.y) / 2, 'ST40 is 8 of 16 proportional units above the outer malleolus');
assert(legLandmarks.lr5.x > 110 && legLandmarks.lr5.x < 124, 'LR5 lies on the middle of the tibial surface');
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

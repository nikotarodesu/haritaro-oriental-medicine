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
const { dorsalFootLandmarks, footLandmarks, medialFootLandmarks } = load('src/data/tsubo/atlas/footLandmarks');
const { legLandmarks, soleEndpoints, poplitealY, medialAnkleY, medialCalf, posteriorKnee, outerShinAnkle, tiaokouReference } = load('src/data/tsubo/atlas/legLandmarks');
const { expandedPoints } = load('src/data/tsubo/atlas/expanded/profiles');
const { posteriorThigh, sacralLandmarks, spinalLevels } = load('src/data/tsubo/atlas/expanded/back');
const { dorsalUlnarWrist, dorsalWrist, forearmWristCreaseY, lateralElbow, palmarRadialWrist, posteriorShoulder } = load('src/data/tsubo/atlas/expanded/arms');
const { faceLandmarks, profileLandmarks } = load('src/data/tsubo/atlas/expanded/head');
const { subclavicularLandmarks } = load('src/data/tsubo/atlas/expanded/trunk');
const { getAcupointGuideLinks } = load('src/utils/symptomGuides');
const { WHO_ATLAS_PDF, whoAtlasPages } = load('src/data/tsubo/atlas/whoAtlasPages');
const { whoLocations, whoLocationNotes } = load('src/data/tsubo/atlas/whoLocations');
const { getWhoMeasurements } = load('src/data/tsubo/atlas/whoMeasurements');
const { getAnnotatedCloseUp } = load('src/data/tsubo/atlas/closeUpMeasurements');
const { expandedLandmarkIds, expandedLandmarkLabels } = load('src/data/tsubo/atlas/landmarkLabels');
const { heguLandmarkLabels, regionalLandmarkLabels, regionalLandmarkView } = load('src/data/tsubo/atlas/regionalLandmarkLabels');
const expandedViews = Object.assign({}, ...['head', 'arm', 'trunk', 'back'].map(group =>
  load(`src/components/tsubo/atlas/expanded/${group}Views`)[`${group}Views`]
));
assert.deepEqual(Object.keys(ATLAS_POINT_MARKERS).sort(), [...new Set([...Object.keys(ATLAS_ARTICLES), ...Object.keys(POINT_ILLUSTRATIONS)])].sort(),
  'Every illustrated index link must have one complete diagram set');
assert.deepEqual(['li4', ...Object.keys(ATLAS_ARTICLES)].sort(), Array.from(ACUPOINTS_MASTER, point => point.codeLower).sort(),
  'Every standard point has a full atlas article, including the dedicated LI4 page');
for (const [code, article] of Object.entries(ATLAS_ARTICLES)) {
  const folded = [...article.cautions, ...article.selfCare].join(' ');
  assert(!/119番|救急要請/.test(folded), code + ' emergency instructions must appear in the visible warning');
}
const standardPointCodes = Array.from(ACUPOINTS_MASTER, point => point.codeLower).sort();
assert.deepEqual(Object.keys(whoAtlasPages).sort(), standardPointCodes, 'Every WHO point has an exact PDF page');
assert.deepEqual(Object.keys(whoLocations).sort(), standardPointCodes, 'Every WHO point has a Japanese location summary');
const landmarksByPoint = new Map([['li4', heguLandmarkLabels]]);
for (const code of standardPointCodes) {
  assert(whoLocations[code].endsWith('。'), code + ' has a complete location summary');
  assert(whoAtlasPages[code] >= 35 && whoAtlasPages[code] <= 240, code + ' links to a point in the WHO manual');
  for (const copy of [whoLocations[code], whoLocationNotes[code] ?? '']) {
    const measures = getWhoMeasurements(code, copy);
    assert.deepEqual(Array.from(measures, measure => measure.token), copy.match(/\d+(?:\.\d+)?(?:指寸|指幅|寸)/g) ?? [], code + ' shows all published measurements');
    for (const { start, direction, span, amount, unit } of measures) {
      assert(start && direction, code + ' ties each ruler to its anatomical starting point and direction');
      assert(!span || unit === '寸' && amount <= span[1], code + ' fits the applicable anatomical span');
      assert(unit !== '指寸' || amount <= 1, code + ' fits the illustrated single finger-cun scale');
    }
  }
  if (code !== 'li4') {
    assert(ATLAS_ARTICLES[code].sources.some(({ url }) => url === `${WHO_ATLAS_PDF}#page=${whoAtlasPages[code]}`), code);
    const expected = [
      ...getWhoMeasurements(code, whoLocations[code]),
      ...getWhoMeasurements(code, whoLocationNotes[code] ?? ''),
    ];
    const closeUp = getAnnotatedCloseUp(code, ATLAS_POINT_MARKERS[code], ATLAS_ARTICLES[code].illustration.region);
    assert.deepEqual(Array.from(closeUp.measurements, row => row.measure.token),
      expected.map(row => row.token), code + ' annotates every published distance on the close-up');
    if (expected.length === 0) {
      const { marker } = closeUp;
      const point = marker.expanded;
      const features = point && expandedViews[point.view].features;
      if (features) {
        for (const id of expandedLandmarkIds(point, code)) assert(features[id], code + ' draws the selected landmark ' + id);
      }
      const labels = point ? expandedLandmarkLabels(point, code, features) : regionalLandmarkLabels(code, marker);
      const left = point ? 0 : regionalLandmarkView(code, marker).left;
      assert(labels.length > 0, code + ' names at least one anatomical landmark');
      assert.equal(new Set(labels.map(({ name }) => name)).size, labels.length, code + ' labels each landmark once');
      for (const { name, position: [x, y] } of labels) {
        assert(name && x > left && x < left + 200 && y > 0 && y < 300, code + ' keeps the leader endpoint on the drawing');
      }
      assert(marker.x > left && marker.x < left + 200, code + ' keeps the point inside the close-up');
      landmarksByPoint.set(code, labels);
    }
    for (const { origin, destination, rail, originLabel } of closeUp.measurements) {
      assert(originLabel, code + ' names the anatomical anchor');
      assert([origin, destination].every(([x, y]) => x > 0 && x < 340 && y > 0 && y < 300), code + ' keeps both landmarks within the illustration');
      const [dx, dy] = [destination[0] - origin[0], destination[1] - origin[1]];
      const length = rail?.axis === 'horizontal' ? Math.abs(dx) : rail?.axis === 'vertical' ? Math.abs(dy) : Math.hypot(dx, dy);
      assert(length >= 7, code + ' shows a visible arrow between the measurement endpoints');
    }
  }
}
assert.equal(landmarksByPoint.size, 152, 'All points without a distance have a named landmark on the diagram');
assert.deepEqual(Array.from(landmarksByPoint.get('st41'), ({ name }) => name),
  ['長母趾伸筋腱', '長趾伸筋腱', '内くるぶし', '外くるぶし']);
assert.deepEqual(Array.from(landmarksByPoint.get('st35'), ({ name }) => name), ['ひざのお皿（膝蓋骨）', '膝蓋靱帯']);
assert.deepEqual(Array.from(landmarksByPoint.get('li5'), ({ name }) => name).slice(0, 2), ['短母指伸筋腱', '長母指伸筋腱']);
assert.deepEqual(Object.keys(whoLocationNotes).filter(code => /WHOの代替位置/.test(whoLocationNotes[code])).sort(),
  ['gb30', 'gv26', 'li19', 'li20', 'pc8', 'pc9'], 'All six alternative locations are included');
assert.match(whoLocations.pc6, /長掌筋腱と橈側手根屈筋腱の間.*ひじへ2寸/);
assert.match(whoLocationNotes.pc6, /長掌筋の腱がない場合.*小指側/);
assert.match(whoLocations.st4, /0\.4指寸/);
assert.match(whoLocations.st6, /1指幅/);
assert.match(whoLocationNotes.st40, /外へ1指幅/);
assert.match(whoLocations.gb32, /膝裏の横じわから上へ7寸/);
assert.match(whoLocations.lr7, /陰陵泉（SP9）から後ろへ1寸/);
assert.match(whoLocations.sp11, /衝門側から3分の1.*縫工筋と長内転筋の間/);
for (const [code, amount, length] of [['pc6', 2, 12], ['sp6', 3, 13], ['cv4', 3, 5], ['sp13', 4.3, 5]]) {
  const [measure] = getWhoMeasurements(code, whoLocations[code]);
  assert.equal(measure.amount, amount, code);
  assert.equal(measure.span?.[1], length, code);
}
assert.equal(getWhoMeasurements('st4', whoLocations.st4)[0].unit, '指寸');
assert.equal(getWhoMeasurements('st40', whoLocationNotes.st40)[0].unit, '指幅');
assert.equal(getWhoMeasurements('gv18', whoLocations.gv18)[0].start, '後ろの生え際');
assert.equal(getWhoMeasurements('gv19', whoLocations.gv19)[0].span[1], 12);
const measuredCloseUp = code => getAnnotatedCloseUp(code, ATLAS_POINT_MARKERS[code], ATLAS_ARTICLES[code].illustration.region);
const [lower, lateral] = measuredCloseUp('sp13').measurements;
assert.equal(lower.rail.axis, 'vertical');
assert.deepEqual(Array.from(lower.origin), [106, 144]);
assert.deepEqual(Array.from(lower.destination), Array.from(lateral.origin), 'The vertical and horizontal abdominal measurements meet on the midline');
assert.equal(lateral.rail.axis, 'horizontal');
const pc9CloseUp = measuredCloseUp('pc9');
assert(pc9CloseUp.measurements[0].alternative && pc9CloseUp.measurements[0].destination[1] > pc9CloseUp.marker.y,
  'The nail-corner ruler shows the distinct alternative to the fingertip');
assert.equal(measuredCloseUp('gv24').measurements[1].condition, '生え際が分かりにくいとき');
assert.equal(measuredCloseUp('st8').marker.expanded.view, 'scalp', 'The close-up shows both the hairline corner and the midline');
assert.equal(Object.keys(expandedPoints).length, 284);
for (const [code, point] of Object.entries(expandedPoints)) {
  const master = getAcupointByCode(code);
  const article = ATLAS_ARTICLES[code];
  const illustration = article.illustration;
  const marker = ATLAS_POINT_MARKERS[code];
  assert(illustration.region === 'expanded' && marker.expanded === point, code);
  for (const [index, id] of point.landmarks.entries()) {
    const feature = expandedViews[point.view].features[id];
    assert(feature, code + ' landmark ' + id);
    const [x, y] = feature.position;
    assert(Math.hypot(x - marker.x, y - marker.y) >= 14, code + ' landmark number must not obscure the point');
    for (const other of point.landmarks.slice(index + 1)) {
      const [otherX, otherY] = expandedViews[point.view].features[other].position;
      assert(Math.hypot(x - otherX, y - otherY) >= 16.2, code + ' landmark numbers must not overlap');
    }
  }
  assert.equal(new Set(point.landmarks).size, point.landmarks.length, code);
  assert(article.sources[0].url.endsWith('#page=' + whoAtlasPages[code]), code);
  assert(illustration.meridianStart <= master.meridianOrder && master.meridianOrder <= illustration.meridianEnd, code);
  assert(getMeridianPoints(getAcupointDetail(code).meridianId).some(other => other.codeLower === code), code + ' renders its position in the meridian');
  assert(!article.relatedPoints.some(other => other.code === code || !getAcupointByCode(other.code)), code);
  assert(article.symptomLinks.every(({ href }) => href === '/symptoms' || SYMPTOMS.some(guide => href === '/symptoms/' + guide.id)), code);
  assert(master.locationSimple.startsWith(point.location), code + ' search and title data agree with the article');
  assert(article.lead.includes(point.location), code + ' opens with its own position');
  assert(article.location.includes(point.guide), code + ' describes how to read its landmarks');
  assert(article.traditional.some(text => text.includes(`${master.meridianOrder}番目`)), code + ' explains its place in the sequence');
  assert(article.relatedPoints.some(({ code: otherCode }) =>
    article.traditional.some(text => text.includes(getAcupointByCode(otherCode).name))
  ), code + ' names a point to compare');
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
for (const code of ['gv3', 'gv4', 'gv5', 'gv6', 'gv7', 'gv8', 'gv9', 'gv10', 'gv11', 'gv12', 'gv13', 'gv14']) {
  const { view, x, y, landmarks } = expandedPoints[code];
  const path = expandedViews[view].features[landmarks[1]].path;
  const tipY = y - spinalLevels.depressionOffset;
  assert.equal(x, midlineX, code + ' lies on the posterior median line');
  assert(spinalLevels.depressionOffset > 0 && path.includes(`L${midlineX} ${tipY}L`),
    code + ' lies below the visible spinous process tip');
}
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
assert.equal(expandedPoints.gb8.measurement, `M${profileLandmarks.earApex.join(' ')}V${expandedPoints.gb8.y}`);
assert(expandedPoints.gb9.x > expandedPoints.gb8.x);
assert(expandedPoints.gb12.x > profileLandmarks.mastoidTip[0] && expandedPoints.gb12.y > profileLandmarks.mastoidTip[1]);
const { anteriorMandible, masseterAttachment } = profileLandmarks;
assert.deepEqual([expandedPoints.st5.x, expandedPoints.st5.y], Array.from(anteriorMandible));
assert(expandedPoints.st5.x <= masseterAttachment[0] - 9, 'ST5 is anterior to the masseter attachment on the left-facing profile');
assert(expandedViews.profile.features.jawSide.path.includes(` ${anteriorMandible.join(' ')}L`));
assert(expandedViews.profile.features.masseter.path.endsWith(`L${masseterAttachment.join(' ')}`));
const { mouthCorner, upperGumJunction, innerCanthus, outerCanthus, medialOrbitalWall, medialOrbitalRoof, innerBrow, outerBrow } = faceLandmarks;
const { innerEye, orbit, brow } = expandedViews.face.features;
assert(innerEye.path.startsWith(`M${innerCanthus.join(' ')}Q`) && innerEye.path.includes(` ${outerCanthus.join(' ')}Q`));
assert(orbit.path.startsWith(`M${medialOrbitalRoof.join(' ')}Q`) && orbit.path.endsWith(` ${medialOrbitalWall.join(' ')}Z`));
const wallX = medialOrbitalWall[0] + (medialOrbitalWall[1] - expandedPoints.bl1.y) / (medialOrbitalWall[1] - medialOrbitalRoof[1]) *
  (medialOrbitalRoof[0] - medialOrbitalWall[0]);
assert(expandedPoints.bl1.y < innerCanthus[1] && expandedPoints.bl1.x > wallX &&
  expandedPoints.bl1.x < innerCanthus[0], 'BL1 lies superomedial to the inner canthus and inside the medial orbital rim');
assert.deepEqual([expandedPoints.bl2.x, expandedPoints.bl2.y], Array.from(innerBrow));
assert.deepEqual([expandedPoints.te23.x, expandedPoints.te23.y], Array.from(outerBrow));
assert(brow.path.includes(`M${innerBrow.join(' ')}Q`) && brow.path.endsWith(` ${outerBrow.join(' ')}`));
assert.equal(expandedPoints.si18.x, outerCanthus[0], 'SI18 is directly below the visible outer canthus');
assert(expandedPoints.si18.y > outerCanthus[1]);
assert.equal(expandedPoints.si18.measurement, `M${outerCanthus.join(' ')}V${expandedPoints.si18.y}`);
assert.equal(expandedPoints.st4.y, mouthCorner[1], 'ST4 is level with the corner of the mouth');
assert(expandedPoints.st4.x - mouthCorner[0] >= 10, 'ST4 is lateral to the visible corner without covering it');
assert(expandedViews.face.features.mouth.path.includes(` ${mouthCorner.join(' ')}Q`), 'ST4 measures from the actual mouth corner');
assert.deepEqual([expandedPoints.gv28.x, expandedPoints.gv28.y], Array.from(upperGumJunction));
assert(expandedViews.mouth.features.lipFold.path.endsWith(` ${upperGumJunction.join(' ')}`), 'GV28 is at the end of the lip frenulum');
assert(expandedViews.mouth.features.gum.path.includes(` ${upperGumJunction.join(' ')}Q`), 'The upper gum meets the frenulum at GV28');
const { coracoidMedialX } = subclavicularLandmarks;
assert(expandedViews.chest.features.coracoid.path.includes(` ${coracoidMedialX} 53L`));
assert(expandedPoints.lu2.x <= coracoidMedialX - 9, 'LU2 is medial to the coracoid, clear of the drawn bone');
for (const [upper, lower] of [['lu2', 'lu1'], ['st13', 'st14'], ['ki27', 'ki26']]) {
  assert.equal(expandedPoints[upper].x, expandedPoints[lower].x);
  assert(expandedPoints[upper].y > 48 && expandedPoints[upper].y < expandedPoints[lower].y, upper + ' lies below the clavicle and above intercostal space one');
}
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
function checkArticleLocationCopy(article, code) {
  const body = [article.lead, ...article.location, ...article.traditional, ...article.selfCare, ...article.cautions, article.safetyWarning, ...article.expert, ...article.relatedPoints.map(point => point.text)].join('');
  assert(article.location.length >= 2 && article.location.every(paragraph => paragraph.trim()), code + ' has step-by-step location details');
  assert(article.cautions.some(paragraph => paragraph.trim()), code + ' has local precautions');
  assert(body.length <= 900, code + ' article remains concise');
}
for (const [code, foot] of Object.entries(footLandmarks)) {
  const article = ATLAS_ARTICLES[code];
  const marker = ATLAS_POINT_MARKERS[code];
  assert.equal(marker.footCode, code);
  assert(article.sources[0].url.endsWith('#page=' + foot.pdfPage), code);
  assert(article.relatedPoints.every(point => getAcupointByCode(point.code)), code);
  checkArticleLocationCopy(article, code);
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
const { secondMetatarsalBase, intermediateCuneiformFront, fourthMetatarsal, fifthMetatarsal, fifthExtensor } = dorsalFootLandmarks;
assert.deepEqual(
  [footLandmarks.st42.x, footLandmarks.st42.y],
  [0, 1].map(axis => (secondMetatarsalBase[axis] + intermediateCuneiformFront[axis]) / 2),
  'ST42 is on the illustrated second tarsometatarsal joint',
);
for (const code of ['gb41', 'gb42']) {
  const marker = footLandmarks[code];
  for (const [ray, medial] of [[fourthMetatarsal, true], [fifthMetatarsal, false]]) {
    let closestLevel = Infinity;
    let xAtMarkerLevel;
    let closestDistance = Infinity;
    for (let index = 0; index <= 256; index += 1) {
      const t = index / 256;
      const u = 1 - t;
      const [x, y] = ray.base.map((value, axis) => u * u * value + 2 * u * t * ray.control[axis] + t * t * ray.head[axis]);
      const levelDifference = Math.abs(y - marker.y);
      if (levelDifference < closestLevel) {
        closestLevel = levelDifference;
        xAtMarkerLevel = x;
      }
      closestDistance = Math.min(closestDistance, Math.hypot(x - marker.x, y - marker.y));
    }
    assert.equal(xAtMarkerLevel < marker.x, medial, code + ' sits between the fourth and fifth metatarsals');
    assert(closestDistance > 10.5, code + ' marker clears the illustrated bone strokes');
  }
}
const [extensorX, extensorY] = fifthExtensor.middle;
const [extensorTipX, extensorTipY] = fifthExtensor.tip;
const extensorLevelX = extensorX + (extensorTipX - extensorX) * (footLandmarks.gb41.y - extensorY) / (extensorTipY - extensorY);
assert(footLandmarks.gb41.x >= extensorLevelX + 11, 'GB41 sits lateral to the fifth extensor with a visible gap');
const { radialTendonX, ulnarTendonX, creaseY } = dorsalWrist;
assert.equal(expandedPoints.li5.y, creaseY, 'LI5 is at dorsal wrist crease level');
assert(radialTendonX + 8 < expandedPoints.li5.x && expandedPoints.li5.x < ulnarTendonX - 8, 'LI5 sits between the drawn thumb tendons');
const handBackFeatures = expandedViews.handBack.features;
assert(handBackFeatures.thumbTendonsBack.path.includes(`L${radialTendonX} ${creaseY}Q`));
assert(handBackFeatures.thumbTendonsBack.path.includes(`L${ulnarTendonX} ${creaseY}Q`));
const { metacarpalBase, triquetrum, styloid, forearmHead } = dorsalUlnarWrist;
assert.equal(expandedPoints.si4.y, (metacarpalBase.y + triquetrum.y) / 2, 'SI4 lies between the fifth metacarpal base and triquetrum');
assert.equal(expandedPoints.si5.y, (triquetrum.y + styloid.y) / 2, 'SI5 lies between the triquetrum and ulnar styloid');
assert(expandedPoints.si6.x < forearmHead.x, 'SI6 is radial to the ulnar head');
assert.equal(forearmWristCreaseY - expandedPoints.si6.y, 15, 'SI6 is one proportional unit proximal to the dorsal wrist crease');
assert(palmarRadialWrist.styloidX < expandedPoints.lu8.x && expandedPoints.lu8.x < palmarRadialWrist.arteryX, 'LU8 lies between radial styloid and radial artery');
assert.equal(expandedPoints.lu9.y - expandedPoints.lu8.y, 15, 'LU8 is one proportional unit above LU9');
assert.equal(expandedPoints.lu9.y, forearmWristCreaseY, 'LU9 is on the palmar wrist crease');
assert(expandedPoints.li12.x < lateralElbow.ridgeAtLi12.x && expandedPoints.li12.y < lateralElbow.epicondyle.y, 'LI12 is anterior to the humeral ridge and proximal to the epicondyle');
for (const [code, point] of Object.entries(legLandmarks)) {
  const article = ATLAS_ARTICLES[code];
  const marker = ATLAS_POINT_MARKERS[code];
  assert.equal(marker.legCode, code);
  assert.equal(marker.x, point.x, code);
  assert.equal(marker.y, point.y, code);
  assert(article.sources[0].url.endsWith('#page=' + point.pdfPage), code);
  assert(article.relatedPoints.every(point => getAcupointByCode(point.code)), code);
  checkArticleLocationCopy(article, code);
}
assert.equal(legLandmarks.ki1.y, (soleEndpoints.heel.y - soleEndpoints.web.y) / 3 + soleEndpoints.web.y);
assert(legLandmarks.gb35.y === legLandmarks.gb36.y && legLandmarks.gb35.x < legLandmarks.gb36.x);
assert.equal(legLandmarks.ki7.y, medialCalf.achillesAtTwoCun.y, 'KI7 is at the same level as the drawn Achilles tendon reference');
assert(legLandmarks.ki7.x > medialCalf.achillesAtTwoCun.x, 'KI7 is anterior to the Achilles tendon');
assert.equal(legLandmarks.ki8.y, legLandmarks.ki7.y, 'KI7 and KI8 are level');
assert.equal(legLandmarks.ki8.x - legLandmarks.ki7.x, 6, 'KI8 is half a proportional unit anterior to KI7');
assert.equal(legLandmarks.ki9.y, legLandmarks.lr5.y, 'KI9 and LR5 are level');
assert(medialCalf.achillesAtFiveCun.x < legLandmarks.ki9.x && legLandmarks.ki9.x < medialCalf.soleusAtFiveCun.x, 'KI9 lies between Achilles tendon and soleus');
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
  checkArticleLocationCopy(article, code);
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

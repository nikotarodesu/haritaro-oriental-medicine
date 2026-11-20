import type { ExpandedPoint, ExpandedView } from "./expanded/types";
import { dorsalUlnarWrist, dorsalWrist, lateralElbow, palmarRadialWrist, posteriorShoulder } from "./expanded/arms";
import { posteriorThigh, sacralLandmarks, spinalLevels } from "./expanded/back";
import { faceLandmarks, headPoints, profileLandmarks } from "./expanded/head";
import { flankLandmarks, groinLandmarks } from "./expanded/trunk";
import { whoLocations } from "./whoLocations";

export type LandmarkPosition = readonly [x: number, y: number];
export type LandmarkLabel = { name: string; position: LandmarkPosition };
type Anchor = readonly [x: number, y: number, name?: string];

const { earApex, mastoidTip, masseterAttachment, templeEdge, posteriorEarRootX } = profileLandmarks;
const { x: gluteX, y: gluteY } = posteriorThigh.glutealMidpoint;
const { neckBase, axillaryFold, acromion, scapulaRidge, scapulaTip } = posteriorShoulder;
const { hiatus, posteriorIliacSpine, trochanter, foramina, midlineX } = sacralLandmarks;
const { thoracic, lumbar, c7 } = spinalLevels;

// These anchors sit on the feature itself in the 340 × 300 artwork. The
// numbered badges used in the distance diagrams have separate positions.
const anchors: Partial<Record<ExpandedView, Readonly<Record<string, Anchor>>>> = {
  face: {
    orbit: [151, 119, "目を囲む骨の下縁"],
    pupil: [138, 88, "瞳を通る縦線"],
    cheek: [166, 129],
    infraorbitalForamen: [144, 133, "眼窩下孔"],
    nose: [124, 150, "小鼻の外側"],
    mouth: [105, 185, "上唇の上縁"],
    innerEye: [...faceLandmarks.outerCanthus, "目尻"],
    fold: [134, 157, "鼻から口元の溝"],
    philtrum: [105, 163, "鼻の下の溝（人中）"],
    chinFold: [116, 206, "下唇とあごの間の溝"],
    faceMid: [105, 128, "顔の中央線"],
  },
  profile: {
    jawSide: [116, 190, "下あごの骨"],
    masseter: [...masseterAttachment, "かむ筋肉の付け根"],
    arch: [102, 130, "頬骨弓"],
    templeHair: [...templeEdge, "こめかみの生え際"],
    ear: [146, 150, "耳の輪郭"],
    tragus: [124, 139, "耳珠（耳の突起）"],
    upperTragusNotch: [122, 134, "耳珠の上の切れ込み"],
    mastoid: [...mastoidTip, "耳の後ろの骨"],
    earTop: [...earApex, "耳の頂点"],
    earRoot: [posteriorEarRootX, 109, "耳の付け根"],
    temporalArtery: [105, 100, "浅側頭動脈"],
  },
  nape: {
    occiput: [106, 103, "後頭部の骨の突起"],
    napeMid: [106, 173, "うなじの中央線"],
    cervical: [106, 158, "第2頸椎の突起の上縁"],
    trapezius: [146, 199, "僧帽筋"],
    neckMuscles: [158, 150, "胸鎖乳突筋"],
  },
  neck: {
    collar: [102, 219, "鎖骨の内側の端"],
    scm: [117, 208, "胸鎖乳突筋の2つの枝"],
    neckMid: [100, 183],
    voice: [107, 133, "甲状軟骨の上縁"],
    hyoid: [101, 120, "舌骨"],
  },
  neckSide: {
    jawNeck: [110, 94],
    voice: [91, 138, "甲状軟骨の上縁"],
    lowerVoice: [87, 166, "輪状軟骨"],
    scm: [118, 172, "胸鎖乳突筋"],
    carotid: [109, 155, "総頸動脈"],
  },
  mouth: {
    lipFold: [103, 100, "上唇の裏のひだ"],
    gum: [132, 127, "上の歯ぐき"],
  },
  upperArm: {
    axillary: [146, 89],
    axillaryArtery: [144, 101, "わきを通る動脈"],
  },
  elbowSide: {
    elbowBump: [134, 118, "上腕骨の外側の突起"],
    humerusRidge: [lateralElbow.ridgeAtLi12.x, lateralElbow.ridgeAtLi12.y, "上腕骨外側の稜"],
  },
  elbowInside: {
    medialEpicondyle: [139, 135, "上腕骨の内側の突起"],
    elbowTip: [156, 145, "ひじの先（肘頭）"],
  },
  forearmPalm: {
    elbowCrease: [126, 60, "ひじの横じわ"],
    bicepsTendon: [105, 80, "上腕二頭筋の腱"],
    radialStyloid: [73, 224, "橈骨の突起"],
    carpus: [95, 246, "手首の舟状骨"],
    innerElbow: [157, 63, "ひじの内側の骨"],
    outerElbow: [66, 51, "ひじの外側の骨"],
    wristCrease: [105, 239, "手首のしわ"],
    ulnarTendon: [148, 209, "尺側手根屈筋腱"],
    thumbTendons: [74, 228, "長母指外転筋腱"],
    radialArtery: [palmarRadialWrist.arteryX, palmarRadialWrist.arteryY, "橈骨動脈"],
    pisiform: [153, 255, "豆状骨"],
  },
  palm: {
    thumbRay: [66, 195, "親指の中手骨"],
    palmEdge: [54, 186, "手のひら側の境"],
    indexRay: [77, 178, "人差し指の中手骨"],
    middleRay: [104, 186, "中指の中手骨"],
    ringRay: [122, 187, "薬指の中手骨"],
    littleRay: [155, 183, "小指の中手骨"],
  },
  handBack: {
    indexRay: [78, 182, "人差し指の中手骨"],
    indexJoint: [70, 126, "人差し指の付け根"],
    radialWrist: [86, 257, "橈骨の突起"],
    shortThumbExtensor: [dorsalWrist.radialTendonX, dorsalWrist.creaseY],
    longThumbExtensor: [dorsalWrist.ulnarTendonX, dorsalWrist.creaseY],
    littleRay: [158, 171, "小指の中手骨"],
    littleJoint: [166, 148, "小指の付け根"],
    triquetrum: [dorsalUlnarWrist.triquetrum.x, dorsalUlnarWrist.triquetrum.y, "三角骨"],
    ulnarStyloid: [dorsalUlnarWrist.styloid.x, dorsalUlnarWrist.styloid.y, "尺骨の突起"],
    ringRay: [123, 175, "薬指の中手骨"],
    wristBack: [135, 247, "手首のしわ"],
    handTendons: [124, 186, "総指伸筋腱"],
    littleWeb: [143, 111, "薬指と小指のまた"],
  },
  shoulderSide: {
    acromionSide: [153, 106, "肩峰（肩先の骨）"],
    upperHead: [144, 133, "上腕骨のふくらみ"],
    collarSide: [131, 87, "鎖骨の外側の端"],
    shoulderSpine: [153, 81, "肩甲棘"],
  },
  shoulderBack: {
    shoulderSpine: [(scapulaRidge.inner.x + scapulaRidge.outer.x) / 2,
      (scapulaRidge.inner.y + scapulaRidge.outer.y) / 2, "肩甲棘"],
    axillaryBack: [axillaryFold.x, axillaryFold.y],
    shoulderBlade: [146, 85, "肩甲骨の上の角"],
    upperSpine: [neckBase.x, neckBase.y, "第7頸椎の突起"],
    acromionBack: [acromion.x, acromion.y, "肩峰"],
  },
  chest: {
    sternum: [114, 125, "胸骨"],
    chestJoint: [106, 213, "胸骨と剣状突起の境"],
    nipples: [162, 149, "乳頭の中央"],
  },
  abdomen: {
    pubis: [109, 240, "恥骨結合の上縁"],
    navel: [106, 144],
    abdomenMid: [106, 187, "お腹の中央線"],
  },
  flank: {
    axillaLine: [flankLandmarks.midaxillaryX, 60, "わきの中央の縦線"],
    lastRib: [flankLandmarks.lastRibTip.x, flankLandmarks.lastRibTip.y],
    flankHip: [143, 204, "腰骨の出っ張り"],
    ribEleven: [flankLandmarks.ribElevenTip.x, flankLandmarks.ribElevenTip.y],
    levelNavel: [181, flankLandmarks.navelY, "おへその高さ"],
  },
  hip: {
    hipFrontPoint: [171, 72, "上前腸骨棘（腰骨の前）"],
    hipTrochanter: [148, 151, "大転子"],
  },
  groin: {
    groinFold: [groinLandmarks.inguinalCreaseX, groinLandmarks.pubicBorderY, "脚の付け根のしわ"],
    femoral: [134, groinLandmarks.pubicBorderY, "大腿動脈"],
    pubisGroin: [106, groinLandmarks.pubicBorderY, "恥骨結合の上縁"],
  },
  pelvis: {
    perineumFront: [106, 110, "外性器の後縁"],
    perineumBack: [106, 188, "肛門"],
    tailTip: [106, 246, "尾骨の先端"],
  },
  thighFront: {
    thighHip: [98, 40, "上前腸骨棘（腰骨の前）"],
    anteriorMuscles: [92, 90, "太ももの前の筋肉の境"],
    innerThigh: [146, 116, "縫工筋と長内転筋の間"],
    thighGroin: [166, 48, "脚の付け根の衝門"],
    patella: [134, 231, "ひざのお皿の内上端"],
  },
  thighSide: {
    outerBand: [136, 135, "腸脛靱帯"],
    outerKnee: [141, 248, "大腿骨の外側の突起"],
    outerTendons: [98, 206, "大腿二頭筋の腱"],
  },
  thighBack: {
    gluteFold: [gluteX, gluteY, "お尻の下のしわ"],
    hamstrings: [135, 119, "もも裏の筋肉"],
  },
  sacrum: {
    pelvicMid: [midlineX, 118, "背骨の中央線"],
    posteriorIliacSpine: [posteriorIliacSpine.x, posteriorIliacSpine.y, "上後腸骨棘（腰骨の後ろ）"],
    sacralNotch: [hiatus.x, hiatus.y, "仙骨裂孔"],
    trochanterBack: [trochanter.x, trochanter.y, "大転子"],
    ...Object.fromEntries(foramina.map(({ x, y }, index) => [
      `hole${index + 1}`, [x, y, `第${index + 1}後仙骨孔`] as const,
    ])),
    ...Object.fromEntries(Array.from({ length: 5 }, (_, index) => [
      `lumbar${index + 1}`, [midlineX, lumbar.first + index * lumbar.spacing, `第${index + 1}腰椎の突起の下端`] as const,
    ])),
  },
  back: {
    backMid: [midlineX, 135, "背骨の中央線"],
    cervico: [midlineX, c7, "第7頸椎の突起の下端"],
    ...Object.fromEntries(Array.from({ length: 12 }, (_, index) => [
      `thoracic${index + 1}`, [midlineX, thoracic.first + index * thoracic.spacing, `第${index + 1}胸椎の突起の下端`] as const,
    ])),
  },
};

const specialAnchors: Readonly<Partial<Record<string, Readonly<Record<string, Anchor>>>>> = {
  bl2: { brow: [...faceLandmarks.innerBrow, "眉の内側の端"] },
  te23: { brow: [...faceLandmarks.outerBrow, "眉の外側の端"] },
  gv25: { nose: [105, 150, "鼻先"] },
  st3: { nose: [121, 156, "小鼻の下縁"] },
  gv27: { mouth: [105, 185, "上唇のふくらみの上縁"] },
  st5: { jawSide: [116, 190, "下あごの角"] },
  st7: { jawSide: [117, 142, "下顎切痕"] },
  si19: { jawSide: [117, 142, "下顎頭の後縁"] },
  te17: { ear: [131, 169, "耳たぶ"] },
  te21: { jawSide: [117, 142, "下あごの関節"] },
  gb2: { tragus: [121, 151, "耳珠の下の切れ込み"], jawSide: [117, 142, "下顎頭"] },
  gb3: { arch: [102, 130, "頬骨弓の中央"] },
  gb7: { templeHair: [...templeEdge, "生え際の後ろの縁"] },
  gv16: { trapezius: [129, 147, "うなじの僧帽筋"] },
  gb20: { occiput: [156, 99, "後頭骨の下縁"], trapezius: [128, 130, "僧帽筋"] },
  li17: { scm: [124, 160, "胸鎖乳突筋の後ろ縁"] },
  st10: { scm: [106, 159, "胸鎖乳突筋の前の縁"] },
  si16: { scm: [136, 138, "胸鎖乳突筋の後ろ縁"] },
  si17: { scm: [135, 97, "胸鎖乳突筋の前の縁"] },
  te16: { scm: [152, 94, "胸鎖乳突筋の後ろ縁"] },
  cv22: { collar: [102, 219, "鎖骨の間のくぼみ"] },
  si4: { littleRay: [dorsalUlnarWrist.metacarpalBase.x, dorsalUlnarWrist.metacarpalBase.y, "小指の中手骨の根元"] },
  si11: { shoulderBlade: [scapulaTip.x, scapulaTip.y, "肩甲骨の下の角"] },
  si12: { shoulderBlade: [164, 103, "肩甲骨の上のくぼみ"] },
  si13: { shoulderSpine: [scapulaRidge.inner.x, scapulaRidge.inner.y, "肩甲棘の内側の端"] },
};

const landmarkIds: Readonly<Partial<Record<string, readonly string[]>>> = {
  lu9: ["radialStyloid", "carpus", "thumbTendons", "radialArtery"],
  ht7: ["wristCrease", "ulnarTendon", "pisiform"],
  si18: ["cheek", "innerEye"],
  bl2: ["brow"],
  te23: ["brow"],
  gv26: ["philtrum", "nose", "mouth"],
  cv24: ["chinFold", "mouth"],
  te2: ["littleWeb", "ringRay", "littleRay"],
  li5: ["shortThumbExtensor", "longThumbExtensor", "radialWrist", "wristBack"],
  st9: ["voice", "scm", "carotid"],
  te20: ["earTop"],
  te21: ["upperTragusNotch", "jawSide"],
  te22: ["templeHair", "temporalArtery", "earRoot"],
  gb3: ["arch"],
  sp11: ["thighGroin", "patella", "innerThigh"],
  sp12: ["groinFold", "femoral", "pubisGroin"],
  gb20: ["occiput", "neckMuscles", "trapezius"],
  gb33: ["outerKnee", "outerTendons", "outerBand"],
  bl34: ["hole4", "sacralNotch"],
};

function guidePoint(code: string, name: string): LandmarkLabel {
  const { x, y } = headPoints[code];
  return { name, position: [x, y] };
}

const pointGuides = {
  temple: [guidePoint("st8", "頭維（額の角）"), guidePoint("gb7", "曲鬢（耳の上）")],
  ear: [guidePoint("te20", "角孫（耳の頂点の上）"), guidePoint("te17", "翳風（耳たぶの後ろ）")],
  mastoid: [guidePoint("gb9", "天衝（耳の後ろ上）"), guidePoint("gb12", "完骨（乳様突起の後ろ下）")],
};

const arcLandmarks: Readonly<Partial<Record<string, LandmarkLabel[]>>> = {
  gb4: pointGuides.temple, gb5: pointGuides.temple, gb6: pointGuides.temple,
  te18: [...pointGuides.ear, { name: "耳の後ろの骨（乳様突起）", position: mastoidTip }],
  te19: pointGuides.ear,
  gb10: pointGuides.mastoid, gb11: pointGuides.mastoid,
};

export function expandedLandmarkIds(point: ExpandedPoint, code: string) {
  return landmarkIds[code] ?? point.landmarks;
}

export function expandedLandmarkLabels(point: ExpandedPoint, code: string, names: Readonly<Record<string, { name: string }>>): readonly LandmarkLabel[] {
  const arc = arcLandmarks[code];
  if (arc) return arc;
  return expandedLandmarkIds(point, code).map((id) => {
    const landmark = names[id];
    const anchor = specialAnchors[code]?.[id] ?? anchors[point.view]?.[id];
    if (id === "ribs" || id === "sideRibs") {
      const name = whoLocations[code].match(/第\d+肋間/)?.[0] ?? "肋骨の間";
      return { name, position: [155, point.y] };
    }
    if (!anchor || !landmark) throw new Error(`${code} is missing a visual anchor for ${id}`);
    return { name: anchor[2] ?? landmark.name.replaceAll("／", ""), position: [anchor[0], anchor[1]] };
  });
}

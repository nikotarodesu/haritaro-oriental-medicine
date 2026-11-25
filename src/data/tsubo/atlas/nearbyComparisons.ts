import { armPoints, forearmWristCreaseY } from "./expanded/arms";
import { headPoints } from "./expanded/head";
import { footLandmarks } from "./footLandmarks";
import { ATLAS_POINT_MARKERS } from "./markers";
import type { AtlasLocationQuestion } from "./types";

type Position = readonly [x: number, y: number];
type Transform = { x: number; y: number; scaleX: number; scaleY: number };

export const comparisonSize = { width: 344, height: 216 };

// The same projections place the outlines and the location dots into the comparison figure.
export const comparisonTransforms = {
  ear: { x: -44, y: -233, scaleX: 2.32, scaleY: 2.32 },
  palm: { x: 29, y: -72, scaleX: 0.84, scaleY: 0.84 },
  back: { x: 391, y: -72, scaleX: -0.84, scaleY: 0.84 },
  ankle: { x: 68, y: -12, scaleX: 0.84, scaleY: 0.84 },
  shin: { x: 48, y: -12, scaleX: 1, scaleY: 1 },
  forearm: { x: 48, y: 0, scaleX: 1, scaleY: 1 },
  shoulder: { x: 70, y: 5, scaleX: 1, scaleY: 1 },
  elbow: { x: -31, y: 8, scaleX: 1.72, scaleY: 1.72 },
} as const satisfies Record<string, Transform>;

function project(point: { x: number; y: number }, transform: Transform): Position {
  return [transform.x + point.x * transform.scaleX, transform.y + point.y * transform.scaleY];
}

type ComparisonPoint = {
  code: string;
  position: Position;
  button: Position;
  leader: Position;
  difference: string;
};

export type NearbyComparison = {
  id: "ear" | "wrist" | "ankle" | "shin" | "forearm" | "shoulder" | "elbow" | "medial-knee";
  region: string;
  heading?: string;
  figureLabel: string;
  quizFigureLabel: string;
  introduction?: string;
  size?: { width: number; height: number };
  referenceCodes?: readonly string[];
  points: readonly ComparisonPoint[];
  question: AtlasLocationQuestion;
};

const { ear, palm, back, ankle, shin, forearm, shoulder, elbow } = comparisonTransforms;
const wristProximalY = 208;
const shinPoints = [
  { code: "st36", button: [45, 101], leader: [111, 101], difference: "犢鼻のくぼみから下へ3寸。3穴のうち、最もひざに近い場所です。" },
  { code: "st37", button: [249, 139], leader: [228, 139], difference: "犢鼻のくぼみから下へ6寸。足三里より足首側にあり、条口よりひざ側です。" },
  { code: "st38", button: [45, 174], leader: [111, 174], difference: "犢鼻のくぼみから下へ8寸。くぼみと足首の前の中央を結ぶ線のちょうど中間です。" },
] as const;

const forearmPoints = [
  { code: "pc6", button: [249, 195], leader: [231, 195], difference: "手首のしわからひじへ2寸。3穴のうち、最も手首寄りです。" },
  { code: "pc5", button: [45, 168], leader: [112, 168], difference: "手首のしわからひじへ3寸。手首とひじのしわの間の4分の1の高さです。" },
  { code: "pc4", button: [249, 128], leader: [231, 128], difference: "手首のしわからひじへ5寸。3穴のうち、最もひじ寄りです。" },
] as const;

export const NEARBY_COMPARISONS: readonly NearbyComparison[] = [
  {
    id: "ear",
    region: "耳の前",
    figureLabel: "耳を横から見た図。耳の前に、上から耳門、聴宮、聴会が並びます。",
    quizFigureLabel: "耳を横から見た図。耳の前の三つの丸印は、上から1番、2番、3番です。",
    points: [
      { code: "te21", position: project(headPoints.te21, ear), button: [38, 51], leader: [134, 51], difference: "耳の入口の前にある突起より上、小さな切れ込みのすぐ前です。" },
      { code: "si19", position: project(headPoints.si19, ear), button: [38, 111], leader: [134, 111], difference: "耳の入口の前にある突起と同じ高さで、その突起のすぐ前です。" },
      { code: "gb2", position: project(headPoints.gb2, ear), button: [38, 171], leader: [134, 171], difference: "耳の入口の前にある突起より下、下側の切れ込みのすぐ前です。" },
    ],
    question: {
      prompt: "耳の入口の前にある小さな突起と同じ高さで、上下に並ぶ3穴の真ん中にあるのはどれですか？",
      answerCode: "si19",
      explanation: "聴宮です。上に耳門、下に聴会があり、聴宮は耳の入口の前にある突起が目印です。",
    },
  },
  {
    id: "wrist",
    region: "手首",
    figureLabel: "ひじを上にした手首の模式図。左が手のひら側、右が手の甲側です。破線は手首のしわです。",
    quizFigureLabel: "ひじを上にした手首の図。左は手のひら側で上に1番、下に2番。右は手の甲側で上に3番、下に4番。破線は手首のしわです。",
    points: [
      { code: "pc6", position: project({ x: 114.5, y: wristProximalY }, palm), button: [27, 83], leader: [97, 83], difference: "手のひら側の手首のしわからひじへ2寸で、二本のすじの間です。" },
      { code: "pc7", position: project({ x: 114.5, y: forearmWristCreaseY }, palm), button: [27, 158], leader: [97, 158], difference: "内関と同じ二本のすじの間で、手のひら側の手首のしわに沿った位置です。" },
      { code: "te5", position: project({ x: 114.5, y: wristProximalY }, back), button: [197, 83], leader: [267, 83], difference: "手の甲側の手首のしわからひじへ2寸で、前腕に並ぶ二本の骨の間です。" },
      { code: "te4", position: project({ x: 118, y: forearmWristCreaseY }, back), button: [197, 158], leader: [267, 158], difference: "手の甲側の手首のしわで、指を伸ばすときに動くすじの小指側です。" },
    ],
    question: {
      prompt: "手のひら側で、手首のしわの高さにあるのはどれですか？",
      answerCode: "pc7",
      explanation: "大陵です。同じ手のひら側でも、内関はそのしわからひじへ2寸の高さです。",
    },
  },
  {
    id: "ankle",
    region: "足首の内側",
    figureLabel: "足首を内側から見た図。内くるぶしの後ろに太谿、真下に照海、前に中封があります。",
    quizFigureLabel: "足首を内側から見た図。内くるぶしの後ろに1番、下に2番、前に3番の丸印があります。",
    points: [
      { code: "ki3", position: project(footLandmarks.ki3, ankle), button: [28, 92], leader: [97, 92], difference: "内くるぶしの後ろで、骨の出っ張りとアキレス腱の間です。" },
      { code: "ki6", position: project(footLandmarks.ki6, ankle), button: [141, 183], leader: [151, 160], difference: "内くるぶしの出っ張りから、足裏のほうへ真下に進んだくぼみです。" },
      { code: "lr4", position: project(footLandmarks.lr4, ankle), button: [249, 73], leader: [229, 73], difference: "内くるぶしの前で、足首を起こしたときに見えるすじの内くるぶし側です。" },
    ],
    question: {
      prompt: "内くるぶしの出っ張りから足裏のほうへ、真下に進んだくぼみにあるのはどれですか？",
      answerCode: "ki6",
      explanation: "照海です。内くるぶしを目印にすると、照海は真下、太谿は後ろ、中封は前にあります。",
    },
  },
  {
    id: "shin",
    region: "すねの前",
    figureLabel: "右脚を前から見た模式図。ひざの犢鼻から足首の解谿へ向かう線上に、上から足三里、上巨虚、条口が並びます。両端の白丸が目印です。",
    quizFigureLabel: "右脚を前から見た図。ひざと足首を結ぶ線上に、ひざに近い方から1番、2番、3番の丸印があります。ひざからそれぞれ3寸、6寸、8寸です。",
    size: { width: 344, height: 278 },
    referenceCodes: ["st35", "st41"],
    points: shinPoints.map(point => ({
      ...point,
      position: project(ATLAS_POINT_MARKERS[point.code]!, shin),
    })),
    question: {
      prompt: "ひざ下のくぼみ（犢鼻）から足首側へ6寸のところにあるのはどれですか？",
      answerCode: "st37",
      explanation: "上巨虚です。足三里は3寸、上巨虚は6寸、条口は8寸です。",
    },
  },
  {
    id: "forearm",
    region: "手のひら側の前腕",
    heading: "内関・間使・郄門を図で比べる",
    figureLabel: "前腕を手のひら側から見た模式図。手首のしわからひじへ向かって、内関、間使、郄門の順に並びます。目盛りの両端は手首とひじのしわです。",
    quizFigureLabel: "手のひら側の前腕の図。手首のしわからひじへ向かって2寸に1番、3寸に2番、5寸に3番の丸印があります。",
    size: { width: 344, height: 294 },
    points: forearmPoints.map(point => ({
      ...point,
      position: project(ATLAS_POINT_MARKERS[point.code]!, forearm),
    })),
    question: {
      prompt: "手首のしわからひじへ3寸の高さにあるのはどれですか？",
      answerCode: "pc5",
      explanation: "間使です。内関は2寸、間使は3寸、郄門は5寸です。",
    },
  },
  {
    id: "shoulder",
    region: "肩の外側",
    heading: "肩髃と肩髎を図で比べる",
    figureLabel: "肩を横から見た模式図。左が胸側、右が背中側です。肩の外の骨の下に二つのくぼみがあり、肩髃は胸側、肩髎は背中側です。",
    quizFigureLabel: "肩を横から見た図。肩の外の骨の下にある二つの丸印のうち、左の胸側が1番、右の背中側が2番です。",
    introduction: "肩の外にある骨（肩峰）の下にできる二つのくぼみを比べます。左が胸側、右が背中側です。",
    size: { width: 344, height: 276 },
    points: [
      { code: "li15", position: project(armPoints.li15, shoulder), button: [36, 148], leader: [106, 148], difference: "肩の外の骨の下にできる二つのくぼみのうち、胸に近い方です。" },
      { code: "te14", position: project(armPoints.te14, shoulder), button: [267, 148], leader: [250, 148], difference: "肩の外の骨の下にできる二つのくぼみのうち、背中に近い方です。" },
    ],
    question: {
      prompt: "肩の外側の骨の下にある二つのくぼみのうち、背中側にあるのはどれですか？",
      answerCode: "te14",
      explanation: "肩髎です。肩の外側の骨を目印にすると、肩髃は胸側のくぼみにあります。",
    },
  },
  {
    id: "elbow",
    region: "ひじの前",
    heading: "曲池・尺沢・曲沢を図で比べる",
    figureLabel: "ひじを前から見た模式図。横じわに沿い、親指側の左から曲池、尺沢、曲沢が並びます。尺沢と曲沢の間に力こぶから続く腱があります。",
    quizFigureLabel: "ひじを前から見た図。親指側の左から1番、2番、3番の丸印が並び、2番と3番の間に力こぶから続く腱があります。",
    introduction: "手のひらを上にしたときの、ひじの横じわを拡大しました。骨の出っ張りと、力こぶから続くすじ（腱）が目印です。",
    points: [
      { code: "li11", position: project(armPoints.li11, elbow), button: [30, 94], leader: [94, 94], difference: "ひじの外側に出ている骨と尺沢の中間です。図では三つのツボのうち最も親指側にあります。" },
      { code: "lu5", position: project(armPoints.lu5, elbow), button: [30, 164], leader: [94, 164], difference: "ひじの横じわに沿って、力こぶから続くすじ（腱）のすぐ親指側にあるくぼみです。" },
      { code: "pc3", position: project(armPoints.pc3, elbow), button: [265, 111], leader: [246, 111], difference: "ひじの横じわの上で、力こぶから続くすじ（腱）のすぐ小指側にあるくぼみです。" },
    ],
    question: {
      prompt: "手のひらを上にしたひじの図で、力こぶから続くすじのすぐ親指側にあるのはどれですか？",
      answerCode: "lu5",
      explanation: "尺沢です。そのすじのすぐ小指側が曲沢で、曲池は尺沢より親指側にあります。",
    },
  },
  {
    id: "medial-knee",
    region: "ひざの内側",
    heading: "陰陵泉・血海・曲泉を図で比べる",
    figureLabel: "ひざを内側から見た模式図。血海は前寄りでお皿より上、曲泉はひざ裏のしわの内側端、陰陵泉はひざの下で、すねの骨が広がる部分のすぐ下です。",
    quizFigureLabel: "ひざを内側から見た図。1番は前寄りでお皿より上、2番はひざ裏のしわの内側端、3番はひざの下で、すねの骨が広がる部分のすぐ下にあります。",
    introduction: "ひざの内側を横から見た模式図です。お皿の上、ひざ裏のしわ、すねの骨の角を目印にします。",
    size: { width: 344, height: 264 },
    points: [
      { code: "sp10", position: [146, 84], button: [36, 76], leader: [111, 76], difference: "お皿の上縁の内端から上へ2寸。太ももの前内側の筋肉が盛り上がるところです。" },
      { code: "lr8", position: [207, 139], button: [260, 150], leader: [249, 150], difference: "ひざ裏の横じわの内側端で、太ももの裏から続くすじ（腱）より内側のくぼみです。" },
      { code: "sp9", position: [174, 168], button: [36, 184], leader: [116, 184], difference: "ひざのすぐ下で、すねの骨が内ひざへ広がる部分の下にあるくぼみです。" },
    ],
    question: {
      prompt: "すねの骨が内ひざへ広がる部分のすぐ下にあるのは、図の何番ですか？",
      answerCode: "sp9",
      explanation: "陰陵泉です。血海はお皿より上の筋肉、曲泉はひざ裏のしわの端が目印です。",
    },
  },
];

export function getNearbyComparisons(code: string) {
  return NEARBY_COMPARISONS.filter(group =>
    group.referenceCodes?.includes(code) || group.points.some(point => point.code === code),
  );
}

export function nearbyComparisonAnchor(code: string, id: NearbyComparison["id"]) {
  return getNearbyComparisons(code)[0]?.id === id ? "acupoint-nearby" : `acupoint-nearby-${id}`;
}

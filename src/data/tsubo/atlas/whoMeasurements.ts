export const boneCunSpans = {
  scalp: 12,
  upperChest: 9,
  upperAbdomen: 8,
  lowerAbdomen: 5,
  upperArm: 9,
  forearm: 12,
  innerShin: 13,
  outerShin: 16,
  outerThigh: 19,
  backThigh: 14,
  innerAnkle: 3,
} as const;

export const measurementUnits = {
  "寸": { anchor: "#bone-cun-table", guide: "寸（骨度法）の測り方" },
  "指寸": { anchor: "#finger-cun", guide: "指寸の測り方" },
  "指幅": { anchor: "#fingerbreadth", guide: "指幅の測り方" },
} as const;

type Unit = keyof typeof measurementUnits;
type Span = readonly [end: string, length: number];
type Reference = readonly [match: RegExp, start: string, direction: string, span?: Span];

const spans = boneCunSpans;

// Every rule matches a measurement's preceding words in the published WHO summary.
// A full span is given only where both endpoints are established skeletal landmarks.
const references: readonly Reference[] = [
  [/手首のしわから、?ひじへ$/, "手首のしわ", "ひじ側へ", ["ひじの横じわ", spans.forearm]],
  [/ひじの横じわから手首へ$/, "ひじの横じわ", "手首側へ", ["手首のしわ", spans.forearm]],
  [/脇の前のしわから下へ$/, "脇の前のしわ", "下へ", ["ひじの横じわ", spans.upperArm]],
  [/ひじの横じわから肩へ$/, "ひじの横じわ", "肩側へ", ["脇のしわの高さ", spans.upperArm]],
  [/曲池（LI11）から肩へ$/, "曲池（LI11）", "肩側へ"],
  [/水溝（GV26）から横へ$/, "水溝（GV26）", "横へ"],
  [/口角の外側へ$/, "口角", "外側へ"],
  [/下あごの角から、その角を二等分する方向に、前上方へ$/, "下あごの角", "ななめ前上へ"],
  [/額の角の生え際から頭頂側へ$/, "額の角の生え際", "頭頂側へ"],
  [/正中線から横へ$/, "正中線", "横へ"],
  [/へその中央から上へ$/, "へその中央", "上へ", ["胸骨体と剣状突起の境", spans.upperAbdomen]],
  [/へその中央から下へ$/, "へその中央", "下へ", ["恥骨結合の上縁", spans.lowerAbdomen]],
  [/へそから横へ$/, "へその中央", "横へ"],
  [/お皿の上縁(?:の内端)?から上へ$/, "ひざのお皿の上縁", "上へ"],
  [/犢鼻から下へ$/, "犢鼻（ST35）", "下へ"],
  [/外くるぶしの頂点から上へ$/, "外くるぶしの頂点", "上へ", ["ひざ裏の横じわ", spans.outerShin]],
  [/条口から外へ$/, "条口（ST38）", "外側へ"],
  [/内くるぶしの頂点から上へ$/, "内くるぶしの頂点", "上へ", ["陰陵泉の高さ", spans.innerShin]],
  [/陰陵泉（SP9）から下へ$/, "陰陵泉（SP9）", "下へ", ["内くるぶしの頂点", spans.innerShin]],
  [/脇の後ろのしわから上へ$/, "脇の後ろのしわ", "上へ"],
  [/目頭から内上方へ$/, "目頭", "鼻側のななめ上へ"],
  [/額の生え際から頭頂側へ$/, "額の生え際", "頭頂側へ"],
  [/正中仙骨稜から横へ$/, "仙骨の正中線", "横へ"],
  [/尾骨の先端と同じ高さで、左右に$/, "尾骨の先端", "左右それぞれへ"],
  [/お尻の下のしわから下へ$/, "お尻の下のしわ", "下へ", ["ひざ裏の横じわ", spans.backThigh]],
  [/膝裏の横じわから太もも側へ$/, "ひざ裏の横じわ", "上へ"],
  [/膝裏の横じわから下へ$/, "ひざ裏の横じわ", "下へ", ["外くるぶしの高さ", spans.outerShin]],
  [/崑崙（BL60）から上へ$/, "崑崙（BL60）", "上へ"],
  [/太谿（KI3）から下へ$/, "太谿（KI3）", "下へ"],
  [/内くるぶしの頂点から真下へ$/, "内くるぶしの頂点", "真下へ", ["足の裏", spans.innerAnkle]],
  [/（肘頭）から手首へ$/, "ひじの出っ張り", "手首側へ"],
  [/肘頭）?から肩(?:側)?へ$/, "ひじの出っ張り", "肩側へ"],
  [/肩峰角から下へ$/, "肩峰角", "下へ"],
  [/目尻から外へ$/, "目尻", "外側へ"],
  [/生え際から頭頂側へ$/, "耳の上の生え際", "頭頂側へ"],
  [/眉から上へ$/, "眉", "上へ"],
  [/脇の中央から下ろした線より胸の前側へ$/, "脇の中央の縦線", "胸の前側へ"],
  [/上前腸骨棘（腰骨の前の出っ張り）から内下方へ$/, "腰骨の前の出っ張り", "内側のななめ下へ"],
  [/膝裏の横じわから上へ$/, "ひざ裏の横じわ", "上へ", ["大転子の高さ", spans.outerThigh]],
  [/陰陵泉（SP9）から後ろへ$/, "陰陵泉（SP9）", "ひざ裏側へ"],
  [/気衝（ST30）から下へ$/, "気衝（ST30）", "下へ"],
  [/風府（GV16）から下へ$/, "風府（GV16）", "下へ"],
  [/後ろの生え際から頭頂側へ$/, "後ろの生え際", "頭頂側へ", ["額の生え際", spans.scalp]],
  [/前後の生え際を結ぶ線の中点より額側へ$/, "前後の生え際の中点", "額側へ", ["額の生え際", spans.scalp / 2]],
  [/眉の内端同士の中点から上へ$/, "眉の内端の中点", "上へ"],
  [/胸骨体と剣状突起の境から下へ$/, "胸骨体と剣状突起の境", "下へ", ["へその中央", spans.upperAbdomen]],
  [/鎖骨の間のくぼみ（胸骨上窩）から下へ$/, "鎖骨の間のくぼみ", "下へ", ["胸骨体と剣状突起の境", spans.upperChest]],
];

const frontHairMidline = new Set(["gv20", "gv21", "gv22", "gv23", "gv24"]);

export function getWhoMeasurements(code: string, text: string) {
  return Array.from(text.matchAll(/(\d+(?:\.\d+)?)(指寸|指幅|寸)/g), (match) => {
    const [token, number, symbol] = match;
    const position = match.index ?? 0;
    const before = text.slice(0, position);
    const amount = Number(number);
    const unit = symbol as Unit;
    const nailDirection = before.match(/爪の[^。]*の角から、?(付け根(?:・[^。]+)?)へ$/)?.[1];
    const reference = references.find(([pattern]) => pattern.test(before));
    const start = nailDirection ? "爪の角" : reference?.[1];
    const direction = nailDirection ? (nailDirection === "付け根" ? "付け根側へ" : `${nailDirection}へ`) : reference?.[2];
    const span: Span | undefined = frontHairMidline.has(code) && start === "額の生え際"
      ? ["後ろの生え際", spans.scalp]
      : reference?.[3];
    return { token, amount, unit, start, direction, span, position };
  });
}

export type WhoMeasurement = ReturnType<typeof getWhoMeasurements>[number];

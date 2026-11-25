export const KEY_POINT_TYPES_GUIDE = "/tsubo/basics/key-point-types";
export const FOUR_COMMAND_REVIEW_ID = "four-command-points-review";
export const FOUR_COMMAND_REVIEW_HREF = `/articles/${FOUR_COMMAND_REVIEW_ID}`;

const fiveTransportMeridians = [
  { yin: true, codes: ["lu11", "lu10", "lu9", "lu8", "lu5"] },
  { yin: false, codes: ["li1", "li2", "li3", "li5", "li11"] },
  { yin: false, codes: ["st45", "st44", "st43", "st41", "st36"] },
  { yin: true, codes: ["sp1", "sp2", "sp3", "sp5", "sp9"] },
  { yin: true, codes: ["ht9", "ht8", "ht7", "ht4", "ht3"] },
  { yin: false, codes: ["si1", "si2", "si3", "si5", "si8"] },
  { yin: false, codes: ["bl67", "bl66", "bl65", "bl60", "bl40"] },
  { yin: true, codes: ["ki1", "ki2", "ki3", "ki7", "ki10"] },
  { yin: true, codes: ["pc9", "pc8", "pc7", "pc5", "pc3"] },
  { yin: false, codes: ["te1", "te2", "te3", "te6", "te10"] },
  { yin: false, codes: ["gb44", "gb43", "gb41", "gb38", "gb34"] },
  { yin: true, codes: ["lr1", "lr2", "lr3", "lr4", "lr8"] },
] as const;

export const FIVE_TRANSPORT_STAGES = [
  { id: "jing-well", stem: "井", label: "井穴", reading: "せいけつ", image: "水がわき出すところ", yin: "木", yang: "金" },
  { id: "ying-spring", stem: "滎", label: "滎穴", reading: "えいけつ", image: "小さな流れが始まるところ", yin: "火", yang: "水" },
  { id: "shu-stream", stem: "兪", label: "兪穴", reading: "ゆけつ", image: "水が注ぎこむところ", yin: "土", yang: "木" },
  { id: "jing-river", stem: "経", label: "経穴（五輸穴）", reading: "けいけつ", image: "水が流れていくところ", yin: "金", yang: "火" },
  { id: "he-sea", stem: "合", label: "合穴", reading: "ごうけつ", image: "流れが合わさるところ", yin: "水", yang: "土" },
] as const;

type KeyPointType = {
  id: string;
  label: string;
  reading: string;
  description: string;
  codes: readonly string[];
  exampleCode: string;
  exampleLocation?: string;
};

// Codes are explicit memberships, independent of free-text tags in the atlas.
export const KEY_POINT_TYPES: readonly KeyPointType[] = [
  {
    id: "yuan", label: "原穴", reading: "げんけつ",
    description: "十二経脈に一つずつある、原気と結びつけて説明されるツボです。陰経では五輸穴の兪穴が原穴を兼ね、陽経では別のツボです。",
    codes: ["lu9", "li4", "st42", "sp3", "ht7", "si4", "bl64", "ki3", "pc7", "te4", "gb40", "lr3"],
    exampleCode: "li4",
  },
  {
    id: "luo", label: "絡穴", reading: "らくけつ",
    description: "経脈から枝分かれする絡脈と結びつけるツボです。十二経脈の各一穴、任脈・督脈の各一穴、脾の大絡の一穴を数えます。",
    codes: ["lu7", "li6", "st40", "sp4", "ht5", "si7", "bl58", "ki4", "pc6", "te5", "gb37", "lr5", "cv15", "gv1", "sp21"],
    exampleCode: "pc6",
  },
  {
    id: "xi", label: "郄穴", reading: "げきけつ",
    description: "経脈の気血が深く集まると説明されるツボです。十二経脈に加え、陰蹻脈・陽蹻脈・陰維脈・陽維脈にも一つずつあります。",
    codes: ["lu6", "li7", "st34", "sp8", "ht6", "si6", "bl63", "ki5", "pc4", "te7", "gb36", "lr6", "ki8", "bl59", "ki9", "gb35"],
    exampleCode: "st34",
  },
  {
    id: "front-mu", label: "募穴", reading: "ぼけつ",
    description: "臓腑と対応づける胸・お腹のツボです。たとえば胃の募穴は、任脈にある中脘です。",
    codes: ["lu1", "cv17", "cv14", "lr14", "gb24", "lr13", "cv12", "cv5", "cv4", "st25", "cv3", "gb25"],
    exampleCode: "cv12",
  },
  {
    id: "back-shu", label: "背部兪穴", reading: "はいぶゆけつ",
    description: "臓腑と対応づける背中・腰・仙骨部のツボです。十二の背部兪穴はすべて膀胱経に属します。",
    codes: ["bl13", "bl14", "bl15", "bl18", "bl19", "bl20", "bl21", "bl22", "bl23", "bl25", "bl27", "bl28"],
    exampleCode: "bl14",
    exampleLocation: "第4胸椎の突起の下縁と同じ高さで、背中の中央から横へ1.5寸のところにあります。",
  },
  {
    id: "five-transport", label: "五輸穴", reading: "ごゆけつ",
    description: "十二経脈にそれぞれある井・滎・兪・経・合の五つです。指先や足先から肘や膝の方へ向かう並びを水の流れにたとえます。「五兪穴」とも書きます。",
    codes: fiveTransportMeridians.flatMap(({ codes }) => codes),
    exampleCode: "st36",
  },
  {
    id: "lower-he", label: "下合穴", reading: "げごうけつ",
    description: "六腑と一つずつ対応づける下肢のツボです。足三里は胃経の合穴で、胃の下合穴も兼ねます。",
    codes: ["st36", "st37", "st39", "bl40", "bl39", "gb34"],
    exampleCode: "st37",
  },
  {
    id: "four-command", label: "四総穴", reading: "しそうけつ",
    description: "体の四つの部位とツボの対応を覚える、昔からの分類です。「四総穴歌」という短い詩では、お腹には足三里、腰と背中には委中、頭と首の後ろには列缺、顔と口には合谷が対応します。",
    codes: ["li4", "st36", "lu7", "bl40"],
    exampleCode: "bl40",
    exampleLocation: "ひざ裏の横じわの中央にあります。",
  },
  {
    id: "eight-confluent", label: "八脈交会穴", reading: "はちみゃくこうかいけつ",
    description: "十二経脈のツボのうち、奇経八脈と一つずつ結びつける八つです。内関は陰維脈、公孫は衝脈に対応します。",
    codes: ["sp4", "pc6", "gb41", "te5", "si3", "bl62", "lu7", "ki6"],
    exampleCode: "pc6",
  },
  {
    id: "eight-influential", label: "八会穴", reading: "はちえけつ",
    description: "臓・腑・気・血・筋・脈・骨・髄という八つの区分と結びつけるツボです。たとえば陽陵泉は筋の会穴です。",
    codes: ["lr13", "cv12", "cv17", "bl17", "gb34", "lu9", "bl11", "gb39"],
    exampleCode: "gb34",
  },
];

const fiveTransportByCode = new Map<string, { stage: (typeof FIVE_TRANSPORT_STAGES)[number]; element: string }>(
  fiveTransportMeridians.flatMap(({ yin, codes }) => codes.map((code, index) => {
    const stage = FIVE_TRANSPORT_STAGES[index];
    return [code, { stage, element: yin ? stage.yin : stage.yang }] as const;
  })),
);

const filterCodes = new Map<string, ReadonlySet<string>>([
  ...KEY_POINT_TYPES.map(({ label, codes }) => [label, new Set(codes)] as const),
  ...FIVE_TRANSPORT_STAGES.map(({ label }, index) => [
    label,
    new Set(fiveTransportMeridians.map(({ codes }) => codes[index])),
  ] as const),
]);

export const KEY_POINT_FILTER_LABELS = [...filterCodes.keys()];
export const CLASSIFIED_ACUPOINT_CODES = [...new Set(KEY_POINT_TYPES.flatMap(({ codes }) => codes))];

export function getKeyPointFilterLabel(value: string | null): string | undefined {
  const normalized = value === "五兪穴" ? "五輸穴" : value;
  return normalized && filterCodes.has(normalized) ? normalized : undefined;
}

export function isAcupointInKeyPointType(code: string, label: string): boolean {
  return filterCodes.get(label)?.has(code.toLowerCase()) ?? false;
}

export function keyPointFilterHref(label: string): string {
  return `/tsubo?category=${encodeURIComponent(label)}#tsubo-list`;
}

export type AcupointKeyPointType = { id: string; label: string };

export function getAcupointKeyPointTypes(code: string): AcupointKeyPointType[] {
  const codeLower = code.toLowerCase();
  const transport = fiveTransportByCode.get(codeLower);
  return KEY_POINT_TYPES
    .filter(({ codes }) => codes.includes(codeLower))
    .map(({ id, label }) => id === "five-transport" && transport
      ? { id: transport.stage.id, label: `${transport.stage.stem}${transport.element}穴（五輸穴）` }
      : { id, label });
}

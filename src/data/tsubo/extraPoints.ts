export const EXTRA_POINTS_PATH = "/tsubo/extra-points";
export const EXTRA_POINTS_REVISED_AT = "2026-11-24";

const whoNomenclature = {
  title: "WHO『A proposed standard international acupuncture nomenclature』",
  href: "https://apps.who.int/iris/bitstream/handle/10665/40001/9241544171_eng.pdf",
  note: "3.5節の頭頸部の表（p. 15）で、奇穴のコードと名称を確認しました。",
};

export const EXTRA_POINTS = [
  {
    slug: "yintang",
    href: `${EXTRA_POINTS_PATH}/yintang`,
    name: "印堂",
    kana: "いんどう",
    code: "EX-HN3",
    alternateCodes: ["GV24+"],
    pinyin: "Yìntáng",
    description: "印堂は、左右の眉頭のちょうど中間にあるくぼみです。顔を正面から見た図で場所を確かめます。",
    landmark: "左右の眉頭",
    position: "左右の眉の内側の端を結んだ線の中央、眉間のくぼみです。",
    figureDescription: "顔を正面から見た図。左右の眉頭を白丸で、ちょうど中間にある印堂を橙色の丸で示しています。",
    figureCaption: "正面から見た顔",
    nearby: [{ name: "攅竹", code: "BL2", href: "/tsubo/bl2", distinction: "左右それぞれの眉頭のくぼみ。" }],
    sources: [
      whoNomenclature,
      {
        title: "中国国家規格 GB/T 12346—2021『経穴名称と位置』",
        href: "https://www.ntcamsac.ac.cn/upload/std_info/202306192125376309.pdf",
        note: "第5.13.25項で、印堂の位置と督脈でのコード（GV24+）を確認しました。",
      },
    ],
    classification: "WHOの名称案では奇穴EX-HN3、中国の2021年版の経穴規格では督脈のGV24+として収録されています。どちらも眉間の印堂を指します。",
  },
  {
    slug: "taiyang",
    href: `${EXTRA_POINTS_PATH}/taiyang`,
    name: "太陽",
    kana: "たいよう",
    code: "EX-HN5",
    alternateCodes: [],
    pinyin: "Tàiyáng",
    description: "太陽は、眉尻と目尻の中間から耳の方に寄った、こめかみのくぼみです。顔を横から見た図で位置を確かめます。",
    landmark: "眉尻と目尻",
    position: "眉尻（眉の外側の端）と目尻の中間から、耳の方へ中指の横幅ほど進んだくぼみです。左右のこめかみにあります。",
    figureDescription: "顔を横から見た図。眉尻と目尻を白丸で、その中間より耳の方にある太陽を橙色の丸で示しています。",
    figureCaption: "横から見た顔（鼻が左、耳が右）",
    nearby: [
      { name: "糸竹空", code: "TE23", href: "/tsubo/te23", distinction: "眉尻にあるくぼみ。" },
      { name: "瞳子髎", code: "GB1", href: "/tsubo/gb1", distinction: "目尻のすぐ外側の骨の縁にあるくぼみ。" },
    ],
    sources: [
      whoNomenclature,
      {
        title: "中国国家規格 GB/T 40997—2021『経外奇穴名称と位置』",
        href: "https://zynj.shutcm.edu.cn/_upload/article/files/66/b4/b34a95604d04b0bf686251b2d317/72823dbe-8f55-4e2b-b98b-ff106160f598.pdf",
        note: "第7.1.4項で、太陽の位置と目印を確認しました。",
      },
    ],
    classification: null,
  },
] as const;

export type ExtraPoint = (typeof EXTRA_POINTS)[number];

import type { NearbyComparison } from "./nearbyComparisons";

export const ATLAS_COMPARISON_GUIDES_REVISED_AT = "2026-11-28";

export const ATLAS_COMPARISON_GUIDES = [
  {
    id: "forearm",
    slug: "pc6-pc5-pc4",
    title: "内関・間使・郄門の違い",
    description: "内関（PC6）・間使（PC5）・郄門（PC4）は、手のひら側の前腕に並ぶツボ。手首のしわからひじへ2寸・3寸・5寸の違いを一枚の図で比べます。",
    caption: "手のひらを上に向けた図。手首のしわからひじへ測ります。",
    landmarkHeading: "手首のしわから測る",
    landmark: "手首とひじのしわの間を12等分し、1区切りを1寸とします。3穴とも長掌筋の腱と橈側手根屈筋の腱の間にあります。",
    note: "長掌筋の腱がない場合は、同じ高さで橈側手根屈筋の腱の小指側を目印にします。",
  },
  {
    id: "elbow",
    slug: "li11-lu5-pc3",
    title: "曲池・尺沢・曲沢の違い",
    description: "曲池（LI11）・尺沢（LU5）・曲沢（PC3）の位置を一枚の図で比較。ひじの外側の骨と、力こぶから続く腱の親指側・小指側を見分けます。",
    caption: "手のひらを上に向けたときのひじ。",
    landmarkHeading: "ひじを曲げたときの目印",
    landmark: "尺沢と曲沢は、ひじの前のしわにあるくぼみです。図の外側の骨は上腕骨外側上顆です。ひじを深く曲げると、曲池はしわの外側の端にできるくぼみを目印にできます。",
    pointNotes: {
      li11: "尺沢と外側の骨の中間",
      lu5: "力こぶの腱の親指側",
      pc3: "力こぶの腱の小指側",
    } satisfies Readonly<Record<string, string>>,
  },
  {
    id: "shin",
    slug: "st36-st37-st38",
    title: "足三里・上巨虚・条口の違い",
    description: "足三里（ST36）・上巨虚（ST37）・条口（ST38）の位置を一枚の図で比較。ひざ下の外側のくぼみから足首へ3寸・6寸・8寸の位置を、目盛りで確認できます。",
    caption: "右脚を前から見た図。ひざ下のくぼみから足首へ測ります。",
    landmarkHeading: "ひざ下のくぼみから測る",
    landmark: "ひざを曲げると、お皿の下の太いすじの外側に犢鼻（ST35）のくぼみができます。そこから足首の前の解谿（ST41）までの線を16等分し、1目盛りを1寸とします。3穴とも、すねの骨の外側にある前脛骨筋の上です。",
  },
].map(guide => ({ ...guide, href: `/tsubo/compare/${guide.slug}` }));

export type AtlasComparisonGuide = (typeof ATLAS_COMPARISON_GUIDES)[number];

export function getAtlasComparisonGuide(id: NearbyComparison["id"]) {
  return ATLAS_COMPARISON_GUIDES.find(guide => guide.id === id);
}

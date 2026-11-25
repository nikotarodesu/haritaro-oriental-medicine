import type { NearbyComparison } from "./nearbyComparisons";

export const ATLAS_COMPARISON_GUIDES_REVISED_AT = "2026-11-25";

export const ATLAS_COMPARISON_GUIDES = [
  {
    id: "forearm",
    slug: "pc6-pc5-pc4",
    title: "内関・間使・郄門の違い",
    description: "内関（PC6）・間使（PC5）・郄門（PC4）は、手のひら側の前腕に並ぶツボ。手首のしわからひじへ2寸・3寸・5寸の違いを一枚の図で比べます。",
    summary: "手首のしわからひじに向かって、内関は2寸、間使は3寸、郄門は5寸。3穴とも、手のひら側の前腕にある二本の腱の間です。",
    caption: "手のひら側から見た前腕。目盛りの両端が、手首とひじのしわです。",
    landmarkHeading: "手首のしわから測る",
    landmark: "手のひらを上に向け、手首とひじの横じわの間を12等分します。その1区切りがこの部位の1寸です。二本のすじは長掌筋の腱と橈側手根屈筋の腱です。",
    note: "長掌筋の腱がない場合は、橈側手根屈筋の腱の小指側が目印です。手首から測る高さは同じです。",
  },
  {
    id: "elbow",
    slug: "li11-lu5-pc3",
    title: "曲池・尺沢・曲沢の違い",
    description: "曲池（LI11）・尺沢（LU5）・曲沢（PC3）の位置を一枚の図で比較。ひじの外側の骨と、力こぶから続く腱の親指側・小指側を見分けます。",
    summary: "ひじの前で、尺沢は力こぶから続く腱の親指側、曲沢は小指側にあります。曲池は尺沢より親指側で、ひじの外側に出ている骨との中間です。",
    caption: "手のひらを上に向けたときのひじ。図の左が親指側、右が小指側です。",
    landmarkHeading: "ひじの横じわと、力こぶの腱を目印に",
    landmark: "尺沢と曲沢は、ひじの前にある横じわ上のくぼみです。力こぶ（上腕二頭筋）から続く腱をはさんで、親指側が尺沢、小指側が曲沢です。",
    note: "曲池は、尺沢とひじ外側の骨の出っ張り（上腕骨外側上顆）の中間です。ひじを深く曲げると、横じわの外側の端にできるくぼみが目印になります。",
  },
  {
    id: "shin",
    slug: "st36-st37-st38",
    title: "足三里・上巨虚・条口の違い",
    description: "足三里（ST36）・上巨虚（ST37）・条口（ST38）の位置を一枚の図で比較。ひざ下の外側のくぼみから足首へ3寸・6寸・8寸の位置を、目盛りで確認できます。",
    summary: "3穴とも、ひざ下の外側のくぼみと足首の前の中央を結ぶ線上にあります。くぼみから足首に向かって、足三里は3寸、上巨虚は6寸、条口は8寸です。",
    caption: "右脚を前から見た図。線の両端の丸印が、ひざと足首の目印です。",
    landmarkHeading: "ひざ下のくぼみから測る",
    landmark: "ひざを曲げたとき、お皿の下にある太いすじの外側のくぼみが犢鼻（ST35）です。そこから足首の前の中央のくぼみ（解谿・ST41）までを直線で結びます。",
    note: "図では、この線を16等分して1目盛りを1寸としています。3穴とも、すねの骨の外側にある前脛骨筋の上に並びます。",
  },
].map(guide => ({ ...guide, href: `/tsubo/compare/${guide.slug}` }));

export function getAtlasComparisonGuide(id: NearbyComparison["id"]) {
  return ATLAS_COMPARISON_GUIDES.find(guide => guide.id === id);
}

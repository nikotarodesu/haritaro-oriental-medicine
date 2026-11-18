import type { AcupointAtlasArticle } from "./types";

// Illustration sets for existing entries whose article text is edited separately.
export const POINT_ILLUSTRATIONS: Readonly<Partial<Record<string, AcupointAtlasArticle["illustration"]>>> = {
  pc5: {
    region: "volarForearm",
    bodyLabel: "左右の前腕（手のひら側）",
    closeUpAlt: "間使は、手首のしわからひじ側へ3寸、①長掌筋の腱と②橈側手根屈筋の腱の間。",
    closeUpCaption: "手首からひじまでの長さの4分の1だけ、しわからひじ側へ。2本の腱（筋肉と骨をつなぐすじ）の間に間使があります。",
    meridianStart: 4, meridianEnd: 9,
    meridianCaption: "間使（PC5）は郄門（PC4）と内関（PC6）の間です。",
  },
  pc7: {
    region: "volarWrist",
    bodyLabel: "左右の手首（手のひら側）",
    closeUpAlt: "大陵は手のひら側の手首のしわの中央、①長掌筋の腱と②橈側手根屈筋の腱の間。",
    closeUpCaption: "手のひら側で手首を横切るしわを見つけます。その中央で、2本の腱（筋肉と骨をつなぐすじ）の間にあるのが大陵です。",
    meridianStart: 4, meridianEnd: 9,
    meridianCaption: "大陵（PC7）は内関（PC6）と労宮（PC8）の間です。",
  },
};

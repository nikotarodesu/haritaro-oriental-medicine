interface AcupointLocationImage {
  src: string;
  width: number;
  height: number;
  alt: string;
  share: { path: string; width: number; height: number; alt: string };
}

export const ACUPOINT_LOCATION_IMAGES: Readonly<Partial<Record<string, AcupointLocationImage>>> = {
  li4: {
    src: "/images/acupoints/li4-location.webp",
    width: 720,
    height: 636,
    alt: "手の甲で、合谷（LI4）と人差し指・親指につながる骨の位置を示す図",
    share: {
      path: "/images/acupoints/li4-share.jpg",
      width: 1200,
      height: 630,
      alt: "合谷（LI4）の位置図。人差し指につながる骨の中央から少し親指側",
    },
  },
  st36: {
    src: "/images/acupoints/st36-location.webp",
    width: 720,
    height: 636,
    alt: "右脚の正面から、ひざ下の外側のくぼみを起点に足三里（ST36）の位置を示す図",
    share: {
      path: "/images/acupoints/st36-share.jpg",
      width: 1200,
      height: 630,
      alt: "足三里（ST36）の位置図。ひざ下の外側のくぼみから足首側へ3寸",
    },
  },
};

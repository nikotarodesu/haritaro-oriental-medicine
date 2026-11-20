export const ACUPUNCTURE_GUIDE = {
  href: "/learn/acupuncture",
  title: "鍼灸とは？ はり・お灸・ツボ押しの違い",
  description: "はり・お灸・ツボ押しを一枚の図で比較。ツボの探し方、施術の流れ、鍼への体の反応、単独と組み合わせの効果を調べた研究の読み方まで学べる鍼灸入門です。",
  revisedAt: "2026-11-20",
} as const;

export const ACUPUNCTURE_TRIAL_COMPARISON_HREF = `${ACUPUNCTURE_GUIDE.href}#combinations`;

const historyArticle = "science-of-oriental-medicine-history";
const nineNeedlesAnchor = "ancient-nine-needles";

export const NINE_NEEDLES_GUIDE = {
  articleId: historyArticle,
  anchor: nineNeedlesAnchor,
  href: `/articles/${historyArticle}#${nineNeedlesAnchor}`,
  title: "古代の九鍼（きゅうしん）",
} as const;

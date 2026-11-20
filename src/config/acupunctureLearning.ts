export const ACUPUNCTURE_GUIDE = {
  href: "/learn/acupuncture",
  title: "鍼灸とは？ はり・お灸・ツボ押しの違い",
  description: "はりとお灸の道具、ツボ押しとの違い、経穴と配穴、施術を受ける流れ、研究の読み方を図で学べる鍼灸入門です。",
  revisedAt: "2026-11-20",
} as const;

const historyArticle = "science-of-oriental-medicine-history";
const nineNeedlesAnchor = "ancient-nine-needles";

export const NINE_NEEDLES_GUIDE = {
  articleId: historyArticle,
  anchor: nineNeedlesAnchor,
  href: `/articles/${historyArticle}#${nineNeedlesAnchor}`,
  title: "古代の九鍼（きゅうしん）",
} as const;

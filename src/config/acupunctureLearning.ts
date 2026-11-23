export const ACUPUNCTURE_GUIDE = {
  href: "/learn/acupuncture",
  label: "鍼灸入門",
  title: "鍼灸とは？ はり・お灸・ツボ押しの違い",
  description: "はり・お灸・ツボ押しを一枚の図で比較。ツボの探し方、施術の流れ、鍼への体の反応、単独と組み合わせの効果を調べた研究の読み方まで学べる鍼灸入門です。",
  revisedAt: "2026-11-20",
} as const;

export const ACUPUNCTURE_TRIAL_COMPARISON_HREF = `${ACUPUNCTURE_GUIDE.href}#combinations`;

export const ACUPUNCTURE_RESEARCH = {
  href: "/learn/acupuncture/research",
  title: "鍼灸の研究を読む",
  description: "腰痛、膝痛、片頭痛、術後の吐き気、鍼灸の安全性や弁証の研究を読みます。誰を調べ、何と比べ、何を数えたかを原著と照らし合わせられます。",
  revisedAt: "2026-11-23",
} as const;

export function acupunctureResearchHref(slug: string) {
  return `${ACUPUNCTURE_RESEARCH.href}/${slug}`;
}

export const PATTERN_AGREEMENT_HREF = acupunctureResearchHref("pattern-diagnosis-agreement");
export const KNEE_RESEARCH_HREF = acupunctureResearchHref("knee-osteoarthritis");
export const MIGRAINE_RESEARCH_HREF = acupunctureResearchHref("migraine-prevention");

export const SYMPTOM_RESEARCH_LINKS: Readonly<Partial<Record<string, { href: string; label: string }>>> = {
  "headache-stiff-neck": { href: MIGRAINE_RESEARCH_HREF, label: "片頭痛の予防試験を読み比べる" },
  "lower-back-pain-sciatica": { href: acupunctureResearchHref("low-back-pain-sciatica"), label: "腰痛と坐骨神経痛の3試験を読み比べる" },
  "knee-joint-pain": { href: KNEE_RESEARCH_HREF, label: "膝の痛みと動きやすさを比べた試験を読む" },
};

const historyArticle = "science-of-oriental-medicine-history";
const nineNeedlesAnchor = "ancient-nine-needles";

export const NINE_NEEDLES_GUIDE = {
  articleId: historyArticle,
  anchor: nineNeedlesAnchor,
  href: `/articles/${historyArticle}#${nineNeedlesAnchor}`,
  title: "古代の九鍼（きゅうしん）",
} as const;

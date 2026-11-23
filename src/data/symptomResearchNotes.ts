import type { StudySource } from "./tsubo/atlas/types";

interface ResearchNote {
  title: string;
  body: string;
  sources: readonly StudySource[];
}

export const SYMPTOM_RESEARCH_REVISED_AT = "2026-11-23";

export const SYMPTOM_RESEARCH_NOTES: Readonly<Partial<Record<string, ResearchNote>>> = {
  "headache-stiff-neck": {
    title: "首の痛みで、本人が気づくほど差があったか",
    body: "慢性の首の痛みがある716人を4群に分けた試験です。押すと痛みを感じやすい部位に鍼をした群は、比較用の部位に鍼をした群に比べ、4週後の痛みが100点満点で平均6点ほど多く下がりました。研究で「意味のある差」の目安にした10点には届きませんでした。片頭痛の試験では、頭痛があった日数を調べています。",
    sources: [{ label: "Zhao ほか · Annals of Internal Medicine（2024）", url: "https://doi.org/10.7326/M23-2425" }],
  },
  "dizziness-tinnitus": {
    title: "耳鳴りによる生活への支障と、聞こえ方",
    body: "耳鳴りが睡眠や集中をどれだけ妨げるかは、聴力検査とは別の指標です。耳鳴りの負担が下がった試験もあります。米国退役軍人省・国防総省の2024年ガイドラインは、複数の研究を確認し、耳鳴りへの鍼を勧めるかどうかを判断するには根拠が足りないとしています。",
    sources: [{ label: "米国退役軍人省・国防総省の耳鳴りガイドライン（2024年、推奨23）", url: "https://www.healthquality.va.gov/guidelines/CD/tinnitus/VADoD-CPG-Tinnitus-Provider-Summary-2024_Final_508.pdf" }],
  },
  "knee-joint-pain": {
    title: "膝の痛みの試験は、参加者と比較相手も読む",
    body: "50歳以上で膝の痛みが続く282人を対象にした試験では、鍼を受けた群と、レーザー照射をまねた処置を受けた群との間で、12週後の痛みや膝の機能に明確な差は見つかりませんでした。下の2026年の試験は、変形性膝関節症の人を対象に、電気鍼と皮膚を刺さない模擬鍼を比較しています。",
    sources: [{ label: "Hinman ほか · JAMA（2014）", url: "https://doi.org/10.1001/jama.2014.12660" }],
  },
};

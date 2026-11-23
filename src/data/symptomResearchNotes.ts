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
  "stress-insomnia": {
    title: "がん治療後の不眠で、鍼と認知行動療法を比べる",
    body: "がんの主な治療を終え、不眠症があった160人を対象に、鍼と不眠症の認知行動療法を8週間比べました。不眠の重症度を測る質問票（0〜28点）では、鍼の群で平均8.3点、認知行動療法の群で10.9点下がりました。群間の差は2.6点で、95％信頼区間は1.1〜4.1点です。",
    sources: [{ label: "Garland ほか · Journal of the National Cancer Institute（2019）", url: "https://doi.org/10.1093/jnci/djz050" }],
  },
  "constipation-ibs": {
    title: "便秘と下痢型IBSでは、何を測ったか",
    body: "重度の慢性機能性便秘の試験では、残便感のない自発的な排便の回数を数えました。下痢型の過敏性腸症候群（IBS）の試験では、腹痛が30％以上弱まり、泥状便や水様便が出た日が50％以上減ることの両方が改善の条件でした。例えば、泥状便や水様便の日が週6日から3日になり、腹痛も3割以上弱まった人は、両方を満たした人として数えられます。",
    sources: [
      { label: "Liu ほか · Annals of Internal Medicine（2016）", url: "https://doi.org/10.7326/M15-3118" },
      { label: "Qi ほか · JAMA Network Open（2022）", url: "https://doi.org/10.1001/jamanetworkopen.2022.48817" },
      { label: "Yang ほか · Gastroenterology（2025）", url: "https://doi.org/10.1053/j.gastro.2025.05.016" },
    ],
  },
  "dizziness-tinnitus": {
    title: "耳鳴りによる生活への支障と、聞こえ方",
    body: "耳鳴りが睡眠や集中をどれだけ妨げるかは、聴力検査とは別の指標です。耳鳴りの負担が下がった試験もあります。米国退役軍人省・国防総省の2024年ガイドラインは、複数の研究を確認し、耳鳴りへの鍼を勧めるかどうかを判断するには根拠が足りないとしています。",
    sources: [{ label: "米国退役軍人省・国防総省の耳鳴りガイドライン（2024年、推奨23）", url: "https://www.healthquality.va.gov/guidelines/CD/tinnitus/VADoD-CPG-Tinnitus-Provider-Summary-2024_Final_508.pdf" }],
  },
  "climacteric-hot-flash": {
    title: "待機と模擬鍼では、比較する相手が違う",
    body: "更年期移行期または閉経後で、ほてりや寝汗が1日4回以上あった209人を、すぐに鍼を受ける群と半年待つ群に分けた試験です。半年後、ほてりや寝汗の回数は、開始時より鍼の群で36.7％減り、待機群で6.0％増えました。下の模擬鍼と比べた試験では、ほてりの頻度と強さを合わせた点数を使っています。比べた相手と測った項目をそれぞれ確認すると、結果を読み分けられます。",
    sources: [{ label: "Avis ほか · Menopause（2016）", url: "https://doi.org/10.1097/GME.0000000000000597" }],
  },
  "knee-joint-pain": {
    title: "膝の痛みの試験は、参加者と比較相手も読む",
    body: "50歳以上で膝の痛みが続く282人を対象にした試験では、鍼を受けた群と、レーザー照射をまねた処置を受けた群との間で、12週後の痛みや膝の機能に明確な差は見つかりませんでした。下の2026年の試験は、変形性膝関節症の人を対象に、電気鍼と皮膚を刺さない模擬鍼を比較しています。",
    sources: [{ label: "Hinman ほか · JAMA（2014）", url: "https://doi.org/10.1001/jama.2014.12660" }],
  },
};

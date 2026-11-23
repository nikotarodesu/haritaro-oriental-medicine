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
  "stomach-fatigue": {
    title: "「全体に楽になった」と「三つの症状が消えた」",
    body: "食後愁訴症候群の278人を対象にした試験では、4週後に全体として改善した人の割合と、食後のもたれ・みぞおちの張り・早く満腹になる症状がすべて消えた人の割合を、別々に推定しました。鍼の群で前者は83.0％、後者は27.8％、模擬鍼の群ではそれぞれ51.6％、17.3％でした。胃もたれや食欲低下があっても、診断や原因が異なる人にこの割合を当てはめることはできません。",
    sources: [{ label: "Yang ほか · Annals of Internal Medicine（2020）", url: "https://doi.org/10.7326/M19-2880" }],
  },
  "menstrual-pain-chill": {
    title: "月経痛の強さと、痛みが続いた時間を分けて読む",
    body: "原発性月経困難症の比較試験では、開始6か月後に、鍼の群で痛みが続いた時間が模擬鍼より短いと報告されました。同じ時点でも、痛みの強さには明確な差がありませんでした。「痛みが軽くなった」と要約する前に、時間と強さのどちらを調べたかを確かめます。",
    sources: [{ label: "Smith ほか · Evidence-Based Complementary and Alternative Medicine（2011）", url: "https://doi.org/10.1093/ecam/nep239" }],
  },
  "eye-strain-fatigue": {
    title: "目の不快感は、涙の量や視力とは別に読む",
    body: "中等度から重度のドライアイを調べたKimらの試験では、自覚症状や生活への支障を尋ねる質問票を主な指標にし、涙の膜が保たれる時間や涙の量は別に測りました。質問票で差が出たという結果だけでは、涙がどの程度増えたか、視力が変わったかは分かりません。",
    sources: [{ label: "Kim ほか · PLOS ONE（2012）", url: "https://doi.org/10.1371/journal.pone.0036638" }],
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
  "allergic-rhinitis-hayfever": {
    title: "花粉症で、薬を使った日数を数える",
    body: "季節性アレルギー性鼻炎の試験を行った研究チームが、同じ参加者の日誌から薬を使った日を数え直しました。必要に応じて薬を使える8週間で、抗ヒスタミン薬を使ったのは鍼の群で平均8.9日、模擬鍼の群で13.4日、必要時の薬のみの群で18.1日でした。参加者を新たに集めた試験ではなく、元の試験の追加解析です。",
    sources: [{ label: "Adam ほか · Acupuncture in Medicine（2018）", url: "https://doi.org/10.1136/acupmed-2017-011382" }],
  },
  "knee-joint-pain": {
    title: "膝の痛みの試験は、参加者と比較相手も読む",
    body: "50歳以上で膝の痛みが続く282人を対象にした試験では、鍼を受けた群と、レーザー照射をまねた処置を受けた群との間で、12週後の痛みや膝の機能に明確な差は見つかりませんでした。下の2026年の試験は、変形性膝関節症の人を対象に、電気鍼と皮膚を刺さない模擬鍼を比較しています。",
    sources: [{ label: "Hinman ほか · JAMA（2014）", url: "https://doi.org/10.1001/jama.2014.12660" }],
  },
};

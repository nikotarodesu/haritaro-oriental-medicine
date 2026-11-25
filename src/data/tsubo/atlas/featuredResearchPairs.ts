import type { FeaturedPair } from "./featuredPairs";

export const featuredResearchPairs: readonly FeaturedPair[] = [
  {
    id: "zhongliao-huiyang",
    pointIds: ["bl33", "bl35"],
    name: "中髎と会陽",
    kind: "research",
    summary: "咳や運動などで尿が漏れる腹圧性尿失禁の試験で、左右の中髎と会陽に電気鍼を行いました。",
    evidenceSummary: "6週間後の1時間パッド試験では、尿漏れ量の減少が電気鍼の群で平均9.9 g、偽電気鍼の群で2.6 gでした。",
    details: [
      {
        label: "尿漏れ量をどう比べたか",
        text: "女性504人を無作為に分け、中髎・会陽への電気鍼と、近くの別の場所で皮膚を刺さず電気も流さない方法を比べました。パッドで測った尿漏れ量の減り方は、電気鍼の群で平均7.4 g大きくなりました。中髎だけ、会陽だけを使った場合や、ほかのタイプの尿失禁への効果は調べていません。",
        sources: [
          { label: "Liu ほか · JAMA（2017）", url: "https://jamanetwork.com/journals/jama/fullarticle/2633916" },
        ],
      },
    ],
  },
  {
    id: "tianshu-shangjuxu",
    pointIds: ["st25", "st37"],
    name: "天枢と上巨虚",
    kind: "research",
    summary: "重い便秘が長く続く人を対象にした試験で、天枢と上巨虚は腹結と一緒に使われました。",
    evidenceSummary: "8週間の治療中、自然な排便で残便感がなかった回数は、治療前より電気鍼の群で週平均1.76回、偽電気鍼の群で0.87回増えました。",
    details: [
      {
        label: "便秘の試験で比べたこと",
        text: "1,075人を無作為に分け、天枢・腹結・上巨虚を使う電気鍼と、経穴から外れた場所に浅く鍼をして電気を流さない方法を比べました。過去24時間に薬などの助けを使わずに排便でき、残便感がなかった回数を数えました。天枢と上巨虚だけを使った場合の効果は分かりません。",
        sources: [
          { label: "Liu ほか · Annals of Internal Medicine（2016）", url: "https://pubmed.ncbi.nlm.nih.gov/27618593/" },
          { label: "試験で使ったツボと比較方法（研究計画書）", url: "https://link.springer.com/article/10.1186/1745-6215-14-176" },
        ],
      },
    ],
  },
  {
    id: "zusanli-sanyinjiao",
    pointIds: ["st36", "sp6"],
    name: "足三里と三陰交",
    kind: "research",
    summary: "帝王切開後の腸の回復を調べた試験で、左右の足三里と三陰交を皮膚の上から電気で刺激しました。",
    evidenceSummary: "手術後に初めておならが出るまでの時間は、二穴を刺激した群で平均19.3時間、経穴から外れた場所を刺激した群で26.4時間でした。",
    details: [
      {
        label: "手術後の回復をどう比べたか",
        text: "1施設で146人を無作為に3群に分け、132人を解析しました。電極を貼るだけの群では、最初のおならまで平均26.2時間でした。針を使わない電気刺激の試験で、足三里と三陰交それぞれの効果や、ほかの手術で同じ結果になるかは分かりません。",
        sources: [
          { label: "Zhou ほか · Evidence-Based Complementary and Alternative Medicine（2018）", url: "https://onlinelibrary.wiley.com/doi/10.1155/2018/7341920" },
        ],
      },
    ],
  },
  {
    id: "zusanli-shangjuxu",
    pointIds: ["st36", "st37"],
    name: "足三里と上巨虚",
    kind: "research",
    summary: "大腸がんの腹腔鏡手術後に腸の回復を調べた試験で、足三里と上巨虚は中脘・天枢と一緒に使われました。",
    evidenceSummary: "手術後の最初の排便までの時間の中央値は、電気鍼の群で76.4時間、偽電気鍼の群で90.0時間でした。",
    details: [
      {
        label: "手術後の排便をどう比べたか",
        text: "術後の回復を支えるケアを全員に行ったうえで、4種類のツボを使う施術と、別の場所への浅い鍼で電気を流さない方法を比べました。249人を無作為に分け、248人を解析しました。電気を流したツボは足三里で、上巨虚にも鍼を行いました。この二穴だけを使った場合の効果は分かりません。",
        sources: [
          { label: "Wang ほか · JAMA Surgery（2023）", url: "https://jamanetwork.com/journals/jamasurgery/fullarticle/2797968" },
        ],
      },
    ],
  },
  {
    id: "hegu-zusanli",
    pointIds: ["li4", "st36"],
    name: "合谷と足三里",
    kind: "observational",
    summary: "韓国の7つの診療所で、痛みを訴えた外来患者423人の診療録のうち、56例で合谷と足三里が一緒に選ばれていました。",
    evidenceSummary: "この研究で分かるのは一緒に選ばれた回数です。この組み合わせで痛みがどのくらい変わるかは調べていません。",
    details: [
      {
        label: "診療録で確認した使われ方",
        text: "腰痛、片頭痛、ひざの痛みなど、異なる症状を含む診療録から、同じ症例で使われたツボを集計しました。ほかのツボを加えた場合も、合谷と足三里の両方が選ばれていれば集計に入ります。",
        sources: [
          { label: "Yoon ほか · Medicine（2026）本文3.2節・図2", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC13593149/" },
        ],
      },
    ],
  },
];

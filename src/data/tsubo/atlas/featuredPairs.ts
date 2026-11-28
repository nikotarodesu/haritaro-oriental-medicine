import type { StudySource } from "./types";
import { featuredClassicPairs } from "./featuredClassicPairs";
import { featuredResearchPairs } from "./featuredResearchPairs";
import { featuredAdditionalPairs } from "./featuredAdditionalPairs";

export const FEATURED_ACUPOINT_PAIRS_ANCHOR = "featured-acupoint-pairs";
export const ACUPOINT_PAIRS_PATH = "/tsubo/pairs";

type FeaturedPairDetail = {
  label: string;
  text: string;
  sources: readonly StudySource[];
};

export type FeaturedPair = {
  id: string;
  pointIds: readonly [string, string];
  name: string;
  kind: "name" | "research" | "classic" | "observational";
  summary: string;
  evidenceSummary: string;
  limits?: string;
  evidenceHighlights?: readonly Pick<FeaturedPairDetail, "label" | "text">[];
  details: readonly FeaturedPairDetail[];
};

export const featuredPairPreview: readonly FeaturedPair[] = [
  {
    id: "sanri",
    pointIds: ["li10", "st36"],
    name: "手三里と足三里",
    kind: "name",
    summary: "手三里はひじの外側より少し手首寄り、足三里はひざ下のすねの外側にあります。",
    evidenceSummary: "みぞおちの張りを調べた試験では、手三里・足三里・建里を基本にした鍼の群で、漢方薬の群より治療後の症状スコアが低かったと報告されました。",
    limits: "症状に応じてツボを追加した試験で、手三里と足三里だけの効果は分かりません。",
    details: [
      {
        label: "古典での使われ方",
        text: "『鍼灸聚英』では、食事に関わる腹部の不調に手三里と足三里をあわせて使う記述があります。",
        sources: [
          { label: "『鍼灸聚英』巻四「天元太乙歌」", url: "https://www.shidianguji.com/zh/book/CADAL02093081/chapter/1lcsfeersix43" },
        ],
      },
      {
        label: "試験の対象",
        text: "みぞおちの張りが繰り返す60人を対象に、鍼と漢方薬を比べた試験です。",
        sources: [
          { label: "馬克 · 香港中醫雜誌（2026）", url: "https://www.hkjtcm.org/journals/2026年第二十一卷第一期/18.%20針刺手三里、足三里、建裡組穴治療脾胃虛弱型痞滿患者的臨床效果觀察.pdf" },
        ],
      },
    ],
  },
  {
    id: "lateral-elbow",
    pointIds: ["li10", "li11"],
    name: "手三里と曲池",
    kind: "research",
    summary: "長引くひじの外側の痛みがある人を対象に、この組み合わせへの鍼を調べています。",
    evidenceSummary: "鍼を受けた群では、レーザー照射を模した施術の群より腕や手の使いにくさが改善しました。",
    limits: "各ツボを単独で使った場合との差は調べていません。",
    details: [
      {
        label: "試験の方法",
        text: "96人を2群に分け、どちらの施術も同じ二穴に行いました。主な評価は、治療終了3週間後の腕・肩・手の使いにくさです。",
        sources: [
          { label: "Gadau ほか · European Journal of Pain（2020）", url: "https://onlinelibrary.wiley.com/doi/abs/10.1002/ejp.1574" },
        ],
      },
    ],
  },
  {
    id: "four-gates",
    pointIds: ["li4", "lr3"],
    name: "合谷と太衝（四関穴）",
    kind: "research",
    summary: "左右の合谷と太衝を合わせて「四関穴」と呼びます。",
    evidenceSummary: "診療録での使用例と、肝陽上亢型の片頭痛を対象にした臨床試験があります。",
    limits: "診療録は併用の件数を示します。各穴を単独で使った場合、指圧、別のタイプの片頭痛への効果は、臨床試験の対象外です。",
    evidenceHighlights: [
      {
        label: "診療録での使用例",
        text: "韓国の韓医学診療所7か所の外来診療録423例のうち、94例で合谷と太衝が一緒に使われていました。",
      },
      {
        label: "臨床試験の比較",
        text: "「肝陽上亢」と分類された片頭痛の試験で、四関穴への電気鍼の群は、フルナリジンの内服群より痛みの点数が低く、発作日数も少ないと報告されました。評価は治療後、1・3・6か月後です。",
      },
    ],
    details: [
      {
        label: "診療録を集めた時期",
        text: "2022年9月から2023年5月までの診療録です。腰痛、片頭痛、ひざの痛みなど、複数の症状で受診した人の記録を集めています。",
        sources: [
          { label: "Yoon ほか · Medicine（2026）", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC13593149/" },
        ],
      },
      {
        label: "臨床試験の人数",
        text: "参加者は二群に55人ずつ無作為に割り付けられ、各群で2人が途中で参加をやめました。",
        sources: [
          { label: "Cai ほか · 中国鍼灸（2022）", url: "https://pubmed.ncbi.nlm.nih.gov/35543939/" },
        ],
      },
    ],
  },
  {
    id: "gongsun-neiguan",
    pointIds: ["pc6", "sp4"],
    name: "内関と公孫",
    kind: "classic",
    summary: "古典では、前腕の内関と足の公孫を胸や胃の領域に結びつけています。",
    evidenceSummary: "食後の胃もたれなどを調べた試験では、4週後に症状全体が改善した割合の推定値は、鍼の群で83.0％、偽鍼の群で51.6％でした。",
    limits: "複数のツボを使った施術の結果で、内関と公孫だけの効果は分かりません。",
    details: [
      {
        label: "古典での使われ方",
        text: "『鍼灸大成』は内関を陰維脈、公孫を衝脈に通じる穴とし、心・胸・胃の領域と結びつけています。",
        sources: [
          { label: "『鍼灸大成』巻七「八脈交会八穴歌」", url: "https://www.theqi.com/cmed/oldbook/accup/chap7.html" },
        ],
      },
      {
        label: "試験の対象と比較方法",
        text: "食後の胃もたれなどがある278人を対象に、複数のツボへの鍼と偽鍼を比べました。",
        sources: [
          { label: "Yang ほか · Annals of Internal Medicine（2020）", url: "https://pubmed.ncbi.nlm.nih.gov/32422066/" },
          { label: "試験で使用したツボ（研究計画書）", url: "https://link.springer.com/article/10.1186/s13063-018-3051-3" },
        ],
      },
    ],
  },
];

export const featuredPairs = [
  ...featuredPairPreview,
  ...featuredResearchPairs,
  ...featuredAdditionalPairs,
  ...featuredClassicPairs,
];

export function featuredPairAnchor(id: string) {
  return `featured-acupoint-pair-${id}`;
}

export function getFeaturedPairs(pointCode?: string) {
  if (!pointCode) return featuredPairs;
  return featuredPairs.filter(({ pointIds }) => pointIds.includes(pointCode.toLowerCase()));
}

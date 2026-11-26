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
  evidenceHighlights?: readonly FeaturedPairDetail[];
  details: readonly FeaturedPairDetail[];
};

export const featuredPairPreview: readonly FeaturedPair[] = [
  {
    id: "sanri",
    pointIds: ["li10", "st36"],
    name: "手三里と足三里",
    kind: "name",
    summary: "手三里はひじの外側より少し手首寄り、足三里はひざ下のすねの外側にあります。古典では、食事に関わるお腹の不調に一緒に使う記述があります。",
    evidenceSummary: "建里なども加えた試験があり、手三里と足三里だけでどの程度変わるかは分かりません。",
    details: [
      {
        label: "古典での使われ方",
        text: "『鍼灸聚英』では、食事に関わる腹部の不調に手三里と足三里をあわせて使う記述があります。",
        sources: [
          { label: "『鍼灸聚英』巻四「天元太乙歌」", url: "https://www.shidianguji.com/zh/book/CADAL02093081/chapter/1lcsfeersix43" },
        ],
      },
      {
        label: "研究で調べたこと",
        text: "みぞおちの張りが繰り返す60人の試験では、手三里・足三里・建里を基本にした鍼の群で、漢方薬の群より治療後の症状スコアが低かったと報告されました。症状に応じてツボを追加しているため、手三里と足三里だけの効果は分かりません。",
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
    evidenceSummary: "96人の試験で、偽レーザーの群より腕や手の使いにくさが改善しました。各ツボを単独で使った場合との差は調べていません。",
    details: [
      {
        label: "研究で分かったこと",
        text: "96人を、手三里と曲池に鍼を受ける群と、同じ二穴でレーザー照射を模した施術を受ける群に分けました。主な評価は、治療終了3週間後の腕・肩・手の使いにくさです。各ツボを単独で使った場合との差は調べていません。",
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
    evidenceHighlights: [
      {
        label: "診療録での使用例",
        text: "韓国の韓医学診療所7か所の外来診療録423例を振り返って調べた研究では、94例で合谷と太衝が一緒に使われていました。",
        sources: [
          { label: "Yoon ほか（2026）・診療録の研究", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC13593149/" },
        ],
      },
      {
        label: "臨床試験の比較",
        text: "伝統医学で「肝陽上亢」と分類された片頭痛の患者110人を、四関穴への電気鍼を受ける群と、フルナリジンを内服する群に分けました。電気鍼の群では治療後と1・3・6か月後に、内服薬の群より痛みの点数が低く、発作日数が少なかったと報告されました。",
        sources: [
          { label: "Cai ほか（2022）・片頭痛の比較試験", url: "https://pubmed.ncbi.nlm.nih.gov/35543939/" },
        ],
      },
      {
        label: "この研究では分からないこと",
        text: "診療録の件数は、併用された回数です。臨床試験からは、各穴を単独で使った場合、指圧をした場合、別のタイプの片頭痛での効果は分かりません。",
        sources: [],
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
    evidenceSummary: "2穴を含む鍼治療を調べた試験では、偽鍼より食後の胃もたれなどが改善しました。2穴だけの効果は分かりません。",
    details: [
      {
        label: "古典での使われ方",
        text: "『鍼灸大成』は内関を陰維脈、公孫を衝脈に通じる穴とし、心・胸・胃の領域と結びつけています。",
        sources: [
          { label: "『鍼灸大成』巻七「八脈交会八穴歌」", url: "https://www.theqi.com/cmed/oldbook/accup/chap7.html" },
        ],
      },
      {
        label: "研究で分かったこと",
        text: "食後の胃もたれなどがある278人の試験では、4週後に症状全体が改善した割合の推定値は、鍼の群で83.0％、偽鍼の群で51.6％でした。内関と公孫を含む複数のツボを使った施術の結果で、この二穴だけの効果は分かりません。",
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

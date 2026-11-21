import { ACUPOINTS_MASTER } from "../acupointsMaster";
import type { AcupointMaster } from "../types";
import { WHO_ATLAS_PDF, whoAtlasPages } from "./whoAtlasPages";
import type { AcupointAtlasArticle } from "./types";
import { careCopy, cautionSites, viewCopy } from "./expanded/editorial";
import { alternateLocations, expandedPoints } from "./expanded/profiles";
import type { ExpandedPoint } from "./expanded/types";

const meridianReadings: Record<string, string> = {
  lung: "てのたいいんはいけい",
  "large-intestine": "てのようめいだいちょうけい",
  stomach: "あしのようめいいけい",
  spleen: "あしのたいいんひけい",
  heart: "てのしょういんしんけい",
  "small-intestine": "てのたいようしょうちょうけい",
  bladder: "あしのたいようぼうこうけい",
  kidney: "あしのしょういんじんけい",
  pericardium: "てのけついんしんぽうけい",
  "triple-energizer": "てのしょうようさんしょうけい",
  gallbladder: "あしのしょうようたんけい",
  liver: "あしのけついんかんけい",
  "governor-vessel": "とくみゃく",
  "conception-vessel": "にんみゃく",
};

const emergencySource = {
  name: "厚生労働省「こんな時は迷わず119へ」",
  url: "https://kakarikata.mhlw.go.jp/kakaritsuke/urgency.html",
  scope: "救急車を呼ぶ目安。",
};
const touchSource = {
  name: "Memorial Sloan Kettering Cancer Center「Acupressure for Pain and Headaches」",
  url: "https://www.mskcc.org/cancer-care/patient-education/acupressure-pain-and-headaches",
  scope: "傷・発疹・赤く腫れた皮膚を刺激しないという注意点を参照。",
};
const gv27JapaneseCorrection = {
  name: "医道の日本社『WHO/WPRO標準経穴部位 日本語公式版』第2刷正誤表",
  url: "https://www.idononippon.com/book/errata/3419/",
  scope: "英語版で「上唇結節の中点」と記す位置を、日本語公式版の訂正に従って「上唇結節上縁の中点」と表記。",
};

const heartWarning = "胸痛、動悸、脈の乱れを感じるときは医療機関に相談してください。急な強い胸の痛みや息苦しさがあるときは、すぐに119番へ連絡してください。";

function sequenceNeighbors(point: AcupointMaster, series: readonly AcupointMaster[]) {
  const index = series.indexOf(point);
  const before = series[index - 1];
  const after = series[index + 1];
  return [before, after].filter(Boolean);
}

function nearbyInView(point: AcupointMaster, location: ExpandedPoint, candidates: readonly AcupointMaster[]) {
  let closest: AcupointMaster | undefined;
  let minDistance = 112;
  for (const candidate of candidates) {
    if (candidate === point) continue;
    const other = expandedPoints[candidate.codeLower];
    if (other?.view !== location.view) continue;
    const distance = Math.hypot(location.x - other.x, location.y - other.y);
    if (distance < minDistance) {
      minDistance = distance;
      closest = candidate;
    }
  }
  return closest;
}

const expandedCatalog = ACUPOINTS_MASTER.filter((point) => expandedPoints[point.codeLower]);

function makeArticle(point: AcupointMaster): AcupointAtlasArticle {
  const profile = expandedPoints[point.codeLower];
  const view = viewCopy[profile.view];
  const care = careCopy[view.care];
  const careOverride = cautionSites[point.codeLower];
  const hasHeartCaution = view.care === "chest" || point.meridianId === "heart" || point.meridianId === "pericardium"
    || ["cv14", "cv15", "bl14", "bl15"].includes(point.codeLower);
  const nameWithCode = `${point.name}（${point.kana}・${point.code}）`;
  const hasCun = profile.location.includes("寸") || profile.guide.includes("寸");
  const isMidline = point.meridianId === "governor-vessel" || point.meridianId === "conception-vessel";
  const graph = ACUPOINTS_MASTER.filter((candidate) => candidate.meridianId === point.meridianId)
    .sort((first, second) => first.meridianOrder - second.meridianOrder);
  const adjacent = sequenceNeighbors(point, graph);
  const comparison = nearbyInView(point, profile, expandedCatalog);
  const related = [...adjacent, ...(comparison && !adjacent.includes(comparison) ? [comparison] : [])];
  const symptom = view.symptom;
  const whoPage = whoAtlasPages[point.codeLower];
  const alternate = alternateLocations[point.codeLower];

  const orderText = `${point.name}は、${point.meridianShort}に並ぶ${graph.length}穴のうち${point.meridianOrder}番目です。`;
  const compareText = comparison
    ? `近くの${comparison.name}（${comparison.code}）は、${expandedPoints[comparison.codeLower].location}です。二つの拡大図で、丸印を探すときにどの骨やしわを目印にするか見比べてください。`
    : `経絡の図で${adjacent.map((other) => other.name).join("と")}の位置を見比べられます。それぞれの拡大図は「位置を見比べるツボ」から開けます。`;
  const technical = hasCun
    ? "骨度分寸（こつどぶんすん）は、骨の端やしわの間を決まった数に等分して測る方法です。どこからどこまでを分けるかで1寸の長さが変わります。まず図で区間の両端を確かめてください。"
    : "図の線は、骨や筋の形と皮膚のしわを読みやすくしたものです。番号と図の下の説明を照らし合わせると、どの部分がツボを探す目印か分かります。";
  const siteNote = isMidline
    ? "このツボは体の中央線上に一つあります。近くのツボを比べるときは、中央線の上か、左右に離れているかを先に見ます。"
    : "このツボは左右に一つずつあります。図は片側だけを描いているので、反対側では同じ骨やしわを反対向きにたどります。";
  const meridianStart = Math.max(1, point.meridianOrder - 2);
  const meridianEnd = Math.min(graph.length, meridianStart + 3);

  return {
    titleTopic: "場所と図での見つけ方・注意点",
    description: `${nameWithCode}の位置は、${profile.location}です。${view.label}の拡大図に、探すときの目印を示します。${point.meridianShort}での並び順と注意点も掲載しています。`,
    meridianReading: meridianReadings[point.meridianId],
    regionLabel: view.label,
    lead: `${nameWithCode}の位置は、${profile.location}です。拡大図では、位置を決める骨や筋、しわなどに番号を付けています。`,
    safetyWarning: hasHeartCaution ? heartWarning : point.codeLower === "gb21" ? "妊娠中は肩井への強い刺激を控え、施術については担当の産科へ相談してください。" : undefined,
    location: [profile.guide, view.read],
    traditionalTitle: "経絡の順番と近くのツボ",
    traditional: [orderText, compareText],
    visualOnly: true,
    selfCare: [careOverride ?? care.steps],
    cautions: [care.caution],
    expert: [technical, siteNote, ...(alternate ? [alternate] : [])],
    symptomLinks: symptom
      ? [{ href: `/symptoms/${symptom[0]}`, label: symptom[1] }]
      : [{ href: "/symptoms", label: "症状から探す" }],
    relatedPoints: related.map((other) => ({
      code: other.codeLower,
      text: adjacent.includes(other)
        ? `${point.meridianShort}で${point.name}の一つ${other.meridianOrder < point.meridianOrder ? "前" : "後"}`
        : `${view.label}の図で比較できる点`,
    })),
    sources: [
      {
        name: `WHO西太平洋地域事務局『WHO標準経穴部位』2009年改訂再版（PDF ${whoPage}ページ）`,
        url: `${WHO_ATLAS_PDF}#page=${whoPage}`,
        scope: `${point.code}の場所と体表の目印。`,
      },
      ...(point.codeLower === "gv27" ? [gv27JapaneseCorrection] : []),
      ...(view.care === "touch" ? [touchSource] : []),
      ...(care.emergency || hasHeartCaution ? [emergencySource] : []),
    ],
    illustration: {
      region: "expanded", bodyLabel: view.label,
      closeUpAlt: `${point.name}（${point.code}）の拡大図。${profile.location}に濃い色の丸印。目印に番号を付けています。`,
      closeUpCaption: `${point.name}の場所と目印`,
      meridianStart,
      meridianEnd,
      meridianCaption: `${point.name}は${point.meridianOrder}番目`,
    },
  };
}

export const expandedArticles: Readonly<Record<string, AcupointAtlasArticle>> = Object.fromEntries(
  expandedCatalog.map((point) => [point.codeLower, makeArticle(point)]),
);

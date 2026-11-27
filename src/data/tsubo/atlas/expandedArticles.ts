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

const heartWarning = "急な強い胸の痛みや息苦しさ、胸の中央が締め付けられるような痛みが続く場合は、すぐに119番へ連絡してください。";
const heartConsultation = "胸の違和感や痛み、動悸、脈の乱れがあるときは、早めに医療機関に相談してください。";
const locationComparisons: Readonly<Record<string, string>> = {
  ki23: "神封は第4肋間、霊墟はその一つ上の第3肋間です。胸の中央線からの距離は同じです。",
  ki24: "霊墟は第3肋間、神封はその一つ下の第4肋間です。胸の中央線からの距離は同じです。",
};

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
  const isMidline = point.meridianId === "governor-vessel" || point.meridianId === "conception-vessel";
  const graph = ACUPOINTS_MASTER.filter((candidate) => candidate.meridianId === point.meridianId)
    .sort((first, second) => first.meridianOrder - second.meridianOrder);
  const adjacent = sequenceNeighbors(point, graph);
  const comparison = nearbyInView(point, profile, expandedCatalog);
  const related = [...adjacent, ...(comparison && !adjacent.includes(comparison) ? [comparison] : [])];
  const symptom = view.symptom;
  const whoPage = whoAtlasPages[point.codeLower];
  const alternate = alternateLocations[point.codeLower];

  const siteNote = isMidline
    ? "このツボは体の中央線上に一つあります。"
    : "このツボは左右に一つずつあります。";
  const meridianStart = Math.max(1, point.meridianOrder - 2);
  const meridianEnd = Math.min(graph.length, meridianStart + 3);
  const symptomWarning = [
    view.care === "chest" ? heartWarning : care.emergency,
    view.care !== "chest" && hasHeartCaution ? heartWarning : undefined,
  ].filter(Boolean).join(" ") || undefined;
  const pointWarning = point.codeLower === "gb21" ? "妊娠中は肩井への強い刺激を控え、施術については担当の産科へ相談してください。" : undefined;

  return {
    titleTopic: "場所と注意点",
    description: `${nameWithCode}の位置は、${profile.location}です。${view.label}の拡大図、WHO標準の位置、安全上の注意を掲載しています。`,
    meridianReading: meridianReadings[point.meridianId],
    regionLabel: view.label,
    lead: `${nameWithCode}の位置は、${profile.location}です。`,
    safetyWarning: [symptomWarning, pointWarning].filter(Boolean).join(" ") || undefined,
    pointWarning,
    symptomWarning,
    location: [profile.guide, locationComparisons[point.codeLower]].filter(Boolean),
    traditional: [],
    visualOnly: true,
    selfCare: [careOverride ?? care.steps],
    cautions: [care.caution, hasHeartCaution && heartConsultation].filter((value): value is string => Boolean(value)),
    expert: [siteNote, ...(alternate ? [alternate] : [])],
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
        name: `WHO西太平洋地域事務局『WHO標準経穴部位』2009年改訂再版 p.${whoPage - 9}（PDFの${whoPage}ページ目）`,
        url: `${WHO_ATLAS_PDF}#page=${whoPage}`,
        scope: `${point.code}の場所と体表の目印。`,
      },
      ...(point.codeLower === "gv27" ? [gv27JapaneseCorrection] : []),
      ...(view.care === "touch" ? [touchSource] : []),
      ...(care.emergency || hasHeartCaution ? [emergencySource] : []),
    ],
    illustration: {
      region: "expanded", bodyLabel: view.label,
      closeUpAlt: `${point.name}（${point.code}）の拡大図。${profile.location}に丸印。`,
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

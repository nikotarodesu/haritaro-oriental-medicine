import { elbowSurfaceLandmarks } from "./atlas/sharedAnatomyLandmarks";
import { WHO_ATLAS_PDF, whoAtlasPages } from "./atlas/whoAtlasPages";
import type { CrossSectionModel, ReferenceLedgerItem } from "./types";

const anatomyReferences: ReferenceLedgerItem[] = [
  {
    title: "Distal biceps tendon anatomy: a cadaveric study",
    authors: "Eames MHA, Bain GI, Fogg QA, van Riet RP",
    year: 2007,
    journal: "Journal of Bone and Joint Surgery (American Volume)",
    url: "https://pubmed.ncbi.nlm.nih.gov/17473142/",
    confirmedItems: ["ひじの前を通る上腕二頭筋の遠位腱の構造"],
    unconfirmedOrReserved: "腱の細かな分かれ方や個人差は単純化しています。",
    confirmationStatus: "source_checked",
  },
  {
    title: "Relationship of the Median and Radial Nerves at the Elbow",
    authors: "Voin V, Iwanaga J, Sardi JP, et al.",
    year: 2017,
    journal: "Cureus",
    doi: "10.7759/cureus.1094",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5391251/#FIG1",
    confirmedItems: ["図1の右ひじ前面と上腕二頭筋の腱、本文・表1の上腕骨の外側上顆"],
    unconfirmedOrReserved: "神経・血管や計測距離はこの模式図に表示していません。",
    confirmationStatus: "source_checked",
  },
];

const tendon = elbowSurfaceLandmarks.bicepsTendon;
const epicondyle = elbowSurfaceLandmarks.lateralEpicondyle;

// The shared drawing compresses the elbow region into one schematic view.
// Coordinates illustrate left/right ordering and are not a measured section through an acupoint.
const anatomyLayers: CrossSectionModel["layers"] = [
  {
    depthIndex: 1, id: "elbow-skin", name: "皮膚", category: "skin",
    depthDescription: "体表",
    description: "ひじの前の横じわは、尺沢と曲沢を見分ける高さの目印です。丸印は図の体表に置いています。",
  },
  {
    depthIndex: 2, id: "elbow-humerus", name: "上腕骨", category: "bone",
    depthDescription: "ひじ付近の骨",
    description: "上腕の骨です。ひじ付近の外側の出っ張りを、②上腕骨の外側上顆として図で示しています。",
  },
];

const anatomyBoundaries: CrossSectionModel["boundaries"] = [
  {
    id: "elbow-biceps-tendon", name: tendon.name, englishName: "Distal biceps tendon", category: "tendon",
    position: "ひじの前", relation: "尺沢と曲沢の間",
    description: "上腕二頭筋は、ひじの前で腱となって前腕の骨につながります。ひじの前の横じわでは、この腱を挟んで親指側が尺沢、小指側が曲沢です。",
    palpationTip: "",
  },
  {
    id: "elbow-lateral-epicondyle", name: epicondyle.name, englishName: "Lateral epicondyle of the humerus", category: "bone",
    position: "ひじの外側（親指側）", relation: "曲池の外側の目印",
    description: "上腕骨の下端の外側に張り出した部分です。尺沢からこの出っ張りへ向かう線の中ほどが、体表での曲池の目安です。",
    palpationTip: "",
  },
];

const anatomyShapes: CrossSectionModel["svgElements"] = [
  {
    layerId: "elbow-skin", elementId: "elbow-skin-outline", label: "皮膚", shapeType: "path",
    d: "M55 114C57 93 85 81 120 78C158 74 208 74 250 74C300 74 349 74 390 80C422 84 443 97 445 120C449 151 425 184 378 202C307 229 192 230 121 202C75 184 49 153 55 114Z",
    fill: "#F2DFC8", stroke: "#9B826D", strokeWidth: 3,
  },
  {
    layerId: "elbow-humerus", elementId: "elbow-humerus-section", label: "上腕骨", shapeType: "path",
    d: "M98 137C108 122 121 116 139 118C161 119 168 130 187 137C210 146 233 147 260 143C291 139 311 127 341 127C369 127 391 138 397 156C405 180 378 195 354 199C326 204 298 200 270 198C239 196 218 203 188 202C161 200 149 189 133 182C108 176 84 161 98 137Z",
    fill: "#FFF3D5", stroke: "#9E8460", strokeWidth: 2.5,
  },
  {
    layerId: "elbow-lateral-epicondyle", elementId: "elbow-lateral-epicondyle-bone", label: epicondyle.name, shapeType: "path",
    d: "M98 137C108 122 121 116 139 118C152 119 159 124 166 128C150 137 145 150 148 165L154 193C146 189 141 185 133 182C108 176 84 161 98 137Z",
    fill: "#E9C894", stroke: "#9E8460", strokeWidth: 2.5,
  },
  {
    layerId: "elbow-biceps-tendon", elementId: "elbow-biceps-tendon-section", label: tendon.name,
    shapeType: "ellipse", cx: 250, cy: 111, rx: 25, ry: 13,
    fill: "#F8D9AA", stroke: "#9E562D", strokeWidth: 3,
  },
];

function elbowSection({ code, name, x, location }: {
  code: "LI11" | "LU5" | "PC3";
  name: string;
  x: number;
  location: string;
}): CrossSectionModel {
  const pdfPage = whoAtlasPages[code.toLowerCase()];
  const standard: ReferenceLedgerItem = {
    title: `WHO標準経穴部位（2009年改訂再版）p.${pdfPage - 9}`,
    authors: "WHO西太平洋地域事務局",
    year: 2009,
    publisherOrJournal: "世界保健機関",
    url: `${WHO_ATLAS_PDF}#page=${pdfPage}`,
    confirmedItems: [location],
    unconfirmedOrReserved: "標準資料は体表の位置を定めており、断面の形や各構造の深さは対象外です。",
    confirmationStatus: "source_checked",
  };

  return {
    id: `cs-${code.toLowerCase()}`,
    procedureReviewStatus: "pending_expert_review",
    title: `${name}（${code}）の断面図`,
    level: "右ひじの前の横じわ付近を模式化",
    bodySide: "右ひじ",
    diagramViewBox: "42 12 416 220",
    axes: {
      horizontal: ["親指側", "小指側"],
      vertical: ["ひじの前", "ひじの後ろ"],
    },
    surfacePoint: {
      x, y: 74, label: `${name} ${code}`, description: location,
      diagramNote: "ひじの前の横じわ付近を一つの模式図にまとめています。",
    },
    needleTrack: { angle: "専門家確認待ち", safeDepth: "専門家確認待ち", targetStructure: "個別手順は掲載保留" },
    layers: anatomyLayers,
    boundaries: anatomyBoundaries,
    svgElements: anatomyShapes,
    references: [standard.title, ...anatomyReferences.map(reference => reference.title)],
    referenceLedger: [standard, ...anatomyReferences],
    verifiedDate: "2026-11-24",
  };
}

export const ELBOW_CROSS_SECTIONS = {
  li11: elbowSection({
    code: "LI11", name: "曲池", x: 171,
    location: "ひじの外側で、尺沢と上腕骨の外側上顆を結ぶ線の中ほどです。",
  }),
  lu5: elbowSection({
    code: "LU5", name: "尺沢", x: 222,
    location: "ひじの前の横じわの上で、上腕二頭筋の腱の親指側にあるくぼみです。",
  }),
  pc3: elbowSection({
    code: "PC3", name: "曲沢", x: 278,
    location: "ひじの前の横じわの上で、上腕二頭筋の腱の小指側にあるくぼみです。",
  }),
};

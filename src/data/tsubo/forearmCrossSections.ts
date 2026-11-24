import { forearmSurfaceLandmarks } from "./atlas/sharedAnatomyLandmarks";
import { WHO_ATLAS_PDF, whoAtlasPages } from "./atlas/whoAtlasPages";
import { whoLocationNotes, whoLocations } from "./atlas/whoLocations";
import type { CrossSectionModel, ReferenceLedgerItem } from "./types";

const { palmarisLongus, flexorCarpiRadialis } = forearmSurfaceLandmarks;

const anatomyReferences = [
  {
    title: "Versatile but Temperamental: A Morphological Study of Palmaris Longus in the Cadaver",
    authors: "Mathew AJ, Sukumaran TT, Joseph S",
    year: 2015,
    journal: "Journal of Clinical and Diagnostic Research",
    doi: "10.7860/JCDR/2015/11212.5542",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4378718/",
    confirmedItems: ["長掌筋の腱と橈側手根屈筋の位置関係", "長掌筋の欠如や形の個人差"],
    unconfirmedOrReserved: "経穴の高さに対応する断面を調べた研究ではありません。",
    confirmationStatus: "source_checked",
  },
  {
    title: "Location of the Flexor Carpi Radialis Myotendinous Junction: a Cadaveric Study",
    authors: "Panwar K, Lara D, Trzeciak M, Huish EG Jr",
    year: 2021,
    journal: "Muscles, Ligaments and Tendons Journal",
    doi: "10.32098/mltj.04.2021.20",
    url: "https://mltj.online/index.php/mltj/article/download/6850/5513",
    confirmedItems: ["図1と表1の橈側手根屈筋が筋から腱に移る範囲と、その個人差"],
    unconfirmedOrReserved: "研究とWHO標準では測る起点が異なります。計測値を間使や郄門の断面に当てはめていません。",
    confirmationStatus: "source_checked",
  },
] satisfies ReferenceLedgerItem[];

const layers: CrossSectionModel["layers"] = [
  {
    id: "forearm-skin", depthIndex: 1, name: "皮膚", category: "skin", depthDescription: "体表",
    description: "赤い丸印は、手のひら側の前腕で二本の腱を目印にしたときの体表の位置を示しています。",
  },
];

const boundaries: CrossSectionModel["boundaries"] = [
  {
    id: "forearm-palmaris-longus", name: palmarisLongus.name, englishName: "Palmaris longus tendon", category: "tendon",
    position: "手のひら側の前腕", relation: "二本の腱のうち、小指側",
    description: "長掌筋から手のひらへ続く腱です。この腱がない人では、WHO標準は②の橈側手根屈筋の腱の小指側を目印にします。",
    palpationTip: "",
  },
  {
    id: "forearm-flexor-carpi-radialis", name: flexorCarpiRadialis.name, englishName: "Flexor carpi radialis tendon", category: "tendon",
    position: "手のひら側の前腕", relation: "二本の腱のうち、親指側",
    description: "手首の親指側に向かう腱です。筋と腱が重なる範囲や、腱だけになる高さには個人差があります。",
    palpationTip: "",
  },
];

// This silhouette illustrates the transverse ordering of the surface landmarks.
// It does not draw the precise contour or depth of a section taken at either height.
const svgElements: CrossSectionModel["svgElements"] = [
  {
    layerId: "forearm-skin", elementId: "forearm-surface-contour", label: "皮膚", shapeType: "path",
    d: "M53 131C53 103 82 87 126 80C160 74 205 73 250 73C295 73 340 74 374 80C418 87 447 103 447 131C447 174 411 198 362 207C305 219 195 219 138 207C89 198 53 174 53 131Z",
    fill: "#F2DFC8", stroke: "#9B826D", strokeWidth: 3,
  },
  {
    layerId: "forearm-flexor-carpi-radialis", elementId: "forearm-flexor-carpi-radialis-section", label: flexorCarpiRadialis.name, shapeType: "ellipse",
    cx: 191, cy: 110, rx: 32, ry: 20, fill: "#F1CA99", stroke: "#9E562D", strokeWidth: 3,
  },
  {
    layerId: "forearm-palmaris-longus", elementId: "forearm-palmaris-longus-section", label: palmarisLongus.name, shapeType: "ellipse",
    cx: 303, cy: 110, rx: 28, ry: 18, fill: "#EED2AA", stroke: "#9E562D", strokeWidth: 3,
  },
];

function forearmSection(code: "pc4" | "pc5", name: string, distance: 3 | 5): CrossSectionModel {
  const pdfPage = whoAtlasPages[code];
  const locationNote = whoLocationNotes[code];
  const standard: ReferenceLedgerItem = {
    title: `WHO標準経穴部位（2009年改訂再版）p.${pdfPage - 9}`,
    authors: "WHO西太平洋地域事務局",
    year: 2009,
    publisherOrJournal: "世界保健機関",
    url: `${WHO_ATLAS_PDF}#page=${pdfPage}`,
    confirmedItems: locationNote ? [whoLocations[code], locationNote] : [whoLocations[code]],
    unconfirmedOrReserved: "WHO標準は体表の位置を示しています。図の腱の形や深さは、位置関係を学ぶために簡略化しています。",
    confirmationStatus: "source_checked",
  };

  return {
    id: `cs-${code}`,
    procedureReviewStatus: "pending_expert_review",
    title: `${name}（${code.toUpperCase()}）の断面図`,
    level: `手首のしわからひじ側へ${distance}寸`,
    bodySide: "右前腕",
    diagramViewBox: "42 12 416 218",
    axes: { horizontal: ["親指側", "小指側"], vertical: ["手のひら側", "手の甲側"] },
    surfacePoint: {
      x: 250, y: 73, label: `${name} ${code.toUpperCase()}・${distance}寸`, description: whoLocations[code],
      diagramNote: `${locationNote ? `${locationNote} ` : ""}図は二本の目印の並びを簡略化したものです。腱の形や、筋から腱に移る高さには個人差があります。`,
    },
    needleTrack: { angle: "専門家確認待ち", safeDepth: "専門家確認待ち", targetStructure: "個別手順は掲載保留" },
    layers,
    boundaries,
    svgElements,
    references: [standard.title, ...anatomyReferences.map(reference => reference.title)],
    referenceLedger: [standard, ...anatomyReferences],
    verifiedDate: "2026-11-24",
  };
}

export const FOREARM_CROSS_SECTIONS = {
  pc4: forearmSection("pc4", "郄門", 5),
  pc5: forearmSection("pc5", "間使", 3),
};

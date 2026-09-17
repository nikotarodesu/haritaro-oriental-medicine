export type BodyPart = "頭部・顔面" | "首・肩" | "背中・腰" | "手・腕" | "足・脚" | "胸・腹";

export type AcupointStatus = "published" | "basic" | "draft";

export interface AnatomicalLayer {
  depthIndex: number;
  id: string;
  name: string;
  category: "skin" | "subcutaneous" | "fascia" | "muscle" | "nerve" | "vessel" | "bone";
  depthDescription: string;
  description: string;
  dangerLevel?: "safe" | "caution" | "hazard";
  clinicalSignificance?: string;
}

export interface SvgAnatomicalElement {
  layerId: string;
  elementId: string;
  label: string;
  shapeType: "rect" | "circle" | "path" | "ellipse" | "polygon";
  d?: string;
  cx?: number;
  cy?: number;
  r?: number;
  rx?: number;
  ry?: number;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  points?: string;
  fill: string;
  stroke?: string;
  strokeWidth?: number;
  labelPos?: { x: number; y: number; anchor?: "start" | "middle" | "end" };
}

export interface CrossSectionModel {
  id: string;
  title: string;
  level: string;
  axes: {
    horizontal: [string, string]; // [左, 右]
    vertical: [string, string];   // [上, 下]
  };
  needleTrack: {
    angle: string;
    safeDepth: string;
    targetStructure: string;
    warning?: string;
  };
  layers: AnatomicalLayer[];
  svgElements: SvgAnatomicalElement[];
  references: string[];
  verifiedDate: string;
}

export interface NearbyPoint {
  code: string;
  name: string;
  relation: string;
  distance: string;
}

export interface AcupointMaster {
  id: string; // "li4", "pc6", "st36"
  legacyId: string; // "gokoku", "naikan", "ashisanri" (互換用)
  code: string; // "LI4", "PC6", "ST36"
  codeLower: string; // "li4", "pc6", "st36"
  name: string; // "合谷"
  kana: string; // "ごうこく"
  romaji: string; // "Hegu"
  aliases?: string[]; // ["虎口"]
  meridianId: string; // "large-intestine"
  meridian: string; // "手の陽明大腸経"
  meridianShort: string; // "大腸経"
  meridianOrder: number; // 4
  bodyPart: BodyPart;
  bodyRegionDetail: string; // "手背・第1第2中手骨間"
  locationSimple: string; // 一般向け
  locationDetail: string; // WHO標準部位
  locationSource: string; // "WHO Standard Acupuncture Point Locations"
  indications: string[]; // 主治症
  categories: string[]; // ["原穴", "四総穴", "四関穴"]
  clinicalNote: string; // はり太郎の臨床知見
  caution?: string; // 禁忌・注意事項
  status: AcupointStatus;
  hasDetailedAnatomy: boolean;
}

export interface AcupointDetail extends AcupointMaster {
  howToLocate: string[]; // ステップ別取穴法
  palpationLandmarks: string[]; // 触知する骨・腱目印
  pitfalls: string; // 取穴の混同・注意
  crossSection: CrossSectionModel;
  researchEvidence?: {
    focus: string;
    findings: string;
    mechanisms: string[];
    sources: { title: string; pmid?: string; doi?: string; year: string }[];
    limitations: string;
  };
  classicalReferences?: {
    book: string;
    quote: string;
    meaning: string;
  }[];
  nearbyPoints?: NearbyPoint[];
}

export interface MeridianInfo {
  id: string;
  name: string;
  shortName: string;
  englishName: string;
  codePrefix: string;
  totalPoints: number;
  element: "木" | "火" | "土" | "金" | "水" | "奇経";
  yinYang: "陰" | "陽";
  flowDirection: string;
  description: string;
  indications: string[];
  keyPoints: {
    yuan?: string;
    luo?: string;
    xi?: string;
    mu?: string;
    shu?: string;
    he?: string;
  };
}

export interface CategoryInfo {
  id: string;
  name: string;
  reading: string;
  description: string;
  clinicalSignificance: string;
  selectionCriteria: string;
  totalPoints: number;
  points: { code: string; name: string; role: string }[];
}

export interface RegionInfo {
  id: string;
  name: string;
  subRegions: string[];
  landmarks: string[];
  anatomicalHazards: string[];
  totalPoints: number;
}

export type BodyPart = "頭部・顔面" | "首・肩" | "背中・腰" | "手・腕" | "足・脚" | "胸・腹";

export type AcupointStatus = "published" | "basic" | "draft";

export interface AnatomicalLayer {
  depthIndex: number;
  id: string;
  name: string;
  englishName?: string;
  category: "skin" | "subcutaneous" | "fascia" | "muscle" | "nerve" | "vessel" | "bone";
  depthDescription: string;
  description: string;
  differentiationTip?: string;
  dangerLevel?: "safe" | "caution" | "hazard";
  clinicalSignificance?: string;
}

export interface BoundaryLandmark {
  id: string;
  name: string;
  englishName?: string;
  category: "bone" | "tendon" | "muscle" | "membrane";
  position: string; // e.g. "橈側（親指側）の骨縁", "外側境界筋"
  relation: string; // e.g. "取穴時の不動の触診基準線"
  description: string;
  palpationTip: string; // 触知・識別のコツ
  dangerLevel?: "safe" | "caution" | "hazard";
  differentiationTip?: string;
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
  strokeDasharray?: string;
  labelPos?: { x: number; y: number; anchor?: "start" | "middle" | "end" };
  leaderLine?: { x1: number; y1: number; x2: number; y2: number };
}

export interface AdjacentStructure {
  id: string;
  name: string;
  englishName?: string;
  category: "nerve" | "vessel" | "organ" | "bone";
  relation: string;
  dangerLevel: "safe" | "caution" | "hazard";
  description: string;
  differentiationTip?: string;
  clinicalSignificance: string;
}

export interface CuttingPlaneInfo {
  planeType?: string; // "横断面" / "水平横断面"
  planeLevel?: string; // "第2中手骨中点レベル水平横断"
  viewDirection: string; // "遠位（指先側）から近位（手首側）方向を観察"
  notes?: string;
  scopeType?: "local_magnified" | "limb_cross_section";
  scopeDescription?: string; // "第1・第2中手骨間・第1背側骨間隙局所拡大断面"
  simplifications?: string; // 簡略化・背景化した範囲の明記
}

export interface ReferenceLedgerItem {
  id?: string;
  title: string;
  authors?: string;
  author?: string;
  year: number;
  publisherOrJournal?: string;
  journal?: string;
  volume?: string;
  doi?: string;
  url?: string;
  confirmedItems?: string[];
  supportedStructures?: string[];
  unconfirmedOrReserved?: string;
  confirmationStatus?: "confirmed" | "schematic_model";
  notes?: string;
}

export interface SurfaceMapData {
  bodyPartLabel: string;
  viewBox: string;
  elements: SvgAnatomicalElement[];
  cutLine: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    arrowX: number;
    arrowY: number;
    arrowAngle: number;
    label: string;
  };
  pointCoords: { x: number; y: number; label: string };
}

export interface CrossSectionModel {
  id: string;
  title: string;
  level: string;
  sliceType?: string; // 断面スライス識別子（例: thigh_anterior, spine_posterior_median 等）
  bodySide?: string; // "右手" / "右前腕" / "右下腿"
  posture?: string; // "軽度回内位（手背を上に向けて軽く握った肢位）"
  cuttingPlane?: CuttingPlaneInfo;
  cuttingPlaneInfo?: CuttingPlaneInfo; // エイリアス
  summaryTakeaway?: string;
  summary?: string; // エイリアス
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
  layers: AnatomicalLayer[]; // 表層から深層への通過層のみ（確認済みの順序）
  boundaries?: BoundaryLandmark[]; // 境界・目印（骨縁、両腱、側方筋）
  adjacentStructures?: AdjacentStructure[]; // 周囲を走る神経・血管・重要組織
  surfaceMap?: SurfaceMapData; // 体表切断線連動マップ
  svgElements: SvgAnatomicalElement[];
  explodedSvgElements?: SvgAnatomicalElement[]; // 層分解表示用SVG
  references: string[];
  referenceLedger?: ReferenceLedgerItem[]; // 詳細資料台帳
  referencesLedger?: ReferenceLedgerItem[]; // エイリアス
  verifiedDate: string;
}

export interface NearbyPoint {
  code: string;
  name: string;
  relation: string;
  distance: string;
}

// ==================== 学習・クイズ型定義 ====================

export type StudySkillType = "location_to_name" | "meridian_of_point" | "category_of_point";

export type MasteryLevel = "unlearned" | "learning" | "confirmed" | "mastered";

export interface AcupointStudyRecord {
  acupointCode: string;
  skill: StudySkillType;
  level: MasteryLevel;
  consecutiveSuccesses: number; // 予定された復習での連続正解数
  lastReviewedDate?: string; // "YYYY-MM-DD"
  nextReviewDate?: string; // "YYYY-MM-DD"
  totalAttempts: number;
  totalCorrect: number;
  flaggedForReview?: boolean; // ユーザー自身による要復習指定
  selfEvaluationCount?: { remembered: number; needsReview: number };
}

export interface QuizQuestion {
  id: string;
  acupointCode: string;
  skill: StudySkillType;
  prompt: string; // 問題文（答えの漏洩なし）
  options: { id: string; text: string; subtext?: string }[];
  correctOptionId: string;
  explanation: string;
  meridianName: string;
  locationReference: string;
}

export interface StudySession {
  sessionId: string;
  courseId: string;
  courseTitle: string;
  mode: "batch" | "one_by_one" | "self_check";
  questions: QuizQuestion[];
  currentIndex: number;
  answers: Record<string, { selectedOptionId: string; isCorrect: boolean; confirmedAt: number }>;
  selfEvaluations?: Record<string, "remembered" | "needsReview">;
  isCompleted: boolean;
  startedAt: number;
  completedAt?: number;
}

export interface DayActivity {
  date: string; // "YYYY-MM-DD"
  answeredCount: number;
  correctCount: number;
}

export interface StudySettings {
  dailyGoal: number; // 5, 10, 20
  defaultMode: "batch" | "one_by_one" | "self_check";
  lastActiveCourseId?: string;
}

export interface TsuboStudyDataV1 {
  version: 1;
  settings: StudySettings;
  records: Record<string, AcupointStudyRecord>; // key: `${code}_${skill}`
  history: DayActivity[];
  streakDays: number;
  lastStudiedDate?: string;
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
  crossSection?: CrossSectionModel;
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

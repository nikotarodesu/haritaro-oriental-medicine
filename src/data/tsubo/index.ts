import { AcupointMaster, AcupointDetail, BodyPart } from "./types";
import { ACUPOINTS_MASTER } from "./acupointsMaster";
import { DETAILED_ACUPOINTS } from "./detailedPoints";
import { MERIDIANS } from "./meridiansData";
import { ACUPOINT_CATEGORIES } from "./categoriesData";
import { BODY_REGIONS } from "./regionsData";
import { CROSS_SECTIONS } from "./crossSectionsData";
import {
  generatePitfalls,
  generateCaution,
  generateHowToLocate,
  generatePalpationLandmarks,
} from "./safetyAndLandmarks";
import {
  getFriendlyLocationSimple,
  simplifyLocationText,
  FRIENDLY_LOCATIONS_MAP,
} from "./friendlyLocations";
import {
  generateCrossSectionModel,
  classifyAcupointSlice,
} from "./crossSectionEngine";
import { Tsubo } from "@/types/oriental";

export * from "./types";
export * from "./safetyAndLandmarks";
export * from "./friendlyLocations";
export * from "./crossSectionEngine";
export { ACUPOINTS_MASTER } from "./acupointsMaster";
export const ALL_ACUPOINTS = ACUPOINTS_MASTER;
export { DETAILED_ACUPOINTS } from "./detailedPoints";
export { MERIDIANS } from "./meridiansData";
export { ACUPOINT_CATEGORIES } from "./categoriesData";
export { BODY_REGIONS } from "./regionsData";
export { CROSS_SECTIONS } from "./crossSectionsData";
export * from "./studyStorage";
export * from "./quizData";

/**
 * コードまたはIDから経穴マスター情報を取得
 */
export function getAcupointByCode(codeOrId: string): AcupointMaster | undefined {
  const clean = codeOrId.trim().toLowerCase().replace(/^tsubo-/, "");
  const found = ACUPOINTS_MASTER.find(
    (p) =>
      p.codeLower === clean ||
      p.id.toLowerCase() === clean ||
      p.legacyId.toLowerCase() === clean
  );
  if (!found) return undefined;
  return {
    ...found,
    locationSimple: getFriendlyLocationSimple(found),
  };
}

/**
 * 詳細データ（解剖・断面図・取穴手順など）を取得。
 * 旗艦3穴（LI4, PC6, ST36）の超精密モデル、および全361穴の局所深浅・断面解剖モデルを完全生成。
 */
export function getAcupointDetail(codeOrId: string): AcupointDetail | undefined {
  const clean = codeOrId.trim().toLowerCase().replace(/^tsubo-/, "");
  
  // 1. 詳細穴に直接マッチ
  if (DETAILED_ACUPOINTS[clean]) {
    const point = DETAILED_ACUPOINTS[clean];
    const cs = point.crossSection || generateCrossSectionModel(point);
    return {
      ...point,
      crossSection: {
        ...cs,
        sliceType: cs.sliceType || classifyAcupointSlice(point),
      },
      locationSimple: getFriendlyLocationSimple(point),
      caution: point.caution || generateCaution(point),
    };
  }

  // 2. マスターから探索
  const master = getAcupointByCode(clean);
  if (!master) return undefined;

  // 既に詳細登録されている場合
  if (DETAILED_ACUPOINTS[master.codeLower]) {
    const point = DETAILED_ACUPOINTS[master.codeLower];
    const cs = point.crossSection || generateCrossSectionModel(point);
    return {
      ...point,
      crossSection: {
        ...cs,
        sliceType: cs.sliceType || classifyAcupointSlice(point),
      },
      locationSimple: getFriendlyLocationSimple(point),
      caution: point.caution || generateCaution(point),
    };
  }

  // 3. 全経穴対応：基本情報から局所深浅・断面解剖モデルを完全生成
  const friendlySimple = getFriendlyLocationSimple(master);
  const crossSection = generateCrossSectionModel(master);
  return {
    ...master,
    locationSimple: friendlySimple,
    howToLocate: generateHowToLocate(master),
    palpationLandmarks: generatePalpationLandmarks(master),
    pitfalls: generatePitfalls(master),
    caution: generateCaution(master),
    crossSection,
    nearbyPoints: [],
  };
}

/**
 * 経穴が詳細解説・精密断面図を保持しているかを判定（全穴対応により常に true）
 */
export function isDetailedAcupoint(codeOrId: string): boolean {
  return true;
}


/**
 * 全経穴を取得
 */
export function getAllAcupoints(): AcupointMaster[] {
  return ACUPOINTS_MASTER;
}

/**
 * 公開済み経穴（32穴）を取得
 */
export function getPublishedAcupoints(): AcupointMaster[] {
  return ACUPOINTS_MASTER.filter((p) => p.status === "published");
}

/**
 * 14経脈の標準巡行順マップ（肺経 -> 大腸経 -> ... -> 任脈）
 */
export const MERIDIAN_SEQUENCE_MAP: Record<string, number> = {
  "lung": 1,
  "large-intestine": 2,
  "stomach": 3,
  "spleen": 4,
  "heart": 5,
  "small-intestine": 6,
  "bladder": 7,
  "kidney": 8,
  "pericardium": 9,
  "triple-energizer": 10,
  "gallbladder": 11,
  "liver": 12,
  "governor-vessel": 13,
  "conception-vessel": 14,
};

/**
 * 14経脈の流注順（経絡巡行順 ＆ 経脈内番号順）で経穴を正しくソートする比較関数
 */
export function compareAcupointsByMeridianOrder(a: AcupointMaster, b: AcupointMaster): number {
  const aMeridian = MERIDIAN_SEQUENCE_MAP[a.meridianId] ?? 99;
  const bMeridian = MERIDIAN_SEQUENCE_MAP[b.meridianId] ?? 99;
  if (aMeridian !== bMeridian) {
    return aMeridian - bMeridian;
  }
  return a.meridianOrder - b.meridianOrder;
}

/**
 * 経絡別の経穴一覧
 */
export function getMeridianPoints(meridianId: string): AcupointMaster[] {
  return ACUPOINTS_MASTER.filter((p) => p.meridianId === meridianId).sort(
    (a, b) => a.meridianOrder - b.meridianOrder
  );
}

/**
 * 部位別の経穴一覧
 */
export function getRegionPoints(bodyPart: BodyPart): AcupointMaster[] {
  return ACUPOINTS_MASTER.filter((p) => p.bodyPart === bodyPart);
}

/**
 * 経穴の検索・絞り込み
 */
export function searchAcupoints(
  query: string,
  filter?: {
    bodyPart?: string;
    meridianShort?: string;
    category?: string;
    onlyPublished?: boolean;
  }
): AcupointMaster[] {
  const q = query.trim().toLowerCase();

  return ACUPOINTS_MASTER.filter((p) => {
    // フィルター条件
    if (filter?.onlyPublished && p.status !== "published") return false;
    if (filter?.bodyPart && filter.bodyPart !== "すべて" && p.bodyPart !== filter.bodyPart) return false;
    if (filter?.meridianShort && filter.meridianShort !== "すべて" && p.meridianShort !== filter.meridianShort) return false;
    if (filter?.category && filter.category !== "すべて" && !p.categories.some((c) => c.includes(filter.category!))) return false;

    // クエリ検索
    if (!q) return true;

    // 1. コード完全一致
    if (p.codeLower === q || p.code.toLowerCase() === q) return true;

    // 2. 名称・読み・別名一致
    if (p.name.includes(q) || p.kana.includes(q) || p.romaji.toLowerCase().includes(q)) return true;
    if (p.aliases?.some((a) => a.includes(q))) return true;

    // 3. 主治症・部位・解説一致
    if (p.indications.some((ind) => ind.toLowerCase().includes(q))) return true;
    if (p.locationSimple.includes(q) || p.locationDetail.includes(q)) return true;
    if (p.clinicalNote.includes(q)) return true;

    return false;
  }).sort((a, b) => {
    if (!q) return compareAcupointsByMeridianOrder(a, b);
    // 完全一致を上位に
    const aExact = a.name === q || a.codeLower === q;
    const bExact = b.name === q || b.codeLower === q;
    if (aExact && !bExact) return -1;
    if (!aExact && bExact) return 1;

    // 公開済み詳細穴を優先
    if (a.status === "published" && b.status !== "published") return -1;
    if (a.status !== "published" && b.status === "published") return 1;

    return compareAcupointsByMeridianOrder(a, b);
  });
}

/**
 * 既存コンポーネント（Home, Simulator, HaiketsuOptimizerなど）への100%互換性エクスポート
 */
export const TSUBOS: Tsubo[] = ACUPOINTS_MASTER.filter((p) => p.status === "published").map((p) => ({
  id: p.legacyId,
  name: p.name,
  kana: p.kana,
  romaji: p.romaji,
  code: p.code,
  meridian: p.meridian,
  meridianShort: p.meridianShort,
  bodyPart: p.bodyPart,
  locationSimple: p.locationSimple,
  locationDetail: p.locationDetail,
  indications: p.indications,
  category: p.categories,
  clinicalNote: p.clinicalNote,
  caution: p.caution,
}));

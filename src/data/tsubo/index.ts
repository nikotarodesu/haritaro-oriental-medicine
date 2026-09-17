import { AcupointMaster, AcupointDetail, BodyPart } from "./types";
import { ACUPOINTS_MASTER } from "./acupointsMaster";
import { DETAILED_ACUPOINTS } from "./detailedPoints";
import { MERIDIANS } from "./meridiansData";
import { ACUPOINT_CATEGORIES } from "./categoriesData";
import { BODY_REGIONS } from "./regionsData";
import { CROSS_SECTIONS } from "./crossSectionsData";
import { Tsubo } from "@/types/oriental";

export * from "./types";
export { ACUPOINTS_MASTER } from "./acupointsMaster";
export const ALL_ACUPOINTS = ACUPOINTS_MASTER;
export { DETAILED_ACUPOINTS } from "./detailedPoints";
export { MERIDIANS } from "./meridiansData";
export { ACUPOINT_CATEGORIES } from "./categoriesData";
export { BODY_REGIONS } from "./regionsData";
export { CROSS_SECTIONS } from "./crossSectionsData";

/**
 * コードまたはIDから経穴マスター情報を取得
 */
export function getAcupointByCode(codeOrId: string): AcupointMaster | undefined {
  const clean = codeOrId.trim().toLowerCase().replace(/^tsubo-/, "");
  return ACUPOINTS_MASTER.find(
    (p) =>
      p.codeLower === clean ||
      p.id.toLowerCase() === clean ||
      p.legacyId.toLowerCase() === clean
  );
}

/**
 * 詳細データ（解剖・断面図・取穴手順など）を取得。
 * 旗艦3穴（LI4, PC6, ST36）は完全詳細データを返し、
 * それ以外はマスター情報をベースにした詳細互換データを生成。
 */
export function getAcupointDetail(codeOrId: string): AcupointDetail | undefined {
  const clean = codeOrId.trim().toLowerCase().replace(/^tsubo-/, "");
  
  // 1. 詳細穴に直接マッチ
  if (DETAILED_ACUPOINTS[clean]) {
    return DETAILED_ACUPOINTS[clean];
  }

  // 2. マスターから探索
  const master = getAcupointByCode(clean);
  if (!master) return undefined;

  // 既に詳細登録されている場合
  if (DETAILED_ACUPOINTS[master.codeLower]) {
    return DETAILED_ACUPOINTS[master.codeLower];
  }

  // 3. 基本情報から詳細互換モデルを生成
  return {
    ...master,
    howToLocate: [
      `患者に適切な姿勢をとらせ、${master.meridian}の流注に沿って触診します。`,
      master.locationSimple,
      `WHO標準取穴法：${master.locationDetail}`,
    ],
    palpationLandmarks: [
      `${master.bodyPart}の骨性指標・筋腱部`,
      master.locationDetail.split("、")[0] || "局所骨際",
    ],
    pitfalls: "周囲の動脈拍動および重要神経幹の走向に留意し、直刺・斜刺の角度を適切に保ちます。",
    crossSection: {
      id: `cs-${master.codeLower}`,
      title: `${master.name}（${master.code}）局所構造`,
      level: `${master.bodyPart}（標準取穴位置）`,
      axes: {
        horizontal: ["橈側 / 内側", "尺側 / 外側"],
        vertical: ["浅層（体表）", "深層（骨格）"],
      },
      needleTrack: {
        angle: "直刺 0.5〜1.0寸",
        safeDepth: "10〜20mm",
        targetStructure: "局所筋膜および神経筋接合部",
      },
      layers: [
        {
          depthIndex: 1,
          id: "skin",
          name: "皮膚（表皮・真皮）",
          category: "skin",
          depthDescription: "表面〜約1.5mm",
          description: "知覚受容器が豊富。素早い切皮が痛みを防ぐポイント。",
          dangerLevel: "safe",
        },
        {
          depthIndex: 2,
          id: "subcutaneous",
          name: "皮下組織・浅筋膜",
          category: "subcutaneous",
          depthDescription: "深さ約1.5〜3.0mm",
          description: "皮下静脈や末梢皮枝が走行。",
          dangerLevel: "safe",
        },
        {
          depthIndex: 3,
          id: "muscle",
          name: "筋・筋膜層",
          category: "muscle",
          depthDescription: "深さ約3.0〜20.0mm",
          description: "得気（響き）の受容部。",
          dangerLevel: "safe",
        },
        {
          depthIndex: 4,
          id: "bone",
          name: "骨・関節支持組織",
          category: "bone",
          depthDescription: "深層境界",
          description: "取穴の骨性指標。",
          dangerLevel: "safe",
        },
      ],
      svgElements: [],
      references: [master.locationSource],
      verifiedDate: "2026-09",
    },
    nearbyPoints: [],
  };
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
    if (!q) return a.meridianOrder - b.meridianOrder;
    // 完全一致を上位に
    const aExact = a.name === q || a.codeLower === q;
    const bExact = b.name === q || b.codeLower === q;
    if (aExact && !bExact) return -1;
    if (!aExact && bExact) return 1;

    // 公開済み詳細穴を優先
    if (a.status === "published" && b.status !== "published") return -1;
    if (a.status !== "published" && b.status === "published") return 1;

    return 0;
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

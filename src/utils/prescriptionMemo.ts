import type { ClinicalMemoItem } from "@/types/clinicalMemo";
import { ACUPOINT_ROLES, analyzePrescription } from "@/data/haiketsuData";

export function getPrescriptionMemoTitle(points: string[], title: string, isPremium: boolean) {
  return isPremium ? title || "自作配穴メモ" : `${points.join("・")}の配穴メモ`;
}

export function buildPrescriptionMemo(input: {
  selectedPointIds: string[];
  title: string;
  rationale: string;
  isPremium: boolean;
  timestamp?: number;
}): Omit<ClinicalMemoItem, "createdAt" | "updatedAt"> {
  const ids = [...new Set(input.selectedPointIds)].filter(id => Boolean(ACUPOINT_ROLES[id]));
  if (!ids.length) throw new Error("保存する経穴を選んでください。");
  const points = ids.map(id => ACUPOINT_ROLES[id].name);
  const analysis = analyzePrescription(ids);
  const timestamp = input.timestamp ?? Date.now();
  return {
    id: `haiketsu-${timestamp}`,
    type: "pair",
    title: getPrescriptionMemoTitle(points, input.title, input.isPremium),
    subTitle: `配穴構成: 本治${analysis.rootCount}穴・標治${analysis.branchCount}穴（計${points.length}穴）`,
    points,
    // Choosing points does not establish a five-element label or an indication.
    elements: [],
    indications: [],
    summary: `${input.isPremium ? "選定理由" : "教材例の説明（現在の配穴の選定理由ではありません）"}: ${input.rationale || "未記入"}`,
    mechanism: `教材内の構成分析: 本治${analysis.rootCount}穴 / 標治${analysis.branchCount}穴（${analysis.statusText}）。治療効果や安全性の確認結果ではありません。`,
    personalNotes: `配穴演習にて設計 (${new Date(timestamp).toLocaleDateString("ja-JP")})`,
  };
}

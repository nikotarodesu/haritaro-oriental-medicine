import { ACUPOINTS_MASTER } from "@/data/tsubo";

// 主要な361穴および奇穴の日本語名リスト（2文字以上のもの）
const ACUPOINT_NAMES = ACUPOINTS_MASTER.map((p) => p.name).sort((a, b) => b.length - a.length);

/**
 * 与えられたテキスト（問題文や解説）に含まれる経穴名をユニークに抽出
 */
export function extractAcupointsFromText(text: string): string[] {
  if (!text) return [];
  const found: string[] = [];

  for (const name of ACUPOINT_NAMES) {
    if (name.length < 2) continue;
    // 「中」「大」などの極めて一般的な1文字は除外（経穴マスターはすべて2文字以上）
    if (text.includes(name) && !found.includes(name)) {
      found.push(name);
      if (found.length >= 6) break; // 最大6件まで
    }
  }

  return found;
}

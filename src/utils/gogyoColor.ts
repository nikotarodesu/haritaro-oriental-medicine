/**
 * 五行カラーユニバーサルデザイン（Five Elements Color Universal Design System）
 * 
 * 木（翠）、火（朱）、土（琥珀）、金（白銀・薄墨）、水（藍）の5色を厳格に定義。
 * サイト全域（タグ、グラフ、図解、バッジ）で完全統一し、
 * 文字を読まなくても色だけで「どの臓腑・機能の話か」が直感的に脳へ飛び込んでくるようにします。
 */

export type GogyoElement = "木" | "火" | "土" | "金" | "水";
export type GogyoOrgan = "肝" | "心" | "脾" | "肺" | "腎";

export interface GogyoColorDefinition {
  element: GogyoElement;
  elementRomaji: "wood" | "fire" | "earth" | "metal" | "water";
  colorName: string;
  colorShort: string;
  organ: string;
  organShort: GogyoOrgan;
  primary: string;
  accent: string;
  bgLight: string;
  borderLight: string;
  bgDark: string;
  borderDark: string;
  textLight: string;
  textDark: string;
  glowColor: string;
  direction: string; // 東・南・中・西・北
  season: string; // 春・夏・長夏/土用・秋・冬
  flavor: string; // 酸・苦・甘・辛・鹹
}

export const GOGYO_COLORS: Record<GogyoElement, GogyoColorDefinition> = {
  "木": {
    element: "木",
    elementRomaji: "wood",
    colorName: "翠（すい・常磐）",
    colorShort: "翠",
    organ: "肝・胆",
    organShort: "肝",
    primary: "#1E3D34",
    accent: "#10B981",
    bgLight: "#EBF3EF",
    borderLight: "#C5DED4",
    bgDark: "#13221C",
    borderDark: "#244337",
    textLight: "#1E3D34",
    textDark: "#74BA9E",
    glowColor: "rgba(16, 185, 129, 0.35)",
    direction: "東",
    season: "春",
    flavor: "酸"
  },
  "火": {
    element: "火",
    elementRomaji: "fire",
    colorName: "朱（しゅ・茜）",
    colorShort: "朱",
    organ: "心・小腸",
    organShort: "心",
    primary: "#C45A4A",
    accent: "#DC2626",
    bgLight: "#FCF4EB",
    borderLight: "#F3E1CB",
    bgDark: "#221615",
    borderDark: "#422826",
    textLight: "#C45A4A",
    textDark: "#F87171",
    glowColor: "rgba(220, 38, 38, 0.35)",
    direction: "南",
    season: "夏",
    flavor: "苦"
  },
  "土": {
    element: "土",
    elementRomaji: "earth",
    colorName: "琥珀（こはく・黄土）",
    colorShort: "琥珀",
    organ: "脾・胃",
    organShort: "脾",
    primary: "#B86924",
    accent: "#F59E0B",
    bgLight: "#FEF3C7",
    borderLight: "#FCD34D",
    bgDark: "#231A0F",
    borderDark: "#45331E",
    textLight: "#B86924",
    textDark: "#FBBF24",
    glowColor: "rgba(245, 158, 11, 0.35)",
    direction: "中央",
    season: "長夏（土用）",
    flavor: "甘"
  },
  "金": {
    element: "金",
    elementRomaji: "metal",
    colorName: "白銀・薄墨（はくぎん・うすずみ）",
    colorShort: "白銀",
    organ: "肺・大腸",
    organShort: "肺",
    primary: "#475569",
    accent: "#94A3B8",
    bgLight: "#F1F5F9",
    borderLight: "#CBD5E1",
    bgDark: "#18222C",
    borderDark: "#2E3F50",
    textLight: "#334155",
    textDark: "#94A3B8",
    glowColor: "rgba(148, 163, 184, 0.35)",
    direction: "西",
    season: "秋",
    flavor: "辛"
  },
  "水": {
    element: "水",
    elementRomaji: "water",
    colorName: "藍（あい・勝色）",
    colorShort: "藍",
    organ: "腎・膀胱",
    organShort: "腎",
    primary: "#1E2D3D",
    accent: "#0284C7",
    bgLight: "#EDF3F8",
    borderLight: "#BAE6FD",
    bgDark: "#101C26",
    borderDark: "#1E3547",
    textLight: "#1E2D3D",
    textDark: "#60A5FA",
    glowColor: "rgba(2, 132, 199, 0.35)",
    direction: "北",
    season: "冬",
    flavor: "鹹"
  }
};

/**
 * 五行または臓腑名から五行カラー定義を取得する
 */
export function getGogyoColor(input: string): GogyoColorDefinition {
  if (input.includes("木") || input.includes("肝") || input.includes("胆")) {
    return GOGYO_COLORS["木"];
  }
  if (input.includes("火") || input.includes("心") || input.includes("小腸")) {
    return GOGYO_COLORS["火"];
  }
  if (input.includes("土") || input.includes("脾") || input.includes("胃")) {
    return GOGYO_COLORS["土"];
  }
  if (input.includes("金") || input.includes("肺") || input.includes("大腸")) {
    return GOGYO_COLORS["金"];
  }
  if (input.includes("水") || input.includes("腎") || input.includes("膀胱")) {
    return GOGYO_COLORS["水"];
  }
  return GOGYO_COLORS["木"];
}

/**
 * 五行全リスト
 */
export const GOGYO_LIST: GogyoColorDefinition[] = [
  GOGYO_COLORS["木"],
  GOGYO_COLORS["火"],
  GOGYO_COLORS["土"],
  GOGYO_COLORS["金"],
  GOGYO_COLORS["水"]
];

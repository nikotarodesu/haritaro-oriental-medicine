import { 
  Home, 
  ClipboardPenLine,
  GraduationCap, 
  RotateCcw, 
  Award, 
  MapPin, 
  Search, 
  Sparkles, 
  Activity, 
  Layers, 
  GitCompare, 
  SlidersHorizontal, 
  BookOpen, 
  Library, 
  HeartPulse,
  LucideIcon
} from "lucide-react";

export type NavItemId =
  | "home"
  | "clinical"
  | "clinical_guides"
  | "tsubo_compare"
  | "curriculum"
  | "review"
  | "kokushi"
  | "tsubo"
  | "search"
  | "diagnosis"
  | "gorou"
  | "simulator"
  | "simulator_compare"
  | "haiketsu"
  | "cases"
  | "library"
  | "symptoms";

export interface NavItemDefinition {
  id: NavItemId;
  label: string;
  shortLabel: string;
  description: string;
  icon: LucideIcon;
  href: string;
  isAction?: boolean;
}

export const ALL_NAV_ITEMS: Record<NavItemId, NavItemDefinition> = {
  clinical: {
    id: "clinical", label: "臨床演習", shortLabel: "臨床", description: "症例・配穴の演習と主訴別ガイド", icon: ClipboardPenLine, href: "/clinical",
  },
  clinical_guides: {
    id: "clinical_guides", label: "主訴別ガイド", shortLabel: "主訴", description: "主訴ごとに確認したい項目を調べる", icon: BookOpen, href: "/clinical#chief-complaints",
  },
  tsubo_compare: {
    id: "tsubo_compare", label: "経穴比較", shortLabel: "経穴比較", description: "経穴の位置・特徴・注意事項を並べる", icon: GitCompare, href: "/tsubo/compare",
  },
  home: {
    id: "home",
    label: "ホーム",
    shortLabel: "ホーム",
    description: "トップページ・2つの入口",
    icon: Home,
    href: "/",
  },
  curriculum: {
    id: "curriculum",
    label: "学びの総合案内",
    shortLabel: "学ぶ",
    description: "目的別コース・全講義・図解記事から学ぶ",
    icon: GraduationCap,
    href: "/learn",
  },
  review: {
    id: "review",
    label: "今日の復習",
    shortLabel: "復習",
    description: "回答履歴と復習予定から取り組む知識定着演習",
    icon: RotateCcw,
    href: "/learn/review#learning-review",
  },
  kokushi: {
    id: "kokushi",
    label: "講義の復習",
    shortLabel: "復習",
    description: "講義の回答履歴から復習する",
    icon: Award,
    href: "/learn/review",
  },
  tsubo: {
    id: "tsubo",
    label: "ツボ図鑑",
    shortLabel: "ツボ図鑑",
    description: "全361穴のWHO標準取穴と解剖注意点",
    icon: MapPin,
    href: "/tsubo",
  },
  search: {
    id: "search",
    label: "横断検索",
    shortLabel: "検索",
    description: "経穴・症状・用語・講義の横断検索",
    icon: Search,
    href: "#search",
    isAction: true,
  },
  diagnosis: {
    id: "diagnosis",
    label: "気血水 体質チェック",
    shortLabel: "気血水",
    description: "体質傾向（気虚・気滞・血虚・瘀血等）の整理",
    icon: Sparkles,
    href: "/diagnosis",
  },
  gorou: {
    id: "gorou",
    label: "五労チェック",
    shortLabel: "五労",
    description: "長く続く生活動作と五労の関係を振り返る",
    icon: Activity,
    href: "/diagnosis?tab=gorou",
  },
  simulator: {
    id: "simulator",
    label: "弁証の練習",
    shortLabel: "弁証",
    description: "八綱・気血水・臓腑の鑑別推論",
    icon: Layers,
    href: "/simulator",
  },
  simulator_compare: {
    id: "simulator_compare",
    label: "鑑別例を見比べる",
    shortLabel: "鑑別例",
    description: "弁証の練習で2つの鑑別例を見比べる",
    icon: GitCompare,
    href: "/simulator#comparison-examples",
  },
  haiketsu: {
    id: "haiketsu",
    label: "配穴の練習",
    shortLabel: "配穴",
    description: "ツボの組み合わせと選んだ理由を書く",
    icon: SlidersHorizontal,
    href: "/practice/haiketsu",
  },
  cases: {
    id: "cases",
    label: "症例を選ぶ",
    shortLabel: "症例",
    description: "模擬症例の所見を読み、判断の理由を考える",
    icon: BookOpen,
    href: "/cases",
  },
  library: {
    id: "library",
    label: "文献・古典・症例教材",
    shortLabel: "文献",
    description: "論文、古典の条文、模擬症例を検索",
    icon: Library,
    href: "/library",
  },
  symptoms: {
    id: "symptoms",
    label: "症状から探す",
    shortLabel: "症状",
    description: "症状ガイドと受診の目安",
    icon: HeartPulse,
    href: "/symptoms",
  },
};

/** Everyday destinations shared by the header and clinical home. */
export const CLINICAL_PRIMARY_ITEMS = [
  ALL_NAV_ITEMS.clinical_guides,
  ALL_NAV_ITEMS.tsubo_compare,
] as const satisfies readonly NavItemDefinition[];

/** Exercises shown under the optional practice menu. */
export const CLINICAL_PRACTICE_ITEMS = [
  ALL_NAV_ITEMS.simulator,
  ALL_NAV_ITEMS.haiketsu,
  ALL_NAV_ITEMS.cases,
] as const satisfies readonly NavItemDefinition[];

/** Retained for existing consumers; public menus use the concise lists above. */
export const CLINICAL_NAV_GROUPS = [
  { id: "lookup", label: "調べる", items: ["clinical_guides", "tsubo_compare"] },
  { id: "practice", label: "練習する", items: ["simulator", "haiketsu", "cases"] },
] as const satisfies readonly { id: string; label: string; items: readonly NavItemId[] }[];

export function getNavigationSection(pathname: string): "learn" | "clinical" | "dictionary" | null {
  const within = (path: string) => pathname === path || pathname.startsWith(path + "/");
  if (["/clinical", "/simulator", "/practice", "/cases", "/kikei"].some(within) || within("/tsubo/compare")) return "clinical";
  if (within("/tsubo") || within("/symptoms")) return "dictionary";
  if (["/learn", "/curriculum", "/library", "/articles", "/diagnosis"].some(within)) return "learn";
  return null;
}

export function isNavigationItemActive(id: NavItemId, pathname: string, searchParams?: Pick<URLSearchParams, "get">): boolean {
  if (id === "home") return pathname === "/";
  if (id === "search") return false;
  if (id === "clinical") return pathname === "/clinical";
  if (id === "clinical_guides") return pathname.startsWith("/clinical/symptoms/");
  if (id === "curriculum") return pathname !== "/learn/review" && (pathname.startsWith("/learn") || pathname.startsWith("/curriculum"));
  if (id === "review" || id === "kokushi") return pathname === "/learn/review";
  if (id === "diagnosis") return pathname === "/diagnosis" && searchParams?.get("tab") !== "gorou";
  if (id === "gorou") return pathname === "/diagnosis" && searchParams?.get("tab") === "gorou";
  if (id === "simulator") return pathname === "/simulator";
  if (id === "simulator_compare") return pathname.startsWith("/simulator/compare");
  if (id === "tsubo_compare") return pathname.startsWith("/tsubo/compare");
  if (id === "tsubo") return (pathname === "/tsubo" || pathname.startsWith("/tsubo/")) && !pathname.startsWith("/tsubo/compare");
  return pathname.startsWith(ALL_NAV_ITEMS[id].href.split(/[?#]/)[0]);
}

const sectionShortcuts = { dictionary: "tsubo", learn: "curriculum", clinical: "clinical" } as const;

export function getCurrentBottomNavItem(items: readonly NavItemId[], pathname: string, searchParams?: Pick<URLSearchParams, "get">) {
  const selected = items.find(id => isNavigationItemActive(id, pathname, searchParams));
  if (selected) return selected;
  if (pathname === "/tsubo/compare" && items.includes("tsubo")) return "tsubo";

  const section = getNavigationSection(pathname);
  const shortcut = section ? sectionShortcuts[section] : undefined;
  return shortcut && items.includes(shortcut) ? shortcut : undefined;
}

export type NavPresetType = "standard" | "student" | "clinician";

export const NAV_PRESETS: Record<NavPresetType, { name: string; description: string; items: [NavItemId, NavItemId, NavItemId, NavItemId] }> = {
  standard: {
    name: "標準セット",
    description: "ツボ図鑑・東洋医学・臨床演習・検索",
    items: ["tsubo", "curriculum", "clinical", "search"],
  },
  student: {
    name: "学生・学習者セット",
    description: "東洋医学、復習、経穴、症状を素早く開く",
    items: ["curriculum", "review", "tsubo", "symptoms"],
  },
  clinician: {
    name: "臨床家セット",
    description: "臨床演習、配穴演習、ツボ図鑑、症例演習",
    items: ["clinical", "haiketsu", "tsubo", "cases"],
  },
};

export const NAV_STORAGE_KEY = "haritaro_nav_config_v1";

export interface NavUserConfig {
  version: 1;
  items: [NavItemId, NavItemId, NavItemId, NavItemId];
  preset?: NavPresetType;
  updatedAt: string;
}

export const DEFAULT_NAV_CONFIG: NavUserConfig = {
  version: 1,
  items: NAV_PRESETS.standard.items,
  preset: "standard",
  updatedAt: "2026-11-24",
};

const legacyStandardItems = ["tsubo", "symptoms", "curriculum", "search"] as const;
const legacyClinicianItems = ["simulator", "haiketsu", "tsubo", "notes"] as const;

/**
 * 安全にユーザー設定を読み込む（バージョン管理と破損値フォールバック付き）
 */
export function loadNavUserConfig(): NavUserConfig {
  if (typeof window === "undefined") return DEFAULT_NAV_CONFIG;
  try {
    const raw = localStorage.getItem(NAV_STORAGE_KEY);
    if (!raw) return DEFAULT_NAV_CONFIG;
    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.items) || parsed.items.length !== 4) {
      return DEFAULT_NAV_CONFIG;
    }
    // 全アイテムIDが有効か検証
    const valid = parsed.items.every((id: unknown) => typeof id === "string" && (
      id === "notes" || id === "clinical_interview" || id === "workspace" || Object.hasOwn(ALL_NAV_ITEMS, id)
    ));
    if (!valid) return DEFAULT_NAV_CONFIG;
    // 重複がないか検証
    const unique = new Set(parsed.items);
    if (unique.size !== 4) return DEFAULT_NAV_CONFIG;

    // Update saved presets only when their original order matches.
    let sourceItems = parsed.items;
    if (parsed.preset === "standard" && legacyStandardItems.every((id, index) => parsed.items[index] === id)) {
      sourceItems = NAV_PRESETS.standard.items;
    }
    if (parsed.preset === "clinician" && legacyClinicianItems.every((id, index) => parsed.items[index] === id)) {
      sourceItems = NAV_PRESETS.clinician.items;
    }
    // Keep the user's other choices when a legacy shortcut changes.
    const migrated = [...new Set<NavItemId>(sourceItems.map((id: NavItemId | "notes" | "clinical_interview" | "workspace") => {
      if (id === "kokushi") return "review";
      if (id === "notes") return "symptoms";
      if (id === "clinical_interview") return "diagnosis";
      if (id === "workspace") return "clinical";
      return id;
    }))];
    // Keep the previous backfill order when two discontinued shortcuts merge.
    for (const id of legacyStandardItems) {
      if (migrated.length === 4) break;
      if (!migrated.includes(id)) migrated.push(id);
    }

    return {
      version: 1,
      items: migrated as [NavItemId, NavItemId, NavItemId, NavItemId],
      preset: parsed.preset,
      updatedAt: parsed.updatedAt || new Date().toISOString(),
    };
  } catch {
    return DEFAULT_NAV_CONFIG;
  }
}

/**
 * ユーザー設定を保存
 */
export function saveNavUserConfig(config: NavUserConfig): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(NAV_STORAGE_KEY, JSON.stringify(config));
    window.dispatchEvent(new CustomEvent("haritaro:nav-updated"));
  } catch (err) {
    console.warn("Failed to save nav config to localStorage:", err);
  }
}

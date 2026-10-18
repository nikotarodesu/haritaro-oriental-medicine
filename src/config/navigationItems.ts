import { 
  Home, 
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
  FileText,
  LucideIcon
} from "lucide-react";

export type NavItemId =
  | "home"
  | "clinical"
  | "workspace"
  | "clinical_guides"
  | "tsubo_compare"
  | "curriculum"
  | "review"
  | "kokushi"
  | "tsubo"
  | "search"
  | "diagnosis"
  | "clinical_interview"
  | "gorou"
  | "simulator"
  | "simulator_compare"
  | "haiketsu"
  | "cases"
  | "library"
  | "notes";

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
    id: "clinical", label: "臨床ホーム", shortLabel: "臨床", description: "新しい記録・下書き・主訴別ガイドの入口", icon: Home, href: "/clinical",
  },
  workspace: {
    id: "workspace", label: "臨床記録", shortLabel: "記録", description: "安全確認から所見・配穴の理由・再評価を記録", icon: FileText, href: "/clinical/workspace",
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
    label: "経穴辞典",
    shortLabel: "経穴",
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
    label: "気血水チェック",
    shortLabel: "気血水",
    description: "体質傾向（気虚・気滞・血虚・瘀血等）の整理",
    icon: Sparkles,
    href: "/diagnosis",
  },
  clinical_interview: {
    id: "clinical_interview",
    label: "対面問診",
    shortLabel: "問診",
    description: "気血水の所見を対面で聞き取り、記録に整理する",
    icon: Activity,
    href: "/diagnosis?tab=clinical",
  },
  gorou: {
    id: "gorou",
    label: "五労チェック",
    shortLabel: "五労",
    description: "日常動作（久坐・久立等）と五臓の負担点検",
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
    description: "本治・標治バランスと処方構成の演習",
    icon: SlidersHorizontal,
    href: "/practice/haiketsu",
  },
  cases: {
    id: "cases",
    label: "症例を選ぶ",
    shortLabel: "症例",
    description: "四診合参から導く臨床ケーススタディ",
    icon: BookOpen,
    href: "/cases",
  },
  library: {
    id: "library",
    label: "文献・実例",
    shortLabel: "文献",
    description: "古典条文・RCT論文・運動器実例アーカイブ",
    icon: Library,
    href: "/library",
  },
  notes: {
    id: "notes",
    label: "マイノート",
    shortLabel: "ノート",
    description: "臨床記録と配穴ストック・印刷シート",
    icon: FileText,
    href: "/notes",
  },
};

/** The five everyday destinations shared by the header and clinical home. */
export const CLINICAL_PRIMARY_ITEMS = [
  ALL_NAV_ITEMS.workspace,
  { ...ALL_NAV_ITEMS.notes, label: "記録一覧" },
  ALL_NAV_ITEMS.clinical_guides,
  ALL_NAV_ITEMS.clinical_interview,
  ALL_NAV_ITEMS.tsubo_compare,
] as const satisfies readonly NavItemDefinition[];

/** Practice is a separate, optional step from working on a record. */
export const CLINICAL_PRACTICE_ITEMS = [
  ALL_NAV_ITEMS.simulator,
  ALL_NAV_ITEMS.haiketsu,
  ALL_NAV_ITEMS.cases,
] as const satisfies readonly NavItemDefinition[];

/** Retained for existing consumers; public menus use the concise lists above. */
export const CLINICAL_NAV_GROUPS = [
  { id: "record", label: "記録する", items: ["workspace", "notes"] },
  { id: "lookup", label: "調べる", items: ["clinical_guides", "clinical_interview", "tsubo_compare"] },
  { id: "practice", label: "練習する", items: ["simulator", "haiketsu", "cases"] },
] as const satisfies readonly { id: string; label: string; items: readonly NavItemId[] }[];

export function getNavigationSection(pathname: string): "learn" | "clinical" | "dictionary" | "account" | null {
  const within = (path: string) => pathname === path || pathname.startsWith(path + "/");
  if (["/clinical", "/simulator", "/practice", "/cases", "/diagnosis", "/kikei", "/notes", "/mynote"].some(within) || within("/tsubo/compare")) return "clinical";
  if (within("/tsubo")) return "dictionary";
  if (["/learn", "/curriculum", "/library", "/articles"].some(within)) return "learn";
  if (["/account", "/auth", "/pricing"].some(within)) return "account";
  return null;
}

export function isNavigationItemActive(id: NavItemId, pathname: string, searchParams?: Pick<URLSearchParams, "get">): boolean {
  if (id === "home") return pathname === "/";
  if (id === "search") return false;
  if (id === "clinical") return pathname === "/clinical";
  if (id === "clinical_guides") return pathname.startsWith("/clinical/symptoms/");
  if (id === "workspace") return pathname === "/clinical/workspace";
  if (id === "curriculum") return pathname !== "/learn/review" && (pathname.startsWith("/learn") || pathname.startsWith("/curriculum"));
  if (id === "review" || id === "kokushi") return pathname === "/learn/review";
  if (id === "notes") return pathname.startsWith("/notes") || pathname.startsWith("/mynote");
  if (id === "diagnosis") return pathname === "/diagnosis" && !["gorou", "clinical"].includes(searchParams?.get("tab") ?? "");
  if (id === "clinical_interview") return pathname === "/diagnosis" && searchParams?.get("tab") === "clinical";
  if (id === "gorou") return pathname === "/diagnosis" && searchParams?.get("tab") === "gorou";
  if (id === "simulator") return pathname === "/simulator";
  if (id === "simulator_compare") return pathname.startsWith("/simulator/compare");
  if (id === "tsubo_compare") return pathname.startsWith("/tsubo/compare");
  if (id === "tsubo") return (pathname === "/tsubo" || pathname.startsWith("/tsubo/")) && !pathname.startsWith("/tsubo/compare");
  return pathname.startsWith(ALL_NAV_ITEMS[id].href.split(/[?#]/)[0]);
}

export type NavPresetType = "standard" | "student" | "clinician";

export const NAV_PRESETS: Record<NavPresetType, { name: string; description: string; items: [NavItemId, NavItemId, NavItemId, NavItemId] }> = {
  standard: {
    name: "標準セット",
    description: "学ぶ、経穴、検索、マイノートの基本構成",
    items: ["curriculum", "tsubo", "search", "notes"],
  },
  student: {
    name: "学生・学習者セット",
    description: "学びの案内、復習、経穴、マイノートを素早く開く",
    items: ["curriculum", "review", "tsubo", "notes"],
  },
  clinician: {
    name: "臨床家セット",
    description: "臨床記録、配穴の練習、経穴辞典、マイノートを素早く開く",
    items: ["workspace", "haiketsu", "tsubo", "notes"],
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
  items: ["curriculum", "tsubo", "search", "notes"],
  preset: "standard",
  updatedAt: "2026-10-03",
};

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
    const valid = parsed.items.every((id: string) => Boolean(ALL_NAV_ITEMS[id as NavItemId]));
    if (!valid) return DEFAULT_NAV_CONFIG;
    // 重複がないか検証
    const unique = new Set(parsed.items);
    if (unique.size !== 4) return DEFAULT_NAV_CONFIG;

    // Migrate only the unchanged old clinician preset; custom arrangements stay intact.
    const legacyClinician = ["simulator", "haiketsu", "tsubo", "notes"];
    const sourceItems = parsed.preset === "clinician" && parsed.items.every((id: string, index: number) => id === legacyClinician[index])
      ? NAV_PRESETS.clinician.items : parsed.items;
    // Keep the user's other choices when the retired exam shortcut becomes review.
    const migrated = [...new Set<NavItemId>(sourceItems.map((id: NavItemId) => id === "kokushi" ? "review" : id))];
    for (const id of DEFAULT_NAV_CONFIG.items) {
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

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
    label: "学習カリキュラム",
    shortLabel: "学ぶ",
    description: "基礎から体系的に学ぶ全81講義",
    icon: GraduationCap,
    href: "/curriculum",
  },
  review: {
    id: "review",
    label: "今日の復習",
    shortLabel: "復習",
    description: "忘却曲線に基づく日替わり知識定着演習",
    icon: RotateCcw,
    href: "/kokushi",
  },
  kokushi: {
    id: "kokushi",
    label: "国試対策ハブ",
    shortLabel: "国試",
    description: "鍼灸国試の精選問題・要穴骨度法特訓",
    icon: Award,
    href: "/kokushi",
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
  gorou: {
    id: "gorou",
    label: "五労チェッカー",
    shortLabel: "五労",
    description: "日常動作（久坐・久立等）と五臓の負担点検",
    icon: Activity,
    href: "/diagnosis?tab=gorou",
  },
  simulator: {
    id: "simulator",
    label: "弁証シミュレーター",
    shortLabel: "弁証",
    description: "八綱・気血水・臓腑の鑑別推論",
    icon: Layers,
    href: "/simulator",
  },
  simulator_compare: {
    id: "simulator_compare",
    label: "2案比較",
    shortLabel: "2案比較",
    description: "弁証の2つの仮説を横並びで比較鑑別",
    icon: GitCompare,
    href: "/simulator/compare",
  },
  haiketsu: {
    id: "haiketsu",
    label: "配穴設計",
    shortLabel: "配穴",
    description: "本治・標治バランスと処方構成の演習",
    icon: SlidersHorizontal,
    href: "/practice/haiketsu",
  },
  cases: {
    id: "cases",
    label: "臨床症例演習",
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

export type NavPresetType = "standard" | "student" | "clinician";

export const NAV_PRESETS: Record<NavPresetType, { name: string; description: string; items: [NavItemId, NavItemId, NavItemId, NavItemId] }> = {
  standard: {
    name: "標準セット",
    description: "学ぶ、経穴、検索、マイノートの基本構成",
    items: ["curriculum", "tsubo", "search", "notes"],
  },
  student: {
    name: "学生・学習者セット",
    description: "カリキュラム、国試、経穴、マイノートを素早く開く",
    items: ["curriculum", "kokushi", "tsubo", "notes"],
  },
  clinician: {
    name: "臨床家セット",
    description: "弁証推論、配穴設計、経穴辞典、マイノートに特化",
    items: ["simulator", "haiketsu", "tsubo", "notes"],
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

    return {
      version: 1,
      items: parsed.items as [NavItemId, NavItemId, NavItemId, NavItemId],
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

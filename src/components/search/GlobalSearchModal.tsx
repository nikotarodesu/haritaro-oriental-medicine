"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  X,
  GraduationCap,
  MapPin,
  FileText,
  SlidersHorizontal,
  BookOpen,
  ArrowRight,
  Clock,
  Sparkles,
  Command,
} from "lucide-react";
import { getAllAcupoints } from "@/data/tsubo";
import { CURRICULUM_DATA } from "@/data/curriculumData";
import { CLINICAL_CASES } from "@/data/clinicalCasesData";
import { GLOSSARY_TERMS } from "@/data/glossaryData";

export interface SearchResultItem {
  id: string;
  type: "acupoint" | "lecture" | "case" | "tool" | "glossary";
  title: string;
  subtitle?: string;
  badge: string;
  url: string;
  tags?: string[];
}

const STATIC_TOOLS: SearchResultItem[] = [
  {
    id: "tool-simulator",
    type: "tool",
    title: "臨床弁証シミュレーター",
    subtitle: "八綱 ➜ 気血水 ➜ 臓腑経絡の3段階連動で一文の証とペアツボを瞬時に導出",
    badge: "臨床ツール",
    url: "/simulator",
    tags: ["シミュレーター", "弁証", "配穴", "八綱", "気血水", "臓腑", "鑑別"],
  },
  {
    id: "tool-diagnosis-self",
    type: "tool",
    title: "気血水 体質セルフ診断（12問）",
    subtitle: "簡単な質問で気虚・気滞・血虚・瘀血・水滞等の体質傾向をスコアリング",
    badge: "セルフケア",
    url: "/diagnosis",
    tags: ["気血水", "診断", "セルフチェック", "体質", "気虚", "血虚", "瘀血"],
  },
  {
    id: "tool-diagnosis-gorou",
    type: "tool",
    title: "五労（職業病）チェッカー",
    subtitle: "『素問』宣明五気篇準拠：久視・久坐・久立・久行・久臥の動作偏向を分析",
    badge: "生活養生",
    url: "/diagnosis?tab=gorou",
    tags: ["五労", "職業病", "久視", "久坐", "久立", "デスクワーク", "立ち仕事"],
  },
  {
    id: "tool-haiketsu-optimizer",
    type: "tool",
    title: "臨床配穴オプティマイザー",
    subtitle: "原穴・絡穴・背兪穴・募穴・八脈交会穴等の名配穴組み合わせと臨床意図",
    badge: "臨床ツール",
    url: "/practice/haiketsu",
    tags: ["配穴", "処方", "原穴", "絡穴", "四関", "四総穴", "組み合わせ"],
  },
  {
    id: "tool-tsubo-compare",
    type: "tool",
    title: "経穴比較ツール",
    subtitle: "似た主治や近接する経穴（合谷と太衝、足三里と三陰交など）を並べて比較",
    badge: "学習ツール",
    url: "/tsubo/compare",
    tags: ["比較", "鑑別", "経穴", "ツボ比較"],
  },
  {
    id: "tool-notes",
    type: "tool",
    title: "臨床カルテ・配穴ストックノート",
    subtitle: "患者ごとの臨床所見、弁証、配穴、経過記録を安全に管理（下書き連携対応）",
    badge: "臨床管理",
    url: "/notes",
    tags: ["ノート", "カルテ", "記録", "配穴ストック", "患者管理"],
  },
  {
    id: "tool-basics-cun",
    type: "tool",
    title: "骨度法・寸の割り出しガイド",
    subtitle: "全身の骨度分寸（等分法・指寸同身寸）の基準と正確な取穴のコツ",
    badge: "解剖基礎",
    url: "/tsubo/basics/bone-cun",
    tags: ["骨度法", "寸", "取穴", "解剖", "基準"],
  },
  {
    id: "tool-kikei",
    type: "tool",
    title: "奇経八脈データベース",
    subtitle: "督脈・任脈・衝脈・帯脈・陰陽蹻脈・陰陽維脈の走行と主治病態",
    badge: "経絡理論",
    url: "/kikei",
    tags: ["奇経", "八脈", "任脈", "督脈", "衝脈", "帯脈"],
  },
];

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GlobalSearchModal({
  isOpen,
  onClose,
}: GlobalSearchModalProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // 全データのインデックス化（初回マウント時に一度だけ生成）
  const allItems = useMemo<SearchResultItem[]>(() => {
    const list: SearchResultItem[] = [];

    // 1. ツール群
    list.push(...STATIC_TOOLS);

    // 2. 講義カリキュラム（全81レッスン）
    CURRICULUM_DATA.forEach((chapter) => {
      chapter.lectures.forEach((lec) => {
        list.push({
          id: `lecture-${lec.id}`,
          type: "lecture",
          title: lec.title,
          subtitle: `${lec.stageTitle} ➜ ${lec.seriesTitle || "講義"}（約${lec.duration}）`,
          badge: "講義教材",
          url: `/curriculum?lecture=${lec.id}`,
          tags: [
            lec.title,
            lec.subtitle || "",
            lec.summary || "",
            lec.whatYouWillLearn?.canDo || "",
            chapter.title,
            chapter.subtitle || "",
          ],
        });
      });
    });

    // 3. 経穴（全361穴）
    const acupoints = getAllAcupoints();
    acupoints.forEach((pt) => {
      list.push({
        id: `tsubo-${pt.codeLower}`,
        type: "acupoint",
        title: `${pt.name}（${pt.code}）`,
        subtitle: `${pt.meridian}｜${pt.bodyPart}・${pt.locationSimple}`,
        badge: "経穴辞典",
        url: `/tsubo/${pt.codeLower}`,
        tags: [
          pt.name,
          pt.kana,
          pt.code,
          pt.codeLower,
          pt.romaji,
          pt.meridian,
          pt.meridianShort,
          ...(pt.indications || []),
          ...(pt.categories || []),
          ...(pt.aliases || []),
        ],
      });
    });

    // 4. 症例演習（全20症例）
    CLINICAL_CASES.forEach((c) => {
      list.push({
        id: `case-${c.id}`,
        type: "case",
        title: c.title,
        subtitle: `${c.patient?.chiefComplaint || c.subTitle}（${c.difficulty}・${c.category}）`,
        badge: "症例演習",
        url: `/cases/${c.id}`,
        tags: [
          c.title,
          c.subTitle,
          c.patient?.chiefComplaint || "",
          c.correctDiagnosis?.pattern || "",
          c.correctDiagnosis?.hachiko || "",
          c.category,
          c.difficulty,
          ...(c.correctDiagnosis?.primaryPoints || []),
        ],
      });
    });

    // 5. 専門用語（Glossary）
    Object.values(GLOSSARY_TERMS).forEach((term) => {
      list.push({
        id: `glossary-${term.term}`,
        type: "glossary",
        title: `${term.term}（${term.reading}）`,
        subtitle: term.oneLiner,
        badge: `用語：${term.category}`,
        url: term.relatedLectureId
          ? `/curriculum?lecture=${term.relatedLectureId}`
          : term.relatedToolUrl || `/curriculum`,
        tags: [term.term, term.reading, term.oneLiner, term.summary],
      });
    });

    return list;
  }, []);

  // 検索フィルタリング（ひらがな・カタカナ・英数正規化）
  const filteredResults = useMemo(() => {
    const rawQ = query.trim().toLowerCase();
    if (!rawQ) return [];

    // カタカナ ➜ ひらがな変換
    const hiraQ = rawQ.replace(/[\u30a1-\u30f6]/g, (m) =>
      String.fromCharCode(m.charCodeAt(0) - 0x60)
    );

    return allItems
      .filter((item) => {
        // タイトル一致
        const titleLower = item.title.toLowerCase();
        if (titleLower.includes(rawQ) || titleLower.includes(hiraQ)) return true;

        // サブタイトル一致
        if (item.subtitle && item.subtitle.toLowerCase().includes(rawQ)) return true;

        // タグ一致
        if (
          item.tags?.some((t) => {
            const tLower = t.toLowerCase();
            return tLower.includes(rawQ) || tLower.includes(hiraQ);
          })
        ) {
          return true;
        }

        return false;
      })
      .slice(0, 20); // 上位20件
  }, [allItems, query]);

  // モーダル開閉時のフォーカス制御 & 入力クリア
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  // キーボードナビゲーション（上下移動、Enter、Esc）
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          filteredResults.length > 0 ? (prev + 1) % filteredResults.length : 0
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          filteredResults.length > 0
            ? (prev - 1 + filteredResults.length) % filteredResults.length
            : 0
        );
      } else if (e.key === "Enter") {
        if (filteredResults[selectedIndex]) {
          e.preventDefault();
          const target = filteredResults[selectedIndex];
          onClose();
          router.push(target.url);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredResults, selectedIndex, onClose, router]);

  // クイックサジェストのキーワード
  const quickSearches = [
    { label: "気虚", q: "気虚" },
    { label: "合谷 (LI4)", q: "合谷" },
    { label: "五労", q: "五労" },
    { label: "シミュレーター", q: "シミュレーター" },
    { label: "四関", q: "四関" },
    { label: "足三里", q: "足三里" },
    { label: "頭痛", q: "頭痛" },
  ];

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center p-3 sm:p-6 sm:pt-20 animate-in fade-in duration-150"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-[#FAF8F5] dark:bg-[#16212B] rounded-2xl sm:rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-150"
      >
        {/* 検索入力ヘッダー */}
        <div className="p-3.5 sm:p-4 border-b border-[#F2ECE0] dark:border-[#22303D] flex items-center gap-3 bg-white dark:bg-[#1A2632]">
          <Search className="w-5 h-5 text-[#1E3D34] dark:text-[#74BA9E] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="経穴名・コード（合谷 / LI4）、症状、講義、症例、用語を検索..."
            className="flex-1 bg-transparent text-[#232826] dark:text-[#FAF8F5] placeholder-[#8C9691] dark:placeholder-[#64748B] text-sm sm:text-base outline-hidden"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono font-bold text-[#737C77] dark:text-[#8899A6] bg-[#FAF8F5] dark:bg-[#121920] border border-[#E5DEC9] dark:border-[#2A3B4A] rounded-md">
            ESC
          </kbd>
        </div>

        {/* 検索結果・サジェスト一覧（スクロールエリア） */}
        <div className="flex-1 overflow-y-auto p-2 sm:p-3 space-y-1">
          {/* 未入力時：クイック検索候補 */}
          {!query && (
            <div className="p-4 sm:p-6 space-y-4">
              <div>
                <span className="text-xs font-bold text-[#737C77] dark:text-[#8899A6] uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
                  人気の検索キーワード
                </span>
                <div className="flex flex-wrap gap-2">
                  {quickSearches.map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => setQuery(item.q)}
                      className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#1A2632] border border-[#E5DEC9] dark:border-[#2A3B4A] hover:border-[#1E3D34] text-xs font-semibold text-[#232826] dark:text-[#FAF8F5] transition-all hover:shadow-2xs cursor-pointer"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 主要ツールへのクイックアクセス */}
              <div className="pt-2 border-t border-[#F2ECE0] dark:border-[#22303D]">
                <span className="text-xs font-bold text-[#737C77] dark:text-[#8899A6] uppercase tracking-wider block mb-2">
                  主要ツールへ直接アクセス
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {STATIC_TOOLS.slice(0, 4).map((tool) => (
                    <button
                      key={tool.id}
                      type="button"
                      onClick={() => {
                        onClose();
                        router.push(tool.url);
                      }}
                      className="p-2.5 rounded-xl bg-white dark:bg-[#1A2632] border border-[#E5DEC9] dark:border-[#2A3B4A] hover:bg-[#EBF3EF] dark:hover:bg-[#182823] text-left transition-colors flex items-center justify-between group cursor-pointer"
                    >
                      <span className="font-bold text-[#1E3D34] dark:text-[#74BA9E] truncate">
                        {tool.title}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 検索結果あり */}
          {query && filteredResults.length > 0 && (
            <div className="space-y-1">
              <div className="px-3 py-1 text-[11px] font-bold text-[#737C77] dark:text-[#8899A6]">
                検索結果: {filteredResults.length}件（↑↓キーで選択・Enterで移動）
              </div>

              {filteredResults.map((item, idx) => {
                const isSelected = idx === selectedIndex;
                let Icon = BookOpen;
                if (item.type === "acupoint") Icon = MapPin;
                if (item.type === "lecture") Icon = GraduationCap;
                if (item.type === "case") Icon = FileText;
                if (item.type === "tool") Icon = SlidersHorizontal;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      onClose();
                      router.push(item.url);
                    }}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`w-full text-left p-3 rounded-xl transition-all flex items-start gap-3 cursor-pointer ${
                      isSelected
                        ? "bg-[#1E3D34] text-white shadow-sm"
                        : "bg-white dark:bg-[#1A2632] hover:bg-[#FAF8F5] dark:hover:bg-[#202E3C] border border-[#E5DEC9] dark:border-[#2A3B4A] text-[#232826] dark:text-[#FAF8F5]"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                        isSelected
                          ? "bg-white/20 text-white"
                          : "bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E]"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>

                    <div className="flex-1 min-w-0 space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                            isSelected
                              ? "bg-white/20 text-white"
                              : "bg-[#FAF8F5] dark:bg-[#121920] text-[#737C77] dark:text-[#8899A6] border border-[#E5DEC9] dark:border-[#2A3B4A]"
                          }`}
                        >
                          {item.badge}
                        </span>
                        <h4 className="font-bold text-xs sm:text-sm truncate">
                          {item.title}
                        </h4>
                      </div>

                      {item.subtitle && (
                        <p
                          className={`text-xs truncate ${
                            isSelected
                              ? "text-emerald-100/90"
                              : "text-[#59615D] dark:text-[#A0B0BC]"
                          }`}
                        >
                          {item.subtitle}
                        </p>
                      )}
                    </div>

                    <ArrowRight
                      className={`w-4 h-4 shrink-0 mt-2 transition-transform ${
                        isSelected
                          ? "translate-x-0.5 text-white"
                          : "text-slate-300 dark:text-slate-600"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          )}

          {/* 検索結果ゼロ */}
          {query && filteredResults.length === 0 && (
            <div className="py-12 text-center space-y-2">
              <Search className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto" />
              <p className="text-sm font-bold text-[#232826] dark:text-[#FAF8F5]">
                「{query}」に一致するコンテンツが見つかりませんでした
              </p>
              <p className="text-xs text-[#59615D] dark:text-[#A0B0BC]">
                ひらがな、漢字、または経穴コード（例: LI4, ST36）でお試しください。
              </p>
            </div>
          )}
        </div>

        {/* フッター操作ガイド */}
        <div className="px-4 py-2.5 border-t border-[#F2ECE0] dark:border-[#22303D] bg-[#F2EDE4]/60 dark:bg-[#121920] flex items-center justify-between text-[11px] text-[#737C77] dark:text-[#8899A6]">
          <div className="flex items-center gap-3">
            <span>↑↓ 選択</span>
            <span>↵ 決定</span>
            <span>ESC 閉じる</span>
          </div>
          <span>はり太郎 統合横断検索</span>
        </div>
      </div>
    </div>
  );
}

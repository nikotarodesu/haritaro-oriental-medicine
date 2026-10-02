"use client";

import { TOOL_CATALOG } from "@/config/toolCatalog";
import { useState } from "react";
import Link from "next/link";
import { 
  GraduationCap, 
  Stethoscope, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  BookOpen 
} from "lucide-react";

export default function HomeHeroDualEntry() {
  const [activeTab, setActiveTab] = useState<"learn" | "clinical">("learn");

  return (
    <div className="pt-2 max-w-5xl mx-auto space-y-4">
      {/* モバイル向けセグメント切替タブ（md以上では非表示） */}
      <div className="flex md:hidden p-1 rounded-2xl bg-[#EFE9DD]/80 dark:bg-[#15202B] border border-[#E5DEC9] dark:border-[#2A3B4A] max-w-sm mx-auto shadow-2xs">
        <button
          type="button"
          onClick={() => setActiveTab("learn")}
          className={`flex-1 min-h-11 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === "learn"
              ? "bg-[#1E2D3D] text-white shadow-xs"
              : "text-[#59615D] dark:text-[#A0B0BC] hover:text-[#1E2D3D]"
          }`}
        >
          <GraduationCap className="w-3.5 h-3.5" />
          <span>学生・基礎から学ぶ</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("clinical")}
          className={`flex-1 min-h-11 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === "clinical"
              ? "bg-[#1E3D34] text-white shadow-xs"
              : "text-[#59615D] dark:text-[#A0B0BC] hover:text-[#1E3D34]"
          }`}
        >
          <Stethoscope className="w-3.5 h-3.5" />
          <span>臨床で活かす・鍼灸師</span>
        </button>
      </div>

      {/* 2大入口カード（PC: 横並び2列、スマホ: タブ選択による表示） */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        {/* 入口1: 学び（学生・学び直したい方へ） */}
        <div
          className={`bg-white/95 dark:bg-[#17212A]/95 backdrop-blur-sm rounded-2xl border border-[#D5DFE8] dark:border-[#243545] p-5 sm:p-7 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group ${
            activeTab === "learn" ? "block" : "hidden md:flex"
          }`}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAEFF5] dark:bg-[#152331] text-[#1E2D3D] dark:text-[#7BAAD8] text-xs font-bold">
                <GraduationCap className="w-4 h-4" />
                <span>学生・学び直したい方へ</span>
              </div>
              <span className="text-xs text-[#737C77] dark:text-[#8899A6]">基礎から学ぶ</span>
            </div>

            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#232826] dark:text-[#FAF8F5] leading-snug">
                基礎を体系的に学び、国試に備える
              </h2>
            </div>

            <ul className="space-y-2 text-xs sm:text-sm text-[#404743] dark:text-[#C5D2DB]">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#1E2D3D] dark:text-[#7BAAD8] shrink-0 mt-0.5" />
                <span><strong className="text-[#232826] dark:text-[#FAF8F5]">全81講義カリキュラム:</strong> 陰陽五行・気血水・臓腑経絡を網羅</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#1E2D3D] dark:text-[#7BAAD8] shrink-0 mt-0.5" />
                <span><strong className="text-[#232826] dark:text-[#FAF8F5]">要穴・骨度寸法ドリル:</strong> 14経脈の取穴をクイズで定着</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#1E2D3D] dark:text-[#7BAAD8] shrink-0 mt-0.5" />
                <span><strong className="text-[#232826] dark:text-[#FAF8F5]">間隔復習・国試演習:</strong> {TOOL_CATALOG.kokushi.short}</span>
              </li>
            </ul>
          </div>

          <div className="pt-5 mt-4 border-t border-[#F2ECE0] dark:border-[#22303D] space-y-3">
            <Link
              href="/learn"
              className="w-full py-3 px-4 rounded-xl bg-[#1E2D3D] hover:bg-[#152331] dark:bg-[#7BAAD8] dark:hover:bg-[#90BDF0] text-white dark:text-[#121920] font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-sm transition-all"
            >
              <span>学びの総合案内を開く</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <Link
                href="/curriculum"
                className="py-2 px-3 rounded-lg bg-[#FAF8F5] dark:bg-[#121920] hover:bg-[#EAEFF5] dark:hover:bg-[#152331] text-[#1E2D3D] dark:text-[#7BAAD8] font-semibold text-center truncate transition-colors"
              >
                カリキュラム全8章
              </Link>
              <Link
                href="/kokushi"
                className="py-2 px-3 rounded-lg bg-[#FAF8F5] dark:bg-[#121920] hover:bg-[#FCF4EB] dark:hover:bg-[#281E15] text-[#B86924] dark:text-[#E6C387] font-semibold text-center truncate transition-colors"
              >
                国試演習ハブ
              </Link>
            </div>

            <div className="pt-1 text-center">
              <Link
                href="/simulator"
                className="text-[11px] font-semibold text-[#59615D] dark:text-[#A0B0BC] hover:text-[#1E2D3D] dark:hover:text-[#7BAAD8] transition-colors inline-flex items-center gap-1 group"
              >
                <Sparkles className="w-3 h-3 text-[#B86924] dark:text-[#E6C387]" />
                <span>学んだ理論を試す：弁証シミュレーターへ</span>
                <span className="group-hover:translate-x-0.5 transition-transform">→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* 入口2: 実践（鍼灸師の方へ） */}
        <div
          className={`bg-white/95 dark:bg-[#17212A]/95 backdrop-blur-sm rounded-2xl border border-[#CCE2D8] dark:border-[#224035] p-5 sm:p-7 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group ${
            activeTab === "clinical" ? "block" : "hidden md:flex"
          }`}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] text-xs font-bold">
                <Stethoscope className="w-4 h-4" />
                <span>鍼灸師の方へ</span>
              </div>
              <span className="text-xs text-[#737C77] dark:text-[#8899A6]">臨床で活かす</span>
            </div>

            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#232826] dark:text-[#FAF8F5] leading-snug">
                調べる・問診する・臨床に残す
              </h2>
            </div>

            <ul className="space-y-2 text-xs sm:text-sm text-[#404743] dark:text-[#C5D2DB]">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E] shrink-0 mt-0.5" />
                <span><strong className="text-[#232826] dark:text-[#FAF8F5]">対面問診＆患者説明:</strong> 愁訴・体質所見から病態を即座に整理</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E] shrink-0 mt-0.5" />
                <span><strong className="text-[#232826] dark:text-[#FAF8F5]">3段階 弁証推論:</strong> 八綱・気血水・臓腑から本治標治を設計</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E] shrink-0 mt-0.5" />
                <span><strong className="text-[#232826] dark:text-[#FAF8F5]">臨床カルテ蓄積:</strong> 施術後の変化を記録・A4養生シート印刷</span>
              </li>
            </ul>
          </div>

          <div className="pt-5 mt-4 border-t border-[#F2ECE0] dark:border-[#22303D] space-y-3">
            <Link
              href="/clinical"
              className="w-full py-3 px-4 rounded-xl bg-[#1E3D34] hover:bg-[#2B5A46] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-sm transition-all"
            >
              <span>臨床ツールの使い方・案内を見る</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="grid grid-cols-3 gap-1.5 text-xs">
              <Link
                href="/diagnosis?tab=clinical"
                className="py-2 px-2 rounded-lg bg-[#FAF8F5] dark:bg-[#121920] hover:bg-[#EBF3EF] dark:hover:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] font-semibold text-center truncate transition-colors"
              >
                対面問診
              </Link>
              <Link
                href="/simulator"
                className="py-2 px-2 rounded-lg bg-[#FAF8F5] dark:bg-[#121920] hover:bg-[#EBF3EF] dark:hover:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] font-semibold text-center truncate transition-colors"
              >
                弁証推論
              </Link>
              <Link
                href="/notes"
                className="py-2 px-2 rounded-lg bg-[#FAF8F5] dark:bg-[#121920] hover:bg-[#FCF4EB] dark:hover:bg-[#281E15] text-[#B86924] dark:text-[#E6C387] font-semibold text-center truncate transition-colors"
              >
                臨床ノート
              </Link>
            </div>

            <div className="pt-1 text-center">
              <Link
                href="/curriculum"
                className="text-[11px] font-semibold text-[#59615D] dark:text-[#A0B0BC] hover:text-[#1E3D34] dark:hover:text-[#74BA9E] transition-colors inline-flex items-center gap-1 group"
              >
                <BookOpen className="w-3 h-3 text-[#1E3D34] dark:text-[#74BA9E]" />
                <span>迷った時の立ち戻り：基礎理論カリキュラム全81講義へ</span>
                <span className="group-hover:translate-x-0.5 transition-transform">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import { Layers, Sparkles, ArrowRight, BookOpen, AlertCircle } from "lucide-react";
import ProgressiveCaseTraining from "@/components/learning/ProgressiveCaseTraining";
import ThreeStageSimulator from "@/components/ThreeStageSimulator";
import type { ArticlePreview } from "@/data/articleData";

export default function SimulatorHub({ relatedArticles }: { relatedArticles: ArticlePreview[] }) {
  return (
    <div className="space-y-8 sm:space-y-12">
      {/* ツール見出し */}
      <div className="text-center space-y-3 sm:space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF3EF] dark:bg-[#182823] border border-[#C5DED4] dark:border-[#2A5243] text-[#1E3D34] dark:text-[#74BA9E] text-xs font-semibold tracking-wider">
          <Layers className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
          <span>八綱 ➜ 気血水 ➜ 臓腑経絡 3段階連動</span>
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5] tracking-tight leading-tight">
          臨床弁証シミュレーター
        </h1>

        <p className="text-sm sm:text-base text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
          八綱（深浅・勢い） ➜ 気血水（動態） ➜ 臓腑経絡（局在病位）を段階的に選択することで、
          複雑な病態から<strong className="text-[#1E3D34] dark:text-[#74BA9E]">「一文の証」</strong>を抽出し、
          採用条件を比較する<strong className="text-[#1E3D34] dark:text-[#74BA9E]">「配穴の学習例」</strong>を表示します。確認した所見・矛盾・不足情報を分けて学べます。
        </p>

        {/* このツールでできること（3ステップ）＆ こんな人におすすめ */}
        <div className="bg-white dark:bg-[#152028] rounded-2xl sm:rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-4 sm:p-6 shadow-xs space-y-4 max-w-4xl mx-auto text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F2ECE0] dark:border-[#22303D] pb-3">
            <span className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] flex items-center gap-1.5 uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-[#B86924] dark:text-[#E6C387]" />
              <span>このツールでできること（3ステップ）</span>
            </span>
            <span className="text-xs text-[#59615D] dark:text-[#A0B0BC] bg-[#FAF8F5] dark:bg-[#10171F] px-2.5 py-1 rounded-full border border-[#E8E1D1] dark:border-[#22303D] font-medium">
              🎯 こんな人におすすめ：鍼灸学生の国試・臨床実習対策／臨床家の配穴処方見直し
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-[#FAF8F5] dark:bg-[#10171F] border border-[#E8E1D1] dark:border-[#22303D] space-y-1">
              <div className="flex items-center gap-2 font-bold text-[#232826] dark:text-[#FAF8F5]">
                <span className="w-5 h-5 rounded-full bg-[#1E3D34] text-white flex items-center justify-center text-xs font-mono">1</span>
                <span>証の選択</span>
              </div>
              <p className="text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                八綱（表裏・寒熱・虚実）と気血水、臓腑経絡の病態条件を直感的に選択。
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#FAF8F5] dark:bg-[#10171F] border border-[#E8E1D1] dark:border-[#22303D] space-y-1">
              <div className="flex items-center gap-2 font-bold text-[#232826] dark:text-[#FAF8F5]">
                <span className="w-5 h-5 rounded-full bg-[#B86924] text-white flex items-center justify-center text-xs font-mono">2</span>
                <span>病態推論の可視化</span>
              </div>
              <p className="text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                選択した組み合わせから「一文の証名」「治法（治療原則）」を即座に導出。
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#FAF8F5] dark:bg-[#10171F] border border-[#E8E1D1] dark:border-[#22303D] space-y-1">
              <div className="flex items-center gap-2 font-bold text-[#232826] dark:text-[#FAF8F5]">
                <span className="w-5 h-5 rounded-full bg-[#2B6958] text-white flex items-center justify-center text-xs font-mono">3</span>
                <span>経穴選定の確認</span>
              </div>
              <p className="text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                配穴例と、採用条件・伝統理論と研究の違いを確認・学習ノートへ保存。
              </p>
            </div>
          </div>
        </div>
      </div>

      <ProgressiveCaseTraining />

      {/* 臨床弁証シミュレーター本体 */}
      <ThreeStageSimulator />

      {/* 関連リンクフッター案内 */}
      <div className="bg-[#FAF8F5] dark:bg-[#152028] rounded-2xl sm:rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-3.5 sm:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold text-[#B86924] dark:text-[#E6C387] uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              伝統理論と現代研究の関係を学ぶ
            </span>
            <h4 className="font-serif font-bold text-base sm:text-lg text-[#232826] dark:text-[#FAF8F5]">
              八綱・気血水・臓腑経絡の学習と現代研究
            </h4>
            <p className="text-xs text-[#59615D] dark:text-[#96A6B2] max-w-2xl">
              伝統医学の分類と現代科学の概念を比較する解説です。対応関係は教育上の整理であり、生理学的な同一性の証明ではありません。
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0 sm:max-w-sm">
            {relatedArticles.map(article => (
              <Link
                key={article.id}
                href={`/articles/${article.id}`}
                className="inline-flex max-w-full items-center gap-1.5 text-left text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] bg-[#EBF3EF] dark:bg-[#1A2E26] hover:bg-[#D8EADB] dark:hover:bg-[#234237] px-3.5 py-2 rounded-xl transition-all"
              >
                <BookOpen className="w-3.5 h-3.5 shrink-0" />
                <span>{article.title}</span>
                <ArrowRight className="w-3.5 h-3.5 shrink-0" />
              </Link>
            ))}
          </div>
        </div>

        {/* 臨床学習・医師法に関する免責事項 */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF8F5] dark:bg-[#152028] border border-[#E5DEC9] dark:border-[#2A3B4A] flex items-start gap-3 text-xs text-[#59615D] dark:text-[#96A6B2]">
          <AlertCircle className="w-4 h-4 text-[#B86924] dark:text-[#E6C387] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-bold text-[#232826] dark:text-[#FAF8F5]">
              【学習・臨床推論シミュレーションに関する免責事項】
            </p>
            <p className="leading-relaxed">
              本シミュレーターは鍼灸師・臨床家および学生の弁証推論（八綱・気血水・臓腑経絡の体系的理解）学習を支援するための教育ツールです。個別の患者に対する確定診断や医療行為（医行為）を提供するものではありません。実際の臨床・施術にあたっては、施術者自身の専門的判断および関係法規（医師法、あはき法等）を遵守してください。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  FileText, 
  Crown, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  BookOpen,
  HelpCircle,
  GraduationCap
} from "lucide-react";
import { CLINICAL_CASES } from "@/data/clinicalCasesData";
import { useAuth } from "@/contexts/AuthContext";
import AuthModal from "@/components/auth/AuthModal";

export default function CasesIndexPage() {
  const { isPremium } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [selectedCaseTitle, setSelectedCaseTitle] = useState("");

  const handleCaseClick = (e: React.MouseEvent, c: typeof CLINICAL_CASES[0]) => {
    if (!c.isFreeTrial && !isPremium) {
      e.preventDefault();
      setSelectedCaseTitle(c.title);
      setAuthModalOpen(true);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8 sm:space-y-12">
      {/* パンくずリスト */}
      <nav className="flex items-center gap-2 text-xs text-[#737C77] dark:text-[#8899A6]">
        <Link href="/" className="hover:text-[#1E3D34] dark:hover:text-[#74BA9E]">ホーム</Link>
        <span>/</span>
        <span className="text-[#232826] dark:text-[#FAF8F5] font-semibold">臨床症例演習</span>
      </nav>

      {/* ヒーローヘッダー */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FCF4EB] dark:bg-[#2A2016] border border-[#F3DEC5] dark:border-[#4D331F] text-[#B86924] dark:text-[#E6C387] text-xs font-semibold tracking-wider">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>全20症例・段階的臨床推論トレーニング</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5] tracking-tight leading-tight">
          臨床症例演習モード
        </h1>

        <p className="text-sm sm:text-base text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
          机上の理論から臨床現場の思考へ。主訴・現病歴から四診情報を段階的に開示し、
          八綱 ➜ 弁証 ➜ 治法 ➜ 配穴処方を自分の頭で導き出します。
          全症例に鑑別診断・作用機序・古典根拠の解説付き。
        </p>

        {/* 無料体験案内バナー */}
        <div className="pt-2 flex items-center justify-center gap-3 text-xs">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] font-bold border border-[#C5DED4] dark:border-[#2A5243]">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>症例 1〜3 は無料で体験可能</span>
          </span>
        </div>
      </div>

      {/* 臨床弁証シミュレーターへの特別リンクバナー */}
      <div className="bg-gradient-to-br from-[#1E2D3D] via-[#16222E] to-[#0E1720] dark:from-[#141E28] dark:via-[#0F161E] dark:to-[#080D12] text-white p-5 sm:p-7 rounded-3xl border border-[#2B4055] dark:border-[#223344] shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-5 relative overflow-hidden">
        <div className="space-y-1.5 z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#74BA9E]/20 text-[#74BA9E] text-xs font-bold border border-[#74BA9E]/30">
            <Layers className="w-3.5 h-3.5" />
            <span>対話型・臨床推論エンジン</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#FAF8F5]">
            臨床弁証シミュレーター
          </h2>
          <p className="text-xs sm:text-sm text-[#C5D2DB] leading-relaxed">
            患者の主訴・四診所見を選択することで、リアルタイムに八綱座標・臓腑失調度を解析し、最適な治療方針と推奨配穴を算出・可視化します。
          </p>
        </div>

        <Link
          href="/simulator"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#1E3D34] hover:bg-[#2B6958] text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all z-10 shrink-0 border border-[#74BA9E]/30 group cursor-pointer"
        >
          <span>シミュレーターを起動する</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* 症例一覧グリッド */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-[#737C77] dark:text-[#8899A6] px-1">
          <span className="font-bold text-[#232826] dark:text-[#FAF8F5]">
            全20症例一覧（症例01〜03は無料体験可能）
          </span>
          <span>全 {CLINICAL_CASES.length} 症例</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CLINICAL_CASES.map((c) => (
            <Link
              key={c.id}
              href={`/cases/${c.id}`}
              onClick={(e) => handleCaseClick(e, c)}
              className={`group rounded-3xl bg-[#FAF8F5] dark:bg-[#152028] border-2 p-5 sm:p-6 flex flex-col justify-between space-y-4 transition-all hover:shadow-lg ${
                c.isFreeTrial 
                  ? "border-[#1E3D34]/30 hover:border-[#1E3D34] dark:border-[#2A5243] dark:hover:border-[#74BA9E]" 
                  : isPremium 
                    ? "border-[#B86924]/30 hover:border-[#B86924] dark:border-[#4D331F] dark:hover:border-[#E6C387]"
                    : "border-[#E5DEC9] dark:border-[#2A3B4A] opacity-90 hover:opacity-100"
              }`}
            >
              <div className="space-y-3">
                {/* ヘッダーバッジ */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#737C77] dark:text-[#8899A6]">
                      症例 {c.caseNumber < 10 ? `0${c.caseNumber}` : c.caseNumber}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      c.difficulty === "初級" 
                        ? "bg-green-100 text-green-800 dark:bg-green-950/50 dark:text-green-300"
                        : c.difficulty === "中級"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-950/50 dark:text-yellow-300"
                          : "bg-red-100 text-red-800 dark:bg-red-950/50 dark:text-red-300"
                    }`}>
                      {c.difficulty}
                    </span>
                  </div>

                  {c.isFreeTrial ? (
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#EBF3EF] text-[#1E3D34] dark:bg-[#182823] dark:text-[#74BA9E] border border-[#C5DED4] dark:border-[#2A5243] flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      <span>無料体験</span>
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#FCF4EB] text-[#B86924] dark:bg-[#2A2016] dark:text-[#E6C387] border border-[#F3DEC5] dark:border-[#4D331F] flex items-center gap-1">
                      <Crown className="w-3 h-3" />
                      <span>プレミアム</span>
                    </span>
                  )}
                </div>

                {/* 領域タグ */}
                <span className="inline-block text-[11px] font-semibold text-[#B86924] dark:text-[#E6C387]">
                  {c.category}
                </span>

                {/* タイトル */}
                <h3 className="font-serif text-lg font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] transition-colors leading-snug">
                  {c.title}
                </h3>

                {/* 主訴プレビュー */}
                <p className="text-xs text-[#59615D] dark:text-[#96A6B2] line-clamp-2 leading-relaxed">
                  「{c.patient.chiefComplaint}」
                </p>
              </div>

              {/* フッター情報 */}
              <div className="border-t border-[#E8E1D1] dark:border-[#22303D] pt-3.5 flex items-center justify-between text-xs">
                <span className="text-[#737C77] dark:text-[#8899A6]">
                  {c.patient.age}・{c.patient.gender}
                </span>
                <span className="font-bold text-[#1E3D34] dark:text-[#74BA9E] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>演習を始める</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* プレミアム誘導モーダル */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        title="この症例はプレミアム会員限定です"
        description={`「${selectedCaseTitle}」を含む17の専門症例の段階的四診開示、推論演習、解説・古典根拠はプレミアム会員限定コンテンツです。`}
      />
    </div>
  );
}

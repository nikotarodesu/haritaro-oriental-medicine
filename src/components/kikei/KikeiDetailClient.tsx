"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  GitCommit, 
  ArrowLeft, 
  Bookmark, 
  Check, 
  Share2, 
  Layers, 
  BookOpen, 
  Compass, 
  HelpCircle,
  ExternalLink,
  ChevronRight,
  Crown,
  Lock,
  Sparkles
} from "lucide-react";
import { KikeiVessel, HACHIMYAKU_PAIRS } from "@/data/kikeiData";
import { useClinicalMemo } from "@/contexts/ClinicalMemoContext";
import { useAuth } from "@/contexts/AuthContext";
import AuthModal from "@/components/auth/AuthModal";
import KikeiPathwaySvg from "@/components/kikei/KikeiPathwaySvg";
import KikeiQuizSection from "@/components/kikei/KikeiQuizSection";

interface Props {
  vessel: KikeiVessel;
}

export default function KikeiDetailClient({ vessel }: Props) {
  const { isPremium } = useAuth();
  const { addMemo } = useClinicalMemo();
  const [saved, setSaved] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  // 督脈・任脈は無料体験可能、他6脈はプレミアム限定
  const isFreeTrial = vessel.slug === "toku" || vessel.slug === "nin";
  const isLocked = !isFreeTrial && !isPremium;

  // この脈が関連する八脈交会穴ペア
  const relatedPair = HACHIMYAKU_PAIRS.find(
    p => p.master1.vessel === vessel.name || p.master2.vessel === vessel.name
  );

  const handleSaveToMemo = () => {
    if (!isPremium) {
      setAuthModalOpen(true);
      return;
    }
    addMemo({
      id: `kikei-${vessel.slug}`,
      type: "pair",
      title: `【奇経】${vessel.name}（${vessel.masterPoint.name}）`,
      subTitle: `${vessel.category} / 通穴: ${vessel.masterPoint.name} (${vessel.masterPoint.code})`,
      points: [vessel.masterPoint.name, vessel.couplePoint.name],
      elements: [vessel.category === "陽奇経" ? "火" : "水"],
      indications: vessel.indications.slice(0, 4),
      summary: vessel.clinicalTips,
      mechanism: vessel.nature,
      personalNotes: `八脈交会穴: ${vessel.pairName}（適応: ${vessel.pairTargetArea}）`,
    });
    setSaved(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#10161C] text-[#232826] dark:text-[#FAF8F5]">
      {/* ナビゲーションバー */}
      <div className="bg-white dark:bg-[#17212A] border-b border-[#E5DEC9] dark:border-[#2A3B4A] sticky top-0 z-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <Link
            href="/kikei"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#737C77] dark:text-[#8899A6] hover:text-[#232826] dark:hover:text-[#FAF8F5] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>奇経八脈一覧へ</span>
          </Link>

          <button
            onClick={handleSaveToMemo}
            disabled={saved}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FCF4EB] dark:bg-[#2A1E14] border border-[#F3DEC5] dark:border-[#4A321E] text-xs font-bold text-[#B86924] dark:text-[#E6C387] hover:bg-[#FBE8D3] transition-colors"
          >
            <Bookmark className={`w-3.5 h-3.5 ${saved ? "fill-current" : ""}`} />
            <span>{saved ? "学習ノートに保存済" : "学習ノートに保存"}</span>
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
        
        {/* タイトルヘッダー */}
        <div className="bg-white dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${
              vessel.category === "陽奇経"
                ? "bg-[#FCF4EB] text-[#B86924] dark:bg-[#2A1E14] dark:text-[#E6C387]"
                : "bg-[#EBF3EF] text-[#1E3D34] dark:bg-[#182823] dark:text-[#74BA9E]"
            }`}>
              {vessel.category}
            </span>
            {vessel.pointsCount && (
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#FAF8F5] dark:bg-[#151D25] text-[#737C77] dark:text-[#8899A6] border border-[#E5DEC9] dark:border-[#2A3B4A]">
                経穴数: {vessel.pointsCount}穴
              </span>
            )}
          </div>

          <div className="space-y-1">
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#232826] dark:text-[#FAF8F5]">
              {vessel.name} <span className="text-lg font-normal text-[#737C77] dark:text-[#8899A6]">（{vessel.reading}）</span>
            </h1>
            <p className="text-sm sm:text-base text-[#59615D] dark:text-[#96A6B2] leading-relaxed pt-2">
              {vessel.nature}
            </p>
          </div>

          {/* 八脈交会穴ハイライトボックス */}
          <div className="bg-[#FAF8F5] dark:bg-[#121920] rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-4 sm:p-5 mt-4">
            <div className="flex items-center gap-2 mb-2">
              <Compass className="w-4 h-4 text-[#B86924]" />
              <span className="text-xs font-bold text-[#B86924] dark:text-[#E6C387] uppercase tracking-wider">
                八脈交会穴（通穴）
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-white dark:bg-[#17212A] p-3 rounded-lg border border-[#E5DEC9] dark:border-[#2A3B4A]">
                <span className="text-[10px] text-[#737C77] block">本脈に通ずる穴（主穴）</span>
                <span className="text-base font-bold text-[#1E3D34] dark:text-[#74BA9E]">{vessel.masterPoint.name}</span>
                <span className="text-xs text-[#737C77] ml-1">({vessel.masterPoint.meridian} / {vessel.masterPoint.code})</span>
              </div>
              <div className="bg-white dark:bg-[#17212A] p-3 rounded-lg border border-[#E5DEC9] dark:border-[#2A3B4A]">
                <span className="text-[10px] text-[#737C77] block">対となる交会穴（配穴）</span>
                <span className="text-base font-bold text-[#B86924] dark:text-[#E6C387]">{vessel.couplePoint.name}</span>
                <span className="text-xs text-[#737C77] ml-1">({vessel.couplePoint.meridian} / {vessel.couplePoint.code})</span>
              </div>
            </div>
            <p className="text-xs text-[#59615D] dark:text-[#96A6B2] mt-3">
              <strong>ペア名:</strong> {vessel.pairName}（適応領域: <strong>{vessel.pairTargetArea}</strong>）
            </p>
          </div>
        </div>

        {/* プレミアムロック時のプレビュー遮断 */}
        {isLocked ? (
          <div className="relative rounded-3xl bg-[#FAF8F5] dark:bg-[#152028] border-2 border-[#B86924] dark:border-[#E6C387] p-8 sm:p-12 text-center space-y-6 shadow-xl overflow-hidden">
            <div className="w-16 h-16 rounded-3xl bg-[#FCF4EB] dark:bg-[#2A2016] text-[#B86924] dark:text-[#E6C387] flex items-center justify-center mx-auto shadow-inner">
              <Lock className="w-8 h-8" />
            </div>

            <div className="space-y-2 max-w-lg mx-auto">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FCF4EB] dark:bg-[#2A2016] text-[#B86924] dark:text-[#E6C387] text-xs font-bold border border-[#F3DEC5] dark:border-[#4D331F] mb-1">
                <Crown className="w-3.5 h-3.5" />
                <span>プレミアム限定 奇経八脈（全8脈）</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5]">
                {vessel.name} の流注SVG図・臨床演習はプレミアム限定です
              </h2>
              <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#96A6B2] leading-relaxed">
                流注循行のSVGダイアグラム、詳細な走行ステップ、主治病証・臨床要点、古典条文詳説、および八脈交会穴の臨床演習チェックはプレミアムプランへの加入で即座に解放されます。督脈・任脈は無料でお試しいただけます。
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setAuthModalOpen(true)}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#1E3D34] to-[#2B6958] text-white font-bold text-sm shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Crown className="w-4 h-4 text-[#E6C387]" />
                <span>プレミアム会員に登録して解放する</span>
              </button>
              <Link
                href="/kikei/toku"
                className="w-full sm:w-auto px-5 py-3 rounded-xl border border-[#D8CFC0] dark:border-[#384C5E] text-xs font-bold text-[#404743] dark:text-[#C5D2DB] hover:bg-[#F2EDE2]"
              >
                無料体験：督脈の流注図・演習を試す
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* 流注SVGダイアグラム */}
            <KikeiPathwaySvg vessel={vessel} />

            {/* 流注・走行ルート */}
            <div className="bg-white dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex items-center gap-2 border-b border-[#E5DEC9] dark:border-[#2A3B4A] pb-3">
                <GitCommit className="w-5 h-5 text-[#1E3D34] dark:text-[#74BA9E]" />
                <h2 className="font-serif text-xl font-bold text-[#232826] dark:text-[#FAF8F5]">
                  流注・循行経路
                </h2>
              </div>

              <div className="space-y-3 pt-2">
                {vessel.pathway.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#FCF4EB] dark:bg-[#2A1E14] text-[#B86924] dark:text-[#E6C387] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="text-xs sm:text-sm text-[#404743] dark:text-[#C5D2DB] leading-relaxed">
                      {step}
                    </p>
                  </div>
                ))}
              </div>

              {vessel.pointsList && vessel.pointsList.length > 0 && (
                <div className="pt-4 border-t border-[#E5DEC9] dark:border-[#2A3B4A] space-y-2">
                  <span className="text-xs font-bold text-[#737C77] dark:text-[#8899A6] block">
                    主な交会・通過経穴:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {vessel.pointsList.map((pt, i) => (
                      <span
                        key={i}
                        className="text-xs px-2.5 py-1 rounded-lg bg-[#FAF8F5] dark:bg-[#151D25] text-[#232826] dark:text-[#FAF8F5] border border-[#E5DEC9] dark:border-[#2A3B4A]"
                      >
                        {pt}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 主治病証 ＆ 臨床の勘所 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 主治病証 */}
              <div className="bg-white dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 shadow-sm space-y-4">
                <h3 className="font-serif text-lg font-bold text-[#232826] dark:text-[#FAF8F5] border-b border-[#E5DEC9] dark:border-[#2A3B4A] pb-3">
                  主治病証（適応症状）
                </h3>
                <ul className="space-y-2.5 text-xs sm:text-sm text-[#59615D] dark:text-[#96A6B2]">
                  {vessel.indications.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B86924] shrink-0 mt-2" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 臨床要点 */}
              <div className="bg-white dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 shadow-sm space-y-4">
                <h3 className="font-serif text-lg font-bold text-[#232826] dark:text-[#FAF8F5] border-b border-[#E5DEC9] dark:border-[#2A3B4A] pb-3">
                  臨床要点・配穴の勘所
                </h3>
                <p className="text-xs sm:text-sm text-[#404743] dark:text-[#C5D2DB] leading-relaxed">
                  {vessel.clinicalTips}
                </p>
              </div>
            </div>

            {/* 古典条文（難経・素問） */}
            <div className="bg-[#FAF8F5] dark:bg-[#151D25] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#B86924]" />
                <h3 className="font-serif text-base sm:text-lg font-bold text-[#232826] dark:text-[#FAF8F5]">
                  古典条文：『{vessel.classicQuote.book}』{vessel.classicQuote.chapter}
                </h3>
              </div>

              <div className="bg-white dark:bg-[#11171E] p-4 sm:p-5 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-3">
                <p className="font-serif text-sm sm:text-base font-bold text-[#232826] dark:text-[#FAF8F5] leading-relaxed tracking-wide">
                  {vessel.classicQuote.text}
                </p>
                <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#96A6B2] leading-relaxed pt-2 border-t border-[#E5DEC9]/60 dark:border-[#2A3B4A]/60">
                  <strong>現代語訳:</strong> {vessel.classicQuote.translation}
                </p>
              </div>
            </div>

            {/* 八脈交会穴 臨床演習チェック */}
            <KikeiQuizSection vessel={vessel} />
          </>
        )}

      </div>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        title={`${vessel.name}（奇経八脈）完全解放`}
        description="奇経八脈（全8脈）の流注SVG図、八脈交会穴の配穴詳説、古典解説、および臨床演習問題はプレミアム会員限定機能です。"
      />
    </div>
  );
}

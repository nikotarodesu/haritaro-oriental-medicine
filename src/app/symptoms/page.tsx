"use client";

import { useState } from "react";
import Link from "next/link";
import { SYMPTOMS } from "@/data/symptomData";
import { TSUBOS } from "@/data/tsuboData";
import { HeartPulse, Utensils, Activity, ArrowRight, Sparkles, CheckCircle2, Stethoscope, ChevronDown, ChevronUp, Layers } from "lucide-react";
import EastWestIntegrativeSwitch from "@/components/EastWestIntegrativeSwitch";

export default function SymptomsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("すべて");
  const [expandedMatrixId, setExpandedMatrixId] = useState<string | null>(null);

  const categories = [
    "すべて",
    "頭・首・肩",
    "メンタル・睡眠",
    "消化器・お腹",
    "女性特有",
    "全身・疲労"
  ];

  const caseMap: Record<string, string> = {
    "stomach-fatigue": "gerd-gastric",
    "headache-stiff-neck": "headache-migraine",
    "stress-insomnia": "insomnia-autonomic"
  };

  const filteredSymptoms = selectedCategory === "すべて"
    ? SYMPTOMS
    : SYMPTOMS.filter((s) => s.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* ページヘッダー */}
      <div className="border-b border-[#E8E1D1] dark:border-[#22303D] pb-8">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#B86924] dark:text-[#E6C387] tracking-widest uppercase mb-2">
          <HeartPulse className="w-4 h-4" />
          <span>Symptom & Self-Care Guide</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5] tracking-tight">
          お悩み・症状別 セルフケアガイド
        </h1>
        <p className="mt-2 text-sm text-[#59615D] dark:text-[#A0B0BC] max-w-3xl leading-relaxed">
          「病院に行くほどではないけれどつらい」「なんとなく調子が悪い」といった未病の不調。東洋医学の観点から根本的な原因を解き明かし、自分でできるツボ押しや食養生、生活改善法をお伝えします。
        </p>
      </div>

      {/* カテゴリ切り替えタブ */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#E8E1D1] dark:border-[#22303D] pb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
              selectedCategory === cat
                ? "bg-[#1E3D34] dark:bg-[#2B6958] text-[#FAF8F5] shadow-sm"
                : "bg-[#FFFFFF] dark:bg-[#17212A] text-[#59615D] dark:text-[#A0B0BC] border border-[#E5DEC9] dark:border-[#2A3B4A] hover:bg-[#FAF8F5] dark:hover:bg-[#1E2B36]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 症状一覧カード */}
      <div className="space-y-8">
        {filteredSymptoms.map((symptom) => {
          const relatedTsubos = TSUBOS.filter((t) => symptom.recommendedTsuboIds.includes(t.id));

          return (
            <div
              key={symptom.id}
              className="bg-[#FFFFFF] dark:bg-[#17212A] rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-9 shadow-sm hover:border-[#1E3D34] dark:hover:border-[#4E8C76] transition-all space-y-6"
            >
              {/* タイトルとカテゴリ */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F2ECE0] dark:border-[#22303D] pb-4">
                <div>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-[#FCF4EB] dark:bg-[#2A2117] text-[#B86924] dark:text-[#E6C387] border border-[#F3E1CB] dark:border-[#423321]">
                    {symptom.category}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5] mt-2">
                    {symptom.title}
                  </h2>
                </div>
              </div>

              {/* 概要と東洋医学的メカニズム */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <span className="text-xs font-bold text-[#59615D] dark:text-[#96A6B2] block">症状の現れ方</span>
                  <p className="text-sm text-[#404743] dark:text-[#C5D2DB] leading-relaxed">{symptom.summary}</p>
                </div>

                <div className="bg-[#FAF8F5] dark:bg-[#121920] p-4 sm:p-5 rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                    <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
                    <span>東洋医学での見立て（なぜ起こるのか？）</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#232826] dark:text-[#E6EFEA] leading-relaxed">
                    {symptom.orientalMechanism}
                  </p>
                </div>
              </div>

              {/* おすすめのツボ */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider block">
                  📍 おすすめの特効穴（ツボ）
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {relatedTsubos.map((tsubo) => (
                    <div
                      key={tsubo.id}
                      className="bg-[#FAF8F5] dark:bg-[#121920] p-4 rounded-xl border border-[#E5DEC9] dark:border-[#22303D] flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between text-xs text-[#737C77] dark:text-[#8899A6] mb-1">
                          <span className="font-mono font-bold text-[#1E3D34] dark:text-[#83BEA8]">{tsubo.code}</span>
                          <span>{tsubo.meridianShort}</span>
                        </div>
                        <h3 className="font-serif text-lg font-bold text-[#232826] dark:text-[#FAF8F5]">
                          {tsubo.name} <span className="text-xs font-normal text-[#59615D] dark:text-[#96A6B2]">（{tsubo.kana}）</span>
                        </h3>
                        <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] mt-2 leading-relaxed">
                          {tsubo.locationSimple}
                        </p>
                      </div>
                      <div className="mt-3 pt-2 border-t border-[#EAE3D4] dark:border-[#22303D]">
                        <Link
                          href={`/tsubo`}
                          className="text-xs font-semibold text-[#1E3D34] dark:text-[#74BA9E] hover:underline flex items-center gap-1"
                        >
                          <span>詳細を見る</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 日常セルフケア（食養生 & 生活習慣） */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-[#FCF4EB]/70 dark:bg-[#231A12]/80 p-4 rounded-xl border border-[#F3E1CB] dark:border-[#423321] space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#B86924] dark:text-[#E6C387]">
                    <Utensils className="w-4 h-4" />
                    <span>おすすめ食養生</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#404743] dark:text-[#D1C6BA] leading-relaxed">
                    {symptom.lifestyleAdvice.diet}
                  </p>
                </div>

                <div className="bg-[#EBF3EF]/70 dark:bg-[#14231E]/80 p-4 rounded-xl border border-[#C5DED4] dark:border-[#234237] space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                    <Activity className="w-4 h-4" />
                    <span>おすすめ生活習慣・ストレッチ</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#404743] dark:text-[#BACDD1] leading-relaxed">
                    {symptom.lifestyleAdvice.habit}
                  </p>
                </div>
              </div>

              {/* 東西医学の「相補マトリクス」切り替えスイッチ */}
              <div className="pt-2 border-t border-[#F2ECE0] dark:border-[#22303D]">
                <button
                  onClick={() => setExpandedMatrixId(expandedMatrixId === symptom.id ? null : symptom.id)}
                  className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#22303D] hover:bg-[#F4EFE6] dark:hover:bg-[#1A2530] transition-colors text-left"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-[#1E3D34] text-white flex items-center justify-center shrink-0">
                      <Layers className="w-4 h-4 text-[#E6C387]" />
                    </span>
                    <span className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5]">
                      東西医学の「相補マトリクス」視点をチェック
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-[#1E3D34] dark:text-[#74BA9E] flex items-center gap-1 shrink-0">
                    <span>{expandedMatrixId === symptom.id ? "閉じる" : "スイッチを開く"}</span>
                    {expandedMatrixId === symptom.id ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </button>

                {expandedMatrixId === symptom.id && (
                  <div className="mt-4 animate-fadeIn">
                    <EastWestIntegrativeSwitch 
                      initialCaseId={caseMap[symptom.id] || "gerd-gastric"} 
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

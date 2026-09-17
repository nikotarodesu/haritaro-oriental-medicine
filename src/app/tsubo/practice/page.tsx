"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { getAllAcupoints, AcupointMaster } from "@/data/tsubo";
import { 
  BookOpen, 
  CheckCircle2, 
  HelpCircle, 
  RotateCcw, 
  ArrowRight, 
  Sparkles, 
  Eye, 
  EyeOff, 
  Bookmark,
  Shuffle
} from "lucide-react";

export default function PracticePage() {
  const allPoints = useMemo(() => getAllAcupoints(), []);
  
  // フィルター
  const [selectedMeridian, setSelectedMeridian] = useState<string>("すべて");
  const [filterType, setFilterType] = useState<"all" | "fiveShu" | "yuanLuoXi">("all");

  const pool = useMemo(() => {
    return allPoints.filter((p) => {
      if (selectedMeridian !== "すべて" && p.meridianShort !== selectedMeridian) return false;
      if (filterType === "fiveShu") {
        return p.categories.some((c) => c.includes("穴") && (c.includes("井") || c.includes("滎") || c.includes("輸") || c.includes("経") || c.includes("合")));
      }
      if (filterType === "yuanLuoXi") {
        return p.categories.some((c) => c.includes("原穴") || c.includes("絡穴") || c.includes("郄穴"));
      }
      return true;
    });
  }, [allPoints, selectedMeridian, filterType]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  const [quizScore, setQuizScore] = useState({ correct: 0, reviewed: 0 });
  const [needsReviewList, setNeedsReviewList] = useState<string[]>([]);

  const currentPoint = pool[currentIndex] || pool[0];

  const handleNext = (answeredCorrect: boolean) => {
    setQuizScore((prev) => ({
      correct: prev.correct + (answeredCorrect ? 1 : 0),
      reviewed: prev.reviewed + 1,
    }));

    if (!answeredCorrect && currentPoint) {
      if (!needsReviewList.includes(currentPoint.code)) {
        setNeedsReviewList((prev) => [...prev, currentPoint.code]);
      }
    }

    setIsAnswerRevealed(false);
    setCurrentIndex((prev) => (prev + 1) % pool.length);
  };

  const handleShuffle = () => {
    setIsAnswerRevealed(false);
    setCurrentIndex(Math.floor(Math.random() * pool.length));
  };

  return (
    <div className="min-h-screen py-8 sm:py-16 px-3 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8 sm:space-y-10">
        
        {/* パンくず */}
        <nav className="flex items-center gap-2 text-xs text-[#737C77] dark:text-[#8899A6]">
          <Link href="/" className="hover:text-[#1E3D34] dark:hover:text-[#74BA9E] transition-colors">
            ホーム
          </Link>
          <span>/</span>
          <Link href="/tsubo" className="hover:text-[#1E3D34] dark:hover:text-[#74BA9E] transition-colors">
            経穴辞典
          </Link>
          <span>/</span>
          <span className="text-[#232826] dark:text-[#FAF8F5] font-bold">経穴復習・確認モード</span>
        </nav>

        {/* ヘッダー */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FCF4EB] dark:bg-[#281E15] text-[#B86924] dark:text-[#E6C387] text-xs font-bold tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Acupoint Active Recall</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5] tracking-tight">
            経穴学習・アクティブリコール
          </h1>
          <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed max-w-xl mx-auto">
            名称を隠して取穴部位や要穴分類から経穴を想起するセルフテスト機能です。
          </p>
        </div>

        {/* フィルター＆シャッフルバー */}
        <div className="bg-[#FAF8F5] dark:bg-[#15202B] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-[#59615D] dark:text-[#A0B0BC]">出題範囲：</span>
            <button
              type="button"
              onClick={() => { setFilterType("all"); setCurrentIndex(0); setIsAnswerRevealed(false); }}
              className={`px-2.5 py-1 rounded-lg font-medium border ${filterType === "all" ? "bg-[#1E3D34] text-white" : "bg-white dark:bg-[#10171F]"}`}
            >
              全穴
            </button>
            <button
              type="button"
              onClick={() => { setFilterType("fiveShu"); setCurrentIndex(0); setIsAnswerRevealed(false); }}
              className={`px-2.5 py-1 rounded-lg font-medium border ${filterType === "fiveShu" ? "bg-[#B86924] text-white" : "bg-white dark:bg-[#10171F]"}`}
            >
              五兪穴中心
            </button>
            <button
              type="button"
              onClick={() => { setFilterType("yuanLuoXi"); setCurrentIndex(0); setIsAnswerRevealed(false); }}
              className={`px-2.5 py-1 rounded-lg font-medium border ${filterType === "yuanLuoXi" ? "bg-[#1E2D3D] text-white" : "bg-white dark:bg-[#10171F]"}`}
            >
              原・絡・郄穴
            </button>
          </div>

          <button
            type="button"
            onClick={handleShuffle}
            className="inline-flex items-center gap-1 text-[#1E3D34] dark:text-[#74BA9E] hover:underline font-bold"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>ランダム出題</span>
          </button>
        </div>

        {/* クイズフラッシュカード */}
        {currentPoint && (
          <div className="bg-white dark:bg-[#17212A] rounded-3xl border-2 border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-10 shadow-sm space-y-6">
            <div className="flex items-center justify-between text-xs text-[#737C77] dark:text-[#8899A6]">
              <span>進捗: {currentIndex + 1} / {pool.length} 問</span>
              <span className="font-mono">正解記録: {quizScore.correct} / {quizScore.reviewed}</span>
            </div>

            {/* 問題提示エリア（部位と取穴情報） */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-[#FAF8F5] dark:bg-[#10171F] border border-[#E8E1D1] text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                  {currentPoint.meridian}（{currentPoint.bodyPart}）
                </span>
                {currentPoint.categories && currentPoint.categories.length > 0 && (
                  <span className="text-xs text-[#B86924] font-semibold">
                    要穴：{currentPoint.categories.join("、")}
                  </span>
                )}
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#22303D] space-y-2">
                <span className="text-xs font-bold text-[#737C77] dark:text-[#8899A6] block">
                  【取穴場所・骨性目印から名称を答えてください】
                </span>
                <p className="text-sm sm:text-base text-[#232826] dark:text-[#FAF8F5] font-medium leading-relaxed">
                  {currentPoint.locationSimple}
                </p>
                <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] font-mono pt-1">
                  WHO部位：{currentPoint.locationDetail}
                </p>
              </div>
            </div>

            {/* 回答表示トグルエリア */}
            <div className="pt-2">
              {!isAnswerRevealed ? (
                <button
                  type="button"
                  onClick={() => setIsAnswerRevealed(true)}
                  className="w-full py-4 rounded-2xl bg-[#FAF8F5] dark:bg-[#121920] border-2 border-dashed border-[#1E3D34]/40 hover:border-[#1E3D34] text-sm font-bold text-[#1E3D34] dark:text-[#74BA9E] transition-all flex items-center justify-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  <span>解答を表示する（経穴名と詳細）</span>
                </button>
              ) : (
                <div className="p-5 sm:p-7 rounded-2xl bg-[#EBF3EF] dark:bg-[#162A24] border border-[#C5DED4] dark:border-[#2A5243] space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[#C5DED4] pb-3">
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-sm font-bold px-2 py-0.5 rounded bg-[#1E3D34] text-white">
                        {currentPoint.code}
                      </span>
                      <h2 className="font-serif text-3xl font-bold text-[#232826] dark:text-[#FAF8F5]">
                        {currentPoint.name}
                      </h2>
                      <span className="text-sm text-[#59615D] dark:text-[#A0B0BC]">{currentPoint.kana}</span>
                    </div>

                    <Link
                      href={`/tsubo/${currentPoint.codeLower}`}
                      className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] hover:underline flex items-center gap-1"
                    >
                      <span>完全詳細ページを開く</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  <div className="text-xs sm:text-sm text-[#333835] dark:text-[#D5E0EA] leading-relaxed">
                    <strong className="text-[#1E3D34] dark:text-[#74BA9E] block mb-1">臨床知見：</strong>
                    {currentPoint.clinicalNote}
                  </div>

                  {/* 自己採点ボタン */}
                  <div className="pt-2 flex gap-3">
                    <button
                      type="button"
                      onClick={() => handleNext(true)}
                      className="flex-1 py-3 rounded-xl bg-[#1E3D34] hover:bg-[#162E27] text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>正解（覚えている）</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleNext(false)}
                      className="flex-1 py-3 rounded-xl bg-[#FDEDEC] dark:bg-[#281816] border border-[#FADBD8] text-[#A83629] dark:text-[#E07A70] hover:bg-[#FADBD8] text-xs font-bold transition-all"
                    >
                      <span>要復習（もう一度復習）</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            <p className="text-[10px] text-[#88928D] text-center pt-2">
              ※本クイズは知識想起（アクティブリコール）の補助ツールであり、臨床実技や安全刺入能力を判定するものではありません。
            </p>
          </div>
        )}

      </div>
    </div>
  );
}

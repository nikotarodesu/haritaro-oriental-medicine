"use client";

import { useState } from "react";
import Link from "next/link";
import { DIAGNOSIS_QUESTIONS, DIAGNOSIS_RESULTS } from "@/data/diagnosisData";
import { DiagnosisResultType } from "@/types/oriental";
import { Stethoscope, CheckCircle2, RotateCcw, Utensils, HeartPulse, Sparkles, ArrowRight } from "lucide-react";

export default function DiagnosisPage() {
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<DiagnosisResultType | null>(null);

  const handleToggle = (id: number) => {
    if (selectedAnswers.includes(id)) {
      setSelectedAnswers(selectedAnswers.filter((item) => item !== id));
    } else {
      setSelectedAnswers([...selectedAnswers, id]);
    }
  };

  const handleDiagnose = () => {
    if (selectedAnswers.length === 0) {
      alert("当てはまる項目を1つ以上選択してください。");
      return;
    }

    // スコア集計
    const counts: Record<string, number> = {
      qi_deficiency: 0,
      qi_stagnation: 0,
      blood_deficiency: 0,
      blood_stasis: 0,
      water_retention: 0,
      yang_deficiency: 0
    };

    selectedAnswers.forEach((id) => {
      const q = DIAGNOSIS_QUESTIONS.find((item) => item.id === id);
      if (q) {
        counts[q.type] += 1;
      }
    });

    // 最もスコアの高いタイプを抽出
    let highestType = "qi_deficiency";
    let maxCount = -1;

    Object.entries(counts).forEach(([type, count]) => {
      if (count > maxCount) {
        maxCount = count;
        highestType = type;
      }
    });

    setResult(DIAGNOSIS_RESULTS[highestType]);
    // 診断結果へスクロール
    window.scrollTo({ top: 500, behavior: "smooth" });
  };

  const handleReset = () => {
    setSelectedAnswers([]);
    setResult(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* ページ見出し */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FCF4EB] border border-[#F3E1CB] text-[#B86924] text-xs font-semibold tracking-wider">
          <Stethoscope className="w-3.5 h-3.5" />
          <span>東洋医学式 気・血・水 バランスチェック</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#232826] tracking-tight">
          気血水 体質セルフ診断
        </h1>
        <p className="text-sm text-[#59615D] max-w-xl mx-auto leading-relaxed">
          あなたの今の心身の傾きはどこにあるでしょうか？
          直近1〜2週間の状態に当てはまるものにチェックを入れ、「診断する」を押してください。
        </p>
      </div>

      {/* 設問一覧 */}
      <div className="bg-[#FFFFFF] p-6 sm:p-9 rounded-3xl border border-[#E5DEC9] shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-[#F2ECE0] pb-3 text-xs text-[#59615D]">
          <span>全12問（複数選択可）</span>
          <span>選択中: <strong className="text-[#1E3D34]">{selectedAnswers.length}</strong> 項目</span>
        </div>

        <div className="grid grid-cols-1 gap-3.5">
          {DIAGNOSIS_QUESTIONS.map((q) => {
            const isChecked = selectedAnswers.includes(q.id);
            return (
              <button
                key={q.id}
                onClick={() => handleToggle(q.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3.5 ${
                  isChecked
                    ? "bg-[#EBF3EF] border-[#1E3D34] text-[#1E3D34] shadow-sm"
                    : "bg-[#FAF8F5] border-[#E8E1D1] text-[#404743] hover:bg-[#F2EDE4]"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                    isChecked
                      ? "bg-[#1E3D34] border-[#1E3D34] text-white"
                      : "border-[#D5CCBC] bg-[#FFFFFF]"
                  }`}
                >
                  {isChecked && <CheckCircle2 className="w-4 h-4" />}
                </div>
                <span className="text-sm font-medium leading-relaxed">{q.text}</span>
              </button>
            );
          })}
        </div>

        {/* 診断実行ボタン */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handleDiagnose}
            className="w-full sm:w-auto px-10 py-4 rounded-xl bg-[#1E3D34] text-[#FAF8F5] hover:bg-[#162E27] font-bold text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5 text-[#E6C387]" />
            <span>体質を診断する</span>
          </button>

          {selectedAnswers.length > 0 && (
            <button
              onClick={handleReset}
              className="px-6 py-3 rounded-xl border border-[#D5CCBC] text-xs font-semibold text-[#59615D] hover:bg-[#FAF8F5] transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>選択をリセット</span>
            </button>
          )}
        </div>
      </div>

      {/* 診断結果表示 */}
      {result && (
        <div className="bg-[#FFFFFF] rounded-3xl border-2 border-[#1E3D34] p-8 sm:p-10 shadow-xl space-y-8 animate-fadeIn">
          <div className="text-center space-y-2 border-b border-[#F2ECE0] pb-6">
            <span className="text-xs font-bold text-[#B86924] uppercase tracking-widest">
              Diagnosis Result
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#232826]">
              {result.name}
            </h2>
            <p className="text-sm text-[#1E3D34] font-medium tracking-wide">
              （{result.reading}）
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-sm sm:text-base text-[#404743] leading-relaxed bg-[#FAF8F5] p-5 rounded-2xl border border-[#E8E1D1]">
              {result.summary}
            </p>

            <div>
              <span className="text-xs font-bold text-[#59615D] block mb-2">現れやすい症状・サイン:</span>
              <div className="flex flex-wrap gap-2">
                {result.symptoms.map((sym, i) => (
                  <span key={i} className="text-xs px-3 py-1 rounded-full bg-[#F2EDE4] text-[#232826]">
                    • {sym}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-xs font-bold text-[#59615D] block mb-1">主な原因・誘因:</span>
              <p className="text-xs text-[#59615D]">{result.cause}</p>
            </div>
          </div>

          {/* はり太郎の改善アドバイス */}
          <div className="bg-[#EBF3EF] p-6 sm:p-8 rounded-2xl border border-[#C5DED4] space-y-6">
            <div className="flex items-center gap-2 text-sm font-bold text-[#1E3D34]">
              <Sparkles className="w-5 h-5 text-[#B86924]" />
              <span>はり太郎の体質改善処方箋</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
              {/* 食養生 */}
              <div className="bg-[#FFFFFF] p-4 rounded-xl border border-[#D8E8E0] space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-[#1E3D34]">
                  <Utensils className="w-4 h-4 text-[#B86924]" />
                  <span>おすすめ食材</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {result.advice.food.map((f, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-[#FAF8F5] border border-[#E8E1D1] text-[#232826]">
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              {/* 生活習慣 */}
              <div className="bg-[#FFFFFF] p-4 rounded-xl border border-[#D8E8E0] space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-[#1E3D34]">
                  <HeartPulse className="w-4 h-4 text-[#1E3D34]" />
                  <span>生活・心の養生</span>
                </div>
                <p className="text-[#404743] leading-relaxed">{result.advice.lifestyle}</p>
              </div>

              {/* おすすめツボ */}
              <div className="bg-[#FFFFFF] p-4 rounded-xl border border-[#D8E8E0] space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-[#1E3D34]">
                  <Sparkles className="w-4 h-4 text-[#B86924]" />
                  <span>おすすめのツボ</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {result.advice.tsubo.map((t, i) => (
                    <Link
                      key={i}
                      href="/tsubo"
                      className="px-2 py-0.5 rounded bg-[#EBF3EF] border border-[#C5DED4] text-[#1E3D34] font-medium hover:underline"
                    >
                      {t}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="text-center pt-2">
            <button
              onClick={handleReset}
              className="px-6 py-2.5 rounded-xl border border-[#D5CCBC] text-xs font-semibold text-[#59615D] hover:bg-[#FAF8F5]"
            >
              もう一度診断する
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

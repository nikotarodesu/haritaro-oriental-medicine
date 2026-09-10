"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { DIAGNOSIS_QUESTIONS, DIAGNOSIS_RESULTS } from "@/data/diagnosisData";
import { DiagnosisResultType } from "@/types/oriental";
import { Stethoscope, CheckCircle2, RotateCcw, Utensils, HeartPulse, Sparkles, ArrowRight, Layers, ShieldAlert, Activity } from "lucide-react";
import ThreeStageSimulator from "@/components/ThreeStageSimulator";
import FoodFiveProhibitionsAlert, { OrganKey } from "@/components/FoodFiveProhibitionsAlert";
import GorouWorkstyleChecker from "@/components/GorouWorkstyleChecker";

function mapResultToOrgan(resultName: string): OrganKey {
  if (resultName.includes("気滞")) return "liver";
  if (resultName.includes("気虚")) return "spleen";
  if (resultName.includes("血虚")) return "liver";
  if (resultName.includes("瘀血")) return "heart";
  if (resultName.includes("水滞")) return "spleen";
  if (resultName.includes("陽虚")) return "kidney";
  return "liver";
}

export default function DiagnosisPage() {
  const [activeTab, setActiveTab] = useState<"self" | "gokin" | "gorou" | "simulator">("self");
  const [gokinOrgan, setGokinOrgan] = useState<OrganKey>("liver");
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<DiagnosisResultType | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get("tab");
      if (tab === "simulator") {
        setActiveTab("simulator");
      } else if (tab === "gokin" || tab === "food" || tab === "prohibition") {
        setActiveTab("gokin");
      } else if (tab === "gorou" || tab === "workstyle" || tab === "checker") {
        setActiveTab("gorou");
      }
      const organParam = params.get("organ");
      if (
        organParam === "liver" ||
        organParam === "heart" ||
        organParam === "spleen" ||
        organParam === "lung" ||
        organParam === "kidney"
      ) {
        setGokinOrgan(organParam as OrganKey);
      }
    }
  }, []);

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

    let highestType = "qi_deficiency";
    let maxCount = -1;

    Object.entries(counts).forEach(([type, count]) => {
      if (count > maxCount) {
        maxCount = count;
        highestType = type;
      }
    });

    setResult(DIAGNOSIS_RESULTS[highestType]);
    window.scrollTo({ top: 500, behavior: "smooth" });
  };

  const handleReset = () => {
    setSelectedAnswers([]);
    setResult(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* モード切り替えタブ */}
      <div className="flex justify-center">
        <div className="inline-flex p-1.5 rounded-2xl bg-[#EFE9DD] dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2D3E50] shadow-inner max-w-full overflow-x-auto">
          <button
            onClick={() => setActiveTab("self")}
            className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === "self"
                ? "bg-white dark:bg-[#1E2B37] text-[#1E3D34] dark:text-[#74BA9E] shadow-sm"
                : "text-[#59615D] dark:text-[#8899A6] hover:text-[#1E3D34] dark:hover:text-[#FAF8F5]"
            }`}
          >
            <Stethoscope className="w-4 h-4" />
            <span>① 気血水 12問セルフ診断</span>
          </button>

          <button
            onClick={() => setActiveTab("gokin")}
            className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === "gokin"
                ? "bg-white dark:bg-[#1E2B37] text-[#1E3D34] dark:text-[#74BA9E] shadow-sm"
                : "text-[#59615D] dark:text-[#8899A6] hover:text-[#1E3D34] dark:hover:text-[#FAF8F5]"
            }`}
          >
            <ShieldAlert className="w-4 h-4 text-[#DC2626]" />
            <span>② 食養生・薬膳 五禁アラート</span>
            <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-[#FCA5A5] text-[#7F1D1D]">
              新設
            </span>
          </button>

          <button
            onClick={() => setActiveTab("gorou")}
            className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === "gorou"
                ? "bg-white dark:bg-[#1E2B37] text-[#1E3D34] dark:text-[#74BA9E] shadow-sm"
                : "text-[#59615D] dark:text-[#8899A6] hover:text-[#1E3D34] dark:hover:text-[#FAF8F5]"
            }`}
          >
            <Activity className="w-4 h-4 text-[#B86924] dark:text-[#E6C387]" />
            <span>③ 五労（職業病）チェッカー</span>
            <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-[#E6C387] text-[#1E3D34]">
              新設
            </span>
          </button>

          <button
            onClick={() => setActiveTab("simulator")}
            className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === "simulator"
                ? "bg-white dark:bg-[#1E2B37] text-[#1E3D34] dark:text-[#74BA9E] shadow-sm"
                : "text-[#59615D] dark:text-[#8899A6] hover:text-[#1E3D34] dark:hover:text-[#FAF8F5]"
            }`}
          >
            <Layers className="w-4 h-4 text-[#B86924] dark:text-[#E6C387]" />
            <span>④ 臨床弁証シミュレーター</span>
            <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-[#E6C387] text-[#1E3D34]">
              臨床
            </span>
          </button>
        </div>
      </div>

      {/* 1. 一般向け12問セルフ診断 */}
      {activeTab === "self" && (
        <div className="space-y-12 animate-fadeIn max-w-4xl mx-auto">
          {/* ページ見出し */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FCF4EB] dark:bg-[#2A2117] border border-[#F3E1CB] dark:border-[#423321] text-[#B86924] dark:text-[#E6C387] text-xs font-semibold tracking-wider">
              <Stethoscope className="w-3.5 h-3.5" />
              <span>東洋医学式 気・血・水 バランスチェック</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5] tracking-tight">
              気血水 体質セルフ診断
            </h1>
            <p className="text-sm text-[#59615D] dark:text-[#A0B0BC] max-w-xl mx-auto leading-relaxed">
              あなたの今の心身の傾きはどこにあるでしょうか？
              直近1〜2週間の状態に当てはまるものにチェックを入れ、「診断する」を押してください。
            </p>
          </div>

      {/* 設問一覧 */}
      <div className="bg-[#FFFFFF] dark:bg-[#17212A] p-6 sm:p-9 rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] shadow-sm space-y-6 transition-colors">
        <div className="flex items-center justify-between border-b border-[#F2ECE0] dark:border-[#22303D] pb-3 text-xs text-[#59615D] dark:text-[#96A6B2]">
          <span>全12問（複数選択可）</span>
          <span>選択中: <strong className="text-[#1E3D34] dark:text-[#74BA9E]">{selectedAnswers.length}</strong> 項目</span>
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
                    ? "bg-[#EBF3EF] dark:bg-[#182823] border-[#1E3D34] dark:border-[#4E8C76] text-[#1E3D34] dark:text-[#FAF8F5] shadow-sm"
                    : "bg-[#FAF8F5] dark:bg-[#121920] border-[#E8E1D1] dark:border-[#22303D] text-[#404743] dark:text-[#C5D2DB] hover:bg-[#F2EDE4] dark:hover:bg-[#1B2631]"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                    isChecked
                      ? "bg-[#1E3D34] dark:bg-[#2B6958] border-[#1E3D34] dark:border-[#4E8C76] text-white"
                      : "border-[#D5CCBC] dark:border-[#2D3E50] bg-[#FFFFFF] dark:bg-[#1A2530]"
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
            className="w-full sm:w-auto px-10 py-4 rounded-xl bg-[#1E3D34] dark:bg-[#2B6958] text-[#FAF8F5] hover:bg-[#162E27] dark:hover:bg-[#225345] font-bold text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5 text-[#E6C387]" />
            <span>体質を診断する</span>
          </button>

          {selectedAnswers.length > 0 && (
            <button
              onClick={handleReset}
              className="px-6 py-3 rounded-xl border border-[#D5CCBC] dark:border-[#2D3E50] text-xs font-semibold text-[#59615D] dark:text-[#A0B0BC] hover:bg-[#FAF8F5] dark:hover:bg-[#1A2530] transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>選択をリセット</span>
            </button>
          )}
        </div>
      </div>

      {/* 診断結果表示 */}
      {result && (
        <div className="bg-[#FFFFFF] dark:bg-[#17212A] rounded-3xl border-2 border-[#1E3D34] dark:border-[#3A6B5B] p-8 sm:p-10 shadow-xl space-y-8 animate-fadeIn transition-colors">
          <div className="text-center space-y-2 border-b border-[#F2ECE0] dark:border-[#22303D] pb-6">
            <span className="text-xs font-bold text-[#B86924] dark:text-[#E6C387] uppercase tracking-widest">
              Diagnosis Result
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5]">
              {result.name}
            </h2>
            <p className="text-sm text-[#1E3D34] dark:text-[#74BA9E] font-medium tracking-wide">
              （{result.reading}）
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-sm sm:text-base text-[#404743] dark:text-[#C5D2DB] leading-relaxed bg-[#FAF8F5] dark:bg-[#121920] p-5 rounded-2xl border border-[#E8E1D1] dark:border-[#22303D]">
              {result.summary}
            </p>

            <div>
              <span className="text-xs font-bold text-[#59615D] dark:text-[#96A6B2] block mb-2">現れやすい症状・サイン:</span>
              <div className="flex flex-wrap gap-2">
                {result.symptoms.map((sym, i) => (
                  <span key={i} className="text-xs px-3 py-1 rounded-full bg-[#F2EDE4] dark:bg-[#1E2B36] text-[#232826] dark:text-[#E6EFEA]">
                    • {sym}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-xs font-bold text-[#59615D] dark:text-[#96A6B2] block mb-1">主な原因・誘因:</span>
              <p className="text-xs text-[#59615D] dark:text-[#A0B0BC]">{result.cause}</p>
            </div>
          </div>

          {/* はり太郎の改善アドバイス */}
          <div className="bg-[#EBF3EF] dark:bg-[#14231E] p-6 sm:p-8 rounded-2xl border border-[#C5DED4] dark:border-[#234237] space-y-6">
            <div className="flex items-center gap-2 text-sm font-bold text-[#1E3D34] dark:text-[#74BA9E]">
              <Sparkles className="w-5 h-5 text-[#B86924] dark:text-[#E6C387]" />
              <span>はり太郎の体質改善処方箋</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
              {/* 食養生 */}
              <div className="bg-[#FFFFFF] dark:bg-[#17212A] p-4 rounded-xl border border-[#D8E8E0] dark:border-[#263D33] space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                  <Utensils className="w-4 h-4 text-[#B86924] dark:text-[#E6C387]" />
                  <span>おすすめ食材</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {result.advice.food.map((f, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#22303D] text-[#232826] dark:text-[#C5D2DB]">
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              {/* 生活習慣 */}
              <div className="bg-[#FFFFFF] dark:bg-[#17212A] p-4 rounded-xl border border-[#D8E8E0] dark:border-[#263D33] space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                  <HeartPulse className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E]" />
                  <span>生活・心の養生</span>
                </div>
                <p className="text-[#404743] dark:text-[#C5D2DB] leading-relaxed">{result.advice.lifestyle}</p>
              </div>

              {/* おすすめツボ */}
              <div className="bg-[#FFFFFF] dark:bg-[#17212A] p-4 rounded-xl border border-[#D8E8E0] dark:border-[#263D33] space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                  <Sparkles className="w-4 h-4 text-[#B86924] dark:text-[#E6C387]" />
                  <span>おすすめのツボ</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {result.advice.tsubo.map((t, i) => (
                    <Link
                      key={i}
                      href="/tsubo"
                      className="px-2 py-0.5 rounded bg-[#EBF3EF] dark:bg-[#182823] border border-[#C5DED4] dark:border-[#2A5243] text-[#1E3D34] dark:text-[#83BEA8] font-medium hover:underline"
                    >
                      {t}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* 五禁（相剋）アラート連携バナー */}
            <div className="bg-[#FEF2F2] dark:bg-[#201111] p-4 rounded-xl border border-[#FECACA] dark:border-[#4C1D1D] flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#DC2626] text-white flex items-center justify-center shrink-0">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#DC2626] block">
                    ⚠️ あなたの体質（{result.name}）が避けるべき「相剋ブレーキ味覚」があります
                  </span>
                  <span className="text-[11px] text-[#7F1D1D] dark:text-[#FCA5A5] leading-tight block">
                    良かれと思って食べている食材が、実は弱った臓腑を攻撃しているかも？
                  </span>
                </div>
              </div>
              <button
                onClick={() => {
                  setGokinOrgan(mapResultToOrgan(result.name));
                  setActiveTab("gokin");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="px-4 py-2 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 shadow-sm"
              >
                <span>五禁アラートで確認</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="text-center pt-2">
            <button
              onClick={handleReset}
              className="px-6 py-2.5 rounded-xl border border-[#D5CCBC] dark:border-[#2D3E50] text-xs font-semibold text-[#59615D] dark:text-[#A0B0BC] hover:bg-[#FAF8F5] dark:hover:bg-[#1A2530]"
            >
              もう一度診断する
            </button>
          </div>
        </div>
      )}

      {/* 臨床シミュレーターへの誘導カード（セルフ診断タブ時） */}
      <div className="bg-[#FFFFFF] dark:bg-[#17212A] p-6 sm:p-7 rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left transition-colors">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E]">
            <Layers className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
            <span>臨床家・専門学生の方へ</span>
          </div>
          <h3 className="font-serif font-bold text-base sm:text-lg text-[#232826] dark:text-[#FAF8F5]">
            臨床弁証シミュレーター
          </h3>
          <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] max-w-xl">
            八綱・気血水・臓腑経絡の論理的連動から「一文の証」を導出し、臨床最小手数の推奨ペアツボを瞬時に割り出します。
          </p>
        </div>
        <button
          onClick={() => {
            setActiveTab("simulator");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="px-5 py-3 rounded-xl bg-[#1E3D34] dark:bg-[#2B6958] text-[#FAF8F5] text-xs font-bold hover:bg-[#162E27] dark:hover:bg-[#225345] transition-all shrink-0 flex items-center gap-2 shadow-sm"
        >
          <span>シミュレーターに切り替え</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  )}

  {/* 2. 食養生・薬膳 五禁（相剋）アラート */}
  {activeTab === "gokin" && (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto">
      {/* 導入ヘッダー */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FEF2F2] dark:bg-[#201111] border border-[#FECACA] dark:border-[#4C1D1D] text-[#DC2626] text-xs font-semibold tracking-wider">
          <ShieldAlert className="w-3.5 h-3.5 text-[#DC2626]" />
          <span>『素問』五臓生成篇・宣明五気篇準拠 安全装置ツール</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5] tracking-tight">
          食養生・薬膳「五禁（相剋）アラート」
        </h2>
        <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
          「良かれと思って食べている食材が、実は弱った臓腑を攻撃しているかも？」<br className="hidden sm:inline" />
          自分の体質や弱っている臓腑を選ぶと、五行相剋関係にある避けるべき味覚が<strong className="text-[#DC2626]">「⚠️相剋ブレーキ」</strong>として警告表示され、
          代わりに補うべきレスキュー食材リストを提示します。
        </p>
      </div>

      <FoodFiveProhibitionsAlert initialOrgan={gokinOrgan} />
    </div>
  )}

  {/* 3. 現代人のための五労（職業病）チェッカー */}
  {activeTab === "gorou" && (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto">
      {/* 導入ヘッダー */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FCF4EB] dark:bg-[#2A2117] border border-[#F3E1CB] dark:border-[#423321] text-[#B86924] dark:text-[#E6C387] text-xs font-semibold tracking-wider">
          <Activity className="w-3.5 h-3.5 text-[#B86924]" />
          <span>『素問』宣明五気篇準拠 動作偏向・職業病診断ツール</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5] tracking-tight">
          現代人のための「五労（職業病）チェッカー」
        </h2>
        <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
          「久視（PC凝視）」「久坐（座りっぱなし）」「久立（立ち仕事）」「久行（歩き回り）」「久臥（寝だめ）」の五労理論を現代ワークスタイルに翻訳。<br className="hidden sm:inline" />
          日頃の偏った動作から疲弊している五臓のレーダーチャートを算出し、<strong className="text-[#1E3D34] dark:text-[#74BA9E]">「五行を回す中庸アクション」</strong>を処方します。
        </p>
      </div>

      <GorouWorkstyleChecker />
    </div>
  )}

  {/* 4. 臨床弁証シミュレーター */}
  {activeTab === "simulator" && (
    <div className="space-y-8 animate-fadeIn">
      {/* 導入ヘッダー */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF3EF] dark:bg-[#182823] border border-[#C5DED4] dark:border-[#2A5243] text-[#1E3D34] dark:text-[#74BA9E] text-xs font-semibold tracking-wider">
          <Layers className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
          <span>八綱 ➜ 気血水 ➜ 臓腑経絡 3段階連動</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5] tracking-tight">
          臨床弁証 & 最小構成ツボ導出
        </h2>
        <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
          病態の深浅・勢い（八綱）から循環動態（気血水）、局在病位（五臓五腑）を絞り込み、
          自動合成された<strong className="text-[#1E3D34] dark:text-[#74BA9E]">「一文の証」</strong>と
          臨床実践で最も即効性の高い<strong className="text-[#1E3D34] dark:text-[#74BA9E]">「最小構成ペアツボ」</strong>を提示します。
        </p>
      </div>

      <ThreeStageSimulator />
    </div>
  )}
</div>
  );
}

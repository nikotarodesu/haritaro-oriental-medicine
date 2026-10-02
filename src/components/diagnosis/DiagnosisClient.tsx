"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import MedicalSafetyNotice from "@/components/MedicalSafetyNotice";
import { DIAGNOSIS_QUESTIONS, DIAGNOSIS_RESULTS, DIAGNOSIS_GUIDANCE_SCOPE } from "@/data/diagnosisData";
import { DiagnosisResultType } from "@/types/oriental";
import { TSUBOS } from "@/data/tsuboData";
import {
  Stethoscope,
  CheckCircle2,
  RotateCcw,
  Utensils,
  HeartPulse,
  Sparkles,
  ArrowRight,
  Activity,
  BookOpen,
  AlertCircle,
  FileText,
  Layers,
  Eye,
  X,
  HelpCircle,
  Check,
  Minus,
  MessageSquare,
  ShieldCheck,
  UserCheck,
  Share2,
  Copy,
} from "lucide-react";
import GorouWorkstyleChecker from "@/components/GorouWorkstyleChecker";
import { saveDraftPatientNote } from "@/utils/draftNote";
import { trackEvent } from "@/utils/analytics";

const TYPE_LECTURE_MAP: Record<string, { lectureId: string; lectureTitle: string; conceptName: string }> = {
  qi_deficiency: {
    lectureId: "lecture-pathomechanism-3",
    lectureTitle: "気の不足と運動の失調",
    conceptName: "気虚の病態と生成メカニズム",
  },
  qi_stagnation: {
    lectureId: "lecture-pathomechanism-3",
    lectureTitle: "気の不足と運動の失調",
    conceptName: "気滞の病態と気機不暢",
  },
  blood_deficiency: {
    lectureId: "lecture-pathomechanism-5",
    lectureTitle: "血の失調と瘀血の形成",
    conceptName: "血虚の病態と滋養不足",
  },
  blood_stasis: {
    lectureId: "lecture-pathomechanism-5",
    lectureTitle: "血の失調と瘀血の形成",
    conceptName: "瘀血の形成と微小循環の滞流",
  },
  water_retention: {
    lectureId: "lecture-pathomechanism-4",
    lectureTitle: "津液代謝の失調",
    conceptName: "水滞・痰飲の代謝失調",
  },
  yang_deficiency: {
    lectureId: "lecture-pathomechanism-6",
    lectureTitle: "寒熱と陰陽の失調",
    conceptName: "陽虚・温煦作用の低下",
  },
};

// ゼロ選択（偏りなし・中庸）時の標準結果
const NEUTRAL_RESULT: DiagnosisResultType = {
  type: "neutral",
  name: "回答上の分類保留（該当項目なし）",
  reading: "かいとうじょうのぶんるいほりゅう",
  summary:
    "この質問票では該当項目が選ばれていません。病気がないこと、健康状態や心身のバランスが良好であることは、この回答だけでは判断できません。気になる症状があれば医療機関へ相談してください。",
  symptoms: [
    "この質問票では該当項目が選ばれていません",
    "未回答・不明な所見がないかも確認してください",
  ],
  cause: "この質問票の回答だけでは、原因や体質を確定できません。",
  advice: {
    food: ["旬の野菜", "雑穀米", "季節の果物", "温かい汁物"],
    lifestyle:
      "現在の規則正しい生活リズムと良質な睡眠を保ち、季節の変わり目の冷えや疲労蓄積に気を配りましょう。",
    tsubo: [],
  },
};

type QuestionStatus = "unconfirmed" | "applicable" | "not_applicable" | "unknown";

interface Props {
  initialTab?: "self" | "clinical" | "gorou";
}

export default function DiagnosisClient({ initialTab = "self" }: Props) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"self" | "clinical" | "gorou">(initialTab);

  // セルフチェック用State
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [selfResult, setSelfResult] = useState<DiagnosisResultType | null>(null);
  const [copiedShare, setCopiedShare] = useState(false);

  // 対面問診モード用State
  const [patientIdentifier, setPatientIdentifier] = useState("");
  const [questionStatuses, setQuestionStatuses] = useState<Record<number, QuestionStatus>>({});
  const [questionNotes, setQuestionNotes] = useState<Record<number, string>>({});
  const [clinicalResult, setClinicalResult] = useState<DiagnosisResultType | null>(null);

  // 患者対面説明クリーンビュー用State
  const [isPatientModalOpen, setIsPatientModalOpen] = useState(false);
  const [patientModalData, setPatientModalData] = useState<{
    result: DiagnosisResultType;
    applicableSymptoms: string[];
  } | null>(null);

  const resultRef = useRef<HTMLDivElement | null>(null);

  const scrollToResult = () => {
    setTimeout(() => {
      if (resultRef.current) {
        const yOffset = -90;
        const y = resultRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }, 100);
  };

  const handleTabChange = (tab: "self" | "clinical" | "gorou") => {
    setActiveTab(tab);
    if (typeof window !== "undefined") {
      let url = "/diagnosis";
      if (tab === "clinical") url = "/diagnosis?tab=clinical";
      if (tab === "gorou") url = "/diagnosis?tab=gorou";
      window.history.pushState(null, "", url);
    }
  };

  // --- セルフチェックハンドラー ---
  const handleToggleSelf = (id: number) => {
    if (selectedAnswers.length === 0) {
      trackEvent("tool_start", { tool_id: "diagnosis_qixueshui" });
    }
    if (selectedAnswers.includes(id)) {
      setSelectedAnswers(selectedAnswers.filter((item) => item !== id));
    } else {
      setSelectedAnswers([...selectedAnswers, id]);
    }
  };

  const handleDiagnoseSelf = () => {
    trackEvent("tool_complete", { tool_id: "diagnosis_qixueshui" });

    // ゼロ選択の許容（P0要件）：0個の場合は中庸・安定傾向を表示
    if (selectedAnswers.length === 0) {
      setSelfResult(NEUTRAL_RESULT);
      scrollToResult();
      return;
    }

    const counts: Record<string, number> = {
      qi_deficiency: 0,
      qi_stagnation: 0,
      blood_deficiency: 0,
      blood_stasis: 0,
      water_retention: 0,
      yang_deficiency: 0,
    };

    selectedAnswers.forEach((id) => {
      const q = DIAGNOSIS_QUESTIONS.find((item) => item.id === id);
      if (q) counts[q.type] += 1;
    });

    let highestType = "qi_deficiency";
    let maxCount = -1;
    Object.entries(counts).forEach(([type, count]) => {
      if (count > maxCount) {
        maxCount = count;
        highestType = type;
      }
    });

    const res = DIAGNOSIS_RESULTS[highestType] || NEUTRAL_RESULT;
    setSelfResult(res);
    trackEvent("diagnosis_complete", {
      tool_id: "diagnosis_qixueshui",
      primary_type: highestType,
    });
    scrollToResult();
  };

  const handleResetSelf = () => {
    setSelectedAnswers([]);
    setSelfResult(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleShareCopy = () => {
    if (!selfResult) return;
    const shareText = `【気血水 体質セルフ診断】私の診断結果は「${selfResult.name}」でした！ 東洋医学の視点で気・血・水のバランスとおすすめ養生法をチェック。\nhttps://www.haritaro.jp/diagnosis\n#ハリタロー #東洋医学 #体質診断`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2500);
      trackEvent("share", { method: "clipboard", content_type: "diagnosis_result" });
    }
  };

  // --- 対面問診ハンドラー ---
  const handleSetQuestionStatus = (id: number, status: QuestionStatus) => {
    setQuestionStatuses((prev) => ({ ...prev, [id]: status }));
  };

  const handleSetQuestionNote = (id: number, note: string) => {
    setQuestionNotes((prev) => ({ ...prev, [id]: note }));
  };

  // 進捗集計
  const confirmedCount = DIAGNOSIS_QUESTIONS.filter(
    (q) => questionStatuses[q.id] && questionStatuses[q.id] !== "unconfirmed"
  ).length;

  const applicableQuestions = DIAGNOSIS_QUESTIONS.filter(
    (q) => questionStatuses[q.id] === "applicable"
  );

  const handleDiagnoseClinical = () => {
    trackEvent("tool_complete", { tool_id: "clinical_interview_qixueshui" });

    // 0問選択時は中庸・安定傾向
    if (applicableQuestions.length === 0) {
      setClinicalResult(NEUTRAL_RESULT);
      scrollToResult();
      return;
    }

    const counts: Record<string, number> = {
      qi_deficiency: 0,
      qi_stagnation: 0,
      blood_deficiency: 0,
      blood_stasis: 0,
      water_retention: 0,
      yang_deficiency: 0,
    };

    applicableQuestions.forEach((q) => {
      counts[q.type] += 1;
    });

    let highestType = "qi_deficiency";
    let maxCount = -1;
    Object.entries(counts).forEach(([type, count]) => {
      if (count > maxCount) {
        maxCount = count;
        highestType = type;
      }
    });

    const res = DIAGNOSIS_RESULTS[highestType] || NEUTRAL_RESULT;
    setClinicalResult(res);
    scrollToResult();
  };

  // 前患者データの安全破棄・新規問診開始
  const handleResetClinical = () => {
    const hasData =
      patientIdentifier.trim() !== "" ||
      confirmedCount > 0 ||
      clinicalResult !== null;

    if (hasData) {
      const ok = window.confirm(
        "現在の問診データをクリアして、新しい患者の問診を開始しますか？\n（未保存の入力・臨床メモは安全に破棄されます）"
      );
      if (!ok) return;
    }

    setPatientIdentifier("");
    setQuestionStatuses({});
    setQuestionNotes({});
    setClinicalResult(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 臨床ノートへの下書き保存
  const handleSaveToNoteDraft = (isFromClinicalMode = false) => {
    const curResult = isFromClinicalMode ? clinicalResult : selfResult;
    if (!curResult) return;

    let complaints = curResult.symptoms.slice(0, 3).join("、");
    if (isFromClinicalMode && applicableQuestions.length > 0) {
      complaints = applicableQuestions.map((q) => q.text).slice(0, 3).join(" / ");
    }

    // 各設問の臨床メモ
    const notesSummary = isFromClinicalMode
      ? Object.entries(questionNotes)
          .filter(([, note]) => note && note.trim().length > 0)
          .map(([qId, note]) => {
            const q = DIAGNOSIS_QUESTIONS.find((item) => item.id === Number(qId));
            return `・${q ? q.text : `問${qId}`}: ${note}`;
          })
          .join("\n")
      : "";

    saveDraftPatientNote({
      sourceTool: "気血水体質チェック",
      patientIdentifier: isFromClinicalMode && patientIdentifier.trim() ? patientIdentifier.trim() : undefined,
      constitution: curResult.name,
      chiefComplaint: complaints,
      selectedPointsInput: curResult.advice.tsubo.join(", "),
      treatmentPlan: `【気血水${isFromClinicalMode ? "対面問診" : "体質チェック"}結果】\n体質傾向: ${curResult.name}（${curResult.reading}）\n状態のまとめ: ${curResult.summary}\n${notesSummary ? `\n【問診時の臨床メモ】\n${notesSummary}\n` : ""}\n推奨生活養生: ${curResult.advice.lifestyle}\n推奨食材: ${curResult.advice.food.join("、")}\n※本内容は回答傾向から整理した臨床下書き情報です。診察・判断に基づき加筆修正してください。`,
    });
    router.push("/notes");
  };

  // シミュレーター連携
  const handleGoToSimulator = (targetResult: DiagnosisResultType) => {
    const mapping: Record<string, { depth: string; temp: string; state: string; qixueshui: string; zangfu: string }> = {
      qi_deficiency: { depth: "interior", temp: "neutral", state: "deficiency", qixueshui: "qixu", zangfu: "pi-deficiency" },
      yang_deficiency: { depth: "interior", temp: "cold", state: "deficiency", qixueshui: "yangxu", zangfu: "shen-yang-deficiency" },
      qi_stagnation: { depth: "interior", temp: "neutral", state: "excess", qixueshui: "qitai", zangfu: "gan-qi-stagnation" },
      blood_deficiency: { depth: "interior", temp: "neutral", state: "deficiency", qixueshui: "xuexu", zangfu: "gan-blood-deficiency" },
      blood_stasis: { depth: "interior", temp: "neutral", state: "excess", qixueshui: "oketsu", zangfu: "gan-qi-stagnation" },
      water_retention: { depth: "interior", temp: "cold", state: "excess", qixueshui: "suitai", zangfu: "pi-deficiency" },
    };

    const target = mapping[targetResult.type] || { depth: "interior", temp: "neutral", state: "deficiency", qixueshui: "qixu", zangfu: "pi-deficiency" };
    const params = new URLSearchParams({
      fromDiagnosis: "true",
      diagName: targetResult.name,
      depth: target.depth,
      temp: target.temp,
      state: target.state,
      qixueshui: target.qixueshui,
      zangfu: target.zangfu,
    });

    router.push(`/simulator?${params.toString()}`);
  };

  // 「患者さんに説明する」モーダルを開く
  const handleOpenPatientModal = (
    resultToExplain: DiagnosisResultType,
    symptoms: string[]
  ) => {
    setPatientModalData({
      result: resultToExplain,
      applicableSymptoms: symptoms,
    });
    setIsPatientModalOpen(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-16 space-y-8 sm:space-y-10">
      <MedicalSafetyNotice title="チェックの利用範囲" message={DIAGNOSIS_GUIDANCE_SCOPE} />
      {/* モード切り替えタブ */}
      <div className="flex justify-center">
        <div className="inline-flex p-1 sm:p-1.5 rounded-2xl bg-[#EFE9DD] dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2D3E50] shadow-inner max-w-full overflow-x-auto gap-1">
          <button
            type="button"
            onClick={() => handleTabChange("self")}
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === "self"
                ? "bg-white dark:bg-[#1E2B37] text-[#1E3D34] dark:text-[#74BA9E] shadow-sm"
                : "text-[#59615D] dark:text-[#8899A6] hover:text-[#1E3D34] dark:hover:text-[#FAF8F5]"
            }`}
          >
            <Stethoscope className="w-4 h-4" />
            <span>① 気血水セルフチェック</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange("clinical")}
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === "clinical"
                ? "bg-white dark:bg-[#1E2B37] text-[#1E3D34] dark:text-[#74BA9E] shadow-sm ring-1 ring-[#1E3D34]/20 dark:ring-[#74BA9E]/30"
                : "text-[#59615D] dark:text-[#8899A6] hover:text-[#1E3D34] dark:hover:text-[#FAF8F5]"
            }`}
          >
            <UserCheck className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E]" />
            <span>② 対面問診モード（患者用）</span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#1E3D34] text-white dark:bg-[#74BA9E] dark:text-[#121920]">
              臨床用
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange("gorou")}
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === "gorou"
                ? "bg-white dark:bg-[#1E2B37] text-[#1E3D34] dark:text-[#74BA9E] shadow-sm"
                : "text-[#59615D] dark:text-[#8899A6] hover:text-[#1E3D34] dark:hover:text-[#FAF8F5]"
            }`}
          >
            <Activity className="w-4 h-4 text-[#B86924] dark:text-[#E6C387]" />
            <span>③ 五労チェッカー</span>
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 1. 一般向け12問セルフ診断 */}
      {/* ============================================================== */}
      {activeTab === "self" && (
        <div className="space-y-8 sm:space-y-12 animate-fadeIn max-w-4xl mx-auto">
          {/* ページ見出し */}
          <div className="text-center space-y-3 sm:space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FCF4EB] dark:bg-[#2A2117] border border-[#F3E1CB] dark:border-[#423321] text-[#B86924] dark:text-[#E6C387] text-xs font-semibold tracking-wider">
              <Stethoscope className="w-3.5 h-3.5" />
              <span>東洋医学式 気・血・水 バランスチェック</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5] tracking-tight">
              気血水 体質セルフ診断
            </h1>
            <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] max-w-xl mx-auto leading-relaxed">
              あなたの今の心身の傾きはどこにあるでしょうか？
              直近1〜2週間の状態に当てはまるものにチェックを入れ、「診断する」を押してください。
            </p>
          </div>

          {/* 免責事項バナー */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-[#FAF8F5] dark:bg-[#152028] border border-[#E5DEC9] dark:border-[#2A3B4A] flex items-start gap-2.5 text-xs text-[#59615D] dark:text-[#96A6B2] shadow-2xs">
            <AlertCircle className="w-4 h-4 text-[#B86924] dark:text-[#E6C387] shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>【ご利用にあたっての注意】</strong>本セルフ診断は東洋医学の気血水理論に基づき日頃の体質傾向やセルフケアの参考としていただくための学習・参考情報です。医師法に定める診断・治療等の医療行為ではありません。急激な体調変化や重篤な症状がある場合は速やかに医師等の専門医療機関を受診してください。
            </p>
          </div>

          {/* 設問一覧 */}
          <div className="bg-[#FFFFFF] dark:bg-[#17212A] p-3.5 sm:p-9 rounded-2xl sm:rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] shadow-sm space-y-4 sm:space-y-6 transition-colors">
            <div className="flex items-center justify-between border-b border-[#F2ECE0] dark:border-[#22303D] pb-3 text-xs text-[#59615D] dark:text-[#96A6B2]">
              <span>全12問（複数選択可・該当なしも確認できます）</span>
              <span>
                選択中: <strong className="text-[#1E3D34] dark:text-[#74BA9E]">{selectedAnswers.length}</strong> 項目
              </span>
            </div>

            <div className="grid grid-cols-1 gap-2.5 sm:gap-3.5">
              {DIAGNOSIS_QUESTIONS.map((q) => {
                const isChecked = selectedAnswers.includes(q.id);
                return (
                  <button
                    key={q.id}
                    onClick={() => handleToggleSelf(q.id)}
                    type="button"
                    className={`w-full text-left p-3 sm:p-4 rounded-xl border transition-all flex items-start gap-2.5 sm:gap-3.5 cursor-pointer ${
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
                type="button"
                onClick={handleDiagnoseSelf}
                className="w-full sm:w-auto px-10 py-4 rounded-xl bg-[#1E3D34] dark:bg-[#2B6958] text-[#FAF8F5] hover:bg-[#162E27] dark:hover:bg-[#225345] font-bold text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>体質傾向を分析する</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              {selectedAnswers.length > 0 && (
                <button
                  type="button"
                  onClick={handleResetSelf}
                  className="text-xs text-[#59615D] dark:text-[#8899A6] hover:text-rose-600 dark:hover:text-rose-400 flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>選択をリセット</span>
                </button>
              )}
            </div>
          </div>

          {/* 診断結果表示 */}
          {selfResult && (
            <div ref={resultRef} className="space-y-6 animate-fadeIn">
              <div className="bg-[#FAF8F5] dark:bg-[#152028] p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] shadow-md space-y-6">
                {/* 臨床補助の注記（P0要件） */}
                <div className="text-center space-y-2 border-b border-[#F2ECE0] dark:border-[#22303D] pb-5">
                  <span className="text-xs font-bold text-[#B86924] dark:text-[#E6C387] tracking-wider uppercase">
                    現在の回答傾向
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5]">
                    {selfResult.name}
                    <span className="text-base font-sans font-normal text-[#59615D] dark:text-[#8899A6] ml-2">
                      （{selfResult.reading}）
                    </span>
                  </h2>
                  <p className="text-xs text-[#737C77] dark:text-[#8899A6] max-w-xl mx-auto pt-1 leading-relaxed">
                    ※回答から状態の傾向を整理する補助ツールです。回答だけで診断や施術方針は確定しません。
                  </p>
                  <p className="text-sm text-[#59615D] dark:text-[#A0B0BC] max-w-lg mx-auto pt-2">
                    {selfResult.summary}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-white dark:bg-[#1A2632] border border-[#E8E1D1] dark:border-[#2A3B4A] space-y-2">
                    <span className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] flex items-center gap-1.5">
                      <HeartPulse className="w-4 h-4" />
                      起こりやすい身体のサイン
                    </span>
                    <ul className="text-xs text-[#59615D] dark:text-[#A0B0BC] space-y-1 pl-4 list-disc">
                      {selfResult.symptoms.map((s, idx) => (
                        <li key={idx}>{s}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-white dark:bg-[#1A2632] border border-[#E8E1D1] dark:border-[#2A3B4A] space-y-2">
                    <span className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] flex items-center gap-1.5">
                      <Utensils className="w-4 h-4" />
                      おすすめの食材・養生
                    </span>
                    <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                      {selfResult.advice.food.join("、")}
                    </p>
                    <span className="text-[11px] text-[#737C77] dark:text-[#8899A6] block pt-1">
                      生活養生: {selfResult.advice.lifestyle}
                    </span>
                  </div>
                </div>

                {/* 患者さんに説明する（対面説明クリーンビュー展開） */}
                <div className="p-4 rounded-xl bg-white dark:bg-[#1A2632] border-2 border-[#1E3D34]/30 dark:border-[#74BA9E]/40 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#1E3D34] text-white flex items-center justify-center shrink-0">
                      <Eye className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] block">
                          患者さんに説明する（対面説明ビュー）
                        </span>
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#1E3D34] text-white">
                          対面用
                        </span>
                      </div>
                      <span className="text-[11px] text-[#59615D] dark:text-[#A0B0BC] block mt-0.5">
                        広告・課金・内部メモを非表示にし、ベッドサイドで患者さんに直接見せられるクリーン画面を開きます。
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      handleOpenPatientModal(
                        selfResult,
                        selectedAnswers
                          .map((id) => DIAGNOSIS_QUESTIONS.find((q) => q.id === id)?.text || "")
                          .filter(Boolean)
                      )
                    }
                    className="px-4 py-2.5 rounded-xl bg-[#1E3D34] hover:bg-[#2B5A46] text-white text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 shadow-sm whitespace-nowrap cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>説明画面を表示</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* 臨床・学術解説講義への相互誘導 */}
                {selfResult.type !== "neutral" && (() => {
                  const targetLecture = TYPE_LECTURE_MAP[selfResult.type] || {
                    lectureId: "lecture-pathomechanism-3",
                    lectureTitle: "気の不足と運動の失調",
                    conceptName: `${selfResult.name}の考え方と病機`,
                  };
                  return (
                    <div className="p-4 rounded-xl bg-[#EBF3EF] dark:bg-[#182823] border border-[#C5DED4] dark:border-[#2A5243] flex flex-col sm:flex-row items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-[#1E3D34] text-white flex items-center justify-center shrink-0">
                          <BookOpen className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-[#1E3D34] dark:text-[#83BEA8] block">
                              講義で確認：{targetLecture.conceptName}
                            </span>
                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-white/70 dark:bg-[#121920] text-[#1E3D34] dark:text-[#74BA9E] font-semibold border border-[#C5DED4] dark:border-[#2A5243]">
                              カリキュラム連携
                            </span>
                          </div>
                          <span className="text-[11px] text-[#59615D] dark:text-[#A0B0BC] block mt-0.5">
                            第5章 病因病機学説「{targetLecture.lectureTitle}」で病理機序を詳しく学べます。
                          </span>
                        </div>
                      </div>
                      <Link
                        href={`/curriculum/${targetLecture.lectureId}`}
                        className="px-4 py-2 rounded-xl bg-[#1E3D34] dark:bg-[#74BA9E] hover:bg-[#162E27] text-white dark:text-[#121920] text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 shadow-sm whitespace-nowrap"
                      >
                        <span>解説講義へ</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  );
                })()}

                {/* 臨床シミュレーター連携バナー */}
                {selfResult.type !== "neutral" && (
                  <div className="bg-[#FAF8F5] dark:bg-[#152028] p-4 rounded-xl border border-[#B86924]/30 dark:border-[#E6C387]/30 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[#B86924] text-white flex items-center justify-center shrink-0">
                        <Layers className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-[#B86924] dark:text-[#E6C387] block">
                            シミュレーターで配穴と鑑別を深掘り
                          </span>
                        </div>
                        <span className="text-[11px] text-[#59615D] dark:text-[#A0B0BC] leading-tight block mt-0.5">
                          診断傾向「{selfResult.name}」をシミュレーターへ引き継ぎ、八綱・気血水・臓腑の連動配穴を検証できます。
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleGoToSimulator(selfResult)}
                      className="px-4 py-2.5 rounded-xl bg-[#B86924] hover:bg-[#96531B] text-white text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 shadow-sm whitespace-nowrap cursor-pointer"
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span>シミュレーターで検証</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {/* 臨床ノート連携バナー */}
                <div className="bg-[#FAF8F5] dark:bg-[#152028] p-4 rounded-xl border border-[#1E3D34]/30 dark:border-[#74BA9E]/30 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#1E3D34] text-white flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] block">
                          この診断結果から臨床ノートを作成
                        </span>
                        <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-[#1E3D34] text-white">
                          下書き連携
                        </span>
                      </div>
                      <span className="text-[11px] text-[#59615D] dark:text-[#A0B0BC] leading-tight block mt-0.5">
                        体質見立て「{selfResult.name}」と学習用の関連経穴を下書きとして引き継ぎます。
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleSaveToNoteDraft(false)}
                    className="px-4 py-2.5 rounded-xl bg-[#1E3D34] hover:bg-[#2B5A46] text-white text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 shadow-sm whitespace-nowrap cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>この内容を臨床ノートに残す</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* SNSシェア・結果共有 */}
                <div className="p-4 rounded-xl bg-white dark:bg-[#1A2632] border border-[#E8E1D1] dark:border-[#2A3B4A] shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] flex items-center gap-1.5">
                      <Share2 className="w-4 h-4 text-[#B86924] dark:text-[#E6C387]" />
                      診断結果をシェア・保存する
                    </span>
                    <span className="text-[11px] text-[#737C77] dark:text-[#8899A6]">
                      体質の記録や養生法の共有に
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    {/* X (旧Twitter) シェア */}
                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                        `【気血水 体質セルフ診断】私の診断結果は「${selfResult.name}」でした！ 東洋医学の視点で気・血・水のバランスとおすすめ養生法をチェック。\nhttps://www.haritaro.jp/diagnosis\n#ハリタロー #東洋医学 #体質診断`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackEvent("share", { method: "twitter", content_type: "diagnosis_result" })}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-black hover:bg-neutral-800 text-white text-xs font-semibold transition-all shadow-2xs"
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 24.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                      <span>Xでシェア</span>
                    </a>

                    {/* LINE シェア */}
                    <a
                      href={`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(
                        "https://www.haritaro.jp/diagnosis"
                      )}&text=${encodeURIComponent(
                        `【気血水 体質セルフ診断】私の診断結果は「${selfResult.name}」でした！ 東洋医学の視点で気・血・水のバランスとおすすめ養生法をチェックできます。`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackEvent("share", { method: "line", content_type: "diagnosis_result" })}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#06C755] hover:bg-[#05b34c] text-white text-xs font-semibold transition-all shadow-2xs"
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 2C6.48 2 2 5.96 2 10.84c0 3.09 1.79 5.81 4.54 7.37-.2.74-.72 2.7-.82 3.12-.13.52.19.51.4.38.16-.1 2.58-1.74 3.63-2.45.73.11 1.48.18 2.25.18 5.52 0 10-3.96 10-8.84S17.52 2 12 2z" />
                      </svg>
                      <span>LINEで送る</span>
                    </a>

                    {/* URL・結果コピー */}
                    <button
                      type="button"
                      onClick={handleShareCopy}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#FAF8F5] dark:bg-[#121920] border border-[#D5CCBC] dark:border-[#2D3E50] text-[#333D38] dark:text-[#E2ECF2] hover:bg-[#F2EDE4] dark:hover:bg-[#1A2530] text-xs font-semibold transition-all shadow-2xs cursor-pointer"
                    >
                      {copiedShare ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                          <span className="text-emerald-600 dark:text-emerald-400">コピーしました！</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-[#59615D] dark:text-[#A0B0BC]" />
                          <span>結果テキストをコピー</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={handleResetSelf}
                  className="px-6 py-2.5 rounded-xl border border-[#D5CCBC] dark:border-[#2D3E50] text-xs font-semibold text-[#59615D] dark:text-[#A0B0BC] hover:bg-[#FAF8F5] dark:hover:bg-[#1A2530] cursor-pointer"
                >
                  もう一度診断する
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ============================================================== */}
      {/* 2. 対面問診モード（臨床家・患者用） */}
      {/* ============================================================== */}
      {activeTab === "clinical" && (
        <div className="space-y-6 sm:space-y-8 animate-fadeIn max-w-4xl mx-auto">
          {/* ヘッダー・導入 */}
          <div className="bg-white dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-4 sm:p-7 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E5DEC9]/60 dark:border-[#2A3B4A]/60 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E]">
                    <UserCheck className="w-5 h-5" />
                  </span>
                  <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5]">
                    気血水 対面問診モード
                  </h1>
                </div>
                <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] mt-1 leading-relaxed">
                  患者さんへの対面聞き取りを記録し、気血水の偏り傾向を整理する臨床補助ツールです。
                </p>
              </div>

              {/* 前患者の安全リセット・問診終了ボタン */}
              <button
                type="button"
                onClick={handleResetClinical}
                className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#D5CCBC] dark:border-[#2D3E50] text-xs font-bold text-[#59615D] dark:text-[#A0B0BC] hover:bg-[#FEF2F2] dark:hover:bg-[#2A1515] hover:text-[#DC2626] dark:hover:text-[#F87171] transition-all cursor-pointer shrink-0"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>問診を終了・新しい問診を開始</span>
              </button>
            </div>

            {/* 患者識別情報入力欄（任意・カルテ番号等） */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center pt-1">
              <div className="sm:col-span-4">
                <label className="block text-xs font-bold text-[#232826] dark:text-[#FAF8F5] mb-1">
                  患者識別記号・カルテ番号（任意）
                </label>
                <input
                  type="text"
                  value={patientIdentifier}
                  onChange={(e) => setPatientIdentifier(e.target.value)}
                  placeholder="例: #1042 / A様"
                  className="w-full px-3 py-2 rounded-xl text-xs bg-[#FAF8F5] dark:bg-[#121920] border border-[#E5DEC9] dark:border-[#2A3B4A] focus:outline-none focus:ring-1 focus:ring-[#1E3D34] dark:focus:ring-[#74BA9E] text-[#232826] dark:text-[#FAF8F5]"
                />
              </div>

              <div className="sm:col-span-8 flex flex-col justify-end">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                    問診進捗: 確認済み {confirmedCount} / {DIAGNOSIS_QUESTIONS.length} 問
                  </span>
                  <span className="text-[11px] text-[#737C77] dark:text-[#8899A6]">
                    該当: {applicableQuestions.length}件
                  </span>
                </div>
                {/* プログレスバー */}
                <div className="w-full h-2 rounded-full bg-[#EFE9DD] dark:bg-[#1F2C38] overflow-hidden">
                  <div
                    className="h-full bg-[#1E3D34] dark:bg-[#74BA9E] transition-all duration-300"
                    style={{
                      width: `${(confirmedCount / DIAGNOSIS_QUESTIONS.length) * 100}%`,
                    }}
                  />
                </div>
                <span className="text-[10px] text-[#737C77] dark:text-[#8899A6] mt-1">
                  ※プライバシー保護のため、氏名や生年月日等の個人情報は入力しないでください。
                </span>
              </div>
            </div>
          </div>

          {/* 12問の問診カード一覧 */}
          <div className="space-y-3 sm:space-y-4">
            {DIAGNOSIS_QUESTIONS.map((q, idx) => {
              const currentStatus = questionStatuses[q.id] || "unconfirmed";
              const note = questionNotes[q.id] || "";

              return (
                <div
                  key={q.id}
                  className={`p-3.5 sm:p-4 rounded-xl border transition-all ${
                    currentStatus === "applicable"
                      ? "bg-[#FAF8F5] dark:bg-[#1A2632] border-[#1E3D34] dark:border-[#4E8C76] shadow-xs ring-1 ring-[#1E3D34]/30"
                      : currentStatus === "not_applicable"
                      ? "bg-white dark:bg-[#141C24] border-[#E8E1D1]/60 dark:border-[#243342] opacity-75"
                      : currentStatus === "unknown"
                      ? "bg-[#FEFCE8] dark:bg-[#1E2319] border-[#FEF08A] dark:border-[#474D1C]"
                      : "bg-white dark:bg-[#17212A] border-[#E5DEC9] dark:border-[#2A3B4A]"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="flex items-start gap-2.5 flex-1">
                      <span className="w-6 h-6 rounded-md bg-[#FAF8F5] dark:bg-[#121920] border border-[#E5DEC9] dark:border-[#2A3B4A] text-xs font-mono font-bold flex items-center justify-center shrink-0 text-[#1E3D34] dark:text-[#74BA9E] mt-0.5">
                        {idx + 1}
                      </span>
                      <div className="space-y-1">
                        <p
                          className={`text-xs sm:text-sm font-medium leading-relaxed ${
                            currentStatus === "not_applicable"
                              ? "line-through text-[#737C77] dark:text-[#6A7B8C]"
                              : "text-[#232826] dark:text-[#FAF8F5]"
                          }`}
                        >
                          {q.text}
                        </p>
                      </div>
                    </div>

                    {/* 4択ステータスボタングループ */}
                    <div className="inline-flex rounded-lg border border-[#E5DEC9] dark:border-[#2A3B4A] p-0.5 bg-[#FAF8F5] dark:bg-[#121920] shrink-0 self-start sm:self-center">
                      <button
                        type="button"
                        onClick={() => handleSetQuestionStatus(q.id, "unconfirmed")}
                        className={`px-2 py-1 rounded text-[11px] font-bold transition-all cursor-pointer ${
                          currentStatus === "unconfirmed"
                            ? "bg-white dark:bg-[#22303D] text-[#59615D] dark:text-[#A0B0BC] shadow-xs"
                            : "text-[#737C77] dark:text-[#8899A6] hover:text-[#232826]"
                        }`}
                      >
                        未確認
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSetQuestionStatus(q.id, "applicable")}
                        className={`px-2.5 py-1 rounded text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer ${
                          currentStatus === "applicable"
                            ? "bg-[#1E3D34] dark:bg-[#74BA9E] text-white dark:text-[#121920] shadow-xs"
                            : "text-[#1E3D34] dark:text-[#74BA9E] hover:bg-[#EBF3EF] dark:hover:bg-[#1A2A24]"
                        }`}
                      >
                        <Check className="w-3 h-3" />
                        <span>当てはまる</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSetQuestionStatus(q.id, "not_applicable")}
                        className={`px-2 py-1 rounded text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer ${
                          currentStatus === "not_applicable"
                            ? "bg-[#E5DEC9] dark:bg-[#2D3E50] text-[#232826] dark:text-[#FAF8F5] shadow-xs"
                            : "text-[#737C77] dark:text-[#8899A6] hover:bg-[#EFE9DD] dark:hover:bg-[#1A2530]"
                        }`}
                      >
                        <Minus className="w-3 h-3" />
                        <span>該当なし</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSetQuestionStatus(q.id, "unknown")}
                        className={`px-2 py-1 rounded text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer ${
                          currentStatus === "unknown"
                            ? "bg-[#FEF08A] text-[#854D0E] shadow-xs"
                            : "text-[#737C77] dark:text-[#8899A6] hover:bg-[#FEFCE8] dark:hover:bg-[#202517]"
                        }`}
                      >
                        <HelpCircle className="w-3 h-3" />
                        <span>不明</span>
                      </button>
                    </div>
                  </div>

                  {/* 臨床メモ入力欄（任意） */}
                  <div className="mt-2.5 pt-2 border-t border-[#E5DEC9]/40 dark:border-[#2A3B4A]/40 flex items-center gap-2">
                    <MessageSquare className="w-3.5 h-3.5 text-[#737C77] shrink-0" />
                    <input
                      type="text"
                      value={note}
                      onChange={(e) => handleSetQuestionNote(q.id, e.target.value)}
                      placeholder="臨床メモ（いつから、悪化要因、患者の訴えなど）"
                      className="w-full text-[11px] bg-transparent border-b border-transparent hover:border-[#D5CCBC] focus:border-[#1E3D34] dark:focus:border-[#74BA9E] focus:outline-none text-[#232826] dark:text-[#FAF8F5] placeholder-[#9CA3AF] py-0.5"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* 問診集計ボタン */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={handleDiagnoseClinical}
              className="w-full sm:w-auto px-10 py-3.5 rounded-xl bg-[#1E3D34] dark:bg-[#74BA9E] text-white dark:text-[#121920] hover:bg-[#2B5A46] font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <UserCheck className="w-4 h-4" />
              <span>問診結果をまとめる</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* 問診結果表示 */}
          {clinicalResult && (
            <div ref={resultRef} className="space-y-6 pt-4 animate-fadeIn">
              <div className="bg-[#FAF8F5] dark:bg-[#152028] p-5 sm:p-8 rounded-2xl sm:rounded-3xl border-2 border-[#1E3D34] dark:border-[#74BA9E] shadow-md space-y-6">
                <div className="text-center space-y-2 border-b border-[#F2ECE0] dark:border-[#22303D] pb-5">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] text-xs font-bold mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>
                      問診集計完了 {patientIdentifier ? `[ ${patientIdentifier} ]` : ""}
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5]">
                    現在の回答傾向：{clinicalResult.name}
                    <span className="text-base font-sans font-normal text-[#59615D] dark:text-[#8899A6] ml-2">
                      （{clinicalResult.reading}）
                    </span>
                  </h2>
                  <p className="text-xs text-[#737C77] dark:text-[#8899A6] max-w-xl mx-auto pt-1 leading-relaxed">
                    ※回答から状態の傾向を整理する補助ツールです。回答だけで診断や施術方針は確定しません。
                  </p>
                  <p className="text-sm text-[#59615D] dark:text-[#A0B0BC] max-w-lg mx-auto pt-2">
                    {clinicalResult.summary}
                  </p>
                </div>

                {/* 該当した自覚症状と臨床メモ */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-white dark:bg-[#1A2632] border border-[#E8E1D1] dark:border-[#2A3B4A] space-y-2">
                    <span className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] flex items-center gap-1.5">
                      <Check className="w-4 h-4" />
                      「当てはまる」と回答された項目（{applicableQuestions.length}件）
                    </span>
                    {applicableQuestions.length === 0 ? (
                      <p className="text-xs text-[#737C77] dark:text-[#8899A6]">
                        明らかな該当症状の選択はありませんでした。
                      </p>
                    ) : (
                      <ul className="text-xs text-[#59615D] dark:text-[#A0B0BC] space-y-1.5 pl-4 list-disc">
                        {applicableQuestions.map((q) => (
                          <li key={q.id}>
                            <span>{q.text}</span>
                            {questionNotes[q.id] && (
                              <span className="block text-[11px] text-[#B86924] dark:text-[#E6C387] font-semibold mt-0.5">
                                ↳ メモ: {questionNotes[q.id]}
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="p-4 rounded-xl bg-white dark:bg-[#1A2632] border border-[#E8E1D1] dark:border-[#2A3B4A] space-y-2">
                    <span className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] flex items-center gap-1.5">
                      <Utensils className="w-4 h-4" />
                      おすすめの食材・養生方針
                    </span>
                    <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                      {clinicalResult.advice.food.join("、")}
                    </p>
                    <span className="text-[11px] text-[#737C77] dark:text-[#8899A6] block pt-1">
                      生活養生: {clinicalResult.advice.lifestyle}
                    </span>
                    <span className="text-[11px] text-[#1E3D34] dark:text-[#74BA9E] font-bold block pt-1">
                      参考経穴: {clinicalResult.advice.tsubo.join("、")}
                    </span>
                  </div>
                </div>

                {/* 臨床アクション群 */}
                <div className="space-y-3 pt-2">
                  {/* アクション1: 患者さんに説明する（対面説明ビュー） */}
                  <div className="p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#152028] border-2 border-[#1E3D34] dark:border-[#74BA9E] flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#1E3D34] text-white flex items-center justify-center shrink-0">
                        <Eye className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] block">
                            患者さんに説明する（対面説明クリーンビュー）
                          </span>
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#1E3D34] text-white">
                            ベッドサイド用
                          </span>
                        </div>
                        <span className="text-[11px] text-[#59615D] dark:text-[#A0B0BC] block mt-0.5">
                          内部メモや広告を非表示にし、患者さんに見せられる大きな文字の解説画面を展開します。
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        handleOpenPatientModal(
                          clinicalResult,
                          applicableQuestions.map((q) => q.text)
                        )
                      }
                      className="px-4 py-2.5 rounded-xl bg-[#1E3D34] hover:bg-[#2B5A46] text-white text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 shadow-sm whitespace-nowrap cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>説明画面を表示</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* アクション2: 臨床ノートへ残す */}
                  <div className="p-4 rounded-xl bg-white dark:bg-[#17212A] border border-[#1E3D34]/30 dark:border-[#74BA9E]/40 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[#1E3D34] text-white flex items-center justify-center shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] block">
                          この問診内容を臨床ノートに記録する
                        </span>
                        <span className="text-[11px] text-[#59615D] dark:text-[#A0B0BC] block mt-0.5">
                          患者識別記号・回答結果・臨床メモを下書きとして臨床ノートへ安全に引き継ぎます。
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleSaveToNoteDraft(true)}
                      className="px-4 py-2.5 rounded-xl bg-[#1E3D34] hover:bg-[#2B5A46] text-white text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 shadow-sm whitespace-nowrap cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>臨床ノートに残す</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* アクション3: シミュレーター連携 */}
                  {clinicalResult.type !== "neutral" && (
                    <div className="p-3.5 rounded-xl bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] flex flex-col sm:flex-row items-center justify-between gap-2.5">
                      <span className="text-xs text-[#59615D] dark:text-[#A0B0BC]">
                        この傾向に基づき、シミュレーターで八綱・臓腑の連動配穴を検証できます。
                      </span>
                      <button
                        type="button"
                        onClick={() => handleGoToSimulator(clinicalResult)}
                        className="px-3.5 py-1.5 rounded-lg bg-[#FAF8F5] dark:bg-[#1F2C38] border border-[#E5DEC9] dark:border-[#2D3E50] text-[#1E3D34] dark:text-[#74BA9E] text-xs font-bold hover:bg-[#EFE9DD] dark:hover:bg-[#283949] transition-all shrink-0 flex items-center gap-1 cursor-pointer"
                      >
                        <Layers className="w-3.5 h-3.5" />
                        <span>シミュレーターで検証</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ============================================================== */}
      {/* 3. 五労チェッカー */}
      {/* ============================================================== */}
      {activeTab === "gorou" && (
        <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto">
          {/* 導入ヘッダー */}
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FCF4EB] dark:bg-[#2A2117] border border-[#F3E1CB] dark:border-[#423321] text-[#B86924] dark:text-[#E6C387] text-xs font-semibold tracking-wider">
              <Activity className="w-3.5 h-3.5 text-[#B86924]" />
              <span>『素問』宣明五気篇準拠 動作偏向・中庸セルフケア</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5] tracking-tight">
              五労チェッカー（久視・久臥・久坐・久立・久行）
            </h1>
            <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
              「久視（長時間の画面注視）」「久坐（長時間の座位）」「久立（立ち仕事）」「久行（歩き回り）」「久臥（休日の寝だめ）」の偏り動作から、五臓への負担傾向を整理し、<strong className="text-[#1E3D34] dark:text-[#74BA9E]">「五行を回す中庸セルフケア」</strong>を提案します。
            </p>
          </div>

          <GorouWorkstyleChecker />
        </div>
      )}

      {/* ============================================================== */}
      {/* 4. 「患者さんに説明する」クリーン対面説明モーダル */}
      {/* ============================================================== */}
      {isPatientModalOpen && patientModalData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-fadeIn overflow-y-auto">
          <div className="bg-[#FAF8F5] text-[#232826] w-full max-w-3xl rounded-3xl border-2 border-[#1E3D34] shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
            {/* モーダルヘッダー */}
            <div className="px-5 sm:px-8 py-4 sm:py-5 bg-white border-b border-[#E5DEC9] flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#1E3D34]" />
                <span className="text-xs font-bold text-[#1E3D34] tracking-wider uppercase">
                  東洋医学 体質バランス説明シート
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsPatientModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#FAF8F5] hover:bg-[#EFE9DD] text-[#59615D] flex items-center justify-center transition-all cursor-pointer"
                aria-label="閉じる"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* モーダル本文（患者向けクリーン表示：広告・課金・内部メモなし） */}
            <div className="p-5 sm:p-8 overflow-y-auto space-y-6 text-left">
              {/* 体質傾向タイトル */}
              <div className="text-center space-y-2 pb-2">
                <span className="text-xs text-[#737C77] font-bold">
                  本日の問診からみられるバランス傾向
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#1E3D34]">
                  {patientModalData.result.name}
                </h3>
                <p className="text-xs text-[#59615D] font-bold">
                  （{patientModalData.result.reading}）
                </p>
                <p className="text-sm text-[#404743] leading-relaxed max-w-xl mx-auto pt-1">
                  {patientModalData.result.summary}
                </p>
              </div>

              {/* 当てはまった身体のサイン */}
              {patientModalData.applicableSymptoms.length > 0 && (
                <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E5DEC9] space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#1E3D34]">
                    <HeartPulse className="w-4 h-4" />
                    <span>本日確認した主な身体のサイン</span>
                  </div>
                  <ul className="text-xs text-[#404743] space-y-1.5 pl-4 list-disc leading-relaxed">
                    {patientModalData.applicableSymptoms.map((s, idx) => (
                      <li key={idx}>{s}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* おすすめの生活養生・食材 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E5DEC9] space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#1E3D34]">
                    <Utensils className="w-4 h-4" />
                    <span>おすすめの食材</span>
                  </div>
                  <p className="text-xs text-[#404743] leading-relaxed">
                    {patientModalData.result.advice.food.join("、")}
                  </p>
                </div>

                <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E5DEC9] space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#1E3D34]">
                    <Sparkles className="w-4 h-4" />
                    <span>日常の養生アドバイス</span>
                  </div>
                  <p className="text-xs text-[#404743] leading-relaxed">
                    {patientModalData.result.advice.lifestyle}
                  </p>
                </div>
              </div>

              {/* ご自宅でできる簡単ツボ押し */}
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E5DEC9] space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#1E3D34]">
                  <Activity className="w-4 h-4" />
                  <span>ご自宅でできるおすすめのツボ</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {patientModalData.result.advice.tsubo.map((tsuboName, idx) => {
                    const found = TSUBOS.find((t) => t.name === tsuboName);
                    return (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E5DEC9] space-y-1 text-xs"
                      >
                        <span className="font-bold text-[#1E3D34] block text-sm">
                          {tsuboName}
                          {found && (
                            <span className="text-[10px] text-[#737C77] font-normal ml-1">
                              （{found.meridianShort}）
                            </span>
                          )}
                        </span>
                        <p className="text-[11px] text-[#59615D] leading-tight">
                          {found ? found.locationSimple : "指で心地よい強さで押してください。"}
                        </p>
                      </div>
                    );
                  })}
                </div>
                <p className="text-[11px] text-[#737C77] leading-relaxed">
                  ※ツボを押すときは「痛気持ちいい」と感じる強さで、深呼吸しながら5秒押してゆっくり離す動作を3回ほど繰り返してください。
                </p>
              </div>

              {/* 免責注記 */}
              <div className="text-center pt-1 text-[11px] text-[#737C77] leading-relaxed">
                ※本内容は体質の傾向を整理したセルフケアの目安です。確定的な病気の診断や施術効果を保証するものではありません。
              </div>
            </div>

            {/* モーダルフッター */}
            <div className="px-6 py-4 bg-white border-t border-[#E5DEC9] flex items-center justify-between shrink-0">
              <span className="text-[11px] text-[#737C77]">
                ベッドサイドで患者さんへ直接画面をお見せできる対面説明ビューです
              </span>
              <button
                type="button"
                onClick={() => setIsPatientModalOpen(false)}
                className="px-5 py-2 rounded-xl bg-[#1E3D34] hover:bg-[#2B5A46] text-white text-xs font-bold transition-all cursor-pointer"
              >
                説明画面を閉じる
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 5. 東洋医学診断学（脈診・腹診・舌診）学術講義録セクション */}
      {/* ============================================================== */}
      <section className="border-t border-[#E8E1D1] dark:border-[#22303D] pt-12 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Academic Articles: Diagnostic Science</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5]">
              東洋医学の診断学（四診）を自然科学で深掘りする
            </h2>
            <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] mt-1 leading-relaxed max-w-2xl">
              東洋医学の四診（望・聞・問・切）の中でも、脈診・腹診・舌診は生体シグナルの解読技術です。現代の血行動態学・生体力学・画像解析と融合した学術解説記事を公開しています。
            </p>
          </div>
          <Link
            href="/articles"
            className="text-xs font-semibold text-[#1E3D34] dark:text-[#74BA9E] hover:underline flex items-center gap-1 shrink-0"
          >
            <span>知見・論文一覧へ</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* 脈診 */}
          <Link
            href="/articles/science-of-pulse-diagnosis"
            className="bg-[#FFFFFF] dark:bg-[#17212A] p-5 rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] hover:border-[#1E3D34] dark:hover:border-[#4E8C76] hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-end text-xs text-[#737C77] dark:text-[#8899A6]">
                <span className="text-[11px]">約 16分</span>
              </div>
              <h3 className="font-sans text-base font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] transition-colors leading-relaxed tracking-normal">
                【脈診の科学】橈骨動脈拍動の血行動態学と生体情報解析
              </h3>
              <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed line-clamp-3">
                動脈弾性、末梢血管抵抗、脈波伝播速度（PWV）、血管ツリー共鳴理論から浮・沈・遅・数・滑・濇・弦・緊・微・代などの脈象を血行動態学的にモデル化。
              </p>
            </div>
            <div className="pt-3 mt-3 border-t border-[#F2ECE0] dark:border-[#22303D] flex items-center justify-between text-xs text-[#1E3D34] dark:text-[#74BA9E] font-semibold">
              <span>記事を読む</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>

          {/* 腹診 */}
          <Link
            href="/articles/science-of-abdominal-diagnosis"
            className="bg-[#FFFFFF] dark:bg-[#17212A] p-5 rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] hover:border-[#1E3D34] dark:hover:border-[#4E8C76] hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-end text-xs text-[#737C77] dark:text-[#8899A6]">
                <span className="text-[11px]">約 14分</span>
              </div>
              <h3 className="font-sans text-base font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] transition-colors leading-relaxed tracking-normal">
                【腹診の科学】内臓体制反射・腹壁筋緊張度と自律神経評価
              </h3>
              <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed line-clamp-3">
                心下痞鞕、胸脇苦満、小腹急結、腹皮拘急などの腹証を内臓体制反射、腹膜機械受容器、迷走神経求心路、腸脳相関から解明。
              </p>
            </div>
            <div className="pt-3 mt-3 border-t border-[#F2ECE0] dark:border-[#22303D] flex items-center justify-between text-xs text-[#1E3D34] dark:text-[#74BA9E] font-semibold">
              <span>記事を読む</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>

          {/* 舌診 */}
          <Link
            href="/articles/science-of-tongue-diagnosis"
            className="bg-[#FFFFFF] dark:bg-[#17212A] p-5 rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] hover:border-[#1E3D34] dark:hover:border-[#4E8C76] hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-end text-xs text-[#737C77] dark:text-[#8899A6]">
                <span className="text-[11px]">約 13分</span>
              </div>
              <h3 className="font-sans text-base font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] transition-colors leading-relaxed tracking-normal">
                【舌診の科学】舌質微小循環と舌苔マイクロバイオーム
              </h3>
              <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed line-clamp-3">
                舌質の色調（淡白・紅・紫）と粘膜血流、舌苔（白・黄・厚・剥）と細菌叢・サイトカイン動態、AI画像解析による客観的診断基準を体系化。
              </p>
            </div>
            <div className="pt-3 mt-3 border-t border-[#F2ECE0] dark:border-[#22303D] flex items-center justify-between text-xs text-[#1E3D34] dark:text-[#74BA9E] font-semibold">
              <span>記事を読む</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}

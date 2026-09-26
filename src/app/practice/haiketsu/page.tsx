"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  SlidersHorizontal, 
  ArrowLeft, 
  Bookmark, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  Crown, 
  Lock, 
  Scissors, 
  Plus, 
  X, 
  HelpCircle,
  BookOpen,
  Zap,
  TrendingUp,
  FileText
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useClinicalMemo } from "@/contexts/ClinicalMemoContext";
import AuthModal from "@/components/auth/AuthModal";
import { 
  ACUPOINT_ROLES, 
  analyzePrescription, 
  OVERDOSE_PRESETS,
  AcupointRoleMetadata 
} from "@/data/haiketsuData";
import { saveDraftPatientNote } from "@/utils/draftNote";
import { HACHIMYAKU_PAIRS } from "@/data/kikeiData";

export default function HaiketsuPracticePage() {
  const router = useRouter();
  const { isPremium } = useAuth();
  const { addMemo } = useClinicalMemo();

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [selectedPointIds, setSelectedPointIds] = useState<string[]>(["taishou", "gokoku"]); // 初期: 四関穴
  const [prescriptionTitle, setPrescriptionTitle] = useState("四関開竅・自律神経調整処方");
  const [rationaleText, setRationaleText] = useState("太衝（足厥陰肝経・原穴）で肝気鬱結を疏通させ、合谷（手陽明大腸経・原穴）で気機の昇降を助け、全身の気血巡行を調和させる。");
  const [saved, setSaved] = useState(false);

  // 選択中ツボの分析結果
  const analysis = useMemo(() => {
    return analyzePrescription(selectedPointIds);
  }, [selectedPointIds]);

  // 全ツボ一覧リスト
  const allPoints = useMemo(() => {
    return Object.values(ACUPOINT_ROLES);
  }, []);

  // ツボの追加/削除（プレミアム限定）
  const togglePoint = (id: string) => {
    if (!isPremium) {
      setAuthModalOpen(true);
      return;
    }
    if (selectedPointIds.includes(id)) {
      setSelectedPointIds(selectedPointIds.filter(p => p !== id));
      setSaved(false);
    } else {
      if (selectedPointIds.length >= 8) {
        alert("演習で選択できる経穴は最大8穴までです。");
        return;
      }
      setSelectedPointIds([...selectedPointIds, id]);
      setSaved(false);
    }
  };

  // プリセットの読み込み（プレミアム限定）
  const handleLoadPreset = (presetId: string) => {
    if (!isPremium) {
      setAuthModalOpen(true);
      return;
    }
    const p = OVERDOSE_PRESETS.find(caseItem => caseItem.id === presetId);
    if (p) {
      setSelectedPointIds(p.initialPointIds);
      setPrescriptionTitle(p.name);
      setRationaleText(`【症候】${p.symptomSummary}\n【課題】${p.mistakePattern}`);
      setSaved(false);
    }
  };

  
  // 臨床ノート（患者ノート）への下書き引き渡し
  const handleSaveToNoteDraft = () => {
    const pointNames = selectedPointIds.map(id => ACUPOINT_ROLES[id]?.name || id);
    saveDraftPatientNote({
      sourceTool: "配穴設計",
      selectedPointsInput: pointNames.join(", "),
      treatmentPlan: `【配穴設計処方】\n処方名: ${prescriptionTitle || "自作配穴処方"}\n選定理由・方針: ${rationaleText || "未記入"}\n構成分析: 本治${analysis.rootCount}穴・標治${analysis.branchCount}穴（計${pointNames.length}穴）\n※配穴設計演習からの下書きです。確定診断や固定意図ではありません。`,
    });
    router.push("/notes");
  };

  // マイノートに保存（プレミアム限定）
  const handleSaveToMemo = () => {
    if (!isPremium) {
      setAuthModalOpen(true);
      return;
    }
    const pointNames = selectedPointIds.map(id => ACUPOINT_ROLES[id]?.name || id);
    addMemo({
      id: `haiketsu-${Date.now()}`,
      type: "pair",
      title: prescriptionTitle || "自作配穴処方",
      subTitle: `配穴構成: 本治${analysis.rootCount}穴・標治${analysis.branchCount}穴（計${pointNames.length}穴）`,
      points: pointNames,
      elements: ["木", "金"],
      indications: ["自律神経調整", "気滞血瘀"],
      summary: rationaleText || "選定理由未記入",
      mechanism: `構成分析: 本治${analysis.rootCount}穴 / 標治${analysis.branchCount}穴（${analysis.status === "optimal" ? "少数精鋭" : "標準"}）`,
      personalNotes: `配穴演習にて設計 (${new Date().toLocaleDateString("ja-JP")})`
    });
    setSaved(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#10161C] text-[#232826] dark:text-[#FAF8F5]">
      {/* ヒーローヘッダー */}
      <div className="bg-white dark:bg-[#17212A] border-b border-[#E5DEC9] dark:border-[#2A3B4A] py-10 sm:py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#FCF4EB] dark:bg-[#2A1E14] text-[#B86924] dark:text-[#E6C387] border border-[#F3DEC5] dark:border-[#4A321E]">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>基本32穴 配穴構成演習</span>
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] font-medium border border-[#C5DED4] dark:border-[#2A5243]">
              本治・標治バランスと選定理由の整理
            </span>
          </div>

          <div className="space-y-2">
            <h1 className="font-serif text-2xl sm:text-4xl font-bold text-[#232826] dark:text-[#FAF8F5]">
              配穴設計・臨床演習
            </h1>
            <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#96A6B2] max-w-2xl leading-relaxed">
              基本32穴の中から目的に応じた経穴を選定し、本治穴（体質根本）と標治穴（局所対症）のバランスや昇降・寒熱の方向性を整理します。選定理由を自ら言語化し、教材の代表例と比較して推論力を高める練習です。
            </p>
          </div>

          {/* このツールでできること（3ステップ）＆ こんな人におすすめ */}
          <div className="bg-white dark:bg-[#152028] rounded-2xl sm:rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-4 sm:p-6 shadow-xs space-y-4 max-w-4xl text-left">
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
                  <span>主治から穴を選ぶ</span>
                </div>
                <p className="text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                  基本32穴の中から本治穴（体質根本）と標治穴（局所対症）を直感的に選択。
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FAF8F5] dark:bg-[#10171F] border border-[#E8E1D1] dark:border-[#22303D] space-y-1">
                <div className="flex items-center gap-2 font-bold text-[#232826] dark:text-[#FAF8F5]">
                  <span className="w-5 h-5 rounded-full bg-[#B86924] text-white flex items-center justify-center text-xs font-mono">2</span>
                  <span>教材の模範配穴と比較</span>
                </div>
                <p className="text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                  少数精鋭の調和バランスや多穴過剰傾向をリアルタイム解析モデルで検証。
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FAF8F5] dark:bg-[#10171F] border border-[#E8E1D1] dark:border-[#22303D] space-y-1">
                <div className="flex items-center gap-2 font-bold text-[#232826] dark:text-[#FAF8F5]">
                  <span className="w-5 h-5 rounded-full bg-[#2B6958] text-white flex items-center justify-center text-xs font-mono">3</span>
                  <span>選定根拠をノートに保存</span>
                </div>
                <p className="text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                  なぜその経穴を選んだのかの臨床理由を言語化し、学習ノートへワンクリック保存。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
        
        {/* 無料体験案内バナー */}
        {!isPremium && (
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#FAF8F5] to-[#FCF4EB] dark:from-[#17212A] dark:to-[#221810] border border-[#F3DEC5] dark:border-[#4D331F] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FCF4EB] dark:bg-[#2A1E14] text-[#B86924] dark:text-[#E6C387] flex items-center justify-center shrink-0">
                <Crown className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-[#B86924] dark:text-[#E6C387] block">
                  無料体験モード（基本配穴の閲覧）
                </span>
                <p className="text-xs text-[#59615D] dark:text-[#96A6B2]">
                  現在は代表的な基本配穴「四関穴」の構成と解説を閲覧できます。自作配穴の作成、選定理由の言語化、多穴教材比較、学習ノート保存はプレミアム限定です。
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setAuthModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-[#1E3D34] hover:bg-[#2B6958] text-white text-xs font-bold shrink-0 transition-colors shadow-sm cursor-pointer min-h-[44px]"
            >
              プレミアムで全解放
            </button>
          </div>
        )}

        {/* 比較検討用ケース */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#737C77] dark:text-[#8899A6] block">
              比較検討用ケース（多穴構成・複合所見の整理例）:
            </span>
            {!isPremium && (
              <span className="text-[10px] text-[#B86924] dark:text-[#E6C387] font-semibold flex items-center gap-1">
                <Crown className="w-3 h-3" />
                <span>教材比較はプレミアム限定</span>
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {OVERDOSE_PRESETS.map(preset => (
              <button
                key={preset.id}
                onClick={() => handleLoadPreset(preset.id)}
                className="text-xs px-3 py-1.5 rounded-xl bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] hover:border-[#B86924] text-[#59615D] dark:text-[#96A6B2] transition-colors flex items-center gap-1.5"
              >
                {!isPremium && <Crown className="w-3 h-3 text-[#B86924] dark:text-[#E6C387]" />}
                <span>📋 {preset.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* メイングリッド：左＝配穴分析・処方入力、右＝ツボ選択パレット */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* 左カラム：現在の処方・リアルタイム分析（7カラム） */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* スコア・ステータスカード（点数による断定を排し、構成バランスの可視化へ） */}
            <div className="bg-white dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-5 sm:p-6 shadow-sm space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#737C77] dark:text-[#8899A6] block font-medium">
                    配穴の構成バランス（教材モデル分析）
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-sm sm:text-base font-bold px-3 py-1 rounded-full ${
                      analysis.status === "optimal" 
                        ? "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300" 
                        : analysis.status === "acceptable"
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300"
                        : "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                    }`}>
                      {analysis.status === "optimal" ? "調和（少数精鋭構成）" : analysis.status === "acceptable" ? "標準的構成" : "多穴・要精査"}
                    </span>
                    <span className="text-[11px] text-[#737C77] dark:text-[#8899A6]">
                      ※臨床効果の断定ではなく教材例との対比指標
                    </span>
                  </div>
                </div>

                <div className="text-right text-xs text-[#737C77] dark:text-[#8899A6]">
                  <p>選択中: <strong className="text-[#232826] dark:text-[#FAF8F5] text-base">{selectedPointIds.length}</strong> 穴</p>
                  <p className="text-[11px] mt-0.5">（基本32穴パレット）</p>
                </div>
              </div>

              {/* 本治 vs 標治 比率バー */}
              <div className="space-y-1.5 pt-2 border-t border-[#E5DEC9] dark:border-[#2A3B4A]">
                <div className="flex justify-between text-xs">
                  <span className="text-[#1E3D34] dark:text-[#74BA9E] font-bold">
                    本治（体質根本）: {analysis.rootCount}穴
                  </span>
                  <span className="text-[#B86924] dark:text-[#E6C387] font-bold">
                    標治（局所対症）: {analysis.branchCount}穴
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#E5DEC9] dark:bg-[#2A3B4A] overflow-hidden flex">
                  <div 
                    className="h-full bg-[#1E3D34] dark:bg-[#74BA9E]"
                    style={{ width: `${selectedPointIds.length > 0 ? analysis.rootRatio : 50}%` }}
                  />
                  <div 
                    className="h-full bg-[#B86924] dark:bg-[#E6C387]"
                    style={{ width: `${selectedPointIds.length > 0 ? 100 - analysis.rootRatio : 50}%` }}
                  />
                </div>
              </div>

              {/* 警告・相殺アラート */}
              {analysis.alerts.length > 0 && (
                <div className="space-y-2 pt-2">
                  {analysis.alerts.map(alert => (
                    <div 
                      key={alert.id}
                      className={`p-3.5 rounded-xl border text-xs space-y-1 ${
                        alert.severity === "high"
                          ? "bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-900 text-red-900 dark:text-red-200"
                          : "bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900 text-amber-900 dark:text-amber-200"
                      }`}
                    >
                      <div className="flex items-center gap-1.5 font-bold">
                        <AlertTriangle className="w-4 h-4 shrink-0" />
                        <span>{alert.title}</span>
                      </div>
                      <p className="leading-relaxed opacity-90">{alert.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 選択されたツボのカードリスト */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-[#737C77] dark:text-[#8899A6] block">
                現在処方に組み込まれている経穴:
              </span>
              {selectedPointIds.length === 0 ? (
                <div className="p-8 text-center bg-white dark:bg-[#17212A] rounded-2xl border border-dashed border-[#E5DEC9] dark:border-[#2A3B4A] text-xs text-[#737C77]">
                  右側のパレットからツボをクリックして配穴を構成してください
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedPointIds.map(id => {
                    const role = ACUPOINT_ROLES[id];
                    if (!role) return null;
                    return (
                      <div
                        key={id}
                        className="bg-white dark:bg-[#17212A] rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-3.5 shadow-2xs flex items-start justify-between gap-2"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5">
                            <span className="font-serif font-bold text-sm text-[#232826] dark:text-[#FAF8F5]">
                              {role.name}
                            </span>
                            <span className="text-[10px] text-[#737C77] dark:text-[#8899A6]">
                              {role.code}
                            </span>
                            <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                              role.tier === "root"
                                ? "bg-[#EBF3EF] text-[#1E3D34] dark:bg-[#182823] dark:text-[#74BA9E]"
                                : "bg-[#FCF4EB] text-[#B86924] dark:bg-[#2A1E14] dark:text-[#E6C387]"
                            }`}>
                              {role.tierLabel}
                            </span>
                          </div>
                          <p className="text-[11px] text-[#59615D] dark:text-[#96A6B2] leading-tight">
                            {role.specificRole} / {role.energyLabel}
                          </p>
                        </div>

                        <button
                          onClick={() => togglePoint(id)}
                          className="p-1 rounded text-[#737C77] hover:text-red-600 transition-colors"
                          title="このツボを処方から外す"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 処方名 ＆ 選定理由入力フォーム */}
            <div className="bg-white dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-5 sm:p-6 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#F2ECE0] dark:border-[#22303D]">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#B86924]" />
                    <h3 className="font-serif text-sm sm:text-base font-bold text-[#232826] dark:text-[#FAF8F5]">
                      臨床選定理由の言語化
                    </h3>
                  </div>
                  <p className="text-[11px] text-[#59615D] dark:text-[#96A6B2]">
                    選択した配穴と選定理由を学習ノートに保存し、いつでも参照・復習できます。
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={handleSaveToNoteDraft}
                    disabled={selectedPointIds.length === 0}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#1E3D34] hover:bg-[#2B5A46] text-white text-xs font-bold shadow-sm transition-all cursor-pointer disabled:opacity-50"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>この内容を臨床ノートに残す</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveToMemo}
                    disabled={saved || selectedPointIds.length === 0}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#B86924] hover:bg-[#9B551B] text-white text-xs font-bold shadow-sm transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${saved ? "fill-current" : ""}`} />
                    <span>{saved ? "配穴集に保存済" : "配穴集に保存"}</span>
                  </button>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-[#737C77] dark:text-[#8899A6] block mb-1">
                    処方名・タイトル
                  </label>
                  <input
                    type="text"
                    value={prescriptionTitle}
                    readOnly={!isPremium}
                    onClick={() => { if (!isPremium) setAuthModalOpen(true); }}
                    onChange={e => {
                      if (!isPremium) { setAuthModalOpen(true); return; }
                      setPrescriptionTitle(e.target.value);
                      setSaved(false);
                    }}
                    placeholder="例: 頑固な自律神経失調・昇降調和処方"
                    className={`w-full px-3 py-2 rounded-xl border text-[#232826] dark:text-[#FAF8F5] ${
                      !isPremium ? "bg-gray-50 dark:bg-[#151D24] border-dashed border-[#E5DEC9] cursor-pointer" : "bg-[#FAF8F5] dark:bg-[#121920] border-[#E5DEC9] dark:border-[#2A3B4A]"
                    }`}
                  />
                </div>

                <div>
                  <label className="font-bold text-[#737C77] dark:text-[#8899A6] block mb-1">
                    この配穴を選定した理由・狙う作用機序
                  </label>
                  <textarea
                    value={rationaleText}
                    readOnly={!isPremium}
                    onClick={() => { if (!isPremium) setAuthModalOpen(true); }}
                    onChange={e => {
                      if (!isPremium) { setAuthModalOpen(true); return; }
                      setRationaleText(e.target.value);
                      setSaved(false);
                    }}
                    placeholder="なぜ主穴を太衝にしたのか、なぜ合谷と組み合わせたのか、患者のどのような病態にアプローチするのかを記述..."
                    rows={4}
                    className={`w-full px-3 py-2 rounded-xl border text-[#232826] dark:text-[#FAF8F5] leading-relaxed ${
                      !isPremium ? "bg-gray-50 dark:bg-[#151D24] border-dashed border-[#E5DEC9] cursor-pointer" : "bg-[#FAF8F5] dark:bg-[#121920] border-[#E5DEC9] dark:border-[#2A3B4A]"
                    }`}
                  />
                  {!isPremium && (
                    <p className="text-[10px] text-[#B86924] dark:text-[#E6C387] mt-1 flex items-center gap-1">
                      <Crown className="w-3 h-3" />
                      <span>自作配穴・選定理由の自由記述はプレミアム限定です</span>
                    </p>
                  )}
                </div>
              </div>
            </div>

          </div>

          {/* 右カラム：ツボ選択パレット（5カラム） */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-5 shadow-sm space-y-4 sticky top-16">
              <div className="flex items-center justify-between">
                <span className="font-serif font-bold text-sm text-[#232826] dark:text-[#FAF8F5]">
                  臨床重要要穴パレット
                </span>
                <span className="text-[11px] text-[#737C77] dark:text-[#8899A6]">
                  {isPremium ? "クリックで追加・解除" : "ツボ選択はプレミアム"}
                </span>
              </div>

              {/* 検索・絞り込み */}
              <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
                {allPoints.map(point => {
                  const isSelected = selectedPointIds.includes(point.id);
                  return (
                    <button
                      key={point.id}
                      onClick={() => togglePoint(point.id)}
                      className={`w-full text-left p-2.5 rounded-xl border text-xs transition-all flex items-center justify-between gap-2 ${
                        isSelected
                          ? "bg-[#FCF4EB] dark:bg-[#2A1E14] border-[#B86924] text-[#B86924] dark:text-[#E6C387] font-bold shadow-2xs"
                          : "bg-[#FAF8F5] dark:bg-[#131B22] border-[#E5DEC9] dark:border-[#2A3B4A] text-[#59615D] dark:text-[#96A6B2] hover:border-[#B86924]"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-serif font-bold text-sm text-[#232826] dark:text-[#FAF8F5]">
                          {point.name}
                        </span>
                        <span className="text-[10px] text-[#737C77]">
                          {point.code}
                        </span>
                        <span className="text-[10px] text-[#737C77]">
                          {point.meridianShort}
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-white dark:bg-[#1A2530] border border-[#E5DEC9] dark:border-[#2A3B4A]">
                          {point.energyLabel}
                        </span>
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-[#B86924]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* 認証・アップグレードモーダル */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        title="配穴設計・臨床演習 プレミアム機能"
        description="自作配穴の自由な組み立て・選定理由の言語化・教材比較ケースの全演習・学習ノート保存はプレミアム会員限定機能です。"
      />
    </div>
  );
}

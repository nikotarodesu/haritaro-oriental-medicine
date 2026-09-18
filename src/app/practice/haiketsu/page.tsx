"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
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
import { HACHIMYAKU_PAIRS } from "@/data/kikeiData";

export default function HaiketsuPracticePage() {
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

  // ツボの追加/削除
  const togglePoint = (id: string) => {
    if (selectedPointIds.includes(id)) {
      setSelectedPointIds(selectedPointIds.filter(p => p !== id));
      setSaved(false);
    } else {
      if (!isPremium && selectedPointIds.length >= 4) {
        setAuthModalOpen(true);
        return;
      }
      setSelectedPointIds([...selectedPointIds, id]);
      setSaved(false);
    }
  };

  // プリセットの読み込み
  const handleLoadPreset = (presetId: string) => {
    const p = OVERDOSE_PRESETS.find(caseItem => caseItem.id === presetId);
    if (p) {
      setSelectedPointIds(p.initialPointIds);
      setPrescriptionTitle(p.name);
      setRationaleText(`【症候】${p.symptomSummary}\n【課題】${p.mistakePattern}`);
      setSaved(false);
    }
  };

  // マイカルテに保存
  const handleSaveToMemo = () => {
    const pointNames = selectedPointIds.map(id => ACUPOINT_ROLES[id]?.name || id);
    addMemo({
      id: `haiketsu-${Date.now()}`,
      type: "pair",
      title: prescriptionTitle || "自作配穴処方",
      subTitle: `配穴純度スコア: ${analysis.purityScore}点（${pointNames.length}穴）`,
      points: pointNames,
      elements: ["木", "金"],
      indications: ["自律神経調整", "気滞血瘀"],
      summary: rationaleText || "選定理由未記入",
      mechanism: `分析ステータス: ${analysis.statusText}（本治${analysis.rootCount}穴 / 標治${analysis.branchCount}穴）`,
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
              <span>処方設計＆剪定エンジン</span>
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] font-medium border border-[#C5DED4] dark:border-[#2A5243]">
              リアルタイム純度スコア・エネルギー衝突検知
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-2">
              <h1 className="font-serif text-2xl sm:text-4xl font-bold text-[#232826] dark:text-[#FAF8F5]">
                配穴設計・臨床演習
              </h1>
              <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#96A6B2] max-w-2xl leading-relaxed">
                「たくさん刺せば効く」という錯覚を脱却し、本治穴と標治穴のバランス、昇降・寒熱のエネルギーベクトルを精密にシミュレーション。選定理由を自ら言語化し、教材名配穴と比較検証できます。
              </p>
            </div>

            <button
              onClick={handleSaveToMemo}
              disabled={saved || selectedPointIds.length === 0}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#B86924] hover:bg-[#9B551B] text-white text-xs sm:text-sm font-bold shadow-sm transition-colors cursor-pointer shrink-0"
            >
              <Bookmark className={`w-4 h-4 ${saved ? "fill-current" : ""}`} />
              <span>{saved ? "マイカルテに保存済" : "この処方をカルテ保存"}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
        
        {/* 過密配穴プリセット学習（初心者が陥りがちな失敗パターン） */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-[#737C77] dark:text-[#8899A6] block">
            典型的な「ツボ詰め込みすぎ（過密・相殺）」失敗例をロードして剪定演習:
          </span>
          <div className="flex flex-wrap gap-2">
            {OVERDOSE_PRESETS.map(preset => (
              <button
                key={preset.id}
                onClick={() => handleLoadPreset(preset.id)}
                className="text-xs px-3 py-1.5 rounded-xl bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] hover:border-[#B86924] text-[#59615D] dark:text-[#96A6B2] transition-colors"
              >
                ⚠️ {preset.name}
              </button>
            ))}
          </div>
        </div>

        {/* メイングリッド：左＝配穴分析・処方入力、右＝ツボ選択パレット */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* 左カラム：現在の処方・リアルタイム分析（7カラム） */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* スコア・ステータスカード */}
            <div className="bg-white dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-5 sm:p-6 shadow-sm space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#737C77] dark:text-[#8899A6] block">
                    配穴の研ぎ澄まし度（処方純度）
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className={`font-serif text-3xl sm:text-4xl font-bold ${
                      analysis.purityScore >= 80 
                        ? "text-[#1E3D34] dark:text-[#74BA9E]" 
                        : analysis.purityScore >= 60 
                        ? "text-[#B86924] dark:text-[#E6C387]" 
                        : "text-red-600"
                    }`}>
                      {analysis.purityScore}
                    </span>
                    <span className="text-xs text-[#737C77]">/ 100点</span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ml-2 ${
                      analysis.purityScore >= 80 
                        ? "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300" 
                        : "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                    }`}>
                      {analysis.statusText}
                    </span>
                  </div>
                </div>

                <div className="text-right text-xs text-[#737C77] dark:text-[#8899A6]">
                  <p>選択中: <strong className="text-[#232826] dark:text-[#FAF8F5] text-base">{selectedPointIds.length}</strong> 穴</p>
                  <p className="text-[11px] mt-0.5">（推奨: 2〜4穴）</p>
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
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#B86924]" />
                <h3 className="font-serif text-sm sm:text-base font-bold text-[#232826] dark:text-[#FAF8F5]">
                  臨床選定理由の言語化（思考の記録）
                </h3>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-[#737C77] dark:text-[#8899A6] block mb-1">
                    処方名・タイトル
                  </label>
                  <input
                    type="text"
                    value={prescriptionTitle}
                    onChange={e => {
                      setPrescriptionTitle(e.target.value);
                      setSaved(false);
                    }}
                    placeholder="例: 頑固な自律神経失調・昇降調和処方"
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E5DEC9] dark:border-[#2A3B4A] text-[#232826] dark:text-[#FAF8F5]"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#737C77] dark:text-[#8899A6] block mb-1">
                    この配穴を選定した理由・狙う作用機序
                  </label>
                  <textarea
                    value={rationaleText}
                    onChange={e => {
                      setRationaleText(e.target.value);
                      setSaved(false);
                    }}
                    placeholder="なぜ主穴を太衝にしたのか、なぜ合谷と組み合わせたのか、患者のどのような病態にアプローチするのかを記述..."
                    rows={4}
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E5DEC9] dark:border-[#2A3B4A] text-[#232826] dark:text-[#FAF8F5] leading-relaxed"
                  />
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
                  クリックで追加・解除
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
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-white dark:bg-[#1A2530] border border-[#E5DEC9] dark:border-[#2A3B4A]">
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
        title="配穴練習・多穴処方シミュレーター"
        description="4穴以上の自由な配穴設計および高度な剪定提案はプレミアム会員限定機能です。"
      />
    </div>
  );
}

"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { 
  Scissors, 
  Sparkles, 
  AlertTriangle, 
  AlertCircle, 
  CheckCircle2, 
  RotateCcw, 
  X, 
  Plus, 
  Search, 
  ShieldAlert, 
  Zap, 
  Compass, 
  ArrowRight,
  HelpCircle,
  Activity,
  Layers,
  Info
} from "lucide-react";
import { TSUBOS } from "@/data/tsuboData";
import { Tsubo } from "@/types/oriental";
import { 
  ACUPOINT_ROLES, 
  OVERDOSE_PRESETS, 
  analyzePrescription, 
  AcupointRoleMetadata,
  OverdosePreset
} from "@/data/haiketsuData";
import { 
  isPregnancyContraindicated, 
  isChestBackPneumothoraxRisk, 
  isContraindicatedNeedle,
  isContraindicatedMoxa 
} from "@/data/tsubo/safetyAndLandmarks";
import ClipButton from "@/components/ClipButton";

export default function HaiketsuOptimizer() {
  // 初期選択: 「頭痛・首肩こりで7穴選んでしまった例」の過密プリセット
  const [selectedIds, setSelectedIds] = useState<string[]>([
    "gokoku", "taishou", "fuuchi", "kyokuchi", "hyakue", "rekketu", "tesanri"
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBodyPart, setSelectedBodyPart] = useState<string>("すべて");
  const [modalTsubo, setModalTsubo] = useState<Tsubo | null>(null);

  // ESCキーで経穴パネルを閉じる
  useEffect(() => {
    if (!modalTsubo) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setModalTsubo(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [modalTsubo]);

  // URLクエリ（?add=経穴名）からの動的追加
  useEffect(() => {
    if (typeof window === "undefined") return;
    const searchParams = new URLSearchParams(window.location.search);
    const addParam = searchParams.get("add");
    if (addParam) {
      const decoded = decodeURIComponent(addParam).trim();
      const targetTsubo = TSUBOS.find(
        (t) => t.name === decoded || t.code.toLowerCase() === decoded.toLowerCase() || t.id.toLowerCase() === decoded.toLowerCase()
      );
      if (targetTsubo) {
        setSelectedIds((prev) => (prev.includes(targetTsubo.id) ? prev : [...prev, targetTsubo.id]));
      }
    }
  }, []);

  // 分析結果
  const analysis = useMemo(() => {
    return analyzePrescription(selectedIds);
  }, [selectedIds]);

  // 選択ツボの安全性・禁忌チェック
  const safetyAlerts = useMemo(() => {
    const alerts: {
      type: "pregnancy" | "pneumothorax" | "needle_strict";
      title: string;
      level: "critical" | "warning";
      points: { id: string; name: string; code: string; caution: string }[];
    }[] = [];

    const pregnancyPoints: { id: string; name: string; code: string; caution: string }[] = [];
    const pneumoPoints: { id: string; name: string; code: string; caution: string }[] = [];
    const strictPoints: { id: string; name: string; code: string; caution: string }[] = [];

    selectedIds.forEach((id) => {
      const role = ACUPOINT_ROLES[id];
      if (!role) return;

      const codeLower = role.code.toLowerCase();

      if (isContraindicatedNeedle(codeLower)) {
        strictPoints.push({
          id,
          name: role.name,
          code: role.code,
          caution: "刺鍼厳禁穴。感染・腹膜炎・深部損傷のリスクがあるため刺鍼を行わないこと。",
        });
      }

      if (isPregnancyContraindicated(codeLower)) {
        let note = "子宮収縮を強く誘発する恐れがあるため、妊娠中の患者への強刺激・深刺・長時間の施灸は禁忌・慎重を要します。";
        if (codeLower === "li4" || codeLower === "sp6") {
          note = "【代表的妊婦禁忌穴】下気・駆瘀血作用が極めて強力なため、妊娠中は刺鍼厳禁。";
        } else if (codeLower === "gb21") {
          note = "強い降気作用により胎気を下垂・流産誘発の危険があるため、妊娠中の強刺激は厳禁。";
        }
        pregnancyPoints.push({
          id,
          name: role.name,
          code: role.code,
          caution: note,
        });
      }

      if (isChestBackPneumothoraxRisk(codeLower)) {
        pneumoPoints.push({
          id,
          name: role.name,
          code: role.code,
          caution: "【気胸リスク穴】直刺深刺は胸膜・肺実質穿刺の危険。直刺を避け、肋骨に沿った斜刺（刺入深度10〜15mm以内）を厳守すること。",
        });
      }
    });

    if (strictPoints.length > 0) {
      alerts.push({
        type: "needle_strict",
        title: "刺鍼絶対禁忌穴が含まれています",
        level: "critical",
        points: strictPoints,
      });
    }

    if (pregnancyPoints.length > 0) {
      alerts.push({
        type: "pregnancy",
        title: "妊婦禁忌・慎重穴が含まれています",
        level: "critical",
        points: pregnancyPoints,
      });
    }

    if (pneumoPoints.length > 0) {
      alerts.push({
        type: "pneumothorax",
        title: "気胸注意・刺鍼深度厳守穴（胸背部）",
        level: "warning",
        points: pneumoPoints,
      });
    }

    return alerts;
  }, [selectedIds]);

  // 選択切り替え
  const handleTogglePoint = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(item => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  // プリセット適用
  const handleApplyPreset = (preset: OverdosePreset) => {
    setSelectedIds([...preset.initialPointIds]);
  };

  // 削ぎ落とし（最小構成化）ワンクリック適用
  const handleApplyPruning = () => {
    if (analysis.pruningProposal) {
      setSelectedIds([...analysis.pruningProposal.prunedPointIds]);
    }
  };

  // リセット
  const handleReset = () => {
    setSelectedIds([]);
  };

  // フィルタリングされたツボ候補
  const filteredTsubos = useMemo(() => {
    return TSUBOS.filter(tsubo => {
      const matchQuery = 
        searchQuery === "" ||
        tsubo.name.includes(searchQuery) ||
        tsubo.kana.includes(searchQuery) ||
        tsubo.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tsubo.meridian.includes(searchQuery) ||
        tsubo.indications.some(ind => ind.includes(searchQuery));
      
      const matchPart = 
        selectedBodyPart === "すべて" || tsubo.bodyPart === selectedBodyPart;

      return matchQuery && matchPart;
    });
  }, [searchQuery, selectedBodyPart]);

  const bodyParts = ["すべて", "手・腕", "足・脚", "頭部・顔面", "胸・腹", "背中・腰"];

  // スコアに基づくスタイル
  const scoreBadgeColor = 
    analysis.status === "optimal"
      ? "bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] border-[#C5DED4] dark:border-[#2A5243]"
      : analysis.status === "acceptable"
      ? "bg-[#EDF3F8] dark:bg-[#1A2837] text-[#1E2D3D] dark:text-[#6FA0D6] border-[#BCD1E3] dark:border-[#2D455D]"
      : analysis.status === "warning"
      ? "bg-[#FCF4EB] dark:bg-[#2A2117] text-[#B86924] dark:text-[#E6C387] border-[#F3E1CB] dark:border-[#423321]"
      : "bg-[#FDEDEC] dark:bg-[#2A1816] text-[#A83629] dark:text-[#C47A72] border-[#F8C8C4] dark:border-[#4D2824]";

  const scoreBarColor = 
    analysis.status === "optimal"
      ? "bg-[#74BA9E]"
      : analysis.status === "acceptable"
      ? "bg-[#6FA0D6]"
      : analysis.status === "warning"
      ? "bg-[#E6C387]"
      : "bg-[#C47A72]";

  return (
    <div className="space-y-10">
      {/* 1. プリセットバー（選びすぎ例の体感ボタン） */}
      <div className="bg-white dark:bg-[#17212A] p-5 sm:p-6 rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#FCF4EB] dark:bg-[#2A2117] text-[#B86924] dark:text-[#E6C387]">
              <Scissors className="w-4 h-4" />
            </span>
            <span className="text-xs sm:text-sm font-bold text-[#232826] dark:text-[#FAF8F5]">
              典型的な「選びすぎ（過密・相殺）」例で試す
            </span>
          </div>
          <span className="text-[11px] text-[#737C77] dark:text-[#8899A6]">
            ワンタップで過密配穴を呼び出し、削ぎ落としを体験
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {OVERDOSE_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handleApplyPreset(preset)}
              className="text-left p-3 rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] bg-[#FAF8F5] dark:bg-[#121920] hover:border-[#1E3D34] dark:hover:border-[#74BA9E] hover:bg-white dark:hover:bg-[#1A2530] transition-all group"
            >
              <span className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] block mb-1">
                {preset.name}
              </span>
              <span className="text-[11px] text-[#737C77] dark:text-[#8899A6] line-clamp-1 block">
                {preset.symptomSummary}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 2. メイン診断ダッシュボード（上部：メーター ＆ 警告 / 下部：ツボ選択と役割タグ） */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* 左側カラム：配穴純度メーター & 相殺警告 & 削ぎ落とし提案（7カラム） */}
        <div className="lg:col-span-7 space-y-6">

          {/* 配穴純度メーターカード */}
          <div className="bg-white dark:bg-[#17212A] p-6 sm:p-8 rounded-3xl border-2 border-[#E5DEC9] dark:border-[#2A3B4A] shadow-md space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F2ECE0] dark:border-[#22303D] pb-5">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold tracking-wider uppercase text-[#737C77] dark:text-[#8899A6]">
                    Prescription Purity Analysis
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5] mt-0.5">
                  配穴の純度スコア
                </h3>
              </div>

              {/* スコアバッジ ＆ マイカルテ保存ボタン */}
              <div className="flex flex-wrap items-center gap-3">
                {selectedIds.length > 0 && (
                  <ClipButton
                    item={{
                      id: `haiketsu-custom-${[...selectedIds].sort().join("-")}`,
                      type: "pair",
                      title: `配穴処方（${selectedIds.map(id => ACUPOINT_ROLES[id]?.name || id).join(" ＋ ")}）`,
                      subTitle: `純度スコア: ${analysis.purityScore}点（${analysis.statusText}）`,
                      points: selectedIds.map(id => {
                        const r = ACUPOINT_ROLES[id];
                        return r ? `${r.name} (${r.code})` : id;
                      }),
                      elements: Array.from(new Set(selectedIds.map(id => {
                        const r = ACUPOINT_ROLES[id];
                        if (!r) return "木";
                        if (r.system.includes("liver") || r.system.includes("gall")) return "木";
                        if (r.system.includes("heart") || r.system.includes("pericardium")) return "火";
                        if (r.system.includes("spleen") || r.system.includes("stomach")) return "土";
                        if (r.system.includes("lung") || r.system.includes("large_intestine")) return "金";
                        return "水";
                      }))),
                      indications: ["配穴シミュレーター自作構成"],
                      summary: `穴数: ${analysis.totalCount}穴（本治穴: ${analysis.rootCount}穴 / 標治穴: ${analysis.branchCount}穴）。本治比率: ${analysis.rootRatio}%。`,
                      mechanism: analysis.alerts.length > 0 ? `臨床所見: ${analysis.alerts.map(a => a.title).join("、")}` : "気の昇降・寒熱のバランスがとれた至適配穴構成。"
                    }}
                    variant="button"
                    size="sm"
                  />
                )}
                <div className={`px-4 py-2 rounded-2xl border text-center ${scoreBadgeColor}`}>
                  <span className="text-3xl sm:text-4xl font-serif font-bold">
                    {analysis.purityScore}
                  </span>
                  <span className="text-xs font-semibold ml-1">/ 100点</span>
                  <span className="block text-[11px] font-bold mt-0.5">
                    {analysis.statusText}
                  </span>
                </div>
              </div>
            </div>

            {/* スコアバー */}
            <div className="space-y-2">
              <div className="w-full h-3 rounded-full bg-[#EFE9DD] dark:bg-[#1A2530] overflow-hidden">
                <div 
                  className={`h-full transition-all duration-500 rounded-full ${scoreBarColor}`}
                  style={{ width: `${analysis.purityScore}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-[#737C77] dark:text-[#8899A6]">
                <span>相殺・散乱（0〜50点）</span>
                <span>注意（51〜74点）</span>
                <span className="font-bold text-[#1E3D34] dark:text-[#74BA9E]">至適最小構成（90点〜）</span>
              </div>
            </div>

            {/* 指標グリッド */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
              <div className="p-3 rounded-2xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#22303D]">
                <span className="text-[10px] text-[#737C77] dark:text-[#8899A6] block mb-1">
                  選択中の穴数
                </span>
                <span className={`text-lg font-bold font-mono ${
                  analysis.totalCount <= 4 && analysis.totalCount >= 1 
                    ? "text-[#1E3D34] dark:text-[#74BA9E]" 
                    : analysis.totalCount === 5 
                    ? "text-[#B86924] dark:text-[#E6C387]" 
                    : "text-[#A83629] dark:text-[#C47A72]"
                }`}>
                  {analysis.totalCount} 穴
                </span>
                <span className="text-[10px] text-[#737C77] dark:text-[#8899A6] block mt-0.5">
                  {analysis.totalCount <= 4 ? "黄金比（2〜4穴）" : "相殺リスク"}
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-[#EBF3EF]/60 dark:bg-[#182823]/60 border border-[#C5DED4] dark:border-[#2A5243]">
                <span className="text-[10px] text-[#1E3D34] dark:text-[#74BA9E] block mb-1 font-semibold">
                  本治穴（根本）
                </span>
                <span className="text-lg font-bold font-mono text-[#1E3D34] dark:text-[#74BA9E]">
                  {analysis.rootCount} 穴
                </span>
                <span className="text-[10px] text-[#59615D] dark:text-[#96A6B2] block mt-0.5">
                  臓腑・体質調整
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-[#EDF3F8]/60 dark:bg-[#1A2837]/60 border border-[#BCD1E3] dark:border-[#2D455D]">
                <span className="text-[10px] text-[#1E2D3D] dark:text-[#6FA0D6] block mb-1 font-semibold">
                  標治穴（対症）
                </span>
                <span className="text-lg font-bold font-mono text-[#1E2D3D] dark:text-[#6FA0D6]">
                  {analysis.branchCount} 穴
                </span>
                <span className="text-[10px] text-[#59615D] dark:text-[#96A6B2] block mt-0.5">
                  通絡・局所止痛
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#22303D]">
                <span className="text-[10px] text-[#737C77] dark:text-[#8899A6] block mb-1">
                  本治比率
                </span>
                <span className="text-lg font-bold font-mono text-[#232826] dark:text-[#FAF8F5]">
                  {analysis.rootRatio} %
                </span>
                <span className="text-[10px] text-[#737C77] dark:text-[#8899A6] block mt-0.5">
                  理想は40〜60%
                </span>
              </div>
            </div>
          </div>

          {/* 削ぎ落とし提案（最小構成化ボタン） */}
          {analysis.pruningProposal && (
            <div className="bg-gradient-to-br from-[#1E3D34] to-[#142923] dark:from-[#1A382F] dark:to-[#0D1C17] text-[#FAF8F5] p-6 sm:p-7 rounded-3xl shadow-lg border border-[#2B594C] space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF3EF]/20 text-[#E6C387] text-xs font-semibold">
                  <Scissors className="w-3.5 h-3.5" />
                  <span>無駄を削ぎ落とす臨床アドバイス</span>
                </div>
                <span className="text-xs font-mono font-bold text-[#E6C387]">
                  スコア {analysis.purityScore} ➜ {analysis.pruningProposal.projectedScore}点へ
                </span>
              </div>

              <div>
                <h4 className="font-serif text-lg font-bold text-white mb-1">
                  {analysis.pruningProposal.corePrinciple}
                </h4>
                <p className="text-xs sm:text-sm text-[#D3DFDA] leading-relaxed">
                  {analysis.pruningProposal.clinicalRationale}
                </p>
              </div>

              {/* 剪定プレビュー */}
              <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 space-y-2 text-xs">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-bold text-[#E6C387] shrink-0">
                    【残す最小構成】
                  </span>
                  {analysis.pruningProposal.prunedPointIds.map(id => {
                    const role = ACUPOINT_ROLES[id];
                    return (
                      <span key={id} className="px-2.5 py-1 rounded-lg bg-white/20 text-white font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#74BA9E]" />
                        <span>{role?.name}</span>
                        <span className="text-[10px] font-mono text-[#D3DFDA] font-normal">({role?.code})</span>
                      </span>
                    );
                  })}
                </div>

                {analysis.pruningProposal.removedPointIds.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-white/10">
                    <span className="text-[11px] font-semibold text-[#B0C4BC] shrink-0">
                      【削ぎ落とすツボ】
                    </span>
                    {analysis.pruningProposal.removedPointIds.map(id => {
                      const role = ACUPOINT_ROLES[id];
                      return (
                        <span key={id} className="px-2 py-0.5 rounded text-[11px] bg-black/20 text-[#A0B8AF] line-through">
                          {role?.name}
                        </span>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* 最適化ボタン */}
              <button
                onClick={handleApplyPruning}
                className="w-full py-3.5 px-5 rounded-2xl bg-[#E6C387] text-[#1E3D34] hover:bg-[#DFC07D] font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all group cursor-pointer"
              >
                <Zap className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
                <span>この最小構成に最適化する（余剰穴を一括剪定）</span>
              </button>
            </div>
          )}

          {/* 相殺・干渉警告リスト */}
          {analysis.alerts.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#737C77] dark:text-[#8899A6] px-1">
                相殺・重複・過多の臨床分析（{analysis.alerts.length}件）
              </h4>
              {analysis.alerts.map(alert => {
                const isHigh = alert.severity === "high";
                const isMed = alert.severity === "medium";
                return (
                  <div
                    key={alert.id}
                    className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                      isHigh
                        ? "bg-[#FDEDEC] dark:bg-[#251514] border-[#F8C8C4] dark:border-[#4D2421] text-[#232826] dark:text-[#FAF8F5]"
                        : isMed
                        ? "bg-[#FCF4EB] dark:bg-[#251E17] border-[#F3E1CB] dark:border-[#473623] text-[#232826] dark:text-[#FAF8F5]"
                        : "bg-[#EDF3F8] dark:bg-[#16222E] border-[#BCD1E3] dark:border-[#25394C] text-[#232826] dark:text-[#FAF8F5]"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 shrink-0">
                        {isHigh ? (
                          <ShieldAlert className="w-5 h-5 text-[#A83629] dark:text-[#C47A72]" />
                        ) : isMed ? (
                          <AlertTriangle className="w-5 h-5 text-[#B86924] dark:text-[#E6C387]" />
                        ) : (
                          <Info className="w-5 h-5 text-[#1E2D3D] dark:text-[#6FA0D6]" />
                        )}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold block">{alert.title}</span>
                          <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded uppercase ${
                            isHigh 
                              ? "bg-[#A83629] text-white" 
                              : isMed 
                              ? "bg-[#B86924] text-white" 
                              : "bg-[#6FA0D6] text-white"
                          }`}>
                            {isHigh ? "相殺警告" : isMed ? "重複注意" : "情報"}
                          </span>
                        </div>
                        <p className="text-xs leading-relaxed text-[#59615D] dark:text-[#A0B0BC]">
                          {alert.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* 臨床安全・禁忌アラート（妊婦禁忌・気胸リスク・深刺注意） */}
          {selectedIds.length > 0 && (
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#737C77] dark:text-[#8899A6] px-1 flex items-center justify-between">
                <span>臨床安全性・禁忌チェック</span>
                {safetyAlerts.length > 0 ? (
                  <span className="text-[10px] text-red-600 dark:text-red-400 font-bold">
                    ⚠️ 要確認 {safetyAlerts.length}件
                  </span>
                ) : (
                  <span className="text-[10px] text-[#1E3D34] dark:text-[#74BA9E] font-bold">
                    ✓ 禁忌穴混入なし
                  </span>
                )}
              </h4>

              {safetyAlerts.length > 0 ? (
                safetyAlerts.map((alert, idx) => {
                  const isCritical = alert.level === "critical";
                  return (
                    <div
                      key={idx}
                      className={`p-4 rounded-2xl border transition-all ${
                        isCritical
                          ? "bg-rose-50/90 dark:bg-[#281315] border-rose-200 dark:border-[#522125] text-[#232826] dark:text-[#FAF8F5]"
                          : "bg-amber-50/90 dark:bg-[#261C14] border-amber-200 dark:border-[#4D3520] text-[#232826] dark:text-[#FAF8F5]"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 shrink-0">
                          {isCritical ? (
                            <ShieldAlert className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                          ) : (
                            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                          )}
                        </div>
                        <div className="space-y-2 flex-1">
                          <div className="flex flex-wrap items-center justify-between gap-1.5">
                            <span className="text-xs font-bold">{alert.title}</span>
                            <span
                              className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                                isCritical
                                  ? "bg-rose-600 text-white"
                                  : "bg-amber-600 text-white"
                              }`}
                            >
                              {isCritical ? "禁忌警告" : "安全深度厳守"}
                            </span>
                          </div>

                          <div className="space-y-1.5">
                            {alert.points.map((pt) => (
                              <div
                                key={pt.id}
                                className="bg-white/90 dark:bg-[#1A1E24] p-2.5 rounded-xl border border-rose-100 dark:border-rose-950/60 text-xs space-y-1"
                              >
                                <div className="flex items-center gap-1.5 font-bold">
                                  <span className="font-mono text-[11px] text-[#1E3D34] dark:text-[#74BA9E] px-1.5 py-0.2 bg-[#EBF3EF] dark:bg-[#182823] rounded">
                                    {pt.code}
                                  </span>
                                  <span className="text-[#232826] dark:text-[#FAF8F5]">
                                    {pt.name}
                                  </span>
                                </div>
                                <p className="text-[11px] text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                                  {pt.caution}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="p-3.5 rounded-2xl bg-[#EBF3EF]/60 dark:bg-[#182823]/60 border border-[#C5DED4] dark:border-[#2A5243] flex items-center gap-2.5 text-xs text-[#1E3D34] dark:text-[#74BA9E]">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>妊婦禁忌穴および気胸ハイリスク穴の混入はありません。</span>
                </div>
              )}
            </div>
          )}

          {/* 警告ゼロ（純度100%時）の賞賛カード */}
          {analysis.alerts.length === 0 && selectedIds.length > 0 && (
            <div className="p-6 rounded-3xl bg-[#EBF3EF] dark:bg-[#182823] border border-[#C5DED4] dark:border-[#2A5243] text-center space-y-2 animate-fadeIn">
              <CheckCircle2 className="w-8 h-8 text-[#1E3D34] dark:text-[#74BA9E] mx-auto" />
              <h4 className="font-serif font-bold text-base text-[#1E3D34] dark:text-[#74BA9E]">
                相殺のない秀逸な最小構成です
              </h4>
              <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] max-w-md mx-auto">
                本治穴と標治穴が調和し、昇降の衝突や余計な重複がありません。生体の自己治癒シグナルが一点に研ぎ澄まされ、最速の切れ味を発揮します。
              </p>
            </div>
          )}
        </div>

        {/* 右側カラム：選択中ツボの「役割タグ一覧」 ＆ ツボ追加セレクター（5カラム） */}
        <div className="lg:col-span-5 space-y-6">

          {/* 選択中のツボ（役割タグ付き） */}
          <div className="bg-white dark:bg-[#17212A] p-5 sm:p-6 rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#F2ECE0] dark:border-[#22303D] pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5]">
                  選択中の配穴（{selectedIds.length}穴）
                </span>
              </div>
              {selectedIds.length > 0 && (
                <button
                  onClick={handleReset}
                  className="text-[11px] text-[#737C77] dark:text-[#8899A6] hover:text-[#A83629] dark:hover:text-[#C47A72] flex items-center gap-1 transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>全解除</span>
                </button>
              )}
            </div>

            {/* ツボカード一覧 */}
            {selectedIds.length === 0 ? (
              <div className="text-center py-8 text-[#737C77] dark:text-[#8899A6] space-y-2">
                <Compass className="w-8 h-8 mx-auto opacity-40" />
                <p className="text-xs">ツボが選択されていません。<br />下のリストから候補を追加してください。</p>
              </div>
            ) : (
              <div className="space-y-2.5 max-h-[420px] overflow-y-auto pr-1">
                {selectedIds.map(id => {
                  const role = ACUPOINT_ROLES[id];
                  const tsubo = TSUBOS.find(t => t.id === id);
                  if (!role) return null;

                  const isRoot = role.tier === "root";

                  return (
                    <div
                      key={id}
                      className="p-3.5 rounded-2xl border border-[#E8E1D1] dark:border-[#263542] bg-[#FAF8F5] dark:bg-[#121920] hover:border-[#1E3D34] dark:hover:border-[#74BA9E] transition-all space-y-2 group"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                              {role.code}
                            </span>
                            <h5 
                              onClick={() => tsubo && setModalTsubo(tsubo)}
                              className="font-serif font-bold text-base text-[#232826] dark:text-[#FAF8F5] cursor-pointer hover:underline flex items-center gap-1"
                            >
                              <span>{role.name}</span>
                              <HelpCircle className="w-3 h-3 text-[#737C77] opacity-0 group-hover:opacity-100 transition-opacity" />
                            </h5>
                            <span className="text-[10px] text-[#737C77] dark:text-[#8899A6]">
                              {role.meridianShort}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => handleTogglePoint(id)}
                          className="p-1 rounded-lg text-[#737C77] hover:text-[#A83629] dark:hover:text-[#C47A72] hover:bg-[#EAE3D4] dark:hover:bg-[#1F2B37] transition-colors"
                          title="削除"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      {/* 役割タグピル群 */}
                      <div className="flex flex-wrap gap-1.5 text-[10px]">
                        {/* 本治 / 標治 タグ */}
                        <span className={`px-2 py-0.5 rounded-md font-bold ${
                          isRoot
                            ? "bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#83BEA8] border border-[#C5DED4] dark:border-[#2A5243]"
                            : "bg-[#EDF3F8] dark:bg-[#1A2837] text-[#1E2D3D] dark:text-[#6FA0D6] border border-[#BCD1E3] dark:border-[#2D455D]"
                        }`}>
                          {role.tierLabel}
                        </span>

                        {/* 要穴区分 */}
                        <span className="px-2 py-0.5 rounded-md bg-[#FCF4EB] dark:bg-[#2A2117] text-[#B86924] dark:text-[#E6C387] border border-[#F3E1CB] dark:border-[#423321] font-semibold">
                          {role.specificRole}
                        </span>

                        {/* 気機動態 */}
                        <span className="px-2 py-0.5 rounded-md bg-white dark:bg-[#1A2530] text-[#404743] dark:text-[#C5D2DB] border border-[#E8E1D1] dark:border-[#2A3B4A]">
                          {role.energyLabel}
                        </span>
                      </div>

                      <p className="text-[11px] text-[#59615D] dark:text-[#96A6B2] leading-snug">
                        {role.clinicalRoleSummary}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* ツボ追加セレクター */}
          <div className="bg-white dark:bg-[#17212A] p-5 sm:p-6 rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5]">
                ツボを自由に検索・追加
              </span>
              <span className="text-[11px] text-[#737C77] dark:text-[#8899A6]">
                全{TSUBOS.length}穴収録
              </span>
            </div>

            {/* 検索窓 */}
            <div className="relative">
              <Search className="w-4 h-4 text-[#737C77] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="ツボ名・経絡・症状で検索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E5DEC9] dark:border-[#263542] text-[#232826] dark:text-[#FAF8F5] placeholder-[#8899A6] focus:outline-none focus:border-[#1E3D34] dark:focus:border-[#74BA9E]"
              />
            </div>

            {/* 部位フィルター */}
            <div className="flex flex-wrap gap-1">
              {bodyParts.map(part => (
                <button
                  key={part}
                  onClick={() => setSelectedBodyPart(part)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold transition-colors ${
                    selectedBodyPart === part
                      ? "bg-[#1E3D34] dark:bg-[#2B6958] text-[#FAF8F5]"
                      : "bg-[#FAF8F5] dark:bg-[#121920] text-[#59615D] dark:text-[#8899A6] hover:bg-[#EAE3D4] dark:hover:bg-[#1C2630]"
                  }`}
                >
                  {part}
                </button>
              ))}
            </div>

            {/* ツボ選択ボタン一覧 */}
            <div className="grid grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
              {filteredTsubos.map(tsubo => {
                const isSelected = selectedIds.includes(tsubo.id);
                const role = ACUPOINT_ROLES[tsubo.id];
                return (
                  <button
                    key={tsubo.id}
                    onClick={() => handleTogglePoint(tsubo.id)}
                    className={`p-2.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                      isSelected
                        ? "bg-[#EBF3EF] dark:bg-[#182823] border-[#1E3D34] dark:border-[#74BA9E] text-[#1E3D34] dark:text-[#FAF8F5] shadow-xs"
                        : "bg-[#FAF8F5] dark:bg-[#121920] border-[#E8E1D1] dark:border-[#22303D] text-[#404743] dark:text-[#C5D2DB] hover:border-[#1E3D34] dark:hover:border-[#4E8C76]"
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-serif font-bold text-xs">{tsubo.name}</span>
                        <span className="text-[10px] font-mono text-[#737C77]">{tsubo.code}</span>
                      </div>
                      <span className="text-[9px] text-[#737C77] dark:text-[#8899A6] block">
                        {role?.tierLabel.slice(0, 2) || tsubo.meridianShort}
                      </span>
                    </div>

                    <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0 ${
                      isSelected 
                        ? "bg-[#1E3D34] dark:bg-[#74BA9E] text-white" 
                        : "bg-white dark:bg-[#1F2B37] text-[#737C77] border border-[#D5CCBC] dark:border-[#2F4152]"
                    }`}>
                      {isSelected ? "✓" : "+"}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 取穴詳細パネル（PC: Split View サイドパネル / スマホ: ボトムシート） */}
      {modalTsubo && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          {/* モバイル用背景オーバーレイ（PCでは非表示にして背後の最適化ツール操作を可能に） */}
          <div
            onClick={() => setModalTsubo(null)}
            className="fixed inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity duration-200 pointer-events-auto lg:hidden"
            aria-hidden="true"
          />

          {/* パネル本体:
              - モバイル: 画面下部からせり上がるボトムシート (inset-x-0 bottom-0 rounded-t-3xl max-h-[85vh])
              - PC(lg以上): 右側に固定されるSplit Viewサイドパネル (top-16 right-0 bottom-0 w-[440px] max-w-[45vw] lg:max-h-full)
          */}
          <aside
            onClick={(e) => e.stopPropagation()}
            className="fixed bottom-0 inset-x-0 max-h-[85vh] lg:top-16 lg:bottom-0 lg:left-auto lg:right-0 lg:w-[440px] lg:max-w-[45vw] lg:max-h-full bg-[#FAF8F5] dark:bg-[#17212A] shadow-2xl border-t lg:border-t-0 lg:border-l border-[#E5DEC9] dark:border-[#2A3B4A] rounded-t-3xl lg:rounded-none z-50 flex flex-col pointer-events-auto transition-transform duration-300 ease-out"
            role="dialog"
            aria-modal="false"
            aria-label={`${modalTsubo.name}の詳細情報`}
          >
            {/* モバイル向けドラッグ・グラブバー */}
            <div className="flex justify-center pt-3 pb-1 lg:hidden">
              <div className="w-10 h-1.5 rounded-full bg-[#D1C7B7] dark:bg-[#344655]" />
            </div>

            {/* パネル上部ステータスバナー（PC専用：Split View案内） */}
            <div className="hidden lg:flex items-center justify-between px-6 py-2.5 bg-[#EBF3EF] dark:bg-[#162A24] border-b border-[#C5DED4] dark:border-[#24473A] text-xs text-[#1E3D34] dark:text-[#83BEA8]">
              <span className="font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#1E3D34] dark:bg-[#74BA9E] animate-pulse" />
                <span>経穴 Split View（左側も操作可能）</span>
              </span>
              <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-[#1C2C26] border border-[#C5DED4] dark:border-[#2A5243] text-[10px] font-mono">
                ESC で閉じる
              </kbd>
            </div>

            {/* パネルヘッダー */}
            <div className="p-5 sm:p-6 border-b border-[#E8E1D1] dark:border-[#22303D] flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E]">
                    {modalTsubo.code}
                  </span>
                  <span className="text-xs text-[#59615D] dark:text-[#96A6B2]">
                    {modalTsubo.meridian}
                  </span>
                </div>
                <div className="flex items-baseline gap-2 mt-1">
                  <h3 className="font-serif text-2xl font-bold text-[#232826] dark:text-[#FAF8F5]">
                    {modalTsubo.name}
                  </h3>
                  <span className="text-sm text-[#59615D] dark:text-[#96A6B2]">（{modalTsubo.kana}）</span>
                </div>
              </div>
              <button
                onClick={() => setModalTsubo(null)}
                className="p-1.5 rounded-lg hover:bg-[#EAE3D4] dark:hover:bg-[#22303D] text-[#59615D] dark:text-[#96A6B2] transition-colors cursor-pointer"
                title="閉じる (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* パネルコンテンツ（スクロール可能） */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
              {/* 取穴法（一般 ＆ 骨度法） */}
              <div className="space-y-3">
                <div className="bg-white dark:bg-[#121920] p-4 rounded-xl border border-[#E5DEC9] dark:border-[#263542]">
                  <span className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider block mb-1">
                    【一般向け】わかりやすい取穴法
                  </span>
                  <p className="text-sm text-[#232826] dark:text-[#E6EFEA] leading-relaxed">
                    {modalTsubo.locationSimple}
                  </p>
                </div>

                <div className="bg-white dark:bg-[#121920] p-4 rounded-xl border border-[#E5DEC9] dark:border-[#263542]">
                  <span className="text-xs font-bold text-[#1E2D3D] dark:text-[#7BAAD8] uppercase tracking-wider block mb-1">
                    【専門家向け】解剖学・骨度法取穴（WHO標準）
                  </span>
                  <p className="text-sm text-[#232826] dark:text-[#E6EFEA] leading-relaxed font-mono">
                    {modalTsubo.locationDetail}
                  </p>
                </div>
              </div>

              {/* 臨床知見 */}
              <div className="bg-[#EBF3EF] dark:bg-[#162A24] p-4 rounded-xl border border-[#C5DED4] dark:border-[#2A5243]">
                <span className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#B86924] dark:text-[#E6C387]" />
                  <span>臨床知見・配穴の極意</span>
                </span>
                <p className="text-sm text-[#232826] dark:text-[#E6EFEA] leading-relaxed">
                  {modalTsubo.clinicalNote}
                </p>
              </div>
            </div>

            {/* パネルフッター */}
            <div className="p-4 sm:p-5 border-t border-[#E8E1D1] dark:border-[#22303D] bg-[#F2EDE4]/60 dark:bg-[#141C24]/60 flex items-center justify-between gap-3">
              <Link
                href={`/tsubo/${modalTsubo.code.toLowerCase()}`}
                onClick={() => setModalTsubo(null)}
                className="text-xs sm:text-sm font-semibold text-[#1E3D34] dark:text-[#74BA9E] hover:underline flex items-center gap-1"
              >
                <span>十四経脈辞典で詳しく見る ➜</span>
              </Link>

              <button
                onClick={() => setModalTsubo(null)}
                className="px-5 py-2 rounded-xl bg-[#1E3D34] dark:bg-[#2B6958] text-[#FAF8F5] text-xs sm:text-sm font-semibold hover:bg-[#162E27] dark:hover:bg-[#225345] transition-all cursor-pointer"
              >
                閉じる
              </button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}

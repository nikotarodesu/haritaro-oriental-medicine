"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Layers, 
  ArrowLeft, 
  ArrowRight, 
  Crown, 
  Lock, 
  Bookmark, 
  Sparkles, 
  Split, 
  Check, 
  SlidersHorizontal,
  FileText,
  AlertTriangle,
  Lightbulb,
  Share2
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useClinicalMemo } from "@/contexts/ClinicalMemoContext";
import AuthModal from "@/components/auth/AuthModal";

// 比較シミュレーションのプロファイル型
interface SimulationProfile {
  id: string;
  name: string;
  category: string;
  pattern: string; // 証名
  hachiko: {
    depth: "表" | "裏";
    temp: "寒" | "熱" | "未確定";
    state: "虚" | "実";
  };
  primaryOrgan: string; // 主病臓腑
  coreMechanism: string; // 病態機序の要約
  primaryPoints: string[]; // 主穴
  secondaryPoints: string[]; // 配穴
  needleMethod: string; // 補瀉・手技
  contraindications: string; // 慎重投与・禁忌
}

// 臨床プリセットペア
const PRESET_COMPARISONS = [
  {
    title: "【肝病変の鑑別】肝気鬱結証 vs 肝火上炎証",
    desc: "ストレス性の気滞が熱化して頭部・目へ上衝したかどうかの鑑別と配穴の転換",
    planA: {
      id: "a1",
      name: "案A: 肝気鬱結証（気滞・実）",
      category: "気血病変",
      pattern: "肝気鬱結証",
      hachiko: { depth: "裏" as const, temp: "未確定" as const, state: "実" as const },
      primaryOrgan: "肝",
      coreMechanism: "情志失調（ストレス）により肝の疎泄機能が失調し、気機が滞る。胸脇苦満、易怒、ため息、情緒不安定。",
      primaryPoints: ["太衝", "期門"],
      secondaryPoints: ["陽陵泉", "内関", "膻中"],
      needleMethod: "平補平瀉（気機を巡らせる）。太衝・陽陵泉で肝胆の気を疏通。",
      contraindications: "熱の所見、体力、皮膚状態などを追加確認し、刺激量・施灸の適否を個別に検討。"
    },
    planB: {
      id: "b1",
      name: "案B: 肝火上炎証（気鬱化火・実熱）",
      category: "火熱病変",
      pattern: "肝火上炎証",
      hachiko: { depth: "裏" as const, temp: "熱" as const, state: "実" as const },
      primaryOrgan: "肝・胆",
      coreMechanism: "長引く気鬱が熱化し、火熱の邪が経絡を上衝。激しい頭痛、目の充血、耳鳴り、口苦、急躁易怒。",
      primaryPoints: ["行間", "侠渓"],
      secondaryPoints: ["太衝", "風池", "太陽"],
      needleMethod: "清熱を目的とする伝統的な配穴例。行間（栄火穴）・侠渓などを所見と照合して検討。",
      contraindications: "強い頭痛、眼の異常、発熱などは現代医学的な評価を優先。温熱刺激の適否も個別に判断。"
    },
    differentialSummary: "案Aは気滞、案Bは熱の徴候を伴う伝統的な候補です。気滞だけで寒熱は確定しません。四診所見と経過を比較して治則を検討し、この一覧だけで手技を決定しません。"
  },
  {
    title: "【脾胃病変の鑑別】脾気虚・中気下陥 vs 寒湿困脾",
    desc: "脱力・軟便などと、冷え・重だるさなどの所見を比較する学習例",
    planA: {
      id: "a2",
      name: "案A: 脾気虚・中気下陥証（虚）",
      category: "臓腑病変",
      pattern: "中気下陥証",
      hachiko: { depth: "裏" as const, temp: "未確定" as const, state: "虚" as const },
      primaryOrgan: "脾・胃",
      coreMechanism: "伝統医学では脾の昇清の不足として整理。脱力感、軟便などを確認する。胃下垂などの医学的診断と同一視しない。",
      primaryPoints: ["百会", "足三里"],
      secondaryPoints: ["中脘", "気海", "脾兪"],
      needleMethod: "補気・昇提を目的とする伝統的な配穴例。気虚だけで寒証とはせず、温灸の必要性は追加検討。",
      contraindications: "持続する疲労・息切れなどは原因の医学的評価を検討。刺激量と温熱の適否は個別に確認。"
    },
    planB: {
      id: "b2",
      name: "案B: 寒湿困脾証（実湿）",
      category: "水液病変",
      pattern: "寒湿困脾証",
      hachiko: { depth: "裏" as const, temp: "寒" as const, state: "実" as const },
      primaryOrgan: "脾",
      coreMechanism: "過度の生冷飲食や湿気により寒湿が脾を圧迫。頭重感、四肢倦怠、口の中が粘る、浮腫、泥状便。",
      primaryPoints: ["陰陵泉", "水分"],
      secondaryPoints: ["豊隆", "脾兪", "天枢"],
      needleMethod: "健脾・化湿を目的とする伝統的な配穴例。陰陵泉・水分の選択を検討するが、尿への排出という機序や効果は断定できない。",
      contraindications: "むくみの急な出現や増悪、息苦しさなどは医療機関での評価を優先。薬剤の適否を本ツールで判断しない。"
    },
    differentialSummary: "案Aでは不足の所見、案Bでは寒湿の所見を比較します。虚と湿は併存することもあり、単純な二者択一にはせず、根拠と不足する情報を記録します。"
  },
  {
    title: "【腎病変の鑑別】腎陰虚 vs 腎陽虚",
    desc: "老化・慢性疲労における「乾燥とほてり（陰虚）」と「冷えと水腫（陽虚）」",
    planA: {
      id: "a3",
      name: "案A: 腎陰虚証（虚熱・乾燥）",
      category: "気血病変",
      pattern: "腎陰虚証",
      hachiko: { depth: "裏" as const, temp: "熱" as const, state: "虚" as const },
      primaryOrgan: "腎",
      coreMechanism: "腎の陰液（潤い）が消耗し、虚熱が内生。手足のほてり（五心煩熱）、潮熱、盗汗、口渇、耳鳴り、腰膝酸軟。",
      primaryPoints: ["太谿", "照海"],
      secondaryPoints: ["三陰交", "腎兪", "復溜"],
      needleMethod: "滋陰を目的とする伝統的な配穴例。刺鍼深度は証名だけで決めず、局所解剖や体格などから判断。",
      contraindications: "熱感や乾燥の原因、服薬、皮膚の状態を確認。温熱刺激の適否は個別に検討。"
    },
    planB: {
      id: "b3",
      name: "案B: 腎陽虚証（虚寒・水腫）",
      category: "気血病変",
      pattern: "腎陽虚証",
      hachiko: { depth: "裏" as const, temp: "寒" as const, state: "虚" as const },
      primaryOrgan: "腎",
      coreMechanism: "腎の命門の火が衰え、全身を温められない。激しい腰下肢の冷え、夜間頻尿、下肢浮腫、無気力、インポテンツ。",
      primaryPoints: ["命門", "関元"],
      secondaryPoints: ["腎兪", "太谿", "志室"],
      needleMethod: "温陽を目的とする伝統的な配穴例。刺激量や施灸は体力・局所の安全性を確認して検討し、効果を保証しない。",
      contraindications: "感覚障害・皮膚障害などがある場合の熱傷リスクを確認。むくみや排尿症状は医学的評価も検討。"
    },
    differentialSummary: "腰膝の症状に、乾燥・ほてりが伴うか、冷えなどが伴うかを比較する学習例です。少数の症状で確定せず、他の候補と医学的評価の必要性を確認します。"
  }
];

export default function SimulatorComparePage() {
  const { isPremium } = useAuth();
  const { addMemo } = useClinicalMemo();

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [selectedPresetIdx, setSelectedPresetIdx] = useState(0);
  const [saved, setSaved] = useState(false);

  // カスタム編集用ステート（プレミアム限定）
  const [customMode, setCustomMode] = useState(false);

  const currentPreset = PRESET_COMPARISONS[selectedPresetIdx];

  const handleSaveToMemo = () => {
    addMemo({
      id: `compare-${Date.now()}`,
      type: "pair",
      title: `【条件比較】${currentPreset.planA.pattern} vs ${currentPreset.planB.pattern}`,
      subTitle: "臨床条件比較シミュレーション結果",
      points: [...currentPreset.planA.primaryPoints, ...currentPreset.planB.primaryPoints],
      elements: ["木", "火"],
      indications: [currentPreset.planA.pattern, currentPreset.planB.pattern],
      summary: currentPreset.differentialSummary,
      mechanism: `【案A】${currentPreset.planA.coreMechanism}\n【案B】${currentPreset.planB.coreMechanism}`,
      personalNotes: `比較検討日: ${new Date().toLocaleDateString("ja-JP")}`
    });
    setSaved(true);
  };

  const handleSwitchCustom = () => {
    if (!isPremium) {
      setAuthModalOpen(true);
      return;
    }
    setCustomMode(!customMode);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#10161C] text-[#232826] dark:text-[#FAF8F5]">
      {/* ヒーローセクション */}
      <div className="bg-white dark:bg-[#17212A] border-b border-[#E5DEC9] dark:border-[#2A3B4A] py-10 sm:py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] border border-[#C5DED4] dark:border-[#2A5243]">
              <Split className="w-3.5 h-3.5" />
              <span>並行比較・鑑別エンジン</span>
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#FAF8F5] dark:bg-[#151D25] text-[#737C77] dark:text-[#8899A6] border border-[#E5DEC9] dark:border-[#2A3B4A]">
              案A vs 案B の差分を可視化
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-2">
              <h1 className="font-serif text-2xl sm:text-4xl font-bold text-[#232826] dark:text-[#FAF8F5]">
                条件比較シミュレーター
              </h1>
              <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#96A6B2] max-w-2xl leading-relaxed">
                臨床で最も判断に迷う「似て非なる2つの病態」「対立する配穴方針」を横並びで並行シミュレーション。八綱のズレや配穴意図の差異をひと目で把握できます。
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleSaveToMemo}
                disabled={saved}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white dark:bg-[#1A2530] border border-[#E5DEC9] dark:border-[#2A3B4A] text-xs font-bold text-[#232826] dark:text-[#FAF8F5] hover:bg-[#FAF8F5] transition-colors"
              >
                <Bookmark className={`w-3.5 h-3.5 ${saved ? "fill-current text-[#B86924]" : ""}`} />
                <span>{saved ? "学習ノートに保存済" : "比較結果を学習ノートに保存"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
        
        {/* プリセット選択タブ */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-[#737C77] dark:text-[#8899A6] block">
            代表的な鑑別プリセットを選択:
          </span>
          <div className="flex flex-wrap gap-2">
            {PRESET_COMPARISONS.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSelectedPresetIdx(idx);
                  setSaved(false);
                }}
                className={`text-xs px-3.5 py-2 rounded-xl font-medium transition-all text-left ${
                  selectedPresetIdx === idx
                    ? "bg-[#B86924] text-white shadow-sm font-bold"
                    : "bg-white dark:bg-[#17212A] text-[#59615D] dark:text-[#96A6B2] border border-[#E5DEC9] dark:border-[#2A3B4A] hover:bg-[#FAF8F5]"
                }`}
              >
                {preset.title}
              </button>
            ))}
          </div>
        </div>

        {/* 差異サマリーハイライト（重要） */}
        <div className="bg-[#FAF8F5] dark:bg-[#151D25] rounded-2xl border-2 border-[#B86924] p-5 sm:p-6 space-y-3">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-[#B86924]" />
            <h3 className="font-serif text-base sm:text-lg font-bold text-[#232826] dark:text-[#FAF8F5]">
              鑑別の分岐点と配穴の転換理由（臨床Insight）
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-[#404743] dark:text-[#C5D2DB] leading-relaxed">
            {currentPreset.differentialSummary}
          </p>
        </div>

        {/* 並行比較テーブル（案A vs 案B） */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* 案A */}
          <div className="bg-white dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-[#E5DEC9] dark:border-[#2A3B4A] pb-3">
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300">
                  PLAN A
                </span>
                <h2 className="font-serif text-lg sm:text-xl font-bold text-[#232826] dark:text-[#FAF8F5] mt-1">
                  {currentPreset.planA.name}
                </h2>
              </div>
            </div>

            {/* 八綱ステータス */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="bg-[#FAF8F5] dark:bg-[#121920] p-2 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A]">
                <span className="text-[10px] text-[#737C77] block">表裏</span>
                <span className="font-bold text-[#232826] dark:text-[#FAF8F5]">{currentPreset.planA.hachiko.depth}</span>
              </div>
              <div className="bg-[#FAF8F5] dark:bg-[#121920] p-2 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A]">
                <span className="text-[10px] text-[#737C77] block">寒熱</span>
                <span className={`font-bold ${currentPreset.planA.hachiko.temp === "熱" ? "text-red-600" : "text-blue-600"}`}>
                  {currentPreset.planA.hachiko.temp}
                </span>
              </div>
              <div className="bg-[#FAF8F5] dark:bg-[#121920] p-2 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A]">
                <span className="text-[10px] text-[#737C77] block">虚実</span>
                <span className="font-bold text-[#232826] dark:text-[#FAF8F5]">{currentPreset.planA.hachiko.state}</span>
              </div>
            </div>

            {/* 病態機序 */}
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#737C77] dark:text-[#8899A6] block">病態機序:</span>
              <p className="text-xs text-[#59615D] dark:text-[#96A6B2] leading-relaxed bg-[#FAF8F5] dark:bg-[#121920] p-3 rounded-xl">
                {currentPreset.planA.coreMechanism}
              </p>
            </div>

            {/* 主穴・配穴 */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#737C77] dark:text-[#8899A6] block">主穴 ＆ 配穴構成:</span>
              <div className="flex flex-wrap gap-1.5">
                {currentPreset.planA.primaryPoints.map(pt => (
                  <span key={pt} className="text-xs px-2.5 py-1 rounded-lg bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] font-bold border border-[#C5DED4] dark:border-[#2A5243]">
                    ★ {pt}（主穴）
                  </span>
                ))}
                {currentPreset.planA.secondaryPoints.map(pt => (
                  <span key={pt} className="text-xs px-2.5 py-1 rounded-lg bg-[#FAF8F5] dark:bg-[#151D25] text-[#59615D] dark:text-[#96A6B2] border border-[#E5DEC9] dark:border-[#2A3B4A]">
                    {pt}
                  </span>
                ))}
              </div>
            </div>

            {/* 補瀉・手技 */}
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#737C77] dark:text-[#8899A6] block">手技方針:</span>
              <p className="text-xs text-[#404743] dark:text-[#C5D2DB]">
                {currentPreset.planA.needleMethod}
              </p>
            </div>

            {/* 注意・禁忌 */}
            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 text-xs text-amber-900 dark:text-amber-200 space-y-1">
              <div className="flex items-center gap-1 font-bold">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>臨床注意・禁忌事項</span>
              </div>
              <p>{currentPreset.planA.contraindications}</p>
            </div>
          </div>

          {/* 案B */}
          <div className="bg-white dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-[#E5DEC9] dark:border-[#2A3B4A] pb-3">
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-orange-100 dark:bg-orange-950 text-orange-800 dark:text-orange-300">
                  PLAN B
                </span>
                <h2 className="font-serif text-lg sm:text-xl font-bold text-[#232826] dark:text-[#FAF8F5] mt-1">
                  {currentPreset.planB.name}
                </h2>
              </div>
            </div>

            {/* 八綱ステータス */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="bg-[#FAF8F5] dark:bg-[#121920] p-2 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A]">
                <span className="text-[10px] text-[#737C77] block">表裏</span>
                <span className="font-bold text-[#232826] dark:text-[#FAF8F5]">{currentPreset.planB.hachiko.depth}</span>
              </div>
              <div className="bg-[#FAF8F5] dark:bg-[#121920] p-2 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A]">
                <span className="text-[10px] text-[#737C77] block">寒熱</span>
                <span className={`font-bold ${currentPreset.planB.hachiko.temp === "熱" ? "text-red-600" : "text-blue-600"}`}>
                  {currentPreset.planB.hachiko.temp}
                </span>
              </div>
              <div className="bg-[#FAF8F5] dark:bg-[#121920] p-2 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A]">
                <span className="text-[10px] text-[#737C77] block">虚実</span>
                <span className="font-bold text-[#232826] dark:text-[#FAF8F5]">{currentPreset.planB.hachiko.state}</span>
              </div>
            </div>

            {/* 病態機序 */}
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#737C77] dark:text-[#8899A6] block">病態機序:</span>
              <p className="text-xs text-[#59615D] dark:text-[#96A6B2] leading-relaxed bg-[#FAF8F5] dark:bg-[#121920] p-3 rounded-xl">
                {currentPreset.planB.coreMechanism}
              </p>
            </div>

            {/* 主穴・配穴 */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#737C77] dark:text-[#8899A6] block">主穴 ＆ 配穴構成:</span>
              <div className="flex flex-wrap gap-1.5">
                {currentPreset.planB.primaryPoints.map(pt => (
                  <span key={pt} className="text-xs px-2.5 py-1 rounded-lg bg-[#FCF4EB] dark:bg-[#2A1E14] text-[#B86924] dark:text-[#E6C387] font-bold border border-[#F3DEC5] dark:border-[#4A321E]">
                    ★ {pt}（主穴）
                  </span>
                ))}
                {currentPreset.planB.secondaryPoints.map(pt => (
                  <span key={pt} className="text-xs px-2.5 py-1 rounded-lg bg-[#FAF8F5] dark:bg-[#151D25] text-[#59615D] dark:text-[#96A6B2] border border-[#E5DEC9] dark:border-[#2A3B4A]">
                    {pt}
                  </span>
                ))}
              </div>
            </div>

            {/* 補瀉・手技 */}
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#737C77] dark:text-[#8899A6] block">手技方針:</span>
              <p className="text-xs text-[#404743] dark:text-[#C5D2DB]">
                {currentPreset.planB.needleMethod}
              </p>
            </div>

            {/* 注意・禁忌 */}
            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 text-xs text-amber-900 dark:text-amber-200 space-y-1">
              <div className="flex items-center gap-1 font-bold">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>臨床注意・禁忌事項</span>
              </div>
              <p>{currentPreset.planB.contraindications}</p>
            </div>
          </div>

        </div>

      </div>

      {/* 認証・アップグレードモーダル */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        title="条件比較シミュレーター"
        description="全プリセットの比較および自由カスタマイズ比較はプレミアム会員限定機能です。"
      />
    </div>
  );
}

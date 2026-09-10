"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Layers,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowDown,
  ShieldAlert,
  HelpCircle,
  Calendar,
} from "lucide-react";

export default function TreatmentStrataModel() {
  const [selectedMode, setSelectedMode] = useState<"ok" | "ng-drain" | "ng-tonify">("ok");
  const [selectedLayer, setSelectedLayer] = useState<"biao" | "ben">("ben");

  return (
    <figure className="my-8 bg-[#FFFFFF] dark:bg-[#17212A] rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-8 shadow-sm transition-colors overflow-hidden">
      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F2ECE0] dark:border-[#22303D] pb-4 mb-6">
        <div>
          <span className="text-[11px] font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
            <span>画像解説④：本虚標実の地層モデルと介入ジレンマ解法図</span>
          </span>
          <h4 className="font-serif font-bold text-lg sm:text-xl text-[#232826] dark:text-[#FAF8F5] mt-1">
            表層の渋滞（標実）と深層の枯渇（本虚）を同時に解くタイムライン設計
          </h4>
        </div>
        <span className="text-xs text-[#59615D] dark:text-[#96A6B2]">
          本治法 ＋ 標治法の精密ハイブリッド
        </span>
      </div>

      <p className="text-xs text-[#59615D] dark:text-[#CBD5E1] leading-relaxed mb-6">
        現代の慢性病の8割以上は、土台のエネルギー不足（本虚：脾腎気虚）の上に二次的な老廃物や凝りが溜まる<strong>「本虚標実（ほんきょひょうじつ）」</strong>の地層構造をとります。
        このとき<strong>「実だけを瀉すと土台が崩壊し、虚だけを補うと渋滞が激化する」</strong>という臨床最大のジレンマが発生します。
      </p>

      {/* 地層ビジュアル表示 */}
      <div className="bg-[#FAF8F5] dark:bg-[#121920] rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] p-5 sm:p-7 mb-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5]">
            人体の「病態地層断面」と介入ターゲット
          </span>
          <span className="text-[11px] font-mono text-[#8C9691] dark:text-[#64748B]">
            STRATIFIED PATHOLOGY
          </span>
        </div>

        {/* 2層の地層スライスUI */}
        <div className="space-y-3">
          {/* 表層：標実 */}
          <button
            onClick={() => setSelectedLayer("biao")}
            className={`w-full p-4 rounded-xl text-left border transition-all relative overflow-hidden ${
              selectedLayer === "biao"
                ? "bg-[#FFF3E0] dark:bg-[#2D1F15] border-[#B86924] dark:border-[#E6C387] shadow-sm ring-2 ring-[#B86924]/20"
                : "bg-white dark:bg-[#17212A] border-[#E5DEC9] dark:border-[#2A3B4A] opacity-80 hover:opacity-100"
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-mono font-bold text-[#D32F2F] dark:text-[#EF5350] uppercase">
                SURFACE LAYER（表層・標実：渋滞・炎症・苦痛）
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#D32F2F] text-white">
                標治（通法・瀉法）
              </span>
            </div>
            <div className="text-sm font-bold text-[#232826] dark:text-[#FAF8F5]">
              激烈な肩こり、締め付けられる頭痛、むくみ、イライラ、胃のつかえ
            </div>
            <p className="text-[11px] text-[#59615D] dark:text-[#CBD5E1] mt-1 leading-relaxed">
              気滞・瘀血・痰湿など、巡りが止まって局所に溜まった「ゴミと交通渋滞」。患者が最も訴える自覚症状。
            </p>
          </button>

          {/* 深層：本虚 */}
          <button
            onClick={() => setSelectedLayer("ben")}
            className={`w-full p-4 rounded-xl text-left border transition-all relative overflow-hidden ${
              selectedLayer === "ben"
                ? "bg-[#E8F5E9] dark:bg-[#132A1C] border-[#1E3D34] dark:border-[#74BA9E] shadow-sm ring-2 ring-[#1E3D34]/20"
                : "bg-white dark:bg-[#17212A] border-[#E5DEC9] dark:border-[#2A3B4A] opacity-80 hover:opacity-100"
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-mono font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase">
                DEEP ROOT LAYER（深層・本虚：生命バッテリー枯渇）
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#1E3D34] text-white">
                本治（補法・温陽）
              </span>
            </div>
            <div className="text-sm font-bold text-[#232826] dark:text-[#FAF8F5]">
              脾気虚弱（胃腸吸収力低下）、腎陽虚（先天バッテリーの消耗）、気血両虚
            </div>
            <p className="text-[11px] text-[#59615D] dark:text-[#CBD5E1] mt-1 leading-relaxed">
              エネルギーを生み出せず、ゴミを押し流す推進力そのものが底をついている「根本の地盤沈下」。
            </p>
          </button>
        </div>
      </div>

      {/* 介入シミュレーション（ジレンマ解法 vs 失敗パターン） */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#F2ECE0] dark:border-[#22303D]">
          <span className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5]">
            介入シミュレーション：アプローチを選択
          </span>
          <span className="text-[10px] text-[#59615D] dark:text-[#96A6B2]">
            タブを切り替えて生体反応を確認
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedMode("ok")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              selectedMode === "ok"
                ? "bg-[#1E3D34] text-white shadow-xs"
                : "bg-[#FAF8F5] dark:bg-[#121920] text-[#59615D] dark:text-[#96A6B2] border border-[#E8E1D1] dark:border-[#22303D]"
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>【最適解】本標統合タイムライン設計</span>
          </button>
          <button
            onClick={() => setSelectedMode("ng-drain")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              selectedMode === "ng-drain"
                ? "bg-[#D32F2F] text-white shadow-xs"
                : "bg-[#FAF8F5] dark:bg-[#121920] text-[#59615D] dark:text-[#96A6B2] border border-[#E8E1D1] dark:border-[#22303D]"
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>【失敗例A】標の実（コリ・痛み）だけを強瀉</span>
          </button>
          <button
            onClick={() => setSelectedMode("ng-tonify")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              selectedMode === "ng-tonify"
                ? "bg-[#B86924] text-white shadow-xs"
                : "bg-[#FAF8F5] dark:bg-[#121920] text-[#59615D] dark:text-[#96A6B2] border border-[#E8E1D1] dark:border-[#22303D]"
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>【失敗例B】本虚（疲労）だけを盲目的に補う</span>
          </button>
        </div>

        {/* 選択モードの解説カード */}
        <div className="bg-[#FAF8F5] dark:bg-[#121920] rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] p-5 sm:p-6">
          {selectedMode === "ok" && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                <CheckCircle2 className="w-4 h-4" />
                <span>プロの設計：主証（本治7割） ＋ 客証（標治3割）の立体配穴</span>
              </div>
              <p className="text-xs text-[#59615D] dark:text-[#CBD5E1] leading-relaxed">
                まず<strong>「足三里・中脘（本治）」</strong>で胃腸の消化吸収エンジンを静かに補益し、気血の産生基盤を整えます。その上で、二次的に上逆した肩や側頭部の詰まりを<strong>「太衝・風池（標治）」</strong>で軽やかに疏通します。土台を守りながら渋滞を解くため、もみ返しや虚脱が一切なく、翌朝劇的なスッキリ感が訪れます。
              </p>
              <div className="p-3 bg-white dark:bg-[#17212A] rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A] text-xs">
                <strong className="text-[10px] font-mono font-bold text-[#1E3D34] dark:text-[#74BA9E] block mb-1">
                  TIMELINE STRATEGY
                </strong>
                <span className="text-[#232826] dark:text-[#FAF8F5]">
                  施術前半で本治（補法・置鍼） ➜ 施術後半で標治（通法・軽瀉） ➜ 最後に脈の充実を確認して終了。
                </span>
              </div>
            </div>
          )}

          {selectedMode === "ng-drain" && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#D32F2F] dark:text-[#EF5350]">
                <AlertTriangle className="w-4 h-4" />
                <span>誤治メカニズム：土台の地盤沈下（虚脱・悪化）</span>
              </div>
              <p className="text-xs text-[#59615D] dark:text-[#CBD5E1] leading-relaxed">
                肩や首の強い凝りだけを見て、太い鍼でガンガン雀啄したり強い強揉みを行うと、その場では一時的に麻痺して緩んだように感じます。しかし、深層の気血が極度に消耗しているため、翌日に強烈な倦怠感・寝込み・めまい（いわゆる激しいもみ返し・正気削ぎ）が起こり、数日後に前より頑固な凝りが形成されます。
              </p>
            </div>
          )}

          {selectedMode === "ng-tonify" && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#B86924] dark:text-[#E6C387]">
                <AlertTriangle className="w-4 h-4" />
                <span>誤治メカニズム：渋滞への燃料投下（腹満・のぼせ）</span>
              </div>
              <p className="text-xs text-[#59615D] dark:text-[#CBD5E1] leading-relaxed">
                疲労しているからといって、胃腸に痰湿や気滞が溜まっている状態で高麗人参や強い補血温熱ばかりを入れると、交通渋滞のど真ん中にガソリンを流し込むことになります。気が詰まって胸が苦しくなり、頭痛や不眠、口内炎、皮膚の発疹（熱化現象）が噴出します。
              </p>
            </div>
          )}
        </div>
      </div>
    </figure>
  );
}

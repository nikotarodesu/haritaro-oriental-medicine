"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Cog,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Workflow,
  Stethoscope,
  Layers,
} from "lucide-react";

interface Props {
  onNextLecture?: () => void;
}

interface SystemGear {
  number: number;
  title: string;
  en: string;
  role: string;
  clinicalOutput: string;
  color: string;
}

const SYSTEM_GEARS: SystemGear[] = [
  { number: 1, title: "陰陽論", en: "Yin-Yang", role: "生命のOS・動的平衡", clinicalOutput: "治療の極性・大枠の進むべきベクトルを決定", color: "#B86924" },
  { number: 2, title: "五行論", en: "Five Elements", role: "生体ネットワーク回路図", clinicalOutput: "病変の波及先（母子相生・相克）を予測・制御", color: "#2E7D32" },
  { number: 3, title: "気血水", en: "Qi-Blood-Fluid", role: "生命を動かす実体素材", clinicalOutput: "動かすべき材料の不足・停滞・偏在を同定", color: "#0288D1" },
  { number: 4, title: "生命機能", en: "Life Dynamics", role: "三焦・営衛の動態プロセス", clinicalOutput: "生体内インフラ（輸送路・境界防壁）の状態把握", color: "#7B1FA2" },
  { number: 5, title: "病機論", en: "Pathomechanism", role: "機能の歪みとドミノ倒し", clinicalOutput: "発症から慢性化に至る破綻ストーリーの解読", color: "#D32F2F" },
  { number: 6, title: "診断論", en: "Diagnostic Logic", role: "四診・八綱による座標固定", clinicalOutput: "客観的身体サインから一文の「確定証」へ収束", color: "#1E3D34" },
  { number: 7, title: "治法論", en: "Therapeutic Arch", role: "生命システムの再設計技術", clinicalOutput: "補瀉・標本・手技による最適介入コードの実行", color: "#FFA000" },
];

export default function TreatmentSystemToPracticeBridge({ onNextLecture }: Props) {
  const [activeGearNum, setActiveGearNum] = useState<number>(7);
  const activeGear = SYSTEM_GEARS.find((g) => g.number === activeGearNum) || SYSTEM_GEARS[6];

  return (
    <figure className="my-8 bg-[#FFFFFF] dark:bg-[#17212A] rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-8 shadow-sm transition-colors overflow-hidden">
      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F2ECE0] dark:border-[#22303D] pb-4 mb-6">
        <div>
          <span className="text-[11px] font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
            <span>画像解説⑨：全体系の完結から臨床実践へのトランスフォーム図</span>
          </span>
          <h4 className="font-serif font-bold text-lg sm:text-xl text-[#232826] dark:text-[#FAF8F5] mt-1">
            7つの歯車が連動し、臨床現場の「生体介入アルゴリズム」が起動する
          </h4>
        </div>
        <span className="text-xs text-[#59615D] dark:text-[#96A6B2]">
          全体系の統合と完結
        </span>
      </div>

      <p className="text-xs text-[#59615D] dark:text-[#CBD5E1] leading-relaxed mb-6">
        陰陽論から治法論まで──東洋医学の<strong>「生命が作動する原理（①〜④）」</strong>、<strong>「壊れるプロセス（⑤）」</strong>、<strong>「解き明かす手順（⑥）」</strong>、そして<strong>「再設計する技術（⑦）」</strong>のすべての理論ピースがここに揃いました。
        7つの理論歯車が組み合わさることで、生身の患者に対する臨床実践の動力が力強く回転を始めます。
      </p>

      {/* 7つの歯車インフォグラフィック */}
      <div className="bg-[#FAF8F5] dark:bg-[#121920] rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] p-5 sm:p-7 mb-6 space-y-6">
        <div className="flex items-center justify-between pb-2 border-b border-[#E5DEC9] dark:border-[#2A3B4A]">
          <div className="flex items-center gap-2 text-xs font-bold text-[#232826] dark:text-[#FAF8F5]">
            <Cog className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E] animate-spin" style={{ animationDuration: "12s" }} />
            <span>7連ギアドライブ（タップして各理論の役割を確認）</span>
          </div>
          <span className="text-[11px] font-mono text-[#8C9691] dark:text-[#64748B]">
            GEAR 0{activeGear.number} / 07
          </span>
        </div>

        {/* 7つの歯車ボタン横並び */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {SYSTEM_GEARS.map((gear) => {
            const isSelected = gear.number === activeGearNum;
            return (
              <button
                key={gear.number}
                onClick={() => setActiveGearNum(gear.number)}
                className={`p-3 rounded-xl text-left border transition-all relative overflow-hidden flex flex-col justify-between ${
                  isSelected
                    ? "bg-[#1E3D34] text-white border-[#1E3D34] shadow-sm ring-2 ring-[#1E3D34]/20 scale-[1.03]"
                    : "bg-white dark:bg-[#17212A] border-[#E5DEC9] dark:border-[#2A3B4A] opacity-80 hover:opacity-100"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono font-bold opacity-75">
                      0{gear.number}
                    </span>
                    {isSelected && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E6C387]" />
                    )}
                  </div>
                  <div className="text-xs font-bold truncate">{gear.title}</div>
                </div>
                <div className="text-[10px] opacity-75 truncate mt-2">{gear.en}</div>
              </button>
            );
          })}
        </div>

        {/* 選択した理論の臨床出力カード */}
        <div className="bg-white dark:bg-[#17212A] rounded-xl p-5 border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#F2ECE0] dark:border-[#22303D]">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#1E3D34] text-white">
                第 {activeGear.number} 講
              </span>
              <h5 className="font-bold text-base text-[#232826] dark:text-[#FAF8F5]">
                {activeGear.title}（{activeGear.en}）：{activeGear.role}
              </h5>
            </div>
            <span className="text-xs text-[#B86924] dark:text-[#E6C387] font-bold">
              臨床システムにおける役割
            </span>
          </div>

          <div className="p-3.5 rounded-lg bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#22303D] text-xs">
            <strong className="text-[10px] font-mono font-bold text-[#1E3D34] dark:text-[#74BA9E] block mb-1">
              CLINICAL SYSTEM OUTPUT（治療現場への実戦的還元）
            </strong>
            <p className="text-sm font-bold text-[#232826] dark:text-[#FAF8F5] leading-relaxed">
              {activeGear.clinicalOutput}
            </p>
          </div>
        </div>
      </div>

      {/* 次の講義へのナビゲーションカード */}
      <div className="bg-gradient-to-r from-[#1E3D34] to-[#2E5A44] dark:from-[#122816] dark:to-[#1B4D3E] rounded-2xl p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-5 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#A5D6A7] font-bold mb-1">
            <BookOpen className="w-4 h-4" />
            <span>カリキュラムの次なるステージへ</span>
          </div>
          <h5 className="font-serif font-bold text-lg sm:text-xl text-white">
            体系学習カリキュラム⑧：経絡論 ― 生体情報・力学ネットワークの統合モデル
          </h5>
          <p className="text-xs text-[#E8F5E9]/90 mt-1 max-w-xl leading-relaxed">
            治則と配穴を実行するための「伝達インフラ」。十二経脈の流注順序、筋膜連続性（アナトミートレイン）、奇経八脈の力学ネットワークを解き明かします。
          </p>
        </div>

        <button
          onClick={onNextLecture}
          className="shrink-0 px-5 py-3 rounded-xl bg-[#FFA000] hover:bg-[#FF8F00] text-[#1E3D34] font-bold text-sm shadow-md transition-all flex items-center gap-2 hover:translate-x-0.5"
        >
          <span>第8講へ進む</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </figure>
  );
}

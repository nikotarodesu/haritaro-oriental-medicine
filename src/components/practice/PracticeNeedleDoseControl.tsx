"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Zap,
  Activity,
  Gauge,
  Sliders,
  AlertTriangle,
  CheckCircle2,
  Fish,
  Wind,
} from "lucide-react";

export default function PracticeNeedleDoseControl() {
  const [needleGauge, setNeedleGauge] = useState<number>(2); // 1〜5番 (0.16mm〜0.24mm)
  const [depthMm, setDepthMm] = useState<number>(10); // 1mm〜30mm
  const [retentionMin, setRetentionMin] = useState<number>(10); // 0分〜30分
  const [pointsCount, setPointsCount] = useState<number>(4); // 1穴〜20穴
  const [mode, setMode] = useState<"bu" | "xie">("bu");

  // 刺激総量指数の簡易計算
  // ゲージ係数(1=1, 2=1.2, 3=1.5, 4=1.8, 5=2.2)
  const gaugeFactor = [1.0, 1.2, 1.5, 1.8, 2.2][needleGauge - 1] || 1.2;
  const rawDoseScore = Math.round(
    gaugeFactor * (depthMm / 5) * (Math.max(retentionMin, 1) / 5) * pointsCount
  );

  const getDoseLevel = (score: number) => {
    if (score <= 15) return { label: "低刺激ドーゼ（繊細・虚証・小児・高齢者向け）", color: "text-[#1E3D34] dark:text-[#74BA9E]", bg: "bg-[#EBF3EF] dark:bg-[#182823]", safe: true };
    if (score <= 45) return { label: "標準適正ドーゼ（一般的な成人の最適刺激）", color: "text-[#B86924] dark:text-[#E6C387]", bg: "bg-[#FFF3E0] dark:bg-[#3D2817]", safe: true };
    return { label: "⚠️ 刺激過多（ドーゼオーバー：もみ返し・正気削ぎの危険大）", color: "text-[#D32F2F] dark:text-[#EF5350]", bg: "bg-[#FFEBEE] dark:bg-[#2D1618]", safe: false };
  };

  const doseLevel = getDoseLevel(rawDoseScore);

  return (
    <figure className="my-8 bg-[#FFFFFF] dark:bg-[#17212A] rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-8 shadow-sm transition-colors overflow-hidden">
      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F2ECE0] dark:border-[#22303D] pb-4 mb-6">
        <div>
          <span className="text-[11px] font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
            <span>画像解説⑤：刺鍼・刺激総量の物理制御マニュアル</span>
          </span>
          <h4 className="font-serif font-bold text-lg sm:text-xl text-[#232826] dark:text-[#FAF8F5] mt-1">
            迎随補瀉・刺激総量・気至（得気）の精密エンジニアリング
          </h4>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-[#59615D] dark:text-[#96A6B2]">
          <Gauge className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E]" />
          <span>PHYSICAL CONTROLLER</span>
        </div>
      </div>

      <p className="text-xs text-[#59615D] dark:text-[#CBD5E1] leading-relaxed mb-6">
        鍼灸治療の結果は、「どこに刺すか（配穴）」だけでなく<strong>「どう操作し、どれだけの刺激量（ドーゼ）を患者に与えたか」</strong>で決まります。
        呼吸と同期した迎随補瀉、魚が釣れたような手応え（気至）、そして4要素の積で決まる刺激総量の物理制御を網羅します。
      </p>

      {/* 補法 vs 瀉法の呼吸・進退同期マニュアル */}
      <div className="bg-[#FAF8F5] dark:bg-[#121920] rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] p-5 sm:p-6 mb-6">
        <div className="flex items-center justify-between pb-3 border-b border-[#E5DEC9] dark:border-[#2A3B4A] mb-4">
          <span className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5]">
            呼吸・進退同期プロトコル（迎随補瀉）
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setMode("bu")}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                mode === "bu"
                  ? "bg-[#FFA000] text-white shadow-xs"
                  : "bg-white dark:bg-[#17212A] text-[#59615D] dark:text-[#96A6B2]"
              }`}
            >
              補法モード（充電）
            </button>
            <button
              onClick={() => setMode("xie")}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                mode === "xie"
                  ? "bg-[#0288D1] text-white shadow-xs"
                  : "bg-white dark:bg-[#17212A] text-[#59615D] dark:text-[#96A6B2]"
              }`}
            >
              瀉法モード（減圧）
            </button>
          </div>
        </div>

        {mode === "bu" ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="bg-white dark:bg-[#17212A] p-3.5 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A]">
              <strong className="text-[11px] text-[#FFA000] font-bold block mb-1">
                ① 刺入・抜鍼の呼吸同期
              </strong>
              <p className="text-[#59615D] dark:text-[#CBD5E1]">
                <strong>呼気終了時に刺入</strong>（副交感神経優位・脱力）。<strong>吸気時に抜鍼</strong>（気が体内に吸い込まれる）。
              </p>
            </div>
            <div className="bg-white dark:bg-[#17212A] p-3.5 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A]">
              <strong className="text-[11px] text-[#FFA000] font-bold block mb-1">
                ② 迎随（げんずい）の方向
              </strong>
              <p className="text-[#59615D] dark:text-[#CBD5E1]">
                <strong>随（流れに沿う）</strong>：経絡の流注方向に鍼先を向け、気血の流れを後押しする。
              </p>
            </div>
            <div className="bg-white dark:bg-[#17212A] p-3.5 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A]">
              <strong className="text-[11px] text-[#FFA000] font-bold block mb-1">
                ③ 抜鍼後の穴の処置
              </strong>
              <p className="text-[#59615D] dark:text-[#CBD5E1]">
                <strong>疾按（素早く塞ぐ）</strong>：抜鍼直後に指腹で穴を押し、注入した気の霧散を封じる。
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="bg-white dark:bg-[#17212A] p-3.5 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A]">
              <strong className="text-[11px] text-[#0288D1] font-bold block mb-1">
                ① 刺入・抜鍼の呼吸同期
              </strong>
              <p className="text-[#59615D] dark:text-[#CBD5E1]">
                <strong>吸気時に刺入</strong>（邪気が体表に浮き上がる）。<strong>呼気終了時に抜鍼</strong>（邪気を吐息と共に排出）。
              </p>
            </div>
            <div className="bg-white dark:bg-[#17212A] p-3.5 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A]">
              <strong className="text-[11px] text-[#0288D1] font-bold block mb-1">
                ② 迎随（げんずい）の方向
              </strong>
              <p className="text-[#59615D] dark:text-[#CBD5E1]">
                <strong>迎（流れに逆らう）</strong>：経絡の流れに逆らって鍼先を向け、猛烈な勢いを遮断・減圧。
              </p>
            </div>
            <div className="bg-white dark:bg-[#17212A] p-3.5 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A]">
              <strong className="text-[11px] text-[#0288D1] font-bold block mb-1">
                ③ 抜鍼後の穴の処置
              </strong>
              <p className="text-[#59615D] dark:text-[#CBD5E1]">
                <strong>不按（穴を開けたまま）</strong>：抜鍼後に穴を塞がず、邪気の抜け道を確保して放熱する。
              </p>
            </div>
          </div>
        )}
      </div>

      {/* 刺激総量（ドーゼ）計算シミュレーター */}
      <div className="bg-[#FAF8F5] dark:bg-[#121920] rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] p-5 sm:p-7 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E5DEC9] dark:border-[#2A3B4A]">
          <div>
            <span className="text-[10px] font-mono font-bold text-[#8C9691] dark:text-[#64748B]">
              DOSE FORMULA SIMULATOR
            </span>
            <h5 className="font-bold text-sm sm:text-base text-[#232826] dark:text-[#FAF8F5]">
              刺激総量 ＝ 鍼の太さ × 刺入深度 × 置鍼時間 × 穴数
            </h5>
          </div>
          <span className="text-xs font-mono font-bold text-[#1E3D34] dark:text-[#74BA9E]">
            TOTAL DOSE SCORE: {rawDoseScore}
          </span>
        </div>

        {/* 4つのスライダーコントロール */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="bg-white dark:bg-[#17212A] p-3 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-1.5">
            <div className="flex justify-between font-bold">
              <span>鍼の太さ（号数）</span>
              <span className="text-[#1E3D34] dark:text-[#74BA9E]">{needleGauge}番（0.{14 + needleGauge * 2}mm）</span>
            </div>
            <input
              type="range"
              min={1}
              max={5}
              value={needleGauge}
              onChange={(e) => setNeedleGauge(Number(e.target.value))}
              className="w-full accent-[#1E3D34]"
            />
          </div>

          <div className="bg-white dark:bg-[#17212A] p-3 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-1.5">
            <div className="flex justify-between font-bold">
              <span>刺入深度</span>
              <span className="text-[#1E3D34] dark:text-[#74BA9E]">{depthMm} mm</span>
            </div>
            <input
              type="range"
              min={2}
              max={30}
              step={2}
              value={depthMm}
              onChange={(e) => setDepthMm(Number(e.target.value))}
              className="w-full accent-[#1E3D34]"
            />
          </div>

          <div className="bg-white dark:bg-[#17212A] p-3 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-1.5">
            <div className="flex justify-between font-bold">
              <span>置鍼時間</span>
              <span className="text-[#1E3D34] dark:text-[#74BA9E]">{retentionMin} 分</span>
            </div>
            <input
              type="range"
              min={0}
              max={30}
              step={5}
              value={retentionMin}
              onChange={(e) => setRetentionMin(Number(e.target.value))}
              className="w-full accent-[#1E3D34]"
            />
          </div>

          <div className="bg-white dark:bg-[#17212A] p-3 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-1.5">
            <div className="flex justify-between font-bold">
              <span>穴数（ツボの本数）</span>
              <span className="text-[#1E3D34] dark:text-[#74BA9E]">{pointsCount} 穴</span>
            </div>
            <input
              type="range"
              min={1}
              max={16}
              value={pointsCount}
              onChange={(e) => setPointsCount(Number(e.target.value))}
              className="w-full accent-[#1E3D34]"
            />
          </div>
        </div>

        {/* ドーゼ評価アラート */}
        <div className={`p-4 rounded-xl border ${doseLevel.bg} flex items-center justify-between text-xs`}>
          <div className="flex items-center gap-2">
            {doseLevel.safe ? (
              <CheckCircle2 className={`w-4 h-4 ${doseLevel.color}`} />
            ) : (
              <AlertTriangle className={`w-4 h-4 ${doseLevel.color}`} />
            )}
            <span className={`font-bold ${doseLevel.color}`}>{doseLevel.label}</span>
          </div>
          <span className="text-[10px] font-mono opacity-80">
            負荷インデックス: {rawDoseScore} pt
          </span>
        </div>
      </div>
    </figure>
  );
}

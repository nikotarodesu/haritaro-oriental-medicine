"use client";

import React, { useState } from "react";
import { Sparkles, ArrowRight, CheckCircle2, AlertOctagon, RefreshCw, BookOpen, ShieldAlert } from "lucide-react";

interface Props {
  onNextLecture?: () => void;
}

export default function LifeDynamicsBreakdownBridge({ onNextLecture }: Props) {
  const [activeState, setActiveState] = useState<"healthy" | "broken">("healthy");

  return (
    <figure className="my-8 bg-[#FFFFFF] dark:bg-[#17212A] rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-8 shadow-sm transition-colors overflow-hidden">
      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F2ECE0] dark:border-[#22303D] pb-4 mb-6">
        <div>
          <span className="text-[11px] font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
            <span>画像解説⑧：機能健全から病態破綻へのトランスフォーム図</span>
          </span>
          <h4 className="font-serif font-bold text-lg sm:text-xl text-[#232826] dark:text-[#FAF8F5] mt-1">
            気機の調和（生命）から昇降出入の狂い（病理）へ ── 病機論へのゲートウェイ
          </h4>
        </div>

        {/* 状態トグル */}
        <div className="flex items-center gap-1.5 bg-[#FAF8F5] dark:bg-[#121920] p-1.5 rounded-2xl border border-[#E8E1D1] dark:border-[#2A3B4A]">
          <button
            onClick={() => setActiveState("healthy")}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 ${
              activeState === "healthy"
                ? "bg-[#2E7D32] text-white shadow-xs"
                : "text-[#59615D] dark:text-[#96A6B2] hover:text-[#232826]"
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            ① 健全な動態プロセス
          </button>
          <button
            onClick={() => setActiveState("broken")}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 ${
              activeState === "broken"
                ? "bg-[#C62828] text-white shadow-xs"
                : "text-[#59615D] dark:text-[#96A6B2] hover:text-[#232826]"
            }`}
          >
            <AlertOctagon className="w-3.5 h-3.5" />
            ② 気機の目詰まりと破綻
          </button>
        </div>
      </div>

      {/* 状態比較ボックス */}
      <div className="bg-[#FAF8F5] dark:bg-[#121920] rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] p-5 sm:p-7 mb-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* 左側：状態模式図SVG */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative w-full max-w-[280px] aspect-[1/1.1]">
              <svg viewBox="0 0 260 280" className="w-full h-full">
                {activeState === "healthy" ? (
                  // 健全：円滑な循環サイクル
                  <g>
                    {/* 背景円 */}
                    <circle cx="130" cy="140" r="100" fill="#E8F5E9" stroke="#2E7D32" strokeWidth="2" strokeDasharray="4 4" className="dark:fill-[#1B5E20]/20 dark:stroke-[#81C784]" />
                    {/* 上昇矢印（脾気・肝気） */}
                    <path d="M 60 180 Q 50 140 80 80" fill="none" stroke="#2E7D32" strokeWidth="4" markerEnd="url(#arrow)" />
                    <text x="50" y="130" fontSize="10" fontWeight="bold" fill="#2E7D32" className="dark:fill-[#A5D6A7]">
                      昇（脾・肝）
                    </text>
                    {/* 下降矢印（胃気・肺気） */}
                    <path d="M 200 80 Q 210 140 180 200" fill="none" stroke="#0288D1" strokeWidth="4" />
                    <text x="195" y="150" fontSize="10" fontWeight="bold" fill="#0277BD" className="dark:fill-[#81D4FA]">
                      降（肺・胃）
                    </text>
                    {/* 中心核 */}
                    <circle cx="130" cy="140" r="30" fill="#FFF8E1" stroke="#FFA000" strokeWidth="2" />
                    <text x="130" y="138" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#E65100">
                      中焦枢紐
                    </text>
                    <text x="130" y="152" textAnchor="middle" fontSize="8" fill="#59615D">
                      気機の軸
                    </text>
                    <text x="130" y="260" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#2E7D32" className="dark:fill-[#A5D6A7]">
                      昇降出入の完全な動的平衡
                    </text>
                  </g>
                ) : (
                  // 破綻：気機の激突・逆流・鬱滞
                  <g>
                    {/* 背景円（赤く歪む） */}
                    <circle cx="130" cy="140" r="100" fill="#FFEBEE" stroke="#D32F2F" strokeWidth="2.5" className="dark:fill-[#D32F2F]/20 dark:stroke-[#EF5350]" />
                    {/* 気逆矢印（激しい上昇衝突） */}
                    <path d="M 80 180 L 130 90" fill="none" stroke="#D32F2F" strokeWidth="4" />
                    <text x="60" y="110" fontSize="10" fontWeight="bold" fill="#C62828">
                      気逆（嘔吐・頭痛）
                    </text>
                    {/* 気陥矢印（底抜け下垂） */}
                    <path d="M 170 140 L 130 220" fill="none" stroke="#7B1FA2" strokeWidth="4" strokeDasharray="4 2" />
                    <text x="160" y="210" fontSize="10" fontWeight="bold" fill="#6A1B9A">
                      気陥（下痢・胃下垂）
                    </text>
                    {/* 中心核（詰まる） */}
                    <circle cx="130" cy="140" r="30" fill="#EEEEEE" stroke="#D32F2F" strokeWidth="3" />
                    <text x="130" y="138" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#C62828">
                      気機鬱結
                    </text>
                    <text x="130" y="152" textAnchor="middle" fontSize="8" fill="#B71C1C">
                      渋滞・閉塞
                    </text>
                    <text x="130" y="260" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#C62828" className="dark:fill-[#EF9A9A]">
                      昇降失調 ➜ 瘀血・痰湿のドミノ倒し
                    </text>
                  </g>
                )}
              </svg>
            </div>
            <span className="text-[11px] text-[#59615D] dark:text-[#96A6B2] mt-2 text-center">
              {activeState === "healthy"
                ? "生命の呼吸：昇るべき気が昇り、降りるべき気が降りる円滑な回転"
                : "病態の始まり：気機の昇降が狂い、中心の軸（脾胃）で大渋滞が発生"}
            </span>
          </div>

          {/* 右側：解説 */}
          <div className="lg:col-span-7 space-y-3.5">
            <div className="bg-white dark:bg-[#17212A] p-4 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A]">
              <h5 className="font-bold text-sm sm:text-base text-[#232826] dark:text-[#FAF8F5] mb-2">
                {activeState === "healthy"
                  ? "生命とは「昇降出入（しょうこうしゅつにゅう）」の動態そのもの"
                  : "病気とは「気機（昇降出入）の目詰まり」から始まる"}
              </h5>
              <p className="text-xs text-[#59615D] dark:text-[#CBD5E1] leading-relaxed">
                {activeState === "healthy"
                  ? "『素問・六微旨大論』には「昇降出入無ければ、神機化滅す」と記されています。気が体内外を自在に行き来し、上へ昇り下へ降りるサイクルが健全である限り、細胞は老廃物を溜めず、病は生じません。"
                  : "ストレス・過労・飲食不摂生によって昇降のバランスが崩れると、気が上に突き上げる「気逆」、底が抜けて下に落ちる「気陥」、外へ逃げられない「気閉」、その場で凝り固まる「気滞」が生じ、これがドミノ倒しのように全身病態（病機）へと転化します。"}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A]">
                <strong className="text-[#1E3D34] dark:text-[#74BA9E] block mb-1">
                  機能論（本講義）：
                </strong>
                身体がどう作動しているか。営気・衛気の二重循環、三焦の空間リレー、四季への同調。
              </div>
              <div className="p-3 rounded-lg bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A]">
                <strong className="text-[#D32F2F] dark:text-[#EF5350] block mb-1">
                  病機論（次章の展開）：
                </strong>
                その機能がどのように狂い、どのような順序で連鎖破綻を起こすのかの法則性。
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 次の講義へのナビゲーションカード */}
      <div className="bg-gradient-to-r from-[#1E3D34] to-[#2E5A44] dark:from-[#122816] dark:to-[#1B4D3E] rounded-2xl p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-5">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#A5D6A7] font-bold mb-1">
            <BookOpen className="w-4 h-4" />
            <span>カリキュラムの次なるステージへ</span>
          </div>
          <h5 className="font-serif font-bold text-lg sm:text-xl text-white">
            体系学習カリキュラム⑤：病機論（Pathodynamics ― 生命の破綻プロセス）
          </h5>
          <p className="text-xs text-[#E8F5E9]/90 mt-1 max-w-xl leading-relaxed">
            機能の理解から、病理のメカニズムへ。外邪の侵入、内傷七情、虚実錯雑、そして六経病証・衛気営血弁証による病態進展の全貌を読み解きます。
          </p>
        </div>

        <button
          onClick={onNextLecture}
          className="shrink-0 px-5 py-3 rounded-xl bg-[#FFA000] hover:bg-[#FF8F00] text-[#1E3D34] font-bold text-sm shadow-md transition-all flex items-center gap-2 hover:translate-x-0.5"
        >
          <span>第5講へ進む</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </figure>
  );
}

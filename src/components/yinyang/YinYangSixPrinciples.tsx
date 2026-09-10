"use client";

import React, { useState } from "react";
import { Sparkles, ArrowRightLeft, Scale, Activity, RefreshCw, GitBranch, Split } from "lucide-react";

interface Principle {
  id: string;
  name: string;
  reading: string;
  en: string;
  icon: React.ReactNode;
  metaphor: string;
  summary: string;
  clinicalExample: string;
  tag: string;
}

export default function YinYangSixPrinciples() {
  const [selectedId, setSelectedId] = useState<string>("gokon");

  const principles: Principle[] = [
    {
      id: "gokon",
      name: "陰陽互根",
      reading: "いんようごこん",
      en: "Interdependence",
      icon: (
        <svg viewBox="0 0 48 48" className="w-8 h-8 text-[#B86924] dark:text-[#E6C387]" fill="none" stroke="currentColor" strokeWidth="2">
          {/* 互いの尾を噛み合う2匹の魚のモチーフ */}
          <path d="M12 24 C12 16 20 12 28 12 C36 12 40 18 36 24 C32 30 20 28 18 20" stroke="#C45A4A" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M36 24 C36 32 28 36 20 36 C12 36 8 30 12 24 C16 18 28 20 30 28" stroke="#1E3A5F" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="28" cy="18" r="2" fill="#C45A4A" />
          <circle cx="20" cy="30" r="2" fill="#1E3A5F" />
        </svg>
      ),
      metaphor: "尾を噛み合う双魚 / 光と影 / 機能と肉体",
      summary: "互いに相手を自己の存在基盤（根）とし、単独では存在し得ない関係。",
      clinicalExample: "活動エネルギー（気・陽）を使うには肉体・血液（血・陰）が必要。血を巡らせるには気が必要。「無陰則陽無以生、無陽則陰無以化」。",
      tag: "存在の不可分性"
    },
    {
      id: "seiyaku",
      name: "陰陽制約",
      reading: "いんようせいやく",
      en: "Mutual Restriction",
      icon: (
        <svg viewBox="0 0 48 48" className="w-8 h-8 text-[#B86924] dark:text-[#E6C387]" fill="none" stroke="currentColor" strokeWidth="2">
          {/* シーソーの拮抗モチーフ */}
          <line x1="8" y1="24" x2="40" y2="24" stroke="currentColor" strokeWidth="2.5" />
          <polygon points="24,24 20,36 28,36" fill="currentColor" opacity="0.3" stroke="currentColor" />
          <circle cx="12" cy="18" r="5" fill="#C45A4A" stroke="#C45A4A" />
          <circle cx="36" cy="18" r="5" fill="#1E3A5F" stroke="#1E3A5F" />
        </svg>
      ),
      metaphor: "水平に保たれたシーソー / 交感・副交感の拮抗",
      summary: "双方が互いを抑制・制御し合うことで、一方の過剰な暴走（亢進）を防ぐ。",
      clinicalExample: "身体が熱を持てば発汗（陰液）で冷やし、体が冷えればシバリング（陽気）で温める。このブレーキが壊れると「陽勝」「陰勝」へ暴走する。",
      tag: "恒常性・フィードバック"
    },
    {
      id: "shoucyou",
      name: "陰陽消長",
      reading: "いんようしょうちょう",
      en: "Waxing & Waning",
      icon: (
        <svg viewBox="0 0 48 48" className="w-8 h-8 text-[#B86924] dark:text-[#E6C387]" fill="none" stroke="currentColor" strokeWidth="2">
          {/* サインカーブの波形 */}
          <path d="M 6 24 Q 15 10 24 24 T 42 24" stroke="#C45A4A" strokeWidth="2.5" fill="none" />
          <line x1="6" y1="24" x2="42" y2="24" stroke="currentColor" strokeDasharray="2 2" opacity="0.4" />
          <circle cx="15" cy="14" r="3" fill="#C45A4A" />
          <circle cx="33" cy="34" r="3" fill="#1E3A5F" />
        </svg>
      ),
      metaphor: "朝昼夜の波 / サーカディアンリズム",
      summary: "絶え間なくシーソーのように増減（此消彼長・此長彼消）を繰り返す量的動態。",
      clinicalExample: "日の出から正午に向かって陽気が増大（陽長陰消）し、夕暮れから真夜中に向けて陰気が満ちる（陰長陽消）。静止することは一瞬もない。",
      tag: "生体リズム・周期的変化"
    },
    {
      id: "tenka",
      name: "陰陽転化",
      reading: "いんようてんか",
      en: "Transformation",
      icon: (
        <svg viewBox="0 0 48 48" className="w-8 h-8 text-[#B86924] dark:text-[#E6C387]" fill="none" stroke="currentColor" strokeWidth="2">
          {/* Uターン反転矢印 */}
          <path d="M 12 32 L 12 18 A 12 12 0 0 1 36 18 L 36 28" stroke="#1E3A5F" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <polyline points="30,24 36,30 42,24" stroke="#C45A4A" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </svg>
      ),
      metaphor: "冬至（陰極まりて陽生ず） / 臨界点での相転移",
      summary: "一定の極限（臨界点）に達すると、反対の極性へと質的に反転する法則。",
      clinicalExample: "「重陽必陰、重陰必陽」「寒極生熱、熱極生寒」。急性高熱（極陽）が限界を超えると突然四肢厥冷・意識混濁（虚脱・陰証）へと急転落する。",
      tag: "臨界反転・相転移"
    },
    {
      id: "kafun",
      name: "陰陽可分",
      reading: "いんようかぶん",
      en: "Infinite Divisibility",
      icon: (
        <svg viewBox="0 0 48 48" className="w-8 h-8 text-[#B86924] dark:text-[#E6C387]" fill="none" stroke="currentColor" strokeWidth="2">
          {/* フラクタル・枝分かれ */}
          <line x1="24" y1="8" x2="24" y2="22" stroke="currentColor" strokeWidth="2" />
          <line x1="24" y1="22" x2="14" y2="34" stroke="#C45A4A" strokeWidth="2" />
          <line x1="24" y1="22" x2="34" y2="34" stroke="#1E3A5F" strokeWidth="2" />
          <circle cx="14" cy="38" r="3" fill="#C45A4A" />
          <circle cx="34" cy="38" r="3" fill="#1E3A5F" />
        </svg>
      ),
      metaphor: "フラクタル構造 / マトリョーシカ / 自己相似性",
      summary: "陰と陽は絶対的な固定物ではなく、いかなる部分も無限に陰陽へ細分化できる。",
      clinicalExample: "人体の「上半身（陽）」の中にも「背部（陽中の陽）」と「胸腹部（陽中の陰）」がある。昼（陽）の中にも「午前（陽中の陽）」と「午後（陽中の陰）」がある。",
      tag: "相対性・多階層解析"
    },
    {
      id: "tairitsu",
      name: "陰陽対立",
      reading: "いんようたいりつ",
      en: "Polar Opposition",
      icon: (
        <svg viewBox="0 0 48 48" className="w-8 h-8 text-[#B86924] dark:text-[#E6C387]" fill="none" stroke="currentColor" strokeWidth="2">
          {/* 屈筋と伸筋の相互作用・相反矢印 */}
          <line x1="12" y1="16" x2="36" y2="16" stroke="#C45A4A" strokeWidth="2.5" markerEnd="url(#arrow)" strokeLinecap="round" />
          <line x1="36" y1="32" x2="12" y2="32" stroke="#1E3A5F" strokeWidth="2.5" markerEnd="url(#arrow)" strokeLinecap="round" />
          <circle cx="24" cy="24" r="4" fill="currentColor" opacity="0.3" />
        </svg>
      ),
      metaphor: "屈筋と伸筋の協調 / 作用と反作用",
      summary: "相反する2つのベクトルが向かい合うことで、1つの統一的な生命現象を成立させる。",
      clinicalExample: "上腕二頭筋（屈筋・陰）が収縮するとき、上腕三頭筋（伸筋・陽）が弛緩することで肘が滑らかに曲がる。対立し合うからこそ運動が成立する。",
      tag: "対立統一・協調ダイナミクス"
    }
  ];

  const active = principles.find((p) => p.id === selectedId) || principles[0];

  return (
    <figure className="my-8 bg-[#FFFFFF] dark:bg-[#17212A] rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-8 shadow-sm transition-colors">
      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F2ECE0] dark:border-[#22303D] pb-4 mb-6">
        <div>
          <span className="text-[11px] font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
            <span>画像解説②：陰陽6大原理のインフォグラフィック（The 6 Fundamental Principles）</span>
          </span>
          <h4 className="font-serif font-bold text-lg sm:text-xl text-[#232826] dark:text-[#FAF8F5] mt-1">
            人体の動的力学を支配する「6つの基本ルール」
          </h4>
        </div>
        <span className="text-xs text-[#59615D] dark:text-[#96A6B2]">
          各カードをクリックして詳細と臨床例を展開
        </span>
      </div>

      {/* 6分割カードグリッド */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        {principles.map((p) => {
          const isSelected = p.id === selectedId;
          return (
            <button
              key={p.id}
              onClick={() => setSelectedId(p.id)}
              className={`p-3.5 rounded-2xl text-left transition-all flex flex-col justify-between border ${
                isSelected
                  ? "bg-[#FAF8F5] dark:bg-[#1C2834] border-[#1E3D34] dark:border-[#74BA9E] shadow-md ring-2 ring-[#1E3D34]/10 dark:ring-[#74BA9E]/20 -translate-y-0.5"
                  : "bg-[#FFFFFF] dark:bg-[#121920] border-[#E8E1D1] dark:border-[#22303D] hover:border-[#B86924]/60 hover:bg-[#FAF8F5]/60"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="p-1.5 rounded-xl bg-[#FAF8F5] dark:bg-[#1A2530] border border-[#E8E1D1] dark:border-[#2A3B4A]">
                  {p.icon}
                </div>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E]">
                  {p.en.slice(0, 5)}..
                </span>
              </div>
              <div>
                <h5 className="font-serif font-bold text-sm text-[#232826] dark:text-[#FAF8F5]">
                  {p.name}
                </h5>
                <p className="text-[10px] text-[#737C77] dark:text-[#8899A6]">
                  {p.reading}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* 選択された原理のクローズアップ解説エリア */}
      <div className="bg-[#FAF8F5] dark:bg-[#121920] rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] p-5 sm:p-6 transition-all">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E8E1D1] dark:border-[#22303D] pb-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFFFFF] dark:bg-[#1A2530] border border-[#E5DEC9] dark:border-[#2A3B4A] flex items-center justify-center shadow-sm">
              {active.icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h5 className="font-serif font-bold text-base sm:text-lg text-[#1E3D34] dark:text-[#74BA9E]">
                  {active.name}（{active.reading} / {active.en}）
                </h5>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#FCF4EB] dark:bg-[#2A1D15] text-[#B86924] dark:text-[#E6C387] border border-[#F3E1CB] dark:border-[#4D3320]">
                  {active.tag}
                </span>
              </div>
              <p className="text-xs text-[#59615D] dark:text-[#96A6B2]">
                イメージ・比喩：<span className="font-medium text-[#232826] dark:text-[#D5E0DC]">{active.metaphor}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-4 rounded-xl bg-[#FFFFFF] dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-1.5">
            <span className="text-[11px] font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider block">
              【基本概念・本質】
            </span>
            <p className="text-[#333835] dark:text-[#C5D2DB] leading-relaxed">
              {active.summary}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#FCF4EB]/70 dark:bg-[#1F1712] border border-[#F3E1CB] dark:border-[#3D281C] space-y-1.5">
            <span className="text-[11px] font-bold text-[#B86924] dark:text-[#E6C387] uppercase tracking-wider block">
              【臨床・生理学的現れ】
            </span>
            <p className="text-[#404743] dark:text-[#D1C6BA] leading-relaxed">
              {active.clinicalExample}
            </p>
          </div>
        </div>
      </div>
    </figure>
  );
}

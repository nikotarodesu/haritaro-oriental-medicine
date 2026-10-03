"use client";

import React, { useState } from "react";
import { Sparkles } from "lucide-react";

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
      clinicalExample: "伝統理論では、陽の働きと、それを支える陰の側面を相互依存として説明する。「気」「血」はここで使う理論上の概念で、エネルギーや血液の測定値と同義ではない。",
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
      metaphor: "水平に保たれたシーソー / 過不足を抑える関係",
      summary: "双方が互いを抑制・制御し合うことで、一方の過剰な暴走（亢進）を防ぐ。",
      clinicalExample: "暑さと涼しさを釣り合わせるイメージで捉える。体温調節を例に連想しても、陰陽をその制御機構と同一視しない。陰陽の偏りという分類だけで医学的な原因は診断できない。",
      tag: "相互制約・均衡"
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
      metaphor: "朝昼夜の波 / 周期的な増減",
      summary: "絶え間なくシーソーのように増減（此消彼長・此長彼消）を繰り返す量的動態。",
      clinicalExample: "昼に向けて陽が増し、夜に向けて陰が増すという伝統的な分類で、変化を表す。図の波は生体リズムの測定値や、自律神経の活動量を示すグラフではない。",
      tag: "増減・周期的変化"
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
      metaphor: "冬から春への変化 / 性質の移り変わり",
      summary: "一定の条件で、陰と陽の性質が互いへ転じると説明する伝統的な考え方。",
      clinicalExample: "季節の移り変わりなどを、陰陽の質的な転換として学ぶ。高熱に意識の変化が伴う場合は、この理論で急変を診断したり経過を待ったりせず、緊急の医療評価を受ける。",
      tag: "条件による転換"
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
      metaphor: "多層構造 / マトリョーシカ / 入れ子構造",
      summary: "陰と陽は絶対的な固定物ではなく、いかなる部分も無限に陰陽へ細分化できる。",
      clinicalExample: "伝統的な分類では、昼を陽としても、その中を午前と午後に分けて相対的な陰陽を考える。分類の基準を変えれば位置づけも変わり、部位や時間に絶対的な陰陽があるとするものではない。",
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
      metaphor: "逆向きの矢印 / 相反する側面の関係",
      summary: "相反する二つの側面を、ひとつの関係の中で捉える伝統的な考え方。",
      clinicalExample: "屈筋と伸筋の関係を比喩に使う場合も、筋を陰・陽へ固定分類せず、異なる働きの協調を連想するために用いる。実際の運動制御の仕組みを陰陽論で証明するものではない。",
      tag: "対立統一・協調ダイナミクス"
    }
  ];

  const active = principles.find((p) => p.id === selectedId) || principles[0];

  return (
    <figure className="my-6 sm:my-8 bg-[#FFFFFF] dark:bg-[#17212A] rounded-2xl sm:rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-3 sm:p-6 md:p-8 shadow-sm transition-colors">
      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F2ECE0] dark:border-[#22303D] pb-3 mb-4 sm:mb-6">
        <div>
          <span className="text-[11px] font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
            <span>画像解説②：陰陽6大原理のインフォグラフィック</span>
          </span>
          <h4 className="font-serif font-bold text-base sm:text-xl text-[#232826] dark:text-[#FAF8F5] mt-1">
            陰陽の関係を学ぶ「6つの原理」
          </h4>
        </div>
        <span className="text-xs text-[#59615D] dark:text-[#96A6B2]">
          各カードを選んで説明と学習例を展開
        </span>
      </div>

      {/* 6分割カードグリッド */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 mb-4 sm:mb-6">
        {principles.map((p) => {
          const isSelected = p.id === selectedId;
          return (
            <button
              key={p.id}
              type="button"
              aria-pressed={isSelected}
              onClick={() => setSelectedId(p.id)}
              className={`p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl text-left transition-all flex flex-col justify-between border ${
                isSelected
                  ? "bg-[#FAF8F5] dark:bg-[#1C2834] border-[#1E3D34] dark:border-[#74BA9E] shadow-md ring-2 ring-[#1E3D34]/10 dark:ring-[#74BA9E]/20 -translate-y-0.5"
                  : "bg-[#FFFFFF] dark:bg-[#121920] border-[#E8E1D1] dark:border-[#22303D] hover:border-[#B86924]/60 hover:bg-[#FAF8F5]/60"
              }`}
            >
              <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                <div className="p-1 sm:p-1.5 rounded-lg sm:rounded-xl bg-[#FAF8F5] dark:bg-[#1A2530] border border-[#E8E1D1] dark:border-[#2A3B4A]">
                  {p.icon}
                </div>
                <span className="text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E]">
                  第{principles.indexOf(p) + 1}原理
                </span>
              </div>
              <div>
                <h5 className="font-serif font-bold text-xs sm:text-sm text-[#232826] dark:text-[#FAF8F5]">
                  {p.name}
                </h5>
                <p className="text-[9px] sm:text-[10px] text-[#737C77] dark:text-[#8899A6]">
                  {p.reading}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* 選択された原理のクローズアップ解説エリア */}
      <div className="bg-[#FAF8F5] dark:bg-[#121920] rounded-xl sm:rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] p-3.5 sm:p-6 transition-all">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E8E1D1] dark:border-[#22303D] pb-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFFFFF] dark:bg-[#1A2530] border border-[#E5DEC9] dark:border-[#2A3B4A] flex items-center justify-center shadow-sm">
              {active.icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h5 className="font-serif font-bold text-base sm:text-lg text-[#1E3D34] dark:text-[#74BA9E]">
                  {active.name}（{active.reading}）
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
              【伝統分類・学習上の例】
            </span>
            <p className="text-[#404743] dark:text-[#D1C6BA] leading-relaxed">
              {active.clinicalExample}
            </p>
          </div>
        </div>
      </div>
      <figcaption className="mt-4 text-[11px] leading-relaxed text-[#737C77] dark:text-[#96A6B2]">
        六つの原理は伝統理論の学習用整理です。比喩と生理学の実証を区別し、症状の医学的な評価をこの図で置き換えません。
        急な発熱や意識の変化についての参考：<a href="https://medlineplus.gov/sepsis.html" className="underline">NIH / MedlinePlus</a>。
      </figcaption>
    </figure>
  );
}

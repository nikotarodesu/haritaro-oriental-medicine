"use client";

import { useId, useState } from "react";

const ZONES = [
  { id: "all", label: "上下を比較" },
  { id: "upper", label: "上部の訴え" },
  { id: "lower", label: "下部の訴え" },
] as const;

export default function PathomechanismThermoXushi() {
  const [highlightZone, setHighlightZone] = useState<(typeof ZONES)[number]["id"]>("all");
  const figureId = useId();
  const heatId = `${figureId}-heat`;
  const coolId = `${figureId}-cool`;

  return (
    <figure className="my-8 overflow-hidden rounded-3xl border border-[#E5DEC9] bg-white p-6 shadow-sm dark:border-[#2A3B4A] dark:bg-[#17212A] sm:p-8">
      <div className="mb-6 flex flex-col justify-between gap-4 border-b border-[#F2ECE0] pb-4 dark:border-[#22303D] sm:flex-row sm:items-center">
        <div>
          <p className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E]">寒熱錯雑の比較図</p>
          <h4 className="mt-1 font-serif text-lg font-bold text-[#232826] dark:text-[#FAF8F5]">「顔が熱く、足が冷たい」という訴えを分けて読む</h4>
        </div>
        <div className="flex flex-wrap gap-1" role="group" aria-label="比較する部位">
          {ZONES.map((zone) => (
            <button key={zone.id} type="button" aria-pressed={highlightZone === zone.id} onClick={() => setHighlightZone(zone.id)} className={`rounded-lg px-3 py-2 text-xs font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B86924] ${highlightZone === zone.id ? "bg-[#1E3D34] text-white" : "bg-[#F2ECE0] text-[#59615D] dark:bg-[#22303D] dark:text-[#CBD5E1]"}`}>
              {zone.label}
            </button>
          ))}
        </div>
      </div>
      <div className="grid items-center gap-6 rounded-2xl bg-[#FAF8F5] p-5 dark:bg-[#121920] lg:grid-cols-2">
        <div className="mx-auto w-full max-w-[280px]">
          <svg viewBox="0 0 240 320" className="w-full" role="img" aria-label="上部に熱感、下部に冷感がある架空例。色は自覚的な訴えの区分で、測定温度を示さない。">
            <defs>
              <linearGradient id={heatId} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#D32F2F" /><stop offset="100%" stopColor="#F57C00" /></linearGradient>
              <linearGradient id={coolId} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#0288D1" /><stop offset="100%" stopColor="#3949AB" /></linearGradient>
            </defs>
            <g opacity={highlightZone === "lower" ? 0.3 : 1}>
              <rect x="35" y="15" width="170" height="135" rx="20" fill={`url(#${heatId})`} />
              <circle cx="120" cy="50" r="25" fill="#B71C1C" />
              <text x="120" y="54" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">顔の熱感</text>
              <text x="120" y="109" textAnchor="middle" fill="white" fontSize="10">いつ・何をしていると感じる？</text>
            </g>
            <rect x="25" y="153" width="190" height="20" rx="6" fill="#455A64" />
            <text x="120" y="167" textAnchor="middle" fill="white" fontSize="9">上下の訴えを別々に記録する</text>
            <g opacity={highlightZone === "upper" ? 0.3 : 1}>
              <rect x="35" y="176" width="170" height="135" rx="20" fill={`url(#${coolId})`} />
              <path d="M85 200L75 295M155 200L165 295" stroke="white" strokeWidth="6" strokeLinecap="round" opacity="0.5" />
              <text x="120" y="238" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">足の冷感</text>
              <text x="120" y="278" textAnchor="middle" fill="white" fontSize="10">左右差・環境・持続時間は？</text>
            </g>
          </svg>
          <p className="mt-2 text-center text-xs text-[#59615D] dark:text-[#96A6B2]">色は訴えを見分けるための表示です。サーモグラフィではありません。</p>
        </div>
        <div className="space-y-4 text-sm leading-relaxed text-[#59615D] dark:text-[#CBD5E1]">
          <section className="rounded-xl border border-[#E5DEC9] bg-white p-4 dark:border-[#2A3B4A] dark:bg-[#17212A]">
            <h5 className="mb-2 font-bold text-[#232826] dark:text-[#FAF8F5]">観察した事実</h5>
            <p>架空例では「作業中に顔が熱い」「足先は冷たい」という本人の訴えがあります。測定した体温や皮膚温、始まった時期、周囲の温度は別に記録します。</p>
          </section>
          <section className="rounded-xl border border-[#E5DEC9] bg-white p-4 dark:border-[#2A3B4A] dark:bg-[#17212A]">
            <h5 className="mb-2 font-bold text-[#232826] dark:text-[#FAF8F5]">伝統上の解釈候補</h5>
            <p>上下で寒熱の特徴が異なるなら「上熱下寒」という整理を比較できます。これだけで上部が実、下部が虚とは決まりません。寒熱と虚実はそれぞれの所見から検討します。</p>
          </section>
          <section className="rounded-xl bg-[#FFF8E1] p-4 dark:bg-[#FFA000]/10">
            <h5 className="mb-2 font-bold text-[#5D4037] dark:text-[#FFE082]">まだ分からないこと</h5>
            <p>訴えの原因、医学的な病名、薬や施術の適応はこの図から判断できません。持続・変化・随伴症状を確かめ、必要な医学的評価と分けて考えます。</p>
          </section>
        </div>
      </div>
      <figcaption className="mt-4 text-xs leading-relaxed text-[#59615D] dark:text-[#96A6B2]">伝統分類を学ぶための模式図です。自律神経や血流の測定結果、腎陽の物理的な熱移動、一律の施術順を表していません。</figcaption>
    </figure>
  );
}

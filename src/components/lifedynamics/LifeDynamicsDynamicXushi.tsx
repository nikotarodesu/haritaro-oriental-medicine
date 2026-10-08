"use client";

import { useId, useState } from "react";

const MODES = [
  { id: "up-down", name: "上下の比較" },
  { id: "root-branch", name: "本と標の比較" },
  { id: "sanjiao-signs", name: "三焦の観点" },
] as const;

const SANJIAO = [
  { name: "上焦", description: "胸より上の働きに関わる所見を整理する観点。呼吸や胸部の訴えなどを、始まった時期や状況とともに記録します。" },
  { name: "中焦", description: "飲食・消化などに関わる所見を整理する観点。食事の時刻や量、腹部の訴え、排泄などの情報を比べます。" },
  { name: "下焦", description: "排泄など下部の働きに関わる所見を整理する観点。変化の持続や随伴症状を確認し、必要な医学的評価と分けます。" },
] as const;

export default function LifeDynamicsDynamicXushi() {
  const [mode, setMode] = useState<(typeof MODES)[number]["id"]>("up-down");
  const panelId = useId();

  return (
    <figure className="my-8 overflow-hidden rounded-3xl border border-[#E5DEC9] bg-white p-6 shadow-sm dark:border-[#2A3B4A] dark:bg-[#17212A] sm:p-8">
      <p className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E]">複合病機の学習図</p>
      <h4 className="mt-1 font-serif text-lg font-bold text-[#232826] dark:text-[#FAF8F5]">所見を一つの原因にまとめず、観点を変えて比較する</h4>
      <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="比較の観点">
        {MODES.map((item) => (
          <button key={item.id} type="button" aria-pressed={mode === item.id} aria-controls={panelId} onClick={() => setMode(item.id)} className={`rounded-lg px-4 py-2 text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B86924] ${mode === item.id ? "bg-[#1E3D34] text-white" : "bg-[#F2ECE0] text-[#59615D] dark:bg-[#22303D] dark:text-[#CBD5E1]"}`}>
            {item.name}
          </button>
        ))}
      </div>
      <div id={panelId} aria-live="polite" className="mt-5 rounded-2xl bg-[#FAF8F5] p-5 dark:bg-[#121920]">
        {mode === "up-down" && (
          <div className="grid items-center gap-5 sm:grid-cols-2">
            <svg viewBox="0 0 260 270" className="mx-auto w-full max-w-[260px]" role="img" aria-label="上部の訴えと下部の訴えを別々に記録し、寒熱と虚実をそれぞれ比較する模式図">
              <rect x="35" y="15" width="190" height="105" rx="20" fill="#C66840" />
              <text x="130" y="58" textAnchor="middle" fill="white" fontSize="15" fontWeight="bold">上部の訴え</text>
              <text x="130" y="89" textAnchor="middle" fill="white" fontSize="11">熱感などを記録</text>
              <path d="M65 138H195" stroke="#8A9A91" strokeWidth="4" strokeDasharray="6 6" />
              <rect x="35" y="157" width="190" height="105" rx="20" fill="#41799B" />
              <text x="130" y="199" textAnchor="middle" fill="white" fontSize="15" fontWeight="bold">下部の訴え</text>
              <text x="130" y="230" textAnchor="middle" fill="white" fontSize="11">冷感などを記録</text>
            </svg>
            <section className="text-sm leading-relaxed text-[#59615D] dark:text-[#CBD5E1]">
              <h5 className="font-bold text-[#232826] dark:text-[#FAF8F5]">上下の特徴が異なる場合</h5>
              <p className="mt-2">上熱下寒と上実下虚は同じ分類ではありません。熱感・冷感という訴えと測定値を分け、寒熱と虚実の根拠をそれぞれ挙げます。</p>
              <p className="mt-3">この色分けは温度やエネルギーの密度を測った結果ではありません。気機を、熱が物理的に上下へ移動する仕組みとして断定しないようにします。</p>
            </section>
          </div>
        )}
        {mode === "root-branch" && (
          <div className="grid items-center gap-5 sm:grid-cols-2">
            <svg viewBox="0 0 260 270" className="mx-auto w-full max-w-[260px]" role="img" aria-label="樹木を比喩として、本は背景の不足を示す候補、標は現在の停滞などを示す候補と区別する図">
              <ellipse cx="130" cy="73" rx="110" ry="62" fill="#597D57" />
              <path d="M130 118V224M130 220L65 250M130 220L195 250M130 220L130 262" stroke="#9A704C" strokeWidth="14" strokeLinecap="round" />
              <text x="130" y="62" textAnchor="middle" fill="white" fontSize="15" fontWeight="bold">標：現在の特徴</text>
              <text x="130" y="88" textAnchor="middle" fill="white" fontSize="11">気滞・痰湿・瘀血などの候補</text>
              <rect x="39" y="162" width="182" height="51" rx="12" fill="#76563D" />
              <text x="130" y="185" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">本：背景の特徴</text>
              <text x="130" y="202" textAnchor="middle" fill="white" fontSize="10">不足などを示す候補</text>
            </svg>
            <section className="text-sm leading-relaxed text-[#59615D] dark:text-[#CBD5E1]">
              <h5 className="font-bold text-[#232826] dark:text-[#FAF8F5]">本虚標実という整理</h5>
              <p className="mt-2">不足を示す側面と、停滞などを示す側面が併存するという伝統上の説明です。根や枝は関係を覚える比喩であり、特定の物質の不足や体内の老廃物を描いてはいません。</p>
              <p className="mt-3">慢性的な訴えがすべてこの型になるとは限りません。薬の害や施術の順序をこの図から決めず、各所見の根拠と別の説明を比べます。</p>
            </section>
          </div>
        )}
        {mode === "sanjiao-signs" && (
          <div className="grid gap-4 sm:grid-cols-3">
            {SANJIAO.map((item) => (
              <section key={item.name} className="rounded-xl border border-[#E5DEC9] bg-white p-4 dark:border-[#2A3B4A] dark:bg-[#17212A]">
                <h5 className="font-bold text-[#1E3D34] dark:text-[#74BA9E]">{item.name}</h5>
                <p className="mt-2 text-sm leading-relaxed text-[#59615D] dark:text-[#CBD5E1]">{item.description}</p>
              </section>
            ))}
            <p className="text-xs leading-relaxed text-[#59615D] dark:text-[#96A6B2] sm:col-span-3">三焦は伝統理論の分類です。身体の三つの解剖区画や、臓器の病変をそのまま表すものではありません。各部位の所見から虚実を即断せず、全身の情報と合わせて考えます。</p>
          </div>
        )}
      </div>
      <section className="mt-5 rounded-xl border border-[#E5DEC9] p-4 dark:border-[#2A3B4A]">
        <h5 className="text-sm font-bold text-[#232826] dark:text-[#FAF8F5]">小さな演習：何が事実で、何が解釈か</h5>
        <p className="mt-2 text-xs leading-relaxed text-[#59615D] dark:text-[#CBD5E1]">架空例で、痛みのため活動が減り、本人が眠りにくさも訴えたとします。事実は記録した変化です。本虚標実などは比較する解釈候補で、痛み・活動・睡眠の因果関係や病名はまだ不明です。</p>
      </section>
      <figcaption className="mt-4 text-xs leading-relaxed text-[#59615D] dark:text-[#96A6B2]">観点を変えて学ぶ模式図です。伝統分類から検査結果、診断、治療効果を保証しません。急変や強い症状では、この分類を完成させることより必要な医学的評価を優先します。</figcaption>
    </figure>
  );
}

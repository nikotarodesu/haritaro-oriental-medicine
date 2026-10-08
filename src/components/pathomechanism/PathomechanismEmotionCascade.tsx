"use client";

import { useId, useState } from "react";

const CANDIDATES = [
  { name: "気滞", description: "気の働きが円滑でない状態として説明する伝統用語です。気分と胸腹部の不快感などの関係を、時間経過も含めて比較します。", limit: "自律神経の収縮や筋緊張と同じものだとは決められません。" },
  { name: "痰湿", description: "津液に関わる所見を整理する伝統上の候補です。身体の重さなどの訴えがあっても、気滞から必ず生じるとは考えません。", limit: "体内に特定の物質が沈殿したことや、リンパの異常を示す言葉ではありません。" },
  { name: "瘀血", description: "血の働きが円滑でない状態を説明する伝統用語です。痛みなどの所見はほかの候補でも起こり得るため、単独で決めません。", limit: "血栓、血液粘度の変化、微小血管の損傷をそのまま示すものではありません。" },
  { name: "虚実錯雑", description: "不足を示す側面と停滞などを示す側面が同時にある、と整理する考え方です。所見ごとに根拠を示して比較します。", limit: "ほかの三つの末期段階、器質的な損傷、ホルモン系の枯渇を意味しません。" },
] as const;

export default function PathomechanismEmotionCascade() {
  const [activeCandidate, setActiveCandidate] = useState(0);
  const panelId = useId();
  const selected = CANDIDATES[activeCandidate];

  return (
    <figure className="my-8 overflow-hidden rounded-3xl border border-[#E5DEC9] bg-white p-6 shadow-sm dark:border-[#2A3B4A] dark:bg-[#17212A] sm:p-8">
      <p className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E]">生活背景と所見を整理する比較図</p>
      <h4 className="mt-1 font-serif text-lg font-bold text-[#232826] dark:text-[#FAF8F5]">感情を原因と決めず、複数の解釈を比べる</h4>
      <p className="mt-3 text-sm leading-relaxed text-[#59615D] dark:text-[#CBD5E1]">七情は自然な感情を伝統理論の中で扱う枠組みです。体調の変化を感情だけの責任にせず、睡眠・食事・仕事・既往などの背景と一緒に考えます。</p>
      <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4" role="group" aria-label="解釈候補を比較する">
        {CANDIDATES.map((candidate, index) => (
          <button key={candidate.name} type="button" aria-pressed={activeCandidate === index} aria-controls={panelId} onClick={() => setActiveCandidate(index)} className={`rounded-xl border p-4 text-left font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B86924] ${activeCandidate === index ? "border-[#1E3D34] bg-[#1E3D34] text-white dark:border-[#74BA9E]" : "border-[#E5DEC9] bg-[#FAF8F5] text-[#59615D] dark:border-[#2A3B4A] dark:bg-[#121920] dark:text-[#CBD5E1]"}`}>
            <span className="block">{candidate.name}</span>
            <span className="mt-2 block text-xs font-normal">伝統上の解釈候補</span>
          </button>
        ))}
      </div>
      <section id={panelId} aria-live="polite" className="mt-5 rounded-2xl bg-[#FAF8F5] p-5 dark:bg-[#121920]">
        <h5 className="font-bold text-[#232826] dark:text-[#FAF8F5]">{selected.name}として整理するとき</h5>
        <p className="mt-2 text-sm leading-relaxed text-[#59615D] dark:text-[#CBD5E1]">{selected.description}</p>
        <p className="mt-3 text-sm leading-relaxed text-[#B86924] dark:text-[#E6C387]">{selected.limit}</p>
      </section>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <section className="rounded-xl border border-[#E5DEC9] p-4 dark:border-[#2A3B4A]">
          <h5 className="text-sm font-bold text-[#232826] dark:text-[#FAF8F5]">事実：架空例の記録</h5>
          <p className="mt-2 text-xs leading-relaxed text-[#59615D] dark:text-[#CBD5E1]">忙しい一週間に睡眠時間が短くなり、食事の時刻も変わった。本人は胸のつかえと疲れを訴えている。</p>
        </section>
        <section className="rounded-xl border border-[#E5DEC9] p-4 dark:border-[#2A3B4A]">
          <h5 className="text-sm font-bold text-[#232826] dark:text-[#FAF8F5]">解釈：仮説として比較</h5>
          <p className="mt-2 text-xs leading-relaxed text-[#59615D] dark:text-[#CBD5E1]">伝統上の候補と生活背景を並べる。ただし、忙しさ・感情・症状の因果関係は、この記録だけでは確定しない。</p>
        </section>
        <section className="rounded-xl border border-[#E5DEC9] p-4 dark:border-[#2A3B4A]">
          <h5 className="text-sm font-bold text-[#232826] dark:text-[#FAF8F5]">不明点：追加の確認</h5>
          <p className="mt-2 text-xs leading-relaxed text-[#59615D] dark:text-[#CBD5E1]">始まった時期、持続、ほかの症状、服薬や既往を確認する。医学的な原因や評価の必要性は別に検討する。</p>
        </section>
      </div>
      <figcaption className="mt-4 text-xs leading-relaxed text-[#59615D] dark:text-[#96A6B2]">四つを必ず進む悪化の連鎖として示した図ではありません。伝統概念と現代の生理機構を同一視せず、ここから病名や施術の順序を決めないでください。</figcaption>
    </figure>
  );
}

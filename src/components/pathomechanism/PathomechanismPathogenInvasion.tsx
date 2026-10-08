"use client";

import { useId, useState } from "react";

const CLASSIFICATIONS = [
  {
    name: "表", subtitle: "身体の外側に関わる特徴を整理",
    explanation: "悪寒・発熱などの組み合わせを、表という伝統分類の候補として読む練習です。実際の皮膚から病原体が侵入したことを意味しません。",
    observation: "いつ始まったか、本人が感じる寒さ、測定した体温、ほかの症状を分けて記録します。",
    unknown: "症状の原因や感染の有無は、この分類だけでは分かりません。",
  },
  {
    name: "半表半裏", subtitle: "少陽の特徴との関係を比較",
    explanation: "往来寒熱・胸脇苦満など、教科書で少陽と関連づける特徴を比較します。自律神経の異常や身体の中間層と一対一に対応する用語ではありません。",
    observation: "寒さと熱さを感じる時間、胸脇の不快感、飲食や生活との関係などを確認します。",
    unknown: "表から進んだ第二段階なのか、特定の処方が必要なのかは、この図から決められません。",
  },
  {
    name: "裏", subtitle: "内側の機能に関わる特徴を整理",
    explanation: "臓腑などの内側の働きに関係する特徴を整理する分類です。器質的な損傷、重症度、病原体が到達した深さをそのまま表してはいません。",
    observation: "飲食・排泄・睡眠などの変化を、持続時間やほかの所見と合わせて記録します。",
    unknown: "寒熱や虚実、医学的な疾患の有無は、別の情報を加えて確かめます。",
  },
] as const;

export default function PathomechanismPathogenInvasion() {
  const [activeClassification, setActiveClassification] = useState(0);
  const panelId = useId();
  const selected = CLASSIFICATIONS[activeClassification];

  return (
    <figure className="my-8 overflow-hidden rounded-3xl border border-[#E5DEC9] bg-white p-6 shadow-sm dark:border-[#2A3B4A] dark:bg-[#17212A] sm:p-8">
      <p className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E]">外感の学習で使う分類</p>
      <h4 className="mt-1 font-serif text-lg font-bold text-[#232826] dark:text-[#FAF8F5]">表・半表半裏・裏を並べて比較する</h4>
      <p className="mt-3 text-sm leading-relaxed text-[#59615D] dark:text-[#CBD5E1]">外邪は伝統上の病因の表現です。ここでは所見を整理する観点を比べます。病原体の侵入経路や進行段階を示す図として読まないようにします。</p>
      <div className="mt-5 grid gap-3 sm:grid-cols-3" role="group" aria-label="伝統分類を選ぶ">
        {CLASSIFICATIONS.map((item, index) => (
          <button key={item.name} type="button" aria-pressed={activeClassification === index} aria-controls={panelId} onClick={() => setActiveClassification(index)} className={`rounded-xl border p-4 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B86924] ${activeClassification === index ? "border-[#1E3D34] bg-[#1E3D34] text-white dark:border-[#74BA9E]" : "border-[#E5DEC9] bg-[#FAF8F5] text-[#59615D] dark:border-[#2A3B4A] dark:bg-[#121920] dark:text-[#CBD5E1]"}`}>
            <span className="block text-lg font-bold">{item.name}</span>
            <span className="mt-1 block text-xs leading-relaxed">{item.subtitle}</span>
          </button>
        ))}
      </div>
      <section id={panelId} aria-live="polite" className="mt-5 rounded-2xl border border-[#E8E1D1] bg-[#FAF8F5] p-5 dark:border-[#22303D] dark:bg-[#121920]">
        <h5 className="font-bold text-[#232826] dark:text-[#FAF8F5]">{selected.name}という分類で何を考えるか</h5>
        <p className="mt-2 text-sm leading-relaxed text-[#59615D] dark:text-[#CBD5E1]">{selected.explanation}</p>
        <dl className="mt-4 space-y-3 text-sm leading-relaxed text-[#59615D] dark:text-[#CBD5E1]">
          <div><dt className="font-bold text-[#1E3D34] dark:text-[#74BA9E]">記録する事実</dt><dd className="mt-1">{selected.observation}</dd></div>
          <div><dt className="font-bold text-[#B86924] dark:text-[#E6C387]">まだ分からないこと</dt><dd className="mt-1">{selected.unknown}</dd></div>
        </dl>
      </section>
      <div className="mt-5 rounded-xl border border-[#E5DEC9] p-4 dark:border-[#2A3B4A]">
        <p className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5]">六気・六淫で扱う六つの分類</p>
        <ul className="mt-3 flex flex-wrap gap-2 text-sm font-bold text-[#59615D] dark:text-[#CBD5E1]">
          {["風", "寒", "暑", "湿", "燥", "火"].map((name) => <li key={name} className="rounded-lg bg-[#F2ECE0] px-4 py-2 dark:bg-[#22303D]">{name}</li>)}
        </ul>
      </div>
      <figcaption className="mt-4 text-xs leading-relaxed text-[#59615D] dark:text-[#96A6B2]">分類を比較する学習図です。三つは必ずこの順に進む悪化段階ではありません。六経・衛気営血などの体系とも区別し、診断や処方の選択はこの図から行いません。</figcaption>
    </figure>
  );
}

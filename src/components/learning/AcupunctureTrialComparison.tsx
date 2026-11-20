"use client";

import { useId, useState } from "react";

const groups = [
  { id: "usual", name: "通常の治療のみ", a: false, b: false },
  { id: "a", name: "経穴Aを追加", a: true, b: false },
  { id: "b", name: "経穴Bを追加", a: false, b: true },
  { id: "both", name: "AとBを追加", a: true, b: true },
] as const;

type GroupId = (typeof groups)[number]["id"];
type ComparisonId = "single" | "added" | "interaction";

const comparisons: Record<ComparisonId, {
  label: string;
  pairs: ReadonlyArray<readonly [GroupId, GroupId]>;
  pairLabels: readonly string[];
  explanation: string;
  interpretation: string;
}> = {
  single: {
    label: "一穴の効果",
    pairs: [["usual", "a"]],
    pairLabels: ["比較する群"],
    explanation: "「通常の治療のみ」と「経穴Aを追加」の2群を比べます。",
    interpretation: "この差から、通常の治療にAを加えたときの変化を調べます。",
  },
  added: {
    label: "追加の効果",
    pairs: [["a", "both"]],
    pairLabels: ["比較する群"],
    explanation: "「経穴Aを追加」と「AとBを追加」の2群を比べます。",
    interpretation: "この差から、Aを使う施術にBを加えたときの上乗せを調べます。",
  },
  interaction: {
    label: "相乗効果",
    pairs: [["usual", "b"], ["a", "both"]],
    pairLabels: ["Aがない条件", "Aがある条件"],
    explanation: "「Aがない場合」と「Aがある場合」で、Bを加えたときの差をそれぞれ求めます。",
    interpretation: "二つの差を比べ、Bの上乗せがAを使う条件で大きくなるかを見ます。Aの有無でBの効果が変わることを相互作用と呼び、どの尺度で評価するかを先に決めます。",
  },
};

const choices = ["single", "added", "interaction"] as const;

export default function AcupunctureTrialComparison() {
  const radioGroup = useId();
  const [selected, setSelected] = useState<ComparisonId>("single");
  const comparison = comparisons[selected];

  return (
    <div className="acupuncture-trial">
      <fieldset className="acupuncture-trial-options">
        <legend>何を確かめたいですか？</legend>
        <div>
          {choices.map(id => (
            <label key={id}>
              <input type="radio" name={radioGroup} value={id} checked={selected === id} onChange={() => setSelected(id)} />
              <span>{comparisons[id].label}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <ol className="acupuncture-trial-groups" role="list" aria-label="試験の4群">
        {groups.map(group => {
          const pair = comparison.pairs.findIndex(ids => ids.includes(group.id));
          return (
            <li key={group.id} className="acupuncture-trial-group" data-pair={pair >= 0 ? pair + 1 : undefined}>
              <svg viewBox="0 0 112 42" className="acupuncture-trial-symbol" aria-hidden="true">
                <path d="M38 21h36" className="acupuncture-trial-connector" />
                <g data-active={group.a}><circle cx="38" cy="21" r="14" /><text x="38" y="21">A</text></g>
                <g data-active={group.b}><circle cx="74" cy="21" r="14" /><text x="74" y="21">B</text></g>
              </svg>
              <strong>{group.name}</strong>
              <small>{comparison.pairLabels[pair]}</small>
            </li>
          );
        })}
      </ol>
      <div className="acupuncture-trial-result" aria-live="polite" aria-atomic="true">
        <p><strong>{comparison.explanation}</strong></p>
        <p>{comparison.interpretation}</p>
      </div>
    </div>
  );
}

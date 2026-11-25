"use client";

import { useState } from "react";

const questions = [
  {
    id: "region",
    prompt: "歌の「頭項」に対応する経穴はどれですか？",
    options: [
      { value: "bl40", label: "委中（BL40）" },
      { value: "lu7", label: "列缺（LU7）" },
      { value: "li4", label: "合谷（LI4）" },
    ],
    answer: "lu7",
    explanation: "「頭項」は頭と首の後ろ。歌では列缺と結びつけています。",
  },
  {
    id: "group",
    prompt: "左右の合谷と左右の太衝を4か所と数えるのはどちらですか？",
    options: [
      { value: "four-command", label: "四総穴" },
      { value: "four-gates", label: "四関" },
    ],
    answer: "four-gates",
    explanation: "左右の合谷と左右の太衝を合わせた4か所が四関です。",
  },
] as const;

type QuestionId = (typeof questions)[number]["id"];

export default function FourCommandReviewQuiz() {
  const [selections, setSelections] = useState<Partial<Record<QuestionId, string>>>({});
  const [checked, setChecked] = useState(false);
  const complete = questions.every(({ id }) => selections[id]);
  const score = questions.filter(({ id, answer }) => selections[id] === answer).length;

  return (
    <div className="not-prose my-4 space-y-4 rounded-xl border border-frame bg-panel p-3 sm:p-5">
      <p className="text-sm ui-muted">2問とも選んでから答え合わせできます。</p>
      {questions.map(({ id, prompt, options }, index) => (
        <fieldset className="min-w-0 space-y-1 rounded-lg border border-frame px-3 pb-2" key={id}>
          <legend className="px-1 text-base font-semibold">{index + 1}. {prompt}</legend>
          {options.map(({ value, label }) => (
            <label className="flex min-h-11 cursor-pointer items-center gap-3 rounded px-1 focus-within:outline-2 focus-within:outline-offset-2" key={value}>
              <input
                type="radio"
                name={`four-command-review-${id}`}
                value={value}
                checked={selections[id] === value}
                onChange={() => {
                  setSelections(current => ({ ...current, [id]: value }));
                  setChecked(false);
                }}
              />
              <span>{label}</span>
            </label>
          ))}
        </fieldset>
      ))}
      <button type="button" disabled={!complete} className="page-primary-action disabled:cursor-not-allowed disabled:opacity-50" onClick={() => setChecked(true)}>
        答え合わせ
      </button>
      <div role="status" aria-live="polite" aria-atomic="true">
        {checked && (
          <div className="space-y-2 rounded-lg bg-panel-selected p-3">
            <p className="font-semibold">{score}／{questions.length}問正解</p>
            <ol className="list-decimal space-y-1 pl-5 text-sm leading-relaxed">
              {questions.map(({ id, answer, explanation }) => (
                <li key={id}><strong>{selections[id] === answer ? "正解。" : "解説。"}</strong>{explanation}</li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}

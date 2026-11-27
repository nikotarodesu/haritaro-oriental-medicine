"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CASE_COURSE_COMPARISON_ANCHOR, CASE_COURSE_READING_HREF } from "@/utils/caseStudyNavigation";

const observations = [
  { label: "施術前", a: 6, b: 6 },
  { label: "施術直後", a: 3, b: 3 },
  { label: "翌日", a: 3, b: 6 },
];
const choices = ["施術前の痛み", "施術直後の痛み", "翌日の痛み"] as const;
type Answer = (typeof choices)[number];
const storageKey = "haritaro_case_course_comparison_v1";
const correctAnswer = "翌日の痛み";
const explanation = "施術前と直後の痛みは同じでした。翌日も痛みが3だったAさんには、仕事で振り向くときも楽だったかを聞きます。6に戻ったBさんには、痛みが戻ったのはいつで、何をしていたときかを聞きます。";

export default function CaseCourseComparison() {
  const [answer, setAnswer] = useState<Answer | null>();

  useEffect(() => {
    let restored: Answer | null = null;
    try {
      const saved = window.sessionStorage.getItem(storageKey);
      restored = choices.find(choice => choice === saved) ?? null;
    } catch {
      // Enable the choices even when browser storage is unavailable.
    }
    const frame = requestAnimationFrame(() => setAnswer(restored));
    return () => cancelAnimationFrame(frame);
  }, []);

  function selectAnswer(choice: Answer) {
    setAnswer(choice);
    try {
      window.sessionStorage.setItem(storageKey, choice);
    } catch {
      // The current exercise remains usable when browser storage is unavailable.
    }
  }

  return (
    <section id={CASE_COURSE_COMPARISON_ANCHOR} tabIndex={-1} className="scroll-mt-28 space-y-4 border-t border-frame pt-6 sm:pt-8" aria-labelledby="case-comparison-title">
      <h2 id="case-comparison-title" className="text-xl font-bold">同じ首の痛み、次に何を聞く？</h2>
      <p>架空の2症例です。どちらも仕事中に振り向くと首が痛みます。施術前から翌日までの記録を見比べてください。</p>

      <table id="case-pain-course" className="w-full table-fixed border-collapse text-sm">
        <caption className="pb-2 text-left font-semibold">首を動かしたときの痛み（0は痛みなし、10は最も強い痛み）</caption>
        <thead>
          <tr className="border-b border-frame bg-page">
            <th scope="col" className="w-1/4 px-2 py-2 text-left">記録した時点</th>
            <th scope="col" className="px-2 py-2 text-left">Aさん</th>
            <th scope="col" className="px-2 py-2 text-left">Bさん</th>
          </tr>
        </thead>
        <tbody>
          {observations.map(({ label, a, b }) => (
            <tr key={label} className="border-b border-frame">
              <th scope="row" className="px-2 py-2 text-left">{label}</th>
              {[a, b].map((value, patientIndex) => (
                <td key={patientIndex} className="px-2 py-2">
                  <span className="font-semibold tabular-nums">{value}</span>
                  <svg viewBox="0 0 10 1" preserveAspectRatio="none" className="mt-1 block h-2 w-full rounded-sm bg-panel-selected" aria-hidden="true" focusable="false">
                    <rect width={value} height="1" className={patientIndex === 0 ? "fill-accent" : "fill-warm"} />
                  </svg>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <fieldset className="space-y-2" disabled={answer === undefined}>
        <legend className="mb-2 font-semibold">次に聞くことを変える手がかりは、どの時点の記録ですか？</legend>
        {choices.map(choice => (
          <label key={choice} className="flex min-h-11 cursor-pointer items-center gap-3 rounded-lg border border-field px-3 py-2 has-checked:border-accent has-checked:bg-panel-selected has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2">
            <input type="radio" className="size-4 shrink-0 accent-accent" name="case-course-answer" checked={answer === choice} onChange={() => selectAnswer(choice)} />
            {choice}
          </label>
        ))}
      </fieldset>
      <div role="status" aria-atomic="true">
        {answer && (
          <div className="space-y-1 rounded-lg bg-panel-selected p-4">
            <p className="font-semibold">{answer === correctAnswer ? "正解です。" : "手がかりは「翌日の痛み」です。"}</p>
            <p>{explanation}</p>
          </div>
        )}
      </div>
      <noscript>
        <details>
          <summary className="min-h-11 cursor-pointer font-semibold">答えと解説を見る</summary>
          <p>{correctAnswer}です。{explanation}</p>
        </details>
      </noscript>
      <div className="flex flex-wrap gap-x-4 text-sm">
        <Link href={CASE_COURSE_READING_HREF} className="ui-text-link inline-flex min-h-11 items-center">次に何を記録するか講義で読む</Link>
        <Link href="/clinical/symptoms/shoulder#review" className="ui-text-link inline-flex min-h-11 items-center">首・肩こりの確認ガイド</Link>
      </div>
    </section>
  );
}

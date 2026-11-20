"use client";

import { useState } from "react";
import type { ReadingCheckQuestion } from "@/data/publicLectures/revisions/types";

export default function ReadingUnitCheck({ unitId, questions }: {
  unitId: string;
  questions: readonly ReadingCheckQuestion[];
}) {
  const [answers, setAnswers] = useState<Partial<Record<number, number>>>({});

  return (
    <div className="lecture-check-questions" data-reading-unit-check={unitId}>
      {questions.map(({ question, choices, answer, explanation }, index) => {
        const selected = answers[index];
        return (
          <fieldset key={question} className="lecture-check-question">
            <legend>{index + 1}. {question}</legend>
            <div className="lecture-check-choices">
              {choices.map((choice, choiceIndex) => (
                <label key={choice}>
                  <input
                    type="radio"
                    name={`${unitId}-check-${index + 1}`}
                    checked={selected === choiceIndex}
                    onChange={() => setAnswers(current => ({ ...current, [index]: choiceIndex }))}
                  />
                  <span>{choice}</span>
                </label>
              ))}
            </div>
            <div role="status" aria-atomic="true" className="lecture-check-status">
              {selected !== undefined && (
                <p className="lecture-check-feedback" data-correct={selected === answer}>
                  <strong>{selected === answer ? "正解です。" : `正解は「${choices[answer]}」です。`}</strong>{" "}
                  {explanation}
                </p>
              )}
            </div>
            <noscript>
              <details className="lecture-check-fallback">
                <summary>答えと解説を見る</summary>
                <p>{choices[answer]}。{explanation}</p>
              </details>
            </noscript>
          </fieldset>
        );
      })}
    </div>
  );
}

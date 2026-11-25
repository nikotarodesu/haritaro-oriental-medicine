"use client";

import { useCurriculumProgress } from "@/contexts/CurriculumProgressContext";
import type { ReadingUnitQuestion } from "@/data/publicLectures/readingUnitQuestions";

export default function ReadingUnitCheck({ unitId, questions }: {
  unitId: string;
  questions: readonly ReadingUnitQuestion[];
}) {
  const { isMounted, quizResults, saveQuizResult } = useCurriculumProgress();

  function answerQuestion(question: ReadingUnitQuestion, choice: number) {
    saveQuizResult({
      questionId: question.id,
      lectureId: question.lectureId,
      lectureTitle: question.lectureTitle,
      chapterId: question.chapterId,
      chapterTitle: question.chapterTitle,
      questionText: question.question,
      userAnswerIndex: choice,
      correctAnswerIndex: question.correctIndex,
      isCorrect: choice === question.correctIndex,
      options: [...question.options],
      explanation: question.explanation,
      answeredAt: new Date().toISOString(),
      revision: question.revision,
      kind: question.kind,
      practiceHref: question.href,
    });
  }

  return (
    <div className="lecture-check-questions" data-reading-unit-check={unitId}>
      {questions.map((question, index) => {
        const { id, options, correctIndex, explanation, reviewHref, reviewLabel } = question;
        const selected = quizResults[id]?.userAnswerIndex;
        return (
          <fieldset key={id} className="lecture-check-question">
            <legend>{index + 1}. {question.question}</legend>
            <div className="lecture-check-choices">
              {options.map((choice, choiceIndex) => (
                <label key={choice}>
                  <input
                    type="radio"
                    name={id}
                    disabled={!isMounted}
                    checked={selected === choiceIndex}
                    onChange={() => answerQuestion(question, choiceIndex)}
                  />
                  <span>{choice}</span>
                </label>
              ))}
            </div>
            <div role="status" aria-atomic="true" className="lecture-check-status">
              {selected !== undefined && (
                <p className="lecture-check-feedback" data-correct={selected === correctIndex}>
                  <strong>{selected === correctIndex ? "正解です。" : `正解は「${options[correctIndex]}」です。`}</strong>{" "}
                  {explanation}
                </p>
              )}
            </div>
            {selected !== undefined && selected !== correctIndex && (
              <a href={reviewHref} className="ui-text-link inline-flex min-h-11 items-center">
                {reviewLabel}
              </a>
            )}
            <noscript>
              <details className="lecture-check-fallback">
                <summary>答えと解説を見る</summary>
                <p>{options[correctIndex]}。{explanation}</p>
                <a href={reviewHref} className="ui-text-link inline-flex min-h-11 items-center">
                  {reviewLabel}
                </a>
              </details>
            </noscript>
          </fieldset>
        );
      })}
    </div>
  );
}

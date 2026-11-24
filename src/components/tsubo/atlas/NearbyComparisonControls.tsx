"use client";

import Link from "next/link";
import { useId, useRef, useState, type MouseEvent, type ReactNode } from "react";
import HashTargetDetails from "@/components/common/HashTargetDetails";
import type { NearbyComparison } from "@/data/tsubo/atlas/nearbyComparisons";
import { trackEvent } from "@/utils/analytics";

type PointChoice = {
  code: string;
  name: string;
  position: readonly [number, number];
  button: readonly [number, number];
  leader: readonly [number, number];
  difference: string;
};

type ComparisonCopy = Pick<NearbyComparison, "id" | "region" | "heading" | "figureLabel" | "quizFigureLabel" | "question">;

export default function NearbyComparisonControls({
  width, height, comparison, points, initialCode, anchorId, initiallyOpen, introduction, relatedReading, children,
}: {
  width: number;
  height: number;
  comparison: ComparisonCopy;
  points: readonly PointChoice[];
  initialCode: string;
  anchorId: string;
  initiallyOpen?: boolean;
  introduction?: ReactNode;
  relatedReading?: ReactNode;
  children: ReactNode;
}) {
  const [selectedCode, setSelectedCode] = useState(initialCode);
  const [isQuiz, setIsQuiz] = useState(false);
  const [answerCode, setAnswerCode] = useState<string | null>(null);
  const started = useRef(false);
  const questionId = useId();

  const selected = points.find(({ code }) => code === selectedCode) ?? points[0];
  const answer = points.find(({ code }) => code === answerCode);
  const { id, region, heading, figureLabel, quizFigureLabel, question } = comparison;
  const isSolved = isQuiz && answerCode === question.answerCode;
  const markedCode = isQuiz ? answerCode : selected.code;

  function toggleQuiz() {
    setIsQuiz(!isQuiz);
    setAnswerCode(null);
  }

  function choosePosition(code: string) {
    if (!isQuiz) {
      setSelectedCode(code);
      return;
    }
    if (isSolved) return;

    setAnswerCode(code);
    if (!started.current) {
      started.current = true;
      trackEvent("atlas_location_check_start", { placement: "nearby_diagram" });
    }
  }

  function chooseDot(event: MouseEvent<SVGSVGElement>) {
    const box = event.currentTarget.getBoundingClientRect();
    let nearest: PointChoice | undefined;
    let radius = 22;
    for (const point of points) {
      const [x, y] = point.position;
      const distance = Math.hypot(
        event.clientX - box.left - x * box.width / width,
        event.clientY - box.top - y * box.height / height,
      );
      if (distance < radius) {
        nearest = point;
        radius = distance;
      }
    }
    if (nearest) choosePosition(nearest.code);
  }

  return (
    <HashTargetDetails
      className="atlas-disclosure atlas-nearby"
      data-nearby-comparison={id}
      open={initiallyOpen}
      summary={<>{isQuiz ? "図で位置を当てる" : (heading ?? "近くのツボを図で比べる")}<span>{region}</span></>}
    >
      <div id={anchorId} className="atlas-target atlas-comparison-content">
        {!isQuiz && introduction}
        <div className="atlas-comparison-actions print:hidden">
          <button type="button" onClick={toggleQuiz}>
            {isQuiz ? "比較に戻る" : "図で位置を当てる"}
          </button>
        </div>
        {isQuiz ? (
          <div className="atlas-comparison-question">
            <p id={questionId} className="font-semibold">{question.prompt}</p>
            <p>図の丸印か番号を選んでください。</p>
          </div>
        ) : (
          <p className="atlas-muted">図のツボ名を選ぶと、丸印と下の説明が強調されます。</p>
        )}
        <div
          className="atlas-comparison-figure"
          style={{ aspectRatio: `${width} / ${height}` }}
          role={isQuiz ? "group" : undefined}
          aria-labelledby={isQuiz ? questionId : undefined}
        >
          <svg
            viewBox={`0 0 ${width} ${height}`}
            role="img"
            aria-label={isQuiz ? quizFigureLabel : figureLabel}
            focusable="false"
            onClick={isQuiz && !isSolved ? chooseDot : undefined}
          >
            {children}
            {points.map(({ code, position: [x, y], leader: [endX, endY] }, index) => (
              <g key={code} className="atlas-comparison-marker" data-selected={code === markedCode || undefined}>
                <path d={`M${x} ${y}L${endX} ${endY}`} />
                <circle cx={x} cy={y} r="4.5" data-quiz-dot={isQuiz && !isSolved ? index + 1 : undefined} />
              </g>
            ))}
          </svg>
          {points.map(({ code, name, button: [x, y] }, index) => (
            <button
              key={code}
              type="button"
              className="atlas-comparison-choice"
              data-quiz-choice={isQuiz || undefined}
              style={{
                left: isQuiz ? `clamp(1.5rem, ${x / width * 100}%, calc(100% - 1.5rem))` : `${x / width * 100}%`,
                top: `${y / height * 100}%`,
              }}
              aria-label={isQuiz ? `位置 ${index + 1}` : `${name}の位置`}
              aria-pressed={code === markedCode}
              aria-disabled={isSolved || undefined}
              onClick={() => choosePosition(code)}
            >
              <span aria-hidden="true">{index + 1}</span>{!isQuiz && name}
            </button>
          ))}
        </div>
        {isQuiz ? (
          <p role="status" className={answer ? "atlas-comparison-feedback" : "sr-only"}>
            {isSolved
              ? `正解。${question.explanation}`
              : answer && `不正解。ここは${answer.name}です。${answer.difference} 問題の目印を確認して、もう一度選べます。`}
          </p>
        ) : (
          <div className="sr-only" role="status">
            {selected.name}。{selected.difference}
          </div>
        )}
        {(!isQuiz || isSolved) && (
          <ol className="atlas-comparison-reading" role="list" aria-label="ツボごとの位置と詳しい図">
            {points.map(({ code, name, difference }, index) => (
              <li key={code} data-selected={code === markedCode || undefined}>
                <span className="atlas-comparison-number" aria-hidden="true">{index + 1}</span>
                <div>
                  <Link
                    href={`/tsubo/${code}#acupoint-location`}
                    prefetch={false}
                    className="atlas-comparison-link"
                    aria-label={`${name}の詳しい図を見る（${code.toUpperCase()}）`}
                  >
                    {name} <span className="atlas-comparison-code">{code.toUpperCase()}</span>
                  </Link>
                  <p>{difference}</p>
                </div>
              </li>
            ))}
          </ol>
        )}
        {!isQuiz && relatedReading}
      </div>
    </HashTargetDetails>
  );
}

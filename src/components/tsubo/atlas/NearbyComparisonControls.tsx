"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";

type PointChoice = {
  code: string;
  name: string;
  position: readonly [number, number];
  button: readonly [number, number];
  leader: readonly [number, number];
  difference: string;
};

export default function NearbyComparisonControls({ width, height, label, points, initialCode, children }: {
  width: number;
  height: number;
  label: string;
  points: readonly PointChoice[];
  initialCode: string;
  children: ReactNode;
}) {
  const [selectedCode, setSelectedCode] = useState(initialCode);
  const selected = points.find(({ code }) => code === selectedCode) ?? points[0];

  return (
    <>
      <p className="atlas-muted">図のツボ名を選ぶと、丸印と下の説明が強調されます。</p>
      <div className="atlas-comparison-figure" style={{ aspectRatio: `${width} / ${height}` }}>
        <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={label} focusable="false">
          {children}
          {points.map(({ code, position: [x, y], leader: [endX, endY] }) => (
            <g key={code} className="atlas-comparison-marker" data-selected={code === selected.code || undefined}>
              <path d={`M${x} ${y}L${endX} ${endY}`} />
              <circle cx={x} cy={y} r="4.5" />
            </g>
          ))}
        </svg>
        {points.map(({ code, name, button: [x, y] }, index) => (
          <button key={code} type="button" className="atlas-comparison-choice"
            style={{ left: `${x / width * 100}%`, top: `${y / height * 100}%` }}
            aria-label={`${name}の位置`} aria-pressed={code === selected.code}
            onClick={() => setSelectedCode(code)}>
            <span aria-hidden="true">{index + 1}</span>{name}
          </button>
        ))}
      </div>
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {selected.name}。{selected.difference}
      </div>
      <ol className="atlas-comparison-reading" role="list" aria-label="ツボごとの位置と詳しい図">
        {points.map(({ code, name, difference }, index) => (
          <li key={code} data-selected={code === selected.code || undefined}>
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
    </>
  );
}

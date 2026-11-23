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
      <p className="atlas-muted">ツボ名を選ぶと、図の位置と説明が切り替わります。</p>
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
      <div className="atlas-comparison-reading">
        <div aria-live="polite" aria-atomic="true">
          <p className="atlas-comparison-selected">{selected.name} <span>{selected.code.toUpperCase()}</span></p>
          <p>{selected.difference}</p>
        </div>
        {selected.code !== initialCode && (
          <Link href={`/tsubo/${selected.code}#acupoint-location`} prefetch={false} className="atlas-text-action">
            {selected.name}の詳しい図を見る
          </Link>
        )}
      </div>
    </>
  );
}

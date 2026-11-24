import type { ReactNode } from "react";
import type { LandmarkLabel } from "@/data/tsubo/atlas/landmarkLabels";

const artworkWidth = 207;
const rowLineHeight = 18;

function wrapName(name: string) {
  const lines: string[] = [];
  let remaining = name;
  while (remaining) {
    let width = 0;
    let end = 0;
    let wordEnd = 0;
    for (const character of remaining) {
      width += /[A-Z0-9]/.test(character) ? 0.72 : /^[\x20-\x7E]$/.test(character) ? 0.5 : 1;
      if (width > 7) break;
      if (character === "（") wordEnd = end;
      end += 1;
      if (/[のとを]/.test(character)) wordEnd = end;
    }
    if (end < remaining.length) {
      if (wordEnd >= 3) end = wordEnd;
      if (/[）・、]/.test(remaining[end]) || remaining[end - 1] === "（") end -= 1;
    }
    lines.push(remaining.slice(0, end));
    remaining = remaining.slice(end);
  }
  return lines;
}

type Callout = LandmarkLabel & { number?: number };

function leaderSlope(callouts: Callout[], elbow: number) {
  const starts = [...new Map(callouts.map(({ position }) => [position.join(","), position])).values()];
  let slope = 0;
  let separation = -1;
  for (const candidate of [0, -0.14, 0.14, -0.28, 0.28, -0.42, 0.42]) {
    const levels = starts.map(([x, y]) => y + (elbow - x) * candidate).sort((a, b) => a - b);
    if (levels[0] < 8 || levels[levels.length - 1] > 292) continue;
    const gap = Math.min(...levels.slice(1).map((level, index) => level - levels[index]));
    if (gap > separation) {
      slope = candidate;
      separation = gap;
    }
    if (separation >= 7) break;
  }
  return slope;
}

function placeCallouts(callouts: Callout[], elbow: number) {
  // Keep the strokes parallel across the anatomy, then spread the labels out
  // in the gutter in the same order so the lines do not cross.
  const slope = leaderSlope(callouts, elbow);
  const rows = callouts
    .map((callout) => {
      const lines = wrapName(callout.name);
      const [x, y] = callout.position;
      const entryY = y + (elbow - x) * slope;
      return { ...callout, lines, entryY, height: lines.length * rowLineHeight + 10 };
    })
    .sort((a, b) => a.entryY - b.entryY || b.position[0] - a.position[0]);
  let roomBelow = rows.reduce((total, { height }) => total + height, 0);
  let top = 8;
  return rows.map(({ entryY, height, ...row }) => {
    const y = Math.min(Math.max(top, entryY - height / 2), 292 - roomBelow) + height / 2;
    top = y + height / 2;
    roomBelow -= height;
    return { ...row, entryY, y };
  });
}

export default function LandmarkCloseUp({ marker, pointLabel, landmarks, description, children, left = 0, numbered = false }: {
  marker: { x: number; y: number };
  pointLabel: string;
  landmarks: readonly LandmarkLabel[];
  description: string;
  children: ReactNode;
  left?: number;
  numbered?: boolean;
}) {
  const callouts: Callout[] = [
    ...landmarks.map(({ name, position: [x, y], number }, index): Callout => ({ name, position: [x - left, y], number: number ?? index + 1 })),
    { name: pointLabel, position: [marker.x - left, marker.y] },
  ];
  const elbow = Math.max(148, ...callouts.map(({ position: [x] }) => x + 6));
  const rows = placeCallouts(callouts, elbow);

  return (
    <svg viewBox="0 0 340 300" role="img"
      aria-label={`${description} 図の目印は${callouts.slice(0, -1).map(({ name, number }) => numbered ? `${number}番の${name}` : name).join("、")}です。`}
      className="mx-auto block w-full max-w-[340px]">
      <svg width={artworkWidth} height="300" viewBox={`${left} 0 ${artworkWidth} 300`} overflow="hidden" aria-hidden="true">
        {children}
      </svg>
      <g className="atlas-landmark-overlay" aria-hidden="true">
        {rows.map(({ name, number, position: [x, y], entryY, y: labelY, lines }) => {
          const leader = `M${x} ${y}L${elbow} ${entryY.toFixed(2)}L203 ${labelY}H${number && numbered ? 204 : 208}`;
          return (
            <g key={name} data-landmark-label={number ? name : undefined} className={number ? undefined : "atlas-landmark-point"}>
              <path d={leader} className="atlas-landmark-halo" />
              <path d={leader} className="atlas-landmark-leader" data-landmark-leader={number ? "" : undefined} />
              {number && <circle cx={x} cy={y} r="2.8" className="atlas-landmark-anchor" />}
              <circle cx="213" cy={labelY} r={number ? (numbered ? 7.5 : 2.6) : 4.5} className="atlas-landmark-badge" />
              {number && numbered && <text x="213" y={labelY} className="atlas-landmark-number" data-landmark-number={number}>{number}</text>}
              <text x="224" y={labelY} className="atlas-landmark-name" data-landmark-name="">
                {lines.map((line, i) => <tspan key={i} x="224" y={labelY + (i - (lines.length - 1) / 2) * rowLineHeight}>{line}</tspan>)}
              </text>
            </g>
          );
        })}
        <circle data-point-marker="" cx={marker.x - left} cy={marker.y} r="5.5" fill="#852F22" stroke="#FFF9F0" strokeWidth="2" />
      </g>
    </svg>
  );
}

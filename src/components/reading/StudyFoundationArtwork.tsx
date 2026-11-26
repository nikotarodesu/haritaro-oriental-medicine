import type { ReactNode } from "react";

type DiagramLabel = readonly [text: string, x: number, y: number];
type ArtworkProps = { id: string };

function ArtworkPlot({ height, labels, children }: {
  height: number;
  labels: readonly DiagramLabel[];
  children: ReactNode;
}) {
  return (
    <div className="study-artwork-plot">
      <svg viewBox={`0 0 360 ${height}`} fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" focusable="false">
        {children}
      </svg>
      {labels.map(([label, x, y]) => (
        <span key={`${x}-${y}`} className="study-artwork-node-label" style={{ left: `${x / 3.6}%`, top: `${y / height * 100}%` }}>{label}</span>
      ))}
    </div>
  );
}

function ArrowMarker({ id, warm = false }: { id: string; warm?: boolean }) {
  return (
    <marker id={id} viewBox="0 0 10 10" markerWidth="9" markerHeight="9" refX="8" refY="5" orient="auto" markerUnits="userSpaceOnUse">
      <path d="M1 1l7 4-7 4" className={warm ? "study-artwork-warm" : "study-artwork-accent"} />
    </marker>
  );
}

function ZongQi({ id }: ArtworkProps) {
  const arrow = `${id}-convergence`;
  return (
    <ArtworkPlot height={157} labels={[["飲食", 68, 23], ["呼吸", 292, 23], ["宗気（胸）", 180, 81], ["呼吸・声", 180, 137]]}>
      <defs><ArrowMarker id={arrow} /></defs>
      <g className="study-artwork-accent study-artwork-paper">
        <rect x="24" y="7" width="88" height="32" rx="12" />
        <rect x="248" y="7" width="88" height="32" rx="12" />
        <rect x="131" y="121" width="98" height="32" rx="12" />
      </g>
      <rect x="106" y="63" width="148" height="36" rx="14" className="study-artwork-warm study-artwork-highlight" />
      <g className="study-artwork-accent" markerEnd={`url(#${arrow})`}>
        <path d="M82 41l63 19" />
        <path d="M278 41l-63 19" />
        <path d="M180 101v17" />
      </g>
    </ArtworkPlot>
  );
}

function MovementDirections({ id }: ArtworkProps) {
  const vertical = `${id}-vertical`;
  const horizontal = `${id}-horizontal`;
  const labels: readonly DiagramLabel[] = [
    ["昇・上へ", 224, 32], ["降・下へ", 224, 138], ["出・外へ", 57, 46], ["入・内へ", 303, 87], ["体の内側", 180, 84],
  ];
  return (
    <ArtworkPlot height={166} labels={labels}>
      <defs>
        <ArrowMarker id={vertical} />
        <ArrowMarker id={horizontal} warm />
      </defs>
      <rect x="96" y="10" width="168" height="146" rx="16" className="study-artwork-guide study-artwork-paper study-artwork-dashed" />
      <g className="study-artwork-accent" markerEnd={`url(#${vertical})`}>
        <path d="M177 66V22" />
        <path d="M177 101v47" />
      </g>
      <g className="study-artwork-warm" markerEnd={`url(#${horizontal})`}>
        <path d="M142 64H35" />
        <path d="M325 105H215" />
      </g>
    </ArtworkPlot>
  );
}

function LungMovement({ id }: ArtworkProps) {
  const spread = `${id}-spread`;
  const descend = `${id}-descend`;
  const labels: readonly DiagramLabel[] = [
    ["宣発", 90, 16], ["肺", 90, 92], ["上・外へ", 90, 130],
    ["粛降", 270, 16], ["肺", 270, 57], ["下・内へ", 270, 130],
  ];
  return (
    <ArtworkPlot height={147} labels={labels}>
      <defs>
        <ArrowMarker id={spread} warm />
        <ArrowMarker id={descend} />
      </defs>
      <path d="M180 24v111" className="study-artwork-guide study-artwork-dashed" />
      <circle cx="90" cy="92" r="19" className="study-artwork-warm study-artwork-paper" />
      <g className="study-artwork-warm" markerEnd={`url(#${spread})`}>
        <path d="M90 68V34" />
        <path d="M72 75 42 51" />
        <path d="M108 75l30-24" />
      </g>
      <circle cx="270" cy="57" r="19" className="study-artwork-accent study-artwork-paper" />
      <g className="study-artwork-accent" markerEnd={`url(#${descend})`}>
        <path d="M270 80v32" />
        <path d="m224 63 30 30" />
        <path d="m316 63-30 30" />
      </g>
    </ArtworkPlot>
  );
}

function FiveElementsFamily({ id }: ArtworkProps) {
  const arrow = `${id}-family`;
  const labels: readonly DiagramLabel[] = [
    ["金", 48, 60], ["水", 180, 60], ["木", 312, 60],
    ["肺", 48, 105], ["腎", 180, 105], ["肝", 312, 105],
    ["水が子", 108, 26], ["水が母", 252, 26],
  ];
  return (
    <ArtworkPlot height={121} labels={labels}>
      <defs><ArrowMarker id={arrow} /></defs>
      <g className="study-artwork-accent" markerEnd={`url(#${arrow})`}>
        <path d="M76 60h71" />
        <path d="M213 60h71" />
      </g>
      <circle cx="48" cy="60" r="23" className="study-artwork-accent study-artwork-paper" />
      <circle cx="180" cy="60" r="27" className="study-artwork-warm study-artwork-highlight" />
      <circle cx="312" cy="60" r="23" className="study-artwork-accent study-artwork-paper" />
    </ArtworkPlot>
  );
}

export const foundationArtwork = {
  "zong-qi": ZongQi,
  "movement-directions": MovementDirections,
  "lung-movement": LungMovement,
  "five-elements-family": FiveElementsFamily,
};

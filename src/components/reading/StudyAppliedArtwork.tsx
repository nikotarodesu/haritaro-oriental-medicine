import type { ReactNode } from "react";

function AppliedCanvas({ height, children }: { height: number; children: ReactNode }) {
  return (
    <svg viewBox={`0 0 360 ${height}`} fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" focusable="false">
      {children}
    </svg>
  );
}

function AssessmentObservations() {
  return (
    <>
      <AppliedCanvas height={84}>
        <rect x="13" y="9" width="94" height="66" rx="18" className="study-artwork-accent study-artwork-paper" />
        <rect x="127" y="9" width="206" height="66" rx="18" className="study-artwork-warm study-artwork-paper" />
        <g transform="translate(60 42)" className="study-artwork-accent">
          <path d="M-24 0Q0-24 24 0Q0 24-24 0Z" />
          <circle r="7" className="study-artwork-highlight" />
        </g>
        <g transform="translate(180 42)" className="study-artwork-warm">
          <path d="M-11-6a14 14 0 0 1 27 4c0 6-5 7-7 11-2 3-2 11-10 11a7 7 0 0 1-7-7" />
          <path d="M-5-4A7 7 0 0 1 9-3c0 3-2 4-5 5-3 1-4 3-4 6" />
        </g>
        <g transform="translate(300 42)" className="study-artwork-warm">
          <path d="M-10-20c3 7 3 12 1 16l-5 9c-2 4 1 7 4 7h8" />
          <path d="M2 1c5 3 11-3 16 0M4 9c5 3 10-3 15 0M7 17c4 2 7-2 11 0" />
        </g>
      </AppliedCanvas>
      <div className="study-artwork-scale"><span>見る</span><span>聞く</span><span>におい</span></div>
    </>
  );
}

function AssessmentConsent() {
  return (
    <>
      <AppliedCanvas height={78}>
        <path d="M94 39h47m-6-5 6 5-6 5m79-5h47m-6-5 6 5-6 5" className="study-artwork-accent" />
        <g transform="translate(60 39)" className="study-artwork-warm">
          <circle r="29" className="study-artwork-highlight" />
          <path d="M-15-11h30V7H-2l-8 7V7h-5Z" />
          <path d="m-5-2 4 4 7-8" />
        </g>
        <g transform="translate(180 39)" className="study-artwork-accent">
          <circle r="29" className="study-artwork-paper" />
          <path d="M-8 14l-7-10a3 3 0 0 1 5-4l4 4v-16a3 3 0 0 1 6 0v10-14a3 3 0 0 1 6 0v14-10a3 3 0 0 1 6 0v11-5a3 3 0 0 1 6 0V6a11 11 0 0 1-11 11h-7" />
        </g>
        <g transform="translate(300 39)" className="study-artwork-accent">
          <circle r="29" className="study-artwork-paper" />
          <rect x="-12" y="-13" width="24" height="31" rx="3" />
          <rect x="-6" y="-17" width="12" height="7" rx="2" className="study-artwork-highlight" />
          <path d="M-6-3H6M-6 3H6M-6 9H2" />
        </g>
      </AppliedCanvas>
      <div className="study-artwork-scale"><span>説明・同意</span><span>観察</span><span>記録</span></div>
    </>
  );
}

const assessmentAxes = [
  { y: 24, labels: ["表", "体の内外", "裏"] },
  { y: 65, labels: ["寒", "冷え・熱", "熱"] },
  { y: 106, labels: ["虚", "不足と強さ", "実"] },
  { y: 147, labels: ["陰", "全体の整理", "陽"] },
];
const assessmentAxesHeight = 171;
const axisLabelPositions = [15, 50, 85];

function AssessmentAxes() {
  return (
    <div className="study-artwork-plot">
      <AppliedCanvas height={assessmentAxesHeight}>
        {assessmentAxes.map(({ y }) => (
          <g key={y} transform={`translate(0 ${y})`}>
            <path d="M71 0H115M245 0H289" className="study-artwork-accent" />
            <circle cx="54" r="17" className="study-artwork-accent study-artwork-paper" />
            <rect x="115" y="-14" width="130" height="28" rx="14" className="study-artwork-guide study-artwork-highlight" />
            <circle cx="306" r="17" className="study-artwork-accent study-artwork-paper" />
          </g>
        ))}
      </AppliedCanvas>
      {assessmentAxes.flatMap(({ y, labels }) => labels.map((label, index) => (
        <span key={label} className="study-artwork-node-label" style={{ left: `${axisLabelPositions[index]}%`, top: `${y / assessmentAxesHeight * 100}%` }}>{label}</span>
      )))}
    </div>
  );
}

const outcomeLabels = [
  { label: "6", x: 80, y: 39 }, { label: "4", x: 280, y: 54 },
  { label: "1回", x: 80, y: 88 }, { label: "1回", x: 280, y: 88 },
  { label: "痛み", x: 180, y: 24 }, { label: "休憩", x: 180, y: 70 },
  { label: "前回", x: 80, y: 119 }, { label: "今回", x: 280, y: 119 },
];
const outcomeHeight = 135;

function TreatmentOutcome() {
  return (
    <div className="study-artwork-plot">
      <AppliedCanvas height={outcomeHeight}>
        <path d="M80 21v82M280 21v82" className="study-artwork-guide study-artwork-dashed" />
        <path d="m80 39 200 15" className="study-artwork-accent" strokeWidth="2.5" />
        <path d="M80 88h200" className="study-artwork-warm study-artwork-dashed" />
        <circle cx="80" cy="39" r="13" className="study-artwork-accent study-artwork-paper" />
        <circle cx="280" cy="54" r="13" className="study-artwork-accent study-artwork-highlight" />
        <rect x="57" y="75" width="46" height="26" rx="6" className="study-artwork-warm study-artwork-paper" />
        <rect x="257" y="75" width="46" height="26" rx="6" className="study-artwork-warm study-artwork-paper" />
      </AppliedCanvas>
      {outcomeLabels.map(({ label, x, y }) => (
        <span key={`${label}-${x}`} className="study-artwork-node-label" style={{ left: `${x / 3.6}%`, top: `${y / outcomeHeight * 100}%` }}>{label}</span>
      ))}
    </div>
  );
}

function TreatmentTimeline() {
  return (
    <>
      <AppliedCanvas height={85}>
        <path d="M60 70h120" className="study-artwork-accent" />
        <path d="M180 70h120" className="study-artwork-warm study-artwork-dashed" />
        <path d="m244 65 6 5-6 5" className="study-artwork-warm" />
        <circle cx="60" cy="70" r="5" className="study-artwork-accent study-artwork-paper" />
        <circle cx="180" cy="70" r="5" className="study-artwork-accent study-artwork-paper" />
        <circle cx="300" cy="70" r="6" className="study-artwork-warm study-artwork-highlight" />
        <g transform="translate(60 32)" className="study-artwork-accent">
          <rect x="-21" y="-17" width="42" height="36" rx="5" className="study-artwork-paper" />
          <path d="M-11-22v10m22-10v10M-21-6h42m-30 9h7m7 0h7m-21 8h7" />
        </g>
        <g transform="translate(180 32)" className="study-artwork-accent">
          <rect x="-23" y="-17" width="46" height="30" rx="5" className="study-artwork-paper" />
          <path d="M0 13v9m-10 0h20M-14-5h13m-13 7h19" />
        </g>
        <g transform="translate(300 32)" className="study-artwork-warm">
          <path d="M-20-16h40v30H0l-11 8v-8h-9Z" className="study-artwork-highlight" />
          <path d="M-5-6a5 5 0 1 1 8 4C0 0-1 1-1 4m0 4v.5" />
        </g>
      </AppliedCanvas>
      <div className="study-artwork-scale"><span>月曜</span><span>火曜の夕方</span><span>次の相談</span></div>
    </>
  );
}

export const appliedArtwork = {
  "assessment-axes": AssessmentAxes,
  "assessment-observations": AssessmentObservations,
  "assessment-consent": AssessmentConsent,
  "treatment-outcome": TreatmentOutcome,
  "treatment-timeline": TreatmentTimeline,
};

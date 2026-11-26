import type { ReactNode } from "react";

function CaseCanvas({ height, children }: { height: number; children: ReactNode }) {
  return (
    <svg viewBox={`0 0 360 ${height}`} fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" focusable="false">
      {children}
    </svg>
  );
}

function PlotLabel({ x, y, height, children, accent = false }: { x: number; y: number; height: number; children: ReactNode; accent?: boolean }) {
  return (
    <span className="study-artwork-node-label" style={{
      left: `${x / 3.6}%`,
      top: `${y / height * 100}%`,
      color: accent ? "var(--accent-readable)" : undefined,
    }}>
      {children}
    </span>
  );
}

const workday = [
  { x: 123, time: "午前", report: "比較的軽い" },
  { x: 218, time: "15時ごろ", report: "重くなる" },
  { x: 310, time: "退勤前", report: "つらい" },
] as const;

function CaseTimeComparison() {
  const height = 128;
  return (
    <>
      <div className="mb-1 grid grid-cols-3 gap-1 ps-[21%] text-center text-sm leading-snug">
        {workday.map(({ time, report }) => (
          <div key={time} className="min-w-0">
            <p className="font-semibold">{time}</p>
            <p className="text-xs text-muted">{report}</p>
          </div>
        ))}
      </div>
      <div className="study-artwork-plot">
        <CaseCanvas height={height}>
          <rect x="5" y="7" width="350" height="51" rx="10" className="study-artwork-paper study-artwork-guide" />
          <rect x="5" y="69" width="350" height="51" rx="10" className="study-artwork-paper study-artwork-guide" />
          <path d="M102 33H334" className="study-artwork-guide" />
          <path d="M102 95H334" className="study-artwork-guide study-artwork-dashed" />
          {workday.map(({ x, time }) => (
            <g key={time}>
              <circle cx={x} cy="33" r="4" className="study-artwork-paper study-artwork-accent" />
              <circle cx={x} cy="95" r="3.2" className="study-artwork-paper study-artwork-guide" />
            </g>
          ))}
        </CaseCanvas>
        <PlotLabel x={52} y={33} height={height}>仕事</PlotLabel>
        <PlotLabel x={52} y={95} height={height}>休日</PlotLabel>
      </div>
      <p className="study-artwork-line-caption">休みの日も同じ時間帯の様子を聞く</p>
    </>
  );
}

const soapFields = [
  { letter: "S", label: "報告", x: 5, y: 5 },
  { letter: "O", label: "観察", x: 183, y: 5 },
  { letter: "A", label: "評価", x: 5, y: 74 },
  { letter: "P", label: "計画", x: 183, y: 74 },
] as const;

function SoapRecord() {
  const height = 143;
  return (
    <div className="study-artwork-plot">
      <CaseCanvas height={height}>
        {soapFields.map(({ letter, x, y }) => (
          <g key={letter} transform={`translate(${x} ${y})`}>
            <rect width="172" height="62" rx="10" className="study-artwork-paper study-artwork-guide" />
            <rect x="11" y="11" width="40" height="40" rx="8" className="study-artwork-highlight" />
          </g>
        ))}
      </CaseCanvas>
      {soapFields.map(({ letter, label, x, y }) => (
        <div key={letter}>
          <PlotLabel x={x + 31} y={y + 31} height={height} accent>{letter}</PlotLabel>
          <PlotLabel x={x + 107} y={y + 31} height={height}>{label}</PlotLabel>
        </div>
      ))}
    </div>
  );
}

const visitReports = [
  { time: "直前", pain: 7, y: 39 },
  { time: "直後", pain: 3, y: 93 },
] as const;
const visitTicks = [0, 5, 10] as const;
const visitAxisStart = 106;
const visitAxisStep = 22;

function CaseVisitResponse() {
  const height = 126;
  return (
    <>
      <p className="text-center text-sm font-semibold">頭痛の強さ（0〜10）</p>
      <div className="flex justify-between gap-2 text-sm text-muted" style={{ marginInlineStart: "27%", marginInlineEnd: "7%" }}>
        {visitTicks.map(value => <span key={value}>{value}</span>)}
      </div>
      <div className="study-artwork-plot">
        <CaseCanvas height={height}>
          {visitTicks.map(value => (
            <path key={value} d={`M${visitAxisStart + value * visitAxisStep} 7V116`} className="study-artwork-guide study-artwork-dashed" />
          ))}
          {visitReports.map(({ time, pain, y }) => (
            <g key={time}>
              <path d={`M${visitAxisStart} ${y}H326`} className="study-artwork-guide" />
              <circle cx={visitAxisStart + pain * visitAxisStep} cy={y} r="6" className="study-artwork-paper study-artwork-accent" />
            </g>
          ))}
        </CaseCanvas>
        {visitReports.map(({ time, pain, y }) => (
          <div key={time}>
            <PlotLabel x={46} y={y} height={height}>{time}</PlotLabel>
            <PlotLabel x={visitAxisStart + pain * visitAxisStep + 29} y={y} height={height} accent>{pain}</PlotLabel>
          </div>
        ))}
      </div>
      <p className="study-artwork-line-caption rounded-lg border border-dashed border-frame bg-panel px-2 py-1">帰宅後・作業への影響は未評価</p>
    </>
  );
}

const followUpReports = [
  { time: "翌日の夕方", pain: 3, x: 66 },
  { time: "週の後半", pain: 5, x: 180 },
  { time: "前日の夕方", pain: 4, x: 294 },
] as const;

function CaseFollowUp() {
  const height = 94;
  const barBottom = 84;
  return (
    <>
      <p className="text-center text-sm font-semibold">頭痛の強さ（0〜10）</p>
      <div className="study-artwork-plot">
        <CaseCanvas height={height}>
          <path d={`M19 ${barBottom}H341`} className="study-artwork-guide" />
          {followUpReports.map(({ time, pain, x }) => (
            <g key={time}>
              <rect x={x - 13} y={barBottom - 50} width="26" height="50" rx="4" className="study-artwork-paper study-artwork-guide" />
              <rect x={x - 13} y={barBottom - pain * 5} width="26" height={pain * 5} rx="4" className="study-artwork-highlight study-artwork-accent" />
            </g>
          ))}
        </CaseCanvas>
        {followUpReports.map(({ time, pain, x }) => (
          <PlotLabel key={time} x={x} y={barBottom - pain * 5 - 22} height={height} accent>{pain}</PlotLabel>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-1 text-center text-sm leading-snug">
        {followUpReports.map(({ time }) => <p key={time} className="min-w-0">{time}</p>)}
      </div>
      <p className="mt-3 rounded-lg border border-frame bg-panel px-2 py-1 text-sm">
        <strong className="block">作業の記録</strong>
        火曜は休憩を挟み、約30分ずつ発表の準備。
      </p>
    </>
  );
}

export const caseArtwork = {
  "case-time-comparison": CaseTimeComparison,
  "soap-record": SoapRecord,
  "case-visit-response": CaseVisitResponse,
  "case-follow-up": CaseFollowUp,
};

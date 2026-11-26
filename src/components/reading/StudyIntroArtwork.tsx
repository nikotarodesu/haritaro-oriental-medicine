import type { ReactNode } from "react";

function Canvas({ children }: { children: ReactNode }) {
  return <svg viewBox="0 0 360 108" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" focusable="false">{children}</svg>;
}

function ReadingSources() {
  return (
    <>
      <div className="study-artwork-plot">
        <Canvas>
          <path d="M180 32v14M60 66V46h240v20M180 46v20" className="study-artwork-accent" />
          <rect x="118" y="5" width="124" height="27" rx="13" className="study-artwork-accent study-artwork-paper" />
          <path d="M43 76c8-4 13-4 17 0 4-4 10-4 17 0v19c-7-4-13-4-17 0-4-4-9-4-17 0Zm17 0v19" className="study-artwork-accent study-artwork-paper" />
          <path d="M166 75v20h29m-25-5h5m4-7h5m4-7h5" className="study-artwork-accent" />
          <path d="M285 75h30v17h-12l-8 6v-6h-10Zm8 6h14m-14 5h10" className="study-artwork-accent study-artwork-paper" />
        </Canvas>
        <span className="study-artwork-node-label" style={{ left: "50%", top: "17%" }}>知りたいこと</span>
      </div>
      <div className="study-artwork-scale"><span>用語集</span><span>研究</span><span>診察・相談</span></div>
    </>
  );
}

function DailyGoals() {
  return (
    <>
      <div className="study-artwork-plot">
        <Canvas>
          <path d="M180 32v15M90 63V47h180v16m-185-4 5 5 5-5m170 0 5 5 5-5" className="study-artwork-accent" />
          <rect x="118" y="5" width="124" height="27" rx="13" className="study-artwork-accent study-artwork-paper" />
          <path d="M69 78v21m42-11v11M69 92h42V82H87v10m-12-8h7v8" className="study-artwork-warm" />
          <g className="study-artwork-warm">
            <circle cx="259" cy="78" r="5" />
            <circle cx="281" cy="78" r="5" />
            <path d="M251 91c0-7 16-7 16 0m6 0c0-7 16-7 16 0m-35 3h32m-28 0v7m24-7v7" />
          </g>
        </Canvas>
        <span className="study-artwork-node-label" style={{ left: "50%", top: "17%" }}>肩がつらい</span>
      </div>
      <div className="study-artwork-scale study-artwork-scale--two"><span>夜に眠りたい</span><span>会議を終えたい</span></div>
    </>
  );
}

function ResearchReading() {
  return (
    <>
      <Canvas>
        <rect x="32" y="9" width="116" height="88" rx="12" className="study-artwork-accent study-artwork-paper" />
        <path d="M54 31v43h71M65 45h42m-42 16h49" className="study-artwork-accent" />
        <path d="M155 53h49m-7-5 7 5-7 5" className="study-artwork-guide study-artwork-dashed" />
        <rect x="212" y="9" width="116" height="88" rx="12" className="study-artwork-warm study-artwork-paper" />
        <path d="M246 30h48v31h-20l-9 9v-9h-19Zm18 10c0-7 13-7 13 0 0 5-7 5-7 10" className="study-artwork-warm" />
        <circle cx="270" cy="54" r="1" className="study-artwork-warm" />
      </Canvas>
      <div className="study-artwork-scale study-artwork-scale--two"><span>測った結果</span><span>理由をどう考えたか</span></div>
    </>
  );
}

export const introArtwork = {
  "reading-sources": ReadingSources,
  "daily-goals": DailyGoals,
  "research-reading": ResearchReading,
};

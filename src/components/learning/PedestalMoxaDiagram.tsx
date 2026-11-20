export default function PedestalMoxaDiagram() {
  return (
    <svg
      viewBox="0 0 360 220"
      className="acupuncture-tool-diagram"
      role="img"
      aria-labelledby="pedestal-moxa-svg-title"
      aria-describedby="pedestal-moxa-svg-desc"
    >
      <title id="pedestal-moxa-svg-title">台座灸の断面ともぐさの熱が伝わる向き</title>
      <desc id="pedestal-moxa-svg-desc">上の巻きもぐさを紙パルプの台座が支えています。台座の中央の穴を通って、下の皮膚に熱が伝わる様子を矢印で示しています。</desc>
      <path d="M25 172h231v25q0 10-10 10H35q-10 0-10-10z" className="moxa-diagram-skin" />
      <path d="M134 180q21 7 42 0m-52 8q31 10 62 0" className="moxa-diagram-warmth" />
      <path d="M25 172h231" className="moxa-diagram-surface" />

      <path d="M102 113h43l-9 59H70l12-46q4-13 20-13zm63 0h43q16 0 20 13l12 46h-66z" className="moxa-diagram-pedestal" />
      <path d="M85 151h45m-48 10h46m52-10h46m-44 10h46" className="moxa-diagram-fibres" />
      <path d="M145 113h20l9 59h-38z" className="moxa-diagram-air" />
      <rect x="121" y="47" width="68" height="66" rx="4" className="moxa-diagram-roll" />
      <path d="M129 57v46m52-46v46M139 72l7-6m-7 18 9-8m10-6 7-6m-8 19 11-9m-24 25 9-8m7 9 9-8" className="moxa-diagram-fibres" />
      <ellipse cx="155" cy="47" rx="34" ry="8" className="moxa-diagram-ember" />
      <path d="M143 33q-5-5 0-10t0-10m12 18q-5-6 0-11t0-11m12 24q-5-5 0-10t0-10" className="moxa-diagram-smoke" />
      <path d="M155 105v61m-6-7 6 7 6-7" className="moxa-diagram-heat" />

      <path d="M188 70h35m-6 65h32M94 100h23l31 31m108 41h12l7 6" className="moxa-diagram-leaders" />
      <g className="moxa-diagram-labels">
        <text x="229" y="75">巻きもぐさ</text>
        <text x="255" y="140">紙の台座</text>
        <text x="23" y="105">台座の穴</text>
        <text x="280" y="184">皮膚</text>
        <text x="150" y="199" textAnchor="middle" className="moxa-diagram-heat-label">熱の向き</text>
      </g>
    </svg>
  );
}

export default function SeirinNeedleDiagram() {
  return (
    <svg
      viewBox="0 0 360 204"
      className="acupuncture-tool-diagram"
      role="img"
      aria-labelledby="seirin-needle-svg-title"
      aria-describedby="seirin-needle-svg-desc"
    >
      <title id="seirin-needle-svg-title">セイリン Jタイプの3番・寸3の構造</title>
      <desc id="seirin-needle-svg-desc">青い持ち手が鍼柄、その先の金属部が鍼体、先端が鍼尖。鍼体の長さは40 mm、断面の直径は0.20 mm。下の透明な筒は鍼管です。</desc>
      <g className="needle-diagram-labels">
        <text x="74" y="25">鍼柄</text>
        <text x="220" y="25">鍼体</text>
        <text x="327" y="25">鍼尖</text>
      </g>
      <path d="M74 32v20m146-20v23m107-23v31" className="needle-diagram-leaders" />
      <rect x="24" y="55" width="101" height="19" rx="7" className="needle-diagram-handle" />
      <path d="M35 61h78M35 68h78" className="needle-diagram-handle-detail" />
      <path d="M125 63H315l12 1.5-12 1.5H125z" className="needle-diagram-steel" />
      <path d="M125 80v22m202-22v22" className="needle-diagram-leaders" />
      <path d="M125 94h202m-195-4-7 4 7 4m188-8 7 4-7 4" className="needle-diagram-measure" />
      <text x="226" y="119" className="needle-diagram-dimension">40 mm</text>

      <path d="M29 128h302" className="needle-diagram-divider" />
      <text x="99" y="151" className="needle-diagram-labels">鍼管</text>
      <path d="M99 157v12" className="needle-diagram-leaders" />
      <path d="M32 170h202v18H32c-8 0-8-18 0-18z" className="needle-diagram-tube" />
      <path d="M33 175h200m-200 8h200" className="needle-diagram-tube-inner" />
      <ellipse cx="235" cy="179" rx="5" ry="9" className="needle-diagram-tube-rim" />

      <circle cx="303" cy="153" r="12" className="needle-diagram-cross-section" />
      <path d="M291 153h24m-20-3-4 3 4 3m16-6 4 3-4 3" className="needle-diagram-measure" />
      <text x="303" y="188" className="needle-diagram-dimension">0.20 mm</text>
    </svg>
  );
}

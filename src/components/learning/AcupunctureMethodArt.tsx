export type AcupunctureMethod = "needle" | "moxa" | "pressure";

export default function AcupunctureMethodArt({ method }: { method: AcupunctureMethod }) {
  const skin = method === "pressure" ? "M12 84H44C57 84 60 91 74 91S91 84 104 84H136" : "M12 84H136";

  return (
    <svg viewBox="0 0 148 110" className={`acupuncture-method-art acupuncture-method-art--${method}`} aria-hidden="true">
      <circle cx="74" cy="49" r="38" className="acupuncture-art-wash" />
      <path d={`${skin}v15H12Z`} className="acupuncture-art-skin-fill" />
      <path d="M12 99h124" className="acupuncture-art-skin-lower" />
      {method === "needle" && (
        <g transform="rotate(29 74 84)" className="acupuncture-art-tool">
          <path d="M69 19h10v30H69z" className="acupuncture-art-solid" />
          <path d="M71 25h6m-6 6h6m-6 6h6m-6 6h6" className="acupuncture-art-hatching" />
          <path d="M74 49v48" />
        </g>
      )}
      {method === "moxa" && (
        <g className="acupuncture-art-tool">
          <path d="M54 77h40v6H54z" className="acupuncture-art-wash" />
          <path d="M63 77 70 56q4-8 8 0l7 21z" className="acupuncture-art-solid" />
          <path d="m70 72 3-9m5 9-2-9" className="acupuncture-art-hatching" />
          <path d="M62 48q-6-5 0-11t0-10m12 19q-6-6 0-12t0-12m12 26q-6-5 0-11t0-10" />
          <path d="M64 89q10 7 20 0" className="acupuncture-art-heat" />
        </g>
      )}
      {method === "pressure" && (
        <g className="acupuncture-art-tool">
          <path d="M132 31h-10c-12 0-21 5-28 12L62 74c-5 5-5 11 0 15 4 3 10 1 15-2l44-27q5-3 11-3" className="acupuncture-art-wash" />
          <path d="M61 77q5-6 12-6 5 1 6 5M95 48l7 6m-10-2 6 5" className="acupuncture-art-heat" />
          <path d="M64 33v20m-6-6 6 6 6-6" />
        </g>
      )}
      <path d={skin} className="acupuncture-art-skin-line" />
    </svg>
  );
}

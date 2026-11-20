export type AcupunctureMethod = "needle" | "moxa" | "pressure";

export default function AcupunctureMethodArt({ method }: { method: AcupunctureMethod }) {
  return (
    <svg viewBox="24 10 132 102" className={`acupuncture-method-art acupuncture-method-art--${method}`} aria-hidden="true">
      <circle cx="90" cy="61" r="45" className="acupuncture-art-disk" />
      <path d="M25 94H155" className="acupuncture-art-rule" />
      {method === "needle" && <>
        <path d="M45 87H125" className="acupuncture-art-guide" />
        <rect x="72" y="29" width="26" height="57" rx="6" fill="#EAF1ED" fillOpacity=".8" stroke="#6D8C81" strokeWidth="1.6" />
        <path d="M78 34V80M92 35V80" stroke="#AAC6BB" strokeWidth="1.2" fill="none" />
        <g transform="rotate(34 105 61)">
          <path d="M104 21h8v29h-8z" fill="#54766D" stroke="#31584E" strokeWidth="1.4" strokeLinejoin="round" />
          <path d="M105 27h6m-6 6h6m-6 6h6m-6 6h6" stroke="#DAE7E0" strokeWidth="1.1" />
          <path d="M108 50v47" stroke="#385F54" strokeWidth="2" strokeLinecap="round" />
        </g>
        <circle cx="125" cy="42" r="3" fill="#77A091" />
      </>}
      {method === "moxa" && <>
        <path d="M56 87h68" className="acupuncture-art-guide" />
        <path d="M61 78q29 8 58 0v9q-29 9-58 0Z" fill="#CBA481" stroke="#9A6948" strokeWidth="1.6" />
        <ellipse cx="90" cy="78" rx="29" ry="7" fill="#F8E8D1" stroke="#9A6948" strokeWidth="1.6" />
        <path d="M78 77l8-22q4-7 8 0l8 22q-12 5-24 0Z" fill="#C08C51" stroke="#805735" strokeWidth="1.6" />
        <path d="M84 72l4-9m0 13 3-13m3 13-1-11" fill="none" stroke="#F2CD93" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M78 48q-5-6 0-12t0-12m12 23q-5-7 0-13t0-13m12 27q-5-6 0-12t0-12" fill="none" stroke="#B2693F" strokeWidth="2" strokeLinecap="round" />
      </>}
      {method === "pressure" && <>
        <path d="M43 83q29-3 44 3 14 5 28 0 9-3 21-3v12H43Z" fill="#F0D9C5" stroke="#A47562" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M111 38l-6-10q-3-5-8-2t-3 8l4 11-6-5q-5-4-9 0t0 8l8 9-21 10q-8 4-4 11t12 3l43-16q13-4 8-17l-9-14q-3-5-7-2t-2 6Z" fill="#F3DDCB" stroke="#985F50" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M69 73q5-4 11-4m18-24 7 8m6-15 7 11" fill="none" stroke="#BB8774" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="86" cy="86" r="3.1" fill="#985F50" />
      </>}
    </svg>
  );
}

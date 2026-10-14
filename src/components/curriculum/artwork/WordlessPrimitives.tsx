import type { ReactNode } from 'react';

export const ink = "var(--text-sumi, #25332F)";
export const accent = "var(--accent-readable, #36745D)";
export const surface = "var(--concept-art-surface, var(--bg-card, #FAF8F3))";
export const gold = "var(--concept-gold, #AA8245)";
export const water = "var(--concept-water, #598A98)";

// Browser and server trig implementations can differ in their final digits.
// Serialize the same practical SVG precision on both sides of hydration.
export const svgNumber = (value: number) => Number(value.toFixed(3));

export type GlyphName = "person" | "people" | "eye" | "thought" | "document" | "clock" | "sun" | "moon" | "leaf" | "flame" | "earth" | "metal" | "drop" | "grain" | "snow" | "shield" | "cup" | "measure" | "comparison";

/** Small native vector glyphs share a 64 × 64 drawing space. */
export function Glyph({ name, x = 0, y = 0, scale = 1, color = ink }: { name: GlyphName; x?: number; y?: number; scale?: number; color?: string }) {
  let shapes: ReactNode;
  switch (name) {
    case "person":
      shapes = <><circle cx="32" cy="17" r="8" /><path d="M19 55V43c0-8 5-13 13-13s13 5 13 13v12M25 42v13M39 42v13" /></>;
      break;
    case "people":
      shapes = <><circle cx="32" cy="20" r="7" /><circle cx="13" cy="25" r="5" /><circle cx="51" cy="25" r="5" /><path d="M21 53V43c0-7 4-11 11-11s11 4 11 11v10M4 49v-8c0-5 3-8 9-8h3M60 49v-8c0-5-3-8-9-8h-3" /></>;
      break;
    case "eye":
      shapes = <><path d="M4 32Q32 4 60 32Q32 60 4 32Z" /><circle cx="32" cy="32" r="10" /><circle cx="32" cy="32" r="3" fill={color} stroke="none" /></>;
      break;
    case "thought":
      shapes = <><path d="M13 35c-10-10 1-25 12-20 4-11 23-9 24 2 13 1 15 20 3 24H20c-4 0-7-2-7-6Z" /><circle cx="17" cy="49" r="3" /><circle cx="10" cy="57" r="1.5" fill={color} /><path d="M26 24h14M22 32h22" opacity=".5" /></>;
      break;
    case "document":
      shapes = <><path d="M16 7h24l10 11v39H16Z M40 7v11h10" /><path d="M24 29h18M24 37h18M24 45h11" /></>;
      break;
    case "clock":
      shapes = <><circle cx="32" cy="32" r="24" /><path d="M32 17v15l10 7M32 8v3M56 32h-3M32 56v-3M8 32h3" /></>;
      break;
    case "sun":
      shapes = <><circle cx="32" cy="32" r="13" fill={gold} fillOpacity=".12" /><path d="M32 3v9M32 52v9M3 32h9M52 32h9M11 11l7 7M46 46l7 7M11 53l7-7M46 18l7-7" /></>;
      break;
    case "moon":
      shapes = <><path d="M44 7a25 25 0 1 0 13 40A27 27 0 0 1 44 7Z" fill={water} fillOpacity=".12" /><path d="m15 7 2 4 4 2-4 2-2 4-2-4-4-2 4-2ZM55 18v8M51 22h8" /></>;
      break;
    case "leaf":
      shapes = <><path d="M16 49C8 25 23 10 51 9c0 25-8 42-35 40Z" fill={accent} fillOpacity=".1" /><path d="M10 56 42 23M23 43l-2-15M30 36l14 1" /></>;
      break;
    case "flame":
      shapes = <><path d="M34 5c3 17-15 21-11 30 5-2 8-8 8-13 13 12 26 18 19 31-9 17-35 10-35-5C12 32 29 23 34 5Z" fill={gold} fillOpacity=".1" /><path d="M31 56c-8-9 0-15 5-23 1 8 10 14 5 21" /></>;
      break;
    case "earth":
      shapes = <><path d="M5 46 23 22l12 17 7-9 17 16ZM5 55h54" fill={gold} fillOpacity=".1" /><path d="m19 28 4 4 4-4M11 61h42" /></>;
      break;
    case "metal":
      shapes = <><path d="m32 6 24 17v26L32 60 8 49V23ZM8 23l24 13 24-13M32 36v24M32 6v30" fill={ink} fillOpacity=".045" /></>;
      break;
    case "drop":
      shapes = <><path d="M32 5C26 16 12 29 12 40a20 20 0 0 0 40 0C52 29 38 16 32 5Z" fill={water} fillOpacity=".1" /><path d="M20 39a12 12 0 0 0 12 12" /></>;
      break;
    case "grain":
      shapes = <><path d="M32 60V10M32 23c-12 0-16-5-15-12 9 0 15 5 15 12ZM32 35c-12 0-16-5-15-12 9 0 15 5 15 12ZM32 47c-12 0-16-5-15-12 9 0 15 5 15 12ZM32 29c12 0 16-5 15-12-9 0-15 5-15 12ZM32 41c12 0 16-5 15-12-9 0-15 5-15 12Z" /></>;
      break;
    case "snow":
      shapes = <><path d="M32 4v56M8 18l48 28M8 46l48-28M24 8l8 7 8-7M24 56l8-7 8 7M9 28l10-3-2-11M47 50l-2-11 10-3M9 36l10 3-2 11M47 14l-2 11 10 3" /></>;
      break;
    case "shield":
      shapes = <><path d="m32 5 22 8v18c0 15-9 24-22 30C19 55 10 46 10 31V13Z" fill={accent} fillOpacity=".08" /><path d="m22 32 7 7 15-16" /></>;
      break;
    case "cup":
      shapes = <><path d="M11 13v27c0 12 9 18 21 18s21-6 21-18V13M7 13h50M16 35h32" /><circle cx="25" cy="26" r="2" fill={color} /><circle cx="37" cy="27" r="2" fill={color} /></>;
      break;
    case "measure":
      shapes = <><rect x="7" y="25" width="50" height="21" rx="3" /><path d="M15 25v9M23 25v6M32 25v11M41 25v6M49 25v9M27 13l5 5 5-5" /></>;
      break;
    case "comparison":
      shapes = <><path d="M6 9h20v46H6ZM38 9h20v46H38Z" /><circle cx="16" cy="23" r="4" /><circle cx="48" cy="23" r="4" /><path d="M12 43v-8h8v8M44 43V33h8v10M29 28h6M29 35h6" /></>;
      break;
  }
  return <g transform={`translate(${svgNumber(x)} ${svgNumber(y)}) scale(${svgNumber(scale)})`} stroke={color} fill="none" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">{shapes}</g>;
}

export function Disk({ x, y, r = 38, children }: { x: number; y: number; r?: number; children?: ReactNode }) {
  return <g><circle cx={x} cy={y} r={r} fill={accent} fillOpacity=".045" stroke={accent} strokeOpacity=".17" strokeWidth="1" />{children}</g>;
}

export function Arrow({ d, x, y, angle = 0, color = accent, opacity = .72 }: { d?: string; x: number; y: number; angle?: number; color?: string; opacity?: number }) {
  return <g stroke={color} fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity={opacity}>
    {d && <path d={d} />}
    <path d="m-6-5 6 5-6 5" transform={`translate(${svgNumber(x)} ${svgNumber(y)}) rotate(${svgNumber(angle)})`} />
  </g>;
}


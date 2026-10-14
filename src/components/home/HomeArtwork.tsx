import type { SVGProps } from "react";
import TaijiSymbol from "@/components/graphics/TaijiSymbol";

export function HomeHeroArtwork() {
  return (
    <svg className="home-hero-artwork" viewBox="0 0 600 500" fill="none" aria-hidden="true" focusable="false">
      <g transform="translate(130 80) scale(3.4)"><TaijiSymbol /></g>
    </svg>
  );
}

type ToolIconName = "lecture" | "acupoint" | "quiz" | "reasoning" | "prescription" | "notes";

/** Decorative icons accompany visible link labels; no client runtime is needed. */
export function HomeToolIcon({ name, ...props }: SVGProps<SVGSVGElement> & { name: ToolIconName }) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {name === "lecture" && <path d="M12 5C9 3 5 3 2 4V19C6 18 9 18 12 20C15 18 18 18 22 19V4C19 3 15 3 12 5ZM12 5V20M5 7H8M5 10H8M16 7H19M16 10H19" />}
      {name === "acupoint" && <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3" /><path d="M12 1V5M12 19V23M1 12H5M19 12H23" /></>}
      {name === "quiz" && <><path d="M6 3H18V21L12 18L6 21ZM9 9L11 11L15 7" /><path d="M9 14H15" /></>}
      {name === "reasoning" && <><circle cx="12" cy="4" r="2" /><circle cx="5" cy="19" r="2" /><circle cx="19" cy="19" r="2" /><path d="M12 6V11M5 17V11H19V17" /></>}
      {name === "prescription" && <><circle cx="12" cy="5" r="2" /><circle cx="5" cy="18" r="2" /><circle cx="19" cy="18" r="2" /><path d="M11 7L6 16M13 7L18 16M7 18H17" /><circle cx="12" cy="13" r="1" /></>}
      {name === "notes" && <path d="M6 3H20V21H6C3 21 3 17 6 17H20M6 3C3 3 3 6 3 8V19M8 8H16M8 12H14" />}
    </svg>
  );
}

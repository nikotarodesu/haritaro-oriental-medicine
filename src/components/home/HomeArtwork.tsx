import type { SVGProps } from "react";

export function HomeHeroArtwork() {
  return (
    <svg className="home-hero-artwork" viewBox="0 0 600 500" fill="none" aria-hidden="true" focusable="false">
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path strokeWidth="3" d="M414 92C344 52 246 65 193 127C137 192 141 292 202 351C264 412 364 413 429 352C484 301 494 218 455 157" />
        <path strokeWidth="1.2" d="M405 106C340 71 253 84 207 137C157 195 161 283 214 335C267 387 358 391 415 335C462 289 472 222 443 170" />
        <path d="M99 264C179 238 223 265 279 289C343 317 417 324 525 270M72 285C167 252 222 293 276 313C345 340 427 340 549 294M57 311C154 282 213 318 275 339C344 362 430 365 564 321" />
        <path strokeWidth="1.5" d="M111 410C141 361 151 329 154 282C158 241 153 194 137 156" />
        <path strokeWidth="1.2" d="M153 322C127 319 108 302 99 275C125 278 146 294 153 322ZM154 285C175 278 190 259 196 234C172 242 158 262 154 285ZM153 251C131 246 117 229 111 208C133 215 148 232 153 251ZM148 218C165 210 175 194 176 174C157 184 148 199 148 218" />
        <circle cx="455" cy="157" r="4" fill="currentColor" stroke="none" />
      </g>
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

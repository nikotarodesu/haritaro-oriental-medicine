/** Decorative learning illustrations. The surrounding links provide their labels. */
export function ClinicalHeroArtwork() {
  return (
    <svg
      className="clinical-hero-artwork"
      viewBox="0 0 440 280"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="96" cy="142" r="80" stroke="var(--clinical-art-muted)" strokeOpacity=".24" />
      <circle cx="96" cy="142" r="61" fill="var(--clinical-art-muted)" fillOpacity=".08" stroke="none" />
      <circle cx="350" cy="139" r="77" fill="var(--clinical-art-gold)" fillOpacity=".08" stroke="none" />

      <g stroke="var(--clinical-art-muted)" strokeOpacity=".55">
        <path d="M148 142H162V94H179M162 142V194H179" />
        <path d="M255 94H276V142H310M255 194H276V142" />
        <circle cx="162" cy="142" r="3" fill="var(--clinical-art-muted)" stroke="none" />
        <circle cx="276" cy="142" r="3" fill="var(--clinical-art-muted)" stroke="none" />
      </g>

      <g>
        <circle cx="88" cy="121" r="16" />
        <path d="M56 176V166C56 149 120 149 120 166V176" />
        <path d="M77 150L88 158L99 150" stroke="var(--clinical-art-muted)" />
        <circle cx="120" cy="103" r="15" fill="var(--clinical-art-gold)" fillOpacity=".13" />
        <circle cx="120" cy="103" r="5" stroke="var(--clinical-art-gold)" />
        <path d="M130 114L139 124" />
      </g>

      <g>
        <rect x="184" y="53" width="66" height="80" rx="9" />
        <path d="M201 73H233" stroke="var(--clinical-art-muted)" />
        <circle cx="202" cy="91" r="4" fill="var(--clinical-art-gold)" fillOpacity=".25" stroke="var(--clinical-art-gold)" />
        <path d="M214 91H233M198 110H220M226 110H233" />
        <rect x="184" y="154" width="66" height="80" rx="9" />
        <path d="M201 174H233" stroke="var(--clinical-art-muted)" />
        <path d="M198 192L202 188L206 192L202 196Z" fill="var(--clinical-art-gold)" fillOpacity=".25" stroke="var(--clinical-art-gold)" />
        <path d="M214 192H233M198 211H220M226 211H233" />
      </g>

      <g>
        <path d="M327 88H371L391 108V194H319V96A8 8 0 0 1 327 88Z" />
        <path d="M371 88V108H391" stroke="var(--clinical-art-muted)" />
        <path d="M335 125H374" stroke="var(--clinical-art-muted)" />
        <circle cx="336" cy="144" r="3" fill="var(--clinical-art-gold)" stroke="none" />
        <path d="M348 144H374" />
        <rect x="333" y="158" width="7" height="7" rx="1.5" stroke="var(--clinical-art-gold)" />
        <path d="M348 162H367" />
        <path d="M348 178L354 184L366 172" stroke="var(--clinical-art-gold)" />
      </g>

      <g stroke="none" fill="var(--clinical-art-gold)">
        <circle cx="48" cy="63" r="3" opacity=".6" />
        <circle cx="147" cy="227" r="4" opacity=".35" />
        <circle cx="300" cy="50" r="3" opacity=".6" />
        <circle cx="407" cy="222" r="2" opacity=".45" />
      </g>
    </svg>
  );
}

export function ClinicalComplaintIcon({ kind, className }: { kind: string; className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {kind === "shoulder" && (
        <>
          <circle cx="32" cy="15" r="7" />
          <path d="M27 22V27M37 22V27M13 52V39C13 31 23 28 27 27M37 27C41 28 51 31 51 39V52M23 41V55M41 41V55" />
          <path d="M17 34C21 31 24 30 28 30M36 30C40 30 43 31 47 34" stroke="var(--clinical-art-gold)" strokeWidth="3" />
        </>
      )}
      {kind === "back" && (
        <>
          <circle cx="32" cy="13" r="6" />
          <path d="M27 20V25M37 20V25M27 25L18 28L22 43L19 55M37 25L46 28L42 43L45 55M25 55V48M39 55V48" />
          <path d="M32 29V40" stroke="var(--clinical-art-muted)" />
          <path d="M23 44C28 42 36 42 41 44" stroke="var(--clinical-art-gold)" strokeWidth="3" />
        </>
      )}
      {kind === "headache" && (
        <>
          <path d="M24 54V44C17 40 14 34 14 27C14 16 23 9 33 10C43 11 48 18 47 27L51 33L45 35V41C45 44 42 45 36 45V54" />
          <path d="M38 29H39" />
          <path d="M24 19C27 16 32 15 36 17" stroke="var(--clinical-art-gold)" strokeWidth="3" />
          <path d="M24 27C25 25 27 24 29 24" stroke="var(--clinical-art-muted)" />
        </>
      )}
      {kind === "sleep" && (
        <>
          <path d="M38 11C23 7 11 18 13 33C15 48 32 55 43 45C31 45 23 32 28 22C30 17 34 13 38 11Z" />
          <path d="M46 15V25M41 20H51" stroke="var(--clinical-art-gold)" />
          <circle cx="50" cy="36" r="2" fill="var(--clinical-art-muted)" stroke="none" />
        </>
      )}
      {kind === "digestion" && (
        <>
          <path d="M23 10L17 16L21 33L18 54M41 10L47 16L43 33L46 54M26 54V47M38 54V47" />
          <path d="M27 12C29 14 35 14 37 12" stroke="var(--clinical-art-muted)" />
          <ellipse cx="32" cy="35" rx="8" ry="10" fill="var(--clinical-art-gold)" fillOpacity=".1" stroke="var(--clinical-art-gold)" />
          <circle cx="32" cy="35" r="1.5" fill="currentColor" stroke="none" />
        </>
      )}
      {kind === "fatigue" && (
        <>
          <rect x="10" y="21" width="40" height="24" rx="5" />
          <path d="M50 28H55V38H50" />
          <rect x="16" y="27" width="8" height="12" rx="2" fill="var(--clinical-art-gold)" fillOpacity=".22" stroke="var(--clinical-art-gold)" />
          <path d="M30 28V38M38 28V38" stroke="var(--clinical-art-muted)" strokeDasharray="1 4" />
        </>
      )}
      {!["shoulder", "back", "headache", "sleep", "digestion", "fatigue"].includes(kind) && (
        <>
          <circle cx="32" cy="32" r="20" />
          <circle cx="32" cy="32" r="6" stroke="var(--clinical-art-gold)" />
        </>
      )}
    </svg>
  );
}

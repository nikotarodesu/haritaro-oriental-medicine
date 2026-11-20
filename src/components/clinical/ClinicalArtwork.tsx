export function ClinicalHeroArtwork({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 440 248" fill="none" aria-hidden="true" focusable="false">
      <path fill="#233948" d="M0 0H440V248H0Z" />
      <g stroke="#adc5d4" strokeOpacity=".16">
        <path d="M0 40H440M0 82H440M0 124H440M0 166H440M0 208H440M52 0V248M94 0V248M136 0V248M178 0V248M220 0V248M262 0V248M304 0V248M346 0V248M388 0V248" />
        <circle cx="223" cy="124" r="99" />
        <circle cx="223" cy="124" r="115" />
      </g>
      <path d="M81 113V159H155M285 80H351V125" stroke="#adc5d4" strokeWidth="1.5" strokeDasharray="3 5" />
      <g fill="#eabd88">
        <circle cx="81" cy="159" r="4" />
        <circle cx="351" cy="80" r="4" />
        <circle cx="113" cy="199" r="2.5" />
        <circle cx="316" cy="47" r="2.5" />
      </g>
      <rect x="163" y="44" width="126" height="167" rx="14" transform="rotate(8 226 127)" fill="#4a6371" stroke="#adc5d4" strokeOpacity=".55" />
      <rect x="153" y="38" width="126" height="164" rx="14" fill="#f3ebdd" stroke="#fff8ed" strokeWidth="2" />
      <rect x="187" y="29" width="58" height="22" rx="7" fill="#b4c9d3" stroke="#233948" strokeWidth="2" />
      <g stroke="#526d7b" strokeWidth="2.5" strokeLinecap="round">
        <path d="M175 71H240M175 80H219" />
        <path d="M199 106H254M199 128H237M199 150H248M199 172H230" strokeOpacity=".66" />
      </g>
      <g stroke="#80552f" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M175 106L179 110L186 102M175 128L179 132L186 124M175 150L179 154L186 146" />
        <rect x="175" y="167" width="10" height="10" rx="2" strokeOpacity=".65" />
      </g>
      <path d="M45 58H110A13 13 0 0 1 123 71V100A13 13 0 0 1 110 113H75L60 126V113H45A13 13 0 0 1 32 100V71A13 13 0 0 1 45 58Z" fill="#344f61" stroke="#adc5d4" strokeWidth="1.5" />
      <g fill="#f3ebdd">
        <circle cx="59" cy="86" r="3.5" />
        <circle cx="78" cy="86" r="3.5" />
        <circle cx="97" cy="86" r="3.5" />
      </g>
      <rect x="253" y="118" width="141" height="77" rx="13" fill="#344f61" stroke="#adc5d4" strokeWidth="1.5" />
      <path d="M273 157H294M294 157V139H313M294 157V175H313" stroke="#adc5d4" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="274" cy="157" r="4" fill="#eabd88" />
      <g stroke="#adc5d4" strokeWidth="1.5">
        <rect x="312" y="130" width="62" height="18" rx="4" />
        <rect x="312" y="166" width="62" height="18" rx="4" />
      </g>
      <g stroke="#f3ebdd" strokeWidth="1.5" strokeLinecap="round">
        <path d="M324 139H356M324 175H351" />
      </g>
      <path d="M398 77V93M390 85H406M45 184V198M38 191H52" stroke="#eabd88" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function ClinicalCheckArtwork({ kind, className }: { kind: 'gorou' | 'constitution'; className: string }) {
  return (
    <svg className={className} viewBox="0 0 112 96" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <circle cx="56" cy="48" r="41" strokeOpacity=".28" />
      {kind === 'gorou' ? (
        <>
          <path d="M21 77H92M24 47L28 61H49M37 61V75" strokeOpacity=".6" />
          <circle cx="41" cy="27" r="8" />
          <path d="M38 35C33 36 30 43 31 51C32 56 35 57 40 57H51L55 73H63M43 41L51 48H62M61 51H91M81 52V76" />
          <path d="M67 32H89L85 50H62L67 32Z" fill="var(--bg-card)" />
          <path d="M52 23L57 20M53 28H60" stroke="var(--clinical-art-gold)" />
        </>
      ) : (
        <>
          <rect x="26" y="24" width="53" height="54" rx="7" transform="rotate(-9 52 51)" strokeOpacity=".58" />
          <rect x="38" y="16" width="45" height="58" rx="7" fill="var(--bg-card)" />
          <path d="M49 30H72M55 43H72M55 53H72M55 63H68" />
          <path d="M48 43H49M48 53H49M48 63H49" stroke="var(--clinical-art-gold)" strokeWidth="3" />
          <path d="M91 48V60M85 54H97" stroke="var(--clinical-art-gold)" />
        </>
      )}
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

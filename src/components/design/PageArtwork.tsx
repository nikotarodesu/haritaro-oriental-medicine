export type PageArtKind = 'study' | 'points' | 'practice' | 'notes' | 'reading' | 'care' | 'account' | 'about';

/** Navigation symbols, never anatomical or treatment diagrams. */
export function PageSymbol({ kind, className }: { kind: PageArtKind; className?: string }) {
  return <svg className={className} viewBox="0 0 64 64" width="64" height="64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    {kind === 'study' && <><path d="M32 17C24 12 15 11 7 14V49C15 46 24 47 32 52C40 47 49 46 57 49V14C49 11 40 12 32 17ZM32 17V52" /><path d="M15 23C19 22 24 23 27 25M15 31C19 30 24 31 27 33M39 25C42 23 47 22 51 23M39 33C42 31 47 30 51 31" opacity=".45" /></>}
    {kind === 'points' && <><path d="M9 48C8 29 23 42 28 24S51 8 54 17" /><circle cx="14" cy="38" r="5" fill="var(--bg-card)" /><circle cx="29" cy="23" r="5" fill="var(--bg-card)" /><circle cx="49" cy="13" r="5" fill="var(--bg-card)" /><path d="M41 34V54M31 44H51" opacity=".4" /><circle cx="41" cy="44" r="7" stroke="var(--amber-warm)" /></>}
    {kind === 'practice' && <><rect x="8" y="13" width="19" height="39" rx="4" /><rect x="37" y="13" width="19" height="39" rx="4" /><path d="M14 22H21M43 22H50M14 30H21M43 30H50M14 41L17 44L22 38M43 40H50" /><path d="M28 7H36M28 57H36" stroke="var(--amber-warm)" /></>}
    {kind === 'notes' && <><path d="M39 9H15A4 4 0 0 0 11 13V51A4 4 0 0 0 15 55H47A4 4 0 0 0 51 51V35M19 21H33M19 30H28M19 43H26" /><path d="M32 38L35 28L50 13L57 20L42 35ZM47 16L54 23" stroke="var(--amber-warm)" /></>}
    {kind === 'reading' && <><path d="M12 14H23V53H12ZM28 10H39V53H28ZM44 17L53 15L60 51L51 53Z" /><path d="M15 23H20M31 19H36M15 43H20M31 43H36M47 25L55 23" opacity=".45" /><path d="M5 56H59" stroke="var(--amber-warm)" /></>}
    {kind === 'care' && <><path d="M32 50C26 44 10 35 10 23C10 10 26 8 32 20C38 8 54 10 54 23C54 35 38 44 32 50Z" /><path d="M22 33H28L32 25L36 38L40 31H45" stroke="var(--amber-warm)" /></>}
    {kind === 'account' && <><circle cx="27" cy="20" r="10" /><path d="M8 54V46C8 29 46 29 46 46V54" /><path d="M48 24L59 29V39C59 47 48 52 48 52C48 52 37 47 37 39V29ZM43 37L47 41L54 33" stroke="var(--amber-warm)" /></>}
    {kind === 'about' && <><circle cx="32" cy="19" r="11" /><path d="M12 54V46C12 31 52 31 52 46V54M26 37L32 43L38 37" /><path d="M7 20H11M53 20H57M9 9L12 12M52 12L55 9" stroke="var(--amber-warm)" /></>}
  </svg>;
}

export default function PageArtwork({ kind }: { kind: PageArtKind }) {
  return <svg className="page-artwork" viewBox="0 0 360 220" fill="none" aria-hidden="true" focusable="false">
    <circle cx="185" cy="110" r="87" fill="currentColor" fillOpacity=".035" stroke="currentColor" strokeOpacity=".16" />
    <circle cx="185" cy="110" r="66" stroke="currentColor" strokeOpacity=".09" />
    <circle cx="91" cy="51" r="4" fill="var(--amber-warm)" opacity=".65" />
    <circle cx="291" cy="162" r="5" fill="var(--amber-warm)" opacity=".4" />
    <path d="M39 152C72 120 85 158 116 137M252 73C279 52 296 81 327 57" stroke="currentColor" strokeOpacity=".22" strokeWidth="1.5" strokeLinecap="round" />
    <g transform="translate(128 53) scale(1.8)"><PageSymbol kind={kind} /></g>
  </svg>;
}

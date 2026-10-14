const green = 'var(--emblem-green, var(--accent-readable, #184F49))';
const gold = 'var(--emblem-gold, #AE8750)';
const water = 'var(--emblem-water, #7195A2)';
const paper = 'var(--emblem-paper, var(--bg-card, #FCFAF6))';

function Mark({ seriesId }: { seriesId?: string }) {
  switch (seriesId) {
    case 'yinyang':
      return <>
        <circle cx="40" cy="40" r="23" fill={paper} />
        <path d="M40 17a23 23 0 0 0 0 46 11.5 11.5 0 0 0 0-23 11.5 11.5 0 0 1 0-23Z" fill={green} />
        <circle cx="40" cy="28.5" r="3.8" fill={green} stroke="none" />
        <circle cx="40" cy="51.5" r="3.8" fill={paper} stroke="none" />
      </>;
    case 'qiblood':
      return <>
        <path d="M17 29c9-12 16 12 26 0s16-5 19-1" stroke={gold} />
        <path d="M17 41c9-12 16 12 26 0s16-5 19-1" />
        <path d="M17 53c9-12 16 12 26 0s16-5 19-1" stroke={water} />
        <circle cx="24" cy="25" r="3" fill={gold} stroke="none" />
        <circle cx="54" cy="47" r="3" fill={water} stroke="none" />
      </>;
    case 'zangfu':
      return <>
        <path d="M40 40C22 32 29 14 40 17c11-3 18 15 0 23Z" fill={gold} fillOpacity=".12" stroke={gold} />
        <path d="M40 40c2-20 21-18 24-7 6 10-9 22-24 7Z" fill={green} fillOpacity=".1" />
        <path d="M40 40c20-5 24 13 14 19-8 8-25-2-14-19Z" fill={water} fillOpacity=".12" stroke={water} />
        <path d="M40 40c11 17-6 27-14 19-10-6-6-24 14-19Z" fill={gold} fillOpacity=".12" stroke={gold} />
        <path d="M40 40c-15 15-30 3-24-7 3-11 22-13 24 7Z" fill={green} fillOpacity=".1" />
        <circle cx="40" cy="40" r="5" fill={paper} />
      </>;
    case 'lifedynamics':
      return <>
        <path d="M40 62V34m0 9c-14 0-20-9-18-18 11 0 18 6 18 18Zm0-8c0-11 8-17 18-17 1 10-6 17-18 17Z" fill={green} fillOpacity=".09" />
        <path d="M17 48a25 25 0 0 0 11 13m-11-13-2 8m2-8 7 3" stroke={gold} />
        <path d="M63 43a25 25 0 0 0-4-22m4 22 3-7m-3 7-7-3" stroke={water} />
      </>;
    case 'wuxing':
      return <>
        <path d="m40 17 23 17-9 27H26l-9-27Z" stroke={gold} />
        <path d="m40 17 14 44-37-27h46L26 61Z" opacity=".45" />
        <circle cx="40" cy="17" r="5" fill={green} stroke="none" />
        <circle cx="63" cy="34" r="5" fill={paper} stroke={gold} />
        <circle cx="54" cy="61" r="5" fill={gold} stroke="none" />
        <circle cx="26" cy="61" r="5" fill={paper} />
        <circle cx="17" cy="34" r="5" fill={water} stroke="none" />
      </>;
    case 'meridians':
      return <>
        <path d="M24 17c15 12-10 25 0 46" />
        <path d="M40 17c-10 13 12 27 0 46" stroke={gold} />
        <path d="M56 17c-15 12 10 25 0 46" stroke={water} />
        <circle cx="28" cy="29" r="4" fill={paper} />
        <circle cx="40" cy="45" r="4" fill={paper} stroke={gold} />
        <circle cx="55" cy="57" r="4" fill={paper} stroke={water} />
      </>;
    case 'pathomechanism':
      return <>
        <path d="M21 23h9c13 0 8 15 20 15h10M21 57h9c13 0 8-15 20-15h10" />
        <path d="M30 23c15 0 7 34 20 34h10" stroke={gold} strokeDasharray="3 5" />
        <circle cx="19" cy="23" r="5" fill={paper} />
        <circle cx="19" cy="57" r="5" fill={paper} />
        <circle cx="61" cy="40" r="5" fill={green} stroke="none" />
        <circle cx="61" cy="57" r="4" fill={paper} stroke={gold} />
      </>;
    case 'diagnosis':
      return <>
        <path d="M19 27v-7h7m28 0h7v7m0 26v7h-7m-28 0h-7v-7" stroke={gold} />
        <path d="M17 40s9-15 23-15 23 15 23 15-9 15-23 15S17 40 17 40Z" />
        <circle cx="40" cy="40" r="9" fill={water} fillOpacity=".16" />
        <circle cx="40" cy="40" r="3" fill={green} stroke="none" />
      </>;
    case 'treatment':
      return <>
        <path d="M40 19v43m-12 0h24M20 29h40" />
        <circle cx="40" cy="29" r="4" fill={paper} stroke={gold} />
        <path d="m23 30-9 19h18Zm34 0-9 19h18Z" stroke={gold} />
        <path d="M14 49a9 9 0 0 0 18 0M48 49a9 9 0 0 0 18 0" fill={green} fillOpacity=".12" />
      </>;
    case 'practice':
      return <>
        <circle cx="38" cy="29" r="7" />
        <path d="M24 55v-6a14 14 0 0 1 28 0v6Z" fill={green} fillOpacity=".1" />
        <path d="M24 18a26 26 0 0 0-6 38m-1-8 1 8 8-2M53 18a26 26 0 0 1 8 37m1-7-1 7-7-1" stroke={gold} />
        <path d="m33 63 4 4 9-9" stroke={water} />
      </>;
    default:
      return <>
        <path d="M40 28c-6-6-13-7-22-5v34c9-2 16-1 22 5 6-6 13-7 22-5V23c-9-2-16-1-22 5Zm0 0v34" fill={green} fillOpacity=".06" />
        <path d="M27 34c3 0 5 1 7 2m-7 9c3 0 5 1 7 2m12-11 7-3m-7 14 7-3" opacity=".6" />
        <path d="M40 11v7m-8-4 3 5m13-5-3 5" stroke={gold} />
      </>;
  }
}

/** Decorative chapter mark; the surrounding navigation supplies its visible label. */
export default function ChapterEmblem({ seriesId, className }: { seriesId?: string; className?: string }) {
  return (
    <svg viewBox="0 0 80 80" width="80" height="80" className={className} aria-hidden="true" focusable="false" fill="none" stroke={green} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="40" cy="40" r="37" stroke={gold} strokeOpacity=".23" />
      <Mark seriesId={seriesId} />
    </svg>
  );
}

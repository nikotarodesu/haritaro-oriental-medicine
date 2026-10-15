import type { ConceptIcon, ReadingFigure } from "@/types/reading";
import type { ReactNode } from "react";

function ConceptGlyph({ icon }: { icon: ConceptIcon }) {
  const paths: Record<ConceptIcon, ReactNode> = {
    balance: <><path d="M12 4v16M6 20h12M4 7h16M6 7l-3 6h6L6 7Zm12 0-3 6h6l-3-6Z" /><circle cx="12" cy="4" r="1" /></>,
    leaf: <><path d="M19 4C9 3 4 8 5 15c7 3 14-1 14-11Z" /><path d="M4 21 15 10M9 16v-5m0 5h5" /></>,
    drop: <><path d="M12 3C9 7 5 11 5 15a7 7 0 0 0 14 0c0-4-4-8-7-12Z" /><path d="M8 15a4 4 0 0 0 4 4" /></>,
    pulse: <><path d="M2 12h5l3-7 4 14 3-7h5" /></>,
    eye: <><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></>,
    book: <><path d="M12 6v15M12 6C9 4 5 4 2 5v14c3-1 7-1 10 2 3-3 7-3 10-2V5c-3-1-7-1-10 1Z" /><path d="M5 8h3M5 12h3m8-4h3m-3 4h3" /></>,
    flask: <><path d="M9 3h6M10 3v6L4 19c-1 2 0 2 2 2h12c2 0 3 0 2-2L14 9V3M7 15h10" /><circle cx="11" cy="17" r=".6" /></>,
    check: <><circle cx="12" cy="12" r="9" /><path d="m8 12 3 3 5-6" /></>,
    compass: <><circle cx="12" cy="12" r="9" /><path d="m15 9-2 4-4 2 2-4 4-2Z" /></>,
  };

  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {paths[icon]}
    </svg>
  );
}

function ReadingConnector({ directional }: { directional: boolean }) {
  return (
    <span className="flex justify-center py-2 text-[#8CA99B] dark:text-[#6C9683] sm:absolute sm:-right-5 sm:top-9 sm:z-10 sm:p-0" aria-hidden="true">
      <svg className="h-6 w-6 rotate-90 sm:rotate-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" focusable="false">
        <path d="M3 12h18" strokeDasharray={directional ? undefined : "2 3"} />
        {directional ? <path d="m16 7 5 5-5 5" /> : <><circle cx="3" cy="12" r="1.5" fill="currentColor" /><circle cx="21" cy="12" r="1.5" fill="currentColor" /></>}
      </svg>
    </span>
  );
}

/** Text remains HTML so labels can wrap and follow the reader's font-size setting. */
export default function InlineConceptFigure({ figure }: { figure: ReadingFigure }) {
  const titleId = `reading-figure-${figure.id}-title`;
  const captionId = `reading-figure-${figure.id}-caption`;
  const List = figure.layout === "steps" ? "ol" : "ul";
  const grid = figure.items.length === 2 || figure.items.length > 3 ? "sm:grid-cols-2" : "sm:grid-cols-3";

  return (
    <figure id={`reading-figure-${figure.id}`} aria-labelledby={titleId} aria-describedby={captionId} data-reading-figure={figure.id} className="not-prose my-8 scroll-mt-40 overflow-hidden rounded-2xl border border-[#D6E3DA] bg-linear-to-br from-[#F1F6F1] via-[#F8FAF6] to-[#FAF8F2] p-4 sm:my-10 sm:p-7 dark:border-[#304A3E] dark:from-[#162920] dark:via-[#182A24] dark:to-[#1C2A27]">
      <figcaption className="mb-4">
        <span className="mb-2 block text-sm font-medium tracking-[.12em] text-[#557465] dark:text-[#A2C8B4]">図で整理</span>
        <strong id={titleId} className="block text-lg font-bold leading-relaxed text-[#1E3D34] sm:text-xl dark:text-[#D9EDE0]">{figure.title}</strong>
      </figcaption>
      <List className={`grid gap-x-8 sm:gap-y-3 ${grid}`}>
        {figure.items.map((item, index) => (
          <li key={item.label} className="relative min-w-0">
            <div className="rounded-xl border border-[#DCE6DD] bg-white/80 p-3 sm:h-full sm:p-4 dark:border-[#375145] dark:bg-[#10221B]/55">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E9F1E8] text-[#3B6B52] dark:bg-[#2E4D3C] dark:text-[#B9D8C3]"><ConceptGlyph icon={item.icon} /></span>
                <strong className="min-w-0 text-base font-bold leading-relaxed text-[#244B3C] dark:text-[#E1EDE5]">{figure.layout === "steps" ? <span className="mr-2 text-sm font-semibold tabular-nums text-[#6A766C] dark:text-[#A8BCAF]">0{index + 1}</span> : null}{item.label}</strong>
              </div>
              <p className="mt-2 text-sm leading-[1.85] text-[#4D5C53] dark:text-[#B7CFC0]">{item.description}</p>
            </div>
            {index < figure.items.length - 1 ? figure.layout === "compare" ? <span className="block h-3 sm:hidden" aria-hidden="true" /> : <ReadingConnector directional={figure.layout === "steps"} /> : null}
          </li>
        ))}
      </List>
      <p id={captionId} className="mt-5 border-t border-[#D6E3DA] pt-4 text-sm leading-[1.85] text-[#536458] dark:border-[#375145] dark:text-[#B7CFC0]">{figure.caption}</p>
    </figure>
  );
}

import type { ConceptIcon, ReadingFigure } from "@/types/reading";
import type { ReactNode } from "react";

function ConceptGlyph({ icon, x, y }: { icon: ConceptIcon; x?: number; y?: number }) {
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
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 6v6l4 2" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M7 3v4m10-4v4M3 10h18m-14 4h2m3 0h2m-7 3h2" /></>,
    moon: <path d="M20.5 14.8A9 9 0 0 1 9.2 3.5a9 9 0 1 0 11.3 11.3Z" />,
    sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" /></>,
    steps: <><path d="M2 20h6v-5h6v-5h7" /><path d="M3 11 12 2M5 2h7v7" /></>,
    meal: <><path d="M5 3v5a3 3 0 0 0 6 0V3M8 3v18m12 0V3c-4 2-5 6-5 10h5" /></>,
  };

  return (
    <svg x={x} y={y} viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {paths[icon]}
    </svg>
  );
}

function FigureGraphic({ graphic, items }: { graphic: NonNullable<ReadingFigure["graphic"]>; items: ReadingFigure["items"] }) {
  if (typeof graphic !== "string") {
    return (
      <>
        <ul className="grid gap-4" role="list">
          {items.map(({ label, description }, index) => {
            const value = graphic.values[index];
            return (
              <li key={label}>
                <div className="flex flex-wrap justify-between gap-x-3 text-sm"><strong>{label}</strong><span className="font-semibold tabular-nums text-accent">{value} {graphic.unit}</span></div>
                <svg className="my-1 block h-3 w-full overflow-hidden rounded-sm bg-panel-selected" viewBox="0 0 100 8" preserveAspectRatio="none" aria-hidden="true" focusable="false">
                  <rect width={value / graphic.maximum * 100} height="8" className="fill-accent" />
                </svg>
                {description && <p className="text-sm leading-relaxed text-muted">{description}</p>}
              </li>
            );
          })}
        </ul>
        <div className="mt-3 flex justify-between border-t border-frame pt-1 text-xs tabular-nums text-muted" aria-hidden="true"><span>0</span><span>{graphic.maximum}</span></div>
      </>
    );
  }

  const trackWidth = 360;
  const positions = items.map((_, index) => trackWidth * (index + 0.5) / items.length);
  const List = graphic === "comparison" ? "ul" : "ol";
  return (
    <>
      <svg viewBox={`0 0 ${trackWidth} 82`} className="block w-full text-accent" aria-hidden="true" focusable="false">
        <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          {graphic === "comparison" && (
            <path d={`M${positions[0]} 26V12H${positions.at(-1)}V26 ${positions.slice(1, -1).map(x => `M${x} 12V26`).join(" ")}`} />
          )}
          {graphic === "flow" && positions.slice(0, -1).map((x, index) => {
            const end = positions[index + 1] - 24;
            return <path key={x} d={`M${x + 22} 48H${end}m-6-5 6 5-6 5`} />;
          })}
          {graphic === "timeline" && (
            <>
              <path d="M10 72H350" strokeDasharray="4 5" />
              {positions.map(x => <path key={x} d={`M${x} 67V77`} />)}
            </>
          )}
          {items.map(({ label, icon }, index) => (
            <g key={label}>
              <circle cx={positions[index]} cy="48" r="20" className="fill-panel-selected" />
              <ConceptGlyph icon={icon} x={positions[index] - 12} y={36} />
            </g>
          ))}
        </g>
      </svg>
      <List className="grid gap-2 sm:gap-4" role="list" style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}>
        {items.map(({ label, description }) => (
          <li key={label} className="min-w-0 border-t border-frame pt-2 [overflow-wrap:anywhere]">
            <strong className="block text-sm leading-snug text-ink sm:text-base">{label}</strong>
            <p className="mt-1 text-sm leading-relaxed text-muted">{description}</p>
          </li>
        ))}
      </List>
    </>
  );
}

function ReadingConnector({ directional }: { directional: boolean }) {
  return (
    <span className="flex justify-center py-2 text-accent sm:absolute sm:-right-5 sm:top-9 sm:z-10 sm:p-0" aria-hidden="true">
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
  const simpleComparison = figure.layout === "compare" && figure.items.length === 2;
  const grid = figure.items.length === 2 || figure.items.length > 3 ? "sm:grid-cols-2" : "sm:grid-cols-3";

  return (
    <figure id={`reading-figure-${figure.id}`} aria-labelledby={titleId} aria-describedby={captionId} data-reading-figure={figure.id} data-reading-graphic={typeof figure.graphic === "string" ? figure.graphic : figure.graphic?.kind} className="not-prose my-8 scroll-mt-32 overflow-hidden rounded-xl border border-frame bg-page p-4 sm:p-6">
      <figcaption className="mb-4">
        <strong id={titleId} className="block font-serif text-lg leading-relaxed font-semibold text-ink sm:text-xl">{figure.title}</strong>
      </figcaption>
      {figure.graphic ? <FigureGraphic graphic={figure.graphic} items={figure.items} /> : <List className={`grid ${simpleComparison ? "grid-cols-2 gap-2 sm:gap-4" : `gap-x-8 sm:gap-y-3 ${grid}`}`}>
        {figure.items.map((item, index) => (
          <li key={item.label} className="relative min-w-0">
            <div className={`rounded-lg border border-frame bg-panel sm:p-4 ${simpleComparison ? "h-full px-2.5 py-3" : "p-3 sm:h-full"}`}>
              <div className={simpleComparison ? "grid gap-1.5 sm:flex sm:items-center sm:gap-3" : "flex items-center gap-3"}>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-panel-selected text-accent"><ConceptGlyph icon={item.icon} /></span>
                <strong className="min-w-0 text-base leading-relaxed font-semibold">{figure.layout === "steps" ? <span className="mr-2 text-sm font-semibold text-muted tabular-nums">{index + 1}.</span> : null}{item.label}</strong>
              </div>
              <p className="mt-2 text-sm leading-[1.85] text-muted">{item.description}</p>
            </div>
            {index < figure.items.length - 1 && (
              figure.layout !== "compare" ? <ReadingConnector directional={figure.layout === "steps"} /> :
                !simpleComparison && <span className="block h-3 sm:hidden" aria-hidden="true" />
            )}
          </li>
        ))}
      </List>}
      {figure.exercise && (
        <div className="mt-4 border-t border-frame pt-4">
          <p className="text-base leading-relaxed font-semibold">{figure.exercise.prompt}</p>
          <details data-reading-exercise={figure.id} className="mt-2 text-sm leading-[1.85] text-muted">
            <summary className="min-h-11 cursor-pointer py-2 font-semibold underline underline-offset-4">考え方を確認する</summary>
            <p className="pb-2">{figure.exercise.answer}</p>
          </details>
        </div>
      )}
      <p id={captionId} className="mt-5 border-t border-frame pt-4 text-sm leading-[1.85] text-muted">{figure.caption}</p>
    </figure>
  );
}

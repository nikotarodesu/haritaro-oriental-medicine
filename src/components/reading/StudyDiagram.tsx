import type { LectureDiagram } from "@/data/publicLectures/diagrams/types";

function DiagramConnector({ directional, className }: { directional: boolean; className?: string }) {
  return (
    <svg className={className} width="28" height="16" viewBox="0 0 28 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d="M3 8h22" />
      {directional ? <path d="m20 3 5 5-5 5" /> : <path d="M3 5v6m22-6v6" />}
    </svg>
  );
}

export default function StudyDiagram({ diagram, id }: { diagram: LectureDiagram; id: string }) {
  const titleId = `${id}-title`;
  const noteId = diagram.note ? `${id}-note` : undefined;
  const List = diagram.layout === "flow" ? "ol" : "ul";

  return (
    <figure id={id} className="study-diagram" aria-labelledby={titleId} aria-describedby={noteId} data-study-diagram={diagram.layout}>
      <figcaption id={titleId}>{diagram.title}</figcaption>
      {diagram.layout === "relations" ? (
        <ul className="study-diagram-relations" role="list">
          {diagram.items.map(([from, to, label]) => (
            <li key={`${from}-${to}-${label ?? ""}`}>
              <span className="study-diagram-term">{from}</span>
              <span className="study-diagram-relation">
                {label && <span>{label}</span>}
                <DiagramConnector directional={diagram.directional === true} />
              </span>
              <span className="study-diagram-term">{to}</span>
            </li>
          ))}
        </ul>
      ) : (
        <List className="study-diagram-points" role="list">
          {diagram.items.map(([label, explanation], index) => (
            <li key={label}>
              <div className="study-diagram-point">
                {diagram.layout === "compare" && (
                  <svg width="12" height="20" viewBox="0 0 12 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true" focusable="false">
                    <path d="M2 3v14m0-7h7" />
                  </svg>
                )}
                <strong>{label}</strong>
                <span>{explanation}</span>
              </div>
              {diagram.layout === "flow" && index < diagram.items.length - 1 && (
                <DiagramConnector directional className="study-diagram-flow-arrow" />
              )}
            </li>
          ))}
        </List>
      )}
      {diagram.note && <p id={noteId} className="study-diagram-note">{diagram.note}</p>}
    </figure>
  );
}

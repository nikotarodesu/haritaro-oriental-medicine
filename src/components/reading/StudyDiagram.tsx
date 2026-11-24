import { CloudRain, Ear, Eye, Footprints, Hand, MessageCircle, Moon, Sun, Sunrise } from "lucide-react";
import type { LectureDiagram } from "@/data/publicLectures/diagrams/types";
import StudyDiagramArtwork from "./StudyDiagramArtwork";

const pointIcons = { sun: Sun, footprints: Footprints, rain: CloudRain, moon: Moon, sunrise: Sunrise, eye: Eye, ear: Ear, speech: MessageCircle, hand: Hand };

function DiagramConnector({ directional, className }: { directional: boolean; className?: string }) {
  return (
    <svg className={className} width="28" height="16" viewBox="0 0 28 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d="M3 8h22" />
      {directional ? <path d="m20 3 5 5-5 5" /> : <path d="M3 5v6m22-6v6" />}
    </svg>
  );
}

function DiagramMatrix({ diagram }: { diagram: Extract<LectureDiagram, { layout: "matrix" }> }) {
  return (
    <table className="study-diagram-matrix">
      <thead>
        <tr>
          <td />
          {diagram.columns.map(label => <th key={label} scope="col">{label}</th>)}
        </tr>
      </thead>
      <tbody>
        {diagram.rows.map(({ label, cells }) => (
          <tr key={label}>
            <th scope="row">{label}</th>
            {cells.map((cell, index) => (
              <td key={diagram.columns[index]}>
                {typeof cell === "string" ? cell : (
                  <span className="study-diagram-matrix-chips">
                    {cell.map(({ label: chip, tone }) => (
                      <span key={chip} className="study-diagram-chip" data-tone={tone}>{chip}</span>
                    ))}
                  </span>
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function DiagramBars({ rows }: { rows: Extract<LectureDiagram, { layout: "bars" }>["rows"] }) {
  return (
    <>
      <ul className="study-diagram-bars" role="list">
        {rows.map(({ label, percent }) => (
          <li key={label}>
            <strong>{label}</strong><span>{percent.toFixed(1)}%</span>
            <div className="study-diagram-bar-track" aria-hidden="true">
              <div style={{ width: `${percent}%` }} />
            </div>
          </li>
        ))}
      </ul>
      <div className="study-diagram-bar-axis" aria-hidden="true"><span>0%</span><span>50%</span><span>100%</span></div>
    </>
  );
}

export default function StudyDiagram({ diagram, id }: { diagram: LectureDiagram; id: string }) {
  const titleId = `${id}-title`;
  const noteId = diagram.note ? `${id}-note` : undefined;
  const List = diagram.layout === "flow" ? "ol" : "ul";

  return (
    <figure id={id} className="study-diagram" aria-labelledby={titleId} aria-describedby={noteId} data-study-diagram={diagram.layout}>
      <figcaption id={titleId}>{diagram.title}</figcaption>
      {diagram.illustration && <StudyDiagramArtwork kind={diagram.illustration} id={id} />}
      {diagram.layout === "bars" ? (
        <DiagramBars rows={diagram.rows} />
      ) : diagram.layout === "matrix" ? (
        <DiagramMatrix diagram={diagram} />
      ) : diagram.layout === "relations" ? (
        <ul className={diagram.illustration ? "sr-only" : "study-diagram-relations"} role="list">
          {diagram.items.map(([from, to, label]) => (
            <li key={`${from}-${to}-${label ?? ""}`}>
              <span className="study-diagram-term">{from}</span>
              <span className="study-diagram-relation">
                {label && <span>{label}</span>}
                <DiagramConnector directional={diagram.directional === true} className="study-diagram-relation-connector" />
              </span>
              <span className="study-diagram-term">{to}</span>
            </li>
          ))}
        </ul>
      ) : (
        <List className="study-diagram-points" role="list">
          {diagram.items.map(([label, explanation, icon], index) => {
            const Icon = icon && pointIcons[icon];
            return (
              <li key={label}>
                <div className="study-diagram-point">
                  {Icon ? <Icon className="study-diagram-point-icon" aria-hidden="true" /> : diagram.layout === "compare" && (
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
            );
          })}
        </List>
      )}
      {diagram.note && <p id={noteId} className="study-diagram-note">{diagram.note}</p>}
    </figure>
  );
}

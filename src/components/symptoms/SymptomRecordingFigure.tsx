import type { RecordingChange, SymptomRecordingExample } from "./recordingFigureTypes";

type TimelineExample = Extract<SymptomRecordingExample, { layout: "flow" }>;
type ComparisonExample = Extract<SymptomRecordingExample, { layout: "matrix" }>;
type StairsExample = Extract<SymptomRecordingExample, { layout: "compare" }>;

const eventMarks = ["M-5 0a5 5 0 1 0 10 0a5 5 0 1 0-10 0Z", "M-5-5H5V5H-5Z", "M0-6 6 0 0 6-6 0Z"];

function RecordingTimeline({ items, offsets }: TimelineExample) {
  const start = 22;
  const length = 312;
  const lastOffset = offsets?.at(-1);

  return (
    <>
      <svg className="symptoms-recording-axis" viewBox="0 0 360 32" aria-hidden="true" focusable="false" data-recording-scale={lastOffset ? "interval" : "sequence"}>
        <path d="M14 16H348m-6-5 6 5-6 5" className="symptoms-recording-axis-line" />
        {items.map(([label], index) => {
          const fraction = offsets && lastOffset ? offsets[index] / lastOffset : index / (items.length - 1);
          const x = start + length * fraction;
          return <path key={label} className="symptoms-recording-event-mark" d={eventMarks[index]} transform={`translate(${x} 16)`} />;
        })}
      </svg>
      <ol className="symptoms-recording-events" role="list">
        {items.map(([label, observation], index) => (
          <li key={label}>
            <strong>
              <svg viewBox="0 0 18 18" className="symptoms-recording-key-mark" aria-hidden="true" focusable="false">
                <path d={eventMarks[index]} transform="translate(9 9)" className="symptoms-recording-event-mark" />
              </svg>
              {label}
            </strong>
            <span>{observation}</span>
          </li>
        ))}
      </ol>
    </>
  );
}

function ChangeMark({ change }: { change: RecordingChange }) {
  return (
    <svg className="symptoms-recording-change-mark" viewBox="0 0 24 22" data-change={change} aria-hidden="true" focusable="false">
      {change === "eased" ? <path d="m4 5 15 12m-7 0h7v-7" /> : <path d="M4 11h15m-5-5 5 5-5 5" />}
    </svg>
  );
}

function RecordingComparison({ columns: [start, end], rows }: ComparisonExample) {
  return (
    <table className="study-diagram-matrix symptoms-recording-matrix">
      <thead>
        <tr><td /><th scope="col">{start}</th><th scope="col">{end}</th></tr>
      </thead>
      <tbody>
        {rows.map(({ label, cells: [before, after], change }) => (
          <tr key={label}>
            <th scope="row">{label}</th>
            <td>{before}</td>
            <td><div className="symptoms-recording-change"><ChangeMark change={change} /><span>{after}</span></div></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function StairsComparison({ items }: StairsExample) {
  return (
    <ul className="symptoms-recording-stairs" role="list">
      {items.map(([label, observation], index) => (
        <li key={label}>
          <svg viewBox="0 0 124 86" className="symptoms-recording-stair-profile" aria-hidden="true" focusable="false">
            <path className="symptoms-recording-stair-steps" d="M8 77H33V65H55V53H77V41H99V29H116" />
            <path className="symptoms-recording-stair-arrow" d={index === 0 ? "M25 53l66-37m-11-2 11 2-5 9" : "M91 16 25 53m5-10-5 10 11 1"} />
          </svg>
          <strong>{label}</strong>
          <span>{observation}</span>
        </li>
      ))}
    </ul>
  );
}

export default function SymptomRecordingFigure({ diagram }: { diagram: SymptomRecordingExample }) {
  const figureKind = diagram.layout === "flow" ? "timeline" : diagram.layout === "matrix" ? "comparison" : diagram.mode;
  const timingNote = diagram.layout === "flow" ? (
    diagram.offsets ? "点の間隔は、記録した時刻や日付の差を表します。" : "点は出来事の順に並べています。"
  ) : undefined;
  const note = [diagram.note, timingNote].filter(Boolean).join(" ");

  return (
    <figure id="recording-example" className="study-diagram symptoms-recording-figure" data-symptom-recording={figureKind} aria-labelledby="recording-example-title" aria-describedby={note ? "recording-example-note" : undefined}>
      <figcaption id="recording-example-title">{diagram.title}</figcaption>
      {diagram.layout === "flow" ? <RecordingTimeline {...diagram} /> : diagram.layout === "matrix" ? <RecordingComparison {...diagram} /> : <StairsComparison {...diagram} />}
      {note && <p id="recording-example-note" className="study-diagram-note">{note}</p>}
    </figure>
  );
}

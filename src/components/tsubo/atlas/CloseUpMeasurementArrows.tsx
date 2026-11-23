import type { CloseUpMeasurement } from "@/data/tsubo/atlas/closeUpMeasurements";

const markerLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const diagramWidth = 340;
const diagramHeight = 300;
const labelMargin = 5;

function labelWidth(token: string) {
  // Allow for the 11-unit letter and space, followed by the 16-unit distance.
  // The margin reserves room for the text's outline and font fallback.
  return 13 + [...token].reduce((width, character) => {
    const advance = character === "." ? 5 : /[0-9]/.test(character) ? 10 : 16;
    return width + advance;
  }, 0);
}

function rulerEndpoints({ origin, destination, rail }: CloseUpMeasurement) {
  if (rail?.axis === "vertical") return [[rail.lane, origin[1]], [rail.lane, destination[1]]];
  if (rail?.axis === "horizontal") return [[origin[0], rail.lane], [destination[0], rail.lane]];
  if (rail?.axis === "parallel") {
    const [dx, dy] = rail.shift;
    return [[origin[0] + dx, origin[1] + dy], [destination[0] + dx, destination[1] + dy]];
  }
  return [origin, destination];
}

function MeasurementArrow({ measurement, letter }: { measurement: CloseUpMeasurement; letter: string }) {
  const { origin, destination, rail, label, measure, alternative } = measurement;
  const [from, to] = rulerEndpoints(measurement);
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  const length = Math.hypot(dx, dy);
  const angle = Math.atan2(dy, dx) * 180 / Math.PI;
  const arrowLength = Math.min(6, length * .34);
  const arrowWidth = Math.min(4, length * .21);
  const step = measure.unit === "指寸" ? .1 : 1;
  const ticks = Array.from({ length: Math.ceil(measure.amount / step) }, (_, index) => {
    const x = length * index * step / measure.amount;
    return `M${x} -4v8`;
  }).join("");
  const ends = `M${length - arrowLength} -${arrowWidth}L${length} 0L${length - arrowLength} ${arrowWidth}`;
  const isVertical = rail?.axis === "vertical";
  const textBefore = rail?.axis === "vertical" && (rail.labelSide === "before" || (rail.labelSide !== "after" && rail.lane > 9 + measure.token.length * 12));
  const textAnchor = isVertical ? (textBefore ? "end" : "start") : "middle";
  const preferredX = label?.[0] ?? (from[0] + to[0]) / 2 + (isVertical ? (textBefore ? -9 : 9) : 0);
  const preferredY = label?.[1] ?? (from[1] + to[1]) / 2 - (isVertical ? 0 : 10);
  const width = labelWidth(measure.token);
  const widthBefore = textAnchor === "end" ? width : textAnchor === "middle" ? width / 2 : 0;
  const labelX = Math.min(diagramWidth - labelMargin - (width - widthBefore), Math.max(labelMargin + widthBefore, preferredX));
  const labelY = Math.min(diagramHeight - 14, Math.max(14, preferredY));
  const leaders = `M${origin.join(" ")}L${from.join(" ")}M${destination.join(" ")}L${to.join(" ")}`;
  const [targetX, targetY] = destination;

  return (
    <g data-close-up-measure={measure.token} data-measure-from={measure.start} data-measure-letter={letter}>
      <path className="atlas-dimension-leader" d={leaders} />
      <g transform={`translate(${from.join(" ")}) rotate(${angle})`}>
        <path className="atlas-dimension-halo" d={`M0 0H${length}${ticks}${ends}`} />
        <path className="atlas-dimension-stroke" d={`M0 0H${length}${ticks}${ends}`} />
      </g>
      <circle className="atlas-dimension-origin" cx={origin[0]} cy={origin[1]} r="3.5" />
      {alternative && <path className="atlas-dimension-alternative" d={`M${targetX} ${targetY - 6}l6 6-6 6-6-6Z`} />}
      <text className="atlas-dimension-text" x={labelX} y={labelY} textAnchor={textAnchor} dominantBaseline="central">
        <tspan fontSize="11" fontWeight="700">{letter} </tspan>{measure.token}
      </text>
    </g>
  );
}

export default function CloseUpMeasurementArrows({ measurements }: { measurements: readonly CloseUpMeasurement[] }) {
  return (
    <g className="atlas-dimension-overlay" aria-hidden="true">
      {measurements.map((measurement, index) => (
        <MeasurementArrow key={index} measurement={measurement} letter={markerLetters[index]} />
      ))}
    </g>
  );
}

export function CloseUpMeasurementKey({ measurements }: { measurements: readonly CloseUpMeasurement[] }) {
  return (
    <ol className="atlas-dimension-key" aria-label="拡大図の矢印と目盛り">
      {measurements.map(({ measure, originLabel, alternative, condition, level }, index) => (
        <li key={index}>
          <span className="atlas-dimension-key-letter">{markerLetters[index]}</span>
          <span className="atlas-dimension-key-location">
            <strong>{originLabel}</strong>
            {level && <span>{level}の高さ</span>}
            {(alternative || condition) && <span>{condition ?? "WHOの代替位置"}</span>}
          </span>
          <span className="atlas-dimension-key-value">{measure.direction} <strong>{measure.token}</strong></span>
        </li>
      ))}
    </ol>
  );
}

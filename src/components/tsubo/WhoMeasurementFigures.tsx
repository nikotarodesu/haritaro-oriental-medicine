import type { WhoMeasurement } from "@/data/tsubo/atlas/whoMeasurements";
import CunRuler from "./CunRuler";

export default function WhoMeasurementFigures({ measures, pointName }: {
  measures: readonly WhoMeasurement[];
  pointName: string;
}) {
  if (!measures.length) return null;

  return (
    <ul className="cun-point-measures" aria-label="位置の距離を示す図">
      {measures.map(({ token, amount, unit, start, direction, span, position }) => {
        const total = span?.[1] ?? (unit === "指寸" ? 1 : amount);
        const end = span?.[0] ?? (unit === "指寸" ? "1指寸" : pointName);
        return (
          <li key={position} className="cun-point-measure" data-cun-measure={token}>
            <p className="cun-measure-value">
              <strong>{token}</strong>
              <span>{direction}</span>
            </p>
            <CunRuler span={total} amount={amount} step={unit === "指寸" ? 0.1 : 1} />
            <div className="cun-scale-labels">
              <span>{start}</span>
              <span>{end}{span && <small>{total}寸</small>}</span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

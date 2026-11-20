import Link from "next/link";
import { WHO_ATLAS_PDF, whoAtlasPages } from "@/data/tsubo/atlas/whoAtlasPages";
import { whoLocations, whoLocationNotes } from "@/data/tsubo/atlas/whoLocations";
import { getWhoMeasurements, measurementUnits } from "@/data/tsubo/atlas/whoMeasurements";
import WhoMeasurementFigures from "./WhoMeasurementFigures";

const guide = "/tsubo/basics/bone-cun";

export default function WhoPointLocation({ code, pointName }: { code: string; pointName: string }) {
  const location = whoLocations[code];
  const page = whoAtlasPages[code];
  if (!location || !page) return null;

  const note = whoLocationNotes[code];
  const measures = getWhoMeasurements(code, location);
  const noteMeasures = note ? getWhoMeasurements(code, note) : [];
  const usedUnits = new Set([...measures, ...noteMeasures].map(({ unit }) => unit));

  return (
    <section id="acupoint-who-location" className="atlas-who-location cun-guide-target">
      <h3>WHO標準の位置 <span>日本語要約</span></h3>
      <p>{location}</p>
      <WhoMeasurementFigures measures={measures} pointName={pointName} />
      {note && <p className="atlas-who-note">{note}</p>}
      <WhoMeasurementFigures measures={noteMeasures} pointName={pointName} />
      <div className="atlas-directory-actions">
        <a href="#acupoint-diagram" className="atlas-text-action">{usedUnits.size > 0 ? "拡大図で起点を見る" : "拡大図で目印を見る"}</a>
        {usedUnits.size > 0
          ? Array.from(usedUnits, (unit) => {
              const { anchor, guide: label } = measurementUnits[unit];
              return <Link key={unit} className="atlas-text-action" href={guide + anchor}>{label}</Link>;
            })
          : <Link className="atlas-text-action" href={guide}>寸・指幅の測り方</Link>}
        <a className="atlas-text-action" href={`${WHO_ATLAS_PDF}#page=${page}`}>WHO原本 p.{page - 9}（PDF）</a>
        {code === "gv27" && <a className="atlas-text-action" href="https://www.idononippon.com/book/errata/3419/">日本語公式版の正誤表</a>}
      </div>
    </section>
  );
}

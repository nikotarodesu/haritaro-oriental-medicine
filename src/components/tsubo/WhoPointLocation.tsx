import Link from "next/link";
import { WHO_ATLAS_CATALOG, WHO_ATLAS_PDF, whoAtlasPages } from "@/data/tsubo/atlas/whoAtlasPages";
import { whoLocations, whoLocationNotes } from "@/data/tsubo/atlas/whoLocations";
import { getWhoMeasurements, measurementUnits } from "@/data/tsubo/atlas/whoMeasurements";
import WhoMeasurementFigures from "./WhoMeasurementFigures";

const guide = "/tsubo/basics/bone-cun";
const recentSourceChecks = new Set(["lu7", "li4", "st36", "bl40", "cv24"]);
const sourceCheckedAt = "2026-11-25";

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
      {usedUnits.has("寸") && <p className="text-sm">ここでの「寸」は、骨の端やしわの間を等分して数える単位です。</p>}
      <p>{location}</p>
      <WhoMeasurementFigures measures={measures} pointName={pointName} />
      {note && <p className="atlas-who-note">{note}</p>}
      <WhoMeasurementFigures measures={noteMeasures} pointName={pointName} />
      <div className="atlas-directory-actions">
        {usedUnits.size > 0 && <a href="#acupoint-diagram" className="atlas-text-action">拡大図で起点を見る</a>}
        {usedUnits.size > 0
          ? Array.from(usedUnits, (unit) => {
              const { anchor, guide: label } = measurementUnits[unit];
              return <Link key={unit} className="atlas-text-action" href={guide + anchor}>{label}</Link>;
            })
          : <Link className="atlas-text-action" href={guide}>寸・指幅の測り方</Link>}
        {code === "gv27" && <a className="atlas-text-action" href="https://www.idononippon.com/book/errata/3419/">日本語公式版の正誤表</a>}
      </div>
      <p className="text-sm">
        位置の出典は WHO西太平洋地域事務局『WHO標準経穴部位』（2008年、2009年改訂再版）です。{" "}
        <a className="atlas-source-link" href={`${WHO_ATLAS_PDF}#page=${page}`}>WHO原本 p.{page - 9}（PDF）</a>{" "}
        <a className="atlas-source-link" href={WHO_ATLAS_CATALOG}>WHOの書誌情報</a>
        {recentSourceChecks.has(code) && <>（該当ページ照合 <time dateTime={sourceCheckedAt}>{sourceCheckedAt}</time>）</>}
      </p>
    </section>
  );
}

import Link from "next/link";
import { WHO_ATLAS_PDF, whoAtlasPages } from "@/data/tsubo/atlas/whoAtlasPages";
import { whoLocations, whoLocationNotes } from "@/data/tsubo/atlas/whoLocations";

const guide = "/tsubo/basics/bone-cun";

export default function WhoPointLocation({ code }: { code: string }) {
  const location = whoLocations[code];
  const page = whoAtlasPages[code];
  if (!location || !page) return null;

  const note = whoLocationNotes[code];
  const wording = note ? `${location} ${note}` : location;
  const guideLinks = [
    { used: /\d寸/.test(wording), anchor: "#bone-cun-table", label: "寸（骨度法）の測り方" },
    { used: /\d指寸/.test(wording), anchor: "#finger-cun", label: "指寸の測り方" },
    { used: /\d指幅/.test(wording), anchor: "#fingerbreadth", label: "指幅の測り方" },
  ].filter(({ used }) => used);

  return (
    <section id="acupoint-who-location" className="atlas-who-location cun-guide-target">
      <h3>WHO標準の位置 <span>日本語要約</span></h3>
      <p>{location}</p>
      {note && <p className="atlas-who-note">{note}</p>}
      <div className="atlas-directory-actions">
        {guideLinks.length > 0
          ? guideLinks.map(({ anchor, label }) => <Link key={anchor} className="atlas-text-action" href={guide + anchor}>{label}</Link>)
          : <Link className="atlas-text-action" href={guide}>寸・指幅の測り方</Link>}
        <a className="atlas-text-action" href={`${WHO_ATLAS_PDF}#page=${page}`}>WHO原本 p.{page - 9}（PDF）</a>
        {code === "gv27" && <a className="atlas-text-action" href="https://www.idononippon.com/book/errata/3419/">日本語公式版の正誤表</a>}
      </div>
    </section>
  );
}

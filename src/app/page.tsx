import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PlatformSearchForm from "@/components/search/PlatformSearchForm";
import { PageSymbol, type PageArtKind } from "@/components/design/PageArtwork";
import HeguHandDiagram from "@/components/tsubo/atlas/HeguHandDiagram";
import FootDorsumRegion from "@/components/tsubo/atlas/FootDorsumRegion";
import LowerLegRegion from "@/components/tsubo/atlas/LowerLegRegion";
import VolarForearmRegion from "@/components/tsubo/atlas/VolarForearmRegion";
import { ATLAS_POINT_MARKERS } from "@/data/tsubo/atlas/markers";
import { ACUPUNCTURE_GUIDE } from "@/config/acupunctureLearning";
import { collectionPageJsonLd, HOME_HEADING } from "@/config/seo";
import { DICTIONARY_TAGLINE, PLATFORM_DESCRIPTION, SERIES } from "@/config/series";

const SERIES_ENTRIES = Object.values(SERIES);
const SERIES_ACTIONS = {
  "/tsubo": { label: "ツボを調べる", analytics: "home_atlas", art: "points", links: [SERIES.dictionary.links[1], ACUPUNCTURE_GUIDE] },
  "/learn": { label: "講義を読む", analytics: "home_reading", art: "study", links: [SERIES.reading.links[0]] },
  "/clinical": { label: "症例で練習する", analytics: "home_clinical", art: "practice", links: SERIES.practice.links },
} satisfies Record<(typeof SERIES_ENTRIES)[number]["href"], {
  label: string; analytics: string; art: PageArtKind; links: ReadonlyArray<{ href: string; label: string }>;
}>;
const POINTS = [
  { code: "li4", label: "合谷", location: "手の甲", art: <HeguHandDiagram thumbnail /> },
  { code: "st36", label: "足三里", location: "ひざの下", art: pointThumbnail("st36", "足三里", LowerLegRegion) },
  { code: "pc6", label: "内関", location: "手首の近く", art: pointThumbnail("pc6", "内関", VolarForearmRegion) },
  { code: "lr3", label: "太衝", location: "足の甲", art: pointThumbnail("lr3", "太衝", FootDorsumRegion) },
];

function pointThumbnail(code: string, label: string, Diagram: typeof LowerLegRegion) {
  const marker = ATLAS_POINT_MARKERS[code];
  if (!marker) return null;
  return (
    <svg viewBox="0 0 340 300" aria-hidden="true" focusable="false">
      <Diagram marker={marker} label={label} labelled measured />
      <circle cx={marker.x} cy={marker.y} r="7" fill="#7F3520" stroke="#FFF9F0" strokeWidth="2.5" />
    </svg>
  );
}

export default function HomePage() {
  return (
    <div className="platform-home">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: collectionPageJsonLd("/", HOME_HEADING, PLATFORM_DESCRIPTION, "目的から探す", SERIES_ENTRIES) }} />
      <section className="platform-container platform-intro" aria-labelledby="platform-title">
        <div className="platform-hero-grid">
          <div className="platform-hero-copy">
            <div className="platform-hero-heading">
              <h1 id="platform-title" className="platform-title">{HOME_HEADING}</h1>
              <p className="platform-intro-text">{PLATFORM_DESCRIPTION}</p>
            </div>
            <PlatformSearchForm placeholder="合谷、肩こり、陰陽" />
            <Link href={SERIES.dictionary.href} className="platform-dictionary-intro">
              <span>
                <span>{SERIES.dictionary.name}</span>
                <strong>{DICTIONARY_TAGLINE}</strong>
              </span>
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          <Link href="/tsubo/li4" className="platform-feature" aria-labelledby="platform-feature-name platform-feature-action">
            <span className="platform-feature-art"><HeguHandDiagram thumbnail /></span>
            <span className="platform-feature-copy">
              <span className="platform-feature-meta"><span>LI4</span> 手の甲</span>
              <strong id="platform-feature-name" className="platform-feature-name">合谷<span>ごうこく</span></strong>
              <span id="platform-feature-action" className="platform-feature-link">場所と注意点 <ArrowRight aria-hidden="true" /></span>
            </span>
          </Link>
        </div>
      </section>

      <section className="platform-container platform-series" aria-labelledby="platform-series-title">
        <h2 id="platform-series-title">目的から探す</h2>
        <ul className="platform-series-grid">
          {SERIES_ENTRIES.map(series => {
            const action = SERIES_ACTIONS[series.href];
            return (
              <li key={series.href} className="platform-series-card">
                <h3>
                  <Link href={series.href} className="platform-series-action" data-analytics-action={action.analytics} title={series.name}>
                    <span className="platform-series-icon"><PageSymbol kind={action.art} /></span>
                    <span className="platform-series-label">{action.label}</span>
                    <ArrowRight aria-hidden="true" />
                  </Link>
                </h3>
                <div className="platform-topic-links">
                  {action.links.map(({ href, label }) => <Link key={href} href={href} className="ui-text-link">{label}</Link>)}
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="platform-container platform-index" aria-labelledby="platform-index-title">
        <h2 id="platform-index-title">図で見る、身近なツボ</h2>
        <ul>
          {POINTS.map(point => (
            <li key={point.code}>
              <Link href={`/tsubo/${point.code}`}>
                <span className="platform-point-art" aria-hidden="true">{point.art}</span>
                <span className="platform-point-location">{point.location}</span>
                <strong>{point.label}</strong>
                <ArrowRight aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

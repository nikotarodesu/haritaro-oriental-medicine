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
import { PLATFORM_DESCRIPTION, SERIES } from "@/config/series";

const SERIES_ENTRIES = Object.values(SERIES);
const SERIES_ACTIONS = {
  "/tsubo": { label: "ツボを調べる", description: "位置と目印を図で確認", analytics: "home_atlas", art: "points" },
  "/learn": { label: "講義を読む", description: "陰陽などの基本から", analytics: "home_reading", art: "study" },
  "/clinical": { label: "症例で練習する", description: "架空の相談で考える", analytics: "home_clinical", art: "practice" },
} satisfies Record<(typeof SERIES_ENTRIES)[number]["href"], {
  label: string; description: string; analytics: string; art: PageArtKind;
}>;
const POINTS = [
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
          </div>
          <nav className="platform-series" aria-labelledby="platform-series-title">
            <h2 id="platform-series-title" className="sr-only">目的から探す</h2>
            <ul className="platform-series-grid">
              {SERIES_ENTRIES.map(({ href }) => {
                const { label, description, analytics, art } = SERIES_ACTIONS[href];
                return (
                  <li key={href} className="platform-series-card">
                    <h3>
                      <Link href={href} className="platform-series-action" data-analytics-action={analytics}>
                        <span className="platform-series-icon" aria-hidden="true"><PageSymbol kind={art} /></span>
                        <span className="platform-series-label">{label}</span>
                        <ArrowRight aria-hidden="true" />
                      </Link>
                    </h3>
                    <p>{description}</p>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="platform-home-resources">
            <Link href="/symptoms" className="ui-text-link">症状から受診の目安を探す <ArrowRight size={16} aria-hidden="true" /></Link>
            <Link href={ACUPUNCTURE_GUIDE.href} className="ui-text-link">{ACUPUNCTURE_GUIDE.label}</Link>
          </div>
          <Link href="/tsubo/li4#acupoint-location" className="platform-feature" aria-labelledby="platform-feature-name platform-feature-action">
            <span className="platform-feature-art"><HeguHandDiagram thumbnail /></span>
            <span className="platform-feature-copy">
              <span className="platform-feature-meta"><span>LI4</span> 手の甲</span>
              <strong id="platform-feature-name" className="platform-feature-name">合谷<span>ごうこく</span></strong>
              <span id="platform-feature-action" className="platform-feature-link">位置図を見る <ArrowRight aria-hidden="true" /></span>
            </span>
          </Link>
        </div>
      </section>

      <section className="platform-container platform-index" aria-labelledby="platform-index-title">
        <h2 id="platform-index-title">身近なツボを図で見る</h2>
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

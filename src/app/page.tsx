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
  "/tsubo": { label: "ツボを調べる", description: "位置と目印を図で見る", analytics: "home_atlas", art: "points" },
  "/learn": { label: "講義を読む", description: "陰陽や経絡を図で学ぶ", analytics: "home_reading", art: "study" },
  "/clinical": { label: "症例で練習する", description: "訴えと所見から見立てる", analytics: "home_clinical", art: "practice" },
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
    <div className="platform-home quiet-atlas">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: collectionPageJsonLd("/", HOME_HEADING, PLATFORM_DESCRIPTION, "目的から探す", SERIES_ENTRIES) }} />
      <section className="platform-container platform-hero-grid" aria-labelledby="platform-title">
        <div className="platform-hero-copy">
          <div>
            <h1 id="platform-title" className="platform-title"><span>東洋医学を、</span><span>図から学ぶ。</span></h1>
            <p className="platform-intro-text">361のツボを図で調べ、講義と模擬症例で学べます。</p>
          </div>
          <PlatformSearchForm placeholder="合谷、肩こり、陰陽" />
          <Link href="/symptoms" className="platform-general-guide">
            <span className="platform-general-copy">
              <span className="platform-general-label">一般向け</span>
              <span>症状から受診の目安を探す</span>
            </span>
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>

        <nav className="platform-series" aria-labelledby="platform-series-title">
          <h2 id="platform-series-title">目的から探す</h2>
          <ul className="platform-series-grid">
            {SERIES_ENTRIES.map(({ href }) => {
              const { label, description, analytics, art } = SERIES_ACTIONS[href];
              return (
                <li key={href} className="platform-series-card">
                  <Link href={href} className="platform-series-action" data-analytics-action={analytics} aria-labelledby={analytics + "-title"} aria-describedby={analytics + "-description"}>
                    <span className="platform-series-icon" aria-hidden="true"><PageSymbol kind={art} /></span>
                    <div className="platform-series-copy">
                      <h3 id={analytics + "-title"} className="platform-series-label">{label}</h3>
                      <p id={analytics + "-description"} className="platform-series-description">{description}</p>
                    </div>
                    <ArrowRight aria-hidden="true" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <Link href="/tsubo/li4#acupoint-location" className="platform-feature" aria-labelledby="platform-feature-name platform-feature-action">
          <span className="platform-feature-meta" aria-hidden="true"><span className="platform-feature-number">図 01</span><span>LI4</span></span>
          <span className="platform-feature-art"><HeguHandDiagram thumbnail /></span>
          <span className="platform-feature-copy">
            <span className="platform-feature-label">
              <strong id="platform-feature-name" className="platform-feature-name">合谷</strong>
              <span className="platform-feature-reading">ごうこく</span>
            </span>
            <span id="platform-feature-action" className="platform-feature-link">位置図を見る <ArrowRight aria-hidden="true" /></span>
          </span>
        </Link>
      </section>

      <section className="platform-container platform-index" aria-labelledby="platform-index-title">
        <div className="platform-index-heading">
          <h2 id="platform-index-title">身近なツボを図で見る</h2>
          <Link href={ACUPUNCTURE_GUIDE.href} className="ui-text-link">{ACUPUNCTURE_GUIDE.label}</Link>
        </div>
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

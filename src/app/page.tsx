import Link from "next/link";
import { ArrowRight, BookOpen, Compass, LibraryBig } from "lucide-react";
import PlatformSearchForm from "@/components/search/PlatformSearchForm";
import HeguHandDiagram from "@/components/tsubo/atlas/HeguHandDiagram";
import { ACUPUNCTURE_GUIDE } from "@/config/acupunctureLearning";
import { collectionPageJsonLd, HOME_HEADING } from "@/config/seo";
import { PLATFORM_DESCRIPTION, SERIES } from "@/config/series";

const SERIES_ENTRIES = Object.values(SERIES);
const POINTS = [
  { code: "li4", label: "合谷", location: "手の甲" },
  { code: "st36", label: "足三里", location: "ひざの下" },
  { code: "pc6", label: "内関", location: "手首の近く" },
  { code: "lr3", label: "太衝", location: "足の甲" },
];

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
            <PlatformSearchForm />
            <nav className="platform-shortcuts" aria-label="学ぶ・調べる">
              <Link href={SERIES.reading.href}><BookOpen aria-hidden="true" />図解講義を読む</Link>
              <Link href={ACUPUNCTURE_GUIDE.href}><LibraryBig aria-hidden="true" />{ACUPUNCTURE_GUIDE.label}</Link>
              <Link href="/symptoms"><Compass aria-hidden="true" />症状ガイド</Link>
            </nav>
          </div>
          <Link href="/tsubo/li4" className="platform-feature" aria-labelledby="platform-feature-name platform-feature-action">
            <span className="platform-feature-art"><HeguHandDiagram thumbnail /></span>
            <span className="platform-feature-copy">
              <span className="platform-feature-meta">手の甲のツボ <span>LI4</span></span>
              <strong id="platform-feature-name" className="platform-feature-name">合谷<span>ごうこく</span></strong>
              <span id="platform-feature-action" className="platform-feature-link">場所と注意点を見る <ArrowRight aria-hidden="true" /></span>
            </span>
          </Link>
        </div>
      </section>

      <section className="platform-container platform-series" aria-labelledby="platform-series-title">
        <h2 id="platform-series-title">目的から探す</h2>
        <ul className="platform-series-grid">
          {SERIES_ENTRIES.map(({ icon: Icon, ...series }) => (
            <li key={series.href} className="platform-series-card">
              <h3>
                <span className="platform-series-icon"><Icon aria-hidden="true" /></span>
                <Link href={series.href}>{series.name}</Link>
                <ArrowRight aria-hidden="true" />
              </h3>
              <p>{series.description}</p>
              <ul>{series.links.filter(({ href }) => href !== series.href).map(({ href, label }) => (
                <li key={href}><Link href={href} className="ui-text-link">{label}</Link></li>
              ))}</ul>
            </li>
          ))}
        </ul>
      </section>

      <section className="platform-container platform-index" aria-labelledby="platform-index-title">
        <h2 id="platform-index-title">図で見る、身近なツボ</h2>
        <ul>
          {POINTS.map(point => (
            <li key={point.code}>
              <Link href={`/tsubo/${point.code}`}>
                <strong>{point.label}</strong>
                <span>{point.location}</span>
                <ArrowRight aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

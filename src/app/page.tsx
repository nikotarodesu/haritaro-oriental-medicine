import Link from "next/link";
import { ArrowRight, Compass, MapPin } from "lucide-react";
import PlatformSearchForm from "@/components/search/PlatformSearchForm";
import { BRAND_WORDMARK } from "@/config/brand";
import { PLATFORM_INTRO, SERIES, TSUBO_TAGLINE } from "@/config/series";
import HeguHandDiagram from "@/components/tsubo/atlas/HeguHandDiagram";

const POINTS = [
  { code: "st36", label: "足三里", location: "ひざの下" },
  { code: "pc6", label: "内関", location: "手首の近く" },
  { code: "lr3", label: "太衝", location: "足の甲" },
];

export default function HomePage() {
  return (
    <div className="platform-home">
      <section className="platform-intro" aria-labelledby="platform-title">
        <div className="platform-container platform-hero-grid">
          <div>
            <h1 id="platform-title" className="platform-title font-serif">{BRAND_WORDMARK}</h1>
            <p className="platform-intro-text">{PLATFORM_INTRO}</p>
            <PlatformSearchForm />
            <nav className="platform-shortcuts" aria-label="ツボ図鑑の入口">
              <Link href={SERIES.dictionary.href}><MapPin aria-hidden="true" />ツボから探す<ArrowRight aria-hidden="true" /></Link>
              <Link href="/symptoms"><Compass aria-hidden="true" />症状から探す<ArrowRight aria-hidden="true" /></Link>
            </nav>
          </div>
          <aside className="platform-index" aria-labelledby="platform-index-title">
            <h2 id="platform-index-title" className="font-serif">図で見る、身近なツボ</h2>
            <Link href="/tsubo/li4" className="platform-feature">
              <HeguHandDiagram thumbnail />
              <span><small>手の甲のツボ</small><strong className="font-serif">合谷<span>ごうこく</span></strong>
              <span className="platform-feature-link">場所と押し方を見る <ArrowRight aria-hidden="true" /></span></span>
            </Link>
            <ul>
              {POINTS.map(point => (
                <li key={point.code}>
                  <Link href={`/tsubo/${point.code}`}>
                    <strong>{point.label}</strong><span className="ui-muted">{point.location}</span>
                    <ArrowRight aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <div className="platform-container platform-series" aria-label="はり太郎の3シリーズ">
        {Object.values(SERIES).map(({ icon: Icon, ...series }) => (
          <section key={series.href} className="platform-series-card">
            <div className="platform-series-icon"><Icon aria-hidden="true" /></div>
            <h2 className="font-serif"><Link href={series.href}>{series.name}</Link></h2>
            {series.href === SERIES.dictionary.href && <p className="platform-tsubo-tagline">{TSUBO_TAGLINE}</p>}
            <p className="ui-muted">{series.description}</p>
            <ul>{series.links.map(({ href, label }) => (
              <li key={href}><Link href={href} className="ui-text-link">{label}<ArrowRight aria-hidden="true" /></Link></li>
            ))}</ul>
          </section>
        ))}
      </div>
    </div>
  );
}

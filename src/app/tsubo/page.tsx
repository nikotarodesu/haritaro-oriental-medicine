import Link from "next/link";
import { MERIDIANS, ALL_ACUPOINTS, DETAILED_ACUPOINTS } from "@/data/tsubo";
import { BookOpen, FlaskConical, Layers, ListFilter, MapPinned, Ruler, ShieldCheck } from "lucide-react";
import AtlasOverviewArt from "@/components/tsubo/AtlasOverviewArt";
import PublicLectureIndex from "@/components/curriculum/PublicLectureIndex";
import TsuboInteractiveClient from "@/components/tsubo/TsuboInteractiveClient";
import { DICTIONARY_TAGLINE, SERIES } from "@/config/series";
import { ACUPUNCTURE_GUIDE, ACUPUNCTURE_RESEARCH } from "@/config/acupunctureLearning";
import { collectionPageJsonLd } from "@/config/seo";
import { ATLAS_STUDIES } from "@/data/tsubo/atlas/evidence";
import { ATLAS_LITERATURE_SEARCH_COUNTS, ATLAS_LITERATURE_SEARCH_DATE } from "@/data/tsubo/atlas/literatureSearch";
import { ACUPOINT_NAME_INDEX_PATH } from "@/data/tsubo/names/characterIndex";
import { EXTRA_POINTS_PATH } from "@/data/tsubo/extraPoints";
import { KEY_POINT_TYPES_GUIDE } from "@/data/tsubo/keyPointTypes";
import { NEARBY_COMPARISON_LINKS } from "@/data/tsubo/atlas/nearbyComparisonLinks";

const regions = [...new Set(ALL_ACUPOINTS.map(point => point.bodyPart))].map(region => ({
  region, points: ALL_ACUPOINTS.filter(point => point.bodyPart === region),
}));
const flagshipCodes = ["li4", "st36", "lr3", "pc6", "sp6", "gv20", "lu7", "ki1", "bl23", "cv12", "gb20", "ht7"];
const flagshipPoints = flagshipCodes.map(code => ALL_ACUPOINTS.find(point => point.codeLower === code)).filter(point => !!point);
const anatomyCards = [
  { code: "li4", structure: "中手骨と筋" },
  { code: "pc6", structure: "前腕の腱" },
  { code: "st36", structure: "すねの骨と筋" },
  { code: "li11", structure: "ひじの外側" },
  { code: "lu5", structure: "腱の親指側" },
  { code: "pc3", structure: "腱の小指側" },
].flatMap(({ code, structure }) => {
  const point = ALL_ACUPOINTS.find(point => point.codeLower === code);
  return point && DETAILED_ACUPOINTS[code]?.crossSection ? [{ point, structure }] : [];
});
const otherFlagshipPoints = flagshipPoints.filter(point => !anatomyCards.some(card => card.point.code === point.code));
const studyGroups = [
  { label: "ツボ一つを調べた研究", studies: ATLAS_STUDIES.filter(study => study.kind === "point") },
  { label: "複数のツボを用いた研究", studies: ATLAS_STUDIES.filter(study => study.kind === "combination") },
];

const DESCRIPTION = "361のツボを名前・部位・経絡から探せます。体表の位置図や名前の由来に加え、合谷や曲池・尺沢・曲沢などでは周りの骨や腱を断面図で学べます。";

export default function TsuboPage() {
  const guideLinks = (
    <nav aria-label="ツボ図鑑の資料とガイド" className="atlas-directory-actions atlas-directory-guides">
      <Link href={ACUPOINT_NAME_INDEX_PATH} className="atlas-text-action">漢字から探す</Link>
      <Link href="/tsubo/basics/bone-cun" className="atlas-text-action"><Ruler size={17} aria-hidden="true" />寸の測り方</Link>
      <Link href={ACUPUNCTURE_GUIDE.href} className="atlas-text-action"><BookOpen size={17} aria-hidden="true" />{ACUPUNCTURE_GUIDE.label}</Link>
    </nav>
  );

  return (
    <div className="page-layout atlas-page atlas-directory">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: collectionPageJsonLd(
        "/tsubo", SERIES.dictionary.name, DESCRIPTION, "代表的なツボ",
        flagshipPoints.map(({ codeLower, name }) => ({ name, href: `/tsubo/${codeLower}` })),
      ) }} />
      <header className="atlas-directory-header atlas-directory-intro">
        <div>
          <h1>{SERIES.dictionary.name}</h1>
          <p className="atlas-directory-tagline">{DICTIONARY_TAGLINE}</p>
          <p>{ALL_ACUPOINTS.length}のツボを探し、図で場所を確かめる。</p>
        </div>
        <AtlasOverviewArt />
      </header>

      <TsuboInteractiveClient relatedGuides={guideLinks} featuredPoints={<>
        <section id="atlas-anatomy-index" className="atlas-directory-anatomy atlas-target" aria-labelledby="atlas-anatomy-index-title">
          <h2 id="atlas-anatomy-index-title"><Layers size={20} aria-hidden="true" />断面図から見る</h2>
          <ul>
            {anatomyCards.map(({ point, structure }) => (
              <li key={point.code}>
                {/* Use browser fragment navigation to reveal the nested disclosure on arrival. */}
                <a href={`/tsubo/${point.codeLower}#acupoint-anatomy-diagram`}>
                  <span className="atlas-anatomy-card-title"><strong>{point.name}</strong><small>{point.code}</small></span>
                  <span>{structure}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
        <nav aria-label="代表的なツボ" className="atlas-directory-featured">
          <h2>代表的なツボ</h2>
          <ul>
            {otherFlagshipPoints.slice(0, 4).map(({ name, code, codeLower }) => (
              <li key={code}><Link href={`/tsubo/${codeLower}`} prefetch={false}>{name}<span>{code}</span></Link></li>
            ))}
          </ul>
        </nav>
        <nav aria-label="要穴と奇穴の索引" className="atlas-directory-actions">
          <Link href={KEY_POINT_TYPES_GUIDE} className="atlas-text-action"><ListFilter size={16} aria-hidden="true" />要穴の分類</Link>
          <Link href={EXTRA_POINTS_PATH} className="atlas-text-action"><MapPinned size={16} aria-hidden="true" />奇穴（太陽・印堂）</Link>
        </nav>
      </>} nearbyComparisons={
        <section id="nearby-comparisons" tabIndex={-1} className="atlas-target space-y-2" aria-labelledby="nearby-comparisons-title">
          <h2 id="nearby-comparisons-title" className="atlas-section-title">近いツボを比べる</h2>
          <p className="atlas-muted text-sm">手首のしわやひじの腱など、近いツボを見分ける目印を図で確認できます。</p>
          <ul className="grid grid-cols-2 gap-2 lg:grid-cols-3">
            {NEARBY_COMPARISON_LINKS.map(({ id, region, names, href }) => (
              <li key={id}>
                <Link href={href} prefetch={false} className="block h-full min-h-11 rounded-lg border border-frame bg-panel px-3 py-2 hover:border-accent">
                  <strong className="block text-sm text-accent">{region}</strong>
                  <span className="block text-sm leading-relaxed">{names.join("・")}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      } />

      <details className="atlas-disclosure atlas-region-index">
        <summary>ほかの代表的なツボ</summary>
        <ul className="flex flex-wrap gap-2 pb-3">
          {otherFlagshipPoints.slice(4).map(({ name, code, codeLower }) => (
            <li key={code}><Link href={`/tsubo/${codeLower}`} prefetch={false} className="atlas-index-point">{name}<span>{code}</span></Link></li>
          ))}
        </ul>
      </details>

      <section id="atlas-research-index" className="atlas-target space-y-3" aria-labelledby="atlas-research-index-title">
        <h2 id="atlas-research-index-title" className="atlas-section-title flex items-center gap-2"><FlaskConical size={20} aria-hidden="true" />研究から探す</h2>
        <Link href={ACUPUNCTURE_RESEARCH.href} className="atlas-text-action">鍼灸の研究を読む</Link>
        {studyGroups.map(({ label, studies }) => (
          <details key={label} className="atlas-disclosure atlas-region-index">
            <summary>{label}（{studies.length}件）</summary>
            <ul className="atlas-research-index pb-3">
              {studies.map(study => {
                const point = study.points[0] ?? study.comparisonPoints?.[0] ?? study.additionalPointGroups?.find(group => group.points.length)?.points[0];
                return point ? <li key={study.id}><Link href={`/tsubo/${point}#${study.id}`} prefetch={false}>{study.topic}</Link></li> : null;
              })}
            </ul>
          </details>
        ))}
        <details id="atlas-research-search" className="atlas-disclosure atlas-target">
          <summary>文献の調べ方</summary>
          <div className="atlas-study-details">
            <p><time dateTime={ATLAS_LITERATURE_SEARCH_DATE}>{ATLAS_LITERATURE_SEARCH_DATE}</time> に、当時まだ研究を載せていなかった{Object.keys(ATLAS_LITERATURE_SEARCH_COUNTS).length}穴を検索しました。</p>
            <p>経穴名とコードで、PubMedの題名・抄録などと、PubMed Centralの本文の方法欄を検索しました。人を対象とした比較試験のうち、実際に使われた経穴と結果を原典で確認できたものを紹介しています。</p>
            <p>追加調査では、Sciteで引用をたどり、研究で使った経穴と、選べる候補に挙がった経穴を原著で確認しました。比較群だけの経穴や、実際に使った人数が分からない候補は、各図鑑ページにその区別を記載しています。</p>
            <p><time dateTime="2026-11-23">2026-11-23</time> の再調査では、研究が未掲載だった38穴を和名、ローマ字表記、経穴コードで調べ直しました。試験計画だけに記載された経穴は掲載を見送り、結果が公表された論文で役割を確認できた経穴を追加しました。</p>
            <ul className="atlas-source-links" aria-label="文献検索で使用したデータベース">
              <li><a href="https://pubmed.ncbi.nlm.nih.gov/help/">PubMedの検索方法</a></li>
              <li><a href="https://pmc.ncbi.nlm.nih.gov/about/userguide/">PubMed Centralの検索方法</a></li>
            </ul>
          </div>
        </details>
      </section>

      <section aria-labelledby="illustrated-points" className="space-y-3">
        <h2 id="illustrated-points" className="atlas-section-title atlas-target">部位別の索引</h2>
        <div className="grid items-start gap-3 sm:grid-cols-2">
          {regions.map(({ region, points }) => (
            <details key={region} className="atlas-disclosure atlas-region-index">
              <summary>{region}のツボ（{points.length}穴）</summary>
              <ul className="flex flex-wrap gap-2 pb-3">
                {points.map(({ name, code, codeLower }) => <li key={code}><Link href={`/tsubo/${codeLower}`} prefetch={false} className="atlas-index-point">{name}<span>{code}</span></Link></li>)}
              </ul>
            </details>
          ))}
        </div>
      </section>

      <section aria-labelledby="dictionary-reading" className="space-y-4">
        <h2 id="dictionary-reading" className="atlas-section-title">経絡とツボの索引を使う</h2>
        <PublicLectureIndex series="dictionary" />
      </section>

      <section id="tsubo-index" aria-labelledby="tsubo-index-heading" className="tsubo-static-index atlas-target space-y-3">
        <h2 id="tsubo-index-heading" className="atlas-section-title">経絡別の索引</h2>
        <p className="atlas-muted">経絡名を開くと、その経絡のツボを番号順に確認できます。</p>
        <div className="grid items-start gap-3 sm:grid-cols-2">
          {MERIDIANS.map(meridian => {
            const points = ALL_ACUPOINTS.filter(point => point.meridianId === meridian.id);
            return (
              <details key={meridian.id} className="atlas-disclosure atlas-region-index">
                <summary>{meridian.name}（{points.length}穴）</summary>
                <ul id={`meridian-${meridian.id}`} className="atlas-target flex flex-wrap gap-2 pb-3">
                  {points.map(({ name, code, codeLower }) => <li key={code}><Link href={`/tsubo/${codeLower}`} prefetch={false} className="atlas-index-point">{name}<span>{code}</span></Link></li>)}
                </ul>
              </details>
            );
          })}
        </div>
      </section>

      <footer className="atlas-directory-policy" aria-labelledby="atlas-directory-policy-title">
        <h2 id="atlas-directory-policy-title">
          <ShieldCheck size={18} aria-hidden="true" />
          掲載範囲と参照資料
        </h2>
        <p>
          正経十二経脈・任脈・督脈の全361穴に、WHO標準経穴部位（2009年改訂再版）と照合した位置の日本語要約と原本へのリンクを掲載しています。図鑑の基本情報は『新版 東洋医学概論』『経絡経穴概論』も参照しています。断面図は学習用の模式図であり、個人の刺入経路や安全な深度を示すものではありません。
        </p>
        <p>
          ※本辞典は学習および臨床推論の補助を目的としており、個別診断や医療行為を代替するものではありません。
        </p>
      </footer>
    </div>
  );
}

import Link from "next/link";
import { MERIDIANS, ALL_ACUPOINTS } from "@/data/tsubo";
import { BookOpen, FlaskConical, MapPin, Ruler, ShieldCheck } from "lucide-react";
import AtlasOverviewArt from "@/components/tsubo/AtlasOverviewArt";
import PublicLectureIndex from "@/components/curriculum/PublicLectureIndex";
import TsuboInteractiveClient from "@/components/tsubo/TsuboInteractiveClient";
import { DICTIONARY_TAGLINE, SERIES } from "@/config/series";
import { ACUPUNCTURE_GUIDE, ACUPUNCTURE_RESEARCH } from "@/config/acupunctureLearning";
import { collectionPageJsonLd } from "@/config/seo";
import { ATLAS_STUDIES } from "@/data/tsubo/atlas/evidence";
import { ATLAS_LITERATURE_SEARCH_COUNTS, ATLAS_LITERATURE_SEARCH_DATE } from "@/data/tsubo/atlas/literatureSearch";

const regions = [...new Set(ALL_ACUPOINTS.map(point => point.bodyPart))].map(region => ({
  region, points: ALL_ACUPOINTS.filter(point => point.bodyPart === region),
}));
const flagshipCodes = ["li4", "st36", "lr3", "pc6", "sp6", "gv20", "lu7", "ki1", "bl23", "cv12", "gb20", "ht7"];
const flagshipPoints = flagshipCodes.map(code => ALL_ACUPOINTS.find(point => point.codeLower === code)).filter(point => !!point);
const studyGroups = [
  { label: "ツボ一つを調べた研究", studies: ATLAS_STUDIES.filter(study => study.kind === "point") },
  { label: "複数のツボを用いた研究", studies: ATLAS_STUDIES.filter(study => study.kind === "combination") },
];

const DESCRIPTION = "361のツボを、名前・部位・経絡から探せます。ツボごとの図で場所や目印を確かめ、注意点を読めます。";

export default function TsuboPage() {
  const guideLinks = (
    <nav aria-label="ツボ図鑑の資料とガイド" className="atlas-directory-actions atlas-directory-guides">
      <Link href="/symptoms" className="atlas-text-action"><MapPin size={17} aria-hidden="true" />症状から探す</Link>
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
      <header className="atlas-directory-header">
        <div>
          <h1>{SERIES.dictionary.name}</h1>
          <p className="atlas-directory-tagline">{DICTIONARY_TAGLINE}</p>
          <p>{DESCRIPTION}</p>
        </div>
        <AtlasOverviewArt />
      </header>

      <TsuboInteractiveClient relatedGuides={guideLinks} />

      <nav aria-label="代表的なツボ" className="space-y-3">
        <h2 className="atlas-section-title">代表的なツボ</h2>
        <ul className="flex flex-wrap gap-2">
          {flagshipPoints.map(({ name, code, codeLower }) => <li key={code}><Link href={`/tsubo/${codeLower}`} prefetch={false} className="atlas-index-point">{name}<span>{code}</span></Link></li>)}
        </ul>
      </nav>

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

      {/* 4. 掲載範囲・資料基準・更新方針 */}
      <footer className="bg-[#FAF8F5] dark:bg-[#121920] rounded-2xl border border-[#EDE7D8] dark:border-[#22303D] p-4 sm:p-6 space-y-2.5 text-xs text-[#59615D] dark:text-[#A0B0BC]">
        <div className="flex items-center gap-1.5 font-bold text-[#232826] dark:text-[#FAF8F5]">
          <ShieldCheck className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E]" />
          <span>掲載範囲・資料基準と更新方針</span>
        </div>
        <p className="leading-relaxed">
          正経十二経脈・任脈・督脈の全361穴に、WHO標準経穴部位（2009年改訂再版）と照合した位置の日本語要約と原本へのリンクを掲載しています。図鑑の基本情報は『新版 東洋医学概論』『経絡経穴概論』も参照しています。断面図は学習用の模式図であり、個人の刺入経路や安全な深度を示すものではありません。
        </p>
        <p className="text-sm leading-relaxed">
          ※本辞典は学習および臨床推論の補助を目的としており、個別診断や医療行為を代替するものではありません。
        </p>
      </footer>
    </div>
  );
}

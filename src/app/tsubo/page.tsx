import { Suspense } from "react";
import Link from "next/link";
import { MERIDIANS, ALL_ACUPOINTS } from "@/data/tsubo";
import { BookOpen, FlaskConical, Layers, MapPin, Ruler, ShieldCheck } from "lucide-react";
import PlatformSearchForm from "@/components/search/PlatformSearchForm";
import AtlasOverviewArt from "@/components/tsubo/AtlasOverviewArt";
import PublicLectureIndex from "@/components/curriculum/PublicLectureIndex";
import TsuboInteractiveClient from "@/components/tsubo/TsuboInteractiveClient";
import { SERIES } from "@/config/series";
import { ACUPUNCTURE_GUIDE } from "@/config/acupunctureLearning";
import { collectionPageJsonLd } from "@/config/seo";
import { ATLAS_POINT_MARKERS } from "@/data/tsubo/atlas/markers";
import { ATLAS_STUDIES } from "@/data/tsubo/atlas/evidence";
import { ATLAS_LITERATURE_SEARCH_COUNTS, ATLAS_LITERATURE_SEARCH_DATE } from "@/data/tsubo/atlas/literatureSearch";

const illustratedPoints = ALL_ACUPOINTS.filter(({ codeLower }) => codeLower === "li4" || ATLAS_POINT_MARKERS[codeLower]);
const illustratedRegions = [...new Set(illustratedPoints.map(point => point.bodyPart))].map(region => ({
  region, points: illustratedPoints.filter(point => point.bodyPart === region),
}));
const studyGroups = [
  { label: "一つのツボに着目した研究", studies: ATLAS_STUDIES.filter(study => study.kind === "point") },
  { label: "複数のツボを用いた研究", studies: ATLAS_STUDIES.filter(study => study.kind === "combination") },
];

// 主要な代表経穴（初期HTMLでクローラーおよびJS無効環境にも確実に渡すリンク）
const FLAGSHIP_ACUPOINTS = [
  { code: "LI4", name: "合谷", meridian: "手の陽明大腸経", part: "手・腕" },
  { code: "ST36", name: "足三里", meridian: "足の陽明胃経", part: "下肢" },
  { code: "LR3", name: "太衝", meridian: "足の厥陰肝経", part: "足" },
  { code: "PC6", name: "内関", meridian: "手の厥陰心包経", part: "前腕" },
  { code: "SP6", name: "三陰交", meridian: "足の太陰脾経", part: "下肢" },
  { code: "GV20", name: "百会", meridian: "督脈", part: "頭頂部" },
  { code: "LU7", name: "列欠", meridian: "手の太陰肺経", part: "前腕" },
  { code: "KI1", name: "湧泉", meridian: "足の少陰腎経", part: "足底" },
  { code: "BL23", name: "腎兪", meridian: "足の太陽膀胱経", part: "腰部" },
  { code: "CV12", name: "中脘", meridian: "任脈", part: "上腹部" },
  { code: "GB20", name: "風池", meridian: "足の少陽胆経", part: "後頭部" },
  { code: "HT7", name: "神門", meridian: "手の少陰心経", part: "手首" },
];

const DESCRIPTION = "全361経穴を名前・部位・経絡から探し、場所の図と注意点を確認できます。";

export default function TsuboPage() {
  return (
    <div className="page-layout atlas-page atlas-directory">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: collectionPageJsonLd(
        "/tsubo", SERIES.dictionary.name, DESCRIPTION, "代表的なツボ",
        FLAGSHIP_ACUPOINTS.map(({ code, name }) => ({ name, href: `/tsubo/${code.toLowerCase()}` })),
      ) }} />
      <header className="atlas-directory-header">
        <div>
          <h1>{SERIES.dictionary.name}</h1>
          <p>{DESCRIPTION}</p>
        </div>
        <AtlasOverviewArt />
      </header>

      <Suspense
        fallback={
          <div className="atlas-search-panel atlas-search-fallback">
            <PlatformSearchForm id="atlas-search-query" label="ツボを検索" placeholder="合谷、ごうこく、LI4" />
            <nav aria-label="ツボの索引" className="atlas-directory-actions">
              <a href="#illustrated-points" className="atlas-text-action">部位別の索引</a>
              <a href="#tsubo-index" className="atlas-text-action">全361経穴の索引</a>
              <a href="#atlas-research-index" className="atlas-text-action">研究から探す</a>
            </nav>
          </div>
        }
      >
        <TsuboInteractiveClient />
      </Suspense>

      <nav aria-label="ツボ図鑑の資料とガイド" className="atlas-directory-actions atlas-directory-guides">
        <Link href="/symptoms" className="atlas-text-action"><MapPin size={17} aria-hidden="true" />症状から探す</Link>
        <Link href="/tsubo/basics/bone-cun" className="atlas-text-action"><Ruler size={17} aria-hidden="true" />寸の測り方</Link>
        <Link href={ACUPUNCTURE_GUIDE.href} className="atlas-text-action"><BookOpen size={17} aria-hidden="true" />はり・お灸・ツボ押しの違い</Link>
      </nav>

      <section id="atlas-research-index" className="atlas-target space-y-3" aria-labelledby="atlas-research-index-title">
        <h2 id="atlas-research-index-title" className="atlas-section-title flex items-center gap-2"><FlaskConical size={20} aria-hidden="true" />研究から探す</h2>
        {studyGroups.map(({ label, studies }) => (
          <details key={label} className="atlas-disclosure atlas-region-index">
            <summary>{label}（{studies.length}件）</summary>
            <ul className="atlas-research-index pb-3">
              {studies.map(study => <li key={study.id}><Link href={`/tsubo/${study.points[0]}#${study.id}`} prefetch={false}>{study.topic}</Link></li>)}
            </ul>
          </details>
        ))}
        <details id="atlas-research-search" className="atlas-disclosure atlas-target">
          <summary>文献の調べ方</summary>
          <div className="atlas-study-details">
            <p><time dateTime={ATLAS_LITERATURE_SEARCH_DATE}>{ATLAS_LITERATURE_SEARCH_DATE}</time> に、当時まだ研究を載せていなかった{Object.keys(ATLAS_LITERATURE_SEARCH_COUNTS).length}穴を検索しました。</p>
            <p>経穴名とコードで、PubMedの題名・抄録などと、PubMed Centralの本文の方法欄を検索しました。人を対象とした比較試験のうち、実際に使われた経穴と結果を原典で確認できたものを紹介しています。</p>
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
          {illustratedRegions.map(({ region, points }) => (
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

      {/* 3. 経脈・経穴の静的索引は初期HTMLに残す */}
      <details id="tsubo-index" className="tsubo-static-index scroll-mt-28">
      <summary>体を通る道筋（経絡）ごとにツボを見る</summary>
      <nav aria-label="経脈別テキスト索引" className="bg-white dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-4 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-[#F2ECE0] dark:border-[#22303D] pb-3">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E]" />
            <h2 className="font-serif text-sm sm:text-base font-bold text-[#232826] dark:text-[#FAF8F5]">
              十四経脈テキスト索引
            </h2>
          </div>
          <span className="text-xs text-[#737C77] dark:text-[#8899A6]">全14経脈・361穴</span>
        </div>

        {/* 14経脈リンク一覧 */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {MERIDIANS.map((meridian) => (
            <Link
              key={meridian.id}
              href={`/tsubo?meridian=${encodeURIComponent(meridian.shortName)}`}
              className="px-2.5 py-1 rounded-lg bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#22303D] hover:border-[#1E3D34] dark:hover:border-[#74BA9E] text-xs text-[#333835] dark:text-[#C5D2DB] transition-colors"
            >
              {meridian.name}（{meridian.shortName}）
            </Link>
          ))}
        </div>

        {/* 主要代表経穴リンク */}
        <div className="pt-2 border-t border-[#F2ECE0] dark:border-[#22303D] space-y-2">
          <span className="text-xs font-bold text-[#737C77] dark:text-[#8899A6] block">
            代表的なツボ
          </span>
          <div className="flex flex-wrap gap-2 text-xs">
            {FLAGSHIP_ACUPOINTS.map((pt) => (
              <Link
                key={pt.code}
                href={`/tsubo/${pt.code.toLowerCase()}`}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#FAF8F5] dark:bg-[#10171F] border border-[#E8E1D1] dark:border-[#2D3E50] text-[#1E3D34] dark:text-[#74BA9E] font-medium hover:bg-[#EBF3EF] transition-colors"
              >
                <span className="font-bold">{pt.name}</span>
                <span className="font-mono text-xs text-[#737C77] dark:text-[#8899A6]">({pt.code})</span>
              </Link>
            ))}
          </div>
        </div>

        {/* 全361経穴 完全インデックス（初期HTML出力保証・SEOクローラー網羅） */}
        <details className="pt-2 border-t border-[#F2ECE0] dark:border-[#22303D] group">
          <summary className="min-h-[44px] text-sm font-bold text-[#1E3D34] dark:text-[#74BA9E] hover:underline cursor-pointer flex items-center justify-between gap-2 py-2 select-none">
            <span>全361経穴の一覧を開く</span>
            <span className="text-xs font-normal text-[#737C77] group-open:rotate-180 transition-transform">▼</span>
          </summary>
          <div className="pt-4 space-y-5">
            {MERIDIANS.map((m) => {
              const meridianPoints = ALL_ACUPOINTS.filter((p) => p.meridianId === m.id);
              return (
                <div key={m.id} className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-[#232826] dark:text-[#FAF8F5]">
                      {m.name}
                    </span>
                    <span className="text-xs text-[#737C77] dark:text-[#8899A6]">
                      （{meridianPoints.length}穴）
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1 text-xs">
                    {meridianPoints.map((pt) => (
                      <Link
                        key={pt.code}
                        href={`/tsubo/${pt.code.toLowerCase()}`}
                        prefetch={false}
                        className="atlas-index-point"
                      >
                        <span className="font-medium">{pt.name}</span>
                        <span>{pt.code}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </details>
      </nav>
      </details>

      {/* 4. 掲載範囲・資料基準・更新方針 */}
      <footer className="bg-[#FAF8F5] dark:bg-[#121920] rounded-2xl border border-[#EDE7D8] dark:border-[#22303D] p-4 sm:p-6 space-y-2.5 text-xs text-[#59615D] dark:text-[#A0B0BC]">
        <div className="flex items-center gap-1.5 font-bold text-[#232826] dark:text-[#FAF8F5]">
          <ShieldCheck className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E]" />
          <span>掲載範囲・資料基準と更新方針</span>
        </div>
        <p className="leading-relaxed">
          正経十二経脈・任脈・督脈の全361穴に、WHO標準経穴部位（2009年改訂再版）と照合した位置の日本語要約と原本へのリンクを掲載しています。図鑑の基本情報は『新版 東洋医学概論』『経絡経穴概論』も参照しています。断面図は学習用の模式図であり、個人の刺入経路や安全な深度を示すものではありません。
        </p>
        <p className="text-xs text-[#737C77] dark:text-[#8899A6]">
          ※本辞典は学習および臨床推論の補助を目的としており、個別診断や医療行為を代替するものではありません。
        </p>
      </footer>
    </div>
  );
}

import { SHARED_OG_IMAGES, acupointPageTitle, SITE_AUTHOR, SITE_NAME, SITE_ORIGIN } from "@/config/seo";
import { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import Link from "next/link";
import { 
  ACUPOINTS_MASTER, 
  getAcupointByCode, 
  getAcupointDetail, 
  getMeridianPoints,
  generateCaution,
  isDetailedAcupoint,
  DETAILED_ACUPOINTS,
  isContraindicatedNeedle,
  isContraindicatedMoxa,
  isPregnancyContraindicated,
  isChestBackPneumothoraxRisk
} from "@/data/tsubo";
import CrossSectionViewer from "@/components/tsubo/CrossSectionViewer";
import AcupointAtlasArticle from "@/components/tsubo/AcupointAtlasArticle";
import { AcupointKeyPointLinks, AcupointReadingLinks } from "@/components/tsubo/AcupointArticleLinks";
import AcupointCautions from "@/components/tsubo/AcupointCautions";
import AcupointLocationComparison from "@/components/tsubo/AcupointLocationComparison";
import AcupointNameGuide from "@/components/tsubo/AcupointNameGuide";
import AcupointResearch from "@/components/tsubo/AcupointResearch";
import { AcupointNameComparison, AcupointPairNotes, hasPointPairs } from "@/components/tsubo/AcupointPairNotes";
import { AcupointAnatomyDetails, AcupointCareAndResearch, AcupointLocationDetails, AcupointLocationRows, AcupointTopic } from "@/components/tsubo/AcupointTopics";
import WhoPointLocation from "@/components/tsubo/WhoPointLocation";
import HeguAtlasPreview, { heguSources } from "@/components/tsubo/HeguAtlasPreview";
import { ATLAS_ARTICLES } from "@/data/tsubo/atlas/articles";
import { ACUPOINT_SEARCH_COPY } from "@/data/tsubo/atlas/searchCopy";
import { ATLAS_POINT_MARKERS } from "@/data/tsubo/atlas/markers";
import { POINT_ILLUSTRATIONS } from "@/data/tsubo/atlas/illustrations";
import { ACUPOINT_LOCATION_IMAGES } from "@/data/tsubo/atlas/locationImages";
import { getAcupointStudies, getClassicalCombinations } from "@/data/tsubo/atlas/evidence";
import { ATLAS_SELF_CARE } from "@/data/tsubo/atlas/selfCare";
import { getFeaturedPairs } from "@/data/tsubo/atlas/featuredPairs";
import { getAcupointName } from "@/data/tsubo/names";
import { PointAtlasLocationFigure, PointAtlasLocationSupplement, PointAtlasThumbnail } from "@/components/tsubo/atlas/PointAtlasDiagrams";
import type { AcupointMaster } from "@/data/tsubo/types";
import TsuboKeyboardNav from "@/components/tsubo/TsuboKeyboardNav";
import TsuboReviewEntry from '@/components/tsubo/TsuboReviewEntry';
import { 
  Compass, 
  BookOpen, 
  Sparkles, 
  ArrowLeft, 
  ArrowRight, 
  GitCompare,
  SlidersHorizontal
} from "lucide-react";
import { PROCEDURE_PUBLICATION_NOTICE, getPublicCrossSectionModel } from "@/data/medicalSafety";
import { getLecturesForAcupoint } from "@/utils/acupointCurriculumMatcher";
import { SERIES } from "@/config/series";
import { getSymptomsForAcupoint, getCasesForAcupoint } from "@/utils/tsuboTopicClusterMatcher";
import { MERIDIAN_RELATIONS } from "@/utils/tsuboRelations";
import AuthorSupervisorCard from "@/components/common/AuthorSupervisorCard";
import ContentEndAd from "@/components/ads/ContentEndAd";
import AcupointInformationScope from '@/components/tsubo/AcupointInformationScope';
import MeridianRelationsDiagram from '@/components/tsubo/MeridianRelationsDiagram';
import { VERIFIED_POINT_LOCATIONS } from '@/data/sourceVerification';
import { PAGE_REVISIONS, PUBLIC_COPY_REVISED_AT } from "@/config/contentUpdates";

interface Props {
  params: Promise<{ code: string }>;
}

function atlasPageTitle(point: AcupointMaster, topic = "場所と注意点") {
  const copy = ACUPOINT_SEARCH_COPY[point.codeLower];
  const subject = `${point.name}（${point.kana}・${point.code}）`;
  if (copy) return `${subject}の場所｜${copy.landmark}を図解｜はり太郎のツボ図鑑`;
  return `${subject}｜${topic}｜はり太郎のツボ図鑑`;
}

export async function generateStaticParams() {
  return ACUPOINTS_MASTER.map((point) => ({
    code: point.codeLower,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { code } = await params;
  const point = getAcupointByCode(code);

  if (!point) {
    return {
      title: "経穴が見つかりません",
      description: "指定された経穴コードは存在しないか、準備中です。",
    };
  }

  const atlasArticle = ATLAS_ARTICLES[point.codeLower];
  const copy = ACUPOINT_SEARCH_COPY[point.codeLower];
  const title = (copy || atlasArticle) ? atlasPageTitle(point, atlasArticle?.titleTopic) : acupointPageTitle(point);
  const description = copy?.lead ?? atlasArticle?.description ?? `${point.name}（${point.code}）の場所と目印。${point.locationSimple} ${point.meridian}の中での位置、近くのツボ、注意点を紹介します。`;
  const share = ACUPOINT_LOCATION_IMAGES[point.codeLower]?.share;
  const shareImage = share && { url: SITE_ORIGIN + share.path, width: share.width, height: share.height, alt: share.alt };

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: `/tsubo/${point.codeLower}`,
    },
    openGraph: {
      images: shareImage ? [shareImage] : SHARED_OG_IMAGES,
      siteName: SITE_NAME,
      title,
      description,
      url: `${SITE_ORIGIN}/tsubo/${point.codeLower}`,
    },
    ...(shareImage && { twitter: { card: "summary_large_image", title, description, images: [shareImage] } }),
  };
}

export default async function AcupointDetailPage({ params }: Props) {
  const { code } = await params;
  const point = getAcupointDetail(code);

  if (!point) {
    notFound();
  }
  if (code !== point.codeLower) permanentRedirect(`/tsubo/${point.codeLower}`);

  const isDetailed = isDetailedAcupoint(point.codeLower);
  const individualModel = Boolean(DETAILED_ACUPOINTS[point.codeLower]?.crossSection);

  // 同経脈の経穴リスト（前後の経穴導線用）
  const meridianPoints = getMeridianPoints(point.meridianId);
  const currentIndex = meridianPoints.findIndex((p) => p.codeLower === point.codeLower);
  const prevPoint = currentIndex > 0 ? meridianPoints[currentIndex - 1] : null;
  const nextPoint = currentIndex < meridianPoints.length - 1 ? meridianPoints[currentIndex + 1] : null;

  // この経穴が登場する講義（カリキュラム）
  const relatedLectures = getLecturesForAcupoint(point.name, point.code);

  // 経穴名だけを参照として渡す。所属経脈や経穴だけから証を決めない。
  const simulatorUrl = `/simulator?fromTsubo=${encodeURIComponent(point.code)}&tsuboName=${encodeURIComponent(point.name)}`;

  // トピッククラスタ連動（症状ガイド ＆ 臨床症例）
  const relatedSymptoms = getSymptomsForAcupoint(point.codeLower, point.name);
  const relatedCases = getCasesForAcupoint(point.codeLower);
  const symptomLinks = relatedSymptoms.map((symptom) => ({ href: `/symptoms/${symptom.id}`, title: symptom.title, kind: "症状ガイド" }));
  const caseLinks = relatedCases.map((clinicalCase) => ({ href: `/cases/${clinicalCase.id}`, title: clinicalCase.title, kind: "症例" }));
  const relatedReading = symptomLinks.length > 0 && caseLinks.length > 0
    ? [symptomLinks[0], caseLinks[0]]
    : [...symptomLinks, ...caseLinks].slice(0, 2);

  // 安全・禁忌判定
  const isNeedleBan = isContraindicatedNeedle(point.codeLower);
  const isMoxaBan = isContraindicatedMoxa(point.codeLower);
  const isPregnancyBan = isPregnancyContraindicated(point.codeLower, point.bodyPart);
  const isPneumoRisk = isChestBackPneumothoraxRisk(point.codeLower, point.bodyPart, point.locationDetail);

  // 表裏経・同名経の相互トピッククラスタ
  const relationId = point.meridianId === 'governor-vessel' ? 'governor' : point.meridianId === 'conception-vessel' ? 'conception' : point.meridianId;
  const meridianRelations = MERIDIAN_RELATIONS[relationId] || [];

  const pageUrl = `${SITE_ORIGIN}/tsubo/${point.codeLower}`;
  const locationImage = ACUPOINT_LOCATION_IMAGES[point.codeLower];
  const pointRevisedAt = PAGE_REVISIONS[`/tsubo/${point.codeLower}`];
  const dateModified = pointRevisedAt && pointRevisedAt > PUBLIC_COPY_REVISED_AT ? pointRevisedAt : PUBLIC_COPY_REVISED_AT;
  const nameGuide = getAcupointName(point.codeLower);
  const isHeguAtlas = point.codeLower === "li4";
  const atlasArticle = ATLAS_ARTICLES[point.codeLower];
  const copy = ACUPOINT_SEARCH_COPY[point.codeLower];
  const atlasMarker = ATLAS_POINT_MARKERS[point.codeLower];
  const illustration = POINT_ILLUSTRATIONS[point.codeLower];
  const pageTitle = (copy || atlasArticle) ? atlasPageTitle(point, atlasArticle?.titleTopic) : acupointPageTitle(point);
  const verifiedLocation = VERIFIED_POINT_LOCATIONS[point.codeLower];
  const locationSources = isHeguAtlas ? heguSources : atlasArticle?.sources ?? (verifiedLocation
    ? [{ name: `${verifiedLocation.sourceTitle} ${verifiedLocation.sourcePage}`, url: verifiedLocation.sourceUrl }]
    : []);
  const researchSources = [
    ...getAcupointStudies(point.codeLower).flatMap(study => study.sources),
    ...getClassicalCombinations(point.codeLower).map(combination => combination.source),
  ];
  const nameSources = nameGuide ? [
    { name: "中国国家標準 GB/T 12346-2021 経穴名称と部位", url: nameGuide.standardUrl },
    { name: "WHO Standard Acupuncture Nomenclature", url: nameGuide.nomenclatureUrl },
    ...(nameGuide.history ? [{ name: nameGuide.history.source, url: nameGuide.history.url }] : []),
  ] : [];
  const sources = [...new Map([
    ...locationSources,
    ...researchSources.map(({ label, url }) => ({ name: label, url })),
    ...(ATLAS_SELF_CARE[point.codeLower] ?? []).map(({ source }) => ({ name: source.label, url: source.url })),
    ...nameSources,
  ].map(source => [source.url, source])).values()];

  // 表示内容に対応するページ・用語・パンくずの構造化データ。
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["WebPage", "MedicalWebPage"],
        "@id": `${pageUrl}#webpage`,
        "url": pageUrl,
        "name": pageTitle,
        "inLanguage": "ja",
        "dateModified": dateModified,
        ...(locationImage && {
          "primaryImageOfPage": {
            "@type": "ImageObject",
            "contentUrl": SITE_ORIGIN + locationImage.src,
            "width": locationImage.width,
            "height": locationImage.height,
            "caption": locationImage.alt,
          },
        }),
        "publisher": { "@id": "https://www.haritaro.jp/#organization" },
        "author": SITE_AUTHOR,
        ...(sources.length > 0 && { citation: sources.map(({ name, url }) => ({ "@type": "CreativeWork", name, url })) }),
        "description": copy?.lead ?? atlasArticle?.description ?? (point.locationDetail || point.locationSimple),
        "about": [
          {
            "@type": "MedicalEntity",
            "name": point.name,
            "code": {
              "@type": "MedicalCode",
              "code": point.code,
              "codingSystem": "WHO Standard Acupuncture Point",
            },
          },
        ],
        "mainEntity": {
          "@type": "DefinedTerm",
          "@id": `${pageUrl}#term`,
          "name": point.name,
          "alternateName": [...new Set([
            point.kana, point.romaji,
            ...(nameGuide ? [nameGuide.chinese, nameGuide.pinyin] : []),
            ...(point.aliases || []),
          ])].filter(name => name !== point.name),
          ...(nameGuide && { "description": nameGuide.reading }),
          "termCode": point.code,
          "url": pageUrl,
          "inDefinedTermSet": {
            "@type": "DefinedTermSet",
            "name": "WHO標準経穴",
            "url": "https://www.haritaro.jp/tsubo",
          },
        },
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "ホーム",
            "item": "https://www.haritaro.jp",
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "はり太郎のツボ図鑑",
            "item": "https://www.haritaro.jp/tsubo",
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": point.meridianShort,
            "item": `https://www.haritaro.jp/tsubo?meridian=${encodeURIComponent(point.meridianShort)}`,
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": `${point.name}（${point.code}）`,
            "item": pageUrl,
          },
        ],
      },
    ],
  };

  const structuredData = <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />;

  if (isHeguAtlas) {
    return (
      <>
        {structuredData}
        <HeguAtlasPreview point={point} />
      </>
    );
  }

  if (atlasArticle && atlasMarker) {
    return (
      <>
        {structuredData}
        <AcupointAtlasArticle point={point} article={atlasArticle} marker={atlasMarker} meridianPoints={meridianPoints} individualModel={individualModel} />
      </>
    );
  }

  const caution = point.caution || generateCaution(point);
  const nearby = point.nearbyPoints?.length
    ? point.nearbyPoints.map(({ code, relation }) => ({ code, text: relation }))
    : [
      ...(prevPoint ? [{ code: prevPoint.code, text: `${point.meridianShort}で${point.name}の一つ前` }] : []),
      ...(nextPoint ? [{ code: nextPoint.code, text: `${point.meridianShort}で${point.name}の一つ後` }] : []),
    ];

  const featuredPairs = getFeaturedPairs(point.codeLower);
  const otherTraditionalPairs = (point.goldenPairs ?? []).filter(({ partnerCode }) =>
    !featuredPairs.some(({ pointIds }) => pointIds.includes(partnerCode.toLowerCase())),
  );
  const hasNearby = nearby.length > 0 || featuredPairs.some(({ kind }) => kind === "name");
  const hasPairs = hasPointPairs(point);
  const showPairs = hasPairs || otherTraditionalPairs.length > 0;

  return (
    <div className="reading-page acupoint-page page-layout atlas-page min-h-screen [overflow-wrap:anywhere]">
      {/* 構造化データ埋め込み */}
      {structuredData}

      <div className="max-w-5xl mx-auto space-y-5 sm:space-y-8">
        {/* パンくずリスト ＆ 前後経穴クイックナビ */}
        <nav className="flex flex-wrap items-center justify-between gap-2 text-sm text-[#59615D] dark:text-[#AFBDC8] gap-3 flex-wrap">
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
            <Link href="/" className="hover:text-[#1E3D34] dark:hover:text-[#74BA9E] transition-colors">
              ホーム
            </Link>
            <span>/</span>
            <Link href="/tsubo" className="hover:text-[#1E3D34] dark:hover:text-[#74BA9E] transition-colors">
              はり太郎のツボ図鑑
            </Link>
            <span>/</span>
            <Link href={`/tsubo?meridian=${point.meridianShort}`} className="hover:text-[#1E3D34] dark:hover:text-[#74BA9E] transition-colors">
              {point.meridianShort}
            </Link>
            <span>/</span>
            <span className="text-[#232826] dark:text-[#FAF8F5] font-bold">
              {point.name}（{point.code}）
            </span>
          </div>

          {/* 前後のツボへの直接切り替えボタン */}
          <div className="flex min-w-0 flex-wrap items-center gap-2">
            {prevPoint && (
              <Link
                href={`/tsubo/${prevPoint.codeLower}`}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/80 dark:bg-[#17212A]/80 border border-[#E5DEC9] dark:border-[#2A3B4A] hover:border-[#1E3D34] dark:hover:border-[#74BA9E] text-sm font-semibold text-[#404743] dark:text-[#C5D2DB] hover:text-[#1E3D34] dark:hover:text-[#74BA9E] transition-all"
                title={`前の経穴: ${prevPoint.name}（${prevPoint.code}）`}
              >
                <ArrowLeft className="w-3 h-3" />
                <span>{prevPoint.code} {prevPoint.name}</span>
              </Link>
            )}
            {nextPoint && (
              <Link
                href={`/tsubo/${nextPoint.codeLower}`}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/80 dark:bg-[#17212A]/80 border border-[#E5DEC9] dark:border-[#2A3B4A] hover:border-[#1E3D34] dark:hover:border-[#74BA9E] text-sm font-semibold text-[#404743] dark:text-[#C5D2DB] hover:text-[#1E3D34] dark:hover:text-[#74BA9E] transition-all"
                title={`次の経穴: ${nextPoint.name}（${nextPoint.code}）`}
              >
                <span>{nextPoint.code} {nextPoint.name}</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            )}
          </div>
        </nav>

        {/* 1. 基本情報ヘッダーカード */}
        <div className="acupoint-header space-y-5 border-b border-[#E5DEC9] pb-6 dark:border-[#2A3B4A]">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="acupoint-metadata flex flex-wrap items-center gap-2">
                <span className="font-mono text-sm font-bold px-2.5 py-1 rounded-lg bg-[#1E3D34] dark:bg-[#2B6958] text-[#FAF8F5]">
                  {point.code}
                </span>
                <span className="text-sm px-2.5 py-1 rounded-lg bg-[#FAF8F5] dark:bg-[#10171F] border border-[#E8E1D1] dark:border-[#2D3E50] text-[#1E3D34] dark:text-[#74BA9E] font-semibold">
                  {point.meridian}
                </span>
                <span className="text-sm px-2 py-1 rounded-lg bg-[#FAF8F5] dark:bg-[#10171F] border border-[#E8E1D1] dark:border-[#263542] text-[#59615D] dark:text-[#A0B0BC]">
                  {point.bodyPart}
                </span>
              </div>

              {/* 経穴名・読み */}
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 pt-1">
                <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#232826] dark:text-[#FAF8F5] tracking-tight">
                  {point.name}
                </h1>
                <span className="text-sm sm:text-lg text-[#59615D] dark:text-[#A0B0BC] font-medium">
                  {point.kana}
                </span>
                <AcupointKeyPointLinks code={point.codeLower} />
              </div>

              <dl className="grid gap-4 pt-2 text-base leading-relaxed" aria-label={`${point.name}の位置`}>
                <div>
                  <dt className="flex items-center gap-2 text-sm font-bold text-[#1E3D34] dark:text-[#83BEA8]"><Compass aria-hidden="true" className="h-4 w-4" />位置の目安</dt>
                  <dd className="mt-1 text-[#232826] dark:text-[#E6EFEA]">{point.locationSimple}</dd>
                </div>
              </dl>
            </div>

            {/* アクションボタン群（主アクション：配穴追加・クリップ保存、副アクション：推論・比較・復習） */}
            <div className="acupoint-actions">
              {/* 主アクション：配穴処方に追加 */}
              <Link
                href={`/practice/haiketsu?add=${encodeURIComponent(point.name)}`}
                className="acupoint-add-action"
                title="この経穴を配穴設計の処方に組み込む"
              >
                <SlidersHorizontal className="w-4 h-4 text-[#E6C387]" />
                <span>配穴に追加</span>
              </Link>


              <div className="acupoint-utility-actions">
                <a href={`/tsubo/compare?a=${point.codeLower}`} className="acupoint-compare-action">
                  <GitCompare aria-hidden="true" className="h-4 w-4" />比較
                </a>
                <details className="acupoint-learning-actions">
                  <summary><BookOpen aria-hidden="true" className="h-4 w-4" />学習に使う</summary>
                  <div>
                    <Link href={simulatorUrl}>所見から弁証候補を比較<ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
                    <p>経穴名だけで証は決められません。所見に応じて学習条件を選び、教材内の候補を比較します。</p>
                  </div>
                </details>
              </div>
            </div>
          </div>

        </div>

        <AcupointNameGuide code={point.codeLower} />
        <AcupointTopic topic="location">
          <div id="acupoint-location" tabIndex={-1} className="atlas-target space-y-4">
            {illustration && atlasMarker && (
              <PointAtlasLocationFigure point={point} illustration={illustration} marker={atlasMarker} />
            )}
            {point.howToLocate && point.howToLocate.length > 0 && (
              <div className="space-y-3 pt-2">
                <h3 className="font-serif text-sm font-bold text-[#232826] dark:text-[#FAF8F5]">
                  位置を確認する手順
                </h3>
                <ol className="space-y-2 text-base text-[#404743] dark:text-[#C5D2DB]">
                  {point.howToLocate.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-[#1E3D34] dark:bg-[#2B6958] text-white text-sm font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {point.palpationLandmarks && (
              <div className="p-3.5 rounded-xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#22303D] space-y-1.5">
                <h3 className="text-sm font-bold text-[#1E3D34] dark:text-[#74BA9E]">目印になる骨や腱</h3>
                <ul className="list-disc list-inside space-y-1 text-[#59615D] dark:text-[#A0B0BC] text-base">
                  {point.palpationLandmarks.map((lm, i) => (
                    <li key={i}>{lm}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <AcupointLocationRows>
            <AcupointLocationDetails>
              <WhoPointLocation code={point.codeLower} pointName={point.name} />
              {illustration && atlasMarker && (
                <PointAtlasLocationSupplement point={point} meridianPoints={meridianPoints} illustration={illustration} marker={atlasMarker} />
              )}
            </AcupointLocationDetails>
            {point.crossSection?.svgElements?.length ? (
              <AcupointAnatomyDetails>
                <div id={illustration && atlasMarker ? "acupoint-cross-section" : "acupoint-diagram"} className="atlas-target">
                  <CrossSectionViewer
                    model={getPublicCrossSectionModel(point.crossSection)}
                    pointName={point.name}
                    pointCode={point.code}
                    individualModel={individualModel}
                    surface={illustration && atlasMarker && <PointAtlasThumbnail point={point} illustration={illustration} marker={atlasMarker} />}
                  />
                </div>
              </AcupointAnatomyDetails>
            ) : null}
          </AcupointLocationRows>
        </AcupointTopic>

        <AcupointTopic topic="uses">
          <div id="acupoint-traditional" className="scroll-mt-28 bg-[#FFFFFF] dark:bg-[#17212A] rounded-2xl sm:rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-4 sm:p-8 shadow-sm space-y-6 transition-colors">
            {/* 主治症タグ一覧 */}
            <div className="space-y-2">
              <span className="text-sm font-semibold text-[#59615D] dark:text-[#AFBDC8] block">
                伝統資料で関連づけられる症状：
              </span>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {point.indications.map((ind, i) => (
                  <span
                    key={i}
                    className="dictionary-indication"
                  >
                    {ind}
                  </span>
                ))}
              </div>
            </div>

            {/* 臨床応用・取穴のポイント */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#EBF3EF] dark:bg-[#162A24] border border-[#C5DED4] dark:border-[#2A5243] space-y-2">
              <div className="flex items-center gap-2 text-sm font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                <Sparkles className="w-4 h-4 text-[#B86924] dark:text-[#E6C387]" />
                <span>学習上の補足</span>
              </div>
              <p className="text-base text-[#232826] dark:text-[#E6EFEA] leading-relaxed">
                {point.clinicalNote}
              </p>
              <p className="text-base text-[#59615D] dark:text-[#AFBDC8] pt-1">
                伝統的な主治の一覧は、この経穴単独の治療効果や個人への施術適応を示すものではありません。
              </p>
            </div>

            {/* 古典原典の引用 */}
            {point.classicalReferences && point.classicalReferences.length > 0 && (
              <details className="atlas-disclosure atlas-reading-details">
                <summary>古典での記載</summary>
                <div className="space-y-2">
                  {point.classicalReferences.map((cr, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-[#FAF8F5] dark:bg-[#10171F] border border-[#E8E1D1] dark:border-[#22303D] text-sm space-y-1"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 text-[#1E3D34] dark:text-[#74BA9E] font-bold">
                        <span>{cr.book}</span>
                      </div>
                      <p className="font-serif italic text-[#404743] dark:text-[#C5D2DB] text-base">
                        「{cr.quote}」
                      </p>
                      <p className="text-base text-[#59615D] dark:text-[#AFBDC8]">
                        現代語要約：{cr.meaning}
                      </p>
                    </div>
                  ))}
                </div>
              </details>
            )}

            {relatedReading.length > 0 && (
              <nav className="dictionary-related-reading" aria-label="関連する症状ガイド・症例">
                <h3>関連して読む</h3>
                <ul>
                  {relatedReading.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href}><span>{item.kind}</span><strong>{item.title}</strong><ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
                    </li>
                  ))}
                </ul>
                <div className="dictionary-more-links">
                  {relatedSymptoms.length > 0 && <Link href="/symptoms">症状ガイド一覧</Link>}
                  {relatedCases.length > 0 && <Link href="/cases">症例一覧</Link>}
                </div>
              </nav>
            )}

          </div>
        </AcupointTopic>

        <AcupointCareAndResearch>
          <AcupointCautions priority={<>
            {isPregnancyBan && !caution.includes("妊娠") && (
              <p>妊娠中は部位を問わず強い刺激を避け、施術を受ける前に担当の医療機関に相談してください。</p>
            )}
            {isPneumoRisk && !caution.includes("119") && (
              <p><strong>胸郭周囲では鍼で肺などが傷つくおそれがあります。</strong> 施術後に強い息苦しさが出たら、すぐ119番へ連絡してください。胸の痛みや息苦しさが出た場合は、すぐに医療機関を受診してください。</p>
            )}
            <p>{caution}</p>
          </>}>
            {isNeedleBan && <p><strong>古典に刺鍼を禁じる記載がある部位です。</strong> 施術については、はり師・きゅう師に相談してください。</p>}
            {isMoxaBan && <p><strong>古典にお灸を禁じたり、注意を求めたりする記載があります。</strong> 熱傷などのおそれがあるため、自己判断でお灸をしないでください。</p>}
            <p>押したときの痛みや響きだけでツボの位置を判断しないでください。</p>
            <p>{PROCEDURE_PUBLICATION_NOTICE}</p>
          </AcupointCautions>
          <AcupointResearch point={point} anchorId="acupoint-study-overview" />
        </AcupointCareAndResearch>

        {hasNearby && (
          <AcupointTopic topic="nearby">
            <AcupointLocationComparison point={point} related={nearby} />
            <AcupointNameComparison point={point} />
          </AcupointTopic>
        )}

        {showPairs && (
          <AcupointTopic topic="pairs">
            {hasPairs && <AcupointPairNotes point={point} />}
            {otherTraditionalPairs.length > 0 && (
              <details className="atlas-disclosure atlas-reading-details dictionary-golden-pairs" open>
                <summary>伝統的な配穴例</summary>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {otherTraditionalPairs.map((pair, idx) => {
                    const partner = getAcupointByCode(pair.partnerCode);
                    return (
                      <div
                        key={idx}
                        className="dictionary-golden-pair space-y-1.5 flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <span className="text-sm font-bold text-[#B86924] dark:text-[#E6C387]">
                              【{pair.prescriptionName}】
                            </span>
                            {partner ? <Link
                              href={`/tsubo/${partner.codeLower}`}
                              className="text-sm font-bold text-[#1E3D34] dark:text-[#74BA9E] hover:underline inline-flex items-center gap-1"
                            >
                              <span>＋ {pair.partnerName}（{pair.partnerCode}）</span>
                              <ArrowRight className="w-3 h-3" />
                            </Link> : <span className="text-sm font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                              ＋ {pair.partnerName}（{pair.partnerCode}）
                            </span>}
                          </div>
                          <p className="text-base text-[#59615D] dark:text-[#A0B0BC] leading-relaxed mt-1">
                            {pair.effect}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </details>
            )}
          </AcupointTopic>
        )}

        <AcupointReadingLinks code={point.codeLower} />

        {relatedLectures.length > 0 && (
          <section className="dictionary-related-lectures" aria-labelledby="related-lectures-title">
            <div className="dictionary-section-heading">
              <h2 id="related-lectures-title">このツボが登場する読み物</h2>
              <Link href="/curriculum">読み物・演習の目次<ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
            </div>
            <ul>
              {relatedLectures.slice(0, 2).map((lecture) => (
                <li key={lecture.id}>
                  <Link href={`/curriculum/${lecture.id}`}><span>{SERIES[lecture.series].shortName}</span><strong>{lecture.title}</strong><ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <MeridianRelationsDiagram meridian={point.meridian} relations={meridianRelations} />
        <TsuboReviewEntry placement="detail" meridianId={point.meridianId} meridianName={point.meridianShort} />

        {/* 7. 経絡流注ナビゲーション（前穴・次穴） */}
        <TsuboKeyboardNav
          prevUrl={prevPoint ? `/tsubo/${prevPoint.codeLower}` : null}
          nextUrl={nextPoint ? `/tsubo/${nextPoint.codeLower}` : null}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prevPoint ? (
            <Link
              href={`/tsubo/${prevPoint.codeLower}`}
              className="p-4 rounded-2xl bg-[#FFFFFF] dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] hover:border-[#1E3D34] dark:hover:border-[#74BA9E] hover:shadow-sm transition-all group flex flex-wrap items-center justify-between gap-2"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#FAF8F5] dark:bg-[#10171F] text-[#1E3D34] dark:text-[#74BA9E] flex items-center justify-center shrink-0 group-hover:-translate-x-1 transition-transform">
                  <ArrowLeft className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-sm text-[#59615D] dark:text-[#AFBDC8] block">
                    前穴（{point.meridianShort}）
                  </span>
                  <span className="font-serif text-sm font-bold text-[#232826] dark:text-[#FAF8F5]">
                    {prevPoint.name}（{prevPoint.code}）
                  </span>
                </div>
              </div>
            </Link>
          ) : (
            <div className="p-4 rounded-2xl bg-[#FAF8F5]/60 dark:bg-[#121920]/60 border border-dashed border-[#E5DEC9] dark:border-[#22303D] text-sm text-[#8A948F] flex items-center">
              <span>経絡の始点です</span>
            </div>
          )}

          {nextPoint ? (
            <Link
              href={`/tsubo/${nextPoint.codeLower}`}
              className="p-4 rounded-2xl bg-[#FFFFFF] dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] hover:border-[#1E3D34] dark:hover:border-[#74BA9E] hover:shadow-sm transition-all group flex flex-wrap items-center justify-between gap-2"
            >
              <div className="flex items-center gap-3 justify-end text-right">
                <div>
                  <span className="text-sm text-[#59615D] dark:text-[#AFBDC8] block">
                    次穴（{point.meridianShort}）
                  </span>
                  <span className="font-serif text-sm font-bold text-[#232826] dark:text-[#FAF8F5]">
                    {nextPoint.name}（{nextPoint.code}）
                  </span>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#FAF8F5] dark:bg-[#10171F] text-[#1E3D34] dark:text-[#74BA9E] flex items-center justify-center shrink-0 group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ) : (
            <div className="p-4 rounded-2xl bg-[#FAF8F5]/60 dark:bg-[#121920]/60 border border-dashed border-[#E5DEC9] dark:border-[#22303D] text-sm text-[#8A948F] flex items-center justify-end">
              <span>経絡の終点です</span>
            </div>
          )}
        </div>

        <AuthorSupervisorCard />

        <AcupointInformationScope code={point.code} locationSource={point.locationSource} individualModel={individualModel} individuallyEdited={isDetailed} />
        <ContentEndAd key={code} />
      </div>
    </div>
  );
}

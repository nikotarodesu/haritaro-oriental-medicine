import { SHARED_OG_IMAGES, acupointPageTitle, SITE_NAME } from "@/config/seo";
import { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import Link from "next/link";
import { 
  ACUPOINTS_MASTER, 
  getAcupointByCode, 
  getAcupointDetail, 
  getMeridianPoints,
  isDetailedAcupoint,
  DETAILED_ACUPOINTS,
  isContraindicatedNeedle,
  isContraindicatedMoxa,
  isPregnancyContraindicated,
  isChestBackPneumothoraxRisk
} from "@/data/tsubo";
import CrossSectionViewer from "@/components/tsubo/CrossSectionViewer";
import AcupointAtlasArticle from "@/components/tsubo/AcupointAtlasArticle";
import AcupointNameGuide from "@/components/tsubo/AcupointNameGuide";
import AcupointResearch from "@/components/tsubo/AcupointResearch";
import WhoPointLocation from "@/components/tsubo/WhoPointLocation";
import HeguAtlasPreview, { heguAtlasDescription, heguAtlasTitle, heguSources } from "@/components/tsubo/HeguAtlasPreview";
import { ATLAS_ARTICLES } from "@/data/tsubo/atlas/articles";
import { ATLAS_POINT_MARKERS } from "@/data/tsubo/atlas/markers";
import { POINT_ILLUSTRATIONS } from "@/data/tsubo/atlas/illustrations";
import { getAcupointStudies, getClassicalCombinations } from "@/data/tsubo/atlas/evidence";
import { getAcupointName } from "@/data/tsubo/names";
import PointAtlasDiagrams from "@/components/tsubo/atlas/PointAtlasDiagrams";
import type { AcupointMaster } from "@/data/tsubo/types";
import TsuboKeyboardNav from "@/components/tsubo/TsuboKeyboardNav";
import TsuboReviewEntry from '@/components/tsubo/TsuboReviewEntry';
import { 
  Compass, 
  Layers, 
  BookOpen, 
  Sparkles, 
  AlertTriangle, 
  ArrowLeft, 
  ArrowRight, 
  FileText,
  ShieldCheck,
  GitCompare,
  SlidersHorizontal
} from "lucide-react";
import MedicalSafetyNotice from "@/components/MedicalSafetyNotice";
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
import { ACUPOINT_PAGE_REVISED_AT, PAGE_REVISIONS } from "@/config/contentUpdates";

interface Props {
  params: Promise<{ code: string }>;
}

function atlasPageTitle(point: AcupointMaster, topic = "場所と押し方・注意点") {
  return `${point.name}（${point.kana}）の${topic}｜はり太郎のツボ図鑑`;
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

  const isHeguAtlas = point.codeLower === "li4";
  const atlasArticle = ATLAS_ARTICLES[point.codeLower];
  const title = isHeguAtlas ? heguAtlasTitle : atlasArticle ? atlasPageTitle(point, atlasArticle.titleTopic) : acupointPageTitle(point);
  const description = isHeguAtlas ? heguAtlasDescription : atlasArticle?.description ?? `${point.name}（${point.code}）の場所と目印。${point.locationSimple} ${point.meridian}の中での位置、近くのツボ、注意点を紹介します。`;

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: `/tsubo/${point.codeLower}`,
    },
    openGraph: {
      images: SHARED_OG_IMAGES,
      siteName: SITE_NAME,
      title,
      description,
      url: `https://www.haritaro.jp/tsubo/${point.codeLower}`,
    },
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
  const hasSafetyWarning = isNeedleBan || isMoxaBan || isPregnancyBan || isPneumoRisk;

  // 表裏経・同名経の相互トピッククラスタ
  const relationId = point.meridianId === 'governor-vessel' ? 'governor' : point.meridianId === 'conception-vessel' ? 'conception' : point.meridianId;
  const meridianRelations = MERIDIAN_RELATIONS[relationId] || [];

  const pageUrl = `https://www.haritaro.jp/tsubo/${point.codeLower}`;
  const nameGuide = getAcupointName(point.codeLower);
  const isHeguAtlas = point.codeLower === "li4";
  const atlasArticle = ATLAS_ARTICLES[point.codeLower];
  const atlasMarker = ATLAS_POINT_MARKERS[point.codeLower];
  const illustration = POINT_ILLUSTRATIONS[point.codeLower];
  const pageTitle = isHeguAtlas ? heguAtlasTitle : atlasArticle ? atlasPageTitle(point, atlasArticle.titleTopic) : acupointPageTitle(point);
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
        "dateModified": PAGE_REVISIONS[`/tsubo/${point.codeLower}`] ?? ACUPOINT_PAGE_REVISED_AT,
        "publisher": { "@id": "https://www.haritaro.jp/#organization" },
        "editor": { "@type": "Person", "name": "はり太郎", "url": "https://www.haritaro.jp/about" },
        ...(sources.length > 0 && { citation: sources.map(({ name, url }) => ({ "@type": "CreativeWork", name, url })) }),
        "description": isHeguAtlas ? heguAtlasDescription : atlasArticle?.description ?? (point.locationDetail || point.locationSimple),
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
              </div>

              {point.aliases && point.aliases.length > 0 && (
                <p className="text-base text-[#59615D] dark:text-[#AFBDC8]">
                  別名：{point.aliases.join("、")}
                </p>
              )}

              <dl className="grid gap-4 pt-2 text-base leading-relaxed" aria-label={`${point.name}の位置と重要な注意`}>
                <div>
                  <dt className="flex items-center gap-2 text-sm font-bold text-[#1E3D34] dark:text-[#83BEA8]"><Compass aria-hidden="true" className="h-4 w-4" />位置の目安</dt>
                  <dd className="mt-1 text-[#232826] dark:text-[#E6EFEA]">{point.locationSimple}</dd>
                </div>
                <div>
                  <dt className="flex items-center gap-2 text-sm font-bold text-amber-800 dark:text-amber-300"><ShieldCheck aria-hidden="true" className="h-4 w-4" />重要な注意</dt>
                  <dd className="mt-1 text-[#4A534F] dark:text-[#AFBDC8]">{point.caution || "位置や模式図は学習用です。個人の安全な刺入深度・経路や施術適応は判断できません。"}</dd>
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
                <Link href={`/tsubo/compare?a=${point.codeLower}`} className="acupoint-compare-action">
                  <GitCompare aria-hidden="true" className="h-4 w-4" />比較
                </Link>
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

          <TsuboReviewEntry placement="detail" meridianId={point.meridianId} meridianName={point.meridianShort} />

          {/* 要穴分類バッジ群 */}
          {point.categories && point.categories.length > 0 && (
            <div className="acupoint-categories pt-2 border-t border-[#F2ECE0] dark:border-[#22303D] flex flex-wrap items-center gap-2">
              <span className="text-sm font-semibold text-[#59615D] dark:text-[#AFBDC8] mr-1">
                要穴分類：
              </span>
              {point.categories.map((cat, idx) => (
                <span
                  key={idx}
                  className="text-sm px-2.5 py-0.5 rounded-full bg-[#FCF4EB] dark:bg-[#281E15] border border-[#F3DEC5] dark:border-[#423321] text-[#B86924] dark:text-[#E6C387] font-semibold"
                >
                  {cat}
                </span>
              ))}
            </div>
          )}
        </div>

        <nav aria-label="この経穴のページ内目次" className="acupoint-section-nav">
          <a href="#acupoint-location"><Compass aria-hidden="true" className="h-4 w-4" />位置</a>
          {(illustration || !!point.crossSection?.svgElements?.length) && (
            <a href="#acupoint-diagram"><Layers aria-hidden="true" className="h-4 w-4" />図</a>
          )}
          <a href="#acupoint-name"><BookOpen aria-hidden="true" className="h-4 w-4" />名前の由来</a>
          <a href={hasSafetyWarning ? "#acupoint-safety-warning" : "#acupoint-cautions"}><ShieldCheck aria-hidden="true" className="h-4 w-4" />注意事項</a>
          <a href="#acupoint-research"><BookOpen aria-hidden="true" className="h-4 w-4" />研究と古典の配穴</a>
          <a href="#acupoint-sources"><FileText aria-hidden="true" className="h-4 w-4" />出典</a>
        </nav>

        {/* ⚠️ 安全上の注意（禁忌・気胸リスク・妊婦注意アラート） */}
        {hasSafetyWarning && (
          <div id="acupoint-safety-warning" className="scroll-mt-28 rounded-2xl border-2 border-amber-500/40 dark:border-amber-500/50 bg-[#FFFBEB] dark:bg-[#251D12] p-4 sm:p-5 shadow-xs space-y-2.5 transition-colors">
            <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-bold text-sm">
              <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
              <span>先に確認する安全上の注意</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-base leading-relaxed text-[#523E24] dark:text-[#E6D5B8]">
              {isNeedleBan && (
                <div className="p-2.5 rounded-xl bg-red-100/70 dark:bg-red-950/60 border border-red-300 dark:border-red-800 text-red-900 dark:text-red-200">
                  <strong className="block font-bold">伝統資料の刺鍼禁忌の記載</strong>
                  <span>古典での分類と、現代の解剖学にもとづく注意点を分けて読んでください。施術については、はり師・きゅう師に相談してください。</span>
                </div>
              )}
              {isPregnancyBan && (
                <div className="p-2.5 rounded-xl bg-amber-100/70 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200">
                  <strong className="block font-bold">妊娠中の注意（伝統的慎重穴の分類）</strong>
                  <span>この分類は子宮収縮作用を確立した穴の一覧ではありません。全日本鍼灸学会の指針では妊娠中は部位を問わず強刺激を避け、特に腹部周囲へ注意を払います。担当者と必要に応じて主治医へ確認してください。</span>
                </div>
              )}
              {isPneumoRisk && (
                <div className="p-2.5 rounded-xl bg-orange-100/70 dark:bg-orange-950/60 border border-orange-300 dark:border-orange-800 text-orange-900 dark:text-orange-200">
                  <strong className="block font-bold">胸郭周囲の気胸リスク</strong>
                  <span>胸膜・肺などの損傷に注意が必要です。斜刺・横刺や固定の寸数だけでは安全を保証できません。施術のあとに強い息苦しさがあるときは、すぐに119番へ連絡してください。胸の痛みや息苦しさが出たら、すぐに医療機関を受診してください。</span>
                </div>
              )}
              {isMoxaBan && (
                <div className="p-2.5 rounded-xl bg-amber-100/70 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200">
                  <strong className="block font-bold">伝統資料の灸禁忌・注意の記載</strong>
                  <span>古典の禁灸分類と現代の熱傷・感染などの注意は区別します。顔面や皮膚病変などへの施灸は安全指針を確認し、自己灸や未確認手順の再現は避けてください。</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 2. 取穴・位置セクション（一般向け vs WHO標準） */}
        <section id="acupoint-location" className="scroll-mt-28 bg-[#FFFFFF] dark:bg-[#17212A] rounded-2xl sm:rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-4 sm:p-8 shadow-sm space-y-6 transition-colors">
          <div className="flex items-center gap-2 text-base sm:text-lg font-serif font-bold text-[#1E3D34] dark:text-[#74BA9E] border-b border-[#F2ECE0] dark:border-[#22303D] pb-3">
            <Compass className="w-5 h-5" />
            <h2>標準の位置と目印</h2>
          </div>

          <WhoPointLocation code={point.codeLower} pointName={point.name} />

          <p className="text-sm leading-relaxed text-[#59615D] dark:text-[#AFBDC8]">圧痛や響きの有無だけで位置を判断しないでください。体表位置の説明は、個人の安全な刺入経路・深度や施術の適応を示すものではありません。</p>

          {/* 取穴手順ステップ */}
          {illustration && atlasMarker && (
            <PointAtlasDiagrams point={point} meridianPoints={meridianPoints} illustration={illustration} marker={atlasMarker} />
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

          {/* 触診ランドマーク ＆ 混同防止 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-sm">
            {point.palpationLandmarks && (
              <div className="p-3.5 rounded-xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#22303D] space-y-1.5">
                <span className="font-bold text-[#1E3D34] dark:text-[#74BA9E] block">
                  触知する骨・腱目印：
                </span>
                <ul className="list-disc list-inside space-y-1 text-[#59615D] dark:text-[#A0B0BC] text-base">
                  {point.palpationLandmarks.map((lm, i) => (
                    <li key={i}>{lm}</li>
                  ))}
                </ul>
              </div>
            )}

            {point.pitfalls && (
              <div className="p-3.5 rounded-xl bg-[#FDEDEC]/70 dark:bg-[#281816]/70 border border-[#FADBD8] dark:border-[#3E2220] space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-1.5">
                  <span className="font-bold text-[#A83629] dark:text-[#E07A70] flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>位置混同・取穴・施術上の注意点：</span>
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {isContraindicatedNeedle(point.codeLower) && (
                      <span className="px-1.5 py-0.5 rounded text-sm font-bold bg-[#A83629] text-white">
                        禁鍼部位
                      </span>
                    )}
                    {isContraindicatedMoxa(point.codeLower) && (
                      <span className="px-1.5 py-0.5 rounded text-sm font-bold bg-[#B86924] text-white">
                        禁灸・直接灸不可
                      </span>
                    )}
                    {isChestBackPneumothoraxRisk(point.codeLower, point.bodyPart, point.locationDetail) && (
                      <span className="px-1.5 py-0.5 rounded text-sm font-bold bg-[#8B263E] text-white">
                        気胸リスク・深刺厳禁
                      </span>
                    )}
                    {isPregnancyContraindicated(point.codeLower, point.bodyPart) && (
                      <span className="px-1.5 py-0.5 rounded text-sm font-bold bg-[#854D0E] dark:bg-[#A16207] text-white">
                        妊娠中注意
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-[#6D2820] dark:text-[#D9A098] leading-relaxed text-base">
                  {point.pitfalls}
                </p>
              </div>
            )}
          </div>

        </section>

        <AcupointNameGuide code={point.codeLower} />
        <AcupointInformationScope code={point.code} locationSource={point.locationSource} individualModel={individualModel} individuallyEdited={isDetailed} />
        {/* 3. 断面解剖モデル */}
        {point.crossSection && point.crossSection.svgElements && point.crossSection.svgElements.length > 0 && (
          <section id={illustration ? "acupoint-cross-section" : "acupoint-diagram"} className="scroll-mt-28 space-y-6">
            <CrossSectionViewer
              model={getPublicCrossSectionModel(point.crossSection)}
              pointName={point.name}
              pointCode={point.code}
              individualModel={individualModel}
            />

            {/* 近隣経穴リンク（シンプルチップ） */}
            {point.nearbyPoints && point.nearbyPoints.length > 0 && (
              <div className="p-4 rounded-2xl bg-[#FAF8F5] dark:bg-[#10171F] border border-[#E8E1D1] dark:border-[#22303D] space-y-2">
                <span className="text-sm font-semibold text-[#59615D] dark:text-[#A0B0BC] block">
                  同部位・近隣の経穴：
                </span>
                <div className="flex flex-wrap gap-2">
                  {point.nearbyPoints.map((np) => (
                    <Link
                      key={np.code}
                      href={`/tsubo/${np.code.toLowerCase()}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white dark:bg-[#16222C] border border-[#E5DEC9] dark:border-[#2A3B4A] hover:border-[#1E3D34] dark:hover:border-[#74BA9E] text-sm font-medium text-[#232826] dark:text-[#E6EFEA] hover:text-[#1E3D34] transition-all"
                    >
                      <span className="font-mono font-bold text-[#1E3D34] dark:text-[#74BA9E]">{np.code}</span>
                      <span>{np.name}</span>
                      <span className="text-sm text-[#59615D] dark:text-[#AFBDC8]">({np.relation})</span>
                      <ArrowRight className="w-3 h-3 ml-0.5 text-[#59615D]" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {/* 伝統的な主治・配穴例・古典 */}
        <section id="acupoint-traditional" className="scroll-mt-28 bg-[#FFFFFF] dark:bg-[#17212A] rounded-2xl sm:rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-4 sm:p-8 shadow-sm space-y-6 transition-colors">
          <div className="flex items-center gap-2 text-base sm:text-lg font-serif font-bold text-[#1E3D34] dark:text-[#74BA9E] border-b border-[#F2ECE0] dark:border-[#22303D] pb-3">
            <Sparkles className="w-5 h-5 text-[#B86924] dark:text-[#E6C387]" />
            <h2>伝統的な使われ方</h2>
          </div>

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

          <div id="acupoint-cautions" className="scroll-mt-28">
            <MedicalSafetyNotice title="刺鍼・施灸の個別手順は確認待ちです" message={PROCEDURE_PUBLICATION_NOTICE} />
          </div>

          {/* 臨床ゴールデンペア（名配穴・相乗効果） */}
          {point.goldenPairs && point.goldenPairs.length > 0 && (
            <div className="dictionary-golden-pairs space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                <GitCompare className="w-4 h-4 text-[#B86924] dark:text-[#E6C387]" />
                <span>伝統的な配穴例（組み合わせの学習）</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {point.goldenPairs.map((pair, idx) => {
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
            </div>
          )}

          {/* 古典原典の引用 */}
          {point.classicalReferences && point.classicalReferences.length > 0 && (
            <div className="space-y-2.5 pt-1">
              <span className="text-sm font-semibold text-[#59615D] dark:text-[#AFBDC8] block">
                古典原典における記載：
              </span>
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
            </div>
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

        </section>

        <AcupointResearch point={point} />


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

        {/* 8. 免責・出典・更新情報 */}
        <div className="p-4 rounded-2xl bg-[#FAF8F5] dark:bg-[#10171F] border border-[#E8E1D1] dark:border-[#22303D] text-sm text-[#59615D] dark:text-[#AFBDC8] space-y-1.5">
          <div className="flex items-center gap-1.5 font-bold text-[#59615D] dark:text-[#A0B0BC]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#1E3D34] dark:text-[#74BA9E]" />
            <span>出典・確認状況</span>
          </div>
          <p className="leading-relaxed text-base">
            ツボの位置は、WHO『WHO Standard Acupuncture Point Locations in the Western Pacific Region』（2008年）を参照しています。
          </p>
          <p className="text-base text-[#88928D] dark:text-[#6E7D8A]">
            ※当サイトに掲載されている経穴の位置や解説は学術的学習および臨床思考の整理を目的としており、個別の疾患治療は医師・有資格鍼灸師の判断に従ってください。
          </p>
        </div>
        <ContentEndAd key={code} />
      </div>
    </div>
  );
}

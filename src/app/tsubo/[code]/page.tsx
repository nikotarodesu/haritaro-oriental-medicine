import { SHARED_OG_IMAGES, acupointPageTitle } from "@/config/seo";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { 
  ACUPOINTS_MASTER, 
  getAcupointByCode, 
  getAcupointDetail, 
  getMeridianPoints,
  isDetailedAcupoint,
  DETAILED_ACUPOINTS,
  generateFaqLocationAnswer,
  isContraindicatedNeedle,
  isContraindicatedMoxa,
  isPregnancyContraindicated,
  isChestBackPneumothoraxRisk
} from "@/data/tsubo";
import CrossSectionViewer from "@/components/tsubo/CrossSectionViewer";
import ClipButton from "@/components/ClipButton";
import TsuboKeyboardNav from "@/components/tsubo/TsuboKeyboardNav";
import { 
  Compass, 
  MapPin, 
  Layers, 
  BookOpen, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowLeft, 
  ArrowRight, 
  FileText,
  ShieldCheck,
  GitCompare,
  HelpCircle,
  Flame,
  Hand,
  GraduationCap,
  SlidersHorizontal,
  Crosshair
} from "lucide-react";
import MedicalSafetyNotice from "@/components/MedicalSafetyNotice";
import { PROCEDURE_PUBLICATION_NOTICE, getPublicCrossSectionModel } from "@/data/medicalSafety";
import { SYMPTOMS } from "@/data/symptomData";
import { getLecturesForAcupoint } from "@/utils/acupointCurriculumMatcher";
import { getSymptomsForAcupoint, getCasesForAcupoint } from "@/utils/tsuboTopicClusterMatcher";
import { MERIDIAN_RELATIONS } from "@/utils/tsuboRelations";
import AuthorSupervisorCard from "@/components/common/AuthorSupervisorCard";
import AcupointInformationScope from '@/components/tsubo/AcupointInformationScope';

interface Props {
  params: Promise<{ code: string }>;
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

  const title = acupointPageTitle(point);
  const description = `${point.name}（${point.code} / ${point.meridian}）。${point.locationSimple} 位置情報の参照元、伝統的な主治、教育用断面模式図とその適用範囲、注意事項を分けて学べます。`;

  return {
    title,
    description,
    alternates: {
      canonical: `/tsubo/${point.codeLower}`,
    },
    openGraph: {
      images: SHARED_OG_IMAGES,
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

  const isDetailed = isDetailedAcupoint(point.codeLower);
  const individualModel = Boolean(DETAILED_ACUPOINTS[point.codeLower]?.crossSection);

  // 同経脈の経穴リスト（前後の経穴導線用）
  const meridianPoints = getMeridianPoints(point.meridianId);
  const currentIndex = meridianPoints.findIndex((p) => p.codeLower === point.codeLower);
  const prevPoint = currentIndex > 0 ? meridianPoints[currentIndex - 1] : null;
  const nextPoint = currentIndex < meridianPoints.length - 1 ? meridianPoints[currentIndex + 1] : null;

  // 五行判定
  const getMeridianElement = (meridian: string): ("木" | "火" | "土" | "金" | "水")[] => {
    if (meridian.includes("肝") || meridian.includes("胆")) return ["木"];
    if (meridian.includes("心") || meridian.includes("小腸") || meridian.includes("三焦")) return ["火"];
    if (meridian.includes("脾") || meridian.includes("胃")) return ["土"];
    if (meridian.includes("肺") || meridian.includes("大腸")) return ["金"];
    if (meridian.includes("腎") || meridian.includes("膀胱")) return ["水"];
    return [];
  };

  // この経穴が登場する講義（カリキュラム）
  const relatedLectures = getLecturesForAcupoint(point.name, point.code);

  // 経穴名だけを参照として渡す。所属経脈や経穴だけから証を決めない。
  const simulatorUrl = `/simulator?fromTsubo=${encodeURIComponent(point.code)}&tsuboName=${encodeURIComponent(point.name)}`;

  // トピッククラスタ連動（症状ガイド ＆ 臨床症例）
  const relatedSymptoms = getSymptomsForAcupoint(point.codeLower, point.name);
  const relatedCases = getCasesForAcupoint(point.codeLower);

  // 安全・禁忌判定
  const isNeedleBan = isContraindicatedNeedle(point.codeLower);
  const isMoxaBan = isContraindicatedMoxa(point.codeLower);
  const isPregnancyBan = isPregnancyContraindicated(point.codeLower, point.bodyPart);
  const isPneumoRisk = isChestBackPneumothoraxRisk(point.codeLower, point.bodyPart, point.locationDetail);
  const hasSafetyWarning = isNeedleBan || isMoxaBan || isPregnancyBan || isPneumoRisk;

  // 表裏経・同名経の相互トピッククラスタ
  const meridianRelations = MERIDIAN_RELATIONS[point.meridianId] || [];

  // FAQ データ作成（Google FAQPage 構造化データ対応）
  const faqs = [
    {
      question: `「${point.name}（${point.code}）」はどこにありますか？ 取穴のコツは？`,
      answer: generateFaqLocationAnswer(point),
    },
    {
      question: `「${point.name}」はどのような症状・臨床病態に用いられますか？`,
      answer: `伝統的な主治・学習上の関連として「${point.indications.join("、")}」などが挙げられます。${point.meridian}に属します。この一覧は経穴単独の治療効果や、個人への適応を保証するものではありません。臨床研究は対象・比較条件・限界とともに確認してください。`,
    },
  ];

  // FAQ 回答を読みやすく構造化レンダリングするヘルパー
  const renderFaqAnswer = (text: string) => {
    const paragraphs = text.split(/\n\n+/).filter(Boolean);

    // 【〜】を含むブロックがある場合（構造化されたセルフケアガイド等）
    if (paragraphs.some((p) => p.startsWith("【"))) {
      return (
        <div className="space-y-3 pt-1">
          {paragraphs.map((p, pIdx) => {
            const match = p.match(/^【([^】]+)】([\s\S]*)$/);
            if (match) {
              const title = match[1];
              const content = match[2].trim();

              const isWarning =
                title.includes("禁忌") ||
                title.includes("注意") ||
                title.includes("留意") ||
                title.includes("重要") ||
                title.includes("禁止");
              const isAcupressure = title.includes("指圧");
              const isMoxa = title.includes("お灸") || title.includes("灸");

              let cardBg = "bg-white dark:bg-[#16222C] border-[#E8E1D1] dark:border-[#2A3B4A]";
              let badgeColor = "bg-[#1E3D34] text-white dark:bg-[#2B6958]";
              let icon = <CheckCircle2 className="w-3.5 h-3.5 text-[#1E3D34] dark:text-[#74BA9E] shrink-0" />;

              if (isWarning) {
                cardBg = "bg-[#FDEDEC]/70 dark:bg-[#281816]/70 border-[#FADBD8] dark:border-[#3E2220]";
                badgeColor = "bg-[#A83629] text-white";
                icon = <AlertTriangle className="w-3.5 h-3.5 text-[#A83629] dark:text-[#E07A70] shrink-0" />;
              } else if (isAcupressure) {
                cardBg = "bg-[#EBF3EF]/70 dark:bg-[#162A24]/70 border-[#C5DED4] dark:border-[#2A5243]";
                badgeColor = "bg-[#1E3D34] text-white dark:bg-[#2B6958]";
                icon = <Hand className="w-3.5 h-3.5 text-[#1E3D34] dark:text-[#74BA9E] shrink-0" />;
              } else if (isMoxa) {
                cardBg = "bg-[#FEF6EE]/70 dark:bg-[#2A1D13]/70 border-[#FBD8B5] dark:border-[#4E2E19]";
                badgeColor = "bg-[#B86924] text-white";
                icon = <Flame className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387] shrink-0" />;
              }

              return (
                <div
                  key={pIdx}
                  className={`p-3 sm:p-3.5 rounded-xl border ${cardBg} space-y-1.5 transition-colors`}
                >
                  <div className="flex items-center gap-1.5">
                    {icon}
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${badgeColor}`}>
                      {title}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#333835] dark:text-[#C5D2DB] leading-relaxed pl-5">
                    {content}
                  </p>
                </div>
              );
            }

            return (
              <p key={pIdx} className="text-xs sm:text-sm text-[#59615D] dark:text-[#C5D2DB] leading-relaxed">
                {p}
              </p>
            );
          })}
        </div>
      );
    }

    // 通常テキストの場合
    return (
      <div className="space-y-2">
        {paragraphs.map((p, pIdx) => (
          <p key={pIdx} className="text-xs sm:text-sm text-[#59615D] dark:text-[#C5D2DB] leading-relaxed">
            {p}
          </p>
        ))}
      </div>
    );
  };

  const pageUrl = `https://www.haritaro.jp/tsubo/${point.codeLower}`;
  const pageTitle = `${acupointPageTitle(point)} | はり太郎`;

  // JSON-LD 構造化データ（MedicalWebPage ＆ DefinedTerm ＆ BreadcrumbList ＆ FAQPage）
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["WebPage", "MedicalWebPage"],
        "@id": `${pageUrl}#webpage`,
        "url": pageUrl,
        "name": pageTitle,
        "description": point.locationDetail || point.locationSimple,
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
          "alternateName": [point.kana, point.romaji, ...(point.aliases || [])],
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
            "name": "経穴辞典",
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
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        "mainEntity": faqs.map((faq) => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <div className="min-h-screen py-6 sm:py-12 px-3 sm:px-6 lg:px-8">
      {/* 構造化データ埋め込み */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-5xl mx-auto space-y-6 sm:space-y-10">
        
        {/* パンくずリスト ＆ 前後経穴クイックナビ */}
        <nav className="flex items-center justify-between text-xs text-[#737C77] dark:text-[#8899A6] gap-3 flex-wrap">
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
            <Link href="/" className="hover:text-[#1E3D34] dark:hover:text-[#74BA9E] transition-colors">
              ホーム
            </Link>
            <span>/</span>
            <Link href="/tsubo" className="hover:text-[#1E3D34] dark:hover:text-[#74BA9E] transition-colors">
              経穴辞典
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
          <div className="flex items-center gap-2 shrink-0">
            {prevPoint && (
              <Link
                href={`/tsubo/${prevPoint.codeLower}`}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/80 dark:bg-[#17212A]/80 border border-[#E5DEC9] dark:border-[#2A3B4A] hover:border-[#1E3D34] dark:hover:border-[#74BA9E] text-xs font-semibold text-[#404743] dark:text-[#C5D2DB] hover:text-[#1E3D34] dark:hover:text-[#74BA9E] transition-all"
                title={`前の経穴: ${prevPoint.name}（${prevPoint.code}）`}
              >
                <ArrowLeft className="w-3 h-3" />
                <span>{prevPoint.code} {prevPoint.name}</span>
              </Link>
            )}
            {nextPoint && (
              <Link
                href={`/tsubo/${nextPoint.codeLower}`}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/80 dark:bg-[#17212A]/80 border border-[#E5DEC9] dark:border-[#2A3B4A] hover:border-[#1E3D34] dark:hover:border-[#74BA9E] text-xs font-semibold text-[#404743] dark:text-[#C5D2DB] hover:text-[#1E3D34] dark:hover:text-[#74BA9E] transition-all"
                title={`次の経穴: ${nextPoint.name}（${nextPoint.code}）`}
              >
                <span>{nextPoint.code} {nextPoint.name}</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            )}
          </div>
        </nav>

        {/* 1. 基本情報ヘッダーカード */}
        <div className="bg-[#FFFFFF] dark:bg-[#17212A] rounded-2xl sm:rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-4 sm:p-8 shadow-sm space-y-5 transition-colors">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs sm:text-sm font-bold px-2.5 py-1 rounded-lg bg-[#1E3D34] dark:bg-[#2B6958] text-[#FAF8F5]">
                  {point.code}
                </span>
                <span className="text-xs px-2.5 py-1 rounded-lg bg-[#FAF8F5] dark:bg-[#10171F] border border-[#E8E1D1] dark:border-[#2D3E50] text-[#1E3D34] dark:text-[#74BA9E] font-semibold">
                  {point.meridian}
                </span>
                <span className="text-xs px-2 py-1 rounded-lg bg-[#FAF8F5] dark:bg-[#10171F] border border-[#E8E1D1] dark:border-[#263542] text-[#59615D] dark:text-[#A0B0BC]">
                  {point.bodyPart}
                </span>
                {isDetailed ? (
                  <span className="text-xs px-2.5 py-1 rounded-lg bg-[#EBF3EF] dark:bg-[#1A332B] border border-[#C5DED4] dark:border-[#2D5A4A] text-[#1E3D34] dark:text-[#74BA9E] font-bold">
                    個別編集データあり
                  </span>
                ) : (
                  <span className="text-xs px-2 py-1 rounded-lg bg-[#FAF8F5] dark:bg-[#10171F] border border-[#E8E1D1] dark:border-[#2D3E50] text-[#737C77] dark:text-[#8899A6]">
                    標準取穴情報
                  </span>
                )}
              </div>

              {/* 経穴名・読み */}
              <div className="flex items-baseline gap-3 pt-1">
                <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#232826] dark:text-[#FAF8F5] tracking-tight">
                  {point.name}
                </h1>
                <span className="text-sm sm:text-lg text-[#59615D] dark:text-[#A0B0BC] font-medium">
                  {point.kana}
                </span>
              </div>

              {point.aliases && point.aliases.length > 0 && (
                <p className="text-xs text-[#737C77] dark:text-[#8899A6]">
                  別名：{point.aliases.join("、")}
                </p>
              )}
            </div>

            {/* アクションボタン群（主アクション：配穴追加・クリップ保存、副アクション：推論・比較・復習） */}
            <div className="flex items-center gap-2 self-start flex-wrap">
              {/* 主アクション：配穴処方に追加 */}
              <Link
                href={`/practice/haiketsu?add=${encodeURIComponent(point.name)}`}
                className="min-h-11 px-3.5 py-2 rounded-xl bg-[#1E3D34] hover:bg-[#2B5A46] text-[#FAF8F5] text-xs font-bold transition-all inline-flex items-center gap-1.5 shadow-2xs cursor-pointer"
                title="この経穴を配穴設計の処方に組み込む"
              >
                <SlidersHorizontal className="w-4 h-4 text-[#E6C387]" />
                <span>配穴に追加</span>
              </Link>

              {/* 主アクション：マイノート保存 */}
              <ClipButton
                item={{
                  id: `tsubo-${point.id}`,
                  type: "tsubo",
                  title: `${point.name}（${point.code}）`,
                  subTitle: `${point.meridian} | ${point.bodyPart}`,
                  points: [point.name],
                  elements: getMeridianElement(point.meridian),
                  indications: point.indications,
                  summary: point.clinicalNote,
                  caution: point.caution,
                }}
                variant="button"
                size="md"
                className="min-h-11"
              />

              {/* 副アクション群：推論・比較・テスト（スッキリ整理） */}
              <div className="flex items-center gap-1.5 bg-[#FAF8F5] dark:bg-[#121920] p-1 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A]">
                <Link
                  href={simulatorUrl}
                  className="min-h-11 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-[#1E3D34] dark:text-[#74BA9E] hover:bg-[#EBF3EF] dark:hover:bg-[#182823] transition-colors inline-flex items-center gap-1"
                  title={`「${point.name}」を参照しながら弁証の学習条件を選ぶ`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>弁証推論</span>
                </Link>

                <Link
                  href={`/tsubo/compare?a=${point.codeLower}`}
                  className="min-h-11 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-[#59615D] dark:text-[#A0B0BC] hover:text-[#1E3D34] dark:hover:text-[#74BA9E] hover:bg-white dark:hover:bg-[#1A2530] transition-colors inline-flex items-center gap-1"
                  title="この経穴を2穴比較ツールで開く"
                >
                  <GitCompare className="w-3.5 h-3.5" />
                  <span>比較</span>
                </Link>

                <Link
                  href={`/tsubo/practice?course=meridian_${point.meridianId.toLowerCase()}`}
                  className="min-h-11 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-[#B86924] dark:text-[#E6C387] hover:bg-[#FCF4EB] dark:hover:bg-[#2A2016] transition-colors inline-flex items-center gap-1"
                  title="この経脈をクイズで学習"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>復習</span>
                </Link>
              </div>
            </div>
          </div>

          {/* 要穴分類バッジ群 */}
          {point.categories && point.categories.length > 0 && (
            <div className="pt-2 border-t border-[#F2ECE0] dark:border-[#22303D] flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-[#737C77] dark:text-[#8899A6] mr-1">
                要穴分類：
              </span>
              {point.categories.map((cat, idx) => (
                <span
                  key={idx}
                  className="text-xs px-2.5 py-0.5 rounded-full bg-[#FCF4EB] dark:bg-[#281E15] border border-[#F3DEC5] dark:border-[#423321] text-[#B86924] dark:text-[#E6C387] font-semibold"
                >
                  {cat}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* 1.5 LLM / GEO 引用対応・定義文 ＆ ワンペーパー3行要約ブロック */}
        <section
          aria-label={`${point.name}の概要と定義`}
          className="bg-gradient-to-br from-[#F4F9F6] to-[#FAF8F5] dark:from-[#13221C] dark:to-[#17212A] rounded-2xl border border-[#C5DED4]/80 dark:border-[#2D5A4A]/60 p-4 sm:p-6 shadow-2xs space-y-4 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#1E3D34] dark:text-[#74BA9E]" />
              <span>この経穴の要点</span>
            </div>
            <span className="text-[11px] text-[#737C77] dark:text-[#8899A6] hidden sm:inline">
              WHO標準・解剖学的指標準拠
            </span>
          </div>

          {/* GEO / AIO 最適化：直接定義構文（AI検索エンジンが回答元として最優先抜粋） */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-white/95 dark:bg-[#10171F]/90 border border-[#DCE8E2] dark:border-[#263A32] shadow-2xs">
            <p className="text-sm sm:text-base text-[#232826] dark:text-[#E6EFEA] leading-relaxed">
              <strong className="font-bold text-[#1E3D34] dark:text-[#74BA9E]">{point.name}（{point.kana} / {point.code}）とは</strong>、{point.meridian}に属する経穴です。位置の目安は「{point.locationSimple}」。伝統的な主治には<strong>{point.indications.slice(0, 4).join("、")}</strong>などが挙げられます。これは、この経穴単独の治療効果や個人への適応を示すものではありません。
            </p>
          </div>

          {/* 3要点構造化ブロック */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs sm:text-sm leading-relaxed text-[#232826] dark:text-[#FAF8F5]">
            <div className="bg-white/80 dark:bg-[#10171F]/80 p-3.5 rounded-xl border border-[#E8E1D1]/70 dark:border-[#263542]">
              <span className="font-bold text-[#1E3D34] dark:text-[#74BA9E] block mb-1 text-xs sm:text-sm">
                ① 所属と分類
              </span>
              <p className="text-[#4A534F] dark:text-[#A0B0BC]">
                {point.meridian}（{point.code}）。{point.categories && point.categories.length > 0 ? `要穴分類：${point.categories.join("・")}。` : "経脈の正穴として気血の巡りを担う標準経穴。"}
              </p>
            </div>
            <div className="bg-white/80 dark:bg-[#10171F]/80 p-3.5 rounded-xl border border-[#E8E1D1]/70 dark:border-[#263542]">
              <span className="font-bold text-[#1E3D34] dark:text-[#74BA9E] block mb-1 text-xs sm:text-sm">
                ② 取穴と安全
              </span>
              <p className="text-[#4A534F] dark:text-[#A0B0BC]">
                {point.locationSimple}。{point.caution ? `注意：${point.caution}` : "体表の骨・筋の指標を確認。個別の安全性は専門資料と臨床評価で判断してください。"}
              </p>
            </div>
            <div className="bg-white/80 dark:bg-[#10171F]/80 p-3.5 rounded-xl border border-[#E8E1D1]/70 dark:border-[#263542]">
              <span className="font-bold text-[#1E3D34] dark:text-[#74BA9E] block mb-1 text-xs sm:text-sm">
                ③ 主治と臨床作用
              </span>
              <p className="text-[#4A534F] dark:text-[#A0B0BC]">
                {point.indications.slice(0, 5).join("、")}等。{point.clinicalNote ? point.clinicalNote.slice(0, 50) + (point.clinicalNote.length > 50 ? "…" : "") : "経絡の気血を疏通し、関連臓腑と局所の症状を回復。"}
              </p>
            </div>
          </div>
        </section>

        {/* ⚠️ 安全上の注意（禁忌・気胸リスク・妊婦注意アラート） */}
        {hasSafetyWarning && (
          <div className="rounded-2xl border-2 border-amber-500/40 dark:border-amber-500/50 bg-[#FFFBEB] dark:bg-[#251D12] p-4 sm:p-5 shadow-xs space-y-2.5 transition-colors">
            <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-bold text-xs sm:text-sm">
              <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
              <span>安全上の重要警告（臨床運針・セルフケア時の厳守事項）</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-[#523E24] dark:text-[#E6D5B8]">
              {isNeedleBan && (
                <div className="p-2.5 rounded-xl bg-red-100/70 dark:bg-red-950/60 border border-red-300 dark:border-red-800 text-red-900 dark:text-red-200">
                  <strong className="block font-bold">伝統資料の刺鍼禁忌の記載</strong>
                  <span>古典上の分類と、現代の禁忌部位・損傷リスクを分けて確認します。下記の注意事項と原典を確認し、個別手順は専門家確認が完了するまで掲載を保留します。</span>
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
                  <span>胸膜・肺などの損傷に注意が必要です。斜刺・横刺や固定の寸数だけでは安全を保証できません。施術後の胸痛・息苦しさは速やかに受診し、強い呼吸困難では119番への連絡を優先します。</span>
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
        <section className="bg-[#FFFFFF] dark:bg-[#17212A] rounded-2xl sm:rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-4 sm:p-8 shadow-sm space-y-6 transition-colors">
          <div className="flex items-center gap-2 text-base sm:text-lg font-serif font-bold text-[#1E3D34] dark:text-[#74BA9E] border-b border-[#F2ECE0] dark:border-[#22303D] pb-3">
            <Compass className="w-5 h-5" />
            <h2>位置と取穴手順（WHO標準部位・触診指標）</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 一般向け説明 */}
            <div className="p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#22303D] space-y-1.5">
              <span className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] block">
                【一般向け・場所の目安】
              </span>
              <p className="text-xs sm:text-sm text-[#333835] dark:text-[#C5D2DB] leading-relaxed">
                {point.locationSimple}
              </p>
            </div>

            {/* WHO標準部位 */}
            <div className="p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#22303D] space-y-1.5">
              <span className="text-xs font-bold text-[#1E2D3D] dark:text-[#7BAAD8] block">
                【WHO標準部位・専門記載】
              </span>
              <p className="text-xs sm:text-sm text-[#333835] dark:text-[#C5D2DB] leading-relaxed font-mono">
                {point.locationDetail}
              </p>
              <p className="text-[10px] text-[#737C77] dark:text-[#8899A6] pt-1">
                出典：{point.locationSource}
              </p>
            </div>
          </div>

          {/* 取穴手順ステップ */}
          {point.howToLocate && point.howToLocate.length > 0 && (
            <div className="space-y-3 pt-2">
              <h3 className="font-serif text-sm font-bold text-[#232826] dark:text-[#FAF8F5]">
                ステップバイステップ取穴手順
              </h3>
              <ol className="space-y-2 text-xs sm:text-sm text-[#404743] dark:text-[#C5D2DB]">
                {point.howToLocate.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#1E3D34] dark:bg-[#2B6958] text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* 触診ランドマーク ＆ 混同防止 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
            {point.palpationLandmarks && (
              <div className="p-3.5 rounded-xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#22303D] space-y-1.5">
                <span className="font-bold text-[#1E3D34] dark:text-[#74BA9E] block">
                  触知する骨・腱目印：
                </span>
                <ul className="list-disc list-inside space-y-1 text-[#59615D] dark:text-[#A0B0BC]">
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
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#A83629] text-white">
                        禁鍼部位
                      </span>
                    )}
                    {isContraindicatedMoxa(point.codeLower) && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#B86924] text-white">
                        禁灸・直接灸不可
                      </span>
                    )}
                    {isChestBackPneumothoraxRisk(point.codeLower, point.bodyPart, point.locationDetail) && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#8B263E] text-white">
                        気胸リスク・深刺厳禁
                      </span>
                    )}
                    {isPregnancyContraindicated(point.codeLower, point.bodyPart) && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#854D0E] dark:bg-[#A16207] text-white">
                        妊娠中注意
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-[#6D2820] dark:text-[#D9A098] leading-relaxed text-[11px] sm:text-xs">
                  {point.pitfalls}
                </p>
              </div>
            )}
          </div>

          {/* 骨度寸法ガイドへのクイック参照リンク */}
          <div className="pt-3 border-t border-[#F2ECE0] dark:border-[#22303D] flex items-center justify-between text-xs">
            <span className="text-[#737C77] dark:text-[#8899A6] flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-[#1E3D34] dark:text-[#74BA9E]" />
              <span>取穴の基準（何寸）に迷ったら：</span>
            </span>
            <Link
              href="/tsubo/basics/bone-cun"
              className="text-[#1E3D34] dark:text-[#74BA9E] font-bold hover:underline inline-flex items-center gap-1"
            >
              <span>全身の骨度寸法ガイドを見る</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </section>

        <AcupointInformationScope code={point.code} locationSource={point.locationSource} individualModel={individualModel} />
        {/* 3. 断面解剖モデル */}
        {point.crossSection && point.crossSection.svgElements && point.crossSection.svgElements.length > 0 && (
          <section className="space-y-6">
            <CrossSectionViewer
              model={getPublicCrossSectionModel(point.crossSection)}
              pointName={point.name}
              pointCode={point.code}
              individualModel={individualModel}
            />

            {/* 近隣経穴リンク（シンプルチップ） */}
            {point.nearbyPoints && point.nearbyPoints.length > 0 && (
              <div className="p-4 rounded-2xl bg-[#FAF8F5] dark:bg-[#10171F] border border-[#E8E1D1] dark:border-[#22303D] space-y-2">
                <span className="text-xs font-semibold text-[#59615D] dark:text-[#A0B0BC] block">
                  同部位・近隣の経穴：
                </span>
                <div className="flex flex-wrap gap-2">
                  {point.nearbyPoints.map((np) => (
                    <Link
                      key={np.code}
                      href={`/tsubo/${np.code.toLowerCase()}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white dark:bg-[#16222C] border border-[#E5DEC9] dark:border-[#2A3B4A] hover:border-[#1E3D34] dark:hover:border-[#74BA9E] text-xs font-medium text-[#232826] dark:text-[#E6EFEA] hover:text-[#1E3D34] transition-all"
                    >
                      <span className="font-mono font-bold text-[#1E3D34] dark:text-[#74BA9E]">{np.code}</span>
                      <span>{np.name}</span>
                      <span className="text-[10px] text-[#737C77] dark:text-[#8899A6]">({np.relation})</span>
                      <ArrowRight className="w-3 h-3 ml-0.5 text-[#737C77]" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {/* 4. 臨床知見・主治・EBM研究エビデンス */}
        <section className="bg-[#FFFFFF] dark:bg-[#17212A] rounded-2xl sm:rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-4 sm:p-8 shadow-sm space-y-6 transition-colors">
          <div className="flex items-center gap-2 text-base sm:text-lg font-serif font-bold text-[#1E3D34] dark:text-[#74BA9E] border-b border-[#F2ECE0] dark:border-[#22303D] pb-3">
            <Sparkles className="w-5 h-5 text-[#B86924] dark:text-[#E6C387]" />
            <h2>{point.researchEvidence ? "臨床知見・適応症・現代科学エビデンス" : "臨床知見・主治適応症"}</h2>
          </div>

          {/* 主治症タグ一覧 */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-[#737C77] dark:text-[#8899A6] block">
              主治・適応症（伝統的効果）：
            </span>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {point.indications.map((ind, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-lg bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#263542] text-xs font-medium text-[#232826] dark:text-[#E6EFEA]"
                >
                  {ind}
                </span>
              ))}
            </div>
          </div>

          {/* 臨床応用・取穴のポイント */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#EBF3EF] dark:bg-[#162A24] border border-[#C5DED4] dark:border-[#2A5243] space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E]">
              <Sparkles className="w-4 h-4 text-[#B86924] dark:text-[#E6C387]" />
              <span>臨床応用・運針のポイント（臨床的考察）</span>
            </div>
            <p className="text-xs sm:text-sm text-[#232826] dark:text-[#E6EFEA] leading-relaxed">
              {point.clinicalNote}
            </p>
            <p className="text-[10px] text-[#737C77] dark:text-[#8899A6] pt-1">
              ※伝統的な鍼灸臨床の知見および文献的考察に基づく参考情報です。実際の施術にあたっては患者個々の体格・病態や触診所見を最優先としてください。
            </p>
          </div>

          <MedicalSafetyNotice title="刺鍼・施灸の個別手順は確認待ちです" message={PROCEDURE_PUBLICATION_NOTICE} />

          {/* 臨床ゴールデンペア（名配穴・相乗効果） */}
          {point.goldenPairs && point.goldenPairs.length > 0 && (
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#FAF8F5] to-[#F3EFE6] dark:from-[#152028] dark:to-[#17222B] border border-[#DED6C5] dark:border-[#2D3E50] space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                <GitCompare className="w-4 h-4 text-[#B86924] dark:text-[#E6C387]" />
                <span>伝統的な配穴例（組み合わせの学習）</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {point.goldenPairs.map((pair, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-white dark:bg-[#121920] border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-1.5 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#B86924] dark:text-[#E6C387]">
                          【{pair.prescriptionName}】
                        </span>
                        <Link
                          href={`/tsubo/${pair.partnerCode.toLowerCase()}`}
                          className="text-[11px] font-bold text-[#1E3D34] dark:text-[#74BA9E] hover:underline inline-flex items-center gap-1"
                        >
                          <span>＋ {pair.partnerName}（{pair.partnerCode}）</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                      <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed mt-1">
                        {pair.effect}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* EBM・科学研究エビデンス */}
          {point.researchEvidence && (
            <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#22303D] space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#1E2D3D] dark:text-[#7BAAD8]">
                <BookOpen className="w-4 h-4 text-[#B86924] dark:text-[#E6C387]" />
                <span>研究の対象・結果・適用範囲</span>
              </div>
              <p className="text-xs sm:text-sm text-[#333835] dark:text-[#C5D2DB] leading-relaxed">
                {point.researchEvidence.findings}
              </p>
              <div className="space-y-1 pt-1">
                <span className="text-[11px] font-bold text-[#59615D] dark:text-[#A0B0BC] block">
                  研究で扱った観察・条件：
                </span>
                <ul className="list-disc list-inside space-y-0.5 text-xs text-[#59615D] dark:text-[#A0B0BC]">
                  {point.researchEvidence.mechanisms.map((m, i) => (
                    <li key={i}>{m}</li>
                  ))}
                </ul>
              </div>
              <p className="text-[10px] text-[#737C77] dark:text-[#8899A6] border-t border-[#E8DEC9] dark:border-[#22303D] pt-2">
                限界と注意：{point.researchEvidence.limitations}
              </p>
            </div>
          )}

          {/* 古典原典の引用 */}
          {point.classicalReferences && point.classicalReferences.length > 0 && (
            <div className="space-y-2.5 pt-1">
              <span className="text-xs font-semibold text-[#737C77] dark:text-[#8899A6] block">
                古典原典における記載：
              </span>
              <div className="space-y-2">
                {point.classicalReferences.map((cr, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-[#FAF8F5] dark:bg-[#10171F] border border-[#E8E1D1] dark:border-[#22303D] text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between text-[#1E3D34] dark:text-[#74BA9E] font-bold">
                      <span>{cr.book}</span>
                    </div>
                    <p className="font-serif italic text-[#404743] dark:text-[#C5D2DB]">
                      「{cr.quote}」
                    </p>
                    <p className="text-[11px] text-[#737C77] dark:text-[#8899A6]">
                      現代語要約：{cr.meaning}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 弁証シミュレーターへの逆引き推論カード */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#FAF8F5] via-[#EBF3EF]/40 to-[#FAF8F5] dark:from-[#152028] dark:via-[#182823]/40 dark:to-[#152028] border border-[#C5DED4] dark:border-[#2A5243] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                <Layers className="w-4 h-4 text-[#B86924] dark:text-[#E6C387]" />
                <span>経穴から弁証の学習へ</span>
              </div>
              <h4 className="font-serif font-bold text-sm sm:text-base text-[#232826] dark:text-[#FAF8F5]">
                「{point.name}」を参照しながら条件を比較する
              </h4>
              <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                経穴名だけで八綱・気血水・臓腑の証を決めることはできません。所見に応じて学習条件を選び、教材内の配穴候補がどう変わるか比較できます。
              </p>
            </div>
            <Link
              href={simulatorUrl}
              className="shrink-0 px-4 py-2.5 rounded-xl bg-[#1E3D34] hover:bg-[#2B5A46] text-[#FAF8F5] text-xs font-bold shadow-xs inline-flex items-center gap-1.5 transition-all"
            >
              <span>学習条件を選ぶ</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* お悩み・症状別ガイド ＆ 臨床症例 トピッククラスタ連動 */}
          {(relatedSymptoms.length > 0 || relatedCases.length > 0) && (
            <div className="space-y-3 pt-2">
              <span className="text-xs font-semibold text-[#737C77] dark:text-[#8899A6] block">
                関連する症状ガイド・臨床症例：
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* 症状ガイドリンク */}
                {relatedSymptoms.map((sym) => (
                  <Link
                    key={sym.id}
                    href={`/symptoms#${sym.id}`}
                    className="p-3.5 rounded-xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#22303D] hover:border-[#1E3D34] dark:hover:border-[#74BA9E] transition-all group flex flex-col justify-between"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#FCF4EB] text-[#B86924] dark:bg-[#231A12] dark:text-[#E6C387]">
                          症状ガイド：{sym.category}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#737C77] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] group-hover:translate-x-0.5 transition-all" />
                      </div>
                      <h5 className="font-serif font-bold text-xs sm:text-sm text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] transition-colors">
                        {sym.title}
                      </h5>
                      <p className="text-[11px] text-[#737C77] dark:text-[#8899A6] line-clamp-2">
                        {sym.summary}
                      </p>
                    </div>
                    <span className="text-[10px] font-semibold text-[#1E3D34] dark:text-[#74BA9E] mt-2 block">
                      食養生・生活習慣アドバイスを見る →
                    </span>
                  </Link>
                ))}

                {/* 臨床症例リンク */}
                {relatedCases.map((cs) => (
                  <Link
                    key={cs.id}
                    href={`/cases/${cs.id}`}
                    className="p-3.5 rounded-xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#22303D] hover:border-[#2C5282] dark:hover:border-[#90CDF4] transition-all group flex flex-col justify-between"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#EEF2F6] text-[#2C5282] dark:bg-[#1E2C3B] dark:text-[#90CDF4]">
                          臨床症例：{cs.pattern}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#737C77] group-hover:text-[#2C5282] dark:group-hover:text-[#90CDF4] group-hover:translate-x-0.5 transition-all" />
                      </div>
                      <h5 className="font-serif font-bold text-xs sm:text-sm text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#2C5282] dark:group-hover:text-[#90CDF4] transition-colors">
                        {cs.title}
                      </h5>
                      <p className="text-[11px] text-[#737C77] dark:text-[#8899A6] line-clamp-2">
                        {cs.explanation}
                      </p>
                    </div>
                    <span className="text-[10px] font-semibold text-[#2C5282] dark:text-[#90CDF4] mt-2 block">
                      症例カルテ・弁証論治を読む →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* 禁忌・臨床上の注意事項 */}
          {point.caution && (
            <div className="p-3.5 sm:p-4 rounded-xl bg-[#FDEDEC] dark:bg-[#231816] border border-[#FADBD8] dark:border-[#3D2220] text-[#A83629] dark:text-[#C47A72] text-xs space-y-1">
              <div className="flex items-center gap-1.5 font-bold">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>臨床上の禁忌・安全留意事項</span>
              </div>
              <p className="leading-relaxed pl-5.5">{point.caution}</p>
            </div>
          )}
        </section>

        {/* 5. よくある質問（FAQ） */}
        <section className="bg-[#FFFFFF] dark:bg-[#17212A] rounded-2xl sm:rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-4 sm:p-8 shadow-sm space-y-4 sm:space-y-6 transition-colors">
          <div className="flex items-center gap-2 text-base sm:text-lg font-serif font-bold text-[#1E3D34] dark:text-[#74BA9E] border-b border-[#F2ECE0] dark:border-[#22303D] pb-3">
            <HelpCircle className="w-5 h-5 text-[#B86924] dark:text-[#E6C387]" />
            <h2>{point.name}（{point.code}）に関するよくある質問（FAQ）</h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <details
                key={idx}
                className="group rounded-xl border border-[#E8E1D1] dark:border-[#22303D] bg-[#FAF8F5] dark:bg-[#10171F] p-3.5 sm:p-4 text-xs sm:text-sm [&_summary::-webkit-details-marker]:hidden"
                open={idx === 0}
              >
                <summary className="flex cursor-pointer items-center justify-between font-bold text-[#232826] dark:text-[#FAF8F5] gap-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E]">Q{idx + 1}.</span>
                    <span>{faq.question}</span>
                  </div>
                  <span className="text-[#737C77] dark:text-[#8899A6] group-open:rotate-180 transition-transform text-xs">▼</span>
                </summary>
                <div className="mt-2.5 pt-2.5 border-t border-[#EAE3D4] dark:border-[#22303D] pl-2 sm:pl-6">
                  {renderFaqAnswer(faq.answer)}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* 6. この経穴が登場する講義教材（カリキュラム連動） */}
        {relatedLectures.length > 0 && (
          <section className="bg-[#FFFFFF] dark:bg-[#17212A] rounded-2xl sm:rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-4 sm:p-8 shadow-sm space-y-4 sm:space-y-6 transition-colors">
            <div className="flex items-center justify-between border-b border-[#F2ECE0] dark:border-[#22303D] pb-3">
              <div className="flex items-center gap-2 text-base sm:text-lg font-serif font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                <GraduationCap className="w-5 h-5 text-[#B86924] dark:text-[#E6C387]" />
                <h2>この経穴が登場する講義教材（全81講義カリキュラム）</h2>
              </div>
              <Link
                href="/curriculum"
                className="text-xs font-semibold text-[#1E3D34] dark:text-[#74BA9E] hover:underline flex items-center gap-1"
              >
                <span>全講義一覧へ</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {relatedLectures.map((lec) => (
                <Link
                  key={lec.id}
                  href={lec.url}
                  className="p-4 rounded-xl border border-[#E8E1D1] dark:border-[#22303D] bg-[#FAF8F5] dark:bg-[#10171F] hover:border-[#1E3D34] dark:hover:border-[#74BA9E] transition-all group flex flex-col justify-between space-y-2 shadow-2xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#83BEA8]">
                        {lec.stageTitle}
                      </span>
                      {lec.seriesTitle && (
                        <span className="text-[10px] text-[#737C77] dark:text-[#8899A6]">
                          {lec.seriesTitle}
                        </span>
                      )}
                      <span className="text-[10px] text-[#737C77] dark:text-[#8899A6] ml-auto">
                        約{lec.duration}
                      </span>
                    </div>
                    <h3 className="font-serif font-bold text-sm sm:text-base text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] transition-colors leading-snug">
                      {lec.title}
                    </h3>
                    <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] line-clamp-2 leading-relaxed">
                      {lec.excerpt}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-[#EAE3D4] dark:border-[#22303D] flex items-center justify-between text-xs text-[#1E3D34] dark:text-[#74BA9E] font-medium">
                    <span>講義を読んで理論を深掘りする</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* 6.8. 表裏経・同名経トピッククラスタ（陰陽ペア・手足同名ペア） */}
        {meridianRelations.length > 0 && (
          <section className="bg-[#FFFFFF] dark:bg-[#17212A] rounded-2xl sm:rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-4 sm:p-8 shadow-sm space-y-4 sm:space-y-6 transition-colors">
            <div className="flex items-center justify-between border-b border-[#F2ECE0] dark:border-[#22303D] pb-3">
              <div className="flex items-center gap-2 text-base sm:text-lg font-serif font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                <Layers className="w-5 h-5 text-[#B86924] dark:text-[#E6C387]" />
                <h2>表裏経・同名経の連動ネットワーク（陰陽・手足ペア）</h2>
              </div>
              <span className="text-xs text-[#737C77] dark:text-[#8899A6]">
                配穴・弁証の連動経絡
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {meridianRelations.map((rel, rIdx) => (
                <div
                  key={rIdx}
                  className="p-4 rounded-xl border border-[#E8E1D1] dark:border-[#22303D] bg-[#FAF8F5] dark:bg-[#10171F] space-y-3 shadow-2xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E]">
                      {rel.relationType}：{rel.pairedName}
                    </span>
                    <Link
                      href={`/tsubo?meridian=${encodeURIComponent(rel.pairedShort)}`}
                      className="text-xs text-[#B86924] dark:text-[#E6C387] font-semibold hover:underline flex items-center gap-1"
                    >
                      <span>一覧へ</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                  <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                    {rel.explanation}
                  </p>
                  <div className="pt-2 border-t border-[#EAE3D4] dark:border-[#22303D] flex items-center gap-2 flex-wrap">
                    <span className="text-[11px] font-semibold text-[#737C77] dark:text-[#8899A6]">
                      代表要穴：
                    </span>
                    {rel.keyPoints.map((kp) => (
                      <Link
                        key={kp.code}
                        href={`/tsubo/${kp.code}`}
                        className="text-xs font-semibold px-2 py-0.5 rounded-md bg-white dark:bg-[#17212A] border border-[#D5CCBC] dark:border-[#2D3E50] text-[#1E3D34] dark:text-[#74BA9E] hover:border-[#1E3D34] transition-all"
                      >
                        {kp.name}（{kp.code.toUpperCase()}）
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 7. 経絡流注ナビゲーション（前穴・次穴） */}
        <TsuboKeyboardNav
          prevUrl={prevPoint ? `/tsubo/${prevPoint.codeLower}` : null}
          nextUrl={nextPoint ? `/tsubo/${nextPoint.codeLower}` : null}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prevPoint ? (
            <Link
              href={`/tsubo/${prevPoint.codeLower}`}
              className="p-4 rounded-2xl bg-[#FFFFFF] dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] hover:border-[#1E3D34] dark:hover:border-[#74BA9E] hover:shadow-sm transition-all group flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#FAF8F5] dark:bg-[#10171F] text-[#1E3D34] dark:text-[#74BA9E] flex items-center justify-center shrink-0 group-hover:-translate-x-1 transition-transform">
                  <ArrowLeft className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-[#737C77] dark:text-[#8899A6] block">
                    前穴（{point.meridianShort}）
                  </span>
                  <span className="font-serif text-sm font-bold text-[#232826] dark:text-[#FAF8F5]">
                    {prevPoint.name}（{prevPoint.code}）
                  </span>
                </div>
              </div>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono font-bold text-[#737C77] dark:text-[#8899A6] bg-[#FAF8F5] dark:bg-[#121920] border border-[#E5DEC9] dark:border-[#2A3B4A] rounded">
                [
              </kbd>
            </Link>
          ) : (
            <div className="p-4 rounded-2xl bg-[#FAF8F5]/60 dark:bg-[#121920]/60 border border-dashed border-[#E5DEC9] dark:border-[#22303D] text-xs text-[#8A948F] flex items-center">
              <span>経絡の始点です</span>
            </div>
          )}

          {nextPoint ? (
            <Link
              href={`/tsubo/${nextPoint.codeLower}`}
              className="p-4 rounded-2xl bg-[#FFFFFF] dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] hover:border-[#1E3D34] dark:hover:border-[#74BA9E] hover:shadow-sm transition-all group flex items-center justify-between"
            >
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono font-bold text-[#737C77] dark:text-[#8899A6] bg-[#FAF8F5] dark:bg-[#121920] border border-[#E5DEC9] dark:border-[#2A3B4A] rounded">
                ]
              </kbd>
              <div className="flex items-center gap-3 justify-end text-right">
                <div>
                  <span className="text-[10px] text-[#737C77] dark:text-[#8899A6] block">
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
            <div className="p-4 rounded-2xl bg-[#FAF8F5]/60 dark:bg-[#121920]/60 border border-dashed border-[#E5DEC9] dark:border-[#22303D] text-xs text-[#8A948F] flex items-center justify-end">
              <span>経絡の終点です</span>
            </div>
          )}
        </div>

        {/* 6. 次のアクション：この経穴を臨床・学習で深める */}
        <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#FAF8F5] via-[#EBF3EF]/40 to-[#FAF8F5] dark:from-[#17212A] dark:via-[#162922]/30 dark:to-[#17212A] border border-[#C5DED4] dark:border-[#2A5243] space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#B86924] dark:text-[#E6C387]" />
            <h3 className="font-serif text-sm sm:text-base font-bold text-[#232826] dark:text-[#FAF8F5]">
              「{point.name}」を臨床・学習でさらに活用する
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link
              href={`/practice/haiketsu?acupoint=${encodeURIComponent(point.name)}`}
              className="p-3.5 rounded-xl bg-white dark:bg-[#121920] border border-[#E5DEC9] dark:border-[#2A3B4A] hover:border-[#1E3D34] dark:hover:border-[#74BA9E] hover:shadow-xs transition-all group flex flex-col justify-between space-y-2"
            >
              <div className="space-y-1">
                <span className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] flex items-center gap-1">
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  配穴設計ツール
                </span>
                <p className="text-[11px] text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                  本治・標治のツボ組み合わせを設計し、バランスを点検
                </p>
              </div>
              <span className="text-[11px] font-bold text-[#1E3D34] dark:text-[#74BA9E] group-hover:underline inline-flex items-center gap-0.5">
                配穴を試す →
              </span>
            </Link>

            <Link
              href="/kokushi"
              className="p-3.5 rounded-xl bg-white dark:bg-[#121920] border border-[#E5DEC9] dark:border-[#2A3B4A] hover:border-[#1E2D3D] dark:hover:border-[#7BAAD8] hover:shadow-xs transition-all group flex flex-col justify-between space-y-2"
            >
              <div className="space-y-1">
                <span className="text-xs font-bold text-[#1E2D3D] dark:text-[#7BAAD8] flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5" />
                  国試対策演習
                </span>
                <p className="text-[11px] text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                  {point.meridianShort}・要穴・取穴のオリジナル演習・間隔復習
                </p>
              </div>
              <span className="text-[11px] font-bold text-[#1E2D3D] dark:text-[#7BAAD8] group-hover:underline inline-flex items-center gap-0.5">
                問題を解く →
              </span>
            </Link>

            <Link
              href="/notes"
              className="p-3.5 rounded-xl bg-white dark:bg-[#121920] border border-[#E5DEC9] dark:border-[#2A3B4A] hover:border-[#B86924] dark:hover:border-[#E6C387] hover:shadow-xs transition-all group flex flex-col justify-between space-y-2"
            >
              <div className="space-y-1">
                <span className="text-xs font-bold text-[#B86924] dark:text-[#E6C387] flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5" />
                  マイノート
                </span>
                <p className="text-[11px] text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                  このツボを自分の臨床ノートや配穴メモに保存・蓄積
                </p>
              </div>
              <span className="text-[11px] font-bold text-[#B86924] dark:text-[#E6C387] group-hover:underline inline-flex items-center gap-0.5">
                ノートを見る →
              </span>
            </Link>
          </div>
        </div>

        {/* 7. E-E-A-T 専門家監修情報カード */}
        <AuthorSupervisorCard topic={`${point.name}（${point.code}）の経穴解説・取穴・臨床応用`} />

        {/* 8. 免責・出典・更新情報 */}
        <div className="p-4 rounded-2xl bg-[#FAF8F5] dark:bg-[#10171F] border border-[#E8E1D1] dark:border-[#22303D] text-[11px] text-[#737C77] dark:text-[#8899A6] space-y-1.5">
          <div className="flex items-center gap-1.5 font-bold text-[#59615D] dark:text-[#A0B0BC]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#1E3D34] dark:text-[#74BA9E]" />
            <span>出典・確認状況</span>
          </div>
          <p className="leading-relaxed">
            本人確認の担当：はり太郎｜ 個別の取穴・図版・医学記述の確認と承認は未完了です。<br />
            位置情報の参照元：WHO Standard Acupuncture Point Locations in the Western Pacific Region (2008)。参照元の記載だけでは、全経穴の照合完了を意味しません。
          </p>
          <p className="text-[10px] text-[#88928D] dark:text-[#6E7D8A]">
            ※当サイトに掲載されている経穴の位置や解説は学術的学習および臨床思考の整理を目的としており、個別の疾患治療は医師・有資格鍼灸師の判断に従ってください。
          </p>
        </div>

      </div>
    </div>
  );
}

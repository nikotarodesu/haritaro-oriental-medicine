import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { 
  ACUPOINTS_MASTER, 
  getAcupointByCode, 
  getAcupointDetail, 
  getMeridianPoints 
} from "@/data/tsubo";
import CrossSectionViewer from "@/components/tsubo/CrossSectionViewer";
import LocalPointMapSvg from "@/components/tsubo/LocalPointMapSvg";
import ClipButton from "@/components/ClipButton";
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
  GitCompare
} from "lucide-react";

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
      title: "経穴が見つかりません | はり太郎の東洋医学",
      description: "指定された経穴コードは存在しないか、準備中です。",
    };
  }

  const title = `${point.name}（${point.code}）の場所・取穴・解剖｜はり太郎の経穴辞典`;
  const description = `${point.name}（${point.code} / ${point.meridian}）。${point.locationSimple} WHO標準取穴部位、浅深連動の解剖断面構造、主治適応症、はり太郎の臨床知見を完全網羅。`;

  return {
    title,
    description,
    alternates: {
      canonical: `/tsubo/${point.codeLower}`,
    },
    openGraph: {
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

  // JSON-LD 構造化データ
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": `${point.name}（${point.code}）`,
    "description": point.locationDetail,
    "url": `https://www.haritaro.jp/tsubo/${point.codeLower}`,
    "mainEntity": {
      "@type": "MedicalCondition",
      "name": point.name,
      "alternateName": [point.kana, point.romaji, ...(point.aliases || [])],
      "possibleTreatment": point.indications.map((ind) => ({
        "@type": "MedicalTherapy",
        "name": ind,
      })),
    },
  };

  return (
    <div className="min-h-screen py-6 sm:py-12 px-3 sm:px-6 lg:px-8">
      {/* 構造化データ埋め込み */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-5xl mx-auto space-y-6 sm:space-y-10">
        
        {/* パンくずリスト ＆ 戻るリンク */}
        <nav className="flex items-center justify-between text-xs text-[#737C77] dark:text-[#8899A6]">
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

          <Link
            href="/tsubo"
            className="inline-flex items-center gap-1 text-[#1E3D34] dark:text-[#74BA9E] font-medium hover:underline shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">経穴一覧へ戻る</span>
          </Link>
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
                {point.hasDetailedAnatomy && (
                  <span className="text-[10px] sm:text-xs px-2 py-1 rounded-lg bg-[#FCF4EB] dark:bg-[#2A2016] border border-[#F3DEC5] dark:border-[#4D331F] text-[#B86924] dark:text-[#E6C387] font-bold flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>詳細断面解剖 収録</span>
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
                <span className="text-xs sm:text-sm font-mono text-[#8A948F] dark:text-[#6A7C8B]">
                  ({point.romaji})
                </span>
              </div>

              {point.aliases && point.aliases.length > 0 && (
                <p className="text-xs text-[#737C77] dark:text-[#8899A6]">
                  別名：{point.aliases.join("、")}
                </p>
              )}
            </div>

            {/* アクションボタン群（保存・比較・学習） */}
            <div className="flex items-center gap-2 self-start flex-wrap">
              <Link
                href={`/tsubo/compare?a=${point.codeLower}`}
                className="px-3 py-2 rounded-xl border border-[#D8CFC0] dark:border-[#2A3B4A] hover:border-[#1E3D34] bg-[#FAF8F5] dark:bg-[#10171F] text-xs font-semibold text-[#1E3D34] dark:text-[#74BA9E] transition-all inline-flex items-center gap-1.5"
                title="この経穴を2穴比較ツールで開く"
              >
                <GitCompare className="w-4 h-4" />
                <span>2穴比較</span>
              </Link>

              <Link
                href={`/tsubo/practice?course=meridian_${point.meridianId.toLowerCase()}`}
                className="px-3 py-2 rounded-xl border border-[#D8CFC0] dark:border-[#2A3B4A] hover:border-[#B86924] bg-[#FAF8F5] dark:bg-[#10171F] text-xs font-semibold text-[#B86924] dark:text-[#E6C387] transition-all inline-flex items-center gap-1.5"
                title="この経脈をクイズで学習"
              >
                <BookOpen className="w-4 h-4" />
                <span>復習・テスト</span>
              </Link>

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
              />
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
              <div className="p-3.5 rounded-xl bg-[#FDEDEC]/70 dark:bg-[#281816]/70 border border-[#FADBD8] dark:border-[#3E2220] space-y-1.5">
                <span className="font-bold text-[#A83629] dark:text-[#E07A70] flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>位置混同・取穴の注意点：</span>
                </span>
                <p className="text-[#6D2820] dark:text-[#D9A098] leading-relaxed text-[11px] sm:text-xs">
                  {point.pitfalls}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* 3. 局所解剖図 ＆ 断面解剖モデル */}
        <section className="space-y-6">
          {/* 局所位置図（近隣経穴プロット） */}
          <LocalPointMapSvg
            pointCode={point.code}
            pointName={point.name}
            nearbyPoints={point.nearbyPoints}
          />

          {/* 断面解剖インタラクティブモデル */}
          {point.crossSection && (
            <CrossSectionViewer
              model={point.crossSection}
              pointName={point.name}
              pointCode={point.code}
            />
          )}
        </section>

        {/* 4. 臨床知見・主治・EBM研究エビデンス */}
        <section className="bg-[#FFFFFF] dark:bg-[#17212A] rounded-2xl sm:rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-4 sm:p-8 shadow-sm space-y-6 transition-colors">
          <div className="flex items-center gap-2 text-base sm:text-lg font-serif font-bold text-[#1E3D34] dark:text-[#74BA9E] border-b border-[#F2ECE0] dark:border-[#22303D] pb-3">
            <Sparkles className="w-5 h-5 text-[#B86924] dark:text-[#E6C387]" />
            <h2>臨床知見・適応症・現代科学エビデンス</h2>
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

          {/* はり太郎の臨床知見 */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#EBF3EF] dark:bg-[#162A24] border border-[#C5DED4] dark:border-[#2A5243] space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E]">
              <Sparkles className="w-4 h-4 text-[#B86924] dark:text-[#E6C387]" />
              <span>はり太郎の臨床知見（経験的観察）</span>
            </div>
            <p className="text-xs sm:text-sm text-[#232826] dark:text-[#E6EFEA] leading-relaxed">
              {point.clinicalNote}
            </p>
            <p className="text-[10px] text-[#737C77] dark:text-[#8899A6] pt-1">
              ※本項目の内容は執筆者本人の臨床実践・観察に基づく経験的知見であり、すべての症例における効果を保証するものではありません。
            </p>
          </div>

          {/* EBM・科学研究エビデンス */}
          {point.researchEvidence && (
            <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#22303D] space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#1E2D3D] dark:text-[#7BAAD8]">
                <BookOpen className="w-4 h-4 text-[#B86924] dark:text-[#E6C387]" />
                <span>現代神経科学・解剖学的機序（EBM研究知見）</span>
              </div>
              <p className="text-xs sm:text-sm text-[#333835] dark:text-[#C5D2DB] leading-relaxed">
                {point.researchEvidence.findings}
              </p>
              <div className="space-y-1 pt-1">
                <span className="text-[11px] font-bold text-[#59615D] dark:text-[#A0B0BC] block">
                  解明されている主な生理機序：
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

        {/* 5. 経絡流注ナビゲーション（前穴・次穴） */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prevPoint ? (
            <Link
              href={`/tsubo/${prevPoint.codeLower}`}
              className="p-4 rounded-2xl bg-[#FFFFFF] dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] hover:border-[#1E3D34] dark:hover:border-[#74BA9E] hover:shadow-sm transition-all group flex items-center gap-3"
            >
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
              <div className="text-right">
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
            </Link>
          ) : (
            <div className="p-4 rounded-2xl bg-[#FAF8F5]/60 dark:bg-[#121920]/60 border border-dashed border-[#E5DEC9] dark:border-[#22303D] text-xs text-[#8A948F] flex items-center justify-end">
              <span>経絡の終点です</span>
            </div>
          )}
        </div>

        {/* 6. 免責・監修・更新情報 */}
        <div className="p-4 rounded-2xl bg-[#FAF8F5] dark:bg-[#10171F] border border-[#E8E1D1] dark:border-[#22303D] text-[11px] text-[#737C77] dark:text-[#8899A6] space-y-1.5">
          <div className="flex items-center gap-1.5 font-bold text-[#59615D] dark:text-[#A0B0BC]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#1E3D34] dark:text-[#74BA9E]" />
            <span>監修・出典・更新情報</span>
          </div>
          <p className="leading-relaxed">
            執筆・解剖考証：はり太郎（鍼灸師・鍼灸院院長）｜ 最終検証：2026年9月<br />
            採用標準：WHO Standard Acupuncture Point Locations in the Western Pacific Region (2008)
          </p>
          <p className="text-[10px] text-[#88928D] dark:text-[#6E7D8A]">
            ※当サイトに掲載されている経穴の位置や解説は学術的学習および臨床思考の整理を目的としており、個別の疾患治療は医師・有資格鍼灸師の判断に従ってください。
          </p>
        </div>

      </div>
    </div>
  );
}

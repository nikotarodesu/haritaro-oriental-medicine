import Link from "next/link";
import PageIntro from "@/components/design/PageIntro";
import { 
  GitCommit, 
  ArrowLeft, 
  BookOpen, 
  Compass, 
} from "lucide-react";
import type { KikeiVessel } from "@/data/kikeiData";
import KikeiPathwaySvg from "@/components/kikei/KikeiPathwaySvg";
import KikeiQuizSection from "@/components/kikei/KikeiQuizSection";
import KikeiEvidenceNote from "@/components/kikei/KikeiEvidenceNote";

interface Props {
  vessel: KikeiVessel;
}

export default function KikeiDetailClient({ vessel }: Props) {
  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#10161C] text-[#232826] dark:text-[#FAF8F5]">
      {/* ナビゲーションバー */}
      <div className="bg-white dark:bg-[#17212A] border-b border-[#E5DEC9] dark:border-[#2A3B4A] sticky top-0 z-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <Link
            href="/kikei"
            className="inline-flex min-h-11 items-center gap-1.5 text-sm font-bold text-[#737C77] dark:text-[#8899A6] hover:text-[#232826] dark:hover:text-[#FAF8F5] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>奇経八脈一覧へ</span>
          </Link>

        </div>
      </div>

      <div className="page-layout page-layout--reading space-y-8">
        
        <section className="space-y-5">
          <PageIntro compact eyebrow={vessel.category} title={vessel.name} art="points" description={<><span className="block text-sm">{vessel.reading}{vessel.pointsCount ? ' ・ 固有穴 ' + vessel.pointsCount + '穴' : ''}</span><span className="mt-2 block">{vessel.nature}</span></>} />
          {/* 八脈交会穴ハイライトボックス */}
          <div className="bg-[#FAF8F5] dark:bg-[#121920] rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-4 sm:p-5 mt-4">
            <div className="flex items-center gap-2 mb-2">
              <Compass className="w-4 h-4 text-[#B86924]" />
              <span className="text-xs font-bold text-[#B86924] dark:text-[#E6C387] uppercase tracking-wider">
                八脈交会穴（通穴）
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-white dark:bg-[#17212A] p-3 rounded-lg border border-[#E5DEC9] dark:border-[#2A3B4A]">
                <span className="text-xs text-[#737C77] block">本脈に通ずる穴（主穴）</span>
                <span className="text-base font-bold text-[#1E3D34] dark:text-[#74BA9E]">{vessel.masterPoint.name}</span>
                <span className="text-xs text-[#737C77] ml-1">({vessel.masterPoint.meridian} / {vessel.masterPoint.code})</span>
              </div>
              <div className="bg-white dark:bg-[#17212A] p-3 rounded-lg border border-[#E5DEC9] dark:border-[#2A3B4A]">
                <span className="text-xs text-[#737C77] block">対となる交会穴（配穴）</span>
                <span className="text-base font-bold text-[#B86924] dark:text-[#E6C387]">{vessel.couplePoint.name}</span>
                <span className="text-xs text-[#737C77] ml-1">({vessel.couplePoint.meridian} / {vessel.couplePoint.code})</span>
              </div>
            </div>
            <p className="text-xs text-[#59615D] dark:text-[#96A6B2] mt-3">
              <strong>ペア名:</strong> {vessel.pairName}（伝統的な関連部位: <strong>{vessel.pairTargetArea}</strong>）
            </p>
          </div>
        </section>

        {/* 流注SVGダイアグラム */}
        <KikeiPathwaySvg vessel={vessel} />

        {/* 流注・走行ルート */}
        <div className="bg-white dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-[#E5DEC9] dark:border-[#2A3B4A] pb-3">
            <GitCommit className="w-5 h-5 text-[#1E3D34] dark:text-[#74BA9E]" />
            <h2 className="font-serif text-xl font-bold text-[#232826] dark:text-[#FAF8F5]">
              流注・循行経路
            </h2>
          </div>

          <div className="space-y-3 pt-2">
            {vessel.pathway.map((step, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#FCF4EB] dark:bg-[#2A1E14] text-[#B86924] dark:text-[#E6C387] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <p className="text-xs sm:text-sm text-[#404743] dark:text-[#C5D2DB] leading-relaxed">
                  {step}
                </p>
              </div>
            ))}
          </div>

          {vessel.pointsList && vessel.pointsList.length > 0 && (
            <div className="pt-4 border-t border-[#E5DEC9] dark:border-[#2A3B4A] space-y-2">
              <span className="text-xs font-bold text-[#737C77] dark:text-[#8899A6] block">
                主な交会・通過経穴:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {vessel.pointsList.map((pt, i) => (
                  <span
                    key={i}
                    className="text-xs px-2.5 py-1 rounded-lg bg-[#FAF8F5] dark:bg-[#151D25] text-[#232826] dark:text-[#FAF8F5] border border-[#E5DEC9] dark:border-[#2A3B4A]"
                  >
                    {pt}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 主治病証 ＆ 臨床の勘所 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 主治病証 */}
          <div className="bg-white dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 shadow-sm space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#232826] dark:text-[#FAF8F5] border-b border-[#E5DEC9] dark:border-[#2A3B4A] pb-3">
              伝統的な主治病証
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#59615D] dark:text-[#96A6B2]">
              {vessel.indications.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B86924] shrink-0 mt-2" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 臨床要点 */}
          <div className="bg-white dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 shadow-sm space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#232826] dark:text-[#FAF8F5] border-b border-[#E5DEC9] dark:border-[#2A3B4A] pb-3">
              伝統的な配穴と、効果の評価範囲
            </h3>
            <p className="text-xs sm:text-sm text-[#404743] dark:text-[#C5D2DB] leading-relaxed">
              {vessel.clinicalTips}
            </p>
          </div>
        </div>

        <KikeiEvidenceNote />
        {/* 古典条文（難経・素問） */}
        <div className="bg-[#FAF8F5] dark:bg-[#151D25] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#B86924]" />
            <h3 className="font-serif text-base sm:text-lg font-bold text-[#232826] dark:text-[#FAF8F5]">
              古典条文：『{vessel.classicQuote.book}』{vessel.classicQuote.chapter}
            </h3>
          </div>

          <div className="bg-white dark:bg-[#11171E] p-4 sm:p-5 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-3">
            <p className="font-serif text-sm sm:text-base font-bold text-[#232826] dark:text-[#FAF8F5] leading-relaxed tracking-wide">
              {vessel.classicQuote.text}
            </p>
            <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#96A6B2] leading-relaxed pt-2 border-t border-[#E5DEC9]/60 dark:border-[#2A3B4A]/60">
              <strong>現代語訳:</strong> {vessel.classicQuote.translation}
            </p>
          </div>
        </div>

        {/* 八脈交会穴 臨床演習チェック */}
        <KikeiQuizSection vessel={vessel} />

      </div>

    </div>
  );
}

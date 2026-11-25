import Link from "next/link";
import PageIntro from "@/components/design/PageIntro";
import { 
  ArrowLeft, 
  BookOpen, 
  Compass, 
} from "lucide-react";
import type { KikeiVessel } from "@/data/kikeiData";
import KikeiPathwaySvg from "@/components/kikei/KikeiPathwaySvg";
import KikeiQuizSection from "@/components/kikei/KikeiQuizSection";

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
                <span className="text-xs text-[#737C77] block">{vessel.name}に対応するツボ</span>
                <Link className="text-base font-bold text-[#1E3D34] underline dark:text-[#74BA9E]" href={"/tsubo/" + vessel.masterPoint.code.toLowerCase() + "#acupoint-location"}>{vessel.masterPoint.name}</Link>
                <span className="text-xs text-[#737C77] ml-1">({vessel.masterPoint.meridian} / {vessel.masterPoint.code})</span>
              </div>
              <div className="bg-white dark:bg-[#17212A] p-3 rounded-lg border border-[#E5DEC9] dark:border-[#2A3B4A]">
                <span className="text-xs text-[#737C77] block">組み合わせるツボ</span>
                <Link className="text-base font-bold text-[#B86924] underline dark:text-[#E6C387]" href={"/tsubo/" + vessel.couplePoint.code.toLowerCase() + "#acupoint-location"}>{vessel.couplePoint.name}</Link>
                <span className="text-xs text-[#737C77] ml-1">({vessel.couplePoint.meridian} / {vessel.couplePoint.code})</span>
              </div>
            </div>
            <p className="text-xs text-[#59615D] dark:text-[#96A6B2] mt-3">
              古典で関連づける部位　<strong>{vessel.pairTargetArea}</strong>
            </p>
          </div>
        </section>

        {/* 流注SVGダイアグラム */}
        <KikeiPathwaySvg vessel={vessel} />

        {vessel.pointsList && vessel.pointsList.length > 0 && (
          <section className="space-y-2 rounded-2xl border border-frame bg-card p-5">
            <h2 className="font-serif text-base font-bold">経路の主な目印になるツボ</h2>
            <ul className="flex flex-wrap gap-1.5 text-sm">
              {vessel.pointsList.map(point => <li key={point} className="rounded-md bg-panel px-2 py-1">{point}</li>)}
            </ul>
          </section>
        )}

        {/* 古典条文（難経・素問） */}
        <div className="bg-[#FAF8F5] dark:bg-[#151D25] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#B86924]" />
            <h2 className="font-serif text-base sm:text-lg font-bold text-[#232826] dark:text-[#FAF8F5]">
              『{vessel.classicQuote.book}』{vessel.classicQuote.chapter}の記述
            </h2>
          </div>

          <div className="bg-white dark:bg-[#11171E] p-4 sm:p-5 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-3">
            <p className="font-serif text-sm sm:text-base font-bold text-[#232826] dark:text-[#FAF8F5] leading-relaxed tracking-wide">
              {vessel.classicQuote.text}
            </p>
            <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#96A6B2] leading-relaxed pt-2 border-t border-[#E5DEC9]/60 dark:border-[#2A3B4A]/60">
              {vessel.classicQuote.translation}
            </p>
          </div>
        </div>

        <section className="space-y-3 rounded-2xl border border-frame bg-card p-5">
          <h2 className="font-serif text-lg font-bold">伝統的な組み合わせと関連研究</h2>
          <p className="text-sm leading-relaxed">{vessel.clinicalTips}</p>
          <Link href="/kikei#kikei-research" className="atlas-source-link">鍼の研究で調べたこと</Link>
        </section>

        <KikeiQuizSection vessel={vessel} />

      </div>

    </div>
  );
}

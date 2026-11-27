import Link from "next/link";
import PageBreadcrumb from "@/components/design/PageBreadcrumb";
import { getKikeiPathway } from "@/data/kikeiPathways";
import PageIntro from "@/components/design/PageIntro";
import { 
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
      <div className="page-layout page-layout--reading space-y-8">
        <PageBreadcrumb items={[{ href: "/kikei", name: "奇経八脈" }, { href: "/kikei/" + vessel.slug, name: vessel.name }]} hideCurrent />
        <section className="space-y-5">
          <PageIntro compact eyebrow={vessel.category} title={vessel.name} art="points" description={<><span className="block text-sm">{vessel.reading}{vessel.pointsCount ? ' ・ 固有穴 ' + vessel.pointsCount + '穴' : ''}</span><span className="mt-2 block">{vessel.nature}</span></>}>
            <div className="page-actions"><a href="#kikei-pathway" className="page-primary-action">流注図を見る</a><a href="#kikei-quiz" className="page-secondary-action">本文を見ながら解く</a>
              <Link href={"/kikei/" + vessel.slug + "/quiz"} className="ui-text-link inline-flex min-h-11 items-center">答えを隠して挑戦</Link></div>
          </PageIntro>
          {/* 八脈交会穴ハイライトボックス */}
          <div id="kikei-meeting-points" className="scroll-mt-28 bg-[#FAF8F5] dark:bg-[#121920] rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-4 sm:p-5 mt-4">
            <div className="flex items-center gap-2 mb-2">
              <Compass className="w-4 h-4 text-[#B86924]" />
              <span className="text-xs font-bold text-[#B86924] dark:text-[#E6C387] uppercase tracking-wider">
                八脈交会穴（通穴）
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-white dark:bg-[#17212A] p-3 rounded-lg border border-[#E5DEC9] dark:border-[#2A3B4A]">
                <span className="text-xs text-muted block">{vessel.name}に対応するツボ</span>
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
              <Link href="/library#classic-classic-taisei-hachimyaku" className="ml-2 inline-flex min-h-11 items-center text-accent underline underline-offset-4">『鍼灸大成』の八脈交会穴の歌を読む</Link>
            </p>
          </div>
        </section>

        {/* 流注SVGダイアグラム */}
        <KikeiPathwaySvg vessel={vessel} config={getKikeiPathway(vessel.slug)} />

        {vessel.pointsList && vessel.pointsList.length > 0 && (
          <section className="space-y-2 rounded-2xl border border-frame bg-card p-5">
            <h2 className="font-serif text-base font-bold">経路の主な目印になるツボ</h2>
            <ul className="flex flex-wrap gap-1.5 text-sm">
              {vessel.pointsList.map(point => <li key={point} className="rounded-md bg-panel px-2 py-1">{point}</li>)}
            </ul>
          </section>
        )}

        {/* 古典条文（難経・素問） */}
        <div id="kikei-classic" className="scroll-mt-28 bg-[#FAF8F5] dark:bg-[#151D25] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-8 space-y-4">
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

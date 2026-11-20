import React from "react";
import Link from "next/link";
import PageIntro from "@/components/design/PageIntro";
import { Metadata } from "next";
import { 
  GitCommit, 
  Layers, 
  BookOpen, 
  ArrowRight, 
} from "lucide-react";
import { KIKEI_VESSELS, HACHIMYAKU_PAIRS } from "@/data/kikeiData";
import { pageSocialMetadata } from "@/config/seo";
import KikeiEvidenceNote from "@/components/kikei/KikeiEvidenceNote";

const pageTitle = "奇経八脈（きけいはちみゃく）詳説・八脈交会穴";
const pageDescription = "奇経八脈（督脈・任脈・衝脈・帯脈・陰陽蹻脈・陰陽維脈）の流注と、八脈交会穴4対の伝統的な主治・配穴を学ぶ資料集。正経十二経脈との関係や古典の説明を確認できます。";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  ...pageSocialMetadata(pageTitle, pageDescription, "/kikei"),
};

export default function KikeiIndexPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#10161C] text-[#232826] dark:text-[#FAF8F5]">
      <div className="page-layout page-layout--intro">
        <PageIntro compact eyebrow="8つの脈・4つの組み合わせ" title="奇経八脈と八脈交会穴" art="points" description="学びたい脈を選び、流注図・交会穴・伝統的な説明を確認します。">
          <div className="page-actions"><a href="#eight-vessels" className="page-primary-action"><GitCommit aria-hidden="true" className="h-4 w-4" />8脈から選ぶ<ArrowRight aria-hidden="true" className="h-4 w-4" /></a><a href="#four-pairs" className="page-secondary-action"><Layers aria-hidden="true" className="h-4 w-4" />交会穴の4対を見る</a></div>
        </PageIntro>
        <details className="page-help"><summary>奇経八脈のたとえと、鍼の研究</summary><p className="text-sm leading-relaxed">伝統理論では十二経脈を水路、奇経八脈をあふれた水を受ける貯水池にたとえます。ここでいう気血は、血液量や自律神経の測定値とは別の概念です。図では八つの脈が通る場所と、公孫・内関など八脈交会穴の四つの組み合わせを読めます。</p><KikeiEvidenceNote /></details>
      </div>

      <div className="page-layout page-layout--continuation space-y-12">
        {/* セクション 1: 全8脈の体系別カード */}
        <div id="eight-vessels" className="space-y-6 scroll-mt-28">
          <div className="flex flex-wrap items-end justify-between gap-2 border-b border-[#E5DEC9] dark:border-[#2A3B4A] pb-3">
            <div>
              <span className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider block">
                Eight Extraordinary Meridians
              </span>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#232826] dark:text-[#FAF8F5]">
                奇経八脈（全8脈）一覧
              </h2>
            </div>
            <p className="text-xs text-[#737C77] dark:text-[#8899A6]">
              固有の経穴を持つ脈（督脈・任脈）と、交会穴のみで構成される6脈
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {KIKEI_VESSELS.map(vessel => (
              <Link
                key={vessel.slug}
                href={`/kikei/${vessel.slug}`}
                className="group bg-white dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-5 hover:border-[#B86924] transition-colors flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        vessel.category === "陽奇経"
                          ? "bg-[#FCF4EB] text-[#B86924] dark:bg-[#2A1E14] dark:text-[#E6C387]"
                          : "bg-[#EBF3EF] text-[#1E3D34] dark:bg-[#182823] dark:text-[#74BA9E]"
                      }`}>
                        {vessel.category}
                      </span>
                    </div>
                    {vessel.pointsCount ? (
                      <span className="text-xs text-[#737C77] dark:text-[#8899A6]">
                        固有穴 {vessel.pointsCount}穴
                      </span>
                    ) : (
                      <span className="text-xs text-[#737C77] dark:text-[#8899A6]">
                        交会穴系
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="page-link-icon"><GitCommit aria-hidden="true" /></span>
                    <div>
                    <h3 className="font-serif text-xl font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#B86924] transition-colors">
                      {vessel.name}
                    </h3>
                    <p className="text-xs text-[#737C77] dark:text-[#8899A6]">
                      {vessel.reading}
                    </p>
                    </div>
                  </div>

                  <p className="text-xs text-[#59615D] dark:text-[#96A6B2] line-clamp-3 leading-relaxed">
                    {vessel.nature}
                  </p>

                  <div className="pt-2 border-t border-[#E5DEC9]/50 dark:border-[#2A3B4A]/50">
                    <div className="text-xs text-[#737C77] dark:text-[#8899A6]">
                      <span>通穴: </span>
                      <strong className="text-[#232826] dark:text-[#FAF8F5]">{vessel.masterPoint.name}</strong>
                      <span className="text-xs text-[#737C77] ml-1">({vessel.masterPoint.code})</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between text-xs font-bold text-[#B86924] dark:text-[#E6C387]">
                  <span>流注図と演習を開く</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* セクション 2: 八脈交会穴（4大黄金ペア） */}
        <div id="four-pairs" className="space-y-6 scroll-mt-28">
          <div className="flex flex-wrap items-end justify-between gap-2 border-b border-[#E5DEC9] dark:border-[#2A3B4A] pb-3">
            <div>
              <span className="text-xs font-bold text-[#B86924] dark:text-[#E6C387] uppercase tracking-wider block">
                Clinical Master Pairs
              </span>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#232826] dark:text-[#FAF8F5]">
                八脈交会穴（八法交会穴）4対の配穴
              </h2>
            </div>
            <p className="text-xs text-[#737C77] dark:text-[#8899A6]">
              手足の8つの経穴を組み合わせる、奇経八脈の配穴法
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {HACHIMYAKU_PAIRS.map(pair => (
              <div 
                key={pair.id}
                className="bg-white dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-5 sm:p-6 shadow-sm hover:border-[#B86924] transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-[#FCF4EB] dark:bg-[#2A1E14] text-[#B86924] dark:text-[#E6C387] border border-[#F3DEC5] dark:border-[#4A321E]">
                      伝統的な関連部位: {pair.targetArea}
                    </span>
                    <span className="text-xs text-[#737C77] dark:text-[#8899A6]">
                      {pair.master1.vessel} ✕ {pair.master2.vessel}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-[#232826] dark:text-[#FAF8F5]">
                    {pair.name}
                  </h3>

                  {/* 穴位バッジ */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <div className="bg-[#FAF8F5] dark:bg-[#121920] p-2.5 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A]">
                      <span className="text-xs text-[#737C77] dark:text-[#8899A6] block">{pair.master1.vessel}に通ず</span>
                      <span className="font-bold text-sm text-[#1E3D34] dark:text-[#74BA9E]">{pair.master1.point}</span>
                      <span className="text-xs text-[#737C77] ml-1">({pair.master1.meridian})</span>
                    </div>
                    <div className="bg-[#FAF8F5] dark:bg-[#121920] p-2.5 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A]">
                      <span className="text-xs text-[#737C77] dark:text-[#8899A6] block">{pair.master2.vessel}に通ず</span>
                      <span className="font-bold text-sm text-[#B86924] dark:text-[#E6C387]">{pair.master2.point}</span>
                      <span className="text-xs text-[#737C77] ml-1">({pair.master2.meridian})</span>
                    </div>
                  </div>

                  <p className="text-xs text-[#59615D] dark:text-[#96A6B2] leading-relaxed">
                    {pair.clinicalSignificance}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#E5DEC9]/60 dark:border-[#2A3B4A]/60 flex flex-wrap gap-1">
                  {pair.indications.map((ind, i) => (
                    <span key={i} className="text-xs px-2 py-0.5 rounded bg-[#FAF8F5] dark:bg-[#151D25] text-[#737C77] dark:text-[#8899A6]">
                      {ind}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 難経における奇経八脈の意義 */}
        <div className="bg-[#FAF8F5] dark:bg-[#151D25] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#B86924]" />
            <h3 className="font-serif text-base sm:text-lg font-bold text-[#232826] dark:text-[#FAF8F5]">
              『難経』第二十七難に見る奇経の哲学
            </h3>
          </div>
          <blockquote className="border-l-3 border-[#B86924] pl-4 italic text-xs sm:text-sm text-[#59615D] dark:text-[#96A6B2] leading-relaxed">
            「聖人図設溝渠，通利水道，以備不然。天雨降下，溝渠溢満，当此之時，霶霈妄行，聖人不能復図也。此絡脈満溢，諸経不能復拘也。」<br />
            （古代の賢人は水路を整備して洪水を防いだ。しかし大雨が降って水路が溢れたとき、水は奔流となって溢れ出る。経絡の気血が満ち溢れたとき、十二経脈だけでは収容できず、これを受け止めるのが奇経八脈である。）
          </blockquote>
        </div>

      </div>
    </div>
  );
}

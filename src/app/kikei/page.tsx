import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { 
  Sparkles, 
  GitCommit, 
  Compass, 
  Layers, 
  BookOpen, 
  ArrowRight, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Zap
} from "lucide-react";
import { KIKEI_VESSELS, HACHIMYAKU_PAIRS } from "@/data/kikeiData";

export const metadata: Metadata = {
  title: "奇経八脈（きけいはちみゃく）詳説・八脈交会穴 | はり太郎の東洋医学",
  description: "正経十二経脈の気血の過不足を調整する「奇経八脈（督脈・任脈・衝脈・帯脈・陰陽蹻脈・陰陽維脈）」と、臨床で著効を示す八脈交会穴4対の流注・主治病証・配穴を完全体系化。",
};

export default function KikeiIndexPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#10161C] text-[#232826] dark:text-[#FAF8F5]">
      {/* ヒーローセクション */}
      <div className="bg-white dark:bg-[#17212A] border-b border-[#E5DEC9] dark:border-[#2A3B4A] py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#FCF4EB] dark:bg-[#2A1E14] text-[#B86924] dark:text-[#E6C387] border border-[#F3DEC5] dark:border-[#4A321E]">
              <GitCommit className="w-3.5 h-3.5" />
              <span>生体エネルギーの貯水池</span>
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] font-medium border border-[#C5DED4] dark:border-[#2A5243]">
              全8脈・八脈交会穴（4対）完全網羅
            </span>
          </div>

          <div className="space-y-3">
            <h1 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-[#232826] dark:text-[#FAF8F5]">
              奇経八脈（きけいはちみゃく）と八脈交会穴
            </h1>
            <p className="text-sm sm:text-base text-[#59615D] dark:text-[#96A6B2] max-w-3xl leading-relaxed">
              正経十二経脈を「縦横に流れる溝渠（河川）」に例えるなら、奇経八脈は「湖や貯水池」。正経の気血が溢れたときに蓄え、不足したときに補うことで、生体の動的平衡を保ちます。臨床では「八脈交会穴」を介して頑固な慢性病や自律神経失調に即効性を発揮します。
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-12">
        
        {/* セクション 1: 八脈交会穴（4大黄金ペア） */}
        <div className="space-y-6">
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
              四肢の8要穴で奇経八脈を駆動する臨床配穴法
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
                      適応領域: {pair.targetArea}
                    </span>
                    <span className="text-[11px] text-[#737C77] dark:text-[#8899A6]">
                      {pair.master1.vessel} ✕ {pair.master2.vessel}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-[#232826] dark:text-[#FAF8F5]">
                    {pair.name}
                  </h3>

                  {/* 穴位バッジ */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <div className="bg-[#FAF8F5] dark:bg-[#121920] p-2.5 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A]">
                      <span className="text-[10px] text-[#737C77] dark:text-[#8899A6] block">{pair.master1.vessel}に通ず</span>
                      <span className="font-bold text-sm text-[#1E3D34] dark:text-[#74BA9E]">{pair.master1.point}</span>
                      <span className="text-[10px] text-[#737C77] ml-1">({pair.master1.meridian})</span>
                    </div>
                    <div className="bg-[#FAF8F5] dark:bg-[#121920] p-2.5 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A]">
                      <span className="text-[10px] text-[#737C77] dark:text-[#8899A6] block">{pair.master2.vessel}に通ず</span>
                      <span className="font-bold text-sm text-[#B86924] dark:text-[#E6C387]">{pair.master2.point}</span>
                      <span className="text-[10px] text-[#737C77] ml-1">({pair.master2.meridian})</span>
                    </div>
                  </div>

                  <p className="text-xs text-[#59615D] dark:text-[#96A6B2] leading-relaxed">
                    {pair.clinicalSignificance}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#E5DEC9]/60 dark:border-[#2A3B4A]/60 flex flex-wrap gap-1">
                  {pair.indications.map((ind, i) => (
                    <span key={i} className="text-[11px] px-2 py-0.5 rounded bg-[#FAF8F5] dark:bg-[#151D25] text-[#737C77] dark:text-[#8899A6]">
                      {ind}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* セクション 2: 全8脈の体系別カード */}
        <div className="space-y-6">
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
                className="group bg-white dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-5 shadow-2xs hover:border-[#B86924] hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      vessel.category === "陽奇経"
                        ? "bg-[#FCF4EB] text-[#B86924] dark:bg-[#2A1E14] dark:text-[#E6C387]"
                        : "bg-[#EBF3EF] text-[#1E3D34] dark:bg-[#182823] dark:text-[#74BA9E]"
                    }`}>
                      {vessel.category}
                    </span>
                    {vessel.pointsCount ? (
                      <span className="text-[10px] text-[#737C77] dark:text-[#8899A6]">
                        固有穴 {vessel.pointsCount}穴
                      </span>
                    ) : (
                      <span className="text-[10px] text-[#737C77] dark:text-[#8899A6]">
                        交会穴系
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#B86924] transition-colors">
                      {vessel.name}
                    </h3>
                    <p className="text-[11px] text-[#737C77] dark:text-[#8899A6]">
                      {vessel.reading}
                    </p>
                  </div>

                  <p className="text-xs text-[#59615D] dark:text-[#96A6B2] line-clamp-3 leading-relaxed">
                    {vessel.nature}
                  </p>

                  <div className="pt-2 border-t border-[#E5DEC9]/50 dark:border-[#2A3B4A]/50">
                    <div className="text-[11px] text-[#737C77] dark:text-[#8899A6]">
                      <span>通穴: </span>
                      <strong className="text-[#232826] dark:text-[#FAF8F5]">{vessel.masterPoint.name}</strong>
                      <span className="text-[10px] text-[#737C77] ml-1">({vessel.masterPoint.code})</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between text-xs font-bold text-[#B86924] dark:text-[#E6C387]">
                  <span>詳細・流注図を見る</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
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

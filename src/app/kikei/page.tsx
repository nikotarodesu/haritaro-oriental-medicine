import React from "react";
import Link from "next/link";
import PageIntro from "@/components/design/PageIntro";
import { Metadata } from "next";
import { 
  GitCommit, 
  Layers, 
  BookOpen, 
  ArrowRight, 
  Hand,
  Footprints,
  Plus,
} from "lucide-react";
import { KIKEI_VESSELS, HACHIMYAKU_PAIRS, type HachimyakuPair } from "@/data/kikeiData";
import { pageSocialMetadata, seriesPageTitle } from "@/config/seo";
import KikeiEvidenceNote from "@/components/kikei/KikeiEvidenceNote";

const pageTitle = seriesPageTitle("奇経八脈（きけいはちみゃく）詳説・八脈交会穴", "reading");
const pageDescription = "奇経八脈（督脈・任脈・衝脈・帯脈・陰陽蹻脈・陰陽維脈）の流注と、八脈交会穴4対の伝統的な主治・配穴を学ぶ資料集。正経十二経脈との関係や古典の説明を確認できます。";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  ...pageSocialMetadata(pageTitle, pageDescription, "/kikei"),
};

function MeetingPoint({ point }: { point: HachimyakuPair["master1"] }) {
  const isHand = point.meridian.startsWith("手");
  const Icon = isHand ? Hand : Footprints;

  return (
    <Link
      href={`/tsubo/${point.code.toLowerCase()}#acupoint-location`}
      className="grid min-w-0 content-start gap-1 rounded-xl border border-frame bg-panel p-2.5 text-sm hover:border-accent focus-visible:outline-accent sm:p-3"
    >
      <span className="flex items-center gap-1.5 text-muted"><Icon size={16} aria-hidden="true" />{isHand ? "手の経絡" : "足の経絡"}</span>
      <strong className="font-serif text-base text-accent underline underline-offset-4">{point.point} <span className="font-sans text-sm">{point.code}</span></strong>
      <span>{point.vessel}に通じる</span>
    </Link>
  );
}

export default function KikeiIndexPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#10161C] text-[#232826] dark:text-[#FAF8F5]">
      <div className="page-layout page-layout--intro">
        <PageIntro compact title="奇経八脈と八脈交会穴" art="points" description="八つの脈が体のどこを通るとされるか、図で確かめます。手と足のツボを一つずつ組み合わせる八脈交会穴も見比べられます。">
          <div className="page-actions"><a href="#eight-vessels" className="page-primary-action"><GitCommit aria-hidden="true" className="h-4 w-4" />8脈から選ぶ<ArrowRight aria-hidden="true" className="h-4 w-4" /></a><a href="#four-pairs" className="page-secondary-action"><Layers aria-hidden="true" className="h-4 w-4" />交会穴の4対を見る</a></div>
        </PageIntro>
      </div>

      <div className="page-layout page-layout--continuation space-y-12">
        {/* セクション 1: 全8脈の体系別カード */}
        <div id="eight-vessels" className="space-y-6 scroll-mt-28">
          <div className="flex flex-wrap items-end justify-between gap-2 border-b border-[#E5DEC9] dark:border-[#2A3B4A] pb-3">
            <h2 className="font-serif text-xl font-bold sm:text-2xl">八つの脈と流注図</h2>
            <p className="text-sm text-muted">督脈と任脈には、それぞれ固有のツボがあります。</p>
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
                    ) : null}
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

                  <div className="pt-2 border-t border-[#E5DEC9]/50 dark:border-[#2A3B4A]/50">
                    <div className="text-xs text-[#737C77] dark:text-[#8899A6]">
                      <span>交会穴 </span>
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

        <section id="four-pairs" className="space-y-4 scroll-mt-28" aria-labelledby="four-pairs-title">
          <div className="space-y-2 border-b border-frame pb-3">
            <h2 id="four-pairs-title" className="font-serif text-xl font-bold sm:text-2xl">八脈交会穴の四つの組み合わせ</h2>
            <p className="text-sm leading-relaxed text-muted">左に手の経絡、右に足の経絡のツボをそろえました。名前を選ぶと、図鑑で場所を確認できます。</p>
          </div>

          <ul className="grid gap-3 md:grid-cols-2">
            {HACHIMYAKU_PAIRS.map(pair => {
              const [hand, foot] = pair.master1.meridian.startsWith("手")
                ? [pair.master1, pair.master2]
                : [pair.master2, pair.master1];
              return (
                <li key={pair.id} className="min-w-0 rounded-2xl border border-frame bg-card p-3 sm:p-4">
                  <h3 className="sr-only">{hand.point}と{foot.point}の組み合わせ</h3>
                  <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-stretch gap-1.5 sm:gap-2">
                    <MeetingPoint point={hand} />
                    <Plus aria-hidden="true" size={16} className="self-center text-muted" />
                    <MeetingPoint point={foot} />
                  </div>
                  <details className="page-help !mt-3">
                    <summary>古典での説明と研究の範囲</summary>
                    <div className="space-y-2 text-sm leading-relaxed">
                      <p className="font-semibold">古典で関係づける部位　{pair.targetArea}</p>
                      <p>{pair.clinicalSignificance}</p>
                    </div>
                  </details>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="space-y-3" aria-labelledby="kikei-analogy-title">
          <h2 id="kikei-analogy-title" className="flex items-center gap-2 font-serif text-xl font-bold">
            <BookOpen size={20} aria-hidden="true" />『難経』の水路のたとえ
          </h2>
          <figure className="rounded-2xl border border-frame bg-card p-3 sm:p-4">
            <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-1.5 sm:gap-3">
              <div className="rounded-xl bg-panel p-2 text-center">
                <svg viewBox="0 0 100 56" aria-hidden="true" className="mx-auto h-12 w-20 max-w-full text-accent">
                  <path d="M12 16h76M12 40h76M16 28h62m-7-6 8 6-8 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
                <strong className="block">十二経脈</strong>
                <span className="block text-sm">水が流れる水路</span>
              </div>
              <ArrowRight size={16} aria-hidden="true" className="text-muted" />
              <div className="rounded-xl bg-panel p-2 text-center">
                <svg viewBox="0 0 100 56" aria-hidden="true" className="mx-auto h-12 w-20 max-w-full text-accent">
                  <path d="M10 16l15 28h50l15-28M26 25c8-7 16 7 24 0s16 7 24 0M33 34c6-5 11 5 17 0s11 5 17 0" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
                <strong className="block">奇経八脈</strong>
                <span className="block text-sm">あふれた水を受ける側</span>
              </div>
            </div>
            <figcaption className="mt-3 text-sm leading-relaxed text-muted">『難経』第二十七難では、大雨で水路から水があふれる様子にたとえて、十二経脈だけでは気血を収めきれないときのことを説明します。気血は伝統医学の用語です。</figcaption>
          </figure>
          <details className="page-help">
            <summary>『難経』第二十七難の原文</summary>
            <blockquote className="text-sm leading-relaxed">聖人図設溝渠，通利水道，以備不然。天雨降下，溝渠溢満，当此之時，霶霈妄行，聖人不能復図也。此絡脈満溢，諸経不能復拘也。</blockquote>
          </details>
          <details className="page-help">
            <summary>鍼の研究で調べたこと</summary>
            <KikeiEvidenceNote />
          </details>
        </section>
      </div>
    </div>
  );
}

import Link from "next/link";
import AuthorSupervisorCard from "@/components/common/AuthorSupervisorCard";
import CrossSectionViewer from "./CrossSectionViewer";
import PointAtlasDiagrams from "./atlas/PointAtlasDiagrams";
import { getPublicCrossSectionModel } from "@/data/medicalSafety";
import { getAcupointByCode } from "@/data/tsubo";
import type { AcupointDetail, AcupointMaster } from "@/data/tsubo/types";
import type { AcupointAtlasArticle as AtlasArticle, AtlasMarker } from "@/data/tsubo/atlas/types";

const headingClass = "mb-3 font-serif text-xl font-bold text-[#244238] dark:text-[#A9D6C3] sm:text-2xl";
const linkClass = "font-semibold underline underline-offset-4";

function Paragraphs({ paragraphs }: { paragraphs: readonly string[] }) {
  return (
    <div className="space-y-3">
      {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
    </div>
  );
}

export default function AcupointAtlasArticle({ point, article, marker, meridianPoints, individualModel }: {
  point: AcupointDetail;
  article: AtlasArticle;
  marker: AtlasMarker;
  meridianPoints: readonly AcupointMaster[];
  individualModel: boolean;
}) {
  const details = [
    ["読み", point.kana],
    ["経穴コード", point.code],
    ["別名・表記", [...(point.aliases ?? []), `${point.romaji}（中国語のローマ字表記）`].join("、")],
    ["所属経絡", `${point.meridian}（${article.meridianReading}）。経絡は、伝統医学でツボをつなぐ道筋です。`],
    ["部位", article.regionLabel],
  ];
  const research = point.researchEvidence;

  return (
    <article data-atlas-point={point.code} className="mx-auto w-full max-w-3xl space-y-9 px-4 py-8 text-base leading-8 sm:px-6 sm:py-12">
      <header className="space-y-4">
        <p className="text-sm font-medium text-[#59615D] dark:text-[#AFBDC8]">
          <Link href="/tsubo" className={linkClass}>はり太郎のツボ図鑑</Link>
        </p>
        <h1 className="font-serif text-4xl font-bold sm:text-5xl">{point.name}<span className="ml-2 text-2xl">（{point.kana}）</span></h1>
        <p>{article.lead}</p>
        {article.safetyWarning && (
          <p id="acupoint-safety-warning" className="scroll-mt-28 rounded-xl border border-[#E3C9A9] bg-[#FAEFDD] px-4 py-2 text-sm font-semibold text-[#593820]">
            {article.safetyWarning}
          </p>
        )}
        <table className="w-full table-fixed text-left text-sm leading-6">
          <thead className="sr-only"><tr><th scope="col">項目</th><th scope="col">基本情報</th></tr></thead>
          <tbody>
            {details.map(([label, value]) => (
              <tr key={label} className="border-b border-[#E5DEC9] dark:border-[#384D43]">
                <th scope="row" className="w-24 py-3 align-top font-semibold sm:w-36">{label}</th>
                <td className="py-3">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </header>

      <section id="acupoint-location" className="scroll-mt-28">
        <h2 className={headingClass}>どこにある？</h2>
        <Paragraphs paragraphs={article.location} />
        <div className="mt-5">
          <PointAtlasDiagrams point={point} meridianPoints={meridianPoints} illustration={article.illustration} marker={marker} />
        </div>
      </section>

      <section>
        <h2 className={headingClass}>どんなときに調べる人が多い？</h2>
        <Paragraphs paragraphs={article.traditional} />
        {article.symptomLinks?.length ? (
          <ul className="mt-2 space-y-1">
            {article.symptomLinks.map(({ href, label }) => <li key={href}><Link href={href} className={linkClass}>{label}</Link></li>)}
          </ul>
        ) : null}
      </section>

      <section>
        <h2 className={headingClass}>{article.visualOnly ? "図で場所を確かめる" : "自分で押してみる"}</h2>
        <Paragraphs paragraphs={article.selfCare} />
      </section>

      <section id="acupoint-cautions" className="scroll-mt-28">
        <h2 className={headingClass}>注意したいこと</h2>
        <Paragraphs paragraphs={article.cautions} />
      </section>

      <details className="rounded-2xl border border-[#E5DEC9] p-4 dark:border-[#384D43]">
        <summary className="cursor-pointer font-serif text-xl font-bold">もっと知りたい人へ</summary>
        <div className="mt-4 space-y-4">
          <Paragraphs paragraphs={article.expert} />
          <p className="text-sm">刺鍼（はりを刺す施術）や施灸（お灸をする施術）の手順は確認待ちです。位置の説明や模式図から個人の安全な刺入経路や深さを判断することはできません。</p>
          {individualModel && point.crossSection && (
            <CrossSectionViewer model={getPublicCrossSectionModel(point.crossSection)} pointName={point.name} pointCode={point.code} individualModel />
          )}
        </div>
        {research && (
          <section id="acupoint-research" className="mt-6 scroll-mt-28 space-y-2 text-sm">
            <h3 className="text-base font-bold">既存研究で確認された範囲</h3>
            <p>{research.findings}</p>
            <p>{research.limitations}</p>
            <ul className="list-disc space-y-2 pl-5">
              {research.sources.map(({ title, year, pmid }) => (
                <li key={title}>{pmid ? <a href={`https://pubmed.ncbi.nlm.nih.gov/${pmid}/`} className={linkClass}>{title}（{year}）</a> : `${title}（${year}）`}</li>
              ))}
            </ul>
          </section>
        )}
      </details>

      <section>
        <h2 className={headingClass}>関連するツボ</h2>
        <ul className="list-disc space-y-2 pl-5">
          {article.relatedPoints.map(({ code, text }) => {
            const related = getAcupointByCode(code);
            if (!related) return null;
            return (
              <li key={code}>
                {text}{" "}
                <Link href={`/tsubo/${related.codeLower}`} className={linkClass}>{related.name}（{related.kana}・{related.code}）</Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section id="acupoint-sources" className="scroll-mt-28">
        <h2 className={headingClass}>出典</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm leading-6">
          {article.sources.map(({ name, url, scope }) => (
            <li key={url}>{scope}{" "}<a href={url} className={linkClass}>{name}</a></li>
          ))}
        </ul>
      </section>
      <AuthorSupervisorCard topic={point.name} />
    </article>
  );
}

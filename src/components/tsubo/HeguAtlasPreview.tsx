import Link from "next/link";
import AuthorSupervisorCard from "@/components/common/AuthorSupervisorCard";
import AcupointAtlasDiagrams from "@/components/tsubo/AcupointAtlasDiagrams";
import CrossSectionViewer from "@/components/tsubo/CrossSectionViewer";
import { getPublicCrossSectionModel } from "@/data/medicalSafety";
import { getMeridianPoints } from "@/data/tsubo";
import type { AcupointDetail } from "@/data/tsubo/types";

export const heguAtlasTitle = "合谷（ごうこく）の場所と押し方・注意点｜はり太郎のツボ図鑑";
export const heguAtlasDescription = "合谷（LI4）の位置を、手の甲の骨を目印に図解。自分で押すときの注意、頭痛の受診の目安、WHO標準の位置を紹介します。";

const headingClass = "mb-3 font-serif text-xl font-bold text-[#244238] dark:text-[#A9D6C3] sm:text-2xl";
const linkClass = "font-semibold underline underline-offset-4";

export const heguSources = [
  { name: "WHO標準経穴部位（2008年、2009年改訂再版、p.35ほか）", url: "https://iris.who.int/server/api/core/bitstreams/d98c1c98-3fbf-4e4e-8c9a-1bbe72ccd00e/content#page=44", scope: "標準部位と経絡上の順序" },
  { name: "Memorial Sloan Kettering Cancer Center の患者向け合谷ガイド", url: "https://www.mskcc.org/cancer-care/patient-education/acupressure-pain-and-headaches", scope: "指で押す方法と妊娠・皮膚の異常時の注意" },
  { name: "全日本鍼灸学会 鍼灸安全対策ガイドライン2025年版", url: "https://safety.jsam.jp/img/file1.pdf", scope: "鍼灸施術時の妊娠に関する注意" },
  { name: "厚生労働省 こんな時は迷わず119へ", url: "https://kakarikata.mhlw.go.jp/kakaritsuke/urgency.html", scope: "救急要請の目安" },
  { name: "製品評価技術基盤機構 温活グッズの事故", url: "https://r1.prtr.nite.go.jp/jiko/chuikanki/mailmagazin/2024fy/vol468_250114.html", scope: "発熱製品による低温やけどへの注意" },
];

export default function HeguAtlasPreview({ point }: { point: AcupointDetail }) {
  const details = [
    ["読み", `${point.kana}（Gōkoku）`],
    ["経穴コード", point.code],
    ["別名・表記", `${point.aliases?.join("、")}、${point.romaji}（中国語のローマ字表記）`],
    ["所属経絡", `${point.meridian}（てのようめいだいちょうけい）。経絡は、伝統医学でツボをつなぐ道筋です。`],
    ["部位", "手の甲、人差し指につながる骨の中央付近の親指側"],
  ];

  return (
    <article className="mx-auto w-full max-w-3xl space-y-9 px-4 py-8 text-base leading-8 sm:px-6 sm:py-12">
      <header className="space-y-4">
        <p className="text-sm font-medium text-[#59615D] dark:text-[#AFBDC8]">
          <Link href="/tsubo" className={linkClass}>はり太郎のツボ図鑑</Link>
        </p>
        <h1 className="font-serif text-4xl font-bold sm:text-5xl">{point.name}<span className="ml-2 text-2xl">（{point.kana}）</span></h1>
        <p>合谷は、手の甲にあるツボです。親指と人差し指の間で、人差し指につながる骨が目印になります。左右とも同じように探せます。</p>
        <p id="acupoint-safety-warning" className="scroll-mt-28 rounded-xl border border-[#E3C9A9] bg-[#FAEFDD] px-4 py-2 text-sm text-[#593820]">妊娠中は合谷の指圧を控え、産科の担当者にご相談ください。</p>
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
        <p className="mb-5">手を楽にして甲を上に向けます。人差し指の付け根から手首へ向かって、反対の手の指で骨をたどります。骨の長さの真ん中から、少し親指側にずらしたところが合谷です。拡大図でも、①の骨の中央から②の骨の方へ目を移すと位置を確かめられます。</p>
        <AcupointAtlasDiagrams point={point} meridianPoints={getMeridianPoints(point.meridianId)} />
      </section>

      <section>
        <h2 className={headingClass}>どんなときに調べる人が多い？</h2>
        <p>合谷は、頭痛や歯の痛みなど、頭や顔の不調と伝統的に関連づけられてきました。頭痛が続く、繰り返すときは医療機関に相談してください。<strong>突然の激しい頭痛や、急に言葉が出にくくなった場合は、すぐに119番へ連絡してください。</strong></p>
        <Link href="/symptoms/headache-stiff-neck" className={linkClass}>頭痛・首肩こりの症状ガイド</Link>
      </section>

      <section>
        <h2 className={headingClass}>自分で押してみる</h2>
        <p>反対の手の親指の腹を当て、痛みを感じない強さでゆっくり押し、力を抜きます。痛みやしびれが出たら手を離してください。手が冷えるときは手袋などで保温を。カイロの肌への直当てや、同じ場所を長時間温めることは避けましょう。</p>
      </section>

      <section id="acupoint-cautions" className="scroll-mt-28">
        <h2 className={headingClass}>注意したいこと</h2>
        <p>妊娠中は合谷の指圧を控え、産科の担当者にご相談ください。傷や赤い腫れがあるところも押すのを控えます。症状がつらいときは受診を優先してください。</p>
      </section>

      <details className="rounded-2xl border border-[#E5DEC9] p-4 dark:border-[#384D43]">
        <summary className="cursor-pointer font-serif text-xl font-bold">もっと知りたい人へ</summary>
        <p className="my-4">WHO標準の位置は、手背（しゅはい、手の甲）、第2中手骨（だいにちゅうしゅこつ、人差し指につながる骨）の中点の橈側（とうそく、親指側）です。周囲の組織との位置関係は、専門家向けの断面模式図で確認できます。</p>
        <p className="mb-4 text-sm">刺鍼（はりを刺す施術）や施灸（お灸をする施術）の手順は確認待ちです。模式図から個人の安全な刺入経路や深さを判断することはできません。</p>
        {point.crossSection && (
          <CrossSectionViewer model={getPublicCrossSectionModel(point.crossSection)} pointName={point.name} pointCode={point.code} individualModel />
        )}
        {point.researchEvidence && (
          <section id="acupoint-research" className="mt-6 scroll-mt-28 space-y-2 text-sm">
            <h3 className="text-base font-bold">既存研究で確認された範囲</h3>
            <p>{point.researchEvidence.findings}</p>
            <p>{point.researchEvidence.limitations}</p>
            <ul className="list-disc space-y-2 pl-5">
              {point.researchEvidence.sources.map(({ title, year, pmid }) => (
                <li key={title}>{pmid ? <a href={`https://pubmed.ncbi.nlm.nih.gov/${pmid}/`} className={linkClass}>{title}（{year}）</a> : `${title}（${year}）`}</li>
              ))}
            </ul>
          </section>
        )}
      </details>

      <section>
        <h2 className={headingClass}>関連するツボ</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>同じ経絡で、人差し指の付け根に近いツボです。 <Link href="/tsubo/li3" className={linkClass}>三間（さんかん・LI3）</Link></li>
          <li>足の甲にあり、伝統的に合谷との組み合わせが知られています。 <Link href="/tsubo/lr3" className={linkClass}>太衝（たいしょう・LR3）</Link></li>
        </ul>
      </section>

      <section id="acupoint-sources" className="scroll-mt-28">
        <h2 className={headingClass}>出典</h2>
        <p className="mb-3 text-sm">頭や顔の不調との伝統的な関連は『針灸大成』四総穴歌と現行の経穴資料に基づきます。</p>
        <ul className="list-disc space-y-2 pl-5 text-sm leading-6">
          {heguSources.map(({ name, url, scope }) => (
            <li key={url}>{scope}。 <a href={url} className={linkClass}>{name}</a></li>
          ))}
        </ul>
      </section>
      <AuthorSupervisorCard topic={point.name} />
    </article>
  );
}

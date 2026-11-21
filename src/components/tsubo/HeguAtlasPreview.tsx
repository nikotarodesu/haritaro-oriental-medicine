import Link from "next/link";
import AuthorSupervisorCard from "@/components/common/AuthorSupervisorCard";
import { AcupointReadingLinks } from "@/components/tsubo/AcupointArticleLinks";
import AcupointArticleHeader from "@/components/tsubo/AcupointArticleHeader";
import AcupointResearch from "@/components/tsubo/AcupointResearch";
import WhoPointLocation from "@/components/tsubo/WhoPointLocation";
import AcupointAtlasDiagrams from "@/components/tsubo/AcupointAtlasDiagrams";
import CrossSectionViewer from "@/components/tsubo/CrossSectionViewer";
import { getPublicCrossSectionModel } from "@/data/medicalSafety";
import { getMeridianPoints } from "@/data/tsubo";
import type { AcupointDetail } from "@/data/tsubo/types";

export const heguAtlasTitle = "合谷（ごうこく）の場所と押し方・注意点｜はり太郎のツボ図鑑";
export const heguAtlasDescription = "合谷（LI4）の位置を、手の甲の骨を目印に図解。自分で押すときの注意、頭痛の受診の目安、WHO標準の位置を紹介します。";
export const heguAtlasReading = {
  traditional: "合谷は、頭痛や歯の痛みなど、頭や顔の不調と伝統的に関連づけられてきました。頭痛が続く、繰り返すときは医療機関に相談してください。",
  caution: "妊娠中は合谷の指圧を控え、産科の担当者にご相談ください。",
};

const headingClass = "atlas-section-title";
const linkClass = "font-semibold underline underline-offset-4";

export const heguSources = [
  { name: "WHO標準経穴部位（2008年、2009年改訂再版、p.35ほか）", url: "https://iris.who.int/server/api/core/bitstreams/d98c1c98-3fbf-4e4e-8c9a-1bbe72ccd00e/content#page=44", scope: "標準部位と経絡上の順序" },
  { name: "Memorial Sloan Kettering Cancer Center の患者向け合谷ガイド", url: "https://www.mskcc.org/cancer-care/patient-education/acupressure-pain-and-headaches", scope: "指で押す方法と妊娠・皮膚の異常時の注意" },
  { name: "全日本鍼灸学会 鍼灸安全対策ガイドライン2025年版", url: "https://safety.jsam.jp/img/file1.pdf", scope: "鍼灸施術時の妊娠に関する注意" },
  { name: "厚生労働省 こんな時は迷わず119へ", url: "https://kakarikata.mhlw.go.jp/kakaritsuke/urgency.html", scope: "119番に連絡する目安" },
  { name: "製品評価技術基盤機構 温活グッズの事故", url: "https://r1.prtr.nite.go.jp/jiko/chuikanki/mailmagazin/2024fy/vol468_250114.html", scope: "発熱製品による低温やけどへの注意" },
];

export default function HeguAtlasPreview({ point }: { point: AcupointDetail }) {
  return (
    <article data-atlas-point={point.code} className="page-layout atlas-page atlas-entry">
      <AcupointArticleHeader point={point} lead="合谷は、手の甲にあるツボです。親指と人差し指の間で、人差し指につながる骨が目印になります。左右とも同じように探せます。" warning={heguAtlasReading.caution} meridianReading="てのようめいだいちょうけい" />

      <section id="acupoint-location" className="atlas-target">
        <h2 className={headingClass}>場所と見つけ方</h2>
        <p>手を楽にして甲を上に向けます。人差し指の付け根から手首へ向かって、反対の手の指で骨をたどります。骨の長さの真ん中から、少し親指側にずらしたところが合谷です。拡大図の①は人差し指につながる骨（第2中手骨）、②は親指につながる骨（第1中手骨）です。丸印は①の真ん中から②の方へ少し寄ったところにあります。</p>
        <WhoPointLocation code={point.codeLower} pointName={point.name} />
        <div className="mt-5">
          <AcupointAtlasDiagrams point={point} meridianPoints={getMeridianPoints(point.meridianId)} />
        </div>
      </section>

      <AcupointResearch point={point} />

      <section id="acupoint-traditional" className="atlas-target">
        <h2 className={headingClass}>伝統的な使われ方</h2>
        <p>{heguAtlasReading.traditional}<strong>突然の激しい頭痛や、急に言葉が出にくくなった場合は、すぐに119番へ連絡してください。</strong></p>
        <AcupointReadingLinks code={point.codeLower} editorialLinks={[{ href: "/symptoms/headache-stiff-neck", label: "頭痛・首肩こりの症状ガイド" }]} />
      </section>

      <section>
        <h2 className={headingClass}>自分で押してみる</h2>
        <p>反対の手の親指の腹を当て、痛みを感じない強さでゆっくり押し、力を抜きます。痛みやしびれが出たら手を離してください。手が冷えるときは、手袋などで温めてください。カイロの肌への直当てや、同じ場所を長時間温めることは避けましょう。</p>
      </section>

      <section id="acupoint-cautions" className="atlas-target">
        <h2 className={headingClass}>注意したいこと</h2>
        <p>妊娠中は合谷の指圧を控え、産科の担当者にご相談ください。傷や赤い腫れがあるところも押すのを控えます。症状がつらいときは受診を優先してください。</p>
      </section>

      <details className="atlas-disclosure atlas-reading-details">
        <summary>詳しい解剖と位置の資料</summary>
        <p className="my-4 text-sm">刺鍼（はりを刺す施術）や施灸（お灸をする施術）の手順は確認待ちです。模式図から個人の安全な刺入経路や深さを判断することはできません。</p>
        {point.crossSection && (
          <CrossSectionViewer model={getPublicCrossSectionModel(point.crossSection)} pointName={point.name} pointCode={point.code} individualModel />
        )}
      </details>

      <section>
        <h2 className={headingClass}>位置を見比べるツボ</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>同じ経絡で、人差し指の付け根に近いツボです。 <Link href="/tsubo/li3" className={linkClass}>三間（さんかん・LI3）</Link></li>
          <li>足の甲にあるツボです。手と足で目印になる骨を見比べられます。 <Link href="/tsubo/lr3" className={linkClass}>太衝（たいしょう・LR3）</Link></li>
        </ul>
      </section>

      <section id="acupoint-sources" className="atlas-target">
        <h2 className={headingClass}>出典</h2>
        <p className="mb-3 text-sm">頭や顔の不調との伝統的な関連は『針灸大成』四総穴歌と現行の経穴資料に基づきます。</p>
        <ul className="list-disc space-y-2 pl-5 text-sm leading-6">
          {heguSources.map(({ name, url, scope }) => (
            <li key={url}>{scope}。 <a href={url} className={linkClass}>{name}</a></li>
          ))}
        </ul>
      </section>
      <AuthorSupervisorCard pointLocationChecked />
    </article>
  );
}

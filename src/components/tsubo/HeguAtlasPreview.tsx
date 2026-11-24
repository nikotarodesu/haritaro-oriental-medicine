import AuthorSupervisorCard from "@/components/common/AuthorSupervisorCard";
import ContentEndAd from "@/components/ads/ContentEndAd";
import AcupointAnatomy from "@/components/tsubo/AcupointAnatomy";
import { AcupointReadingLinks } from "@/components/tsubo/AcupointArticleLinks";
import AcupointArticleHeader, { AcupointPointDetails } from "@/components/tsubo/AcupointArticleHeader";
import AcupointCautions from "@/components/tsubo/AcupointCautions";
import AcupointLocationComparison from "@/components/tsubo/AcupointLocationComparison";
import AcupointLocationImage from "@/components/tsubo/AcupointLocationImage";
import AcupointNameGuide from "@/components/tsubo/AcupointNameGuide";
import AcupointResearch from "@/components/tsubo/AcupointResearch";
import WhoPointLocation from "@/components/tsubo/WhoPointLocation";
import AcupointAtlasDiagrams from "@/components/tsubo/AcupointAtlasDiagrams";
import { getMeridianPoints } from "@/data/tsubo";
import { HEGU_SEARCH_COPY } from "@/data/tsubo/atlas/searchCopy";
import type { AcupointDetail } from "@/data/tsubo/types";

const traditionalUse = {
  introduction: "伝統的な鍼灸では、合谷は",
  symptoms: "頭痛や歯の痛みなど、頭や顔の不調",
  ending: "に使われてきました。",
};

export const heguAtlasReading = {
  traditional: traditionalUse.introduction + traditionalUse.symptoms + traditionalUse.ending,
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
      <AcupointArticleHeader point={point} lead={HEGU_SEARCH_COPY.lead} hasAnatomyDiagram={!!point.crossSection} />

      <section id="acupoint-location" className="atlas-target">
        <h2 className={headingClass}>場所と見つけ方</h2>
        <AcupointAtlasDiagrams point={point} meridianPoints={getMeridianPoints(point.meridianId)}>
          <div className="atlas-location-copy">
            <h3>図の読み方</h3>
            <p>手を楽にして甲を上に向けます。人差し指の付け根から手首へ向かって、反対の手の指で骨をたどります。骨の長さの真ん中から、少し親指側にずらしたところが合谷です。</p>
            <p>拡大図の①は人差し指につながる骨（第2中手骨）、②は親指につながる骨（第1中手骨）です。丸印は①の真ん中から②の方へ少し寄ったところにあります。</p>
          </div>
          <WhoPointLocation code={point.codeLower} pointName={point.name} />
          <AcupointPointDetails point={point} meridianReading="てのようめいだいちょうけい" />
          <AcupointLocationImage code={point.codeLower} />
        </AcupointAtlasDiagrams>
      </section>

      <AcupointCautions>
        <p><strong>突然の激しい頭痛や、急に言葉が出にくくなった場合は、すぐに119番へ連絡してください。</strong> 頭痛が続く、または繰り返すときは医療機関に相談してください。</p>
        <p>{heguAtlasReading.caution} 傷や赤い腫れがあるところは押さず、痛みやしびれが出たら手を離してください。</p>
        <p>手を温めるときは、カイロを肌に直接当てたり、同じ場所を長時間温めたりすることは避けてください。</p>
        <p>断面図は、周りの骨や筋を学ぶための図です。鍼を刺す深さや向きは図から判断できません。</p>
      </AcupointCautions>

      <AcupointAnatomy point={point} />

      <AcupointLocationComparison point={point} related={[
        { code: "LI3", text: "同じ経絡で、合谷より人差し指の先に近いツボです。" },
        { code: "LI5", text: "同じ経絡で、合谷より手首に近いツボです。" },
        { code: "LR3", text: "手の甲と足の甲で、目印になる骨が違います。" },
      ]} />

      <section id="acupoint-traditional" className="atlas-target">
        <h2 className={headingClass}>伝統的な使われ方</h2>
        <p>
          {traditionalUse.introduction}<strong className="font-bold">{traditionalUse.symptoms}</strong>{traditionalUse.ending}
        </p>
        <AcupointReadingLinks code={point.codeLower} editorialLinks={[{ href: "/symptoms/headache-stiff-neck", label: "頭痛・首肩こりの症状ガイド" }]} />
      </section>

      <section>
        <h2 className={headingClass}>自分で押してみる</h2>
        <p>反対の手の親指の腹を当て、痛みを感じない強さでゆっくり押し、力を抜きます。手が冷えるときは、手袋などで温めてください。</p>
      </section>

      <AcupointResearch point={point} />
      <AcupointNameGuide code={point.codeLower} />

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
      <ContentEndAd key={point.code} />
    </article>
  );
}

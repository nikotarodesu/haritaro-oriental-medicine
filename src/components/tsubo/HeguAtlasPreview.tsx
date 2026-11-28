import ContentEndAd from "@/components/ads/ContentEndAd";
import AcupointAnatomy from "@/components/tsubo/AcupointAnatomy";
import AcupointArticleHeader from "@/components/tsubo/AcupointArticleHeader";
import AcupointCautions from "@/components/tsubo/AcupointCautions";
import AcupointLocationComparison from "@/components/tsubo/AcupointLocationComparison";
import AcupointReferences, { AcupointPointBasics } from "@/components/tsubo/AcupointReferences";
import AcupointResearch from "@/components/tsubo/AcupointResearch";
import AcupointSelfCare from "@/components/tsubo/AcupointSelfCare";
import { AcupointTraditionalUses } from "@/components/tsubo/AcupointUses";
import { AcupointPairNotes } from "./AcupointPairNotes";
import { AcupointLocationDetails, AcupointLocationRows, AcupointTopic } from "./AcupointTopics";
import WhoPointLocation from "@/components/tsubo/WhoPointLocation";
import AcupointAtlasDiagrams, { AcupointAtlasLocationSupplement } from "@/components/tsubo/AcupointAtlasDiagrams";
import { getMeridianPoints } from "@/data/tsubo";
import type { AcupointDetail } from "@/data/tsubo/types";
import styles from "./HeguAtlasPreview.module.css";

export const heguAtlasReading = {
  caution: "妊娠中は合谷の指圧を控え、産科の担当者にご相談ください。",
  symptomWarning: "突然の激しい頭痛や、急に言葉が出にくくなった場合は、すぐに119番へ連絡してください。",
};

export const heguSources = [
  { name: "WHO標準経穴部位（2008年、2009年改訂再版、p.35ほか）", url: "https://iris.who.int/server/api/core/bitstreams/d98c1c98-3fbf-4e4e-8c9a-1bbe72ccd00e/content#page=44", scope: "標準部位と経絡上の順序" },
  { name: "Memorial Sloan Kettering Cancer Center の患者向け合谷ガイド", url: "https://www.mskcc.org/cancer-care/patient-education/acupressure-pain-and-headaches", scope: "指で押す方法と妊娠・皮膚の異常時の注意" },
  { name: "全日本鍼灸学会 鍼灸安全対策ガイドライン2025年版", url: "https://safety.jsam.jp/img/file1.pdf", scope: "鍼灸施術時の妊娠に関する注意" },
  { name: "厚生労働省 こんな時は迷わず119へ", url: "https://kakarikata.mhlw.go.jp/kakaritsuke/urgency.html", scope: "119番に連絡する目安" },
];

export default function HeguAtlasPreview({ point }: { point: AcupointDetail }) {
  return (
    <article data-atlas-point={point.code} className={`page-layout atlas-page atlas-entry ${styles.folio}`}>
      <AcupointArticleHeader point={point} folio />
      <aside className="atlas-caution-priority" aria-label="このツボを探す前に">
        <p className="font-semibold">症状がある場合の受診目安</p>
        <p>{heguAtlasReading.symptomWarning}</p>
      </aside>

      <AcupointTopic topic="location">
        <div id="acupoint-location" tabIndex={-1} className="atlas-target">
          <AcupointAtlasDiagrams point={point} />
        </div>
        <AcupointLocationRows>
          <AcupointLocationDetails>
            <AcupointAtlasLocationSupplement point={point} meridianPoints={getMeridianPoints(point.meridianId)}>
              <WhoPointLocation code={point.codeLower} pointName={point.name} />
            </AcupointAtlasLocationSupplement>
          </AcupointLocationDetails>
          <AcupointAnatomy point={point} />
        </AcupointLocationRows>
      </AcupointTopic>

      <AcupointTopic topic="uses">
        <AcupointTraditionalUses code={point.codeLower} />
        <AcupointCautions priority={<p>{heguAtlasReading.caution}</p>}>
          <p>頭痛が続く、または繰り返すときは医療機関に相談してください。</p>
          <p>傷や赤い腫れがあるところは押さず、痛みやしびれが出たら手を離してください。</p>
          <p>手が赤く腫れているときや、しびれなどで温度が分かりにくいときは温めないでください。温めて痛みや腫れが増したら中止してください。</p>
          <p>断面図は、周りの骨や筋を学ぶための図です。鍼を刺す深さや向きは図から判断できません。</p>
        </AcupointCautions>
        <AcupointSelfCare code={point.codeLower} />
        <AcupointResearch point={point} />
      </AcupointTopic>

      <AcupointTopic topic="nearby">
        <AcupointLocationComparison point={point} related={[
          { code: "LI3", text: "同じ経絡で、合谷より人差し指の先に近いツボです。" },
          { code: "LI5", text: "同じ経絡で、合谷より手首に近いツボです。" },
        ]} />
      </AcupointTopic>

      <AcupointTopic topic="pairs">
        <AcupointPairNotes point={point} />
      </AcupointTopic>

      <div className="atlas-secondary-sections">
        <AcupointPointBasics point={point} meridianReading="てのようめいだいちょうけい" />
        <AcupointReferences
          point={point}
          editorialLinks={[{ href: "/symptoms/headache-stiff-neck", label: "頭痛・首肩こりの症状ガイド" }]}
          sources={heguSources}
          sourceNote={<p className="text-sm">頭や顔の不調との伝統的な関連は『針灸大成』四総穴歌と現行の経穴資料に基づきます。</p>}
        />
      </div>
      <ContentEndAd key={point.code} />
    </article>
  );
}

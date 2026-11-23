import type { Metadata } from "next";
import Link from "next/link";
import { BoneCunExampleFigure, FingerCunFigure } from "@/components/tsubo/CunGuideFigures";
import { ACUPOINT_PAGE_REVISED_AT } from "@/config/contentUpdates";
import { pageSocialMetadata, seriesPageTitle } from "@/config/seo";
import { WHO_ATLAS_PDF } from "@/data/tsubo/atlas/whoAtlasPages";
import { boneCunSpans } from "@/data/tsubo/atlas/whoMeasurements";

const path = "/tsubo/basics/bone-cun";
const siteUrl = "https://www.haritaro.jp";
const title = seriesPageTitle("ツボの「寸」の測り方｜骨度法・指寸・指幅", "dictionary");
const description = "WHO標準経穴部位の計測方法を、前腕・すね・お腹の目盛り付き模式図と手指の図で解説。骨度法（B-cun）、指寸（F-cun）、指幅（F-breadth）の部位別の基準が分かります。";

export const metadata: Metadata = {
  title,
  description,
  ...pageSocialMetadata(title, description, path),
  alternates: { canonical: path },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: title,
      description,
      url: siteUrl + path,
      inLanguage: "ja",
      dateModified: ACUPOINT_PAGE_REVISED_AT,
      author: { "@type": "Person", name: "はり太郎", url: siteUrl + "/about" },
      publisher: { "@id": siteUrl + "/#organization" },
      citation: {
        "@type": "CreativeWork",
        name: "WHO Standard Acupuncture Point Locations in the Western Pacific Region (updated reprint, 2009)",
        url: WHO_ATLAS_PDF + "#page=21",
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "ホーム", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "はり太郎のツボ図鑑", item: siteUrl + "/tsubo" },
        { "@type": "ListItem", position: 3, name: "寸の測り方", item: siteUrl + path },
      ],
    },
  ],
};

const examples = [
  { area: "forearm", code: "pc6", name: "内関", landmarks: "手首のしわから、ひじの横じわまで", span: boneCunSpans.forearm, amount: 2 },
  { area: "lowerLeg", code: "sp6", name: "三陰交", landmarks: "内くるぶしの頂点から、陰陵泉の高さまで", span: boneCunSpans.innerShin, amount: 3 },
  { area: "abdomen", code: "cv4", name: "関元", landmarks: "へその中央から、恥骨結合の上縁まで", span: boneCunSpans.lowerAbdomen, amount: 3 },
] as const;

const boneSpans = [
  { region: "頭・顔", rows: [
    ["額の生え際の中央から、後ろの生え際の中央まで", boneCunSpans.scalp],
    ["眉間から、額の生え際の中央まで", 3],
    ["左右の額の角の生え際の間", 9],
    ["左右の乳様突起（耳の後ろの骨の出っ張り）の間", 9],
  ] },
  { region: "胸・お腹", rows: [
    ["胸骨上窩（鎖骨の間のくぼみ）から、胸骨体と剣状突起の境の中央まで", boneCunSpans.upperChest],
    ["胸骨体と剣状突起の境の中央から、へその中央まで", boneCunSpans.upperAbdomen],
    ["へその中央から、恥骨結合の上縁まで", boneCunSpans.lowerAbdomen],
    ["左右の乳頭の間", 8],
  ] },
  { region: "背中・腰", rows: [
    ["左右の肩甲骨の内側縁の間", 6],
  ] },
  { region: "腕", rows: [
    ["脇の前または後ろのしわから、ひじの横じわまで", boneCunSpans.upperArm],
    ["ひじの横じわから、手首の横じわまで", boneCunSpans.forearm],
  ] },
  { region: "脚・足", rows: [
    ["恥骨結合の上縁から、膝のお皿の上縁まで", 18],
    ["膝のお皿の下端（後面の目安は膝裏のくぼみの中央）から、内くるぶしの頂点まで", 15],
    ["陰陵泉の高さ（すねの内側、脛骨内側顆の下縁）から、内くるぶしの頂点まで", boneCunSpans.innerShin],
    ["大転子（太ももの付け根外側にある骨の出っ張り）から、膝裏の横じわまで", boneCunSpans.outerThigh],
    ["お尻の下のしわから、膝裏の横じわまで", boneCunSpans.backThigh],
    ["膝裏の横じわから、外くるぶしの頂点まで", boneCunSpans.outerShin],
    ["内くるぶしの頂点から、足の裏まで", boneCunSpans.innerAnkle],
  ] },
] as const;

export default function BoneCunPage() {
  return (
    <article className="page-layout atlas-page atlas-entry cun-guide">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <header className="atlas-guide-heading">
        <div>
          <nav aria-label="パンくず" className="atlas-breadcrumb">
            <Link href="/tsubo">はり太郎のツボ図鑑</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">寸の測り方</span>
          </nav>
          <h1 className="mt-2 text-3xl font-bold leading-snug sm:text-4xl">ツボの「寸」の測り方</h1>
          <p className="mt-3">「寸（すん）」は、本人の体の大きさに合わせてツボの位置を示す単位です。図鑑の位置欄では、測る基準によって「寸」「指寸」「指幅」と表記します。</p>
          <nav aria-label="測り方の目次" className="atlas-directory-actions mt-2">
            <a className="atlas-text-action" href="#bone-cun-table">骨度法</a>
            <a className="atlas-text-action" href="#finger-cun">指寸</a>
            <a className="atlas-text-action" href="#fingerbreadth">指幅</a>
          </nav>
        </div>
      </header>

      <section id="bone-cun-table" className="cun-guide-target">
        <h2 className="atlas-section-title">寸（骨度法・B-cun）</h2>
        <p>骨の出っ張りや関節のしわなど、決められた二つの目印の間を等分します。その一区切りが、その区間での1寸です。</p>
        <div className="cun-examples" role="group" aria-label="骨度法を使う3つの例">
          {examples.map(({ area, code, name, landmarks, span, amount }) => (
            <figure key={code} className="cun-example">
              <BoneCunExampleFigure area={area} span={span} amount={amount} />
              <figcaption>
                <Link href={`/tsubo/${code}#acupoint-who-location`} className="cun-guide-link">{name}</Link>
                <strong>{amount}<small>寸</small></strong>
                <p>{landmarks}を{span}等分。最初の目印から{amount}区切り分です。</p>
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="cun-example-note">太い線は最初の目印からツボまでの距離です。三陰交と関元はどちらも3寸で、等分する区間が異なります。</p>
        <h3 className="cun-spans-heading">部位別の基準表</h3>
        <div className="cun-spans">
          {boneSpans.map(({ region, rows }) => (
            <section className="cun-span" key={region}>
              <h3>{region}</h3>
              <dl>
                {rows.map(([landmarks, distance]) => (
                  <div key={landmarks}><dt>{landmarks}</dt><dd>{distance}寸</dd></div>
                ))}
              </dl>
            </section>
          ))}
        </div>
        <a className="atlas-text-action" href={`${WHO_ATLAS_PDF}#page=21`}>WHO原本の基準表（p.12–13、PDF）</a>
      </section>

      <section id="finger-cun" className="cun-guide-target">
        <h2 className="atlas-section-title">指寸（同身寸・F-cun）</h2>
        <p>位置を調べる本人の手で測ります。WHOは次の3つの測り方を示しています。</p>
        <dl className="cun-finger-methods">
          <div>
            <dt>親指で1指寸</dt>
            <dd><FingerCunFigure kind="thumb" /><p>親指の先と付け根の間にある関節の横幅。</p></dd>
          </div>
          <div>
            <dt>中指で1指寸</dt>
            <dd><FingerCunFigure kind="middle" /><p>親指と中指で輪を作り、中指の親指側で、二つの指関節のしわの端から端まで。</p></dd>
          </div>
          <div>
            <dt>4本で3指寸</dt>
            <dd><FingerCunFigure kind="four" /><p>人差し指から小指までを伸ばしてそろえます。中指の付け根に近い側の指関節のしわの高さで、手の甲側から4本の横幅を測ります。</p></dd>
          </div>
        </dl>
        <p className="cun-example-note">0.1指寸は、1指寸を10等分したうちの一区切りです。<Link href="/tsubo/li1#acupoint-who-location" className="cun-guide-link">商陽（LI1）</Link>では、爪の角からの距離に使います。</p>
        <a className="atlas-text-action" href={`${WHO_ATLAS_PDF}#page=30`}>WHO原本の指寸の図（図22–24、PDF）</a>
      </section>

      <section id="fingerbreadth" className="cun-guide-target">
        <h2 className="atlas-section-title">指幅（F-breadth）</h2>
        <figure className="cun-finger-width">
          <FingerCunFigure kind="width" />
          <figcaption>本人の中指の先端側の節を横に測ります。<Link href="/tsubo/st6#acupoint-who-location" className="cun-guide-link">頬車（ST6）</Link>では、下あごの角からななめ前上へ1指幅です。</figcaption>
        </figure>
        <a className="atlas-text-action" href={`${WHO_ATLAS_PDF}#page=11`}>WHO原本の単位の定義（p.2、PDF）</a>
      </section>
    </article>
  );
}

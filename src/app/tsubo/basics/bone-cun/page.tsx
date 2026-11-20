import type { Metadata } from "next";
import Link from "next/link";
import { ACUPOINT_PAGE_REVISED_AT } from "@/config/contentUpdates";
import { pageSocialMetadata } from "@/config/seo";
import { WHO_ATLAS_PDF } from "@/data/tsubo/atlas/whoAtlasPages";

const path = "/tsubo/basics/bone-cun";
const siteUrl = "https://www.haritaro.jp";
const title = "ツボの「寸」の測り方｜骨度法・指寸・指幅";
const description = "WHO標準経穴部位の計測方法を、前腕の図と部位別の基準表で解説。骨度法（B-cun）、指寸（F-cun）、指幅（F-breadth）の測り方が分かります。";

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

const boneSpans = [
  { region: "頭・顔", rows: [
    ["額の生え際の中央から、後ろの生え際の中央まで", 12],
    ["眉間から、額の生え際の中央まで", 3],
    ["左右の額の角の生え際の間", 9],
    ["左右の乳様突起（耳の後ろの骨の出っ張り）の間", 9],
  ] },
  { region: "胸・お腹", rows: [
    ["胸骨上窩（鎖骨の間のくぼみ）から、胸骨体と剣状突起の境の中央まで", 9],
    ["胸骨体と剣状突起の境の中央から、へその中央まで", 8],
    ["へその中央から、恥骨結合の上縁まで", 5],
    ["左右の乳頭の間", 8],
  ] },
  { region: "背中・腰", rows: [
    ["左右の肩甲骨の内側縁の間", 6],
  ] },
  { region: "腕", rows: [
    ["脇の前または後ろのしわから、ひじの横じわまで", 9],
    ["ひじの横じわから、手首の横じわまで", 12],
  ] },
  { region: "脚・足", rows: [
    ["恥骨結合の上縁から、膝のお皿の上縁まで", 18],
    ["膝のお皿の下端（後面の目安は膝裏のくぼみの中央）から、内くるぶしの頂点まで", 15],
    ["陰陵泉の高さ（すねの内側、脛骨内側顆の下縁）から、内くるぶしの頂点まで", 13],
    ["大転子（太ももの付け根外側にある骨の出っ張り）から、膝裏の横じわまで", 19],
    ["お尻の下のしわから、膝裏の横じわまで", 14],
    ["膝裏の横じわから、外くるぶしの頂点まで", 16],
    ["内くるぶしの頂点から、足の裏まで", 3],
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
            <a className="atlas-text-action" href="#bone-cun-table">骨度法の基準表</a>
            <a className="atlas-text-action" href="#finger-cun">指寸</a>
            <a className="atlas-text-action" href="#fingerbreadth">指幅</a>
          </nav>
        </div>
      </header>

      <section id="bone-cun-table" className="cun-guide-target">
        <h2 className="atlas-section-title">寸（骨度法・B-cun）</h2>
        <p>骨の出っ張りや関節のしわなど、決められた目印の間を下の表の数で等分します。その一区切りが、その区間での1寸です。</p>
        <figure className="cun-example">
          <div className="cun-scale-labels"><span>手首のしわ</span><span>ひじのしわ</span></div>
          <svg viewBox="0 0 384 32" aria-hidden="true" focusable="false">
            <path d="M12 16H372" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M12 16H72" fill="none" stroke="var(--atlas-accent)" strokeWidth="5" />
            {Array.from({ length: 13 }, (_, tick) => (
              <line key={tick} x1={12 + tick * 30} x2={12 + tick * 30} y1={tick % 3 === 0 ? 8 : 11} y2={tick % 3 === 0 ? 24 : 21} stroke="currentColor" strokeWidth="1.5" />
            ))}
            <circle cx="72" cy="16" r="5.5" fill="var(--atlas-accent)" />
          </svg>
          <figcaption><Link href="/tsubo/pc6#acupoint-who-location" className="cun-guide-link">内関（PC6）</Link>は、手首からひじまでを12等分したうち、手首から2区切り分の高さです。</figcaption>
        </figure>
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
          <div><dt>親指で1指寸</dt><dd>親指の先と付け根の間にある関節の横幅。</dd></div>
          <div><dt>中指で1指寸</dt><dd>親指と中指で輪を作り、中指の親指側で、二つの指関節のしわの端から端まで。</dd></div>
          <div><dt>4本で3指寸</dt><dd>人差し指から小指までを伸ばしてそろえます。中指の付け根に近い側の指関節のしわの高さで、手の甲側から4本の横幅を測ります。</dd></div>
        </dl>
        <a className="atlas-text-action" href={`${WHO_ATLAS_PDF}#page=30`}>WHO原本の指寸の図（図22–24、PDF）</a>
      </section>

      <section id="fingerbreadth" className="cun-guide-target">
        <h2 className="atlas-section-title">指幅（F-breadth）</h2>
        <p>本人の中指の先端側の節を横に測った幅です。たとえば<Link href="/tsubo/st6#acupoint-who-location" className="cun-guide-link">頬車（ST6）</Link>の位置説明に出てきます。</p>
        <a className="atlas-text-action" href={`${WHO_ATLAS_PDF}#page=11`}>WHO原本の単位の定義（p.2、PDF）</a>
      </section>
    </article>
  );
}

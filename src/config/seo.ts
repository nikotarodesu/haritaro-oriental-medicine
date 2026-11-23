import { SITE_NAME } from "./brand";
import { SERIES } from "./series";

export { SITE_NAME } from "./brand";
export const SITE_ORIGIN = "https://www.haritaro.jp";
export const HOME_HEADING = "東洋医学を学ぶ";
export const SITE_SECTIONS_LABEL = "ツボ図鑑・東洋医学の講義・臨床演習";
export const SITE_TITLE = seriesPageTitle(`${HOME_HEADING}｜ツボ図鑑・講義・臨床演習`, "reading");
export const SHARED_OG_IMAGES = [{
  url: SITE_ORIGIN + "/og-image.png?v=20261120",
  width: 1200,
  height: 630,
  alt: SITE_TITLE,
}];

export function seriesPageTitle(title: string, series: keyof typeof SERIES) {
  return `${title}｜${SERIES[series].name}`;
}

export function acupointPageTitle(point: { name: string; kana: string; code: string }) {
  return `${point.name}（${point.kana}・${point.code}）の場所と注意点｜はり太郎のツボ図鑑`;
}

export function pageSocialMetadata(title: string, description: string, path: string) {
  return {
    openGraph: { title, description, siteName: SITE_NAME, url: SITE_ORIGIN + path, images: SHARED_OG_IMAGES },
    twitter: { card: 'summary_large_image' as const, title, description, images: SHARED_OG_IMAGES.map(image => image.url) },
  };
}

export function collectionPageJsonLd(
  path: string,
  name: string,
  description: string,
  listName: string,
  entries: readonly { href: string; name: string }[],
) {
  const url = new URL(path, SITE_ORIGIN).href;
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": url,
    url,
    name,
    description,
    inLanguage: "ja",
    isPartOf: { "@id": SITE_ORIGIN + "/#website" },
    mainEntity: {
      "@type": "ItemList",
      name: listName,
      itemListElement: entries.map((entry, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: entry.name,
        url: new URL(entry.href, SITE_ORIGIN).href,
      })),
    },
  }).replace(/</g, "\\u003c");
}

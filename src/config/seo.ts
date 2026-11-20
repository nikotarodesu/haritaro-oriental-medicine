import { SITE_NAME } from "./brand";

export { SITE_NAME } from "./brand";
export const SITE_ORIGIN = "https://www.haritaro.jp";
export const SITE_TITLE = `${SITE_NAME}｜ツボ図鑑・症状ガイド・東洋医学・臨床演習`;
export const SHARED_OG_IMAGES = [{ url: SITE_ORIGIN + "/og-image.png", width: 1200, height: 630, alt: SITE_NAME }];

export function acupointPageTitle(point: { name: string; kana: string; code: string }) {
  return `${point.name}（${point.kana}・${point.code}）の場所と注意点｜はり太郎のツボ図鑑`;
}

export function pageSocialMetadata(title: string, description: string, path: string) {
  return {
    openGraph: { title, description, siteName: SITE_NAME, url: SITE_ORIGIN + path, images: SHARED_OG_IMAGES },
    twitter: { card: 'summary_large_image' as const, title, description, images: SHARED_OG_IMAGES.map(image => image.url) },
  };
}

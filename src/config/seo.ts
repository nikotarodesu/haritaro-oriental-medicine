import { SITE_NAME } from "./brand";

export { SITE_NAME } from "./brand";
export const SITE_TITLE = `${SITE_NAME}｜学習・臨床推論・患者問診メモ`;
export const SHARED_OG_IMAGES = [{ url: "https://www.haritaro.jp/og-image.png", width: 1200, height: 630, alt: SITE_NAME }];

export function acupointPageTitle(point: { name: string; code: string }) {
  return `${point.name}（${point.code}）の位置・伝統的な主治・注意事項｜鍼灸学習`;
}

export function pageSocialMetadata(title: string, description: string, path: string) {
  return {
    openGraph: { title, description, siteName: SITE_NAME, url: `https://www.haritaro.jp${path}`, images: SHARED_OG_IMAGES },
    twitter: { card: 'summary_large_image' as const, title, description, images: SHARED_OG_IMAGES.map(image => image.url) },
  };
}

import type { Metadata, Viewport } from "next";
import { Noto_Serif_JP, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { FontSizeProvider } from "@/contexts/FontSizeContext";
import { SeasonalThemeProvider } from "@/contexts/SeasonalThemeContext";
import { CurriculumProgressProvider } from "@/contexts/CurriculumProgressContext";
import { LearningSyncProvider } from "@/contexts/LearningSyncContext";
import MobileBottomNav from "@/components/navigation/MobileBottomNav";
import PwaRegister from "@/components/pwa/PwaRegister";
import PwaInstallPrompt from "@/components/pwa/PwaInstallPrompt";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { SHARED_OG_IMAGES, SITE_NAME, SITE_ORIGIN, SITE_TITLE } from "@/config/seo";
import { BRAND_INK } from "@/config/brand";
import { PLATFORM_DESCRIPTION } from "@/config/series";
import { getAdSensePublisherId } from "@/components/ads/config";
import { getLearningProgressCatalog } from "@/data/learningProgressCatalog";

const notoSerifJP = Noto_Serif_JP({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
});

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
});

const publisherId = getAdSensePublisherId();
const siteDescription = `${SITE_NAME}は東洋医学の学習サイトです。${PLATFORM_DESCRIPTION}`;
export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  applicationName: SITE_NAME,
  title: SITE_TITLE,
  description: siteDescription,
  other: publisherId ? { "google-adsense-account": publisherId } : undefined,
  verification: {
    google: "EQTaU5bcfwSgFprso13sFiyF35uZ5IHhaGz56GXqXbo",
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: SITE_ORIGIN,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: siteDescription,
    images: SHARED_OG_IMAGES,
  },
  twitter: {
    card: "summary_large_image",
    images: SHARED_OG_IMAGES.map(image => image.url),
  },
  // favicon.ico は app のファイル規約から自動追加されるため重複指定しない。
  // icons を明示すると icon/apple の自動追加は行われないので、両方をここで設定する。
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-touch-icon.png", type: "image/png", sizes: "180x180" }],
  },
  alternates: {
    canonical: "./",
  },
};

export const viewport: Viewport = {
  themeColor: BRAND_INK,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning className={`${notoSerifJP.variable} ${notoSansJP.variable} h-full antialiased`}>
      <head>
        {/* Google Analytics 4 (gtag.js - 環境変数 NEXT_PUBLIC_GA_ID 対応) */}
        <GoogleAnalytics />
        {/* 初期テーマ適用スクリプト（画面ちらつき防止） */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var saved;
                try {
                  saved = localStorage.getItem('haritaro-theme');
                } catch (e) {}
                const useDark = saved === 'yin' || (saved !== 'yang' && window.matchMedia('(prefers-color-scheme: dark)').matches);
                document.documentElement.classList.toggle('dark', useDark);
              })();
            `,
          }}
        />
        {/* 初期フォントサイズ適用スクリプト（画面ちらつき防止） */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const savedFs = localStorage.getItem('haritaro-font-size');
                  if (savedFs === 'large' || savedFs === 'xlarge') {
                    document.documentElement.setAttribute('data-font-size', savedFs);
                  } else {
                    document.documentElement.setAttribute('data-font-size', 'normal');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        {/* 全体構造化データ（WebSite / Organization） */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "@id": SITE_ORIGIN + "/#website",
                  "url": SITE_ORIGIN,
                  "name": SITE_NAME,
                  "description": siteDescription,
                  "inLanguage": "ja",
                  "publisher": {
                    "@id": SITE_ORIGIN + "/#organization",
                  },
                  "potentialAction": {
                    "@type": "SearchAction",
                    "target": SITE_ORIGIN + "/search?q={search_term_string}",
                    "query-input": "required name=search_term_string",
                  },
                },
                {
                  "@type": "Organization",
                  "@id": SITE_ORIGIN + "/#organization",
                  "name": SITE_NAME,
                  "url": SITE_ORIGIN,
                  "logo": SITE_ORIGIN + "/icon-512.png",
                  "description": siteDescription,
                  "founder": {
                    "@type": "Person",
                    "name": "はり太郎",
                    "jobTitle": "鍼灸師・鍼灸院院長",
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body data-clarity-mask="true" className="site-shell min-h-full flex flex-col font-sans">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[200] focus:rounded-lg focus:bg-[var(--action-bg)] focus:px-4 focus:py-3 focus:text-[var(--action-text)] focus:outline-2 focus:outline-offset-2">本文へ移動</a>
        <ThemeProvider>
          <FontSizeProvider>
            <SeasonalThemeProvider>
              <LearningSyncProvider>
                <CurriculumProgressProvider catalog={getLearningProgressCatalog()}>
                  <div data-clarity-sensitive className="contents"><Header /></div>
                  <main id="main-content" tabIndex={-1} className="flex-1 min-w-0">
                    {children}
                  </main>
                  <Footer />
                  <div data-clarity-sensitive className="contents"><MobileBottomNav /></div>
                  <PwaInstallPrompt />
                  <PwaRegister />
                </CurriculumProgressProvider>
              </LearningSyncProvider>
            </SeasonalThemeProvider>
          </FontSizeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

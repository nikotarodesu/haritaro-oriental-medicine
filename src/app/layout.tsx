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
import { SHARED_OG_IMAGES, SITE_NAME, SITE_TITLE } from "@/config/seo";
import { PLATFORM_DESCRIPTION } from "@/config/series";
import { getAdSensePublisherId } from "@/components/ads/config";
import { getLearningProgressCatalog } from "@/data/learningProgressCatalog";

const notoSerifJP = Noto_Serif_JP({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const publisherId = getAdSensePublisherId();
export const metadata: Metadata = {
  metadataBase: new URL("https://www.haritaro.jp"),
  applicationName: SITE_NAME,
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}【東洋医学・鍼灸】`,
  },
  description: PLATFORM_DESCRIPTION,
  other: publisherId ? { "google-adsense-account": publisherId } : undefined,
  verification: {
    google: "EQTaU5bcfwSgFprso13sFiyF35uZ5IHhaGz56GXqXbo",
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: "https://www.haritaro.jp",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: PLATFORM_DESCRIPTION,
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
  themeColor: "#184F49",
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
                try {
                  const saved = localStorage.getItem('haritaro-theme');
                  if (saved === 'yin' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
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
                  "@id": "https://www.haritaro.jp/#website",
                  "url": "https://www.haritaro.jp",
                  "name": SITE_NAME,
                  "description": PLATFORM_DESCRIPTION,
                  "publisher": {
                    "@id": "https://www.haritaro.jp/#organization",
                  },
                  "potentialAction": {
                    "@type": "SearchAction",
                    "target": "https://www.haritaro.jp/search?q={search_term_string}",
                    "query-input": "required name=search_term_string",
                  },
                },
                {
                  "@type": "Organization",
                  "@id": "https://www.haritaro.jp/#organization",
                  "name": SITE_NAME,
                  "url": "https://www.haritaro.jp",
                  "logo": "https://www.haritaro.jp/icon-512.png",
                  "description": PLATFORM_DESCRIPTION,
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
      <body data-clarity-mask="true" className="site-shell min-h-full flex flex-col font-sans bg-[#F5F1E8] dark:bg-[#10161C] text-[#232826] dark:text-[#E6EFEA] selection:bg-[#E2D5C3] dark:selection:bg-[#2A4B3E] selection:text-[#1E3D34] dark:selection:text-[#E6EFEA]">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[200] focus:rounded-lg focus:bg-[#184F49] focus:px-4 focus:py-3 focus:text-white focus:outline-2 focus:outline-offset-2">本文へ移動</a>
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

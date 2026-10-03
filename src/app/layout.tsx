import type { Metadata, Viewport } from "next";
import { Noto_Serif_JP, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { FontSizeProvider } from "@/contexts/FontSizeContext";
import { SeasonalThemeProvider } from "@/contexts/SeasonalThemeContext";
import { ClinicalMemoProvider } from "@/contexts/ClinicalMemoContext";
import { CurriculumProgressProvider } from "@/contexts/CurriculumProgressContext";
import { LearningSyncProvider } from "@/contexts/LearningSyncContext";
import { AuthProvider } from "@/contexts/AuthContext";
import MyClinicalRecordDrawer from "@/components/MyClinicalRecordDrawer";
import MobileBottomNav from "@/components/navigation/MobileBottomNav";
import ClinicalDrawerTrigger from "@/components/ClinicalDrawerTrigger";
import PwaRegister from "@/components/pwa/PwaRegister";
import PwaInstallPrompt from "@/components/pwa/PwaInstallPrompt";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { SHARED_OG_IMAGES, SITE_NAME, SITE_TITLE } from "@/config/seo";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://www.haritaro.jp"),
  applicationName: SITE_NAME,
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: "鍼灸学生の基礎学習から臨床家の弁証推論・配穴設計、患者への対面問診・説明、A4養生シート印刷まで。東洋医学の学びと実践をつなぐ統合Webプラットフォーム。",
  verification: {
    google: "EQTaU5bcfwSgFprso13sFiyF35uZ5IHhaGz56GXqXbo",
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: "https://www.haritaro.jp",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: "鍼灸学生の基礎学習から臨床家の弁証推論・配穴設計、患者への対面問診・説明、A4養生シート印刷まで。東洋医学の学びと実践をつなぐ統合Webプラットフォーム。",
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
                  "description": "陰陽・五行から弁証・配穴まで、東洋医学を体系的に学ぶ。経穴辞典、体質チェック、臨床演習、マイノートで、学習と日々の臨床の振り返りを支えます。",
                  "publisher": {
                    "@id": "https://www.haritaro.jp/#organization",
                  },
                  "potentialAction": {
                    "@type": "SearchAction",
                    "target": "https://www.haritaro.jp/tsubo?q={search_term_string}",
                    "query-input": "required name=search_term_string",
                  },
                },
                {
                  "@type": "Organization",
                  "@id": "https://www.haritaro.jp/#organization",
                  "name": SITE_NAME,
                  "url": "https://www.haritaro.jp",
                  "logo": "https://www.haritaro.jp/icon-512.png",
                  "description": "基礎理論から臨床実践までを体系化する東洋医学ポータル。",
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
      <body className="min-h-full flex flex-col font-sans bg-[#F5F1E8] dark:bg-[#10161C] text-[#232826] dark:text-[#E6EFEA] selection:bg-[#E2D5C3] dark:selection:bg-[#2A4B3E] selection:text-[#1E3D34] dark:selection:text-[#E6EFEA]">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[200] focus:rounded-lg focus:bg-[#184F49] focus:px-4 focus:py-3 focus:text-white focus:outline-2 focus:outline-offset-2">本文へ移動</a>
        <ThemeProvider>
          <FontSizeProvider>
            <SeasonalThemeProvider>
              <AuthProvider>
                <ClinicalMemoProvider>
                  <LearningSyncProvider><CurriculumProgressProvider catalog={getLearningProgressCatalog()}>
                    <Header />
                    <div id="main-content" tabIndex={-1} className="flex-1 pb-16 lg:pb-0">
                      {children}
                    </div>
                    <Footer />
                    <MyClinicalRecordDrawer />
                    <ClinicalDrawerTrigger />
                    <MobileBottomNav />
                    <PwaInstallPrompt />
                    <PwaRegister />
                  </CurriculumProgressProvider></LearningSyncProvider>
                </ClinicalMemoProvider>
              </AuthProvider>
            </SeasonalThemeProvider>
          </FontSizeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

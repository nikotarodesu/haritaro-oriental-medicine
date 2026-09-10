import type { Metadata } from "next";
import { Noto_Serif_JP, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

const notoSerifJP = Noto_Serif_JP({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.haritaro.jp"),
  title: {
    default: "はり太郎の東洋医学 | 基礎理論から臨床実践までを体系化する東洋医学ポータル",
    template: "%s | はり太郎の東洋医学",
  },
  description: "数千年の臨床智慧と現代神経科学が結実した東洋医学ポータル。基礎理論から臨床実践までを体系化。症状別ツボ検索、361経穴データベース、気血水体質診断、古典と最新論文の学術的解説。",
  verification: {
    google: "EQTaU5bcfwSgFprso13sFiyF35uZ5IHhaGz56GXqXbo",
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: "https://www.haritaro.jp",
    siteName: "はり太郎の東洋医学",
    title: "はり太郎の東洋医学 | 基礎理論から臨床実践までを体系化する東洋医学ポータル",
    description: "数千年の臨床智慧と現代神経科学が結実した東洋医学ポータル。基礎理論から臨床実践までを体系化。症状別ツボ検索、361経穴データベース、気血水体質診断、古典と最新論文の学術的解説。",
    images: [
      {
        url: "/icon.png",
        width: 512,
        height: 512,
        alt: "はり太郎の東洋医学",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "はり太郎の東洋医学 | 基礎理論から臨床実践までを体系化する東洋医学ポータル",
    description: "数千年の臨床智慧と現代神経科学が結実した東洋医学ポータル。基礎理論から臨床実践までを体系化。",
    images: ["/icon.png"],
  },
  alternates: {
    canonical: "https://www.haritaro.jp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning className={`${notoSerifJP.variable} ${notoSansJP.variable} h-full antialiased`}>
      <head>
        {/* Google Analytics 4 (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-GC398NZKVE" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-GC398NZKVE', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
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
      </head>
      <body className="min-h-full flex flex-col font-sans bg-[#FAF8F5] dark:bg-[#10161C] text-[#232826] dark:text-[#E6EFEA] selection:bg-[#E2D5C3] dark:selection:bg-[#2A4B3E] selection:text-[#1E3D34] dark:selection:text-[#E6EFEA]">
        <ThemeProvider>
          <Header />
          <div className="flex-1">
            {children}
          </div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

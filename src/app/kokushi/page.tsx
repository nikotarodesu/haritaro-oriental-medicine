import { SHARED_OG_IMAGES, SITE_NAME } from "@/config/seo";
import { Suspense } from "react";
import { Metadata } from "next";
import KokushiDashboard from "@/components/kokushi/KokushiDashboard";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "鍼灸国家試験対策ハブ｜過去問演習・東洋医学概論・経絡経穴・臨床論の要点整理",
  description: "はり師・きゅう師・あん摩マッサージ指圧師 国家試験対策特設ハブ。東洋医学概論・経絡経穴概論・東洋医学臨床論の頻出過去問・精選問題演習、間隔反復日替わり特訓、要穴・骨度法マスター、全81講義カリキュラム連携。",
  alternates: {
    canonical: "/kokushi",
  },
  openGraph: {
    images: SHARED_OG_IMAGES,
    siteName: SITE_NAME,
    title: "鍼灸国家試験対策ハブ｜過去問演習・東洋医学概論・経絡経穴・臨床論の要点整理 | はり太郎",
    description: "東洋医学概論・経絡経穴概論・臨床論の過去問演習、間隔反復復習、要穴骨度法を統合した鍼灸国試対策ハブ。",
    url: "https://www.haritaro.jp/kokushi",
  },
};

export default function KokushiPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: "はり師・きゅう師 国家試験対策特設ハブ",
    description: "鍼灸師・あん摩マッサージ指圧師国家試験（東洋医学概論・経絡経穴概論・東洋医学臨床論）の学習ハブ。間隔反復復習、オリジナル4択演習、状況設定問題、禁忌・リスク管理を網羅。",
    url: "https://www.haritaro.jp/kokushi",
    learningResourceType: "Exam Preparation Resource",
    educationalLevel: "National Certification Exam",
    inLanguage: "ja",
    teaches: [
      "東洋医学概論",
      "経絡経穴概論",
      "東洋医学臨床論",
      "十四経脈・骨度分寸",
      "配穴原則と刺鍼禁忌"
    ],
    provider: {
      "@type": "Organization",
      name: "はり太郎 (Haritaro)",
      url: "https://www.haritaro.jp",
      logo: "https://www.haritaro.jp/icon.svg"
    }
  };

  return (
    <div className="min-h-screen py-6 sm:py-12 px-3 sm:px-6 lg:px-8">
      {/* 構造化データ（JSON-LD） */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">
        {/* パンくずリスト */}
        <nav className="flex items-center gap-1.5 text-xs text-[#737C77] dark:text-[#8899A6]">
          <Link href="/" className="hover:text-[#1E3D34] dark:hover:text-[#74BA9E] transition-colors">
            ホーム
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#232826] dark:text-[#FAF8F5] font-bold">
            国家試験対策特設ハブ
          </span>
        </nav>

        {/* 静的SSR見出し・主要説明（初期HTML出力保証・SEO強化） */}
        <div className="space-y-3 border-b border-[#E8E1D1] dark:border-[#22303D] pb-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF3EF] dark:bg-[#162722] text-[#1E3D34] dark:text-[#74BA9E] text-xs font-bold border border-[#C5DED4] dark:border-[#234237]">
            <span>はり師・きゅう師・あん摩マッサージ指圧師 国家試験対策</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#232826] dark:text-[#FAF8F5]">
            鍼灸国家試験対策特設ハブ｜過去問演習・東洋医学3科目要点攻略
          </h1>
          <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#96A6B2] max-w-3xl leading-relaxed">
            はり師・きゅう師・あん摩マッサージ指圧師国家試験の合格を目指す受験生のための総合学習ハブです。「東洋医学概論」「経絡経穴概論」「東洋医学臨床論」の3主要科目を網羅。過去問精選4択演習、間隔反復（エビングハウスの忘却曲線）による日替わり弱点特訓、五要穴・骨度分寸・刺鍼禁忌の暗記マスター、全81講義カリキュラム直通の解説を提供します。
          </p>
          <div className="flex flex-wrap gap-2 pt-1 text-[11px] text-[#737C77] dark:text-[#8899A6]">
            <span className="px-2 py-0.5 rounded bg-[#FAF8F5] dark:bg-[#1A2632] border border-[#E8E1D1] dark:border-[#22303D]">#東洋医学概論（陰陽五行・気血津液・蔵象）</span>
            <span className="px-2 py-0.5 rounded bg-[#FAF8F5] dark:bg-[#1A2632] border border-[#E8E1D1] dark:border-[#22303D]">#経絡経穴概論（十四経脈・骨度法・要穴）</span>
            <span className="px-2 py-0.5 rounded bg-[#FAF8F5] dark:bg-[#1A2632] border border-[#E8E1D1] dark:border-[#22303D]">#東洋医学臨床論（病証弁証・配穴・状況設定問題）</span>
            <span className="px-2 py-0.5 rounded bg-[#FAF8F5] dark:bg-[#1A2632] border border-[#E8E1D1] dark:border-[#22303D]">#第20回〜第33回頻出テーマ対応</span>
          </div>
        </div>

        {/* 国試ダッシュボード本体（useSearchParams対応のためSuspenseラップ） */}
        <Suspense fallback={
          <div className="p-8 text-center text-xs text-[#737C77]">
            国家試験対策ハブを読み込み中...
          </div>
        }>
          <KokushiDashboard />
        </Suspense>
      </div>
    </div>
  );
}

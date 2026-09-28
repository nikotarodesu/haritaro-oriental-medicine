import { Suspense } from "react";
import { Metadata } from "next";
import KokushiDashboard from "@/components/kokushi/KokushiDashboard";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "国家試験対策特設ハブ｜東洋医学・経絡経穴で満点を狙う最短ルート",
  description: "はり太郎の国家試験対策特設ハブ。鍼灸師・あん摩マッサージ指圧師の国家試験に向け、忘却曲線に基づく日替わり特訓、状況設定症例演習、要穴・骨度法マスター、禁忌安全管理、全81講義の弱点克服カリキュラムを提供。",
  alternates: {
    canonical: "/kokushi",
  },
  openGraph: {
    title: "国家試験対策特設ハブ｜東洋医学・経絡経穴で満点を狙う最短ルート | はり太郎の東洋医学",
    description: "忘却曲線復習・状況設定演習・要穴骨度法・禁忌安全を統合した鍼灸国試対策ハブ。",
    url: "https://www.haritaro.jp/kokushi",
  },
};

export default function KokushiPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: "はり師・きゅう師 国家試験対策特設ハブ",
    description: "鍼灸師・あん摩マッサージ指圧師国家試験（東洋医学概論・経絡経穴概論・東洋医学臨床論）の完全攻略ハブ。忘却曲線復習、本試験実問アーカイブ、状況設定問題、禁忌・リスク管理を網羅。",
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

        {/* 静的SSR見出し・主要説明（初期HTML出力保証） */}
        <div className="space-y-2 border-b border-[#E8E1D1] dark:border-[#22303D] pb-5">
          <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#232826] dark:text-[#FAF8F5]">
            国家試験対策特設ハブ
          </h1>
          <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#96A6B2] max-w-3xl leading-relaxed">
            鍼灸師・あん摩マッサージ指圧師国家試験（東洋医学概論・経絡経穴概論・東洋医学臨床論）を攻略。忘却曲線に基づく日替わり特訓、重要演習問題、要穴・骨度法マスター、全81講義カリキュラムへの弱点直通復習を統合した特設ハブです。
          </p>
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

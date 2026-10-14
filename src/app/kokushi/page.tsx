import { SHARED_OG_IMAGES, SITE_NAME } from "@/config/seo";
import { Suspense } from "react";
import { Metadata } from "next";
import KokushiDashboard from "@/components/kokushi/KokushiDashboard";
import Link from "next/link";
import PageIntro from "@/components/design/PageIntro";
import { ChevronRight, CircleCheck, RotateCcw } from "lucide-react";

export const metadata: Metadata = {
  title: "鍼灸国家試験対策ハブ｜オリジナル演習・東洋医学3科目の要点確認",
  description: "はり師・きゅう師・あん摩マッサージ指圧師の国家試験に向け、東洋医学概論・経絡経穴概論・東洋医学臨床論を復習。オリジナル4択問題を解き、間違えた内容を講義と日替わり復習で確かめます。",
  alternates: {
    canonical: "/kokushi",
  },
  openGraph: {
    images: SHARED_OG_IMAGES,
    siteName: SITE_NAME,
    title: "鍼灸国家試験対策ハブ｜オリジナル演習・東洋医学3科目の要点確認 | はり太郎",
    description: "東洋医学3科目のオリジナル4択問題を解き、間違えた内容を講義と日替わり復習で確認できる鍼灸国家試験対策ハブ。",
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
    <div className="page-layout">
      {/* 構造化データ（JSON-LD） */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="space-y-6 sm:space-y-8">
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

        <PageIntro eyebrow="はり師・きゅう師・あん摩マッサージ指圧師 国家試験対策" title="国試の知識を、確かな理解に。" description="東洋医学3科目を、オリジナル4択問題と日替わり復習で確かめます。" art="practice">
          <div className="page-actions"><a href="#exam-practice" className="page-primary-action"><CircleCheck aria-hidden="true" className="h-5 w-5" />4択問題を解く</a><a href="#learning-review" className="page-secondary-action"><RotateCcw aria-hidden="true" className="h-5 w-5" />今日の復習</a></div>
        </PageIntro>

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

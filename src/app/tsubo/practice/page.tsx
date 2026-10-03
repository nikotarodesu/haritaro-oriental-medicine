import { SHARED_OG_IMAGES, SITE_NAME } from "@/config/seo";
import { Metadata } from "next";
import PracticeClient from "./PracticeClient";

export const metadata: Metadata = {
  title: "経穴学習・今日の復習｜間隔反復と14経脈小単位クイズ",
  description:
    "エビングハウスの忘却曲線アルゴリズムに基づく経穴暗記・復習システム。十四経脈の小単元別ドリル、骨度法・要穴の弱点特訓、自己評価による復習間隔の最適化を支援します。",
  alternates: {
    canonical: "/tsubo/practice",
  },
  openGraph: {
      images: SHARED_OG_IMAGES,
      siteName: SITE_NAME,
    title: "経穴学習・今日の復習｜間隔反復と14経脈小単位クイズ | はり太郎の東洋医学",
    description:
      "忘却曲線に基づき今日復習すべき経穴を自動選定。十四経脈別クイズと弱点克服ドリル。",
    url: "https://www.haritaro.jp/tsubo/practice",
  },
};

export default function PracticePage() {
  return (
    <div className="min-h-screen">
      {/* 検索エンジン・アクセシビリティ用 静的SSRヘッダー */}
      <header className="sr-only">
        <h1>経穴学習・今日の復習｜間隔反復と14経脈小単位クイズ</h1>
        <p>
          十四経脈・361穴の場所、要穴区分、主治を間隔反復で暗記する学習演習モード。今日の復習問題、経脈別5問テスト、保存した経穴の集中演習を行えます。
        </p>
      </header>
      <PracticeClient />
    </div>
  );
}

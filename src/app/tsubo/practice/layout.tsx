import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "経穴学習・今日の復習｜間隔反復と14経脈小単位クイズ | はり太郎の経穴辞典",
  description:
    "WHO標準361経穴をスキマ時間で無理なく覚える東洋医学学習環境。間隔反復アルゴリズム（1日・3日・7日・14日・30日）による毎日の復習、14経脈ごとの小単位ユニット、要穴特訓を収録。",
  alternates: {
    canonical: "/tsubo/practice",
  },
  openGraph: {
    title: "経穴学習・今日の復習｜間隔反復と14経脈小単位クイズ | はり太郎の東洋医学",
    description: "WHO標準361経穴をスキマ時間で無理なく覚える東洋医学学習環境。間隔反復アルゴリズムによる毎日の復習。",
    url: "https://www.haritaro.jp/tsubo/practice",
  },
};

export default function PracticeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

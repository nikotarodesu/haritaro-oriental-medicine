import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "気血水体質診断・五労ワークスタイル診断｜東洋医学セルフチェック",
  description:
    "簡単な質問に答えるだけで気虚・気滞・血虚・瘀血・陰虚・痰湿の体質傾向をスコアリング。デスクワークや現代の生活習慣に対応した五労チェックと、あなたに最適なツボ・養生法を提案。",
  alternates: {
    canonical: "/diagnosis",
  },
  openGraph: {
    title: "気血水体質診断・五労ワークスタイル診断｜東洋医学セルフチェック",
    description: "気血水の体質傾向と五労の疲労パターンを診断し、おすすめのツボと養生法をご案内。",
    url: "https://www.haritaro.jp/diagnosis",
  },
};

export default function DiagnosisLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

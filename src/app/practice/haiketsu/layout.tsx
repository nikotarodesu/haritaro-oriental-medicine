import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "配穴設計・臨床演習｜臨床基本32穴による処方構成トレーニング",
  description:
    "基本32穴の中から目的に応じた経穴を選定し、本治穴（根本体質）と標治穴（局所対症）のバランスや昇降・寒熱のベクトルを分析。選定理由を言語化して教材例と比較する演習ツール。",
  alternates: {
    canonical: "/practice/haiketsu",
  },
  openGraph: {
    title: "配穴設計・臨床演習｜臨床基本32穴による処方構成トレーニング",
    description: "本治・標治のバランスや昇降・寒熱のベクトルを分析し、選定理由を整理する配穴演習ツール。",
    url: "https://www.haritaro.jp/practice/haiketsu",
  },
};

export default function HaiketsuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

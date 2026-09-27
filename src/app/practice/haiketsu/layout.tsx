import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "配穴設計・練習ツール｜経穴の選定理由を整理",
  description:
    "経穴を選び、治療方針との関係や選定意図を整理する配穴演習。既存の教材例や記録機能を使って考え方を振り返ります。",
  alternates: {
    canonical: "/practice/haiketsu",
  },
  openGraph: {
    title: "配穴設計・練習ツール｜経穴の選定理由を整理",
    description:
      "経穴を選び、治療方針との関係や選定意図を整理する配穴演習。既存の教材例や記録機能を使って考え方を振り返ります。",
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

import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "条件比較シミュレーター｜証と配穴の相違点・鑑別比較教材",
  description:
    "似た主訴・症状における異なる病態条件を比較し、八綱・気血水・臓腑の鑑別ポイントと選定配穴の違いを深く学ぶ鑑別比較ツール。",
  alternates: {
    canonical: "/simulator/compare",
  },
  openGraph: {
    title: "条件比較シミュレーター｜証と配穴の相違点・鑑別比較教材",
    description: "異なる病態条件から証名と配穴の使い分けを学ぶ鑑別比較教材。",
    url: "https://www.haritaro.jp/simulator/compare",
  },
};

export default function SimulatorCompareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

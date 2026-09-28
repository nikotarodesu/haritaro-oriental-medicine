import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "経穴辞典｜経穴の場所・取穴を調べる",
  description:
    "経穴の名前・読み方・経脈・部位から調べられる辞典。各経穴の場所や取穴の説明を図と文章で確認できます。",
  alternates: {
    canonical: "/tsubo",
  },
  openGraph: {
    title: "経穴辞典｜経穴の場所・取穴を調べる | はり太郎の東洋医学",
    description:
      "経穴の名前・読み方・経脈・部位から調べられる辞典。各経穴の場所や取穴の説明を図と文章で確認できます。",
    url: "https://www.haritaro.jp/tsubo",
  },
};

export default function TsuboLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

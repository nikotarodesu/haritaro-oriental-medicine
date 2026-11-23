import { pageSocialMetadata, seriesPageTitle } from "@/config/seo";
import { Metadata } from "next";
import React from "react";

const description = "はり太郎の掲載内容・経穴の解説・出典に関するご指摘や、取材・執筆のご依頼の窓口です。";
const title = seriesPageTitle("お問い合わせ", "reading");

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/contact",
  },
  ...pageSocialMetadata(title, description, "/contact"),
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

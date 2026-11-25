"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useAtlasDictionaryReturn } from "@/hooks/useAtlasReturn";

export default function AtlasDictionaryReturnLink({ className, children = "図鑑に戻る" }: {
  className?: string;
  children?: ReactNode;
}) {
  const returnToDictionary = useAtlasDictionaryReturn();
  return <Link href="/tsubo" prefetch={false} className={className} onNavigate={returnToDictionary}>{children}</Link>;
}

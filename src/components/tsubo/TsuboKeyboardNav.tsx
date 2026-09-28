"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

interface TsuboKeyboardNavProps {
  prevUrl?: string | null;
  nextUrl?: string | null;
}

export default function TsuboKeyboardNav({ prevUrl, nextUrl }: TsuboKeyboardNavProps) {
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // フォーム入力中のキー入力はスキップ
      const target = e.target as HTMLElement | null;
      const isInput =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable;
      if (isInput) return;

      // 「[」キー または Alt + ← で前のツボへ
      if ((e.key === "[" || (e.altKey && e.key === "ArrowLeft")) && prevUrl) {
        e.preventDefault();
        router.push(prevUrl);
      }
      // 「]」キー または Alt + → で次のツボへ
      else if ((e.key === "]" || (e.altKey && e.key === "ArrowRight")) && nextUrl) {
        e.preventDefault();
        router.push(nextUrl);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prevUrl, nextUrl, router]);

  return null;
}

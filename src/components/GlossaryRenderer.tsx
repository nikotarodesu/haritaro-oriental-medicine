"use client";

import React from "react";
import { GLOSSARY_TERMS } from "@/data/glossaryData";
import TermTooltip from "./TermTooltip";

interface GlossaryRendererProps {
  text: string;
  seenTerms?: Set<string>;
}

export default function GlossaryRenderer({ text, seenTerms }: GlossaryRendererProps) {
  // 不要なMarkdown太字記号（**）を完全に除去してクリーンな日本語表示にする
  const cleanText = text ? text.replace(/\*\*/g, "") : "";

  // 登録されている全用語のリスト（長い単語から優先してマッチするようにソート）
  const terms = Object.keys(GLOSSARY_TERMS).sort((a, b) => b.length - a.length);

  if (!terms.length || !cleanText) {
    return <>{cleanText}</>;
  }

  // 用語をキャプチャする正規表現を作成（例: /(下行性疼痛抑制系|内因性オピオイド|大脳辺縁系|弁証論治|...)/g）
  const escapedTerms = terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const regex = new RegExp(`(${escapedTerms.join("|")})`, "g");

  // テキストを分割
  const parts = cleanText.split(regex);

  // 外部から渡された seenTerms があればそれを使い、なければコンポーネント内ローカルの Set を使用
  const tracker = seenTerms ?? new Set<string>();

  return (
    <>
      {parts.map((part, i) => {
        const termInfo = GLOSSARY_TERMS[part];
        if (termInfo) {
          // すでにこのスコープ（講義や記事）で出現済みの用語はリンク化せず、通常のテキストとして表示
          if (tracker.has(part)) {
            return <React.Fragment key={i}>{part}</React.Fragment>;
          }
          // 初出の場合のみ記録し、ツールチップ化
          tracker.add(part);

          return (
            <TermTooltip key={i} termInfo={termInfo}>
              {part}
            </TermTooltip>
          );
        }
        return <React.Fragment key={i}>{part}</React.Fragment>;
      })}
    </>
  );
}

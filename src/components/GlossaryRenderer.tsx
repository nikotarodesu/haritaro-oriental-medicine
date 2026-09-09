"use client";

import React from "react";
import { GLOSSARY_TERMS } from "@/data/glossaryData";
import TermTooltip from "./TermTooltip";

interface GlossaryRendererProps {
  text: string;
}

export default function GlossaryRenderer({ text }: GlossaryRendererProps) {
  // 登録されている全用語のリスト（長い単語から優先してマッチするようにソート）
  const terms = Object.keys(GLOSSARY_TERMS).sort((a, b) => b.length - a.length);

  if (!terms.length) {
    return <>{text}</>;
  }

  // 用語をキャプチャする正規表現を作成（例: /(下行性疼痛抑制系|内因性オピオイド|大脳辺縁系|弁証論治|...)/g）
  const escapedTerms = terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const regex = new RegExp(`(${escapedTerms.join("|")})`, "g");

  // テキストを分割
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) => {
        const termInfo = GLOSSARY_TERMS[part];
        if (termInfo) {
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

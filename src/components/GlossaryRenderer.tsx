"use client";

import React from "react";
import { GLOSSARY_TERMS } from "@/data/glossaryData";
import TermTooltip from "./TermTooltip";

interface GlossaryRendererProps {
  text: string;
  seenTerms?: Set<string>;
}

export default function GlossaryRenderer({ text, seenTerms }: GlossaryRendererProps) {
  if (!text) return null;

  // 1. 太字記号 **...** でテキストを分割（奇数インデックスが太字部分）
  // 例: "前 **太字** 後" -> ["前 ", "太字", " 後"]
  const boldParts = text.split(/\*\*(.*?)\*\*/g);

  const tracker = seenTerms ?? new Set<string>();

  // 登録用語のリスト（長い単語優先）
  const terms = Object.keys(GLOSSARY_TERMS).sort((a, b) => b.length - a.length);
  const escapedTerms = terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const termRegex = terms.length > 0 ? new RegExp(`(${escapedTerms.join("|")})`, "g") : null;

  // 単一のプレーンテキスト断片に対して専門用語ツールチップを適用する内部ヘルパー
  const renderGlossaryTerms = (str: string, keyPrefix: string) => {
    if (!termRegex || !str) return <React.Fragment key={keyPrefix}>{str}</React.Fragment>;

    const segments = str.split(termRegex);
    return (
      <React.Fragment key={keyPrefix}>
        {segments.map((segment, segIdx) => {
          const termInfo = GLOSSARY_TERMS[segment];
          if (termInfo) {
            if (tracker.has(segment)) {
              return <React.Fragment key={`${keyPrefix}-${segIdx}`}>{segment}</React.Fragment>;
            }
            tracker.add(segment);
            return (
              <TermTooltip key={`${keyPrefix}-${segIdx}`} termInfo={termInfo}>
                {segment}
              </TermTooltip>
            );
          }
          return <React.Fragment key={`${keyPrefix}-${segIdx}`}>{segment}</React.Fragment>;
        })}
      </React.Fragment>
    );
  };

  return (
    <>
      {boldParts.map((part, index) => {
        const isBold = index % 2 === 1;

        if (isBold) {
          // 太字部分：文字色を強調し、背景にほんのりハイライトを敷いて視認性を大幅向上
          return (
            <strong
              key={`bold-${index}`}
              className="font-bold text-[#1E3D34] dark:text-[#E6C387] bg-[#EBF3EF]/60 dark:bg-[#1E2E28] px-1 py-0.5 rounded-sm mx-0.5"
            >
              {renderGlossaryTerms(part, `bold-content-${index}`)}
            </strong>
          );
        }

        // 通常テキスト部分
        return renderGlossaryTerms(part, `plain-${index}`);
      })}
    </>
  );
}

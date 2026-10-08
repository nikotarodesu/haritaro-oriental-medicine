"use client";

import React, { useState } from "react";
import { GLOSSARY_TERMS, GlossaryTerm } from "@/data/glossaryData";
import GlossaryPopup from "@/components/glossary/GlossaryPopup";
import { splitGlossaryText } from "@/utils/glossaryOccurrences";

interface GlossaryRendererProps {
  text: string;
  seenTerms?: ReadonlySet<string>;
  enablePopup?: boolean;
}

export default function GlossaryRenderer({
  text,
  seenTerms,
  enablePopup = true,
}: GlossaryRendererProps) {
  const [activeTerm, setActiveTerm] = useState<GlossaryTerm | null>(null);

  // This render owns its working copy. Props and hook state must remain intact
  // when React replays rendering, hydrates, or opens/closes the popup.
  const activeSeenTerms = new Set(seenTerms);

  if (!text) return null;

  // 用語をボタンとして描画する関数
  const renderInteractiveText = (rawStr: string, keyPrefix: string) => {
    if (!enablePopup) {
      return renderTextWithBreaks(rawStr, keyPrefix);
    }

    const segments = splitGlossaryText(rawStr);

    return (
      <React.Fragment key={keyPrefix}>
        {segments.map((seg, sIdx) => {
          const matchedTerm = GLOSSARY_TERMS[seg];

          if (matchedTerm) {
            const termKey = matchedTerm.term;
            if (!activeSeenTerms.has(termKey)) {
              // 初回登場時（最初の1回目）のみクリック可能なポップアップリンクとして描画
              activeSeenTerms.add(termKey);
              return (
                <button
                  key={`${keyPrefix}-term-${sIdx}`}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setActiveTerm(matchedTerm);
                  }}
                  className="inline-flex items-baseline font-bold text-[#1E3D34] dark:text-[#74BA9E] border-b border-dotted border-[#1E3D34] dark:border-[#74BA9E] hover:bg-[#EBF3EF] dark:hover:bg-[#182823] rounded px-0.5 transition-colors cursor-pointer text-left"
                  title={`${matchedTerm.term}（${matchedTerm.reading}）の解説を見る`}
                >
                  {seg}
                </button>
              );
            }

            // 2回目以降の登場は点線ボタンにせず、通常のテキストとして描画（視認性を確保）
            return renderTextWithBreaks(seg, `${keyPrefix}-seg-${sIdx}`);
          }

          return renderTextWithBreaks(seg, `${keyPrefix}-seg-${sIdx}`);
        })}
      </React.Fragment>
    );
  };

  // 改行（<br>）の処理とプレーンテキストの描画
  const renderTextWithBreaks = (str: string, keyPrefix: string) => {
    if (!str) return null;
    const lineParts = str.split(/(<br\s*\/?>)/gi);

    return (
      <React.Fragment key={keyPrefix}>
        {lineParts.map((linePart, lineIdx) => {
          if (/^<br\s*\/?>$/i.test(linePart)) {
            return <br key={`${keyPrefix}-br-${lineIdx}`} />;
          }
          return <React.Fragment key={`${keyPrefix}-txt-${lineIdx}`}>{linePart}</React.Fragment>;
        })}
      </React.Fragment>
    );
  };

  // Markdownの **太字** を検出して処理
  const parts = text.split(/\*\*(.*?)\*\*/g);

  return (
    <>
      {parts.map((part, index) => {
        const isBold = index % 2 === 1;

        if (isBold) {
          return (
            <strong
              key={`bold-${index}`}
              className="font-bold text-[#1E3D34] dark:text-[#74BA9E]"
            >
              {renderInteractiveText(part, `bold-content-${index}`)}
            </strong>
          );
        }

        const sanitized = part ? part.replace(/\*\*/g, "") : "";
        return renderInteractiveText(sanitized, `plain-${index}`);
      })}

      {/* 用語解説ポップアップ（PC: モーダルカード / スマホ: ボトムシート） */}
      <GlossaryPopup
        term={activeTerm}
        isOpen={!!activeTerm}
        onClose={() => setActiveTerm(null)}
      />
    </>
  );
}

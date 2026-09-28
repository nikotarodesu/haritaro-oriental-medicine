"use client";

import React, { useState, useMemo } from "react";
import { GLOSSARY_TERMS, GlossaryTerm } from "@/data/glossaryData";
import GlossaryPopup from "@/components/glossary/GlossaryPopup";

interface GlossaryRendererProps {
  text: string;
  seenTerms?: Set<string>;
  enablePopup?: boolean;
}

export default function GlossaryRenderer({
  text,
  seenTerms,
  enablePopup = true,
}: GlossaryRendererProps) {
  const [activeTerm, setActiveTerm] = useState<GlossaryTerm | null>(null);

  // 用語リスト（長い語順でソートして部分一致の誤爆を防ぐ）
  const termKeys = useMemo(() => {
    return Object.keys(GLOSSARY_TERMS).sort((a, b) => b.length - a.length);
  }, []);

  // 用語検出用正規表現パターン
  const termRegex = useMemo(() => {
    if (termKeys.length === 0) return null;
    const escaped = termKeys.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
    return new RegExp(`(${escaped.join("|")})`, "g");
  }, [termKeys]);

  if (!text) return null;

  // 用語をボタンとして描画する関数
  const renderInteractiveText = (rawStr: string, keyPrefix: string) => {
    if (!termRegex || !enablePopup) {
      return renderTextWithBreaks(rawStr, keyPrefix);
    }

    const segments = rawStr.split(termRegex);
    const localSeen = seenTerms || new Set<string>();

    return (
      <React.Fragment key={keyPrefix}>
        {segments.map((seg, sIdx) => {
          const matchedTerm = GLOSSARY_TERMS[seg];

          if (matchedTerm) {
            // 初回登場時または主要用語はクリック可能なポップアップリンクとして描画
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

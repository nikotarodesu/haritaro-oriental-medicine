"use client";

import React from "react";
import { ResolvedReference } from "@/types/references";
import CitationBadge from "./CitationBadge";
import GlossaryRenderer from "./GlossaryRenderer";

interface CitationTextRendererProps {
  text: string;
  resolvedReferences?: ResolvedReference[];
  seenTerms?: Set<string>;
}

export default function CitationTextRenderer({
  text,
  resolvedReferences = [],
  seenTerms,
}: CitationTextRendererProps) {
  if (!text) return null;

  // インライン参照のパターン: [^id] または [ref:id]
  const citationRegex = /(?:\[\^([a-zA-Z0-9_-]+)\]|\[ref:([a-zA-Z0-9_-]+)\])/g;

  if (!citationRegex.test(text)) {
    return <GlossaryRenderer text={text} seenTerms={seenTerms} />;
  }

  citationRegex.lastIndex = 0; // リセット
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = citationRegex.exec(text)) !== null) {
    const matchIndex = match.index;
    const matchLength = match[0].length;
    const rawId = match[1] || match[2];

    // マッチ前のテキスト
    if (matchIndex > lastIndex) {
      const textBefore = text.substring(lastIndex, matchIndex);
      parts.push(
        <GlossaryRenderer
          key={`text-${lastIndex}`}
          text={textBefore}
          seenTerms={seenTerms}
        />
      );
    }

    // 該当する文献を検索
    let matchedRef: ResolvedReference | undefined;
    const isNumeric = /^\d+$/.test(rawId);

    if (isNumeric) {
      const num = parseInt(rawId, 10);
      matchedRef = resolvedReferences.find((r) => r.index === num);
    } else {
      matchedRef = resolvedReferences.find((r) => r.id === rawId);
    }

    const displayNumber = matchedRef ? matchedRef.index : (isNumeric ? parseInt(rawId, 10) : 1);
    const targetAnchorId = matchedRef ? matchedRef.anchorId : `ref-${displayNumber}`;

    parts.push(
      <CitationBadge
        key={`citation-${matchIndex}`}
        reference={matchedRef}
        displayNumber={displayNumber}
        targetAnchorId={targetAnchorId}
      />
    );

    lastIndex = matchIndex + matchLength;
  }

  // 残りのテキスト
  if (lastIndex < text.length) {
    const textAfter = text.substring(lastIndex);
    parts.push(
      <GlossaryRenderer
        key={`text-${lastIndex}`}
        text={textAfter}
        seenTerms={seenTerms}
      />
    );
  }

  return <>{parts}</>;
}

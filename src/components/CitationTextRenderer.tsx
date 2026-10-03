"use client";

import React from "react";
import Link from "next/link";
import { ResolvedReference } from "@/types/references";
import { tokenizeCitationInline, CitationInlineToken } from "@/utils/citationInlineTokens";
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

  const tokens = tokenizeCitationInline(text);
  if (tokens.every((token) => token.type === "text")) {
    return <GlossaryRenderer text={text} seenTerms={seenTerms} />;
  }

  const renderToken = (token: CitationInlineToken, index: number): React.ReactNode => {
    if (token.type === "text") {
      return <GlossaryRenderer key={"text-" + index} text={token.value} seenTerms={seenTerms} />;
    }
    if (token.type === "link") {
      const label = <GlossaryRenderer text={token.label} enablePopup={false} />;
      const className = "font-semibold text-[#1E3D34] dark:text-[#74BA9E] underline underline-offset-2 break-words focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B86924]";
      return token.external ? (
        <a key={"link-" + index} href={token.href} target="_blank" rel="noopener noreferrer" className={className}>{label}</a>
      ) : (
        <Link key={"link-" + index} href={token.href} className={className}>{label}</Link>
      );
    }

    // Preserve the existing numeric and named reference resolution.
    const rawId = token.id;
    const isNumeric = /^\d+$/.test(rawId);
    const matchedRef = isNumeric
      ? resolvedReferences.find((reference) => reference.index === parseInt(rawId, 10))
      : resolvedReferences.find((reference) => reference.id === rawId);
    const displayNumber = matchedRef ? matchedRef.index : (isNumeric ? parseInt(rawId, 10) : 1);
    const targetAnchorId = matchedRef ? matchedRef.anchorId : "ref-" + displayNumber;
    return (
      <CitationBadge
        key={"citation-" + index}
        reference={matchedRef}
        displayNumber={displayNumber}
        targetAnchorId={targetAnchorId}
      />
    );
  };

  // Keep emphasis spanning links/citations. Link labels handle their own
  // emphasis through GlossaryRenderer with glossary interaction disabled.
  const inlineParts: CitationInlineToken[] = tokens.flatMap<CitationInlineToken>((token) =>
    token.type === "text"
      ? token.value.split(/(\*\*)/g).filter(Boolean).map((value) => ({ type: "text" as const, value }))
      : [token]
  );
  const markerCount = inlineParts.filter((token) => token.type === "text" && token.value === "**").length;
  const pairedMarkers = markerCount - (markerCount % 2);
  const parts: React.ReactNode[] = [];
  let boldParts: React.ReactNode[] | null = null;
  let markerIndex = 0;
  inlineParts.forEach((token, index) => {
    if (token.type === "text" && token.value === "**") {
      if (markerIndex++ >= pairedMarkers) return;
      if (boldParts) {
        parts.push(<strong key={"bold-" + index} className="font-bold text-[#1E3D34] dark:text-[#74BA9E]">{boldParts}</strong>);
        boldParts = null;
      } else {
        boldParts = [];
      }
      return;
    }
    (boldParts || parts).push(renderToken(token, index));
  });

  return <>{parts}</>;
}

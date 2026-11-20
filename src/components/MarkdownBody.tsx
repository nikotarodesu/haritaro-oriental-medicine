"use client";

import React from "react";
import Link from "next/link";
import InlineConceptFigure from "@/components/reading/InlineConceptFigure";
import CitationTextRenderer from "@/components/CitationTextRenderer";
import EastWestTermSwitch from "@/components/EastWestTermSwitch";
import CurriculumDiagram from "@/components/CurriculumDiagram";
import { parseMarkdownBlocks } from "@/utils/markdownParser";
import { ResolvedReference } from "@/types/references";
import type { ReadingInsert, ReadingLink } from "@/types/reading";
import { resolveConceptArtPlacement, resolveReadingInsertions } from "@/utils/readingInserts";

interface MarkdownBodyProps {
  contentMarkdown: string;
  onNextLecture?: () => void;
  idPrefix?: string;
  resolvedReferences?: ResolvedReference[];
  readingInserts?: ReadingInsert[];
  relatedReading?: ReadingLink;
  collapseAdvanced?: boolean;
  conceptArt?: { afterHeading: string; node: React.ReactNode } | null;
}

export default function MarkdownBody({
  contentMarkdown,
  onNextLecture,
  idPrefix = "section-heading",
  resolvedReferences,
  readingInserts,
  relatedReading,
  collapseAdvanced = false,
  conceptArt,
}: MarkdownBodyProps) {
  const blocks = parseMarkdownBlocks(contentMarkdown);
  const figurePlacements = resolveReadingInsertions(blocks, readingInserts ?? []);
  const artPlacementIndex = conceptArt ? resolveConceptArtPlacement(blocks, conceptArt.afterHeading, figurePlacements) : -1;
  const lastFigureIndex = Math.max(-1, ...figurePlacements.keys());

  const renderText = (text: string) => (
    <CitationTextRenderer
      text={text}
      resolvedReferences={resolvedReferences}
    />
  );

  const renderBlock = (block: (typeof blocks)[number], index: number) => {
        switch (block.type) {
          case "h1":
            return (
              <h1
                key={index}
                id={`${idPrefix}-${index}`}
                className="mt-9 mb-4 scroll-mt-32 text-2xl leading-snug font-semibold text-ink sm:text-3xl"
              >
                {renderText(block.content)}
              </h1>
            );
          case "h2":
            return (
              <h2
                key={index}
                id={`${idPrefix}-${index}`}
                className="mt-8 scroll-mt-32 text-xl leading-[1.55] font-semibold text-ink sm:text-2xl"
              >
                {renderText(block.content)}
              </h2>
            );
          case "h3":
            return (
              <h3
                key={index}
                id={`${idPrefix}-${index}`}
                className="mt-7 scroll-mt-32 text-lg leading-[1.55] font-semibold text-ink sm:text-xl"
              >
                {renderText(block.content)}
              </h3>
            );
          case "h4":
            return (
              <h4
                key={index}
                id={`${idPrefix}-${index}`}
                className="mt-6 scroll-mt-32 text-base leading-relaxed font-semibold text-ink sm:text-lg"
              >
                {renderText(block.content)}
              </h4>
            );
          case "blockquote":
            return (
              <blockquote
                key={index}
                className="my-4 rounded-e-lg border-s-2 border-accent bg-panel-selected p-4 text-base leading-[1.9]"
              >
                {renderText(block.content)}
              </blockquote>
            );
          case "table":
            return (
              <div
                key={index}
                className="reading-table my-6 max-w-full overflow-x-auto rounded-lg border border-frame bg-panel focus-visible:outline-2 focus-visible:outline-accent"
                role="region"
                aria-label="本文の表"
                tabIndex={0}
              >
                <table className="w-full min-w-[285px] border-collapse text-left text-sm">
                  <thead className="border-b border-frame bg-panel-selected text-accent">
                    <tr>
                      {block.headers.map((h, hIdx) => (
                        <th
                          key={hIdx}
                          scope="col"
                          className="px-2.5 py-2.5 text-sm leading-relaxed font-semibold sm:px-4"
                        >
                          {renderText(h)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-divider">
                    {block.rows.map((row, rIdx) => (
                      <tr
                        key={rIdx}
                        className="even:bg-page"
                      >
                        {row.map((cell, cIdx) => (
                          <td
                            key={cIdx}
                            className={`px-2.5 py-2.5 align-top leading-[1.75] sm:px-4 ${
                              cIdx === 0
                                ? "border-e border-divider font-medium"
                                : ""
                            }`}
                          >
                            {renderText(cell)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case "list": {
            const ListTag = block.ordered ? "ol" : "ul";
            return (
              <ListTag
                key={index}
                className={`space-y-2.5 my-4 pl-4 sm:pl-6 ${
                  block.ordered
                    ? "list-decimal marker:font-semibold marker:text-accent"
                    : "list-disc marker:text-accent"
                }`}
              >
                {block.items.map((item, iIdx) => (
                  <li key={iIdx} className="ps-1 whitespace-pre-line">
                    {renderText(item)}
                  </li>
                ))}
              </ListTag>
            );
          }
          case "paragraph":
            return (
              <p
                key={index}
                className="my-3 whitespace-pre-line"
              >
                {renderText(block.content)}
              </p>
            );
          case "card":
            return <div key={index} className="my-4 min-w-0 rounded-xl border border-frame bg-page p-4 whitespace-pre-line [overflow-wrap:anywhere]">{renderText(block.content)}</div>;
          case "code":
            return <pre key={index} className="my-4 max-w-full overflow-x-auto rounded-xl bg-panel-muted p-4 text-sm"><code>{block.content}</code></pre>;
          case "diagram":
            return (
              <div key={index} className="not-prose my-6">
                <CurriculumDiagram id={block.diagramId} onNextLecture={onNextLecture} />
              </div>
            );
          case "eastwest":
            return (
              <div key={index} className="not-prose my-6">
                <EastWestTermSwitch termId={block.termId} />
              </div>
            );
          case "image":
            return (
              <figure
                key={index}
                className="my-6 rounded-xl border border-frame bg-page p-3 text-center sm:my-8 sm:p-6"
              >
                <img src={block.src} alt={block.alt} className="max-w-full mx-auto rounded-xl shadow-xs" />
                {block.alt && (
                  <figcaption className="mt-2.5 text-sm font-medium text-muted">
                    【図】{block.alt}
                  </figcaption>
                )}
              </figure>
            );
          case "hr":
            return <hr key={index} className="my-8 border-divider" />;
          default:
            return null;
        }
      };

  const renderedBlocks = blocks.map((block, index) => (
        <React.Fragment key={index}>
          {renderBlock(block, index)}
          {conceptArt && index === artPlacementIndex ? conceptArt.node : null}
          {figurePlacements.get(index)?.map((figure) => <InlineConceptFigure key={figure.id} figure={figure} />)}
          {relatedReading && index === lastFigureIndex ? (
            <aside className="not-prose rounded-xl border-s-2 border-accent bg-panel-selected px-4 py-3 sm:px-5" aria-label="関連する読みもの">
              <p className="text-sm leading-relaxed text-muted">{relatedReading.description}</p>
              <Link href={relatedReading.href} className="mt-1 flex min-h-11 items-center justify-between gap-3 rounded-lg py-2 text-base leading-relaxed font-semibold text-accent underline-offset-4 hover:underline">
                <span>{relatedReading.title}{relatedReading.meta ? <span className="mt-1 block text-sm font-normal text-muted">{relatedReading.meta}</span> : null}</span>
                <span className="shrink-0" aria-hidden="true">↗</span>
              </Link>
            </aside>
          ) : null}
        </React.Fragment>
      ));
  const content: React.ReactNode[] = [];
  for (let index = 0; index < blocks.length; index++) {
    const block = blocks[index];
    content.push(renderedBlocks[index]);
    if (collapseAdvanced && block.type === "h2" && /^(📘|🔬)/.test(block.content)) {
      let end = index + 1;
      while (end < blocks.length && blocks[end].type !== "h2") end++;
      content.push(<details key={`advanced-${index}`} className="rounded-xl border border-frame bg-page p-4"><summary className="min-h-11 cursor-pointer py-2 font-semibold">詳しい内容を読む（基礎を押さえてから）</summary><div className="space-y-5">{renderedBlocks.slice(index + 1, end)}</div></details>);
      index = end - 1;
    }
  }
  return (
    <div data-reading-body className="prose min-w-0 max-w-none space-y-5 text-[1.0625rem] leading-[1.95] text-ink [overflow-wrap:anywhere]">
      {content}
    </div>
  );
}

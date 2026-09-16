"use client";

import React from "react";
import CitationTextRenderer from "@/components/CitationTextRenderer";
import EastWestTermSwitch from "@/components/EastWestTermSwitch";
import CurriculumDiagram from "@/components/CurriculumDiagram";
import { parseMarkdownBlocks } from "@/utils/markdownParser";
import { ResolvedReference } from "@/types/references";

interface MarkdownBodyProps {
  contentMarkdown: string;
  seenTerms?: Set<string>;
  onNextLecture?: () => void;
  idPrefix?: string;
  resolvedReferences?: ResolvedReference[];
}

export default function MarkdownBody({
  contentMarkdown,
  seenTerms,
  onNextLecture,
  idPrefix = "section-heading",
  resolvedReferences,
}: MarkdownBodyProps) {
  const blocks = parseMarkdownBlocks(contentMarkdown);

  const renderText = (text: string) => (
    <CitationTextRenderer
      text={text}
      resolvedReferences={resolvedReferences}
      seenTerms={seenTerms}
    />
  );

  return (
    <div className="prose max-w-none text-[#232826] dark:text-[#D5E0DC] leading-relaxed space-y-6 text-sm sm:text-base">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "h1":
            return (
              <h1
                key={index}
                id={`${idPrefix}-${index}`}
                className="font-sans text-2xl sm:text-3xl lg:text-4xl font-bold text-[#232826] dark:text-[#FAF8F5] mt-10 mb-4 scroll-mt-36 leading-relaxed"
              >
                {renderText(block.content)}
              </h1>
            );
          case "h2":
            return (
              <h2
                key={index}
                id={`${idPrefix}-${index}`}
                className="font-sans text-xl sm:text-2xl font-bold text-[#1E3D34] dark:text-[#74BA9E] border-b border-[#E8E1D1] dark:border-[#22303D] pb-2 mt-10 scroll-mt-36 leading-relaxed"
              >
                {renderText(block.content)}
              </h2>
            );
          case "h3":
            return (
              <h3
                key={index}
                id={`${idPrefix}-${index}`}
                className="font-sans text-lg sm:text-xl font-bold text-[#232826] dark:text-[#FAF8F5] mt-8 scroll-mt-36 leading-relaxed"
              >
                {renderText(block.content)}
              </h3>
            );
          case "h4":
            return (
              <h4
                key={index}
                id={`${idPrefix}-${index}`}
                className="font-sans text-base sm:text-lg font-bold text-[#232826] dark:text-[#FAF8F5] mt-6 scroll-mt-36 leading-relaxed"
              >
                {renderText(block.content)}
              </h4>
            );
          case "blockquote":
            return (
              <blockquote
                key={index}
                className="bg-[#EBF3EF] dark:bg-[#162A24] border-l-4 border-[#1E3D34] dark:border-[#4E8C76] p-3 sm:p-4 rounded-r-xl text-xs sm:text-sm italic text-[#232826] dark:text-[#E6EFEA] leading-relaxed my-4"
              >
                {renderText(block.content)}
              </blockquote>
            );
          case "table":
            return (
              <div
                key={index}
                className="overflow-x-auto my-6 rounded-2xl border-2 border-[#E5DEC9] dark:border-[#2A3B4A] shadow-xs bg-[#FFFFFF] dark:bg-[#17212A]"
              >
                <table className="w-full text-left text-xs sm:text-sm min-w-[300px] border-collapse">
                  <thead className="bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] font-bold border-b-2 border-[#E5DEC9] dark:border-[#2A3B4A]">
                    <tr>
                      {block.headers.map((h, hIdx) => (
                        <th
                          key={hIdx}
                          className={`px-2.5 sm:px-5 py-2.5 sm:py-3.5 font-sans whitespace-nowrap text-xs tracking-wider ${
                            hIdx === 0 ? "border-r border-[#E5DEC9]/80 dark:border-[#2A3B4A]" : ""
                          }`}
                        >
                          {renderText(h)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5DEC9]/60 dark:divide-[#2A3B4A]/60">
                    {block.rows.map((row, rIdx) => (
                      <tr
                        key={rIdx}
                        className={`transition-colors hover:bg-[#FAF8F5] dark:hover:bg-[#1F2B37] ${
                          rIdx % 2 === 1 ? "bg-[#FAF8F5]/60 dark:bg-[#131B22]/50" : "bg-transparent"
                        }`}
                      >
                        {row.map((cell, cIdx) => (
                          <td
                            key={cIdx}
                            className={`px-2.5 sm:px-5 py-2.5 sm:py-3.5 text-[#333835] dark:text-[#C5D2DB] leading-relaxed ${
                              cIdx === 0
                                ? "font-medium text-[#232826] dark:text-[#FAF8F5] bg-[#EBF3EF]/15 dark:bg-[#182823]/15 border-r border-[#E5DEC9]/60 dark:border-[#2A3B4A]/60 whitespace-nowrap"
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
                    ? "list-decimal marker:font-bold marker:text-[#1E3D34] dark:marker:text-[#74BA9E]"
                    : "list-disc marker:text-[#1E3D34] dark:marker:text-[#74BA9E]"
                } text-sm sm:text-base text-[#333835] dark:text-[#C5D2DB] leading-relaxed`}
              >
                {block.items.map((item, iIdx) => (
                  <li key={iIdx} className="leading-relaxed pl-1 whitespace-pre-line">
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
                className="leading-relaxed whitespace-pre-line text-[#333835] dark:text-[#C5D2DB] text-sm sm:text-base my-3"
              >
                {renderText(block.content)}
              </p>
            );
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
                className="my-6 sm:my-8 text-center bg-[#FAF8F5] dark:bg-[#121920] p-2.5 sm:p-6 rounded-2xl border border-[#E8E1D1] dark:border-[#22303D]"
              >
                <img src={block.src} alt={block.alt} className="max-w-full mx-auto rounded-xl shadow-xs" />
                {block.alt && (
                  <figcaption className="mt-2.5 text-xs text-[#59615D] dark:text-[#A0B0BC] font-medium">
                    【図】{block.alt}
                  </figcaption>
                )}
              </figure>
            );
          case "hr":
            return <hr key={index} className="border-[#E8E1D1] dark:border-[#22303D] my-8" />;
          default:
            return null;
        }
      })}
    </div>
  );
}

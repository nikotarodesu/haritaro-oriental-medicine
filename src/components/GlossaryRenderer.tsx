"use client";

import React from "react";

interface GlossaryRendererProps {
  text: string;
  seenTerms?: Set<string>;
}

export default function GlossaryRenderer({ text }: GlossaryRendererProps) {
  if (!text) return null;

  // HTMLの <strong> / <b> タグ、または Markdownの **...** による太字を統一的に検出
  // 記号 ** は画面に表示せず、純粋な太字要素（strong）として描画
  const boldParts = text.split(/(?:<strong>|<\/strong>|<b>|<\/b>|\*\*(.*?)\*\*)/g);

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

  // 正規表現で **...** またはタグで分割された断片を処理
  // 奇数番目が太字、偶数番目が通常テキスト
  // ※ split のキャプチャグループによって太字部分が抽出される
  return (
    <>
      {text.split(/\*\*(.*?)\*\*/g).map((part, index) => {
        const isBold = index % 2 === 1;

        if (isBold) {
          return (
            <strong
              key={`bold-${index}`}
              className="font-bold text-[#1E3D34] dark:text-[#74BA9E]"
            >
              {renderTextWithBreaks(part, `bold-content-${index}`)}
            </strong>
          );
        }

        // 通常テキスト部分（万が一閉じ忘れ等で残った ** 記号も完全除去）
        const sanitized = part ? part.replace(/\*\*/g, "") : "";
        return renderTextWithBreaks(sanitized, `plain-${index}`);
      })}
    </>
  );
}

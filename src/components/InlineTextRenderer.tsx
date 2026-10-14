import React from "react";

interface InlineTextRendererProps {
  text: string;
}

function renderTextWithBreaks(text: string, keyPrefix: string) {
  return text.split(/(<br\s*\/?>)/gi).map((part, index) =>
    /^<br\s*\/?>$/i.test(part) ? (
      <br key={`${keyPrefix}-br-${index}`} />
    ) : (
      <React.Fragment key={`${keyPrefix}-text-${index}`}>{part}</React.Fragment>
    )
  );
}

export default function InlineTextRenderer({ text }: InlineTextRendererProps) {
  if (!text) return null;

  // Preserve author-written emphasis and line breaks without annotating terms.
  return (
    <>
      {text.split(/\*\*(.*?)\*\*/g).map((part, index) =>
        index % 2 === 1 ? (
          <strong
            key={`bold-${index}`}
            className="font-bold text-[#1E3D34] dark:text-[#74BA9E]"
          >
            {renderTextWithBreaks(part, `bold-${index}`)}
          </strong>
        ) : (
          <React.Fragment key={`plain-${index}`}>
            {renderTextWithBreaks(part.replace(/\*\*/g, ""), `plain-${index}`)}
          </React.Fragment>
        )
      )}
    </>
  );
}

"use client";

import { useRef, useState } from "react";
import type { AtlasLocationQuestion } from "@/data/tsubo/atlas/types";
import { trackEvent } from "@/utils/analytics";

export default function AtlasLocationCheck({ question, options, placement }: {
  question: AtlasLocationQuestion;
  options: readonly { code: string; name: string }[];
  placement: "nearby_diagram" | "atlas_comparison";
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const started = useRef(false);

  function choose(code: string) {
    setSelected(code);
    if (!started.current) {
      started.current = true;
      trackEvent("atlas_location_check_start", { placement });
    }
  }

  return (
    <fieldset className="min-w-0 space-y-2 rounded-xl border border-frame bg-panel px-3 pb-3 print:hidden">
      <legend className="px-1 text-sm font-semibold text-accent">位置を1問で確認</legend>
      <p className="text-sm font-semibold leading-relaxed">{question.prompt}</p>
      <div className="flex flex-wrap gap-2">
        {options.map(({ code, name }) => (
          <button
            key={code}
            type="button"
            aria-pressed={selected === code}
            className="min-h-11 rounded-lg border border-frame bg-panel px-3 py-2 text-sm font-semibold hover:border-accent aria-pressed:border-accent aria-pressed:bg-panel-selected"
            onClick={() => choose(code)}
          >
            {name}
          </button>
        ))}
      </div>
      <p role="status" className="text-sm leading-relaxed text-accent">
        {selected === null ? null : selected === question.answerCode
          ? `正解。${question.explanation}`
          : "もう一度、位置の目印を確かめてみましょう。"}
      </p>
    </fieldset>
  );
}

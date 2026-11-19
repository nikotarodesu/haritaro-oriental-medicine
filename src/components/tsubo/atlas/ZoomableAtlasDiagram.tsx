"use client";

import { type ReactNode, useId, useState } from "react";

export default function ZoomableAtlasDiagram({ label, children }: {
  label: string;
  children: ReactNode;
}) {
  const id = useId();
  const [enlarged, setEnlarged] = useState(false);

  return (
    <div role="group" aria-label={label} className="min-w-0 space-y-2">
      <div className="flex flex-wrap items-center justify-between gap-x-3">
        <button
          type="button"
          aria-expanded={enlarged}
          aria-controls={id}
          onClick={() => setEnlarged((current) => !current)}
          className="min-h-11 rounded-lg border border-[#AA8B74] bg-[#FFF9F0] px-3 text-sm font-semibold text-[#583820] hover:bg-[#F5E5D6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7F3520]"
        >
          {enlarged ? "元の大きさに戻す" : "図を拡大する"}
        </button>
        {enlarged && <p id={`${id}-hint`} className="text-sm text-[#524637]">図が収まらない場合は横に動かせます。</p>}
      </div>
      <div
        id={id}
        role={enlarged ? "region" : undefined}
        tabIndex={enlarged ? 0 : undefined}
        aria-label={enlarged ? `${label}（拡大表示）` : undefined}
        aria-describedby={enlarged ? `${id}-hint` : undefined}
        className={enlarged ? "overflow-x-auto overscroll-x-contain focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7F3520] [&>svg]:h-auto [&>svg]:max-h-none [&>svg]:w-[620px] [&>svg]:max-w-none" : undefined}
      >
        {children}
      </div>
    </div>
  );
}

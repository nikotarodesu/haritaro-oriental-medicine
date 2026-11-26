"use client";

import { type ReactNode, useId, useRef, useState } from "react";

export default function ZoomableAtlasDiagram({ label, pointName, children }: {
  label: string;
  pointName?: string;
  children: ReactNode;
}) {
  const id = useId();
  const toggle = useRef<HTMLButtonElement>(null);
  const [enlarged, setEnlarged] = useState(false);

  return (
    <div role="group" aria-label={label} className="min-w-0 space-y-2">
      <div className={`flex flex-wrap items-center gap-x-3 ${pointName ? "justify-start" : "justify-between"}`}>
        <button
          type="button"
          ref={toggle}
          aria-expanded={enlarged}
          aria-controls={id}
          onClick={() => setEnlarged((current) => !current)}
          className="atlas-zoom-toggle min-h-11 rounded-lg border border-field bg-panel px-3 text-sm font-semibold text-accent hover:bg-panel-selected focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {enlarged ? "元の大きさに戻す" : "図を拡大する"}
        </button>
        {pointName && <p className="atlas-location-key">丸印が{pointName}</p>}
        {enlarged && <p id={`${id}-hint`} className={pointName ? "basis-full text-sm text-muted" : "text-sm text-muted"}>図が収まらない場合は横に動かせます。</p>}
      </div>
      <div
        id={id}
        role={enlarged ? "region" : undefined}
        tabIndex={enlarged ? 0 : undefined}
        aria-label={enlarged ? `${label}（拡大表示）` : undefined}
        aria-describedby={enlarged ? `${id}-hint` : undefined}
        onKeyDown={event => {
          if (enlarged && event.key === "Escape") {
            event.stopPropagation();
            setEnlarged(false);
            toggle.current?.focus();
          }
        }}
        className={enlarged ? "overflow-x-auto overscroll-x-contain focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent [&>svg]:h-auto [&>svg]:max-h-none [&>svg]:w-[620px] [&>svg]:max-w-none" : undefined}
      >
        {children}
      </div>
    </div>
  );
}

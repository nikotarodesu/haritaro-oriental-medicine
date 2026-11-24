"use client";

import { useEffect, useRef, type ReactNode } from "react";

export default function AtlasStudyDisclosure({ count, children }: { count: number; children: ReactNode }) {
  const disclosure = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    function revealLinkedStudy() {
      const details = disclosure.current;
      const target = document.getElementById(window.location.hash.slice(1));
      if (!details || details.open || !target || !details.contains(target)) return;

      details.open = true;
      target.scrollIntoView({ block: "start" });
    }

    revealLinkedStudy();
    window.addEventListener("hashchange", revealLinkedStudy);
    return () => window.removeEventListener("hashchange", revealLinkedStudy);
  }, []);

  return (
    <details ref={disclosure} className="atlas-disclosure rounded-xl border border-frame px-3 open:pb-3">
      <summary>研究をすべて見る<span className="atlas-muted font-normal">残り{count}件</span></summary>
      {children}
    </details>
  );
}

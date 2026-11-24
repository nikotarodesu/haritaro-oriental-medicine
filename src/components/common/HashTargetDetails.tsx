"use client";

import { useEffect, useRef, type ComponentPropsWithoutRef, type ReactNode } from "react";

export default function HashTargetDetails({ summary, children, ...props }: ComponentPropsWithoutRef<"details"> & {
  summary: ReactNode;
}) {
  const disclosure = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    function revealLinkedContent() {
      const details = disclosure.current;
      const target = document.getElementById(window.location.hash.slice(1));
      if (!details || details.open || !target || !details.contains(target)) return;

      details.open = true;
      target.scrollIntoView({ block: "start" });
    }

    revealLinkedContent();
    window.addEventListener("hashchange", revealLinkedContent);
    return () => window.removeEventListener("hashchange", revealLinkedContent);
  }, []);

  return <details ref={disclosure} {...props}><summary>{summary}</summary>{children}</details>;
}

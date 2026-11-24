"use client";

import { useEffect, useRef, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { trackAtlasDisclosure, type AtlasDisclosureAnalytics } from "@/utils/analytics";

export default function HashTargetDetails({ summary, children, analytics, ...props }: ComponentPropsWithoutRef<"details"> & {
  summary: ReactNode;
  analytics?: AtlasDisclosureAnalytics;
}) {
  const disclosure = useRef<HTMLDetailsElement>(null);
  const previous = useRef<{ open: boolean; studyId?: string }>({ open: false });

  useEffect(() => {
    const node = disclosure.current;
    if (!node) return;
    const details = node;

    function reportOpen(open: boolean, target: HTMLElement | null) {
      if (!analytics) return;
      const studyId = analytics.kind === "research" && target && analytics.studyIds.includes(target.id) ? target.id : undefined;
      const last = previous.current;
      if (open && (!last.open || (studyId && studyId !== last.studyId))) trackAtlasDisclosure(analytics, studyId);
      previous.current = { open, studyId: open ? studyId : undefined };
    }

    function linkedTarget() {
      const target = document.getElementById(window.location.hash.slice(1));
      return target && details.contains(target) ? target : null;
    }

    function revealLinkedContent() {
      const target = linkedTarget();
      if (target && !details.open) {
        details.open = true;
        target.scrollIntoView({ block: "start" });
      }
      reportOpen(details.open, target);
    }

    function handleToggle(event: Event) {
      if (event.target === details) reportOpen(details.open, linkedTarget());
    }

    if (analytics) details.addEventListener("toggle", handleToggle);
    revealLinkedContent();
    window.addEventListener("hashchange", revealLinkedContent);
    return () => {
      if (analytics) details.removeEventListener("toggle", handleToggle);
      window.removeEventListener("hashchange", revealLinkedContent);
    };
  }, [analytics]);

  return <details ref={disclosure} {...props}><summary>{summary}</summary>{children}</details>;
}

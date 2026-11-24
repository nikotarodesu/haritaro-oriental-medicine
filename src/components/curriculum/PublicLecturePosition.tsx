"use client";

import { useEffect, useEffectEvent } from "react";
import { useCurriculumProgress } from "@/contexts/CurriculumProgressContext";
import { revealLectureSection } from "@/utils/lectureAnchors";

export default function PublicLecturePosition({ lectureId, trackPart = false }: { lectureId: string; trackPart?: boolean }) {
  const { isMounted, recordVisitedLecture } = useCurriculumProgress();
  const recordVisit = useEffectEvent((id: string) => recordVisitedLecture(id));
  useEffect(() => {
    if (!isMounted) return;
    if (!trackPart) {
      recordVisit(lectureId);
      return;
    }
    const pathname = window.location.pathname;
    const linkedPart = () => document.getElementById(window.location.hash.slice(1))
      ?.closest<HTMLElement>("[data-lecture-part]")?.dataset.lecturePart;
    const parts = [...document.querySelectorAll<HTMLElement>("[data-lecture-part]")];
    function visiblePart() {
      const readingLine = window.innerHeight * 0.35;
      const part = parts.find(section => section.getBoundingClientRect().bottom > readingLine) ?? parts.at(-1);
      return part?.dataset.lecturePart;
    }
    let currentPart = linkedPart() ?? visiblePart() ?? lectureId;
    let frame = 0;
    function remember(partId?: string) {
      if (!partId || partId === currentPart || window.location.pathname !== pathname) return;
      currentPart = partId;
      recordVisit(partId);
    }
    function recordCurrent() {
      remember(linkedPart());
    }
    function recordOnScroll() {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        remember(visiblePart());
      });
    }
    recordVisit(currentPart);
    window.addEventListener("hashchange", recordCurrent);
    window.addEventListener("scroll", recordOnScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", recordCurrent);
      window.removeEventListener("scroll", recordOnScroll);
    };
  }, [isMounted, lectureId, trackPart]);

  useEffect(() => {
    const scrollToPosition = () => {
      const hash = window.location.hash.slice(1);
      const params = new URLSearchParams(window.location.search);
      const sections = [...document.querySelectorAll<HTMLElement>("#lecture-content [data-lecture-section]")];
      const focus = params.get("focus")?.trim();
      const anchor = hash ? document.getElementById(hash) : null;
      const target = anchor ?? (focus || hash.startsWith("curriculum-heading-")
        ? sections.find(section => focus && section.textContent?.includes(focus)) ?? sections[0]
        : null);
      if (!target) return;
      revealLectureSection(target);
      target.scrollIntoView({ block: "start" });
    };
    const frame = requestAnimationFrame(scrollToPosition);
    window.addEventListener("hashchange", scrollToPosition);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", scrollToPosition);
    };
  }, [lectureId]);
  return null;
}

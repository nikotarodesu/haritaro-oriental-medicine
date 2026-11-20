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
    const linkedPart = () => document.getElementById(window.location.hash.slice(1))
      ?.closest<HTMLElement>("[data-lecture-part]")?.dataset.lecturePart;
    const recordCurrent = () => {
      const partId = linkedPart();
      if (partId) recordVisit(partId);
    };
    recordVisit(linkedPart() ?? lectureId);
    window.addEventListener("hashchange", recordCurrent);
    return () => window.removeEventListener("hashchange", recordCurrent);
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

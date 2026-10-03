"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { trackEvent } from "@/utils/analytics";

type Props = ComponentProps<typeof Link> & {
  placement: string;
  articleId?: string;
  lectureId?: string;
  courseId?: string;
};

export default function ContentNavigationLink({ placement, articleId, lectureId, courseId, onClick, ...props }: Props) {
  return <Link {...props} onClick={event => {
    onClick?.(event);
    if (!event.defaultPrevented) trackEvent("context_link_click", {
      placement, article_id: articleId, lecture_id: lectureId, course_id: courseId,
    });
  }} />;
}

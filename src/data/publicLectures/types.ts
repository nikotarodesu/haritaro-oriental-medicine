import type { ReadingFigure } from "@/types/reading";

export interface PublicLectureLink {
  href: string;
  label: string;
}

export interface PublicLectureArticle {
  title: string;
  description: string;
  lead: string;
  sections: {
    heading: string;
    paragraphs: string[];
    diagram?: ReadingFigure | "concept" | "study";
    links?: PublicLectureLink[];
  }[];
  links?: PublicLectureLink[];
}

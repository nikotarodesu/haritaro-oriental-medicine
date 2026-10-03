export type ConceptIcon = "balance" | "leaf" | "drop" | "pulse" | "eye" | "book" | "flask" | "check" | "compass";

export interface ReadingFigure {
  id: string;
  title: string;
  layout: "compare" | "steps" | "triad";
  items: ReadonlyArray<{ label: string; description: string; icon: ConceptIcon }>;
  caption: string;
}

export interface ReadingInsert {
  afterHeading: string;
  afterParagraph: number;
  figure: ReadingFigure;
}

export interface ReadingLink {
  href: string;
  title: string;
  description: string;
  meta?: string;
}

export interface ArticleReadingGuide {
  inserts: ReadingInsert[];
  nextArticles: Array<{ articleId: string; reason: string }>;
}

export interface AcupunctureResearchArticle {
  slug: string;
  title: string;
  description: string;
  sections: readonly {
    id: string;
    title: string;
    paragraphs: readonly string[];
    sources: readonly string[];
    exercise?: { question: string; answer: string };
  }[];
  sources: readonly {
    id: string;
    label: string;
    url: string;
    scope: string;
  }[];
  related: readonly { href: string; label: string }[];
  tags: readonly string[];
}

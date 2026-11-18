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
    links?: PublicLectureLink[];
  }[];
  links?: PublicLectureLink[];
}

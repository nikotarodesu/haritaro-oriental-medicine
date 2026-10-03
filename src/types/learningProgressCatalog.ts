export interface ProgressQuestion {
  id: string;
  revision: string;
  kind: 'lecture' | 'exam' | 'acupoint';
  href: string;
}

export interface LearningProgressCatalog {
  totalPublished: number;
  totalPlanned: number;
  questions: ProgressQuestion[];
}

export interface ResumeLecture {
  id: string;
  title: string;
}

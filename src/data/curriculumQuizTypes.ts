export interface QuizQuestionItem {
  id: string;
  question: string;
  options: [string, string, string]; // 厳密に3択
  correctIndex: number;
  explanation: string;
  relatedSectionTitle?: string; // 関連する講義の見出し・トピック
}

export function getQuizSectionTitle(question: QuizQuestionItem): string {
  if (question.relatedSectionTitle) return question.relatedSectionTitle;
  const match = question.question.match(/【([^】]+)】/);
  return match ? match[1] : "";
}

export interface LessonQuizGroup {
  lectureId: string;
  chapterId: string;
  chapterTitle: string;
  lectureTitle: string;
  passingScore: number;
  questions: QuizQuestionItem[];
}


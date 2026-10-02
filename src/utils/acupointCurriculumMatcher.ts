import { CURRICULUM_DATA, Lecture } from "@/data/curriculumData";

export interface MatchedCurriculumLecture {
  id: string;
  stageTitle: string;
  seriesTitle?: string;
  title: string;
  duration: string;
  excerpt: string;
  url: string;
}

/**
 * 指定された経穴名（漢字）またはコードが含まれる講義を抽出する
 */
export function getLecturesForAcupoint(acupointName: string, acupointCode?: string): MatchedCurriculumLecture[] {
  const matches: MatchedCurriculumLecture[] = [];
  const searchTerms = [acupointName];
  if (acupointCode) {
    searchTerms.push(acupointCode.toUpperCase());
  }

  for (const stage of CURRICULUM_DATA) {
    for (const lecture of stage.lectures) {
      // 講義タイトル、重要要点、要約、本文を探索
      const inTitle = searchTerms.some((term) => lecture.title.includes(term));
      const inKeyPoints = lecture.keyPoints.some((kp) => searchTerms.some((term) => kp.includes(term)));
      const inSummary = searchTerms.some((term) => lecture.summary.includes(term));
      const inContent = searchTerms.some((term) => lecture.contentMarkdown.includes(term));

      if (inTitle || inKeyPoints || inSummary || inContent) {
        // 抜粋文の生成（要約、または本文から経穴の周辺30文字を抽出）
        let excerpt = lecture.summary || "";
        if (!excerpt && inContent) {
          const idx = lecture.contentMarkdown.indexOf(acupointName);
          if (idx !== -1) {
            const start = Math.max(0, idx - 20);
            const end = Math.min(lecture.contentMarkdown.length, idx + 60);
            excerpt = "…" + lecture.contentMarkdown.substring(start, end).replace(/[#*`\n]/g, " ") + "…";
          }
        }

        matches.push({
          id: lecture.id,
          stageTitle: stage.title,
          seriesTitle: lecture.seriesTitle,
          title: lecture.title,
          duration: lecture.duration,
          excerpt: excerpt.length > 90 ? excerpt.slice(0, 90) + "…" : excerpt,
          url: `/curriculum/${lecture.id}`,
        });

        // 最大4件まで
        if (matches.length >= 4) {
          return matches;
        }
      }
    }
  }

  return matches;
}

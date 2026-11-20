import { CURRICULUM_DATA, type Lecture } from "@/data/curriculumData";
import { resolveArticleReferences } from "@/utils/referenceResolver";

export const publishedLectureRecords = new Map(CURRICULUM_DATA.flatMap(stage => stage.lectures)
  .filter(lecture => lecture.isPublished)
  .map(lecture => [lecture.id, lecture]));

export function getPublicLectureReferences(lecture: Lecture) {
  return resolveArticleReferences(lecture.references, lecture.contentMarkdown)
    .map(reference => ({ ...reference, note: reference.claimsStatus === "source-checked" ? reference.note : undefined }));
}

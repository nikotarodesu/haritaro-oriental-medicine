import { CURRICULUM_STUDY_DIAGRAMS } from "@/data/curriculumStudyDiagrams";
import InlineConceptFigure from "@/components/reading/InlineConceptFigure";

export default function CurriculumStudyDiagram({ id }: { id: string }) {
  const figure = CURRICULUM_STUDY_DIAGRAMS[id];
  return figure ? <InlineConceptFigure figure={figure} /> : null;
}

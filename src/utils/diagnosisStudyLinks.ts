import { ACUPOINT_LOOKUP } from "@/data/acupointLookup";
import { DIAGNOSIS_RESULTS } from "@/data/diagnosisData";
import { SYMPTOMS } from "@/data/symptomData";
import { symptomGuidePath } from "@/utils/symptomGuidePaths";

interface StudyLink {
  href: string;
  title: string;
}

export interface DiagnosisStudyLinks {
  points: StudyLink[];
  guides: (StudyLink & { sharedPoints: string[] })[];
}

const pointCodesByName = new Map<string, string>(ACUPOINT_LOOKUP.map(point => [point.name, point.code.toLowerCase()]));

export function getDiagnosisStudyLinks(): Record<string, DiagnosisStudyLinks> {
  return Object.fromEntries(Object.values(DIAGNOSIS_RESULTS).map(result => {
    const pointsByCode = new Map<string, string>();
    for (const name of result.advice.tsubo) {
      const code = pointCodesByName.get(name);
      if (code) pointsByCode.set(code, name);
    }

    const points = [...pointsByCode].map(([code, title]) => ({ href: `/tsubo/${code}`, title }));
    const guides = SYMPTOMS.map(guide => {
      const codes = new Set(guide.recommendedTsuboIds.map(code => code.toLowerCase()));
      const sharedPoints = [...pointsByCode].filter(([code]) => codes.has(code)).map(([, name]) => name);
      return { href: symptomGuidePath(guide), title: guide.title, sharedPoints };
    }).filter(guide => guide.sharedPoints.length > 0)
      .sort((a, b) => b.sharedPoints.length - a.sharedPoints.length);

    return [result.type, { points, guides }];
  }));
}

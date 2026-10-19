import { CLINICAL_SIGNS } from '@/data/clinicalWorkflow';
import { EXAMINATION_FIELDS, EXAMINATION_GROUPS } from '@/data/clinicalExamination';
import { examinationFinding, type ComparisonFindingId } from '@/data/clinicalExaminationComparison';

type Comparison = Record<'supported' | 'missing' | 'unknown' | 'conflicting', readonly ComparisonFindingId[]>;

/** Display filters only. Neither counts nor examination groups establish diagnostic likelihood. */
export function clinicalCandidateEvidence(comparison: Comparison) {
  const details = (id: ComparisonFindingId) => {
    const structured = examinationFinding(id);
    if (structured) return { label: structured.label, group: EXAMINATION_FIELDS.find(field => field.id === structured.field)?.group };
    const sign = CLINICAL_SIGNS.find(sign => sign.id === id);
    return { label: sign?.label, group: sign?.group };
  };
  const supported = comparison.supported.map(details);
  return {
    supportGroups: EXAMINATION_GROUPS.filter(group => supported.some(finding => finding.group === group)),
    supportReasons: [...new Set(supported.flatMap(finding => finding.label ? [finding.label] : []))],
    conflictReasons: [...new Set(comparison.conflicting.flatMap(id => { const label = details(id).label; return label ? [label] : []; }))],
    missingCount: comparison.missing.length,
  };
}

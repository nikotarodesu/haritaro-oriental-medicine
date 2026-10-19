import { CLINICAL_SIGNS, type ClinicalObservations, type ClinicalPattern, type ObservationStatus } from '@/data/clinicalWorkflow';
import { EXAMINATION_FIELDS, EXAMINATION_GROUPS, resolvedExaminationObservations, type ClinicalExamination } from '@/data/clinicalExamination';
import { EXAMINATION_ASSOCIATIONS, EXAMINATION_FINDINGS, examinationFindingStatus, type ComparisonFindingId } from '@/data/clinicalExaminationComparison';

export interface DifferentialFinding {
  id: ComparisonFindingId;
  label: string;
  group: string;
  status: ObservationStatus;
  relations: { patternId: string; relation: 'support' | 'conflict' | 'unmapped' }[];
}

export interface ClinicalCandidateDifferential {
  shared: DifferentialFinding[];
  differences: DifferentialFinding[];
  nextChecks: { key: string; label: string; group: string; findings: DifferentialFinding[] }[];
  equivalentPairs: { ids: string[]; names: string[] }[];
}

const LEGACY_INPUT_FIELDS: Readonly<Record<string, string>> = {
  paleTongue: 'tongueColor', redTongue: 'tongueColor', greasyCoat: 'coatTexture',
  weakPulse: 'pulseStrength', rapidPulse: 'pulseSpeed', fixedPain: 'painQuality',
};

/** Compare existing catalogue associations only. A missing association is not contrary evidence. */
export function clinicalCandidateDifferential(
  patterns: readonly ClinicalPattern[],
  observations: ClinicalObservations,
  examination: ClinicalExamination = {},
): ClinicalCandidateDifferential {
  const focused = patterns.filter((pattern, index) => patterns.findIndex(item => item.id === pattern.id) === index);
  const result: ClinicalCandidateDifferential = { shared: [], differences: [], nextChecks: [], equivalentPairs: [] };
  if (focused.length < 2) return result;

  const resolved = resolvedExaminationObservations(observations, examination);
  const relations = (id: ComparisonFindingId): DifferentialFinding['relations'] => focused.map(pattern => {
    const association = EXAMINATION_ASSOCIATIONS[pattern.id];
    const support = id.startsWith('exam:') ? association?.supports.includes(id.slice(5)) : pattern.supports.some(sign => sign === id);
    const conflict = id.startsWith('exam:') ? association?.conflicts?.includes(id.slice(5)) : pattern.conflicts.some(sign => sign === id);
    return { patternId: pattern.id, relation: support ? 'support' : conflict ? 'conflict' : 'unmapped' };
  });
  const catalogue = [
    ...CLINICAL_SIGNS.map(sign => ({
      id: sign.id as ComparisonFindingId, label: sign.label, group: sign.group,
      key: LEGACY_INPUT_FIELDS[sign.id] || sign.id, status: resolved[sign.id] || 'unknown' as ObservationStatus,
    })),
    ...EXAMINATION_FINDINGS.map(finding => ({
      id: finding.id as ComparisonFindingId, label: finding.label,
      group: EXAMINATION_FIELDS.find(field => field.id === finding.field)!.group,
      key: finding.field, status: examinationFindingStatus(finding, examination, resolved),
    })),
  ];
  // Match the form: four-examination order, structured field order, then original sign order.
  catalogue.sort((left, right) => {
    const groupOrder = EXAMINATION_GROUPS.indexOf(left.group) - EXAMINATION_GROUPS.indexOf(right.group);
    if (groupOrder) return groupOrder;
    const fieldIndex = (key: string) => {
      const index = EXAMINATION_FIELDS.findIndex(field => field.id === key);
      return index === -1 ? EXAMINATION_FIELDS.length : index;
    };
    return fieldIndex(left.key) - fieldIndex(right.key);
  });
  const relevant = catalogue.map(({ key, ...finding }) => ({ key, finding: { ...finding, relations: relations(finding.id) } }))
    .filter(({ finding }) => finding.relations.some(item => item.relation !== 'unmapped'));

  for (const { key, finding } of relevant) {
    if (finding.status === 'present' && finding.relations.every(item => item.relation === 'support')) result.shared.push(finding);
    if (finding.relations.every(item => item.relation === finding.relations[0].relation)) continue;
    if (finding.status !== 'unknown') { result.differences.push(finding); continue; }
    let check = result.nextChecks.find(item => item.key === key);
    if (!check) {
      const field = EXAMINATION_FIELDS.find(field => field.id === key);
      check = { key, label: field?.label || finding.label, group: finding.group, findings: [] };
      result.nextChecks.push(check);
    }
    check.findings.push(finding);
  }
  for (let left = 0; left < focused.length; left++) {
    for (let right = left + 1; right < focused.length; right++) {
      if (relevant.every(({ finding }) => finding.relations[left].relation === finding.relations[right].relation)) {
        result.equivalentPairs.push({ ids: [focused[left].id, focused[right].id], names: [focused[left].name, focused[right].name] });
      }
    }
  }
  return result;
}

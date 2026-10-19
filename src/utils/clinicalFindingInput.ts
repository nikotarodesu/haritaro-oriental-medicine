import { CLINICAL_SIGNS, type ClinicalSignId } from '@/data/clinicalWorkflow';
import { EXAMINATION_FIELDS } from '@/data/clinicalExamination';
import { examinationFinding, type ComparisonFindingId } from '@/data/clinicalExaminationComparison';

export type ClinicalFindingInputDefinition = {
  kind: 'examination'; id: string; label: string; group: string; options: readonly string[];
} | {
  kind: 'observation'; id: ClinicalSignId; label: string; group: string; question: string;
};

const LEGACY_FIELDS: Partial<Record<ClinicalSignId, readonly string[]>> = {
  paleTongue: ['tongueColor'], redTongue: ['tongueColor'], greasyCoat: ['coatTexture'],
  weakPulse: ['pulseStrength'], rapidPulse: ['pulseSpeed'], fixedPain: ['painQuality', 'painLocation'],
};

/** Use the original recording fields, including every part of a compound finding. */
export function clinicalFindingInputs(findingIds: readonly ComparisonFindingId[]): ClinicalFindingInputDefinition[] {
  const inputs: ClinicalFindingInputDefinition[] = [];
  const seen = new Set<string>();
  for (const id of findingIds) {
    const finding = examinationFinding(id);
    const sign = CLINICAL_SIGNS.find(item => item.id === id);
    const fields = finding ? [finding.field, ...(finding.requires ? [finding.requires.field] : [])] : sign ? LEGACY_FIELDS[sign.id] : undefined;
    if (fields) {
      for (const fieldId of fields) {
        const field = EXAMINATION_FIELDS.find(item => item.id === fieldId);
        if (!field || seen.has(field.id)) continue;
        seen.add(field.id);
        inputs.push({ kind: 'examination', id: field.id, label: field.label, group: field.group, options: field.options });
      }
    } else if (sign && !seen.has(sign.id)) {
      seen.add(sign.id);
      inputs.push({ kind: 'observation', id: sign.id, label: sign.label, group: sign.group, question: sign.question });
    }
  }
  return inputs;
}

'use client';

import { useId } from 'react';
import { OBSERVATION_LABELS, type ClinicalObservations, type ClinicalSignId, type ObservationStatus } from '@/data/clinicalWorkflow';
import { examinationValue, type ClinicalExamination } from '@/data/clinicalExamination';
import type { ComparisonFindingId } from '@/data/clinicalExaminationComparison';
import { clinicalFindingInputs } from '@/utils/clinicalFindingInput';
import ClinicalChoiceButtons from './ClinicalChoiceButtons';

interface ClinicalFindingInputProps {
  findingIds: readonly ComparisonFindingId[];
  observations: ClinicalObservations;
  examination?: ClinicalExamination;
  onObservationChange: (id: ClinicalSignId, status: ObservationStatus) => void;
  onExaminationChange: (id: string, value: string) => void;
}

export default function ClinicalFindingInput({ findingIds, observations, examination = {}, onObservationChange, onExaminationChange }: ClinicalFindingInputProps) {
  const scopeId = useId();
  const inputs = clinicalFindingInputs(findingIds);
  if (!inputs.length) return null;
  return <div className="clinical-inline-finding-fields">{inputs.map(input => {
    const id = `${scopeId}-${input.kind}-${input.id}`;
    return <div key={`${input.kind}-${input.id}`} className="clinical-inline-finding-field">
      {input.kind === 'examination' ? <ClinicalChoiceButtons id={id} label={input.label}
        value={examinationValue(input.id, examination, observations)}
        options={[{ value: '', label: '未確認' }, ...input.options.map(option => ({ value: option, label: option }))]}
        onChange={value => onExaminationChange(input.id, value)}
      /> : <ClinicalChoiceButtons id={id} label={input.label} description={input.question}
        value={observations[input.id] || 'unknown'}
        options={(['unknown', 'present', 'absent'] as const).map(status => ({ value: status, label: OBSERVATION_LABELS[status] }))}
        onChange={value => onObservationChange(input.id, value as ObservationStatus)}
      />}
    </div>;
  })}</div>;
}

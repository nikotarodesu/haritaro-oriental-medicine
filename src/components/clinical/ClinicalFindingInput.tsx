'use client';

import { useId } from 'react';
import { OBSERVATION_LABELS, type ClinicalObservations, type ClinicalSignId, type ObservationStatus } from '@/data/clinicalWorkflow';
import { examinationValue, type ClinicalExamination } from '@/data/clinicalExamination';
import type { ComparisonFindingId } from '@/data/clinicalExaminationComparison';
import { clinicalFindingInputs } from '@/utils/clinicalFindingInput';

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
      <label htmlFor={id}>{input.label}</label>
      {input.kind === 'examination' ? <select id={id} aria-label={input.label} value={examinationValue(input.id, examination, observations)} onChange={event => onExaminationChange(input.id, event.target.value)}>
        <option value="">未確認</option>{input.options.map(option => <option key={option} value={option}>{option}</option>)}
      </select> : <>
        <select id={id} aria-label={input.label} aria-describedby={`${id}-question`} value={observations[input.id] || 'unknown'} onChange={event => onObservationChange(input.id, event.target.value as ObservationStatus)}>
          {(['unknown', 'present', 'absent'] as const).map(status => <option key={status} value={status}>{OBSERVATION_LABELS[status]}</option>)}
        </select>
        <p id={`${id}-question`}>{input.question}</p>
      </>}
    </div>;
  })}</div>;
}

'use client';

interface ClinicalChoiceButtonsProps {
  id: string;
  label: string;
  value: string;
  options: readonly { value: string; label: string }[];
  onChange: (value: string) => void;
  description?: string;
}

export default function ClinicalChoiceButtons({ id, label, value, options, onChange, description }: ClinicalChoiceButtonsProps) {
  return <fieldset id={id} tabIndex={-1} className="clinical-choice-field" aria-label={label} aria-describedby={description ? `${id}-question` : undefined}>
    <legend>{label}</legend>
    <div className="clinical-choice-options" data-compact={options.length <= 3 || undefined}>
      {options.map(option => <button key={option.value} type="button" value={option.value} aria-pressed={value === option.value} onClick={() => onChange(option.value)}>
        <span className="clinical-choice-check" aria-hidden="true">{value === option.value ? '✓' : ''}</span>
        <span>{option.label}</span>
      </button>)}
    </div>
    {description && <p id={`${id}-question`}>{description}</p>}
  </fieldset>;
}

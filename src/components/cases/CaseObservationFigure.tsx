import type { CaseObservationTarget, ClinicalCase } from "@/types/clinicalCase";

export default function CaseObservationFigure({ observations, pattern, onExaminationSelect }: {
  observations: NonNullable<ClinicalCase["clinicalExplanation"]["observations"]>;
  pattern: string;
  onExaminationSelect: (target: Exclude<CaseObservationTarget, "complaint" | "history">) => void;
}) {
  return (
    <figure data-case-observation-figure className="grid gap-2 rounded-lg border border-divider bg-page p-3 sm:grid-cols-[minmax(0,1fr)_3rem_minmax(0,0.8fr)] sm:items-center">
      <figcaption className="sr-only">所見と教材上の見立ての対応</figcaption>
      <ul role="list" className="case-observation-links" aria-label="この説明で使った所見">
        {observations.map(({ target, label }) => {
          const fromExamination = target !== "complaint" && target !== "history";
          const href = fromExamination ? "#case-examination-content" : `#case-${target}`;
          return (
            <li key={target}>
              <a href={href} onClick={fromExamination ? () => onExaminationSelect(target) : undefined}>
                {label}を見る
              </a>
            </li>
          );
        })}
      </ul>
      <svg viewBox="0 0 48 32" width="48" height="32" fill="none" stroke="currentColor" strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" className="mx-auto rotate-90 text-accent sm:rotate-0" aria-hidden="true" focusable="false">
        {observations.map(({ target }, index) => {
          const y = observations.length === 1 ? 16 : 4 + index * 24 / (observations.length - 1);
          return <path key={target} d={`M4 ${y}C19 ${y} 20 16 34 16`} />;
        })}
        <path d="M34 16h9m-5-5 5 5-5 5" />
      </svg>
      <p className="min-w-0 rounded-lg border border-frame bg-panel p-3 text-sm [overflow-wrap:anywhere]">
        <span className="block text-muted">教材上の見立て</span>
        <strong>{pattern}</strong>
      </p>
    </figure>
  );
}

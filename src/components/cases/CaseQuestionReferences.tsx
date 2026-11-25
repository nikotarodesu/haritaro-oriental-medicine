"use client";

import { useId, useState } from "react";
import type { CaseFourExaminations, CasePatientProfile } from "@/types/clinicalCase";

const references = [
  { id: "history", label: "症状の経過を見返す" },
  { id: "findings", label: "診察の記録を見返す" },
] as const;

export function CaseHistoryContent({ history, labelledBy }: {
  history: CasePatientProfile["historyOfPresentIllness"];
  labelledBy?: string;
}) {
  if (typeof history === "string") return <p>{history}</p>;

  return (
    <>
      <ol role="list" aria-labelledby={labelledBy} className="case-history-timeline">
        {history.entries.map(({ when, description }) => (
          <li key={when}><strong>{when}</strong><p>{description}</p></li>
        ))}
      </ol>
      {history.context && <p>{history.context}</p>}
    </>
  );
}

export default function CaseQuestionReferences({ patient, examinations }: {
  patient: CasePatientProfile;
  examinations: CaseFourExaminations;
}) {
  const panelId = useId();
  const [open, setOpen] = useState<(typeof references)[number]["id"] | null>(null);
  const { tongueDiagnosis, palpation } = examinations;

  return (
    <div className="space-y-2 print:hidden">
      <div className="flex flex-wrap gap-2">
        {references.map(({ id, label }) => (
          <button key={id} type="button" aria-controls={panelId} aria-expanded={open === id}
            onClick={() => setOpen(open === id ? null : id)}
            className="min-h-11 rounded-lg border border-field px-2.5 text-sm font-semibold text-accent aria-expanded:bg-panel-selected">
            {label}
          </button>
        ))}
      </div>
      <div id={panelId} hidden={!open} className="rounded-lg border border-divider bg-page p-3 text-sm leading-relaxed">
        {open === "history" && (
          <div className="space-y-2">
            <p><strong>本人の訴え</strong> {patient.chiefComplaint}</p>
            <CaseHistoryContent history={patient.historyOfPresentIllness} />
            {patient.lifestyle && <p><strong>生活背景</strong> {patient.lifestyle}</p>}
          </div>
        )}
        {open === "findings" && (
          <dl className="space-y-2">
            <div><dt className="font-semibold">見た様子（望診）</dt><dd>{examinations.inspection}</dd></div>
            <div><dt className="font-semibold">舌の色・形・舌苔（表面の付着物）</dt><dd>{[tongueDiagnosis.body, tongueDiagnosis.shape, tongueDiagnosis.coating, tongueDiagnosis.sublingualVeins].filter(Boolean).join("、")}</dd></div>
            <div><dt className="font-semibold">声やにおい（聞診）</dt><dd>{examinations.auscultationAndOlfaction}</dd></div>
            <div><dt className="font-semibold">本人から聞いたこと（問診）</dt>{examinations.inquiry.map(({ question, answer }) => <dd key={question}>{question} {answer}</dd>)}</div>
            <div><dt className="font-semibold">触れて分かったこと（切診）</dt><dd>脈 {palpation.pulse}</dd><dd>お腹 {palpation.abdomen}</dd>{palpation.acupointReaction && <dd>ツボの反応 {palpation.acupointReaction}</dd>}</div>
          </dl>
        )}
      </div>
    </div>
  );
}

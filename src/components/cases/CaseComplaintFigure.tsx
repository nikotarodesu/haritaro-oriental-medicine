function BackAndLeg() {
  return (
    <svg viewBox="0 0 160 158" className="block w-full" aria-hidden="true" focusable="false">
      <path d="M50 12c0 19-13 33-13 50 0 14 7 26 9 40l2 37-7 7c-3 3-1 7 4 7h16c5 0 7-2 7-7l7-50 5-11 5 11 7 50c0 5 2 7 7 7h16c5 0 7-4 4-7l-7-7 2-37c2-14 9-26 9-40 0-17-13-31-13-50Z" className="fill-panel-selected stroke-field" strokeWidth="1.5" />
      <path d="M80 14v52m-27 1q14 9 27 1 13 8 27-1m-55 35q7 3 15 0m25 0q8 3 16 0" className="fill-none stroke-field" opacity=".65" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M91 31c13 6 14 18 13 30l-3 39 1 31" className="fill-none stroke-warm" strokeWidth="3" strokeLinecap="round" />
      <path d="M97 28c14 8 15 21 14 34l-4 39 1 30" className="fill-none stroke-accent" strokeWidth="3" strokeLinecap="round" strokeDasharray="1 5" />
    </svg>
  );
}

function NeckAndArm() {
  return (
    <svg viewBox="0 0 160 145" className="block w-full" aria-hidden="true" focusable="false">
      <circle cx="80" cy="21" r="15" className="fill-panel-selected stroke-field" strokeWidth="1.5" />
      <path d="M73 35c0 9-10 11-19 12-13 2-18 10-22 21l-18 43-6 2c-3 1-3 4 0 5l6 1-3 11c-1 5 4 8 8 5l7-10 17-33 7-14 3 55h54l3-55 7 14 17 33 7 10c4 3 9 0 8-5l-3-11 6-1c3-1 3-4 0-5l-6-2-18-43c-4-11-9-19-22-21-9-1-19-3-19-12" className="fill-panel-selected stroke-field" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M80 47v66m-23-51q11 3 15 15l-6 9-10-15m47-9q-11 3-15 15l6 9 10-15" className="fill-none stroke-field" opacity=".65" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M86 40c10 8 22 9 28 19 10 17 18 34 24 49l13 8" className="fill-none stroke-accent" strokeWidth="3" strokeLinecap="round" strokeDasharray="1 5" />
      <circle cx="151" cy="116" r="3" className="fill-accent" />
    </svg>
  );
}

function SymptomLine({ numbness }: { numbness?: boolean }) {
  return (
    <svg width="25" height="15" viewBox="0 0 25 15" className={`mt-0.5 shrink-0 ${numbness ? "text-accent" : "text-warm"}`} aria-hidden="true" focusable="false">
      <path d="M2 7h21" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray={numbness ? "1 5" : undefined} />
    </svg>
  );
}

function ShoulderBladeMark() {
  return (
    <svg width="36" height="39" viewBox="0 0 36 39" className="shrink-0" aria-hidden="true" focusable="false">
      <path d="M10 5q11-1 21 6l-7 9-5 14q-6-2-9-11l-2-10Z" className="fill-panel-selected stroke-field" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M8 13v12m-6-6h12m-10-4 8 8m0-8-8 8" className="fill-none stroke-warm" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default function CaseComplaintFigure({ caseId }: { caseId: string }) {
  const isLeg = caseId === "case-08-sciatica-cold-dampness";
  if (!isLeg && caseId !== "case-11-cervicobrachial-syndrome") return null;

  return (
    <figure data-case-complaint-figure={isLeg ? "back-leg" : "neck-arm"} className="grid gap-3 rounded-xl border border-divider bg-page p-3 sm:grid-cols-[minmax(0,11rem)_minmax(0,1fr)] sm:items-center sm:gap-x-5">
      <figcaption className="font-semibold text-ink sm:col-span-2">本人が訴えた症状の範囲</figcaption>
      <div className="mx-auto w-full max-w-44">
        <p className="text-center text-sm text-muted">背中側から見た図</p>
        <div className="flex flex-wrap justify-between gap-1 text-sm font-semibold text-muted" aria-hidden="true">
          <span>本人の左</span>
          <span className="text-accent">本人の右</span>
        </div>
        {isLeg ? <BackAndLeg /> : <NeckAndArm />}
      </div>
      {isLeg ? (
        <div className="space-y-2 text-sm leading-relaxed">
          <p className="font-semibold">右の腰から、お尻と太ももの裏を通り、ふくらはぎまで</p>
          <ul role="list" className="space-y-1">
            <li className="flex items-start gap-2"><SymptomLine />実線は引きつるような痛み</li>
            <li className="flex items-start gap-2"><SymptomLine numbness />点線はしびれ</li>
          </ul>
        </div>
      ) : (
        <ul role="list" className="space-y-3 text-sm leading-relaxed">
          <li className="flex items-start gap-2">
            <SymptomLine numbness />
            <span><strong className="block">右の首から腕を通り、親指まで</strong>点線は電気が走るようなしびれ</span>
          </li>
          <li className="flex items-start gap-2">
            <ShoulderBladeMark />
            <span><strong className="block">肩甲骨の内側</strong>印は刺すような痛み。左右の記載はありません。</span>
          </li>
        </ul>
      )}
    </figure>
  );
}

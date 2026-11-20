"use client";

import { useId, useState } from "react";

type TrialPair = {
  title: string;
  commonTreatment: string;
  withoutB: number;
  withB: number;
};

// Hypothetical mean decreases in the same problem score, on a 0–10 scale.
const withoutA: TrialPair = { title: "Aを使わない場合", commonTreatment: "普段の治療", withoutB: 2, withB: 3 };
const withA: TrialPair = { title: "Aを使う場合", commonTreatment: "普段の治療 ＋ A", withoutB: 4, withB: 7 };
const scaleMax = 10;

function addedPoints(pair: TrialPair) {
  return pair.withB - pair.withoutB;
}

const differenceWithoutA = addedPoints(withoutA);
const differenceWithA = addedPoints(withA);

const comparisons = [
  {
    id: "b-only",
    label: "Bだけを足す",
    pairs: [withoutA],
    result: `Bを足した組では、普段の治療だけの組より、困りごとの点数が${differenceWithoutA}点多く下がりました。`,
  },
  {
    id: "add-b-to-a",
    label: "AにBを足す",
    pairs: [withA],
    result: `どちらの組もAを使っています。Bも足した組では、困りごとの点数が${differenceWithA}点多く下がりました。`,
  },
  {
    id: "compare-differences",
    label: "2つの差を比べる",
    pairs: [withoutA, withA],
    result: `Bを足した差は、Aなしで${differenceWithoutA}点、Aありで${differenceWithA}点。この例では、AがあるとBを足した差が${differenceWithA - differenceWithoutA}点大きくなりました。`,
  },
] as const;

function TrialPairChart({ pair }: { pair: TrialPair }) {
  const difference = addedPoints(pair);
  const rows = [
    { label: "Bを足さない組", treatment: pair.commonTreatment, points: pair.withoutB, addsB: false },
    { label: "Bを足した組", treatment: `${pair.commonTreatment} ＋ B`, points: pair.withB, addsB: true },
  ];

  return (
    <div className="acupuncture-trial-pair">
      <h4>{pair.title}</h4>
      <dl className="acupuncture-trial-scores">
        {rows.map(({ label, treatment, points, addsB }) => (
          <div key={label}>
            <dt><strong>{label}</strong><span>{treatment}</span></dt>
            <dd>
              <svg viewBox={`0 0 ${scaleMax} 1`} preserveAspectRatio="none" aria-hidden="true">
                <rect className="acupuncture-trial-track" width={scaleMax} height="1" />
                <rect className="acupuncture-trial-bar" width={points} height="1" />
                {addsB ? <rect className="acupuncture-trial-added" x={pair.withoutB} width={difference} height="1" /> : null}
              </svg>
              <strong>{points}点</strong>
            </dd>
          </div>
        ))}
      </dl>
      <div className="acupuncture-trial-axis" aria-hidden="true"><span><span>0</span><span>{scaleMax}点</span></span></div>
      <p className="acupuncture-trial-difference"><span>Bを足した差（{pair.withB} − {pair.withoutB}）</span><strong>＋{difference}点</strong></p>
    </div>
  );
}

export default function AcupunctureTrialComparison() {
  const id = useId();
  const figureId = `${id}-trial-figure`;
  const [comparison, setComparison] = useState<(typeof comparisons)[number]>(comparisons[0]);

  return (
    <div className="acupuncture-trial">
      <p className="acupuncture-trial-example">全員が普段の治療を受け、ツボAとBを足すかどうかで、くじ引きのように4組に分けた架空の試験です。</p>
      <fieldset className="acupuncture-trial-options">
        <legend>選ぶと、図で比べる組と点数が切り替わります</legend>
        <div>
          {comparisons.map(choice => (
            <label key={choice.id}>
              <input type="radio" name={id} value={choice.id} checked={comparison.id === choice.id} onChange={() => setComparison(choice)} aria-controls={figureId} />
              <span>{choice.label}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <p className="acupuncture-trial-result" role="status" aria-atomic="true">{comparison.result}</p>
      <figure className="acupuncture-trial-figure" id={figureId}>
        <figcaption>
          <strong>4週間で下がった困りごとの点数（各組の平均）</strong>
          <p>棒が長いほど困りごとが減っています。先端で色が変わる部分が、Bを足したときの2組の差です。</p>
        </figcaption>
        <div className="acupuncture-trial-pairs">
          {comparison.pairs.map(pair => <TrialPairChart key={pair.title} pair={pair} />)}
        </div>
      </figure>
    </div>
  );
}

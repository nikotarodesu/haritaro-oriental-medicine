function BackView({ leg }: { leg?: boolean }) {
  return (
    <svg className="symptoms-back-view" viewBox="0 0 112 174" aria-hidden="true" focusable="false">
      <circle cx="56" cy="19" r="12" />
      <path d="M49 31 Q49 36 42 38 L32 41 Q24 43 22 54 L15 96 Q14 103 19 104 Q24 105 26 98 L34 66 Q38 79 35 94 Q33 103 36 121 L38 158 Q38 165 33 167 Q30 171 36 172 H45 Q50 172 50 167 L55 121 H57 L62 167 Q62 172 67 172 H76 Q82 171 79 167 Q74 165 74 158 L76 121 Q79 103 77 94 Q74 79 78 66 L86 98 Q88 105 93 104 Q98 103 97 96 L90 54 Q88 43 80 41 L70 38 Q63 36 63 31" />
      <path className="symptoms-back-landmarks" d="M56 43V87 M40 87 Q56 94 72 87 M42 105 Q49 110 56 107 Q63 110 70 105" />
      {leg ? (
        <path className="symptoms-pain-mark" d="M64 104 Q69 116 68 137 L69 151" />
      ) : (
        <path className="symptoms-pain-mark" d="M42 82 Q56 86 70 82" />
      )}
    </svg>
  );
}

export default function BackPainAreaComparison() {
  return (
    <figure id="recording-example" className="study-diagram symptoms-pain-comparison" aria-labelledby="recording-example-title" aria-describedby="recording-example-note">
      <figcaption id="recording-example-title">腰だけが痛む場合と、右脚まで痛む場合</figcaption>
      <ul role="list">
        <li><BackView /><strong>腰だけが痛む</strong></li>
        <li><BackView leg /><strong>右のお尻からふくらはぎまで痛む</strong></li>
      </ul>
      <p id="recording-example-note" className="study-diagram-note">背中側から見た、架空の記録です。しびれがあるときは、痛む範囲とは別に書きます。</p>
    </figure>
  );
}

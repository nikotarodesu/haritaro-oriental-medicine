export default function PrescriptionScoringGuide() {
  return (
    <div className="space-y-3 text-sm leading-relaxed text-[#59615D] dark:text-[#A0B0BC]">
      <p>見直す項目は、穴数と教材上の役割から表示します。治療効果、安全性、適切な穴数を判断するためには使えません。</p>
      <details className="rounded-xl border border-[#D9E3DD] p-4 dark:border-[#2A3B4A]">
        <summary className="min-h-11 cursor-pointer content-center font-semibold focus-visible:outline-2 focus-visible:outline-offset-4">見直す項目の表示条件</summary>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>5穴以上を選んだとき。</li>
          <li>4穴以上を選び、昇提と降気の経穴がともにあるとき。</li>
          <li>4穴以上を選び、温補と清熱の経穴がともにあるとき。</li>
          <li>同じ系統に分類した経穴が3穴以上あるとき。</li>
          <li>3穴以上で本治に分類した経穴がないか、5穴以上で標治に分類した経穴がないとき。</li>
        </ul>
      </details>
    </div>
  );
}

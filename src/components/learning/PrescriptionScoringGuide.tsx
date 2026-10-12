export default function PrescriptionScoringGuide() {
  return (
    <div className="space-y-3 text-sm leading-relaxed text-[#59615D] dark:text-[#A0B0BC]">
      <p>表示は、穴数や教材内の役割分類を用いた独自の集計です。点数や分類から治療効果、安全性、適切な穴数は判断できません。臨床で使う評価尺度としての検証・専門家確認は未完了です。</p>
      <details className="rounded-xl border border-[#D9E3DD] p-4 dark:border-[#2A3B4A]">
        <summary className="min-h-11 cursor-pointer content-center font-semibold focus-visible:outline-2 focus-visible:outline-offset-4">構成表示の判定条件を見る</summary>
        <p className="mt-3">内部の集計では100点から、次の条件に当てはまる点数を引き、15〜100点の範囲に収めます。複数の条件に該当した場合は減点を合計します。</p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>穴数：1〜4穴は減点なし。5穴は15点。6穴以上は「穴数 − 5」× 15点。</li>
          <li>4穴以上で、昇提と降気の分類がともにある：20点。</li>
          <li>4穴以上で、温補と清熱の分類がともにある：20点。</li>
          <li>同一系統の分類に3穴以上ある：系統ごとに15点。</li>
          <li>3穴以上で本治穴がない：15点。5穴以上で標治穴がない：10点。</li>
        </ul>
        <p className="mt-3">内部の点数が50点未満なら「採用理由の確認項目が多い構成」、50〜74点なら「複数の採用理由を確認する構成」、75〜89点なら「採用理由を確認する構成」、90点以上なら「教材の分類上、確認項目が少ない構成」と表示します。経穴を選んでいない場合は「ツボ未選択」です。</p>
        <p className="mt-3">本治比率は「本治穴の数 ÷ 選択中の穴数」を百分率にして四捨五入した値です。比率そのものを採点する項目や、40〜60％を理想とする条件は、この計算にはありません。</p>
      </details>
    </div>
  );
}

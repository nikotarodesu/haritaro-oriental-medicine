export default function KikeiEvidenceNote() {
  return (
    <section aria-labelledby="kikei-evidence-title" className="rounded-2xl border border-[#E5DEC9] bg-white p-5 sm:p-6 dark:border-[#2A3B4A] dark:bg-[#17212A] space-y-3">
      <h2 id="kikei-evidence-title" className="font-serif text-lg font-bold">臨床研究で評価された対象と、この配穴との違い</h2>
      <p className="text-sm leading-relaxed text-[#59615D] dark:text-[#A0B0BC]">
        鍼治療の臨床研究には、慢性の筋骨格痛、変形性関節症、慢性頭痛、肩の痛みを対象にした39試験・20,827人の2018年統合解析があります。痛み・機能の改善は偽鍼と鍼を行わない対照の両方を上回り、群間差は偽鍼に対して約0.2標準偏差、鍼を行わない対照に対して約0.5標準偏差でした。比較対象によって差が変わり、個人の改善率や特定の2穴の効果を表す数値ではありません。
        {' '}<a href="https://pubmed.ncbi.nlm.nih.gov/29198932/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">Vickersら（2018）の論文</a>
      </p>
      <p className="text-sm leading-relaxed text-[#59615D] dark:text-[#A0B0BC]">
        内関（PC6）刺激の2025年Cochraneレビューは、手術後の吐き気・嘔吐の予防が対象です。指圧バンドなどの非侵襲的な刺激は偽刺激等に比べて症状を減らす可能性を示しましたが、確信度は低い評価です。この結果を、公孫との配穴、パニック発作、心疾患への効果の根拠として使うことはできません。
        {' '}<a href="https://pubmed.ncbi.nlm.nih.gov/40938065/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">Leeら（2025）の論文</a>
      </p>
      <p className="text-sm leading-relaxed text-[#59615D] dark:text-[#A0B0BC]">
        奇経の気血調節や、八脈交会穴4対の病証分類は伝統医学の説明です。分類と臨床研究の結果を分けて読み、研究された疾患・施術方法・比較条件・評価期間から効果の範囲を判断します。
        {' '}<a href="https://www.who.int/publications/i/item/9789240042322" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">WHOの伝統医学用語集（2022）</a>
      </p>
    </section>
  );
}

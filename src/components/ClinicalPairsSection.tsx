"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { CLASSIC_CLINICAL_PAIRS } from "@/types/clinicalMemo";
import ClipButton from "@/components/ClipButton";

export default function ClinicalPairsSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedElement, setSelectedElement] = useState("すべて");
  const elements = ["すべて", "木", "火", "土", "金", "水"] as const;
  const filteredPairs = CLASSIC_CLINICAL_PAIRS.filter(pair => selectedElement === "すべて" || pair.elements.some(element => element === selectedElement));

  return (
    <section className="dictionary-pairs" aria-labelledby="traditional-pairs-title">
      <div className="dictionary-section-heading">
        <h2 id="traditional-pairs-title">伝統的な配穴の学習例<span>全{CLASSIC_CLINICAL_PAIRS.length}組</span></h2>
        <button type="button" onClick={() => setIsOpen(open => !open)} aria-expanded={isOpen} aria-controls="traditional-pairs">
          {isOpen ? "閉じる" : "一覧を開く"}
          {isOpen ? <ChevronUp aria-hidden="true" className="h-4 w-4" /> : <ChevronDown aria-hidden="true" className="h-4 w-4" />}
        </button>
      </div>
      <p className="dictionary-pairs-intro">太衝＋陽陵泉、開四関などの構成と伝統的な配穴意図を比較できます。組み合わせによる治療効果や相乗効果は、この分類だけでは判断できません。</p>
      <div id="traditional-pairs" hidden={!isOpen}>
        {isOpen && (
          <>
            <div className="dictionary-pairs-filter" aria-label="配穴例を五行で絞り込む">
              <span>五行</span>
              {elements.map(element => (
                <button key={element} type="button" aria-pressed={selectedElement === element} onClick={() => setSelectedElement(element)}>{element}</button>
              ))}
              <span role="status" aria-live="polite">{filteredPairs.length}組</span>
            </div>
            <div className="dictionary-pair-list">
              {filteredPairs.map(pair => (
                <article key={pair.id} className="dictionary-pair">
                  <div className="dictionary-pair-heading">
                    <div>
                      <h3>{pair.title}</h3>
                      {pair.subTitle && <p>{pair.subTitle}</p>}
                    </div>
                    <ClipButton item={pair} variant="icon" size="sm" className="min-h-11 min-w-11" />
                  </div>
                  <dl className="dictionary-pair-facts">
                    <div><dt>構成</dt><dd>{pair.points.join("・")}</dd></div>
                    <div><dt>五行</dt><dd>{pair.elements.join("・")}</dd></div>
                    <div><dt>伝統的に関連づける症状・分類</dt><dd>{pair.indications.join("、")}</dd></div>
                  </dl>
                  <p>{pair.summary}</p>
                  {pair.mechanism && (
                    <details className="dictionary-pair-research">
                      <summary>伝統的な配穴意図と関連研究</summary>
                      <p>{pair.mechanism}</p>
                      {pair.id === "pair-naikan-kouson" && (
                        <a href="https://pubmed.ncbi.nlm.nih.gov/40938065/" target="_blank" rel="noopener noreferrer">術後の悪心・嘔吐に対するPC6刺激の研究（Cochrane、2025）</a>
                      )}
                    </details>
                  )}
                  {pair.caution && <p className="dictionary-pair-caution">{pair.caution}</p>}
                </article>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

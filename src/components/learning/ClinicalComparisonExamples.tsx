"use client";

import { useState } from "react";
import { Bookmark, AlertTriangle } from "lucide-react";
import { useClinicalMemo } from "@/contexts/ClinicalMemoContext";

const PRESET_COMPARISONS = [
  {
    title: "【肝病変の鑑別】肝気鬱結証 vs 肝火上炎証",
    desc: "ストレス性の気滞が熱化して頭部・目へ上衝したかどうかの鑑別と配穴の転換",
    planA: {
      id: "a1",
      name: "案A: 肝気鬱結証（気滞・実）",
      category: "気血病変",
      pattern: "肝気鬱結証",
      hachiko: { depth: "裏" as const, temp: "未確定" as const, state: "実" as const },
      primaryOrgan: "肝",
      coreMechanism: "情志失調（ストレス）により肝の疎泄機能が失調し、気機が滞る。胸脇苦満、易怒、ため息、情緒不安定。",
      primaryPoints: ["太衝", "期門"],
      secondaryPoints: ["陽陵泉", "内関", "膻中"],
      needleMethod: "平補平瀉（気機を巡らせる）。太衝・陽陵泉で肝胆の気を疏通。",
      contraindications: "熱の所見、体力、皮膚状態などを追加確認し、刺激量・施灸の適否を個別に検討。"
    },
    planB: {
      id: "b1",
      name: "案B: 肝火上炎証（気鬱化火・実熱）",
      category: "火熱病変",
      pattern: "肝火上炎証",
      hachiko: { depth: "裏" as const, temp: "熱" as const, state: "実" as const },
      primaryOrgan: "肝・胆",
      coreMechanism: "長引く気鬱が熱化し、火熱の邪が経絡を上衝。激しい頭痛、目の充血、耳鳴り、口苦、急躁易怒。",
      primaryPoints: ["行間", "侠渓"],
      secondaryPoints: ["太衝", "風池", "太陽"],
      needleMethod: "清熱を目的とする伝統的な配穴例。行間（栄火穴）・侠渓などを所見と照合して検討。",
      contraindications: "強い頭痛、眼の異常、発熱などは現代医学的な評価を優先。温熱刺激の適否も個別に判断。"
    },
    differentialSummary: "案Aは気滞、案Bは熱の徴候を伴う伝統的な候補です。気滞だけで寒熱は確定しません。四診所見と経過を比較して治則を検討し、この一覧だけで手技を決定しません。"
  },
  {
    title: "【脾胃病変の鑑別】脾気虚・中気下陥 vs 寒湿困脾",
    desc: "脱力・軟便などと、冷え・重だるさなどの所見を比較する学習例",
    planA: {
      id: "a2",
      name: "案A: 脾気虚・中気下陥証（虚）",
      category: "臓腑病変",
      pattern: "中気下陥証",
      hachiko: { depth: "裏" as const, temp: "未確定" as const, state: "虚" as const },
      primaryOrgan: "脾・胃",
      coreMechanism: "伝統医学では脾の昇清の不足として整理。脱力感、軟便などを確認する。胃下垂などの医学的診断と同一視しない。",
      primaryPoints: ["百会", "足三里"],
      secondaryPoints: ["中脘", "気海", "脾兪"],
      needleMethod: "補気・昇提を目的とする伝統的な配穴例。気虚だけで寒証とはせず、温灸の必要性は追加検討。",
      contraindications: "持続する疲労・息切れなどは原因の医学的評価を検討。刺激量と温熱の適否は個別に確認。"
    },
    planB: {
      id: "b2",
      name: "案B: 寒湿困脾証（実湿）",
      category: "水液病変",
      pattern: "寒湿困脾証",
      hachiko: { depth: "裏" as const, temp: "寒" as const, state: "実" as const },
      primaryOrgan: "脾",
      coreMechanism: "伝統医学では、冷えと頭重感、手足のだるさ、口の中の粘り、むくみ、泥状便などを寒湿困脾の所見として整理します。「脾」は伝統的な機能分類で、冷たい飲食物や湿気が解剖学的な脾臓を圧迫したという意味ではありません。",
      primaryPoints: ["陰陵泉", "水分"],
      secondaryPoints: ["豊隆", "脾兪", "天枢"],
      needleMethod: "健脾・化湿を目的とする伝統的な配穴例。陰陵泉・水分の選択を検討するが、尿への排出という機序や効果は断定できない。",
      contraindications: "むくみの急な出現や増悪、息苦しさなどは医療機関での評価を優先。薬剤の適否を本ツールで判断しない。"
    },
    differentialSummary: "案Aでは不足の所見、案Bでは寒湿の所見を比較します。虚と湿は併存することもあり、単純な二者択一にはせず、根拠と不足する情報を記録します。"
  },
  {
    title: "【腎病変の鑑別】腎陰虚 vs 腎陽虚",
    desc: "老化・慢性疲労における「乾燥とほてり（陰虚）」と「冷えと水腫（陽虚）」",
    planA: {
      id: "a3",
      name: "案A: 腎陰虚証（虚熱・乾燥）",
      category: "気血病変",
      pattern: "腎陰虚証",
      hachiko: { depth: "裏" as const, temp: "熱" as const, state: "虚" as const },
      primaryOrgan: "腎",
      coreMechanism: "腎の陰液（潤い）が消耗し、虚熱が内生。手足のほてり（五心煩熱）、潮熱、盗汗、口渇、耳鳴り、腰膝酸軟。",
      primaryPoints: ["太谿", "照海"],
      secondaryPoints: ["三陰交", "腎兪", "復溜"],
      needleMethod: "滋陰を目的とする伝統的な配穴例。刺鍼深度は証名だけで決めず、局所解剖や体格などから判断。",
      contraindications: "熱感や乾燥の原因、服薬、皮膚の状態を確認。温熱刺激の適否は個別に検討。"
    },
    planB: {
      id: "b3",
      name: "案B: 腎陽虚証（虚寒・水腫）",
      category: "気血病変",
      pattern: "腎陽虚証",
      hachiko: { depth: "裏" as const, temp: "寒" as const, state: "虚" as const },
      primaryOrgan: "腎",
      coreMechanism: "腎の命門の火が衰え、全身を温められない。激しい腰下肢の冷え、夜間頻尿、下肢浮腫、無気力、勃起障害（ED）。",
      primaryPoints: ["命門", "関元"],
      secondaryPoints: ["腎兪", "太谿", "志室"],
      needleMethod: "温陽を目的とする伝統的な配穴例。刺激量や施灸は体力・局所の安全性を確認して検討し、効果を保証しない。",
      contraindications: "感覚障害・皮膚障害などがある場合の熱傷リスクを確認。むくみや排尿症状は医学的評価も検討。"
    },
    differentialSummary: "腰膝の症状に、乾燥・ほてりが伴うか、冷えなどが伴うかを比較する学習例です。少数の症状で確定せず、他の候補と医学的評価の必要性を確認します。"
  }
];


type ComparisonProfile = typeof PRESET_COMPARISONS[number]["planA"] | typeof PRESET_COMPARISONS[number]["planB"];
const PRESET_LABELS = ["肝の鑑別", "脾胃の鑑別", "腎の鑑別"];

function ComparisonProfile({ profile }: { profile: ComparisonProfile }) {
  return <article className="clinical-comparison-plan">
    <h4>{profile.name}</h4>
    <dl className="clinical-comparison-traits">
      <div><dt>表裏</dt><dd>{profile.hachiko.depth}</dd></div>
      <div><dt>寒熱</dt><dd>{profile.hachiko.temp}</dd></div>
      <div><dt>虚実</dt><dd>{profile.hachiko.state}</dd></div>
    </dl>
    <dl className="clinical-comparison-description">
      <div><dt>病態の整理</dt><dd>{profile.coreMechanism}</dd></div>
      <div><dt>配穴の学習例</dt><dd><strong>主穴：{profile.primaryPoints.join("・")}</strong><span>配穴：{profile.secondaryPoints.join("・")}</span></dd></div>
      <div><dt>手技を考える視点</dt><dd>{profile.needleMethod}</dd></div>
    </dl>
    <aside className="clinical-comparison-caution">
      <p><AlertTriangle size={16} aria-hidden="true" /><strong>安全上の確認</strong></p>
      <p>{profile.contraindications}</p>
    </aside>
  </article>;
}

/** The former /simulator/compare examples now share the condition exercise surface. */
export default function ClinicalComparisonExamples() {
  const { addMemo, isReady, clinicalStorageOwner } = useClinicalMemo();
  const [selectedPresetIdx, setSelectedPresetIdx] = useState(0);
  const [savedPreset, setSavedPreset] = useState<{ index: number; owner: string | null } | null>(null);
  const [saveError, setSaveError] = useState(false);
  const currentPreset = PRESET_COMPARISONS[selectedPresetIdx];
  const saved = savedPreset?.index === selectedPresetIdx && savedPreset.owner === clinicalStorageOwner;

  const handleSaveToMemo = () => {
    if (!isReady || saved) return;
    const success = addMemo({
      id: `compare-${Date.now()}`,
      type: "pair",
      title: `【条件比較】${currentPreset.planA.pattern} vs ${currentPreset.planB.pattern}`,
      subTitle: "臨床条件比較シミュレーション結果",
      points: [...currentPreset.planA.primaryPoints, ...currentPreset.planB.primaryPoints],
      elements: [],
      indications: [currentPreset.planA.pattern, currentPreset.planB.pattern],
      summary: currentPreset.differentialSummary,
      mechanism: `【案A】${currentPreset.planA.coreMechanism}\n【案B】${currentPreset.planB.coreMechanism}`,
      personalNotes: `比較検討日: ${new Date().toLocaleDateString("ja-JP")}`,
    });
    setSaveError(!success);
    if (success) setSavedPreset({ index: selectedPresetIdx, owner: clinicalStorageOwner });
  };

  return <div className="clinical-comparison-examples">
    <p className="clinical-comparison-intro">似た候補の違いを、3つの教材例で確認します。条件を自由に変える演習とは別に、鑑別の視点を振り返れます。</p>
    <div className="clinical-comparison-picker" role="group" aria-label="鑑別の教材例を選ぶ">
      {PRESET_COMPARISONS.map((preset, index) => <button key={preset.title} type="button"
        aria-pressed={selectedPresetIdx === index}
        onClick={() => { setSelectedPresetIdx(index); setSavedPreset(null); setSaveError(false); }}>
        {PRESET_LABELS[index]}
      </button>)}
    </div>
    <div className="clinical-comparison-summary">
      <h3>{currentPreset.title}</h3>
      <p>{currentPreset.differentialSummary}</p>
    </div>
    <div className="clinical-comparison-plans">
      <ComparisonProfile profile={currentPreset.planA} />
      <ComparisonProfile profile={currentPreset.planB} />
    </div>
    <div className="clinical-comparison-save">
      <button type="button" onClick={handleSaveToMemo} disabled={saved || !isReady} className="page-secondary-action">
        <Bookmark size={16} aria-hidden="true" fill={saved ? "currentColor" : "none"} />
        {saved ? "保存済み" : "比較例を保存"}
      </button>
      <span role="status">{!isReady ? "保存先を確認しています。" : saved ? "保存一覧から確認できます。" : "保存先：配穴ストック"}</span>
      {saveError && <p role="alert">保存できませんでした。保存上限や同期状況を確認して、もう一度お試しください。</p>}
    </div>
  </div>;
}

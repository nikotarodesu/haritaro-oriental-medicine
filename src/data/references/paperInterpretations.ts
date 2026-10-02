// Source-level checks are separate from expert approval. No expert approval is recorded here.
interface Interpretation { summary: string; findings: string[]; limitations: string[]; design: string; sampleSize?: number }
export const PAPER_INTERPRETATIONS: Record<string, Interpretation> = {
  'auricular-cancer-pain-alimi-2003': {
    design: 'ランダム化・盲検・対照試験', sampleSize: 90,
    summary: '鎮痛薬使用中のがん患者を対象に耳鍼と対照介入を比較した試験です。PMID 14615440の抄録で対象・比較・評価時点を確認しました。',
    findings: ['90人を3群に分け、2か月後の痛みを評価しました。実耳鍼群の平均痛みは開始時から36％低下し、対照群の変化は2％と報告されています。'],
    limitations: ['研究内の平均変化であり、全患者の改善や鎮痛薬中止を保証しません。耳の神経支配や作用機序を確定する試験ではありません。'],
  },
  'perimenopausal-insomnia-electroacupuncture-li-2020': {
    design: '患者盲検・偽鍼対照ランダム化比較試験', sampleSize: 84,
    summary: '更年期の不眠を対象とした試験です。PMID 33376432の抄録で、対象・介入回数・主要評価項目を確認しました。',
    findings: ['84人を2群に分け、8週間に18回の介入を行いました。8週時点のPSQI変化の群間差は−2.38点（95％信頼区間−3.46〜−1.30）でした。'],
    limitations: ['この対象と介入条件での結果です。他の原因による不眠や、固定した配穴の有効性を保証しません。施術者を含む二重盲検試験とは記載しません。'],
  },
  'meridian-response-current-electrical-pulse-hung-2020': {
    design: '健常者の電気特性を調べた実験研究', sampleSize: 30,
    summary: '電気刺激に対する電流応答から経絡の物理的特性を検討した研究です。PMID 32651748およびPMC7352033を照合しました。',
    findings: ['健常ボランティアを対象にした測定から、イオン伝導に関する仮説を提示しています。'],
    limitations: ['疾患患者での診断精度・治療効果は検証していません。伝統的な経絡全体の実在や臓腑との一対一の対応が確立したとは扱いません。'],
  },
  'substance-p-neurogenic-spots-acupuncture-hypertension-fan-2021': {
    design: 'ラットを対象とする動物・神経生理学研究',
    summary: 'ラットの拘束ストレスモデルで、鍼刺激とサブスタンスPの関係を調べた研究です。PMC7749828で実験動物と機序の検討範囲を確認しました。',
    findings: ['サブスタンスPの局所シグナルと神経活動、モデル内の血圧変化との関係を検討しています。'],
    limitations: ['ヒトの高血圧に対する効果、降圧薬の代替、個別の配穴の有効性はこの実験から判断できません。'],
  },
  'bibliometric-acupuncture-pain-20-years-lee-2020': {
    design: '計量書誌学分析',
    summary: '2000〜2019年の疼痛と鍼の研究文献4,595件を分析した研究です。PMID 32104058の抄録で分析対象を確認しました。',
    findings: ['論文の出版傾向、著者・機関、研究キーワードを分析しています。4,595は患者数ではなく文献数です。'],
    limitations: ['論文数の増加を治療効果の大きさや研究の質の証明として扱いません。'],
  },
};

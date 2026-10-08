// Source-level checks are separate from expert approval. No expert approval is recorded here.
export interface Interpretation {
  summary: string;
  findings: string[];
  limitations: string[];
  design: string;
  sampleSize?: number; // 完了した対象人数のみ。予定人数・文献数とは区別する。
  population?: string;
  sourceUrl: string;
  checkedAt: string;
  verificationScope: 'abstract' | 'selected_full_text';
  sourceLocator: string;
}
const abstractCheck = (pmid: string, interpretation: Omit<Interpretation, 'sourceUrl' | 'checkedAt' | 'verificationScope' | 'sourceLocator'>): Interpretation => ({
  ...interpretation, sourceUrl: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`, checkedAt: '2026-10-08',
  verificationScope: 'abstract', sourceLocator: 'PubMed 抄録（対象・方法・結果・結論）。全文の表・付録は未照合。',
});
export const PAPER_INTERPRETATIONS: Record<string, Interpretation> = {
  'auricular-cancer-pain-alimi-2003': {
    sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov/14615440/', checkedAt: '2026-10-02', verificationScope: 'abstract', sourceLocator: 'PubMed 抄録。全文・付録は未照合。',
    design: 'ランダム化・盲検・対照試験', sampleSize: 90,
    summary: '鎮痛薬使用中のがん患者を対象に耳鍼と対照介入を比較した試験です。PMID 14615440の抄録で対象・比較・評価時点を確認しました。',
    findings: ['90人を3群に分け、2か月後の痛みを評価しました。実耳鍼群の平均痛みは開始時から36％低下し、対照群の変化は2％と報告されています。'],
    limitations: ['研究内の平均変化であり、全患者の改善や鎮痛薬中止を保証しません。耳の神経支配や作用機序を確定する試験ではありません。'],
  },
  'perimenopausal-insomnia-electroacupuncture-li-2020': {
    sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov/33376432/', checkedAt: '2026-10-02', verificationScope: 'abstract', sourceLocator: 'PubMed 抄録。全文・付録は未照合。',
    design: '患者盲検・偽鍼対照ランダム化比較試験', sampleSize: 84,
    summary: '更年期の不眠を対象とした試験です。PMID 33376432の抄録で、対象・介入回数・主要評価項目を確認しました。',
    findings: ['84人を2群に分け、8週間に18回の介入を行いました。8週時点のPSQI変化の群間差は−2.38点（95％信頼区間−3.46〜−1.30）でした。'],
    limitations: ['この対象と介入条件での結果です。他の原因による不眠や、固定した配穴の有効性を保証しません。施術者を含む二重盲検試験とは記載しません。'],
  },
  'meridian-response-current-electrical-pulse-hung-2020': {
    sourceUrl: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7352033/', checkedAt: '2026-10-02', verificationScope: 'selected_full_text', sourceLocator: '抄録・健常ボランティアの測定方法。全文の全項目・付録は未照合。',
    design: '健常者の電気特性を調べた実験研究', sampleSize: 30,
    summary: '電気刺激に対する電流応答から経絡の物理的特性を検討した研究です。PMID 32651748およびPMC7352033を照合しました。',
    findings: ['健常ボランティアを対象にした測定から、イオン伝導に関する仮説を提示しています。'],
    limitations: ['疾患患者での診断精度・治療効果は検証していません。伝統的な経絡全体の実在や臓腑との一対一の対応が確立したとは扱いません。'],
  },
  'substance-p-neurogenic-spots-acupuncture-hypertension-fan-2021': {
    sourceUrl: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7749828/', checkedAt: '2026-10-02', verificationScope: 'selected_full_text', sourceLocator: '抄録・拘束ストレス動物モデルの方法。ヒト臨床試験は対象外。',
    design: 'ラットを対象とする動物・神経生理学研究',
    summary: 'ラットの拘束ストレスモデルで、鍼刺激とサブスタンスPの関係を調べた研究です。PMC7749828で実験動物と機序の検討範囲を確認しました。',
    findings: ['サブスタンスPの局所シグナルと神経活動、モデル内の血圧変化との関係を検討しています。'],
    limitations: ['ヒトの高血圧に対する効果、降圧薬の代替、個別の配穴の有効性はこの実験から判断できません。'],
  },
  'bibliometric-acupuncture-pain-20-years-lee-2020': {
    sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov/32104058/', checkedAt: '2026-10-02', verificationScope: 'abstract', sourceLocator: 'PubMed 抄録。全文・付録は未照合。',
    design: '計量書誌学分析',
    summary: '2000〜2019年の疼痛と鍼の研究文献4,595件を分析した研究です。PMID 32104058の抄録で分析対象を確認しました。',
    findings: ['論文の出版傾向、著者・機関、研究キーワードを分析しています。4,595は患者数ではなく文献数です。'],
    limitations: ['論文数の増加を治療効果の大きさや研究の質の証明として扱いません。'],
  },
  'rct-insomnia-heart-liver-2025': abstractCheck('40791639', {
    design: '単盲検・2種類の実鍼を比較するランダム化試験', sampleSize: 76, population: '慢性不眠症患者76人（各群38人）',
    summary: '2種類の実鍼プロトコルを計10回比較した試験です。偽鍼・無治療との比較ではありません。',
    findings: ['ISIの改善は7.58点と5.71点でしたが、主要評価の群間差は有意ではありませんでした。', '不安・抑うつ尺度では群間差を報告しています。睡眠ポリグラフの総睡眠時間・睡眠効率・REM睡眠割合の改善は両群で同程度でした。'],
    limitations: ['両群の開始前からの改善だけでは、鍼自体の効果を自然経過・期待等から分離できません。副次評価の差から個人向けの配穴選択や不眠全般への効果・安全性を断定しません。'],
  }),
  'langevin-connective-tissue-2002': abstractCheck('12467083', {
    design: '解剖学的マッピング・超音波による仮説検討', population: 'ヒト上肢の解剖切片と健常ボランティアの超音波画像',
    summary: '経穴・経絡と結合組織面との関係を検討した研究です。治療効果を比較する臨床試験ではありません。',
    findings: ['上肢の経穴位置と筋間・筋内結合組織面との80％の対応を報告しています。80％は位置の対応率で、患者の治療成功率ではありません。'],
    limitations: ['全身の経絡や臓腑との対応、鍼の遠隔作用を確定した研究とは扱いません。抄録ではボランティアの人数や治療効果量を確認できません。'],
  }),
  'meta-musculoskeletal-pain-yuan-2016': abstractCheck('27471137', {
    design: '偽鍼対照試験の系統的レビュー・メタ解析', sampleSize: 6382, population: '8種類の筋骨格系疾患を扱う63研究・計6,382人',
    summary: '治療終了後1週間以内を中心に、鍼と偽鍼の痛み・障害を比較した解析です。',
    findings: ['疼痛は59試験4,980人で標準化平均差−0.61（95％信頼区間−0.76〜−0.47）、障害は31試験4,876人で−0.77（−1.05〜−0.49）でした。'],
    limitations: ['疾患、偽鍼の形式や刺入の深さが異なります。この短期の統合結果から、あらゆる筋骨格疾患の長期効果や特定の配穴の優位性は判断できません。'],
  }),
  'han-electroacupuncture-frequencies-2003': {
    design: '電気鍼と内因性オピオイドに関する機序レビュー', population: '主に動物実験等の機序研究を扱う総説',
    sourceUrl: 'https://www.sciencedirect.com/science/article/pii/S0166223602000061', checkedAt: '2026-10-08', verificationScope: 'selected_full_text', sourceLocator: '出版社の概要・周波数とオピオイドペプチドを扱う節。PubMedに抄録はなく、全文・付録の網羅的照合は未実施。',
    summary: '電気鍼の刺激周波数とオピオイドペプチド放出の関係を論じる総説です。新しい患者群を無作為に比較した試験ではありません。',
    findings: ['異なる刺激周波数で異なる内因性オピオイド系が関わるという実験上の知見を説明しています。'],
    limitations: ['機序の知見を、そのまま患者に適した設定や鎮痛効果の保証に換算しません。周波数・電流・刺入の手順は公開要約に含めません。'],
  },
  'acupuncture-alcohol-dependence-arcuate-nucleus-chang-2019': abstractCheck('31517050', {
    design: 'アルコール依存ラットの神経機序研究', population: 'エタノール依存・離脱をモデル化したラット',
    summary: 'ラットで鍼刺激、弓状核・側坐核の神経回路、離脱時の行動との関係を検討しています。',
    findings: ['離脱時の振戦・不安様行動・アルコール自己投与の変化と、βエンドルフィンを介する経路への関与を報告しています。'],
    limitations: ['ヒトの依存症治療や離脱管理の有効性・安全性を検証した結果ではありません。重い離脱症状の医療管理を鍼に置き換える根拠にはなりません。'],
  }),
  'cancer-pain-electroacupuncture-auricular-peace-trial-mao-2021': {
    design: '通常ケア対照ランダム化比較試験（PEACE）', sampleSize: 360, population: 'がんの既往があり、活動性のがんがなく、3か月以上の筋骨格痛を持つ成人360人',
    sourceUrl: 'https://jamanetwork.com/journals/jamaoncology/fullarticle/2777349', checkedAt: '2026-10-08', verificationScope: 'selected_full_text', sourceLocator: 'Methods・Resultsの主要疼痛評価（12週）。全付録・全有害事象の独立照合は未実施。',
    summary: '電気鍼145人・耳鍼143人・通常ケア72人を比較した試験です。活動性がんの痛み全般を対象にした試験ではありません。',
    findings: ['12週のBPI疼痛重症度は、通常ケアに比べ電気鍼で1.9点（97.5％信頼区間1.4〜2.4）、耳鍼で1.6点（1.0〜2.1）多く低下しました。'],
    limitations: ['偽鍼対照ではなく、参加者の期待などを除外できません。対象はがん経験者の筋骨格痛です。進行がんの痛み・服薬中止・個人の改善率に一般化しません。'],
  },
  'chronic-low-back-pain-ankle-acupuncture-fmri-xiang-2021': {
    ...abstractCheck('34949986', {
      design: '足関節部の鍼・触覚的偽介入とfMRIを用いる探索的研究', sampleSize: 52, population: '慢性腰痛患者27人と年齢・性別を合わせた健常者25人',
      summary: '鍼刺激前後の痛みVASと脳の低周波活動（ALFF）の変化を調べた研究です。',
      findings: ['脳活動の変化と痛みVASの変化との関連を報告しています。健常者を含む52人を、腰痛患者52人と数えません。'],
      limitations: ['小規模で即時の画像・症状変化を扱う探索研究です。相関を因果関係や長期の治療効果、経絡の実在の証明に置き換えません。'],
    }),
    sourceUrl: 'https://www.frontiersin.org/journals/neuroscience/articles/10.3389/fnins.2021.786490/full', sourceLocator: '出版社ページのAbstract（方法・結果）。本文の全解析・付録は未照合。',
  },
  'fgid-emotional-symptoms-acupuncture-meta-analysis-wang-2022': abstractCheck('35085351', {
    design: '系統的レビュー・メタ解析', sampleSize: 2151, population: '機能性消化管障害を扱う24試験・計2,151人',
    summary: '機能性消化管障害に伴う不安・抑うつについて、偽鍼や薬物療法などとの比較を集計しています。',
    findings: ['偽鍼との比較では不安の標準化平均差−0.35（95％信頼区間−1.05〜0.33）、抑うつ−0.32（−0.71〜0.07）で、有意差を示しませんでした。', '薬物療法との比較では不安・抑うつの尺度で差を報告していますが、比較対象が異なる結果をまとめて「偽鍼より優れる」とは記載しません。'],
    limitations: ['異質性や比較群の違いがあります。期待・非特異的な作用の影響を除外できず、鍼が薬物療法を代替できるという結論にはなりません。'],
  }),
  'depression-insomnia-electroacupuncture-rct-yin-2022': abstractCheck('35797047', {
    design: '患者・評価者盲検の3群ランダム化比較試験', sampleSize: 270, population: 'うつ病と不眠があり、通常の精神科治療を受ける18〜70歳の270人',
    summary: '通常の精神科治療に電気鍼・偽鍼を追加した群と、通常治療のみを比較しました。8週間24回の介入です。',
    findings: ['8週のPSQI変化は電気鍼が偽鍼より3.6点（95％信頼区間2.8〜4.4）、通常治療のみより5.1点（4.2〜6.0）大きく、治療後の追跡でも差を報告しています。'],
    limitations: ['精神科治療への追加介入です。抗うつ薬等の中止や、うつ病のない不眠への同じ効果を支持する試験ではありません。研究内の有害事象報告を全患者の安全保証に変換しません。'],
  }),
  'poststroke-motor-aphasia-acupuncture-xingnao-rct-li-2024': abstractCheck('38252438', {
    design: '偽鍼対照ランダム化比較試験', sampleSize: 252, population: '中国の3施設の脳卒中後運動性失語患者252人（主要解析231人）',
    summary: '言語訓練・通常ケアを両群に行い、手技鍼と偽鍼の追加効果を比較しています。',
    findings: ['6週の失語指数AQの群間差は7.99（95％信頼区間3.42〜12.55）、実用的な意思疎通尺度CFCPは23.51（11.10〜35.93）でした。'],
    limitations: ['無作為割付人数と解析人数は異なります。特定の脳卒中後失語への追加介入であり、急性期の脳卒中診療や言語リハビリの代替を示しません。'],
  }),
  'menstrual-migraine-acupuncture-acupressure-yu-2018': abstractCheck('29654841', {
    design: '小規模3群ランダム化予備試験', sampleSize: 18, population: '月経関連片頭痛の解析対象18人（実鍼7人・指圧6人・対照鍼5人）',
    summary: '3月経周期の介入と、その後3周期の追跡で片頭痛日数などを調べました。',
    findings: ['介入期間中は実鍼・指圧の両群で対照鍼より片頭痛日数が少ないと報告しましたが、追跡期間の群間差は有意ではありませんでした。'],
    limitations: ['18人の予備試験です。持続効果や個人に適した治療選択を確定できません。有害事象が少なかったことも、一般的な安全性の保証ではありません。'],
  }),
  'shoulder-pain-electroacupuncture-rct-guerra-2004': abstractCheck('15561384', {
    design: '非刺入偽鍼対照・評価者盲検ランダム化試験', population: 'スペインの一次医療で肩の軟部組織病変による痛みがある25〜83歳の患者',
    summary: '8週間の電気鍼と非刺入の偽鍼を比較し、両群で必要に応じてジクロフェナクを使用しました。',
    findings: ['6か月の疼痛VASの群間差は2.0点（95％信頼区間1.2〜2.9）と報告しています。'],
    limitations: ['取得した抄録で対象人数を確認できないため、人数を推測で補いません。肩の軟部組織病変を対象にした結果で、すべての肩痛や特定の配穴の効果ではありません。'],
  }),
  'shoulder-impingement-manual-acupuncture-meta-analysis-an-2024': abstractCheck('39287298', {
    design: '手技鍼のランダム化試験の系統的レビュー・メタ解析', population: '肩インピンジメント症候群を扱う5件のランダム化試験',
    summary: '手技鍼による疼痛と肩の機能・障害を集計した研究です。電気鍼のレビューとは区別します。',
    findings: ['疼痛の標準化平均差−0.50（95％信頼区間−0.74〜−0.27）、機能・障害の尺度は−0.57（−0.96〜−0.19）でした。'],
    limitations: ['研究・参加者が少なく、異質性があります。抄録では総参加者数を確認できません。長期効果やすべての肩疾患への適応は確定しません。'],
  }),
  'cfs-acupuncture-moxibustion-hrv-li-2025': abstractCheck('40315935', {
    design: '5群ランダム化比較試験と健常参照群', sampleSize: 175, population: '慢性疲労症候群患者175人（各群35人）と別の健常参照者35人',
    summary: '患者を偽鍼、異なる実鍼・偽鍼の組合せ、実鍼、灸の5群で比較し、症状尺度・生活の質・心拍変動を評価しました。',
    findings: ['鍼・灸の各介入後に症状尺度・心拍変動の変化を報告しています。取得した抄録には群間効果量・信頼区間がなく、改善量を数値で補いません。'],
    limitations: ['抄録の結論には「鍼と灸の併用」とありますが、方法欄の5群は鍼群と灸群を別に記載しています。この不一致が解消するまで併用の優位性は掲載しません。心拍変動の変化を疾患の治癒と同義に扱いません。'],
  }),
  'menopausal-symptoms-hrv-japanese-acupuncture-kouzuma-2022': abstractCheck('36311889', {
    design: '偽介入対照ランダム化試験', sampleSize: 48, population: '更年期症状のある女性48人（実鍼24人・管を用いた偽介入24人）',
    summary: '週1回・4週間の介入で心拍・心拍変動・症状VASを評価した研究です。',
    findings: ['実鍼中の心拍低下や心拍変動の高周波成分の変化を報告しています。心拍が5％以上低下した19人／24人という値は、症状が改善した患者割合ではありません。'],
    limitations: ['心拍変動は生理指標です。症状への群間効果量や長期持続性は抄録の限定照合から判断できず、特定の自律神経疾患の診断・治療根拠に一般化しません。'],
  }),
  'chronic-insomnia-disorder-meta-tsa-yu-2025': {
    ...abstractCheck('40371085', {
      design: '偽鍼対照試験のメタ解析・試験逐次解析', population: '慢性不眠症の10試験（原典内で総人数に不一致あり）',
      summary: '主観的な睡眠尺度と客観的な睡眠指標を区別して集計し、必要な情報量も検討したレビューです。',
      findings: ['PSQIの平均差−2.60（95％信頼区間−3.24〜−1.97）、ISIは−2.04（−3.18〜−0.90）でした。客観的な総睡眠時間には有意差を示さず、他の客観的指標にも情報量不足の評価がありました。'],
      limitations: ['PubMed抄録の総人数757人と出版社本文のResultsの847人が一致しないため、総参加者数は確定値として表示しません。PSQI・ISIには大きな異質性があり、主観尺度の差を客観的睡眠の改善と一括しません。'],
    }),
    sourceUrl: 'https://www.frontiersin.org/journals/neurology/articles/10.3389/fneur.2025.1541276/full', verificationScope: 'selected_full_text', sourceLocator: 'PubMed抄録（PMID40371085）と出版社Results 3.4.1・主観／客観指標。人数の不一致を記録。全付録は未照合。',
  },
  'acupuncture-parasympathetic-tone-hrv-meta-hamvas-2022': abstractCheck('36494036', {
    design: '手技鍼の心拍変動に関する系統的レビュー・メタ解析', population: '手技鍼と偽鍼を扱う9件のランダム化試験',
    summary: '副交感神経活動と関連する心拍変動指標を検討しています。電気鍼は対象に含まれません。',
    findings: ['実鍼群では介入前後のHF・LF/HFに有意な変化、偽鍼群では有意な変化がないと報告しています。'],
    limitations: ['一方の群内で有意、他方で非有意であることだけでは、群間差の証明にはなりません。質・異質性への注意が必要で、生理指標から疾患の治療効果や個人の自律神経状態を断定しません。'],
  }),
  'shiatsu-vs-acupressure-distinction-cabo-2018': abstractCheck('29881477', {
    design: '施術手順の文献分析・手技評価', population: 'Shiatsuとacupressureの手順・技法（患者の治療効果比較ではない）',
    summary: '既存レビューの施術手順などから、Shiatsuとacupressureを分けて扱う必要性を検討しています。',
    findings: ['圧の加え方、身体の使い方などの技法の違いを説明しています。症状の改善量を比較するランダム化試験ではありません。'],
    limitations: ['acupressureの研究結果を、そのまま日本の指圧（Shiatsu）全体の効果として引用しません。手技の分類と治療効果の証明は別です。'],
  }),
  'physical-stress-ans-hrv-acupuncture-li-2025': abstractCheck('41307072', {
    design: '健常者の介入前後を比べる自己対照実験', sampleSize: 35, population: '健常ボランティア35人',
    summary: '同じ参加者に異なる鍼・灸刺激を行い、心拍変動・心拍数・ストレス関連指標を前後で測定しています。',
    findings: ['一部の刺激後に心拍変動指標の増加や心拍数低下を報告しています。'],
    limitations: ['無作為化した偽介入との比較ではなく、順序・時間・休息の影響を除外できません。健常者の短時間の生理変化から、患者のストレス症状や疾患への効果を断定しません。'],
  }),
  'body-weight-control-electroacupuncture-auricular-protocol-zhong-2016': abstractCheck('27457720', {
    design: '偽鍼対照ランダム化試験の計画書（結果論文ではない）', population: '体重管理のため72人の登録を予定した試験計画',
    summary: '電気鍼と耳介介入を偽介入と比較する予定の方法を公開したプロトコル論文です。',
    findings: ['この文献から確認できるのは研究計画です。減量結果・完了人数・有害事象の結果は報告されていません。'],
    limitations: ['予定人数72人を治療済みの対象人数として表示しません。この計画書を減量効果の証拠や、刺激設定・施術手順の推奨として使いません。'],
  }),
  'insomnia-acupuncture-systematic-review-cao-2009': abstractCheck('19922248', {
    design: '系統的レビュー・メタ解析', sampleSize: 3811, population: '不眠に関する46件のランダム化試験・計3,811人',
    summary: '鍼・指圧などを無治療・偽介入・薬物療法等と比較した古いレビューです。比較対象と手技を分けて読む必要があります。',
    findings: ['PSQIは鍼と無治療の4試験で平均差−3.28（95％信頼区間−6.10〜−0.46）、指圧と偽指圧の2試験で−2.94（−5.77〜−0.11）でした。'],
    limitations: ['無作為化・盲検・解析方法の質に限界があります。異なる対照や指圧の結果を、すべての鍼が偽鍼より優れる証拠としてまとめません。2009年の研究範囲であり、現行の不眠診療全体を代表しません。'],
  }),
  'shiatsu-acupressure-systematic-review-robinson-2011': abstractCheck('21982157', {
    design: 'Shiatsuとacupressureの系統的レビュー', population: 'Shiatsu研究9件とacupressure研究71件（スクリーニング文献1,714件）',
    summary: '2種類の手技のエビデンスを分けて検討しています。1,714は検索した文献数で、患者数ではありません。',
    findings: ['Shiatsuの研究はランダム化試験1件を含む少数で、質と量が不足すると評価しています。acupressureの疼痛・悪心・睡眠の研究とは区別しています。'],
    limitations: ['9件＋71件を80件のランダム化試験とは扱いません。acupressureの知見をShiatsu全体の有効性に置き換えず、2011年時点のレビューとして読みます。'],
  }),
  'musculoskeletal-pain-acupoint-stimulation-network-meta-liu-2025': abstractCheck('40665700', {
    design: '経穴刺激法の系統的レビュー・ネットワークメタ解析', population: '筋骨格系の痛みを扱う鍼・電気鍼・灸・指圧等の比較研究',
    summary: '複数の刺激法をネットワークメタ解析で比較した研究です。取得した抄録では研究数・総人数・各効果量を確認できません。',
    findings: ['疼痛・安全性などのSUCRA順位を報告しています。順位指標は「その割合の患者が改善する」という数値ではありません。'],
    limitations: ['間接比較・研究間の違い・推定の不確実性を考慮する必要があります。抄録の順位だけで最良の施術や副作用がないことを断定せず、人数・効果量は推測で掲載しません。'],
  }),
  'cancer-pain-acupuncture-acupressure-jama-he-2020': abstractCheck('31855257', {
    design: '系統的レビュー・メタ解析', sampleSize: 1111, population: 'がん関連疼痛の17試験・1,111人（統合解析14試験・920人）',
    summary: '偽鍼との比較と、鎮痛薬への鍼・指圧の追加介入を分けて集計しています。',
    findings: ['偽鍼との7試験の疼痛平均差−1.38（95％信頼区間−2.13〜−0.64）、鎮痛薬への追加の6試験は−1.44（−1.98〜−0.89）でした。'],
    limitations: ['疼痛解析の異質性は大きく、証拠の確実性は中等度と評価されています。レビュー全体と統合解析の人数を混同しません。個人の改善や鎮痛薬中止を保証する結果ではありません。'],
  }),
  'primary-insomnia-acupuncture-double-dummy-rct-guo-2013': abstractCheck('24159338', {
    design: 'ダブルダミー・単盲検・3群ランダム化比較試験', sampleSize: 180, population: '原発性不眠の患者180人',
    summary: '6週間、実鍼＋偽薬、エスタゾラム＋偽鍼、偽鍼＋偽薬を比較しました。PSQI・眠気・生活の質を評価しています。',
    findings: ['全群で開始前から改善し、実鍼群では睡眠の質・活力・日中の機能・眠気の一部の評価で他群との差を報告しています。'],
    limitations: ['取得した抄録に群間効果量・信頼区間がないため、具体的な改善量や優位性の大きさは補いません。質問票の結果を客観的な睡眠時間の改善や、睡眠薬の自己中止の根拠にはしません。'],
  }),
  'poststroke-shoulder-pain-acupuncture-meta-analysis-lee-2016': abstractCheck('27547224', {
    design: '系統的レビュー・メタ解析', population: '脳卒中後の肩痛を扱う12件のランダム化試験',
    summary: 'リハビリへの鍼の追加と、リハビリのみを比較したレビューです。',
    findings: ['VASの群間差は1.87（95％信頼区間1.20〜2.54）、Fugl-Meyer評価は8.70（6.58〜10.82）と報告しています。'],
    limitations: ['著者は証拠が結論的でないと評価し、より厳密な試験を求めています。抄録では総参加者数を確認できず、リハビリの代替やすべての肩痛への効果に一般化しません。'],
  }),
};

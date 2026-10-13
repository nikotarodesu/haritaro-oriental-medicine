// These are source-checked study summaries, separate from the fictional case answers.
// A selected study result is not a completed systematic literature review or expert approval.
export interface ClinicalCaseEvidence {
  population: string;
  comparison: string;
  result: string;
  interpretation: string;
  sources: { title: string; url: string }[];
}

const chronicPainEvidence: ClinicalCaseEvidence = {
  population: "非特異的な筋骨格系疼痛、変形性関節症、慢性頭痛、肩痛を対象とした39試験・20,827人の個人データ統合解析（Vickersら、2018年）。",
  comparison: "鍼を、偽鍼または鍼を行わない対照と比較。評価項目は痛みと生活機能。",
  result: "群間差は、偽鍼との比較で約0.2標準偏差、鍼を行わない対照との比較で約0.5標準偏差でした。偽鍼と比べた平均差は小さく、対照介入によって効果量が変わります。",
  interpretation: "この統合結果を、頚部神経根障害の原因除去や、教材の固定配穴が個人に最適であるという結論へ広げることはできません。痛み、機能、持続期間をそれぞれ評価します。",
  sources: [{ title: "Vickersら 2018：慢性疼痛の個人データ統合解析", url: "https://pubmed.ncbi.nlm.nih.gov/29198932/" }],
};

export const CLINICAL_CASE_EVIDENCE: Record<string, ClinicalCaseEvidence> = {
  "case-01-headache-liver-fire": {
    population: "前兆のない反復性片頭痛と診断され、鍼の経験がない150人を対象とした多施設ランダム化比較試験（Xuら、2020年）。",
    comparison: "通常ケアに加えて8週間で20回の手技鍼を行う群と、通常ケアに非刺入の偽鍼を加える群などを比較。",
    result: "17〜20週時点の4週間あたり片頭痛日数の減少は、手技鍼群で偽鍼群より2.1日多い結果でした（群間差−2.1日、95%信頼区間−2.9〜−1.2日）。",
    interpretation: "発作の予防を評価した試験で、発作時の即効性を示すものではありません。この架空例を片頭痛と確定する根拠や、肝火上炎という証の診断精度、眼の充血の原因評価にも使えません。",
    sources: [{ title: "Xuら 2020：片頭痛予防の鍼・偽鍼比較試験", url: "https://www.bmj.com/content/368/bmj.m697" }],
  },
  "case-03-dysmenorrhea-cold-stasis": {
    population: "原発性月経困難症を対象とした22試験・1,955人のレビュー（Wangら、2025年。検索は2024年5月まで）。",
    comparison: "鍼・耳鍼・指圧・灸などを、薬物、偽刺激、無治療などと比較。介入と対照が異なり、同一の手技としてまとめられません。",
    result: "3周期後の痛みは、偽刺激または無治療と比べた6試験・453人で低下しました（標準化平均差−2.96、95%信頼区間−4.39〜−1.53）。ただし研究間のばらつきは非常に大きい結果でした（I²=97%）。",
    interpretation: "バイアスと研究間の違いが大きく、結果の確かさは評価項目によって異なります。この混合介入の値から関元・三陰交・血海の3穴や自己施灸の効果・安全性は確定できません。原発性の月経痛を扱う研究で、子宮内膜症などの除外には使いません。",
    sources: [{ title: "Wangら 2025：原発性月経困難症の経穴刺激レビュー", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12393090/" }],
  },
  "case-04-menopause-yin-deficiency": {
    population: "40歳を超え、1日7回以上の中等度のほてりがあり、伝統的な腎陰虚の基準を満たす更年期移行後期・閉経後の女性327人（Eeら、2016年）。",
    comparison: "8週間で10回の鍼と、皮膚に刺さない偽鍼を比較。",
    result: "治療終了時のほてりスコアは鍼群15.36、偽鍼群15.04で、群間差は0.33（95%信頼区間−1.87〜2.52、p=0.77）。この試験では鍼の優越性を確認しませんでした。",
    interpretation: "腎陰虚で対象を選んだこと自体は、ホルモン低下や体温調節への作用を証明しません。また、偽鍼との差がないことと、あらゆる施術条件で効果がないことは別です。ほてりの頻度・重症度・生活への支障を分けて評価します。",
    sources: [{ title: "Eeら 2016：更年期のほてりに対する偽鍼対照試験", url: "https://pubmed.ncbi.nlm.nih.gov/26784863/" }],
  },
  "case-05-insomnia-heart-kidney": {
    population: "慢性不眠症患者76人を2群に分けた試験（Liら、2025年）。",
    comparison: "神門・心兪・太衝・肝兪を用いる群と、別の実鍼プロトコルを用いる群を計10回比較。偽鍼・無治療との比較はありません。",
    result: "不眠重症度質問票ISIの平均改善は7.58点と5.71点でしたが、主要評価の群間差は統計的に有意ではありませんでした。",
    interpretation: "両群の施術前後の改善だけでは、自然経過や期待を差し引いた鍼自体の効果は推定できません。成人の慢性不眠には、不眠症の認知行動療法CBT-Iを用いることがAASMの2021年ガイドラインで強く推奨されています。心腎不交という分類だけで原因や最適な配穴を決めません。",
    sources: [
      { title: "Liら 2025：2種類の実鍼による慢性不眠症の比較", url: "https://pubmed.ncbi.nlm.nih.gov/40791639/" },
      { title: "AASM 2021：成人慢性不眠の行動・心理療法ガイドライン", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7853203/" },
    ],
  },
  "case-07-ibs-liver-spleen": {
    population: "Rome IV基準の下痢型過敏性腸症候群IBS-D、18〜75歳の280人を割り付けた中国6施設のACTION試験（Yangら、2025年）。",
    comparison: "6週間で15回の鍼と、非経穴への先端が丸い偽鍼を比較。",
    result: "6週時点で、最悪の腹痛の平均が30%以上軽減し、下痢の日数が50%以上減る複合評価について、論文要旨で報告された達成率は57.9%対41.4%でした（リスク比1.40、p=0.008）。2026年の12試験・1,105人のレビューも改善を報告しましたが、研究間の差が大きく、根拠の確かさは低いと評価しています。",
    interpretation: "医学的に評価されたIBSの症状改善の研究で、肝脾不和や木乗土が腸管痙攣の生理学的原因だと証明したものではありません。この教材の排便後の痛みの経過は原文に不一致があり、症例の設定を確認する必要があります。",
    sources: [
      { title: "Yangら 2025：下痢型IBSのACTION試験", url: "https://pubmed.ncbi.nlm.nih.gov/40441496/" },
      { title: "Zhengら 2026：IBSの偽鍼対照試験レビュー", url: "https://pubmed.ncbi.nlm.nih.gov/42413705/" },
    ],
  },
  "case-08-sciatica-cold-dampness": {
    population: "腰椎椎間板ヘルニアによる慢性坐骨神経痛を対象とし、220人を割り付け、216人を解析した多施設試験（Tuら、2024年）。",
    comparison: "4週間で10回の鍼と偽鍼を比較。評価項目は脚の痛みのVASと生活機能のODI。",
    result: "4週時点の改善の群間差は脚痛VASで−16.0mm（95%信頼区間−21.3〜−10.6）、ODIで−8.1点（−11.1〜−5.1）でした。差は52週まで認められました。",
    interpretation: "この対象・回数・手技で症状と機能を改善した結果です。ヘルニアが消失したことや、寒湿の分類が原因を確定することは示していません。新しい排尿・排便異常、会陰部の感覚低下、脚の脱力には、試験の平均結果を理由に緊急評価を遅らせません。",
    sources: [{ title: "Tuら 2024：椎間板ヘルニアによる慢性坐骨神経痛の比較試験", url: "https://pubmed.ncbi.nlm.nih.gov/39401008/" }],
  },
  "case-11-cervicobrachial-syndrome": chronicPainEvidence,
  "case-12-orthostatic-hypotension": {
    population: "立ち上がった際の血圧低下を評価する医学的基準。AHAの2024年科学声明は、高血圧を伴う成人での評価・管理を扱います。",
    comparison: "臥位で5〜10分休んだ後の血圧と、起立後3分以内の血圧を、症状・脈拍・服薬・測定時刻とともに確認します。転倒や失神のおそれがある場合は医療者の管理下で評価します。",
    result: "一般的な起立性低血圧の定義は、起立後3分以内の収縮期血圧20mmHg以上または拡張期血圧10mmHg以上の持続的な低下です。起立前後の測定値がないこの症例文から、その診断を確定することはできません。",
    interpretation: "立ちくらみの原因には、循環血液量、服薬、自律神経機能など複数の検討が必要です。気血両虚の分類は血圧測定や貧血の血液検査を代替せず、百会などの配穴による脳血流改善を証明しません。",
    sources: [{ title: "AHA 2024：高血圧を伴う成人の起立性低血圧", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11067441/" }],
  },
  "case-14-knee-osteoarthritis": {
    population: "膝変形性関節症の480人を割り付け、442人を有効性解析した試験（Tuら、2021年）。",
    comparison: "週3回、8週間の電気鍼・手技鍼・偽鍼を比較。主要評価は痛みと機能の両方で臨床的に重要な改善を達成した割合。",
    result: "8週の達成率は電気鍼60.3%、手技鍼58.6%、偽鍼47.3%。電気鍼と偽鍼の差は13.0ポイント（97.5%信頼区間0.2〜25.9）でした。手技鍼と偽鍼の差11.3ポイント（−1.6〜24.4）は8週の主要評価で有意ではありませんでした。",
    interpretation: "1試験の条件下の症状・機能の結果で、軟骨再生や関節水腫の排出を示すものではありません。NICEの2022年NG226は、全体の根拠と費用を評価して変形性関節症への鍼・ドライニードリングを提供しないよう勧告しています。研究結果と診療推奨を分けて読みます。",
    sources: [
      { title: "Tuら 2021：膝変形性関節症の電気鍼・手技鍼・偽鍼比較", url: "https://pubmed.ncbi.nlm.nih.gov/33174383/" },
      { title: "NICE NG226：変形性関節症の診療推奨", url: "https://www.nice.org.uk/guidance/ng226/chapter/recommendations" },
    ],
  },
  "case-20-bells-palsy": {
    population: "発症72時間以内の16歳以上のベル麻痺患者551人を割り付け、496人の最終転帰を評価した試験（Sullivanら、2007年）。",
    comparison: "プレドニゾロン、アシクロビル、それぞれのプラセボを用いる要因計画で、顔面機能の回復を比較。",
    result: "3か月の完全回復率はプレドニゾロンを含む群83.0%、含まない群63.6%でした（差19.4ポイント、95%信頼区間11.7〜27.1）。これは鍼の効果量ではありません。",
    interpretation: "AAO-HNSのガイドラインは、16歳以上のベル麻痺で発症72時間以内の経口ステロイドと、閉眼不全への眼の保護を推奨しています。鍼については根拠の質と利益・害の不確かさから推奨を決めていません。新しい顔面麻痺では、鍼を先に行うのではなく原因の医療評価を急ぎます。",
    sources: [
      { title: "Sullivanら 2007：ベル麻痺の早期薬物療法試験", url: "https://www.nejm.org/doi/full/10.1056/NEJMoa072006" },
      { title: "AAO-HNS：ベル麻痺診療ガイドライン", url: "https://www.entnet.org/wp-content/uploads/files/Bulletin_BellsExecSummary_Final_102313.pdf" },
    ],
  },
};

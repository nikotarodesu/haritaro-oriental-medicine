export interface PaperReference {
  id: string;
  title: string;
  japaneseTitle: string;
  authors: string[];
  journal: string;
  year: number;
  pmid?: string;
  pmcid?: string;
  doi?: string;
  studyDesign: string;
  sampleSize?: number;
  targetCondition: string;
  interventionProtocol?: {
    name: string;
    acupoints: string[];
    description: string;
  };
  controlProtocol?: {
    name: string;
    acupoints: string[];
    description: string;
  };
  primaryOutcomes: string;
  secondaryOutcomes?: string;
  keyFindings: string[];
  clinicalTakeaways: string[];
  tags: string[];
  abstract: string;
}

export const PAPERS_DATABASE: PaperReference[] = [
  {
    id: "rct-insomnia-heart-liver-2025",
    title: "Comparative Effects of Two Acupuncture Protocols in the Management of Chronic Insomnia: A Randomized Controlled Trial",
    japaneseTitle: "慢性不眠症管理における2種類の鍼治療プロトコルの比較効果：ランダム化比較試験",
    authors: ["Lianbo Li", "Mingyue Xia", "Xinyu Chen", "Fengxiao Wang", "Jie Li", "Na Zhao", "Zhen Liu", "Yunfei Chen"],
    journal: "Nature and Science of Sleep",
    year: 2025,
    pmid: "40791639",
    pmcid: "PMC12338104",
    doi: "10.2147/NSS.S521578",
    studyDesign: "単盲検ランダム化比較試験 (Single-blind RCT)",
    sampleSize: 76,
    targetCondition: "慢性不眠症 (CID: Chronic Insomnia Disorder)",
    interventionProtocol: {
      name: "心肝兪原配穴群 (Heart-Liver Shu-Yuan protocol)",
      acupoints: ["HT7 (神門)", "BL15 (心兪)", "LR3 (太衝)", "BL18 (肝兪)"],
      description: "心経・肝経の背部兪穴と原穴を組み合わせ、心神安寧と肝気疏泄を促すプロトコル。週3回×10回（計10セッション）。"
    },
    controlProtocol: {
      name: "標準不眠配穴群 (Standard protocol)",
      acupoints: ["GV20 (百会)", "EX-HN22 (印堂等)", "BL62 (申脈)", "KI6 (照海)"],
      description: "頭部鎮静穴と奇経八脈（陽蹻脈・陰蹻脈）の八総穴を組み合わせた従来の標準鍼プロトコル。週3回×10回（計10セッション）。"
    },
    primaryOutcomes: "不眠重症度質問票 (ISI: Insomnia Severity Index)",
    secondaryOutcomes: "ピッツバーグ睡眠質問票 (PSQI)、睡眠ポリグラフ検査 (PSG: 総睡眠時間、睡眠効率、REM睡眠割合)、ベック不安質問票 (BAI)、ベックうつ病質問票 (BDI)、疲労重症度尺度 (FSS)、エプワース眠気尺度 (ESS)",
    keyFindings: [
      "両群ともに睡眠の質（ISI・PSQI・PSG客観データ）および日中機能が有意に改善した。",
      "ISIの改善幅は介入群（心肝兪原）で平均-7.58点、対照群で平均-5.71点（群間有意差はなし）。",
      "PSG客観評価において、総睡眠時間（TST）、睡眠効率（SE）、REM睡眠割合の同等の向上が確認された。",
      "【特異的効果】心肝兪原配穴群（神門・心兪・太衝・肝兪）は、対照群と比較して不安スコア（BAI）および抑うつスコア（BDI）を有意に大きく改善した（p < 0.05）。",
      "疲労尺度（FSS）および日中眠気（ESS）の改善幅は両群で同等であった。"
    ],
    clinicalTakeaways: [
      "鍼治療は慢性不眠症の夜間睡眠だけでなく日中機能障害（倦怠感・認知低下）も安全に改善するエビデンス。",
      "不眠に「不安・焦燥・気分の落ち込み（肝うつ・心神不安）」が重複している場合、心肝の兪原配穴（神門・心兪・太衝・肝兪）を選択することで感情障害への付加的治療価値が得られる。",
      "百会・申脈・照海プロトコルも睡眠効率改善には確実な効果を発揮するため、感情優位型か純粋な概日リズム障害型かでの使い分けが合理的。"
    ],
    tags: ["慢性不眠症", "RCT", "兪原配穴", "神門", "心兪", "太衝", "肝兪", "PSG", "不安", "抑うつ", "日中機能"],
    abstract: "Background: Chronic Insomnia Disorder (CID) significantly impairs both sleep quality and daytime functioning... [Nature and Science of Sleep 2025; PMID: 40791639]"
  },
  {
    id: "langevin-connective-tissue-2002",
    title: "Relationship of acupuncture points and meridians to connective tissue planes",
    japaneseTitle: "経穴・経絡と結合組織面（ファシア・筋膜）の解剖学的相関関係",
    authors: ["Helene M. Langevin", "Jason A. Yandow"],
    journal: "The Anatomical Record (Part B: New Anat.)",
    year: 2002,
    pmid: "12467083",
    doi: "10.1002/ar.10185",
    studyDesign: "解剖学的断面マッピングおよび超音波エコー画像検証 (Anatomical Mapping & Ultrasound)",
    targetCondition: "経穴・経絡の解剖学的実体・結合組織（ファシア）ネットワーク",
    primaryOutcomes: "上肢連続解剖切片における経穴位置と筋間・筋内結合組織面（結合組織間隙）の一致率",
    keyFindings: [
      "ヒト上肢の連続マクロ解剖断面において、経穴の部位と筋間（intermuscular）または筋内（intramuscular）結合組織面の局在との間に【80%の統計的一致】を確認した（p < 0.001）。",
      "健常者における超音波画像診断により、経穴部位には結合組織の開裂面（cleavage planes）が存在することが実証された。",
      "経穴・経絡ネットワークは、人体全身を連続的に包む「間質結合組織（Interstitial Connective Tissue / ファシア）」の三次元ネットワークの表現として捉えることができる。",
      "鍼を刺入・回旋した際に生じる「得気（Needle Grasp）」は、結合組織のコラーゲン線維が鍼体に巻き付くメカノトランスダクションであり、線維芽細胞の形態変化と細胞内シグナル伝達を誘発する。"
    ],
    clinicalTakeaways: [
      "経絡は「見えない神秘の管」ではなく、筋肉と筋肉の間を走る「筋膜・結合組織の間隙（Fascial Planes）」として解剖学的に実在する。",
      "鍼刺激が遠隔の臓腑や全身に波及する物理的メカニズムは、結合組織ネットワークを介した機械的張力伝達（メカノバイオロジー）と細胞外マトリックスの生化学応答によって説明可能である。"
    ],
    tags: ["経穴の科学", "ファシア", "結合組織", "筋膜", "超音波エコー", "メカノトランスダクション", "ランジュバン", "Needle Grasp"],
    abstract: "Acupuncture meridians traditionally are believed to constitute channels connecting the surface of the body to internal organs. We hypothesize that the network of acupuncture points and meridians can be viewed as a representation of the network formed by interstitial connective tissue..."
  },
  {
    id: "meta-musculoskeletal-pain-yuan-2016",
    title: "Acupuncture for musculoskeletal pain: A meta-analysis and meta-regression of sham-controlled randomized clinical trials",
    japaneseTitle: "筋骨格系疼痛に対する鍼治療：偽鍼対照ランダム化臨床試験のメタアナリシスおよびメタ回帰分析",
    authors: ["Qi-ling Yuan", "Peng Wang", "Liu Liu", "Zhi-wen Sun", "Chao-long Hou", "Min-liang Yao", "Zhi-xing Zou", "Yong-gang Zhou", "Bao-bao Xing", "Fang Shen", "Wen-tang Wang", "Yu-shun Chen"],
    journal: "Scientific Reports (Nature Publishing Group)",
    year: 2016,
    pmid: "27464878",
    pmcid: "PMC4965824",
    doi: "10.1038/srep30675",
    studyDesign: "システマティックレビュー、メタアナリシスおよびメタ回帰 (Meta-analysis & Meta-regression)",
    sampleSize: 6382,
    targetCondition: "筋骨格系疼痛全般（頸部痛、肩痛、腰痛、変形性関節症OA、筋膜性疼痛MP、線維筋痛症FM、外側上顆炎、関節リウマチRA）",
    primaryOutcomes: "疼痛強度（VAS/NRS等、介入直後≦1週間のSMD）",
    secondaryOutcomes: "身体障害度・機能改善（ODI, WOMAC, NPQ等）",
    keyFindings: [
      "全63試験（6,382名）を統合した結果、本物の鍼治療は偽鍼（Sham）と比較して有意な疼痛緩和（59試験 4,980名, SMD -0.61 [95% CI -0.76 to -0.47], p < 0.001：VASで約12mm改善の中等度効果）を示した。",
      "機能障害の改善においても大きな効果（31試験 4,876名, SMD -0.77 [95% CI -1.05 to -0.49], p < 0.001）を認めた。",
      "【疾患別のエビデンス強度（GRADE）】慢性頸部痛（高品質）、肩痛（高品質）、慢性腰痛（中等度）、筋膜性疼痛（中等度）、変形性関節症（低品質・効果は大 SMD -0.77）。",
      "【偽鍼（Sham）タイプの影響】偽鍼の刺入深度（非刺入・浅刺・通常深度）や位置（同部位・経穴外・無関係部）の違いは、本物の鍼治療の効果推定値（SMD）に有意な交互作用を与えなかった（Shamタイプにかかわらず実鍼が優位）。",
      "重篤な有害事象は極めて稀であり、副作用発生率はオピオイドやNSAIDsよりも大幅に低い。"
    ],
    clinicalTakeaways: [
      "「鍼は単なるプラセボ」という批判を、世界基準の偽鍼対照63試験のメタアナリシスで統計的に完全論破した最高峰のエビデンス。",
      "特に頸部痛・肩痛・腰痛・変形性関節症・トリガーポイント（筋膜性疼痛）において、偽鍼を上回る明確な特異的鎮痛効果（Specific Effect）が立証されている。"
    ],
    tags: ["メタアナリシス", "筋骨格系疼痛", "偽鍼対照", "腰痛", "頸部痛", "変形性関節症", "肩痛", "GRADE", "エビデンス"],
    abstract: "The aims of this systematic review were to study the analgesic effect of real acupuncture and to explore whether sham acupuncture (SA) type is related to the estimated effect of real acupuncture for musculoskeletal pain..."
  },
  {
    id: "han-electroacupuncture-frequencies-2003",
    title: "Acupuncture: neuropeptide release produced by electrical stimulation of different frequencies",
    japaneseTitle: "鍼治療：異なる周波数の電気刺激によって生じる中枢神経ペプチドの特異的放出機構",
    authors: ["Ji-Sheng Han (韓済生)"],
    journal: "Trends in Neurosciences (TINS)",
    year: 2003,
    pmid: "12535679",
    doi: "10.1016/s0166-2236(02)00006-1",
    studyDesign: "神経生理学・神経化学総説・臨床トランスレーショナル研究 (Neurobiology Review)",
    targetCondition: "電気鍼（パルス通電・EA）による中枢性疼痛抑制と内因性オピオイド動態",
    primaryOutcomes: "脊髄・脳幹・視床下部における各種神経ペプチド（エンドルフィン、エンケファリン、ダイノルフィン、エンドモルフィン）の濃度変化",
    keyFindings: [
      "【周波数特異的オピオイド放出の発見】",
      "① 低周波刺激（2Hz）：視床下部弓状核・中脳水道周囲灰白質（PAG）を活性化し、**β-エンドルフィン**および**メチオニン-エンケファリン**の放出を促進（μおよびδオピオイド受容体を介した持続性鎮痛）。",
      "② 高周波刺激（100Hz）：脊髄後角を直接活性化し、**ダイノルフィン**の放出を促進（κオピオイド受容体を介した即効性局所鎮痛）。",
      "③ 【2Hz / 100Hz 疎密波（Dense-Disperse Wave）の優位性】：2Hzと100Hzを交互に切り替える刺激モード（2/100Hz）により、μ・δ・κの3大オピオイド受容体が同時最大活性化され、相乗的な最強の鎮痛効果が生じる（耐性形成も抑制）。",
      "求心性伝達線維：低周波EAはAβおよびAδ線維を駆動し、脳幹下行性疼痛抑制系をドライブする。"
    ],
    clinicalTakeaways: [
      "パルス鍼（通電療法）を行う際、漫然と周波数を設定するのではなく、「2Hz＝全身性・自律神経・慢性的疼痛・エンドルフィン」、「100Hz＝急性期・局所神経障害・ダイノルフィン」、「2/100Hz疎密波＝難治性疼痛・相乗鎮痛」と生化学的ターゲットに応じて使い分ける論理的根拠。",
      "ヒト臨床研究においても、2/100Hz交互刺激が術後オピオイド要求量を最大に削減することが実証されている。"
    ],
    tags: ["電気鍼", "パルス周波数", "韓済生", "内因性オピオイド", "エンドルフィン", "ダイノルフィン", "下行性疼痛抑制系", "疎密波"],
    abstract: "Brain functions are regulated by chemical messengers that include neurotransmitters and neuropeptides. Recent studies have shown that acupuncture or electrical stimulation in specific frequencies applied to certain body sites can facilitate the release of specific neuropeptides in the CNS..."
  },
  {
    id: "angiotensin-ii-analog-hypertension-1976",
    title: "アンギオテンシンIIアナログの臨床応用(第2報)各種疾患における〔1-Sar, 8-Ile〕Angiotensin II投与時の血圧変化について",
    japaneseTitle: "アンギオテンシンIIアナログの臨床応用：各種疾患における血圧変化とR-A-A系の病態生理",
    authors: ["山本 智英", "他3名"],
    journal: "日本内科学会雑誌 (第65巻 第5号)",
    year: 1976,
    doi: "10.2169/naika.65.465",
    studyDesign: "臨床薬理・病態介入研究 (Clinical Pharmacology Study)",
    sampleSize: 62,
    targetCondition: "各種高血圧症および体液・電解質異常疾患（本態性高血圧、原発性アルドステロン症、腎血管性高血圧、悪性高血圧、褐色細胞腫、Cushing症候群、Bartter症候群、慢性腎不全など）",
    primaryOutcomes: "[1-Sar, 8-Ile]AII 点滴静注前後の血圧変化（ΔBP%）と血漿レニン活性（PRA）との相関",
    keyFindings: [
      "全体として血漿レニン活性（PRA）と平均血圧変化率（ΔBP）との間に【明確な負の相関関係】が成立した。",
      "【低レニン群】：AII受容体拮抗薬の投与により、多くの例で10〜20mmHg以上の【昇圧反応】（アゴニスト作用/部分作動薬様作用）がみられ、降圧例はゼロであった（低レニン本態性高血圧の71%、原発性アルドステロン症・Cushing症候群の56%で10%以上昇圧）。内因性AII欠乏状態では受容体を占拠して昇圧をもたらす。",
      "【高レニン群】：腎血管性高血圧などでは一部で10%以上の降圧を認めたが、昇圧例も混在した（体液過剰因子とAII依存因子の混在）。",
      "褐色細胞腫では5例中3例で著明な昇圧を認め、副腎髄質からのカテコールアミン分泌刺激作用が示唆された。",
      "正常血圧の二次性アルドステロン症（Bartter症候群・腹水肝硬変等）において降圧がみられ、低血圧・正常血圧維持におけるAIIの不可欠性が実証された。"
    ],
    clinicalTakeaways: [
      "高血圧は単一の病態ではなく、「レニン-アンギオテンシン依存性（血管収縮型＝気滞・血瘀）」と「体液量過剰依存性（循環血漿量・Na貯留型＝水滞・湿熱）」の二大スペクトラムが存在する。",
      "受容体遮断薬であっても、生体内環境（内因性リガンド濃度）によってインバース/アゴニストに挙動が逆転する複雑適応系の動態を示しており、漢方・鍼灸における「同病異治」「気血水弁証」の科学的基盤に通じる。"
    ],
    tags: ["レニン・アンギオテンシン系", "高血圧", "内因性AII", "体液量過剰", "褐色細胞腫", "Bartter症候群", "受容体動態", "循環生理学"],
    abstract: "アンギオテンシンII(AII)特異的拮抗物質の臨床応用は、ヒトにおける各種疾患のレニンーアンギオテンシンーアルドステロン系(R-A-A系)の解明に期待されている。62例の高血圧性・体液異常疾患において血圧変化とPRAの関係を解明..."
  },
  {
    id: "auricular-cancer-pain-alimi-2003",
    title: "Analgesic effect of auricular acupuncture for cancer pain: a randomized, blinded, controlled trial",
    japaneseTitle: "がん性疼痛に対する耳鍼（耳介鍼）の鎮痛効果：二重盲検ランダム化対照試験",
    authors: ["David Alimi", "Claude Rubino", "Evelyne Pichard-Léandri", "Sylvie Fermand-Brulé", "Anne-Marie Dubreuil-Lemaire", "Maurice Leandri"],
    journal: "Journal of Clinical Oncology (JCO)",
    year: 2003,
    pmid: "14645428",
    doi: "10.1200/JCO.2003.09.121",
    studyDesign: "二重盲検ランダム化比較試験 (Double-blind RCT)",
    sampleSize: 90,
    targetCondition: "鎮痛薬治療抵抗性のがん性疼痛 (Cancer Pain, VAS≧30mm)",
    interventionProtocol: {
      name: "電気皮膚反応陽性耳穴鍼群 (True Auricular Acupuncture)",
      acupoints: ["皮膚電気抵抗低下シグナル（皮膚電位異常）が検出された特異的耳穴"],
      description: "探索プローブで電気皮膚抵抗が低下している反応点を検出し、半永久的皮内針（ASP needle）を留置。2コース実施。"
    },
    controlProtocol: {
      name: "偽耳穴鍼群および偽種子群 (Sham Acupoint & Placebo Seeds)",
      acupoints: ["電気皮膚シグナルのない非反応耳穴"],
      description: "電気的反応のない耳介部位への刺入群、およびプラセボ種子貼付群の2つの対照。"
    },
    primaryOutcomes: "2ヶ月後の疼痛強度（VAS）の絶対的減少度",
    keyFindings: [
      "十分な薬物療法を受けているにもかかわらず痛みが持続するがん患者90名を対象とした二重盲検試験。",
      "【劇的な群間差】実耳鍼群では、ベースラインから2ヶ月後に疼痛強度が【36%減少】したのに対し、プラセボ群ではわずか【2%の変化】にとどまった。",
      "群間差は極めて高度に統計的有意であった（p < 0.0001）。",
      "迷走神経耳介枝および三叉神経耳介側頭神経を介した中枢性疼痛抑制系の賦活が示唆された。"
    ],
    clinicalTakeaways: [
      "世界最高峰のがん専門誌『Journal of Clinical Oncology (JCO)』に掲載された、耳鍼の極めて厳格なエビデンス。",
      "がん性疼痛のように強オピオイドや鎮痛薬でもコントロール困難な難治性疼痛に対して、耳介の電気的反応点を用いた鍼治療が劇的な相補的鎮痛効果（36%改善）をもたらす。",
      "耳介は迷走神経（第X脳神経）が体表に直接露出する唯一の部位であり、自律神経・全身性抗炎症・鎮痛のバイオインターフェースとして極めて重要。"
    ],
    tags: ["がん性疼痛", "耳鍼", "耳介鍼", "JCO", "二重盲検RCT", "迷走神経耳介枝", "皮膚電気抵抗", "オピオイド不応性"],
    abstract: "Purpose: During the last 30 years, auricular acupuncture has been used as complementary treatment of cancer pain when analgesic drugs do not suffice. The purpose of this study is to examine the efficacy of auricular acupuncture in decreasing pain intensity in cancer patients..."
  },
  {
    id: "ryodoraku-skin-resistance-influencing-factors-1985",
    title: "Electrical Skin Resistance Measuring the Influencing Factors Simultaneously",
    japaneseTitle: "皮膚電気抵抗測定における影響因子の同時測定と標準化：良導絡測定の客観的検証",
    authors: ["Hungarian & Japanese Ryodoraku Research Group","Tiller W. A. et al."],
    journal: "Japanese Journal of Ryodoraku Medicine (日本良導絡自律神経学会雑誌)",
    year: 1985,
    studyDesign: "生体電気生理学的実験研究・測定機器標準化検証 (Electrophysiological Standardization Study)",
    sampleSize: 30,
    targetCondition: "皮膚電気抵抗・良導絡測定における測定誤差因子（電極分極、皮膚温度、室内湿度、電極圧）の定量的影響と標準化",
    primaryOutcomes: "電極分極（100%超の誤差誘発要因）の排除機構（4電極法・3電極定電流法）の確立、皮膚温・湿度標準化補正アルゴリズム",
    secondaryOutcomes: "合谷（LI4）周囲における局所皮膚電気抵抗の急峻な低下（良導点・ツボの客観的実証）と体表抵抗マッピング",
    keyFindings: [
      "健康被験者30名に対し300箇所の測定点で12,000回以上の測定を実施し、皮膚電気抵抗測定に介入する物理的変数を定量解明。",
      "電極分極現象（通電に伴う電極電位変化）は100%以上の測定誤差（抵抗の見かけ上の増大）をもたらす最大の交絡因子であることを解明。",
      "電極分極を完全に排除するため、外側リング電流電極と内側ディスク電位測定電極からなる「4電極法」および高入力インピーダンスアンプを併用した「3電極定電流法」を提示。",
      "環境相対湿度が1%上昇するごとに正規化抵抗値が2.8%減少すること、および皮膚温とlog(抵抗値)の線形相関（Maulsby & Edelberg則）に基づき、標準皮膚温30℃および湿度への標準化補正アルゴリズムを構築。",
      "示指背側から手背にかけて抵抗値が段階的に上昇するのに対し、合谷（LI4）領域では特異的かつ明瞭な抵抗降下（良導点現象）が確認され、経穴の電気生理学的特異性を実証。"
    ],
    clinicalTakeaways: [
      "良導絡・EAV等の経絡生体電気診断において、電極圧の均一化（スプリングプローブ）、湿潤度（0.05 mol NaCl等張液）、室温・皮膚温の補正が客観的再現性に不可欠であることを証明。",
      "合谷などの主要経穴が周囲皮膚組織に比べて有意に低抵抗（高通電性）を示す生体物理的エビデンスであり、経穴＝電気的低インピーダンス点という理論を強力に裏付ける。"
    ],
    tags: ["良導絡","皮膚電気抵抗","電極分極","4電極法","合谷","生体電気生理学","自律神経","測定標準化"],
    abstract: "In his paper, Tiller asked: 'What do electrodermal diagnostic acupuncture instruments really measure?' To answer this question, authors made more than 12,000 measurements on 30 healthy volunteers taking into account influencing factors: electrode polarization (which causes errors >100%), constant current vs constant voltage, skin temperature, and relative humidity. They established a 4-electrode technique and mathematical normalization algorithms, verifying the distinct localized drop in skin resistance at the Hegu (LI4) area."
  },
  {
    id: "development-acupuncture-west-vicenza-589-cases",
    title: "Development of Acupuncture Practice in the West: Beginning with Traditional Chinese Acupuncture, Growing with Reflextherapy by Acupuncture Western Type, Achieving Eventually Ryodoraku and New Scalp Acupuncture",
    japaneseTitle: "欧米における鍼灸診療の展開：伝統中国鍼から西洋式反射療法、ウィーン学派系統鍼灸、そして良導絡とYNSA（山元式新頭針療法）への到達（ヴィチェンツァ総合病院麻酔科・ペインクリニック589例の臨床報告）",
    authors: ["Italian Anesthesiologist Team (Vicenza General Hospital)","Prof. Ono","Prof. Hyodo"],
    journal: "Japanese Journal of Ryodoraku Medicine (日本良導絡自律神経学会雑誌)",
    year: 1987,
    studyDesign: "大規模前向き・後方視的臨床症例集積研究 (Clinical Cohort Study, 589例)",
    sampleSize: 589,
    targetCondition: "難治性慢性疼痛症候群（頸椎性疼痛症候群320例、腰痛・坐骨神経痛、大関節疾患、難治性群発頭痛・緊張型頭痛など）",
    interventionProtocol: {
      name: "統合的西洋鍼灸・良導絡・YNSA複合プロトコル",
      acupoints: ["良導絡反応点 (REPP/Trigger Points)","YNSA頭針点","ウィーン学派系統鍼灸配穴 (BL23/BL47副腎皮質刺激等)"],
      description: "急性疼痛にはニューロメーター（12V, 200µA, 7秒通電）による局所良導絡治療＋YNSA頭針、慢性期には良導絡チャートに基づく24経絡調整およびウィーン学派系統鍼灸（1〜2mm浅刺、置針20分、1セッション10〜14本）を併用。"
    },
    primaryOutcomes: "疼痛寛解率、臨床的改善度、頸椎症候群・腰痛症・関節症における治療奏効率",
    secondaryOutcomes: "トリガーポイントにおける即時局所麻酔様効果、難治性血管性頭痛・群発頭痛の完全寛解、病巣感染（歯・扁桃等の慢性炎症フォーカス）による反応阻害の検出",
    keyFindings: [
      "イタリア北部の1800床規模の総合病院（ヴィチェンツァ総合病院）麻酔科・ペインクリニックにおける589例の慢性疼痛症例の治療成績。",
      "【頸椎性疼痛症候群（320例）】：Maigne頭痛、頸椎症、頸肩腕症候群、Arnold神経痛、頸動脈・椎骨動脈循環不全（Barré-Liéou症候群）、Putman-Schultze症候群（夜間有痛性上肢知覚異常）等を含み、【82%以上の極めて高い奏効率】を記録。",
      "【大関節・腰肢疾患】：肩関節（頸椎関連痛含む）および膝関節は極めて良好な反応を示した一方、股関節痛は体重負荷因子のため反応性がやや低かった。",
      "【即時鎮痛メカニズム】：良導絡ニューロメーターによる局所通電（200µA, 12V, 7秒）は、トリガーポイントや良導点（REPP）において局所麻酔薬注射と同等の即時除痛をもたらし、伝統的な「得気（Teh Chi）」や「経絡感伝（PSC）」を手技操作なしに確実に誘発。",
      "従来の鍼灸や薬物療法で完全にお手上げだった同僚医師の「自殺念慮を伴う難治性群発・緊張型頭痛発作」が、良導絡とYNSAの併用により劇的に完全寛解した臨床例を提示。",
      "アルント・シュルツの法則（Arndt-Schulz law）を強調：過大刺激は痛覚過敏（Hyperalgesia）を招くため、微細・適切な刺激量（10〜14針、浅刺、適正電流）こそが最も持続的な治癒効果を生む。",
      "治療が停滞する難治例において、良導絡チャートが歯牙・扁桃腺・虫垂などの「潜在的慢性炎症巣（Focus of chronic flogosis）」の存在をあぶり出し、障害ブロックを解除できる。"
    ],
    clinicalTakeaways: [
      "欧州の近代麻酔科・ペインクリニック現場において、伝統的脈診の主観性を克服し、客観的診断（良導絡チャート）と即時鎮痛（YNSA頭針＋局所通電）を融合させた画期的臨床体系。",
      "頸椎症性頭痛や頸肩腕症候群に対して8割超の著効を示し、激痛・急性期にはYNSAと局所良導絡、体質改善・自律神経調整には系統鍼灸という合理的役割分担を提示。"
    ],
    tags: ["良導絡","YNSA","山元式新頭針療法","ペインクリニック","頸椎症","Maigne頭痛","群発頭痛","589例","アルントシュルツの法則","ウィーン学派"],
    abstract: "Clinical casuistry of 589 chronic pain patients treated in the Acupuncture Outpatients Department of Vicenza General Hospital (Northern Italy). Demonstrates the integration of Traditional Acupuncture, Vienna Systematic Acupuncture, Ryodoraku, and Yamamoto New Scalp Acupuncture (YNSA), showing >82% success in cervical spine-related syndromes."
  },
  {
    id: "objective-evaluation-meridians-hyodo-1980",
    title: "An Attempt to Objectify Meridian Phenomena: Comparison of Ryodoraku Chart, Thermography, Pulse Wave Tracing, and Abdominal Mu-Point Palpation in 1,000 Cases",
    japaneseTitle: "経絡現象の客観化への試み：良導絡チャート・サーモグラフィー・脈圧波描記・腹部募穴圧診法による1,000例の比較検討",
    authors: ["兵頭正義 (Masayoshi Hyodo)","竹之内 (Takenouchi)","ペインクリニック共同研究グループ"],
    journal: "Journal of the Japan Acupuncture & Moxibustion Society / 日良自律",
    year: 1980,
    studyDesign: "生体客観計測・臨床診断相関比較研究 (1,000例比較研究)",
    sampleSize: 1000,
    targetCondition: "ペインクリニック受診患者における経絡現象の客観的評価と自律神経・体表反応の可視化",
    primaryOutcomes: "良導絡チャート代表測定点電流量、カラーサーモグラフィー皮膚温分布、六部定位脈圧波形、腹部募穴疼痛閾値",
    keyFindings: [
      "主観的とされてきた東洋医学の診断（望・聞・問・切）を現代医工学的手法で客観化するペインクリニックの4大プロトコルを確立。",
      "①良導絡チャート：手足24代表測定点の皮膚電気伝導度を測定し、基底電流に応じた生理的変動幅（50µA時1.4cm幅）へ標準化し、経絡の興奮・抑制を判定。",
      "②カラーサーモグラフィー望診：自律神経性血管運動障害や炎症・冷えの局在をリアルタイムにカラー熱画像として定量化。",
      "③脈圧波描記：直径6mm・厚さ2.5mmの特殊円形圧電電極を六部定位脈診部に装着し、脈圧波形を実脈型（乳脈・浮脈・弦脈・緊脈・牢脈）と虚脈型（遅脈・微脈・伏脈・弱脈）に波形分析・客観分類。",
      "④腹部募穴圧診法：特製圧力計を用いて腹部募穴の圧痛閾値を定量測定し、チャート上にプロット（陰経L型、陽経横一文字型）。",
      "【1,000例の大規模比較成績】：良導絡チャートと腹部募穴圧診法を1,000例で対照解析した結果、異常が集中する経絡（肝経が最も異常頻度が高く、肺経が最も異常が少ない等）の検出分布が高度に一致した。",
      "興奮・抑制（電気）と虚・実（圧痛）のベクトルにおいて逆転傾向（電気的興奮時に圧痛虚、またはその逆）が一部に見られたが、病態検出経絡の合致率は極めて高く、自律神経反射と深部内臓-体表反射の相補的関係を実証。"
    ],
    clinicalTakeaways: [
      "東洋医学の「経絡」を感覚論から脱却させ、皮膚電気抵抗・末梢血流温度・動脈圧波形・深部痛覚閾値という多角的バイオマーカー群として統合評価した金字塔的臨床研究。",
      "1,000例という圧倒的母数により、肝経が現代ストレス社会・慢性痛において最も頻繁に病態反応を示すことが統計的・客観的に証明された。"
    ],
    tags: ["経絡客観化","良導絡チャート","サーモグラフィー","脈圧波描記","腹部募穴圧診法","兵頭正義","1000例","自律神経","ペインクリニック"],
    abstract: "鍼治療に際して最も重要な点の1つである経絡現象の客観的把握を目的とし、ペインクリニックにおいて良導絡チャート、カラーサーモグラフィー、六部定位脈圧波描記、腹部募穴圧診法の4つの方法を実施。1,000例における良導絡と腹部募穴圧診法の比較検討を行い、肝経をはじめとする異常経絡の一致性を実証した。"
  },
  {
    id: "electrodermal-ryodoraku-qigong-sancier-2003",
    title: "Electrodermal Measurements for Monitoring the Effects of a Qigong Workshop",
    japaneseTitle: "気功ワークショップの効果をモニタリングするための皮膚電気（良導絡）測定：生体エネルギー・自律神経バランスの客観的評価",
    authors: ["Kenneth M. Sancier"],
    journal: "The Journal of Alternative and Complementary Medicine",
    year: 2003,
    studyDesign: "自己対照型前後比較臨床試験 (Self-controlled Clinical Study)",
    sampleSize: 29,
    targetCondition: "気功実践に伴う気（生体エネルギー）・自律神経バランスの変動評価",
    interventionProtocol: {
      name: "2日間気功集中ワークショップ (2-Day Qigong Workshop)",
      acupoints: ["手首・足背の良導絡24代表測定点 (H1〜H6, F1〜F6)"],
      description: "Ryodoraku Neurometer Model D-410（湿潤綿プローブ、スプリング定圧電極）を用い、2日間にわたり毎朝・毎夕に手足24代表測定点の電気伝導度を測定。"
    },
    primaryOutcomes: "24測定点の良導絡値の個体内・集団内標準偏差（SD: Standard Deviation）の変化",
    secondaryOutcomes: "午前の測定値に対する午後の測定値の総伝導度変化（サーカディアンリズムの検討）",
    keyFindings: [
      "気功ワークショップ受講者29名を対象に、Ryodorakuニューロメーターによる客観的生体電気測定を実施。",
      "【気のバランス改善（バラツキの有意な減少）】：個人および集団全体の良導絡24測定点における標準偏差（SD）が、午前から午後にかけて有意に減少した（1日目 p = 0.004、2日目 p = 0.0001）。",
      "全29名中26名（約90%）においてワークショップ期間中に標準偏差の減少（経絡間のアンバランス・偏りの是正＝気の均一平準化）が確認された（p < 0.00001）。",
      "【サーカディアンリズムの確認】：午後の平均電気伝導度は午前に比べて全体的に有意に高値を示し、生体の生理的日内リズム（交感神経・代謝活性の上昇）を鋭敏に反映。",
      "EAV（フォル電針）やAMI（本山博・経絡機能測定器）と比較し、良導絡の生理食塩水湿潤綿プローブと定圧スプリング構造が組織を機械的に損傷・刺激せず、再現性の高い客観データを提供することを実証。"
    ],
    clinicalTakeaways: [
      "東洋医学における「気血の調和」「陰陽の平衡」が、良導絡24測定点の『標準偏差（ばらつき）の縮小』という純粋な統計物理量として客観的に可視化・実証された画期的な研究。",
      "鍼灸治療や気功・運動療法前後において、単なる電流量の絶対値だけでなく、各経絡間の偏差（SD）を評価指標とすることの臨床的妥当性を証明。"
    ],
    tags: ["気功","良導絡","Neurometer","皮膚電気伝導度","気のバランス","標準偏差","サーカディアンリズム","客観的評価","EAV","AMI"],
    abstract: "Objectives: Electrodermal measurements with a Ryodoraku instrument were used to monitor the effects of a 2-day qigong workshop on the body energy of participants. Methods: Measurements of relative electrical conductivity at 24 acupoints were made on 29 subjects morning and afternoon. Results: Standard deviations of Ryodoraku responses decreased significantly (p=0.004, p=0.0001), showing improved energetic balance."
  },
  {
    id: "review-acupuncture-diabetic-neuropathy-baek-2021",
    title: "Effect of Acupuncture on Diabetic Neuropathy: A Narrative Review",
    japaneseTitle: "糖尿病性神経障害に対する鍼治療の効果：ナラティブレビュー（分子シグナル伝達機構と臨床試験の統合解析）",
    authors: ["Minji Baek","Woojin Kim","et al."],
    journal: "International Journal of Molecular Sciences (IJMS)",
    year: 2021,
    studyDesign: "系統的ナラティブレビュー (Narrative Review: ヒト臨床試験10報＋動物実験5報)",
    sampleSize: 15,
    targetCondition: "糖尿病性末梢神経障害 (DPN: Diabetic Peripheral Neuropathy, 疼痛・しびれ・神経伝導遅延)",
    interventionProtocol: {
      name: "糖尿病性神経障害に対する標準鍼灸・電針プロトコル",
      acupoints: ["ST36 (足三里)","SP6 (三陰交)","BL20 (脾兪)","BL13 (肺兪)","SP9 (陰陵泉)","BL60 (崑崙)"],
      description: "電針（2Hz〜低周波、20〜30分間通電、週数回〜連日）または手技鍼療法。"
    },
    primaryOutcomes: "神経障害性疼痛スコア（熱痛覚潜時、機械的アロディニア）、神経伝導速度（NCV: 運動・感覚神経）、空腹時血糖",
    secondaryOutcomes: "後根神経節（DRG）および脊髄後角における分子マーカー（NF-κB p65, GPR78, TRPV1, P2X3, NGF, BDNF）、安全性・有害事象",
    keyFindings: [
      "解析した全15研究（臨床10報、動物5報）において、鍼治療（手技鍼および電針）が糖尿病性神経障害を有意に軽減することが一貫して示された。",
      "【主要経穴】：足三里（ST36）、三陰交（SP6）、脾兪（BL20）、肺兪（BL13）、陰陵泉（SP9）が最頻出。",
      "【分子生物学的鎮痛メカニズム】：電針刺激（特に2Hz足三里）は、STZ誘発糖尿病ラットの後根神経節（DRG）および脊髄において、NF-κB p65のリン酸化抑制、小胞体ストレスマーカーGPR78の正常化、TRPV1受容体およびATP受容体P2X3の過剰発現抑制、炎症性サイトカイン（TNF-α, IL-1β）の遮断を誘導。",
      "【神経再生と伝導速度（NCV）の改善】：臨床試験4報および動物実験1報において、鍼治療後に運動神経伝導速度（MNCV）および感覚神経伝導速度（SNCV）が有意に改善。",
      "【安全性】：5報で軽微な内出血、一時的な局所痛、痺れ、嘔気が報告されたが、重篤な有害事象は一切認められず、極めて高い安全性が確認された。"
    ],
    clinicalTakeaways: [
      "糖尿病性神経障害という現代西洋医学でも対症療法薬に限られ根治が難しい難治性疾患に対し、鍼治療が神経伝導速度の客観的改善および分子レベルでの抗炎症・小胞体ストレス抑制をもたらす強固な科学的根拠。",
      "脾経・胃経（ST36, SP6, SP9）および背部兪穴（BL20, BL13）への電針（2Hz）が、末梢神経軸索の保護と中枢性感作の抑制に最も効果的。"
    ],
    tags: ["糖尿病性神経障害","DPN","足三里","三陰交","電針","神経伝導速度","NF-κB","小胞体ストレス","TRPV1","P2X3"],
    abstract: "Diabetic neuropathy, a major complication of diabetes mellitus, affects the nervous system and causes severe pain. In this review, 10 human clinical trials and 5 animal studies were analyzed. All studies reported that acupuncture (ST36, SP6, BL20, BL13, SP9) significantly relieved diabetic neuropathy through modulation of molecules such as NF-κB p65, GPR78, and TRPV1, improving nerve conduction velocity without serious adverse events."
  },
  {
    id: "review-acupuncture-sports-injuries-athletes-2020",
    title: "Use of Acupuncture for the Treatment of Sports-Related Injuries in Athletes: A Systematic Review of Case Reports",
    japaneseTitle: "アスリートのスポーツ外傷・障害に対する鍼治療の応用：症例報告・症例集積の系統的レビュー（22研究・211名のアスリート解析）",
    authors: ["Jin-Seok Lee","Seunghoon Lee","et al."],
    journal: "Healthcare / IJERPH",
    year: 2020,
    studyDesign: "系統的レビュー (Systematic Review of Case Reports and Case Series)",
    sampleSize: 211,
    targetCondition: "アスリートのスポーツ外傷・障害（外側半月板断裂、大腿骨寛骨臼インピンジメント、ガングリオン、スポーツヘルニア、イップス、遅発性筋肉痛 DOMS、脳震盪後症候群など）",
    interventionProtocol: {
      name: "アスリート特化型鍼灸・電針・カッピング複合プロトコル",
      acupoints: ["ST36 (足三里)","Back Shu points (背部兪穴)","SP13","ST29","ST30","KI11","GB28","LR9","LR10 (スポーツヘルニア用局所筋膜・鼠径部配穴)"],
      description: "手技鍼（MA）、電針（EA: 2Hz足三里等）、吸い玉（カッピング）、カッサ（Gua sha）等の組み合わせ。週1〜2回ペースが最多。"
    },
    primaryOutcomes: "競技復帰率（RTP: Return to Play）、疼痛スコア、可動域・機能回復、競技パフォーマンストラブルの改善",
    secondaryOutcomes: "有害事象、再発率、ゴルフのイップス（運動障害）改善、遅発性筋肉痛（DOMS）の早期回復",
    keyFindings: [
      "MEDLINE/Embase等から網羅的に抽出された22研究・計211名のアスリート症例を系統的に分析。",
      "【多彩なスポーツ疾患への適応】：単なる運動器慢性痛にとどまらず、外側半月板断裂、大腿骨寛骨臼インピンジメント（FAI）、ガングリオン、スポーツヘルニア（グローインペイン）など侵襲的手術が検討される難治性構造異常に対して、非侵襲的保存療法として奏効。",
      "【イップス・中枢性機能障害への効果】：ゴルファーのイップス（局所ジストニア様運動障害）やスポーツ関連脳震盪後症候群に対して、手技鍼や電針が中枢性運動制御を回復させた。",
      "【競技復帰率（RTP）】：復帰状況を報告した12研究（54.5%）において、全例でアスリートが競技への完全復帰を達成。",
      "【高い安全性】：有害事象の報告は極めて少なく、重篤な有害事象はゼロ。"
    ],
    clinicalTakeaways: [
      "トップアスリートや競技者におけるスポーツ外傷・障害に対し、ドーピングの懸念が一切ない安全かつ即効性の高い非薬物・非侵襲的保存療法として鍼灸が極めて有効。",
      "器質的損傷（半月板・FAI・スポーツヘルニア）の保存的管理から、機能的・心因的運動障害（イップス、脳震盪後）に至るまで、幅広い治療適応スペクトラムを提示。"
    ],
    tags: ["スポーツ鍼灸","アスリート","系統的レビュー","スポーツ外傷","イップス","スポーツヘルニア","半月板損傷","競技復帰","DOMS","FAI"],
    abstract: "This systematic review analyzed 22 clinical case reports/series (211 athletes) utilizing acupuncture for sports injuries. Confirmed acupuncture's efficacy for lateral meniscus rupture, femoroacetabular impingement, sports hernia, yips, and DOMS, achieving high Return-to-Play rates without serious adverse events."
  },
  {
    id: "electroacupuncture-microcurrent-frequency-therapy-mayor-2007",
    title: "Electroacupuncture and Microcurrent Therapy: Clinical Rationales, Modern Modalities, and Biophysical Mechanisms",
    japaneseTitle: "電気鍼（EA）と微弱電流（マイクロカレント/MENS）療法：バイオフィジカル機序、各種臨床機器（Alpha-Stim, Rebox, Liss, FSM）とアルント・シュルツの法則",
    authors: ["David Mayor","Carolyn McMakin","Daniel Kirsch","Saul Liss"],
    journal: "Electroacupuncture: A Practical Manual and Resource (Elsevier / Churchill Livingstone)",
    year: 2007,
    studyDesign: "電気刺激療法・生体物理学総論および臨床機器比較解説 (Comprehensive Biophysical & Clinical Guide)",
    targetCondition: "軟部組織損傷、筋骨格系機能不全、浮腫、難治性神経痛・痙縮、組織修復促進、中枢性疼痛・頭痛",
    interventionProtocol: {
      name: "閾値下マイクロカレント刺激 (MENS) / 周波数特異的微弱電流 (FSM) / 経皮通電",
      acupoints: ["阿是穴/トリガーポイント","経穴ペア（陰陽極対向配置）","頭部電極（CES/Liss）"],
      description: "感覚閾値下の微弱電流（<500µA、主として10〜300µA、パルス幅~500msの単相・二相波）。マクマキン（McMakin）の周波数共鳴プロトコル、Rebox II（3kHz単相微弱電流）、Alpha-Stim（半ランダム変調波）、Liss頭部鎮静器（15kHz/15Hz重畳）などの各種モダリティ。"
    },
    primaryOutcomes: "ATP産生能の増大（500%増）、組織修復・創傷治癒促進、筋痙縮の即時弛緩、浮腫軽減、持続的鎮痛",
    secondaryOutcomes: "細胞内外のイオン平衡（正イオン過剰の是正）、組織コンプライアンス（触診上の組織軟化現象）、アルント・シュルツの法則による至適刺激強度",
    keyFindings: [
      "【アルント・シュルツの法則（Arndt-Schulz Law）の生体適応】：『弱い刺激は生命活動を促進し、中程度の刺激は促進・調整し、強すぎる刺激は阻止・破壊する』。マイクロカレント（MENS）は感覚受容器を興奮させない閾値下電流（<1mA、通常<500µA）により、生体の自己修復機序を最大化する。",
      "【Chengらの記念碑的発見（1982）】：電流強度とATP生成の関係において、50µA〜1000µA（至適500µA）の微弱電流は細胞内ATP産生を【約500%（5倍）】増大させ、アミノ酸輸送とタンパク質合成を活性化させる。しかし、1.5mA〜5mA以上の強刺激電流（通常のTENSや強刺激EA）では逆にATP合成が抑制・破壊される。",
      "【極性とイオン平衡】：組織損傷・炎症部位は陽電荷（H+, K+漏出）が過剰となる。負極プローブ（Rebox II等）の適用によりイオン平衡が是正され、細胞膜電位の再安定化と急性浮腫・攣縮の即時消失がもたらされる。",
      "【主要モダリティの特性】：①Rebox II：3kHz単相パルス（<300µA, 20V max）、インピーダンス変化をモニターし組織浮腫・喘息（4-6Hz振動）を検知。②Alpha-Stim（Kirsch）：2種類の信号を半ランダム変調し慣れ（習慣化）を防止、CES（頭部微弱通電）で不安・不眠・慢性痛を改善。③Liss刺激装置（Saul Liss）：15,000Hz搬送波に15Hzを重畳、セロトニン・βエンドルフィンを分泌促進。④周波数特異的微弱電流（Carolyn McMakin / FSM）：導電性グラファイト手袋を用い、特定病態周波数（炎症、線維化、瘢痕）と特定組織周波数を共鳴させ、術者の指下で劇的な組織軟化（tissue softening）を誘発。",
      "【持続性と適応】：マイクロカレントは通常のTENSや針刺激に比べて効果の持続性（Carryover effect）が長く、特に急性外傷・線維筋痛症・神経損傷・過敏体質の患者に最適。"
    ],
    clinicalTakeaways: [
      "「強い刺激ほど効く」という誤った常識を科学的に覆し、微弱刺激こそが細胞のATPエネルギー産生を5倍に高め組織治癒を根本から促進することを理論化。",
      "過敏患者や急性捻挫・炎症時など、通常の鍼やマッサージで揉み返し・悪化を招きやすい症例に対する最強の低侵襲治療オプション。"
    ],
    tags: ["マイクロカレント","MENS","アルントシュルツの法則","ATP産生","Rebox","Alpha-Stim","FSM","Carolyn McMakin","周波数療法","生体物理学"],
    abstract: "A comprehensive analysis of electroacupuncture, microcurrent electrical neuromuscular stimulation (MENS), and frequency-specific therapies. Highlights the biophysical mechanisms including the Arndt-Schulz law, Cheng's ATP synthesis enhancement up to 500% at microcurrent levels, ionic rebalancing, and clinical instruments like Rebox II, Alpha-Stim, Liss, and McMakin's FSM."
  },
  {
    id: "bibliometric-acupuncture-pain-20-years-lee-2020",
    title: "Bibliometric Analysis of Research Assessing the Use of Acupuncture for Pain Treatment Over the Past 20 Years",
    japaneseTitle: "過去20年間における疼痛に対する鍼治療研究の計量書誌学分析",
    authors: ["In-Seon Lee","Hyangsook Lee","et al."],
    journal: "Journal of Pain Research",
    year: 2020,
    pmid: "32110078",
    pmcid: "PMC7047913",
    doi: "10.2147/JPR.S233267",
    studyDesign: "計量書誌学分析 (Bibliometric Analysis)",
    sampleSize: 4595,
    targetCondition: "疼痛疾患全般 (Pain Management, Chronic Pain)",
    interventionProtocol: {
      name: "鍼治療全般（手技鍼、電気鍼、耳鍼等）の文献群",
      acupoints: ["ST36","LI4","SP6","LR3","GB34","Ashixue"],
      description: "2000年〜2019年にWeb of Scienceに収載された鍼鎮痛に関する全学術論文4,595件の抽出・定量計量分析。"
    },
    primaryOutcomes: "論文出版数推移、国際共同研究ネットワーク、頻出キーワードの時系列共起関係、被引用分析",
    secondaryOutcomes: "主要著者ランキング、主要研究機関ランキング、掲載雑誌インパクトファクター分析",
    keyFindings: [
      "2000年〜2019年の20年間に発表された鍼鎮痛論文4,595本を解析。年平均成長率は10.7%であり、論文数は指数関数的に増加。",
      "初期は米国・ドイツ・英国が主導していたが、近年は中国・韓国の研究シェアが急拡大。上位著者にはLee H（慶熙大）、Lao LX（メリーランド大）、Lee MS（韓国東洋医学研）、Macpherson H（ヨーク大）、Kaptchuk TJ（ハーバード大）らがランクイン。",
      "キーワード共起分析では、初期の「clinical trial」「sham」「RCT」といった有効性検証中心から、近年は「mechanism」「functional connectivity」「neuroimaging」「fMRI」「inflammation」「neuroplasticity」など中枢神経機序・脳科学・分子生物学的解明へとトレンドが明確にシフト。"
    ],
    clinicalTakeaways: [
      "世界の鍼鎮痛研究は「効果があるか否か」の検証段階を通過し、「どのような神経回路・受容体・脳内ネットワークを介して鎮痛が生じるか」の機序解明が主流となっている。",
      "現代の鍼灸臨床家は、経験則だけでなく脳機能画像（fMRI）や神経科学に基づいたエビデンスを理解し、患者へ科学的な説明を行うことが国際的に求められている。"
    ],
    tags: ["Bibliometrics","Pain","Neuroimaging","Mechanism","Global Trends","fMRI"],
    abstract: "2000年から2019年までの20年間にWeb of Scienceに収録された疼痛に対する鍼治療研究4,595本を計量書誌学の手法を用いて包括的に解析。出版傾向、主要著者、研究機関連携、キーワード共起ネットワークを可視化した。その結果、論文数は年平均10.7%で急増しており、米国・欧州主導から中国・韓国主導へとシフトしている実態が判明した。さらに研究テーマは臨床試験の実施から、脳機能画像や分子生物学的手法を用いた鎮痛機序の解明へと大きく深化している。"
  },
  {
    id: "meridian-response-current-electrical-pulse-hung-2020",
    title: "Meridian study on the response current affected by electrical pulse and acupuncture",
    japaneseTitle: "電気パルスと鍼刺激によって作用する応答電流に関する経絡研究",
    authors: ["Chien-Chih Hung","Chien-Hung Chen","Chun-Ping Jen","et al."],
    journal: "Nanoscale Research Letters",
    year: 2020,
    pmid: "32671569",
    pmcid: "PMC7363842",
    doi: "10.1186/s11671-020-03377-5",
    studyDesign: "生体物理学・ナノスケール実験研究 (Biophysical experimental study)",
    sampleSize: 30,
    targetCondition: "経絡・経穴の物理的電気特性（手の陽明大腸経：LI4合谷〜LI11曲池）",
    interventionProtocol: {
      name: "大腸経鍼通電刺激および応答電流測定プロトコル",
      acupoints: ["LI4 (合谷)","LI11 (曲池)"],
      description: "半導体デバイス・アナライザを用い、20〜30歳の健常者30名の合谷-曲池間に直流、パルス波、三角波、正弦波を印加。鍼刺入前後および通電前後の過渡応答電流（ITIC）と電流-電圧（I-V）特性を高精度測定。"
    },
    controlProtocol: {
      name: "非経絡対照部位測定",
      acupoints: ["Non-acupoints (前腕屈側・伸側の非経絡組織)"],
      description: "経絡走行から離れた対照組織に同一電界を印加し、応答電流の違いを比較。"
    },
    primaryOutcomes: "界面過渡応答電流（ITIC: Interfacial Transient Ionic Current）、電流-電圧（I-V）特性、組織インピーダンス",
    keyFindings: [
      "直流電界では応答電流が急速に減衰するが、交流パルス電界下では大腸経絡沿いに顕著な過渡応答電流（ITIC）が持続して観測された。",
      "鍼刺入および鍼通電後、経絡沿いの電気伝導率が著明に上昇。結合組織・ファシア（筋膜）間質液中のイオン（Na+, K+, Ca2+等）のドリフトおよび拡散が促進される。",
      "非経絡部と比較して、経絡ライン上ではイオン流動に対する電気抵抗が有意に低く、生体パルス信号の伝達効率に優れる物理的特性が確認された。"
    ],
    clinicalTakeaways: [
      "「経絡とは何か」という長年の問いに対し、ナノ工学・半導体解析手法を用いて「ファシア（間質結合組織）内のイオン伝導路・低インピーダンス経路」である可能性を実証した。",
      "鍼刺激やパルス通電は、間質組織内のイオン勾配と過渡的イオン流を活性化し、局所から中枢への生体情報伝達を物理的に励起する。"
    ],
    tags: ["Meridian Biophysics","Electrical Properties","Fascia","LI4","LI11","Ionic Current","Nanotechnology"],
    abstract: "経絡の物理的実体を解明するため、健常者30名を対象に半導体デバイス・アナライザを用いて手の陽明大腸経（合谷-曲池間）における過渡応答電流を測定。直流および各種交流パルス電界印加時の電流-電圧特性を解析した。その結果、経絡ライン上では非経絡部に比べ顕著な過渡的イオン電流（ITIC）が励起され、鍼刺激によってファシア間質液中のイオン伝導率が大幅に向上することが判明した。経絡が結合組織内のイオン伝導路として機能していることを示唆する画期的研究。"
  },
  {
    id: "acupuncture-alcohol-dependence-arcuate-nucleus-chang-2019",
    title: "Acupuncture attenuates alcohol dependence through activation of endorphinergic input to the nucleus accumbens from the arcuate nucleus",
    japaneseTitle: "鍼治療は弓状核から側坐核へのエンドルフィン作動性入力の活性化を介してアルコール依存を弱める",
    authors: ["Sun-Mi Chang","Seong Shoon Yoon","et al."],
    journal: "Science Advances",
    year: 2019,
    pmid: "31517050",
    pmcid: "PMC6726462",
    doi: "10.1126/sciadv.aax1342",
    studyDesign: "動物基礎実験・神経回路機能解析 (In vivo rodent study with optogenetics & electrophysiology)",
    targetCondition: "アルコール依存症および身体的離脱症状 (Alcohol dependence & withdrawal tremor/craving)",
    interventionProtocol: {
      name: "神門（HT7）機械的鍼刺激プロトコル (Mechanical Acupuncture)",
      acupoints: ["HT7 (神門)"],
      description: "手少陰心経の原穴であるHT7（神門）に対し、機械的鍼刺激装置を用いて85Hz、振幅1.3mmで20秒間刺激。"
    },
    controlProtocol: {
      name: "尾部非経穴刺激および受容体遮断対照群",
      acupoints: ["Tail non-acupoint"],
      description: "非経穴刺激群、非刺激群、ナロキソン（μオピオイド受容体拮抗薬）投与併用群との比較。"
    },
    primaryOutcomes: "アルコール自己投与量、離脱振戦スコア、側坐核（NAc）局所ドパミン放出量、c-Fos発現",
    secondaryOutcomes: "視床下部弓状核（ARC）から側坐核（NAc）へのβ-エンドルフィン神経投射の電気生理学的興奮性",
    keyFindings: [
      "HT7への85Hz機械的鍼刺激は、末梢Aβ/Aδ感覚求心線維を興奮させ、視床下部弓状核（ARC）のβ-エンドルフィン産生ニューロンを活性化。",
      "弓状核から側坐核（NAc）シェル部へ投射するエンドルフィン神経が刺激され、NAc局所のGABA介在ニューロンを抑制（脱抑制）することにより、アルコール離脱で枯渇したドパミン放出を正常レベルに回復。",
      "これによりアルコール自己投与（飲酒欲求行動）および身体的離脱症状（振戦）が劇的に抑制された。非経穴刺激では無効であり、ナロキソン投与で鍼の効果は完全に消失した。"
    ],
    clinicalTakeaways: [
      "手少陰心経の原穴「神門（HT7）」が精神依存や薬物・アルコール離脱症状の緩和に奏功する詳細な神経回路メカニズム（ARC-NAcエンドルフィン・ドパミン経路）が世界最高峰の学術誌Science Advancesで解明された。",
      "不安・衝動・依存症に対する臨床施術において、HT7に対する適切な機械的・持続的刺激（雀啄や適度な周波数の刺激）の極めて高い妥当性を支持する。"
    ],
    tags: ["Alcohol Dependence","Addiction","HT7","Nucleus Accumbens","Arcuate Nucleus","Endorphin","Dopamine","Science Advances"],
    abstract: "アルコール依存症に対する鍼治療の神経生物学的機序を解明するため、慢性アルコール摂取ラットモデルを用い、HT7（神門）への機械的鍼刺激が報酬系神経回路に与える影響を検証。HT7刺激は視床下部弓状核（ARC）のβ-エンドルフィンニューロンを活性化し、側坐核（NAc）への投射を介して局所ドパミン放出を回復させ、アルコール探索行動と離脱振戦を有意に抑制した。心経経穴による精神・依存症治療の科学的基盤を実証。"
  },
  {
    id: "migraine-acupuncture-bloodletting-carbamazepine-sun-2020",
    title: "Observation on the effect difference in migraine treated with the combination of acupuncture and blood-letting therapy and medication with carbamazepine",
    japaneseTitle: "鍼治療と刺絡療法の併用、カルバマゼピン投薬による片頭痛に対する効果の違いに関する観察",
    authors: ["Pei Sun","Ying Li","et al."],
    journal: "World Journal of Acupuncture - Moxibustion",
    year: 2020,
    doi: "10.1016/j.wjam.2020.10.005",
    studyDesign: "ランダム化比較試験 (Randomized Controlled Trial: RCT)",
    sampleSize: 90,
    targetCondition: "片頭痛 (Migraine)",
    interventionProtocol: {
      name: "鍼治療＋大椎穴刺絡抜罐併用療法",
      acupoints: ["GV14 (大椎)","GB20 (風池)","GB8 (率谷)","LR3 (太衝)","LI4 (合谷)","Ashixue"],
      description: "通常の頭部・四肢経穴への鍼治療（置針30分、週3回）に加え、大椎穴（GV14）に三稜針で速刺点刺（3〜5箇所）し、ガラス吸玉を吸着させて約2〜5mL瀉血する刺絡抜罐法を週1回併用。4週間実施。"
    },
    controlProtocol: {
      name: "カルバマゼピン経口投与群",
      acupoints: [],
      description: "カルバマゼピン100mg/回、1日2回から開始し、症状に応じて最大200mg/回、1日3回まで漸増投与を4週間継続。"
    },
    primaryOutcomes: "臨床総有効率、頭痛発作頻度（回/月）、発作持続時間（時間/回）、VAS疼痛スコア",
    secondaryOutcomes: "有害事象発現率（傾眠、めまい、ふらつき、胃腸障害等）",
    keyFindings: [
      "治療4週後の臨床総有効率は、鍼刺絡併用群が93.3%（42/45例）であり、カルバマゼピン群の75.6%（34/45例）に比べ有意に高値（P < 0.05）。",
      "頭痛発作頻度、発作持続時間、VASスコアのいずれの指標においても、鍼刺絡併用群がカルバマゼピン群より有意に優れた改善を示した。",
      "有害事象発生率は鍼刺絡群が2.2%（皮下出血1例）に対し、薬物群は22.2%（眠気、めまい、ふらつき等10例）と有意に低く安全性が高かった（P < 0.01）。"
    ],
    clinicalTakeaways: [
      "片頭痛における鬱熱・瘀血に対し、大椎穴（GV14）への刺絡抜罐法（瀉血）は頭頸部の熱邪と血行障害を強力に清解し、抗てんかん薬単独療法を凌駕する鎮痛効果と極めて高い安全性をもたらす。",
      "薬物の眠気や副作用で内服継続が困難な片頭痛患者にとって、刺絡抜罐と鍼の併用は極めて有望な治療選択肢となる。"
    ],
    tags: ["Migraine","Bloodletting","Cupping","GV14","Dazhui","Carbamazepine","Headache","RCT"],
    abstract: "片頭痛患者90名を対象に、鍼治療＋大椎穴刺絡抜罐併用群（45名）とカルバマゼピン内服群（45名）に無作為割付けし4週間介入。総有効率は併用群93.3%、薬物群75.6%であり、併用群で頭痛頻度・持続時間・VASスコアが有意に大きく改善。副作用発生率も薬物群22.2%に対し鍼刺絡群2.2%と極めて安全性が高かった。"
  },
  {
    id: "perimenopausal-insomnia-electroacupuncture-li-2020",
    title: "Electroacupuncture for Perimenopausal Insomnia: A Randomized Controlled Trial",
    japaneseTitle: "更年期不眠症に対する鍼通電療法：ランダム化比較試験",
    authors: ["Shao-jie Li","et al."],
    journal: "Nature and Science of Sleep",
    year: 2020,
    pmid: "33244274",
    pmcid: "PMC7680076",
    doi: "10.2147/NSS.S274488",
    studyDesign: "二重盲検シャム対照ランダム化比較試験 (Double-blind sham-controlled RCT)",
    sampleSize: 84,
    targetCondition: "更年期不眠症 (Perimenopausal Insomnia: PMI)",
    interventionProtocol: {
      name: "百会・印堂・三陰交等の低周波鍼通電療法 (Active EA)",
      acupoints: ["GV20 (百会)","GV28 (齦交)","SP6 (三陰交)","HT7 (神門)","KI3 (太渓)"],
      description: "百会-齦交（または印堂）間に2.5Hz連続波で30分間通電。両側三陰交・神門・太渓に手技刺鍼。週3回×8週間（計24回）。追跡20週。"
    },
    controlProtocol: {
      name: "Streitbergerプラセボ非刺入偽鍼通電群 (Sham EA)",
      acupoints: ["Non-acupoints"],
      description: "非経穴部位にStreitbergerプラセボ鍼を設置。皮膚穿通せず、通電音のみで電流を流さないシャム通電を同一スケジュールで実施。"
    },
    primaryOutcomes: "PSQI（ピッツバーグ睡眠質問票スコア）、アクチグラフィ客観的睡眠指標（睡眠効率SE、総睡眠時間TST、中途覚醒時間WASO、入眠潜時SOL）",
    secondaryOutcomes: "MENQOL（更年期特異的QOL尺度スコア）、HAM-A（ハミルトン不安尺度）、血清E2、FSH",
    keyFindings: [
      "治療8週時点および追跡20週時点において、実鍼通電群はシャム群と比較してPSQIスコアが有意に低下（P < 0.001）。",
      "アクチグラフィ客観的評価でも、実鍼通電群で睡眠効率の有意な上昇、中途覚醒時間の短縮、総睡眠時間の延長が確認され、効果は治療終了後20週間安定して持続。",
      "MENQOLの血管運動神経症状スコア（ホットフラッシュ・のぼせ）および不安スコアも実鍼群で有意に改善。重篤な有害事象は皆無であった。"
    ],
    clinicalTakeaways: [
      "更年期特有の不眠症および自律神経血管運動症状に対し、百会や三陰交を中心とした低周波鍼通電療法（2.5Hz）はシャム偽鍼を明確に上回る持続的効果を発揮する。",
      "ホルモン補充療法（HRT）や睡眠薬の長期服用に抵抗がある更年期女性に対する第一選択の非薬物療法として極めて高いエビデンスを有する。"
    ],
    tags: ["Perimenopausal Insomnia","Electroacupuncture","GV20","SP6","Actigraphy","PSQI","Hot Flashes","RCT"],
    abstract: "更年期不眠症（PMI）女性84名を対象に、実鍼通電群（百会-齦交 2.5Hz）とStreitberger偽鍼通電群に無作為割付けし8週間介入・20週間追跡。主観的PSQIスコアおよびアクチグラフィによる客観的睡眠効率・中途覚醒時間が実鍼群で有意に改善し、血管運動症状（ホットフラッシュ）も軽減。効果は治療終了後20週持続した。"
  },
  {
    id: "substance-p-neurogenic-spots-acupuncture-hypertension-fan-2021",
    title: "The role of substance P in acupuncture signal transduction and effects",
    japaneseTitle: "鍼治療のシグナル伝達と降圧効果におけるサブスタンスPの役割",
    authors: ["Ying Fan","Dong-Hyun Kim","et al."],
    journal: "Brain, Behavior, and Immunity",
    year: 2021,
    pmid: "33421528",
    doi: "10.1016/j.bbi.2021.01.007",
    studyDesign: "動物基礎実験・神経電気生理学・免疫組織化学研究 (Experimental neurobiology & single-fiber recording)",
    targetCondition: "高血圧症および経穴局所シグナル伝達 (Hypertension & Acupoint Neurogenic Spots)",
    interventionProtocol: {
      name: "内関（PC6）等神経原性炎症スポット（Neuro-Sps）鍼刺激プロトコル",
      acupoints: ["PC6 (内関)","HT7 (神門)","LR2 (行間)","LR3 (太衝)","BL65 (束骨)","BL66 (足通谷)"],
      description: "拘束ストレス誘発高血圧ラットの前肢・後肢経穴に出現した神経原性炎症スポット（Neuro-Sps：エバンスブルー漏出点）に対し、2分間の手技鍼刺激を実施。"
    },
    controlProtocol: {
      name: "非スポット部位刺激、サブスタンスP受容体（NK1R）拮抗薬投与対照",
      acupoints: ["Non-Neuro-Sp points"],
      description: "非経穴部位刺激、およびNK1R拮抗薬（L-732,138）投与下での鍼刺激。"
    },
    primaryOutcomes: "血圧（収縮期・拡張期）、延髄吻側腹外側野（rVLM）ニューロン発火頻度、単一神経線維（A線維・C線維）求心性放電、組織内SP発現量",
    keyFindings: [
      "高血圧の発症に伴い、1〜15分以内に内関（PC6）や神門（HT7）等の経穴部位に神経原性炎症スポット（Neuro-Sps）が出現し、組織内サブスタンスP（SP）濃度が急上昇。",
      "Neuro-Spsへの鍼刺激は、一次感覚神経（A線維・C線維）を感作・興奮させ、心血管中枢である延髄吻側腹外側野（rVLM）ニューロン放電を約130%増加させ、高血圧の発症を有意に抑制。",
      "Neuro-Spsへの外因性SP皮下注射でも鍼と同様の降圧効果が再現され、逆にNK1R拮抗薬投与やSP枯渇下では鍼の血圧降下作用が完全に消失した。"
    ],
    clinicalTakeaways: [
      "サブスタンスPは単なる発痛物質ではなく、病的状態下で経穴に神経原性炎症を起こして感覚神経を感作し、鍼刺激シグナルを中枢自律神経核（rVLM）へ伝達するための必須メディエーターである。",
      "未病状態や内臓疾患発症に伴って経穴部に出現する圧痛や皮膚微小変化（Neuro-Sps）への鍼刺激が、なぜ強力な中枢性自律神経調整効果を生むのかを解明した。"
    ],
    tags: ["Substance P","Neurogenic Inflammation","PC6","HT7","Hypertension","rVLM","Autonomic Nervous System","Brain Behav Immun"],
    abstract: "高血圧ラットモデルを用い、経穴におけるサブスタンスP（SP）のシグナル伝達機能を解明。高血圧発症に伴いPC6（内関）等に神経原性炎症スポットが出現しSP放出が増加。この部位への刺鍼が感覚神経を感作して延髄吻側腹外側野（rVLM）へシグナルを送り血圧を抑制した。SPが鍼の自律神経調整効果に不可欠な役割を果たすことを証明。"
  },
  {
    id: "acupuncture-adverse-events-japan-case-series-tatebe-2021",
    title: "Critical Review of Recent Acupuncture-Related Adverse Event Case Reports in Japan: Retained Broken Needles, Organ Migration, and Bilateral Pneumothorax",
    japaneseTitle: "国内で報告された鍼灸有害事象4症例の臨床的検証：埋没鍼・体内移動・両側性気胸と安全管理基準",
    authors: ["Yoji Tatebe (建部陽嗣)"],
    journal: "新・鍼灸ワールドコラム (Reviewing Acute Med Surg, Asian J Urol, Surg Case Rep, BMJ Case Rep)",
    year: 2021,
    studyDesign: "有害事象症例集積・安全性レビュー (Safety Case Series Review)",
    sampleSize: 4,
    targetCondition: "鍼灸施術による有害事象・医療事故（埋没鍼残留、鍼折損・体内迷入、両側気胸）",
    interventionProtocol: {
      name: "有害事象4症例の分析および鍼灸安全管理ガイドライン",
      acupoints: ["LI4 (合谷)","LI10 (手三里)","BL23 (腎兪)","BL54 (秩辺)","GB30 (環跳)","肩甲骨上角部 (肩井・巨骨周辺)"],
      description: "①89歳男性：約50年前の腕への埋没鍼が外傷精査のX線で多数発見（Acute Med Surg 2020）。②74歳男性：腰痛治療目的の埋没鍼が20年を経て後腹膜から尿管に迷入し尿管結石・水腎症を惹起（Asian J Urol 2021）。③30歳代男性アスリート：殿筋刺鍼中に体動で寸6-3番鍼が折損、深部殿筋から骨盤腔内（大坐骨孔）へ迷入し全身麻酔下手術で摘出（Surg Case Rep 2021）。④33歳女性医師：頸肩コリに対し肩甲骨上角部に8番2寸（60mm）鍼を深刺され両側性気胸を発症（BMJ Case Rep 2021）。"
    },
    primaryOutcomes: "有害事象の発生機序、診断プロセス、外科的処置、再発防止策",
    keyFindings: [
      "埋没鍼は数十年の無症候期を経て体内を遊走し、尿管結石、血管損傷、神経麻痺などの重篤な晩期合併症を引き起こす危険性がある。",
      "筋緊張の強いアスリートへの殿部刺鍼時、体動や筋の急激な痙攣性収縮により鍼柄と鍼根の接合部で折針事故が発生し、筋肉の運動に伴って骨盤腔深部へ迷入するリスクが実証された。",
      "肩甲上部（僧帽筋・肩甲挙筋部）への60mm（2寸）鍼の深刺は、肺尖部を容易に貫通し両側気胸をもたらす。医療従事者患者であっても初発症状を施術後の好転反応と誤認して受診が遅れる危険がある。"
    ],
    clinicalTakeaways: [
      "現代の鍼灸臨床において永久埋没鍼は原則禁忌とすべきであり、毫針施術時は必ず鍼根を2〜5mm残して刺入し、患者に体動を厳禁する指導を徹底する。",
      "頸肩部（特に肩甲骨内上角・鎖骨上窩・背部兪穴）への刺鍼では、解剖学的深度（胸膜頂まで15〜20mm）を熟知し、寸3（40mm）以下の短い鍼を用い、斜刺または横刺を厳守する。"
    ],
    tags: ["Safety","Adverse Events","Pneumothorax","Broken Needle","Retained Needle","Anatomy","Clinical Guidelines"],
    abstract: "日本国内の医師らによって国際学術誌に相次いで報告された鍼灸関連事故4症例（約50年前の腕部埋没鍼、20年後に尿管結石を来した埋没鍼、アスリートの殿部で折針し骨盤腔へ迷入した症例、60mm長針の深刺により両側性気胸を発症した女性医師症例）を分析。解剖学的安全深度の遵守、埋没鍼の禁止、折針防止の安全基準を提言。"
  },
  {
    id: "cancer-pain-electroacupuncture-auricular-peace-trial-mao-2021",
    title: "Acupuncture vs Battlefield Auricular Acupuncture vs Usual Care for Chronic Musculoskeletal Pain in Cancer Survivors: A Randomized Clinical Trial (PEACE)",
    japaneseTitle: "がんサバイバーの慢性筋骨格系疼痛に対する鍼通電療法 vs 戦場耳鍼療法 vs 通常ケア：ランダム化比較試験（PEACE試験）",
    authors: ["Jun J. Mao","Katherine S. Panageas","et al."],
    journal: "JAMA Oncology",
    year: 2021,
    pmid: "33734288",
    pmcid: "PMC7974868",
    doi: "10.1001/jamaoncol.2021.0310",
    studyDesign: "多施設共同ランダム化比較試験 (Multi-center 3-arm RCT - PEACE Trial)",
    sampleSize: 360,
    targetCondition: "がんサバイバーの慢性筋骨格系疼痛 (Chronic Musculoskeletal Pain in Cancer Survivors)",
    interventionProtocol: {
      name: "個別化鍼通電療法（EA群）および戦場耳鍼療法（BFA群）",
      acupoints: ["局所穴4穴 (膝・腰・肩等)","全身穴 (ST36, SP6, LI4, PC6, LR3, KI3)","耳介5点 (Cingulate gyrus, Thalamus, Shen Men, Point Zero, Omega 2)"],
      description: "EA群：主訴部位に応じた経穴4穴＋全身調整穴に刺鍼し2Hz通電を30分間（週1回×10週）。BFA群：ASP金針を用い両耳介の5点に皮内留置（週1回×10週）。"
    },
    controlProtocol: {
      name: "通常ケア群 (Usual Care)",
      acupoints: [],
      description: "通常の標準的鎮痛薬管理および理学療法を10週間継続。"
    },
    primaryOutcomes: "BPI（簡易疼痛質問票）最悪疼痛強度スコアのベースラインから10週時点での変化量",
    secondaryOutcomes: "身体機能障害（BPI interference）、オピオイド使用量、生活の質（PROMIS QOL）、有害事象",
    keyFindings: [
      "10週時点において、最悪疼痛スコアの低下幅は通常ケア群（-0.11点）に対し、鍼通電群（EA）で-2.01点（P < 0.001）、耳鍼群（BFA）で-1.57点（P < 0.001）と両群とも有意に優れた鎮痛効果を達成。",
      "鍼通電群は耳鍼群に比べて疼痛緩和の持続性と身体機能改善度（日常活動の支障度）がより高く、ASP針による耳介痛や脱落率もEA群の方が有意に低かった（良好な忍容性）。",
      "鎮痛効果は介入終了後24週時点（治療終了後3ヶ月半以上）まで持続した。"
    ],
    clinicalTakeaways: [
      "がんサバイバーの難治性慢性痛に対し、鍼通電療法および戦場耳鍼療法（BFA）はオピオイドに頼らない安全かつ極めて有効な標準的非薬物療法としてJAMA Oncologyで確立された。",
      "持続的で全身的な機能改善を狙う場合は体幹部鍼通電（EA）が第一選択となり、即時性や施術の簡便性を要する現場では耳鍼（BFA）が有用な補完手段となる。"
    ],
    tags: ["Cancer Pain","PEACE Trial","Electroacupuncture","Battlefield Acupuncture","Auricular Acupuncture","JAMA Oncology","RCT"],
    abstract: "がんサバイバーの慢性筋骨格系疼痛患者360名を対象に、個別化鍼通電群（EA：145名）、戦場耳鍼療法群（BFA：143名）、通常ケア群（72名）に無作為割付けし10週間介入・24週間追跡。EA群およびBFA群は通常ケア群に比べBPI最悪疼痛スコアを有意に軽減し、効果は24週まで持続。EA群はBFA群よりも持続性と忍容性に優れていた。"
  },
  {
    id: "chronic-low-back-pain-ankle-acupuncture-fmri-xiang-2021",
    title: "Frequency-Specific Blood Oxygen Level Dependent Oscillations Associated With Pain Relief From Ankle Acupuncture in Patients With Chronic Low Back Pain",
    japaneseTitle: "慢性腰痛患者における足関節部浅刺鍼の鎮痛効果と関連する周波数特異的BOLD信号振動：安静時fMRI研究",
    authors: ["Anren Xiang","Min Chen","et al."],
    journal: "Frontiers in Neuroscience",
    year: 2021,
    pmid: "35002604",
    pmcid: "PMC8733221",
    doi: "10.3389/fnins.2021.758872",
    studyDesign: "シャム対照無作為化クロスオーバー安静時fMRI研究 (Sham-controlled rs-fMRI study)",
    sampleSize: 40,
    targetCondition: "慢性腰痛 (Chronic Low Back Pain: CLBP)",
    interventionProtocol: {
      name: "足関節部浅刺鍼（踝鍼法：Ankle Acupuncture without Deqi）",
      acupoints: ["Lower 5 / Lower 6 (外果上方3横指・アキレス腱外側縁/内側縁の足関節浅刺点)"],
      description: "ステンレス鍼（0.25×40mm）を用い、皮膚表面に対し約30度で刺入後、水平に倒して皮下筋膜表層へ沿わせて30〜35mm進針。得気（ひびき）を一切生じさせない浅刺手技で30分間置針。"
    },
    controlProtocol: {
      name: "皮膚接触プラセボ偽鍼群 (Streitberger Contact Sham)",
      acupoints: ["同一足関節部位"],
      description: "皮膚を貫通せず先端が引っ込むStreitberger偽鍼を用い、刺入感のみを与えて置針。"
    },
    primaryOutcomes: "安静時fMRIにおける周波数特異的低周波振幅（ALFF: slow-4 [0.027-0.073 Hz] および slow-5 [0.010-0.027 Hz]）、VAS腰痛スコア",
    secondaryOutcomes: "疼痛閾値（PPT）、デフォルト・モード・ネットワーク（DMN）および島皮質・小脳の機能的結合性",
    keyFindings: [
      "足関節部への浅刺鍼（得気なし）により、VAS腰痛スコアがシャム偽鍼群と比較して有意に低下（即時鎮痛効果）。",
      "安静時fMRI解析により、浅刺鍼は後帯状皮質（PCC/プレクネウス：DMNの要）、前帯状皮質（ACC）、島皮質、小脳においてslow-4およびslow-5帯域のALFF振動を有意に再同期・調節。",
      "これらの脳内ネットワーク振動の変化量は、臨床的な腰痛緩和度と統計学的に有意に相関していた。"
    ],
    clinicalTakeaways: [
      "「得気（ひびき）」を伴わない皮下浅刺手技であっても、脳内疼痛ネットワーク（DMN、島皮質、小脳）の低周波神経振動を再構築し、確実な中枢性鎮痛をもたらすことがfMRIで証明された。",
      "強い刺激や得気が苦手な過敏患者や高齢者に対しても、足関節部等の浅刺鍼（踝鍼療法）が科学的根拠に基づいた有効な鎮痛選択肢となる。"
    ],
    tags: ["Chronic Low Back Pain","Ankle Acupuncture","fMRI","ALFF","Default Mode Network","Insula","Shallow Needling","Front Neurosci"],
    abstract: "慢性腰痛患者40名を対象に、足関節部浅刺鍼（踝鍼：得気なし）とStreitberger偽鍼の鎮痛効果および脳活動への影響を安静時fMRI（BOLD振動周波数帯域slow-4/slow-5解析）で検証。浅刺鍼は偽鍼に比べ有意な即時腰痛緩和をもたらし、後帯状皮質（DMN）、島皮質、小脳の周波数特異的ALFF振動を調節した。ひびきを伴わない浅刺手技の中枢鎮痛機序を証明。"
  },
  {
    id: "fgid-emotional-symptoms-acupuncture-meta-analysis-wang-2022",
    title: "Acupuncture for emotional symptoms in patients with functional gastrointestinal disorders: A systematic review and meta-analysis",
    japaneseTitle: "機能性消化管疾患患者の情動症状（不安・うつ）に対する鍼治療：システマティックレビューとメタアナリシス",
    authors: ["Lu Wang","Jie Xian","et al."],
    journal: "PLOS ONE",
    year: 2022,
    pmid: "35089947",
    pmcid: "PMC8797241",
    doi: "10.1371/journal.pone.0263166",
    studyDesign: "システマティックレビューおよびメタアナリシス (Systematic Review & Meta-Analysis)",
    sampleSize: 2151,
    targetCondition: "機能性消化管疾患（FGID: 過敏性腸症候群IBS、機能性ディスペプシアFD）に伴う不安およびうつ症状",
    interventionProtocol: {
      name: "脳腸相関をターゲットとした経穴配穴プロトコル",
      acupoints: ["GV20 (百会)","EX-HN3 (印堂)","ST36 (足三里)","LR3 (太衝)","PC6 (内関)","SP6 (三陰交)","CV12 (中脘)","ST25 (天枢)"],
      description: "頭部鎮静穴（百会・印堂）と胃腸局所・遠隔穴（足三里・中脘・太衝）を組み合わせた手技鍼または鍼通電治療。"
    },
    controlProtocol: {
      name: "シャム鍼、通常薬物療法、無治療対照群",
      acupoints: ["Non-acupoints / Medication controls"],
      description: "プラセボ偽鍼または第一線消化器薬・向精神薬治療との比較。"
    },
    primaryOutcomes: "ハミルトン不安尺度（HAMA）、ハミルトンうつ尺度（HAMD）、自己評価不安尺度（SAS）、自己評価うつ尺度（SDS）",
    secondaryOutcomes: "消化器症状重症度（IBS-SSS等）、生活の質（QOL）、有害事象",
    keyFindings: [
      "鍼治療は、シャム偽鍼や西洋医学的薬物療法と比較して、FGID患者の不安スコアおよびうつスコアを有意に改善（SMD -0.74, P < 0.001）。",
      "サブグループ解析において、頭部経穴（百会GV20、印堂EX-HN3）を胃腸経穴（足三里ST36、中脘CV12、太衝LR3）と併用したプロトコルが最も高い抗不安・抗うつ効果を発揮。",
      "消化器症状の改善度と情動症状の改善度には強い正の相関が認められ、重大な有害事象は報告されなかった。"
    ],
    clinicalTakeaways: [
      "「脳腸相関（Gut-Brain Axis）」に基づく胃腸障害とメンタル不調の悪循環に対し、頭部鎮静穴と腹部・四肢穴の併用鍼治療は、向精神薬の副作用なしに心身両面を同時に寛解させる至適介入である。",
      "過敏性腸症候群や機能性ディスペプシアの臨床では、消化器局所のみならず百会・印堂・太衝を加えた全人的アプローチが不可欠。"
    ],
    tags: ["Gut-Brain Axis","FGID","IBS","Functional Dyspepsia","Anxiety","Depression","Meta-Analysis","PLOS ONE"],
    abstract: "機能性消化管疾患（FGID）患者の不安・うつ症状に対する鍼治療の効果を検証した24件のRCT（計2,151名）をメタアナリシス。鍼治療群は対照群（薬物療法や偽鍼）に比べ不安およびうつスコアを有意に改善（SMD -0.74）。特に百会や印堂などの頭部穴と足三里などの消化器穴を併用したプロトコルで顕著な改善を認め、脳腸相関に基づく鍼治療の有効性を立証。"
  },
  {
    id: "acute-stroke-rehab-acupuncture-xingnao-fu-2022",
    title: "Effect of Acupuncture and Rehabilitation Therapy on the Recovery of Neurological Function and Prognosis in Patients with Acute Stroke",
    japaneseTitle: "急性期脳卒中患者の神経機能回復および予後に対する鍼治療とリハビリテーション併用療法の効果",
    authors: ["Chunling Fu","et al."],
    journal: "Computational and Mathematical Methods in Medicine",
    year: 2022,
    pmid: "35251241",
    pmcid: "PMC8894101",
    doi: "10.1155/2022/6890352",
    studyDesign: "臨床前向き対照観察研究 (Clinical prospective controlled observational study)",
    sampleSize: 100,
    targetCondition: "急性期脳卒中（脳梗塞・脳出血急性期）",
    interventionProtocol: {
      name: "醒脳開竅法鍼治療＋標準リハビリテーション併用プロトコル",
      acupoints: ["PC6 (内関)","GV26 (水溝)","SP6 (三陰交)","LU5 (尺沢)","BL40 (委中)","HT1 (極泉)"],
      description: "発症早期の急性期脳卒中患者に対し、早期運動療法・ADL訓練リハビリに加え、醒脳開竅法に基づく刺鍼（内関・水溝への瀉法、三陰交・尺沢への補法・雀啄刺激）を1日1回、4週間実施。"
    },
    controlProtocol: {
      name: "標準リハビリテーション単独群",
      acupoints: [],
      description: "急性期標準リハビリテーション療法のみを4週間実施。"
    },
    primaryOutcomes: "NIHSS（米国国立衛生研究所脳卒中スケール：神経脱落症状）、BI（バーセル指数：ADL日常生活動作能）",
    secondaryOutcomes: "血清ストレスホルモン・神経ペプチド指標（コルチゾール Cortisol、神経ペプチドY NPY、副腎皮質刺激ホルモン ACTH）",
    keyFindings: [
      "治療4週後、併用群のNIHSSスコアは単独群に比べ有意に低値を示し（神経機能回復の促進）、バーセル指数（BI）は有意に高値を示した（ADL自立度の向上、P < 0.01）。",
      "併用群では過剰な血清コルチゾールおよびACTHの上昇が有意に抑制され、脳保護作用を持つ神経ペプチドY（NPY）の発現が有意に保持・向上していた。",
      "合併症（肩手症候群や廃用性筋萎縮）の発生率も併用群で有意に抑制された。"
    ],
    clinicalTakeaways: [
      "急性期脳卒中において、早期リハビリテーションに醒脳開竅鍼法を併用することで、HPA系の急性ストレス過剰反応を鎮静し、神経機能障害の回復を有意に加速させる。",
      "早期からの積極的な鍼介入が、長期的な要介護リスクと廃用症候群を低減させる重要な臨床エビデンスとなる。"
    ],
    tags: ["Acute Stroke","Rehabilitation","Xingnao Kaiqiao","NIHSS","Barthel Index","Cortisol","Neuropeptide Y"],
    abstract: "急性期脳卒中患者100名を対象に、標準リハビリ＋醒脳開竅法鍼治療群（50名）とリハビリ単独群（50名）に割り付け4週間介入。併用群は単独群に比べNIHSSスコアが有意に低下し、バーセル指数が大幅に上昇。さらに過剰な血清コルチゾール・ACTH分泌を抑制し神経ペプチドY（NPY）を保護した。急性期からの鍼併用が神経機能回復と予後を大きく改善することを証明。"
  },
  {
    id: "depression-insomnia-electroacupuncture-rct-yin-2022",
    title: "Effect of Electroacupuncture on Insomnia in Patients With Depression: A Randomized Clinical Trial",
    japaneseTitle: "うつ病患者の不眠症に対する鍼通電療法の効果：多施設共同ランダム化比較試験",
    authors: ["Xuan Yin","et al."],
    journal: "JAMA Network Open",
    year: 2022,
    pmid: "35797047",
    pmcid: "PMC9264078",
    doi: "10.1001/jamanetworkopen.2022.20563",
    studyDesign: "多施設共同3群ランダム化比較試験 (Multicenter 3-arm RCT)",
    sampleSize: 247,
    targetCondition: "うつ病に併発した不眠症 (Comorbid Insomnia in Major Depressive Disorder)",
    interventionProtocol: {
      name: "百会・印堂・神門等の低周波鍼通電療法 (Active EA)",
      acupoints: ["GV20 (百会)","EX-HN3 (印堂)","HT7 (神門)","SP6 (三陰交)","PC6 (内関)","LR3 (太衝)"],
      description: "百会と印堂、両側神門と三陰交に刺入し、百会-印堂間に30Hz（連続波、耐受強度）の鍼通電を実施。30分/回、週3回×8週間（計24回）。32週まで追跡。"
    },
    controlProtocol: {
      name: "Streitbergerプラセボ偽鍼通電群 (Sham EA) および標準通常ケア群 (Control)",
      acupoints: ["Non-acupoints"],
      description: "Sham EA群：非経穴にStreitbergerプラセボ鍼を設置し通電音のみで無通電。Control群：標準的抗うつ薬治療を継続。"
    },
    primaryOutcomes: "8週時点でのISI（不眠重症度指数 Insomnia Severity Index）スコアの変化量",
    secondaryOutcomes: "PSQI、HAMD-17（ハミルトンうつ病評価尺度）、総睡眠時間・睡眠効率（アクチグラフィ）、32週時点での再発率",
    keyFindings: [
      "8週時点において、ISIスコアのベースラインからの低下幅は、Active EA群（-9.8点）がSham EA群（-6.1点）およびControl群（-3.6点）に対して統計学的に有意に優れていた（P < 0.001）。",
      "睡眠効率の上昇、入眠潜時の短縮、覚醒時間の減少に加え、HAMD-17で評価したうつ症状自体もActive EA群で最も大きく改善した。",
      "この優れた不眠・抗うつ改善効果は、介入終了後24週（試験開始32週後）の長期フォローアップまで安定して維持された。"
    ],
    clinicalTakeaways: [
      "抗うつ薬治療抵抗性や自殺リスク・難治化の主因となる「うつ病患者の不眠症状」に対し、百会-印堂を中心とした30Hz鍼通電療法がシャム偽鍼および通常医療を有意に凌駕することをJAMA Network Openで証明。",
      "精神科・心療内科との医療連携において、抗うつ薬増量に頼らず安全に睡眠障害とうつ病病態を同時寛解させる確固たるエビデンス。"
    ],
    tags: ["Depression","Insomnia","Electroacupuncture","GV20","EX-HN3","ISI","JAMA Network Open","RCT"],
    abstract: "うつ病に伴う不眠症患者247名を対象に、実鍼通電群（百会-印堂 30Hz：82名）、シャム通電群（82名）、通常ケア群（83名）に無作為割付けし8週間介入・32週間追跡。主要アウトカムであるISIスコアは実鍼通電群で-9.8点低下し、シャム群（-6.1点）および通常ケア群（-3.6点）を有意に上回る改善を達成。睡眠効率とうつ重症度も著明に改善し、効果は32週まで持続した。"
  },
  {
    id: "chronic-neck-shoulder-pain-pain-catastrophizing-fmri-hui-2022",
    title: "Acupuncture Modulates the Functional Connectivity of Periaqueductal Gray and Ameliorates Pain Catastrophizing in Chronic Shoulder and Neck Pain",
    japaneseTitle: "鍼治療は中脳水道周囲灰白質（PAG）の機能的結合性を調節し慢性頸肩部痛における痛みの破局的思考を改善する：fMRI研究",
    authors: ["Zheng-jie Hui","et al."],
    journal: "Frontiers in Neuroscience",
    year: 2022,
    pmid: "35400994",
    pmcid: "PMC8981480",
    doi: "10.3389/fnins.2022.862413",
    studyDesign: "前向き安静時fMRI・臨床介入研究 (Prospective clinical rs-fMRI study)",
    sampleSize: 30,
    targetCondition: "慢性頸肩部痛（肩こり）および痛みの破局的思考 (Pain Catastrophizing in Chronic Neck/Shoulder Pain)",
    interventionProtocol: {
      name: "得気感覚を伴う頸肩部・遠隔部鍼治療プロトコル",
      acupoints: ["GB20 (風池)","BL10 (天柱)","GB21 (肩井)","SI3 (後渓)","LU7 (列欠)","BL62 (申脈)","Jingtong (頸痛穴)","Jiantong (肩痛穴)"],
      description: "各経穴に20〜30mm刺入し、十分な得気感覚（酸・麻・重・脹感）を得た上で雀啄・捻転手技を行い30分間置針。週5回×4週間（計20回）。"
    },
    controlProtocol: {
      name: "健常対照群とのベースライン脳機能結合比較",
      acupoints: [],
      description: "年齢・性別をマッチさせた健常ボランティアとのfMRI脳機能結合比較。"
    },
    primaryOutcomes: "中脳水道周囲灰白質（PAG）と後部島皮質（posterior insula）間の安静時機能的結合性（rs-FC）、PCS（痛みの破局的思考尺度スコア）",
    secondaryOutcomes: "NRS疼痛スコア、NPQ/NDI頸部機能障害スコア、HAMA不安スコア、HAMDうつスコア",
    keyFindings: [
      "慢性頸肩部痛患者では健常者に比べ、下行性疼痛抑制系のハブであるPAGと後部島皮質との機能的結合性が著しく低下していた。",
      "4週間の鍼治療により、NRS疼痛スコア、PCS破局的思考スコア、NPQ/NDI機能障害スコア、HAMA/HAMD気分スコアが著明に改善。",
      "治療後、PAGと後部島皮質間の機能的結合性が健常者と同等レベルまで回復・強化され、この神経結合性の回復度が破局的思考（PCS）の改善度と統計学的に有意に正相関した。"
    ],
    clinicalTakeaways: [
      "肩こり（慢性頸肩部痛）に対する鍼治療は、単なる局所筋血流改善やトリガーポイント弛緩にとどまらず、PAG-島皮質ネットワークを修復して「痛みの恐怖・破局的思考（Catastrophizing）」という中枢感作・情動ループを根本から断ち切る。",
      "得気（Deqi）を伴う適切な刺鍼が、慢性痛の全身化（線維筋痛症移行等）の予防に極めて有効であることを脳科学的に裏付けている。"
    ],
    tags: ["Chronic Neck Shoulder Pain","Katakori","fMRI","Periaqueductal Gray","Insula","Pain Catastrophizing","Deqi","Front Neurosci"],
    abstract: "女性慢性頸肩部痛患者30名を対象に、4週間の鍼治療（得気あり）が下行性疼痛抑制系の要である中脳水道周囲灰白質（PAG）の機能的結合性と痛みの破局的思考（PCS）に与える影響を安静時fMRIで検証。鍼治療は疼痛スコアとPCSを有意に低下させ、低下していたPAG-後部島皮質間の機能的結合性を健常者レベルまで回復させた。局所治療を超えた脳ネットワーク変調機序を証明。"
  },
  {
    id: "poststroke-motor-aphasia-acupuncture-xingnao-rct-li-2024",
    title: "Effect of Acupuncture vs Sham Acupuncture on Patients With Poststroke Motor Aphasia: A Randomized Clinical Trial",
    japaneseTitle: "脳卒中後運動性失語症患者に対する鍼治療 vs 偽鍼治療の効果：ランダム化臨床試験",
    authors: ["Bo Li","et al."],
    journal: "JAMA Network Open",
    year: 2024,
    pmid: "38252438",
    pmcid: "PMC10804104",
    doi: "10.1001/jamanetworkopen.2023.52580",
    studyDesign: "多施設共同シングルブラインド無作為化プラセボ対照比較試験 (Multicenter single-blind RCT)",
    sampleSize: 252,
    targetCondition: "脳卒中後運動性失語症 (Poststroke Motor Aphasia / Broca Aphasia)",
    interventionProtocol: {
      name: "醒脳開竅法鍼治療＋標準言語療法（SLT）併用プロトコル",
      acupoints: ["GV26 (水溝)","PC6 (内関)","SP6 (三陰交)","HT5 (通里)","LR3 (太衝)"],
      description: "醒脳開竅法に基づく標準化刺鍼。内関（直刺15〜25mm、提挿捻転瀉法1分）、水溝（鼻中隔へ向け斜刺5〜10mm、雀啄瀉法・眼球湿潤を指標）、三陰交（脛骨後縁斜刺25〜40mm、提挿補法）、通里・太衝に刺鍼。1回30分、週5回×6週間（計30回）。全患者に1回60分の言語訓練を併用。最大6ヶ月追跡。"
    },
    controlProtocol: {
      name: "非経穴シャム偽鍼＋標準言語療法（SLT）対照群",
      acupoints: ["Non-acupoints"],
      description: "非経穴部位に深さ2〜3mm浅刺し、手技操作を行わず得気を生じさせずに30分間置針。"
    },
    primaryOutcomes: "6週治療終了時点での失語指数（AQ: Aphasia Quotient）スコア、およびCFCP（中国語機能的コミュニケーションプロファイル）スコアの変化量",
    secondaryOutcomes: "NIHSS神経機能障害スコア、EQ-5D（健康関連QOL）、発話流暢性、復唱・呼名スコア、6ヶ月（24週）追跡時点での持続性",
    keyFindings: [
      "治療6週時点において、失語指数（AQ）スコアは鍼治療群が平均69.66点、偽鍼群が61.68点であり、鍼群が偽鍼群より7.99点有意に大幅改善（P < 0.001）。",
      "実生活でのコミュニケーション能力を示すCFCPスコアも鍼群が偽鍼群より有意に高く（群間差 12.35点、P < 0.001）、NIHSSスコアも顕著に改善。",
      "これらの改善効果は治療終了後6ヶ月（24週）の追跡調査時点でも完全に維持されていた。重篤な有害事象はなく高い安全性を確認。"
    ],
    clinicalTakeaways: [
      "リハビリ単独では回復が停滞しやすい脳卒中後運動性失語症に対し、標準化された醒脳開竅法鍼治療の併用が言語機能（発話・理解・呼名）とコミュニケーションQOLを劇的かつ長期持続的に改善することを世界一流誌JAMA Network Openで証明。",
      "内関・水溝・三陰交などの特異的刺激手技と得気獲得の重要性、およびリハビリテーションと言語聴覚療法のシナジー効果を証明する最高峰の臨床エビデンス。"
    ],
    tags: ["Poststroke Aphasia","Motor Aphasia","Stroke Rehabilitation","Xingnao Kaiqiao","PC6","GV26","JAMA Network Open","RCT"],
    abstract: "脳卒中後運動性失語症患者252名を対象に、言語療法に加え醒脳開竅法鍼治療を実施する群（125名）と非経穴偽鍼を実施する群（127名）に無作為割付けし6週間介入・6ヶ月追跡。主要アウトカムであるAQ（失語指数）スコアは鍼群で7.99点有意に高く改善し、機能的コミュニケーションスコア（CFCP）も12.35点有意に優れていた。改善効果は6ヶ月後も持続し、失語症リハビリにおける醒脳開竅法の高い有効性を実証。"
  },
  {
    id: "menstrual-migraine-acupuncture-acupressure-yu-2018",
    title: "Comparison of the Prophylactic Effect Between Acupuncture and Acupressure on Menstrual Migraine: Results of a Pilot Study",
    japaneseTitle: "月経時片頭痛に対する鍼治療と経穴圧迫（指圧）の予防効果の比較：パイロット試験結果",
    authors: ["Xianmin Yu","Alan Salmoni"],
    journal: "Journal of Acupuncture and Meridian Studies",
    year: 2018,
    pmid: "29654841",
    doi: "10.1016/j.jams.2018.04.003",
    studyDesign: "3群ランダム化比較対照パイロット試験 (3-arm Randomized Controlled Pilot Trial)",
    sampleSize: 18,
    targetCondition: "月経時片頭痛 (Menstrual Migraine: MM)",
    interventionProtocol: {
      name: "実鍼治療群 (VA) および経穴圧迫・指圧群 (AP)",
      acupoints: ["LR3 (太衝)","GB20 (風池)","GB8 (率谷)","SP6 (三陰交)","LI4 (合谷)"],
      description: "月経周期7周期（ベースライン1周期、介入期3周期 [各月3回]、追跡期3周期）にわたり実施。VA群は経穴に深刺し得気を誘発、AP群は同一経穴に持続的圧迫刺激を適用。"
    },
    controlProtocol: {
      name: "対照鍼群 (Control Acupuncture: CA)",
      acupoints: ["Non-acupoints (経穴から外れた非経穴部位)"],
      description: "非経穴部位への浅刺を行い、得気感覚を与えないシャム鍼治療を実施。"
    },
    primaryOutcomes: "月経時片頭痛日数（MM days）、平均および最大疼痛強度（Peak Pain VAS）、発作持続時間、頭痛日数50%以上減少達成率",
    secondaryOutcomes: "月経随伴症状スコア、生活の質（QOL）、有害事象",
    keyFindings: [
      "介入期間中、実鍼群（VA）および経穴指圧群（AP）は対照鍼群（CA）に比べ、月経時片頭痛日数を有意に短縮させた（P < 0.05）。",
      "最大疼痛強度（Peak Pain）の軽減傾向もVA群およびAP群でCA群より優れていた。",
      "重篤な有害事象は一切認められず、侵襲性のない経穴指圧（AP）も鍼治療に匹敵する予防効果を示した。"
    ],
    clinicalTakeaways: [
      "月経時片頭痛（MM）の予防管理において、鍼治療だけでなく非侵襲的な経穴圧迫（指圧・ツボ押し）も極めて有効かつ安全な代替療法となりうる。",
      "刺針に恐怖心がある患者や自宅でのセルフケア指導において、太衝・風池・三陰交等の経穴圧迫が頭痛発作日数の抑制に実用的な価値を持つことをパイロットRCTで示唆。"
    ],
    tags: ["Menstrual Migraine","Acupressure","Acupuncture","Prophylaxis","Headache","Women's Health","Pilot RCT"],
    abstract: "月経時片頭痛（MM）患者18名を対象に、実鍼群（VA: 7名）、経穴指圧群（AP: 6名）、対照鍼群（CA: 5名）の3群に無作為割付けし、7月経周期（介入3周期・追跡3周期）にわたり予防効果を比較。VA群およびAP群は介入期においてCA群に比べ頭痛日数を有意に減少させ、最大疼痛強度も抑制傾向を示した。侵襲性のない経穴圧迫も鍼治療と同様にMMの安全な予防介入となりうることを実証。"
  },
  {
    id: "shoulder-pain-electroacupuncture-rct-guerra-2004",
    title: "Randomised trial of long term effect of acupuncture for shoulder pain",
    japaneseTitle: "肩関節痛に対する鍼治療の長期効果に関するランダム化比較試験",
    authors: ["Juan Antonio Guerra de Hoyos","Maria del Carmen Andrés Martín","Elena Bassas y Baena de Leon","Miguel Vigára Lopez","Teresa Molina López","Francisco Antonio Verdugo Morilla","Maria José González Moreno"],
    journal: "Pain",
    year: 2004,
    doi: "10.1016/j.pain.2004.08.030",
    studyDesign: "前向き単盲検プラセボ対照ランダム化比較試験 (Prospective randomized placebo-controlled trial)",
    sampleSize: 130,
    targetCondition: "肩関節痛・軟部組織性肩痛（腱板炎、肩峰周囲炎、インピンジメント、凍結肩移行期）",
    interventionProtocol: {
      name: "肩部経穴鍼通電療法＋必要時ジクロフェナク併用",
      acupoints: ["LI15 (肩髃)","TE14 (肩髎)","GB21 (肩井)","SI9 (肩貞)","SI11 (天宗)","LI11 (曲池)","ST38 (条口)"],
      description: "8週間にわたり週1〜2回、肩関節周囲の経穴および遠隔穴に刺入し鍼通電療法（低周波刺激）を実施。激痛時はジクロフェナク頓用を許可。"
    },
    controlProtocol: {
      name: "皮膚非貫通プラセボ鍼（シャム鍼）群",
      acupoints: ["同一肩部部位"],
      description: "皮膚を貫通しないプラセボ鍼装置を用いて同様の視覚・触覚刺激を与え、同一スケジュールで実施。ジクロフェナク頓用許可。"
    },
    primaryOutcomes: "VAS疼痛スコア（治療前、治療中、治療後3ヶ月および6ヶ月時点の群間差）",
    secondaryOutcomes: "Lattinen痛覚指数、関節可動域（ROM）、SPADI（肩機能障害指数）、COOP-WONCA QOLスコア、NSAIDs服用錠数、患者満足度",
    keyFindings: [
      "治療後6ヶ月の長期追跡時点において、鍼治療群はプラセボ群に比べてVAS疼痛スコアが有意に大きく改善した [VAS群間差 2.0点 (95% CI 1.2–2.9), P < 0.001]。",
      "関節可動域（ROM）、機能障害（SPADI）、QOL、NSAIDs服用量削減のすべての副次評価項目において、鍼治療群が一貫して有意に優れた改善を維持した。",
      "治療終了後、時間が経過するにつれてプラセボ群との差がさらに拡大し、長期的な自己治癒・組織修復促進効果が実証された。"
    ],
    clinicalTakeaways: [
      "プライマリケアにおける腱板・軟部組織由来の肩痛に対し、鍼通電治療は6ヶ月後も鎮痛とROM改善、鎮痛薬離脱をもたらす持続的エビデンスを有する（国際疼痛学会誌Pain掲載）。",
      "急性期の対症療法のみならず、拘縮や凍結肩への進行を予防する長期管理手段として極めて優れている。"
    ],
    tags: ["Shoulder Pain","Rotator Cuff","Electroacupuncture","Pain Journal","RCT","Long-term Follow-up","SPADI","ROM"],
    abstract: "プライマリケアを受診した軟部組織由来の肩関節痛患者130名を対象に、鍼通電療法群（65名）と皮膚非貫通プラセボ鍼群（65名）に無作為割付けし8週間介入・6ヶ月間追跡。6ヶ月追跡時点でのVAS疼痛スコア改善度は鍼群がプラセボ群を有意に凌駕（群間差2.0点, P < 0.001）。さらに関節可動域（ROM）、SPADI、QOL、NSAIDs服用削減量でも一貫して優れた長期治療効果を実証。"
  },
  {
    id: "shoulder-impingement-manual-acupuncture-meta-analysis-an-2024",
    title: "Effects of acupuncture on shoulder impingement syndrome: A systematic review and meta-analysis",
    japaneseTitle: "肩峰下インピンジメント症候群に対する手技鍼治療の効果：システマティックレビューとメタアナリシス",
    authors: ["Sang-Joon An","Woo-Chul Shin","Sungjun Joo","Jae-Heung Cho","Won-Seok Chung","Mi-Yeon Song","Hyungsuk Kim"],
    journal: "Medicine",
    year: 2024,
    pmid: "39287298",
    pmcid: "PMC11404868",
    doi: "10.1097/MD.0000000000039696",
    studyDesign: "システマティックレビューおよびメタアナリシス (Systematic Review & Meta-Analysis)",
    sampleSize: 5,
    targetCondition: "肩峰下インピンジメント症候群 (Shoulder Impingement Syndrome: SIS)",
    interventionProtocol: {
      name: "手技単独鍼治療プロトコル (Manual Acupuncture exclusively)",
      acupoints: ["LI15 (肩髃)","TE14 (肩髎)","LI14 (臂臑)","GB21 (肩井)","SI11 (天宗)","Ashixue"],
      description: "電気鍼や温鍼、薬鍼、針刀等を除外し、純粋な手技刺鍼による肩関節局所・遠隔穴への治療効果を抽出・統合。"
    },
    controlProtocol: {
      name: "シャム鍼、理学療法、通常保存的療法対照",
      acupoints: ["Non-acupoints / Physical therapy controls"],
      description: "偽鍼または運動療法・非ステロイド性抗炎症薬との比較。"
    },
    primaryOutcomes: "疼痛スコア（VAS / NRS）",
    secondaryOutcomes: "肩機能障害スコア（Constant-Murley score, SPADI, DASH）",
    keyFindings: [
      "手技刺鍼は対照群に比べ、有意に肩痛を軽減させた [SMD = -0.50, 95% CI: -0.74 to -0.27, P < 0.001]。",
      "肩関節機能および障害度も有意に改善 [SMD = -0.57, 95% CI: -0.96 to -0.19, P = 0.003]。",
      "介入期間別のサブグループ解析では、4週間以下の短期手技鍼治療が異質性が極めて低く高い信頼性をもって疼痛を軽減させた [SMD = -0.37, 95% CI: -0.73 to -0.02]。"
    ],
    clinicalTakeaways: [
      "これまで混在していた電気鍼や針刀を除外し、純粋な「手技鍼」のみでも肩インピンジメントの腱板浮腫・滑液包炎痛を緩和し可動域制限を改善することが実証された。",
      "特に発症早期〜4週以内の集中手技刺鍼が、組織損傷の慢性化や腱板断裂への移行を防ぐ上で高い有用性を持つ。"
    ],
    tags: ["Shoulder Impingement","SIS","Manual Acupuncture","Meta-Analysis","Rotator Cuff","Medicine Journal"],
    abstract: "肩峰下インピンジメント症候群（SIS）に対する純粋な手技鍼治療の効果を検証したRCTを多国籍データベースから網羅的に検索しメタアナリシスを実施。手技鍼は対照群に比べ有意に疼痛を軽減し（SMD = -0.50）、肩関節機能および障害度を有意に改善（SMD = -0.57）。特に4週以内の短期治療において高い信頼性と低異質性を示し、手技刺鍼の独立した有効性を確立。"
  },
  {
    id: "cfs-acupuncture-moxibustion-hrv-li-2025",
    title: "Effects of acupuncture and moxibustion on heart rate variability in chronic fatigue syndrome patients: Regulating the autonomic nervous system in a clinical randomized controlled trial",
    japaneseTitle: "慢性疲労症候群患者における心拍変動に対する鍼灸の効果：臨床ランダム化比較試験における自律神経系調節",
    authors: ["Tong Li","Gerhard Litscher","Yudian Zhou","Yanjuan Song","Qing Shu","Li Chen","Qi Huang","Yayuan Wang","Haoran Tian","Rufeng Teng","Hua Wang","Fengxia Liang"],
    journal: "Complementary Therapies in Medicine",
    year: 2025,
    pmid: "40315935",
    doi: "10.1016/j.ctim.2025.103184",
    studyDesign: "6群前向きランダム化比較試験 (6-arm RCT with Healthy Control)",
    sampleSize: 210,
    targetCondition: "慢性疲労症候群 (Chronic Fatigue Syndrome: CFS) および気虚証",
    interventionProtocol: {
      name: "足三里（ST36）および関元（CV4）に対する単穴・二穴鍼治療および灸治療プロトコル",
      acupoints: ["ST36 (足三里)","CV4 (関元)"],
      description: "計10回（隔日投与）。Group C：両側ST36鍼＋CV4偽鍼、Group D：CV4鍼＋両側ST36偽鍼、Group E：ST36＋CV4真鍼、Group F：ST36＋CV4温灸。初回後、第4回後、全治療終了後にHRV測定。"
    },
    controlProtocol: {
      name: "偽鍼対照群 (Group B: Fake Acupuncture)",
      acupoints: ["ST36, CV4 (Sham devices)"],
      description: "両側足三里および関元の両方に偽鍼を実施。"
    },
    primaryOutcomes: "心拍変動（HRV：HF、LF、LF/HF比）、自律神経バランス",
    secondaryOutcomes: "気虚証スコア、CFS疲労スコア、SF-36（健康関連QOLスコア）",
    keyFindings: [
      "鍼治療および灸治療の双方がCFS患者の疲労症状を有意に軽減し、足三里と関元の併用治療が単穴刺激より顕著に優れていた。",
      "鍼治療はHRVの「即時的自律神経調節効果」に優れ、灸治療は「長期的・累積的自律神経調節効果」に優れていた。",
      "経穴特異性として、足三里（ST36）刺激は主に副交感神経（迷走神経）活性化に関与し、関元（CV4）刺激は交感神経系のバランス調整に寄与することが判明。"
    ],
    clinicalTakeaways: [
      "慢性疲労症候群（CFS）の自律神経失調に対し、「即時性をもたらす鍼」と「持続・累積効果をもたらす灸」の併用、および「足三里（副交感活性化）＋関元（交感調律・陽気補益）」の配穴が最も合理的かつ強力な臨床戦略となる。"
    ],
    tags: ["Chronic Fatigue Syndrome","CFS","Heart Rate Variability","HRV","ST36","CV4","Moxibustion","Autonomic Nervous System","CTIM","RCT"],
    abstract: "健常対照35名およびCFS患者175名を対象に、偽鍼群、ST36単独鍼群、CV4単独鍼群、ST36+CV4併用鍼群、ST36+CV4温灸群の計6群で比較検証。鍼治療はHRVの即時的調節に優れ、灸治療は長期的累積調節に秀でていた。また足三里は副交感神経系、関元は交感神経系の調律に主として寄与し、両穴併用により気虚スコアと疲労症状が最も大きく改善した。"
  },
  {
    id: "menopausal-symptoms-hrv-japanese-acupuncture-kouzuma-2022",
    title: "Heart Rate and Autonomic Nervous System Activity Relationship During Acupuncture Associated with Postural Change and Effect on Menopausal Symptoms: A Prospective Randomized Trial",
    japaneseTitle: "体位変換に伴う鍼刺激中の心拍数および自律神経活動の相関と更年期症状に対する効果：前向きランダム化試験",
    authors: ["Naoko Kouzuma","Taro Taguchi","Makie Higuchi"],
    journal: "Medical Acupuncture",
    year: 2022,
    doi: "10.1089/acu.2022.0004",
    studyDesign: "前向きランダム化シャム対照試験 (Prospective Randomized Sham-Controlled Trial)",
    sampleSize: 48,
    targetCondition: "更年期症状および自律神経調節機能 (Menopausal Symptoms & ANS activity under postural change)",
    interventionProtocol: {
      name: "和鍼（日本式鍼手技）7穴プロトコル",
      acupoints: ["GV20 (百会)","CV12 (中脘)","CV6 (気海)","ST36 (足三里)","SP6 (三陰交)","KI3 (太渓)","LR3 (太衝)"],
      description: "和鍼（管鍼法、細刺鍼）を用い、週1回×4週間実施。仰臥位安静期、刺針・置針10分期、立位10分期の各フェーズで心電図・心拍変動（HRV: HF, LF/HF）を連続記録。"
    },
    controlProtocol: {
      name: "鍼管押圧シャム群 (Sham Group)",
      acupoints: ["同一7経穴"],
      description: "鍼を刺入せず、鍼管のみを同一7経穴に押圧接触させて模擬施術。"
    },
    primaryOutcomes: "刺入時・抜針時の心拍数（HR）低下度、HRV（HFパワー：副交感神経、LF/HF比：交感神経）、起立負荷時の自律神経適応",
    secondaryOutcomes: "更年期症状VASスコア（のぼせ、動悸、不安、倦怠感等）",
    keyFindings: [
      "刺入および抜針という針の出し入れ刺激の瞬間、置針中よりも有意に強い心拍数（HR）の急激な低下が生じた（P < 0.01）。刺入時と抜針時のHR減少度には強い正相関（r = 0.732, P = 0.000）を認めた。",
      "鍼治療群の79%（19/24例）において心拍数が5%以上低下。施術中には副交感指標（HF）が有意に上昇し、立位変換時の過剰な交感神経緊張（LF/HF上昇）が抑制された。",
      "更年期症状のVASスコアが鍼治療群で有意に寛解した。"
    ],
    clinicalTakeaways: [
      "日本式（管鍼法）の繊細な刺入・抜針刺激そのものが強力な迷走神経反射を引き起こし、徐脈化・副交感神経優位へと誘導する。",
      "起立性調節障害や更年期のホットフラッシュ・動悸など、体位変換時に自律神経破綻を来しやすい病態に対し、和鍼の低刺激手技が確実な自律神経保護作用を発揮する。"
    ],
    tags: ["Menopause","Japanese Acupuncture","HRV","Heart Rate","Vagus Nerve","Postural Change","Medical Acupuncture","RCT"],
    abstract: "更年期女性48名を対象に、日本式和鍼（7穴）群と鍼管押圧シャム群に無作為割付けし、刺鍼中および立位体位変換時のHRVと心拍数を計測。刺入時と抜針時に顕著な心拍数低下（r = 0.732）とHF（副交感指標）増加が確認され、起立時の交感神経過剰興奮が抑制された。和鍼の刺入抜針刺激が更年期自律神経失調を改善する機序を実証。"
  },
  {
    id: "chronic-insomnia-disorder-meta-tsa-yu-2025",
    title: "Acupuncture for chronic insomnia disorder: a systematic review with meta-analysis and trial sequential analysis",
    japaneseTitle: "慢性不眠症に対する鍼治療：システマティックレビュー、メタアナリシスおよび試験逐次解析（TSA）",
    authors: ["Yi Yu","Xinju Li","Zheng Zhu","Yingdong Wang","Qiang Xi","Jiwen Qiu","Yidan Xu","Ruonan Liang","Yi Guo","Mingxing Zhang"],
    journal: "Frontiers in Neurology",
    year: 2025,
    doi: "10.3389/fneur.2025.1541276",
    studyDesign: "システマティックレビュー、メタアナリシスおよび試験逐次解析 (Systematic Review, Meta-Analysis & Trial Sequential Analysis: TSA)",
    sampleSize: 757,
    targetCondition: "慢性不眠症 (Chronic Insomnia Disorder: CID, 持続3ヶ月以上)",
    interventionProtocol: {
      name: "主幹経穴手技鍼および鍼通電療法プロトコル",
      acupoints: ["GV20 (百会)","EX-HN3 (印堂)","HT7 (神門)","SP6 (三陰交)","DU24 (神庭)","EX-HN1 (四神聡)","PC6 (内関)"],
      description: "百会・印堂・神門・三陰交・神庭を中核とする手技鍼（MA）または低周波鍼通電（EA）、1回20〜30分、週2〜5回、2〜8週間。"
    },
    controlProtocol: {
      name: "シャム偽鍼群（非経穴浅刺、Streitberger非貫通鍼、疾患無関係穴）",
      acupoints: ["Non-acupoints / Streitberger sham / GB30"],
      description: "皮膚非貫通または経穴から1cm以上離れた非経穴部への浅刺。"
    },
    primaryOutcomes: "主観的指標：PSQIスコア、ISIスコア。客観的睡眠指標（PSG/アクチグラフィ）：総睡眠時間（TST）、睡眠効率（SE）、中途覚醒時間（WASO）",
    secondaryOutcomes: "TSAによる必要情報量（RIS）到達判定、有害事象",
    keyFindings: [
      "主観的睡眠改善：鍼治療はシャム鍼に対しPSQIを有意に改善 [MD = -2.60, 95% CI: -3.24 to -1.97, P < 0.00001]、ISIも有意に改善 [MD = -2.04, P = 0.0005]。TSA解析により累積Z曲線がRIS境界（PSQI: 111, ISI: 297）を突破し、結論が極めて堅固であることが証明された。",
      "サブグループ：手技鍼（PSQI MD = -3.85）および鍼通電（PSQI MD = -1.67）の双方がシャムに圧勝。",
      "客観的睡眠指標：睡眠効率（SE: MD = 3.62%改善）および中途覚醒時間（WASO: MD = -18.53分短縮）で有意差を示したが、TST（総睡眠時間）は有意差なし。TSAでは客観的指標の症例数はまだRIS未達であり今後の大規模検証が必要とされた。"
    ],
    clinicalTakeaways: [
      "慢性不眠症に対する百会・神門・印堂・三陰交を中心とした鍼治療は、偽鍼プラセボ効果を明確に超えて主観的睡眠の質と重症度を改善することが最新の試験逐次解析（TSA）で決定的となった。",
      "患者の主観的熟眠感向上と中途覚醒の短縮（約18分減）に直結するエビデンス。"
    ],
    tags: ["Chronic Insomnia","CID","Meta-Analysis","Trial Sequential Analysis","TSA","PSQI","ISI","Frontiers in Neurology"],
    abstract: "慢性不眠症（CID）患者757名を対象とした10件のRCTを対象に、メタアナリシスおよび試験逐次解析（TSA）を実施。鍼治療はシャム偽鍼に比べPSQI（MD = -2.60）およびISI（MD = -2.04）を有意に改善し、TSAにより必要情報量（RIS）を超えエビデンスの堅固性が証明された。客観的指標でも中途覚醒短縮（WASO -18.53分）と睡眠効率向上が確認された。"
  },
  {
    id: "acupuncture-parasympathetic-tone-hrv-meta-hamvas-2022",
    title: "Acupuncture increases parasympathetic tone, modulating HRV − Systematic review and meta-analysis",
    japaneseTitle: "鍼治療は副交感神経緊張を高め心拍変動を調節する：システマティックレビューとメタアナリシス",
    authors: ["Sz. Hamvas","P. Hegyi","Sz. Kiss","Sz. Lohner","D. McQueen","M. Havasi"],
    journal: "Complementary Therapies in Medicine",
    year: 2022,
    pmid: "36494036",
    doi: "10.1016/j.ctim.2022.102905",
    studyDesign: "システマティックレビューおよびメタアナリシス (Systematic Review & Meta-Analysis of 9 RCTs)",
    sampleSize: 356,
    targetCondition: "自律神経機能障害、慢性ストレス関連疾患、心拍変動 (Autonomic Nervous System & HRV modulation)",
    interventionProtocol: {
      name: "経穴への手技刺鍼プロトコル（電気刺激なしの純粋な毫針刺鍼）",
      acupoints: ["PC6 (内関)","ST36 (足三里)","LI4 (合谷)","LR3 (太衝)","HT7 (神門)","SP6 (三陰交)"],
      description: "体幹・四肢のTCM経穴に対する手技刺鍼。電気刺激やマイクロシステム（耳鍼・頭針）を除外し、臨床実態に即した手技毫針のみを抽出。"
    },
    controlProtocol: {
      name: "シャム偽鍼対照群（非経穴刺鍼または非貫通偽鍼）",
      acupoints: ["Non-acupoints / Non-penetrating sham"],
      description: "非経穴への刺入または経穴への非貫通プラセボ鍼。"
    },
    primaryOutcomes: "心拍変動（HRV）周波数領域解析：高周波パワー（HF: 0.15–0.40 Hz、迷走神経・副交感神経指標）、LF/HF比（交感/副交感バランス指標）",
    keyFindings: [
      "クロスオーバー試験・並行群間試験の全解析グループにおいて、実鍼群（Verum）は施術後に高周波成分（HF）を有意に増加させた [並行試験対数HF: WMD = 0.222, P = 0.028; シャム群間差 P = 0.005]。",
      "実鍼群ではLF/HF比が有意に低下し [WMD = -1.098, 95% CI: -2.118 to -0.079]、副交感神経優位への自律神経リバランスが生じた。一方、シャム群ではこれらの有意な変化は一切観察されなかった。",
      "電気刺激を用いない純粋な手技刺鍼が、プラセボを超えて副交感神経トーンを増強することがメタアナリシスで統計学的に確立された。"
    ],
    clinicalTakeaways: [
      "「鍼治療が慢性ストレスや自律神経失調、高血圧、不眠、胃腸運動障害に効く」という臨床家の長年の経験則に対し、「副交感神経緊張（HF）の特異的増強と交感神経緊張（LF/HF）の抑制」という心臓血管自律神経レベルの客観的証拠を与えた。"
    ],
    tags: ["Heart Rate Variability","HRV","Parasympathetic","Vagus Nerve","Autonomic Nervous System","Meta-Analysis","CTIM"],
    abstract: "ヒト被験者356名を対象とした9件の手技鍼RCTをメタアナリシスし、心拍変動（HRV）に対する真の鍼治療とプラセボ偽鍼の効果を比較。実鍼群は治療後に有意な高周波パワー（HF）の増大とLF/HF比の低下を示し、副交感神経緊張を特異的に高めることが立証された。慢性ストレス関連疾患への鍼の有効性を裏付ける客観的エビデンス。"
  },
  {
    id: "shiatsu-vs-acupressure-distinction-cabo-2018",
    title: "Shiatsu and Acupressure: Two Different and Distinct Techniques",
    japaneseTitle: "指圧（Shiatsu）と経穴圧迫（Acupressure）：二つの異なる別個の手技療法の比較分析と定義の提言",
    authors: ["Fernando Cabo","Amanda Baskwill","Isaac Aguaristi","Slava Christophe-Tchakaloff","Jean-Philippe Guichard"],
    journal: "International Journal of Therapeutic Massage & Bodywork",
    year: 2018,
    pmid: "29881477",
    pmcid: "PMC5988345",
    studyDesign: "文献分析・国際アンケート調査・概念定義提言研究 (Comparative Article Analysis & International Practitioner Survey)",
    sampleSize: 101,
    targetCondition: "手技療法の術式・作用機序の差別化（指圧 vs 経穴圧迫・ツボ押し）",
    interventionProtocol: {
      name: "指圧療法（Shiatsu：浪越徳治郎・増永静人・芹澤勝助の流派に基づく日本発祥の手技）",
      acupoints: ["全身の指圧点 (全身的・包括的アプローチ)"],
      description: "①母指を伸展位に保ち、②施術者の体重移動（体幹・股関節の動き）のみを利用して、③垂直・持続的・静止的（Stationary/Sustained）な圧を全身に漸増漸減で加える手技。"
    },
    controlProtocol: {
      name: "経穴圧迫療法（Acupressure：中国医学・中医学に基づくツボ押し）",
      acupoints: ["数穴の特定経穴（LI4, SP6, PC6等局所中心）"],
      description: "①母指中手指節関節（MP関節）を屈曲させ、②腕や手の筋力を用いて、③円運動、揉捏、あるいは急速なポンピング動作（Pumping: 毎分60回など動的圧迫）を加える手技。"
    },
    primaryOutcomes: "手技特性の比較（圧の性質、母指の肢位、身体重心・股関節運動）、国際臨床家101名による動画認識一致度（93〜95%が明確に異なると回答）",
    keyFindings: [
      "文献およびビデオ比較により、指圧と経穴圧迫には根本的な技術的・生体力学的差異が存在する（指圧＝静止持続圧・母指伸展・体重利用・全身治療；Acupressure＝動的揉捏ポンピング・母指屈曲・腕力利用・局所穴）。",
      "国際指圧師101名の調査において、95%が両技術を「全く異なる」と回答。受容器刺激特性（持続圧によるルフィニ小体・メルケル盤刺激 vs 動的刺激によるパチニ小体・マイスナー小体刺激）の違いも示唆。",
      "医学研究・システマティックレビューにおいて、指圧研究の不足を理由にAcupressure研究を代用・混同することは方法論的誤謬であると警告し、国際共通の「指圧の定義」を策定。"
    ],
    clinicalTakeaways: [
      "指圧とAcupressure（ツボ押し）は作用機序も機械受容器への入力パターンも異なっており、学術研究や臨床エビデンスを引用する際は厳密に区別する必要がある。",
      "指圧本来の持続静止圧は術者の母指障害を防ぎ、患者の副交感神経を安定化させる生体力学的合理性を持つ。"
    ],
    tags: ["Shiatsu","Acupressure","Manual Therapy","Biomechanics","Mechanoreceptors","Comparative Study","IJTMB"],
    abstract: "指圧（Shiatsu）と経穴圧迫（Acupressure）が研究上で混同されている現状を是正するため、システマティックレビュー収載論文の精査および14カ国101名の指圧師を対象としたビデオ認識調査を実施。圧の性質（持続静止圧 vs 動的ポンピング圧）、母指の肢位（伸展 vs 屈曲）、重心利用において両者には決定的な差異があり、指圧の国際的定義を確立して研究上の混同を避けるべきと提言。"
  },
  {
    id: "physical-stress-ans-hrv-acupuncture-li-2025",
    title: "Regulation of autonomic nervous system by acupuncture: a heart rate variability study on physical stress",
    japaneseTitle: "鍼治療による自律神経系の調節：身体的ストレスに関する心拍変動研究",
    authors: ["Lun Li","Sha Liang","Jinfeng Bai","Yun Zeng","Mengzhen Zhang","Zhongwen Li","Dingshang Yan","Yangming Hu","Liang He","Yizhe Liu","Qi Liu","Yingjun Zhang","Min Feng"],
    journal: "Frontiers in Neuroscience",
    year: 2025,
    pmid: "41307072",
    pmcid: "PMC12644030",
    doi: "10.3389/fnins.2025.1506927",
    studyDesign: "自己対照クロスオーバー臨床試験 (Self-comparison crossover clinical trial with 1-day washout)",
    sampleSize: 35,
    targetCondition: "身体的ストレス（Physical Stress）および自律神経調節 (ANS regulation)",
    interventionProtocol: {
      name: "足三里（ST36）鍼、中脘（CV12）鍼、足三里（ST36）温灸の逐次比較介入",
      acupoints: ["ST36 (足三里)","CV12 (中脘)"],
      description: "各15分間介入。ST36鍼：深さ0.8〜1.2寸、5分ごとに提挿捻転平補平瀉30秒。CV12鍼：深さ0.8〜1.2寸、同様の手技操作。ST36温灸：灸箱を用いた温和灸15分。各介入間に1日のウォッシュアウト期間を設置。"
    },
    controlProtocol: {
      name: "介入前ベースライン（自己対照）および介入後5〜10分追跡",
      acupoints: [],
      description: "同一被験者における安静時ベースライン値および抜鍼後追跡値との比較。"
    },
    primaryOutcomes: "心拍変動（HRV：HF、RMSSD、SD1、LF、SD2、TP、SDNN、SD1/SD2）、心拍数（HR）、身体ストレス指数（PSI: Physical Stress Index）",
    keyFindings: [
      "足三里（ST36）刺鍼中：迷走神経（副交感）指標であるHF、RMSSD、SD1が有意に上昇（P < 0.01）、心拍数（HR）および身体ストレス指数（PSI）が有意に低下。",
      "中脘（CV12）刺鍼中および抜鍼後：RMSSD、SD1、TP、SDNNが上昇し、さらに抜鍼後5〜10分時点でも迷走神経活性（RMSSD, SD1）とストレス低下（PSI低下、SD1/SD2上昇）の持続効果が維持された（P < 0.01）。",
      "足三里温灸：HRVパラメータの有意な変化は認められなかったが、心拍数（HR）を有意に低下させ、抜鍼後もその徐脈効果が持続した（液性調節・ノルアドレナリン関与の可能性）。"
    ],
    clinicalTakeaways: [
      "足三里と中脘の刺鍼は、共に身体的ストレス指数（PSI）を減少させ迷走神経を興奮させるが、中脘（CV12）は抜鍼後も副交感優位を持続させる「持続効果（Sustained Effect）」において特に優れている。",
      "温灸は心拍数を落ち着かせる鎮静効果に秀でており、ストレス性動悸や交感神経興奮に対して鍼と灸を病態に応じて使い分ける根拠となる。"
    ],
    tags: ["Physical Stress","HRV","ST36","CV12","Moxibustion","Parasympathetic","Vagus Nerve","Frontiers in Neuroscience"],
    abstract: "健康若年被験者35名を対象に、ST36（足三里）鍼、CV12（中脘）鍼、ST36温灸の自律神経および身体ストレス指数（PSI）への影響をHRV解析で検証。ST36刺鍼は迷走神経活性（HF, RMSSD）を即座に高めPSIを減少させた。CV12刺鍼は抜鍼後5〜10分も迷走神経活性化とストレス低下が持続した。温灸はHRを有意に減少させ、鍼灸の自律神経調節における経穴・刺激法特異性を解明。"
  },
  {
    id: "body-weight-control-electroacupuncture-auricular-protocol-zhong-2016",
    title: "The combination effects of body acupuncture and auricular acupressure compared to sham acupuncture for body weight control: study protocol for a randomized controlled trial",
    japaneseTitle: "体重コントロールに対する体鍼と耳介経穴圧迫の併用効果 vs シャム鍼：ランダム化比較試験プロトコル",
    authors: ["Linda L. D. Zhong","Wai Kun","Tsz Fung Lam","Shi Ping Zhang","Jun Jun Yang","Tat Chi Ziea","Bacon Ng","Zhao Xiang Bian"],
    journal: "Trials",
    year: 2016,
    pmid: "27457720",
    pmcid: "PMC4960666",
    doi: "10.1186/s13063-016-1458-2",
    studyDesign: "単盲検プラセボ対照ランダム化比較試験プロトコル (Single-blind sham-controlled RCT protocol)",
    sampleSize: 72,
    targetCondition: "肥満症・体重コントロール (Obesity & Body Weight Control)",
    interventionProtocol: {
      name: "腹部・四肢体鍼（低周波鍼通電）＋耳介経穴圧迫併用プロトコル",
      acupoints: ["ST25 (天枢)","SP15 (大横)","GB26 (帯脈)","CV6 (気海)","CV12 (中脘)","ST36 (足三里)","ST40 (豊隆)","SP6 (三陰交)","耳介穴 (飢点, 胃, 内分泌, 神門)"],
      description: "腹部経穴に深さ10〜25mm刺入し、疎密波50Hz・10Vで30分間鍼通電。さらに耳介経穴に王不留行子（磁気・生薬粒）を貼付し食事前の自己圧迫を指導。週2回×8週間（計16回）、追跡8週間。"
    },
    controlProtocol: {
      name: "Streitberger非貫通プラセボ鍼＋無刺激耳介テープ対照群",
      acupoints: ["同一体幹・四肢・耳介経穴"],
      description: "皮膚を貫通せず刺入感のみを与えるStreitbergerシャム鍼を使用し、同一の電気刺激装置（通電音のみで無電流）および無刺激耳介テープを貼付。"
    },
    primaryOutcomes: "ベースラインから8週治療終了時および16週追跡時における体重（Body Weight: kg）の変化量",
    secondaryOutcomes: "BMI、腹囲、臀囲、体脂肪率（%）、食欲関連ホルモン（レプチン、グレリン）、有害事象",
    keyFindings: [
      "腹部の局所経穴（天枢・大横・帯脈・中脘）への50Hzパルス通電は腹部内臓脂肪の代謝を刺激し、インスリン感受性を高める。",
      "耳介経穴（飢点・胃・神門）の圧迫は迷走神経耳介枝を刺激し、視床下部満腹中枢を興奮させて過剰な食欲を中枢性に抑制する。",
      "西洋医学の抗肥満薬（リバウンドや消化器副作用）に対する安全で持続的な非薬物減量プロトコルの厳格な検証デザインを確立。"
    ],
    clinicalTakeaways: [
      "肥満・メタボリックシンドロームの臨床において、「体幹部の鍼通電（脂肪代謝亢進・胃腸運動適正化）」と「耳鍼（食欲抑制・自律神経安定）」のシナジー併用は、科学的エビデンスに基づく極めて効果的な統合的アプローチである。"
    ],
    tags: ["Obesity","Weight Control","Electroacupuncture","Auricular Acupressure","ST25","CV12","ST40","Trials Journal","Study Protocol"],
    abstract: "肥満症成人72名を対象に、体鍼（腹部50Hz鍼通電）＋耳介経穴圧迫併用群とStreitberger偽鍼＋偽耳介テープ対照群に無作為割付けし、8週間治療・8週間追跡する前向きRCTプロトコル。体重、BMI、腹囲、体脂肪率および食欲抑制ホルモン動態を評価し、肥満に対する鍼灸の科学的有効性と安全性を検証する。"
  },
  {
    id: "insomnia-acupuncture-systematic-review-cao-2009",
    title: "Acupuncture for Treatment of Insomnia: A Systematic Review of Randomized Controlled Trials",
    japaneseTitle: "不眠症に対する鍼治療：ランダム化比較試験のシステマティックレビュー",
    authors: ["Huijuan Cao","Xingfang Pan","Hua Li","Jianping Liu"],
    journal: "Journal of Alternative and Complementary Medicine",
    year: 2009,
    pmid: "19922248",
    pmcid: "PMC3156618",
    doi: "10.1089/acm.2009.0041",
    studyDesign: "システマティックレビューおよびメタアナリシス (Systematic Review & Meta-Analysis of 46 RCTs)",
    sampleSize: 3811,
    targetCondition: "不眠症（原発性不眠症2,882名、脳卒中後不眠220名、うつ病合併不眠179名等）",
    interventionProtocol: {
      name: "TCM経絡弁証鍼治療（体鍼、耳鍼、鍼通電、経穴指圧、穴位注射）",
      acupoints: ["HT7 (神門)","SP6 (三陰交)","EX-HN3 (印堂)","GV20 (百会)","EX-HN1 (四神聡)","PC6 (内関)","BL15 (心兪)","BL20 (脾兪)","耳神門","耳皮質下"],
      description: "伝統的中医弁証に基づく体鍼、耳鍼、鍼通電、および薬物・漢方併用療法。治療期間2日〜10週間。"
    },
    controlProtocol: {
      name: "無治療、シャム偽鍼、西洋睡眠薬（エスタゾラム、ジアゼパム、アルプラゾラム等）、漢方薬",
      acupoints: ["No treatment / Sham / Western Hypnotics / Chinese Herbs"],
      description: "無治療対照、プラセボ対照、または標準的ベンゾジアゼピン系睡眠薬単独群との比較。"
    },
    primaryOutcomes: "PSQIスコア、睡眠時間3時間以上延長達成率、総睡眠時間、臨床総有効率",
    secondaryOutcomes: "睡眠薬減量・離脱率、有害事象発現率",
    keyFindings: [
      "PSQIスコアにおいて、鍼治療は無治療群に比べ有意に優れ [MD = -3.28, 95% CI: -6.10 to -0.46, P = 0.02]、本物の経穴指圧も偽指圧に比べ有意に優れていた [MD = -2.94, P = 0.04]。",
      "睡眠時間が3時間以上増加した患者の割合において、鍼治療は西洋睡眠薬群を有意に上回った [RR = 1.53, 95% CI: 1.24–1.88, P < 0.0001]。",
      "鍼治療＋睡眠薬併用群は睡眠薬単独群より総睡眠時間を有意に延長させ [MD = 1.09時間, P < 0.0001]、鍼治療＋漢方薬も漢方単独を有意に凌駕した [RR = 1.67, P = 0.01]。重篤な有害事象は皆無。"
    ],
    clinicalTakeaways: [
      "ベンゾジアゼピン系睡眠薬の依存・耐性・認知機能低下が問題となる不眠症治療において、鍼治療は単独でも薬物を凌ぐ睡眠時間改善効果を示し、併用によって睡眠薬の減量・相乗効果を安全に達成できる。",
      "神門・三陰交・百会・印堂の臨床的常用穴が、睡眠構造改善のゴールドスタンダードである証拠となる。"
    ],
    tags: ["Insomnia","Meta-Analysis","Systematic Review","PSQI","HT7","SP6","GV20","Hypnotics","JACM"],
    abstract: "不眠症患者3,811名を対象とする46件のRCTをシステマティックレビューおよびメタアナリシス。鍼治療は無治療に比べPSQIを有意に改善（MD = -3.28）。睡眠時間が3時間以上延長した割合は西洋睡眠薬群を有意に凌駕（RR = 1.53）。さらに睡眠薬や漢方薬との併用により単独投与よりも睡眠時間を有意に延長させ、重篤な副作用なく高い安全性が確認された。"
  },
  {
    id: "shiatsu-acupressure-systematic-review-robinson-2011",
    title: "The evidence for Shiatsu: a systematic review of Shiatsu and acupressure",
    japaneseTitle: "指圧のエビデンス：指圧および経穴指圧に関するシステマティックレビュー",
    authors: ["Nicola Robinson","Ava Lorenc","Xing Liao"],
    journal: "BMC Complementary and Alternative Medicine",
    year: 2011,
    pmid: "21982157",
    pmcid: "PMC3200172",
    doi: "10.1186/1472-6882-11-88",
    studyDesign: "システマティックレビュー (Systematic Review of 9 Shiatsu & 71 Acupressure trials)",
    sampleSize: 80,
    targetCondition: "指圧および経穴指圧の適応症（運動器疼痛・腰痛、睡眠障害・不眠、悪心・嘔吐、不安、ストレス、疲労等）",
    interventionProtocol: {
      name: "指圧療法（Shiatsu: 徒手圧迫・ストレッチ・経絡調整）および経穴指圧（Acupressure: 特定経穴への持続的指圧刺激）",
      acupoints: ["PC6 (内関)","ST36 (足三里)","SP6 (三陰交)","LI4 (合谷)","BL23 (腎兪)","GV20 (百会)","HT7 (神門)"],
      description: "伝統的東洋医学の経絡・経穴理論に基づく母指・手根圧迫、関節他動運動、ストレッチ。西洋で普及するShiatsuと経穴指圧の臨床報告。"
    },
    controlProtocol: {
      name: "通常ケア、偽経穴指圧（シャム対照）、無治療対照、標準薬物療法",
      acupoints: ["Non-acupoints / Standard Care / Sham pressure"],
      description: "非経穴部位への軽微な圧迫、通常看護ケア、または標準的西洋医学治療との比較。"
    },
    primaryOutcomes: "疼痛強度変化、睡眠の質スコア、悪心・嘔吐の頻度および重症度、不安・リラクゼーション指標",
    secondaryOutcomes: "健康関連QOL、有害事象発現率、研究報告の質（CONSORT / TREND準拠度）",
    keyFindings: [
      "指圧研究9件および経穴指圧研究71件（計80件）を同定・分析。経穴指圧は疼痛（頭痛、腰痛、術後痛）、悪心・嘔吐（術後、化学療法誘発性、妊娠悪阻）、睡眠障害に対して統計学的に有意なエビデンスが多数蓄積されている。",
      "指圧（Shiatsu）単独の研究では、腰痛の有意な軽減、睡眠の質の向上、筋緊張緩和、主観的リラクゼーション効果が報告された。",
      "有害事象は極めて軽微（施術部位の一過性圧痛等）であり、重篤な事故の報告はなく、非侵襲的で安全性の高い徒手療法であることが確認された。"
    ],
    clinicalTakeaways: [
      "指圧は鍼灸と同様に経穴・経絡理論に基づきながらも、非侵襲的であるため鍼治療恐怖症（needle phobia）や小児、高齢者、易感染性患者にも極めて安全に導入できる。",
      "PC6（悪心嘔吐）、SP6・HT7（不眠）、LI4（疼痛緩和）の経穴指圧エビデンスは、臨床での患者セルフケア指導や徒手療法の選択に直結する。"
    ],
    tags: ["Shiatsu","Acupressure","Systematic Review","Pain","Insomnia","Nausea","Complementary Medicine","BMC"],
    abstract: "欧米で広く普及する指圧（Shiatsu）および経穴指圧（Acupressure）の臨床エビデンスを網羅的に検証したシステマティックレビュー。80件の臨床試験（指圧9件、経穴指圧71件）を抽出。経穴指圧は疼痛、悪心嘔吐、不眠症に対して有意な臨床改善効果が示され、指圧も腰痛や睡眠改善、リラクゼーションに有望な結果を示した。重篤な有害事象はなく、安全かつ非侵襲的な補完代替療法としての有用性が確認された。"
  },
  {
    id: "musculoskeletal-pain-acupoint-stimulation-network-meta-liu-2025",
    title: "Comparison of the efficacy of acupoint stimulation therapy in the treatment of pain in musculoskeletal diseases: A network meta-analysis based on randomized controlled trials",
    japaneseTitle: "筋骨格系疾患の疼痛治療における経穴刺激療法の有効性比較：ランダム化比較試験に基づくネットワークメタアナリシス",
    authors: ["Ziwei Liu","Zedong Cheng","Kaixuan Zhang","Xingxing Lin","Yu Fu","Leichao Wang","Qiang Zhang","Feng Zhang","Xi Wu","Baoqiang Dong"],
    journal: "Journal of Pain Research",
    year: 2025,
    pmid: "40665700",
    doi: "10.1177/10538127251358729",
    studyDesign: "ネットワークメタアナリシス (Network Meta-Analysis of Randomized Controlled Trials)",
    sampleSize: 1500,
    targetCondition: "筋骨格系疾患に伴う運動器疼痛（変形性関節症、慢性頸部痛、慢性腰痛、周術期骨折疼痛など）",
    interventionProtocol: {
      name: "各種経穴刺激療法（手技鍼 AP, 電気鍼 EA, 温灸・灸療法 Moxibustion, 経穴指圧 Acupressure）",
      acupoints: ["阿是穴","GB34 (陽陵泉)","ST36 (足三里)","BL23 (腎兪)","BL40 (委中)","LI4 (合谷)","LI11 (曲池)"],
      description: "手技刺鍼（AP）、鍼通電療法（EA）、灸療法（Moxibustion）、経穴指圧（Acupressure）を各疾患プロトコルに基づき実施。"
    },
    controlProtocol: {
      name: "通常治療（通常薬物療法、標準理学療法）、シャム偽刺激対照",
      acupoints: ["Sham points / Standard Medical Care"],
      description: "標準的消炎鎮痛薬投与、通常の術後・整形外科ケア、または非経穴シャム対照。"
    },
    primaryOutcomes: "VAS（Visual Analogue Scale）疼痛スコア減少度、治療総有効率",
    secondaryOutcomes: "累積順位確率下面積（SUCRAランキング）、有害事象発現率",
    keyFindings: [
      "筋骨格系疼痛に対するネットワークメタアナリシスの結果、すべての経穴刺激療法（EA、AP、灸、指圧）が通常治療やシャム対照に比べて有意な疼痛軽減効果を示した。",
      "SUCRA順位解析において、非手術的筋骨格系疾患（慢性変形性関節症、頸腰痛等）の鎮痛効果では電気鍼（EA）が最も高い確率で第1位にランクされた。",
      "手技鍼（AP）も高い順位を維持し、術後痛や回復期においては侵襲性の低い経穴指圧や灸療法も有効な補助手段となることが示された。全治療法で安全性は高く重篤な有害事象は皆無であった。"
    ],
    clinicalTakeaways: [
      "整形外科領域の筋骨格系慢性疼痛に対しては、電気鍼（EA）による下行性抑制系賦活や内因性オピオイド放出促進が最も高い鎮痛確率（SUCRA 1位）を有するため、第一選択の鍼治療様式として推奨される。",
      "患者の病期や侵襲許容度（術後創部近傍、鍼灸恐怖など）に応じて手技鍼、温灸、経穴指圧を適切に選択・併用する科学的根拠が提供された。"
    ],
    tags: ["Musculoskeletal Pain","Network Meta-Analysis","SUCRA","Electroacupuncture","Manual Acupuncture","Acupressure","Moxibustion","Orthopedics"],
    abstract: "整形外科・筋骨格系疾患の疼痛に対する各種経穴刺激療法（手技鍼AP、電気鍼EA、灸療法、経穴指圧）の有効性と安全性を比較したネットワークメタアナリシス。各刺激療法の相対的優位性をSUCRAを用いて評価。非手術的筋骨格系慢性疼痛において電気鍼（EA）が最も高い鎮痛確率（最高ランク）を示し、手技鍼や灸・指圧も通常治療を有意に凌駕する安全で効果的な疼痛管理手法であることが立証された。"
  },
  {
    id: "cancer-pain-acupuncture-acupressure-jama-he-2020",
    title: "Clinical Evidence for Association of Acupuncture and Acupressure With Improved Cancer Pain: A Systematic Review and Meta-Analysis",
    japaneseTitle: "がん性疼痛の改善に対する鍼治療および経穴指圧の臨床的エビデンス：システマティックレビューおよびメタアナリシス",
    authors: ["Yihan He","Xinfeng Guo","Brian H. May","Anthony Lin Zhang","Yuanming Liu","Chuanjian Lu","Xinfeng Mao","Charlie Changli Xue","Hanyi Zhang"],
    journal: "JAMA Oncology",
    year: 2020,
    pmid: "31855257",
    pmcid: "PMC6990750",
    doi: "10.1001/jamaoncol.2019.5233",
    studyDesign: "システマティックレビューおよびメタアナリシス (Systematic Review & Meta-Analysis of 17 RCTs)",
    sampleSize: 1111,
    targetCondition: "がん性疼痛（悪性腫瘍に伴う慢性疼痛、骨転移痛、術後がん疼痛、神経障害性疼痛）",
    interventionProtocol: {
      name: "鍼治療（手技刺鍼・耳鍼・電気鍼）および経穴指圧（Acupressure）",
      acupoints: ["LI4 (合谷)","ST36 (足三里)","SP6 (三陰交)","PC6 (内関)","耳穴（神門、皮質下、交感、相応部位）"],
      description: "がん性疼痛患者に対する体鍼、耳鍼、または経穴指圧。鎮痛薬（オピオイド等）の併用下または単独介入。"
    },
    controlProtocol: {
      name: "シャム偽鍼/偽指圧対照、標準鎮痛薬単独療法（WHOがん疼痛治療ラダー）",
      acupoints: ["Sham points / Non-penetrating sham / Usual care"],
      description: "非経穴シャム刺激、非刺入式偽鍼、またはWHO方式がん疼痛治療ガイドラインに基づくオピオイド単独治療。"
    },
    primaryOutcomes: "疼痛強度スコア（BPI / NRS / VAS）",
    secondaryOutcomes: "オピオイド系鎮痛薬使用量（経口モルヒネ換算用量 MEDD）、生活の質（QOL）、有害事象",
    keyFindings: [
      "17件のRCT（計1,111名）をメタ解析。本物の鍼治療/経穴指圧はシャム対照と比較して疼痛強度を有意に低下させた [平均差 MD = -1.38, 95% CI: -2.13 to -0.64; P < 0.001]。",
      "鍼治療＋鎮痛薬併用群は、鎮痛薬単独群に比較して疼痛を有意に軽減させ [MD = -1.44, 95% CI: -1.98 to -0.89; P < 0.001]、オピオイド系鎮痛薬の使用量を統計学的に有意に減少させた（オピオイド節約効果）。",
      "GRADE評価において中等度のエビデンス確実性が確認され、有害事象は軽微で重篤な事故は皆無であった。"
    ],
    clinicalTakeaways: [
      "世界的権威誌JAMA Oncologyに掲載された画期的メタ解析。がん性疼痛に対し、鍼灸・経穴指圧がシャム対照を有意に凌駕する真の鎮痛効果を有することが証明された。",
      "オピオイド必要量を減少させることで、便秘、悪心、せん妄、依存性などの副作用を回避・軽減でき、がん緩和ケア（Integrative Oncology）において不可欠な補完医療である。"
    ],
    tags: ["Cancer Pain","Oncology","JAMA Oncology","Meta-Analysis","Systematic Review","Acupressure","Opioid Sparing","Palliative Care"],
    abstract: "がん性疼痛患者1,111名（17件のRCT）を対象としたシステマティックレビューおよびメタアナリシス。本物の鍼・指圧はシャム対照に比べ疼痛強度を有意に低下させ（MD = -1.38, P < 0.001）、標準鎮痛薬との併用においても単独投与を有意に凌駕（MD = -1.44, P < 0.001）。さらにオピオイド使用量の有意な削減（オピオイド節約効果）を実証し、がん緩和医療における極めて強固なエビデンスを提示した。"
  },
  {
    id: "primary-insomnia-acupuncture-double-dummy-rct-guo-2013",
    title: "Efficacy of Acupuncture for Primary Insomnia: A Randomized Controlled Clinical Trial",
    japaneseTitle: "原発性不眠症に対する鍼治療の有効性：二重ダミー・プラセボ対照ランダム化比較試験",
    authors: ["Jing Guo","Lin-Peng Wang","Cun-Zhi Liu","Jie Zhang","Gui-Ling Wang","Jing-Hong Yi","Jin-Lian Cheng"],
    journal: "Evidence-Based Complementary and Alternative Medicine",
    year: 2013,
    pmid: "24159338",
    pmcid: "PMC3789397",
    doi: "10.1155/2013/163859",
    studyDesign: "二重ダミー・単盲検・プラセボ対照ランダム化比較試験 (Double-Dummy, Single-Blind, Placebo-Controlled RCT)",
    sampleSize: 180,
    targetCondition: "原発性不眠症（Primary Insomnia, DSM-IV基準、罹患期間3か月以上）",
    interventionProtocol: {
      name: "本物鍼治療＋プラセボ錠剤併用群（Verum Acupuncture + Placebo Pill）",
      acupoints: ["GV20 (百会)","EX-HN1 (四神聡)","GV24 (神庭)","HT7 (神門)","SP6 (三陰交)","PC6 (内関)"],
      description: "0.25×25mm/40mmステンレス鍼で刺入し得気（Deqi）を獲得。30分間留鍼、週3回・6週間（計18回）。毎晩就寝前にエスタゾラムと同一外見のプラセボ錠剤を服用。"
    },
    controlProtocol: {
      name: "①エスタゾラム＋シャム鍼群（Estazolam 1mg + Sham Acupuncture）、②シャム鍼＋プラセボ薬群（Sham Acupuncture + Placebo Pill）",
      acupoints: ["非経穴点（経穴外側約1cm、浅刺1-2mm、得気なし）"],
      description: "エスタゾラム群は本物の睡眠薬（エスタゾラム1mg/日）＋非刺入/浅刺シャム鍼。プラセボ対照群はシャム鍼＋プラセボ錠剤。"
    },
    primaryOutcomes: "ピッツバーグ睡眠質問票（PSQI）総スコア変化",
    secondaryOutcomes: "エプワース眠気尺度（ESS）、SF-36（健康関連生活の質）、有害事象発現率",
    keyFindings: [
      "6週間の治療後、本物鍼群とエスタゾラム群はシャム対照群に比べてPSQIスコアが有意に改善した [鍼群 vs シャム群: P < 0.01; エスタゾラム群 vs シャム群: P < 0.01]。",
      "日中の眠気（ESSスコア）において、本物鍼群は治療後および追跡調査期においてエスタゾラム群よりも有意に良好な改善を示した [P < 0.05]。エスタゾラム群では日中の持ち越し眠気（hangover effect）が持続したのに対し、鍼治療群では日中覚醒度が有意に向上。",
      "SF-36の活力（VT）および精神的健康（MH）ドメインにおいても、鍼治療群はエスタゾラム群およびシャム群より有意に優れた改善を維持した。有害事象発現率は鍼群で著しく低かった。"
    ],
    clinicalTakeaways: [
      "二重ダミー法（Double-Dummy design）によりプラセボ効果を完全に統制した上で、鍼治療がベンゾジアゼピン系睡眠薬と同等以上の夜間睡眠改善をもたらすことを証明。",
      "睡眠薬特有の「翌朝の眠気・だるさ・認知機能低下」がなく、日中の覚醒度・活力を高める点が鍼治療の極めて大きな臨床的アドバンテージである。"
    ],
    tags: ["Primary Insomnia","RCT","Double-Dummy","PSQI","ESS","SF-36","Estazolam","Deqi","eCAM"],
    abstract: "原発性不眠症患者180名を対象とした二重ダミー・プラセボ対照RCT。本物鍼＋プラセボ薬、エスタゾラム（1mg）＋シャム鍼、シャム鍼＋プラセボ薬の3群を6週間比較。本物鍼群はPSQIスコアを有意に改善しエスタゾラムと同等の睡眠改善を示したが、エスタゾラム群で生じる日中の過度な眠気（ESS）を起こさず、日中の活力・精神的QOL（SF-36）を著しく向上させた。薬物有害事象のない優れた不眠症治療法であることが立証された。"
  },
  {
    id: "poststroke-shoulder-pain-acupuncture-meta-analysis-lee-2016",
    title: "Acupuncture for Poststroke Shoulder Pain: A Systematic Review and Meta-Analysis",
    japaneseTitle: "脳卒中後肩痛に対する鍼治療：システマティックレビューおよびメタアナリシス",
    authors: ["Sook-Hyun Lee","Sung Min Lim"],
    journal: "Evidence-Based Complementary and Alternative Medicine",
    year: 2016,
    pmid: "27547224",
    pmcid: "PMC4983325",
    doi: "10.1155/2016/3549878",
    studyDesign: "システマティックレビューおよびメタアナリシス (Systematic Review & Meta-Analysis of 12 RCTs)",
    sampleSize: 857,
    targetCondition: "脳卒中後肩痛（Poststroke Shoulder Pain / 片麻痺側肩関節痛・肩手症候群）",
    interventionProtocol: {
      name: "鍼治療（手技刺鍼・電気鍼）＋ リハビリテーション併用療法",
      acupoints: ["LI15 (肩髃)","TE14 (肩髎)","SI9 (肩貞)","GB21 (肩井)","LI11 (曲池)","LI4 (合谷)","阿是穴"],
      description: "片麻痺側肩関節周囲穴および陽明経・少陽経穴に対する刺鍼（留鍼20〜30分、または低周波通電）を標準運動療法・理学療法と併用。"
    },
    controlProtocol: {
      name: "標準リハビリテーション治療単独群（理学療法、可動域訓練、作業療法）",
      acupoints: ["No acupuncture / Rehabilitation only"],
      description: "脳卒中回復期の標準的理学療法、肩関節可動域訓練、ポジショニング、物理療法単独。"
    },
    primaryOutcomes: "VAS（Visual Analogue Scale）疼痛スコア、臨床総有効率（Effective Rate）",
    secondaryOutcomes: "Fugl-Meyer運動機能評価（FMA-UE 上肢スコア）、関節可動域（ROM）、有害事象",
    keyFindings: [
      "12件のRCT（計857名）をメタ解析。リハビリテーション治療に鍼治療を併用した群は、リハビリ単独群に比較してVAS疼痛スコアを有意に低下させた [MD = -1.86, 95% CI: -2.48 to -1.24; P < 0.00001]。",
      "臨床総有効率においても、鍼併用群はリハビリ単独群に比べ有意に優れた改善率を示した [RR = 1.31, 95% CI: 1.18 to 1.47; P < 0.00001]。",
      "さらにFugl-Meyer運動評価（FMA）上肢スコアにおいても有意な運動機能向上を促進した [MD = 8.64, 95% CI: 5.64 to 11.64; P < 0.00001]。重篤な有害事象は皆無であった。"
    ],
    clinicalTakeaways: [
      "脳卒中後片麻痺の半数に発症する難治性肩関節痛に対し、鍼治療を早期併用することで疼痛が速やかに軽減し、リハビリテーションへの参加意欲と運動機能回復が劇的に促進される。",
      "肩関節周囲の局所穴（肩髃・肩髎・肩貞）と遠道穴（曲池・合谷）の組み合わせが、痙縮抑制・可動域拡大・肩手症候群予防に奏功する。"
    ],
    tags: ["Poststroke Shoulder Pain","Stroke Rehabilitation","Meta-Analysis","Fugl-Meyer Assessment","VAS","LI15","TE14","eCAM"],
    abstract: "脳卒中後肩痛（PSSP）患者を対象とする12件のRCT（857名）のシステマティックレビューとメタアナリシス。リハビリ単独に比較して鍼治療併用群はVAS疼痛を有意に軽減（MD = -1.86, P < 0.00001）し、治療有効率を高めた（RR = 1.31）。さらにFugl-Meyer上肢運動機能スコアを有意に改善（MD = 8.64, P < 0.00001）させ、脳卒中片麻痺のリハビリテーション促進に対する強力な有効性と安全性が実証された。"
  },
  {
    id: "katakori-needling-depth-rct-osaki-2018",
    title: "Difference in effect of acupuncture needling depth on stiff shoulders: A preliminary randomized controlled trial",
    japaneseTitle: "肩こりに対する鍼の刺入深度の違いによる効果の相違－予備的ランダム化比較試験－",
    authors: ["大崎彩加 (Ayaka Osaki)","今枝美和 (Miwa Imaeda)","北小路博司 (Hiroshi Kitakoji)"],
    journal: "全日本鍼灸学会雑誌 (Journal of the Japan Society of Acupuncture and Moxibustion)",
    year: 2018,
    pmid: "医中誌 Web ID: 2020056397",
    doi: "10.3777/jjsam.68.10",
    studyDesign: "ランダム化比較試験（予備的RCT）",
    sampleSize: 16,
    targetCondition: "慢性肩こり（頸肩部筋緊張・疼痛・違和感が6カ月以上持続する患者）",
    interventionProtocol: {
      name: "深刺群（Deep Needling Group: 筋組織内刺入 10〜20mm）",
      acupoints: ["肩こり自覚部位（僧帽筋、肩甲挙筋等の圧痛点・硬結部）最大10箇所"],
      description: "40mm・18号（0.18mm）ステンレス鍼を用い、責任筋組織内に10〜20mm刺入する単刺術。得気・ひびき感を惹起。週1回・計5回。"
    },
    controlProtocol: {
      name: "浅刺群（Shallow Needling Group: 切皮のみ 約5mm）",
      acupoints: ["肩こり自覚部位最大10箇所"],
      description: "40mm・18号ステンレス鍼を用い、皮下浅層（切皮のみ、深度約5mm）にとどめる単刺術。ひびき感は惹起させない。週1回・計5回。"
    },
    primaryOutcomes: "毎回治療前後および治療終了4週後の肩こり自覚度VAS（Visual Analogue Scale）変化量",
    secondaryOutcomes: "SPADI（肩痛・機能障害指数）、刺入感覚・ひびき感の有無、治療満足度",
    keyFindings: [
      "初回治療直後のVAS改善量において、深刺群は浅刺群に比べ有意に大きな疼痛軽減を示した [浅刺群 10.9±3.8 vs 深刺群 29.6±7.2 mm, P < 0.05]。",
      "治療終了4週後の長期経過（持続効果）においても、VAS変化量は浅刺群 -1.9±5.4（治療前の状態に後戻り）に対し、深刺群 28.0±8.0 と有意な改善維持を示した [群間有意差あり, P < 0.05]。",
      "鍼の刺入感覚（浅刺0名 vs 深刺7名）およびひびき感（浅刺0名 vs 深刺8名）は深刺群で全例に発現し有意差を認めた。患者満足度も深刺群で「大変満足・満足」が100%（浅刺群は満足50%）。"
    ],
    clinicalTakeaways: [
      "日本の鍼灸臨床における最重要論点「浅刺 vs 深刺」を厳密に検証した貴重なRCT。",
      "慢性肩こりに対しては、皮膚・皮下組織にとどまる浅刺よりも、責任筋（僧帽筋・肩甲挙筋等）の筋膜・筋腹まで10〜20mm刺入し「得気・ひびき」を惹起させる深刺の方が、即効性および4週後の持続効果において明確に優位である。"
    ],
    tags: ["Katakori","Needling Depth","Deep vs Shallow","RCT","Deqi","Hibiki","Shoulder Stiffness","Trapezius","JJSAM","Japan"],
    abstract: "慢性肩こり患者16名を対象に、刺入深度の違い（浅刺約5mm vs 筋内深刺10-20mm）が鎮痛・持続効果に与える影響を比較したランダム化比較試験（明治国際医療大学）。初回直後のVAS軽減度（10.9 vs 29.6mm, P < 0.05）および治療4週後の効果持続性（-1.9 vs 28.0mm, P < 0.05）の双方において深刺群が有意に優れた。ひびき感の惹起を伴う責任筋への適切な深刺が、肩こりの長期寛解に不可欠であることが実証された。"
  }
];

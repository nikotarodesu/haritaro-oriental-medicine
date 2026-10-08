export interface GlossaryTerm {
  term: string;
  reading: string;
  category: "気血水・病態" | "経絡・経穴" | "陰陽五行・理論" | "神経生理・科学" | "診断・診察";
  oneLiner: string; // 一言での意味（中学生でもわかる平易な説明）
  analogy?: string; // 身近な例・アナロジー
  summary: string; // 詳細解説
  relatedLectureId?: string; // 関連講義ID (例: "lecture-yinyang-1")
  relatedLectureTitle?: string;
  relatedToolUrl?: string; // 関連ツールURL
  relatedToolTitle?: string;
}

export const GLOSSARY_TERMS: Record<string, GlossaryTerm> = {
  疏泄: {
    term: "疏泄",
    reading: "そせつ",
    category: "陰陽五行・理論",
    oneLiner: "伝統理論で「肝」の働きとして、気の巡りや感情の変化と結びつけて説明する概念。",
    analogy: "「交通管制センター」という、伝統的な気の巡りを覚えるための比喩。",
    summary: "伝統的には気の運行、情志、消化、月経などとの関係を学ぶ。「肝」は臓腑の理論上の分類であり、疏泄を現代医学の肝臓の機能、胆汁分泌や自律神経の制御と一対一に対応させない。症状の原因は医学的評価を通じて確認する。",
    relatedLectureId: "lecture-wuxing-4",
    relatedLectureTitle: "五行論 レッスン4：五行から五臓へ ― 機能モジュールの対応",
    relatedToolUrl: "/simulator",
    relatedToolTitle: "臨床弁証シミュレーター（肝気鬱結）"
  },
  固摂: {
    term: "固摂",
    reading: "こせつ",
    category: "気血水・病態",
    oneLiner: "伝統理論で、血・汗・尿などを保ち、漏れ出ることを防ぐと説明する気の働き。",
    analogy: "「巾着袋の口を締める紐」という、保持する働きを覚えるための比喩。",
    summary: "気の五大機能（推動・温煦・防御・固摂・気化）の一つ。伝統的には出血、多汗、尿失禁などを固摂の低下と関連づけて捉えることがある。この分類から出血や排尿の異常の原因を確定することはできず、症状に応じた医学的評価が必要。",
    relatedLectureId: "lecture-qiblood-1",
    relatedLectureTitle: "気血水理論 レッスン1：気血水の全体像と「気」の伝統的分類",
    relatedToolUrl: "/diagnosis",
    relatedToolTitle: "気血水セルフチェック"
  },
  相侮: {
    term: "相侮",
    reading: "そうぶ",
    category: "陰陽五行・理論",
    oneLiner: "本来は抑制される側が強くなりすぎて、逆に抑制する側を攻撃・圧倒してしまう異常な力関係（逆剋・いじめ返し）。",
    analogy: "「下剋上」や「猫を追い詰めたネズミが猫を噛む」状態。序列が逆転してバランスが崩れること。",
    summary: "五行の異常関係の一つ。例えば本来は金が木を剋する（金属が木を切る）が、木が強大すぎると逆に刃（金）が欠けてしまう病理。",
    relatedLectureId: "lecture-wuxing-3",
    relatedLectureTitle: "五行論 レッスン3：五行の相互作用系 ― 相生・相剋・相乗・相侮のフィードバック制御",
    relatedToolUrl: "/simulator",
    relatedToolTitle: "臨床弁証シミュレーター"
  },
  相乗: {
    term: "相乗",
    reading: "そうじょう",
    category: "陰陽五行・理論",
    oneLiner: "本来の抑制関係（相克）が過剰になりすぎて、相手を徹底的にいじめ打ちのめしてしまう病的な過剰抑制。",
    analogy: "「ブレーキを踏みすぎて車が完全停止しエンジンが壊れる」ような、過剰な制動・攻撃。",
    summary: "五行の異常関係の一つ。強い側が弱い側をさらに過剰に攻撃する。例えばストレスで肝気が昂ぶり、胃腸（脾土）を攻撃して胃痛や下痢を起こす（木乗土）。",
    relatedLectureId: "lecture-wuxing-3",
    relatedLectureTitle: "五行論 レッスン3：五行の相互作用系 ― 相生・相剋・相乗・相侮のフィードバック制御",
    relatedToolUrl: "/simulator",
    relatedToolTitle: "臨床弁証シミュレーター"
  },
  気虚: {
    term: "気虚",
    reading: "ききょ",
    category: "気血水・病態",
    oneLiner: "伝統理論で、身体を動かし保つ「気」の働きが不足していると捉える証。",
    analogy: "「バッテリーが少ない状態」という理解のための比喩で、体内のエネルギー量を測った値ではない。",
    summary: "倦怠感、疲れやすさ、声の力なさ、食欲の低下などを伝統的にまとめる分類。気虚という判断だけで疲労や息切れの原因を診断したり、検査や治療の必要性を決めたりすることはできない。症状が続く場合は医学的評価を受ける。",
    relatedLectureId: "lecture-qiblood-1",
    relatedLectureTitle: "気血水理論 レッスン1：気血水の全体像と「気」の伝統的分類",
    relatedToolUrl: "/diagnosis",
    relatedToolTitle: "気血水セルフチェック"
  },
  気滞: {
    term: "気滞",
    reading: "きたい",
    category: "気血水・病態",
    oneLiner: "伝統理論で、「気」の巡りが滞っていると捉える証。張りやつかえ、情志の変化などと関連づける。",
    analogy: "「道路の渋滞」という、気の巡りの停滞を覚えるための比喩。",
    summary: "喉のつかえ（梅核気）、胸脇部の張り、腹部膨満感、ため息などを伝統的に関連づけて学ぶ。これらの症状をすべてストレスや気滞で説明することはできず、胸部や喉の症状、消化器症状には医学的な原因の評価が必要。",
    relatedLectureId: "lecture-qiblood-1",
    relatedLectureTitle: "気血水理論 レッスン1：気血水の全体像と「気」の伝統的分類",
    relatedToolUrl: "/diagnosis",
    relatedToolTitle: "気血水セルフチェック"
  },
  気逆: {
    term: "気逆",
    reading: "きぎゃく",
    category: "気血水・病態",
    oneLiner: "伝統理論で、肺や胃などの「気」が本来の方向に逆らって上がると捉える証。",
    analogy: "「流れが逆向きになる」という、伝統的な気の方向を覚えるための比喩。",
    summary: "咳、しゃっくり、吐き気、嘔吐、げっぷ、のぼせなどを伝統的に関連づけて学ぶ。気の上昇を、空気・血液・胃の内容物が実際に逆流する機序と同一視しない。急な症状や繰り返す症状は、気逆という分類だけで判断せず医学的評価を優先する。",
    relatedLectureId: "lecture-qiblood-1",
    relatedLectureTitle: "気血水理論 レッスン1：気血水の全体像と「気」の伝統的分類",
    relatedToolUrl: "/simulator",
    relatedToolTitle: "臨床弁証シミュレーター"
  },
  血虚: {
    term: "血虚",
    reading: "けっきょ",
    category: "気血水・病態",
    oneLiner: "伝統理論で、身体を養う「血」の働きが不足していると捉える証。",
    analogy: "「植物に養分や潤いが足りない状態」という、伝統的な血の働きを覚えるための比喩。",
    summary: "顔色の淡さ、皮膚の乾燥、目の疲れ、立ちくらみなどを伝統的に関連づけて学ぶ。血虚を、造血の異常、貧血、栄養失調と同じ診断として扱わない。貧血などの確認には検査を含む医学的評価が必要で、この分類だけで鉄剤や食事療法を選ばない。",
    relatedLectureId: "lecture-qiblood-2",
    relatedLectureTitle: "気血水理論 レッスン2：「血」の働きと血虚・瘀血の伝統的分類",
    relatedToolUrl: "/diagnosis",
    relatedToolTitle: "気血水セルフチェック"
  },
  瘀血: {
    term: "瘀血",
    reading: "おけつ",
    category: "気血水・病態",
    oneLiner: "伝統理論で、「血」の巡りが滞っていると捉える証。",
    analogy: "「流れが滞った水路」という、伝統的な分類を理解するための比喩。",
    summary: "固定した部位の痛み、唇や舌の暗い色、月経時の血塊などを伝統的に関連づけて学ぶ。瘀血という分類は、血液粘稠度、血栓、静脈のうっ血、微小循環障害を検査で確認したことを意味しない。痛みや出血などの原因は医学的に評価し、自己判断で薬を始めたり中止したりしない。",
    relatedLectureId: "lecture-qiblood-2",
    relatedLectureTitle: "気血水理論 レッスン2：「血」の働きと血虚・瘀血の伝統的分類",
    relatedToolUrl: "/diagnosis",
    relatedToolTitle: "気血水セルフチェック"
  },
  水滞: {
    term: "水滞",
    reading: "すいたい",
    category: "気血水・病態",
    oneLiner: "伝統理論で、水や津液の巡りが滞っていると捉える証。痰・湿などの概念と関連づけて学ぶ。",
    analogy: "「湿気を含んで重くなった布団」という、重だるさなどを理解するための比喩。",
    summary: "重だるさ、むくみ、めまい、軟便などを伝統的に関連づけて学ぶ。水滞を、体内に汚れた水があるという意味や、むくみの原因を確定する診断として扱わない。水分の摂取・制限や利尿薬の使用は、この分類だけで決めず医学的な評価と指示に従う。",
    relatedLectureId: "lecture-qiblood-3",
    relatedLectureTitle: "気血水理論 レッスン3：「水・津液」と水滞・痰飲の伝統的分類",
    relatedToolUrl: "/diagnosis",
    relatedToolTitle: "気血水セルフチェック"
  },
  陰虚: {
    term: "陰虚",
    reading: "いんきょ",
    category: "気血水・病態",
    oneLiner: "伝統理論で、身体を潤し熱を抑えるとされる「陰」の働きが不足していると捉える証。",
    analogy: "「冷却水が少ない状態」という、陰と熱の関係を覚えるための比喩。",
    summary: "ほてり、寝汗（盗汗）、喉の渇き、赤い舌や少ない舌苔などを伝統的に関連づけて学ぶ。陰虚を脱水やホルモンの異常と同じ診断として扱わない。体重の減少や続く寝汗などは、この分類だけで説明せず医学的評価を受ける。",
    relatedLectureId: "lecture-yinyang-6",
    relatedLectureTitle: "陰陽論 レッスン6：陰陽の偏りを理解する",
    relatedToolUrl: "/simulator",
    relatedToolTitle: "臨床弁証シミュレーター"
  },
  陽虚: {
    term: "陽虚",
    reading: "ようきょ",
    category: "気血水・病態",
    oneLiner: "伝統理論で、身体を温め動かすとされる「陽」の働きが不足していると捉える証。",
    analogy: "「暖房の働きが弱い部屋」という、陽と冷えの関係を覚えるための比喩。",
    summary: "冷え、温めると和らぐ不快感、軟便、むくみなどを伝統的に関連づけて学ぶ。陽虚という分類だけで代謝や内分泌の異常を診断することはできない。強い冷えや続く排尿・消化器の症状は医学的評価を受け、温熱刺激だけで対応しない。",
    relatedLectureId: "lecture-yinyang-6",
    relatedLectureTitle: "陰陽論 レッスン6：陰陽の偏りを理解する",
    relatedToolUrl: "/simulator",
    relatedToolTitle: "臨床弁証シミュレーター"
  },
  陰陽: {
    term: "陰陽",
    reading: "いんよう",
    category: "陰陽五行・理論",
    oneLiner: "自然界や人体のあらゆる現象を、対立しつつ互いに支え合う2つの極（明と暗、動と静、熱と寒など）で捉える動的思考モデル。",
    analogy: "「コインの表と裏」や「振り子の往復運動」。どちらか片方だけでは存在できない関係。",
    summary: "東洋医学の根幹理論。身体のバランスを動的平衡として捉え、偏り（陰陽の盛衰）を整えることが治療の目標となる。",
    relatedLectureId: "lecture-yinyang-1",
    relatedLectureTitle: "陰陽論 レッスン1：陰陽とは何か",
    relatedToolUrl: "/curriculum",
    relatedToolTitle: "体系学習カリキュラム第1章"
  },
  相生: {
    term: "相生",
    reading: "そうせい",
    category: "陰陽五行・理論",
    oneLiner: "五行説で「木→火→土→金→水」の順に、親が子を生み育てるように互いを助け合い促進する促進サイクル。",
    analogy: "「木が燃えて火を生み、灰が土になり、土から金属が採れ、金属の表面に水滴が付き、水が木を育てる」という自然の育み。",
    summary: "内臓同士がエネルギーや栄養をバトンタッチして循環させる調和の仕組み。治療では「虚すればその母を補う」原則に応用される。",
    relatedLectureId: "lecture-wuxing-3",
    relatedLectureTitle: "五行論 レッスン3：五行の相互作用系 ― 相生・相剋・相乗・相侮のフィードバック制御",
    relatedToolUrl: "/simulator",
    relatedToolTitle: "臨床弁証シミュレーター"
  },
  相克: {
    term: "相克",
    reading: "そうこく",
    category: "陰陽五行・理論",
    oneLiner: "五行説で「木→土→水→火→金」の順に、相手が暴走しないよう適度に手綱を引き抑制する制御サイクル。",
    analogy: "「木が土の養分を締め、土が水を堰き止め、水が火を消し、火が金属を溶かし、金属が木を切る」というブレーキの仕組み。",
    summary: "過剰な亢進を防ぐ恒常性維持（フィードバック制御）。相生と相克が両立して初めて人体の動的平衡が保たれる。",
    relatedLectureId: "lecture-wuxing-3",
    relatedLectureTitle: "五行論 レッスン3：五行の相互作用系 ― 相生・相剋・相乗・相侮のフィードバック制御",
    relatedToolUrl: "/simulator",
    relatedToolTitle: "臨床弁証シミュレーター"
  },
  原穴: {
    term: "原穴",
    reading: "げんけつ",
    category: "経絡・経穴",
    oneLiner: "十二経脈にそれぞれ1穴ずつあり、伝統理論で原気との関係を説明する経穴の分類。",
    analogy: "路線ごとに代表駅を覚えるような、十二経脈と経穴の対応を学ぶための分類。",
    summary: "十二経脈の計12穴を指す。伝統的な診察や選穴で重視されるが、原穴の圧痛や反応だけで内臓の病気を診断することはできない。原気・臓腑との関連づけと、現代医学の診断や臨床効果の評価を区別する。",
    relatedLectureId: "lecture-treatment-8",
    relatedLectureTitle: "経絡・経穴を選択する",
    relatedToolUrl: "/tsubo",
    relatedToolTitle: "経穴辞典（原穴フィルター）"
  },
  四関: {
    term: "四関",
    reading: "しかん",
    category: "経絡・経穴",
    oneLiner: "左右の合谷（LI4）と左右の太衝（LR3）、計4穴を組み合わせる伝統的な配穴。",
    analogy: "手と足にある4つの関所という、組み合わせを覚えるためのイメージ。",
    summary: "『針灸大成』では、四関を左右の合谷と太衝と記す。伝統理論では気血の巡りなどに関連づけて学ぶ。全身の不調への万能処方、即効性や経穴の組み合わせの優越性が確立した治療としては扱わず、対象疾患と施術条件ごとの臨床研究を確認する。",
    relatedLectureId: "lecture-treatment-6",
    relatedLectureTitle: "血・津液への治法を整理する",
    relatedToolUrl: "/practice/haiketsu",
    relatedToolTitle: "配穴設計"
  },
  四総穴: {
    term: "四総穴",
    reading: "しそうけつ",
    category: "経絡・経穴",
    oneLiner: "腹部・腰背部・頭と後頸部・顔と口に対応づけて覚える、足三里・委中・列欠・合谷の4穴。",
    analogy: "身体の4つの範囲と代表穴を結ぶ、伝統的な学習用の地図。",
    summary: "『針灸大成』の四総穴歌は「肚腹は三里に留め、腰背は委中に求む、頭項は列欠に尋ね、面口は合谷に収む」。腹部は足三里（ST36）、腰背部は委中（BL40）、頭・後頸部は列欠（LU7）、顔・口は合谷（LI4）と関連づける歌訣で、胸部はこの4部位に含まれない。この対応だけで各部位の病気への適応や治療効果が決まるわけではない。",
    relatedLectureId: "lecture-treatment-8",
    relatedLectureTitle: "経絡・経穴を選択する",
    relatedToolUrl: "/tsubo",
    relatedToolTitle: "経穴辞典"
  },
  得気: {
    term: "得気",
    reading: "とっき",
    category: "経絡・経穴",
    oneLiner: "刺鍼中の重だるさなどの患者の感覚や、施術者が感じる抵抗を伝統的に説明する用語。",
    analogy: "実習で共有する感覚の表現。感じ方は刺激の条件や個人によって異なります。",
    summary: "患者が感じたことと、施術者が触知したことを分けて記録します。得気の有無だけでは適切な刺入深度、安全性、患者の症状改善を判断できません。組織の機械的反応や神経の研究と、臨床効果を区別して学びます。",
    relatedLectureId: "lecture-treatment-3",
    relatedLectureTitle: "補瀉・寒熱の原則を理解する",
    relatedToolUrl: "/articles/science-of-acupuncture-neuroscience",
    relatedToolTitle: "鍼灸の科学：作用機序と臨床効果を分けて読む"
  },
  五労: {
    term: "五労",
    reading: "ごろう",
    category: "診断・診察",
    oneLiner: "日常の偏った動作の継続によって五臓を痛めてしまう、古典『素問』が説く東洋医学版「職業病」。",
    analogy: "「使いすぎによる偏摩耗」。同じ姿勢ばかり続けると特定のパーツだけが消耗する現象。",
    summary: "「久視は血を傷り（心）、久臥は気を傷り（肺）、久坐は肉を傷り（脾）、久立は骨を傷り（腎）、久行は筋を傷る（肝）」。",
    relatedLectureId: "lecture-pathomechanism-8",
    relatedLectureTitle: "情志・飲食・労倦から病態を考える",
    relatedToolUrl: "/diagnosis?tab=gorou",
    relatedToolTitle: "五労チェッカー"
  },
  弁証論治: {
    term: "弁証論治",
    reading: "べんしょうろんち",
    category: "診断・診察",
    oneLiner: "患者の全身所見を観察して根本の病態パターン（証）を見極め（弁証）、その原因に応じたオーダーメイド治療法を決める（論治）思考法。",
    analogy: "「探偵が散らばった証拠を集めて真犯人を突き止め、的確な解決策を打つ」一連の推理と実行プロセス。",
    summary: "東洋医学の臨床思考の真髄。同一の病気でも体質により異なる治療をし（同病異治）、異なる病気でも同じ体質なら共通の治療をする（異病同治）。",
    relatedLectureId: "lecture-diagnosis-11",
    relatedLectureTitle: "証を統合し、判断を記録する",
    relatedToolUrl: "/simulator",
    relatedToolTitle: "臨床弁証シミュレーター"
  },
  合谷: {
    term: "合谷",
    reading: "ごうこく",
    category: "経絡・経穴",
    oneLiner: "手の甲の親指と人差し指の骨の間にある、手の陽明大腸経の原穴（LI4）。",
    analogy: "四総穴歌で顔や口との対応を覚える、経穴の地図の目印。",
    summary: "手の陽明大腸経の原穴で、四総穴歌では顔・口と関連づける。頭痛や歯痛などの伝統的な主治を学び、太衝と合わせる四関の構成穴でもある。鍼治療全体の研究結果と合谷単独の効果を区別し、すべての痛みに必須の穴とは扱わない。痛みの原因の医学的評価を優先する。",
    relatedLectureId: "lecture-treatment-8",
    relatedLectureTitle: "経絡・経穴を選択する",
    relatedToolUrl: "/tsubo/li4",
    relatedToolTitle: "合谷（LI4）経穴辞典"
  },
  太衝: {
    term: "太衝",
    reading: "たいしょう",
    category: "経絡・経穴",
    oneLiner: "足の甲の第1・第2中足骨の間にある、足の厥陰肝経の原穴・兪土穴（LR3）。",
    analogy: "伝統的な肝の分類と経穴の対応を覚える、経絡の路線図の目印。",
    summary: "伝統理論では肝気鬱結・肝火上炎などの証や、頭痛・目の充血・月経の不調と関連づけて学ぶ。合谷と合わせる四関の構成穴。これらの伝統的な関連は、肝臓の病気の診断や血圧低下、PMSの即時改善を保証しない。",
    relatedLectureId: "lecture-treatment-8",
    relatedLectureTitle: "経絡・経穴を選択する",
    relatedToolUrl: "/tsubo/lr3",
    relatedToolTitle: "太衝（LR3）経穴辞典"
  },
  足三里: {
    term: "足三里",
    reading: "あしのさんり",
    category: "経絡・経穴",
    oneLiner: "膝より下、すねの外側にある、足の陽明胃経の合土穴・胃の下合穴（ST36）。",
    analogy: "四総穴歌で腹部との対応を覚える、経穴の地図の目印。",
    summary: "四総穴歌では腹部と関連づける。伝統的には胃腸の不調、食欲不振、疲れなどの主治を学ぶ。足三里の刺激による作用機序の研究、患者を対象にした鍼治療の研究、足三里単独の臨床効果を分けて読む。免疫の増強や疲労回復を一律に保証する穴としては扱わない。",
    relatedLectureId: "lecture-treatment-8",
    relatedLectureTitle: "経絡・経穴を選択する",
    relatedToolUrl: "/tsubo/st36",
    relatedToolTitle: "足三里（ST36）経穴辞典"
  },
  三陰交: {
    term: "三陰交",
    reading: "さんいんこう",
    category: "経絡・経穴",
    oneLiner: "内くるぶしより上、すねの内側にある、足の太陰脾経の経穴（SP6）。伝統的には脾・肝・腎の三陰経の交会穴。",
    analogy: "3つの路線が交わる駅という、経絡の分類を覚えるためのイメージ。",
    summary: "伝統的には月経痛・月経不順、冷え、不眠、むくみなどと関連づけるが、ホルモンや血流の正常化、三陰交単独の広い治療効果を保証する説明ではない。妊娠中の施術は個別評価を要し、三陰交に限らず強い刺激を避ける。自己判断で刺激せず、産科医と有資格鍼灸師に相談する。",
    relatedLectureId: "lecture-treatment-6",
    relatedLectureTitle: "血・津液への治法を整理する",
    relatedToolUrl: "/tsubo/sp6",
    relatedToolTitle: "三陰交（SP6）経穴辞典"
  },
  内関: {
    term: "内関",
    reading: "ないかん",
    category: "経絡・経穴",
    oneLiner: "手首より肘側、前腕の内側にある、手の厥陰心包経の絡穴・八脈交会穴（PC6）。",
    analogy: "前腕にある経穴と、伝統的な主治や臨床研究を結びつけて学ぶための目印。",
    summary: "伝統分類では陰維脈との関係を学び、吐き気や胸部の不快感などの主治が挙げられる。鍼・電気刺激・指圧バンドは異なる介入であり、研究対象と比較条件を確認する。がん治療に伴う吐き気の研究を、乗り物酔い、動悸、パニック症状にそのまま一般化しない。",
    relatedLectureId: "lecture-treatment-5",
    relatedLectureTitle: "気への治法を整理する",
    relatedToolUrl: "/tsubo/pc6",
    relatedToolTitle: "内関（PC6）経穴辞典"
  },
  百会: {
    term: "百会",
    reading: "ひゃくえ",
    category: "経絡・経穴",
    oneLiner: "頭頂部にある督脈の経穴（GV20）。伝統理論では昇提などの治法と関連づけて学ぶ。",
    analogy: "頭部の経穴を覚えるための、頭頂部の目印。",
    summary: "伝統的には頭部の症状や中気下陥などの証と関連づける。昇提という説明を、内臓下垂の治癒や自律神経の正常化が実証された作用と同一視しない。不眠やうつ症状については疾患と介入条件ごとに臨床研究を確認し、必要な医学的評価につなげる。",
    relatedLectureId: "lecture-treatment-5",
    relatedLectureTitle: "気への治法を整理する",
    relatedToolUrl: "/tsubo/gv20",
    relatedToolTitle: "百会（GV20）経穴辞典"
  },
  関元: {
    term: "関元",
    reading: "かんげん",
    category: "経絡・経穴",
    oneLiner: "おへその下3寸にある任脈の経穴・小腸の募穴（CV4）。寸は体表の位置を表す比例尺度。",
    analogy: "原気との関係を伝統理論で覚える、下腹部の経穴の目印。",
    summary: "伝統的には足の三陰経との交会や温補の治法を学び、冷えや排尿の不調などと関連づける。灸・温熱刺激の研究を経穴単独の効果と区別し、頻尿、勃起不全、慢性的な疲労の改善を保証しない。妊娠中の腹部への施術は特に慎重な評価が必要。体表の寸数は刺入深度や灸量の指示ではない。",
    relatedLectureId: "lecture-treatment-5",
    relatedLectureTitle: "気への治法を整理する",
    relatedToolUrl: "/tsubo/cv4",
    relatedToolTitle: "関元（CV4）経穴辞典"
  },
  中脘: {
    term: "中脘",
    reading: "ちゅうかん",
    category: "経絡・経穴",
    oneLiner: "上腹部にある任脈の経穴・胃の募穴・八会穴の腑会（CV12）。",
    analogy: "伝統分類で六腑との関係を覚える、上腹部の経穴の目印。",
    summary: "伝統的な主治として胃痛、胃もたれ、呑酸、食欲不振、腹部膨満などを学ぶ。症状の原因や適応は経穴の分類だけで判断できず、すべての消化器疾患に有効という意味ではない。強い腹痛や急な症状は医学的評価を優先する。",
    relatedLectureId: "lecture-treatment-8",
    relatedLectureTitle: "経絡・経穴を選択する",
    relatedToolUrl: "/tsubo/cv12",
    relatedToolTitle: "中脘（CV12）経穴辞典"
  },
  天枢: {
    term: "天枢",
    reading: "てんすう",
    category: "経絡・経穴",
    oneLiner: "おへその左右2寸にある、足の陽明胃経の経穴・大腸の募穴（ST25）。",
    analogy: "伝統理論で大腸との関係を覚える、おへその左右の目印。",
    summary: "伝統的には便秘、下痢、腹痛などの主治を学ぶ。天枢への刺激が腸の運動を必ず正常化する、あるいは過敏性腸症候群（IBS）を治すという説明は避け、対象疾患・施術方法・比較群を確認する。体表の位置を表す寸数から刺入深度を決めることはできない。",
    relatedLectureId: "lecture-diagnosis-6",
    relatedLectureTitle: "切診の情報を扱う",
    relatedToolUrl: "/tsubo/st25",
    relatedToolTitle: "天枢（ST25）経穴辞典"
  },
  風池: {
    term: "風池",
    reading: "ふうち",
    category: "経絡・経穴",
    oneLiner: "後頭部と首の境付近にある、足の少陽胆経の経穴（GB20）。",
    analogy: "頭や首との伝統的な関連を覚える、後頭部の経穴の目印。",
    summary: "伝統的には頭痛、肩こり、目の症状や風邪（ふうじゃ）と関連づける。風邪という伝統概念とウイルスなどによる感染症を区別し、感染予防、血流の回復、めまいの即時改善を保証しない。首の深部には重要な神経・血管があるため、この説明から自己刺鍼の方法を判断しない。",
    relatedLectureId: "lecture-treatment-8",
    relatedLectureTitle: "経絡・経穴を選択する",
    relatedToolUrl: "/tsubo/gb20",
    relatedToolTitle: "風池（GB20）経穴辞典"
  },
  委中: {
    term: "委中",
    reading: "いちゅう",
    category: "経絡・経穴",
    oneLiner: "膝裏の中央にある、足の太陽膀胱経の合土穴（BL40）。四総穴歌では腰背部と関連づける。",
    analogy: "腰背部と膝裏の経穴の対応を覚える、経穴の地図の目印。",
    summary: "四総穴歌の「腰背は委中に求む」に挙げられる穴。伝統的には腰痛や下肢の症状を学ぶが、筋膜の緊張や坐骨神経領域の痛みを必ず解消するという意味ではない。鍼治療全体の腰痛研究を委中単独の効果に置き換えず、痛みの原因と施術条件を確認する。",
    relatedLectureId: "lecture-treatment-8",
    relatedLectureTitle: "経絡・経穴を選択する",
    relatedToolUrl: "/tsubo/bl40",
    relatedToolTitle: "委中（BL40）経穴辞典"
  }
};

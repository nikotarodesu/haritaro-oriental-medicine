import { REFLECTION_LECTURES } from '@/data/learningReflectionCatalog';

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

const GLOSSARY_DEFINITIONS: Record<string, GlossaryTerm> = {
  疏泄: {
    term: "疏泄",
    reading: "そせつ",
    category: "陰陽五行・理論",
    oneLiner: "伝統理論で「肝」の働きとして、気の巡りや感情の変化と結びつけて説明する概念。",
    analogy: "「交通管制センター」という、伝統的な気の巡りを覚えるための比喩。",
    summary: "伝統的には気の運行、情志、消化、月経などとの関係を学ぶ。「肝」は臓腑の理論上の分類であり、疏泄を現代医学の肝臓の機能、胆汁分泌や自律神経の制御と一対一に対応させない。症状の原因は医学的評価を通じて確認する。",
    relatedLectureId: "lecture-zangfu-4",
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
    relatedToolUrl: "/diagnosis",
    relatedToolTitle: "気血水セルフチェック"
  },
  相侮: {
    term: "相侮",
    reading: "そうぶ",
    category: "陰陽五行・理論",
    oneLiner: "五行の伝統理論で、相剋とは逆向きの関係を説明する用語。逆剋とも呼ぶ。",
    analogy: "相剋の矢印を逆向きにたどる、関係の方向を覚えるための比喩。",
    summary: "例えば相剋の金から木への向きに対し、木から金へ向かう関係を木侮金と説明する。相乗は相剋と同じ向きの過度な抑制、相侮は逆向きの関係として区別する。これは伝統分類であり、臓器間の損傷や病気の原因を確認したことを意味しない。",
    relatedLectureId: "lecture-wuxing-3",
    relatedToolUrl: "/simulator",
    relatedToolTitle: "臨床弁証シミュレーター"
  },
  相乗: {
    term: "相乗",
    reading: "そうじょう",
    category: "陰陽五行・理論",
    oneLiner: "五行の伝統理論で、相剋と同じ向きの抑制が過度になった関係を説明する用語。",
    analogy: "同じ向きの矢印を太く描く、関係の強さを覚えるための比喩。",
    summary: "例えば木から土への抑制が過度な関係を木乗土と説明する。抑制する側の過剰や、受ける側の不足などを考える伝統的なモデルであり、ストレスや臓器の損傷が胃痛・下痢の原因だと確定する説明ではない。相侮との違いは、まず矢印の向きで確認する。",
    relatedLectureId: "lecture-wuxing-3",
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
    relatedLectureId: "lecture-pathomechanism-3",
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
    relatedLectureId: "lecture-pathomechanism-3",
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
    relatedLectureId: "lecture-pathomechanism-3",
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
    relatedLectureId: "lecture-pathomechanism-5",
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
    relatedLectureId: "lecture-pathomechanism-5",
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
    relatedLectureId: "lecture-pathomechanism-4",
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
    relatedToolUrl: "/simulator",
    relatedToolTitle: "臨床弁証シミュレーター"
  },
  陰陽: {
    term: "陰陽",
    reading: "いんよう",
    category: "陰陽五行・理論",
    oneLiner: "伝統理論で、明暗・動静・寒熱など、対になる性質を比較して関係や変化を捉える考え方。",
    analogy: "コインの表と裏のように、一つの対象の異なる面を比較するための比喩。",
    summary: "何と何を、どの基準で比較したかを示して用いる。対立・制約・互根・消長・転化などの関係を学ぶが、交感神経と副交感神経などの生理機構と一対一に対応する分類ではない。陰陽の説明だけで病気や治療方法を確定しない。",
    relatedLectureId: "lecture-yinyang-1",
    relatedToolUrl: "/curriculum",
    relatedToolTitle: "体系学習カリキュラム・陰陽論"
  },
  相生: {
    term: "相生",
    reading: "そうせい",
    category: "陰陽五行・理論",
    oneLiner: "五行の伝統理論で、木→火→土→金→水→木の向きに、生み助ける関係を説明する用語。",
    analogy: "生む側を母、生まれる側を子と呼んで、関係の向きを覚えるための比喩。",
    summary: "例えば土生金では、土が母、金が子となる。この矢印は伝統モデルの関係であり、臓器間の栄養やエネルギーの流れを測定したものではない。関係の説明を、病気の原因や介入の効果が確定したという判断に置き換えない。",
    relatedLectureId: "lecture-wuxing-3",
    relatedToolUrl: "/simulator",
    relatedToolTitle: "臨床弁証シミュレーター"
  },
  相克: {
    term: "相克",
    reading: "そうこく",
    category: "陰陽五行・理論",
    oneLiner: "五行の伝統理論で、木→土→水→火→金→木の向きに、制約する関係を説明する用語。相剋とも書く。",
    analogy: "ブレーキのように行き過ぎを抑える、関係を覚えるための比喩。",
    summary: "例えば木剋土では、木が土を制約する向きで読む。相生と併せて調和を説明する伝統モデルであり、現代医学の恒常性維持やフィードバックと同一の生理機構ではない。臓器の疾患や治療の効果を、この関係だけから判断しない。",
    relatedLectureId: "lecture-wuxing-3",
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
    relatedToolUrl: "/articles/science-of-acupuncture-neuroscience",
    relatedToolTitle: "鍼灸の科学：作用機序と臨床効果を分けて読む"
  },
  五労: {
    term: "五労",
    reading: "ごろう",
    category: "診断・診察",
    oneLiner: "伝統理論で、長く見る・臥す・座る・立つ・歩くという五つの活動の偏りを捉える観点。",
    analogy: "一日の活動を五つの欄に分け、偏りや休息を振り返るための見方。",
    summary: "久視・久臥・久坐・久立・久行と、血・気・肉・骨・筋との伝統的な関連を学ぶ。活動時間だけで臓器の損傷や職業病を診断する分類ではない。実際の負担は時間・姿勢・休息・症状などを分けて確認する。ここでは古典の底本・原文・訳文の照合済み引用とは扱わない。",
    relatedLectureId: "lecture-pathomechanism-8",
    relatedToolUrl: "/diagnosis?tab=gorou",
    relatedToolTitle: "五労チェッカー"
  },
  弁証論治: {
    term: "弁証論治",
    reading: "べんしょうろんち",
    category: "診断・診察",
    oneLiner: "所見を伝統医学の枠組みで整理して証を考える弁証と、それに応じた方針を検討する論治をつなぐ考え方。",
    analogy: "材料を整理して仮の見通しを立て、新しい情報があれば計画を見直す過程。",
    summary: "支持する情報、合わない情報、未確認事項を併記する。同病異治・異病同治は、病名と証・治法の関係を説明する伝統的な考え方であり、体質だけで方法や効果が決まるという意味ではない。証を整理しても医学的な原因が確定したことにはならず、安全性や本人の希望を別に確認する。",
    relatedLectureId: "lecture-diagnosis-11",
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
    relatedToolUrl: "/tsubo/bl40",
    relatedToolTitle: "委中（BL40）経穴辞典"
  }
};

const lectureTitles = new Map(REFLECTION_LECTURES.map(lecture => [lecture.id, lecture.title]));
export const GLOSSARY_TERMS: Record<string, GlossaryTerm> = Object.fromEntries(Object.entries(GLOSSARY_DEFINITIONS).map(([key, term]) => [key, {
  ...term, relatedLectureTitle: term.relatedLectureId ? lectureTitles.get(term.relatedLectureId) : undefined,
}]));

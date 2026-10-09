import { FOUNDATION_QUIZZES } from "./curriculumFoundationQuizzes";
import { CURRICULUM_CHAPTERS_META } from "./curriculumOutline";

// 全章の講義に対応する3択の理解度チェック。本文データをクライアントへ取り込まない。
// 各レッスン3問構成・完全3択（A, B, C）・合格ライン: 3問中2問以上正解でレッスンクリア！

import type { LessonQuizGroup } from "./curriculumQuizTypes";
export type { QuizQuestionItem, LessonQuizGroup } from "./curriculumQuizTypes";
export { getQuizSectionTitle } from "./curriculumQuizTypes";

const EXISTING_CURRICULUM_QUIZZES: Record<string, LessonQuizGroup> = {
  "lecture-yinyang-1": {
  "lectureId": "lecture-yinyang-1",
  "chapterId": "yinyang",
  "chapterTitle": "第2章 陰陽論",
  "lectureTitle": "陰陽論 レッスン1：陰陽とは何か",
  "passingScore": 2,
  "questions": [
    {
      "id": "lecture-yinyang-1-q1",
      "question": "【陰陽の基本的な捉え方】東洋医学における「陰陽」の概念として、最も適切な理解はどれですか？",
      "options": [
        "対になる性質を比較する関係・変化のモデル",
        "物質の有無を基準に決める固定した区分",
        "精神活動だけを比較する感情の区分"
      ],
      "correctIndex": 0,
      "explanation": "陰陽論は、動と静、熱と寒などの性質を比較する伝統的な説明モデルです。比較の基準が変われば分類も変わり、病気の原因を直接測定・診断する指標とは区別します。",
      "relatedSectionTitle": "1. 陰陽論が目指す目的"
    },
    {
      "id": "lecture-yinyang-1-q2",
      "question": "【陰陽の基本性質】伝統的な陰陽配属の代表例として、最も適切な組み合わせはどれですか？",
      "options": [
        "陽＝動・寒・内向 ／ 陰＝静・熱・外向",
        "陽＝動・熱・外向 ／ 陰＝静・寒・内向",
        "陽＝静・熱・内向 ／ 陰＝動・寒・外向"
      ],
      "correctIndex": 1,
      "explanation": "伝統的な分類では、陽は動・熱・外向・機能、陰は静・寒・内向・物質に関連づけられます。陰陽と虚実は同義ではなく、この配属から体温や神経活動を判定することはできません。",
      "relatedSectionTitle": "2. 陰陽の基本性質"
    },
    {
      "id": "lecture-yinyang-1-q3",
      "question": "【自律神経との比較】陰陽と交感神経・副交感神経を比較するとき、最も適切な説明はどれですか？",
      "options": [
        "神経との比較は定義、神経活動は未測定",
        "神経との比較は比喩、神経活動は測定済み",
        "神経との比較は比喩、神経活動は未測定"
      ],
      "correctIndex": 2,
      "explanation": "陰陽は伝統医学の分類で、自律神経は神経系の構造と機能に関する概念です。比喩と医学的な同一性を区別し、神経機能の評価は症状・診察・心拍や血圧などの検査に基づいて行います。",
      "relatedSectionTitle": "3. 身近な例で理解する陰陽"
    }
  ]
},
  "lecture-yinyang-2": {
  "lectureId": "lecture-yinyang-2",
  "chapterId": "yinyang",
  "chapterTitle": "第2章 陰陽論",
  "lectureTitle": "陰陽論 レッスン2：陰陽は比較によって決まる",
  "passingScore": 2,
  "questions": [
    {
      "id": "lecture-yinyang-2-q1",
      "question": "【比較の基準】20℃の水を温度の観点から氷と60℃のお湯に比べると、どう整理できますか？",
      "options": [
        "氷より陽、お湯より陰",
        "氷より陰、お湯より陽",
        "比較相手を変えても常に陰"
      ],
      "correctIndex": 0,
      "explanation": "同じ水でも比較する温度が変われば配属は変わります。氷より温かいため陽、お湯より冷たいため陰と整理できます。水の病理的性質や医学的状態を判定する問題ではありません。",
      "relatedSectionTitle": "1. 比較する対象・基準の重要性"
    },
    {
      "id": "lecture-yinyang-2-q2",
      "question": "【陰陽の相対性と基準】東洋医学において「上半身は陽、下半身は陰」と分類されますが、上半身の中でも「背部」と「胸腹部」を比較した場合の正しい解釈はどれですか？",
      "options": [
        "背部＝陽中の陰、胸腹部＝陽中の陽",
        "背部＝陽中の陽、胸腹部＝陽中の陰",
        "背部と胸腹部はともに陽中の陽"
      ],
      "correctIndex": 1,
      "explanation": "陰陽可分では、大きな区分の中を別の基準でさらに分けます。この設問は伝統的な部位の配属を学ぶ例であり、解剖学的な位置や病変をその分類で測定できるという意味ではありません。",
      "relatedSectionTitle": "② 人体構造の陰陽可分"
    },
    {
      "id": "lecture-yinyang-2-q3",
      "question": "【陰陽可分の原則】「昼（陽）の中にも、午前（陽中の陽）と午後（陽中の陰）がある」というように、陰陽の中にさらに陰陽が存在する性質を何と呼びますか？",
      "options": [
        "陰陽対立",
        "陰陽互根",
        "陰陽可分"
      ],
      "correctIndex": 2,
      "explanation": "陰陽の中を、基準を変えてさらに分けることを「陰陽可分」と呼びます。昼夜の区分は伝統的な説明であり、その四区分がホルモン量や自律神経活動を表すわけではありません。",
      "relatedSectionTitle": "2. 陰陽可分（いんようかぶん）：どこまでも細かく分けられる多層構造"
    }
  ]
},
  "lecture-yinyang-3": {
  "lectureId": "lecture-yinyang-3",
  "chapterId": "yinyang",
  "chapterTitle": "第2章 陰陽論",
  "lectureTitle": "陰陽論 レッスン3：陰陽はどう関係するか",
  "passingScore": 2,
  "questions": [
    {
      "id": "lecture-yinyang-3-q1",
      "question": "【陰陽制約】陰陽制約と現代の負のフィードバックを比較する際の理解として、最も適切なものはどれですか？",
      "options": ["調節の関係は比喩、同一の機序は未検証","調節の関係は比喩、同一の機序は検証済","調節の関係は測定、同一の機序は検証済"],
      "correctIndex": 0,
      "explanation": "陰陽制約は、互いの偏りを抑えるという伝統的な関係の説明です。フィードバックとの比較は理解を助けますが、測定や実験に基づく現代医学の機構と同一視しません。",
      "relatedSectionTitle": "2. 陰陽制約（いんようせいやく）"
    },
    {
      "id": "lecture-yinyang-3-q2",
      "question": "【陰陽互根】「孤陰不生、独陽不長」という伝統的な説明の意味として、最も適切なものはどれですか？",
      "options": [
        "互いの過剰を抑える関係",
        "互いが成り立つ前提になる関係",
        "一方の性質が他方へ変わる関係"
      ],
      "correctIndex": 1,
      "explanation": "陰陽互根は、陰陽が互いを存在の前提とするという伝統的な考え方です。現代医学の生存条件や、特定の治療効果を保証する法則として扱うものではありません。",
      "relatedSectionTitle": "3. 陰陽互根（いんようごこん）"
    },
    {
      "id": "lecture-yinyang-3-q3",
      "question": "【医学的評価の優先】感染症に伴って意識の異常や息苦しさがある人への対応として、最も適切なものはどれですか？",
      "options": ["陰陽の分類を先に確定して受診へつなぐ","症状の時間変化を先に記録して受診へつなぐ","緊急性の医学的評価を先に行い医療へつなぐ"],
      "correctIndex": 2,
      "explanation": "感染症に伴う意識の異常や息苦しさは、敗血症などでもみられます。陰陽だけで原因や重症度を確定することはできないため、速やかな医学的評価を優先し、鍼灸施術などで救急対応を遅らせてはいけません。",
      "relatedSectionTitle": "4. 臨床における着眼点"
    }
  ]
},
  "lecture-yinyang-4": {
  "lectureId": "lecture-yinyang-4",
  "chapterId": "yinyang",
  "chapterTitle": "第2章 陰陽論",
  "lectureTitle": "陰陽論 レッスン4：陰陽はどう変化するか",
  "passingScore": 2,
  "questions": [
    {
      "id": "lecture-yinyang-4-q1",
      "question": "【陰陽消長】伝統理論で、昼夜の陽気と陰気の移り変わりのように、増減を捉える概念を何と呼びますか？",
      "options": [
        "陰陽消長",
        "陰陽転化",
        "陰陽互根"
      ],
      "correctIndex": 0,
      "explanation": "陰陽消長は、陰と陽が関係しながら増減することを捉える伝統的な概念です。昼夜はその学習例であり、特定の神経活動やホルモン量を測定しているわけではありません。",
      "relatedSectionTitle": "1. 陰陽消長（いんようしょうちょう）"
    },
    {
      "id": "lecture-yinyang-4-q2",
      "question": "【消長と転化】伝統モデルの「増えた・減った」と「性質が反対へ変わった」を読むとき、適切なのはどれですか？",
      "options": [
        "消長＝性質の変化、転化＝量の増減",
        "消長＝量の増減、転化＝性質の変化",
        "消長＝相互依存、転化＝相互の抑制"
      ],
      "correctIndex": 1,
      "explanation": "消長は増減、転化は一定条件での性質の変化を表す伝統概念です。量の増加だけで転化が起きたとは言えません。症状の急変があれば分類だけで原因を決めず、医学的評価を優先します。",
      "relatedSectionTitle": "2. 陰陽転化（いんようてんか）"
    },
    {
      "id": "lecture-yinyang-4-q3",
      "question": "【臨床での変化の捉え方】患者の病態変化を観察する上で、臨床家が最も心掛けるべき視点はどれですか？",
      "options": [
        "初診時の分類を優先して後の変化を説明する",
        "日内変動は除き最も強い症状の時点だけ比較する",
        "時間経過と意識・呼吸の変化を確認する"
      ],
      "correctIndex": 2,
      "explanation": "症状の経過を記録し、原因や緊急性を確認することが大切です。陰陽の消長・転化は伝統的な学習概念であり、それだけで予後や治療効果を予測できるものではありません。",
      "relatedSectionTitle": "3. 変化を観察する3つの視点"
    }
  ]
},
  "lecture-yinyang-5": {
  "lectureId": "lecture-yinyang-5",
  "chapterId": "yinyang",
  "chapterTitle": "第2章 陰陽論",
  "lectureTitle": "陰陽論 レッスン5：身体を陰陽で捉える",
  "passingScore": 2,
  "questions": [
    {
      "id": "lecture-yinyang-5-q1",
      "question": "【身体の部位の陰陽】身体の部位に関する伝統的な陰陽配属の代表例として、正しい組み合わせはどれですか？",
      "options": [
        "上・背・表＝陽 ／ 下・腹・深部＝陰",
        "上・腹・深部＝陽 ／ 下・背・表＝陰",
        "下・背・深部＝陽 ／ 上・腹・表＝陰"
      ],
      "correctIndex": 0,
      "explanation": "伝統的な配属では、上下・背腹・表裏といった比較の視点を示します。この分類から神経や血管の位置・働き、安全な施術部位を判断することはできません。",
      "relatedSectionTitle": "1. 身体の部位の陰陽"
    },
    {
      "id": "lecture-yinyang-5-q2",
      "question": "【蔵象の陰陽】五臓（肝・心・脾・肺・腎）と六腑（胆・小腸・胃・大腸・膀胱・三焦）の伝統的な役割の説明として、正しいものはどれですか？",
      "options": [
        "五臓＝陽・伝化する ／ 六腑＝陰・蔵する",
        "五臓＝陰・蔵する ／ 六腑＝陽・伝化する",
        "五臓＝陰・伝化する ／ 六腑＝陽・蔵する"
      ],
      "correctIndex": 1,
      "explanation": "蔵象の配属を学ぶ際には、「蔵する」と「通す」という伝統的な役割を区別します。三焦なども含むため、現代解剖学の臓器の構造や機能と一対一に同一視しません。",
      "relatedSectionTitle": "2. 蔵象の陰陽"
    },
    {
      "id": "lecture-yinyang-5-q3",
      "question": "【現代生理学との比較】身体の陰陽配属と自律神経・炎症の評価を比較するとき、最も適切な理解はどれですか？",
      "options": [
        "陰陽は炎症分類、炎症は同じ分類の別名",
        "陰陽は伝統分類、炎症はその配属で確定",
        "陰陽は伝統分類、炎症は別の医学的評価"
      ],
      "correctIndex": 2,
      "explanation": "伝統分類から神経活動や検査値は判定できません。実熱と炎症、実寒と血管攣縮などの固定的な対応も避け、医学的な原因の評価を別に行います。",
      "relatedSectionTitle": "3. 機能と物質・現代生理学との比較"
    }
  ]
},
  "lecture-yinyang-6": {
  "lectureId": "lecture-yinyang-6",
  "chapterId": "yinyang",
  "chapterTitle": "第2章 陰陽論",
  "lectureTitle": "陰陽論 レッスン6：陰陽の偏りを理解する",
  "passingScore": 2,
  "questions": [
    {
      "id": "lecture-yinyang-6-q1",
      "question": "【陰平陽秘】伝統医学で、陰陽の調和した状態を表す言葉はどれですか？",
      "options": [
        "陰平陽秘",
        "重陽必陰",
        "熱極生寒"
      ],
      "correctIndex": 0,
      "explanation": "「陰平陽秘」は、伝統医学で陰陽の調和を表す言葉です。この概念だけで現代医学の健康状態や病気の原因を判定できるという意味ではありません。",
      "relatedSectionTitle": "導入：伝統理論における「陰平陽秘」と偏り"
    },
    {
      "id": "lecture-yinyang-6-q2",
      "question": "【偏盛と偏衰】伝統理論で「不足」を中心に整理する陰虚・陽虚の組み合わせはどれですか？",
      "options": [
        "陰虚＝実熱、陽虚＝実寒",
        "陰虚＝虚熱、陽虚＝虚寒",
        "陰虚＝虚寒、陽虚＝虚熱"
      ],
      "correctIndex": 1,
      "explanation": "陰虚は陰の不足による虚熱、陽虚は陽の不足による虚寒として学習します。実熱・実寒の偏盛とは区別します。この対応だけで病名や医学的な原因を確定するものではありません。",
      "relatedSectionTitle": "2. 陰陽失調の4つの基本パターン"
    },
    {
      "id": "lecture-yinyang-6-q3",
      "question": "【薬や対処の判断】陰陽の分類や「水と火」のモデルと、実際の薬の使用・中止との関係で正しいものはどれですか？",
      "options": [
        "陰虚という分類を根拠に薬の中止を決める",
        "水と火の比率を根拠に服用量を決める",
        "医学的適応と処方者の指示を確認する"
      ],
      "correctIndex": 2,
      "explanation": "水と火は伝統概念を整理する比喩です。「陰虚だから薬で悪化する」「冷やしてはいけない」と一律に判断せず、陰陽の分類を理由に処方薬を自己判断で中止しないようにします。",
      "relatedSectionTitle": "3. 伝統分類と医学的評価を区別する"
    }
  ]
},
  "lecture-yinyang-7": {
  "lectureId": "lecture-yinyang-7",
  "chapterId": "yinyang",
  "chapterTitle": "第2章 陰陽論",
  "lectureTitle": "陰陽論 レッスン7：所見を組み合わせて考える",
  "passingScore": 2,
  "questions": [
    {
      "id": "lecture-yinyang-7-q1",
      "question": "【四診と単一所見の限界】顔の赤みという一つの所見から考える姿勢として、最も適切なのはどれですか？",
      "options": [
        "赤みは所見、実熱は候補として追加確認",
        "赤みは所見、実熱は確定として追加確認",
        "赤みは原因、実熱は候補として追加確認"
      ],
      "correctIndex": 0,
      "explanation": "所見はまず観察した事実として記録します。四診で情報を増やすことは大切ですが、陰陽・寒熱・虚実の分類だけで病気の原因や治療効果が確定するわけではありません。",
      "relatedSectionTitle": "1. 四診と単一所見の限界"
    },
    {
      "id": "lecture-yinyang-7-q2",
      "question": "【病位の分類と刺鍼の安全性】伝統理論の表・裏や浅部・深部の分類と、実際の刺鍼の関係として正しいものはどれですか？",
      "options": [
        "裏なら深い刺入が安全とする",
        "分類と局所解剖に基づく安全評価を分ける",
        "慢性なら解剖の確認は不要とする"
      ],
      "correctIndex": 1,
      "explanation": "伝統的な病位は、実際の病変の位置や安全な刺入深度を測定するものではありません。臓器・神経損傷を防ぐための解剖学的な確認や、個々の条件を踏まえた専門的な判断が必要です。",
      "relatedSectionTitle": "2. 病位の分類と刺鍼の安全性"
    },
    {
      "id": "lecture-yinyang-7-q3",
      "question": "【標・本の考え方と対応の優先順位】強い呼吸困難や意識の異常がある場合、最初に優先することはどれですか？",
      "options": [
        "陰陽分類を終えてからの紹介",
        "慢性症状の初診記録との照合",
        "医療への連絡・救急対応"
      ],
      "correctIndex": 2,
      "explanation": "標・本は伝統理論の整理方法であり、救急対応を置き換えません。呼吸や意識の異常などでは、伝統的な分類や補瀉の判断を理由に医療への連絡を遅らせないことが大切です。",
      "relatedSectionTitle": "3. 標・本の考え方と対応の優先順位"
    }
  ]
},
  "lecture-yinyang-8": {
  "lectureId": "lecture-yinyang-8",
  "chapterId": "yinyang",
  "chapterTitle": "第2章 陰陽論",
  "lectureTitle": "陰陽論 レッスン8：総合演習・次章への接続",
  "passingScore": 2,
  "questions": [
    {
      "id": "lecture-yinyang-8-q1",
      "question": "【分類・関係・変化の整理】陰陽論を学習例の整理に用いる目的として、最も適切なのはどれですか？",
      "options": ["観察は事実、分類は解釈、不明は未確認","観察は事実、分類は病名、不明は正常値","観察は原因、分類は解釈、不明は正常値"],
      "correctIndex": 0,
      "explanation": "陰陽論は伝統的な説明モデルです。分類・関係・変化の見方で情報を整理しますが、それだけで医学的な原因や検査値、治療効果が判定できるわけではありません。",
      "relatedSectionTitle": "1. 分類・関係・変化の整理"
    },
    {
      "id": "lecture-yinyang-8-q2",
      "question": "【医療との併用を考える】施術や薬の使用後に症状が悪化したとき、最も適切な考え方はどれですか？",
      "options": [
        "悪化を作用の徴候とする",
        "悪化を医療者に伝え、緊急性を確認する",
        "慢性なら悪化の報告を省く"
      ],
      "correctIndex": 1,
      "explanation": "症状悪化を陰陽の変化や効果の合図と決めつけません。受けた施術や使用した薬を伝え、必要な医学的評価につなげます。強い呼吸困難や意識の異常などがあれば、救急対応が優先です。",
      "relatedSectionTitle": "2. 医療との併用を考える"
    },
    {
      "id": "lecture-yinyang-8-q3",
      "question": "陰陽の対立・変化を学んだ後、気血津液論で新たに整理する中心課題はどれですか？",
      "options": ["臓と腑の名称、表裏関係の組み合わせ","正常な生成、営衛と三焦の連携の詳細","働き・滋養・潤い、三つの基本的な役割"],
      "correctIndex": 2,
      "explanation": "陰陽は性質を比較する視点、気血津液は基本役割を整理する視点として学びます。現代の測定や生理機構との同一視を避けます。",
      "relatedSectionTitle": "3. 気血津液論への接続"
    }
  ]
},
  "lecture-wuxing-1": {
  "lectureId": "lecture-wuxing-1",
  "chapterId": "wuxing",
  "chapterTitle": "第6章 五行論",
  "lectureTitle": "五行論 レッスン1：五行とは何か ― 五つの分類を学ぶ",
  "passingScore": 2,
  "questions": [
    {
      "id": "lecture-wuxing-1-q1",
      "question": "【第1節：木・火・土・金・水という分類】五行で使う五つの名称はどれですか？",
      "options": [
        "木・火・土・金・水",
        "気・血・津・液・神",
        "魂・神・意・魄・志"
      ],
      "correctIndex": 0,
      "explanation": "五行では木火土金水の五つの分類と、その関係・変化を学びます。生体内の五種類の物質を測定した定義ではありません。",
      "relatedSectionTitle": "第1節：木・火・土・金・水という分類"
    },
    {
      "id": "lecture-wuxing-1-q2",
      "question": "【第2節：陰陽・臓腑との学習上の関係】この章で既習の臓腑を振り返る目的として適切なのはどれですか？",
      "options": [
        "臓腑の役割は未習、五行で役割と病名を学習",
        "臓腑の役割は既習、五行で配当と関係を整理",
        "臓腑の役割は既習、五行で臓器の機能を実証"
      ],
      "correctIndex": 1,
      "explanation": "臓腑・生命機能を先に学び、五行を整理の視点として用います。用語が曖昧なら前の章を確認します。",
      "relatedSectionTitle": "第2節：陰陽・臓腑との学習上の関係"
    },
    {
      "id": "lecture-wuxing-1-q3",
      "question": "【第3節：分類モデルの説明範囲】五行を回路やフィードバックに例える場合、適切なのはどれですか？",
      "options": [
        "恒常性の機序を実証する根拠にする",
        "矢印から疾患への介入効果を導く",
        "学習補助の比喩として示す"
      ],
      "correctIndex": 2,
      "explanation": "図や工学の言葉は関係を覚える助けになりますが、分類・比喩・測定や研究の結果を分けます。",
      "relatedSectionTitle": "第3節：分類モデルの説明範囲"
    }
  ]
},
  "lecture-wuxing-2": {
  "lectureId": "lecture-wuxing-2",
  "chapterId": "wuxing",
  "chapterTitle": "第6章 五行論",
  "lectureTitle": "五行論 レッスン2：五行の基本的な性質 ― 曲直・炎上・稼穡・従革・潤下",
  "passingScore": 2,
  "questions": [
    {
      "id": "lecture-wuxing-2-q1",
      "question": "【第1節：五つの性質の代表的な説明】五行の性質の組み合わせとして適切なのはどれですか？",
      "options": [
        "木：曲直、火：炎上、土：稼穡、金：従革、水：潤下",
        "木：潤下、火：従革、土：曲直、金：炎上、水：稼穡",
        "木：従革、火：稼穡、土：潤下、金：曲直、水：炎上"
      ],
      "correctIndex": 0,
      "explanation": "五つの用語は、それぞれの行に関連づけられる代表的な性質です。自然のイメージを分類の手がかりにします。",
      "relatedSectionTitle": "第1節：五つの性質の代表的な説明"
    },
    {
      "id": "lecture-wuxing-2-q2",
      "question": "【第2節：性質を分類の手がかりにする】「潤し、下へ向かう性質」という教材上の説明に関連するのはどれですか？",
      "options": [
        "火の炎上",
        "水の潤下",
        "土の稼穡"
      ],
      "correctIndex": 1,
      "explanation": "潤下は潤いと下降の性質の説明です。この対応は用語の理解を確かめるもので、身体の状態の診断ではありません。",
      "relatedSectionTitle": "第2節：性質を分類の手がかりにする"
    },
    {
      "id": "lecture-wuxing-2-q3",
      "question": "【第3節：比喩と生理機構を分ける】五行の性質から判断できる範囲として適切なのはどれですか？",
      "options": [
        "性質は伝統的な説明、身体の機序は確認済み",
        "性質は身体感覚の測定、病態と治法は確定",
        "性質は伝統的な説明、身体の機序は未確認"
      ],
      "correctIndex": 2,
      "explanation": "自然の性質や方向のイメージと、測定された神経・代謝・臓器の機能を同一視しません。",
      "relatedSectionTitle": "第3節：比喩と生理機構を分ける"
    }
  ]
},
  "lecture-wuxing-3": {
  "lectureId": "lecture-wuxing-3",
  "chapterId": "wuxing",
  "chapterTitle": "第6章 五行論",
  "lectureTitle": "五行論 レッスン3：五行の相互関係 ― 相生・相剋・相乗・相侮",
  "passingScore": 2,
  "questions": [
    {
      "id": "lecture-wuxing-3-q1",
      "question": "【第1節：相生と母子の関係】「木生火」の関係で母と子を呼ぶとき、適切なのはどれですか？",
      "options": [
        "木が母、火が子",
        "火が母、木が子",
        "木と火は相剋の関係"
      ],
      "correctIndex": 0,
      "explanation": "相生では生み支える側が母、支えられる側が子です。母子は選んだ関係によって決まります。",
      "relatedSectionTitle": "第1節：相生と母子の関係"
    },
    {
      "id": "lecture-wuxing-3-q2",
      "question": "【第2節：相剋と関係の向き】相剋の向きとして適切なのはどれですか？",
      "options": [
        "木→火→土→金→水→木",
        "木→土→水→火→金→木",
        "木→金→火→水→土→木"
      ],
      "correctIndex": 1,
      "explanation": "木剋土・土剋水・水剋火・火剋金・金剋木の向きを整理します。相生とは異なる関係です。",
      "relatedSectionTitle": "第2節：相剋と関係の向き"
    },
    {
      "id": "lecture-wuxing-3-q3",
      "question": "【第3節：相乗・相侮は応用の入り口】相乗と相侮の用語上の違いとして適切なのはどれですか？",
      "options": [
        "相乗＝相剋と逆方向、相侮＝同方向",
        "相乗＝相生と同方向、相侮＝逆方向",
        "相乗＝相剋と同方向、相侮＝逆方向"
      ],
      "correctIndex": 2,
      "explanation": "この段階では用語と向きの違いを学びます。実際の所見からの病態・治法の判定は後の章で根拠と不足情報を確認します。",
      "relatedSectionTitle": "第3節：相乗・相侮は応用の入り口"
    }
  ]
},
  "lecture-wuxing-4": {
  "lectureId": "lecture-wuxing-4",
  "chapterId": "wuxing",
  "chapterTitle": "第6章 五行論",
  "lectureTitle": "五行論 レッスン4：既習の五臓を五行で整理する",
  "passingScore": 2,
  "questions": [
    {
      "id": "lecture-wuxing-4-q1",
      "question": "【第1節：五行と五臓の対応】五行と五臓の代表的な配当として適切なのはどれですか？",
      "options": [
        "木：肝、火：心、土：脾、金：肺、水：腎",
        "木：肺、火：腎、土：心、金：肝、水：脾",
        "木：心、火：肝、土：肺、金：脾、水：腎"
      ],
      "correctIndex": 0,
      "explanation": "この表は、臓腑論で学んだ名称と役割を五行の配当で整理するものです。",
      "relatedSectionTitle": "第1節：五行と五臓の対応"
    },
    {
      "id": "lecture-wuxing-4-q2",
      "question": "【配当と関係】「脾は土」と「土生金」を並べたメモを整理するとき、適切なのはどれですか？",
      "options": [
        "五行の配当を現代の臓器機能の証拠にする",
        "五臓の配当と相生・相剋の関係を分ける",
        "五臓の配当を患者への治法に置き換える"
      ],
      "correctIndex": 1,
      "explanation": "「脾は土」は五臓の配当、「土生金」は五行間の相生関係です。既習の臓腑の役割を整理するために用いますが、配当だけで現代医学の機序や治療効果を示すものではありません。",
      "relatedSectionTitle": "第2節：分類・役割・関係を分ける"
    },
    {
      "id": "lecture-wuxing-4-q3",
      "question": "【第3節：現代解剖学と区別する】伝統的な「脾の運化」を読むとき、適切なのはどれですか？",
      "options": [
        "運化は脾臓と同じ役割、脾臓の機能は同じ説明",
        "運化は伝統的な役割、脾臓の検査値は配当で確定",
        "運化は伝統的な役割、脾臓の機能は別の説明"
      ],
      "correctIndex": 2,
      "explanation": "伝統的な臓腑の役割と現代医学の同名臓器は一対一には対応しません。",
      "relatedSectionTitle": "第3節：現代解剖学と区別する"
    }
  ]
},
  "lecture-wuxing-5": {
  "lectureId": "lecture-wuxing-5",
  "chapterId": "wuxing",
  "chapterTitle": "第6章 五行論",
  "lectureTitle": "五行論 レッスン5：五官・五体・五華の伝統的な配当",
  "passingScore": 2,
  "questions": [
    {
      "id": "lecture-wuxing-5-q1",
      "question": "【第1節：五官・五体・五華の対応】木・肝に関連づける代表的な配当はどれですか？",
      "options": [
        "目・筋・爪",
        "鼻・骨・髪",
        "口・皮毛・顔色"
      ],
      "correctIndex": 0,
      "explanation": "木・肝に目、筋、爪を配当します。部位の分類であり、共通の病因を証明する表ではありません。",
      "relatedSectionTitle": "第1節：五官・五体・五華の対応"
    },
    {
      "id": "lecture-wuxing-5-q2",
      "question": "【第2節：観察した事実と配当を分ける】「目に乾燥感がある」という訴えと、目を肝に配当することの扱いとして適切なのはどれですか？",
      "options": [
        "乾燥感は訴え、目と肝は病気の因果の実証",
        "乾燥感は訴え、目と肝は伝統的な配当",
        "乾燥感は肝臓病、目と肝は臓器疾患の分類"
      ],
      "correctIndex": 1,
      "explanation": "観察・記載された情報と配当は別です。この二つだけで医学的な原因や証は確定できません。",
      "relatedSectionTitle": "第2節：観察した事実と配当を分ける"
    },
    {
      "id": "lecture-wuxing-5-q3",
      "question": "【第3節：診察への応用は後の章で学ぶ】この段階で判断を保留すべきものはどれですか？",
      "options": [
        "部位の名称",
        "表に示す五官の伝統的な配当",
        "症状の原因と治法"
      ],
      "correctIndex": 2,
      "explanation": "ここでは部位の対応を理解します。病機や診察への応用は、後の章で前提と不足情報を確認してから扱います。",
      "relatedSectionTitle": "第3節：診察への応用は後の章で学ぶ"
    }
  ]
},
  "lecture-wuxing-6": {
  "lectureId": "lecture-wuxing-6",
  "chapterId": "wuxing",
  "chapterTitle": "第6章 五行論",
  "lectureTitle": "五行論 レッスン6：五神・五志の伝統的な配当",
  "passingScore": 2,
  "questions": [
    {
      "id": "lecture-wuxing-6-q1",
      "question": "【第1節：五神と五志の配当】五神として挙げられる用語の組み合わせはどれですか？",
      "options": [
        "魂・神・意・魄・志",
        "酸・苦・甘・辛・鹹",
        "目・舌・口・鼻・耳"
      ],
      "correctIndex": 0,
      "explanation": "五神は精神活動に関する伝統的な分類です。五味や五官と区別して学びます。",
      "relatedSectionTitle": "第1節：五神と五志の配当"
    },
    {
      "id": "lecture-wuxing-6-q2",
      "question": "【第2節：配当を機能の測定へ置き換えない】「肝は魂を蔵す」という説明の読み方として適切なのはどれですか？",
      "options": [
        "精神活動の解剖学的位置",
        "精神活動と五臓を関係づける伝統表現",
        "創造力を算出する検査の規則"
      ],
      "correctIndex": 1,
      "explanation": "伝統的な配当は精神機能の測定や物質の所在の証明ではありません。",
      "relatedSectionTitle": "第2節：配当を機能の測定へ置き換えない"
    },
    {
      "id": "lecture-wuxing-6-q3",
      "question": "【第3節：正常な感情と病態の説明を分ける】怒りがあったという記載を扱うとき、適切なのはどれですか？",
      "options": [
        "怒りは記録、分類は病名、病態は確定",
        "怒りは性格、分類は候補、処方は確定",
        "怒りは記録、分類は候補、病態は保留"
      ],
      "correctIndex": 2,
      "explanation": "感情があること自体は病気や証の確定根拠ではありません。情志の病態への応用は病機論で学びます。",
      "relatedSectionTitle": "第3節：正常な感情と病態の説明を分ける"
    }
  ]
},
  "lecture-wuxing-7": {
  "lectureId": "lecture-wuxing-7",
  "chapterId": "wuxing",
  "chapterTitle": "第6章 五行論",
  "lectureTitle": "五行論 レッスン7：季節・気候・五味の伝統的な配当",
  "passingScore": 2,
  "questions": [
    {
      "id": "lecture-wuxing-7-q1",
      "question": "【第1節：季節・気候・五味の配当】金に関連づける代表的な季節・性質・味はどれですか？",
      "options": [
        "秋・燥・辛",
        "春・風・酸",
        "冬・寒・鹹"
      ],
      "correctIndex": 0,
      "explanation": "金に秋・燥・辛を配当します。分類であって、季節だけで病気を予測する式ではありません。",
      "relatedSectionTitle": "第1節：季節・気候・五味の配当"
    },
    {
      "id": "lecture-wuxing-7-q2",
      "question": "【第2節：対応と予測を分ける】季節の配当を読むとき、適切なのはどれですか？",
      "options": [
        "季節は配当、個人の症状の原因は確認済み",
        "季節は配当、個人の症状の原因は未確認",
        "季節は病因、生活背景や個人差は確認不要"
      ],
      "correctIndex": 1,
      "explanation": "配当が一致しても医学的な因果関係が確定したことにはなりません。長夏や土用の説明にも教材による違いがあります。",
      "relatedSectionTitle": "第2節：対応と予測を分ける"
    },
    {
      "id": "lecture-wuxing-7-q3",
      "question": "【第3節：五味の配当と食品の治療を分ける】五味の対応表から判断できる範囲はどれですか？",
      "options": [
        "食品の治療量",
        "相剋の関係から決める食事制限",
        "味の伝統的な分類"
      ],
      "correctIndex": 2,
      "explanation": "五味の配当は食品の治療効果や摂取量の指示ではありません。食事や薬の変更を表から自己判断しません。",
      "relatedSectionTitle": "第3節：五味の配当と食品の治療を分ける"
    }
  ]
},
  "lecture-wuxing-8": {
  "lectureId": "lecture-wuxing-8",
  "chapterId": "wuxing",
  "chapterTitle": "第6章 五行論",
  "lectureTitle": "五行論 レッスン8：関係の説明・根拠・保留の総合演習",
  "passingScore": 2,
  "questions": [
    {
      "id": "lecture-wuxing-8-q1",
      "question": "【第1節：分類と関係を説明する】「土生金」と説明する学習上の根拠はどれですか？",
      "options": [
        "五行の相生の向き",
        "肺疾患の改善効果",
        "胃腸と呼吸器の病気の因果の実証"
      ],
      "correctIndex": 0,
      "explanation": "相生の向きが関係の説明の根拠です。現実の病因や介入の効果を確認した根拠とは別です。",
      "relatedSectionTitle": "第1節：分類と関係を説明する"
    },
    {
      "id": "lecture-wuxing-8-q2",
      "question": "【第2節：架空例で根拠と保留を分ける】忙しさと食後のもたれだけが記載された架空例で適切なのはどれですか？",
      "options": [
        "忙しさともたれは報告、木乗土は確定",
        "忙しさともたれは報告、木乗土は候補",
        "忙しさともたれは因果、必要な経穴は確定"
      ],
      "correctIndex": 1,
      "explanation": "短い例だけでは原因・証・治法を確定できません。どの記載を根拠にしたかを示し、不足情報を分けます。",
      "relatedSectionTitle": "第2節：架空例で根拠と保留を分ける"
    },
    {
      "id": "lecture-wuxing-8-q3",
      "question": "【第3節：次章「経絡・経穴の基礎」への接続】次章で学ぶ内容として適切なのはどれですか？",
      "options": [
        "気血津液を初めて学ぶ",
        "五行で自己施術を計画する",
        "経絡の構成と経穴の名称・番号を学ぶ"
      ],
      "correctIndex": 2,
      "explanation": "次は経絡・経穴の基礎です。その後に病機論・診断論・治療戦略論で応用を段階的に学びます。",
      "relatedSectionTitle": "第3節：次章「経絡・経穴の基礎」への接続"
    }
  ]
},
  "lecture-qiblood-1": {
  "lectureId": "lecture-qiblood-1",
  "chapterId": "qiblood",
  "chapterTitle": "第3章 気血津液論",
  "lectureTitle": "気血津液論 レッスン1：気・血・津液の概観と気の基本作用",
  "passingScore": 2,
  "questions": [
    {
      "id": "lecture-qiblood-1-q1",
      "question": "【第1節：気・血・津液の基本役割】身体の活動や働きを説明する伝統概念として、最も適切なものはどれですか？",
      "options": [
        "気",
        "血",
        "津液"
      ],
      "correctIndex": 0,
      "explanation": "気は活動や働き、血は滋養・滋潤、津液は潤いという役割から整理します。三つを測定された独立物質とは扱いません。",
      "relatedSectionTitle": "第1節：気・血・津液の基本役割"
    },
    {
      "id": "lecture-qiblood-1-q2",
      "question": "【第2節：気の五つの作用】身体を温める役割を表す気の作用はどれですか？",
      "options": [
        "固摂",
        "温煦",
        "防御"
      ],
      "correctIndex": 1,
      "explanation": "温煦は身体を温める働きの伝統的な説明です。固摂は保つ働き、防御は外界の影響から守る働きとして整理します。",
      "relatedSectionTitle": "第2節：気の五つの作用"
    },
    {
      "id": "lecture-qiblood-1-q3",
      "question": "「血や汗などを保ち、漏れを防ぐ」という伝統的な役割を表す作用はどれですか？",
      "options": [
  "推動",
  "気化",
  "固摂"
],
      "correctIndex": 2,
      "explanation": "固摂は保つ働き、推動は活動や巡りを進める働き、気化は変化・排泄を説明します。用語の役割の区別であり、凝固などの医学的機序そのものではありません。",
      "relatedSectionTitle": "第2節：気の五つの作用"
    }
  ]
},
  "lecture-qiblood-2": {
  "lectureId": "lecture-qiblood-2",
  "chapterId": "qiblood",
  "chapterTitle": "第3章 気血津液論",
  "lectureTitle": "気血津液論 レッスン2：血の基本的な役割",
  "passingScore": 2,
  "questions": [
    {
      "id": "lecture-qiblood-2-q1",
      "question": "【第1節：滋養・滋潤という役割】血の基本役割の伝統的な説明として適切なのはどれですか？",
      "options": ["身体各部を滋養し、潤いを支える役割","身体各部を温め、活動を推進する役割","飲食物を受け入れ、消化を進める役割"],
      "correctIndex": 0,
      "explanation": "血は滋養・滋潤という役割から学びます。赤血球などの定義や検査値と一対一には対応しません。",
      "relatedSectionTitle": "第1節：滋養・滋潤という役割"
    },
    {
      "id": "lecture-qiblood-2-q2",
      "question": "血が「精神を支える」という説明から、不眠について言える範囲はどれですか？",
      "options": [
  "血の不足が不眠の原因と確定する",
  "伝統的な関係を示すが原因は確定しない",
  "血液検査だけで心神の状態を分類できる"
],
      "correctIndex": 1,
      "explanation": "血と精神活動は伝統理論内で関連づけられますが、不眠の原因や神経伝達物質の状態が確認されたわけではありません。症状の評価は別に必要です。",
      "relatedSectionTitle": "第2節：血と精神活動の伝統的な関係"
    },
    {
      "id": "lecture-qiblood-2-q3",
      "question": "血と津液がともに潤いに関わるという説明は、どう整理しますか？",
      "options": [
  "二つの名称はまったく同じ概念を指す",
  "血が働くときには津液は働かない",
  "役割に重なりがあっても概念は区別する"
],
      "correctIndex": 2,
      "explanation": "血には滋養・滋潤、津液には潤いと水分に関する役割があります。重なりがあることと同じ概念であることは別で、二つが交代して働くとも説明しません。",
      "relatedSectionTitle": "第1節：滋養・滋潤という役割"
    }
  ]
},
  "lecture-qiblood-3": {
  "lectureId": "lecture-qiblood-3",
  "chapterId": "qiblood",
  "chapterTitle": "第3章 気血津液論",
  "lectureTitle": "気血津液論 レッスン3：津液の基本的な役割",
  "passingScore": 2,
  "questions": [
    {
      "id": "lecture-qiblood-3-q1",
      "question": "【第1節：津と液の区分】津と液の基本的な区分として適切なのはどれですか？",
      "options": [
        "津＝さらさら、液＝濃厚・深部の潤い",
        "津＝濃厚・深部の潤い、液＝さらさら",
        "津＝細胞内液、液＝細胞外液"
      ],
      "correctIndex": 0,
      "explanation": "津と液は性質と役割の伝統的な対比です。現代医学の体液区分と一対一には対応しません。",
      "relatedSectionTitle": "第1節：津と液の区分"
    },
    {
      "id": "lecture-qiblood-3-q2",
      "question": "津液の正常な役割を整理する三つの視点はどれですか？",
      "options": [
  "温める・守る・保つ",
  "生じる・巡り潤す・変化し排泄される",
  "停滞する・濁る・固まる"
],
      "correctIndex": 1,
      "explanation": "本講は津液の正常な役割を、生成、巡りと潤い、変化と排泄に分けています。温煦・防御・固摂は気の作用で、停滞などは正常な役割とは別に学びます。",
      "relatedSectionTitle": "第2節：潤いと正常な巡り"
    },
    {
      "id": "lecture-qiblood-3-q3",
      "question": "【第3節：水分量の評価と分ける】口の乾きが記載された学習例で、適切な理解はどれですか？",
      "options": [
        "口の乾きは報告、体液量は低下と確定",
        "口の乾きは測定、必要な飲水量は確定",
        "口の乾きは報告、体液量は未確認"
      ],
      "correctIndex": 2,
      "explanation": "乾燥という訴えと、体液量・電解質・原因の評価は別です。教材から水分量や薬を変更しません。",
      "relatedSectionTitle": "第3節：水分量の評価と分ける"
    }
  ]
},
  "lecture-qiblood-4": {
  "lectureId": "lecture-qiblood-4",
  "chapterId": "qiblood",
  "chapterTitle": "第3章 気血津液論",
  "lectureTitle": "気血津液論 レッスン4：気・血・津液の正常な関係",
  "passingScore": 2,
  "questions": [
    {
      "id": "lecture-qiblood-4-q1",
      "question": "【第1節：気と血の関係】「血為気之母」の学習上の説明として適切なのはどれですか？",
      "options": [
        "血が気を養い、支える関係",
        "気が血を動かす関係",
        "気が血の逸脱を防ぐ関係"
      ],
      "correctIndex": 0,
      "explanation": "血為気之母は気と血の関係の説明です。「母」は支える役割の表現で、製造工程を実測した結果ではありません。",
      "relatedSectionTitle": "第1節：気と血の関係"
    },
    {
      "id": "lecture-qiblood-4-q2",
      "question": "【第2節：気と津液・血と津液の関係】「津血同源」の読み方として適切なのはどれですか？",
      "options": [
        "血と津液が同じ成分であるという定義",
        "血と津液の由来を関連づける説明",
        "津液から赤血球への変換を測った記録"
      ],
      "correctIndex": 1,
      "explanation": "津血同源は伝統的な由来と関係の説明です。造血や代謝の解剖生理学的工程と同一視しません。",
      "relatedSectionTitle": "第2節：気と津液・血と津液の関係"
    },
    {
      "id": "lecture-qiblood-4-q3",
      "question": "【第3節：関係の説明と医学的な機序を分ける】伝統的な関係図の矢印から言える範囲はどれですか？",
      "options": [
        "矢印は関係の説明、医学的因果は確認済み",
        "矢印は機序の実証、治療効果は確認済み",
        "矢印は関係の説明、医学的因果は未確認"
      ],
      "correctIndex": 2,
      "explanation": "用語の標準化、比喩、研究結果は確認する範囲が異なります。関係図を医学的な因果関係の証明へ読み替えません。",
      "relatedSectionTitle": "第3節：関係の説明と医学的な機序を分ける"
    }
  ]
},
  "lecture-qiblood-5": {
  "lectureId": "lecture-qiblood-5",
  "chapterId": "qiblood",
  "chapterTitle": "第3章 気血津液論",
  "lectureTitle": "気血津液論 レッスン5：基本用語を使う一判断演習",
  "passingScore": 2,
  "questions": [
    {
      "id": "lecture-qiblood-5-q1",
      "question": "【第1節：架空例の情報を三つに分ける】Aさんが散歩後に「温かく感じた」と話した例で、記載された情報はどれですか？",
      "options": ["本人が感じた温かさについての主観的な報告","体温計で確認した体温についての客観的な記録","伝統的な温煦作用について正常と評価した判定"],
      "correctIndex": 0,
      "explanation": "本人の訴えが記載されています。実測値や診断結果は示されていません。記載された事実と推測を分けます。",
      "relatedSectionTitle": "第1節：架空例の情報を三つに分ける"
    },
    {
      "id": "lecture-qiblood-5-q2",
      "question": "散歩後に温かく感じた例を、温煦という用語で説明するとき、適切なのはどれですか？",
      "options": [
  "温煦と呼べるので気の量は十分だと判定する",
  "温める役割と関連づけるが身体の状態は確定しない",
  "温煦と呼べるので治療の必要性まで判定する"
],
      "correctIndex": 1,
      "explanation": "温煦は身体を温める役割を表す用語です。用語と役割の対応を理解したことと、体温・気の状態・治療の必要性を判断したことは異なります。",
      "relatedSectionTitle": "第2節：一つの判断とその根拠"
    },
    {
      "id": "lecture-qiblood-5-q3",
      "question": "架空例に血や津液の記載がありません。この空白をどう扱いますか？",
      "options": [
  "血と津液が働いていないと判断する",
  "血と津液は正常だと判断する",
  "情報がないため状態の判断を保留する"
],
      "correctIndex": 2,
      "explanation": "記載がないことは、働きがないことでも正常を確認したことでもありません。用語から推測を埋めず、分かる範囲と未確認の範囲を分けます。",
      "relatedSectionTitle": "第2節：一つの判断とその根拠"
    }
  ]
},
  "lecture-lifedynamics-1": {
  "lectureId": "lecture-lifedynamics-1",
  "chapterId": "lifedynamics",
  "chapterTitle": "第5章 生命機能論",
  "lectureTitle": "生命活動を全体として捉える",
  "passingScore": 2,
  "questions": [
    {
      "id": "lecture-lifedynamics-1-q1",
      "question": "【第1節：既習の基本と正常な連携】生命機能論の前提として既に学んだ章はどれですか？",
      "options": [
        "陰陽論・気血津液論・臓腑論",
        "病機論・診断論・治則・治法",
        "五行論・経絡の基礎・統合症例"
      ],
      "correctIndex": 0,
      "explanation": "新しい順序では、基本用語と臓腑の役割の後に正常な連携を学びます。五行の整理は次章で扱います。",
      "relatedSectionTitle": "第1節：既習の基本と正常な連携"
    },
    {
      "id": "lecture-lifedynamics-1-q2",
      "question": "【第2節：四つの概念と、それが答える問い】営衛・三焦・昇降出入を学ぶときの視点として適切なのはどれですか？",
      "options": [
        "営衛＝領域、三焦＝方向、昇降出入＝分担",
        "営衛＝分担、三焦＝領域、昇降出入＝方向",
        "営衛＝方向、三焦＝分担、昇降出入＝領域"
      ],
      "correctIndex": 1,
      "explanation": "着目する役割・領域・方向を分けて学びます。現代の物質や機構と同一視しません。",
      "relatedSectionTitle": "第2節：四つの概念と、それが答える問い"
    },
    {
      "id": "lecture-lifedynamics-1-q3",
      "question": "【第3節：隣接する章との役割分担】この章と後の章の役割分担として適切なのはどれですか？",
      "options": [
        "病態の治法→正常な連携→臓腑の名称",
        "五行の配当→経穴の決定→正常な連携",
        "正常な連携→五行の整理→病態の学習"
      ],
      "correctIndex": 2,
      "explanation": "正常な役割と連携が本章の中心です。未習の応用を先取りせず、順に前提を学びます。",
      "relatedSectionTitle": "第3節：隣接する章との役割分担"
    }
  ]
},
  "lecture-lifedynamics-2": {
  "lectureId": "lecture-lifedynamics-2",
  "chapterId": "lifedynamics",
  "chapterTitle": "第5章 生命機能論",
  "lectureTitle": "精・気・血・津液・神の関係",
  "passingScore": 2,
  "questions": [
    {
      "id": "lecture-lifedynamics-2-q1",
      "question": "【先天と後天の精】本講の伝統的な区分に合う組み合わせはどれですか？",
      "options": [
        "先天＝生来、後天＝飲食による養い",
        "先天＝飲食による養い、後天＝生来",
        "先天＝現在の養い、後天＝将来の生来の要素"
      ],
      "correctIndex": 0,
      "explanation": "先天は生来の要素、後天は飲食などの養いに関連づける区分です。先天の精をDNAや固定の残量として測定した説明ではありません。",
      "relatedSectionTitle": "第1節：精・気・神の三宝（生命の三層ピラミッド）"
    },
    {
      "id": "lecture-lifedynamics-2-q2",
      "question": "【五神の配当】本講の五神の表に合う組み合わせはどれですか？",
      "options": [
        "心：志 ／ 脾：神 ／ 腎：意",
        "心：神 ／ 脾：意 ／ 腎：志",
        "心：意 ／ 脾：志 ／ 腎：神"
      ],
      "correctIndex": 1,
      "explanation": "心の神・脾の意・腎の志という伝統的な配当です。肝には魂、肺には魄を関連づけます。この配当は精神疾患の診断や神経機能の測定結果ではありません。",
      "relatedSectionTitle": "第3節：五臓に宿る精神の知性（五神）"
    },
    {
      "id": "lecture-lifedynamics-2-q3",
      "question": "【記録と説明候補】架空の記録に「疲れが増え、集中しづらい」とあるとき、精・気・神の関係を使う学習メモとして適切なのはどれですか？",
      "options": [
        "疲労と集中低下は報告、精の枯渇が原因と確定",
        "疲労と集中低下は所見、五神の配当で病名は確定",
        "疲労と集中低下は報告、原因は未確認"
      ],
      "correctIndex": 2,
      "explanation": "記録された訴えと、伝統的な関係モデルによる解釈は別です。時間の前後や五神の配当だけでは因果や病名を確認できません。精・気・神の関係は支え合う説明として読みます。",
      "relatedSectionTitle": "⚠️ 判断の注意点：生来の要素から将来を決めない"
    }
  ]
},
  "lecture-lifedynamics-3": {
  "lectureId": "lecture-lifedynamics-3",
  "chapterId": "lifedynamics",
  "chapterTitle": "第5章 生命機能論",
  "lectureTitle": "飲食と呼吸から生命を支える",
  "passingScore": 2,
  "questions": [
    {
      "id": "lecture-lifedynamics-3-q1",
      "question": "【胃・脾・肺の役割】本講の伝統的な説明に合う組み合わせはどれですか？",
      "options": [
        "胃：受納 ／ 脾：運化 ／ 肺：清気",
        "胃：運化 ／ 脾：清気 ／ 肺：受納",
        "胃：清気 ／ 脾：受納 ／ 肺：運化"
      ],
      "correctIndex": 0,
      "explanation": "胃の受納・腐熟、脾の運化・昇清、肺の呼吸を区別します。これらを関連づけるのは伝統的な役割の説明で、実際の消化吸収や代謝の全機序を示すものではありません。",
      "relatedSectionTitle": "第1節：脾胃による「水穀の精気」生成ライン"
    },
    {
      "id": "lecture-lifedynamics-3-q2",
      "question": "【宗気の生成モデル】胸中の宗気を説明するとき、本講で組み合わせる二つはどれですか？",
      "options": ["自然の清気と呼吸で排出される濁気","水穀から得られる精微と自然の清気","排出される濁気と飲食物の消化残渣"],
      "correctIndex": 1,
      "explanation": "宗気は水穀の精微と自然の清気から説明する伝統的な生成モデルです。胸中・呼吸・血行と関連づけますが、ATPの産生反応や測定された物質の合成式にはしません。",
      "relatedSectionTitle": "第3節：宗気（そうき）の形成 ― 拍動と呼吸のエンジン"
    },
    {
      "id": "lecture-lifedynamics-3-q3",
      "question": "【役割と原因】「食欲が落ち、階段で息切れもする」という架空の記録から、宗気について言える範囲はどれですか？",
      "options": [
        "飲食と呼吸は関連の候補、宗気の量は減少と確定",
        "飲食と呼吸は前後の報告、胃腸が原因と確認済み",
        "飲食と呼吸は関連の候補、宗気の量は未測定"
      ],
      "correctIndex": 2,
      "explanation": "宗気のモデルは脾胃と肺の役割を関連づけます。二つの訴えを関連づけて考えても、宗気の量を測定したことや医学的な原因を確認したことにはなりません。経過や必要な医学的評価を別に確認します。",
      "relatedSectionTitle": "⚠️ 判断の注意点：役割の関連と症状の原因を分ける"
    }
  ]
},
  "lecture-lifedynamics-4": {
  "lectureId": "lecture-lifedynamics-4",
  "chapterId": "lifedynamics",
  "chapterTitle": "第5章 生命機能論",
  "lectureTitle": "営気と衛気の役割",
  "passingScore": 2,
  "questions": [
    {
      "id": "lecture-lifedynamics-4-q1",
      "question": "【営気と衛気】脈中・脈外という伝統的な説明に合う組み合わせはどれですか？",
      "options": [
        "営気：脈中 ／ 衛気：脈外",
        "営気：脈外 ／ 衛気：脈中",
        "営気：脈中 ／ 衛気：脈中"
      ],
      "correctIndex": 0,
      "explanation": "営気は脈中、衛気は脈外という説明です。この内外は伝統的な経脈との関係で、血管の内外を巡る物質を測定した結果とは区別します。",
      "relatedSectionTitle": "第3節：営衛協調 ― 「如環無端」の二重循環ループ"
    },
    {
      "id": "lecture-lifedynamics-4-q2",
      "question": "【営衛の作用】本講で衛気に関連づける働きの組み合わせはどれですか？",
      "options": [
        "滋養・血の生成・臓腑への供給",
        "防御・温煦・腠理の開閉",
        "受納・腐熟・水穀の昇清"
      ],
      "correctIndex": 1,
      "explanation": "営気は滋養・血の生成、衛気は防御・温煦・腠理の開閉に関連づけます。胃の受納と脾の昇清は別の役割です。衛気の防御を免疫検査の値や感染予防の保証として扱いません。",
      "relatedSectionTitle": "第2節：衛気（えき） ― 脈外を疾走する最前線シールド"
    },
    {
      "id": "lecture-lifedynamics-4-q3",
      "question": "【古典の運行モデル】営衛の「一日五十周」を読む際に、最も適切な説明はどれですか？",
      "options": [
        "実測された血流回数の記録",
        "睡眠の深さを求める測定指標",
        "営衛の運行を表す古典のモデル"
      ],
      "correctIndex": 2,
      "explanation": "周数は古典的な説明で、生体内の循環回数や睡眠の深さを測定した値ではありません。本講の原文・訳の逐語照合も未完了であるため、出典の確認範囲を分けて読みます。",
      "relatedSectionTitle": "📘 詳しく学ぶ：『霊枢』営衛生会篇が語る「日夜の五十周」"
    }
  ]
},
  "lecture-lifedynamics-5": {
  "lectureId": "lecture-lifedynamics-5",
  "chapterId": "lifedynamics",
  "chapterTitle": "第5章 生命機能論",
  "lectureTitle": "三焦で全身の働きを整理する",
  "passingScore": 2,
  "questions": [
    {
      "id": "lecture-lifedynamics-5-q1",
      "question": "【三焦の区分】本講の上焦・中焦・下焦の空間的な説明に合うものはどれですか？",
      "options": [
        "上：横隔膜より上 ／ 中：横隔膜〜臍 ／ 下：臍より下",
        "上：横隔膜より上 ／ 中：臍より下 ／ 下：横隔膜〜臍",
        "上：横隔膜〜臍 ／ 中：横隔膜より上 ／ 下：臍より下"
      ],
      "correctIndex": 0,
      "explanation": "三焦は上・中・下という領域から役割を整理する伝統的な区分です。心肺・脾胃・排泄に関連する説明を比べます。三つの領域を一つの解剖学的器官とする定義ではありません。",
      "relatedSectionTitle": "第1節：三焦の空間区分と三大メタファー"
    },
    {
      "id": "lecture-lifedynamics-5-q2",
      "question": "【三焦の比喩】本講の「霧・漚・瀆」の対応として、正しい順はどれですか？",
      "options": [
        "上焦：瀆 ／ 中焦：漚 ／ 下焦：霧",
        "上焦：霧 ／ 中焦：漚 ／ 下焦：瀆",
        "上焦：漚 ／ 中焦：霧 ／ 下焦：瀆"
      ],
      "correctIndex": 1,
      "explanation": "上焦は霧、中焦は漚、下焦は瀆という比喩で役割を覚えます。漚は「あわ」に関係する字で、沢とは別です。これを実在する噴霧器・発酵装置・排水管の測定結果に置き換えません。",
      "relatedSectionTitle": "第1節：三焦の空間区分と三大メタファー"
    },
    {
      "id": "lecture-lifedynamics-5-q3",
      "question": "【三焦と現代研究】三焦と間質・リンパ系を比較するとき、資料の確認範囲として適切なのはどれですか？",
      "options": [
        "役割が似れば同じ組織とする",
        "領域の図で浮腫の原因を決める",
        "伝統モデルと研究の測定結果を分ける"
      ],
      "correctIndex": 2,
      "explanation": "共通する話題があることと、同じ組織や機序だと実証されたことは違います。本講では間質などの個別原著を照合しておらず、三焦の名称から病因や治療効果も決まりません。",
      "relatedSectionTitle": "🔬 研究との接点：間質、リンパ系、体腔膜ネットワーク"
    }
  ]
},
  "lecture-lifedynamics-6": {
  "lectureId": "lecture-lifedynamics-6",
  "chapterId": "lifedynamics",
  "chapterTitle": "第5章 生命機能論",
  "lectureTitle": "臓腑の表裏関係を理解する",
  "passingScore": 2,
  "questions": [
    {
      "id": "lecture-lifedynamics-6-q1",
      "question": "【第1節：臓と腑の根本的な性格の違い】臓と腑の対比を読むとき、適切なのはどれですか？",
      "options": [
        "臓＝蔵する側面、腑＝伝化する側面",
        "臓＝伝化する側面、腑＝蔵する側面",
        "臓と腑＝ともに同じ伝化の側面"
      ],
      "correctIndex": 0,
      "explanation": "陰の臓・陽の腑は役割を対比する伝統モデルです。物質の出入りを全くしないという臓器の定義には置き換えません。",
      "relatedSectionTitle": "第1節：臓と腑の根本的な性格の違い"
    },
    {
      "id": "lecture-lifedynamics-6-q2",
      "question": "【第2節：六対の表裏関係と伝統的な連携】肺と大腸の表裏の配当から言える範囲はどれですか？",
      "options": [
        "表裏は配当、症状の因果は確認済み",
        "表裏は配当、症状の因果は未確認",
        "表裏は測定、施術の効果は確認済み"
      ],
      "correctIndex": 1,
      "explanation": "表裏の配当と医学的な臓器間の機序を同一視しません。必要な医療評価を分類や自己判断の処置で置き換えません。",
      "relatedSectionTitle": "第2節：六対の表裏関係と伝統的な連携"
    },
    {
      "id": "lecture-lifedynamics-6-q3",
      "question": "【第2節：六対の表裏関係と伝統的な連携】脾の昇清と胃の降濁の学習上の説明として適切なのはどれですか？",
      "options": [
        "同方向の役割の一致",
        "消化機序を測定した研究結果の説明",
        "上へ・下へという役割の対比"
      ],
      "correctIndex": 2,
      "explanation": "脾の昇清と胃の降濁は正常な役割を方向で対比する伝統的な説明です。消化の全機序や治療の効果を示すものではありません。",
      "relatedSectionTitle": "第2節：六対の表裏関係と伝統的な連携"
    }
  ]
},
  "lecture-lifedynamics-7": {
  "lectureId": "lecture-lifedynamics-7",
  "chapterId": "lifedynamics",
  "chapterTitle": "第5章 生命機能論",
  "lectureTitle": "昇降出入で機能をつなぐ",
  "passingScore": 2,
  "questions": [
    {
      "id": "lecture-lifedynamics-7-q1",
      "question": "【昇降出入】四つの方向の説明として、正しい組み合わせはどれですか？",
      "options": [
        "昇：上 ／ 降：下 ／ 出：外 ／ 入：内",
        "昇：外 ／ 降：内 ／ 出：上 ／ 入：下",
        "昇：上 ／ 降：下 ／ 出：内 ／ 入：外"
      ],
      "correctIndex": 0,
      "explanation": "昇は上、降は下、出は外、入は内という方向から伝統的な役割を整理します。方向の分類を、解剖学的な流路や体温・血流の測定と同一視しません。",
      "relatedSectionTitle": "第1節：昇降出入の基本概念"
    },
    {
      "id": "lecture-lifedynamics-7-q2",
      "question": "【脾胃の昇降】本講の脾胃の関係に合う組み合わせはどれですか？",
      "options": [
        "脾：降濁 ／ 胃：昇清",
        "脾：昇清 ／ 胃：降濁",
        "脾：昇清 ／ 胃：昇清"
      ],
      "correctIndex": 1,
      "explanation": "脾の昇清と胃の降濁を対にして、受け入れ・運化・送り出しを関係づける伝統的な説明です。この対比は、全ての消化吸収の生理機序を説明したことにはなりません。",
      "relatedSectionTitle": "第2節：臓腑が織りなす3大昇降ループ"
    },
    {
      "id": "lecture-lifedynamics-7-q3",
      "question": "【方向と対処】架空の記録に「食後の胃もたれと吐き気」とある場合、方向の分類を使う範囲として適切なのはどれですか？",
      "options": [
        "上向きは説明候補、胃薬の適応もその方向で確定",
        "上向きは観察所見、胃の降濁だけに原因を限定",
        "上向きは説明候補、原因・薬の適応は別に確認"
      ],
      "correctIndex": 2,
      "explanation": "方向は役割を整理する伝統用語です。吐き気という一語から原因や薬の適応は確定しません。胃薬や下痢止めが一律に悪化させるとは扱わず、処方薬を教材から自己判断で変更しません。",
      "relatedSectionTitle": "⚠️ 判断の注意点：方向の分類だけで対処を選ばない"
    }
  ]
},
  "lecture-lifedynamics-8": {
  "lectureId": "lecture-lifedynamics-8",
  "chapterId": "lifedynamics",
  "chapterTitle": "第5章 生命機能論",
  "lectureTitle": "活動と休息のリズムを理解する",
  "passingScore": 2,
  "questions": [
    {
      "id": "lecture-lifedynamics-8-q1",
      "question": "【睡眠と覚醒の表現】本講の「陽入于陰」と「陽出于陰」の対応に合うものはどれですか？",
      "options": [
        "陽入于陰：睡眠 ／ 陽出于陰：覚醒",
        "陽入于陰：覚醒 ／ 陽出于陰：睡眠",
        "陽入于陰：排泄 ／ 陽出于陰：生成"
      ],
      "correctIndex": 0,
      "explanation": "本講では睡眠を陽入于陰、覚醒を陽出于陰に関連づける伝統的な説明として読みます。体内時計や神経系の測定結果と同じ概念ではありません。",
      "relatedSectionTitle": "第2節：睡眠と覚醒の力学 ― 「陽入于陰」"
    },
    {
      "id": "lecture-lifedynamics-8-q2",
      "question": "【時刻表の確認範囲】古典的な営衛の運行や子午流注の時刻表から、言える範囲として適切なのはどれですか？",
      "options": [
        "臓腑の修復時間の確認",
        "伝統的な運行の説明",
        "睡眠深度の測定"
      ],
      "correctIndex": 1,
      "explanation": "時刻表は伝統的な関係を学ぶ資料です。特定時間の睡眠が腎精修復に不可欠という根拠にはならず、周数も実測された循環回数ではありません。",
      "relatedSectionTitle": "⚠️ 判断の注意点：睡眠の記録と治療の判断を分ける"
    },
    {
      "id": "lecture-lifedynamics-8-q3",
      "question": "【睡眠の記録】架空の学習で「眠りにくさの変化と日中の困りごと」を比較したいとき、最も目的に合う記録はどれですか？",
      "options": [
        "睡眠時間の平均だけで日中の支障を代表する",
        "日中の支障を記録し睡眠の時刻は比較しない",
        "睡眠時刻と日中の支障を日付ごとに記録する"
      ],
      "correctIndex": 2,
      "explanation": "時刻・経過と生活への影響を分けて記録することが、本講の学習目標です。記録は原因や病名の確定ではなく、営衛のモデルから睡眠薬の適応や中止を導くこともしません。",
      "relatedSectionTitle": "⚠️ 判断の注意点：睡眠の記録と治療の判断を分ける"
    }
  ]
},
  "lecture-lifedynamics-9": {
  "lectureId": "lecture-lifedynamics-9",
  "chapterId": "lifedynamics",
  "chapterTitle": "第5章 生命機能論",
  "lectureTitle": "季節・環境への適応を理解する",
  "passingScore": 2,
  "questions": [
    {
      "id": "lecture-lifedynamics-9-q1",
      "question": "【季節の表現】本講の春・夏・秋・冬の伝統的な対応に合う順はどれですか？",
      "options": [
        "春：生 ／ 夏：長 ／ 秋：収 ／ 冬：蔵",
        "春：蔵 ／ 夏：収 ／ 秋：長 ／ 冬：生",
        "春：生 ／ 夏：収 ／ 秋：蔵 ／ 冬：長"
      ],
      "correctIndex": 0,
      "explanation": "春生・夏長・秋収・冬蔵は、季節の特徴を比較する伝統的な表現です。気血が集まる深さや季節病の原因を測定した一覧ではありません。",
      "relatedSectionTitle": "第1節：五季における自然の気と身体の重心移動"
    },
    {
      "id": "lecture-lifedynamics-9-q2",
      "question": "【季節と症状の関係】Aさんの「梅雨の週に身体が重い」という記録の解答として、適切なのはどれですか？",
      "options": ["身体の重さは本人の報告、湿が原因と判定","身体の重さは本人の報告、湿の関係は仮説","身体の重さは測定結果、脾の低下まで判定"],
      "correctIndex": 1,
      "explanation": "同じ季節や週に現れたことだけでは因果は確認されません。実際の室温・湿度、屋内外の仕事、睡眠、他の症状などを分けて確認します。湿との関係は伝統的な説明候補です。",
      "relatedSectionTitle": "第2節：季節病のメカニズム ― 「同調のタイムラグ」"
    },
    {
      "id": "lecture-lifedynamics-9-q3",
      "question": "【地域・生活の違い】同じ冬に、屋外で働く人と暖房のある室内で働く人を比較する学習で、適切な進め方はどれですか？",
      "options": ["同じ季節なので、食品と起床時刻の基準を共通にする","冬の配当から、二人の寒熱・虚実の分類を共通にする","実際の環境・仕事・生活から、二人の条件を比較する"],
      "correctIndex": 2,
      "explanation": "同じ季節でも地域・室内外の環境・生活背景は異なります。古典の季節表現は学習の手掛かりで、特定の食事・睡眠時刻・治療を一律に指定する根拠にはしません。",
      "relatedSectionTitle": "⚠️ 判断の注意点：古典の教えを「一律の命令」にしてはならない"
    }
  ]
},
  "lecture-lifedynamics-10": {
  "lectureId": "lecture-lifedynamics-10",
  "chapterId": "lifedynamics",
  "chapterTitle": "第5章 生命機能論",
  "lectureTitle": "正常な調節と、失調の入口を区別する",
  "passingScore": 2,
  "questions": [
    {
      "id": "lecture-lifedynamics-10-q1",
      "question": "【変化の確認】運動後の汗が休息で減ったという架空の記録から、最も適切に言えるのはどれですか？",
      "options": [
        "休息の前後で汗が変化した",
        "正気は十分だった",
        "運動後の汗から営衛不和を確認した"
      ],
      "correctIndex": 0,
      "explanation": "確認できたのは経過の変化です。可逆性や刺激との関係は確認する観点ですが、正常・異常を決める診断条件ではありません。",
      "relatedSectionTitle": "第2節：生理的代償と病理的失調を分ける3大基準"
    },
    {
      "id": "lecture-lifedynamics-10-q2",
      "question": "【検査結果と原因】「検査で異常がないと言われたが、疲れは続く」という架空の記録について、適切な理解はどれですか？",
      "options": [
        "検査結果は記録、疲れの評価はこれで終了",
        "検査結果は記録、疲れの経過も追加確認",
        "検査結果は正常、機能的な疾患と診断確定"
      ],
      "correctIndex": 1,
      "explanation": "検査に異常がなかったことと、疲れの原因や伝統的な失調が確認されたことは違います。訴えの持続や生活への影響などを記録し、医学的な評価と伝統的な説明候補を分けます。",
      "relatedSectionTitle": "📘 詳しく学ぶ：『素問』調経論が説く「虚実の真髄」"
    },
    {
      "id": "lecture-lifedynamics-10-q3",
      "question": "【正邪・虚実と薬】発熱の記録を伝統用語で整理するとき、適切な判断はどれですか？",
      "options": [
        "正邪で解熱剤の量を決める",
        "虚実で処方薬を中止する",
        "分類と薬の適応・医療者の指示を分ける"
      ],
      "correctIndex": 2,
      "explanation": "正邪や虚実の分類から、薬が邪気を深部へ押し込むなどの機序や薬の適応は導けません。処方薬の使用・中止を教材から自己判断しないことが、本文の判断の注意点です。",
      "relatedSectionTitle": "⚠️ 判断の注意点：症状の分類から薬を判断しない"
    }
  ]
},
  "lecture-lifedynamics-11": {
  "lectureId": "lecture-lifedynamics-11",
  "chapterId": "lifedynamics",
  "chapterTitle": "第5章 生命機能論",
  "lectureTitle": "生命システムを統合して説明する",
  "passingScore": 2,
  "questions": [
    {
      "id": "lecture-lifedynamics-11-q1",
      "question": "【複数の臓腑の役割】本講の津液の説明で、肺・脾・腎をどう扱いますか？",
      "options": [
        "異なる役割を伝統モデルで関連づける",
        "同じ臓器の別名とする",
        "配当を臓器の代償とする"
      ],
      "correctIndex": 0,
      "explanation": "津液の役割は肺・脾・腎や三焦などに関連づけて整理します。多重サポートは関係を覚える比喩で、解剖学的な臓器の同一性や病気の代償を保証するものではありません。",
      "relatedSectionTitle": "第2節：多重サポート構造（冗長性）の神秘"
    },
    {
      "id": "lecture-lifedynamics-11-q2",
      "question": "【観察と因果】架空の記録に「仕事のストレスが増え、眠りにくくなった」とあるとき、適切な学習メモはどれですか？",
      "options": [
        "前後関係は報告、臓腑の連鎖は確認済み",
        "前後関係は報告、臓腑の連鎖は説明候補",
        "前後関係は因果、造血障害の発生は確認済み"
      ],
      "correctIndex": 1,
      "explanation": "同時期や前後の関係だけでは、ストレス→脾虚→血虚→不眠の因果は確認できません。血虚は貧血や造血障害の同義語ではなく、この章のモデルだけで治療設計へ進めません。",
      "relatedSectionTitle": "⚠️ 判断の注意点：「原因臓器」を一つに特定しようと焦らない"
    },
    {
      "id": "lecture-lifedynamics-11-q3",
      "question": "【比喩と実証】伝統モデルをネットワーク医学と比較するとき、実証を判断するために必要なのはどれですか？",
      "options": [
        "共通してネットワークと呼ぶこと",
        "古典に協調関係が記載されていること",
        "研究の対象・比較・測定結果"
      ],
      "correctIndex": 2,
      "explanation": "言葉や図の類似は、同じ物質・機序を実証した証拠ではありません。本講の個別原著は未照合なので、伝統的な関係の説明と研究で確認された因果を分けて読みます。",
      "relatedSectionTitle": "🔬 研究との接点：システムバイオロジーとネットワーク医学"
    }
  ]
},
  "lecture-lifedynamics-12": {
  "lectureId": "lecture-lifedynamics-12",
  "chapterId": "lifedynamics",
  "chapterTitle": "第5章 生命機能論",
  "lectureTitle": "総合演習・次章への接続",
  "passingScore": 2,
  "questions": [
    {
      "id": "lecture-lifedynamics-12-q1",
      "question": "【第1節：生成・巡り・排泄の整理】本章の振り返りとして適切なのはどれですか？",
      "options": [
        "生成・巡り・排泄の役割を伝統用語で整理する",
        "全ての体内物質を実測したとする",
        "正常モデルで病気の有無を確定する"
      ],
      "correctIndex": 0,
      "explanation": "伝統的な正常機能の説明を整理する課題です。物質を追跡した測定結果や診断とは区別します。",
      "relatedSectionTitle": "第1節：生成・巡り・排泄の整理"
    },
    {
      "id": "lecture-lifedynamics-12-q2",
      "question": "【第2節：ひとつの関係を根拠とともに説明する】正常な連携を説明するとき、適切なのはどれですか？",
      "options": [
        "役割は伝統的な説明、実際の機序は確認済み",
        "役割は伝統的な説明、実際の機序は未確認",
        "役割は正常のモデル、反転すれば原因は確定"
      ],
      "correctIndex": 1,
      "explanation": "説明の根拠を示し、まだ確認していないことを添えます。正常の説明から病気の原因が自動的に確定するわけではありません。",
      "relatedSectionTitle": "第2節：ひとつの関係を根拠とともに説明する"
    },
    {
      "id": "lecture-lifedynamics-12-q3",
      "question": "【第3節：次章「五行論」への接続】次の五行論で学ぶ主な目的はどれですか？",
      "options": [
        "気血津液の基本役割を初めて学ぶ",
        "正常な連携から個別の治療方法を確定する",
        "既習の五臓を五つの分類・関係で整理する"
      ],
      "correctIndex": 2,
      "explanation": "五行論は、先に学んだ臓腑と連携を整理する章です。経絡の基礎を経て、病機・診断・治療へ進みます。",
      "relatedSectionTitle": "第3節：次章「五行論」への接続"
    }
  ]
},
  "lecture-pathomechanism-1": {
  "lectureId": "lecture-pathomechanism-1",
  "chapterId": "pathomechanism",
  "chapterTitle": "第8章 病機論",
  "lectureTitle": "病機とは何か",
  "passingScore": 2,
  "questions": [
    {
      "id": "lecture-pathomechanism-1-q1",
      "question": "病因・病機・症状・証を分けた説明はどれですか？",
      "options": [
        "病因＝背景、病機＝変化の仮説、症状＝現れ、証＝分類",
        "病因＝分類、病機＝訴え、症状＝変化の仮説、証＝背景",
        "病因＝訴え、病機＝分類、症状＝背景、証＝変化の仮説"
      ],
      "correctIndex": 0,
      "explanation": "四つは異なる整理の層です。伝統的な説明を、検査で確認された生理機序や医学的な病名と同一視しません。背景の候補も、それだけで原因と確定した情報ではありません。",
      "relatedSectionTitle": "第2節：病因・病機・症状・証の四層峻別"
    },
    {
      "id": "lecture-pathomechanism-1-q2",
      "question": "「証」と「病機」を分ける説明として適切なのはどれですか？",
      "options": [
        "証＝変化の仮説、病機＝現時点の分類",
        "証＝現時点の分類、病機＝変化の仮説",
        "証＝本人の訴えの一覧、病機＝確定した病名"
      ],
      "correctIndex": 1,
      "explanation": "証は現時点の状態の要約、病機は変化を説明する仮説として区別します。名称が整合していても、実際の原因や生理機序を証明したことにはなりません。",
      "relatedSectionTitle": "第2節：病因・病機・症状・証の四層峻別"
    },
    {
      "id": "lecture-pathomechanism-1-q3",
      "question": "「胸が張るのは気滞だから。気滞と考えた理由は胸が張るから」という説明に不足しているものはどれですか？",
      "options": [
        "同じ所見を別の用語に言い換えて説明すること",
        "より詳しい証名を付けて原因の説明に代えること",
        "別の所見・経過・他の説明を確かめること"
      ],
      "correctIndex": 2,
      "explanation": "訴えと分類名だけを行き来すると循環論法になります。追加情報や反証を確認し、分類を仮説として扱います。病機を説明できることは、根本治癒や再発予防の保証ではありません。",
      "relatedSectionTitle": "第3節：失調の起点と「循環論法」の排除"
    }
  ]
},
  "lecture-pathomechanism-2": {
  "lectureId": "lecture-pathomechanism-2",
  "chapterId": "pathomechanism",
  "chapterTitle": "第8章 病機論",
  "lectureTitle": "発症を左右する条件",
  "passingScore": 2,
  "questions": [
  {
    "id": "lecture-pathomechanism-2-q1",
    "question": "正気・邪気の関係を学ぶ際の理解として適切なのはどれですか？",
    "options": [
      "身体と病因の伝統的な説明モデル",
      "免疫の状態を実測する評価指標",
      "個人の発症時期を求める計算式"
    ],
    "correctIndex": 0,
    "explanation": "正気・邪気は伝統的な説明の用語です。身体の状態と病因の双方を見る視点を学べますが、免疫検査や感染モデルの同義語ではなく、原因や病名を確定する計算式ではありません。",
    "relatedSectionTitle": "第2節：失調の起点 ― 正気と邪気を用いた整理"
  },
  {
    "id": "lecture-pathomechanism-2-q2",
    "question": "六淫・七情・飲食・労倦の基本を学ぶ際、適切な説明はどれですか？",
    "options": [
      "気候の存在で病因とする",
      "背景の程度・経過も確認する",
      "伝統分類を病原体や疾患の名称に対応させる"
    ],
    "correctIndex": 1,
    "explanation": "六淫は風・寒・暑・湿・燥・火の分類、七情は正常な感情も含む用語です。飲食や労倦も背景として確認します。名称を病原体や病名に置き換えず、生活背景だけで原因を決めません。",
    "relatedSectionTitle": "病因の基本用語"
  },
  {
    "id": "lecture-pathomechanism-2-q3",
    "question": "架空例の「夜勤が続き、昨日からだるい」という報告から、今できる判断はどれですか？",
    "options": [
      "夜勤とだるさは報告、感染は病名、原因は確定",
      "夜勤とだるさは報告、正気不足は確定、治法は決定",
      "夜勤とだるさは報告、労倦は候補、原因は未確認"
    ],
    "correctIndex": 2,
    "explanation": "分かっているのは本人が話した夜勤とだるさです。労倦や生活背景との関係は候補にとどめ、経過、睡眠・活動、他の症状、必要な医学的評価を確認します。未確認の機序や治療を追加しません。",
    "relatedSectionTitle": "第3節：発症を左右する4大ファクター"
  }
]
},
  "lecture-pathomechanism-3": {
  "lectureId": "lecture-pathomechanism-3",
  "chapterId": "pathomechanism",
  "chapterTitle": "第8章 病機論",
  "lectureTitle": "気の不足と運動の失調",
  "passingScore": 2,
  "questions": [
  {
    "id": "lecture-pathomechanism-3-q1",
    "question": "気虚と気滞を区別する説明として適切なのはどれですか？",
    "options": [
      "気虚＝働きの不足、気滞＝運行の滞り",
      "気虚＝運行の滞り、気滞＝働きの不足",
      "気虚＝上逆、気滞＝支える働きの不足"
    ],
    "correctIndex": 0,
    "explanation": "気虚は不足、気滞は滞りに着目する伝統用語です。同時に候補となる場合もありますが、一定の順番に進む段階ではありません。気の量を測定した結果とも区別します。",
    "relatedSectionTitle": "第3節：運動の失調を区別する"
  },
  {
    "id": "lecture-pathomechanism-3-q2",
    "question": "気逆と気陥の概念の比較として適切なのはどれですか？",
    "options": [
      "気逆＝働きの不足、気陥＝運行の滞り",
      "気逆＝上逆、気陥＝持ち上げる働きの不足",
      "気逆＝運行の滞り、気陥＝急な気の逸脱"
    ],
    "correctIndex": 1,
    "explanation": "気逆は気の上逆や下降の失調、気陥は持ち上げ支える働きの不足を説明します。これは伝統概念の比較で、胃食道逆流症や内臓の病気をこの二語だけで判断する対応表ではありません。",
    "relatedSectionTitle": "第3節：運動の失調を区別する"
  },
  {
    "id": "lecture-pathomechanism-3-q3",
    "question": "架空例の「疲れやすく、夕食後にお腹が張る」という報告について、今できる判断はどれですか？",
    "options": [
      "気滞が先に起きたとする",
      "気虚が主因と決める",
      "疲労と張りを記録し、不足と停滞を候補にする"
    ],
    "correctIndex": 2,
    "explanation": "分かっているのは本人の二つの訴えです。気虚・気滞は比較する候補にとどめ、発症時期、食事・活動との関係、他の症状、必要な医学的評価などを確認します。原因や治療はまだ決められません。",
    "relatedSectionTitle": "第5節：架空例で観察・解釈・要確認を分ける"
  }
]
},
  "lecture-pathomechanism-4": {
  "lectureId": "lecture-pathomechanism-4",
  "chapterId": "pathomechanism",
  "chapterTitle": "第8章 病機論",
  "lectureTitle": "津液代謝の失調",
  "passingScore": 2,
  "questions": [
  {
    "id": "lecture-pathomechanism-4-q1",
    "question": "水湿・痰・飲・水滞の関係について適切なのはどれですか？",
    "options": [
      "資料の定義と性質を読み分ける",
      "進行順に重症度を並べる",
      "同義語として扱う"
    ],
    "correctIndex": 0,
    "explanation": "水湿・痰・飲は別の項目として定義され、水滞のまとめ方にも教材による違いがあります。これらを順番通りの悪化段階や、検査で同定した一種類の物質として扱いません。",
    "relatedSectionTitle": "水滞という用語の位置づけ"
  },
  {
    "id": "lecture-pathomechanism-4-q2",
    "question": "痰と飲の学習上の区別として適切なのはどれですか？",
    "options": [
      "痰＝正常な津液、飲＝喀出される分泌物",
      "痰＝粘り・濁り、飲＝比較的さらりとした停滞",
      "痰＝比較的さらりとした停滞、飲＝粘り・濁り"
    ],
    "correctIndex": 1,
    "explanation": "伝統理論の痰には喀出される痰に限らない用法があり、飲は比較的さらりとした水液の停滞を説明します。用語の比較であり、胸水・肺水腫などを診断したり、効能を示したりするものではありません。",
    "relatedSectionTitle": "第3節：水湿・痰・飲を比較する"
  },
  {
    "id": "lecture-pathomechanism-4-q3",
    "question": "架空例の「夕方に足がむくむ感じがあり、口も乾く」という報告について適切な次の整理はどれですか？",
    "options": [
      "むくみ感から飲水を制限する",
      "口の乾きから脱水と決める",
      "訴えを記録し、不足・停滞の候補を分ける"
    ],
    "correctIndex": 2,
    "explanation": "本人の報告は観察した事実として記録できますが、体液量を測った結果ではありません。不足・停滞は比較する候補で、経過、他の症状、服薬や医学的評価を確認する前に水分や薬の調整を決めません。",
    "relatedSectionTitle": "第5節：架空例で観察・解釈・要確認を分ける"
  }
]
},
  "lecture-pathomechanism-5": {
  "lectureId": "lecture-pathomechanism-5",
  "chapterId": "pathomechanism",
  "chapterTitle": "第8章 病機論",
  "lectureTitle": "血の失調と瘀血の形成",
  "passingScore": 2,
  "questions": [
  {
    "id": "lecture-pathomechanism-5-q1",
    "question": "血虚と貧血の関係について適切なのはどれですか？",
    "options": [
      "異なる評価として区別する",
      "貧血の有無を判定する",
      "貧血なしなら血虚の分類候補を除外する"
    ],
    "correctIndex": 0,
    "explanation": "血虚は養い潤す働きの不足を説明する伝統用語で、貧血の同義語ではありません。同じ人に両方の評価が行われても、一方の名前だけで他方の有無を決めることはできません。",
    "relatedSectionTitle": "第2節：養い潤す働きの不足と血虚"
  },
  {
    "id": "lecture-pathomechanism-5-q2",
    "question": "瘀血と気・寒熱・外傷との関係を学ぶ際、適切な読み方はどれですか？",
    "options": [
      "気滞だけで説明する",
      "複数の伝統的背景を比較する",
      "気滞・寒・熱・外傷を必須の進行順に並べる"
    ],
    "correctIndex": 1,
    "explanation": "気滞・気虚・寒熱・外傷との関係は、伝統理論内で背景を比較する観点です。一定の悪化順序でも、血液が物理的に凍る・濃縮するという測定結果でもなく、瘀血を血栓や微小循環障害と同義にはしません。",
    "relatedSectionTitle": "第3節：瘀血と複数の背景を比較する"
  },
  {
    "id": "lecture-pathomechanism-5-q3",
    "question": "架空例の「同じ場所が痛み、夜に気になる」という報告について、今できる判断はどれですか？",
    "options": [
      "痛む部位と時期は報告、瘀血は確定",
      "痛む部位と時期は報告、血栓は確認済み",
      "痛む部位と時期は報告、瘀血は候補"
    ],
    "correctIndex": 2,
    "explanation": "固定性は伝統的な候補を比べる手掛かりですが、分類や病名を確定する所見ではありません。報告された痛みと、考えた解釈、必要な医学的評価を含む不明点を分け、未確認の機序や治療を追加しません。",
    "relatedSectionTitle": "第5節：架空例で観察・解釈・要確認を分ける"
  }
]
},
  "lecture-pathomechanism-6": {
  "lectureId": "lecture-pathomechanism-6",
  "chapterId": "pathomechanism",
  "chapterTitle": "第8章 病機論",
  "lectureTitle": "寒熱と陰陽の失調",
  "passingScore": 2,
  "questions": [
    {
      "id": "lecture-pathomechanism-6-q1",
      "question": "【寒熱と虚実】「冷える感じがある」という報告を八綱で整理する際、この報告だけでは決められない軸を扱う方法はどれですか？",
      "options": [
        "寒熱と虚実を別の軸で記す",
        "熱の強さをそのまま実の程度とする",
        "冷えの強さをそのまま虚の程度とする"
      ],
      "correctIndex": 0,
      "explanation": "寒熱と虚実は異なる軸です。冷えという一つの報告だけで虚か実かを確定せず、働きの不足や過剰を考える追加情報を確認します。伝統分類だけで医学的原因や重症度を判定しません。",
      "relatedSectionTitle": "第2節：寒熱の形成 ― 陰陽の偏盛と偏衰（四象限マトリクス）"
    },
    {
      "id": "lecture-pathomechanism-6-q2",
      "question": "実熱と虚熱の伝統的な分類の違いはどれですか？",
      "options": [
        "実熱＝陰の不足、虚熱＝偏盛",
        "実熱＝偏盛、虚熱＝陰の不足",
        "実熱＝強い熱感、虚熱＝弱い熱感"
      ],
      "correctIndex": 1,
      "explanation": "これは伝統的な寒熱分類です。陽や陰を実測した熱量や体液量そのものとは扱いません。発熱の原因、脱水、感染症などの医学的評価は別に必要です。",
      "relatedSectionTitle": "第2節：寒熱の形成 ― 陰陽の偏盛と偏衰（四象限マトリクス）"
    },
    {
      "id": "lecture-pathomechanism-6-q3",
      "question": "顔の熱感と足の冷えが同時に記録された架空例について、今できる整理はどれですか？",
      "options": [
        "熱感を優先し全体を実熱とする",
        "冷えを優先し全体を虚寒とする",
        "両方の訴えと観察条件・経過を確認する"
      ],
      "correctIndex": 2,
      "explanation": "寒熱の訴えは部位や時間によって異なることがあります。一方を無視せず、寒熱錯雑や真仮などは比較する伝統的な候補にとどめます。緊急性や病名、治療はこの情報だけで決めません。",
      "relatedSectionTitle": "第3節：寒熱錯雑 ― 「上熱下寒」を学習例として比較する"
    }
  ]
},
  "lecture-pathomechanism-7": {
  "lectureId": "lecture-pathomechanism-7",
  "chapterId": "pathomechanism",
  "chapterTitle": "第8章 病機論",
  "lectureTitle": "外的要因から病態を考える",
  "passingScore": 2,
  "questions": [
    {
      "id": "lecture-pathomechanism-7-q1",
      "question": "【外感モデルの比較】六経と衛気営血で同じ学習例を整理したメモを比べるとき、最初に確認することはどれですか？",
      "options": [
        "モデルごとの分類軸と適用範囲を確認する",
        "六経の名称を衛気営血の名称に置き換える",
        "表から裏への同じ順序に二つのモデルをそろえる"
      ],
      "correctIndex": 0,
      "explanation": "六経、衛気営血、三焦などは整理する観点と適用範囲が異なります。名称をそのまま入れ替えたり、すべてを同じ一方向の経路に合わせたりせず、どの情報を説明しているかを比較します。",
      "relatedSectionTitle": "第4節：二大外感体系 ― 傷寒論と温病論"
    },
    {
      "id": "lecture-pathomechanism-7-q2",
      "question": "六淫のうち、風邪（ふうじゃ）の伝統的な性質として扱う組合せはどれですか？",
      "options": [
        "重濁・粘滞・下部の重さ",
        "軽揚・遊走・変化",
        "乾燥・潤いの不足"
      ],
      "correctIndex": 1,
      "explanation": "風邪には軽揚・善行数変などの性質を配します。重濁・粘滞は湿、乾燥は燥を説明する観点です。六淫は伝統的な分類であり、毛穴から病原体を運ぶ物理的な物質として確定した説明ではありません。",
      "relatedSectionTitle": "第2節：六気から六淫へ ― 自然環境を捉える六つの分類"
    },
    {
      "id": "lecture-pathomechanism-7-q3",
      "question": "表・半表半裏・裏の分類を「皮膚から内臓へ必ず進む三段階」と読む問題点はどれですか？",
      "options": [
  "三分類は同じ部位の別名なので順序が不要",
  "裏から表へ進む順序に直す必要がある",
  "所見の整理を固定した感染経路に置き換えている"
],
      "correctIndex": 2,
      "explanation": "表・半表半裏・裏は伝統的に所見を整理する分類です。同じ人が必ず順番に悪化する経路や、現代医学の感染経路を示すものではありません。",
      "relatedSectionTitle": "第3節：侵入と伝変の多様性（一本道モデルの脱却）"
    }
  ]
},
  "lecture-pathomechanism-8": {
  "lectureId": "lecture-pathomechanism-8",
  "chapterId": "pathomechanism",
  "chapterTitle": "第8章 病機論",
  "lectureTitle": "情志・飲食・労倦から病態を考える",
  "passingScore": 2,
  "questions": [
    {
      "id": "lecture-pathomechanism-8-q1",
      "question": "生活背景と病態の仮説の関係を扱うとき、適切なのはどれですか？",
      "options": [
        "背景の報告と経過を照合する",
        "報告を確定原因とする",
        "身体の所見を分類した後は生活背景を省く"
      ],
      "correctIndex": 0,
      "explanation": "生活背景は仮説を比較する材料です。時間的な関連と因果を分け、他の説明や必要な医学的評価も確認します。生活習慣を理由に本人へ責任を押し付けません。",
      "relatedSectionTitle": "⚠️ 判断の注意点：感情だけに原因を集約しない"
    },
    {
      "id": "lecture-pathomechanism-8-q2",
      "question": "本講で扱う古典の気機表現「怒・思・恐」の組合せはどれですか？",
      "options": [
        "怒則気下・思則気消・恐則気上",
        "怒則気上・思則気結・恐則気下",
        "怒則気緩・思則気乱・恐則気結"
      ],
      "correctIndex": 1,
      "explanation": "古典の表現では怒を気上、思を気結、恐を気下と関連づけます。伝統理論内の対応を学ぶ問題で、感情だけから臓器の損傷、失禁の原因、病名を判定するものではありません。",
      "relatedSectionTitle": "第2節：七情内傷（感情と気機の関係）"
    },
    {
      "id": "lecture-pathomechanism-8-q3",
      "question": "「仕事で思い悩む時期に、食後の張りも気になった」という架空の報告を記録する方法はどれですか？",
      "options": [
        "感情と張りは原因と結果、脾の失調を確定",
        "感情と張りは別の報告、食事以外の背景は除外",
        "感情と張りは別の報告、前後と背景を確認"
      ],
      "correctIndex": 2,
      "explanation": "感情と身体の双方向の関係を比較します。併存や時間的関連だけでは、どちらが原因かは決まりません。用語対応に加えて、仮説を保留して情報を集める判断を確認します。",
      "relatedSectionTitle": "⚠️ 判断の注意点：感情だけに原因を集約しない"
    }
  ]
},
  "lecture-pathomechanism-9": {
  "lectureId": "lecture-pathomechanism-9",
  "chapterId": "pathomechanism",
  "chapterTitle": "第8章 病機論",
  "lectureTitle": "病理が波及する仕組み",
  "passingScore": 2,
  "questions": [
    {
      "id": "lecture-pathomechanism-9-q1",
      "question": "【波及モデルの限界】食欲低下と眠りにくさの発症時期が異なる記録に、関係図を使う方法はどれですか？",
      "options": [
        "実際の経過から関係の候補を比較する",
        "五行順に時期を並べ替える",
        "先の症状を後の症状の原因とする"
      ],
      "correctIndex": 0,
      "explanation": "波及モデルは関係の候補を考えるためのものです。発症時期や生活背景を保持し、支持・反証・不足情報を比較します。図の順序や時間的な前後だけで医学的な因果を確定しません。",
      "relatedSectionTitle": "第4節：五行モデルの限界 ― 「当てはめゲーム」の罠"
    },
    {
      "id": "lecture-pathomechanism-9-q2",
      "question": "五行の関係モデルで「子病犯母」を説明する向きはどれですか？",
      "options": [
        "木（母）から火（子）",
        "火（子）から木（母）",
        "木から土への相剋"
      ],
      "correctIndex": 1,
      "explanation": "木生火という相生関係では木が母、火が子であり、子から母への波及を子病犯母と表します。これは伝統モデルの方向の比較です。頻度や実際の臓器障害、血液の移動を証明した説明ではありません。",
      "relatedSectionTitle": "第3節：臓腑間波及の五行モデルとその活用"
    },
    {
      "id": "lecture-pathomechanism-9-q3",
      "question": "気滞・痰湿・瘀血の関係図から、この教材で言えることはどれですか？",
      "options": [
  "気滞があれば最後は器質的病変に進む",
  "気滞の段階では検査値は正常である",
  "異なる側面を整理できるが進行順は確定しない"
],
      "correctIndex": 2,
      "explanation": "これらは伝統分類の異なる側面です。必ず進む段階ではなく、関係図から検査結果や腫瘍などの病変の有無を決めることもできません。",
      "relatedSectionTitle": "第2節：気血津液の複数の側面"
    }
  ]
},
  "lecture-pathomechanism-10": {
  "lectureId": "lecture-pathomechanism-10",
  "chapterId": "pathomechanism",
  "chapterTitle": "第8章 病機論",
  "lectureTitle": "慢性化と複合病態",
  "passingScore": 2,
  "questions": [
    {
      "id": "lecture-pathomechanism-10-q1",
      "question": "【発症と持続】仕事の変化の後に不調が始まり、仕事が戻った今も睡眠不足が続く学習例で、確認したい区別はどれですか？",
      "options": [
        "発症要因と現在の維持要因を分ける",
        "最初の仕事の変化だけで説明する",
        "現在の変動だけを記録する"
      ],
      "correctIndex": 0,
      "explanation": "始まった前後の出来事と、今も続く背景は同じとは限りません。仕事の変化と現在の睡眠などを分けて確認し、それぞれの関係を候補として検討します。",
      "relatedSectionTitle": "第2節：「始まった原因」と「続いている理由」を分ける3大視点"
    },
    {
      "id": "lecture-pathomechanism-10-q2",
      "question": "慢性症状を整理する「発症要因・増悪軽減要因・維持要因」の使い方はどれですか？",
      "options": [
        "発症時の出来事を現在の維持要因に置き換える",
        "発症前後・現在の変動・持続する背景",
        "現在の増悪要因だけを発症と持続の説明にする"
      ],
      "correctIndex": 1,
      "explanation": "始まった時と現在では関連する要因が異なる可能性があります。三つの視点で経過を整理し、それぞれを原因として確定した情報と区別します。",
      "relatedSectionTitle": "第2節：「始まった原因」と「続いている理由」を分ける3大視点"
    },
    {
      "id": "lecture-pathomechanism-10-q3",
      "question": "本虚標実という伝統的な整理で、比較しているものはどれですか？",
      "options": [
        "初期と後期の症状の順序",
        "身体の上部と下部の空間的な配置",
        "基盤の不足と現れている停滞の併存"
      ],
      "correctIndex": 2,
      "explanation": "本虚標実は不足と停滞などが併存する関係を整理するモデルです。分類だけから補薬・瀉法・刺絡等を選んだり、慢性症状の原因や治癒を確定したりしません。",
      "relatedSectionTitle": "第3節：本虚標実（ほんきょひょうじつ）の樹木モデル"
    }
  ]
},
  "lecture-pathomechanism-11": {
  "lectureId": "lecture-pathomechanism-11",
  "chapterId": "pathomechanism",
  "chapterTitle": "第8章 病機論",
  "lectureTitle": "病機の仮説を比較する",
  "passingScore": 2,
  "questions": [
    {
      "id": "lecture-pathomechanism-11-q1",
      "question": "【仮説の修正】最初の候補に合う報告が二つ、合わない報告が一つ加わりました。次の扱いはどれですか？",
      "options": [
        "合わない所見を含め候補を再比較する",
        "候補の名前を詳しくして同じ説明を維持する",
        "最も多い支持所見だけを用いて候補を決める"
      ],
      "correctIndex": 0,
      "explanation": "支持情報の数だけで決めず、合わない所見の観察条件や重要性を確認します。別の候補や保留を含めて比較することが仮説の修正につながります。",
      "relatedSectionTitle": "第3節：支持情報と「反証」の力学"
    },
    {
      "id": "lecture-pathomechanism-11-q2",
      "question": "架空例の「疲れると頭痛が増す」と「固定した痛みが夜に気になる」という異なる報告を比べる際、適切なのはどれですか？",
      "options": [
        "同じ頭痛なので候補を統一する",
        "性状ごとに候補を立て、支持・反証・不足を比べる",
        "性状だけで治法を決める"
      ],
      "correctIndex": 1,
      "explanation": "報告は候補を比較する材料です。少数の症状だけで気虚・瘀血等を確定せず、発症経過、他の所見、必要な医学的評価を含めて確認します。病機論ではまだ個別の治法を決定しません。",
      "relatedSectionTitle": "第2節：短絡的断定の罠 ― 同一症状の複数仮説モデル"
    },
    {
      "id": "lecture-pathomechanism-11-q3",
      "question": "「休むと楽になるか、まだ聞いていない」は比較表のどの欄に入りますか？",
      "options": [
  "気虚を支持する情報",
  "気虚を否定する情報",
  "追加で確認する不足情報"
],
      "correctIndex": 2,
      "explanation": "未聴取は支持にも反証にも読み替えません。「聞いていない」と「休んでも変わらないと聞いた」は違う情報なので、追加確認として残します。",
      "relatedSectionTitle": "第3節：支持情報と「反証」の力学"
    }
  ]
},
  "lecture-pathomechanism-12": {
  "lectureId": "lecture-pathomechanism-12",
  "chapterId": "pathomechanism",
  "chapterTitle": "第8章 病機論",
  "lectureTitle": "総合演習・次章への接続",
  "passingScore": 2,
  "questions": [
    {
      "id": "lecture-pathomechanism-12-q1",
      "question": "【第1節：病機論の「3大統合軸」総まとめ】発生・波及・維持の三つの軸の使い方として適切なのはどれですか？",
      "options": [
        "仮説を整理し別の説明を保留する",
        "気滞から器質化を確定する",
        "関係図の順序を必須の進行過程として扱う"
      ],
      "correctIndex": 0,
      "explanation": "三つの軸は仮説を整理する視点です。伝統的な連鎖図を必然的な医学因果として扱いません。",
      "relatedSectionTitle": "第1節：病機論の「3大統合軸」総まとめ"
    },
    {
      "id": "lecture-pathomechanism-12-q2",
      "question": "【第2節：病機仮説から「診断の問い」への変換】分類候補に舌や脈の記述が合った場合、適切なのはどれですか？",
      "options": [
        "一致を病名の証明とする",
        "所見・解釈・医学的評価を分ける",
        "合う所見を残し合わない情報を分類から省く"
      ],
      "correctIndex": 1,
      "explanation": "所見の照合は伝統的な情報整理の学習です。病気の原因や機序を分類だけで確定しません。",
      "relatedSectionTitle": "第2節：病機仮説から「診断の問い」への変換"
    },
    {
      "id": "lecture-pathomechanism-12-q3",
      "question": "【第3節：次章「臨床診断論」への接続】次章へつなげる情報として適切なのはどれですか？",
      "options": [
        "分類名だけの要約",
        "医療評価を省く説明",
        "支持・反証・不足情報・保留する判断"
      ],
      "correctIndex": 2,
      "explanation": "候補を確認する問いと未確認の事項を渡します。安全確認と必要な医療評価を優先します。",
      "relatedSectionTitle": "第3節：次章「臨床診断論」への接続"
    }
  ]
},
  "lecture-diagnosis-1": {
  "lectureId": "lecture-diagnosis-1",
  "chapterId": "diagnosis",
  "chapterTitle": "第9章 臨床診断論",
  "lectureTitle": "診断・弁証の目的と全体像",
  "passingScore": 2,
  "questions": [
    {
      "id": "lecture-diagnosis-1-q1",
      "question": "【概念の区別】「腰が痛い」「暫定的に気滞を検討する」「介入は安全確認後に考える」というメモの区別はどれですか？",
      "options": [
        "症状＝訴え、証＝分類、方針＝別の判断",
        "症状＝分類、証＝病名、方針＝証名",
        "症状＝検査値、証＝本人の希望、方針＝確定原因"
      ],
      "correctIndex": 0,
      "explanation": "痛みの報告は症状、気滞などは伝統的な分類候補、介入方針は安全性や本人の希望なども含む別の判断です。分類名が付いただけで原因や効果が確定するわけではありません。",
      "relatedSectionTitle": "第1節：病名・症状・病機・証・治療方針の5層ピラミッド"
    },
    {
      "id": "lecture-diagnosis-1-q2",
      "question": "主訴から伝統的な分類候補を考える学習の流れとして適切なのはどれですか？",
      "options": [
        "分類決定→合う所見収集→方針固定",
        "安全確認→情報と候補の区別→追加確認",
        "病名の記録→配穴の決定→本人の希望の聴取"
      ],
      "correctIndex": 1,
      "explanation": "診断論の基本形は安全確認・情報整理・仮説形成・追加確認・統合・再評価です。病名と伝統的な分類を区別し、証の候補から治療が自動的に一つに決まるとは考えません。",
      "relatedSectionTitle": "診断プロトコルの6段階"
    },
    {
      "id": "lecture-diagnosis-1-q3",
      "question": "「気滞だから頭が痛い。頭が痛いから気滞だ」という説明で不足するものはどれですか？",
      "options": [
  "同じ説明を別の証名に置き換えること",
  "施術方法を先に一つ決めること",
  "他の情報や別の説明との比較"
],
      "correctIndex": 2,
      "explanation": "同じ症状を原因と根拠の両方に使う循環した説明です。経過や他の所見、別の候補、安全情報を確認し、推論と事実を分けます。",
      "relatedSectionTitle": "第3節：説明の一貫性と根拠を区別する"
    }
  ]
},
  "lecture-diagnosis-2": {
  "lectureId": "lecture-diagnosis-2",
  "chapterId": "diagnosis",
  "chapterTitle": "第9章 臨床診断論",
  "lectureTitle": "安全性と対応範囲を先に確認する",
  "passingScore": 2,
  "questions": [
    {
      "id": "lecture-diagnosis-2-q1",
      "question": "危険兆候と対応範囲を確認する目的として適切なのはどれですか？",
      "options": [
        "緊急性と受診の必要性を確認する",
        "非該当なら重い病気を除外する",
        "弁証の確定後に受診の要否を検討する"
      ],
      "correctIndex": 0,
      "explanation": "危険兆候は対応を検討するための情報です。すべてが同じ緊急度とは限らず、一覧にない病気もあります。分類名だけで緊急性を除外・確定せず、急激な悪化や判断不能時は必要な医療評価を優先します。",
      "relatedSectionTitle": "弁証より先に安全性を確認する"
    },
    {
      "id": "lecture-diagnosis-2-q2",
      "question": "【レッドフラッグの除外鑑別】鍼灸院に来院した腰痛患者に対し、直ちに施術を中止して救急・専門医へ紹介すべき重大な危険兆候（レッドフラッグ）はどれですか？",
      "options": [
        "前屈時だけの張りで排尿の変化はない",
        "新たな尿閉と会陰部の感覚低下",
        "起床時に重く動くと軽減し感覚の変化はない"
      ],
      "correctIndex": 1,
      "explanation": "強い腰痛や脚への放散痛に、新たな排尿・排便・性機能障害や会陰部感覚異常が伴う場合は、馬尾症候群などの評価へ直ちにつなぎます。診断や手術時期は医療機関で判断します。NICE NG127 1.7.3を参照し、弁証より医療評価を優先します。",
      "relatedSectionTitle": "腰痛と新たな排尿・感覚の異常"
    },
    {
      "id": "lecture-diagnosis-2-q3",
      "question": "【対応範囲】安全性を判断する情報が足りず、鍼灸で扱える範囲か分からないとき、適切な対応はどれですか？",
      "options": [
        "証が付けば施術可能とする",
        "希望があれば施術可能とする",
        "施術を保留して医療評価につなぐ"
      ],
      "correctIndex": 2,
      "explanation": "情報不足を安全の確認と同じ意味にせず、必要な医療評価や連携を優先します。判断ができない場合に施術を保留することも安全を守る対応です。",
      "relatedSectionTitle": "施術を保留する判断"
    }
  ]
},
  "lecture-diagnosis-3": {
  "lectureId": "lecture-diagnosis-3",
  "chapterId": "diagnosis",
  "chapterTitle": "第9章 臨床診断論",
  "lectureTitle": "主訴と時間軸を整理する",
  "passingScore": 2,
  "questions": [
    {
      "id": "lecture-diagnosis-3-q1",
      "question": "【主訴の確認】肩の張り、眠りにくさ、胃もたれが挙がり、優先して解決したい問題が不明です。次の確認はどれですか？",
      "options": [
        "本人が最も困る場面と希望を尋ねる",
        "訴えの数が多い部位を選ぶ",
        "施術者が説明しやすい症状を主訴に選ぶ"
      ],
      "correctIndex": 0,
      "explanation": "多数の訴えから施術者の都合で主訴を選ばず、本人が最も困っていること、生活への支障、望む変化を尋ねます。発症と経過はその後も分けて整理します。",
      "relatedSectionTitle": "第1節：主訴を絞り込む対話プロトコル"
    },
    {
      "id": "lecture-diagnosis-3-q2",
      "question": "「夕方に疲れると肩が張る」と「朝にこわばり、動くと軽くなる」という報告を比較する際、適切なのはどれですか？",
      "options": [
        "時間と活動の関係は記録、虚実の分類は確定",
        "時間と活動の関係は記録、虚実の分類は候補",
        "時間と活動の関係は除外、症状の名称だけ記録"
      ],
      "correctIndex": 1,
      "explanation": "増悪・軽減因子は候補を比較する材料です。伝統的な虚実を確定する検査ではなく、症状の経過や他の説明も確認します。",
      "relatedSectionTitle": "第3節：増悪・軽減因子のデコード表"
    },
    {
      "id": "lecture-diagnosis-3-q3",
      "question": "訴えを時間軸で整理することで、直接確認できることはどれですか？",
      "options": [
        "確認された因果の順序、確定した発症原因",
        "分類に合う発症順序、過去の記録の除外根拠",
        "報告された発症順序、未確認の時期"
      ],
      "correctIndex": 2,
      "explanation": "時間軸から確認できるのは報告された経過です。前後関係は原因の候補を考える材料ですが、初発の真因や本標の因果を確定するものではありません。",
      "relatedSectionTitle": "第2節：時間軸（タイムライン）の展開"
    }
  ]
},
  "lecture-diagnosis-4": {
  "lectureId": "lecture-diagnosis-4",
  "chapterId": "diagnosis",
  "chapterTitle": "第9章 臨床診断論",
  "lectureTitle": "問診を設計する",
  "passingScore": 2,
  "questions": [
    {
      "id": "lecture-diagnosis-4-q1",
      "question": "【問診の不足情報】「最近だるくなった」との報告だけで、服薬・既往歴が未確認です。まず追加したい質問はどれですか？",
      "options": [
        "使用中の薬と変更時期を尋ねる",
        "分類に合う食物だけを尋ねる",
        "服薬の確認を保留する"
      ],
      "correctIndex": 0,
      "explanation": "服薬、既往歴、生活背景は原因を決めつけずに確認します。薬の変更と症状の時期も記録し、時間的関連だけで因果を確定しません。",
      "relatedSectionTitle": "第4節：既往歴・服薬・生活背景（土壌の聴取）"
    },
    {
      "id": "lecture-diagnosis-4-q2",
      "question": "初期の候補が肝気鬱結だった場合、次の問診で重視することはどれですか？",
      "options": ["候補を支持する症状を中心に経過を詳しく尋ねる","候補の支持情報と矛盾する所見を両方とも尋ねる","候補の証名を先に説明して本人の同意を尋ねる"],
      "correctIndex": 1,
      "explanation": "確証バイアス（自分の仮説に都合の良い証拠だけを集めてしまう心理）の回避です。臨床推論では、初期仮説を立てた後、反証所見（矛盾する兆候）を自ら探しに行くことで誤診を防ぎます。",
      "relatedSectionTitle": "第3節：仮説を「支持する質問」と「反証（否定）する質問」のペアリング"
    },
    {
      "id": "lecture-diagnosis-4-q3",
      "question": "問診のファネル構造として適切な進め方はどれですか？",
      "options": ["病名の二択を提示し、同意する理由を具体的に聴く","想定した症状を提示し、それに合う体験を自由に聴く","本人の体験を自由に聴き、時期や条件を具体的に聴く"],
      "correctIndex": 2,
      "explanation": "開かれた質問で患者の文脈と全体像を受容し、徐々に閉じた質問で寒熱・飲食・睡眠・排泄などの客観的鑑別点を絞り込むのが標準面接技法です。",
      "relatedSectionTitle": "第1節：質問の漏斗（ファネル）モデル"
    }
  ]
},
  "lecture-diagnosis-5": {
  "lectureId": "lecture-diagnosis-5",
  "chapterId": "diagnosis",
  "chapterTitle": "第9章 臨床診断論",
  "lectureTitle": "望診・聞診で観察する",
  "passingScore": 2,
  "questions": [
    {
      "id": "lecture-diagnosis-5-q1",
      "question": "【観察と解釈】照明の下で舌が赤く見え、「熱の候補か」と考えました。記録の方法はどれですか？",
      "options": [
        "観察した色・条件と分類の解釈を別に記す",
        "赤みから実熱確定と記す",
        "前の分類に合わせ色を記す"
      ],
      "correctIndex": 0,
      "explanation": "観察した色、照明などの条件、伝統的な解釈候補を分けます。見えた色だけで原因や分類を確定せず、他の情報と照合します。",
      "relatedSectionTitle": "第1節：四診共通の記録形式（5大プロトコル）"
    },
    {
      "id": "lecture-diagnosis-5-q2",
      "question": "舌質と舌苔を記録するとき、適切な区別はどれですか？",
      "options": [
        "舌質＝苔の色・厚さ、舌苔＝本体の色・形",
        "舌質＝本体の色・形、舌苔＝苔の色・厚さ",
        "舌質＝色全体の印象、舌苔＝舌の動き"
      ],
      "correctIndex": 1,
      "explanation": "本体と表面の苔を分けて観察します。気血・寒熱・胃気等との関連づけは伝統的な解釈であり、観察した色や形と解釈を同じ欄で確定情報にしません。",
      "relatedSectionTitle": "舌質と舌苔の役割分担"
    },
    {
      "id": "lecture-diagnosis-5-q3",
      "question": "舌の色が前回と違って見えた際、解釈の前に確認することはどれですか？",
      "options": [
        "臓腑の分類による色の変化の確定",
        "前回の分類に合わせた色の記録の修正",
        "照明・飲食・観察方法の再確認"
      ],
      "correctIndex": 2,
      "explanation": "観察条件で見え方が変わる可能性があります。条件と得られた情報を記録し、伝統的な解釈や医学的な評価を分けます。舌診だけで臓器や気血の状態を客観的に証明したことにはなりません。",
      "relatedSectionTitle": "舌診の外乱因子（観察条件の確認）"
    }
  ]
},
  "lecture-diagnosis-6": {
  "lectureId": "lecture-diagnosis-6",
  "chapterId": "diagnosis",
  "chapterTitle": "第9章 臨床診断論",
  "lectureTitle": "切診の情報を扱う",
  "passingScore": 2,
  "questions": [
    {
      "id": "lecture-diagnosis-6-q1",
      "question": "【切診の照合】同じ人の脈を二回触れると印象が違いました。候補を確定する前に行うことはどれですか？",
      "options": [
        "条件を再確認し、他の四診情報とも照合する",
        "初期の分類を再確認し、合う触診結果を採用する",
        "二回目を正しい所見とし、一回目の結果は除く"
      ],
      "correctIndex": 0,
      "explanation": "切診には観察条件や検者による違いがあります。条件と結果を記録して再確認し、問診など他の四診情報と照合します。違いだけでいずれかを正しい結果と決めません。",
      "relatedSectionTitle": "第4節：切診の再現性の限界と照合原則"
    },
    {
      "id": "lecture-diagnosis-6-q2",
      "question": "浮脈・沈脈の記録を他の情報と扱う方法として適切なのはどれですか？",
      "options": [
        "脈の深さから病変の位置を決める",
        "深さと条件を記録し他の所見と照合する",
        "問診の分類に合うよう深さの記録を変える"
      ],
      "correctIndex": 1,
      "explanation": "浮沈は脈の触れ方の記述で、表裏との関連は伝統的な解釈です。検者や条件による違いもあり、深さだけで臓器の病変や病位を確定しません。",
      "relatedSectionTitle": "脈診の手順と標準化"
    },
    {
      "id": "lecture-diagnosis-6-q3",
      "question": "本講の脈の観察項目として適切な組合せはどれですか？",
      "options": ["脈の深さ・舌の色・苔の厚さ・声の強さ","脈の速さ・腹部の張り・食欲・皮膚の温感","脈の深さ・速さ・幅・力の強弱や緊張度"],
      "correctIndex": 2,
      "explanation": "脈は深さ、速さ、幅・形、力・緊張度などを別の軸で記録します。寒熱・虚実などの解釈と区別し、これらだけで自律神経活動や病気を測定・判定しません。",
      "relatedSectionTitle": "脈の四つの観察軸"
    }
  ]
},
  "lecture-diagnosis-7": {
  "lectureId": "lecture-diagnosis-7",
  "chapterId": "diagnosis",
  "chapterTitle": "第9章 臨床診断論",
  "lectureTitle": "八綱で病態を整理する",
  "passingScore": 2,
  "questions": [
    {
      "id": "lecture-diagnosis-7-q1",
      "question": "【八綱の軸】病位・病性・勢力関係を別欄に整理する八綱の組み合わせはどれですか？",
      "options": [
        "病位＝表裏、病性＝寒熱、勢力関係＝虚実",
        "病位＝寒熱、病性＝虚実、勢力関係＝表裏",
        "病位＝虚実、病性＝表裏、勢力関係＝寒熱"
      ],
      "correctIndex": 0,
      "explanation": "表裏は病位、寒熱は病性、虚実は勢力関係を整理する軸です。陰陽は全体を統括する枠組みとして学びます。各軸に対応する所見と不足情報を別に示します。",
      "relatedSectionTitle": "第1節：八綱の観点を分ける"
    },
    {
      "id": "lecture-diagnosis-7-q2",
      "question": "【発症時期と病位】「今日始まった」という情報だけがある学習例を、表裏に分類する方法はどれですか？",
      "options": [
        "急性なので表とし他の所見は後で確認する",
        "発症時期だけでは表裏を決めない",
        "急性なので裏とし症状の部位は考慮しない"
      ],
      "correctIndex": 1,
      "explanation": "急性・慢性は時間の情報であり、そのまま表裏と同じ意味ではありません。発症時期だけで決めず、病位を考える所見、経過、安全性を追加確認します。",
      "relatedSectionTitle": "第2節：「急性＝表、慢性＝裏」という単純化の罠"
    },
    {
      "id": "lecture-diagnosis-7-q3",
      "question": "【混在と判定保留】顔の熱感と足の冷えがあり、虚実の根拠は不足しています。現時点の整理はどれですか？",
      "options": [
        "熱感から熱・実にそろえる",
        "冷えから寒・虚にそろえる",
        "各軸の根拠と不明点を記し、再確認する"
      ],
      "correctIndex": 2,
      "explanation": "異なる部位の訴えを保持し、混在などを候補として比較します。寒熱と虚実を連動させて決めず、根拠が不足する軸は保留し、必要な情報と見直す条件を記します。",
      "relatedSectionTitle": "第4節：判定保留（グレーゾーン）の臨床プロトコル"
    }
  ]
},
  "lecture-diagnosis-8": {
  "lectureId": "lecture-diagnosis-8",
  "chapterId": "diagnosis",
  "chapterTitle": "第9章 臨床診断論",
  "lectureTitle": "気血津液の異常を検討する",
  "passingScore": 2,
  "questions": [
    {
      "id": "lecture-diagnosis-8-q1",
      "question": "【津液の候補】「口が乾くが、足はむくむ感じもする」という学習例の初期メモはどれですか？",
      "options": [
        "両方を報告として残し、不足と停滞を比較",
        "むくみだけを報告として残し、不足は除外",
        "乾きだけを報告として残し、水の停滞は除外"
      ],
      "correctIndex": 0,
      "explanation": "乾きとむくむ感覚は両方とも本人の報告として保持します。不足と停滞などの候補を比較し、部位、経過、医学的評価などの不足情報を確認します。一方だけで確定しません。",
      "relatedSectionTitle": "第3節：津液の動態鑑別 ― 乾きか、水浸しか"
    },
    {
      "id": "lecture-diagnosis-8-q2",
      "question": "疲れやすさの報告から気虚・血虚を検討する際、適切なのはどれですか？",
      "options": [
        "疲労から気虚だけに限定する",
        "不足の候補と経過・他の所見を照合する",
        "血虚を選んだ時点で貧血の検査異常とみなす"
      ],
      "correctIndex": 1,
      "explanation": "疲れやすさは複数の候補に関わり得ます。伝統的な所見の組合せを比較しますが、気虚・血虚は単一症状や貧血の有無と一対一に対応しません。",
      "relatedSectionTitle": "第1節：気の動態鑑別 ― 不足か、運動失調か"
    },
    {
      "id": "lecture-diagnosis-8-q3",
      "question": "痛みの性状から気滞・瘀血を比較する学習として適切なのはどれですか？",
      "options": [
        "固定痛から血栓を確定する",
        "混在した痛みの一方を除く",
        "性状・部位・時間の変化を別に記す"
      ],
      "correctIndex": 2,
      "explanation": "性状は候補を比較する材料であり、分類や病名を確定する検査ではありません。突然の激しい痛みなどは安全性と必要な医療評価を先に検討します。",
      "relatedSectionTitle": "第2節：血の動態鑑別 ― 枯渇か、停滞か"
    }
  ]
},
  "lecture-diagnosis-9": {
  "lectureId": "lecture-diagnosis-9",
  "chapterId": "diagnosis",
  "chapterTitle": "第9章 臨床診断論",
  "lectureTitle": "臓腑・経絡との関係を検討する",
  "passingScore": 2,
  "questions": [
    {
      "id": "lecture-diagnosis-9-q1",
      "question": "臓腑・経絡との関係を検討する際、適切なのはどれですか？",
      "options": [
        "部位・経過・他の所見を照合する",
        "経絡の走行との一致を臓器疾患の根拠にする",
        "臓腑と経絡の分類を臓器と神経の検査値に換算する"
      ],
      "correctIndex": 0,
      "explanation": "臓腑・経絡は伝統理論の分類です。部位だけで臓器疾患や物理的な流路を同定するものではなく、医学的な評価も別に必要です。",
      "relatedSectionTitle": "第2節：経絡弁証 ― 痛みの走行と三陰三陽の同定"
    },
    {
      "id": "lecture-diagnosis-9-q2",
      "question": "「ストレスの時期に胸脇の張りとげっぷが増えた」という架空の報告を扱う際、適切なのはどれですか？",
      "options": [
        "時間的な関連から肝臓と胃の病変を確定する",
        "候補として経過・他症状・安全性を確認する",
        "げっぷがあるので胸脇の張りを記録から省く"
      ],
      "correctIndex": 1,
      "explanation": "肝気犯胃は臓腑の関係を説明する伝統的な候補です。この報告だけで解剖学的な肝臓・胃の病変、原因、介入を確定しません。",
      "relatedSectionTitle": "第4節：臓腑相関 ― 2つ以上の臓腑が織りなす連鎖病態"
    },
    {
      "id": "lecture-diagnosis-9-q3",
      "question": "食後のもたれがあるという報告だけから、避けるべき判断はどれですか？",
      "options": [
  "食事や服薬との時間関係を尋ねる",
  "脾の運化との関係を候補として考える",
  "脾気虚と胃の疾患を同じ診断として確定する"
],
      "correctIndex": 2,
      "explanation": "脾気虚は伝統分類の候補で、解剖学的な胃の疾患とは別です。単一の報告ではいずれも確定できず、経過・他の情報・必要な医学的評価を確認します。",
      "relatedSectionTitle": "第1節：臓腑の役割から候補を考える"
    }
  ]
},
  "lecture-diagnosis-10": {
  "lectureId": "lecture-diagnosis-10",
  "chapterId": "diagnosis",
  "chapterTitle": "第9章 臨床診断論",
  "lectureTitle": "仮説を比較し、矛盾を扱う",
  "passingScore": 2,
  "questions": [
    {
      "id": "lecture-diagnosis-10-q1",
      "question": "【候補の比較】候補Aには支持が二つと反証が一つ、候補Bには支持が一つで未確認が二つあります。比較の方法はどれですか？",
      "options": [
        "候補Bも残し情報の質と不足を確認する",
        "支持の数で候補Aを確定する",
        "先に立てた候補Aを優先しBの情報を除く"
      ],
      "correctIndex": 0,
      "explanation": "情報は数だけでなく観察条件、信頼性、重要性を確認します。支持・反証・不足を同じ表に置き、追加確認や保留の必要性を比較します。",
      "relatedSectionTitle": "第1節：鑑別仮説マトリクス"
    },
    {
      "id": "lecture-diagnosis-10-q2",
      "question": "仮説を支持すると思っていた舌の色が、照明を変えると違って見えた場合、最初の対応はどれですか？",
      "options": [
        "証名を追加して説明し、照明の違いは検討しない",
        "条件をそろえて再観察し、仮説を再検討する",
        "初期の分類を維持するため、今回の所見を省く"
      ],
      "correctIndex": 1,
      "explanation": "矛盾への対応には、観察条件の再確認、複合病態の検討、仮説の見直しがあります。この例では条件の違いを確認することが先です。限られた所見から真寒仮熱や治療を確定しません。",
      "relatedSectionTitle": "ステップ1：観察条件・外乱の再確認（手技と環境を疑う）"
    },
    {
      "id": "lecture-diagnosis-10-q3",
      "question": "冷えの訴えと熱を示すように解釈した舌の所見が食い違う場合、適切なのはどれですか？",
      "options": [
        "舌から冷えの報告を除く",
        "冷えから舌の記録を修正する",
        "条件・混在・別候補・保留を比較する"
      ],
      "correctIndex": 2,
      "explanation": "伝統的な複合分類にまとめれば必ず解決するとは限りません。両方の情報を保持し、条件を確認したうえで候補と不足情報を整理します。",
      "relatedSectionTitle": "第2節：矛盾に遭遇したときの「3大行動規範」"
    }
  ]
},
  "lecture-diagnosis-11": {
  "lectureId": "lecture-diagnosis-11",
  "chapterId": "diagnosis",
  "chapterTitle": "第9章 臨床診断論",
  "lectureTitle": "証を統合し、判断を記録する",
  "passingScore": 2,
  "questions": [
    {
      "id": "lecture-diagnosis-11-q1",
      "question": "【判断の記録】暫定的な証の候補を引き継ぐ際、分類名に添える情報はどれですか？",
      "options": [
        "候補・根拠・反証・不明点を併記する",
        "最も簡潔に説明できる証名だけを記録する",
        "確信を持たせるため不明点を記録から省く"
      ],
      "correctIndex": 0,
      "explanation": "証は固定したレッテルではなく、現在の情報からの暫定的な分類です。根拠、反証、不明点、確信度を示すことで、次の確認や再評価につなげます。",
      "relatedSectionTitle": "第3節：診断確信度の導入"
    },
    {
      "id": "lecture-diagnosis-11-q2",
      "question": "SOAPのA（評価・解釈）に記載する内容として適切なのはどれですか？",
      "options": [
        "本人が話した言葉を評価せず転記した内容",
        "候補・根拠・反証・不明点・確信度",
        "使用する経穴と実施する刺激条件"
      ],
      "correctIndex": 1,
      "explanation": "Aは評価・解釈を示す欄です。詳しい証名だけで再現性が保証されるわけではありません。S/Oの記録、判断根拠と不確実性、Pの計画を分けます。",
      "relatedSectionTitle": "第4節：東洋医学版SOAPカルテ記述フォーマット"
    },
    {
      "id": "lecture-diagnosis-11-q3",
      "question": "「昨日から腰が痛いと本人が話した」という情報を扱う方法はどれですか？",
      "options": ["原因を確認した所見としてOの欄に記す","施術者が立てた仮説としてAの欄に記す","本人が述べた自覚症状としてSの欄に記す"],
      "correctIndex": 2,
      "explanation": "本人の訴えは主観情報Sです。報告されたという事実と、原因が確認されたことは異なります。S/Oの得られた情報と、Aの仮説・評価、Pの計画を区別します。",
      "relatedSectionTitle": "第4節：東洋医学版SOAPカルテ記述フォーマット"
    }
  ]
},
  "lecture-diagnosis-12": {
  "lectureId": "lecture-diagnosis-12",
  "chapterId": "diagnosis",
  "chapterTitle": "第9章 臨床診断論",
  "lectureTitle": "総合演習・次章への接続",
  "passingScore": 2,
  "questions": [
    {
      "id": "lecture-diagnosis-12-q1",
      "question": "【第2節：5段階情報開示シミュレーション演習】限られた所見の記載から判断するとき、適切なのはどれですか？",
      "options": [
        "不足を保留し必要な医療評価を優先する",
        "記載のない症状は陰性として緊急性を除外する",
        "舌と脈が候補に合えば原因を確定する"
      ],
      "correctIndex": 0,
      "explanation": "この例は架空で、必要な評価が揃っていません。陰性の記載だけで重大な病気や緊急性を除外しません。",
      "relatedSectionTitle": "第2節：5段階情報開示シミュレーション演習"
    },
    {
      "id": "lecture-diagnosis-12-q2",
      "question": "【第3節：診断論から「治則・治法（第10章）」への引き継ぎ】次章へ渡す情報として、最も適切なのはどれですか？",
      "options": [
        "分類名だけで根拠や安全確認を省いた要約",
        "支持・反証・不足・安全確認・見直す条件",
        "分類名から次章の評価前に確定した治療法"
      ],
      "correctIndex": 1,
      "explanation": "診断論では情報と仮説を整理し、判断の根拠と保留する点を治則・治法の章へ渡します。分類名だけで個別の治療や効果を確定しません。",
      "relatedSectionTitle": "第3節：診断論から「治則・治法（第10章）」への引き継ぎ"
    },
    {
      "id": "lecture-diagnosis-12-q3",
      "question": "【第2節：5段階情報開示シミュレーション演習】サプリ使用後に症状が変化したという訴えを扱うとき、適切なのはどれですか？",
      "options": [
        "使用後なのでその製品が原因と確定する",
        "中焦の分類から処方や服用量の変更を指示する",
        "製品・量・服薬・時期を確認し相談する"
      ],
      "correctIndex": 2,
      "explanation": "使用と症状の変化の記載は、原因を確定した情報ではありません。仮説を見直し、必要な評価と相談に用いる情報を追加します。",
      "relatedSectionTitle": "第2節：5段階情報開示シミュレーション演習"
    }
  ]
},
  "lecture-treatment-1": {
  "lectureId": "lecture-treatment-1",
  "chapterId": "treatment",
  "chapterTitle": "第10章 治則・治法",
  "lectureTitle": "治療の目的と適応範囲",
  "passingScore": 2,
  "questions": [
    {
      "id": "lecture-treatment-1-q1",
      "question": "【目標の共有】「肩をよくしたい」という希望だけが記録されています。評価できる目標へつなげる確認はどれですか？",
      "options": [
        "困る作業と望む変化を本人と確認する",
        "分類名が変わることを本人の目標に代える",
        "施術回数を先に決めて達成基準とする"
      ],
      "correctIndex": 0,
      "explanation": "症状名だけでなく困る場面、望む変化、評価の指標と時期を本人と共有します。分類名や通院回数だけを改善目標に置き換えません。",
      "relatedSectionTitle": "第2節：本人の希望（ナラティブ）とSMARTゴールの統合"
    },
    {
      "id": "lecture-treatment-1-q2",
      "question": "器質的な疾患もある人と補完的な介入の目標を検討する際、適切なのはどれですか？",
      "options": [
        "分類が整えば病変も治癒すると見通しを示す",
        "医療と連携し、生活目標と限界を共有する",
        "治癒を目標にできなければ生活機能も扱わない"
      ],
      "correctIndex": 1,
      "explanation": "病変の治癒と苦痛・生活機能の目標を区別します。補完的な方法の効果を一律に約束したり、自律神経調整という機序を個別例で確定したりせず、必要な医療を遅らせません。",
      "relatedSectionTitle": "介入の適応と限界の境界線"
    },
    {
      "id": "lecture-treatment-1-q3",
      "question": "本講の三層ゴールを整理する組合せはどれですか？",
      "options": [
        "分類名・経穴名・予定する通院回数",
        "刺激の強さ・穴の数・同じ計画の継続",
        "苦痛軽減・生活機能・セルフケアと自立"
      ],
      "correctIndex": 2,
      "explanation": "三層は目標を整理する学習モデルです。すべての人に順番通り進むことや、体質改善・再発予防の効果を保証するものではありません。本人の希望、安全性、達成状況を共有して見直します。",
      "relatedSectionTitle": "第1節：治療の3層ゴールモデル"
    }
  ]
},
  "lecture-treatment-2": {
  "lectureId": "lecture-treatment-2",
  "chapterId": "treatment",
  "chapterTitle": "第10章 治則・治法",
  "lectureTitle": "証から治則・治法へつなぐ",
  "passingScore": 2,
  "questions": [
    {
      "id": "lecture-treatment-2-q1",
      "question": "治則と治法の関係として適切なのはどれですか？",
      "options": [
        "治則＝大方針、治法＝対象と目的の具体化",
        "治則＝経穴名、治法＝刺激の深度と時間",
        "治則＝証名、治法＝診察で確定した病名"
      ],
      "correctIndex": 0,
      "explanation": "治則と治法は異なる計画の層です。治法の名称は伝統的な目標の表現で、実際に臓器や気血をその通り動かせる機序・効果を証明したものではありません。",
      "relatedSectionTitle": "第2節：治則と治法の違い ― 「戦略」と「戦術」"
    },
    {
      "id": "lecture-treatment-2-q2",
      "question": "六階層モデルで、証名から配穴を直接一つに決めない理由はどれですか？",
      "options": [
        "証と刺激量は同じ、個別条件は検討しない",
        "証と方法は別、個別条件と安全性も検討する",
        "証と配穴は別、評価計画は配穴で代用する"
      ],
      "correctIndex": 1,
      "explanation": "本講の対象は証・治則・治法・配穴や方法・操作や刺激量・評価の区別です。同じ分類名でも個別条件は異なります。未説明の八法や発汗・投薬を選択させる問題ではありません。",
      "relatedSectionTitle": "第1節：治療設計の6階層ピラミッド"
    },
    {
      "id": "lecture-treatment-2-q3",
      "question": "【同じ証と個別条件】同じ伝統的な証の候補でも、刺激への不安や持病・服薬が異なる二人の計画を分ける理由はどれですか？",
      "options": ["同じ証という分類を根拠に、刺激条件を二人でそろえる","年齢という条件を根拠に、刺激量を二人で使い分ける","個別の安全情報を根拠に、候補と制約を二人で比較する"],
      "correctIndex": 2,
      "explanation": "証名だけで方法や刺激量を一つに決めず、解剖、体格、持病、服薬、不安や同意などを確認します。同じ証という分類は、個別条件や安全性が同じという意味ではありません。",
      "relatedSectionTitle": "第3節：同一の「証」から異なる「処方」が導かれる理由"
    }
  ]
},
  "lecture-treatment-3": {
  "lectureId": "lecture-treatment-3",
  "chapterId": "treatment",
  "chapterTitle": "第10章 治則・治法",
  "lectureTitle": "補瀉・寒熱の原則を理解する",
  "passingScore": 2,
  "questions": [
    {
      "id": "lecture-treatment-3-q1",
      "question": "【寒熱への治法】伝統理論で、寒熱の分類に対する清法・温法の基本的な対応はどれですか？",
      "options": [
        "熱者清之・寒者温之",
        "熱者温之・寒者清之",
        "熱者補之・寒者瀉之"
      ],
      "correctIndex": 0,
      "explanation": "熱には清、寒には温という基本対応を学びます。ただし分類と実際の方法・刺激条件・医療上の対応は別の判断です。単一の訴えだけで寒熱や実施の適応を確定しません。",
      "relatedSectionTitle": "第2節：寒熱への対応 ― 熱者清之・寒者温之"
    },
    {
      "id": "lecture-treatment-3-q2",
      "question": "「虚虚実実」という伝統的な戒めが指す考え方はどれですか？",
      "options": [
        "虚と実の併存を記録して判断を保留する対応",
        "不足を損ない、過剰・停滞を助長する対応",
        "補瀉の名称と刺激条件を分けて記録する対応"
      ],
      "correctIndex": 1,
      "explanation": "伝統理論内では虚をさらに虚させ、実をさらに実させる誤治への戒めです。補瀉は学習上の原則で、気の消失や病勢の爆発という物理機序を証明したものではありません。安全性や医学的な評価は別に必要です。",
      "relatedSectionTitle": "第1節：補虚瀉実の基本"
    },
    {
      "id": "lecture-treatment-3-q3",
      "question": "「痛みが強いから実証であり、強い刺激が必要」とは決められない理由はどれですか？",
      "options": [
  "痛みの強さだけで虚実を分類できるから",
  "補瀉の名称だけで安全性が決まるから",
  "痛み・虚実・刺激の安全性は別の情報だから"
],
      "correctIndex": 2,
      "explanation": "強い痛みが実証や強刺激の必要性を直接示すわけではありません。他の所見、医学的な評価、部位や服薬などの個別リスク、本人の希望を確認します。",
      "relatedSectionTitle": "判断の注意点：痛みの強さと刺激量を直結しない"
    }
  ]
},
  "lecture-treatment-4": {
  "lectureId": "lecture-treatment-4",
  "chapterId": "treatment",
  "chapterTitle": "第10章 治則・治法",
  "lectureTitle": "本治・標治と優先順位",
  "passingScore": 2,
  "questions": [
    {
      "id": "lecture-treatment-4-q1",
      "question": "【本と標】慢性的な背景と今の強い苦痛を分ける本標の学習モデルでは、どの対比を使いますか？",
      "options": [
        "本＝背景の病態、標＝現れている苦痛",
        "本＝今の症状、標＝過去の背景",
        "本＝身体の深い部位、標＝身体の浅い部位"
      ],
      "correctIndex": 0,
      "explanation": "本は背景や基盤、標は現れている症状などを考える枠組みです。部位の深浅や過去・現在だけの区分ではありません。緊急性を確認し、安全が確保された状況で優先順位を検討します。",
      "relatedSectionTitle": "第1節：本治と標治の定義と役割分担"
    },
    {
      "id": "lecture-treatment-4-q2",
      "question": "【標本緩急の意思決定】長期の慢性脾胃虚弱（本虚）を抱えている患者が、激しい急性水様性下痢と嘔吐を起こして脱水危機（標実/標急）に瀕している場合、東洋医学の原則（標本緩急）に基づく最優先の介入方針はどれですか？",
      "options": ["慢性の背景を優先し、本治の計画を先に完成させる","現在の脱水の危険を優先し、救急医療につなげる","伝統的な分類を優先し、標実の治法を先に決める"],
      "correctIndex": 1,
      "explanation": "「急則治其標」は伝統的な原則ですが、激しい嘔吐・下痢に意識異常や急激な悪化が伴う状況を鍼灸だけで対応する指示ではありません。医療評価と必要な救急対応を優先します。",
      "relatedSectionTitle": "第2節：優先順位を決める「4大評価軸」"
    },
    {
      "id": "lecture-treatment-4-q3",
      "question": "急な強い苦痛と慢性的な背景があるとき、本標のモデルを扱う方法として適切なのはどれですか？",
      "options": [
        "本治があれば呼吸困難も後で扱う",
        "標治の計画があれば救急症状もそれだけで扱う",
        "医療評価を優先し安定後に目標を比較する"
      ],
      "correctIndex": 2,
      "explanation": "急則治其標・緩則治其本は伝統的な優先順位の考え方です。呼吸困難や急激な悪化を教材の治法で処置する指示ではなく、必要な救急対応や受診を遅らせません。",
      "relatedSectionTitle": "第2節：優先順位を決める「4大評価軸」"
    }
  ]
},
  "lecture-treatment-5": {
  "lectureId": "lecture-treatment-5",
  "chapterId": "treatment",
  "chapterTitle": "第10章 治則・治法",
  "lectureTitle": "気への治法を整理する",
  "passingScore": 2,
  "questions": [
    {
      "id": "lecture-treatment-5-q1",
      "question": "気の五大治法を比較する際、適切なのはどれですか？",
      "options": [
        "不足・停滞・上逆・下陥・固摂の失調",
        "症状名ごとに固定した経穴の一覧",
        "各治法で測定済みの生理効果の強さ"
      ],
      "correctIndex": 0,
      "explanation": "比較するのは伝統的な分類と治法の目的です。分類名だけで個別の方法、刺激条件や効果を確定するものではありません。",
      "relatedSectionTitle": "第1節：気の5大治法 比較マトリクス"
    },
    {
      "id": "lecture-treatment-5-q2",
      "question": "伝統用語として「気逆」に対する治法の目的を対応させたものはどれですか？",
      "options": [
        "昇提：下陥を扱う",
        "降気・降逆：上逆を扱う",
        "固摂：漏出を扱う"
      ],
      "correctIndex": 1,
      "explanation": "三つは異なる伝統的な目的です。気逆と降気の用語対応を確認する問題で、嘔吐やしゃっくりの原因・病名を分類だけで決めたり、個別の治療を指示したりしません。",
      "relatedSectionTitle": "第3節：気の運動方向の制御 ― 昇降の力学"
    },
    {
      "id": "lecture-treatment-5-q3",
      "question": "気の伝統的な分類と治法の目的の対応として適切なのはどれですか？",
      "options": [
        "気虚―降気、気滞―固摂、気逆―昇提、気陥―理気",
        "気虚―理気、気滞―補気、気逆―固摂、気陥―降気",
        "気虚―補気、気滞―理気、気逆―降気、気陥―昇提"
      ],
      "correctIndex": 2,
      "explanation": "不足・滞り・上逆・下陥に対する伝統的な目的を区別します。気陥を胃下垂等の病名と同一視せず、症状があるだけでこの対応を患者に適用しません。",
      "relatedSectionTitle": "第1節：気の5大治法 比較マトリクス"
    }
  ]
},
  "lecture-treatment-6": {
  "lectureId": "lecture-treatment-6",
  "chapterId": "treatment",
  "chapterTitle": "第10章 治則・治法",
  "lectureTitle": "血・津液への治法を整理する",
  "passingScore": 2,
  "questions": [
    {
      "id": "lecture-treatment-6-q1",
      "question": "【津液への治法】津液の不足と停滞に着目する伝統的な治法の目的の区別はどれですか？",
      "options": [
        "滋陰・生津＝不足、利水・祛痰＝停滞",
        "滋陰・生津＝停滞、利水・祛痰＝不足",
        "滋陰・生津＝血の停滞、利水・祛痰＝血の不足"
      ],
      "correctIndex": 0,
      "explanation": "滋陰・生津は潤す働きの不足、利水・祛痰は水湿や痰などの停滞を扱う目的として学びます。実際の体液量、薬、飲水などの判断は医学的評価や個別の安全確認と分けます。",
      "relatedSectionTitle": "第3節：津液の不足と停滞を分ける"
    },
    {
      "id": "lecture-treatment-6-q2",
      "question": "理気と活血を組み合わせる伝統的な説明を、どう扱いますか？",
      "options": [
  "伝統的な理由があるため全員に同じ組合せを使う",
  "選定の考え方として学び効果と安全性は別に確認する",
  "気血の関係図から出血リスクも判断する"
],
      "correctIndex": 1,
      "explanation": "気と血の関係は伝統理論内の選定理由を説明します。具体的な方法の効果や安全性、対象者の条件が確認されたという意味ではありません。",
      "relatedSectionTitle": "第2節：養血・活血と気との関係"
    },
    {
      "id": "lecture-treatment-6-q3",
      "question": "養血と活血の目的を比較した説明として適切なのはどれですか？",
      "options": [
        "養血＝血の停滞、活血＝養いの不足",
        "養血＝気の上逆、活血＝気の下陥",
        "養血＝養いの不足、活血＝血の停滞"
      ],
      "correctIndex": 2,
      "explanation": "不足と停滞という異なる観点を比較します。血虚・瘀血は貧血・血栓の同義語ではなく、養血・活血という名称から検査値の改善や特定生薬の安全性・必要性を保証しません。",
      "relatedSectionTitle": "活血と養血の目的の違い"
    }
  ]
},
  "lecture-treatment-7": {
  "lectureId": "lecture-treatment-7",
  "chapterId": "treatment",
  "chapterTitle": "第10章 治則・治法",
  "lectureTitle": "臓腑の機能に介入する",
  "passingScore": 2,
  "questions": [
    {
      "id": "lecture-treatment-7-q1",
      "question": "臓腑相関の治法を比較する学習で確認することはどれですか？",
      "options": [
        "関係・治法の目的・不足情報を分ける",
        "名称が合えば機能回復とする",
        "臓腑名の一致を同じ方法を選ぶ十分な条件とする"
      ],
      "correctIndex": 0,
      "explanation": "臓腑相関は伝統的な説明モデルとして扱います。治法の名称と実際の生理機序や機能回復を同一視せず、効果や安全性は別に評価します。",
      "relatedSectionTitle": "第2節：機能間連携の再建 ― 4大臓腑相関治法"
    },
    {
      "id": "lecture-treatment-7-q2",
      "question": "「肝と脾の関係の失調」という伝統的な整理に、疎肝健脾を対応させる説明はどれですか？",
      "options": [
        "肝の疏泄だけで脾は含めない",
        "肝の疏泄と脾の運化",
        "腎の蔵精と心の主血脈"
      ],
      "correctIndex": 1,
      "explanation": "疎肝健脾・抑木扶土は肝脾の関係を扱う伝統的な治法の表現です。実際の肝臓と脾臓への機序や相互干渉の解消を証明した説明ではありません。",
      "relatedSectionTitle": "1. 抑木扶土（よくぼくふど）／ 疎肝健脾"
    },
    {
      "id": "lecture-treatment-7-q3",
      "question": "健脾益気という伝統的な治法の目的はどれですか？",
      "options": [
        "肝の疏泄の停滞を和らげる目的",
        "腎陰を滋養して肝との関係を扱う目的",
        "脾の運化と気の不足を補う目的"
      ],
      "correctIndex": 2,
      "explanation": "名称の対象と目的を比較する問題です。食欲不振や軟便だけで分類・配穴を決めず、健脾益気という用語が特定の経穴の効果を保証するとも考えません。",
      "relatedSectionTitle": "第1節：五臓の中核治法マトリクス"
    }
  ]
},
  "lecture-treatment-8": {
  "lectureId": "lecture-treatment-8",
  "chapterId": "treatment",
  "chapterTitle": "第10章 治則・治法",
  "lectureTitle": "経絡・経穴を選択する",
  "passingScore": 2,
  "questions": [
    {
      "id": "lecture-treatment-8-q1",
      "question": "配穴候補の選定理由を説明するとき、適切なのはどれですか？",
      "options": [
        "選定の理由と機序の仮説を分け、安全性も評価",
        "選定の理由を機序の証明とし、安全性は確認済み",
        "経穴の名称を理由の説明に代え、評価計画は省略"
      ],
      "correctIndex": 0,
      "explanation": "選定理由と実際の機序・効果の証明は異なります。局所・遠隔、要穴の関係を比較しながら、個別条件と不足情報も示します。",
      "relatedSectionTitle": "第1節：配穴の3大基本ディメンション"
    },
    {
      "id": "lecture-treatment-8-q2",
      "question": "原絡配穴（主客配穴）の伝統的な組合せはどれですか？",
      "options": [
        "主経の絡穴＋表裏の経の原穴",
        "主経の原穴＋表裏の経の絡穴",
        "主経の原穴＋同じ経の絡穴"
      ],
      "correctIndex": 1,
      "explanation": "原穴を主、表裏関係にある経絡の絡穴を客とする伝統的な組合せです。名称の原則を学ぶ問題で、併用により治療効果が飛躍的に高まることや臓腑の調整を保証しません。",
      "relatedSectionTitle": "1. 原絡配穴（げんらくはいけつ：主客配穴）"
    },
    {
      "id": "lecture-treatment-8-q3",
      "question": "遠隔穴を検討する際、伝統的な選定理由と作用機序を分けた説明はどれですか？",
      "options": [
        "経絡に沿えば鎮痛機序は確認済み",
        "遠隔なら安全性は確認済み",
        "経絡は選定理由、機序と安全性は別に評価する"
      ],
      "correctIndex": 2,
      "explanation": "選定理由があることと、機序・効果が確認されたことは異なります。遠隔穴でも安全の保証にはなりません。経穴の位置・所属も混同せず確認します（崑崙BL60は足関節後外側、後渓SI3は手の小腸経）。",
      "relatedSectionTitle": "出典と確認範囲"
    }
  ]
},
  "lecture-treatment-9": {
  "lectureId": "lecture-treatment-9",
  "chapterId": "treatment",
  "chapterTitle": "第10章 治則・治法",
  "lectureTitle": "介入方法と刺激量を設計する",
  "passingScore": 2,
  "questions": [
    {
      "id": "lecture-treatment-9-q1",
      "question": "【刺激条件の前提】予定する経穴名と本人の不安だけが記録されています。実施前に不足している確認はどれですか？",
      "options": [
        "局所解剖・持病・服薬も確認する",
        "低刺激なら確認は完了とする",
        "同じ経穴名なら前の患者の条件をそのまま使う"
      ],
      "correctIndex": 0,
      "explanation": "経穴名や低刺激という表現だけでは安全を保証しません。局所解剖、体格、持病、服薬、本人の希望と同意などを確認し、判断できない場合は保留します。",
      "relatedSectionTitle": "施術前の確認"
    },
    {
      "id": "lecture-treatment-9-q2",
      "question": "施術後に倦怠感やめまいの報告があった場合、適切な評価はどれですか？",
      "options": [
        "正気の消耗だけで原因とする",
        "程度・経過・安全性を確認する",
        "翌日に出た症状なら施術とは無関係とする"
      ],
      "correctIndex": 1,
      "explanation": "倦怠感やめまいを好転反応や刺激量の問題だけで説明せず、有害事象や他の原因を検討します。小さい刺激でも損傷や熱傷等のリスクは残り、継続・保留・受診を個別に判断します。",
      "relatedSectionTitle": "施術中の変化"
    },
    {
      "id": "lecture-treatment-9-q3",
      "question": "【個別の安全評価】体格が小さく刺激に不安がある患者の初期計画として、最も適切なものはどれですか？",
      "options": [
        "穴数を減らせば安全とする",
        "弱い刺激なら確認を終える",
        "個別条件と同意を確認し、保留も考える"
      ],
      "correctIndex": 2,
      "explanation": "個人差に配慮し、具体的な方法とリスクを説明します。低刺激であれば安全という保証や、全員に共通の穴数・深度は設けられません。",
      "relatedSectionTitle": "小さい刺激でも安全の保証にはならない"
    }
  ]
},
  "lecture-treatment-10": {
  "lectureId": "lecture-treatment-10",
  "chapterId": "treatment",
  "chapterTitle": "第10章 治則・治法",
  "lectureTitle": "生活背景・病因への対応を組み込む",
  "passingScore": 2,
  "questions": [
    {
      "id": "lecture-treatment-10-q1",
      "question": "【生活背景への対応】睡眠を見直したい人に、夜勤と育児による制約があります。合意形成の方法はどれですか？",
      "options": ["夜勤と育児の制約から、本人と小さな調整を選ぶ","睡眠の症状から、全員に共通の起床時刻を選ぶ","施術者の生活像から、本人の改善すべき点を選ぶ"],
      "correctIndex": 0,
      "explanation": "生活背景と症状の関係は候補として確認し、本人の事情に合う最小単位の調整や選択肢を相談します。一律の指示や原因の決めつけに代えず、実行後の変化も評価します。",
      "relatedSectionTitle": "2. 生活指導が失敗する原因と「合意形成」の技術"
    },
    {
      "id": "lecture-treatment-10-q2",
      "question": "生活背景への対応を計画に含める目的として適切なのはどれですか？",
      "options": ["生活との関連を原因とし、医学的評価を指導に代える","生活との関連を仮説とし、実行できる調整を相談する","生活との関連を分類とし、同じ分類に同じ調整を勧める"],
      "correctIndex": 1,
      "explanation": "生活背景は関連する可能性のある情報です。生活調整で根本治療が完結する、調整しなければ再発が不可避という断定を避け、本人の文脈と必要な医療を確認します。",
      "relatedSectionTitle": "2. 生活指導が失敗する原因と「合意形成」の技術"
    },
    {
      "id": "lecture-treatment-10-q3",
      "question": "慢性痛が再び気になったという報告を受けた際、生活背景の扱いとして適切なのはどれですか？",
      "options": [
        "再発から生活態度を原因とする",
        "一時軽減したことを再評価不要の根拠とする",
        "負荷や睡眠の変化と計画を再確認する"
      ],
      "correctIndex": 2,
      "explanation": "再発や不持続には複数の説明があり得ます。生活背景を原因と決めつけず、実行可能な調整を合意し、症状・機能・有害な反応を評価します。効果を施術と負荷軽減の単純な和で計算しません。",
      "relatedSectionTitle": "病因特定のための「時間軸トラッキング」"
    }
  ]
},
  "lecture-treatment-11": {
  "lectureId": "lecture-treatment-11",
  "chapterId": "treatment",
  "chapterTitle": "第10章 治則・治法",
  "lectureTitle": "評価・継続・変更・終了を設計する",
  "passingScore": 2,
  "questions": [
    {
      "id": "lecture-treatment-11-q1",
      "question": "【評価の条件】初回と次回の痛みを比べて計画を見直したいとき、比較条件の整え方はどれですか？",
      "options": [
        "同じ指標・条件で経過を比べる",
        "直後の変化を長期効果とする",
        "異なる尺度の点数をそのまま比較する"
      ],
      "correctIndex": 0,
      "explanation": "同じ指標と評価条件を用い、症状、生活機能、有害な変化などを分けて経過を確認します。直後の変化だけで長期の効果や因果を確定しません。",
      "relatedSectionTitle": "評価に使う情報"
    },
    {
      "id": "lecture-treatment-11-q2",
      "question": "【治療反応の評価と計画変更】初回の施術後に患者が「翌朝、少しだるさが出たが、その後に長年の首の重みが劇的に軽くなり熟睡できた」と報告した場合の臨床的評価はどれですか？",
      "options": [
        "首の軽減を優先して記録し、だるさは効果と判断",
        "首の軽減とだるさを別に記録し、程度と経過を確認",
        "だるさだけを優先して記録し、全方針を逆に変更"
      ],
      "correctIndex": 1,
      "explanation": "施術後のだるさを改善の証拠や「好転反応」と決めつけません。主訴の改善、有害な反応、自然経過などを分けて評価し、患者の希望と安全性を踏まえて計画を調整します。",
      "relatedSectionTitle": "評価に使う情報"
    },
    {
      "id": "lecture-treatment-11-q3",
      "question": "継続中の施術後に症状の悪化が報告された場合、適切なのはどれですか？",
      "options": [
        "予定回数まで継続してから評価する",
        "弁証の名前だけ変えて継続する",
        "安全性を確認し、保留・受診も検討する"
      ],
      "correctIndex": 2,
      "explanation": "不変と悪化は同じ扱いにせず、悪化があれば予定回数を待たずに対応を検討します。新しい症状や急激な悪化は必要な医療評価を優先し、好転反応と決めつけません。",
      "relatedSectionTitle": "悪化を好転反応と決めつけない"
    }
  ]
},
  "lecture-treatment-12": {
  "lectureId": "lecture-treatment-12",
  "chapterId": "treatment",
  "chapterTitle": "第10章 治則・治法",
  "lectureTitle": "総合演習・次章への接続",
  "passingScore": 2,
  "questions": [
    {
      "id": "lecture-treatment-12-q1",
      "question": "【計画書の不足】目標と介入候補は書かれていますが、いつ何を比較するかが未記入です。補う項目はどれですか？",
      "options": [
        "評価指標と見直す条件を補う",
        "証名が詳しければ完成とする",
        "経穴名を追加して評価項目の不足を補う"
      ],
      "correctIndex": 0,
      "explanation": "治療計画は分類名や方法だけでなく、評価指標、時期、継続・変更・中断を考える条件を含めます。安全確認、説明と同意なども別に確認します。",
      "relatedSectionTitle": "1. 治療計画書：判断を整理する7つの項目"
    },
    {
      "id": "lecture-treatment-12-q2",
      "question": "計画を立てた架空例に、新しい症状と本人の負担の情報が加わった。次の判断として適切なのはどれですか？",
      "options": ["当初の証名との整合を優先し、介入候補を追加する","安全性と反応を再確認し、継続・変更・終了を比較する","当初の予定回数を優先し、評価を終了時にまとめる"],
      "correctIndex": 1,
      "explanation": "新しい症状や負担は、当初の判断を見直す情報です。緊急性と必要な医療評価を確認し、本人の目標・変化・負担から計画を更新します。",
      "relatedSectionTitle": "6. 次章「第11章 統合症例・再評価」への展望"
    },
    {
      "id": "lecture-treatment-12-q3",
      "question": "【総合治療計画の立案と共有】診断から導かれた治療計画を患者に説明し合意形成（インフォームド・コンセント）を行う際、最も不可欠な要素は何ですか？",
      "options": [
        "同意書への署名だけで理解の確認に代える",
        "良くなる見込みだけを話し不確実性は後で伝える",
        "目的・限界・期間・リスク・対応を共有する"
      ],
      "correctIndex": 2,
      "explanation": "患者との信頼関係と治療成果は、専門用語を日常語に翻訳し、見通しとセルフケアの役割分担を透明に共有する合意形成によって支えられます。",
      "relatedSectionTitle": "1. 治療計画書：判断を整理する7つの項目"
    }
  ]
},
  "lecture-practice-1": {
  "lectureId": "lecture-practice-1",
  "chapterId": "practice",
  "chapterTitle": "第11章 統合症例・再評価",
  "lectureTitle": "臨床の全体プロセスを確認する",
  "passingScore": 2,
  "questions": [
    {
      "id": "lecture-practice-1-q1",
      "question": "意思決定の各段階と自己修正の関係として適切なのはどれですか？",
      "options": ["新情報が加われば、前の段階の判断を再評価する","新情報が加われば、終了の段階まで判断を進める","新情報が加われば、初回の安全評価に判断をそろえる"],
      "correctIndex": 0,
      "explanation": "各段階は一方向に終わる手順ではありません。新情報や悪化があれば安全性や仮説へ戻ります。Webでの判断の学習と実際の診療技能も区別します。",
      "relatedSectionTitle": "2. 手順の遵守（プロトコル）と自己修正ループ"
    },
    {
      "id": "lecture-practice-1-q2",
      "question": "Web上の症例演習で練習することと、別に学ぶ必要があることの組合せはどれですか？",
      "options": [
  "Webで刺鍼技能、実習で用語だけを学ぶ",
  "Webで判断の理由、指導のある実習で実技を学ぶ",
  "Webで合格すれば実際の診療技能も認定される"
],
      "correctIndex": 1,
      "explanation": "本教材は情報から判断と根拠を記す練習です。刺鍼・施灸などの実技、資格、個別の安全評価や同意は別に必要で、Webの修了では代替できません。",
      "relatedSectionTitle": "3. Web推論（設計判断）とベッドサイド実技の峻別"
    },
    {
      "id": "lecture-practice-1-q3",
      "question": "施術直後に楽になったという架空の報告から、追加で確認することはどれですか？",
      "options": ["直後の変化と初診の証名を比べ、治療機序を確定する","直後の変化と選穴の理論を比べ、配穴の効果を確定する","持続時間・生活機能・有害な反応を記録し、経過を比較する"],
      "correctIndex": 2,
      "explanation": "改善の報告は評価材料ですが、完治や作用機序の証明ではありません。自然経過や他の介入などもあり得るため、時間を通した変化と安全性を確認します。",
      "relatedSectionTitle": "臨床で最も重要な2つのステップ"
    }
  ]
},
  "lecture-practice-2": {
  "lectureId": "lecture-practice-2",
  "chapterId": "practice",
  "chapterTitle": "第11章 統合症例・再評価",
  "lectureTitle": "症例情報を読み解く",
  "passingScore": 2,
  "questions": [
    {
      "id": "lecture-practice-2-q1",
      "question": "【空欄の扱い】頭痛の問診票で睡眠と服薬の欄が空白です。症例要約における扱いはどれですか？",
      "options": [
        "未確認として残し追加質問を記す",
        "空欄は異常なしとして要約する",
        "分類に不要と判断して空欄の項目を除く"
      ],
      "correctIndex": 0,
      "explanation": "書かれていない情報は、陰性や正常と確認した情報ではありません。未確認として保持し、安全性や仮説比較に必要な追加質問を示します。",
      "relatedSectionTitle": "2. 「分からない情報」を無理に捨てない（保留の技術）"
    },
    {
      "id": "lecture-practice-2-q2",
      "question": "問診票に「私の頭痛は低血圧のせいです」とある場合、適切な記録はどれですか？",
      "options": [
        "診察で確認した原因としての記録、発症経過は不要",
        "本人の原因についての考え、経過・検査は別に確認",
        "原因に関する考えは記録から除外、症状名だけ要約"
      ],
      "correctIndex": 1,
      "explanation": "本人がそう考えていることと、原因が確認されたことは異なります。訴え、観察・検査の情報、原因の候補を分けます。本人の報告を客観的な身体所見や病機の証明と呼び替えません。",
      "relatedSectionTitle": "1. 事実と解釈の峻別フレームワーク"
    },
    {
      "id": "lecture-practice-2-q3",
      "question": "複数の訴えがある架空例で、今回の主訴を整理する方法はどれですか？",
      "options": [
        "施術者が扱いやすい症状を先に選ぶ",
        "訴えの数が多い部位を優先する基準にする",
        "本人の困りごとと生活への支障を尋ねる"
      ],
      "correctIndex": 2,
      "explanation": "本人の希望と生活への支障を確かめて重要情報を要約します。主訴を絞っても他の訴えを捨てず、未確認事項や安全性に関わる情報を残します。",
      "relatedSectionTitle": "3. 【共通模擬症例：第1段階 開示】"
    }
  ]
},
  "lecture-practice-3": {
  "lectureId": "lecture-practice-3",
  "chapterId": "practice",
  "chapterTitle": "第11章 統合症例・再評価",
  "lectureTitle": "最初の対応を決める",
  "passingScore": 2,
  "questions": [
    {
      "id": "lecture-practice-3-q1",
      "question": "「1か月前のMRIで異常なしと説明された」という本人の話を、どう扱いますか？",
      "options": [
        "受診時の説明の申告として現在の変化も確認する",
        "現在の危険徴候がすべて除外されたと扱う",
        "検査結果の原資料を確認した所見として扱う"
      ],
      "correctIndex": 0,
      "explanation": "本人の受診報告と原資料の確認は区別します。過去の検査は現在の安全性を保証しないため、その後の症状の変化や未確認事項も確かめます。",
      "relatedSectionTitle": "2. 【共通模擬症例：第2段階 開示】"
    },
    {
      "id": "lecture-practice-3-q2",
      "question": "問診中に突然ろれつが回らなくなった場合、優先する対応はどれですか？",
      "options": [
  "以前のMRIで異常なしなら経過を見る",
  "施術を行わず119への救急要請を優先する",
  "頭痛の証を分類してから紹介先を考える"
],
      "correctIndex": 1,
      "explanation": "急なろれつの異常は救急対応を考える徴候です。過去の検査結果で現在の変化を否定せず、伝統分類や施術を先にして対応を遅らせません。",
      "relatedSectionTitle": "1. 頭痛におけるレッドフラッグ（危険信号）のチェックリスト"
    },
    {
      "id": "lecture-practice-3-q3",
      "question": "架空例に「発熱・麻痺はない」と記載されている場合、適切な結論はどれですか？",
      "options": [
        "二つの陰性所見で重大な病気を除外する",
        "伝統分類が付けば残る受診判断を省略する",
        "確認された範囲として記録する"
      ],
      "correctIndex": 2,
      "explanation": "「発熱・麻痺はない」は、その2項目について症例に記された陰性所見です。これだけで他の危険兆候や緊急性、重大な病気をすべて除外できません。確認された陰性所見、まだ確認していない事項、判断を保留する条件を分けて記録します。",
      "relatedSectionTitle": "2. 【共通模擬症例：第2段階 開示】"
    }
  ]
},
  "lecture-practice-4": {
  "lectureId": "lecture-practice-4",
  "chapterId": "practice",
  "chapterTitle": "第11章 統合症例・再評価",
  "lectureTitle": "問診と観察を進める",
  "passingScore": 2,
  "questions": [
    {
      "id": "lecture-practice-4-q1",
      "question": "「疲れた日に頭痛が気になる」という報告で、「疲れ」と増悪・軽減の関係を具体化する質問はどれですか？",
      "options": ["活動量、休息の有無と頭痛の変動を尋ねる","痛みの位置、放散する範囲と部位を尋ねる","初回施術、経穴に対する期待と不安を尋ねる"],
      "correctIndex": 0,
      "explanation": "症状の名称だけで決めず、活動や休息、時間帯などと症状の変動を具体的に確認します。候補に合う言葉を引き出す誘導ではなく、候補を区別する情報を集めます。",
      "relatedSectionTitle": "1. 慢性頭痛における代表的な対立仮説"
    },
    {
      "id": "lecture-practice-4-q2",
      "question": "症状の様子がまだ曖昧なとき、質問をどう進めますか？",
      "options": ["想定した症状の二択から、同意した内容の詳しい聴取へ進む","本人の自由な語りから、時期や条件を絞った具体的確認へ進む","本人の自由な語りから、その話の解釈についての同意へ進む"],
      "correctIndex": 1,
      "explanation": "まず本人の自由な語りを聞き、その後に時期・活動・休息などを具体的に確認します。最初から想定した分類に同意を求める進め方は避けます。",
      "relatedSectionTitle": "2. 【共通模擬症例：第3段階 開示】"
    },
    {
      "id": "lecture-practice-4-q3",
      "question": "問診中に姿勢・顔色・声・呼吸も観察する際、適切な情報の統合はどれですか？",
      "options": [
        "顔色と声で報告の採否を決める",
        "観察の印象を気血の確定した状態に置き換える",
        "本人の報告と観察した特徴を別に記す"
      ],
      "correctIndex": 2,
      "explanation": "複数の情報を合わせても、本人の痛みの真偽や気血の状態を直接測定したことにはなりません。得られた情報、解釈、不足情報を分けて比較します。",
      "relatedSectionTitle": "2. 【共通模擬症例：第3段階 開示】"
    }
  ]
},
  "lecture-practice-5": {
  "lectureId": "lecture-practice-5",
  "chapterId": "practice",
  "chapterTitle": "第11章 統合症例・再評価",
  "lectureTitle": "仮説を比較して弁証する",
  "passingScore": 2,
  "questions": [
    {
      "id": "lecture-practice-5-q1",
      "question": "【弁証の統合】舌と脈の追加所見が一つの候補に合いましたが、他の訴えは説明できていません。統合の方法はどれですか？",
      "options": [
        "支持・反証・不足を残して暫定的な候補を示す",
        "新所見に合う一つの証にまとめる",
        "合わない所見は除外する"
      ],
      "correctIndex": 0,
      "explanation": "支持所見が加わっても、反証や不足情報を消す必要はありません。主な候補と併存する候補、保留する判断を分けて示し、見直す条件を残します。",
      "relatedSectionTitle": "1. 【共通模擬症例：第4段階 開示】"
    },
    {
      "id": "lecture-practice-5-q2",
      "question": "共通症例で脾気虚を候補に残した根拠の組合せはどれですか？",
      "options": [
  "頭痛という主訴と年齢だけ",
  "疲労・食後のもたれ・軟便など",
  "過去のMRIの説明と通院できる曜日"
],
      "correctIndex": 1,
      "explanation": "比較表では疲労、食後のもたれ、軟便、淡い舌などを支持情報として挙げています。ただし観察条件や睡眠・服薬の影響などが未確認で、候補は暫定的です。",
      "relatedSectionTitle": "候補の比較表"
    },
    {
      "id": "lecture-practice-5-q3",
      "question": "痰湿に関連づける「厚い苔」が記載されていません。この扱いはどれですか？",
      "options": [
  "記載がないので痰湿を完全に否定する",
  "重い頭痛があるので厚い苔もあると補う",
  "支持が限られると記し不足情報を確認する"
],
      "correctIndex": 2,
      "explanation": "記載がないことを、観察して認めなかったことに読み替えません。他の支持情報と合わせて比較し、必要な確認を残します。",
      "relatedSectionTitle": "候補の比較表"
    }
  ]
},
  "lecture-practice-6": {
  "lectureId": "lecture-practice-6",
  "chapterId": "practice",
  "chapterTitle": "第11章 統合症例・再評価",
  "lectureTitle": "治療目標と優先順位を決める",
  "passingScore": 2,
  "questions": [
    {
      "id": "lecture-practice-6-q1",
      "question": "【二層の目標】今週の仕事上の困りごとと、数週間続く生活上の支障が挙がりました。目標の整理はどれですか？",
      "options": [
        "直近の生活目標と中期目標を分ける",
        "体質の分類だけを全期間の目標にする",
        "直後の痛みの変化を長期目標の達成とする"
      ],
      "correctIndex": 0,
      "explanation": "安全性を前提に、本人の希望に沿う直近の目標と中期的な目標を分けます。生活機能や評価時期も示し、一回の反応だけで中長期の達成を判断しません。",
      "relatedSectionTitle": "2. 短期目標と中長期目標の二層設計"
    },
    {
      "id": "lecture-practice-6-q2",
      "question": "共通症例の「プレゼン準備を進めたい」を評価できる目標にする例はどれですか？",
      "options": [
  "1週間後に体質が良くなったかだけ尋ねる",
  "1週間後に夕方の作業時間と中断回数を比べる",
  "1週間後に脾気虚という分類名だけを比べる"
],
      "correctIndex": 1,
      "explanation": "本人が大切にする活動と評価時期、比較する指標を具体化します。痛みの点数も記録しますが、それだけで作業への支障が減ったと判断しません。",
      "relatedSectionTitle": "2. 短期目標と中長期目標の二層設計"
    },
    {
      "id": "lecture-practice-6-q3",
      "question": "頭痛の共通症例で、薬を減らせるか心配という希望をどう扱いますか？",
      "options": [
  "鎮痛薬を使わないことを修了目標にする",
  "施術を受ける間だけ自己判断で薬を中止してもらう",
  "希望と使用状況を確認し医師・薬剤師へ相談する"
],
      "correctIndex": 2,
      "explanation": "薬の使用状況は経過の情報ですが、減薬や中止そのものを達成目標にはしません。薬を使ったことを失敗と評価せず、必要な相談につなげます。",
      "relatedSectionTitle": "2. 短期目標と中長期目標の二層設計"
    }
  ]
},
  "lecture-practice-7": {
  "lectureId": "lecture-practice-7",
  "chapterId": "practice",
  "chapterTitle": "第11章 統合症例・再評価",
  "lectureTitle": "方法・配穴・刺激条件を計画する",
  "passingScore": 2,
  "questions": [
    {
      "id": "lecture-practice-7-q1",
      "question": "【介入候補の説明】架空の計画に経穴名だけが列挙されています。設計判断として補うものはどれですか？",
      "options": [
        "目的・選定理由・安全条件を添える",
        "穴数が多ければ理由は省く",
        "同じ証の例があれば個別条件の確認を省く"
      ],
      "correctIndex": 0,
      "explanation": "経穴名だけでなく、目的、伝統的な選定理由、方法や刺激条件を考える個別の安全確認を示します。Webでの設計判断は実施技能や安全の保証ではありません。",
      "relatedSectionTitle": "1. 介入設計の3つの階層"
    },
    {
      "id": "lecture-practice-7-q2",
      "question": "【胸背部の安全確認】肩井や背部の経穴で気胸などの損傷リスクを検討する際、最も適切な考え方はどれですか？",
      "options": ["経穴の取穴位置を基準に、刺入の安全条件を判断する","局所解剖・体格・体位を確認し、実施の保留も検討する","同じ経穴の過去の反応を基準に、刺入の安全条件を判断する"],
      "correctIndex": 1,
      "explanation": "取穴位置の基準だけで刺入の安全条件は決まりません。局所の解剖・体格・体位などの個別評価が必要で、実施を保留する選択肢も含めます。出典欄のNCCIHは臓器損傷などのリスクを説明していますが、個別の安全深度を保証する資料ではありません。",
      "relatedSectionTitle": "出典と確認範囲"
    },
    {
      "id": "lecture-practice-7-q3",
      "question": "初回の計画を相談する際、安全性と本人の選択について必要なことはどれですか？",
      "options": ["配穴の伝統的理由を説明し、それを初診の安全確認に代える","小さい刺激から始める案を説明し、それを安全確認に代える","個別の安全情報と同意を確認し、実施の保留も選択肢にする"],
      "correctIndex": 2,
      "explanation": "遠隔穴や低刺激から始めても安全が保証されるわけではありません。具体的な方法の前に医療評価の必要性、個別のリスク、本人の同意を確認します。",
      "relatedSectionTitle": "出典と確認範囲"
    }
  ]
},
  "lecture-practice-8": {
  "lectureId": "lecture-practice-8",
  "chapterId": "practice",
  "chapterTitle": "第11章 統合症例・再評価",
  "lectureTitle": "説明・合意・記録を行う",
  "passingScore": 2,
  "questions": [
    {
      "id": "lecture-practice-8-q1",
      "question": "【共有と記録】本人の訴え、観察した所見、暫定的な評価、合意した計画をSOAPで分ける対応はどれですか？",
      "options": [
        "S＝報告、O＝観察、A＝評価、P＝計画",
        "S＝観察、O＝報告、A＝計画、P＝評価",
        "S＝評価、O＝計画、A＝報告、P＝観察"
      ],
      "correctIndex": 0,
      "explanation": "Sは本人の報告、Oは観察した所見、Aは評価・解釈、Pは計画です。報告と確認した所見を混ぜず、評価の根拠や不確実性、本人との合意も記録します。",
      "relatedSectionTitle": "3. 【共通模擬症例：第7段階 開示】"
    },
    {
      "id": "lecture-practice-8-q2",
      "question": "「肝気鬱結」を本人に説明するとき、適切な言い方はどれですか？",
      "options": [
  "自律神経の異常が原因だと分かりました",
  "伝統的な整理の候補であり原因の確定ではありません",
  "肝臓の病気があるためこの症状が出ています"
],
      "correctIndex": 1,
      "explanation": "分かりやすい言い方にする際も、未確認の医学的な機序を付け足しません。肝気鬱結は伝統理論内の候補で、臓器疾患や自律神経の異常を確認したという意味ではありません。",
      "relatedSectionTitle": "1. 専門用語を日常語に翻訳する技術"
    },
    {
      "id": "lecture-practice-8-q3",
      "question": "本人が施術を受けるか選ぶために必要な説明と確認はどれですか？",
      "options": [
        "署名を得れば説明内容の理解確認は終える",
        "予想する利点だけを伝えリスクは生じてから説明する",
        "目的・限界・リスク・対応と理解を確認する"
      ],
      "correctIndex": 2,
      "explanation": "症状悪化を「好転反応」として正当化しません。説明は不安を抑えるだけでなく、患者が利益・限界・リスクを理解し、自分で施術を受けるか決められるように行います。",
      "relatedSectionTitle": "2. 予後と不確実性の正直な伝達（リスクコミュニケーション）"
    }
  ]
},
  "lecture-practice-9": {
  "lectureId": "lecture-practice-9",
  "chapterId": "practice",
  "chapterTitle": "第11章 統合症例・再評価",
  "lectureTitle": "実施中・実施後の反応を評価する",
  "passingScore": 2,
  "questions": [
    {
      "id": "lecture-practice-9-q1",
      "question": "【複数の反応】直後の痛みの軽減と、帰宅後のだるさが報告されました。評価の方法はどれですか？",
      "options": [
        "双方を記録し安全性と持続を確認する",
        "軽減を優先しだるさは効果とする",
        "直後の点数だけで継続の判断を確定する"
      ],
      "correctIndex": 0,
      "explanation": "主訴の変化と好ましくない反応は別に記録し、程度、持続、生活への影響、安全性を確認します。一方の改善だけで他の変化を効果の徴候と決めません。",
      "relatedSectionTitle": "1. 施術直後評価の3ステップ"
    },
    {
      "id": "lecture-practice-9-q2",
      "question": "【施術中の失神・前失神への対応】施術中に急な吐き気、冷汗、顔面蒼白が出た場合、最優先の対応はどれですか？",
      "options": [
        "証の分類を確定してから中止の要否を決める",
        "中止・抜鍼後に反応と呼吸を確認する",
        "抜鍼だけ行い反応の確認は回復後にまとめる"
      ],
      "correctIndex": 1,
      "explanation": "迷走神経反射などが考えられますが、原因を決めつけません。施術を中止し、安全に抜鍼し、反応と正常な呼吸を確認します。反応があり単純な失神が疑われる場合は、外傷や呼吸困難がなければ仰向けで下肢を上げます。意識が不明瞭な人には飲食させません。正常な呼吸がない場合は119番通報・AED・心肺蘇生、回復しない場合や胸痛などを伴う場合も救急対応を優先します。",
      "relatedSectionTitle": "1. 施術直後評価の3ステップ"
    },
    {
      "id": "lecture-practice-9-q3",
      "question": "共通症例で直後NRSが7から3に下がった時点で、まだ評価できていないものはどれですか？",
      "options": [
  "同じ座位で尋ねた直後の痛みの報告",
  "直後に新たな訴えがなかったという確認",
  "夕方の実際の仕事で作業を続けられる時間"
],
      "correctIndex": 2,
      "explanation": "診察室での直後評価と、日常生活での目標達成は別です。仕事の継続時間は実作業で確認し、直後の痛みだけで達成したことにしません。",
      "relatedSectionTitle": "2. 【共通模擬症例：第8段階 開示】"
    }
  ]
},
  "lecture-practice-10": {
  "lectureId": "lecture-practice-10",
  "chapterId": "practice",
  "chapterTitle": "第11章 統合症例・再評価",
  "lectureTitle": "次回の計画を修正する",
  "passingScore": 2,
  "questions": [
    {
      "id": "lecture-practice-10-q1",
      "question": "【経過の再評価】直後は軽減し、二日後に戻ったという報告から次回計画を考える際、最初に整理する情報はどれですか？",
      "options": ["直後・数日後・現在を分け、同じ指標で経過を整理する","直後の軽減を中心に、計画を続ける理由として整理する","次回の再発を中心に、初回の効果がなかった例と整理する"],
      "correctIndex": 0,
      "explanation": "直後、数日後、現在を時間軸で分け、何が変化し何が戻ったかを記します。安全性、生活背景、仮説や方法も見直し、単一時点だけで継続・変更を確定しません。",
      "relatedSectionTitle": "1. 経過分析の3つの視点：何が良く、何が戻ったか？"
    },
    {
      "id": "lecture-practice-10-q2",
      "question": "症状が不変だった、または悪化したという報告を受けた場合、再評価に必要なものはどれですか？",
      "options": ["不変と悪化をまとめ、配穴の変更と刺激の追加を再検討する","程度と経過を分け、安全性・仮説・介入・生活背景を再検討する","分類の一貫性を優先し、同じ証に同じ計画を続けるか再検討する"],
      "correctIndex": 1,
      "explanation": "不変と悪化は分けて評価します。有害事象や病状変化、他の原因もあり得るため、反応を弁証や刺激量のずれだけで説明しません。",
      "relatedSectionTitle": "1. 経過分析の3つの視点：何が良く、何が戻ったか？"
    },
    {
      "id": "lecture-practice-10-q3",
      "question": "共通症例では作業時間が約20分から30分になり、週後半の頭痛は残りました。次の評価として適切なのはどれですか？",
      "options": [
  "作業時間が延びたので完治したとする",
  "頭痛が残るので生活面の変化もなかったとする",
  "生活面の前進と残る症状を分けて計画を相談する"
],
      "correctIndex": 2,
      "explanation": "一つの指標ですべてを代表させず、生活への影響、残る症状、通院の負担、他の変化をまとめて再評価します。施術だけが変化の原因だとも確定しません。",
      "relatedSectionTitle": "2. 【共通模擬症例：第9段階 開示】"
    }
  ]
},
  "lecture-practice-11": {
  "lectureId": "lecture-practice-11",
  "chapterId": "practice",
  "chapterTitle": "第11章 統合症例・再評価",
  "lectureTitle": "経過全体を管理する",
  "passingScore": 2,
  "questions": [
    {
      "id": "lecture-practice-11-q1",
      "question": "【継続の必要性】症状が落ち着き本人は通院を減らしたいと話しています。経過全体を管理する次の検討はどれですか？",
      "options": [
        "生活機能・目標・希望を含め必要性を見直す",
        "再発の可能性があるので同じ頻度を維持する",
        "一度の軽減だけで以後の再相談は不要とする"
      ],
      "correctIndex": 0,
      "explanation": "単回の反応だけでなく、生活機能、目標達成、安全性、本人の希望を確認します。間隔変更や終了、再相談の条件を相談し、継続が必須と決めつけません。",
      "relatedSectionTitle": "1. 治療終了（卒業）への4フェーズ・ロードマップ"
    },
    {
      "id": "lecture-practice-11-q2",
      "question": "8週間後も生活への支障が変わらない場合、適切な見直しはどれですか？",
      "options": [
  "予定の回数を追加して同じ計画を続ける",
  "医療評価・仮説・方法・負担・希望を再確認する",
  "脈の印象に変化があれば生活目標の評価を終える"
],
      "correctIndex": 1,
      "explanation": "改善しない分岐でも、回数を自動的に追加しません。必要な医療評価と本人の負担を含め、継続・変更・終了などの選択肢を相談します。",
      "relatedSectionTitle": "2. 【共通模擬症例：第10段階 開示】"
    },
    {
      "id": "lecture-practice-11-q3",
      "question": "定期通院を終える際に、共有しておく内容はどれですか？",
      "options": [
  "再発したら症状が同じかに関係なく以前の施術を再開する",
  "症状が戻っても次の定期予約まで待つ",
  "再相談の目安と緊急時には予約を待たないこと"
],
      "correctIndex": 2,
      "explanation": "終了は再相談を不要とする判断ではありません。症状の変化では改めて評価し、突然の激しい頭痛や新しい神経症状などでは救急対応を優先することを共有します。",
      "relatedSectionTitle": "2. 【共通模擬症例：第10段階 開示】"
    }
  ]
},
  "lecture-practice-12": {
  "lectureId": "lecture-practice-12",
  "chapterId": "practice",
  "chapterTitle": "第11章 統合症例・再評価",
  "lectureTitle": "総合ケース演習・修了課題",
  "passingScore": 2,
  "questions": [
    {
      "id": "lecture-practice-12-q1",
      "question": "【症例の振り返り】最初の候補と最終計画だけを記した提出用メモに、自己修正を振り返るため補う情報はどれですか？",
      "options": [
        "反証・不足情報・変更理由を補う",
        "最終的な証名を詳しくして修正過程に代える",
        "結果が改善なら初期判断の根拠は省略する"
      ],
      "correctIndex": 0,
      "explanation": "追加情報のうち何が判断を変えたか、残る不足情報は何かを記します。安全性、情報整理、推論、計画、本人との共有、自己修正を振り返る観点として使います。確認クイズだけで記述課題の質や実技能力を認定しません。",
      "relatedSectionTitle": "3. 自分で振り返る6つの観点"
    },
    {
      "id": "lecture-practice-12-q2",
      "question": "【1. 異なる判断が求められる7つの臨床パターン】複数の症状が記された架空例を振り返るとき、適切なのはどれですか？",
      "options": [
        "すべてを一つの病機にまとめ、介入の効果を確定",
        "支持・反証・不足を分け、保留する判断を示す",
        "症状の数だけ経穴を増やし、原因の確認を代用"
      ],
      "correctIndex": 1,
      "explanation": "複数の症状が同じ原因とは限りません。根拠と不確実性を記録し、安全確認と必要な医療評価を優先します。",
      "relatedSectionTitle": "1. 異なる判断が求められる7つの臨床パターン"
    },
    {
      "id": "lecture-practice-12-q3",
      "question": "【学習の修了と次の学び】全11章のWeb学習の修了について、適切なのはどれですか？",
      "options": [
        "資格の記録",
        "実際の診療技能の認定記録",
        "Webでの学習記録"
      ],
      "correctIndex": 2,
      "explanation": "Web学習の修了は資格や臨床研修の修了ではありません。説明できることと未確認の事項を振り返り、次の学びにつなげます。",
      "relatedSectionTitle": "学習の修了と次の学び"
    }
  ]
}
};

/** 章ラベル・順序は本文を含まない構成データから正規化する。 */
const sourceQuizzes: Record<string, LessonQuizGroup> = { ...EXISTING_CURRICULUM_QUIZZES, ...FOUNDATION_QUIZZES };
const outlinedQuizIds = new Set(CURRICULUM_CHAPTERS_META.flatMap(chapter => chapter.lectureIds));
if (Object.keys(FOUNDATION_QUIZZES).some(id => id in EXISTING_CURRICULUM_QUIZZES)) {
  throw new Error("Duplicate curriculum quiz ID");
}
if (Object.keys(sourceQuizzes).some(id => !outlinedQuizIds.has(id))) {
  throw new Error("Curriculum quizzes do not match the chapter outline");
}
export const CURRICULUM_QUIZZES: Record<string, LessonQuizGroup> = Object.fromEntries(
  CURRICULUM_CHAPTERS_META.flatMap(chapter => chapter.lectureIds.map(id => {
    const quiz = sourceQuizzes[id];
    if (!quiz) throw new Error(`Missing curriculum quiz: ${id}`);
    return [id, { ...quiz, lectureId: id, chapterId: chapter.seriesId, chapterTitle: chapter.title }];
  })),
);

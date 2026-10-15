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
        "物質の有無を基準に決める固定した区分",
        "精神活動だけを比較する感情の区分",
        "対になる性質を比較する関係・変化のモデル"
      ],
      "correctIndex": 2,
      "explanation": "陰陽論は、動と静、熱と寒などの性質を比較する伝統的な説明モデルです。比較の基準が変われば分類も変わり、病気の原因を直接測定・診断する指標とは区別します。",
      "relatedSectionTitle": "1. 陰陽論が目指す目的"
    },
    {
      "id": "lecture-yinyang-1-q2",
      "question": "【陰陽の基本性質】伝統的な陰陽配属の代表例として、最も適切な組み合わせはどれですか？",
      "options": [
        "陽＝静・熱・内向 ／ 陰＝動・寒・外向",
        "陽＝動・寒・内向 ／ 陰＝静・熱・外向",
        "陽＝動・熱・外向 ／ 陰＝静・寒・内向"
      ],
      "correctIndex": 2,
      "explanation": "伝統的な分類では、陽は動・熱・外向・機能、陰は静・寒・内向・物質に関連づけられます。陰陽と虚実は同義ではなく、この配属から体温や神経活動を判定することはできません。",
      "relatedSectionTitle": "2. 陰陽の基本性質"
    },
    {
      "id": "lecture-yinyang-1-q3",
      "question": "呼吸を「外へ出る／内へ入る」という方向だけで比べると、陽・陰の配属はどれですか？",
      "options": [
        "呼気：陽／吸気：陰",
        "呼気：陰／吸気：陽",
        "呼気：陽／吸気：陽"
      ],
      "correctIndex": 0,
      "explanation": "この問題では方向を比較基準にしています。外へ出る呼気を陽、内へ入る吸気を陰と整理できます。活動量や温度を問う問題ではないため、何を基準に比べたかを先に確かめます。",
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
        "比較相手を変えても常に陰",
        "氷より陽、お湯より陰",
        "氷より陰、お湯より陽"
      ],
      "correctIndex": 1,
      "explanation": "同じ水でも比較する温度が変われば配属は変わります。氷より温かいため陽、お湯より冷たいため陰と整理できます。水の病理的性質や医学的状態を判定する問題ではありません。",
      "relatedSectionTitle": "1. 比較する対象・基準の重要性"
    },
    {
      "id": "lecture-yinyang-2-q2",
      "question": "【陰陽の相対性と基準】東洋医学において「上半身は陽、下半身は陰」と分類されますが、上半身の中でも「背部」と「胸腹部」を比較した場合の正しい解釈はどれですか？",
      "options": [
        "背部＝陽中の陽、胸腹部＝陽中の陰",
        "背部と胸腹部はともに陽中の陽",
        "背部＝陽中の陰、胸腹部＝陽中の陽"
      ],
      "correctIndex": 0,
      "explanation": "まず人体全体を上半身と下半身に分け、次に上半身の中で背部と胸腹部を比べます。伝統的な配属では、背部が陽中の陽、胸腹部が陽中の陰です。部位の分類を学ぶ例であり、解剖学的な位置や病変をその分類で測定することはできません。",
      "relatedSectionTitle": "② 人体構造の陰陽可分"
    },
    {
      "id": "lecture-yinyang-2-q3",
      "question": "【陰陽可分の原則】「昼（陽）の中にも、午前（陽中の陽）と午後（陽中の陰）がある」というように、陰陽の中にさらに陰陽が存在する性質を何と呼びますか？",
      "options": [
        "陰陽可分",
        "陰陽対立",
        "陰陽互根"
      ],
      "correctIndex": 0,
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
      "question": "「温と寒を対にする」と「互いの偏りを抑える」を、それぞれ表す用語はどれですか？",
      "options": [
        "互根・対立",
        "対立・制約",
        "制約・互根"
      ],
      "correctIndex": 1,
      "explanation": "対立は相反する性質を対として捉えること、制約は互いの偏りを抑える関係です。互根は互いが成り立つ前提になる関係なので、抑えることとは区別します。",
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
      "options": [
        "緊急性の医学的評価を先に行い医療へつなぐ",
        "陰陽の分類を先に確定して受診へつなぐ",
        "症状の時間変化を先に記録して受診へつなぐ"
      ],
      "correctIndex": 0,
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
        "陰陽転化",
        "陰陽互根",
        "陰陽消長"
      ],
      "correctIndex": 2,
      "explanation": "陰陽消長は、陰と陽が関係しながら増減することを捉える伝統的な概念です。昼夜はその学習例であり、特定の神経活動やホルモン量を測定しているわけではありません。",
      "relatedSectionTitle": "1. 陰陽消長（いんようしょうちょう）"
    },
    {
      "id": "lecture-yinyang-4-q2",
      "question": "日没から夜へ暗さが増す様子を、陰陽消長の用語で表すとどれですか？",
      "options": [
        "陰陽互根",
        "陰長陽消",
        "陽長陰消"
      ],
      "correctIndex": 1,
      "explanation": "暗さや休息へ向かう側を陰として、陰が増し陽が減る「陰長陽消」と表現します。陽長陰消は明け方から昼へ向かう例、互根は増減ではなく相互依存を説明する語です。",
      "relatedSectionTitle": "1. 陰陽消長（いんようしょうちょう）"
    },
    {
      "id": "lecture-yinyang-4-q3",
      "question": "【臨床での変化の捉え方】患者の病態変化を観察する上で、臨床家が最も心掛けるべき視点はどれですか？",
      "options": [
        "時間経過と意識・呼吸の変化を確認する",
        "初診時の分類を優先して後の変化を説明する",
        "日内変動は除き最も強い症状の時点だけ比較する"
      ],
      "correctIndex": 0,
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
        "上・腹・深部＝陽 ／ 下・背・表＝陰",
        "下・背・深部＝陽 ／ 上・腹・表＝陰",
        "上・背・表＝陽 ／ 下・腹・深部＝陰"
      ],
      "correctIndex": 2,
      "explanation": "伝統的な配属では、上下・背腹・表裏といった比較の視点を示します。この分類から神経や血管の位置・働き、安全な施術部位を判断することはできません。",
      "relatedSectionTitle": "1. 身体の部位の陰陽"
    },
    {
      "id": "lecture-yinyang-5-q2",
      "question": "【蔵象の陰陽】五臓（肝・心・脾・肺・腎）と六腑（胆・小腸・胃・大腸・膀胱・三焦）の伝統的な役割の説明として、正しいものはどれですか？",
      "options": [
        "五臓＝陰・伝化する ／ 六腑＝陽・蔵する",
        "五臓＝陽・伝化する ／ 六腑＝陰・蔵する",
        "五臓＝陰・蔵する ／ 六腑＝陽・伝化する"
      ],
      "correctIndex": 2,
      "explanation": "蔵象の配属を学ぶ際には、「蔵する」と「通す」という伝統的な役割を区別します。三焦なども含むため、現代解剖学の臓器の構造や機能と一対一に同一視しません。",
      "relatedSectionTitle": "2. 蔵象の陰陽"
    },
    {
      "id": "lecture-yinyang-5-q3",
      "question": "身体の「働き」と、それを支える「形・物質」を比べる伝統的な配属はどれですか？",
      "options": [
        "働き：陽／形・物質：陰",
        "働き：陰／形・物質：陽",
        "働き：陽／形・物質：陽"
      ],
      "correctIndex": 0,
      "explanation": "この比較では、働きという機能面を陽、形や物質という実質面を陰に配属します。上・下、背・腹という位置の比較とは基準が違います。どの性質を比べているかを添えると、複数の配属を整理できます。",
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
        "熱極生寒",
        "陰平陽秘",
        "重陽必陰"
      ],
      "correctIndex": 1,
      "explanation": "「陰平陽秘」は、伝統医学で陰陽の調和を表す言葉です。この概念だけで現代医学の健康状態や病気の原因を判定できるという意味ではありません。",
      "relatedSectionTitle": "導入：伝統理論における「陰平陽秘」と偏り"
    },
    {
      "id": "lecture-yinyang-6-q2",
      "question": "伝統モデルで、陽が過剰な場合と陰が不足する場合は、いずれも熱に関連づけられます。分類の違いはどれですか？",
      "options": [
        "陽の偏盛：虚熱／陰の不足：実熱",
        "陽の偏盛：実寒／陰の不足：虚寒",
        "陽の偏盛：実熱／陰の不足：虚熱"
      ],
      "correctIndex": 2,
      "explanation": "陽の偏盛による実熱と、陰の不足による虚熱を区別します。同じ「熱」という語でも、過剰か不足かという虚実の観点が違います。熱感だけからどちらかを診断する課題ではありません。",
      "relatedSectionTitle": "2. 陰陽失調の4つの基本パターン"
    },
    {
      "id": "lecture-yinyang-6-q3",
      "question": "【薬や対処の判断】陰陽の分類や「水と火」のモデルと、実際の薬の使用・中止との関係で正しいものはどれですか？",
      "options": [
        "水と火の比率を根拠に服用量を決める",
        "医学的適応と処方者の指示を確認する",
        "陰虚という分類を根拠に薬の中止を決める"
      ],
      "correctIndex": 1,
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
        "赤みは所見、実熱は確定として追加確認",
        "赤みは原因、実熱は候補として追加確認",
        "赤みは所見、実熱は候補として追加確認"
      ],
      "correctIndex": 2,
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
        "慢性症状の初診記録との照合",
        "医療への連絡・救急対応",
        "陰陽分類を終えてからの紹介"
      ],
      "correctIndex": 1,
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
      "question": "「動と静を対にする」「互いを前提とする」「時間とともに増減する」を順に表す用語はどれですか？",
      "options": [
        "互根・消長・対立",
        "消長・対立・互根",
        "対立・互根・消長"
      ],
      "correctIndex": 2,
      "explanation": "対立は相反する性質の対、互根は相互依存、消長は増減です。何を説明したいかに応じて語を選びます。用語を同じ「バランス」の一語にまとめず、関係と変化の違いを言い直せるかを確かめます。",
      "relatedSectionTitle": "1. 分類・関係・変化の整理"
    },
    {
      "id": "lecture-yinyang-8-q2",
      "question": "【医療との併用を考える】施術や薬の使用後に症状が悪化したとき、最も適切な考え方はどれですか？",
      "options": [
        "悪化を医療者に伝え、緊急性を確認する",
        "慢性なら悪化の報告を省く",
        "悪化を作用の徴候とする"
      ],
      "correctIndex": 0,
      "explanation": "症状悪化を陰陽の変化や効果の合図と決めつけません。受けた施術や使用した薬を伝え、必要な医学的評価につなげます。強い呼吸困難や意識の異常などがあれば、救急対応が優先です。",
      "relatedSectionTitle": "2. 医療との併用を考える"
    },
    {
      "id": "lecture-yinyang-8-q3",
      "question": "陰陽の対立・変化を学んだ後、気血津液論で新たに整理する中心課題はどれですか？",
      "options": [
        "働き・滋養・潤い、三つの基本的な役割",
        "臓と腑の名称、表裏関係の組み合わせ",
        "正常な生成、営衛と三焦の連携の詳細"
      ],
      "correctIndex": 0,
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
        "気・血・津・液・神",
        "魂・神・意・魄・志",
        "木・火・土・金・水"
      ],
      "correctIndex": 2,
      "explanation": "五行では木火土金水の五つの分類と、その関係・変化を学びます。生体内の五種類の物質を測定した定義ではありません。",
      "relatedSectionTitle": "第1節：木・火・土・金・水という分類"
    },
    {
      "id": "lecture-wuxing-1-q2",
      "question": "「動と静を比べる」と「木火土金水へ配当する」は、順にどの枠組みの問いですか？",
      "options": [
        "陰陽・五行",
        "五行・臓腑",
        "臓腑・陰陽"
      ],
      "correctIndex": 0,
      "explanation": "陰陽は対になる性質の比較、五行は五つの分類への配当と相互関係を扱います。臓腑では、それぞれの名称にどのような役割を関連づけるかを学びました。何を整理したいかに合わせて枠組みを使い分けます。",
      "relatedSectionTitle": "第2節：陰陽・臓腑との学習上の関係"
    },
    {
      "id": "lecture-wuxing-1-q3",
      "question": "「肝を木に配当する」と「木が火を生み支える」は、それぞれ何を説明していますか？",
      "options": [
        "分類と関係",
        "関係と分類",
        "役割と部位"
      ],
      "correctIndex": 0,
      "explanation": "肝を木へ置くのは分類、木から火への相生を述べるのは関係です。どちらも五行の説明ですが、表のどこに置くかと、要素間をどう結ぶかでは問いが異なります。",
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
        "木：潤下、火：従革、土：曲直、金：炎上、水：稼穡",
        "木：従革、火：稼穡、土：潤下、金：曲直、水：炎上",
        "木：曲直、火：炎上、土：稼穡、金：従革、水：潤下"
      ],
      "correctIndex": 2,
      "explanation": "五つの用語は、それぞれの行に関連づけられる代表的な性質です。自然のイメージを分類の手がかりにします。",
      "relatedSectionTitle": "第1節：五つの性質の代表的な説明"
    },
    {
      "id": "lecture-wuxing-2-q2",
      "question": "【第2節：性質を分類の手がかりにする】「潤し、下へ向かう性質」という教材上の説明に関連するのはどれですか？",
      "options": [
        "土の稼穡",
        "火の炎上",
        "水の潤下"
      ],
      "correctIndex": 2,
      "explanation": "潤下は潤いと下降の性質の説明です。この対応は用語の理解を確かめるもので、身体の状態の診断ではありません。",
      "relatedSectionTitle": "第2節：性質を分類の手がかりにする"
    },
    {
      "id": "lecture-wuxing-2-q3",
      "question": "分類練習で「曲がりながら伸びる」と「種をまき収穫する」を選びました。対応する性質は順にどれですか？",
      "options": [
        "火の炎上・金の従革",
        "木の曲直・土の稼穡",
        "土の稼穡・木の曲直"
      ],
      "correctIndex": 1,
      "explanation": "曲がりながら伸びるイメージは木の曲直、種をまき収穫するイメージは土の稼穡に関連づけます。用語の漢字だけでなく、どんな性質を表す言葉かと結びつけます。",
      "relatedSectionTitle": "第2節：性質を分類の手がかりにする"
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
      "question": "相生の輪で、土は火に対して子、金に対して母となります。この関係を表す向きはどれですか？",
      "options": [
        "木→土→水",
        "火→土→金",
        "金→土→火"
      ],
      "correctIndex": 1,
      "explanation": "相生は木→火→土→金→水→木です。火が土を生む関係では土は子、土が金を生む関係では土は母です。一つの行でも、どの相手との関係かによって母・子が変わります。",
      "relatedSectionTitle": "第1節：相生と母子の関係"
    },
    {
      "id": "lecture-wuxing-3-q2",
      "question": "【第2節：相剋と関係の向き】相剋の向きとして適切なのはどれですか？",
      "options": [
        "木→土→水→火→金→木",
        "木→金→火→水→土→木",
        "木→火→土→金→水→木"
      ],
      "correctIndex": 0,
      "explanation": "木剋土・土剋水・水剋火・火剋金・金剋木の向きを整理します。相生とは異なる関係です。",
      "relatedSectionTitle": "第2節：相剋と関係の向き"
    },
    {
      "id": "lecture-wuxing-3-q3",
      "question": "【第3節：相乗・相侮は応用の入り口】相乗と相侮の用語上の違いとして適切なのはどれですか？",
      "options": [
        "相乗＝相生と同方向、相侮＝逆方向",
        "相乗＝相剋と同方向、相侮＝逆方向",
        "相乗＝相剋と逆方向、相侮＝同方向"
      ],
      "correctIndex": 1,
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
        "木：心、火：肝、土：肺、金：脾、水：腎",
        "木：肝、火：心、土：脾、金：肺、水：腎",
        "木：肺、火：腎、土：心、金：肝、水：脾"
      ],
      "correctIndex": 1,
      "explanation": "例えば肝を木、心を火に配当し、それぞれの欄に疏泄・蔵血、主血脈・蔵神などの既習の役割を書きます。この表は、臓腑論で学んだ名称と役割を五行で整理するために使います。",
      "relatedSectionTitle": "第1節：五行と五臓の対応"
    },
    {
      "id": "lecture-wuxing-4-q2",
      "question": "脾を土、肺を金に配当したうえで「土生金」を読むと、伝統モデル上の母と子はどれですか？",
      "options": [
        "肺が母・脾が子",
        "脾が母・腎が子",
        "脾が母・肺が子"
      ],
      "correctIndex": 2,
      "explanation": "配当表で脾は土、肺は金です。土から金へ相生の向きがあるため、脾を母、肺を子として関係づけます。配当と矢印を合わせて読む課題で、臓器の病気の原因を示すものではありません。",
      "relatedSectionTitle": "第2節：分類・役割・関係を分ける"
    },
    {
      "id": "lecture-wuxing-4-q3",
      "question": "「肝は木」「肝は疏泄を主る」「木生火」を、分類・役割・関係に仕分けた順序はどれですか？",
      "options": [
        "分類・役割・関係",
        "役割・関係・分類",
        "関係・分類・役割"
      ],
      "correctIndex": 0,
      "explanation": "木に置くのは分類、疏泄という働きを述べるのは役割、木と火を相生で結ぶのは関係です。同じ肝を扱う文章でも、何を答える文かを分けると配当と働きを混同しにくくなります。",
      "relatedSectionTitle": "第2節：分類・役割・関係を分ける"
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
        "鼻・骨・髪",
        "口・皮毛・顔色",
        "目・筋・爪"
      ],
      "correctIndex": 2,
      "explanation": "木・肝に目、筋、爪を配当します。部位の分類であり、共通の病因を証明する表ではありません。",
      "relatedSectionTitle": "第1節：五官・五体・五華の対応"
    },
    {
      "id": "lecture-wuxing-5-q2",
      "question": "「筋」と「爪」を五体・五華へ分けると、本講の配当はどれですか？",
      "options": [
        "筋：五官／爪：五華",
        "筋：五体／爪：五華",
        "筋：五華／爪：五体"
      ],
      "correctIndex": 1,
      "explanation": "木・肝の配当で、筋は五体、爪は五華、目は五官の欄です。同じ行へ配当する名称でも、どの分類の列かが違います。横の対応だけでなく列の見出しも確認します。",
      "relatedSectionTitle": "第1節：五官・五体・五華の対応"
    },
    {
      "id": "lecture-wuxing-5-q3",
      "question": "対応表の「耳・骨・髪」という行で、五行・五臓の見出しが消えています。補う組合せはどれですか？",
      "options": [
        "水・腎",
        "金・肺",
        "土・脾"
      ],
      "correctIndex": 0,
      "explanation": "耳・骨・髪は、本講の代表的な配当では水・腎の行に入ります。金・肺は鼻・皮毛・毛、土・脾は口・肉・唇です。配当表を逆向きに読んで復元する課題で、身体所見から病気を診断する問題ではありません。",
      "relatedSectionTitle": "第1節：五官・五体・五華の対応"
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
        "酸・苦・甘・辛・鹹",
        "目・舌・口・鼻・耳",
        "魂・神・意・魄・志"
      ],
      "correctIndex": 2,
      "explanation": "五神は精神活動に関する伝統的な分類です。五味や五官と区別して学びます。",
      "relatedSectionTitle": "第1節：五神と五志の配当"
    },
    {
      "id": "lecture-wuxing-6-q2",
      "question": "「肝―魂―怒」と「脾―意―思」のカードで、中央と末尾はそれぞれ何の欄ですか？",
      "options": [
        "中央：五神／末尾：五志",
        "中央：五志／末尾：五神",
        "中央：五神／末尾：五華"
      ],
      "correctIndex": 0,
      "explanation": "魂や意は五神、怒や思は五志の欄です。五神は精神活動に関する用語、五志は感情の配当として区別します。似た名称を覚えるだけでなく、表が何を分類しているかを読み取ります。",
      "relatedSectionTitle": "第1節：五神と五志の配当"
    },
    {
      "id": "lecture-wuxing-6-q3",
      "question": "五神の欄で「魄」と「志」の見出しとなる五臓を順に選ぶと、どれですか？",
      "options": [
        "肺・腎",
        "腎・肺",
        "心・肝"
      ],
      "correctIndex": 0,
      "explanation": "魄は肺、志は腎に配当します。心は神、肝は魂、脾は意です。五神の「志」と、感情の分類名である「五志」を同じ欄として混ぜないようにします。",
      "relatedSectionTitle": "第1節：五神と五志の配当"
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
        "春・風・酸",
        "冬・寒・鹹",
        "秋・燥・辛"
      ],
      "correctIndex": 2,
      "explanation": "金に秋・燥・辛を配当します。分類であって、季節だけで病気を予測する式ではありません。",
      "relatedSectionTitle": "第1節：季節・気候・五味の配当"
    },
    {
      "id": "lecture-wuxing-7-q2",
      "question": "配当表で「春・風・酸」と「冬・寒・鹹」の行の見出しを補うと、順にどれですか？",
      "options": [
        "火・金",
        "木・水",
        "水・木"
      ],
      "correctIndex": 1,
      "explanation": "春・風・酸は木、冬・寒・鹹は水に配当します。季節・気候・味の三つを同じ行へ整理する練習です。実際の症状の原因や食事の量を、この対応から決める課題ではありません。",
      "relatedSectionTitle": "第1節：季節・気候・五味の配当"
    },
    {
      "id": "lecture-wuxing-7-q3",
      "question": "五味の「甘」と「苦」に対応する五行を順に選ぶと、どれですか？",
      "options": [
        "木・水",
        "土・火",
        "火・土"
      ],
      "correctIndex": 1,
      "explanation": "甘は土、苦は火です。酸は木、辛は金、鹹は水に配当します。味を分類する表の理解を確認しています。対応する味を増やせば臓器を治療できる、という食品の効果や必要量の判断には使いません。",
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
        "胃腸と呼吸器の病気の因果の実証",
        "五行の相生の向き",
        "肺疾患の改善効果"
      ],
      "correctIndex": 1,
      "explanation": "土から金へ向かう相生関係を学んだことが、「土生金」と説明する根拠です。脾を土、肺を金に配当しても、胃腸と呼吸器の病気の因果関係や、介入の効果を確認したことにはなりません。",
      "relatedSectionTitle": "第1節：分類と関係を説明する"
    },
    {
      "id": "lecture-wuxing-8-q2",
      "question": "同じ木から始まる「木生火」と「木剋土」は、矢印の意味をどう読み分けますか？",
      "options": [
        "火へ：生み支える／土へ：制約する",
        "火へ：制約する／土へ：生み支える",
        "火へ：生み支える／土へ：逆向きに制約する"
      ],
      "correctIndex": 0,
      "explanation": "木生火は相生の生み支える関係、木剋土は相剋の制約する関係です。相剋の向きと逆になる相侮とも違います。出発点が同じでも、相手と関係の種類を合わせて読む必要があります。",
      "relatedSectionTitle": "第1節：分類と関係を説明する"
    },
    {
      "id": "lecture-wuxing-8-q3",
      "question": "「木から土への過度な抑制」と「土から木への逆向きの関係」に、順に対応する用語はどれですか？",
      "options": [
        "相侮・相乗",
        "相生・相剋",
        "相乗・相侮"
      ],
      "correctIndex": 2,
      "explanation": "木から土は相剋の向きなので、その抑制が過度な関係を相乗と説明します。土から木は逆向きなので相侮です。伝統モデルの方向と強さを区別する問題であり、患者の病気の原因を確定するものではありません。",
      "relatedSectionTitle": "第1節：分類と関係を説明する"
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
        "血",
        "津液",
        "気"
      ],
      "correctIndex": 2,
      "explanation": "気は活動や働き、血は滋養・滋潤、津液は潤いという役割から整理します。三つを測定された独立物質とは扱いません。",
      "relatedSectionTitle": "第1節：気・血・津液の基本役割"
    },
    {
      "id": "lecture-qiblood-1-q2",
      "question": "【第2節：気の五つの作用】身体を温める役割を表す気の作用はどれですか？",
      "options": [
        "温煦",
        "防御",
        "固摂"
      ],
      "correctIndex": 0,
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
      "question": "ノートに「血は潤いだけを説明する」とあります。身体の活動を支える役割を補う語はどれですか？",
      "options": [
        "滋潤",
        "温煦",
        "滋養"
      ],
      "correctIndex": 2,
      "explanation": "滋養は身体各部を養い、活動を支えるという説明です。滋潤は潤いを与えること、温煦は気の温める作用です。同じ身体を支える説明でも、養う・潤す・温めるという動詞を区別します。",
      "relatedSectionTitle": "第1節：滋養・滋潤という役割"
    },
    {
      "id": "lecture-qiblood-2-q2",
      "question": "血の説明で「身体を養い潤す」に加え、このレッスンで学ぶ関係はどれですか？",
      "options": [
        "外界から身体を守る関係",
        "飲食を変化させ排泄する関係",
        "精神活動を支える関係"
      ],
      "correctIndex": 2,
      "explanation": "この節では、血が心神などの精神活動を支えるという伝統的な関係を学びます。防御や気化は前のレッスンで扱った気の作用です。どの用語の、どの役割を説明する文章かを読み分けます。",
      "relatedSectionTitle": "第2節：血と精神活動の伝統的な関係"
    },
    {
      "id": "lecture-qiblood-2-q3",
      "question": "血と津液のカードに「共通：潤い」と書きました。さらに、それぞれ何と合わせて学ぶと違いを整理できますか？",
      "options": [
        "血：養う役割／津液：性質・分布・巡り",
        "血：性質・分布・巡り／津液：養う役割",
        "血：防御・温煦／津液：成長・活動"
      ],
      "correctIndex": 0,
      "explanation": "共通する潤いに加え、血では各部を養う役割、津液では性質・分布・巡りに注目します。同じ動詞が含まれても、周囲の説明と合わせると概念の違いを整理できます。防御・温煦や成長・活動は、気の作用を学んだ際の別の観点です。",
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
        "津＝濃厚・深部の潤い、液＝さらさら",
        "津＝細胞内液、液＝細胞外液",
        "津＝さらさら、液＝濃厚・深部の潤い"
      ],
      "correctIndex": 2,
      "explanation": "津は比較的さらさらして体表などを潤し、液は比較的濃厚で深部を潤すと説明されます。これは性質と役割の伝統的な区分で、津・液を細胞内液・細胞外液などと一対一に対応させる定義ではありません。",
      "relatedSectionTitle": "第1節：津と液の区分"
    },
    {
      "id": "lecture-qiblood-3-q2",
      "question": "「飲食に由来する」「身体各部を潤す」「不要なものを外へ出す」は、津液のどの三つの視点に対応しますか？",
      "options": [
        "巡りと滋潤・排泄・生成",
        "生成・巡りと滋潤・排泄",
        "排泄・生成・巡りと滋潤"
      ],
      "correctIndex": 1,
      "explanation": "飲食に由来する説明は生成、各部を潤す説明は巡りと滋潤、不要なものを外へ出す説明は排泄です。三つの見出しを、順番だけでなくそれぞれ何を説明する言葉かと結びつけます。",
      "relatedSectionTitle": "第2節：潤いと正常な巡り"
    },
    {
      "id": "lecture-qiblood-3-q3",
      "question": "「口が乾くと本人が話した」と「津はさらさらした性質と説明する」は、順にどの種類の情報ですか？",
      "options": [
        "本人の報告・用語の説明",
        "用語の説明・本人の報告",
        "体液量の実測・体液成分の分類"
      ],
      "correctIndex": 0,
      "explanation": "口の乾きは本人の訴え、津の性質は伝統用語の説明です。両方が書かれても体液量を測った結果とは別です。語の性質と実際に得た情報を区別することで、乾きから体液不足を自動的に決めることを避けられます。",
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
      "question": "「気が血の巡りを導く」「血が気を養い支える」を順に表す語はどれですか？",
      "options": [
        "気為血之帥・血為気之母",
        "血為気之母・気為血之帥",
        "津血同源・血為気之母"
      ],
      "correctIndex": 0,
      "explanation": "帥は導く役割、母は養い支える役割として覚えます。気から血、血から気という二つの説明方向を読み分けます。津血同源は血と津液の由来を関連づける語で、気と血のこの対比とは異なります。",
      "relatedSectionTitle": "第1節：気と血の関係"
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
      "options": [
        "伝統的な温煦作用について正常と評価した判定",
        "本人が感じた温かさについての主観的な報告",
        "体温計で確認した体温についての客観的な記録"
      ],
      "correctIndex": 1,
      "explanation": "本人の訴えが記載されています。実測値や診断結果は示されていません。記載された事実と推測を分けます。",
      "relatedSectionTitle": "第1節：架空例の情報を三つに分ける"
    },
    {
      "id": "lecture-qiblood-5-q2",
      "question": "散歩という「身体を動かす活動」と「温める役割」に、順に対応する気の作用はどれですか？",
      "options": [
        "防御・固摂",
        "推動・温煦",
        "温煦・推動"
      ],
      "correctIndex": 1,
      "explanation": "活動を進める説明は推動、身体を温める説明は温煦に対応します。同じ散歩の例でも、注目する役割が変われば選ぶ用語が違います。この対応は用語の理解を確かめるもので、気の量や体温の実測値を決めるものではありません。",
      "relatedSectionTitle": "第2節：一つの判断とその根拠"
    },
    {
      "id": "lecture-qiblood-5-q3",
      "question": "基本役割を振り返るノートで、「養う」「潤いと水分」「外界から守る」を順に対応させたものはどれですか？",
      "options": [
        "津液・血の滋潤・気の推動",
        "血の滋養・津液・気の防御",
        "血の滋養・気の固摂・津液"
      ],
      "correctIndex": 1,
      "explanation": "養うという説明は血の滋養、潤いと水分は津液、外界から守る作用は気の防御です。固摂は漏れを防ぐ働きで、防御と同じ意味ではありません。各概念を具体的な動詞で説明できるかを確かめます。",
      "relatedSectionTitle": "導入：一つの判断を丁寧に説明する"
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
      "question": "気・血・津液の基本役割を踏まえ、生命機能論で新たに説明する中心はどれですか？",
      "options": [
        "飲食・呼吸・巡りなどをつなぐ正常な連携",
        "木火土金水へ身体の名称を配当する分類",
        "所見から病態を絞り込む診断の手順"
      ],
      "correctIndex": 0,
      "explanation": "生命機能論では、既習の基本役割を飲食・呼吸、営衛、三焦、昇降出入などで関連づけます。五つの配当は五行、所見からの病態の検討は後の章で学ぶ課題です。章名の暗記ではなく、説明する対象を見分けます。",
      "relatedSectionTitle": "第1節：既習の基本と正常な連携"
    },
    {
      "id": "lecture-lifedynamics-1-q2",
      "question": "【第2節：四つの概念と、それが答える問い】営衛・三焦・昇降出入を学ぶときの視点として適切なのはどれですか？",
      "options": [
        "営衛＝分担、三焦＝領域、昇降出入＝方向",
        "営衛＝方向、三焦＝分担、昇降出入＝領域",
        "営衛＝領域、三焦＝方向、昇降出入＝分担"
      ],
      "correctIndex": 0,
      "explanation": "営衛は役割の分担、三焦は上・中・下の領域、昇降出入は動きの方向に着目します。視点が異なる用語を、同じ物質や機構の別名として扱いません。",
      "relatedSectionTitle": "第2節：四つの概念と、それが答える問い"
    },
    {
      "id": "lecture-lifedynamics-1-q3",
      "question": "全身の正常な連携を説明するメモとして、本講の学び方に合うものはどれですか？",
      "options": [
        "身体の名称を木火土金水の五つの欄へ並べる",
        "疲れという訴えに合う病態分類を一つに絞る",
        "飲食からの養い、呼吸、巡りの役割を関連づける"
      ],
      "correctIndex": 2,
      "explanation": "この章では、正常な働きがどのように関係づけられるかを整理します。名称を五行へ配当する作業や、所見から病態を比較する作業とは問いが違います。役割の関連を説明できることが、この段階の理解です。",
      "relatedSectionTitle": "第1節：既習の基本と正常な連携"
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
      "relatedSectionTitle": "第1節：精・気・神の三宝と、それぞれの役割"
    },
    {
      "id": "lecture-lifedynamics-2-q2",
      "question": "【五神の配当】本講の五神の表に合う組み合わせはどれですか？",
      "options": [
        "心：意 ／ 脾：志 ／ 腎：神",
        "心：志 ／ 脾：神 ／ 腎：意",
        "心：神 ／ 脾：意 ／ 腎：志"
      ],
      "correctIndex": 2,
      "explanation": "心の神・脾の意・腎の志という伝統的な配当です。肝には魂、肺には魄を関連づけます。この配当は精神疾患の診断や神経機能の測定結果ではありません。",
      "relatedSectionTitle": "第3節：五臓に宿る精神の知性（五神）"
    },
    {
      "id": "lecture-lifedynamics-2-q3",
      "question": "「精血同源」と「津血同源」は、それぞれどの二つの概念の関係ですか？",
      "options": [
        "気と精／精と血",
        "精と血／津液と血",
        "精と津液／気と血"
      ],
      "correctIndex": 1,
      "explanation": "精血同源は精と血、津血同源は津液と血の由来や支え合いを扱う伝統用語です。「同源」と付く語でも、結びつける対象が違います。物質が直接入れ替わる反応式としてではなく、関係の対象を読み分けます。",
      "relatedSectionTitle": "第2節：血・津液との物質的ネットワーク"
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
        "胃：清気 ／ 脾：受納 ／ 肺：運化",
        "胃：受納 ／ 脾：運化 ／ 肺：清気",
        "胃：運化 ／ 脾：清気 ／ 肺：受納"
      ],
      "correctIndex": 1,
      "explanation": "胃の受納・腐熟、脾の運化・昇清、肺の呼吸を区別します。これらを関連づけるのは伝統的な役割の説明で、実際の消化吸収や代謝の全機序を示すものではありません。",
      "relatedSectionTitle": "第1節：脾胃による「水穀の精気」生成ライン"
    },
    {
      "id": "lecture-lifedynamics-3-q2",
      "question": "【宗気の生成モデル】胸中の宗気を説明するとき、本講で組み合わせる二つはどれですか？",
      "options": [
        "排出される濁気と飲食物の消化残渣",
        "自然の清気と呼吸で排出される濁気",
        "水穀から得られる精微と自然の清気"
      ],
      "correctIndex": 2,
      "explanation": "宗気は水穀の精微と自然の清気から説明する伝統的な生成モデルです。胸中・呼吸・血行と関連づけますが、ATPの産生反応や測定された物質の合成式にはしません。",
      "relatedSectionTitle": "第3節：宗気（そうき）の形成 ― 拍動と呼吸のエンジン"
    },
    {
      "id": "lecture-lifedynamics-3-q3",
      "question": "宗気の「二大役割」のカードに呼吸の推進を書きました。もう一つに入る説明はどれですか？",
      "options": [
        "胃が飲食物を受ける働きを支える",
        "心・血脈の働きを支える",
        "腎の精を蔵する働きを支える"
      ],
      "correctIndex": 1,
      "explanation": "宗気は胸中・呼吸・血行に関連づける語で、呼吸の推進と心・血脈を支える働きを学びます。生成に関わる脾胃・肺の説明と、生じた宗気の役割を区別します。精を蔵することや胃の受納とは別の話題です。",
      "relatedSectionTitle": "第3節：宗気（そうき）の形成 ― 拍動と呼吸のエンジン"
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
      "question": "営衛を役割で比較し、「養い」と「体表の防御」を見出しにしました。本講の対応はどれですか？",
      "options": [
        "養い：宗気／体表の防御：営気",
        "養い：営気／体表の防御：衛気",
        "養い：衛気／体表の防御：営気"
      ],
      "correctIndex": 1,
      "explanation": "営気は養う側面、衛気は防御・温煦・腠理の開閉に関わる側面として区別します。脈中・脈外という配属と役割の両方を合わせて説明できるかが要点です。",
      "relatedSectionTitle": "第1節：営気（えいき）― 脈中を巡り、身体を養う働き"
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
        "上：横隔膜〜臍 ／ 中：横隔膜より上 ／ 下：臍より下",
        "上：横隔膜より上 ／ 中：横隔膜〜臍 ／ 下：臍より下",
        "上：横隔膜より上 ／ 中：臍より下 ／ 下：横隔膜〜臍"
      ],
      "correctIndex": 1,
      "explanation": "三焦は上・中・下という領域から役割を整理する伝統的な区分です。心肺・脾胃・排泄に関連する説明を比べます。三つの領域を一つの解剖学的器官とする定義ではありません。",
      "relatedSectionTitle": "第1節：三焦の空間区分と三大メタファー"
    },
    {
      "id": "lecture-lifedynamics-5-q2",
      "question": "【三焦の比喩】本講の「霧・漚・瀆」の対応として、正しい順はどれですか？",
      "options": [
        "上焦：霧 ／ 中焦：漚 ／ 下焦：瀆",
        "上焦：漚 ／ 中焦：霧 ／ 下焦：瀆",
        "上焦：瀆 ／ 中焦：漚 ／ 下焦：霧"
      ],
      "correctIndex": 0,
      "explanation": "上焦は霧、中焦は漚、下焦は瀆という比喩で役割を覚えます。漚は「あわ」に関係する字で、沢とは別です。これを実在する噴霧器・発酵装置・排水管の測定結果に置き換えません。",
      "relatedSectionTitle": "第1節：三焦の空間区分と三大メタファー"
    },
    {
      "id": "lecture-lifedynamics-5-q3",
      "question": "三焦の「霧・漚・瀆」を、役割の比喩として言い換えた組合せはどれですか？",
      "options": [
        "霧：広く散布／漚：飲食の変化／瀆：排出の通路",
        "霧：飲食の変化／漚：排出の通路／瀆：広く散布",
        "霧：排出の通路／漚：広く散布／瀆：飲食の変化"
      ],
      "correctIndex": 0,
      "explanation": "上焦の霧は散布、中焦の漚は飲食物の変化、下焦の瀆は排出の通路を覚える比喩です。場所と漢字の暗記に加え、何の役割を表すイメージかを説明します。",
      "relatedSectionTitle": "第1節：三焦の空間区分と三大メタファー"
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
        "臓＝伝化する側面、腑＝蔵する側面",
        "臓と腑＝ともに同じ伝化の側面",
        "臓＝蔵する側面、腑＝伝化する側面"
      ],
      "correctIndex": 2,
      "explanation": "陰の臓・陽の腑は役割を対比する伝統モデルです。物質の出入りを全くしないという臓器の定義には置き換えません。",
      "relatedSectionTitle": "第1節：臓と腑の根本的な性格の違い"
    },
    {
      "id": "lecture-lifedynamics-6-q2",
      "question": "六対の表裏関係のうち、心と肺に対応する腑を順に選ぶとどれですか？",
      "options": [
        "三焦・胃",
        "小腸・大腸",
        "大腸・小腸"
      ],
      "correctIndex": 1,
      "explanation": "心と小腸、肺と大腸が伝統的な表裏の組です。心包と三焦、脾と胃の組とも混ぜずに整理します。ここでは対応表を復元する理解を確かめ、症状の因果関係は別に検討します。",
      "relatedSectionTitle": "第2節：六対の表裏関係と伝統的な連携"
    },
    {
      "id": "lecture-lifedynamics-6-q3",
      "question": "【第2節：六対の表裏関係と伝統的な連携】脾の昇清と胃の降濁の学習上の説明として適切なのはどれですか？",
      "options": [
        "上へ・下へという役割の対比",
        "同方向の役割の一致",
        "消化機序を測定した研究結果の説明"
      ],
      "correctIndex": 0,
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
        "昇：上 ／ 降：下 ／ 出：内 ／ 入：外",
        "昇：上 ／ 降：下 ／ 出：外 ／ 入：内",
        "昇：外 ／ 降：内 ／ 出：上 ／ 入：下"
      ],
      "correctIndex": 1,
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
      "question": "肺の宣発・粛降を、昇降出入の方向とつなげた説明はどれですか？",
      "options": [
        "宣発：上方・内方／粛降：下方・外方",
        "宣発：上方・外方／粛降：下方・内方",
        "宣発：下方・内方／粛降：上方・外方"
      ],
      "correctIndex": 1,
      "explanation": "宣発は上方・外方へ、粛降は下方・内方へ向かう働きとして説明します。昇・降の上下だけでなく、出・入の内外も合わせて関連づける課題です。",
      "relatedSectionTitle": "第2節：臓腑が織りなす3大昇降ループ"
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
        "陽入于陰：排泄 ／ 陽出于陰：生成",
        "陽入于陰：睡眠 ／ 陽出于陰：覚醒",
        "陽入于陰：覚醒 ／ 陽出于陰：睡眠"
      ],
      "correctIndex": 1,
      "explanation": "本講では睡眠を陽入于陰、覚醒を陽出于陰に関連づける伝統的な説明として読みます。体内時計や神経系の測定結果と同じ概念ではありません。",
      "relatedSectionTitle": "第2節：睡眠と覚醒の力学 ― 「陽入于陰」"
    },
    {
      "id": "lecture-lifedynamics-8-q2",
      "question": "古典の衛気の日夜運行を、回数ではなく領域で比較した説明はどれですか？",
      "options": [
        "昼：内側・深部／夜：外側・体表",
        "昼：上部・胸中／夜：下部・腹部",
        "昼：外側・体表／夜：内側・深部"
      ],
      "correctIndex": 2,
      "explanation": "この運行モデルでは、昼を外側・体表、夜を内側・深部という役割から比較します。上下の二領域に分けるモデルとは違います。領域の学習上の対比であり、測定した循環回数や免疫機能を表すものではありません。",
      "relatedSectionTitle": "第1節：衛気の日夜五十周 ― 昼の防衛と夜の修復"
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
        "春：蔵 ／ 夏：収 ／ 秋：長 ／ 冬：生",
        "春：生 ／ 夏：収 ／ 秋：蔵 ／ 冬：長",
        "春：生 ／ 夏：長 ／ 秋：収 ／ 冬：蔵"
      ],
      "correctIndex": 2,
      "explanation": "春生・夏長・秋収・冬蔵は、季節の特徴を比較する伝統的な表現です。気血が集まる深さや季節病の原因を測定した一覧ではありません。",
      "relatedSectionTitle": "第1節：五季における自然の気と身体の重心移動"
    },
    {
      "id": "lecture-lifedynamics-9-q2",
      "question": "夏から秋、さらに冬へという季節の変化を、本講の生・長・収・蔵で表すとどれですか？",
      "options": [
        "長→収→蔵",
        "収→長→蔵",
        "蔵→生→長"
      ],
      "correctIndex": 0,
      "explanation": "夏は長、秋は収、冬は蔵という伝統的な対応です。四つの語を順番だけでなく、どの季節からどこへ移るかと結びつけます。地域の実際の気温や個人の症状の予測とは分けて学びます。",
      "relatedSectionTitle": "第1節：五季における自然の気と身体の重心移動"
    },
    {
      "id": "lecture-lifedynamics-9-q3",
      "question": "【地域・生活の違い】同じ冬に、屋外で働く人と暖房のある室内で働く人を比較する学習で、適切な進め方はどれですか？",
      "options": [
        "実際の環境・仕事・生活から、二人の条件を比較する",
        "同じ季節なので、食品と起床時刻の基準を共通にする",
        "冬の配当から、二人の寒熱・虚実の分類を共通にする"
      ],
      "correctIndex": 0,
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
      "question": "運動後の汗が休息で減り、何分ほどで戻ったかを記録しました。本講の三つの観点のうち、直接扱ったのはどれですか？",
      "options": [
        "可逆性",
        "刺激との関係",
        "他の変化"
      ],
      "correctIndex": 0,
      "explanation": "休息後にどう変わり、いつまで続いたかは可逆性の欄に記録します。運動の強さや環境は刺激との関係、食欲・睡眠などは他の変化です。記録の観点を区別する問題で、戻ったことだけで正常と判定するものではありません。",
      "relatedSectionTitle": "第2節：生理的代償と病理的失調を分ける3大基準"
    },
    {
      "id": "lecture-lifedynamics-10-q2",
      "question": "「上実下虚」と「本虚標実」は、何を対比する伝統用語ですか？",
      "options": [
        "上と下の部位／基盤と表に現れる状態",
        "基盤と表に現れる状態／上と下の部位",
        "発症前と発症後／活動前と休息後"
      ],
      "correctIndex": 0,
      "explanation": "上実下虚は上と下という部位の違い、本虚標実は基盤の不足と現れている実の関係を説明します。「虚と実がある」という共通点だけで同じ用語にせず、どの対比かを読み分けます。",
      "relatedSectionTitle": "第3節：虚実の入口 ― 「偏在」としてのアンバランス"
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
      "question": "津液の連携図に、脾・肺・腎それぞれの代表的な役割を加えます。本講に合う組合せはどれですか？",
      "options": [
        "脾：主水・気化／肺：運化／腎：通調水道",
        "脾：運化／肺：通調水道／腎：主水・気化",
        "脾：通調水道／肺：主水・気化／腎：運化"
      ],
      "correctIndex": 1,
      "explanation": "脾の運化、肺の通調水道、腎の主水・気化を、津液の異なる役割として関連づけます。一つの働きに複数の臓腑が登場する理由を、各役割の違いから説明する練習です。",
      "relatedSectionTitle": "第2節：多重サポート構造（冗長性）の神秘"
    },
    {
      "id": "lecture-lifedynamics-11-q2",
      "question": "腎の蔵精と肝の蔵血を、本講の五つの役割へ整理すると、共通する見出しはどれですか？",
      "options": [
        "分配",
        "排泄",
        "貯蔵"
      ],
      "correctIndex": 2,
      "explanation": "「精を蔵する」「血を蔵する」は貯蔵という見出しで比較できます。同じ臓腑がほかの見出しにも登場するため、一つの臓腑に一つの役割だけを割り当てる分類ではありません。",
      "relatedSectionTitle": "第1節：生命を維持する「5大循環タスク」"
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
      "relatedSectionTitle": "🔬 現代医学との比較：遺伝子・タンパク質の関係を扱うネットワーク医学"
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
      "question": "学習カード「営気と衛気の分担」を、生成・巡りと分配・排泄の三欄へ整理するとどこですか？",
      "options": [
        "生成",
        "排泄",
        "巡りと分配"
      ],
      "correctIndex": 2,
      "explanation": "営衛の分担・運行は、巡りと分配の観点で振り返ります。何に由来するかを扱う水穀の精気や清気は生成、不要なものを外へ出す話題は排泄です。説明する問いに合わせて分類します。",
      "relatedSectionTitle": "第1節：生成・巡り・排泄の整理"
    },
    {
      "id": "lecture-lifedynamics-12-q2",
      "question": "「脾の運化」を説明する文として、対象と働きの両方を含むものはどれですか？",
      "options": [
        "飲食物の精微を運び、変化させる働き",
        "自然の清気を取り入れ、呼吸に関わる働き",
        "精を蔵し、成長や発育の基盤となる働き"
      ],
      "correctIndex": 0,
      "explanation": "運化は飲食物の精微などを運び変化させる役割です。自然の清気は肺、精を蔵する説明は腎に関連づけます。既習の名称を並べるだけでなく、対象と動詞からどの役割かを説明します。",
      "relatedSectionTitle": "第2節：ひとつの関係を根拠とともに説明する"
    },
    {
      "id": "lecture-lifedynamics-12-q3",
      "question": "水穀の精気・清気、営衛・昇降出入、津液の排泄を、順にどの観点で整理しますか？",
      "options": [
        "巡り・分配 → 排泄と連携 → 生成",
        "排泄と連携 → 生成 → 巡り・分配",
        "生成 → 巡り・分配 → 排泄と連携"
      ],
      "correctIndex": 2,
      "explanation": "本講の整理表では、水穀の精気・清気は生成、営衛・昇降出入は巡り・分配、津液の排泄は排泄と連携の観点に置きます。用語の役割を説明する分類であり、体内物質の移動を測定した結果ではありません。",
      "relatedSectionTitle": "第1節：生成・巡り・排泄の整理"
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
      "explanation": "病因では何が背景に関わったか、病機ではどの働きがどう失調したと考えたか、症状では何が現れ報告されたか、証では現在の状態をどう分類したかを書きます。背景の候補は確認された原因とは限らず、伝統的な説明を検査で確認された生理機序や医学的な病名と同一視しません。",
      "relatedSectionTitle": "第2節：病因・病機・症状・証の四層峻別"
    },
    {
      "id": "lecture-pathomechanism-1-q2",
      "question": "「夕食後に張ると本人が話した」と「気の運行が滞ったのではと考えた」を、順にどの欄へ置きますか？",
      "options": [
        "病因の説明・証の分類",
        "病機の仮説・症状の報告",
        "症状の報告・病機の仮説"
      ],
      "correctIndex": 2,
      "explanation": "本人が述べた張りは症状の報告、気の運行の滞りという説明は病機の仮説です。症状として何が記されているかと、それをどう説明するかを分けると、仮説の根拠を後から確かめられます。",
      "relatedSectionTitle": "第2節：病因・病機・症状・証の四層峻別"
    },
    {
      "id": "lecture-pathomechanism-1-q3",
      "question": "「胸が張るのは気滞だから。気滞と考えた理由は胸が張るから」という説明に不足しているものはどれですか？",
      "options": [
        "より詳しい証名を付けて原因の説明に代えること",
        "別の所見・経過・他の説明を確かめること",
        "同じ所見を別の用語に言い換えて説明すること"
      ],
      "correctIndex": 1,
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
    "question": "正気と邪気は、本講ではそれぞれ何を整理する伝統用語ですか？",
    "options": [
      "正気：病因となる側／邪気：身体の働き",
      "正気：症状の現れ／邪気：現在の証名",
      "正気：身体の働き／邪気：病因となる側"
    ],
    "correctIndex": 2,
    "explanation": "正気は身体の働き、邪気は病因となる側を整理する伝統用語です。どちらも、特定の免疫検査値や病原体一種類の名称へそのまま置き換える定義ではありません。二つの語が何を比較するかを確認します。",
    "relatedSectionTitle": "第2節：失調の起点 ― 正気と邪気を用いた整理"
  },
  {
    "id": "lecture-pathomechanism-2-q2",
    "question": "六淫と七情に、順に属する組合せはどれですか？",
    "options": [
      "寒・湿・燥／喜・怒・思",
      "喜・怒・思／寒・湿・燥",
      "寒・喜・燥／湿・怒・思"
    ],
    "correctIndex": 0,
    "explanation": "寒・湿・燥は外因を整理する六淫の語、喜・怒・思は情志を整理する七情の語です。気候の性質と感情という分類対象を見分けます。日常の気候や感情が、それだけで病因になるという意味ではありません。",
    "relatedSectionTitle": "病因の基本用語"
  },
  {
    "id": "lecture-pathomechanism-2-q3",
    "question": "夜勤の背景を聞く四つの観点のうち、「何日続き、1回の勤務は何時間ですか」が直接確かめるものはどれですか？",
    "options": [
      "強さと持続",
      "発症前の身体の状態",
      "外的な条件の種類"
    ],
    "correctIndex": 0,
    "explanation": "日数と1回の勤務時間は、負担の強さと持続を具体化する情報です。どんな勤務かは条件の種類、既往や発症前の体調は身体の状態の欄です。背景の名前だけでなく、程度と時間を確かめます。",
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
    "question": "用語カード「働きが不足する」「運行が滞る」「本来の方向に逆らい上へ向かう」に対応する順はどれですか？",
    "options": [
      "気滞・気逆・気虚",
      "気陥・気虚・気滞",
      "気虚・気滞・気逆"
    ],
    "correctIndex": 2,
    "explanation": "不足は気虚、滞りは気滞、上逆は気逆です。気陥は持ち上げ支える働きの不足を説明します。いずれも「気の失調」ですが、量的な不足と運動の違いを分けて読みます。",
    "relatedSectionTitle": "第3節：運動の失調を区別する"
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
    "question": "津液不足と痰・飲などの説明を比較するとき、中心となる対比はどれですか？",
    "options": [
      "潤す働きの不足・水液の停滞",
      "水液の停滞・潤す働きの不足",
      "熱の過剰・温める働きの不足"
    ],
    "correctIndex": 0,
    "explanation": "津液不足は潤す働きの不足、痰や飲などは水液の停滞に関連づけます。不足と停滞という異なる観点を分けると、乾燥とむくみの報告を一つの量の多寡だけでまとめずに読めます。",
    "relatedSectionTitle": "導入：潤いの不足と停滞を分けて考える"
  },
  {
    "id": "lecture-pathomechanism-4-q2",
    "question": "痰と飲の学習上の区別として適切なのはどれですか？",
    "options": [
      "痰＝比較的さらりとした停滞、飲＝粘り・濁り",
      "痰＝正常な津液、飲＝喀出される分泌物",
      "痰＝粘り・濁り、飲＝比較的さらりとした停滞"
    ],
    "correctIndex": 2,
    "explanation": "伝統理論の痰には喀出される痰に限らない用法があり、飲は比較的さらりとした水液の停滞を説明します。用語の比較であり、胸水・肺水腫などを診断したり、効能を示したりするものではありません。",
    "relatedSectionTitle": "第3節：水湿・痰・飲を比較する"
  },
  {
    "id": "lecture-pathomechanism-4-q3",
    "question": "「夕方に足がむくむ感じがある」とあります。変動を比較する記録として、最も直接役立つ追加質問はどれですか？",
    "options": [
      "口の乾きは、どの場所にどの程度ありますか",
      "以前の受診では、どんな説明を受けましたか",
      "朝と夕方、立つ時間や休息でどう違いますか"
    ],
    "correctIndex": 2,
    "explanation": "この問いの目的は、足の訴えが時間や活動でどう変わるかを比べることです。口の乾きと受診歴も重要ですが、今回の変動を具体化する質問とは別です。むくみの原因や水分量を、この回答だけで判定しません。",
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
    "question": "血虚と瘀血の違いを、血のどの役割の変化として説明しますか？",
    "options": [
      "血虚：上逆する動き／瘀血：持ち上げる働きの不足",
      "血虚：養い潤す働きの不足／瘀血：巡りの停滞",
      "血虚：巡りの停滞／瘀血：養い潤す働きの不足"
    ],
    "correctIndex": 1,
    "explanation": "血虚は養い潤す働きの不足、瘀血は血の巡りの停滞を表す伝統用語です。上逆や持ち上げる働きは気の運動を比較する際の別の観点です。貧血や血栓の検査結果へ置き換えず、まず語の違いを説明します。",
    "relatedSectionTitle": "第2節：養い潤す働きの不足と血虚"
  },
  {
    "id": "lecture-pathomechanism-5-q2",
    "question": "瘀血との関係を学ぶ表で、気虚と気滞の説明はどう違いますか？",
    "options": [
      "気虚：寒による凝滞／気滞：熱による変化",
      "気虚：推動の不足／気滞：運行の滞り",
      "気虚：運行の滞り／気滞：推動の不足"
    ],
    "correctIndex": 1,
    "explanation": "気虚は血を推動する働きの不足、気滞は気の運行の滞りという側面から、血の停滞との関係を説明します。異なる背景を比較する課題であり、疲労や張りだけから瘀血を確定するものではありません。",
    "relatedSectionTitle": "第3節：瘀血と複数の背景を比較する"
  },
  {
    "id": "lecture-pathomechanism-5-q3",
    "question": "痛みの「部位が固定するか」を具体化したいとき、最も目的に合う質問はどれですか？",
    "options": [
      "毎回同じ場所ですか、それとも移りますか",
      "夜と昼では、どちらが気になりますか",
      "刺す感じですか、張る感じですか"
    ],
    "correctIndex": 0,
    "explanation": "毎回同じ場所か移るかは、部位の固定性を確かめる質問です。夜と昼は時間、刺す・張るは性状を扱います。瘀血の候補を比較するときも、この三つの情報を混ぜずに記録します。",
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
      "question": "陰・寒邪の偏盛による寒と、陽の不足による寒を、順に分類したものはどれですか？",
      "options": [
        "実熱・虚熱",
        "実寒・虚寒",
        "虚寒・実寒"
      ],
      "correctIndex": 1,
      "explanation": "過剰に関連づける寒は実寒、陽の不足に関連づける寒は虚寒です。同じ寒でも、偏盛か不足かという軸が異なります。冷えの訴えだけで虚実まで決める問題ではなく、定義の比較です。",
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
      "explanation": "実熱は陽・邪気の偏盛、虚熱は陰の不足に伴う相対的な熱として区別します。熱感の強弱だけによる区分ではありません。陽・陰を実測した熱量や体液量とは扱わず、発熱の原因、脱水、感染症などは別に医学的な評価が必要です。",
      "relatedSectionTitle": "第2節：寒熱の形成 ― 陰陽の偏盛と偏衰（四象限マトリクス）"
    },
    {
      "id": "lecture-pathomechanism-6-q3",
      "question": "寒熱錯雑の学習例でいう「上熱下寒」は、どの違いを表す用語ですか？",
      "options": [
        "上部と下部の寒熱の違い",
        "発症前と発症後の寒熱の違い",
        "活動時と休息時の寒熱の違い"
      ],
      "correctIndex": 0,
      "explanation": "上熱下寒は上部と下部という部位の違いを表します。時間や活動条件による変動とは軸が異なります。顔の熱感と足の冷えの二語だけで分類を確定せず、部位・条件・経過を具体的に確認します。",
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
      "question": "六淫の比較で「重さ・粘り・停滞」と「乾燥」に対応するものは、順にどれですか？",
      "options": [
        "風・寒",
        "湿・燥",
        "燥・湿"
      ],
      "correctIndex": 1,
      "explanation": "湿は重さ・粘り・停滞、燥は乾燥に注目する説明です。風は動きや変化、寒は冷えや収引に関連づけます。六つの名前を並べるだけでなく、比較する性質から用語を選びます。",
      "relatedSectionTitle": "第2節：六気から六淫へ ― 自然環境を捉える六つの分類"
    },
    {
      "id": "lecture-pathomechanism-7-q2",
      "question": "六淫のうち、風邪（ふうじゃ）の伝統的な性質として扱う組合せはどれですか？",
      "options": [
        "乾燥・潤いの不足",
        "重濁・粘滞・下部の重さ",
        "軽揚・遊走・変化"
      ],
      "correctIndex": 2,
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
      "question": "「食事時刻の乱れ」と「長時間の活動に対して休息が少ない」を、本講の観点へ対応させるとどれですか？",
      "options": [
        "七情内傷・飲食不節",
        "飲食不節・労逸不均",
        "労逸不均・七情内傷"
      ],
      "correctIndex": 1,
      "explanation": "食生活は飲食不節、活動と休息の偏りは労逸不均という観点で確認します。情志を扱う七情内傷とは、最初に尋ねる背景が違います。背景の分類と症状の原因の確定は分けて扱います。",
      "relatedSectionTitle": "第4節：労逸不均（過労と過度の安静）"
    },
    {
      "id": "lecture-pathomechanism-8-q2",
      "question": "本講で扱う古典の気機表現「怒・思・恐」の組合せはどれですか？",
      "options": [
        "怒則気緩・思則気乱・恐則気結",
        "怒則気下・思則気消・恐則気上",
        "怒則気上・思則気結・恐則気下"
      ],
      "correctIndex": 2,
      "explanation": "古典の表現では怒を気上、思を気結、恐を気下と関連づけます。伝統理論内の対応を学ぶ問題で、感情だけから臓器の損傷、失禁の原因、病名を判定するものではありません。",
      "relatedSectionTitle": "第2節：七情内傷（感情と気機の関係）"
    },
    {
      "id": "lecture-pathomechanism-8-q3",
      "question": "「思い悩む時期に食後の張りも気になった」という報告で、前後関係を確かめる質問はどれですか？",
      "options": [
        "悩みと張りはそれぞれいつ始まり、どう変わりましたか",
        "張りは腹部のどの側で、どこまで広がっていますか",
        "食事の量と内容は、普段と比べてどう違いますか"
      ],
      "correctIndex": 0,
      "explanation": "二つの開始時期と変化を別々に聞くと、先に始まったものや同時に変わったかを比較できます。部位や食事も重要ですが、直接の時間関係とは異なる情報です。前後が分かっても、因果関係が確定するわけではありません。",
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
      "question": "相生の関係で、木から火へ波及すると説明するモデル名はどれですか？",
      "options": [
        "相侮",
        "母病及子",
        "子病犯母"
      ],
      "correctIndex": 1,
      "explanation": "木は火の母なので、木から火という向きは母病及子です。火から木なら子病犯母、相剋と逆向きなら相侮です。向きと関係の種類を合わせて読み、実際にその順で症状が進んだかは経過で別に確かめます。",
      "relatedSectionTitle": "第3節：臓腑間波及の五行モデルとその活用"
    },
    {
      "id": "lecture-pathomechanism-9-q2",
      "question": "五行の関係モデルで「子病犯母」を説明する向きはどれですか？",
      "options": [
        "火（子）から木（母）",
        "木から土への相剋",
        "木（母）から火（子）"
      ],
      "correctIndex": 0,
      "explanation": "木生火という相生関係では木が母、火が子であり、子から母への波及を子病犯母と表します。これは伝統モデルの方向の比較です。頻度や実際の臓器障害、血液の移動を証明した説明ではありません。",
      "relatedSectionTitle": "第3節：臓腑間波及の五行モデルとその活用"
    },
    {
      "id": "lecture-pathomechanism-9-q3",
      "question": "気滞・痰湿・瘀血を比較するメモの見出しとして、順に対応するのはどれですか？",
      "options": [
        "血の巡り・気の運行・津液の停滞",
        "津液の停滞・血の巡り・気の運行",
        "気の運行・津液の停滞・血の巡り"
      ],
      "correctIndex": 2,
      "explanation": "気滞は気の運行、痰湿は津液に関する停滞、瘀血は血の巡りに注目する語です。異なる側面を分けて整理することで、三つを一律の進行段階として並べる誤りを避けられます。",
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
      "question": "不調が始まった時期の残業は解消しましたが、今も夜間の睡眠不足が続いています。「続いている背景」を扱う欄はどれですか？",
      "options": [
        "発症要因",
        "その場の増悪・軽減要因",
        "維持要因"
      ],
      "correctIndex": 2,
      "explanation": "現在も続く睡眠不足は、持続・維持という観点で確かめる情報です。最初の発症前後の出来事とは区別します。維持要因の候補として記録することと、睡眠不足が原因と確定することは別です。",
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
      "question": "候補Aが「活動で増え、休息で軽くなる」と予想する学習例です。「休息しても変わらない」という報告を、比較表のどこへ置きますか？",
      "options": [
        "候補Aに合わない情報",
        "候補Aを支持する情報",
        "まだ聞いていない不足情報"
      ],
      "correctIndex": 0,
      "explanation": "予想と合わない報告は反証・合わない情報の欄へ置きます。既に得た報告なので未確認ではありません。この一つで候補を完全に否定するのではなく、ほかの情報と合わせて説明を見直します。",
      "relatedSectionTitle": "第3節：支持情報と「反証」の力学"
    },
    {
      "id": "lecture-pathomechanism-11-q2",
      "question": "架空例の「疲れると頭痛が増す」と「固定した痛みが夜に気になる」という異なる報告を比べる際、適切なのはどれですか？",
      "options": [
        "性状だけで治法を決める",
        "同じ頭痛なので候補を統一する",
        "性状ごとに候補を立て、支持・反証・不足を比べる"
      ],
      "correctIndex": 2,
      "explanation": "報告は候補を比較する材料です。少数の症状だけで気虚・瘀血等を確定せず、発症経過、他の所見、必要な医学的評価を含めて確認します。病機論ではまだ個別の治法を決定しません。",
      "relatedSectionTitle": "第2節：短絡的断定の罠 ― 同一症状の複数仮説モデル"
    },
    {
      "id": "lecture-pathomechanism-11-q3",
      "question": "「休むと楽になるか、まだ聞いていない」は比較表のどの欄に入りますか？",
      "options": [
        "気虚を否定する情報",
        "追加で確認する不足情報",
        "気虚を支持する情報"
      ],
      "correctIndex": 1,
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
      "question": "「いつ始まったか」「別の訴えとどう関係するか」「何が今も続くか」を順に整理する三つの軸はどれですか？",
      "options": [
        "発生・波及・維持",
        "維持・発生・波及",
        "波及・維持・発生"
      ],
      "correctIndex": 0,
      "explanation": "始まりを扱う発生、複数の訴えの関係を扱う波及、続く状態を扱う維持を区別します。三つの問いへ具体的な記録を置けるかが要点です。図だけで病態の進行や原因を確定するものではありません。",
      "relatedSectionTitle": "第1節：病機論の「3大統合軸」総まとめ"
    },
    {
      "id": "lecture-pathomechanism-12-q2",
      "question": "瘀血という候補を「次に確認する問い」へ直すとき、痛みの比較に最も合うものはどれですか？",
      "options": [
        "寝つきと途中の目覚めは、以前とどう違いますか",
        "どの場所が、どんな感じで、いつから痛みますか",
        "食欲はあり、食後にもたれる感じはありますか"
      ],
      "correctIndex": 1,
      "explanation": "瘀血の候補を比較する記録では、痛みの部位・性質・期間を具体化します。食事と睡眠も別の問いとして必要になり得ますが、この候補から直接導いた痛みの問いとは異なります。血栓の有無は、この質問だけでは確認できません。",
      "relatedSectionTitle": "第2節：病機仮説から「診断の問い」への変換"
    },
    {
      "id": "lecture-pathomechanism-12-q3",
      "question": "【第3節：次章「臨床診断論」への接続】次章へつなげる情報として適切なのはどれですか？",
      "options": [
        "医療評価を省く説明",
        "支持・反証・不足情報・保留する判断",
        "分類名だけの要約"
      ],
      "correctIndex": 1,
      "explanation": "候補に合う情報、合わない情報、まだ聞いていないこと、判断を保留した理由を次章へ渡します。分類名だけで済ませず、安全確認と必要な医療評価を先に行うための問いも残します。",
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
        "症状＝分類、証＝病名、方針＝証名",
        "症状＝検査値、証＝本人の希望、方針＝確定原因",
        "症状＝訴え、証＝分類、方針＝別の判断"
      ],
      "correctIndex": 2,
      "explanation": "痛みの報告は症状、気滞などは伝統的な分類候補、介入方針は安全性や本人の希望なども含む別の判断です。分類名が付いただけで原因や効果が確定するわけではありません。",
      "relatedSectionTitle": "第1節：病名・症状・病機・証・治療方針の5層ピラミッド"
    },
    {
      "id": "lecture-diagnosis-1-q2",
      "question": "主訴から伝統的な分類候補を考える学習の流れとして適切なのはどれですか？",
      "options": [
        "病名の記録→配穴の決定→本人の希望の聴取",
        "分類決定→合う所見収集→方針固定",
        "安全確認→情報と候補の区別→追加確認"
      ],
      "correctIndex": 2,
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
        "弁証の確定後に受診の要否を検討する",
        "緊急性と受診の必要性を確認する",
        "非該当なら重い病気を除外する"
      ],
      "correctIndex": 1,
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
        "希望があれば施術可能とする",
        "施術を保留して医療評価につなぐ",
        "証が付けば施術可能とする"
      ],
      "correctIndex": 1,
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
      "question": "「夕方に疲れると肩が張る」という報告で、作業と休息との関係を具体化する質問はどれですか？",
      "options": [
        "肩のどの側で、どこからどこまで張りますか",
        "最初に張った日は、何月何日ごろでしたか",
        "連続作業・休憩・休日で、張りはどう違いますか"
      ],
      "correctIndex": 2,
      "explanation": "連続作業、休憩、休日の違いを聞くと、活動と休息に伴う変動を比較できます。部位と初発時期も重要ですが、今回確かめたい増悪・軽減条件とは別の欄です。",
      "relatedSectionTitle": "第3節：増悪・軽減因子のデコード表"
    },
    {
      "id": "lecture-diagnosis-3-q3",
      "question": "「月曜に張りが始まり、水曜に睡眠が短くなり、金曜も張りが続いた」という報告を時間軸へ移すと、どれですか？",
      "options": [
        "睡眠時間の変化→張りの開始→張りの持続",
        "張りの持続→睡眠時間の変化→張りの開始",
        "張りの開始→睡眠時間の変化→張りの持続"
      ],
      "correctIndex": 2,
      "explanation": "報告された日付に沿って、張りの開始、睡眠時間の変化、張りの持続と並べます。睡眠の変化は張りの開始より後なので、出来事を順序の確認なく原因として置くことはできません。",
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
      "question": "「仕事の日ほど張りが強い」という初期の見方を確かめたいとき、反対の例も尋ねる質問はどれですか？",
      "options": [
        "仕事のない日にも、同じ張りが出ることはありますか",
        "仕事のある日は、どれくらい張りが強くなりますか",
        "仕事で困ったことを、もう少し詳しく話せますか"
      ],
      "correctIndex": 0,
      "explanation": "休日にも同じ張りがあるかを聞くと、仕事の日に強いという見方に合わない例も探せます。仕事の日の程度は支持情報の具体化、困りごとは相談目的の確認です。質問ごとに何を検証するかを分けます。",
      "relatedSectionTitle": "第3節：仮説を「支持する質問」と「反証（否定）する質問」のペアリング"
    },
    {
      "id": "lecture-diagnosis-4-q3",
      "question": "問診のファネル構造として適切な進め方はどれですか？",
      "options": ["病名の二択を提示し、同意する理由を具体的に聴く","想定した症状を提示し、それに合う体験を自由に聴く","本人の体験を自由に聴き、時期や条件を具体的に聴く"],
      "correctIndex": 2,
      "explanation": "まず、自由に答えられる質問で、本人の症状や生活背景を幅広く聞きます。その後、時期や条件を具体的に尋ね、寒熱の感じ方や飲食・睡眠・排泄の状況などを、答えの範囲を絞った質問で確認します。",
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
      "question": "「暖色照明の下で舌が赤く見えた。熱の候補を考えた」というメモで、取得条件に当たるのはどれですか？",
      "options": [
        "舌が赤く見えたこと",
        "熱の候補を考えたこと",
        "暖色照明の下で観察したこと"
      ],
      "correctIndex": 2,
      "explanation": "暖色照明は観察の条件、赤く見えたことは得られた情報、熱の候補は解釈です。何が見えたかだけでなく、どの条件で見たかを分けて記録すると、再観察の際に比較できます。",
      "relatedSectionTitle": "第1節：四診共通の記録形式（5大プロトコル）"
    },
    {
      "id": "lecture-diagnosis-5-q2",
      "question": "舌質と舌苔を記録するとき、適切な区別はどれですか？",
      "options": [
        "舌質＝色全体の印象、舌苔＝舌の動き",
        "舌質＝苔の色・厚さ、舌苔＝本体の色・形",
        "舌質＝本体の色・形、舌苔＝苔の色・厚さ"
      ],
      "correctIndex": 2,
      "explanation": "本体と表面の苔を分けて観察します。気血・寒熱・胃気等との関連づけは伝統的な解釈であり、観察した色や形と解釈を同じ欄で確定情報にしません。",
      "relatedSectionTitle": "舌質と舌苔の役割分担"
    },
    {
      "id": "lecture-diagnosis-5-q3",
      "question": "舌の色が前回と違って見えた際、解釈の前に確認することはどれですか？",
      "options": [
        "照明・飲食・観察方法の再確認",
        "臓腑の分類による色の変化の確定",
        "前回の分類に合わせた色の記録の修正"
      ],
      "correctIndex": 0,
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
      "question": "「軽く触れると明瞭」「一定時間に数えた拍動」「押し返す印象」を、順に脈のどの観察軸へ記しますか？",
      "options": [
        "力・深さ・速さ",
        "深さ・速さ・力",
        "速さ・力・深さ"
      ],
      "correctIndex": 1,
      "explanation": "触れる圧でどこが明瞭かは深さ、一定時間の拍動は速さ、押し返す印象は力の欄です。複数の軸を一つの「良い脈・悪い脈」にまとめず、どの特徴を得たかを具体的に残します。",
      "relatedSectionTitle": "脈の四つの観察軸"
    },
    {
      "id": "lecture-diagnosis-6-q3",
      "question": "本講の脈の観察項目として適切な組合せはどれですか？",
      "options": [
        "脈の深さ・速さ・幅・力の強弱や緊張度",
        "脈の深さ・舌の色・苔の厚さ・声の強さ",
        "脈の速さ・腹部の張り・食欲・皮膚の温感"
      ],
      "correctIndex": 0,
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
        "病位＝寒熱、病性＝虚実、勢力関係＝表裏",
        "病位＝虚実、病性＝表裏、勢力関係＝寒熱",
        "病位＝表裏、病性＝寒熱、勢力関係＝虚実"
      ],
      "correctIndex": 2,
      "explanation": "表裏は病位、寒熱は病性、虚実は正気の不足と病邪・停滞などの勢力関係を考える軸です。各欄に、その判断に使った所見とまだ足りない情報を書きます。陰陽はこれらを含む全体をまとめる枠組みです。",
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
      "question": "津液の比較表で「口や皮膚の乾燥」と「むくみ・重さ」を、まずどの二つの観点へ置きますか？",
      "options": [
        "潤す働きの不足・輸布や排出の停滞",
        "輸布や排出の停滞・潤す働きの不足",
        "温める働きの不足・気の上逆"
      ],
      "correctIndex": 0,
      "explanation": "乾燥は潤す働きの不足、むくみや重さは輸布・排出の停滞を比較する情報です。両方が記録されることもあるため、一方を消して単純な水分量の多寡へまとめません。候補と医学的な体液評価は別です。",
      "relatedSectionTitle": "第3節：津液の異常を、不足と停滞の両面から考える"
    },
    {
      "id": "lecture-diagnosis-8-q2",
      "question": "気虚・陽虚・血虚を「何が不足する説明か」で比較した対応はどれですか？",
      "options": [
        "気虚：温め動かす働き／陽虚：養い／血虚：働き",
        "気虚：働き／陽虚：温め動かす働き／血虚：養い",
        "気虚：養い／陽虚：働き／血虚：温め動かす働き"
      ],
      "correctIndex": 1,
      "explanation": "気虚は気の働き、陽虚は温め動かす陽の働き、血虚は養う血の働きの不足に着目します。同じ疲労を訴える例でも、用語の意味は同じではありません。一つの訴えで選び分ける診断表としては使いません。",
      "relatedSectionTitle": "気虚・陽虚・血虚は、何が違う？"
    },
    {
      "id": "lecture-diagnosis-8-q3",
      "question": "「右のこめかみ」「刺すような感じ」「夜に気になる」という報告を、順にどの欄へ記しますか？",
      "options": [
        "部位・性状・時間",
        "性状・時間・部位",
        "時間・部位・性状"
      ],
      "correctIndex": 0,
      "explanation": "どこが痛いかは部位、どんな感じかは性状、いつ気になるかは時間です。気滞や瘀血などの候補を比べる前に、痛みという一語を具体的な記録へ分けます。この組合せだけで瘀血や医学的原因を確定しません。",
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
      "question": "頭痛部位を経絡と関連づける伝統的な整理で、前額部・側頭部・後頭部に対応する順はどれですか？",
      "options": [
        "太陽・陽明・少陽",
        "陽明・少陽・太陽",
        "少陽・太陽・陽明"
      ],
      "correctIndex": 1,
      "explanation": "本講では前額部を陽明、側頭部を少陽、後頭部を太陽と関連づける例を扱います。部位の比較を学ぶ課題であり、頭痛の医学的な原因や使う経穴を、この配属から決めるものではありません。",
      "relatedSectionTitle": "第2節：経絡弁証 ― 痛みの部位と三陰三陽の関係を考える"
    },
    {
      "id": "lecture-diagnosis-9-q2",
      "question": "肝気鬱結と肝血虚を、臓腑の役割の違いへ戻して比較するとどれですか？",
      "options": [
        "運化との関係・宣発との関係",
        "疏泄との関係・蔵血との関係",
        "蔵血との関係・疏泄との関係"
      ],
      "correctIndex": 1,
      "explanation": "肝気鬱結は疏泄と気の巡り、肝血虚は蔵血と血の養いの側面に関連づけます。同じ「肝」の語を含んでも、注目する役割が違います。分類名を具体的な働きへ戻して説明する練習です。",
      "relatedSectionTitle": "第1節：臓腑の役割から候補を考える"
    },
    {
      "id": "lecture-diagnosis-9-q3",
      "question": "食後のもたれがあるという報告だけから、避けるべき判断はどれですか？",
      "options": [
        "脾の運化との関係を候補として考える",
        "脾気虚と胃の疾患を同じ診断として確定する",
        "食事や服薬との時間関係を尋ねる"
      ],
      "correctIndex": 1,
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
      "question": "支持する情報だけを重く扱い、合わない報告を軽く扱う傾向は、本講のどの認知バイアスですか？",
      "options": [
        "利用可能性",
        "サンクコスト",
        "確証バイアス"
      ],
      "correctIndex": 2,
      "explanation": "確証バイアスは、自分の見方を支持する情報を重く、反対情報を軽く扱う傾向です。最近見た例を当てはめる利用可能性、費やした時間や手間で変更しにくくなるサンクコストとは区別します。",
      "relatedSectionTitle": "第3節：臨床家の目を曇らせる「4大認知バイアス」"
    },
    {
      "id": "lecture-diagnosis-10-q2",
      "question": "仮説を支持すると思っていた舌の色が、照明を変えると違って見えた場合、最初の対応はどれですか？",
      "options": [
        "初期の分類を維持するため、今回の所見を省く",
        "証名を追加して説明し、照明の違いは検討しない",
        "条件をそろえて再観察し、仮説を再検討する"
      ],
      "correctIndex": 2,
      "explanation": "矛盾への対応には、観察条件の再確認、複合病態の検討、仮説の見直しがあります。この例では条件の違いを確認することが先です。限られた所見から真寒仮熱や治療を確定しません。",
      "relatedSectionTitle": "ステップ1：観察条件・外乱の再確認（手技と環境を疑う）"
    },
    {
      "id": "lecture-diagnosis-10-q3",
      "question": "冷えの訴えと熱を示すように解釈した舌の所見が食い違う場合、適切なのはどれですか？",
      "options": [
        "条件・混在・別候補・保留を比較する",
        "舌から冷えの報告を除く",
        "冷えから舌の記録を修正する"
      ],
      "correctIndex": 0,
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
        "確信を持たせるため不明点を記録から省く",
        "候補・根拠・反証・不明点を併記する",
        "最も簡潔に説明できる証名だけを記録する"
      ],
      "correctIndex": 1,
      "explanation": "証は固定したレッテルではなく、現在の情報からの暫定的な分類です。根拠、反証、不明点、確信度を示すことで、次の確認や再評価につなげます。",
      "relatedSectionTitle": "第3節：診断確信度の導入"
    },
    {
      "id": "lecture-diagnosis-11-q2",
      "question": "SOAPで「診察時の姿勢」と「根拠を添えた暫定候補」は、順にどの欄へ記しますか？",
      "options": [
        "O・A",
        "S・P",
        "A・O"
      ],
      "correctIndex": 0,
      "explanation": "診察で観察した姿勢はO、候補と根拠を示す評価・解釈はAです。本人の訴えはS、次の確認や対応の計画はPへ置きます。観察したことと、その意味をどう考えたかを読み分けます。",
      "relatedSectionTitle": "第4節：東洋医学版SOAPカルテ記述フォーマット"
    },
    {
      "id": "lecture-diagnosis-11-q3",
      "question": "「昨日から腰が痛いと本人が話した」という情報を扱う方法はどれですか？",
      "options": [
        "施術者が立てた仮説としてAの欄に記す",
        "本人が述べた自覚症状としてSの欄に記す",
        "原因を確認した所見としてOの欄に記す"
      ],
      "correctIndex": 1,
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
        "製品・量・服薬・時期を確認し相談する",
        "使用後なのでその製品が原因と確定する",
        "中焦の分類から処方や服用量の変更を指示する"
      ],
      "correctIndex": 0,
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
      "question": "「痛みのつらさ」「袖を通す動作」「自分で続けられる生活の調整」を、三層ゴールへ順に対応させるとどれですか？",
      "options": [
        "生活機能・セルフケアと自立・苦痛軽減",
        "セルフケアと自立・苦痛軽減・生活機能",
        "苦痛軽減・生活機能・セルフケアと自立"
      ],
      "correctIndex": 2,
      "explanation": "痛み自体のつらさは苦痛軽減、着替えの動作は生活機能、自分で続ける調整はセルフケアと自立の層です。同じ本人の希望を、何を評価する目標かによって分けます。",
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
        "治則＝証名、治法＝診察で確定した病名",
        "治則＝大方針、治法＝対象と目的の具体化",
        "治則＝経穴名、治法＝刺激の深度と時間"
      ],
      "correctIndex": 1,
      "explanation": "治則と治法は異なる計画の層です。治法の名称は伝統的な目標の表現で、実際に臓器や気血をその通り動かせる機序・効果を証明したものではありません。",
      "relatedSectionTitle": "第2節：治則と治法の違い ― 「戦略」と「戦術」"
    },
    {
      "id": "lecture-treatment-2-q2",
      "question": "治療設計で「不足を補う大方針」と「気の不足を補うという具体化」を、順に区別したものはどれですか？",
      "options": [
        "治法・配穴",
        "配穴・治則",
        "治則・治法"
      ],
      "correctIndex": 2,
      "explanation": "治則は大方針、治法は対象と目的を具体化する言葉です。例えば不足を補う方針を、気の不足へ着目して補気と述べると治法の層になります。経穴や実施方法は、その先で別に検討する層です。",
      "relatedSectionTitle": "第2節：治則と治法の違い ― 「戦略」と「戦術」"
    },
    {
      "id": "lecture-treatment-2-q3",
      "question": "【同じ証と個別条件】同じ伝統的な証の候補でも、刺激への不安や持病・服薬が異なる二人の計画を分ける理由はどれですか？",
      "options": [
        "個別の安全情報を根拠に、候補と制約を二人で比較する",
        "同じ証という分類を根拠に、刺激条件を二人でそろえる",
        "年齢という条件を根拠に、刺激量を二人で使い分ける"
      ],
      "correctIndex": 0,
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
        "熱者温之・寒者清之",
        "熱者補之・寒者瀉之",
        "熱者清之・寒者温之"
      ],
      "correctIndex": 2,
      "explanation": "熱には清、寒には温という基本対応を学びます。ただし分類と実際の方法・刺激条件・医療上の対応は別の判断です。単一の訴えだけで寒熱や実施の適応を確定しません。",
      "relatedSectionTitle": "第2節：寒熱への対応 ― 熱者清之・寒者温之"
    },
    {
      "id": "lecture-treatment-3-q2",
      "question": "「虚虚実実」という伝統的な戒めが指す考え方はどれですか？",
      "options": [
        "補瀉の名称と刺激条件を分けて記録する対応",
        "虚と実の併存を記録して判断を保留する対応",
        "不足を損ない、過剰・停滞を助長する対応"
      ],
      "correctIndex": 2,
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
        "本＝身体の深い部位、標＝身体の浅い部位",
        "本＝背景の病態、標＝現れている苦痛",
        "本＝今の症状、標＝過去の背景"
      ],
      "correctIndex": 1,
      "explanation": "本は背景や基盤、標は現れている症状などを考える枠組みです。部位の深浅や過去・現在だけの区分ではありません。緊急性を確認し、安全が確保された状況で優先順位を検討します。",
      "relatedSectionTitle": "第1節：本治と標治の定義と役割分担"
    },
    {
      "id": "lecture-treatment-4-q2",
      "question": "【標本緩急の判断】慢性的な脾胃の虚弱（本虚）という伝統的な分類で説明されてきた人に、激しい水様性下痢と嘔吐が起こり、脱水の危険が迫っています。最優先の対応はどれですか？",
      "options": [
        "伝統的な分類を優先し、標実の治法を先に決める",
        "慢性の背景を優先し、本治の計画を先に完成させる",
        "現在の脱水の危険を優先し、救急医療につなげる"
      ],
      "correctIndex": 2,
      "explanation": "「急則治其標」は伝統的な原則ですが、激しい嘔吐・下痢に意識異常や急激な悪化が伴う状況を鍼灸だけで対応する指示ではありません。医療評価と必要な救急対応を優先します。",
      "relatedSectionTitle": "第2節：優先順位を決める「4大評価軸」"
    },
    {
      "id": "lecture-treatment-4-q3",
      "question": "初期の強い苦痛から目標へ近づいた段階に移ったとき、本講の表で新たに中心となる問いはどれですか？",
      "options": [
        "初回の苦痛の強さはどの程度だったか",
        "継続・変更・終了のどれが妥当か",
        "発症前後の出来事は何だったか"
      ],
      "correctIndex": 1,
      "explanation": "目標に近づいた段階では、残る症状、生活機能、負担、本人の希望を踏まえ、継続・変更・終了を比較します。初回の情報を繰り返すだけでなく、今の段階に合わせて問いを更新します。",
      "relatedSectionTitle": "本標配分のタイムライン設計"
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
      "question": "「漏れを防ぎ保つ」と「下陥に対して持ち上げる」という治法の目的は、順にどれですか？",
      "options": [
        "理気・固摂",
        "固摂・昇提",
        "昇提・降気"
      ],
      "correctIndex": 1,
      "explanation": "固摂は漏出など固摂の失調、昇提は下陥という説明に着目する方針です。降気は上逆、理気は巡りを扱います。似た「気への治法」でも、何を調整する目的かを分けます。",
      "relatedSectionTitle": "第1節：気の5大治法 比較マトリクス"
    },
    {
      "id": "lecture-treatment-5-q2",
      "question": "伝統用語として「気逆」に対する治法の目的を対応させたものはどれですか？",
      "options": [
        "固摂：漏出を扱う",
        "昇提：下陥を扱う",
        "降気・降逆：上逆を扱う"
      ],
      "correctIndex": 2,
      "explanation": "気逆は上逆、降気・降逆はその上逆を扱う目的として対応させます。昇提は下陥、固摂は漏出に着目する別の目的です。用語の対応を学ぶ問題で、嘔吐やしゃっくりの原因・病名や個別の治療を決める指示ではありません。",
      "relatedSectionTitle": "第3節：気の運動方向の制御 ― 昇降の力学"
    },
    {
      "id": "lecture-treatment-5-q3",
      "question": "気の伝統的な分類と治法の目的の対応として適切なのはどれですか？",
      "options": [
        "気虚―理気、気滞―補気、気逆―固摂、気陥―降気",
        "気虚―補気、気滞―理気、気逆―降気、気陥―昇提",
        "気虚―降気、気滞―固摂、気逆―昇提、気陥―理気"
      ],
      "correctIndex": 1,
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
      "explanation": "滋陰・生津は潤す働きの不足、利水・祛痰は水湿や痰などの停滞を扱う目的として学びます。実際の体液量の評価や、薬・飲水に関する判断は、この伝統的な分類とは分け、医学的な評価と個別の安全確認に基づいて行います。",
      "relatedSectionTitle": "第3節：津液の不足と停滞を分ける"
    },
    {
      "id": "lecture-treatment-6-q2",
      "question": "理気と活血を併記した学習メモで、それぞれが着目する対象はどれですか？",
      "options": [
        "理気：血の停滞／活血：気の巡り",
        "理気：津液の不足／活血：血の養いの不足",
        "理気：気の巡り／活血：血の停滞"
      ],
      "correctIndex": 2,
      "explanation": "理気は気の巡り、活血は血の停滞に着目する伝統的な治法名です。養血は血の養いの不足を扱います。二つを組み合わせる理由の説明と、実際の効果や安全性の確認は区別します。",
      "relatedSectionTitle": "第2節：養血・活血と気との関係"
    },
    {
      "id": "lecture-treatment-6-q3",
      "question": "養血と活血の目的を比較した説明として適切なのはどれですか？",
      "options": [
        "養血＝養いの不足、活血＝血の停滞",
        "養血＝血の停滞、活血＝養いの不足",
        "養血＝気の上逆、活血＝気の下陥"
      ],
      "correctIndex": 0,
      "explanation": "不足と停滞という異なる観点を比較します。血虚・瘀血は貧血・血栓の同義語ではなく、養血・活血という名称から検査値の改善や特定生薬の安全性・必要性を保証しません。",
      "relatedSectionTitle": "活血と養血の目的の違い"
    }
  ]
},
  "lecture-treatment-7": {
  "lectureId": "lecture-treatment-7",
  "chapterId": "treatment",
  "chapterTitle": "第10章 治則・治法",
  "lectureTitle": "臓腑の役割から治法を考える",
  "passingScore": 2,
  "questions": [
    {
      "id": "lecture-treatment-7-q1",
      "question": "培土生金（健脾補肺）と滋水涵木（滋腎養肝）が関連づける臓腑は、順にどれですか？",
      "options": [
        "脾と肺／腎と肝",
        "腎と肝／脾と肺",
        "肝と脾／心と腎"
      ],
      "correctIndex": 0,
      "explanation": "土は脾、金は肺なので培土生金は脾と肺、水は腎、木は肝なので滋水涵木は腎と肝の関係を用います。五行の名称と既習の臓腑をつなげて治法名を読む練習です。",
      "relatedSectionTitle": "第2節：臓腑の関係から考える四つの治法"
    },
    {
      "id": "lecture-treatment-7-q2",
      "question": "「肝と脾の関係の失調」という伝統的な整理に、疎肝健脾を対応させる説明はどれですか？",
      "options": [
        "肝の疏泄と脾の運化",
        "腎の蔵精と心の主血脈",
        "肝の疏泄だけで脾は含めない"
      ],
      "correctIndex": 0,
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
      "question": "「訴えの部位を手掛かりにする」「経絡を介した離れた部位を検討する」「原穴・絡穴などの分類を組み合わせる」は、順にどれですか？",
      "options": [
        "特殊要穴配穴・局所配穴・遠隔配穴",
        "局所配穴・遠隔配穴・特殊要穴配穴",
        "遠隔配穴・特殊要穴配穴・局所配穴"
      ],
      "correctIndex": 1,
      "explanation": "局所は訴えの部位、遠隔は離れた部位と経絡などの対応、特殊要穴は伝統的な分類と組合せを根拠にします。名称だけでなく、何を選定理由としているかを読み分けます。実際の適応と安全性は別に確認します。",
      "relatedSectionTitle": "第1節：配穴の3大基本ディメンション"
    },
    {
      "id": "lecture-treatment-8-q2",
      "question": "原絡配穴（主客配穴）の伝統的な組合せはどれですか？",
      "options": [
        "主経の原穴＋同じ経の絡穴",
        "主経の絡穴＋表裏の経の原穴",
        "主経の原穴＋表裏の経の絡穴"
      ],
      "correctIndex": 2,
      "explanation": "原穴を主、表裏関係にある経絡の絡穴を客とする伝統的な組合せです。名称の原則を学ぶ問題で、併用により治療効果が飛躍的に高まることや臓腑の調整を保証しません。",
      "relatedSectionTitle": "1. 原絡配穴（げんらくはいけつ：主客配穴）"
    },
    {
      "id": "lecture-treatment-8-q3",
      "question": "「背部兪穴と募穴を組み合わせる」という説明の見出しを選ぶとどれですか？",
      "options": [
        "郄穴と八会穴の組合せ",
        "兪募配穴",
        "原絡配穴"
      ],
      "correctIndex": 1,
      "explanation": "兪募配穴は背部兪穴と募穴の組合せです。原絡は原穴と絡穴、郄会は郄穴と八会穴という別の分類を組み合わせます。配穴の名称から、どの分類を使う説明かを復元します。",
      "relatedSectionTitle": "2. 兪募配穴（ゆぼはいけつ）"
    }
  ]
},
  "lecture-treatment-9": {
  "lectureId": "lecture-treatment-9",
  "chapterId": "treatment",
  "chapterTitle": "第10章 治則・治法",
  "lectureTitle": "介入方法・刺激量の検討事項と限界",
  "passingScore": 2,
  "questions": [
    {
      "id": "lecture-treatment-9-q1",
      "question": "【刺激条件の前提】予定する経穴名と本人の不安だけが記録されています。実施前に不足している確認はどれですか？",
      "options": [
        "同じ経穴名なら前の患者の条件をそのまま使う",
        "局所解剖・持病・服薬も確認する",
        "低刺激なら確認は完了とする"
      ],
      "correctIndex": 1,
      "explanation": "経穴名や低刺激という表現だけでは安全を保証しません。局所解剖、体格、持病、服薬、本人の希望と同意などを確認し、判断できない場合は保留します。",
      "relatedSectionTitle": "施術前の確認"
    },
    {
      "id": "lecture-treatment-9-q2",
      "question": "施術後に倦怠感やめまいの報告があった場合、適切な評価はどれですか？",
      "options": [
        "程度・経過・安全性を確認する",
        "翌日に出た症状なら施術とは無関係とする",
        "正気の消耗だけで原因とする"
      ],
      "correctIndex": 0,
      "explanation": "倦怠感やめまいを好転反応や刺激量の問題だけで説明せず、有害事象や他の原因を検討します。小さい刺激でも損傷や熱傷等のリスクは残り、継続・保留・受診を個別に判断します。",
      "relatedSectionTitle": "施術中の変化"
    },
    {
      "id": "lecture-treatment-9-q3",
      "question": "【個別の安全評価】体格が小さく刺激に不安がある患者の初期計画として、最も適切なものはどれですか？",
      "options": [
        "個別条件と同意を確認し、保留も考える",
        "穴数を減らせば安全とする",
        "弱い刺激なら確認を終える"
      ],
      "correctIndex": 0,
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
      "options": [
        "施術者の生活像から、本人の改善すべき点を選ぶ",
        "夜勤と育児の制約から、本人と小さな調整を選ぶ",
        "睡眠の症状から、全員に共通の起床時刻を選ぶ"
      ],
      "correctIndex": 1,
      "explanation": "夜勤や育児で変えにくいことを確認し、今の生活で本人が試せる小さな調整を一緒に選びます。生活背景と症状の関係は候補として扱い、一律の指示や原因の決めつけを避けます。実行できたかと、その後の症状の変化も確認します。",
      "relatedSectionTitle": "2. 生活指導が失敗する原因と「合意形成」の技術"
    },
    {
      "id": "lecture-treatment-10-q2",
      "question": "生活背景の整理で「夜勤と育児の時間的な制約」は、まずどの領域の情報ですか？",
      "options": [
        "室内の環境",
        "飲食・服薬",
        "社会的背景"
      ],
      "correctIndex": 2,
      "explanation": "仕事や育児による制約は社会的背景の欄に置きます。睡眠時間を調整する相談でも、実行できるかはこの情報に左右されます。室温や騒音は環境、薬の変更時期は飲食・服薬という別の欄です。",
      "relatedSectionTitle": "1. 生活背景を整理する"
    },
    {
      "id": "lecture-treatment-10-q3",
      "question": "慢性痛が再び気になったという報告を受けた際、生活背景の扱いとして適切なのはどれですか？",
      "options": [
        "負荷や睡眠の変化と計画を再確認する",
        "再発から生活態度を原因とする",
        "一時軽減したことを再評価不要の根拠とする"
      ],
      "correctIndex": 0,
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
      "question": "初回は「夕方、座位での痛み0〜10」を記録しました。次回の比較に最も合う記録はどれですか？",
      "options": [
        "朝、立位での痛み0〜10",
        "夕方、同じ座位での作業時間",
        "夕方、同じ座位での痛み0〜10"
      ],
      "correctIndex": 2,
      "explanation": "同じ指標・時間帯・条件をそろえると、前後の痛みを比べやすくなります。作業時間も生活機能の大切な指標ですが、痛みの点数とは別に前後を記録して比較します。",
      "relatedSectionTitle": "評価に使う情報"
    },
    {
      "id": "lecture-treatment-11-q2",
      "question": "【治療反応の評価と計画変更】初回の施術後に患者が「翌朝、少しだるさが出たが、その後に長年の首の重みが劇的に軽くなり熟睡できた」と報告した場合の臨床的評価はどれですか？",
      "options": [
        "首の軽減とだるさを別に記録し、程度と経過を確認",
        "だるさだけを優先して記録し、全方針を逆に変更",
        "首の軽減を優先して記録し、だるさは効果と判断"
      ],
      "correctIndex": 0,
      "explanation": "施術後のだるさを改善の証拠や「好転反応」と決めつけません。主訴の改善、有害な反応、自然経過などを分けて評価し、患者の希望と安全性を踏まえて計画を調整します。",
      "relatedSectionTitle": "評価に使う情報"
    },
    {
      "id": "lecture-treatment-11-q3",
      "question": "継続中の施術後に症状の悪化が報告された場合、適切なのはどれですか？",
      "options": [
        "弁証の名前だけ変えて継続する",
        "安全性を確認し、保留・受診も検討する",
        "予定回数まで継続してから評価する"
      ],
      "correctIndex": 1,
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
      "question": "初期計画で「いつ、同じ指標を使って比べるか」が空欄です。七つの項目のどこを補いますか？",
      "options": [
        "評価",
        "治則・治法",
        "介入の候補"
      ],
      "correctIndex": 0,
      "explanation": "指標・条件・比較する時期は評価の欄です。治則・治法は方針と根拠、介入の候補は確認手段や代替案を記します。計画に方法が書かれていても、変化をどう確かめるかは別に必要です。",
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
        "目的・限界・期間・リスク・対応を共有する",
        "同意書への署名だけで理解の確認に代える",
        "良くなる見込みだけを話し不確実性は後で伝える"
      ],
      "correctIndex": 0,
      "explanation": "目的、期待できることと限界、期間、リスク、問題が起きたときの対応を、本人に伝わる言葉で説明します。説明しただけで同意が得られたとは考えず、本人の理解や希望、質問を確認します。セルフケアを含む役割分担も、本人と相談します。",
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
      "options": [
        "新情報が加われば、初回の安全評価に判断をそろえる",
        "新情報が加われば、前の段階の判断を再評価する",
        "新情報が加われば、終了の段階まで判断を進める"
      ],
      "correctIndex": 1,
      "explanation": "各段階は一方向に終わる手順ではありません。新情報や悪化があれば安全性や仮説へ戻ります。Webでの判断の学習と実際の診療技能も区別します。",
      "relatedSectionTitle": "2. 手順の遵守（プロトコル）と自己修正ループ"
    },
    {
      "id": "lecture-practice-1-q2",
      "question": "縦断的ケースの記録で「初回の目標」「直後の反応」「1週間後の経過」がそろいました。次回の計画へ直接つなぐ作業はどれですか？",
      "options": [
        "目標と各時点の変化を比べ、見直す理由を記す",
        "直後の反応を、初回の目標の代わりに記す",
        "1週間後の経過を、初回からの所見に書き換える"
      ],
      "correctIndex": 0,
      "explanation": "各時点の記録を残したまま目標と比較すると、何を根拠に計画を変えるかを説明できます。最新の情報で古い記録を置き換えず、経過を追って自己修正するのが本講の学習です。",
      "relatedSectionTitle": "2. 手順の遵守（プロトコル）と自己修正ループ"
    },
    {
      "id": "lecture-practice-1-q3",
      "question": "施術直後に楽になったという架空の報告から、追加で確認することはどれですか？",
      "options": [
        "直後の変化と選穴の理論を比べ、配穴の効果を確定する",
        "持続時間・生活機能・有害な反応を記録し、経過を比較する",
        "直後の変化と初診の証名を比べ、治療機序を確定する"
      ],
      "correctIndex": 1,
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
      "question": "問診票の「睡眠」と「服薬」が空欄です。引継ぎメモで次の確認が具体的に分かる記述はどれですか？",
      "options": [
        "本人の頭痛の場所と、頭を動かしたときの変化を尋ねる",
        "初回の痛みと希望を、同じ言葉で書き直して確認する",
        "睡眠時刻・日中の支障、薬の名称・使用時期を尋ねる"
      ],
      "correctIndex": 2,
      "explanation": "空欄に対応する追加質問を具体的に書きます。睡眠なら時刻や支障、服薬なら製品や使用時期などです。他の質問も情報として有用ですが、睡眠と服薬の未確認欄を埋める目的とは異なります。",
      "relatedSectionTitle": "2. 「分からない情報」を無理に捨てない（保留の技術）"
    },
    {
      "id": "lecture-practice-2-q2",
      "question": "問診票に「私の頭痛は低血圧のせいです」とある場合、適切な記録はどれですか？",
      "options": [
        "原因に関する考えは記録から除外、症状名だけ要約",
        "診察で確認した原因としての記録、発症経過は不要",
        "本人の原因についての考え、経過・検査は別に確認"
      ],
      "correctIndex": 2,
      "explanation": "本人がそう考えていることと、原因が確認されたことは異なります。訴え、観察・検査の情報、原因の候補を分けます。本人の報告を客観的な身体所見や病機の証明と呼び替えません。",
      "relatedSectionTitle": "1. 事実と解釈の峻別フレームワーク"
    },
    {
      "id": "lecture-practice-2-q3",
      "question": "複数の訴えがある架空例で、今回の主訴を整理する方法はどれですか？",
      "options": [
        "訴えの数が多い部位を優先する基準にする",
        "本人の困りごとと生活への支障を尋ねる",
        "施術者が扱いやすい症状を先に選ぶ"
      ],
      "correctIndex": 1,
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
        "検査結果の原資料を確認した所見として扱う",
        "受診時の説明の申告として現在の変化も確認する",
        "現在の危険徴候がすべて除外されたと扱う"
      ],
      "correctIndex": 1,
      "explanation": "本人の受診報告と原資料の確認は区別します。過去の検査は現在の安全性を保証しないため、その後の症状の変化や未確認事項も確かめます。",
      "relatedSectionTitle": "2. 【共通模擬症例：第2段階 開示】"
    },
    {
      "id": "lecture-practice-3-q2",
      "question": "問診中に突然ろれつが回らなくなった場合、優先する対応はどれですか？",
      "options": [
        "頭痛の証を分類してから紹介先を考える",
        "以前のMRIで異常なしなら経過を見る",
        "施術を行わず119への救急要請を優先する"
      ],
      "correctIndex": 2,
      "explanation": "急なろれつの異常は救急対応を考える徴候です。過去の検査結果で現在の変化を否定せず、伝統分類や施術を先にして対応を遅らせません。",
      "relatedSectionTitle": "1. 頭痛におけるレッドフラッグ（危険信号）のチェックリスト"
    },
    {
      "id": "lecture-practice-3-q3",
      "question": "架空例に「発熱・麻痺はない」と記載されている場合、適切な結論はどれですか？",
      "options": [
        "伝統分類が付けば残る受診判断を省略する",
        "確認された範囲として記録する",
        "二つの陰性所見で重大な病気を除外する"
      ],
      "correctIndex": 1,
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
      "options": [
        "初回施術、経穴に対する期待と不安を尋ねる",
        "活動量、休息の有無と頭痛の変動を尋ねる",
        "痛みの位置、放散する範囲と部位を尋ねる"
      ],
      "correctIndex": 1,
      "explanation": "症状の名称だけで決めず、活動や休息、時間帯などと症状の変動を具体的に確認します。候補に合う言葉を引き出す誘導ではなく、候補を区別する情報を集めます。",
      "relatedSectionTitle": "1. 慢性頭痛における代表的な対立仮説"
    },
    {
      "id": "lecture-practice-4-q2",
      "question": "症状の様子がまだ曖昧なとき、質問をどう進めますか？",
      "options": [
        "本人の自由な語りから、その話の解釈についての同意へ進む",
        "想定した症状の二択から、同意した内容の詳しい聴取へ進む",
        "本人の自由な語りから、時期や条件を絞った具体的確認へ進む"
      ],
      "correctIndex": 2,
      "explanation": "まず本人の自由な語りを聞き、その後に時期・活動・休息などを具体的に確認します。最初から想定した分類に同意を求める進め方は避けます。",
      "relatedSectionTitle": "2. 【共通模擬症例：第3段階 開示】"
    },
    {
      "id": "lecture-practice-4-q3",
      "question": "共通症例で「夕方に頭が張ると本人が話した」「診察中にため息があった」を、順に分けるとどれですか？",
      "options": [
        "原因の解釈・治療の計画",
        "本人の報告・観察した特徴",
        "観察した特徴・本人の報告"
      ],
      "correctIndex": 1,
      "explanation": "本人の言葉で述べられた張りは報告、その場で聞いたため息は観察した特徴です。どちらも候補を比べる材料ですが、取得の仕方を区別して記録すると、後から情報源を確認できます。",
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
      "question": "共通症例の「緊張で変動する張り・ため息」と「疲労・食後のもたれ・軟便」を、比較表の主な候補へ順に対応させるとどれですか？",
      "options": [
        "肝気鬱結・脾気虚",
        "脾気虚・血虚",
        "血虚・痰湿"
      ],
      "correctIndex": 0,
      "explanation": "比較表では緊張に伴う変動、張り、ため息を肝気鬱結、疲労・もたれ・軟便を脾気虚の支持情報として扱います。支持する組合せを読み取る課題で、取得条件や合わない点を含めた検討は続けます。",
      "relatedSectionTitle": "候補の比較表"
    },
    {
      "id": "lecture-practice-5-q2",
      "question": "共通症例で脾気虚を候補に残した根拠の組合せはどれですか？",
      "options": [
        "過去のMRIの説明と通院できる曜日",
        "頭痛という主訴と年齢だけ",
        "疲労・食後のもたれ・軟便など"
      ],
      "correctIndex": 2,
      "explanation": "比較表では疲労、食後のもたれ、軟便、淡い舌などを支持情報として挙げています。ただし観察条件や睡眠・服薬の影響などが未確認で、候補は暫定的です。",
      "relatedSectionTitle": "候補の比較表"
    },
    {
      "id": "lecture-practice-5-q3",
      "question": "共通症例の比較表で、痰湿の候補を残す支持情報と、まだ記載されていない情報の組合せはどれですか？",
      "options": [
        "支持：頭の重さ・胃の不快感／未記載：厚い苔",
        "支持：厚い苔・滑脈／未記載：頭の重さ",
        "支持：夜の固定痛・暗紫色／未記載：疲労"
      ],
      "correctIndex": 0,
      "explanation": "頭の重さと胃の不快感は記載された支持情報ですが、厚い苔は記載されていません。候補に典型的な語を知っていても、症例の記録へ追加してはいけません。表を実際の記載と照合して読む問題です。",
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
      "question": "本人の希望「来週の準備作業」と「数週間後の休日活動」を、二層の目標に分けるとどれですか？",
      "options": [
        "準備作業：中長期／休日活動：短期",
        "準備作業：症状指標／休日活動：安全指標",
        "準備作業：短期／休日活動：中長期"
      ],
      "correctIndex": 2,
      "explanation": "来週の準備作業は直近の短期目標、数週間後の活動は中長期目標として相談します。どちらも生活上の目標で、それをいつ何で比較するかという評価指標を別に決めます。",
      "relatedSectionTitle": "2. 短期目標と中長期目標の二層設計"
    },
    {
      "id": "lecture-practice-6-q2",
      "question": "共通症例の「プレゼン準備を進めたい」を評価できる目標にする例はどれですか？",
      "options": [
        "1週間後に夕方の作業時間と中断回数を比べる",
        "1週間後に脾気虚という分類名だけを比べる",
        "1週間後に体質が良くなったかだけ尋ねる"
      ],
      "correctIndex": 0,
      "explanation": "本人が大切にする活動と評価時期、比較する指標を具体化します。痛みの点数も記録しますが、それだけで作業への支障が減ったと判断しません。",
      "relatedSectionTitle": "2. 短期目標と中長期目標の二層設計"
    },
    {
      "id": "lecture-practice-6-q3",
      "question": "頭痛の共通症例で、薬を減らせるか心配という希望をどう扱いますか？",
      "options": [
        "施術を受ける間だけ自己判断で薬を中止してもらう",
        "希望と使用状況を確認し医師・薬剤師へ相談する",
        "鎮痛薬を使わないことを修了目標にする"
      ],
      "correctIndex": 1,
      "explanation": "薬の使用状況は経過の情報ですが、減薬や中止そのものを達成目標にはしません。薬を使ったことを失敗と評価せず、必要な相談につなげます。",
      "relatedSectionTitle": "2. 短期目標と中長期目標の二層設計"
    }
  ]
},
  "lecture-practice-7": {
  "lectureId": "lecture-practice-7",
  "chapterId": "practice",
  "chapterTitle": "第11章 統合症例・再評価",
  "lectureTitle": "方法の候補と施術前の確認事項を比較する",
  "passingScore": 2,
  "questions": [
    {
      "id": "lecture-practice-7-q1",
      "question": "【介入候補の説明】架空の計画に経穴名だけが列挙されています。設計判断として補うものはどれですか？",
      "options": [
        "穴数が多ければ理由は省く",
        "同じ証の例があれば個別条件の確認を省く",
        "目的・選定理由・安全条件を添える"
      ],
      "correctIndex": 2,
      "explanation": "経穴名に加え、何を目標にしたか、どの伝統的な理由で候補にしたか、方法や刺激条件についてどの安全情報が必要かを説明します。Webで計画の理由を書けることは、実施技能や安全性の保証ではありません。",
      "relatedSectionTitle": "1. 介入設計の3つの階層"
    },
    {
      "id": "lecture-practice-7-q2",
      "question": "【胸背部の安全確認】肩井や背部の経穴で気胸などの損傷リスクを検討する際、最も適切な考え方はどれですか？",
      "options": [
        "同じ経穴の過去の反応を基準に、刺入の安全条件を判断する",
        "経穴の取穴位置を基準に、刺入の安全条件を判断する",
        "局所解剖・体格・体位を確認し、実施の保留も検討する"
      ],
      "correctIndex": 2,
      "explanation": "取穴位置の基準だけで刺入の安全条件は決まりません。局所の解剖・体格・体位などの個別評価が必要で、実施を保留する選択肢も含めます。出典欄のNCCIHは臓器損傷などのリスクを説明していますが、個別の安全深度を保証する資料ではありません。",
      "relatedSectionTitle": "出典と確認範囲"
    },
    {
      "id": "lecture-practice-7-q3",
      "question": "初回の計画を相談する際、安全性と本人の選択について必要なことはどれですか？",
      "options": [
        "個別の安全情報と同意を確認し、実施の保留も選択肢にする",
        "配穴の伝統的理由を説明し、それを初診の安全確認に代える",
        "小さい刺激から始める案を説明し、それを安全確認に代える"
      ],
      "correctIndex": 0,
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
      "question": "本人の理解を確かめるため、専門用語の説明後に続ける言葉として最も適切なのはどれですか？",
      "options": [
        "今の説明は分かりやすかったですね。この方法で進めますか",
        "今の分類名を、漢字で正しく書いていただけますか",
        "今の説明をどう受け止めましたか。気になる点はありますか"
      ],
      "correctIndex": 2,
      "explanation": "本人がどう理解したかを自分の言葉で話せる問いにすると、受け止め方や不安を確認できます。説明が伝わったと先に決めたり、用語の暗記を理解の代わりにしたりせず、選択のための対話につなげます。",
      "relatedSectionTitle": "2. 予後と不確実性の正直な伝達（リスクコミュニケーション）"
    },
    {
      "id": "lecture-practice-8-q3",
      "question": "本人が施術を受けるか選ぶために必要な説明と確認はどれですか？",
      "options": [
        "目的・限界・リスク・対応と理解を確認する",
        "署名を得れば説明内容の理解確認は終える",
        "予想する利点だけを伝えリスクは生じてから説明する"
      ],
      "correctIndex": 0,
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
      "question": "共通症例で診察室の頭痛NRSが7から3へ変わりました。直接比較した指標はどれですか？",
      "options": [
        "帰宅後のだるさの持続時間",
        "同じ座位で尋ねた頭痛の強さ",
        "夕方の仕事を続けられた時間"
      ],
      "correctIndex": 1,
      "explanation": "この時点で直接比べたのは、同じ座位で尋ねた頭痛の強さです。実際の仕事の継続時間と帰宅後の反応は、別の時点で記録します。どの指標のどの時間の変化かを明確にし、生活全体の改善へ広げて結論づけません。",
      "relatedSectionTitle": "2. 【共通模擬症例：第8段階 開示】"
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
      "question": "共通症例の「直後3、翌夕3、週後半5」というNRSの記録から、同じ比較表に置く情報として適切なのはどれですか？",
      "options": [
        "初回の配穴候補と、経穴の標準位置",
        "各時点の痛みと、同時期の作業・休息・服薬",
        "初回の証名と、その証名の一般的な定義"
      ],
      "correctIndex": 1,
      "explanation": "各時点の痛みに作業・休息・服薬などの条件を添えると、何がいつ変化したかを比較できます。証名や経穴の定義は、今回の反応の持続と生活背景を確認する情報の代わりにはなりません。",
      "relatedSectionTitle": "1. 経過分析の3つの視点：何が良く、何が戻ったか？"
    },
    {
      "id": "lecture-practice-10-q2",
      "question": "症状が不変だった、または悪化したという報告を受けた場合、再評価に必要なものはどれですか？",
      "options": [
        "分類の一貫性を優先し、同じ証に同じ計画を続けるか再検討する",
        "不変と悪化をまとめ、配穴の変更と刺激の追加を再検討する",
        "程度と経過を分け、安全性・仮説・介入・生活背景を再検討する"
      ],
      "correctIndex": 2,
      "explanation": "不変と悪化は分けて評価します。有害事象や病状変化、他の原因もあり得るため、反応を弁証や刺激量のずれだけで説明しません。",
      "relatedSectionTitle": "1. 経過分析の3つの視点：何が良く、何が戻ったか？"
    },
    {
      "id": "lecture-practice-10-q3",
      "question": "作業時間が約20分から30分へ延び、週後半の頭痛は残りました。この二つを、評価する対象で分けるとどれですか？",
      "options": [
        "作業時間：生活機能／頭痛：症状",
        "作業時間：症状／頭痛：生活機能",
        "作業時間：安全性／頭痛：通院負担"
      ],
      "correctIndex": 0,
      "explanation": "作業を続けられる時間は生活機能、頭痛の程度は症状の指標です。一方の変化だけで全体を成功・失敗とまとめず、両方の記録と本人の希望を踏まえて次の計画を相談します。",
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
      "question": "長期の再評価で「頭痛日数は減ったが、通院の時間が負担」と分かりました。既存の症状指標に加えるべき評価対象はどれですか？",
      "options": [
        "本人の負担と通院間隔の希望",
        "初回の舌の記述と同じ分類名",
        "これまでに使った経穴の総数"
      ],
      "correctIndex": 0,
      "explanation": "経過全体を管理するときは、症状だけでなく生活機能、負担、本人の希望も評価します。症状が減ったという情報だけで同じ頻度を続けず、間隔変更や終了も含めて相談する根拠になります。",
      "relatedSectionTitle": "1. 治療終了（卒業）への4フェーズ・ロードマップ"
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
      "question": "「直後は軽いが、二日後には戻る」という別の架空例です。七つのパターンのうち、直接該当するものはどれですか？",
      "options": [
        "情報が食い違い観察条件が不明",
        "初回改善したが持続しない",
        "初回から改善しない・悪化する"
      ],
      "correctIndex": 1,
      "explanation": "直後の軽減と二日後の戻りは、改善の持続を再評価するパターンです。最初から変化がない場合や観察条件の矛盾とは区別し、時間ごとの変化と生活背景を確認します。",
      "relatedSectionTitle": "1. 異なる判断が求められる7つの臨床パターン"
    },
    {
      "id": "lecture-practice-12-q3",
      "question": "振り返りメモ「新しい経過が初期の見方に合わず、仮説と計画を改めた」は、六つの観点のどれを直接示しますか？",
      "options": [
        "自己修正",
        "患者共有",
        "情報整理"
      ],
      "correctIndex": 0,
      "explanation": "新しい情報を受けて仮説と計画を改めるのは自己修正です。患者共有は説明・合意、情報整理は報告と推論の区別などを扱います。学習記録では、何を根拠にどの判断を変えたかを具体的に残します。",
      "relatedSectionTitle": "3. 自分で振り返る6つの観点"
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

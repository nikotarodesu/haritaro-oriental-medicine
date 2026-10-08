import { FOUNDATION_QUIZZES } from "./curriculumFoundationQuizzes";
import { CURRICULUM_CHAPTERS_META } from "./curriculumOutline";

// 全章の講義に対応する3択の理解度チェック。本文データをクライアントへ取り込まない。
// 各レッスン3問構成・完全3択（A, B, C）・合格ライン: 3問中2問以上正解でレッスンクリア！

export interface QuizQuestionItem {
  id: string;
  question: string;
  options: [string, string, string]; // 厳密に3択
  correctIndex: number;
  explanation: string;
  relatedSectionTitle?: string; // 関連する講義の見出し・トピック
}

export function getQuizSectionTitle(question: QuizQuestionItem): string {
  if (question.relatedSectionTitle) return question.relatedSectionTitle;
  const match = question.question.match(/【([^】]+)】/);
  return match ? match[1] : "";
}

export interface LessonQuizGroup {
  lectureId: string;
  chapterId: string;
  chapterTitle: string;
  lectureTitle: string;
  passingScore: number;
  questions: QuizQuestionItem[];
}

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
        "対になる性質を比較し、その関係や変化を捉える伝統的な説明モデルである",
        "事物を二者択一で静止的に固定し、一度定めた分類やラベルが不可逆的に不変であるとする思考形式である",
        "生体の動的変化ではなく、心理的な気の持ちようや精神状態の主観的訴えのみに限定した概念である"
      ],
      "correctIndex": 0,
      "explanation": "陰陽論は、動と静、熱と寒などの性質を比較する伝統的な説明モデルです。比較の基準が変われば分類も変わり、病気の原因を直接測定・診断する指標とは区別します。"
    },
    {
      "id": "lecture-yinyang-1-q2",
      "question": "【陰陽の基本性質】伝統的な陰陽配属の代表例として、最も適切な組み合わせはどれですか？",
      "options": [
        "陽＝「手足の冷え・骨格・蓄積・抑制」 ／ 陰＝「熱感・活動・拡散・興奮」",
        "陽＝「動・熱・外向・機能」 ／ 陰＝「静・寒・内向・物質」",
        "陽＝「あらゆる病態の悪化」 ／ 陰＝「あらゆる病気の自然治癒」"
      ],
      "correctIndex": 1,
      "explanation": "伝統的な分類では、陽は動・熱・外向・機能、陰は静・寒・内向・物質に関連づけられます。陰陽と虚実は同義ではなく、この配属から体温や神経活動を判定することはできません。"
    },
    {
      "id": "lecture-yinyang-1-q3",
      "question": "【自律神経との比較】陰陽と交感神経・副交感神経を比較するとき、最も適切な説明はどれですか？",
      "options": [
        "交感神経は必ず陽、副交感神経は必ず陰に対応し、両者は同じ概念である",
        "陰陽や虚実の分類をすれば、神経機能の検査なしに自律神経の異常を確定できる",
        "学習上の比喩として比較できるが、陰陽の分類から神経活動や病気の原因は確定できない"
      ],
      "correctIndex": 2,
      "explanation": "陰陽は伝統医学の分類で、自律神経は神経系の構造と機能に関する概念です。比喩と医学的な同一性を区別し、神経機能の評価は症状・診察・心拍や血圧などの検査に基づいて行います。"
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
      "question": "【陰陽の相対性】「水」を陰陽で分類する場合の理解として、最も適切なものはどれですか？",
      "options": [
        "「氷（固く冷たい）」と比較すると常温の水は「陽」になり、「湯気（気体で温かい）」と比較すると水は「陰」になる",
        "水は物質であるため、どんな場合でも絶対に「陰」であり分類が変わることはない",
        "水の温度や状態に関係なく、東洋医学では分類を行わないことになっている"
      ],
      "correctIndex": 0,
      "explanation": "陰陽は固定的な実体ではなく、常に比較対象との関係性（相対性）において定まります。"
    },
    {
      "id": "lecture-yinyang-2-q2",
      "question": "【陰陽の相対性と基準】東洋医学において「上半身は陽、下半身は陰」と分類されますが、上半身の中でも「背部」と「胸腹部」を比較した場合の正しい解釈はどれですか？",
      "options": [
        "上半身にあるものは部位によらず全て絶対的に「陽」であり、それ以上の細分化はできない",
        "上半身を陽とした区分の中で、背側を陽、胸腹側を陰とする伝統的な視点を用いれば「陽中の陽」「陽中の陰」と整理できる",
        "背部は常に冷えやすいため「絶対的な陰」、胸腹部は心臓があるため「絶対的な陽」となる"
      ],
      "correctIndex": 1,
      "explanation": "陰陽可分では、大きな区分の中を別の基準でさらに分けます。この設問は伝統的な部位の配属を学ぶ例であり、解剖学的な位置や病変をその分類で測定できるという意味ではありません。"
    },
    {
      "id": "lecture-yinyang-2-q3",
      "question": "【陰陽可分の原則】「昼（陽）の中にも、午前（陽中の陽）と午後（陽中の陰）がある」というように、陰陽の中にさらに陰陽が存在する性質を何と呼びますか？",
      "options": [
        "陰陽対立",
        "陰陽互根",
        "陰陽可分（いんようかぶん）"
      ],
      "correctIndex": 2,
      "explanation": "陰陽の中を、基準を変えてさらに分けることを「陰陽可分」と呼びます。昼夜の区分は伝統的な説明であり、その四区分がホルモン量や自律神経活動を表すわけではありません。"
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
      "options": [
        "偏りを抑える関係を考える比喩として比較できるが、同一の生理機構として扱わない",
        "陰と陽のどちらか一方を完全に消滅させ、活動または休息のどちらか一方だけに固定するため",
        "互いに一切干渉せず、完全に無関係な状態で独立して機能するため"
      ],
      "correctIndex": 0,
      "explanation": "陰陽制約は、互いの偏りを抑えるという伝統的な関係の説明です。フィードバックとの比較は理解を助けますが、測定や実験に基づく現代医学の機構と同一視しません。"
    },
    {
      "id": "lecture-yinyang-3-q2",
      "question": "【陰陽互根】「孤陰不生、独陽不長」という伝統的な説明の意味として、最も適切なものはどれですか？",
      "options": [
        "陰と陽は互いに関係がなく、どちらも完全に独立して成り立つ",
        "陰と陽は互いを存在の前提としており、切り離さずに考える",
        "一方を増やせば、もう一方を医学的な検査なしに必ず回復させられる"
      ],
      "correctIndex": 1,
      "explanation": "陰陽互根は、陰陽が互いを存在の前提とするという伝統的な考え方です。現代医学の生存条件や、特定の治療効果を保証する法則として扱うものではありません。"
    },
    {
      "id": "lecture-yinyang-3-q3",
      "question": "【医学的評価の優先】感染症に伴って意識の異常や息苦しさがある人への対応として、最も適切なものはどれですか？",
      "options": [
        "陰陽の分類だけで原因を確定し、受診が必要か決める",
        "陰陽転化の理解度を確かめてから、医学的な評価の必要性を考える",
        "重症疾患の可能性を考え、陰陽の分類よりも速やかな医学的評価・救急対応を優先する"
      ],
      "correctIndex": 2,
      "explanation": "感染症に伴う意識の異常や息苦しさは、敗血症などでもみられます。陰陽だけで原因や重症度を確定することはできないため、速やかな医学的評価を優先し、鍼灸施術などで救急対応を遅らせてはいけません。"
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
        "陰陽消長（しょうちょう）",
        "陰陽固定",
        "陰陽消滅"
      ],
      "correctIndex": 0,
      "explanation": "陰陽消長は、陰と陽が関係しながら増減することを捉える伝統的な概念です。昼夜はその学習例であり、特定の神経活動やホルモン量を測定しているわけではありません。"
    },
    {
      "id": "lecture-yinyang-4-q2",
      "question": "【陰陽転化と医学的評価】発熱後に意識の異常や息苦しさが生じた場合の対応として、最も適切なものはどれですか？",
      "options": [
        "陰陽転化だけで原因が説明できるので、医学的な評価は不要である",
        "陰陽転化という分類だけでは原因や重症度を確定できず、速やかな医学的評価・救急対応を優先する",
        "陰陽転化が起きる時間を計算すれば、救急対応の必要性を正確に予測できる"
      ],
      "correctIndex": 1,
      "explanation": "感染症に伴う意識の異常や息苦しさなどは、速やかな医学的評価が必要です。「熱極生寒」などの伝統的な説明から、敗血症やショックの有無は確定できません。"
    },
    {
      "id": "lecture-yinyang-4-q3",
      "question": "【臨床での変化の捉え方】患者の病態変化を観察する上で、臨床家が最も心掛けるべき視点はどれですか？",
      "options": [
        "初診時の一瞬の所見だけを信じ込み、その後の時間推移や日内変動は考慮しないこと",
        "患者の訴えの変化をすべて無視し、常に同一のツボだけを使い続けること",
        "症状の経過と意識・呼吸などの異常を確認し、医学的な評価や受診の必要性を検討すること"
      ],
      "correctIndex": 2,
      "explanation": "症状の経過を記録し、原因や緊急性を確認することが大切です。陰陽の消長・転化は伝統的な学習概念であり、それだけで予後や治療効果を予測できるものではありません。"
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
        "上半身・背部・体表が「陽」 ／ 下半身・胸腹部・体内深部が「陰」",
        "下半身・胸腹部が「陽」 ／ 上半身・背部が「陰」",
        "内臓の深部が「陽」 ／ 外側の皮膚が「陰」"
      ],
      "correctIndex": 0,
      "explanation": "伝統的な配属では、上下・背腹・表裏といった比較の視点を示します。この分類から神経や血管の位置・働き、安全な施術部位を判断することはできません。"
    },
    {
      "id": "lecture-yinyang-5-q2",
      "question": "【蔵象の陰陽】五臓（肝・心・脾・肺・腎）と六腑（胆・小腸・胃・大腸・膀胱・三焦）の伝統的な役割の説明として、正しいものはどれですか？",
      "options": [
  "五臓は「陽」で通す・伝化する側面、六腑は「陰」で蔵する側面に関連づける",
  "五臓は「陰」で蔵する側面、六腑は「陽」で通す・伝化する側面に関連づける",
  "五臓は「陰」で通す・伝化する側面、六腑は「陽」で蔵する側面に関連づける"
],
      "correctIndex": 1,
      "explanation": "蔵象の配属を学ぶ際には、「蔵する」と「通す」という伝統的な役割を区別します。三焦なども含むため、現代解剖学の臓器の構造や機能と一対一に同一視しません。"
    },
    {
      "id": "lecture-yinyang-5-q3",
      "question": "【現代生理学との比較】身体の陰陽配属と自律神経・炎症の評価を比較するとき、最も適切な理解はどれですか？",
      "options": [
        "交感神経は常に陽、副交感神経は常に陰であり、同じ概念として扱える",
        "実熱と分類すれば、炎症性サイトカインやCRPの量を検査なしに確定できる",
        "陰陽は伝統的な分類であり、神経機能や炎症の評価は症状・診察・必要な検査に基づいて行う"
      ],
      "correctIndex": 2,
      "explanation": "伝統分類から神経活動や検査値は判定できません。実熱と炎症、実寒と血管攣縮などの固定的な対応も避け、医学的な原因の評価を別に行います。"
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
        "陰平陽秘（いんぺいようひ）",
        "重陽必陰（ちょうようひついん）",
        "熱極生寒（ねつきょくせいかん）"
      ],
      "correctIndex": 0,
      "explanation": "「陰平陽秘」は、伝統医学で陰陽の調和を表す言葉です。この概念だけで現代医学の健康状態や病気の原因を判定できるという意味ではありません。"
    },
    {
      "id": "lecture-yinyang-6-q2",
      "question": "【陰虚と陽虚】伝統理論の学習例として、陰虚と陽虚に関連づける所見の組み合わせはどれですか？",
      "options": [
        "陰虚は激しい高熱と便秘を伴い、陽虚は常に鼻血が出続ける",
        "陰虚は「ほてり・寝汗・乾燥・細く速い脈」、陽虚は「冷え・疲労感・弱い脈」などに関連づける",
        "陰虚も陽虚も完全に同じ状態であり、四診で見分けることは不可能"
      ],
      "correctIndex": 1,
      "explanation": "これは伝統分類の代表的な学習例です。列挙した症状だけでは診断は確定できず、陽虚を甲状腺・副腎機能低下、陰虚を脱水と同一視することもできません。"
    },
    {
      "id": "lecture-yinyang-6-q3",
      "question": "【薬や対処の判断】陰陽の分類や「水と火」のモデルと、実際の薬の使用・中止との関係で正しいものはどれですか？",
      "options": [
        "陰虚と分類すれば、全ての抗生剤や解熱剤が必ず病態を悪化させると判断できる",
        "水と火のモデルだけで、処方薬の中止や体温への対処を決められる",
        "薬や体温への対処は、病気の原因・医学的な適応・医師や薬剤師の指示などに基づいて判断する"
      ],
      "correctIndex": 2,
      "explanation": "水と火は伝統概念を整理する比喩です。「陰虚だから薬で悪化する」「冷やしてはいけない」と一律に判断せず、陰陽の分類を理由に処方薬を自己判断で中止しないようにします。"
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
        "起こった時期や他の所見も確認し、伝統的な分類と医学的な原因の評価を分けて考える",
        "顔が赤ければ必ず実熱であり、他の情報は確認しなくてよい",
        "舌や脈の所見を加えれば、病気の原因と治療効果を必ず確定できる"
      ],
      "correctIndex": 0,
      "explanation": "所見はまず観察した事実として記録します。四診で情報を増やすことは大切ですが、陰陽・寒熱・虚実の分類だけで病気の原因や治療効果が確定するわけではありません。"
    },
    {
      "id": "lecture-yinyang-7-q2",
      "question": "【病位の分類と刺鍼の安全性】伝統理論の表・裏や浅部・深部の分類と、実際の刺鍼の関係として正しいものはどれですか？",
      "options": [
        "裏や深部に分類した症状なら、誰に対しても深い刺入が安全である",
        "分類から一律の深度は導けず、専門家が局所解剖・体格・全身状態などを確認する",
        "慢性症状であれば、施術部位の解剖や体格を確認する必要はない"
      ],
      "correctIndex": 1,
      "explanation": "伝統的な病位は、実際の病変の位置や安全な刺入深度を測定するものではありません。臓器・神経損傷を防ぐための解剖学的な確認や、個々の条件を踏まえた専門的な判断が必要です。"
    },
    {
      "id": "lecture-yinyang-7-q3",
      "question": "【標・本の考え方と対応の優先順位】強い呼吸困難や意識の異常がある場合、最初に優先することはどれですか？",
      "options": [
        "陰陽の分類と補瀉の方針が決まるまで、医療への連絡を待つ",
        "慢性症状のある人なら緊急性はないと考える",
        "医療への連絡・救急対応を優先し、緊急時は119番へ連絡する"
      ],
      "correctIndex": 2,
      "explanation": "標・本は伝統理論の整理方法であり、救急対応を置き換えません。呼吸や意識の異常などでは、伝統的な分類や補瀉の判断を理由に医療への連絡を遅らせないことが大切です。"
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
      "options": [
        "対になる性質やその関係・変化を整理し、観察・解釈・未確認の事項を区別する",
        "症状を二つに分類すれば、神経活動やホルモン量を正確に測定できる",
        "伝統的な分類だけで、すべての症状に最適な治療を確定する"
      ],
      "correctIndex": 0,
      "explanation": "陰陽論は伝統的な説明モデルです。分類・関係・変化の見方で情報を整理しますが、それだけで医学的な原因や検査値、治療効果が判定できるわけではありません。"
    },
    {
      "id": "lecture-yinyang-8-q2",
      "question": "【医療との併用を考える】施術や薬の使用後に症状が悪化したとき、最も適切な考え方はどれですか？",
      "options": [
        "効果が出た合図と決めつけ、自己判断で刺激や薬を増やす",
        "陰陽だけで原因を決めず、有害事象なども含めて医療者に相談し、緊急性があれば救急対応を優先する",
        "慢性症状の治療中なら、症状の変化を医療者に伝える必要はない"
      ],
      "correctIndex": 1,
      "explanation": "症状悪化を陰陽の変化や効果の合図と決めつけません。受けた施術や使用した薬を伝え、必要な医学的評価につなげます。強い呼吸困難や意識の異常などがあれば、救急対応が優先です。"
    },
    {
      "id": "lecture-yinyang-8-q3",
      "question": "【3. 気血津液論への接続】陰陽論の次に気血津液論を学ぶ目的として適切なのはどれですか？",
      "options": [
        "陰陽の分類から血液検査の値を判定する",
        "気を陽の物質と定義して治療を決める",
        "性質の比較に続いて、働き・滋養・潤いの基本役割を学ぶ"
      ],
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
        "臓腑の役割を初めて学び、同時に病名を確定する",
        "先に学んだ名称と役割を五行の配当と関係で整理する",
        "臓腑の用語を現代の臓器と完全に同じに定義する"
      ],
      "correctIndex": 1,
      "explanation": "臓腑・生命機能を先に学び、五行を整理の視点として用います。用語が曖昧なら前の章を確認します。",
      "relatedSectionTitle": "第2節：陰陽・臓腑との学習上の関係"
    },
    {
      "id": "lecture-wuxing-1-q3",
      "question": "【第3節：分類モデルの説明範囲】五行を回路やフィードバックに例える場合、適切なのはどれですか？",
      "options": [
        "五行が恒常性の機序そのものと証明されたと扱う",
        "矢印から臓器の病気や治療効果を直接確定する",
        "学習補助の比喩として示し、医学的な機序の根拠と区別する"
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
        "木・曲直、火・炎上、土・稼穡、金・従革、水・潤下",
        "木・潤下、火・従革、土・曲直、金・炎上、水・稼穡",
        "五行の性質はすべて同じ意味で、名称だけが違う"
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
        "炎上から心臓の機序がすべて説明できる",
        "身体感覚だけで五行の失調と治法を決められる",
        "分類の性質を説明できるが、身体の機序や病態には別の根拠が必要である"
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
        "木も火も常に母で、関係によって変わらない"
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
        "相乗は相剋の逆向き、相侮は相生と同じ向きである",
        "二つの症状があれば、どちらの病態か自動的に確定できる",
        "相乗は相剋と同じ向きの過度な制約、相侮は相剋と逆向きの制約を説明する"
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
        "木・肝、火・心、土・脾、金・肺、水・腎",
        "木・肺、火・腎、土・心、金・肝、水・脾",
        "五行と五臓は配当されず、季節だけを分類する"
      ],
      "correctIndex": 0,
      "explanation": "この表は、臓腑論で学んだ名称と役割を五行の配当で整理するものです。",
      "relatedSectionTitle": "第1節：五行と五臓の対応"
    },
    {
      "id": "lecture-wuxing-4-q2",
      "question": "【第2節：分類・役割・関係を分ける】このレッスンの目的として適切なのはどれですか？",
      "options": [
        "五行の性質から臓器の生理機構を証明する",
        "既習の五臓の役割を配当表に整理し、分類と関係を分ける",
        "配当表だけで患者の治療法を決める"
      ],
      "correctIndex": 1,
      "explanation": "臓腑論・生命機能論を前提として整理します。配当から生理機構や効果を直接導くものではありません。",
      "relatedSectionTitle": "第2節：分類・役割・関係を分ける"
    },
    {
      "id": "lecture-wuxing-4-q3",
      "question": "【第3節：現代解剖学と区別する】伝統的な「脾の運化」を読むとき、適切なのはどれですか？",
      "options": [
        "現代医学の脾臓の機能と完全に同じとする",
        "配当が同じなら検査値の異常を判定できるとする",
        "伝統的な役割として学び、現代解剖学の同名臓器と区別する"
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
        "二つが揃えば肝臓病が確定する",
        "本人の訴えと伝統的な分類を別に記録する",
        "目の配当だけで症状の経過の確認を省略する"
      ],
      "correctIndex": 1,
      "explanation": "観察・記載された情報と配当は別です。この二つだけで医学的な原因や証は確定できません。",
      "relatedSectionTitle": "第2節：観察した事実と配当を分ける"
    },
    {
      "id": "lecture-wuxing-5-q3",
      "question": "【第3節：診察への応用は後の章で学ぶ】この段階で判断を保留すべきものはどれですか？",
      "options": [
        "表にある部位の名称",
        "伝統的な五官の配当",
        "症状の原因、証や治法、必要な経穴"
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
        "魂という物質の所在を解剖学的に証明している",
        "精神活動と五臓を関係づける伝統的な表現として読む",
        "肝機能検査から創造力の値を決められる"
      ],
      "correctIndex": 1,
      "explanation": "伝統的な配当は精神機能の測定や物質の所在の証明ではありません。",
      "relatedSectionTitle": "第2節：配当を機能の測定へ置き換えない"
    },
    {
      "id": "lecture-wuxing-6-q3",
      "question": "【第3節：正常な感情と病態の説明を分ける】怒りがあったという記載を扱うとき、適切なのはどれですか？",
      "options": [
        "怒りだけで肝臓病を診断する",
        "怒りから本人の性格や必要な処方を確定する",
        "感情の記載と分類の仮説を分け、原因や病態の判断を保留する"
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
        "春は木なので、春の症状は必ず肝の病気である",
        "配当と、個人の症状の医学的な原因・予測を区別する",
        "五行の表に当てはまれば生活記録や評価は不要である"
      ],
      "correctIndex": 1,
      "explanation": "配当が一致しても医学的な因果関係が確定したことにはなりません。長夏や土用の説明にも教材による違いがあります。",
      "relatedSectionTitle": "第2節：対応と予測を分ける"
    },
    {
      "id": "lecture-wuxing-7-q3",
      "question": "【第3節：五味の配当と食品の治療を分ける】五味の対応表から判断できる範囲はどれですか？",
      "options": [
        "対応する臓器を治す食品と必要量を確定する",
        "相剋の相手を傷める食品を決めて制限する",
        "味の伝統的な分類を説明し、個別の食品の効果や量は別に評価する"
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
        "土から金へ向かう相生の関係を学んだこと",
        "胃腸の病気がすべて呼吸器の病気を起こすと証明されたこと",
        "脾への介入で必ず肺の病気が治ること"
      ],
      "correctIndex": 0,
      "explanation": "相生の向きが関係の説明の根拠です。現実の病因や介入の効果を確認した根拠とは別です。",
      "relatedSectionTitle": "第1節：分類と関係を説明する"
    },
    {
      "id": "lecture-wuxing-8-q2",
      "question": "【第2節：架空例で根拠と保留を分ける】忙しさと食後のもたれだけが記載された架空例で適切なのはどれですか？",
      "options": [
        "直ちに木乗土と確定し経穴を選ぶ",
        "記載された訴え、伝統的な説明、不足情報と保留する判断を分ける",
        "時間的な前後関係があれば医学的な原因も確定する"
      ],
      "correctIndex": 1,
      "explanation": "短い例だけでは原因・証・治法を確定できません。どの記載を根拠にしたかを示し、不足情報を分けます。",
      "relatedSectionTitle": "第2節：架空例で根拠と保留を分ける"
    },
    {
      "id": "lecture-wuxing-8-q3",
      "question": "【第3節：次章「経絡・経穴の基礎」への接続】次章で学ぶ内容として適切なのはどれですか？",
      "options": [
        "五行だけで自己施術の処方を作る",
        "まだ学んでいない気血津液の基本役割を初めて学ぶ",
        "経絡の構成と経穴の名称・番号、安全な学習範囲を確認する"
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
        "血の滋養のみ",
        "津と液の性質の区分のみ"
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
      "question": "【第3節：詳細を学ぶ順番】生成・営衛・三焦の詳細を学ぶ順番として適切なのはどれですか？",
      "options": [
        "基本用語を学ぶ前に治療経穴を選ぶ",
        "気をATPとして定義すれば詳細の学習は不要になる",
        "臓腑の名称と役割を学び、生命機能論で連携を整理する"
      ],
      "correctIndex": 2,
      "explanation": "この章は基本役割が中心です。臓腑論を前提に生命機能論で生成や連携を深め、失調は病機論で扱います。",
      "relatedSectionTitle": "第3節：詳細を学ぶ順番"
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
      "options": [
        "身体を養い、潤す",
        "体液を津と液に分類するだけのもの",
        "赤血球数と同じ数値で表すもの"
      ],
      "correctIndex": 0,
      "explanation": "血は滋養・滋潤という役割から学びます。赤血球などの定義や検査値と一対一には対応しません。",
      "relatedSectionTitle": "第1節：滋養・滋潤という役割"
    },
    {
      "id": "lecture-qiblood-2-q2",
      "question": "【第2節：血と精神活動の伝統的な関係】血と精神活動の関係を読むとき、適切なのはどれですか？",
      "options": [
        "精神疾患の原因が血の不足だと確定する",
        "伝統的な関係の説明と、神経伝達物質や医学的な評価を区別する",
        "血液検査だけで心神の状態を分類する"
      ],
      "correctIndex": 1,
      "explanation": "伝統的な血と心神の関係は、精神症状の原因や生理機構の証明ではありません。",
      "relatedSectionTitle": "第2節：血と精神活動の伝統的な関係"
    },
    {
      "id": "lecture-qiblood-2-q3",
      "question": "【第3節：生成と病態は後の章で学ぶ】血の生成と病態の位置づけとして適切なのはどれですか？",
      "options": [
        "血虚は貧血と同じ診断名なのでこの章で治療を決める",
        "瘀血は血栓を意味するので検査の確認は不要になる",
        "生成の連携は臓腑・生命機能の章、失調は病機論で学ぶ"
      ],
      "correctIndex": 2,
      "explanation": "まず正常な役割を学びます。血虚や瘀血は伝統分類で、貧血や血栓と同義ではありません。",
      "relatedSectionTitle": "第3節：生成と病態は後の章で学ぶ"
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
        "津は比較的さらさらし、液は比較的濃厚で深部を潤すと説明する",
        "津は細胞内液、液は細胞外液の正式な医学用語である",
        "津と液は飲んだ水の温度だけで区分される"
      ],
      "correctIndex": 0,
      "explanation": "津と液は性質と役割の伝統的な対比です。現代医学の体液区分と一対一には対応しません。",
      "relatedSectionTitle": "第1節：津と液の区分"
    },
    {
      "id": "lecture-qiblood-3-q2",
      "question": "【第2節：潤いと正常な巡り】津液の生成・散布・排泄の詳しい臓腑連携を学ぶ位置づけとして適切なのはどれですか？",
      "options": [
        "津と液を覚えれば臓腑の役割の学習は不要である",
        "臓腑論で名称と役割を学んだ後、生命機能論で連携を整理する",
        "この章で自己判断の利尿薬調整まで習得する"
      ],
      "correctIndex": 1,
      "explanation": "このレッスンは潤いと正常な巡りの概観です。臓腑・三焦などの詳細は後の生命機能論で扱います。",
      "relatedSectionTitle": "第2節：潤いと正常な巡り"
    },
    {
      "id": "lecture-qiblood-3-q3",
      "question": "【第3節：水分量の評価と分ける】口の乾きが記載された学習例で、適切な理解はどれですか？",
      "options": [
        "津液の分類から体液量の検査値が分かる",
        "五行や津液の表だけで飲水量を決められる",
        "訴えを記録し、体液量や原因の医学的な評価と区別する"
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
        "血が気を養い、支えるという伝統的な関係",
        "血が気という物質を生理学的に製造する工程",
        "母から子への遺伝だけを示す用語"
      ],
      "correctIndex": 0,
      "explanation": "血為気之母は気と血の関係の説明です。「母」は支える役割の表現で、製造工程を実測した結果ではありません。",
      "relatedSectionTitle": "第1節：気と血の関係"
    },
    {
      "id": "lecture-qiblood-4-q2",
      "question": "【第2節：気と津液・血と津液の関係】「津血同源」の読み方として適切なのはどれですか？",
      "options": [
        "津液が必ずそのまま赤血球へ変わることを示す",
        "血と津液の由来や役割を関連づける伝統的な説明として読む",
        "細胞内液と血漿が完全に同じ成分だと定義する"
      ],
      "correctIndex": 1,
      "explanation": "津血同源は伝統的な由来と関係の説明です。造血や代謝の解剖生理学的工程と同一視しません。",
      "relatedSectionTitle": "第2節：気と津液・血と津液の関係"
    },
    {
      "id": "lecture-qiblood-4-q3",
      "question": "【第3節：関係の説明と医学的な機序を分ける】伝統的な関係図の矢印から言える範囲はどれですか？",
      "options": [
        "すべての病気の因果関係が測定されている",
        "用語集にある関係なら治療効果も保証される",
        "モデルの関係を説明できるが、医学的な因果や効果には別の根拠が必要である"
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
      "options": [
        "本人が温かく感じたと述べたこと",
        "測定した体温が上昇していたこと",
        "気・血・津液がすべて正常と診断されたこと"
      ],
      "correctIndex": 0,
      "explanation": "本人の訴えが記載されています。実測値や診断結果は示されていません。記載された事実と推測を分けます。",
      "relatedSectionTitle": "第1節：架空例の情報を三つに分ける"
    },
    {
      "id": "lecture-qiblood-5-q2",
      "question": "【第2節：一つの判断とその根拠】この架空例から最も適切に言えることはどれですか？",
      "options": [
        "気の量が十分であると判定できる",
        "温める役割を、気の温煦という用語に関連づけて説明できる",
        "散歩をしたので治療は不要だと確定できる"
      ],
      "correctIndex": 1,
      "explanation": "温煦が身体を温める役割を表すことが根拠です。用語を理解したことと身体の状態を診断したことは別です。",
      "relatedSectionTitle": "第2節：一つの判断とその根拠"
    },
    {
      "id": "lecture-qiblood-5-q3",
      "question": "【第3節：次章「臓腑論」への接続】この章から次の臓腑論へ進む目的として適切なのはどれですか？",
      "options": [
        "架空例で決めた治療経穴を臨床へ応用する",
        "情報のない血や津液は働いていないと決める",
        "既習の働きに関連づけられる臓腑の名称と基本役割を学ぶ"
      ],
      "correctIndex": 2,
      "explanation": "次は臓腑の名称と役割を学びます。情報がないことと働きがないことを区別し、診断や治法の選択は先取りしません。",
      "relatedSectionTitle": "第3節：次章「臓腑論」への接続"
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
        "病機論・診断論・治療戦略論",
        "経絡・経穴の基礎・臨床実践論"
      ],
      "correctIndex": 0,
      "explanation": "新しい順序では、基本用語と臓腑の役割の後に正常な連携を学びます。五行の整理は次章で扱います。",
      "relatedSectionTitle": "第1節：既習の基本と正常な連携"
    },
    {
      "id": "lecture-lifedynamics-1-q2",
      "question": "【第2節：四つの概念と、それが答える問い】営衛・三焦・昇降出入を学ぶときの視点として適切なのはどれですか？",
      "options": [
        "三つとも同じ解剖学的な物質の名称である",
        "分担・領域・方向など、異なる問いから伝統的な説明を整理する",
        "三つを覚えれば症状の原因は確定できる"
      ],
      "correctIndex": 1,
      "explanation": "着目する役割・領域・方向を分けて学びます。現代の物質や機構と同一視しません。",
      "relatedSectionTitle": "第2節：四つの概念と、それが答える問い"
    },
    {
      "id": "lecture-lifedynamics-1-q3",
      "question": "【第3節：隣接する章との役割分担】この章と後の章の役割分担として適切なのはどれですか？",
      "options": [
        "この章で病名と治療経穴を確定する",
        "五行を学んだ前提で正常な連携を省略する",
        "正常な連携を学び、次の五行で整理し、病態・診断・治療は後の章で学ぶ"
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
    "先天の精：生来の要素 ／ 後天の精：飲食などによる養い",
    "先天の精：飲食などによる養い ／ 後天の精：生来の要素",
    "先天の精：今の食事から得る養い ／ 後天の精：将来の生来の要素"
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
    "疲労が先なので、精の枯渇が集中低下の原因と確認できた",
    "集中低下があるので、五神の表から病名まで決められた",
    "二つの訴えを記録し、関係の説明候補と未確認の原因を分ける"
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
    "胃：受納・腐熟 ／ 脾：運化・昇清 ／ 肺：清気を取り込む",
    "胃：運化・昇清 ／ 脾：清気を取り込む ／ 肺：受納・腐熟",
    "胃：清気を取り込む ／ 脾：受納・腐熟 ／ 肺：運化・昇清"
  ],
  "correctIndex": 0,
  "explanation": "胃の受納・腐熟、脾の運化・昇清、肺の呼吸を区別します。これらを関連づけるのは伝統的な役割の説明で、実際の消化吸収や代謝の全機序を示すものではありません。",
  "relatedSectionTitle": "第1節：脾胃による「水穀の精気」生成ライン"
},
    {
  "id": "lecture-lifedynamics-3-q2",
  "question": "【宗気の生成モデル】胸中の宗気を説明するとき、本講で組み合わせる二つはどれですか？",
  "options": [
    "自然の清気と体外へ出す濁気",
    "水穀の精微と自然の清気",
    "体外へ出す濁気と飲食物の残渣"
  ],
  "correctIndex": 1,
  "explanation": "宗気は水穀の精微と自然の清気から説明する伝統的な生成モデルです。胸中・呼吸・血行と関連づけますが、ATPの産生反応や測定された物質の合成式にはしません。",
  "relatedSectionTitle": "第3節：宗気（そうき）の形成 ― 拍動と呼吸のエンジン"
},
    {
  "id": "lecture-lifedynamics-3-q3",
  "question": "【役割と原因】「食欲が落ち、階段で息切れもする」という架空の記録から、宗気について言える範囲はどれですか？",
  "options": [
    "両方の訴えがあるので、宗気の量が減ったと測定できる",
    "両方の訴えがあるので、胃腸が息切れの原因と確認できる",
    "飲食と呼吸の関係を考える材料になるが、量や原因は未確認"
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
    "臓腑の滋養と血の生成",
    "防御・温煦・腠理の開閉",
    "胃の受納と脾の昇清"
  ],
  "correctIndex": 1,
  "explanation": "営気は滋養・血の生成、衛気は防御・温煦・腠理の開閉に関連づけます。胃の受納と脾の昇清は別の役割です。衛気の防御を免疫検査の値や感染予防の保証として扱いません。",
  "relatedSectionTitle": "第2節：衛気（えき） ― 脈外を疾走する最前線シールド"
},
    {
  "id": "lecture-lifedynamics-4-q3",
  "question": "【古典の運行モデル】営衛の「一日五十周」を読む際に、最も適切な説明はどれですか？",
  "options": [
    "古典の周数を、そのまま実測された血流の回数として読む",
    "古典の周数を、そのまま睡眠の深さを計算する指標として読む",
    "古典の周数を、営衛の運行を説明するモデルとして読む"
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
    "上焦：横隔膜より上 ／ 中焦：横隔膜と臍の間 ／ 下焦：臍より下",
    "上焦：横隔膜より上 ／ 中焦：臍より下 ／ 下焦：横隔膜と臍の間",
    "上焦：横隔膜と臍の間 ／ 中焦：横隔膜より上 ／ 下焦：臍より下"
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
    "水液に関係するという似た説明があれば、同じ組織と確認できる",
    "三つの領域を図で示せれば、浮腫の原因と治療効果を確認できる",
    "伝統モデルと研究の対象・測定結果を分け、同一性を未確認とする"
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
        "貯蔵や伝導・排泄という役割の伝統的な説明として整理する",
        "臓は物質を全く出さず、腑は何も保持しないと解剖学的に定義する",
        "臓腑の配当だけで代謝の検査値を判定する"
      ],
      "correctIndex": 0,
      "explanation": "陰の臓・陽の腑は役割を対比する伝統モデルです。物質の出入りを全くしないという臓器の定義には置き換えません。",
      "relatedSectionTitle": "第1節：臓と腑の根本的な性格の違い"
    },
    {
      "id": "lecture-lifedynamics-6-q2",
      "question": "【第2節：六対の表裏関係と伝統的な連携】肺と大腸の表裏の配当から言える範囲はどれですか？",
      "options": [
        "便秘を解消すれば喘息が即座に治ると保証できる",
        "伝統的な関係を説明できるが、症状の因果や治療効果には別の根拠が必要である",
        "肺の気が腸を物理的に押していると測定されたことが分かる"
      ],
      "correctIndex": 1,
      "explanation": "表裏の配当と医学的な臓器間の機序を同一視しません。必要な医療評価を分類や自己判断の処置で置き換えません。",
      "relatedSectionTitle": "第2節：六対の表裏関係と伝統的な連携"
    },
    {
      "id": "lecture-lifedynamics-6-q3",
      "question": "【第2節：六対の表裏関係と伝統的な連携】脾の昇清と胃の降濁の学習上の説明として適切なのはどれですか？",
      "options": [
        "二つが同じ方向を表すという説明である",
        "関係が説明できれば消化の医学的機序もすべて証明される",
        "上へ・下へという役割の対比として整理し、生理機構の測定と分ける"
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
    "昇：上へ ／ 降：下へ ／ 出：外へ ／ 入：内へ",
    "昇：外へ ／ 降：内へ ／ 出：上へ ／ 入：下へ",
    "昇：上へ ／ 降：下へ ／ 出：内へ ／ 入：外へ"
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
    "吐き気は上向きなので、胃薬が悪化させると判断する",
    "吐き気は上向きなので、原因を胃の降濁だけに確定する",
    "方向の説明候補を考え、経過・原因・薬の適応は別に確認する"
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
    "子時の睡眠が腎精修復に必要な時間だと確認できる",
    "伝統的な運行を学べるが、修復時間や睡眠の機序は確認できない",
    "周数から睡眠の深さや翌日の免疫機能を計算できる"
  ],
  "correctIndex": 1,
  "explanation": "時刻表は伝統的な関係を学ぶ資料です。特定時間の睡眠が腎精修復に不可欠という根拠にはならず、周数も実測された循環回数ではありません。",
  "relatedSectionTitle": "⚠️ 判断の注意点：睡眠の記録と治療の判断を分ける"
},
    {
  "id": "lecture-lifedynamics-8-q3",
  "question": "【睡眠の記録】架空の学習で「眠りにくさの変化と日中の困りごと」を比較したいとき、最も目的に合う記録はどれですか？",
  "options": [
    "就床時刻と睡眠時間を記録し、日中の困りごとは書かない",
    "日中の困りごとを記録し、就床・入眠・起床の時刻は書かない",
    "就床・入眠・起床の時刻と日中の困りごとを、日付ごとに記録する"
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
  "options": [
    "梅雨という季節名から、脾が麻痺したことを確認できた",
    "重さは記録された訴えで、湿との関係は候補として追加情報を確認する",
    "同じ週に出たので、湿度が重さの原因だと確認できた"
  ],
  "correctIndex": 1,
  "explanation": "同じ季節や週に現れたことだけでは因果は確認されません。実際の室温・湿度、屋内外の仕事、睡眠、他の症状などを分けて確認します。湿との関係は伝統的な説明候補です。",
  "relatedSectionTitle": "第2節：季節病のメカニズム ― 「同調のタイムラグ」"
},
    {
  "id": "lecture-lifedynamics-9-q3",
  "question": "【地域・生活の違い】同じ冬に、屋外で働く人と暖房のある室内で働く人を比較する学習で、適切な進め方はどれですか？",
  "options": [
    "冬という暦が同じなので、二人には同じ食品と起床時刻を指定する",
    "冬の蔵という表現だけで、二人の身体の深部の状態を確認する",
    "実際の環境・仕事・生活記録を確認し、季節名だけで一律に指示しない"
  ],
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
    "休息の前後で汗が変化したと記録できるが、病気の有無はこれだけでは決まらない",
    "休息で汗が減ったので、正気が十分で病気はないと確認できる",
    "運動後に汗が出たので、営衛不和という病機を確認できる"
  ],
  "correctIndex": 0,
  "explanation": "確認できたのは経過の変化です。可逆性や刺激との関係は確認する観点ですが、正常・異常を決める診断条件ではありません。",
  "relatedSectionTitle": "第2節：生理的代償と病理的失調を分ける3大基準"
},
    {
  "id": "lecture-lifedynamics-10-q2",
  "question": "【検査結果と原因】「検査で異常がないと言われたが、疲れは続く」という架空の記録について、適切な理解はどれですか？",
  "options": [
    "検査で異常がなかったので、続く疲れの訴えは確認しなくてよい",
    "検査結果と訴えを分け、経過や必要な医学的評価を確認する",
    "検査で異常がなかったので、四診で機能的な病気が証明された"
  ],
  "correctIndex": 1,
  "explanation": "検査に異常がなかったことと、疲れの原因や伝統的な失調が確認されたことは違います。訴えの持続や生活への影響などを記録し、医学的な評価と伝統的な説明候補を分けます。",
  "relatedSectionTitle": "📘 詳しく学ぶ：『素問』調経論が説く「虚実の真髄」"
},
    {
  "id": "lecture-lifedynamics-10-q3",
  "question": "【正邪・虚実と薬】発熱の記録を伝統用語で整理するとき、適切な判断はどれですか？",
  "options": [
    "正気と邪気の分類だけで、解熱剤が慢性化を起こすと確認する",
    "虚実の分類だけで、処方薬を中止する適応が確認できる",
    "分類は説明候補とし、症状の経過・薬の適応・医療者の指示を確認する"
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
    "輸布や運化などの異なる役割を、伝統モデルの中で関連づける",
    "三つを同じ臓器の別名とし、いずれか一つだけを説明する",
    "三つの配当から、実際の臓器が病気を代わりに補うと確定する"
  ],
  "correctIndex": 0,
  "explanation": "津液の役割は肺・脾・腎や三焦などに関連づけて整理します。多重サポートは関係を覚える比喩で、解剖学的な臓器の同一性や病気の代償を保証するものではありません。",
  "relatedSectionTitle": "第2節：多重サポート構造（冗長性）の神秘"
},
    {
  "id": "lecture-lifedynamics-11-q2",
  "question": "【観察と因果】架空の記録に「仕事のストレスが増え、眠りにくくなった」とあるとき、適切な学習メモはどれですか？",
  "options": [
    "ストレスの後なので、脾虚から造血障害が起きたと確認できた",
    "二つの記録を分け、関係の候補を支持する情報・合わない情報・不明点を比べる",
    "眠りにくいので、心・肝・脾の連鎖と治療方針が確認できた"
  ],
  "correctIndex": 1,
  "explanation": "同時期や前後の関係だけでは、ストレス→脾虚→血虚→不眠の因果は確認できません。血虚は貧血や造血障害の同義語ではなく、この章のモデルだけで治療設計へ進めません。",
  "relatedSectionTitle": "⚠️ 判断の注意点：「原因臓器」を一つに特定しようと焦らない"
},
    {
  "id": "lecture-lifedynamics-11-q3",
  "question": "【比喩と実証】伝統モデルをネットワーク医学と比較するとき、実証を判断するために必要なのはどれですか？",
  "options": [
    "どちらもネットワークという言葉を使うことを、同一機序の根拠にする",
    "古典に臓腑の協調が書かれていることを、遺伝子発現の実証にする",
    "研究の対象・条件・比較・測定結果を確認し、どの主張を支持するか分ける"
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
        "生成・巡り・排泄の役割を、伝統用語と関連づけて整理する",
        "体内を巡るすべての物質を実測したと結論づける",
        "病気の有無を正常モデルだけで確定する"
      ],
      "correctIndex": 0,
      "explanation": "伝統的な正常機能の説明を整理する課題です。物質を追跡した測定結果や診断とは区別します。",
      "relatedSectionTitle": "第1節：生成・巡り・排泄の整理"
    },
    {
      "id": "lecture-lifedynamics-12-q2",
      "question": "【第2節：ひとつの関係を根拠とともに説明する】正常な連携を説明するとき、適切なのはどれですか？",
      "options": [
        "説明の筋が通れば病機の仮説も確定する",
        "用いた役割の根拠と、確認していない医学的な機序を分ける",
        "モデルの一部を逆にすれば患者の原因が分かる"
      ],
      "correctIndex": 1,
      "explanation": "説明の根拠を示し、まだ確認していないことを添えます。正常の説明から病気の原因が自動的に確定するわけではありません。",
      "relatedSectionTitle": "第2節：ひとつの関係を根拠とともに説明する"
    },
    {
      "id": "lecture-lifedynamics-12-q3",
      "question": "【第3節：次章「五行論」への接続】次の五行論で学ぶ主な目的はどれですか？",
      "options": [
        "この章で選んだ治療法を実際の患者へ適用する",
        "気血津液を初めて学ぶ",
        "既習の五臓と正常な役割を、五つの分類と関係で整理する"
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
        "病因は背景の候補、病機は変化を説明する伝統的な仮説、症状は現れ、証は現時点の所見をまとめた分類",
        "病因は現在の分類名、病機は本人の訴え、症状は変化の仮説、証は発症前の背景",
        "病因は本人の訴え、病機は現在の分類名、症状は発症前の背景、証は変化の仮説"
      ],
      "correctIndex": 0,
      "explanation": "四つは異なる整理の層です。伝統的な説明を、検査で確認された生理機序や医学的な病名と同一視しません。背景の候補も、それだけで原因と確定した情報ではありません。",
      "relatedSectionTitle": "第2節：病因・病機・症状・証の四層峻別"
    },
    {
      "id": "lecture-pathomechanism-1-q2",
      "question": "「証」と「病機」を分ける説明として適切なのはどれですか？",
      "options": [
        "証は変化の過程を説明する仮説、病機は現時点の所見をまとめた分類である",
        "証は現時点の所見をまとめた伝統的な分類、病機はその変化の過程を説明する仮説である",
        "証は本人の訴えだけの一覧、病機は診察・検査で確定した医学的な病名である"
      ],
      "correctIndex": 1,
      "explanation": "証は現時点の状態の要約、病機は変化を説明する仮説として区別します。名称が整合していても、実際の原因や生理機序を証明したことにはなりません。",
      "relatedSectionTitle": "第2節：病因・病機・症状・証の四層峻別"
    },
    {
      "id": "lecture-pathomechanism-1-q3",
      "question": "「胸が張るのは気滞だから。気滞と考えた理由は胸が張るから」という説明に不足しているものはどれですか？",
      "options": [
        "気滞という分類名を、より詳しい証名に言い換えること",
        "同じ説明を別の伝統用語で繰り返して一貫性を示すこと",
        "経過や他の所見、別の説明を確認し、分類名以外の根拠を示すこと"
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
      "身体の状態と病因を見る伝統的なモデルとして学び、免疫の測定値や発症予測の計算式と区別する",
      "正気の値が分かれば、感染や病気の有無を判定できる",
      "邪気の強さに時間を掛ければ、誰の発症時期も計算できる"
    ],
    "correctIndex": 0,
    "explanation": "正気・邪気は伝統的な説明の用語です。身体の状態と病因の双方を見る視点を学べますが、免疫検査や感染モデルの同義語ではなく、原因や病名を確定する計算式ではありません。",
    "relatedSectionTitle": "第2節：失調の起点 ― 正気と邪気を用いた整理"
  },
  {
    "id": "lecture-pathomechanism-2-q2",
    "question": "六淫・七情・飲食・労倦の基本を学ぶ際、適切な説明はどれですか？",
    "options": [
      "日常の気候や感情が現れた時点で、それを病因と確定する",
      "伝統的な分類や背景の観点を区別し、程度・経過・他の情報を確認する",
      "六淫は六種類の病原体、七情は七種類の精神疾患の名前である"
    ],
    "correctIndex": 1,
    "explanation": "六淫は風・寒・暑・湿・燥・火の分類、七情は正常な感情も含む用語です。飲食や労倦も背景として確認します。名称を病原体や病名に置き換えず、生活背景だけで原因を決めません。",
    "relatedSectionTitle": "第2節：失調の起点 ― 正気と邪気を用いた整理"
  },
  {
    "id": "lecture-pathomechanism-2-q3",
    "question": "架空例の「夜勤が続き、昨日からだるい」という報告から、今できる判断はどれですか？",
    "options": [
      "夜勤によって感染したと原因と病名を決める",
      "正気の不足と確定し、補気の治療を先に選ぶ",
      "二つの報告を記録し、労倦などの候補と経過・他の症状などの要確認事項を分ける"
    ],
    "correctIndex": 2,
    "explanation": "分かっているのは本人が話した夜勤とだるさです。労倦や生活背景との関係は候補にとどめ、経過、睡眠・活動、他の症状、必要な医学的評価を確認します。未確認の機序や治療を追加しません。",
    "relatedSectionTitle": "第4節：現れ得る症状・所見と別の可能性（判断の限界）"
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
      "気虚は働きの不足、気滞は運行の滞りという異なる観点で説明する",
      "気虚と気滞は同じ用語なので、経過を比較する必要はない",
      "気虚は必ず気滞の後に現れる最終段階である"
    ],
    "correctIndex": 0,
    "explanation": "気虚は不足、気滞は滞りに着目する伝統用語です。同時に候補となる場合もありますが、一定の順番に進む段階ではありません。気の量を測定した結果とも区別します。",
    "relatedSectionTitle": "第2節：働きの不足を説明する気虚"
  },
  {
    "id": "lecture-pathomechanism-3-q2",
    "question": "気逆と気陥の概念の比較として適切なのはどれですか？",
    "options": [
      "どちらも気の滞りだけを指し、上逆や支える働きとの関係はない",
      "気逆は上逆、気陥は持ち上げ支える働きの不足に着目する",
      "気逆は気脱と同じ意味で、日常的な疲れを表す"
    ],
    "correctIndex": 1,
    "explanation": "気逆は気の上逆や下降の失調、気陥は持ち上げ支える働きの不足を説明します。これは伝統概念の比較で、胃食道逆流症や内臓の病気をこの二語だけで判断する対応表ではありません。",
    "relatedSectionTitle": "第3節：運動の失調を区別する"
  },
  {
    "id": "lecture-pathomechanism-3-q3",
    "question": "架空例の「疲れやすく、夕食後にお腹が張る」という報告について、今できる判断はどれですか？",
    "options": [
      "気滞が先に起こり気虚を生んだという原因と順序を確定する",
      "気虚が主因と決めて、具体的な補気の治療を先に選ぶ",
      "二つの訴えを記録し、不足・停滞の候補と経過などの要確認事項を分ける"
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
      "資料ごとの定義を読み分け、必ず進む悪化段階として並べない",
      "水湿から痰、飲、水滞へ必ず進むため、名前で重症度を決める",
      "四つはすべて同義語なので、説明する性質を比べる必要はない"
    ],
    "correctIndex": 0,
    "explanation": "水湿・痰・飲は別の項目として定義され、水滞のまとめ方にも教材による違いがあります。これらを順番通りの悪化段階や、検査で同定した一種類の物質として扱いません。",
    "relatedSectionTitle": "第3節：水湿・痰・飲を比較する"
  },
  {
    "id": "lecture-pathomechanism-4-q2",
    "question": "痰と飲の学習上の区別として適切なのはどれですか？",
    "options": [
      "痰は喀出される痰だけを指し、飲は体内の正常な津液すべてを指す",
      "痰は粘り・濁り、飲は比較的さらりとした停滞という説明を比較し、医学的な貯留液と同一視しない",
      "痰と飲の区別を知れば、症状の原因や必要な薬を決められる"
    ],
    "correctIndex": 1,
    "explanation": "伝統理論の痰には喀出される痰に限らない用法があり、飲は比較的さらりとした水液の停滞を説明します。用語の比較であり、胸水・肺水腫などを診断したり、効能を示したりするものではありません。",
    "relatedSectionTitle": "第3節：水湿・痰・飲を比較する"
  },
  {
    "id": "lecture-pathomechanism-4-q3",
    "question": "架空例の「夕方に足がむくむ感じがあり、口も乾く」という報告について適切な次の整理はどれですか？",
    "options": [
      "水滞が確定したとして、水分摂取の制限を選ぶ",
      "口の乾きがあるため、測定や他の情報なしで脱水と決める",
      "本人の訴えを記録し、不足・停滞の候補と経過・治療状況などの要確認事項を分ける"
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
      "血虚は伝統的な分類で、貧血の診察・検査による評価と同じ意味にはしない",
      "血虚という候補があれば、貧血の有無も分かる",
      "貧血がないと分かれば、血虚という伝統的な分類は検討できない"
    ],
    "correctIndex": 0,
    "explanation": "血虚は養い潤す働きの不足を説明する伝統用語で、貧血の同義語ではありません。同じ人に両方の評価が行われても、一方の名前だけで他方の有無を決めることはできません。",
    "relatedSectionTitle": "第2節：養い潤す働きの不足と血虚"
  },
  {
    "id": "lecture-pathomechanism-5-q2",
    "question": "瘀血と気・寒熱・外傷との関係を学ぶ際、適切な読み方はどれですか？",
    "options": [
      "すべての瘀血を気滞やストレスだけで説明する",
      "複数の伝統的な背景を比較し、血液の凝固や血栓を確認した説明と分ける",
      "五つの背景は必ず順番に現れるので、最後の外傷を重症段階とする"
    ],
    "correctIndex": 1,
    "explanation": "気滞・気虚・寒熱・外傷との関係は、伝統理論内で背景を比較する観点です。一定の悪化順序でも、血液が物理的に凍る・濃縮するという測定結果でもなく、瘀血を血栓や微小循環障害と同義にはしません。",
    "relatedSectionTitle": "第3節：瘀血と複数の背景を比較する"
  },
  {
    "id": "lecture-pathomechanism-5-q3",
    "question": "架空例の「同じ場所が痛み、夜に気になる」という報告について、今できる判断はどれですか？",
    "options": [
      "固定した痛みだけで瘀血を確定し、活血の治療を選ぶ",
      "夜間の痛みから微小血栓の存在を決める",
      "部位と時間の訴えを記録し、瘀血を候補にとどめて経過・受傷・他の症状などを確認する"
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
      "question": "【寒熱と陰陽の失調】の基本として、最も適切な理解はどれですか？",
      "options": [
        "寒熱と虚実を別々の軸として整理し、四象限マトリクスで病態を正確に位置づけられる",
        "最初に考えた仮説に合う情報を中心に集め、合わない所見の確認は後回しにする",
        "一つの症状や所見だけで判断を確定し、経過や他の情報との照合を省く"
      ],
      "correctIndex": 0,
      "explanation": "本レッスンでは「寒熱の形成、陰陽の偏盛・偏衰、実熱・虚熱・実寒・虚寒の四象限マトリクス、寒熱錯雑」を学び、寒熱と虚実を別々の軸として整理し、四象限マトリクスで病態を正確に位置づけられることを目指します。"
    },
    {
      "id": "lecture-pathomechanism-6-q2",
      "question": "実熱と虚熱の伝統的な分類の違いはどれですか？",
      "options": [
        "実熱は陰の不足、虚熱は陽・邪気の偏盛という説明である",
        "実熱は陽・邪気の偏盛、虚熱は陰の不足に伴う相対的な熱という説明である",
        "実熱と虚熱は熱の強弱だけで分かれ、虚実の観点は用いない"
      ],
      "correctIndex": 1,
      "explanation": "これは伝統的な寒熱分類です。陽や陰を実測した熱量や体液量そのものとは扱いません。発熱の原因、脱水、感染症などの医学的評価は別に必要です。",
      "relatedSectionTitle": "第2節：寒熱の形成 ― 陰陽の偏盛と偏衰（四象限マトリクス）"
    },
    {
      "id": "lecture-pathomechanism-6-q3",
      "question": "顔の熱感と足の冷えが同時に記録された架空例について、今できる整理はどれですか？",
      "options": [
        "顔の熱感を優先し、足の冷えは記録から外して実熱と分類する",
        "足の冷えを優先し、顔の熱感は記録から外して虚寒と分類する",
        "両方の訴えを保持し、部位・経過・観察条件を確かめて、混在や別の説明を比較する"
      ],
      "correctIndex": 2,
      "explanation": "寒熱の訴えは部位や時間によって異なることがあります。一方を無視せず、寒熱錯雑や真仮などは比較する伝統的な候補にとどめます。緊急性や病名、治療はこの情報だけで決めません。",
      "relatedSectionTitle": "第3節：寒熱錯雑 ― 現代人の標準「上熱下寒」"
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
      "question": "【外的要因から病態を考える】の基本として、最も適切な理解はどれですか？",
      "options": [
        "伝統的な外感モデルの違いと適用範囲を理解し、単一の侵入経路に固執せず柔軟に解読できる",
        "最初に考えた仮説に合う情報を中心に集め、合わない所見の確認は後回しにする",
        "一つの症状や所見だけで判断を確定し、経過や他の情報との照合を省く"
      ],
      "correctIndex": 0,
      "explanation": "本レッスンでは「六淫（風寒暑湿燥火）・疫癘の基本概念、侵入と伝変、伝統的外感モデル（六経・衛気営血・三焦弁証）の違いと適用範囲」を学び、伝統的な外感モデルの違いと適用範囲を理解し、単一の侵入経路に固執せず柔軟に解読できることを目指します。"
    },
    {
      "id": "lecture-pathomechanism-7-q2",
      "question": "六淫のうち、風邪（ふうじゃ）の伝統的な性質として扱う組合せはどれですか？",
      "options": [
        "重濁・粘滞が中心で、下部の重だるさとの関係を説明する",
        "軽揚・遊走・変化が中心で、他の外邪との組合せも説明する",
        "乾燥が中心で、潤いの不足だけを説明する"
      ],
      "correctIndex": 1,
      "explanation": "風邪には軽揚・善行数変などの性質を配します。重濁・粘滞は湿、乾燥は燥を説明する観点です。六淫は伝統的な分類であり、毛穴から病原体を運ぶ物理的な物質として確定した説明ではありません。",
      "relatedSectionTitle": "第2節：六気から六淫へ ― 自然界の6大攻撃ベクトル"
    },
    {
      "id": "lecture-pathomechanism-7-q3",
      "question": "外感の伝統的なモデルを使って学習例を読む際、適切なのはどれですか？",
      "options": [
        "六経・衛気営血・三焦はすべて同じ分類なので、用語をそのまま入れ替える",
        "表から裏への一方向だけを想定し、それに合わない経過は記録から除く",
        "各モデルが整理する観点と適用範囲を比べ、単一の進行順序を決めつけない"
      ],
      "correctIndex": 2,
      "explanation": "傷寒論や温病学のモデルは観点が異なります。伝変は学習上の説明モデルとして読み、現代医学の感染経路や重症度判定へそのまま置き換えません。",
      "relatedSectionTitle": "第4節：二大外感体系 ― 傷寒論と温病論"
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
        "感情・食事・活動の報告を経過と照合し、関係の候補と未確認事項を分ける",
        "生活背景の報告を原因とみなし、それに合う伝統分類だけを確認する",
        "身体の所見を先に分類し、本人の生活背景は症例の解釈から外す"
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
      "relatedSectionTitle": "第2節：七情内傷（感情による気機の直撃）"
    },
    {
      "id": "lecture-pathomechanism-8-q3",
      "question": "「仕事で思い悩む時期に、食後の張りも気になった」という架空の報告を記録する方法はどれですか？",
      "options": [
        "思い悩みが張りの原因と分かったため、脾の失調を確定して記録する",
        "張りは食事だけで説明できるため、感情に関する報告は記録から外す",
        "感情と食後の張りの報告を分け、発症順序、食事、睡眠などを追加確認する"
      ],
      "correctIndex": 2,
      "explanation": "感情と身体の双方向の関係を比較します。併存や時間的関連だけでは、どちらが原因かは決まりません。用語対応に加えて、仮説を保留して情報を集める判断を確認します。",
      "relatedSectionTitle": "第5節：心身の悪循環ループ（感情と身体の双方向性）"
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
      "question": "【病理が波及する仕組み】の基本として、最も適切な理解はどれですか？",
      "options": [
        "局所の変化から全体への影響を複数方向で考え、五行の固定観念に囚われず波及ルートを検証できる",
        "最初に考えた仮説に合う情報を中心に集め、合わない所見の確認は後回しにする",
        "一つの症状や所見だけで判断を確定し、経過や他の情報との照合を省く"
      ],
      "correctIndex": 0,
      "explanation": "本レッスンでは「気血津液間の相互波及、臓腑間の病理伝変、五行生剋乗侮の活用と限界、多方向波及モデル」を学び、局所の変化から全体への影響を複数方向で考え、五行の固定観念に囚われず波及ルートを検証できることを目指します。"
    },
    {
      "id": "lecture-pathomechanism-9-q2",
      "question": "五行の関係モデルで「子病犯母」を説明する向きはどれですか？",
      "options": [
        "木（母）から火（子）への波及を説明する向き",
        "火（子）から木（母）への波及を説明する向き",
        "木から土への相剋関係を説明する向き"
      ],
      "correctIndex": 1,
      "explanation": "木生火という相生関係では木が母、火が子であり、子から母への波及を子病犯母と表します。これは伝統モデルの方向の比較です。頻度や実際の臓器障害、血液の移動を証明した説明ではありません。",
      "relatedSectionTitle": "第3節：臓腑間波及の五行モデルとその活用"
    },
    {
      "id": "lecture-pathomechanism-9-q3",
      "question": "複数の不調の発症時期が異なる架空例で、波及のモデルを使う目的として適切なのはどれですか？",
      "options": [
        "最初に報告された不調を、後のすべての症状の原因として確定する",
        "五行の順番に症状を並べ替え、実際の発症時期との違いを省く",
        "経過から複数の関係の候補を考え、それぞれの支持情報と不足情報を確認する"
      ],
      "correctIndex": 2,
      "explanation": "時間の前後や関係図だけでは因果は確定しません。波及モデルは確認する問いを作る学習補助です。最初の症状が必ず真の原因という前提や、特定部位への介入の必要性は追加しません。",
      "relatedSectionTitle": "第4節：五行モデルの限界 ― 「当てはめゲーム」の罠"
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
      "question": "【慢性化と複合病態】の基本として、最も適切な理解はどれですか？",
      "options": [
        "不足と停滞などが併存する構造を整理し、「始まった原因」と「続いている理由」を峻別できる",
        "最初に考えた仮説に合う情報を中心に集め、合わない所見の確認は後回しにする",
        "一つの症状や所見だけで判断を確定し、経過や他の情報との照合を省く"
      ],
      "correctIndex": 0,
      "explanation": "本レッスンでは「虚実挟雑、本虚標実、寒熱錯雑、悪循環の固定化、発症要因・増悪軽減要因・維持要因の3区分」を学び、不足と停滞などが併存する構造を整理し、「始まった原因」と「続いている理由」を峻別できることを目指します。"
    },
    {
      "id": "lecture-pathomechanism-10-q2",
      "question": "慢性症状を整理する「発症要因・増悪軽減要因・維持要因」の使い方はどれですか？",
      "options": [
        "発症時にあった出来事だけで、現在の症状が続く理由も説明する",
        "始まった前後の出来事、現在の変動、続いている背景を分けて確認する",
        "現在の増悪要因だけを記録し、発症経過と持続する背景は省く"
      ],
      "correctIndex": 1,
      "explanation": "始まった時と現在では関連する要因が異なる可能性があります。三つの視点で経過を整理し、それぞれを原因として確定した情報と区別します。",
      "relatedSectionTitle": "第2節：「始まった原因」と「続いている理由」を分ける3大視点"
    },
    {
      "id": "lecture-pathomechanism-10-q3",
      "question": "本虚標実という伝統的な整理で、比較しているものはどれですか？",
      "options": [
        "初期の症状と後期の症状だけで、現時点の不足と停滞は扱わない",
        "身体の上部と下部だけで、病態の役割や併存は扱わない",
        "基盤となる不足と、現れている停滞などの異なる観点の併存"
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
      "question": "【病機の仮説を比較する】の基本として、最も適切な理解はどれですか？",
      "options": [
        "一つの説明に固執せず、同じ現れに対して複数の病機仮説を立て、反証情報によって柔軟に修正できる",
        "最初に考えた仮説に合う情報を中心に集め、合わない所見の確認は後回しにする",
        "一つの症状や所見だけで判断を確定し、経過や他の情報との照合を省く"
      ],
      "correctIndex": 0,
      "explanation": "本レッスンでは「時間軸の追跡、支持情報、反証所見、原因と結果の入れ替わり、仮説の自己修正、短絡的断定の脱却」を学び、一つの説明に固執せず、同じ現れに対して複数の病機仮説を立て、反証情報によって柔軟に修正できることを目指します。"
    },
    {
      "id": "lecture-pathomechanism-11-q2",
      "question": "架空例の「疲れると頭痛が増す」と「固定した痛みが夜に気になる」という異なる報告を比べる際、適切なのはどれですか？",
      "options": [
        "頭痛という主訴が同じなので、経過や性状の違いを比較せず一つの候補にまとめる",
        "不足・停滞などの候補を別々に立て、支持・反証・追加確認を並べる",
        "痛みの違いだけで各例の分類と治法が決まるので、他の情報は確認しない"
      ],
      "correctIndex": 1,
      "explanation": "報告は候補を比較する材料です。少数の症状だけで気虚・瘀血等を確定せず、発症経過、他の所見、必要な医学的評価を含めて確認します。病機論ではまだ個別の治法を決定しません。",
      "relatedSectionTitle": "第2節：短絡的断定の罠 ― 同一症状の複数仮説モデル"
    },
    {
      "id": "lecture-pathomechanism-11-q3",
      "question": "初期の病機仮説に合わない情報が加わった場合、次に行うことはどれですか？",
      "options": [
        "支持する情報が一つあれば、合わない情報は解釈せず仮説を維持する",
        "仮説名をより複雑に言い換え、同じ情報を再び支持情報として扱う",
        "観察条件と情報を再確認し、別の仮説や保留の必要性を比較する"
      ],
      "correctIndex": 2,
      "explanation": "反証となり得る情報を保持し、初期仮説を見直します。追加情報に合う物語を作るだけではなく、支持・反証・不足を分けることが本講の課題です。",
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
        "学習例の仮説を整理し、未確認の因果や別の説明を保留する",
        "関係図に沿ってすべての病気が必ず同じ順に進むと判定する",
        "気滞があれば器質的病変も必ず生じると確定する"
      ],
      "correctIndex": 0,
      "explanation": "三つの軸は仮説を整理する視点です。伝統的な連鎖図を必然的な医学因果として扱いません。",
      "relatedSectionTitle": "第1節：病機論の「3大統合軸」総まとめ"
    },
    {
      "id": "lecture-pathomechanism-12-q2",
      "question": "【第2節：病機仮説から「診断の問い」への変換】分類候補に舌や脈の記述が合った場合、適切なのはどれですか？",
      "options": [
        "病名と機序が完全に証明されたと扱う",
        "記録した所見・伝統的な解釈・医学的な評価を分ける",
        "合わない情報を除き、候補を確定する"
      ],
      "correctIndex": 1,
      "explanation": "所見の照合は伝統的な情報整理の学習です。病気の原因や機序を分類だけで確定しません。",
      "relatedSectionTitle": "第2節：病機仮説から「診断の問い」への変換"
    },
    {
      "id": "lecture-pathomechanism-12-q3",
      "question": "【第3節：次章「臨床診断論」への接続】次章へつなげる情報として適切なのはどれですか？",
      "options": [
        "分類名がもっともらしければ根拠は不要である",
        "医学的な評価を省略するための完成した物語を渡す",
        "支持情報・反証・不足情報・保留する判断を示す"
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
      "question": "【診断・弁証の目的と全体像】の基本として、最も適切な理解はどれですか？",
      "options": [
        "各概念を明確に区別し、断片的な自覚症状から治療方針に至る論理的思考手順を整理する",
        "最初に考えた仮説に合う情報を中心に集め、合わない所見の確認は後回しにする",
        "一つの症状や所見だけで判断を確定し、経過や他の情報との照合を省く"
      ],
      "correctIndex": 0,
      "explanation": "本レッスンでは「病名・症状・病機・証・治療方針の違い、判断までの手順、循環論法・滑らかな虚構の回避」を学び、各概念を明確に区別し、断片的な自覚症状から治療方針に至る論理的思考手順を説明できることを目指します。"
    },
    {
      "id": "lecture-diagnosis-1-q2",
      "question": "主訴から伝統的な分類候補を考える学習の流れとして適切なのはどれですか？",
      "options": [
        "主訴から分類名を決め、合致する所見だけを集めて治療方針を固定する",
        "安全性を確認し、得られた情報と病機・証の候補を分け、追加確認と再評価を行う",
        "病名が記録されていれば、四診情報や本人の希望を集めず配穴を決める"
      ],
      "correctIndex": 1,
      "explanation": "診断論の基本形は安全確認・情報整理・仮説形成・追加確認・統合・再評価です。病名と伝統的な分類を区別し、証の候補から治療が自動的に一つに決まるとは考えません。",
      "relatedSectionTitle": "第2節：診断の順序は「基本形」であり、一方通行ではない"
    },
    {
      "id": "lecture-diagnosis-1-q3",
      "question": "病名・症状・証・治療方針の整理として適切なのはどれですか？",
      "options": [
        "病名と証は同じ分類なので、一方を記録すればもう一方も確定する",
        "症状を証名へ言い換えることで、病名と治療効果を確定できる",
        "症状は訴えや所見、病名は疾患の分類、証は伝統的な状態のまとめで、治療方針は別に検討する"
      ],
      "correctIndex": 2,
      "explanation": "病名、現れ、伝統的な分類、介入計画は異なる層です。説明が一貫していても機序や効果の証明にはならず、安全性や個別の条件を確認して判断します。",
      "relatedSectionTitle": "第1節：病名・症状・病機・証・治療方針の5層ピラミッド"
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
        "緊急性や受診の必要性を検討し、分からない場合は施術を保留して医療評価につなぐ",
        "チェック項目に当てはまらなければ、重大な病気の可能性を除外して施術可能とする",
        "伝統的な分類が決まるまでは、受診や紹介の必要性を検討しない"
      ],
      "correctIndex": 0,
      "explanation": "危険兆候は対応を検討するための情報です。すべてが同じ緊急度とは限らず、一覧にない病気もあります。分類名だけで緊急性を除外・確定せず、急激な悪化や判断不能時は必要な医療評価を優先します。",
      "relatedSectionTitle": "施術を保留する判断"
    },
    {
      "id": "lecture-diagnosis-2-q2",
      "question": "【レッドフラッグの除外鑑別】鍼灸院に来院した腰痛患者に対し、直ちに施術を中止して救急・専門医へ紹介すべき重大な危険兆候（レッドフラッグ）はどれですか？",
      "options": [
        "前屈すると腰の筋肉が少し張るような違和感",
        "急性発症の排尿・排便障害（失禁や尿閉）や会陰部の感覚消失（馬尾症候群の疑い）",
        "朝起きた時に腰が重く、軽く動くと楽になる症状"
      ],
      "correctIndex": 1,
      "explanation": "強い腰痛や脚への放散痛に、新たな排尿・排便・性機能障害や会陰部感覚異常が伴う場合は、馬尾症候群などの評価へ直ちにつなぎます。診断や手術時期は医療機関で判断します。NICE NG127 1.7.3を参照し、弁証より医療評価を優先します。"
    },
    {
      "id": "lecture-diagnosis-2-q3",
      "question": "医療安全における「自分の守備範囲（適応の限界）」を認識することの大切さは何ですか？",
      "options": [
        "どんな重病でも自分一人で抱え込んで治した方が名医とされること",
        "少しでも難しい患者はすべて断って仕事を減らすこと",
        "患者の命と安全を第一に守り、適切な他科連携を行うことで真の信頼関係を築けること"
      ],
      "correctIndex": 2,
      "explanation": "自らの介入限界を見極め、必要なときに迷わず他科連携をとれる判断力こそが医療人として最も大切な資質です。"
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
      "question": "【主訴と時間軸を整理する】の基本として、最も適切な理解はどれですか？",
      "options": [
        "患者の混乱した多数の訴えから核心を抽出し、時間軸に沿って簡潔に要約・構造化できる",
        "最初に考えた仮説に合う情報を中心に集め、合わない所見の確認は後回しにする",
        "一つの症状や所見だけで判断を確定し、経過や他の情報との照合を省く"
      ],
      "correctIndex": 0,
      "explanation": "本レッスンでは「主訴の特定、発症起点（突然か緩徐か）、時間軸（タイムライン）の展開、増悪・寛解因子、生活支障度」を学び、患者の混乱した多数の訴えから核心を抽出し、時間軸に沿って簡潔に要約・構造化できることを目指します。"
    },
    {
      "id": "lecture-diagnosis-3-q2",
      "question": "「夕方に疲れると肩が張る」と「朝にこわばり、動くと軽くなる」という報告を比較する際、適切なのはどれですか？",
      "options": [
        "時間帯と軽減方法だけで、前者を虚証、後者を実証と確定する",
        "時間帯・活動・休息との関係を記録し、不足や停滞の候補を他の情報と照合する",
        "時間帯の違いは施術に関係しないため、主訴の名称だけを記録する"
      ],
      "correctIndex": 1,
      "explanation": "増悪・軽減因子は候補を比較する材料です。伝統的な虚実を確定する検査ではなく、症状の経過や他の説明も確認します。",
      "relatedSectionTitle": "第3節：増悪・軽減因子のデコード表"
    },
    {
      "id": "lecture-diagnosis-3-q3",
      "question": "訴えを時間軸で整理することで、直接確認できることはどれですか？",
      "options": [
        "最初の出来事が後の症状を引き起こしたという因果の確定",
        "現在の分類に合わない過去の出来事を除外する根拠",
        "本人が報告した発症・変化・増悪軽減の順序と、未確認の時期"
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
      "question": "【問診を設計する】の基本として、最も適切な理解はどれですか？",
      "options": [
        "誘導を避け、複数の仮説を比較・反証するために必要な質問を戦略的に選び出せる",
        "最初に考えた仮説に合う情報を中心に集め、合わない所見の確認は後回しにする",
        "一つの症状や所見だけで判断を確定し、経過や他の情報との照合を省く"
      ],
      "correctIndex": 0,
      "explanation": "本レッスンでは「開かれた質問と閉じた質問の使い分け、誘導尋問の排除、対立仮説の反証テスト、十問の機能的再編」を学び、誘導を避け、複数の仮説を比較・反証するために必要な質問を戦略的に選び出せることを目指します。"
    },
    {
      "id": "lecture-diagnosis-4-q2",
      "question": "【問診における仮説検証と確証バイアス回避】問診の初期段階で「この患者は肝気鬱結だろう」と仮説を立てた施術者が、診断精度を高めるために取るべき最も適切な問診態度はどれですか？",
      "options": [
        "自分の仮説を肯定する質問だけを繰り返し、患者の言動を無理やり肝気鬱結に当てはめる",
        "仮説を検証しつつも、それに反する事実（例：冷えの有無、飲食の性状、脈状の乖離）がないかを積極的に探索・反証する開かれた質問を行う",
        "患者に一切質問をさせず、施術者の直感だけで一方的に決めつける"
      ],
      "correctIndex": 1,
      "explanation": "確証バイアス（自分の仮説に都合の良い証拠だけを集めてしまう心理）の回避です。臨床推論では、初期仮説を立てた後、反証所見（矛盾する兆候）を自ら探しに行くことで誤診を防ぎます。"
    },
    {
      "id": "lecture-diagnosis-4-q3",
      "question": "【問診の質問設計：ファネル構造】患者から正確な病態情報を引き出すための「問診のファネル（漏斗）構造」として適切な手順はどれですか？",
      "options": [
        "最初から「あなたは胃が痛いですね？はいかいいえで答えてください」と誘導尋問で詰める",
        "患者には一切話させず、治療者が一方的に持論の医学講釈を1時間語り続ける",
        "まず開かれた質問（オープン・クエスチョン）で全体像や自由な語りを聴き、次いで閉じた質問（クローズド）で寒熱・増悪因子などの焦点を絞り込む"
      ],
      "correctIndex": 2,
      "explanation": "開かれた質問で患者の文脈と全体像を受容し、徐々に閉じた質問で寒熱・飲食・睡眠・排泄などの客観的鑑別点を絞り込むのが標準面接技法です。"
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
      "question": "【望診・聞診で観察する】の基本として、最も適切な理解はどれですか？",
      "options": [
        "観察した客観的事実と主観的解釈を明確に分けて記録し、印象による断定を回避できる",
        "最初に考えた仮説に合う情報を中心に集め、合わない所見の確認は後回しにする",
        "一つの症状や所見だけで判断を確定し、経過や他の情報との照合を省く"
      ],
      "correctIndex": 0,
      "explanation": "本レッスンでは「望診（神気・五色・形態・動態・舌診）、聞診（音声・呼吸・におい）、観察条件の標準化、四診共通記録5項目」を学び、観察した客観的事実と主観的解釈を明確に分けて記録し、印象による断定を回避できることを目指します。"
    },
    {
      "id": "lecture-diagnosis-5-q2",
      "question": "舌質と舌苔を記録するとき、適切な区別はどれですか？",
      "options": [
        "舌質は表面の苔の厚さ、舌苔は舌本体の色や形として記録する",
        "舌質は舌本体の色や形、舌苔は表面の苔の色や厚さとして記録する",
        "舌質と舌苔を一つの色の印象にまとめ、形や厚さは記録しない"
      ],
      "correctIndex": 1,
      "explanation": "本体と表面の苔を分けて観察します。気血・寒熱・胃気等との関連づけは伝統的な解釈であり、観察した色や形と解釈を同じ欄で確定情報にしません。",
      "relatedSectionTitle": "舌質と舌苔の役割分担"
    },
    {
      "id": "lecture-diagnosis-5-q3",
      "question": "舌の色が前回と違って見えた際、解釈の前に確認することはどれですか？",
      "options": [
        "色の変化を臓腑の変化と確定し、照明や飲食の情報は省く",
        "前回の分類を維持するため、今回の色の記録を前回に合わせる",
        "照明、直前の飲食、観察方法などの条件を確かめ、観察結果を別に記録する"
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
      "question": "【切診の情報を扱う】の基本として、最も適切な理解はどれですか？",
      "options": [
        "触診所見を他の四診情報と照合し、単独で結論づけずに客観的指標として統合できる",
        "最初に考えた仮説に合う情報を中心に集め、合わない所見の確認は後回しにする",
        "一つの症状や所見だけで判断を確定し、経過や他の情報との照合を省く"
      ],
      "correctIndex": 0,
      "explanation": "本レッスンでは「脈診の基本手技と4大物理ゲージ、腹診の主要腹証と機能解剖、体表・経穴触診、触診の再現性の限界と照合原則」を学び、触診所見を他の四診情報と照合し、単独で結論づけずに客観的指標として統合できることを目指します。"
    },
    {
      "id": "lecture-diagnosis-6-q2",
      "question": "浮脈・沈脈の記録を他の情報と扱う方法として適切なのはどれですか？",
      "options": [
        "脈の深さだけで病変の位置を決め、問診や他の所見は省く",
        "触れた深さと条件を記録し、表裏という伝統的な候補を他の四診情報と照合する",
        "問診で決めた表裏に合わせ、実際の脈の深さの記録を変更する"
      ],
      "correctIndex": 1,
      "explanation": "浮沈は脈の触れ方の記述で、表裏との関連は伝統的な解釈です。検者や条件による違いもあり、深さだけで臓器の病変や病位を確定しません。",
      "relatedSectionTitle": "第4節：切診の再現性の限界と照合原則"
    },
    {
      "id": "lecture-diagnosis-6-q3",
      "question": "本講の脈の観察項目として適切な組合せはどれですか？",
      "options": [
        "深さ・舌の色・苔の厚さ・声の強さ",
        "速さ・腹部の張り・食欲・皮膚の温感",
        "触れる深さ・速さ・幅・強さや緊張の特徴"
      ],
      "correctIndex": 2,
      "explanation": "本講ではこれらを脈の観察項目として整理します。触診の特徴と、寒熱・虚実・気滞等の伝統的な解釈は分けます。自律神経活動や病気を四つの項目だけで測定・判定するものではありません。",
      "relatedSectionTitle": "脈診の4大物理ゲージ"
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
      "question": "【八綱で病態を整理する】の基本として、最も適切な理解はどれですか？",
      "options": [
        "各軸の客観的根拠を示し、無理に白黒をつけずに複雑な複合病態を立体的に整理できる",
        "最初に考えた仮説に合う情報を中心に集め、合わない所見の確認は後回しにする",
        "一つの症状や所見だけで判断を確定し、経過や他の情報との照合を省く"
      ],
      "correctIndex": 0,
      "explanation": "本レッスンでは「八綱（表裏・寒熱・虚実・陰陽）の4次元座標モデル、急性/慢性の単純二分法の脱却、寒熱錯雑・虚実夾雑、判定保留の基準」を学び、各軸の客観的根拠を示し、無理に白黒をつけずに複雑な複合病態を立体的に整理できることを目指します。"
    },
    {
      "id": "lecture-diagnosis-7-q2",
      "question": "【八綱弁証における統括軸】八綱（表裏・寒熱・虚実・陰陽）の中で、他の6つの綱（表裏・寒熱・虚実）を統括する最上位の総綱（大枠）とされる組み合わせはどれですか？",
      "options": [
        "「表」と「裏」だけが総綱",
        "「陰」と「陽」（表・熱・実は陽に属し、裏・寒・虚は陰に属する）",
        "八綱はすべて対等であり、総綱という階層概念は存在しない"
      ],
      "correctIndex": 1,
      "explanation": "八綱において「陰陽は八綱の総綱なり」とされます。病位（表裏）・病性（寒熱）・病勢（虚実）の6綱はすべて陰陽の二大カテゴリに帰属・統合されます。"
    },
    {
      "id": "lecture-diagnosis-7-q3",
      "question": "【八綱弁証の座標軸】東洋医学の診断分類の基盤である「八綱（表裏・寒熱・虚実・陰陽）」の役割として、最も適切な理解はどれですか？",
      "options": [
        "患者を8つの箱のどれか1つだけに無理やり閉じ込め、他の可能性を一切考慮しない分類法",
        "八綱弁証は生薬処方だけに使うものであり、鍼灸や整体の臨床では全く使えない理論",
        "複雑多岐にわたる病態情報を、「病位（表裏）」「病性（寒熱）」「勢力関係（虚実）」の3軸座標に落とし込み、全体を統括する「陰陽」で方向性を定める思考フレームワーク"
      ],
      "correctIndex": 2,
      "explanation": "八綱弁証は、あらゆる症候を「どこにあるか（表裏）」「どんな性質か（寒熱）」「どちらが優勢か（虚実）」という立体的座標軸で整理する東洋医学の根幹OSです。"
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
      "question": "【気血津液の異常を検討する】の基本として、最も適切な理解はどれですか？",
      "options": [
        "断片的な自覚症状をクラスターとして捉え、気血津液の失調候補を優先順位をつけて絞り込める",
        "最初に考えた仮説に合う情報を中心に集め、合わない所見の確認は後回しにする",
        "一つの症状や所見だけで判断を確定し、経過や他の情報との照合を省く"
      ],
      "correctIndex": 0,
      "explanation": "本レッスンでは「気（虚・滞・逆・陥）、血（虚・瘀・熱・寒）、津液（不足・水湿・痰飲）の鑑別、一対一対応の脱却、所見のクラスター（群）化」を学び、断片的な自覚症状をクラスターとして捉え、気血津液の失調候補を優先順位をつけて絞り込めることを目指します。"
    },
    {
      "id": "lecture-diagnosis-8-q2",
      "question": "疲れやすさの報告から気虚・血虚を検討する際、適切なのはどれですか？",
      "options": [
        "疲れやすさがあれば気虚であり、血虚や他の説明は検討しない",
        "不足の候補を保ち、息切れ、乾燥、経過などの情報と医学的な評価を確認する",
        "疲れやすさを血虚と確定し、貧血の検査結果も異常とみなす"
      ],
      "correctIndex": 1,
      "explanation": "疲れやすさは複数の候補に関わり得ます。伝統的な所見の組合せを比較しますが、気虚・血虚は単一症状や貧血の有無と一対一に対応しません。",
      "relatedSectionTitle": "第1節：気の動態鑑別 ― 不足か、運動失調か"
    },
    {
      "id": "lecture-diagnosis-8-q3",
      "question": "痛みの性状から気滞・瘀血を比較する学習として適切なのはどれですか？",
      "options": [
        "固定痛があれば瘀血と血栓の存在を確定し、治法の選択へ進む",
        "張る痛みと固定した痛みが併存する場合、一方を記録から除く",
        "性状、部位、時間的な変化を記録し、伝統的な候補と不足情報を分ける"
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
        "部位、経過、他の所見を照合し、伝統的な関係の候補と医学的な評価を分ける",
        "痛みの位置を経絡に重ねれば、関与する臓器の疾患を確定できる",
        "臓腑と経絡は解剖学的な臓器と神経の別名なので、検査値へ直接換算する"
      ],
      "correctIndex": 0,
      "explanation": "臓腑・経絡は伝統理論の分類です。部位だけで臓器疾患や物理的な流路を同定するものではなく、医学的な評価も別に必要です。",
      "relatedSectionTitle": "⚠️ 判断の注意点：解剖学的位置に騙されるな"
    },
    {
      "id": "lecture-diagnosis-9-q2",
      "question": "「ストレスの時期に胸脇の張りとげっぷが増えた」という架空の報告を扱う際、適切なのはどれですか？",
      "options": [
        "ストレス後の症状なので、肝臓の疾患と胃の病変を同時に確定する",
        "肝気犯胃などを伝統的な候補として比較し、経過や他の症状、安全性を確認する",
        "げっぷがあるため胃だけの分類とし、胸脇の張りや背景は記録しない"
      ],
      "correctIndex": 1,
      "explanation": "肝気犯胃は臓腑の関係を説明する伝統的な候補です。この報告だけで解剖学的な肝臓・胃の病変、原因、介入を確定しません。",
      "relatedSectionTitle": "第4節：臓腑相関 ― 2つ以上の臓腑が織りなす連鎖病態"
    },
    {
      "id": "lecture-diagnosis-9-q3",
      "question": "臓腑相関の候補を記録する際、適切なのはどれですか？",
      "options": [
        "臓腑相関の名称を医学的な臓器疾患の病名として記載する",
        "検査が正常なら伝統的な分類もすべて除外できると記載する",
        "伝統的な関係の説明と支持・反証・不足情報を示し、臓器疾患の評価と区別する"
      ],
      "correctIndex": 2,
      "explanation": "臓腑間の関係を学ぶことと、臓器の病変を診断することは異なります。分類が整合しても、実際の多臓器病理連鎖の機序を証明したことにはなりません。",
      "relatedSectionTitle": "第4節：臓腑相関 ― 2つ以上の臓腑が織りなす連鎖病態"
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
      "question": "【仮説を比較し、矛盾を扱う】の基本として、最も適切な理解はどれですか？",
      "options": [
        "最初の直感をあえて疑い、反証所見から仮説を柔軟に修正し、追加確認の優先順位を論理的に決定できる",
        "最初に考えた仮説に合う情報を中心に集め、合わない所見の確認は後回しにする",
        "一つの症状や所見だけで判断を確定し、経過や他の情報との照合を省く"
      ],
      "correctIndex": 0,
      "explanation": "本レッスンでは「鑑別仮説マトリクスの構築、支持情報と反証（矛盾）の客観的対比、認知バイアス（確証バイアス・アンカリング）の解除、自己修正の3大行動」を学び、最初の直感をあえて疑い、反証所見から仮説を柔軟に修正し、追加確認の優先順位を論理的に決定できることを目指します。"
    },
    {
      "id": "lecture-diagnosis-10-q2",
      "question": "仮説を支持すると思っていた舌の色が、照明を変えると違って見えた場合、最初の対応はどれですか？",
      "options": [
        "複合病態の証名を追加し、照明の違いは考慮せず分類を確定する",
        "観察条件をそろえて再確認し、所見の記録と仮説の修正を分けて検討する",
        "初期仮説の正しさを保つため、再観察の結果を記録から外す"
      ],
      "correctIndex": 1,
      "explanation": "矛盾への対応には、観察条件の再確認、複合病態の検討、仮説の見直しがあります。この例では条件の違いを確認することが先です。限られた所見から真寒仮熱や治療を確定しません。",
      "relatedSectionTitle": "ステップ1：観察条件・外乱の再確認（手技と環境を疑う）"
    },
    {
      "id": "lecture-diagnosis-10-q3",
      "question": "冷えの訴えと熱を示すように解釈した舌の所見が食い違う場合、適切なのはどれですか？",
      "options": [
        "本人の訴えより舌の解釈を優先して、冷えの訴えを評価から外す",
        "冷えの訴えを優先して、舌の所見の記録を変更する",
        "観察条件を確認し、混在、別の説明、仮説の変更や判断保留を比較する"
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
      "question": "【証を統合し、判断を記録する】の基本として、最も適切な理解はどれですか？",
      "options": [
        "暫定的な証と判断根拠、および不明点や確信度を、客観的かつ簡潔にカルテへ記述できる",
        "最初に考えた仮説に合う情報を中心に集め、合わない所見の確認は後回しにする",
        "一つの症状や所見だけで判断を確定し、経過や他の情報との照合を省く"
      ],
      "correctIndex": 0,
      "explanation": "本レッスンでは「証の統合プロトコル、主証（主病態）と兼証（併存病態）の階層化、本標緩急の序列、確信度の明記、標準カルテ（東洋医学版SOAP）の記述」を学び、暫定的な証と判断根拠、および不明点や確信度を、客観的かつ簡潔にカルテへ記述できることを目指します。"
    },
    {
      "id": "lecture-diagnosis-11-q2",
      "question": "SOAPのA（評価・解釈）に記載する内容として適切なのはどれですか？",
      "options": [
        "本人が報告した言葉だけを転記し、評価の候補や根拠は省く",
        "暫定的な分類候補、支持する情報、反証、不明点や確信度を記載する",
        "実施する経穴と刺激条件だけを記載し、候補と判断根拠は省く"
      ],
      "correctIndex": 1,
      "explanation": "Aは評価・解釈を示す欄です。詳しい証名だけで再現性が保証されるわけではありません。S/Oの記録、判断根拠と不確実性、Pの計画を分けます。",
      "relatedSectionTitle": "第4節：東洋医学版SOAPカルテ記述フォーマット"
    },
    {
      "id": "lecture-diagnosis-11-q3",
      "question": "「昨日から腰が痛いと本人が話した」という情報を扱う方法はどれですか？",
      "options": [
        "痛みの原因が確認された客観的検査結果としてOに記録する",
        "施術者の病機仮説としてAに記録し、本人の報告は省く",
        "本人の報告としてSに記録し、観察した所見Oと解釈Aを分ける"
      ],
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
        "事実と仮説を分け、原因・緊急性の評価が不足していれば保留し必要な医療評価を優先する",
        "いくつかの神経症状が記載されなければ救急対応は不要と確定する",
        "舌と脈の記述が合えば、原因や証が完全に証明されたとする"
      ],
      "correctIndex": 0,
      "explanation": "この例は架空で、必要な評価が揃っていません。陰性の記載だけで重大な病気や緊急性を除外しません。",
      "relatedSectionTitle": "第2節：5段階情報開示シミュレーション演習"
    },
    {
      "id": "lecture-diagnosis-12-q2",
      "question": "【第3節：診断論から「治則・治法（第10章）」への引き継ぎ】次章へ渡す情報として、最も適切なのはどれですか？",
      "options": [
        "暫定的な分類名だけを渡し、根拠や安全性の情報は省く",
        "支持する所見・反証・不足情報・安全上の確認事項と、見直す条件を渡す",
        "まだ学んでいない治法を分類名だけから確定し、次章の評価を省く"
      ],
      "correctIndex": 1,
      "explanation": "診断論では情報と仮説を整理し、判断の根拠と保留する点を治則・治法の章へ渡します。分類名だけで個別の治療や効果を確定しません。",
      "relatedSectionTitle": "第3節：診断論から「治則・治法（第10章）」への引き継ぎ"
    },
    {
      "id": "lecture-diagnosis-12-q3",
      "question": "【第2節：5段階情報開示シミュレーション演習】サプリ使用後に症状が変化したという訴えを扱うとき、適切なのはどれですか？",
      "options": [
        "時期が続いているので、その製品が原因だと確定する",
        "中焦がパンクしたと判定し、教材から処方や薬の変更を指示する",
        "時間的な関連と因果を分け、製品・成分・量・服薬などを確認して医師や薬剤師に相談する"
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
      "question": "【治療の目的と適応範囲】の基本として、最も適切な理解はどれですか？",
      "options": [
        "「何を改善するための治療か」を明確に言語化し、患者と共有可能な具体的ゴールを設定できる",
        "最初に考えた仮説に合う情報を中心に集め、合わない所見の確認は後回しにする",
        "一つの症状や所見だけで判断を確定し、経過や他の情報との照合を省く"
      ],
      "correctIndex": 0,
      "explanation": "本レッスンでは「治療の3層ゴール、症状軽減と生活機能の両立、本人の希望（ナラティブ）の統合、東洋医学的介入の限界と境界線」を学び、「何を改善するための治療か」を明確に言語化し、患者と共有可能な具体的ゴールを設定できることを目指します。"
    },
    {
      "id": "lecture-treatment-1-q2",
      "question": "器質的な疾患もある人と補完的な介入の目標を検討する際、適切なのはどれですか？",
      "options": [
        "伝統的な分類が整えば、病変の治癒も見込めると説明して医療評価を省く",
        "必要な医療と連携し、本人の希望、苦痛・生活機能、効果の限界と安全性を確認する",
        "病変の治癒を目標にできなければ、苦痛や生活機能についても相談しない"
      ],
      "correctIndex": 1,
      "explanation": "病変の治癒と苦痛・生活機能の目標を区別します。補完的な方法の効果を一律に約束したり、自律神経調整という機序を個別例で確定したりせず、必要な医療を遅らせません。",
      "relatedSectionTitle": "第3節：東洋医学的介入の適応範囲と「絶対的限界」"
    },
    {
      "id": "lecture-treatment-1-q3",
      "question": "本講の三層ゴールを整理する組合せはどれですか？",
      "options": [
        "分類名を完成させる・経穴名を決める・通院回数を増やす",
        "施術者の技術を試す・刺激を強くする・同じ計画を続ける",
        "苦痛の軽減・生活機能の回復・再発に備えるセルフケアや自立"
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
        "治則は大方針、治法はその方針を伝統理論の対象や目的で具体化した表現",
        "治則は経穴の名称、治法は刺激する深度と時間だけを示す表現",
        "治則は現在の証名、治法は診察・検査で確定した病名を示す表現"
      ],
      "correctIndex": 0,
      "explanation": "治則と治法は異なる計画の層です。治法の名称は伝統的な目標の表現で、実際に臓器や気血をその通り動かせる機序・効果を証明したものではありません。",
      "relatedSectionTitle": "第2節：治則と治法の違い ― 「戦略」と「戦術」"
    },
    {
      "id": "lecture-treatment-2-q2",
      "question": "六階層モデルで、証名から配穴を直接一つに決めない理由はどれですか？",
      "options": [
        "証名は刺激量まで含むため、他の計画の層を確認する必要がない",
        "治則・治法・方法・刺激条件・評価を分け、個別の条件と安全性を検討する必要がある",
        "配穴さえ決まれば、治則や評価の記録は後から省略してよい"
      ],
      "correctIndex": 1,
      "explanation": "本講の対象は証・治則・治法・配穴や方法・操作や刺激量・評価の区別です。同じ分類名でも個別条件は異なります。未説明の八法や発汗・投薬を選択させる問題ではありません。",
      "relatedSectionTitle": "第1節：治療設計の6階層ピラミッド"
    },
    {
      "id": "lecture-treatment-2-q3",
      "question": "同じ「肝気鬱結証」であっても、若者と高齢者で配穴や刺激量を変えるべきなのはなぜですか？",
      "options": [
        "高齢者には鍼を打ってはいけないという絶対の法律があるから",
        "単なる施術者の気分転換のため",
        "生体の基礎体力（正気の強さ）や胃腸機能が異なるため、過剰刺激のリスクを避ける必要があるから"
      ],
      "correctIndex": 2,
      "explanation": "証名が同じでも、患者の年齢・体力・体質によって受け入れられる刺激量（ドーゼ）が異なるため、個別設計が不可欠です。"
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
      "question": "【補瀉・寒熱の原則を理解する】の基本として、最も適切な理解はどれですか？",
      "options": [
        "基本治療原則と、その適用に必要な前提条件を論理的に説明し、誤治（虚虚実実）を回避できる",
        "最初に考えた仮説に合う情報を中心に集め、合わない所見の確認は後回しにする",
        "一つの症状や所見だけで判断を確定し、経過や他の情報との照合を省く"
      ],
      "correctIndex": 0,
      "explanation": "本レッスンでは「補虚瀉実の力学、熱者清之・寒者温之の温度制御、正治（逆治）と反治（従治：熱因熱用・寒因寒用）の適用条件と限界」を学び、基本治療原則と、その適用に必要な前提条件を論理的に説明し、誤治（虚虚実実）を回避できることを目指します。"
    },
    {
      "id": "lecture-treatment-3-q2",
      "question": "「虚虚実実」という伝統的な戒めが指す考え方はどれですか？",
      "options": [
        "虚と実が併存するとき、両方を記録して仮説を保留すること",
        "不足をさらに損ない、過剰や停滞をさらに助長するような誤った対応を避けること",
        "補瀉の分類と実際の刺激条件を分けて記録すること"
      ],
      "correctIndex": 1,
      "explanation": "伝統理論内では虚をさらに虚させ、実をさらに実させる誤治への戒めです。補瀉は学習上の原則で、気の消失や病勢の爆発という物理機序を証明したものではありません。安全性や医学的な評価は別に必要です。",
      "relatedSectionTitle": "第1節：補虚瀉実 ― 生体エネルギーの力学制御"
    },
    {
      "id": "lecture-treatment-3-q3",
      "question": "痛みが強いという情報だけで「実証だから強刺激」と決めない理由はどれですか？",
      "options": [
        "痛みの点数が実証を測る検査値なので、強い痛みには同じ刺激でよい",
        "補瀉の名称が決まれば、解剖・持病・服薬の確認は不要になる",
        "痛みの強さだけでは虚実や安全性が決まらず、個別の評価と確認が必要だから"
      ],
      "correctIndex": 2,
      "explanation": "本講は原則の適用に必要な条件も扱います。強い痛みと実証、瀉法と強刺激を一対一に結びつけず、医学的な評価と施術の個別リスクを確認します。",
      "relatedSectionTitle": "⚠️ 判断の注意点：「痛む＝実証＝強刺激」という短絡の危険"
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
      "question": "【本治・標治と優先順位】の基本として、最も適切な理解はどれですか？",
      "options": [
        "複数の病態が併存する症例において、何を先に扱い何を後回しにするかの論理的根拠と時間軸計画を示せる",
        "最初に考えた仮説に合う情報を中心に集め、合わない所見の確認は後回しにする",
        "一つの症状や所見だけで判断を確定し、経過や他の情報との照合を省く"
      ],
      "correctIndex": 0,
      "explanation": "本レッスンでは「本治（根本治療）と標治（対症・局所治療）、優先順位を決める条件分岐、緊急性・苦痛度・生活支障度の統合、動的スライダー配分モデル」を学び、複数の病態が併存する症例において、何を先に扱い何を後回しにするかの論理的根拠と時間軸計画を示せることを目指します。"
    },
    {
      "id": "lecture-treatment-4-q2",
      "question": "【標本緩急の意思決定】長期の慢性脾胃虚弱（本虚）を抱えている患者が、激しい急性水様性下痢と嘔吐を起こして脱水危機（標実/標急）に瀕している場合、東洋医学の原則（標本緩急）に基づく最優先の介入方針はどれですか？",
      "options": [
        "慢性的な脾胃虚弱の根本治療（本治）を最優先し、時間をかけて胃腸の補気を進める",
        "救急医療を優先し、弁証や伝統的治法で紹介・受診を遅らせない",
        "本治も標治も一切行わず、患者の体力が自然回復するまで経過観察する"
      ],
      "correctIndex": 1,
      "explanation": "「急則治其標」は伝統的な原則ですが、激しい嘔吐・下痢に意識異常や急激な悪化が伴う状況を鍼灸だけで対応する指示ではありません。医療評価と必要な救急対応を優先します。"
    },
    {
      "id": "lecture-treatment-4-q3",
      "question": "急な強い苦痛と慢性的な背景があるとき、本標のモデルを扱う方法として適切なのはどれですか？",
      "options": [
        "本を扱う方針があれば、急な呼吸困難などの受診判断も後回しにする",
        "標を扱う方針があれば、救急症状も伝統的な介入だけで対応する",
        "緊急性と医療評価を優先し、安定した状況で短期・中期目標の優先順位を検討する"
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
        "不足・停滞・上逆・下陥・固摂の失調という伝統的な対象と、各治法の目的を区別する",
        "気に関わる治法はすべて同じ目的なので、不足と運動の失調を区別しない",
        "症状の名称を一つ決めれば、治法と具体的な方法も自動的に決まる"
      ],
      "correctIndex": 0,
      "explanation": "比較するのは伝統的な分類と治法の目的です。分類名だけで個別の方法、刺激条件や効果を確定するものではありません。",
      "relatedSectionTitle": "第1節：気の5大治法 比較マトリクス"
    },
    {
      "id": "lecture-treatment-5-q2",
      "question": "伝統用語として「気逆」に対する治法の目的を対応させたものはどれですか？",
      "options": [
        "昇提：下陥を持ち上げ支えることを目的とする",
        "降気・降逆：上逆を和らげ下降を助けることを目的とする",
        "固摂：漏出や保つ働きの失調を扱うことを目的とする"
      ],
      "correctIndex": 1,
      "explanation": "三つは異なる伝統的な目的です。気逆と降気の用語対応を確認する問題で、嘔吐やしゃっくりの原因・病名を分類だけで決めたり、個別の治療を指示したりしません。",
      "relatedSectionTitle": "第1節：気の5大治法 比較マトリクス"
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
      "question": "【血・津液への治法を整理する】の基本として、最も適切な理解はどれですか？",
      "options": [
        "不足（虚）と停滞（実）、および寒熱の座標を踏まえて、血・津液の治法を客観的に比較・選定できる",
        "最初に考えた仮説に合う情報を中心に集め、合わない所見の確認は後回しにする",
        "一つの症状や所見だけで判断を確定し、経過や他の情報との照合を省く"
      ],
      "correctIndex": 0,
      "explanation": "本レッスンでは「血の治法（養血・活血・清熱涼血）、津液の治法（滋陰・生津・利水・化痰）、統一比較フォーマット（8項目）、不足と停滞の同時処理」を学び、不足（虚）と停滞（実）、および寒熱の座標を踏まえて、血・津液の治法を客観的に比較・選定できることを目指します。"
    },
    {
      "id": "lecture-treatment-6-q2",
      "question": "活血と気への治法を組み合わせる伝統的な説明を読む際、適切なのはどれですか？",
      "options": [
        "活血を選べば、すべての人に補気と行気も同じ比率で加える",
        "気血の関係は伝統的な選定理由として比較し、個別条件や効果の評価を別に確認する",
        "気は血液を押す測定済みの物理力なので、組合せの安全性も証明されている"
      ],
      "correctIndex": 1,
      "explanation": "気は血の帥という説明は伝統理論内の関係です。組み合わせれば安全で持続的な活血効果が得られるという保証にはならず、具体的な介入には個別の評価が必要です。",
      "relatedSectionTitle": "第2節：血の操作 ― 「祛瘀生新（きょおせいしん）」の力学"
    },
    {
      "id": "lecture-treatment-6-q3",
      "question": "養血と活血の目的を比較した説明として適切なのはどれですか？",
      "options": [
        "養血は停滞を扱い、活血は養い潤す働きの不足を扱う",
        "養血と活血は同じ目的であり、対象となる伝統分類を区別しない",
        "養血は養い潤す働きの不足、活血は血の停滞を扱う伝統的な目的である"
      ],
      "correctIndex": 2,
      "explanation": "不足と停滞という異なる観点を比較します。血虚・瘀血は貧血・血栓の同義語ではなく、養血・活血という名称から検査値の改善や特定生薬の安全性・必要性を保証しません。",
      "relatedSectionTitle": "第1節：血・津液の4大治法 比較マトリクス"
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
        "伝統的な関係、治法の目的、選定理由と不足情報を分ける",
        "関係図に合う治法名が決まれば、臓器の機能回復も確認できる",
        "臓腑名が同じなら、症状や個別条件に関係なく同じ方法を選ぶ"
      ],
      "correctIndex": 0,
      "explanation": "臓腑相関は伝統的な説明モデルとして扱います。治法の名称と実際の生理機序や機能回復を同一視せず、効果や安全性は別に評価します。",
      "relatedSectionTitle": "第2節：機能間連携の再建 ― 4大臓腑相関治法"
    },
    {
      "id": "lecture-treatment-7-q2",
      "question": "「肝と脾の関係の失調」という伝統的な整理に、疎肝健脾を対応させる説明はどれですか？",
      "options": [
        "肝だけを対象とし、脾との関係や不足は扱わない",
        "肝の疏泄と脾の運化を関連づけ、双方を扱う目的を示す",
        "腎の蔵精と心の主血脈だけを関連づけて扱う"
      ],
      "correctIndex": 1,
      "explanation": "疎肝健脾・抑木扶土は肝脾の関係を扱う伝統的な治法の表現です。実際の肝臓と脾臓への機序や相互干渉の解消を証明した説明ではありません。",
      "relatedSectionTitle": "1. 抑木扶土（よくぼくふど）／ 疎肝健脾"
    },
    {
      "id": "lecture-treatment-7-q3",
      "question": "健脾益気という伝統的な治法の目的はどれですか？",
      "options": [
        "肝の疏泄の停滞を和らげることを中心に表す",
        "腎陰を滋養して肝との関係を扱うことを中心に表す",
        "脾の運化と気の働きの不足を補うことを中心に表す"
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
        "伝統的な関係を用いた理由、作用機序の仮説、個別の安全評価を分ける",
        "経絡に合う選穴であれば、作用機序と安全性が証明されたと説明する",
        "経穴名を多く列挙することで、選定理由と評価の計画に代える"
      ],
      "correctIndex": 0,
      "explanation": "選定理由と実際の機序・効果の証明は異なります。局所・遠隔、要穴の関係を比較しながら、個別条件と不足情報も示します。",
      "relatedSectionTitle": "第1節：配穴の3大基本ディメンション"
    },
    {
      "id": "lecture-treatment-8-q2",
      "question": "原絡配穴（主客配穴）の伝統的な組合せはどれですか？",
      "options": [
        "主となる経絡の絡穴と、表裏関係にある経絡の原穴",
        "主となる経絡の原穴と、表裏関係にある経絡の絡穴",
        "同じ経絡の原穴と、その経絡自身の絡穴"
      ],
      "correctIndex": 1,
      "explanation": "原穴を主、表裏関係にある経絡の絡穴を客とする伝統的な組合せです。名称の原則を学ぶ問題で、併用により治療効果が飛躍的に高まることや臓腑の調整を保証しません。",
      "relatedSectionTitle": "1. 原絡配穴（げんらくはいけつ：主客配穴）"
    },
    {
      "id": "lecture-treatment-8-q3",
      "question": "遠隔穴を検討する際、伝統的な選定理由と作用機序を分けた説明はどれですか？",
      "options": [
        "経絡に沿って選んだことにより、その穴で下行性抑制が起きたと確認できる",
        "離れた穴を選べば局所の危険を避けられるため、個別の安全確認を省ける",
        "経絡や要穴の関係は選定理由であり、実際の鎮痛機序・効果・安全性は別に評価する"
      ],
      "correctIndex": 2,
      "explanation": "選定理由があることと、機序・効果が確認されたことは異なります。遠隔穴でも安全の保証にはなりません。経穴の位置・所属も混同せず確認します（崑崙BL60は足関節後外側、後渓SI3は手の小腸経）。",
      "relatedSectionTitle": "第1節：配穴の3大基本ディメンション"
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
      "question": "【介入方法と刺激量を設計する】の基本として、最も適切な理解はどれですか？",
      "options": [
        "機械的な計算式に依存せず、患者の感受性や安全制約を踏まえて最適な介入方法と刺激量を論理的に設計できる",
        "最初に考えた仮説に合う情報を中心に集め、合わない所見の確認は後回しにする",
        "一つの症状や所見だけで判断を確定し、経過や他の情報との照合を省く"
      ],
      "correctIndex": 0,
      "explanation": "本レッスンでは「鍼（毫鍼・接触鍼・刺絡等）と灸（透熱灸・温灸・知熱灸等）の選択、刺激量の6大検討項目、体質感受性（ドーゼ）の個人差、安全上の絶対制約」を学び、機械的な計算式に依存せず、患者の感受性や安全制約を踏まえて最適な介入方法と刺激量を論理的に設計できることを目指します。"
    },
    {
      "id": "lecture-treatment-9-q2",
      "question": "施術後に倦怠感やめまいの報告があった場合、適切な評価はどれですか？",
      "options": [
        "正気が消耗したという説明だけで原因を確定し、記録する",
        "有害事象や病状変化も検討し、程度・経過・安全性を確認する",
        "症状が後から出たため施術との関係はないと判断し、記録しない"
      ],
      "correctIndex": 1,
      "explanation": "倦怠感やめまいを好転反応や刺激量の問題だけで説明せず、有害事象や他の原因を検討します。小さい刺激でも損傷や熱傷等のリスクは残り、継続・保留・受診を個別に判断します。",
      "relatedSectionTitle": "小さい刺激でも安全の保証にはならない"
    },
    {
      "id": "lecture-treatment-9-q3",
      "question": "【個別の安全評価】体格が小さく刺激に不安がある患者の初期計画として、最も適切なものはどれですか？",
      "options": [
        "「効かせるためには痛みに耐えさせることが必要だ」として、太い針で激しい得気を与えて気絶させる",
        "最初から全身に50本以上の針を刺して30分間放置する",
        "解剖・体格・持病・服薬・本人の不安や同意を確認し、必要なら施術を保留する。固定の穴数や低刺激だけで安全と決めない"
      ],
      "correctIndex": 2,
      "explanation": "個人差に配慮し、具体的な方法とリスクを説明します。低刺激であれば安全という保証や、全員に共通の穴数・深度は設けられません。"
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
      "question": "【生活背景・病因への対応を組み込む】の基本として、最も適切な理解はどれですか？",
      "options": [
        "治療室内だけで完結しない病因への対応を提案する",
        "最初に考えた仮説に合う情報を中心に集め、合わない所見の確認は後回しにする",
        "一つの症状や所見だけで判断を確定し、経過や他の情報との照合を省く"
      ],
      "correctIndex": 0,
      "explanation": "本レッスンでは「持続する負荷、生活の調整、セルフケア、他職種との連携」を学び、治療室内だけで完結しない病因への対応を提案することを目指します。"
    },
    {
      "id": "lecture-treatment-10-q2",
      "question": "生活背景への対応を計画に含める目的として適切なのはどれですか？",
      "options": [
        "生活習慣がすべての根本原因であると説明して、医療評価の役割に代える",
        "症状との関係の候補と実行可能な調整を本人と検討し、変化を評価する",
        "伝統的な分類に合う生活指導を一律に示し、本人の事情は確認しない"
      ],
      "correctIndex": 1,
      "explanation": "生活背景は関連する可能性のある情報です。生活調整で根本治療が完結する、調整しなければ再発が不可避という断定を避け、本人の文脈と必要な医療を確認します。",
      "relatedSectionTitle": "2. 生活指導が失敗する原因と「合意形成」の技術"
    },
    {
      "id": "lecture-treatment-10-q3",
      "question": "慢性痛が再び気になったという報告を受けた際、生活背景の扱いとして適切なのはどれですか？",
      "options": [
        "症状が戻ったことだけで、生活態度が原因と確定する",
        "施術が一時的に役立ったため、病名や介入の再評価は省く",
        "負荷や睡眠などの変化を本人と確認し、他の原因や介入計画の見直しも検討する"
      ],
      "correctIndex": 2,
      "explanation": "再発や不持続には複数の説明があり得ます。生活背景を原因と決めつけず、実行可能な調整を合意し、症状・機能・有害な反応を評価します。効果を施術と負荷軽減の単純な和で計算しません。",
      "relatedSectionTitle": "1. 治療室外の「持続的病因」を構造化する"
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
      "question": "【評価・継続・変更・終了を設計する】の基本として、最も適切な理解はどれですか？",
      "options": [
        "治療への反応を客観的に評価し、次の行動を決める",
        "最初に考えた仮説に合う情報を中心に集め、合わない所見の確認は後回しにする",
        "一つの症状や所見だけで判断を確定し、経過や他の情報との照合を省く"
      ],
      "correctIndex": 0,
      "explanation": "本レッスンでは「評価の時期、客観的な指標、継続・変更・終了の判断基準、有害事象への対応」を学び、治療への反応を客観的に評価し、次の行動を決めることを目指します。"
    },
    {
      "id": "lecture-treatment-11-q2",
      "question": "【治療反応の評価と計画変更】初回の施術後に患者が「翌朝、少しだるさが出たが、その後に長年の首の重みが劇的に軽くなり熟睡できた」と報告した場合の臨床的評価はどれですか？",
      "options": [
        "施術は大失敗であり、直ちに治療方針を180度変更すべき",
        "首の症状とだるさを別々に記録し、だるさの程度・持続時間・生活への影響を確認して、継続・刺激量変更・中止を判断する",
        "首の症状が治まったので、二度と来院する必要はないと治療を終了する"
      ],
      "correctIndex": 1,
      "explanation": "施術後のだるさを改善の証拠や「好転反応」と決めつけません。主訴の改善、有害な反応、自然経過などを分けて評価し、患者の希望と安全性を踏まえて計画を調整します。"
    },
    {
      "id": "lecture-treatment-11-q3",
      "question": "継続中の施術後に症状の悪化が報告された場合、適切なのはどれですか？",
      "options": [
        "予定した回数が終わるまでは、同じ計画を続けてから評価する",
        "弁証の候補だけを変更し、施術や病状変化の可能性は確認しない",
        "安全性と有害事象・病状変化を確認し、保留・中止・受診を含めて計画を見直す"
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
      "question": "【総合演習・次章への接続】の基本として、最も適切な理解はどれですか？",
      "options": [
        "想定事例に対して、理由を示して治療計画を立てる",
        "最初に考えた仮説に合う情報を中心に集め、合わない所見の確認は後回しにする",
        "一つの症状や所見だけで判断を確定し、経過や他の情報との照合を省く"
      ],
      "correctIndex": 0,
      "explanation": "本レッスンでは「診断から治療計画までの統合、治療計画の比較、第11章（統合症例・再評価）への位置づけ」を学び、想定事例に対して、理由を説明できる治療計画を立てることを目指します。"
    },
    {
      "id": "lecture-treatment-12-q2",
      "question": "【統合症例・再評価への接続】次章の架空例で確認する学習課題として、適切なのはどれですか？",
      "options": [
        "最初の計画を情報が変わっても変更しない",
        "安全性、観察した情報、計画と反応を振り返り、根拠と不足情報を分けて見直す",
        "Webの修了を診療技能の認定として、そのまま患者に施術する"
      ],
      "correctIndex": 1,
      "explanation": "次章は架空例による統合と再評価の演習です。Webでの理解と実際の資格・診療技能を区別し、計画を柔軟に振り返ることを学びます。",
      "relatedSectionTitle": "6. 次章「第11章 統合症例・再評価」への展望"
    },
    {
      "id": "lecture-treatment-12-q3",
      "question": "【総合治療計画の立案と共有】診断から導かれた治療計画を患者に説明し合意形成（インフォームド・コンセント）を行う際、最も不可欠な要素は何ですか？",
      "options": [
        "専門的な古典の漢文をそのまま読み聞かせ、患者が理解できなくても無理やりサインさせること",
        "「1回で絶対に一生治る」と非科学的な誇大広告の約束をして期待を煽ること",
        "現状の身体の状態（見立て）、施術の目的、予想される期間と頻度、家庭でのセルフケア方針、および施術後に起こり得る有害な反応と対応方法を日常の言葉で分かりやすく提示すること"
      ],
      "correctIndex": 2,
      "explanation": "患者との信頼関係と治療成果は、専門用語を日常語に翻訳し、見通しとセルフケアの役割分担を透明に共有する合意形成によって支えられます。"
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
        "安全確認から情報・仮説・計画・評価をつなぎ、新情報があれば前の判断も見直す",
        "最初に安全確認を終えれば、その後の新症状は最後の評価まで保留する",
        "最初の計画を統一して続けるため、追加情報は終了時の記録にだけ使う"
      ],
      "correctIndex": 0,
      "explanation": "各段階は一方向に終わる手順ではありません。新情報や悪化があれば安全性や仮説へ戻ります。Webでの判断の学習と実際の診療技能も区別します。",
      "relatedSectionTitle": "1. 臨床意思決定の10段階プロセス（全体像）"
    },
    {
      "id": "lecture-practice-1-q2",
      "question": "初回の架空計画を作る際、刺激への反応が不明なことをどう扱いますか？",
      "options": [
        "低刺激と書けば安全性が確保されるため、他の条件の確認を省く",
        "持病・服薬・解剖学的リスクや同意を確認し、不足情報があれば保留や紹介も検討する",
        "同じ証名の人の前例を使い、個別の反応や不安を確認しない"
      ],
      "correctIndex": 1,
      "explanation": "控えめな刺激や遠隔穴でも安全の保証にはなりません。個別のリスクと対応範囲を確認して計画を比較する学習であり、Webだけで実施できる技能を認定するものではありません。",
      "relatedSectionTitle": "3. Web推論（設計判断）とベッドサイド実技の峻別"
    },
    {
      "id": "lecture-practice-1-q3",
      "question": "施術直後に楽になったという架空の報告から、追加で確認することはどれですか？",
      "options": [
        "直後の報告だけで完治と記録し、後の経過を確認しない",
        "変化があれば選んだ病機と作用機序が正しかったと記録する",
        "持続時間、生活機能、有害な反応、他の変化を記録して再評価する"
      ],
      "correctIndex": 2,
      "explanation": "改善の報告は評価材料ですが、完治や作用機序の証明ではありません。自然経過や他の介入などもあり得るため、時間を通した変化と安全性を確認します。",
      "relatedSectionTitle": "2. 手順の遵守（プロトコル）と自己修正ループ"
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
      "question": "【症例情報を読み解く】の基本として、最も適切な理解はどれですか？",
      "options": [
        "事実と解釈を分け、重要情報を要約する",
        "最初に考えた仮説に合う情報を中心に集め、合わない所見の確認は後回しにする",
        "一つの症状や所見だけで判断を確定し、経過や他の情報との照合を省く"
      ],
      "correctIndex": 0,
      "explanation": "本レッスンでは「主訴、経過、生活への影響、既往、本人の希望」を学び、事実と解釈を分け、重要情報を要約することを目指します。"
    },
    {
      "id": "lecture-practice-2-q2",
      "question": "問診票に「私の頭痛は低血圧のせいです」とある場合、適切な記録はどれですか？",
      "options": [
        "低血圧が原因と確認された情報として記録し、発症経過は聞かない",
        "本人の原因についての考えとして記録し、痛みの経過や診察・検査の有無を別に確認する",
        "原因についての考えは不要な情報として除き、主訴の名称だけ残す"
      ],
      "correctIndex": 1,
      "explanation": "本人がそう考えていることと、原因が確認されたことは異なります。訴え、観察・検査の情報、原因の候補を分けます。本人の報告を客観的な身体所見や病機の証明と呼び替えません。",
      "relatedSectionTitle": "1. 事実と解釈の峻別フレームワーク"
    },
    {
      "id": "lecture-practice-2-q3",
      "question": "複数の訴えがある架空例で、今回の主訴を整理する方法はどれですか？",
      "options": [
        "症状の一覧から、施術者が扱いやすいものを先に選んで本人へ知らせる",
        "症状の数が最も多い部位を機械的に選び、生活への支障は確認しない",
        "本人が最も困ることと生活への影響を確認し、安全性を含めて優先事項を共有する"
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
      "question": "【最初の対応を決める】の基本として、最も適切な理解はどれですか？",
      "options": [
        "施術・保留・紹介などの対応を理由とともに示す",
        "最初に考えた仮説に合う情報を中心に集め、合わない所見の確認は後回しにする",
        "一つの症状や所見だけで判断を確定し、経過や他の情報との照合を省く"
      ],
      "correctIndex": 0,
      "explanation": "本レッスンでは「緊急性、対応範囲、追加確認、医療機関との連携」を学び、施術・保留・紹介などの対応を理由とともに選ぶことを目指します。"
    },
    {
      "id": "lecture-practice-3-q2",
      "question": "頭痛の架空例で、発症の仕方や新しい神経症状などが未確認の場合、次に行うことはどれですか？",
      "options": [
        "慢性という記載があるため危険兆候はないと判断し、配穴へ進む",
        "安全性に関わる情報を優先して確認し、必要に応じて保留・受診を検討する",
        "本人が施術を希望すれば適応範囲内と判断し、確認は後回しにする"
      ],
      "correctIndex": 1,
      "explanation": "分類や希望だけで緊急性を除外しません。本講の頭痛の学習例に沿って、安全性の情報と対応範囲を先に確認します。",
      "relatedSectionTitle": "1. 頭痛におけるレッドフラッグ（危険信号）のチェックリスト"
    },
    {
      "id": "lecture-practice-3-q3",
      "question": "架空例に「発熱・麻痺はない」と記載されている場合、適切な結論はどれですか？",
      "options": [
        "二つがないため、重大な病気は除外され施術可能と確定する",
        "危険兆候が二つなくても、東洋医学的な分類があれば受診を省ける",
        "確認された情報の範囲として記録し、発症経過や他の不足情報と合わせて対応を判断する"
      ],
      "correctIndex": 2,
      "explanation": "一部の危険兆候が記載されていないことは、緊急性や病気をすべて除外したことではありません。症例の不足情報と判断を保留する条件を示します。",
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
      "question": "【問診と観察を進める】の基本として、最も適切な理解はどれですか？",
      "options": [
        "仮説を比較するために必要な情報を集める",
        "最初に考えた仮説に合う情報を中心に集め、合わない所見の確認は後回しにする",
        "一つの症状や所見だけで判断を確定し、経過や他の情報との照合を省く"
      ],
      "correctIndex": 0,
      "explanation": "本レッスンでは「質問の選択、四診情報の追加、情報の不足」を学び、仮説を区別するために必要な情報を集めることを目指します。"
    },
    {
      "id": "lecture-practice-4-q2",
      "question": "【問診技術：オープンクエスチョンとクローズドクエスチョンの使い分け】主訴が漠然としていて話が脱線しやすい患者に対し、限られた時間で正確な病態を把握するための問診戦略はどれですか？",
      "options": [
        "最初から最後まで「はい」「いいえ」だけで答えられる質問しかせず、患者の自発的な言葉を一切封じる",
        "最初は開かれた質問（オープン）で主訴の文脈を語らせた後、寒熱・飲食・睡眠・痛みの性状などの鑑別フェーズでは「温めると楽ですか？冷やすと楽ですか？」のように焦点を絞った選択的質問（クローズド）へ移行する",
        "問診は行わず、患者に30分間自由に独白させて終了する"
      ],
      "correctIndex": 1,
      "explanation": "問診の構造化です。導入では自由回答（オープン）で患者の世界観や主訴を把握し、病態鑑別フェーズでは絞り込み質問（クローズド）を的確に配置して鑑別仮説を検証します。"
    },
    {
      "id": "lecture-practice-4-q3",
      "question": "問診中に姿勢・顔色・声・呼吸も観察する際、適切な情報の統合はどれですか？",
      "options": [
        "顔色や声から訴えの真偽を判定し、本人の報告を採否で分類する",
        "観察した印象を気血の状態と確定し、問診内容より優先する",
        "本人の報告と観察した特徴を別に記録し、条件や別の説明を確かめる"
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
      "question": "【仮説を比較して弁証する】の基本として、最も適切な理解はどれですか？",
      "options": [
        "暫定的な証と、残る不確実性を示す",
        "最初に考えた仮説に合う情報を中心に集め、合わない所見の確認は後回しにする",
        "一つの症状や所見だけで判断を確定し、経過や他の情報との照合を省く"
      ],
      "correctIndex": 0,
      "explanation": "本レッスンでは「八綱、気血津液、臓腑・経絡、支持情報と反証」を学び、暫定的な証と、残る不確実性を示すことを目指します。"
    },
    {
      "id": "lecture-practice-5-q2",
      "question": "「腰の痛みと足の冷え」という報告から複数の伝統的な候補を比較する際、適切なのはどれですか？",
      "options": [
        "年齢だけで腎陽虚を確定し、天候や活動との関係は聞かない",
        "経過、天候・活動との関係、他の所見を並べ、支持・反証・不足を分ける",
        "痛みと冷えだけで寒湿痺阻を確定し、対応する治法を選ぶ"
      ],
      "correctIndex": 1,
      "explanation": "類似した報告でも候補や他の説明は複数あります。少数の情報で分類や正反対の治法を確定せず、安全性や必要な医学的評価も確認します。",
      "relatedSectionTitle": "1. 【共通模擬症例：第4段階 開示】"
    },
    {
      "id": "lecture-practice-5-q3",
      "question": "新しい所見で初期の証の候補が支持された場合、統合の仕方として適切なのはどれですか？",
      "options": [
        "支持所見があるので確定証とし、反証や不足情報は記録しない",
        "より詳しい証名に変えることで、残る不確実性の記録に代える",
        "支持情報と反証・不足を残し、現時点の暫定的な候補と見直す条件を示す"
      ],
      "correctIndex": 2,
      "explanation": "本講の到達目標は暫定的な証と不確実性を示すことです。舌や脈が候補に合っても、その所見だけで病名や原因が確定したとは扱いません。",
      "relatedSectionTitle": "1. 【共通模擬症例：第4段階 開示】"
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
      "question": "【治療目標と優先順位を決める】の基本として、最も適切な理解はどれですか？",
      "options": [
        "今回の目標と中期的な目標を分ける",
        "最初に考えた仮説に合う情報を中心に集め、合わない所見の確認は後回しにする",
        "一つの症状や所見だけで判断を確定し、経過や他の情報との照合を省く"
      ],
      "correctIndex": 0,
      "explanation": "本レッスンでは「本人の希望、本標、生活機能、実行可能性」を学び、今回の目標と中期的な目標を分けることを目指します。"
    },
    {
      "id": "lecture-practice-6-q2",
      "question": "生活機能を含む短期目標の書き方として、最も評価しやすいのはどれですか？",
      "options": [
        "1か月後には、今より身体の調子を整えて元気な状態にする",
        "1か月後に、本人と決めた散歩の時間や回数を確認して目標の達成状況を見直す",
        "1か月後には、伝統的な分類を変えて体質の状態を改善する"
      ],
      "correctIndex": 1,
      "explanation": "本人にとって大切な具体的な活動と評価時期を共有します。目標は達成を保証する約束ではなく、実行可能性と安全性を確認して修正するものです。",
      "relatedSectionTitle": "2. 短期目標と中長期目標の二層設計"
    },
    {
      "id": "lecture-practice-6-q3",
      "question": "「明日の仕事に行きたい」という急な腰痛の希望を扱う際、適切な合意形成はどれですか？",
      "options": [
        "希望に合わせて、施術で明日までに痛みを半減できると約束する",
        "希望より体質改善を優先し、本人の仕事や動作の相談は次回へ回す",
        "安全性と受診の必要性を確認し、直近の生活目標と見通しの不確実性を共有する"
      ],
      "correctIndex": 2,
      "explanation": "希望は重要な情報ですが、改善率や出社時期を保証できる根拠にはなりません。急な症状では安全確認を先に行い、短期・中期目標を評価可能な形で合意します。",
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
      "question": "【方法・配穴・刺激条件を計画する】の基本として、最も適切な理解はどれですか？",
      "options": [
        "各介入の目的と選定理由を説明する",
        "最初に考えた仮説に合う情報を中心に集め、合わない所見の確認は後回しにする",
        "一つの症状や所見だけで判断を確定し、経過や他の情報との照合を省く"
      ],
      "correctIndex": 0,
      "explanation": "本レッスンでは「治則から具体的な選択肢への展開、負担と制約」を学び、各介入の目的と選定理由を説明することを目指します。"
    },
    {
      "id": "lecture-practice-7-q2",
      "question": "【胸背部の安全確認】肩井や背部の経穴で気胸などの損傷リスクを検討する際、最も適切な考え方はどれですか？",
      "options": [
        "直刺で深く突き刺し、骨に当たるまで押し込む",
        "局所解剖、体格・体位などを個別に確認し、必要なら施術を保留する。斜刺・横刺や骨の存在だけでは安全を保証できない",
        "目を閉じて感覚だけで素早く打ち込む"
      ],
      "correctIndex": 1,
      "explanation": "全日本鍼灸学会2025年版（印刷頁14、33、35）は個人体格を考慮することや気胸リスクへの注意を示しています。骨度分寸は取穴位置の基準であり、安全な深度を決める計測値ではありません。"
    },
    {
      "id": "lecture-practice-7-q3",
      "question": "【手技・配穴・刺激条件のプログラミング】初診の患者に対する施術プログラムの組み立てとして、安全管理上最も推奨される手順はどれですか？",
      "options": [
        "いきなり患部の一番痛む場所に太い針を根元まで刺入し、激しく揺り動かして患者の反応を試す",
        "施術中に患者の顔色や脈は一切見ず、手元の時計だけを見て機械的に針を刺す",
        "救急症状や禁忌・注意事項、局所解剖と本人の同意を確認し、必要なら施術を保留・紹介する"
      ],
      "correctIndex": 2,
      "explanation": "遠隔穴や低刺激から始めても安全が保証されるわけではありません。具体的な方法の前に医療評価の必要性、個別のリスク、本人の同意を確認します。"
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
      "question": "【説明・合意・記録を行う】の基本として、最も適切な理解はどれですか？",
      "options": [
        "相手に理解できる言葉で計画を説明する",
        "最初に考えた仮説に合う情報を中心に集め、合わない所見の確認は後回しにする",
        "一つの症状や所見だけで判断を確定し、経過や他の情報との照合を省く"
      ],
      "correctIndex": 0,
      "explanation": "本レッスンでは「見通し、不確実性、選択肢、同意、施術記録」を学び、相手に理解できる言葉で計画を説明することを目指します。"
    },
    {
      "id": "lecture-practice-8-q2",
      "question": "「肝気鬱結」という伝統的な候補を本人へ説明する際、適切なのはどれですか？",
      "options": [
        "確認していない自律神経の異常を原因として、分かりやすい現代用語で断定する",
        "伝統的な見立てと未確認事項を日常語で説明し、実際の原因や機序と区別する",
        "専門的な証名だけを伝え、本人が理解できたかの確認は省く"
      ],
      "correctIndex": 1,
      "explanation": "日常語への言い換えで、未確認の生理機序を追加してはいけません。見立ての範囲、別の説明、効果や安全性の限界を共有し、本人の理解を確認します。",
      "relatedSectionTitle": "1. 専門用語を日常語に翻訳する技術"
    },
    {
      "id": "lecture-practice-8-q3",
      "question": "【術前・術後の説明と合意形成】施術前後の説明において、患者の不安を解消し安心感を提供するために最も効果的なコミュニケーションはどれですか？",
      "options": [
        "「何も聞かずに黙って私の技術を信じなさい」と一切の説明を拒否する",
        "施術後にどんな異変が起きてもすべて患者自身の自己責任であると冷たく突き放す",
        "目的と方法、期待できる効果の限界、起こり得る有害な反応、体調変化時の連絡・受診方法を説明し、患者の理解と同意を確認する"
      ],
      "correctIndex": 2,
      "explanation": "症状悪化を「好転反応」として正当化しません。説明は不安を抑えるだけでなく、患者が利益・限界・リスクを理解し、自分で施術を受けるか決められるように行います。"
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
      "question": "【実施中・実施後の反応を評価する】の基本として、最も適切な理解はどれですか？",
      "options": [
        "変化を記録し、必要な対応を判断する",
        "最初に考えた仮説に合う情報を中心に集め、合わない所見の確認は後回しにする",
        "一つの症状や所見だけで判断を確定し、経過や他の情報との照合を省く"
      ],
      "correctIndex": 0,
      "explanation": "本レッスンでは「自覚症状、生活機能、身体所見、好ましくない反応」を学び、変化を記録し、必要な対応を判断することを目指します。"
    },
    {
      "id": "lecture-practice-9-q2",
      "question": "【施術中の失神・前失神への対応】施術中に急な吐き気、冷汗、顔面蒼白が出た場合、最優先の対応はどれですか？",
      "options": [
        "原因を確かめずに刺激を強めて施術を続ける",
        "施術を中止し、安全に抜鍼して反応・呼吸を確認する。状態に応じて安全な体位をとり、回復しない場合は救急対応を行う",
        "患者を立たせて歩かせ、意識が不明瞭でも飲み物を飲ませる"
      ],
      "correctIndex": 1,
      "explanation": "迷走神経反射などが考えられますが、原因を決めつけません。施術を中止し、安全に抜鍼し、反応と正常な呼吸を確認します。反応があり単純な失神が疑われる場合は、外傷や呼吸困難がなければ仰向けで下肢を上げます。意識が不明瞭な人には飲食させません。正常な呼吸がない場合は119番通報・AED・心肺蘇生、回復しない場合や胸痛などを伴う場合も救急対応を優先します。"
    },
    {
      "id": "lecture-practice-9-q3",
      "question": "【施術中・施術後の反応評価】次のうち、苦痛の軽減を確認する材料として適切な組合せはどれですか？",
      "options": [
        "患者が冷や汗を流して顔面蒼白になり、あくびを連発して吐き気を訴えている",
        "患者が恐怖で全身をガタガタ震わせ、血圧が200近くまで跳ね上がっている",
        "本人が楽になったと話し、呼吸や筋緊張が落ち着いている。これらを主訴・生活動作・有害な反応と合わせて評価する"
      ],
      "correctIndex": 2,
      "explanation": "呼吸、筋緊張、温感などは観察の材料ですが、適正刺激量や自律神経の状態を単独で証明しません。本人の評価、生活機能、持続時間、有害な反応を合わせて判断します。"
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
      "question": "【次回の計画を修正する】の基本として、最も適切な理解はどれですか？",
      "options": [
        "継続・変更・中止・紹介の理由を示す",
        "最初に考えた仮説に合う情報を中心に集め、合わない所見の確認は後回しにする",
        "一つの症状や所見だけで判断を確定し、経過や他の情報との照合を省く"
      ],
      "correctIndex": 0,
      "explanation": "本レッスンでは「改善・不変・悪化、新情報、仮説の見直し」を学び、継続・変更・中止・紹介の理由を示すことを目指します。"
    },
    {
      "id": "lecture-practice-10-q2",
      "question": "症状が不変だった、または悪化したという報告を受けた場合、再評価に必要なものはどれですか？",
      "options": [
        "不変と悪化を同じものと扱い、配穴の変更だけを検討する",
        "変化の程度と経過、安全性、仮説・介入・生活背景を確認し、保留や紹介も検討する",
        "分類が整合していれば、計画は正しいとして同じ介入を続ける"
      ],
      "correctIndex": 1,
      "explanation": "不変と悪化は分けて評価します。有害事象や病状変化、他の原因もあり得るため、反応を弁証や刺激量のずれだけで説明しません。",
      "relatedSectionTitle": "1. 経過分析の3つの視点：何が良く、何が戻ったか？"
    },
    {
      "id": "lecture-practice-10-q3",
      "question": "「施術の翌日まで重だるくて起き上がれなかった」という報告への次の対応はどれですか？",
      "options": [
        "好転反応として計画を継続し、主訴の改善だけを評価する",
        "刺激過多と原因を確定し、方法を弱めれば継続できると判断する",
        "程度・経過・併発症状を確認して安全性を評価し、保留・中止・必要な受診も検討する"
      ],
      "correctIndex": 2,
      "explanation": "施術後という前後関係だけでは刺激過多と確定できません。有害事象や別の原因を確認し、好転反応として正当化したり、刺激を弱めるだけで安全と判断したりしません。",
      "relatedSectionTitle": "1. 経過分析の3つの視点：何が良く、何が戻ったか？"
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
      "question": "【経過全体を管理する】の基本として、最も適切な理解はどれですか？",
      "options": [
        "単回の反応に偏らず、治療の必要性を再評価する",
        "最初に考えた仮説に合う情報を中心に集め、合わない所見の確認は後回しにする",
        "一つの症状や所見だけで判断を確定し、経過や他の情報との照合を省く"
      ],
      "correctIndex": 0,
      "explanation": "本レッスンでは「複数回の評価、セルフケア、連携、終了の判断」を学び、単回の反応に偏らず、治療の必要性を再評価することを目指します。"
    },
    {
      "id": "lecture-practice-11-q2",
      "question": "主訴が落ち着き生活に支障がなくなった架空例で、経過管理として適切なのはどれですか？",
      "options": [
        "再発予防には定期施術が必要と決め、本人の希望を聞かず通院を続ける",
        "目標達成と安全性、本人の希望を確認し、間隔変更や終了、再相談の条件を共有する",
        "主訴がないため他の情報は確認せず、相談の必要性もないと決める"
      ],
      "correctIndex": 1,
      "explanation": "目標が達成されたら施術の必要性を再評価します。全員に予防的メンテナンスや固定の通院頻度を求めず、自立支援と再相談の条件を共有します。",
      "relatedSectionTitle": "1. 治療終了（卒業）への4フェーズ・ロードマップ"
    },
    {
      "id": "lecture-practice-11-q3",
      "question": "本講の通院間隔を示す例を、別の人の計画へ使う際に適切なのはどれですか？",
      "options": [
        "例の週1回・隔週・月1回を、そのまま全員の標準スケジュールにする",
        "予定回数の消化を終了の基準にし、生活機能の達成は確認しない",
        "例は架空の計画として読み、目標、安全性、経過と希望から必要性を個別に見直す"
      ],
      "correctIndex": 2,
      "explanation": "回数や間隔は万人に適用する処方ではありません。終了を含む選択肢を共有し、漫然と通院を長引かせず、必要な受診や再相談の条件を確認します。",
      "relatedSectionTitle": "1. 治療終了（卒業）への4フェーズ・ロードマップ"
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
      "question": "【総合ケース演習・修了課題】の基本として、最も適切な理解はどれですか？",
      "options": [
        "判断の根拠と修正過程を含む症例記録を完成させる",
        "最初に考えた仮説に合う情報を中心に集め、合わない所見の確認は後回しにする",
        "一つの症状や所見だけで判断を確定し、経過や他の情報との照合を省く"
      ],
      "correctIndex": 0,
      "explanation": "本レッスンでは「初回から終了までの一連の意思決定」を学び、判断の根拠と修正過程を含む症例記録を完成させることを目指します。"
    },
    {
      "id": "lecture-practice-12-q2",
      "question": "【1. 異なる判断が求められる7つの臨床パターン】複数の症状が記された架空例を振り返るとき、適切なのはどれですか？",
      "options": [
        "すべてを必ず一つの病機にまとめ、介入の効果も確定する",
        "支持する情報と反証、不足情報を分け、必要に応じて判断を保留する",
        "症状の数だけ経穴を増やせば原因を調べる必要はない"
      ],
      "correctIndex": 1,
      "explanation": "複数の症状が同じ原因とは限りません。根拠と不確実性を記録し、安全確認と必要な医療評価を優先します。",
      "relatedSectionTitle": "1. 異なる判断が求められる7つの臨床パターン"
    },
    {
      "id": "lecture-practice-12-q3",
      "question": "【学習の修了と次の学び】全11章のWeb学習の修了について、適切なのはどれですか？",
      "options": [
        "国家資格を取得したことになる",
        "実際の診療技能が認定されたことになる",
        "学習の記録として扱い、資格や実際の診療能力の認定と区別する"
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

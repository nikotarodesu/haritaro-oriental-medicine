import { SymptomGuide } from "@/types/oriental";

export const SYMPTOM_GUIDANCE_SCOPE = "症状別ガイドでは、受診の目安と東洋医学の考え方を紹介します。ツボは位置や考え方を学ぶ例です。自分ではりを刺したり、お灸をしたりするための手順は扱いません。新しい症状が出たときや、今の症状が悪化したときは、セルフケアで受診を遅らせず、医療機関に相談してください。";

interface SafetyGuidance { message: string; sources: { title: string; url: string; section: string }[]; }

export const SYMPTOM_SAFETY_GUIDANCE: Record<string, SafetyGuidance> = {
  "headache-stiff-neck": {
    "message": "突然の激しい頭痛、意識の異常、急な手足の脱力や話しにくさがあるときは、すぐに119番へ連絡してください。頭痛が新しく始まったときや、いつもと違う、悪化していると感じるときは、首や肩のこりだけが原因だと自分で決めず、医療機関に相談してください。",
    "sources": [
      {
        "title": "消防庁：救急車利用マニュアル",
        "url": "https://www.fdma.go.jp/publication/portal/post2.html",
        "section": "ためらわず救急車を呼んでほしい症状（成人）"
      },
      {
        "title": "NHS：頭痛",
        "url": "https://www.nhs.uk/symptoms/headaches/",
        "section": "Urgent advice / Immediate action required"
      }
    ]
  },
  "stress-insomnia": {
    "message": "眠れず、生活への支障が続くときは、ストレスだけが原因だと自分で決めず、医療機関に相談してください。処方薬をやめるか、量を減らすかは、処方した医師と相談してください。",
    "sources": [
      {
        "title": "NHS：不眠",
        "url": "https://www.nhs.uk/conditions/insomnia/",
        "section": "See a GP / Treatment"
      }
    ]
  },
  "stomach-fatigue": {
    "message": "血を吐いた、大量に出血した、突然の激しい腹痛がある、激痛が続く、意識の異常があるときは、すぐに119番へ連絡してください。黒いタール状の便が出た、強い腹痛がある、失神のあと意識が戻っている場合は、すぐに医療機関を受診してください。食欲の低下や軟便が続くときも医療機関に相談してください。",
    "sources": [
      {
        "title": "消防庁：救急車利用マニュアル",
        "url": "https://www.fdma.go.jp/publication/portal/post2.html",
        "section": "ためらわず救急車を呼んでほしい症状（成人）"
      },
      {
        "title": "NIDDK：消化性潰瘍の症状と原因",
        "url": "https://www.niddk.nih.gov/health-information/digestive-diseases/peptic-ulcers-stomach-ulcers/symptoms-causes",
        "section": "Symptoms of complications / Causes"
      }
    ]
  },
  "menstrual-pain-chill": {
    "message": "激痛や多量の出血、失神があるときは、すぐに119番へ連絡してください。妊娠中や妊娠の可能性があるときに腹痛や出血があれば、産婦人科などの医療機関に相談してください。月経痛で生活に支障があるときや、出血が増えたときも婦人科へ相談してください。原因が分からず片脚だけが腫れたときは、早めに医療機関を受診してください。",
    "sources": [
      {
        "title": "NHS：妊娠中の出血",
        "url": "https://www.nhs.uk/pregnancy/common-symptoms/vaginal-bleeding/",
        "section": "Urgent advice / Immediate action required"
      },
      {
        "title": "NHS：足・脚のむくみ",
        "url": "https://www.nhs.uk/conditions/oedema/",
        "section": "Urgent advice / Immediate action required"
      }
    ]
  },
  "chronic-fatigue-lethargy": {
    "message": "急な息苦しさや胸の痛み、意識の異常があるときは、すぐに119番へ連絡してください。原因が分からない疲れが数週間続くときや、生活に支障がある、体重が減ったといった変化があるときは、医療機関に相談してください。",
    "sources": [
      {
        "title": "消防庁：救急車利用マニュアル",
        "url": "https://www.fdma.go.jp/publication/portal/post2.html",
        "section": "ためらわず救急車を呼んでほしい症状（成人）"
      },
      {
        "title": "NHS：持続する疲労",
        "url": "https://www.nhs.uk/symptoms/tiredness-and-fatigue/",
        "section": "See a GP / Causes"
      }
    ]
  },
  "lower-back-pain-sciatica": {
    "message": "腰や脚の痛みに、尿や便が出にくい、漏れる、会陰部の感覚が鈍いといった変化が新たに加わったときは、すぐに医療機関を受診してください。脚に力が入らなくなったときや、力の入りにくさが悪化するときも、ストレッチやツボ押しを試す前に受診してください。",
    "sources": [
      {
        "title": "NICE NG127：神経症状の認識と紹介",
        "url": "https://www.nice.org.uk/guidance/ng127/chapter/Recommendations-for-adults-aged-over-16",
        "section": "1.7.3 Severe low back pain together with other symptoms"
      }
    ]
  },
  "eye-strain-fatigue": {
    "message": "急に目が強く痛む、充血する、見え方が変わる、吐き気がするといった症状があるときは、すぐに眼科を受診してください。画面の見過ぎだけが原因だと自分で決めず、目を押したり温めたりする前に医療機関に相談してください。",
    "sources": [
      {
        "title": "NHS：緑内障",
        "url": "https://www.nhs.uk/conditions/glaucoma/",
        "section": "Symptoms / Immediate action required"
      }
    ]
  },
  "constipation-ibs": {
    "message": "血便や黒い便、体重減少、発熱、続く強い腹痛などがあるときは、すぐに医療機関を受診してください。腹痛や便通の変化だけで過敏性腸症候群（IBS）だと自分で決めず、医療機関に相談してください。",
    "sources": [
      {
        "title": "NIDDK：IBSの診断",
        "url": "https://www.niddk.nih.gov/health-information/digestive-diseases/irritable-bowel-syndrome/diagnosis",
        "section": "Medical history / Physical exam / Tests"
      }
    ]
  },
  "dizziness-tinnitus": {
    "message": "急なめまいに話しにくさ、手足の脱力、歩けないなどの症状が伴うときは、すぐに119番へ連絡してください。急に聞こえにくくなったときは、すぐに耳鼻科を受診してください。めまいや耳鳴りだけでメニエール病や水分の異常だと自分で決めず、医療機関に相談してください。",
    "sources": [
      {
        "title": "消防庁：救急車利用マニュアル",
        "url": "https://www.fdma.go.jp/publication/portal/post2.html",
        "section": "ためらわず救急車を呼んでほしい症状（成人）"
      },
      {
        "title": "NICE NG98：成人の難聴",
        "url": "https://www.nice.org.uk/guidance/ng98/chapter/recommendations",
        "section": "1.1.2 Sudden or rapid worsening of hearing loss"
      }
    ]
  },
  "climacteric-hot-flash": {
    "message": "急な胸の痛みや息苦しさがあるときは、すぐに119番へ連絡してください。のぼせや動悸が続くときは、更年期だけが原因だと自分で決めず、医療機関に相談してください。閉経後に出血があったときは、少量でも婦人科を受診してください。",
    "sources": [
      {
        "title": "消防庁：救急車利用マニュアル",
        "url": "https://www.fdma.go.jp/publication/portal/post2.html",
        "section": "ためらわず救急車を呼んでほしい症状（成人）"
      },
      {
        "title": "NHS：閉経後の出血",
        "url": "https://www.nhs.uk/symptoms/post-menopausal-bleeding/",
        "section": "See a GP"
      }
    ]
  },
  "allergic-rhinitis-hayfever": {
    "message": "急な息苦しさや口・喉の腫れ、意識の異常があるときは、すぐに119番へ連絡してください。",
    "sources": [
      {"title":"NHS：アナフィラキシー","url":"https://www.nhs.uk/conditions/anaphylaxis/","section":"Symptoms / Immediate action required"},
      {
        "title": "消防庁：救急車利用マニュアル",
        "url": "https://www.fdma.go.jp/publication/portal/post2.html",
        "section": "ためらわず救急車を呼んでほしい症状（成人）"
      }
    ]
  },
  "knee-joint-pain": {
    "message": "ひざが急に赤く腫れて熱を持つとき、関節痛と発熱があるとき、けがのあとに足へ体重をかけられないときは、早めに医療機関を受診してください。痛むひざを無理に伸ばしたり、強くもんだりしないでください。",
    "sources": [
      {
        "title": "NHS：膝の痛み",
        "url": "https://www.nhs.uk/symptoms/knee-pain/",
        "section": "Urgent advice"
      }
    ]
  }
};

export const SYMPTOMS: SymptomGuide[] = [
  {
    "id": "headache-stiff-neck",
    "title": "慢性的な頭痛・首肩こり",
    "category": "頭・首・肩",
    "summary": "頭重感や首肩のこわばり。姿勢や緊張が関わることもありますが、頭痛の原因はさまざまです。",
    "orientalMechanism": "伝統医学では「不通則痛」「気滞・瘀血」などの分類を用いて所見を整理します。この分類は血管の異常を証明したり、危険な頭痛を除外したりする検査ではありません。",
    "recommendedTsuboIds": [
      "li4",
      "gv20",
      "gb20",
      "lu7"
    ],
    "lifestyleAdvice": {
      "diet": "食事と水分を規則的に取りましょう。特定の食材や飲み物で頭痛が治るとは限りません。",
      "habit": "症状の経過や誘因を記録し、同じ姿勢が続くときは無理のない範囲で休憩を。新しい・悪化する頭痛は、原因の評価を優先してください。"
    }
  },
  {
    "id": "stress-insomnia",
    "title": "寝つけない・夜中に目が覚める",
    "category": "メンタル・睡眠",
    "summary": "寝付きにくさ、中途覚醒、日中の疲れや不安。症状だけで自律神経の病気や不眠症を確定することはできません。",
    "orientalMechanism": "伝統医学では「心腎不交」「肝気鬱結」などを、睡眠や気分に関する所見を整理する候補として学びます。心・肝・腎は伝統理論上の機能分類で、心臓・肝臓・腎臓の病気を意味しません。",
    "recommendedTsuboIds": [
      "lr3",
      "pc6",
      "gv20",
      "ki1",
      "ht7"
    ],
    "lifestyleAdvice": {
      "diet": "就寝に近い時間のカフェインや飲酒が睡眠に影響していないか確認しましょう。ハーブやサプリメントは、薬との相互作用も含め医師・薬剤師へ相談してください。",
      "habit": "起床時刻をなるべく一定にし、眠る前は落ち着ける時間を作りましょう。生活への支障が続く場合は受診してください。"
    }
  },
  {
    "id": "stomach-fatigue",
    "title": "胃もたれ・食欲不振・軟便",
    "category": "消化器・おなか",
    "summary": "食後の重さ、食欲の低下、軟便など。症状から消化器の病気の有無を判定することはできません。",
    "orientalMechanism": "伝統医学の「脾胃虚弱」「水湿停滞」は、食欲・便通・疲労などを整理する分類です。消化酵素の不足や臓器の病気と同一ではありません。",
    "recommendedTsuboIds": [
      "st36",
      "cv12",
      "li4",
      "sp4"
    ],
    "lifestyleAdvice": {
      "diet": "食べられるものを無理のない量で取り、症状が出る食事を記録しましょう。食材の色で消化機能の回復が決まるわけではありません。",
      "habit": "症状と食事・便通の記録は受診時にも役立ちます。カイロを肌へ直接当てたり、就寝中に使用したりすることは避けてください。"
    }
  },
  {
    "id": "menstrual-pain-chill",
    "title": "月経痛・冷え・脚のむくみ",
    "category": "月経・更年期",
    "summary": "月経時の痛みや手足の冷え、脚のむくみ。これらが同じ原因で生じているとは限りません。",
    "orientalMechanism": "伝統医学では「寒凝血瘀」「水湿内停」などの候補を比較します。「瘀血」は子宮に古い血がたまっていることを確認する医学検査ではありません。",
    "recommendedTsuboIds": [
      "sp6",
      "bl23",
      "ki1",
      "cv4",
      "sp9"
    ],
    "lifestyleAdvice": {
      "diet": "食事全体の偏りを避けましょう。痛みや出血が強い場合は食養生で様子を見ず受診してください。",
      "habit": "月経周期、出血量、痛みと生活への影響を記録しましょう。妊娠中や妊娠の可能性がある場合に、このガイドの経穴例から自己灸を始めないでください。"
    }
  },
  {
    "id": "chronic-fatigue-lethargy",
    "title": "慢性疲労・だるさ・朝起きられない",
    "category": "全身・疲労",
    "summary": "休んでも取れない疲れや朝の起きにくさ。睡眠や生活習慣のほか、病気や薬が関わることもあります。",
    "orientalMechanism": "「気虚」「腎虚」は伝統医学上の候補です。この分類から免疫機能や腎臓機能の低下を判定することはできません。",
    "recommendedTsuboIds": [
      "st36",
      "bl23",
      "gv20",
      "cv6"
    ],
    "lifestyleAdvice": {
      "diet": "食事と水分を取り、極端な食事制限を避けましょう。食欲不振や体重減少がある場合は医療機関へ相談してください。",
      "habit": "睡眠と休息を確保し、疲労が強まる活動を無理に続けないでください。長引く疲労の原因評価を運動やツボ刺激で置き換えないでください。"
    }
  },
  {
    "id": "lower-back-pain-sciatica",
    "title": "腰痛・ぎっくり腰・坐骨神経痛",
    "category": "背中・腰",
    "summary": "腰の痛み、お尻から脚にかけての痛みやしびれ。脚の力や感覚、尿や便の出方に新しい変化があるときは、受診の目安を確認してください。",
    "orientalMechanism": "伝統医学では「腎虚不栄」「風寒湿痺」などを比較します。これらの証名から、神経の圧迫・感染・骨折などの有無を判断することはできません。",
    "recommendedTsuboIds": [
      "bl23",
      "bl40",
      "bl60",
      "gb30",
      "gv4"
    ],
    "lifestyleAdvice": {
      "diet": "普段のバランスのよい食事を基本にしましょう。黒い食材が骨や神経を修復するという意味ではありません。",
      "habit": "痛みやしびれが強まる動きを無理に行わず、神経症状や経過を医療機関に伝えてください。新しい排尿・排便の異常や会陰部感覚の変化があれば、ストレッチを試す前に、すぐに医療機関を受診してください。"
    }
  },
  {
    "id": "eye-strain-fatigue",
    "title": "眼精疲労・ドライアイ・目のかすみ",
    "category": "目・耳・鼻",
    "summary": "画面作業に伴う疲れや乾き、目のかすみ。急な痛み・充血・見え方の変化を画面の見過ぎと決めないことが大切です。",
    "orientalMechanism": "「久視傷血」「肝開竅於目」は伝統医学の説明です。肝血の分類だけで眼科疾患の有無や視力低下の原因を判定することはできません。",
    "recommendedTsuboIds": [
      "gb20",
      "lr3",
      "li4",
      "gb37"
    ],
    "lifestyleAdvice": {
      "diet": "特定の食品を常用して眼科治療を置き換えないでください。食物アレルギーや服薬がある場合は、食事・サプリメントの変更も相談しましょう。",
      "habit": "画面作業の合間に目を休め、目の痛みや見え方の変化が続く場合は眼科へ。目や眼窩を強く押したり、自己刺鍼したりしないでください。"
    }
  },
  {
    "id": "constipation-ibs",
    "title": "便秘・おなかの張り・便通の変化",
    "category": "消化器・おなか",
    "summary": "便秘、硬い便、お腹の張り、腹痛や下痢。過敏性腸症候群（IBS）かどうかは、症状の経過を伝えて医療機関で確かめます。",
    "orientalMechanism": "伝統医学では「肝脾不和」「大腸気滞」「陰虚腸燥」などの候補を学びます。これらの証とIBSの診断は同じものではありません。",
    "recommendedTsuboIds": [
      "st25",
      "st36",
      "te6",
      "li11"
    ],
    "lifestyleAdvice": {
      "diet": "症状が出る食事を記録し、水分や食物繊維の取り方を医師・管理栄養士に相談しましょう。食物繊維や油を一律に増やせばよいとは限りません。",
      "habit": "便意を我慢しすぎず、無理にいきまないようにしましょう。血便や体重減少、持続する強い腹痛は生活習慣の工夫だけで経過を見ないでください。"
    }
  },
  {
    "id": "dizziness-tinnitus",
    "title": "めまい・耳鳴り・ふらつき",
    "category": "目・耳・鼻",
    "summary": "立ちくらみ、回転感、ふらつき、耳鳴り。原因は内耳だけとは限らず、急な難聴や神経症状は速やかな評価が必要です。",
    "orientalMechanism": "「痰湿」「肝陽上亢」などは伝統医学の候補です。痰湿を内耳の水分量と同一視したり、首こりで内耳動脈が塞がったと断定したりすることはできません。",
    "recommendedTsuboIds": [
      "gb20",
      "te17",
      "ki3",
      "st40",
      "lr3"
    ],
    "lifestyleAdvice": {
      "diet": "体質分類だけを理由に水分を減らしたり、発汗で水分を抜こうとしたりしないでください。医師から水分・塩分の指示がある場合は、その指示を優先します。",
      "habit": "転倒を避けられる場所で休み、運転や高所作業を避けてください。症状が続く場合は受診し、急な難聴や神経症状は受診を遅らせないでください。"
    }
  },
  {
    "id": "climacteric-hot-flash",
    "title": "更年期のほてり・冷えのぼせ",
    "category": "月経・更年期",
    "summary": "ほてりや発汗、気分の変化など。更年期にみられることがありますが、年齢だけで原因を確定することはできません。",
    "orientalMechanism": "伝統医学では「肝腎陰虚」「上熱下寒」などを比較します。腎の陰液はホルモン濃度を表す検査値ではなく、伝統理論上の説明です。",
    "recommendedTsuboIds": [
      "sp6",
      "ki3",
      "lr3",
      "cv4",
      "ht7"
    ],
    "lifestyleAdvice": {
      "diet": "通常の食品として偏りなく食べましょう。大豆食品やサプリメントでホルモン治療の代わりになると考えず、服薬・治療中の場合は主治医に相談してください。",
      "habit": "室温や衣服を快適に調整し、症状と生活への影響を記録しましょう。困る症状が続く場合は婦人科などへ相談してください。"
    }
  },
  {
    "id": "allergic-rhinitis-hayfever",
    "title": "アレルギー性鼻炎・花粉症・鼻づまり",
    "category": "目・耳・鼻",
    "summary": "くしゃみ、鼻水、鼻づまり、目のかゆみ。原因や適切な治療は医療機関で確認します。",
    "orientalMechanism": "「肺気虚」「衛気不固」などは伝統医学上の分類です。衛気の強さからアレルギー反応や免疫機能を判定することはできません。",
    "recommendedTsuboIds": [
      "li20",
      "li4",
      "gv14",
      "lu7"
    ],
    "lifestyleAdvice": {
      "diet": "特定の辛味食材で鼻炎が治るとは限りません。食品やハーブを試す場合も、食物アレルギーや薬との関係に注意しましょう。",
      "habit": "原因となる花粉などへの曝露を減らす工夫と、医師・薬剤師に相談した治療を基本に。ドライヤーを温灸の代用にして皮膚へ当てる方法は案内しません。"
    }
  },
  {
    "id": "knee-joint-pain",
    "title": "ひざの痛み・階段の上り下りで感じる違和感",
    "category": "足・脚",
    "summary": "動き始めや階段での膝の痛み、こわばり。関節の状態や痛みの原因は症状だけでは確定できません。",
    "orientalMechanism": "「肝主筋」「腎主骨」「風寒湿」などは伝統医学の枠組みです。肝・腎の証から軟骨の状態や炎症・感染の有無を判定するものではありません。",
    "recommendedTsuboIds": [
      "st36",
      "sp9",
      "gb34",
      "st34"
    ],
    "lifestyleAdvice": {
      "diet": "食事は偏りなく取りましょう。特定の食品やコラーゲンで軟骨が再生すると期待して、必要な治療を遅らせないでください。",
      "habit": "運動の種類や負荷は膝の状態に合わせて相談しましょう。急な腫れ・熱感や外傷後の強い痛みがあるときに、無理なストレッチを始めないでください。"
    }
  }
];

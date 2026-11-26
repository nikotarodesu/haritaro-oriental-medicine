import type { SafetySource } from '@/data/medicalSafety';

interface PublicSymptomContent {
  summary: string;
  dailyLife: { title: string; body: string }[];
  observations: string[];
  traditional: string[];
  safetyNote?: string;
  dailyLifeSources?: SafetySource[];
}

export const PUBLIC_SYMPTOM_CONTENT: Record<string, PublicSymptomContent> = {
  'headache-stiff-neck': {
    summary: '頭痛と首・肩のこわばりは、いつ始まったかを別々に書きます。吐き気や、光をまぶしく感じた時刻も添えます。',
    dailyLife: [
      { title: '食事と休憩の間隔を見直す', body: '忙しい日に食事を抜いていなかったか、水分が取れていたかを確認します。画面を見ながら同じ姿勢が続く日は、作業の区切りで目と体を休めましょう。' },
    ],
    observations: ['頭痛と首・肩のこわばりがそれぞれ始まった時刻と続いた時間', '押されるような痛みか、脈を打つような痛みか', '吐き気や光が気になるなど、一緒に起きたこと'],
    traditional: [
      '東洋医学でいう「気滞（きたい）」は、体の働きや気分の変化を「気のめぐりが滞る」と捉える言葉です。「瘀血（おけつ）」は、痛む場所や痛み方などを血のめぐりという観点で整理するときの分類です。',
    ],
    dailyLifeSources: [
      { title: 'NHS：頭痛', url: 'https://www.nhs.uk/symptoms/headaches/', section: 'How you can ease headaches yourself / 頭痛の日誌' },
    ],
  },
  'stress-insomnia': {
    summary: '布団に入った時刻、寝つくまでの時間、夜中に目が覚めた回数を書きます。翌日の眠気や、仕事・家事で困ったことも添えます。',
    dailyLife: [
      { title: 'まず起きる時刻を振り返る', body: '普段の起床時刻を確かめ、生活に合わせてできる範囲でそろえます。眠る前に仕事や家事が続く日は、一区切りつけて落ち着いて過ごす時間を作りましょう。' },
      { title: '夕方以降の飲み物を振り返る', body: '夕方や夜にコーヒー、お茶、お酒を飲んだ日と、そうでない日の眠りを見比べます。睡眠のために市販品やサプリメントを使いたいときは、服用中の薬も伝えて医師・薬剤師に相談してください。' },
    ],
    observations: ['布団に入った時刻と朝起きた時刻', '寝つくまでの時間と夜中に目が覚めた回数', '翌日の眠気や、仕事・家事への影響'],
    traditional: [
      '東洋医学の教材では、眠りや気持ちの変化を整理する言葉に「心腎不交（しんじんふこう）」や「肝気鬱結（かんきうっけつ）」があります。前者は心と腎の働きのつながり、後者は肝が担うとされる気のめぐりに着目する分類です。',
      'ここでの心・腎・肝は伝統医学が体の働きをまとめるときの呼び方です。',
    ],
    dailyLifeSources: [
      { title: 'NHS：不眠', url: 'https://www.nhs.uk/conditions/insomnia/', section: 'How you can treat insomnia yourself / How a pharmacist can help with insomnia' },
    ],
  },
  'stomach-fatigue': {
    summary: '食べた量と、食後どのくらいで胃が重くなったかを書きます。便が柔らかい日は、便の形や回数も記録します。',
    dailyLife: [
      { title: '特定の食材で症状が続くとき', body: '同じ食材を食べたあとに気になる変化が続くときは、記録をもとに医師や管理栄養士に相談しましょう。' },
      { title: 'カイロを使うときの注意', body: 'おなかを温めるためにカイロを使う場合は、肌に直接貼ったり、つけたまま眠ったりしないでください。' },
    ],
    observations: ['食欲や食べられる量が変わった時期', '食後どのくらいで重さや吐き気が出るか', '便の回数や形が、普段とどう変わったか'],
    traditional: [
      '「脾胃虚弱（ひいきょじゃく）」は、食欲が落ちる、便が柔らかい、疲れやすいといった所見を、消化に関わる働きの弱まりと捉える伝統医学の分類です。「水湿停滞（すいしつていたい）」では、水分のめぐりが滞ると考えて所見を読みます。',
    ],
    dailyLifeSources: [
      { title: 'NIDDK：消化不良と食事', url: 'https://www.niddk.nih.gov/health-information/digestive-diseases/indigestion-dyspepsia/eating-diet-nutrition', section: '食事が消化不良に関わる場合の相談' },
      { title: '製品評価技術基盤機構：温活グッズの事故', url: 'https://www.nite.go.jp/jiko/chuikanki/mailmagazin/2024fy/vol468_250114.html', section: '就寝時の低温やけどとカイロの使用上の注意' },
    ],
  },
  'menstrual-pain-chill': {
    summary: '月経の開始日と痛みが出た日、仕事や授業を休んだかを書きます。脚のむくみは、出た時刻と片脚か両脚かも記録します。',
    dailyLife: [
      { title: '妊娠中のお灸について', body: '妊娠中や妊娠の可能性があるときは、図鑑に載っているツボを参考に、自分でお灸を始めないでください。' },
    ],
    observations: ['月経が始まった日と痛みが出た日', 'ナプキンなどを交換する間隔が普段より短かったか、痛みで仕事や授業を休んだか', '冷えやむくみが出た時刻と部位。脚のむくみは片脚か両脚か'],
    traditional: [
      '「寒凝血瘀（かんぎょうけつお）」は冷えと痛みを、冷えで血のめぐりが滞るという伝統医学の考え方で説明します。「水湿内停（すいしつないてい）」は、体内で水分のめぐりが滞ると考える分類です。',
    ],
    dailyLifeSources: [
      { title: 'NHS：月経の悩み', url: 'https://www.nhs.uk/conditions/periods/period-problems/', section: '症状の日誌 / Painful periods' },
    ],
  },
  'chronic-fatigue-lethargy': {
    summary: '着替えや買い物など、どの動作で疲れるかを書きます。疲れが強くなる時刻、前の晩の睡眠、休んだあとの変化も記録します。',
    dailyLife: [
      { title: '食事・水分・休憩の時間を確保する', body: '疲れが強まる活動は無理に続けず、食事、水分、休憩の時間を取れるように予定を見直します。着替えや買い物など、以前できていたことが負担になる状態が続く場合は、その経過を医療機関で相談してください。' },
    ],
    observations: ['疲れが始まった時期と、つらくなる時間帯', '夜の眠り方や朝の目覚め、休息後の変化', '以前はできていた活動で、今は負担になっていること'],
    traditional: [
      '「気虚（ききょ）」は、疲れやすさなどを、体を動かす働きの不足として捉える東洋医学の分類です。「腎虚（じんきょ）」は、同じ伝統理論で腎に関連づけられる働きの不足に着目した分類です。',
    ],
    dailyLifeSources: [
      { title: 'NHS：持続する疲労', url: 'https://www.nhs.uk/symptoms/tiredness-and-fatigue/', section: 'Things you can do to help with tiredness or fatigue' },
    ],
  },
  'lower-back-pain-sciatica': {
    summary: '腰だけが痛む場合と、お尻から脚まで痛む場合を図で比べます。しびれがあれば、痛む範囲とは別に、部位と左右を書きます。',
    safetyNote: '会陰部の感覚低下とは、外性器や肛門の周りがしびれたり、触れた感覚が鈍くなったりすることです。',
    dailyLife: [
      { title: '症状が強まる動きは無理に繰り返さない', body: '例えば立ち上がるときと座り続けたときで、痛みがどう違うかを振り返ります。強い痛みや脚のしびれを増やす動きは避け、普段の動作に支障が続くときは医療機関で相談してください。' },
    ],
    observations: ['いつから痛むか。重い物を持ち上げた、転んだなど、思い当たるきっかけ', '痛みとしびれが、それぞれどこまで広がるか。左右の違い', '歩く、座る、立ち上がるなどで困っていること'],
    traditional: [
      '「腎虚不栄（じんきょふえい）」は、伝統医学で腎に関わる働きが体を十分養えないと考える言葉です。「風寒湿痺（ふうかんしつひ）」は、風・冷え・湿気という伝統医学の観点で、痛みや動かしづらさを整理する分類です。',
    ],
    dailyLifeSources: [
      { title: 'NHS：腰背部の痛み', url: 'https://www.nhs.uk/conditions/back-pain/', section: 'When to get medical help / Exercises and stretches for back pain' },
    ],
  },
  'eye-strain-fatigue': {
    summary: '画面を見始めてから目が乾くまでの時間や、かすみが片目か両目かを書きます。休んだあとにどう変わったかも添えます。',
    dailyLife: [
      { title: '画面を見続ける作業に区切りをつける', body: 'メールへの返信や資料の確認が一つ終わったら、画面から目を離す時間を作ります。' },
      { title: '目の周りを刺激する前の注意', body: '痛みや見え方の変化が続くときは、眼科へ相談してください。眼球や目の周りを強く押したり、自分で鍼を刺したりするのは避けてください。' },
    ],
    observations: ['乾く、ゴロゴロする、かすむなどの感じ方', '片目か両目か、始まった時期と変化の速さ', '画面作業や休憩との関係、コンタクトレンズの使用状況'],
    traditional: [
      '『黄帝内経 素問』の「久視傷血（きゅうししょうけつ）」は、長く見続けることが、伝統医学で体を養うとされる「血」の働きを損なうと捉えた表現です。',
      '「肝開竅於目（かんはめにきょうをひらく）」の「竅」は、目や耳など外に通じる部位を指す言葉です。この句は、目と伝統医学でいう肝の働きとのつながりを表します。',
    ],
    dailyLifeSources: [
      { title: 'NHS：目の乾き', url: 'https://www.nhs.uk/conditions/dry-eyes/', section: 'How to treat dry eyes yourself' },
    ],
  },
  'constipation-ibs': {
    summary: '便の回数と硬さに加え、おなかの張りや痛みが排便の前後でどう変わったかを書きます。便が柔らかい日も合わせて記録します。',
    dailyLife: [
      { title: '食事の変化と、便意を我慢した場面を確認する', body: '便意があったときにトイレを後回しにしていなかったか、食事や飲み物に最近の変化があったかを見ます。水分や食物繊維の取り方を変えたい場合は、症状と食事の記録をもとに医師や管理栄養士に相談してください。' },
    ],
    observations: ['便の回数・硬さ・出しにくさ。便秘の日と便が緩い日があれば両方を記録', '張りや痛みが排便の前後で変わるか', '食事の変化と食べてから症状が出るまでの時間'],
    traditional: [
      '東洋医学には、気分や緊張とおなかの調子を併せて考える「肝脾不和（かんぴふわ）」や、腸の潤いという観点で考える「陰虚腸燥（いんきょちょうそう）」などの言葉があります。',
    ],
    dailyLifeSources: [
      { title: 'NIDDK：便秘の診断', url: 'https://www.niddk.nih.gov/health-information/digestive-diseases/constipation/diagnosis', section: 'Medical and family history' },
      { title: 'NIDDK：便秘と食事', url: 'https://www.niddk.nih.gov/health-information/digestive-diseases/constipation/eating-diet-nutrition', section: 'What should I eat and drink if I’m constipated?' },
    ],
  },
  'dizziness-tinnitus': {
    summary: '景色が回る、気が遠くなる、足元がふらつくなど、感じ方を書きます。耳鳴りや聞こえの変化は、左右と始まった時刻も添えます。',
    dailyLife: [
      { title: 'ふらつくときは安全な場所で休む', body: 'めまいの間は転びにくい場所で休み、車の運転や脚立を使う作業は避けてください。受診を急ぐ症状は、上の目安に沿って対応してください。' },
    ],
    observations: ['景色が回る、気が遠くなる、足元がふらつくなどの感じ方', 'めまいが始まったときにしていた動作と、症状が続いた時間', '耳鳴りや聞こえの変化が片耳か両耳か、いつ始まったか'],
    traditional: [
      '「痰湿（たんしつ）」は、伝統医学で体の水分のめぐりが滞った状態を表す言葉です。「肝陽上亢（かんようじょうこう）」は、伝統医学でいう肝の働きが高ぶるという見方で症状を整理する言葉です。',
    ],
    dailyLifeSources: [
      { title: 'NHS：めまい', url: 'https://www.nhs.uk/symptoms/dizziness/', section: 'Symptoms of dizziness / How you can treat dizziness yourself' },
    ],
  },
  'climacteric-hot-flash': {
    summary: 'ほてりが出た時刻と、何分続いたかを書きます。寝汗で目が覚めたときは、その時刻と翌日の眠気も記録します。',
    dailyLife: [
      { title: '室温や衣服を調整しやすくする', body: '体が暑くなったときに上着を脱げるようにし、寝室は過ごしやすい温度に調整します。' },
      { title: 'サプリメントを使う前に相談する', body: 'サプリメントなどを使いたい場合は、現在受けている治療や飲んでいる薬を主治医に伝えて相談してください。' },
    ],
    observations: ['ほてりが出た時刻と場面、何分続いたか', '寝汗で目が覚めた時刻と、翌日の眠気や困ったこと', '月経の経過、ほてりと動悸が同時に起きたか、どちらが先だったか'],
    traditional: [
      '「上熱下寒（じょうねつげかん）」は、顔がほてって足元は冷えるといった、体の上と下で感じ方が異なる状態を表す言葉です。「肝腎陰虚（かんじんいんきょ）」は、伝統医学で肝や腎に関連づける、潤いなどの働きに着目する分類です。',
    ],
    dailyLifeSources: [
      { title: 'Cambridge University Hospitals：更年期の生活上の工夫', url: 'https://www.cuh.nhs.uk/patient-information/menopause-a-healthy-lifestyle-guide/', section: 'Hot flushes / Sleep' },
    ],
  },
  'allergic-rhinitis-hayfever': {
    summary: '外出中と帰宅後で、鼻水や目のかゆみがどう変わるかを書きます。鼻づまりで夜に目が覚めた日も記録します。',
    dailyLife: [
      { title: '外ではマスクや眼鏡、帰宅後は着替え', body: '外出時のマスクや眼鏡、帰宅後の着替えなど、取り入れやすい方法から試します。' },
      { title: '薬を相談するときに困りごとも伝える', body: '「鼻が詰まって夜に目が覚める」など、一番困っていることを医師や薬剤師に伝えます。すでに使っている薬や、気になる副作用も一緒に伝えましょう。鼻の周りにドライヤーの温風を当てたり、自分でお灸をしたりすると、やけどのおそれがあります。' },
    ],
    observations: ['目と鼻のどちらがつらいか、両方が出るか', '鼻水や目のかゆみが強くなる季節や場面。外出時と室内での違い', '鼻づまりで夜に目が覚めた日、仕事への影響、使っている薬'],
    traditional: [
      '「肺気虚（はいききょ）」や「衛気不固（えきふこ）」は、くしゃみや鼻水などの所見を、伝統医学でいう肺の働きや体を守る働きという観点で整理する言葉です。',
    ],
    dailyLifeSources: [
      { title: '環境省：花粉症環境保健マニュアル2022', url: 'https://www.env.go.jp/chemi/anzen/kafun/2022_full.pdf', section: 'Ⅲ-1 花粉のばく露を防ぐために（22〜24ページ）' },
      { title: 'NHS：花粉症', url: 'https://www.nhs.uk/conditions/hay-fever/', section: 'How to treat hay fever yourself / A pharmacist can help with hay fever' },
    ],
  },
  'knee-joint-pain': {
    summary: '階段の上り・下りや歩き始めで痛むか、ひざの前・横・裏のどこが痛むかを書きます。腫れや熱っぽさが出た時期も添えます。',
    dailyLife: [
      { title: '痛みが増える動きは繰り返さず、運動の量を相談する', body: '痛みが強まる動作は無理に繰り返さず、運動の種類や負荷の調整を医療機関で相談します。急に腫れて熱を持ったときや、けがのあとに体重をかけられないときは、上の受診の目安を先に確認してください。' },
    ],
    observations: ['階段を上るとき、下りるとき、歩き始めなど、どの動きで痛むか', 'ひざの前・横・裏のどこが痛むか。手すりを使い始めるなど、痛みが出てから変えたこと', '腫れや熱っぽさが出た時期、転倒やひねりの有無'],
    traditional: [
      '「肝主筋（かんはすじをつかさどる）」「腎主骨（じんはほねをつかさどる）」は、筋や骨と伝統医学でいう臓の働きとの関係を表す言葉です。「風寒湿（ふうかんしつ）」は、風・冷え・湿気の影響という伝統医学の見方で、痛みや動かしづらさを整理する言葉です。',
    ],
    dailyLifeSources: [
      { title: 'NHS：膝の痛み', url: 'https://www.nhs.uk/symptoms/knee-pain/', section: 'How to ease knee pain and swelling / Treatments for knee pain' },
    ],
  },
};

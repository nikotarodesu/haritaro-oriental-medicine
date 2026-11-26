import type { ReadingFigure } from "@/types/reading";

export const ACUPUNCTURE_RESEARCH_FIGURES: Record<string, {
  sectionId: string;
  afterParagraph: number;
  figure: ReadingFigure;
}[]> = {
  "low-back-pain-sciatica": [
    {
      sectionId: "herniated-disk-sciatica",
      afterParagraph: 1,
      figure: {
        id: "sciatica-trial-groups",
        title: "坐骨神経痛の試験で比べた2群",
        layout: "compare",
        graphic: "comparison",
        items: [
          { label: "鍼の群", description: "鍼の施術を受けた。", icon: "pulse" },
          { label: "模擬鍼の群", description: "経穴から外れた場所を使い、多くは皮膚を刺さず、一部は刺した。", icon: "flask" },
        ],
        caption: "対象は腰椎椎間板ヘルニアに伴う片脚の坐骨神経痛が3か月を超えて続く成人です。両群で脚の痛みと日常生活の支障を測りました。",
      },
    },
  ],
  "knee-osteoarthritis": [
    {
      sectionId: "symptoms-and-mri",
      afterParagraph: 1,
      figure: {
        id: "knee-symptoms-and-mri",
        title: "6週後に調べた症状と軟骨の指標",
        layout: "compare",
        graphic: "comparison",
        items: [
          { label: "質問票（WOMAC）", description: "本人が答えた痛みや動作の困りごとなどを点数にする。", icon: "book" },
          { label: "膝のMRI", description: "画像で軟骨の厚さや体積などを測る。", icon: "eye" },
        ],
        caption: "480人を電気鍼群と模擬鍼群に分けた試験です。この6週後の測定で症状と軟骨の指標を確認し、長期に軟骨が保たれるかは未確認です。",
      },
    },
  ],
  "moxibustion-knee-pain": [
    {
      sectionId: "burns-and-denominators",
      afterParagraph: 1,
      figure: {
        id: "moxibustion-events-and-people",
        title: "同じ試験で数えた件数と人数",
        layout: "compare",
        graphic: "comparison",
        items: [
          { label: "有害事象の件数", description: "お灸1,158回で、施術との関連があると判断された事象が121件。", icon: "book" },
          { label: "経験した人数", description: "お灸を受けた102人のうち、一度でも有害事象を経験したのは48人。", icon: "check" },
        ],
        caption: "Kimらの試験での集計です。件数には、同じ人に繰り返し起きた事象も含まれます。",
      },
    },
  ],
  "migraine-prevention": [
    {
      sectionId: "migraine-days-and-attacks",
      afterParagraph: 1,
      figure: {
        id: "migraine-days-and-attacks",
        title: "同じ発作が2日続いた場合の数え方",
        layout: "steps",
        graphic: "timeline",
        items: [
          { label: "1日目", description: "発作が始まり、片頭痛があった。", icon: "pulse" },
          { label: "2日目", description: "同じ発作の痛みが続いた。", icon: "pulse" },
          { label: "日記で数える", description: "片頭痛があった日は2日、発作が始まった回数は1回。", icon: "book" },
        ],
        caption: "頭痛日記の数え方を示す例です。Zhaoらの試験では、割り付けから16週時点で発作回数の変化を主に評価しました。",
      },
    },
  ],
  "postoperative-nausea": [
    {
      sectionId: "wristbands",
      afterParagraph: 1,
      figure: {
        id: "postoperative-wristband-controls",
        title: "2つのバンド試験で何を比べたか",
        layout: "compare",
        graphic: "comparison",
        items: [
          { label: "短時間の手術", description: "バンドの突起が内関に当たる群と、前腕の反対側に当たる群。", icon: "compass" },
          { label: "成人の心臓手術", description: "指圧バンドを使う群と、模擬バンドを使う群。", icon: "pulse" },
        ],
        caption: "手術の種類と対照のバンドが異なるため、それぞれの試験で比べた条件を確認して結果を読みます。",
      },
    },
  ],
  "aromatase-inhibitor-joint-pain": [
    {
      sectionId: "follow-up-at-fifty-two-weeks",
      afterParagraph: 1,
      figure: {
        id: "joint-pain-trial-follow-up",
        title: "同じ参加者の痛みを追った時点",
        layout: "steps",
        graphic: "timeline",
        items: [
          { label: "6週", description: "鍼・模擬鍼・待機の3群で、本人が答えた痛みを比べた。", icon: "book" },
          { label: "24週から", description: "52週までの間は、全群に鍼を受ける機会があった。", icon: "compass" },
          { label: "52週", description: "226人中191人が追跡を完了し、群ごとの痛みを比べた。", icon: "check" },
        ],
        caption: "早期乳がんの治療でアロマターゼ阻害薬を服用し、関節痛がある女性を追った試験です。52週の結果は、その間に追加で受けた施術も考慮して読みます。",
      },
    },
  ],
  "radiation-dry-mouth": [
    {
      sectionId: "persistent-dry-mouth-after-radiotherapy",
      afterParagraph: 1,
      figure: {
        id: "persistent-dry-mouth-trial-groups",
        title: "放射線治療後に口の乾きが続く人を分けた3群",
        layout: "triad",
        graphic: "comparison",
        items: [
          { label: "鍼", description: "鍼の施術を受けた群。次の2群とそれぞれ比べる。", icon: "pulse" },
          { label: "模擬鍼", description: "鍼の処置をまねた施術を受けた比較群。", icon: "flask" },
          { label: "標準的な口腔ケア", description: "標準的な口腔ケアを受けた比較群。", icon: "check" },
        ],
        caption: "鍼と模擬鍼の比較、鍼と標準的な口腔ケアの比較で、本人が答えた口の乾きの点数にどれだけ差があったかをそれぞれ見ます。",
      },
    },
  ],
  "urinary-incontinence": [
    {
      sectionId: "pelvic-floor-training",
      afterParagraph: 1,
      figure: {
        id: "pelvic-floor-training-trial-groups",
        title: "両群の骨盤底筋訓練に何を加えたか",
        layout: "compare",
        graphic: "comparison",
        items: [
          { label: "電気鍼を追加", description: "骨盤底筋訓練に電気鍼を加えた。", icon: "pulse" },
          { label: "模擬電気鍼を追加", description: "骨盤底筋訓練に模擬電気鍼を加えた。", icon: "flask" },
        ],
        caption: "腹圧性尿失禁の女性304人を対象に、8週後の尿もれの量を1時間パッド試験で比べました。その後の追跡ではパッド試験による測定は行われていません。",
      },
    },
  ],
  "adverse-events": [
    {
      sectionId: "patients-or-sessions",
      afterParagraph: 1,
      figure: {
        id: "adverse-event-denominators",
        title: "分母は施術回数か、受けた人数か",
        layout: "compare",
        graphic: "comparison",
        items: [
          { label: "日本の調査", description: "鍼・灸の施術14,039回を分母に、有害事象847件を集計。", icon: "book" },
          { label: "ドイツの調査", description: "鍼を受けた229,230人を分母に、1件以上報告した19,726人を集計。", icon: "check" },
        ],
        caption: "施術内容や報告した人も調査ごとに異なります。割合を直接比べて安全性の差を判断することはできません。",
      },
    },
  ],
  "anticoagulants-and-bleeding": [
    {
      sectionId: "bedside-observation",
      afterParagraph: 1,
      figure: {
        id: "bleeding-observation-windows",
        title: "どこで、施術後のいつまで出血を確認したか",
        layout: "compare",
        graphic: "comparison",
        items: [
          { label: "台湾の保険記録", description: "施術後14日以内に記録された、出血やあざなどを集計。", icon: "book" },
          { label: "韓国の病院", description: "施術の直後と翌日の施術前に、少量の出血やあざなどを確認。", icon: "eye" },
        ],
        caption: "調べた期間と事象を拾う方法が異なります。保険記録からは、記録された出血が鍼によるものかを個別に判定できません。",
      },
    },
  ],
  "pattern-diagnosis-agreement": [
    {
      sectionId: "agreement-and-accuracy",
      afterParagraph: 1,
      figure: {
        id: "pattern-diagnosis-three-questions",
        title: "弁証の研究で問いごとに比べるもの",
        layout: "triad",
        graphic: "comparison",
        items: [
          { label: "判断は一致したか", description: "同じ症例に別の評価者が選んだ証を比べる。", icon: "balance" },
          { label: "判定は正しかったか", description: "病気を判定する別の基準と比べる。", icon: "check" },
          { label: "施術を選ぶのに役立つか", description: "施術の選び方を変えたときの患者の経過を比べる。", icon: "compass" },
        ],
        caption: "評価者が同じ証を選んだときに分かるのは、その条件で判断が一致したことです。正確さと施術を選ぶうえでの役立ち方には、それぞれに対応した研究が必要です。",
      },
    },
  ],
};

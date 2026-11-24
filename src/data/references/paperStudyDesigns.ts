type StudyGroup = {
  label: string;
  participants: number;
};

export type PaperStudyDesign = {
  population: string;
  groups: readonly [StudyGroup, StudyGroup] | readonly [StudyGroup, StudyGroup, StudyGroup];
  sharedCare?: string;
  measurement: string;
  timing: string;
  followUp?: string;
};

export const PAPER_STUDY_DESIGNS: Readonly<Partial<Record<string, PaperStudyDesign>>> = {
  'rct-insomnia-heart-liver-2025': {
    population: '慢性不眠症の人76人',
    groups: [
      { label: '神門など4穴', participants: 38 },
      { label: '百会など4穴', participants: 38 },
    ],
    sharedCare: '両群とも鍼を10回受けました。',
    measurement: '不眠の重さ（ISI）と眠りの質（PSQI）の質問票、機器で測った睡眠時間など',
    timing: '10回の施術が終わった時点',
    followUp: '質問票は施術終了の2週後と4週後にも確認しました。',
  },
  'perimenopausal-insomnia-electroacupuncture-li-2020': {
    population: '更年期に不眠がある人84人',
    groups: [
      { label: '電気鍼', participants: 42 },
      { label: '皮膚に刺さない偽鍼', participants: 42 },
    ],
    measurement: '眠りの質の質問票（PSQI）',
    timing: '試験開始から8週後',
  },
  'cancer-pain-electroacupuncture-auricular-peace-trial-mao-2021': {
    population: 'がんを経験し、現在がんの所見がない成人360人。筋肉や関節の痛みが3か月以上続いていました。',
    groups: [
      { label: '電気鍼', participants: 145 },
      { label: '耳鍼', participants: 143 },
      { label: '通常ケア', participants: 72 },
    ],
    measurement: '痛みの強さ（BPI）の開始時からの変化',
    timing: '試験開始から12週後',
  },
  'poststroke-motor-aphasia-acupuncture-xingnao-rct-li-2024': {
    population: '脳卒中後に言葉を話すことが難しくなった成人252人',
    groups: [
      { label: '鍼を追加', participants: 125 },
      { label: '偽鍼を追加', participants: 127 },
    ],
    sharedCare: '両群が言語訓練と通常治療を受けました。',
    measurement: '失語の重さ（AQ）と日常の意思疎通（CFCP）',
    timing: '介入開始から6週後',
    followUp: '主な解析に含まれたのは、鍼の群115人と偽鍼の群116人の計231人です。',
  },
  'katakori-needling-depth-rct-osaki-2018': {
    population: '慢性的な肩こりがある人16人',
    groups: [
      { label: '浅く刺す鍼', participants: 8 },
      { label: '深く刺す鍼', participants: 8 },
    ],
    measurement: '本人が感じる肩こりの強さ、肩の痛みや動かしづらさの質問票（SPADI）',
    timing: '最終施術の4週後の評価',
    followUp: '13人が最終評価を受けました。',
  },
};

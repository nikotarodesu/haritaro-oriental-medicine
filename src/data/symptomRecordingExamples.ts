import type { SymptomRecordingExample } from '@/components/symptoms/recordingFigureTypes';

const exampleNote = '架空の記録です。';

export const SYMPTOM_RECORDING_EXAMPLES: Readonly<Partial<Record<string, SymptomRecordingExample>>> = {
  'headache-stiff-neck': {
    title: '首・肩と頭の症状を、起きた順に書く',
    layout: 'flow',
    offsets: [0, 180, 210],
    items: [
      ['午後2時', '右肩が重くなる'],
      ['午後5時', '右のこめかみがズキズキし始める'],
      ['午後5時半', '吐き気が出る'],
    ],
    note: exampleNote,
  },
  'stress-insomnia': {
    title: '寝る前から翌日の眠気まで',
    layout: 'flow',
    items: [
      ['夜11時', '布団に入る。寝付くまで約1時間', 'moon'],
      ['夜中', '目が2回覚める', 'moon'],
      ['翌朝7時', '起床。午前の仕事中に眠気が続く', 'sunrise'],
    ],
    note: exampleNote,
  },
  'stomach-fatigue': {
    title: '食べた量と、胃が重くなった時刻',
    layout: 'flow',
    offsets: [0, 30, 120],
    items: [
      ['正午', '昼食を半分ほど食べる'],
      ['12時半', '胃が重くなり始める'],
      ['午後2時', '胃の重さが落ち着く'],
    ],
    note: `${exampleNote} 便の形や回数が変わった日は、その内容も書き添えます。`,
  },
  'menstrual-pain-chill': {
    title: '月経が始まった日と、痛みが出た日',
    layout: 'flow',
    offsets: [0, 1],
    items: [
      ['6日', '月経が始まる'],
      ['7日', '下腹が痛み、午前の授業を休む'],
    ],
    note: `${exampleNote} 冷えやむくみは、部位と時刻を別に書きます。`,
  },
  'chronic-fatigue-lethargy': {
    title: 'どんな場面で疲れ、休んだあとにどう変わったか',
    layout: 'flow',
    items: [
      ['朝の身支度', '着替えの途中で椅子に座る', 'sunrise'],
      ['午後の買い物', '帰宅してすぐ横になる', 'footprints'],
      ['30分休んだあと', 'だるさは残るが、座って夕食の準備ができる'],
    ],
    note: exampleNote,
  },
  'eye-strain-fatigue': {
    title: '画面を見ているときと、目を休めたあと',
    layout: 'matrix',
    columns: ['作業を始めて1時間', '10分休んだあと'],
    rows: [
      { label: '乾き', cells: ['両目が乾く', '乾きは軽くなる'], change: 'eased' },
      { label: '右目のかすみ', cells: ['右目がかすむ', '右目のかすみは残る'], change: 'remained' },
    ],
    note: exampleNote,
  },
  'constipation-ibs': {
    title: '排便の前後で、おなかの張りと痛みを比べる',
    layout: 'matrix',
    columns: ['排便の前', '排便のあと'],
    rows: [
      { label: '張り', cells: ['おなかが張る', '張りが残る'], change: 'remained' },
      { label: '痛み', cells: ['下腹が痛む', '痛みは軽くなる'], change: 'eased' },
    ],
    note: `${exampleNote} この日は朝に1回、硬い便が出ました。`,
  },
  'dizziness-tinnitus': {
    title: 'めまいの感じ方と、耳鳴りが出た時刻',
    layout: 'flow',
    offsets: [0, 5, 60],
    items: [
      ['午前8時', '立ち上がったときに景色が回る', 'footprints'],
      ['午前8時5分', '景色が回る感じが落ち着く'],
      ['午前9時', '左耳に耳鳴りが出る', 'ear'],
    ],
    note: exampleNote,
  },
  'climacteric-hot-flash': {
    title: '寝汗で目が覚めた夜と、翌朝の眠気',
    layout: 'flow',
    items: [
      ['夜9時', '顔がほてる。5分ほどで落ち着く', 'moon'],
      ['夜中の2時', '汗をかいて目が覚める', 'moon'],
      ['翌朝', '朝食を作っている間も眠い', 'sunrise'],
    ],
    note: exampleNote,
  },
  'allergic-rhinitis-hayfever': {
    title: '外と部屋の中で、鼻と目の症状を比べる',
    layout: 'matrix',
    columns: ['外にいるとき', '帰宅してから'],
    rows: [
      { label: '鼻水', cells: ['鼻水が出る。くしゃみもある', '鼻水が続く'], change: 'remained' },
      { label: '目のかゆみ', cells: ['両目がかゆい', 'かゆみが軽くなる'], change: 'eased' },
    ],
    note: exampleNote,
  },
  'knee-joint-pain': {
    title: '同じ階段でも、上りと下りを分けて書く',
    layout: 'compare',
    mode: 'stairs',
    items: [
      ['階段を上る', '右ひざは痛まない', 'footprints'],
      ['階段を下りる', '右ひざの前が痛み、手すりを使う', 'footprints'],
    ],
    note: exampleNote,
  },
};

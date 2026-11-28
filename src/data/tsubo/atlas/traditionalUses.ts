type TraditionalPointUse = {
  labels: readonly string[];
  source: { label: string; url: string };
  sourcesByLabel?: Readonly<Partial<Record<string, TraditionalPointUse["source"]>>>;
};

export function getTraditionalUseSource(use: TraditionalPointUse, label: string) {
  return use.sourcesByLabel?.[label] ?? use.source;
}

const zhenjiuDacheng = "https://jicheng.tw/tcm/book/針灸大成/index.html";

function classicalUse(
  volume: string,
  point: string,
  heading: string,
  labels: readonly string[],
): TraditionalPointUse {
  return {
    labels,
    source: {
      label: `『針灸大成』${volume}「${point}」`,
      url: `${zhenjiuDacheng}#:~:text=${encodeURIComponent(heading)}`,
    },
  };
}

// Modern Japanese summaries of traceable records of use, without efficacy claims.
// Keep source-only nomenclature, precautions, and study outcomes out of this list.
export const TRADITIONAL_POINT_USES: Readonly<Partial<Record<string, TraditionalPointUse>>> = {
  lu5: classicalUse("巻六", "尺沢", "◎尺澤：", ["せき", "肩・腕の痛み"]),
  lu6: classicalUse("巻六", "孔最", "◎孔最：", ["せき", "ひじ・腕の痛み"]),
  lu7: classicalUse("巻六", "列缺", "◎列缺：", ["せき", "手首に力が入りにくい"]),
  lu8: classicalUse("巻六", "経渠", "◎經渠：", ["せき", "のどの不調"]),
  lu9: classicalUse("巻六", "太淵", "◎太淵（一名太泉", ["せき", "肩・背中の痛み"]),
  lu10: classicalUse("巻六", "魚際", "◎魚際：", ["のどの乾き", "せき"]),
  lu11: classicalUse("巻六", "少商", "◎少商：", ["のどの不調", "指の痛み"]),
  li1: classicalUse("巻六", "商陽", "◎商陽（一名絕陽）", ["歯の痛み", "耳鳴り"]),
  li2: classicalUse("巻六", "二間", "◎二間（一名間谷）", ["歯の痛み", "肩・背中の痛み"]),
  li3: classicalUse("巻六", "三間", "◎三間（一名少谷）", ["下の歯の痛み", "のどのつかえ"]),
  li4: classicalUse("巻六", "合谷", "◎合谷（一名虎口）", ["頭痛", "歯の痛み", "顔の腫れ"]),
  li5: classicalUse("巻六", "陽谿", "◎陽谿（一名中魁）", ["頭痛", "耳鳴り"]),
  li6: classicalUse("巻六", "偏歴", "◎偏歷：", ["肩・ひじ・手首の痛み", "歯の痛み"]),
  li7: classicalUse("巻六", "温溜", "◎溫溜（一名逆注", ["頭痛", "口や舌の痛み"]),
  li8: classicalUse("巻六", "下廉", "◎下廉：", ["おなかの痛み", "消化の不調"]),
  li9: classicalUse("巻六", "上廉", "◎上廉：", ["頭痛", "おなかが鳴る"]),
  li10: classicalUse("巻六", "手三里", "◎三里（一名手三里）", ["歯の痛み", "ひじを伸ばしにくい"]),
  li11: classicalUse("巻六", "曲池", "◎曲池：", ["ひじの痛み", "腕の痛み", "皮膚のかゆみ"]),
  li12: classicalUse("巻六", "肘髎", "◎肘髎：", ["ひじを曲げ伸ばししにくい", "腕の痛み"]),
  li13: classicalUse("巻六", "手五里", "◎五里：", ["ひじ・腕の痛み", "みぞおちの張り"]),
  li14: classicalUse("巻六", "臂臑", "◎臂臑：", ["腕の痛み", "首すじのこわばり"]),
  li15: classicalUse("巻六", "肩髃", "◎肩髃（一名中肩井", ["肩・腕の痛み", "腕を上げにくい"]),
  li16: classicalUse("巻六", "巨骨", "◎巨骨：", ["肩・腕を動かしにくい", "腕の痛み"]),
  li17: classicalUse("巻六", "天鼎", "◎天鼎：", ["のどのつかえ", "声が出にくい"]),
  li18: classicalUse("巻六", "扶突", "◎扶突（一名水穴）", ["せき", "声が出にくい"]),
  li19: classicalUse("巻六", "禾髎", "◎禾髎（一名長髎）", ["鼻づまり", "においが分かりにくい"]),
  li20: classicalUse("巻六", "迎香", "◎迎香：", ["鼻づまり", "においが分かりにくい"]),
  st13: classicalUse("巻六", "気戸", "◎氣戶：", ["せき", "胸・背中の痛み"]),
  st14: classicalUse("巻六", "庫房", "◎庫房：", ["せき", "胸・脇腹の張り"]),
  st25: classicalUse("巻六", "天枢", "◎天樞（一名長谿", ["下痢", "おなかの張り", "へその周りの痛み"]),
  st36: classicalUse("巻六", "足三里", "腹痛食不下", ["胃もたれ", "おなかの張り", "食が進まない"]),
  st37: classicalUse("巻六", "上巨虚", "◎上廉（一名上巨虛）", ["おなかの痛み", "消化の不調"]),
  st38: classicalUse("巻六", "条口", "◎條口：", ["脚の痛み", "足のしびれ"]),
  st39: classicalUse("巻六", "下巨虚", "◎下廉（一名下巨虛）", ["食欲の低下", "かかとの痛み"]),
  st40: classicalUse("巻六", "豊隆", "◎豐隆：", ["頭痛", "ひざ・脚のだるさ"]),
  st41: classicalUse("巻六", "解谿", "◎解谿：", ["頭痛", "おなかの張り"]),
  st42: classicalUse("巻六", "衝陽", "◎衝陽：", ["足の甲の腫れ", "食欲の低下"]),
  st43: classicalUse("巻六", "陥谷", "◎陷谷：", ["おなかの痛み", "おなかが鳴る"]),
  st44: classicalUse("巻六", "内庭", "◎內庭：", ["上の歯の痛み", "おなかの張り"]),
  st45: classicalUse("巻六", "厲兌", "◎厲兌：", ["食欲の低下", "おなかの張り"]),
  sp6: {
    labels: ["月経周期の乱れ"],
    source: {
      label: "『針灸大成』巻八「婦人門」",
      url: `${zhenjiuDacheng}#:~:text=${encodeURIComponent("月脈不調：氣海中極帶脈")}`,
    },
  },
  sp11: classicalUse("巻六", "箕門", "◎箕門：", ["尿が出にくい", "尿もれ"]),
  sp18: classicalUse("巻六", "天渓", "◎天谿：", ["せき", "胸の張り"]),
  sp19: classicalUse("巻六", "胸郷", "◎胸鄉：", ["胸・脇腹の張り", "背中の痛み"]),
  sp20: classicalUse("巻六", "周栄", "◎周榮：", ["せき", "胸・脇腹の張り"]),
  ht7: classicalUse("巻六", "神門", "◎神門（一名銳中", ["気持ちの落ち着かなさ", "のどの乾き"]),
  si16: classicalUse("巻六", "天窓", "◎天窗（一名窗籠）", ["首・肩の痛み", "のどの痛み"]),
  bl16: classicalUse("巻六", "督兪", "◎督俞：", ["おなかの痛み", "おなかが鳴る"]),
  bl23: classicalUse("巻六", "腎兪", "◎腎俞：", ["腰の痛み", "腰の冷え"]),
  bl29: classicalUse("巻六", "中膂兪", "◎中膂俞（一名脊內俞）", ["腰のこわばり", "おなかの張り"]),
  bl38: classicalUse("巻六", "浮郄", "◎浮郄：", ["すねの外側のこわばり", "便秘"]),
  bl41: classicalUse("巻六", "附分", "◎附分：", ["肩・背中のこわばり", "首の痛み"]),
  bl49: classicalUse("巻六", "意舎", "◎意舍：", ["おなかの張り", "下痢", "背中の痛み"]),
  bl50: classicalUse("巻六", "胃倉", "◎胃倉：", ["おなかの張り", "背中の痛み"]),
  bl51: classicalUse("巻六", "肓門", "◎肓門：", ["みぞおちの痛み", "便秘"]),
  ki1: classicalUse("巻六", "湧泉", "◎湧泉（一名地衝）", ["足の裏のほてり", "頭痛"]),
  ki6: classicalUse("巻六", "照海", "◎照海", ["のどの乾き", "月経周期の乱れ"]),
  ki18: classicalUse("巻六", "石関", "◎石關：", ["おなかの痛み", "便秘"]),
  ki20: classicalUse("巻六", "腹通谷", "食飲善嘔，暴喑不能言", ["嘔吐", "消化の不調"]),
  ki25: classicalUse("巻六", "神蔵", "◎神藏：", ["せき", "食欲の低下", "嘔吐"]),
  ki26: classicalUse("巻六", "彧中", "◎彧中：", ["せき", "胸・脇腹の張り"]),
  ki27: classicalUse("巻六", "兪府", "◎俞府：", ["せき", "嘔吐", "おなかの張り"]),
  pc1: classicalUse("巻七", "天池", "◎天池", ["頭痛", "腕の痛み"]),
  pc2: classicalUse("巻七", "天泉", "◎天泉", ["胸・脇腹の張り", "腕の内側の痛み"]),
  pc3: classicalUse("巻七", "曲沢", "◎曲澤：", ["嘔吐", "口の乾き"]),
  pc5: classicalUse("巻七", "間使", "◎間使：", ["ひじのこわばり", "のどのつかえ"]),
  pc6: {
    labels: ["吐き気", "嘔吐", "胸のつかえ"],
    source: {
      label: "台北市の中医学資料「内関」",
      url: "https://www-ws.gov.taipei/001/Upload/519/relfile/23395/138847/202ba89c-eeec-4d45-9a8c-9fc40409daca.pdf",
    },
    sourcesByLabel: {
      "胸のつかえ": {
        label: "台北市立連合病院の中医学資料「内関」",
        url: "https://www-ws.gov.taipei/001/Upload/519/relfile/23395/111396/13e1f6ce-639b-4899-aba5-f8060c5e779e.pdf#page=2",
      },
    },
  },
  pc7: classicalUse("巻七", "大陵", "◎大陵：", ["ひじ・腕の痛み", "手のひらのほてり"]),
  pc8: classicalUse("巻七", "労宮", "◎勞宮（一名五里", ["口内炎", "手のしびれ"]),
  pc9: classicalUse("巻七", "中衝", "◎中衝", ["手のひらのほてり"]),
  te1: classicalUse("巻七", "関衝", "◎關衝：", ["のどの不調", "頭痛"]),
  te2: classicalUse("巻七", "液門", "◎液門：", ["腕の痛み", "頭痛", "歯の痛み"]),
  te3: classicalUse("巻七", "中渚", "◎中渚：", ["ひじ・腕の痛み", "頭痛"]),
  te4: classicalUse("巻七", "陽池", "◎陽池", ["手首を動かしにくい", "肩・腕の痛み"]),
  te5: classicalUse("巻七", "外関", "◎外關：", ["指の痛み", "腕の曲げ伸ばしがしにくい"]),
  te6: classicalUse("巻七", "支溝", "◎支溝", ["肩・腕のだるさ", "脇腹の痛み"]),
  te7: classicalUse("巻七", "会宗", "◎會宗：", ["皮膚の痛み", "聞こえにくさ"]),
  te11: classicalUse("巻七", "清冷淵", "◎清冷淵：", ["肩の痛み", "腕を上げにくい"]),
  te17: classicalUse("巻七", "翳風", "◎翳風：", ["耳鳴り", "あごのこわばり"]),
  te21: classicalUse("巻七", "耳門", "◎耳門", ["耳鳴り", "聞こえにくさ"]),
  te22: classicalUse("巻七", "和髎", "◎和髎", ["頭の重さ", "あごのこわばり"]),
  te23: classicalUse("巻七", "糸竹空", "◎絲竹空", ["頭痛", "目の赤み"]),
  gb20: classicalUse("巻七", "風池", "◎風池：", ["頭痛", "首すじの痛み"]),
  gb21: classicalUse("巻七", "肩井", "◎肩井（一名膊井）", ["首すじの痛み", "腕を上げにくい"]),
  gb22: classicalUse("巻七", "淵腋", "◎淵液（一名泉液）", ["胸の張り", "腕を上げにくい"]),
  gb23: classicalUse("巻七", "輒筋", "◎輒筋（一名神光", ["胸の張り", "酸っぱいものがこみ上げる"]),
  gb34: classicalUse("巻七", "陽陵泉", "◎陽陵泉：", ["ひざを曲げ伸ばししにくい", "脚の筋がつる"]),
  lr1: classicalUse("巻七", "大敦", "◎大敦：", ["下腹部の痛み", "排尿の不調"]),
  lr2: classicalUse("巻七", "行間", "◎行間：", ["いらだち", "おなかの張り"]),
  lr3: classicalUse("巻七", "太衝", "◎太衝：", ["下腹部の痛み", "便通の不調"]),
  lr4: classicalUse("巻七", "中封", "◎中封（一名懸泉）", ["下腹部の痛み", "食欲の低下"]),
  lr5: classicalUse("巻七", "蠡溝", "◎蠡溝（一名交儀）", ["月経周期の乱れ", "下腹部の張り"]),
  lr6: classicalUse("巻七", "中都", "◎中都（一名中郄）", ["下腹部の痛み", "すねの冷え"]),
  lr9: classicalUse("巻七", "陰包", "◎陰包：", ["腰・下腹部の痛み", "月経周期の乱れ"]),
  gv20: classicalUse("巻七", "百会", "◎百會（一名三陽", ["頭痛", "めまい"]),
  gv27: classicalUse("巻七", "兌端", "◎兌端：", ["歯ぐきの痛み", "鼻づまり"]),
  gv28: classicalUse("巻七", "齦交", "◎齦交：", ["鼻づまり", "歯ぐきの腫れ・痛み"]),
  cv12: classicalUse("巻七", "中脘", "◎中脘（一名太倉）", ["おなかの張り", "消化の不調"]),
  cv18: classicalUse("巻七", "玉堂", "◎玉堂（一名玉英）", ["せき", "胸の張り"]),
  cv19: classicalUse("巻七", "紫宮", "◎紫宮：", ["せき", "胸・脇腹の張り"]),
  cv20: classicalUse("巻七", "華蓋", "◎華蓋：", ["せき", "のどの不調"]),
  "ex-hn3": {
    labels: ["頭痛", "不眠"],
    source: { label: "中国医薬情報検索プラットフォーム「印堂穴」", url: "https://www.dayi.org.cn/acupuncture/1141758.html" },
  },
  "ex-hn5": {
    labels: ["頭痛", "目の赤み"],
    source: {
      label: "『経穴匯解』「太陽」",
      url: "https://zh.wikisource.org/zh-hant/經穴匯解#:~:text=%E5%A4%AA%E9%99%BD%20%E7%9C%89%E5%BE%8C%E9%99%B7%E4%B8%AD",
    },
  },
};

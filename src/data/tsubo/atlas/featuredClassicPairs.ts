import type { FeaturedPair } from "./featuredPairs";

const eightVessels = {
  label: "『鍼灸大成』巻七「八法交会八脈」「八穴配合歌」",
  url: "https://www.theqi.com/cmed/oldbook/accup/chap7.html",
};

const jadeDragon = {
  label: "『鍼灸大成』巻二「玉龍賦」",
  url: "https://www.shidianguji.com/book/CADAL02093067/chapter/1laxht8e3v3t6",
};

export const featuredClassicPairs: readonly FeaturedPair[] = [
  {
    id: "houxi-shenmai",
    pointIds: ["si3", "bl62"],
    name: "後渓と申脈",
    kind: "classic",
    summary: "古典では、手の小指側にある後渓と、外くるぶしの下にある申脈を、首すじや肩の不調に結びつけています。",
    evidenceSummary: "頸椎症の試験では、通常の鍼に二穴を加えた群で、施術直後の首の痛みと日常生活への影響を示す得点が低くなりました。",
    limits: "二穴だけの効果や、改善が続く期間は分かりません。",
    details: [
      {
        label: "古典での使われ方",
        text: "『鍼灸大成』では、後渓を督脈、申脈を陽蹺脈に通じる穴とし、二穴を組み合わせます。",
        sources: [eightVessels],
      },
      {
        label: "試験の方法",
        text: "70人を2群に分け、追加する群は左右両側の後渓と申脈を使いました。",
        sources: [
          { label: "張ほか · 上海針灸雑誌（2018）", url: "https://www.acumoxj.com/uploads/20210929/63b56f08d4451380cb744a5813088d23.pdf" },
        ],
      },
    ],
  },
  {
    id: "waiguan-zulinqi",
    pointIds: ["te5", "gb41"],
    name: "外関と足臨泣",
    kind: "classic",
    summary: "前腕の外関と足の甲の足臨泣は、古典で目尻や耳の後ろ、首から肩にかけての不調に関連づけられています。",
    evidenceSummary: "片頭痛の試験では、外関と足臨泣を含む鍼の群で、内服薬の群より痛みの点数が低くなりました。",
    limits: "7種類のツボを使った試験で、外関と足臨泣だけの効果は分かりません。",
    details: [
      {
        label: "古典での使われ方",
        text: "『鍼灸大成』にある「臨泣」は胆経の足臨泣です。外関を陽維脈、足臨泣を帯脈に通じる穴としています。",
        sources: [eightVessels],
      },
      {
        label: "研究で調べたこと",
        text: "片頭痛の76人を、外関・足臨泣など7種類のツボへの鍼と、フルナリジンの内服を受ける群に分け、4週間後の痛みなどを比較しました。",
        sources: [
          { label: "Feng ほか · Technology and Health Care（2023）", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10200134/" },
        ],
      },
    ],
  },
  {
    id: "lieque-zhaohai",
    pointIds: ["lu7", "ki6"],
    name: "列欠と照海",
    kind: "classic",
    summary: "古典では、親指側の手首近くにある列欠と、内くるぶしの下にある照海を、のどや胸の不調に関連づけています。",
    evidenceSummary: "慢性咽炎の試験では、通常のケアに二穴を含む鍼と漢方薬を追加した場合を調べました。",
    limits: "鍼と漢方薬を一緒に追加したため、列欠と照海だけで症状が和らぐかは分かりません。",
    details: [
      {
        label: "古典での使われ方",
        text: "『鍼灸大成』では、列欠を任脈、照海を陰蹺脈に通じる穴として組み合わせています。",
        sources: [eightVessels],
      },
      {
        label: "研究で調べたこと",
        text: "伝統医学で脾気虚弱型にあたる慢性咽炎の68人が対象です。両群が同じトローチを使い、鍼を追加した群では6種類のツボを使いました。",
        sources: [
          { label: "何・譚 · 広州中医薬大学学報（2024）", url: "https://www.tcmjc.com/doi/pdf/C4CF41C485204A57A7FAF9E1FC68FD47#page=8" },
        ],
      },
    ],
  },
  {
    id: "zhigou-zhaohai",
    pointIds: ["te6", "ki6"],
    name: "支溝と照海",
    kind: "classic",
    summary: "古典には、便が出にくいときに支溝と照海をあわせて使う記述があります。",
    evidenceSummary: "機能性便秘の試験では、天枢・支溝・照海への鍼の群で、内服薬の群よりいきみや残便感などの症状スコアが改善しました。",
    limits: "天枢も使った試験で、支溝と照海だけの効果は分かりません。",
    details: [
      {
        label: "古典での使われ方",
        text: "『鍼灸大成』の「玉龍賦」には「照海、支溝通大便之秘」とあります。支溝は前腕の手の甲側、照海は内くるぶしの下です。",
        sources: [jadeDragon],
      },
      {
        label: "試験の方法",
        text: "80人を対象に、鍼とモサプリドの内服を比べました。症状スコアには便の硬さなども含まれます。",
        sources: [
          { label: "孫ほか · 江蘇中医薬（2016）", url: "https://www.jstcm.cn/cn/article/pdf/preview/20161227.pdf" },
        ],
      },
    ],
  },
  {
    id: "yinlingquan-yanglingquan",
    pointIds: ["sp9", "gb34"],
    name: "陰陵泉と陽陵泉",
    kind: "classic",
    summary: "古典では、ひざの腫れにこの二穴を組み合わせています。",
    evidenceSummary: "変形性膝関節症の試験では、電気鍼の刺激が強い群で、弱い群よりひざのこわばりと動作のしづらさが減ったと報告されています。",
    limits: "二穴を含む6種類のツボを使った試験です。この二穴だけでひざの腫れが引くかは分かりません。",
    details: [
      {
        label: "古典での使われ方",
        text: "『鍼灸大成』の「玉龍賦」では、陰陵泉を「陰陵」、陽陵泉を「陽陵」と略し、ひざの腫れの記述に並べています。",
        sources: [jadeDragon],
      },
      {
        label: "試験の方法",
        text: "80人が参加した試験で、両群に同じツボを使い、電気刺激の強さを変えました。",
        sources: [
          { label: "Ju ほか · International Journal of Clinical and Experimental Medicine（2015）", url: "https://pubmed.ncbi.nlm.nih.gov/26770523/" },
        ],
      },
    ],
  },
  {
    id: "chize-quchi",
    pointIds: ["lu5", "li11"],
    name: "尺沢と曲池",
    kind: "classic",
    summary: "古典では、ひじが痛くて動かしにくいときに使うと記されています。",
    evidenceSummary: "ひじの外側の痛みを扱った試験では、両群で尺沢・曲池・手三里などを使いました。",
    limits: "火鍼を追加するかどうかを比べた試験で、尺沢と曲池だけの効果は分かりません。",
    details: [
      {
        label: "古典での使われ方",
        text: "この組み合わせは『鍼灸大成』の「玉龍賦」に記されています。",
        sources: [jadeDragon],
      },
      {
        label: "試験の対象",
        text: "上腕骨外側上顆炎の38人を対象にした試験です。",
        sources: [
          { label: "Wu ほか · Medicine（2019）", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6709153/" },
        ],
      },
    ],
  },
  {
    id: "weizhong-chengshan",
    pointIds: ["bl40", "bl57"],
    name: "委中と承山",
    kind: "classic",
    summary: "ひざ裏の中央にある委中と、ふくらはぎの後ろにある承山をあわせます。古典では、どちらも腰痛に用いるツボとして記されています。",
    evidenceSummary: "腰部脊柱管狭窄症の試験で、二穴を含む鍼は偽鍼より日常生活の困難さの改善が1.3点大きく、臨床的に意味のある差の目安（2〜3点）を下回りました。",
    limits: "5種類のツボを使った試験で、委中と承山だけの効果は分かりません。",
    details: [
      {
        label: "古典での使われ方",
        text: "『鍼灸大成』の「馬丹陽天星十二穴治雑病歌」は「委中配承山」と記し、委中と承山それぞれの項に腰痛を挙げています。",
        sources: [
          { label: "『鍼灸大成』巻三「馬丹陽天星十二穴治雑病歌」", url: "https://www.shidianguji.com/zh/book/NA06097/chapter/1m7cs6kkiv2g4" },
        ],
      },
      {
        label: "研究で調べたこと",
        text: "腰部脊柱管狭窄症によって歩くと脚の痛みなどが出る196人の試験です。6週後の日常生活の困難さを0〜24点の尺度で比べました。",
        sources: [
          { label: "Zhu ほか · Annals of Internal Medicine（2024）", url: "https://pubmed.ncbi.nlm.nih.gov/38950397/" },
          { label: "試験で使用したツボ（ClinicalTrials.gov）", url: "https://clinicaltrials.gov/study/NCT03784729" },
        ],
      },
    ],
  },
  {
    id: "hegu-sanjian",
    pointIds: ["li4", "li3"],
    name: "合谷と三間",
    kind: "classic",
    summary: "手の甲にある合谷と、人差し指の付け根近くにある三間です。古典では頭痛や歯の痛みに二穴をあわせています。",
    evidenceSummary: "合谷と三間を併用したときに頭痛や歯の痛みが和らぐかは、確認した資料からは分かりません。",
    details: [
      {
        label: "古典での使われ方",
        text: "『鍼灸大成』の「雑病十一穴歌」は、頭痛と歯の痛みを挙げた直後に「合谷三間両穴尋」と記しています。どちらも手の陽明大腸経のツボです。",
        sources: [
          { label: "『鍼灸大成』巻三「雑病十一穴歌」", url: "https://www.shidianguji.com/zh/book/AMNL004702/chapter/1mbacb0noufxk" },
        ],
      },
    ],
  },
  {
    id: "cuanzhu-touwei",
    pointIds: ["bl2", "st8"],
    name: "攅竹と頭維",
    kind: "classic",
    summary: "眉頭にある攅竹と、額の角の生え際近くにある頭維です。古典では頭痛や目の痛みにあわせて使います。",
    evidenceSummary: "頭痛や目の痛みがこの二穴の併用で和らぐかは、確認した資料からは分かりません。",
    details: [
      {
        label: "古典での使われ方",
        text: "『鍼灸大成』の「玉龍賦」は、目の痛みと頭痛に二穴を挙げています。『医宗金鑑』にも、頭維に攅竹を加える記述があります。",
        sources: [
          jadeDragon,
          { label: "『医宗金鑑』「頭維穴」", url: "https://ctext.org/wiki.pl?chapter=836451&if=en&remap=gb" },
        ],
      },
    ],
  },
  {
    id: "taichong-guangming",
    pointIds: ["lr3", "gb37"],
    name: "太衝と光明",
    kind: "classic",
    summary: "足の甲にある太衝と、すねの外側にある光明です。肝経の原穴と胆経の絡穴をあわせる「原絡配穴」の例です。",
    evidenceSummary: "古典の記述は、経絡の関係からツボを選ぶ考え方を示しています。肝臓や胆のうの病気への効果は、この記述からは分かりません。",
    details: [
      {
        label: "古典での使われ方",
        text: "『鍼灸大成』の「肝主胆客」では、肝経を主にみるときは肝経の原穴である太衝を選び、対になる胆経から絡穴の光明を加えると記しています。",
        sources: [
          { label: "『鍼灸大成』巻七「肝主胆客」", url: "https://www.theqi.com/cmed/oldbook/accup/chap7.html" },
        ],
      },
    ],
  },
];

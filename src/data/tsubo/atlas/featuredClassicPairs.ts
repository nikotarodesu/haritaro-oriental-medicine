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
    evidenceSummary: "頸椎症の試験では、通常の鍼に二穴を加えた群で直後の痛みが軽くなりました。二穴だけの効果や、改善が続く期間は分かりません。",
    details: [
      {
        label: "古典での使われ方",
        text: "『鍼灸大成』では、後渓を督脈、申脈を陽蹺脈に通じる穴とし、二穴を組み合わせます。",
        sources: [eightVessels],
      },
      {
        label: "研究で調べたこと",
        text: "頸椎症の70人を、通常の鍼を受ける群と、それに左右の後渓・申脈を加える群に分けました。施術直後の首の痛みと、日常生活への影響を評価した得点は、二穴を加えた群でより低くなりました。",
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
    evidenceSummary: "片頭痛の試験では、外関と足臨泣を含む鍼の群で、内服薬の群より痛みの点数が低くなりました。二穴だけでの効果は、この試験では分かりません。",
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
    evidenceSummary: "慢性咽炎の試験では二穴を含む鍼と漢方薬を一緒に追加したため、列欠と照海だけで症状が和らぐかは分かりません。",
    details: [
      {
        label: "古典での使われ方",
        text: "『鍼灸大成』では、列欠を任脈、照海を陰蹺脈に通じる穴として組み合わせています。",
        sources: [eightVessels],
      },
      {
        label: "研究で調べたこと",
        text: "慢性咽炎のうち、伝統医学で脾気虚弱型にあたる68人の試験です。両群が同じトローチを使い、一方の群に列欠・照海など6種類のツボへの鍼と、漢方薬を加えました。",
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
    evidenceSummary: "機能性便秘の試験では天枢も加えた鍼の群で症状が改善したと報告されました。支溝と照海だけの効果は分かりません。",
    details: [
      {
        label: "古典での使われ方",
        text: "『鍼灸大成』の「玉龍賦」には「照海、支溝通大便之秘」とあります。支溝は前腕の手の甲側、照海は内くるぶしの下です。",
        sources: [jadeDragon],
      },
      {
        label: "研究で調べたこと",
        text: "機能性便秘の80人を、天枢・支溝・照海への鍼を受ける群と、モサプリドを内服する群に分けました。いきみや残便感、便の硬さなどの症状スコアは、鍼の群でより改善しました。",
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
    summary: "陰陵泉はひざ下の内側、陽陵泉は外側にあります。古典では、ひざの腫れにこの二穴を組み合わせています。",
    evidenceSummary: "変形性膝関節症の試験では、両方を含む電気鍼で刺激の強さを比較しました。二穴だけでひざの腫れが引くかは分かりません。",
    details: [
      {
        label: "古典での使われ方",
        text: "『鍼灸大成』の「玉龍賦」では、陰陵泉を「陰陵」、陽陵泉を「陽陵」と略し、ひざの腫れの記述に並べています。",
        sources: [jadeDragon],
      },
      {
        label: "研究で調べたこと",
        text: "80人が参加した変形性膝関節症の試験では、両群とも陰陵泉と陽陵泉を含む6種類のツボに電気鍼を受けました。刺激を強くした群で、弱い群よりひざのこわばりと動作のしづらさが減ったと報告されています。",
        sources: [
          { label: "Ju ほか · International Journal of Clinical and Experimental Medicine（2015）", url: "https://pubmed.ncbi.nlm.nih.gov/26770523/" },
        ],
      },
    ],
  },
];

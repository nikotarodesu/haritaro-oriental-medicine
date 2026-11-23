import { CHARACTER_MEANINGS } from "./characterMeanings";
import { NAME_READINGS } from "./nameReadings";
import { STANDARD_NAMES } from "./standardNames";

const nationalStandard = "https://www.ntcamsac.ac.cn/upload/std_info/202306192125376309.pdf";
const whoNomenclature = "https://www.cwis.org/wp-content/uploads/2019/04/s7143e.pdf";
const jiayiJing = "https://zh.wikisource.org/wiki/鍼灸甲乙經_(四庫全書本)/卷03";
const lingShu = "https://ctext.org/wiki.pl?chapter=145922&if=gb&remap=gb";

type NameHistory = { text: string; source: string; url: string };

const NAME_HISTORY: Readonly<Partial<Record<string, NameHistory>>> = {
  lu7: {
    text: "李白の漢詩にも「列缺」が出てきます。雷が鳴り、山が崩れる場面で使われていて、昔の人がこの二字から思い浮かべた光景を想像できます。",
    source: "李白『夢遊天姥吟留別』",
    url: "https://zh.wikisource.org/wiki/夢遊天姥吟留別",
  },
  li4: {
    text: "『鍼灸甲乙経』には「虎口」という別名も残っています。親指と人差し指の間を、トラの開いた口に見立てた呼び方です。",
    source: "『鍼灸甲乙経』巻三（古書の画像、PDF）",
    url: "https://upload.wikimedia.org/wikipedia/commons/8/8c/NLC892-411999020537-87578_%E9%87%9D%E7%81%B8%E7%94%B2%E4%B9%99%E7%B6%93_%E7%AC%AC2%E5%86%8A.pdf",
  },
  st36: {
    text: "古い医学書『霊枢』の本輸篇では「下陵」という名で、ひざから三寸下を目印としています。",
    source: "『霊枢』本輸篇",
    url: lingShu,
  },
  bl43: {
    text: "「病、膏肓に入る」という言い回しも、この古い部位名を使います。『春秋左氏伝』には、病が膏と肓の間に入り、薬が届かないという話が出てきます。",
    source: "『春秋左氏伝』成公十年",
    url: "https://upload.wikimedia.org/wikipedia/commons/9/98/NCL-004758752_%E5%A4%A7%E5%AD%97%E6%98%A5%E7%A7%8B%E5%B7%A6%E5%82%B3%E5%8F%A5%E8%A7%A3_v.3.pdf",
  },
  bl45: {
    text: "『素問』の骨空論に、患者が「譩譆」と声を出すと、その声の響きが手に伝わるという記述があります。",
    source: "『素問』骨空論",
    url: "https://ctext.org/huangdi-neijing/gu-kong-lun/zh",
  },
  ki1: {
    text: "『霊枢』の本輸篇でも、足裏にあるツボとして記され、腎経を説明する最初に登場します。",
    source: "『霊枢』本輸篇",
    url: lingShu,
  },
  gv20: {
    text: "『鍼灸甲乙経』には「三陽五会」という別名があり、頭の中央のつむじ付近と記されています。本によって、ここで出会うと考えた経絡の組み合わせには違いがあります。",
    source: "『鍼灸甲乙経』巻三",
    url: jiayiJing,
  },
  cv19: {
    text: "『漢書』の天文志では、北の空の中心を囲む星々を「紫宮」と呼んでいます。胸に並ぶ「華蓋」や「璇璣」とあわせて読むと、古い天文学とのつながりが見えてきます。",
    source: "『漢書』天文志",
    url: "https://ctext.org/wiki.pl?chapter=329786&if=gb",
  },
};

export function getAcupointName(code: string) {
  const reference = STANDARD_NAMES[code];
  const reading = NAME_READINGS[code];
  if (!reference || !reading) return undefined;

  const [chinese, pinyin, standardPage, nomenclaturePage] = reference;
  const characters = [...new Set(chinese)].map(character => ({
    character,
    meaning: CHARACTER_MEANINGS[character],
  }));

  return {
    chinese,
    pinyin,
    reading,
    characters,
    history: NAME_HISTORY[code],
    standardUrl: `${nationalStandard}#page=${standardPage}`,
    nomenclatureUrl: `${whoNomenclature}#page=${nomenclaturePage}`,
  };
}

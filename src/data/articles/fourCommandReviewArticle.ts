import type { Article } from "@/types/oriental";
import {
  NISHIZAWA_FOUR_COMMAND_URL,
  TAISEI_FOUR_COMMAND_QUOTATION,
  TAISEI_FOUR_GATES_URL,
} from "@/data/classicalTextsData";
import { FOUR_COMMAND_REVIEW_ID, KEY_POINT_TYPES_GUIDE } from "@/data/tsubo/keyPointTypes";

const quotation = TAISEI_FOUR_COMMAND_QUOTATION;

export const FOUR_COMMAND_REVIEW_ARTICLE: Article = {
  id: FOUR_COMMAND_REVIEW_ID,
  title: "四総穴を3分で復習",
  subtitle: "四総穴歌の読み方と四関との違いを、図鑑と2問で確認",
  category: "経穴・経絡学",
  publishedAt: "2026-11-25",
  readTime: "3分",
  summary: "四総穴は、腹・腰背・頭と首の後ろ・顔と口に対応づけて覚える、足三里・委中・列缺・合谷の4穴です。明代の『鍼灸大成』をもとに四総穴歌を読み、四関との違いを2問で確認します。",
  author: { name: "はり太郎", role: "鍼灸師／鍼灸院院長" },
  tags: ["四総穴", "四総穴歌", "四関", "鍼灸大成", "要穴"],
  references: [
    {
      id: "taisei-four-command-1601",
      type: "classic",
      title: quotation.section,
      authors: "楊継洲",
      source: quotation.sourceTitle,
      year: 1601,
      url: quotation.sourceUrl,
      sourceCheckedAt: quotation.checkedAt,
      note: `${quotation.edition}。${quotation.page}。${quotation.limitation}`,
    },
    {
      id: "taisei-four-gates-1601",
      type: "classic",
      title: "巻二「標幽賦」楊氏注解の四関の箇所",
      authors: "楊継洲",
      source: quotation.sourceTitle,
      year: 1601,
      url: TAISEI_FOUR_GATES_URL,
      sourceCheckedAt: "2026-11-25",
      note: "同じ趙文炳刊本の所蔵画像PDF 85ページ目。見開き右側に太衝・合谷があり、両手両足の記述は左側に続きます。",
    },
    {
      id: "nishizawa-four-command-1956",
      type: "paper",
      title: "鍼灸の治病要穴運用方法の研究（一）",
      authors: "西沢道允",
      source: "日本東洋醫學會誌 6巻3号 pp. 31–35（1956年3月刊）",
      doi: "10.14868/kampomed1950.6.3_31",
      url: NISHIZAWA_FOUR_COMMAND_URL,
      sourceCheckedAt: "2026-11-25",
      note: "p. 34左欄「9. 四総穴」の表記を確認しました。",
    },
  ],
  contentMarkdown: `## 四総穴の早見表

| 歌の言葉 | 覚える部位 | ツボ図鑑 |
| --- | --- | --- |
| 肚腹 | お腹 | [足三里（ST36）](/tsubo/st36) |
| 腰背 | 腰と背中 | [委中（BL40）](/tsubo/bl40) |
| 頭項 | 頭と首の後ろ | [列缺（LU7）](/tsubo/lu7) |
| 面口 | 顔と口 | [合谷（LI4）](/tsubo/li4) |

歌で「腰背」と組みになる委中の位置は、膝の裏です。歌が挙げる部位と、ツボそのものの位置を図鑑で見比べてください。歌は伝統的な対応を学ぶ資料で、治療効果は対象疾患や施術条件ごとの臨床研究で確かめます。

## 四関との違い

**四総穴は経穴名で4種類。四関は左右を数えて4か所です。** [四関](/glossary#term-四関)は、左右の合谷（LI4）と左右の[太衝（LR3）](/tsubo/lr3)の組み合わせです。『鍼灸大成』の楊氏注解には、四関を太衝・合谷とし、両手両足に言及する箇所があります。[1601年刊本・巻二「標幽賦」・所蔵画像PDF 85ページ目](${TAISEI_FOUR_GATES_URL})

## 確認問題

## 引用した原典と「面口」の読み

> ${quotation.text}

明・万暦29年（1601年）の趙文炳刊本、巻三「四總穴歌」の本文です。臺灣の國家圖書館が所蔵する資料（請求記号 304.1 06063）の画像で照合し、句読点を整えました。[1601年刊本・所蔵画像PDF 156ページ目](${quotation.sourceUrl}) ／ [所蔵書誌](https://catalog.digitalarchives.tw/item/00/08/67/46.html)

この刊本の末句は「面口合谷收」で、「面口」は顔と口を指します。西沢道允は論文で『鍼灸聚英』を挙げ、「面目」を顔面や目と説明しています。このページの早見表は、上に掲げた1601年刊本の本文に沿っています。[西沢道允の論文・p. 34左欄「9. 四総穴」](${NISHIZAWA_FOUR_COMMAND_URL})

## 関連する学習

- [図鑑で要穴の分類を見る](${KEY_POINT_TYPES_GUIDE}#four-command)
- [古典ライブラリで四総穴歌を読む](/library#classic-classic-taisei-shisou)`,
};

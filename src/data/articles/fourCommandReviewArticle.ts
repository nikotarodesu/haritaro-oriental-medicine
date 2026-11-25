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
  subtitle: "体の部位とツボの対応を図鑑と2問で確認",
  category: "経穴・経絡学",
  publishedAt: "2026-11-25",
  readTime: "3分",
  summary: "四総穴（しそうけつ）は、体の4つの部位に対応づけて覚える足三里・委中・列缺・合谷のことです。古い鍼灸の本『鍼灸大成』に載る短い詩「四総穴歌」をもとに、図鑑と確認問題で復習します。",
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

四総穴（しそうけつ）は、体の4つの部位と結びつけて覚える4つのツボです。古い鍼灸の本『鍼灸大成』には、この対応を覚えるための短い詩「四総穴歌」が載っています。たとえば、表で「腰と背中」に対応する委中は膝の裏にあります。ツボが実際にある場所は図鑑で確認できます。

| 詩の言葉 | 体の部位 | ツボ図鑑 |
| --- | --- | --- |
| 肚腹 | お腹 | [足三里（ST36）](/tsubo/st36) |
| 腰背 | 腰と背中 | [委中（BL40）](/tsubo/bl40) |
| 頭項 | 頭と首の後ろ | [列缺（LU7）](/tsubo/lu7) |
| 面口 | 顔と口 | [合谷（LI4）](/tsubo/li4) |

## 四関との違い

[四関（しかん）](/glossary#term-四関)は、左右の手にある合谷（LI4）と、左右の足にある[太衝（LR3）](/tsubo/lr3)を合わせた4か所です。**四総穴は4種類のツボ。四関は2種類のツボを左右で数えて4か所です。** 『鍼灸大成』の巻二には、楊継洲が四関について解説した箇所があります。[1601年刊本・巻二「標幽賦」・所蔵画像PDF 85ページ目](${TAISEI_FOUR_GATES_URL})

## 確認問題

## 『鍼灸大成』の原文と「面口」の読み方

下に載せたのは、明・万暦29年（1601年）に趙文炳が刊行した『鍼灸大成』巻三「四總穴歌」の原文です。台湾の國家圖書館が所蔵する本（請求記号 304.1 06063）の画像で確認し、句読点を整えました。四総穴歌は当時の覚え方を伝えています。治療効果は、対象の病気や施術の条件ごとに臨床研究で確かめます。[1601年刊本・所蔵画像PDF 156ページ目](${quotation.sourceUrl}) ／ [図書館の資料情報](https://catalog.digitalarchives.tw/item/00/08/67/46.html)

> ${quotation.text}

最後の「面口合谷收」にある「面口」は、顔と口のことです。西沢道允は論文で、別の鍼灸の本『鍼灸聚英』を挙げ、「面目」を顔面や目と説明しています。このページの早見表は『鍼灸大成』の1601年刊本に沿っています。[西沢道允の論文・p. 34左欄「9. 四総穴」](${NISHIZAWA_FOUR_COMMAND_URL})

## 関連する学習

- [図鑑で要穴の分類を見る](${KEY_POINT_TYPES_GUIDE}#four-command)
- [古典ライブラリで四総穴歌を読む](/library#classic-classic-taisei-shisou)`,
};

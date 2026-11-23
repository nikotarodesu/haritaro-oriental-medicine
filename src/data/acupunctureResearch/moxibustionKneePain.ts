import { acupunctureResearchHref } from "@/config/acupunctureLearning";
import type { AcupunctureResearchArticle } from "./types";

export const MOXIBUSTION_KNEE_PAIN_RESEARCH: AcupunctureResearchArticle = {
  slug: "moxibustion-knee-pain",
  title: "変形性膝関節症のお灸｜痛みとやけどを調べた試験",
  description: "膝の痛みに対するお灸を、熱を弱めた模擬灸と比べた試験、通常の診療と比べた試験を読みます。やけどなどが起きたときに、何人に起きたかと何件起きたかを分けて確かめます。",
  sections: [
    {
      id: "sham-moxibustion",
      title: "温かさが残る模擬灸と比べた試験",
      paragraphs: [
        "Zhaoらは、変形性膝関節症で痛みがある110人を、お灸と模擬灸の2群に分けました。模擬灸には見た目をそろえ、皮膚に伝わる熱を弱めた器具を使いました。模擬灸でも温かさは感じられました。",
        "6週時点の痛みの平均点（WOMACの痛みの項目）はお灸群で3.03点、模擬灸群で4.56点でした。痛みと日常動作のどちらも、開始時からの改善はお灸群の方が大きい結果でした。24週時点では痛みの差は残りましたが、日常動作には統計的に明確な差がありませんでした。",
      ],
      sources: ["zhao-2014"],
    },
    {
      id: "usual-care",
      title: "通常の診療にお灸を加えた試験",
      paragraphs: [
        "韓国のKimらは、変形性膝関節症と診断された40〜70歳の212人を、通常の診療にお灸を加える102人と、通常の診療を受ける110人に分けました。5週時点で、痛み、こわばり、日常動作の支障を尋ねる質問票（韓国語版WOMAC、点が低いほど支障が少ない）の合計点は、平均25.42点と33.60点でした。",
        "参加者は自分がお灸を受ける群かどうか分かっていました。質問票の点数には、施術への期待や、施術者と接する機会の違いも影響した可能性があります。",
      ],
      sources: ["kim-2014"],
    },
    {
      id: "burns-and-denominators",
      title: "やけどの件数と、事象を経験した人数",
      paragraphs: [
        "Kimらの試験では、お灸を受けた102人に計1,158回の施術を行い、施術との関連があると判断された有害事象は121件でした。内訳にはⅠ度のやけど6件とⅡ度のやけど113件が含まれます。一度でも有害事象を経験したのは48人で、同じ人に繰り返し起きた事象も件数に含まれます。",
        "Zhaoらの試験では、お灸群55人のうち10人に一時的な赤みがあり、3日以内に消えました。施術に伴うほかの有害事象は観察されませんでした。試験ごとに使った器具や報告された事象が異なります。これらの数字は、各試験で使った方法と観察の範囲で読みます。",
      ],
      sources: ["kim-2014", "zhao-2014"],
    },
    {
      id: "safety-guideline",
      title: "お灸の安全性を確かめる資料",
      paragraphs: [
        "全日本鍼灸学会のガイドラインでは、お灸で起こりうる有害事象にやけどを挙げ、熱さや痛みの感覚に障害がある部位では、とくに注意が必要だと説明しています。意図しないやけどが生じたときの対応も、重さに応じて示しています。",
      ],
      sources: ["jsam-2025"],
    },
  ],
  sources: [
    { id: "zhao-2014", label: "Zhao ほか · Arthritis Research & Therapy（2014年）", url: "https://doi.org/10.1186/ar4590", scope: "試験方法、結果の痛み・日常動作と有害事象、表2。模擬灸との比較。" },
    { id: "kim-2014", label: "Kim ほか · PLOS ONE（2014年）", url: "https://doi.org/10.1371/journal.pone.0101973", scope: "試験方法、表2と有害事象。通常の診療との比較と、有害事象の人数・施術回数・件数。" },
    { id: "jsam-2025", label: "全日本鍼灸学会 · 鍼灸安全対策ガイドライン2025年版", url: "https://safety.jsam.jp/img/file.pdf", scope: "印刷ページ44の「施灸による有害事象」。熱傷を防ぐための注意と、熱傷後の対応。" },
  ],
  related: [
    { href: "/learn/acupuncture#indirect-moxa", label: "鍼灸入門でお灸の道具を知る" },
    { href: "/symptoms/knee-joint-pain#guide-studies", label: "膝の痛みのガイドに載っている研究" },
    { href: acupunctureResearchHref("knee-osteoarthritis"), label: "変形性膝関節症に対する鍼の比較試験" },
    { href: acupunctureResearchHref("adverse-events"), label: "鍼灸の有害事象を数字で読む" },
    { href: "/safety#procedure", label: "受診の目安と鍼灸の安全性" },
  ],
  tags: ["お灸", "灸", "変形性膝関節症", "膝の痛み", "やけど", "熱傷", "有害事象", "模擬灸"],
};

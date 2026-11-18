import { BookOpen, ClipboardList, MapPin } from "lucide-react";

export const PLATFORM_DESCRIPTION = "ツボや症状を調べ、東洋医学の考え方を読み、架空の症例で学べる鍼灸の情報サイト。全361経穴を名前・部位・経絡から探せます。";
export const TSUBO_TAGLINE = "ツボのぜんぶが、ここにある。";
export const PLATFORM_INTRO = "ツボの場所や、気になる体のこと。鍼灸師のはり太郎が、図と身近な言葉で紹介します。";

export const SERIES = {
  dictionary: {
    name: "はり太郎のツボ図鑑",
    shortName: "ツボ図鑑",
    href: "/tsubo",
    icon: MapPin,
    description: "手の甲、ひざの下、足の裏。全361のツボから、知りたい場所や探し方を調べられます。",
    links: [{ href: "/tsubo", label: "ツボから探す" }, { href: "/symptoms", label: "症状から探す" }],
  },
  reading: {
    name: "はり太郎の東洋医学",
    shortName: "東洋医学",
    href: "/learn",
    icon: BookOpen,
    description: "食事や眠り、季節の変化を手がかりに、東洋医学の体の見方をひとつずつ読めます。",
    links: [{ href: "/learn", label: "読み物を探す" }, { href: "/diagnosis", label: "気血水 体質チェック" }],
  },
  practice: {
    name: "はり太郎の臨床演習",
    shortName: "臨床演習",
    href: "/clinical",
    icon: ClipboardList,
    description: "鍼灸を学ぶ方へ。架空の相談をもとに、何を尋ね、どのツボを選ぶかを練習できます。",
    links: [{ href: "/cases", label: "症例演習" }, { href: "/practice/haiketsu", label: "配穴演習" }],
  },
} as const;

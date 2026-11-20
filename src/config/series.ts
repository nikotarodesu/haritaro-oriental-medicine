import { BookOpen, ClipboardList, MapPin } from "lucide-react";

export const PLATFORM_DESCRIPTION = "全361経穴を名前・部位・経絡から探せます。東洋医学の講義や症状別の解説を読み、模擬症例で見立てや配穴を練習できます。";

export const SERIES = {
  dictionary: {
    name: "はり太郎のツボ図鑑",
    shortName: "ツボ図鑑",
    href: "/tsubo",
    icon: MapPin,
    description: "名前・部位・経絡からツボを探せます。骨や筋を目印にした図と注意点を掲載しています。",
    links: [{ href: "/tsubo", label: "ツボから探す" }, { href: "/symptoms", label: "症状から探す" }],
  },
  reading: {
    name: "はり太郎の東洋医学",
    shortName: "東洋医学",
    href: "/learn",
    icon: BookOpen,
    description: "陰陽、気・血・津液、経絡の意味を、講義の図や食事・睡眠の例で学びます。",
    links: [{ href: "/learn/essentials", label: "東洋医学の要点" }, { href: "/diagnosis", label: "気血水 体質チェック" }],
  },
  practice: {
    name: "はり太郎の臨床演習",
    shortName: "臨床演習",
    href: "/clinical",
    icon: ClipboardList,
    description: "模擬症例の経過と四診を読み、見立てやツボの組み合わせを考えます。",
    links: [{ href: "/cases", label: "症例演習" }, { href: "/practice/haiketsu", label: "配穴演習" }],
  },
} as const;

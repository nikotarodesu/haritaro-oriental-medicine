import { BookOpen, ClipboardList, MapPin } from "lucide-react";

export const PLATFORM_DESCRIPTION = "361のツボを図で調べられます。東洋医学の基本は講義で学び、模擬症例で練習できます。";
export const DICTIONARY_TAGLINE = "標準361穴の位置と注意点";

export const SERIES = {
  dictionary: {
    name: "はり太郎のツボ図鑑",
    shortName: "ツボ図鑑",
    href: "/tsubo",
    icon: MapPin,
    description: "名前・部位・経絡からツボを探せます。骨や筋を目印にした図と注意点を掲載しています。",
    links: [{ href: "/tsubo", label: "ツボ図鑑" }, { href: "/symptoms", label: "症状別ガイド（一般向け）" }],
  },
  reading: {
    name: "はり太郎の東洋医学",
    shortName: "東洋医学",
    href: "/learn",
    icon: BookOpen,
    description: "陰陽、気・血・津液（気血水）、経絡を、図と食事や睡眠の例から学べます。",
    links: [{ href: "/learn/essentials", label: "東洋医学の要点" }, { href: "/diagnosis", label: "気血水の体質チェック（学習用）" }],
  },
  practice: {
    name: "はり太郎の臨床演習",
    shortName: "臨床演習",
    href: "/clinical",
    icon: ClipboardList,
    description: "模擬症例の経過と、顔色・声・脈などの手がかり（四診）を読み、体の状態やツボの組み合わせを考えます。",
    links: [{ href: "/cases", label: "模擬症例を一覧で見る" }, { href: "/practice/haiketsu", label: "配穴を練習する" }],
  },
} as const;

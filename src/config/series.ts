import { BookOpen, ClipboardList, MapPin } from "lucide-react";

export const PLATFORM_DESCRIPTION = "ツボ図鑑で361のツボの場所を調べ、東洋医学の講義で陰陽や経絡を学べます。臨床演習では、模擬症例を読んで体の状態を考えます。";

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
    description: "陰陽、気・血・津液（気血水）、経絡を、図と食事や睡眠の例から学べます。",
    links: [{ href: "/learn/essentials", label: "東洋医学の要点" }, { href: "/diagnosis", label: "気血水 体質チェック" }],
  },
  practice: {
    name: "はり太郎の臨床演習",
    shortName: "臨床演習",
    href: "/clinical",
    icon: ClipboardList,
    description: "模擬症例の経過と、顔色・声・脈などの手がかり（四診）を読み、体の状態やツボの組み合わせを考えます。",
    links: [{ href: "/cases", label: "症例演習" }, { href: "/practice/haiketsu", label: "配穴演習" }],
  },
} as const;

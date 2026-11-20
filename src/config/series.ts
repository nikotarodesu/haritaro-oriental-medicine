import { BookOpen, ClipboardList, MapPin } from "lucide-react";

export const PLATFORM_DESCRIPTION = "ツボや症状を調べ、東洋医学の考え方を読み、架空の症例で学べる鍼灸の情報サイト。全361経穴を名前・部位・経絡から探せます。";

export const SERIES = {
  dictionary: {
    name: "はり太郎のツボ図鑑",
    shortName: "ツボ図鑑",
    href: "/tsubo",
    icon: MapPin,
    description: "ツボを名前・部位・経絡から探し、位置の図と注意点を確認できます。",
    links: [{ href: "/tsubo", label: "ツボから探す" }, { href: "/symptoms", label: "症状から探す" }],
  },
  reading: {
    name: "はり太郎の東洋医学",
    shortName: "東洋医学",
    href: "/learn",
    icon: BookOpen,
    description: "陰陽・気血水・経絡を、講義と身近な例で学びます。",
    links: [{ href: "/learn/essentials", label: "東洋医学の要点" }, { href: "/diagnosis", label: "気血水 体質チェック" }],
  },
  practice: {
    name: "はり太郎の臨床演習",
    shortName: "臨床演習",
    href: "/clinical",
    icon: ClipboardList,
    description: "架空の症例で、所見の読み取りと見立て・配穴を練習できます。",
    links: [{ href: "/cases", label: "症例演習" }, { href: "/practice/haiketsu", label: "配穴演習" }],
  },
} as const;

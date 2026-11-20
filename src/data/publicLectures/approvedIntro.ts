import type { PublicLectureArticle } from "./types";
import { ACUPUNCTURE_GUIDE } from "@/config/acupunctureLearning";

export const approvedIntroId = "lecture-intro-1";
export const approvedIntroReferences = [
  { name: "日本東洋医学会「養生について」「漢方の歴史」", url: "https://www.jsom.or.jp/kampo/about/note02.html", scope: "大陸から伝わった医学の日本での展開と、漢方・鍼灸・養生の位置づけ" },
  { name: "日本東洋医学会「気および気の異常」", url: "https://www.jsom.or.jp/kampo/consultation/ki.html", scope: "漢方での気虚の意味" },
  { name: "日本東洋医学会「四診総論」", url: "https://www.jsom.or.jp/kampo/consultation/howto.html", scope: "話を聞くなど、診察で確かめること" },
  { name: "厚生労働省 e-ヘルスネット「Hb／血色素量」", url: "https://kennet.mhlw.go.jp/information/information/dictionary/metabolic/ym-074.html", scope: "ヘモグロビンの働きと、貧血を調べるときに見る値" },
  { name: "厚生労働省 eJIM「統合医療とは？」", url: "https://www.ejim.mhlw.go.jp/public/about/", scope: "現代医学の診療に伝統医学が組み合わされる例" },
  { name: "WHO International Standard Terminologies on Traditional Chinese Medicine（2022年）", url: "https://www.who.int/publications/b/55892", scope: "伝統医学の用語と定義の範囲" },
  { name: "米国国立補完統合衛生センター Traditional Chinese Medicine", url: "https://www.nccih.nih.gov/health/traditional-chinese-medicine-what-you-need-to-know", scope: "伝統中国医学の範囲と医療機関への相談" },
  { name: "WHO Benchmarks for the Training of Acupuncture（2021年）", url: "https://www.who.int/publications/i/item/9789240017962", scope: "鍼灸の学習・研修の背景" },
  { name: "ISO/TS 16277-1:2015", url: "https://www.iso.org/standard/56044.html?browse=tc", scope: "伝統医学で観察した内容を整理する用語規格" },
];

export const approvedIntro: PublicLectureArticle = {
  "title": "東洋医学とは？ 西洋医学との違いを「夕方の疲れ」から考える",
  "description": "夕方の疲れを例に、西洋医学では何を調べ、東洋医学では体の状態をどう見立てるかを紹介します。貧血と気虚の違いも分かります。",
  "lead": "「夕方になると疲れる」。夕食の支度を始めると脚が重くなって、椅子に座ると少し楽になる。そこまで話せば、いつ、何をしているときにつらくなるのかが伝わります。同じ話を聞いたあと、西洋医学と東洋医学では何を確かめるのでしょうか。",
  "sections": [
    {
      "heading": "同じ「疲れる」を、西洋医学と東洋医学で考える",
      "paragraphs": [
        "東洋医学は、ここでは日本で発展した漢方や鍼灸（しんきゅう）など、東アジアに由来する伝統医学のことです。西洋医学は、病院や診療所で広く使われている現代医学を指します。どちらの診察でも、疲れがいつ始まったか、食欲や眠りが変わったかを尋ねることがあります。",
        "西洋医学では、話を聞いて診察し、考えられる原因を絞ります。たとえば医師が貧血の可能性を考えたら、血液検査で、酸素を運ぶヘモグロビンの量などを調べます。どの検査が必要かは、ほかの症状やこれまでの経過によって変わります。",
        "東洋医学の伝統的な診察では、聞いた話に、顔色など診察で分かったことを合わせて、体の状態を伝統医学の言葉で捉えます。たとえば「気虚（ききょ）」は、体を動かしたり支えたりする「気」の働きが足りないと見るときに使う言葉です。"
      ]
    },
    {
      "heading": "「貧血」と「気虚」は、何を見て使う言葉？",
      "paragraphs": [
        "「貧血」は、血液検査などをもとに調べる現代医学の診断名です。「気虚」は、体の働きをどう捉えたかを表す伝統医学の言葉です。日本では、医師が現代医学の診療を行いながら、必要に応じて漢方の見方を取り入れることもあります。",
        "東洋医学の本では、ほかにも「陰陽（いんよう）」や「経絡（けいらく）」という言葉に出会います。陰陽は明暗や動きのように性質を比べる言葉。気・血・津液（き・けつ・しんえき）は体の働きや養い、潤いを説明するときに使います。経絡は、体のつながりを道筋で表したものです。"
      ],
      "links": [{ "href": ACUPUNCTURE_GUIDE.href, "label": "はり・お灸・ツボ押しの違いを図で見る" }]
    },
    {
      "heading": "知りたいことによって、確かめ方が変わる",
      "paragraphs": [
        "「気虚ってどういう意味？」と思ったら、用語集を開きます。「この方法で疲れはどのくらい軽くなる？」と思ったら、どんな人を対象に、何と比べた研究かを読みます。",
        "「自分はどうして疲れやすいのか」が気になるときは、「夕食を作るときに脚が重くなる」といった経過が、診察で話せる材料になります。疲れが続く、強くなる、生活に支障が出るときは、医療機関に相談してください。"
      ],
      "links": [
        {
          "href": "/diagnosis",
          "label": "気血水の体質チェック"
        }
      ]
    }
  ]
};

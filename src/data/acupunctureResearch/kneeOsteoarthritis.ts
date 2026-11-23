import type { AcupunctureResearchArticle } from "./types";
import { MOXIBUSTION_KNEE_RESEARCH_HREF } from "@/config/acupunctureLearning";

export const KNEE_OSTEOARTHRITIS_RESEARCH: AcupunctureResearchArticle = {
  slug: "knee-osteoarthritis",
  title: "変形性膝関節症に対する鍼の比較試験",
  description: "変形性膝関節症の鍼の試験では、階段の上り下りや立ち上がりに関わる痛みと動作をどう測ったのでしょうか。模擬鍼や保存療法との比較から、改善率の読み方を確かめます。",
  sections: [
    {
      id: "sham-and-conservative-care",
      title: "保存療法と模擬鍼の両方を比べた試験",
      paragraphs: [
        "Scharfらは、変形性膝関節症による痛みが半年以上続く1,007人を3群に分けました。各群で理学療法と必要時の抗炎症薬を使えるようにしたうえで、伝統的な鍼を行う群、経穴から外れた場所に刺す模擬鍼を行う群、医師の診察を受ける保存療法群を比べました。",
        "26週後、痛みやこわばり、日常動作を尋ねる質問票（WOMAC）の合計点が36%以上改善した人は、順に53.1%、51.0%、29.1%でした。鍼と模擬鍼の間に明確な差は見られませんでした。保存療法群では診察でのやり取りが鍼の2群ほど密ではなく、保存療法との比較では、その違いが結果に影響した可能性もあります。",
      ],
      sources: ["scharf-2006"],
    },
    {
      id: "electroacupuncture-and-manual-acupuncture",
      title: "痛みと日常動作の両方が改善したかを測る",
      paragraphs: [
        "Tuらの試験は480人を電気鍼、手技鍼、模擬鍼の3群に分け、442人を解析しました。週3回の施術を8週間行いました。改善の基準は、痛みが0〜10点の尺度で2点以上、日常動作の支障がWOMACの日常動作の項目で6点以上下がることです。8週後に両方を満たした人の割合を比べました。",
        "基準を満たした人は電気鍼で60.3%、手技鍼で58.6%、模擬鍼で47.3%でした。模擬鍼との差は、電気鍼で13.0ポイント（97.5%信頼区間0.2〜25.9）、手技鍼で11.3ポイント（−1.6〜24.4）でした。電気鍼では事前に定めた統計上の基準を満たし、手技鍼では満たしませんでした。電気鍼と手技鍼の優劣は、この2つの対模擬鍼比較からは判断できません。",
      ],
      sources: ["tu-2021", "tu-study-poster"],
    },
    {
      id: "symptoms-and-mri",
      title: "質問票の改善とMRIでの軟骨の変化を分けて読む",
      paragraphs: [
        "Hangらの2026年の試験は、480人を電気鍼群と模擬鍼群に分けました。6週後、痛みと動作などを尋ねるWOMACの合計点（0〜240点）は、電気鍼群で調整後の平均が40.56点多く下がりました（95%信頼区間36.35〜44.77点）。",
        "膝のMRIも6週後に調べました。軟骨の厚さや体積など、一部の項目に見られた差は小さく、長期に軟骨が保たれるかは、この試験では分かりません。論文には、試験開始時の表でMRIの2項目の見出しが入れ替わっていたことを示す訂正が出ています。",
      ],
      sources: ["hang-2026", "hang-correction-2026"],
    },
    {
      id: "what-the-results-mean",
      title: "改善率が表す変化を確かめる",
      paragraphs: [
        "Scharfらは26週後の質問票の合計点、Tuらは8週後の痛みと日常動作それぞれの改善を使いました。数字を読むときは、何がどれだけ変われば「改善」と数えたのかを確かめます。立ち上がりや階段でどのくらい痛むか、どこまで動けるかといった変化を評価した結果で、これらの改善率では軟骨や関節の腫れの変化は分かりません。",
        "英国のNICEは2022年のガイドラインで、変形性関節症に鍼やドライニードリングを提供しないよう勧告しています。当時の複数の試験をもとに利益と害、費用対効果を検討し、電気鍼については結果にばらつきがあり、根拠の確かさが非常に低いとして、追加研究が必要としています。",
      ],
      sources: ["scharf-2006", "tu-2021", "nice-ng226", "nice-rationale"],
    },
  ],
  sources: [
    { id: "scharf-2006", label: "Scharfほか（2006年）", url: "https://pubmed.ncbi.nlm.nih.gov/16818924/", scope: "Annals of Internal Medicine。膝の鍼、模擬鍼、保存療法を比較した試験。" },
    { id: "tu-2021", label: "Tuほか（2021年）", url: "https://pubmed.ncbi.nlm.nih.gov/33174383/", scope: "Arthritis & Rheumatology。電気鍼、手技鍼、模擬鍼を比較した試験。" },
    { id: "tu-study-poster", label: "Tuほかの試験発表資料（PDF）", url: "https://med.stanford.edu/content/dam/sm/care/Poster-Jian-Feng-Tu.pdf", scope: "試験の著者による発表資料。痛みと日常動作を改善と数えるための基準。" },
    { id: "hang-2026", label: "Hangほか（2026年）", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC13223986/", scope: "eClinicalMedicine。電気鍼と模擬鍼で、症状の評価と膝MRIでの変化を調べた試験。" },
    { id: "hang-correction-2026", label: "Hangほかの訂正（2026年）", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC13544329/", scope: "試験開始時の表にあるMRI所見の2項目の見出しを訂正。" },
    { id: "nice-ng226", label: "NICEの変形性関節症ガイドライン（2022年）", url: "https://www.nice.org.uk/guidance/ng226/chapter/Recommendations#acupuncture", scope: "推奨1.3.8。鍼とドライニードリングについての英国の診療推奨。" },
    { id: "nice-rationale", label: "NICEの勧告の根拠（2022年）", url: "https://www.nice.org.uk/guidance/ng226/chapter/Rationale-and-impact#acupuncture", scope: "変形性関節症に対する鍼について、勧告の根拠と電気鍼に残る研究課題。" },
  ],
  related: [
    { href: "/symptoms/knee-joint-pain#safety", label: "膝の痛みの受診の目安" },
    { href: "/symptoms/knee-joint-pain#guide-studies", label: "膝の痛みのガイドに載っている研究" },
    { href: "/cases/case-14-knee-osteoarthritis", label: "立ち上がりと階段で膝が痛む人の症例演習" },
    { href: MOXIBUSTION_KNEE_RESEARCH_HREF, label: "膝のお灸で、痛みとやけどを調べた試験" },
  ],
  tags: ["変形性膝関節症", "膝の痛み", "鍼", "電気鍼", "模擬鍼", "保存療法", "WOMAC"],
};

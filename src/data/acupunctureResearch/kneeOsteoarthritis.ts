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
      ],
      sources: ["scharf-2006", "tu-2021"],
    },
    {
      id: "guidelines-nice-and-ace",
      title: "英国とシンガポールのガイドラインを比べる",
      paragraphs: [
        "英国のNICEは2022年に、変形性関節症の治療に鍼やドライニードリングを提供しないよう勧告しました。主に膝の試験をもとに、利益と害、英国の医療制度での費用対効果を検討しています。電気鍼は研究の規模が小さく結果にもばらつきがあり、どのような人に役立つかを調べるよう求めています。",
        "シンガポール保健省のACEは2026年に、運動や薬などで十分に改善しない人や、ほかの治療の選択肢を希望する人には、通常の治療に加える方法として鍼を検討するよう条件付きで勧めました。根拠資料は膝の20試験を検討し、研究結果のばらつきや推定値の幅を考慮して、確かさを低〜中程度と評価しています。本人の希望や、保険でどこまで費用がまかなえるか、施術を提供できる体制も検討しています。",
        "NICEの臨床研究の検索は2021年11月までです。ACEが引用した2025年のシンガポールの試験では、通常の診療に鍼と温熱療法を加えた群で、膝の症状と生活への影響を尋ねる質問票（KOOS-12）の合計点が、通常の診療だけの群より6週後に推定6.43点多く改善しました（95％信頼区間0.72〜12.14点）。この試験は鍼と温熱療法を組み合わせた場合の比較です。",
        "費用を調べたWhitehurstらの英国の研究は、運動と助言に鍼を加えた場合を評価しており、両方の機関が参照しています。ACEは、研究によって条件が異なるため、英国の費用対効果をシンガポールにそのまま当てはめることには限界があるとしています。推奨を読み比べるときは、根拠を集めた時期、比べた治療、想定した医療制度を確認します。",
      ],
      sources: ["nice-ng226", "nice-rationale", "nice-evidence-f", "singapore-ace-2026", "singapore-ace-etr-2026", "ng-harmoknee-2025", "whitehurst-2011"],
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
    { id: "nice-evidence-f", label: "NICEの根拠レビューF（2022年）", url: "https://www.nice.org.uk/guidance/ng226/evidence/f-clinical-and-cost-effectiveness-of-acupuncture-for-people-with-osteoarthritis-pdf-11250452851", scope: "付録Bの検索時期と費用対効果の表。Whitehurstらの費用の分析も掲載しています。" },
    { id: "singapore-ace-2026", label: "シンガポールACEの変形性膝関節症ガイドライン（2026年）", url: "https://www.ace-hta.gov.sg/healthcare-professionals/ace-repository-for-clinical-guidelines/management-of-knee-osteoarthritis---a-joint-effort-with-patients-acg/", scope: "推奨2と6。運動などの基本的な対応と、補助療法として鍼を検討する条件。" },
    { id: "singapore-ace-etr-2026", label: "Chanほか｜シンガポールACEの推奨の根拠（2026年）", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC13405452/", scope: "推奨6の根拠レビュー、根拠の確かさ、本人の希望、費用と実施体制。" },
    { id: "ng-harmoknee-2025", label: "NgほかのHARMOKnee試験（2025年）", url: "https://pubmed.ncbi.nlm.nih.gov/40769283/", scope: "抄録の方法と結果。通常の診療に鍼と温熱療法を併用した試験の6週評価。" },
    { id: "whitehurst-2011", label: "Whitehurstほかの費用対効果の研究（2011年）", url: "https://doi.org/10.2522/ptj.20100239", scope: "英国で、運動と助言に鍼を加えた場合の費用と健康上の効果を調べた分析。" },
  ],
  related: [
    { href: "/symptoms/knee-joint-pain#safety", label: "膝の痛みの受診の目安" },
    { href: "/symptoms/knee-joint-pain#guide-studies", label: "膝の痛みのガイドに載っている研究" },
    { href: "/cases/case-14-knee-osteoarthritis", label: "立ち上がりと階段で膝が痛む人の症例演習" },
    { href: MOXIBUSTION_KNEE_RESEARCH_HREF, label: "膝のお灸で、痛みとやけどを調べた試験" },
  ],
  tags: ["変形性膝関節症", "膝の痛み", "鍼", "電気鍼", "模擬鍼", "保存療法", "WOMAC"],
};

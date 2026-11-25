import type { AcupunctureResearchArticle } from "./types";

export const MIGRAINE_RESEARCH: AcupunctureResearchArticle = {
  slug: "migraine-prevention",
  title: "片頭痛の予防に対する鍼の比較試験",
  description: "片頭痛の予防を調べた試験を、通常ケア、模擬鍼、予防薬との比較から読みます。片頭痛があった日数と発作の回数をどう数えるかも確かめます。",
  sections: [
    {
      id: "nonpenetrating-sham",
      title: "皮膚を刺さない模擬鍼と比べた試験",
      paragraphs: [
        "Xuらは、前兆のない反復性片頭痛と診断され、鍼の経験がない150人を3群に分けました。通常ケアに手技鍼を加える群、皮膚を刺さない模擬鍼を加える群、通常ケアのみの群を比べました。手技鍼と模擬鍼は8週間で20回行いました。",
        "試験の17〜20週では、4週間に片頭痛があった日数の減少が、手技鍼群で模擬鍼群より調整後の平均で2.1日大きくなりました（95%信頼区間1.2〜2.9日）。同じ4週間の発作回数の減少も、調整後の平均で1.0回大きくなりました（95%信頼区間0.5〜1.5回）。",
      ],
      sources: ["xu-2020"],
    },
    {
      id: "sham-and-preventive-medication",
      title: "経穴から外れた場所への鍼と、予防薬も比べた試験",
      paragraphs: [
        "Dienerらは、前兆の有無を問わず月に2〜6回の片頭痛発作がある960人を、鍼、経穴から外れた場所に刺す模擬鍼、予防薬の3群に分け、794人を解析しました。鍼と模擬鍼は6週間で10回を基本とし、一部の参加者には追加で行いました。",
        "試験の23〜26週で片頭痛があった日数は、開始前の4週間に比べ、鍼で平均2.3日、模擬鍼で1.5日、予防薬で2.1日減りました。3群の差は統計上明確ではありませんでした。予防薬群では割り付けられた308人のうち106人が直後に参加を取りやめており、治療の優劣を判断する際にはこの偏りも考慮が必要です。",
      ],
      sources: ["diener-2006"],
    },
    {
      id: "migraine-days-and-attacks",
      title: "片頭痛があった日数と発作の回数を分ける",
      paragraphs: [
        "片頭痛の発作が2日続く場合、頭痛日記には発作が始まった回数と痛みがあった日を分けて記録できます。Zhaoらの試験では、前兆のない片頭痛の249人を鍼、模擬鍼、施術を待つ群に分け、割り付けから16週時点の発作回数の変化を主な指標としました。4週間あたりの発作は、順に平均3.2回、2.1回、1.4回減りました。",
        "どの試験も、数週間から数か月にわたる予防の変化を追っています。読み比べるときは、日数と回数のどちらを数えたか、模擬鍼の方法や施術の回数、評価した時点を確かめます。急に始まった強い頭痛など、受診を急ぐ症状は頭痛ガイドにまとめています。",
      ],
      sources: ["zhao-2017", "xu-2020", "diener-2006"],
    },
  ],
  sources: [
    { id: "xu-2020", label: "Xu ほか · BMJ（2020年、原著PDF）", url: "https://www.bmj.com/content/bmj/368/bmj.m697.full.pdf", scope: "前兆のない反復性片頭痛で、複数の経穴への手技鍼、模擬鍼、通常ケアを比較した試験。方法と17〜20週の結果を本文で確認（2026-11-25）。DOI 10.1136/bmj.m697" },
    { id: "diener-2006", label: "Diener ほか · The Lancet Neurology（2006年、原著抄録）", url: "https://pubmed.ncbi.nlm.nih.gov/16545747/", scope: "鍼、模擬鍼、予防薬の3群で片頭痛の日数を比較した試験。割り付け、解析人数、23〜26週の結果を抄録で確認（2026-11-25）。DOI 10.1016/S1474-4422(06)70382-9" },
    { id: "zhao-2017", label: "Zhaoほか（2017年）", url: "https://jamanetwork.com/journals/jamainternalmedicine/fullarticle/2603492", scope: "JAMA Internal Medicine。前兆のない片頭痛で、発作回数を主な指標とした試験。" },
  ],
  related: [
    { href: "/symptoms/headache-stiff-neck#safety", label: "頭痛で受診を急ぐ目安" },
    { href: "/symptoms/headache-stiff-neck#guide-studies", label: "頭痛のガイドに載っている研究" },
    { href: "/cases/case-01-headache-liver-fire", label: "こめかみの痛みと目の充血を訴える人の症例演習" },
  ],
  tags: ["片頭痛", "前兆のない片頭痛", "片頭痛予防", "頭痛日数", "発作回数", "鍼", "模擬鍼"],
};

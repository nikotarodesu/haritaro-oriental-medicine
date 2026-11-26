import { acupunctureResearchHref } from "@/config/acupunctureLearning";
import type { AcupunctureResearchArticle } from "./types";

export const ANTICOAGULANTS_AND_BLEEDING_RESEARCH: AcupunctureResearchArticle = {
  slug: "anticoagulants-and-bleeding",
  title: "抗凝固薬を使う人の鍼施術｜出血の研究を読む",
  description: "抗凝固薬を使う人が鍼を受けたあと、どんな出血が記録されたのでしょうか。台湾の保険記録と韓国の病院での調査を読み、出血の種類や観察期間によって数字の意味がどう変わるかを確かめます。",
  sections: [
    {
      id: "insurance-claims",
      title: "台湾の保険記録で、施術後14日以内の出血を数えた",
      paragraphs: [
        "Hsiehらは2000〜2018年の台湾の公的医療保険データを使い、821,946人の鍼施術13,447,563回を調べました。施術後14日以内に記録された出血のうち、皮膚の出血やあざと、内臓出血や輸血を要した血管の損傷などを分けて集計しました。",
        "抗凝固薬の使用と軽い出血に関連が見られました（調整オッズ比1.15、95％信頼区間1.03〜1.28）。研究で重い出血に分類した事象の推定値は1.18（0.80〜1.75）で、増加するかどうかには不確かさが残ります。保険記録を使った観察研究なので、記録された出血の原因が鍼だったかは個別には分かりません。",
      ],
      sources: ["hsieh-2023"],
    },
    {
      id: "bedside-observation",
      title: "病院では、皮膚に出た少量の出血も確かめた",
      paragraphs: [
        "Leeらは、韓国の入院患者428人を、鍼施術の直後と翌日の施術前に確認しました。抗凝固薬か抗血小板薬を使っていた169人のうち65人、どちらも使っていなかった259人のうち115人に、少量の出血やあざなどの軽い事象がありました。",
        "施術回数をもとに比べた相対リスクは0.87（95％信頼区間0.69〜1.10）で、明確な差は見られませんでした。二つの種類の薬をまとめた比較で、観察したのは翌日の施術前までです。",
      ],
      sources: ["lee-2018"],
    },
    {
      id: "oral-anticoagulants",
      title: "直接作用型経口抗凝固薬を使った人の記録",
      paragraphs: [
        "同じく韓国の病院で、Kwon・Jungらは入院患者316人の鍼施術10,177回の診療録を調べました。直接作用型経口抗凝固薬（DOAC）を使った28人では、1,076回の施術のうち42回（3.9％）で少量の出血が記録されました。抗血小板薬の群は5.6％、どちらも使っていない群は5.1％で、3群の差は統計的に明確ではありませんでした。",
        "この調査では、ワルファリンを使っていた人は比較から外れ、血液の凝固に関する検査値や血小板数が基準から外れた人も対象外でした。施術の直後に観察した出血と、台湾の保険記録が捉えた14日以内の出血では、観察の時間も拾い上げる事象も異なります。",
      ],
      sources: ["kwon-jung-2018", "hsieh-2023"],
    },
    {
      id: "before-treatment",
      title: "施術を相談するときに伝える情報",
      paragraphs: [
        "全日本鍼灸学会のガイドラインは、抗凝固薬を使っている人や出血性疾患のある人への施術で、出血リスクに注意するよう求めています。鍼を受けるか相談するときは、薬の名前や服用の理由、最近の出血やあざを施術者に伝えてください。薬は自己判断で中止せず、施術を受けてよいか迷うときは処方した医師に相談してください。",
      ],
      sources: ["jsam-2025"],
    },
  ],
  sources: [
    { id: "hsieh-2023", label: "Hsieh ほか · Complementary Therapies in Medicine（2023年）", url: "https://doi.org/10.1016/j.ctim.2023.102951", scope: "抄録の方法、評価項目、結果。台湾の保険記録で施術後14日以内の出血を集計。" },
    { id: "lee-2018", label: "Lee ほか · Complementary Therapies in Medicine（2018年）", url: "https://doi.org/10.1016/j.ctim.2018.08.006", scope: "抄録の方法と結果。入院中に2回観察し、薬を使った人と使っていない人を比較。" },
    { id: "kwon-jung-2018", label: "Kwon・Jung ほか · Evidence-Based Complementary and Alternative Medicine（2018年）", url: "https://doi.org/10.1155/2018/8042198", scope: "方法、表3、考察。薬の種類で分けた群の診療録の集計と対象から外れた条件。" },
    { id: "jsam-2025", label: "全日本鍼灸学会 · 鍼灸安全対策ガイドライン2025年版", url: "https://safety.jsam.jp/img/file1.pdf", scope: "印刷ページ11「注意すべき場合」の5項。出血性疾患や抗凝固薬を使用する場合の注意。" },
  ],
  related: [
    { href: "/safety#procedure", label: "鍼灸の施術前に確認すること" },
    { href: acupunctureResearchHref("adverse-events"), label: "鍼灸の有害事象を数字で読む" },
    { href: "/curriculum/lecture-treatment-9#lecture-section-1", label: "施術前に服薬や本人の心配を確認する演習" },
  ],
  tags: ["鍼の安全性", "抗凝固薬", "抗血小板薬", "出血", "内出血", "DOAC", "有害事象"],
};

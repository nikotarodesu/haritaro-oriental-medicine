import type { Metadata } from 'next';
import Link from 'next/link';
import { MEDICAL_SAFETY_SOURCES as sources, MEDICAL_SAFETY_CHECKED_AT, PROCEDURE_PUBLICATION_NOTICE } from '@/data/medicalSafety';

export const metadata: Metadata = {
  title: '受診の目安と鍼灸の安全性',
  description: '救急受診を優先する症状、鍼灸施術前の確認事項、教材の確認範囲と原典を案内します。',
  alternates: { canonical: '/safety' },
};

export default function SafetyPage() {
  return <main className="mx-auto max-w-3xl space-y-8 px-4 py-12 text-[#232826] dark:text-[#FAF8F5]">
    <h1 className="font-serif text-3xl font-bold">受診の目安と鍼灸の安全性</h1>
    <p className="leading-relaxed">体質チェックや弁証の結果で病気の有無や緊急性を判断することはできません。症状が続く、悪化する、普段と違う場合は医療機関へ相談してください。</p>
    <section id="emergency" className="space-y-3 rounded-2xl border border-red-200 bg-red-50 p-5 text-red-950 dark:border-red-900 dark:bg-red-950/30 dark:text-red-100">
      <h2 className="text-xl font-bold">突然の強い症状は119番へ</h2>
      <p>突然の激しい頭痛、急な片側の脱力や話しにくさ、強い胸の痛み・圧迫感、急な呼吸困難、意識が戻らない場合は救急要請を優先します。ツボ押しや演習を先に試すために待たないでください。</p>
      <p className="text-sm"><a className="underline" href={sources.emergency.url}>{sources.emergency.title}</a>を参照。判断に迷う場合は、実施地域で<a className="underline" href={sources.consultation.url}>#7119の救急相談</a>を利用できます。明らかな緊急症状では相談を待たず119番へ連絡してください。</p>
    </section>
    <section className="space-y-3"><h2 className="text-xl font-bold">腰痛と新たな排尿・感覚の異常</h2>
      <p>強い腰痛や脚へ広がる痛みに、新たな尿の出にくさ・失禁、排便や性機能の変化、会陰部のしびれが伴う場合は、馬尾症候群などの緊急評価が必要です。速やかに救急医療へつなぎ、鍼灸や経過観察を優先しないでください。これらの症状だけで診断は確定せず、症状がないことだけで完全に除外もできません。</p>
      <p className="text-sm">出典：<a className="underline" href={sources.caudaEquina.url}>NICE NG127 1.7.3</a>。英国の紹介基準を参考にし、国内の受診経路へ置き換えて説明しています。</p>
    </section>
    <section id="procedure" className="space-y-3"><h2 className="text-xl font-bold">施術前に確認すること</h2>
      <p>妊娠中、抗凝固薬などの服薬中、出血性疾患、感染症や発熱、植込み型医療機器がある場合は、事前に施術者へ伝え、必要に応じて主治医と施術の適否を確認します。服薬を自己判断で止めないでください。</p>
      <p>眼・頸部・胸背部・脊柱・腹部には重要な臓器、血管、神経があります。深さや方向は局所解剖だけでなく体格・体位などによって変わり、骨があることや浅い刺激だけでは安全を保証できません。自己刺鍼や、未確認の手順を再現する行為は避けてください。</p>
      <p>胸背部への施術後に胸痛や息苦しさが出た場合は、気胸などを考えて速やかに受診してください。強い呼吸困難では救急要請を優先します。悪化を「好転反応」と決めつけて待たないでください。</p>
      <p className="text-sm">出典：<a className="underline" href={sources.jsam.url}>全日本鍼灸学会ガイドライン2025年版</a>（印刷頁11–14、33、35）、<a className="underline" href={sources.nccih.url}>NCCIHの安全性情報</a>。</p>
    </section>
    <section className="space-y-3"><h2 className="text-xl font-bold">教材で確認できる範囲</h2>
      <p>{PROCEDURE_PUBLICATION_NOTICE}</p>
      <p>古典の禁穴・補瀉・陰陽の説明は伝統医学の学習内容です。現代の臓器損傷リスクや治療効果の証明としては扱いません。模式図も、個人の画像検査や刺入計画を代替しません。</p>
      <p className="text-sm">原典を確認した日：{MEDICAL_SAFETY_CHECKED_AT}。このページは編集上の原典照合に基づく説明です。サイト全件の照合と専門家監修は継続中です。</p>
      <Link href="/editorial-policy" className="underline">医学記述・出典の確認状況</Link>
    </section>
  </main>;
}

import type { Metadata } from 'next';
import { pageSocialMetadata, seriesPageTitle } from '@/config/seo';
import Link from 'next/link';
import PageIntro from '@/components/design/PageIntro';
import { BookOpen, ClipboardList, Hand, HeartPulse, Phone, ShieldCheck } from 'lucide-react';
import { acupunctureResearchHref, ANTICOAGULANTS_RESEARCH_HREF, MOXIBUSTION_KNEE_RESEARCH_HREF } from '@/config/acupunctureLearning';
import { MEDICAL_SAFETY_SOURCES as sources, MEDICAL_SAFETY_CHECKED_AT, PROCEDURE_PUBLICATION_NOTICE } from '@/data/medicalSafety';

const title = seriesPageTitle("受診の目安と鍼灸の安全性", "dictionary");

export const metadata: Metadata = {
  title,
  description: '救急受診を優先する症状、鍼灸施術前の確認事項、教材の確認範囲と原典を案内します。',
  ...pageSocialMetadata(title, '救急受診を優先する症状、鍼灸施術前の確認事項、教材の確認範囲と原典を案内します。', '/safety'), alternates: { canonical: '/safety' },
};

export default function SafetyPage() {
  return <div className="page-layout page-layout--reading space-y-8 leading-relaxed">
    <PageIntro title="受診の目安と鍼灸の安全性" description="急な症状で受診を急ぐときの目安と、鍼灸を受ける前後に確かめることを案内します。" art="care" compact />
    <section id="emergency" className="space-y-3 rounded-2xl border border-red-200 bg-red-50 p-5 text-red-950 dark:border-red-900 dark:bg-red-950/30 dark:text-red-100">
      <h2 className="flex items-center gap-2 text-xl font-bold"><Phone size={21} className="shrink-0" aria-hidden="true" />突然の強い症状は119番へ</h2>
      <p>次のような症状があるときは、すぐに119番へ連絡してください。</p>
      <ul className="grid list-disc gap-x-6 gap-y-1 pl-5 sm:grid-cols-2">
        <li>突然の激しい頭痛</li>
        <li>急に体の片側に力が入らない、話しにくい</li>
        <li>胸に強い痛みや圧迫感がある</li>
        <li>急に息苦しくなる</li>
        <li>意識が戻らない</li>
      </ul>
      <p>判断に迷う場合は、実施地域で<a className="underline" href={sources.consultation.url}>#7119の救急相談</a>を利用できます。</p>
      <p className="text-sm"><a className="underline" href={sources.emergency.url}>{sources.emergency.title}</a></p>
    </section>
    <p>症状が続く、悪化する、普段と違うと感じるときは医療機関に相談してください。体質チェックや弁証で、病気の有無や緊急性を判断することはできません。</p>
    <nav aria-label="安全性の確認項目" className="page-actions">
      <a href="#procedure" className="page-secondary-action"><ShieldCheck size={18} aria-hidden="true" />施術の前後に確認すること</a>
      <Link href="/symptoms" className="page-secondary-action">症状から受診の目安を探す（一般向け）</Link>
      <a href="#learning-scope" className="page-secondary-action"><BookOpen size={18} aria-hidden="true" />教材で確認できる範囲</a>
    </nav>
    <section className="space-y-3"><h2 className="text-xl font-bold">腰痛と新たな排尿・感覚の異常</h2>
      <p>強い腰痛や脚へ広がる痛みに、新たな尿の出にくさ・失禁、排便や性機能の変化、会陰部のしびれが伴う場合は、馬尾症候群などの緊急評価が必要です。鍼灸を試すために待たず、すぐに医療機関を受診してください。これらの症状だけで診断は確定せず、症状がないことだけで完全に除外もできません。</p>
      <p className="text-sm">出典：<a className="underline" href={sources.caudaEquina.url}>NICE NG127 1.7.3</a>。英国の紹介基準を参考にし、国内の受診経路へ置き換えて説明しています。</p>
    </section>
    <section id="procedure" className="scroll-mt-28 space-y-4"><h2 className="text-xl font-bold">鍼灸を受ける前と受けたあと</h2>
      <ol role="list" className="grid gap-3">
        <li className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-3 rounded-xl border border-[var(--border-washi)] bg-[var(--bg-card)] p-4">
          <ClipboardList size={22} className="mt-1 text-[var(--accent-readable)]" aria-hidden="true" />
          <div className="space-y-1">
            <h3 className="text-base font-bold">施術前に、薬や体の状態を伝える</h3>
            <p>妊娠中の方、抗凝固薬などを服用している方、出血性疾患、感染症や発熱、植込み型医療機器がある方は、施術前に伝えてください。必要があれば主治医にも施術を受けてよいか確認します。薬は自己判断で止めないでください。</p>
          </div>
        </li>
        <li className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-3 rounded-xl border border-[var(--border-washi)] bg-[var(--bg-card)] p-4">
          <Hand size={22} className="mt-1 text-[var(--accent-readable)]" aria-hidden="true" />
          <div className="space-y-1">
            <h3 className="text-base font-bold">自分で鍼を刺さない</h3>
            <p>目の周り、首、胸や背中、背骨の周り、おなかには重要な臓器、血管、神経があります。体格や姿勢によって皮膚から臓器までの距離が変わります。骨があることや浅く刺すことだけでは、安全を確かめられません。安全性が確認されていない手順をまねることも避けてください。</p>
          </div>
        </li>
        <li className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-3 rounded-xl border border-[var(--border-washi)] bg-[var(--bg-card)] p-4">
          <HeartPulse size={22} className="mt-1 text-[var(--accent-readable)]" aria-hidden="true" />
          <div className="space-y-1">
            <h3 className="text-base font-bold">胸や背中への施術後に胸が痛む・息苦しい</h3>
            <ul className="list-disc space-y-1 pl-5">
              <li>胸が強く痛む、または息苦しさが強いときは、すぐに119番へ連絡してください。</li>
              <li>痛みや息苦しさが軽くても、新たに出たときはすぐに医療機関を受診してください。</li>
            </ul>
            <p>症状が悪化したときは、いわゆる「好転反応」と自己判断して様子を見ず、医療機関に相談してください。</p>
          </div>
        </li>
      </ol>
      <p className="text-sm">出典：<a className="underline" href={sources.jsam.url}>全日本鍼灸学会ガイドライン2025年版</a>（印刷頁11–14、33、35）、<a className="underline" href={sources.nccih.url}>NCCIHの安全性情報</a>。</p>
      <Link href={acupunctureResearchHref("adverse-events")} className="ui-text-link">鍼灸の有害事象を数字で読む</Link>
      <p><Link href={ANTICOAGULANTS_RESEARCH_HREF} className="ui-text-link">抗凝固薬を使っている人の出血を調べた研究</Link></p>
      <p><Link href={`${MOXIBUSTION_KNEE_RESEARCH_HREF}#burns-and-denominators`} className="ui-text-link">お灸の試験で報告されたやけどを読む</Link></p>
    </section>
    <section id="learning-scope" className="scroll-mt-28 space-y-3"><h2 className="text-xl font-bold">教材で確認できる範囲</h2>
      <p>{PROCEDURE_PUBLICATION_NOTICE}</p>
      <p><Link href="/curriculum/lecture-treatment-9#lecture-section-4" className="ui-text-link">施術後の胸痛と息苦しさを題材にした演習（鍼灸学生・鍼灸師向け）</Link></p>
      <p>古典の禁穴・補瀉・陰陽の説明は伝統医学の学習内容です。現代の臓器損傷リスクや治療効果の証明としては扱いません。模式図も、個人の画像検査や刺入計画を代替しません。</p>
      <p className="text-sm">原典を確認した日：{MEDICAL_SAFETY_CHECKED_AT}。このページでは、受診の目安と鍼灸の安全性を上記の資料から確認しています。</p>
      <Link href="/editorial-policy" className="underline">医学記述・出典の確認状況</Link>
    </section>
  </div>;
}

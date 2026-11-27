import { pageSocialMetadata, seriesPageTitle, SITE_AUTHOR, SITE_ORIGIN } from "@/config/seo";
import { AUTHOR_OPENED_AT } from "@/config/author";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import PageIntro from "@/components/design/PageIntro";
import { getArticlePreviews } from "@/data/articleData";

const pageTitle = seriesPageTitle("はり太郎の運営者・資格・編集方針", "reading");
const pageDescription = "ツボ図鑑・東洋医学・臨床演習を運営する鍼灸師の資格と、出典や教材の確認状況をご案内します。";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/about" },
  ...pageSocialMetadata(pageTitle, pageDescription, "/about"),
};

const learningLinks = [
  { href: "/tsubo", label: "ツボの位置を図鑑で調べる" },
  { href: "/symptoms", label: "症状別に受診の目安を見る" },
  { href: "/learn", label: "東洋医学の基本から学ぶ" },
  { href: "/curriculum", label: "講義・演習の目次から選ぶ" },
  { href: "/clinical", label: "模擬症例で考え方を練習する" },
  { href: "/library", label: "古典の原文と研究の出典を読む" },
];

export default function AboutPage() {
  const [comparisonArticle] = getArticlePreviews(["east-west-integrative-unified-theory"]);
  return (
    <article className="about-page page-layout page-layout--reading space-y-9 sm:space-y-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "@id": SITE_ORIGIN + "/about",
        name: "はり太郎について",
        url: SITE_ORIGIN + "/about",
        inLanguage: "ja",
        mainEntity: { "@id": SITE_AUTHOR["@id"] },
      }) }} />
      <PageIntro title="はり太郎について" description="誰が、どんな資料をもとに教材を作っているかを紹介します。" compact />

      <section aria-labelledby="about-operator" className="border-y border-divider py-5 sm:py-7">
        <h2 id="about-operator" className="page-section-heading scroll-mt-28">執筆・運営者</h2>
        <div className="flex items-center gap-4">
          <Image src="/icon.png" alt="" width={64} height={64} className="size-14 rounded-xl border border-divider sm:size-16" />
          <div>
            <h3 className="font-serif text-2xl font-semibold text-ink">はり太郎</h3>
            <p className="text-muted">鍼灸師・鍼灸院院長</p>
          </div>
        </div>
        <div className="mt-4 space-y-3">
          <p>2017年にはり師・きゅう師免許を取得し、{AUTHOR_OPENED_AT}に開業しました。身体ケア・臨床に関わる仕事を通算10年以上続けてきました。</p>
          <p>鍼灸専門学校を卒業後、鍼灸接骨院、リラクゼーション、デイサービスで働きました。現在は鍼灸院を運営しながら、一人でこのサイトの資料調査、執筆、開発を行っています。</p>
        </div>
      </section>

      <section aria-labelledby="about-teaching" className="space-y-4">
        <h2 id="about-teaching" className="page-section-heading">このサイトを作った理由</h2>
        <p>陰陽・五行・気・血・津液（気血水）など、東洋医学には日常で使わない言葉が多くあります。初めて学ぶ方が、その意味と使い方を一つずつ確かめられるように教材を作っています。</p>
        <p>五行の講義では、木から火へ向かう相生と、木から土へ向かう相剋を図で比べます。模擬症例では、たとえば「肩が痛い」という訴えを読み、いつ始まったか、腕をどこまで上げると痛むかを拾います。どの所見を根拠にしたか、次に何を聞きたいかを解答例と照らし合わせられます。</p>
        {comparisonArticle && (
          <Link href="/articles/east-west-integrative-unified-theory" className="ui-text-link inline-flex min-h-11 items-center gap-2">
            {comparisonArticle.title}<ArrowRight aria-hidden="true" size={16} className="shrink-0" />
          </Link>
        )}
      </section>

      <section aria-labelledby="about-review-scope" className="space-y-4 border-t border-divider pt-6">
        <h2 id="about-review-scope" className="page-section-heading scroll-mt-28">参照資料と訂正の窓口</h2>
        <dl className="divide-y divide-divider">
          <div className="grid gap-1 py-3 sm:grid-cols-[10em_1fr] sm:gap-5">
            <dt className="font-semibold">経穴・経絡・基礎理論</dt>
            <dd>WHOの標準経穴部位、はり師きゅう師養成標準教科書、『黄帝内経』『難経』『甲乙経』などの古典を参照します。</dd>
          </div>
          <div className="grid gap-1 py-3 sm:grid-cols-[10em_1fr] sm:gap-5">
            <dt className="font-semibold">現代医学・自然科学</dt>
            <dd>PubMedに収載された査読論文や、公的機関の診療ガイドラインを参照します。</dd>
          </div>
        </dl>
        <p>各教材に資料名と参照箇所を載せています。確認の手順と第三者による監修の状況は、<Link href="/editorial-policy" className="ui-text-link">医学記述・出典の確認方針</Link>で公開しています。</p>
        <p>誤字や内容の誤りは、該当ページと記述を添えて<Link href="/contact" className="ui-text-link">お問い合わせフォーム</Link>からお知らせください。出典を確認し、訂正内容を記録します。</p>
      </section>

      <section aria-labelledby="about-safety" className="space-y-3 border-s-2 border-frame bg-panel px-4 py-4 sm:px-6">
        <h2 id="about-safety" className="font-semibold text-ink">教材の利用と受診について</h2>
        <p>ツボや日々の過ごし方、気血水の体質チェック（学習用）は東洋医学を学ぶための教材です。症状の診断や治療については、医師や鍼灸師に相談してください。</p>
        <p>突然の激しい痛みや意識の異常があるときは、すぐに119番へ連絡してください。体調が急に悪化したときや、妊娠中に重い症状が出たときは、ツボを押す前に医療機関を受診してください。</p>
      </section>

      <nav aria-labelledby="about-start-guide">
        <h2 id="about-start-guide" className="page-section-heading scroll-mt-28">目的に合う始め方</h2>
        <ul className="grid gap-x-7 sm:grid-cols-2">
          {learningLinks.map(({ href, label }) => (
            <li key={href} className="border-b border-divider">
              <Link href={href} className="flex min-h-12 items-center justify-between gap-3 py-2 font-medium text-accent hover:underline">
                {label}<ArrowRight aria-hidden="true" size={16} className="shrink-0" />
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </article>
  );
}

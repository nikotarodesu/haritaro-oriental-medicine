import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { pageSocialMetadata, seriesPageTitle } from "@/config/seo";
import { getAcupointByCode } from "@/data/tsubo";
import { EXTRA_POINTS_PATH } from "@/data/tsubo/extraPoints";
import { ATLAS_STUDY_ROUTES, atlasStudyExercise } from "@/data/tsubo/atlas/studyRoutes";
import {
  FIVE_TRANSPORT_STAGES,
  KEY_POINT_TYPES,
  KEY_POINT_TYPES_GUIDE,
  keyPointFilterHref,
} from "@/data/tsubo/keyPointTypes";

const heading = "ツボの分類（要穴）";
const title = seriesPageTitle("要穴とは？ 原穴・五輸穴・四総穴などの分類", "dictionary");
const description = "原穴・絡穴・郄穴・募穴・背部兪穴・五輸穴など、鍼灸で使われる伝統的なツボの分類を解説します。分類ごとに該当するツボを図鑑で探せます。";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: KEY_POINT_TYPES_GUIDE },
  ...pageSocialMetadata(title, description, KEY_POINT_TYPES_GUIDE),
};

const sources = [
  {
    title: "WHO西太平洋地域事務局『伝統医学国際標準用語』（2007年）",
    href: "https://iris.who.int/bitstream/handle/10665/206952/9789290612487_eng.pdf",
    scope: "伝統医学での要穴の分類名と定義（p.237–238）。",
  },
  {
    title: "『新版 経絡経穴概論』第2版",
    href: "https://store.isho.jp/search/detail/productId/2607196920",
    scope: "東洋療法学校協会・日本理療科教員連盟による教科書。日本の鍼灸教育で用いる分類と表記。",
  },
  {
    title: "『霊枢』本輸篇",
    href: "https://www.shidianguji.com/zh/book/GJTS17/chapter/1lpfcd2hn5n9c",
    scope: "五輸穴の並びと合谷の原穴としての記載。",
  },
  {
    title: "『鍼灸聚英』四総穴歌",
    href: "https://zh.wikisource.org/wiki/%E9%8D%BC%E7%81%B8%E8%81%9A%E8%8B%B1/%E5%9B%9B%E7%B8%BD%E7%A9%B4%E6%AD%8C",
    scope: "四つの部位と四総穴の対応。",
  },
  {
    title: "『針灸大成』巻七・八脈交会八穴歌",
    href: "https://zh.wikisource.org/zh-hant/%E9%87%9D%E7%81%B8%E5%A4%A7%E6%88%90/%E5%8D%B7%E4%B8%83#%E5%85%AB%E8%84%88%E4%BA%A4%E6%9C%83%E5%85%AB%E7%A9%B4%E6%AD%8C",
    scope: "八脈交会穴と奇経八脈の対応。",
  },
] as const;

export default function KeyPointTypesPage() {
  return (
    <article className="page-layout atlas-page atlas-entry">
      <header className="atlas-guide-heading">
        <div>
          <nav aria-label="パンくず" className="atlas-breadcrumb">
            <Link href="/tsubo">はり太郎のツボ図鑑</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">ツボの分類</span>
          </nav>
          <h1 className="mt-2 text-3xl font-bold leading-snug sm:text-4xl">{heading}</h1>
          <p className="mt-3">要穴（ようけつ）は、鍼灸で使われる伝統的なツボの分類です。たとえば合谷は、手の陽明大腸経の原穴であり、古典に出てくる四総穴の一つでもあります。</p>
          <p className="mt-2">標準361経穴には、十二経脈と任脈・督脈の経穴が含まれます。印堂・太陽の場所と、資料によるコードの違いは<Link href={EXTRA_POINTS_PATH} className="atlas-source-link">奇穴の図鑑</Link>で確認できます。</p>
          <nav aria-label="要穴の分類へ移動" className="atlas-directory-actions mt-2">
            {KEY_POINT_TYPES.map(({ id, label }) => (
              <a key={id} href={`#${id}`} className="atlas-text-action">{label}</a>
            ))}
          </nav>
        </div>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        {KEY_POINT_TYPES.map(({ id, label, reading, description, codes, exampleCode, exampleLocation }) => {
          const example = getAcupointByCode(exampleCode);
          const exampleSection = exampleLocation ? "acupoint-location" : "acupoint-classifications";
          const topic = ATLAS_STUDY_ROUTES.find(route => route.readingHref === `${KEY_POINT_TYPES_GUIDE}#${id}`);
          const exercise = topic && atlasStudyExercise(topic);

          return (
            <section id={id} key={id} aria-labelledby={`${id}-heading`} className={`atlas-target min-w-0 space-y-2 rounded-xl border border-frame bg-panel p-4 ${id === "five-transport" ? "sm:col-span-2" : ""}`}>
              <h2 id={`${id}-heading`} className="atlas-section-title">{label}<span className="ml-2 text-sm font-normal ui-muted">（{reading}）</span></h2>
              <p>{description}</p>
              {id === "four-command" && (
                <ul className="flex flex-wrap gap-x-4" aria-label="四総穴の図鑑リンク">
                  {codes.map(getAcupointByCode).map(point => point && (
                    <li key={point.code}><Link href={`/tsubo/${point.codeLower}`} className="atlas-text-action">{point.name}（{point.code}）</Link></li>
                  ))}
                </ul>
              )}
              {example && (
                <p className="text-sm ui-muted">
                  {exampleLocation ? "位置の例 " : "例 "}
                  <Link href={`/tsubo/${example.codeLower}#${exampleSection}`} className="atlas-source-link">{example.name}（{example.code}）</Link>
                  {exampleLocation && `は、${exampleLocation}`}
                </p>
              )}
              <Link href={keyPointFilterHref(label)} prefetch={false} className="atlas-text-action">
                {label}のツボ一覧（{codes.length}穴） <ArrowRight aria-hidden="true" size={15} />
              </Link>
              {exercise && (
                <div><Link href={exercise.href} prefetch={false} className="page-secondary-action">{exercise.label}<ArrowRight aria-hidden="true" size={16} /></Link></div>
              )}
              {id === "five-transport" && (
                <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3" aria-label="五輸穴の内訳">
                  {FIVE_TRANSPORT_STAGES.map(stage => (
                    <li id={stage.id} className="atlas-target min-w-0 rounded-lg border border-frame px-3 py-2" key={stage.id}>
                      <h3 className="font-semibold">{stage.stem}穴<span className="ml-1 text-sm font-normal ui-muted">（{stage.reading}）</span></h3>
                      <p className="text-sm">{stage.image}にたとえます。</p>
                      <p className="text-sm ui-muted">陰経は{stage.yin}、陽経は{stage.yang}</p>
                      <Link href={keyPointFilterHref(stage.label)} prefetch={false} className="atlas-text-action">{stage.stem}穴の一覧 <ArrowRight aria-hidden="true" size={15} /></Link>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          );
        })}
      </div>

      <section aria-labelledby="key-point-sources">
        <h2 id="key-point-sources" className="atlas-section-title">出典</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm leading-6">
          {sources.map(({ title, href, scope }) => (
            <li key={href}>{scope} <a href={href} className="atlas-source-link">{title}</a></li>
          ))}
        </ul>
      </section>
    </article>
  );
}

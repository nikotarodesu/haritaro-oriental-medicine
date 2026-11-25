import type { Metadata } from "next";
import Link from "next/link";
import { pageSocialMetadata, seriesPageTitle } from "@/config/seo";
import {
  ACUPOINT_NAME_INDEX_PATH,
  NAME_INDEX_EXAMPLES,
  acupointNameIndexHref,
  getAcupointNameCharacter,
} from "@/data/tsubo/names/characterIndex";
import { getAtlasLocationSimple } from "@/data/tsubo/friendlyLocations";

const title = seriesPageTitle("ツボ名の漢字索引", "dictionary");
const description = "「谷」「泉」「髎」など、ツボの名前に使う漢字一字から経穴を探せます。日本語と中国語の表記を収録し、名前の由来を読み比べられます。";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  ...pageSocialMetadata(title, description, ACUPOINT_NAME_INDEX_PATH),
  alternates: { canonical: ACUPOINT_NAME_INDEX_PATH },
};

export default async function AcupointNameIndexPage({ searchParams }: {
  searchParams: Promise<{ kanji?: string | string[] }>;
}) {
  const { kanji } = await searchParams;
  const query = (typeof kanji === "string" ? kanji : kanji === undefined ? "谷" : "").trim().normalize("NFKC");
  const valid = /^\p{Script=Han}$/u.test(query);
  const result = valid ? getAcupointNameCharacter(query) : undefined;

  return (
    <div className="page-layout atlas-page atlas-entry atlas-character-index">
      <header className="atlas-point-header">
        <nav aria-label="パンくず" className="atlas-breadcrumb">
          <Link href="/tsubo">はり太郎のツボ図鑑</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">漢字索引</span>
        </nav>
        <div className="atlas-point-identity"><h1>ツボ名の漢字索引</h1></div>
        <p>名前の一字からツボを探せます。日本語と中国語のどちらの表記でも引けます。</p>
      </header>

      <div className="atlas-character-search">
        <form action={ACUPOINT_NAME_INDEX_PATH + "#kanji-results"} method="get" role="search" aria-label="ツボ名の漢字を検索">
          <label htmlFor="point-name-kanji">漢字一字</label>
          <div className="atlas-character-form-row">
            <input id="point-name-kanji" name="kanji" type="text" defaultValue={valid ? query : ""} placeholder="谷" maxLength={2} required />
            <button type="submit">探す</button>
          </div>
        </form>

        <nav aria-label="よく使われる漢字">
          <ul className="atlas-character-examples">
            {NAME_INDEX_EXAMPLES.map(character => (
              <li key={character}>
                <Link href={acupointNameIndexHref(character) + "#kanji-results"} prefetch={false}
                  aria-current={result?.forms.includes(character) ? "page" : undefined}>{character}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <section id="kanji-results" className="atlas-target" aria-labelledby="kanji-results-heading">
        <h2 id="kanji-results-heading" className="atlas-section-title">
          {valid ? `「${query}」を含むツボ` : "漢字を一字入れてください"}
        </h2>
        {result ? (
          <>
            <p>{result.meaning}。</p>
            {result.forms.length > 1 && <p className="atlas-muted">ツボ名で使われる表記　{result.forms.join("・")}</p>}
            <p className="atlas-character-count">{result.points.length}穴</p>
            <ul className="atlas-character-results">
              {result.points.map(point => (
                <li key={point.code}>
                  <h3>
                    <Link href={`/tsubo/${point.codeLower}#acupoint-name`} prefetch={false} className="atlas-source-link">
                      {point.name}<span>{point.kana}・{point.code}</span>
                    </Link>
                  </h3>
                  <p>{getAtlasLocationSimple(point.codeLower)?.match(/^[^。]+。?/)?.[0]}</p>
                </li>
              ))}
            </ul>
          </>
        ) : <p>{valid ? "この字を使うツボ名は見つかりませんでした。" : "「谷」や「門」など、一字ずつ検索できます。"}</p>}
      </section>
    </div>
  );
}

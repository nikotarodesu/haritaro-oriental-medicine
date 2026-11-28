import Link from "next/link";
import AcupointIntroDetails from "./AcupointIntroDetails";
import { getAcupointName } from "@/data/tsubo/names";
import { acupointNameIndexHref, getAcupointNameCharacter } from "@/data/tsubo/names/characterIndex";

export default function AcupointNameGuide({ code }: { code: string }) {
  const name = getAcupointName(code);
  if (!name) return null;

  return (
    <AcupointIntroDetails>
      <div className="atlas-name-guide">
        <p>{name.reading}</p>
        {name.history && (
          <p className="atlas-name-history">
            {name.history.text}{" "}
            <a href={name.history.url} className="atlas-source-link">{name.history.source}</a>
          </p>
        )}

        <dl className="atlas-name-identity">
          <div>
            <dt>中国語（簡体字）</dt>
            <dd lang="zh-Hans">{name.chinese}</dd>
          </div>
          <div>
            <dt>ピンイン</dt>
            <dd lang="zh-Latn-pinyin">{name.pinyin}</dd>
          </div>
        </dl>

        {(code === "li10" || code === "st36") && (
          <a href="#featured-acupoint-pair-sanri" className="atlas-text-action">手三里と足三里の図を見比べる</a>
        )}

        <div>
          <h3 className="atlas-name-characters-title">漢字の意味</h3>
          <dl className="atlas-name-characters">
            {name.characters.map(({ character, meaning }) => {
              const entry = getAcupointNameCharacter(character);
              const hasOtherPoints = entry && entry.points.length > 1;
              return (
                <div key={character}>
                  <dt>
                    {hasOtherPoints ? (
                      <Link href={acupointNameIndexHref(character)} prefetch={false} aria-label={`「${character}」を使うツボを探す`}>
                        <span lang="zh-Hans">{character}</span>
                      </Link>
                    ) : <span lang="zh-Hans">{character}</span>}
                  </dt>
                  <dd>{meaning}</dd>
                </div>
              );
            })}
          </dl>
        </div>

        <ul className="atlas-name-sources" aria-label="名前と読みの資料">
          <li><a href={name.standardUrl} className="atlas-source-link">中国の国家標準（表記と読み、PDF）</a></li>
          <li><a href={name.nomenclatureUrl} className="atlas-source-link">WHOの経穴名称資料（PDF）</a></li>
        </ul>
      </div>
    </AcupointIntroDetails>
  );
}

import { getAcupointName } from "@/data/tsubo/names";

export default function AcupointNameGuide({ code }: { code: string }) {
  const name = getAcupointName(code);
  if (!name) return null;

  return (
    <section id="acupoint-name" className="atlas-target atlas-name-guide" aria-labelledby="acupoint-name-heading">
      <h2 id="acupoint-name-heading" className="atlas-section-title">名前の由来</h2>
      <div className="atlas-name-panel">
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

        <p>{name.reading}</p>

        <div>
          <h3 className="atlas-name-characters-title">漢字の意味</h3>
          <dl className="atlas-name-characters">
            {name.characters.map(({ character, meaning }) => (
              <div key={character}>
                <dt lang="zh-Hans">{character}</dt>
                <dd>{meaning}</dd>
              </div>
            ))}
          </dl>
        </div>

        {name.history && (
          <p className="atlas-name-history">
            {name.history.text}{" "}
            <a href={name.history.url} className="atlas-source-link">{name.history.source}</a>
          </p>
        )}

        <ul className="atlas-name-sources" aria-label="名前と読みの資料">
          <li><a href={name.standardUrl} className="atlas-source-link">中国の国家標準（表記と読み、PDF）</a></li>
          <li><a href={name.nomenclatureUrl} className="atlas-source-link">WHOの経穴名称資料（PDF）</a></li>
        </ul>
      </div>
    </section>
  );
}

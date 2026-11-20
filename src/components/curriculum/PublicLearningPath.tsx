import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import TaijiSymbol from "@/components/graphics/TaijiSymbol";
import { getLectureIndexGroups } from "@/data/publicLectures/readingUnits";

const STOPS = [
  { chapter: "intro", title: "東洋医学の入り口", topics: "鍼灸・漢方・養生" },
  { chapter: "yin-yang", title: "陰陽", topics: "対になる性質、変化" },
  { chapter: "qi-blood-water", title: "気・血・津液", topics: "体の働き、五臓・六腑" },
  { chapter: "five-elements", title: "五行・経絡", topics: "五つの分類とツボ" },
  { chapter: "pathology", title: "不調の見方", topics: "経過と所見の整理" },
] as const;

function TopicIllustration({ chapter }: { chapter: (typeof STOPS)[number]["chapter"] }) {
  const motifs = {
    intro: <>
      <path d="M32 23c-6-5-12-6-19-3v24c7-3 13-2 19 3 6-5 12-6 19-3V20c-7-3-13-2-19 3v24" />
      <path d="M19 27c3-1 6 0 8 1m-8 5c3-1 6 0 8 1m10-6c2-1 5-2 8-1m-8 7c2-1 5-2 8-1" stroke="var(--warm-readable)" />
    </>,
    "yin-yang": <g transform="translate(13 13) scale(.38)"><TaijiSymbol /></g>,
    "qi-blood-water": <>
      <path d="M32 20 17 41h30L32 20Z" strokeDasharray="2 3" opacity=".65" />
      <circle cx="32" cy="20" r="8" fill="var(--bg-washi)" />
      <circle cx="17" cy="41" r="8" fill="var(--bg-washi)" />
      <circle cx="47" cy="41" r="8" fill="var(--bg-washi)" />
      <path d="M28 20h8m-6-3h4m-4 6h4M17 37c-2 2-3 4-3 5a3 3 0 0 0 6 0c0-1-1-3-3-5Z" stroke="var(--warm-readable)" />
      <path d="M47 37c-2 2-3 4-3 5a3 3 0 0 0 6 0c0-1-1-3-3-5Z" />
    </>,
    "five-elements": <>
      <path d="M32 13 50 26 43 47H21L14 26Z" />
      <path d="M32 13 43 47 14 26h36L21 47Z" stroke="var(--warm-readable)" strokeDasharray="2 4" />
      {[[32, 13], [50, 26], [43, 47], [21, 47], [14, 26]].map(([x, y]) => (
        <circle key={x} cx={x} cy={y} r="3.3" fill="var(--bg-washi)" />
      ))}
    </>,
    pathology: <>
      <rect x="15" y="14" width="27" height="34" rx="3" />
      <path d="M22 22h13m-13 6h8m-8 6h5m-5 6h4" stroke="var(--warm-readable)" />
      <circle cx="41" cy="36" r="9" fill="var(--bg-washi)" />
      <path d="m47 43 7 7" />
    </>,
  };

  return (
    <svg viewBox="0 0 64 64" width="64" height="64" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {motifs[chapter]}
    </svg>
  );
}

export default function PublicLearningPath() {
  const chapters = getLectureIndexGroups("reading");

  return (
    <nav className="learning-path" aria-labelledby="learning-path-title">
      <div className="learning-path-heading">
        <h2 id="learning-path-title" className="reader-section-title">講義を順に読む</h2>
        <a href="#learn-courses-heading" className="ui-text-link">講義の目次<ArrowDown size={16} aria-hidden="true" /></a>
      </div>
      <ol className="learning-path-stops" role="list">
        {STOPS.map(stop => {
          const entry = chapters.find(chapter => chapter.id === stop.chapter)?.entries[0];
          if (!entry) return null;

          return (
            <li key={stop.chapter}>
              <Link href={entry.href} className="learning-path-stop" prefetch={false}>
                <span className="learning-path-art"><TopicIllustration chapter={stop.chapter} /></span>
                <span className="learning-path-label">
                  <strong>{stop.title}</strong>
                  <span>{stop.topics}</span>
                </span>
                <ArrowRight className="learning-path-arrow" size={18} aria-hidden="true" />
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

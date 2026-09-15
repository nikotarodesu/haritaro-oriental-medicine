export interface ReferenceItem {
  id: string; // 論文IDまたは任意のユニーク文字列 (例: "rct-insomnia-heart-liver-2025" or "ref-shokanron")
  type?: "paper" | "classic" | "guideline" | "book" | "review";
  title: string;
  originalTitle?: string;
  authors?: string | string[];
  source: string; // 掲載誌、書籍名、古典名、学会名
  year?: number | string;
  url?: string;
  doi?: string;
  pmid?: string;
  asin?: string; // Amazon ASINコード (例: "488574000X")
  isbn?: string; // ISBN
  amazonUrl?: string; // Amazon URL
  studyDesign?: string;
  sampleSize?: number;
  note?: string; // 臨床要点・概要
}

export interface ResolvedReference extends ReferenceItem {
  index: number; // 記事内での表示番号 (1, 2, 3...)
  anchorId: string; // HTMLアンカー用ID (ref-1, ref-2...)
}

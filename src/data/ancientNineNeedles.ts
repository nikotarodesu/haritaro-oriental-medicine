// Names, dimensions, and descriptions follow the third passage of Lingshu 1.
// The outlines are schematics of the features described there.
export const ANCIENT_NINE_NEEDLES = [
  {
    id: "zanshin", name: "鑱鍼", reading: "ざんしん", length: "1寸6分", shape: "太い頭と鋭い先",
    history: "体表に関わる「陽気」を調える道具として記されています。",
    outline: "M38 34H113Q131 34 144 29L164 43L144 57Q131 52 113 52H38Z",
    detail: "M43 43H160M116 35Q128 40 131 43Q128 47 116 51",
  },
  {
    id: "enshin", name: "員鍼", reading: "えんしん", length: "1寸6分", shape: "卵形の丸い先",
    history: "体表をこする道具として記されています。",
    outline: "M38 36H124Q134 35 141 31Q152 26 161 34Q172 43 161 52Q152 60 141 55Q134 51 124 50H38Z",
    detail: "M43 42H133Q147 34 157 38",
  },
  {
    id: "teishin", name: "鍉鍼", reading: "ていしん", length: "3寸半", shape: "穀粒に似た小さな先",
    history: "古典でいう「脈」に圧を加える道具です。先は黍（きび）や粟（あわ）の粒にたとえられます。",
    outline: "M28 36H83L156 39Q169 34 180 43Q169 52 156 47L83 50H28Z",
    detail: "M34 42H83L156 43Q166 40 175 43",
  },
  {
    id: "hoshin", name: "鋒鍼", reading: "ほうしん", length: "1寸6分", shape: "三つの稜を持つ刃",
    history: "長く続く不調を扱う記述に登場します。刃を三つの角で表しています。",
    outline: "M38 36H120L151 32L164 43L151 54L120 50H38Z",
    detail: "M44 43H164M120 36L135 43L120 50M151 32L153 43L151 54",
  },
  {
    id: "hishin", name: "鈹鍼", reading: "ひしん", length: "4寸・幅2分半", shape: "先が剣のような刃",
    history: "古典では、たまった膿を取り除くための道具として記されています。",
    outline: "M24 36H96L108 31H154L185 43L154 55H108L96 50H24Z",
    detail: "M31 43H185M110 32L123 43L110 54",
  },
  {
    id: "enrishin", name: "員利鍼", reading: "えんりしん", length: "1寸6分", shape: "中央がやや太く先が鋭い",
    history: "急に現れる「気」の変化を扱う道具として記されています。",
    outline: "M38 38H88Q111 31 128 34Q146 36 164 43Q146 50 128 52Q111 55 88 48H38Z",
    detail: "M43 43H159M92 37Q112 39 126 38",
  },
  {
    id: "goshin", name: "毫鍼", reading: "ごうしん", length: "3寸6分", shape: "蚊やアブの口にたとえる細い先",
    history: "痛みを伴う「痺（ひ）」に関する記述に登場します。現代の細い鍼にも使われる名前です。",
    outline: "M22 37Q22 35 26 35H79L89 40L182 42.5L89 46L79 51H26Q22 51 22 48Z",
    detail: "M32 36L27 49M42 36L37 49M52 36L47 49M62 36L57 49M72 36L67 49M85 43H172",
  },
  {
    id: "choshin", name: "長鍼", reading: "ちょうしん", length: "7寸", shape: "細長い身と鋭い先",
    history: "「遠痺（えんぴ）」と呼ぶ状態を扱う道具として記されています。",
    outline: "M11 37H62L76 39L194 42.5L76 47L62 49H11Z",
    detail: "M19 39V47M28 39V47M37 39V47M46 39V47M55 39V47M76 43H185",
  },
  {
    id: "daishin", name: "大鍼", reading: "だいしん", length: "4寸", shape: "棒状で先に丸みがある",
    history: "古典では関節の周りに関わる「水」を扱う道具として記されています。",
    outline: "M19 33H99L161 35Q176 36 181 43Q176 50 161 51L99 53H19Z",
    detail: "M29 43H176M99 34L103 43L99 52",
  },
] as const;

export const NINE_NEEDLES_SOURCES = {
  chapter: "https://plaza.umin.ac.jp/daikei/image/kouza/200913miyakawa.pdf#page=2",
  manuscript: "https://rmda.kulib.kyoto-u.ac.jp/item/rb00002416",
  reconstruction: "https://www.kansai.ac.jp/pdf/kuhs_kiyo_14.pdf",
} as const;

import type { ExpandedView } from "./types";

type Care = "touch" | "eyesAndFace" | "head" | "neck" | "chest" | "abdomen" | "back" | "pelvis";

interface ViewCopy {
  label: string;
  care: Care;
  symptom?: readonly [slug: string, label: string];
}

const headSymptoms = ["headache-stiff-neck", "頭痛・首肩こりの症状ガイド"] as const;
const bellySymptoms = ["stomach-fatigue", "胃腸の不調と疲れの症状ガイド"] as const;
const lowerBackSymptoms = ["lower-back-pain-sciatica", "腰痛・脚のしびれの症状ガイド"] as const;

export const viewCopy: Record<ExpandedView, ViewCopy> = {
  face: {
    label: "顔の正面",
    care: "eyesAndFace", symptom: headSymptoms,
  },
  profile: {
    label: "頭と顔の横",
    care: "eyesAndFace", symptom: headSymptoms,
  },
  scalp: {
    label: "頭の上",
    care: "head", symptom: headSymptoms,
  },
  nape: {
    label: "後頭部とうなじ",
    care: "neck", symptom: headSymptoms,
  },
  neck: {
    label: "首",
    care: "neck", symptom: headSymptoms,
  },
  neckSide: {
    label: "首の横",
    care: "neck", symptom: headSymptoms,
  },
  mouth: {
    label: "上唇の内側",
    care: "eyesAndFace",
  },
  upperArm: {
    label: "二の腕の前",
    care: "touch",
  },
  armBack: {
    label: "二の腕の後ろ",
    care: "touch",
  },
  elbowSide: {
    label: "ひじの外側",
    care: "touch",
  },
  elbowInside: {
    label: "ひじの内側と後ろの境",
    care: "touch",
  },
  forearmPalm: {
    label: "前腕の手のひら側",
    care: "touch",
  },
  forearmBack: {
    label: "前腕の手の甲側",
    care: "touch",
  },
  shoulderSide: {
    label: "肩の外側",
    care: "touch", symptom: headSymptoms,
  },
  shoulderBack: {
    label: "肩と肩甲骨の後ろ",
    care: "back", symptom: headSymptoms,
  },
  palm: {
    label: "手のひら",
    care: "touch",
  },
  handBack: {
    label: "手の甲と手首",
    care: "touch",
  },
  chest: {
    label: "胸の前",
    care: "chest",
  },
  abdomen: {
    label: "おなか",
    care: "abdomen", symptom: bellySymptoms,
  },
  flank: {
    label: "わき腹",
    care: "abdomen",
  },
  hip: {
    label: "股関節の外側",
    care: "pelvis", symptom: lowerBackSymptoms,
  },
  groin: {
    label: "脚の付け根",
    care: "pelvis",
  },
  pelvis: {
    label: "骨盤の底",
    care: "pelvis",
  },
  back: {
    label: "背中",
    care: "back",
  },
  sacrum: {
    label: "腰とお尻",
    care: "back", symptom: lowerBackSymptoms,
  },
  thighFront: {
    label: "太ももの前と内側",
    care: "touch",
  },
  thighSide: {
    label: "太ももの外側",
    care: "touch",
  },
  thighBack: {
    label: "太ももの裏",
    care: "touch", symptom: lowerBackSymptoms,
  },
};

interface CareCopy {
  steps: string;
  caution?: string;
  emergency?: string;
}

export const careCopy: Record<Care, CareCopy> = {
  touch: {
    steps: "力を抜いて、図の丸印と、近くの骨やしわの位置を見比べます。手で確かめるときは、指の腹を軽く添える程度で十分です。",
    caution: "痛みやしびれが出たら手を離します。傷、発疹、赤く腫れたところ、けがや手術の直後の部位への刺激は控えてください。強い刺激、熱い器具、はりやお灸は自宅での位置確認には使いません。",
  },
  eyesAndFace: {
    steps: "図と鏡を並べ、表面から見える目印の高さを比べて場所を確認します。指で目やそのすぐそばを押したり、耳や口の中へ道具を入れたりせず、丸印を視線でたどるところまでにします。",
    caution: "目や口・耳の周りは皮膚や粘膜が繊細です。赤みや腫れ、痛みが続くときは医療機関に相談してください。",
    emergency: "突然見え方が変わる、顔の片側が動きにくいといった症状があるときは、すぐに119番へ連絡してください。",
  },
  head: {
    steps: "鏡と図を使い、生え際・頭の中央・耳の高さを外から確かめる程度にします。髪を引っ張ってくぼみを探したり、硬い道具で頭を押さえたりする必要はありません。髪で見えにくいところは図で位置を比べます。",
    caution: "頭を打った後や頭皮に傷があるときは刺激を控えます。いつもと違う頭痛や繰り返す不調は医療機関へ相談してください。",
    emergency: "突然の激しい頭痛や急な話しにくさがあるときは、すぐに119番へ連絡してください。",
  },
  neck: {
    steps: "無理に首を反らせたり回したりせず、図で頭や肩からの距離を追います。首の前や横には気道や血管があるため、脈を探して押し込んだり、左右から挟んだりせず、見るだけにします。",
    caution: "首の痛みや違和感が続くときは、首を刺激する前に医療機関に相談してください。",
    emergency: "急な息苦しさ、ろれつが回らない、顔や手足が急に動かしにくいといった症状があるときは、すぐに119番へ連絡してください。",
  },
  chest: {
    steps: "胸のツボの位置は図で確認してください。肋骨の間に指を押し込んだり、器具を当てたりする刺激は控えてください。",
  },
  abdomen: {
    steps: "おなかの力を抜き、へそや骨の縁を図で合わせます。位置を確かめるときも、指を差し込むように押したり、痛むところを何度も確かめたりせず、図の縦横の位置を見比べます。",
    caution: "妊娠中や手術後はおなかを圧迫する刺激を控え、体調については担当の医療機関に相談してください。",
    emergency: "突然の激しい腹痛、続く激痛、吐血があるときは、すぐに119番へ連絡してください。",
  },
  back: {
    steps: "背中を無理にひねらず図で左右と高さを合わせてください。背骨や肩甲骨のふちに器具を押し当てる必要はありません。家族などに強く押してもらう方法も避け、位置の違いは図で見比べます。",
    caution: "けがの後の痛みやしびれが続く場合は医療機関に相談してください。",
    emergency: "胸や背中が突然激しく痛んだり、急に息苦しくなったりしたときは、すぐに119番へ連絡してください。",
  },
  pelvis: {
    steps: "この部位は図で前後や骨からの距離を読む用途に限ります。探すために深く押し込んだり、器具を当てたりせず、立っていて見えにくいところも無理な姿勢を取らず図で確認できます。",
    caution: "妊娠中や出産後、手術や外傷からの回復中は、刺激を行う前に担当の医療機関に相談してください。痛みや腫れ、出血など新しい症状があれば、ツボを押して様子をみず医療機関へ相談してください。",
  },
};

export const cautionSites: Readonly<Record<string, string>> = {
  st17: "この部位への指や器具による刺激は控えてください。",
  ht1: "血管が通るわきの中央です。腕を無理に上げたり指を深く当てたりせず、しわと丸印の位置関係を図で確かめます。",
  lu8: "脈が触れるところのそばなので、前腕の骨と手首のしわを図で読みます。動脈の位置を指で押して調べる必要はありません。",
  lu9: "手首の動脈が近くを通ります。手のひらを上にした図で、親指側の小さな骨としわに挟まれる位置を見ます。",
  li12: "ひじの骨のすぐそばです。関節を強く曲げ切ったり硬い道具を当てたりせず、図で骨の出っ張りから肩へ移る向きを見ます。",
  li13: "二の腕を外から見て、ひじと肩の位置を図で先に合わせます。腕の奥を指で押し込んで探す方法は控えてください。",
  si8: "ひじの内側を通る神経に近い位置です。しびれが出るかを指で試さず、尖った骨と内側の骨の間を図で確認します。",
  sp11: "太ももの内側の血管に近い位置です。脚を大きく開いたり押し込んだりせず、しわとひざを結ぶ線で高さを見ます。",
  lr10: "脚の付け根から内ももへ向かう血管の近くです。脈やくぼみを押して探さず、図で気衝から距離を比べます。",
  lr11: "脚の付け根に近い点です。内ももを押し込まず、気衝の位置と足五里の並びを図で見比べます。",
  gb21: "首から肩先を結ぶ位置を図で確認します。",
};

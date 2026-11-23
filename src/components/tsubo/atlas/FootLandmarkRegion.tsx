import { achillesSideOutline, dorsalFootLandmarks, footLandmarks, footSideOutline, medialFootLandmarks, type FootBone, type FootPoint } from "@/data/tsubo/atlas/footLandmarks";
import type { AtlasCloseUpProps } from "@/data/tsubo/atlas/types";

type Bone = { path: string; badge: [number, number]; label: string };

const { secondMetatarsalBase, intermediateCuneiformFront, fourthMetatarsal, fifthMetatarsal, fifthExtensor } = dorsalFootLandmarks;

const dorsalBones: Partial<Record<FootBone, Bone>> = {
  ray1: { path: "M120 198Q105 145 78 109 M73 94L66 69 M64 55L63 35", badge: [96, 144], label: "親指につながる骨" },
  ray2: { path: `M${secondMetatarsalBase.join(" ")}Q128 156 120 107 M120 93L120 74 M121 62L122 53 M122 41L123 22`, badge: [126, 149], label: "第2趾につながる骨" },
  ray3: { path: "M146 204Q160 151 158 110 M159 98L161 81 M163 70L164 60 M165 49L166 39", badge: [157, 158], label: "第3趾につながる骨" },
  ray4: { path: `M${fourthMetatarsal.base.join(" ")}Q${fourthMetatarsal.control.join(" ")} ${fourthMetatarsal.head.join(" ")} M187 112L192 97 M195 87L198 79 M200 69L203 62`, badge: [178, 162], label: "第4趾につながる骨" },
  ray5: { path: `M${fifthMetatarsal.base.join(" ")}Q${fifthMetatarsal.control.join(" ")} ${fifthMetatarsal.head.join(" ")} M213 135L218 126 M222 118L226 111 M231 103L234 96`, badge: [198, 179], label: "小指につながる骨" },
  malleolus: { path: "M105 219Q101 232 104 241 M158 220Q164 231 160 241", badge: [159, 238], label: "内・外くるぶし" },
  midfoot: { path: `M${intermediateCuneiformFront.join(" ")}L134 223`, badge: [143, 222], label: "中間楔状骨" },
};

function sideBones(medial: boolean): Partial<Record<FootBone, Bone>> {
  const { malleolus, navicular } = medialFootLandmarks;
  return {
    malleolus: { path: `M97 63Q98 85 ${malleolus.x} ${malleolus.y}V115`, badge: [99, medial ? 90 : 107], label: medial ? "内くるぶし" : "外くるぶし" },
    heel: { path: "M76 169Q72 183 82 191Q96 197 114 177", badge: [91, 181], label: "かかとの骨" },
    navicular: { path: `M136 142L${navicular.x} ${navicular.y}L146 151`, badge: [152, 140], label: "舟状骨" },
    cuboid: { path: "M130 146L145 151L152 148", badge: [139, 148], label: "立方骨" },
    [medial ? "ray1" : "ray5"]: {
      path: medial ? "M155 155Q195 167 240 179 M248 184L262 188 M272 190L288 193" : "M158 165Q196 171 240 181 M249 185L259 188 M267 189L273 191 M282 193L291 194",
      badge: [205, 173], label: medial ? "親指につながる骨" : "小指につながる骨",
    },
  };
}

function Skeleton({ bones, selected, labelled }: { bones: Partial<Record<FootBone, Bone>>; selected: FootPoint["bones"]; labelled?: boolean }) {
  const emphasis: readonly FootBone[] = selected;
  return (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      {Object.entries(bones).map(([key, bone]) => (
        <path key={key} d={bone.path} stroke={emphasis.includes(key as FootBone) ? "#B97049" : "#D3C4B0"} strokeWidth="7" />
      ))}
      {!labelled && selected.map((key, index) => {
        const bone = bones[key];
        if (!bone) return null;
        const [x, y] = bone.badge;
        return (
          <g key={key}>
            <circle cx={x} cy={y} r="8" fill="#9E4B20" stroke="#F9F5ED" />
            <text x={x} y={y + 3.5} fill="#FFF9F0" textAnchor="middle" fontSize="10" fontWeight="bold">{index + 1}</text>
          </g>
        );
      })}
    </g>
  );
}

export default function FootLandmarkRegion({ marker, label, labelled }: AtlasCloseUpProps) {
  if (!marker.footCode) throw new Error("A foot landmark is required");
  const code = marker.footCode;
  const point = footLandmarks[code];
  const dorsal = point.view === "dorsal";
  const medial = point.view === "medial";
  const bones = dorsal ? dorsalBones : sideBones(medial);
  const { malleolus, navicular } = medialFootLandmarks;

  return dorsal ? (
    <>
      <path d="M94 284c4-24 7-46 1-70-7-30-28-51-40-73-8-16-13-27-15-45-2-22-5-43 0-62 4-15 16-22 28-20 12 1 20 12 21 27 2 17-4 34 0 50 2 5 6 9 11 10 6-13 1-30 1-45-1-18 1-37 9-45 9-9 22-6 26 4 6 14 2 33 0 49-1 13-2 25 2 35 5-11 7-30 8-44 1-17 8-27 18-25 11 2 13 13 11 28l-7 44c9-8 13-26 16-39 5-14 15-19 23-13 8 7 4 21-1 33l-9 29c8-4 11-15 17-20 8-7 19-3 21 7 3 13-8 30-16 44-12 19-20 44-27 67-7 24-11 49-12 74Z" fill="#F4E8D8" stroke="#9B8D7D" strokeWidth="2" />
      {code === "st41" && <g fill="none" stroke="#719184" strokeWidth="2.5">
        <path d="M117 286Q117 245 121 224T104 165L63 34M140 286Q140 241 137 224L123 36" />
        <path d="M102 240H159" strokeDasharray="3 4" />
      </g>}
      <Skeleton bones={bones} selected={point.bones} labelled={labelled} />
      {code === "st42" && <path d={`M125 281Q137 243 ${marker.x} ${marker.y}T137 165`} fill="none" stroke="#B26362" strokeDasharray="2 4" strokeWidth="2.5" />}
      {code === "gb41" && <path d={`M148 267Q151 223 ${fifthExtensor.middle.join(" ")}L${fifthExtensor.tip.join(" ")}`} fill="none" stroke="#719184" strokeWidth="3" />}
      {!labelled && <g fill="#5B493B" fontSize="11">
        <path d={`M${marker.x} ${marker.y}L218 222H229`} fill="none" stroke="#7F3520" strokeWidth="1.5" />
        <text x="232" y="54">右足を甲の側から</text>
        {point.bones.map((key, index) => <text key={key} x="232" y={115 + 23 * index}>{index === 0 ? "①" : "②"} {bones[key]?.label}</text>)}
        {code === "st42" && <text x="232" y="164">点線は足の甲の動脈</text>}
        {code === "gb41" && <text x="232" y="164">緑線は小指の腱</text>}
        <text x="232" y="228" fill="#7F3520" fontWeight="bold" fontSize="13">{label}</text>
        <text x="233" y="266">足首側 ↓</text>
      </g>}
    </>
  ) : (
    <>
      <path d={footSideOutline} fill="#F4E8D8" stroke="#9B8D7D" strokeWidth="2" />
      <path d={medial
        ? "M66 186Q90 199 117 182Q135 164 141 163Q156 163 167 168Q195 179 224 186Q241 190 256 191T300 199"
        : "M66 184Q72 182 78 181Q113 186 140 180Q160 175 172 178Q196 184 224 188Q239 193 256 192Q287 198 300 199"}
        fill="none" stroke="#A69380" strokeWidth="1.7" strokeDasharray="4 4" />
      <path d={achillesSideOutline} fill="none" stroke="#719184" strokeWidth="3" />
      {code === "lr4" && <path d="M115 75Q119 108 142 139L160 158" fill="none" stroke="#719184" strokeWidth="3" />}
      {code === "gb40" && <path d="M117 77Q118 111 135 139L182 163" fill="none" stroke="#719184" strokeWidth="3" />}
      {code === "ki3" && <path d="M81 89Q79 109 81 123L110 159" fill="none" stroke="#B26362" strokeWidth="2" strokeDasharray="2 4" />}
      <Skeleton bones={bones} selected={point.bones} labelled={labelled} />
      {code === "sp5" && (
        <g fill="#755D48">
          <path d={`M${malleolus.x} ${malleolus.y}L${navicular.x} ${navicular.y}`} fill="none" stroke="#755D48" strokeWidth="1.5" strokeDasharray="3 3" />
          <circle cx={malleolus.x} cy={malleolus.y} r="2.5" />
          <circle cx={navicular.x} cy={navicular.y} r="2.5" />
        </g>
      )}
      {!labelled && <g fill="#5B493B" fontSize="12">
        <path d={`M${marker.x} ${marker.y}L${marker.x} 229l${marker.x > 174 ? -14 : 14} 10`} fill="none" stroke="#7F3520" strokeWidth="1.5" />
        <text x={marker.x > 174 ? marker.x - 17 : marker.x + 17} textAnchor={marker.x > 174 ? "end" : "start"} y="245" fill="#7F3520" fontSize="14" fontWeight="bold">{label}</text>
        <text x="16" y="32">足を{medial ? "内側" : "外側"}から見た図</text>
        {point.bones.map((key, index) => <text key={key} x="194" y={55 + 22 * index}>{index === 0 ? "①" : "②"} {bones[key]?.label}</text>)}
        <text x="17" y="276">← かかと側</text>
        <text x="250" y="276">指先側 →</text>
      </g>}
    </>
  );
}

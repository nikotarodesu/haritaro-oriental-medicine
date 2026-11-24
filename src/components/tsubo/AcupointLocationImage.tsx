import Image from "next/image";
import { Maximize2 } from "lucide-react";
import { ACUPOINT_LOCATION_IMAGES } from "@/data/tsubo/atlas/locationImages";

export default function AcupointLocationImage({ code }: { code: string }) {
  const image = ACUPOINT_LOCATION_IMAGES[code];
  if (!image) return null;

  return (
    <figure className="atlas-location-image">
      <Image src={image.src} alt={image.alt} width={image.width} height={image.height} unoptimized />
      <figcaption>
        <a href={image.src} className="atlas-source-link inline-flex items-center gap-2">
          位置図を画像で開く
          <Maximize2 size={15} aria-hidden="true" className="shrink-0" />
        </a>
      </figcaption>
    </figure>
  );
}

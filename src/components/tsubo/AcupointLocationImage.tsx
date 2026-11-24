import { Maximize2 } from "lucide-react";
import { ACUPOINT_LOCATION_IMAGES } from "@/data/tsubo/atlas/locationImages";

export default function AcupointLocationImage({ code }: { code: string }) {
  const image = ACUPOINT_LOCATION_IMAGES[code];
  if (!image) return null;

  return (
    <figure className="atlas-location-image">
      {/* eslint-disable-next-line @next/next/no-img-element -- Keep the precompressed WebP URL identical to the image sitemap across deploys. */}
      <img src={image.src} alt={image.alt} width={image.width} height={image.height} loading="lazy" decoding="async" />
      <figcaption>
        <a href={image.src} className="atlas-source-link inline-flex items-center gap-2">
          位置図を画像で開く
          <Maximize2 size={15} aria-hidden="true" className="shrink-0" />
        </a>
      </figcaption>
    </figure>
  );
}

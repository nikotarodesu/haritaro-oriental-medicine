import { ACUPOINT_LOCATION_IMAGES } from "@/data/tsubo/atlas/locationImages";

export default function AcupointLocationImage({ code }: { code: string }) {
  const image = ACUPOINT_LOCATION_IMAGES[code];
  if (!image) return null;

  return (
    // eslint-disable-next-line @next/next/no-img-element -- Keep the precompressed WebP URL identical to the image sitemap across deploys.
    <img className="atlas-location-image" src={image.src} alt={image.alt} width={image.width} height={image.height} loading="lazy" decoding="async" />
  );
}

import { getAdSensePublisherId } from "@/components/ads/config";

export const dynamic = "force-static";

export function GET() {
  const publisherId = getAdSensePublisherId();
  if (!publisherId) return new Response(null, { status: 404 });

  return new Response(
    `google.com, ${publisherId.slice(3)}, DIRECT, f08c47fec0942fa0\n`,
    { headers: { "Content-Type": "text/plain; charset=utf-8" } },
  );
}

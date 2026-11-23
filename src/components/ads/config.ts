export function getAdSensePublisherId() {
  const id = process.env.ADSENSE_PUBLISHER_ID?.trim();
  return id && /^ca-pub-\d{16}$/.test(id) ? id : undefined;
}

export function getContentAdSenseConfig() {
  if (
    process.env.ADSENSE_ENABLED !== "true" ||
    process.env.NODE_ENV !== "production" ||
    process.env.VERCEL_ENV === "preview"
  ) {
    return undefined;
  }

  const publisherId = getAdSensePublisherId();
  const slotId = process.env.ADSENSE_ARTICLE_SLOT_ID?.trim();
  return publisherId && slotId && /^\d+$/.test(slotId)
    ? { publisherId, slotId }
    : undefined;
}

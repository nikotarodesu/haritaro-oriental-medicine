import AdSenseSlot from "./AdSenseSlot";
import { getContentAdSenseConfig } from "./config";

export default function ContentEndAd() {
  const config = getContentAdSenseConfig();
  return config ? <AdSenseSlot {...config} /> : null;
}

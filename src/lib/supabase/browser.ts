export { isSupabaseConfigured } from "./config";

/** Share the existing browser singleton; load its SDK after hydration or on use. */
export async function loadBrowserClient() {
  const { createClient } = await import("./client");
  return createClient();
}

// はり太郎の東洋医学 Service Worker
const CACHE_NAME = "haritaro-cache-v2";
const OFFLINE_URLS = [
  "/",
  "/tsubo",
  "/notes",
  "/kokushi",
  "/curriculum",
  "/diagnosis",
  "/simulator",
  "/practice/haiketsu",
  "/tsubo/basics/bone-cun",
  "/llms.txt",
  "/icon.png",
  "/apple-icon.png",
  "/manifest.webmanifest",
];

// インストール時に基本アセットをプリキャッシュ
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(OFFLINE_URLS).catch((err) => {
        console.warn("PWA pre-cache warning:", err);
      });
    })
  );
  self.skipWaiting();
});

// アクティベーション時に古いキャッシュを整理
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// フェッチ制御: ネットワークファースト ➜ 失敗時にキャッシュフォールバック
self.addEventListener("fetch", (event) => {
  // GETリクエスト以外やAPI/Stripe/Supabase通信はスルー
  if (
    event.request.method !== "GET" ||
    event.request.url.includes("/api/") ||
    event.request.url.includes("supabase.co") ||
    event.request.url.includes("stripe.com")
  ) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        // 正常レスポンスならキャッシュを更新（静的アセットやページ）
        if (
          networkResponse &&
          networkResponse.status === 200 &&
          networkResponse.type === "basic"
        ) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        // オフライン時はキャッシュから返却
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          // ナビゲーションリクエスト（HTMLページ）のフォールバック
          if (event.request.mode === "navigate") {
            return caches.match("/");
          }
          return new Response("Offline", { status: 503, statusText: "Offline" });
        });
      })
  );
});

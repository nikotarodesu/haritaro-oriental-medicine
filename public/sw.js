// はり太郎 Service Worker
const CACHE_NAME = "haritaro-cache-v4-platform";
const OFFLINE_URLS = [
  "/",
  "/tsubo",
  "/symptoms",
  "/kokushi",
  "/curriculum",
  "/diagnosis",
  "/simulator",
  "/practice/haiketsu",
  "/tsubo/basics/bone-cun",
  "/llms.txt",
  "/icon.png",
  "/apple-icon.png",
  "/favicon.svg",
  "/icon-192.png",
  "/icon-512.png",
  "/apple-touch-icon.png",
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
  const url = new URL(event.request.url);
  // 検索語、旧会員導線、広告認証の結果はキャッシュしない。
  if (
    event.request.method !== "GET" ||
    url.origin !== self.location.origin ||
    /^\/(?:api|search|auth|login|account|checkout|pricing|notes|mynote)(?:\/|$)/.test(url.pathname) ||
    url.pathname === "/ads.txt"
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

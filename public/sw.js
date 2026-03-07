const CACHE_NAME = "tripbudget-v2";
const NEXT_STATIC_CACHE = "tripbudget-next-static-v2";
const STATIC_ASSETS = ["/", "/trip/new", "/api/exchange-rates"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => k !== CACHE_NAME && k !== NEXT_STATIC_CACHE)
          .map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Cache-first for Next.js static assets (JS, CSS, fonts, images)
  if (url.pathname.startsWith("/_next/static/")) {
    event.respondWith(
      caches.open(NEXT_STATIC_CACHE).then(async (cache) => {
        const cached = await cache.match(event.request);
        if (cached) return cached;
        const response = await fetch(event.request);
        cache.put(event.request, response.clone());
        return response;
      })
    );
    return;
  }

  // Cache-first for icons and manifest
  if (
    url.pathname.startsWith("/icons/") ||
    url.pathname === "/manifest.json"
  ) {
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        const cached = await cache.match(event.request);
        if (cached) return cached;
        const response = await fetch(event.request);
        cache.put(event.request, response.clone());
        return response;
      })
    );
    return;
  }

  // Cache-first for exchange rates with offline fallback
  if (url.pathname === "/api/exchange-rates") {
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        const cached = await cache.match(event.request);
        if (cached) return cached;
        try {
          const response = await fetch(event.request);
          cache.put(event.request, response.clone());
          return response;
        } catch {
          return new Response(
            JSON.stringify({ rates: { USD: 1 }, source: "sw-fallback" }),
            { headers: { "Content-Type": "application/json" } }
          );
        }
      })
    );
    return;
  }

  // Network-first for navigation, fallback to cached home page
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(() =>
        caches.match(event.request).then((cached) => cached ?? caches.match("/"))
      )
    );
  }
});

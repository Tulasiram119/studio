const CACHE_NAME = "nextweb-pwa-cache-v1";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Service Worker: Caching pre-defined assets");
      return cache.addAll([]);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  // Network-first for API requests
  if (event.request.url.includes("/api/")) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
          return response;
        })
        .catch(() => {
          return caches.match(event.request);
        })
    );
    return;
  }

  // Cache-first for all other requests
  event.respondWith(
    caches.match(event.request).then((response) => {
      return (
        response ||
        fetch(event.request).then((fetchResponse) => {
          const responseToCache = fetchResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache?.put(event.request, responseToCache);
          });
          return fetchResponse;
        })
      );
    })
  );
});

self.addEventListener("sync", (event) => {
  if (event.tag === "background-sync-example") {
    event.waitUntil(doSomeSync());
  }
});

function doSomeSync() {
  console.log("Background sync started");
  return fetch("/api/posts")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Background sync successful, data:", data);
      self.registration.showNotification("Content updated", {
        body: "New content is available!",
        icon: "https://placehold.co/192x192.png",
      });
    })
    .catch((err) => {
      console.error("Background sync failed:", err);
    });
}

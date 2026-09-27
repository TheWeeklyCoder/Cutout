/* Offline cache for the Cutout app shell.
   Everything the tool does (background removal, painting, compression) already
   runs entirely inside the page with no server calls, so once these few files
   are cached the app works completely offline — cache-first, so it also loads
   instantly even on a flaky connection. */
var CACHE = 'cutout-v2';
var ASSETS = ['./', './index.html', './manifest.webmanifest', './logo.png', './logo-192.png', './logo-512.png'];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE)
      .then(function(c) { return c.addAll(ASSETS); })
      .catch(function() {})
  );
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(keys.filter(function(k) { return k !== CACHE; }).map(function(k) { return caches.delete(k); }));
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  if (e.request.method !== 'GET') return;
  var url = new URL(e.request.url);
  if (url.origin !== self.location.origin) return; // never intercept cross-origin requests

  e.respondWith(
    caches.match(e.request).then(function(cached) {
      if (cached) {
        // Cache-first: serve instantly, then quietly refresh the cache in the background.
        fetch(e.request).then(function(res) {
          if (res && res.ok) caches.open(CACHE).then(function(c) { c.put(e.request, res); });
        }).catch(function() {});
        return cached;
      }
      return fetch(e.request).then(function(res) {
        if (res && res.ok) {
          var copy = res.clone();
          caches.open(CACHE).then(function(c) { c.put(e.request, copy); });
        }
        return res;
      }).catch(function() {
        return caches.match('./index.html');
      });
    })
  );
});

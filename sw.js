// FESS Jobs Service Worker v1.0
const CACHE_NAME = 'fess-jobs-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/login.html',
  '/chat.html',
  '/manifest.json',
  '/icon-192.svg',
  '/icon-512.svg',
  'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.js',
  'https://fonts.googleapis.com/css2?family=Bitter:wght@700;800;900&family=Barlow:wght@400;500;600;700&display=swap'
];

// Install: cache static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(STATIC_ASSETS.filter(url => !url.startsWith('http')));
    }).then(() => self.skipWaiting())
  );
});

// Activate: clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Fetch: network first, cache fallback
self.addEventListener('fetch', event => {
  // Skip non-GET and Supabase API calls
  if (event.request.method !== 'GET') return;
  if (event.request.url.includes('supabase.co')) return;

  event.respondWith(
    fetch(event.request)
      .then(response => {
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});

// Push notifications
self.addEventListener('push', event => {
  const data = event.data?.json() || {};
  event.waitUntil(
    self.registration.showNotification(data.title || 'FESS Jobs', {
      body: data.body || 'Neue Nachricht von FESS',
      icon: '/icon-192.svg',
      badge: '/icon-192.svg',
      data: data.url || '/',
      vibrate: [200, 100, 200],
      actions: [
        { action: 'open', title: 'Öffnen' },
        { action: 'close', title: 'Schließen' }
      ]
    })
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  if (event.action !== 'close') {
    event.waitUntil(clients.openWindow(event.notification.data || '/'));
  }
});

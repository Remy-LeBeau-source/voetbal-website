// Service worker: de app opent snel en werkt ook zonder internet.
// Verhoog VERSIE bij elke nieuwe uitgave, dan haalt de app de nieuwe bestanden op.
const VERSIE = 'sn-voetbal-v1';
const BESTANDEN = [
  './',
  './index.html',
  './manifest.webmanifest',
  './img/sill-vyan-en-naoufal.jpg',
  './icons/icoon-192.png',
  './icons/icoon-512.png',
  './icons/apple-touch-icon.png',
  './icons/favicon-32.png',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSIE).then(c => c.addAll(BESTANDEN)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(namen => Promise.all(namen.filter(n => n !== VERSIE).map(n => caches.delete(n))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const { request } = e;
  if (request.method !== 'GET') return;

  // De pagina zelf: eerst internet (altijd de nieuwste versie), anders de bewaarde versie
  if (request.mode === 'navigate') {
    e.respondWith(
      fetch(request)
        .then(antwoord => { const kopie = antwoord.clone(); caches.open(VERSIE).then(c => c.put('./index.html', kopie)); return antwoord; })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  // Al het andere (foto, iconen, lettertypes): meteen uit de cache, en op de achtergrond bijwerken
  e.respondWith(
    caches.match(request).then(bewaard => {
      const vers = fetch(request)
        .then(antwoord => {
          if (antwoord.ok || antwoord.type === 'opaque') { const kopie = antwoord.clone(); caches.open(VERSIE).then(c => c.put(request, kopie)); }
          return antwoord;
        })
        .catch(() => bewaard);
      return bewaard || vers;
    })
  );
});

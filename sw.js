const CACHE = "treino-natural-v12";
const CORE = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png", "./apple-touch-icon.png",
  "./img/abd-decl-0.jpg",
  "./img/abd-decl-1.jpg",
  "./img/abd-pernas-0.jpg",
  "./img/abd-pernas-1.jpg",
  "./img/agach-sumo-0.jpg",
  "./img/agach-sumo-1.jpg",
  "./img/cruc-inv-0.jpg",
  "./img/cruc-inv-1.jpg",
  "./img/cruc-polia-0.jpg",
  "./img/cruc-polia-1.jpg",
  "./img/desenv-0.jpg",
  "./img/desenv-1.jpg",
  "./img/elev-lat-0.jpg",
  "./img/elev-lat-1.jpg",
  "./img/flexao-0.jpg",
  "./img/flexao-1.jpg",
  "./img/elev-lat-polia-0.jpg",
  "./img/elev-lat-polia-1.jpg",
  "./img/elev-lat-front-0.jpg",
  "./img/elev-lat-front-1.jpg",
  "./img/extensora-0.jpg",
  "./img/extensora-1.jpg",
  "./img/face-pull-0.jpg",
  "./img/face-pull-1.jpg",
  "./img/flexora-0.jpg",
  "./img/flexora-1.jpg",
  "./img/flexora-sent-0.jpg",
  "./img/flexora-sent-1.jpg",
  "./img/leg-press-0.jpg",
  "./img/leg-press-1.jpg",
  "./img/pant-sent-0.jpg",
  "./img/pant-sent-1.jpg",
  "./img/pant-uni-0.jpg",
  "./img/pant-uni-1.jpg",
  "./img/prancha-0.jpg",
  "./img/puxada-aberta-0.jpg",
  "./img/puxada-aberta-1.jpg",
  "./img/remada-baixa-0.jpg",
  "./img/remada-baixa-1.jpg",
  "./img/remada-t-0.jpg",
  "./img/remada-t-1.jpg",
  "./img/rosca-alt-0.jpg",
  "./img/rosca-alt-1.jpg",
  "./img/rosca-martelo-0.jpg",
  "./img/rosca-martelo-1.jpg",
  "./img/rot-ext-0.jpg",
  "./img/rot-ext-1.jpg",
  "./img/scott-0.jpg",
  "./img/scott-1.jpg",
  "./img/stiff-0.jpg",
  "./img/stiff-1.jpg",
  "./img/supino-decl-0.jpg",
  "./img/supino-decl-1.jpg",
  "./img/supino-reto-0.jpg",
  "./img/supino-reto-1.jpg",
  "./img/tri-corda-0.jpg",
  "./img/tri-corda-1.jpg",
  "./img/tri-tras-0.jpg",
  "./img/tri-tras-1.jpg"];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  // página: rede primeiro (pega atualizações), cache se estiver offline
  if (req.mode === "navigate") {
    e.respondWith(fetch(req).then(r => { const cp = r.clone(); caches.open(CACHE).then(c => c.put("./index.html", cp)); return r; })
      .catch(() => caches.match("./index.html")));
    return;
  }
  // demais arquivos e fontes: cache primeiro
  e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(r => {
    if (r && (r.ok || r.type === "opaque")) { const cp = r.clone(); caches.open(CACHE).then(c => c.put(req, cp)); }
    return r;
  }).catch(() => hit)));
});

// ===== Service Worker (PWA) =====

// 1. Versión del caché
const CACHE = 'grimcliff-v9';

// 2. Archivos locales que se guardan para usar sin internet (si falta alguno, el service worker no se instala)
const ARCHIVOS = [
    './',
    './index.html',
    './offline.html',
    './css/tema.css',
    './js/traduccion.js?v=4',   
    './img/baner_pro_1.png',
    './img/Logo_2.png',
    './img/icon-192.png',
    './img/icon-512.png',
    './img/Hitos_logros.png',
    './img/Desafios_especiales.png',
    './img/Recompensas.png',
    './manifest.webmanifest'
];

// 3. Externos (CDN y fuentes): se intentan guardar, pero si fallan no rompen la instalación
const EXTERNOS = [
    'https://cdn.jsdelivr.net/npm/daisyui@5',
    'https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4',
    'https://fonts.googleapis.com/css2?family=UnifrakturCook:wght@700&family=MedievalSharp&family=Cormorant:wght@400;500;600;700&display=swap'
];

// 4. Instalación: guarda los archivos en el caché
self.addEventListener('install', (e) => {
    self.skipWaiting();
    e.waitUntil(
        caches.open(CACHE).then(async (c) => {
            await c.addAll(ARCHIVOS);
            await Promise.allSettled(EXTERNOS.map((u) => c.add(u)));
        })
    );
});

// 5. Activación: borra los cachés de versiones anteriores
self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys()
            .then((claves) => Promise.all(claves.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
            .then(() => self.clients.claim())
    );
});

// 6. Peticiones: primero la red; si no hay internet, caché; si tampoco, página offline
self.addEventListener('fetch', (e) => {
    const req = e.request;
    if (req.method !== 'GET') return;

    // APK, videos y peticiones Range
    const ruta = new URL(req.url).pathname;
    if (/\.(apk|mp4|webm)$/i.test(ruta) || req.headers.has('range')) return;

    e.respondWith(
        fetch(req)
            .then((resp) => {
                // 200 normal, o "opaque" (CDN / fuentes de otro dominio)
                if (resp && (resp.status === 200 || resp.type === 'opaque')) {
                    const copia = resp.clone();
                    e.waitUntil(caches.open(CACHE).then((c) => c.put(req, copia)));
                }
                return resp;
            })
            .catch(() =>
                caches.match(req).then((r) =>
                    r || (req.mode === 'navigate' ? caches.match('./offline.html') : Response.error())
                )
            )
    );
});
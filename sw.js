// ===== Service Worker (PWA) =====

// 1. Versión del caché (súbela cada vez que cambie ARCHIVOS o algún archivo local)
const CACHE = 'grimcliff-v16';

// Segundos que se espera a la red antes de usar lo guardado (si ya existe en caché)
const TIEMPO_RED = 4000;

// 2. Archivos locales obligatorios (si falta alguno, el service worker no se instala)
const ARCHIVOS = [
    './',
    './index.html',
    './offline.html',
    './css/tema.css',
    './js/traduccion.js?v=6',   // debe coincidir con el <script> de index.html
    './img/baner_pro_1.webp',
    './img/Logo_2.webp',
    './img/icon-192.png',
    './img/icon-512.png',
    './img/Hitos_logros.webp',
    './img/Desafios_especiales.webp',
    './img/Recompensas.webp',
    './manifest.webmanifest'
];

// 3. Locales opcionales (imágenes de niveles, vestuarios, sprites y app): si alguno falta, no rompe la instalación
const OPCIONALES = [
    './img/icon-512-maskable.png',
    './img/app_inicio.webp',
    './img/app_puntaje.webp',
    './img/app_ranking.webp',
    './img/app_personajes.webp',
    './img/elara_sanadora.webp',
    './img/kaelen_armadura.webp',
    './img/kaelen_ataque.webp',
    './img/kaelen_golpear.webp',
    './img/kaelen_movimiento.webp',
    './img/kaelen_muerte.webp',
    './img/kaelen_potenciado.webp',
    './img/kaelen_salto.webp',
    './img/kaelen_viajero.webp',
    './img/kogan_armero.webp',
    './img/malakor_alado.webp',
    './img/malakor_derrota.webp',
    './img/malakor_garras.webp',
    './img/malakor_mandoble.webp',
    './img/malakor_ondas.webp',
    './img/malakor_real.webp',
    './img/nivel1.webp',
    './img/nivel2.webp',
    './img/nivel3.webp',
    './img/thorne_armadura.webp',
    './img/zephyrus_tunica.webp'
];

// 4. Externos (CDN y fuentes). Se piden con CORS para obtener respuestas normales (no "opaque").
//    Las etiquetas <link>/<script> de index.html deben llevar crossorigin="anonymous".
const EXTERNOS = [
    'https://cdn.jsdelivr.net/npm/daisyui@5',
    'https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4',
    'https://fonts.googleapis.com/css2?family=UnifrakturCook:wght@700&family=MedievalSharp&family=Cormorant:wght@400;500;600;700&display=swap'
];

// 5. Instalación: guarda los archivos en el caché
self.addEventListener('install', (e) => {
    self.skipWaiting();
    e.waitUntil(
        caches.open(CACHE).then(async (c) => {
            await c.addAll(ARCHIVOS);
            await Promise.allSettled(OPCIONALES.map((u) => c.add(u)));
            await Promise.allSettled(EXTERNOS.map((u) => c.add(new Request(u, { mode: 'cors' }))));
        })
    );
});

// 6. Activación: borra los cachés de versiones anteriores
self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys()
            .then((claves) => Promise.all(claves.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
            .then(() => self.clients.claim())
    );
});

// 7. Peticiones: red primero (con tiempo límite); si falla o tarda, caché; si no hay, página offline
self.addEventListener('fetch', (e) => {
    const req = e.request;
    if (req.method !== 'GET') return;

    const url = new URL(req.url);
    if (!url.protocol.startsWith('http')) return;                         // ignora chrome-extension:// etc.
    if (/\.(apk|mp4|webm)$/i.test(url.pathname) || req.headers.has('range')) return;   // APK, videos y Range

    e.respondWith((async () => {
        const cache = await caches.open(CACHE);
        const guardado = () => cache.match(req, { ignoreSearch: req.mode === 'navigate' });

        // El guardado en caché va DENTRO de la promesa de red
        const red = fetch(req).then(async (resp) => {
            if (resp && (resp.status === 200 || resp.type === 'opaque')) {
                await cache.put(req, resp.clone());
            }
            return resp;
        });
        // waitUntil se llama de forma síncrona (antes de responder): mantiene vivo el SW
        // hasta que termine el guardado, incluso si ya se respondió con el caché.
        e.waitUntil(red.catch(() => {}));

        const lenta = new Promise((res) => setTimeout(() => res(null), TIEMPO_RED));

        try {
            const resp = await Promise.race([red, lenta]);
            if (resp) return resp;                    // la red respondió a tiempo
            return (await guardado()) || await red;   // red lenta: usa el caché; si no hay, sigue esperando la red
        } catch (err) {
            const copia = await guardado();
            if (copia) return copia;
            if (req.mode === 'navigate') return (await cache.match('./offline.html')) || Response.error();
            return Response.error();
        }
    })());
});
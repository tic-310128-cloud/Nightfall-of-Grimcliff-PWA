// ===== Service Worker (PWA) =====

// 1. Versión del caché 
const CACHE = 'grimcliff-v22';

// Segundos que se espera a la red antes de usar lo guardado (si ya existe en caché)
const TIEMPO_RED = 4000;

// 2. Obligatorios: si falta alguno, el service worker no se instala
const ARCHIVOS = [
    './',
    './index.html',
    './offline.html',
    './css/tema.css',
    './js/traduccion.js?v=8',   
    './img/baner_pro_1.webp',
    './img/Logo_2.webp',
    './img/icon-192.png',
    './img/icon-512.png',
    './img/Hitos_logros.webp',
    './img/Desafios_especiales.webp',
    './img/Recompensas.webp',
    './manifest.webmanifest'
];

// 3. Opcionales: si falta alguno, no pasa nada
const OPCIONALES = [
    './img/icon-512-maskable.png',
    './img/app_inicio.webp',
    './img/app_puntaje.webp',
    './img/app_ranking.webp',
    './img/app_personajes.webp',
    './img/kaelen_viajero_reposo.webp',
    './img/kaelen_viajero_carrera.webp',
    './img/kaelen_viajero_salto.webp',
    './img/kaelen_viajero_caida.webp',
    './img/kaelen_heroe_guardia.webp',
    './img/kaelen_heroe_carrera.webp',
    './img/kaelen_heroe_esquiva.webp',
    './img/kaelen_heroe_golpe.webp',
    './img/malakor_rey_guardia.webp',
    './img/malakor_rey_avance.webp',
    './img/malakor_rey_espadazo.webp',
    './img/malakor_rey_corte.webp',
    './img/malakor_alado_aleteo.webp',
    './img/malakor_alado_alas.webp',
    './img/malakor_alado_zarpazo.webp',
    './img/malakor_alado_picado.webp',
    './img/elara_sanadora.webp',
    './img/kaelen_armadura.webp',
    './img/kaelen_viajero.webp',
    './img/kogan_armero.webp',
    './img/malakor_alado.webp',
    './img/malakor_real.webp',
    './img/nivel1.webp',
    './img/nivel2.webp',
    './img/nivel3.webp',
    './img/thorne_armadura.webp',
    './img/zephyrus_tunica.webp'
];

// 4. Externos (CDN y fuentes), pedidos con CORS
const EXTERNOS = [
    'https://cdn.jsdelivr.net/npm/daisyui@5',
    'https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4',
    'https://fonts.googleapis.com/css2?family=UnifrakturCook:wght@700&family=MedievalSharp&family=Cormorant:wght@400;500;600;700&display=swap'
];

// Únicos dominios externos que se guardan en caché
const HOSTS_PERMITIDOS = ['cdn.jsdelivr.net', 'fonts.googleapis.com', 'fonts.gstatic.com'];

// "reload" evita guardar versiones viejas del caché del navegador
const pedir = (u, extra = {}) => new Request(u, { cache: 'reload', ...extra });

// 5. Instalación: guarda los archivos
self.addEventListener('install', (e) => {
    self.skipWaiting();
    e.waitUntil(
        caches.open(CACHE).then(async (c) => {
            await c.addAll(ARCHIVOS.map((u) => pedir(u)));
            await Promise.allSettled(OPCIONALES.map((u) => c.add(pedir(u))));
            await Promise.allSettled(EXTERNOS.map((u) => c.add(pedir(u, { mode: 'cors' }))));
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

// 7. Peticiones: red primero; si falla o tarda, caché; si no hay, offline.html
self.addEventListener('fetch', (e) => {
    const req = e.request;
    if (req.method !== 'GET') return;

    const url = new URL(req.url);
    if (!url.protocol.startsWith('http')) return;                         
    if (/\.(apk|mp4|webm)$/i.test(url.pathname) || req.headers.has('range')) return;   // APK, videos y Range
    // Solo se gestiona el mismo origen y los CDN conocidos; lo demás pasa directo a la red
    if (url.origin !== self.location.origin && !HOSTS_PERMITIDOS.includes(url.hostname)) return;

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
        // Mantiene vivo el SW hasta terminar de guardar
        e.waitUntil(red.catch(() => {}));

        const lenta = new Promise((res) => setTimeout(() => res(null), TIEMPO_RED));

        try {
            const resp = await Promise.race([red, lenta]);
            if (resp) return resp;                    // la red respondió a tiempo
            return (await guardado()) || await red;   // red lenta: caché, o esperar a la red
        } catch (err) {
            const copia = await guardado();
            if (copia) return copia;
            if (req.mode === 'navigate') return (await cache.match('./offline.html')) || Response.error();
            return Response.error();
        }
    })());
});
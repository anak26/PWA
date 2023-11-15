const CACHE_NAME = 'v1_cache_pwa'

//Agregar los archivos y carpetas
var urlIsToCache = [
    './',
    'main.js',
    'sw.js',
    'manifest.json',
    'index.html',
    'img/carousel-1.jpg',
    'img/carousel-1-16.jpg',
    'img/carousel-1-32.jpg',
    'img/carousel-1-64.jpg',
    'img/carousel-1-96.jpg',
    'img/carousel-1-128.jpg',
    'img/carousel-1-192.jpg',
    'img/carousel-1-256.jpg',
    'img/carousel-1-384.jpg',
    'img/carousel-1-512.jpg',
    'img/carousel-1-1024.jpg',
    'img/carousel-2.jpg',
    'img/carousel-2-16.jpg',
    'img/carousel-2-32.jpg',
    'img/carousel-2-64.jpg',
    'img/carousel-2-96.jpg',
    'img/carousel-2-128.jpg',
    'img/carousel-2-192.jpg',
    'img/carousel-2-256.jpg',
    'img/carousel-2-384.jpg',
    'img/carousel-2-512.jpg',
    'img/carousel-2-1024.jpg',
    'img/cucurucho-de-helado.png',
    'img/cucurucho-de-helado16.png',
    'img/cucurucho-de-helado32.png',
    'img/cucurucho-de-helado64.png',
    'img/cucurucho-de-helado96.png',
    'img/cucurucho-de-helado128.png',
    'img/cucurucho-de-helado192.png',
    'img/cucurucho-de-helado256.png',
    'img/cucurucho-de-helado384.png',
    'img/cucurucho-de-helado512.png',
    'img/cucurucho-de-helado1024.png' 
]

//Instala el service worker 
self.addEventListener('install', e=> {
    e.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            return cache.addAll(urlIsToCache)
            .then(() => {
                self.skipWaiting()
            })

            .catch(err => {
                console.log('No se registro el cache', err);
            })
        })
    )
})

self.addEventListener('activate', e=>{
    const cacheWhiteList = [CACHE_NAME]
    e.waitUntil(
        caches.keys()
        .then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName =>{
                    if(cacheWhiteList.indexOf(cacheName) === -1){
                        return caches.delete(cacheName);
                    }
                })
            );
        })
        .then(() => {self.clients.claim();})
    );
})

self.addEventListener
('fetch', e =>{
    e.respondWith(
        caches.match(e.request)
        .then(res=>{
            if(res){
                return res;
            }
            return fetch(e.request);
        })
    );
});




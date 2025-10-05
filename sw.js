// Service Worker for Northwest Bus Website
// Version: 1.0.0
// Cache Name
const CACHE_NAME = 'northwest-bus-v1.0.0';

// Files to cache
const urlsToCache = [
    '/',
    '/index.html',
    '/style.css',
    '/script.js',
    '/images/colored-logo-arabic-1.svg',
    '/images/1980x1090-en-1 (1).webp',
    '/images/225A9478 (1).jpg',
    '/images/225A9481-1 (1).webp',
    '/images/yellowvipbus (1).webp',
    '/images/location-icon-1 (1).svg',
    '/images/arrows (1).svg',
    '/images/g148 (1).svg',
    '/images/Website_2M_AR_740x1920px (1).png',
    '/images/Summer-Sale_AR_Popup_450x650 (1).png',
    '/images/image-1 (1).png',
    '/images/Map (1).png',
    '/images/Occupied-Theatre-Seat (1).png',
    '/images/WhatsApp-Image-2025-06-30-at-12.55.34-PM-1 (1).jpeg',
    '/images/Screenshot-2025-07-30-130400 (1).png',
    'https://fonts.googleapis.com/css2?family=Cairo:wght@200;300;400;600;700;900&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// Install event
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch event
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Return cached version or fetch from network
                return response || fetch(event.request);
            })
    );
});

// Activate event
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Message event for update handling
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

// Service Worker for SPEAR LMS
// Provides offline functionality and caching capabilities

const CACHE_NAME = 'spear-lms-v1';
const STATIC_CACHE = 'spear-static-v1';
const DYNAMIC_CACHE = 'spear-dynamic-v1';

// Assets to cache immediately
const STATIC_ASSETS = [
    '/',
    '/dashboard',
    '/build/assets/app.css',
    '/build/assets/app.js',
    'https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// API endpoints to cache
const API_ENDPOINTS = [
    '/api/dashboard',
    '/api/courses',
    '/api/dashboard/deadlines',
    '/api/dashboard/resources',
    '/api/user/notifications'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
    console.log('[SW] Installing service worker...');
    
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then((cache) => {
                console.log('[SW] Caching static assets');
                return cache.addAll(STATIC_ASSETS);
            })
            .catch((error) => {
                console.error('[SW] Failed to cache static assets:', error);
            })
    );
    
    // Force activation of new service worker
    self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('[SW] Activating service worker...');
    
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
                            console.log('[SW] Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
    );
    
    // Take control of all clients
    self.clients.claim();
});

// Fetch event - handle requests with cache-first strategy
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }
    
    // Handle API requests
    if (url.pathname.startsWith('/api/')) {
        event.respondWith(handleApiRequest(request));
        return;
    }
    
    // Handle static assets and pages
    event.respondWith(handleStaticRequest(request));
});

// Handle API requests with network-first strategy
async function handleApiRequest(request) {
    const url = new URL(request.url);
    
    try {
        // Try network first
        const networkResponse = await fetch(request);
        
        if (networkResponse.ok) {
            // Cache successful API responses
            const cache = await caches.open(DYNAMIC_CACHE);
            cache.put(request, networkResponse.clone());
            
            // Store timestamp for cache invalidation
            const timestamp = Date.now();
            localStorage.setItem(`cache_timestamp_${url.pathname}`, timestamp.toString());
            
            return networkResponse;
        }
        
        throw new Error('Network response not ok');
        
    } catch (error) {
        console.log('[SW] Network failed, trying cache for:', url.pathname);
        
        // Try cache as fallback
        const cachedResponse = await caches.match(request);
        
        if (cachedResponse) {
            // Check if cached data is stale (older than 5 minutes)
            const cacheTimestamp = localStorage.getItem(`cache_timestamp_${url.pathname}`);
            const isStale = !cacheTimestamp || (Date.now() - parseInt(cacheTimestamp)) > 300000;
            
            if (isStale) {
                console.log('[SW] Serving stale cached data for:', url.pathname);
                // Notify the app that data might be stale
                notifyClientsOfStaleData(url.pathname);
            }
            
            return cachedResponse;
        }
        
        // Return offline fallback for dashboard data
        if (url.pathname === '/api/dashboard') {
            return new Response(JSON.stringify({
                message: 'Offline mode - limited functionality available',
                offline: true,
                user: { name: 'Student' },
                stats: { total_courses: 0, completed_courses: 0, hours_studied: 0 },
                current_course: null,
                application_status: { status: 'unknown', message: 'Unable to check status offline' }
            }), {
                headers: { 'Content-Type': 'application/json' }
            });
        }
        
        // Return empty arrays for other endpoints
        return new Response(JSON.stringify([]), {
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

// Handle static requests with cache-first strategy
async function handleStaticRequest(request) {
    try {
        // Try cache first
        const cachedResponse = await caches.match(request);
        
        if (cachedResponse) {
            return cachedResponse;
        }
        
        // Try network
        const networkResponse = await fetch(request);
        
        if (networkResponse.ok) {
            // Cache the response
            const cache = await caches.open(DYNAMIC_CACHE);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
        
    } catch (error) {
        console.log('[SW] Failed to fetch:', request.url);
        
        // Return offline page for navigation requests
        if (request.mode === 'navigate') {
            const cachedPage = await caches.match('/dashboard');
            if (cachedPage) {
                return cachedPage;
            }
        }
        
        throw error;
    }
}

// Notify clients about stale data
function notifyClientsOfStaleData(endpoint) {
    self.clients.matchAll().then((clients) => {
        clients.forEach((client) => {
            client.postMessage({
                type: 'STALE_DATA',
                endpoint: endpoint,
                timestamp: Date.now()
            });
        });
    });
}

// Handle background sync for offline actions
self.addEventListener('sync', (event) => {
    console.log('[SW] Background sync triggered:', event.tag);
    
    if (event.tag === 'course-progress-sync') {
        event.waitUntil(syncCourseProgress());
    }
});

// Sync course progress when back online
async function syncCourseProgress() {
    try {
        const pendingUpdates = JSON.parse(localStorage.getItem('pending_course_updates') || '[]');
        
        for (const update of pendingUpdates) {
            try {
                await fetch(`/api/courses/${update.courseId}/progress`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': update.csrfToken
                    },
                    body: JSON.stringify({ progress: update.progress })
                });
                
                console.log('[SW] Synced course progress:', update.courseId);
            } catch (error) {
                console.error('[SW] Failed to sync course progress:', error);
            }
        }
        
        // Clear pending updates
        localStorage.removeItem('pending_course_updates');
        
    } catch (error) {
        console.error('[SW] Background sync failed:', error);
    }
}

// Handle push notifications (future enhancement)
self.addEventListener('push', (event) => {
    if (!event.data) return;
    
    const data = event.data.json();
    
    const options = {
        body: data.body,
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        tag: data.tag || 'spear-notification',
        requireInteraction: data.requireInteraction || false,
        actions: data.actions || []
    };
    
    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    
    event.waitUntil(
        self.clients.matchAll({ type: 'window' })
            .then((clients) => {
                // Focus existing window if available
                for (const client of clients) {
                    if (client.url.includes('/dashboard') && 'focus' in client) {
                        return client.focus();
                    }
                }
                
                // Open new window
                if (self.clients.openWindow) {
                    return self.clients.openWindow('/dashboard');
                }
            })
    );
});

console.log('[SW] Service worker loaded successfully');
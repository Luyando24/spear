// Service Worker Registration and Management
// Handles offline functionality and background sync

// Check if service workers are supported
const isSupported = 'serviceWorker' in navigator;

// Service worker registration
export const registerServiceWorker = async () => {
    if (!isSupported) {
        console.warn('Service workers are not supported in this browser');
        return null;
    }

    try {
        const registration = await navigator.serviceWorker.register('/sw.js', {
            scope: '/'
        });

        console.log('Service worker registered successfully:', registration.scope);

        // Handle updates
        registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            
            if (newWorker) {
                newWorker.addEventListener('statechange', () => {
                    if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                        // New service worker is available
                        notifyUserOfUpdate();
                    }
                });
            }
        });

        return registration;
    } catch (error) {
        console.error('Service worker registration failed:', error);
        return null;
    }
};

// Unregister service worker
export const unregisterServiceWorker = async () => {
    if (!isSupported) return false;

    try {
        const registration = await navigator.serviceWorker.getRegistration();
        if (registration) {
            const unregistered = await registration.unregister();
            console.log('Service worker unregistered:', unregistered);
            return unregistered;
        }
        return false;
    } catch (error) {
        console.error('Service worker unregistration failed:', error);
        return false;
    }
};

// Check if app is running offline
export const isOffline = () => {
    return !navigator.onLine;
};

// Listen for online/offline events
export const setupNetworkListeners = (onOnline, onOffline) => {
    if (!isSupported) return;

    window.addEventListener('online', () => {
        console.log('App is back online');
        if (onOnline) onOnline();
        
        // Trigger background sync when back online
        triggerBackgroundSync('course-progress-sync');
    });

    window.addEventListener('offline', () => {
        console.log('App is offline');
        if (onOffline) onOffline();
    });
};

// Listen for service worker messages
export const setupServiceWorkerListeners = (onStaleData) => {
    if (!isSupported) return;

    navigator.serviceWorker.addEventListener('message', (event) => {
        const { type, endpoint, timestamp } = event.data;
        
        if (type === 'STALE_DATA' && onStaleData) {
            onStaleData(endpoint, timestamp);
        }
    });
};

// Trigger background sync
export const triggerBackgroundSync = async (tag) => {
    if (!isSupported || !('sync' in window.ServiceWorkerRegistration.prototype)) {
        console.warn('Background sync is not supported');
        return false;
    }

    try {
        const registration = await navigator.serviceWorker.ready;
        await registration.sync.register(tag);
        console.log('Background sync registered:', tag);
        return true;
    } catch (error) {
        console.error('Background sync registration failed:', error);
        return false;
    }
};

// Store data for offline sync
export const storeForOfflineSync = (key, data) => {
    try {
        const existingData = JSON.parse(localStorage.getItem(key) || '[]');
        existingData.push({
            ...data,
            timestamp: Date.now(),
            csrfToken: window.Laravel?.csrfToken
        });
        localStorage.setItem(key, JSON.stringify(existingData));
        
        // Try to sync immediately if online
        if (navigator.onLine) {
            triggerBackgroundSync('course-progress-sync');
        }
        
        return true;
    } catch (error) {
        console.error('Failed to store data for offline sync:', error);
        return false;
    }
};

// Get cached data
export const getCachedData = (endpoint) => {
    const timestamp = localStorage.getItem(`cache_timestamp_${endpoint}`);
    if (!timestamp) return null;
    
    const age = Date.now() - parseInt(timestamp);
    const maxAge = 300000; // 5 minutes
    
    return {
        timestamp: parseInt(timestamp),
        age,
        isStale: age > maxAge
    };
};

// Clear all caches
export const clearAllCaches = async () => {
    if (!isSupported) return false;

    try {
        const cacheNames = await caches.keys();
        await Promise.all(
            cacheNames.map(cacheName => caches.delete(cacheName))
        );
        
        // Clear localStorage cache timestamps
        Object.keys(localStorage).forEach(key => {
            if (key.startsWith('cache_timestamp_')) {
                localStorage.removeItem(key);
            }
        });
        
        console.log('All caches cleared');
        return true;
    } catch (error) {
        console.error('Failed to clear caches:', error);
        return false;
    }
};

// Notify user of app update
const notifyUserOfUpdate = () => {
    // Create a simple notification
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg z-50';
    notification.innerHTML = `
        <div class="flex items-center space-x-3">
            <i class="fas fa-download"></i>
            <span>App update available</span>
            <button onclick="window.location.reload()" class="ml-2 bg-white text-blue-600 px-3 py-1 rounded text-sm font-medium">
                Refresh
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 10 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 10000);
};

// Request notification permission
export const requestNotificationPermission = async () => {
    if (!('Notification' in window)) {
        console.warn('Notifications are not supported');
        return false;
    }

    if (Notification.permission === 'granted') {
        return true;
    }

    if (Notification.permission === 'denied') {
        return false;
    }

    const permission = await Notification.requestPermission();
    return permission === 'granted';
};

// Show offline notification
export const showOfflineNotification = () => {
    if (Notification.permission === 'granted') {
        new Notification('SPEAR LMS - Offline Mode', {
            body: 'You are now offline. Some features may be limited.',
            icon: '/favicon.ico',
            tag: 'offline-notification'
        });
    }
};

// Show online notification
export const showOnlineNotification = () => {
    if (Notification.permission === 'granted') {
        new Notification('SPEAR LMS - Back Online', {
            body: 'Connection restored. All features are now available.',
            icon: '/favicon.ico',
            tag: 'online-notification'
        });
    }
};

export default {
    registerServiceWorker,
    unregisterServiceWorker,
    isOffline,
    setupNetworkListeners,
    setupServiceWorkerListeners,
    triggerBackgroundSync,
    storeForOfflineSync,
    getCachedData,
    clearAllCaches,
    requestNotificationPermission,
    showOfflineNotification,
    showOnlineNotification
};
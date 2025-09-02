import { storeForOfflineSync, isOffline } from '../utils/serviceWorker';

// API configuration
const API_BASE_URL = window.Laravel?.apiUrl || '/api';
const CSRF_TOKEN = window.Laravel?.csrfToken;

// Default headers
const getDefaultHeaders = () => ({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-CSRF-TOKEN': CSRF_TOKEN,
    'X-Requested-With': 'XMLHttpRequest'
});

// API request wrapper with error handling and offline support
const apiRequest = async (endpoint, options = {}) => {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
        headers: getDefaultHeaders(),
        credentials: 'same-origin',
        ...options,
        headers: {
            ...getDefaultHeaders(),
            ...options.headers
        }
    };

    try {
        const response = await fetch(url, config);
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({
                message: `HTTP ${response.status}: ${response.statusText}`
            }));
            throw new Error(errorData.message || 'An error occurred');
        }

        return await response.json();
    } catch (error) {
        // Check if it's a network error and we're offline
        if (error.name === 'TypeError' && isOffline()) {
            throw new Error('You are offline. Please check your internet connection.');
        }
        
        console.error(`API Error (${endpoint}):`, error);
        throw error;
    }
};

// Dashboard API
export const dashboardAPI = {
    // Get dashboard overview data
    getDashboard: () => apiRequest('/dashboard'),
    
    // Get upcoming deadlines
    getDeadlines: () => apiRequest('/dashboard/deadlines'),
    
    // Get quick resources
    getResources: () => apiRequest('/dashboard/resources')
};

// Course API
export const courseAPI = {
    // Get all courses
    getCourses: () => apiRequest('/courses'),
    
    // Get specific course details
    getCourse: (id) => apiRequest(`/courses/${id}`),
    
    // Update course progress with offline support
    updateProgress: async (id, progress) => {
        try {
            return await apiRequest(`/courses/${id}/progress`, {
                method: 'PUT',
                body: JSON.stringify({ progress })
            });
        } catch (error) {
            // If offline, store for later sync
            if (isOffline()) {
                const success = storeForOfflineSync('pending_course_updates', {
                    courseId: id,
                    progress: progress
                });
                
                if (success) {
                    // Return a success response for offline mode
                    return {
                        success: true,
                        offline: true,
                        message: 'Progress saved offline. Will sync when connection is restored.'
                    };
                }
            }
            throw error;
        }
    }
};

// User API
export const userAPI = {
    // Get current user
    getUser: () => apiRequest('/user'),
    
    // Get user profile
    getProfile: () => apiRequest('/user/profile'),
    
    // Update user profile
    updateProfile: (data) => apiRequest('/user/profile', {
        method: 'PUT',
        body: JSON.stringify(data)
    }),
    
    // Update password
    updatePassword: (data) => apiRequest('/user/password', {
        method: 'PUT',
        body: JSON.stringify(data)
    }),
    
    // Get notifications
    getNotifications: () => apiRequest('/user/notifications'),
    
    // Mark notification as read
    markNotificationRead: (id) => apiRequest(`/user/notifications/${id}/read`, {
        method: 'PUT'
    })
};

// Health check
export const healthAPI = {
    check: () => apiRequest('/health')
};

// Generic API functions
export const api = {
    get: (endpoint) => apiRequest(endpoint),
    post: (endpoint, data) => apiRequest(endpoint, {
        method: 'POST',
        body: JSON.stringify(data)
    }),
    put: (endpoint, data) => apiRequest(endpoint, {
        method: 'PUT',
        body: JSON.stringify(data)
    }),
    delete: (endpoint) => apiRequest(endpoint, {
        method: 'DELETE'
    })
};

// Error handling utilities
export const handleApiError = (error, dispatch, errorKey) => {
    console.error('API Error:', error);
    
    if (dispatch && errorKey) {
        dispatch({
            type: 'SET_ERROR',
            payload: {
                key: errorKey,
                error: error.message || 'An unexpected error occurred'
            }
        });
    }
    
    // Handle specific error types
    if (error.message.includes('401') || error.message.includes('Unauthorized')) {
        // Redirect to login or refresh token
        window.location.href = '/login';
    }
};

// Loading state helper
export const withLoading = async (dispatch, loadingKey, apiCall) => {
    try {
        dispatch({
            type: 'SET_LOADING',
            payload: { key: loadingKey, value: true }
        });
        
        const result = await apiCall();
        
        dispatch({
            type: 'CLEAR_ERROR',
            payload: loadingKey
        });
        
        return result;
    } catch (error) {
        handleApiError(error, dispatch, loadingKey);
        throw error;
    } finally {
        dispatch({
            type: 'SET_LOADING',
            payload: { key: loadingKey, value: false }
        });
    }
};
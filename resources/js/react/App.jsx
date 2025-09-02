import React, { useEffect, useState } from 'react';
import { AppProvider, useApp, ActionTypes } from './contexts/AppContext';
import { dashboardAPI, courseAPI, userAPI, withLoading } from './services/api';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import MobileToggle from './components/MobileToggle';
import { 
    registerServiceWorker, 
    setupNetworkListeners, 
    setupServiceWorkerListeners,
    isOffline,
    requestNotificationPermission,
    showOfflineNotification,
    showOnlineNotification
} from './utils/serviceWorker';

// Main App component wrapped with context
function AppContent() {
    const { state, dispatch } = useApp();
    const { sidebarCollapsed, isMobile, mobileSidebarOpen, user } = state;
    const [isAppOffline, setIsAppOffline] = useState(isOffline());
    const [staleDataNotification, setStaleDataNotification] = useState(null);

    // Initialize service worker and network listeners
    useEffect(() => {
        // Register service worker
        registerServiceWorker();
        
        // Request notification permission
        requestNotificationPermission();
        
        // Setup network status listeners
        setupNetworkListeners(
            () => {
                setIsAppOffline(false);
                showOnlineNotification();
                // Reload data when back online
                loadInitialData();
            },
            () => {
                setIsAppOffline(true);
                showOfflineNotification();
            }
        );
        
        // Setup service worker message listeners
        setupServiceWorkerListeners((endpoint, timestamp) => {
            setStaleDataNotification({
                endpoint,
                timestamp,
                message: `Data from ${endpoint} may be outdated`
            });
            
            // Auto-hide notification after 5 seconds
            setTimeout(() => setStaleDataNotification(null), 5000);
        });
    }, []);
    
    // Load initial data
    useEffect(() => {
        loadInitialData();
    }, [dispatch, user]);
    
    const loadInitialData = async () => {
            try {
                // Load dashboard data
                const dashboardData = await withLoading(
                    dispatch, 
                    'dashboard', 
                    () => dashboardAPI.getDashboard()
                );
                dispatch({ 
                    type: ActionTypes.SET_DASHBOARD_DATA, 
                    payload: dashboardData 
                });

                // Load courses
                const coursesData = await withLoading(
                    dispatch, 
                    'courses', 
                    () => courseAPI.getCourses()
                );
                dispatch({ 
                    type: ActionTypes.SET_COURSES, 
                    payload: coursesData.courses 
                });

                // Load deadlines
                const deadlinesData = await dashboardAPI.getDeadlines();
                dispatch({ 
                    type: ActionTypes.SET_DEADLINES, 
                    payload: deadlinesData.deadlines 
                });

                // Load resources
                const resourcesData = await dashboardAPI.getResources();
                dispatch({ 
                    type: ActionTypes.SET_RESOURCES, 
                    payload: resourcesData.resources 
                });

                // Load notifications if user is available
                if (user) {
                    const notificationsData = await userAPI.getNotifications();
                    dispatch({ 
                        type: ActionTypes.SET_NOTIFICATIONS, 
                        payload: notificationsData.notifications 
                    });
                }
        } catch (error) {
            console.error('Failed to load initial data:', error);
        }
    };

    // Handle click outside sidebar on mobile
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isMobile && mobileSidebarOpen) {
                const sidebar = document.getElementById('sidebar');
                const mobileToggle = document.getElementById('mobile-toggle');
                
                if (sidebar && !sidebar.contains(event.target) && 
                    mobileToggle && !mobileToggle.contains(event.target)) {
                    dispatch({ type: ActionTypes.CLOSE_MOBILE_SIDEBAR });
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isMobile, mobileSidebarOpen, dispatch]);

    // Prevent body scroll when mobile sidebar is open
    useEffect(() => {
        if (isMobile && mobileSidebarOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobile, mobileSidebarOpen]);

    const toggleSidebar = () => {
        dispatch({ type: ActionTypes.TOGGLE_SIDEBAR });
    };

    const toggleMobileSidebar = () => {
        dispatch({ type: ActionTypes.TOGGLE_MOBILE_SIDEBAR });
    };

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Offline Status Banner */}
            {isAppOffline && (
                <div className="fixed top-0 left-0 right-0 bg-yellow-600 text-white px-4 py-2 text-center text-sm font-medium z-50">
                    <i className="fas fa-wifi-slash mr-2"></i>
                    You are offline. Some features may be limited.
                </div>
            )}
            
            {/* Stale Data Notification */}
            {staleDataNotification && (
                <div className="fixed top-4 right-4 bg-orange-600 text-white px-4 py-3 rounded-lg shadow-lg z-50 max-w-sm">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <i className="fas fa-exclamation-triangle mr-2"></i>
                            <span className="text-sm">{staleDataNotification.message}</span>
                        </div>
                        <button 
                            onClick={() => setStaleDataNotification(null)}
                            className="ml-2 text-white hover:text-gray-200"
                        >
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                </div>
            )}
            <Sidebar 
                collapsed={sidebarCollapsed}
                isMobile={isMobile}
                mobileOpen={mobileSidebarOpen}
                onToggle={toggleSidebar}
                onMobileToggle={toggleMobileSidebar}
            />
            
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header />
                <Dashboard />
            </div>
            
            <MobileToggle 
                isOpen={mobileSidebarOpen}
                onToggle={toggleMobileSidebar}
                isMobile={isMobile}
            />
        </div>
    );
}

// App wrapper with provider
function App() {
    return (
        <AppProvider>
            <AppContent />
        </AppProvider>
    );
}

export default App;
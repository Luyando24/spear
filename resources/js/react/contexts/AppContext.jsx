import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Initial state
const initialState = {
    // User state
    user: window.Laravel?.user || null,
    
    // UI state
    sidebarCollapsed: false,
    isMobile: false,
    mobileSidebarOpen: false,
    
    // Dashboard data
    dashboardData: null,
    courses: [],
    deadlines: [],
    resources: [],
    notifications: [],
    
    // Loading states
    loading: {
        dashboard: false,
        courses: false,
        user: false
    },
    
    // Error states
    errors: {
        dashboard: null,
        courses: null,
        user: null
    }
};

// Action types
export const ActionTypes = {
    // UI Actions
    TOGGLE_SIDEBAR: 'TOGGLE_SIDEBAR',
    SET_MOBILE: 'SET_MOBILE',
    TOGGLE_MOBILE_SIDEBAR: 'TOGGLE_MOBILE_SIDEBAR',
    CLOSE_MOBILE_SIDEBAR: 'CLOSE_MOBILE_SIDEBAR',
    
    // Data Actions
    SET_DASHBOARD_DATA: 'SET_DASHBOARD_DATA',
    SET_COURSES: 'SET_COURSES',
    SET_DEADLINES: 'SET_DEADLINES',
    SET_RESOURCES: 'SET_RESOURCES',
    SET_NOTIFICATIONS: 'SET_NOTIFICATIONS',
    UPDATE_COURSE_PROGRESS: 'UPDATE_COURSE_PROGRESS',
    
    // Loading Actions
    SET_LOADING: 'SET_LOADING',
    
    // Error Actions
    SET_ERROR: 'SET_ERROR',
    CLEAR_ERROR: 'CLEAR_ERROR',
    
    // User Actions
    SET_USER: 'SET_USER',
    UPDATE_USER_PROFILE: 'UPDATE_USER_PROFILE'
};

// Reducer function
function appReducer(state, action) {
    switch (action.type) {
        case ActionTypes.TOGGLE_SIDEBAR:
            return {
                ...state,
                sidebarCollapsed: !state.sidebarCollapsed
            };
            
        case ActionTypes.SET_MOBILE:
            return {
                ...state,
                isMobile: action.payload,
                mobileSidebarOpen: action.payload ? state.mobileSidebarOpen : false
            };
            
        case ActionTypes.TOGGLE_MOBILE_SIDEBAR:
            return {
                ...state,
                mobileSidebarOpen: !state.mobileSidebarOpen
            };
            
        case ActionTypes.CLOSE_MOBILE_SIDEBAR:
            return {
                ...state,
                mobileSidebarOpen: false
            };
            
        case ActionTypes.SET_DASHBOARD_DATA:
            return {
                ...state,
                dashboardData: action.payload
            };
            
        case ActionTypes.SET_COURSES:
            return {
                ...state,
                courses: action.payload
            };
            
        case ActionTypes.SET_DEADLINES:
            return {
                ...state,
                deadlines: action.payload
            };
            
        case ActionTypes.SET_RESOURCES:
            return {
                ...state,
                resources: action.payload
            };
            
        case ActionTypes.SET_NOTIFICATIONS:
            return {
                ...state,
                notifications: action.payload
            };
            
        case ActionTypes.UPDATE_COURSE_PROGRESS:
            return {
                ...state,
                courses: state.courses.map(course => 
                    course.id === action.payload.courseId 
                        ? { ...course, progress: action.payload.progress }
                        : course
                ),
                dashboardData: state.dashboardData ? {
                    ...state.dashboardData,
                    current_course: state.dashboardData.current_course?.id === action.payload.courseId
                        ? { ...state.dashboardData.current_course, progress: action.payload.progress }
                        : state.dashboardData.current_course
                } : null
            };
            
        case ActionTypes.SET_LOADING:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    [action.payload.key]: action.payload.value
                }
            };
            
        case ActionTypes.SET_ERROR:
            return {
                ...state,
                errors: {
                    ...state.errors,
                    [action.payload.key]: action.payload.error
                }
            };
            
        case ActionTypes.CLEAR_ERROR:
            return {
                ...state,
                errors: {
                    ...state.errors,
                    [action.payload]: null
                }
            };
            
        case ActionTypes.SET_USER:
            return {
                ...state,
                user: action.payload
            };
            
        case ActionTypes.UPDATE_USER_PROFILE:
            return {
                ...state,
                user: {
                    ...state.user,
                    ...action.payload
                }
            };
            
        default:
            return state;
    }
}

// Create contexts
const AppStateContext = createContext();
const AppDispatchContext = createContext();

// Provider component
export function AppProvider({ children }) {
    const [state, dispatch] = useReducer(appReducer, initialState);
    
    // Handle window resize for mobile detection
    useEffect(() => {
        const handleResize = () => {
            const isMobile = window.innerWidth < 768;
            if (isMobile !== state.isMobile) {
                dispatch({ type: ActionTypes.SET_MOBILE, payload: isMobile });
            }
        };
        
        // Set initial mobile state
        handleResize();
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [state.isMobile]);
    
    return (
        <AppStateContext.Provider value={state}>
            <AppDispatchContext.Provider value={dispatch}>
                {children}
            </AppDispatchContext.Provider>
        </AppStateContext.Provider>
    );
}

// Custom hooks
export function useAppState() {
    const context = useContext(AppStateContext);
    if (context === undefined) {
        throw new Error('useAppState must be used within an AppProvider');
    }
    return context;
}

export function useAppDispatch() {
    const context = useContext(AppDispatchContext);
    if (context === undefined) {
        throw new Error('useAppDispatch must be used within an AppProvider');
    }
    return context;
}

// Combined hook for convenience
export function useApp() {
    return {
        state: useAppState(),
        dispatch: useAppDispatch()
    };
}
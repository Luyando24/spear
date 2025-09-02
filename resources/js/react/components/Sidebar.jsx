import React from 'react';
import { useApp } from '../contexts/AppContext';

const Sidebar = ({ isCollapsed, isMobileOpen, isMobile, onToggle }) => {
    const { state } = useApp();
    const { user, notifications } = state;
    
    // Get unread notifications count
    const unreadCount = notifications?.filter(n => !n.read).length || 0;
    const sidebarClasses = `
        sidebar-gradient text-white 
        ${isCollapsed && !isMobile ? 'w-16' : 'w-64'} 
        min-h-screen transition-all duration-slow ease-in-out flex flex-col shadow-2xl z-30 
        fixed md:relative transform md:transform-none
        ${isMobile ? (isMobileOpen ? 'translate-x-0' : '-translate-x-full') : ''}
    `;

    const navigationItems = [
        { icon: 'fas fa-home', text: 'Dashboard', active: true },
        { icon: 'fas fa-book', text: 'Courses' },
        { icon: 'fas fa-tasks', text: 'Assignments' },
        { icon: 'fas fa-chart-line', text: 'Grades' },
        { icon: 'fas fa-folder', text: 'Resources' },
        { icon: 'fas fa-users', text: 'Community' }
    ];

    return (
        <div id="sidebar" className={sidebarClasses}>
            {/* Logo Section */}
            <div className="p-6 border-b border-white border-opacity-20">
                <div className="flex items-center space-md">
                    <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                        <i className="fas fa-graduation-cap text-white text-lg"></i>
                    </div>
                    {(!isCollapsed || isMobile) && (
                        <div className="animate-fade-in">
                            <h1 className="text-xl font-bold text-white font-spear">SPEAR LMS</h1>
                            <p className="text-sm text-white text-opacity-70">Student Portal</p>
                        </div>
                    )}
                </div>
                
                {/* Collapse Button - Desktop Only */}
                {!isMobile && (
                    <button 
                        onClick={onToggle}
                        className="absolute top-6 right-4 p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-all duration-normal bg-white bg-opacity-10"
                    >
                        <i className={`fas ${isCollapsed ? 'fa-chevron-right' : 'fa-chevron-left'} text-white text-lg`}></i>
                    </button>
                )}
            </div>

            {/* Navigation Menu */}
            <nav className="flex-1 px-4 py-6 space-y-2">
                {navigationItems.map((item, index) => (
                    <a 
                        key={index}
                        href="#" 
                        className={`nav-item ${
                            item.active 
                                ? 'active' 
                                : ''
                        }`}
                    >
                        <i className={`${item.icon} nav-icon transition-transform duration-normal group-hover:scale-110`}></i>
                        {(!isCollapsed || isMobile) && (
                            <span className="font-medium animate-fade-in">{item.text}</span>
                        )}
                    </a>
                ))}
            </nav>

            {/* User Profile Section */}
            <div className="p-4 border-t border-white border-opacity-20">
                <div className="flex items-center space-md px-4 py-3 hover:bg-white hover:bg-opacity-10 rounded-lg transition-all duration-normal">
                    <div className="w-8 h-8 bg-gradient-to-r from-spear-accent to-yellow-500 rounded-full flex items-center justify-center">
                        <i className="fas fa-user text-white text-sm"></i>
                    </div>
                    {(!isCollapsed || isMobile) && (
                        <div className="animate-fade-in">
                            <p className="text-white font-medium text-sm font-spear">{user?.name || 'Student'}</p>
                            <p className="text-white text-opacity-70 text-xs">{user?.email || 'View Profile'}</p>
                        </div>
                    )}
                </div>
                
                <div className="mt-2 px-4">
                    <button className="flex items-center space-x-3 w-full px-4 py-2 hover:bg-white hover:bg-opacity-10 rounded-lg text-white text-opacity-80 hover:text-opacity-100 transition-all duration-normal">
                        <i className={`fas fa-bell text-sm w-5 ${isCollapsed && !isMobile ? 'text-xl mx-auto' : ''}`}></i>
                        {(!isCollapsed || isMobile) && (
                            <>
                                <span className="text-sm">Notifications</span>
                                {unreadCount > 0 && (
                                    <span className="notification-badge animate-bounce-in">
                                        {unreadCount > 99 ? '99+' : unreadCount}
                                    </span>
                                )}
                            </>
                        )}
                    </button>
                    
                    <button className="flex items-center space-x-3 w-full px-4 py-2 hover:bg-white hover:bg-opacity-10 rounded-lg text-white text-opacity-80 hover:text-opacity-100 transition-all duration-normal mt-1">
                        <i className={`fas fa-sign-out-alt text-sm w-5 ${isCollapsed && !isMobile ? 'text-xl mx-auto' : ''}`}></i>
                        {(!isCollapsed || isMobile) && (
                            <span className="text-sm">Logout</span>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
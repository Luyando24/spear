import React from 'react';
import { useApp } from '../contexts/AppContext';

const Dashboard = () => {
    const { state } = useApp();
    const { dashboardData, courses, deadlines, resources, loading, errors } = state;
    
    // Show loading state
    if (loading.dashboard || loading.courses) {
        return (
            <main className="flex-1 overflow-y-auto px-6 py-8">
                <div className="flex items-center justify-center h-64 animate-fade-in">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-spear-primary"></div>
                    <span className="ml-3 text-spear-gray-600 font-spear">Loading dashboard...</span>
                </div>
            </main>
        );
    }
    
    // Show error state
    if (errors.dashboard || errors.courses) {
        return (
            <main className="flex-1 overflow-y-auto px-6 py-8">
                <div className="status-danger card animate-slide-up">
                    <div className="flex items-center space-sm">
                        <i className="fas fa-exclamation-triangle text-spear-danger"></i>
                        <span className="text-spear-danger font-spear">
                            {errors.dashboard || errors.courses || 'Failed to load dashboard data'}
                        </span>
                    </div>
                </div>
            </main>
        );
    }
    
    const currentCourse = dashboardData?.current_course;
    const stats = dashboardData?.stats;
    const applicationStatus = dashboardData?.application_status;
    return (
        <main className="flex-1 overflow-y-auto px-6 py-8">
            {/* Welcome Section */}
            <div className="mb-8 animate-slide-up">
                <div className="bg-gradient-to-r from-spear-primary to-spear-secondary rounded-2xl p-8 text-white relative overflow-hidden shadow-xl">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full -ml-12 -mb-12"></div>
                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold mb-2 font-spear">Welcome back, {dashboardData?.user?.name || 'Student'}!</h2>
                        <p className="text-blue-100 mb-6">Ready to continue your learning journey? Let's pick up where you left off.</p>
                        <div className="flex items-center space-lg">
                            <button className="btn btn-lg bg-white text-spear-primary hover:bg-blue-50 flex items-center space-sm">
                                <i className="fas fa-play"></i>
                                <span>Continue Learning</span>
                            </button>
                            <button className="btn btn-outline btn-lg border-2 border-white text-white hover:bg-white hover:text-spear-primary">
                                View All Courses
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content Area */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Current Course Progress */}
                    <div className="card card-lg animate-fade-in">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-spear-dark font-spear">Current Course</h3>
                            <span className="status-success">In Progress</span>
                        </div>
                        
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-6">
                            <div className="flex items-center space-lg mb-4">
                                <div className="w-12 h-12 bg-spear-secondary rounded-lg flex items-center justify-center">
                                    <i className="fas fa-code text-white text-lg"></i>
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold text-spear-dark font-spear">{currentCourse?.title || 'No Current Course'}</h4>
                                    <p className="text-spear-gray-600">{currentCourse?.description || 'Start a new course'}</p>
                                </div>
                            </div>
                            
                            {currentCourse && (
                                <>
                                    <div className="mb-4">
                                        <div className="flex justify-between text-sm text-spear-gray-600 mb-2">
                                            <span className="font-spear">Progress</span>
                                            <span className="font-spear">{currentCourse.progress}%</span>
                                        </div>
                                        <div className="progress-bar">
                                            <div className="progress-fill" style={{width: `${currentCourse.progress}%`}}></div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center justify-between">
                                        <div className="text-sm text-spear-gray-600 flex items-center space-sm">
                                            <i className="fas fa-clock"></i>
                                            <span>Last accessed: {currentCourse.last_accessed}</span>
                                        </div>
                                        <button className="btn btn-primary">
                                            Resume
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Course Curriculum */}
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <h3 className="text-xl font-bold text-spear-dark mb-6">MSSE Foundations Curriculum</h3>
                        <p className="text-gray-600 mb-6">{stats?.total_courses || 0} Courses • 0 Exams • {stats?.completed_courses || 0} Complete</p>
                        
                        <div className="space-y-4">
                            {courses.map((course) => {
                                const getStatusStyles = (status) => {
                                    switch (status) {
                                        case 'completed':
                                            return {
                                                container: 'bg-green-50 border-green-200',
                                                icon: 'bg-spear-success',
                                                iconClass: 'fas fa-check',
                                                progress: 'text-spear-success'
                                            };
                                        case 'in_progress':
                                            return {
                                                container: 'bg-blue-50 border-blue-200',
                                                icon: 'bg-spear-primary',
                                                iconClass: 'fas fa-play',
                                                progress: 'text-spear-primary'
                                            };
                                        default:
                                            return {
                                                container: 'bg-gray-50 border-gray-200 opacity-60',
                                                icon: 'bg-gray-400',
                                                iconClass: 'fas fa-lock',
                                                progress: 'text-gray-400'
                                            };
                                    }
                                };
                                
                                const styles = getStatusStyles(course.status);
                                
                                return (
                                    <div key={course.id} className={`flex items-center p-4 border rounded-xl ${styles.container}`}>
                                        <div className={`w-8 h-8 ${styles.icon} rounded-full flex items-center justify-center mr-4`}>
                                            <i className={`${styles.iconClass} text-white text-sm`}></i>
                                        </div>
                                        <div className="flex-1">
                                            <h4 className={`font-semibold ${course.status === 'locked' ? 'text-gray-600' : 'text-spear-dark'}`}>
                                                {course.title}
                                            </h4>
                                            <p className={`text-sm ${course.status === 'locked' ? 'text-gray-500' : 'text-gray-600'}`}>
                                                {course.status === 'completed' ? 'Completed' : 
                                                 course.status === 'in_progress' ? 'In Progress' : 'Locked'} • {course.duration}
                                            </p>
                                        </div>
                                        <span className={`font-medium ${styles.progress}`}>{course.progress}%</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Sidebar Content */}
                <div className="space-y-8">
                    {/* Quick Stats */}
                    <div className="card animate-fade-in">
                        <h3 className="text-lg font-bold text-spear-dark mb-4 font-spear">Quick Stats</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-sm">
                                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <i className="fas fa-book text-blue-600 text-sm"></i>
                                    </div>
                                    <span className="text-sm font-medium text-spear-dark font-spear">Courses</span>
                                </div>
                                <span className="text-lg font-bold text-spear-primary font-spear">{stats?.total_courses || 0}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-sm">
                                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                        <i className="fas fa-check-circle text-green-600 text-sm"></i>
                                    </div>
                                    <span className="text-sm font-medium text-spear-dark font-spear">Completed</span>
                                </div>
                                <span className="text-lg font-bold text-spear-success font-spear">{stats?.completed_courses || 0}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-sm">
                                    <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                                        <i className="fas fa-clock text-yellow-600 text-sm"></i>
                                    </div>
                                    <span className="text-sm font-medium text-spear-dark font-spear">Hours Studied</span>
                                </div>
                                <span className="text-lg font-bold text-spear-accent font-spear">{stats?.hours_studied || 0}</span>
                            </div>
                        </div>
                    </div>

                    {/* Application Status */}
                    <div className="card animate-fade-in">
                        <h3 className="text-lg font-bold text-spear-dark mb-4 font-spear">Application Status</h3>
                        <div className={`bg-gradient-to-r rounded-xl p-4 border ${
                            dashboardData?.application_status?.status === 'approved' 
                                ? 'from-green-50 to-emerald-50 border-green-200' 
                                : dashboardData?.application_status?.status === 'pending'
                                ? 'from-yellow-50 to-amber-50 border-yellow-200'
                                : 'from-red-50 to-rose-50 border-red-200'
                        }`}>
                            <div className="flex items-center space-sm mb-2">
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                    dashboardData?.application_status?.status === 'approved' 
                                        ? 'bg-spear-success' 
                                        : dashboardData?.application_status?.status === 'pending'
                                        ? 'bg-spear-warning'
                                        : 'bg-spear-danger'
                                }`}>
                                    <i className={`text-white text-xs ${
                                        dashboardData?.application_status?.status === 'approved' 
                                            ? 'fas fa-check' 
                                            : dashboardData?.application_status?.status === 'pending'
                                            ? 'fas fa-clock'
                                            : 'fas fa-times'
                                    }`}></i>
                                </div>
                                <span className={`font-semibold font-spear ${
                                    dashboardData?.application_status?.status === 'approved' 
                                        ? 'text-spear-success' 
                                        : dashboardData?.application_status?.status === 'pending'
                                        ? 'text-spear-warning'
                                        : 'text-spear-danger'
                                }`}>
                                    {dashboardData?.application_status?.status || 'Unknown'}
                                </span>
                            </div>
                            <p className="text-sm text-spear-gray-600 mb-3">{dashboardData?.application_status?.message || 'Status information unavailable.'}</p>
                            <button className="text-sm text-spear-primary font-medium hover:underline font-spear">
                                View Details
                            </button>
                        </div>
                    </div>

                    {/* Upcoming Deadlines */}
                    <div className="card animate-fade-in">
                        <h3 className="text-lg font-bold text-spear-dark mb-4 font-spear">Upcoming Deadlines</h3>
                        <div className="space-y-3">
                            {deadlines.slice(0, 2).map((deadline) => {
                                const getPriorityColor = (priority) => {
                                    switch (priority) {
                                        case 'high': return { bg: 'bg-red-50', dot: 'bg-spear-danger' };
                                        case 'medium': return { bg: 'bg-yellow-50', dot: 'bg-spear-warning' };
                                        default: return { bg: 'bg-blue-50', dot: 'bg-spear-primary' };
                                    }
                                };
                                const colors = getPriorityColor(deadline.priority);
                                
                                return (
                                    <div key={deadline.id} className={`flex items-center space-sm p-3 ${colors.bg} rounded-lg`}>
                                        <div className={`w-2 h-2 ${colors.dot} rounded-full`}></div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-spear-dark font-spear">{deadline.title}</p>
                                            <p className="text-xs text-spear-gray-500">{deadline.due_date}</p>
                                        </div>
                                    </div>
                                );
                            })}
                            {deadlines.length === 0 && (
                                <div className="text-center py-4 text-spear-gray-500">
                                    <p className="text-sm">No upcoming deadlines</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Study Resources */}
                    <div className="card animate-fade-in">
                        <h3 className="text-lg font-bold text-spear-dark mb-4 font-spear">Quick Resources</h3>
                        <div className="space-y-3">
                            {resources.slice(0, 3).map((resource) => {
                                const getIconColor = (color) => {
                                    if (color.includes('purple')) return { bg: 'bg-purple-100', text: 'text-purple-600' };
                                    if (color.includes('green')) return { bg: 'bg-green-100', text: 'text-green-600' };
                                    if (color.includes('blue')) return { bg: 'bg-blue-100', text: 'text-blue-600' };
                                    if (color.includes('orange')) return { bg: 'bg-orange-100', text: 'text-orange-600' };
                                    return { bg: 'bg-gray-100', text: 'text-gray-600' };
                                };
                                const iconColors = getIconColor(resource.color);
                                
                                return (
                                    <a key={resource.id} href={resource.url} className="flex items-center space-sm p-3 hover:bg-spear-gray-50 rounded-lg transition-colors duration-200">
                                        <div className={`w-8 h-8 ${iconColors.bg} rounded-lg flex items-center justify-center`}>
                                            <i className={`${resource.icon} ${iconColors.text} text-sm`}></i>
                                        </div>
                                        <span className="text-sm font-medium text-spear-dark font-spear">{resource.title}</span>
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Dashboard;
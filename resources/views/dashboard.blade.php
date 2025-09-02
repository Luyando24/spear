<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SPEAR LMS - Student Dashboard</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        'spear-primary': '#0f766e',
                        'spear-secondary': '#14b8a6',
                        'spear-accent': '#f59e0b',
                        'spear-success': '#10b981',
                        'spear-warning': '#f59e0b',
                        'spear-danger': '#ef4444',
                        'spear-dark': '#1f2937',
                        'spear-light': '#f8fafc',
                        'military-green': '#4a5d23',
                        'military-dark': '#3a4a1c'
                    },
                    fontFamily: {
                        'spear': ['Inter', 'system-ui', 'sans-serif']
                    }
                }
            }
        }
    </script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
</head>
<body class="bg-gradient-to-br from-spear-light to-teal-50 min-h-screen font-spear overflow-hidden">
     <div class="flex h-screen overflow-hidden">
         <!-- Left Sidebar Navigation -->
         <div id="sidebar" class="bg-gradient-to-b from-military-green to-military-dark text-white w-64 min-h-screen transition-all duration-300 ease-in-out flex flex-col shadow-2xl z-30 fixed md:relative transform md:transform-none">
             <!-- Logo Section -->
             <div class="p-6 border-b border-white border-opacity-20">
                 <div class="flex items-center space-x-3">
                     <div class="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                         <i class="fas fa-graduation-cap text-white text-lg"></i>
                     </div>
                     <div id="logo-text">
                         <h1 class="text-xl font-bold text-white">SPEAR LMS</h1>
                         <p class="text-sm text-white text-opacity-70">Student Portal</p>
                     </div>
                 </div>
                 <!-- Collapse Button -->
                 <button id="collapse-btn" class="absolute top-6 right-4 p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors duration-200 bg-white bg-opacity-10">
                     <i class="fas fa-chevron-left text-white text-lg"></i>
                 </button>
             </div>
 
             <!-- Navigation Menu -->
             <nav class="flex-1 px-4 py-6 space-y-2">
                 <a href="#" class="flex items-center space-x-3 px-4 py-3 bg-white bg-opacity-20 rounded-lg text-white font-medium">
                     <i class="fas fa-home text-lg w-5"></i>
                     <span class="nav-text">Dashboard</span>
                 </a>
                 <a href="#" class="flex items-center space-x-3 px-4 py-3 hover:bg-white hover:bg-opacity-10 rounded-lg text-white text-opacity-80 hover:text-opacity-100 transition-all duration-200">
                     <i class="fas fa-book text-lg w-5"></i>
                     <span class="nav-text">Courses</span>
                 </a>
                 <a href="#" class="flex items-center space-x-3 px-4 py-3 hover:bg-white hover:bg-opacity-10 rounded-lg text-white text-opacity-80 hover:text-opacity-100 transition-all duration-200">
                     <i class="fas fa-tasks text-lg w-5"></i>
                     <span class="nav-text">Assignments</span>
                 </a>
                 <a href="#" class="flex items-center space-x-3 px-4 py-3 hover:bg-white hover:bg-opacity-10 rounded-lg text-white text-opacity-80 hover:text-opacity-100 transition-all duration-200">
                     <i class="fas fa-chart-line text-lg w-5"></i>
                     <span class="nav-text">Grades</span>
                 </a>
                 <a href="#" class="flex items-center space-x-3 px-4 py-3 hover:bg-white hover:bg-opacity-10 rounded-lg text-white text-opacity-80 hover:text-opacity-100 transition-all duration-200">
                     <i class="fas fa-folder text-lg w-5"></i>
                     <span class="nav-text">Resources</span>
                 </a>
                 <a href="#" class="flex items-center space-x-3 px-4 py-3 hover:bg-white hover:bg-opacity-10 rounded-lg text-white text-opacity-80 hover:text-opacity-100 transition-all duration-200">
                     <i class="fas fa-users text-lg w-5"></i>
                     <span class="nav-text">Community</span>
                 </a>
             </nav>
 
             <!-- User Profile Section -->
             <div class="p-4 border-t border-white border-opacity-20">
                 <div class="flex items-center space-x-3 px-4 py-3 hover:bg-white hover:bg-opacity-10 rounded-lg transition-all duration-200">
                     <div class="w-8 h-8 bg-gradient-to-r from-spear-accent to-yellow-500 rounded-full flex items-center justify-center">
                         <i class="fas fa-user text-white text-sm"></i>
                     </div>
                     <div class="nav-text">
                         <p class="text-white font-medium text-sm">{{ Auth::user()->name ?? 'Student' }}</p>
                         <p class="text-white text-opacity-70 text-xs">View Profile</p>
                     </div>
                 </div>
                 <div class="mt-2 px-4">
                     <button class="flex items-center space-x-3 w-full px-4 py-2 hover:bg-white hover:bg-opacity-10 rounded-lg text-white text-opacity-80 hover:text-opacity-100 transition-all duration-200">
                         <i class="fas fa-bell text-sm w-5"></i>
                         <span class="nav-text text-sm">Notifications</span>
                         <span class="ml-auto w-2 h-2 bg-spear-danger rounded-full"></span>
                     </button>
                     <button class="flex items-center space-x-3 w-full px-4 py-2 hover:bg-white hover:bg-opacity-10 rounded-lg text-white text-opacity-80 hover:text-opacity-100 transition-all duration-200 mt-1">
                         <i class="fas fa-sign-out-alt text-sm w-5"></i>
                         <span class="nav-text text-sm">Logout</span>
                     </button>
                 </div>
             </div>
         </div>
 
         <!-- Main Content Area -->
         <div class="flex-1 flex flex-col overflow-hidden w-full md:ml-0" id="main-content">
             <!-- Top Header -->
             <header class="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
                 <div class="flex items-center justify-between">
                     <div>
                         <h2 class="text-2xl font-bold text-spear-dark">Dashboard</h2>
                         <p class="text-gray-600 text-sm">Welcome back! Here's your learning progress.</p>
                     </div>
                     <div class="flex items-center space-x-4">
                         <div class="relative">
                             <input type="search" placeholder="Search courses..." class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-spear-primary focus:border-transparent">
                             <i class="fas fa-search absolute left-3 top-3 text-gray-400"></i>
                         </div>
                     </div>
                 </div>
             </header>

    <!-- Main Content -->
             <main class="flex-1 overflow-y-auto px-6 py-8">
        <!-- Welcome Section -->
        <div class="mb-8">
            <div class="bg-gradient-to-r from-spear-primary to-spear-secondary rounded-2xl p-8 text-white relative overflow-hidden">
                <div class="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
                <div class="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full -ml-12 -mb-12"></div>
                <div class="relative z-10">
                    <h2 class="text-3xl font-bold mb-2">Welcome back, {{ Auth::user()->name ?? 'Student' }}!</h2>
                    <p class="text-blue-100 mb-6">Ready to continue your learning journey? Let's pick up where you left off.</p>
                    <div class="flex items-center space-x-4">
                        <button class="bg-white text-spear-primary px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200 flex items-center space-x-2">
                            <i class="fas fa-play"></i>
                            <span>Continue Learning</span>
                        </button>
                        <button class="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-spear-primary transition-colors duration-200">
                            View All Courses
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Dashboard Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Main Content Area -->
            <div class="lg:col-span-2 space-y-8">
                <!-- Current Course Progress -->
                <div class="bg-white rounded-2xl shadow-lg p-6">
                    <div class="flex items-center justify-between mb-6">
                        <h3 class="text-xl font-bold text-spear-dark">Current Course</h3>
                        <span class="bg-spear-success text-white px-3 py-1 rounded-full text-sm font-medium">In Progress</span>
                    </div>
                    
                    <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-6">
                        <div class="flex items-center space-x-4 mb-4">
                            <div class="w-12 h-12 bg-spear-secondary rounded-lg flex items-center justify-center">
                                <i class="fas fa-code text-white text-lg"></i>
                            </div>
                            <div>
                                <h4 class="text-lg font-semibold text-spear-dark">Learn to Code with ChatGPT</h4>
                                <p class="text-gray-600">MSSE Foundations • Module 2 of 6</p>
                            </div>
                        </div>
                        
                        <div class="mb-4">
                            <div class="flex justify-between text-sm text-gray-600 mb-2">
                                <span>Progress</span>
                                <span>65%</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-3">
                                <div class="bg-gradient-to-r from-spear-secondary to-blue-400 h-3 rounded-full" style="width: 65%"></div>
                            </div>
                        </div>
                        
                        <div class="flex items-center justify-between">
                            <div class="text-sm text-gray-600">
                                <i class="fas fa-clock mr-1"></i>
                                Last accessed: 2 hours ago
                            </div>
                            <button class="bg-spear-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-800 transition-colors duration-200">
                                Resume
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Course Curriculum -->
                <div class="bg-white rounded-2xl shadow-lg p-6">
                    <h3 class="text-xl font-bold text-spear-dark mb-6">MSSE Foundations Curriculum</h3>
                    <p class="text-gray-600 mb-6">6 Courses • 0 Exams • 1 Complete</p>
                    
                    <div class="space-y-4">
                        <!-- Completed Course -->
                        <div class="flex items-center p-4 bg-green-50 border border-green-200 rounded-xl">
                            <div class="w-10 h-10 bg-spear-success rounded-lg flex items-center justify-center mr-4">
                                <i class="fas fa-check text-white"></i>
                            </div>
                            <div class="flex-1">
                                <h4 class="font-semibold text-spear-dark">Managing Application Development</h4>
                                <p class="text-sm text-gray-600">Completed • Grade: A</p>
                            </div>
                            <div class="text-spear-success">
                                <i class="fas fa-trophy text-lg"></i>
                            </div>
                        </div>

                        <!-- Current Course -->
                        <div class="flex items-center p-4 bg-blue-50 border border-blue-200 rounded-xl">
                            <div class="w-10 h-10 bg-spear-secondary rounded-lg flex items-center justify-center mr-4">
                                <i class="fas fa-play text-white"></i>
                            </div>
                            <div class="flex-1">
                                <h4 class="font-semibold text-spear-dark">Learn to Code with ChatGPT</h4>
                                <p class="text-sm text-gray-600">In Progress • 65% Complete</p>
                            </div>
                            <div class="text-spear-secondary">
                                <i class="fas fa-arrow-right text-lg"></i>
                            </div>
                        </div>

                        <!-- Upcoming Courses -->
                        <div class="flex items-center p-4 bg-gray-50 border border-gray-200 rounded-xl opacity-75">
                            <div class="w-10 h-10 bg-gray-400 rounded-lg flex items-center justify-center mr-4">
                                <i class="fas fa-lock text-white"></i>
                            </div>
                            <div class="flex-1">
                                <h4 class="font-semibold text-gray-600">User-Centered Design</h4>
                                <p class="text-sm text-gray-500">Locked • Complete previous course to unlock</p>
                            </div>
                        </div>

                        <div class="flex items-center p-4 bg-gray-50 border border-gray-200 rounded-xl opacity-75">
                            <div class="w-10 h-10 bg-gray-400 rounded-lg flex items-center justify-center mr-4">
                                <i class="fas fa-lock text-white"></i>
                            </div>
                            <div class="flex-1">
                                <h4 class="font-semibold text-gray-600">Software Architecture Patterns</h4>
                                <p class="text-sm text-gray-500">Locked</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Sidebar -->
            <div class="space-y-6">
                <!-- Quick Stats -->
                <div class="bg-white rounded-2xl shadow-lg p-6">
                    <h3 class="text-lg font-bold text-spear-dark mb-4">Your Progress</h3>
                    <div class="space-y-4">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center space-x-3">
                                <div class="w-8 h-8 bg-spear-success rounded-lg flex items-center justify-center">
                                    <i class="fas fa-book text-white text-sm"></i>
                                </div>
                                <span class="text-gray-600">Courses Completed</span>
                            </div>
                            <span class="font-bold text-spear-dark">1</span>
                        </div>
                        <div class="flex items-center justify-between">
                            <div class="flex items-center space-x-3">
                                <div class="w-8 h-8 bg-spear-secondary rounded-lg flex items-center justify-center">
                                    <i class="fas fa-clock text-white text-sm"></i>
                                </div>
                                <span class="text-gray-600">Study Hours</span>
                            </div>
                            <span class="font-bold text-spear-dark">24</span>
                        </div>
                        <div class="flex items-center justify-between">
                            <div class="flex items-center space-x-3">
                                <div class="w-8 h-8 bg-spear-accent rounded-lg flex items-center justify-center">
                                    <i class="fas fa-star text-white text-sm"></i>
                                </div>
                                <span class="text-gray-600">Average Grade</span>
                            </div>
                            <span class="font-bold text-spear-dark">A</span>
                        </div>
                    </div>
                </div>

                <!-- Application Status -->
                <div class="bg-gradient-to-br from-spear-primary to-spear-secondary rounded-2xl shadow-lg p-6 text-white">
                    <div class="flex items-center mb-4">
                        <div class="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mr-3">
                            <i class="fas fa-graduation-cap text-white"></i>
                        </div>
                        <h3 class="text-lg font-bold">SPEAR MS Program</h3>
                    </div>
                    <p class="text-blue-100 text-sm mb-4">Continue building your foundation with our open courses. Strong performance increases your chances for program admission and scholarships.</p>
                    <button class="bg-white text-spear-primary px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200 w-full">
                        Learn More
                    </button>
                </div>

                <!-- Upcoming Deadlines -->
                <div class="bg-white rounded-2xl shadow-lg p-6">
                    <h3 class="text-lg font-bold text-spear-dark mb-4">Upcoming Deadlines</h3>
                    <div class="space-y-3">
                        <div class="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
                            <div class="w-2 h-2 bg-spear-danger rounded-full"></div>
                            <div class="flex-1">
                                <p class="text-sm font-medium text-spear-dark">Module 2 Quiz</p>
                                <p class="text-xs text-gray-500">Due in 2 days</p>
                            </div>
                        </div>
                        <div class="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                            <div class="w-2 h-2 bg-spear-warning rounded-full"></div>
                            <div class="flex-1">
                                <p class="text-sm font-medium text-spear-dark">Project Submission</p>
                                <p class="text-xs text-gray-500">Due in 1 week</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Study Resources -->
                <div class="bg-white rounded-2xl shadow-lg p-6">
                    <h3 class="text-lg font-bold text-spear-dark mb-4">Quick Resources</h3>
                    <div class="space-y-3">
                        <a href="#" class="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                            <div class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                                <i class="fas fa-book-open text-purple-600 text-sm"></i>
                            </div>
                            <span class="text-sm font-medium text-spear-dark">Study Guides</span>
                        </a>
                        <a href="#" class="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                            <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                <i class="fas fa-video text-green-600 text-sm"></i>
                            </div>
                            <span class="text-sm font-medium text-spear-dark">Video Tutorials</span>
                        </a>
                        <a href="#" class="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                            <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                <i class="fas fa-users text-blue-600 text-sm"></i>
                            </div>
                            <span class="text-sm font-medium text-spear-dark">Discussion Forum</span>
                        </a>
                    </div>
                </div>
                </div>
            </div>
            </main>
        </div>
    </div>

    <!-- Mobile Toggle Button -->    
    <button id="mobile-toggle" class="fixed top-4 right-4 md:hidden bg-military-green text-white p-3 rounded-full shadow-lg z-50">
        <i class="fas fa-bars"></i>
    </button>

    <!-- Custom Scripts -->
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            // DOM Elements
            const sidebar = document.getElementById('sidebar');
            const collapseBtn = document.getElementById('collapse-btn');
            const logoText = document.getElementById('logo-text');
            const navTexts = document.querySelectorAll('.nav-text');
            const mainContent = document.getElementById('main-content');
            const mobileToggle = document.getElementById('mobile-toggle');
            
            // State variables
            let isCollapsed = false;
            let isMobileOpen = false;
            
            // Function to handle sidebar collapse (desktop only)
            function toggleSidebar() {
                isCollapsed = !isCollapsed;
                
                if (isCollapsed) {
                    // Collapse sidebar
                    sidebar.classList.remove('w-64');
                    sidebar.classList.add('w-16');
                    logoText.style.display = 'none';
                    navTexts.forEach(text => text.style.display = 'none');
                    collapseBtn.querySelector('i').classList.remove('fa-chevron-left');
                    collapseBtn.querySelector('i').classList.add('fa-chevron-right');
                    
                    // Make icons more visible in collapsed state
                    document.querySelectorAll('nav a i, .p-4 button i').forEach(icon => {
                        icon.classList.add('text-xl');
                        icon.classList.add('mx-auto');
                    });
                } else {
                    // Expand sidebar
                    sidebar.classList.remove('w-16');
                    sidebar.classList.add('w-64');
                    logoText.style.display = 'block';
                    navTexts.forEach(text => text.style.display = 'block');
                    collapseBtn.querySelector('i').classList.remove('fa-chevron-right');
                    collapseBtn.querySelector('i').classList.add('fa-chevron-left');
                    
                    // Reset icon styling
                    document.querySelectorAll('nav a i, .p-4 button i').forEach(icon => {
                        icon.classList.remove('text-xl');
                        icon.classList.remove('mx-auto');
                    });
                }
            }
            
            // Function to handle mobile sidebar toggle
            function toggleMobileSidebar() {
                isMobileOpen = !isMobileOpen;
                
                if (isMobileOpen) {
                    // Open mobile sidebar
                    sidebar.classList.remove('-translate-x-full');
                    sidebar.classList.add('translate-x-0');
                    document.body.classList.add('overflow-hidden'); // Prevent body scrolling
                    mobileToggle.innerHTML = '<i class="fas fa-times"></i>';
                } else {
                    // Close mobile sidebar
                    sidebar.classList.add('-translate-x-full');
                    sidebar.classList.remove('translate-x-0');
                    document.body.classList.remove('overflow-hidden'); // Allow body scrolling
                    mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
            
            // Initialize sidebar state based on screen size
            function initializeSidebar() {
                const isMobile = window.innerWidth < 768;
                
                if (isMobile) {
                    // Mobile initialization
                    sidebar.classList.add('-translate-x-full');
                    
                    // Reset any desktop-specific classes
                    if (isCollapsed) {
                        isCollapsed = false;
                        sidebar.classList.remove('w-16');
                        sidebar.classList.add('w-64');
                        logoText.style.display = 'block';
                        navTexts.forEach(text => text.style.display = 'block');
                        collapseBtn.querySelector('i').classList.remove('fa-chevron-right');
                        collapseBtn.querySelector('i').classList.add('fa-chevron-left');
                    }
                } else {
                    // Desktop initialization
                    sidebar.classList.remove('-translate-x-full');
                    sidebar.classList.add('translate-x-0');
                    
                    // Reset mobile menu state if it was open
                    if (isMobileOpen) {
                        isMobileOpen = false;
                        mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
                    }
                }
            }
            
            // Event Listeners
            collapseBtn.addEventListener('click', toggleSidebar);
            mobileToggle.addEventListener('click', toggleMobileSidebar);
            
            // Close sidebar when clicking outside on mobile
            document.addEventListener('click', function(event) {
                const isMobile = window.innerWidth < 768;
                if (isMobile && isMobileOpen && 
                    !sidebar.contains(event.target) && 
                    !mobileToggle.contains(event.target)) {
                    toggleMobileSidebar();
                }
            });
            
            // Handle window resize
            let resizeTimer;
            window.addEventListener('resize', function() {
                // Debounce resize events
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(function() {
                    initializeSidebar();
                }, 250);
            });
            
            // Add smooth hover effects
            const navLinks = document.querySelectorAll('nav a, .p-4 button');
            navLinks.forEach(link => {
                link.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateX(4px)';
                });
                link.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateX(0)';
                });
            });
            
            // Initialize on load
            initializeSidebar();
            
            console.log('SPEAR LMS Dashboard with improved collapsible sidebar loaded successfully!');
        });
    </script>
</body>
</html>

/** @jsx React.createElement */
import React from 'react';
import '../../../css/app.css';

// Define styles directly to test styling
const styles = {
    // Features section styles
    featuresSection: {
        maxWidth: '80rem',
        margin: '0 auto',
        padding: '4rem 1.5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    sectionTitle: {
        fontSize: '2.25rem',
        fontWeight: 'bold',
        marginBottom: '2rem',
        textAlign: 'center'
    },
    featuresGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
        gap: '2rem',
        width: '100%',
        '@media (min-width: 640px)': {
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))'
        },
        '@media (min-width: 1024px)': {
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))'
        }
    },
    featureCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '0.5rem',
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
    },
    featureIcon: {
        backgroundColor: '#2563eb',
        color: 'white',
        width: '3rem',
        height: '3rem',
        borderRadius: '0.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.5rem'
    },
    featureTitle: {
        fontSize: '1.25rem',
        fontWeight: 'bold'
    },
    featureDescription: {
        color: 'rgba(255, 255, 255, 0.9)'
    },
    // Hero section styles
    hero: {
        maxWidth: '80rem',
        margin: '0 auto',
        padding: '6rem 1.5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center'
    },
    heroTitle: {
        fontSize: '3rem',
        fontWeight: 'bold',
        marginBottom: '1.5rem',
        lineHeight: '1.2'
    },
    heroSubtitle: {
        fontSize: '1.25rem',
        maxWidth: '42rem',
        margin: '0 auto 2rem auto',
        color: 'rgba(255, 255, 255, 0.9)'
    },
    ctaButton: {
        backgroundColor: '#16a34a',
        color: 'white',
        padding: '0.75rem 1.5rem',
        borderRadius: '0.5rem',
        fontWeight: 'bold',
        textDecoration: 'none',
        transition: 'background-color 0.2s',
        ':hover': {
            backgroundColor: '#15803d'
        }
    },
    container: {
        minHeight: '100vh',
        background: 'linear-gradient(to bottom right, #172554, #1e3a5f, #1e3a8a)',
        color: 'white',
        fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
    },
    nav: {
        padding: '1rem 1.5rem',
        position: 'relative',
        zIndex: 10
    },
    navContent: {
        maxWidth: '80rem',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    logoContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
    },
    logo: {
        width: '2.5rem',
        height: '2.5rem',
        backgroundColor: 'white',
        borderRadius: '9999px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    logoText: {
        color: '#1e3a8a',
        fontWeight: 'bold',
        fontSize: '1.25rem'
    },
    brandName: {
        fontWeight: 'bold',
        fontSize: '1.25rem'
    },
    navLinks: {
        display: 'none',
        gap: '1.5rem',
        '@media (min-width: 768px)': {
            display: 'flex'
        }
    },
    navLink: {
        color: 'white',
        textDecoration: 'none',
        transition: 'color 0.2s',
        ':hover': {
            color: '#93c5fd'
        }
    },
    buttonContainer: {
        display: 'flex',
        gap: '1rem'
    },
    signInButton: {
        backgroundColor: '#2563eb',
        color: 'white',
        padding: '0.5rem 1rem',
        borderRadius: '0.5rem',
        textDecoration: 'none',
        transition: 'background-color 0.2s',
        ':hover': {
            backgroundColor: '#1d4ed8'
        }
    },
    registerButton: {
        backgroundColor: '#16a34a',
        color: 'white',
        padding: '0.5rem 1rem',
        borderRadius: '0.5rem',
        textDecoration: 'none',
        transition: 'background-color 0.2s',
        ':hover': {
            backgroundColor: '#15803d'
        }
    }
};

const Landing = () => {
    return (
        <div style={styles.container}>
            {/* Navigation */}
            <nav style={styles.nav}>
                <div style={styles.navContent}>
                    <div style={styles.logoContainer}>
                        <div style={styles.logo}>
                            <span style={styles.logoText}>S</span>
                        </div>
                        <span style={styles.brandName}>SPEAR LMS</span>
                    </div>
                    <div style={styles.navLinks}>
                        <a href="#features" style={styles.navLink}>Features</a>
                        <a href="#benefits" style={styles.navLink}>Benefits</a>
                        <a href="#about" style={styles.navLink}>About</a>
                    </div>
                    <div style={styles.buttonContainer}>
                        <a href="/login" style={styles.signInButton}>
                            Sign In
                        </a>
                        <a href="/register" style={styles.registerButton}>
                            Register
                        </a>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div style={styles.hero}>
                <h1 style={styles.heroTitle}>Secure Personnel Education And Readiness</h1>
                <p style={styles.heroSubtitle}>A comprehensive learning management system designed for personnel training and readiness tracking.</p>
                <a href="/register" style={styles.ctaButton}>
                    Get Started
                </a>
            </div>

            {/* Features Section */}
            <div id="features" className="bg-white text-spear-navy-900 py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Key Features</h2>
                    
                    <div className="grid md:grid-cols-3 gap-10">
                        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Comprehensive Courses</h3>
                            <p className="text-gray-600">Access a wide range of structured learning materials designed for professional development.</p>
                        </div>
                        
                        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Progress Tracking</h3>
                            <p className="text-gray-600">Monitor learning progress with detailed analytics and performance metrics.</p>
                        </div>
                        
                        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Offline Learning</h3>
                            <p className="text-gray-600">Access course materials even without internet connection with our offline capabilities.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Benefits Section */}
            <div id="benefits" className="bg-gray-100 text-spear-navy-900 py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Benefits</h2>
                    
                    <div className="grid md:grid-cols-2 gap-10">
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0">
                                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">1</div>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2">Enhanced Skill Development</h3>
                                <p className="text-gray-600">Structured learning paths designed to build competencies systematically and effectively.</p>
                            </div>
                        </div>
                        
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0">
                                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">2</div>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2">Operational Readiness</h3>
                                <p className="text-gray-600">Prepare personnel with the knowledge and skills needed for optimal performance in various scenarios.</p>
                            </div>
                        </div>
                        
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0">
                                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">3</div>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2">Standardized Training</h3>
                                <p className="text-gray-600">Ensure consistent knowledge transfer across all organizational levels and departments.</p>
                            </div>
                        </div>
                        
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0">
                                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">4</div>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2">Data-Driven Insights</h3>
                                <p className="text-gray-600">Make informed decisions based on comprehensive learning analytics and performance data.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* About Section */}
            <div id="about" className="bg-spear-navy-800 text-white py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">About SPEAR LMS</h2>
                    <p className="text-lg text-center max-w-3xl mx-auto mb-12">
                        SPEAR LMS is a state-of-the-art learning management system designed specifically for organizations that require structured, comprehensive, and trackable professional development solutions.
                    </p>
                    
                    <div className="flex justify-center">
                        <div className="flex space-x-4">
                            <a href="/login" className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg transition-colors">
                                Sign In
                            </a>
                            <a href="/register" className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg transition-colors">
                                Register
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-spear-navy-900 text-white py-8">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-4 md:mb-0">
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                                    <span className="text-spear-navy-800 font-bold text-sm">S</span>
                                </div>
                                <span className="font-bold">SPEAR LMS</span>
                            </div>
                        </div>
                        <div className="text-sm text-gray-400">
                            &copy; {new Date().getFullYear()} SPEAR LMS. All rights reserved.
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Landing;
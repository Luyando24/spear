/** @jsx React.createElement */
import React from 'react';
import '../../../css/app.css';

// Define styles directly to test styling
const styles = {
    // Footer styles
    footer: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        padding: '3rem 1.5rem',
        marginTop: '2rem'
    },
    footerContent: {
        maxWidth: '80rem',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: '1rem'
    },
    footerLogo: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        marginBottom: '1rem'
    },
    footerLinks: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '1.5rem',
        marginBottom: '1.5rem'
    },
    footerLink: {
        color: 'white',
        textDecoration: 'none',
        transition: 'color 0.2s',
        ':hover': {
            color: '#93c5fd'
        }
    },
    copyright: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: '0.875rem'
    },
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
            <div id="features" style={styles.featuresSection}>
                <h2 style={styles.sectionTitle}>Key Features</h2>
                <div style={styles.featuresGrid}>
                    {/* Feature 1 */}
                    <div style={styles.featureCard}>
                        <div style={styles.featureIcon}>
                            📚
                        </div>
                        <h3 style={styles.featureTitle}>Comprehensive Courses</h3>
                        <p style={styles.featureDescription}>Access a wide range of courses designed for professional development and skill enhancement.</p>
                    </div>
                    
                    {/* Feature 2 */}
                    <div style={styles.featureCard}>
                        <div style={styles.featureIcon}>
                            📊
                        </div>
                        <h3 style={styles.featureTitle}>Progress Tracking</h3>
                        <p style={styles.featureDescription}>Monitor learning progress with detailed analytics and performance metrics.</p>
                    </div>
                    
                    {/* Feature 3 */}
                    <div style={styles.featureCard}>
                        <div style={styles.featureIcon}>
                            🔒
                        </div>
                        <h3 style={styles.featureTitle}>Secure Environment</h3>
                        <p style={styles.featureDescription}>Enterprise-grade security ensuring your data and learning materials remain protected.</p>
                    </div>
                    
                    {/* Feature 4 */}
                    <div style={styles.featureCard}>
                        <div style={styles.featureIcon}>
                            📱
                        </div>
                        <h3 style={styles.featureTitle}>Mobile Compatibility</h3>
                        <p style={styles.featureDescription}>Access your courses and materials on any device, anywhere, anytime.</p>
                    </div>
                    
                    {/* Feature 5 */}
                    <div style={styles.featureCard}>
                        <div style={styles.featureIcon}>
                            🏆
                        </div>
                        <h3 style={styles.featureTitle}>Certification</h3>
                        <p style={styles.featureDescription}>Earn certificates upon course completion to validate your skills and knowledge.</p>
                    </div>
                    
                    {/* Feature 6 */}
                    <div style={styles.featureCard}>
                        <div style={styles.featureIcon}>
                            👥
                        </div>
                        <h3 style={styles.featureTitle}>Collaborative Learning</h3>
                        <p style={styles.featureDescription}>Engage with peers and instructors through discussion forums and group activities.</p>
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
            <footer style={styles.footer}>
                <div style={styles.footerContent}>
                    <div style={styles.footerLogo}>
                        <div style={styles.logo}>
                            <span style={styles.logoText}>S</span>
                        </div>
                        <span style={styles.brandName}>SPEAR LMS</span>
                    </div>
                    <div style={styles.footerLinks}>
                        <a href="#" style={styles.footerLink}>Home</a>
                        <a href="#features" style={styles.footerLink}>Features</a>
                        <a href="#" style={styles.footerLink}>About</a>
                        <a href="#" style={styles.footerLink}>Contact</a>
                        <a href="#" style={styles.footerLink}>Privacy Policy</a>
                        <a href="#" style={styles.footerLink}>Terms of Service</a>
                    </div>
                    <p style={styles.copyright}>© {new Date().getFullYear()} SPEAR LMS. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Landing;
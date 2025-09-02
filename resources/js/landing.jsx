import React from 'react';
import { createRoot } from 'react-dom/client';
import Landing from './react/components/Landing';
// Import CSS at the top level
import '../css/app.css';

// Initialize the landing page
const container = document.getElementById('landing-root');
if (container) {
    const root = createRoot(container);
    root.render(<Landing />);
}

// Service Worker registration for offline capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
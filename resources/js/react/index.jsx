import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import '../../css/app.css';

// Initialize React app
const container = document.getElementById('react-root');
if (container) {
    const root = createRoot(container);
    root.render(<App />);
}
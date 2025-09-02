import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
// Remove tailwindcss import as it's not needed with PostCSS config

export default defineConfig({
    plugins: [
        react({
            jsxRuntime: 'classic'
        }),
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.js', 'resources/js/react/index.jsx', 'resources/js/landing.jsx'],
            refresh: true,
        }),
    ],
    resolve: {
        alias: {
            '@': '/resources/js',
        },
    },
});

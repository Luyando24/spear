<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    
    <title>{{ config('app.name', 'SPEAR LMS') }} - Strategic Personnel Education & Resource</title>
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700" rel="stylesheet" />
    
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="{{ asset('favicon.ico') }}">
    
    <!-- Meta Tags for SEO -->
    <meta name="description" content="SPEAR LMS - Strategic Personnel Education & Resource Learning Management System. Comprehensive professional development platform designed for organizational excellence.">
    <meta name="keywords" content="learning management system, professional development, training, education, strategic personnel">
    <meta name="author" content="SPEAR LMS">
    
    <!-- Open Graph Meta Tags -->
    <meta property="og:title" content="SPEAR LMS - Strategic Personnel Education & Resource">
    <meta property="og:description" content="Comprehensive learning management system designed for strategic personnel development and operational excellence.">
    <meta property="og:type" content="website">
    <meta property="og:url" content="{{ url('/') }}">
    <meta property="og:image" content="{{ asset('images/logo.png') }}">
    
    <!-- Twitter Card Meta Tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="SPEAR LMS - Strategic Personnel Education & Resource">
    <meta name="twitter:description" content="Comprehensive learning management system designed for strategic personnel development and operational excellence.">
    <meta name="twitter:image" content="{{ asset('images/logo.png') }}">
    
    <!-- Styles -->
    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/landing.jsx'])
    
    <!-- Direct CSS link for testing -->
    <link rel="stylesheet" href="{{ asset('css/test-styles.css') }}">
    
    <!-- Ensure Tailwind is loaded -->
    <script>
        // Force a CSS refresh
        document.addEventListener('DOMContentLoaded', function() {
            // This helps ensure styles are applied
            document.body.classList.add('font-sans');
            document.body.classList.add('antialiased');
        });
    </script>
</head>
<body class="font-sans antialiased">
    <div id="landing-root"></div>
    
    <!-- Scripts -->
    <script>
        // Global configuration for the landing page
        window.spearConfig = {
            appName: '{{ config('app.name', 'SPEAR LMS') }}',
            appUrl: '{{ config('app.url') }}',
            loginUrl: '{{ route('login') }}',
            registerUrl: '{{ route('register') }}',
            csrfToken: '{{ csrf_token() }}'
        };
    </script>
</body>
</html>
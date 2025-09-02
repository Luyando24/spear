<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('landing');
})->name('landing');

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::get('/dashboard', function () {
        return view('react-app');
    })->name('dashboard');
    
    // Catch-all route for React Router (SPA)
    Route::get('/{path?}', function () {
        return view('react-app');
    })->where('path', '.*')->name('react-app');
});

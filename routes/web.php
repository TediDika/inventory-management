<?php

use App\Http\Controllers\ProductsController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// If already logged in, and you try to access log in page, redirect to dashboard
Route::redirect('/', '/dashboard');

Route::middleware(['auth', 'verified'])->group(function() {
    Route::get("/dashboard", [ProductsController::class, "myProducts"])
        ->name("dashboard");
    Route::resource('products', ProductsController::class);
    Route::resource('user', UserController::class);

});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

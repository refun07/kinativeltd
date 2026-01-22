<?php

use App\Http\Controllers\Auth\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/refresh', [AuthController::class, 'refresh']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/user', [AuthController::class, 'user']);
    });
});

Route::post('/contact', [\App\Http\Controllers\ContactController::class, 'submit']);

// Public Content API (no auth required)
Route::prefix('content')->group(function () {
    Route::get('/hero-slides', [\App\Http\Controllers\ContentController::class, 'heroSlides']);
    Route::get('/services', [\App\Http\Controllers\ContentController::class, 'services']);
    Route::get('/case-studies', [\App\Http\Controllers\ContentController::class, 'caseStudies']);
    Route::get('/case-studies/{slugOrId}', [\App\Http\Controllers\ContentController::class, 'caseStudy']);
    Route::get('/team-members', [\App\Http\Controllers\ContentController::class, 'teamMembers']);
    Route::get('/stats', [\App\Http\Controllers\ContentController::class, 'stats']);
    Route::get('/client-logos', [\App\Http\Controllers\ContentController::class, 'clientLogos']);
    Route::get('/page-sections', [\App\Http\Controllers\ContentController::class, 'pageSections']);
});

// Admin routes
Route::prefix('admin')->middleware(['auth:sanctum', \App\Http\Middleware\IsAdmin::class])->group(function () {
    // File uploads
    Route::post('/upload', [\App\Http\Controllers\AdminUploadController::class, 'upload']);
    Route::get('/uploads', [\App\Http\Controllers\AdminUploadController::class, 'index']);
    Route::delete('/upload/{id}', [\App\Http\Controllers\AdminUploadController::class, 'destroy']);

    // CMS Resources
    Route::apiResource('hero-slides', \App\Http\Controllers\Admin\HeroSlideController::class);
    Route::post('hero-slides/update-order', [\App\Http\Controllers\Admin\HeroSlideController::class, 'updateOrder']);

    Route::apiResource('services', \App\Http\Controllers\Admin\ServiceController::class);
    Route::apiResource('case-studies', \App\Http\Controllers\Admin\CaseStudyController::class);
    Route::apiResource('team-members', \App\Http\Controllers\Admin\TeamMemberController::class);
    Route::apiResource('stats', \App\Http\Controllers\Admin\StatController::class);
    Route::apiResource('client-logos', \App\Http\Controllers\Admin\ClientLogoController::class);
    Route::apiResource('page-sections', \App\Http\Controllers\Admin\PageSectionController::class);
});


<?php
// app/Http/Controllers/Admin/DashboardController.php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\AuditLog;
use App\Models\Project;
use App\Models\SocialContent;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $stats = [
            'articles_count' => Article::count(),
            'published_articles' => Article::published()->count(),
            'projects_count' => Project::count(),
            'social_contents_count' => SocialContent::active()->count(),
        ];

        $recentActivities = AuditLog::with('user')
            ->latest()
            ->take(10)
            ->get();

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'recentActivities' => $recentActivities
        ]);
    }
}
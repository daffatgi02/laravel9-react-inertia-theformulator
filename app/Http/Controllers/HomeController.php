<?php
// app/Http/Controllers/HomeController.php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\CmsSection;
use App\Models\Project;
use App\Models\SeoSetting;
use App\Models\SocialContent;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        // Get all active CMS sections
        $heroSection = CmsSection::getByKey('hero');
        $articlesSection = CmsSection::getByKey('articles');
        $socialSection = CmsSection::getByKey('social_media');
        $projectsSection = CmsSection::getByKey('projects');

        // Get content data
        $articles = Article::published()->ordered()->take(6)->get();
        $projects = Project::featured()->ordered()->take(4)->get();
        $socialContents = SocialContent::active()->ordered()->take(6)->get();
        
        // Get SEO settings
        $seoSettings = SeoSetting::getByPage('home');

        return Inertia::render('Home/Index', [
            'seoSettings' => $seoSettings,
            'heroSection' => $heroSection,
            'articlesSection' => $articlesSection,
            'socialSection' => $socialSection,
            'projectsSection' => $projectsSection,
            'articles' => $articles,
            'projects' => $projects,
            'socialContents' => $socialContents
        ]);
    }

    public function articleDetail($slug): Response
    {
        $article = Article::where('slug', $slug)->published()->firstOrFail();
        
        $seoSettings = SeoSetting::getByPage('article') ?? new SeoSetting();
        
        // Override with article-specific SEO if available
        if ($article->seo_data) {
            $seoSettings->meta_title = $article->seo_data['meta_title'] ?? $article->title;
            $seoSettings->meta_description = $article->seo_data['meta_description'] ?? $article->excerpt;
        }

        return Inertia::render('Home/ArticleDetail', [
            'article' => $article,
            'seoSettings' => $seoSettings
        ]);
    }

    public function projectDetail($slug): Response
    {
        $project = Project::where('slug', $slug)->firstOrFail();
        
        $seoSettings = SeoSetting::getByPage('project') ?? new SeoSetting();

        return Inertia::render('Home/ProjectDetail', [
            'project' => $project,
            'seoSettings' => $seoSettings
        ]);
    }
}
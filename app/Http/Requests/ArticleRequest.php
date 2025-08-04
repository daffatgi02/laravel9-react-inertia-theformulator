<?php
// app/Http/Requests/ArticleRequest.php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ArticleRequest extends FormRequest
{
    public function authorize()
    {
        return auth()->user()->isAdmin();
    }

    public function rules()
    {
        $rules = [
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255',
            'excerpt' => 'required|string',
            'content' => 'required|string',
            'featured_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'gallery.*' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'status' => 'required|in:draft,published',
            'published_at' => 'nullable|date',
            'sort_order' => 'integer|min:0',
            'seo_data' => 'nullable|array',
            'seo_data.meta_title' => 'nullable|string|max:255',
            'seo_data.meta_description' => 'nullable|string|max:500',
            'seo_data.meta_keywords' => 'nullable|string'
        ];

        // For update, ignore current record for unique validation
        if ($this->isMethod('PUT') || $this->isMethod('PATCH')) {
            $rules['slug'] .= 'unique:articles,slug,' . $this->route('article');
        } else {
            $rules['slug'] .= '|unique:articles,slug';
        }

        return $rules;
    }

    public function messages()
    {
        return [
            'title.required' => 'Title is required',
            'excerpt.required' => 'Excerpt is required',
            'content.required' => 'Content is required',
            'featured_image.image' => 'Featured image must be an image file',
            'featured_image.max' => 'Featured image must not exceed 2MB',
            'status.in' => 'Status must be either draft or published'
        ];
    }
}
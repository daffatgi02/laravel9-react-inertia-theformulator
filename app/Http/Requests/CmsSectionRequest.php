<?php
// app/Http/Requests/CmsSectionRequest.php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CmsSectionRequest extends FormRequest
{
    public function authorize()
    {
        return auth()->user()->isAdmin();
    }

    public function rules()
    {
        $rules = [
            'section_key' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'content' => 'required|array',
            'is_active' => 'boolean',
            'sort_order' => 'integer|min:0',
            'seo_data' => 'nullable|array'
        ];

        // For update, ignore current record for unique validation
        if ($this->isMethod('PUT') || $this->isMethod('PATCH')) {
            $rules['section_key'] .= ',section_key,' . $this->route('cms_section');
        } else {
            $rules['section_key'] .= '|unique:cms_sections,section_key';
        }

        return $rules;
    }

    public function messages()
    {
        return [
            'section_key.required' => 'Section key is required',
            'section_key.unique' => 'Section key already exists',
            'title.required' => 'Title is required',
            'content.required' => 'Content is required',
            'content.array' => 'Content must be in valid format'
        ];
    }
}
<?php
// app/Models/SocialContent.php

namespace App\Models;

use App\Traits\Auditable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SocialContent extends Model
{
    use HasFactory, Auditable;

    protected $fillable = [
        'platform',
        'title',
        'description',
        'video_url',
        'thumbnail',
        'embed_code',
        'is_active',
        'sort_order'
    ];

    protected $casts = [
        'is_active' => 'boolean'
    ];

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order')->orderBy('created_at', 'desc');
    }

    public function scopePlatform($query, $platform)
    {
        return $query->where('platform', $platform);
    }
}
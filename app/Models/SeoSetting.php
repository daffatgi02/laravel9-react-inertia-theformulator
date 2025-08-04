<?php
// app/Models/SeoSetting.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SeoSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'page',
        'meta_title',
        'meta_description',
        'meta_keywords',
        'og_title',
        'og_description',
        'og_image',
        'structured_data'
    ];

    protected $casts = [
        'structured_data' => 'array'
    ];

    public static function getByPage($page)
    {
        return static::where('page', $page)->first();
    }
}
<?php
// database/migrations/2025_08_04_080000_create_cms_sections_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('cms_sections', function (Blueprint $table) {
            $table->id();
            $table->string('section_key')->unique(); // hero, articles, social_media, projects
            $table->string('title');
            $table->json('content'); // flexible json content
            $table->boolean('is_active')->default(true);
            $table->integer('sort_order')->default(0);
            $table->json('seo_data')->nullable(); // meta title, description, keywords
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('cms_sections');
    }
};
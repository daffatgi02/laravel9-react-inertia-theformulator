<?php
// database/migrations/2025_08_04_080004_create_seo_settings_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('seo_settings', function (Blueprint $table) {
            $table->id();
            $table->string('page')->unique(); // home, about, contact, etc
            $table->string('meta_title');
            $table->text('meta_description');
            $table->text('meta_keywords')->nullable();
            $table->text('og_title')->nullable();
            $table->text('og_description')->nullable();
            $table->string('og_image')->nullable();
            $table->text('structured_data')->nullable(); // JSON-LD
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('seo_settings');
    }
};
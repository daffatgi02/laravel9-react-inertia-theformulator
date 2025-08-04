<?php
// database/migrations/2025_08_04_080002_create_projects_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description');
            $table->string('featured_image')->nullable();
            $table->text('gallery')->nullable();
            $table->string('project_url')->nullable();
            $table->string('category')->nullable();
            $table->text('technologies')->nullable(); // array of tech used
            $table->string('status')->default('completed'); // ongoing, completed, paused
            $table->boolean('is_featured')->default(false);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('projects');
    }
};
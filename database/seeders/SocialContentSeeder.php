<?php
// database/seeders/SocialContentSeeder.php

namespace Database\Seeders;

use App\Models\SocialContent;
use Illuminate\Database\Seeder;

class SocialContentSeeder extends Seeder
{
    public function run()
    {
        $socialContents = [
            [
                'platform' => 'youtube',
                'title' => 'Tutorial Formulasi Serum Vitamin C di Rumah',
                'description' => 'Step by step membuat serum vitamin C yang stabil dengan bahan-bahan yang mudah didapat.',
                'video_url' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                'thumbnail' => '/images/social/youtube-vitamin-c.jpg',
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'platform' => 'youtube', 
                'title' => 'Mengenal Bahan Aktif dalam Skincare Korea',
                'description' => 'Review mendalam tentang bahan aktif populer dalam skincare Korea dan cara formulasinya.',
                'video_url' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                'thumbnail' => '/images/social/youtube-korean-skincare.jpg',
                'is_active' => true,
                'sort_order' => 2,
            ],
            [
                'platform' => 'tiktok',
                'title' => 'Fakta atau Mitos: Skincare Edition',
                'description' => 'Membongkar mitos-mitos seputar skincare dari perspektif formulator professional.',
                'video_url' => 'https://www.tiktok.com/@theformulator/video/1234567890',
                'thumbnail' => '/images/social/tiktok-myths.jpg',
                'is_active' => true,
                'sort_order' => 3,
            ],
            [
                'platform' => 'tiktok',
                'title' => 'DIY Face Mask Natural Ingredients',
                'description' => 'Cara membuat face mask alami dengan bahan dari dapur yang aman dan efektif.',
                'video_url' => 'https://www.tiktok.com/@theformulator/video/1234567891',
                'thumbnail' => '/images/social/tiktok-diy-mask.jpg',
                'is_active' => true,
                'sort_order' => 4,
            ],
            [
                'platform' => 'instagram',
                'title' => 'Behind The Scenes: Lab Formulation',
                'description' => 'Sneak peek ke dalam proses formulasi produk skincare di laboratory.',
                'video_url' => 'https://www.instagram.com/p/ABC123/',
                'thumbnail' => '/images/social/instagram-lab.jpg',
                'is_active' => true,
                'sort_order' => 5,
            ],
            [
                'platform' => 'instagram',
                'title' => 'Ingredient Spotlight: Hyaluronic Acid',
                'description' => 'Deep dive ke dalam hyaluronic acid: jenis, manfaat, dan cara penggunaan yang tepat.',
                'video_url' => 'https://www.instagram.com/p/DEF456/',
                'thumbnail' => '/images/social/instagram-hyaluronic.jpg',
                'is_active' => true,
                'sort_order' => 6,
            ]
        ];

        foreach ($socialContents as $content) {
            SocialContent::create($content);
        }
    }
}
<?php
// database/seeders/ArticleSeeder.php

namespace Database\Seeders;

use App\Models\Article;
use Illuminate\Database\Seeder;

class ArticleSeeder extends Seeder
{
    public function run()
    {
        $articles = [
            [
                'title' => 'Manfaat Ekstrak Centella Asiatica untuk Kulit Sensitif',
                'slug' => 'manfaat-ekstrak-centella-asiatica-untuk-kulit-sensitif',
                'excerpt' => 'Centella Asiatica atau cica telah terbukti secara ilmiah memiliki khasiat luar biasa untuk menenangkan dan memperbaiki kulit sensitif.',
                'content' => '<p>Centella Asiatica, yang juga dikenal sebagai "cica", adalah tanaman herbal yang telah digunakan selama berabad-abad dalam pengobatan tradisional Asia.</p><p>Kandungan aktif utama dalam Centella Asiatica meliputi:</p><ul><li>Asiaticosides - untuk regenerasi sel</li><li>Madecassosides - anti-inflamasi</li><li>Asiatic acid - antioksidan</li><li>Madecassic acid - penyembuhan luka</li></ul>',
                'featured_image' => '/images/articles/centella-asiatica.jpg',
                'status' => 'published',
                'published_at' => now(),
                'sort_order' => 1,
            ],
            [
                'title' => 'Formulasi Serum Vitamin C yang Stabil dan Efektif',
                'slug' => 'formulasi-serum-vitamin-c-yang-stabil-dan-efektif',
                'excerpt' => 'Rahasia membuat serum vitamin C yang tidak mudah teroksidasi dan tetap memberikan manfaat maksimal untuk kulit.',
                'content' => '<p>Vitamin C adalah salah satu bahan aktif terpopuler dalam skincare, namun juga salah satu yang paling challenging untuk diformulasikan.</p><p>Tips formulasi vitamin C yang stabil:</p><ul><li>Gunakan pH antara 3.0-4.0</li><li>Tambahkan vitamin E sebagai stabilizer</li><li>Hindari exposure cahaya dan udara</li><li>Gunakan packaging airless</li></ul>',
                'featured_image' => '/images/articles/vitamin-c-serum.jpg',
                'status' => 'published',
                'published_at' => now()->subDays(1),
                'sort_order' => 2,
            ],
            [
                'title' => 'Tren Sustainable Beauty: Green Chemistry dalam Kosmetik',
                'slug' => 'tren-sustainable-beauty-green-chemistry-dalam-kosmetik',
                'excerpt' => 'Era baru industri kosmetik yang mengutamakan sustainability dan green chemistry untuk masa depan yang lebih hijau.',
                'content' => '<p>Green chemistry dalam kosmetik tidak hanya tentang menggunakan bahan natural, tetapi juga tentang proses produksi yang ramah lingkungan.</p><p>Prinsip green chemistry:</p><ul><li>Prevent waste generation</li><li>Use renewable feedstocks</li><li>Reduce energy consumption</li><li>Design biodegradable products</li></ul>',
                'featured_image' => '/images/articles/green-chemistry.jpg',
                'status' => 'published',
                'published_at' => now()->subDays(2),
                'sort_order' => 3,
            ]
        ];

        foreach ($articles as $article) {
            Article::create($article);
        }
    }
}
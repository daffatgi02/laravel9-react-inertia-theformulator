<?php
// database/seeders/CmsSectionSeeder.php

namespace Database\Seeders;

use App\Models\CmsSection;
use Illuminate\Database\Seeder;

class CmsSectionSeeder extends Seeder
{
    public function run()
    {
        $sections = [
            [
                'section_key' => 'hero',
                'title' => 'Hero Section',
                'content' => [
                    'name' => 'Jose Asmodeus',
                    'title' => 'The Formulator - CEO & Founder',
                    'photo' => '/images/jose.jpg',
                    'what' => 'Saya adalah seorang formulator berpengalaman yang mengkhususkan diri dalam pengembangan produk herbal dan natural skincare.',
                    'who' => 'Dengan latar belakang ilmu kimia dan pengalaman 10+ tahun di industri kosmetik.',
                    'when' => 'Memulai perjalanan sejak 2014 dan terus berinovasi hingga sekarang.',
                    'where' => 'Berbasis di Jakarta, Indonesia, melayani klien domestik dan internasional.',
                    'why' => 'Berkomitmen untuk menciptakan produk yang aman, efektif, dan berkelanjutan untuk kesehatan dan kecantikan.',
                    'how' => 'Menggunakan pendekatan ilmiah dan riset mendalam untuk setiap formulasi produk.'
                ],
                'is_active' => true,
                'sort_order' => 1
            ],
            [
                'section_key' => 'articles',
                'title' => 'Artikel Herbal',
                'content' => [
                    'heading' => 'Artikel & Insight Herbal',
                    'subtitle' => 'Temukan pengetahuan mendalam tentang dunia herbal dan formulasi natural',
                    'description' => 'Koleksi artikel terpilih yang membahas berbagai aspek formulasi herbal, tren industri, dan tips praktis untuk pengembangan produk natural.'
                ],
                'is_active' => true,
                'sort_order' => 2
            ],
            [
                'section_key' => 'social_media',
                'title' => 'Social Media Content',
                'content' => [
                    'heading' => 'Konten & Testimoni',
                    'subtitle' => 'Lihat konten terbaru dan testimoni dari berbagai platform social media',
                    'description' => 'Cuplikan video edukasi, review produk, dan testimoni dari YouTube dan TikTok.'
                ],
                'is_active' => true,
                'sort_order' => 3
            ],
            [
                'section_key' => 'projects',
                'title' => 'Our Projects',
                'content' => [
                    'heading' => 'Proyek & Portfolio',
                    'subtitle' => 'Showcase proyek-proyek formulasi yang telah diselesaikan',
                    'description' => 'Berbagai project formulasi mulai dari skincare, supplement, hingga produk herbal yang telah berhasil diluncurkan ke pasar.'
                ],
                'is_active' => true,
                'sort_order' => 4
            ]
        ];

        foreach ($sections as $section) {
            CmsSection::create($section);
        }
    }
}
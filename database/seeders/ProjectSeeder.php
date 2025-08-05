<?php
// database/seeders/ProjectSeeder.php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    public function run()
    {
        $projects = [
            [
                'title' => 'Acne Treatment Gel dengan Tea Tree Oil',
                'slug' => 'acne-treatment-gel-dengan-tea-tree-oil',
                'description' => 'Formulasi gel anti-acne dengan kombinasi tea tree oil, niacinamide, dan salicylic acid untuk mengatasi jerawat secara efektif tanpa membuat kulit kering.',
                'featured_image' => '/images/projects/acne-gel.jpg',
                'category' => 'Skincare',
                'technologies' => ['Tea Tree Oil', 'Niacinamide', 'Salicylic Acid', 'Hyaluronic Acid'],
                'status' => 'completed',
                'is_featured' => true,
                'sort_order' => 1,
            ],
            [
                'title' => 'Brightening Serum dengan Alpha Arbutin',
                'slug' => 'brightening-serum-dengan-alpha-arbutin',
                'description' => 'Serum pencerah yang menggabungkan alpha arbutin, vitamin C, dan kojic acid untuk mengatasi hiperpigmentasi dan dark spot.',
                'featured_image' => '/images/projects/brightening-serum.jpg',
                'category' => 'Skincare',
                'technologies' => ['Alpha Arbutin', 'Vitamin C', 'Kojic Acid', 'Ferulic Acid'],
                'status' => 'completed',
                'is_featured' => true,
                'sort_order' => 2,
            ],
            [
                'title' => 'Anti-Aging Night Cream dengan Retinol',
                'slug' => 'anti-aging-night-cream-dengan-retinol',
                'description' => 'Night cream yang diformulasikan khusus dengan retinol stabilized, peptides, dan ceramide untuk regenerasi kulit malam hari.',
                'featured_image' => '/images/projects/night-cream.jpg',
                'category' => 'Skincare',
                'technologies' => ['Retinol', 'Peptides', 'Ceramide', 'Squalane'],
                'status' => 'completed',
                'is_featured' => true,
                'sort_order' => 3,
            ],
            [
                'title' => 'Herbal Supplement untuk Immune Booster',
                'slug' => 'herbal-supplement-untuk-immune-booster',
                'description' => 'Formulasi suplemen herbal dengan kombinasi echinacea, elderberry, dan zinc untuk meningkatkan sistem imun tubuh.',
                'featured_image' => '/images/projects/immune-supplement.jpg',
                'category' => 'Supplement',
                'technologies' => ['Echinacea', 'Elderberry', 'Zinc', 'Vitamin D3'],
                'status' => 'completed',
                'is_featured' => true,
                'sort_order' => 4,
            ]
        ];

        foreach ($projects as $project) {
            Project::create($project);
        }
    }
}
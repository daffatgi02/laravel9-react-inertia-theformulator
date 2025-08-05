<?php
// database/seeders/AdminSeeder.php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    public function run()
    {
        $admins = [
            [
                'name' => 'Jose Asmodeus',
                'email' => 'jose@theformulator.com',
                'email_verified_at' => now(),
                'password' => Hash::make('admin123'),
                'role' => 'admin'
            ],
            [
                'name' => 'Admin The Formulator',
                'email' => 'daffatgi02@gmail.com',
                'email_verified_at' => now(),
                'password' => Hash::make('daffa123'),
                'role' => 'admin'
            ],
            [
                'name' => 'Content Manager',
                'email' => 'content@theformulator.com',
                'email_verified_at' => now(),
                'password' => Hash::make('admin123'),
                'role' => 'admin'
            ]
        ];

        foreach ($admins as $admin) {
            User::updateOrCreate(
                ['email' => $admin['email']], // Cek berdasarkan email
                $admin // Data yang akan di-update/create
            );
        }
    }
}
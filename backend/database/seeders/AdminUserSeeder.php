<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\User::create([
            'name' => 'Admin User',
            'email' => 'admin@kinative.com',
            'password' => \Illuminate\Support\Facades\Hash::make('Admin@123'),
            'is_admin' => true,
        ]);

        echo "Admin user created successfully!\n";
        echo "Email: admin@kinative.com\n";
        echo "Password: Admin@123\n";
    }
}

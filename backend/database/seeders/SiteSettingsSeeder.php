<?php

namespace Database\Seeders;

use App\Models\SiteSetting;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SiteSettingsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $settings = [
            // Contact Info
            ['key' => 'contact_email', 'value' => 'azmirkinative@gmail.com', 'group' => 'contact', 'type' => 'text'],
            ['key' => 'contact_phone', 'value' => '+8801921805176', 'group' => 'contact', 'type' => 'text'],
            ['key' => 'contact_address', 'value' => 'House 1188, Avenue 11, Mirpur DOHS, Dhaka', 'group' => 'contact', 'type' => 'text'],

            // Social Links
            ['key' => 'social_facebook', 'value' => 'https://www.facebook.com/kinatives', 'group' => 'social', 'type' => 'text'],
            ['key' => 'social_linkedin', 'value' => 'https://www.linkedin.com/company/kinative/', 'group' => 'social', 'type' => 'text'],
            ['key' => 'social_twitter', 'value' => '#', 'group' => 'social', 'type' => 'text'],
            ['key' => 'social_instagram', 'value' => '#', 'group' => 'social', 'type' => 'text'],

            // Home Page
            ['key' => 'home_hero_title', 'value' => 'INNOVATIVE SOLUTIONS FOR YOUR BUSINESS', 'group' => 'home', 'type' => 'text'],
            ['key' => 'home_hero_desc', 'value' => 'Founded in 2018, we have built a reputation for excellence...', 'group' => 'home', 'type' => 'text'],
        ];

        foreach ($settings as $setting) {
            SiteSetting::updateOrCreate(
                ['key' => $setting['key']],
                $setting
            );
        }
    }
}

<?php

namespace Database\Seeders;

use App\Models\HeroSlide;
use App\Models\Service;
use App\Models\CaseStudy;
use App\Models\Stat;
use App\Models\ClientLogo;
use App\Models\PageSection;
use App\Models\TeamMember;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CMSContentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Clear existing content
        HeroSlide::truncate();
        Service::truncate();
        Stat::truncate();
        CaseStudy::truncate();
        TeamMember::truncate();
        ClientLogo::truncate();
        PageSection::truncate();

        // 1. Stats Seeder (Home Page)
        $this->seedStats();

        // 2. Services Seeder
        $this->seedServices();

        // 3. Hero Slides Seeder
        $this->seedHeroSlides();

        // 4. Case Studies Seeder
        $this->seedCaseStudies();

        // 5. Client Logos Seeder
        $this->seedClientLogos();

        // 6. Team Members Seeder
        $this->seedTeamMembers();

        // 7. Page Sections Seeder
        $this->seedPageSections();
    }

    private function seedStats()
    {
        $stats = [
            ['value' => '300+', 'label' => 'Project Completed', 'order' => 1],
            ['value' => '250+', 'label' => 'Fully Satisfied Clients', 'order' => 2],
            ['value' => '7+', 'label' => 'Years Experience', 'order' => 3],
            ['value' => '5+', 'label' => 'Country Operation', 'order' => 4],
        ];

        foreach ($stats as $stat) {
            Stat::create([
                'value' => $stat['value'],
                'label' => $stat['label'],
                'page' => 'home',
                'order' => $stat['order'],
                'is_active' => true,
            ]);
        }
    }

    private function seedServices()
    {
        $services = [
            [
                'identifier' => '01',
                'title' => 'Web Design & Development',
                'description' => 'Crafting beautiful, high-performance websites and web applications tailored to your business needs.',
                'icon' => 'Monitor',
                'category' => 'expertise',
                'order' => 1
            ],
            [
                'identifier' => '02',
                'title' => 'UI/UX Strategy',
                'description' => 'User-centric design that focuses on creating seamless experiences across all digital touchpoints.',
                'icon' => 'Zap',
                'category' => 'expertise',
                'order' => 2
            ],
            [
                'identifier' => '03',
                'title' => 'Product Engineering',
                'description' => 'End-to-end product development, from conceptualization to deployment and scaling.',
                'icon' => 'Box',
                'category' => 'expertise',
                'order' => 3
            ],
            [
                'identifier' => '04',
                'title' => 'AI & Automation',
                'description' => 'Integrating smart solutions into your workflows to save time and increase productivity.',
                'icon' => 'Database',
                'category' => 'expertise',
                'order' => 4
            ],
            [
                'identifier' => '05',
                'title' => 'Brand Identity',
                'description' => 'Everything from logos to full brand style guides that resonate with your target audience.',
                'icon' => 'Folder',
                'category' => 'expertise',
                'order' => 5
            ],
            [
                'identifier' => '06',
                'title' => 'Content Strategy',
                'description' => 'Driving engagement through high-quality visual and written content that tells your story.',
                'icon' => 'FileText',
                'category' => 'expertise',
                'order' => 6
            ],
            [
                'identifier' => '07',
                'title' => 'Custom Software',
                'description' => 'Tailor-made software solutions designed to solve complex business challenges.',
                'icon' => 'Code',
                'category' => 'expertise',
                'order' => 7
            ],
            [
                'identifier' => '08',
                'title' => 'Mobile Applications',
                'description' => 'High-performance iOS and Android apps built with modern frameworks.',
                'icon' => 'Smartphone',
                'category' => 'expertise',
                'order' => 8
            ],
            [
                'identifier' => '09',
                'title' => 'Global SEO',
                'description' => 'Dominating search results globally with our advanced SEO strategies and systems.',
                'icon' => 'Globe',
                'category' => 'expertise',
                'order' => 9
            ],
        ];

        foreach ($services as $service) {
            Service::create([
                'identifier' => $service['identifier'],
                'title' => $service['title'],
                'description' => $service['description'],
                'icon' => $service['icon'],
                'category' => $service['category'],
                'order' => $service['order'],
                'is_active' => true,
            ]);
        }
    }

    private function seedHeroSlides()
    {
        // Add at least one slide for home page
        HeroSlide::create([
            'title' => 'Innovative Digital Solutions',
            'subtitle' => 'Building the Future of Brand & AI',
            'description' => 'We design brands first — then build the software, platforms, and AI-powered experiences that scale them.',
            'button_text' => 'Start Your Project',
            'button_link' => '/contact',
            'background_image' => 'images/hero_bg_1.jpg',
            'page' => 'home',
            'order' => 1,
            'is_active' => true,
        ]);

        HeroSlide::create([
            'title' => 'Data-Driven Performance Marketing',
            'subtitle' => 'Precision Scaling for Modern Brands',
            'description' => 'We combine advanced analytics with creative excellence to deliver marketing campaigns that actually convert and scale your business.',
            'button_text' => 'Explore Growth',
            'button_link' => '/growth-marketing',
            'background_image' => 'images/services_bg.png',
            'page' => 'home',
            'order' => 2,
            'is_active' => true,
        ]);

        HeroSlide::create([
            'title' => 'Premium Content Production',
            'subtitle' => 'Telling Your Brand Story with Impact',
            'description' => 'High-end audio-visuals, product photography, and content strategies designed to build brand authority and engage your audience.',
            'button_text' => 'View Works',
            'button_link' => '/services',
            'background_image' => 'images/team-bg.png',
            'page' => 'home',
            'order' => 3,
            'is_active' => true,
        ]);
    }

    private function seedCaseStudies()
    {
        $projects = [
            [
                'title' => 'BUET IWFM Conference Management',
                'category' => 'Systems',
                'description' => 'A comprehensive platform for managing academic conferences and speaker submissions.',
                'image' => 'images/portfolio_4.png',
                'client' => 'BUET',
                'year' => '2023',
                'is_featured' => true,
                'order' => 1
            ],
            [
                'title' => 'WAC Logistics Corporate Video',
                'category' => 'Production',
                'description' => 'High-end production focused on logistics and global supply chain visibility.',
                'image' => 'images/portfolio_3.jpg',
                'client' => 'WAC Logistics',
                'year' => '2023',
                'is_featured' => true,
                'order' => 2
            ],
            [
                'title' => 'Aftab Safe Food Ecommerce',
                'category' => 'Ecommerce',
                'description' => 'Full-stack e-commerce solution with integrated payment systems and professional product photography.',
                'image' => 'images/portfolio_2.png',
                'client' => 'Aftab Safe Food',
                'year' => '2023',
                'is_featured' => true,
                'order' => 3
            ],
            [
                'title' => 'PropertyPro Real Estate Platform',
                'category' => 'Fintech',
                'description' => 'Fractional property investment platform with real-time analytics and secure transactions.',
                'image' => 'images/portfolio_1.png',
                'client' => 'PropertyPro',
                'year' => '2023',
                'is_featured' => true,
                'order' => 4
            ],
        ];

        foreach ($projects as $project) {
            CaseStudy::create([
                'title' => $project['title'],
                'slug' => Str::slug($project['title']),
                'category' => $project['category'],
                'description' => $project['description'],
                'image' => $project['image'],
                'client' => $project['client'],
                'year' => $project['year'],
                'is_featured' => $project['is_featured'],
                'order' => $project['order'],
            ]);
        }
    }

    private function seedClientLogos()
    {
        $brands = [
            ['name' => 'AFTAB', 'logo_path' => 'images/clients/aftab.png'],
            ['name' => 'BUET', 'logo_path' => 'images/clients/buet.png'],
            ['name' => 'WALTON', 'logo_path' => 'images/clients/walton.png'],
            ['name' => 'SadeeqAgro', 'logo_path' => 'images/clients/sadeeq.png'],
            ['name' => 'UNIQUE', 'logo_path' => 'images/clients/unique.png'],
            ['name' => 'WAC', 'logo_path' => 'images/clients/wac.png'],
            ['name' => 'Fancy', 'logo_path' => 'images/clients/fancy.png'],
            ['name' => 'Lira', 'logo_path' => 'images/clients/lira.png'],
            ['name' => 'Monon', 'logo_path' => 'images/clients/monon.png'],
            ['name' => 'NextGen', 'logo_path' => 'images/clients/nextgen.png'],
            ['name' => 'Pakiza', 'logo_path' => 'images/clients/pakiza.png'],
            ['name' => 'UY Lab', 'logo_path' => 'images/clients/uylab.png'],
        ];

        foreach ($brands as $index => $brand) {
            ClientLogo::create([
                'name' => $brand['name'],
                'logo_path' => $brand['logo_path'],
                'order' => $index + 1,
                'is_active' => true,
            ]);
        }
    }

    private function seedPageSections()
    {
        // Home Marquee/Intro section
        PageSection::create([
            'page' => 'home',
            'section_type' => 'text_block',
            'title' => 'Innovative Intro',
            'content' => [
                'heading' => 'INNOVATIVE SOLUTIONS FOR YOUR BUSINESS',
                'description' => 'Founded in 2018, we have built a reputation for excellence and innovation in the digital marketing space. We pride ourselves on our client-centric approach.',
                'image' => '/images/innovative-k.png',
            ],
            'order' => 1,
            'is_active' => true,
        ]);

        // Home Philosophy section
        PageSection::create([
            'page' => 'home',
            'section_type' => 'text_block',
            'title' => 'Philosophy Section',
            'content' => [
                'heading' => 'Brand-First Design That Scales With AI',
                'subheading' => 'Our Philosophy',
                'description' => 'At Kinative, we believe great products start with a powerful brand. Our approach bridges the gap between high-end design, advanced development, and AI-driven growth.',
            ],
            'order' => 2,
            'is_active' => true,
        ]);

        // Home Brands Heading
        PageSection::create([
            'page' => 'home',
            'section_type' => 'text_block',
            'title' => 'Brands Header',
            'content' => [
                'heading' => 'WE WORKED WITH THE LARGEST BRANDS',
            ],
            'order' => 3,
            'is_active' => true,
        ]);

        // About Hero section
        PageSection::create([
            'page' => 'about',
            'section_type' => 'hero',
            'title' => 'About Hero',
            'content' => [
                'heading' => 'We are Kinative.',
                'description' => 'We design brands first — then build the software, platforms, and AI-powered experiences that scale them.',
            ],
            'order' => 1,
            'is_active' => true,
        ]);

        // Page Sections for E360
        PageSection::create([
            'page' => 'e360',
            'section_type' => 'hero',
            'title' => 'E360 Hero',
            'content' => [
                'heading' => 'আপনার ব্যবসার পূর্ণাঙ্গ ইকোসিস্টেম।',
                'subheading' => 'Enterprise E-commerce Solution',
                'description' => 'Epikcart Enterprise — বাংলাদেশের সবচেয়ে সম্পূর্ণ ই-কমার্স ম্যানেজমেন্ট সিস্টেম। ১২টি আলাদা টুলের বদলে, একটি শক্তিশালী প্ল্যাটফর্ম।',
                'image' => 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2932&auto=format&fit=crop'
            ],
            'order' => 1,
            'is_active' => true,
        ]);

        PageSection::create([
            'page' => 'e360',
            'section_type' => 'feature_grid',
            'title' => 'E360 Performance',
            'content' => [
                'heading' => 'Technology & Performance',
                'items' => [
                    ['title' => 'Laravel & React JS Stack', 'description' => 'Laravel, React JS এবং MySQL DB-এর শক্তিশালী সমন্বয়ে তৈরি হাই-পারফরম্যান্স সিস্টেম।'],
                    ['title' => 'Premium Design', 'description' => 'ট্রেডিশনাল সিস্টেমের বাইরে গিয়ে প্রিমিয়াম এবং কাস্টম ইউজার ইন্টারফেস।'],
                    ['title' => 'Highly Configurable', 'description' => 'যেকোনো ফিচার বা ফাংশনালিটি লারাভেল মডুলার আর্কিটেকচারের মাধ্যমে অ্যাড করার সুবিধা।']
                ]
            ],
            'order' => 2,
            'is_active' => true,
        ]);

        // Page Sections for Growth Marketing
        PageSection::create([
            'page' => 'growth-marketing',
            'section_type' => 'hero',
            'title' => 'Growth Hero',
            'content' => [
                'heading' => 'আপনার ব্যবসার গ্রোথ নিশ্চিত করুন',
                'subheading' => 'Performance Driven',
                'description' => 'আমরা শুধু ট্রাফিক আনি না, আমরা রেভিনিউ বাড়াই। আমাদের ডেটা-ড্রিভেন গ্রোথ মার্কেটিং স্ট্র্যাটেজি আপনার ব্যবসার স্কেলিং এবং সর্বোচ্চ ROI নিশ্চিত করে।',
                'image' => 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2940&auto=format&fit=crop'
            ],
            'order' => 1,
            'is_active' => true,
        ]);

        PageSection::create([
            'page' => 'growth-marketing',
            'section_type' => 'process',
            'title' => 'Growth Process',
            'content' => [
                'heading' => 'How We Work',
                'items' => [
                    ['step' => '01', 'title' => 'Analysis', 'description' => 'মার্কেট এবং কম্পিটিটর অ্যানালাইসিস।'],
                    ['step' => '02', 'title' => 'Strategy', 'description' => 'কাস্টম গ্রোথ প্ল্যান তৈরি।'],
                    ['step' => '03', 'title' => 'Execution', 'description' => 'ক্যাম্পেইন রান এবং অপ্টিমাইজেশন।'],
                    ['step' => '04', 'title' => 'Scale', 'description' => 'রেজাল্ট মনিটরিং এবং স্কেলিং।']
                ]
            ],
            'order' => 2,
            'is_active' => true,
        ]);

        // Page Sections for Services
        PageSection::create([
            'page' => 'services',
            'section_type' => 'hero',
            'title' => 'Services Hero',
            'content' => [
                'heading' => 'What We Do.',
                'subheading' => 'Comprehensive Solutions',
                'description' => 'From brand identity to enterprise software, we provide full-stack digital solutions that drive growth.'
            ],
            'order' => 1,
            'is_active' => true,
        ]);

        // Page Sections for Contact
        PageSection::create([
            'page' => 'contact',
            'section_type' => 'hero',
            'title' => 'Contact Hero',
            'content' => [
                'heading' => "Let's Build Something Great.",
                'description' => "Ready to take your brand to the next level? Tell us about your project, and let's make it happen."
            ],
            'order' => 1,
            'is_active' => true,
        ]);

        PageSection::create([
            'page' => 'contact',
            'section_type' => 'contact_info',
            'title' => 'Contact Info',
            'content' => [
                'email' => 'kinativesales@gmail.com',
                'phone' => '+88 01921805176',
                'address' => 'Flat C-2, House 1188, Avenue 11, Mirpur DOHS, Dhaka 1216'
            ],
            'order' => 2,
            'is_active' => true,
        ]);

        // SEO Sections for all pages
        $pages = ['home', 'about', 'services', 'e360', 'growth-marketing', 'contact', 'case-studies'];
        foreach ($pages as $page) {
            PageSection::create([
                'page' => $page,
                'section_type' => 'seo',
                'title' => 'SEO Metadata - ' . ucfirst($page),
                'content' => [
                    'title' => 'Kinative | ' . ucfirst($page) . ' - Best Digital Agency in BD, USA & Australia',
                    'description' => 'Kinative is a top-tier digital agency providing Brand Design, Software Development, and AI-driven Growth Marketing in Bangladesh, USA, Melbourne, and globally.',
                    'keywords' => 'digital agency bangladesh, seo melbourne, web development usa, ai marketing global, brand design bd',
                    'og_image' => '/images/og-image.jpg'
                ],
                'order' => 99,
                'is_active' => true,
            ]);
        }
    }

    private function seedTeamMembers()
    {
        $team = [
            ['name' => 'Fahim Morshed', 'position' => 'Founder & CEO', 'image' => 'images/team_1.png', 'order' => 1],
            ['name' => 'Sarah Rahman', 'position' => 'Design Lead', 'image' => 'images/team_2.png', 'order' => 2],
            ['name' => 'Tanvir Ahmed', 'position' => 'Tech Lead', 'image' => 'images/team_3.jpg', 'order' => 3],
            ['name' => 'Arif Hossain', 'position' => 'Senior Developer', 'image' => 'images/team_4.jpg', 'order' => 4],
            ['name' => 'Nusrat Jahan', 'position' => 'UI Designer', 'image' => 'images/team_5.jpg', 'order' => 5],
        ];

        foreach ($team as $member) {
            TeamMember::create([
                'name' => $member['name'],
                'position' => $member['position'],
                'image' => $member['image'],
                'order' => $member['order'],
                'is_active' => true,
            ]);
        }
    }
}

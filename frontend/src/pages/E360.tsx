import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, CheckCircle2, Zap, BarChart3, ArrowRight, ShoppingCart, Database, Users, LineChart, TrendingUp, Truck, FileText, Headphones, Bot, Sliders, Gauge, CheckCircle, Layout, X, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import OperationsSlider from '../components/OperationsSlider';
import AnalyticsSlider from '../components/AnalyticsSlider';
import GrowthSlider from '../components/GrowthSlider';
import TestimonialSlider from '../components/TestimonialSlider';
import SEO from '../components/SEO';
import axios from 'axios';

const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

const E360: React.FC = () => {
    const [seoData, setSeoData] = useState<any>(null);
    const [sections, setSections] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/content/page-sections?page=e360');
                setSections(response.data);
                const seo = response.data.find((section: any) => section.section_type === 'seo');
                if (seo) setSeoData(seo.content);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const hero = sections.find(s => s.section_type === 'hero') || {
        content: {
            heading: 'আপনার ব্যবসার পূর্ণাঙ্গ ইকোসিস্টেম।',
            subheading: 'Enterprise E-commerce Solution',
            description: 'Epikcart Enterprise — বাংলাদেশের সবচেয়ে সম্পূর্ণ ই-কমার্স ম্যানেজমেন্ট সিস্টেম। ১২টি আলাদা টুলের বদলে, একটি শক্তিশালী প্ল্যাটফর্ম।',
            image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2932&auto=format&fit=crop"
        }
    };

    const performance = sections.find(s => s.title === 'E360 Performance') || {
        content: {
            heading: 'Technology & Performance',
            items: [
                { title: 'Laravel & React JS Stack', description: 'Laravel, React JS এবং MySQL DB-এর শক্তিশালী সমন্বয়ে তৈরি হাই-পারফরম্যান্স সিস্টেম।' },
                { title: 'Premium Design', description: 'ট্রেডিশনাল সিস্টেমের বাইরে গিয়ে প্রিমিয়াম এবং কাস্টম ইউজার ইন্টারফেস।' },
                { title: 'Highly Configurable', description: 'যেকোনো ফিচার বা ফাংশনালিটি লারাভেল মডুলার আর্কিটেকচারের মাধ্যমে অ্যাড করার সুবিধা।' }
            ]
        }
    };

    // REPLACE THIS URL WITH YOUR ACTUAL DEMO LINK
    const demoUrl = "https://demo.epikcart.com";

    return (
        <div className="bg-background min-h-screen text-foreground pt-20 font-body transition-colors duration-500">
            <SEO
                title={seoData?.title}
                description={seoData?.description}
                keywords={seoData?.keywords}
                ogImage={seoData?.og_image}
            />
            {/* Floating Demo Button - Sticky */}
            <motion.a
                href={demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 1, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="fixed bottom-8 right-8 z-50 group"
            >
                <div className="relative">
                    <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-75" />
                    <div className="relative px-8 py-4 bg-gradient-to-r from-primary to-red-600 rounded-full shadow-2xl flex items-center gap-3 border-2 border-white/20">
                        <Zap className="w-5 h-5 text-white animate-pulse" />
                        <span className="font-bold text-white uppercase tracking-wider">Live Demo দেখুন</span>
                        <ArrowUpRight className="w-5 h-5 text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </div>
                </div>
            </motion.a>

            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div
                        className="absolute inset-0 bg-cover bg-center opacity-20"
                        style={{ backgroundImage: `url(${hero.content.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-transparent" />
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="max-w-5xl"
                    >
                        <motion.span variants={fadeInUp} className="inline-block px-4 py-2 border border-white/20 rounded-full text-xs font-bold uppercase tracking-widest mb-6 text-primary">
                            {hero.content.subheading}
                        </motion.span>
                        <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-heading font-bold mb-8 leading-tight">
                            {hero.content.heading}
                        </motion.h1>
                        <motion.p variants={fadeInUp} className="text-lg md:text-xl text-gray-400 max-w-3xl mb-12 leading-relaxed">
                            {hero.content.description}
                        </motion.p>
                        <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                            <Link to="/contact" className="group inline-flex items-center gap-4 px-8 py-4 bg-primary text-white rounded-full hover:bg-white hover:text-black transition-all duration-300 uppercase tracking-widest text-sm font-bold">
                                ফ্রি ডেমো বুক করুন <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-[#FF3B1D] to-[#E02E12] rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                                <a
                                    href={demoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#FF3B1D] to-[#E02E12] text-white rounded-full leading-none overflow-hidden transition-transform duration-300 group-hover:scale-105"
                                >
                                    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out skew-x-12" />
                                    <Zap className="w-5 h-5 fill-white text-white" />
                                    <span className="font-bold tracking-widest text-sm">LIVE DEMO</span>
                                    <span className="font-medium text-sm">দেখুন</span>
                                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                                </a>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Social Proof Stats */}
            <section className="py-16 bg-background border-y border-foreground/10">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { number: "1M+", label: "Tested Products" },
                            { number: "1M+", label: "Concurrent Users" },
                            { number: "৳10Cr+", label: "Monthly Revenue" },
                            { number: "99.9%", label: "Uptime" }
                        ].map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center"
                            >
                                <div className="text-4xl md:text-5xl font-heading font-bold text-primary mb-2">{stat.number}</div>
                                <div className="text-sm text-gray-400 uppercase tracking-widest">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Dashboard Showcase Section */}
            <section className="py-32 bg-secondary/30 text-foreground overflow-hidden">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center mb-20"
                    >
                        <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6">
                            আপনার ব্যবসার কন্ট্রোল সেন্টার
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            একটি শক্তিশালী ড্যাশবোর্ড যা আপনাকে দেয় সম্পূর্ণ ব্যবসার রিয়েল-টাইম ওভারভিউ।
                        </p>
                    </motion.div>

                    {/* Authentic Epikcart Dashboard Mockup */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="relative max-w-[1400px] mx-auto shadow-2xl rounded-xl overflow-hidden border border-gray-200"
                    >
                        <img
                            src="/images/dashboard_main.png"
                            alt="Epikcart Admin Dashboard"
                            className="w-full h-auto"
                        />
                    </motion.div>
                </div>
            </section>

            {/* Challenges Section */}
            <section className="py-32 bg-[#0a0a0a] relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/5 opacity-30 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2" />
                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center mb-24"
                    >
                        <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6">
                            কেন <span className="text-primary italic">E360</span> সলিউশন?
                        </h2>
                        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                            বাংলাদেশের ই-কমার্স ইন্ডাস্ট্রির প্রচলিত সমস্যাগুলোর স্থায়ী সমাধান।
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 backdrop-blur-sm self-start"
                        >
                            <h3 className="text-3xl font-heading font-bold mb-10 text-red-500 flex items-center gap-4">
                                <X className="w-8 h-8" /> কমন ইন্ডাস্ট্রি সমস্যা
                            </h3>
                            <div className="space-y-8">
                                {[
                                    { title: "পিক্সেল ডেটা লস", desc: "ডোমেইন ভেরিফিকেশন এবং আইওএস গ্রাফ আপডেট না হলে পিক্সেল ডেটা লস।" },
                                    { title: "মান্থলি সাবস্ক্রিপশন চার্জ", desc: "প্রতি মাসে ভারী সাবস্ক্রিপশন চার্জ এবং অ্যাপ কস্ট যা ব্যবসার জন্য বোঝা।" },
                                    { title: "ওয়ার্ডপ্রেস ও স্লো সাইট", desc: "অতিরিক্ত প্লাগিন ব্যবহারে ওয়েবসাইট স্লো এবং সিকিউরিটি রিস্ক।" },
                                    { title: "ইনভেন্টরি ডি-সিঙ্ক", desc: "অফলাইন এবং অনলাইন স্টকের মধ্যে অমিল যা কাস্টমার এক্সপেরিয়েন্স নষ্ট করে।" },
                                    { title: "লিমিটেড রিলেশনশিপ ম্যানেজমেন্ট", desc: "কাস্টমার ডেটা ট্র্যাক করার অভাব এবং রিপিট সেলস জেনারেট করতে বাধা।" }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4 group">
                                        <div className="w-1.5 h-1.5 rounded-full bg-red-500/50 mt-2 shrink-0 group-hover:bg-red-500 transition-colors" />
                                        <div>
                                            <h4 className="font-bold text-white/80 group-hover:text-white mb-1 transition-colors">{item.title}</h4>
                                            <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-primary/5 border border-primary/20 rounded-[2.5rem] p-10 backdrop-blur-sm shadow-[0_0_50px_rgba(255,59,29,0.1)]"
                        >
                            <h3 className="text-3xl font-heading font-bold mb-10 text-primary flex items-center gap-4">
                                <CheckCircle2 className="w-8 h-8" /> E360 এডভান্সড সলিউশন
                            </h3>
                            <div className="space-y-8">
                                {[
                                    { title: "সার্ভার সাইড ট্র্যাকিং", desc: "GTM এবং ফেইসবুক কনভার্সন এপিআই এর মাধ্যমে ১০০% পিক্সেল ডেটা ট্র্যাকিং।" },
                                    { title: "নো মান্থলি সাবস্ক্রিপশন", desc: "ওয়ান-টাইম ওনারশিপ এবং লাইফটাইম সেটআপ। কোনো বাড়তি মান্থলি চার্জ নেই।" },
                                    { title: "সুপার ফাস্ট পারফরম্যান্স", desc: "লারাভেল এবং রিয়েক্ট জেএস ভিত্তিক আল্ট্রা-ফাস্ট ইকোসিস্টেম এবং পিডব্লিউএ (PWA)।" },
                                    { title: "টোটাল ইনভেন্টরি ও পিওএস (POS)", desc: "অফলাইন ও অনলাইন বিক্রয়ের জন্য সমন্বিত ইনভেন্টরি এবং পিওএস সলিউশন।" },
                                    { title: "ইন-বিল্ট সিআরএম (CRM)", desc: "কাস্টমার লাইফটাইম ভ্যালু বাড়াতে ইন-হাউস সিআরএম এবং অটোমেশন টুলস।" }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4 group">
                                        <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0 animate-pulse" />
                                        <div>
                                            <h4 className="font-bold text-white group-hover:text-primary mb-1 transition-all">{item.title}</h4>
                                            <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Solutions Section */}
            <section className="py-32 bg-background text-foreground relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center mb-20"
                    >
                        <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6">
                            মডার্ন এন্টারপ্রেনারদের জন্য <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                                কমপ্লিট সলিউশন
                            </span>
                        </h2>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            আপনার ই-কমার্স ব্যবসার প্রতিটি চ্যালেঞ্জের স্মার্ট সমাধান।
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 gap-8">
                        {/* 1. Technology & Performance */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 lg:p-12 backdrop-blur-sm hover:bg-white/10 transition-colors"
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-3 bg-blue-500/20 rounded-xl">
                                    <Zap className="w-8 h-8 text-blue-400" />
                                </div>
                                <h3 className="text-3xl font-bold">{performance.content.heading}</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {performance.content.items.map((item: any, i: number) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="mt-1"><Zap className="w-5 h-5 text-blue-400" /></div>
                                        <div>
                                            <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                                            <p className="text-gray-400 text-sm">{item.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Full Width Growth & Marketing Slider */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-16"
                    >
                        <div className="flex items-center gap-4 mb-12">
                            <div className="p-3 bg-red-500/20 rounded-xl">
                                <TrendingUp className="w-8 h-8 text-red-400" />
                            </div>
                            <h3 className="text-3xl md:text-4xl font-heading font-bold">Growth & Marketing</h3>
                        </div>
                        <GrowthSlider />
                    </motion.div>

                    {/* Full Width Operations Slider */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-16"
                    >
                        <div className="flex items-center gap-4 mb-12">
                            <div className="p-3 bg-green-500/20 rounded-xl">
                                <Bot className="w-8 h-8 text-green-400" />
                            </div>
                            <h3 className="text-3xl md:text-4xl font-heading font-bold">Operations & Automation</h3>
                        </div>
                        <OperationsSlider />
                    </motion.div>

                    {/* Full Width Analytics Slider */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-16"
                    >
                        <div className="flex items-center gap-4 mb-12">
                            <div className="p-3 bg-purple-500/20 rounded-xl">
                                <BarChart3 className="w-8 h-8 text-purple-400" />
                            </div>
                            <h3 className="text-3xl md:text-4xl font-heading font-bold">Sales & Analytics</h3>
                        </div>
                        <AnalyticsSlider />
                    </motion.div>
                </div>
            </section>

            {/* Three Demos Section */}
            <section className="py-32 bg-secondary/20">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center mb-20"
                    >
                        <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6 text-foreground">
                            আমাদের ডেমো স্টোরগুলো দেখুন
                        </h2>
                        <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
                            বিভিন্ন ইন্ডাস্ট্রির জন্য তৈরি আমাদের প্রি-বিল্ট ডেমো স্টোরগুলো এক্সপ্লোর করুন।
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
                        {[
                            {
                                title: "Furniture & Decor",
                                description: "আধুনিক ফার্নিচার এবং হোম ডেকোর শপের জন্য মিনিমালিস্ট ডিজাইন।",
                                image: "/images/demos/furniture.png",
                                color: "from-[#EAB308] to-[#CA8A04]",
                                link: "https://furniture-demo.epikcart.com"
                            },
                            {
                                title: "Grocery & Daily Needs",
                                description: "ফ্রেশ গ্রোসারি এবং ডেইলি নিডস এর জন্য ভাইব্রেন্ট এবং ক্লিন লেআউট।",
                                image: "/images/demos/grocery_v2.png",
                                color: "from-[#F97316] to-[#EA580C]",
                                link: "https://grocery-demo.epikcart.com"
                            },
                            {
                                title: "Fashion & Lifestyle",
                                description: "প্রিমিয়াম ফ্যাশন ব্র্যান্ডের জন্য এলিগেন্ট এবং বোল্ড ডিজাইন।",
                                image: "/images/demos/fashion_lifestyle.png",
                                color: "from-[#1F2937] to-[#000000]",
                                link: "https://fashion-demo.epikcart.com"
                            },
                            {
                                title: "Pharmacy & Medicine",
                                description: "অনলাইন ফার্মেসির জন্য ট্রাস্টেড এবং ক্লিন মেডিকেল স্টোর ডিজাইন।",
                                image: "/images/demos/pharmacy.png",
                                color: "from-[#10B981] to-[#059669]",
                                link: "https://pharmacy-demo.epikcart.com"
                            },
                            {
                                title: "Electronics & Gadgets",
                                description: "লেটেস্ট গ্যাজেট এবং ইলেকট্রনিক্স শপের জন্য হাই-টেক ডিজাইন।",
                                image: "/images/demos/electronics_gadgets.png",
                                color: "from-[#3B82F6] to-[#2563EB]",
                                link: "https://electronics-demo.epikcart.com"
                            },
                            {
                                title: "Modern Fashion Store",
                                description: "ট্রেন্ডি ফ্যাশন এবং লাইফস্টাইল ব্র্যান্ডের জন্য মডার্ন ডিজাইন।",
                                image: "/images/demos/modern_fashion.png",
                                color: "from-[#EC4899] to-[#BE185D]",
                                link: "https://modern-fashion.epikcart.com"
                            }
                        ].map((demo, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className="group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100"
                            >
                                <div className="aspect-[4/5] relative overflow-hidden">
                                    <img
                                        src={demo.image}
                                        alt={demo.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className={`absolute inset-0 bg-gradient-to-b ${demo.color} opacity-0 group-hover:opacity-90 transition-opacity duration-500 flex flex-col items-center justify-center p-8 text-center`}>
                                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-6 backdrop-blur-md">
                                            <Zap className="w-8 h-8 text-white animate-pulse" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-4">{demo.title}</h3>
                                        <p className="text-white/90 text-sm mb-8 leading-relaxed">{demo.description}</p>
                                        <a
                                            href={demo.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-8 py-3 bg-white text-black rounded-full font-bold text-sm hover:bg-gray-100 transition-colors"
                                        >
                                            Explore Demo
                                        </a>
                                    </div>
                                </div>
                                <div className="p-8 bg-card group-hover:opacity-0 transition-opacity duration-300">
                                    <h3 className="text-xl font-bold mb-2">{demo.title}</h3>
                                    <p className="text-foreground/60 text-sm">{demo.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Reference Sites Gallery */}
            <section className="py-32 bg-background">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center mb-20"
                    >
                        <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-foreground">
                            সফল ই-কমার্স ব্র্যান্ডসমূহ
                        </h2>
                        <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
                            Epikcart ব্যবহার করে গড়ে তোলা হয়েছে দেশের সব জনপ্রিয় অনলাইন শপ।
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
                        {[
                            { name: "Aftab", logo: "AF", color: "from-blue-500 to-blue-600" },
                            { name: "PropertyPro", logo: "PP", color: "from-emerald-500 to-emerald-600" },
                            { name: "WAC Logistics", logo: "WL", color: "from-indigo-500 to-indigo-600" },
                            { name: "Safe Food", logo: "SF", color: "from-green-500 to-green-600" },
                            { name: "Urban Fashion", logo: "UF", color: "from-pink-500 to-pink-600" },
                            { name: "Tech Hub", logo: "TH", color: "from-blue-600 to-blue-700" },
                            { name: "Green Grocery", logo: "GG", color: "from-green-600 to-green-700" },
                            { name: "Baby Care", logo: "BC", color: "from-pink-400 to-pink-500" }
                        ].map((site, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group p-8 bg-white rounded-[2rem] flex flex-col items-center justify-center gap-6 hover:shadow-2xl transition-all duration-500 border border-gray-100 shadow-sm"
                            >
                                <div className={`w-20 h-20 bg-gradient-to-br ${site.color} rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                                    {site.logo}
                                </div>
                                <span className="font-bold text-gray-900 text-lg">{site.name}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Problem Statement - Visual Comparison */}
            <section id="comparison" className="py-32 bg-background">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="mb-16 text-center"
                    >
                        <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6 leading-tight text-foreground">
                            আপনার ব্যবসা কীভাবে চলছে?
                        </h2>
                        <p className="text-xl text-foreground/60 max-w-2xl mx-auto">
                            অনেক টুল নাকি একটি সিস্টেম? পার্থক্যটা দেখুন।
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-7xl mx-auto">
                        {/* Traditional System - Pain Points */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative group h-full"
                        >
                            <div className="absolute inset-0 bg-red-500/5 rounded-[2.5rem] blur-2xl group-hover:bg-red-500/10 transition-colors duration-500" />
                            <div className="relative h-full p-8 lg:p-12 border border-foreground/5 bg-secondary/50 backdrop-blur-xl rounded-[2.5rem] overflow-hidden">
                                <div className="absolute top-0 right-0 p-8">
                                    <X className="w-12 h-12 text-red-500/20" />
                                </div>
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold uppercase tracking-widest mb-8">
                                    Traditional System
                                </div>
                                <h3 className="text-3xl font-bold mb-8 text-white">১২+ আলাদা টুল ও জটিলতা</h3>
                                <div className="space-y-6">
                                    {[
                                        { title: "অর্ডার ও ইনভেন্টরি", desc: "আলাদা আলাদা সফটওয়্যারে ডেটা এন্ট্রি।" },
                                        { title: "ম্যানুয়াল রিপোর্টিং", desc: "সারাদিন নষ্ট হয় এক্সেল শিট আপডেট করতে।" },
                                        { title: "ডেটা অমিল", desc: "এক টুলের সাথে অন্য টুলের কোনো মিল থাকে না।" },
                                        { title: "স্কেলিং বাধা", desc: "ব্যবসা বাড়লে পুরনো সিস্টেম ভেঙে পড়ে।" }
                                    ].map((item, i) => (
                                        <div key={i} className="flex gap-4 p-4 rounded-2xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                                            <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center shrink-0">
                                                <X className="w-5 h-5 text-red-500" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-lg text-gray-200">{item.title}</h4>
                                                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* Epikcart E360 - Solution */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative group h-full"
                        >
                            <div className="absolute inset-0 bg-primary/10 rounded-[2.5rem] blur-2xl group-hover:bg-primary/20 transition-colors duration-500" />
                            <div className="relative h-full p-8 lg:p-12 border border-primary/20 bg-secondary/80 backdrop-blur-xl rounded-[2.5rem] overflow-hidden shadow-2xl shadow-primary/10">

                                <div className="absolute top-0 right-0 p-8">
                                    <CheckCircle2 className="w-12 h-12 text-primary/20" />
                                </div>
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-white text-xs font-bold uppercase tracking-widest mb-8">
                                    Epikcart E360
                                </div>
                                <h3 className="text-3xl font-bold mb-8 text-white">একটি মাত্র স্মার্ট ইকো-সিস্টেম</h3>
                                <div className="space-y-6">
                                    {[
                                        { title: "অল-ইন-ওয়ান ড্যাশবোর্ড", desc: "অর্ডার থেকে ইনভেন্টরি—সব এক জায়গায়।" },
                                        { title: "১০০% অটোমেশন", desc: "মেশিন প্রিসিশনে অটোমেটেড রিপোর্ট জেনারেশন।" },
                                        { title: "রিয়েল-টাইম এনালিটিক্স", desc: "সঠিক ডেটা দেখে দ্রুত সিদ্ধান্ত নেওয়ার সুবিধা।" },
                                        { title: "আনলিমিটেড স্কেলেবিলিটি", desc: "আপনার ব্যবসার সাথে পাল্লা দিয়ে স্কেল করবে।" }
                                    ].map((item, i) => (
                                        <div key={i} className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/30 transition-all group">
                                            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-lg shadow-primary/20">
                                                <CheckCircle2 className="w-5 h-5 text-white" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-lg text-white">{item.title}</h4>
                                                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-12 p-6 rounded-3xl bg-primary/10 border border-primary/20 text-center">
                                    <p className="text-primary font-bold">৮০% পর্যন্ত টাইম ও কস্ট সেভিং গ্যারান্টিড!</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Trusted Brands Showcase */}
            <section className="py-32 bg-secondary/10 text-foreground">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6 text-foreground">
                            আমাদের ট্রাস্টেড পার্টনার
                        </h2>
                        <p className="text-xl text-foreground/60 max-w-2xl mx-auto">
                            যারা আমাদের উপর আস্থা রেখেছেন
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
                        {[
                            { initials: "AF", name: "Aftab", color: "bg-blue-500" },
                            { initials: "PP", name: "PropertyPro", color: "bg-emerald-500" },
                            { initials: "WL", name: "WAC Logistics", color: "bg-indigo-500" },
                            { initials: "SF", name: "Safe Food", color: "bg-green-500" },
                            { initials: "UF", name: "Urban Fashion", color: "bg-pink-500" },
                            { initials: "TH", name: "Tech Hub", color: "bg-blue-600" },
                            { initials: "GG", name: "Green Grocery", color: "bg-green-600" },
                            { initials: "BC", name: "Baby Care", color: "bg-pink-400" }
                        ].map((brand, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                className="bg-card rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center border border-white/5 group"
                            >
                                <div className={`${brand.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white text-xl font-bold mb-4 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                                    {brand.initials}
                                </div>
                                <h3 className="font-bold text-foreground text-lg">{brand.name}</h3>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Customer Testimonials */}
            <section className="py-32 bg-background text-foreground">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6">
                            কাস্টমারদের মতামত
                        </h2>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            আমাদের সাথে যারা কাজ করছেন, তারা কী বলছেন
                        </p>
                    </motion.div>

                    <TestimonialSlider />
                </div>
            </section>

            {/* Complete System Overview */}
            <section className="py-32 bg-background text-foreground">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-24">
                        <h2 className="text-4xl md:text-6xl font-heading font-bold uppercase mb-6">সম্পূর্ণ সিস্টেম</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                            ১২টি শক্তিশালী মডিউল। একটি প্ল্যাটফর্ম। সম্পূর্ণ কন্ট্রোল।
                        </p>
                        <div className="inline-flex items-center gap-4 px-6 py-3 bg-primary/10 rounded-full">
                            <span className="text-primary font-bold">Dashboard → Analytics → CRM → Orders → POS → Products → Inventory → Resources → Promotions → Shipping → Files → Support</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {[
                            {
                                title: "Dashboard",
                                color: "bg-blue-500",
                                textColor: "text-blue-600",
                                svg: <LineChart className="w-8 h-8 text-white" />
                            },
                            {
                                title: "Analytics",
                                color: "bg-purple-500",
                                textColor: "text-purple-600",
                                svg: <Gauge className="w-8 h-8 text-white" />
                            },
                            {
                                title: "CRM",
                                color: "bg-pink-500",
                                textColor: "text-pink-600",
                                svg: <Users className="w-8 h-8 text-white" />
                            },
                            {
                                title: "Orders",
                                color: "bg-orange-500",
                                textColor: "text-orange-600",
                                svg: <ShoppingCart className="w-8 h-8 text-white" />
                            },
                            {
                                title: "POS Panel",
                                color: "bg-green-500",
                                textColor: "text-green-600",
                                svg: <Layers className="w-8 h-8 text-white" />
                            },
                            {
                                title: "Products",
                                color: "bg-cyan-500",
                                textColor: "text-cyan-600",
                                svg: <Database className="w-8 h-8 text-white" />
                            },
                            {
                                title: "Inventory",
                                color: "bg-emerald-500",
                                textColor: "text-emerald-600",
                                svg: <CheckCircle className="w-8 h-8 text-white" />
                            },
                            {
                                title: "Resources",
                                color: "bg-indigo-500",
                                textColor: "text-indigo-600",
                                svg: <Layout className="w-8 h-8 text-white" />
                            },
                            {
                                title: "Promotions",
                                color: "bg-yellow-500",
                                textColor: "text-yellow-600",
                                svg: <Zap className="w-8 h-8 text-white" />
                            },
                            {
                                title: "Shipping",
                                color: "bg-red-500",
                                textColor: "text-red-600",
                                svg: <Truck className="w-8 h-8 text-white" />
                            },
                            {
                                title: "Files",
                                color: "bg-violet-500",
                                textColor: "text-violet-600",
                                svg: <FileText className="w-8 h-8 text-white" />
                            },
                            {
                                title: "Support",
                                color: "bg-teal-500",
                                textColor: "text-teal-600",
                                svg: <Headphones className="w-8 h-8 text-white" />
                            }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                className="bg-white rounded-[2rem] p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center border border-gray-100 group cursor-pointer"
                            >
                                <div className={`${item.color} w-20 h-20 rounded-[1.5rem] flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                    {item.svg}
                                </div>
                                <h3 className={`font-bold text-lg ${item.textColor}`}>{item.title}</h3>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-16 text-center">
                        <p className="text-2xl font-heading font-bold text-gray-600">
                            + আরও অনেক ফিচার যা আপনার ব্যবসাকে এগিয়ে নিয়ে যাবে
                        </p>
                    </div>
                </div>
            </section>

            {/* Why Choose E360 - Ownership & Customization */}
            <section className="py-32 bg-background text-foreground relative overflow-hidden" >
                {/* Background Gradients */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none" >
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[128px]" />
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[128px]" />
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center mb-20"
                    >
                        <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6">
                            কেন <span className="text-primary">E360</span> সেরা?
                        </h2>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            শুধু একটি সফটওয়্যার নয়, এটি আপনার ব্যবসার পূর্ণাঙ্গ স্বাধীনতা।
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {/* Feature 1: Ownership */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="bg-card border border-foreground/10 rounded-3xl p-10 hover:bg-secondary/40 transition-colors duration-300"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-800 to-black flex items-center justify-center mb-8 shadow-lg shadow-black/50">
                                <Database className="w-8 h-8 text-gray-200" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">আপনার ওয়েবসাইট, আপনার হোস্টিং</h3>
                            <p className="text-gray-400 leading-relaxed">
                                অন্য প্ল্যাটফর্মের মতো মাসিক ভাড়ার ঝামেলা নেই। আপনার নিজস্ব ডোমেইন ও হোস্টিংয়ে সম্পূর্ণ মালিকানা আপনার। ডেটা এবং কাস্টমার বেইস সম্পূর্ণ আপনার নিয়ন্ত্রণে।
                            </p>
                        </motion.div>

                        {/* Feature 2: Customization */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="bg-card border border-foreground/10 rounded-3xl p-10 hover:bg-secondary/40 transition-colors duration-300"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-600 to-red-900 flex items-center justify-center mb-8 shadow-lg shadow-red-900/50">
                                <Sliders className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">যেকোনো কাস্টমাইজেশন</h3>
                            <p className="text-gray-400 leading-relaxed">
                                আপনার ব্যবসার বিশেষ কোনো রিক্রিমেন্ট আছে? আমাদের সিস্টেম সম্পূর্ণ মডুলার। যেকোনো ফিচার বা ফাংশনালিটি অ্যাড করা সম্ভব, তাও ন্যূনতম খরচে।
                            </p>
                        </motion.div>

                        {/* Feature 3: Scalability */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="bg-card border border-foreground/10 rounded-3xl p-10 hover:bg-secondary/40 transition-colors duration-300"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-700 via-gray-900 to-red-900 flex items-center justify-center mb-8 shadow-lg shadow-black/50">
                                <TrendingUp className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">আনলিমিটেড স্কেলেবিলিটি</h3>
                            <p className="text-gray-400 leading-relaxed">
                                আমাদের সিস্টেম ১০ লক্ষ+ প্রোডাক্ট এবং ১০ লক্ষ+ ইউজার হ্যান্ডেল করার জন্য পরীক্ষিত। আপনার ব্যবসা বড় হওয়ার সাথে সাথে সিস্টেমও নির্বিঘ্নে স্কেল করবে।
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="py-32 bg-background text-foreground" >
                <div className="container mx-auto px-6">
                    <div className="text-center mb-24">
                        <h2 className="text-4xl md:text-6xl font-heading font-bold uppercase mb-6">Choose Your Plan</h2>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            আপনার ব্যবসার আকার অনুযায়ী সেরা প্যাকেজটি বেছে নিন।
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {[
                            {
                                name: "Starter",
                                price: "35,000",
                                desc: "ছোট ব্যবসার জন্য আদর্শ",
                                features: ["Pre-built Demo Design with EpikCart Features", "Order Management", "Inventory Control", "Basic Reporting", "Standard Support", "1 User Account"]
                            },
                            {
                                name: "Professional",
                                price: "45,000",
                                desc: "ক্রমবর্ধমান ব্যবসার জন্য",
                                popular: true,
                                features: ["Everything in Starter", "Pre-built Banner Design Provided", "CRM Integration", "Advanced Analytics", "Marketing Tools", "5 User Accounts", "Priority Support"]
                            },
                            {
                                name: "Enterprise",
                                price: "70,000",
                                desc: "বড় পরিসরের ব্যবসার জন্য",
                                features: ["Everything in Professional", "Full Custom Home Page UI Design", "6 Months Free Support", "Custom Features", "Dedicated Account Manager", "API Access", "Unlimited Users", "24/7 Premium Support"]
                            }
                        ].map((plan, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className={`relative p-10 rounded-3xl border transition-all duration-300 flex flex-col ${plan.popular ? 'bg-white/5 border-primary shadow-2xl shadow-primary/10 scale-105 z-10' : 'bg-transparent border-white/10 hover:bg-white/5 hover:border-white/20'}`}
                            >
                                {plan.popular && (
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                                        Most Popular
                                    </div>
                                )}
                                <div className="mb-8">
                                    <h3 className="text-xl font-bold uppercase tracking-widest mb-2 text-gray-400">{plan.name}</h3>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-2xl font-bold">BDT</span>
                                        <span className={`text-5xl font-heading font-bold ${plan.popular ? 'text-primary' : 'text-white'}`}>{plan.price}</span>
                                    </div>
                                    <p className="text-sm text-gray-500 mt-4">{plan.desc}</p>
                                </div>

                                <ul className="space-y-4 mb-10 flex-1">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-center gap-3 text-gray-300 text-sm">
                                            <CheckCircle2 className={`w-5 h-5 ${plan.popular ? 'text-primary' : 'text-gray-500'}`} />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <Link to="/contact" className={`w-full py-4 rounded-full text-center font-bold uppercase tracking-widest transition-all duration-300 ${plan.popular ? 'bg-primary text-white hover:bg-white hover:text-black' : 'bg-white/10 text-white hover:bg-white hover:text-black'}`}>
                                    Choose Plan
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-32 bg-primary text-white text-center" >
                <div className="container mx-auto px-6">
                    <h2 className="text-5xl md:text-7xl font-heading font-bold uppercase mb-8">Epikcart Enterprise</h2>
                    <p className="text-xl opacity-90 mb-12 max-w-2xl mx-auto font-light tracking-widest uppercase">
                        Build to Scale. Built for Bangladesh.
                    </p>
                    <Link to="/contact" className="inline-flex items-center gap-4 px-12 py-6 bg-black text-white rounded-full hover:bg-white hover:text-black transition-all duration-300 uppercase tracking-widest font-bold text-lg">
                        Contact Sales <ArrowUpRight className="w-6 h-6" />
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default E360;

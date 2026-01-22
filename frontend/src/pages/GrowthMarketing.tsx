import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useSpring, useMotionValue } from 'framer-motion';
import { ArrowUpRight, TrendingUp, Target, Users, ArrowRight, Rocket, CheckCircle2, Send, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import TiltCard from '../components/TiltCard';
import SEO from '../components/SEO';
import axios from 'axios';

// Magnetic Button Component
const MagneticButton = ({ children, className = "", onClick }: { children: React.ReactNode, className?: string, onClick?: () => void }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 150, damping: 15 });
    const springY = useSpring(y, { stiffness: 150, damping: 15 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;
        x.set(distanceX * 0.4);
        y.set(distanceY * 0.4);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.button
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: springX, y: springY }}
            onClick={onClick}
            className={className}
        >
            {children}
        </motion.button>
    );
};

// Rolling Number Component
const RollingNumber = ({ value }: { value: number }) => {
    return (
        <motion.span
            key={value}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="inline-block"
        >
            {value.toLocaleString()}
        </motion.span>
    );
};

const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

const GrowthMarketing: React.FC = () => {
    const [seoData, setSeoData] = useState<any>(null);
    const [sections, setSections] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/content/page-sections?page=growth-marketing');
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
            heading: 'আপনার ব্যবসার গ্রোথ নিশ্চিত করুন',
            subheading: 'Performance Driven',
            description: 'আমরা শুধু ট্রাফিক আনি না, আমরা রেভিনিউ বাড়াই। আমাদের ডেটা-ড্রিভেন গ্রোথ মার্কেটিং স্ট্র্যাটেজি আপনার ব্যবসার স্কেলিং এবং সর্বোচ্চ ROI নিশ্চিত করে।',
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2940&auto=format&fit=crop"
        }
    };

    const process = sections.find(s => s.section_type === 'process') || {
        content: {
            heading: 'How We Work',
            items: [
                { step: '01', title: 'Analysis', description: 'মার্কেট এবং কম্পিটিটর অ্যানালাইসিস।' },
                { step: '02', title: 'Strategy', description: 'কাস্টম গ্রোথ প্ল্যান তৈরি।' },
                { step: '03', title: 'Execution', description: 'ক্যাম্পেইন রান এবং অপ্টিমাইজেশন।' },
                { step: '04', title: 'Scale', description: 'রেজাল্ট মনিটরিং এবং স্কেলিং।' }
            ]
        }
    };

    return (
        <div className="bg-[#050505] min-h-screen text-white pt-20 transition-colors duration-500 overflow-hidden">
            <SEO
                title={seoData?.title}
                description={seoData?.description}
                keywords={seoData?.keywords}
                ogImage={seoData?.og_image}
            />
            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div
                        className="absolute inset-0 bg-cover bg-center opacity-20"
                        style={{ backgroundImage: `url(${hero.content.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/90 to-transparent" />
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
                        }}
                        className="max-w-4xl"
                    >
                        <motion.span variants={fadeInUp} className="inline-block px-4 py-2 border border-white/20 rounded-full text-xs font-bold uppercase tracking-widest mb-6 text-primary">
                            {hero.content.subheading}
                        </motion.span>
                        <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-heading font-bold mb-8 leading-tight">
                            {hero.content.heading}
                        </motion.h1>
                        <motion.p variants={fadeInUp} className="text-lg md:text-xl text-gray-400 max-w-2xl mb-12 leading-relaxed">
                            {hero.content.description}
                        </motion.p>
                        <motion.div variants={fadeInUp} className="flex flex-wrap gap-6">
                            <MagneticButton className="px-10 py-5 bg-primary text-white rounded-full font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-all">
                                কথা বলুন আমাদের সাথে <ArrowRight className="inline ml-2" />
                            </MagneticButton>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Key Services */}
            <section className="py-32 bg-secondary/10">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="mb-24 flex flex-col md:flex-row justify-between items-end"
                    >
                        <div>
                            <h2 className="text-4xl md:text-6xl font-heading font-bold uppercase mb-6"><span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Growth Engine</span></h2>
                            <p className="text-gray-400 max-w-xl font-light">কাস্টমার একুইজিশন, রিটেনশন এবং মনিটাইজেশনের জন্য কমপ্লিট সলিউশন।</p>
                        </div>
                        <Link to="/services" className="hidden md:flex items-center gap-2 text-primary font-bold uppercase tracking-widest hover:text-white transition-colors">
                            View All Services <ArrowRight className="w-4 h-4" />
                        </Link>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: TrendingUp, title: "SEO & Content", desc: "অর্গানিক ট্রাফিক বাড়াতে ডেটা-ব্যাকড কন্টেন্ট স্ট্র্যাটেজি এবং সার্চ ইঞ্জিন অপ্টিমাইজেশন。", color: "bg-emerald-500" },
                            { icon: Target, title: "Paid Acquisition", desc: "PPC এবং সোশ্যাল মিডিয়া অ্যাডের মাধ্যমে সঠিক কাস্টমারের কাছে পৌঁছানো এবং সেলস জেনারেট করা।", color: "bg-rose-500" },
                            { icon: BarChart3, title: "Data Analytics", desc: "প্রতিটি টাকার সঠিক ব্যবহার নিশ্চিত করতে গভীর ইনসাইট এবং কনভার্সন রেট অপ্টিমাইজেশন।", color: "bg-violet-500" },
                            { icon: Users, title: "Social Media", desc: "ব্র্যান্ড ভ্যালু বাড়াতে এবং লয়াল কমিউনিটি গড়ে তুলতে ইফেক্টিভ সোশ্যাল মিডিয়া ম্যানেজমেন্ট।", color: "bg-pink-500" },
                            { icon: Rocket, title: "Product Marketing", desc: "মার্কেট পেনিট্রেশন এবং প্রোডাক্ট পজিশনিং এর জন্য স্ট্র্যাটেজিক লঞ্চ প্ল্যানিং।", color: "bg-orange-500" },
                            { icon: Send, title: "Email & Automation", desc: "পার্সোনালাইজড অটোমেশনের মাধ্যমে লিড নার্চারিং এবং কাস্টমার রিটেনশন বৃদ্ধি।", color: "bg-cyan-500" }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group p-10 border border-white/10 rounded-3xl hover:bg-white/5 transition-colors duration-500 relative overflow-hidden"
                            >
                                <div className={`absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity duration-500 ${item.color.replace('bg-', 'text-')}`}>
                                    <item.icon className="w-32 h-32" />
                                </div>
                                <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-white/5 relative z-10`}>
                                    <item.icon className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-heading font-bold mb-4 uppercase relative z-10">{item.title}</h3>
                                <p className="text-gray-400 font-light leading-relaxed relative z-10">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>



            {/* How We Work - Process */}
            {/* Process Section */}
            <section className="py-32 bg-[#080808] relative overflow-hidden">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center mb-24"
                    >
                        <h2 className="text-4xl md:text-7xl font-heading font-bold uppercase mb-6">
                            {process.content.heading}
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {process.content.items.map((step: any, index: number) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="relative group p-10 bg-white/5 border border-white/10 rounded-[2.5rem] hover:bg-white/10 transition-all"
                            >
                                <span className="text-6xl font-heading font-bold text-white/5 absolute top-6 right-8 group-hover:text-primary/20 transition-colors">
                                    {step.step}
                                </span>
                                <h3 className="text-2xl font-bold mb-6 pt-4">{step.title}</h3>
                                <p className="text-gray-400 leading-relaxed">{step.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Case Studies - Success Stories */}
            <section className="py-32 bg-secondary/30 text-foreground">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-20">
                        <div>
                            <h2 className="text-4xl md:text-6xl font-heading font-bold uppercase mb-6"><span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Success Stories</span></h2>
                            <p className="text-xl text-gray-600 max-w-xl">
                                আমাদের ক্লায়েন্টদের সাফল্যের কিছু গল্প।
                            </p>
                        </div>
                        <Link to="/case-studies" className="hidden md:flex items-center gap-2 text-primary font-bold uppercase tracking-widest hover:text-black transition-colors">
                            View All Cases <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {[
                            {
                                id: "fashion-brand-x",
                                client: "Fashion Brand X",
                                result: "300% ROI",
                                image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2874&auto=format&fit=crop",
                                tag: "E-commerce"
                            },
                            {
                                id: "tech-gadget-store",
                                client: "Tech Gadget Store",
                                result: "10k+ Sales",
                                image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2940&auto=format&fit=crop",
                                tag: "Electronics"
                            },
                            {
                                id: "organic-food-co",
                                client: "Organic Food Co.",
                                result: "5M+ Reach",
                                image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
                                tag: "FMCG"
                            }
                        ].map((study, index) => (
                            <Link to={`/case-studies/${study.id}`} key={index}>
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.2 }}
                                    className="group relative rounded-3xl overflow-hidden aspect-[4/5] cursor-pointer"
                                >
                                    <img
                                        src={study.image}
                                        alt={study.client}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                                    <div className="absolute bottom-0 left-0 p-8 w-full">
                                        <span className="inline-block px-3 py-1 bg-primary text-white text-xs font-bold uppercase tracking-widest rounded-full mb-4">
                                            {study.tag}
                                        </span>
                                        <h3 className="text-3xl font-heading font-bold text-white mb-2">{study.client}</h3>
                                        <div className="flex items-center gap-2">
                                            <TrendingUp className="w-5 h-5 text-green-400" />
                                            <span className="text-2xl font-bold text-green-400">{study.result}</span>
                                        </div>
                                    </div>
                                    <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                                            <ArrowUpRight className="w-6 h-6 text-white" />
                                        </div>
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Comparison Section - Reality Check */}
            <section className="py-32 bg-background text-foreground relative overflow-hidden">
                {/* Background Graphics */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.5, 0.3],
                        }}
                        transition={{ duration: 8, repeat: Infinity }}
                        className="absolute -top-20 -left-20 w-96 h-96 bg-red-600/20 rounded-full blur-[100px]"
                    />
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.5, 0.3],
                        }}
                        transition={{ duration: 8, repeat: Infinity, delay: 4 }}
                        className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px]"
                    />
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center mb-24">
                        <span className="inline-block px-4 py-2 border border-white/20 rounded-full text-xs font-bold uppercase tracking-widest mb-6 text-red-500">
                            Reality Check
                        </span>
                        <h2 className="text-4xl md:text-6xl font-heading font-bold uppercase mb-6">
                            Agency <span className="text-gray-600">vs</span> In-House
                        </h2>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            কেন একটি এজেন্সি আপনার ব্যবসার জন্য ইন-হাউজ টিমের চেয়ে বেশি সাশ্রয়ী এবং কার্যকর?
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        {/* In-House Team (The Pain) */}
                        <div className="relative p-10 rounded-3xl border border-red-900/30 bg-red-950/10 overflow-hidden group hover:border-red-600/50 transition-colors duration-500">
                            <div className="absolute top-0 right-0 p-8 opacity-10">
                                <Users className="w-32 h-32 text-red-600" />
                            </div>
                            <h3 className="text-3xl font-heading font-bold mb-2 text-red-500">In-House Team</h3>
                            <p className="text-gray-400 mb-10 text-sm uppercase tracking-widest">The Hard Way</p>

                            <ul className="space-y-6">
                                {[
                                    { title: "High Fixed Cost", desc: "Minimum 5 people team (Salary: 150k+ BDT/mo)" },
                                    { title: "Management Headache", desc: "Hiring, training, and managing daily tasks" },
                                    { title: "Tools & Software", desc: "Extra cost for premium marketing tools" },
                                    { title: "Limited Expertise", desc: "Dependent on individual skills" }
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-4">
                                        <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center shrink-0 mt-1">
                                            <div className="w-2 h-2 rounded-full bg-red-500" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                                            <p className="text-gray-500 text-sm">{item.desc}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Kinative (The Solution) */}
                        <div className="relative p-10 rounded-3xl border border-emerald-500/30 bg-emerald-900/10 overflow-hidden group hover:border-emerald-500/50 transition-colors duration-500">
                            <div className="absolute top-0 right-0 p-8 opacity-10">
                                <Rocket className="w-32 h-32 text-emerald-500" />
                            </div>
                            <div className="absolute top-6 right-6">
                                <span className="px-4 py-1 bg-emerald-500 text-white text-xs font-bold uppercase tracking-widest rounded-full shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                                    Smart Choice
                                </span>
                            </div>
                            <h3 className="text-3xl font-heading font-bold mb-2 text-emerald-500">Kinative Agency</h3>
                            <p className="text-gray-400 mb-10 text-sm uppercase tracking-widest">The Smart Way</p>

                            <ul className="space-y-6">
                                {[
                                    { title: "Affordable Fixed Cost", desc: "Fraction of the cost of a full team" },
                                    { title: "Zero Management", desc: "We handle everything, you focus on business" },
                                    { title: "All-in-One Tools", desc: "We use our own premium tools" },
                                    { title: "Instant Expertise", desc: "Access to a full team of specialists" }
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-4">
                                        <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 mt-1">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                                            <p className="text-gray-500 text-sm">{item.desc}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-24 bg-secondary/10 text-foreground">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                        {[
                            { value: "250%", label: "Average ROI" },
                            { value: "10M+", label: "Leads Generated" },
                            { value: "50+", label: "Industries Served" },
                            { value: "98%", label: "Client Retention" }
                        ].map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <h3 className="text-5xl md:text-7xl font-heading font-bold mb-2">{stat.value}</h3>
                                <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
            {/* Interactive Pricing Dashboard */}
            <PackageCustomizer />

            {/* CTA */}
            <section className="py-32 bg-background text-foreground relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/10" />
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <h2 className="text-4xl md:text-6xl font-heading font-bold uppercase mb-8"><span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Ready to Scale?</span></h2>
                    <p className="text-xl opacity-90 mb-12 max-w-2xl mx-auto font-light">
                        আসুন এমন একটি গ্রোথ স্ট্র্যাটেজি তৈরি করি যা আপনার ব্যবসায় দৃশ্যমান পরিবর্তন আনবে।
                    </p>
                    <Link to="/contact" className="inline-flex items-center gap-4 px-12 py-6 bg-primary text-white rounded-full hover:bg-white hover:text-black transition-all duration-300 uppercase tracking-widest font-bold text-lg shadow-lg shadow-primary/30">
                        Get Your Growth Plan <ArrowUpRight className="w-6 h-6" />
                    </Link>
                </div>
            </section>
        </div >
    );
};

const PackageCustomizer: React.FC = () => {
    const plans = {
        starter: {
            name: "Starter Package",
            label: "Best for starting",
            price: 20000,
            features: [

                "FB banner design – 1",
                "FB Page setup",
                "Facebook Page – 5 Posts",
                "Instagram – 5 Posts",
                "Twitter (X) Profile",
                "Photo/Graphics Design – 5",
                "Motion Graphics – 1",
                "Facebook Ads Management – Up to 5",
                "Strategy Calendar – 1",
                "Reporting – 1",
                "Online Meeting – 1"
            ]
        },
        standard: {
            name: "Standard Package",
            label: "Best for growth",
            price: 28000,
            features: [

                "FB banner design – 1",
                "Facebook Page – 12 Posts",
                "Instagram – 12 Posts",
                "Youtube – 4 Posts",
                "Tiktok — 4 posts",
                "Landing Page – 1",
                "Pixel setup + event tracking",
                "Photo/Graphics Design – 12",
                "Motion Graphics – 2",
                "Facebook Ads Management – Up to 6",
                "Production – Indoor Shoot (3hr)",
                "Script – Included"
            ]
        },
        premium: {
            name: "Premium Package",
            label: "Best for scalability",
            price: 40000,
            features: [

                "FB banner design – 1",
                "Facebook Page – 12 Posts",
                "Instagram – 12 Posts",
                "Youtube – 6 Posts",
                "Tiktok – 6 Posts",
                "Landing Page – 1",
                "Pixel setup + event tracking",
                "Photo/Graphics Design – 12",
                "Explainer Video – 1",
                "Facebook Ads Management – Up to 12",
                "Production – Indoor Shoot (6hr)",
                "Script – Included",
                "Website Blogs – 4"
            ]
        }
    };

    const [selectedPlanId, setSelectedPlanId] = React.useState<keyof typeof plans>('standard');
    const selectedPlan = plans[selectedPlanId];

    interface AddonItem {
        active: boolean;
        type?: string;
        price: number;
        count?: number;
    }

    const [selectedAddons, setSelectedAddons] = React.useState<Record<string, AddonItem>>({
        logoDesign: { active: false, type: 'regular', price: 5000 },
        landingPage: { active: false, type: 'simple', price: 6000 },
        adsSupport: { active: false, type: '30days', price: 10000 },
        reels: { active: false, count: 1, price: 3000 },
        photoshoot: { active: false, count: 1, price: 1000 },
        graphic: { active: false, count: 1, price: 600 },
        video: { active: false, count: 1, price: 6000 }
    });

    const calculateTotal = () => {
        let addonTotal = 0;
        Object.values(selectedAddons).forEach(addon => {
            if (addon.active) {
                addonTotal += (addon.count || 1) * addon.price;
            }
        });
        return selectedPlan.price + addonTotal;
    };

    const updateAddon = (key: string, updates: Partial<AddonItem>) => {
        setSelectedAddons(prev => ({
            ...prev,
            [key]: { ...prev[key], ...updates }
        }));
    };

    return (
        <section className="py-24 bg-background border-y border-foreground/5 relative overflow-hidden">
            {/* Background Grain/Noise */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-heading font-bold uppercase mb-4"
                    >
                        Customize Your Plan
                    </motion.h2>
                    <p className="text-gray-400 text-lg">Professional Digital Marketing Solutions</p>
                </div>

                {/* Plan Selection Grid (At a glance) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                    {Object.entries(plans).map(([id, plan]) => (
                        <TiltCard key={id} className="h-full">
                            <button
                                onClick={() => setSelectedPlanId(id as keyof typeof plans)}
                                className={`group relative p-10 rounded-[40px] border-2 transition-all duration-700 text-left overflow-hidden flex flex-col h-full w-full ${selectedPlanId === id
                                    ? 'bg-secondary/40 border-primary shadow-[0_0_60px_rgba(239,68,68,0.15)] ring-1 ring-primary/20'
                                    : 'bg-card border-foreground/5 hover:border-primary/20 hover:bg-secondary/20'
                                    }`}
                            >
                                {id === 'standard' && (
                                    <div className="absolute top-0 right-0 z-20">
                                        <div className="relative bg-primary text-[11px] font-black text-white px-6 py-2 rounded-bl-[20px] uppercase tracking-[0.2em] shadow-lg overflow-hidden">
                                            {/* Shimmer Effect */}
                                            <motion.div
                                                animate={{ x: ['-100%', '200%'] }}
                                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
                                            />
                                            <span className="relative z-10">POPULAR</span>
                                        </div>
                                    </div>
                                )}

                                <div className="mb-8 relative z-10">
                                    <h4 className={`text-sm font-bold uppercase tracking-[0.2em] mb-1 transition-colors ${selectedPlanId === id ? 'text-primary' : 'text-gray-400'}`}>
                                        {plan.name}
                                    </h4>
                                    <div className={`text-[11px] font-black uppercase tracking-[0.2em] mb-6 transition-colors ${selectedPlanId === id ? 'text-primary' : 'text-gray-600'}`}>
                                        {plan.label}
                                    </div>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-3xl font-bold text-white/50">৳</span>
                                        <span className="text-6xl font-heading font-bold text-white tracking-tighter">
                                            {plan.price.toLocaleString()}
                                        </span>
                                        <span className="text-sm text-gray-600 font-bold tracking-widest lowercase">/mo</span>
                                    </div>
                                </div>

                                <motion.div
                                    layout
                                    className="space-y-4 mb-10 flex-1 relative z-10"
                                >
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={selectedPlanId}
                                            initial="hidden"
                                            animate="visible"
                                            variants={{
                                                visible: { transition: { staggerChildren: 0.05 } }
                                            }}
                                        >
                                            {plan.features.map((feat, i) => (
                                                <motion.div
                                                    key={i}
                                                    variants={{
                                                        hidden: { opacity: 0, x: -10 },
                                                        visible: { opacity: 1, x: 0 }
                                                    }}
                                                    className="flex items-start gap-3 group/item mb-4"
                                                >
                                                    <div className={`mt-1.5 w-1.5 h-1.5 rounded-full transition-colors ${selectedPlanId === id ? 'bg-primary' : 'bg-gray-800'}`} />
                                                    <span className={`text-[13px] leading-relaxed transition-colors ${selectedPlanId === id ? 'text-gray-200' : 'text-gray-500'}`}>
                                                        {feat}
                                                    </span>
                                                </motion.div>
                                            ))}
                                        </motion.div>
                                    </AnimatePresence>
                                </motion.div>

                                <MagneticButton
                                    onClick={() => setSelectedPlanId(id as keyof typeof plans)}
                                    className={`w-full py-5 rounded-[20px] text-center text-xs font-black uppercase tracking-[0.3em] transition-all duration-500 border-2 relative z-10 ${selectedPlanId === id
                                        ? 'bg-primary border-primary text-white shadow-xl shadow-primary/20'
                                        : 'bg-transparent border-white/10 text-gray-500 group-hover:text-white group-hover:border-white/20'
                                        }`}
                                >
                                    {selectedPlanId === id ? 'SELECTED PLAN' : 'SELECT PLAN'}
                                </MagneticButton>
                            </button>
                        </TiltCard>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-7xl mx-auto">
                    {/* Left Column: Plan Details & Add-ons */}
                    <div className="lg:col-span-8 space-y-12">
                        {/* Dynamic Package Card */}
                        <motion.div
                            key={selectedPlanId}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="p-10 rounded-[40px] bg-card border border-foreground/5 shadow-2xl relative overflow-hidden group"
                        >
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                                <div>
                                    <h3 className="text-4xl font-heading font-bold mb-2">{selectedPlan.name}</h3>
                                    <p className="text-gray-500 text-sm">Everything you need to get started</p>
                                </div>
                                <div className="text-left md:text-right">
                                    <div className="flex items-center md:justify-end gap-1 text-primary">
                                        <span className="text-2xl font-bold">৳</span>
                                        <span className="text-5xl font-heading font-bold">{selectedPlan.price.toLocaleString()}</span>
                                    </div>
                                    <div className="text-[10px] text-gray-600 uppercase tracking-[0.3em] font-bold mt-1">PER MONTH</div>
                                </div>
                                {/* Decorative Rocket Icon */}
                                <div className="absolute top-10 right-10 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-700 pointer-events-none">
                                    <Rocket className="w-32 h-32 text-primary -rotate-12" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {selectedPlan.features.map((item, i) => (
                                    <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-secondary/20 border border-foreground/5 hover:border-primary/20 transition-colors">
                                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                                        </div>
                                        <span className="text-gray-300 text-sm font-medium">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Add-ons Container */}
                        <div>
                            <div className="flex items-center gap-4 mb-10">
                                <div className="h-px bg-white/10 flex-1" />
                                <h3 className="text-2xl font-bold uppercase tracking-widest flex items-center gap-3">
                                    <TrendingUp className="text-primary w-6 h-6" /> Add-On Features
                                </h3>
                                <div className="h-px bg-white/10 flex-1" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Logo Design */}
                                <div className={`p-8 rounded-3xl border transition-all duration-500 ${selectedAddons.logoDesign.active ? 'bg-primary/5 border-primary shadow-[0_0_30px_rgba(239,68,68,0.1)]' : 'bg-card border-foreground/10'}`}>
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-3">
                                            <span className="text-lg font-bold">Logo Design</span>
                                            {selectedAddons.logoDesign.active && <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />}
                                        </div>
                                        <button
                                            onClick={() => updateAddon('logoDesign', { active: !selectedAddons.logoDesign.active })}
                                            className={`w-14 h-7 rounded-full relative transition-all duration-500 border-2 ${selectedAddons.logoDesign.active ? 'bg-primary border-primary' : 'bg-black border-white/20'}`}
                                        >
                                            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-lg transition-all duration-500 ${selectedAddons.logoDesign.active ? 'left-8' : 'left-1'}`} />
                                        </button>
                                    </div>
                                    <select
                                        disabled={!selectedAddons.logoDesign.active}
                                        value={selectedAddons.logoDesign.type}
                                        onChange={(e) => updateAddon('logoDesign', { type: e.target.value, price: e.target.value === 'regular' ? 5000 : 17000 })}
                                        className="w-full bg-black border border-white/10 rounded-xl p-4 text-sm focus:outline-none focus:border-primary opacity-80 transition-colors disabled:opacity-20 font-medium"
                                    >
                                        <option value="regular">Regular Logo Design (৳5000)</option>
                                        <option value="professional">Professional Brand Identity (৳17000)</option>
                                    </select>
                                </div>

                                {/* Landing Page */}
                                <div className={`p-8 rounded-3xl border transition-all duration-500 ${selectedAddons.landingPage.active ? 'bg-primary/5 border-primary shadow-[0_0_30px_rgba(239,68,68,0.1)]' : 'bg-card border-foreground/10'}`}>
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-3">
                                            <span className="text-lg font-bold">Landing Page</span>
                                            {selectedAddons.landingPage.active && <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />}
                                        </div>
                                        <button
                                            onClick={() => updateAddon('landingPage', { active: !selectedAddons.landingPage.active })}
                                            className={`w-14 h-7 rounded-full relative transition-all duration-500 border-2 ${selectedAddons.landingPage.active ? 'bg-primary border-primary' : 'bg-black border-white/20'}`}
                                        >
                                            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-lg transition-all duration-500 ${selectedAddons.landingPage.active ? 'left-8' : 'left-1'}`} />
                                        </button>
                                    </div>
                                    <select
                                        disabled={!selectedAddons.landingPage.active}
                                        value={selectedAddons.landingPage.type}
                                        onChange={(e) => updateAddon('landingPage', { type: e.target.value, price: e.target.value === 'simple' ? 6000 : 12000 })}
                                        className="w-full bg-black border border-white/10 rounded-xl p-4 text-sm focus:outline-none focus:border-primary opacity-80 transition-colors disabled:opacity-20 font-medium"
                                    >
                                        <option value="simple">Simple Design (৳6000)</option>
                                        <option value="advanced">Advanced Layout (৳12000)</option>
                                    </select>
                                </div>

                                {/* Ads Support */}
                                <div className={`p-8 rounded-3xl border transition-all duration-500 ${selectedAddons.adsSupport.active ? 'bg-primary/5 border-primary shadow-[0_0_30px_rgba(239,68,68,0.1)]' : 'bg-card border-foreground/10'}`}>
                                    <div className="flex items-center justify-between mb-6">
                                        <span className="text-lg font-bold">Additional Ads Support</span>
                                        <button
                                            onClick={() => updateAddon('adsSupport', { active: !selectedAddons.adsSupport.active })}
                                            className={`w-14 h-7 rounded-full relative transition-all duration-500 border-2 ${selectedAddons.adsSupport.active ? 'bg-primary border-primary' : 'bg-black border-white/20'}`}
                                        >
                                            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-lg transition-all duration-500 ${selectedAddons.adsSupport.active ? 'left-8' : 'left-1'}`} />
                                        </button>
                                    </div>
                                    <div className="flex items-center gap-2 p-4 bg-black rounded-xl border border-white/5 opacity-80 text-sm font-medium">
                                        <Target className="w-4 h-4 text-primary" />
                                        30 Days Campaign Management (৳10000)
                                    </div>
                                </div>

                                {/* Counter Add-ons */}
                                {[
                                    { id: 'reels' as const, label: 'Additional Reels', unitPrice: 3000, icon: Rocket },
                                    { id: 'photoshoot' as const, label: 'Product Photoshoot', unitPrice: 1000, icon: Target },
                                    { id: 'graphic' as const, label: 'Custom Graphic', unitPrice: 600, icon: Users },
                                    { id: 'video' as const, label: 'Explainer Video', unitPrice: 6000, icon: ArrowUpRight }
                                ].map((addon) => (
                                    <div key={addon.id} className={`p-8 rounded-3xl border transition-all duration-500 ${selectedAddons[addon.id].active ? 'bg-primary/5 border-primary shadow-[0_0_30px_rgba(239,68,68,0.1)]' : 'bg-card border-foreground/10'}`}>
                                        <div className="flex items-center justify-between mb-8">
                                            <div className="flex items-center gap-3">
                                                <div className={`p-2 rounded-lg bg-white/5 ${selectedAddons[addon.id].active ? 'text-primary' : 'text-gray-500'}`}>
                                                    <addon.icon className="w-5 h-5" />
                                                </div>
                                                <span className="text-lg font-bold">{addon.label}</span>
                                            </div>
                                            <button
                                                onClick={() => updateAddon(addon.id, { active: !selectedAddons[addon.id].active })}
                                                className={`w-14 h-7 rounded-full relative transition-all duration-500 border-2 ${selectedAddons[addon.id].active ? 'bg-primary border-primary' : 'bg-black border-white/20'}`}
                                            >
                                                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-lg transition-all duration-500 ${selectedAddons[addon.id].active ? 'left-8' : 'left-1'}`} />
                                            </button>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className={`flex items-center bg-black border border-white/10 rounded-2xl p-2 transition-opacity duration-300 ${!selectedAddons[addon.id].active ? 'opacity-20' : 'opacity-100'}`}>
                                                <button
                                                    disabled={!selectedAddons[addon.id].active}
                                                    onClick={() => updateAddon(addon.id, { count: Math.max(1, (selectedAddons[addon.id].count || 1) - 1) })}
                                                    className="w-10 h-10 flex items-center justify-center text-primary hover:bg-primary/10 rounded-xl transition-colors disabled:opacity-0"
                                                >
                                                    -
                                                </button>
                                                <span className="w-12 text-center text-xl font-bold">{selectedAddons[addon.id].count}</span>
                                                <button
                                                    disabled={!selectedAddons[addon.id].active}
                                                    onClick={() => updateAddon(addon.id, { count: (selectedAddons[addon.id].count || 1) + 1 })}
                                                    className="w-10 h-10 flex items-center justify-center text-primary hover:bg-primary/10 rounded-xl transition-colors disabled:opacity-0"
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">UNIT PRICE</div>
                                                <div className="text-lg font-bold">৳{addon.unitPrice}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Total Monthly Investment */}
                    <div className="lg:col-span-4">
                        <motion.div
                            layout
                            className="sticky top-32 p-10 rounded-[40px] bg-secondary/50 backdrop-blur-md border-2 border-primary/20 shadow-2xl relative overflow-hidden"
                        >
                            {/* Glow Effect */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -mr-32 -mt-32" />

                            <h3 className="text-center text-primary font-bold uppercase tracking-[0.3em] text-xs mb-10">Total Monthly Investment</h3>

                            <div className="text-center mb-12 border-b border-white/5 pb-12">
                                <motion.div
                                    key={calculateTotal()}
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="text-7xl font-heading font-bold mb-2 flex items-center justify-center gap-2"
                                >
                                    <span className="text-4xl">৳</span>
                                    {calculateTotal().toLocaleString()}
                                </motion.div>
                                <div className="text-gray-600 uppercase tracking-[0.2em] text-[10px] font-bold">COMMERCIAL INVESTMENT</div>
                            </div>

                            <div className="space-y-8 mb-12">
                                <h4 className="text-red-500 font-bold uppercase text-[10px] tracking-[0.2em]">Package Breakdown:</h4>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-400 font-medium">{selectedPlan.name} (Base)</span>
                                        <span className="font-bold text-gray-200 text-lg font-heading">৳{selectedPlan.price.toLocaleString()}</span>
                                    </div>

                                    <div className="space-y-3">
                                        {Object.entries(selectedAddons).filter(([_, v]) => v.active).map(([k, v]) => (
                                            <motion.div
                                                layout
                                                initial={{ opacity: 0, x: 10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                key={k}
                                                className="flex justify-between items-center text-xs"
                                            >
                                                <span className="text-gray-500 flex items-center gap-2 capitalize">
                                                    <div className="w-1 h-1 rounded-full bg-primary" />
                                                    {k.replace(/([A-Z])/g, ' $1')} {v.count ? `(x${v.count})` : ''}
                                                </span>
                                                <span className="font-bold text-gray-400">৳{((v.count || 1) * v.price).toLocaleString()}</span>
                                            </motion.div>
                                        ))}
                                    </div>

                                    <div className="flex justify-between pt-8 border-t border-white/10">
                                        <span className="text-xl font-bold uppercase tracking-tighter">TOTAL</span>
                                        <div className="text-right">
                                            <div className="flex items-baseline justify-end gap-1">
                                                <span className="text-xl font-bold text-primary">৳</span>
                                                <span className="text-3xl font-heading font-bold text-primary">
                                                    <RollingNumber value={calculateTotal()} />
                                                </span>
                                            </div>
                                            <div className="text-[8px] text-gray-600 text-right mt-1 font-bold">ALL INCLUSIVE</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <MagneticButton className="w-full">
                                <Link to="/contact" className="group relative block w-full py-6 bg-primary text-white rounded-[20px] text-center font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-500 shadow-xl overflow-hidden">
                                    <div className="relative z-10 flex items-center justify-center gap-4">
                                        Book Strategy Call <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                                    </div>
                                    <motion.div
                                        className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500"
                                    />
                                </Link>
                            </MagneticButton>

                            <p className="text-center text-[10px] text-gray-600 mt-6 font-medium leading-relaxed">
                                Custom features and enterprise solutions available upon direct consultation.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GrowthMarketing;

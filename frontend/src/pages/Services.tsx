import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
    Zap, Monitor, Box, Database, Folder, FileText, ArrowUpRight,
    Code, PenTool, Layout, BarChart, Smartphone, Globe, ArrowRight,
    Sparkles
} from 'lucide-react';
import { fadeInUp, staggerContainer } from '../utils/animations';
import SEO from '../components/SEO';
import axios from 'axios';
import { Link } from 'react-router-dom';
import TiltCard from '../components/TiltCard';
import Magnetic from '../components/Magnetic';

const iconMap: { [key: string]: any } = {
    'Monitor': Monitor,
    'Zap': Zap,
    'Box': Box,
    'Database': Database,
    'Folder': Folder,
    'FileText': FileText,
    'Code': Code,
    'PenTool': PenTool,
    'Layout': Layout,
    'BarChart': BarChart,
    'Smartphone': Smartphone,
    'Globe': Globe
};

const routeMap: { [key: string]: string } = {
    'brand-design': 'brand-design',
    'software-product-design': 'software-product-design',
    'website-design': 'website-design',
    'ai-design': 'ai-design',
    'growth-marketing-systems': 'growth-marketing-systems'
};

const Services: React.FC = () => {
    const [sections, setSections] = useState<any[]>([]);
    const [services, setServices] = useState<any[]>([]);
    const [seoData, setSeoData] = useState<any>(null);
    const { scrollYProgress } = useScroll();

    const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -500]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch page sections
                const sectionsRes = await axios.get('http://localhost:8000/api/content/page-sections?page=services');
                const fetchedSections = Array.isArray(sectionsRes.data) ? sectionsRes.data : [];
                setSections(fetchedSections);

                const seo = fetchedSections.find((section: any) => section.section_type === 'seo');
                if (seo) setSeoData(seo.content);

                // Fetch services
                const servicesRes = await axios.get('http://localhost:8000/api/content/services');

                if (Array.isArray(servicesRes.data) && servicesRes.data.length > 0) {
                    setServices(servicesRes.data.map((s: any) => ({
                        id: s.identifier,
                        title: s.title,
                        desc: s.description,
                        icon: iconMap[s.icon] || Zap,
                        link: `/services/${routeMap[s.identifier] || s.identifier}`
                    })));
                } else {
                    setServices([
                        { id: "brand-design", icon: Folder, title: "Brand Design (Core)", desc: "Build a brand that resonates. We create visual identities that tell your story and command global authority.", link: "/services/brand-design" },
                        { id: "software-product-design", icon: Box, title: "Software & Product Design", desc: "Digital products built for humans. We create intuitive software that feels like a natural extension of your brand.", link: "/services/software-product-design" },
                        { id: "website-design", icon: Monitor, title: "Website Design", desc: "Your 24/7 global storefront. We design high-performance sites that turn curious visitors into loyal customers.", link: "/services/website-design" },
                        { id: "ai-design", icon: Database, title: "AI Design (Support)", desc: "AI that helps, not hinders. We design smart, human-centric features that make your workflows feel effortless.", link: "/services/ai-design" },
                        { id: "growth-marketing-systems", icon: BarChart, title: "Growth Marketing Systems", desc: "Scale your reach with confidence. We build sustainable marketing engines designed for predictable, long-term growth.", link: "/services/growth-marketing-systems" }
                    ]);
                }
            } catch (error) {
                console.error('Failed to fetch data:', error);
                setServices([
                    { id: "brand-design", icon: Folder, title: "Brand Design (Core)", desc: "Build a brand that resonates and commands authority.", link: "/services/brand-design" },
                    { id: "software-product-design", icon: Box, title: "Software & Product Design", desc: "Intuitive software built for real human needs.", link: "/services/software-product-design" },
                    { id: "website-design", icon: Monitor, title: "Website Design", desc: "Cinematic websites designed for maximum conversion.", link: "/services/website-design" },
                    { id: "ai-design", icon: Database, title: "AI Design (Support)", desc: "Smart features that make your life easier.", link: "/services/ai-design" },
                    { id: "growth-marketing-systems", icon: BarChart, title: "Growth Marketing Systems", desc: "Sustainable engines for predictable brand growth.", link: "/services/growth-marketing-systems" }
                ]);
            }
        };

        fetchData();
        window.scrollTo(0, 0);
    }, []);

    const hero = sections.find(s => s.section_type === 'hero') || {
        content: {
            heading: "WE BUILD WHAT'S NEXT FOR YOUR BRAND.",
            subheading: "Partnering for Growth",
            description: "You have the vision; we have the tools. We partner with ambitious businesses to build digital products that aren't just powerful—they're human, intuitive, and designed to scale with you."
        }
    };

    // Force a better heading if it's generic or if user's database has legacy copy
    const heroHeading = (hero?.content?.heading === "Innovative Digital Solutions" || !hero?.content?.heading || hero?.content?.heading === "What We Do.")
        ? "WE BUILD WHAT'S NEXT FOR YOUR BRAND."
        : hero.content.heading;

    const heroSubheading = hero?.content?.subheading === "Comprehensive Solutions" ? "Partnering for Success" : (hero?.content?.subheading || "Human-Centric Impact");
    const heroDescription = (hero?.content?.description === "From brand identity to enterprise software, we provide full-stack digital solutions that drive growth." || !hero?.content?.description)
        ? "You have the vision; we have the tools. We partner with ambitious businesses to build digital products that aren't just powerful—they're human, intuitive, and designed to scale with you."
        : hero.content.description;

    return (
        <div className="bg-background min-h-screen text-foreground transition-colors duration-500 selection:bg-primary/30">
            <SEO
                title={seoData?.title || "Expertise | Kinative"}
                description={seoData?.description || heroDescription}
                keywords={seoData?.keywords}
                ogImage={seoData?.og_image}
            />

            {/* Ambient Background Elements */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <motion.div
                    style={{ y: y1 }}
                    className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full"
                />
                <motion.div
                    style={{ y: y2 }}
                    className="absolute bottom-[-20%] left-[-10%] w-[800px] h-[800px] bg-blue-500/5 blur-[150px] rounded-full"
                />
            </div>

            {/* Hero Section */}
            <section className="relative pt-64 pb-32 overflow-hidden px-6">
                <div className="container mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="max-w-5xl"
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <span className="w-12 h-[1px] bg-primary/40"></span>
                            <span className="text-primary font-bold tracking-[0.4em] uppercase text-[10px]">{heroSubheading}</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl lg:text-9xl font-heading font-black uppercase mb-2 leading-[0.85] tracking-tighter">
                            {heroHeading.split(' ').map((word: string, i: number) => (
                                <React.Fragment key={i}>
                                    {word === "GROWTH-DRIVEN" || word === "ECOSYSTEMS." || word === "ECOSYSTEMS" || word === "Growth-Driven" || word === "NEXT" || word === "BRAND." ? (
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-orange-500 to-rose-600">
                                            {word}
                                        </span>
                                    ) : (
                                        <>{word} </>
                                    )}
                                    {i === 1 && <br className="hidden md:block" />}
                                </React.Fragment>
                            ))}
                        </h1>

                        <div className="flex flex-col md:flex-row gap-12 items-start md:items-center mt-6">
                            <p className="text-lg md:text-xl text-gray-400 max-w-xl leading-relaxed font-light border-l border-primary/20 pl-8">
                                {heroDescription}
                            </p>

                            <Magnetic strength={0.2}>
                                <Link to="/contact" className="group flex items-center gap-6">
                                    <div className="w-16 h-16 border border-white/10 rounded-full flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-500 overflow-hidden relative text-white">
                                        <motion.div
                                            className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-100 transition-opacity"
                                            initial={false}
                                        />
                                        <ArrowUpRight className="w-6 h-6 relative z-10 group-hover:rotate-45 transition-transform duration-500" />
                                    </div>
                                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 group-hover:text-primary transition-colors">Start Journey</span>
                                </Link>
                            </Magnetic>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-32 relative z-10 px-6">
                <div className="container mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
                    >
                        {services.map((service, index) => (
                            <TiltCard key={index}>
                                <Link to={service.link}>
                                    <motion.div
                                        variants={fadeInUp}
                                        className="group p-10 lg:p-12 rounded-[40px] border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-700 relative overflow-hidden h-full flex flex-col backdrop-blur-3xl"
                                    >
                                        {/* Hover Gradient Blob */}
                                        <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                                        <div className="relative z-10 flex flex-col h-full">
                                            <div className="flex justify-between items-start mb-16">
                                                <div className="w-20 h-20 rounded-3xl bg-white/[0.03] border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-primary group-hover:via-orange-500 group-hover:to-rose-600 group-hover:border-primary transition-all duration-700 shadow-2xl relative overflow-hidden">
                                                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                                    {service.icon && <service.icon className="w-9 h-9 text-primary group-hover:text-white transition-colors duration-500 relative z-10" />}
                                                </div>
                                                <span className="text-6xl font-heading font-black text-transparent stroke-text opacity-5 group-hover:opacity-10 transition-all duration-700 group-hover:translate-x-2">
                                                    0{index + 1}
                                                </span>
                                            </div>

                                            <h3 className="text-2xl lg:text-3xl font-heading font-black mb-6 uppercase group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-orange-500 transition-all duration-500 tracking-tighter leading-none">
                                                {service.title}
                                            </h3>
                                            <p className="text-gray-400 text-base leading-relaxed mb-12 font-light group-hover:text-gray-300 transition-colors">
                                                {service.desc}
                                            </p>

                                            <div className="mt-auto pt-8 border-t border-white/5 flex items-center justify-between">
                                                <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-primary transition-all duration-500 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                                                    View Ecosystem <ArrowRight className="w-4 h-4" />
                                                </div>
                                                <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-primary/50 transition-colors">
                                                    <Sparkles className="w-3 h-3 text-gray-600 group-hover:text-primary transition-colors" />
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </Link>
                            </TiltCard>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Bottom CTA / Value Statement */}
            <section className="py-48 relative overflow-hidden px-6">
                <div className="container mx-auto">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                        >
                            <h2 className="text-4xl md:text-6xl font-heading font-bold uppercase mb-12 tracking-tighter text-white">
                                Ready to scale your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-orange-500 to-rose-600 italic">vision?</span>
                            </h2>
                            <p className="text-xl text-gray-500 mb-16 font-light max-w-xl mx-auto">
                                We don't just build websites. We engineer data-driven growth engines for world-class brands.
                            </p>
                            <Magnetic strength={0.1}>
                                <Link
                                    to="/contact"
                                    className="inline-flex items-center gap-4 bg-primary text-white p-1 pr-10 rounded-full group hover:scale-105 transition-transform duration-500"
                                >
                                    <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center group-hover:rotate-45 transition-transform duration-500">
                                        <ArrowUpRight className="w-6 h-6 text-primary" />
                                    </div>
                                    <span className="text-xs font-black uppercase tracking-widest">Construct Your System</span>
                                </Link>
                            </Magnetic>
                        </motion.div>
                    </div>
                </div>
            </section>

            <footer className="py-12 border-t border-white/5 text-center px-6">
                <p className="text-[10px] uppercase tracking-[0.5em] text-gray-600">Kinative Systematic Engineering &copy; {new Date().getFullYear()}</p>
            </footer>

            <style>{`
                .stroke-text {
                    -webkit-text-stroke: 1px rgba(255, 255, 255, 0.4);
                }
                .bg-background {
                    background-color: #050505;
                }
            `}</style>
        </div>
    );
};

export default Services;

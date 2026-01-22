import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import axios from 'axios';
import Magnetic from '../components/Magnetic';

// Fallback case studies data
const fallbackCaseStudies = [
    {
        id: 1,
        title: "BUET IWFM Conference Platform",
        slug: "buet-iwfm-conference",
        category: "Web Development",
        description: "A comprehensive conference management system for BUET Institute of Water and Flood Management with registration, paper submission, and event scheduling.",
        image: "/images/portfolio_4.png",
        client: "BUET IWFM",
        year: "2024",
        services: ["Web Development", "Database Design", "UI/UX"]
    },
    {
        id: 2,
        title: "WAC Logistics Corporate Video",
        slug: "wac-logistics-video",
        category: "Video Production",
        description: "High-quality corporate video production showcasing WAC Logistics' nationwide courier network and operational excellence.",
        image: "/images/portfolio_3.jpg",
        client: "WAC Logistics",
        year: "2024",
        services: ["Video Production", "Motion Graphics", "Branding"]
    },
    {
        id: 3,
        title: "Aftab Safe Food E-commerce",
        slug: "aftab-ecommerce",
        category: "E-commerce",
        description: "Full-featured e-commerce platform for Aftab Safe Food with inventory management, order processing, and customer analytics.",
        image: "/images/portfolio_2.png",
        client: "Aftab Group",
        year: "2024",
        services: ["E-commerce", "Payment Integration", "Admin Dashboard"]
    },
    {
        id: 4,
        title: "PropertyPro Real Estate Platform",
        slug: "propertypro-platform",
        category: "PropTech",
        description: "Modern real estate platform connecting buyers, sellers, and agents with advanced property search and virtual tours.",
        image: "/images/portfolio_1.png",
        client: "PropertyPro",
        year: "2023",
        services: ["Web Application", "Map Integration", "Lead Management"]
    },
    {
        id: 5,
        title: "Walton Digital Campaign",
        slug: "walton-digital-campaign",
        category: "Digital Marketing",
        description: "Strategic digital marketing campaign for Walton's new product launch, achieving 3x ROI through targeted social media and PPC.",
        image: "/images/demos/electronics.png",
        client: "Walton",
        year: "2024",
        services: ["Social Media", "PPC Advertising", "Content Strategy"]
    },
    {
        id: 6,
        title: "SadeeqAgro Brand Identity",
        slug: "sadeeqagro-brand",
        category: "Brand Design",
        description: "Complete brand identity redesign for SadeeqAgro including logo, packaging, and marketing collateral.",
        image: "/images/demos/grocery.png",
        client: "SadeeqAgro",
        year: "2023",
        services: ["Brand Identity", "Packaging Design", "Guidelines"]
    }
];

const CaseStudies: React.FC = () => {
    const [projects, setProjects] = useState<any[]>([]);
    const [seoData, setSeoData] = useState<any>(null);
    const [filter, setFilter] = useState('All');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [projectsRes, seoRes] = await Promise.all([
                    axios.get('http://localhost:8000/api/content/case-studies'),
                    axios.get('http://localhost:8000/api/content/page-sections?page=case-studies')
                ]);

                if (Array.isArray(projectsRes.data) && projectsRes.data.length > 0) {
                    setProjects(projectsRes.data);
                } else {
                    setProjects(fallbackCaseStudies);
                }

                const seo = seoRes.data.find((section: any) => section.section_type === 'seo');
                if (seo) setSeoData(seo.content);
            } catch (error) {
                console.error("Error fetching case studies:", error);
                setProjects(fallbackCaseStudies);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
        window.scrollTo(0, 0);
    }, []);

    const categories = ['All', ...new Set(projects.map(p => p.category))];
    const filteredProjects = filter === 'All'
        ? projects
        : projects.filter(p => p.category === filter);

    return (
        <div className="bg-[#050505] min-h-screen text-foreground selection:bg-primary/30">
            <SEO
                title={seoData?.title || "Case Studies | Kinative"}
                description={seoData?.description || "Explore our portfolio of successful projects across brand design, web development, e-commerce, and digital marketing."}
                keywords={seoData?.keywords || "case studies, portfolio, kinative, web development, brand design"}
                ogImage={seoData?.og_image}
            />

            {/* Ambient Background */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[700px] h-[700px] bg-orange-500/5 blur-[150px] rounded-full" />
            </div>

            {/* Hero Section */}
            <section className="relative pt-40 pb-16 px-6">
                <div className="container mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-5xl"
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <span className="w-12 h-[1px] bg-primary/40"></span>
                            <span className="text-primary font-bold tracking-[0.4em] uppercase text-[10px]">Our Portfolio</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-black uppercase mb-8 leading-[0.85] tracking-tighter">
                            PROJECTS THAT <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-orange-500 to-rose-600">
                                DELIVER RESULTS.
                            </span>
                        </h1>

                        <p className="text-xl text-gray-400 max-w-2xl font-light leading-relaxed">
                            From ambitious startups to established enterprises, we partner with brands ready to make their mark. Here's how we've helped them get there.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Category Filter */}
            <section className="relative z-10 px-6 pb-8">
                <div className="container mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-wrap gap-3"
                    >
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-6 py-3 rounded-full border transition-all duration-300 text-xs font-bold uppercase tracking-wider ${filter === cat
                                        ? 'bg-primary text-white border-primary'
                                        : 'border-white/10 text-gray-400 hover:border-primary/50 hover:text-white'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Projects Grid */}
            <section className="relative z-10 px-6 py-16">
                <div className="container mx-auto">
                    {isLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="animate-pulse">
                                    <div className="bg-white/5 rounded-3xl aspect-video mb-6" />
                                    <div className="h-8 bg-white/5 rounded-lg w-3/4 mb-4" />
                                    <div className="h-4 bg-white/5 rounded-lg w-1/4" />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                            {filteredProjects.map((project, index) => (
                                <motion.div
                                    key={project.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="group"
                                >
                                    <Link to={`/case-studies/${project.slug}`}>
                                        <div className="relative overflow-hidden rounded-3xl aspect-video mb-6 border border-white/5 bg-white/[0.02]">
                                            <img
                                                src={project.image?.startsWith('http') ? project.image : project.image}
                                                alt={project.title}
                                                className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700"
                                                onError={(e: any) => {
                                                    e.target.src = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2000';
                                                }}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                                            {/* Hover Overlay */}
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                                                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-500">
                                                    <ArrowUpRight className="w-7 h-7 text-white" />
                                                </div>
                                            </div>

                                            {/* Category Tag */}
                                            <div className="absolute top-6 left-6">
                                                <span className="px-4 py-2 bg-black/50 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-wider text-white border border-white/10">
                                                    {project.category}
                                                </span>
                                            </div>

                                            {/* Year Tag */}
                                            {project.year && (
                                                <div className="absolute bottom-6 right-6">
                                                    <span className="text-white/60 text-sm font-light">{project.year}</span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h3 className="text-2xl lg:text-3xl font-heading font-bold mb-3 uppercase tracking-tight group-hover:text-primary transition-colors">
                                                    {project.title}
                                                </h3>
                                                {project.description && (
                                                    <p className="text-gray-500 font-light text-sm leading-relaxed max-w-md line-clamp-2">
                                                        {project.description}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/10 transition-all">
                                                <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-primary transition-colors" />
                                            </div>
                                        </div>

                                        {/* Services Tags */}
                                        {project.services && (
                                            <div className="flex flex-wrap gap-2 mt-4">
                                                {project.services.slice(0, 3).map((service: string, i: number) => (
                                                    <span key={i} className="text-[10px] uppercase tracking-wider text-gray-500 font-medium">
                                                        {service}{i < Math.min(project.services.length, 3) - 1 && <span className="mx-2 text-gray-700">•</span>}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    )}

                    {filteredProjects.length === 0 && !isLoading && (
                        <div className="text-center py-20">
                            <p className="text-gray-500 text-lg">No projects found in this category.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative z-10 py-32 px-6">
                <div className="container mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-3xl mx-auto text-center"
                    >
                        <h2 className="text-4xl md:text-6xl font-heading font-black uppercase mb-8 tracking-tighter">
                            HAVE A PROJECT <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-orange-500 to-rose-600">IN MIND?</span>
                        </h2>
                        <p className="text-lg text-gray-400 mb-12 font-light max-w-xl mx-auto">
                            Let's discuss how we can help bring your vision to life with our expertise and proven track record.
                        </p>
                        <Magnetic strength={0.1}>
                            <Link
                                to="/contact"
                                className="inline-flex items-center gap-4 px-10 py-5 bg-white text-black font-bold uppercase tracking-widest text-xs rounded-full hover:bg-primary hover:text-white transition-all duration-500 group"
                            >
                                Start Your Project <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                            </Link>
                        </Magnetic>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default CaseStudies;

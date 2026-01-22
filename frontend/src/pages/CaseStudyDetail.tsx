import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, CheckCircle2, TrendingUp, BarChart2, Users, Rocket, Target, Zap } from 'lucide-react';
import TiltCard from '../components/TiltCard';
import SEO from '../components/SEO';
import axios from 'axios';

const iconMap: Record<string, any> = {
    TrendingUp,
    BarChart2,
    Target,
    Zap,
    Rocket,
    Users
};

const CaseStudyDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [caseStudy, setCaseStudy] = useState<any>(null);
    const [allCaseStudies, setAllCaseStudies] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const { scrollYProgress } = useScroll();
    const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [detailRes, allRes] = await Promise.all([
                    axios.get(`http://localhost:8000/api/content/case-studies/${id}`),
                    axios.get('http://localhost:8000/api/content/case-studies')
                ]);
                setCaseStudy(detailRes.data);
                setAllCaseStudies(allRes.data);
            } catch (error) {
                console.error("Error fetching case study detail:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
        window.scrollTo(0, 0);
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
            </div>
        );
    }

    if (!caseStudy) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
                <div className="text-center">
                    <h2 className="text-4xl font-heading font-bold mb-4">Case Study Not Found</h2>
                    <Link to="/case-studies" className="text-primary hover:underline">Back to Case Studies</Link>
                </div>
            </div>
        );
    }

    // Default stats if none provided by API
    const stats = caseStudy.stats || [
        { label: "ROI", value: "300%", icon: "TrendingUp", color: "text-green-500" },
        { label: "Monthly Revenue", value: "$450k", icon: "BarChart2", color: "text-blue-500" },
        { label: "CAC Reduction", value: "40%", icon: "Target", color: "text-rose-500" },
        { label: "Return Ad Spend", value: "4.5x", icon: "Zap", color: "text-yellow-500" },
    ];

    // Default solution if none provided
    const solution = caseStudy.solution || [
        { title: "Brand Identity Refinement", desc: "We revamped their visual identity to appeal to a premium audience, focusing on mobile-first design assets." },
        { title: "Full-Funnel strategy", desc: "Implemented a multi-channel acquisition strategy using meta ads and google shopping." },
    ];

    // Default gallery if none
    const gallery = caseStudy.gallery || [
        caseStudy.image ? (caseStudy.image.startsWith('http') ? caseStudy.image : `http://localhost:8000/storage/${caseStudy.image}`) : "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2940&auto=format&fit=crop"
    ];

    // Find next case study
    const currentIndex = allCaseStudies.findIndex(p => p.id === caseStudy.id);
    const nextCase = allCaseStudies[(currentIndex + 1) % allCaseStudies.length] || caseStudy;

    const getImageUrl = (path: string) => {
        if (!path) return "";
        return path.startsWith('http') ? path : `http://localhost:8000/storage/${path}`;
    };

    return (
        <div className="bg-background min-h-screen text-foreground font-body selection:bg-primary/30">
            <SEO
                title={`${caseStudy.title} | Case Study | Kinative`}
                description={caseStudy.description}
                ogImage={getImageUrl(caseStudy.image)}
                keywords={`${caseStudy.category}, case study, digital marketing, kinative`}
            />
            {/* Reading Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-50"
                style={{ scaleX }}
            />

            {/* Navigation */}
            <nav className="fixed top-0 left-0 w-full p-6 z-40 mix-blend-difference text-white">
                <button onClick={() => navigate(-1)} className="flex items-center gap-2 hover:text-primary transition-colors font-bold uppercase tracking-widest text-xs">
                    <ArrowLeft className="w-4 h-4" /> Back
                </button>
            </nav>

            {/* Hero Section */}
            <header className="relative h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src={getImageUrl(caseStudy.image)}
                        alt={caseStudy.title}
                        className="w-full h-full object-cover opacity-60 scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                </div>

                <div className="container mx-auto px-6 relative z-10 pt-20">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="max-w-4xl"
                    >
                        <span className="inline-block px-4 py-2 border border-white/20 rounded-full text-xs font-bold uppercase tracking-widest mb-6 text-primary backdrop-blur-md">
                            {caseStudy.category}
                        </span>
                        <h1 className="text-4xl md:text-8xl font-heading font-black uppercase mb-6 leading-tight whitespace-pre-wrap">
                            {caseStudy.title}
                        </h1>
                        <p className="text-lg md:text-3xl text-gray-200 font-light max-w-2xl leading-relaxed">
                            {caseStudy.client || caseStudy.title}
                        </p>
                    </motion.div>
                </div>

                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2"
                >
                    <div className="w-[1px] h-20 bg-gradient-to-b from-transparent via-white to-transparent" />
                </motion.div>
            </header>

            {/* Stats Dashboard */}
            <section className="py-24 bg-secondary/5 border-y border-white/5">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat: any, index: number) => {
                            const Icon = iconMap[stat.icon] || TrendingUp;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="text-center group"
                                >
                                    <div className="mb-4 inline-flex p-4 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                                        <Icon className={`w-8 h-8 ${stat.color || 'text-primary'}`} />
                                    </div>
                                    <h3 className={`text-4xl md:text-5xl font-heading font-bold mb-2 ${stat.color || 'text-white'}`}>{stat.value}</h3>
                                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400">{stat.label}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Challenge & Solution Grid */}
            <section className="py-32">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
                        <div className="md:col-span-4 sticky top-32 self-start">
                            <h2 className="text-4xl font-heading font-bold mb-8 uppercase text-primary">The Challenge</h2>
                            <p className="text-gray-400 text-lg leading-relaxed font-light">
                                {caseStudy.description}
                            </p>
                            <div className="mt-12 p-8 bg-white/5 border border-white/5 rounded-3xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 opacity-10">
                                    <Target className="w-32 h-32 text-primary" />
                                </div>
                                <h4 className="font-bold uppercase tracking-widest text-xs mb-4 text-gray-500">Core Objectives</h4>
                                <ul className="space-y-4 relative z-10">
                                    <li className="flex items-center gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-primary" /> <span>Maximize ROI</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-primary" /> <span>Scale Presence</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-primary" /> <span>Organic Growth</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="md:col-span-8">
                            <h2 className="text-4xl font-heading font-bold mb-12 uppercase">Strategic Solution</h2>
                            <div className="space-y-8">
                                {solution.map((item: any, index: number) => (
                                    <TiltCard key={index} className="w-full">
                                        <div className="group p-10 bg-white/5 border border-white/5 rounded-[32px] hover:bg-white/10 transition-all duration-500">
                                            <div className="flex items-start gap-6">
                                                <div className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center text-primary font-bold text-xl group-hover:bg-primary group-hover:text-white transition-all">
                                                    0{index + 1}
                                                </div>
                                                <div>
                                                    <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                                                    <p className="text-gray-400 leading-relaxed font-light">{item.desc}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </TiltCard>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Gallery */}
            <section className="py-32">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-heading font-bold mb-16 uppercase text-center">Visual Assets</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {gallery.map((img: string, index: number) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.2 }}
                                className={`rounded-3xl overflow-hidden cursor-zoom-in ${index === 0 ? 'md:col-span-2 aspect-[21/9]' : 'aspect-square'}`}
                            >
                                <img src={img} alt="Campaign Asset" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Next Case Study */}
            {nextCase && (
                <Link to={`/case-studies/${nextCase.slug}`} className="block relative h-[60vh] group overflow-hidden">
                    <div className="absolute inset-0">
                        <img
                            src={getImageUrl(nextCase.image)}
                            alt="Next Case"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
                        />
                        <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-500" />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center text-center">
                        <div className="relative z-10">
                            <span className="text-sm font-bold tracking-[0.5em] uppercase text-white mb-6 block opacity-70 group-hover:opacity-100 transition-opacity">Next Case Study</span>
                            <h2 className="text-3xl md:text-8xl font-heading font-black text-white uppercase group-hover:scale-110 transition-transform duration-500">
                                {nextCase.title}
                            </h2>
                            <div className="mt-8 opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">
                                <span className="inline-flex items-center gap-2 px-8 py-3 bg-white text-black rounded-full font-bold uppercase tracking-widest text-xs">
                                    View Case <ArrowUpRight className="w-4 h-4" />
                                </span>
                            </div>
                        </div>
                    </div>
                </Link>
            )}
        </div>
    );
};

export default CaseStudyDetail;

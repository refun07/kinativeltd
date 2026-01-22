import React, { useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
    CheckCircle2, ArrowRight, ArrowUpRight,
    Sparkles, Shield, Target, Globe2, Rocket
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { ServiceData } from '../data/services';
import { fadeInUp } from '../utils/animations';
import SEO from './SEO';
import Magnetic from './Magnetic';

const ServiceDetail: React.FC<ServiceData> = ({
    title,
    description,
    longDescription,
    features,
    icon: Icon,
    color,
    pricing,
    process,
    valuePropositions,
    seo
}) => {
    const { scrollYProgress } = useScroll();
    const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
    const yParallax = useTransform(scrollYProgress, [0, 1], [0, -200]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [title]);

    // Icon map for value propositions to keep it diverse
    const vpIcons = [Globe2, Target, Shield];

    return (
        <div className="bg-[#050505] min-h-screen text-foreground relative overflow-hidden selection:bg-primary/30">
            <SEO
                title={seo?.title || `${title} | Kinative`}
                description={seo?.description || description}
                keywords={seo?.keywords}
            />

            {/* Ambient Background Focus */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <motion.div
                    style={{ y: yParallax, backgroundColor: color }}
                    className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] blur-[150px] opacity-[0.08] rounded-full animate-pulse"
                />
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/5 blur-[150px] rounded-full" />
            </div>

            {/* Cinematic Hero */}
            <section className="relative pt-64 pb-32 z-10 px-6">
                <div className="container mx-auto">
                    <motion.div
                        style={{ opacity, scale }}
                        className="max-w-6xl"
                    >
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-4 mb-10"
                        >
                            <span className="w-12 h-[1px]" style={{ backgroundColor: color }}></span>
                            <span className="font-bold tracking-[0.4em] uppercase text-[10px]" style={{ color }}>Dynamic Solutions</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="text-6xl md:text-8xl lg:text-[9.5rem] font-heading font-black uppercase leading-[0.8] tracking-tighter mb-16"
                        >
                            {title.split(' ').map((word, i) => (
                                <React.Fragment key={i}>
                                    {i % 2 !== 0 ? (
                                        <span
                                            className="text-transparent bg-clip-text italic font-serif lowercase"
                                            style={{ backgroundImage: `linear-gradient(to right, ${color}, #fff)` }}
                                        >
                                            {word}
                                        </span>
                                    ) : (
                                        <>{word} </>
                                    )}
                                    {(i === 1 || i === 2) && <br className="hidden lg:block" />}
                                </React.Fragment>
                            ))}
                        </motion.h1>

                        <div className="flex flex-col lg:flex-row gap-16 items-start">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 1 }}
                                className="flex-1"
                            >
                                <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed border-l border-white/10 pl-10 max-w-3xl">
                                    {longDescription || description}
                                </p>

                                <div className="mt-16 flex flex-wrap gap-4">
                                    {features.map((feature, i) => (
                                        <span key={i} className="px-5 py-2 rounded-full border border-white/5 bg-white/[0.02] text-[10px] uppercase font-bold tracking-widest text-gray-500 hover:border-primary/50 hover:text-white transition-colors cursor-default">
                                            {feature}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
                                className="relative lg:w-1/3 flex justify-center lg:justify-end"
                            >
                                <div className="w-80 h-80 rounded-[60px] border border-white/5 bg-white/[0.01] backdrop-blur-3xl flex items-center justify-center relative group">
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent rounded-[60px]" />
                                    <div
                                        className="absolute inset-6 blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-700"
                                        style={{ backgroundColor: color }}
                                    />
                                    <Icon className="w-24 h-24 relative z-10 transition-all duration-700 group-hover:scale-110" style={{ color }} />

                                    {/* Corner Accents */}
                                    <div className="absolute top-10 right-10">
                                        <Sparkles className="w-6 h-6 text-white/10 group-hover:text-primary transition-colors" />
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Strategic Value */}
            <section className="py-32 bg-white/[0.01] border-y border-white/5 relative z-10 px-6">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
                        {valuePropositions.map((vp, i) => {
                            const VPIcon = vpIcons[i % vpIcons.length];
                            return (
                                <motion.div
                                    key={i}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    variants={fadeInUp}
                                    className="group"
                                >
                                    <div className="w-16 h-16 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center mb-8 group-hover:bg-primary/10 group-hover:border-primary/20 transition-all duration-500">
                                        <VPIcon className="w-7 h-7 text-gray-500 group-hover:text-primary transition-colors" />
                                    </div>
                                    <h3 className="text-2xl font-heading font-black mb-6 uppercase tracking-tighter group-hover:text-primary transition-colors">{vp.title}</h3>
                                    <p className="text-gray-400 font-light leading-relaxed text-lg">{vp.desc}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Workflow / Process */}
            <section className="py-48 relative z-10 px-6 overflow-hidden">
                <div className="container mx-auto">
                    <div className="flex flex-col lg:flex-row gap-24">
                        <div className="lg:w-1/3">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1 }}
                            >
                                <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-gray-500 mb-8 block">Project Lifecycle</span>
                                <h2 className="text-5xl md:text-7xl font-heading font-black mb-10 uppercase tracking-tighter leading-[0.85]">
                                    OUR <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500 italic">ECOSYSTEM</span>
                                </h2>
                                <p className="text-gray-400 font-light leading-relaxed text-lg border-l border-primary/20 pl-8">
                                    We've refined a standardized execution framework that prioritizes speed, clarity, and uncompromising quality across all global timezones.
                                </p>
                            </motion.div>
                        </div>

                        <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
                            {process.map((step, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    viewport={{ once: true }}
                                    className="relative pl-16 group"
                                >
                                    <div className="absolute left-0 top-0 text-5xl font-heading font-black text-white/[0.03] group-hover:text-primary/10 transition-colors duration-700">0{i + 1}</div>
                                    <h5 className="text-xl font-bold mb-4 uppercase tracking-tight text-white group-hover:translate-x-2 transition-transform duration-500">{step.title}</h5>
                                    <p className="text-gray-500 font-light text-base leading-relaxed">{step.description}</p>

                                    <div className="mt-8 w-8 h-[1px] bg-white/10 group-hover:w-full group-hover:bg-primary/20 transition-all duration-700" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing / Investment Packages */}
            <section className="py-32 relative z-10 px-6">
                <div className="container mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center mb-24"
                    >
                        <span className="text-primary font-bold tracking-[0.4em] uppercase text-[10px] mb-6 block">Transparent Value</span>
                        <h2 className="text-5xl md:text-[6rem] font-heading font-black mb-6 tracking-tighter uppercase">Investment Plans</h2>
                        <p className="text-xl text-gray-500 max-w-2xl mx-auto font-light">Choose the tier that aligns with your current growth ambitions.</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        {pricing.map((plan, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className={`p-12 rounded-[50px] border transition-all duration-700 relative group flex flex-col ${plan.isPopular
                                    ? 'bg-primary/10 border-primary/30 shadow-[0_0_80px_rgba(255,59,29,0.1)] scale-105 z-20'
                                    : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.04] z-10'
                                    }`}
                            >
                                {plan.isPopular && (
                                    <div className="absolute top-10 right-10 px-5 py-2 bg-primary text-white text-[9px] font-black uppercase tracking-widest rounded-full shadow-xl">
                                        Market Standard
                                    </div>
                                )}

                                <span className="text-xs font-bold text-gray-500 uppercase tracking-[0.3em] mb-4">{plan.tier}</span>
                                <div className="text-6xl font-heading font-black text-white mb-12 flex items-baseline gap-2 group-hover:text-primary transition-colors">
                                    {plan.price}
                                    {plan.price !== 'Custom' && <span className="text-sm font-light text-gray-600 tracking-normal">/package</span>}
                                </div>

                                <ul className="space-y-6 mb-16 flex-grow">
                                    {plan.features.map((feat, fi) => (
                                        <li key={fi} className="flex items-start gap-4 text-base font-light text-gray-400 group-hover:text-gray-300 transition-colors">
                                            <CheckCircle2 className="w-5 h-5 text-primary shrink-0 opacity-40 group-hover:opacity-100 transition-opacity" />
                                            {feat}
                                        </li>
                                    ))}
                                </ul>

                                <Magnetic strength={0.1}>
                                    <Link
                                        to="/contact"
                                        className={`w-full py-6 rounded-3xl font-black uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-4 transition-all duration-500 ${plan.isPopular
                                            ? 'bg-primary text-white hover:bg-white hover:text-black shadow-[0_15px_30px_rgba(255,59,29,0.3)]'
                                            : 'bg-white/5 text-white hover:bg-primary'
                                            }`}
                                    >
                                        Initiate Project <ArrowUpRight className="w-5 h-5" />
                                    </Link>
                                </Magnetic>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Human CTA */}
            <section className="py-64 relative z-10 text-center px-6">
                <div className="container mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="max-w-4xl mx-auto"
                    >
                        <h2 className="text-6xl md:text-[10rem] font-heading font-black mb-16 uppercase tracking-tighter leading-[0.8]">
                            LETS BUILD <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-orange-500 to-rose-600 italic">TOGETHER.</span>
                        </h2>

                        <div className="flex flex-col md:flex-row items-center justify-center gap-12 mt-16">
                            <Magnetic strength={0.2}>
                                <Link
                                    to="/contact"
                                    className="group flex items-center gap-8 px-16 py-8 bg-white text-black font-black uppercase tracking-[0.4em] text-xs hover:bg-primary hover:text-white transition-all duration-700 rounded-full"
                                >
                                    Start Journey <ArrowRight className="w-6 h-6 group-hover:translate-x-4 transition-transform duration-500" />
                                </Link>
                            </Magnetic>

                            <div className="flex items-center gap-4 text-gray-500">
                                <Rocket className="w-5 h-5" />
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Next-Gen Ready</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            <footer className="py-16 border-t border-white/5 text-center px-6 bg-black/50 backdrop-blur-3xl">
                <div className="container mx-auto">
                    <div className="mb-12 flex justify-center gap-12 text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500">
                        <Link to="/about" className="hover:text-primary transition-colors">About</Link>
                        <Link to="/services" className="text-primary">Services</Link>
                        <Link to="/case-studies" className="hover:text-primary transition-colors">Portfolio</Link>
                        <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
                    </div>
                    <p className="text-[9px] uppercase tracking-[0.8em] text-gray-700">Kinative &copy; {new Date().getFullYear()} • Engineered for Growth</p>
                </div>
            </footer>

            <style>{`
                .font-heading { font-family: 'Outfit', sans-serif; }
                .font-serif { font-family: 'Playfair Display', serif; }
                .stroke-text {
                    -webkit-text-stroke: 1px rgba(255, 255, 255, 0.4);
                }
            `}</style>
        </div>
    );
};

export default ServiceDetail;

import React, { useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
    CheckCircle2, ArrowRight, ArrowUpRight,
    Shield, Target, Globe2, Rocket
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
    const yParallax = useTransform(scrollYProgress, [0, 1], [0, -150]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [title]);

    // Icon map for value propositions
    const vpIcons = [Globe2, Target, Shield];

    return (
        <div className="bg-[#050505] min-h-screen text-foreground relative overflow-hidden selection:bg-primary/30">
            <SEO
                title={seo?.title || `${title} | Kinative`}
                description={seo?.description || description}
                keywords={seo?.keywords}
            />

            {/* Ambient Background */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <motion.div
                    style={{ y: yParallax, backgroundColor: color }}
                    className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] blur-[150px] opacity-[0.08] rounded-full"
                />
                <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-primary/5 blur-[150px] rounded-full" />
            </div>

            {/* Hero Section */}
            <section className="relative pt-40 pb-24 z-10 px-6">
                <div className="container mx-auto">
                    <motion.div
                        style={{ opacity, scale }}
                        className="max-w-6xl"
                    >
                        {/* Breadcrumb */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-4 mb-8"
                        >
                            <Link to="/services" className="text-gray-500 hover:text-primary transition-colors text-sm">Services</Link>
                            <span className="text-gray-600">/</span>
                            <span className="text-primary text-sm">{title}</span>
                        </motion.div>

                        {/* Hero Content Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                            {/* Icon */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
                                className="lg:col-span-2"
                            >
                                <div
                                    className="w-24 h-24 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl flex items-center justify-center relative group"
                                    style={{ boxShadow: `0 0 60px ${color}20` }}
                                >
                                    <div
                                        className="absolute inset-4 blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-700"
                                        style={{ backgroundColor: color }}
                                    />
                                    <Icon className="w-12 h-12 relative z-10" style={{ color }} />
                                </div>
                            </motion.div>

                            {/* Title & Description */}
                            <div className="lg:col-span-10">
                                <motion.h1
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                    className="text-5xl md:text-6xl lg:text-7xl font-heading font-black uppercase leading-[0.9] tracking-tighter mb-8"
                                >
                                    {title.split(' ').map((word, i) => (
                                        <React.Fragment key={i}>
                                            {i === 0 ? (
                                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-orange-500 to-rose-500">
                                                    {word}
                                                </span>
                                            ) : (
                                                <> {word}</>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </motion.h1>

                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3, duration: 0.8 }}
                                    className="text-xl text-gray-400 font-light leading-relaxed max-w-3xl mb-10"
                                >
                                    {longDescription || description}
                                </motion.p>

                                {/* Features Tags */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4, duration: 0.8 }}
                                    className="flex flex-wrap gap-3"
                                >
                                    {features.map((feature, i) => (
                                        <span
                                            key={i}
                                            className="px-4 py-2 rounded-full border border-white/10 bg-white/[0.02] text-xs uppercase font-bold tracking-wider text-gray-400 hover:border-primary/50 hover:text-white transition-colors"
                                        >
                                            {feature}
                                        </span>
                                    ))}
                                </motion.div>

                                {/* CTA */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5, duration: 0.8 }}
                                    className="mt-12"
                                >
                                    <Magnetic strength={0.1}>
                                        <Link
                                            to="/contact"
                                            className="inline-flex items-center gap-4 px-8 py-4 bg-primary text-white font-bold uppercase tracking-widest text-xs rounded-full hover:bg-white hover:text-black transition-all duration-500 group"
                                        >
                                            Get Started <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform" />
                                        </Link>
                                    </Magnetic>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Value Propositions */}
            <section className="py-24 bg-white/[0.01] border-y border-white/5 relative z-10 px-6">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
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
                                    <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center mb-6 group-hover:bg-primary/10 group-hover:border-primary/30 transition-all duration-500">
                                        <VPIcon className="w-6 h-6 text-gray-500 group-hover:text-primary transition-colors" />
                                    </div>
                                    <h3 className="text-xl font-heading font-bold mb-4 uppercase tracking-tight group-hover:text-primary transition-colors">{vp.title}</h3>
                                    <p className="text-gray-400 font-light leading-relaxed">{vp.desc}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section className="py-32 relative z-10 px-6">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                        {/* Left Column - Heading */}
                        <div className="lg:col-span-4">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                            >
                                <span className="text-xs font-bold uppercase tracking-[0.3em] text-gray-500 mb-6 block">Our Process</span>
                                <h2 className="text-4xl md:text-5xl font-heading font-black mb-8 uppercase tracking-tighter leading-[0.9]">
                                    HOW WE <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">DELIVER</span>
                                </h2>
                                <p className="text-gray-400 font-light leading-relaxed border-l-2 border-primary/30 pl-6">
                                    A refined execution framework prioritizing speed, clarity, and quality.
                                </p>
                            </motion.div>
                        </div>

                        {/* Right Column - Steps */}
                        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                            {process.map((step, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    viewport={{ once: true }}
                                    className="relative p-8 rounded-3xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-500 group"
                                >
                                    <div className="absolute top-6 right-6 text-4xl font-heading font-black text-white/[0.05] group-hover:text-primary/20 transition-colors">
                                        0{i + 1}
                                    </div>
                                    <h5 className="text-lg font-bold mb-3 uppercase tracking-tight text-white">{step.title}</h5>
                                    <p className="text-gray-500 font-light text-sm leading-relaxed">{step.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="py-24 relative z-10 px-6 bg-white/[0.01]">
                <div className="container mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center mb-16"
                    >
                        <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Investment</span>
                        <h2 className="text-4xl md:text-5xl font-heading font-black mb-4 tracking-tighter uppercase">Pricing Plans</h2>
                        <p className="text-lg text-gray-500 max-w-xl mx-auto font-light">Choose the tier that fits your growth ambitions.</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {pricing.map((plan, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className={`p-8 rounded-3xl border transition-all duration-500 relative group flex flex-col ${plan.isPopular
                                    ? 'bg-primary/10 border-primary/30 shadow-[0_0_60px_rgba(255,59,29,0.1)] scale-[1.02] z-20'
                                    : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.04] z-10'
                                    }`}
                            >
                                {plan.isPopular && (
                                    <div className="absolute top-6 right-6 px-3 py-1 bg-primary text-white text-[9px] font-bold uppercase tracking-wider rounded-full">
                                        Popular
                                    </div>
                                )}

                                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">{plan.tier}</span>
                                <div className="text-4xl font-heading font-black text-white mb-8 flex items-baseline gap-2 group-hover:text-primary transition-colors">
                                    {plan.price}
                                    {plan.price !== 'Custom' && <span className="text-sm font-light text-gray-600">/pkg</span>}
                                </div>

                                <ul className="space-y-4 mb-8 flex-grow">
                                    {plan.features.map((feat, fi) => (
                                        <li key={fi} className="flex items-start gap-3 text-sm font-light text-gray-400 group-hover:text-gray-300 transition-colors">
                                            <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                            {feat}
                                        </li>
                                    ))}
                                </ul>

                                <Link
                                    to="/contact"
                                    className={`w-full py-4 rounded-2xl font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-3 transition-all duration-500 ${plan.isPopular
                                        ? 'bg-primary text-white hover:bg-white hover:text-black'
                                        : 'bg-white/5 text-white hover:bg-primary'
                                        }`}
                                >
                                    Get Started <ArrowUpRight className="w-4 h-4" />
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 relative z-10 text-center px-6">
                <div className="container mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="max-w-3xl mx-auto"
                    >
                        <h2 className="text-5xl md:text-7xl font-heading font-black mb-8 uppercase tracking-tighter leading-[0.85]">
                            READY TO <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-orange-500 to-rose-600">START?</span>
                        </h2>

                        <p className="text-lg text-gray-400 mb-12 font-light max-w-xl mx-auto">
                            Let's build something amazing together. Get in touch and we'll get back to you within 24 hours.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <Magnetic strength={0.2}>
                                <Link
                                    to="/contact"
                                    className="group flex items-center gap-4 px-10 py-5 bg-white text-black font-bold uppercase tracking-widest text-xs hover:bg-primary hover:text-white transition-all duration-500 rounded-full"
                                >
                                    Start Your Project <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                                </Link>
                            </Magnetic>

                            <div className="flex items-center gap-3 text-gray-500">
                                <Rocket className="w-4 h-4" />
                                <span className="text-xs font-bold uppercase tracking-wider">Fast Turnaround</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default ServiceDetail;

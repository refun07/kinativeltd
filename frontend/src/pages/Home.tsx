import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import HeroSlider from '../components/HeroSlider';
import Magnetic from '../components/Magnetic';
import TiltCard from '../components/TiltCard';
import Counter from '../components/Counter';
import SEO from '../components/SEO';
import axios from 'axios';
import { fadeInUp, staggerContainer } from '../utils/animations';
import {
    Zap, Monitor, Box, Database, Folder, FileText, ArrowUpRight,
    ArrowRight, Code, PenTool, Layout, BarChart, Smartphone, Globe, Star
} from 'lucide-react';

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

const Marquee: React.FC = () => {
    return (
        <div className="bg-background py-32 overflow-hidden border-y border-white/5 transition-colors duration-500 relative">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none"></div>

            <motion.div
                animate={{ x: [0, -2000] }}
                transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
                className="whitespace-nowrap flex items-center gap-12 md:gap-24 text-foreground font-heading font-black text-6xl md:text-[12rem] uppercase tracking-[ -0.05em] leading-none mb-32"
            >
                {Array(8).fill("Creative Strategy • Digital Excellence • Future Proof ").map((text, i) => (
                    <span key={i} className={i % 2 === 0 ? "text-foreground" : "text-transparent stroke-text opacity-20"}>
                        {text}
                    </span>
                ))}
            </motion.div>

            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="relative"
                >
                    <div className="absolute -inset-4 bg-primary/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative aspect-[4/5] overflow-hidden rounded-[60px] border border-white/10 shadow-2xl">
                        <img
                            src="/images/innovative-k.png"
                            alt="Innovative Solutions"
                            className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-1000"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        <div className="absolute bottom-12 left-12 right-12">
                            <div className="flex items-center gap-4 mb-4">
                                <span className="w-12 h-[1px] bg-primary"></span>
                                <span className="text-primary text-xs font-bold uppercase tracking-widest">Est. 2018</span>
                            </div>
                            <h4 className="text-white text-3xl font-heading font-bold uppercase tracking-tight">Pioneering Digital <br /> Transformation</h4>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="flex flex-col justify-center"
                >
                    <span className="text-primary font-bold tracking-[0.4em] uppercase text-xs mb-8 block px-4 py-2 bg-primary/10 rounded-full w-fit">Who We Are</span>
                    <h2 className="text-5xl md:text-8xl font-heading font-black text-foreground mb-10 uppercase leading-[0.85] tracking-tighter">
                        WE ENGINEER <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-orange-500 to-rose-600">GROWTH-DRIVEN</span> <br />
                        ECOSYSTEMS.
                    </h2>
                    <p className="text-gray-400 text-xl leading-relaxed mb-16 font-light max-w-xl border-l-2 border-primary/20 pl-8">
                        At Kinative, we pride ourselves on our client-centric approach, partnering with businesses of all sizes to develop customized strategies that meet their unique goals. We turn complex challenges into seamless digital success.
                    </p>
                    <div className="flex items-center gap-12">
                        <Magnetic strength={0.2}>
                            <Link to="/contact" className="group flex items-center gap-6 text-sm font-bold uppercase tracking-[0.3em] hover:text-primary transition-colors">
                                <div className="w-20 h-20 border border-white/20 rounded-full flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-500">
                                    <ArrowUpRight className="w-8 h-8 group-hover:rotate-45 transition-transform duration-500" />
                                </div>
                                Start Journey
                            </Link>
                        </Magnetic>
                        <div className="hidden md:flex flex-col">
                            <span className="text-2xl font-heading font-bold">50+</span>
                            <span className="text-[10px] text-gray-500 uppercase tracking-widest">Global Clients</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

const Expertise: React.FC = () => {
    const [items, setItems] = React.useState<Array<{ id: string; title: string; desc: string; icon: any; link?: string }>>([]);
    const [sectionData, setSectionData] = React.useState<any>(null);

    React.useEffect(() => {
        // Fetch section heading
        fetch('http://localhost:8000/api/content/page-sections?page=home')
            .then(res => res.json())
            .then(data => {
                const expertise = data.find((s: any) => s.section_type === 'text_block' && s.title === 'Philosophy Section');
                if (expertise) setSectionData(expertise.content);
            });

        fetch('http://localhost:8000/api/content/services?category=expertise')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data) && data.length > 0) {
                    const formatted = data.map((item: any) => ({
                        id: item.identifier,
                        title: item.title,
                        desc: item.description,
                        icon: iconMap[item.icon] || Zap,
                        link: `/services/${item.identifier}`
                    }));
                    setItems(formatted);
                } else {
                    setItems([
                        { id: "01", title: "Brand Design", desc: "We craft world-class visual identities that command attention and build trust as the core foundation.", icon: PenTool, link: "/services/brand-design" },
                        { id: "02", title: "Product Design", desc: "Brand-aligned software and platforms built with high-end UX and scalable architecture.", icon: Layout, link: "/services/software-product-design" },
                        { id: "03", title: "Website Design", desc: "High-performance websites engineered for conversion and global reach.", icon: Monitor, link: "/services/website-design" },
                        { id: "04", title: "AI Design", desc: "Human-centric AI interfaces that make complex technology feel effortless.", icon: Database, link: "/services/ai-design" },
                        { id: "05", title: "Growth Systems", desc: "Integrating AI-powered experiences and marketing systems to scale your brand effectively.", icon: Zap, link: "/services/growth-marketing-systems" },
                    ]);
                }
            })
            .catch(err => {
                console.error('Failed to fetch expertise services:', err);
                setItems([
                    { id: "01", title: "Brand Design", desc: "We craft world-class visual identities that command attention and build trust as the core foundation.", icon: PenTool, link: "/services/brand-design" },
                    { id: "02", title: "Product Design", desc: "Brand-aligned software and platforms built with high-end UX and scalable architecture.", icon: Layout, link: "/services/software-product-design" },
                    { id: "03", title: "Website Design", desc: "High-performance websites engineered for conversion and global reach.", icon: Monitor, link: "/services/website-design" },
                    { id: "04", title: "AI Design", desc: "Human-centric AI interfaces that make complex technology feel effortless.", icon: Database, link: "/services/ai-design" },
                    { id: "05", title: "Growth Systems", desc: "Integrating AI-powered experiences and marketing systems to scale your brand effectively.", icon: Zap, link: "/services/growth-marketing-systems" },
                ]);
            });
    }, []);

    return (
        <section className="py-32 bg-background text-foreground transition-colors duration-500">
            <div className="container mx-auto px-6">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="flex flex-col md:flex-row justify-between items-end mb-24"
                >
                    <div>
                        <span className="inline-block px-4 py-2 border border-foreground/20 rounded-full text-xs font-bold uppercase tracking-widest mb-6 text-primary">{sectionData?.subheading || 'Our Philosophy'}</span>
                        <h2 className="text-4xl md:text-7xl font-heading font-black uppercase max-w-4xl leading-[0.9] tracking-tighter">
                            {sectionData?.heading ? (
                                sectionData.heading.split(' ').map((word: string, i: number) => (
                                    <React.Fragment key={i}>
                                        {word === "AI" || word === "AI-driven" ? (
                                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500 italic font-serif lowercase">{word}</span>
                                        ) : word}{' '}
                                        {i === 2 && <br />}
                                    </React.Fragment>
                                ))
                            ) : (
                                <>Brand-First Design <br /> That Scales With AI</>
                            )}
                        </h2>
                    </div>
                    <p className="text-gray-400 max-w-md mt-8 md:mt-0 font-light leading-relaxed text-lg border-l border-primary/20 pl-8">
                        {sectionData?.description || "At Kinative, we believe great products start with a powerful brand. Our approach bridges the gap between high-end design, advanced development, and AI-driven growth."}
                    </p>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {items.map((item) => (
                        <TiltCard key={item.id}>
                            <Link to={(item as any).link || '#'}>
                                <motion.div
                                    variants={fadeInUp}
                                    className="group p-12 border border-white/5 rounded-[48px] bg-gradient-to-b from-white/[0.03] to-transparent hover:from-primary/10 transition-all duration-700 relative overflow-hidden h-full flex flex-col"
                                >
                                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                                    <div className="relative z-10 flex flex-col h-full">
                                        <div className="flex justify-between items-start mb-16">
                                            <div className="w-20 h-20 rounded-3xl bg-white/[0.03] border border-white/5 flex items-center justify-center group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-primary group-hover:via-orange-500 group-hover:to-rose-600 transition-all duration-500 shadow-2xl">
                                                <item.icon className="w-10 h-10 text-primary group-hover:text-white transition-colors" />
                                            </div>
                                            <span className="text-6xl font-heading font-black text-transparent stroke-text opacity-5 group-hover:opacity-10 transition-opacity">
                                                {item.id.includes('-') ? item.id.split('-').map((s: string) => s[0]).join('').toUpperCase() : item.id}
                                            </span>
                                        </div>

                                        <h3 className="text-3xl font-heading font-bold mb-6 uppercase group-hover:text-primary transition-colors tracking-tighter leading-none">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-400 text-base leading-relaxed mb-12 font-light group-hover:text-gray-300 transition-colors">
                                            {item.desc}
                                        </p>

                                        <div className="mt-auto pt-8 border-t border-white/5 flex items-center gap-4 text-xs font-bold uppercase tracking-[0.2em] text-primary transition-all duration-500 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                                            Learn More <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                        </div>
                                    </div>
                                </motion.div>
                            </Link>
                        </TiltCard>
                    ))}
                </motion.div>

                <div className="mt-20 flex items-center gap-6">
                    <span className="text-sm font-bold tracking-widest uppercase text-gray-400">Discover All Services</span>
                    <Magnetic strength={0.2}>
                        <Link to="/services" className="group w-16 h-16 bg-white rounded-full flex items-center justify-center hover:bg-primary transition-all duration-300 shadow-xl shadow-white/5">
                            <ArrowUpRight className="w-6 h-6 text-black group-hover:text-white transition-all duration-300 group-hover:rotate-45" />
                        </Link>
                    </Magnetic>
                </div>
            </div>

            <style>{`
                .stroke-text {
                    -webkit-text-stroke: 1px rgba(255, 255, 255, 0.4);
                }
            `}</style>
        </section>
    );
};

const StatsSection: React.FC = () => {
    const [stats, setStats] = React.useState<Array<{ value: string; label: string }>>([]);

    React.useEffect(() => {
        setStats([
            { value: "300+", label: "Project Completed" },
            { value: "250+", label: "Satisfied Clients" },
            { value: "7+", label: "Years Experience" },
            { value: "5+", label: "Country Operation" },
        ]);
    }, []);

    return (
        <section className="py-24 bg-background relative overflow-hidden">
            <div className="absolute inset-0 bg-primary/5 blur-[150px] rounded-full translate-x-1/2" />
            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                            transition={{ delay: index * 0.1 }}
                            className="flex flex-col items-center text-center group"
                        >
                            <div className="text-6xl md:text-8xl font-heading font-black text-white mb-6 tracking-tighter group-hover:text-primary transition-colors duration-500">
                                <Counter value={stat.value} />
                            </div>
                            <div className="w-12 h-1 bg-primary/30 group-hover:w-24 group-hover:bg-primary transition-all duration-500 mb-6"></div>
                            <span className="text-xs font-bold uppercase tracking-[0.3em] text-gray-500 group-hover:text-white transition-colors">{stat.label}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const CaseStudiesSection: React.FC = () => {
    const [projects, setProjects] = React.useState<Array<{ id: number; title: string; category: string; image: string }>>([]);

    React.useEffect(() => {
        fetch('http://localhost:8000/api/content/case-studies?featured=1')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data) && data.length > 0) {
                    const formatted = data.map((item: any) => ({
                        id: item.id,
                        title: item.title,
                        category: item.category,
                        image: item.image_url
                    }));
                    setProjects(formatted);
                } else {
                    setProjects([
                        { id: 1, title: "BUET IWFM Conference Management", category: "Systems", image: "/images/portfolio_4.png" },
                        { id: 2, title: "WAC Logistics Corporate Video", category: "Production", image: "/images/portfolio_3.jpg" },
                        { id: 3, title: "Aftab Safe Food Ecommerce", category: "Ecommerce", image: "/images/portfolio_2.png" },
                        { id: 4, title: "PropertyPro Real Estate Platform", category: "Fintech", image: "/images/portfolio_1.png" },
                    ]);
                }
            })
            .catch(err => {
                console.error('Failed to fetch case studies:', err);
                setProjects([
                    { id: 1, title: "BUET IWFM Conference Management", category: "Systems", image: "/images/portfolio_4.png" },
                    { id: 2, title: "WAC Logistics Corporate Video", category: "Production", image: "/images/portfolio_3.jpg" },
                    { id: 3, title: "Aftab Safe Food Ecommerce", category: "Ecommerce", image: "/images/portfolio_2.png" },
                    { id: 4, title: "PropertyPro Real Estate Platform", category: "Fintech", image: "/images/portfolio_1.png" },
                ]);
            });
    }, []);

    return (
        <section className="py-32 bg-background text-foreground overflow-hidden transition-colors duration-500">
            <div className="container mx-auto px-6">
                <div className="relative mb-24">
                    <motion.h2
                        initial={{ x: -100, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="text-[4rem] md:text-[15rem] font-heading font-bold text-foreground/5 whitespace-nowrap absolute -top-12 md:-top-60 left-0 select-none pointer-events-none"
                    >
                        STUDIES. OUR
                    </motion.h2>
                    <div className="relative z-10 pt-20">
                        <span className="inline-block px-4 py-2 border border-white/20 rounded-full text-xs font-bold uppercase tracking-widest mb-6 text-primary">Portfolio</span>
                        <h3 className="text-4xl md:text-6xl font-heading font-bold uppercase max-w-3xl leading-tight">
                            Our Case Studies
                        </h3>
                    </div>
                </div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="grid grid-cols-1 md:grid-cols-2 gap-24"
                >
                    {projects.map((project, index) => (
                        <motion.div key={index} variants={fadeInUp} className="group cursor-pointer">
                            <Link to={`/case-studies/${project.id}`}>
                                <div className="relative overflow-hidden rounded-[40px] mb-12 aspect-[4/5] border border-white/10">
                                    <span className="absolute top-10 left-10 z-10 px-6 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-[10px] font-bold uppercase tracking-[0.2em]">
                                        {project.category}
                                    </span>
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center transform scale-50 group-hover:scale-100 transition-transform duration-500">
                                            <ArrowUpRight className="w-10 h-10 text-black" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            <div className="flex justify-between items-start gap-8">
                                <div className="flex-1">
                                    <h4 className="text-4xl md:text-5xl font-heading font-black uppercase mb-4 group-hover:text-primary transition-colors tracking-tighter leading-[0.9]">
                                        {project.title.split(' ').map((word, i) => (
                                            <React.Fragment key={i}>
                                                {word}{' '}
                                                {i === 1 && <br />}
                                            </React.Fragment>
                                        ))}
                                    </h4>
                                    <p className="text-gray-500 text-sm font-light tracking-widest uppercase">Full Case Study →</p>
                                </div>
                                <span className="text-white/10 font-heading font-black text-6xl">0{index + 1}</span>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                <div className="mt-24 flex items-center gap-6">
                    <span className="text-sm font-bold tracking-widest uppercase">View Showcase</span>
                    <Link to="/case-studies" className="group w-16 h-16 border border-foreground/20 rounded-full flex items-center justify-center hover:bg-foreground hover:text-background transition-colors duration-300">
                        <ArrowUpRight className="w-6 h-6 transition-transform duration-300 group-hover:rotate-45" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

const BrandsSection: React.FC = () => {
    const [brands, setBrands] = React.useState<Array<{ name: string; logo: string }>>([]);
    const [heading, setHeading] = React.useState('WE WORKED WITH THE LARGEST BRANDS');

    React.useEffect(() => {
        // Fetch heading
        fetch('http://localhost:8000/api/content/page-sections?page=home')
            .then(res => res.json())
            .then(data => {
                const brandsSection = data.find((s: any) => s.section_type === 'text_block' && s.title === 'Brands Header');
                if (brandsSection) setHeading(brandsSection.content.heading);
            });

        fetch('http://localhost:8000/api/content/client-logos')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data) && data.length > 0) {
                    const formatted = data.map((item: any) => ({
                        name: item.name,
                        logo: item.logo_url
                    }));
                    setBrands(formatted);
                } else {
                    setBrands([
                        { name: "AFTAB", logo: "/images/clients/aftab.png" },
                        { name: "BUET", logo: "/images/clients/buet.png" },
                        { name: "WALTON", logo: "/images/clients/walton.png" },
                        { name: "SadeeqAgro", logo: "/images/clients/sadeeq.png" },
                        { name: "UNIQUE", logo: "/images/clients/unique.png" },
                        { name: "WAC", logo: "/images/clients/wac.png" },
                    ]);
                }
            })
            .catch(err => {
                console.error('Failed to fetch client logos:', err);
                setBrands([
                    { name: "AFTAB", logo: "/images/clients/aftab.png" },
                    { name: "BUET", logo: "/images/clients/buet.png" },
                    { name: "WALTON", logo: "/images/clients/walton.png" },
                    { name: "SadeeqAgro", logo: "/images/clients/sadeeq.png" },
                    { name: "UNIQUE", logo: "/images/clients/unique.png" },
                    { name: "WAC", logo: "/images/clients/wac.png" },
                    { name: "FANCY", logo: "/images/clients/fancy.png" },
                    { name: "LIRA", logo: "/images/clients/lira.png" },
                    { name: "MONON", logo: "/images/clients/monon.png" },
                    { name: "NEXTGEN", logo: "/images/clients/nextgen.png" },
                    { name: "PAKIZA", logo: "/images/clients/pakiza.png" },
                    { name: "UYLAB", logo: "/images/clients/uylab.png" },
                ]);
            });
    }, []);

    return (
        <section className="py-32 bg-white text-black border-t border-gray-100">
            <div className="container mx-auto px-6 text-center">
                <p className="text-sm font-bold tracking-[0.4em] uppercase mb-16 text-gray-400 flex items-center justify-center gap-4">
                    <span className="w-8 h-[1px] bg-gray-200"></span>
                    {heading}
                    <span className="w-8 h-[1px] bg-gray-200"></span>
                </p>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8"
                >
                    {brands.map((brand, index) => (
                        <motion.div
                            key={index}
                            variants={fadeInUp}
                            className="bg-white aspect-[3/2] flex items-center justify-center p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 group"
                        >
                            <img
                                src={brand.logo}
                                alt={brand.name}
                                className="w-full h-full object-contain filter transition-all duration-500"
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

const CTASection: React.FC = () => {
    return (
        <section className="py-48 bg-background text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="max-w-4xl"
                >
                    <span className="text-primary font-bold tracking-[0.5em] uppercase text-xs mb-12 block py-2 px-6 border border-primary/20 rounded-full w-fit mx-auto bg-primary/5">Transform Your Business</span>

                    <h2 className="text-6xl md:text-[10rem] font-heading font-black uppercase leading-[0.8] mb-16 tracking-tighter">
                        READY TO <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-orange-500 to-primary background-animate">DOMINATE?</span>
                    </h2>

                    <p className="text-gray-400 text-xl md:text-2xl mb-20 max-w-2xl mx-auto font-light leading-relaxed">
                        Join the fastest-growing brands and leverage our AI-driven design systems to scale your digital presence.
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-12">
                        <Magnetic strength={0.2}>
                            <Link to="/contact" className="group flex items-center gap-6 px-16 py-8 bg-primary text-white font-black uppercase tracking-[0.3em] text-xs hover:bg-white hover:text-black transition-all duration-700 rounded-full shadow-[0_0_50px_rgba(255,59,29,0.3)]">
                                Start Your Project <ArrowRight className="w-5 h-5 group-hover:translate-x-3 transition-transform duration-500" />
                            </Link>
                        </Magnetic>

                        <div className="flex items-center gap-4 text-gray-500">
                            <Star className="w-5 h-5 fill-primary text-primary" />
                            <span className="text-xs font-bold uppercase tracking-widest">Top Rated on Clutch</span>
                        </div>
                    </div>
                </motion.div>

                {/* Decorative Elements */}
                <div className="absolute -bottom-1/2 left-0 w-full h-full bg-primary/20 blur-[150px] rounded-full pointer-events-none" />
            </div>

            <style>{`
                .background-animate {
                    background-size: 400%;
                    animation: gradient-anim 8s ease infinite;
                }
                @keyframes gradient-anim {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
            `}</style>
        </section>
    );
};

const TeamSection: React.FC = () => {
    return (
        <section className="py-24 bg-background text-foreground relative overflow-hidden">
            <div className="container mx-auto px-6">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="relative rounded-[40px] overflow-hidden aspect-[21/9] group"
                >
                    <img
                        src="/images/team_full.png"
                        alt="Team Culture"
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                    <div className="absolute bottom-12 left-12 right-12 flex flex-col md:flex-row justify-between items-end gap-8">
                        <div className="max-w-2xl">
                            <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6 text-white">Together We Grow</h2>
                            <p className="text-white/70 text-lg font-light leading-relaxed">
                                At Kinative, our culture is built on collaboration, innovation, and a relentless pursuit of excellence. We don't just build software; we build the future together.
                            </p>
                        </div>
                        <div className="flex gap-4">
                            <Link to="/contact" className="px-8 py-4 bg-[#FF3B1D] text-white rounded-full font-bold hover:bg-white hover:text-black transition-all duration-300">
                                Join Our Team
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

const Home: React.FC = () => {
    const [seoData, setSeoData] = useState<any>(null);

    useEffect(() => {
        const fetchSEO = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/content/page-sections?page=home');
                const seo = response.data.find((section: any) => section.section_type === 'seo');
                if (seo) setSeoData(seo.content);
            } catch (error) {
                console.error("Error fetching SEO data:", error);
            }
        };
        fetchSEO();
    }, []);

    return (
        <div className="bg-background min-h-screen text-foreground transition-colors duration-500 relative overflow-hidden">
            <SEO
                title={seoData?.title}
                description={seoData?.description}
                keywords={seoData?.keywords}
                ogImage={seoData?.og_image}
            />

            {/* Ambient Background Elements */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute bottom-[10%] right-[-10%] w-[30%] h-[30%] bg-blue-500/5 blur-[120px] rounded-full animate-pulse animation-delay-2000" />
                <div className="absolute top-[40%] right-[20%] w-[20%] h-[20%] bg-orange-500/5 blur-[100px] rounded-full animate-pulse animation-delay-4000" />
            </div>

            <HeroSlider />
            <Marquee />
            <TeamSection />
            <Expertise />
            <StatsSection />
            <CaseStudiesSection />
            <BrandsSection />
            <CTASection />
        </div>
    );
};

export default Home;

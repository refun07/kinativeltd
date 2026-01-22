import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ArrowLeft, ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import Magnetic from './Magnetic';

interface Slide {
    id: number;
    title: string;
    tagline: string;
    description: string;
    image?: string;
    video?: string;
    buttonText: string;
    buttonLink: string;
    theme: 'red' | 'dark' | 'glass';
}

const HeroSlider: React.FC = () => {
    const [slides, setSlides] = useState<Slide[]>([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:8000/api/content/hero-slides?page=home')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data) && data.length > 0) {
                    const formattedSlides = data.map((item: any) => ({
                        id: item.id,
                        title: item.title,
                        tagline: item.subtitle,
                        description: item.description,
                        image: item.image_url, // Use the accessor
                        buttonText: item.button_text,
                        buttonLink: item.button_link,
                        theme: 'red' as 'red' | 'dark' | 'glass' // Explicitly cast the string
                    }));
                    setSlides(formattedSlides);
                } else {
                    // Fallback
                    setSlides([
                        {
                            id: 1,
                            title: "Brand-Led Design for Products & Platforms",
                            tagline: "STRATEGIC FOUNDATION",
                            description: "We design brands first — then build software, platforms, and AI-powered experiences that scale them.",
                            video: "https://kinative.com/wp-content/uploads/2025/03/red-bg-high.mp4",
                            buttonText: "LETS START CONVERSATION",
                            buttonLink: "/contact",
                            theme: 'red'
                        },
                        {
                            id: 4,
                            title: "Complete Business & Growth Analytics",
                            tagline: "DATA-DRIVEN GROWTH",
                            description: "High-end analytics panel for tracking profit/loss, customer behavior, and growth metrics in real-time.",
                            image: "/images/k_mask.png",
                            buttonText: "GET ANALYTICS",
                            buttonLink: "/growth-marketing",
                            theme: 'dark'
                        }
                    ]);
                }
            })
            .catch(err => {
                console.error('Failed to fetch hero slides:', err);
                setSlides([
                    {
                        id: 1,
                        title: "Brand-Led Design for Products & Platforms",
                        tagline: "STRATEGIC FOUNDATION",
                        description: "We design brands first — then build software, platforms, and AI-powered experiences that scale them.",
                        video: "https://kinative.com/wp-content/uploads/2025/03/red-bg-high.mp4",
                        buttonText: "LETS START CONVERSATION",
                        buttonLink: "/contact",
                        theme: 'red'
                    }
                ]);
            })
            .finally(() => setLoading(false));
    }, []);

    const nextSlide = useCallback(() => {
        if (slides.length === 0) return;
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, [slides.length]);

    const prevSlide = () => {
        if (slides.length === 0) return;
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    useEffect(() => {
        if (slides.length <= 1) return;
        const interval = setInterval(nextSlide, 8000);
        return () => clearInterval(interval);
    }, [nextSlide, slides.length]);

    if (loading || slides.length === 0) {
        return <div className="min-h-screen bg-black" />; // Loading state
    }

    const activeSlide = slides[currentSlide];

    return (
        <section className="relative min-h-screen flex items-center overflow-hidden bg-background group/hero transition-colors duration-500">
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeSlide.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0 z-0"
                >
                    {activeSlide.video ? (
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
                        >
                            <source src={activeSlide.video} type="video/mp4" />
                        </video>
                    ) : (
                        <div className="absolute inset-0 w-full h-full overflow-hidden">
                            <motion.img
                                initial={{ scale: 1.1, opacity: 0 }}
                                animate={{ scale: 1, opacity: 0.4 }}
                                transition={{ duration: 1.5 }}
                                src={activeSlide.image}
                                className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                                alt={activeSlide.title}
                            />
                        </div>
                    )}

                    {/* Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

                    {/* Theme specific glows */}
                    {activeSlide.theme === 'red' && (
                        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
                    )}
                    {activeSlide.theme === 'glass' && (
                        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]" />
                    )}
                </motion.div>
            </AnimatePresence>

            <div className="container mx-auto px-6 relative z-10 pt-32">
                <div className="max-w-5xl">
                    <motion.span
                        key={`tagline-${activeSlide.id}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-primary font-bold tracking-[0.4em] uppercase text-xs mb-6 block"
                    >
                        {activeSlide.tagline}
                    </motion.span>

                    <div className="min-h-[10rem] md:min-h-[14rem]">
                        <AnimatePresence mode="wait">
                            <motion.h1
                                key={`title-${activeSlide.id}`}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="text-5xl md:text-7xl lg:text-7xl font-heading font-medium tracking-tight mb-8 text-foreground leading-[1.05]"
                            >
                                {activeSlide.title}
                            </motion.h1>
                        </AnimatePresence>
                    </div>

                    <motion.p
                        key={`desc-${activeSlide.id}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-lg md:text-xl text-gray-400 max-w-2xl mb-16 leading-relaxed font-light"
                    >
                        {activeSlide.description}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="flex items-center gap-8"
                    >
                        <span className="text-sm font-bold tracking-[0.2em] uppercase text-foreground">{activeSlide.buttonText}</span>
                        <Magnetic strength={0.3}>
                            <Link to={activeSlide.buttonLink} className="group relative w-20 h-20 md:w-24 md:h-24 bg-[#FF3B1D] rounded-full flex items-center justify-center transition-all duration-300 shadow-lg shadow-[#FF3B1D]/30 hover:shadow-[#FF3B1D]/50">
                                <ArrowUpRight className="w-8 h-8 text-white transition-transform duration-300 group-hover:rotate-45" />
                            </Link>
                        </Magnetic>
                    </motion.div>
                </div>
            </div>

            {/* Slider Controls */}
            {slides.length > 1 && (
                <div className="absolute bottom-10 left-6 z-20 flex items-center gap-4">
                    <button
                        onClick={prevSlide}
                        className="w-12 h-12 rounded-full border border-foreground/10 flex items-center justify-center hover:bg-foreground hover:text-background transition-all duration-300"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>

                    <div className="flex gap-2">
                        {slides.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentSlide(i)}
                                className={`h-1 transition-all duration-500 rounded-full ${currentSlide === i ? 'w-8 bg-primary' : 'w-4 bg-foreground/20'}`}
                            />
                        ))}
                    </div>

                    <button
                        onClick={nextSlide}
                        className="w-12 h-12 rounded-full border border-foreground/10 flex items-center justify-center hover:bg-foreground hover:text-background transition-all duration-300"
                    >
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            )}

            {/* Project Showcase Spinner */}
            <div className="absolute bottom-20 right-10 hidden md:flex items-center justify-center z-20">
                <div className="relative w-40 h-40 flex items-center justify-center">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 w-full h-full"
                    >
                        <svg viewBox="0 0 100 100" className="w-full h-full">
                            <path
                                id="curve"
                                d="M 50 50 m -37 0 a 37 37 0 1 1 74 0 a 37 37 0 1 1 -74 0"
                                fill="transparent"
                            />
                            <text className="text-[11px] font-bold uppercase fill-white tracking-[0.15em]">
                                <textPath href="#curve">
                                    • PROJECT SHOWCASE • PROJECT SHOWCASE
                                </textPath>
                            </text>
                        </svg>
                    </motion.div>
                    <Star className="w-8 h-8 text-white fill-white" />
                </div>
            </div>
        </section>
    );
};

export default HeroSlider;

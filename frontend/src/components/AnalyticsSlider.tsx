import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, CheckCircle, BarChart3, ChevronLeft, ChevronRight } from 'lucide-react';

interface Slide {
    id: number;
    title: string;
    description: string;
    image: string;
    icon: React.ReactNode;
}

const slides: Slide[] = [
    {
        id: 1,
        title: "Complete Business Analytics",
        description: "লাভ-ক্ষতি, অর্ডার ডেটা এবং ব্যবসার গ্রোথ দেখার জন্য রিয়েল-টাইম অ্যানালিটিক্স ড্যাশবোর্ড।",
        image: "https://images.unsplash.com/photo-1551288049-bbbda536339a?q=80&w=2070&auto=format&fit=crop",
        icon: <BarChart3 className="w-6 h-6" />
    },
    {
        id: 2,
        title: "Advanced Price Calculator",
        description: "প্রোডাক্টের প্যাকেজিং এবং অতিরিক্ত খরচ হিসাব করে সঠিক সেলিং প্রাইস বের করার টুল।",
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2011&auto=format&fit=crop",
        icon: <CreditCard className="w-6 h-6" />
    },
    {
        id: 3,
        title: "Daily & Monthly Expenses",
        description: "ব্যবসার প্রতিদিনের এবং মাসিক খরচ ট্র্যাক করার জন্য ডেডিকেটেড এক্সপেন্স প্যানেল।",
        image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop",
        icon: <CheckCircle className="w-6 h-6" />
    }
];

const AnalyticsSlider: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlay, setIsAutoPlay] = useState(true);

    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, []);

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    useEffect(() => {
        if (!isAutoPlay) return;
        const interval = setInterval(nextSlide, 5000);
        return () => clearInterval(interval);
    }, [isAutoPlay, nextSlide]);

    const activeSlide = slides[currentSlide];

    return (
        <div
            className="relative bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden"
            onMouseEnter={() => setIsAutoPlay(false)}
            onMouseLeave={() => setIsAutoPlay(true)}
        >
            <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Content Side */}
                <div className="p-8 lg:p-12 flex flex-col justify-center order-2 lg:order-1">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeSlide.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="inline-flex p-4 bg-purple-500/20 rounded-2xl mb-8">
                                <span className="text-purple-400">{activeSlide.icon}</span>
                            </div>
                            <h3 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-white uppercase tracking-tight">
                                {activeSlide.title}
                            </h3>
                            <p className="text-xl text-gray-400 mb-12 leading-relaxed max-w-lg">
                                {activeSlide.description}
                            </p>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation controls */}
                    <div className="flex items-center gap-6">
                        <div className="flex gap-4">
                            <button
                                onClick={prevSlide}
                                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={nextSlide}
                                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="flex gap-2">
                            {slides.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentSlide(i)}
                                    className={`h-1.5 transition-all duration-500 rounded-full ${currentSlide === i ? 'w-8 bg-purple-500' : 'w-2 bg-white/20'}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Image Side */}
                <div className="relative aspect-[4/3] lg:aspect-auto h-[300px] lg:h-full order-1 lg:order-2 overflow-hidden bg-black/40">
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={activeSlide.id}
                            src={activeSlide.image}
                            alt={activeSlide.title}
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            transition={{ duration: 0.7 }}
                            className="absolute inset-0 w-full h-full object-cover object-top"
                        />
                    </AnimatePresence>
                    <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/80 to-transparent lg:hidden" />
                </div>
            </div>

            {/* Hint Tag */}
            <div className="absolute top-6 right-6 hidden lg:flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/5">
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse" />
                <span className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">Data-Driven Insights</span>
            </div>
        </div>
    );
};

export default AnalyticsSlider;

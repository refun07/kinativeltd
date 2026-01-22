import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';

interface Testimonial {
    id: number;
    quote: string;
    name: string;
    role: string;
    image: string;
    rating: number;
}

const testimonials: Testimonial[] = [
    {
        id: 1,
        quote: "Epikcart আমাদের ব্যবসাকে সম্পূর্ণভাবে পরিবর্তন করে দিয়েছে। এখন সবকিছু এক জায়গায়, অনেক সহজ হয়ে গেছে।",
        name: "রাফি আহমেদ",
        role: "CEO, Fashion Store BD",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=987&auto=format&fit=crop",
        rating: 5
    },
    {
        id: 2,
        quote: "আগে যেখানে ৫ জন লাগতো, এখন ২ জনেই পুরো অপারেশন চালাতে পারছি। ROI অসাধারণ!",
        name: "সাবিহা খান",
        role: "Founder, Tech Gadgets Pro",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=987&auto=format&fit=crop",
        rating: 5
    },
    {
        id: 3,
        quote: "সাপোর্ট টিম দারুণ! যেকোনো সমস্যা হলে তাৎক্ষণিক সমাধান পাই। সত্যিই প্রফেশনাল সার্ভিস।",
        name: "তানভীর হাসান",
        role: "Owner, Organic Foods BD",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=987&auto=format&fit=crop",
        rating: 5
    }
];

const TestimonialSlider: React.FC = () => {
    const [current, setCurrent] = useState(0);
    const [isAutoPlay, setIsAutoPlay] = useState(true);

    const next = useCallback(() => {
        setCurrent((prev) => (prev + 1) % testimonials.length);
    }, []);

    const prev = () => {
        setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    useEffect(() => {
        if (!isAutoPlay) return;
        const interval = setInterval(next, 5000);
        return () => clearInterval(interval);
    }, [isAutoPlay, next]);

    const active = testimonials[current];

    return (
        <div
            className="relative max-w-4xl mx-auto"
            onMouseEnter={() => setIsAutoPlay(false)}
            onMouseLeave={() => setIsAutoPlay(true)}
        >
            <AnimatePresence mode="wait">
                <motion.div
                    key={active.id}
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 1.05, y: -20 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="relative p-8 md:p-16 rounded-[3rem] bg-gradient-to-b from-white/10 to-white/5 border border-white/10 backdrop-blur-xl text-center shadow-2xl"
                >
                    <Quote className="w-16 h-16 text-primary mx-auto mb-10 opacity-20" />

                    <p className="text-2xl md:text-3xl font-medium text-gray-200 leading-relaxed mb-12 italic">
                        "{active.quote}"
                    </p>

                    <div className="flex flex-col items-center">
                        <div className="relative mb-6">
                            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl scale-150" />
                            <img
                                src={active.image}
                                alt={active.name}
                                className="w-20 h-20 rounded-full object-cover border-4 border-primary relative z-10 mx-auto"
                            />
                        </div>
                        <h4 className="text-xl font-bold text-white mb-1 uppercase tracking-wider">{active.name}</h4>
                        <p className="text-primary text-sm font-medium mb-4">{active.role}</p>

                        <div className="flex gap-1">
                            {[...Array(active.rating)].map((_, i) => (
                                <Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                            ))}
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Navigation Controls */}
            <div className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-20 z-20">
                <button
                    onClick={prev}
                    className="w-12 h-12 rounded-full border border-white/10 bg-black/50 backdrop-blur-md flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-20 z-20">
                <button
                    onClick={next}
                    className="w-12 h-12 rounded-full border border-white/10 bg-black/50 backdrop-blur-md flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-3 mt-12">
                {testimonials.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`h-2 rounded-full transition-all duration-500 ${current === i ? 'w-12 bg-primary' : 'w-2 bg-white/20 hover:bg-white/40'}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default TestimonialSlider;

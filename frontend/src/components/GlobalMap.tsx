import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Office {
    id: number;
    city: string;
    country: string;
    description: string;
    coords: { x: number; y: number }; // Percentage 0-100
    delay: number;
}

const offices: Office[] = [
    {
        id: 1,
        city: "Dhaka",
        country: "Bangladesh",
        description: "Global Operations Center",
        coords: { x: 72, y: 55 },
        delay: 0.2
    },
    {
        id: 2,
        city: "Berlin",
        country: "Germany",
        description: "European Design Studio",
        coords: { x: 50, y: 35 },
        delay: 0.4
    },
    {
        id: 3,
        city: "London",
        country: "UK",
        description: "Strategic Innovation Hub",
        coords: { x: 46, y: 33 },
        delay: 0.6
    },
    {
        id: 4,
        city: "New York",
        country: "USA",
        description: "Market Strategy & Sales",
        coords: { x: 25, y: 38 },
        delay: 0.8
    },
    {
        id: 5,
        city: "Melbourne",
        country: "Australia",
        description: "APAC Logistics Center",
        coords: { x: 86, y: 82 },
        delay: 1.0
    }
];

const GlobalMap: React.FC = () => {
    const [hoveredOffice, setHoveredOffice] = useState<Office | null>(null);

    return (
        <section className="py-24 bg-background overflow-hidden relative">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="relative aspect-[21/9] bg-white/[0.02] border border-white/10 rounded-[4rem] overflow-hidden group shadow-2xl"
                >
                    {/* Background Grid Accent */}
                    <div className="absolute inset-0 z-0 opacity-20" style={{
                        backgroundImage: 'radial-gradient(circle, white 0.5px, transparent 0.5px)',
                        backgroundSize: '30px 30px'
                    }} />

                    {/* UI Headers */}
                    <div className="absolute top-10 left-12 z-30">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                            <span className="text-white/40 font-black uppercase tracking-[0.4em] text-[10px]">Global Reach</span>
                        </div>
                        <h3 className="text-2xl font-heading font-bold text-white mt-2 italic uppercase tracking-tighter">Operations Network</h3>
                    </div>

                    <div className="absolute top-10 right-12 z-30 flex items-center gap-4">
                        <div className="flex -space-x-2">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-zinc-800 flex items-center justify-center">
                                    <div className="w-1 h-1 bg-primary rounded-full" />
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center gap-3 bg-black/40 backdrop-blur-md px-4 py-2 rounded-xl border border-white/5">
                            <div className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_10px_#FF3B1D]" />
                            <span className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">Live Offices</span>
                        </div>
                    </div>

                    {/* The Map Component Rendering */}
                    <div className="absolute inset-0 flex items-center justify-center p-20 z-10 select-none">
                        <div className="relative w-full h-full">
                            {/* Dot Matrix Map Background */}
                            <svg viewBox="0 0 1000 450" className="w-full h-full opacity-40">
                                <defs>
                                    <linearGradient id="mapGradient" x1="0" y1="0" x2="1" y2="1">
                                        <stop offset="0%" stopColor="rgba(255,255,255,0.05)" />
                                        <stop offset="50%" stopColor="rgba(255,59,29,0.1)" />
                                        <stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
                                    </linearGradient>
                                </defs>

                                {/* Generative dots that form a stylized world map - Simplified for performance */}
                                {Array.from({ length: 30 }).map((_, row) => (
                                    Array.from({ length: 70 }).map((_, col) => {
                                        const x = col * 15;
                                        const y = row * 15;

                                        // Simplified algorithmic world boundaries
                                        const inMap =
                                            // North America
                                            (x > 80 && x < 250 && y > 80 && y < 220) ||
                                            // South America
                                            (x > 220 && x < 320 && y > 220 && y < 400) ||
                                            // Europe
                                            (x > 450 && x < 550 && y > 60 && y < 160) ||
                                            // Africa
                                            (x > 450 && x < 600 && y > 160 && y < 350) ||
                                            // Asia
                                            (x > 550 && x < 900 && y > 60 && y < 350) ||
                                            // Australia
                                            (x > 800 && x < 950 && y > 300 && y < 420);

                                        if (!inMap) return null;

                                        return (
                                            <circle
                                                key={`${row}-${col}`}
                                                cx={x}
                                                cy={y}
                                                r={1}
                                                fill="white"
                                                className="opacity-20"
                                            />
                                        );
                                    })
                                ))}

                                {/* Data Paths between offices */}
                                <path
                                    d="M 720 240 Q 600 150 480 150"
                                    fill="none"
                                    stroke="url(#mapGradient)"
                                    strokeWidth="1.5"
                                    strokeDasharray="4 4"
                                    className="opacity-40 data-path"
                                />
                                <path
                                    d="M 480 150 Q 350 150 250 170"
                                    fill="none"
                                    stroke="url(#mapGradient)"
                                    strokeWidth="1.5"
                                    strokeDasharray="4 4"
                                    className="opacity-40 data-path"
                                />
                            </svg>

                            {/* Office Interactive Markers */}
                            {offices.map((office) => (
                                <div
                                    key={office.id}
                                    className="absolute"
                                    style={{ left: `${office.coords.x}%`, top: `${office.coords.y}%` }}
                                >
                                    <motion.div
                                        initial={{ scale: 0, opacity: 0 }}
                                        whileInView={{ scale: 1, opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: office.delay, type: "spring", stiffness: 200 }}
                                        onMouseEnter={() => setHoveredOffice(office)}
                                        onMouseLeave={() => setHoveredOffice(null)}
                                        className="relative -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20"
                                    >
                                        {/* Aura Glow */}
                                        <motion.div
                                            className="absolute -inset-6 bg-primary/20 rounded-full blur-2xl"
                                            animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.6, 0.3] }}
                                            transition={{ duration: 3, repeat: Infinity }}
                                        />

                                        {/* Pulsing ring */}
                                        <div className="absolute -inset-3 border border-primary/50 rounded-full animate-ping opacity-75" />

                                        {/* Core Dot */}
                                        <div className="relative w-4 h-4 bg-primary rounded-full shadow-[0_0_20px_#FF3B1D] border-2 border-white/40 group-hover:scale-125 transition-transform" />

                                        {/* Static Label (Floating) */}
                                        <div className="absolute top-6 left-1/2 -translate-x-1/2 pointer-events-none text-center">
                                            <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">{office.city}</span>
                                        </div>

                                        {/* Tooltip on Hover */}
                                        <AnimatePresence>
                                            {hoveredOffice?.id === office.id && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                                                    className="absolute -top-24 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
                                                >
                                                    <div className="bg-zinc-900/90 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow-3xl text-center min-w-[160px]">
                                                        <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-1">{office.country}</p>
                                                        <p className="text-sm font-bold text-white mb-2">{office.city}</p>
                                                        <p className="text-[10px] text-gray-400 font-light leading-tight">{office.description}</p>
                                                    </div>
                                                    <div className="w-3 h-3 bg-zinc-900/90 rotate-45 border-r border-b border-white/20 mx-auto -mt-1.5" />
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Bottom Scanning Beam Effect */}
                    <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-primary/5 to-transparent z-0 overflow-hidden">
                        <motion.div
                            className="w-full h-2 shadow-[0_0_30px_#FF3B1D] bg-primary/20"
                            animate={{ y: [-100, 400] }}
                            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        />
                    </div>

                    {/* Stats Corner */}
                    <div className="absolute bottom-10 right-12 z-30 flex items-center gap-8">
                        <div>
                            <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em] mb-1">Coverage</p>
                            <p className="text-2xl font-heading font-bold text-white tracking-tighter italic">98% Global</p>
                        </div>
                        <div className="w-px h-10 bg-white/10" />
                        <div>
                            <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em] mb-1">Servers</p>
                            <p className="text-2xl font-heading font-bold text-white tracking-tighter italic">24/7 Live</p>
                        </div>
                    </div>

                    <div className="absolute bottom-10 left-12 z-30">
                        <Link to="/contact" className="group flex items-center gap-3 bg-white text-black px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-primary hover:text-white transition-all">
                            View Network Details
                            <Globe className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                        </Link>
                    </div>
                </motion.div>
            </div>

            <style>{`
                @keyframes data-stream {
                    0% { stroke-dashoffset: 100; }
                    100% { stroke-dashoffset: 0; }
                }
                .data-path {
                    animation: data-stream 5s linear infinite;
                }
            `}</style>
        </section>
    );
};

export default GlobalMap;

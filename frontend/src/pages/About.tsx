import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, Target, Users } from 'lucide-react';
import SEO from '../components/SEO';
import { fadeInUp, staggerContainer } from '../utils/animations';

const About: React.FC = () => {
    const [sections, setSections] = useState<any[]>([]);
    const [seoData, setSeoData] = useState<any>(null);

    useEffect(() => {
        fetch('http://localhost:8000/api/content/page-sections?page=about')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data) && data.length > 0) {
                    setSections(data);
                    const seo = data.find((s: any) => s.section_type === 'seo');
                    if (seo) setSeoData(seo.content);
                }
            })
            .catch(err => console.error('Failed to fetch about page sections:', err));
    }, []);

    // Helper to get section by type or order
    const getHeroSection = () => sections.find(s => s.section_type === 'hero') || {
        content: {
            heading: "We are Kinative.",
            description: "We design brands first — then build the software, platforms, and AI-powered experiences that scale them. Our mission is to engineer high-end digital infrastructure that turns world-class identities into global market leaders."
        }
    };

    const getCultureSection = () => sections.find(s => s.section_type === 'text_block' && s.order > 1) || {
        content: {
            heading: "Together We Grow",
            description: "At Kinative, our culture is built on collaboration, innovation, and a relentless pursuit of excellence. We don't just build software; we build the future together."
        }
    };

    const hero = getHeroSection();
    const culture = getCultureSection();

    return (
        <div className="bg-background min-h-screen text-foreground transition-colors duration-500">
            <SEO
                title={seoData?.title}
                description={seoData?.description}
                keywords={seoData?.keywords}
                ogImage={seoData?.og_image}
            />
            {/* Hero Section */}
            <section className="pt-40 pb-20 container mx-auto px-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full mix-blend-screen animate-blob pointer-events-none" />

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-6xl md:text-8xl font-heading font-bold mb-12 leading-tight"
                >
                    {hero.content.heading.split('Kinative').map((part: string, i: number, arr: any[]) => (
                        <React.Fragment key={i}>
                            {part}
                            {i < arr.length - 1 && <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">Kinative</span>}
                        </React.Fragment>
                    ))}
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="text-xl md:text-2xl text-gray-400 max-w-4xl leading-relaxed font-light"
                >
                    {hero.content.description}
                </motion.p>
            </section>

            {/* Values Section */}
            <section className="py-32 bg-secondary/20 border-y border-foreground/5 relative">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="grid grid-cols-1 md:grid-cols-3 gap-12"
                    >
                        {[
                            { icon: Zap, title: "Speed & Precision", desc: "We move fast without breaking things. Our workflows are optimized for rapid deployment and pixel-perfect execution.", color: "text-primary" },
                            { icon: Target, title: "Result Driven", desc: "Beauty is nothing without performance. Every pixel we place has a purpose: to convert and grow your business.", color: "text-blue-500" },
                            { icon: Users, title: "Partner, Not Vendor", desc: "We treat your business like our own. We're in it for the long haul, scaling with you as you grow.", color: "text-purple-500" }
                        ].map((item, index) => (
                            <motion.div key={index} variants={fadeInUp} className="space-y-6 group p-8 rounded-3xl hover:bg-foreground/5 transition-colors duration-500 border border-transparent hover:border-foreground/10">
                                <div className={`w-16 h-16 rounded-2xl bg-foreground/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                                    <item.icon className={`w-8 h-8 ${item.color}`} />
                                </div>
                                <h3 className="text-3xl font-heading font-bold">{item.title}</h3>
                                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-32 container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-20"
                >
                    <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">Our Team</span>
                    <h2 className="text-5xl md:text-7xl font-heading font-bold">The Minds Behind the Magic</h2>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8"
                >
                    {[
                        { name: "Team Member 1", role: "Design Lead", img: "/images/team_1.png" },
                        { name: "Team Member 2", role: "Tech Lead", img: "/images/team_2.png" },
                        { name: "Team Member 3", role: "Project Manager", img: "/images/team_3.jpg" },
                        { name: "Team Member 4", role: "AI Engineer", img: "/images/team_4.jpg" },
                        { name: "Team Member 5", role: "Fullstack Dev", img: "/images/team_5.jpg" }
                    ].map((member, i) => (
                        <motion.div key={i} variants={fadeInUp} className="group relative overflow-hidden rounded-3xl aspect-[3/4] bg-secondary border border-foreground/10">
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                            <div className="absolute inset-0 bg-gray-800 group-hover:scale-105 transition-transform duration-700">
                                <img
                                    src={member.img}
                                    alt={member.name}
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                />
                            </div>
                            <div className="absolute bottom-0 left-0 p-6 z-20 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                <h3 className="text-xl font-heading font-bold mb-1">{member.name}</h3>
                                <p className="text-primary font-bold tracking-widest uppercase text-[10px] mb-4">{member.role}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Culture Section */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-32 rounded-[40px] overflow-hidden relative aspect-[21/9] group"
                >
                    <img
                        src={culture.content.image || "/images/team_full.png"}
                        alt="Team Culture"
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                    <div className="absolute bottom-12 left-12 right-12 flex flex-col md:flex-row justify-between items-end gap-8">
                        <div className="max-w-2xl">
                            <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6 text-white">{culture.content.heading}</h2>
                            <p className="text-white/70 text-lg font-light leading-relaxed">
                                {culture.content.description}
                            </p>
                        </div>
                        <div className="flex gap-4">
                            <button className="px-8 py-4 bg-primary text-white rounded-full font-bold hover:bg-white hover:text-black transition-all duration-300">
                                Join Our Team
                            </button>
                        </div>
                    </div>
                </motion.div>
            </section>
            {/* Team Section */}
            <TeamSection />
        </div>
    );
};

const TeamSection: React.FC = () => {
    const [team, setTeam] = useState<any[]>([]);

    useEffect(() => {
        fetch('http://localhost:8000/api/content/team-members')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setTeam(data);
            })
            .catch(err => console.error('Failed to fetch team:', err));
    }, []);

    if (team.length === 0) return null;

    return (
        <section className="py-32 bg-background border-t border-foreground/5">
            <div className="container mx-auto px-6">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="text-center mb-24"
                >
                    <span className="text-primary font-bold tracking-widest uppercase text-xs mb-4 block">Meet Our Team</span>
                    <h2 className="text-4xl md:text-6xl font-heading font-bold uppercase">The Minds Behind Kinative</h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {team.map((member, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group"
                        >
                            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl mb-6">
                                <img
                                    src={'http://localhost:8000/storage/' + member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                                    onError={(e: any) => {
                                        e.target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(member.name) + '&background=random';
                                    }}
                                />
                            </div>
                            <h3 className="text-2xl font-bold uppercase mb-1">{member.name}</h3>
                            <p className="text-primary text-sm font-bold tracking-widest uppercase">{member.position}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;

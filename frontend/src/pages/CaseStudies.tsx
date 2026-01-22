import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import axios from 'axios';

const CaseStudies: React.FC = () => {
    const [projects, setProjects] = useState<any[]>([]);
    const [seoData, setSeoData] = useState<any>(null);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [projectsRes, seoRes] = await Promise.all([
                    axios.get('http://localhost:8000/api/content/case-studies'),
                    axios.get('http://localhost:8000/api/content/page-sections?page=case-studies')
                ]);
                setProjects(projectsRes.data);
                const seo = seoRes.data.find((section: any) => section.section_type === 'seo');
                if (seo) setSeoData(seo.content);
            } catch (error) {
                console.error("Error fetching case studies:", error);
            }
        };
        fetchData();
    }, []);

    const categories = ['All', ...new Set(projects.map(p => p.category))];
    const filteredProjects = filter === 'All'
        ? projects
        : projects.filter(p => p.category === filter);

    return (
        <div className="bg-background min-h-screen pt-20">
            <SEO
                title={seoData?.title}
                description={seoData?.description}
                keywords={seoData?.keywords}
                ogImage={seoData?.og_image}
            />
            <div className="container mx-auto px-6 py-20">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl md:text-7xl font-heading font-bold mb-12"
                >
                    Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Work</span>.
                </motion.h1>

                <div className="flex flex-wrap gap-4 mb-16">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-6 py-2 rounded-full border border-white/10 transition-colors text-sm font-bold ${filter === cat ? 'bg-white text-black' : 'hover:bg-white/10'}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {filteredProjects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="group cursor-pointer"
                        >
                            <Link to={`/case-studies/${project.slug}`}>
                                <div className="relative overflow-hidden rounded-2xl aspect-video mb-6">
                                    <img
                                        src={project.image.startsWith('http') ? project.image : `http://localhost:8000/storage/${project.image}`}
                                        alt={project.title}
                                        className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-700"
                                        onError={(e: any) => {
                                            e.target.src = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2000';
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                                            <ArrowUpRight className="w-8 h-8 text-black" />
                                        </div>
                                    </div>
                                </div>
                                <h3 className="text-3xl font-bold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                                <p className="text-gray-400">{project.category}</p>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CaseStudies;

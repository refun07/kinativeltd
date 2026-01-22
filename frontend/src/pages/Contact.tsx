import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import axios from 'axios';

const Contact: React.FC = () => {
    const [sections, setSections] = useState<any[]>([]);
    const [seoData, setSeoData] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/content/page-sections?page=contact');
                setSections(response.data);
                const seo = response.data.find((section: any) => section.section_type === 'seo');
                if (seo) setSeoData(seo.content);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const hero = sections.find(s => s.section_type === 'hero') || {
        content: {
            heading: "Let's Build Something Great.",
            description: "Ready to take your brand to the next level? Tell us about your project, and let's make it happen."
        }
    };

    const contactInfo = sections.find(s => s.section_type === 'contact_info') || {
        content: {
            email: "kinativesales@gmail.com",
            phone: "+88 01921805176",
            address: "Flat C-2, House 1188, Avenue 11, Mirpur DOHS, Dhaka 1216"
        }
    };

    return (
        <div className="bg-background min-h-screen pt-20 text-foreground transition-colors duration-500">
            <SEO
                title={seoData?.title}
                description={seoData?.description}
                keywords={seoData?.keywords}
                ogImage={seoData?.og_image}
            />
            <div className="container mx-auto px-6 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
                    {/* Contact Info */}
                    <div className="sticky top-32">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-6xl md:text-8xl font-heading font-bold mb-12 leading-tight"
                        >
                            {hero.content.heading.split(' ').map((word: string, i: number) => (
                                <React.Fragment key={i}>
                                    {word === "Something" || word === "Great." ? (
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">{word} </span>
                                    ) : (
                                        <>{word} </>
                                    )}
                                    {word === "Build" && <br />}
                                </React.Fragment>
                            ))}
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-foreground/60 mb-16 leading-relaxed font-light max-w-lg"
                        >
                            {hero.content.description}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="space-y-10"
                        >
                            <div className="flex items-start space-x-8 group">
                                <div className="w-16 h-16 rounded-2xl bg-foreground/5 flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                                    <Mail className="w-8 h-8 text-foreground group-hover:text-background" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-heading font-bold mb-2">Email Us</h3>
                                    <p className="text-foreground/60 group-hover:text-foreground transition-colors">{contactInfo.content.email}</p>
                                    <p className="text-foreground/40 text-sm mt-1">We reply within 24 hours</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-8 group">
                                <div className="w-16 h-16 rounded-2xl bg-foreground/5 flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                                    <Phone className="w-8 h-8 text-foreground group-hover:text-background" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-heading font-bold mb-2">Call Us</h3>
                                    <p className="text-foreground/60 group-hover:text-foreground transition-colors">{contactInfo.content.phone}</p>
                                    <p className="text-foreground/40 text-sm mt-1">Mon-Fri, 9am-6pm EST</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-8 group">
                                <div className="w-16 h-16 rounded-2xl bg-foreground/5 flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                                    <MapPin className="w-8 h-8 text-foreground group-hover:text-background" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-heading font-bold mb-2">Visit Us</h3>
                                    <p className="text-foreground/60 group-hover:text-foreground transition-colors">{contactInfo.content.address}</p>
                                    <p className="text-foreground/40 text-sm mt-1">Mirpur DOHS, Dhaka 1216</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-card backdrop-blur-xl p-10 md:p-12 rounded-[2.5rem] border border-foreground/10 shadow-2xl"
                    >
                        <form className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 ml-2">Name</label>
                                    <input type="text" className="w-full bg-foreground/5 border border-foreground/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-primary focus:bg-foreground/10 transition-all text-lg placeholder-foreground/20" placeholder="John Doe" />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 ml-2">Email</label>
                                    <input type="email" className="w-full bg-foreground/5 border border-foreground/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-primary focus:bg-foreground/10 transition-all text-lg placeholder-foreground/20" placeholder="john@example.com" />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 ml-2">Service Interest</label>
                                <div className="relative">
                                    <select className="w-full bg-foreground/5 border border-foreground/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-primary focus:bg-foreground/10 transition-all text-lg text-foreground/80 appearance-none cursor-pointer">
                                        <option>$300 - $1,000</option>
                                        <option>$1,000 - $5,000</option>
                                        <option>$5,000 - $10,000</option>
                                        <option>$10,000 - $50,000</option>
                                        <option>$50,000 - $100,000</option>
                                        <option>$100,000 - $1,000,000</option>
                                        <option>$1,000,000+</option>
                                    </select>
                                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none">
                                        <ArrowRight className="w-5 h-5 text-foreground/40 rotate-90" />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 ml-2">Message</label>
                                <textarea className="w-full bg-foreground/5 border border-foreground/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-primary focus:bg-foreground/10 transition-all text-lg min-h-[200px] placeholder-foreground/20 resize-none" placeholder="Tell us about your project goals, timeline, and budget..."></textarea>
                            </div>

                            <button type="submit" className="w-full bg-foreground text-background font-heading font-bold py-6 rounded-2xl hover:bg-primary hover:text-white transition-all duration-300 text-xl shadow-lg hover:shadow-primary/25 flex items-center justify-center gap-3 group">
                                Send Message
                                <ArrowRight className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1" />
                            </button>
                        </form>
                    </motion.div>
                </div>

                {/* Branded Google Map */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="mt-20 rounded-[2.5rem] overflow-hidden border border-foreground/10 h-[500px] shadow-2xl relative group"
                >
                    <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors duration-500 pointer-events-none z-10" />
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1825.1!2d90.36787!3d23.83364!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c12785e2d5e3%3A0x2b27e8a3b0a0dc01!2sAvenue%2011%2C%20Mirpur%20DOHS%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1706000000000!5m2!1sen!2sbd"
                        width="100%"
                        height="100%"
                        style={{ border: 0, filter: 'grayscale(1) invert(0.9) contrast(1.2)' }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="w-full h-full"
                    ></iframe>

                    {/* Overlay Label */}
                    <div className="absolute bottom-8 left-8 z-20 bg-background/90 backdrop-blur-md px-6 py-4 rounded-2xl border border-foreground/10 shadow-lg">
                        <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1">Headquarters</p>
                        <p className="font-bold text-foreground">House 1188, Avenue 11</p>
                        <p className="text-sm text-foreground/60">Mirpur DOHS, Dhaka 1216</p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Contact;

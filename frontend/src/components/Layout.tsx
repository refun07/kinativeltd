import React, { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Menu, Facebook, Linkedin, ArrowRight, X, Globe, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import GlobalMap from './GlobalMap';

const Navbar: React.FC<{ theme: string; isMenuOpen: boolean; toggleMenu: () => void }> = ({ theme, isMenuOpen, toggleMenu }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [hoveredNav, setHoveredNav] = useState<string | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const menuVariants = {
        closed: {
            opacity: 0,
            y: "-100%",
            transition: {
                duration: 0.5,
                ease: "easeInOut" as const
            }
        },
        open: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeInOut" as const
            }
        }
    };

    const linkVariants = {
        closed: { opacity: 0, y: 20 },
        open: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: 0.3 + i * 0.1,
                duration: 0.5,
                ease: "easeOut" as const
            }
        })
    };

    return (
        <>
            <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-background/80 backdrop-blur-md py-2 shadow-lg border-b border-foreground/5' : 'bg-transparent py-6'}`}>
                <div className="container mx-auto px-6 flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group z-50 relative">
                        <img src="/images/logo.png" alt="Kinative" className="h-10 w-auto invert brightness-0 dark:invert-0 dark:brightness-100 transition-all duration-300" style={{ filter: theme === 'light' ? 'invert(1) brightness(0)' : 'none' }} />
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center space-x-2" onMouseLeave={() => setHoveredNav(null)}>
                        {[
                            { name: 'HOME', path: '/' },
                            { name: 'ABOUT US', path: '/about' },
                            { name: 'SERVICES', path: '/services' },
                            { name: 'E360', path: '/e360' },
                            { name: 'GROWTH', path: '/growth-marketing' },
                            { name: 'CASE STUDIES', path: '/case-studies' },
                            { name: 'CONTACT', path: '/contact' }
                        ].map((item) => (
                            <Link
                                key={item.name}
                                to={item.path}
                                onMouseEnter={() => setHoveredNav(item.name)}
                                className="relative px-6 py-3 rounded-full text-xs font-bold text-foreground/80 hover:text-white transition-colors tracking-widest group"
                            >
                                <span className="relative z-10">{item.name}</span>
                                {hoveredNav === item.name && (
                                    <motion.div
                                        layoutId="nav-hover"
                                        className="absolute inset-0 bg-white/10 rounded-full"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    />
                                )}
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center space-x-6 z-50 relative">

                        <a href="tel:+8801921805176" className={`hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-primary hover:text-white transition-all duration-300 group ${isMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                            <Phone className="w-4 h-4 fill-current" />
                            <span>Call Us</span>
                        </a>
                        <div className={`hidden md:block h-6 w-px ${isMenuOpen ? 'bg-foreground/20' : 'bg-foreground/20'}`}></div>
                        <button
                            onClick={toggleMenu}
                            className={`transition-colors transform hover:scale-110 duration-300 ${isMenuOpen ? 'text-foreground' : 'text-foreground hover:text-primary'}`}
                        >
                            {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Full Screen Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={menuVariants}
                        className="fixed inset-0 bg-background z-40 flex flex-col justify-center"
                    >
                        <div className="container mx-auto px-6 h-full flex flex-col justify-center">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-start md:items-center pt-20 md:pt-0">
                                {/* Left Column: Navigation */}
                                <div className="flex flex-col space-y-4 md:space-y-6">
                                    {[
                                        { name: 'HOME', path: '/' },
                                        { name: 'ABOUT US', path: '/about' },
                                        { name: 'SERVICES DETAILS', path: '/services' },
                                        { name: 'PORTFOLIO', path: '/portfolio' },
                                        { name: 'NEWS', path: '/news' },
                                        { name: 'CONTACT', path: '/contact' }
                                    ].map((item, i) => (
                                        <motion.div
                                            key={item.name}
                                            custom={i}
                                            variants={linkVariants}
                                        >
                                            <Link
                                                to={item.path}
                                                onClick={toggleMenu}
                                                className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground hover:text-primary transition-colors uppercase tracking-tight"
                                            >
                                                {item.name}
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Right Column: Contact Info */}
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.5, duration: 0.5 }}
                                    className="flex flex-col space-y-8 md:pl-12 border-l-0 md:border-l border-gray-100"
                                >
                                    <div>
                                        <h4 className="text-lg font-bold text-foreground uppercase tracking-widest mb-6">Contact Info</h4>
                                        <p className="text-gray-600 text-base leading-relaxed mb-2">
                                            Flat C-2, House 1188, Avenue 11,
                                        </p>
                                        <p className="text-gray-600 text-base leading-relaxed">
                                            Mirpur DOHS, Dhaka 1216
                                        </p>
                                    </div>

                                    <div className="flex gap-4">
                                        <a href="https://www.facebook.com/kinatives" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center hover:bg-primary transition-colors">
                                            <Facebook className="w-4 h-4" />
                                        </a>
                                        <a href="https://www.linkedin.com/company/kinative/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center hover:bg-primary transition-colors">
                                            <Linkedin className="w-4 h-4" />
                                        </a>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

const MapSection: React.FC = () => {
    return (
        <section className="bg-background py-24 border-t border-foreground/5 transition-colors duration-500">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <div className="max-w-xl">
                        <h5 className="text-sm font-bold text-primary uppercase tracking-[0.4em] mb-4">Our Operations</h5>
                        <h2 className="text-4xl md:text-5xl font-heading font-bold uppercase tracking-tighter leading-none mb-6">
                            WORLDWIDE <span className="text-foreground/20 italic font-light lowercase">impact</span>
                        </h2>
                        From our global operations center in Dhaka to strategic partnerships across London, Berlin, and Melbourne, we engineer world-class digital infrastructure for the next generation of global brands.
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 pb-4">
                        <div>
                            <h6 className="text-[10px] font-bold text-foreground uppercase tracking-widest mb-2 opacity-50">Headquarters</h6>
                            <p className="text-xs text-gray-400 font-light">Dhaka, Bangladesh</p>
                        </div>
                        <div>
                            <h6 className="text-[10px] font-bold text-foreground uppercase tracking-widest mb-2 opacity-50">Design Hub</h6>
                            <p className="text-xs text-gray-400 font-light">Berlin, Germany</p>
                        </div>
                    </div>
                </div>
                <GlobalMap />
            </div>
        </section>
    );
};

const Footer: React.FC<{ theme: string }> = ({ theme }) => {
    return (
        <footer className="bg-background text-foreground pt-24 pb-12 border-t border-foreground/10 transition-colors duration-500">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
                    <div>
                        <Link to="/" className="inline-block mb-8">
                            <img src="/images/logo.png" alt="Kinative" className="h-8 w-auto transition-all duration-300" style={{ filter: theme === 'light' ? 'invert(1) brightness(0)' : 'none' }} />
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed mb-8 font-light italic">
                            Kinative Ltd empowers businesses to grow with innovation-driven digital solutions.
                        </p>
                        <div className="flex gap-4">
                            <a href="https://www.facebook.com/kinatives" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-foreground/5 border border-foreground/10 flex items-center justify-center hover:bg-primary transition-colors duration-300">
                                <Facebook className="w-4 h-4 text-foreground" />
                            </a>
                            <a href="https://www.linkedin.com/company/kinative/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-foreground/5 border border-foreground/10 flex items-center justify-center hover:bg-primary transition-colors duration-300">
                                <Linkedin className="w-4 h-4 text-foreground" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-lg font-heading font-bold mb-8 uppercase tracking-widest text-primary">Useful Links</h4>
                        <ul className="space-y-4">
                            <li><Link to="/about" className="text-foreground/60 hover:text-foreground transition-colors text-sm font-light">About Us</Link></li>
                            <li><Link to="/case-studies" className="text-foreground/60 hover:text-foreground transition-colors text-sm font-light">Case Study</Link></li>
                            <li><Link to="/services" className="text-foreground/60 hover:text-foreground transition-colors text-sm font-light">Our Service</Link></li>
                            <li><Link to="/blog" className="text-foreground/60 hover:text-foreground transition-colors text-sm font-light">Update Blog</Link></li>
                            <li><Link to="/contact" className="text-foreground/60 hover:text-foreground transition-colors text-sm font-light">Contact Us</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-heading font-bold mb-8 uppercase tracking-widest text-primary">Contact Us</h4>
                        <ul className="space-y-6">
                            <li className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-foreground/5 border border-foreground/10 flex items-center justify-center shrink-0">
                                    <Globe className="w-4 h-4 text-primary" />
                                </div>
                                <span className="text-gray-400 text-sm font-light leading-relaxed">Flat C-2, House 1188, Avenue 11, Mirpur DOHS, Dhaka 1216</span>
                            </li>
                            <li className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-foreground/5 border border-foreground/10 flex items-center justify-center shrink-0">
                                    <Facebook className="w-4 h-4 text-primary" />
                                </div>
                                <a href="mailto:kinativesales@gmail.com" className="text-gray-400 hover:text-white transition-colors text-sm font-light">kinativesales@gmail.com</a>
                            </li>
                            <li className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-foreground/5 border border-foreground/10 flex items-center justify-center shrink-0">
                                    <Phone className="w-4 h-4 text-primary" />
                                </div>
                                <div className="flex flex-col">
                                    <a href="tel:+8801921805176" className="text-gray-400 hover:text-white transition-colors text-sm font-light">+880 1921805176</a>
                                    <a href="tel:+8801343882700" className="text-gray-400 hover:text-white transition-colors text-sm font-light">+880 1343882700</a>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-heading font-bold mb-8 uppercase tracking-widest text-primary">Subscribe Us</h4>
                        <p className="text-gray-400 text-sm mb-6 font-light leading-relaxed">
                            Subscribe our newsletter for future updates. don't worry we don't spam your email address
                        </p>
                        <div className="relative">
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="w-full bg-foreground/5 border border-foreground/10 rounded-full py-4 px-6 text-foreground placeholder-gray-500 focus:outline-none focus:border-primary/50 transition-colors"
                            />
                            <button className="absolute right-2 top-2 bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-foreground hover:text-background transition-all duration-300">
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-foreground/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">
                        2026© Kinative. Brand-Led AI Growth.
                    </p>
                    <div className="flex gap-8">
                        <Link to="/privacy" className="text-gray-500 text-[10px] font-bold uppercase tracking-widest hover:text-white transition-colors">Privacy Policy</Link>
                        <Link to="/terms" className="text-gray-500 text-[10px] font-bold uppercase tracking-widest hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

const Layout: React.FC = () => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col font-sans transition-colors duration-500">
            <Navbar theme={theme} isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
            <main className="flex-grow">
                <Outlet />
            </main>
            <MapSection />
            <Footer theme={theme} />
        </div>
    );
};

export default Layout;

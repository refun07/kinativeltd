import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    BarChart3,
    Monitor,
    Box,
    Folder,
    FileText,
    Search,
    Bell,
    ChevronDown,
    Menu,
    Sun,
    Plus,
    LogOut
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

interface MenuItem {
    name: string;
    icon: React.ReactNode;
    path: string;
    hasSubmenu?: boolean;
}

const AdminLayout: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const location = useLocation();
    const { user, logout } = useAuth();

    const menuItems: MenuItem[] = [
        { name: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" />, path: '/admin/pages' }, // Defaulting to pages for now
        { name: 'Page Content', icon: <FileText className="w-5 h-5" />, path: '/admin/pages' },
        { name: 'Hero Sliders', icon: <Monitor className="w-5 h-5" />, path: '/admin/hero-slides' },
        { name: 'Services', icon: <Box className="w-5 h-5" />, path: '/admin/services' },
        { name: 'Stats', icon: <BarChart3 className="w-5 h-5" />, path: '/admin/stats' },
        { name: 'Files & Media', icon: <Folder className="w-5 h-5" />, path: '/admin/upload' },
    ];

    return (
        <div className="min-h-screen bg-[#F4F7FE] flex">
            {/* Sidebar */}
            <motion.aside
                initial={false}
                animate={{ width: isSidebarOpen ? 260 : 80 }}
                className="bg-white h-screen sticky top-0 border-r border-gray-200 z-50 flex flex-col transition-all duration-300"
            >
                {/* Logo Section */}
                <div className="p-6 flex items-center justify-between border-b border-gray-50 h-20">
                    <Link to="/" className="flex items-center gap-2 overflow-hidden">
                        <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center shrink-0">
                            <span className="text-white font-bold text-lg">K</span>
                        </div>
                        <AnimatePresence>
                            {isSidebarOpen && (
                                <motion.span
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    className="text-xl font-heading font-bold text-gray-800 tracking-tight"
                                >
                                    kinative<span className="text-primary font-black ml-0.5">.</span>
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </Link>
                </div>

                {/* Navigation Menu */}
                <div className="flex-grow overflow-y-auto py-6 px-4 space-y-2 custom-scrollbar">
                    {menuItems.map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group ${location.pathname === item.path
                                ? 'bg-black text-white shadow-lg shadow-gray-200'
                                : 'text-gray-500 hover:bg-gray-50 hover:text-black'
                                }`}
                        >
                            <span className={`shrink-0 ${location.pathname === item.path ? 'text-white' : 'text-gray-400 group-hover:text-black'}`}>
                                {item.icon}
                            </span>
                            <AnimatePresence>
                                {isSidebarOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, width: 0 }}
                                        animate={{ opacity: 1, width: 'auto' }}
                                        exit={{ opacity: 0, width: 0 }}
                                        className="flex items-center justify-between flex-grow whitespace-nowrap overflow-hidden"
                                    >
                                        <span className="font-semibold text-sm">{item.name}</span>
                                        {item.hasSubmenu && (
                                            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${location.pathname === item.path ? '' : 'text-gray-300'}`} />
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </Link>
                    ))}
                </div>

                {/* Logout Section */}
                <div className="p-4 border-t border-gray-100">
                    <button
                        onClick={logout}
                        className="flex items-center gap-4 px-4 py-3 w-full rounded-xl text-red-500 hover:bg-red-50 transition-colors"
                    >
                        <LogOut className="w-5 h-5 shrink-0" />
                        {isSidebarOpen && <span className="font-semibold text-sm uppercase tracking-widest">Logout</span>}
                    </button>
                </div>
            </motion.aside>

            {/* Main Content Body */}
            <div className="flex-grow flex flex-col overflow-hidden">
                {/* Topbar */}
                <header className="bg-white h-20 border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-40">
                    <div className="flex items-center gap-6">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500"
                        >
                            <Menu className="w-6 h-6" />
                        </button>

                        {/* Search Bar */}
                        <div className="hidden md:flex items-center gap-3 bg-gray-50 border border-gray-100 px-4 py-2.5 rounded-xl w-80 group focus-within:border-primary/30 transition-all">
                            <Search className="w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="bg-transparent border-none outline-none text-sm w-full text-gray-700"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Action Buttons */}
                        <div className="flex items-center gap-2 border-r border-gray-100 pr-4 mr-2">
                            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-md shadow-indigo-100 active:scale-95">
                                <Plus className="w-4 h-4" />
                                <span className="hidden sm:inline">ADD NEW</span>
                                <ChevronDown className="w-3 h-3" />
                            </button>

                            <button className="p-2.5 hover:bg-gray-50 rounded-xl transition-colors text-gray-500 relative group">
                                <Sun className="w-5 h-5 group-hover:text-primary transition-colors" />
                            </button>

                            <button className="p-2.5 hover:bg-gray-50 rounded-xl transition-colors text-gray-500 relative group">
                                <Bell className="w-5 h-5 group-hover:text-primary transition-colors" />
                                <span className="absolute top-2 right-2 w-4 h-4 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-full border-2 border-white">4</span>
                            </button>
                        </div>

                        {/* Profile Section */}
                        <div className="flex items-center gap-3 pl-2 cursor-pointer group">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold text-gray-800 leading-none">{user?.name || 'Admin'}</p>
                                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mt-1">{user?.email || 'admin'}</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden border-2 border-white shadow-sm ring-1 ring-gray-100 group-hover:ring-primary transition-all">
                                <img
                                    src="https://ui-avatars.com/api/?name=Admin&background=random"
                                    alt="Admin Profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content Rendering */}
                <main className="flex-grow p-8 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;

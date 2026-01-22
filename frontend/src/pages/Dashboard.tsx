import React from 'react';
import { motion } from 'framer-motion';
import {
    Users,
    ShoppingBag,
    TrendingUp,
    DollarSign,
    Target,
    Clock,
    CheckCircle,
    ArrowUpRight,
    MoreHorizontal,
    Box,
    AlertTriangle
} from 'lucide-react';

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

interface StatCardProps {
    title: string;
    value: string;
    icon: React.ReactNode;
    gradient: string;
    footer: string;
}

const StatCard = ({ title, value, icon, gradient, footer }: StatCardProps) => (
    <motion.div
        variants={itemVariants}
        className={`p-6 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden relative group cursor-pointer ${gradient}`}
    >
        <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                    {icon}
                </div>
                <MoreHorizontal className="text-white/40" />
            </div>
            <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-1">{title}</p>
            <div className="flex items-baseline gap-2">
                <h3 className="text-3xl font-bold text-white tracking-tight">{value}</h3>
                <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full text-white font-bold">+ 100%</span>
            </div>
            <p className="text-white/40 text-[10px] font-bold mt-4 italic uppercase tracking-wider">{footer}</p>
        </div>
        {/* Abstract decorative elements */}
        <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
    </motion.div>
);

const RevenueChart = () => (
    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-50 flex flex-col h-full">
        <div className="flex justify-between items-center mb-8">
            <h4 className="font-bold text-gray-800 text-lg">Revenue Update</h4>
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                    <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Net Sales</span>
                </div>
                <select className="bg-gray-50 border-none outline-none text-xs font-bold py-1.5 px-3 rounded-lg text-gray-500">
                    <option>This Month</option>
                    <option>Last Month</option>
                </select>
            </div>
        </div>
        <div className="flex-grow flex items-end gap-2 pr-4 relative min-h-[250px]">
            {/* Custom SVG Line Chart Implementation */}
            <svg className="w-full h-full" viewBox="0 0 1000 400" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#4F46E5" stopOpacity="0" />
                    </linearGradient>
                </defs>
                {/* Grid Lines */}
                <line x1="0" y1="100" x2="1000" y2="100" stroke="#F1F5F9" strokeWidth="1" />
                <line x1="0" y1="200" x2="1000" y2="200" stroke="#F1F5F9" strokeWidth="1" />
                <line x1="0" y1="300" x2="1000" y2="300" stroke="#F1F5F9" strokeWidth="1" />

                {/* Area Shadow */}
                <path
                    d="M0 350 L100 320 L200 340 L300 150 L400 300 L500 280 L600 50 L700 320 L800 50 L900 350 L1000 380 V400 H0 Z"
                    fill="url(#chartGradient)"
                />

                {/* Main Line */}
                <path
                    d="M0 350 L100 320 L200 340 L300 150 L400 300 L500 280 L600 50 L700 320 L800 50 L900 350 L1000 380"
                    fill="none"
                    stroke="#4F46E5"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="animate-chart-reveal"
                />

                {/* Data Points */}
                <circle cx="300" cy="150" r="6" fill="white" stroke="#4F46E5" strokeWidth="3" />
                <circle cx="600" cy="50" r="6" fill="white" stroke="#4F46E5" strokeWidth="3" />
                <circle cx="800" cy="50" r="6" fill="white" stroke="#4F46E5" strokeWidth="3" />
            </svg>
        </div>
        <div className="flex justify-between mt-6 px-2">
            {['01 Jan', '02 Jan', '03 Jan', '04 Jan', '05 Jan', '06 Jan', '07 Jan', '08 Jan', '09 Jan', '10 Jan'].map(date => (
                <span key={date} className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{date}</span>
            ))}
        </div>
    </div>
);

const CategoryDonut = () => (
    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-50 h-full">
        <div className="flex justify-between items-center mb-10">
            <h4 className="font-bold text-gray-800 text-lg">Top Categories</h4>
            <select className="bg-gray-50 border-none outline-none text-[10px] font-bold py-1 px-2 rounded-lg text-gray-500 uppercase tracking-widest">
                <option>Order Count</option>
            </select>
        </div>
        <div className="relative flex justify-center items-center py-6">
            <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#F1F5F9" strokeWidth="12" />
                <circle
                    cx="50" cy="50" r="40"
                    fill="transparent" stroke="#4F46E5" strokeWidth="12"
                    strokeDasharray="251.2" strokeDashoffset="60"
                    strokeLinecap="round"
                />
                <circle
                    cx="50" cy="50" r="40"
                    fill="transparent" stroke="#E11D48" strokeWidth="12"
                    strokeDasharray="251.2" strokeDashoffset="180"
                    strokeLinecap="round"
                />
                <circle
                    cx="50" cy="50" r="40"
                    fill="transparent" stroke="#F59E0B" strokeWidth="12"
                    strokeDasharray="251.2" strokeDashoffset="220"
                    strokeLinecap="round"
                />
            </svg>
            <div className="absolute text-center">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mb-1">Total Category</p>
                <h5 className="text-3xl font-black text-gray-800">20</h5>
            </div>
        </div>
        <div className="mt-8 space-y-4">
            <button className="w-full py-2 text-xs font-bold text-indigo-600 border-t border-gray-50 hover:bg-gray-50 transition-colors uppercase tracking-widest mt-auto group flex items-center justify-center gap-2">
                View All <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
        </div>
    </div>
);

const Dashboard: React.FC = () => {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-8"
        >
            {/* Upper Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Welcome Card */}
                <motion.div
                    variants={itemVariants}
                    className="lg:col-span-7 bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-50 flex flex-col justify-center relative overflow-hidden"
                >
                    <div className="relative z-10">
                        <h2 className="text-3xl font-black text-gray-900 mb-2 tracking-tight italic">Hey Admin!</h2>
                        <h3 className="text-xl font-bold text-gray-500 mb-8 uppercase tracking-wider">Welcome Back to Your Dashboard</h3>
                        <p className="text-sm font-bold text-indigo-600 uppercase tracking-[0.2em] mb-6">You have new notifications!</p>

                        <div className="flex gap-4">
                            {[
                                { count: 34, label: 'Orders', color: 'bg-green-100 text-green-600' },
                                { count: 0, label: 'Sellers', color: 'bg-indigo-100 text-indigo-600' },
                                { count: 77, label: 'Customers', color: 'bg-red-100 text-red-600' }
                            ].map((stat, i) => (
                                <div key={i} className={`flex items-center gap-3 px-4 py-2 rounded-2xl ${stat.color} font-bold text-sm`}>
                                    <span className="text-lg font-black">{stat.count}</span>
                                    <span className="text-[10px] uppercase tracking-widest">{stat.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Decorative pattern component placeholder */}
                    <div className="absolute right-[-10%] bottom-[-20%] w-[300px] h-[300px] bg-indigo-50/50 rounded-full blur-[100px]" />
                </motion.div>

                {/* Goal Card */}
                <motion.div
                    variants={itemVariants}
                    className="lg:col-span-5 bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-50 bg-gradient-to-br from-indigo-500 to-indigo-700 relative overflow-hidden flex flex-col justify-center"
                >
                    <div className="relative z-10 text-white">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h4 className="text-4xl font-black italic tracking-tighter mb-1">Tk100,000</h4>
                                <p className="text-sm font-bold text-white/70 uppercase tracking-widest">Your goal is all set!</p>
                            </div>
                            <button className="text-[10px] font-bold uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full backdrop-blur-md">Edit Goal</button>
                        </div>
                        <p className="text-xs font-medium text-white/50 mb-8">Track your progress on daily basis.</p>

                        <div className="h-2 bg-black/20 rounded-full mb-2 overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: '65%' }}
                                transition={{ delay: 1, duration: 1 }}
                                className="h-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                            />
                        </div>
                        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-white/60 pt-6">
                            <span>Duration: 01 Jan, 2026 - 31 Jan, 2026</span>
                        </div>
                    </div>
                    {/* Goal illustration placeholder */}
                    <Target className="absolute right-6 top-1/2 -translate-y-1/2 w-32 h-32 text-white/10 -rotate-12" />
                </motion.div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <StatCard
                    title="Total Orders"
                    value="06"
                    icon={<ShoppingBag className="w-6 h-6 text-white" />}
                    gradient="bg-gradient-to-br from-amber-400 to-amber-600"
                    footer="This Week"
                />
                <StatCard
                    title="Sales"
                    value="Tk44,960"
                    icon={<DollarSign className="w-6 h-6 text-white" />}
                    gradient="bg-gradient-to-br from-sky-400 to-sky-600"
                    footer="This Week"
                />
                <StatCard
                    title="Total Sellers"
                    value="00"
                    icon={<Users className="w-6 h-6 text-white" />}
                    gradient="bg-gradient-to-br from-indigo-500 to-indigo-700 shadow-indigo-200"
                    footer="This Week"
                />
                <StatCard
                    title="Total Customers"
                    value="01"
                    icon={<CheckCircle className="w-6 h-6 text-white" />}
                    gradient="bg-gradient-to-br from-fuchsia-400 to-fuchsia-600"
                    footer="This Week"
                />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <motion.div variants={itemVariants} className="lg:col-span-2">
                    <RevenueChart />
                </motion.div>
                <motion.div variants={itemVariants}>
                    <CategoryDonut />
                </motion.div>
            </div>

            {/* Tables Area */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12">
                {/* Recent Orders */}
                <motion.div
                    variants={itemVariants}
                    className="lg:col-span-8 bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-50 flex flex-col"
                >
                    <div className="flex justify-between items-center mb-8">
                        <div className="flex items-center gap-2">
                            <h4 className="font-bold text-gray-800 text-lg">Recent Orders</h4>
                            <span className="text-[10px] font-bold bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">(00)</span>
                        </div>
                        <button className="text-xs font-bold text-indigo-600 uppercase tracking-widest">View All</button>
                    </div>
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                            <ShoppingBag className="w-8 h-8 text-gray-200" />
                        </div>
                        <p className="text-sm font-bold text-gray-300 uppercase tracking-[0.2em]">No data found</p>
                    </div>
                </motion.div>

                {/* Order Status Timeline */}
                <motion.div
                    variants={itemVariants}
                    className="lg:col-span-4 bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-50"
                >
                    <div className="flex justify-between items-center mb-10">
                        <div className="flex items-center gap-2">
                            <h4 className="font-bold text-gray-800 text-lg">Order Status</h4>
                            <span className="text-[10px] font-bold bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">(10)</span>
                        </div>
                    </div>
                    <div className="space-y-6">
                        {[
                            { status: 'Order has been placed', time: '12:20 PM • 18 Jan, 2026', color: 'bg-green-50 text-green-600' },
                            { status: 'Order has been placed', time: '12:20 PM • 18 Jan, 2026', color: 'bg-sky-50 text-sky-600' },
                            { status: 'Order has been placed', time: '12:20 PM • 18 Jan, 2026', color: 'bg-red-50 text-red-600' }
                        ].map((item, i) => (
                            <div key={i} className="flex gap-4">
                                <div className={`w-10 h-10 rounded-xl ${item.color.split(' ')[0]} flex items-center justify-center shrink-0`}>
                                    <Clock className={`w-5 h-5 ${item.color.split(' ')[1]}`} />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-800 mb-1">{item.status}</p>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">{item.time}</span>
                                        <div className="w-1 h-1 bg-gray-200 rounded-full" />
                                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Order Placed</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Additional Metrics Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
                <motion.div variants={itemVariants} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-50">
                    <div className="flex justify-between items-center mb-8">
                        <div className="flex items-center gap-2">
                            <h4 className="font-bold text-gray-800 text-lg tracking-tight italic">Top Brands</h4>
                            <span className="text-[10px] font-bold bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full">11</span>
                        </div>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Order Count</span>
                    </div>
                    <div className="space-y-6">
                        {[
                            { name: 'Design Studio', count: 127, icon: 'DS' },
                            { name: 'Design Hub', count: 110, icon: 'DH' },
                            { name: 'Kinative', count: 56, icon: 'KN' }
                        ].map((brand, i) => (
                            <div key={i} className="flex items-center justify-between group cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-gray-50 flex items-center justify-center rounded-xl font-black text-gray-300 text-xs shadow-inner group-hover:bg-indigo-50 transition-colors">
                                        {brand.icon}
                                    </div>
                                    <p className="font-bold text-gray-700 text-sm">{brand.name}</p>
                                </div>
                                <span className="text-xs font-black text-gray-400">{brand.count}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                <motion.div variants={itemVariants} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-50 flex flex-col">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 bg-teal-500 rounded-2xl text-white shadow-lg shadow-teal-100 italic font-black">
                            <Box className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Products</p>
                            <h4 className="text-3xl font-black italic tracking-tighter text-teal-600">32</h4>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 bg-indigo-500 rounded-2xl text-white shadow-lg shadow-indigo-100 italic font-black">
                            <AlertTriangle className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Stock Out</p>
                            <h4 className="text-3xl font-black italic tracking-tighter text-indigo-500">18</h4>
                        </div>
                    </div>
                    <button className="mt-auto w-full py-4 rounded-2xl bg-gray-50 text-gray-400 font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-gray-100 transition-colors">View All Products</button>
                </motion.div>

                <motion.div variants={itemVariants} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-50">
                    <div className="flex justify-between items-center mb-8">
                        <div className="flex items-center gap-2">
                            <h4 className="font-bold text-gray-800 text-lg italic">Earnings From Seller</h4>
                            <span className="text-[10px] font-bold bg-gray-100 text-gray-400 px-2 py-0.5 rounded-full">00</span>
                        </div>
                    </div>
                    <div className="space-y-6">
                        {[
                            { name: 'Organic Shop', earning: 'Tk0.00' },
                            { name: 'Organic Mall', earning: 'Tk0.00' },
                            { name: 'Urban Studio', earning: 'Tk0.00' }
                        ].map((seller, i) => (
                            <div key={i} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                                <span className="text-sm font-bold text-gray-500">{seller.name}</span>
                                <span className="text-xs font-black text-gray-400 italic">{seller.earning}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Final Row: Recent & Selling Products */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <motion.div variants={itemVariants} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-50">
                    <h4 className="font-bold text-gray-800 text-lg italic mb-6">Recent Products (10)</h4>
                    <div className="space-y-4">
                        {[
                            { name: 'Elegant Hanging Light', price: 'Tk2,000', stock: 50 },
                            { name: 'Luxury Sofa Set', price: 'Tk45,000', stock: 12 },
                            { name: 'Modern Urban Table', price: 'Tk12,500', stock: 0 }
                        ].map((prod, i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-gray-50/50 rounded-2xl hover:bg-indigo-50/30 transition-colors cursor-pointer group">
                                <div className="flex gap-4 items-center">
                                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 p-2 overflow-hidden ring-1 ring-gray-100 group-hover:ring-primary transition-all">
                                        <Box className="w-full h-full text-gray-200" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-800 text-sm tracking-tight">{prod.name}</p>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Unit: 01</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-black text-indigo-600 italic text-sm">{prod.price}</p>
                                    <p className={`text-[10px] font-bold uppercase tracking-widest ${prod.stock > 0 ? 'text-green-500' : 'text-red-500'}`}>{prod.stock > 0 ? 'In Stock' : 'Out of Stock'}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                <motion.div variants={itemVariants} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-50">
                    <h4 className="font-bold text-gray-800 text-lg italic mb-6">Most Selling Products (10)</h4>
                    <div className="space-y-4">
                        {[
                            { name: 'Luxury Sofa Set', sales: 120 },
                            { name: 'Elegant Hanging Light', sales: 115 },
                            { name: 'Modern Urban Table', sales: 84 }
                        ].map((prod, i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl hover:shadow-lg hover:shadow-indigo-50 transition-all cursor-pointer">
                                <div className="flex gap-4 items-center">
                                    <div className="w-12 h-12 bg-gray-50 rounded-xl p-2">
                                        <TrendingUp className="w-full h-full text-indigo-400/50" />
                                    </div>
                                    <p className="font-bold text-gray-800 text-sm tracking-tight">{prod.name}</p>
                                </div>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-xl font-black text-gray-900 italic tracking-tighter font-heading">{prod.sales}</span>
                                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">Sold</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Dashboard;

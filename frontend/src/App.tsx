import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import { AuthProvider } from './contexts/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import CaseStudies from './pages/CaseStudies';
import E360 from './pages/E360';
import GrowthMarketing from './pages/GrowthMarketing';
import CaseStudyDetail from './pages/CaseStudyDetail';
import ServiceDetail from './components/ServiceDetail';
import Services from './pages/Services';
import PlaceholderPage from './pages/PlaceholderPage';
import AdminUpload from './pages/AdminUpload';
import StatsManager from './pages/admin/StatsManager';
import PageContentManager from './pages/admin/PageContentManager';
import HeroSlideManager from './pages/admin/HeroSlideManager';
import ServiceManager from './pages/admin/ServiceManager';
import { servicesData } from './data/services';

import AdminLayout from './components/AdminLayout';
import { HelmetProvider } from 'react-helmet-async';

const ServiceDetailWrapper = () => {
    const { id } = useParams<{ id: string }>();

    // Map of route parameters to servicesData keys (supports both slugs and numeric IDs)
    const routeToKeyMap: Record<string, string> = {
        // Slug-based routes
        'brand-design': 'brandDesign',
        'software-product-design': 'productDesign',
        'website-design': 'websiteDesign',
        'ai-design': 'aiDesign',
        'growth-marketing-systems': 'marketingSystems',
        // Numeric ID routes
        '01': 'brandDesign',
        '02': 'productDesign',
        '03': 'websiteDesign',
        '04': 'aiDesign',
        '05': 'marketingSystems'
    };

    const dataKey = id ? routeToKeyMap[id] : null;
    const data = dataKey ? servicesData[dataKey] : null;

    if (!data) return <PlaceholderPage title="Service Not Found" />;
    return <ServiceDetail {...data} />;
};

function App() {
    return (
        <HelmetProvider>
            <AuthProvider>
                <Router>
                    <ScrollToTop />
                    <Routes>
                        <Route element={<Layout />}>
                            <Route path="/" element={<Home />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/case-studies" element={<CaseStudies />} />
                            <Route path="/case-studies/:id" element={<CaseStudyDetail />} />
                            <Route path="/e360" element={<E360 />} />
                            <Route path="/growth-marketing" element={<GrowthMarketing />} />

                            <Route path="/services" element={<Services />} />
                            <Route path="/services/:id" element={<ServiceDetailWrapper />} />
                        </Route>

                        {/* Auth Routes (No Layout) */}
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />

                        {/* Protected Admin Routes */}
                        <Route element={<ProtectedRoute />}>
                            <Route element={<AdminLayout />}>
                                <Route path="/dashboard" element={<Dashboard />} />
                                <Route path="/analytics" element={<PlaceholderPage title="Analytics Coming Soon" />} />
                                <Route path="/crm" element={<PlaceholderPage title="CRM Coming Soon" />} />
                                <Route path="/orders" element={<PlaceholderPage title="Orders Coming Soon" />} />
                                <Route path="/pos" element={<PlaceholderPage title="POS Coming Soon" />} />
                                <Route path="/products" element={<PlaceholderPage title="Products Coming Soon" />} />
                                <Route path="/inventory" element={<PlaceholderPage title="Inventory Coming Soon" />} />
                                <Route path="/resources" element={<PlaceholderPage title="Resources Coming Soon" />} />
                                <Route path="/promotions" element={<PlaceholderPage title="Promotions Coming Soon" />} />
                                <Route path="/shipping" element={<PlaceholderPage title="Shipping Coming Soon" />} />
                                <Route path="/files" element={<PlaceholderPage title="Files Coming Soon" />} />
                                <Route path="/chat" element={<PlaceholderPage title="Chat Coming Soon" />} />
                                <Route path="/admin/upload" element={<AdminUpload />} />
                                <Route path="/admin/stats" element={<StatsManager />} />
                                <Route path="/admin/pages" element={<PageContentManager />} />
                                <Route path="/admin/hero-slides" element={<HeroSlideManager />} />
                                <Route path="/admin/services" element={<ServiceManager />} />
                            </Route>
                        </Route>
                    </Routes>
                </Router>
            </AuthProvider>
        </HelmetProvider>
    );
}

export default App;

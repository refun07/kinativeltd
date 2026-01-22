import { Monitor, Box, Database, Folder, BarChart } from 'lucide-react';

export interface ServicePrice {
    tier: string;
    price: string;
    features: string[];
    isPopular?: boolean;
}

export interface ServiceData {
    id: string;
    title: string;
    description: string;
    longDescription?: string;
    features: string[];
    icon: any;
    color: string;
    pricing: ServicePrice[];
    process: { title: string; description: string }[];
    valuePropositions: { title: string; desc: string }[];
    seo?: {
        title?: string;
        description?: string;
        keywords?: string;
    };
}

export const servicesData: Record<string, ServiceData> = {
    brandDesign: {
        id: "01",
        title: "Global Brand Design",
        description: "Build a brand that resonates. We create visual identities that tell your story and command global authority.",
        longDescription: "You have a vision that deserves to be seen. We partner with you to build a comprehensive visual identity that doesn't just look good—it tells your unique story. From the first handshake to global scaling, we ensure your brand commands authority and connects deeply with your audience.",
        icon: Folder,
        color: "#FF3B1D",
        features: ["Visual Identity Systems", "Logo Design & Typography", "Brand Strategy", "Design Systems", "Brand Guidelines", "Marketing Collateral"],
        seo: {
            title: "Global Brand Design & Visual Identity Systems | Kinative",
            description: "Build a world-class brand identity that resonates globally. Professional logo design, typography, and design systems engineered for authority.",
            keywords: "brand design, visual identity, logo design dhaka, brand strategy usa, design systems australia"
        },
        valuePropositions: [
            { title: "Global Authority", desc: "Build a brand that stands strong in NY, London, or Dubai." },
            { title: "Psychological Accuracy", desc: "Colors and shapes tested for emotional impact." },
            { title: "Scalable Systems", desc: "Design that grows from business cards to billboards." }
        ],
        pricing: [
            { tier: "Starter", price: "$499", features: ["1 Identity System", "Logo Suite", "Basic Guidelines", "Social Assets"] },
            { tier: "Scale", price: "$1,499", features: ["Full Brand Book", "Design System", "Custom Iconography", "3D Elements"], isPopular: true },
            { tier: "Enterprise", price: "Custom", features: ["Global Strategy", "Internal Branding", "Ongoing Creative Dir", "Motion Branding"] }
        ],
        process: [
            { title: "Discovery", description: "Auditing your brand and global market landscape." },
            { title: "Strategy", description: "Defining unique positioning for global resonance." },
            { title: "Design", description: "Visualizing the soul through high-end aesthetics." },
            { title: "Scale", description: "Extending the system for all digital touchpoints." }
        ]
    },
    productDesign: {
        id: "02",
        title: "Software & Product Design",
        description: "Digital products built for humans. We create intuitive software that feels like a natural extension of your brand.",
        longDescription: "Great software shouldn't feel like a puzzle. We focus on the humans behind the screen, engineering digital products that are as intuitive as they are powerful. By bridging the gap between luxury design and technical precision, we help you build products that users actually love to use.",
        icon: Box,
        color: "#4A90E2",
        features: ["SaaS Product Design", "Custom Web Platforms", "Enterprise Software", "UX Research", "Interactive Prototypes", "Scalable Architecture"],
        seo: {
            title: "SaaS & Enterprise Product Design | Premium UX/UI Services",
            description: "Expert software product design focusing on user retention and scalable architecture. We build complex SaaS platforms with a luxury brand feel.",
            keywords: "product design, saas ui design, enterprise software ux, software development, ux research"
        },
        valuePropositions: [
            { title: "Engineering First", desc: "Design that respects technical constraints and performance." },
            { title: "Brand Integration", desc: "Every button and modal feels like your company's DNA." },
            { title: "User Retention", desc: "UX built to keep users engaged and reduce churn." }
        ],
        pricing: [
            { tier: "Prototype", price: "$999", features: ["3 Core Screens", "Clickable Map", "User Flow Docs", "Style Guide"] },
            { tier: "MVP Design", price: "$2,999", features: ["Full Product UI", "Design System", "Dev Handoff", "Interactive Prototype"], isPopular: true },
            { tier: "Full Product", price: "Custom", features: ["End-to-end UX/UI", "Platform Scaling", "Post-launch Support", "User Discovery"] }
        ],
        process: [
            { title: "Concept", description: "Aligning product function with brand vision." },
            { title: "UX Flow", description: "Mapping frictionless journeys for global users." },
            { title: "UI Design", description: "Pixel-perfect interface design with luxury feel." },
            { title: "Handoff", description: "Developer-ready assets with full documentation." }
        ]
    },
    websiteDesign: {
        id: "03",
        title: "High-Performance Websites",
        description: "Your 24/7 global storefront. We design high-performance sites that turn curious visitors into loyal customers.",
        longDescription: "Your website is the heart of your digital presence. We move beyond generic templates to craft cinematic web experiences tailored to your business goals. By combining stunning aesthetics with tactical conversion, we ensure your site works as hard as you do to grow your brand.",
        icon: Monitor,
        color: "#10B981",
        features: ["High-Conversion Landers", "Corporate Websites", "E-commerce Platforms", "Responsive Design", "Speed Optimization", "SEO-Focused Layouts"],
        seo: {
            title: "High-Performance Website Design | Conversion-Led Digital Experiences",
            description: "Custom websites engineered for speed and conversion. We build high-end corporate sites and e-commerce platforms that dominate search results.",
            keywords: "website design, ecommerce development, high conversion landing pages, seo optimized websites"
        },
        valuePropositions: [
            { title: "Conversion Led", desc: "Strategic funnels hidden in beautiful design." },
            { title: "Extreme Speed", desc: "Optimized for sub-second page loads globally." },
            { title: "SEO Foundation", desc: "Built with search ranking in mind from day one." }
        ],
        pricing: [
            { tier: "Landing Page", price: "$799", features: ["High-Impact UI", "Copywriting", "SEO Setup", "Mobile Ready"] },
            { tier: "Business Site", price: "$1,999", features: ["Up to 10 Pages", "CMS Integration", "Custom Graphics", "Speed Tune-up"], isPopular: true },
            { tier: "E-commerce", price: "Custom", features: ["Integrated Checkout", "Inventory Sync", "Global Payments", "Scale Ready"] }
        ],
        process: [
            { title: "Goal Setting", description: "Defining conversion targets and user intent." },
            { title: "Structure", description: "Building the visual narrative and information flow." },
            { title: "Development", description: "Clean, fast, robust code using modern stacks." },
            { title: "Launch", description: "Growth-focused deployment and monitoring." }
        ]
    },
    aiDesign: {
        id: "04",
        title: "Intelligent AI Systems",
        description: "AI that helps, not hinders. We design smart, human-centric features that make your workflows feel effortless.",
        longDescription: "AI is a tool, and tools should empower people. We design 'Human-Centric AI' interfaces that strip away the complexity of algorithms and replace it with intuitive utility. Whether it's an assistant or a workflow, we make artificial intelligence feel like a helping hand, not a robotic chore.",
        icon: Database,
        color: "#8B5CF6",
        features: ["AI Integration Strategy", "Custom AI Assistants", "Automated Workflows", "Generative UX", "Human-AI Interaction", "Efficiency Audits"],
        seo: {
            title: "Human-Centric AI Design & Integration | Intelligent User Experiences",
            description: "Design and implement AI-powered features that enhance user efficiency and engagement. We build smart, human-focused AI solutions.",
            keywords: "ai design, artificial intelligence integration, human-ai interaction, generative ux, ai automation"
        },
        valuePropositions: [
            { title: "Seamless Utility", desc: "AI that helps users without the friction of learning." },
            { title: "Future Ready", desc: "Scalable models that grow with new AI capabilities." },
            { title: "Brand Soul", desc: "Keeping the human voice even in automated flows." }
        ],
        pricing: [
            { tier: "Audit", price: "$499", features: ["AI Opportunity Map", "Workflow Audit", "Strategic Roadmap", "Tool Selection"] },
            { tier: "Implementation", price: "$2,499", features: ["Custom AI Flow", "UI Integration", "Prompt Engineering", "Human-in-loop"], isPopular: true },
            { tier: "Enterprise AI", price: "Custom", features: ["Custom LLM UI", "Total Process Auto", "Internal AI Tools", "Dedicated Support"] }
        ],
        process: [
            { title: "Analysis", description: "Finding AI opportunities within your business." },
            { title: "Workflow", description: "Designing effective AI-human collaboration loops." },
            { title: "Integration", description: "Seamless backend layering and UI design." },
            { title: "Refinement", description: "Prompt & flow optimization for accuracy." }
        ]
    },
    marketingSystems: {
        id: "05",
        title: "Strategic Growth Systems",
        description: "Scale your reach with confidence. We build sustainable marketing engines designed for predictable, long-term growth.",
        longDescription: "Sustainable growth isn't about luck; it's about building a system that works. We combine data-driven precision with the power of brand storytelling to create marketing engines that scale with your ambitions. From finding your first customers to dominating your market, we're here to guide your journey.",
        icon: BarChart,
        color: "#F59E0B",
        features: ["Growth Marketing Strategy", "Performance Campaigns", "Content Mastery", "Market Analytics", "Conversion Funnels", "Retention Systems"],
        seo: {
            title: "Performance Driven Growth Marketing | Strategic Scaling Systems",
            description: "Dominate your market with data-driven growth marketing systems. We build end-to-end funnels and high-impact campaigns for global scaling.",
            keywords: "growth marketing, performance marketing, conversion funnels, brand marketing strategy, digital growth"
        },
        valuePropositions: [
            { title: "Data Precision", desc: "Decisions made on math, not just 'feeling'." },
            { title: "Story Integrity", desc: "Ads that actually sound like your brand." },
            { title: "Full Funnel", desc: "From 'Who are you?' to 'Life-long customer'." }
        ],
        pricing: [
            { tier: "Strategy", price: "$999/mo", features: ["Channel Audit", "Funnels Design", "Ads Creative Dir", "Weekly Data"] },
            { tier: "Full Funnel", price: "$2,499/mo", features: ["Ads Management", "Creative Production", "Email Automation", "Retargeting"], isPopular: true },
            { tier: "Dominance", price: "Custom", features: ["Multi-channel Scale", "Influencer Strategy", "Global Expansion", "24/7 Monitoring"] }
        ],
        process: [
            { title: "Funnel Setup", description: "Building the custom growth engine infrastructure." },
            { title: "Execution", description: "Deploying high-impact creative and precise ads." },
            { title: "Analysis", description: "Real-time performance tracking and iteration." },
            { title: "Scaling", description: "Expanding reach and ROI across global markets." }
        ]
    }
};

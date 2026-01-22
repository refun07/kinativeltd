import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    ogImage?: string;
    ogUrl?: string;
}

const SEO: React.FC<SEOProps> = ({
    title = "Kinative | Best Digital Agency in BD, USA & Australia",
    description = "Kinative is a premier digital agency specializing in Brand Design, Software Development, and AI Growth Marketing. Serving clients in Bangladesh, USA, Melbourne, and worldwide.",
    keywords = "digital marketing agency, brand design bangladesh, software development usa, seo melbourne, ai growth systems",
    ogImage = "/images/og-image.jpg",
    ogUrl = typeof window !== 'undefined' ? window.location.href : ''
}) => {
    return (
        <Helmet>
            {/* Standard metadata tags */}
            <title>{title}</title>
            <meta name='description' content={description} />
            <meta name='keywords' content={keywords} />

            {/* Open Graph Meta Tags */}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:url" content={ogUrl} />
            <meta property="og:type" content="website" />

            {/* Twitter Card Meta Tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={ogImage} />

            {/* Local SEO / Geo Targeting Tags */}
            {/* Bangladesh */}
            <meta name="geo.region" content="BD" />
            <meta name="geo.placename" content="Dhaka" />
            <meta name="geo.position" content="23.8103;90.4125" />
            <meta name="ICBM" content="23.8103, 90.4125" />

            {/* USA */}
            <meta name="geo.region" content="US-NY" />
            <meta name="geo.placename" content="New York" />
            <meta name="geo.position" content="40.7128;-74.0060" />
            <meta name="ICBM" content="40.7128, -74.0060" />

            {/* Australia */}
            <meta name="geo.region" content="AU-VIC" />
            <meta name="geo.placename" content="Melbourne" />
            <meta name="geo.position" content="-37.8136;144.9631" />
            <meta name="ICBM" content="-37.8136, 144.9631" />

            {/* JSON-LD Schema.org Markup */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Organization",
                    "name": "Kinative",
                    "url": "http://localhost:5173",
                    "logo": "http://localhost:5173/favicon.png",
                    "sameAs": [
                        "https://facebook.com/kinative",
                        "https://linkedin.com/company/kinative",
                        "https://twitter.com/kinative"
                    ],
                    "contactPoint": {
                        "@type": "ContactPoint",
                        "telephone": "+8801921805176",
                        "contactType": "customer service",
                        "areaServed": ["BD", "US", "AU"],
                        "availableLanguage": "English"
                    }
                })}
            </script>
        </Helmet>
    );
};

export default SEO;

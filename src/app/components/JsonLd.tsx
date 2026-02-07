export default function JsonLd() {
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Ace Elevate",
        "url": "https://kairikana.vercel.app",
        "logo": "https://kairikana.vercel.app/logo.png",
        "sameAs": [
            "https://www.instagram.com/ace_elevate.ai",
            "https://www.tiktok.com/@acelevate.ai"
        ]
    };

    const softwareSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Kairi Kana - Agentic AI Personal Assistant",
        "alternateName": ["Kairi AI", "Kairi Kana AI", "Ace Elevate AI"],
        "description": "The world's first context-aware Agentic AI assistant living in WhatsApp. Powered by 16 core AI agents for seamless task automation, expense logging, and flow state management.",
        "applicationCategory": "ProductivityApplication",
        "operatingSystem": "Cross-platform, WhatsApp, Web",
        "offers": {
            "@type": "Offer",
            "price": "12.99",
            "priceCurrency": "USD",
            "priceValidUntil": "2026-12-31",
            "availability": "https://schema.org/OnlineOnly",
            "url": "https://kairikana.vercel.app",
            "category": "Subscription"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "ratingCount": "500",
            "bestRating": "5",
            "worstRating": "1"
        },
        "featureList": [
            "Agentic AI Core",
            "16 Specialized Agents",
            "WhatsApp Integration",
            "Expense Logging",
            "Habit Tracking",
            "Smart Scheduling"
        ],
        "creator": {
            "@type": "Organization",
            "name": "Ace Elevate",
            "url": "https://kairikana.vercel.app"
        }
    };

    const webSiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Kairi Kana AI",
        "alternateName": ["Kairi AI", "Kairi Kana Agentic AI"],
        "url": "https://kairikana.vercel.app",
        "description": "Official home of Kairi Kana, the Agentic AI assistant.",
        "publisher": {
            "@type": "Organization",
            "name": "Ace Elevate"
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
            />
        </>
    );
}

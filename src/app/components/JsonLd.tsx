export default function JsonLd() {
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Ace Elevate",
        "url": "https://kairikana.vercel.app",
        "logo": "https://kairikana.vercel.app/logo.png",
        "sameAs": []
    };

    const softwareSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Kairi Kana",
        "description": "AI-powered personal assistant that lives in WhatsApp. Snap photos, organize tasks, track habits, and manage your life with zero app fatigue.",
        "applicationCategory": "ProductivityApplication",
        "operatingSystem": "Web, WhatsApp",
        "offers": {
            "@type": "Offer",
            "price": "12.99",
            "priceCurrency": "USD",
            "priceValidUntil": "2025-12-31",
            "availability": "https://schema.org/OnlineOnly",
            "url": "https://kairikana.vercel.app",
            "category": "Subscription"
        },
        "creator": {
            "@type": "Organization",
            "name": "Ace Elevate",
            "url": "https://kairikana.vercel.app"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "5",
            "ratingCount": "1"
        }
    };

    const webSiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Kairi Kana",
        "url": "https://kairikana.vercel.app",
        "description": "AI-powered personal assistant that lives in WhatsApp",
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

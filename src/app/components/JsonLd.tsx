export default function JsonLd() {
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Ace Elevate",
        "alternateName": ["Ace Elevate Global", "Ace Elevate AI"],
        "url": "https://kairikana.vercel.app",
        "logo": "https://kairikana.vercel.app/logo.png",
        "description": "Ace Elevate builds Kairi Kana, the world's first Agentic AI personal assistant for Gen Z that lives inside WhatsApp.",
        "foundingDate": "2025",
        "sameAs": [
            "https://www.instagram.com/ace_elevate.ai",
            "https://www.tiktok.com/@acelevate.ai"
        ],
        "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "customer service",
            "availableLanguage": ["English", "Indonesian"]
        }
    };

    const softwareSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Kairi Kana",
        "alternateName": [
            "Kairi Kana AI",
            "Kairi Kana Agentic AI",
            "Kairi AI",
            "Kairi Kana Assistant",
            "Kairi Kana WhatsApp AI",
            "Kairi Kana Personal Assistant",
            "Kairi Kana Productivity",
            "AI Life Manager",
            "Anti App Fatigue AI"
        ],
        "description": "Kairi Kana is the world's first context-aware Agentic AI personal assistant that lives in WhatsApp. Powered by 16 specialized AI agents for seamless task automation, expense logging, habit tracking, smart scheduling, and mental health support — built for Gen Z who hate downloading another app.",
        "applicationCategory": "ProductivityApplication",
        "applicationSubCategory": "AI Assistant",
        "operatingSystem": "Cross-platform (WhatsApp, Web, iOS, Android)",
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
            "Agentic AI with 16 Specialized Agents",
            "WhatsApp-Native AI Assistant",
            "Expense Logging & Financial Tracking",
            "Habit Tracking & Behavior Design",
            "Smart Scheduling & Calendar AI",
            "Receipt & Document Scanning",
            "Mental Health & Psychology Support",
            "Chaos Management System",
            "Anti App Fatigue — No New Apps Needed",
            "Context-Aware Conversations",
            "Multimodal Input (Text, Photo, Voice)",
            "Financial Survival Mode"
        ],
        "screenshot": "https://kairikana.vercel.app/og-image.png",
        "creator": {
            "@type": "Organization",
            "name": "Ace Elevate",
            "url": "https://kairikana.vercel.app"
        },
        "keywords": "Kairi Kana, Kairi Kana AI, agentic AI, AI personal assistant, WhatsApp AI bot, AI productivity, anti app fatigue, chaos management, financial survival, habit tracker AI, expense tracker AI, Gen Z AI tool, second brain AI, smart scheduling AI, mental health AI, psychology AI assistant"
    };

    const webSiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Kairi Kana",
        "alternateName": [
            "Kairi Kana AI",
            "Kairi Kana Agentic AI Assistant",
            "Kairi AI",
            "Ace Elevate Kairi Kana"
        ],
        "url": "https://kairikana.vercel.app",
        "description": "Official home of Kairi Kana — the Agentic AI personal assistant that kills chaos, manages your finances, and tracks your habits, all inside WhatsApp.",
        "inLanguage": ["en", "id"],
        "publisher": {
            "@type": "Organization",
            "name": "Ace Elevate"
        },
        "potentialAction": {
            "@type": "SearchAction",
            "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://kairikana.vercel.app/blog?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
        }
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "What is Kairi Kana?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Kairi Kana is an Agentic AI personal assistant that lives inside WhatsApp. Instead of downloading yet another app, Kairi Kana works within WhatsApp to help you manage tasks, track expenses, build habits, and organize your chaotic life using 16 specialized AI agents."
                }
            },
            {
                "@type": "Question",
                "name": "How does Kairi Kana work?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Kairi Kana operates through WhatsApp. Simply send a text, photo, or voice message and Kairi's 16 AI agents will understand context, organize your tasks, log expenses, track habits, manage your schedule, and even help with mental health — all without leaving WhatsApp."
                }
            },
            {
                "@type": "Question",
                "name": "How much does Kairi Kana cost?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Kairi Kana Shoshin tier starts at $12.99/month (or Rp 49.000/month for Indonesian users). This includes all 16 AI agents, unlimited WhatsApp interactions, expense logging, habit tracking, smart scheduling, and more."
                }
            },
            {
                "@type": "Question",
                "name": "Is Kairi Kana available globally?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes! Kairi Kana works anywhere WhatsApp works. The service is available in English and Indonesian, with support for users worldwide."
                }
            },
            {
                "@type": "Question",
                "name": "Can Kairi Kana help with mental health and psychology?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. Kairi Kana includes psychological awareness agents that can help with daily reflection, mood tracking, stress management, and building healthier mental habits through gentle AI-guided conversations."
                }
            },
            {
                "@type": "Question",
                "name": "What makes Kairi Kana different from other AI assistants?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Unlike ChatGPT or Google Assistant, Kairi Kana is an Agentic AI that proactively manages your life. It doesn't just answer questions — it orchestrates 16 specialized agents to handle tasks, track habits, log finances, and schedule your day, all through WhatsApp with zero app downloads."
                }
            }
        ]
    };

    const productSchema = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "Kairi Kana AI Personal Assistant",
        "description": "Agentic AI personal assistant living in WhatsApp. 16 AI agents to kill chaos, manage finances, track habits, and organize your life.",
        "brand": {
            "@type": "Brand",
            "name": "Ace Elevate"
        },
        "category": "AI Software > Productivity > Personal Assistant",
        "offers": {
            "@type": "Offer",
            "price": "12.99",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock",
            "url": "https://kairikana.vercel.app",
            "priceValidUntil": "2026-12-31"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "ratingCount": "500"
        },
        "image": "https://kairikana.vercel.app/og-image.png"
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
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
            />
        </>
    );
}

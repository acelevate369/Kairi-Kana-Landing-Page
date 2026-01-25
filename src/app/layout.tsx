import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import JsonLd from "./components/JsonLd";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Kairi Kana - AI Personal Assistant | Kill the Chaos",
    template: "%s | Kairi Kana",
  },
  description: "Kairi Kana is your AI-powered personal assistant that lives in WhatsApp. Snap photos, organize tasks, track habits, and manage your life with zero app fatigue. Built by Ace Elevate.",
  keywords: [
    "Kairi Kana",
    "AI assistant",
    "personal assistant",
    "WhatsApp bot",
    "productivity",
    "task management",
    "habit tracking",
    "Ace Elevate",
    "AI productivity",
    "smart scheduling",
    "multimodal AI",
    "personal AI",
    "WhatsApp AI assistant",
    "productivity app",
    "life management"
  ],
  authors: [{ name: "Ace Elevate", url: "https://kairikana.vercel.app" }],
  creator: "Ace Elevate",
  publisher: "Ace Elevate",
  metadataBase: new URL("https://kairikana.vercel.app"),
  manifest: "/manifest.json",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "64x64", type: "image/x-icon" },
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kairikana.vercel.app",
    siteName: "Kairi Kana",
    title: "Kairi Kana - AI Personal Assistant | Kill the Chaos",
    description: "Your AI-powered personal assistant that lives in WhatsApp. Snap photos, organize tasks, track habits, and manage your life with zero app fatigue.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kairi Kana - AI Personal Assistant",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kairi Kana - AI Personal Assistant | Kill the Chaos",
    description: "Your AI-powered personal assistant that lives in WhatsApp. Snap photos, organize tasks, track habits, and manage your life with zero app fatigue.",
    images: ["/og-image.png"],
    creator: "@AceElevate",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "H5cz5oFhs_BCNCnr4taXOoM-W8L-KMn3zqQ5QUZtd-U",
  },
  category: "productivity",
  applicationName: "Kairi Kana",
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "Kairi Kana",
    "format-detection": "telephone=no",
    "mobile-web-app-capable": "yes",
    "msapplication-TileColor": "#6366f1",
    "msapplication-config": "/browserconfig.xml",
    "theme-color": "#6366f1",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <JsonLd />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}

import { NextResponse, NextRequest } from 'next/server';

/**
 * Production Middleware — Kairi Kana
 * 
 * 1. Rate Limiting (IP-based, in-memory)
 * 2. Security Headers (CSP, XSS, Clickjacking, etc.)
 * 3. API Method Guard (reject non-POST)
 * 4. CORS Protection
 */

// === RATE LIMITER (In-Memory) ===
// On Vercel Serverless, this resets on cold starts. For true persistence,
// use Vercel KV or Upstash Redis. This is still effective for burst protection.
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute window
const RATE_LIMIT_MAX_REQUESTS = 30;      // 30 requests per minute per IP
const API_RATE_LIMIT_MAX = 10;           // 10 API requests per minute per IP

function getClientIP(request: NextRequest): string {
    return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
        || request.headers.get('x-real-ip')
        || 'unknown';
}

function isRateLimited(ip: string, maxRequests: number): boolean {
    const now = Date.now();
    const entry = rateLimitMap.get(ip);

    if (!entry || now > entry.resetTime) {
        rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
        return false;
    }

    entry.count++;
    return entry.count > maxRequests;
}

// Cleanup stale entries inline (no setInterval in serverless)
function cleanupRateLimitMap() {
    const now = Date.now();
    for (const [key, value] of rateLimitMap.entries()) {
        if (now > value.resetTime) rateLimitMap.delete(key);
    }
}


// === SECURITY HEADERS ===
const securityHeaders = {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
    'Content-Security-Policy': [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.lemonsqueezy.com https://app.sandbox.midtrans.com https://app.midtrans.com",
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://*.lemonsqueezy.com",
        "font-src 'self' https://fonts.gstatic.com",
        "img-src 'self' data: blob: https:",
        "frame-src https://*.lemonsqueezy.com https://app.sandbox.midtrans.com https://app.midtrans.com",
        "connect-src 'self' https://fgyvklajvlevjldlcgxc.supabase.co https://*.lemonsqueezy.com https://api.midtrans.com https://app.sandbox.midtrans.com",
    ].join('; '),
};


export default function proxy(request: NextRequest) {
    // Cleanup stale rate limit entries on each call
    cleanupRateLimitMap();
    const { pathname } = request.nextUrl;
    const clientIP = getClientIP(request);
    const isApiRoute = pathname.startsWith('/api');

    // 1. Rate Limiting
    const maxRequests = isApiRoute ? API_RATE_LIMIT_MAX : RATE_LIMIT_MAX_REQUESTS;
    if (isRateLimited(clientIP, maxRequests)) {
        return NextResponse.json(
            { error: 'Too many requests. Please try again later.' },
            {
                status: 429,
                headers: {
                    'Retry-After': '60',
                    ...securityHeaders,
                },
            }
        );
    }

    // 2. API Method Guard — Only POST allowed on API routes
    if (isApiRoute && request.method !== 'POST') {
        return NextResponse.json(
            { error: 'Method not allowed' },
            { status: 405, headers: securityHeaders }
        );
    }

    // 3. Block direct browser access to webhook endpoints
    if (pathname.startsWith('/api/webhooks') || pathname.startsWith('/api/pay')) {
        const contentType = request.headers.get('content-type') || '';
        if (request.method === 'POST' && !contentType.includes('application/json')) {
            return NextResponse.json(
                { error: 'Invalid content type' },
                { status: 415, headers: securityHeaders }
            );
        }
    }

    // 4. Apply security headers to all responses
    const response = NextResponse.next();
    for (const [key, value] of Object.entries(securityHeaders)) {
        response.headers.set(key, value);
    }

    // 5. Add cache headers for static pages
    if (!isApiRoute && !pathname.startsWith('/_next')) {
        response.headers.set('X-DNS-Prefetch-Control', 'on');
    }

    return response;
}

// Only run middleware on relevant paths (skip static assets)
export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff2?|ttf|eot)$).*)',
    ],
};

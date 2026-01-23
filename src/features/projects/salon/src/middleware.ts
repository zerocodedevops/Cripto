import createMiddleware from 'next-intl/middleware';
import { NextResponse, type NextRequest } from 'next/server';

const handleI18n = createMiddleware({
    // A list of all locales that are supported
    locales: ['es', 'en'],

    // Used when no locale matches
    defaultLocale: 'es'
});

export default function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // FIX: Rewrite localized _next requests to root _next
    // Example: /es/_next/static/... -> /_next/static/...
    if (pathname.includes('/_next/')) {
        const newPath = pathname.replace(/^\/(es|en)\/_next/, '/_next');
        return NextResponse.rewrite(new URL(newPath, request.url));
    }

    return handleI18n(request);
}

export const config = {
    // Match all pathnames including localized _next
    matcher: [
        '/((?!api|admin|auth|_vercel|.*\\..*).*)',
        '/(es|en)/_next/:path*'
    ]
};

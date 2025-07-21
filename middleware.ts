import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Enhanced internationalization middleware with smart language detection
 * 
 * This middleware extends next-intl's middleware with additional detection logic:
 * 1. First checks for explicit locale in URL path
 * 2. Then checks for stored preference in cookies
 * 3. Then falls back to browser's Accept-Language header
 * 4. Finally uses default locale (en)
 */
const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'zh'],
  // Used when no locale matches
  defaultLocale: 'en',
  // Allow users to change locales
  localeDetection: true
});

// Wrap the intl middleware to add our custom logic
export default async function middleware(request: NextRequest) {
  // Check if this is the root path with no locale
  const pathname = request.nextUrl.pathname;
  
  // If we're already on a localized route, use the intl middleware directly
  if (pathname.match(/^\/(zh|en)($|\/)/) || pathname === '/') {
    return intlMiddleware(request);
  }
  
  // For other routes, redirect to the appropriate localized version
  // Try to get the preferred language from cookies
  const preferredLanguage = request.cookies.get('preferredLanguage')?.value;
  
  // If we have a preferred language in cookies and it's one of our supported locales, use it
  if (preferredLanguage && ['en', 'zh'].includes(preferredLanguage)) {
    const newUrl = new URL(`/${preferredLanguage}${pathname}`, request.url);
    newUrl.search = request.nextUrl.search;
    return NextResponse.redirect(newUrl);
  }
  
  // Otherwise, fall back to the intl middleware's detection logic
  return intlMiddleware(request);
}

export const config = {
  // Match all routes except for api routes, static files, etc.
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

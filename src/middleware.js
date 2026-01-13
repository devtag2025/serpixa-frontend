import { NextResponse } from 'next/server';

const locales = ['en', 'fr', 'nl'];
const defaultLocale = 'en';

/**
 * Get locale from Accept-Language header
 * Parses the header and returns the best matching locale
 */
function getLocaleFromAcceptLanguage(acceptLanguageHeader) {
  if (!acceptLanguageHeader) return defaultLocale;

  // Parse Accept-Language header (e.g., "fr-FR,fr;q=0.9,en;q=0.8")
  const languages = acceptLanguageHeader.split(',').map(lang => {
    const [code] = lang.split(';');
    return code.trim().toLowerCase();
  });
  
  // Try to match supported languages
  for (const lang of languages) {
    // Extract base language code (e.g., "fr" from "fr-FR")
    const baseLang = lang.split('-')[0];
    if (locales.includes(baseLang)) {
      return baseLang;
    }
  }

  return defaultLocale;
}

export function middleware(request) {
  const pathname = request.nextUrl.pathname;
  
  // Check if pathname already has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // Detect locale from browser's Accept-Language header
  const acceptLanguage = request.headers.get('accept-language');
  const locale = getLocaleFromAcceptLanguage(acceptLanguage);
  
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next), API routes, and static files
    '/((?!_next|api|favicon.ico|.*\\..*).*)',
  ],
};
import { NextResponse } from 'next/server';
import { slugMap, getTranslatedSlug, getEnglishSlug } from '@/lib/slugMap';

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
    const pathSegments = pathname.split('/').filter(Boolean);
    const locale = pathSegments[0];
    const slug = pathSegments[1];
    
    // Backward compatibility: Redirect old English slugs to translated slugs for marketing/legal pages
    if (slug && locale !== 'en') {
      // Check if this is an English slug that should be translated
      const englishSlug = slug; // Current slug in URL
      
      // Check if this English slug exists in slugMap
      if (slugMap[englishSlug]) {
        // Get the translated slug for this locale
        const translatedSlug = getTranslatedSlug(englishSlug, locale);
        
        // If translated slug is different from current slug, redirect
        if (translatedSlug && translatedSlug !== slug) {
          const newPathname = `/${locale}/${translatedSlug}${pathSegments.slice(2).length > 0 ? '/' + pathSegments.slice(2).join('/') : ''}`;
          const newUrl = new URL(newPathname, request.url);
          return NextResponse.redirect(newUrl, 301); // Permanent redirect for SEO
        }
      }
    }
    
    return NextResponse.next();
  }

  // Detect locale from browser's Accept-Language header
  const acceptLanguage = request.headers.get('accept-language');
  const locale = getLocaleFromAcceptLanguage(acceptLanguage);
  
  request.nextUrl.pathname = `/${locale}${pathname}`;
  // Use 301 (permanent redirect) for SEO - tells search engines this is the canonical URL
  return NextResponse.redirect(request.nextUrl, 301);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next), API routes, and static files
    '/((?!_next|api|favicon.ico|.*\\..*).*)',
  ],
};
